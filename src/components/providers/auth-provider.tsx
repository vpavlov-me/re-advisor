"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabaseClient';
import { signIn, signUp, signOut, signInWithOAuth, type SignUpData } from '@/lib/auth';

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  is_first_login: boolean;
  onboarding_progress: number;
  profile_status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'revision_required';
  stripe_account_id: string | null;
  stripe_account_status: 'not_started' | 'initiated' | 'pending' | 'active' | 'failed' | null;
  kyc_status: 'not_started' | 'pending' | 'verified' | 'failed' | null;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  isAuthenticated: boolean;
  isEmailVerified: boolean;
  login: (email: string, password: string) => Promise<{ error: Error | null }>;
  register: (data: SignUpData) => Promise<{ error: Error | null; needsVerification: boolean }>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<{ error: Error | null }>;
  loginWithGithub: () => Promise<{ error: Error | null }>;
  loginWithLinkedIn: () => Promise<{ error: Error | null }>;
  loginWithApple: () => Promise<{ error: Error | null }>;
  refreshProfile: () => Promise<void>;
  updateFirstLogin: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (!error && data) {
      setProfile(data as Profile);
    }
    return data;
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchProfile(user.id);
    }
  };

  const updateFirstLogin = async () => {
    if (user && profile?.is_first_login) {
      await supabase
        .from('profiles')
        .update({ is_first_login: false })
        .eq('id', user.id);
      
      setProfile(prev => prev ? { ...prev, is_first_login: false } : null);
    }
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          await fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await signIn(email, password);
    return { error: error as Error | null };
  };

  const register = async (data: SignUpData) => {
    const { user, error } = await signUp(data);
    const needsVerification = !error && user && !user.email_confirmed_at ? true : false;
    return { error: error as Error | null, needsVerification };
  };

  const logout = async () => {
    await signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
  };

  const loginWithGoogle = async () => {
    const { error } = await signInWithOAuth('google');
    return { error: error as Error | null };
  };

  const loginWithGithub = async () => {
    const { error } = await signInWithOAuth('github');
    return { error: error as Error | null };
  };

  const loginWithLinkedIn = async () => {
    const { error } = await signInWithOAuth('linkedin_oidc');
    return { error: error as Error | null };
  };

  const loginWithApple = async () => {
    const { error } = await signInWithOAuth('apple');
    return { error: error as Error | null };
  };

  const value: AuthContextType = {
    user,
    session,
    profile,
    loading,
    isAuthenticated: !!user,
    isEmailVerified: !!user?.email_confirmed_at,
    login,
    register,
    logout,
    loginWithGoogle,
    loginWithGithub,
    loginWithLinkedIn,
    loginWithApple,
    refreshProfile,
    updateFirstLogin,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
