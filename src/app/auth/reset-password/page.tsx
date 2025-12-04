"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Eye, EyeOff, ArrowRight, Check, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { updatePassword } from "@/lib/auth";
import { resetPasswordSchema, type ResetPasswordFormData } from "@/lib/validations";
import { supabase } from "@/lib/supabaseClient";

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [tokenError, setTokenError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  // Verify that user has a valid session for password reset
  useEffect(() => {
    const verifySession = async () => {
      try {
        // Check for URL errors
        const errorParam = searchParams.get("error");
        const errorDescription = searchParams.get("error_description");
        
        if (errorParam) {
          setTokenError(true);
          setError(errorDescription || "Invalid or expired reset link");
          setIsVerifying(false);
          return;
        }

        // Check if there's a hash with recovery tokens (direct link from email)
        const hash = window.location.hash;
        if (hash.includes("access_token") && hash.includes("type=recovery")) {
          // Parse and set the session from hash
          const params = new URLSearchParams(hash.substring(1));
          const accessToken = params.get("access_token");
          const refreshToken = params.get("refresh_token");
          
          if (accessToken && refreshToken) {
            const { error: sessionError } = await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken,
            });
            
            if (sessionError) {
              setTokenError(true);
              setError(sessionError.message);
              setIsVerifying(false);
              return;
            }
            
            // Clear the hash to prevent token reuse
            window.history.replaceState(null, '', window.location.pathname);
            setIsVerifying(false);
            return;
          }
        }

        // Check if we already have a valid session (from callback redirect)
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          setTokenError(true);
          setError("No valid session found. Please request a new password reset link.");
          setIsVerifying(false);
          return;
        }
        
        // Valid session exists
        setIsVerifying(false);
      } catch (err) {
        console.error("Session verification error:", err);
        setTokenError(true);
        setError("Failed to verify session. Please try again.");
        setIsVerifying(false);
      }
    };

    verifySession();
  }, [searchParams]);

  // Password requirements checker
  const requirements = [
    { label: "At least 8 characters", met: (password?.length || 0) >= 8 },
    { label: "Contains a number", met: /\d/.test(password || "") },
    { label: "Contains a symbol", met: /[!@#$%^&*(),.?":{}|<>]/.test(password || "") },
    { label: "Contains uppercase letter", met: /[A-Z]/.test(password || "") },
  ];

  const allRequirementsMet = requirements.every(req => req.met);
  const passwordsMatch = password === confirmPassword && (confirmPassword?.length || 0) > 0;

  const onSubmit = async (data: ResetPasswordFormData) => {
    setError(null);

    try {
      const { error } = await updatePassword(data.password);
      
      if (error) {
        setError(error.message || "Failed to reset password. Please try again.");
      } else {
        setSuccess(true);
        // Redirect to login after 3 seconds
        setTimeout(() => {
          router.push("/auth/login");
        }, 3000);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  if (isVerifying) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Verifying your reset link...</p>
        </div>
      </div>
    );
  }

  if (tokenError) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Logo className="justify-center flex mb-6" />
            <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <XCircle className="h-8 w-8 text-destructive" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground">Invalid Reset Link</h1>
            <p className="text-muted-foreground mt-2">
              {error || "This password reset link is invalid or has expired."}
            </p>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <Button asChild className="w-full">
                <Link href="/auth/forgot-password">
                  Request new reset link
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>

              <div className="text-center">
                <Link 
                  href="/auth/login" 
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Back to sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Logo className="justify-center flex mb-6" />
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground">Password Reset!</h1>
            <p className="text-muted-foreground mt-2">
              Your password has been successfully reset.
            </p>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="text-center text-sm text-muted-foreground">
                <p>
                  You will be redirected to the login page in a few seconds...
                </p>
              </div>

              <Button asChild className="w-full">
                <Link href="/auth/login">
                  Sign in now
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo className="justify-center flex mb-6" />
          <h1 className="text-2xl font-semibold text-foreground">Reset your password</h1>
          <p className="text-muted-foreground mt-2">
            Create a new password for your account
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form 
              onSubmit={handleSubmit(onSubmit)} 
              method="post"
              action="#"
              autoComplete="on"
              className="space-y-4"
            >
              {/* Error Alert */}
              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
                  {error}
                </div>
              )}

              {/* New Password */}
              <div>
                <label htmlFor="new-password" className="text-sm font-medium text-foreground block mb-1.5">
                  New password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a new password"
                    autoComplete="new-password"
                    className={`pl-10 pr-10 ${errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    {...register("password")}
                    disabled={isSubmitting}
                  />
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirm-password" className="text-sm font-medium text-foreground block mb-1.5">
                  Confirm password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    autoComplete="new-password"
                    className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    {...register("confirmPassword")}
                    disabled={isSubmitting}
                  />
                  <Button 
                    type="button"
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive mt-1">{errors.confirmPassword.message}</p>
                )}
                {confirmPassword && !errors.confirmPassword && !passwordsMatch && (
                  <p className="text-sm text-destructive mt-1">Passwords do not match</p>
                )}
                {passwordsMatch && (
                  <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                    <Check className="h-3 w-3" /> Passwords match
                  </p>
                )}
              </div>

              {/* Password Requirements */}
              <div className="p-3 bg-muted/30 rounded-lg">
                <p className="text-sm font-medium text-foreground mb-2">Password requirements:</p>
                <ul className="space-y-1.5">
                  {requirements.map((req) => (
                    <li key={req.label} className="flex items-center gap-2 text-sm">
                      <div className={`h-4 w-4 rounded-full flex items-center justify-center ${
                        req.met ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"
                      }`}>
                        {req.met && <Check className="h-3 w-3" />}
                      </div>
                      <span className={req.met ? "text-foreground" : "text-muted-foreground"}>
                        {req.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reset Button */}
              <Button 
                className="w-full" 
                size="lg" 
                type="submit" 
                disabled={isSubmitting || !allRequirementsMet || !passwordsMatch}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  <>
                    Reset password
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-sm text-muted-foreground mt-6">
          Remember your password?{" "}
          <Link href="/auth/login" className="text-primary hover:underline font-medium">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
