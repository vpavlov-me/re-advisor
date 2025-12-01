"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Eye, EyeOff, Check, Loader2, AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/ui/logo";
import { useAuth } from "@/components/providers/auth-provider";

// Registration schema
const registerSchema = z.object({
  firstName: z.string().min(1, 'First name is required').min(2, 'At least 2 characters'),
  lastName: z.string().min(1, 'Last name is required').min(2, 'At least 2 characters'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'At least 8 characters')
    .regex(/[A-Z]/, 'One uppercase letter')
    .regex(/\d/, 'One number'),
  confirmPassword: z.string().min(1, 'Confirm password'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register: authRegister, loginWithGoogle, loginWithGithub } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect URL for after social auth
  const redirectTo = searchParams.get('redirect') || '/onboarding';

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");
  
  const passwordChecks = {
    length: (password?.length || 0) >= 8,
    number: /\d/.test(password || ""),
    uppercase: /[A-Z]/.test(password || ""),
  };

  const onSubmit = async (data: RegisterFormData) => {
    setError(null);
    setIsSubmitting(true);

    try {
      const { error: authError, needsVerification } = await authRegister({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
      });

      if (authError) {
        if (authError.message.includes("already registered")) {
          setError("This email is already registered. Please sign in instead.");
        } else {
          setError(authError.message);
        }
        setIsSubmitting(false);
      } else if (needsVerification) {
        router.push(`/auth/verify-email?email=${encodeURIComponent(data.email)}`);
      } else {
        router.push(redirectTo);
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError(null);
    const { error } = await loginWithGoogle();
    if (error) {
      setError("Failed to sign up with Google. Please try again.");
    }
  };

  const handleGithubSignup = async () => {
    setError(null);
    const { error } = await loginWithGithub();
    if (error) {
      setError("Failed to sign up with GitHub. Please try again.");
    }
  };

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <div className={cn("flex flex-col gap-6")}>
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center gap-2 text-center">
                    <div className="mb-2">
                      <Logo width={120} height={42} />
                    </div>
                    <h1 className="text-2xl font-bold">Create your account</h1>
                    <p className="text-muted-foreground text-sm text-balance">
                      Enter your details below to create your account
                    </p>
                  </div>

                  {/* Error Alert */}
                  {error && (
                    <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        type="text"
                        placeholder="John"
                        autoComplete="given-name"
                        className={errors.firstName ? 'border-destructive focus-visible:ring-destructive' : ''}
                        {...register("firstName")}
                        disabled={isSubmitting}
                      />
                      {errors.firstName && (
                        <p className="text-xs text-destructive">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        type="text"
                        placeholder="Doe"
                        autoComplete="family-name"
                        className={errors.lastName ? 'border-destructive focus-visible:ring-destructive' : ''}
                        {...register("lastName")}
                        disabled={isSubmitting}
                      />
                      {errors.lastName && (
                        <p className="text-xs text-destructive">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      autoComplete="email"
                      className={errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}
                      {...register("email")}
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-xs text-destructive">{errors.email.message}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      We&apos;ll use this to contact you. We will not share your email with anyone else.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Input 
                          id="password" 
                          type={showPassword ? "text" : "password"} 
                          autoComplete="new-password"
                          className={cn(
                            "pr-10",
                            errors.password ? 'border-destructive focus-visible:ring-destructive' : ''
                          )}
                          {...register("password")}
                          disabled={isSubmitting}
                        />
                        <Button 
                          type="button"
                          variant="ghost" 
                          size="icon" 
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                          disabled={isSubmitting}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <div className="relative">
                        <Input 
                          id="confirmPassword" 
                          type={showConfirm ? "text" : "password"} 
                          autoComplete="new-password"
                          className={cn(
                            "pr-10",
                            errors.confirmPassword ? 'border-destructive focus-visible:ring-destructive' : ''
                          )}
                          {...register("confirmPassword")}
                          disabled={isSubmitting}
                        />
                        <Button 
                          type="button"
                          variant="ghost" 
                          size="icon" 
                          className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                          onClick={() => setShowConfirm(!showConfirm)}
                          disabled={isSubmitting}
                        >
                          {showConfirm ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {password && (
                    <div className="grid grid-cols-3 gap-2">
                      {Object.entries(passwordChecks).map(([key, valid]) => {
                        const labels: Record<string, string> = {
                          length: '8+ chars',
                          number: 'Number',
                          uppercase: 'Uppercase',
                        };
                        return (
                          <div key={key} className={`flex items-center gap-1 text-xs ${valid ? 'text-green-600' : 'text-muted-foreground'}`}>
                            <Check className={`h-3 w-3 ${valid ? 'opacity-100' : 'opacity-30'}`} />
                            {labels[key]}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {errors.password && (
                    <p className="text-xs text-destructive">{errors.password.message}</p>
                  )}
                  {errors.confirmPassword && (
                    <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
                  )}

                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>

                  <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                    <span className="relative z-10 bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button 
                      variant="outline" 
                      type="button"
                      onClick={handleGoogleSignup}
                      disabled={isSubmitting}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                        <path
                          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                          fill="currentColor"
                        />
                      </svg>
                      <span className="sr-only">Sign up with Google</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      type="button"
                      onClick={handleGithubSignup}
                      disabled={isSubmitting}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                      </svg>
                      <span className="sr-only">Sign up with GitHub</span>
                    </Button>
                  </div>

                  <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="underline underline-offset-4">
                      Sign in
                    </Link>
                  </p>
                </div>
              </form>
              <div className="bg-muted relative hidden md:block">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="h-48 w-48 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <div className="h-36 w-36 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="h-24 w-24 rounded-full bg-primary/30" />
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold text-foreground mb-2">
                      Start Your Journey
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Join our platform to connect with families seeking expert guidance in governance and wealth management.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <p className="text-balance px-6 text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            By clicking continue, you agree to our <Link href="/terms">Terms of Service</Link>{" "}
            and <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
