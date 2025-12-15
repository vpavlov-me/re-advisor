'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  getWorkshopState, 
  startWorkshop, 
  moveToNextStage,
  completeWorkshop,
  updateWorkshopStage,
  type WorkshopState,
  type WorkshopStage,
} from '@/lib/services/workshop.service';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  PlayCircle, 
  CheckCircle2, 
  ArrowRight, 
  Clock,
  Users,
  Calendar,
  FileText,
  ChevronRight,
} from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface WorkshopViewProps {
  workshopId: string;
}

export function WorkshopView({ workshopId }: WorkshopViewProps) {
  const router = useRouter();
  const [state, setState] = useState<WorkshopState | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [stageData, setStageData] = useState<Record<string, unknown>>({});

  useEffect(() => {
    loadWorkshopState();
  }, [workshopId]);

  async function loadWorkshopState() {
    setLoading(true);
    const result = await getWorkshopState(workshopId);
    
    if (result.success && result.data) {
      setState(result.data);
      if (result.data.currentStage) {
        setStageData(result.data.currentStage.data);
      }
    } else {
      toast.error(result.error || 'Failed to load workshop');
    }
    
    setLoading(false);
  }

  async function handleStartWorkshop() {
    setActionLoading(true);
    const result = await startWorkshop(workshopId);
    
    if (result.success) {
      toast.success('Workshop started');
      await loadWorkshopState();
    } else {
      toast.error(result.error || 'Failed to start workshop');
    }
    
    setActionLoading(false);
  }

  async function handleNextStage() {
    if (!state?.currentStage) return;

    setActionLoading(true);

    // Save current stage data
    await updateWorkshopStage(state.currentStage.id, { data: stageData });

    const result = await moveToNextStage(workshopId);
    
    if (result.success) {
      const nextStage = state.stages.find(
        s => s.stage_number === state.currentStage!.stage_number + 1
      );
      
      if (nextStage) {
        toast.success(`Moving to: ${nextStage.title}`);
      } else {
        toast.success('Workshop completed!');
      }
      
      await loadWorkshopState();
      setStageData({});
    } else {
      toast.error(result.error || 'Failed to move to next stage');
    }
    
    setActionLoading(false);
  }

  async function handleCompleteWorkshop() {
    setActionLoading(true);
    const result = await completeWorkshop(workshopId);
    
    if (result.success) {
      toast.success('Workshop completed');
      await loadWorkshopState();
    } else {
      toast.error(result.error || 'Failed to complete workshop');
    }
    
    setActionLoading(false);
  }

  const handleStageDataChange = (field: string, value: string) => {
    setStageData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-32" />
        <Skeleton className="h-64" />
        <Skeleton className="h-48" />
      </div>
    );
  }

  if (!state) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">Workshop not found</p>
        </CardContent>
      </Card>
    );
  }

  const { workshop, stages, currentStage } = state;
  const completedStages = stages.filter(s => s.status === 'completed').length;
  const progress = (completedStages / stages.length) * 100;

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <CardTitle className="text-2xl">{workshop.title}</CardTitle>
              {workshop.description && (
                <CardDescription className="text-base">
                  {workshop.description}
                </CardDescription>
              )}
            </div>
            <Badge variant={workshop.status === 'completed' ? 'default' : 'secondary'}>
              {workshop.status.replace('_', ' ')}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium">{completedStages} / {stages.length} stages</span>
              </div>
              <Progress value={progress} />
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              {workshop.scheduled_at && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {format(new Date(workshop.scheduled_at), 'MMM dd, yyyy')}
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {stages.reduce((acc, s) => acc + (s.duration_minutes || 0), 0)} min total
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {stages.length} stages
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-4">
              {workshop.status === 'draft' && (
                <Button onClick={handleStartWorkshop} disabled={actionLoading}>
                  <PlayCircle className="mr-2 h-4 w-4" />
                  Start Workshop
                </Button>
              )}
              {workshop.status === 'in_progress' && currentStage && (
                <Button onClick={handleNextStage} disabled={actionLoading}>
                  {currentStage.stage_number === stages.length ? (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Complete Workshop
                    </>
                  ) : (
                    <>
                      Next Stage
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Stage */}
      {workshop.status === 'in_progress' && currentStage && (
        <Card className="border-primary">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Badge>Current Stage</Badge>
              <CardTitle>
                {currentStage.stage_number}. {currentStage.title}
              </CardTitle>
            </div>
            {currentStage.description && (
              <CardDescription>{currentStage.description}</CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {currentStage.duration_minutes && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Estimated duration: {currentStage.duration_minutes} minutes</span>
              </div>
            )}

            {Array.isArray(currentStage.metadata?.prompts) && currentStage.metadata.prompts.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Discussion Prompts</Label>
                <ul className="space-y-2">
                  {(currentStage.metadata.prompts as string[]).map((prompt, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="h-4 w-4 mt-0.5 flex-shrink-0" />
                      <span>{prompt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-4 pt-4">
              <Label htmlFor="notes">Notes & Insights</Label>
              <Textarea
                id="notes"
                value={(stageData.notes as string) || ''}
                onChange={(e) => handleStageDataChange('notes', e.target.value)}
                placeholder="Capture key insights, decisions, and action items..."
                rows={6}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* All Stages */}
      <Card>
        <CardHeader>
          <CardTitle>Workshop Stages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stages.map((stage) => (
              <div
                key={stage.id}
                className={cn(
                  "flex items-start gap-4 p-4 border rounded-lg transition-colors",
                  stage.id === currentStage?.id && "border-primary bg-primary/5",
                  stage.status === 'completed' && "bg-muted/50"
                )}
              >
                <div className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold flex-shrink-0",
                  stage.status === 'completed' && "bg-green-100 text-green-700",
                  stage.status === 'in_progress' && "bg-primary text-primary-foreground",
                  stage.status === 'not_started' && "bg-muted text-muted-foreground"
                )}>
                  {stage.status === 'completed' ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    stage.stage_number
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-semibold">{stage.title}</h4>
                    <Badge variant={
                      stage.status === 'completed' ? 'default' :
                      stage.status === 'in_progress' ? 'secondary' :
                      'outline'
                    } className="text-xs">
                      {stage.status.replace('_', ' ')}
                    </Badge>
                  </div>
                  {stage.description && (
                    <p className="text-sm text-muted-foreground">{stage.description}</p>
                  )}
                  {stage.duration_minutes && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {stage.duration_minutes} minutes
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
