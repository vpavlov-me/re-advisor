"use client";

import { use } from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  Edit, 
  Share2, 
  MoreVertical, 
  FileText, 
  Video, 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Users 
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
import { ScrollArea } from "@/components/ui/scroll-area";

// Mock Data (Same as Edit page for consistency)
const mockPathData = {
  id: "lp-1",
  title: "Next-Gen Leadership Program",
  description: "A comprehensive program designed to prepare the next generation for leadership roles within the family enterprise.",
  category: "leadership",
  updatedAt: "2 days ago",
  author: "Victor Pavlov",
  modules: [
    { 
      id: "m1", 
      title: "Understanding Family Legacy", 
      description: "Exploring the history and values that built the family enterprise.", 
      duration: "45 min",
      resources: [
        { id: "4", title: "Intro to Family Governance", type: "video", duration: "15 min" },
        { id: "6", title: "Wealth Stewardship Principles", type: "article", duration: "30 min" }
      ] 
    },
    { 
      id: "m2", 
      title: "Financial Literacy Basics", 
      description: "Core financial concepts every family member should know.", 
      duration: "1h 15m",
      resources: [
        { id: "2", title: "Succession Planning Guide", type: "guide", duration: "1h 15m" }
      ] 
    }
  ]
};

export default function LearningPathDetailClient({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
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
                <Badge variant="secondary" className="capitalize">{mockPathData.category}</Badge>
                <span className="text-sm text-muted-foreground">Last updated {mockPathData.updatedAt}</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">{mockPathData.title}</h1>
              <p className="text-lg text-muted-foreground">{mockPathData.description}</p>
            </div>
            <Card className="min-w-[250px]">
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Modules</div>
                    <div className="text-2xl font-bold">{mockPathData.modules.length}</div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Est. Duration</div>
                    <div className="text-2xl font-bold">2h</div>
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
            <div className="space-y-4">
              {mockPathData.modules.map((module, index) => (
                <Card key={module.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted text-sm font-medium">
                          {index + 1}
                        </div>
                        <CardTitle className="text-lg">{module.title}</CardTitle>
                      </div>
                      <Badge variant="outline">{module.duration}</Badge>
                    </div>
                    <CardDescription className="ml-11 mt-1">
                      {module.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="ml-11 pt-0 pb-6">
                    <div className="space-y-3">
                      {module.resources.map((resource) => (
                        <div key={resource.id} className="flex items-center justify-between p-3 rounded-lg border bg-muted/30">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-background rounded-md border">
                              {resource.type === 'video' ? <Video className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                            </div>
                            <div>
                              <div className="font-medium text-sm">{resource.title}</div>
                              <div className="text-xs text-muted-foreground capitalize">{resource.type}</div>
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">View</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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