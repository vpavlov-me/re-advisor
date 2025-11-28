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
  Plus,
  MoreVertical,
  Mail,
  CheckCircle,
  XCircle,
  Trash2,
  Edit
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

// Sidebar navigation
const settingsNav = [
  { label: "Account & Security", href: "/settings", icon: Shield, active: false },
  { label: "Team & Permissions", href: "/settings/team", icon: Users, active: true },
  { label: "Notifications", href: "/notifications", icon: Globe, active: false },
  { label: "Payment Methods", href: "/payments", icon: Key, active: false },
  { label: "Subscription", href: "/subscription", icon: Monitor, active: false },
];

// Mock Team Data
const initialTeam = [
  {
    id: 1,
    name: "Victor Pavlov",
    email: "victor@advisor.com",
    role: "Owner",
    status: "active",
    lastActive: "Now",
    avatar: "/avatars/01.png"
  },
  {
    id: 2,
    name: "Sarah Chen",
    email: "sarah@advisor.com",
    role: "Senior Advisor",
    status: "active",
    lastActive: "2 hours ago",
    avatar: "/avatars/02.png"
  },
  {
    id: 3,
    name: "Michael Ross",
    email: "mike@advisor.com",
    role: "Junior Advisor",
    status: "invited",
    lastActive: "-",
    avatar: ""
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma.legal@firm.com",
    role: "External Expert",
    status: "active",
    lastActive: "1 day ago",
    avatar: "/avatars/04.png"
  }
];

const roles = [
  { value: "admin", label: "Admin", description: "Full access to all settings and data." },
  { value: "senior_advisor", label: "Senior Advisor", description: "Can manage families and knowledge base." },
  { value: "junior_advisor", label: "Junior Advisor", description: "View access to assigned families, can edit drafts." },
  { value: "external_expert", label: "External Expert", description: "Limited access to specific shared resources." },
];

export default function TeamSettingsPage() {
  const [team, setTeam] = useState(initialTeam);
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("junior_advisor");

  const handleInvite = () => {
    const newMember = {
      id: team.length + 1,
      name: inviteEmail.split("@")[0], // Placeholder name
      email: inviteEmail,
      role: roles.find(r => r.value === inviteRole)?.label || "Junior Advisor",
      status: "invited",
      lastActive: "-",
      avatar: ""
    };
    setTeam([...team, newMember]);
    setIsInviteOpen(false);
    setInviteEmail("");
  };

  const removeMember = (id: number) => {
    setTeam(team.filter(m => m.id !== id));
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
                <div className="space-y-4">
                  {team.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge variant={member.status === "active" ? "default" : "secondary"}>
                          {member.status}
                        </Badge>
                        <div className="text-sm text-muted-foreground w-32">
                          {member.role}
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Change Role
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => removeMember(member.id)}
                              disabled={member.role === "Owner"}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove Member
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
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
            <DialogTitle>Invite Team Member</DialogTitle>
            <DialogDescription>
              Send an invitation to join your advisor workspace.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Email Address</Label>
              <Input 
                placeholder="colleague@advisor.com" 
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteOpen(false)}>Cancel</Button>
            <Button onClick={handleInvite}>Send Invitation</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}