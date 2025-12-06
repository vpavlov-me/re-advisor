import { supabase } from "@/lib/supabaseClient";

// Types
export interface FamilyMembership {
  family_id: number;
  family: {
    id: number;
    name: string;
  };
}

export interface SharedResourceWithDetails {
  id: string;
  title: string;
  description: string;
  type: string;
  category: string;
  external_url: string | null;
  content: string | null;
  shared_at: string;
  version: number;
  advisor_name: string;
  family_id: number;
  family_name: string;
  is_starred: boolean;
  view_count: number;
}

// Get current user's family membership (for family portal)
export async function getUserFamilyMembership(): Promise<FamilyMembership | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('family_members')
    .select(`
      family_id,
      families:family_id (
        id,
        name
      )
    `)
    .eq('user_id', user.id)
    .single();

  if (error || !data) return null;

  const family = data.families as unknown as { id: number; name: string };
  return {
    family_id: family.id,
    family: family
  };
}

// Get shared resources for a family (family portal view)
export async function getSharedResourcesForFamily(familyId: number, familyName: string): Promise<SharedResourceWithDetails[]> {
  const { data, error } = await supabase
    .from('resource_shares')
    .select(`
      id,
      version,
      resource_snapshot,
      shared_at,
      knowledge_resources:resource_id (
        id,
        title,
        description,
        type,
        category,
        external_url,
        content
      ),
      profiles:advisor_id (
        first_name,
        last_name
      )
    `)
    .eq('family_id', familyId)
    .order('shared_at', { ascending: false });

  if (error) throw error;

  return (data || [])
    .filter((share: any) => share.knowledge_resources !== null)
    .map((share: any) => {
      const snapshot = share.resource_snapshot as { title?: string; description?: string; category?: string } | null;
      const resource = share.knowledge_resources;
      
      return {
        id: `share-${share.id}`,
        title: snapshot?.title || resource.title,
        description: snapshot?.description || resource.description,
        type: resource.type,
        category: snapshot?.category || resource.category,
        external_url: resource.external_url,
        content: resource.content,
        shared_at: share.shared_at,
        version: share.version || 1,
        advisor_name: share.profiles 
          ? `${share.profiles.first_name || ''} ${share.profiles.last_name || ''}`.trim() || 'Advisor'
          : 'Advisor',
        family_id: familyId,
        family_name: familyName,
        is_starred: false,
        view_count: 0
      };
    });
}

// Get family constitutions for a family (family portal view)
export async function getFamilyConstitutionsForFamily(familyId: number) {
  const { data, error } = await supabase
    .from('family_constitutions')
    .select('*')
    .eq('family_id', familyId)
    .order('updated_at', { ascending: false });

  if (error) throw error;
  return data;
}
