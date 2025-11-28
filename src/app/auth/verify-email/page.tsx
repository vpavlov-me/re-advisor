"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Mail, ArrowLeft, RefreshCw, CheckCircle2, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { resendVerificationEmail } from "@/lib/auth";
import { assetPath } from "@/lib/utils";

// Logo component
function Logo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Image 
        src={assetPath("/logo.svg")} 
        alt="RE:Advisor Logo" 
        width={120}
        height={42}
        className="object-contain"
        priority
      />
    </div>
  );
}

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  
  const [resending, setResending] = useState(false);
  const [resent, setResent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleResend = async () => {
    if (countdown > 0 || !email) return;
    
    setResending(true);
    setError(null);
    
    try {
      const { error } = await resendVerificationEmail(email);
      
      if (error) {
        setError("Failed to resend verification email. Please try again.");
      } else {
        setResent(true);
        setCountdown(60); // 60 second cooldown
        setTimeout(() => setResent(false), 3000);
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo className="justify-center flex mb-6" />
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-semibold text-foreground">Check your email</h1>
          <p className="text-muted-foreground mt-2">
            We've sent a verification link to
          </p>
          {email && (
            <p className="font-medium text-foreground mt-1">{email}</p>
          )}
        </div>

        <Card>
          <CardContent className="p-6 space-y-4">
            <div className="text-center text-sm text-muted-foreground">
              <p>
                Click the link in the email to verify your account. 
                If you don't see it, check your spam folder.
              </p>
            </div>

            {error && (
              <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg text-center">
                {error}
              </div>
            )}

            {resent && (
              <div className="flex items-center justify-center gap-2 p-3 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle2 className="h-4 w-4" />
                Verification email sent!
              </div>
            )}

            <Button 
              variant="outline" 
              className="w-full" 
              onClick={handleResend}
              disabled={resending || countdown > 0}
            >
              {resending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : countdown > 0 ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Resend in {countdown}s
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Resend verification email
                </>
              )}
            </Button>

            <div className="text-center">
              <Link 
                href="/auth/login" 
                className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Wrong email?{" "}
          <Link href="/auth/register" className="text-primary hover:underline font-medium">
            Sign up again
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
