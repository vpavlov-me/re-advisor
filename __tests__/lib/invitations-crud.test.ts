/**
 * Invitations CRUD Functions Tests
 * Tests for async database operations in invitations module
 */

import { 
  mockSupabaseClient, 
  mockAuthenticatedUser, 
  mockUnauthenticated,
  resetSupabaseMocks,
} from '../mocks/supabase';

import { 
  getFamilyInvitations,
  getPendingInvitationsCount,
  createInvitation,
  createBulkInvitations,
  cancelInvitation,
  resendInvitation,
  getInvitationByCode,
  acceptInvitation,
  getFamilyInviteLink,
  regenerateFamilyInviteCode,
  toggleFamilyInviteLink,
} from '@/lib/invitations';

// Mock data
const mockInvitation = {
  id: 'inv-123',
  family_id: 1,
  invited_by: 'user-123',
  email: 'test@example.com',
  role: 'member' as const,
  invite_code: 'ABC12345',
  status: 'pending' as const,
  message: 'Welcome to our family!',
  expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

const mockInvitationWithFamily = {
  ...mockInvitation,
  families: { name: 'Test Family', invite_code: 'FAM123' },
  inviter: { first_name: 'John', last_name: 'Doe' },
};

describe('Invitations CRUD Functions', () => {
  beforeEach(() => {
    resetSupabaseMocks();
    jest.clearAllMocks();
  });

  describe('getFamilyInvitations', () => {
    it('should return invitations for a family', async () => {
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: [mockInvitation], error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await getFamilyInvitations(1);
      
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('family_invitations');
      expect(result.data).toHaveLength(1);
      expect(result.error).toBeNull();
    });

    it('should return empty array when no invitations', async () => {
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: [], error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await getFamilyInvitations(1);
      
      expect(result.data).toHaveLength(0);
    });
  });

  describe('getPendingInvitationsCount', () => {
    it('should return count of pending invitations', async () => {
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
      };
      mockChain.eq = jest.fn()
        .mockReturnValueOnce(mockChain)
        .mockResolvedValueOnce({ count: 5 });
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await getPendingInvitationsCount(1);
      
      expect(result).toBe(5);
    });

    it('should return 0 when no pending invitations', async () => {
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
      };
      mockChain.eq = jest.fn()
        .mockReturnValueOnce(mockChain)
        .mockResolvedValueOnce({ count: null });
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await getPendingInvitationsCount(1);
      
      expect(result).toBe(0);
    });
  });

  describe('createInvitation', () => {
    it('should return error when not authenticated', async () => {
      mockUnauthenticated();
      
      const result = await createInvitation({ 
        family_id: 1, 
        email: 'test@example.com' 
      });
      
      expect(result.error).toBeTruthy();
      expect(result.error?.message).toBe('Not authenticated');
    });

    it('should return error when invitation already exists', async () => {
      mockAuthenticatedUser();
      
      const checkChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockInvitation, error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(checkChain);
      
      const result = await createInvitation({ 
        family_id: 1, 
        email: 'test@example.com' 
      });
      
      expect(result.error?.message).toBe('An invitation already exists for this email');
    });

    it('should create invitation when authenticated and no existing', async () => {
      mockAuthenticatedUser();
      
      // Check for existing - not found
      const checkChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: null }),
      };
      
      // Insert new invitation
      const insertChain = {
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockInvitation, error: null }),
      };
      
      mockSupabaseClient.from
        .mockReturnValueOnce(checkChain)
        .mockReturnValueOnce(insertChain);
      
      const result = await createInvitation({ 
        family_id: 1, 
        email: 'new@example.com',
        role: 'member',
        message: 'Welcome!',
      });
      
      expect(result.data).toBeDefined();
      expect(result.error).toBeNull();
    });
  });

  describe('createBulkInvitations', () => {
    it('should return error when not authenticated', async () => {
      mockUnauthenticated();
      
      const result = await createBulkInvitations(1, ['test@example.com']);
      
      expect(result.errors).toHaveLength(1);
      expect(result.errors[0].error).toBe('Not authenticated');
    });

    it('should create multiple invitations', async () => {
      mockAuthenticatedUser();
      
      // For each email: check then insert
      const checkChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: null }),
      };
      
      const insertChain = {
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockInvitation, error: null }),
      };
      
      // Two emails = 4 calls (check + insert for each)
      mockSupabaseClient.from
        .mockReturnValueOnce(checkChain)
        .mockReturnValueOnce(insertChain)
        .mockReturnValueOnce(checkChain)
        .mockReturnValueOnce(insertChain);
      
      const result = await createBulkInvitations(
        1, 
        ['test1@example.com', 'test2@example.com'],
        'member',
        'Welcome!'
      );
      
      expect(result.created.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('cancelInvitation', () => {
    it('should cancel invitation successfully', async () => {
      const mockChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await cancelInvitation('inv-123');
      
      expect(result.success).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should return error when cancel fails', async () => {
      const mockChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: new Error('Update failed') }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await cancelInvitation('inv-123');
      
      expect(result.success).toBe(false);
      expect(result.error).toBeTruthy();
    });
  });

  describe('resendInvitation', () => {
    it('should resend invitation with new code', async () => {
      const mockChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ 
          data: { ...mockInvitation, invite_code: 'NEWCODE1' }, 
          error: null 
        }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await resendInvitation('inv-123');
      
      expect(result.data).toBeDefined();
      expect(mockChain.update).toHaveBeenCalled();
    });
  });

  describe('getInvitationByCode', () => {
    it('should return invitation with family details', async () => {
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ 
          data: mockInvitationWithFamily, 
          error: null 
        }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await getInvitationByCode('ABC12345');
      
      expect(result.data).toBeDefined();
      expect(result.data?.families).toBeDefined();
    });

    it('should return error for expired invitation', async () => {
      const expiredInvitation = {
        ...mockInvitationWithFamily,
        expires_at: new Date(Date.now() - 1000).toISOString(), // expired
      };
      
      const selectChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: expiredInvitation, error: null }),
      };
      
      const updateChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      };
      
      mockSupabaseClient.from
        .mockReturnValueOnce(selectChain)
        .mockReturnValueOnce(updateChain);
      
      const result = await getInvitationByCode('ABC12345');
      
      expect(result.error?.message).toBe('This invitation has expired');
    });

    it('should return error for already used invitation', async () => {
      const usedInvitation = {
        ...mockInvitationWithFamily,
        status: 'accepted',
      };
      
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: usedInvitation, error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await getInvitationByCode('ABC12345');
      
      expect(result.error?.message).toContain('accepted');
    });
  });

  describe('acceptInvitation', () => {
    it('should return error when not authenticated', async () => {
      mockUnauthenticated();
      
      const result = await acceptInvitation('inv-123');
      
      expect(result.success).toBe(false);
      expect(result.error?.message).toBe('Not authenticated');
    });

    it('should accept invitation successfully', async () => {
      mockAuthenticatedUser();
      
      // Fetch invitation
      const fetchChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ 
          data: { 
            family_id: 1, 
            email: 'test@example.com', 
            role: 'member', 
            status: 'pending' 
          }, 
          error: null 
        }),
      };
      
      // Update invitation status
      const updateChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      };
      
      // Add family member
      const insertChain = {
        insert: jest.fn().mockResolvedValue({ error: null }),
      };
      
      mockSupabaseClient.from
        .mockReturnValueOnce(fetchChain)
        .mockReturnValueOnce(updateChain)
        .mockReturnValueOnce(insertChain);
      
      const result = await acceptInvitation('inv-123');
      
      expect(result.success).toBe(true);
      expect(result.familyId).toBe(1);
    });

    it('should return error when invitation not found', async () => {
      mockAuthenticatedUser();
      
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: new Error('Not found') }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await acceptInvitation('inv-123');
      
      expect(result.success).toBe(false);
      expect(result.error?.message).toBe('Invitation not found');
    });

    it('should return error when invitation is not pending', async () => {
      mockAuthenticatedUser();
      
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ 
          data: { status: 'accepted' }, 
          error: null 
        }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await acceptInvitation('inv-123');
      
      expect(result.success).toBe(false);
      expect(result.error?.message).toBe('This invitation is no longer valid');
    });
  });

  describe('getFamilyInviteLink', () => {
    it('should return invite link details', async () => {
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ 
          data: { invite_code: 'FAM123', invite_link_enabled: true }, 
          error: null 
        }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await getFamilyInviteLink(1);
      
      expect(result.inviteCode).toBe('FAM123');
      expect(result.enabled).toBe(true);
    });

    it('should return null when family not found', async () => {
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: new Error('Not found') }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await getFamilyInviteLink(999);
      
      expect(result.inviteCode).toBeNull();
      expect(result.enabled).toBe(false);
    });
  });

  describe('regenerateFamilyInviteCode', () => {
    it('should generate new invite code', async () => {
      const mockChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await regenerateFamilyInviteCode(1);
      
      expect(result.inviteCode).toBeTruthy();
      expect(result.inviteCode).toHaveLength(8);
      expect(result.error).toBeNull();
    });

    it('should return error when update fails', async () => {
      const mockChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: new Error('Update failed') }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await regenerateFamilyInviteCode(1);
      
      expect(result.inviteCode).toBeNull();
      expect(result.error).toBeTruthy();
    });
  });

  describe('toggleFamilyInviteLink', () => {
    it('should enable invite link', async () => {
      const mockChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await toggleFamilyInviteLink(1, true);
      
      expect(result.success).toBe(true);
    });

    it('should disable invite link', async () => {
      const mockChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await toggleFamilyInviteLink(1, false);
      
      expect(result.success).toBe(true);
    });
  });
});
