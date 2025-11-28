import { supabase } from "@/lib/supabaseClient";

// Types
export interface Profile {
  id: string;
  first_name?: string;
  last_name?: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  timezone?: string;
  company?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  bio?: string;
  joined_date: string;
  completion_percentage: number;
  updated_at: string;
}

export interface Credential {
  id: number;
  advisor_id: string;
  name: string;
  issuer?: string;
  year?: string;
  status: string;
  credential_id?: string;
  created_at: string;
}

export interface Expertise {
  id: number;
  advisor_id: string;
  area: string;
  created_at: string;
}

export interface UpdateProfileInput {
  first_name?: string;
  last_name?: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  timezone?: string;
  company?: string;
  website?: string;
  linkedin?: string;
  twitter?: string;
  bio?: string;
}

// Profile CRUD
export async function getProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data;
}

export async function createProfile(input: UpdateProfileInput) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("profiles")
    .insert([{
      id: user.id,
      ...input,
      email: input.email || user.email,
      completion_percentage: calculateCompletion(input)
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProfile(input: UpdateProfileInput) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("profiles")
    .update({
      ...input,
      completion_percentage: calculateCompletion(input),
      updated_at: new Date().toISOString()
    })
    .eq("id", user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function upsertProfile(input: UpdateProfileInput) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("profiles")
    .upsert({
      id: user.id,
      ...input,
      email: input.email || user.email,
      completion_percentage: calculateCompletion(input),
      updated_at: new Date().toISOString()
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Calculate profile completion percentage
function calculateCompletion(profile: UpdateProfileInput): number {
  const fields = [
    profile.first_name,
    profile.last_name,
    profile.title,
    profile.email,
    profile.phone,
    profile.location,
    profile.company,
    profile.bio
  ];
  
  const filled = fields.filter(f => f && f.trim() !== "").length;
  return Math.round((filled / fields.length) * 100);
}

// Credentials CRUD
export async function getCredentials() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("credentials")
    .select("*")
    .eq("advisor_id", user.id)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function addCredential(input: Omit<Credential, "id" | "advisor_id" | "created_at">) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("credentials")
    .insert([{
      advisor_id: user.id,
      name: input.name,
      issuer: input.issuer,
      year: input.year,
      status: input.status || "pending",
      credential_id: input.credential_id
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateCredential(id: number, input: Partial<Credential>) {
  const { data, error } = await supabase
    .from("credentials")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCredential(id: number) {
  const { error } = await supabase
    .from("credentials")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

// Expertise CRUD
export async function getExpertise() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("expertise")
    .select("*")
    .eq("advisor_id", user.id)
    .order("created_at", { ascending: true });

  if (error) throw error;
  return data;
}

export async function addExpertise(area: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("expertise")
    .insert([{
      advisor_id: user.id,
      area
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteExpertise(id: number) {
  const { error } = await supabase
    .from("expertise")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}
