"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/lib/supabaseClient";
import { 
  Home, 
  ChevronRight, 
  Shield,
  Key,
  Smartphone,
  Monitor,
  Globe,
  Users,
  Plus,
  MoreVertical,
  Mail,
  CheckCircle,
  XCircle,
  Trash2,
  Edit,
  Loader2,
  AlertTriangle,
  RefreshCw,
  UserPlus
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Invite form schema
const inviteSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  role: z.string().min(1, "Please select a role")
});

type InviteFormData = z.infer<typeof inviteSchema>;

// Sidebar navigation
const settingsNav = [
  { label: "Account & Security", href: "/settings", icon: Shield, active: false },
  { label: "Team & Permissions", href: "/settings/team", icon: Users, active: true },
  { label: "Notifications", href: "/notifications", icon: Globe, active: false },
  { label: "Payment Methods", href: "/payments", icon: Key, active: false },
  { label: "Subscription", href: "/subscription", icon: Monitor, active: false },
];

// Team member type based on database schema
interface TeamMember {
  id: number;
  advisor_id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar_url: string | null;
  created_at: string;
}

const roles = [
  { value: "admin", label: "Admin", description: "Full access to all settings and data." },
  { value: "senior_advisor", label: "Senior Advisor", description: "Can manage families and knowledge base." },
  { value: "junior_advisor", label: "Junior Advisor", description: "View access to assigned families, can edit drafts." },
  { value: "external_expert", label: "External Expert", description: "Limited access to specific shared resources." },
];

