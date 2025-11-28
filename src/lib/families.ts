// Families Service - CRUD operations for family clients
import { supabase } from './supabaseClient';

// Types
export interface Family {
  id: number;
  advisor_id: string;
  name: string;
  wealth?: string;
  members_count: number;
  role?: 'external-consul' | 'consultant' | 'personal-advisor';
  payment_status: 'paid' | 'pending' | 'no-invoices';
  status: 'active' | 'pending' | 'inactive';
  last_contact?: string;
  industry?: string;
  location?: string;
  email?: string;
  phone?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface FamilyMember {
  id: number;
  family_id: number;
  name: string;
  role?: string;
  email?: string;
  avatar?: string;
  created_at: string;
}

export interface CreateFamilyInput {
  name: string;
  wealth?: string;
  role?: 'external-consul' | 'consultant' | 'personal-advisor';
  industry?: string;
  location?: string;
  email?: string;
  phone?: string;
  description?: string;
}

export interface UpdateFamilyInput extends Partial<CreateFamilyInput> {
  status?: 'active' | 'pending' | 'inactive';
  payment_status?: 'paid' | 'pending' | 'no-invoices';
}

export interface FamilyWithMembers extends Family {
  members: FamilyMember[];
}

// ============ FAMILIES CRUD ============

/**
 * Get all families for the current advisor
 */
export async function getFamilies(options?: {
  status?: 'active' | 'pending' | 'inactive';
  limit?: number;
  offset?: number;
  search?: string;
}): Promise<{ data: Family[] | null; count: number; error: Error | null }> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, count: 0, error: new Error('Not authenticated') };
  }

  let query = supabase
    .from('families')
    .select('*', { count: 'exact' })
    .eq('advisor_id', user.id)
    .order('created_at', { ascending: false });

  if (options?.status) {
    query = query.eq('status', options.status);
  }

  if (options?.search) {
    query = query.or(`name.ilike.%${options.search}%,email.ilike.%${options.search}%`);
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
 * Get a single family by ID with members
 */
export async function getFamily(familyId: number): Promise<{
  data: FamilyWithMembers | null;
  error: Error | null;
}> {
  const { data: family, error: familyError } = await supabase
    .from('families')
    .select('*')
    .eq('id', familyId)
    .single();

  if (familyError || !family) {
    return { data: null, error: familyError };
  }

  const { data: members, error: membersError } = await supabase
    .from('family_members')
    .select('*')
    .eq('family_id', familyId)
    .order('created_at', { ascending: true });

  if (membersError) {
    return { data: null, error: membersError };
  }

  return {
    data: {
      ...family,
      members: members || [],
    },
    error: null,
  };
}

/**
 * Create a new family
 */
export async function createFamily(input: CreateFamilyInput): Promise<{
  data: Family | null;
  error: Error | null;
}> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, error: new Error('Not authenticated') };
  }

  const { data, error } = await supabase
    .from('families')
    .insert({
      advisor_id: user.id,
      name: input.name,
      wealth: input.wealth,
      role: input.role,
      industry: input.industry,
      location: input.location,
      email: input.email,
      phone: input.phone,
      description: input.description,
      members_count: 0,
      status: 'pending',
      payment_status: 'no-invoices',
    })
    .select()
    .single();

  return { data, error };
}

/**
 * Update a family
 */
export async function updateFamily(
  familyId: number,
  input: UpdateFamilyInput
): Promise<{ data: Family | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('families')
    .update({
      ...input,
      updated_at: new Date().toISOString(),
    })
    .eq('id', familyId)
    .select()
    .single();

  return { data, error };
}

/**
 * Delete a family
 */
export async function deleteFamily(familyId: number): Promise<{
  success: boolean;
  error: Error | null;
}> {
  const { error } = await supabase
    .from('families')
    .delete()
    .eq('id', familyId);

  return { success: !error, error };
}

/**
 * Update family's last contact timestamp
 */
