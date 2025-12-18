"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Target,
  Users,
  TrendingUp,
  Heart,
  Sparkles,
  Clock,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface MissionDraft {
  purpose: string;
  audience: string;
  approach: string;
  selectedValues: string[];
}

export default function MissionDraftPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [draft, setDraft] = useState<MissionDraft>({
    purpose: "",
    audience: "",
    approach: "",
    selectedValues: []
  });

  const [timeRemaining, setTimeRemaining] = useState(20 * 60);
  const [aiSuggestions, setAiSuggestions] = useState<{ [key: string]: string[] }>({});
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Mock: Final values from previous stage
  const finalValues = [
    { name: "Integrity & Honesty", icon: "🤝" },
    { name: "Family Unity", icon: "👨‍👩‍👧‍👦" },
    { name: "Innovation", icon: "💡" },
    { name: "Education", icon: "🎓" },
    { name: "Service to Society", icon: "🌍" }
  ];

  useEffect(() => {
    // Timer
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Mock AI suggestions
    setAiSuggestions({
      purpose: [
        "Create long-term prosperity and unity across generations",
        "Build sustainable wealth while maintaining family harmony",
        "Foster entrepreneurial spirit and social responsibility",
        "Preserve family legacy through education and values"
      ],
      audience: [
        "For members of our family, our employees, and the communities we serve",
        "For current and future generations of our family",
        "For our family members and the businesses we steward",
        "For those connected to our family's mission"
      ],
      approach: [
        "Through strategic leadership, collaborative governance, and responsible stewardship",
        "By maintaining our core values while adapting to changing times",
        "Through education, innovation, and commitment to excellence",
        "By balancing tradition with progress and individual growth with family unity"
      ]
    });

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const toggleValue = (valueName: string) => {
    const newValues = draft.selectedValues.includes(valueName)
      ? draft.selectedValues.filter(v => v !== valueName)
      : [...draft.selectedValues, valueName];

    setDraft({ ...draft, selectedValues: newValues });
  };

  const applySuggestion = (field: keyof MissionDraft, suggestion: string) => {
    setDraft({ ...draft, [field]: suggestion });
    toast.success("Suggestion applied");
  };

  const generateMissionStatement = (): string => {
    if (!draft.purpose || !draft.audience || !draft.approach) {
      return "";
    }

    const values = draft.selectedValues.length > 0
      ? `, guided by our values of ${draft.selectedValues.slice(0, -1).join(', ')}${draft.selectedValues.length > 1 ? ' and ' : ''}${draft.selectedValues[draft.selectedValues.length - 1]}`
      : "";

    return `We exist to ${draft.purpose} for ${draft.audience}, through ${draft.approach}${values}.`;
  };

  const generatedMission = generateMissionStatement();

  const isComplete = draft.purpose.trim() && draft.audience.trim() && draft.approach.trim() && draft.selectedValues.length >= 2;

  const handleSubmit = () => {
    if (!isComplete) {
      toast.error("Please complete all fields and select at least 2 values");
      return;
    }

    toast.success("Mission draft saved!");
    router.push(`/workshops/vmv/${id}/session/mission-final`);
  };

  return (
    <div className="min-h-screen bg-page-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Target className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold">Values, Mission & Vision Workshop</h1>
              <p className="text-sm text-muted-foreground">Stage 4: Family Mission Statement</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="gap-2">
              <Clock className="h-3 w-3" />
              {formatTime(timeRemaining)}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Create Your Mission Statement
              </CardTitle>
              <CardDescription>
                Build your family mission statement step by step (20 minutes)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertDescription>
                  <strong>Mission Formula:</strong> Answer three key questions to create a clear, actionable mission statement.
                  Each participant creates their own draft, then we'll synthesize them into one collective mission.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Mission Builder */}
          <Card>
            <CardHeader>
              <CardTitle>Mission Formula</CardTitle>
              <CardDescription>
                Build your mission statement step by step
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Purpose */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                      1
                    </div>
                    <Label className="text-lg font-semibold">Purpose: What impact do you want to create?</Label>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSuggestions(!showSuggestions)}
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    {showSuggestions ? 'Hide' : 'Show'} AI Suggestions
                  </Button>
                </div>

                <Textarea
                  placeholder="e.g., Create long-term prosperity and unity across generations"
                  value={draft.purpose}
                  onChange={(e) => setDraft({ ...draft, purpose: e.target.value })}
                  className="min-h-[80px]"
                />

                {showSuggestions && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground font-medium">AI Suggestions:</p>
                    {aiSuggestions.purpose?.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => applySuggestion('purpose', suggestion)}
                        className="w-full text-left p-3 rounded-lg border bg-blue-50 border-blue-200 hover:bg-blue-100 transition-colors text-sm"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              {/* Audience */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                    2
                  </div>
                  <Label className="text-lg font-semibold">Audience: Who benefits?</Label>
                </div>

                <Textarea
                  placeholder="e.g., For members of our family, our employees, and the communities we serve"
                  value={draft.audience}
                  onChange={(e) => setDraft({ ...draft, audience: e.target.value })}
                  className="min-h-[80px]"
                />

                {showSuggestions && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground font-medium">AI Suggestions:</p>
                    {aiSuggestions.audience?.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => applySuggestion('audience', suggestion)}
                        className="w-full text-left p-3 rounded-lg border bg-blue-50 border-blue-200 hover:bg-blue-100 transition-colors text-sm"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              {/* Approach */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                    3
                  </div>
                  <Label className="text-lg font-semibold">Approach: How will you achieve it?</Label>
                </div>

                <Textarea
                  placeholder="e.g., Through strategic leadership, collaborative governance, and responsible stewardship"
                  value={draft.approach}
                  onChange={(e) => setDraft({ ...draft, approach: e.target.value })}
                  className="min-h-[80px]"
                />

                {showSuggestions && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground font-medium">AI Suggestions:</p>
                    {aiSuggestions.approach?.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => applySuggestion('approach', suggestion)}
                        className="w-full text-left p-3 rounded-lg border bg-blue-50 border-blue-200 hover:bg-blue-100 transition-colors text-sm"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              {/* Values Selection */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                    4
                  </div>
                  <Label className="text-lg font-semibold">Values: Which core values guide you?</Label>
                </div>

                <p className="text-sm text-muted-foreground">
                  Select 2-4 values that will be mentioned in the mission statement
                </p>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {finalValues.map((value) => {
                    const isSelected = draft.selectedValues.includes(value.name);

                    return (
                      <button
                        key={value.name}
                        onClick={() => toggleValue(value.name)}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50 hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-2xl">{value.icon}</span>
                          <span className="text-sm font-medium text-center">{value.name}</span>
                          {isSelected && <CheckCircle2 className="h-4 w-4 text-primary" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="text-xs text-muted-foreground">
                  Selected: {draft.selectedValues.length} values
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Generated Mission Preview */}
          {generatedMission && (
            <Card className="border-primary/20 bg-gradient-to-br from-orange-50 to-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Your Mission Statement
                </CardTitle>
                <CardDescription>
                  Preview of your generated mission based on the formula above
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-6 rounded-lg bg-white border-2 border-primary/20">
                  <p className="text-lg leading-relaxed text-center">
                    "{generatedMission}"
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Completion Checklist */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Completion Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  {draft.purpose.trim() ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2" />
                  )}
                  <span>Purpose defined</span>
                </div>
                <div className="flex items-center gap-2">
                  {draft.audience.trim() ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2" />
                  )}
                  <span>Audience identified</span>
                </div>
                <div className="flex items-center gap-2">
                  {draft.approach.trim() ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2" />
                  )}
                  <span>Approach described</span>
                </div>
                <div className="flex items-center gap-2">
                  {draft.selectedValues.length >= 2 ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2" />
                  )}
                  <span>At least 2 values selected ({draft.selectedValues.length}/2)</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end">
            <Button
              onClick={handleSubmit}
              disabled={!isComplete}
              size="lg"
            >
              Submit Mission Draft
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
