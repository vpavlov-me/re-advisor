"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import {
  Home,
  ChevronRight,
  ArrowLeft,
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
  Share2,
  Edit,
  Trash2,
  Download,
  Users,
  Loader2,
  Save,
  Eye,
  EyeOff,
  ExternalLink,
  Copy,
  Clock,
  Folder
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ResourceDetailSkeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Checkbox } from "@/components/ui/checkbox";

// Resource Types
type ResourceType =
  | "document"
  | "article"
  | "video"
  | "podcast"
  | "template"
  | "guide"
  | "link"
  | "checklist"
  | "learning-path"
  | "constitution-template";

interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  category: string;
  description: string;
  content?: string;
  file_url?: string;
  external_url?: string;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  advisor_id: string;
}

interface ResourceShare {
  id: number;
  family_id: number;
  shared_at: string;
  family: {
    id: number;
    name: string;
  };
}

interface Family {
  id: number;
  name: string;
}

const getIconForType = (type: ResourceType) => {
  switch (type) {
    case "document": return FileText;
    case "article": return LayoutTemplate;
    case "video": return Video;
    case "podcast": return Mic;
    case "template": return File;
    case "guide": return BookOpen;
    case "link": return LinkIcon;
    case "checklist": return CheckSquare;
    case "learning-path": return GraduationCap;
    case "constitution-template": return Star;
    default: return File;
  }
};

const categories = ["Governance", "Succession", "Wealth Management", "Conflict Resolution", "Education", "Legal", "Financial Planning"];

