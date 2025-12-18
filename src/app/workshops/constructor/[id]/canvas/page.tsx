"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Plus,
  Save,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  Trash2,
  GripVertical,
  Library,
  Search,
  X,
  List,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import type { WorkshopTemplate, WorkshopScreen, WorkshopTemplateBlock } from "@/types/workshop-constructor";
import { VMV_MASTER_TEMPLATE } from "@/data/vmv-master-template";
import { VMV_V1_TEMPLATE } from "@/data/vmv-v1-template";
import { VMV_WORKSHOP_BLOCKS } from "@/data/vmv-workshop-blocks";

export default function CanvasBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [template, setTemplate] = useState<WorkshopTemplate | null>(null);
  const [screens, setScreens] = useState<WorkshopScreen[]>([]);
  const [availableBlocks, setAvailableBlocks] = useState<WorkshopTemplateBlock[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [draggedBlock, setDraggedBlock] = useState<WorkshopTemplateBlock | null>(null);
  const [draggedScreen, setDraggedScreen] = useState<WorkshopScreen | null>(null);
  const [dropIndicatorIndex, setDropIndicatorIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadTemplate();
    loadAvailableBlocks();
  }, [id]);

  const loadTemplate = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 300));

      if (id === "vmv-master-template") {
        setTemplate(VMV_MASTER_TEMPLATE);
        setScreens(VMV_MASTER_TEMPLATE.screens);
      } else if (id === "vmv-v1") {
        setTemplate(VMV_V1_TEMPLATE);
        setScreens(VMV_V1_TEMPLATE.screens);
      } else {
        setTemplate({
          id,
          created_by: "user1",
          name: "New Workshop Template",
          description: "Build your custom workshop",
          duration_minutes: 0,
          target_audience: "All",
          category: "Custom",
          is_public: false,
          is_master: false,
          cloned_from: null,
          version: 1,
          status: "draft",
          settings: { enableAI: true, enableChat: true },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          published_at: null,
        });
        setScreens([]);
      }
    } catch (error) {
      toast.error("Failed to load template");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadAvailableBlocks = () => {
    setAvailableBlocks(VMV_WORKSHOP_BLOCKS);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
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

  const handleDragStartBlock = (block: WorkshopTemplateBlock) => {
    setDraggedBlock(block);
  };

  const handleDragStartScreen = (screen: WorkshopScreen) => {
    setDraggedScreen(screen);
  };

  const handleDragOverCanvas = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDropIndicatorIndex(index);
  };

  const handleDropOnCanvas = (e: React.DragEvent, index: number) => {
    e.preventDefault();

    if (draggedBlock) {
      // Adding new block from library
      const newScreen: WorkshopScreen = {
        id: `screen-${Date.now()}`,
        template_id: id,
        screen_key: `${draggedBlock.block_key}-${Date.now()}`,
        name: draggedBlock.name,
        description: draggedBlock.description || "",
        order_index: index,
        duration_minutes: draggedBlock.estimated_duration || null,
        screen_type: draggedBlock.screen_type,
        content_type: draggedBlock.content_type,
        content: draggedBlock.default_content,
        navigation: draggedBlock.default_navigation,
        ai_config: draggedBlock.default_ai_config,
        has_timer: false,
        timer_config: {},
        is_optional: false,
        show_conditions: {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const newScreens = [...screens];
      newScreens.splice(index, 0, newScreen);
      const reordered = newScreens.map((s, i) => ({ ...s, order_index: i }));
      setScreens(reordered);
      toast.success(`Added "${draggedBlock.name}"`);
    } else if (draggedScreen) {
      // Reordering existing screen
      const fromIndex = screens.findIndex(s => s.id === draggedScreen.id);
      if (fromIndex !== index) {
        const newScreens = [...screens];
        newScreens.splice(fromIndex, 1);
        newScreens.splice(index, 0, draggedScreen);
        const reordered = newScreens.map((s, i) => ({ ...s, order_index: i }));
        setScreens(reordered);
      }
    }

    setDraggedBlock(null);
    setDraggedScreen(null);
    setDropIndicatorIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedBlock(null);
    setDraggedScreen(null);
    setDropIndicatorIndex(null);
  };

  const handleDeleteScreen = (screenId: string) => {
    if (!confirm("Remove this screen from workshop?")) return;
    const updated = screens
      .filter(s => s.id !== screenId)
      .map((s, i) => ({ ...s, order_index: i }));
    setScreens(updated);
    toast.success("Screen removed");
  };

  const getTotalDuration = () => {
    return screens.reduce((sum, s) => sum + (s.duration_minutes || 0), 0);
  };

  const filteredBlocks = availableBlocks.filter(block =>
    block.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    block.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    block.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading canvas builder...</p>
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
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white shadow-sm z-10">
        <div className="container mx-auto px-6 py-4">
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
                    {getTotalDuration()} min
                  </span>
                  <span>•</span>
                  <span>{screens.length} screens</span>
                  <Badge variant="outline">{template.status}</Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => router.push(`/workshops/constructor/${id}/builder`)}
              >
                <List className="h-4 w-4 mr-2" />
                List View
              </Button>
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
        {/* Block Library - Left Sidebar */}
        <div className="w-80 border-r bg-white shadow-sm flex flex-col">
          <div className="p-4 border-b">
            <h2 className="font-semibold mb-3 flex items-center gap-2">
              <Library className="h-5 w-5 text-orange-500" />
              Block Library
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search blocks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-9"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </div>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {filteredBlocks.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="text-sm">No blocks found</p>
                </div>
              ) : (
                filteredBlocks.map((block) => (
                  <div
                    key={block.id}
                    draggable
                    onDragStart={() => handleDragStartBlock(block)}
                    onDragEnd={handleDragEnd}
                    className={`
                      group p-4 rounded-lg border-2 border-orange-200 bg-orange-50
                      cursor-grab active:cursor-grabbing
                      transition-all hover:shadow-md hover:border-orange-300
                      ${draggedBlock?.id === block.id ? "opacity-50" : ""}
                    `}
                  >
                    <div className="flex items-start gap-2 mb-2">
                      <GripVertical className="h-4 w-4 text-orange-400 mt-1 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm text-gray-900 mb-1">
                          {block.name}
                        </h4>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {block.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
                      <Badge variant="outline" className="text-xs">
                        {block.content_type}
                      </Badge>
                      {block.estimated_duration && (
                        <>
                          <span>•</span>
                          <span>{block.estimated_duration}m</span>
                        </>
                      )}
                      {block.default_ai_config?.enabled && (
                        <>
                          <span>•</span>
                          <Sparkles className="h-3 w-3 text-purple-500" />
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-gray-50">
            <p className="text-xs text-muted-foreground">
              💡 Drag blocks onto the canvas to build your workshop
            </p>
          </div>
        </div>

        {/* Canvas - Main Area */}
        <div className="flex-1 overflow-auto">
          <div
            className="min-h-full p-8"
            style={{
              backgroundImage: `
                linear-gradient(to right, #f0f0f0 1px, transparent 1px),
                linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)
              `,
              backgroundSize: '24px 24px'
            }}
          >
            <div className="max-w-4xl mx-auto">
              {/* Drop zone at the beginning */}
              <div
                onDragOver={(e) => handleDragOverCanvas(e, 0)}
                onDrop={(e) => handleDropOnCanvas(e, 0)}
                className={`
                  mb-4 rounded-lg border-2 border-dashed transition-all
                  ${dropIndicatorIndex === 0 ? 'border-orange-500 bg-orange-50 h-24' : 'border-transparent h-12'}
                  ${screens.length === 0 ? 'h-48 border-gray-300 bg-white' : ''}
                `}
              >
                {screens.length === 0 && dropIndicatorIndex !== 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                    <Library className="h-12 w-12 mb-3 opacity-30" />
                    <p className="font-medium">Drop blocks here to start</p>
                    <p className="text-sm mt-1">Drag blocks from the left sidebar</p>
                  </div>
                )}
                {dropIndicatorIndex === 0 && (
                  <div className="flex items-center justify-center h-full">
                    <Plus className="h-6 w-6 text-orange-500" />
                    <span className="ml-2 font-medium text-orange-600">Drop here</span>
                  </div>
                )}
              </div>

              {/* Screen Cards */}
              {screens.map((screen, index) => (
                <div key={screen.id}>
                  <Card
                    draggable
                    onDragStart={() => handleDragStartScreen(screen)}
                    onDragEnd={handleDragEnd}
                    className={`
                      group mb-4 cursor-move hover:shadow-lg transition-all
                      ${draggedScreen?.id === screen.id ? 'opacity-50' : ''}
                    `}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Drag Handle */}
                        <div className="flex-shrink-0 pt-1">
                          <GripVertical className="h-5 w-5 text-gray-400" />
                        </div>

                        {/* Screen Number */}
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                        </div>

                        {/* Screen Content */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg mb-1">{screen.name}</h3>
                          {screen.description && (
                            <p className="text-sm text-muted-foreground mb-3">
                              {screen.description}
                            </p>
                          )}

                          <div className="flex flex-wrap items-center gap-2">
                            <Badge>{screen.screen_type}</Badge>
                            {screen.content_type && (
                              <Badge variant="outline">{screen.content_type}</Badge>
                            )}
                            {screen.duration_minutes && (
                              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                {screen.duration_minutes}m
                              </span>
                            )}
                            {screen.ai_config?.enabled && (
                              <span className="flex items-center gap-1 text-sm text-purple-600">
                                <Sparkles className="h-3 w-3" />
                                AI
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Delete Button */}
                        <div className="flex-shrink-0">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteScreen(screen.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Content Preview */}
                      {screen.content.title && (
                        <div className="mt-4 pt-4 border-t">
                          <p className="text-sm font-medium text-gray-700">
                            {screen.content.title}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Drop zone between cards */}
                  <div
                    onDragOver={(e) => handleDragOverCanvas(e, index + 1)}
                    onDrop={(e) => handleDropOnCanvas(e, index + 1)}
                    className={`
                      mb-4 rounded-lg border-2 border-dashed transition-all
                      ${dropIndicatorIndex === index + 1 ? 'border-orange-500 bg-orange-50 h-24' : 'border-transparent h-4'}
                    `}
                  >
                    {dropIndicatorIndex === index + 1 && (
                      <div className="flex items-center justify-center h-full">
                        <Plus className="h-6 w-6 text-orange-500" />
                        <span className="ml-2 font-medium text-orange-600">Drop here</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
