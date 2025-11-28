"use client";

import { useState, useEffect } from "react";
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  BookOpen, 
  Users, 
  Scale, 
  Shield, 
  Flag,
  Target,
  Heart,
  Gavel,
  FileText,
  Save,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

// --- Educational Carousel Data ---
const carouselSlides = [
  {
    id: 1,
    title: "Welcome to Family Governance",
    description: "Establish a lasting legacy through structured governance.",
    content: "Family governance is not just about rules; it's about creating a shared understanding of how your family makes decisions, manages wealth, and supports each other across generations.",
    icon: Users,
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: 2,
    title: "Why a Constitution Matters",
    description: "A blueprint for your family's future.",
    content: "Your Family Constitution serves as the supreme guiding document. It articulates your values, vision, and the rules of engagement that keep the family united during times of change.",
    icon: BookOpen,
    color: "bg-purple-100 text-purple-600"
  },
  {
    id: 3,
    title: "The Role of the Family Council",
    description: "Leadership for the family circle.",
    content: "The Family Council acts as the representative body for the family, organizing meetings, fostering education, and serving as the bridge between the family and the business.",
    icon: Shield,
    color: "bg-green-100 text-green-600"
  },
  {
    id: 4,
    title: "Decision Making Frameworks",
    description: "Fair and transparent decisions.",
    content: "Clear decision-making processes prevent conflict. We'll help you define how decisions are made, who makes them, and how to handle disagreements constructively.",
    icon: Scale,
    color: "bg-orange-100 text-orange-600"
  },
  {
    id: 5,
    title: "Your Journey Starts Here",
    description: "Let's build your constitution together.",
    content: "In the next few steps, we will guide you through drafting the core elements of your Family Constitution. You can save your progress at any time.",
    icon: Flag,
    color: "bg-indigo-100 text-indigo-600"
  }
];

// --- Constitution Wizard Steps ---
const wizardSteps = [
  { id: 1, title: "Family Values", icon: Heart, description: "What principles guide us?" },
  { id: 2, title: "Family Vision", icon: Target, description: "Where are we going?" },
  { id: 3, title: "Family Mission", icon: Flag, description: "What is our purpose?" },
  { id: 4, title: "Governance Structure", icon: Users, description: "How are we organized?" },
  { id: 5, title: "Decision Making", icon: Scale, description: "How do we decide?" },
  { id: 6, title: "Conflict Resolution", icon: Gavel, description: "How do we resolve disputes?" },
  { id: 7, title: "Amendment Process", icon: FileText, description: "How do we change rules?" },
  { id: 8, title: "Review & Finalize", icon: Check, description: "Ready to sign?" },
];

