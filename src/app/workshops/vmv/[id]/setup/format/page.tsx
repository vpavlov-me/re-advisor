"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import { Video, Users, Combine, Clock, Bot, UserCheck, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type WorkshopFormat = 'online' | 'offline' | 'hybrid';
type WorkshopMode = 'synchronous' | 'asynchronous';
type FacilitationType = 'ai' | 'human';

interface FormatConfig {
  format: WorkshopFormat;
  mode: WorkshopMode;
  facilitationType: FacilitationType;
  meetingLink: string;
  expectedDuration: number;
}

export default function FormatSelectionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [config, setConfig] = useState<FormatConfig>({
    format: 'online',
    mode: 'synchronous',
    facilitationType: 'human',
    meetingLink: '',
    expectedDuration: 120
  });

  const [isSaving, setIsSaving] = useState(false);

  const formatOptions = [
    {
      value: 'online' as const,
      icon: Video,
      label: 'Online',
      description: 'All participants join remotely via video conference',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      value: 'offline' as const,
      icon: Users,
      label: 'Offline',
      description: 'All participants meet physically in one location',
      color: 'bg-green-100 text-green-600'
    },
    {
      value: 'hybrid' as const,
      icon: Combine,
      label: 'Hybrid',
      description: 'Some participants join remotely, others are in-person',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const handleNext = async () => {
    if (!config.format) {
      toast.error("Please select a workshop format");
      return;
    }

    if (!config.facilitationType) {
      toast.error("Please select facilitation type");
      return;
    }

    setIsSaving(true);

    try {
      // TODO: Save configuration to API
      await new Promise(resolve => setTimeout(resolve, 500));

      toast.success("Format configuration saved");
      router.push(`/workshops/vmv/${id}/setup/participants`);
    } catch (error) {
      console.error("Error saving format:", error);
      toast.error("Failed to save configuration");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-page-background py-8 px-4">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link href="/workshops/vmv">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Workshops
            </Link>
          </Button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Workshop Setup: Format</h1>
              <p className="text-muted-foreground">
                Choose how participants will attend and who will facilitate
              </p>
            </div>
            <div className="text-sm text-muted-foreground">
              Step 1 of 4
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Format Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Session Format</CardTitle>
              <CardDescription>
                How will participants attend this workshop?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {formatOptions.map((option) => {
                  const Icon = option.icon;
                  const isSelected = config.format === option.value;

                  return (
                    <button
                      key={option.value}
                      onClick={() => setConfig({ ...config, format: option.value })}
                      className={`p-6 rounded-lg border-2 transition-all text-left ${
                        isSelected
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50 hover:bg-muted/50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg ${option.color} flex items-center justify-center mb-4`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="font-semibold mb-2">{option.label}</div>
                      <div className="text-sm text-muted-foreground">
                        {option.description}
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Mode Selection (only for online) */}
          {(config.format === 'online' || config.format === 'hybrid') && (
            <Card>
              <CardHeader>
                <CardTitle>Workshop Mode</CardTitle>
                <CardDescription>
                  Will all participants join at the same time?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button
                    onClick={() => setConfig({ ...config, mode: 'synchronous' })}
                    className={`p-6 rounded-lg border-2 transition-all text-left ${
                      config.mode === 'synchronous'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  >
                    <div className="font-semibold mb-2">Synchronous</div>
                    <div className="text-sm text-muted-foreground">
                      All participants join at the scheduled time
                    </div>
                  </button>

                  <button
                    onClick={() => setConfig({ ...config, mode: 'asynchronous' })}
                    className={`p-6 rounded-lg border-2 transition-all text-left ${
                      config.mode === 'asynchronous'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }`}
                  >
                    <div className="font-semibold mb-2">Asynchronous</div>
                    <div className="text-sm text-muted-foreground">
                      Each participant completes at their own pace
                    </div>
                  </button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Facilitation Type */}
          <Card>
            <CardHeader>
              <CardTitle>Facilitation Type</CardTitle>
              <CardDescription>
                Choose between AI-guided or human consultant/advisor facilitation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setConfig({ ...config, facilitationType: 'ai' })}
                  className={`p-6 rounded-lg border-2 transition-all text-left ${
                    config.facilitationType === 'ai'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className="font-semibold">AI Facilitator</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Intelligent AI guides the workshop with prompts and recommendations
                  </div>
                </button>

                <button
                  onClick={() => setConfig({ ...config, facilitationType: 'human' })}
                  className={`p-6 rounded-lg border-2 transition-all text-left ${
                    config.facilitationType === 'human'
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center">
                      <UserCheck className="h-5 w-5" />
                    </div>
                    <div className="font-semibold">Human Consultant/Advisor</div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Professional facilitator leads the workshop with AI assistance
                  </div>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Meeting Link (optional) */}
          {config.mode === 'synchronous' && (
            <Card>
              <CardHeader>
                <CardTitle>Meeting Link (Optional)</CardTitle>
                <CardDescription>
                  Provide a video conference link if you have one
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="meeting-link">Meeting URL</Label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="meeting-link"
                      type="url"
                      placeholder="https://zoom.us/j/123456789 or meeting link"
                      value={config.meetingLink}
                      onChange={(e) => setConfig({ ...config, meetingLink: e.target.value })}
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Leave empty to generate a Jitsi Meet link automatically
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Expected Duration */}
          <Card>
            <CardHeader>
              <CardTitle>Expected Duration</CardTitle>
              <CardDescription>
                How long do you expect this workshop to take?
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Select
                  value={config.expectedDuration.toString()}
                  onValueChange={(value) => setConfig({ ...config, expectedDuration: parseInt(value) })}
                >
                  <SelectTrigger id="duration">
                    <Clock className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="90">1.5 hours</SelectItem>
                    <SelectItem value="120">2 hours</SelectItem>
                    <SelectItem value="150">2.5 hours</SelectItem>
                    <SelectItem value="180">3 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between pt-6 border-t">
            <Button variant="outline" asChild>
              <Link href="/workshops/vmv">Cancel</Link>
            </Button>
            <Button onClick={handleNext} disabled={isSaving}>
              {isSaving ? "Saving..." : "Next: Participants"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
