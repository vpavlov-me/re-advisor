/**
 * Utils Tests
 * Tests for utility functions
 */

import { cn } from '@/lib/utils';

describe('Utils', () => {
  describe('cn (classnames merge)', () => {
    it('should merge class names', () => {
      const result = cn('foo', 'bar');
      expect(result).toBe('foo bar');
    });

    it('should handle conditional classes', () => {
      const isActive = true;
      const result = cn('base', isActive && 'active');
      expect(result).toBe('base active');
    });

    it('should handle false conditions', () => {
      const isActive = false;
      const result = cn('base', isActive && 'active');
      expect(result).toBe('base');
    });

    it('should merge Tailwind classes correctly', () => {
      const result = cn('px-4 py-2', 'px-2');
      expect(result).toBe('py-2 px-2');
    });

    it('should handle arrays of classes', () => {
      const result = cn(['foo', 'bar'], 'baz');
      expect(result).toBe('foo bar baz');
    });

    it('should handle objects with boolean values', () => {
      const result = cn({
        base: true,
        active: true,
        disabled: false,
      });
      expect(result).toBe('base active');
    });

    it('should handle empty inputs', () => {
      const result = cn();
      expect(result).toBe('');
    });

    it('should handle null and undefined', () => {
      const result = cn('foo', null, undefined, 'bar');
      expect(result).toBe('foo bar');
    });
  });
});
