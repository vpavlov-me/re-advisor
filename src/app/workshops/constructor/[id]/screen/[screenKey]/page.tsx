"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ScreenEditorPage({ params }: { params: Promise<{ id: string; screenKey: string }> }) {
  const { id, screenKey } = use(params);
  const router = useRouter();

  useEffect(() => {
    // Redirect to canvas editor immediately
    router.replace(`/workshops/constructor/${id}/screen/${screenKey}/canvas-editor`);
  }, [id, screenKey, router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"></div>
        <p className="text-muted-foreground">Redirecting to canvas editor...</p>
      </div>
    </div>
  );
}
