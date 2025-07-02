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

    const { postId, accountId, message, imageUrl } = await req.json();

    // Get the social account
    const { data: account, error: accountError } = await supabaseClient
      .from('social_accounts')
      .select('*')
      .eq('id', accountId)
      .eq('user_id', user.id)
      .eq('platform', 'facebook')
      .eq('is_active', true)
      .single();

    if (accountError || !account) {
      throw new Error('Facebook account not found');
    }

    // Check if token is expired
    if (account.token_expires_at && new Date(account.token_expires_at) <= new Date()) {
      throw new Error('Access token expired. Please reconnect your Facebook account.');
    }

    // Prepare post data
    const postData: any = {
      message: message
    };

    // Add image if provided
    if (imageUrl) {
      postData.url = imageUrl;
    }

    // Publish to Facebook
    const publishResponse = await fetch(`https://graph.facebook.com/me/feed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...postData,
        access_token: account.access_token
      })
    });

    const publishResult = await publishResponse.json();

    if (publishResult.error) {
      console.error('Facebook API error:', publishResult.error);
      
      // Update publishing history with error
      await supabaseClient
        .from('publishing_history')
        .update({
          status: 'failed',
          error_message: publishResult.error.message,
          updated_at: new Date().toISOString()
        })
        .eq('post_id', postId)
        .eq('social_account_id', accountId);

      throw new Error(publishResult.error.message);
    }

    // Update publishing history with success
    const { error: updateError } = await supabaseClient
      .from('publishing_history')
      .update({
        status: 'published',
        platform_post_id: publishResult.id,
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('post_id', postId)
      .eq('social_account_id', accountId);

    if (updateError) {
      console.error('Failed to update publishing history:', updateError);
    }

    return new Response(JSON.stringify({
      success: true,
      platformPostId: publishResult.id,
      message: 'Post published successfully to Facebook'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in publish-to-facebook function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});