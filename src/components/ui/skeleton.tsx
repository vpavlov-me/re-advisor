import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

// Card Skeleton - for service/resource cards
function CardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("border rounded-lg p-6 space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-5 w-24 rounded" />
        </div>
        <Skeleton className="h-8 w-8 rounded" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
    </div>
  );
}

// Table Row Skeleton
function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <div className="flex items-center gap-4 p-4 border-b">
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} className="h-4 flex-1" />
      ))}
    </div>
  );
}

// List Item Skeleton - for team members, sessions, etc.
function ListItemSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-between p-4 border rounded-lg", className)}>
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-48" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-8 rounded" />
      </div>
    </div>
  );
}

// Form Field Skeleton
function FormFieldSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-2", className)}>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-full rounded-md" />
    </div>
  );
}

// Profile Card Skeleton
function ProfileSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("border rounded-lg p-6 space-y-6", className)}>
      <div className="flex items-center gap-4">
        <Skeleton className="h-20 w-20 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormFieldSkeleton />
        <FormFieldSkeleton />
        <FormFieldSkeleton />
        <FormFieldSkeleton />
      </div>
    </div>
  );
}

// Stats Card Skeleton
function StatsSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("border rounded-lg p-4 space-y-2", className)}>
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-3 w-32" />
    </div>
  );
}

// Page Header Skeleton
function PageHeaderSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-10 w-32 rounded-md" />
        <Skeleton className="h-10 w-32 rounded-md" />
      </div>
    </div>
  );
}

// Notification Item Skeleton
function NotificationSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-start gap-4 p-4 border-b", className)}>
      <Skeleton className="h-10 w-10 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-3/4" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}

// Message Thread Skeleton
function MessageSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-4 p-4 border-b", className)}>
      <Skeleton className="h-12 w-12 rounded-full shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}

export { 
  Skeleton, 
  CardSkeleton, 
  TableRowSkeleton, 
  ListItemSkeleton, 
  FormFieldSkeleton,
  ProfileSkeleton,
  StatsSkeleton,
  PageHeaderSkeleton,
  NotificationSkeleton,
  MessageSkeleton
};
