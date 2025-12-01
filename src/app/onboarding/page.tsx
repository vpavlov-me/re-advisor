"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { 
  User, 
  Briefcase, 
  GraduationCap, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Save, 
  Upload,
  Award,
  Shield,
  Lock,
  FileText,
  CreditCard,
  DollarSign,
  ClipboardCheck,
  Loader2,
  MapPin,
  Globe,
  Linkedin
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/lib/hooks";
import { supabase } from "@/lib/supabaseClient";
import { ONBOARDING_STEPS, syncOnboardingProgress } from "@/lib/onboarding";
import { assetPath } from "@/lib/utils";

// Governance Modules for expertise selection
const GOVERNANCE_MODULES = [
  { id: "conflicts", name: "Conflicts Resolution", description: "Mediation and dispute resolution strategies" },
  { id: "constitution", name: "Family Constitution", description: "Governance charters and policy development" },
  { id: "council", name: "Family Council", description: "Council structure and meeting facilitation" },
  { id: "decision", name: "Decision Making", description: "Frameworks for collective decision making" },
  { id: "education", name: "Education", description: "Next-gen development and learning paths" },
  { id: "mentorship", name: "Mentorship", description: "Guidance for emerging family leaders" },
  { id: "assets", name: "Assets & Wealth", description: "Shared asset governance and oversight" },
  { id: "succession", name: "Succession", description: "Leadership transition planning" },
  { id: "philanthropy", name: "Philanthropy", description: "Charitable giving and impact strategies" },
  { id: "management", name: "Family Management", description: "Day-to-day family office operations" },
];

// Step icons mapping
const STEP_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  account_security: Shield,
  profile_basics: User,
  credentials: Award,
  expertise_mapping: Briefcase,
  services_pricing: DollarSign,
  payments: CreditCard,
  kyc_verification: FileText,
  review_submit: ClipboardCheck,
};

interface ProfileData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  title?: string;
  bio?: string;
  avatar_url?: string;
  city?: string;
  country?: string;
  website?: string;
  linkedin_url?: string;
  company?: string;
  expertise_areas?: string[];
  two_factor_enabled?: boolean;
  email_verified?: boolean;
  phone_verified?: boolean;
}

