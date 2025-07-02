-- Create social_accounts table for storing connected social media accounts
CREATE TABLE public.social_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  platform TEXT NOT NULL, -- 'facebook', 'instagram', 'twitter', 'linkedin', 'tiktok'
  platform_user_id TEXT NOT NULL,
  platform_username TEXT,
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  token_expires_at TIMESTAMP WITH TIME ZONE,
  account_name TEXT,
  account_type TEXT DEFAULT 'personal', -- 'personal', 'business', 'page'
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, platform, platform_user_id)
);

-- Create publishing_history table for tracking published posts
CREATE TABLE public.publishing_history (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  social_account_id UUID NOT NULL REFERENCES public.social_accounts(id) ON DELETE CASCADE,
  platform_post_id TEXT,
  platform TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'published', 'failed', 'scheduled'
  published_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  engagement_data JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.social_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publishing_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies for social_accounts
CREATE POLICY "Users can view their own social accounts" 
ON public.social_accounts 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own social accounts" 
ON public.social_accounts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own social accounts" 
ON public.social_accounts 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own social accounts" 
ON public.social_accounts 
FOR DELETE 
USING (auth.uid() = user_id);

-- RLS Policies for publishing_history
CREATE POLICY "Users can view their publishing history" 
ON public.publishing_history 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.posts 
    WHERE posts.id = publishing_history.post_id 
    AND posts.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create publishing history" 
ON public.publishing_history 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.posts 
    WHERE posts.id = publishing_history.post_id 
    AND posts.user_id = auth.uid()
  )
);

-- Add triggers for updated_at columns
CREATE TRIGGER update_social_accounts_updated_at
BEFORE UPDATE ON public.social_accounts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_publishing_history_updated_at
BEFORE UPDATE ON public.publishing_history
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();