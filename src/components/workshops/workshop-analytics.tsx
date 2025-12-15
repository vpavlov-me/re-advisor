'use client';

import { useState, useEffect } from 'react';
import { getWorkshops, type Workshop, type WorkshopStatus } from '@/lib/services/';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import {
  BarChart3,
  TrendingUp,
  Users,
  Clock,
  CheckCircle2,
  PlayCircle,
  Calendar,
  Target,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface WorkshopAnalyticsProps {
  advisorId: string;
}

interface AnalyticsData {
  total: number;
  draft: number;
  scheduled: number;
  inProgress: number;
  completed: number;
  cancelled: number;
  totalDuration: number;
  averageDuration: number;
  completionRate: number;
}

export function WorkshopAnalytics({ advisorId }: WorkshopAnalyticsProps) {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);

  useEffect(() => {
    loadAnalytics();
  }, [advisorId]);

  async function loadAnalytics() {
    setLoading(true);
    
    const result = await getWorkshops(advisorId);
    
    if (result.success && result.data) {
      const ws = result.data;
      setWorkshops(ws);
      
      const data: AnalyticsData = {
        total: ws.length,
        draft: ws.filter(w => w.status === 'draft').length,
        scheduled: ws.filter(w => w.status === 'scheduled').length,
        inProgress: ws.filter(w => w.status === 'in_progress').length,
        completed: ws.filter(w => w.status === 'completed').length,
        cancelled: ws.filter(w => w.status === 'cancelled').length,
        totalDuration: 0,
        averageDuration: 0,
        completionRate: 0,
      };
      
      // Calculate durations for completed workshops
      const completedWorkshops = ws.filter(w => 
        w.status === 'completed' && w.started_at && w.completed_at
      );
      
      if (completedWorkshops.length > 0) {
        data.totalDuration = completedWorkshops.reduce((sum, w) => {
          const start = new Date(w.started_at!).getTime();
          const end = new Date(w.completed_at!).getTime();
          const durationMinutes = (end - start) / 1000 / 60;
          return sum + durationMinutes;
        }, 0);
        
        data.averageDuration = Math.round(data.totalDuration / completedWorkshops.length);
      }
      
      // Calculate completion rate
      const startedWorkshops = ws.filter(w => 
        w.status === 'completed' || w.status === 'in_progress'
      ).length;
      
      if (startedWorkshops > 0) {
        data.completionRate = Math.round((data.completed / startedWorkshops) * 100);
      }
      
      setAnalytics(data);
    }
    
    setLoading(false);
  }

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  const stats = [
    {
      title: 'Total Workshops',
      value: analytics.total,
      icon: BarChart3,
      description: 'All time',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Completed',
      value: analytics.completed,
      icon: CheckCircle2,
      description: `${analytics.completionRate}% completion rate`,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'In Progress',
      value: analytics.inProgress,
      icon: PlayCircle,
      description: 'Active workshops',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      title: 'Scheduled',
      value: analytics.scheduled,
      icon: Calendar,
      description: 'Upcoming',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  const metrics = [
    {
      title: 'Avg. Duration',
      value: `${analytics.averageDuration} min`,
      icon: Clock,
      description: 'Per workshop',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      title: 'Draft Workshops',
      value: analytics.draft,
      icon: Target,
      description: 'Not yet scheduled',
      color: 'text-gray-600',
      bgColor: 'bg-gray-100',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Primary Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </div>
                <div className={cn(
                  "h-12 w-12 rounded-lg flex items-center justify-center",
                  stat.bgColor
                )}>
                  <stat.icon className={cn("h-6 w-6", stat.color)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Secondary Metrics */}
      <div className="grid gap-4 md:grid-cols-2">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {metric.title}
                  </p>
                  <p className="text-2xl font-bold mt-2">{metric.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {metric.description}
                  </p>
                </div>
                <div className={cn(
                  "h-10 w-10 rounded-lg flex items-center justify-center",
                  metric.bgColor
                )}>
                  <metric.icon className={cn("h-5 w-5", metric.color)} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Workshop Status Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Workshop Status Distribution</CardTitle>
          <CardDescription>
            Overview of workshop lifecycle stages
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Draft</Badge>
                  <span className="text-sm text-muted-foreground">
                    {analytics.draft} workshops
                  </span>
                </div>
                <span className="text-sm font-medium">
                  {analytics.total > 0 
                    ? Math.round((analytics.draft / analytics.total) * 100)
                    : 0}%
                </span>
              </div>
              <Progress 
                value={analytics.total > 0 ? (analytics.draft / analytics.total) * 100 : 0} 
                className="h-2"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    Scheduled
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {analytics.scheduled} workshops
                  </span>
                </div>
                <span className="text-sm font-medium">
                  {analytics.total > 0 
                    ? Math.round((analytics.scheduled / analytics.total) * 100)
                    : 0}%
                </span>
              </div>
              <Progress 
                value={analytics.total > 0 ? (analytics.scheduled / analytics.total) * 100 : 0} 
                className="h-2"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                    In Progress
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {analytics.inProgress} workshops
                  </span>
                </div>
                <span className="text-sm font-medium">
                  {analytics.total > 0 
                    ? Math.round((analytics.inProgress / analytics.total) * 100)
                    : 0}%
                </span>
              </div>
              <Progress 
                value={analytics.total > 0 ? (analytics.inProgress / analytics.total) * 100 : 0} 
                className="h-2"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    Completed
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {analytics.completed} workshops
                  </span>
                </div>
                <span className="text-sm font-medium">
                  {analytics.total > 0 
                    ? Math.round((analytics.completed / analytics.total) * 100)
                    : 0}%
                </span>
              </div>
              <Progress 
                value={analytics.total > 0 ? (analytics.completed / analytics.total) * 100 : 0} 
                className="h-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights */}
      {analytics.total > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.completed > 0 && (
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">
                      {analytics.completed} workshops completed successfully
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Average duration: {analytics.averageDuration} minutes
                    </p>
                  </div>
                </div>
              )}
              
              {analytics.inProgress > 0 && (
                <div className="flex items-start gap-3">
                  <PlayCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">
                      {analytics.inProgress} active workshop{analytics.inProgress !== 1 ? 's' : ''}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Currently in progress
                    </p>
                  </div>
                </div>
              )}
              
              {analytics.draft > 0 && (
                <div className="flex items-start gap-3">
                  <Target className="h-5 w-5 text-gray-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium">
                      {analytics.draft} draft workshop{analytics.draft !== 1 ? 's' : ''}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Ready to be scheduled
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
