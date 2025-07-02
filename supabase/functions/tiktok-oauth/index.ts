import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user } } = await supabaseClient.auth.getUser(token);

    if (!user) {
      throw new Error('Unauthorized');
    }

    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');

    if (code) {
      // Exchange code for access token
      const clientId = Deno.env.get('TIKTOK_CLIENT_ID');
      const clientSecret = Deno.env.get('TIKTOK_CLIENT_SECRET');
      const redirectUri = `${url.origin}/supabase/functions/v1/tiktok-oauth`;

      const tokenResponse = await fetch('https://open-api.tiktok.com/oauth/access_token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_key: clientId!,
          client_secret: clientSecret!,
          code: code,
          grant_type: 'authorization_code',
          redirect_uri: redirectUri
        })
      });

      const tokenData = await tokenResponse.json();

      if (tokenData.error || tokenData.data?.error) {
        throw new Error(tokenData.message || tokenData.data?.error_description);
      }

      // Get user info from TikTok
      const userResponse = await fetch('https://open-api.tiktok.com/user/info/', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokenData.data.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: tokenData.data.access_token,
          open_id: tokenData.data.open_id,
          fields: ['open_id', 'union_id', 'avatar_url', 'display_name']
        })
      });
      
      const userData = await userResponse.json();

      if (userData.error) {
        throw new Error(userData.message);
      }

      // Store the account in database
      const { error } = await supabaseClient
        .from('social_accounts')
        .insert({
          user_id: user.id,
          platform: 'tiktok',
          platform_user_id: userData.data.user.open_id,
          platform_username: userData.data.user.display_name,
          account_name: userData.data.user.display_name,
          account_type: 'personal',
          access_token: tokenData.data.access_token,
          refresh_token: tokenData.data.refresh_token || null,
          token_expires_at: tokenData.data.expires_in ? 
            new Date(Date.now() + tokenData.data.expires_in * 1000).toISOString() : null
        });

      if (error) {
        console.error('Database error:', error);
        throw new Error('Failed to save account');
      }

      // Return success response that closes the popup
      return new Response(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Authorization Successful</title>
        </head>
        <body>
          <script>
            window.opener?.postMessage({ success: true, platform: 'tiktok' }, '*');
            window.close();
          </script>
          <p>Authorization successful! You can close this window.</p>
        </body>
        </html>
      `, {
        headers: { ...corsHeaders, 'Content-Type': 'text/html' },
      });
    } else {
      // Redirect to TikTok OAuth
      const clientId = Deno.env.get('TIKTOK_CLIENT_ID');
      const redirectUri = `${url.origin}/supabase/functions/v1/tiktok-oauth`;
      
      const authUrl = `https://www.tiktok.com/auth/authorize/` +
        `?client_key=${clientId}` +
        `&scope=user.info.basic,video.publish` +
        `&response_type=code` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&state=${user.id}`;

      return Response.redirect(authUrl);
    }
  } catch (error) {
    console.error('Error in tiktok-oauth function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});