import { supabase } from './supabaseClient';
import type { User, Session, AuthError } from '@supabase/supabase-js';

export interface AuthResult {
  user: User | null;
  session: Session | null;
  error: AuthError | null;
}

export interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  company?: string;
}

// Sign up with email and password
export async function signUp(data: SignUpData): Promise<AuthResult> {
  const { email, password, firstName, lastName, phone, company } = data;
  
  const { data: authData, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        first_name: firstName,
        last_name: lastName,
        phone: phone || '',
        company: company || '',
      },
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });

  // Note: Profile is created automatically by database trigger (handle_new_user)
  // The trigger will use raw_user_meta_data to populate first_name, last_name, etc.

  return {
    user: authData?.user ?? null,
    session: authData?.session ?? null,
    error,
  };
}

// Sign in with email and password
export async function signIn(email: string, password: string): Promise<AuthResult> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return {
    user: data?.user ?? null,
    session: data?.session ?? null,
    error,
  };
}

// Sign out
export async function signOut(): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.signOut();
  return { error };
}

// Get current user
export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

// Get current session
export async function getSession(): Promise<Session | null> {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

// Password reset request
export async function resetPassword(email: string): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth/reset-password`,
  });
  return { error };
}

// Alias for backwards compatibility
export const requestPasswordReset = resetPassword;

// Update password (for reset flow)
export async function updatePassword(newPassword: string): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  return { error };
}

// Resend verification email
export async function resendVerificationEmail(email: string): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email,
    options: {
      emailRedirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  return { error };
}

// OAuth sign in
export async function signInWithOAuth(provider: 'google' | 'github' | 'linkedin_oidc' | 'apple'): Promise<{ error: AuthError | null }> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
    },
  });
  return { error };
}

// Listen to auth state changes
export function onAuthStateChange(callback: (event: string, session: Session | null) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(event, session);
  });
}

// Check if email is verified
export function isEmailVerified(user: User | null): boolean {
  return user?.email_confirmed_at != null;
}
