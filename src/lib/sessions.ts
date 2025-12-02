// Sessions Service - Manage user sessions and login history
import { supabase } from './supabaseClient';

// Types
export interface UserSession {
  id: number;
  user_id: string;
  device_name?: string;
  device_type?: string;
  browser?: string;
  os?: string;
  ip_address?: string;
  location?: string;
  is_current: boolean;
  last_active_at: string;
  created_at: string;
}

export interface LoginHistoryEntry {
  id: number;
  user_id: string;
  device_name?: string;
  device_type?: string;
  browser?: string;
  os?: string;
  ip_address?: string;
  location?: string;
  status: 'success' | 'failed' | 'blocked';
  failure_reason?: string;
  created_at: string;
}

// ============ USER SESSIONS ============

/**
 * Get all active sessions for current user
 */
export async function getUserSessions(): Promise<{
  data: UserSession[] | null;
  error: Error | null;
}> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, error: new Error('Not authenticated') };
  }

  const { data, error } = await supabase
    .from('user_sessions')
    .select('*')
    .eq('user_id', user.id)
    .order('last_active_at', { ascending: false });

  return { data, error };
}

/**
 * Create or update current session
 */
export async function upsertCurrentSession(sessionInfo: {
  device_name?: string;
  device_type?: string;
  browser?: string;
  os?: string;
  ip_address?: string;
  location?: string;
}): Promise<{ data: UserSession | null; error: Error | null }> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, error: new Error('Not authenticated') };
  }

  // First, unset is_current for all user's sessions
  await supabase
    .from('user_sessions')
    .update({ is_current: false })
    .eq('user_id', user.id);

  // Check if session with same device exists
  const { data: existingSession } = await supabase
    .from('user_sessions')
    .select('id')
    .eq('user_id', user.id)
    .eq('device_name', sessionInfo.device_name || 'Unknown Device')
    .eq('browser', sessionInfo.browser || 'Unknown Browser')
    .single();

  if (existingSession) {
    // Update existing session
    const { data, error } = await supabase
      .from('user_sessions')
      .update({
        ...sessionInfo,
        is_current: true,
        last_active_at: new Date().toISOString(),
      })
      .eq('id', existingSession.id)
      .select()
      .single();

    return { data, error };
  } else {
    // Create new session
    const { data, error } = await supabase
      .from('user_sessions')
      .insert({
        user_id: user.id,
        ...sessionInfo,
        is_current: true,
        last_active_at: new Date().toISOString(),
      })
      .select()
      .single();

    return { data, error };
  }
}

/**
 * Update session last active time
 */
export async function updateSessionActivity(sessionId: number): Promise<{
  success: boolean;
  error: Error | null;
}> {
  const { error } = await supabase
    .from('user_sessions')
    .update({ last_active_at: new Date().toISOString() })
    .eq('id', sessionId);

  return { success: !error, error };
}

/**
 * Revoke a specific session
 */
export async function revokeSession(sessionId: number): Promise<{
  success: boolean;
  error: Error | null;
}> {
  const { error } = await supabase
    .from('user_sessions')
    .delete()
    .eq('id', sessionId);

  return { success: !error, error };
}

/**
 * Revoke all sessions except current
 */
export async function revokeAllOtherSessions(): Promise<{
  success: boolean;
  error: Error | null;
}> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { success: false, error: new Error('Not authenticated') };
  }

  const { error } = await supabase
    .from('user_sessions')
    .delete()
    .eq('user_id', user.id)
    .eq('is_current', false);

  return { success: !error, error };
}

// ============ LOGIN HISTORY ============

/**
 * Get login history for current user
 */
export async function getLoginHistory(options?: {
  limit?: number;
}): Promise<{ data: LoginHistoryEntry[] | null; error: Error | null }> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, error: new Error('Not authenticated') };
  }

  let query = supabase
    .from('login_history')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  return { data, error };
}

/**
 * Record a login attempt
 */
export async function recordLoginAttempt(info: {
  device_name?: string;
  device_type?: string;
  browser?: string;
  os?: string;
  ip_address?: string;
  location?: string;
  status: 'success' | 'failed' | 'blocked';
  failure_reason?: string;
}): Promise<{ data: LoginHistoryEntry | null; error: Error | null }> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, error: new Error('Not authenticated') };
  }

  const { data, error } = await supabase
    .from('login_history')
    .insert({
      user_id: user.id,
      ...info,
    })
    .select()
    .single();

  return { data, error };
}

// ============ HELPERS ============

/**
 * Get device info from user agent
 */
export function parseUserAgent(userAgent: string): {
  device_name: string;
  device_type: string;
  browser: string;
  os: string;
} {
  let device_type = 'desktop';
  let device_name = 'Unknown Device';
  let browser = 'Unknown Browser';
  let os = 'Unknown OS';

  // Detect OS
  if (userAgent.includes('Windows')) {
    os = 'Windows';
    device_name = 'Windows PC';
  } else if (userAgent.includes('Mac OS X') || userAgent.includes('Macintosh')) {
    os = 'macOS';
    device_name = 'Mac';
    if (userAgent.includes('MacBook')) device_name = 'MacBook';
  } else if (userAgent.includes('iPhone')) {
    os = 'iOS';
    device_name = 'iPhone';
    device_type = 'mobile';
  } else if (userAgent.includes('iPad')) {
    os = 'iPadOS';
    device_name = 'iPad';
    device_type = 'tablet';
  } else if (userAgent.includes('Android')) {
    os = 'Android';
    device_name = 'Android Device';
    device_type = userAgent.includes('Mobile') ? 'mobile' : 'tablet';
  } else if (userAgent.includes('Linux')) {
    os = 'Linux';
    device_name = 'Linux PC';
  }

  // Detect Browser
  if (userAgent.includes('Chrome') && !userAgent.includes('Edg')) {
    const match = userAgent.match(/Chrome\/(\d+)/);
    browser = match ? `Chrome ${match[1]}` : 'Chrome';
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    const match = userAgent.match(/Version\/(\d+)/);
    browser = match ? `Safari ${match[1]}` : 'Safari';
  } else if (userAgent.includes('Firefox')) {
    const match = userAgent.match(/Firefox\/(\d+)/);
    browser = match ? `Firefox ${match[1]}` : 'Firefox';
  } else if (userAgent.includes('Edg')) {
    const match = userAgent.match(/Edg\/(\d+)/);
    browser = match ? `Edge ${match[1]}` : 'Edge';
  }

  return { device_name, device_type, browser, os };
}

/**
 * Format last active time
 */
export function formatLastActive(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 2) return 'Active now';
  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  });
}

/**
 * Format login history date
 */
export function formatLoginDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
