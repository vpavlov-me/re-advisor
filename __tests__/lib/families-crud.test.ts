/**
 * Families CRUD Functions Tests
 * Tests for async database operations in families module
 */

import { 
  mockSupabaseClient, 
  mockAuthenticatedUser, 
  mockUnauthenticated,
  resetSupabaseMocks,
} from '../mocks/supabase';

import { 
  getFamilies,
  getFamily,
  createFamily,
  updateFamily,
  deleteFamily,
  updateLastContact,
  getFamilyMembers,
  addFamilyMember,
  updateFamilyMember,
  removeFamilyMember,
  getFamilyStats,
} from '@/lib/families';

// Mock data
const mockFamily = {
  id: 1,
  advisor_id: 'test-user-id',
  name: 'Test Family',
  wealth: '$1M+',
  members_count: 2,
  role: 'consultant' as const,
  payment_status: 'paid' as const,
  status: 'active' as const,
  last_contact: '2024-01-01',
  industry: 'Technology',
  location: 'New York',
  email: 'family@test.com',
  phone: '+1234567890',
  description: 'Test description',
  created_at: '2024-01-01T00:00:00Z',
  updated_at: '2024-01-01T00:00:00Z',
};

const mockFamilyMember = {
  id: 1,
  family_id: 1,
  name: 'John Doe',
  role: 'Head of Family',
  email: 'john@test.com',
  avatar: 'https://example.com/avatar.jpg',
  created_at: '2024-01-01T00:00:00Z',
};

