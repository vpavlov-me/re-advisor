# Правила разработки с AI для RE-Advisor

Этот документ содержит подробные инструкции для AI-ассистентов (LLM), работающих над проектом RE-Advisor. Эти правила обеспечивают консистентность кода, поддерживаемость и соблюдение архитектурных паттернов.

## Содержание

1. [Основные принципы](#основные-принципы)
2. [Разработка UI](#разработка-ui)
3. [Абстракция бекенда](#абстракция-бекенда)
4. [Примеры кода](#примеры-кода)
5. [Антипаттерны](#антипаттерны)

## Основные принципы

### Архитектура превыше всего
RE-Advisor следует строгой многослойной архитектуре:

```
┌─────────────────────────────────────────┐
│        Слой UI-компонентов              │
│         (ТОЛЬКО shadcn/ui)              │
├─────────────────────────────────────────┤
│      Слой логики приложения             │
│     (React компоненты/хуки)             │
├─────────────────────────────────────────┤
│      Слой абстракции сервисов           │
│   (ОБЯЗАТЕЛЬНО - src/lib/services/)     │
├─────────────────────────────────────────┤
│        Слой бекенда/базы данных         │
│        (Supabase, Stripe, и т.д.)       │
└─────────────────────────────────────────┘
```

**Ключевое правило**: Никогда не пропускайте слои. Всегда используйте правильную абстракцию.

## Разработка UI

### Правило 1: Исключительное использование компонентов shadcn/ui

**Обоснование**: 
- Обеспечивает консистентность дизайна во всем приложении
- Предоставляет доступные компоненты из коробки
- Поддерживает совместимость тем (светлая/темная)
- Снижает нагрузку на поддержку

**Реализация**:

Все UI-компоненты ДОЛЖНЫ быть из `@/components/ui/`. Это компоненты shadcn/ui, настроенные для этого проекта.

#### Доступная библиотека компонентов

| Категория | Компоненты |
|-----------|-----------|
| **Элементы форм** | Button, Input, Textarea, Label, Checkbox, Switch, Select, Radio, Slider |
| **Разметка** | Card, Dialog, Sheet, Popover, Alert, AlertDialog |
| **Навигация** | Tabs, Dropdown Menu, Command, Breadcrumb |
| **Обратная связь** | Alert, AlertDialog, Toast (Sonner), Tooltip, Progress, Skeleton |
| **Отображение данных** | Table, Badge, Avatar, Calendar |

#### Как использовать существующие компоненты

```tsx
// ✅ ПРАВИЛЬНО: Импорт из @/components/ui
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Профиль пользователя</CardTitle>
          <Badge variant="success">Активен</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input placeholder="Введите имя..." />
        <Button variant="default">Сохранить изменения</Button>
      </CardContent>
    </Card>
  );
}
```

#### Как добавить новые компоненты shadcn

Если вам нужен компонент, которого еще нет:

```bash
# Проверьте доступные компоненты на https://ui.shadcn.com/
# Установите компонент
npx shadcn@latest add [имя-компонента]

# Примеры:
npx shadcn@latest add calendar
npx shadcn@latest add data-table
npx shadcn@latest add form
```

#### Расширение компонентов вариантами

Используйте `class-variance-authority` (CVA) для создания вариантов:

```tsx
// ✅ ПРАВИЛЬНО: Расширение вариантами
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

#### Что НЕ делать

```tsx
// ❌ НЕПРАВИЛЬНО: Создание кастомных компонентов с нуля
function CustomButton({ children }: { children: React.ReactNode }) {
  return (
    <button 
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      {children}
    </button>
  );
}

// ❌ НЕПРАВИЛЬНО: Использование других UI библиотек
import { Button } from '@mui/material';
import { Button } from 'antd';
import { Button } from 'react-bootstrap';

// ❌ НЕПРАВИЛЬНО: Использование сырого Radix UI без обертки shadcn
import * as Dialog from '@radix-ui/react-dialog';
```

### Правило 2: Стилизация с Tailwind CSS

Вся стилизация ДОЛЖНА использовать утилиты Tailwind CSS и CSS-переменные.

#### Цветовая система

```tsx
// ✅ ПРАВИЛЬНО: Используйте CSS-переменные
<div className="bg-background text-foreground">
  <h1 className="text-primary">Заголовок</h1>
  <p className="text-muted-foreground">Описание</p>
  <Button variant="destructive">Удалить</Button>
</div>

// ❌ НЕПРАВИЛЬНО: Жестко заданные цвета
<div className="bg-white text-black">
  <h1 className="text-blue-500">Заголовок</h1>
</div>
```

#### Адаптивный дизайн

```tsx
// ✅ ПРАВИЛЬНО: Mobile-first адаптивные классы
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <Card className="p-4 md:p-6" />
</div>
```

#### Условная стилизация

```tsx
import { cn } from "@/lib/utils";

// ✅ ПРАВИЛЬНО: Используйте утилиту cn()
<Button
  className={cn(
    "w-full",
    isPending && "opacity-50 cursor-not-allowed",
    isSuccess && "bg-green-600 hover:bg-green-700"
  )}
>
  Отправить
</Button>
```

## Абстракция бекенда

### Правило 3: Обязательный паттерн слоя сервисов

**Обоснование**:
- Централизует бизнес-логику
- Позволяет легко создавать моки для разработки/тестирования
- Обеспечивает консистентную обработку ошибок
- Делает код более поддерживаемым и тестируемым
- Позволяет менять бекенд без изменения UI-кода

**Все операции с бекендом ДОЛЖНЫ проходить через слои абстракции сервисов.**

### Структура слоя сервисов

```
src/lib/services/
├── index.ts              # Реэкспорт всех сервисов
├── auth.service.ts       # Операции аутентификации
├── profile.service.ts    # Управление профилем
├── stripe.service.ts     # Операции с платежами
├── email.service.ts      # Email-уведомления
├── avatar.service.ts     # Загрузка файлов
└── [feature].service.ts  # Сервисы конкретных функций
```

### Создание слоя сервисов

#### Шаблон для новых сервисов

```typescript
// src/lib/services/consultations.service.ts

import { supabase } from '@/lib/supabaseClient';
import type { Database } from '@/lib/database.types';

// 1. Определите типы
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

// 2. Конфигурация сервиса
const MOCK_MODE = process.env.NEXT_PUBLIC_CONSULTATIONS_MODE === 'mock';

// 3. Реализуйте функции сервиса

/**
 * Получить все консультации для консультанта
 */
export async function getConsultations(
  advisorId: string,
  status?: ConsultationStatus
): Promise<ConsultationsListResult> {
  try {
    // Мок-реализация для разработки
    if (MOCK_MODE) {
      return {
        success: true,
        data: getMockConsultations(advisorId, status),
      };
    }

    // Реальная реализация
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
    console.error('Не удалось получить консультации:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Не удалось получить консультации',
    };
  }
}

/**
 * Создать новую консультацию
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
    console.error('Не удалось создать консультацию:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Не удалось создать консультацию',
    };
  }
}

// 4. Мок-реализации для разработки
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
      notes: 'Первичная консультация',
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
```

#### Экспорт сервисов

```typescript
// src/lib/services/index.ts

// Экспортируйте все из сервиса консультаций
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

// ... другие экспорты сервисов
```

### Использование сервисов в компонентах

#### Серверные компоненты

```tsx
// app/consultations/page.tsx

import { getConsultations } from '@/lib/services/consultations.service';
import { ConsultationsList } from '@/components/consultations/consultations-list';

export default async function ConsultationsPage() {
  // ✅ ПРАВИЛЬНО: Используйте слой сервисов
  const result = await getConsultations('advisor-id', 'scheduled');

  if (!result.success) {
    return <div>Ошибка: {result.error}</div>;
  }

  return <ConsultationsList consultations={result.data || []} />;
}
```

#### Клиентские компоненты

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

  // ✅ ПРАВИЛЬНО: Используйте слой сервисов
  async function loadConsultations() {
    setLoading(true);
    const result = await getConsultations('advisor-id');
    
    if (result.success) {
      setConsultations(result.data || []);
    } else {
      toast.error(result.error || 'Не удалось загрузить консультации');
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

### Что НЕ делать

```tsx
// ❌ НЕПРАВИЛЬНО: Прямые вызовы Supabase из компонентов
'use client';

import { supabase } from '@/lib/supabaseClient';

export function BadConsultationsList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // ❌ Не вызывайте Supabase напрямую
    supabase
      .from('consultations')
      .select('*')
      .then(({ data }) => setData(data || []));
  }, []);

  return <div>...</div>;
}
```

```tsx
// ❌ НЕПРАВИЛЬНО: Логика базы данных в компонентах
export async function ConsultationsPage() {
  // ❌ Не размещайте логику базы данных здесь
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

## Примеры кода

### Полная реализация функции

Вот полный пример реализации новой функции с соблюдением всех правил:

#### 1. Создайте слой сервисов

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
      error: error instanceof Error ? error.message : 'Не удалось получить задачи',
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
      error: error instanceof Error ? error.message : 'Не удалось создать задачу',
    };
  }
}
```

#### 2. Создайте UI-компонент

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
      toast.error(result.error || 'Не удалось загрузить задачи');
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
          Все
        </Button>
        <Button
          variant={status === 'pending' ? 'default' : 'outline'}
          onClick={() => setStatus('pending')}
        >
          В ожидании
        </Button>
        <Button
          variant={status === 'completed' ? 'default' : 'outline'}
          onClick={() => setStatus('completed')}
        >
          Завершено
        </Button>
      </div>

      {tasks.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Задачи не найдены
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
                  Срок: {new Date(task.dueDate).toLocaleDateString('ru-RU')}
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

#### 3. Создайте страницу

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
        <h1 className="text-3xl font-bold">Задачи</h1>
        <Button asChild>
          <Link href="/tasks/new">
            <Plus className="mr-2 h-4 w-4" />
            Новая задача
          </Link>
        </Button>
      </div>
      
      <TaskList />
    </div>
  );
}
```

## Антипаттерны

### ❌ Распространенные ошибки, которых следует избегать

#### 1. Смешивание UI-библиотек

```tsx
// ❌ НЕПРАВИЛЬНО
import { Button } from '@mui/material';
import { Card } from '@/components/ui/card';

// ✅ ПРАВИЛЬНО
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
```

#### 2. Пропуск слоя сервисов

```tsx
// ❌ НЕПРАВИЛЬНО
const { data } = await supabase.from('users').select('*');

// ✅ ПРАВИЛЬНО
const result = await getUsers();
if (result.success) {
  const users = result.data;
}
```

#### 3. Жестко заданные стили

```tsx
// ❌ НЕПРАВИЛЬНО
<div style={{ color: '#3b82f6', padding: '16px' }}>

// ✅ ПРАВИЛЬНО
<div className="text-primary p-4">
```

#### 4. Отсутствие обработки ошибок

```tsx
// ❌ НЕПРАВИЛЬНО
const data = await getTasks();
return <div>{data.map(...)}</div>;

// ✅ ПРАВИЛЬНО
const result = await getTasks();
if (!result.success) {
  toast.error(result.error);
  return null;
}
return <div>{result.data.map(...)}</div>;
```

#### 5. Игнорирование состояний загрузки

```tsx
// ❌ НЕПРАВИЛЬНО
return <div>{tasks.map(...)}</div>;

// ✅ ПРАВИЛЬНО
if (loading) return <Skeleton className="h-32" />;
return <div>{tasks.map(...)}</div>;
```

## Резюме

При разработке для RE-Advisor всегда помните:

1. **UI**: Только компоненты shadcn/ui
2. **Бекенд**: Всегда используйте слои абстракции сервисов
3. **Стилизация**: Tailwind CSS с CSS-переменными
4. **Формы**: react-hook-form + Zod
5. **Иконки**: только lucide-react
6. **Типы**: Всегда используйте TypeScript
7. **Ошибки**: Обрабатывайте изящно с тостами
8. **Загрузка**: Показывайте скелетоны-загрузчики

Эти правила обеспечивают качество кода, поддерживаемость и консистентность во всем проекте.
