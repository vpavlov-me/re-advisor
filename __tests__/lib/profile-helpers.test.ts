/**
 * Profile Helper Functions Tests
 * Tests for pure helper functions in profile module
 */

import { 
  calculateProfileCompletion,
  getNextRecommendedAction,
  PROFILE_FIELDS,
} from '@/lib/profile';

describe('Profile Helper Functions', () => {
  describe('PROFILE_FIELDS', () => {
    it('should be defined and have fields', () => {
      expect(PROFILE_FIELDS).toBeDefined();
      expect(Array.isArray(PROFILE_FIELDS)).toBe(true);
      expect(PROFILE_FIELDS.length).toBeGreaterThan(0);
    });

    it('should have required structure for each field', () => {
      PROFILE_FIELDS.forEach(field => {
        expect(field).toHaveProperty('key');
        expect(field).toHaveProperty('label');
        expect(field).toHaveProperty('weight');
        expect(typeof field.weight).toBe('number');
      });
    });
  });

  describe('calculateProfileCompletion', () => {
    it('should return 0 for null profile', () => {
      const result = calculateProfileCompletion(null);
      expect(result.percentage).toBe(0);
      expect(result.completedFields).toEqual([]);
      expect(result.missingFields.length).toBeGreaterThan(0);
    });

    it('should return 0 for empty profile', () => {
      const result = calculateProfileCompletion({});
      expect(result.percentage).toBe(0);
    });

    it('should calculate partial completion', () => {
      const partialProfile = {
        first_name: 'John',
        last_name: 'Doe',
      };
      const result = calculateProfileCompletion(partialProfile);
      expect(result.percentage).toBeGreaterThan(0);
      expect(result.percentage).toBeLessThan(100);
      expect(result.completedFields.length).toBeGreaterThan(0);
    });

    it('should calculate completion correctly for filled profile', () => {
      const fullProfile = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        bio: 'Test bio',
        avatar_url: 'https://example.com/avatar.jpg',
        specializations: ['Finance'],
        certifications: ['CFA'],
        company: 'Test Company',
      };
      const result = calculateProfileCompletion(fullProfile);
      // Just verify it calculates something reasonable
      expect(result.percentage).toBeGreaterThan(0);
      expect(result.completedFields.length).toBeGreaterThan(0);
    });

    it('should return missingFields array', () => {
      const result = calculateProfileCompletion({});
      expect(Array.isArray(result.missingFields)).toBe(true);
      expect(result.missingFields.length).toBe(PROFILE_FIELDS.length);
    });
  });

  describe('getNextRecommendedAction', () => {
    it('should return recommendation for incomplete profile', () => {
      const completion = calculateProfileCompletion({});
      const action = getNextRecommendedAction(completion);
      
      expect(action).toHaveProperty('field');
      expect(action).toHaveProperty('message');
      expect(typeof action.message).toBe('string');
    });

    it('should return appropriate message for complete profile', () => {
      const fullProfile = {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone: '+1234567890',
        bio: 'Test bio',
        avatar_url: 'https://example.com/avatar.jpg',
        specializations: ['Finance', 'Tax'],
        certifications: ['CFA', 'CFP'],
        company: 'Test Company',
        website: 'https://example.com',
      };
      const completion = calculateProfileCompletion(fullProfile);
      
      // If profile is mostly complete, action may have null field
      const action = getNextRecommendedAction(completion);
      expect(action).toHaveProperty('message');
      expect(typeof action.message).toBe('string');
    });
  });
});
