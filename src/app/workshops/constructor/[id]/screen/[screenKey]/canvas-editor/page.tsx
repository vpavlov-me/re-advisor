"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Eye,
  Plus,
  Trash2,
  GripVertical,
  Settings as SettingsIcon,
  Type,
  Image as ImageIcon,
  CheckSquare,
  Timer,
  MessageSquare,
  Sparkles,
  Layout,
  AlertCircle,
  Hash,
  CheckCircle,
  Tag,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { RichTextEditor } from "@/components/ui/rich-text-editor";

// Content block types
type ContentBlockType =
  | "text"
  | "image"
  | "checklist"
  | "timer"
  | "response"
  | "ai-assistant"
  | "divider"
  | "alert"
  | "numbered-inputs"
  | "success-message"
  | "value-pills"
  | "questions-box"
  | "success-banner"
  | "arrow-list";

interface ContentBlock {
  id: string;
  type: ContentBlockType;
  content: any;
  style: {
    backgroundColor?: string;
    textColor?: string;
    fontSize?: string;
    padding?: string;
    borderColor?: string;
    borderWidth?: string;
    borderRadius?: string;
  };
}

interface ScreenData {
  name: string;
  description: string;
  blocks: ContentBlock[];
}

const BLOCK_LIBRARY: Array<{
  type: ContentBlockType;
  icon: any;
  label: string;
  defaultContent: any;
}> = [
  {
    type: "text",
    icon: Type,
    label: "Text",
    defaultContent: { html: "<p>Your text here...</p>" },
  },
  {
    type: "image",
    icon: ImageIcon,
    label: "Image",
    defaultContent: { url: "", alt: "Image", caption: "" },
  },
  {
    type: "checklist",
    icon: CheckSquare,
    label: "Checklist",
    defaultContent: { items: [{ text: "Task 1", checked: false }] },
  },
  {
    type: "timer",
    icon: Timer,
    label: "Timer",
    defaultContent: { duration: 5, label: "Timer", mode: "countdown" },
  },
  {
    type: "response",
    icon: MessageSquare,
    label: "Response",
    defaultContent: { label: "Your response", html: "<p>Type your response here...</p>" },
  },
  {
    type: "ai-assistant",
    icon: Sparkles,
    label: "AI Assistant",
    defaultContent: {
      html: "<p>AI will help you here...</p>",
      enabled: true,
      preset: "balanced",
      temperature: 0.7,
      maxTokens: 1000,
      systemPrompt: "You are a helpful assistant for family governance discussions."
    },
  },
  {
    type: "divider",
    icon: Layout,
    label: "Divider",
    defaultContent: {},
  },
  {
    type: "alert",
    icon: AlertCircle,
    label: "Alert Box",
    defaultContent: { message: "Important information", type: "info" },
  },
  {
    type: "numbered-inputs",
    icon: Hash,
    label: "Numbered Inputs",
    defaultContent: {
      items: [
        { text: "First input label", placeholder: "Type here..." },
        { text: "Second input label", placeholder: "Type here..." },
        { text: "Third input label", placeholder: "Type here..." },
      ]
    },
  },
  {
    type: "success-message",
    icon: CheckCircle,
    label: "Success Message",
    defaultContent: { message: "Completed successfully!", showIcon: true },
  },
  {
    type: "value-pills",
    icon: Tag,
    label: "Value Pills",
    defaultContent: { values: ["Family", "Trust", "Transparency", "Integrity"] },
  },
  {
    type: "questions-box",
    icon: HelpCircle,
    label: "Questions Box",
    defaultContent: {
      questions: [
        "What is important for us?",
        "What do we want to achieve?",
        "How do we see our future?"
      ]
    },
  },
  {
    type: "success-banner",
    icon: CheckCircle,
    label: "Success Banner",
    defaultContent: { message: "Great job! Task completed.", fullWidth: true },
  },
  {
    type: "arrow-list",
    icon: ArrowRight,
    label: "Arrow List",
    defaultContent: {
      items: [
        { html: "<p>First step or recommendation</p>" },
        { html: "<p>Second step or recommendation</p>" },
        { html: "<p>Third step or recommendation</p>" }
      ]
    },
  },
];

