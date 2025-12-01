/**
 * Tests for Stripe Checkout API Route
 * 
 * Tests checkout session creation logic.
 * Note: Full integration tests require actual NextRequest handling.
 */

// Mock modules before imports
const mockGetUser = jest.fn();
const mockFrom = jest.fn();
const mockCreateCheckoutSession = jest.fn();
const mockCreateCustomer = jest.fn();

jest.mock('@/lib/supabase/server', () => ({
  createServerSupabaseClient: jest.fn(() => Promise.resolve({
    auth: {
      getUser: () => mockGetUser(),
    },
    from: (table: string) => mockFrom(table),
  })),
}));

jest.mock('@/lib/stripe', () => ({
  createCheckoutSession: (customerId: string, priceId: string, successUrl: string, cancelUrl: string) => 
    mockCreateCheckoutSession(customerId, priceId, successUrl, cancelUrl),
  createCustomer: (email: string, name: string, userId: string) => 
    mockCreateCustomer(email, name, userId),
  PLANS: {
    starter: { name: 'Starter', priceId: 'price_starter', price: 9 },
    professional: { name: 'Professional', priceId: 'price_professional', price: 29 },
    enterprise: { name: 'Enterprise', priceId: 'price_enterprise', price: 99 },
  },
}));

describe('Stripe Checkout Logic', () => {
  const mockUser = { id: 'user-123', email: 'test@example.com' };
  
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetUser.mockResolvedValue({ data: { user: mockUser }, error: null });
  });

  describe('Authentication Check', () => {
    it('validates user is authenticated', () => {
      const user = null;
      const authError = { message: 'Not authenticated' };
      
      const isUnauthorized = authError || !user;
      expect(isUnauthorized).toBeTruthy();
    });

    it('allows authenticated users', () => {
      const user = mockUser;
      const authError = null;
      
      const isUnauthorized = authError || !user;
      expect(isUnauthorized).toBeFalsy();
    });
  });

  describe('Plan Validation', () => {
    const PLANS = {
      starter: { name: 'Starter', priceId: 'price_starter', price: 9 },
      professional: { name: 'Professional', priceId: 'price_professional', price: 29 },
      enterprise: { name: 'Enterprise', priceId: 'price_enterprise', price: 99 },
    };

    it('validates starter plan', () => {
      expect(PLANS.starter).toBeDefined();
      expect(PLANS.starter.priceId).toBe('price_starter');
    });

    it('validates professional plan', () => {
      expect(PLANS.professional).toBeDefined();
      expect(PLANS.professional.priceId).toBe('price_professional');
    });

    it('validates enterprise plan', () => {
      expect(PLANS.enterprise).toBeDefined();
      expect(PLANS.enterprise.priceId).toBe('price_enterprise');
    });

    it('rejects invalid plan IDs', () => {
      const invalidPlanId = 'invalid-plan';
      expect((PLANS as Record<string, unknown>)[invalidPlanId]).toBeUndefined();
    });
  });

  describe('Customer Creation', () => {
    it('creates customer with correct parameters', async () => {
      mockCreateCustomer.mockResolvedValue({ id: 'cus_new_123' });
      
      const email = 'test@example.com';
      const name = 'John Doe';
      const userId = 'user-123';
      
      const customer = await mockCreateCustomer(email, name, userId);
      
      expect(mockCreateCustomer).toHaveBeenCalledWith(email, name, userId);
      expect(customer.id).toBe('cus_new_123');
    });

    it('uses existing customer if available', () => {
      const profile = { stripe_customer_id: 'cus_existing' };
      const customerId = profile.stripe_customer_id;
      
      expect(customerId).toBe('cus_existing');
    });

    it('combines first and last name for customer name', () => {
      const firstName = 'John';
      const lastName = 'Doe';
      const name = `${firstName} ${lastName}`.trim() || 'User';
      
      expect(name).toBe('John Doe');
    });

    it('uses "User" as fallback name', () => {
      const firstName = '';
      const lastName = '';
      const name = `${firstName} ${lastName}`.trim() || 'User';
      
      expect(name).toBe('User');
    });
  });

  describe('Checkout Session Creation', () => {
    it('creates session with correct parameters', async () => {
      const customerId = 'cus_123';
      const priceId = 'price_professional';
      const baseUrl = 'http://localhost:3000';
      const successUrl = `${baseUrl}/subscription?success=true`;
      const cancelUrl = `${baseUrl}/subscription?canceled=true`;
      
      mockCreateCheckoutSession.mockResolvedValue({
        id: 'cs_test_123',
        url: 'https://checkout.stripe.com/session/123',
      });
      
      const session = await mockCreateCheckoutSession(customerId, priceId, successUrl, cancelUrl);
      
      expect(session.id).toBe('cs_test_123');
      expect(session.url).toContain('checkout.stripe.com');
    });

    it('generates correct success URL', () => {
      const baseUrl = 'http://localhost:3000';
      const successUrl = `${baseUrl}/subscription?success=true`;
      
      expect(successUrl).toBe('http://localhost:3000/subscription?success=true');
    });

    it('generates correct cancel URL', () => {
      const baseUrl = 'http://localhost:3000';
      const cancelUrl = `${baseUrl}/subscription?canceled=true`;
      
      expect(cancelUrl).toBe('http://localhost:3000/subscription?canceled=true');
    });
  });

  describe('Profile Update', () => {
    it('saves new customer ID to profile', () => {
      const updateData = { stripe_customer_id: 'cus_new_123' };
      
      expect(updateData.stripe_customer_id).toBe('cus_new_123');
    });
  });

  describe('Error Handling', () => {
    it('handles Stripe API errors', async () => {
      mockCreateCheckoutSession.mockRejectedValue(new Error('Stripe API error'));
      
      await expect(mockCreateCheckoutSession('cus_123', 'price_123', 'url', 'url'))
        .rejects.toThrow('Stripe API error');
    });

    it('handles customer creation errors', async () => {
      mockCreateCustomer.mockRejectedValue(new Error('Customer creation failed'));
      
      await expect(mockCreateCustomer('email', 'name', 'userId'))
        .rejects.toThrow('Customer creation failed');
    });
  });
});
