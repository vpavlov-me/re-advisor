"use client";

import { NewWorkshopForm } from '@/components/workshops/new-workshop-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/components/providers/auth-provider';

export default function NewWorkshopPage() {
  const { user, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="container py-8 max-w-4xl">
        <div className="flex items-center justify-center py-12">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Use demo user ID if no user is authenticated
  const userId = user?.id || 'demo-advisor-123';

  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/workshops">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Workshops
          </Link>
        </Button>
      </div>

      <NewWorkshopForm advisorId={userId} />
    </div>
  );
}