export default function TeamSettingsPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isInviting, setIsInviting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [resendingId, setResendingId] = useState<number | null>(null);

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch
  } = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
      role: "junior_advisor"
    }
  });

  const selectedRole = watch("role");

  // Fetch team on mount
  useEffect(() => {
    const fetchTeam = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('team_members')
          .select('*');
        
        if (error) throw error;
        
        if (data) {
          setTeam(data);
        }
      } catch (error) {
        console.error("Error fetching team:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeam();
  }, []);

  const onInviteSubmit = async (data: InviteFormData) => {
    setIsInviting(true);
    try {
      // Get the current user's ID for advisor_id
      const { data: { user } } = await supabase.auth.getUser();
      
      const newMemberData = {
        advisor_id: user?.id,
        name: data.email.split("@")[0],
        email: data.email,
        role: roles.find(r => r.value === data.role)?.label || "Junior Advisor",
        status: "pending",
        avatar_url: null
      };

      const { data: insertedData, error } = await supabase
        .from('team_members')
        .insert([newMemberData])
        .select()
        .single();

      if (error) throw error;

      if (insertedData) {
        setTeam([...team, insertedData]);
      }
      toast.success(`Invitation sent to ${data.email}`);
      setIsInviteOpen(false);
      reset();
    } catch (error) {
      console.error("Error inviting member:", error);
      toast.error("Failed to invite team member");
    } finally {
      setIsInviting(false);
    }
  };

  const confirmRemove = (member: TeamMember) => {
    if (member.role === "Owner") {
      toast.error("Cannot remove the workspace owner");
      return;
    }
    setSelectedMember(member);
    setIsDeleteOpen(true);
  };

  const handleRemoveMember = async () => {
    if (!selectedMember) return;
    
    setIsDeleting(true);
    try {
      const { error } = await supabase
        .from('team_members')
        .delete()
        .eq('id', selectedMember.id);

      if (error) throw error;

      setTeam(team.filter(m => m.id !== selectedMember.id));
      toast.success(`${selectedMember.name} removed from team`);
    } catch (error) {
      console.error("Error removing member:", error);
      toast.error("Failed to remove team member");
    } finally {
      setIsDeleting(false);
      setIsDeleteOpen(false);
      setSelectedMember(null);
    }
  };

  const handleResendInvite = async (member: TeamMember) => {
    setResendingId(member.id);
    try {
      // Simulate API call for resending invite
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`Invitation resent to ${member.email}`);
    } catch (error) {
      console.error("Error resending invite:", error);
      toast.error("Failed to resend invitation");
    } finally {
      setResendingId(null);
    }
  };

  const handleChangeRole = async (memberId: number, newRole: string) => {
    try {
      const newRoleLabel = roles.find(r => r.value === newRole)?.label;
      
      const { error } = await supabase
        .from('team_members')
        .update({ role: newRoleLabel })
        .eq('id', memberId);
      
      if (error) throw error;
      
      setTeam(team.map(m => 
        m.id === memberId 
          ? { ...m, role: newRoleLabel || m.role }
          : m
      ));
      toast.success("Role updated successfully");
    } catch (error) {
      console.error("Error updating role:", error);
      toast.error("Failed to update role");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Home</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            <span className="text-muted-foreground">Settings</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            <span className="text-foreground font-medium">Team & Permissions</span>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 space-y-2">
            {settingsNav.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={item.active ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Team & Permissions</h1>
              <p className="text-muted-foreground">
                Manage your team members and their access levels.
              </p>
            </div>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>
                    People with access to your advisor workspace.
                  </CardDescription>
                </div>
                <Button onClick={() => setIsInviteOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Invite Member
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Loading team members...</span>
                  </div>
                ) : team.length === 0 ? (
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-lg font-medium mb-2">No team members</h3>
                    <p className="text-muted-foreground mb-4">Invite your first team member to get started</p>
                    <Button onClick={() => setIsInviteOpen(true)}>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Invite Member
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {team.map((member) => (
                      <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <Avatar>
                            <AvatarImage src={member.avatar_url || undefined} />
                            <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-muted-foreground">{member.email}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <Badge variant={member.status === "active" ? "default" : "secondary"}>
                            {member.status === "pending" ? (
                              <span className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                Invited
                              </span>
                            ) : member.status}
                          </Badge>
                          <div className="text-sm text-muted-foreground w-32">
                            {member.role}
                          </div>
                          <div className="flex items-center gap-2">
                            {member.status === "pending" && (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleResendInvite(member)}
                                disabled={resendingId === member.id}
                              >
                                {resendingId === member.id ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <>
                                    <RefreshCw className="h-3 w-3 mr-1" />
                                    Resend
                                  </>
                                )}
                              </Button>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">Change Role</DropdownMenuLabel>
                                {roles.map((role) => (
                                  <DropdownMenuItem 
                                    key={role.value}
                                    onClick={() => handleChangeRole(member.id, role.value)}
                                    disabled={member.role === "Owner"}
                                  >
                                    {role.label}
                                    {member.role === role.label && (
                                      <CheckCircle className="h-4 w-4 ml-auto text-primary" />
                                    )}
                                  </DropdownMenuItem>
                                ))}
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  className="text-red-600"
                                  onClick={() => confirmRemove(member)}
                                  disabled={member.role === "Owner"}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Remove Member
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Roles & Permissions</CardTitle>
                <CardDescription>
                  Define what each role can do in the workspace.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {roles.map((role) => (
                    <div key={role.value} className="flex items-start justify-between p-4 border rounded-lg bg-muted/20">
                      <div>
                        <div className="font-medium">{role.label}</div>
                        <div className="text-sm text-muted-foreground">{role.description}</div>
                      </div>
                      <Button variant="outline" size="sm">View Permissions</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Invite Dialog */}
      <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="h-5 w-5" />
              Invite Team Member
            </DialogTitle>
            <DialogDescription>
              Send an invitation to join your advisor workspace.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onInviteSubmit)}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input 
                  placeholder="colleague@advisor.com" 
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Select 
                  value={selectedRole} 
                  onValueChange={(value) => setValue("role", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        <div>
                          <div className="font-medium">{role.label}</div>
                          <div className="text-xs text-muted-foreground">{role.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.role && (
                  <p className="text-sm text-destructive">{errors.role.message}</p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsInviteOpen(false)} disabled={isInviting}>
                Cancel
              </Button>
              <Button type="submit" disabled={isInviting}>
                {isInviting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Invitation
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Remove Team Member
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to remove <strong>{selectedMember?.name}</strong> from your team? 
              They will lose access to the workspace immediately.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRemoveMember} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Removing...
                </>
              ) : (
                "Remove Member"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}