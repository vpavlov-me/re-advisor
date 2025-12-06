import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Check if Supabase is configured
const isConfigured = supabaseUrl && supabaseServiceKey && supabaseAnonKey;

// Create Supabase client with service role (bypasses RLS for storage operations)
const supabaseAdmin = isConfigured ? createClient(
  supabaseUrl,
  supabaseServiceKey,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    }
  }
) : null;

// Create regular Supabase client to verify user session
const supabaseClient = isConfigured ? createClient(
  supabaseUrl,
  supabaseAnonKey
) : null;

const BANNER_BUCKET = 'banners';
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

// POST - Upload banner
export async function POST(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!isConfigured || !supabaseClient || !supabaseAdmin) {
      return NextResponse.json(
        { error: 'Service not configured' },
        { status: 503 }
      );
    }

    // Get user from auth header
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');

    // Verify user with token using anon key client
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError || !user) {
      return NextResponse.json({ 
        error: 'Invalid or expired session' 
      }, { status: 401 });
    }

    // Get file from form data
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.' 
      }, { status: 400 });
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ 
        error: 'File is too large. Maximum size is 10MB.' 
      }, { status: 400 });
    }

    // Delete old banner if exists
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('banner_url')
      .eq('id', user.id)
      .single();

    if (profile?.banner_url) {
      const urlParts = profile.banner_url.split('/');
      const bucketIndex = urlParts.findIndex((part: string) => part === BANNER_BUCKET);
      if (bucketIndex !== -1) {
        const oldFilePath = urlParts.slice(bucketIndex + 1).join('/');
        await supabaseAdmin.storage
          .from(BANNER_BUCKET)
          .remove([oldFilePath]);
      }
    }

    // Generate unique filename
    const fileExt = file.name.split('.').pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `${user.id}/${fileName}`;

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload file using service role (bypasses RLS)
    const { error: uploadError } = await supabaseAdmin.storage
      .from(BANNER_BUCKET)
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: true,
      });

    if (uploadError) {
      console.error('Banner upload error:', uploadError);
      return NextResponse.json({ 
        error: `Upload failed: ${uploadError.message}` 
      }, { status: 500 });
    }

    // Get public URL
    const { data: { publicUrl } } = supabaseAdmin.storage
      .from(BANNER_BUCKET)
      .getPublicUrl(filePath);

    // Update profile with new banner URL
    const { error: updateError } = await supabaseAdmin
      .from('profiles')
      .update({ banner_url: publicUrl })
      .eq('id', user.id);

    if (updateError) {
      console.error('Profile update error:', updateError);
      return NextResponse.json({ 
        error: 'Failed to update profile' 
      }, { status: 500 });
    }

    return NextResponse.json({ url: publicUrl });

  } catch (error) {
    console.error('Banner upload error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

// DELETE - Remove banner
export async function DELETE(request: NextRequest) {
  try {
    // Check if Supabase is configured
    if (!isConfigured || !supabaseClient || !supabaseAdmin) {
      return NextResponse.json(
        { error: 'Service not configured' },
        { status: 503 }
      );
    }

    // Get user from auth header
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');

    // Verify user with token using anon key client
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError || !user) {
      return NextResponse.json({ error: 'Invalid or expired session' }, { status: 401 });
    }

    // Get current banner URL
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('banner_url')
      .eq('id', user.id)
      .single();

    if (profile?.banner_url) {
      // Extract file path from URL
      const urlParts = profile.banner_url.split('/');
      const bucketIndex = urlParts.findIndex((part: string) => part === BANNER_BUCKET);
      if (bucketIndex !== -1) {
        const filePath = urlParts.slice(bucketIndex + 1).join('/');
        
        // Delete file from storage
        await supabaseAdmin.storage
          .from(BANNER_BUCKET)
          .remove([filePath]);
      }
    }

    // Update profile to remove banner URL
    const { error: updateError } = await supabaseAdmin
      .from('profiles')
      .update({ banner_url: null })
      .eq('id', user.id);

    if (updateError) {
      console.error('Profile update error:', updateError);
      return NextResponse.json({ 
        error: 'Failed to update profile' 
      }, { status: 500 });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Banner deletion error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}
