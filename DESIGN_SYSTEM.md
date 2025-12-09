# Design System Guidelines

> **IMPORTANT FOR ALL AGENTS AND DEVELOPERS**
>
> This document describes mandatory rules for using design system components.
> Violating these rules leads to code duplication and UI inconsistency.

## Component Architecture

```
src/components/
├── ui/                    # Base shadcn/ui components (DO NOT MODIFY)
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── select.tsx
│   ├── textarea.tsx
│   ├── badge.tsx
│   ├── status-badge.tsx   # Extended Badge for statuses
│   ├── spinner.tsx        # Loading spinners
│   ├── alert.tsx          # Alerts with variants
│   └── ...
├── layout/                # Composite layout components
├── profile/               # Profile business components
└── ...
```

## Component Usage Rules

### 1. PROHIBITED: Using Native HTML Elements

| ❌ DON'T DO | ✅ USE INSTEAD |
|-------------|-----------------|
| `<select>` | `<Select>` from `@/components/ui/select` |
| `<textarea>` | `<Textarea>` from `@/components/ui/textarea` |
| `<button>` | `<Button>` from `@/components/ui/button` |
| `<input>` | `<Input>` from `@/components/ui/input` |

**Example of correct Select usage:**

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Correct
<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>

// With react-hook-form use Controller
import { Controller } from "react-hook-form";

<Controller
  name="fieldName"
  control={control}
  render={({ field }) => (
    <Select value={field.value} onValueChange={field.onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select..." />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="opt1">Option 1</SelectItem>
      </SelectContent>
    </Select>
  )}
/>
```

### 2. StatusBadge — The Only Way to Display Statuses

**PROHIBITED** to create local functions like `getStatusBadge()`, `getRoleBadge()`, `getPaymentBadge()`, etc.

```tsx
import { StatusBadge } from "@/components/ui/status-badge";

// Available statuses:
// General: active, pending, inactive
// Payment: paid, awaiting, overdue, no-invoices
// Roles: external-consul, consultant, personal-advisor, lead-advisor
// Workflow: scheduled, confirmed, completed, cancelled, in-progress, delivered
// Priority: low, medium, high, urgent
// And others — see status-badge.tsx

// Usage
<StatusBadge status="active" />
<StatusBadge status="paid" />
<StatusBadge status="in-progress" />

// With custom label
<StatusBadge status="pending" label="Under Review" />
```

### 3. Spinner — The Only Way to Display Loading States

**PROHIBITED** to use:
- `<Loader2 className="animate-spin" />`
- `<div className="animate-spin rounded-full border..." />`
- Inline styles with `animationDelay`

```tsx
import { Spinner, SpinnerDots, ButtonSpinner } from "@/components/ui/spinner";

// Main spinner (Loader2 icon)
<Spinner size="sm" />   // h-4 w-4
<Spinner size="md" />   // h-6 w-6
<Spinner size="lg" />   // h-8 w-8

// Dots spinner (for typing indicators)
<SpinnerDots size="md" className="text-muted-foreground" />

// Spinner for buttons (border-based)
<Button disabled={loading}>
  {loading && <ButtonSpinner className="mr-2" />}
  Submit
</Button>
```

### 4. Alert — Use Variants

```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

<Alert variant="default">...</Alert>     // Neutral
<Alert variant="destructive">...</Alert> // Error
<Alert variant="warning">...</Alert>     // Warning
<Alert variant="success">...</Alert>     // Success
<Alert variant="info">...</Alert>        // Information
```

### 5. PROHIBITED: Hardcoding Colors in Pages

**❌ DON'T DO:**
```tsx
// In src/app/**/*.tsx files
<div className="bg-green-100 text-green-700">Active</div>
<Badge className="bg-yellow-100 text-yellow-700">Pending</Badge>
```

**✅ DO:**
```tsx
// Use component variants
<StatusBadge status="active" />
<Alert variant="warning">...</Alert>
```

**If you need a new status:**
1. Add it to `src/components/ui/status-badge.tsx`
2. DO NOT create a local function in the page file

## Page Structure

```tsx
// src/app/example/page.tsx

// 1. Imports — only from @/components/ui/*
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Spinner } from "@/components/ui/spinner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// 2. DO NOT create local getXxxBadge() functions
// 3. DO NOT use hardcoded colors like bg-green-100, bg-red-500, etc.
// 4. DO NOT use native <select>, <textarea>, <button>

export default function ExamplePage() {
  return (
    <div>
      {/* Loading */}
      {isLoading && <Spinner size="lg" />}

      {/* Statuses */}
      <StatusBadge status="active" />

      {/* Forms */}
      <Select value={val} onValueChange={setVal}>
        <SelectTrigger>
          <SelectValue placeholder="Choose..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">Option A</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
```

## Pre-Commit Checklist

- [ ] No native `<select>`, `<textarea>`, `<button>` in pages
- [ ] No `getXxxBadge()` functions — use `<StatusBadge>`
- [ ] No `<Loader2 className="animate-spin">` — use `<Spinner>`
- [ ] No hardcoded colors (`bg-green-100`, `text-red-500`) in pages
- [ ] No `style={{ }}` for animations — use Tailwind classes

## Adding New Statuses

If you need a new status type:

1. Open `src/components/ui/status-badge.tsx`
2. Add to `statusBadgeVariants`:
   ```tsx
   variants: {
     status: {
       // ...existing
       "new-status": "bg-color-100 text-color-700 dark:bg-color-900 dark:text-color-300",
     }
   }
   ```
3. Add label to `statusLabels`:
   ```tsx
   const statusLabels = {
     // ...existing
     "new-status": "New Status Label",
   };
   ```
4. Update `StatusType` type if needed

## Utilities

### cn() — Class Merging

```tsx
import { cn } from "@/lib/utils";

// Merges classes and resolves Tailwind conflicts
<div className={cn("base-class", condition && "conditional-class", className)} />
```

## FAQ

**Q: Can I add className to StatusBadge?**
A: Yes, for additional styles (margins, sizes), but NOT for changing colors.

**Q: How do I add a new variant to an existing component?**
A: Edit the file in `src/components/ui/` — add the variant via cva.

**Q: Can I modify base shadcn components?**
A: Only for adding variants. Do not change base styles.

---

*Last updated: December 2024*
