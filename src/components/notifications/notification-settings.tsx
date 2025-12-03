"use client";

import { useState, useEffect } from "react";
import { 
  BellOff, 
  Mail, 
  Smartphone,
  Moon,
  Clock,
  Loader2,
  AlertTriangle
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { useAuth } from "@/components/providers/auth-provider";
import { usePushNotifications } from "@/lib/hooks/use-push-notifications";
import {
  getNotificationPreferences,
  updateNotificationPreferences,
  type NotificationPreferences,
} from "@/lib/push-notifications";

const timezones = [
  { value: 'UTC', label: 'UTC' },
  { value: 'America/New_York', label: 'Eastern Time (ET)' },
  { value: 'America/Chicago', label: 'Central Time (CT)' },
  { value: 'America/Denver', label: 'Mountain Time (MT)' },
  { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
  { value: 'Europe/London', label: 'London (GMT/BST)' },
  { value: 'Europe/Paris', label: 'Paris (CET/CEST)' },
  { value: 'Europe/Moscow', label: 'Moscow (MSK)' },
  { value: 'Asia/Dubai', label: 'Dubai (GST)' },
  { value: 'Asia/Singapore', label: 'Singapore (SGT)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
  { value: 'Australia/Sydney', label: 'Sydney (AEST/AEDT)' },
];

const timeOptions = Array.from({ length: 24 }, (_, i) => {
  const hour = i.toString().padStart(2, '0');
  return { value: `${hour}:00`, label: `${hour}:00` };
});

export function NotificationSettings() {
  const { user } = useAuth();
  const { 
    isSupported: pushSupported, 
    isSubscribed: pushSubscribed, 
    permission: pushPermission,
    loading: pushLoading,
    enable: enablePush,
    disable: disablePush,
  } = usePushNotifications();
  
  const [prefsLoading, setPrefsLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preferences, setPreferences] = useState<Partial<NotificationPreferences>>({
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
  });

  // Load preferences from database
  useEffect(() => {
    async function loadPreferences() {
      if (!user) return;

      setPrefsLoading(true);
      
      const { data } = await getNotificationPreferences(user.id);
      if (data) {
        setPreferences(data);
      }

      setPrefsLoading(false);
    }

    loadPreferences();
  }, [user]);

  // Handle push toggle using the shared hook
  const handlePushToggle = async (enabled: boolean) => {
    if (!user) return;

    setSaving(true);
    
    if (enabled) {
      const success = await enablePush();
      if (success) {
        setPreferences(prev => ({ ...prev, push_enabled: true }));
        toast.success('Push notifications enabled!');
      } else {
        toast.error('Failed to enable push notifications');
      }
    } else {
      const success = await disablePush();
      if (success) {
        setPreferences(prev => ({ ...prev, push_enabled: false }));
        toast.success('Push notifications disabled');
      } else {
        toast.error('Failed to disable push notifications');
      }
    }

    setSaving(false);
  };

  // Handle preference change
  const handlePreferenceChange = async (key: keyof NotificationPreferences, value: boolean | string) => {
    if (!user) return;

    const newPreferences = { ...preferences, [key]: value };
    setPreferences(newPreferences);

    setSaving(true);
    const { success, error } = await updateNotificationPreferences(user.id, { [key]: value });
    setSaving(false);

    if (!success) {
      toast.error('Failed to save preferences');
      // Revert on error
      setPreferences(preferences);
    }
  };

  if (pushLoading || prefsLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-48">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Push Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Smartphone className="h-5 w-5" />
            Push Notifications
          </CardTitle>
          <CardDescription>
            Receive instant notifications on this device
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!pushSupported ? (
            <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 p-3 rounded-lg">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm">Push notifications are not supported in this browser</span>
            </div>
          ) : pushPermission === 'denied' ? (
            <div className="flex items-center gap-2 text-destructive bg-destructive/10 p-3 rounded-lg">
              <BellOff className="h-4 w-4" />
              <span className="text-sm">
                Notifications are blocked. Please enable them in your browser settings.
              </span>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-enabled" className="text-base">Enable Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    {pushSubscribed ? 'You are subscribed to push notifications' : 'Get notified instantly'}
                  </p>
                </div>
                <Switch
                  id="push-enabled"
                  checked={preferences.push_enabled && pushSubscribed}
                  onCheckedChange={handlePushToggle}
                  disabled={saving}
                />
              </div>

              {preferences.push_enabled && pushSubscribed && (
                <>
                  <Separator />
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Notify me about:</Label>
                    
                    <div className="space-y-2">
                      {[
                        { key: 'push_messages', label: 'New messages', icon: '💬' },
                        { key: 'push_consultations', label: 'Consultation reminders', icon: '📅' },
                        { key: 'push_payments', label: 'Payment updates', icon: '💰' },
                        { key: 'push_updates', label: 'System updates', icon: '🔔' },
                        { key: 'push_alerts', label: 'Important alerts', icon: '⚠️' },
                      ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between py-1">
                          <span className="text-sm flex items-center gap-2">
                            <span>{item.icon}</span>
                            {item.label}
                          </span>
                          <Switch
                            checked={preferences[item.key as keyof NotificationPreferences] as boolean}
                            onCheckedChange={(checked) => handlePreferenceChange(item.key as keyof NotificationPreferences, checked)}
                            disabled={saving}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email Notifications
          </CardTitle>
          <CardDescription>
            Manage email notification preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-enabled" className="text-base">Enable Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive important updates via email
              </p>
            </div>
            <Switch
              id="email-enabled"
              checked={preferences.email_enabled}
              onCheckedChange={(checked) => handlePreferenceChange('email_enabled', checked)}
              disabled={saving}
            />
          </div>

          {preferences.email_enabled && (
            <>
              <Separator />
              <div className="space-y-3">
                <Label className="text-sm font-medium">Email me about:</Label>
                
                <div className="space-y-2">
                  {[
                    { key: 'email_messages', label: 'New messages (when offline)', icon: '💬' },
                    { key: 'email_consultations', label: 'Consultation confirmations', icon: '📅' },
                    { key: 'email_payments', label: 'Payment receipts', icon: '💰' },
                    { key: 'email_weekly_digest', label: 'Weekly activity digest', icon: '📊' },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between py-1">
                      <span className="text-sm flex items-center gap-2">
                        <span>{item.icon}</span>
                        {item.label}
                      </span>
                      <Switch
                        checked={preferences[item.key as keyof NotificationPreferences] as boolean}
                        onCheckedChange={(checked) => handlePreferenceChange(item.key as keyof NotificationPreferences, checked)}
                        disabled={saving}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Quiet Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Moon className="h-5 w-5" />
            Quiet Hours
          </CardTitle>
          <CardDescription>
            Pause notifications during specific hours
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="quiet-hours" className="text-base">Enable Quiet Hours</Label>
              <p className="text-sm text-muted-foreground">
                Don&apos;t disturb me during these hours
              </p>
            </div>
            <Switch
              id="quiet-hours"
              checked={preferences.quiet_hours_enabled}
              onCheckedChange={(checked) => handlePreferenceChange('quiet_hours_enabled', checked)}
              disabled={saving}
            />
          </div>

          {preferences.quiet_hours_enabled && (
            <>
              <Separator />
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label className="text-sm">From</Label>
                  <Select
                    value={preferences.quiet_hours_start}
                    onValueChange={(value) => handlePreferenceChange('quiet_hours_start', value)}
                    disabled={saving}
                  >
                    <SelectTrigger>
                      <Clock className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">To</Label>
                  <Select
                    value={preferences.quiet_hours_end}
                    onValueChange={(value) => handlePreferenceChange('quiet_hours_end', value)}
                    disabled={saving}
                  >
                    <SelectTrigger>
                      <Clock className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm">Timezone</Label>
                  <Select
                    value={preferences.timezone}
                    onValueChange={(value) => handlePreferenceChange('timezone', value)}
                    disabled={saving}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Status indicator */}
      {saving && (
        <div className="fixed bottom-4 right-4 flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span className="text-sm">Saving...</span>
        </div>
      )}
    </div>
  );
}
