import { supabase } from "@/lib/supabaseClient";

// Types
export interface Consultation {
  id: number;
  family_id: number;
  advisor_id: string;
  title: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled";
  meeting_link?: string;
  created_at: string;
}

export interface ConsultationMember {
  id: number;
  consultation_id: number;
  family_member_id: number;
  created_at: string;
}

export interface CreateConsultationInput {
  family_id: number;
  title: string;
  date: string;
  time: string;
  meeting_link?: string;
}

// Consultations CRUD
export async function getConsultations() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("consultations")
    .select(`
      *,
      family:families(id, name),
      members:consultation_members(
        id,
        family_member:family_members(id, name, role, email)
      )
    `)
    .eq("advisor_id", user.id)
    .order("date", { ascending: true });

  if (error) throw error;
  return data;
}

export async function getConsultationsByFamily(familyId: number) {
  const { data, error } = await supabase
    .from("consultations")
    .select(`
      *,
      members:consultation_members(
        id,
        family_member:family_members(id, name, role, email)
      )
    `)
    .eq("family_id", familyId)
    .order("date", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getUpcomingConsultations(limit = 5) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const today = new Date().toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("consultations")
    .select(`
      *,
      family:families(id, name)
    `)
    .eq("advisor_id", user.id)
    .eq("status", "scheduled")
    .gte("date", today)
    .order("date", { ascending: true })
    .order("time", { ascending: true })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function createConsultation(input: CreateConsultationInput) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("consultations")
    .insert([{
      advisor_id: user.id,
      family_id: input.family_id,
      title: input.title,
      date: input.date,
      time: input.time,
      meeting_link: input.meeting_link,
      status: "scheduled"
    }])
    .select(`
      *,
      family:families(id, name)
    `)
    .single();

  if (error) throw error;
  return data;
}

export async function updateConsultation(id: number, updates: Partial<CreateConsultationInput & { status: string }>) {
  const { data, error } = await supabase
    .from("consultations")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteConsultation(id: number) {
  const { error } = await supabase
    .from("consultations")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

export async function completeConsultation(id: number) {
  const { data, error } = await supabase
    .from("consultations")
    .update({ status: "completed" })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function cancelConsultation(id: number) {
  const { data, error } = await supabase
    .from("consultations")
    .update({ status: "cancelled" })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Consultation Members
export async function addConsultationMember(consultationId: number, familyMemberId: number) {
  const { data, error } = await supabase
    .from("consultation_members")
    .insert([{
      consultation_id: consultationId,
      family_member_id: familyMemberId
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function removeConsultationMember(id: number) {
  const { error } = await supabase
    .from("consultation_members")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

// Calendar helpers
export async function getConsultationsForMonth(year: number, month: number) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const startDate = new Date(year, month, 1).toISOString().split("T")[0];
  const endDate = new Date(year, month + 1, 0).toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("consultations")
    .select(`
      *,
      family:families(id, name)
    `)
    .eq("advisor_id", user.id)
    .gte("date", startDate)
    .lte("date", endDate)
    .order("date", { ascending: true })
    .order("time", { ascending: true });

  if (error) throw error;
  return data;
}
