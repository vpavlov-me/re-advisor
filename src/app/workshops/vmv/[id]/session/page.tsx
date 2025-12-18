"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  Target,
  Users,
  CheckCircle2,
  PlayCircle,
  Mic,
  Video,
  Volume2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function WorkshopStartPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [micChecked, setMicChecked] = useState(false);
  const [cameraChecked, setCameraChecked] = useState(false);
  const [audioChecked, setAudioChecked] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  const handleStartWorkshop = async () => {
    setIsStarting(true);

    try {
      // TODO: Update workshop status to 'in_progress'
      await new Promise(resolve => setTimeout(resolve, 1000));

      router.push(`/workshops/vmv/${id}/session/values-select`);
    } catch (error) {
      console.error("Error starting workshop:", error);
    } finally {
      setIsStarting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 py-12 px-4">
      <div className="container max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-red-500 mb-6">
            <Heart className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-3">
            Workshop: Values, Mission & Vision
          </h1>
          <p className="text-xl text-muted-foreground">
            Готовы начать?
          </p>
        </div>

        <div className="space-y-8">
          {/* Workshop Info */}
          <Card className="border-2">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl">Воркшоп начался!</CardTitle>
              <CardDescription className="text-base">
                Добро пожаловать в интерактивную сессию по определению ценностей, миссии и видения вашей семьи
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Why This Matters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Why We're Gathering
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm max-w-none text-muted-foreground">
                <p>
                  <strong>Workshop Purpose:</strong> Family values are not just words—they're the principles that guide our family's decisions through generations. This workshop helps us:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Move past aspirational thinking to what truly guides our actions today</li>
                  <li>Get everyone aligned on a shared vocabulary and understanding</li>
                  <li>Create a foundation for decision-making and conflict resolution</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* What We'll Do */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                What We'll Do
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Collecting Family Values</div>
                    <p className="text-sm text-muted-foreground">
                      Each person selects 3-5 values from a curated list (or adds their own).
                      Focus on behaviors, not buzzwords. (20 minutes)
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Formulating Family Model</div>
                    <p className="text-sm text-muted-foreground">
                      We consolidate and discuss. Not all values will make the final cut—the goal is consensus on 3-5 core values. (20 minutes)
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Articulating the Vision</div>
                    <p className="text-sm text-muted-foreground">
                      Create a 20-year vision: What does "success" look like for the family business, unity, governance, and next generation? (30 minutes)
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 font-bold">
                    4
                  </div>
                  <div>
                    <div className="font-semibold mb-1">Establishing a Clear Mission</div>
                    <p className="text-sm text-muted-foreground">
                      Define why the family business exists and what it aims to achieve. A clear mission becomes the "North Star". (20 minutes)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Workshop Guidelines */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Workshop Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Respect the Speaker</div>
                    <p className="text-xs text-muted-foreground">Let everyone share their perspective without interruption</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Speak from Experience</div>
                    <p className="text-xs text-muted-foreground">Use "I" statements, not "we should" or generalizations</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Listen to Understand</div>
                    <p className="text-xs text-muted-foreground">Not to respond or debate—just to grasp others' viewpoints</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Stay on Time</div>
                    <p className="text-xs text-muted-foreground">We'll keep an eye on our agenda to make the best use of everyone's time</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Come with Openness</div>
                    <p className="text-xs text-muted-foreground">Be willing to hear ideas that differ from yours</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">Keep it Authentic</div>
                    <p className="text-xs text-muted-foreground">Focus on values we live by today—not ones we wish we had</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Equipment Check (for online format) */}
          <Card>
            <CardHeader>
              <CardTitle>Technical Requirements</CardTitle>
              <CardDescription>
                Please verify your equipment is working properly
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  For the best workshop experience, ensure you have a stable internet connection and working audio/video devices
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <button
                  onClick={() => setMicChecked(!micChecked)}
                  className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-4 ${
                    micChecked ? 'border-green-500 bg-green-50' : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Mic className={`h-5 w-5 ${micChecked ? 'text-green-600' : 'text-muted-foreground'}`} />
                  <div className="flex-1 text-left">
                    <div className="font-medium">Microphone</div>
                    <div className="text-sm text-muted-foreground">Check if your microphone is working</div>
                  </div>
                  {micChecked && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                </button>

                <button
                  onClick={() => setCameraChecked(!cameraChecked)}
                  className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-4 ${
                    cameraChecked ? 'border-green-500 bg-green-50' : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Video className={`h-5 w-5 ${cameraChecked ? 'text-green-600' : 'text-muted-foreground'}`} />
                  <div className="flex-1 text-left">
                    <div className="font-medium">Camera</div>
                    <div className="text-sm text-muted-foreground">Check if your camera is working</div>
                  </div>
                  {cameraChecked && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                </button>

                <button
                  onClick={() => setAudioChecked(!audioChecked)}
                  className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-4 ${
                    audioChecked ? 'border-green-500 bg-green-50' : 'border-border hover:border-primary/50'
                  }`}
                >
                  <Volume2 className={`h-5 w-5 ${audioChecked ? 'text-green-600' : 'text-muted-foreground'}`} />
                  <div className="flex-1 text-left">
                    <div className="font-medium">Audio Output</div>
                    <div className="text-sm text-muted-foreground">Check if you can hear sound</div>
                  </div>
                  {audioChecked && <CheckCircle2 className="h-5 w-5 text-green-600" />}
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Start Button */}
          <div className="flex justify-center pt-6">
            <Button
              size="lg"
              onClick={handleStartWorkshop}
              disabled={isStarting}
              className="px-12 py-6 text-lg"
            >
              {isStarting ? (
                "Starting..."
              ) : (
                <>
                  <PlayCircle className="h-6 w-6 mr-3" />
                  Начать воркшоп
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
