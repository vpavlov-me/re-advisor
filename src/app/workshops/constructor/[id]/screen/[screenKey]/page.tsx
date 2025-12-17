"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2, Clock, Sparkles, Settings as SettingsIcon } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import type { WorkshopScreen, ScreenType, ContentType } from "@/types/workshop-constructor";
import { ContentEditor } from "@/components/workshops/content-editors/content-editor";

export default function ScreenEditorPage({ params }: { params: Promise<{ id: string; screenKey: string }> }) {
  const { id, screenKey } = use(params);
  const router = useRouter();

  const [screen, setScreen] = useState<WorkshopScreen | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadScreen();
  }, [id, screenKey]);

  const loadScreen = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 500));

      // Mock data
      setScreen({
        id: "screen-1",
        template_id: id,
        screen_key: screenKey,
        name: "Welcome & Kickoff",
        description: "Workshop introduction and objectives",
        order_index: 0,
        duration_minutes: 10,
        screen_type: "text",
        content_type: "introduction",
        content: {
          title: "Welcome to the Workshop",
          description: "We'll be working together to develop a strategic plan",
          objectives: ["Define vision", "Identify goals", "Create action plan"],
          text: "Thank you for participating in today's workshop. Together, we will explore our strategic direction and create a comprehensive action plan."
        },
        navigation: { next: "screen-2" },
        ai_config: { enabled: false, style: "neutral" },
        has_timer: false,
        timer_config: { duration: 10, showWarning: true, warningAt: 2 },
        is_optional: false,
        show_conditions: {},
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    } catch (error) {
      toast.error("Failed to load screen");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!screen) return;

    try {
      setSaving(true);
      // TODO: API call to save screen
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Screen saved");
      router.push(`/workshops/constructor/${id}/builder`);
    } catch (error) {
      toast.error("Failed to save screen");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    router.push(`/workshops/constructor/${id}/builder`);
  };

  const updateScreen = (field: keyof WorkshopScreen, value: any) => {
    if (!screen) return;
    setScreen({ ...screen, [field]: value });
  };

  const updateContent = (field: string, value: any) => {
    if (!screen) return;
    setScreen({
      ...screen,
      content: { ...screen.content, [field]: value }
    });
  };

  const updateAIConfig = (field: string, value: any) => {
    if (!screen) return;
    setScreen({
      ...screen,
      ai_config: { ...screen.ai_config, [field]: value }
    });
  };

  const updateTimerConfig = (field: string, value: any) => {
    if (!screen) return;
    setScreen({
      ...screen,
      timer_config: { ...screen.timer_config, [field]: value }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading screen editor...</p>
        </div>
      </div>
    );
  }

  if (!screen) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Screen not found</p>
            <Button onClick={handleCancel} className="mt-4">
              Back to Builder
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/10">
      {/* Header */}
      <div className="border-b bg-background sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={handleCancel}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">Edit Screen</h1>
                <p className="text-sm text-muted-foreground">{screen.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-8 max-w-4xl">
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="ai">AI Config</TabsTrigger>
            <TabsTrigger value="navigation">Navigation</TabsTrigger>
          </TabsList>

          {/* Content Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Define the screen's name, description, and type
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Screen Name *</Label>
                  <Input
                    id="name"
                    value={screen.name}
                    onChange={(e) => updateScreen("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={screen.description || ""}
                    onChange={(e) => updateScreen("description", e.target.value)}
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="screen-type">Screen Type</Label>
                    <Select
                      value={screen.screen_type}
                      onValueChange={(value) => updateScreen("screen_type", value as ScreenType)}
                    >
                      <SelectTrigger id="screen-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="exercise">Exercise</SelectItem>
                        <SelectItem value="discussion">Discussion</SelectItem>
                        <SelectItem value="assessment">Assessment</SelectItem>
                        <SelectItem value="visualization">Visualization</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <Input
                      id="duration"
                      type="number"
                      min="1"
                      value={screen.duration_minutes || ""}
                      onChange={(e) => updateScreen("duration_minutes", parseInt(e.target.value) || null)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Screen Content</CardTitle>
                <CardDescription>
                  Content editor adapts based on the content type selected below
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <Label htmlFor="content-type">Content Type</Label>
                  <Select
                    value={screen.content_type || ""}
                    onValueChange={(value) => updateScreen("content_type", value as ContentType)}
                  >
                    <SelectTrigger id="content-type">
                      <SelectValue placeholder="Select content type" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      <SelectItem value="introduction">Introduction</SelectItem>
                      <SelectItem value="rules">Rules</SelectItem>
                      <SelectItem value="objectives">Objectives</SelectItem>
                      <SelectItem value="questionnaire">Questionnaire</SelectItem>
                      <SelectItem value="360-review">360 Review</SelectItem>
                      <SelectItem value="values-selection">Values Selection</SelectItem>
                      <SelectItem value="raci-matrix">RACI Matrix</SelectItem>
                      <SelectItem value="three-circles">Three Circles</SelectItem>
                      <SelectItem value="stakeholder-map">Stakeholder Map</SelectItem>
                      <SelectItem value="force-field">Force Field Analysis</SelectItem>
                      <SelectItem value="swot">SWOT Analysis</SelectItem>
                      <SelectItem value="brainstorm">Brainstorm</SelectItem>
                      <SelectItem value="group-discussion">Group Discussion</SelectItem>
                      <SelectItem value="ai-facilitated">AI Facilitated</SelectItem>
                      <SelectItem value="conflict-protocol">Conflict Protocol</SelectItem>
                      <SelectItem value="governance-structure">Governance Structure</SelectItem>
                      <SelectItem value="decision-matrix">Decision Matrix</SelectItem>
                      <SelectItem value="mission-draft">Mission Draft</SelectItem>
                      <SelectItem value="vision-matrix">Vision Matrix</SelectItem>
                      <SelectItem value="values-matrix">Values Matrix</SelectItem>
                      <SelectItem value="9-box-matrix">9-Box Matrix</SelectItem>
                      <SelectItem value="timeline">Timeline</SelectItem>
                      <SelectItem value="action-plan">Action Plan</SelectItem>
                      <SelectItem value="summary">Summary</SelectItem>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="next-steps">Next Steps</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground mt-1">
                    The content editor will adapt to show relevant fields for this type
                  </p>
                </div>

                <Separator className="my-6" />

                <ContentEditor
                  contentType={screen.content_type}
                  content={screen.content}
                  onChange={(newContent) => {
                    setScreen({ ...screen, content: newContent });
                  }}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Screen Settings</CardTitle>
                <CardDescription>
                  Configure timing, optionality, and other settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Optional Screen</Label>
                    <p className="text-sm text-muted-foreground">
                      Participants can skip this screen
                    </p>
                  </div>
                  <Switch
                    checked={screen.is_optional}
                    onCheckedChange={(checked) => updateScreen("is_optional", checked)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Timer</Label>
                    <p className="text-sm text-muted-foreground">
                      Show countdown timer for this screen
                    </p>
                  </div>
                  <Switch
                    checked={screen.has_timer}
                    onCheckedChange={(checked) => updateScreen("has_timer", checked)}
                  />
                </div>

                {screen.has_timer && (
                  <div className="pl-6 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="timer-duration">Timer Duration (minutes)</Label>
                      <Input
                        id="timer-duration"
                        type="number"
                        min="1"
                        value={screen.timer_config.duration || ""}
                        onChange={(e) => updateTimerConfig("duration", parseInt(e.target.value) || null)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="show-warning">Show Warning</Label>
                      <Switch
                        id="show-warning"
                        checked={screen.timer_config.showWarning || false}
                        onCheckedChange={(checked) => updateTimerConfig("showWarning", checked)}
                      />
                    </div>

                    {screen.timer_config.showWarning && (
                      <div className="space-y-2">
                        <Label htmlFor="warning-at">Warning At (minutes remaining)</Label>
                        <Input
                          id="warning-at"
                          type="number"
                          min="1"
                          value={screen.timer_config.warningAt || ""}
                          onChange={(e) => updateTimerConfig("warningAt", parseInt(e.target.value) || null)}
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <Label htmlFor="can-extend">Allow Extension</Label>
                      <Switch
                        id="can-extend"
                        checked={screen.timer_config.canExtend || false}
                        onCheckedChange={(checked) => updateTimerConfig("canExtend", checked)}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Config Tab */}
          <TabsContent value="ai" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Facilitation</CardTitle>
                <CardDescription>
                  Configure AI-powered guidance for this screen
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable AI Facilitation</Label>
                    <p className="text-sm text-muted-foreground">
                      AI will provide guidance and support
                    </p>
                  </div>
                  <Switch
                    checked={screen.ai_config.enabled}
                    onCheckedChange={(checked) => updateAIConfig("enabled", checked)}
                  />
                </div>

                {screen.ai_config.enabled && (
                  <>
                    <Separator />

                    <div className="space-y-2">
                      <Label htmlFor="ai-style">AI Style</Label>
                      <Select
                        value={screen.ai_config.style || "neutral"}
                        onValueChange={(value) => updateAIConfig("style", value)}
                      >
                        <SelectTrigger id="ai-style">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="supportive">Supportive</SelectItem>
                          <SelectItem value="neutral">Neutral</SelectItem>
                          <SelectItem value="strict">Strict</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="ai-prompt">AI Prompt</Label>
                      <Textarea
                        id="ai-prompt"
                        value={screen.ai_config.prompt || ""}
                        onChange={(e) => updateAIConfig("prompt", e.target.value)}
                        rows={4}
                        placeholder="Describe how the AI should facilitate this screen..."
                      />
                      <p className="text-xs text-muted-foreground">
                        Provide specific instructions for how the AI should guide participants
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Navigation Tab */}
          <TabsContent value="navigation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Navigation</CardTitle>
                <CardDescription>
                  Define how participants move through the workshop
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="next-screen">Next Screen</Label>
                  <Input
                    id="next-screen"
                    value={screen.navigation.next || ""}
                    onChange={(e) => updateScreen("navigation", { ...screen.navigation, next: e.target.value })}
                    placeholder="screen-key"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="prev-screen">Previous Screen</Label>
                  <Input
                    id="prev-screen"
                    value={screen.navigation.previous || ""}
                    onChange={(e) => updateScreen("navigation", { ...screen.navigation, previous: e.target.value })}
                    placeholder="screen-key"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Allow Skip</Label>
                  <Switch
                    checked={screen.navigation.canSkip || false}
                    onCheckedChange={(checked) =>
                      updateScreen("navigation", { ...screen.navigation, canSkip: checked })
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
