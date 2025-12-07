/**
 * Payments Hook
 * 
 * Centralized hook for managing payment-related state and operations.
 * Works with both mock and live Stripe modes.
 */

import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';
import { 
  getSubscription, 
  getBalance, 
  getTransactions,
  getStripeAccountStatus,
  startStripeOnboarding,
  requestPayout,
  IS_MOCK_MODE,
  type Subscription,
  type StripeAccount,
  type Transaction,
} from '@/lib/services/stripe.service';

export interface PaymentMethod {
  id: number;
  type: 'card' | 'bank';
  brand?: string;
  last4: string;
  expiry?: string;
  bankName?: string;
  accountType?: string;
  isDefault: boolean;
}

export interface UsePaymentsResult {
  // State
  isLoading: boolean;
  isMockMode: boolean;
  subscription: Subscription | null;
  stripeAccount: StripeAccount | null;
  balance: { available: number; pending: number };
  transactions: Transaction[];
  paymentMethods: PaymentMethod[];
  
  // Actions
  refresh: () => Promise<void>;
  startOnboarding: () => Promise<{ url: string | null; error: string | null }>;
  requestPayout: (amount: number) => Promise<{ success: boolean; error: string | null }>;
  
  // Error state
  error: string | null;
}

export function usePayments(): UsePaymentsResult {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [stripeAccount, setStripeAccount] = useState<StripeAccount | null>(null);
  const [balance, setBalance] = useState({ available: 0, pending: 0 });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);

  const fetchData = useCallback(async () => {
    if (!isSupabaseConfigured()) {
      console.warn('usePayments: Supabase not configured, using defaults');
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.warn('usePayments: Auth error:', authError.message);
        setIsLoading(false);
        return;
      }
      if (!user) {
        console.warn('usePayments: No user found');
        setIsLoading(false);
        return;
      }

      // Fetch all data in parallel with individual error handling
      const results = await Promise.allSettled([
        getSubscription().catch(e => { console.warn('getSubscription failed:', e); return { subscription: null, error: e.message }; }),
        getStripeAccountStatus().catch(e => { console.warn('getStripeAccountStatus failed:', e); return { account: null, error: e.message }; }),
        getBalance().catch(e => { console.warn('getBalance failed:', e); return { available: 0, pending: 0, currency: 'usd', error: e.message }; }),
        getTransactions(20).catch(e => { console.warn('getTransactions failed:', e); return { transactions: [], error: e.message }; }),
      ]);

      // Process results safely
      const [
        subscriptionResult,
        accountResult,
        balanceResult,
        transactionsResult,
      ] = results;

      // Set subscription
      if (subscriptionResult.status === 'fulfilled' && !subscriptionResult.value.error) {
        setSubscription(subscriptionResult.value.subscription);
      } else {
        console.warn('Subscription fetch failed:', subscriptionResult);
      }

      // Set Stripe account
      if (accountResult.status === 'fulfilled' && !accountResult.value.error) {
        setStripeAccount(accountResult.value.account);
      } else {
        console.warn('Stripe account fetch failed:', accountResult);
      }

      // Set balance
      if (balanceResult.status === 'fulfilled' && !balanceResult.value.error) {
        setBalance({
          available: balanceResult.value.available,
          pending: balanceResult.value.pending,
        });
      } else {
        console.warn('Balance fetch failed:', balanceResult);
      }

      // Set transactions
      if (transactionsResult.status === 'fulfilled' && !transactionsResult.value.error) {
        setTransactions(transactionsResult.value.transactions);
      } else {
        console.warn('Transactions fetch failed:', transactionsResult);
      }

      // Fetch payment methods from Supabase with error handling
      try {
        const { data: methods, error: methodsError } = await supabase
          .from('payment_methods')
          .select('*')
          .eq('advisor_id', user.id)
          .order('is_default', { ascending: false });

        if (!methodsError && methods) {
          setPaymentMethods(methods.map(m => ({
            id: m.id,
            type: m.type as 'card' | 'bank',
            brand: m.brand || undefined,
            last4: m.last4 || '',
            expiry: m.expiry || undefined,
            isDefault: m.is_default || false,
          })));
        }
      } catch (pmError) {
        console.warn('Payment methods fetch failed:', pmError);
        // Keep empty array, don't crash
      }

    } catch (err) {
      console.error('Error fetching payment data:', err);
      setError('Failed to load payment data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleStartOnboarding = useCallback(async () => {
    const result = await startStripeOnboarding();
    if (!result.error && result.onboardingUrl) {
      // Refresh data after starting onboarding
      await fetchData();
    }
    return { url: result.onboardingUrl, error: result.error };
  }, [fetchData]);

  const handleRequestPayout = useCallback(async (amount: number) => {
    const result = await requestPayout(amount);
    if (result.success) {
      // Refresh data after payout
      await fetchData();
    }
    return { success: result.success, error: result.error };
  }, [fetchData]);

  return {
    isLoading,
    isMockMode: IS_MOCK_MODE,
    subscription,
    stripeAccount,
    balance,
    transactions,
    paymentMethods,
    refresh: fetchData,
    startOnboarding: handleStartOnboarding,
    requestPayout: handleRequestPayout,
    error,
  };
}
