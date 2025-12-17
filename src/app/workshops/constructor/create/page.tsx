"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Sparkles, FileText, Zap } from "lucide-react";
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
import { toast } from "sonner";
import type { CreateWorkshopTemplateInput, WorkshopTemplateCategory } from "@/types/workshop-constructor";

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

export default function CreateWorkshopPage() {
  const router = useRouter();
  const [step, setStep] = useState<"method" | "details">("method");
  const [method, setMethod] = useState<string>("template");
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
    setStep("details");
  };

  const handleBack = () => {
    if (step === "details") {
      setStep("method");
    } else {
      router.push("/workshops/constructor");
    }
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
          <h1 className="text-3xl font-bold">Workshop Details</h1>
          <p className="text-muted-foreground mt-1">
            Provide basic information about your workshop
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
