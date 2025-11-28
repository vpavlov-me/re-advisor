// Consultations Service - CRUD operations for scheduling and managing consultations
import { supabase } from './supabaseClient';

// Types
export interface Consultation {
  id: number;
  family_id: number;
  advisor_id: string;
  title: string;
  date?: string;
  time?: string;
  duration?: string;
  status: 'scheduled' | 'confirmed' | 'pending' | 'completed' | 'cancelled';
  payment_status?: 'paid' | 'awaiting' | 'overdue';
  price?: string;
  meeting_link?: string;
  location?: string;
  type?: 'video' | 'in-person' | 'phone';
  agenda?: string[];
  notes?: string;
  created_at: string;
  // Joined data
  family?: {
    name: string;
  };
  members?: ConsultationMember[];
}

export interface ConsultationMember {
  id: number;
  consultation_id: number;
  family_member_id: number;
  member?: {
    id: number;
    name: string;
    role?: string;
    avatar?: string;
  };
}

export interface CreateConsultationInput {
  family_id: number;
  title: string;
  date?: string;
  time?: string;
  duration?: string;
  type?: 'video' | 'in-person' | 'phone';
  meeting_link?: string;
  location?: string;
  price?: string;
  agenda?: string[];
  notes?: string;
  member_ids?: number[];
}

export interface UpdateConsultationInput {
  title?: string;
  date?: string;
  time?: string;
  duration?: string;
  status?: 'scheduled' | 'confirmed' | 'pending' | 'completed' | 'cancelled';
  payment_status?: 'paid' | 'awaiting' | 'overdue';
  type?: 'video' | 'in-person' | 'phone';
  meeting_link?: string;
  location?: string;
  price?: string;
  agenda?: string[];
  notes?: string;
}

// ============ CONSULTATIONS CRUD ============

/**
 * Get all consultations for the current advisor
 */
export async function getConsultations(options?: {
  status?: 'scheduled' | 'confirmed' | 'pending' | 'completed' | 'cancelled';
  familyId?: number;
  dateFrom?: string;
  dateTo?: string;
  limit?: number;
  offset?: number;
}): Promise<{ data: Consultation[] | null; count: number; error: Error | null }> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, count: 0, error: new Error('Not authenticated') };
  }

  let query = supabase
    .from('consultations')
    .select(`
      *,
      family:families(name),
      members:consultation_members(
        id,
        family_member_id,
        member:family_members(id, name, role, avatar)
      )
    `, { count: 'exact' })
    .eq('advisor_id', user.id)
    .order('date', { ascending: true });

  if (options?.status) {
    query = query.eq('status', options.status);
  }

  if (options?.familyId) {
    query = query.eq('family_id', options.familyId);
  }

  if (options?.dateFrom) {
    query = query.gte('date', options.dateFrom);
  }

  if (options?.dateTo) {
    query = query.lte('date', options.dateTo);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
  }

  const { data, count, error } = await query;
  return { data, count: count || 0, error };
}

/**
 * Get upcoming consultations (scheduled/confirmed/pending)
 */
export async function getUpcomingConsultations(limit?: number): Promise<{
  data: Consultation[] | null;
  error: Error | null;
}> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, error: new Error('Not authenticated') };
  }

  let query = supabase
    .from('consultations')
    .select(`
      *,
      family:families(name),
      members:consultation_members(
        id,
        family_member_id,
        member:family_members(id, name, role, avatar)
      )
    `)
    .eq('advisor_id', user.id)
    .in('status', ['scheduled', 'confirmed', 'pending'])
    .gte('date', new Date().toISOString().split('T')[0])
    .order('date', { ascending: true })
    .order('time', { ascending: true });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  return { data, error };
}

/**
 * Get a single consultation by ID
 */
export async function getConsultation(consultationId: number): Promise<{
  data: Consultation | null;
  error: Error | null;
}> {
  const { data, error } = await supabase
    .from('consultations')
    .select(`
      *,
      family:families(name),
      members:consultation_members(
        id,
        family_member_id,
        member:family_members(id, name, role, avatar)
      )
    `)
    .eq('id', consultationId)
    .single();

  return { data, error };
}

/**
 * Create a new consultation
 */
export async function createConsultation(input: CreateConsultationInput): Promise<{
  data: Consultation | null;
  error: Error | null;
}> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, error: new Error('Not authenticated') };
  }

  // Create the consultation
  const { data: consultation, error: consultationError } = await supabase
    .from('consultations')
    .insert({
      advisor_id: user.id,
      family_id: input.family_id,
      title: input.title,
      date: input.date,
      time: input.time,
      duration: input.duration,
      type: input.type,
      meeting_link: input.meeting_link,
      location: input.location,
      price: input.price,
      agenda: input.agenda,
      notes: input.notes,
      status: 'scheduled',
      payment_status: 'awaiting',
    })
    .select()
    .single();

  if (consultationError || !consultation) {
    return { data: null, error: consultationError };
  }

  // Add members if provided
  if (input.member_ids && input.member_ids.length > 0) {
    const memberInserts = input.member_ids.map((memberId) => ({
      consultation_id: consultation.id,
      family_member_id: memberId,
    }));

    await supabase.from('consultation_members').insert(memberInserts);
  }

  // Fetch the full consultation with relations
  return getConsultation(consultation.id);
}

