import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Post {
  id: string;
  title: string;
  content: string | null;
  status: string | null;
  platforms: string[] | null;
  scheduled_at: string | null;
  published_at: string | null;
  client_id: string | null;
  design_id: string | null;
  created_at: string;
  updated_at: string;
  clients?: {
    name: string;
  };
  designs?: {
    title: string;
    image_url: string;
  };
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchPosts = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          clients (
            name
          ),
          designs (
            title,
            image_url
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      console.error('Error fetching posts:', error);
      toast.error('فشل في تحميل بيانات المنشورات');
    } finally {
      setLoading(false);
    }
  };

  const addPost = async (postData: Omit<Post, 'id' | 'created_at' | 'updated_at' | 'clients' | 'designs'>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('posts')
        .insert([{ ...postData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      
      await fetchPosts(); // Refresh the list
      toast.success('تم إضافة المنشور بنجاح');
      return data;
    } catch (error: any) {
      console.error('Error adding post:', error);
      toast.error('فشل في إضافة المنشور');
      return null;
    }
  };

  const updatePost = async (id: string, updates: Partial<Post>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('posts')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      await fetchPosts(); // Refresh the list
      toast.success('تم تحديث المنشور بنجاح');
      return data;
    } catch (error: any) {
      console.error('Error updating post:', error);
      toast.error('فشل في تحديث المنشور');
      return null;
    }
  };

  const deletePost = async (id: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      await fetchPosts(); // Refresh the list
      toast.success('تم حذف المنشور بنجاح');
      return true;
    } catch (error: any) {
      console.error('Error deleting post:', error);
      toast.error('فشل في حذف المنشور');
      return false;
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [user]);

  return {
    posts,
    loading,
    addPost,
    updatePost,
    deletePost,
    refetch: fetchPosts
  };
};