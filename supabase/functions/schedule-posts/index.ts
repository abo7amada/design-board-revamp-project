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
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    console.log('Checking for scheduled posts...');

    // Get posts that are scheduled and ready to publish
    const { data: scheduledPosts, error: postsError } = await supabaseClient
      .from('posts')
      .select(`
        *,
        publishing_history(*)
      `)
      .eq('status', 'scheduled')
      .lte('scheduled_at', new Date().toISOString());

    if (postsError) {
      console.error('Error fetching scheduled posts:', postsError);
      throw new Error('Failed to fetch scheduled posts');
    }

    console.log(`Found ${scheduledPosts?.length || 0} scheduled posts ready to publish`);

    const results = [];

    for (const post of scheduledPosts || []) {
      console.log(`Processing post ${post.id}...`);

      // Get pending publishing history records for this post
      const pendingPublishing = post.publishing_history?.filter(
        (ph: any) => ph.status === 'pending'
      ) || [];

      for (const publishingRecord of pendingPublishing) {
        try {
          // Get the social account
          const { data: account, error: accountError } = await supabaseClient
            .from('social_accounts')
            .select('*')
            .eq('id', publishingRecord.social_account_id)
            .eq('is_active', true)
            .single();

          if (accountError || !account) {
            console.error(`Account not found for publishing record ${publishingRecord.id}`);
            continue;
          }

          // Call the appropriate publishing function based on platform
          const publishUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/publish-to-${account.platform}`;
          
          const publishResponse = await fetch(publishUrl, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              postId: post.id,
              accountId: account.id,
              message: post.content,
              imageUrl: post.design_id ? await getDesignImageUrl(supabaseClient, post.design_id) : null
            })
          });

          const publishResult = await publishResponse.json();
          
          if (publishResult.success) {
            console.log(`Successfully published post ${post.id} to ${account.platform}`);
            results.push({
              postId: post.id,
              platform: account.platform,
              status: 'success'
            });
          } else {
            console.error(`Failed to publish post ${post.id} to ${account.platform}:`, publishResult.error);
            results.push({
              postId: post.id,
              platform: account.platform,
              status: 'failed',
              error: publishResult.error
            });
          }
        } catch (error) {
          console.error(`Error publishing to ${publishingRecord.platform}:`, error);
          results.push({
            postId: post.id,
            platform: publishingRecord.platform,
            status: 'failed',
            error: error.message
          });
        }
      }

      // Update post status to published if all publishing attempts are done
      const allPublished = post.publishing_history?.every(
        (ph: any) => ph.status !== 'pending'
      );

      if (allPublished) {
        await supabaseClient
          .from('posts')
          .update({
            status: 'published',
            published_at: new Date().toISOString()
          })
          .eq('id', post.id);
      }
    }

    return new Response(JSON.stringify({
      success: true,
      processed: results.length,
      results: results
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in schedule-posts function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function getDesignImageUrl(supabaseClient: any, designId: string): Promise<string | null> {
  try {
    const { data: design } = await supabaseClient
      .from('designs')
      .select('image_url')
      .eq('id', designId)
      .single();
    
    return design?.image_url || null;
  } catch (error) {
    console.error('Error fetching design image:', error);
    return null;
  }
}