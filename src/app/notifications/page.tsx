"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  Home, 
  ChevronRight, 
  Bell,
  Mail,
  MessageSquare,
  Calendar,
  DollarSign,
  Users,
  AlertCircle,
  CheckCircle,
  Info,
  Settings,
  Smartphone,
  Monitor,
  ToggleLeft,
  ToggleRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Recent notifications
const initialNotifications = [
  {
    id: 1,
    type: "message" as const,
    title: "New message from Clara Harrington",
    description: "RE: CEO Position Discussion - I agree, but it can't just be about tradition...",
    time: "5 minutes ago",
    read: false,
  },
  {
    id: 2,
    type: "consultation" as const,
    title: "Consultation reminder",
    description: "Constitution Workshop with Roye Family starts in 1 hour",
    time: "1 hour ago",
    read: false,
  },
  {
    id: 3,
    type: "payment" as const,
    title: "Payment received",
    description: "You received $2,500 from Harrington Family for Governance Review Session",
    time: "3 hours ago",
    read: true,
  },
  {
    id: 4,
    type: "system" as const,
    title: "Profile verification approved",
    description: "Your CFA credential has been verified successfully",
    time: "Yesterday",
    read: true,
  },
  {
    id: 5,
    type: "family" as const,
    title: "New family connection request",
    description: "Chen Family would like to connect with you",
    time: "2 days ago",
    read: true,
  },
];

// Notification settings
const notificationSettings = [
  {
    category: "Messages",
    icon: MessageSquare,
    settings: [
      { label: "New messages", email: true, push: true, sms: false },
      { label: "Message replies", email: true, push: true, sms: false },
      { label: "Mentioned in conversation", email: true, push: true, sms: true },
    ],
  },
  {
    category: "Consultations",
    icon: Calendar,
    settings: [
      { label: "Consultation reminders", email: true, push: true, sms: true },
      { label: "Consultation requests", email: true, push: true, sms: false },
      { label: "Consultation changes", email: true, push: true, sms: true },
      { label: "Consultation reviews", email: true, push: false, sms: false },
    ],
  },
  {
    category: "Payments",
    icon: DollarSign,
    settings: [
      { label: "Payment received", email: true, push: true, sms: false },
      { label: "Payment pending", email: true, push: true, sms: false },
      { label: "Payout processed", email: true, push: false, sms: false },
    ],
  },
  {
    category: "Families",
    icon: Users,
    settings: [
      { label: "New connection requests", email: true, push: true, sms: false },
      { label: "Family updates", email: true, push: false, sms: false },
    ],
  },
  {
    category: "System",
    icon: Settings,
    settings: [
      { label: "Security alerts", email: true, push: true, sms: true },
      { label: "Account updates", email: true, push: false, sms: false },
      { label: "Product updates", email: true, push: false, sms: false },
      { label: "Tips and tutorials", email: false, push: false, sms: false },
    ],
  },
];

function getNotificationIcon(type: "message" | "consultation" | "payment" | "system" | "family") {
  const icons = {
    message: MessageSquare,
    consultation: Calendar,
    payment: DollarSign,
    system: Info,
    family: Users,
  };
  return icons[type];
}

function getNotificationColor(type: "message" | "consultation" | "payment" | "system" | "family") {
  const colors = {
    message: "bg-blue-100 text-blue-600",
    consultation: "bg-purple-100 text-purple-600",
    payment: "bg-green-100 text-green-600",
    system: "bg-gray-100 text-gray-600",
    family: "bg-orange-100 text-orange-600",
  };
  return colors[type];
}

function Toggle({ enabled }: { enabled: boolean }) {
  return enabled ? (
    <ToggleRight className="h-6 w-6 text-primary" />
  ) : (
    <ToggleLeft className="h-6 w-6 text-muted-foreground" />
  );
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleMarkRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
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
          <Button variant="outline" onClick={handleMarkAllRead} disabled={unreadCount === 0}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark All as Read
          </Button>
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
                <div className="divide-y divide-border">
                  {notifications.map((notification) => {
                    const Icon = getNotificationIcon(notification.type);
                    const colorClass = getNotificationColor(notification.type);
                    return (
                      <div 
                        key={notification.id} 
                        className={`py-4 first:pt-0 last:pb-0 flex items-start gap-4 ${!notification.read ? "bg-primary/5 -mx-6 px-6" : ""}`}
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
                              <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">
                                {notification.description}
                              </p>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                              <span className="text-xs text-muted-foreground">{notification.time}</span>
                              {!notification.read && (
                                <Button variant="ghost" size="sm" className="h-6 px-2" onClick={() => handleMarkRead(notification.id)}>
                                  <div className="h-2 w-2 rounded-full bg-primary mr-2" />
                                  Mark read
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
                <div className="divide-y divide-border">
                  {notifications.filter(n => !n.read).length === 0 ? (
                    <div className="py-8 text-center text-muted-foreground">
                      No unread notifications
                    </div>
                  ) : (
                    notifications.filter(n => !n.read).map((notification) => {
                      const Icon = getNotificationIcon(notification.type);
                      const colorClass = getNotificationColor(notification.type);
                      return (
                        <div 
                          key={notification.id} 
                          className="py-4 first:pt-0 last:pb-0 flex items-start gap-4"
                        >
                          <div className={`h-10 w-10 rounded-full ${colorClass} flex items-center justify-center shrink-0`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="text-sm font-semibold text-foreground">
                                  {notification.title}
                                </p>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                  {notification.description}
                                </p>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                <span className="text-xs text-muted-foreground">{notification.time}</span>
                                <Button variant="ghost" size="sm" onClick={() => handleMarkRead(notification.id)}>Mark as Read</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Notification Channels</CardTitle>
                <CardDescription>Choose how you want to receive notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
                    <Mail className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">Email</p>
                      <p className="text-xs text-muted-foreground">logan.roy@advisor.com</p>
                    </div>
                    <Toggle enabled={true} />
                  </div>
                  <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
                    <Smartphone className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">Push</p>
                      <p className="text-xs text-muted-foreground">Mobile & Desktop</p>
                    </div>
                    <Toggle enabled={true} />
                  </div>
                  <div className="flex items-center gap-3 p-4 border border-border rounded-lg">
                    <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">SMS</p>
                      <p className="text-xs text-muted-foreground">+1 (555) 123-4567</p>
                    </div>
                    <Toggle enabled={false} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {notificationSettings.map((section) => (
              <Card key={section.category}>
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-2">
                    <section.icon className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-base">{section.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    {section.settings.map((setting, index) => (
                      <div key={index} className="flex items-center justify-between py-2">
                        <span className="text-sm text-foreground">{setting.label}</span>
                        <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground w-12">Email</span>
                            <Toggle enabled={setting.email} />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground w-12">Push</span>
                            <Toggle enabled={setting.push} />
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground w-12">SMS</span>
                            <Toggle enabled={setting.sms} />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            <div className="flex justify-end gap-3">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Preferences</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
