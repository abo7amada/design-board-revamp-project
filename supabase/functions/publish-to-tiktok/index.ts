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
      .eq('platform', 'tiktok')
      .eq('is_active', true)
      .single();

    if (accountError || !account) {
      throw new Error('TikTok account not found');
    }

    // Check if token is expired
    if (account.token_expires_at && new Date(account.token_expires_at) <= new Date()) {
      throw new Error('Access token expired. Please reconnect your TikTok account.');
    }

    if (!imageUrl) {
      throw new Error('TikTok requires a video file to post. Images are not supported for direct publishing.');
    }

    // Note: TikTok's Content Posting API is primarily for video content
    // For this implementation, we'll create a placeholder that would work with videos
    // In a real implementation, you'd need to handle video uploads

    // For now, we'll return an error since TikTok doesn't support image posting
    throw new Error('TikTok publishing is currently limited to video content. Image posting is not supported.');

    // This is the structure that would be used for video publishing:
    /*
    const publishResponse = await fetch('https://open-api.tiktok.com/share/video/upload/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${account.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        open_id: account.platform_user_id,
        access_token: account.access_token,
        video_url: videoUrl, // This would be a video URL, not image
        text: message,
        privacy_level: 'PUBLIC_TO_EVERYONE',
        disable_duet: false,
        disable_comment: false,
        disable_stitch: false
      })
    });

    const publishResult = await publishResponse.json();

    if (publishResult.error) {
      console.error('TikTok API error:', publishResult.error);
      
      await supabaseClient
        .from('publishing_history')
        .update({
          status: 'failed',
          error_message: publishResult.message,
          updated_at: new Date().toISOString()
        })
        .eq('post_id', postId)
        .eq('social_account_id', accountId);

      throw new Error(publishResult.message);
    }

    await supabaseClient
      .from('publishing_history')
      .update({
        status: 'published',
        platform_post_id: publishResult.data.share_id,
        published_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('post_id', postId)
      .eq('social_account_id', accountId);

    return new Response(JSON.stringify({
      success: true,
      platformPostId: publishResult.data.share_id,
      message: 'Video published successfully to TikTok'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    */

  } catch (error) {
    console.error('Error in publish-to-tiktok function:', error);
    
    // Update publishing history with error
    await supabaseClient
      .from('publishing_history')
      .update({
        status: 'failed',
        error_message: error.message,
        updated_at: new Date().toISOString()
      })
      .eq('post_id', postId)
      .eq('social_account_id', accountId);

    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});