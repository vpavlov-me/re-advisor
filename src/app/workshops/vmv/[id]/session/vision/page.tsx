"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Eye,
  Target,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Users,
  DollarSign,
  Globe,
  Award,
  Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface VisionDimension {
  goalState: string;
  nonGoals: string;
  firstMilestone: string;
  keyRisk: string;
  riskResponse: string;
}

interface VisionData {
  family: VisionDimension;
  business: VisionDimension;
  capital: VisionDimension;
  social: VisionDimension;
  reputation: VisionDimension;
  risk: VisionDimension;
}

const emptyDimension: VisionDimension = {
  goalState: "",
  nonGoals: "",
  firstMilestone: "",
  keyRisk: "",
  riskResponse: ""
};

const dimensions = [
  {
    key: "family" as const,
    label: "Family",
    icon: Users,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    description: "Family unity, relationships, and next generation development"
  },
  {
    key: "business" as const,
    label: "Business",
    icon: TrendingUp,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    description: "Business growth, strategy, and operational excellence"
  },
  {
    key: "capital" as const,
    label: "Capital",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50",
    description: "Financial sustainability and wealth preservation"
  },
  {
    key: "social" as const,
    label: "Social Impact",
    icon: Globe,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    description: "Community contribution and societal influence"
  },
  {
    key: "reputation" as const,
    label: "Reputation",
    icon: Award,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    description: "Family legacy and public perception"
  },
  {
    key: "risk" as const,
    label: "Risk Management",
    icon: Shield,
    color: "text-red-600",
    bgColor: "bg-red-50",
    description: "Identifying and mitigating key risks"
  }
];

