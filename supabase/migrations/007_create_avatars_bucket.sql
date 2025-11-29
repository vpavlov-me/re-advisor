-- ============================================
-- STORAGE BUCKET: avatars
-- ============================================
-- 
-- IMPORTANT: Run this migration in your Supabase Dashboard SQL Editor
-- Go to: https://supabase.com/dashboard/project/YOUR_PROJECT_REF/sql
--
-- Alternative: Create bucket via Dashboard UI:
-- 1. Go to Storage section in Supabase Dashboard
-- 2. Click "New bucket"
-- 3. Name: avatars
-- 4. Enable "Public bucket"
-- 5. File size limit: 5MB
-- 6. Allowed MIME types: image/jpeg, image/png, image/gif, image/webp
-- ============================================

-- Create avatars storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'avatars',
  'avatars',
  true,
  5242880, -- 5MB
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp']
) ON CONFLICT (id) DO NOTHING;

-- Storage Policies for avatars bucket
-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can upload own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can update own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own avatar" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view avatars" ON storage.objects;

-- Policy: Allow authenticated users to upload their own avatar
CREATE POLICY "Users can upload own avatar" ON storage.objects
FOR INSERT WITH CHECK (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Allow authenticated users to update their own avatar
CREATE POLICY "Users can update own avatar" ON storage.objects
FOR UPDATE USING (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Allow authenticated users to delete their own avatar
CREATE POLICY "Users can delete own avatar" ON storage.objects
FOR DELETE USING (
  bucket_id = 'avatars' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Policy: Allow public read access for avatars
CREATE POLICY "Anyone can view avatars" ON storage.objects
FOR SELECT USING (bucket_id = 'avatars');
