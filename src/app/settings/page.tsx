"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { 
  Home, 
  ChevronRight, 
  Shield,
  Key,
  Smartphone,
  Monitor,
  Users,
  LogOut,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Trash2,
  Fingerprint,
  History,
  Loader2,
  Tablet
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
import { supabase } from "@/lib/supabaseClient";
import {
  getUserSessions,
  upsertCurrentSession,
  revokeSession,
  revokeAllOtherSessions,
  parseUserAgent,
  formatLastActive,
  type UserSession,
} from "@/lib/sessions";

// Password change schema
const passwordSchema = z.object({
  current: z.string().min(1, "Current password is required"),
  new: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
  confirm: z.string().min(1, "Please confirm your password")
}).refine((data) => data.new === data.confirm, {
  message: "Passwords do not match",
  path: ["confirm"]
});

type PasswordFormData = z.infer<typeof passwordSchema>;

// Sidebar navigation - Account settings only
const settingsNav = [
  { label: "Account & Security", href: "/settings", icon: Shield },
  { label: "Team & Permissions", href: "/settings/team", icon: Users },
  { label: "Login History", href: "/settings/history", icon: History },
];

export default function SettingsPage() {
  const pathname = "/settings"; // Current page
  const [userEmail, setUserEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(true);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [sessions, setSessions] = useState<UserSession[]>([]);
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingSessions, setIsLoadingSessions] = useState(true);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling2FA, setIsToggling2FA] = useState(false);
  const [revokingSessionId, setRevokingSessionId] = useState<number | null>(null);

  // React Hook Form for password
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
    watch: watchPassword
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema)
  });

  const newPassword = watchPassword("new");

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    if (!password) return { score: 0, label: "" };
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    
    if (score <= 2) return { score: 1, label: "Weak" };
    if (score <= 4) return { score: 2, label: "Medium" };
    return { score: 3, label: "Strong" };
  };

  const passwordStrength = getPasswordStrength(newPassword || "");

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user && user.email) {
          setUserEmail(user.email);
          
          // Register/update current session
          if (typeof window !== 'undefined') {
            const deviceInfo = parseUserAgent(navigator.userAgent);
            await upsertCurrentSession({
              ...deviceInfo,
              location: 'Unknown', // Would need IP geolocation service
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        toast.error("Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };
    
    const loadSessions = async () => {
      setIsLoadingSessions(true);
      try {
        const { data, error } = await getUserSessions();
        if (error) throw error;
        setSessions(data || []);
      } catch (error) {
        console.error("Error loading sessions:", error);
      } finally {
        setIsLoadingSessions(false);
      }
    };
    
    getUser();
    loadSessions();
  }, []);

  const onPasswordSubmit = async (data: PasswordFormData) => {
    setIsUpdatingPassword(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.new
      });

      if (error) throw error;

      resetPassword();
      toast.success("Password updated successfully");
    } catch (error: any) {
      console.error("Error updating password:", error);
      toast.error(error.message || "Failed to update password");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleSignOutAll = async () => {
    setIsSigningOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Signed out from all devices");
      window.location.href = '/auth/login';
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out");
      setIsSigningOut(false);
    }
  };

  const handleRevokeSession = async (sessionId: number) => {
    setRevokingSessionId(sessionId);
    try {
      const { success, error } = await revokeSession(sessionId);
      if (error) throw error;
      setSessions(sessions.filter(s => s.id !== sessionId));
      toast.success("Session revoked successfully");
    } catch (error) {
      console.error("Error revoking session:", error);
      toast.error("Failed to revoke session");
    } finally {
      setRevokingSessionId(null);
    }
  };

  const handleToggle2FA = async () => {
    setIsToggling2FA(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setIs2FAEnabled(!is2FAEnabled);
      toast.success(is2FAEnabled ? "2FA disabled" : "2FA enabled successfully");
    } catch (error) {
      console.error("Error toggling 2FA:", error);
      toast.error("Failed to update 2FA settings");
    } finally {
      setIsToggling2FA(false);
    }
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Account deletion scheduled. You will receive an email confirmation.");
      setIsDeleteOpen(false);
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error("Failed to schedule account deletion");
    } finally {
      setIsDeleting(false);
    }
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
            <span className="text-foreground font-medium">Account Settings</span>
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
                        pathname === item.href 
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
                  <Input value={userEmail} className="max-w-md" readOnly />
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
                <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1 max-w-md">
                      <Label className="text-sm text-muted-foreground block mb-1.5">Current Password</Label>
                      <div className="relative">
                        <Input 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••••••" 
                          {...registerPassword("current")}
                        />
                        <Button 
                          type="button"
                          variant="ghost" 
                          size="icon" 
                          className="absolute right-0 top-0 h-full"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      {passwordErrors.current && (
                        <p className="text-sm text-destructive mt-1">{passwordErrors.current.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 max-w-md">
                    <div>
                      <Label className="text-sm text-muted-foreground block mb-1.5">New Password</Label>
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••••••" 
                        {...registerPassword("new")}
                      />
                      {passwordErrors.new && (
                        <p className="text-sm text-destructive mt-1">{passwordErrors.new.message}</p>
                      )}
                      {newPassword && (
                        <div className="mt-2">
                          <div className="flex gap-1">
                            {[1, 2, 3].map((level) => (
                              <div
                                key={level}
                                className={`h-1 flex-1 rounded-full transition-colors ${
                                  passwordStrength.score >= level
                                    ? level === 1
                                      ? "bg-red-500"
                                      : level === 2
                                      ? "bg-yellow-500"
                                      : "bg-green-500"
                                    : "bg-muted"
                                }`}
                              />
                            ))}
                          </div>
                          <p className={`text-xs mt-1 ${
                            passwordStrength.score === 1 ? "text-red-500" :
                            passwordStrength.score === 2 ? "text-yellow-500" : "text-green-500"
                          }`}>
                            {passwordStrength.label}
                          </p>
                        </div>
                      )}
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground block mb-1.5">Confirm New Password</Label>
                      <Input 
                        type={showPassword ? "text" : "password"} 
                        placeholder="••••••••••••" 
                        {...registerPassword("confirm")}
                      />
                      {passwordErrors.confirm && (
                        <p className="text-sm text-destructive mt-1">{passwordErrors.confirm.message}</p>
                      )}
                    </div>
                  </div>
                  <Button type="submit" disabled={isUpdatingPassword}>
                    {isUpdatingPassword ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Updating...
                      </>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                </form>
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
                  <Badge variant={is2FAEnabled ? "success" : "outline"}>
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
                      {is2FAEnabled && <Badge variant="success">Active</Badge>}
                      <Button 
                        variant={is2FAEnabled ? "outline" : "default"} 
                        size="sm"
                        onClick={handleToggle2FA}
                        disabled={isToggling2FA}
                      >
                        {isToggling2FA ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          is2FAEnabled ? "Configure" : "Enable"
                        )}
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
                  <Button variant="outline" size="sm" onClick={handleSignOutAll} disabled={isSigningOut}>
                    {isSigningOut ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <LogOut className="h-4 w-4 mr-2" />
                    )}
                    Sign Out All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {isLoadingSessions ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : sessions.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Monitor className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No active sessions</p>
                    </div>
                  ) : sessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
                          {session.device_type === 'mobile' ? (
                            <Smartphone className="h-5 w-5 text-muted-foreground" />
                          ) : session.device_type === 'tablet' ? (
                            <Tablet className="h-5 w-5 text-muted-foreground" />
                          ) : (
                            <Monitor className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-foreground text-sm">{session.device_name || 'Unknown Device'}</p>
                            {session.is_current && (
                              <Badge variant="secondary" className="text-xs">Current</Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {session.browser || 'Unknown Browser'} · {session.location || 'Unknown Location'} · {formatLastActive(session.last_active_at)}
                          </p>
                        </div>
                      </div>
                      {!session.is_current && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleRevokeSession(session.id)}
                          disabled={revokingSessionId === session.id}
                        >
                          {revokingSessionId === session.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <LogOut className="h-4 w-4" />
                          )}
                        </Button>
                      )}
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
                        <DialogTitle className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-destructive" />
                          Are you absolutely sure?
                        </DialogTitle>
                        <DialogDescription>
                          This action cannot be undone. This will permanently delete your account
                          and remove your data from our servers.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDeleteOpen(false)} disabled={isDeleting}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDeleteAccount} disabled={isDeleting}>
                          {isDeleting ? (
                            <>
                              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              Deleting...
                            </>
                          ) : (
                            "Delete Account"
                          )}
                        </Button>
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
