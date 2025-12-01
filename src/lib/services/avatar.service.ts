/**
 * Avatar Service for Client-Side Usage
 * 
 * Handles avatar upload/delete using Supabase Storage directly.
 * No server API required - works with GitHub Pages deployment.
 */

import { supabase, isSupabaseConfigured } from '../supabaseClient';

// ============================================
// CONFIGURATION
// ============================================

const AVATAR_BUCKET = 'avatars';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

// ============================================
// TYPES
// ============================================

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

// ============================================
// AVATAR OPERATIONS
// ============================================

/**
 * Upload avatar image
 */
export async function uploadAvatar(file: File): Promise<UploadResult> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase not configured' };
  }

  // Validate file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    return {
      success: false,
      error: 'Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.',
    };
  }

  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      success: false,
      error: 'File is too large. Maximum size is 5MB.',
    };
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    // Delete old avatars first
    try {
      const { data: existingFiles } = await supabase.storage
        .from(AVATAR_BUCKET)
        .list(user.id);

      if (existingFiles && existingFiles.length > 0) {
        const filesToDelete = existingFiles.map(f => `${user.id}/${f.name}`);
        await supabase.storage
          .from(AVATAR_BUCKET)
          .remove(filesToDelete);
      }
    } catch (cleanupError) {
      console.warn('Error cleaning up old avatars:', cleanupError);
      // Continue with upload even if cleanup fails
    }

    // Upload new avatar
    const { error: uploadError } = await supabase.storage
      .from(AVATAR_BUCKET)
      .upload(filePath, file, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      return { success: false, error: 'Failed to upload file' };
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(AVATAR_BUCKET)
      .getPublicUrl(filePath);

    const publicUrl = urlData.publicUrl;

    // Update profile with new avatar URL
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        avatar_url: publicUrl,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (updateError) {
      console.error('Profile update error:', updateError);
      // Don't fail - avatar is uploaded
    }

    return {
      success: true,
      url: publicUrl,
    };
  } catch (err) {
    console.error('Avatar upload error:', err);
    return { success: false, error: 'Failed to upload avatar' };
  }
}

/**
 * Delete avatar
 */
export async function deleteAvatar(): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    // Delete all avatars for this user
    try {
      const { data: existingFiles } = await supabase.storage
        .from(AVATAR_BUCKET)
        .list(user.id);

      if (existingFiles && existingFiles.length > 0) {
        const filesToDelete = existingFiles.map(f => `${user.id}/${f.name}`);
        await supabase.storage
          .from(AVATAR_BUCKET)
          .remove(filesToDelete);
      }
    } catch (deleteError) {
      console.error('Error deleting avatars:', deleteError);
    }

    // Update profile to remove avatar URL
    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        avatar_url: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id);

    if (updateError) {
      console.error('Profile update error:', updateError);
      return { success: false, error: 'Failed to update profile' };
    }

    return { success: true };
  } catch (err) {
    console.error('Avatar delete error:', err);
    return { success: false, error: 'Failed to delete avatar' };
  }
}

/**
 * Get avatar URL for a user
 */
export async function getAvatarUrl(userId?: string): Promise<string | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    let targetUserId = userId;
    
    if (!targetUserId) {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;
      targetUserId = user.id;
    }

    const { data } = await supabase
      .from('profiles')
      .select('avatar_url')
      .eq('id', targetUserId)
      .single();

    return data?.avatar_url || null;
  } catch {
    return null;
  }
}

/**
 * Generate initials from name for avatar fallback
 */
export function getInitials(firstName?: string, lastName?: string): string {
  const first = firstName?.charAt(0)?.toUpperCase() || '';
  const last = lastName?.charAt(0)?.toUpperCase() || '';
  return first + last || '?';
}

/**
 * Generate a placeholder avatar URL using UI Avatars service
 */
export function getPlaceholderAvatarUrl(name: string): string {
  const encodedName = encodeURIComponent(name);
  return `https://ui-avatars.com/api/?name=${encodedName}&background=6366f1&color=fff&size=128`;
}
