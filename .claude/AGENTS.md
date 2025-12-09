# AI Agent Rules: Design System

## MANDATORY RULES When Writing React/Next.js Code

### 1. Form Components

**ALWAYS use shadcn/ui components:**

```tsx
// ❌ PROHIBITED
<select className="...">
  <option value="a">A</option>
</select>

<textarea className="..." />

<button className="...">Click</button>

// ✅ REQUIRED
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

<Select value={val} onValueChange={setVal}>
  <SelectTrigger>
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="a">A</SelectItem>
  </SelectContent>
</Select>

<Textarea value={text} onChange={(e) => setText(e.target.value)} />

<Button onClick={handleClick}>Click</Button>
```

### 2. Statuses and Badges

**ALWAYS use StatusBadge:**

```tsx
// ❌ PROHIBITED — creating such functions
function getStatusBadge(status) {
  const colors = { active: "bg-green-100 text-green-700", ... };
  return <Badge className={colors[status]}>{status}</Badge>;
}

// ❌ PROHIBITED — hardcoding colors
<Badge className="bg-green-100 text-green-700">Active</Badge>
<div className="bg-yellow-100 text-yellow-800">Warning</div>

// ✅ REQUIRED
import { StatusBadge } from "@/components/ui/status-badge";

<StatusBadge status="active" />
<StatusBadge status="pending" />
<StatusBadge status="paid" />
<StatusBadge status="in-progress" label="In Progress" />
```

**Available statuses:** active, pending, inactive, paid, awaiting, overdue, no-invoices, external-consul, consultant, personal-advisor, lead-advisor, scheduled, confirmed, completed, cancelled, in-progress, delivered, low, medium, high, urgent, message, payment, meeting, document, system, article, video, template, guide, workshop, webinar, course

### 3. Loading and Spinners

**ALWAYS use the Spinner component:**

```tsx
// ❌ PROHIBITED
<Loader2 className="h-4 w-4 animate-spin" />
<div className="animate-spin rounded-full border-2 border-current border-t-transparent" />

// ✅ REQUIRED
import { Spinner, SpinnerDots, ButtonSpinner } from "@/components/ui/spinner";

<Spinner size="sm" />      // Small
<Spinner size="md" />      // Medium
<Spinner size="lg" />      // Large

// In buttons
<Button disabled={loading}>
  {loading && <ButtonSpinner className="mr-2" />}
  Submit
</Button>

// Typing indicator
<SpinnerDots size="md" />
```

### 4. Alerts

**Use variants:**

```tsx
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

<Alert variant="warning">...</Alert>
<Alert variant="success">...</Alert>
<Alert variant="info">...</Alert>
<Alert variant="destructive">...</Alert>
```

### 5. React Hook Form + Select

**When working with react-hook-form use Controller:**

```tsx
import { Controller } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const { control } = useForm();

<Controller
  name="category"
  control={control}
  render={({ field }) => (
    <Select value={field.value} onValueChange={field.onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="opt1">Option 1</SelectItem>
        <SelectItem value="opt2">Option 2</SelectItem>
      </SelectContent>
    </Select>
  )}
/>
```

## Pre-Task Completion Checklist

- [ ] No `<select>` — use `<Select>` from shadcn
- [ ] No `<textarea>` — use `<Textarea>` from shadcn
- [ ] No `getXxxBadge()` functions — use `<StatusBadge>`
- [ ] No `<Loader2 className="animate-spin">` — use `<Spinner>`
- [ ] No hardcoded colors (`bg-green-100`, `text-red-500`) — use variants
- [ ] No `style={{ }}` for animations

## When Adding a New Status

1. Open `src/components/ui/status-badge.tsx`
2. Add to `statusBadgeVariants.variants.status`
3. Add to `statusLabels`
4. DO NOT create a local function in the page file
