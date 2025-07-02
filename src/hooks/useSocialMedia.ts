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

  // Connect a social media account (placeholder for OAuth flow)
  const connectAccount = async (platform: string) => {
    toast.info(`جاري ربط حساب ${platform}...`);
    
    // This would typically initiate OAuth flow
    // For now, we'll simulate a connected account
    try {
      const mockAccount = {
        user_id: user?.id,
        platform,
        platform_user_id: `mock_${platform}_${Date.now()}`,
        platform_username: `user_${platform}`,
        access_token: 'mock_token',
        account_name: `حساب ${platform}`,
        account_type: 'personal' as const
      };

      const { data, error } = await supabase
        .from('social_accounts')
        .insert([mockAccount])
        .select()
        .single();

      if (error) throw error;
      
      setSocialAccounts(prev => [...prev, data as SocialAccount]);
      toast.success(`تم ربط حساب ${platform} بنجاح`);
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
  const publishPost = async (postId: string, selectedAccounts: string[]) => {
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

      // TODO: Implement actual publishing logic here
      // This would call the respective platform APIs
      
      toast.success('تم بدء عملية النشر بنجاح');
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