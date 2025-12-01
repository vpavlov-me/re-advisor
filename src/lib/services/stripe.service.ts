/**
 * Stripe Service for Client-Side Usage
 * 
 * This service provides a mock-first approach for Stripe integration.
 * It uses mock data by default and can be switched to real Stripe
 * by setting NEXT_PUBLIC_STRIPE_MODE=live in environment variables.
 * 
 * For GitHub Pages deployment, we can't use server-side Stripe SDK.
 * Real payments require Supabase Edge Functions or external backend.
 */

import { supabase, isSupabaseConfigured } from '../supabaseClient';

// ============================================
// CONFIGURATION
// ============================================

export const STRIPE_MODE = process.env.NEXT_PUBLIC_STRIPE_MODE || 'mock';
export const IS_MOCK_MODE = STRIPE_MODE === 'mock';

// Subscription Plans
export const PLANS = {
  starter: {
    id: 'starter',
    name: 'Starter',
    price: 49,
    priceId: process.env.NEXT_PUBLIC_STRIPE_STARTER_PRICE_ID || 'price_starter_mock',
    features: [
      'Up to 5 family clients',
      '10 consultations/month',
      'Basic messaging',
      '5GB storage',
      'Email support',
    ],
    limits: {
      families: 5,
      consultations: 10,
      storage: 5, // GB
    },
  },
  professional: {
    id: 'professional',
    name: 'Professional',
    price: 99,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PROFESSIONAL_PRICE_ID || 'price_professional_mock',
    features: [
      'Up to 15 family clients',
      '20 consultations/month',
      'Priority messaging',
      '10GB storage',
      'Priority support',
      'Analytics dashboard',
    ],
    limits: {
      families: 15,
      consultations: 20,
      storage: 10,
    },
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 249,
    priceId: process.env.NEXT_PUBLIC_STRIPE_ENTERPRISE_PRICE_ID || 'price_enterprise_mock',
    features: [
      'Unlimited family clients',
      'Unlimited consultations',
      'Priority messaging',
      '50GB storage',
      'Dedicated support',
      'Advanced analytics',
      'Custom branding',
      'API access',
    ],
    limits: {
      families: -1, // unlimited
      consultations: -1,
      storage: 50,
    },
  },
} as const;

export type PlanId = keyof typeof PLANS;

// ============================================
// TYPES
// ============================================

export type StripeAccountStatus = 'not_started' | 'initiated' | 'pending' | 'active' | 'failed';
export type SubscriptionStatus = 'inactive' | 'active' | 'cancelled' | 'past_due' | 'trialing';

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

export interface Subscription {
  id: string;
  plan_id: PlanId;
  status: SubscriptionStatus;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  trial_end?: string;
}

export interface PaymentMethod {
  id: string;
  type: 'card';
  brand: string;
  last4: string;
  exp_month: number;
  exp_year: number;
  is_default: boolean;
}

export interface Transaction {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed';
  type: 'payment' | 'payout' | 'refund' | 'fee';
  description: string;
  created_at: string;
  available_on?: string;
}

export interface CheckoutSession {
  id: string;
  url: string;
}

// ============================================
// MOCK DATA GENERATORS
// ============================================

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

function generateMockSubscription(planId: PlanId, status: SubscriptionStatus = 'active'): Subscription {
  const now = new Date();
  const periodEnd = new Date(now);
  periodEnd.setMonth(periodEnd.getMonth() + 1);
  
  return {
    id: `sub_mock_${Date.now()}`,
    plan_id: planId,
    status,
    current_period_start: now.toISOString(),
    current_period_end: periodEnd.toISOString(),
    cancel_at_period_end: false,
  };
}

