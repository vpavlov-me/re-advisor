"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Lock, Eye, User, Building2, Phone, ArrowRight, Check, CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

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

// Benefits
const benefits = [
  "Connect with high-net-worth families",
  "Manage consultations and services",
  "Access exclusive knowledge resources",
  "Build your professional reputation",
  "Secure payment processing",
];

export default function RegisterPage() {
  const [selectedPlan, setSelectedPlan] = useState<"basic" | "pro">("pro");

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Image/Branding */}
      <div className="hidden lg:flex flex-1 bg-primary/5 items-center justify-center p-12">
        <div className="max-w-lg">
          <Logo className="mb-8" />
          <h2 className="text-3xl font-semibold text-foreground mb-4">
            Start your journey as a Family Advisor
          </h2>
          <p className="text-muted-foreground mb-8">
            Join our platform to connect with families seeking expert guidance in 
            governance, succession, and wealth management.
          </p>
          
          <ul className="space-y-4">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span className="text-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <Logo className="justify-center flex mb-6" />
          </div>
          
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-foreground">Create your account</h1>
            <p className="text-muted-foreground mt-2">Start connecting with families in minutes</p>
          </div>

          <Card>
            <CardContent className="p-6 space-y-4">
              {/* Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">
                    First name
                  </label>
                  <Input placeholder="Logan" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">
                    Last name
                  </label>
                  <Input placeholder="Roy" />
                </div>
              </div>

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

              {/* Phone */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">
                  Phone number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="tel" 
                    placeholder="+1 (555) 000-0000" 
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">
                  Company / Organization
                  <span className="text-muted-foreground font-normal ml-1">(optional)</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Your company name" 
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="text-sm font-medium text-foreground block mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="password" 
                    placeholder="Create a strong password" 
                    className="pl-10 pr-10"
                  />
                  <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full px-3">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">
                  Must be at least 8 characters with a number and symbol
                </p>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2">
                <input type="checkbox" id="terms" className="rounded border-border mt-1" />
                <label htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                </label>
              </div>

              {/* Subscription Selection */}
              <div className="space-y-3 pt-2">
                <label className="text-sm font-medium text-foreground block">Select Subscription Plan</label>
                <div className="grid grid-cols-2 gap-3">
                  <div 
                    className={`cursor-pointer rounded-lg border p-3 relative ${selectedPlan === "basic" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
                    onClick={() => setSelectedPlan("basic")}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-sm">Basic</span>
                      {selectedPlan === "basic" && <Check className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="text-2xl font-bold">$0<span className="text-xs font-normal text-muted-foreground">/mo</span></div>
                    <p className="text-xs text-muted-foreground mt-1">Profile & Basic Access</p>
                  </div>
                  
                  <div 
                    className={`cursor-pointer rounded-lg border p-3 relative ${selectedPlan === "pro" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
                    onClick={() => setSelectedPlan("pro")}
                  >
                    <div className="absolute -top-2 -right-2">
                      <Badge className="bg-primary text-primary-foreground text-[10px] px-1.5 h-5">POPULAR</Badge>
                    </div>
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-sm">Professional</span>
                      {selectedPlan === "pro" && <Check className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="text-2xl font-bold">$49<span className="text-xs font-normal text-muted-foreground">/mo</span></div>
                    <p className="text-xs text-muted-foreground mt-1">Marketplace & Tools</p>
                  </div>
                </div>
              </div>

              {/* Create Account Button */}
              <Button className="w-full" size="lg" asChild>
                <Link href="/onboarding">
                  Create account
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
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
                   <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.62 4.37-1.54 1.81.07 3.2 1.06 4.06 2.09-3.53 1.97-2.93 6.67.6 8.06-.53 1.42-1.24 2.8-2.11 3.62zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                   </svg>
                   Continue with Apple
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                   <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                     <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                   </svg>
                   Continue with LinkedIn
                </Button>
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-primary hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
