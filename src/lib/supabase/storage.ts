import { supabase } from '@/lib/supabaseClient';

const AVATAR_BUCKET = 'avatars';

// Upload avatar image
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
    throw new Error('Failed to upload avatar');
  }

  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from(AVATAR_BUCKET)
    .getPublicUrl(filePath);

  return publicUrl;
}

// Delete avatar image
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

// Update profile avatar
export async function updateProfileAvatar(userId: string, file: File): Promise<string> {
  // Get current avatar URL
  const { data: profile } = await supabase
    .from('profiles')
    .select('avatar_url')
    .eq('id', userId)
    .single();

  // Delete old avatar if exists
  if (profile?.avatar_url) {
    try {
      await deleteAvatar(profile.avatar_url);
    } catch (error) {
      console.error('Failed to delete old avatar:', error);
    }
  }

  // Upload new avatar
  const newAvatarUrl = await uploadAvatar(userId, file);

  // Update profile with new avatar URL
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ avatar_url: newAvatarUrl, updated_at: new Date().toISOString() })
    .eq('id', userId);

  if (updateError) {
    console.error('Profile update error:', updateError);
    throw new Error('Failed to update profile with new avatar');
  }

  return newAvatarUrl;
}

// Remove profile avatar
export async function removeProfileAvatar(userId: string): Promise<void> {
  // Get current avatar URL
  const { data: profile } = await supabase
    .from('profiles')
    .select('avatar_url')
    .eq('id', userId)
    .single();

  // Delete avatar from storage
  if (profile?.avatar_url) {
    await deleteAvatar(profile.avatar_url);
  }

  // Update profile to remove avatar URL
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ avatar_url: null, updated_at: new Date().toISOString() })
    .eq('id', userId);

  if (updateError) {
    console.error('Profile update error:', updateError);
    throw new Error('Failed to remove avatar from profile');
  }
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
