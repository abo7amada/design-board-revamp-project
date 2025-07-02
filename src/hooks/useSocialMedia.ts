import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface SocialAccount {
  id: string;
  user_id: string;
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'tiktok';
  platform_user_id: string;
  platform_username?: string;
  account_name?: string;
  account_type: 'personal' | 'business' | 'page';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PublishingHistory {
  id: string;
  post_id: string;
  social_account_id: string;
  platform_post_id?: string;
  platform: string;
  status: 'pending' | 'published' | 'failed' | 'scheduled';
  published_at?: string;
  error_message?: string;
  engagement_data: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export const useSocialMedia = () => {
  const { user } = useAuth();
  const [socialAccounts, setSocialAccounts] = useState<SocialAccount[]>([]);
  const [publishingHistory, setPublishingHistory] = useState<PublishingHistory[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch user's connected social accounts
  const fetchSocialAccounts = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('social_accounts')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSocialAccounts((data || []) as SocialAccount[]);
    } catch (error) {
      console.error('Error fetching social accounts:', error);
      toast.error('خطأ في تحميل الحسابات الاجتماعية');
    } finally {
      setLoading(false);
    }
  };

  // Fetch publishing history
  const fetchPublishingHistory = async (postId?: string) => {
    if (!user) return;
    
    setLoading(true);
    try {
      let query = supabase
        .from('publishing_history')
        .select(`
          *,
          posts!inner(user_id)
        `)
        .eq('posts.user_id', user.id)
        .order('created_at', { ascending: false });

      if (postId) {
        query = query.eq('post_id', postId);
      }

      const { data, error } = await query;
      if (error) throw error;
      setPublishingHistory((data || []) as PublishingHistory[]);
    } catch (error) {
      console.error('Error fetching publishing history:', error);
      toast.error('خطأ في تحميل تاريخ النشر');
    } finally {
      setLoading(false);
    }
  };

  // Connect a social media account using OAuth flow
  const connectAccount = async (platform: string) => {
    if (!user) {
      toast.error('يجب تسجيل الدخول أولاً');
      return;
    }

    try {
      // Open OAuth popup for the specific platform
      const authUrl = `https://pzlkvdwctlfqgpfvwiot.supabase.co/functions/v1/${platform}-oauth`;
      const popup = window.open(
        authUrl,
        `${platform}-oauth`,
        'width=600,height=600,scrollbars=yes,resizable=yes'
      );

      // Listen for OAuth completion
      const handleMessage = (event: MessageEvent) => {
        if (event.data?.success && event.data?.platform === platform) {
          window.removeEventListener('message', handleMessage);
          popup?.close();
          toast.success(`تم ربط حساب ${platform} بنجاح`);
          fetchSocialAccounts(); // Refresh the accounts list
        }
      };

      window.addEventListener('message', handleMessage);

      // Check if popup was closed without completing OAuth
      const checkClosed = setInterval(() => {
        if (popup?.closed) {
          clearInterval(checkClosed);
          window.removeEventListener('message', handleMessage);
        }
      }, 1000);

    } catch (error) {
      console.error('Error connecting account:', error);
      toast.error(`خطأ في ربط حساب ${platform}`);
    }
  };

  // Disconnect a social media account
  const disconnectAccount = async (accountId: string) => {
    try {
      const { error } = await supabase
        .from('social_accounts')
        .update({ is_active: false })
        .eq('id', accountId);

      if (error) throw error;
      
      setSocialAccounts(prev => prev.filter(account => account.id !== accountId));
      toast.success('تم إلغاء ربط الحساب بنجاح');
    } catch (error) {
      console.error('Error disconnecting account:', error);
      toast.error('خطأ في إلغاء ربط الحساب');
    }
  };

  // Publish a post to social media platforms
  const publishPost = async (postId: string, selectedAccounts: string[], content: string, imageUrl?: string) => {
    if (!selectedAccounts.length) {
      toast.error('يرجى اختيار حساب واحد على الأقل للنشر');
      return;
    }

    setLoading(true);
    try {
      // Create publishing history records
      const historyRecords = selectedAccounts.map(accountId => ({
        post_id: postId,
        social_account_id: accountId,
        platform: socialAccounts.find(acc => acc.id === accountId)?.platform || 'unknown',
        status: 'pending' as const
      }));

      const { data, error } = await supabase
        .from('publishing_history')
        .insert(historyRecords)
        .select();

      if (error) throw error;

      // Publish to each selected account
      const publishPromises = selectedAccounts.map(async (accountId) => {
        const account = socialAccounts.find(acc => acc.id === accountId);
        if (!account) return;

        try {
          const response = await supabase.functions.invoke(`publish-to-${account.platform}`, {
            body: {
              postId,
              accountId,
              message: content,
              imageUrl
            }
          });

          if (response.error) {
            console.error(`Error publishing to ${account.platform}:`, response.error);
            toast.error(`خطأ في النشر على ${account.platform}`);
          } else {
            toast.success(`تم النشر بنجاح على ${account.platform}`);
          }
        } catch (error) {
          console.error(`Error publishing to ${account.platform}:`, error);
          toast.error(`خطأ في النشر على ${account.platform}`);
        }
      });

      await Promise.all(publishPromises);
      fetchPublishingHistory();
    } catch (error) {
      console.error('Error publishing post:', error);
      toast.error('خطأ في نشر المنشور');
    } finally {
      setLoading(false);
    }
  };

  // Get platform statistics
  const getPlatformStats = () => {
    const stats = socialAccounts.reduce((acc, account) => {
      acc[account.platform] = (acc[account.platform] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalAccounts: socialAccounts.length,
      platformBreakdown: stats,
      connectedPlatforms: Object.keys(stats)
    };
  };

  // Load data on component mount
  useEffect(() => {
    if (user) {
      fetchSocialAccounts();
      fetchPublishingHistory();
    }
  }, [user]);

  return {
    socialAccounts,
    publishingHistory,
    loading,
    fetchSocialAccounts,
    fetchPublishingHistory,
    connectAccount,
    disconnectAccount,
    publishPost,
    getPlatformStats
  };
};