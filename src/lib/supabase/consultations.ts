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
  status?: "scheduled" | "completed" | "cancelled";
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

// Availability Types and CRUD
export interface AvailabilitySlot {
  id: number;
  advisor_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
  created_at: string;
}

export interface AvailabilityException {
  id: number;
  advisor_id: string;
  date: string;
  is_available: boolean;
  reason?: string;
  created_at: string;
}

export async function getAvailabilitySlots() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("availability_slots")
    .select("*")
    .eq("advisor_id", user.id)
    .order("day_of_week", { ascending: true })
    .order("start_time", { ascending: true });

  if (error) throw error;
  return data;
}

export async function upsertAvailabilitySlot(slot: Partial<AvailabilitySlot>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("availability_slots")
    .upsert([{
      advisor_id: user.id,
      ...slot
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteAvailabilitySlot(id: number) {
  const { error } = await supabase
    .from("availability_slots")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

export async function getAvailabilityExceptions() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("availability_exceptions")
    .select("*")
    .eq("advisor_id", user.id)
    .order("date", { ascending: true });

  if (error) throw error;
  return data;
}

export async function createAvailabilityException(exception: Partial<AvailabilityException>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("availability_exceptions")
    .insert([{
      advisor_id: user.id,
      ...exception
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteAvailabilityException(id: number) {
  const { error } = await supabase
    .from("availability_exceptions")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

// Availability Settings
export interface AvailabilitySettings {
  advisor_id: string;
  timezone: string;
  buffer_before_minutes: number;
  buffer_after_minutes: number;
  min_notice_hours: number;
  max_advance_days: number;
}

export async function getAvailabilitySettings() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("availability_settings")
    .select("*")
    .eq("advisor_id", user.id)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data;
}

export async function upsertAvailabilitySettings(settings: Partial<AvailabilitySettings>) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("availability_settings")
    .upsert({
      advisor_id: user.id,
      ...settings,
      updated_at: new Date().toISOString()
    }, { onConflict: "advisor_id" })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Weekly Schedule
export interface WeeklyScheduleSlot {
  id?: number;
  advisor_id?: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

export async function getWeeklySchedule() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("weekly_schedule")
    .select("*")
    .eq("advisor_id", user.id)
    .order("day_of_week", { ascending: true });

  if (error) throw error;
  return data;
}

export async function saveWeeklySchedule(slots: WeeklyScheduleSlot[]) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Delete all existing slots
  const { error: deleteError } = await supabase
    .from("weekly_schedule")
    .delete()
    .eq("advisor_id", user.id);

  if (deleteError) throw deleteError;

  // Insert new slots
  if (slots.length > 0) {
    const slotsWithAdvisorId = slots.map(slot => ({
      advisor_id: user.id,
      day_of_week: slot.day_of_week,
      start_time: slot.start_time,
      end_time: slot.end_time,
      is_available: slot.is_available
    }));

    const { error: insertError } = await supabase
      .from("weekly_schedule")
      .insert(slotsWithAdvisorId);

    if (insertError) throw insertError;
  }

  return true;
}