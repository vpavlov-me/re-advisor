/**
 * Environment Variables Configuration
 * 
 * Centralized validation and typing for all environment variables.
 * This ensures type safety and provides helpful error messages.
 */

// ============================================
// TYPES
// ============================================

export interface EnvConfig {
  // Supabase
  supabase: {
    url: string;
    anonKey: string;
    isConfigured: boolean;
  };
  
  // Stripe
  stripe: {
    publishableKey: string;
    mode: 'mock' | 'live';
    isMock: boolean;
  };
  
  // Email
  email: {
    mode: 'mock' | 'edge-function';
    isMock: boolean;
  };
  
  // App
  app: {
    url: string;
    name: string;
    isProduction: boolean;
    isDevelopment: boolean;
  };
}

// ============================================
// VALIDATION
// ============================================

function getEnvVar(name: string, defaultValue = ''): string {
  // In browser, only NEXT_PUBLIC_ vars are available via process.env
  // They're injected at build time
  return process.env[name] || defaultValue;
}

function validateUrl(url: string, name: string): boolean {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    console.warn(`Invalid URL for ${name}: ${url}`);
    return false;
  }
}

// ============================================
// CONFIGURATION
// ============================================

// Raw values
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';
const STRIPE_MODE = (process.env.NEXT_PUBLIC_STRIPE_MODE || 'mock') as 'mock' | 'live';
const EMAIL_MODE = (process.env.NEXT_PUBLIC_EMAIL_MODE || 'mock') as 'mock' | 'edge-function';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
const NODE_ENV = process.env.NODE_ENV || 'development';

// Validation
const isSupabaseConfigured = 
  SUPABASE_URL.startsWith('https://') && 
  SUPABASE_URL.includes('.supabase.co') &&
  SUPABASE_ANON_KEY.length > 20;

const isStripeConfigured = 
  STRIPE_MODE === 'live' && 
  STRIPE_PUBLISHABLE_KEY.startsWith('pk_');

// ============================================
// EXPORT CONFIG
// ============================================

export const env: EnvConfig = {
  supabase: {
    url: SUPABASE_URL,
    anonKey: SUPABASE_ANON_KEY,
    isConfigured: isSupabaseConfigured,
  },
  stripe: {
    publishableKey: STRIPE_PUBLISHABLE_KEY,
    mode: STRIPE_MODE,
    isMock: STRIPE_MODE === 'mock',
  },
  email: {
    mode: EMAIL_MODE,
    isMock: EMAIL_MODE === 'mock',
  },
  app: {
    url: APP_URL,
    name: 'RE:Advisor',
    isProduction: NODE_ENV === 'production',
    isDevelopment: NODE_ENV === 'development',
  },
};

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Check if all required services are configured
 */
export function checkRequiredConfig(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!env.supabase.isConfigured) {
    errors.push('Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  }
  
  if (!env.stripe.isMock && !env.stripe.publishableKey) {
    errors.push('Stripe is in live mode but publishable key is missing.');
  }
  
  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Log configuration status (for debugging)
 */
export function logConfig(): void {
  if (typeof window !== 'undefined') {
    console.group('🔧 Environment Configuration');
    console.log('Supabase:', env.supabase.isConfigured ? '✅ Configured' : '⚠️ Not configured');
    console.log('Stripe:', env.stripe.isMock ? '🧪 Mock mode' : '💳 Live mode');
    console.log('Email:', env.email.isMock ? '🧪 Mock mode' : '📧 Edge Function');
    console.log('Environment:', env.app.isProduction ? '🚀 Production' : '🛠️ Development');
    console.groupEnd();
  }
}

// Auto-log in development
if (typeof window !== 'undefined' && env.app.isDevelopment) {
  logConfig();
}
