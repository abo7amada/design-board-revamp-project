-- Create chat_rooms table
CREATE TABLE public.chat_rooms (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL DEFAULT 'channel', -- 'channel', 'direct', 'group'
  created_by UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Create messages table
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chat_room_id UUID NOT NULL REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  content TEXT NOT NULL,
  message_type TEXT NOT NULL DEFAULT 'text', -- 'text', 'image', 'file', 'design_discussion'
  design_id UUID REFERENCES public.designs(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_edited BOOLEAN NOT NULL DEFAULT false
);

-- Create chat_participants table
CREATE TABLE public.chat_participants (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  chat_room_id UUID NOT NULL REFERENCES public.chat_rooms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  last_read_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  role TEXT NOT NULL DEFAULT 'member', -- 'admin', 'moderator', 'member'
  is_active BOOLEAN NOT NULL DEFAULT true,
  UNIQUE(chat_room_id, user_id)
);

-- Enable Row Level Security
ALTER TABLE public.chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_participants ENABLE ROW LEVEL SECURITY;

-- RLS Policies for chat_rooms
CREATE POLICY "Users can view chat rooms they participate in" 
ON public.chat_rooms 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.chat_participants 
    WHERE chat_room_id = chat_rooms.id 
    AND user_id = auth.uid() 
    AND is_active = true
  )
);

CREATE POLICY "Users can create chat rooms" 
ON public.chat_rooms 
FOR INSERT 
WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Room creators can update their rooms" 
ON public.chat_rooms 
FOR UPDATE 
USING (auth.uid() = created_by);

-- RLS Policies for messages
CREATE POLICY "Users can view messages in their chat rooms" 
ON public.messages 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.chat_participants 
    WHERE chat_room_id = messages.chat_room_id 
    AND user_id = auth.uid() 
    AND is_active = true
  )
);

CREATE POLICY "Users can create messages in their chat rooms" 
ON public.messages 
FOR INSERT 
WITH CHECK (
  auth.uid() = user_id AND
  EXISTS (
    SELECT 1 FROM public.chat_participants 
    WHERE chat_room_id = messages.chat_room_id 
    AND user_id = auth.uid() 
    AND is_active = true
  )
);

CREATE POLICY "Users can update their own messages" 
ON public.messages 
FOR UPDATE 
USING (auth.uid() = user_id);

-- RLS Policies for chat_participants
CREATE POLICY "Users can view participants in their chat rooms" 
ON public.chat_participants 
FOR SELECT 
USING (
  user_id = auth.uid() OR
  EXISTS (
    SELECT 1 FROM public.chat_participants cp2 
    WHERE cp2.chat_room_id = chat_participants.chat_room_id 
    AND cp2.user_id = auth.uid() 
    AND cp2.is_active = true
  )
);

CREATE POLICY "Users can join chat rooms" 
ON public.chat_participants 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own participation" 
ON public.chat_participants 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Add triggers for updated_at columns
CREATE TRIGGER update_chat_rooms_updated_at
BEFORE UPDATE ON public.chat_rooms
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_messages_updated_at
BEFORE UPDATE ON public.messages
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default chat rooms
INSERT INTO public.chat_rooms (name, description, type, created_by) 
VALUES 
  ('عام', 'قناة للمناقشات العامة', 'channel', '00000000-0000-0000-0000-000000000000'),
  ('التصاميم', 'قناة لمناقشة التصاميم والمشاريع', 'channel', '00000000-0000-0000-0000-000000000000'),
  ('العملاء', 'قناة لمناقشة شؤون العملاء', 'channel', '00000000-0000-0000-0000-000000000000'),
  ('الطوارئ', 'قناة للمسائل العاجلة', 'channel', '00000000-0000-0000-0000-000000000000');