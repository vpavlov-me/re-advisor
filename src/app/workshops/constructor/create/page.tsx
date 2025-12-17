"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Sparkles, FileText, Zap, Search, Plus, Eye, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import type { CreateWorkshopTemplateInput, WorkshopTemplateCategory, WorkshopTemplateBlock } from "@/types/workshop-constructor";

const CREATION_METHODS = [
  {
    id: "scratch",
    name: "Start from Scratch",
    description: "Build your workshop step by step with full customization",
    icon: FileText,
    recommended: false,
  },
  {
    id: "template",
    name: "Use Template Library",
    description: "Start with pre-built modules and customize as needed",
    icon: Zap,
    recommended: true,
  },
  {
    id: "ai",
    name: "AI-Assisted Creation",
    description: "Describe your workshop goals and let AI suggest structure",
    icon: Sparkles,
    recommended: false,
  },
];

const MOCK_TEMPLATE_BLOCKS: WorkshopTemplateBlock[] = [
  {
    id: "1",
    block_key: "kickoff-welcome",
    name: "Welcome & Kickoff",
    description: "Standard workshop welcome and introduction",
    category: "kickoff",
    screen_type: "text",
    content_type: "introduction",
    default_content: {
      title: "Welcome to the Workshop",
      content: "Thank you for participating in today's workshop...",
    },
    default_navigation: {},
    default_ai_config: { enabled: false },
    tags: ["introduction", "welcome"],
    estimated_duration: 10,
    thumbnail_url: null,
    usage_count: 0,
    is_system: true,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    block_key: "raci-matrix",
    name: "RACI Matrix",
    description: "Define roles and responsibilities for decisions",
    category: "exercise",
    screen_type: "exercise",
    content_type: "raci-matrix",
    default_content: {
      title: "RACI Matrix - Decision Rights",
      description: "Define who is Responsible, Accountable, Consulted, and Informed",
    },
    default_navigation: {},
    default_ai_config: { enabled: true, style: "supportive" },
    tags: ["governance", "raci", "decisions"],
    estimated_duration: 30,
    thumbnail_url: null,
    usage_count: 45,
    is_system: true,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    block_key: "swot-analysis",
    name: "SWOT Analysis",
    description: "Analyze Strengths, Weaknesses, Opportunities, Threats",
    category: "exercise",
    screen_type: "exercise",
    content_type: "swot",
    default_content: {
      title: "SWOT Analysis",
      description: "Analyze internal and external strategic factors",
    },
    default_navigation: {},
    default_ai_config: { enabled: true, style: "neutral" },
    tags: ["swot", "strategy", "analysis"],
    estimated_duration: 30,
    thumbnail_url: null,
    usage_count: 67,
    is_system: true,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    block_key: "values-assessment",
    name: "Values Assessment",
    description: "Identify personal and family values",
    category: "assessment",
    screen_type: "assessment",
    content_type: "values-selection",
    default_content: {
      title: "Values Assessment",
      description: "Select your top 5 values",
    },
    default_navigation: {},
    default_ai_config: { enabled: false },
    tags: ["values", "assessment", "discovery"],
    estimated_duration: 20,
    thumbnail_url: null,
    usage_count: 89,
    is_system: true,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function CreateWorkshopPage() {
  const router = useRouter();
  const [step, setStep] = useState<"method" | "details" | "ai-prompt" | "template-selection">("method");
  const [method, setMethod] = useState<string>("template");
  const [aiPrompt, setAiPrompt] = useState("");
  const [selectedBlocks, setSelectedBlocks] = useState<WorkshopTemplateBlock[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [formData, setFormData] = useState<CreateWorkshopTemplateInput>({
    name: "",
    description: "",
    duration_minutes: 120,
    target_audience: "",
    category: "Custom",
    settings: {
      enableAI: false,
      enableChat: true,
      enableCollaboration: true,
      allowSkipScreens: false,
      showProgressBar: true,
      requireCompletion: false,
    },
  });

  const handleMethodSelect = (methodId: string) => {
    setMethod(methodId);

    // Route to different steps based on method
    if (methodId === "ai") {
      setStep("ai-prompt");
    } else if (methodId === "template") {
      setStep("template-selection");
    } else {
      setStep("details");
    }
  };

  const handleBack = () => {
    if (step === "details") {
      // Go back to appropriate previous step based on method
      if (method === "ai") {
        setStep("ai-prompt");
      } else if (method === "template") {
        setStep("template-selection");
      } else {
        setStep("method");
      }
    } else if (step === "ai-prompt") {
      setStep("method");
    } else if (step === "template-selection") {
      setStep("method");
    } else {
      router.push("/workshops/constructor");
    }
  };

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) {
      toast.error("Please describe your workshop goals");
      return;
    }

    try {
      // TODO: API call to generate AI suggestions
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast.success("AI suggestions generated!");
      setStep("details");
    } catch (error) {
      toast.error("Failed to generate suggestions");
    }
  };

  const handleTemplateNext = () => {
    if (selectedBlocks.length === 0) {
      toast.error("Please select at least one template block");
      return;
    }
    setStep("details");
  };

  const handleCreate = async () => {
    // Validation
    if (!formData.name.trim()) {
      toast.error("Please enter a workshop name");
      return;
    }

    try {
      // TODO: API call to create workshop template
      await new Promise(resolve => setTimeout(resolve, 1000));

      toast.success("Workshop template created!");

      // Navigate to builder
      router.push(`/workshops/constructor/new-id/builder`);
    } catch (error) {
      toast.error("Failed to create workshop");
      console.error(error);
    }
  };

  const updateFormData = (field: keyof CreateWorkshopTemplateInput, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateSettings = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      settings: { ...prev.settings, [key]: value }
    }));
  };

  const toggleBlockSelection = (block: WorkshopTemplateBlock) => {
    setSelectedBlocks(prev => {
      const exists = prev.find(b => b.id === block.id);
      if (exists) {
        return prev.filter(b => b.id !== block.id);
      } else {
        return [...prev, block];
      }
    });
  };

  const filteredBlocks = MOCK_TEMPLATE_BLOCKS.filter(block =>
    block.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    block.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      kickoff: "bg-blue-100 text-blue-800",
      assessment: "bg-purple-100 text-purple-800",
      exercise: "bg-green-100 text-green-800",
    };
    return colors[category] || colors.exercise;
  };

  // Step 1: Method Selection
  if (step === "method") {
    return (
      <div className="container mx-auto py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Create Workshop</h1>
            <p className="text-muted-foreground mt-1">
              Choose how you'd like to start building your workshop
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CREATION_METHODS.map((item) => (
              <Card
                key={item.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  method === item.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => handleMethodSelect(item.id)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <item.icon className="h-8 w-8 text-primary" />
                    {item.recommended && (
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                        Recommended
                      </span>
                    )}
                  </div>
                  <CardTitle>{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    variant={method === item.id ? "default" : "outline"}
                  >
                    Select
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Step 2a: AI Prompt (for AI method)
  if (step === "ai-prompt") {
    return (
      <div className="container mx-auto py-8 max-w-3xl">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">AI-Assisted Workshop Creation</h1>
            <p className="text-muted-foreground mt-1">
              Describe your workshop goals and let AI suggest the structure
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                Workshop Description
              </CardTitle>
              <CardDescription>
                Be specific about your objectives, target audience, and desired outcomes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="ai-prompt">Describe Your Workshop</Label>
                <Textarea
                  id="ai-prompt"
                  placeholder="Example: I need a 2-hour workshop for our family council to discuss and create our dividend policy. We have 8 members across 2 generations. We want to understand everyone's financial needs, review business requirements, and draft a fair policy that balances distribution with reinvestment."
                  rows={8}
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                />
                <p className="text-sm text-muted-foreground">
                  Include: purpose, duration, participants, key topics, and expected outcomes
                </p>
              </div>

              <div className="bg-muted/30 border rounded-lg p-4">
                <h4 className="font-medium text-sm mb-2">AI Will Suggest:</h4>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Optimal workshop structure and flow</li>
                  <li>Pre-built blocks that match your goals</li>
                  <li>Timing for each section</li>
                  <li>Discussion and exercise formats</li>
                  <li>AI facilitation strategies</li>
                </ul>
              </div>

              <Button
                onClick={handleAIGenerate}
                className="w-full"
                disabled={!aiPrompt.trim()}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Workshop Structure
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // Step 2b: Template Selection (for template method)
  if (step === "template-selection") {
    return (
      <div className="container mx-auto py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Choose Template Blocks</h1>
            <p className="text-muted-foreground mt-1">
              Select pre-built blocks to start your workshop
            </p>
          </div>

          {/* Selected Blocks Summary */}
          {selectedBlocks.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Selected Blocks ({selectedBlocks.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {selectedBlocks.map((block) => (
                    <Badge
                      key={block.id}
                      variant="secondary"
                      className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => toggleBlockSelection(block)}
                    >
                      {block.name} ✕
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search template blocks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Available Blocks */}
          <Card>
            <CardHeader>
              <CardTitle>Available Template Blocks</CardTitle>
              <CardDescription>
                Click to add blocks to your workshop
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {filteredBlocks.map((block) => {
                    const isSelected = selectedBlocks.some(b => b.id === block.id);
                    return (
                      <div
                        key={block.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          isSelected ? "ring-2 ring-primary bg-primary/5" : ""
                        }`}
                        onClick={() => toggleBlockSelection(block)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium text-sm">{block.name}</h4>
                              <Badge className={getCategoryColor(block.category)}>
                                {block.category}
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {block.description}
                            </p>
                          </div>
                          <div className="ml-4">
                            {isSelected ? (
                              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                                <span className="text-primary-foreground text-xs">✓</span>
                              </div>
                            ) : (
                              <div className="w-6 h-6 rounded-full border-2 border-muted" />
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                          {block.estimated_duration && (
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {block.estimated_duration}m
                            </span>
                          )}
                          {block.default_ai_config.enabled && (
                            <span className="flex items-center gap-1 text-purple-600">
                              <Sparkles className="h-3 w-3" />
                              AI Enabled
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={handleBack}>
              Cancel
            </Button>
            <Button
              onClick={handleTemplateNext}
              disabled={selectedBlocks.length === 0}
            >
              Continue with {selectedBlocks.length} block{selectedBlocks.length !== 1 ? "s" : ""}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Step 3: Workshop Details (for all methods)
  const getDetailsTitle = () => {
    if (method === "ai") {
      return {
        title: "Review AI Suggestions",
        subtitle: "Customize the AI-generated workshop structure"
      };
    } else if (method === "template") {
      return {
        title: "Customize Your Workshop",
        subtitle: `Configure details for your workshop with ${selectedBlocks.length} selected block${selectedBlocks.length !== 1 ? "s" : ""}`
      };
    } else {
      return {
        title: "Workshop Details",
        subtitle: "Provide basic information about your workshop"
      };
    }
  };

  const detailsTitle = getDetailsTitle();

  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <Button
        variant="ghost"
        onClick={handleBack}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{detailsTitle.title}</h1>
          <p className="text-muted-foreground mt-1">
            {detailsTitle.subtitle}
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>
              Start with the fundamentals - you can refine these later
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Workshop Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Strategic Planning for Martinez Family"
                value={formData.name}
                onChange={(e) => updateFormData("name", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Briefly describe the purpose and goals of this workshop..."
                rows={3}
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => updateFormData("category", value as WorkshopTemplateCategory)}
                >
                  <SelectTrigger id="category">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Governance">Governance</SelectItem>
                    <SelectItem value="Succession">Succession</SelectItem>
                    <SelectItem value="Values">Values</SelectItem>
                    <SelectItem value="Strategy">Strategy</SelectItem>
                    <SelectItem value="Assessment">Assessment</SelectItem>
                    <SelectItem value="Custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Estimated Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  min="15"
                  step="15"
                  value={formData.duration_minutes || ""}
                  onChange={(e) => updateFormData("duration_minutes", parseInt(e.target.value) || null)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="audience">Target Audience</Label>
              <Input
                id="audience"
                placeholder="e.g., Family Council, Board, All Family Members"
                value={formData.target_audience}
                onChange={(e) => updateFormData("target_audience", e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Who should participate in this workshop?
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workshop Settings</CardTitle>
            <CardDescription>
              Configure features and behavior for this workshop
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enable-ai">AI Facilitation</Label>
                <p className="text-sm text-muted-foreground">
                  Enable AI-powered guidance and discussion facilitation
                </p>
              </div>
              <Switch
                id="enable-ai"
                checked={formData.settings?.enableAI}
                onCheckedChange={(checked) => updateSettings("enableAI", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enable-chat">Live Chat</Label>
                <p className="text-sm text-muted-foreground">
                  Allow participants to chat during the workshop
                </p>
              </div>
              <Switch
                id="enable-chat"
                checked={formData.settings?.enableChat}
                onCheckedChange={(checked) => updateSettings("enableChat", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="enable-collaboration">Real-time Collaboration</Label>
                <p className="text-sm text-muted-foreground">
                  Enable collaborative editing and voting features
                </p>
              </div>
              <Switch
                id="enable-collaboration"
                checked={formData.settings?.enableCollaboration}
                onCheckedChange={(checked) => updateSettings("enableCollaboration", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="allow-skip">Allow Screen Skipping</Label>
                <p className="text-sm text-muted-foreground">
                  Let participants skip optional screens
                </p>
              </div>
              <Switch
                id="allow-skip"
                checked={formData.settings?.allowSkipScreens}
                onCheckedChange={(checked) => updateSettings("allowSkipScreens", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="show-progress">Show Progress Bar</Label>
                <p className="text-sm text-muted-foreground">
                  Display completion progress to participants
                </p>
              </div>
              <Switch
                id="show-progress"
                checked={formData.settings?.showProgressBar}
                onCheckedChange={(checked) => updateSettings("showProgressBar", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="require-completion">Require Completion</Label>
                <p className="text-sm text-muted-foreground">
                  All screens must be completed to finish workshop
                </p>
              </div>
              <Switch
                id="require-completion"
                checked={formData.settings?.requireCompletion}
                onCheckedChange={(checked) => updateSettings("requireCompletion", checked)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={handleBack}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>
            <Save className="h-4 w-4 mr-2" />
            Create & Start Building
          </Button>
        </div>
      </div>
    </div>
  );
}