function generateMockTransactions(): Transaction[] {
  return [
    {
      id: 'txn_mock_1',
      amount: 5000,
      currency: 'usd',
      status: 'succeeded',
      type: 'payment',
      description: 'Family Constitution Workshop - Morrison Family',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    },
    {
      id: 'txn_mock_2',
      amount: -3500,
      currency: 'usd',
      status: 'succeeded',
      type: 'payout',
      description: 'Weekly payout to ****4242',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
    {
      id: 'txn_mock_3',
      amount: 2500,
      currency: 'usd',
      status: 'pending',
      type: 'payment',
      description: 'Estate Planning Consultation - Chen Family',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      available_on: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
    },
    {
      id: 'txn_mock_4',
      amount: -150,
      currency: 'usd',
      status: 'succeeded',
      type: 'fee',
      description: 'Platform fee',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    },
    {
      id: 'txn_mock_5',
      amount: 7500,
      currency: 'usd',
      status: 'succeeded',
      type: 'payment',
      description: 'Monthly Retainer - Thompson Family',
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    },
  ];
}

// ============================================
// SUBSCRIPTION MANAGEMENT
// ============================================

/**
 * Create a checkout session for subscription
 * In mock mode: Simulates immediate subscription activation
 * In live mode: Would redirect to Stripe Checkout (requires Edge Function)
 */
export async function createCheckoutSession(planId: PlanId): Promise<{
  session: CheckoutSession | null;
  error: string | null;
}> {
  await delay(500);

  if (!isSupabaseConfigured()) {
    return { session: null, error: 'Supabase not configured' };
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { session: null, error: 'Not authenticated' };
    }

    if (IS_MOCK_MODE) {
      // Mock mode: Create subscription directly in database
      const subscription = generateMockSubscription(planId, 'trialing');
      
      await supabase.from('subscriptions').upsert({
        advisor_id: user.id,
        plan_id: planId,
        status: 'trialing',
        stripe_subscription_id: subscription.id,
        current_period_start: subscription.current_period_start,
        current_period_end: subscription.current_period_end,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'advisor_id' });

      // Return mock checkout URL that triggers success
      return {
        session: {
          id: `cs_mock_${Date.now()}`,
          url: `/subscription?success=true&plan=${planId}`,
        },
        error: null,
      };
    }

    // Live mode: Would call Supabase Edge Function
    // For now, return error indicating live mode is not implemented
    return {
      session: null,
      error: 'Live Stripe integration requires Edge Functions. Please use mock mode or implement Edge Function.',
    };
  } catch (err) {
    console.error('Checkout session error:', err);
    return { session: null, error: 'Failed to create checkout session' };
  }
}

/**
 * Get current subscription
 */
export async function getSubscription(): Promise<{
  subscription: Subscription | null;
  error: string | null;
}> {
  await delay(200);

  if (!isSupabaseConfigured()) {
    return { subscription: null, error: 'Supabase not configured' };
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { subscription: null, error: 'Not authenticated' };
    }

    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('advisor_id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    if (!data) {
      return { subscription: null, error: null };
    }

    return {
      subscription: {
        id: data.stripe_subscription_id || data.id.toString(),
        plan_id: data.plan_id as PlanId,
        status: data.status as SubscriptionStatus,
        current_period_start: data.current_period_start,
        current_period_end: data.current_period_end,
        cancel_at_period_end: false,
      },
      error: null,
    };
  } catch (err) {
    console.error('Get subscription error:', err);
    return { subscription: null, error: 'Failed to get subscription' };
  }
}

/**
 * Cancel subscription
 */
export async function cancelSubscription(): Promise<{
  success: boolean;
  error: string | null;
}> {
  await delay(500);

  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    const { error } = await supabase
      .from('subscriptions')
      .update({
        status: 'cancelled',
        updated_at: new Date().toISOString(),
      })
      .eq('advisor_id', user.id);

    if (error) throw error;

    return { success: true, error: null };
  } catch (err) {
    console.error('Cancel subscription error:', err);
    return { success: false, error: 'Failed to cancel subscription' };
  }
}

/**
 * Change subscription plan
 */
export async function changePlan(newPlanId: PlanId): Promise<{
  success: boolean;
  error: string | null;
}> {
  await delay(800);

  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    const { error } = await supabase
      .from('subscriptions')
      .update({
        plan_id: newPlanId,
        updated_at: new Date().toISOString(),
      })
      .eq('advisor_id', user.id);

    if (error) throw error;

    return { success: true, error: null };
  } catch (err) {
    console.error('Change plan error:', err);
    return { success: false, error: 'Failed to change plan' };
  }
}

