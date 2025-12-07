/**
 * Tests for usePayments hook
 * 
 * Tests payment state management, Stripe integration, and subscription handling.
 */

import { renderHook, act, waitFor } from '@testing-library/react';

// Mock stripe.service
const mockGetSubscription = jest.fn();
const mockGetBalance = jest.fn();
const mockGetTransactions = jest.fn();
const mockGetStripeAccountStatus = jest.fn();
const mockStartStripeOnboarding = jest.fn();
const mockRequestPayout = jest.fn();

jest.mock('@/lib/services/stripe.service', () => ({
  getSubscription: () => mockGetSubscription(),
  getBalance: () => mockGetBalance(),
  getTransactions: (limit: number) => mockGetTransactions(limit),
  getStripeAccountStatus: () => mockGetStripeAccountStatus(),
  startStripeOnboarding: () => mockStartStripeOnboarding(),
  requestPayout: (amount: number) => mockRequestPayout(amount),
  IS_MOCK_MODE: true,
}));

// Mock supabaseClient
const mockGetUser = jest.fn();
const mockFrom = jest.fn();

jest.mock('@/lib/supabaseClient', () => ({
  supabase: {
    auth: {
      getUser: () => mockGetUser(),
    },
    from: (table: string) => mockFrom(table),
  },
  isSupabaseConfigured: () => true,
}));

// Import after mocks
import { usePayments } from '@/lib/hooks/use-payments';

