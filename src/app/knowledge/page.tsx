"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  getKnowledgeResources,
  getDeletedResources,
  createKnowledgeResource,
  updateKnowledgeResource,
  deleteKnowledgeResource,
  permanentDeleteKnowledgeResource,
  restoreKnowledgeResource,
  duplicateKnowledgeResource,
  getResourceFolders,
  createResourceFolder,
  deleteResourceFolder,
  moveResourceToFolder,
  getConstitutionTemplates,
  getLearningPaths,
  deleteLearningPath,
  shareResource,
  toggleResourceFeatured,
  shareResourceWithVersioning,
  shareConstitutionTemplateToFamily,
  duplicateConstitutionTemplate,
  duplicateLearningPath,
  deleteConstitutionTemplate
} from "@/lib/supabase";
import { getFamilies } from "@/lib/supabase/families";
import { getProfile } from "@/lib/supabase/profile";
import { getCurrentUser } from "@/lib/auth";
import { toast } from "sonner";
import { 
  Home, 
  ChevronRight, 
  Search,
  Filter,
  Plus,
  FileText,
  Video,
  Link as LinkIcon,
  File,
  Mic,
  LayoutTemplate,
  BookOpen,
  CheckSquare,
  GraduationCap,
  MoreVertical,
  Folder,
  Share2,
  Star,
  Trash2,
  Copy,
  Edit,
  Download,
  Users,
  Eye,
  Loader2,
  AlertTriangle,
  X,
  Clock,
  ExternalLink,
  Save,
  EyeOff,
  ArrowLeft,
  LayoutGrid,
  List,
  ChevronDown,
  FolderOpen,
  Tag,
  SlidersHorizontal,
  PanelLeftClose,
  PanelLeft,
  RotateCcw,
  FolderPlus,
  MoveRight,
  Archive
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

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
  updatedAt: string;
  sharedWith: number;
  isFeatured: boolean;
  description: string;
  folder_id?: number | null;
  folder_name?: string | null;
  deleted_at?: string | null;
  content?: string;
  external_url?: string;
}

interface ResourceFolder {
  id: number;
  name: string;
  advisor_id: string;
  created_at: string;
}

// Extended resource with full details for the detail view
interface ResourceDetail extends Resource {
  content?: string;
  file_url?: string;
  external_url?: string;
  is_published: boolean;
  created_at: string;
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

interface ConstitutionSection {
  id: number;
  section_number: number;
  title: string;
  content: string | null;
  is_required: boolean;
}

interface LearningPathModule {
  id: string;
  title: string;
  description?: string;
  resources?: string[];
  duration_minutes?: number;
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

function KnowledgeCenterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [resources, setResources] = useState<Resource[]>([]);
  const [families, setFamilies] = useState<Family[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [selectedFamilies, setSelectedFamilies] = useState<number[]>([]);
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  
  // Folder states
  const [folders, setFolders] = useState<ResourceFolder[]>([]);
  const [selectedFolderId, setSelectedFolderId] = useState<number | null>(null);
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [isMoveToFolderOpen, setIsMoveToFolderOpen] = useState(false);
  
  // Sharing status filter
  const [sharingFilter, setSharingFilter] = useState<"all" | "shared" | "not-shared">("all");
  
  // Deleted resources (soft delete)
  const [deletedResources, setDeletedResources] = useState<Resource[]>([]);
  const [showDeleted, setShowDeleted] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  
  // User profile for notifications
  const [userProfile, setUserProfile] = useState<{ first_name: string; last_name: string } | null>(null);
  
  // View mode state
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showSidebar, setShowSidebar] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      // Fetch user profile for notifications via abstraction layer
      try {
        const profileData = await getProfile();
        if (profileData) {
          setUserProfile({ first_name: profileData.first_name || '', last_name: profileData.last_name || '' });
        }
      } catch (e) {
        console.error("Error fetching profile:", e);
      }

      // Fetch folders via abstraction layer
      try {
        const foldersData = await getResourceFolders();
        if (foldersData) {
          setFolders(foldersData);
        }
      } catch (e) {
        console.log("resource_folders table not found - migration may not be applied");
        setFolders([]);
      }

      // Fetch active resources via abstraction layer
      let resourcesData: any[] | null = null;
      try {
        resourcesData = await getKnowledgeResources();
      } catch (e) {
        console.error("Error fetching resources:", e);
      }

