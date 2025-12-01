import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { env } from './env';

// Re-export for backwards compatibility
export const isSupabaseConfigured = (): boolean => env.supabase.isConfigured;

// Log warning only in development
if (typeof window !== 'undefined' && !env.supabase.isConfigured) {
  console.warn('Supabase not configured. Running in demo mode.');
}

// Create client with placeholder if not configured (for static build)
// Note: We use 'any' for Database type until we generate proper types with supabase gen types
const createSupabaseClient = (): SupabaseClient => {
  // Use real credentials if available, otherwise use placeholder for build
  const url = env.supabase.url || 'https://placeholder.supabase.co';
  const key = env.supabase.anonKey || 'placeholder-key';
  
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
