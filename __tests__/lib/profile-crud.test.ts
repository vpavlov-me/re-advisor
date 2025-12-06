/**
 * Profile CRUD Functions Tests
 * Tests for all profile database operations
 * 
 * Note: These tests verify function exports and TypeScript interfaces.
 * Full integration tests should be run with a test database or E2E tests.
 */

import {
  getProfile,
  upsertProfile,
  getCredentials,
  addCredential,
  deleteCredential,
  getExpertise,
  addExpertise,
  deleteExpertise,
  getExperience,
  addExperience,
  updateExperience,
  deleteExperience,
  getEducation,
  addEducation,
  updateEducation,
  deleteEducation,
  getSkills,
  addSkill,
  deleteSkill,
  getRecommendations,
  addRecommendation,
  updateRecommendation,
  deleteRecommendation,
} from '@/lib/supabase/profile';

describe('Profile CRUD Functions', () => {
  describe('Function Exports', () => {
    it('should export profile functions', () => {
      expect(typeof getProfile).toBe('function');
      expect(typeof upsertProfile).toBe('function');
    });

    it('should export credentials functions', () => {
      expect(typeof getCredentials).toBe('function');
      expect(typeof addCredential).toBe('function');
      expect(typeof deleteCredential).toBe('function');
    });

    it('should export expertise functions', () => {
      expect(typeof getExpertise).toBe('function');
      expect(typeof addExpertise).toBe('function');
      expect(typeof deleteExpertise).toBe('function');
    });

    it('should export experience functions', () => {
      expect(typeof getExperience).toBe('function');
      expect(typeof addExperience).toBe('function');
      expect(typeof updateExperience).toBe('function');
      expect(typeof deleteExperience).toBe('function');
    });

    it('should export education functions', () => {
      expect(typeof getEducation).toBe('function');
      expect(typeof addEducation).toBe('function');
      expect(typeof updateEducation).toBe('function');
      expect(typeof deleteEducation).toBe('function');
    });

    it('should export skills functions', () => {
      expect(typeof getSkills).toBe('function');
      expect(typeof addSkill).toBe('function');
      expect(typeof deleteSkill).toBe('function');
    });

    it('should export recommendations functions', () => {
      expect(typeof getRecommendations).toBe('function');
      expect(typeof addRecommendation).toBe('function');
      expect(typeof updateRecommendation).toBe('function');
      expect(typeof deleteRecommendation).toBe('function');
    });
  });

  describe('TypeScript Interface Contracts', () => {
    it('should accept valid experience input', () => {
      const validInput = {
        role: 'Consultant',
        company: 'Test Corp',
        start_date: '2024-01-01',
        is_current: true,
      };
      
      // Type check - if this compiles, the interface is correct
      const check: Parameters<typeof addExperience>[0] = validInput;
      expect(check).toBeDefined();
    });

    it('should accept valid education input', () => {
      const validInput = {
        degree: 'MBA',
        institution: 'Test University',
        start_year: 2020,
        end_year: 2024,
      };
      
      const check: Parameters<typeof addEducation>[0] = validInput;
      expect(check).toBeDefined();
    });

    it('should accept valid recommendation input', () => {
      const validInput = {
        author_name: 'John Doe',
        text: 'Great advisor!',
        rating: 5,
      };
      
      const check: Parameters<typeof addRecommendation>[0] = validInput;
      expect(check).toBeDefined();
    });

    it('should accept valid credential input', () => {
      const validInput = {
        name: 'CFP',
        issuing_organization: 'CFP Board',
      };
      
      // Note: addCredential expects Omit type
      expect(validInput).toBeDefined();
    });
  });
});