      // Fetch deleted resources (soft deleted) via abstraction layer
      try {
        const deletedData = await getDeletedResources();
        if (deletedData) {
          const deleted = deletedData.map((r: any) => ({
            id: r.id.toString(),
            title: r.title,
            type: r.type as ResourceType,
            category: r.category || "General",
            updatedAt: r.updated_at ? new Date(r.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            sharedWith: 0,
            isFeatured: r.is_featured || false,
            description: r.description || "",
            deleted_at: r.deleted_at,
            content: r.content,
            external_url: r.external_url
          }));
          setDeletedResources(deleted);
        }
      } catch (e) {
        console.log("deleted_at column not found - migration may not be applied");
        setDeletedResources([]);
      }
      
      // Fetch constitution templates via abstraction layer
      const templatesData = await getConstitutionTemplates();

      // Fetch learning paths via abstraction layer
      const learningPathsData = await getLearningPaths();

      // Fetch families for sharing via abstraction layer
      try {
        const familiesData = await getFamilies();
        if (familiesData) {
          setFamilies(familiesData.map((f: any) => ({ id: f.id, name: f.name })));
        }
      } catch (e) {
        console.error("Error fetching families:", e);
      }

      let allResources: Resource[] = [];

      if (resourcesData) {
        allResources = resourcesData.map((r: any) => ({
          id: r.id.toString(),
          title: r.title,
          type: r.type as ResourceType,
          category: r.category || "General",
          updatedAt: r.updated_at ? new Date(r.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          sharedWith: r.shares?.[0]?.count || 0,
          isFeatured: r.is_featured || false,
          description: r.description || "",
          folder_id: r.folder_id,
          folder_name: r.folder?.name || null,
          content: r.content,
          external_url: r.external_url
        }));
      }

      if (templatesData) {
        const templates = templatesData.map((t: any) => ({
          id: `ct-${t.id}`,
          title: t.title,
          type: "constitution-template" as ResourceType,
          category: "Governance",
          updatedAt: t.updated_at ? new Date(t.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          sharedWith: 0,
          isFeatured: false,
          description: t.description || "Constitution Template"
        }));
        allResources = [...allResources, ...templates];
      }

      if (learningPathsData) {
        const paths = learningPathsData.map((p: any) => ({
          id: `lp-${p.id}`,
          title: p.title,
          type: "learning-path" as ResourceType,
          category: p.difficulty === 'advanced' ? 'Advanced' : p.difficulty === 'intermediate' ? 'Intermediate' : 'Beginner',
          updatedAt: p.updated_at ? new Date(p.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          sharedWith: 0,
          isFeatured: false,
          description: p.description || "Learning Path"
        }));
        allResources = [...allResources, ...paths];
      }

      setResources(allResources);
    } catch (error) {
      console.error("Error fetching resources:", error);
      toast.error("Failed to load resources");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      const user = await getCurrentUser();
      if (user) {
        setUserId(user.id);
        fetchData();
      } else {
        setIsLoading(false);
      }
    };
    init();
  }, [fetchData]);

  // Navigate to resource detail page
  const navigateToResource = (resourceId: string, editMode = false) => {
    // Handle constitution templates - route to dedicated page
    if (resourceId.startsWith('ct-')) {
      const templateId = resourceId.replace('ct-', '');
      router.push(`/knowledge/constitution/${templateId}`);
      return;
    }
    
    // Handle learning paths - route to detail or edit page
    if (resourceId.startsWith('lp-')) {
      const pathId = resourceId.replace('lp-', '');
      const url = editMode 
        ? `/knowledge/learning-path/${pathId}/edit` 
        : `/knowledge/learning-path/${pathId}`;
      router.push(url);
      return;
    }
    
    // Regular resources
    const url = editMode ? `/knowledge/${resourceId}?edit=true` : `/knowledge/${resourceId}`;
    router.push(url);
  };

  // Form state
  const [newResourceType, setNewResourceType] = useState<string>("");
  const [categories, setCategories] = useState(["Governance", "Succession", "Wealth Management", "Conflict Resolution"]);
  const [newCategory, setNewCategory] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  
  // Create Resource Form State
  const [newResource, setNewResource] = useState({
    title: "",
    description: "",
    type: "document" as ResourceType,
    category: "Governance",
    content: "",
    external_url: "",
    is_published: true,
    is_featured: false,
    thumbnail_url: ""
  });

  // Check if type requires URL (not file upload)
  const requiresUrl = (type: ResourceType): boolean => {
    return ["document", "template", "checklist", "podcast", "video", "link"].includes(type);
  };

  // Check if type uses rich text content
  const usesRichTextContent = (type: ResourceType): boolean => {
    return ["article", "guide"].includes(type);
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
      setIsAddingCategory(false);
    }
  };

