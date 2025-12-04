/**
 * Messages CRUD Functions Tests
 * Tests for async database operations in messages module
 */

import { 
  mockSupabaseClient, 
  mockAuthenticatedUser, 
  mockUnauthenticated,
  resetSupabaseMocks,
} from '../mocks/supabase';

import { 
  getConversations,
  getConversation,
  createConversation,
  togglePinConversation,
  markConversationAsRead,
  deleteConversation,
  getConversationParticipants,
  addConversationParticipant,
  removeConversationParticipant,
  getMessages,
  sendMessage,
  deleteMessage,
  subscribeToMessages,
  subscribeToConversations,
  getMessagingStats,
} from '@/lib/messages';

// Mock data
const mockConversation = {
  id: 1,
  family_id: 1,
  title: 'Test Conversation',
  last_message: 'Hello!',
  last_message_time: new Date().toISOString(),
  unread_count: 2,
  pinned: false,
  created_at: new Date().toISOString(),
  family: { name: 'Test Family', status: 'active' },
};

const mockMessage = {
  id: 1,
  conversation_id: 1,
  sender_id: 'user-123',
  sender_name: 'John Doe',
  content: 'Hello, world!',
  read: false,
  is_own: true,
  created_at: new Date().toISOString(),
};

const mockParticipant = {
  id: 1,
  conversation_id: 1,
  user_id: 'user-123',
  participant_name: 'John Doe',
  role: 'owner' as const,
  added_at: new Date().toISOString(),
};

