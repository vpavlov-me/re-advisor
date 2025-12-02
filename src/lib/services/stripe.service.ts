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

// ============================================
// SUBSCRIPTION PLANS (Epic-028)
// ============================================

// Platform launch date for promotional period calculation
export const PLATFORM_LAUNCH_DATE = new Date('2025-01-01');

// Commission rates
export const COMMISSION_RATES = {
  promotional: 0, // 0% during promotional period
  standard: 10, // 10% after promotional period ends
};

// Family Portal limits
export const PORTAL_LIMITS = {
  standard: 0, // Standard cannot create portals
  premium: 3, // Premium includes 3 portals
  additionalPortalPrice: 49, // $49/month for each additional portal
};

// Subscription Plans - согласно Epic-028
export const PLANS = {
  standard: {
    id: 'standard',
    name: 'Standard Consultant',
    price: 149,
    priceId: process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID || 'price_standard_mock',
    description: 'For consultants working with existing families',
    features: [
      'Access to family marketplace',
      'Work with unlimited families (their invitations)',
      'Profile in consultant directory',
      'Basic analytics',
      'Email support',
      `${COMMISSION_RATES.promotional}% commission (promo period)`,
    ],
    limitations: [
      'Cannot create Family Portals',
      'Only External Consultant role in families',
    ],
    limits: {
      familyPortals: 0,
      canCreatePortals: false,
    },
  },
  premium: {
    id: 'premium',
    name: 'Premium Consultant',
    price: 599,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID || 'price_premium_mock',
    description: 'For consultants creating their own Family Portals',
    features: [
      'Everything in Standard plan',
      `Create up to ${PORTAL_LIMITS.premium} Family Portals (included)`,
      'External Consultant + Administrator role in new families',
      'Priority support',
      'Advanced analytics',
      'Ability to invite other consultants to portal',
      `Additional portals: +$${PORTAL_LIMITS.additionalPortalPrice}/month`,
    ],
    limitations: [],
    limits: {
      familyPortals: PORTAL_LIMITS.premium,
      canCreatePortals: true,
    },
  },
} as const;

export type PlanId = keyof typeof PLANS;

// Legacy plan mapping for migration
export const LEGACY_PLAN_MAPPING: Record<string, PlanId> = {
  starter: 'standard',
  professional: 'standard',
  enterprise: 'premium',
};

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
  // Family Portal usage (Epic-028)
  portals_used: number;
  portals_included: number;
  additional_portals: number;
}

export interface PortalUsage {
  used: number;
  included: number;
  additional: number;
  total: number;
  canCreateMore: boolean;
}

export interface CommissionInfo {
  currentRate: number;
  isPromotional: boolean;
  promotionalEndsAt?: string;
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
  
  const plan = PLANS[planId];
  
