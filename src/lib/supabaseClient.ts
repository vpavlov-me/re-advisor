import { createBrowserClient } from '@supabase/ssr';
import { env } from './env';

// Re-export for backwards compatibility
export const isSupabaseConfigured = (): boolean => env.supabase.isConfigured;

// Log warning only in development
if (typeof window !== 'undefined' && !env.supabase.isConfigured) {
  console.warn('Supabase not configured. Running in demo mode.');
}

// Use real credentials if available, otherwise use placeholder for build
const supabaseUrl = env.supabase.url || 'https://placeholder.supabase.co';
const supabaseAnonKey = env.supabase.anonKey || 'placeholder-key';

// Create browser client with cookie-based session storage
// This ensures cookies are synchronized with the server (middleware)
export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
