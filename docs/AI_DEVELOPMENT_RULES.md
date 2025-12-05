# AI Development Rules for RE-Advisor

This document contains comprehensive guidelines for AI coding assistants (LLMs) working on the RE-Advisor project. These rules ensure code consistency, maintainability, and adherence to architectural patterns.

## Table of Contents

1. [Core Principles](#core-principles)
2. [UI Development](#ui-development)
3. [Backend Abstraction](#backend-abstraction)
4. [Code Examples](#code-examples)
5. [Anti-Patterns](#anti-patterns)

## Core Principles

### Architecture First
RE-Advisor follows a strict layered architecture:

```
┌─────────────────────────────────────────┐
│           UI Components Layer           │
│         (shadcn/ui ONLY)                │
├─────────────────────────────────────────┤
│         Application Logic Layer         │
│        (React Components/Hooks)         │
├─────────────────────────────────────────┤
│        Service Abstraction Layer        │
│      (MANDATORY - src/lib/services/)    │
├─────────────────────────────────────────┤
│          Backend/Database Layer         │
│        (Supabase, Stripe, etc.)         │
└─────────────────────────────────────────┘
```

**Key Rule**: Never skip layers. Always go through proper abstraction.

## UI Development

### Rule 1: Exclusive Use of shadcn/ui Components

**Rationale**: 
- Ensures design consistency across the application
- Provides accessible components out of the box
- Maintains theme compatibility (light/dark mode)
- Reduces maintenance burden

**Implementation**:

All UI components MUST come from `@/components/ui/`. These are shadcn/ui components configured for this project.

#### Available Components Library

| Category | Components |
|----------|-----------|
| **Form Controls** | Button, Input, Textarea, Label, Checkbox, Switch, Select, Radio, Slider |
| **Layout** | Card, Dialog, Sheet, Popover, Separator, Scroll Area |
| **Navigation** | Tabs, Dropdown Menu, Command, Breadcrumb |
| **Feedback** | Alert, AlertDialog, Toast (Sonner), Tooltip, Progress, Skeleton |
| **Data Display** | Table, Badge, Avatar, Calendar |

#### How to Use Existing Components

```tsx
// ✅ CORRECT: Import from @/components/ui
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>User Profile</CardTitle>
          <Badge variant="success">Active</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Enter name..." />
        <Button variant="default">Save Changes</Button>
      </CardContent>
    </Card>
  );
}
```

#### How to Add New shadcn Components

If you need a component that doesn't exist yet:

```bash
# Check available components at https://ui.shadcn.com/
# Install the component
npx shadcn@latest add [component-name]

# Examples:
npx shadcn@latest add calendar
npx shadcn@latest add data-table
npx shadcn@latest add form
```

#### Extending Components with Variants

Use `class-variance-authority` (CVA) to create variants:

```tsx
// ✅ CORRECT: Extend with variants
import { cva, type VariantProps } from "class-variance-authority";
import { Button } from "@/components/ui/button";

const iconButtonVariants = cva("", {
  variants: {
    color: {
      primary: "text-primary hover:text-primary/90",
      destructive: "text-destructive hover:text-destructive/90",
      success: "text-green-600 hover:text-green-700",
    },
  },
  defaultVariants: {
    color: "primary",
  },
});

interface IconButtonProps extends VariantProps<typeof iconButtonVariants> {
  icon: React.ReactNode;
  onClick?: () => void;
}

export function IconButton({ icon, color, onClick }: IconButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className={iconButtonVariants({ color })}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
}
```

#### What NOT to Do

```tsx
// ❌ WRONG: Creating custom components from scratch
function CustomButton({ children }: { children: React.ReactNode }) {
  return (
    <button 
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {children}
    </button>
  );
}

// ❌ WRONG: Using other UI libraries
import { Button } from '@mui/material';
import { Button } from 'antd';
import { Button } from 'react-bootstrap';

// ❌ WRONG: Using raw Radix UI without shadcn wrapper
import * as Dialog from '@radix-ui/react-dialog';
```

### Rule 2: Styling with Tailwind CSS

All styling MUST use Tailwind CSS utilities and CSS variables.

#### Color System

```tsx
// ✅ CORRECT: Use CSS variables
<div className="bg-background text-foreground">
  <h1 className="text-primary">Title</h1>
  <p className="text-muted-foreground">Description</p>
  <Button variant="destructive">Delete</Button>
</div>

// ❌ WRONG: Hardcoded colors
<div className="bg-white text-black">
  <h1 className="text-blue-500">Title</h1>
</div>
```

#### Responsive Design

```tsx
// ✅ CORRECT: Mobile-first responsive classes
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card className="p-4 md:p-6" />
</div>
```

#### Conditional Styling

```tsx
import { cn } from "@/lib/utils";

// ✅ CORRECT: Use cn() utility
<Button
  className={cn(
    "w-full",
    isPending && "opacity-50 cursor-not-allowed",
    isSuccess && "bg-green-600 hover:bg-green-700"
  )}
>
  Submit
</Button>
```

## Backend Abstraction

### Rule 3: Mandatory Service Layer Pattern

**Rationale**:
- Centralizes backend logic
- Enables easy mocking for development/testing
- Provides consistent error handling
- Makes code more maintainable and testable
- Allows switching backends without changing UI code

**All backend operations MUST go through service abstraction layers.**

### Service Layer Structure

```
src/lib/services/
├── index.ts              # Re-exports all services
├── auth.service.ts       # Authentication operations
├── profile.service.ts    # Profile management
├── stripe.service.ts     # Payment operations
├── email.service.ts      # Email notifications
├── avatar.service.ts     # File uploads
└── [feature].service.ts  # Feature-specific services
```

### Creating a Service Layer

#### Template for New Services

```typescript
// src/lib/services/consultations.service.ts

import { supabase } from '@/lib/supabaseClient';
import type { Database } from '@/lib/database.types';

// 1. Define types
export type Consultation = Database['public']['Tables']['consultations']['Row'];
export type ConsultationInsert = Database['public']['Tables']['consultations']['Insert'];
export type ConsultationUpdate = Database['public']['Tables']['consultations']['Update'];

export type ConsultationStatus = 'scheduled' | 'completed' | 'cancelled';

export interface CreateConsultationParams {
  familyId: string;
  serviceId: string;
  scheduledAt: string;
  notes?: string;
}

export interface ConsultationResult {
  success: boolean;
  data?: Consultation;
  error?: string;
}

export interface ConsultationsListResult {
  success: boolean;
  data?: Consultation[];
  error?: string;
}

// 2. Service configuration
const MOCK_MODE = process.env.NEXT_PUBLIC_CONSULTATIONS_MODE === 'mock';

// 3. Implement service functions

/**
 * Get all consultations for an advisor
 */
export async function getConsultations(
  advisorId: string,
  status?: ConsultationStatus
): Promise<ConsultationsListResult> {
  try {
    // Mock implementation for development
    if (MOCK_MODE) {
      return {
        success: true,
        data: getMockConsultations(advisorId, status),
      };
    }

    // Real implementation
    let query = supabase
      .from('consultations')
      .select('*')
      .eq('advisor_id', advisorId)
      .order('scheduled_at', { ascending: true });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) throw error;

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Failed to get consultations:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get consultations',
    };
  }
}

/**
 * Create a new consultation
 */
export async function createConsultation(
  params: CreateConsultationParams
): Promise<ConsultationResult> {
  try {
    if (MOCK_MODE) {
      return {
        success: true,
        data: createMockConsultation(params),
      };
    }

    const { data, error } = await supabase
      .from('consultations')
      .insert({
        family_id: params.familyId,
        service_id: params.serviceId,
        scheduled_at: params.scheduledAt,
        notes: params.notes,
        status: 'scheduled',
      })
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Failed to create consultation:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create consultation',
    };
  }
}

/**
 * Update consultation status
 */
export async function updateConsultationStatus(
  consultationId: string,
  status: ConsultationStatus
): Promise<ConsultationResult> {
  try {
    if (MOCK_MODE) {
      return {
        success: true,
        data: updateMockConsultationStatus(consultationId, status),
      };
    }

    const { data, error } = await supabase
      .from('consultations')
      .update({ status })
      .eq('id', consultationId)
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Failed to update consultation:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update consultation',
    };
  }
}

// 4. Mock implementations for development
function getMockConsultations(
  advisorId: string,
  status?: ConsultationStatus
): Consultation[] {
  const mockData: Consultation[] = [
    {
      id: '1',
      advisor_id: advisorId,
      family_id: 'family-1',
      service_id: 'service-1',
      scheduled_at: new Date().toISOString(),
      status: 'scheduled',
      notes: 'Initial consultation',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  return status ? mockData.filter(c => c.status === status) : mockData;
}

function createMockConsultation(params: CreateConsultationParams): Consultation {
  return {
    id: `mock-${Date.now()}`,
    advisor_id: 'current-advisor',
    family_id: params.familyId,
    service_id: params.serviceId,
    scheduled_at: params.scheduledAt,
    status: 'scheduled',
    notes: params.notes,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
}

function updateMockConsultationStatus(
  consultationId: string,
  status: ConsultationStatus
): Consultation {
  return {
    id: consultationId,
    status,
    // ... other fields
  } as Consultation;
}
```

#### Exporting Services

```typescript
// src/lib/services/index.ts

// Export everything from consultations service
export {
  getConsultations,
  createConsultation,
  updateConsultationStatus,
  type Consultation,
  type ConsultationStatus,
  type CreateConsultationParams,
  type ConsultationResult,
  type ConsultationsListResult,
} from './consultations.service';

// ... other service exports
```

### Using Services in Components

#### Server Components

```tsx
// app/consultations/page.tsx

import { getConsultations } from '@/lib/services/consultations.service';
import { ConsultationsList } from '@/components/consultations/consultations-list';

export default async function ConsultationsPage() {
  // ✅ CORRECT: Use service layer
  const result = await getConsultations('advisor-id', 'scheduled');

  if (!result.success) {
    return <div>Error: {result.error}</div>;
  }

  return <ConsultationsList consultations={result.data || []} />;
}
```

#### Client Components

```tsx
'use client';

import { useState, useEffect } from 'react';
import { getConsultations } from '@/lib/services/consultations.service';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function ConsultationsManager() {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadConsultations();
  }, []);

  // ✅ CORRECT: Use service layer
  async function loadConsultations() {
    setLoading(true);
    const result = await getConsultations('advisor-id');
    
    if (result.success) {
      setConsultations(result.data || []);
    } else {
      toast.error(result.error || 'Failed to load consultations');
    }
    
    setLoading(false);
  }

  return (
    <div>
      {loading ? (
        <Skeleton className="h-32" />
      ) : (
        <div>
          {consultations.map(c => (
            <div key={c.id}>{c.notes}</div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### What NOT to Do

```tsx
// ❌ WRONG: Direct Supabase calls from components
'use client';

import { supabase } from '@/lib/supabaseClient';

export function BadConsultationsList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // ❌ Don't call Supabase directly
    supabase
      .from('consultations')
      .select('*')
      .then(({ data }) => setData(data || []));
  }, []);

  return <div>...</div>;
}
```

```tsx
// ❌ WRONG: Database logic in components
export async function ConsultationsPage() {
  // ❌ Don't put database logic here
  const { data: consultations } = await supabase
    .from('consultations')
    .select(`
      *,
      families!inner(name),
      services!inner(title)
    `)
    .eq('advisor_id', 'advisor-id')
    .order('scheduled_at');

  return <div>...</div>;
}
```

## Code Examples

### Complete Feature Implementation

Here's a complete example of implementing a new feature following all rules:

#### 1. Create Service Layer

```typescript
// src/lib/services/tasks.service.ts

import { supabase } from '@/lib/supabaseClient';

export type TaskStatus = 'pending' | 'completed' | 'cancelled';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: string;
  createdAt: string;
}

export interface TaskResult {
  success: boolean;
  data?: Task;
  error?: string;
}

export interface TasksListResult {
  success: boolean;
  data?: Task[];
  error?: string;
}

export async function getTasks(status?: TaskStatus): Promise<TasksListResult> {
  try {
    let query = supabase
      .from('tasks')
      .select('*')
      .order('due_date', { ascending: true });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw error;

    return { success: true, data: data || [] };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get tasks',
    };
  }
}

