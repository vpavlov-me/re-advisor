// Family Invitations Service - CRUD operations for inviting family members
import { supabase } from './supabaseClient';

// Types
export interface FamilyInvitation {
  id: string;
  family_id: number;
  invited_by: string;
  email: string;
  role: 'consul' | 'council' | 'member';
  invite_code: string;
  status: 'pending' | 'accepted' | 'expired' | 'cancelled';
  message?: string;
  expires_at: string;
  accepted_at?: string;
  accepted_by?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateInvitationInput {
  family_id: number;
  email: string;
  role?: 'consul' | 'council' | 'member';
  message?: string;
}

export interface InvitationWithFamily extends FamilyInvitation {
  families: {
    name: string;
    invite_code: string;
  };
  inviter?: {
    first_name: string;
    last_name: string;
  };
}

// Generate a unique 8-character invite code
function generateInviteCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = '';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// ============ INVITATIONS CRUD ============

/**
 * Get all invitations for a family
 */
export async function getFamilyInvitations(familyId: number): Promise<{
  data: FamilyInvitation[] | null;
  error: Error | null;
}> {
  const { data, error } = await supabase
    .from('family_invitations')
    .select('*')
    .eq('family_id', familyId)
    .order('created_at', { ascending: false });

  return { data, error };
}

/**
 * Get pending invitations count for a family
 */
export async function getPendingInvitationsCount(familyId: number): Promise<number> {
  const { count } = await supabase
    .from('family_invitations')
    .select('*', { count: 'exact', head: true })
    .eq('family_id', familyId)
    .eq('status', 'pending');

  return count || 0;
}

/**
 * Create a new invitation
 */
export async function createInvitation(input: CreateInvitationInput): Promise<{
  data: FamilyInvitation | null;
  error: Error | null;
}> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, error: new Error('Not authenticated') };
  }

  // Check if invitation already exists for this email and family
  const { data: existing } = await supabase
    .from('family_invitations')
    .select('id, status')
    .eq('family_id', input.family_id)
    .eq('email', input.email.toLowerCase())
    .eq('status', 'pending')
    .single();

  if (existing) {
    return { data: null, error: new Error('An invitation already exists for this email') };
  }

  const inviteCode = generateInviteCode();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiry

  const { data, error } = await supabase
    .from('family_invitations')
    .insert({
      family_id: input.family_id,
      invited_by: user.id,
      email: input.email.toLowerCase(),
      role: input.role || 'member',
      invite_code: inviteCode,
      message: input.message,
      expires_at: expiresAt.toISOString(),
    })
    .select()
    .single();

  return { data, error };
}

/**
 * Create multiple invitations at once
 */
export async function createBulkInvitations(
  familyId: number,
  emails: string[],
  role: 'consul' | 'council' | 'member' = 'member',
  message?: string
): Promise<{
  created: FamilyInvitation[];
  errors: { email: string; error: string }[];
}> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { created: [], errors: [{ email: '', error: 'Not authenticated' }] };
  }

  const created: FamilyInvitation[] = [];
  const errors: { email: string; error: string }[] = [];

  for (const email of emails) {
    const result = await createInvitation({
      family_id: familyId,
      email,
      role,
      message,
    });

    if (result.data) {
      created.push(result.data);
    } else if (result.error) {
      errors.push({ email, error: result.error.message });
    }
  }

  return { created, errors };
}

/**
 * Cancel an invitation
 */
export async function cancelInvitation(invitationId: string): Promise<{
  success: boolean;
  error: Error | null;
}> {
  const { error } = await supabase
    .from('family_invitations')
    .update({ 
      status: 'cancelled',
      updated_at: new Date().toISOString()
    })
    .eq('id', invitationId);

  return { success: !error, error };
}

/**
 * Resend an invitation (creates new invite code and extends expiry)
 */
