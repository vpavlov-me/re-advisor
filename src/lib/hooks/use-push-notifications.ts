"use client";

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/components/providers/auth-provider';
import {
  isPushSupported,
  isPushSubscribed,
  getNotificationPermission,
  initializePushNotifications,
  enablePushNotifications,
  disablePushNotifications,
  getNotificationPreferences,
  updateNotificationPreferences,
  type NotificationPreferences,
} from '@/lib/push-notifications';

export interface UsePushNotificationsReturn {
  isSupported: boolean;
  isSubscribed: boolean;
  permission: NotificationPermission | 'unsupported';
  preferences: Partial<NotificationPreferences> | null;
  loading: boolean;
  error: string | null;
  enable: () => Promise<boolean>;
  disable: () => Promise<boolean>;
  updatePreferences: (prefs: Partial<NotificationPreferences>) => Promise<boolean>;
  sendTestNotification: () => void;
}

export function usePushNotifications(): UsePushNotificationsReturn {
  const { user } = useAuth();
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission | 'unsupported'>('default');
  const [preferences, setPreferences] = useState<Partial<NotificationPreferences> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize on mount
  useEffect(() => {
    async function init() {
      const supported = isPushSupported();
      setIsSupported(supported);
      setPermission(getNotificationPermission());

      if (supported && user) {
        // Initialize service worker
        await initializePushNotifications(user.id);

        // Check subscription status
        const subscribed = await isPushSubscribed();
        setIsSubscribed(subscribed);

        // Load preferences
        const { data } = await getNotificationPreferences(user.id);
        if (data) {
          setPreferences(data);
        }
      }

      setLoading(false);
    }

    init();
  }, [user]);

  // Enable push notifications
  const enable = useCallback(async (): Promise<boolean> => {
    if (!user) {
      setError('User not authenticated');
      return false;
    }

    setLoading(true);
    setError(null);

    const result = await enablePushNotifications(user.id);
    
    if (result.success) {
      setIsSubscribed(true);
      setPermission('granted');
      setPreferences(prev => ({ ...prev, push_enabled: true }));
    } else {
      setError(result.error || 'Failed to enable notifications');
    }

    setLoading(false);
    return result.success;
  }, [user]);

  // Disable push notifications
  const disable = useCallback(async (): Promise<boolean> => {
    if (!user) {
      setError('User not authenticated');
      return false;
    }

    setLoading(true);
    setError(null);

    const result = await disablePushNotifications(user.id);
    
    if (result.success) {
      setIsSubscribed(false);
      setPreferences(prev => ({ ...prev, push_enabled: false }));
    } else {
      setError(result.error || 'Failed to disable notifications');
    }

    setLoading(false);
    return result.success;
  }, [user]);

  // Update preferences
  const updatePrefs = useCallback(async (newPrefs: Partial<NotificationPreferences>): Promise<boolean> => {
    if (!user) {
      setError('User not authenticated');
      return false;
    }

    setLoading(true);
    setError(null);

    const { success, error: updateError } = await updateNotificationPreferences(user.id, newPrefs);
    
    if (success) {
      setPreferences(prev => ({ ...prev, ...newPrefs }));
    } else {
      setError(updateError?.message || 'Failed to update preferences');
    }

    setLoading(false);
    return success;
  }, [user]);

  // Send test notification
  const sendTestNotification = useCallback(() => {
    if (!isSupported || !navigator.serviceWorker.controller) {
      console.warn('Cannot send test notification: SW not ready');
      return;
    }

    navigator.serviceWorker.controller.postMessage({
      type: 'TEST_NOTIFICATION'
    });
  }, [isSupported]);

  return {
    isSupported,
    isSubscribed,
    permission,
    preferences,
    loading,
    error,
    enable,
    disable,
    updatePreferences: updatePrefs,
    sendTestNotification,
  };
}
