"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Home, 
  ChevronRight, 
  Shield,
  Key,
  Smartphone,
  Monitor,
  Globe,
  Users,
  Clock,
  LogOut,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Trash2,
  Download,
  Lock,
  Fingerprint,
  History
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

// Login sessions
const loginSessions = [
  {
    id: 1,
    device: "MacBook Pro",
    browser: "Chrome 119",
    location: "New York, NY",
    ip: "192.168.1.xxx",
    lastActive: "Active now",
    current: true,
  },
  {
    id: 2,
    device: "iPhone 15 Pro",
    browser: "Safari Mobile",
    location: "New York, NY",
    ip: "192.168.1.xxx",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    id: 3,
    device: "Windows PC",
    browser: "Firefox 120",
    location: "Boston, MA",
    ip: "10.0.0.xxx",
    lastActive: "3 days ago",
    current: false,
  },
];

// Login history
const loginHistory = [
  { date: "Nov 27, 2025 09:15 AM", device: "MacBook Pro", location: "New York, NY", status: "success" as const },
  { date: "Nov 26, 2025 08:30 AM", device: "iPhone 15 Pro", location: "New York, NY", status: "success" as const },
  { date: "Nov 25, 2025 02:45 PM", device: "MacBook Pro", location: "New York, NY", status: "success" as const },
  { date: "Nov 24, 2025 11:20 AM", device: "Unknown Device", location: "Los Angeles, CA", status: "blocked" as const },
  { date: "Nov 23, 2025 09:00 AM", device: "MacBook Pro", location: "New York, NY", status: "success" as const },
];

// Sidebar navigation
const settingsNav = [
  { label: "Account & Security", href: "/settings", icon: Shield, active: true },
  { label: "Team & Permissions", href: "/settings/team", icon: Users },
  { label: "Notifications", href: "/notifications", icon: Globe },
  { label: "Payment Methods", href: "/payments", icon: Key },
  { label: "Subscription", href: "/subscription", icon: Monitor },
];

export default function SettingsPage() {
  const [passwordState, setPasswordState] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [sessions, setSessions] = useState(loginSessions);

  const handleUpdatePassword = () => {
    if (passwordState.new !== passwordState.confirm) {
      alert("Passwords do not match");
      return;
    }
    // Mock API call
    console.log("Updating password...", passwordState);
    setPasswordState({ current: "", new: "", confirm: "" });
    alert("Password updated successfully");
  };

  const handleSignOutAll = () => {
    setSessions(sessions.filter(s => s.current));
    alert("Signed out of all other devices");
  };

  const handleDeleteAccount = () => {
    setIsDeleteOpen(false);
    alert("Account deletion scheduled. You will receive an email confirmation.");
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
            <span className="text-foreground font-medium">Settings</span>
          </div>
        </div>
      </div>

      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Account & Security</h1>
            <p className="text-muted-foreground mt-1">Manage your account settings and security preferences</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {/* Sidebar */}
          <div>
            <Card>
              <CardContent className="p-2">
                <nav className="space-y-1">
                  {settingsNav.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        item.active 
                          ? "bg-primary/10 text-primary font-medium" 
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="col-span-3 space-y-6">
            {/* Email */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Email Address</CardTitle>
                <CardDescription>Your email is used for login and notifications</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-4">
                  <Input value="logan.roy@advisor.com" className="max-w-md" readOnly />
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Badge>
                  <Button variant="outline">Change Email</Button>
                </div>
              </CardContent>
            </Card>

            {/* Password */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Password</CardTitle>
                <CardDescription>Last changed 30 days ago</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 max-w-md">
                      <Label className="text-sm text-muted-foreground block mb-1.5">Current Password</Label>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••••••" 
                          value={passwordState.current}
                          onChange={(e) => setPasswordState({...passwordState, current: e.target.value})}
                        />
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 max-w-md">
                    <div>
                      <Label className="text-sm text-muted-foreground block mb-1.5">New Password</Label>
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••••••" 
                        value={passwordState.new}
                        onChange={(e) => setPasswordState({...passwordState, new: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground block mb-1.5">Confirm New Password</Label>
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••••••" 
                        value={passwordState.confirm}
                        onChange={(e) => setPasswordState({...passwordState, confirm: e.target.value})}
                      />
                    </div>
                  </div>
                  <Button onClick={handleUpdatePassword} disabled={!passwordState.current || !passwordState.new}>
                    Update Password
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Two-Factor Authentication */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Two-Factor Authentication</CardTitle>
                    <CardDescription>Add an extra layer of security to your account</CardDescription>
                  </div>
                  <Badge variant={is2FAEnabled ? "secondary" : "outline"} className={is2FAEnabled ? "bg-green-100 text-green-700" : ""}>
                    {is2FAEnabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Smartphone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">Authenticator App</p>
                        <p className="text-xs text-muted-foreground">Google Authenticator or similar</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {is2FAEnabled && <Badge variant="secondary" className="bg-green-100 text-green-700">Active</Badge>}
                      <Button 
                        variant={is2FAEnabled ? "outline" : "default"} 
                        size="sm"
                        onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                      >
                        {is2FAEnabled ? "Configure" : "Enable"}
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                        <Fingerprint className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground text-sm">Biometric Login</p>
                        <p className="text-xs text-muted-foreground">Face ID or Touch ID</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Active Sessions */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Active Sessions</CardTitle>
                    <CardDescription>Devices currently logged into your account</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleSignOutAll}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {sessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                          {session.device.includes("iPhone") ? (
                            <Smartphone className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <Monitor className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground text-sm">{session.device}</p>
                            {session.current && (
                              <Badge variant="secondary" className="text-xs">Current</Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {session.browser} · {session.location} · {session.lastActive}
                          </p>
                        </div>
                      </div>
                      {!session.current && (
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <LogOut className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Login History */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-base">Login History</CardTitle>
                    <CardDescription>Recent login attempts to your account</CardDescription>
                  </div>
                  <Button variant="ghost" size="sm">
                    <History className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="divide-y divide-border">
                  {loginHistory.map((entry, index) => (
                    <div key={index} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {entry.status === "success" ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        )}
                        <div>
                          <p className="text-sm text-foreground">{entry.device}</p>
                          <p className="text-xs text-muted-foreground">{entry.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{entry.date}</p>
                        {entry.status === "blocked" && (
                          <Badge variant="destructive" className="text-xs">Blocked</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive/50">
              <CardHeader className="pb-4">
                <CardTitle className="text-base text-destructive">Danger Zone</CardTitle>
                <CardDescription>Irreversible actions for your account</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground text-sm">Delete Account</p>
                    <p className="text-xs text-muted-foreground">
                      Permanently delete your account and all associated data
                    </p>
                  </div>
                  <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                    <DialogTrigger asChild>
                      <Button variant="destructive">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete your account
                          and remove your data from our servers.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Cancel</Button>
                        <Button variant="destructive" onClick={handleDeleteAccount}>Delete Account</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
