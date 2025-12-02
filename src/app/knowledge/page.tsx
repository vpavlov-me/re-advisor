"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
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
  PanelLeft
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
  folder?: string;
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
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [selectedFamilies, setSelectedFamilies] = useState<number[]>([]);
  
  // Resource Detail Sheet states
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);
  const [detailResource, setDetailResource] = useState<ResourceDetail | null>(null);
  const [detailShares, setDetailShares] = useState<ResourceShare[]>([]);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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
  
  // Loading states
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  
  // Folder states
  const [folders, setFolders] = useState<string[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  
  // View mode state
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showSidebar, setShowSidebar] = useState(true);

  const fetchData = useCallback(async (advisorId: string) => {
    try {
      // Fetch resources
      const { data: resourcesData, error: resourcesError } = await supabase
        .from('knowledge_resources')
        .select(`
          *,
          shares:resource_shares(count)
        `)
        .eq('advisor_id', advisorId);
      
      if (resourcesError) throw resourcesError;
      
      // Fetch constitution templates
      const { data: templatesData } = await supabase
        .from('constitution_templates')
        .select('*')
        .eq('advisor_id', advisorId);

      // Fetch learning paths
      const { data: learningPathsData } = await supabase
        .from('learning_paths')
        .select('*')
        .eq('advisor_id', advisorId);

      // Fetch families for sharing
      const { data: familiesData } = await supabase
        .from('families')
        .select('id, name')
        .eq('advisor_id', advisorId);

      if (familiesData) {
        setFamilies(familiesData);
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
          description: r.description || ""
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
      
      // Extract unique folders/categories from resources
      const uniqueFolders = [...new Set(allResources.map(r => r.category).filter(Boolean))];
      setFolders(uniqueFolders);
    } catch (error) {
      console.error("Error fetching resources:", error);
      toast.error("Failed to load resources");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        fetchData(user.id);
      } else {
        setIsLoading(false);
      }
    };
    getUser();
  }, [fetchData]);

  // Open resource detail from URL params
  useEffect(() => {
    const resourceId = searchParams.get('resource');
    const editMode = searchParams.get('edit') === 'true';
    if (resourceId && !isLoading) {
      openResourceDetail(resourceId, editMode);
    }
  }, [searchParams, isLoading]);

  // Function to open resource detail sheet
  const openResourceDetail = async (resourceId: string, editMode = false) => {
    setIsLoadingDetail(true);
    setIsDetailSheetOpen(true);
    setIsEditing(editMode);

    try {
      if (resourceId.startsWith('ct-')) {
        // Constitution template
        const templateId = parseInt(resourceId.replace('ct-', ''));
        const { data: templateData, error } = await supabase
          .from('constitution_templates')
          .select('*')
          .eq('id', templateId)
          .single();

        if (error) throw error;

        if (templateData) {
          const resource: ResourceDetail = {
            id: resourceId,
            title: templateData.title,
            type: "constitution-template",
            category: "Governance",
            description: templateData.description || "",
            content: templateData.content || "",
            isFeatured: false,
            is_published: true,
            created_at: templateData.created_at,
            updatedAt: templateData.updated_at ? new Date(templateData.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            sharedWith: 0,
            advisor_id: templateData.advisor_id
          };
          setDetailResource(resource);
          setEditForm({
            title: resource.title,
            description: resource.description,
            content: resource.content || "",
            category: resource.category,
            type: resource.type,
            external_url: "",
            is_featured: resource.isFeatured,
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
          const resource: ResourceDetail = {
            id: resourceData.id.toString(),
            title: resourceData.title,
            type: resourceData.type as ResourceType,
            category: resourceData.category || "General",
            description: resourceData.description || "",
            content: resourceData.content || "",
            file_url: resourceData.file_url,
            external_url: resourceData.external_url,
            isFeatured: resourceData.is_featured || false,
            is_published: resourceData.is_published ?? true,
            created_at: resourceData.created_at,
            updatedAt: resourceData.updated_at ? new Date(resourceData.updated_at).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
            sharedWith: 0,
            advisor_id: resourceData.advisor_id
          };
          setDetailResource(resource);
          setEditForm({
            title: resource.title,
            description: resource.description,
            content: resource.content || "",
            category: resource.category,
            type: resource.type,
            external_url: resource.external_url || "",
            is_featured: resource.isFeatured,
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
            setDetailShares(sharesData.map((s: any) => ({
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
      setIsDetailSheetOpen(false);
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const closeDetailSheet = () => {
    setIsDetailSheetOpen(false);
    setDetailResource(null);
    setDetailShares([]);
    setIsEditing(false);
    // Remove URL params
    router.replace('/knowledge', { scroll: false });
  };

  const handleSaveDetail = async () => {
    if (!detailResource || !userId) return;

    setIsSaving(true);
    try {
      if (detailResource.id.startsWith('ct-')) {
        const templateId = parseInt(detailResource.id.replace('ct-', ''));
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
          .eq('id', parseInt(detailResource.id));

        if (error) throw error;
      }

      // Update local state
      const updatedResource = {
        ...detailResource,
        ...editForm,
        updatedAt: new Date().toISOString().split('T')[0],
        isFeatured: editForm.is_featured
      };
      setDetailResource(updatedResource);
      
      // Update resources list
      setResources(resources.map(r => 
        r.id === detailResource.id 
          ? { ...r, title: editForm.title, description: editForm.description, category: editForm.category, type: editForm.type, isFeatured: editForm.is_featured }
          : r
      ));
      
      setIsEditing(false);
      toast.success("Resource updated successfully");
    } catch (error) {
      console.error("Error saving resource:", error);
      toast.error("Failed to save resource");
    } finally {
      setIsSaving(false);
    }
  };

  const toggleDetailFeatured = async () => {
    if (!detailResource || detailResource.id.startsWith('ct-')) return;

    try {
      const { error } = await supabase
        .from('knowledge_resources')
        .update({ is_featured: !detailResource.isFeatured })
        .eq('id', parseInt(detailResource.id));

      if (error) throw error;

      const updated = { ...detailResource, isFeatured: !detailResource.isFeatured };
      setDetailResource(updated);
      setResources(resources.map(r => r.id === detailResource.id ? { ...r, isFeatured: updated.isFeatured } : r));
      toast.success(detailResource.isFeatured ? "Removed from featured" : "Added to featured");
    } catch (error) {
      console.error("Error toggling featured:", error);
      toast.error("Failed to update");
    }
  };

  const handleRemoveDetailShare = async (shareId: number) => {
    try {
      const { error } = await supabase
        .from('resource_shares')
        .delete()
        .eq('id', shareId);

      if (error) throw error;

      setDetailShares(detailShares.filter(s => s.id !== shareId));
      toast.success("Share removed");
    } catch (error) {
      console.error("Error removing share:", error);
      toast.error("Failed to remove share");
    }
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
    duration_minutes: "",
    points_value: "5",
    difficulty: "beginner" as "beginner" | "intermediate" | "advanced",
    is_public: false,
    tags: [] as string[]
  });
  const [tagInput, setTagInput] = useState("");

  // Upload State
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Get supported file formats based on type
  const getSupportedFormats = (type: ResourceType): { extensions: string[]; mimeTypes: string[] } => {
    switch (type) {
      case "document":
      case "article":
        return { extensions: [".pdf"], mimeTypes: ["application/pdf"] };
      case "template":
      case "checklist":
        return { extensions: [".pdf", ".docx"], mimeTypes: ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"] };
      case "video":
        return { extensions: [".mp4", ".avi", ".mov", ".wmv", ".flv", ".webm"], mimeTypes: ["video/mp4", "video/x-msvideo", "video/quicktime", "video/x-ms-wmv", "video/x-flv", "video/webm"] };
      case "podcast":
        return { extensions: [".mp3", ".wav", ".aac"], mimeTypes: ["audio/mpeg", "audio/wav", "audio/aac"] };
      case "guide":
        return { extensions: [".pdf", ".docx"], mimeTypes: ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"] };
      default:
        return { extensions: [".pdf"], mimeTypes: ["application/pdf"] };
    }
  };

  // Check if type requires file upload
  const requiresFileUpload = (type: ResourceType): boolean => {
    return ["document", "template", "checklist", "podcast"].includes(type);
  };

  // Check if type can use external URL
  const canUseExternalUrl = (type: ResourceType): boolean => {
    return ["video", "link", "article"].includes(type);
  };

  // Check if type uses rich text content
  const usesRichTextContent = (type: ResourceType): boolean => {
    return ["article", "guide"].includes(type);
  };

  // Check if duration is required
  const durationRequired = (type: ResourceType): boolean => {
    return ["article", "video", "podcast"].includes(type);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formats = getSupportedFormats(newResource.type);
    
    // Validate file type
    if (!formats.mimeTypes.includes(file.type)) {
      toast.error(`Invalid file format. Accepted formats: ${formats.extensions.join(", ")}`);
      return;
    }

    // Validate file size (100MB max)
    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      toast.error("File size exceeds limit of 100MB. Please reduce file size.");
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setUploadedFile(file);
          setUploadedFileName(file.name);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleAddTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && newResource.tags.length < 10 && !newResource.tags.includes(tag)) {
      setNewResource({ ...newResource, tags: [...newResource.tags, tag] });
      setTagInput("");
    } else if (newResource.tags.length >= 10) {
      toast.error("Maximum 10 tags allowed");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewResource({ ...newResource, tags: newResource.tags.filter(t => t !== tagToRemove) });
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory.trim()]);
      setNewCategory("");
      setIsAddingCategory(false);
    }
  };

  // Filter logic
  const filteredResources = resources.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          r.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || r.type === selectedType;
    const matchesFolder = !selectedFolder || r.category === selectedFolder;
    return matchesSearch && matchesType && matchesFolder;
  });
  
  // Handle folder creation
  const handleCreateFolder = () => {
    if (newFolderName.trim()) {
      if (!folders.includes(newFolderName.trim())) {
        setFolders([...folders, newFolderName.trim()]);
        toast.success(`Folder "${newFolderName}" created`);
      } else {
        toast.error("Folder already exists");
      }
      setNewFolderName("");
      setIsFolderDialogOpen(false);
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

    if (durationRequired(newResource.type) && !newResource.duration_minutes) {
      toast.error("Duration is required for this resource type");
      return;
    }

    // Validate content source (file OR URL OR text content)
    const hasFile = uploadedFile !== null;
    const hasUrl = newResource.external_url.trim() !== "";
    const hasContent = newResource.content.trim() !== "";
    
    if (requiresFileUpload(newResource.type) && !hasFile && !hasUrl) {
      toast.error("Please upload a file or provide an external URL");
      return;
    }

    if (canUseExternalUrl(newResource.type) && hasUrl && !hasFile) {
      // Validate URL format
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
      // TODO: Upload file to storage and get URL
      let fileUrl = null;
      if (uploadedFile) {
        // In real implementation, upload to Supabase storage here
        fileUrl = `uploads/${userId}/${Date.now()}-${uploadedFile.name}`;
      }

      const { data, error } = await supabase
        .from('knowledge_resources')
        .insert([{
          advisor_id: userId,
          title: newResource.title,
          description: newResource.description,
          type: newResource.type,
          category: newResource.category,
          content: newResource.content || null,
          file_url: fileUrl,
          external_url: newResource.external_url || null,
          is_featured: false,
          is_published: newResource.is_public
        }])
        .select();

      if (error) throw error;

      if (data && data[0]) {
        const newRes: Resource = {
          id: data[0].id.toString(),
          title: data[0].title,
          type: data[0].type as ResourceType,
          category: data[0].category,
          updatedAt: new Date().toISOString().split('T')[0],
          sharedWith: 0,
          isFeatured: false,
          description: data[0].description || ""
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
        duration_minutes: "",
        points_value: "5",
        difficulty: "beginner",
        is_public: false,
        tags: []
      });
      setUploadedFileName(null);
      setUploadedFile(null);
      setTagInput("");
    }
  };

  const handleShareResource = async () => {
    if (!selectedResource || !userId || selectedFamilies.length === 0) return;
    
    // Check if resource can be shared (constitution templates and learning paths have different sharing)
    if (selectedResource.id.startsWith('ct-')) {
      toast.error("Constitution templates cannot be shared directly. Use the template with a family instead.");
      setIsShareDialogOpen(false);
      setSelectedFamilies([]);
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

      // Insert share records for each selected family
      const shares = selectedFamilies.map(familyId => ({
        resource_id: resourceId,
        family_id: familyId,
        shared_by: userId
      }));

      const { error } = await supabase
        .from('resource_shares')
        .upsert(shares, { onConflict: 'resource_id,family_id' });

      if (error) throw error;

      // Update local state
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

  const toggleFeatured = async (id: string) => {
    const resource = resources.find(r => r.id === id);
    if (!resource || id.startsWith('ct-')) return;
    
    try {
      const { error } = await supabase
        .from('knowledge_resources')
        .update({ is_featured: !resource.isFeatured })
        .eq('id', parseInt(id));

      if (error) throw error;

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

  const handleDuplicate = async (resource: Resource) => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('knowledge_resources')
        .insert([{
          advisor_id: userId,
          title: `${resource.title} (Copy)`,
          description: resource.description,
          type: resource.type,
          category: resource.category,
          is_featured: false,
          is_published: true
        }])
        .select();

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

  const handleDeleteResource = async () => {
    if (!selectedResource) return;
    
    setIsDeleting(true);
    try {
      // Handle constitution templates differently
      if (selectedResource.id.startsWith('ct-')) {
        const templateId = parseInt(selectedResource.id.replace('ct-', ''));
        const { error } = await supabase
          .from('constitution_templates')
          .delete()
          .eq('id', templateId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('knowledge_resources')
          .delete()
          .eq('id', parseInt(selectedResource.id));
        if (error) throw error;
      }
      
      setResources(resources.filter(r => r.id !== selectedResource.id));
      toast.success("Resource deleted successfully!");
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
    <div className="min-h-screen bg-background">
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
          </TabsList>

          <TabsContent value="library" className="space-y-0">
            <div className="flex gap-6">
              {/* Sidebar - Categories/Folders */}
              {showSidebar && (
                <div className="w-64 shrink-0 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wide">Categories</h3>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6"
                      onClick={() => setIsFolderDialogOpen(true)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="space-y-1">
                    {/* All Resources */}
                    <button
                      onClick={() => setSelectedFolder(null)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedFolder === null 
                          ? "bg-primary text-primary-foreground" 
                          : "hover:bg-muted text-foreground"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Folder className="h-4 w-4" />
                        <span>All Resources</span>
                      </div>
                      <Badge variant={selectedFolder === null ? "secondary" : "outline"} className="text-xs">
                        {resources.length}
                      </Badge>
                    </button>
                    
                    {/* Category folders */}
                    {folders.map(folder => {
                      const count = resources.filter(r => r.category === folder).length;
                      return (
                        <button
                          key={folder}
                          onClick={() => setSelectedFolder(selectedFolder === folder ? null : folder)}
                          className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedFolder === folder 
                              ? "bg-primary text-primary-foreground" 
                              : "hover:bg-muted text-foreground"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            {selectedFolder === folder ? (
                              <FolderOpen className="h-4 w-4" />
                            ) : (
                              <Folder className="h-4 w-4" />
                            )}
                            <span className="truncate">{folder}</span>
                          </div>
                          <Badge variant={selectedFolder === folder ? "secondary" : "outline"} className="text-xs">
                            {count}
                          </Badge>
                        </button>
                      );
                    })}
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
                {(selectedFolder || selectedType !== "all" || searchQuery) && (
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm text-muted-foreground">Filters:</span>
                    {selectedFolder && (
                      <Badge variant="secondary" className="gap-1 pr-1">
                        <Folder className="h-3 w-3" />
                        {selectedFolder}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 ml-1 hover:bg-transparent"
                          onClick={() => setSelectedFolder(null)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    )}
                    {selectedType !== "all" && (
                      <Badge variant="secondary" className="gap-1 pr-1 capitalize">
                        <Tag className="h-3 w-3" />
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
                        setSelectedFolder(null);
                        setSelectedType("all");
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
                    {selectedFolder && ` in ${selectedFolder}`}
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
                      {searchQuery ? "Try a different search term" : selectedFolder ? `No resources in "${selectedFolder}"` : "Add your first resource to get started"}
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
                        <Card key={resource.id} className="group hover:shadow-md transition-all hover:border-primary/50 cursor-pointer" onClick={() => openResourceDetail(resource.id)}>
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
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); openResourceDetail(resource.id); }}>
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
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); openResourceDetail(resource.id, true); }}>
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
                          onClick={() => openResourceDetail(resource.id)}
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
                              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); openResourceDetail(resource.id); }}>
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
                              <DropdownMenuItem onClick={(e) => { e.stopPropagation(); openResourceDetail(resource.id, true); }}>
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
                <Card key={template.id} className="group hover:shadow-md transition-shadow border-primary/20 cursor-pointer" onClick={() => openResourceDetail(template.id)}>
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
                        <DropdownMenuItem onClick={(e) => { e.stopPropagation(); openResourceDetail(template.id, true); }}>
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
        </Tabs>
      </div>

      {/* Create Resource Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={(open) => {
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
            duration_minutes: "",
            points_value: "5",
            difficulty: "beginner",
            is_public: false,
            tags: []
          });
          setUploadedFileName(null);
          setUploadedFile(null);
          setTagInput("");
          setNewResourceType("");
        }
      }}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Resource</DialogTitle>
            <DialogDescription>
              Add a new educational resource to your library.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateResource} className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Basic Information */}
              <div className="space-y-4">
                <h3 className="font-medium text-sm text-muted-foreground">Basic Information</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Resource Type *</Label>
                  <Select 
                    value={newResource.type} 
                    onValueChange={(v) => {
                      setNewResourceType(v);
                      setNewResource({...newResource, type: v as ResourceType});
                      // Clear file if type changes
                      if (uploadedFile) {
                        setUploadedFile(null);
                        setUploadedFileName(null);
                        toast.info("Uploaded file cleared due to type change");
                      }
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

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="category">Category *</Label>
                    {!isAddingCategory && (
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="sm" 
                        className="h-auto p-0 text-xs text-primary"
                        onClick={() => setIsAddingCategory(true)}
                      >
                        + Add New
                      </Button>
                    )}
                  </div>
                  {isAddingCategory ? (
                    <div className="flex gap-2">
                      <Input 
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="New category name"
                        className="h-10"
                      />
                      <Button type="button" size="sm" onClick={handleAddCategory}>Add</Button>
                      <Button type="button" variant="ghost" size="sm" onClick={() => setIsAddingCategory(false)}>Cancel</Button>
                    </div>
                  ) : (
                    <Select 
                      value={newResource.category}
                      onValueChange={(v) => setNewResource({...newResource, category: v})}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (up to 10)</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add a tag..."
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTag();
                        }
                      }}
                    />
                    <Button type="button" variant="outline" onClick={handleAddTag} disabled={newResource.tags.length >= 10}>
                      Add
                    </Button>
                  </div>
                  {newResource.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {newResource.tags.map(tag => (
                        <Badge key={tag} variant="secondary" className="gap-1">
                          {tag}
                          <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-1 hover:text-destructive">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Difficulty Level *</Label>
                  <Select 
                    value={newResource.difficulty}
                    onValueChange={(v) => setNewResource({...newResource, difficulty: v as "beginner" | "intermediate" | "advanced"})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">
                        <span className="flex items-center gap-2">
                          <Badge variant="success" className="text-xs">Beginner</Badge>
                        </span>
                      </SelectItem>
                      <SelectItem value="intermediate">
                        <span className="flex items-center gap-2">
                          <Badge variant="warning" className="text-xs">Intermediate</Badge>
                        </span>
                      </SelectItem>
                      <SelectItem value="advanced">
                        <span className="flex items-center gap-2">
                          <Badge variant="destructive" className="text-xs">Advanced</Badge>
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Right Column - Settings & Content */}
              <div className="space-y-4">
                <h3 className="font-medium text-sm text-muted-foreground">Settings</h3>

                <div className="space-y-2">
                  <Label>Author</Label>
                  <Input value="You (Auto-assigned)" disabled className="bg-muted" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes) {durationRequired(newResource.type) && "*"}</Label>
                    <Input 
                      id="duration"
                      type="number"
                      min="1"
                      max="999"
                      placeholder="e.g., 30"
                      value={newResource.duration_minutes}
                      onChange={(e) => setNewResource({...newResource, duration_minutes: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="points">Points Value *</Label>
                    <Input 
                      id="points"
                      type="number"
                      min="1"
                      max="100"
                      placeholder="5"
                      value={newResource.points_value}
                      onChange={(e) => setNewResource({...newResource, points_value: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="is_public"
                    checked={newResource.is_public}
                    onCheckedChange={(checked) => setNewResource({...newResource, is_public: !!checked})}
                  />
                  <label htmlFor="is_public" className="text-sm font-medium leading-none cursor-pointer">
                    Public Resource
                  </label>
                  <span className="text-xs text-muted-foreground">(visible in marketplace)</span>
                </div>

                <Separator className="my-4" />

                {/* Content Section - Changes based on type */}
                <h3 className="font-medium text-sm text-muted-foreground">Content</h3>

                {/* File Upload for file-based types */}
                {(requiresFileUpload(newResource.type) || newResource.type === "video" || newResource.type === "guide") && (
                  <div className="space-y-2">
                    <Label>Upload File</Label>
                    {uploadedFileName ? (
                      <div className="border rounded-lg p-4 flex items-center justify-between bg-muted/20">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-primary" />
                          <div>
                            <p className="text-sm font-medium">{uploadedFileName}</p>
                            <p className="text-xs text-muted-foreground">
                              {uploadedFile ? `${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB` : ""} • Uploaded
                            </p>
                          </div>
                        </div>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive hover:text-destructive"
                          onClick={() => {
                            setUploadedFileName(null);
                            setUploadedFile(null);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : isUploading ? (
                      <div className="border rounded-lg p-8 space-y-3">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span>Uploading...</span>
                          <span>{uploadProgress}%</span>
                        </div>
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all duration-200 ease-out"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <label className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 cursor-pointer transition-colors block">
                        <input
                          type="file"
                          className="hidden"
                          accept={getSupportedFormats(newResource.type).extensions.join(",")}
                          onChange={handleFileUpload}
                        />
                        <div className="flex flex-col items-center gap-2">
                          <Download className="h-8 w-8 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Click to upload file</span>
                          <span className="text-xs text-muted-foreground">
                            Max 100MB • Formats: {getSupportedFormats(newResource.type).extensions.join(", ")}
                          </span>
                        </div>
                      </label>
                    )}
                  </div>
                )}

                {/* External URL for videos/links */}
                {canUseExternalUrl(newResource.type) && (
                  <div className="space-y-2">
                    <Label htmlFor="external_url">
                      External URL {newResource.type === "link" && "*"}
                    </Label>
                    <div className="flex gap-2">
                      <LinkIcon className="h-4 w-4 mt-3 text-muted-foreground" />
                      <Input 
                        id="external_url"
                        type="url"
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={newResource.external_url}
                        onChange={(e) => setNewResource({...newResource, external_url: e.target.value})}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {newResource.type === "video" && "YouTube, Vimeo, or other video URL"}
                      {newResource.type === "link" && "Website URL"}
                      {newResource.type === "article" && "Or provide an external article URL"}
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
              </div>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)} disabled={isSaving}>
                Cancel
              </Button>
              <Button type="submit" disabled={isUploading || isSaving}>
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
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

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

      {/* Resource Detail Sheet */}
      <Sheet open={isDetailSheetOpen} onOpenChange={(open) => { if (!open) closeDetailSheet(); }}>
        <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
          {isLoadingDetail ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : detailResource ? (
            <div className="space-y-6">
              <SheetHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-xl">
                      {(() => {
                        const Icon = getIconForType(detailResource.type);
                        return <Icon className="h-8 w-8 text-primary" />;
                      })()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <SheetTitle className="text-xl">{detailResource.title}</SheetTitle>
                        {detailResource.isFeatured && (
                          <Badge variant="warning">
                            <Star className="h-3 w-3 mr-1 fill-current" /> Featured
                          </Badge>
                        )}
                        {!detailResource.is_published && (
                          <Badge variant="secondary">
                            <EyeOff className="h-3 w-3 mr-1" /> Draft
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <Badge variant="outline" className="capitalize">
                          {detailResource.type.replace("-", " ")}
                        </Badge>
                        <span className="flex items-center gap-1">
                          <Folder className="h-3.5 w-3.5" />
                          {detailResource.category}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {detailResource.updatedAt}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center gap-2 flex-wrap">
                  {!isEditing ? (
                    <>
                      {!detailResource.id.startsWith('ct-') && !detailResource.id.startsWith('lp-') && (
                        <Button variant="outline" size="sm" onClick={() => { setSelectedResource(detailResource); setIsShareDialogOpen(true); }}>
                          <Share2 className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      )}
                      {!detailResource.id.startsWith('ct-') && !detailResource.id.startsWith('lp-') && (
                        <Button variant="outline" size="sm" onClick={toggleDetailFeatured}>
                          <Star className={`h-4 w-4 mr-2 ${detailResource.isFeatured ? "fill-yellow-400 text-yellow-400" : ""}`} />
                          {detailResource.isFeatured ? "Unfeature" : "Feature"}
                        </Button>
                      )}
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={() => { setSelectedResource(detailResource); setIsDeleteDialogOpen(true); }}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" size="sm" onClick={() => setIsEditing(false)} disabled={isSaving}>
                        Cancel
                      </Button>
                      <Button size="sm" onClick={handleSaveDetail} disabled={isSaving}>
                        {isSaving ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </>
                  )}
                </div>
              </SheetHeader>

              <Separator />

              {isEditing ? (
                <div className="space-y-6">
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
                        id="edit-featured"
                        checked={editForm.is_featured}
                        onCheckedChange={(checked) => setEditForm({ ...editForm, is_featured: !!checked })}
                      />
                      <label htmlFor="edit-featured" className="text-sm font-medium">
                        Featured resource
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="edit-published"
                        checked={editForm.is_published}
                        onCheckedChange={(checked) => setEditForm({ ...editForm, is_published: !!checked })}
                      />
                      <label htmlFor="edit-published" className="text-sm font-medium">
                        Published
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Description</h3>
                    <p className="text-foreground">
                      {detailResource.description || "No description provided."}
                    </p>
                  </div>

                  {/* External URL */}
                  {detailResource.external_url && (
                    <div className="p-4 bg-muted/50 rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ExternalLink className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium">External Resource</p>
                          <a
                            href={detailResource.external_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-primary hover:underline"
                          >
                            {detailResource.external_url}
                          </a>
                        </div>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={detailResource.external_url} target="_blank" rel="noopener noreferrer">
                          Open Link
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                    </div>
                  )}

                  {/* File */}
                  {detailResource.file_url && (
                    <div className="p-4 bg-muted/50 rounded-lg flex items-center justify-between">
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

                  {/* Content */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Content</h3>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      {detailResource.content ? (
                        <div className="whitespace-pre-wrap">{detailResource.content}</div>
                      ) : (
                        <p className="text-muted-foreground italic">No content added yet.</p>
                      )}
                    </div>
                  </div>

                  <Separator />

                  {/* Sharing info */}
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">Shared With</h3>
                    {detailShares.length === 0 ? (
                      <div className="text-center py-6 text-muted-foreground border rounded-lg">
                        <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Not shared with any families yet</p>
                        <Button
                          variant="link"
                          size="sm"
                          className="mt-2"
                          onClick={() => { setSelectedResource(detailResource); setIsShareDialogOpen(true); }}
                        >
                          Share this resource
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {detailShares.map((share) => (
                          <div key={share.id} className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50">
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
                              onClick={() => handleRemoveDetailShare(share.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="border rounded-lg p-4 space-y-3">
                    <h3 className="text-sm font-medium">Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Created</span>
                        <p>{detailResource.created_at ? new Date(detailResource.created_at).toLocaleDateString() : 'N/A'}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last updated</span>
                        <p>{detailResource.updatedAt}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Status</span>
                        <p>
                          <Badge variant={detailResource.is_published ? "default" : "secondary"}>
                            {detailResource.is_published ? "Published" : "Draft"}
                          </Badge>
                        </p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Featured</span>
                        <p>{detailResource.isFeatured ? "Yes" : "No"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default function KnowledgeCenterPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    }>
      <KnowledgeCenterContent />
    </Suspense>
  );
}
