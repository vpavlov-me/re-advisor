/**
 * Tests for useMessaging hook
 * 
 * Tests messaging state management, conversations, and real-time updates.
 */

import { renderHook, act, waitFor } from '@testing-library/react';

// Mock supabaseClient
const mockGetUser = jest.fn();
const mockFrom = jest.fn();
const mockChannel = jest.fn();
const mockRemoveChannel = jest.fn();

jest.mock('@/lib/supabaseClient', () => ({
  supabase: {
    auth: {
      getUser: () => mockGetUser(),
    },
    from: (table: string) => mockFrom(table),
    channel: (name: string) => mockChannel(name),
    removeChannel: (channel: unknown) => mockRemoveChannel(channel),
  },
  isSupabaseConfigured: () => true,
}));

// Import after mocks
import { useMessaging } from '@/lib/hooks/use-messaging';

describe('useMessaging Hook', () => {
  const userId = 'user-123';
  
  const mockConversations = [
    {
      id: 1,
      family_id: 101,
      family: { name: 'Smith Family', advisor_id: userId },
      title: 'General Discussion',
      last_message: 'Hello!',
      last_message_time: new Date().toISOString(),
      unread_count: 2,
      pinned: false,
    },
    {
      id: 2,
      family_id: 102,
      family: { name: 'Johnson Family', advisor_id: userId },
      title: 'Financial Planning',
      last_message: 'Thanks!',
      last_message_time: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      unread_count: 0,
      pinned: true,
    },
  ];

  const mockMessages = [
    {
      id: 1,
      conversation_id: 1,
      sender_id: 'other-user',
      sender_name: 'John Smith',
      content: 'Hello there!',
      created_at: new Date(Date.now() - 3600000).toISOString(),
      read: true,
    },
    {
      id: 2,
      conversation_id: 1,
      sender_id: userId,
      sender_name: 'You',
      content: 'Hi John!',
      created_at: new Date().toISOString(),
      read: true,
    },
  ];

  const mockChannelInstance = {
    on: jest.fn().mockReturnThis(),
    subscribe: jest.fn().mockReturnThis(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockChannel.mockReturnValue(mockChannelInstance);
    
    // Default mock implementations
    mockFrom.mockImplementation((table: string) => {
      if (table === 'conversations') {
        return {
          select: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              order: jest.fn().mockResolvedValue({ data: mockConversations, error: null }),
            }),
          }),
          update: jest.fn().mockReturnValue({
            eq: jest.fn().mockResolvedValue({ data: null, error: null }),
          }),
          insert: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({
                data: { 
                  id: 3, 
                  family_id: 103, 
                  family: { name: 'New Family' },
                  title: 'New Conversation',
                  last_message: 'Started a new conversation',
                  last_message_time: new Date().toISOString(),
                  unread_count: 0,
                  pinned: false,
                },
                error: null,
              }),
            }),
          }),
        };
      }
      if (table === 'messages') {
        return {
          select: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              order: jest.fn().mockResolvedValue({ data: mockMessages, error: null }),
            }),
          }),
          insert: jest.fn().mockReturnValue({
            select: jest.fn().mockReturnValue({
              single: jest.fn().mockResolvedValue({
                data: { id: 100, conversation_id: 1 },
                error: null,
              }),
            }),
          }),
          update: jest.fn().mockReturnValue({
            eq: jest.fn().mockReturnValue({
              eq: jest.fn().mockResolvedValue({ data: null, error: null }),
            }),
          }),
        };
      }
      return {};
    });
  });

  describe('Initial State', () => {
    it('starts in loading state', () => {
      const { result } = renderHook(() => useMessaging(userId));
      
      expect(result.current.isLoading).toBe(true);
    });

    it('initializes with empty arrays', () => {
      const { result } = renderHook(() => useMessaging(userId));
      
      expect(result.current.conversations).toEqual([]);
      expect(result.current.messages).toEqual([]);
      expect(result.current.typingUsers).toEqual([]);
    });

    it('has null selected conversation initially', () => {
      const { result } = renderHook(() => useMessaging(userId));
      
      expect(result.current.selectedConversation).toBeNull();
    });

    it('has null error initially', () => {
      const { result } = renderHook(() => useMessaging(userId));
      
      expect(result.current.error).toBeNull();
    });
  });

  describe('Loading Conversations', () => {
    it('loads conversations on mount', async () => {
      const { result } = renderHook(() => useMessaging(userId));
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      
      expect(result.current.conversations).toHaveLength(2);
      expect(result.current.conversations[0].familyName).toBe('Smith Family');
    });

    it('auto-selects first conversation', async () => {
      const { result } = renderHook(() => useMessaging(userId));
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      
      await waitFor(() => {
        expect(result.current.selectedConversation).not.toBeNull();
      });
      
      expect(result.current.selectedConversation?.id).toBe(1);
    });

    it('does not load if userId is null', async () => {
      const { result } = renderHook(() => useMessaging(null));
      
      // Give it time to potentially load
      await new Promise(resolve => setTimeout(resolve, 100));
      
      expect(result.current.conversations).toEqual([]);
    });

    it('handles fetch error', async () => {
      mockFrom.mockImplementation((table: string) => {
        if (table === 'conversations') {
          return {
            select: jest.fn().mockReturnValue({
              eq: jest.fn().mockReturnValue({
                order: jest.fn().mockRejectedValue(new Error('Network error')),
              }),
            }),
          };
        }
        return {};
      });
      
      const { result } = renderHook(() => useMessaging(userId));
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      
      expect(result.current.error).toBe('Failed to load conversations');
    });
  });

  describe('Select Conversation', () => {
    it('selects a conversation and loads messages', async () => {
      const { result } = renderHook(() => useMessaging(userId));
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      
      const conversation = result.current.conversations[1]; // Johnson Family
      
      act(() => {
        result.current.selectConversation(conversation);
      });
      
      await waitFor(() => {
        expect(result.current.selectedConversation?.id).toBe(2);
      });
    });
  });

  describe('Send Message', () => {
    it('sends a message successfully', async () => {
      const { result } = renderHook(() => useMessaging(userId));
      
      await waitFor(() => {
        expect(result.current.selectedConversation).not.toBeNull();
      });
      
      let sendResult: { success: boolean; error: string | null };
      await act(async () => {
        sendResult = await result.current.sendMessage('Hello World!');
      });
      
      expect(sendResult!.success).toBe(true);
      expect(sendResult!.error).toBeNull();
    });

    it('adds message optimistically', async () => {
      const { result } = renderHook(() => useMessaging(userId));
      
      await waitFor(() => {
        expect(result.current.selectedConversation).not.toBeNull();
      });
      
      const messagesBefore = result.current.messages.length;
      
      await act(async () => {
        await result.current.sendMessage('New message');
      });
      
      expect(result.current.messages.length).toBeGreaterThan(messagesBefore);
    });

    it('fails if no conversation selected', async () => {
      // Create a hook without auto-selecting conversation
      mockFrom.mockImplementation((table: string) => {
        if (table === 'conversations') {
          return {
            select: jest.fn().mockReturnValue({
              eq: jest.fn().mockReturnValue({
                order: jest.fn().mockResolvedValue({ data: [], error: null }),
              }),
            }),
          };
        }
        return {};
      });
      
      const { result } = renderHook(() => useMessaging(userId));
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      
      let sendResult: { success: boolean; error: string | null };
      await act(async () => {
        sendResult = await result.current.sendMessage('Test');
      });
      
      expect(sendResult!.success).toBe(false);
      expect(sendResult!.error).toBe('Invalid message or no conversation selected');
    });

    it('fails if message is empty', async () => {
      const { result } = renderHook(() => useMessaging(userId));
      
      await waitFor(() => {
        expect(result.current.selectedConversation).not.toBeNull();
      });
      
      let sendResult: { success: boolean; error: string | null };
      await act(async () => {
        sendResult = await result.current.sendMessage('   ');
      });
      
      expect(sendResult!.success).toBe(false);
      expect(sendResult!.error).toBe('Invalid message or no conversation selected');
    });
  });

  describe('Create Conversation', () => {
    it('creates a new conversation', async () => {
      const { result } = renderHook(() => useMessaging(userId));
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      
      let createResult: { conversation: unknown; error: string | null };
      await act(async () => {
        createResult = await result.current.createConversation(103, 'New Chat');
      });
      
      expect(createResult!.conversation).not.toBeNull();
      expect(createResult!.error).toBeNull();
    });

    it('fails if not authenticated', async () => {
      const { result } = renderHook(() => useMessaging(null));
      
      let createResult: { conversation: unknown; error: string | null };
      await act(async () => {
        createResult = await result.current.createConversation(103, 'New Chat');
      });
      
      expect(createResult!.conversation).toBeNull();
      expect(createResult!.error).toBe('Not authenticated');
    });

    it('selects newly created conversation', async () => {
      const { result } = renderHook(() => useMessaging(userId));
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      
      await act(async () => {
        await result.current.createConversation(103, 'New Chat');
      });
      
      expect(result.current.selectedConversation?.id).toBe(3);
    });
  });

  describe('Mark As Read', () => {
    it('marks conversation as read', async () => {
      const { result } = renderHook(() => useMessaging(userId));
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      
      // First conversation has unread messages
      expect(result.current.conversations[0].unreadCount).toBe(2);
      
      await act(async () => {
        await result.current.markAsRead(1);
      });
      
      expect(result.current.conversations[0].unreadCount).toBe(0);
    });
  });

  describe('Typing Indicator', () => {
    it('sets typing state', () => {
      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
      
      const { result } = renderHook(() => useMessaging(userId));
      
      act(() => {
        result.current.setTyping(true);
      });
      
      expect(consoleSpy).toHaveBeenCalledWith('Typing:', true);
      
      consoleSpy.mockRestore();
    });
  });

  describe('Refresh', () => {
    it('refreshes conversations and messages', async () => {
      const { result } = renderHook(() => useMessaging(userId));
      
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      
      await act(async () => {
        await result.current.refresh();
      });
      
      expect(result.current.conversations).toHaveLength(2);
    });
  });

  describe('Real-time Subscription', () => {
    it('sets up channel for selected conversation', async () => {
      const { result } = renderHook(() => useMessaging(userId));
      
      await waitFor(() => {
        expect(result.current.selectedConversation).not.toBeNull();
      });
      
      expect(mockChannel).toHaveBeenCalledWith('messages-1');
      expect(mockChannelInstance.on).toHaveBeenCalled();
      expect(mockChannelInstance.subscribe).toHaveBeenCalled();
    });

    it('cleans up channel on unmount', async () => {
      const { result, unmount } = renderHook(() => useMessaging(userId));
      
      await waitFor(() => {
        expect(result.current.selectedConversation).not.toBeNull();
      });
      
      unmount();
      
      expect(mockRemoveChannel).toHaveBeenCalled();
    });
  });

  describe('Time Formatting', () => {
    it('formats recent times as HH:MM', async () => {
      const now = new Date();
      mockFrom.mockImplementation((table: string) => {
        if (table === 'conversations') {
          return {
            select: jest.fn().mockReturnValue({
              eq: jest.fn().mockReturnValue({
                order: jest.fn().mockResolvedValue({
                  data: [{
                    id: 1,
                    family_id: 101,
                    family: { name: 'Test Family', advisor_id: userId },
                    title: 'Test',
                    last_message: 'Hello',
                    last_message_time: now.toISOString(),
                    unread_count: 0,
                    pinned: false,
                  }],
                  error: null,
                }),
              }),
            }),
          };
        }
        return {};
      });
      
      const { result } = renderHook(() => useMessaging(userId));
      
      await waitFor(() => {
        expect(result.current.conversations).toHaveLength(1);
      });
      
      // Should be formatted as time (HH:MM)
      expect(result.current.conversations[0].lastMessageTime).toMatch(/\d{1,2}:\d{2}/);
    });

    it('formats yesterday as "Yesterday"', async () => {
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
      yesterday.setHours(12, 0, 0, 0); // Ensure it's clearly yesterday
      
      mockFrom.mockImplementation((table: string) => {
        if (table === 'conversations') {
          return {
            select: jest.fn().mockReturnValue({
              eq: jest.fn().mockReturnValue({
                order: jest.fn().mockResolvedValue({
                  data: [{
                    id: 1,
                    family_id: 101,
                    family: { name: 'Test Family', advisor_id: userId },
                    title: 'Test',
                    last_message: 'Hello',
                    last_message_time: yesterday.toISOString(),
                    unread_count: 0,
                    pinned: false,
                  }],
                  error: null,
                }),
              }),
            }),
          };
        }
        return {};
      });
      
      const { result } = renderHook(() => useMessaging(userId));
      
      await waitFor(() => {
        expect(result.current.conversations).toHaveLength(1);
      });
      
      expect(result.current.conversations[0].lastMessageTime).toBe('Yesterday');
    });
  });
});
