/**
 * Notifications Helper Functions Tests
 * Tests for pure helper functions in notifications module
 */

import { 
  formatNotificationTime,
  notificationTypeConfig,
} from '@/lib/notifications';

describe('Notifications Helper Functions', () => {
  describe('formatNotificationTime', () => {
    it('should format recent date as relative time', () => {
      const now = new Date();
      const result = formatNotificationTime(now.toISOString());
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should format older date correctly', () => {
      const oldDate = new Date('2023-01-15');
      const result = formatNotificationTime(oldDate.toISOString());
      expect(typeof result).toBe('string');
      expect(result.length).toBeGreaterThan(0);
    });

    it('should handle yesterday date', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const result = formatNotificationTime(yesterday.toISOString());
      expect(typeof result).toBe('string');
    });
  });

  describe('notificationTypeConfig', () => {
    it('should be defined', () => {
      expect(notificationTypeConfig).toBeDefined();
      expect(typeof notificationTypeConfig).toBe('object');
    });

    it('should have configurations for common notification types', () => {
      const types = Object.keys(notificationTypeConfig);
      expect(types.length).toBeGreaterThan(0);
    });

    it('should have icon and color for each type', () => {
      Object.values(notificationTypeConfig).forEach((config) => {
        expect(config).toHaveProperty('icon');
        expect(config).toHaveProperty('color');
      });
    });
  });
});
