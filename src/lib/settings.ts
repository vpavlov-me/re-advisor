/**
 * Settings Management Utilities
 * 
 * Provides functionality for managing user settings including
 * resetting all settings to their default values.
 */

import { supabase } from './supabaseClient';
import type { NotificationPreferences } from './database.types';

/**
 * Default notification preferences
 */
export const DEFAULT_NOTIFICATION_PREFERENCES: Omit<NotificationPreferences, 'id' | 'user_id' | 'created_at' | 'updated_at'> = {
  push_enabled: true,
  push_messages: true,
  push_consultations: true,
  push_payments: true,
  push_updates: true,
  push_alerts: true,
  email_enabled: true,
  email_messages: true,
  email_consultations: true,
  email_payments: true,
  email_weekly_digest: true,
  quiet_hours_enabled: false,
  quiet_hours_start: '22:00',
  quiet_hours_end: '08:00',
  timezone: 'UTC',
};

/**
 * Default availability settings
 */
export const DEFAULT_AVAILABILITY_SETTINGS = {
  timezone: 'UTC',
  buffer_before_minutes: 15,
  buffer_after_minutes: 15,
  min_notice_hours: 24,
  max_advance_days: 60,
};

/**
 * Result type for reset operations
 */
export interface ResetSettingsResult {
  success: boolean;
  error?: string;
  resetItems?: string[];
}

/**
 * Reset notification preferences to defaults
 */
export async function resetNotificationPreferences(userId: string): Promise<ResetSettingsResult> {
  try {
    const { error } = await supabase
      .from('notification_preferences')
      .upsert({
        user_id: userId,
        ...DEFAULT_NOTIFICATION_PREFERENCES,
      }, {
        onConflict: 'user_id',
      });

    if (error) {
      console.error('Failed to reset notification preferences:', error);
      return { success: false, error: 'Failed to reset notification preferences' };
    }

    return { success: true, resetItems: ['notification_preferences'] };
  } catch (error) {
    console.error('Error resetting notification preferences:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Reset availability settings to defaults
 */
export async function resetAvailabilitySettings(userId: string): Promise<ResetSettingsResult> {
  try {
    const { error } = await supabase
      .from('availability_settings')
      .upsert({
        advisor_id: userId,
        ...DEFAULT_AVAILABILITY_SETTINGS,
      }, {
        onConflict: 'advisor_id',
      });

    if (error) {
      console.error('Failed to reset availability settings:', error);
      return { success: false, error: 'Failed to reset availability settings' };
    }

    return { success: true, resetItems: ['availability_settings'] };
  } catch (error) {
    console.error('Error resetting availability settings:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Reset all user settings to their default values
 * 
 * This resets:
 * - Notification preferences (push, email, quiet hours)
 * - Availability settings (timezone, buffers, notice periods)
 */
export async function resetAllSettings(userId: string): Promise<ResetSettingsResult> {
  const results: ResetSettingsResult[] = [];
  const resetItems: string[] = [];

  // Reset notification preferences
  const notificationResult = await resetNotificationPreferences(userId);
  results.push(notificationResult);
  if (notificationResult.success && notificationResult.resetItems) {
    resetItems.push(...notificationResult.resetItems);
  }

  // Reset availability settings
  const availabilityResult = await resetAvailabilitySettings(userId);
  results.push(availabilityResult);
  if (availabilityResult.success && availabilityResult.resetItems) {
    resetItems.push(...availabilityResult.resetItems);
  }

  // Check if any failed
  const failures = results.filter(r => !r.success);
  if (failures.length > 0) {
    const errors = failures.map(f => f.error).filter(Boolean).join('; ');
    return { 
      success: false, 
      error: errors || 'Some settings failed to reset',
      resetItems 
    };
  }

  return { success: true, resetItems };
}
