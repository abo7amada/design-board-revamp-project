-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('designs', 'designs', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);

-- Create storage policies for designs bucket
CREATE POLICY "Allow authenticated users to upload designs" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'designs' AND auth.uid() IS NOT NULL);

CREATE POLICY "Allow users to view design images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'designs');

CREATE POLICY "Allow authenticated users to update their design images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'designs' AND auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to delete their design images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'designs' AND auth.uid() IS NOT NULL);

-- Create storage policies for avatars bucket
CREATE POLICY "Allow authenticated users to upload avatars" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'avatars' AND auth.uid() IS NOT NULL);

CREATE POLICY "Allow users to view avatar images" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'avatars');

CREATE POLICY "Allow authenticated users to update their avatar images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'avatars' AND auth.uid() IS NOT NULL);

CREATE POLICY "Allow authenticated users to delete their avatar images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'avatars' AND auth.uid() IS NOT NULL);