export async function createTask(task: Omit<Task, 'id' | 'createdAt'>): Promise<TaskResult> {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .insert({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        due_date: task.dueDate,
      })
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create task',
    };
  }
}
```

#### 2. Create UI Component

```tsx
// src/components/tasks/task-list.tsx
'use client';

import { useState, useEffect } from 'react';
import { getTasks, type Task, type TaskStatus } from '@/lib/services/tasks.service';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { CheckCircle2, Clock, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface TaskListProps {
  initialStatus?: TaskStatus;
}

export function TaskList({ initialStatus }: TaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<TaskStatus | undefined>(initialStatus);

  useEffect(() => {
    loadTasks();
  }, [status]);

  async function loadTasks() {
    setLoading(true);
    const result = await getTasks(status);
    
    if (result.success) {
      setTasks(result.data || []);
    } else {
      toast.error(result.error || 'Failed to load tasks');
    }
    
    setLoading(false);
  }

  const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  const getPriorityBadge = (priority: Task['priority']) => {
    const variants = {
      low: 'secondary',
      medium: 'default',
      high: 'destructive',
    } as const;

    return <Badge variant={variants[priority]}>{priority}</Badge>;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant={status === undefined ? 'default' : 'outline'}
          onClick={() => setStatus(undefined)}
        >
          All
        </Button>
        <Button
          variant={status === 'pending' ? 'default' : 'outline'}
          onClick={() => setStatus('pending')}
        >
          Pending
        </Button>
        <Button
          variant={status === 'completed' ? 'default' : 'outline'}
          onClick={() => setStatus('completed')}
        >
          Completed
        </Button>
      </div>

      {tasks.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No tasks found
          </CardContent>
        </Card>
      ) : (
        tasks.map((task) => (
          <Card key={task.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(task.status)}
                  <CardTitle>{task.title}</CardTitle>
                </div>
                {getPriorityBadge(task.priority)}
              </div>
            </CardHeader>
            <CardContent>
              {task.description && (
                <p className="text-sm text-muted-foreground mb-2">
                  {task.description}
                </p>
              )}
              {task.dueDate && (
                <p className="text-xs text-muted-foreground">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
```

#### 3. Create Page

```tsx
// app/tasks/page.tsx

import { TaskList } from '@/components/tasks/task-list';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function TasksPage() {
  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Tasks</h1>
        <Button asChild>
          <Link href="/tasks/new">
            <Plus className="mr-2 h-4 w-4" />
            New Task
          </Link>
        </Button>
      </div>
      
      <TaskList />
    </div>
  );
}
```

## Anti-Patterns

### ❌ Common Mistakes to Avoid

#### 1. Mixing UI Libraries

```tsx
// ❌ WRONG
import { Button } from '@mui/material';
import { Card } from '@/components/ui/card';

// ✅ CORRECT
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
```

#### 2. Skipping Service Layer

```tsx
// ❌ WRONG
const { data } = await supabase.from('users').select('*');

// ✅ CORRECT
const result = await getUsers();
if (result.success) {
  const users = result.data;
}
```

#### 3. Hardcoding Styles

```tsx
// ❌ WRONG
<div style={{ color: '#3b82f6', padding: '16px' }}>

// ✅ CORRECT
<div className="text-primary p-4">
```

#### 4. Not Handling Errors

```tsx
// ❌ WRONG
const data = await getTasks();
return <div>{data.map(...)}</div>;

// ✅ CORRECT
const result = await getTasks();
if (!result.success) {
  toast.error(result.error);
  return null;
}
return <div>{result.data.map(...)}</div>;
```

#### 5. Ignoring Loading States

```tsx
// ❌ WRONG
return <div>{tasks.map(...)}</div>;

// ✅ CORRECT
if (loading) return <Skeleton className="h-32" />;
return <div>{tasks.map(...)}</div>;
```

## Summary

When developing for RE-Advisor, always remember:

1. **UI**: Only shadcn/ui components
2. **Backend**: Always use service abstraction layers
3. **Styling**: Tailwind CSS with CSS variables
4. **Forms**: react-hook-form + Zod
5. **Icons**: lucide-react only
6. **Types**: Always use TypeScript
7. **Errors**: Handle gracefully with toasts
8. **Loading**: Show skeleton loaders

These rules ensure code quality, maintainability, and consistency across the entire project.