export default function ResourceDetailPage() {
  const router = useRouter();
  const params = useParams();
  const resourceId = params.id as string;

  const [resource, setResource] = useState<Resource | null>(null);
  const [shares, setShares] = useState<ResourceShare[]>([]);
  const [families, setFamilies] = useState<Family[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isUnsavedDialogOpen, setIsUnsavedDialogOpen] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);

  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedFamilies, setSelectedFamilies] = useState<number[]>([]);

  // Edit form state
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    content: "",
    category: "",
    type: "document" as ResourceType,
    external_url: "",
    is_featured: false,
    is_published: true
  });

  // Track unsaved changes
  useEffect(() => {
    if (isEditing && resource) {
      const hasChanges = 
        editForm.title !== resource.title ||
        editForm.description !== resource.description ||
        editForm.content !== (resource.content || "") ||
        editForm.category !== resource.category ||
        editForm.type !== resource.type ||
        editForm.external_url !== (resource.external_url || "") ||
        editForm.is_featured !== resource.is_featured ||
        editForm.is_published !== resource.is_published;
      setHasUnsavedChanges(hasChanges);
    } else {
      setHasUnsavedChanges(false);
    }
  }, [editForm, isEditing, resource]);

  // Warn before page unload with unsaved changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Handle navigation with unsaved changes
  const handleNavigation = (href: string) => {
    if (hasUnsavedChanges) {
      setPendingNavigation(href);
      setIsUnsavedDialogOpen(true);
    } else {
      router.push(href);
    }
  };

  const confirmNavigation = () => {
    setIsUnsavedDialogOpen(false);
    if (pendingNavigation) {
      router.push(pendingNavigation);
    }
    setPendingNavigation(null);
  };

  const cancelNavigation = () => {
    setIsUnsavedDialogOpen(false);
    setPendingNavigation(null);
  };

  const fetchResource = useCallback(async () => {
    try {
      // Check if it's a constitution template
      if (resourceId.startsWith('ct-')) {
        const templateId = parseInt(resourceId.replace('ct-', ''));
        const { data: templateData, error } = await supabase
          .from('constitution_templates')
          .select('*')
          .eq('id', templateId)
          .single();

        if (error) throw error;

        if (templateData) {
          const resource: Resource = {
            id: resourceId,
            title: templateData.title,
            type: "constitution-template",
            category: "Governance",
            description: templateData.description || "",
            content: templateData.content || "",
            is_featured: false,
            is_published: true,
            created_at: templateData.created_at,
            updated_at: templateData.updated_at,
            advisor_id: templateData.advisor_id
          };
          setResource(resource);
          setEditForm({
            title: resource.title,
            description: resource.description,
            content: resource.content || "",
            category: resource.category,
            type: resource.type,
            external_url: "",
            is_featured: resource.is_featured,
            is_published: resource.is_published
          });
        }
      } else {
        // Regular resource
        const { data: resourceData, error } = await supabase
          .from('knowledge_resources')
          .select('*')
          .eq('id', parseInt(resourceId))
          .single();

        if (error) throw error;

        if (resourceData) {
          const resource: Resource = {
            id: resourceData.id.toString(),
            title: resourceData.title,
            type: resourceData.type as ResourceType,
            category: resourceData.category || "General",
            description: resourceData.description || "",
            content: resourceData.content || "",
            file_url: resourceData.file_url,
            external_url: resourceData.external_url,
            is_featured: resourceData.is_featured || false,
            is_published: resourceData.is_published || true,
            created_at: resourceData.created_at,
            updated_at: resourceData.updated_at,
            advisor_id: resourceData.advisor_id
          };
          setResource(resource);
          setEditForm({
            title: resource.title,
            description: resource.description,
            content: resource.content || "",
            category: resource.category,
            type: resource.type,
            external_url: resource.external_url || "",
            is_featured: resource.is_featured,
            is_published: resource.is_published
          });

          // Fetch shares
          const { data: sharesData } = await supabase
            .from('resource_shares')
            .select(`
              id,
              family_id,
              created_at,
              families (id, name)
            `)
            .eq('resource_id', parseInt(resourceId));

          if (sharesData) {
            setShares(sharesData.map((s: any) => ({
              id: s.id,
              family_id: s.family_id,
              shared_at: s.created_at,
              family: s.families
            })));
          }
        }
      }
    } catch (error) {
      console.error("Error fetching resource:", error);
      toast.error("Resource not found");
      router.push("/knowledge");
    } finally {
      setIsLoading(false);
    }
  }, [resourceId, router]);

  const fetchFamilies = useCallback(async (advisorId: string) => {
    const { data } = await supabase
      .from('families')
      .select('id, name')
      .eq('advisor_id', advisorId);

    if (data) {
      setFamilies(data);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        await fetchFamilies(user.id);
      }
      await fetchResource();
    };
    init();
  }, [fetchResource, fetchFamilies]);

  const handleSave = async () => {
    if (!resource || !userId) return;

    setIsSaving(true);
    try {
      if (resource.id.startsWith('ct-')) {
        const templateId = parseInt(resource.id.replace('ct-', ''));
        const { error } = await supabase
          .from('constitution_templates')
          .update({
            title: editForm.title,
            description: editForm.description,
            content: editForm.content,
            updated_at: new Date().toISOString()
          })
          .eq('id', templateId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('knowledge_resources')
          .update({
            title: editForm.title,
            description: editForm.description,
            content: editForm.content,
            category: editForm.category,
            type: editForm.type,
            external_url: editForm.external_url || null,
            is_featured: editForm.is_featured,
            is_published: editForm.is_published,
            updated_at: new Date().toISOString()
          })
          .eq('id', parseInt(resource.id));

        if (error) throw error;
      }

      setResource({
        ...resource,
        ...editForm,
        updated_at: new Date().toISOString()
      });
      setIsEditing(false);
      toast.success("Resource updated successfully");
    } catch (error) {
      console.error("Error saving resource:", error);
      toast.error("Failed to save resource");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!resource) return;

    setIsDeleting(true);
    try {
      if (resource.id.startsWith('ct-')) {
        const templateId = parseInt(resource.id.replace('ct-', ''));
        const { error } = await supabase
          .from('constitution_templates')
          .delete()
          .eq('id', templateId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('knowledge_resources')
          .delete()
          .eq('id', parseInt(resource.id));

        if (error) throw error;
      }

      toast.success("Resource deleted");
      router.push("/knowledge");
    } catch (error) {
      console.error("Error deleting resource:", error);
      toast.error("Failed to delete resource");
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const handleShare = async () => {
    if (!resource || !userId || selectedFamilies.length === 0 || resource.id.startsWith('ct-')) return;

    setIsSharing(true);
    try {
      const shares = selectedFamilies.map(familyId => ({
        resource_id: parseInt(resource.id),
        family_id: familyId,
        shared_by: userId
      }));

      const { error } = await supabase
        .from('resource_shares')
        .upsert(shares, { onConflict: 'resource_id,family_id' });

      if (error) throw error;

      // Refetch shares
      const { data: newShares } = await supabase
        .from('resource_shares')
        .select(`
          id,
          family_id,
          created_at,
          families (id, name)
        `)
        .eq('resource_id', parseInt(resource.id));

      if (newShares) {
        setShares(newShares.map((s: any) => ({
          id: s.id,
          family_id: s.family_id,
          shared_at: s.created_at,
          family: s.families
        })));
      }

      toast.success(`Shared with ${selectedFamilies.length} families`);
      setIsShareDialogOpen(false);
      setSelectedFamilies([]);
    } catch (error) {
      console.error("Error sharing:", error);
      toast.error("Failed to share resource");
    } finally {
      setIsSharing(false);
    }
  };

  const handleRemoveShare = async (shareId: number) => {
    try {
      const { error } = await supabase
        .from('resource_shares')
        .delete()
        .eq('id', shareId);

      if (error) throw error;

      setShares(shares.filter(s => s.id !== shareId));
      toast.success("Share removed");
    } catch (error) {
      console.error("Error removing share:", error);
      toast.error("Failed to remove share");
    }
  };

  const toggleFeatured = async () => {
    if (!resource || resource.id.startsWith('ct-')) return;

    try {
      const { error } = await supabase
        .from('knowledge_resources')
        .update({ is_featured: !resource.is_featured })
        .eq('id', parseInt(resource.id));

      if (error) throw error;

      setResource({ ...resource, is_featured: !resource.is_featured });
      toast.success(resource.is_featured ? "Removed from featured" : "Added to featured");
    } catch (error) {
      console.error("Error toggling featured:", error);
      toast.error("Failed to update");
    }
  };

  if (isLoading) {
    return <ResourceDetailSkeleton />;
  }

  if (!resource) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-lg font-medium mb-2">Resource not found</h2>
          <Button asChild>
            <Link href="/knowledge">Back to Knowledge Center</Link>
          </Button>
        </div>
      </div>
    );
  }

  const Icon = getIconForType(resource.type);

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Header Section */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        {/* Breadcrumb */}
        <div className="bg-card/50 border-b border-border/50">
          <div className="container py-2">
            <div className="flex items-center gap-2 text-sm">
              <Home className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Home</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              <button 
                onClick={() => handleNavigation("/knowledge")} 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Knowledge Center
              </button>
              <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
              <span className="text-foreground font-medium truncate max-w-[200px]">
                {resource.title}
              </span>
            </div>
          </div>
        </div>

        {/* Header Actions */}
        <div className="container py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="icon" 
                className="shrink-0"
                onClick={() => handleNavigation("/knowledge")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h1 className="text-lg font-semibold truncate">{resource.title}</h1>
                    {resource.is_featured && (
                      <Badge variant="warning" className="shrink-0">
                        <Star className="h-3 w-3 mr-1 fill-current" /> Featured
                      </Badge>
                    )}
                    {!resource.is_published && (
                      <Badge variant="secondary" className="shrink-0">
                        <EyeOff className="h-3 w-3 mr-1" /> Draft
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <Badge variant="outline" className="capitalize text-xs">
                      {resource.type.replace("-", " ")}
                    </Badge>
                    <span className="hidden sm:flex items-center gap-1">
                      <Folder className="h-3 w-3" />
                      {resource.category}
                    </span>
                    <span className="hidden md:flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Updated {new Date(resource.updated_at).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {shares.length}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              {!isEditing ? (
                <>
                  <Button variant="outline" size="sm" onClick={() => setIsShareDialogOpen(true)} className="hidden sm:flex">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm" onClick={toggleFeatured} className="hidden md:flex">
                    <Star className={`h-4 w-4 mr-2 ${resource.is_featured ? "fill-yellow-400 text-yellow-400" : ""}`} />
                    {resource.is_featured ? "Unfeature" : "Feature"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                    <Edit className="h-4 w-4 sm:mr-2" />
                    <span className="hidden sm:inline">Edit</span>
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive hidden sm:flex" onClick={() => setIsDeleteDialogOpen(true)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(false)} disabled={isSaving}>
                    Cancel
                  </Button>
                  <Button size="sm" onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container py-6">        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {isEditing ? (
              <Card>
                <CardHeader>
                  <CardTitle>Edit Resource</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select
                        value={editForm.type}
                        onValueChange={(v) => setEditForm({ ...editForm, type: v as ResourceType })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="document">Document</SelectItem>
                          <SelectItem value="article">Article</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                          <SelectItem value="podcast">Podcast</SelectItem>
                          <SelectItem value="template">Template</SelectItem>
                          <SelectItem value="guide">Guide</SelectItem>
                          <SelectItem value="link">External Link</SelectItem>
                          <SelectItem value="checklist">Checklist</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Select
                        value={editForm.category}
                        onValueChange={(v) => setEditForm({ ...editForm, category: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  {editForm.type === "link" && (
                    <div className="space-y-2">
                      <Label>External URL</Label>
                      <Input
                        type="url"
                        placeholder="https://..."
                        value={editForm.external_url}
                        onChange={(e) => setEditForm({ ...editForm, external_url: e.target.value })}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Content</Label>
                    <Textarea
                      value={editForm.content}
                      onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                      rows={12}
                      placeholder="Enter the main content of your resource..."
                    />
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={editForm.is_featured}
                        onCheckedChange={(checked) => setEditForm({ ...editForm, is_featured: !!checked })}
                      />
                      <label htmlFor="featured" className="text-sm font-medium">
                        Featured resource
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="published"
                        checked={editForm.is_published}
                        onCheckedChange={(checked) => setEditForm({ ...editForm, is_published: !!checked })}
                      />
                      <label htmlFor="published" className="text-sm font-medium">
                        Published
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                {/* Description Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Description</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {resource.description || "No description provided."}
                    </p>
                  </CardContent>
                </Card>

                {/* Content Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {resource.external_url && (
                      <div className="mb-4 p-4 bg-muted/50 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <ExternalLink className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">External Resource</p>
                            <a
                              href={resource.external_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-sm text-primary hover:underline"
                            >
                              {resource.external_url}
                            </a>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={resource.external_url} target="_blank" rel="noopener noreferrer">
                            Open Link
                            <ExternalLink className="h-4 w-4 ml-2" />
                          </a>
                        </Button>
                      </div>
                    )}

                    {resource.file_url && (
                      <div className="mb-4 p-4 bg-muted/50 rounded-lg flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <FileText className="h-5 w-5 text-primary" />
                          <div>
                            <p className="text-sm font-medium">Attached File</p>
                            <p className="text-sm text-muted-foreground">Document</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    )}

                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      {resource.content ? (
                        <div className="whitespace-pre-wrap">{resource.content}</div>
                      ) : (
                        <p className="text-muted-foreground italic">No content added yet.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>

          {/* Right - Sidebar */}
          <div className="space-y-6">
            {/* Sharing Card */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Shared With</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setIsShareDialogOpen(true)}>
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {shares.length === 0 ? (
                  <div className="text-center py-6 text-muted-foreground">
                    <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Not shared with any families yet</p>
                    <Button
                      variant="link"
                      size="sm"
                      className="mt-2"
                      onClick={() => setIsShareDialogOpen(true)}
                    >
                      Share this resource
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {shares.map((share) => (
                      <div key={share.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {share.family.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{share.family.name}</p>
                            <p className="text-xs text-muted-foreground">
                              Shared {new Date(share.shared_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemoveShare(share.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Details Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Created</span>
                  <span>{new Date(resource.created_at).toLocaleDateString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Last updated</span>
                  <span>{new Date(resource.updated_at).toLocaleDateString()}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant={resource.is_published ? "default" : "secondary"}>
                    {resource.is_published ? "Published" : "Draft"}
                  </Badge>
                </div>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Featured</span>
                  <span>{resource.is_featured ? "Yes" : "No"}</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Copy className="h-4 w-4 mr-2" />
                  Duplicate Resource
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export as PDF
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview as Family
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Share Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share Resource</DialogTitle>
            <DialogDescription>
              Select families to share "{resource.title}" with.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            {families.length === 0 ? (
              <div className="border rounded-md p-4 text-center text-muted-foreground">
                No families found. Create a family first.
              </div>
            ) : (
              <div className="border rounded-md p-4 space-y-3 max-h-[200px] overflow-y-auto">
                {families.map((family) => {
                  const isAlreadyShared = shares.some(s => s.family_id === family.id);
                  return (
                    <div key={family.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`family-${family.id}`}
                        checked={selectedFamilies.includes(family.id) || isAlreadyShared}
                        disabled={isAlreadyShared}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedFamilies([...selectedFamilies, family.id]);
                          } else {
                            setSelectedFamilies(selectedFamilies.filter(id => id !== family.id));
                          }
                        }}
                      />
                      <label
                        htmlFor={`family-${family.id}`}
                        className={`text-sm font-medium leading-none ${isAlreadyShared ? 'text-muted-foreground' : ''}`}
                      >
                        {family.name}
                        {isAlreadyShared && " (already shared)"}
                      </label>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsShareDialogOpen(false); setSelectedFamilies([]); }} disabled={isSharing}>
              Cancel
            </Button>
            <Button onClick={handleShare} disabled={isSharing || selectedFamilies.length === 0}>
              {isSharing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sharing...
                </>
              ) : (
                `Share with ${selectedFamilies.length} ${selectedFamilies.length === 1 ? 'family' : 'families'}`
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resource</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{resource.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Unsaved Changes Warning */}
      <AlertDialog open={isUnsavedDialogOpen} onOpenChange={setIsUnsavedDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. Are you sure you want to leave? Your changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelNavigation}>Stay</AlertDialogCancel>
            <AlertDialogAction onClick={confirmNavigation}>
              Leave Without Saving
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
