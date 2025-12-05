import { supabase } from "@/lib/supabaseClient";

// Types
export interface TeamMember {
  id: number;
  advisor_id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar_url: string | null;
  created_at: string;
}

export interface CreateTeamMemberInput {
  name: string;
  email: string;
  role: string;
  status?: string;
  avatar_url?: string | null;
}

// Team Members CRUD
export async function getTeamMembers() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("team_members")
    .select("*")
    .eq("advisor_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function createTeamMember(input: CreateTeamMemberInput) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("team_members")
    .insert([{
      advisor_id: user.id,
      ...input,
      status: input.status || "pending"
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateTeamMember(id: number, updates: Partial<TeamMember>) {
  const { data, error } = await supabase
    .from("team_members")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTeamMember(id: number) {
  const { error } = await supabase
    .from("team_members")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

export async function updateTeamMemberRole(id: number, role: string) {
  return updateTeamMember(id, { role });
}