/**
 * Update a consultation
 */
export async function updateConsultation(
  consultationId: number,
  input: UpdateConsultationInput
): Promise<{ data: Consultation | null; error: Error | null }> {
  const { error } = await supabase
    .from('consultations')
    .update(input)
    .eq('id', consultationId);

  if (error) {
    return { data: null, error };
  }

  return getConsultation(consultationId);
}

/**
 * Cancel a consultation
 */
export async function cancelConsultation(consultationId: number): Promise<{
  success: boolean;
  error: Error | null;
}> {
  const { error } = await supabase
    .from('consultations')
    .update({ status: 'cancelled' })
    .eq('id', consultationId);

  return { success: !error, error };
}

/**
 * Complete a consultation
 */
export async function completeConsultation(consultationId: number): Promise<{
  success: boolean;
  error: Error | null;
}> {
  const { error } = await supabase
    .from('consultations')
    .update({ status: 'completed' })
    .eq('id', consultationId);

  return { success: !error, error };
}

/**
 * Delete a consultation
 */
export async function deleteConsultation(consultationId: number): Promise<{
  success: boolean;
  error: Error | null;
}> {
  const { error } = await supabase
    .from('consultations')
    .delete()
    .eq('id', consultationId);

  return { success: !error, error };
}

// ============ CONSULTATION MEMBERS ============

/**
 * Add members to a consultation
 */
export async function addConsultationMembers(
  consultationId: number,
  memberIds: number[]
): Promise<{ success: boolean; error: Error | null }> {
  const inserts = memberIds.map((memberId) => ({
    consultation_id: consultationId,
    family_member_id: memberId,
  }));

  const { error } = await supabase.from('consultation_members').insert(inserts);

  return { success: !error, error };
}

/**
 * Remove a member from a consultation
 */
export async function removeConsultationMember(
  consultationId: number,
  memberId: number
): Promise<{ success: boolean; error: Error | null }> {
  const { error } = await supabase
    .from('consultation_members')
    .delete()
    .eq('consultation_id', consultationId)
    .eq('family_member_id', memberId);

  return { success: !error, error };
}

// ============ STATISTICS ============

/**
 * Get consultation statistics for dashboard
 */
export async function getConsultationStats(): Promise<{
  total: number;
  upcoming: number;
  completed: number;
  cancelled: number;
  completionRate: number;
  error: Error | null;
}> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return {
      total: 0,
      upcoming: 0,
      completed: 0,
      cancelled: 0,
      completionRate: 0,
      error: new Error('Not authenticated'),
    };
  }

  const { count: total } = await supabase
    .from('consultations')
    .select('*', { count: 'exact', head: true })
    .eq('advisor_id', user.id);

  const { count: upcoming } = await supabase
    .from('consultations')
    .select('*', { count: 'exact', head: true })
    .eq('advisor_id', user.id)
    .in('status', ['scheduled', 'confirmed', 'pending']);

  const { count: completed } = await supabase
    .from('consultations')
    .select('*', { count: 'exact', head: true })
    .eq('advisor_id', user.id)
    .eq('status', 'completed');

  const { count: cancelled } = await supabase
    .from('consultations')
    .select('*', { count: 'exact', head: true })
    .eq('advisor_id', user.id)
    .eq('status', 'cancelled');

  const totalFinished = (completed || 0) + (cancelled || 0);
  const completionRate = totalFinished > 0 ? Math.round(((completed || 0) / totalFinished) * 100) : 0;

  return {
    total: total || 0,
    upcoming: upcoming || 0,
    completed: completed || 0,
    cancelled: cancelled || 0,
    completionRate,
    error: null,
  };
}

// ============ HELPERS ============

export const consultationStatusLabels: Record<string, string> = {
  scheduled: 'Scheduled',
  confirmed: 'Confirmed',
  pending: 'Pending',
  completed: 'Completed',
  cancelled: 'Cancelled',
};

export const paymentStatusLabels: Record<string, string> = {
  paid: 'Paid',
  awaiting: 'Awaiting Payment',
  overdue: 'Overdue',
};

export const consultationTypeLabels: Record<string, string> = {
  video: 'Video Call',
  'in-person': 'In-Person',
  phone: 'Phone Call',
};

export function getStatusColor(status: string): string {
  switch (status) {
    case 'scheduled':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
    case 'confirmed':
      return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
    case 'completed':
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    case 'cancelled':
      return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

export function getPaymentStatusColor(status: string): string {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
    case 'awaiting':
      return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
    case 'overdue':
      return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

/**
 * Format date for display
 */
export function formatConsultationDate(dateString?: string): string {
  if (!dateString) return 'TBD';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

/**
 * Format date for short display
 */
export function formatConsultationDateShort(dateString?: string): string {
  if (!dateString) return 'TBD';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Check if consultation is in the past
 */
export function isConsultationPast(dateString?: string, timeString?: string): boolean {
  if (!dateString) return false;
  
  const consultationDate = new Date(dateString);
  if (timeString) {
    const [hours, minutes] = timeString.split(':').map(Number);
    consultationDate.setHours(hours, minutes);
  }
  
  return consultationDate < new Date();
}

/**
 * Generate a meeting link (mock for now)
 */
export function generateMeetingLink(): string {
  const id = Math.random().toString(36).substring(2, 11);
  return `https://meet.example.com/${id}`;
}
