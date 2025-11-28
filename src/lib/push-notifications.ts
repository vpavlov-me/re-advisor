// Push Notifications Service
import { supabase } from './supabaseClient';

// VAPID public key (you need to generate this for production)
// In production, this should come from environment variables
const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '';

export interface PushSubscription {
  id: number;
  user_id: string;
  endpoint: string;
  p256dh_key: string;
  auth_key: string;
  user_agent: string | null;
  created_at: string;
  updated_at: string;
}

export interface NotificationPreferences {
  id: number;
  user_id: string;
  push_enabled: boolean;
  push_messages: boolean;
  push_consultations: boolean;
  push_payments: boolean;
  push_updates: boolean;
  push_alerts: boolean;
  email_enabled: boolean;
  email_messages: boolean;
  email_consultations: boolean;
  email_payments: boolean;
  email_weekly_digest: boolean;
  quiet_hours_enabled: boolean;
  quiet_hours_start: string;
  quiet_hours_end: string;
  timezone: string;
  created_at: string;
  updated_at: string;
}

/**
 * Check if push notifications are supported
 */
export function isPushSupported(): boolean {
  return typeof window !== 'undefined' && 
    'serviceWorker' in navigator && 
    'PushManager' in window &&
    'Notification' in window;
}

/**
 * Check current notification permission
 */
export function getNotificationPermission(): NotificationPermission | 'unsupported' {
  if (!isPushSupported()) return 'unsupported';
  return Notification.permission;
}

/**
 * Request notification permission
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!isPushSupported()) {
    throw new Error('Push notifications are not supported');
  }
  return await Notification.requestPermission();
}

/**
 * Convert base64 VAPID key to Uint8Array
 */
function urlBase64ToUint8Array(base64String: string): ArrayBuffer {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray.buffer as ArrayBuffer;
}

/**
 * Subscribe to push notifications
 */
export async function subscribeToPush(userId: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!isPushSupported()) {
      return { success: false, error: 'Push notifications are not supported in this browser' };
    }

    // Request permission if not granted
    const permission = await requestNotificationPermission();
    if (permission !== 'granted') {
      return { success: false, error: 'Notification permission denied' };
    }

    // Get service worker registration
    const registration = await navigator.serviceWorker.ready;

    // Check for existing subscription
    let subscription = await registration.pushManager.getSubscription();

    // If no subscription, create one
    if (!subscription) {
      if (!VAPID_PUBLIC_KEY) {
        console.warn('VAPID_PUBLIC_KEY not configured. Push notifications disabled.');
        return { success: false, error: 'Push notifications not configured' };
      }

      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
    }

    // Extract keys from subscription
    const subscriptionJson = subscription.toJSON();
    const keys = subscriptionJson.keys;

    if (!keys?.p256dh || !keys?.auth) {
      return { success: false, error: 'Failed to get subscription keys' };
    }

    // Save subscription to database
    const { error } = await supabase
      .from('push_subscriptions')
      .upsert({
        user_id: userId,
        endpoint: subscription.endpoint,
        p256dh_key: keys.p256dh,
        auth_key: keys.auth,
        user_agent: navigator.userAgent,
      }, {
        onConflict: 'endpoint',
      });

    if (error) {
      console.error('Failed to save push subscription:', error);
      return { success: false, error: 'Failed to save subscription' };
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to subscribe to push:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Unsubscribe from push notifications
 */
export async function unsubscribeFromPush(userId: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (!isPushSupported()) {
      return { success: true }; // Nothing to unsubscribe
    }

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      // Unsubscribe from browser
      await subscription.unsubscribe();

      // Delete from database
      await supabase
        .from('push_subscriptions')
        .delete()
        .eq('user_id', userId)
        .eq('endpoint', subscription.endpoint);
    }

    return { success: true };
  } catch (error) {
    console.error('Failed to unsubscribe from push:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * Check if user is subscribed to push
 */
export async function isPushSubscribed(): Promise<boolean> {
  if (!isPushSupported()) return false;

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    return subscription !== null;
  } catch {
    return false;
  }
}

/**
 * Get notification preferences
 */
export async function getNotificationPreferences(userId: string): Promise<{
  data: NotificationPreferences | null;
  error: Error | null;
}> {
  const { data, error } = await supabase
    .from('notification_preferences')
    .select('*')
    .eq('user_id', userId)
    .single();

  return { data, error };
}

/**
 * Update notification preferences
 */
export async function updateNotificationPreferences(
  userId: string,
  preferences: Partial<NotificationPreferences>
): Promise<{ success: boolean; error: Error | null }> {
  const { error } = await supabase
    .from('notification_preferences')
    .upsert({
      user_id: userId,
      ...preferences,
    }, {
      onConflict: 'user_id',
    });

  return { success: !error, error };
}

/**
 * Send a local notification (for testing or when SW not available)
 */
export function sendLocalNotification(title: string, options?: NotificationOptions): void {
  if (!isPushSupported() || Notification.permission !== 'granted') {
    console.warn('Cannot send notification: permission not granted');
    return;
  }

  new Notification(title, {
    icon: '/favicon.png',
    badge: '/favicon.png',
    ...options,
  });
}

/**
 * Register service worker and set up push
 */
export async function initializePushNotifications(userId?: string): Promise<void> {
  if (!isPushSupported()) {
    console.log('Push notifications not supported');
    return;
  }

  try {
    // Register service worker
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    console.log('ServiceWorker registered:', registration.scope);

    // Wait for service worker to be ready
    await navigator.serviceWorker.ready;

    // If user is logged in and permission granted, subscribe
    if (userId && Notification.permission === 'granted') {
      await subscribeToPush(userId);
    }
  } catch (error) {
    console.error('ServiceWorker registration failed:', error);
  }
}

/**
 * Request permission and subscribe (one-click action)
 */
export async function enablePushNotifications(userId: string): Promise<{ success: boolean; error?: string }> {
  if (!isPushSupported()) {
    return { success: false, error: 'Push notifications are not supported' };
  }

  const permission = await requestNotificationPermission();
  
  if (permission === 'denied') {
    return { success: false, error: 'Notification permission was denied. Please enable it in browser settings.' };
  }

  if (permission === 'granted') {
    // Update preferences
    await updateNotificationPreferences(userId, { push_enabled: true });
    
    // Subscribe to push
    return await subscribeToPush(userId);
  }

  return { success: false, error: 'Notification permission not granted' };
}

/**
 * Disable push notifications
 */
export async function disablePushNotifications(userId: string): Promise<{ success: boolean; error?: string }> {
  // Update preferences
  await updateNotificationPreferences(userId, { push_enabled: false });
  
  // Unsubscribe from push
  return await unsubscribeFromPush(userId);
}
