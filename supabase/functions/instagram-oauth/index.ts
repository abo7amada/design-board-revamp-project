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
      const appId = Deno.env.get('INSTAGRAM_APP_ID');
      const appSecret = Deno.env.get('INSTAGRAM_APP_SECRET');
      const redirectUri = `${url.origin}/supabase/functions/v1/instagram-oauth`;

      const tokenResponse = await fetch('https://api.instagram.com/oauth/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: appId!,
          client_secret: appSecret!,
          grant_type: 'authorization_code',
          redirect_uri: redirectUri,
          code: code
        })
      });

      const tokenData = await tokenResponse.json();

      if (tokenData.error) {
        throw new Error(tokenData.error.message || tokenData.error_description);
      }

      // Get user info from Instagram
      const userResponse = await fetch(`https://graph.instagram.com/me?fields=id,username&access_token=${tokenData.access_token}`);
      const userData = await userResponse.json();

      // Store the account in database
      const { error } = await supabaseClient
        .from('social_accounts')
        .insert({
          user_id: user.id,
          platform: 'instagram',
          platform_user_id: userData.id,
          platform_username: userData.username,
          account_name: userData.username,
          account_type: 'personal',
          access_token: tokenData.access_token,
          refresh_token: null,
          token_expires_at: tokenData.expires_in ? 
            new Date(Date.now() + tokenData.expires_in * 1000).toISOString() : null
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
            window.opener?.postMessage({ success: true, platform: 'instagram' }, '*');
            window.close();
          </script>
          <p>Authorization successful! You can close this window.</p>
        </body>
        </html>
      `, {
        headers: { ...corsHeaders, 'Content-Type': 'text/html' },
      });
    } else {
      // Redirect to Instagram OAuth
      const appId = Deno.env.get('INSTAGRAM_APP_ID');
      const redirectUri = `${url.origin}/supabase/functions/v1/instagram-oauth`;
      
      const authUrl = `https://api.instagram.com/oauth/authorize?` +
        `client_id=${appId}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `scope=user_profile,user_media&` +
        `response_type=code&` +
        `state=${user.id}`;

      return Response.redirect(authUrl);
    }
  } catch (error) {
    console.error('Error in instagram-oauth function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});