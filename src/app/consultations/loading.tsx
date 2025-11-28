import { ListSkeleton, PageHeaderSkeleton } from "@/components/ui/skeleton";

export default function ConsultationsLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border">
        <div className="container py-3">
          <div className="h-4 w-40 bg-muted rounded animate-pulse" />
        </div>
      </div>
      <div className="container py-6 space-y-6">
        <PageHeaderSkeleton />
        <ListSkeleton items={6} />
      </div>
    </div>
  );
}
