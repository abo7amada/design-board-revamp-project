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
      .eq('platform', 'linkedin')
      .eq('is_active', true)
      .single();

    if (accountError || !account) {
      throw new Error('LinkedIn account not found');
    }

    // Check if token is expired
    if (account.token_expires_at && new Date(account.token_expires_at) <= new Date()) {
      throw new Error('Access token expired. Please reconnect your LinkedIn account.');
    }

    // Get user's LinkedIn ID
    const userInfoResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
      headers: {
        'Authorization': `Bearer ${account.access_token}`,
      }
    });
    
    const userInfo = await userInfoResponse.json();
    const linkedinUserId = userInfo.sub;

    // Prepare post data
    const postData: any = {
      author: `urn:li:person:${linkedinUserId}`,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: message
          },
          shareMediaCategory: imageUrl ? 'IMAGE' : 'NONE'
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    };

    // Add image if provided
    if (imageUrl) {
      // For LinkedIn, we need to upload the image first
      const registerResponse = await fetch('https://api.linkedin.com/v2/assets?action=registerUpload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${account.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registerUploadRequest: {
            recipes: ['urn:li:digitalmediaRecipe:feedshare-image'],
            owner: `urn:li:person:${linkedinUserId}`,
            serviceRelationships: [{
              relationshipType: 'OWNER',
              identifier: 'urn:li:userGeneratedContent'
            }]
          }
        })
      });

      const registerResult = await registerResponse.json();
      
      if (registerResult.message) {
        throw new Error(registerResult.message);
      }

      const uploadUrl = registerResult.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl;
      const asset = registerResult.value.asset;

      // Upload the image
      const imageResponse = await fetch(imageUrl);
      const imageBuffer = await imageResponse.arrayBuffer();

      await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${account.access_token}`,
        },
        body: imageBuffer
      });

      // Add media to post
      postData.specificContent['com.linkedin.ugc.ShareContent'].media = [{
        status: 'READY',
        description: {
          text: message
        },
        media: asset,
        title: {
          text: 'Image'
        }
      }];
    }

    // Publish to LinkedIn
    const publishResponse = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${account.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData)
    });

    const publishResult = await publishResponse.json();

    if (publishResult.message) {
      console.error('LinkedIn API error:', publishResult);
      
      // Update publishing history with error
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
      message: 'Post published successfully to LinkedIn'
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in publish-to-linkedin function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});