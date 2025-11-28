import Link from "next/link";
import { Lock, Eye, ArrowRight, Check } from "lucide-react";
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

// Password requirements
const requirements = [
  { label: "At least 8 characters", met: true },
  { label: "Contains a number", met: true },
  { label: "Contains a symbol", met: false },
  { label: "Contains uppercase letter", met: true },
];

export default function ResetPasswordPage() {
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
          <CardContent className="p-6 space-y-4">
            {/* New Password */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">
                New password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="password" 
                  placeholder="Create a new password" 
                  className="pl-10 pr-10"
                />
                <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-sm font-medium text-foreground block mb-1.5">
                Confirm password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="password" 
                  placeholder="Confirm your new password" 
                  className="pl-10 pr-10"
                />
                <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3">
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
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
            <Button className="w-full" size="lg">
              Reset password
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
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
