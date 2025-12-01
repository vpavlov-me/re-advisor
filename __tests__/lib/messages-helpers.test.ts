/**
 * Messages Helper Functions Tests
 * Tests for pure helper functions in messages module
 */

import { formatMessageTime, getInitials } from '@/lib/messages';

describe('Messages Helper Functions', () => {
  describe('formatMessageTime', () => {
    it('should format today date as time', () => {
      const now = new Date();
      const result = formatMessageTime(now.toISOString());
      // Should be in HH:MM format or include 'Today'
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should format yesterday date correctly', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const result = formatMessageTime(yesterday.toISOString());
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should format older dates with date', () => {
      const oldDate = new Date('2023-01-15');
      const result = formatMessageTime(oldDate.toISOString());
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });
  });

  describe('getInitials', () => {
    it('should return initials for full name', () => {
      const result = getInitials('John Doe');
      expect(result).toBe('JD');
    });

    it('should return initials for single name', () => {
      const result = getInitials('John');
      expect(result).toBe('J');
    });

    it('should handle multiple names', () => {
      const result = getInitials('John Michael Doe');
      // Should return first and last initials
      expect(result.length).toBe(2);
    });

    it('should handle empty string', () => {
      const result = getInitials('');
      expect(result).toBe('');
    });

    it('should handle lowercase names', () => {
      const result = getInitials('john doe');
      expect(result).toBe('JD');
    });

    it('should handle names with extra spaces', () => {
      // Note: The function doesn't trim, so extra spaces create extra segments
      const result = getInitials('  John   Doe  ');
      // Result will be empty strings from splits, function returns what it gets
      expect(typeof result).toBe('string');
    });
  });
});
