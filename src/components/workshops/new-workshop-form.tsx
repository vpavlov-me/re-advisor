'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createWorkshopFromTemplate } from '@/lib/services/';
import type { WorkshopConfig, WorkshopType } from '@/types/workshop';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Calendar, Users, Lightbulb, Target, Heart, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewWorkshopFormProps {
  advisorId: string;
  familyId?: string;
}

interface WorkshopTemplate {
  id: WorkshopType;
  name: string;
  description: string;
  icon: React.ReactNode;
  config: WorkshopConfig;
}

const WORKSHOP_TEMPLATES: WorkshopTemplate[] = [
  {
    id: 'vmv',
    name: 'Vision, Mission & Values',
    description: 'Help families articulate their long-term vision, core mission, and fundamental values',
    icon: <Lightbulb className="h-6 w-6" />,
    config: {
      type: 'vmv',
      title: 'Family Vision, Mission & Values Workshop',
      description: 'A structured workshop to define the family\'s vision, mission, and core values',
      stages: [
        {
          title: 'Vision Statement',
          description: 'Define where the family wants to be in the future',
          duration_minutes: 45,
          order: 1,
          metadata: {
            prompts: [
              'What does success look like for our family in 10-20 years?',
              'What legacy do we want to leave?',
              'What impact do we want to have on the world?',
            ],
          },
        },
        {
          title: 'Mission Statement',
          description: 'Articulate the family\'s core purpose and how they will achieve their vision',
          duration_minutes: 45,
          order: 2,
          metadata: {
            prompts: [
              'What is our family\'s core purpose?',
              'How do we work together to achieve our vision?',
              'What makes our family unique?',
            ],
          },
        },
        {
          title: 'Core Values',
          description: 'Identify and prioritize the fundamental principles that guide the family',
          duration_minutes: 60,
          order: 3,
          metadata: {
            prompts: [
              'What principles are most important to us?',
              'How do we make decisions as a family?',
              'What behaviors do we encourage and discourage?',
            ],
          },
        },
      ],
    },
  },
  {
    id: 'custom',
    name: 'Custom Workshop',
    description: 'Create a custom workshop tailored to your specific needs',
    icon: <Target className="h-6 w-6" />,
    config: {
      type: 'custom',
      title: 'Custom Workshop',
      description: 'A custom workshop designed for specific family needs',
      stages: [
        {
          title: 'Stage 1',
          description: 'First stage of the workshop',
          duration_minutes: 60,
          order: 1,
        },
      ],
    },
  },
];

export function NewWorkshopForm({ advisorId, familyId }: NewWorkshopFormProps) {
  const router = useRouter();
  const [step, setStep] = useState<'template' | 'details'>('template');
  const [selectedTemplate, setSelectedTemplate] = useState<WorkshopTemplate | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFamilyId, setSelectedFamilyId] = useState(familyId || '');
  const [scheduledDate, setScheduledDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTemplateSelect = (template: WorkshopTemplate) => {
    setSelectedTemplate(template);
    setTitle(template.config.title);
    setDescription(template.config.description || '');
    setStep('details');
  };

  const handleBack = () => {
    setStep('template');
    setSelectedTemplate(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedTemplate) {
      toast.error('Please select a workshop template');
      return;
    }

    if (!selectedFamilyId) {
      toast.error('Please select a family');
      return;
    }

    setLoading(true);

    try {
      const config: WorkshopConfig = {
        ...selectedTemplate.config,
        title,
        description,
      };

      const result = await createWorkshopFromTemplate(
        advisorId,
        selectedFamilyId,
        config
      );

      if (result.success && result.data) {
        toast.success('Workshop created successfully');
        router.push(`/workshops/${result.data.id}`);
      } else {
        toast.error(result.error || 'Failed to create workshop');
      }
    } catch (error) {
      console.error('Failed to create workshop:', error);
      toast.error('Failed to create workshop');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'template') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Choose a Workshop Template</h2>
          <p className="text-muted-foreground">
            Select a pre-built template or create a custom workshop from scratch
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {WORKSHOP_TEMPLATES.map((template) => (
            <Card
              key={template.id}
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                selectedTemplate?.id === template.id && "ring-2 ring-primary"
              )}
              onClick={() => handleTemplateSelect(template)}
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg text-primary">
                    {template.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="mb-2">{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground">
                  {template.config.stages.length} stage{template.config.stages.length !== 1 ? 's' : ''}
                  {' • '}
                  {template.config.stages.reduce((acc, s) => acc + (s.duration_minutes || 0), 0)} minutes
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">Workshop Details</h2>
          <p className="text-muted-foreground">
            Customize your {selectedTemplate?.name.toLowerCase()}
          </p>
        </div>
        <Button variant="outline" onClick={handleBack}>
          Change Template
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Workshop Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Johnson Family Vision Workshop"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the workshop objectives and expected outcomes..."
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="family">Family Client *</Label>
              <Input
                id="family"
                value={selectedFamilyId}
                onChange={(e) => setSelectedFamilyId(e.target.value)}
                placeholder="Family ID"
                required
                disabled={!!familyId}
              />
              <p className="text-sm text-muted-foreground">
                The family this workshop is designed for
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduled">Scheduled Date (Optional)</Label>
              <Input
                id="scheduled"
                type="datetime-local"
                value={scheduledDate}
                onChange={(e) => setScheduledDate(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {selectedTemplate && (
          <Card>
            <CardHeader>
              <CardTitle>Workshop Stages</CardTitle>
              <CardDescription>
                This workshop will include the following stages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedTemplate.config.stages.map((stage, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                      {stage.order}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{stage.title}</h4>
                      <p className="text-sm text-muted-foreground">{stage.description}</p>
                      {stage.duration_minutes && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Duration: {stage.duration_minutes} minutes
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={handleBack} disabled={loading}>
            Back
          </Button>
          <Button type="submit" disabled={loading} className="flex-1">
            {loading ? 'Creating...' : 'Create Workshop'}
            {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </form>
    </div>
  );
}
