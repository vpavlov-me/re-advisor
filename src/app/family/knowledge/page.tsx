"use client";

import { useEffect, useState, useCallback } from "react";
import {
  getUserFamilyMembership,
  getSharedResourcesForFamily,
  getFamilyConstitutionsForFamily,
  type SharedResourceWithDetails
} from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import Link from "next/link";
import { toast } from "sonner";
import { 
  Home, 
  ChevronRight, 
  Search,
  FileText,
  Video,
  Link as LinkIcon,
  File,
  Mic,
  LayoutTemplate,
  BookOpen,
  CheckSquare,
  GraduationCap,
  Star,
  ExternalLink,
  Eye,
  Clock,
  LayoutGrid,
  List,
  Filter
} from "lucide-react";

// UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Types
type ResourceType = 
  | "document" 
  | "article" 
  | "video" 
  | "link" 
  | "guide" 
  | "template" 
  | "checklist" 
  | "podcast"
  | "learning-path"
  | "constitution-template";

// Use imported SharedResourceWithDetails as SharedResource
type SharedResource = SharedResourceWithDetails;

interface FamilyConstitution {
  id: number;
  family_id: number;
  family_name: string;
  name: string;
  sections: Record<string, { title: string; content: string }>;
  status: "draft" | "review" | "approved";
  created_at: string;
  updated_at: string;
}

// Helper functions
const getIconForType = (type: string) => {
  const icons: Record<ResourceType, typeof FileText> = {
    "document": FileText,
    "article": LayoutTemplate,
    "video": Video,
    "link": LinkIcon,
    "guide": BookOpen,
    "template": File,
    "checklist": CheckSquare,
    "podcast": Mic,
    "learning-path": GraduationCap,
    "constitution-template": Star,
  };
  return icons[type as ResourceType] || FileText;
};

const getColorForType = (type: string) => {
  const colors: Record<ResourceType, string> = {
    "document": "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",
    "article": "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
    "video": "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300",
    "link": "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",
    "guide": "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",
    "template": "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300",
    "checklist": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300",
    "podcast": "bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300",
    "learning-path": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300",
    "constitution-template": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300",
  };
  return colors[type as ResourceType] || "bg-gray-100 text-gray-700";
};

