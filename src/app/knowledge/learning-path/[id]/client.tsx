"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  Edit, 
  Share2, 
  MoreVertical, 
  FileText, 
  Video, 
  BookOpen, 
  Clock, 
  Users,
  Loader2,
  AlertCircle,
  ExternalLink,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { supabase } from "@/lib/supabaseClient";

// Types for learning path data (using learning_path_steps)
interface LearningStep {
  id: number;
  learning_path_id: number;
  title: string;
  description: string | null;
  content: string | null;
  step_order: number;
  estimated_duration_minutes: number | null;
  resource_id?: number | null;
  // Joined resource data if available (Supabase returns as array)
  knowledge_resources?: {
    id: number;
    title: string;
    type: string;
    external_url: string | null;
  }[] | null;
}

interface LearningPath {
  id: number;
  advisor_id: string;
  title: string;
  description: string | null;
  category: string | null;
  difficulty: string | null;
  estimated_duration_minutes: number | null;
  updated_at: string;
  steps: LearningStep[];
}

// Helper to format date
function formatUpdatedAt(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

// Helper to calculate total duration from steps
function calculateTotalDuration(steps: LearningStep[]): string {
  let totalMinutes = 0;
  
  steps.forEach(step => {
    if (step.estimated_duration_minutes) {
      totalMinutes += step.estimated_duration_minutes;
    }
  });
  
  if (totalMinutes === 0) return "N/A";
  if (totalMinutes < 60) return `${totalMinutes}m`;
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

// Helper to format duration
function formatDuration(minutes: number | null): string {
  if (!minutes) return "";
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export default function LearningPathDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [pathData, setPathData] = useState<LearningPath | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchLearningPath = async () => {
      setIsLoading(true);
      setError(null);
      
      // Validate that id is a valid number
      const numericId = parseInt(id, 10);
      if (isNaN(numericId) || numericId <= 0) {
        setError("Invalid learning path ID");
        setIsLoading(false);
        return;
      }
      
      try {
        // Fetch learning path with steps (using learning_path_steps)
        const { data, error: fetchError } = await supabase
          .from('learning_paths')
          .select(`
            id,
            advisor_id,
            title,
            description,
            category,
            difficulty,
            estimated_duration_minutes,
            updated_at,
            steps:learning_path_steps (
              id,
              learning_path_id,
              title,
              description,
              content,
              step_order,
              estimated_duration_minutes,
              knowledge_resources (
                id,
                title,
                type,
                external_url
              )
            )
          `)
          .eq('id', numericId)
          .single();

        if (fetchError) throw fetchError;

        if (data) {
          // Sort steps by step_order
          const sortedData: LearningPath = {
            ...data,
            steps: ((data.steps || []) as LearningStep[])
              .sort((a: LearningStep, b: LearningStep) => a.step_order - b.step_order)
          };
          setPathData(sortedData);
        }
      } catch (err) {
        console.error("Error fetching learning path:", err);
        setError("Failed to load learning path. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchLearningPath();
    }
  }, [id]);

  const toggleStepCompletion = (stepId: number) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading learning path...</p>
        </div>
      </div>
    );
  }

  if (error || !pathData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <h2 className="text-lg font-semibold">Learning Path Not Found</h2>
          <p className="text-muted-foreground">{error || "The requested learning path could not be found."}</p>
          <Link href="/knowledge">
            <Button variant="outline">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Library
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const steps = pathData.steps || [];
  const totalDuration = calculateTotalDuration(steps);
  const completedCount = completedSteps.size;
  const progress = steps.length > 0 ? Math.round((completedCount / steps.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container py-4">
          <div className="flex items-center justify-between mb-4">
            <Link href="/knowledge">
              <Button variant="ghost" size="sm" className="-ml-2">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back to Library
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Link href={`/knowledge/learning-path/${id}/edit`}>
                <Button variant="outline">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Path
                </Button>
              </Link>
              <Button>
                <Share2 className="h-4 w-4 mr-2" />
                Share with Family
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="capitalize">{pathData.category || 'general'}</Badge>
                <span className="text-sm text-muted-foreground">Last updated {formatUpdatedAt(pathData.updated_at)}</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">{pathData.title}</h1>
              <p className="text-lg text-muted-foreground">{pathData.description || 'No description available.'}</p>
            </div>
            <Card className="min-w-[250px]">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Steps</div>
                    <div className="text-2xl font-bold">{steps.length}</div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Est. Duration</div>
                    <div className="text-2xl font-bold">{totalDuration}</div>
                  </div>
                </div>
                {steps.length > 0 && (
                  <>
                    <Separator />
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium">Progress</span>
                        <span className="text-muted-foreground">{progress}%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {completedCount} of {steps.length} steps completed
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold">Learning Steps</h2>
            {steps.length === 0 ? (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center text-muted-foreground">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No steps added yet.</p>
                    <Link href={`/knowledge/learning-path/${id}/edit`}>
                      <Button variant="link" className="mt-2">Add Steps</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {steps.map((step, index) => {
                  const isCompleted = completedSteps.has(step.id);
                  // knowledge_resources is an array from Supabase join, get first item
                  const linkedResource = step.knowledge_resources?.[0] || null;
                  
                  return (
                    <Card key={step.id} className={isCompleted ? "border-primary/50 bg-primary/5" : ""}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => toggleStepCompletion(step.id)}
                              className="flex items-center justify-center h-8 w-8 rounded-full border-2 transition-colors hover:border-primary"
                            >
                              {isCompleted ? (
                                <CheckCircle2 className="h-5 w-5 text-primary" />
                              ) : (
                                <span className="text-sm font-medium text-muted-foreground">{index + 1}</span>
                              )}
                            </button>
                            <CardTitle className={`text-lg ${isCompleted ? "line-through text-muted-foreground" : ""}`}>
                              {step.title}
                            </CardTitle>
                          </div>
                          {step.estimated_duration_minutes && (
                            <Badge variant="outline">
                              <Clock className="h-3 w-3 mr-1" />
                              {formatDuration(step.estimated_duration_minutes)}
                            </Badge>
                          )}
                        </div>
                        {step.description && (
                          <CardDescription className="ml-11 mt-1">
                            {step.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="ml-11 pt-0 pb-6">
                        {step.content && (
                          <div className="prose prose-sm dark:prose-invert mb-4">
                            <p className="text-sm text-muted-foreground">{step.content}</p>
                          </div>
                        )}
                        {linkedResource && (
                          <div className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-background rounded-md border">
                                {linkedResource.type === 'video' ? <Video className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                              </div>
                              <div>
                                <div className="font-medium text-sm">{linkedResource.title}</div>
                                <div className="text-xs text-muted-foreground capitalize">
                                  {linkedResource.type}
                                </div>
                              </div>
                            </div>
                            {linkedResource.external_url && (
                              <Button variant="ghost" size="sm" asChild>
                                <a href={linkedResource.external_url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4 mr-1" />
                                  Open
                                </a>
                              </Button>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Assigned Families</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6 text-muted-foreground text-sm">
                  <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>Not assigned to any families yet.</p>
                  <Button variant="link" className="mt-2">Assign Now</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}