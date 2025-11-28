import { NotificationSkeleton } from "@/components/ui/skeleton";

export default function NotificationsLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border">
        <div className="container py-3">
          <div className="h-4 w-36 bg-muted rounded animate-pulse" />
        </div>
      </div>
      <div className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="space-y-2">
            <div className="h-7 w-40 bg-muted rounded animate-pulse" />
            <div className="h-4 w-64 bg-muted rounded animate-pulse" />
          </div>
          <div className="flex gap-2">
            <div className="h-10 w-32 bg-muted rounded animate-pulse" />
            <div className="h-10 w-10 bg-muted rounded animate-pulse" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 border rounded-lg overflow-hidden">
            <div className="border-b p-4">
              <div className="flex gap-2">
                <div className="h-9 w-20 bg-muted rounded animate-pulse" />
                <div className="h-9 w-20 bg-muted rounded animate-pulse" />
              </div>
            </div>
            <div className="divide-y">
              {Array.from({ length: 6 }).map((_, i) => (
                <NotificationSkeleton key={i} />
              ))}
            </div>
          </div>
          
          <div className="border rounded-lg p-6 space-y-4 h-fit">
            <div className="h-5 w-40 bg-muted rounded animate-pulse" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                  <div className="h-6 w-10 bg-muted rounded-full animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