export default function VisionCanvasPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [activeDimension, setActiveDimension] = useState<keyof VisionData>("family");
  const [visionData, setVisionData] = useState<VisionData>({
    family: { ...emptyDimension },
    business: { ...emptyDimension },
    capital: { ...emptyDimension },
    social: { ...emptyDimension },
    reputation: { ...emptyDimension },
    risk: { ...emptyDimension }
  });
  const [timeRemaining, setTimeRemaining] = useState(30 * 60);
  const [showAiSuggestions, setShowAiSuggestions] = useState(false);

  // Mock AI suggestions based on mission and values
  const aiSuggestions = {
    family: {
      goalState: "A united family where every generation feels connected, valued, and prepared to contribute to our shared legacy while maintaining individual autonomy and pursuing personal passions.",
      nonGoals: "We won't force participation, impose career choices on next generation, or prioritize business over family wellbeing.",
      firstMilestone: "Establish quarterly family councils with 80%+ attendance and launch mentorship program pairing G2 and G3 members.",
      keyRisk: "Growing generational divides and communication breakdown",
      riskResponse: "Implement structured communication channels and regular family gatherings"
    },
    business: {
      goalState: "A diversified portfolio of sustainable businesses generating consistent returns while providing meaningful employment and leadership opportunities for family members.",
      nonGoals: "We won't pursue growth at any cost, enter industries that conflict with our values, or sacrifice quality for scale.",
      firstMilestone: "Complete strategic review of all business units and identify 2-3 new growth opportunities aligned with family values.",
      keyRisk: "Market disruption and technological obsolescence",
      riskResponse: "Establish innovation fund and advisory board with external experts"
    },
    capital: {
      goalState: "Sustainable wealth preservation and growth through diversified investments, providing financial security for current and future generations while supporting family mission.",
      nonGoals: "We won't chase high-risk speculative investments, compromise our values for returns, or create unhealthy dependence on family wealth.",
      firstMilestone: "Establish family investment committee and complete comprehensive portfolio review with clear allocation targets.",
      keyRisk: "Concentration risk and inadequate diversification",
      riskResponse: "Develop formal investment policy statement with diversification requirements"
    },
    social: {
      goalState: "Recognized leaders in education and community development, making measurable impact through strategic philanthropy and active engagement in causes aligned with family values.",
      nonGoals: "We won't spread resources too thin, support causes purely for recognition, or neglect measurement of our impact.",
      firstMilestone: "Select 2-3 focus areas for philanthropic efforts and establish family foundation with clear mission and governance.",
      keyRisk: "Lack of coordination leading to fragmented impact",
      riskResponse: "Create centralized foundation with shared strategic priorities"
    },
    reputation: {
      goalState: "Known as a family of integrity, innovation, and positive impact - trusted by stakeholders and respected in our communities and industries.",
      nonGoals: "We won't pursue publicity for its own sake, compromise our values for reputation, or ignore negative feedback.",
      firstMilestone: "Develop family communications guidelines and appoint reputation committee to monitor and guide family's public presence.",
      keyRisk: "Individual actions damaging collective reputation",
      riskResponse: "Establish clear communication protocols and crisis response plan"
    },
    risk: {
      goalState: "Comprehensive risk management framework protecting family assets, relationships, and legacy while enabling confident decision-making and calculated risk-taking.",
      nonGoals: "We won't become paralyzed by risk aversion, ignore emerging threats, or fail to learn from mistakes.",
      firstMilestone: "Complete family risk assessment across all dimensions and establish risk committee with quarterly review process.",
      keyRisk: "Inadequate succession planning and governance structures",
      riskResponse: "Develop comprehensive succession plans and formalize governance framework"
    }
  };

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

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const updateDimension = (
    dimension: keyof VisionData,
    field: keyof VisionDimension,
    value: string
  ) => {
    setVisionData(prev => ({
      ...prev,
      [dimension]: {
        ...prev[dimension],
        [field]: value
      }
    }));
  };

  const applySuggestion = (field: keyof VisionDimension) => {
    const suggestion = aiSuggestions[activeDimension][field];
    updateDimension(activeDimension, field, suggestion);
    toast.success("AI suggestion applied");
  };

  const checkDimensionComplete = (dimension: VisionDimension): boolean => {
    return (
      dimension.goalState.trim().length > 0 &&
      dimension.nonGoals.trim().length > 0 &&
      dimension.firstMilestone.trim().length > 0 &&
      dimension.keyRisk.trim().length > 0 &&
      dimension.riskResponse.trim().length > 0
    );
  };

  const completedCount = Object.values(visionData).filter(checkDimensionComplete).length;
  const progressPercentage = (completedCount / dimensions.length) * 100;
  const isComplete = completedCount === dimensions.length;

  const handleContinue = () => {
    if (!isComplete) {
      toast.error("Please complete all 6 dimensions");
      return;
    }

    toast.success("Vision canvas completed!");
    router.push(`/workshops/vmv/${id}/session/summary`);
  };

  const currentDimension = visionData[activeDimension];
  const currentDimensionInfo = dimensions.find(d => d.key === activeDimension)!;
  const isDimensionComplete = checkDimensionComplete(currentDimension);

  return (
    <div className="min-h-screen bg-page-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Eye className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold">Values, Mission & Vision Workshop</h1>
              <p className="text-sm text-muted-foreground">Stage 5: Vision Canvas</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="gap-2">
              <Clock className="h-3 w-3" />
              {formatTime(timeRemaining)}
            </Badge>
            <Badge variant={isComplete ? "default" : "secondary"}>
              {completedCount}/{dimensions.length} Complete
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-primary" />
                Create Your 20-Year Vision
              </CardTitle>
              <CardDescription>
                Define your family's future across 6 key dimensions (30 minutes)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertDescription>
                  <strong>Vision Canvas:</strong> For each dimension, describe your aspirational future state (10-30 years),
                  what you won't do, your first milestone (7-12 months), and key risks with responses.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Progress Overview */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Progress value={progressPercentage} className="h-2" />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {dimensions.map(dimension => {
                  const Icon = dimension.icon;
                  const isComplete = checkDimensionComplete(visionData[dimension.key]);
                  return (
                    <div
                      key={dimension.key}
                      className="flex items-center gap-2 text-sm"
                    >
                      {isComplete ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <div className="h-4 w-4 rounded-full border-2" />
                      )}
                      <Icon className={`h-4 w-4 ${dimension.color}`} />
                      <span>{dimension.label}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Dimension Tabs */}
          <Tabs value={activeDimension} onValueChange={(v) => setActiveDimension(v as keyof VisionData)}>
            <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
              {dimensions.map(dimension => {
                const Icon = dimension.icon;
                const isComplete = checkDimensionComplete(visionData[dimension.key]);
                return (
                  <TabsTrigger
                    key={dimension.key}
                    value={dimension.key}
                    className="relative"
                  >
                    <Icon className="h-4 w-4 mr-1" />
                    {dimension.label}
                    {isComplete && (
                      <CheckCircle2 className="absolute -top-1 -right-1 h-3 w-3 text-green-600" />
                    )}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {dimensions.map(dimension => {
              const Icon = dimension.icon;
              return (
                <TabsContent key={dimension.key} value={dimension.key} className="space-y-6 mt-6">
                  {/* Dimension Header */}
                  <Card className={dimension.bgColor}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon className={`h-6 w-6 ${dimension.color}`} />
                        {dimension.label}
                      </CardTitle>
                      <CardDescription>{dimension.description}</CardDescription>
                    </CardHeader>
                  </Card>

                  {/* Vision Form */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Vision Details</CardTitle>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setShowAiSuggestions(!showAiSuggestions)}
                        >
                          <Sparkles className="h-4 w-4 mr-2" />
                          {showAiSuggestions ? 'Hide' : 'Show'} AI Recommendations
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Goal State */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-base font-semibold">
                            Goal Future State (10-30 years)
                          </Label>
                          {showAiSuggestions && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => applySuggestion('goalState')}
                            >
                              Apply AI
                            </Button>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          What does success look like in this dimension? Be specific and aspirational.
                        </p>
                        <Textarea
                          placeholder="Describe your aspirational future state..."
                          value={visionData[dimension.key].goalState}
                          onChange={(e) => updateDimension(dimension.key, 'goalState', e.target.value)}
                          className="min-h-[100px]"
                        />
                        {showAiSuggestions && (
                          <div className="p-3 rounded-lg border bg-blue-50 border-blue-200 text-sm">
                            <p className="text-xs font-medium text-muted-foreground mb-1">AI Recommendation:</p>
                            <p>{aiSuggestions[dimension.key].goalState}</p>
                          </div>
                        )}
                      </div>

                      <Separator />

                      {/* Non-Goals */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-base font-semibold">
                            Non-Goals (What we won't do)
                          </Label>
                          {showAiSuggestions && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => applySuggestion('nonGoals')}
                            >
                              Apply AI
                            </Button>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Define boundaries. What will you explicitly avoid or not prioritize?
                        </p>
                        <Textarea
                          placeholder="List what you won't do or pursue..."
                          value={visionData[dimension.key].nonGoals}
                          onChange={(e) => updateDimension(dimension.key, 'nonGoals', e.target.value)}
                          className="min-h-[80px]"
                        />
                        {showAiSuggestions && (
                          <div className="p-3 rounded-lg border bg-blue-50 border-blue-200 text-sm">
                            <p className="text-xs font-medium text-muted-foreground mb-1">AI Recommendation:</p>
                            <p>{aiSuggestions[dimension.key].nonGoals}</p>
                          </div>
                        )}
                      </div>

                      <Separator />

                      {/* First Milestone */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <Label className="text-base font-semibold">
                            First Milestone (7-12 months)
                          </Label>
                          {showAiSuggestions && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => applySuggestion('firstMilestone')}
                            >
                              Apply AI
                            </Button>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          What's the first concrete step toward this vision? Make it measurable.
                        </p>
                        <Textarea
                          placeholder="Describe your first milestone..."
                          value={visionData[dimension.key].firstMilestone}
                          onChange={(e) => updateDimension(dimension.key, 'firstMilestone', e.target.value)}
                          className="min-h-[80px]"
                        />
                        {showAiSuggestions && (
                          <div className="p-3 rounded-lg border bg-blue-50 border-blue-200 text-sm">
                            <p className="text-xs font-medium text-muted-foreground mb-1">AI Recommendation:</p>
                            <p>{aiSuggestions[dimension.key].firstMilestone}</p>
                          </div>
                        )}
                      </div>

                      <Separator />

                      {/* Risk Management */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-amber-500" />
                          <Label className="text-base font-semibold">Risk Assessment</Label>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Label>Key Risk</Label>
                              {showAiSuggestions && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => applySuggestion('keyRisk')}
                                >
                                  Apply AI
                                </Button>
                              )}
                            </div>
                            <Input
                              placeholder="What's the biggest risk to achieving this vision?"
                              value={visionData[dimension.key].keyRisk}
                              onChange={(e) => updateDimension(dimension.key, 'keyRisk', e.target.value)}
                            />
                            {showAiSuggestions && (
                              <div className="p-2 mt-2 rounded border bg-blue-50 border-blue-200 text-xs">
                                <p className="font-medium text-muted-foreground">AI:</p>
                                <p>{aiSuggestions[dimension.key].keyRisk}</p>
                              </div>
                            )}
                          </div>

                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <Label>Risk Response</Label>
                              {showAiSuggestions && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => applySuggestion('riskResponse')}
                                >
                                  Apply AI
                                </Button>
                              )}
                            </div>
                            <Input
                              placeholder="How will you mitigate or respond to this risk?"
                              value={visionData[dimension.key].riskResponse}
                              onChange={(e) => updateDimension(dimension.key, 'riskResponse', e.target.value)}
                            />
                            {showAiSuggestions && (
                              <div className="p-2 mt-2 rounded border bg-blue-50 border-blue-200 text-xs">
                                <p className="font-medium text-muted-foreground">AI:</p>
                                <p>{aiSuggestions[dimension.key].riskResponse}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Dimension Completion Status */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm">Completion Checklist</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          {visionData[dimension.key].goalState.trim() ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border-2" />
                          )}
                          <span>Goal future state defined</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {visionData[dimension.key].nonGoals.trim() ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border-2" />
                          )}
                          <span>Non-goals specified</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {visionData[dimension.key].firstMilestone.trim() ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border-2" />
                          )}
                          <span>First milestone outlined</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {visionData[dimension.key].keyRisk.trim() ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border-2" />
                          )}
                          <span>Key risk identified</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {visionData[dimension.key].riskResponse.trim() ? (
                            <CheckCircle2 className="h-4 w-4 text-green-600" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border-2" />
                          )}
                          <span>Risk response planned</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              );
            })}
          </Tabs>

          {/* Navigation */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {isComplete ? (
                    <span className="flex items-center gap-2 text-green-600 font-medium">
                      <CheckCircle2 className="h-4 w-4" />
                      All dimensions completed!
                    </span>
                  ) : (
                    <span>
                      Complete all {dimensions.length} dimensions to continue
                    </span>
                  )}
                </div>
                <Button
                  onClick={handleContinue}
                  disabled={!isComplete}
                  size="lg"
                >
                  Continue to Summary
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
