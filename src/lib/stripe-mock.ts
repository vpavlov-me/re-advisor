// Mock Stripe Service for development/demo purposes
// This simulates Stripe Connect onboarding flow without actual Stripe integration

import { supabase } from './supabaseClient';

export type StripeAccountStatus = 'not_started' | 'initiated' | 'pending' | 'active' | 'failed';

export interface StripeAccount {
  id: string;
  status: StripeAccountStatus;
  payouts_enabled: boolean;
  charges_enabled: boolean;
  details_submitted: boolean;
  requirements: {
    currently_due: string[];
    eventually_due: string[];
    past_due: string[];
    pending_verification: string[];
  };
  business_profile: {
    name: string | null;
    url: string | null;
  };
  created_at: string;
}

export interface PayoutSettings {
  schedule: 'daily' | 'weekly' | 'monthly' | 'manual';
  delay_days: number;
  currency: string;
}

export interface MockTransaction {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed';
  type: 'payment' | 'payout' | 'refund' | 'fee';
  description: string;
  created_at: string;
  available_on?: string;
}

// Simulated delay for mock API calls
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock data storage (in memory for demo, persisted to Supabase in real usage)
let mockStripeAccount: StripeAccount | null = null;

/**
 * Start Stripe Connect onboarding (mock)
 * In production, this would redirect to Stripe's Connect onboarding
 */
export async function startStripeOnboarding(): Promise<{ 
  success: boolean; 
  onboardingUrl: string | null;
  error: string | null;
}> {
  await delay(500); // Simulate API call
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, onboardingUrl: null, error: 'Not authenticated' };
    }

    // Create a mock Stripe account ID
    const mockAccountId = `acct_mock_${Date.now()}`;

    // Update profile with stripe account info
    await supabase.from('profiles').update({
      stripe_account_id: mockAccountId,
      stripe_account_status: 'initiated',
    }).eq('id', user.id);

    // In production, this would be a real Stripe Connect onboarding URL
    const mockOnboardingUrl = `/payments?stripe_onboarding=true&account=${mockAccountId}`;

    mockStripeAccount = {
      id: mockAccountId,
      status: 'initiated',
      payouts_enabled: false,
      charges_enabled: false,
      details_submitted: false,
      requirements: {
        currently_due: ['individual.first_name', 'individual.last_name', 'individual.dob', 'bank_account'],
        eventually_due: [],
        past_due: [],
        pending_verification: [],
      },
      business_profile: {
        name: null,
        url: null,
      },
      created_at: new Date().toISOString(),
    };

    return { 
      success: true, 
      onboardingUrl: mockOnboardingUrl,
      error: null 
    };
  } catch (err) {
    return { 
      success: false, 
      onboardingUrl: null, 
      error: 'Failed to start onboarding' 
    };
  }
}

/**
 * Complete Stripe onboarding (mock simulation)
 * This simulates the user completing the Stripe onboarding form
 */
export async function completeStripeOnboarding(data: {
  businessName: string;
  website?: string;
  bankAccount?: {
    routingNumber: string;
    accountNumber: string;
    accountHolderName: string;
  };
}): Promise<{ success: boolean; error: string | null }> {
  await delay(1000); // Simulate verification delay
  
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    // Simulate successful verification (90% success rate for demo)
    const isSuccess = Math.random() > 0.1;

    if (isSuccess) {
      await supabase.from('profiles').update({
        stripe_account_status: 'pending',
      }).eq('id', user.id);

      if (mockStripeAccount) {
        mockStripeAccount.status = 'pending';
        mockStripeAccount.details_submitted = true;
        mockStripeAccount.business_profile = {
          name: data.businessName,
          url: data.website || null,
        };
        mockStripeAccount.requirements.currently_due = [];
        mockStripeAccount.requirements.pending_verification = ['identity_document'];
      }

      // Simulate auto-verification after 2 seconds
      setTimeout(async () => {
        await supabase.from('profiles').update({
          stripe_account_status: 'active',
        }).eq('id', user.id);
        
        if (mockStripeAccount) {
          mockStripeAccount.status = 'active';
          mockStripeAccount.payouts_enabled = true;
          mockStripeAccount.charges_enabled = true;
          mockStripeAccount.requirements.pending_verification = [];
        }
      }, 2000);

      return { success: true, error: null };
    } else {
      await supabase.from('profiles').update({
        stripe_account_status: 'failed',
      }).eq('id', user.id);

      return { success: false, error: 'Verification failed. Please try again.' };
    }
  } catch (err) {
    return { success: false, error: 'Failed to complete onboarding' };
  }
}

