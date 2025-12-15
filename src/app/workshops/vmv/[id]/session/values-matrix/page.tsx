"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  Plus,
  X,
  CheckCircle2,
  Clock,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Save
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

interface ValueMatrix {
  definition: string;
  weAlways: string[];
  weNever: string[];
  metrics: string[];
}

interface FinalValue {
  name: string;
  icon: string;
  matrix: ValueMatrix;
  isComplete: boolean;
}

export default function ValuesMatrixPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [values, setValues] = useState<FinalValue[]>([]);
  const [activeValueIndex, setActiveValueIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30 * 60); // 30 minutes
  const [newAlways, setNewAlways] = useState("");
  const [newNever, setNewNever] = useState("");
  const [newMetric, setNewMetric] = useState("");

  useEffect(() => {
    // Mock: Top 5 values from previous stage
    setValues([
      {
        name: "Integrity & Honesty",
        icon: "🤝",
        matrix: {
          definition: "",
          weAlways: [],
          weNever: [],
          metrics: []
        },
        isComplete: false
      },
      {
        name: "Family Unity",
        icon: "👨‍👩‍👧‍👦",
        matrix: {
          definition: "",
          weAlways: [],
          weNever: [],
          metrics: []
        },
        isComplete: false
      },
      {
        name: "Innovation",
        icon: "💡",
        matrix: {
          definition: "",
          weAlways: [],
          weNever: [],
          metrics: []
        },
        isComplete: false
      },
      {
        name: "Education",
        icon: "🎓",
        matrix: {
          definition: "",
          weAlways: [],
          weNever: [],
          metrics: []
        },
        isComplete: false
      },
      {
        name: "Service to Society",
        icon: "🌍",
        matrix: {
          definition: "",
          weAlways: [],
          weNever: [],
          metrics: []
        },
        isComplete: false
      }
    ]);

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

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const activeValue = values[activeValueIndex];

  const updateValueDefinition = (definition: string) => {
    const updated = [...values];
    updated[activeValueIndex].matrix.definition = definition;
    setValues(updated);
  };

  const addAlways = () => {
    if (!newAlways.trim()) return;
    const updated = [...values];
    updated[activeValueIndex].matrix.weAlways.push(newAlways.trim());
    setValues(updated);
    setNewAlways("");
  };

  const removeAlways = (index: number) => {
    const updated = [...values];
    updated[activeValueIndex].matrix.weAlways.splice(index, 1);
    setValues(updated);
  };

  const addNever = () => {
    if (!newNever.trim()) return;
    const updated = [...values];
    updated[activeValueIndex].matrix.weNever.push(newNever.trim());
    setValues(updated);
    setNewNever("");
  };

  const removeNever = (index: number) => {
    const updated = [...values];
    updated[activeValueIndex].matrix.weNever.splice(index, 1);
    setValues(updated);
  };

  const addMetric = () => {
    if (!newMetric.trim()) return;
    const updated = [...values];
    updated[activeValueIndex].matrix.metrics.push(newMetric.trim());
    setValues(updated);
    setNewMetric("");
  };

  const removeMetric = (index: number) => {
    const updated = [...values];
    updated[activeValueIndex].matrix.metrics.splice(index, 1);
    setValues(updated);
  };

  const checkValueComplete = (value: FinalValue): boolean => {
    return (
      value.matrix.definition.trim().length > 0 &&
      value.matrix.weAlways.length >= 2 &&
      value.matrix.weNever.length >= 2 &&
      value.matrix.metrics.length >= 1
    );
  };

  const handleSaveAndNext = () => {
    if (!checkValueComplete(activeValue)) {
      toast.error("Please complete all sections before moving to next value");
      return;
    }

    const updated = [...values];
    updated[activeValueIndex].isComplete = true;
    setValues(updated);
    toast.success(`${activeValue.name} matrix saved!`);

    if (activeValueIndex < values.length - 1) {
      setActiveValueIndex(activeValueIndex + 1);
    }
  };

  const handleContinue = () => {
    const allComplete = values.every(v => checkValueComplete(v));
    if (!allComplete) {
      toast.error("Please complete all value matrices before continuing");
      return;
    }

    toast.success("All values defined! Moving to mission statement");
    router.push(`/workshops/vmv/${id}/session/mission-draft`);
  };

  const completedCount = values.filter(v => checkValueComplete(v)).length;
  const progressPercentage = (completedCount / values.length) * 100;

  return (
    <div className="min-h-screen bg-page-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold">Values, Mission & Vision Workshop</h1>
              <p className="text-sm text-muted-foreground">Stage 3: Values Matrix Definition</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="gap-2">
              <CheckCircle2 className="h-3 w-3" />
              {completedCount}/{values.length} complete
            </Badge>
            <Badge variant="outline" className="gap-2">
              <Clock className="h-3 w-3" />
              {formatTime(timeRemaining)}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle>Complete Matrix for Each Value</CardTitle>
              <CardDescription>
                Define specific behaviors and metrics for each of your {values.length} core values (~6 mins per value)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertDescription>
                  <strong>Make values actionable:</strong> Move beyond abstract concepts to concrete behaviors.
                  Define what each value looks like in practice, what it doesn't look like, and how you'll measure it.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Progress */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Overall Progress</span>
                <span className="font-semibold">{completedCount}/{values.length} values complete</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </CardContent>
          </Card>

          {/* Value Tabs */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Select Value to Define</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeValueIndex.toString()} onValueChange={(v) => setActiveValueIndex(parseInt(v))}>
                <TabsList className="grid grid-cols-5 w-full">
                  {values.map((value, index) => (
                    <TabsTrigger key={index} value={index.toString()} className="relative">
                      <span className="text-lg mr-2">{value.icon}</span>
                      <span className="hidden md:inline">{value.name}</span>
                      {checkValueComplete(value) && (
                        <CheckCircle2 className="absolute -top-1 -right-1 h-4 w-4 text-green-600" />
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            </CardContent>
          </Card>

          {/* Matrix Editor */}
          <Card>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-3">
                    <span className="text-3xl">{activeValue.icon}</span>
                    {activeValue.name}
                  </CardTitle>
                  <CardDescription className="mt-2">
                    Define behaviors, anti-behaviors, and metrics for this value
                  </CardDescription>
                </div>
                {checkValueComplete(activeValue) && (
                  <Badge className="bg-green-600">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Complete
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="pt-6 space-y-8">
              {/* Definition */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  <Label className="text-lg font-semibold">Value Definition</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  What does "{activeValue.name}" mean to your family? Be specific.
                </p>
                <Textarea
                  placeholder={`e.g., "People-First Leadership: We prioritize employee well-being, development, and dignity over short-term profits."`}
                  value={activeValue.matrix.definition}
                  onChange={(e) => updateValueDefinition(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>

              <Separator />

              {/* We Always */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <Label className="text-lg font-semibold">We Always... (Behaviors)</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  What specific actions demonstrate this value? Add at least 2 behaviors.
                </p>

                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., Invest in training and development programs"
                    value={newAlways}
                    onChange={(e) => setNewAlways(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addAlways()}
                  />
                  <Button onClick={addAlways}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {activeValue.matrix.weAlways.length > 0 && (
                  <div className="space-y-2">
                    {activeValue.matrix.weAlways.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
                        <TrendingUp className="h-4 w-4 text-green-600 mt-0.5" />
                        <span className="flex-1 text-sm">{item}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAlways(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              {/* We Never */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-5 w-5 text-red-600" />
                  <Label className="text-lg font-semibold">We Never... (Anti-Behaviors)</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  What actions would violate this value? Add at least 2 anti-behaviors.
                </p>

                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., Cut training budgets during downturns"
                    value={newNever}
                    onChange={(e) => setNewNever(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addNever()}
                  />
                  <Button onClick={addNever} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {activeValue.matrix.weNever.length > 0 && (
                  <div className="space-y-2">
                    {activeValue.matrix.weNever.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-200">
                        <TrendingDown className="h-4 w-4 text-red-600 mt-0.5" />
                        <span className="flex-1 text-sm">{item}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeNever(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              {/* Metrics */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  <Label className="text-lg font-semibold">How We Measure</Label>
                </div>
                <p className="text-sm text-muted-foreground">
                  What metrics will you use to track adherence to this value? Add at least 1 metric.
                </p>

                <div className="flex gap-2">
                  <Input
                    placeholder="e.g., Employee retention rate >85%, Training spend per FTE, Annual engagement survey >4.0/5"
                    value={newMetric}
                    onChange={(e) => setNewMetric(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addMetric()}
                  />
                  <Button onClick={addMetric} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {activeValue.matrix.metrics.length > 0 && (
                  <div className="space-y-2">
                    {activeValue.matrix.metrics.map((item, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                        <BarChart3 className="h-4 w-4 text-blue-600 mt-0.5" />
                        <span className="flex-1 text-sm">{item}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMetric(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>

            {/* Footer */}
            <div className="border-t p-4 bg-muted/10 flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveValueIndex(Math.max(0, activeValueIndex - 1))}
                disabled={activeValueIndex === 0}
              >
                Previous Value
              </Button>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleSaveAndNext}
                  disabled={!checkValueComplete(activeValue)}
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save & Next
                </Button>

                {activeValueIndex === values.length - 1 && checkValueComplete(activeValue) && (
                  <Button onClick={handleContinue}>
                    Continue to Mission
                  </Button>
                )}
              </div>
            </div>
          </Card>

          {/* Completion Checklist */}
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Completion Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  {activeValue.matrix.definition.trim().length > 0 ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2" />
                  )}
                  <span>Definition provided</span>
                </div>
                <div className="flex items-center gap-2">
                  {activeValue.matrix.weAlways.length >= 2 ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2" />
                  )}
                  <span>At least 2 "We Always" behaviors ({activeValue.matrix.weAlways.length}/2)</span>
                </div>
                <div className="flex items-center gap-2">
                  {activeValue.matrix.weNever.length >= 2 ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2" />
                  )}
                  <span>At least 2 "We Never" anti-behaviors ({activeValue.matrix.weNever.length}/2)</span>
                </div>
                <div className="flex items-center gap-2">
                  {activeValue.matrix.metrics.length >= 1 ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2" />
                  )}
                  <span>At least 1 metric ({activeValue.matrix.metrics.length}/1)</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
