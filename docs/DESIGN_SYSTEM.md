# Дизайн-система RE-Advisor

Приложение RE-Advisor использует комплексную дизайн-систему, построенную на базе современных технологий и best practices разработки пользовательских интерфейсов.

## Основные технологии

### 1. shadcn/ui

Основа дизайн-системы — **shadcn/ui** (стиль "new-york"). Это не библиотека компонентов в традиционном смысле, а коллекция переиспользуемых компонентов, которые копируются непосредственно в проект, что даёт полный контроль над их кодом и стилями.

Конфигурация (`components.json`):
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "lucide"
}
```

### 2. Tailwind CSS

Для стилизации используется **Tailwind CSS** с кастомной конфигурацией:

- **tailwindcss-animate** — плагин для анимаций
- **CSS Variables** — для поддержки тем (светлая/тёмная)
- **HSL цветовая модель** — для гибкого управления цветами

### 3. Radix UI

Для создания доступных и интерактивных компонентов используются примитивы **Radix UI**:

- `@radix-ui/react-avatar` — аватары
- `@radix-ui/react-checkbox` — чекбоксы
- `@radix-ui/react-dialog` — модальные окна
- `@radix-ui/react-dropdown-menu` — выпадающие меню
- `@radix-ui/react-label` — метки форм
- `@radix-ui/react-popover` — поповеры
- `@radix-ui/react-progress` — прогресс-бары
- `@radix-ui/react-scroll-area` — области прокрутки
- `@radix-ui/react-select` — селекты
- `@radix-ui/react-separator` — разделители
- `@radix-ui/react-slot` — слоты для композиции
- `@radix-ui/react-switch` — переключатели
- `@radix-ui/react-tabs` — вкладки
- `@radix-ui/react-tooltip` — подсказки

### 4. Дополнительные библиотеки

- **class-variance-authority (CVA)** — управление вариантами компонентов
- **clsx** — утилита для условного объединения классов
- **tailwind-merge** — умное объединение Tailwind классов
- **lucide-react** — библиотека иконок
- **next-themes** — поддержка тем для Next.js
- **cmdk** — командная палитра
- **sonner** — уведомления (тосты)
- **recharts** — графики и диаграммы

## Цветовая палитра

Приложение использует **reui design system** с основным синим цветом `#005CCD`.

### Светлая тема (Light Mode)