describe('usePayments Hook', () => {
  const mockUser = { id: 'user-123', email: 'test@example.com' };
  
  const mockSubscription = {
    id: 'sub_123',
    status: 'active',
    plan: 'pro',
    currentPeriodEnd: '2024-12-31',
  };

  const mockStripeAccount = {
    id: 'acct_123',
    payoutsEnabled: true,
    chargesEnabled: true,
  };

  const mockBalance = { available: 5000, pending: 1000 };

  const mockTransactions = [
    { id: 'tx_1', amount: 1000, status: 'completed', created_at: '2024-01-01' },
    { id: 'tx_2', amount: 2000, status: 'pending', created_at: '2024-01-02' },
  ];

  const mockPaymentMethods = [
    { id: 1, type: 'card', brand: 'Visa', last4: '4242', expiry: '12/25', is_default: true },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Default successful responses
    mockGetUser.mockResolvedValue({ data: { user: mockUser } });
    mockGetSubscription.mockResolvedValue({ subscription: mockSubscription, error: null });
    mockGetBalance.mockResolvedValue({ available: 5000, pending: 1000, error: null });
    mockGetTransactions.mockResolvedValue({ transactions: mockTransactions, error: null });
    mockGetStripeAccountStatus.mockResolvedValue({ account: mockStripeAccount, error: null });
    
    mockFrom.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          order: jest.fn().mockResolvedValue({ data: mockPaymentMethods, error: null }),
        }),
      }),
    });
  });

  describe('Initial State and Loading', () => {
    it('starts in loading state', () => {
      const { result } = renderHook(() => usePayments());
      
      expect(result.current.isLoading).toBe(true);
    });

    it('loads all data successfully', async () => {
      const { result } = renderHook(() => usePayments());
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      
      expect(result.current.subscription).toEqual(mockSubscription);
      expect(result.current.stripeAccount).toEqual(mockStripeAccount);
      expect(result.current.balance).toEqual({ available: 5000, pending: 1000 });
      expect(result.current.transactions).toEqual(mockTransactions);
      expect(result.current.error).toBeNull();
    });

    it('indicates mock mode correctly', async () => {
      const { result } = renderHook(() => usePayments());
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      
      expect(result.current.isMockMode).toBe(true);
    });

    it('loads payment methods', async () => {
      const { result } = renderHook(() => usePayments());
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      
      expect(result.current.paymentMethods).toHaveLength(1);
      expect(result.current.paymentMethods[0].brand).toBe('Visa');
      expect(result.current.paymentMethods[0].last4).toBe('4242');
      expect(result.current.paymentMethods[0].isDefault).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('handles unauthenticated user gracefully', async () => {
      mockGetUser.mockResolvedValue({ data: { user: null } });

      const { result } = renderHook(() => usePayments());

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      // Should gracefully handle unauthenticated state without setting error
      expect(result.current.error).toBeNull();
      expect(result.current.subscription).toBeNull();
    });

    it('handles subscription fetch error gracefully', async () => {
      mockGetSubscription.mockResolvedValue({ subscription: null, error: 'Failed' });
      
      const { result } = renderHook(() => usePayments());
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      
      expect(result.current.subscription).toBeNull();
      // Should not set main error for partial failures
      expect(result.current.error).toBeNull();
    });

    it('handles balance fetch error gracefully', async () => {
      mockGetBalance.mockResolvedValue({ available: 0, pending: 0, error: 'Failed' });
      
      const { result } = renderHook(() => usePayments());
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      
      // Balance defaults when error
      expect(result.current.balance).toEqual({ available: 0, pending: 0 });
    });

    it('handles complete fetch failure', async () => {
      mockGetUser.mockRejectedValue(new Error('Network error'));
      
      const { result } = renderHook(() => usePayments());
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      
      expect(result.current.error).toBe('Failed to load payment data');
    });
  });

  describe('Refresh', () => {
    it('refreshes all data', async () => {
      const { result } = renderHook(() => usePayments());
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      
      // Clear mocks to track new calls
      jest.clearAllMocks();
      
      mockGetUser.mockResolvedValue({ data: { user: mockUser } });
      mockGetSubscription.mockResolvedValue({ subscription: mockSubscription, error: null });
      mockGetBalance.mockResolvedValue({ available: 7000, pending: 500, error: null });
      mockGetTransactions.mockResolvedValue({ transactions: mockTransactions, error: null });
      mockGetStripeAccountStatus.mockResolvedValue({ account: mockStripeAccount, error: null });
      mockFrom.mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            order: jest.fn().mockResolvedValue({ data: mockPaymentMethods, error: null }),
          }),
        }),
      });
      
      await act(async () => {
        await result.current.refresh();
      });
      
      expect(mockGetSubscription).toHaveBeenCalled();
      expect(mockGetBalance).toHaveBeenCalled();
      expect(result.current.balance).toEqual({ available: 7000, pending: 500 });
    });
  });

  describe('Start Onboarding', () => {
    it('starts Stripe onboarding successfully', async () => {
      mockStartStripeOnboarding.mockResolvedValue({ 
        onboardingUrl: 'https://connect.stripe.com/onboarding/123', 
        error: null 
      });
      
      const { result } = renderHook(() => usePayments());
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      
      let onboardingResult: { url: string | null; error: string | null };
      await act(async () => {
        onboardingResult = await result.current.startOnboarding();
      });
      
      expect(onboardingResult!.url).toBe('https://connect.stripe.com/onboarding/123');
      expect(onboardingResult!.error).toBeNull();
    });

    it('handles onboarding error', async () => {
      mockStartStripeOnboarding.mockResolvedValue({ 
        onboardingUrl: null, 
        error: 'Onboarding not available' 
      });
      
      const { result } = renderHook(() => usePayments());
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      
      let onboardingResult: { url: string | null; error: string | null };
      await act(async () => {
        onboardingResult = await result.current.startOnboarding();
      });
      
      expect(onboardingResult!.url).toBeNull();
      expect(onboardingResult!.error).toBe('Onboarding not available');
    });
  });

  describe('Request Payout', () => {
    it('requests payout successfully', async () => {
      mockRequestPayout.mockResolvedValue({ success: true, error: null });
      
      const { result } = renderHook(() => usePayments());
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      
      let payoutResult: { success: boolean; error: string | null };
      await act(async () => {
        payoutResult = await result.current.requestPayout(1000);
      });
      
      expect(payoutResult!.success).toBe(true);
      expect(payoutResult!.error).toBeNull();
      expect(mockRequestPayout).toHaveBeenCalledWith(1000);
    });

    it('handles payout error', async () => {
      mockRequestPayout.mockResolvedValue({ success: false, error: 'Insufficient balance' });
      
      const { result } = renderHook(() => usePayments());
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      
      let payoutResult: { success: boolean; error: string | null };
      await act(async () => {
        payoutResult = await result.current.requestPayout(100000);
      });
      
      expect(payoutResult!.success).toBe(false);
      expect(payoutResult!.error).toBe('Insufficient balance');
    });

    it('refreshes data after successful payout', async () => {
      mockRequestPayout.mockResolvedValue({ success: true, error: null });
      
      const { result } = renderHook(() => usePayments());
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      
      const getBalanceCallCount = mockGetBalance.mock.calls.length;
      
      await act(async () => {
        await result.current.requestPayout(1000);
      });
      
      // Should have called getBalance again after payout
      expect(mockGetBalance.mock.calls.length).toBeGreaterThan(getBalanceCallCount);
    });
  });
});

// Separate test for Supabase not configured
describe('usePayments Hook - Supabase Not Configured', () => {
  // Skip this test as dynamic module mocking with hooks is complex
  // The actual behavior is tested in integration tests
  it.skip('handles Supabase not configured', async () => {
    // Would need more complex setup for dynamic mock changes with React hooks
  });
});
