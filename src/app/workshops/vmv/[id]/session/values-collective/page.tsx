"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  Users,
  TrendingUp,
  CheckCircle2,
  Clock,
  Vote,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

interface ValueWithStats {
  name: string;
  icon: string;
  selectionCount: number;
  selectionPercentage: number;
  selectedByMe: boolean;
}

const MAX_FINAL_VALUES = 5;

export default function ValuesCollectivePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [allValues, setAllValues] = useState<ValueWithStats[]>([]);
  const [myFinalSelection, setMyFinalSelection] = useState<Set<string>>(new Set());
  const [votingProgress, setVotingProgress] = useState({ current: 10, total: 12, threshold: 0.83 });
  const [timeRemaining, setTimeRemaining] = useState(15 * 60); // 15 minutes

  useEffect(() => {
    // Mock data: All values selected across participants
    setAllValues([
      { name: "Integrity & Honesty", icon: "🤝", selectionCount: 10, selectionPercentage: 83, selectedByMe: false },
      { name: "Family Unity", icon: "👨‍👩‍👧‍👦", selectionCount: 12, selectionPercentage: 100, selectedByMe: false },
      { name: "Innovation", icon: "💡", selectionCount: 8, selectionPercentage: 67, selectedByMe: false },
      { name: "Education", icon: "🎓", selectionCount: 9, selectionPercentage: 75, selectedByMe: false },
      { name: "Service to Society", icon: "🌍", selectionCount: 7, selectionPercentage: 58, selectedByMe: false },
      { name: "Respect", icon: "🙏", selectionCount: 11, selectionPercentage: 92, selectedByMe: false },
      { name: "Independence", icon: "🦅", selectionCount: 6, selectionPercentage: 50, selectedByMe: false },
      { name: "Stewardship", icon: "🌱", selectionCount: 5, selectionPercentage: 42, selectedByMe: false },
      { name: "Excellence", icon: "⭐", selectionCount: 7, selectionPercentage: 58, selectedByMe: false },
      { name: "Compassion", icon: "🤲", selectionCount: 4, selectionPercentage: 33, selectedByMe: false }
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

  const toggleValue = (valueName: string) => {
    const newSelection = new Set(myFinalSelection);
    if (newSelection.has(valueName)) {
      newSelection.delete(valueName);
    } else {
      if (newSelection.size >= MAX_FINAL_VALUES) {
        toast.error(`You can select maximum ${MAX_FINAL_VALUES} values for the final list`);
        return;
      }
      newSelection.add(valueName);
    }
    setMyFinalSelection(newSelection);
  };

  const handleSubmitVote = () => {
    if (myFinalSelection.size === 0) {
      toast.error("Please select at least one value");
      return;
    }

    if (myFinalSelection.size > MAX_FINAL_VALUES) {
      toast.error(`Please select maximum ${MAX_FINAL_VALUES} values`);
      return;
    }

    toast.success("Your vote has been submitted!");

    // Simulate voting progress update
    setVotingProgress({
      ...votingProgress,
      current: votingProgress.current + 1
    });
  };

  const handleContinue = () => {
    if (myFinalSelection.size === 0) {
      toast.error("Please vote before continuing");
      return;
    }

    toast.success("Moving to value matrix definition");
    router.push(`/workshops/vmv/${id}/session/values-matrix`);
  };

  const approvalPercentage = (votingProgress.current / votingProgress.total) * 100;
  const thresholdMet = approvalPercentage >= (votingProgress.threshold * 100);

  return (
    <div className="min-h-screen bg-page-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-card px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Vote className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-semibold">Values, Mission & Vision Workshop</h1>
              <p className="text-sm text-muted-foreground">Stage 2: Collective Values Ranking</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="gap-2">
              <Users className="h-3 w-3" />
              12 participants
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
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Collective Values Discovery
              </CardTitle>
              <CardDescription>
                Review all values selected by family members and vote for the top {MAX_FINAL_VALUES} that should represent your family
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertDescription>
                  <strong>Values sorted by frequency of selection across all participants.</strong> Review and select
                  up to {MAX_FINAL_VALUES} values that you believe should be in the final family values list.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Voting Progress */}
          <Card className={thresholdMet ? "border-green-200 bg-green-50" : ""}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Voting Progress</CardTitle>
                <Badge variant={thresholdMet ? "default" : "outline"}>
                  {votingProgress.current}/{votingProgress.total} votes
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Current approval</span>
                  <span className="font-semibold">
                    {votingProgress.current}/{votingProgress.total} approve ({Math.round(approvalPercentage)}%)
                  </span>
                </div>
                <Progress value={approvalPercentage} className="h-2" />
              </div>
              {thresholdMet ? (
                <Alert className="bg-green-100 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-900">
                    <strong>Threshold met!</strong> {approvalPercentage}% approval (required: {votingProgress.threshold * 100}%)
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="text-xs text-muted-foreground">
                  Waiting for {votingProgress.total - votingProgress.current} more participants to vote...
                </div>
              )}
            </CardContent>
          </Card>

          {/* Values Ranking Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Values Ranked by Selection Frequency</CardTitle>
              <CardDescription>
                Click on values to add them to your final selection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {allValues
                  .sort((a, b) => b.selectionPercentage - a.selectionPercentage)
                  .map((value) => {
                    const isSelected = myFinalSelection.has(value.name);

                    return (
                      <button
                        key={value.name}
                        onClick={() => toggleValue(value.name)}
                        className={`w-full p-4 rounded-lg border-2 transition-all ${
                          isSelected
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50 hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          {/* Icon & Name */}
                          <div className="text-3xl">{value.icon}</div>
                          <div className="flex-1 text-left">
                            <div className="font-semibold">{value.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Selected by {value.selectionCount} participants
                            </div>
                          </div>

                          {/* Bar Chart */}
                          <div className="w-48">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary transition-all"
                                  style={{ width: `${value.selectionPercentage}%` }}
                                />
                              </div>
                              <span className="text-sm font-medium w-12 text-right">
                                {value.selectionPercentage}%
                              </span>
                            </div>
                          </div>

                          {/* Selection Indicator */}
                          {isSelected && (
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          )}
                        </div>
                      </button>
                    );
                  })}
              </div>
            </CardContent>
          </Card>

          {/* Your Final Selection */}
          {myFinalSelection.size > 0 && (
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg">
                  Your Selected Values ({myFinalSelection.size}/{MAX_FINAL_VALUES})
                </CardTitle>
                <CardDescription>
                  These are the values you believe should represent the family
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {Array.from(myFinalSelection).map((valueName, index) => {
                    const value = allValues.find(v => v.name === valueName);
                    if (!value) return null;

                    return (
                      <div
                        key={valueName}
                        className="flex items-center gap-3 p-3 rounded-lg bg-card border"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div className="text-2xl">{value.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium">{value.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {value.selectionPercentage}% selected
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex gap-2">
                  <Button
                    onClick={handleSubmitVote}
                    variant="outline"
                    className="flex-1"
                  >
                    Submit Vote
                  </Button>
                  <Button
                    onClick={handleContinue}
                    className="flex-1"
                    disabled={!thresholdMet}
                  >
                    {thresholdMet ? 'Continue to Matrix' : 'Waiting for votes...'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
