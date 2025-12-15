'use client';

import { useState, useEffect } from 'react';
import { getWorkshops, type Workshop, type WorkshopStatus } from '@/lib/services/workshop.service';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Users, PlayCircle, CheckCircle2, XCircle, Clock, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

interface WorkshopListProps {
  advisorId: string;
  initialStatus?: WorkshopStatus;
}

export function WorkshopList({ advisorId, initialStatus }: WorkshopListProps) {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<WorkshopStatus | undefined>(initialStatus);

  useEffect(() => {
    loadWorkshops();
  }, [filter]);

  async function loadWorkshops() {
    setLoading(true);
    const result = await getWorkshops(advisorId, filter);
    
    if (result.success) {
      setWorkshops(result.data || []);
    } else {
      toast.error(result.error || 'Failed to load workshops');
    }
    
    setLoading(false);
  }

  const getStatusIcon = (status: WorkshopStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'in_progress':
        return <PlayCircle className="h-4 w-4 text-blue-600" />;
      case 'scheduled':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      case 'draft':
        return <Calendar className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: WorkshopStatus) => {
    const variants: Record<WorkshopStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      completed: 'default',
      in_progress: 'default',
      scheduled: 'secondary',
      cancelled: 'destructive',
      draft: 'outline',
    };

    return <Badge variant={variants[status]}>{status.replace('_', ' ')}</Badge>;
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      vmv: 'Vision, Mission & Values',
      custom: 'Custom Workshop',
    };
    return labels[type] || type;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
        <Skeleton className="h-48" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 flex-wrap">
        <Button
          variant={filter === undefined ? 'default' : 'outline'}
          onClick={() => setFilter(undefined)}
        >
          All
        </Button>
        <Button
          variant={filter === 'draft' ? 'default' : 'outline'}
          onClick={() => setFilter('draft')}
        >
          Draft
        </Button>
        <Button
          variant={filter === 'scheduled' ? 'default' : 'outline'}
          onClick={() => setFilter('scheduled')}
        >
          Scheduled
        </Button>
        <Button
          variant={filter === 'in_progress' ? 'default' : 'outline'}
          onClick={() => setFilter('in_progress')}
        >
          In Progress
        </Button>
        <Button
          variant={filter === 'completed' ? 'default' : 'outline'}
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
      </div>

      {workshops.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No workshops found</h3>
            <p className="text-sm text-muted-foreground mb-4">
              {filter ? `No ${filter} workshops` : 'Get started by creating your first workshop'}
            </p>
            <Button asChild>
              <Link href="/workshops/new">Create Workshop</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {workshops.map((workshop) => (
            <Card key={workshop.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(workshop.status)}
                    <CardTitle className="text-lg">{workshop.title}</CardTitle>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/workshops/${workshop.id}`}>View Details</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/workshops/${workshop.id}/edit`}>Edit</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="line-clamp-2">
                  {workshop.description || 'No description'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium">{getTypeLabel(workshop.type)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Status</span>
                    {getStatusBadge(workshop.status)}
                  </div>
                  {workshop.scheduled_at && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Scheduled</span>
                      <span className="font-medium">
                        {format(new Date(workshop.scheduled_at), 'MMM dd, yyyy')}
                      </span>
                    </div>
                  )}
                  {workshop.started_at && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Started</span>
                      <span className="font-medium">
                        {format(new Date(workshop.started_at), 'MMM dd, yyyy')}
                      </span>
                    </div>
                  )}
                  {workshop.completed_at && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Completed</span>
                      <span className="font-medium">
                        {format(new Date(workshop.completed_at), 'MMM dd, yyyy')}
                      </span>
                    </div>
                  )}
                  
                  <div className="pt-3">
                    <Button asChild className="w-full" variant="outline">
                      <Link href={`/workshops/${workshop.id}`}>
                        {workshop.status === 'draft' ? 'Setup' : 'View Workshop'}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
