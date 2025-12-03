"use client";

import { useState, useEffect } from "react";
import { Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePushNotifications } from "@/lib/hooks/use-push-notifications";
import { cn } from "@/lib/utils";

export function PushNotificationPrompt() {
  const { isSupported, isSubscribed, permission, enable, loading } = usePushNotifications();
  const [dismissed, setDismissed] = useState(false);
  const [visible, setVisible] = useState(false);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  // Check if user has dismissed the prompt before (on mount only)
  useEffect(() => {
    const wasDismissed = localStorage.getItem('push-prompt-dismissed');
    if (wasDismissed) {
      setDismissed(true);
    }
    setInitialCheckDone(true);
  }, []);

  // Handle visibility based on subscription status
  useEffect(() => {
    if (!initialCheckDone) return;
    
    // Hide immediately if subscribed or permission granted/denied
    if (isSubscribed || permission === 'granted' || permission === 'denied') {
      setVisible(false);
      return;
    }

    // Don't show if already dismissed
    if (dismissed) return;

    // Show prompt after a delay if:
    // 1. Push is supported
    // 2. User is not subscribed
    // 3. Permission is 'default' (not yet asked)
    // 4. User hasn't dismissed the prompt
    const timer = setTimeout(() => {
      if (isSupported && !isSubscribed && permission === 'default' && !dismissed) {
        setVisible(true);
      }
    }, 3000); // Show after 3 seconds

    return () => clearTimeout(timer);
  }, [isSupported, isSubscribed, permission, dismissed, initialCheckDone]);

  const handleEnable = async () => {
    await enable();
    // Visibility will be automatically updated by the useEffect when isSubscribed/permission changes
  };

  const handleDismiss = () => {
    setVisible(false);
    setDismissed(true);
    localStorage.setItem('push-prompt-dismissed', 'true');
  };

  const handleRemindLater = () => {
    setVisible(false);
    // Will show again on next page load
  };

  if (!visible) return null;

  return (
    <div className={cn(
      "fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50",
      "bg-card border border-border rounded-lg shadow-lg p-4",
      "animate-in slide-in-from-bottom-5 duration-300"
    )}>
      <button
        onClick={handleDismiss}
        className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground transition-colors"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex gap-3">
        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Bell className="h-5 w-5 text-primary" />
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm">Enable Notifications</h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            Get instant alerts for messages, consultations, and payments.
          </p>

          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              onClick={handleEnable}
              disabled={loading}
              className="h-8 text-xs"
            >
              {loading ? 'Enabling...' : 'Enable'}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={handleRemindLater}
              className="h-8 text-xs"
            >
              Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
