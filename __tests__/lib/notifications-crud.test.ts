/**
 * Notifications CRUD Functions Tests
 * Tests for async database operations in notifications module
 */

import { 
  mockSupabaseClient, 
  resetSupabaseMocks,
} from '../mocks/supabase';

import { 
  getNotifications,
  getUnreadCount,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  createNotification,
  subscribeToNotifications,
  formatNotificationTime,
} from '@/lib/notifications';

// Mock data
const mockNotification = {
  id: 1,
  user_id: 'user-123',
  type: 'message' as const,
  title: 'New message',
  description: 'You have a new message',
  read: false,
  created_at: new Date().toISOString(),
};

describe('Notifications CRUD Functions', () => {
  beforeEach(() => {
    resetSupabaseMocks();
    jest.clearAllMocks();
  });

  describe('getNotifications', () => {
    it('should return notifications for a user', async () => {
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        data: [mockNotification],
        error: null,
      };
      
      // Make order return the final result
      mockChain.order.mockResolvedValue({ data: [mockNotification], error: null });
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await getNotifications('user-123');
      
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('notifications');
      expect(result.data).toBeDefined();
    });

    it('should filter unread only when specified', async () => {
      const finalResult = { data: [mockNotification], error: null };
      
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockImplementation(() => mockChain),
        order: jest.fn().mockImplementation(() => ({ ...mockChain, ...finalResult })),
        limit: jest.fn().mockReturnThis(),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      await getNotifications('user-123', { unreadOnly: true });
      
      // eq should be called for user_id and read=false
      expect(mockChain.eq).toHaveBeenCalled();
    });

    it('should apply limit when specified', async () => {
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
      };
      
      mockChain.limit.mockResolvedValue({ data: [mockNotification], error: null });
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      await getNotifications('user-123', { limit: 10 });
      
      expect(mockChain.limit).toHaveBeenCalledWith(10);
    });
  });

  describe('getUnreadCount', () => {
    it('should return count of unread notifications', async () => {
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
      };
      
      mockChain.eq = jest.fn()
        .mockReturnValueOnce(mockChain)
        .mockResolvedValueOnce({ count: 5, error: null });
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await getUnreadCount('user-123');
      
      expect(result.count).toBe(5);
      expect(result.error).toBeNull();
    });

    it('should return 0 when no unread notifications', async () => {
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
      };
      
      mockChain.eq = jest.fn()
        .mockReturnValueOnce(mockChain)
        .mockResolvedValueOnce({ count: null, error: null });
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await getUnreadCount('user-123');
      
      expect(result.count).toBe(0);
    });
  });

  describe('markAsRead', () => {
    it('should mark notification as read', async () => {
      const mockChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await markAsRead(1);
      
      expect(result.success).toBe(true);
      expect(mockChain.update).toHaveBeenCalledWith({ read: true });
    });

    it('should return error when update fails', async () => {
      const mockChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: new Error('Update failed') }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await markAsRead(1);
      
      expect(result.success).toBe(false);
      expect(result.error).toBeTruthy();
    });
  });

  describe('markAllAsRead', () => {
    it('should mark all notifications as read for user', async () => {
      const mockChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
      };
      
      mockChain.eq = jest.fn()
        .mockReturnValueOnce(mockChain)
        .mockResolvedValueOnce({ error: null });
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await markAllAsRead('user-123');
      
      expect(result.success).toBe(true);
      expect(mockChain.update).toHaveBeenCalledWith({ read: true });
    });
  });

  describe('deleteNotification', () => {
    it('should delete notification successfully', async () => {
      const mockChain = {
        delete: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await deleteNotification(1);
      
      expect(result.success).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should return error when delete fails', async () => {
      const mockChain = {
        delete: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: new Error('Delete failed') }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await deleteNotification(1);
      
      expect(result.success).toBe(false);
      expect(result.error).toBeTruthy();
    });
  });

  describe('createNotification', () => {
    it('should create notification successfully', async () => {
      const mockChain = {
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockNotification, error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await createNotification({
        userId: 'user-123',
        type: 'message',
        title: 'Test notification',
        description: 'Test description',
      });
      
      expect(result.data).toBeDefined();
      expect(result.error).toBeNull();
      expect(mockChain.insert).toHaveBeenCalled();
    });

    it('should handle creation without description', async () => {
      const mockChain = {
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockNotification, error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await createNotification({
        userId: 'user-123',
        type: 'alert',
        title: 'Alert!',
      });
      
      expect(result.data).toBeDefined();
    });
  });

  describe('subscribeToNotifications', () => {
    it('should create and return unsubscribe function', () => {
      const mockChannel = {
        on: jest.fn().mockReturnThis(),
        subscribe: jest.fn().mockReturnThis(),
      };
      
      mockSupabaseClient.channel.mockReturnValue(mockChannel);
      
      const callback = jest.fn();
      const unsubscribe = subscribeToNotifications('user-123', callback);
      
      expect(typeof unsubscribe).toBe('function');
      expect(mockSupabaseClient.channel).toHaveBeenCalledWith('notifications:user-123');
    });

    it('should unsubscribe when called', () => {
      const mockChannel = {
        on: jest.fn().mockReturnThis(),
        subscribe: jest.fn().mockReturnThis(),
      };
      
      mockSupabaseClient.channel.mockReturnValue(mockChannel);
      
      const callback = jest.fn();
      const unsubscribe = subscribeToNotifications('user-123', callback);
      
      unsubscribe();
      
      expect(mockSupabaseClient.removeChannel).toHaveBeenCalled();
    });
  });

  describe('formatNotificationTime - extended', () => {
    it('should return "Just now" for very recent time', () => {
      const now = new Date().toISOString();
      const result = formatNotificationTime(now);
      expect(result).toBe('Just now');
    });

    it('should return minutes ago for recent time', () => {
      const date = new Date();
      date.setMinutes(date.getMinutes() - 30);
      const result = formatNotificationTime(date.toISOString());
      expect(result).toContain('m ago');
    });

    it('should return hours ago for same day', () => {
      const date = new Date();
      date.setHours(date.getHours() - 3);
      const result = formatNotificationTime(date.toISOString());
      expect(result).toContain('h ago');
    });

    it('should return days ago for this week', () => {
      const date = new Date();
      date.setDate(date.getDate() - 3);
      const result = formatNotificationTime(date.toISOString());
      expect(result).toContain('d ago');
    });

    it('should return formatted date for older dates', () => {
      const date = new Date();
      date.setDate(date.getDate() - 14);
      const result = formatNotificationTime(date.toISOString());
      // Should be like "Nov 20" or "Dec 5"
      expect(result).toMatch(/[A-Z][a-z]{2}\s\d{1,2}/);
    });
  });
});
