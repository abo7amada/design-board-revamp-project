import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  industry: string | null;
  status: string | null;
  created_at: string;
  updated_at: string;
}

export const useClients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchClients = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClients(data || []);
    } catch (error: any) {
      console.error('Error fetching clients:', error);
      toast.error('فشل في تحميل بيانات العملاء');
    } finally {
      setLoading(false);
    }
  };

  const addClient = async (clientData: Omit<Client, 'id' | 'created_at' | 'updated_at'>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('clients')
        .insert([{ ...clientData, user_id: user.id }])
        .select()
        .single();

      if (error) throw error;
      
      await fetchClients(); // Refresh the list
      toast.success('تم إضافة العميل بنجاح');
      return data;
    } catch (error: any) {
      console.error('Error adding client:', error);
      toast.error('فشل في إضافة العميل');
      return null;
    }
  };

  const updateClient = async (id: string, updates: Partial<Client>) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase
        .from('clients')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      
      await fetchClients(); // Refresh the list
      toast.success('تم تحديث بيانات العميل بنجاح');
      return data;
    } catch (error: any) {
      console.error('Error updating client:', error);
      toast.error('فشل في تحديث بيانات العميل');
      return null;
    }
  };

  const deleteClient = async (id: string) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (error) throw error;
      
      await fetchClients(); // Refresh the list
      toast.success('تم حذف العميل بنجاح');
      return true;
    } catch (error: any) {
      console.error('Error deleting client:', error);
      toast.error('فشل في حذف العميل');
      return false;
    }
  };

  useEffect(() => {
    fetchClients();
  }, [user]);

  return {
    clients,
    loading,
    addClient,
    updateClient,
    deleteClient,
    refetch: fetchClients
  };
};