// Credentials Service - CRUD operations for advisor credentials
import { supabase } from './supabaseClient';

// Types
export interface Credential {
  id: number;
  advisor_id: string;
  name: string;
  issuer?: string;
  year?: string;
  status: 'pending' | 'verified' | 'rejected' | 'expired';
  credential_id?: string;
  expiry_date?: string;
  document_url?: string;
  created_at: string;
}

export interface CreateCredentialInput {
  name: string;
  issuer?: string;
  year?: string;
  credential_id?: string;
  expiry_date?: string;
  document_url?: string;
}

export interface UpdateCredentialInput extends Partial<CreateCredentialInput> {
  status?: 'pending' | 'verified' | 'rejected' | 'expired';
}

// ============ CREDENTIALS CRUD ============

/**
 * Get all credentials for the current advisor
 */
export async function getCredentials(options?: {
  status?: 'pending' | 'verified' | 'rejected' | 'expired';
}): Promise<{ data: Credential[] | null; error: Error | null }> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, error: new Error('Not authenticated') };
  }

  let query = supabase
    .from('credentials')
    .select('*')
    .eq('advisor_id', user.id)
    .order('created_at', { ascending: false });

  if (options?.status) {
    query = query.eq('status', options.status);
  }

  const { data, error } = await query;
  return { data, error };
}

/**
 * Get a single credential by ID
 */
export async function getCredential(credentialId: number): Promise<{
  data: Credential | null;
  error: Error | null;
}> {
  const { data, error } = await supabase
    .from('credentials')
    .select('*')
    .eq('id', credentialId)
    .single();

  return { data, error };
}

/**
 * Create a new credential
 */
export async function createCredential(input: CreateCredentialInput): Promise<{
  data: Credential | null;
  error: Error | null;
}> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, error: new Error('Not authenticated') };
  }

  const { data, error } = await supabase
    .from('credentials')
    .insert({
      advisor_id: user.id,
      name: input.name,
      issuer: input.issuer,
      year: input.year,
      credential_id: input.credential_id,
      expiry_date: input.expiry_date,
      document_url: input.document_url,
      status: 'pending',
    })
    .select()
    .single();

  return { data, error };
}

/**
 * Update a credential
 */
export async function updateCredential(
  credentialId: number,
  input: UpdateCredentialInput
): Promise<{ data: Credential | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('credentials')
    .update(input)
    .eq('id', credentialId)
    .select()
    .single();

  return { data, error };
}

/**
 * Delete a credential
 */
export async function deleteCredential(credentialId: number): Promise<{
  success: boolean;
  error: Error | null;
}> {
  const { error } = await supabase
    .from('credentials')
    .delete()
    .eq('id', credentialId);

  return { success: !error, error };
}

// ============ HELPERS ============

export const credentialStatusLabels: Record<string, string> = {
  pending: 'Pending Verification',
  verified: 'Verified',
  rejected: 'Rejected',
  expired: 'Expired',
};

export function getStatusColor(status: string): string {
  switch (status) {
    case 'verified':
      return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300';
    case 'pending':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
    case 'rejected':
      return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
    case 'expired':
      return 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

/**
 * Check if credential is expired
 */
export function isCredentialExpired(expiryDate?: string): boolean {
  if (!expiryDate) return false;
  return new Date(expiryDate) < new Date();
}

/**
 * Get credentials summary for profile
 */
export async function getCredentialsSummary(): Promise<{
  total: number;
  verified: number;
  pending: number;
  error: Error | null;
}> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { total: 0, verified: 0, pending: 0, error: new Error('Not authenticated') };
  }

  const { count: total } = await supabase
    .from('credentials')
    .select('*', { count: 'exact', head: true })
    .eq('advisor_id', user.id);

  const { count: verified } = await supabase
    .from('credentials')
    .select('*', { count: 'exact', head: true })
    .eq('advisor_id', user.id)
    .eq('status', 'verified');

  const { count: pending } = await supabase
    .from('credentials')
    .select('*', { count: 'exact', head: true })
    .eq('advisor_id', user.id)
    .eq('status', 'pending');

  return {
    total: total || 0,
    verified: verified || 0,
    pending: pending || 0,
    error: null,
  };
}
