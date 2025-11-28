import Link from "next/link";
import { Mail, ArrowLeft, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

export default function ForgotPasswordPage() {
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
                  placeholder="Enter your email" 
                  className="pl-10"
                />
              </div>
            </div>

            {/* Reset Button */}
            <Button className="w-full" size="lg">
              Send reset link
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
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
