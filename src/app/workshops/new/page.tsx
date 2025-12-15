"use client";

import { NewWorkshopForm } from '@/components/workshops/new-workshop-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/components/providers/auth-provider';

export default function NewWorkshopPage() {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

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

      <NewWorkshopForm advisorId={user.id} />
    </div>
  );
}