export default function FamilyOnboardingPage() {
  const [mode, setMode] = useState<"carousel" | "wizard">("carousel");
  
  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Wizard State
  const [currentStep, setCurrentStep] = useState(1);
  const [constitutionData, setConstitutionData] = useState({
    values: "",
    vision: "",
    mission: "",
    structure: "",
    decisionMaking: "",
    conflictResolution: "",
    amendmentProcess: "",
  });

  // Carousel Auto-play
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (mode === "carousel" && isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [mode, isPlaying]);

  const handleCarouselNext = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    setIsPlaying(false);
  };

  const handleCarouselPrev = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
    setIsPlaying(false);
  };

  const startWizard = () => {
    setMode("wizard");
  };

  const handleWizardNext = () => {
    if (currentStep < wizardSteps.length) {
      setCurrentStep(prev => prev + 1);
    } else {
      console.log("Constitution Completed:", constitutionData);
      alert("Constitution Draft Created!");
    }
  };

  const handleWizardBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const updateData = (field: string, value: string) => {
    setConstitutionData(prev => ({ ...prev, [field]: value }));
  };

  // --- Render Carousel ---
  if (mode === "carousel") {
    const slide = carouselSlides[currentSlide];
    const Icon = slide.icon;

    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <Card className="w-full max-w-4xl shadow-xl overflow-hidden border-0">
          <div className="grid md:grid-cols-2 h-[600px]">
            {/* Left Side: Visual */}
            <div className={`p-12 flex flex-col justify-center items-center text-center ${slide.color} transition-colors duration-500`}>
              <div className="bg-white p-6 rounded-full shadow-lg mb-8">
                <Icon className="h-16 w-16" />
              </div>
              <h2 className="text-3xl font-bold mb-4">{slide.title}</h2>
              <p className="text-lg opacity-90">{slide.description}</p>
            </div>

            {/* Right Side: Content & Controls */}
            <div className="p-12 flex flex-col justify-between bg-white">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs uppercase tracking-wider">
                    Step {currentSlide + 1} of {carouselSlides.length}
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={startWizard} className="text-muted-foreground hover:text-primary">
                    Skip Intro
                  </Button>
                </div>
                
                <div className="space-y-4 mt-8">
                  <h3 className="text-2xl font-semibold text-slate-900">{slide.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {slide.content}
                  </p>
                </div>
              </div>

              <div className="space-y-8">
                {/* Progress Indicators */}
                <div className="flex justify-center gap-2">
                  {carouselSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => { setCurrentSlide(idx); setIsPlaying(false); }}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentSlide ? "w-8 bg-primary" : "w-2 bg-slate-200"
                      }`}
                    />
                  ))}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between gap-4">
                  <Button variant="outline" onClick={handleCarouselPrev} disabled={currentSlide === 0}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                  
                  {currentSlide === carouselSlides.length - 1 ? (
                    <Button onClick={startWizard} className="flex-1">
                      Start Constitution Setup
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  ) : (
                    <Button onClick={handleCarouselNext} className="flex-1">
                      Next
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // --- Render Wizard ---
  const currentStepData = wizardSteps.find(s => s.id === currentStep);
  const StepIcon = currentStepData?.icon || FileText;
  const progress = (currentStep / wizardSteps.length) * 100;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>

            <h1 className="text-2xl font-bold text-slate-900">Family Constitution Setup</h1>
            <p className="text-slate-500">Drafting your family's guiding principles</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => alert("Progress saved!")}>
              <Save className="h-4 w-4 mr-2" />
              Save Draft
            </Button>
            <Button variant="ghost" className="text-muted-foreground">
              Exit
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar: Steps */}
          <Card className="lg:col-span-1 h-fit">
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium mb-2">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
              
              <div className="space-y-1">
                {wizardSteps.map((step) => (
                  <div 
                    key={step.id}
                    className={`flex items-center gap-3 p-3 rounded-lg text-sm transition-colors ${
                      step.id === currentStep 
                        ? "bg-primary/10 text-primary font-medium" 
                        : step.id < currentStep 
                          ? "text-muted-foreground" 
                          : "text-slate-400"
                    }`}
                  >
                    <div className={`flex items-center justify-center w-6 h-6 rounded-full border ${
                      step.id === currentStep 
                        ? "border-primary bg-primary text-white" 
                        : step.id < currentStep 
                          ? "border-primary text-primary" 
                          : "border-slate-300"
                    }`}>
                      {step.id < currentStep ? <Check className="h-3 w-3" /> : step.id}
                    </div>
                    <span>{step.title}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Main Content: Form */}
          <Card className="lg:col-span-3">
            <CardHeader className="border-b pb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <StepIcon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">Step {currentStep}: {currentStepData?.title}</CardTitle>
                  <CardDescription className="text-base mt-1">{currentStepData?.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 min-h-[400px]">
              {/* Dynamic Form Content based on Step */}
              <div className="space-y-6 max-w-2xl">
                {currentStep === 1 && (
                  <>
                    <div className="space-y-4">
                      <Label className="text-base">What are the core values that define your family?</Label>
                      <p className="text-sm text-muted-foreground">Examples: Integrity, Stewardship, Unity, Innovation.</p>
                      <Textarea 
                        placeholder="Enter your family values..." 
                        className="min-h-[200px] text-base"
                        value={constitutionData.values}
                        onChange={(e) => updateData("values", e.target.value)}
                      />
                    </div>
                  </>
                )}
                {currentStep === 2 && (
                  <>
                    <div className="space-y-4">
                      <Label className="text-base">What is your shared vision for the future?</Label>
                      <p className="text-sm text-muted-foreground">Describe where you want the family to be in 10, 20, or 50 years.</p>
                      <Textarea 
                        placeholder="Enter your family vision..." 
                        className="min-h-[200px] text-base"
                        value={constitutionData.vision}
                        onChange={(e) => updateData("vision", e.target.value)}
                      />
                    </div>
                  </>
                )}
                {/* Placeholder for other steps */}
                {currentStep > 2 && currentStep < 8 && (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    <p>Content for {currentStepData?.title} goes here.</p>
                    <p className="text-sm mt-2">This is a placeholder for the prototype.</p>
                  </div>
                )}
                {currentStep === 8 && (
                  <div className="space-y-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                      <Check className="h-12 w-12 text-green-600 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-green-900">Ready to Finalize</h3>
                      <p className="text-green-700 mt-2">You have completed all sections of the constitution draft.</p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Summary of your draft:</h4>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Values defined</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Vision statement created</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Governance structure outlined</li>
                        <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> Decision making process established</li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="border-t p-6 flex justify-between bg-slate-50/50">
              <Button variant="outline" onClick={handleWizardBack} disabled={currentStep === 1}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <Button onClick={handleWizardNext}>
                {currentStep === wizardSteps.length ? "Finish & Create" : "Save & Continue"}
                {currentStep !== wizardSteps.length && <ChevronRight className="h-4 w-4 ml-2" />}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
