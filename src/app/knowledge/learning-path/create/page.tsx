"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getKnowledgeResources, createLearningPathWithSteps } from "@/lib/supabase";
import { toast } from "sonner";
import { 
  ChevronLeft, 
  Save, 
  Upload, 
  Plus, 
  GripVertical, 
  Trash2, 
  FileText, 
  Video, 
  BookOpen, 
  MoreVertical,
  ArrowUp,
  ArrowDown,
  Search,
  X,
  Loader2
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

type KnowledgeResource = {
  id: string;
  title: string;
  type: string;
  description?: string;
};

type Module = {
  id: string;
  title: string;
  description: string;
  resources: string[]; // IDs of resources
};

export default function CreateLearningPathPage() {
  const router = useRouter();
  const [title, setTitle] = useState("Untitled Learning Path");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("governance");
  const [modules, setModules] = useState<Module[]>([
    { id: "m1", title: "Introduction", description: "Basic concepts and overview.", resources: [] }
  ]);
  const [activeModuleId, setActiveModuleId] = useState<string>("m1");
  const [isResourceDialogOpen, setIsResourceDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Resources from database
  const [availableResources, setAvailableResources] = useState<KnowledgeResource[]>([]);
  const [isLoadingResources, setIsLoadingResources] = useState(true);
  const [resourceSearchQuery, setResourceSearchQuery] = useState("");

  const activeModule = modules.find(m => m.id === activeModuleId);

  // Fetch resources from database via abstraction layer
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await getKnowledgeResources();

        setAvailableResources(
          (data || [])
            .filter((r: any) => r.is_published)
            .map((r: any) => ({
              id: String(r.id),
              title: r.title,
              type: r.type || "document",
              description: r.description,
            }))
        );
      } catch (error) {
        console.error("Error fetching resources:", error);
        toast.error("Failed to load resources");
      } finally {
        setIsLoadingResources(false);
      }
    };

    fetchResources();
  }, []);

  // Filter resources based on search query
  const filteredResources = availableResources.filter(resource =>
    resource.title.toLowerCase().includes(resourceSearchQuery.toLowerCase()) ||
    resource.type.toLowerCase().includes(resourceSearchQuery.toLowerCase())
  );

  const handleSave = async (asDraft = true) => {
    if (!title.trim()) {
      toast.error("Please enter a title for the learning path");
      return;
    }
    
    setIsSaving(true);
    try {
      // Create the learning path with steps via abstraction layer
      await createLearningPathWithSteps({
        title,
        description,
        category,
        difficulty: "beginner",
        is_published: !asDraft,
        steps: modules.map((module, index) => ({
          title: module.title,
          description: module.description,
          step_order: index + 1
        }))
      });

      toast.success(asDraft ? "Draft saved successfully!" : "Learning Path published!");
      router.push("/knowledge");
    } catch (error) {
      console.error("Error saving learning path:", error);
      toast.error("Failed to save learning path");
    } finally {
      setIsSaving(false);
    }
  };

  const addModule = () => {
    const newId = `m${modules.length + 1}`;
    setModules([...modules, { id: newId, title: "New Module", description: "", resources: [] }]);
    setActiveModuleId(newId);
    toast.success("New module added");
  };

  const updateModule = (id: string, field: keyof Module, value: any) => {
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

  const addResourceToModule = (resourceId: string) => {
    if (!activeModule) return;
    if (activeModule.resources.includes(resourceId)) {
      toast.error("Resource already added to this module");
      return;
    }
    
    updateModule(activeModule.id, "resources", [...activeModule.resources, resourceId]);
    setIsResourceDialogOpen(false);
    const resource = availableResources.find(r => r.id === resourceId);
    toast.success(`"${resource?.title}" added to module`);
  };

  const removeResourceFromModule = (resourceId: string) => {
    if (!activeModule) return;
    updateModule(activeModule.id, "resources", activeModule.resources.filter(id => id !== resourceId));
    toast.success("Resource removed from module");
  };

  return (
    <div className="min-h-screen bg-page-background flex flex-col">
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
              <h1 className="text-lg font-semibold">Create Learning Path</h1>
              <div className="text-xs text-muted-foreground">Draft • Last saved just now</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => handleSave(true)} disabled={isSaving}>
              {isSaving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save Draft
            </Button>
            <Button onClick={() => handleSave(false)} disabled={isSaving}>
              {isSaving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Upload className="h-4 w-4 mr-2" />
              )}
              Publish
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
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="governance">Governance</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="leadership">Leadership</SelectItem>
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
              <CardTitle className="text-base">Modules</CardTitle>
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
                      <div className="text-xs text-muted-foreground">{module.resources.length} resources</div>
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
                  <div className="space-y-2">
                    <Label>Module Description</Label>
                    <Textarea 
                      value={activeModule.description} 
                      onChange={(e) => updateModule(activeModule.id, "description", e.target.value)} 
                      placeholder="Describe what this module covers..."
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
                      {activeModule.resources.map((resourceId) => {
                        const resource = availableResources.find(r => r.id === resourceId);
                        if (!resource) return null;
                        return (
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
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed rounded-lg">
                      <BookOpen className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                      <p className="text-sm text-muted-foreground">No resources added to this module yet.</p>
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
                value={resourceSearchQuery}
                onChange={(e) => setResourceSearchQuery(e.target.value)}
              />
            </div>
            <ScrollArea className="h-[300px] border rounded-md p-4">
              {isLoadingResources ? (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : filteredResources.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
                  <p className="text-sm text-muted-foreground">
                    {availableResources.length === 0 
                      ? "No resources found. Create some resources first." 
                      : "No resources match your search."}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredResources.map((resource) => {
                    const isSelected = activeModule?.resources.includes(resource.id);
                    return (
                      <div 
                        key={resource.id} 
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                          isSelected ? "bg-primary/5 border-primary" : "hover:bg-muted/50"
                        }`}
                        onClick={() => !isSelected && addResourceToModule(resource.id)}
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
              )}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}