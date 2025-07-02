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
      const clientId = Deno.env.get('LINKEDIN_CLIENT_ID');
      const clientSecret = Deno.env.get('LINKEDIN_CLIENT_SECRET');
      const redirectUri = `${url.origin}/supabase/functions/v1/linkedin-oauth`;

      const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          client_id: clientId!,
          client_secret: clientSecret!,
          redirect_uri: redirectUri
        })
      });

      const tokenData = await tokenResponse.json();

      if (tokenData.error) {
        throw new Error(tokenData.error_description || tokenData.error);
      }

      // Get user info from LinkedIn
      const userResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
        }
      });
      
      const userData = await userResponse.json();

      if (userData.error) {
        throw new Error(userData.error.message);
      }

      // Store the account in database
      const { error } = await supabaseClient
        .from('social_accounts')
        .insert({
          user_id: user.id,
          platform: 'linkedin',
          platform_user_id: userData.sub,
          platform_username: userData.email,
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
            window.opener?.postMessage({ success: true, platform: 'linkedin' }, '*');
            window.close();
          </script>
          <p>Authorization successful! You can close this window.</p>
        </body>
        </html>
      `, {
        headers: { ...corsHeaders, 'Content-Type': 'text/html' },
      });
    } else {
      // Redirect to LinkedIn OAuth
      const clientId = Deno.env.get('LINKEDIN_CLIENT_ID');
      const redirectUri = `${url.origin}/supabase/functions/v1/linkedin-oauth`;
      
      const authUrl = `https://www.linkedin.com/oauth/v2/authorization?` +
        `response_type=code&` +
        `client_id=${clientId}&` +
        `redirect_uri=${encodeURIComponent(redirectUri)}&` +
        `scope=openid%20profile%20email%20w_member_social&` +
        `state=${user.id}`;

      return Response.redirect(authUrl);
    }
  } catch (error) {
    console.error('Error in linkedin-oauth function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});