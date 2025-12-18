"use client";

import { WorkshopView } from '@/components/workshops/workshop-view';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function WorkshopPage({ params }: { params: { id: string } }) {
  return (
    <div className="container py-8 max-w-5xl">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/workshops">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Workshops
          </Link>
        </Button>
      </div>

      <WorkshopView workshopId={params.id} />
    </div>
  );
}
