import { WorkshopView } from '@/components/workshops/workshop-view';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Workshop | Advisor Portal',
  description: 'View and manage workshop',
};

async function getUser() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth/login');
  }
  return user;
}

export default async function WorkshopPage({ params }: { params: { id: string } }) {
  await getUser();

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
