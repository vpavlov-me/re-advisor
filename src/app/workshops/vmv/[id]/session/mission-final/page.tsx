"use client";

import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Target,
  Sparkles,
  Clock,
  Vote,
  ThumbsUp,
  ThumbsDown,
  Edit3,
  CheckCircle2,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";

interface Comment {
  id: string;
  author: string;
  message: string;
  created_at: string;
}

export default function MissionFinalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [aiGeneratedMission, setAiGeneratedMission] = useState("");
  const [editedMission, setEditedMission] = useState("");
  const [shortMission, setShortMission] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [myVote, setMyVote] = useState<'approve' | 'revise' | null>(null);
  const [votes, setVotes] = useState({ approve: 0, revise: 0 });
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(18 * 60);

  useEffect(() => {
    // Mock: AI synthesized mission from all individual drafts
    const synthesized = `We exist to create long-term prosperity and unity across generations for members of our family, our employees, and the communities we serve, through strategic leadership, collaborative governance, and responsible stewardship, guided by our values of integrity, family unity, innovation, and education.`;

    setAiGeneratedMission(synthesized);
    setEditedMission(synthesized);

    // Mock votes
    setVotes({ approve: 10, revise: 2 });

    // Mock comments
    setComments([
      {
        id: '1',
        author: 'Maria',
        message: 'Love "generational prosperity" - perfect!',
        created_at: new Date().toISOString()
      },
      {
        id: '2',
        author: 'John',
        message: 'Should we add "innovation"?',
        created_at: new Date().toISOString()
      },
      {
        id: '3',
        author: 'Elena',
        message: 'Short version is perfect!',
        created_at: new Date().toISOString()
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

  const handleVote = (voteType: 'approve' | 'revise') => {
    if (myVote === voteType) {
      // Unvote
      setMyVote(null);
      setVotes(prev => ({ ...prev, [voteType]: prev[voteType] - 1 }));
    } else {
      // Vote or change vote
      if (myVote) {
        setVotes(prev => ({ ...prev, [myVote]: prev[myVote] - 1 }));
      }
      setMyVote(voteType);
      setVotes(prev => ({ ...prev, [voteType]: prev[voteType] + 1 }));
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      message: newComment,
      created_at: new Date().toISOString()
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  const generateShortVersion = () => {
    // Simple truncation to ~20 words
    const words = editedMission.split(' ');
    const short = words.slice(0, 20).join(' ') + (words.length > 20 ? '...' : '');
    setShortMission(short);
    toast.success("Short version generated");
  };

  const handleContinue = () => {
    const totalVotes = votes.approve + votes.revise;
    const approvalPercentage = (votes.approve / totalVotes) * 100;

    if (approvalPercentage < 70) {
      toast.error("Need at least 70% approval to continue");
      return;
    }

    toast.success("Mission statement finalized!");
    router.push(`/workshops/vmv/${id}/session/vision`);
  };

  const totalVotes = votes.approve + votes.revise;
  const approvalPercentage = totalVotes > 0 ? (votes.approve / totalVotes) * 100 : 0;
  const thresholdMet = approvalPercentage >= 83;

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
              <p className="text-sm text-muted-foreground">Stage 4: Finalize Mission Statement</p>
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
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                AI Consultation: Integration Strategy Review
              </CardTitle>
              <CardDescription>
                Get expert recommendations on mission integration and rollout communication
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertDescription>
                  <strong>Collaborative Mission Finalization:</strong> Review the AI-synthesized mission statement,
                  suggest edits, and vote to approve or request revisions.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Voting Progress */}
          <Card className={thresholdMet ? "border-green-200 bg-green-50" : ""}>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Vote className="h-5 w-5" />
                Mission Vote
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm font-medium mb-2">
                "Approve this mission statement?"
              </div>

              <div className="flex gap-3">
                <Button
                  variant={myVote === 'approve' ? 'default' : 'outline'}
                  onClick={() => handleVote('approve')}
                  className="flex-1"
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Approve ({votes.approve})
                </Button>
                <Button
                  variant={myVote === 'revise' ? 'default' : 'outline'}
                  onClick={() => handleVote('revise')}
                  className="flex-1"
                >
                  <ThumbsDown className="h-4 w-4 mr-2" />
                  Revise ({votes.revise})
                </Button>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">
                    Current: {votes.approve}/{totalVotes} approve ({Math.round(approvalPercentage)}%)
                  </span>
                  {thresholdMet && (
                    <Badge className="bg-green-600">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Threshold met!
                    </Badge>
                  )}
                </div>
                <Progress value={approvalPercentage} className="h-2" />
              </div>

              {thresholdMet ? (
                <Alert className="bg-green-100 border-green-200">
                  <AlertDescription className="text-green-900">
                    <strong>2:00 remaining | Current: 10/12 approve (83%)</strong>
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="text-xs text-muted-foreground">
                  Need {Math.ceil(totalVotes * 0.83)} votes to reach 83% threshold
                </div>
              )}
            </CardContent>
          </Card>

          {/* AI Generated Mission */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Your Mission Statement</CardTitle>
                  <CardDescription>
                    AI-synthesized from all individual drafts
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit3 className="h-4 w-4 mr-2" />
                  {isEditing ? 'Preview' : 'Edit'}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {isEditing ? (
                <Textarea
                  value={editedMission}
                  onChange={(e) => setEditedMission(e.target.value)}
                  className="min-h-[150px] text-base"
                />
              ) : (
                <div className="p-6 rounded-lg bg-gradient-to-br from-orange-50 to-white border-2 border-primary/20">
                  <p className="text-lg leading-relaxed">
                    "{editedMission}"
                  </p>
                </div>
              )}

              {isEditing && (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setEditedMission(aiGeneratedMission);
                      toast.success("Reset to AI version");
                    }}
                  >
                    Reset to AI Version
                  </Button>
                  <Button
                    onClick={() => {
                      setIsEditing(false);
                      toast.success("Changes saved");
                    }}
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Short Version */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Short Version (≤20 words)</CardTitle>
                  <CardDescription>
                    Concise version for quick reference
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generateShortVersion}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Creating generational prosperity through integrity, unity, and service."
                value={shortMission}
                onChange={(e) => setShortMission(e.target.value)}
                className="min-h-[80px] text-base"
              />
              <div className="text-xs text-muted-foreground mt-2">
                {shortMission.split(' ').length} words
              </div>
            </CardContent>
          </Card>

          {/* Comments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageSquare className="h-5 w-5" />
                Comments & Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ScrollArea className="h-48">
                <div className="space-y-3">
                  {comments.map((comment) => (
                    <div key={comment.id} className="p-3 rounded-lg bg-muted">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm">{comment.author}:</span>
                      </div>
                      <p className="text-sm">{comment.message}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <Separator />

              <div className="flex gap-2">
                <Input
                  placeholder="Add your feedback..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                />
                <Button onClick={handleAddComment}>
                  Send
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Final Display */}
          <Card className="border-primary/20 bg-gradient-to-br from-orange-50 to-purple-50">
            <CardHeader>
              <CardTitle>Final Mission Statement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 rounded-lg bg-white border-2">
                <p className="text-xl leading-relaxed font-medium text-center mb-6">
                  "{editedMission}"
                </p>
                <Separator className="my-6" />
                <div>
                  <p className="text-sm text-muted-foreground mb-2 text-center">Short Version (≤20 words)</p>
                  <p className="text-lg text-center text-primary font-semibold">
                    "{shortMission || 'Creating generational prosperity through integrity, unity, and service.'}"
                  </p>
                </div>
              </div>

              <Button
                onClick={handleContinue}
                disabled={!thresholdMet}
                size="lg"
                className="w-full"
              >
                {thresholdMet ? 'Continue to Vision Canvas' : 'Waiting for approval...'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
