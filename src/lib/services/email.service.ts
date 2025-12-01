/**
 * Email Service for Client-Side Usage
 * 
 * For GitHub Pages deployment, we can't use server-side email sending.
 * This service provides:
 * 1. Mock mode for development/demo
 * 2. Integration with Supabase Edge Functions for production
 * 
 * To send real emails, you need to deploy the email Edge Function to Supabase.
 */

import { supabase, isSupabaseConfigured } from '../supabaseClient';

// ============================================
// CONFIGURATION
// ============================================

export const EMAIL_MODE = process.env.NEXT_PUBLIC_EMAIL_MODE || 'mock';
export const IS_MOCK_MODE = EMAIL_MODE === 'mock';

const APP_NAME = 'RE:Advisor';

// ============================================
// TYPES
// ============================================

export type EmailType =
  | 'welcome'
  | 'consultation-reminder'
  | 'payment-confirmation'
  | 'payment-failed'
  | 'new-message'
  | 'password-reset';

export interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

// ============================================
// MOCK EMAIL LOGGING
// ============================================

function logMockEmail(type: EmailType, data: Record<string, unknown>) {
  console.log(`[MOCK EMAIL] Type: ${type}`);
  console.log('[MOCK EMAIL] Data:', JSON.stringify(data, null, 2));
  
  // In development, show a browser notification
  if (typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
    new Notification(`Mock Email: ${type}`, {
      body: `To: ${data.email || data.to}`,
      icon: '/favicon.png',
    });
  }
}

// ============================================
// EMAIL SENDING
// ============================================

/**
 * Send email via Supabase Edge Function or mock
 */
async function sendEmail(
  type: EmailType,
  data: Record<string, unknown>
): Promise<EmailResult> {
  if (IS_MOCK_MODE) {
    logMockEmail(type, data);
    return {
      success: true,
      messageId: `mock_${Date.now()}`,
    };
  }

  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured, using mock email');
    logMockEmail(type, data);
    return {
      success: true,
      messageId: `mock_${Date.now()}`,
    };
  }

  try {
    // Call Supabase Edge Function
    const { data: result, error } = await supabase.functions.invoke('send-email', {
      body: { type, data },
    });

    if (error) throw error;

    return {
      success: true,
      messageId: result?.messageId,
    };
  } catch (err) {
    console.error('Email sending error:', err);
    
    // Fallback to mock in case of error
    logMockEmail(type, data);
    return {
      success: true,
      messageId: `fallback_${Date.now()}`,
      error: 'Used mock fallback due to Edge Function error',
    };
  }
}

// ============================================
// EMAIL TEMPLATES
// ============================================

/**
 * Send welcome email to new user
 */
export async function sendWelcomeEmail(
  email: string,
  name: string
): Promise<EmailResult> {
  return sendEmail('welcome', { email, name });
}

/**
 * Send consultation reminder
 */
export async function sendConsultationReminder(params: {
  email: string;
  name: string;
  consultationTitle: string;
  consultationDate: string;
  consultationTime: string;
  familyName: string;
}): Promise<EmailResult> {
  return sendEmail('consultation-reminder', params);
}

/**
 * Send payment confirmation
 */
export async function sendPaymentConfirmation(params: {
  email: string;
  name: string;
  planName: string;
  amount: number;
  currency?: string;
  invoiceUrl?: string;
}): Promise<EmailResult> {
  return sendEmail('payment-confirmation', params);
}

/**
 * Send payment failed notification
 */
export async function sendPaymentFailed(params: {
  email: string;
  name: string;
  planName: string;
  retryUrl: string;
}): Promise<EmailResult> {
  return sendEmail('payment-failed', params);
}

/**
 * Send new message notification
 */
export async function sendNewMessageNotification(params: {
  email: string;
  recipientName: string;
  senderName: string;
  messagePreview: string;
  conversationUrl: string;
}): Promise<EmailResult> {
  return sendEmail('new-message', params);
}

/**
 * Send password reset email
 * Note: Supabase Auth handles this automatically, but you can customize it
 */
export async function sendPasswordResetEmail(params: {
  email: string;
  resetUrl: string;
}): Promise<EmailResult> {
  return sendEmail('password-reset', params);
}

// ============================================
// NOTIFICATION PREFERENCES
// ============================================

/**
 * Check if user has email notifications enabled
 */
export async function hasEmailNotificationsEnabled(
  notificationType: 'messages' | 'consultations' | 'payments' | 'weekly_digest'
): Promise<boolean> {
  if (!isSupabaseConfigured()) return false;

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data } = await supabase
      .from('notification_preferences')
      .select(`email_enabled, email_${notificationType}`)
      .eq('user_id', user.id)
      .single();

    if (!data) return true; // Default to enabled

    const fieldName = `email_${notificationType}` as keyof typeof data;
    return data.email_enabled && data[fieldName] !== false;
  } catch {
    return true; // Default to enabled on error
  }
}

/**
 * Update email notification preferences
 */
export async function updateEmailPreferences(preferences: {
  email_enabled?: boolean;
  email_messages?: boolean;
  email_consultations?: boolean;
  email_payments?: boolean;
  email_weekly_digest?: boolean;
}): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: 'Supabase not configured' };
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return { success: false, error: 'Not authenticated' };
    }

    const { error } = await supabase
      .from('notification_preferences')
      .upsert({
        user_id: user.id,
        ...preferences,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });

    if (error) throw error;

    return { success: true };
  } catch (err) {
    console.error('Update email preferences error:', err);
    return { success: false, error: 'Failed to update preferences' };
  }
}
