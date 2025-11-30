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
  AlertCircle
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

// Types for learning path data
interface LearningResource {
  id: number;
  module_id: number;
  title: string;
  type: string;
  duration: string | null;
  content_url: string | null;
  order_index: number;
}

interface LearningModule {
  id: number;
  learning_path_id: number;
  title: string;
  description: string | null;
  order_index: number;
  learning_resources: LearningResource[];
}

interface LearningPath {
  id: number;
  advisor_id: string;
  title: string;
  description: string | null;
  category: string | null;
  updated_at: string;
  learning_modules: LearningModule[];
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

// Helper to calculate total duration from modules
function calculateTotalDuration(modules: LearningModule[]): string {
  let totalMinutes = 0;
  
  modules.forEach(module => {
    module.learning_resources.forEach(resource => {
      if (resource.duration) {
        // Parse duration strings like "15 min", "1h 30m", "2h"
        const hourMatch = resource.duration.match(/(\d+)\s*h/);
        const minMatch = resource.duration.match(/(\d+)\s*m/);
        
        if (hourMatch) totalMinutes += parseInt(hourMatch[1]) * 60;
        if (minMatch) totalMinutes += parseInt(minMatch[1]);
      }
    });
  });
  
  if (totalMinutes === 0) return "N/A";
  if (totalMinutes < 60) return `${totalMinutes}m`;
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export default function LearningPathDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [pathData, setPathData] = useState<LearningPath | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLearningPath = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch learning path with modules and resources using joins
        const { data, error: fetchError } = await supabase
          .from('learning_paths')
          .select(`
            id,
            advisor_id,
            title,
            description,
            category,
            updated_at,
            learning_modules (
              id,
              learning_path_id,
              title,
              description,
              order_index,
              learning_resources (
                id,
                module_id,
                title,
                type,
                duration,
                content_url,
                order_index
              )
            )
          `)
          .eq('id', id)
          .single();

        if (fetchError) throw fetchError;

        if (data) {
          // Sort modules and resources by order_index
          const sortedData = {
            ...data,
            learning_modules: (data.learning_modules || [])
              .sort((a: LearningModule, b: LearningModule) => a.order_index - b.order_index)
              .map((module: LearningModule) => ({
                ...module,
                learning_resources: (module.learning_resources || [])
                  .sort((a: LearningResource, b: LearningResource) => a.order_index - b.order_index)
              }))
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

  const modules = pathData.learning_modules || [];
  const totalDuration = calculateTotalDuration(modules);

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
                    <div className="text-sm font-medium">Modules</div>
                    <div className="text-2xl font-bold">{modules.length}</div>
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold">Program Curriculum</h2>
            {modules.length === 0 ? (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center text-muted-foreground">
                    <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No modules added yet.</p>
                    <Link href={`/knowledge/learning-path/${id}/edit`}>
                      <Button variant="link" className="mt-2">Add Modules</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {modules.map((module, index) => (
                  <Card key={module.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-sm font-medium">
                            {index + 1}
                          </div>
                          <CardTitle className="text-lg">{module.title}</CardTitle>
                        </div>
                      </div>
                      {module.description && (
                        <CardDescription className="ml-11 mt-1">
                          {module.description}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent className="ml-11 pt-0 pb-6">
                      {module.learning_resources.length === 0 ? (
                        <p className="text-sm text-muted-foreground">No resources in this module.</p>
                      ) : (
                        <div className="space-y-3">
                          {module.learning_resources.map((resource) => (
                            <div key={resource.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-background rounded-md border">
                                  {resource.type === 'video' ? <Video className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                                </div>
                                <div>
                                  <div className="font-medium text-sm">{resource.title}</div>
                                  <div className="text-xs text-muted-foreground capitalize">
                                    {resource.type}{resource.duration ? ` • ${resource.duration}` : ''}
                                  </div>
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">View</Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
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