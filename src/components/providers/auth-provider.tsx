"use client";

import { createContext, useContext, useEffect, useState, ReactNode, useRef } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { signIn, signUp, signOut, signInWithOAuth, type SignUpData } from '@/lib/auth';

// Timeout for profile fetch to prevent infinite loading
const PROFILE_FETCH_TIMEOUT = 5000; // 5 seconds
// Maximum time to wait for auth initialization
const AUTH_INIT_TIMEOUT = 10000; // 10 seconds

interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  title: string | null;
  location: string | null;
  timezone: string | null;
  website: string | null;
  linkedin: string | null;
  twitter: string | null;
  bio: string | null;
  avatar_url: string | null;
  joined_date: string | null;
  completion_percentage: number;
  updated_at: string | null;
  // Onboarding fields
  is_first_login: boolean;
  onboarding_progress: number;
  onboarding_step: number;
  onboarding_completed: boolean;
  onboarding_skipped: boolean;
  onboarding_completed_at: string | null;
  profile_status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'revision_required';
  // Stripe fields
  stripe_account_id: string | null;
  stripe_account_status: 'not_started' | 'initiated' | 'pending' | 'active' | 'failed' | null;
  // KYC fields
  kyc_status: 'not_started' | 'pending' | 'verified' | 'failed' | null;
  kyc_submitted_at: string | null;
  kyc_verified_at: string | null;
  // Subscription fields
  subscription_plan: 'free' | 'starter' | 'professional' | 'enterprise';
  subscription_status: 'inactive' | 'active' | 'cancelled' | 'past_due';
  subscription_expires_at: string | null;
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
  const loadingRef = useRef(true);
  const isMountedRef = useRef(true);

  // Fetch profile with timeout to prevent infinite loading
  const fetchProfile = async (userId: string): Promise<Profile | null> => {
    const timeoutId = setTimeout(() => {
      console.warn('Profile fetch taking too long');
    }, PROFILE_FETCH_TIMEOUT);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      clearTimeout(timeoutId);
      
      if (!error && data) {
        setProfile(data as Profile);
        return data as Profile;
      }
      
      // If profile doesn't exist, that's okay - user might be new
      if (error?.code === 'PGRST116') {
        console.log('Profile not found for user, may need onboarding');
        return null;
      }
      
      console.error('Error fetching profile:', error);
      return null;
    } catch (error: any) {
      clearTimeout(timeoutId);
      console.error('Error fetching profile:', error);
      return null;
    }
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
    isMountedRef.current = true;
    
    // Safety net: force loading to false after timeout
    const authInitTimeoutId = setTimeout(() => {
      console.log('Auth timeout check - loadingRef:', loadingRef.current);
      if (isMountedRef.current && loadingRef.current) {
        console.warn('Auth initialization timed out, forcing loading to false');
        loadingRef.current = false;
        setLoading(false);
      }
    }, AUTH_INIT_TIMEOUT);
    
    // Helper to safely set loading
    const safeSetLoading = (value: boolean) => {
      if (isMountedRef.current) {
        loadingRef.current = value;
        setLoading(value);
      }
    };
    
    // Get initial session with guaranteed loading state resolution
    const initializeAuth = async () => {
      console.log('Initializing auth...');
      
      // If Supabase is not configured, skip auth and show demo mode
      if (!isSupabaseConfigured()) {
        console.log('Supabase not configured, running in demo mode');
        safeSetLoading(false);
        return;
      }
      
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        console.log('getSession result:', { hasSession: !!session, hasUser: !!session?.user, error });
        
        if (!isMountedRef.current) return;
        
        if (error) {
          console.error('Error getting session:', error);
          safeSetLoading(false);
          return;
        }
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch profile but don't block loading state
          console.log('Fetching profile for user:', session.user.id);
          await fetchProfile(session.user.id);
        }
        
        console.log('Auth initialization complete, setting loading to false');
        safeSetLoading(false);
      } catch (error) {
        console.error('Error initializing auth:', error);
        safeSetLoading(false);
      }
    };

    initializeAuth();

    // Skip auth listener if Supabase is not configured
    if (!isSupabaseConfigured()) {
      return () => {
        isMountedRef.current = false;
        clearTimeout(authInitTimeoutId);
      };
    }

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!isMountedRef.current) return;
        
        console.log('Auth state changed:', event, { hasSession: !!session, hasUser: !!session?.user });
        
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Fetch profile in background, don't block UI
          fetchProfile(session.user.id).catch(err => {
            console.error('Background profile fetch failed:', err);
          });
        } else {
          setProfile(null);
        }
        
        // Always ensure loading is false after auth change
        safeSetLoading(false);
      }
    );

    return () => {
      isMountedRef.current = false;
      clearTimeout(authInitTimeoutId);
      subscription.unsubscribe();
    };
  }, []); // Empty dependency array - run once on mount

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
