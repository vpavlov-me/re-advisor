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
    it('should have starter plan', () => {
      expect(PLANS.starter).toBeDefined();
      expect(PLANS.starter.id).toBe('starter');
      expect(PLANS.starter.name).toBe('Starter');
      expect(PLANS.starter.price).toBe(49);
      expect(PLANS.starter.limits.families).toBe(5);
      expect(PLANS.starter.limits.consultations).toBe(10);
      expect(PLANS.starter.limits.storage).toBe(5);
    });

    it('should have professional plan', () => {
      expect(PLANS.professional).toBeDefined();
      expect(PLANS.professional.id).toBe('professional');
      expect(PLANS.professional.name).toBe('Professional');
      expect(PLANS.professional.price).toBe(99);
      expect(PLANS.professional.limits.families).toBe(15);
      expect(PLANS.professional.limits.consultations).toBe(20);
      expect(PLANS.professional.limits.storage).toBe(10);
    });

    it('should have enterprise plan', () => {
      expect(PLANS.enterprise).toBeDefined();
      expect(PLANS.enterprise.id).toBe('enterprise');
      expect(PLANS.enterprise.name).toBe('Enterprise');
      expect(PLANS.enterprise.price).toBe(249);
      expect(PLANS.enterprise.limits.families).toBe(-1); // unlimited
      expect(PLANS.enterprise.limits.consultations).toBe(-1); // unlimited
      expect(PLANS.enterprise.limits.storage).toBe(50);
    });

    it('should have all required plan features', () => {
      const allPlans = [PLANS.starter, PLANS.professional, PLANS.enterprise];
      
      allPlans.forEach(plan => {
        expect(plan.id).toBeDefined();
        expect(plan.name).toBeDefined();
        expect(plan.price).toBeGreaterThanOrEqual(0);
        expect(plan.features).toBeInstanceOf(Array);
        expect(plan.features.length).toBeGreaterThan(0);
        expect(plan.limits).toBeDefined();
        expect(typeof plan.limits.families).toBe('number');
        expect(typeof plan.limits.consultations).toBe('number');
        expect(typeof plan.limits.storage).toBe('number');
      });
    });

    it('should have increasing prices across plans', () => {
      expect(PLANS.starter.price).toBeLessThan(PLANS.professional.price);
      expect(PLANS.professional.price).toBeLessThan(PLANS.enterprise.price);
    });

    it('should have increasing limits across plans (except unlimited)', () => {
      expect(PLANS.starter.limits.families).toBeLessThan(PLANS.professional.limits.families);
      expect(PLANS.starter.limits.consultations).toBeLessThan(PLANS.professional.limits.consultations);
      expect(PLANS.starter.limits.storage).toBeLessThan(PLANS.professional.limits.storage);
    });
  });
});
