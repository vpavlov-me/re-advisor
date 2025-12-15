"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Heart, Scale, Users, TrendingUp, Clock, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";

// Workshop type definitions
interface WorkshopType {
  id: string;
  title: string;
  duration: number;
  progress: number;
  description: string;
  icon: typeof Heart;
  color: string;
}

const WORKSHOP_TYPES: WorkshopType[] = [
  {
    id: "assessment",
    title: "Assessment",
    duration: 60,
    progress: 72,
    description: "Understand where you are now — before building the rules",
    icon: Scale,
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: "values-mission-vision",
    title: "Values, Mission & Vision",
    duration: 120,
    progress: 55,
    description: "Your journey, values, shared purpose, and vision as family",
    icon: Heart,
    color: "bg-orange-100 text-orange-600"
  },
  {
    id: "decision-making",
    title: "Decision-Making & Conflict Management",
    duration: 180,
    progress: 0,
    description: "Governance framework covering family business employment, ownership, financial decisions, conflict resolution, and behavioral standards",
    icon: Users,
    color: "bg-purple-100 text-purple-600"
  },
  {
    id: "succession",
    title: "Succession & Development",
    duration: 180,
    progress: 0,
    description: "Succession planning, leadership criteria, and structured development timeline for next-generation business transition",
    icon: TrendingUp,
    color: "bg-green-100 text-green-600"
  }
];

export default function CreateWorkshopPage() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateWorkshop = async (type: string, startWith: 'continue' | 'restart' | 'advisor' | 'ai') => {
    setIsCreating(true);

    try {
      // TODO: Create workshop via API
      // For now, mock creation
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock workshop ID
      const workshopId = Math.floor(Math.random() * 1000);

      if (startWith === 'continue') {
        // Continue from last progress
        router.push(`/workshops/vmv/${workshopId}`);
      } else if (startWith === 'restart') {
        // Start from beginning
        toast.success("Workshop reset. Starting from the beginning.");
        router.push(`/workshops/vmv/${workshopId}/setup/format`);
      } else {
        // New workshop
        toast.success("Workshop created!");
        router.push(`/workshops/vmv/${workshopId}/setup/format`);
      }
    } catch (error) {
      console.error("Error creating workshop:", error);
      toast.error("Failed to create workshop");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 py-12 px-4">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/workshops/vmv">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Workshops
            </Link>
          </Button>
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-3">Constitution Setup</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Define how your family handles conflicts, makes decisions, and maintains governance.
              Create frameworks tailored to your family's values and needs.
            </p>
          </div>
        </div>

        {/* What's Next Section */}
        <Card className="mb-12 border-2 border-primary/20 bg-gradient-to-br from-white to-primary/5">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">What's Next?</CardTitle>
            <CardDescription className="text-base">
              Choose how you want to setup your constitution
            </CardDescription>
          </CardHeader>
        </Card>

        {/* Workshop Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {WORKSHOP_TYPES.map((workshop) => {
            const Icon = workshop.icon;
            const hasProgress = workshop.progress > 0;

            return (
              <Card
                key={workshop.id}
                className="relative overflow-hidden hover:shadow-lg transition-all border-2 hover:border-primary/30"
              >
                {/* Progress Indicator at Top */}
                {hasProgress && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-muted">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${workshop.progress}%` }}
                    />
                  </div>
                )}

                <CardHeader className="pb-4">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={`p-3 rounded-xl ${workshop.color}`}>
                      <Icon className="h-8 w-8" />
                    </div>

                    {/* Title & Duration */}
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{workshop.title}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{workshop.duration} min</span>
                        {hasProgress && (
                          <>
                            <span>•</span>
                            <span className="font-medium text-primary">
                              {workshop.progress}% complete
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {workshop.description}
                  </p>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3">
                    {hasProgress && (
                      <Button
                        onClick={() => handleCreateWorkshop(workshop.id, 'continue')}
                        disabled={isCreating}
                        className="w-full"
                      >
                        Continue
                      </Button>
                    )}

                    <Button
                      onClick={() => handleCreateWorkshop(workshop.id, hasProgress ? 'restart' : 'advisor')}
                      disabled={isCreating}
                      variant={hasProgress ? "outline" : "default"}
                      className="w-full"
                    >
                      {hasProgress ? "Restart" : "Start with Advisor"}
                    </Button>

                    {hasProgress && (
                      <Button
                        onClick={() => handleCreateWorkshop(workshop.id, 'restart')}
                        disabled={isCreating}
                        variant="outline"
                        className="w-full"
                      >
                        Restart
                      </Button>
                    )}

                    <Button
                      onClick={() => handleCreateWorkshop(workshop.id, 'ai')}
                      disabled={isCreating}
                      variant="outline"
                      className="w-full"
                    >
                      Start with AI
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Footer Help Text */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Need help choosing? Our AI can guide you through the best workshop for your family's stage.</p>
        </div>
      </div>
    </div>
  );
}
