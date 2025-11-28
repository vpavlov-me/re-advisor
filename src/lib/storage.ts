import { supabase } from './supabaseClient';

// File storage utilities for Supabase Storage

// Bucket names
export const BUCKETS = {
  AVATARS: 'avatars',
  DOCUMENTS: 'documents',
  ATTACHMENTS: 'attachments',
} as const;

// File types
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
export const ALLOWED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
];

// Max file sizes (in bytes)
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
export const MAX_DOCUMENT_SIZE = 10 * 1024 * 1024; // 10MB

// Upload avatar image
export async function uploadAvatar(
  userId: string,
  file: File
): Promise<{ url: string | null; error: string | null }> {
  try {
    // Validate file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return { url: null, error: 'Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.' };
    }

    // Validate file size
    if (file.size > MAX_IMAGE_SIZE) {
      return { url: null, error: 'File too large. Maximum size is 5MB.' };
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `${userId}/${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKETS.AVATARS)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) throw error;

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKETS.AVATARS)
      .getPublicUrl(filePath);

    return { url: urlData.publicUrl, error: null };
  } catch (error: any) {
    console.error('Error uploading avatar:', error);
    return { url: null, error: error.message || 'Failed to upload avatar' };
  }
}

// Upload document
export async function uploadDocument(
  userId: string,
  file: File,
  folder?: string
): Promise<{ url: string | null; path: string | null; error: string | null }> {
  try {
    // Validate file type
    if (![...ALLOWED_DOCUMENT_TYPES, ...ALLOWED_IMAGE_TYPES].includes(file.type)) {
      return { url: null, path: null, error: 'Invalid file type.' };
    }

    // Validate file size
    if (file.size > MAX_DOCUMENT_SIZE) {
      return { url: null, path: null, error: 'File too large. Maximum size is 10MB.' };
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${Date.now()}-${sanitizedName}`;
    const folderPath = folder ? `${userId}/${folder}` : userId;
    const filePath = `${folderPath}/${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKETS.DOCUMENTS)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKETS.DOCUMENTS)
      .getPublicUrl(filePath);

    return { url: urlData.publicUrl, path: filePath, error: null };
  } catch (error: any) {
    console.error('Error uploading document:', error);
    return { url: null, path: null, error: error.message || 'Failed to upload document' };
  }
}

// Upload attachment (for messages)
export async function uploadAttachment(
  conversationId: number,
  file: File
): Promise<{ url: string | null; path: string | null; error: string | null }> {
  try {
    // Validate file size
    if (file.size > MAX_DOCUMENT_SIZE) {
      return { url: null, path: null, error: 'File too large. Maximum size is 10MB.' };
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `${Date.now()}-${sanitizedName}`;
    const filePath = `conversation-${conversationId}/${fileName}`;

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKETS.ATTACHMENTS)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const { data: urlData } = supabase.storage
      .from(BUCKETS.ATTACHMENTS)
      .getPublicUrl(filePath);

    return { url: urlData.publicUrl, path: filePath, error: null };
  } catch (error: any) {
    console.error('Error uploading attachment:', error);
    return { url: null, path: null, error: error.message || 'Failed to upload attachment' };
  }
}

// Delete file from storage
export async function deleteFile(
  bucket: keyof typeof BUCKETS,
  path: string
): Promise<{ success: boolean; error: string | null }> {
  try {
    const { error } = await supabase.storage
      .from(BUCKETS[bucket])
      .remove([path]);

    if (error) throw error;

    return { success: true, error: null };
  } catch (error: any) {
    console.error('Error deleting file:', error);
    return { success: false, error: error.message || 'Failed to delete file' };
  }
}

// List files in a folder
export async function listFiles(
  bucket: keyof typeof BUCKETS,
  folder: string
): Promise<{ files: any[]; error: string | null }> {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKETS[bucket])
      .list(folder, {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' },
      });

    if (error) throw error;

    return { files: data || [], error: null };
  } catch (error: any) {
    console.error('Error listing files:', error);
    return { files: [], error: error.message || 'Failed to list files' };
  }
}

// Get signed URL for private files (if needed)
export async function getSignedUrl(
  bucket: keyof typeof BUCKETS,
  path: string,
  expiresIn: number = 3600 // 1 hour default
): Promise<{ url: string | null; error: string | null }> {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKETS[bucket])
      .createSignedUrl(path, expiresIn);

    if (error) throw error;

    return { url: data?.signedUrl || null, error: null };
  } catch (error: any) {
    console.error('Error creating signed URL:', error);
    return { url: null, error: error.message || 'Failed to create signed URL' };
  }
}

// Download file
export async function downloadFile(
  bucket: keyof typeof BUCKETS,
  path: string
): Promise<{ blob: Blob | null; error: string | null }> {
  try {
    const { data, error } = await supabase.storage
      .from(BUCKETS[bucket])
      .download(path);

    if (error) throw error;

    return { blob: data, error: null };
  } catch (error: any) {
    console.error('Error downloading file:', error);
    return { blob: null, error: error.message || 'Failed to download file' };
  }
}

// Helper: Get file size in human readable format
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Helper: Get file extension from filename
export function getFileExtension(filename: string): string {
  return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
}

// Helper: Check if file is an image
export function isImageFile(file: File): boolean {
  return ALLOWED_IMAGE_TYPES.includes(file.type);
}

// Helper: Check if file is a document
export function isDocumentFile(file: File): boolean {
  return ALLOWED_DOCUMENT_TYPES.includes(file.type);
}
