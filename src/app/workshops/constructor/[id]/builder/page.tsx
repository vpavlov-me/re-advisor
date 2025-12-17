"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Save,
  Eye,
  Play,
  Settings,
  Trash2,
  GripVertical,
  Clock,
  ChevronRight,
  Edit,
  Copy,
  Library,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { TemplateLibraryBrowser } from "@/components/workshops/template-library-browser";
import type { WorkshopTemplate, WorkshopScreen, WorkshopTemplateBlock } from "@/types/workshop-constructor";

export default function WorkshopBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [template, setTemplate] = useState<WorkshopTemplate | null>(null);
  const [screens, setScreens] = useState<WorkshopScreen[]>([]);
  const [selectedScreen, setSelectedScreen] = useState<WorkshopScreen | null>(null);
  const [draggedScreen, setDraggedScreen] = useState<WorkshopScreen | null>(null);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadTemplate();
  }, [id]);

  const loadTemplate = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock data
      setTemplate({
        id,
        created_by: "user1",
        name: "Strategic Planning Workshop",
        description: "Comprehensive strategic planning session",
        duration_minutes: 180,
        target_audience: "Family Council, Board",
        category: "Strategy",
        is_public: false,
        is_master: true,
        cloned_from: null,
        version: 1,
        status: "draft",
        settings: { enableAI: true, enableChat: true },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        published_at: null,
      });

      setScreens([
        {
          id: "screen-1",
          template_id: id,
          screen_key: "kickoff",
          name: "Welcome & Kickoff",
          description: "Workshop introduction and objectives",
          order_index: 0,
          duration_minutes: 10,
          screen_type: "text",
          content_type: "introduction",
          content: {
            title: "Welcome to the Workshop",
            description: "We'll be working together to develop a strategic plan",
            objectives: ["Define vision", "Identify goals", "Create action plan"]
          },
          navigation: { next: "screen-2" },
          ai_config: { enabled: false },
          has_timer: false,
          timer_config: {},
          is_optional: false,
          show_conditions: {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "screen-2",
          template_id: id,
          screen_key: "swot-analysis",
          name: "SWOT Analysis",
          description: "Analyze strengths, weaknesses, opportunities, threats",
          order_index: 1,
          duration_minutes: 30,
          screen_type: "exercise",
          content_type: "swot",
          content: {
            title: "SWOT Analysis",
            description: "Collaborative analysis of our strategic position"
          },
          navigation: { previous: "screen-1", next: "screen-3" },
          ai_config: { enabled: true, style: "supportive" },
          has_timer: true,
          timer_config: { duration: 30, showWarning: true, warningAt: 5 },
          is_optional: false,
          show_conditions: {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);

      if (!selectedScreen) {
        setSelectedScreen(screens[0] || null);
      }
    } catch (error) {
      toast.error("Failed to load template");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      // TODO: API call to save template and screens
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Workshop saved");
    } catch (error) {
      toast.error("Failed to save workshop");
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!template) return;

    if (screens.length === 0) {
      toast.error("Add at least one screen before publishing");
      return;
    }

    try {
      // TODO: API call to publish
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Workshop published!");
      router.push("/workshops/constructor");
    } catch (error) {
      toast.error("Failed to publish workshop");
    }
  };

  const handlePreview = () => {
    router.push(`/workshops/constructor/${id}/preview`);
  };

  const handleAddScreen = () => {
    setLibraryOpen(true);
  };

  const handleDeleteScreen = (screenId: string) => {
    if (!confirm("Are you sure you want to delete this screen?")) return;

    const updatedScreens = screens
      .filter(s => s.id !== screenId)
      .map((s, index) => ({ ...s, order_index: index }));

    setScreens(updatedScreens);

    if (selectedScreen?.id === screenId) {
      setSelectedScreen(updatedScreens[0] || null);
    }

    toast.success("Screen deleted");
  };

  const handleDuplicateScreen = (screen: WorkshopScreen) => {
    const newScreen: WorkshopScreen = {
      ...screen,
      id: `screen-${Date.now()}`,
      screen_key: `${screen.screen_key}-copy`,
      name: `${screen.name} (Copy)`,
      order_index: screens.length,
    };

    setScreens([...screens, newScreen]);
    toast.success("Screen duplicated");
  };

  const handleDragStart = (screen: WorkshopScreen) => {
    setDraggedScreen(screen);
  };

  const handleDragOver = (e: React.DragEvent, targetScreen: WorkshopScreen) => {
    e.preventDefault();

    if (!draggedScreen || draggedScreen.id === targetScreen.id) return;

    const draggedIndex = screens.findIndex(s => s.id === draggedScreen.id);
    const targetIndex = screens.findIndex(s => s.id === targetScreen.id);

    const newScreens = [...screens];
    newScreens.splice(draggedIndex, 1);
    newScreens.splice(targetIndex, 0, draggedScreen);

    const reorderedScreens = newScreens.map((s, index) => ({
      ...s,
      order_index: index
    }));

    setScreens(reorderedScreens);
  };

  const handleDragEnd = () => {
    setDraggedScreen(null);
  };

  const handleEditScreen = (screen: WorkshopScreen) => {
    router.push(`/workshops/constructor/${id}/screen/${screen.screen_key}`);
  };

  const getTotalDuration = () => {
    return screens.reduce((sum, s) => sum + (s.duration_minutes || 0), 0);
  };

  const getContentTypeIcon = (contentType: string | null) => {
    // Return appropriate icon based on content type
    return <ChevronRight className="h-4 w-4" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading workshop builder...</p>
        </div>
      </div>
    );
  }

  if (!template) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Template not found</p>
            <Button onClick={() => router.push("/workshops/constructor")} className="mt-4">
              Back to Constructor
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push("/workshops/constructor")}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">{template.name}</h1>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {getTotalDuration()} min total
                  </span>
                  <span>•</span>
                  <span>{screens.length} screens</span>
                  <Badge variant="outline">{template.status}</Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handlePreview}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" onClick={handleSave} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button onClick={handlePublish}>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Publish
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Screens List - Left Sidebar */}
        <div className="w-80 border-r bg-muted/10 flex flex-col">
          <div className="p-4 border-b">
            <Button onClick={handleAddScreen} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Screen
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {screens.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <Library className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p className="text-sm">No screens yet</p>
                  <p className="text-xs mt-1">Click "Add Screen" to get started</p>
                </div>
              ) : (
                screens.map((screen, index) => (
                  <div
                    key={screen.id}
                    draggable
                    onDragStart={() => handleDragStart(screen)}
                    onDragOver={(e) => handleDragOver(e, screen)}
                    onDragEnd={handleDragEnd}
                    className={`
                      group relative p-3 rounded-lg border bg-background cursor-move
                      transition-all hover:shadow-md
                      ${selectedScreen?.id === screen.id ? "ring-2 ring-primary" : ""}
                      ${draggedScreen?.id === screen.id ? "opacity-50" : ""}
                    `}
                    onClick={() => setSelectedScreen(screen)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-muted-foreground">
                            {index + 1}
                          </span>
                          <span className="font-medium text-sm truncate">
                            {screen.name}
                          </span>
                        </div>

                        {screen.description && (
                          <p className="text-xs text-muted-foreground line-clamp-1 mb-2">
                            {screen.description}
                          </p>
                        )}

                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          {getContentTypeIcon(screen.content_type)}
                          <span>{screen.content_type || screen.screen_type}</span>
                          {screen.duration_minutes && (
                            <>
                              <span>•</span>
                              <span>{screen.duration_minutes}m</span>
                            </>
                          )}
                          {screen.ai_config?.enabled && (
                            <>
                              <span>•</span>
                              <Sparkles className="h-3 w-3 text-purple-500" />
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons - Show on Hover */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditScreen(screen);
                        }}
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicateScreen(screen);
                        }}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-red-600 hover:text-red-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteScreen(screen.id);
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Screen Preview/Editor - Main Area */}
        <div className="flex-1 overflow-auto">
          {selectedScreen ? (
            <div className="container mx-auto p-8 max-w-4xl">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle>{selectedScreen.name}</CardTitle>
                      {selectedScreen.description && (
                        <CardDescription className="mt-2">
                          {selectedScreen.description}
                        </CardDescription>
                      )}
                    </div>
                    <Button onClick={() => handleEditScreen(selectedScreen)}>
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Screen
                    </Button>
                  </div>

                  <div className="flex items-center gap-4 mt-4 text-sm">
                    <Badge>{selectedScreen.screen_type}</Badge>
                    {selectedScreen.content_type && (
                      <Badge variant="outline">{selectedScreen.content_type}</Badge>
                    )}
                    {selectedScreen.duration_minutes && (
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {selectedScreen.duration_minutes} minutes
                      </span>
                    )}
                    {selectedScreen.ai_config?.enabled && (
                      <span className="flex items-center gap-1 text-purple-600">
                        <Sparkles className="h-4 w-4" />
                        AI Enabled
                      </span>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <Separator />

                  {/* Content Preview */}
                  <div>
                    <h3 className="font-semibold mb-3">Content Preview</h3>
                    <div className="p-6 border rounded-lg bg-muted/5">
                      {selectedScreen.content.title && (
                        <h4 className="text-lg font-semibold mb-2">
                          {selectedScreen.content.title}
                        </h4>
                      )}
                      {selectedScreen.content.description && (
                        <p className="text-muted-foreground">
                          {selectedScreen.content.description}
                        </p>
                      )}
                      {selectedScreen.content.objectives && (
                        <ul className="mt-4 space-y-2">
                          {selectedScreen.content.objectives.map((obj: string, i: number) => (
                            <li key={i} className="flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-600" />
                              {obj}
                            </li>
                          ))}
                        </ul>
                      )}

                      {selectedScreen.content_type === "swot" && (
                        <div className="grid grid-cols-2 gap-4 mt-4">
                          <div className="p-4 border rounded bg-green-50">
                            <strong>Strengths</strong>
                          </div>
                          <div className="p-4 border rounded bg-red-50">
                            <strong>Weaknesses</strong>
                          </div>
                          <div className="p-4 border rounded bg-blue-50">
                            <strong>Opportunities</strong>
                          </div>
                          <div className="p-4 border rounded bg-yellow-50">
                            <strong>Threats</strong>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Navigation */}
                  {(selectedScreen.navigation.previous || selectedScreen.navigation.next) && (
                    <div>
                      <h3 className="font-semibold mb-3">Navigation</h3>
                      <div className="flex items-center gap-4">
                        {selectedScreen.navigation.previous && (
                          <div className="text-sm text-muted-foreground">
                            Previous: {selectedScreen.navigation.previous}
                          </div>
                        )}
                        {selectedScreen.navigation.next && (
                          <div className="text-sm text-muted-foreground">
                            Next: {selectedScreen.navigation.next}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* AI Configuration */}
                  {selectedScreen.ai_config?.enabled && (
                    <div>
                      <h3 className="font-semibold mb-3">AI Facilitation</h3>
                      <div className="p-4 border rounded-lg bg-purple-50">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="h-4 w-4 text-purple-600" />
                          <span className="font-medium">AI Enabled</span>
                        </div>
                        {selectedScreen.ai_config.style && (
                          <p className="text-sm text-muted-foreground">
                            Style: {selectedScreen.ai_config.style}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-muted-foreground">
                <Library className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Select a screen to preview</p>
                <p className="text-sm mt-2">or add a new screen to get started</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Template Library Sheet */}
      <Sheet open={libraryOpen} onOpenChange={setLibraryOpen}>
        <SheetContent side="right" className="w-[600px] sm:max-w-[600px]">
          <SheetHeader>
            <SheetTitle>Template Library</SheetTitle>
            <SheetDescription>
              Choose a pre-built block to add to your workshop
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <TemplateLibraryBrowser
              onAddBlock={(block) => {
                // Create new screen from block
                const newScreen: WorkshopScreen = {
                  id: `screen-${Date.now()}`,
                  template_id: id,
                  screen_key: `${block.block_key}-${Date.now()}`,
                  name: block.name,
                  description: block.description || "",
                  order_index: screens.length,
                  duration_minutes: block.estimated_duration || null,
                  screen_type: block.screen_type,
                  content_type: block.content_type,
                  content: block.default_content,
                  navigation: block.default_navigation,
                  ai_config: block.default_ai_config,
                  has_timer: false,
                  timer_config: {},
                  is_optional: false,
                  show_conditions: {},
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                };

                setScreens([...screens, newScreen]);
                setSelectedScreen(newScreen);
                setLibraryOpen(false);
              }}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