describe('Messages CRUD Functions', () => {
  beforeEach(() => {
    resetSupabaseMocks();
    jest.clearAllMocks();
  });

  describe('getConversations', () => {
    it('should return conversations', async () => {
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
      };
      
      mockChain.order.mockReturnValueOnce(mockChain);
      mockChain.order.mockResolvedValue({ data: [mockConversation], error: null });
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await getConversations();
      
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('conversations');
      expect(result.data).toBeDefined();
    });

    it('should filter pinned only when specified', async () => {
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
      };
      
      mockChain.order.mockReturnValueOnce(mockChain);
      mockChain.order.mockReturnThis();
      mockChain.eq.mockResolvedValue({ data: [{ ...mockConversation, pinned: true }], error: null });
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      await getConversations({ pinnedOnly: true });
      
      expect(mockChain.eq).toHaveBeenCalledWith('pinned', true);
    });

    it('should filter by search term', async () => {
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
      };
      
      mockChain.order.mockReturnValueOnce(mockChain);
      mockChain.order.mockResolvedValue({ 
        data: [mockConversation, { ...mockConversation, id: 2, title: 'Other', family: { name: 'Other', status: 'active' } }], 
        error: null 
      });
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await getConversations({ search: 'Test' });
      
      // Should filter results by search
      expect(result.data?.length).toBe(1);
    });
  });

  describe('getConversation', () => {
    it('should return a single conversation', async () => {
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockConversation, error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await getConversation(1);
      
      expect(result.data).toEqual(mockConversation);
    });
  });

  describe('createConversation', () => {
    it('should create a new conversation', async () => {
      const mockChain = {
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockConversation, error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await createConversation(1, 'New Conversation');
      
      expect(mockChain.insert).toHaveBeenCalled();
      expect(result.data).toBeDefined();
    });
  });

  describe('togglePinConversation', () => {
    it('should pin a conversation', async () => {
      const mockChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await togglePinConversation(1, true);
      
      expect(result.success).toBe(true);
      expect(mockChain.update).toHaveBeenCalledWith({ pinned: true });
    });

    it('should unpin a conversation', async () => {
      const mockChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await togglePinConversation(1, false);
      
      expect(result.success).toBe(true);
      expect(mockChain.update).toHaveBeenCalledWith({ pinned: false });
    });
  });

  describe('markConversationAsRead', () => {
    it('should mark conversation and messages as read', async () => {
      const convChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      };
      
      const msgChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
      };
      msgChain.eq = jest.fn()
        .mockReturnValueOnce(msgChain)
        .mockResolvedValueOnce({ error: null });
      
      mockSupabaseClient.from
        .mockReturnValueOnce(convChain)
        .mockReturnValueOnce(msgChain);
      
      const result = await markConversationAsRead(1);
      
      expect(result.success).toBe(true);
    });
  });

  describe('deleteConversation', () => {
    it('should delete a conversation', async () => {
      const mockChain = {
        delete: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await deleteConversation(1);
      
      expect(result.success).toBe(true);
    });
  });

  describe('getConversationParticipants', () => {
    it('should return participants', async () => {
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: [mockParticipant], error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await getConversationParticipants(1);
      
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('conversation_participants');
      expect(result.data).toHaveLength(1);
    });
  });

  describe('addConversationParticipant', () => {
    it('should add a participant', async () => {
      mockAuthenticatedUser();
      
      const mockChain = {
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockParticipant, error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await addConversationParticipant({
        conversation_id: 1,
        participant_name: 'Jane Doe',
        role: 'member',
      });
      
      expect(result.data).toBeDefined();
    });
  });

  describe('removeConversationParticipant', () => {
    it('should remove a participant', async () => {
      const mockChain = {
        delete: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await removeConversationParticipant(1);
      
      expect(result.success).toBe(true);
    });
  });

  describe('getMessages', () => {
    it('should return messages for a conversation', async () => {
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        lt: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
      };
      
      mockChain.order.mockResolvedValue({ data: [mockMessage], error: null });
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await getMessages(1);
      
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('messages');
      expect(result.data).toHaveLength(1);
    });

    it('should apply pagination with before option', async () => {
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        lt: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
      };
      
      mockChain.lt.mockResolvedValue({ data: [], error: null });
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      await getMessages(1, { before: '2024-01-01T00:00:00Z' });
      
      expect(mockChain.lt).toHaveBeenCalled();
    });
  });

  describe('sendMessage', () => {
    it('should return error when not authenticated', async () => {
      mockUnauthenticated();
      
      const result = await sendMessage({
        conversation_id: 1,
        content: 'Hello!',
      });
      
      expect(result.error?.message).toBe('Not authenticated');
    });

    it('should send message when authenticated', async () => {
      mockAuthenticatedUser();
      
      // Profile query
      const profileChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ 
          data: { first_name: 'John', last_name: 'Doe' }, 
          error: null 
        }),
      };
      
      // Message insert
      const messageChain = {
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockMessage, error: null }),
      };
      
      // Conversation update
      const convChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      };
      
      mockSupabaseClient.from
        .mockReturnValueOnce(profileChain)
        .mockReturnValueOnce(messageChain)
        .mockReturnValueOnce(convChain);
      
      const result = await sendMessage({
        conversation_id: 1,
        content: 'Hello!',
      });
      
      expect(result.data).toBeDefined();
    });

    it('should handle attachment in message', async () => {
      mockAuthenticatedUser();
      
      const profileChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ 
          data: { first_name: 'John', last_name: 'Doe' }, 
          error: null 
        }),
      };
      
      const messageChain = {
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockMessage, error: null }),
      };
      
      const convChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      };
      
      mockSupabaseClient.from
        .mockReturnValueOnce(profileChain)
        .mockReturnValueOnce(messageChain)
        .mockReturnValueOnce(convChain);
      
      const result = await sendMessage({
        conversation_id: 1,
        content: 'Check this file',
        attachment_url: 'https://example.com/file.pdf',
        attachment_name: 'file.pdf',
        attachment_type: 'application/pdf',
        attachment_size: 1024,
      });
      
      expect(result.data).toBeDefined();
    });
  });

  describe('deleteMessage', () => {
    it('should delete a message', async () => {
      const mockChain = {
        delete: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await deleteMessage(1);
      
      expect(result.success).toBe(true);
    });
  });

  describe('subscribeToMessages', () => {
    it('should create subscription and return unsubscribe function', () => {
      const mockChannel = {
        on: jest.fn().mockReturnThis(),
        subscribe: jest.fn().mockReturnThis(),
      };
      
      mockSupabaseClient.channel.mockReturnValue(mockChannel);
      
      const callback = jest.fn();
      const unsubscribe = subscribeToMessages(1, callback);
      
      expect(typeof unsubscribe).toBe('function');
      expect(mockSupabaseClient.channel).toHaveBeenCalledWith('messages:1');
    });
  });

  describe('subscribeToConversations', () => {
    it('should create subscription and return unsubscribe function', () => {
      const mockChannel = {
        on: jest.fn().mockReturnThis(),
        subscribe: jest.fn().mockReturnThis(),
      };
      
      mockSupabaseClient.channel.mockReturnValue(mockChannel);
      
      const callback = jest.fn();
      const unsubscribe = subscribeToConversations(callback);
      
      expect(typeof unsubscribe).toBe('function');
      expect(mockSupabaseClient.channel).toHaveBeenCalledWith('conversations');
    });
  });

  describe('getMessagingStats', () => {
    it('should return messaging statistics', async () => {
      // Total count
      const countChain = {
        select: jest.fn().mockReturnThis(),
      };
      countChain.select.mockResolvedValue({ count: 10 });
      
      // Conversations for unread and pinned
      const dataChain = {
        select: jest.fn().mockResolvedValue({ 
          data: [
            { unread_count: 2, pinned: true },
            { unread_count: 3, pinned: false },
            { unread_count: 0, pinned: true },
          ] 
        }),
      };
      
      mockSupabaseClient.from
        .mockReturnValueOnce(countChain)
        .mockReturnValueOnce(dataChain);
      
      const result = await getMessagingStats();
      
      expect(result.totalConversations).toBe(10);
      expect(result.unreadCount).toBe(5);
      expect(result.pinnedCount).toBe(2);
    });
  });
});
