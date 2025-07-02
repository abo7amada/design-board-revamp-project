import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export interface ChatRoom {
  id: string;
  name: string;
  description?: string;
  type: 'channel' | 'direct' | 'group';
  created_by: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  unread_count?: number;
}

export interface Message {
  id: string;
  chat_room_id: string;
  user_id: string;
  content: string;
  message_type: 'text' | 'image' | 'file' | 'design_discussion';
  design_id?: string;
  created_at: string;
  updated_at: string;
  is_edited: boolean;
  user_profile?: {
    full_name?: string;
    avatar_url?: string;
  };
  design?: {
    title: string;
    image_url?: string;
  };
}

export interface ChatParticipant {
  id: string;
  chat_room_id: string;
  user_id: string;
  joined_at: string;
  last_read_at?: string;
  role: 'admin' | 'moderator' | 'member';
  is_active: boolean;
  user_profile?: {
    full_name?: string;
    avatar_url?: string;
  };
}

export const useChat = () => {
  const { user } = useAuth();
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [participants, setParticipants] = useState<ChatParticipant[]>([]);
  const [activeChatRoom, setActiveChatRoom] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch chat rooms
  const fetchChatRooms = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('chat_rooms')
        .select('*')
        .eq('is_active', true)
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setChatRooms((data || []) as ChatRoom[]);
    } catch (error) {
      console.error('Error fetching chat rooms:', error);
      toast.error('خطأ في تحميل قنوات المحادثة');
    } finally {
      setLoading(false);
    }
  };

  // Fetch messages for a chat room
  const fetchMessages = async (chatRoomId: string) => {
    if (!user) return;
    
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          profiles!inner(full_name, avatar_url),
          designs(title, image_url)
        `)
        .eq('chat_room_id', chatRoomId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages((data || []) as Message[]);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast.error('خطأ في تحميل الرسائل');
    } finally {
      setLoading(false);
    }
  };

  // Fetch participants for a chat room
  const fetchParticipants = async (chatRoomId: string) => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('chat_participants')
        .select(`
          *,
          profiles!inner(full_name, avatar_url)
        `)
        .eq('chat_room_id', chatRoomId)
        .eq('is_active', true);

      if (error) throw error;
      setParticipants((data || []) as ChatParticipant[]);
    } catch (error) {
      console.error('Error fetching participants:', error);
    }
  };

  // Send a message
  const sendMessage = async (chatRoomId: string, content: string, messageType: string = 'text', designId?: string) => {
    if (!user || !content.trim()) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert([
          {
            chat_room_id: chatRoomId,
            user_id: user.id,
            content: content.trim(),
            message_type: messageType,
            design_id: designId
          }
        ])
        .select(`
          *,
          profiles!inner(full_name, avatar_url),
          designs(title, image_url)
        `)
        .single();

      if (error) throw error;
      
      // Add the new message to the messages array
      setMessages(prev => [...prev, data as Message]);
      
      // Update last read time for the sender
      await updateLastReadTime(chatRoomId);

      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('خطأ في إرسال الرسالة');
      throw error;
    }
  };

  // Join a chat room
  const joinChatRoom = async (chatRoomId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('chat_participants')
        .insert([
          {
            chat_room_id: chatRoomId,
            user_id: user.id
          }
        ]);

      if (error && error.code !== '23505') { // Ignore unique constraint violations
        throw error;
      }

      await fetchParticipants(chatRoomId);
      toast.success('تم الانضمام إلى القناة بنجاح');
    } catch (error) {
      console.error('Error joining chat room:', error);
      toast.error('خطأ في الانضمام إلى القناة');
    }
  };

  // Update last read time
  const updateLastReadTime = async (chatRoomId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('chat_participants')
        .update({ last_read_at: new Date().toISOString() })
        .eq('chat_room_id', chatRoomId)
        .eq('user_id', user.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating last read time:', error);
    }
  };

  // Set active chat room
  const setActiveChat = (chatRoomId: string) => {
    setActiveChatRoom(chatRoomId);
    fetchMessages(chatRoomId);
    fetchParticipants(chatRoomId);
    updateLastReadTime(chatRoomId);
  };

  // Setup real-time subscriptions
  useEffect(() => {
    if (!user || !activeChatRoom) return;

    const messagesChannel = supabase
      .channel(`messages-${activeChatRoom}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `chat_room_id=eq.${activeChatRoom}`
      }, (payload) => {
        const newMessage = payload.new as Message;
        setMessages(prev => [...prev, newMessage]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(messagesChannel);
    };
  }, [user, activeChatRoom]);

  // Load initial data
  useEffect(() => {
    if (user) {
      fetchChatRooms();
    }
  }, [user]);

  return {
    chatRooms,
    messages,
    participants,
    activeChatRoom,
    loading,
    fetchChatRooms,
    fetchMessages,
    fetchParticipants,
    sendMessage,
    joinChatRoom,
    setActiveChat,
    updateLastReadTime
  };
};