/**
 * Get Stripe account status
 */
export async function getStripeAccountStatus(): Promise<{
  account: StripeAccount | null;
  error: string | null;
}> {
  await delay(200);

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { account: null, error: 'Not authenticated' };
    }

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('stripe_account_id, stripe_account_status')
      .eq('id', user.id)
      .single();

    if (error || !profile) {
      return { account: null, error: 'Profile not found' };
    }

    if (!profile.stripe_account_id) {
      return { account: null, error: null };
    }

    // Return mock account data based on stored status
    const account: StripeAccount = {
      id: profile.stripe_account_id,
      status: profile.stripe_account_status || 'not_started',
      payouts_enabled: profile.stripe_account_status === 'active',
      charges_enabled: profile.stripe_account_status === 'active',
      details_submitted: ['pending', 'active'].includes(profile.stripe_account_status || ''),
      requirements: {
        currently_due: profile.stripe_account_status === 'initiated' 
          ? ['individual.first_name', 'individual.last_name', 'bank_account'] 
          : [],
        eventually_due: [],
        past_due: [],
        pending_verification: profile.stripe_account_status === 'pending' 
          ? ['identity_document'] 
          : [],
      },
      business_profile: {
        name: 'Advisor Business',
        url: null,
      },
      created_at: new Date().toISOString(),
    };

    return { account, error: null };
  } catch (err) {
    return { account: null, error: 'Failed to get account status' };
  }
}

/**
 * Get mock transactions/balance
 */
export async function getBalance(): Promise<{
  available: number;
  pending: number;
  currency: string;
  error: string | null;
}> {
  await delay(200);

  // Return mock balance data
  return {
    available: 15420.50,
    pending: 2350.00,
    currency: 'usd',
    error: null,
  };
}

/**
 * Get mock transactions
 */
export async function getTransactions(limit: number = 10): Promise<{
  transactions: MockTransaction[];
  error: string | null;
}> {
  await delay(300);

  // Generate mock transactions
  const mockTransactions: MockTransaction[] = [
    {
      id: 'txn_1',
      amount: 5000,
      currency: 'usd',
      status: 'succeeded',
      type: 'payment',
      description: 'Family Constitution Workshop - Morrison Family',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    },
    {
      id: 'txn_2',
      amount: -3500,
      currency: 'usd',
      status: 'succeeded',
      type: 'payout',
      description: 'Weekly payout to ****4242',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    },
    {
      id: 'txn_3',
      amount: 2500,
      currency: 'usd',
      status: 'pending',
      type: 'payment',
      description: 'Estate Planning Consultation - Chen Family',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
      available_on: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days from now
    },
    {
      id: 'txn_4',
      amount: -150,
      currency: 'usd',
      status: 'succeeded',
      type: 'fee',
      description: 'Platform fee',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(), // 3 days ago
    },
    {
      id: 'txn_5',
      amount: 7500,
      currency: 'usd',
      status: 'succeeded',
      type: 'payment',
      description: 'Monthly Retainer - Thompson Family',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(), // 4 days ago
    },
  ];

  return {
    transactions: mockTransactions.slice(0, limit),
    error: null,
  };
}

/**
 * Update payout settings (mock)
 */
export async function updatePayoutSettings(settings: PayoutSettings): Promise<{
  success: boolean;
  error: string | null;
}> {
  await delay(500);

  // In production, this would update Stripe payout settings
  console.log('Payout settings updated:', settings);
  
  return { success: true, error: null };
}

/**
 * Request manual payout (mock)
 */
export async function requestPayout(amount: number): Promise<{
  success: boolean;
  payoutId: string | null;
  error: string | null;
}> {
  await delay(800);

  if (amount < 10) {
    return { success: false, payoutId: null, error: 'Minimum payout amount is $10' };
  }

  const payoutId = `po_mock_${Date.now()}`;
  
  return { success: true, payoutId, error: null };
}

/**
 * Get payout schedule
 */
export async function getPayoutSchedule(): Promise<{
  schedule: PayoutSettings;
  error: string | null;
}> {
  await delay(200);

  return {
    schedule: {
      schedule: 'weekly',
      delay_days: 7,
      currency: 'usd',
    },
    error: null,
  };
}