  // Filter logic with sharing status support
  const filteredResources = resources.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || r.type === selectedType;
    const matchesFolder = !selectedFolderId || r.folder_id === selectedFolderId;
    const matchesSharingStatus = sharingFilter === "all" || 
                                  (sharingFilter === "shared" && r.sharedWith > 0) ||
                                  (sharingFilter === "not-shared" && r.sharedWith === 0);
    const matchesCategory = !selectedCategory || r.category === selectedCategory;
    return matchesSearch && matchesType && matchesFolder && matchesSharingStatus && matchesCategory;
  });
  
  // Helper to get folder name by ID
  const getSelectedFolderName = () => {
    if (!selectedFolderId) return null;
    const folder = folders.find(f => f.id === selectedFolderId);
    return folder?.name || null;
  };
  
  // Handle folder creation (real DB)
  const handleCreateFolder = async () => {
    if (!newFolderName.trim() || !userId) return;
    
    try {
      const { data, error } = await createResourceFolder(newFolderName.trim());
      
      if (error) {
        if (error.code === '23505') {
          toast.error("Folder with this name already exists");
        } else {
          throw error;
        }
        return;
      }
      
      if (data) {
        setFolders([...folders, data]);
        toast.success(`Folder "${newFolderName}" created`);
      }
    } catch (error) {
      console.error("Error creating folder:", error);
      toast.error("Failed to create folder");
    } finally {
      setNewFolderName("");
      setIsFolderDialogOpen(false);
    }
  };

  // Handle moving resource to folder
  const handleMoveToFolder = async (resourceId: string, folderId: number | null) => {
    if (resourceId.startsWith('ct-') || resourceId.startsWith('lp-')) {
      toast.error("Constitution templates and learning paths cannot be moved to folders");
      return;
    }
    
    try {
      await moveResourceToFolder(parseInt(resourceId), folderId);
      
      setResources(resources.map(r => 
        r.id === resourceId 
          ? { ...r, folder_id: folderId, folder_name: folders.find(f => f.id === folderId)?.name || null }
          : r
      ));
      toast.success(folderId ? "Resource moved to folder" : "Resource removed from folder");
    } catch (error) {
      console.error("Error moving resource:", error);
      toast.error("Failed to move resource");
    }
    setIsMoveToFolderOpen(false);
  };

  // Handle folder deletion
  const handleDeleteFolder = async (folderId: number) => {
    try {
      await deleteResourceFolder(folderId);
      
      setFolders(folders.filter(f => f.id !== folderId));
      if (selectedFolderId === folderId) {
        setSelectedFolderId(null);
      }
      // Resources in this folder will have folder_id set to null by DB cascade
      setResources(resources.map(r => 
        r.folder_id === folderId ? { ...r, folder_id: null, folder_name: null } : r
      ));
      toast.success("Folder deleted");
    } catch (error) {
      console.error("Error deleting folder:", error);
      toast.error("Failed to delete folder");
    }
  };

  // Handle restoring soft-deleted resource
  const handleRestoreResource = async (resourceId: string) => {
    setIsRestoring(true);
    try {
      const { error } = await restoreKnowledgeResource(parseInt(resourceId));
      
      if (error) throw error;
      
      const restoredResource = deletedResources.find(r => r.id === resourceId);
      if (restoredResource) {
        setDeletedResources(deletedResources.filter(r => r.id !== resourceId));
        setResources([{ ...restoredResource, deleted_at: null }, ...resources]);
      }
      toast.success("Resource restored successfully");
    } catch (error) {
      console.error("Error restoring resource:", error);
      toast.error("Failed to restore resource");
    } finally {
      setIsRestoring(false);
    }
  };

  // Permanent delete (for deleted resources section)
  const handlePermanentDelete = async (resourceId: string) => {
    try {
      await permanentDeleteKnowledgeResource(parseInt(resourceId));
      
      setDeletedResources(deletedResources.filter(r => r.id !== resourceId));
      toast.success("Resource permanently deleted");
    } catch (error) {
      console.error("Error permanently deleting resource:", error);
      toast.error("Failed to delete resource");
    }
  };

  const handleCreateResource = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId) {
      toast.error("You must be logged in to create resources");
      return;
    }

    if (newResourceType === "constitution-template") {
      router.push("/knowledge/constitution/create");
      setIsCreateDialogOpen(false);
      return;
    }

    if (newResourceType === "learning-path") {
      router.push("/knowledge/learning-path/create");
      setIsCreateDialogOpen(false);
      return;
    }

    // Validation
    if (!newResource.title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!newResource.description.trim()) {
      toast.error("Description is required");
      return;
    }

    // Validate content source (URL OR text content)
    const hasUrl = newResource.external_url.trim() !== "";
    const hasContent = newResource.content.trim() !== "";
    
    if (requiresUrl(newResource.type) && !hasUrl) {
      toast.error("Please provide a URL to the resource");
      return;
    }

    // Validate URL format if provided
    if (hasUrl) {
      try {
        new URL(newResource.external_url);
        if (!newResource.external_url.startsWith("http://") && !newResource.external_url.startsWith("https://")) {
          toast.error("Please enter a valid URL starting with http:// or https://");
          return;
        }
      } catch {
        toast.error("Please enter a valid URL starting with http:// or https://");
        return;
      }
    }

    setIsSaving(true);
    try {
      const data = await createKnowledgeResource({
        title: newResource.title,
        description: newResource.description,
        type: newResource.type,
        category: newResource.category,
        content: newResource.content || undefined,
        external_url: newResource.external_url || undefined,
        thumbnail_url: newResource.thumbnail_url || undefined,
        is_featured: newResource.is_featured,
        is_published: newResource.is_published
      });

      if (data) {
        const newRes: Resource = {
          id: data.id.toString(),
          title: data.title,
          type: data.type as ResourceType,
          category: data.category,
          updatedAt: new Date().toISOString().split('T')[0],
          sharedWith: 0,
          isFeatured: false,
          description: data.description || ""
        };
        setResources([newRes, ...resources]);
        toast.success("Resource created successfully!");
      }
    } catch (error) {
      console.error("Error creating resource:", error);
      toast.error("Failed to create resource");
    } finally {
      setIsSaving(false);
      setIsCreateDialogOpen(false);
      setNewResource({
        title: "",
        description: "",
        type: "document",
        category: "Governance",
        content: "",
        external_url: "",
        is_published: true,
        is_featured: false,
        thumbnail_url: ""
      });
    }
  };

  const handleShareResource = async () => {
    if (!selectedResource || !userId || selectedFamilies.length === 0) return;
    
    // Constitution templates CAN be shared now (BR-KC-008)
    if (selectedResource.id.startsWith('ct-')) {
      // Handle constitution template sharing separately
      await handleShareConstitutionTemplate();
      return;
    }

    if (selectedResource.id.startsWith('lp-')) {
      toast.error("Learning paths cannot be shared directly yet. This feature is coming soon.");
      setIsShareDialogOpen(false);
      setSelectedFamilies([]);
      return;
    }

    setIsSharing(true);
    try {
      const resourceId = parseInt(selectedResource.id);
      const advisorName = userProfile ? `${userProfile.first_name} ${userProfile.last_name}`.trim() : "Your advisor";

      await shareResourceWithVersioning(resourceId, selectedFamilies, advisorName);

      // Update local share count
      setResources(resources.map(r => 
        r.id === selectedResource.id 
          ? { ...r, sharedWith: r.sharedWith + selectedFamilies.length } 
          : r
      ));
      toast.success(`"${selectedResource.title}" shared with ${selectedFamilies.length} families!`);
    } catch (error) {
      console.error("Error sharing resource:", error);
      toast.error("Failed to share resource");
    } finally {
      setIsSharing(false);
      setIsShareDialogOpen(false);
      setSelectedFamilies([]);
    }
  };

  // Handle Constitution Template sharing (BR-KC-008, BR-KC-009)
  const handleShareConstitutionTemplate = async () => {
    if (!selectedResource || !userId || selectedFamilies.length === 0) return;
    
    setIsSharing(true);
    try {
      const templateId = parseInt(selectedResource.id.replace('ct-', ''));
      const advisorName = userProfile ? `${userProfile.first_name} ${userProfile.last_name}`.trim() : "Your advisor";

      const result = await shareConstitutionTemplateToFamily(templateId, selectedFamilies, advisorName);

      if (result.success) {
        toast.success(`Constitution template shared with ${result.sharedCount} families!`);
      } else {
        toast.error("Failed to share constitution template");
      }
    } catch (error) {
      console.error("Error sharing constitution template:", error);
      toast.error("Failed to share constitution template");
    } finally {
      setIsSharing(false);
      setIsShareDialogOpen(false);
      setSelectedFamilies([]);
    }
  };

  const toggleFeatured = async (id: string) => {
    const resource = resources.find(r => r.id === id);
    if (!resource || id.startsWith('ct-')) return;
    
    try {
      await toggleResourceFeatured(parseInt(id), resource.isFeatured);

      setResources(resources.map(r => 
        r.id === id ? { ...r, isFeatured: !r.isFeatured } : r
      ));
      toast.success(resource.isFeatured 
        ? "Resource removed from featured" 
        : "Resource marked as featured"
      );
    } catch (error) {
      console.error("Error toggling featured:", error);
      toast.error("Failed to update resource");
    }
  };

  // Improved duplicate function (BR-KC-004) - copies all fields
  const handleDuplicate = async (resource: Resource) => {
    if (!userId) return;

    // Handle constitution template duplication
    if (resource.id.startsWith('ct-')) {
      try {
        const templateId = parseInt(resource.id.replace('ct-', ''));
        
        const newTemplate = await duplicateConstitutionTemplate(templateId);

        // Add to local state
        const duplicatedTemplate: Resource = {
          id: `ct-${newTemplate.id}`,
          title: newTemplate.title,
          type: "constitution-template",
          category: "Governance",
          updatedAt: new Date().toISOString().split('T')[0],
          sharedWith: 0,
          isFeatured: false,
          description: newTemplate.description || "Constitution Template"
        };
        setResources([duplicatedTemplate, ...resources]);
        toast.success("Constitution template duplicated!");
        return;
      } catch (error) {
        console.error("Error duplicating template:", error);
        toast.error("Failed to duplicate template");
        return;
      }
    }

    // Handle learning path duplication
    if (resource.id.startsWith('lp-')) {
      try {
        const pathId = parseInt(resource.id.replace('lp-', ''));
        
        const newPath = await duplicateLearningPath(pathId);

        const duplicatedPath: Resource = {
          id: `lp-${newPath.id}`,
          title: newPath.title,
          type: "learning-path",
          category: "Governance",
          updatedAt: new Date().toISOString().split('T')[0],
          sharedWith: 0,
          isFeatured: false,
          description: newPath.description || "Learning Path"
        };
        setResources([duplicatedPath, ...resources]);
        toast.success("Learning path duplicated!");
        return;
      } catch (error) {
        console.error("Error duplicating learning path:", error);
        toast.error("Failed to duplicate learning path");
        return;
      }
    }

    // Regular resource duplication - copy ALL fields
    try {
      const { data, error } = await duplicateKnowledgeResource(parseInt(resource.id));

      if (error) throw error;

      if (data && data[0]) {
        const duplicatedResource: Resource = {
          id: data[0].id.toString(),
          title: data[0].title,
          type: data[0].type as ResourceType,
          category: data[0].category,
          updatedAt: new Date().toISOString().split('T')[0],
          sharedWith: 0,
          isFeatured: false,
          description: data[0].description || ""
        };
        setResources([duplicatedResource, ...resources]);
        toast.success("Resource duplicated successfully!");
      }
    } catch (error) {
      console.error("Error duplicating resource:", error);
      toast.error("Failed to duplicate resource");
    }
  };

  const confirmDeleteResource = (resource: Resource) => {
    setSelectedResource(resource);
    setIsDeleteDialogOpen(true);
  };

  // Soft delete for resources (BR-KC-006)
  const handleDeleteResource = async () => {
    if (!selectedResource) return;
    
    setIsDeleting(true);
    try {
      // Handle constitution templates - hard delete (they don't have soft delete)
      if (selectedResource.id.startsWith('ct-')) {
        const templateId = parseInt(selectedResource.id.replace('ct-', ''));
        await deleteConstitutionTemplate(templateId);
        setResources(resources.filter(r => r.id !== selectedResource.id));
        toast.success("Constitution template deleted");
      } else if (selectedResource.id.startsWith('lp-')) {
        // Handle learning paths - hard delete
        const pathId = parseInt(selectedResource.id.replace('lp-', ''));
        await deleteLearningPath(pathId);
        setResources(resources.filter(r => r.id !== selectedResource.id));
        toast.success("Learning path deleted");
      } else {
        // SOFT DELETE for regular resources
        await deleteKnowledgeResource(parseInt(selectedResource.id));
        
        // Move to deleted resources
        const deletedResource = resources.find(r => r.id === selectedResource.id);
        if (deletedResource) {
          setDeletedResources([{ ...deletedResource, deleted_at: new Date().toISOString() }, ...deletedResources]);
        }
        setResources(resources.filter(r => r.id !== selectedResource.id));
        toast.success("Resource moved to trash. You can restore it within 6 months.");
      }
    } catch (error) {
      console.error("Error deleting resource:", error);
      toast.error("Failed to delete resource");
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
      setSelectedResource(null);
    }
  };

  return (
    <div className="min-h-screen bg-page-background">
      {/* Breadcrumb */}
      <div className="bg-card border-b border-border">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm">
            <Home className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Home</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
            <span className="text-foreground font-medium">Knowledge Center</span>
          </div>
        </div>
      </div>

      <div className="container py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Knowledge Center</h1>
            <p className="text-muted-foreground mt-1">
              Manage your educational resources and share them with your family clients.
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/knowledge/learning-path/create">
              <Button variant="outline">
                <GraduationCap className="h-4 w-4 mr-2" />
                New Learning Path
              </Button>
            </Link>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Resource
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="library" className="space-y-6">
          <TabsList>
            <TabsTrigger value="library">My Library</TabsTrigger>
            <TabsTrigger value="shared">Shared Resources</TabsTrigger>
            <TabsTrigger value="constitution">Constitution Templates</TabsTrigger>
            <TabsTrigger value="deleted" className="text-muted-foreground">
              <Archive className="h-4 w-4 mr-2" />
              Deleted ({deletedResources.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="library" className="space-y-0">
            <div className="flex gap-6">
              {/* Sidebar - Categories/Folders */}
              {showSidebar && (
                <div className="w-64 shrink-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Folders</h3>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={() => setIsFolderDialogOpen(true)}
                      title="Create new folder"
                    >
                      <FolderPlus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-1">
                    {/* All Resources */}
                    <button
                      onClick={() => setSelectedFolderId(null)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedFolderId === null 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-muted text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Folder className="h-4 w-4" />
                        <span>All Resources</span>
                      </div>
                      <Badge variant={selectedFolderId === null ? "secondary" : "outline"} className="text-xs">
                        {resources.length}
                      </Badge>
                    </button>
                    
                    {/* User folders from database */}
                    {folders.map(folder => {
                      const count = resources.filter(r => r.folder_id === folder.id).length;
                      return (
                        <div key={folder.id} className="group flex items-center">
                          <button
                            onClick={() => setSelectedFolderId(selectedFolderId === folder.id ? null : folder.id)}
                            className={`flex-1 flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                              selectedFolderId === folder.id 
                                ? "bg-primary text-primary-foreground" 
                                : "hover:bg-muted text-foreground"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              {selectedFolderId === folder.id ? (
                                <FolderOpen className="h-4 w-4" />
                              ) : (
                                <Folder className="h-4 w-4" />
                              )}
                              <span className="truncate">{folder.name}</span>
                            </div>
                            <Badge variant={selectedFolderId === folder.id ? "secondary" : "outline"} className="text-xs">
                              {count}
                            </Badge>
                          </button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                <MoreVertical className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleDeleteFolder(folder.id)}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Folder
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      );
                    })}
                  </div>

                  <Separator />
                  
                  {/* Categories Filter (legacy) */}
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Categories</h3>
                    <div className="space-y-1">
                      {categories.map(category => {
                        const count = resources.filter(r => r.category === category).length;
                        return (
                          <button
                            key={category}
                            onClick={() => setSelectedCategory(selectedCategory === category ? "" : category)}
                            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-sm transition-colors ${
                              selectedCategory === category 
                                ? "bg-muted font-medium" 
                                : "hover:bg-muted/50 text-muted-foreground"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Tag className="h-3.5 w-3.5" />
                              <span className="truncate">{category}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{count}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <Separator />

                  {/* Resource Types Filter */}
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Types</h3>
                    <div className="space-y-1">
                      {[
                        { value: "all", label: "All Types", icon: LayoutGrid },
                        { value: "document", label: "Documents", icon: FileText },
                        { value: "article", label: "Articles", icon: LayoutTemplate },
                        { value: "video", label: "Videos", icon: Video },
                        { value: "podcast", label: "Podcasts", icon: Mic },
                        { value: "guide", label: "Guides", icon: BookOpen },
                        { value: "template", label: "Templates", icon: File },
                        { value: "checklist", label: "Checklists", icon: CheckSquare },
                        { value: "link", label: "Links", icon: LinkIcon },
                      ].map(type => {
                        const count = type.value === "all" 
                          ? resources.length 
                          : resources.filter(r => r.type === type.value).length;
                        const Icon = type.icon;
                        return (
                          <button
                            key={type.value}
                            onClick={() => setSelectedType(type.value)}
                            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md text-sm transition-colors ${
                              selectedType === type.value 
                                ? "bg-muted font-medium" 
                                : "hover:bg-muted/50 text-muted-foreground"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <Icon className="h-3.5 w-3.5" />
                              <span>{type.label}</span>
                            </div>
                            <span className="text-xs text-muted-foreground">{count}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Main Content */}
              <div className="flex-1 min-w-0 space-y-4">
                {/* Toolbar */}
                <div className="flex items-center gap-3">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="shrink-0"
                          onClick={() => setShowSidebar(!showSidebar)}
                        >
                          {showSidebar ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {showSidebar ? "Hide sidebar" : "Show sidebar"}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search resources..." 
                      className="pl-9"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                        onClick={() => setSearchQuery("")}
                      >
                        <X className="h-3.5 w-3.5" />
                      </Button>
                    )}
                  </div>

                  <TooltipProvider>
                    <div className="flex items-center border rounded-lg">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant={viewMode === "grid" ? "secondary" : "ghost"}
                            size="icon"
                            className="rounded-r-none"
                            onClick={() => setViewMode("grid")}
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
                          >
                            <List className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>List view</TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </div>

                {/* Active Filters */}
                {(selectedFolderId || selectedCategory || selectedType !== "all" || searchQuery || sharingFilter !== "all") && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-muted-foreground">Filters:</span>
                    {selectedFolderId && (
                      <Badge variant="secondary" className="gap-1 pr-1">
                        <Folder className="h-3 w-3" />
                        {getSelectedFolderName()}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-1 hover:bg-transparent"
                          onClick={() => setSelectedFolderId(null)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                    {selectedCategory && (
                      <Badge variant="secondary" className="gap-1 pr-1">
                        <Tag className="h-3 w-3" />
                        {selectedCategory}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-1 hover:bg-transparent"
                          onClick={() => setSelectedCategory("")}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                    {selectedType !== "all" && (
                      <Badge variant="secondary" className="gap-1 pr-1 capitalize">
                        <FileText className="h-3 w-3" />
                        {selectedType}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-1 hover:bg-transparent"
                          onClick={() => setSelectedType("all")}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                    {sharingFilter !== "all" && (
                      <Badge variant="secondary" className="gap-1 pr-1">
                        <Share2 className="h-3 w-3" />
                        {sharingFilter === "shared" ? "Shared" : "Not Shared"}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-1 hover:bg-transparent"
                          onClick={() => setSharingFilter("all")}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                    {searchQuery && (
                      <Badge variant="secondary" className="gap-1 pr-1">
                        <Search className="h-3 w-3" />
                        "{searchQuery}"
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-1 hover:bg-transparent"
                          onClick={() => setSearchQuery("")}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs h-6"
                      onClick={() => {
                        setSelectedFolderId(null);
                        setSelectedCategory("");
                        setSelectedType("all");
                        setSharingFilter("all");
                        setSearchQuery("");
                      }}
                    >
                      Clear all
                    </Button>
                  </div>
                )}

                {/* Results count */}
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {filteredResources.length} {filteredResources.length === 1 ? "resource" : "resources"}
                    {getSelectedFolderName() && ` in ${getSelectedFolderName()}`}
                  </p>
                </div>

                {/* Resources Grid/List */}
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    <span className="ml-2 text-muted-foreground">Loading resources...</span>
                  </div>
                ) : filteredResources.length === 0 ? (
                  <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                    <h3 className="text-lg font-medium mb-2">No resources found</h3>
                    <p className="text-muted-foreground mb-4">
                      {searchQuery ? "Try a different search term" : getSelectedFolderName() ? `No resources in "${getSelectedFolderName()}"` : "Add your first resource to get started"}
                    </p>
                    {!searchQuery && (
                      <Button onClick={() => setIsCreateDialogOpen(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        Add Resource
                      </Button>
                    )}
                  </div>
                ) : viewMode === "grid" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {filteredResources.map((resource) => {
                      const Icon = getIconForType(resource.type);
                      return (
                        <Card key={resource.id} className="group hover:shadow-md transition-all hover:border-primary/50 cursor-pointer" onClick={() => navigateToResource(resource.id)}>
                          <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                            <div className="flex items-center gap-2">
                              <div className="p-2 bg-primary/10 rounded-lg">
                                <Icon className="h-5 w-5 text-primary" />
                              </div>
                              <Badge variant="outline" className="capitalize text-xs">{resource.type.replace("-", " ")}</Badge>
                              {resource.isFeatured && (
                                <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                              )}
                            </div>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                <Button variant="ghost" size="icon" className="-mr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigateToResource(resource.id); }}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                {!resource.id.startsWith('ct-') && !resource.id.startsWith('lp-') && (
                                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setSelectedResource(resource); setIsShareDialogOpen(true); }}>
                                    <Share2 className="h-4 w-4 mr-2" />
                                    Share with Family
                                  </DropdownMenuItem>
                                )}
                                {!resource.id.startsWith('ct-') && !resource.id.startsWith('lp-') && (
                                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); toggleFeatured(resource.id); }}>
                                    <Star className={`h-4 w-4 mr-2 ${resource.isFeatured ? "fill-yellow-400 text-yellow-400" : ""}`} />
                                    {resource.isFeatured ? "Unfeature" : "Feature"}
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigateToResource(resource.id, true); }}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleDuplicate(resource); }}>
                                  <Copy className="h-4 w-4 mr-2" />
                                  Duplicate
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600" onClick={(e) => { e.stopPropagation(); confirmDeleteResource(resource); }}>
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </CardHeader>
                          <CardContent className="pt-0">
                            <div className="mb-3">
                              <h3 className="font-semibold leading-tight mb-1 line-clamp-1">{resource.title}</h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">{resource.description}</p>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t">
                              <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1">
                                  <Folder className="h-3 w-3" />
                                  {resource.category}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  {resource.sharedWith}
                                </span>
                              </div>
                              <span>{resource.updatedAt}</span>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  /* List View */
                  <div className="border rounded-lg divide-y">
                    {filteredResources.map((resource) => {
                      const Icon = getIconForType(resource.type);
                      return (
                        <div 
                          key={resource.id} 
                          className="flex items-center gap-4 p-4 hover:bg-muted/50 cursor-pointer group transition-colors"
                          onClick={() => navigateToResource(resource.id)}
                        >
                          <div className="p-2 bg-primary/10 rounded-lg shrink-0">
                            <Icon className="h-5 w-5 text-primary" />
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-medium truncate">{resource.title}</h3>
                              {resource.isFeatured && (
                                <Star className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500 shrink-0" />
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground truncate">{resource.description}</p>
                          </div>
                          
                          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground shrink-0">
                            <Badge variant="outline" className="capitalize text-xs">{resource.type.replace("-", " ")}</Badge>
                            <span className="w-24 truncate">{resource.category}</span>
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {resource.sharedWith}
                            </span>
                            <span className="w-24">{resource.updatedAt}</span>
                          </div>
                          
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigateToResource(resource.id); }}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              {!resource.id.startsWith('ct-') && !resource.id.startsWith('lp-') && (
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); setSelectedResource(resource); setIsShareDialogOpen(true); }}>
                                  <Share2 className="h-4 w-4 mr-2" />
                                  Share with Family
                                </DropdownMenuItem>
                              )}
                              {!resource.id.startsWith('ct-') && !resource.id.startsWith('lp-') && (
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); toggleFeatured(resource.id); }}>
                                  <Star className={`h-4 w-4 mr-2 ${resource.isFeatured ? "fill-yellow-400 text-yellow-400" : ""}`} />
                                  {resource.isFeatured ? "Unfeature" : "Feature"}
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigateToResource(resource.id, true); }}>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleDuplicate(resource); }}>
                                <Copy className="h-4 w-4 mr-2" />
                                Duplicate
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600" onClick={(e) => { e.stopPropagation(); confirmDeleteResource(resource); }}>
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="shared" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {families.map((family) => (
                <Card key={family.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{family.name}</CardTitle>
                      <Badge variant="secondary">{Math.floor(Math.random() * 5) + 1} Resources</Badge>
                    </div>
                    <CardDescription>Shared library access</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-muted-foreground">Recently Shared</div>
                        {resources.slice(0, 3).map((resource) => (
                          <div key={resource.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3 overflow-hidden">
                              <FileText className="h-4 w-4 text-muted-foreground shrink-0" />
                              <span className="text-sm truncate">{resource.title}</span>
                            </div>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <MoreVertical className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" className="w-full text-xs">Manage Shared Resources</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="constitution" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">Constitution Templates</h3>
                <p className="text-sm text-muted-foreground">Standardized 12-section templates for family governance.</p>
              </div>
              <Link href="/knowledge/constitution/create">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  New Template
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.filter(r => r.type === "constitution-template").length === 0 ? (
                <div className="col-span-full text-center py-12">
                  <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-lg font-medium mb-2">No constitution templates yet</h3>
                  <p className="text-muted-foreground mb-4">Create your first template to get started</p>
                  <Link href="/knowledge/constitution/create">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Template
                    </Button>
                  </Link>
                </div>
              ) : resources.filter(r => r.type === "constitution-template").map((template) => (
                <Card key={template.id} className="group hover:shadow-md transition-shadow border-primary/20 cursor-pointer" onClick={() => navigateToResource(template.id)}>
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Star className="h-5 w-5 text-primary fill-primary/20" />
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon" className="-mr-2">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); navigateToResource(template.id, true); }}>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit Template
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleDuplicate(template); }}>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600" onClick={(e) => { e.stopPropagation(); confirmDeleteResource(template); }}>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h3 className="font-semibold text-lg leading-tight mb-2">{template.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{template.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <CheckSquare className="h-4 w-4" />
                      <span>12 Sections Defined</span>
                    </div>
                    <Button variant="outline" className="w-full" onClick={(e) => e.stopPropagation()}>Use this Template</Button>
                  </CardContent>
                </Card>
              ))}
              
              {/* Add New Placeholder */}
              <Link href="/knowledge/constitution/create">
                <Button variant="outline" className="h-auto flex flex-col items-center justify-center gap-4 border-dashed p-8 hover:bg-muted/50 w-full">
                  <div className="p-4 bg-muted rounded-full">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <span className="font-semibold block">Create Custom Template</span>
                    <span className="text-sm text-muted-foreground">Start from scratch</span>
                  </div>
                </Button>
              </Link>
            </div>
          </TabsContent>

          {/* Deleted Resources Tab */}
          <TabsContent value="deleted" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-medium">Deleted Resources</h3>
                <p className="text-sm text-muted-foreground">Resources that have been soft-deleted. Restore or permanently delete them.</p>
              </div>
            </div>

            {deletedResources.length === 0 ? (
              <div className="text-center py-12">
                <Archive className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                <h3 className="text-lg font-medium mb-2">No deleted resources</h3>
                <p className="text-muted-foreground">Deleted resources will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {deletedResources.map((resource) => (
                  <Card key={resource.id} className="opacity-75 hover:opacity-100 transition-opacity">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 overflow-hidden">
                          <div className="p-2 bg-muted rounded-lg">
                            {resource.type === "document" && <FileText className="h-5 w-5 text-muted-foreground" />}
                            {resource.type === "article" && <LayoutTemplate className="h-5 w-5 text-muted-foreground" />}
                            {resource.type === "video" && <Video className="h-5 w-5 text-muted-foreground" />}
                            {resource.type === "podcast" && <Mic className="h-5 w-5 text-muted-foreground" />}
                            {resource.type === "guide" && <BookOpen className="h-5 w-5 text-muted-foreground" />}
                            {resource.type === "template" && <File className="h-5 w-5 text-muted-foreground" />}
                            {resource.type === "checklist" && <CheckSquare className="h-5 w-5 text-muted-foreground" />}
                            {resource.type === "link" && <LinkIcon className="h-5 w-5 text-muted-foreground" />}
                            {resource.type === "learning-path" && <GraduationCap className="h-5 w-5 text-muted-foreground" />}
                            {resource.type === "constitution-template" && <Star className="h-5 w-5 text-muted-foreground" />}
                          </div>
                          <div className="overflow-hidden">
                            <h4 className="font-medium truncate">{resource.title}</h4>
                            <p className="text-sm text-muted-foreground truncate">{resource.description}</p>
                            {resource.deleted_at && (
                              <p className="text-xs text-red-500 mt-1">
                                Deleted on {new Date(resource.deleted_at).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRestoreResource(resource.id)}
                            disabled={isRestoring}
                          >
                            <RotateCcw className="h-4 w-4 mr-2" />
                            Restore
                          </Button>
                          <Button 
                            variant="destructive" 
                            size="sm"
                            onClick={() => handlePermanentDelete(resource.id)}
                            disabled={isRestoring}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Forever
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Resource Sheet */}
      <Sheet open={isCreateDialogOpen} onOpenChange={(open) => {
        setIsCreateDialogOpen(open);
        if (!open) {
          // Reset form when closing
          setNewResource({
            title: "",
            description: "",
            type: "document",
            category: "Governance",
            content: "",
            external_url: "",
            is_published: true,
            is_featured: false,
            thumbnail_url: ""
          });
          setNewResourceType("");
        }
      }}>
        <SheetContent className="w-full sm:max-w-[600px] overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Create New Resource</SheetTitle>
            <SheetDescription>
              Add a new educational resource to your library.
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleCreateResource} className="space-y-6 py-4">
            {/* Basic Information Card */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Resource Type *</Label>
                  <Select 
                    value={newResource.type} 
                    onValueChange={(v) => {
                      setNewResourceType(v);
                      setNewResource({...newResource, type: v as ResourceType});
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="document">
                        <span className="flex items-center gap-2"><FileText className="h-4 w-4" /> Document</span>
                      </SelectItem>
                      <SelectItem value="article">
                        <span className="flex items-center gap-2"><LayoutTemplate className="h-4 w-4" /> Article</span>
                      </SelectItem>
                      <SelectItem value="video">
                        <span className="flex items-center gap-2"><Video className="h-4 w-4" /> Video Tutorial</span>
                      </SelectItem>
                      <SelectItem value="podcast">
                        <span className="flex items-center gap-2"><Mic className="h-4 w-4" /> Podcast</span>
                      </SelectItem>
                      <SelectItem value="guide">
                        <span className="flex items-center gap-2"><BookOpen className="h-4 w-4" /> Guide</span>
                      </SelectItem>
                      <SelectItem value="template">
                        <span className="flex items-center gap-2"><File className="h-4 w-4" /> Template</span>
                      </SelectItem>
                      <SelectItem value="checklist">
                        <span className="flex items-center gap-2"><CheckSquare className="h-4 w-4" /> Checklist</span>
                      </SelectItem>
                      <SelectItem value="link">
                        <span className="flex items-center gap-2"><LinkIcon className="h-4 w-4" /> External Link</span>
                      </SelectItem>
                      <SelectItem value="learning-path">
                        <span className="flex items-center gap-2"><GraduationCap className="h-4 w-4" /> Learning Path</span>
                      </SelectItem>
                      <SelectItem value="constitution-template">
                        <span className="flex items-center gap-2"><Star className="h-4 w-4" /> Constitution Template</span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input 
                    id="title" 
                    placeholder="e.g., Family Constitution Guide" 
                    value={newResource.title}
                    onChange={(e) => setNewResource({...newResource, title: e.target.value})}
                    maxLength={200}
                  />
                  <p className="text-xs text-muted-foreground">{newResource.title.length}/200</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Brief description of the resource..." 
                    value={newResource.description}
                    onChange={(e) => setNewResource({...newResource, description: e.target.value})}
                    maxLength={1000}
                    rows={3}
                  />
                  <p className="text-xs text-muted-foreground">{newResource.description.length}/1000</p>
                </div>
              </CardContent>
            </Card>

            {/* Content Card */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base">Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">

                {/* Resource URL field */}
                {requiresUrl(newResource.type) && (
                  <div className="space-y-2">
                    <Label htmlFor="file_url">
                      Resource URL *
                    </Label>
                    <div className="flex gap-2">
                      <LinkIcon className="h-4 w-4 mt-3 text-muted-foreground shrink-0" />
                      <Input 
                        id="file_url"
                        type="url"
                        placeholder={
                          newResource.type === "document" ? "https://example.com/document.pdf" :
                          newResource.type === "template" ? "https://example.com/template.docx" :
                          newResource.type === "checklist" ? "https://example.com/checklist.pdf" :
                          newResource.type === "podcast" ? "https://example.com/podcast.mp3" :
                          newResource.type === "video" ? "https://youtube.com/watch?v=..." :
                          "https://example.com/file"
                        }
                        value={newResource.external_url}
                        onChange={(e) => setNewResource({...newResource, external_url: e.target.value})}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {newResource.type === "document" && "Link to PDF, DOCX, or other document file"}
                      {newResource.type === "template" && "Link to template file (PDF, DOCX, XLSX)"}
                      {newResource.type === "checklist" && "Link to checklist document"}
                      {newResource.type === "podcast" && "Link to MP3 or podcast URL"}
                      {newResource.type === "video" && "YouTube, Vimeo, or other video URL"}
                      {newResource.type === "link" && "Website URL"}
                    </p>
                  </div>
                )}

                {/* Rich text content for articles/guides */}
                {usesRichTextContent(newResource.type) && (
                  <div className="space-y-2">
                    <Label htmlFor="content">Content</Label>
                    <Textarea 
                      id="content"
                      placeholder="Write your content here... (supports basic formatting)"
                      value={newResource.content}
                      onChange={(e) => setNewResource({...newResource, content: e.target.value})}
                      rows={8}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter the main content of your {newResource.type}
                    </p>
                  </div>
                )}

                {/* Special message for constitution and learning path */}
                {(newResource.type === "constitution-template" || newResource.type === "learning-path") && (
                  <div className="border rounded-lg p-4 bg-primary/5 text-center">
                    <div className="flex flex-col items-center gap-2">
                      {newResource.type === "constitution-template" ? (
                        <>
                          <Star className="h-8 w-8 text-primary" />
                          <p className="text-sm font-medium">Constitution Template Editor</p>
                          <p className="text-xs text-muted-foreground">
                            A specialized 12-section editor will open for creating your constitution template.
                          </p>
                        </>
                      ) : (
                        <>
                          <GraduationCap className="h-8 w-8 text-primary" />
                          <p className="text-sm font-medium">Learning Path Builder</p>
                          <p className="text-xs text-muted-foreground">
                            A specialized builder will open for creating your learning path with modules.
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <SheetFooter className="flex-col sm:flex-row gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)} disabled={isSaving}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (newResource.type === "constitution-template" || newResource.type === "learning-path") ? (
                  <>Continue to Editor</>
                ) : (
                  "Create Resource"
                )}
              </Button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      {/* Share Dialog */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share Resource</DialogTitle>
            <DialogDescription>
              Select families to share &quot;{selectedResource?.title}&quot; with.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label>Select Families</Label>
              {families.length === 0 ? (
                <div className="border rounded-md p-4 text-center text-muted-foreground">
                  No families found. Create a family first.
                </div>
              ) : (
                <div className="border rounded-md p-4 space-y-3 max-h-[200px] overflow-y-auto">
                  {families.map((family) => (
                    <div key={family.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`family-${family.id}`}
                        checked={selectedFamilies.includes(family.id)}
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
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {family.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => { setIsShareDialogOpen(false); setSelectedFamilies([]); }} disabled={isSharing}>Cancel</Button>
            <Button onClick={handleShareResource} disabled={isSharing || selectedFamilies.length === 0}>
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

      {/* Create Folder Dialog */}
      <Dialog open={isFolderDialogOpen} onOpenChange={setIsFolderDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
            <DialogDescription>
              Create a new folder to organize your resources by category.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="folderName">Folder Name</Label>
              <Input 
                id="folderName"
                placeholder="e.g., Governance, Financial..."
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleCreateFolder();
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setIsFolderDialogOpen(false); setNewFolderName(""); }}>
              Cancel
            </Button>
            <Button onClick={handleCreateFolder} disabled={!newFolderName.trim()}>
              <Folder className="h-4 w-4 mr-2" />
              Create Folder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Delete Resource
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{selectedResource?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsDeleteDialogOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteResource}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function KnowledgeCenterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-page-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    }>
      <KnowledgeCenterContent />
    </Suspense>
  );
}
