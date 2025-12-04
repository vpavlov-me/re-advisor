/**
 * Consultations CRUD Functions Tests
 * Tests for async database operations in consultations module
 */

import { 
  mockSupabaseClient, 
  mockAuthenticatedUser, 
  mockUnauthenticated,
  resetSupabaseMocks,
} from '../mocks/supabase';

import { 
  getConsultations,
  getUpcomingConsultations,
  getConsultation,
  createConsultation,
  updateConsultation,
  cancelConsultation,
  completeConsultation,
  addConsultationMembers,
  removeConsultationMember,
  getConsultationStats,
} from '@/lib/consultations';

// Mock data
const mockConsultation = {
  id: 1,
  family_id: 1,
  advisor_id: 'test-user-id',
  title: 'Financial Planning Session',
  date: '2024-12-15',
  time: '10:00',
  duration: '1h',
  status: 'scheduled' as const,
  payment_status: 'awaiting' as const,
  price: '$200',
  meeting_link: 'https://meet.jit.si/readvisor-test',
  type: 'video' as const,
  agenda: ['Review portfolio', 'Discuss investments'],
  notes: 'Client interested in real estate',
  created_at: new Date().toISOString(),
  family: { name: 'Test Family' },
  members: [],
};

describe('Consultations CRUD Functions', () => {
  beforeEach(() => {
    resetSupabaseMocks();
    jest.clearAllMocks();
  });

  describe('getConsultations', () => {
    it('should return error when not authenticated', async () => {
      mockUnauthenticated();
      
      const result = await getConsultations();
      
      expect(result.error).toBeTruthy();
      expect(result.error?.message).toBe('Not authenticated');
    });

    it('should return consultations when authenticated', async () => {
      mockAuthenticatedUser();
      
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        order: jest.fn().mockReturnThis(),
        gte: jest.fn().mockReturnThis(),
        lte: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        range: jest.fn().mockReturnThis(),
        data: [mockConsultation],
        count: 1,
        error: null,
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await getConsultations();
      
      expect(mockSupabaseClient.from).toHaveBeenCalledWith('consultations');
    });

    it('should apply filters when provided', async () => {
      mockAuthenticatedUser();
      
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockImplementation(() => mockChain),
        order: jest.fn().mockImplementation(() => mockChain),
        gte: jest.fn().mockImplementation(() => mockChain),
        lte: jest.fn().mockImplementation(() => mockChain),
        limit: jest.fn().mockImplementation(() => mockChain),
        range: jest.fn().mockImplementation(() => ({ data: [mockConsultation], count: 1, error: null })),
        data: [mockConsultation],
        count: 1,
        error: null,
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      await getConsultations({
        status: 'scheduled',
        familyId: 1,
        dateFrom: '2024-01-01',
        dateTo: '2024-12-31',
        limit: 10,
        offset: 5, // Non-zero offset to trigger range call
      });
      
      expect(mockChain.eq).toHaveBeenCalled();
      expect(mockChain.gte).toHaveBeenCalled();
      expect(mockChain.lte).toHaveBeenCalled();
      expect(mockChain.limit).toHaveBeenCalled();
      expect(mockChain.range).toHaveBeenCalled();
    });
  });

  describe('getUpcomingConsultations', () => {
    it('should return error when not authenticated', async () => {
      mockUnauthenticated();
      
      const result = await getUpcomingConsultations();
      
      expect(result.error?.message).toBe('Not authenticated');
    });

    it('should return upcoming consultations when authenticated', async () => {
      mockAuthenticatedUser();
      
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockImplementation(() => mockChain),
        in: jest.fn().mockImplementation(() => mockChain),
        gte: jest.fn().mockImplementation(() => mockChain),
        order: jest.fn().mockImplementation(() => mockChain),
        limit: jest.fn().mockResolvedValue({ data: [mockConsultation], error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await getUpcomingConsultations(5);
      
      expect(mockChain.in).toHaveBeenCalledWith('status', ['scheduled', 'confirmed', 'pending']);
      expect(mockChain.limit).toHaveBeenCalledWith(5);
    });
  });

  describe('getConsultation', () => {
    it('should return a single consultation', async () => {
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockConsultation, error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await getConsultation(1);
      
      expect(result.data).toEqual(mockConsultation);
    });

    it('should return error when consultation not found', async () => {
      const mockChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: null, error: new Error('Not found') }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await getConsultation(999);
      
      expect(result.data).toBeNull();
      expect(result.error).toBeTruthy();
    });
  });

  describe('createConsultation', () => {
    it('should return error when not authenticated', async () => {
      mockUnauthenticated();
      
      const result = await createConsultation({
        family_id: 1,
        title: 'New Consultation',
      });
      
      expect(result.error?.message).toBe('Not authenticated');
    });

    it('should create consultation when authenticated', async () => {
      mockAuthenticatedUser();
      
      // Insert consultation
      const insertChain = {
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockConsultation, error: null }),
      };
      
      // Get consultation with relations
      const getChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockConsultation, error: null }),
      };
      
      mockSupabaseClient.from
        .mockReturnValueOnce(insertChain)
        .mockReturnValueOnce(getChain);
      
      const result = await createConsultation({
        family_id: 1,
        title: 'New Consultation',
        date: '2024-12-15',
        time: '10:00',
        type: 'video',
      });
      
      expect(result.data).toBeDefined();
    });

    it('should add members when member_ids provided', async () => {
      mockAuthenticatedUser();
      
      // Insert consultation
      const insertChain = {
        insert: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockConsultation, error: null }),
      };
      
      // Insert members
      const membersChain = {
        insert: jest.fn().mockResolvedValue({ error: null }),
      };
      
      // Get consultation with relations
      const getChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: mockConsultation, error: null }),
      };
      
      mockSupabaseClient.from
        .mockReturnValueOnce(insertChain)
        .mockReturnValueOnce(membersChain)
        .mockReturnValueOnce(getChain);
      
      await createConsultation({
        family_id: 1,
        title: 'New Consultation',
        member_ids: [1, 2, 3],
      });
      
      expect(membersChain.insert).toHaveBeenCalled();
    });
  });

  describe('updateConsultation', () => {
    it('should update consultation', async () => {
      const updateChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      };
      
      const getChain = {
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
        single: jest.fn().mockResolvedValue({ data: { ...mockConsultation, title: 'Updated' }, error: null }),
      };
      
      mockSupabaseClient.from
        .mockReturnValueOnce(updateChain)
        .mockReturnValueOnce(getChain);
      
      const result = await updateConsultation(1, { title: 'Updated' });
      
      expect(result.data?.title).toBe('Updated');
    });
  });

  describe('cancelConsultation', () => {
    it('should cancel consultation', async () => {
      const mockChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await cancelConsultation(1);
      
      expect(result.success).toBe(true);
      expect(mockChain.update).toHaveBeenCalledWith({ status: 'cancelled' });
    });
  });

  describe('completeConsultation', () => {
    it('should complete consultation', async () => {
      const mockChain = {
        update: jest.fn().mockReturnThis(),
        eq: jest.fn().mockResolvedValue({ error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await completeConsultation(1);
      
      expect(result.success).toBe(true);
      expect(mockChain.update).toHaveBeenCalledWith({ status: 'completed' });
    });
  });

  describe('addConsultationMembers', () => {
    it('should add members to consultation', async () => {
      const mockChain = {
        insert: jest.fn().mockResolvedValue({ error: null }),
      };
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await addConsultationMembers(1, [1, 2]);
      
      expect(result.success).toBe(true);
    });
  });

  describe('removeConsultationMember', () => {
    it('should remove a member from consultation', async () => {
      const mockChain = {
        delete: jest.fn().mockReturnThis(),
        eq: jest.fn().mockReturnThis(),
      };
      
      mockChain.eq = jest.fn()
        .mockReturnValueOnce(mockChain)
        .mockResolvedValueOnce({ error: null });
      
      mockSupabaseClient.from.mockReturnValue(mockChain);
      
      const result = await removeConsultationMember(1, 1);
      
      expect(result.success).toBe(true);
    });
  });

  describe('getConsultationStats', () => {
    it('should return error when not authenticated', async () => {
      mockUnauthenticated();
      
      const result = await getConsultationStats();
      
      expect(result.error?.message).toBe('Not authenticated');
    });

    it('should return consultation statistics', async () => {
      mockAuthenticatedUser();
      
      // Create a mock chain that returns proper values
      const createMockChain = (countValue: number) => ({
        select: jest.fn().mockReturnThis(),
        eq: jest.fn().mockImplementation(function(this: any) { return this; }),
        in: jest.fn().mockImplementation(function(this: any) { return this; }),
        gte: jest.fn().mockResolvedValue({ count: countValue }),
      });
      
      mockSupabaseClient.from
        .mockReturnValueOnce(createMockChain(20))
        .mockReturnValueOnce(createMockChain(5))
        .mockReturnValueOnce(createMockChain(10))
        .mockReturnValueOnce(createMockChain(5));
      
      const result = await getConsultationStats();
      
      expect(result.error).toBeNull();
      expect(typeof result.total).toBe('number');
    });
  });
});
