"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ArrowLeft, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/ui/logo";
import { resetPassword } from "@/lib/auth";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/lib/validations";

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setError(null);

    try {
      const { error } = await resetPassword(data.email);
      
      if (error) {
        setError(error.message || "Failed to send reset link. Please try again.");
      } else {
        setSubmittedEmail(data.email);
        setSuccess(true);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  const handleTryDifferentEmail = () => {
    setSuccess(false);
    setSubmittedEmail("");
    reset();
  };

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Logo className="justify-center flex mb-6" />
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-semibold text-foreground">Check your email</h1>
            <p className="text-muted-foreground mt-2">
              We've sent a password reset link to
            </p>
            <p className="font-medium text-foreground mt-1">{submittedEmail}</p>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              <div className="text-center text-sm text-muted-foreground">
                <p>
                  Click the link in the email to reset your password.
                  If you don't see it, check your spam folder.
                </p>
              </div>

              <Button 
                variant="outline" 
                className="w-full" 
                onClick={handleTryDifferentEmail}
              >
                <Mail className="h-4 w-4 mr-2" />
                Try different email
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
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo className="justify-center flex mb-6" />
          <h1 className="text-2xl font-semibold text-foreground">Forgot your password?</h1>
          <p className="text-muted-foreground mt-2">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Error Alert */}
              {error && (
                <div className="p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
                  {error}
                </div>
              )}

              {/* Email */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    className={`pl-10 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    {...register("email")}
                    disabled={isSubmitting}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Reset Button */}
              <Button className="w-full" size="lg" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send reset link
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link 
            href="/auth/login" 
            className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
