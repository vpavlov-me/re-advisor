"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { 
  Users,
  CheckCircle2,
  XCircle,
  Loader2,
  LogIn,
  UserPlus
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/lib/hooks";
import { supabase } from "@/lib/supabaseClient";
import { getInvitationByCode, acceptInvitation, type InvitationWithFamily } from "@/lib/invitations";

export default function AcceptInvitePage() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const code = params.code as string;

  const [invitation, setInvitation] = useState<InvitationWithFamily | null>(null);
  const [loading, setLoading] = useState(true);
  const [accepting, setAccepting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const fetchInvitation = async () => {
      setLoading(true);
      try {
        const { data, error } = await getInvitationByCode(code);
        if (error) {
          setError(error.message);
        } else {
          setInvitation(data);
        }
      } catch (_err) {
        setError("Failed to load invitation");
      } finally {
        setLoading(false);
      }
    };

    if (code) {
      fetchInvitation();
    }
  }, [code]);

  const handleAccept = async () => {
    if (!invitation) return;

    setAccepting(true);
    try {
      const { success, familyId, error } = await acceptInvitation(invitation.id);
      if (success) {
        toast({
          title: "Welcome!",
          description: `You've joined ${invitation.families.name}`,
        });
        router.push(`/families/${familyId}`);
      } else {
        throw error;
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to accept invitation";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setAccepting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle>Invalid Invitation</CardTitle>
            <CardDescription>{error}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Button asChild>
              <Link href="/">Go to Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <CardTitle>You&apos;re Invited!</CardTitle>
            <CardDescription>
              You&apos;ve been invited to join <strong>{invitation?.families.name}</strong>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Please sign in or create an account to accept this invitation.
            </p>
            <div className="flex flex-col gap-2">
              <Button asChild>
                <Link href={`/auth/login?redirect=/invite/${code}`}>
                  <LogIn className="h-4 w-4 mr-2" />
                  Sign In
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/auth/register?redirect=/invite/${code}`}>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Create Account
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <CardTitle>Join {invitation?.families.name}</CardTitle>
          <CardDescription>
            {invitation?.inviter && (
              <>
                Invited by {invitation.inviter.first_name} {invitation.inviter.last_name}
              </>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              You&apos;ll join as:
            </p>
            <p className="font-medium capitalize">
              {invitation?.role === 'consul' ? 'Family Consul' : 
               invitation?.role === 'council' ? 'Council Member' : 
               'Family Member'}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <Button onClick={handleAccept} disabled={accepting}>
              {accepting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Joining...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Accept Invitation
                </>
              )}
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Decline</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