export async function updateLastContact(familyId: number): Promise<{
  success: boolean;
  error: Error | null;
}> {
  const { error } = await supabase
    .from('families')
    .update({
      last_contact: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', familyId);

  return { success: !error, error };
}

// ============ FAMILY MEMBERS CRUD ============

/**
 * Get all members of a family
 */
export async function getFamilyMembers(familyId: number): Promise<{
  data: FamilyMember[] | null;
  error: Error | null;
}> {
  const { data, error } = await supabase
    .from('family_members')
    .select('*')
    .eq('family_id', familyId)
    .order('created_at', { ascending: true });

  return { data, error };
}

/**
 * Add a member to a family
 */
export async function addFamilyMember(
  familyId: number,
  member: {
    name: string;
    role?: string;
    email?: string;
    avatar?: string;
  }
): Promise<{ data: FamilyMember | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('family_members')
    .insert({
      family_id: familyId,
      name: member.name,
      role: member.role,
      email: member.email,
      avatar: member.avatar,
    })
    .select()
    .single();

  if (!error) {
    // Update members count
    await updateMembersCount(familyId);
  }

  return { data, error };
}

/**
 * Update a family member
 */
export async function updateFamilyMember(
  memberId: number,
  input: {
    name?: string;
    role?: string;
    email?: string;
    avatar?: string;
  }
): Promise<{ data: FamilyMember | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('family_members')
    .update(input)
    .eq('id', memberId)
    .select()
    .single();

  return { data, error };
}

/**
 * Remove a member from a family
 */
export async function removeFamilyMember(
  memberId: number,
  familyId: number
): Promise<{ success: boolean; error: Error | null }> {
  const { error } = await supabase
    .from('family_members')
    .delete()
    .eq('id', memberId);

  if (!error) {
    // Update members count
    await updateMembersCount(familyId);
  }

  return { success: !error, error };
}

/**
 * Update the members count for a family
 */
async function updateMembersCount(familyId: number): Promise<void> {
  const { count } = await supabase
    .from('family_members')
    .select('*', { count: 'exact', head: true })
    .eq('family_id', familyId);

  await supabase
    .from('families')
    .update({ members_count: count || 0 })
    .eq('id', familyId);
}

// ============ STATISTICS ============

/**
 * Get family statistics for dashboard
 */
export async function getFamilyStats(): Promise<{
  total: number;
  active: number;
  pending: number;
  totalMembers: number;
  error: Error | null;
}> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { total: 0, active: 0, pending: 0, totalMembers: 0, error: new Error('Not authenticated') };
  }

  const { count: total } = await supabase
    .from('families')
    .select('*', { count: 'exact', head: true })
    .eq('advisor_id', user.id);

  const { count: active } = await supabase
    .from('families')
    .select('*', { count: 'exact', head: true })
    .eq('advisor_id', user.id)
    .eq('status', 'active');

  const { count: pending } = await supabase
    .from('families')
    .select('*', { count: 'exact', head: true })
    .eq('advisor_id', user.id)
    .eq('status', 'pending');

  const { data: families } = await supabase
    .from('families')
    .select('members_count')
    .eq('advisor_id', user.id);

  const totalMembers = families?.reduce((sum, f) => sum + (f.members_count || 0), 0) || 0;

  return {
    total: total || 0,
    active: active || 0,
    pending: pending || 0,
    totalMembers,
    error: null,
  };
}

// ============ ROLE HELPERS ============

export const familyRoleLabels: Record<string, string> = {
  'external-consul': 'External Consultant',
  'consultant': 'Consultant',
  'personal-advisor': 'Personal Advisor',
};

export const familyStatusLabels: Record<string, string> = {
  'active': 'Active',
  'pending': 'Pending',
  'inactive': 'Inactive',
};

export const paymentStatusLabels: Record<string, string> = {
  'paid': 'Paid',
  'pending': 'Payment Pending',
  'no-invoices': 'No Invoices',
};

export function getRoleColor(role?: string): string {
  switch (role) {
    case 'personal-advisor':
      return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300';
    case 'consultant':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
    case 'external-consul':
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
    case 'inactive':
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

export function getPaymentStatusColor(status: string): string {
  switch (status) {
    case 'paid':
      return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
    case 'pending':
      return 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300';
    case 'no-invoices':
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}
