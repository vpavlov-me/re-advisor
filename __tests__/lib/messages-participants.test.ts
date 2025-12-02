/**
 * Messages Participants Tests
 * Tests for conversation participants functionality
 */

import { 
  togglePinConversation,
  getConversationParticipants,
  addConversationParticipant,
  removeConversationParticipant,
  type ConversationParticipant
} from '@/lib/messages';
import { supabase } from '@/lib/supabaseClient';

// Mock Supabase client
jest.mock('@/lib/supabaseClient', () => ({
  supabase: {
    from: jest.fn(),
    auth: {
      getUser: jest.fn(),
    },
  },
}));

const mockSupabase = supabase as jest.Mocked<typeof supabase>;

describe('Conversation Pin/Unpin', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('togglePinConversation', () => {
    it('should pin a conversation successfully', async () => {
      const mockUpdate = jest.fn().mockReturnValue({
        eq: jest.fn().mockResolvedValue({ error: null }),
      });
      
      (mockSupabase.from as jest.Mock).mockReturnValue({
        update: mockUpdate,
      });

      const result = await togglePinConversation(1, true);
      
      expect(result.success).toBe(true);
      expect(result.error).toBeNull();
      expect(mockSupabase.from).toHaveBeenCalledWith('conversations');
      expect(mockUpdate).toHaveBeenCalledWith({ pinned: true });
    });

    it('should unpin a conversation successfully', async () => {
      const mockEq = jest.fn().mockResolvedValue({ error: null });
      const mockUpdate = jest.fn().mockReturnValue({ eq: mockEq });
      
      (mockSupabase.from as jest.Mock).mockReturnValue({
        update: mockUpdate,
      });

      const result = await togglePinConversation(1, false);
      
      expect(result.success).toBe(true);
      expect(result.error).toBeNull();
      expect(mockUpdate).toHaveBeenCalledWith({ pinned: false });
    });

    it('should return error when update fails', async () => {
      const mockError = new Error('Database error');
      const mockEq = jest.fn().mockResolvedValue({ error: mockError });
      const mockUpdate = jest.fn().mockReturnValue({ eq: mockEq });
      
      (mockSupabase.from as jest.Mock).mockReturnValue({
        update: mockUpdate,
      });

      const result = await togglePinConversation(1, true);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe(mockError);
    });
  });
});

