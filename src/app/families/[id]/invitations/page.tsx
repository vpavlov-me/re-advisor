"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  ArrowLeft,
  Mail,
  Copy,
  Check,
  QrCode,
  RefreshCw,
  Send,
  UserPlus,
  Clock,
  CheckCircle2,
  XCircle,
  Trash2,
  RotateCcw,
  Link as LinkIcon,
  Users,
  Loader2
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/lib/hooks";
import { getFamily } from "@/lib/families";
import {
  getFamilyInvitations,
  createInvitation,
  cancelInvitation,
  resendInvitation,
  getFamilyInviteLink,
  regenerateFamilyInviteCode,
  getQRCodeUrl,
  invitationRoleLabels,
  invitationStatusLabels,
  getStatusColor,
  type FamilyInvitation,
} from "@/lib/invitations";

export default function FamilyInvitationsPage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const familyId = Number(params.id);

  const [family, setFamily] = useState<any>(null);
  const [invitations, setInvitations] = useState<FamilyInvitation[]>([]);
  const [inviteLink, setInviteLink] = useState<string | null>(null);
  const [inviteCode, setInviteCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [copied, setCopied] = useState(false);

  // New invitation form
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<"consul" | "council" | "member">("member");
  const [newMessage, setNewMessage] = useState("");
  const [showQRDialog, setShowQRDialog] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch family
      const { data: familyData } = await getFamily(familyId);
      if (familyData) {
        setFamily(familyData);
      }

      // Fetch invitations
      const { data: invitationsData } = await getFamilyInvitations(familyId);
      if (invitationsData) {
        setInvitations(invitationsData);
      }

      // Fetch invite link
      const { inviteCode: code, inviteUrl } = await getFamilyInviteLink(familyId);
      setInviteCode(code);
      setInviteLink(inviteUrl);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to load invitation data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (familyId) {
      fetchData();
    }
  }, [familyId]);

  const handleSendInvitation = async () => {
    if (!newEmail.trim()) {
      toast({
        title: "Error",
        description: "Please enter an email address",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      const { data, error } = await createInvitation({
        family_id: familyId,
        email: newEmail.trim(),
        role: newRole,
        message: newMessage.trim() || undefined,
      });

      if (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Invitation Sent",
        description: `Invitation sent to ${newEmail}`,
      });

      // Reset form
      setNewEmail("");
      setNewRole("member");
      setNewMessage("");

      // Refresh invitations
      fetchData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send invitation",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  const handleCancelInvitation = async (invitationId: string) => {
    try {
      const { success, error } = await cancelInvitation(invitationId);
      if (success) {
        toast({
          title: "Invitation Cancelled",
          description: "The invitation has been cancelled",
        });
        fetchData();
      } else {
        throw error;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cancel invitation",
        variant: "destructive",
      });
    }
  };

  const handleResendInvitation = async (invitationId: string) => {
    try {
      const { data, error } = await resendInvitation(invitationId);
      if (data) {
        toast({
          title: "Invitation Resent",
          description: "A new invitation has been sent",
        });
        fetchData();
      } else {
        throw error;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to resend invitation",
        variant: "destructive",
      });
    }
  };

  const handleCopyLink = async () => {
    if (inviteLink) {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "Invite link copied to clipboard",
      });
    }
  };

  const handleRegenerateCode = async () => {
    try {
      const { inviteCode: newCode, error } = await regenerateFamilyInviteCode(familyId);
      if (newCode) {
        setInviteCode(newCode);
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
        setInviteLink(`${baseUrl}/invite/${newCode}`);
        toast({
          title: "Link Regenerated",
          description: "A new invite link has been created. Previous links will no longer work.",
        });
      } else {
        throw error;
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to regenerate invite link",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex-1 bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Invite Family Members</h1>
              <p className="text-sm text-muted-foreground">{family?.name}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6 space-y-6">
        {/* Invite Link Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5" />
              Invite Link
            </CardTitle>
            <CardDescription>
              Share this link to invite family members to join
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={inviteLink || ""}
                readOnly
                className="font-mono text-sm"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyLink}
                disabled={!inviteLink}
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
              <Dialog open={showQRDialog} onOpenChange={setShowQRDialog}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" disabled={!inviteLink}>
                    <QrCode className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>QR Code</DialogTitle>
                    <DialogDescription>
                      Scan this code to join {family?.name}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-center py-6">
                    {inviteLink && (
                      <img
                        src={getQRCodeUrl(inviteLink, 250)}
                        alt="QR Code"
                        className="rounded-lg"
                        width={250}
                        height={250}
                      />
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setShowQRDialog(false)}>
                      Close
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="icon" onClick={handleRegenerateCode}>
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Code: <span className="font-mono font-medium">{inviteCode}</span>
              {" · "}
              Anyone with this link can join as a family member
            </p>
          </CardContent>
        </Card>

        {/* Send Invitation Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Send Email Invitation
            </CardTitle>
            <CardDescription>
              Invite specific members by email with a personalized message
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="family@example.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select value={newRole} onValueChange={(v: any) => setNewRole(v)}>
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
            <div className="space-y-2">
              <Label htmlFor="message">Personal Message (Optional)</Label>
              <Textarea
                id="message"
                placeholder="Add a personal message to the invitation..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={3}
              />
            </div>
            <Button onClick={handleSendInvitation} disabled={sending}>
              {sending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Invitation
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Pending Invitations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Sent Invitations
            </CardTitle>
            <CardDescription>
              Track the status of invitations you&apos;ve sent
            </CardDescription>
          </CardHeader>
          <CardContent>
            {invitations.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <UserPlus className="h-12 w-12 mx-auto mb-4 opacity-30" />
                <p className="font-medium">No invitations sent yet</p>
                <p className="text-sm mt-1">
                  Use the form above to invite family members
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {invitations.map((invitation) => (
                  <div
                    key={invitation.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{invitation.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {invitationRoleLabels[invitation.role] || invitation.role}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(invitation.status)}`}>
                            {invitation.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                            {invitation.status === 'accepted' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                            {invitation.status === 'expired' && <XCircle className="h-3 w-3 mr-1" />}
                            {invitationStatusLabels[invitation.status] || invitation.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            Sent {formatDate(invitation.created_at)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {invitation.status === 'pending' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleResendInvitation(invitation.id)}
                          >
                            <RotateCcw className="h-4 w-4 mr-1" />
                            Resend
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-destructive hover:text-destructive"
                            onClick={() => handleCancelInvitation(invitation.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      {invitation.status === 'expired' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleResendInvitation(invitation.id)}
                        >
                          <RotateCcw className="h-4 w-4 mr-1" />
                          Resend
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