describe('Families CRUD Functions', () => {
  beforeEach(() => {
    resetSupabaseMocks();
    jest.clearAllMocks();
  });

  describe('getFamilies', () => {
    it('should return error when not authenticated', async () => {
      mockUnauthenticated();
      
      const result = await getFamilies();
      
      expect(result.error).toBeTruthy();
      expect(result.error?.message).toBe('Not authenticated');
      expect(result.data).toBeNull();
    });

    it('should return families when authenticated', async () => {
      mockAuthenticatedUser();
      
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        or: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        range: jest.fn().mockReturnThis(),
        data: [mockFamily],
        count: 1,
        error: null,
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await getFamilies();
      
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('families');
      expect(result.data).toBeDefined();
    });

    it('should apply status filter when provided', async () => {
      mockAuthenticatedUser();
      
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        or: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        range: jest.fn().mockReturnThis(),
        data: [mockFamily],
        count: 1,
        error: null,
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      await getFamilies({ status: 'active' });
      
      expect(mockChain.eq).toHaveBeenCalled();
    });

    it('should apply search filter when provided', async () => {
      mockAuthenticatedUser();
      
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        or: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        range: jest.fn().mockReturnThis(),
        data: [],
        count: 0,
        error: null,
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      await getFamilies({ search: 'test' });
      
      expect(mockChain.or).toHaveBeenCalled();
    });

    it('should apply pagination when provided', async () => {
      mockAuthenticatedUser();
      
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        or: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        range: jest.fn().mockReturnThis(),
        data: [mockFamily],
        count: 10,
        error: null,
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      await getFamilies({ limit: 10, offset: 20 });
      
      expect(mockChain.limit).toHaveBeenCalledWith(10);
      expect(mockChain.range).toHaveBeenCalled();
    });
  });

  describe('getFamily', () => {
    it('should return family with members', async () => {
      const familyChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockFamily, error: null }),
      };
      
      const membersChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: [mockFamilyMember], error: null }),
      };
      
      mockSupabaseClient.from
        .mockReturnValueOnce(familyChain)
        .mockReturnValueOnce(membersChain);
      
      const result = await getFamily(1);
      
      expect(result.data).toBeDefined();
      expect(result.data?.members).toBeDefined();
      expect(result.error).toBeNull();
    });

    it('should return error when family not found', async () => {
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: new Error('Not found') }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await getFamily(999);
      
      expect(result.data).toBeNull();
      expect(result.error).toBeTruthy();
    });
  });

  describe('createFamily', () => {
    it('should return error when not authenticated', async () => {
      mockUnauthenticated();
      
      const result = await createFamily({ name: 'New Family' });
      
      expect(result.error).toBeTruthy();
      expect(result.error?.message).toBe('Not authenticated');
    });

    it('should create family when authenticated', async () => {
      mockAuthenticatedUser();
      
      const mockChain = {
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockFamily, error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await createFamily({
        name: 'New Family',
        wealth: '$1M+',
        role: 'consultant',
      });
      
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('families');
      expect(mockChain.insert).toHaveBeenCalled();
      expect(result.data).toBeDefined();
    });
  });

  describe('updateFamily', () => {
    it('should update family', async () => {
      const mockChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: { ...mockFamily, name: 'Updated Family' }, error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await updateFamily(1, { name: 'Updated Family' });
      
      expect(mockChain.update).toHaveBeenCalled();
      expect(result.data?.name).toBe('Updated Family');
    });
  });

  describe('deleteFamily', () => {
    it('should delete family successfully', async () => {
      const mockChain = {
        delete: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await deleteFamily(1);
      
      expect(result.success).toBe(true);
      expect(result.error).toBeNull();
    });

    it('should return error when delete fails', async () => {
      const mockChain = {
        delete: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: new Error('Delete failed') }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await deleteFamily(1);
      
      expect(result.success).toBe(false);
      expect(result.error).toBeTruthy();
    });
  });

  describe('updateLastContact', () => {
    it('should update last contact timestamp', async () => {
      const mockChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await updateLastContact(1);
      
      expect(result.success).toBe(true);
      expect(mockChain.update).toHaveBeenCalled();
    });
  });

  describe('getFamilyMembers', () => {
    it('should return family members', async () => {
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockResolvedValue({ data: [mockFamilyMember], error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await getFamilyMembers(1);
      
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('family_members');
      expect(result.data).toHaveLength(1);
    });
  });

  describe('addFamilyMember', () => {
    it('should add member and update count', async () => {
      // Mock for insert
      const insertChain = {
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockFamilyMember, error: null }),
      };
      
      // Mock for count query
      const countChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ count: 2 }),
      };
      
      // Mock for update count
      const updateChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      };
      
      mockSupabaseClient.from
        .mockReturnValueOnce(insertChain)
        .mockReturnValueOnce(countChain)
        .mockReturnValueOnce(updateChain);
      
      const result = await addFamilyMember(1, {
        name: 'Jane Doe',
        role: 'Spouse',
      });
      
      expect(result.data).toBeDefined();
      expect(result.error).toBeNull();
    });
  });

  describe('updateFamilyMember', () => {
    it('should update family member', async () => {
      const mockChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ 
          data: { ...mockFamilyMember, name: 'Updated Name' }, 
          error: null 
        }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await updateFamilyMember(1, { name: 'Updated Name' });
      
      expect(result.data?.name).toBe('Updated Name');
    });
  });

  describe('removeFamilyMember', () => {
    it('should remove member and update count', async () => {
      // Mock for delete
      const deleteChain = {
        delete: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      };
      
      // Mock for count query
      const countChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ count: 1 }),
      };
      
      // Mock for update count
      const updateChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      };
      
      mockSupabaseClient.from
        .mockReturnValueOnce(deleteChain)
        .mockReturnValueOnce(countChain)
        .mockReturnValueOnce(updateChain);
      
      const result = await removeFamilyMember(1, 1);
      
      expect(result.success).toBe(true);
    });
  });

  describe('getFamilyStats', () => {
    it('should return error when not authenticated', async () => {
      mockUnauthenticated();
      
      const result = await getFamilyStats();
      
      expect(result.error).toBeTruthy();
      expect(result.total).toBe(0);
    });

    it('should return statistics when authenticated', async () => {
      mockAuthenticatedUser();
      
      // Mock for total count
      const totalChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ count: 10 }),
      };
      
      // Mock for active count
      const activeChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
      };
      activeChain.eq = jest.fn()
        .mockReturnValueOnce(activeChain) // first eq (advisor_id)
        .mockResolvedValueOnce({ count: 8 }); // second eq (status)
      
      // Mock for pending count
      const pendingChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
      };
      pendingChain.eq = jest.fn()
        .mockReturnValueOnce(pendingChain)
        .mockResolvedValueOnce({ count: 2 });
      
      // Mock for members sum
      const membersChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ data: [{ members_count: 5 }, { members_count: 3 }] }),
      };
      
      mockSupabaseClient.from
        .mockReturnValueOnce(totalChain)
        .mockReturnValueOnce(activeChain)
        .mockReturnValueOnce(pendingChain)
        .mockReturnValueOnce(membersChain);
      
      const result = await getFamilyStats();
      
      expect(result.error).toBeNull();
      expect(typeof result.total).toBe('number');
    });
  });
});
