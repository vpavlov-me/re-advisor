"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Heart,
  Target,
  Users,
  Plus,
  Clock,
  CheckCircle2,
  PlayCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatusBadge } from "@/components/ui/status-badge";
import { Spinner } from "@/components/ui/spinner";

// Workshop type definition
interface Workshop {
  id: number;
  title: string;
  type: 'vmv' | 'assessment' | 'decision-making' | 'succession';
  duration: number; // minutes
  progress: number; // 0-100
  status: 'draft' | 'scheduled' | 'in-progress' | 'completed';
  family_name: string;
  scheduled_date?: string;
  description: string;
}

export default function VMVWorkshopsPage() {
  const router = useRouter();
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch workshops from API
    // For now, mock data
    setTimeout(() => {
      setWorkshops([
        {
          id: 1,
          title: "Values, Mission & Vision Workshop",
          type: 'vmv',
          duration: 120,
          progress: 13,
          status: 'draft',
          family_name: "Ivanov Family",
          description: "Define core values, mission statement, and long-term vision for your family."
        }
      ]);
      setIsLoading(false);
    }, 500);
  }, []);

  const handleCreateNew = () => {
    router.push('/workshops/vmv/create');
  };

  const getWorkshopIcon = (type: string) => {
    switch (type) {
      case 'vmv':
        return Heart;
      case 'assessment':
        return CheckCircle2;
      case 'decision-making':
        return Target;
      case 'succession':
        return Users;
      default:
        return Heart;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'in-progress':
        return 'text-blue-600 bg-blue-50';
      case 'scheduled':
        return 'text-purple-600 bg-purple-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="container py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Family Workshops</h1>
            <p className="text-muted-foreground">
              Structured sessions to define your family's values, mission, and vision
            </p>
          </div>
          <Button onClick={handleCreateNew} size="lg">
            <Plus className="h-5 w-5 mr-2" />
            New Workshop
          </Button>
        </div>
      </div>

      {/* Workshop Cards */}
      {workshops.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="p-4 bg-muted rounded-full">
              <Heart className="h-12 w-12 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">No workshops yet</h3>
              <p className="text-muted-foreground mb-6">
                Create your first Values, Mission & Vision workshop to get started
              </p>
              <Button onClick={handleCreateNew}>
                <Plus className="h-4 w-4 mr-2" />
                Create Workshop
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workshops.map((workshop) => {
            const Icon = getWorkshopIcon(workshop.type);

            return (
              <Card key={workshop.id} className="flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-primary/10`}>
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <StatusBadge status={workshop.status} />
                  </div>
                  <CardTitle className="text-xl">{workshop.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {workshop.family_name}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {workshop.description}
                  </p>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{workshop.duration} min</span>
                  </div>

                  {workshop.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{workshop.progress}%</span>
                      </div>
                      <Progress value={workshop.progress} className="h-2" />
                    </div>
                  )}
                </CardContent>

                <CardFooter className="flex gap-2">
                  {workshop.progress > 0 && workshop.status !== 'completed' ? (
                    <Button asChild className="flex-1">
                      <Link href={`/workshops/vmv/${workshop.id}`}>
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Continue
                      </Link>
                    </Button>
                  ) : workshop.status === 'completed' ? (
                    <Button asChild variant="outline" className="flex-1">
                      <Link href={`/workshops/vmv/${workshop.id}/session/summary`}>
                        View Results
                      </Link>
                    </Button>
                  ) : (
                    <Button asChild className="flex-1">
                      <Link href={`/workshops/vmv/${workshop.id}/setup/format`}>
                        Start Setup
                      </Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
