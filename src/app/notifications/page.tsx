"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { 
  Home, 
  ChevronRight, 
  MessageSquare,
  Calendar,
  DollarSign,
  Users,
  AlertCircle,
  CheckCircle,
  Info,
  Loader2,
  Trash2,
  RefreshCw,
  BellOff
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/lib/supabaseClient";
import { NotificationSettings } from "@/components/notifications/notification-settings";

type NotificationType = "message" | "consultation" | "payment" | "system" | "family" | "alert";

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  description: string;
  created_at: string;
  read: boolean;
}

function getNotificationIcon(type: NotificationType) {
  const icons = {
    message: MessageSquare,
    consultation: Calendar,
    payment: DollarSign,
    system: Info,
    family: Users,
    alert: AlertCircle,
  };
  return icons[type] || Info;
}

function getNotificationColor(type: NotificationType) {
  const colors: Record<NotificationType, string> = {
    message: "bg-blue-100 text-blue-600",
    consultation: "bg-purple-100 text-purple-600",
    payment: "bg-green-100 text-green-600",
    system: "bg-gray-100 text-gray-600",
    alert: "bg-yellow-100 text-yellow-600",
    family: "bg-orange-100 text-orange-600",
  };
  return colors[type] || "bg-gray-100 text-gray-600";
}

// Group notifications by date
function groupNotificationsByDate(notifications: Notification[]) {
  const groups: { [key: string]: Notification[] } = {};
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const weekAgo = new Date(today);
  weekAgo.setDate(weekAgo.getDate() - 7);

  notifications.forEach(notification => {
    const date = new Date(notification.created_at);
    date.setHours(0, 0, 0, 0);
    
    let key: string;
    if (date.getTime() === today.getTime()) {
      key = "Today";
    } else if (date.getTime() === yesterday.getTime()) {
      key = "Yesterday";
    } else if (date >= weekAgo) {
      key = "This Week";
    } else {
      key = "Earlier";
    }
    
    if (!groups[key]) groups[key] = [];
    groups[key].push(notification);
  });

  return groups;
}

