import { WorkshopList } from '@/components/workshops/workshop-list';
import { Button } from '@/components/ui/button';
import { Plus, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Workshops | Advisor Portal',
  description: 'Manage and facilitate workshops with your family clients',
};

async function getUser() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth/login');
  }
  return user;
}

export default async function WorkshopsPage() {
  const user = await getUser();

  return (
    <div className="container py-8 max-w-7xl">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Workshops</h1>
            <p className="text-muted-foreground">
              Create and facilitate structured workshops with your family clients
            </p>
          </div>
          <Button asChild>
            <Link href="/workshops/new">
              <Plus className="mr-2 h-4 w-4" />
              New Workshop
            </Link>
          </Button>
        </div>

        {/* Info Banner */}
        <div className="bg-muted/50 border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <BookOpen className="h-6 w-6 text-primary mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">About Workshops</h3>
              <p className="text-sm text-muted-foreground">
                Workshops are structured facilitation sessions designed to help families articulate
                their vision, mission, values, and strategic plans. Each workshop consists of
                multiple stages that guide participants through a collaborative process.
              </p>
            </div>
          </div>
        </div>

        {/* Workshop List */}
        <WorkshopList advisorId={user.id} />
      </div>
    </div>
  );
}
