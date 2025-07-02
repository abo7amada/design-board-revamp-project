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
      const appId = Deno.env.get('FACEBOOK_APP_ID');
      const appSecret = Deno.env.get('FACEBOOK_APP_SECRET');
      const redirectUri = `${url.origin}/supabase/functions/v1/facebook-oauth`;

      const tokenResponse = await fetch(`https://graph.facebook.com/v18.0/oauth/access_token?` +
        `client_id=${appId}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `client_secret=${appSecret}&` +
        `code=${code}`);

      const tokenData = await tokenResponse.json();

      if (tokenData.error) {
        throw new Error(tokenData.error.message);
      }

      // Get user info from Facebook
      const userResponse = await fetch(`https://graph.facebook.com/me?access_token=${tokenData.access_token}&fields=id,name`);
      const userData = await userResponse.json();

      // Get pages that user manages
      const pagesResponse = await fetch(`https://graph.facebook.com/me/accounts?access_token=${tokenData.access_token}`);
      const pagesData = await pagesResponse.json();

      // Store the account in database
      const { error } = await supabaseClient
        .from('social_accounts')
        .insert({
          user_id: user.id,
          platform: 'facebook',
          platform_user_id: userData.id,
          platform_username: userData.name,
          account_name: userData.name,
          account_type: 'personal',
          access_token: tokenData.access_token,
          refresh_token: tokenData.refresh_token || null,
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
            window.opener?.postMessage({ success: true, platform: 'facebook' }, '*');
            window.close();
          </script>
          <p>Authorization successful! You can close this window.</p>
        </body>
        </html>
      `, {
        headers: { ...corsHeaders, 'Content-Type': 'text/html' },
      });
    } else {
      // Redirect to Facebook OAuth
      const appId = Deno.env.get('FACEBOOK_APP_ID');
      const redirectUri = `${url.origin}/supabase/functions/v1/facebook-oauth`;
      
      const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?` +
        `client_id=${appId}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `scope=pages_manage_posts,pages_read_engagement&` +
        `response_type=code&` +
        `state=${user.id}`;

      return Response.redirect(authUrl);
    }
  } catch (error) {
    console.error('Error in facebook-oauth function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});