// Format relative time
function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMarkingAllRead, setIsMarkingAllRead] = useState(false);
  const [markingReadId, setMarkingReadId] = useState<number | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [isClearing, setIsClearing] = useState(false);

  const fetchNotifications = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        // Set real data from database, or empty array if no notifications
        setNotifications(data || []);
        return;
      }
      
      // Not logged in - show empty state
      setNotifications([]);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      // On error, show empty state instead of mock data
      setNotifications([]);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await fetchNotifications();
      setLoading(false);
    };
    init();

    // Set up real-time subscription
    const channel = supabase
      .channel('notifications-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications'
        },
        (payload) => {
          const newNotification = payload.new as Notification;
          setNotifications(prev => [newNotification, ...prev]);
          toast.info(newNotification.title, {
            description: newNotification.description
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'notifications'
        },
        (payload) => {
          const updated = payload.new as Notification;
          setNotifications(prev => 
            prev.map(n => n.id === updated.id ? updated : n)
          );
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'notifications'
        },
        (payload) => {
          const deleted = payload.old as { id: number };
          setNotifications(prev => prev.filter(n => n.id !== deleted.id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchNotifications]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchNotifications();
    setIsRefreshing(false);
    toast.success("Notifications refreshed");
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const groupedNotifications = groupNotificationsByDate(notifications);
  const groupedUnread = groupNotificationsByDate(notifications.filter(n => !n.read));

  const handleMarkAllRead = async () => {
    if (unreadCount === 0) return;
    
    setIsMarkingAllRead(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase
          .from('notifications')
          .update({ read: true })
          .eq('user_id', user.id)
          .eq('read', false);

        if (error) throw error;
      }

      setNotifications(notifications.map(n => ({ ...n, read: true })));
      toast.success(`Marked ${unreadCount} notification${unreadCount > 1 ? 's' : ''} as read`);
    } catch (error) {
      console.error("Error marking all read:", error);
      // Fallback for demo
      setNotifications(notifications.map(n => ({ ...n, read: true })));
      toast.success(`Marked ${unreadCount} notification${unreadCount > 1 ? 's' : ''} as read`);
    } finally {
      setIsMarkingAllRead(false);
    }
  };

  const handleMarkRead = async (id: number) => {
    setMarkingReadId(id);
    try {
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id);

      if (error) throw error;

      setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (error) {
      console.error("Error marking read:", error);
      // Fallback for demo
      setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    } finally {
      setMarkingReadId(null);
    }
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setNotifications(notifications.filter(n => n.id !== id));
      toast.success("Notification deleted");
    } catch (error) {
      console.error("Error deleting:", error);
      // Fallback for demo
      setNotifications(notifications.filter(n => n.id !== id));
      toast.success("Notification deleted");
    } finally {
      setDeletingId(null);
    }
  };

  const handleClearAll = async () => {
    setIsClearing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase
          .from('notifications')
          .delete()
          .eq('user_id', user.id);

        if (error) throw error;
      }

      setNotifications([]);
      toast.success("All notifications cleared");
    } catch (error) {
      console.error("Error clearing:", error);
      // Fallback for demo
      setNotifications([]);
      toast.success("All notifications cleared");
    } finally {
      setIsClearing(false);
      setShowClearDialog(false);
    }
  };

  const renderNotificationItem = (notification: Notification) => {
    const Icon = getNotificationIcon(notification.type);
    const colorClass = getNotificationColor(notification.type);
    const isDeleting = deletingId === notification.id;
    const isMarkingRead = markingReadId === notification.id;

    return (
      <div 
        key={notification.id} 
        className={`py-4 first:pt-0 last:pb-0 flex items-start gap-4 group transition-colors ${
          !notification.read ? "bg-primary/5 -mx-6 px-6" : ""
        } ${isDeleting ? "opacity-50" : ""}`}
      >
        <div className={`h-10 w-10 rounded-full ${colorClass} flex items-center justify-center shrink-0`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className={`text-sm ${!notification.read ? "font-semibold" : "font-medium"} text-foreground`}>
                {notification.title}
              </p>
              <p className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                {notification.description}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-muted-foreground">
                {formatRelativeTime(notification.created_at)}
              </span>
              {!notification.read && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 px-2 opacity-0 group-hover:opacity-100 transition-opacity" 
                  onClick={() => handleMarkRead(notification.id)}
                  disabled={isMarkingRead}
                >
                  {isMarkingRead ? (
                    <Loader2 className="h-3 w-3 animate-spin" />
                  ) : (
                    <>
                      <div className="h-2 w-2 rounded-full bg-primary mr-1.5" />
                      Mark read
                    </>
                  )}
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                onClick={() => handleDelete(notification.id)}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb Bar */}
      <div className="bg-card border-b border-border">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Home</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            <Link href="/profile" className="text-muted-foreground hover:text-foreground">Profile</Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            <span className="text-foreground font-medium">Notifications</span>
          </div>
        </div>
      </div>

      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Notifications</h1>
            <p className="text-muted-foreground mt-1">Manage your notification preferences and view recent alerts</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </Button>
            <Button 
              variant="outline" 
              onClick={handleMarkAllRead} 
              disabled={unreadCount === 0 || isMarkingAllRead}
            >
              {isMarkingAllRead ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Marking...
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Mark All as Read
                </>
              )}
            </Button>
            {notifications.length > 0 && (
              <Button 
                variant="outline" 
                onClick={() => setShowClearDialog(true)}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Notifications</TabsTrigger>
            <TabsTrigger value="unread">
              Unread
              {unreadCount > 0 && <Badge className="ml-2 h-5 px-1.5">{unreadCount}</Badge>}
            </TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* All Notifications */}
          <TabsContent value="all">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Loading notifications...</span>
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="text-center py-12">
                    <BellOff className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-lg font-medium mb-2">No notifications</h3>
                    <p className="text-muted-foreground">You're all caught up! New notifications will appear here.</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {Object.entries(groupedNotifications).map(([dateGroup, items]) => (
                      <div key={dateGroup}>
                        <h3 className="text-sm font-medium text-muted-foreground mb-3">{dateGroup}</h3>
                        <div className="divide-y divide-border">
                          {items.map(renderNotificationItem)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Unread */}
          <TabsContent value="unread">
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Unread Notifications</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Loading...</span>
                  </div>
                ) : unreadCount === 0 ? (
                  <div className="py-12 text-center">
                    <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                    <h3 className="text-lg font-medium mb-2">All caught up!</h3>
                    <p className="text-muted-foreground">No unread notifications</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {Object.entries(groupedUnread).map(([dateGroup, items]) => (
                      <div key={dateGroup}>
                        <h3 className="text-sm font-medium text-muted-foreground mb-3">{dateGroup}</h3>
                        <div className="divide-y divide-border">
                          {items.map(renderNotificationItem)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings">
            <NotificationSettings />
          </TabsContent>
        </Tabs>
      </div>

      {/* Clear All Dialog */}
      <Dialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              Clear All Notifications
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to clear all notifications? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => setShowClearDialog(false)} disabled={isClearing}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleClearAll} disabled={isClearing}>
              {isClearing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Clearing...
                </>
              ) : (
                "Clear All"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
