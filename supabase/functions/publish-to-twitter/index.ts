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
      .eq('platform', 'twitter')
      .eq('is_active', true)
      .single();

    if (accountError || !account) {
      throw new Error('Twitter account not found');
    }

    // Check if token is expired
    if (account.token_expires_at && new Date(account.token_expires_at) <= new Date()) {
      throw new Error('Access token expired. Please reconnect your Twitter account.');
    }

    let mediaIds = [];

    // Upload image if provided
    if (imageUrl) {
      // For Twitter API v2, we need to upload media first
      const imageResponse = await fetch(imageUrl);
      const imageBuffer = await imageResponse.arrayBuffer();
      const imageBase64 = btoa(String.fromCharCode(...new Uint8Array(imageBuffer)));

      const mediaResponse = await fetch('https://upload.twitter.com/1.1/media/upload.json', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${account.access_token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          media_data: imageBase64,
          media_category: 'tweet_image'
        })
      });

      const mediaResult = await mediaResponse.json();
      
      if (mediaResult.errors) {
        throw new Error(mediaResult.errors[0].message);
      }

      mediaIds.push(mediaResult.media_id_string);
    }

    // Prepare tweet data
    const tweetData: any = {
      text: message
    };

    if (mediaIds.length > 0) {
      tweetData.media = {
        media_ids: mediaIds
      };
    }

    // Publish tweet using Twitter API v2
    const publishResponse = await fetch('https://api.twitter.com/2/tweets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${account.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(tweetData)
    });

    const publishResult = await publishResponse.json();

    if (publishResult.errors) {
      console.error('Twitter API error:', publishResult.errors);
      
      // Update publishing history with error
      await supabaseClient
        .from('publishing_history')
        .update({
          status: 'failed',
          error_message: publishResult.errors[0].detail,
          updated_at: new Date().toISOString()
        })
        .eq('post_id', postId)
        .eq('social_account_id', accountId);

      throw new Error(publishResult.errors[0].detail);
    }

    // Update publishing history with success
    const { error: updateError } = await supabaseClient
      .from('publishing_history')
      .update({
        status: 'published',
        platform_post_id: publishResult.data.id,
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
      platformPostId: publishResult.data.id,
      message: 'Tweet published successfully'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in publish-to-twitter function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});