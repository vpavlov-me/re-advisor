"use client";

import { useMemo } from "react";
import Link from "next/link";
import { 
  User, 
  Award, 
  Briefcase, 
  CreditCard, 
  Calendar,
  CheckCircle2,
  Circle,
  ChevronRight,
  Rocket,
  PartyPopper
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { OnboardingProgress, OnboardingStepConfig } from "@/lib/onboarding";

// Map step names to icons
const stepIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  User,
  Award,
  Briefcase,
  CreditCard,
  Calendar,
};

// Map step names to routes
const stepRoutes: Record<string, string> = {
  profile_basics: '/profile',
  credentials: '/profile#credentials',
  services: '/services',
  stripe_setup: '/payments',
  availability: '/consultations',
};

interface OnboardingProgressCardProps {
  progress: OnboardingProgress;
  onSkipStep?: (stepName: string) => void;
  showSkipOption?: boolean;
  className?: string;
}

export function OnboardingProgressCard({
  progress,
  onSkipStep,
  showSkipOption = true,
  className,
}: OnboardingProgressCardProps) {
  // Get icon component for a step
  const getStepIcon = (iconName: string) => {
    return stepIcons[iconName] || Circle;
  };

  if (progress.isComplete) {
    return (
      <Card className={cn("border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/20", className)}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
              <PartyPopper className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-green-700 dark:text-green-300">
                Onboarding Complete!
              </h3>
              <p className="text-sm text-green-600 dark:text-green-400">
                You're all set up and ready to connect with families.
              </p>
            </div>
            <Button asChild>
              <Link href="/">
                Go to Dashboard
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-primary" />
              Getting Started
            </CardTitle>
            <CardDescription>
              Complete these steps to start receiving consultation requests
            </CardDescription>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-primary">{progress.percentage}%</span>
            <p className="text-xs text-muted-foreground">
              {progress.currentStep - 1} of {progress.totalSteps} complete
            </p>
          </div>
        </div>
        <Progress value={progress.percentage} className="h-2 mt-4" />
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-3">
          {progress.steps.map((step, index) => {
            const Icon = getStepIcon(step.config.icon);
            const route = stepRoutes[step.config.name] || '/';
            const isNext = !step.completed && 
              progress.steps.slice(0, index).every(s => s.completed || !s.config.required);

            return (
              <div
                key={step.config.name}
                className={cn(
                  "flex items-center gap-4 p-3 rounded-lg transition-colors",
                  step.completed 
                    ? "bg-green-50/50 dark:bg-green-900/10" 
                    : isNext 
                      ? "bg-primary/5 border border-primary/20" 
                      : "bg-muted/30"
                )}
              >
                {/* Step indicator */}
                <div className={cn(
                  "h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0",
                  step.completed 
                    ? "bg-green-100 dark:bg-green-900" 
                    : isNext
                      ? "bg-primary/10"
                      : "bg-muted"
                )}>
                  {step.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <Icon className={cn(
                      "h-5 w-5",
                      isNext ? "text-primary" : "text-muted-foreground"
                    )} />
                  )}
                </div>

                {/* Step info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className={cn(
                      "font-medium text-sm",
                      step.completed 
                        ? "text-green-700 dark:text-green-300" 
                        : "text-foreground"
                    )}>
                      {step.config.title}
                    </h4>
                    {step.config.required && !step.completed && (
                      <span className="text-xs text-destructive">Required</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {step.config.description}
                  </p>
                </div>

                {/* Action */}
                <div className="flex items-center gap-2">
                  {step.completed ? (
                    <span className="text-xs text-green-600 dark:text-green-400">
                      Complete
                    </span>
                  ) : isNext ? (
                    <Button size="sm" asChild>
                      <Link href={route}>
                        Start
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </Button>
                  ) : (
                    <span className="text-xs text-muted-foreground">
                      Locked
                    </span>
                  )}
                  
                  {/* Skip option for optional steps */}
                  {showSkipOption && !step.config.required && !step.completed && isNext && onSkipStep && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs"
                      onClick={() => onSkipStep(step.config.name)}
                    >
                      Skip
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

// Compact version for sidebar
export function OnboardingProgressCompact({
  progress,
  className,
}: {
  progress: OnboardingProgress;
  className?: string;
}) {
  if (progress.isComplete) return null;

  return (
    <Card className={cn("p-4", className)}>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Setup Progress</span>
          <span className="text-sm font-semibold text-primary">{progress.percentage}%</span>
        </div>
        <Progress value={progress.percentage} className="h-2" />
        {progress.nextStep && (
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href={stepRoutes[progress.nextStep.name] || '/'}>
              Next: {progress.nextStep.title}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        )}
      </div>
    </Card>
  );
}

// Horizontal stepper for onboarding page
export function OnboardingStepper({
  progress,
  className,
}: {
  progress: OnboardingProgress;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      {progress.steps.map((step, index) => {
        const Icon = stepIcons[step.config.icon] || Circle;
        const isLast = index === progress.steps.length - 1;
        const isCurrent = !step.completed && 
          progress.steps.slice(0, index).every(s => s.completed);

        return (
          <div key={step.config.name} className="flex items-center flex-1">
            {/* Step circle */}
            <div className="flex flex-col items-center">
              <div className={cn(
                "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-colors",
                step.completed 
                  ? "bg-green-500 border-green-500 text-white" 
                  : isCurrent
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-muted bg-muted text-muted-foreground"
              )}>
                {step.completed ? (
                  <CheckCircle2 className="h-5 w-5" />
                ) : (
                  <Icon className="h-5 w-5" />
                )}
              </div>
              <span className={cn(
                "text-xs mt-2 text-center max-w-[80px]",
                step.completed 
                  ? "text-green-600 font-medium" 
                  : isCurrent
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
              )}>
                {step.config.title}
              </span>
            </div>

            {/* Connector line */}
            {!isLast && (
              <div className={cn(
                "flex-1 h-0.5 mx-2 mt-[-20px]",
                step.completed ? "bg-green-500" : "bg-muted"
              )} />
            )}
          </div>
        );
      })}
    </div>
  );
}
