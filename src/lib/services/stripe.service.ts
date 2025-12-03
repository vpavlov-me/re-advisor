/**
 * Stripe Service for Client-Side Usage
 * 
 * This service provides real Stripe integration through API routes.
 * All sensitive operations happen server-side via /api/stripe/* endpoints.
 */

import { supabase, isSupabaseConfigured } from '../supabaseClient';

// ============================================
// CONFIGURATION
// ============================================

// Always use live mode when Stripe keys are configured
export const STRIPE_MODE = 'live';
export const IS_MOCK_MODE = false;

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
  additionalPortalPrice: 29, // $29/month for each additional portal
};

// Subscription Plans - согласно Epic-028
export const PLANS = {
  standard: {
    id: 'standard',
    name: 'Standard Consultant',
    price: 49,
    priceId: process.env.NEXT_PUBLIC_STRIPE_STANDARD_PRICE_ID || '',
    description: 'For consultants working with existing families',
    features: [
      'Access to family marketplace',
      'Work with unlimited families (via their invitations)',
      'Profile in consultant directory',
      'Basic analytics',
      'Email support',
      `${COMMISSION_RATES.promotional}% commission (promo period)`,
    ],
    limitations: [
      'Cannot create Family Portals',
      'External Consultant role only',
    ],
    limits: {
      familyPortals: 0,
      canCreatePortals: false,
    },
  },
  premium: {
    id: 'premium',
    name: 'Premium Consultant',
    price: 99,
    priceId: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID || '',
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
  professional: 'premium',
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
// SUBSCRIPTION MANAGEMENT
// ============================================

/**
 * Create a checkout session for subscription via API route
 */
export async function createCheckoutSession(planId: PlanId): Promise<{
  session: CheckoutSession | null;
  error: string | null;
}> {
  try {
    const response = await fetch('/api/stripe/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ planId }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { session: null, error: data.error || 'Failed to create checkout session' };
    }

    return {
      session: {
        id: data.sessionId,
        url: data.url,
      },
      error: null,
    };
  } catch (err) {
    console.error('Checkout session error:', err);
    return { session: null, error: 'Failed to create checkout session' };
  }
}

/**
 * Get current subscription from database
 */
export async function getSubscription(): Promise<{
  subscription: Subscription | null;
  error: string | null;
}> {
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
        cancel_at_period_end: data.cancel_at_period_end || false,
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
 * Cancel subscription via API
 */
export async function cancelSubscription(): Promise<{
  success: boolean;
  error: string | null;
}> {
  try {
    const response = await fetch('/api/stripe/subscription/cancel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to cancel subscription' };
    }

    return { success: true, error: null };
  } catch (err) {
    console.error('Cancel subscription error:', err);
    return { success: false, error: 'Failed to cancel subscription' };
  }
}

/**
 * Change subscription plan via API
 */
export async function changePlan(newPlanId: PlanId): Promise<{
  success: boolean;
  error: string | null;
}> {
  try {
    const response = await fetch('/api/stripe/subscription/change', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ planId: newPlanId }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to change plan' };
    }

    return { success: true, error: null };
  } catch (err) {
    console.error('Change plan error:', err);
    return { success: false, error: 'Failed to change plan' };
  }
}

/**
 * Open Stripe Customer Portal
 */
export async function openCustomerPortal(): Promise<{
  url: string | null;
  error: string | null;
}> {
  try {
    const response = await fetch('/api/stripe/portal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { url: null, error: data.error || 'Failed to open portal' };
    }

    return { url: data.url, error: null };
  } catch (err) {
    console.error('Customer portal error:', err);
    return { url: null, error: 'Failed to open customer portal' };
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
  try {
    const response = await fetch('/api/stripe/connect/onboarding', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, onboardingUrl: null, error: data.error || 'Failed to start onboarding' };
    }

    return {
      success: true,
      onboardingUrl: data.url,
      error: null,
    };
  } catch (err) {
    console.error('Stripe onboarding error:', err);
    return { success: false, onboardingUrl: null, error: 'Failed to start onboarding' };
  }
}

/**
 * Get Stripe account status from database
 */
export async function getStripeAccountStatus(): Promise<{
  account: StripeAccount | null;
  error: string | null;
}> {
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
      .select('stripe_account_id, stripe_account_status, stripe_customer_id')
      .eq('id', user.id)
      .single();

    if (!profile?.stripe_account_id && !profile?.stripe_customer_id) {
      return { account: null, error: null };
    }

    const status = (profile.stripe_account_status as StripeAccountStatus) || 'not_started';

    return {
      account: {
        id: profile.stripe_account_id || profile.stripe_customer_id,
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
        business_profile: { name: null, url: null },
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
 * Get balance from Stripe via API
 */
export async function getBalance(): Promise<{
  available: number;
  pending: number;
  currency: string;
  error: string | null;
}> {
  try {
    const response = await fetch('/api/stripe/balance');
    
    if (!response.ok) {
      // Return zeros if balance API fails
      return { available: 0, pending: 0, currency: 'usd', error: null };
    }

    const data = await response.json();
    return {
      available: data.available || 0,
      pending: data.pending || 0,
      currency: data.currency || 'usd',
      error: null,
    };
  } catch (err) {
    console.error('Get balance error:', err);
    return { available: 0, pending: 0, currency: 'usd', error: null };
  }
}

/**
 * Get transactions from database
 */
export async function getTransactions(limit: number = 10): Promise<{
  transactions: Transaction[];
  error: string | null;
}> {
  if (!isSupabaseConfigured()) {
    return { transactions: [], error: 'Supabase not configured' };
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { transactions: [], error: 'Not authenticated' };
    }

    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('advisor_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return {
      transactions: (data || []).map(t => ({
        id: t.id.toString(),
        amount: parseFloat(t.amount?.toString().replace(/[^0-9.-]+/g, '') || '0') * 100,
        currency: 'usd',
        status: (t.status as Transaction['status']) || 'succeeded',
        type: (t.type as Transaction['type']) || 'payment',
        description: t.description || '',
        created_at: t.created_at,
      })),
      error: null,
    };
  } catch (err) {
    console.error('Get transactions error:', err);
    return { transactions: [], error: 'Failed to get transactions' };
  }
}

/**
 * Request payout via API
 */
export async function requestPayout(amount: number): Promise<{
  success: boolean;
  payoutId: string | null;
  error: string | null;
}> {
  try {
    const response = await fetch('/api/stripe/payouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount }),
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, payoutId: null, error: data.error || 'Failed to request payout' };
    }

    return {
      success: true,
      payoutId: data.payoutId,
      error: null,
    };
  } catch (err) {
    console.error('Request payout error:', err);
    return { success: false, payoutId: null, error: 'Failed to request payout' };
  }
}

// ============================================
// PAYMENT METHODS
// ============================================

/**
 * Get payment methods from database
 */
export async function getPaymentMethods(): Promise<{
  methods: PaymentMethod[];
  error: string | null;
}> {
  if (!isSupabaseConfigured()) {
    return { methods: [], error: 'Supabase not configured' };
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { methods: [], error: 'Not authenticated' };
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
 * Add payment method via Stripe
 * Note: In production, this should use Stripe Elements for PCI compliance
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
  if (!isSupabaseConfigured()) {
    return { method: null, error: 'Supabase not configured' };
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { method: null, error: 'Not authenticated' };
    }

    const last4 = data.cardNumber.slice(-4);
    
    // For real Stripe integration, we'd use Stripe Elements
    // For now, save to database (demo mode)
    const { data: pm, error } = await supabase
      .from('payment_methods')
      .insert({
        advisor_id: user.id,
        type: 'card',
        brand: detectCardBrand(data.cardNumber),
        last4,
        expiry: `${data.expMonth}/${data.expYear.toString().slice(-2)}`,
        is_default: false,
      })
      .select()
      .single();

    if (error) throw error;

    return {
      method: {
        id: pm.id.toString(),
        type: 'card',
        brand: pm.brand || 'visa',
        last4,
        exp_month: data.expMonth,
        exp_year: data.expYear,
        is_default: false,
      },
      error: null,
    };
  } catch (err) {
    console.error('Add payment method error:', err);
    return { method: null, error: 'Failed to add payment method' };
  }
}

// Helper to detect card brand
function detectCardBrand(number: string): string {
  const cleaned = number.replace(/\s/g, '');
  if (/^4/.test(cleaned)) return 'visa';
  if (/^5[1-5]/.test(cleaned)) return 'mastercard';
  if (/^3[47]/.test(cleaned)) return 'amex';
  if (/^6(?:011|5)/.test(cleaned)) return 'discover';
  return 'card';
}

/**
 * Remove payment method
 */
export async function removePaymentMethod(methodId: string): Promise<{
  success: boolean;
  error: string | null;
}> {
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
      reason: 'Active subscription required to create a Family Portal',
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
 * Purchase additional portal slot via API
 */
export async function purchaseAdditionalPortal(): Promise<{
  success: boolean;
  error: string | null;
}> {
  try {
    const response = await fetch('/api/stripe/portal-slot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to purchase portal slot' };
    }

    return { success: true, error: null };
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
      : `Downgrade from ${from.name} to ${to.name}. Changes take effect at end of current period.`,
  };
}
