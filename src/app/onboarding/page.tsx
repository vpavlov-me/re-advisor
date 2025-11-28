"use client";

import { useState } from "react";
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
  Building2,
  Calendar,
  Award
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

// Governance Modules
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

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    photo: null,
    bio: "",
    title: "",
    website: "",
    linkedin: "",
    
    // Step 2: Experience
    experience: [
      { id: 1, role: "", company: "", duration: "", description: "" }
    ],
    education: [
      { id: 1, degree: "", school: "", year: "" }
    ],

    // Step 3: Expertise
    expertise: [] as string[],
    primaryExpertise: [] as string[]
  });

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Submit form
      console.log("Form submitted:", formData);
      // Redirect to dashboard (mock)
      window.location.href = "/";
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const toggleExpertise = (id: string) => {
    if (formData.expertise.includes(id)) {
      setFormData({
        ...formData,
        expertise: formData.expertise.filter(item => item !== id),
        primaryExpertise: formData.primaryExpertise.filter(item => item !== id)
      });
    } else {
      if (formData.expertise.length < 7) {
        setFormData({
          ...formData,
          expertise: [...formData.expertise, id]
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card py-4">
        <div className="container max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">RE:</span>
            <span className="text-xl font-medium text-foreground">Advisor Onboarding</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <div className="text-sm text-muted-foreground">
              Step {step} of {totalSteps}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container max-w-3xl mx-auto py-8">
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
        </div>

        <Card>
          {step === 1 && (
            <>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Let's start with your professional identity. This will be visible to families.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Photo Upload */}
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback className="text-lg">UP</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm" className="mb-2">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Photo
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Recommended: 400x400px, JPG or PNG. Max 2MB.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
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
                    <Label htmlFor="website">Website</Label>
                    <Input 
                      id="website" 
                      placeholder="https://your-firm.com" 
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  <Textarea 
                    id="bio" 
                    placeholder="Tell families about your background and approach..." 
                    className="min-h-[150px]"
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {formData.bio.length}/500 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input 
                    id="linkedin" 
                    placeholder="https://linkedin.com/in/your-profile" 
                    value={formData.linkedin}
                    onChange={(e) => setFormData({...formData, linkedin: e.target.value})}
                  />
                </div>
              </CardContent>
            </>
          )}

          {step === 2 && (
            <>
              <CardHeader>
                <CardTitle>Experience & Education</CardTitle>
                <CardDescription>
                  Highlight your qualifications to build trust with potential clients.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Work Experience */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      Work Experience
                    </h3>
                    <Button variant="outline" size="sm">
                      <Check className="h-4 w-4 mr-2" />
                      Add Position
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
                        <Textarea placeholder="Key responsibilities and achievements..." className="h-20" />
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Education */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 text-primary" />
                      Education
                    </h3>
                    <Button variant="outline" size="sm">
                      <Check className="h-4 w-4 mr-2" />
                      Add Education
                    </Button>
                  </div>

                  {formData.education.map((edu, index) => (
                    <div key={edu.id} className="p-4 border border-border rounded-lg space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Degree</Label>
                          <Input placeholder="e.g. MBA" />
                        </div>
                        <div className="space-y-2">
                          <Label>School / University</Label>
                          <Input placeholder="e.g. Harvard Business School" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Year of Graduation</Label>
                        <Input placeholder="e.g. 2015" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </>
          )}

          {step === 3 && (
            <>
              <CardHeader>
                <CardTitle>Expertise & Specialization</CardTitle>
                <CardDescription>
                  Select up to 7 areas where you can provide guidance. This helps match you with families.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {GOVERNANCE_MODULES.map((module) => (
                    <div 
                      key={module.id}
                      className={`
                        cursor-pointer p-4 rounded-lg border transition-all
                        ${formData.expertise.includes(module.id) 
                          ? "border-primary bg-primary/5 ring-1 ring-primary" 
                          : "border-border hover:border-primary/50"}
                      `}
                      onClick={() => toggleExpertise(module.id)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-foreground">{module.name}</h4>
                        {formData.expertise.includes(module.id) && (
                          <Check className="h-4 w-4 text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{module.description}</p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-muted/50 rounded-lg flex items-center gap-3">
                  <Award className="h-5 w-5 text-primary" />
                  <div className="text-sm">
                    <span className="font-medium text-foreground">Selected: {formData.expertise.length}/7</span>
                    <span className="text-muted-foreground mx-2">|</span>
                    <span className="text-muted-foreground">Select at least 1 module to continue.</span>
                  </div>
                </div>
              </CardContent>
            </>
          )}

          <CardFooter className="flex justify-between border-t border-border pt-6">
            <Button 
              variant="outline" 
              onClick={handleBack}
              disabled={step === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button onClick={handleNext}>
              {step === totalSteps ? "Complete Profile" : "Continue"}
              {step !== totalSteps && <ChevronRight className="h-4 w-4 ml-2" />}
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}