export default function OnboardingPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [profile, setProfile] = useState<ProfileData | null>(null);
  
  // Form state
  const [formData, setFormData] = useState({
    // Account Security
    two_factor_enabled: false,
    recovery_email: "",
    
    // Profile Basics
    first_name: "",
    last_name: "",
    title: "",
    bio: "",
    phone: "",
    city: "",
    country: "",
    
    // Credentials
    experience: [{ id: 1, role: "", company: "", duration: "", description: "" }],
    education: [{ id: 1, degree: "", school: "", year: "" }],
    certifications: [{ id: 1, name: "", issuer: "", year: "" }],
    
    // Expertise
    expertise_areas: [] as string[],
    primary_expertise: "",
    
    // Services
    hourly_rate: "",
    package_prices: {
      basic: "",
      standard: "",
      premium: "",
    },
    
    // Social links
    website: "",
    linkedin_url: "",
  });

  const totalSteps = ONBOARDING_STEPS.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const currentStepData = ONBOARDING_STEPS[currentStep];

  // Load profile data
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          router.push('/auth/login');
          return;
        }

        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (profileData) {
          setProfile(profileData);
          setFormData(prev => ({
            ...prev,
            first_name: profileData.first_name || "",
            last_name: profileData.last_name || "",
            title: profileData.title || "",
            bio: profileData.bio || "",
            phone: profileData.phone || "",
            city: profileData.city || "",
            country: profileData.country || "",
            website: profileData.website || "",
            linkedin_url: profileData.linkedin_url || "",
            expertise_areas: profileData.expertise_areas || [],
            two_factor_enabled: profileData.two_factor_enabled || false,
          }));
          
          // Sync completed steps
          const { progress } = await syncOnboardingProgress(user.id);
          const completedNames = progress.steps.filter(s => s.completed).map(s => s.config.name);
          setCompletedSteps(completedNames);
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [router]);

  const handleNext = async () => {
    setSaving(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Save current step data to profile
      const updateData: Record<string, any> = {};
      
      switch (currentStepData.name) {
        case 'account_security':
          updateData.two_factor_enabled = formData.two_factor_enabled;
          break;
        case 'profile_basics':
          updateData.first_name = formData.first_name;
          updateData.last_name = formData.last_name;
          updateData.title = formData.title;
          updateData.bio = formData.bio;
          updateData.phone = formData.phone;
          updateData.city = formData.city;
          updateData.country = formData.country;
          break;
        case 'expertise_mapping':
          updateData.expertise_areas = formData.expertise_areas;
          break;
        default:
          break;
      }

      if (Object.keys(updateData).length > 0) {
        await supabase.from('profiles').update(updateData).eq('id', user.id);
      }

      // Mark step as completed
      if (!completedSteps.includes(currentStepData.name)) {
        setCompletedSteps(prev => [...prev, currentStepData.name]);
      }

      // Move to next step
      if (currentStep < totalSteps - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        // Final step - submit profile
        await supabase.from('profiles').update({
          profile_status: 'pending_review',
          onboarding_progress: 100,
          onboarding_completed_at: new Date().toISOString(),
        }).eq('id', user.id);

        toast({
          title: "Profile Submitted!",
          description: "Your profile is now under review. We'll notify you once approved.",
        });
        
        router.push('/');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleExpertise = (id: string) => {
    if (formData.expertise_areas.includes(id)) {
      setFormData({
        ...formData,
        expertise_areas: formData.expertise_areas.filter(item => item !== id),
      });
    } else if (formData.expertise_areas.length < 7) {
      setFormData({
        ...formData,
        expertise_areas: [...formData.expertise_areas, id],
      });
    }
  };

  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { 
        id: formData.experience.length + 1, 
        role: "", company: "", duration: "", description: "" 
      }]
    });
  };

  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { 
        id: formData.education.length + 1, 
        degree: "", school: "", year: "" 
      }]
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card py-4 sticky top-0 z-10">
        <div className="container max-w-5xl mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">RE:</span>
            <span className="text-xl font-medium text-foreground">Profile Setup</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push('/')}>
              <Save className="h-4 w-4 mr-2" />
              Save & Exit
            </Button>
            <Badge variant="outline">
              {currentStep + 1} of {totalSteps}
            </Badge>
          </div>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar - Step Navigation */}
        <aside className="hidden lg:flex w-72 border-r border-border bg-card p-6 flex-col">
          <div className="space-y-1">
            {ONBOARDING_STEPS.map((step, index) => {
              const Icon = STEP_ICONS[step.name] || Check;
              const isCompleted = completedSteps.includes(step.name);
              const isCurrent = index === currentStep;
              
              return (
                <button
                  key={step.name}
                  onClick={() => isCompleted || index <= currentStep ? setCurrentStep(index) : null}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors
                    ${isCurrent ? 'bg-primary/10 text-primary' : 
                      isCompleted ? 'text-foreground hover:bg-muted' : 
                      'text-muted-foreground cursor-not-allowed'}
                  `}
                  disabled={!isCompleted && index > currentStep}
                >
                  <div className={`
                    h-8 w-8 rounded-full flex items-center justify-center text-sm
                    ${isCurrent ? 'bg-primary text-primary-foreground' :
                      isCompleted ? 'bg-primary/20 text-primary' :
                      'bg-muted text-muted-foreground'}
                  `}>
                    {isCompleted ? <Check className="h-4 w-4" /> : index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm truncate">{step.title}</div>
                    {step.required && (
                      <span className="text-xs text-muted-foreground">Required</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          
          <div className="mt-auto pt-6">
            <div className="text-xs text-muted-foreground mb-2">Overall Progress</div>
            <Progress value={progress} className="h-2" />
            <div className="text-xs text-muted-foreground mt-1">{Math.round(progress)}% Complete</div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          <div className="container max-w-3xl mx-auto py-8 px-4">
            {/* Mobile progress */}
            <div className="lg:hidden mb-6">
              <Progress value={progress} className="h-2" />
              <div className="text-xs text-muted-foreground mt-1 text-center">
                Step {currentStep + 1} of {totalSteps}
              </div>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  {(() => {
                    const Icon = STEP_ICONS[currentStepData.name] || Check;
                    return <Icon className="h-6 w-6 text-primary" />;
                  })()}
                  <div>
                    <CardTitle>{currentStepData.title}</CardTitle>
                    <CardDescription>{currentStepData.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Step 1: Account Security */}
                {currentStepData.name === 'account_security' && (
                  <div className="space-y-6">
                    <div className="p-4 border border-border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Lock className="h-5 w-5 text-primary" />
                          <div>
                            <div className="font-medium">Two-Factor Authentication</div>
                            <div className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account
                            </div>
                          </div>
                        </div>
                        <Switch
                          checked={formData.two_factor_enabled}
                          onCheckedChange={(checked) => setFormData({...formData, two_factor_enabled: checked})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="recovery_email">Recovery Email (Optional)</Label>
                      <Input 
                        id="recovery_email"
                        type="email"
                        placeholder="backup@email.com"
                        value={formData.recovery_email}
                        onChange={(e) => setFormData({...formData, recovery_email: e.target.value})}
                      />
                      <p className="text-xs text-muted-foreground">
                        Used if you lose access to your primary email
                      </p>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                        <Check className="h-4 w-4" />
                        <span className="font-medium">Email Verified</span>
                      </div>
                      <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                        {profile?.email}
                      </p>
                    </div>
                  </div>
                )}

                {/* Step 2: Profile Basics */}
                {currentStepData.name === 'profile_basics' && (
                  <div className="space-y-6">
                    <div className="flex items-center gap-6">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={profile?.avatar_url || assetPath("/placeholder-user.jpg")} />
                        <AvatarFallback className="text-lg">
                          {formData.first_name?.[0]}{formData.last_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Button variant="outline" size="sm" className="mb-2">
                          <Upload className="h-4 w-4 mr-2" />
                          Upload Photo
                        </Button>
                        <p className="text-xs text-muted-foreground">
                          400x400px recommended. Max 2MB.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="first_name">First Name *</Label>
                        <Input 
                          id="first_name"
                          value={formData.first_name}
                          onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last_name">Last Name *</Label>
                        <Input 
                          id="last_name"
                          value={formData.last_name}
                          onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="title">Professional Title</Label>
                      <Input 
                        id="title"
                        placeholder="e.g. Senior Family Governance Consultant"
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Professional Bio</Label>
                      <Textarea 
                        id="bio"
                        placeholder="Tell families about your background and approach..."
                        className="min-h-[120px]"
                        value={formData.bio}
                        onChange={(e) => setFormData({...formData, bio: e.target.value})}
                      />
                      <p className="text-xs text-muted-foreground text-right">
                        {formData.bio.length}/500 characters
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="city"
                            className="pl-10"
                            placeholder="New York"
                            value={formData.city}
                            onChange={(e) => setFormData({...formData, city: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input 
                          id="country"
                          placeholder="United States"
                          value={formData.country}
                          onChange={(e) => setFormData({...formData, country: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="website">Website</Label>
                        <div className="relative">
                          <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="website"
                            className="pl-10"
                            placeholder="https://your-site.com"
                            value={formData.website}
                            onChange={(e) => setFormData({...formData, website: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="linkedin">LinkedIn</Label>
                        <div className="relative">
                          <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            id="linkedin"
                            className="pl-10"
                            placeholder="linkedin.com/in/..."
                            value={formData.linkedin_url}
                            onChange={(e) => setFormData({...formData, linkedin_url: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Credentials */}
                {currentStepData.name === 'credentials' && (
                  <div className="space-y-8">
                    {/* Work Experience */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium flex items-center gap-2">
                          <Briefcase className="h-5 w-5 text-primary" />
                          Work Experience
                        </h3>
                        <Button variant="outline" size="sm" onClick={addExperience}>
                          + Add Position
                        </Button>
                      </div>
                      
                      {formData.experience.map((exp, index) => (
                        <div key={exp.id} className="p-4 border border-border rounded-lg space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Role / Title</Label>
                              <Input placeholder="e.g. Partner" />
                            </div>
                            <div className="space-y-2">
                              <Label>Company</Label>
                              <Input placeholder="e.g. Global Advisory Firm" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Duration</Label>
                            <Input placeholder="e.g. 2018 - Present" />
                          </div>
                          <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea placeholder="Key achievements..." className="h-20" />
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Education */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium flex items-center gap-2">
                          <GraduationCap className="h-5 w-5 text-primary" />
                          Education
                        </h3>
                        <Button variant="outline" size="sm" onClick={addEducation}>
                          + Add Education
                        </Button>
                      </div>

                      {formData.education.map((edu) => (
                        <div key={edu.id} className="p-4 border border-border rounded-lg space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label>Degree</Label>
                              <Input placeholder="e.g. MBA" />
                            </div>
                            <div className="space-y-2">
                              <Label>Institution</Label>
                              <Input placeholder="e.g. Harvard Business School" />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Year</Label>
                            <Input placeholder="e.g. 2015" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 4: Expertise Mapping */}
                {currentStepData.name === 'expertise_mapping' && (
                  <div className="space-y-6">
                    <p className="text-sm text-muted-foreground">
                      Select up to 7 areas where you can provide guidance. This helps match you with families.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {GOVERNANCE_MODULES.map((module) => (
                        <div 
                          key={module.id}
                          className={`
                            cursor-pointer p-4 rounded-lg border transition-all
                            ${formData.expertise_areas.includes(module.id) 
                              ? "border-primary bg-primary/5 ring-1 ring-primary" 
                              : "border-border hover:border-primary/50"}
                          `}
                          onClick={() => toggleExpertise(module.id)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium">{module.name}</h4>
                            {formData.expertise_areas.includes(module.id) && (
                              <Check className="h-4 w-4 text-primary" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{module.description}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-4 bg-muted/50 rounded-lg flex items-center gap-3">
                      <Award className="h-5 w-5 text-primary" />
                      <span className="text-sm">
                        <span className="font-medium">Selected: {formData.expertise_areas.length}/7</span>
                        <span className="text-muted-foreground ml-2">
                          Select at least 1 to continue
                        </span>
                      </span>
                    </div>
                  </div>
                )}

                {/* Step 5: Services & Pricing */}
                {currentStepData.name === 'services_pricing' && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="hourly_rate">Hourly Rate (USD)</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="hourly_rate"
                          type="number"
                          className="pl-10"
                          placeholder="250"
                          value={formData.hourly_rate}
                          onChange={(e) => setFormData({...formData, hourly_rate: e.target.value})}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <h3 className="font-medium">Service Packages</h3>
                      <div className="grid gap-4">
                        {[
                          { key: 'basic', name: 'Basic Package', desc: 'Initial consultation' },
                          { key: 'standard', name: 'Standard Package', desc: 'Monthly advisory' },
                          { key: 'premium', name: 'Premium Package', desc: 'Comprehensive support' },
                        ].map((pkg) => (
                          <div key={pkg.key} className="p-4 border border-border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <div className="font-medium">{pkg.name}</div>
                                <div className="text-sm text-muted-foreground">{pkg.desc}</div>
                              </div>
                              <div className="relative w-32">
                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input 
                                  type="number"
                                  className="pl-10"
                                  placeholder="0"
                                  value={formData.package_prices[pkg.key as keyof typeof formData.package_prices]}
                                  onChange={(e) => setFormData({
                                    ...formData, 
                                    package_prices: {
                                      ...formData.package_prices,
                                      [pkg.key]: e.target.value
                                    }
                                  })}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 6: Payments */}
                {currentStepData.name === 'payments' && (
                  <div className="space-y-6">
                    <div className="p-6 border-2 border-dashed border-border rounded-lg text-center">
                      <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-medium mb-2">Connect Payment Account</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Connect your Stripe account to receive payments from families
                      </p>
                      <Button>
                        Connect Stripe
                      </Button>
                    </div>
                    
                    <p className="text-xs text-muted-foreground text-center">
                      You can skip this step and set up payments later from Settings.
                    </p>
                  </div>
                )}

                {/* Step 7: KYC Verification */}
                {currentStepData.name === 'kyc_verification' && (
                  <div className="space-y-6">
                    <div className="p-6 border-2 border-dashed border-border rounded-lg text-center">
                      <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                      <h3 className="font-medium mb-2">Identity Verification</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Verify your identity to build trust with families
                      </p>
                      <Button>
                        Start Verification
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="text-sm font-medium">Government ID</div>
                        <Badge variant="outline" className="mt-1">Required</Badge>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="text-sm font-medium">Selfie</div>
                        <Badge variant="outline" className="mt-1">Required</Badge>
                      </div>
                      <div className="p-3 bg-muted rounded-lg">
                        <div className="text-sm font-medium">Address Proof</div>
                        <Badge variant="secondary" className="mt-1">Optional</Badge>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 8: Review & Submit */}
                {currentStepData.name === 'review_submit' && (
                  <div className="space-y-6">
                    <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <ClipboardCheck className="h-5 w-5 text-primary" />
                        Profile Ready for Review
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Please review your information before submitting. Our team will review 
                        your profile within 1-2 business days.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 border border-border rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="h-12 w-12">
                            <AvatarFallback>
                              {formData.first_name?.[0]}{formData.last_name?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {formData.first_name} {formData.last_name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {formData.title || 'No title set'}
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {formData.bio || 'No bio set'}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 border border-border rounded-lg">
                          <div className="text-sm text-muted-foreground">Location</div>
                          <div className="font-medium">
                            {formData.city && formData.country 
                              ? `${formData.city}, ${formData.country}` 
                              : 'Not set'}
                          </div>
                        </div>
                        <div className="p-4 border border-border rounded-lg">
                          <div className="text-sm text-muted-foreground">Expertise Areas</div>
                          <div className="font-medium">
                            {formData.expertise_areas.length} selected
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <input type="checkbox" id="confirm" className="mt-1" />
                      <label htmlFor="confirm" className="text-sm text-muted-foreground">
                        I confirm that all information provided is accurate and I agree to the 
                        <Link href="/terms" className="text-primary hover:underline mx-1">Terms of Service</Link>
                        and
                        <Link href="/privacy" className="text-primary hover:underline ml-1">Privacy Policy</Link>.
                      </label>
                    </div>
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex justify-between border-t border-border pt-6">
                <Button 
                  variant="outline" 
                  onClick={handleBack}
                  disabled={currentStep === 0 || saving}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back
                </Button>
                <Button onClick={handleNext} disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : currentStep === totalSteps - 1 ? (
                    <>
                      Submit Profile
                      <Check className="h-4 w-4 ml-2" />
                    </>
                  ) : (
                    <>
                      Continue
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}