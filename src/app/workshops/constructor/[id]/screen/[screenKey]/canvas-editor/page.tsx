"use client";

import { useState, useEffect, use } from "react";
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
  List,
  CheckSquare,
  Timer,
  MessageSquare,
  Sparkles,
  Layout,
  AlertCircle,
  Hash,
  BarChart3,
  CheckCircle,
  Tag,
  TrendingUp,
  HelpCircle,
  Award,
  ArrowRight,
  Users,
  Edit3,
  FileText,
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
  | "heading"
  | "text"
  | "rich-text"
  | "image"
  | "list"
  | "checklist"
  | "timer"
  | "input"
  | "textarea"
  | "ai-assistant"
  | "divider"
  | "alert"
  | "numbered-inputs"
  | "progress-bar"
  | "success-message"
  | "value-pills"
  | "voting-results"
  | "ranked-list"
  | "questions-box"
  | "success-banner"
  | "arrow-list"
  | "badge-list"
  | "consensus-box"
  | "editable-section";

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
    type: "heading",
    icon: Type,
    label: "Heading",
    defaultContent: { text: "Heading Text", level: "h2" },
  },
  {
    type: "text",
    icon: Type,
    label: "Text",
    defaultContent: { text: "Your text here..." },
  },
  {
    type: "rich-text",
    icon: FileText,
    label: "Rich Text Editor",
    defaultContent: { html: "<p>Start typing with <strong>formatting</strong>...</p>" },
  },
  {
    type: "image",
    icon: ImageIcon,
    label: "Image",
    defaultContent: { url: "", alt: "Image", caption: "" },
  },
  {
    type: "list",
    icon: List,
    label: "List",
    defaultContent: { items: ["Item 1", "Item 2", "Item 3"] },
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
    defaultContent: { duration: 5, label: "Timer" },
  },
  {
    type: "input",
    icon: MessageSquare,
    label: "Text Input",
    defaultContent: { label: "Your answer", placeholder: "Type here..." },
  },
  {
    type: "textarea",
    icon: MessageSquare,
    label: "Text Area",
    defaultContent: { label: "Your response", placeholder: "Type here...", rows: 4 },
  },
  {
    type: "ai-assistant",
    icon: Sparkles,
    label: "AI Assistant",
    defaultContent: { message: "AI will help you here...", enabled: true },
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
    defaultContent: { count: 5, label: "Your answer", placeholder: "Type here..." },
  },
  {
    type: "progress-bar",
    icon: BarChart3,
    label: "Progress Bar",
    defaultContent: { progress: 50, label: "Progress", showPercentage: true },
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
    type: "voting-results",
    icon: TrendingUp,
    label: "Voting Results",
    defaultContent: {
      title: "Voting Results",
      items: [
        { text: "Option A", votes: 5, percentage: 50 },
        { text: "Option B", votes: 3, percentage: 30 },
        { text: "Option C", votes: 2, percentage: 20 },
      ]
    },
  },
  {
    type: "ranked-list",
    icon: Award,
    label: "Ranked List",
    defaultContent: {
      items: [
        { text: "First item", percentage: 45, highlighted: true },
        { text: "Second item", percentage: 30, highlighted: false },
        { text: "Third item", percentage: 25, highlighted: false },
      ]
    },
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
        "First step or recommendation",
        "Second step or recommendation",
        "Third step or recommendation"
      ]
    },
  },
  {
    type: "badge-list",
    icon: Users,
    label: "Badge List",
    defaultContent: {
      items: [
        { text: "Item with mentions", mentions: 3 },
        { text: "Another item", mentions: 5 },
        { text: "Third item", mentions: 2 },
      ]
    },
  },
  {
    type: "consensus-box",
    icon: CheckCircle,
    label: "Consensus Box",
    defaultContent: {
      message: "Consensus reached!",
      details: "All participants have agreed on this decision.",
      type: "success"
    },
  },
  {
    type: "editable-section",
    icon: Edit3,
    label: "Editable Section",
    defaultContent: {
      title: "Edit this section",
      content: "This is editable content that users can modify.",
      showEditButton: true
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
    };

    switch (block.type) {
      case "heading":
        const HeadingTag = block.content.level || "h2";
        return (
          <div style={style}>
            {HeadingTag === "h1" && <h1 className="text-3xl font-bold">{block.content.text}</h1>}
            {HeadingTag === "h2" && <h2 className="text-2xl font-bold">{block.content.text}</h2>}
            {HeadingTag === "h3" && <h3 className="text-xl font-bold">{block.content.text}</h3>}
          </div>
        );

      case "text":
        return (
          <div style={style}>
            <p>{block.content.text}</p>
          </div>
        );

      case "rich-text":
        return (
          <div style={style}>
            <RichTextEditor
              content={block.content.html || ""}
              onChange={(html) =>
                handleUpdateBlock(block.id, {
                  content: { ...block.content, html },
                })
              }
              placeholder="Start typing with formatting..."
            />
          </div>
        );

      case "list":
        return (
          <div style={style}>
            <ul className="list-disc list-inside space-y-1">
              {block.content.items.map((item: string, i: number) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        );

      case "timer":
        return (
          <div style={style} className="p-4 bg-orange-500 text-white text-center rounded-lg">
            <Timer className="h-8 w-8 mx-auto mb-2" />
            <div className="text-2xl font-bold">{block.content.duration} minutes</div>
            <div className="text-sm">{block.content.label}</div>
          </div>
        );

      case "input":
        return (
          <div style={style}>
            <label className="block font-medium mb-2">{block.content.label}</label>
            <input
              type="text"
              placeholder={block.content.placeholder}
              className="w-full px-4 py-2 border rounded"
              disabled
            />
          </div>
        );

      case "textarea":
        return (
          <div style={style}>
            <label className="block font-medium mb-2">{block.content.label}</label>
            <textarea
              placeholder={block.content.placeholder}
              rows={block.content.rows}
              className="w-full px-4 py-2 border rounded"
              disabled
            />
          </div>
        );

      case "ai-assistant":
        return (
          <div style={style} className="p-4 border-2 border-purple-200 bg-purple-50 rounded-lg">
            <div className="flex items-start gap-3">
              <Sparkles className="h-5 w-5 text-purple-600 flex-shrink-0 mt-1" />
              <p className="text-purple-900">{block.content.message}</p>
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
        return (
          <div
            style={style}
            className={`p-4 border-2 rounded-lg ${alertColors[block.content.type as keyof typeof alertColors] || alertColors.info}`}
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p>{block.content.message}</p>
            </div>
          </div>
        );

      case "numbered-inputs":
        return (
          <div style={style} className="space-y-3">
            {Array.from({ length: block.content.count || 5 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder={block.content.placeholder}
                    className="w-full px-4 py-2 border rounded"
                    disabled
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case "progress-bar":
        return (
          <div style={style} className="space-y-2">
            {block.content.label && (
              <div className="flex justify-between text-sm">
                <span>{block.content.label}</span>
                {block.content.showPercentage && <span>{block.content.progress}%</span>}
              </div>
            )}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-orange-500 h-3 rounded-full transition-all"
                style={{ width: `${block.content.progress || 0}%` }}
              />
            </div>
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

      case "voting-results":
        return (
          <div style={style} className="space-y-3">
            {block.content.title && (
              <h3 className="text-lg font-semibold">{block.content.title}</h3>
            )}
            {(block.content.items || []).map((item: any, i: number) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.text}</span>
                  <span className="text-sm text-gray-600">
                    {item.votes} votes ({item.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        );

      case "ranked-list":
        return (
          <div style={style} className="space-y-2">
            {(block.content.items || []).map((item: any, i: number) => (
              <div
                key={i}
                className={`p-3 rounded-lg flex items-center justify-between ${
                  item.highlighted
                    ? "bg-orange-50 border-2 border-orange-300"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold text-lg text-gray-500">{i + 1}.</span>
                  <span className={item.highlighted ? "font-semibold" : ""}>{item.text}</span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.highlighted
                      ? "bg-orange-500 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {item.percentage}%
                </span>
              </div>
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
            {(block.content.items || []).map((item: string, i: number) => (
              <div key={i} className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <p>{item}</p>
              </div>
            ))}
          </div>
        );

      case "badge-list":
        return (
          <div style={style} className="space-y-2">
            {(block.content.items || []).map((item: any, i: number) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span>{item.text}</span>
                <span className="px-3 py-1 bg-orange-500 text-white rounded-full text-sm font-medium">
                  {item.mentions} mentions
                </span>
              </div>
            ))}
          </div>
        );

      case "consensus-box":
        const consensusColors = {
          success: "bg-green-50 border-green-300 text-green-900",
          warning: "bg-yellow-50 border-yellow-300 text-yellow-900",
          info: "bg-blue-50 border-blue-300 text-blue-900",
        };
        return (
          <div
            style={style}
            className={`p-4 border-2 rounded-lg ${consensusColors[block.content.type as keyof typeof consensusColors] || consensusColors.success}`}
          >
            <div className="flex items-start gap-3">
              <CheckCircle className="h-6 w-6 flex-shrink-0" />
              <div>
                <p className="font-semibold text-lg">{block.content.message}</p>
                {block.content.details && (
                  <p className="text-sm mt-1">{block.content.details}</p>
                )}
              </div>
            </div>
          </div>
        );

      case "editable-section":
        return (
          <div style={style} className="p-4 border-2 border-gray-300 rounded-lg bg-white">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold">{block.content.title}</h4>
              {block.content.showEditButton && (
                <Button size="sm" variant="outline">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
            <div className="prose">
              <p className="text-gray-700">{block.content.content}</p>
            </div>
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
                    {selectedBlock.type === "heading" && (
                      <>
                        <div>
                          <Label>Text</Label>
                          <Input
                            value={selectedBlock.content.text}
                            onChange={(e) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, text: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label>Level</Label>
                          <Select
                            value={selectedBlock.content.level}
                            onValueChange={(value) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, level: value },
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="h1">Heading 1</SelectItem>
                              <SelectItem value="h2">Heading 2</SelectItem>
                              <SelectItem value="h3">Heading 3</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}

                    {selectedBlock.type === "text" && (
                      <div>
                        <Label>Text</Label>
                        <Textarea
                          value={selectedBlock.content.text}
                          onChange={(e) =>
                            handleUpdateBlock(selectedBlock.id, {
                              content: { ...selectedBlock.content, text: e.target.value },
                            })
                          }
                          rows={4}
                        />
                      </div>
                    )}

                    {selectedBlock.type === "rich-text" && (
                      <div>
                        <Label className="mb-2 block">Rich Text Content</Label>
                        <p className="text-xs text-muted-foreground mb-3">
                          Use the editor on canvas to format text with bold, italic, underline, lists, and more.
                        </p>
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm">
                            Select the rich text block on the canvas to edit it directly with the formatting toolbar.
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedBlock.type === "timer" && (
                      <>
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

                    {(selectedBlock.type === "input" || selectedBlock.type === "textarea") && (
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
                          />
                        </div>
                        <div>
                          <Label>Placeholder</Label>
                          <Input
                            value={selectedBlock.content.placeholder}
                            onChange={(e) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, placeholder: e.target.value },
                              })
                            }
                          />
                        </div>
                      </>
                    )}

                    {selectedBlock.type === "alert" && (
                      <>
                        <div>
                          <Label>Message</Label>
                          <Textarea
                            value={selectedBlock.content.message}
                            onChange={(e) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, message: e.target.value },
                              })
                            }
                            rows={3}
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
                      <>
                        <div>
                          <Label>Number of inputs</Label>
                          <Input
                            type="number"
                            value={selectedBlock.content.count}
                            onChange={(e) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, count: parseInt(e.target.value) },
                              })
                            }
                            min={1}
                            max={20}
                          />
                        </div>
                        <div>
                          <Label>Placeholder</Label>
                          <Input
                            value={selectedBlock.content.placeholder}
                            onChange={(e) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, placeholder: e.target.value },
                              })
                            }
                          />
                        </div>
                      </>
                    )}

                    {selectedBlock.type === "progress-bar" && (
                      <>
                        <div>
                          <Label>Progress (%)</Label>
                          <Input
                            type="number"
                            value={selectedBlock.content.progress}
                            onChange={(e) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, progress: parseInt(e.target.value) },
                              })
                            }
                            min={0}
                            max={100}
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
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={selectedBlock.content.showPercentage}
                            onCheckedChange={(checked) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, showPercentage: checked },
                              })
                            }
                          />
                          <Label>Show percentage</Label>
                        </div>
                      </>
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
                        <Label>Items (one per line)</Label>
                        <Textarea
                          value={(selectedBlock.content.items || []).join("\n")}
                          onChange={(e) =>
                            handleUpdateBlock(selectedBlock.id, {
                              content: {
                                ...selectedBlock.content,
                                items: e.target.value.split("\n").filter(i => i.trim())
                              },
                            })
                          }
                          rows={5}
                          placeholder="Enter items, one per line"
                        />
                      </div>
                    )}

                    {selectedBlock.type === "consensus-box" && (
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
                        <div>
                          <Label>Details</Label>
                          <Textarea
                            value={selectedBlock.content.details}
                            onChange={(e) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, details: e.target.value },
                              })
                            }
                            rows={2}
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
                              <SelectItem value="success">Success</SelectItem>
                              <SelectItem value="warning">Warning</SelectItem>
                              <SelectItem value="info">Info</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}

                    {selectedBlock.type === "editable-section" && (
                      <>
                        <div>
                          <Label>Title</Label>
                          <Input
                            value={selectedBlock.content.title}
                            onChange={(e) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, title: e.target.value },
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label>Content</Label>
                          <Textarea
                            value={selectedBlock.content.content}
                            onChange={(e) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, content: e.target.value },
                              })
                            }
                            rows={4}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={selectedBlock.content.showEditButton}
                            onCheckedChange={(checked) =>
                              handleUpdateBlock(selectedBlock.id, {
                                content: { ...selectedBlock.content, showEditButton: checked },
                              })
                            }
                          />
                          <Label>Show edit button</Label>
                        </div>
                      </>
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
