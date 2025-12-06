import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use service role for server-side operations (bypasses RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

const BANNER_BUCKET = 'banners';

// POST - Upload banner
export async function POST(request: NextRequest) {
  try {
    // Get user from auth header
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);

    // Verify user with token
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
    if (userError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Get file from form data
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Invalid file type. Please upload a JPEG, PNG, GIF, or WebP image.' 
      }, { status: 400 });
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
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
      console.error('Upload error:', uploadError);
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
    // Get user from auth header
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);

    // Verify user with token
    const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);
    if (userError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
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
