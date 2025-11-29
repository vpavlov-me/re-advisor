import { supabase } from '@/lib/supabaseClient';

const AVATAR_BUCKET = 'avatars';

// Upload avatar via API route (recommended - uses service role on server)
export async function uploadAvatarViaAPI(file: File): Promise<string> {
  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.');
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    throw new Error('File is too large. Maximum size is 5MB.');
  }

  // Get current session token
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) {
    throw new Error('Please log in to upload an avatar.');
  }

  // Create form data
  const formData = new FormData();
  formData.append('file', file);

  // Upload via API route
  const response = await fetch('/api/avatar', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
    },
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to upload avatar');
  }

  return result.url;
}

// Delete avatar via API route
export async function deleteAvatarViaAPI(): Promise<void> {
  // Get current session token
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) {
    throw new Error('Please log in to remove avatar.');
  }

  const response = await fetch('/api/avatar', {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${session.access_token}`,
    },
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || 'Failed to remove avatar');
  }
}

// Check if bucket exists and create it if needed
async function ensureBucketExists(): Promise<boolean> {
  try {
    const { data: buckets, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('Error listing buckets:', error);
      return false;
    }
    
    const bucketExists = buckets?.some(bucket => bucket.id === AVATAR_BUCKET);
    
    if (!bucketExists) {
      // Try to create the bucket
      const { error: createError } = await supabase.storage.createBucket(AVATAR_BUCKET, {
        public: true,
        fileSizeLimit: 5 * 1024 * 1024, // 5MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
      });
      
      if (createError) {
        console.error('Error creating bucket:', createError);
        // Bucket creation might fail due to permissions, but upload might still work
        // if bucket was created by admin
        return true; // Continue and let upload attempt
      }
      
      console.log('Created avatars bucket');
    }
    
    return true;
  } catch (error) {
    console.error('Bucket check error:', error);
    return true; // Continue and let upload attempt
  }
}

// Upload avatar image (direct - fallback method)
export async function uploadAvatar(userId: string, file: File): Promise<string> {
  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.');
  }

  // Validate file size (max 5MB)
  const maxSize = 5 * 1024 * 1024; // 5MB
  if (file.size > maxSize) {
    throw new Error('File is too large. Maximum size is 5MB.');
  }

  // Ensure bucket exists
  await ensureBucketExists();

  // Generate unique filename
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}-${Date.now()}.${fileExt}`;
  const filePath = `${userId}/${fileName}`;

  // Upload file
  const { error: uploadError } = await supabase.storage
    .from(AVATAR_BUCKET)
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (uploadError) {
    console.error('Upload error:', uploadError);
    
    // Provide more specific error messages
    if (uploadError.message?.includes('Bucket not found')) {
      throw new Error('Storage is not configured. Please contact support.');
    }
    if (uploadError.message?.includes('row-level security') || uploadError.message?.includes('policy')) {
      throw new Error('Permission denied. Please try logging in again.');
    }
    if (uploadError.message?.includes('Payload too large')) {
      throw new Error('File is too large. Maximum size is 5MB.');
    }
    
    throw new Error(`Upload failed: ${uploadError.message || 'Unknown error'}`);
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(AVATAR_BUCKET)
    .getPublicUrl(filePath);

  return publicUrl;
}

// Delete avatar image (direct - fallback method)
export async function deleteAvatar(avatarUrl: string): Promise<void> {
  // Extract file path from URL
  const urlParts = avatarUrl.split('/');
  const bucketIndex = urlParts.findIndex(part => part === AVATAR_BUCKET);
  if (bucketIndex === -1) return;

  const filePath = urlParts.slice(bucketIndex + 1).join('/');

  const { error } = await supabase.storage
    .from(AVATAR_BUCKET)
    .remove([filePath]);

  if (error) {
    console.error('Delete error:', error);
    throw new Error('Failed to delete avatar');
  }
}

// Update profile avatar - uses API route for reliable uploads
export async function updateProfileAvatar(userId: string, file: File): Promise<string> {
  // Use API route which has service role access
  return await uploadAvatarViaAPI(file);
}

// Remove profile avatar - uses API route for reliable deletion
export async function removeProfileAvatar(userId: string): Promise<void> {
  // Use API route which has service role access
  await deleteAvatarViaAPI();
}

// Get signed URL for private files (if needed)
export async function getSignedAvatarUrl(filePath: string, expiresIn = 3600): Promise<string> {
  const { data, error } = await supabase.storage
    .from(AVATAR_BUCKET)
    .createSignedUrl(filePath, expiresIn);

  if (error) {
    console.error('Signed URL error:', error);
    throw new Error('Failed to get signed URL');
  }

  return data.signedUrl;
}
