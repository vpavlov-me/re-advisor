"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { 
  ChevronLeft, 
  Save, 
  Upload, 
  Plus, 
  Trash2, 
  FileText, 
  Video, 
  BookOpen,
  ArrowUp,
  ArrowDown,
  Search,
  X,
  Eye,
  Loader2,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

type Module = {
  id: string;
  dbId?: number;
  title: string;
  description: string;
  estimatedDuration: number;
  resources: ResourceItem[];
};

type ResourceItem = {
  id: string;
  title: string;
  type: string;
};

interface LearningPath {
  id: number;
  advisor_id: string;
  title: string;
  description: string | null;
  difficulty: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export default function EditLearningPathClient({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  
  const [learningPath, setLearningPath] = useState<LearningPath | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("beginner");
  const [modules, setModules] = useState<Module[]>([]);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isResourceDialogOpen, setIsResourceDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [availableResources, setAvailableResources] = useState<ResourceItem[]>([]);
  const [resourceSearch, setResourceSearch] = useState("");

  const activeModule = modules.find(m => m.id === activeModuleId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
          toast.error("Invalid learning path ID");
          router.push("/knowledge");
          return;
        }

        // Fetch learning path
        const { data: pathData, error: pathError } = await supabase
          .from('learning_paths')
          .select('*')
          .eq('id', numericId)
          .single();

        if (pathError) throw pathError;

        if (!pathData) {
          toast.error("Learning path not found");
          router.push("/knowledge");
          return;
        }

        setLearningPath(pathData);
        setTitle(pathData.title);
        setDescription(pathData.description || "");
        setDifficulty(pathData.difficulty || "beginner");

        // Fetch steps
        const { data: stepsData, error: stepsError } = await supabase
          .from('learning_path_steps')
          .select('*')
          .eq('learning_path_id', numericId)
          .order('step_order');

        if (stepsError) {
          console.error("Error fetching steps:", stepsError);
        }

        // Convert steps to modules
        if (stepsData && stepsData.length > 0) {
          const loadedModules: Module[] = stepsData.map((step, index) => ({
            id: `m${index + 1}`,
            dbId: step.id,
            title: step.title,
            description: step.description || "",
            estimatedDuration: step.estimated_duration_minutes || 0,
            resources: []
          }));
          setModules(loadedModules);
          setActiveModuleId(loadedModules[0].id);
        } else {
          const defaultModule: Module = {
            id: "m1",
            title: "Introduction",
            description: "",
            estimatedDuration: 0,
            resources: []
          };
          setModules([defaultModule]);
          setActiveModuleId("m1");
        }

        // Fetch available resources
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: resourcesData } = await supabase
            .from('knowledge_resources')
            .select('id, title, type')
            .eq('advisor_id', user.id)
            .eq('is_published', true);

          if (resourcesData) {
            setAvailableResources(resourcesData.map(r => ({
              id: r.id.toString(),
              title: r.title,
              type: r.type
            })));
          }
        }
      } catch (error) {
        console.error("Error fetching learning path:", error);
        toast.error("Failed to load learning path");
        router.push("/knowledge");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

  const handleSave = async (publish = false) => {
    if (!learningPath || !title.trim()) {
      toast.error("Please enter a title for the learning path");
      return;
    }

    setIsSaving(true);
    try {
      const { error: pathError } = await supabase
        .from('learning_paths')
        .update({
          title,
          description,
          difficulty,
          is_published: publish ? true : learningPath.is_published,
          updated_at: new Date().toISOString()
        })
        .eq('id', learningPath.id);

      if (pathError) throw pathError;

      await supabase
        .from('learning_path_steps')
        .delete()
        .eq('learning_path_id', learningPath.id);

      if (modules.length > 0) {
        const steps = modules.map((module, index) => ({
          learning_path_id: learningPath.id,
          title: module.title,
          description: module.description,
          step_order: index + 1,
          estimated_duration_minutes: module.estimatedDuration || null
        }));

        const { error: stepsError } = await supabase
          .from('learning_path_steps')
          .insert(steps);

        if (stepsError) {
          console.error("Error saving steps:", stepsError);
        }
      }

      setLearningPath({
        ...learningPath,
        title,
        description,
        difficulty,
        is_published: publish ? true : learningPath.is_published,
        updated_at: new Date().toISOString()
      });

      toast.success(publish ? "Learning path published!" : "Changes saved!");
    } catch (error) {
      console.error("Error saving learning path:", error);
      toast.error("Failed to save learning path");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!learningPath) return;

    setIsDeleting(true);
    try {
      await supabase
        .from('learning_path_steps')
        .delete()
        .eq('learning_path_id', learningPath.id);

      const { error } = await supabase
        .from('learning_paths')
        .delete()
        .eq('id', learningPath.id);

      if (error) throw error;

      toast.success("Learning path deleted");
      router.push("/knowledge");
    } catch (error) {
      console.error("Error deleting learning path:", error);
      toast.error("Failed to delete learning path");
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  const addModule = () => {
    const newId = `m${modules.length + 1}-${Date.now()}`;
    const newModule: Module = {
      id: newId,
      title: "New Module",
      description: "",
      estimatedDuration: 0,
      resources: []
    };
    setModules([...modules, newModule]);
    setActiveModuleId(newId);
    toast.success("New module added");
  };

  const updateModule = (id: string, field: keyof Module, value: unknown) => {
    setModules(modules.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const deleteModule = (id: string) => {
    if (modules.length === 1) {
      toast.error("Cannot delete the only module");
      return;
    }
    const newModules = modules.filter(m => m.id !== id);
    setModules(newModules);
    if (activeModuleId === id) {
      setActiveModuleId(newModules[0].id);
    }
    toast.success("Module deleted");
  };

  const moveModule = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === modules.length - 1) return;
    
    const newModules = [...modules];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newModules[index], newModules[targetIndex]] = [newModules[targetIndex], newModules[index]];
    setModules(newModules);
  };

  const addResourceToModule = (resource: ResourceItem) => {
    if (!activeModule) return;
    if (activeModule.resources.some(r => r.id === resource.id)) {
      toast.error("Resource already added");
      return;
    }
    
    updateModule(activeModule.id, "resources", [...activeModule.resources, resource]);
    setIsResourceDialogOpen(false);
    toast.success(`"${resource.title}" added`);
  };

  const removeResourceFromModule = (resourceId: string) => {
    if (!activeModule) return;
    updateModule(activeModule.id, "resources", activeModule.resources.filter(r => r.id !== resourceId));
    toast.success("Resource removed");
  };

  const filteredResources = availableResources.filter(r => 
    r.title.toLowerCase().includes(resourceSearch.toLowerCase())
  );

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

  if (!learningPath) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <h2 className="text-lg font-semibold">Learning Path Not Found</h2>
          <Link href="/knowledge">
            <Button variant="outline">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Knowledge Center
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Bar */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/knowledge">
              <Button variant="ghost" size="icon">
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-semibold">Edit Learning Path</h1>
                <Badge variant={learningPath.is_published ? "default" : "outline"}>
                  {learningPath.is_published ? "Published" : "Draft"}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground">
                Last updated {new Date(learningPath.updated_at).toLocaleDateString()}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/knowledge/learning-path/${id}`}>
              <Button variant="ghost">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
            </Link>
            <Button variant="outline" onClick={() => handleSave(false)} disabled={isSaving}>
              {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
              Save
            </Button>
            {!learningPath.is_published && (
              <Button onClick={() => handleSave(true)} disabled={isSaving}>
                {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
                Publish
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-destructive"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 container py-8 grid grid-cols-12 gap-8">
        {/* Left Sidebar: Path Structure */}
        <div className="col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Path Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select value={difficulty} onValueChange={setDifficulty}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)} 
                  placeholder="What will families learn?"
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-base">Modules ({modules.length})</CardTitle>
              <Button size="sm" variant="ghost" onClick={addModule}>
                <Plus className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-2">
              <div className="space-y-2">
                {modules.map((module, index) => (
                  <div 
                    key={module.id}
                    className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                      activeModuleId === module.id 
                        ? "bg-primary/5 border-primary" 
                        : "bg-card border-border hover:bg-muted/50"
                    }`}
                    onClick={() => setActiveModuleId(module.id)}
                  >
                    <div className="flex flex-col gap-1 text-muted-foreground">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4" 
                        disabled={index === 0}
                        onClick={(e) => { e.stopPropagation(); moveModule(index, 'up'); }}
                      >
                        <ArrowUp className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-4 w-4"
                        disabled={index === modules.length - 1}
                        onClick={(e) => { e.stopPropagation(); moveModule(index, 'down'); }}
                      >
                        <ArrowDown className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{module.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {module.resources.length} resources
                        {module.estimatedDuration > 0 && ` • ${module.estimatedDuration}m`}
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 text-muted-foreground hover:text-red-600"
                      onClick={(e) => { e.stopPropagation(); deleteModule(module.id); }}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Content: Module Editor */}
        <div className="col-span-8">
          {activeModule ? (
            <Card className="h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Edit Module</CardTitle>
                  <Badge variant="outline">Module {modules.findIndex(m => m.id === activeModuleId) + 1}</Badge>
                </div>
              </CardHeader>
              <CardContent className="flex-1 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Module Title</Label>
                    <Input 
                      value={activeModule.title} 
                      onChange={(e) => updateModule(activeModule.id, "title", e.target.value)} 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Estimated Duration (minutes)</Label>
                      <Input 
                        type="number"
                        min="0"
                        value={activeModule.estimatedDuration || ""} 
                        onChange={(e) => updateModule(activeModule.id, "estimatedDuration", parseInt(e.target.value) || 0)} 
                        placeholder="e.g., 30"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Module Description</Label>
                    <Textarea 
                      value={activeModule.description} 
                      onChange={(e) => updateModule(activeModule.id, "description", e.target.value)} 
                      placeholder="Describe what this module covers..."
                      rows={4}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Resources</h3>
                    <Button size="sm" onClick={() => setIsResourceDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Resource
                    </Button>
                  </div>

                  {activeModule.resources.length > 0 ? (
                    <div className="space-y-2">
                      {activeModule.resources.map((resource) => (
                        <div key={resource.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-background rounded-md border">
                              {resource.type === 'video' ? <Video className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                            </div>
                            <div>
                              <div className="font-medium text-sm">{resource.title}</div>
                              <Badge variant="secondary" className="text-[10px] h-5">{resource.type}</Badge>
                            </div>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => removeResourceFromModule(resource.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed rounded-lg">
                      <BookOpen className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                      <p className="text-sm text-muted-foreground">No resources added to this module yet.</p>
                      <Button 
                        variant="link" 
                        className="mt-2"
                        onClick={() => setIsResourceDialogOpen(true)}
                      >
                        Add your first resource
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Select a module to edit
            </div>
          )}
        </div>
      </div>

      {/* Resource Selection Dialog */}
      <Dialog open={isResourceDialogOpen} onOpenChange={setIsResourceDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add Resource to Module</DialogTitle>
            <DialogDescription>
              Select resources from your library to add to this module.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search resources..." 
                className="pl-9"
                value={resourceSearch}
                onChange={(e) => setResourceSearch(e.target.value)}
              />
            </div>
            <ScrollArea className="h-[300px] border rounded-md p-4">
              {filteredResources.length > 0 ? (
                <div className="space-y-2">
                  {filteredResources.map((resource) => {
                    const isSelected = activeModule?.resources.some(r => r.id === resource.id);
                    return (
                      <div 
                        key={resource.id} 
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                          isSelected ? "bg-primary/5 border-primary" : "hover:bg-muted/50"
                        }`}
                        onClick={() => !isSelected && addResourceToModule(resource)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-background rounded-md border">
                            {resource.type === 'video' ? <Video className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
                          </div>
                          <div>
                            <div className="font-medium text-sm">{resource.title}</div>
                            <div className="text-xs text-muted-foreground capitalize">{resource.type}</div>
                          </div>
                        </div>
                        {isSelected && <Badge variant="secondary">Added</Badge>}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">
                    {availableResources.length === 0 
                      ? "No published resources available."
                      : "No resources match your search."}
                  </p>
                </div>
              )}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Learning Path</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{title}&quot;? This will also delete all modules and cannot be undone.
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
    </div>
  );
}