| Переменная | HSL значение | Описание |
|------------|--------------|----------|
| `--background` | `0 0% 100%` | Фон страницы (белый) |
| `--foreground` | `0 0% 3.9%` | Основной текст (почти чёрный) |
| `--primary` | `217 100% 40%` | Основной акцентный цвет (синий #005CCD) |
| `--primary-foreground` | `0 0% 100%` | Текст на primary (белый) |
| `--secondary` | `0 0% 96.1%` | Вторичный фон (светло-серый) |
| `--muted` | `0 0% 96.1%` | Приглушённый фон |
| `--muted-foreground` | `0 0% 45.1%` | Приглушённый текст |
| `--accent` | `0 0% 96.1%` | Акцентный фон |
| `--destructive` | `0 84.2% 60.2%` | Деструктивные действия (красный) |
| `--border` | `0 0% 89.8%` | Цвет границ |
| `--ring` | `217 100% 40%` | Цвет фокуса (синий) |
| `--radius` | `0.625rem` | Базовый радиус скругления |

### Цвета для графиков

```
--chart-1: 217 80% 60%
--chart-2: 217 70% 50%
--chart-3: 217 60% 45%
--chart-4: 217 50% 40%
--chart-5: 217 40% 35%
```

### Тёмная тема (Dark Mode)

В тёмной теме цвета инвертируются для комфортного использования в условиях низкой освещённости.

## UI-компоненты

Все компоненты находятся в директории `src/components/ui/`:

### Базовые компоненты

| Компонент | Файл | Описание |
|-----------|------|----------|
| **Button** | `button.tsx` | Кнопки с вариантами: default, destructive, outline, secondary, ghost, link |
| **Input** | `input.tsx` | Поле ввода текста |
| **Textarea** | `textarea.tsx` | Многострочное поле ввода |
| **Label** | `label.tsx` | Метки для полей форм |
| **Checkbox** | `checkbox.tsx` | Чекбокс |
| **Switch** | `switch.tsx` | Переключатель |
| **Select** | `select.tsx` | Выпадающий список |

### Контейнеры

| Компонент | Файл | Описание |
|-----------|------|----------|
| **Card** | `card.tsx` | Карточка с заголовком, содержимым и футером |
| **Dialog** | `dialog.tsx` | Модальное окно |
| **Sheet** | `sheet.tsx` | Боковая панель |
| **Popover** | `popover.tsx` | Всплывающее окно |

### Навигация

| Компонент | Файл | Описание |
|-----------|------|----------|
| **Tabs** | `tabs.tsx` | Вкладки |
| **Dropdown Menu** | `dropdown-menu.tsx` | Выпадающее меню |
| **Command** | `command.tsx` | Командная палитра |

### Отображение данных

| Компонент | Файл | Описание |
|-----------|------|----------|
| **Table** | `table.tsx` | Таблица |
| **Badge** | `badge.tsx` | Бейджи со статусами |
| **Avatar** | `avatar.tsx` | Аватар пользователя |
| **Progress** | `progress.tsx` | Прогресс-бар |
| **Skeleton** | `skeleton.tsx` | Скелетон для загрузки |

### Обратная связь

| Компонент | Файл | Описание |
|-----------|------|----------|
| **Tooltip** | `tooltip.tsx` | Подсказка при наведении |
| **Toaster** | `toaster.tsx` | Уведомления (тосты) |
| **Error Boundary** | `error-boundary.tsx` | Обработка ошибок |

### Специальные компоненты

| Компонент | Файл | Описание |
|-----------|------|----------|
| **Avatar Upload** | `avatar-upload.tsx` | Загрузка аватара |
| **File Upload** | `file-upload.tsx` | Загрузка файлов |
| **Skeleton Loaders** | `skeleton-loaders.tsx` | Готовые скелетоны загрузки |
| **Scroll Area** | `scroll-area.tsx` | Кастомная область прокрутки |

## Варианты компонентов (CVA)

### Button

```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-normal...",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent...",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
  }
);
```

### Badge

```typescript
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold...",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground...",
        secondary: "border-transparent bg-secondary text-secondary-foreground...",
        destructive: "border-transparent bg-destructive text-destructive-foreground...",
        outline: "text-foreground",
        success: "border-transparent bg-green-100 text-green-800...",
        warning: "border-transparent bg-yellow-100 text-yellow-800...",
      },
    },
  }
);
```

### Card

```typescript
const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "",
        elevated: "shadow-md",
      },
    },
  }
);
```

## Layout-компоненты

Компоненты для структуры страницы находятся в `src/components/layout/`:

| Компонент | Файл | Описание |
|-----------|------|----------|
| **App Header** | `app-header.tsx` | Шапка приложения |
| **App Footer** | `app-footer.tsx` | Подвал приложения |
| **Layout Wrapper** | `layout-wrapper.tsx` | Обёртка страницы |
| **Page Header** | `page-header.tsx` | Заголовок страницы |

## Утилиты

### cn() — объединение классов

```typescript
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

Функция `cn()` объединяет классы с умной дедупликацией Tailwind-классов.

## Иконки

Используется библиотека **Lucide React** (`lucide-react`). Пример использования:

```tsx
import { Home, Settings, User } from 'lucide-react';

<Home className="h-5 w-5" />
<Settings className="h-5 w-5" />
<User className="h-5 w-5" />
```

## Переключение тем

Поддержка тёмной темы реализована через **next-themes**:

```tsx
import { ThemeProvider } from 'next-themes';

<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
</ThemeProvider>
```

Компонент переключения темы: `src/components/theme/theme-toggle.tsx`

## Типографика

- **Размеры текста**: используются классы Tailwind (`text-xs`, `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`)
- **Вес шрифта**: `font-normal`, `font-medium`, `font-semibold`
- **Интерлиньяж**: автоматический через Tailwind

## Spacing и сетка

- **Container**: центрированный контейнер с `max-width: 1400px` для 2xl экранов и `padding: 2rem`
- **Border Radius**: 
  - `--radius: 0.625rem` (базовый)
  - `lg`: `var(--radius)`
  - `md`: `calc(var(--radius) - 2px)`
  - `sm`: `calc(var(--radius) - 4px)`

## Анимации

Используются анимации из **tailwindcss-animate**:

```typescript
keyframes: {
  'accordion-down': {
    from: { height: '0' },
    to: { height: 'var(--radix-accordion-content-height)' }
  },
  'accordion-up': {
    from: { height: 'var(--radix-accordion-content-height)' },
    to: { height: '0' }
  }
}
```

## Accessibility (A11y)

Компоненты на базе Radix UI обеспечивают:
- Поддержку клавиатурной навигации
- ARIA-атрибуты
- Focus management
- Screen reader поддержку

## Пример использования

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

function ExampleComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Пример карточки</CardTitle>
        <Badge variant="success">Активно</Badge>
      </CardHeader>
      <CardContent>
        <Input placeholder="Введите текст..." />
        <Button variant="default" className="mt-4">
          Сохранить
        </Button>
      </CardContent>
    </Card>
  );
}
```

## Структура директорий

```
src/
├── components/
│   ├── ui/                    # UI-компоненты (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── layout/                # Layout-компоненты
│   │   ├── app-header.tsx
│   │   ├── app-footer.tsx
│   │   └── ...
│   ├── theme/                 # Компоненты темы
│   │   └── theme-toggle.tsx
│   └── providers/             # Context providers
├── lib/
│   └── utils.ts               # Утилиты (cn, и др.)
└── app/
    └── globals.css            # Глобальные стили и CSS-переменные
```

## Рекомендации

1. **Используйте существующие компоненты** — перед созданием нового компонента проверьте наличие похожего в `src/components/ui/`

2. **Следуйте системе цветов** — используйте CSS-переменные вместо хардкодных цветов

3. **Используйте cn()** — для объединения классов с дедупликацией

4. **Добавляйте варианты через CVA** — для новых вариантов компонентов

5. **Тестируйте оба режима** — светлую и тёмную темы
