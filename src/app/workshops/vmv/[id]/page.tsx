"use client";

import { use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export default function WorkshopRedirectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  useEffect(() => {
    // TODO: Fetch workshop status and redirect to appropriate page
    // For now, redirect to session start

    // Mock logic:
    // - If status is 'draft', redirect to setup/format
    // - If status is 'scheduled', redirect to session (start page)
    // - If status is 'in_progress', redirect to current stage
    // - If status is 'completed', redirect to session/summary

    const checkWorkshopStatus = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock: redirect to session start
        router.replace(`/workshops/vmv/${id}/session`);
      } catch (error) {
        console.error("Error checking workshop status:", error);
        router.replace('/workshops/vmv');
      }
    };

    checkWorkshopStatus();
  }, [id, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" />
        <p className="text-muted-foreground">Loading workshop...</p>
      </div>
    </div>
  );
}