export default function FamilyKnowledgeCenterPage() {
  const router = useRouter();

  // State
  const [isLoading, setIsLoading] = useState(true);
  const [familyName, setFamilyName] = useState<string>("");

  const [sharedResources, setSharedResources] = useState<SharedResource[]>([]);
  const [constitutions, setConstitutions] = useState<FamilyConstitution[]>([]);

  // URL-synced state with nuqs
  const [searchQuery, setSearchQuery] = useQueryState("q", { defaultValue: "" });
  const [selectedType, setSelectedType] = useQueryState("type", { defaultValue: "all" });
  const [viewMode, setViewMode] = useQueryState<"grid" | "list">("view", {
    defaultValue: "grid",
    parse: (value: string): "grid" | "list" => (value === "list" ? "list" : "grid"),
    serialize: (value: "grid" | "list") => value
  });

  // Date formatter for locale-aware dates
  const dateFormatter = new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric"
  });

  // Fetch user's family info and shared resources
  const fetchData = useCallback(async () => {
    try {
      // Get user's family membership
      const membership = await getUserFamilyMembership();
      if (!membership) {
        toast.error("You are not a member of any family");
        router.push("/");
        return;
      }

      const currentFamilyId = membership.family.id;
      setFamilyName(membership.family.name);

      // Fetch shared resources for this family
      const resources = await getSharedResourcesForFamily(currentFamilyId, membership.family.name);
      setSharedResources(resources);

      // Fetch family constitutions
      const constitutionsData = await getFamilyConstitutionsForFamily(currentFamilyId);
      if (constitutionsData) {
        setConstitutions(constitutionsData.map((c: {
          id: number;
          family_id: number;
          name: string;
          sections: Record<string, { title: string; content: string }>;
          status: "draft" | "review" | "approved";
          created_at: string;
          updated_at: string;
        }) => ({
          ...c,
          family_name: membership.family.name
        })));
      }

    } catch (error) {
      console.error("Error fetching family knowledge:", error);
      toast.error("Failed to load shared resources");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter resources
  const filteredResources = sharedResources.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || r.type === selectedType;
    return matchesSearch && matchesType;
  });

  // Loading state with skeleton
  if (isLoading) {
    return (
      <div className="space-y-6 p-6">
        {/* Breadcrumb skeleton */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-16 bg-muted animate-pulse rounded" />
          <div className="h-4 w-4 bg-muted animate-pulse rounded" />
          <div className="h-4 w-40 bg-muted animate-pulse rounded" />
        </div>

        {/* Header skeleton */}
        <div className="space-y-2">
          <div className="h-8 w-48 bg-muted animate-pulse rounded" />
          <div className="h-4 w-64 bg-muted animate-pulse rounded" />
        </div>

        {/* Tabs skeleton */}
        <div className="h-10 w-80 bg-muted animate-pulse rounded" />

        {/* Toolbar skeleton */}
        <div className="flex gap-4">
          <div className="h-10 flex-1 bg-muted animate-pulse rounded" />
          <div className="h-10 w-[150px] bg-muted animate-pulse rounded" />
          <div className="h-10 w-20 bg-muted animate-pulse rounded" />
        </div>

        {/* Cards skeleton grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="h-9 w-9 bg-muted rounded-lg" />
                <div className="h-5 w-12 bg-muted rounded" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  <div className="h-6 w-3/4 bg-muted rounded" />
                  <div className="h-4 w-full bg-muted rounded" />
                  <div className="h-4 w-2/3 bg-muted rounded" />
                </div>
                <div className="h-4 w-32 bg-muted rounded mb-4" />
                <div className="flex gap-2">
                  <div className="h-9 flex-1 bg-muted rounded" />
                  <div className="h-9 w-20 bg-muted rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/" className="flex items-center gap-1 hover:text-foreground transition-colors">
          <Home className="h-4 w-4" />
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-medium">Family Knowledge Center</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Knowledge Center</h1>
          <p className="text-muted-foreground">
            Resources shared with {familyName}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="resources" className="space-y-6">
        <TabsList>
          <TabsTrigger value="resources">
            Shared Resources ({sharedResources.length})
          </TabsTrigger>
          <TabsTrigger value="constitution">
            Family Constitution ({constitutions.length})
          </TabsTrigger>
        </TabsList>

        {/* Shared Resources Tab */}
        <TabsContent value="resources" className="space-y-6">
          {/* Toolbar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-[150px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="document">Documents</SelectItem>
                  <SelectItem value="article">Articles</SelectItem>
                  <SelectItem value="video">Videos</SelectItem>
                  <SelectItem value="podcast">Podcasts</SelectItem>
                  <SelectItem value="guide">Guides</SelectItem>
                  <SelectItem value="template">Templates</SelectItem>
                  <SelectItem value="checklist">Checklists</SelectItem>
                  <SelectItem value="link">Links</SelectItem>
                </SelectContent>
              </Select>
              
              <TooltipProvider>
                <div className="flex">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={viewMode === "grid" ? "secondary" : "ghost"}
                        size="icon"
                        className="rounded-r-none"
                        onClick={() => setViewMode("grid")}
                        aria-label="Grid view"
                      >
                        <LayoutGrid className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Grid view</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={viewMode === "list" ? "secondary" : "ghost"}
                        size="icon"
                        className="rounded-l-none"
                        onClick={() => setViewMode("list")}
                        aria-label="List view"
                      >
                        <List className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>List view</TooltipContent>
                  </Tooltip>
                </div>
              </TooltipProvider>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground">
            {filteredResources.length} {filteredResources.length === 1 ? "resource" : "resources"} available
          </p>

          {/* Resources Grid/List */}
          {filteredResources.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-medium mb-2">No resources shared yet</h3>
              <p className="text-muted-foreground">
                Your advisor will share educational resources with you here.
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredResources.map((resource) => {
                const Icon = getIconForType(resource.type);
                return (
                  <Card key={resource.id} className="group hover:shadow-md transition-all hover:border-primary/50">
                    <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                      <div className={`p-2 rounded-lg ${getColorForType(resource.type)}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <Badge variant="outline" className="text-xs">
                        v{resource.version}
                      </Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4">
                        <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-1">{resource.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4">
                        <Clock className="h-3 w-3" />
                        <span>Shared {dateFormatter.format(new Date(resource.shared_at))}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {resource.external_url && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            asChild
                          >
                            <a href={resource.external_url} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Open
                            </a>
                          </Button>
                        )}
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="space-y-2">
              {filteredResources.map((resource) => {
                const Icon = getIconForType(resource.type);
                return (
                  <Card key={resource.id} className="hover:shadow-sm transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg shrink-0 ${getColorForType(resource.type)}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium truncate">{resource.title}</h3>
                            <Badge variant="outline" className="text-xs shrink-0">
                              v{resource.version}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{resource.description}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-xs text-muted-foreground hidden sm:block">
                            {dateFormatter.format(new Date(resource.shared_at))}
                          </span>
                          {resource.external_url && (
                            <Button variant="outline" size="sm" asChild>
                              <a
                                href={resource.external_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Open ${resource.title} in new tab`}
                              >
                                <ExternalLink className="h-4 w-4" />
                              </a>
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        {/* Family Constitution Tab */}
        <TabsContent value="constitution" className="space-y-6">
          {constitutions.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-medium mb-2">No Family Constitution yet</h3>
              <p className="text-muted-foreground">
                Your advisor will share a Family Constitution template with you when ready.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {constitutions.map((constitution) => (
                <Card key={constitution.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Star className="h-5 w-5 text-primary fill-primary/20" />
                      </div>
                      <Badge 
                        variant={
                          constitution.status === "approved" ? "default" :
                          constitution.status === "review" ? "secondary" : "outline"
                        }
                      >
                        {constitution.status === "approved" ? "Approved" :
                         constitution.status === "review" ? "Under Review" : "Draft"}
                      </Badge>
                    </div>
                    <CardTitle className="mt-4">{constitution.name}</CardTitle>
                    <CardDescription>
                      Last updated: {dateFormatter.format(new Date(constitution.updated_at))}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="text-sm text-muted-foreground">
                        {Object.keys(constitution.sections || {}).length} sections defined
                      </div>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      View Constitution
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
