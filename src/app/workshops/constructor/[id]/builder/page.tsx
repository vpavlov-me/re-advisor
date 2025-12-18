"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function WorkshopBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  useEffect(() => {
    // Redirect to canvas view by default
    router.replace(`/workshops/constructor/${id}/canvas`);
  }, [id, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
        <p className="text-muted-foreground">Redirecting to canvas view...</p>
      </div>
    </div>
  );
}
