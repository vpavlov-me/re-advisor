"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Mail, Lock, Eye, EyeOff, Building2, Phone, ArrowRight, ArrowLeft,
  Check, Loader2, AlertCircle, User, Users, Briefcase
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/components/providers/auth-provider";
import { assetPath } from "@/lib/utils";

// Step schemas
const step1Schema = z.object({
  firstName: z.string().min(1, 'First name is required').min(2, 'At least 2 characters'),
  lastName: z.string().min(1, 'Last name is required').min(2, 'At least 2 characters'),
  phone: z.string().optional(),
  company: z.string().optional(),
});

const step2Schema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'At least 8 characters')
    .regex(/[A-Z]/, 'One uppercase letter')
    .regex(/\d/, 'One number')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, 'One symbol'),
  confirmPassword: z.string().min(1, 'Confirm password'),
  terms: z.boolean().refine(v => v === true, 'Accept terms'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const step3Schema = z.object({
  familyName: z.string().min(1, 'Family name is required'),
  familyRole: z.enum(['head', 'council', 'member']),
  familyDescription: z.string().optional(),
  selectedPlan: z.enum(['basic', 'pro']),
});

type Step1Data = z.infer<typeof step1Schema>;
type Step2Data = z.infer<typeof step2Schema>;
type Step3Data = z.infer<typeof step3Schema>;

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

// Step indicator component
function StepIndicator({ currentStep }: { currentStep: number }) {
  const steps = [
    { num: 1, label: "Personal Info" },
    { num: 2, label: "Account Setup" },
    { num: 3, label: "Family Details" },
  ];

  return (
    <div className="flex items-center justify-center mb-8">
      {steps.map((step, index) => (
        <div key={step.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <div 
              className={`
                h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                ${currentStep > step.num 
                  ? 'bg-primary text-primary-foreground' 
                  : currentStep === step.num 
                    ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' 
                    : 'bg-muted text-muted-foreground'
                }
              `}
            >
              {currentStep > step.num ? (
                <Check className="h-5 w-5" />
              ) : (
                step.num
              )}
            </div>
            <span className={`
              mt-2 text-xs font-medium hidden sm:block
              ${currentStep === step.num ? 'text-foreground' : 'text-muted-foreground'}
            `}>
              {step.label}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div 
              className={`
                w-12 sm:w-20 h-0.5 mx-2 transition-colors
                ${currentStep > step.num ? 'bg-primary' : 'bg-muted'}
              `}
            />
          )}
        </div>
      ))}
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

// Step 1: Personal Info
function PersonalInfoStep({ 
  onNext, 
  defaultValues,
}: { 
  onNext: (data: Step1Data) => void;
  defaultValues: Partial<Step1Data>;
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-4">
      <div className="text-center mb-6">
        <User className="h-12 w-12 mx-auto text-primary mb-4" />
        <h2 className="text-xl font-semibold">Tell us about yourself</h2>
        <p className="text-sm text-muted-foreground">We&apos;ll use this to personalize your experience</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium block mb-1.5">First name *</label>
          <Input 
            placeholder="Logan"
            className={errors.firstName ? 'border-destructive' : ''}
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="text-xs text-destructive mt-1">{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium block mb-1.5">Last name *</label>
          <Input 
            placeholder="Roy"
            className={errors.lastName ? 'border-destructive' : ''}
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="text-xs text-destructive mt-1">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium block mb-1.5">Phone number</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            type="tel" 
            placeholder="+1 (555) 000-0000" 
            className="pl-10"
            {...register("phone")}
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium block mb-1.5">
          Company / Organization <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <div className="relative">
          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Your company name" 
            className="pl-10"
            {...register("company")}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" size="lg">
        Continue
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>
    </form>
  );
}

// Step 2: Account Setup
function AccountSetupStep({ 
  onNext, 
  onBack,
  defaultValues,
  onSocialAuth,
}: { 
  onNext: (data: Step2Data) => void;
  onBack: () => void;
  defaultValues: Partial<Step2Data>;
  onSocialAuth: (provider: 'google' | 'apple' | 'linkedin') => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues,
  });

  const password = watch("password");
  
  const passwordChecks = {
    length: (password?.length || 0) >= 8,
    number: /\d/.test(password || ""),
    symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password || ""),
    uppercase: /[A-Z]/.test(password || ""),
  };

  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <Lock className="h-12 w-12 mx-auto text-primary mb-4" />
        <h2 className="text-xl font-semibold">Secure your account</h2>
        <p className="text-sm text-muted-foreground">Set up your login credentials</p>
      </div>

      {/* Social login buttons */}
      <div className="space-y-2">
        <Button 
          variant="outline" 
          className="w-full" 
          size="lg"
          type="button"
          onClick={() => onSocialAuth('google')}
        >
          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </Button>
        <Button 
          variant="outline" 
          className="w-full" 
          size="lg"
          type="button"
          onClick={() => onSocialAuth('apple')}
        >
          <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.62 4.37-1.54 1.81.07 3.2 1.06 4.06 2.09-3.53 1.97-2.93 6.67.6 8.06-.53 1.42-1.24 2.8-2.11 3.62zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
          </svg>
          Continue with Apple
        </Button>
      </div>

      <div className="relative">
        <Separator />
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
          or with email
        </span>
      </div>

      <form onSubmit={handleSubmit(onNext)} className="space-y-4">
        <div>
          <label className="text-sm font-medium block mb-1.5">Email address *</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="email" 
              placeholder="you@example.com" 
              className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="text-sm font-medium block mb-1.5">Password *</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type={showPassword ? "text" : "password"}
              placeholder="Create a strong password" 
              className={`pl-10 pr-10 ${errors.password ? 'border-destructive' : ''}`}
              {...register("password")}
            />
            <Button 
              type="button"
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          
          {password && (
            <div className="mt-2 grid grid-cols-2 gap-1">
              {Object.entries(passwordChecks).map(([key, valid]) => (
                <div key={key} className={`flex items-center gap-1 text-xs ${valid ? 'text-green-600' : 'text-muted-foreground'}`}>
                  <Check className={`h-3 w-3 ${valid ? 'opacity-100' : 'opacity-30'}`} />
                  {key === 'length' ? '8+ chars' : key === 'number' ? 'Number' : key === 'symbol' ? 'Symbol' : 'Uppercase'}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="text-sm font-medium block mb-1.5">Confirm Password *</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm your password" 
              className={`pl-10 pr-10 ${errors.confirmPassword ? 'border-destructive' : ''}`}
              {...register("confirmPassword")}
            />
            <Button 
              type="button"
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0 h-full px-3"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-destructive mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="flex items-start gap-2">
          <input 
            type="checkbox" 
            id="terms" 
            className="rounded border-border mt-1"
            {...register("terms")}
          />
          <label htmlFor="terms" className="text-sm text-muted-foreground">
            I agree to the{" "}
            <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
          </label>
        </div>
        {errors.terms && (
          <p className="text-xs text-destructive">{errors.terms.message}</p>
        )}

        <div className="flex gap-3 pt-2">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button type="submit" className="flex-1">
            Continue
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </form>
    </div>
  );
}

// Step 3: Family Details
function FamilyDetailsStep({ 
  onSubmit, 
  onBack,
  defaultValues,
  isSubmitting,
}: { 
  onSubmit: (data: Step3Data) => void;
  onBack: () => void;
  defaultValues: Partial<Step3Data>;
  isSubmitting: boolean;
}) {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      familyRole: 'head',
      selectedPlan: 'pro',
      ...defaultValues,
    },
  });

  const familyRole = watch("familyRole");
  const selectedPlan = watch("selectedPlan");

  const roles = [
    { value: 'head', label: 'Family Head', desc: 'Primary decision maker', icon: Users },
    { value: 'council', label: 'Council Member', desc: 'Advisory role', icon: Briefcase },
    { value: 'member', label: 'Family Member', desc: 'Participant', icon: User },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="text-center mb-6">
        <Users className="h-12 w-12 mx-auto text-primary mb-4" />
        <h2 className="text-xl font-semibold">Family Setup</h2>
        <p className="text-sm text-muted-foreground">Create or join a family office</p>
      </div>

      <div>
        <label className="text-sm font-medium block mb-1.5">Family Name *</label>
        <Input 
          placeholder="The Smith Family Office"
          className={errors.familyName ? 'border-destructive' : ''}
          {...register("familyName")}
        />
        {errors.familyName && (
          <p className="text-xs text-destructive mt-1">{errors.familyName.message}</p>
        )}
      </div>

      <div>
        <label className="text-sm font-medium block mb-3">Your Role in Family *</label>
        <div className="grid gap-2">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.value}
                className={`
                  cursor-pointer rounded-lg border p-3 flex items-center gap-3 transition-colors
                  ${familyRole === role.value ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-border hover:border-primary/50'}
                `}
                onClick={() => setValue("familyRole", role.value as 'head' | 'council' | 'member')}
              >
                <div className={`p-2 rounded-full ${familyRole === role.value ? 'bg-primary/10' : 'bg-muted'}`}>
                  <Icon className={`h-5 w-5 ${familyRole === role.value ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm">{role.label}</div>
                  <div className="text-xs text-muted-foreground">{role.desc}</div>
                </div>
                {familyRole === role.value && <Check className="h-5 w-5 text-primary" />}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <label className="text-sm font-medium block mb-1.5">
          Description <span className="text-muted-foreground font-normal">(optional)</span>
        </label>
        <Textarea 
          placeholder="Brief description of your family office..."
          rows={2}
          {...register("familyDescription")}
        />
      </div>

      <div className="pt-2">
        <label className="text-sm font-medium block mb-3">Select Subscription Plan</label>
        <div className="grid grid-cols-2 gap-3">
          <div 
            className={`cursor-pointer rounded-lg border p-3 relative transition-colors ${selectedPlan === "basic" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
            onClick={() => setValue("selectedPlan", "basic")}
          >
            <div className="flex justify-between items-start mb-1">
              <span className="font-medium text-sm">Basic</span>
              {selectedPlan === "basic" && <Check className="h-4 w-4 text-primary" />}
            </div>
            <div className="text-2xl font-bold">$0<span className="text-xs font-normal text-muted-foreground">/mo</span></div>
            <p className="text-xs text-muted-foreground mt-1">Profile & Basic Access</p>
          </div>
          
          <div 
            className={`cursor-pointer rounded-lg border p-3 relative transition-colors ${selectedPlan === "pro" ? "border-primary bg-primary/5 ring-1 ring-primary" : "border-border hover:border-primary/50"}`}
            onClick={() => setValue("selectedPlan", "pro")}
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

      <div className="flex gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onBack} className="flex-1" disabled={isSubmitting}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button type="submit" className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Creating...
            </>
          ) : (
            <>
              Complete Registration
              <Check className="h-4 w-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register: authRegister, loginWithGoogle, loginWithApple, loginWithLinkedIn } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form data storage across steps
  const [formData, setFormData] = useState({
    step1: {} as Partial<Step1Data>,
    step2: {} as Partial<Step2Data>,
    step3: {} as Partial<Step3Data>,
  });

  // Redirect URL for after social auth
  const redirectTo = searchParams.get('redirect') || '/onboarding';

  const handleStep1 = (data: Step1Data) => {
    setFormData(prev => ({ ...prev, step1: data }));
    setCurrentStep(2);
  };

  const handleStep2 = (data: Step2Data) => {
    setFormData(prev => ({ ...prev, step2: data }));
    setCurrentStep(3);
  };

  const handleStep3 = async (data: Step3Data) => {
    setError(null);
    setIsSubmitting(true);

    try {
      const { step1, step2 } = formData;
      
      const { error: authError, needsVerification } = await authRegister({
        email: step2.email!,
        password: step2.password!,
        firstName: step1.firstName!,
        lastName: step1.lastName!,
        phone: step1.phone,
        company: step1.company,
        // Additional data for family setup
        familyName: data.familyName,
        familyRole: data.familyRole,
        familyDescription: data.familyDescription,
        selectedPlan: data.selectedPlan,
      });

      if (authError) {
        if (authError.message.includes("already registered")) {
          setError("This email is already registered. Please sign in instead.");
        } else {
          setError(authError.message);
        }
        setIsSubmitting(false);
      } else if (needsVerification) {
        router.push(`/auth/verify-email?email=${encodeURIComponent(step2.email!)}`);
      } else {
        router.push(redirectTo);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleSocialAuth = async (provider: 'google' | 'apple' | 'linkedin') => {
    setError(null);
    let result;
    
    switch (provider) {
      case 'google':
        result = await loginWithGoogle();
        break;
      case 'apple':
        result = await loginWithApple();
        break;
      case 'linkedin':
        result = await loginWithLinkedIn();
        break;
    }
    
    if (result?.error) {
      setError(`Failed to sign up with ${provider}. Please try again.`);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Benefits */}
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

          {/* Step Indicator */}
          <StepIndicator currentStep={currentStep} />

          <Card>
            <CardContent className="p-6">
              {/* Error Alert */}
              {error && (
                <div className="flex items-center gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-lg mb-4">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Steps */}
              {currentStep === 1 && (
                <PersonalInfoStep 
                  onNext={handleStep1} 
                  defaultValues={formData.step1}
                />
              )}
              
              {currentStep === 2 && (
                <AccountSetupStep 
                  onNext={handleStep2} 
                  onBack={() => setCurrentStep(1)}
                  defaultValues={formData.step2}
                  onSocialAuth={handleSocialAuth}
                />
              )}
              
              {currentStep === 3 && (
                <FamilyDetailsStep 
                  onSubmit={handleStep3} 
                  onBack={() => setCurrentStep(2)}
                  defaultValues={formData.step3}
                  isSubmitting={isSubmitting}
                />
              )}
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
