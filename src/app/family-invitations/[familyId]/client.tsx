"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft,
  Plus,
  Copy,
  Check,
  Mail,
  Trash2,
  Loader2,
  UserPlus,
  Clock,
  XCircle
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/lib/hooks";
import { 
  getFamilyInvitations, 
  createInvitation, 
  cancelInvitation,
  resendInvitation,
  type FamilyInvitation 
} from "@/lib/invitations";

export default function InvitationsClient() {
  const params = useParams();
  const familyId = params.familyId as string;
  const _router = useRouter();
  const { toast } = useToast();

  const [invitations, setInvitations] = useState<FamilyInvitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form state
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"member" | "council" | "consul">("member");

  useEffect(() => {
    fetchInvitations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [familyId]);

  const fetchInvitations = async () => {
    setLoading(true);
    const { data, error } = await getFamilyInvitations(parseInt(familyId));
    if (error) {
      toast({
        title: "Error",
        description: "Failed to load invitations",
        variant: "destructive",
      });
    } else {
      setInvitations(data || []);
    }
    setLoading(false);
  };

  const handleCreate = async () => {
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    setCreating(true);
    const { data, error } = await createInvitation({
      family_id: parseInt(familyId),
      email: email.trim(),
      role,
    });
    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else if (data) {
      setInvitations([data, ...invitations]);
      setEmail("");
      setRole("member");
      setDialogOpen(false);
      toast({
        title: "Invitation Sent",
        description: `Invitation sent to ${email}`,
      });
    }
    setCreating(false);
  };

  const handleDelete = async (id: string) => {
    const { success, error } = await cancelInvitation(id);
    if (success) {
      setInvitations(invitations.filter(inv => inv.id !== id));
      toast({
        title: "Invitation Cancelled",
        description: "The invitation has been cancelled",
      });
    } else {
      toast({
        title: "Error",
        description: error?.message || "Failed to cancel invitation",
        variant: "destructive",
      });
    }
  };

  const handleResend = async (id: string) => {
    const { data, error } = await resendInvitation(id);
    if (data) {
      toast({
        title: "Invitation Resent",
        description: "The invitation email has been resent",
      });
    } else {
      toast({
        title: "Error",
        description: error?.message || "Failed to resend invitation",
        variant: "destructive",
      });
    }
  };

  const copyInviteLink = (code: string, id: string) => {
    const link = `${window.location.origin}/invite/${code}`;
    navigator.clipboard.writeText(link);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    toast({
      title: "Copied!",
      description: "Invitation link copied to clipboard",
    });
  };

  const getStatusIcon = (status: string, expiresAt: string) => {
    const isExpired = new Date(expiresAt) < new Date();
    if (isExpired) {
      return <XCircle className="h-4 w-4 text-destructive" />;
    }
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "accepted":
        return <Check className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusText = (status: string, expiresAt: string) => {
    const isExpired = new Date(expiresAt) < new Date();
    if (isExpired) return "Expired";
    if (status === "accepted") return "Accepted";
    return "Pending";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/families`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold">Manage Invitations</h1>
          <p className="text-muted-foreground">
            Invite new members to join your family
          </p>
        </div>
      </div>

      <div className="flex justify-end">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Invitation
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Invite New Member</DialogTitle>
              <DialogDescription>
                Send an invitation email to join your family
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={role} onValueChange={(v: any) => setRole(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="member">Family Member</SelectItem>
                    <SelectItem value="council">Council Member</SelectItem>
                    <SelectItem value="consul">Family Consul</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreate} disabled={creating}>
                {creating ? (
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
          </DialogContent>
        </Dialog>
      </div>

      {invitations.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <UserPlus className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No invitations yet</h3>
            <p className="text-muted-foreground text-center mt-1">
              Send your first invitation to grow your family
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {invitations.map((invitation) => (
            <Card key={invitation.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{invitation.email}</CardTitle>
                      <CardDescription className="capitalize">
                        {invitation.role === "consul" ? "Family Consul" : 
                         invitation.role === "council" ? "Council Member" : "Family Member"}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(invitation.status, invitation.expires_at)}
                    <span className="text-sm text-muted-foreground">
                      {getStatusText(invitation.status, invitation.expires_at)}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  {invitation.status === "pending" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyInviteLink(invitation.invite_code, invitation.id)}
                      >
                        {copiedId === invitation.id ? (
                          <Check className="h-4 w-4 mr-1" />
                        ) : (
                          <Copy className="h-4 w-4 mr-1" />
                        )}
                        Copy Link
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleResend(invitation.id)}
                      >
                        <Mail className="h-4 w-4 mr-1" />
                        Resend
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleDelete(invitation.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
