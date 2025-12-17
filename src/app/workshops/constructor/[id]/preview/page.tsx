"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  X,
  Clock,
  Users,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import type { WorkshopTemplate, WorkshopScreen } from "@/types/workshop-constructor";

export default function WorkshopPreviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [template, setTemplate] = useState<WorkshopTemplate | null>(null);
  const [screens, setScreens] = useState<WorkshopScreen[]>([]);
  const [currentScreenIndex, setCurrentScreenIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  useEffect(() => {
    loadWorkshop();
  }, [id]);

  useEffect(() => {
    // Timer logic
    const currentScreen = screens[currentScreenIndex];
    if (currentScreen?.has_timer && currentScreen.timer_config.duration) {
      setTimeRemaining(currentScreen.timer_config.duration * 60); // Convert to seconds

      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev === null || prev <= 0) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    } else {
      setTimeRemaining(null);
    }
  }, [currentScreenIndex, screens]);

  const loadWorkshop = async () => {
    try {
      setLoading(true);
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock data
      setTemplate({
        id,
        created_by: "user1",
        name: "Strategic Planning Workshop",
        description: "Comprehensive strategic planning session for family businesses",
        duration_minutes: 180,
        target_audience: "Family Council, Board",
        category: "Strategy",
        is_public: false,
        is_master: true,
        cloned_from: null,
        version: 1,
        status: "draft",
        settings: { enableAI: true, enableChat: true, showProgressBar: true },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        published_at: null,
      });

      setScreens([
        {
          id: "screen-1",
          template_id: id,
          screen_key: "kickoff",
          name: "Welcome & Kickoff",
          description: "Workshop introduction and objectives",
          order_index: 0,
          duration_minutes: 10,
          screen_type: "text",
          content_type: "introduction",
          content: {
            title: "Welcome to the Strategic Planning Workshop",
            description: "Thank you for participating in today's workshop. We'll be working together to develop a comprehensive strategic plan for our family business.",
            objectives: [
              "Define our long-term vision and goals",
              "Identify strategic priorities",
              "Create an actionable strategic plan",
              "Align family members on direction"
            ]
          },
          navigation: { next: "screen-2" },
          ai_config: { enabled: false },
          has_timer: false,
          timer_config: {},
          is_optional: false,
          show_conditions: {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "screen-2",
          template_id: id,
          screen_key: "swot-analysis",
          name: "SWOT Analysis",
          description: "Analyze strengths, weaknesses, opportunities, threats",
          order_index: 1,
          duration_minutes: 30,
          screen_type: "exercise",
          content_type: "swot",
          content: {
            title: "SWOT Analysis",
            description: "Let's analyze our strategic position by examining internal strengths and weaknesses, as well as external opportunities and threats."
          },
          navigation: { previous: "screen-1", next: "screen-3" },
          ai_config: { enabled: true, style: "supportive", prompt: "Help participants think critically about each quadrant" },
          has_timer: true,
          timer_config: { duration: 30, showWarning: true, warningAt: 5 },
          is_optional: false,
          show_conditions: {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        {
          id: "screen-3",
          template_id: id,
          screen_key: "action-plan",
          name: "Action Plan",
          description: "Define next steps and accountability",
          order_index: 2,
          duration_minutes: 20,
          screen_type: "exercise",
          content_type: "action-plan",
          content: {
            title: "Action Plan",
            description: "Let's create concrete next steps with clear owners and deadlines."
          },
          navigation: { previous: "screen-2" },
          ai_config: { enabled: false },
          has_timer: false,
          timer_config: {},
          is_optional: false,
          show_conditions: {},
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ]);
    } catch (error) {
      toast.error("Failed to load workshop");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    if (currentScreenIndex < screens.length - 1) {
      setCurrentScreenIndex(currentScreenIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentScreenIndex > 0) {
      setCurrentScreenIndex(currentScreenIndex - 1);
    }
  };

  const handleExit = () => {
    router.push(`/workshops/constructor/${id}/builder`);
  };

  const handleExtendTime = () => {
    const currentScreen = screens[currentScreenIndex];
    if (currentScreen?.timer_config.canExtend) {
      const extensionMinutes = currentScreen.timer_config.extensionDuration || 5;
      const extensionSeconds = extensionMinutes * 60;
      setTimeRemaining((prev) => (prev || 0) + extensionSeconds);
      toast.success(`Added ${extensionMinutes} minutes to the timer`);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return ((currentScreenIndex + 1) / screens.length) * 100;
  };

  const currentScreen = screens[currentScreenIndex];
  const isFirstScreen = currentScreenIndex === 0;
  const isLastScreen = currentScreenIndex === screens.length - 1;
  const showWarning = timeRemaining !== null &&
                     currentScreen?.timer_config.showWarning &&
                     timeRemaining <= (currentScreen.timer_config.warningAt || 0) * 60;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-muted/10">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
          <p className="text-muted-foreground">Loading preview...</p>
        </div>
      </div>
    );
  }

  if (!template || screens.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-muted/10">
        <Card>
          <CardContent className="py-12 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">No screens to preview</p>
            <Button onClick={handleExit}>
              Back to Builder
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/10 flex flex-col">
      {/* Preview Mode Banner */}
      <div className="bg-blue-600 text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-white text-blue-600">
              Preview Mode
            </Badge>
            <span className="text-sm">
              This is how participants will experience your workshop
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExit}
            className="text-white hover:text-white hover:bg-blue-700"
          >
            <X className="h-4 w-4 mr-2" />
            Exit Preview
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      {template.settings?.showProgressBar && (
        <div className="bg-background border-b py-4 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Screen {currentScreenIndex + 1} of {screens.length}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(getProgressPercentage())}% Complete
              </span>
            </div>
            <Progress value={getProgressPercentage()} className="h-2" />
          </div>
        </div>
      )}

      {/* Timer Warning */}
      {showWarning && (
        <Alert className="container mx-auto mt-4 border-orange-500 bg-orange-50">
          <Clock className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>{formatTime(timeRemaining!)}</strong> remaining for this screen
          </AlertDescription>
        </Alert>
      )}

      {/* Main Content */}
      <div className="flex-1 container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Screen Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{currentScreen.name}</h1>
                {currentScreen.description && (
                  <p className="text-muted-foreground">{currentScreen.description}</p>
                )}
              </div>

              {timeRemaining !== null && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-4 py-2 bg-background border rounded-lg">
                    <Clock className={`h-5 w-5 ${showWarning ? 'text-orange-600' : 'text-muted-foreground'}`} />
                    <span className={`text-lg font-mono font-semibold ${showWarning ? 'text-orange-600' : ''}`}>
                      {formatTime(timeRemaining)}
                    </span>
                  </div>
                  {timeRemaining === 0 && currentScreen.timer_config.canExtend && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleExtendTime}
                      className="border-blue-500 text-blue-600 hover:bg-blue-50"
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      +{currentScreen.timer_config.extensionDuration || 5} min
                    </Button>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Badge variant="outline">{currentScreen.screen_type}</Badge>
              {currentScreen.content_type && (
                <Badge variant="outline">{currentScreen.content_type}</Badge>
              )}
              {currentScreen.duration_minutes && (
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {currentScreen.duration_minutes} min
                </span>
              )}
              {currentScreen.ai_config?.enabled && (
                <span className="flex items-center gap-1 text-purple-600">
                  <Sparkles className="h-4 w-4" />
                  AI Enabled
                </span>
              )}
            </div>
          </div>

          {/* Screen Content */}
          <Card>
            <CardContent className="pt-6">
              {/* Title */}
              {currentScreen.content.title && (
                <h2 className="text-2xl font-semibold mb-4">
                  {currentScreen.content.title}
                </h2>
              )}

              {/* Description */}
              {currentScreen.content.description && (
                <p className="text-lg text-muted-foreground mb-6">
                  {currentScreen.content.description}
                </p>
              )}

              {/* Main Text */}
              {currentScreen.content.text && (
                <div className="prose prose-sm max-w-none mb-6">
                  <p>{currentScreen.content.text}</p>
                </div>
              )}

              {/* Objectives */}
              {currentScreen.content.objectives && (
                <>
                  <Separator className="my-6" />
                  <div>
                    <h3 className="font-semibold mb-3">Workshop Objectives</h3>
                    <ul className="space-y-2">
                      {currentScreen.content.objectives.map((objective: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}

              {/* Content Type Specific Previews */}
              {currentScreen.content_type === "swot" && (
                <>
                  <Separator className="my-6" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 border-2 rounded-lg bg-green-50 border-green-200">
                      <h4 className="font-semibold text-green-900 mb-2">Strengths</h4>
                      <p className="text-sm text-green-700">Internal positive attributes</p>
                    </div>
                    <div className="p-6 border-2 rounded-lg bg-red-50 border-red-200">
                      <h4 className="font-semibold text-red-900 mb-2">Weaknesses</h4>
                      <p className="text-sm text-red-700">Internal areas for improvement</p>
                    </div>
                    <div className="p-6 border-2 rounded-lg bg-blue-50 border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2">Opportunities</h4>
                      <p className="text-sm text-blue-700">External favorable conditions</p>
                    </div>
                    <div className="p-6 border-2 rounded-lg bg-yellow-50 border-yellow-200">
                      <h4 className="font-semibold text-yellow-900 mb-2">Threats</h4>
                      <p className="text-sm text-yellow-700">External challenges or risks</p>
                    </div>
                  </div>
                </>
              )}

              {currentScreen.content_type === "action-plan" && (
                <>
                  <Separator className="my-6" />
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg bg-muted/50">
                      <div className="grid grid-cols-4 gap-4 text-sm font-medium mb-2">
                        <div>Action</div>
                        <div>Owner</div>
                        <div>Deadline</div>
                        <div>Status</div>
                      </div>
                      <Separator className="my-2" />
                      <div className="text-sm text-muted-foreground text-center py-4">
                        Action items will be added during the workshop
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* AI Facilitation Notice */}
              {currentScreen.ai_config?.enabled && (
                <>
                  <Separator className="my-6" />
                  <div className="p-4 border border-purple-200 rounded-lg bg-purple-50">
                    <div className="flex items-start gap-3">
                      <Sparkles className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-purple-900 mb-1">
                          AI Facilitation Active
                        </h4>
                        <p className="text-sm text-purple-700">
                          AI will provide {currentScreen.ai_config.style || "neutral"} guidance during this screen
                        </p>
                        {currentScreen.ai_config.prompt && (
                          <p className="text-xs text-purple-600 mt-2 italic">
                            "{currentScreen.ai_config.prompt}"
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={isFirstScreen}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="text-sm text-muted-foreground">
              {isLastScreen ? "Last screen" : `Next: ${screens[currentScreenIndex + 1]?.name}`}
            </div>

            <Button
              onClick={handleNext}
              disabled={isLastScreen}
            >
              {isLastScreen ? "Complete" : "Next"}
              {!isLastScreen && <ArrowRight className="h-4 w-4 ml-2" />}
            </Button>
          </div>

          {/* Screen Navigation Map */}
          <div className="mt-8 p-4 border rounded-lg bg-muted/20">
            <h3 className="text-sm font-semibold mb-3">Workshop Flow</h3>
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {screens.map((screen, index) => (
                <div key={screen.id} className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentScreenIndex(index)}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-lg border text-sm whitespace-nowrap
                      transition-colors
                      ${index === currentScreenIndex
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background hover:bg-muted'
                      }
                    `}
                  >
                    <span className="font-medium">{index + 1}</span>
                    <span className="hidden sm:inline">{screen.name}</span>
                  </button>
                  {index < screens.length - 1 && (
                    <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-background border-t py-4 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {template.target_audience}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {template.duration_minutes} min total
              </span>
            </div>
            <div>
              Preview Mode
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
