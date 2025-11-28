import { supabase } from "@/lib/supabaseClient";

// Types
export interface Family {
  id: number;
  advisor_id: string;
  name: string;
  wealth?: string;
  members_count: number;
  role: "external-consul" | "consultant" | "personal-advisor";
  payment_status: "paid" | "pending" | "no-invoices";
  status: "active" | "pending" | "inactive";
  last_contact?: string;
  industry?: string;
  location?: string;
  email?: string;
  phone?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface FamilyMember {
  id: number;
  family_id: number;
  name: string;
  role?: string;
  email?: string;
  avatar?: string;
  created_at: string;
}

export interface CreateFamilyInput {
  name: string;
  role?: "external-consul" | "consultant" | "personal-advisor";
  industry?: string;
  location?: string;
  email?: string;
  phone?: string;
  description?: string;
}

export interface CreateMemberInput {
  family_id: number;
  name: string;
  role?: string;
  email?: string;
}

// Families CRUD
export async function getFamilies() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("families")
    .select(`
      *,
      members:family_members(*),
      tasks:tasks(*),
      services:services(*),
      consultations:consultations(*)
    `)
    .eq("advisor_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function getFamily(id: number) {
  const { data, error } = await supabase
    .from("families")
    .select(`
      *,
      members:family_members(*),
      tasks:tasks(*),
      services:services(*),
      consultations:consultations(*)
    `)
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function createFamily(input: CreateFamilyInput) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("families")
    .insert([{
      advisor_id: user.id,
      name: input.name,
      role: input.role || "consultant",
      industry: input.industry,
      location: input.location,
      email: input.email,
      phone: input.phone,
      description: input.description,
      status: "pending",
      payment_status: "no-invoices",
      members_count: 0
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateFamily(id: number, updates: Partial<CreateFamilyInput>) {
  const { data, error } = await supabase
    .from("families")
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteFamily(id: number) {
  const { error } = await supabase
    .from("families")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

export async function updateFamilyLastContact(id: number) {
  const { error } = await supabase
    .from("families")
    .update({ 
      last_contact: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq("id", id);

  if (error) throw error;
  return true;
}

// Family Members CRUD
export async function getFamilyMembers(familyId: number) {
  const { data, error } = await supabase
    .from("family_members")
    .select("*")
    .eq("family_id", familyId)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}

export async function addFamilyMember(input: CreateMemberInput) {
  const { data, error } = await supabase
    .from("family_members")
    .insert([{
      family_id: input.family_id,
      name: input.name,
      role: input.role,
      email: input.email
    }])
    .select()
    .single();

  if (error) throw error;

  // Update members count
  await supabase.rpc("increment_members_count", { family_id: input.family_id });

  return data;
}

export async function updateFamilyMember(id: number, updates: Partial<CreateMemberInput>) {
  const { data, error } = await supabase
    .from("family_members")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteFamilyMember(id: number, familyId: number) {
  const { error } = await supabase
    .from("family_members")
    .delete()
    .eq("id", id);

  if (error) throw error;

  // Update members count
  await supabase.rpc("decrement_members_count", { family_id: familyId });

  return true;
}

// Stats
export async function getFamiliesStats() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const [familiesResult, consultationsResult] = await Promise.all([
    supabase
      .from("families")
      .select("id, status, payment_status", { count: "exact" })
      .eq("advisor_id", user.id),
    supabase
      .from("consultations")
      .select("id, status", { count: "exact" })
      .eq("advisor_id", user.id)
      .eq("status", "scheduled")
  ]);

  const families = familiesResult.data || [];
  const activeFamilies = families.filter(f => f.status === "active").length;
  const pendingPayments = families.filter(f => f.payment_status === "pending").length;
  const upcomingMeetings = consultationsResult.count || 0;

  return {
    totalFamilies: families.length,
    activeEngagements: activeFamilies,
    upcomingMeetings,
    pendingPayments
  };
}