export async function resendInvitation(invitationId: string): Promise<{
  data: FamilyInvitation | null;
  error: Error | null;
}> {
  const newInviteCode = generateInviteCode();
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  const { data, error } = await supabase
    .from('family_invitations')
    .update({
      invite_code: newInviteCode,
      status: 'pending',
      expires_at: expiresAt.toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', invitationId)
    .select()
    .single();

  return { data, error };
}

/**
 * Get invitation by code (for accepting)
 */
export async function getInvitationByCode(code: string): Promise<{
  data: InvitationWithFamily | null;
  error: Error | null;
}> {
  const { data, error } = await supabase
    .from('family_invitations')
    .select(`
      *,
      families (name, invite_code),
      inviter:invited_by (first_name, last_name)
    `)
    .eq('invite_code', code.toUpperCase())
    .single();

  if (error || !data) {
    return { data: null, error: error || new Error('Invitation not found') };
  }

  // Check if expired
  if (new Date(data.expires_at) < new Date()) {
    await supabase
      .from('family_invitations')
      .update({ status: 'expired' })
      .eq('id', data.id);
    return { data: null, error: new Error('This invitation has expired') };
  }

  // Check if already used
  if (data.status !== 'pending') {
    return { data: null, error: new Error(`This invitation has been ${data.status}`) };
  }

  return { data: data as InvitationWithFamily, error: null };
}

/**
 * Accept an invitation
 */
export async function acceptInvitation(invitationId: string): Promise<{
  success: boolean;
  familyId: number | null;
  error: Error | null;
}> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, familyId: null, error: new Error('Not authenticated') };
  }

  // Get the invitation
  const { data: invitation, error: fetchError } = await supabase
    .from('family_invitations')
    .select('family_id, email, role, status')
    .eq('id', invitationId)
    .single();

  if (fetchError || !invitation) {
    return { success: false, familyId: null, error: new Error('Invitation not found') };
  }

  if (invitation.status !== 'pending') {
    return { success: false, familyId: null, error: new Error('This invitation is no longer valid') };
  }

  // Update invitation status
  const { error: updateError } = await supabase
    .from('family_invitations')
    .update({
      status: 'accepted',
      accepted_at: new Date().toISOString(),
      accepted_by: user.id,
      updated_at: new Date().toISOString(),
    })
    .eq('id', invitationId);

  if (updateError) {
    return { success: false, familyId: null, error: updateError };
  }

  // Add user as family member
  const { error: memberError } = await supabase
    .from('family_members')
    .insert({
      family_id: invitation.family_id,
      name: user.email?.split('@')[0] || 'New Member',
      email: user.email,
      role: invitation.role,
    });

  if (memberError) {
    console.error('Error adding family member:', memberError);
  }

  return { success: true, familyId: invitation.family_id, error: null };
}

// ============ FAMILY INVITE LINK ============

/**
 * Get family's invite link
 */
export async function getFamilyInviteLink(familyId: number): Promise<{
  inviteCode: string | null;
  inviteUrl: string | null;
  enabled: boolean;
  error: Error | null;
}> {
  const { data, error } = await supabase
    .from('families')
    .select('invite_code, invite_link_enabled')
    .eq('id', familyId)
    .single();

  if (error || !data) {
    return { inviteCode: null, inviteUrl: null, enabled: false, error };
  }

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  const inviteUrl = data.invite_code ? `${baseUrl}/invite/${data.invite_code}` : null;

  return {
    inviteCode: data.invite_code,
    inviteUrl,
    enabled: data.invite_link_enabled,
    error: null,
  };
}

/**
 * Regenerate family invite code
 */
export async function regenerateFamilyInviteCode(familyId: number): Promise<{
  inviteCode: string | null;
  error: Error | null;
}> {
  const newCode = generateInviteCode();

  const { error } = await supabase
    .from('families')
    .update({ invite_code: newCode })
    .eq('id', familyId);

  if (error) {
    return { inviteCode: null, error };
  }

  return { inviteCode: newCode, error: null };
}

/**
 * Toggle family invite link
 */
export async function toggleFamilyInviteLink(
  familyId: number,
  enabled: boolean
): Promise<{ success: boolean; error: Error | null }> {
  const { error } = await supabase
    .from('families')
    .update({ invite_link_enabled: enabled })
    .eq('id', familyId);

  return { success: !error, error };
}

// ============ QR CODE HELPERS ============

/**
 * Generate QR code data URL for an invite link
 * Uses a simple QR code API - in production you might want to use a library
 */
export function getQRCodeUrl(inviteUrl: string, size: number = 200): string {
  // Using QR Server API (free, no auth required)
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(inviteUrl)}`;
}

// ============ ROLE HELPERS ============

export const invitationRoleLabels: Record<string, string> = {
  'consul': 'Family Consul',
  'council': 'Council Member',
  'member': 'Family Member',
};

export const invitationStatusLabels: Record<string, string> = {
  'pending': 'Pending',
  'accepted': 'Accepted',
  'expired': 'Expired',
  'cancelled': 'Cancelled',
};

export function getStatusColor(status: string): string {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
    case 'accepted':
      return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
    case 'expired':
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    case 'cancelled':
      return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}
