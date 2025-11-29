import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Helper to check if Supabase is properly configured
export const isSupabaseConfigured = (): boolean => {
  return !!(supabaseUrl && supabaseAnonKey && 
    supabaseUrl.startsWith('https://') &&
    supabaseAnonKey.length > 20);
};

// Log warning only in development
if (typeof window !== 'undefined' && !isSupabaseConfigured()) {
  console.warn('Supabase not configured. Running in demo mode.');
}

// Create client with placeholder if not configured (for static build)
const createSupabaseClient = (): SupabaseClient => {
  // Use real credentials if available, otherwise use placeholder for build
  const url = supabaseUrl || 'https://placeholder.supabase.co';
  const key = supabaseAnonKey || 'placeholder-key';
  
  return createClient(url, key, {
    auth: {
      persistSession: typeof window !== 'undefined',
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
    global: {
      headers: {
        'Accept': 'application/json',
      },
    },
  });
};

export const supabase = createSupabaseClient();