export default function CanvasScreenEditorPage({
  params,
}: {
  params: Promise<{ id: string; screenKey: string }>;
}) {
  const { id, screenKey } = use(params);
  const router = useRouter();

  const [screenData, setScreenData] = useState<ScreenData>({
    name: "New Screen",
    description: "",
    blocks: [],
  });
  const [selectedBlock, setSelectedBlock] = useState<ContentBlock | null>(null);
  const [draggedBlock, setDraggedBlock] = useState<ContentBlock | null>(null);
  const [draggedLibraryType, setDraggedLibraryType] = useState<ContentBlockType | null>(null);
  const [dropIndicatorIndex, setDropIndicatorIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const handleDragStartLibrary = (type: ContentBlockType) => {
    setDraggedLibraryType(type);
  };

  const handleDragStartBlock = (block: ContentBlock) => {
    setDraggedBlock(block);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDropIndicatorIndex(index);
  };

  const handleDrop = (e: React.DragEvent, index: number) => {
    e.preventDefault();

    if (draggedLibraryType) {
      // Adding new block from library
      const libraryItem = BLOCK_LIBRARY.find((item) => item.type === draggedLibraryType);
      if (libraryItem) {
        const newBlock: ContentBlock = {
          id: `block-${Date.now()}`,
          type: libraryItem.type,
          content: libraryItem.defaultContent,
          style: {},
        };

        const newBlocks = [...screenData.blocks];
        newBlocks.splice(index, 0, newBlock);
        setScreenData({ ...screenData, blocks: newBlocks });
        setSelectedBlock(newBlock);
      }
    } else if (draggedBlock) {
      // Reordering existing block
      const fromIndex = screenData.blocks.findIndex((b) => b.id === draggedBlock.id);
      if (fromIndex !== index) {
        const newBlocks = [...screenData.blocks];
        newBlocks.splice(fromIndex, 1);
        newBlocks.splice(index, 0, draggedBlock);
        setScreenData({ ...screenData, blocks: newBlocks });
      }
    }

    setDraggedLibraryType(null);
    setDraggedBlock(null);
    setDropIndicatorIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedLibraryType(null);
    setDraggedBlock(null);
    setDropIndicatorIndex(null);
  };

  const handleDeleteBlock = (blockId: string) => {
    setScreenData({
      ...screenData,
      blocks: screenData.blocks.filter((b) => b.id !== blockId),
    });
    if (selectedBlock?.id === blockId) {
      setSelectedBlock(null);
    }
  };

  const handleUpdateBlock = (blockId: string, updates: Partial<ContentBlock>) => {
    setScreenData({
      ...screenData,
      blocks: screenData.blocks.map((b) => (b.id === blockId ? { ...b, ...updates } : b)),
    });
    if (selectedBlock?.id === blockId) {
      setSelectedBlock({ ...selectedBlock, ...updates } as ContentBlock);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Screen saved");
      router.push(`/workshops/constructor/${id}/builder`);
    } catch (error) {
      toast.error("Failed to save screen");
    } finally {
      setSaving(false);
    }
  };

  const renderBlockContent = (block: ContentBlock) => {
    const style = {
      backgroundColor: block.style.backgroundColor,
      color: block.style.textColor,
      fontSize: block.style.fontSize,
      padding: block.style.padding || "1rem",
      borderColor: block.style.borderColor,
      borderWidth: block.style.borderWidth,
      borderRadius: block.style.borderRadius,
      borderStyle: block.style.borderWidth ? "solid" : undefined,
    };

    switch (block.type) {
      case "text":
        const textContent = block.content.html || `<p>${block.content.text || ""}</p>`;
        return (
          <div style={style} className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: textContent }} />
        );

      case "image":
        return (
          <div style={style}>
            {block.content.url ? (
              <div>
                <img
                  src={block.content.url}
                  alt={block.content.alt || "Image"}
                  className="w-full h-auto rounded-lg"
                />
                {block.content.caption && (
                  <p className="text-sm text-gray-600 mt-2 text-center">{block.content.caption}</p>
                )}
              </div>
            ) : (
              <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <ImageIcon className="h-12 w-12 mx-auto mb-2" />
                  <p className="text-sm">No image selected</p>
                </div>
              </div>
            )}
          </div>
        );

      case "checklist":
        return (
          <div style={style} className="space-y-2">
            {(block.content.items || []).map((item: any, i: number) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.checked}
                  disabled
                  className="w-4 h-4"
                />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        );

      case "timer":
        return (
          <div style={style} className="p-4 bg-orange-500 text-white text-center rounded-lg">
            <Timer className="h-8 w-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">
              {block.content.duration} minutes
            </div>
            <div className="text-sm">{block.content.label}</div>
            <div className="text-xs mt-1 opacity-75">
              Mode: {block.content.mode === "countdown" ? "Countdown" : "Count Up"}
            </div>
          </div>
        );

      case "response":
        const responseContent = block.content.html || "<p>Type your response here...</p>";
        return (
          <div style={style}>
            <label className="block font-medium mb-2">{block.content.label}</label>
            <div className="prose prose-sm max-w-none border rounded-lg p-3 bg-gray-50">
              <div dangerouslySetInnerHTML={{ __html: responseContent }} />
            </div>
          </div>
        );

      case "ai-assistant":
        const aiContent = block.content.html || `<p>${block.content.message}</p>`;
        return (
          <div style={style} className="p-4 border-2 border-purple-200 bg-purple-50 rounded-lg">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-purple-600 flex-shrink-0 mt-1" />
              <div className="text-purple-900 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: aiContent }} />
            </div>
          </div>
        );

      case "divider":
        return <hr style={style} className="my-4 border-t-2" />;

      case "alert":
        const alertColors = {
          info: "bg-blue-50 border-blue-200 text-blue-900",
          warning: "bg-orange-50 border-orange-200 text-orange-900",
          success: "bg-green-50 border-green-200 text-green-900",
          error: "bg-red-50 border-red-200 text-red-900",
        };
        const alertContent = block.content.html || `<p>${block.content.message}</p>`;
        return (
          <div
            style={style}
            className={`p-4 border-2 rounded-lg ${alertColors[block.content.type as keyof typeof alertColors] || alertColors.info}`}
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: alertContent }} />
            </div>
          </div>
        );

      case "numbered-inputs":
        return (
          <div style={style} className="space-y-3">
            {(block.content.items || []).map((item: any, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">{item.text}</label>
                  <input
                    type="text"
                    placeholder={item.placeholder}
                    className="w-full px-4 py-2 border rounded"
                    disabled
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case "success-message":
        return (
          <div style={style} className="p-4 bg-green-50 border-2 border-green-200 rounded-lg">
            <div className="flex items-center gap-3">
              {block.content.showIcon && <CheckCircle className="h-6 w-6 text-green-600" />}
              <p className="text-green-900 font-medium">{block.content.message}</p>
            </div>
          </div>
        );

      case "value-pills":
        return (
          <div style={style} className="flex flex-wrap gap-2">
            {(block.content.values || []).map((value: string, i: number) => (
              <span
                key={i}
                className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-medium border border-orange-300"
              >
                {value}
              </span>
            ))}
          </div>
        );


      case "questions-box":
        return (
          <div style={style} className="p-4 bg-blue-50 border-2 border-blue-300 rounded-lg">
            <div className="space-y-2">
              {(block.content.questions || []).map((question: string, i: number) => (
                <div key={i} className="flex items-start gap-2">
                  <HelpCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-blue-900">{question}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case "success-banner":
        return (
          <div
            style={style}
            className={`p-4 bg-green-500 text-white rounded-lg ${block.content.fullWidth ? "w-full" : ""}`}
          >
            <div className="flex items-center justify-center gap-3">
              <CheckCircle className="h-6 w-6" />
              <p className="font-semibold text-lg">{block.content.message}</p>
            </div>
          </div>
        );

      case "arrow-list":
        return (
          <div style={style} className="space-y-2">
            {(block.content.items || []).map((item: any, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.html || `<p>${item}</p>` }}
                />
              </div>
            ))}
          </div>
        );

      default:
        return <div style={style}>Block type: {block.type}</div>;
    }
  };

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
                onClick={() => router.push(`/workshops/constructor/${id}/builder`)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <Input
                  value={screenData.name}
                  onChange={(e) => setScreenData({ ...screenData, name: e.target.value })}
                  className="text-xl font-bold border-none shadow-none px-0"
                  placeholder="Screen name..."
                />
                <Input
                  value={screenData.description}
                  onChange={(e) => setScreenData({ ...screenData, description: e.target.value })}
                  className="text-sm text-muted-foreground border-none shadow-none px-0 mt-1"
                  placeholder="Description..."
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Block Library - Left Sidebar */}
        <div className="w-64 border-r bg-white shadow-sm">
          <div className="p-4 border-b">
            <h3 className="font-semibold flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Content Blocks
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Drag blocks onto canvas
            </p>
          </div>

          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="p-4 space-y-2">
              {BLOCK_LIBRARY.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.type}
                    draggable
                    onDragStart={() => handleDragStartLibrary(item.type)}
                    onDragEnd={handleDragEnd}
                    className="p-3 border-2 border-orange-200 bg-orange-50 rounded-lg cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4 text-orange-600" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </div>

        {/* Canvas - Center */}
        <div className="flex-1 overflow-auto">
          <div
            className="min-h-full p-8"
            style={{
              backgroundImage: `
                linear-gradient(to right, #f0f0f0 1px, transparent 1px),
                linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)
              `,
              backgroundSize: "24px 24px",
            }}
          >
            <div className="max-w-4xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>{screenData.name || "Untitled Screen"}</CardTitle>
                  {screenData.description && (
                    <p className="text-sm text-muted-foreground">{screenData.description}</p>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Drop zone at the beginning */}
                  <div
                    onDragOver={(e) => handleDragOver(e, 0)}
                    onDrop={(e) => handleDrop(e, 0)}
                    className={`rounded-lg border-2 border-dashed transition-all ${
                      dropIndicatorIndex === 0
                        ? "border-orange-500 bg-orange-50 h-24"
                        : "border-transparent h-8"
                    } ${screenData.blocks.length === 0 ? "h-32 border-gray-300" : ""}`}
                  >
                    {screenData.blocks.length === 0 && dropIndicatorIndex !== 0 && (
                      <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
                        Drag blocks here to start building
                      </div>
                    )}
                    {dropIndicatorIndex === 0 && (
                      <div className="flex items-center justify-center h-full">
                        <Plus className="h-6 w-6 text-orange-500" />
                      </div>
                    )}
                  </div>

                  {/* Blocks */}
                  {screenData.blocks.map((block, index) => (
                    <div key={block.id}>
                      <div
                        draggable
                        onDragStart={() => handleDragStartBlock(block)}
                        onDragEnd={handleDragEnd}
                        onClick={() => setSelectedBlock(block)}
                        className={`group relative cursor-move rounded-lg transition-all ${
                          selectedBlock?.id === block.id
                            ? "ring-2 ring-orange-500"
                            : "hover:ring-2 hover:ring-orange-300"
                        } ${draggedBlock?.id === block.id ? "opacity-50" : ""}`}
                      >
                        {/* Drag Handle */}
                        <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <GripVertical className="h-5 w-5 text-gray-400" />
                        </div>

                        {/* Delete Button */}
                        <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-red-600 hover:text-red-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteBlock(block.id);
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {renderBlockContent(block)}
                      </div>

                      {/* Drop zone after block */}
                      <div
                        onDragOver={(e) => handleDragOver(e, index + 1)}
                        onDrop={(e) => handleDrop(e, index + 1)}
                        className={`rounded-lg border-2 border-dashed transition-all ${
                          dropIndicatorIndex === index + 1
                            ? "border-orange-500 bg-orange-50 h-16 my-2"
                            : "border-transparent h-2"
                        }`}
                      >
                        {dropIndicatorIndex === index + 1 && (
                          <div className="flex items-center justify-center h-full">
                            <Plus className="h-6 w-6 text-orange-500" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Properties Panel - Right Sidebar */}
        <div className="w-80 border-l bg-white shadow-sm overflow-auto">
          {selectedBlock ? (
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <SettingsIcon className="h-4 w-4" />
                  Block Properties
                </h3>
                <Badge>{selectedBlock.type}</Badge>
              </div>

              <div className="space-y-4">
                {/* Content Properties */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Content</h4>
                  <div className="space-y-3">
                    {selectedBlock.type === "text" && (
                      <div>
                        <Label className="mb-2 block">Text (supports rich formatting)</Label>
                        <RichTextEditor
                          content={selectedBlock.content.html || `<p>${selectedBlock.content.text || ""}</p>`}
                          onChange={(html) =>
                            handleUpdateBlock(selectedBlock.id, {
                              content: {
                                ...selectedBlock.content,
                                html,
                                text: html.replace(/<[^>]*>/g, '')
                              },
                            })
                          }
                          placeholder="Enter your text..."
                          className="h-[400px]"
                        />
                      </div>
                    )}

                    {selectedBlock.type === "image" && (
                      <>
                        <div>
                          <Label>Image URL</Label>
                          <Input
                            type="url"
                            value={selectedBlock.content.url || ""}
                            onChange={(e) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, url: e.target.value },
                              })
                            }
                            placeholder="https://example.com/image.jpg"
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Paste an image URL or upload to your server
                          </p>
                        </div>
                        <div>
                          <Label>Alt Text</Label>
                          <Input
                            value={selectedBlock.content.alt || ""}
                            onChange={(e) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, alt: e.target.value },
                              })
                            }
                            placeholder="Image description"
                          />
                        </div>
                        <div>
                          <Label>Caption (optional)</Label>
                          <Input
                            value={selectedBlock.content.caption || ""}
                            onChange={(e) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, caption: e.target.value },
                              })
                            }
                            placeholder="Image caption"
                          />
                        </div>
                      </>
                    )}

                    {selectedBlock.type === "checklist" && (
                      <div>
                        <Label className="mb-2 block">Checklist Items</Label>
                        {(selectedBlock.content.items || []).map((item: any, index: number) => (
                          <div key={index} className="flex items-center gap-2 mb-2">
                            <Input
                              value={item.text}
                              onChange={(e) => {
                                const newItems = [...selectedBlock.content.items];
                                newItems[index] = { ...item, text: e.target.value };
                                handleUpdateBlock(selectedBlock.id, {
                                  content: { ...selectedBlock.content, items: newItems },
                                });
                              }}
                              placeholder="Task description"
                            />
                            <Button
                              size="icon"
                              variant="ghost"
                              onClick={() => {
                                const newItems = selectedBlock.content.items.filter((_: any, i: number) => i !== index);
                                handleUpdateBlock(selectedBlock.id, {
                                  content: { ...selectedBlock.content, items: newItems },
                                });
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full mt-2"
                          onClick={() => {
                            const newItems = [...(selectedBlock.content.items || []), { text: "New task", checked: false }];
                            handleUpdateBlock(selectedBlock.id, {
                              content: { ...selectedBlock.content, items: newItems },
                            });
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Item
                        </Button>
                      </div>
                    )}

                    {selectedBlock.type === "timer" && (
                      <>
                        <div>
                          <Label>Mode</Label>
                          <Select
                            value={selectedBlock.content.mode || "countdown"}
                            onValueChange={(value) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, mode: value },
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="countdown">Countdown</SelectItem>
                              <SelectItem value="countup">Count Up</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Duration (minutes)</Label>
                          <Input
                            type="number"
                            value={selectedBlock.content.duration}
                            onChange={(e) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, duration: parseInt(e.target.value) },
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label>Label</Label>
                          <Input
                            value={selectedBlock.content.label}
                            onChange={(e) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, label: e.target.value },
                              })
                            }
                          />
                        </div>
                      </>
                    )}

                    {selectedBlock.type === "response" && (
                      <>
                        <div>
                          <Label>Label</Label>
                          <Input
                            value={selectedBlock.content.label}
                            onChange={(e) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, label: e.target.value },
                              })
                            }
                            placeholder="Question or prompt"
                          />
                        </div>
                        <div>
                          <Label className="mb-2 block">Response Format (rich text)</Label>
                          <RichTextEditor
                            content={selectedBlock.content.html || "<p>Type your response here...</p>"}
                            onChange={(html) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, html },
                              })
                            }
                            placeholder="Response format with rich text..."
                            className="h-[250px]"
                          />
                        </div>
                      </>
                    )}

                    {selectedBlock.type === "ai-assistant" && (
                      <>
                        <div>
                          <Label className="mb-2 block">Message (rich text)</Label>
                          <RichTextEditor
                            content={selectedBlock.content.html || "<p>AI will help you here...</p>"}
                            onChange={(html) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, html },
                              })
                            }
                            placeholder="AI assistant message..."
                            className="h-[200px]"
                          />
                        </div>
                        <Separator />
                        <div>
                          <Label>Agent Preset</Label>
                          <Select
                            value={selectedBlock.content.preset || "balanced"}
                            onValueChange={(value) => {
                              const presets: Record<string, any> = {
                                creative: { temperature: 0.9, maxTokens: 1500, systemPrompt: "You are a creative and innovative assistant for family governance, helping to generate new ideas and perspectives." },
                                balanced: { temperature: 0.7, maxTokens: 1000, systemPrompt: "You are a helpful assistant for family governance discussions, providing balanced and thoughtful responses." },
                                precise: { temperature: 0.3, maxTokens: 800, systemPrompt: "You are a precise and analytical assistant for family governance, focusing on accuracy and clarity." },
                              };
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, preset: value, ...presets[value] },
                              });
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="creative">Creative (More exploratory)</SelectItem>
                              <SelectItem value="balanced">Balanced (Recommended)</SelectItem>
                              <SelectItem value="precise">Precise (More focused)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Temperature: {selectedBlock.content.temperature || 0.7}</Label>
                          <Input
                            type="range"
                            min="0"
                            max="1"
                            step="0.1"
                            value={selectedBlock.content.temperature || 0.7}
                            onChange={(e) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, temperature: parseFloat(e.target.value) },
                              })
                            }
                          />
                          <p className="text-xs text-muted-foreground mt-1">
                            Lower = more focused, Higher = more creative
                          </p>
                        </div>
                        <div>
                          <Label>Max Tokens</Label>
                          <Input
                            type="number"
                            value={selectedBlock.content.maxTokens || 1000}
                            onChange={(e) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, maxTokens: parseInt(e.target.value) },
                              })
                            }
                            min={100}
                            max={4000}
                          />
                        </div>
                        <div>
                          <Label>System Prompt</Label>
                          <Textarea
                            value={selectedBlock.content.systemPrompt || ""}
                            onChange={(e) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, systemPrompt: e.target.value },
                              })
                            }
                            rows={3}
                            placeholder="Define the AI assistant's role and behavior..."
                          />
                        </div>
                      </>
                    )}

                    {selectedBlock.type === "alert" && (
                      <>
                        <div>
                          <Label className="mb-2 block">Message (supports rich formatting)</Label>
                          <RichTextEditor
                            content={selectedBlock.content.html || `<p>${selectedBlock.content.message || ""}</p>`}
                            onChange={(html) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: {
                                  ...selectedBlock.content,
                                  html,
                                  message: html.replace(/<[^>]*>/g, '')
                                },
                              })
                            }
                            placeholder="Enter alert message..."
                            className="h-[250px]"
                          />
                        </div>
                        <div>
                          <Label>Type</Label>
                          <Select
                            value={selectedBlock.content.type}
                            onValueChange={(value) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, type: value },
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="info">Info</SelectItem>
                              <SelectItem value="warning">Warning</SelectItem>
                              <SelectItem value="success">Success</SelectItem>
                              <SelectItem value="error">Error</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}

                    {selectedBlock.type === "numbered-inputs" && (
                      <div>
                        <Label className="mb-2 block">Input Items</Label>
                        {(selectedBlock.content.items || []).map((item: any, index: number) => (
                          <div key={index} className="mb-3 p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">#{index + 1}</span>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => {
                                  const newItems = selectedBlock.content.items.filter((_: any, i: number) => i !== index);
                                  handleUpdateBlock(selectedBlock.id, {
                                    content: { ...selectedBlock.content, items: newItems },
                                  });
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="space-y-2">
                              <Input
                                value={item.text}
                                onChange={(e) => {
                                  const newItems = [...selectedBlock.content.items];
                                  newItems[index] = { ...item, text: e.target.value };
                                  handleUpdateBlock(selectedBlock.id, {
                                    content: { ...selectedBlock.content, items: newItems },
                                  });
                                }}
                                placeholder="Input label"
                              />
                              <Input
                                value={item.placeholder}
                                onChange={(e) => {
                                  const newItems = [...selectedBlock.content.items];
                                  newItems[index] = { ...item, placeholder: e.target.value };
                                  handleUpdateBlock(selectedBlock.id, {
                                    content: { ...selectedBlock.content, items: newItems },
                                  });
                                }}
                                placeholder="Placeholder text"
                              />
                            </div>
                          </div>
                        ))}
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full mt-2"
                          onClick={() => {
                            const newItems = [...(selectedBlock.content.items || []), { text: "New input", placeholder: "Type here..." }];
                            handleUpdateBlock(selectedBlock.id, {
                              content: { ...selectedBlock.content, items: newItems },
                            });
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Input
                        </Button>
                      </div>
                    )}

                    {selectedBlock.type === "success-message" && (
                      <>
                        <div>
                          <Label>Message</Label>
                          <Input
                            value={selectedBlock.content.message}
                            onChange={(e) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, message: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={selectedBlock.content.showIcon}
                            onCheckedChange={(checked) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, showIcon: checked },
                              })
                            }
                          />
                          <Label>Show icon</Label>
                        </div>
                      </>
                    )}

                    {selectedBlock.type === "value-pills" && (
                      <div>
                        <Label>Values (comma-separated)</Label>
                        <Textarea
                          value={(selectedBlock.content.values || []).join(", ")}
                          onChange={(e) =>
                            handleUpdateBlock(selectedBlock.id, {
                              content: {
                                ...selectedBlock.content,
                                values: e.target.value.split(",").map(v => v.trim()).filter(v => v)
                              },
                            })
                          }
                          rows={3}
                          placeholder="Family, Trust, Transparency"
                        />
                      </div>
                    )}

                    {selectedBlock.type === "questions-box" && (
                      <div>
                        <Label>Questions (one per line)</Label>
                        <Textarea
                          value={(selectedBlock.content.questions || []).join("\n")}
                          onChange={(e) =>
                            handleUpdateBlock(selectedBlock.id, {
                              content: {
                                ...selectedBlock.content,
                                questions: e.target.value.split("\n").filter(q => q.trim())
                              },
                            })
                          }
                          rows={5}
                          placeholder="Enter questions, one per line"
                        />
                      </div>
                    )}

                    {selectedBlock.type === "success-banner" && (
                      <>
                        <div>
                          <Label>Message</Label>
                          <Input
                            value={selectedBlock.content.message}
                            onChange={(e) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, message: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={selectedBlock.content.fullWidth}
                            onCheckedChange={(checked) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, fullWidth: checked },
                              })
                            }
                          />
                          <Label>Full width</Label>
                        </div>
                      </>
                    )}

                    {selectedBlock.type === "arrow-list" && (
                      <div>
                        <Label className="mb-2 block">List Items</Label>
                        {(selectedBlock.content.items || []).map((item: any, index: number) => (
                          <div key={index} className="mb-3 p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium">Item {index + 1}</span>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => {
                                  const newItems = selectedBlock.content.items.filter((_: any, i: number) => i !== index);
                                  handleUpdateBlock(selectedBlock.id, {
                                    content: { ...selectedBlock.content, items: newItems },
                                  });
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <RichTextEditor
                              content={item.html || `<p>${item}</p>`}
                              onChange={(html) => {
                                const newItems = [...selectedBlock.content.items];
                                newItems[index] = { html };
                                handleUpdateBlock(selectedBlock.id, {
                                  content: { ...selectedBlock.content, items: newItems },
                                });
                              }}
                              placeholder="Enter item text with formatting..."
                              className="h-[150px]"
                            />
                          </div>
                        ))}
                        <Button
                          size="sm"
                          variant="outline"
                          className="w-full mt-2"
                          onClick={() => {
                            const newItems = [...(selectedBlock.content.items || []), { html: "<p>New item</p>" }];
                            handleUpdateBlock(selectedBlock.id, {
                              content: { ...selectedBlock.content, items: newItems },
                            });
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Item
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Style Properties */}
                <div>
                  <h4 className="text-sm font-medium mb-3">Style</h4>
                  <div className="space-y-3">
                    <div>
                      <Label>Background Color</Label>
                      <Input
                        type="color"
                        value={selectedBlock.style.backgroundColor || "#ffffff"}
                        onChange={(e) =>
                          handleUpdateBlock(selectedBlock.id, {
                            style: { ...selectedBlock.style, backgroundColor: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>Text Color</Label>
                      <Input
                        type="color"
                        value={selectedBlock.style.textColor || "#000000"}
                        onChange={(e) =>
                          handleUpdateBlock(selectedBlock.id, {
                            style: { ...selectedBlock.style, textColor: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div>
                      <Label>Padding</Label>
                      <Select
                        value={selectedBlock.style.padding || "1rem"}
                        onValueChange={(value) =>
                          handleUpdateBlock(selectedBlock.id, {
                            style: { ...selectedBlock.style, padding: value },
                          })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0.5rem">Small</SelectItem>
                          <SelectItem value="1rem">Medium</SelectItem>
                          <SelectItem value="1.5rem">Large</SelectItem>
                          <SelectItem value="2rem">Extra Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Separator />
                    <div>
                      <Label className="mb-2 block">Border</Label>
                      <div className="space-y-2">
                        <div>
                          <Label className="text-xs">Width</Label>
                          <Select
                            value={selectedBlock.style.borderWidth || "0px"}
                            onValueChange={(value) =>
                              handleUpdateBlock(selectedBlock.id, {
                                style: { ...selectedBlock.style, borderWidth: value },
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0px">None</SelectItem>
                              <SelectItem value="1px">Thin (1px)</SelectItem>
                              <SelectItem value="2px">Medium (2px)</SelectItem>
                              <SelectItem value="3px">Thick (3px)</SelectItem>
                              <SelectItem value="4px">Extra Thick (4px)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-xs">Color</Label>
                          <Input
                            type="color"
                            value={selectedBlock.style.borderColor || "#000000"}
                            onChange={(e) =>
                              handleUpdateBlock(selectedBlock.id, {
                                style: { ...selectedBlock.style, borderColor: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label className="text-xs">Radius</Label>
                          <Select
                            value={selectedBlock.style.borderRadius || "0px"}
                            onValueChange={(value) =>
                              handleUpdateBlock(selectedBlock.id, {
                                style: { ...selectedBlock.style, borderRadius: value },
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0px">None (Sharp corners)</SelectItem>
                              <SelectItem value="0.25rem">Small (4px)</SelectItem>
                              <SelectItem value="0.5rem">Medium (8px)</SelectItem>
                              <SelectItem value="0.75rem">Large (12px)</SelectItem>
                              <SelectItem value="1rem">Extra Large (16px)</SelectItem>
                              <SelectItem value="9999px">Full (Pill shape)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full text-center text-muted-foreground p-8">
              <div>
                <SettingsIcon className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>Select a block to edit its properties</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