  return {
    id: `sub_mock_${Date.now()}`,
    plan_id: planId,
    status,
    current_period_start: now.toISOString(),
    current_period_end: periodEnd.toISOString(),
    cancel_at_period_end: false,
    portals_used: planId === 'premium' ? 1 : 0, // Mock: 1 portal used for premium
    portals_included: plan.limits.familyPortals,
    additional_portals: 0,
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

    // Map legacy plan IDs to new ones
    let planId = data.plan_id as PlanId;
    if (!(planId in PLANS) && planId in LEGACY_PLAN_MAPPING) {
      planId = LEGACY_PLAN_MAPPING[planId];
    }
    
    const plan = PLANS[planId] || PLANS.standard;

    return {
      subscription: {
        id: data.stripe_subscription_id || data.id.toString(),
        plan_id: planId,
        status: data.status as SubscriptionStatus,
        current_period_start: data.current_period_start,
        current_period_end: data.current_period_end,
        cancel_at_period_end: false,
        portals_used: data.portals_used || 0,
        portals_included: plan.limits.familyPortals,
        additional_portals: data.additional_portals || 0,
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

// ============================================
// EPIC-028: PORTAL & COMMISSION MANAGEMENT
// ============================================

/**
 * Get portal usage for current subscription
 */
export async function getPortalUsage(): Promise<{
  usage: PortalUsage | null;
  error: string | null;
}> {
  await delay(200);

  if (!isSupabaseConfigured()) {
    return { usage: null, error: 'Supabase not configured' };
  }

  try {
    const { subscription, error } = await getSubscription();
    
    if (error || !subscription) {
      return { usage: null, error: error || 'No subscription found' };
    }

    const plan = PLANS[subscription.plan_id];
    const total = subscription.portals_included + subscription.additional_portals;

    return {
      usage: {
        used: subscription.portals_used,
        included: subscription.portals_included,
        additional: subscription.additional_portals,
        total,
        canCreateMore: plan.limits.canCreatePortals && subscription.portals_used < total,
      },
      error: null,
    };
  } catch (err) {
    console.error('Get portal usage error:', err);
    return { usage: null, error: 'Failed to get portal usage' };
  }
}

/**
 * Get current commission info
 */
export function getCommissionInfo(): CommissionInfo {
  const now = new Date();
  // Promotional period: 12 months from platform launch
  const promotionalEndDate = new Date(PLATFORM_LAUNCH_DATE);
  promotionalEndDate.setFullYear(promotionalEndDate.getFullYear() + 1);
  
  const isPromotional = now < promotionalEndDate;

  return {
    currentRate: isPromotional ? COMMISSION_RATES.promotional : COMMISSION_RATES.standard,
    isPromotional,
    promotionalEndsAt: isPromotional ? promotionalEndDate.toISOString() : undefined,
  };
}

/**
 * Check if user can create a new Family Portal
 */
export async function canCreatePortal(): Promise<{
  canCreate: boolean;
  reason?: string;
  upgradeRequired?: boolean;
}> {
  const { subscription } = await getSubscription();
  
  if (!subscription) {
    return {
      canCreate: false,
      reason: 'An active subscription is required to create a Family Portal',
      upgradeRequired: true,
    };
  }

  const plan = PLANS[subscription.plan_id];
  
  if (!plan.limits.canCreatePortals) {
    return {
      canCreate: false,
      reason: 'Standard plan does not allow creating Family Portals. Upgrade to Premium.',
      upgradeRequired: true,
    };
  }

  const total = subscription.portals_included + subscription.additional_portals;
  
  if (subscription.portals_used >= total) {
    return {
      canCreate: false,
      reason: `Portal limit reached (${subscription.portals_used}/${total}). Add an additional slot.`,
      upgradeRequired: false,
    };
  }

  return { canCreate: true };
}

/**
 * Purchase additional portal slot
 */
export async function purchaseAdditionalPortal(): Promise<{
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

    const { subscription } = await getSubscription();
    if (!subscription || subscription.plan_id !== 'premium') {
      return { success: false, error: 'Premium subscription required' };
    }

    // In mock mode, just increment the additional_portals counter
    if (IS_MOCK_MODE) {
      const { error } = await supabase
        .from('subscriptions')
        .update({
          additional_portals: (subscription.additional_portals || 0) + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('advisor_id', user.id);

      if (error) throw error;

      return { success: true, error: null };
    }

    // Live mode would create a Stripe subscription item
    return { success: false, error: 'Live Stripe integration not implemented' };
  } catch (err) {
    console.error('Purchase additional portal error:', err);
    return { success: false, error: 'Failed to purchase additional portal' };
  }
}

/**
 * Increment portal usage (called when creating a new Family Portal)
 */
export async function incrementPortalUsage(): Promise<{
  success: boolean;
  error: string | null;
}> {
  await delay(200);

  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    const { canCreate, reason, upgradeRequired } = await canCreatePortal();
    if (!canCreate) {
      return { success: false, error: reason || (upgradeRequired ? 'Upgrade required' : 'Cannot create portal') };
    }

    const { subscription } = await getSubscription();
    if (!subscription) {
      return { success: false, error: 'No subscription found' };
    }

    const { error } = await supabase
      .from('subscriptions')
      .update({
        portals_used: subscription.portals_used + 1,
        updated_at: new Date().toISOString(),
      })
      .eq('advisor_id', user.id);

    if (error) throw error;

    return { success: true, error: null };
  } catch (err) {
    console.error('Increment portal usage error:', err);
    return { success: false, error: 'Failed to increment portal usage' };
  }
}

/**
 * Get upgrade/downgrade preview
 */
export function getUpgradePreview(
  fromPlan: PlanId,
  toPlan: PlanId,
  daysRemaining: number
): {
  proratedCredit: number;
  newCharge: number;
  netAmount: number;
  description: string;
} {
  const from = PLANS[fromPlan];
  const to = PLANS[toPlan];
  
  const daysInMonth = 30;
  const dailyRateFrom = from.price / daysInMonth;
  const dailyRateTo = to.price / daysInMonth;
  
  const proratedCredit = Math.round(dailyRateFrom * daysRemaining * 100) / 100;
  const newCharge = Math.round(dailyRateTo * daysRemaining * 100) / 100;
  const netAmount = Math.round((newCharge - proratedCredit) * 100) / 100;

  const isUpgrade = to.price > from.price;
  
  return {
    proratedCredit,
    newCharge,
    netAmount,
    description: isUpgrade
      ? `Upgrade from ${from.name} to ${to.name}. Due now: $${netAmount > 0 ? netAmount.toFixed(2) : '0.00'}`
      : `Downgrade from ${from.name} to ${to.name}. Changes will take effect at the end of the current period.`,
  };
}
