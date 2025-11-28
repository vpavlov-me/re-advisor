import { MessageSkeleton } from "@/components/ui/skeleton";

export default function MessagesLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b border-border">
        <div className="container py-3">
          <div className="h-4 w-32 bg-muted rounded animate-pulse" />
        </div>
      </div>
      <div className="container py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-180px)]">
          {/* Conversations List */}
          <div className="border rounded-lg overflow-hidden">
            <div className="p-4 border-b">
              <div className="h-10 bg-muted rounded animate-pulse" />
            </div>
            <div className="divide-y">
              {Array.from({ length: 6 }).map((_, i) => (
                <MessageSkeleton key={i} />
              ))}
            </div>
          </div>
          
          {/* Message Area */}
          <div className="lg:col-span-2 border rounded-lg flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-muted animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 w-40 bg-muted rounded animate-pulse" />
                  <div className="h-3 w-24 bg-muted rounded animate-pulse" />
                </div>
              </div>
            </div>
            <div className="flex-1 p-4 space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                  <div className={`h-16 w-2/3 bg-muted rounded-lg animate-pulse`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
