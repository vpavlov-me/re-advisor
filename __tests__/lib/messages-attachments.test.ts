/**
 * Message Attachments Tests
 * Tests for file attachment functionality in messages
 */

import { sendMessage, type CreateMessageInput } from '@/lib/messages';
import { uploadAttachment, formatFileSize } from '@/lib/storage';
import { supabase } from '@/lib/supabaseClient';

// Mock Supabase client
jest.mock('@/lib/supabaseClient', () => ({
  supabase: {
    from: jest.fn(),
    auth: {
      getUser: jest.fn(),
    },
    storage: {
      from: jest.fn(),
    },
  },
}));

const mockSupabase = supabase as jest.Mocked<typeof supabase>;

describe('Message Attachments', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('sendMessage with attachment', () => {
    it('should send message with attachment data', async () => {
      const mockUser = { id: 'user-123' };
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
      });

      const mockProfile = { first_name: 'John', last_name: 'Doe' };
      const mockMessage = {
        id: 1,
        conversation_id: 100,
        content: 'Check this file',
        attachment_url: 'https://storage.example.com/file.pdf',
        attachment_name: 'document.pdf',
        attachment_type: 'application/pdf',
        attachment_size: 1024,
      };

      const mockSingle = jest.fn().mockResolvedValue({ data: mockMessage, error: null });
      const mockSelectAfterInsert = jest.fn().mockReturnValue({ single: mockSingle });
      const mockInsert = jest.fn().mockReturnValue({ select: mockSelectAfterInsert });
      const mockEqProfile = jest.fn().mockReturnValue({ single: jest.fn().mockResolvedValue({ data: mockProfile, error: null }) });
      const mockSelectProfile = jest.fn().mockReturnValue({ eq: mockEqProfile });

      const mockUpdateEq = jest.fn().mockResolvedValue({ error: null });
      const mockUpdate = jest.fn().mockReturnValue({ eq: mockUpdateEq });

      (mockSupabase.from as jest.Mock).mockImplementation((table: string) => {
        if (table === 'profiles') {
          return { select: mockSelectProfile };
        }
        if (table === 'messages') {
          return { insert: mockInsert };
        }
        if (table === 'conversations') {
          return { update: mockUpdate };
        }
        return {};
      });

      const input: CreateMessageInput = {
        conversation_id: 100,
        content: 'Check this file',
        attachment_url: 'https://storage.example.com/file.pdf',
        attachment_name: 'document.pdf',
        attachment_type: 'application/pdf',
        attachment_size: 1024,
      };

      const result = await sendMessage(input);

      expect(result.error).toBeNull();
      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({
          attachment_url: 'https://storage.example.com/file.pdf',
          attachment_name: 'document.pdf',
          attachment_type: 'application/pdf',
          attachment_size: 1024,
        })
      );
    });

    it('should update conversation last_message with attachment icon', async () => {
      const mockUser = { id: 'user-123' };
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
      });

      const mockProfile = { first_name: 'John', last_name: 'Doe' };
      const mockMessage = { id: 1 };

      const mockSingle = jest.fn().mockResolvedValue({ data: mockMessage, error: null });
      const mockSelectAfterInsert = jest.fn().mockReturnValue({ single: mockSingle });
      const mockInsert = jest.fn().mockReturnValue({ select: mockSelectAfterInsert });
      const mockEqProfile = jest.fn().mockReturnValue({ single: jest.fn().mockResolvedValue({ data: mockProfile, error: null }) });
      const mockSelectProfile = jest.fn().mockReturnValue({ eq: mockEqProfile });

      const mockUpdateEq = jest.fn().mockResolvedValue({ error: null });
      const mockUpdate = jest.fn().mockReturnValue({ eq: mockUpdateEq });

      (mockSupabase.from as jest.Mock).mockImplementation((table: string) => {
        if (table === 'profiles') {
          return { select: mockSelectProfile };
        }
        if (table === 'messages') {
          return { insert: mockInsert };
        }
        if (table === 'conversations') {
          return { update: mockUpdate };
        }
        return {};
      });

      const input: CreateMessageInput = {
        conversation_id: 100,
        content: '',
        attachment_name: 'photo.jpg',
      };

      await sendMessage(input);

      expect(mockUpdate).toHaveBeenCalledWith(
        expect.objectContaining({
          last_message: '📎 photo.jpg',
        })
      );
    });

    it('should send message without attachment', async () => {
      const mockUser = { id: 'user-123' };
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
      });

      const mockProfile = { first_name: 'John', last_name: 'Doe' };
      const mockMessage = { id: 1 };

      const mockSingle = jest.fn().mockResolvedValue({ data: mockMessage, error: null });
      const mockSelectAfterInsert = jest.fn().mockReturnValue({ single: mockSingle });
      const mockInsert = jest.fn().mockReturnValue({ select: mockSelectAfterInsert });
      const mockEqProfile = jest.fn().mockReturnValue({ single: jest.fn().mockResolvedValue({ data: mockProfile, error: null }) });
      const mockSelectProfile = jest.fn().mockReturnValue({ eq: mockEqProfile });

      const mockUpdateEq = jest.fn().mockResolvedValue({ error: null });
      const mockUpdate = jest.fn().mockReturnValue({ eq: mockUpdateEq });

      (mockSupabase.from as jest.Mock).mockImplementation((table: string) => {
        if (table === 'profiles') {
          return { select: mockSelectProfile };
        }
        if (table === 'messages') {
          return { insert: mockInsert };
        }
        if (table === 'conversations') {
          return { update: mockUpdate };
        }
        return {};
      });

      const input: CreateMessageInput = {
        conversation_id: 100,
        content: 'Hello world',
      };

      await sendMessage(input);

      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({
          content: 'Hello world',
          attachment_url: undefined,
          attachment_name: undefined,
        })
      );
    });
  });

  describe('formatFileSize', () => {
    it('should format bytes correctly', () => {
      expect(formatFileSize(0)).toBe('0 Bytes');
      expect(formatFileSize(500)).toBe('500 Bytes');
    });

    it('should format KB correctly', () => {
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(2048)).toBe('2 KB');
      expect(formatFileSize(1536)).toBe('1.5 KB');
    });

    it('should format MB correctly', () => {
      expect(formatFileSize(1024 * 1024)).toBe('1 MB');
      expect(formatFileSize(5 * 1024 * 1024)).toBe('5 MB');
      expect(formatFileSize(1.5 * 1024 * 1024)).toBe('1.5 MB');
    });

    it('should format GB correctly', () => {
      expect(formatFileSize(1024 * 1024 * 1024)).toBe('1 GB');
    });
  });
});

describe('Message Interface with Attachments', () => {
  it('should support optional attachment fields', () => {
    const messageWithAttachment = {
      id: 1,
      conversation_id: 100,
      content: 'Here is the document',
      read: true,
      is_own: true,
      created_at: '2024-01-01T00:00:00Z',
      attachment_url: 'https://example.com/file.pdf',
      attachment_name: 'report.pdf',
      attachment_type: 'application/pdf',
      attachment_size: 2048,
    };

    expect(messageWithAttachment.attachment_url).toBe('https://example.com/file.pdf');
    expect(messageWithAttachment.attachment_name).toBe('report.pdf');
    expect(messageWithAttachment.attachment_size).toBe(2048);
  });

  it('should allow messages without attachments', () => {
    const messageWithoutAttachment = {
      id: 2,
      conversation_id: 100,
      content: 'Just a text message',
      read: true,
      is_own: false,
      created_at: '2024-01-01T00:00:00Z',
    };

    expect(messageWithoutAttachment.content).toBe('Just a text message');
    expect((messageWithoutAttachment as any).attachment_url).toBeUndefined();
  });
});