// ============================================
// STRIPE CONNECT (for payouts)
// ============================================

/**
 * Start Stripe Connect onboarding
 */
export async function startStripeOnboarding(): Promise<{
  success: boolean;
  onboardingUrl: string | null;
  error: string | null;
}> {
  await delay(500);

  if (!isSupabaseConfigured()) {
    return { success: false, onboardingUrl: null, error: 'Supabase not configured' };
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, onboardingUrl: null, error: 'Not authenticated' };
    }

    const mockAccountId = `acct_mock_${Date.now()}`;

    await supabase.from('profiles').update({
      stripe_account_id: mockAccountId,
      stripe_account_status: 'initiated',
    }).eq('id', user.id);

    return {
      success: true,
      onboardingUrl: `/payments?stripe_onboarding=true&account=${mockAccountId}`,
      error: null,
    };
  } catch (err) {
    console.error('Stripe onboarding error:', err);
    return { success: false, onboardingUrl: null, error: 'Failed to start onboarding' };
  }
}

/**
 * Complete Stripe onboarding (mock)
 */
export async function completeStripeOnboarding(_data: {
  businessName: string;
  website?: string;
  bankAccount?: {
    routingNumber: string;
    accountNumber: string;
    accountHolderName: string;
  };
}): Promise<{ success: boolean; error: string | null }> {
  await delay(1000);

  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    // Simulate verification (90% success rate)
    const isSuccess = Math.random() > 0.1;

    if (isSuccess) {
      await supabase.from('profiles').update({
        stripe_account_status: 'pending',
      }).eq('id', user.id);

      // Auto-verify after delay
      setTimeout(async () => {
        await supabase.from('profiles').update({
          stripe_account_status: 'active',
        }).eq('id', user.id);
      }, 2000);

      return { success: true, error: null };
    } else {
      await supabase.from('profiles').update({
        stripe_account_status: 'failed',
      }).eq('id', user.id);

      return { success: false, error: 'Verification failed. Please try again.' };
    }
  } catch (err) {
    console.error('Complete onboarding error:', err);
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

  if (!isSupabaseConfigured()) {
    return { account: null, error: 'Supabase not configured' };
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { account: null, error: 'Not authenticated' };
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_account_id, stripe_account_status')
      .eq('id', user.id)
      .single();

    if (!profile?.stripe_account_id) {
      return { account: null, error: null };
    }

    const status = profile.stripe_account_status as StripeAccountStatus || 'not_started';

    return {
      account: {
        id: profile.stripe_account_id,
        status,
        payouts_enabled: status === 'active',
        charges_enabled: status === 'active',
        details_submitted: ['pending', 'active'].includes(status),
        requirements: {
          currently_due: status === 'initiated' ? ['identity', 'bank_account'] : [],
          eventually_due: [],
          past_due: [],
          pending_verification: status === 'pending' ? ['identity_document'] : [],
        },
        business_profile: { name: 'Advisor Business', url: null },
        created_at: new Date().toISOString(),
      },
      error: null,
    };
  } catch (err) {
    console.error('Get Stripe account error:', err);
    return { account: null, error: 'Failed to get account status' };
  }
}

// ============================================
// BALANCE & TRANSACTIONS
// ============================================

/**
 * Get balance
 */
export async function getBalance(): Promise<{
  available: number;
  pending: number;
  currency: string;
  error: string | null;
}> {
  await delay(200);

  // Return mock balance
  return {
    available: 15420.50,
    pending: 2350.00,
    currency: 'usd',
    error: null,
  };
}

/**
 * Get transactions
 */
