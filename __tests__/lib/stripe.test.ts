/**
 * Stripe Service Tests
 * Tests for Stripe-related functionality
 */

import { PLANS } from '@/lib/stripe';

// Mock the stripe module to prevent initialization errors
jest.mock('stripe', () => {
  return jest.fn().mockImplementation(() => ({
    customers: {
      create: jest.fn(),
      retrieve: jest.fn(),
    },
    subscriptions: {
      create: jest.fn(),
      retrieve: jest.fn(),
      update: jest.fn(),
      cancel: jest.fn(),
    },
    checkout: {
      sessions: {
        create: jest.fn(),
      },
    },
    webhooks: {
      constructEvent: jest.fn(),
    },
  }));
});

describe('Stripe Service', () => {
  describe('PLANS configuration', () => {
    it('should have standard plan', () => {
      expect(PLANS.standard).toBeDefined();
      expect(PLANS.standard.id).toBe('standard');
      expect(PLANS.standard.name).toBe('Standard Consultant');
      expect(PLANS.standard.price).toBe(49);
      expect(PLANS.standard.limits.families).toBe(-1); // unlimited
      expect(PLANS.standard.limits.consultations).toBe(-1); // unlimited
      expect(PLANS.standard.limits.storage).toBe(5);
      expect(PLANS.standard.limits.familyPortals).toBe(0);
    });

    it('should have premium plan', () => {
      expect(PLANS.premium).toBeDefined();
      expect(PLANS.premium.id).toBe('premium');
      expect(PLANS.premium.name).toBe('Premium Consultant');
      expect(PLANS.premium.price).toBe(99);
      expect(PLANS.premium.limits.families).toBe(-1); // unlimited
      expect(PLANS.premium.limits.consultations).toBe(-1); // unlimited
      expect(PLANS.premium.limits.storage).toBe(10);
      expect(PLANS.premium.limits.familyPortals).toBe(3);
    });

    it('should have legacy plan aliases for backwards compatibility', () => {
      // starter -> standard
      expect(PLANS.starter).toBeDefined();
      expect(PLANS.starter.name).toBe('Standard Consultant');
      
      // professional -> premium
      expect(PLANS.professional).toBeDefined();
      expect(PLANS.professional.name).toBe('Premium Consultant');
      
      // enterprise -> premium
      expect(PLANS.enterprise).toBeDefined();
      expect(PLANS.enterprise.name).toBe('Premium Consultant');
    });

    it('should have all required plan features', () => {
      const mainPlans = [PLANS.standard, PLANS.premium];
      
      mainPlans.forEach(plan => {
        expect(plan.id).toBeDefined();
        expect(plan.name).toBeDefined();
        expect(plan.price).toBeGreaterThanOrEqual(0);
        expect(plan.features).toBeInstanceOf(Array);
        expect(plan.features.length).toBeGreaterThan(0);
        expect(plan.limits).toBeDefined();
        expect(typeof plan.limits.families).toBe('number');
        expect(typeof plan.limits.consultations).toBe('number');
        expect(typeof plan.limits.storage).toBe('number');
        expect(typeof plan.limits.familyPortals).toBe('number');
      });
    });

    it('should have increasing prices across plans', () => {
      expect(PLANS.standard.price).toBeLessThan(PLANS.premium.price);
    });

    it('should have more features in premium plan', () => {
      expect(PLANS.standard.limits.storage).toBeLessThan(PLANS.premium.limits.storage);
      expect(PLANS.standard.limits.familyPortals).toBeLessThan(PLANS.premium.limits.familyPortals);
    });
  });
});