describe('Conversation Participants', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getConversationParticipants', () => {
    it('should return participants for a conversation', async () => {
      const mockParticipants: ConversationParticipant[] = [
        {
          id: 1,
          conversation_id: 100,
          user_id: 'user-1',
          family_member_id: 10,
          participant_name: 'John Doe',
          role: 'owner',
          added_at: '2024-01-01T00:00:00Z',
        },
        {
          id: 2,
          conversation_id: 100,
          family_member_id: 11,
          participant_name: 'Jane Doe',
          role: 'member',
          added_at: '2024-01-02T00:00:00Z',
        },
      ];

      const mockOrder = jest.fn().mockResolvedValue({ 
        data: mockParticipants, 
        error: null 
      });
      const mockEq = jest.fn().mockReturnValue({ order: mockOrder });
      const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
      
      (mockSupabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      const result = await getConversationParticipants(100);
      
      expect(result.data).toEqual(mockParticipants);
      expect(result.error).toBeNull();
      expect(mockSupabase.from).toHaveBeenCalledWith('conversation_participants');
      expect(mockSelect).toHaveBeenCalledWith('*');
      expect(mockEq).toHaveBeenCalledWith('conversation_id', 100);
    });

    it('should return empty array when no participants', async () => {
      const mockOrder = jest.fn().mockResolvedValue({ data: [], error: null });
      const mockEq = jest.fn().mockReturnValue({ order: mockOrder });
      const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
      
      (mockSupabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      const result = await getConversationParticipants(100);
      
      expect(result.data).toEqual([]);
      expect(result.error).toBeNull();
    });

    it('should handle database errors', async () => {
      const mockError = new Error('Connection failed');
      const mockOrder = jest.fn().mockResolvedValue({ data: null, error: mockError });
      const mockEq = jest.fn().mockReturnValue({ order: mockOrder });
      const mockSelect = jest.fn().mockReturnValue({ eq: mockEq });
      
      (mockSupabase.from as jest.Mock).mockReturnValue({
        select: mockSelect,
      });

      const result = await getConversationParticipants(100);
      
      expect(result.data).toBeNull();
      expect(result.error).toBe(mockError);
    });
  });

  describe('addConversationParticipant', () => {
    it('should add a participant with family_member_id', async () => {
      const mockUser = { id: 'advisor-123' };
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
      });

      const newParticipant: ConversationParticipant = {
        id: 3,
        conversation_id: 100,
        family_member_id: 15,
        participant_name: 'New Member',
        role: 'member',
        added_at: '2024-01-03T00:00:00Z',
      };

      const mockSingle = jest.fn().mockResolvedValue({ 
        data: newParticipant, 
        error: null 
      });
      const mockSelectAfterInsert = jest.fn().mockReturnValue({ single: mockSingle });
      const mockInsert = jest.fn().mockReturnValue({ select: mockSelectAfterInsert });
      
      (mockSupabase.from as jest.Mock).mockReturnValue({
        insert: mockInsert,
      });

      const result = await addConversationParticipant({
        conversation_id: 100,
        family_member_id: 15,
        participant_name: 'New Member',
        role: 'member',
      });
      
      expect(result.data).toEqual(newParticipant);
      expect(result.error).toBeNull();
      expect(mockInsert).toHaveBeenCalledWith({
        conversation_id: 100,
        family_member_id: 15,
        user_id: undefined,
        participant_name: 'New Member',
        role: 'member',
        added_by: 'advisor-123',
      });
    });

    it('should add a participant with user_id', async () => {
      const mockUser = { id: 'advisor-123' };
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
      });

      const newParticipant: ConversationParticipant = {
        id: 4,
        conversation_id: 100,
        user_id: 'user-456',
        participant_name: 'User Participant',
        role: 'owner',
        added_at: '2024-01-03T00:00:00Z',
      };

      const mockSingle = jest.fn().mockResolvedValue({ 
        data: newParticipant, 
        error: null 
      });
      const mockSelectAfterInsert = jest.fn().mockReturnValue({ single: mockSingle });
      const mockInsert = jest.fn().mockReturnValue({ select: mockSelectAfterInsert });
      
      (mockSupabase.from as jest.Mock).mockReturnValue({
        insert: mockInsert,
      });

      const result = await addConversationParticipant({
        conversation_id: 100,
        user_id: 'user-456',
        participant_name: 'User Participant',
        role: 'owner',
      });
      
      expect(result.data).toEqual(newParticipant);
      expect(result.error).toBeNull();
    });

    it('should default role to member if not specified', async () => {
      const mockUser = { id: 'advisor-123' };
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
      });

      const mockSingle = jest.fn().mockResolvedValue({ 
        data: { id: 5 }, 
        error: null 
      });
      const mockSelectAfterInsert = jest.fn().mockReturnValue({ single: mockSingle });
      const mockInsert = jest.fn().mockReturnValue({ select: mockSelectAfterInsert });
      
      (mockSupabase.from as jest.Mock).mockReturnValue({
        insert: mockInsert,
      });

      await addConversationParticipant({
        conversation_id: 100,
        family_member_id: 20,
        participant_name: 'Default Role Member',
      });
      
      expect(mockInsert).toHaveBeenCalledWith(
        expect.objectContaining({
          role: 'member',
        })
      );
    });

    it('should handle duplicate participant error', async () => {
      const mockUser = { id: 'advisor-123' };
      (mockSupabase.auth.getUser as jest.Mock).mockResolvedValue({
        data: { user: mockUser },
      });

      const mockError = new Error('Duplicate key violation');
      const mockSingle = jest.fn().mockResolvedValue({ 
        data: null, 
        error: mockError 
      });
      const mockSelectAfterInsert = jest.fn().mockReturnValue({ single: mockSingle });
      const mockInsert = jest.fn().mockReturnValue({ select: mockSelectAfterInsert });
      
      (mockSupabase.from as jest.Mock).mockReturnValue({
        insert: mockInsert,
      });

      const result = await addConversationParticipant({
        conversation_id: 100,
        family_member_id: 15,
        participant_name: 'Duplicate Member',
      });
      
      expect(result.data).toBeNull();
      expect(result.error).toBe(mockError);
    });
  });

  describe('removeConversationParticipant', () => {
    it('should remove a participant successfully', async () => {
      const mockEq = jest.fn().mockResolvedValue({ error: null });
      const mockDelete = jest.fn().mockReturnValue({ eq: mockEq });
      
      (mockSupabase.from as jest.Mock).mockReturnValue({
        delete: mockDelete,
      });

      const result = await removeConversationParticipant(5);
      
      expect(result.success).toBe(true);
      expect(result.error).toBeNull();
      expect(mockSupabase.from).toHaveBeenCalledWith('conversation_participants');
      expect(mockEq).toHaveBeenCalledWith('id', 5);
    });

    it('should handle removal error', async () => {
      const mockError = new Error('Participant not found');
      const mockEq = jest.fn().mockResolvedValue({ error: mockError });
      const mockDelete = jest.fn().mockReturnValue({ eq: mockEq });
      
      (mockSupabase.from as jest.Mock).mockReturnValue({
        delete: mockDelete,
      });

      const result = await removeConversationParticipant(999);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe(mockError);
    });
  });
});

describe('ConversationParticipant Type', () => {
  it('should have correct structure', () => {
    const participant: ConversationParticipant = {
      id: 1,
      conversation_id: 100,
      user_id: 'user-123',
      family_member_id: 10,
      participant_name: 'Test User',
      role: 'member',
      added_at: '2024-01-01T00:00:00Z',
    };

    expect(participant.id).toBe(1);
    expect(participant.conversation_id).toBe(100);
    expect(participant.participant_name).toBe('Test User');
    expect(participant.role).toBe('member');
  });

  it('should allow owner role', () => {
    const owner: ConversationParticipant = {
      id: 2,
      conversation_id: 100,
      participant_name: 'Owner User',
      role: 'owner',
      added_at: '2024-01-01T00:00:00Z',
    };

    expect(owner.role).toBe('owner');
  });

  it('should allow optional user_id and family_member_id', () => {
    const participantWithUserId: ConversationParticipant = {
      id: 3,
      conversation_id: 100,
      user_id: 'user-456',
      participant_name: 'User Only',
      role: 'member',
      added_at: '2024-01-01T00:00:00Z',
    };

    const participantWithFamilyMemberId: ConversationParticipant = {
      id: 4,
      conversation_id: 100,
      family_member_id: 20,
      participant_name: 'Family Member Only',
      role: 'member',
      added_at: '2024-01-01T00:00:00Z',
    };

    expect(participantWithUserId.user_id).toBe('user-456');
    expect(participantWithUserId.family_member_id).toBeUndefined();
    expect(participantWithFamilyMemberId.family_member_id).toBe(20);
    expect(participantWithFamilyMemberId.user_id).toBeUndefined();
  });
});
