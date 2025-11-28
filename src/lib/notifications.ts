// Notifications Service
import { supabase } from './supabaseClient';
import type { Notification, NotificationType } from './database.types';

export interface CreateNotificationInput {
  userId: string;
  type: NotificationType;
  title: string;
  description?: string;
}

/**
 * Get all notifications for a user
 */
export async function getNotifications(userId: string, options?: {
  limit?: number;
  unreadOnly?: boolean;
}): Promise<{ data: Notification[] | null; error: Error | null }> {
  let query = supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (options?.unreadOnly) {
    query = query.eq('read', false);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  return { data, error };
}

/**
 * Get unread notifications count
 */
export async function getUnreadCount(userId: string): Promise<{ 
  count: number; 
  error: Error | null 
}> {
  const { count, error } = await supabase
    .from('notifications')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', userId)
    .eq('read', false);

  return { count: count || 0, error };
}

/**
 * Mark a notification as read
 */
export async function markAsRead(notificationId: number): Promise<{ 
  success: boolean; 
  error: Error | null 
}> {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('id', notificationId);

  return { success: !error, error };
}

/**
 * Mark all notifications as read
 */
export async function markAllAsRead(userId: string): Promise<{ 
  success: boolean; 
  error: Error | null 
}> {
  const { error } = await supabase
    .from('notifications')
    .update({ read: true })
    .eq('user_id', userId)
    .eq('read', false);

  return { success: !error, error };
}

/**
 * Delete a notification
 */
export async function deleteNotification(notificationId: number): Promise<{ 
  success: boolean; 
  error: Error | null 
}> {
  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', notificationId);

  return { success: !error, error };
}

/**
 * Create a new notification
 */
export async function createNotification(input: CreateNotificationInput): Promise<{
  data: Notification | null;
  error: Error | null;
}> {
  const { data, error } = await supabase
    .from('notifications')
    .insert({
      user_id: input.userId,
      type: input.type,
      title: input.title,
      description: input.description || null,
      read: false,
    })
    .select()
    .single();

  return { data, error };
}

/**
 * Subscribe to real-time notifications
 */
export function subscribeToNotifications(
  userId: string,
  onNewNotification: (notification: Notification) => void
) {
  const channel = supabase
    .channel(`notifications:${userId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      },
      (payload) => {
        onNewNotification(payload.new as Notification);
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}

// Notification type configuration for UI
export const notificationTypeConfig: Record<NotificationType, {
  icon: string;
  color: string;
  bgColor: string;
}> = {
  message: {
    icon: 'MessageSquare',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
  },
  alert: {
    icon: 'AlertTriangle',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
  },
  update: {
    icon: 'Bell',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
  },
  consultation: {
    icon: 'Calendar',
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
  },
  payment: {
    icon: 'DollarSign',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-100 dark:bg-emerald-900/30',
  },
};

// Helper to format notification time
export function formatNotificationTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric' 
  });
}