export async function getTransactions(limit: number = 10): Promise<{
  transactions: Transaction[];
  error: string | null;
}> {
  await delay(300);

  if (!isSupabaseConfigured()) {
    // Return mock data
    return {
      transactions: generateMockTransactions().slice(0, limit),
      error: null,
    };
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { transactions: generateMockTransactions().slice(0, limit), error: null };
    }

    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('advisor_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    if (!data || data.length === 0) {
      // Return mock data if no real transactions
      return {
        transactions: generateMockTransactions().slice(0, limit),
        error: null,
      };
    }

    return {
      transactions: data.map(t => ({
        id: t.id.toString(),
        amount: parseFloat(t.amount?.replace(/[^0-9.-]+/g, '') || '0') * 100,
        currency: 'usd',
        status: t.status as Transaction['status'] || 'succeeded',
        type: t.type as Transaction['type'] || 'payment',
        description: t.description || '',
        created_at: t.created_at,
      })),
      error: null,
    };
  } catch (err) {
    console.error('Get transactions error:', err);
    return { transactions: generateMockTransactions().slice(0, limit), error: null };
  }
}

/**
 * Request payout
 */
export async function requestPayout(amount: number): Promise<{
  success: boolean;
  payoutId: string | null;
  error: string | null;
}> {
  await delay(800);

  if (amount < 1000) { // $10 minimum in cents
    return { success: false, payoutId: null, error: 'Minimum payout amount is $10' };
  }

  return {
    success: true,
    payoutId: `po_mock_${Date.now()}`,
    error: null,
  };
}

// ============================================
// PAYMENT METHODS
// ============================================

/**
 * Get payment methods
 */
export async function getPaymentMethods(): Promise<{
  methods: PaymentMethod[];
  error: string | null;
}> {
  await delay(300);

  if (!isSupabaseConfigured()) {
    return { methods: [], error: null };
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { methods: [], error: null };
    }

    const { data, error } = await supabase
      .from('payment_methods')
      .select('*')
      .eq('advisor_id', user.id);

    if (error) throw error;

    return {
      methods: (data || []).map(pm => ({
        id: pm.id.toString(),
        type: 'card' as const,
        brand: pm.brand || 'visa',
        last4: pm.last4 || '4242',
        exp_month: parseInt(pm.expiry?.split('/')[0] || '12'),
        exp_year: parseInt(`20${pm.expiry?.split('/')[1] || '25'}`),
        is_default: pm.is_default || false,
      })),
      error: null,
    };
  } catch (err) {
    console.error('Get payment methods error:', err);
    return { methods: [], error: 'Failed to get payment methods' };
  }
}

/**
 * Add payment method (mock)
 */
export async function addPaymentMethod(data: {
  cardNumber: string;
  expMonth: number;
  expYear: number;
  cvc: string;
}): Promise<{
  method: PaymentMethod | null;
  error: string | null;
}> {
  await delay(800);

  if (!isSupabaseConfigured()) {
    return { method: null, error: 'Supabase not configured' };
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { method: null, error: 'Not authenticated' };
    }

    const last4 = data.cardNumber.slice(-4);
    
    const { data: pm, error } = await supabase
      .from('payment_methods')
      .insert({
        advisor_id: user.id,
        type: 'card',
        brand: 'visa',
        last4,
        expiry: `${data.expMonth}/${data.expYear.toString().slice(-2)}`,
        is_default: true,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      method: {
        id: pm.id.toString(),
        type: 'card',
        brand: 'visa',
        last4,
        exp_month: data.expMonth,
        exp_year: data.expYear,
        is_default: true,
      },
      error: null,
    };
  } catch (err) {
    console.error('Add payment method error:', err);
    return { method: null, error: 'Failed to add payment method' };
  }
}

/**
 * Remove payment method
 */
export async function removePaymentMethod(methodId: string): Promise<{
  success: boolean;
  error: string | null;
}> {
  await delay(500);

  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { error } = await supabase
      .from('payment_methods')
      .delete()
      .eq('id', methodId);

    if (error) throw error;

    return { success: true, error: null };
  } catch (err) {
    console.error('Remove payment method error:', err);
    return { success: false, error: 'Failed to remove payment method' };
  }
}
