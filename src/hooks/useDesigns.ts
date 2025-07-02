import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Design {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  category: string | null;
  status: string | null;
  client_id: string | null;
  created_at: string;
  updated_at: string;
  clients?: {
    name: string;
  };
}

export const useDesigns = () => {
  const [designs, setDesigns] = useState<Design[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchDesigns = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('designs')
        .select(`
          *,
          clients (
            name
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setDesigns(data || []);
    } catch (error: any) {
      console.error('Error fetching designs:', error);
      toast.error('فشل في تحميل بيانات التصاميم');
    } finally {
      setLoading(false);
    }
  };

  const addDesign = async (designData: Omit<Design, 'id' | 'created_at' | 'updated_at' | 'clients'>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('designs')
        .insert([{ ...designData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      
      await fetchDesigns(); // Refresh the list
      toast.success('تم إضافة التصميم بنجاح');
      return data;
    } catch (error: any) {
      console.error('Error adding design:', error);
      toast.error('فشل في إضافة التصميم');
      return null;
    }
  };

  const updateDesign = async (id: string, updates: Partial<Design>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('designs')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      await fetchDesigns(); // Refresh the list
      toast.success('تم تحديث التصميم بنجاح');
      return data;
    } catch (error: any) {
      console.error('Error updating design:', error);
      toast.error('فشل في تحديث التصميم');
      return null;
    }
  };

  const deleteDesign = async (id: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('designs')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      await fetchDesigns(); // Refresh the list
      toast.success('تم حذف التصميم بنجاح');
      return true;
    } catch (error: any) {
      console.error('Error deleting design:', error);
      toast.error('فشل في حذف التصميم');
      return false;
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!user) return null;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('designs')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('designs')
        .getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error('فشل في رفع الصورة');
      return null;
    }
  };

  useEffect(() => {
    fetchDesigns();
  }, [user]);

  return {
    designs,
    loading,
    addDesign,
    updateDesign,
    deleteDesign,
    uploadImage,
    refetch: fetchDesigns
  };
};