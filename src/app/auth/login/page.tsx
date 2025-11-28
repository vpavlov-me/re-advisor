"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// Logo component
function Logo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <span className="text-2xl font-medium text-foreground">(</span>
      <span className="text-2xl font-bold text-primary">RE:</span>
      <span className="text-2xl font-medium text-foreground">Advisor</span>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Logo className="justify-center flex mb-6" />
            <h1 className="text-2xl font-semibold text-foreground">Welcome back</h1>
            <p className="text-muted-foreground mt-2">Sign in to your advisor account</p>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              {/* Email */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">
                  Email address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="email" 
                    placeholder="you@example.com" 
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-medium text-foreground">
                    Password
                  </label>
                  <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="password" 
                    placeholder="••••••••••••" 
                    className="pl-10 pr-10"
                  />
                  <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
              </div>

              {/* Remember me */}
              <div className="flex items-center gap-2">
                <input type="checkbox" id="remember" className="rounded border-border" />
                <label htmlFor="remember" className="text-sm text-muted-foreground">
                  Remember me for 30 days
                </label>
              </div>

              {/* Sign In Button */}
              <Button className="w-full" size="lg" onClick={handleLogin}>
                Sign in
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>

              <Separator className="my-4" />

              {/* Social Login */}
              <div className="space-y-3">
                <Button variant="outline" className="w-full" size="lg">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                  Continue with GitHub
                </Button>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-primary hover:underline font-medium">
              Create an account
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image/Branding */}
      <div className="hidden lg:flex flex-1 bg-primary/5 items-center justify-center p-12">
        <div className="max-w-lg text-center">
          <div className="h-64 w-64 mx-auto mb-8 rounded-full bg-primary/10 flex items-center justify-center">
            <div className="h-48 w-48 rounded-full bg-primary/20 flex items-center justify-center">
              <div className="h-32 w-32 rounded-full bg-primary/30" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-4">
            Trusted by Family Advisors Worldwide
          </h2>
          <p className="text-muted-foreground">
            Join thousands of professional advisors helping families navigate governance, 
            succession planning, and wealth management with confidence.
          </p>
        </div>
      </div>
    </div>
  );
}
