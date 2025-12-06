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
  status?: string;
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
  avatar_url?: string;
  profile_status?: string;
  onboarding_progress?: number;
  onboarding_completed_at?: string;
  two_factor_enabled?: boolean;
  city?: string;
  country?: string;
  linkedin_url?: string;
  expertise_areas?: string[];
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

// ============================================
// EXPERIENCE CRUD
// ============================================

export interface Experience {
  id: number;
  advisor_id: string;
  role: string;
  company: string;
  start_date?: string;
  end_date?: string;
  is_current?: boolean;
  description?: string;
  location?: string;
  display_order?: number;
  created_at: string;
  updated_at?: string;
}

export interface ExperienceInput {
  role: string;
  company: string;
  start_date?: string;
  end_date?: string;
  is_current?: boolean;
  description?: string;
  location?: string;
  display_order?: number;
}

export async function getExperience() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("experience")
    .select("*")
    .eq("advisor_id", user.id)
    .order("display_order", { ascending: true })
    .order("start_date", { ascending: false });

  if (error) throw error;
  return data;
}

export async function addExperience(input: ExperienceInput) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("experience")
    .insert([{
      advisor_id: user.id,
      ...input
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateExperience(id: number, input: Partial<ExperienceInput>) {
  const { data, error } = await supabase
    .from("experience")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteExperience(id: number) {
  const { error } = await supabase
    .from("experience")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

// ============================================
// EDUCATION CRUD
// ============================================

export interface Education {
  id: number;
  advisor_id: string;
  degree: string;
  institution: string;
  field_of_study?: string;
  start_year?: string;
  end_year?: string;
  grade?: string;
  description?: string;
  display_order?: number;
  created_at: string;
  updated_at?: string;
}

export interface EducationInput {
  degree: string;
  institution: string;
  field_of_study?: string;
  start_year?: string;
  end_year?: string;
  grade?: string;
  description?: string;
  display_order?: number;
}

export async function getEducation() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("education")
    .select("*")
    .eq("advisor_id", user.id)
    .order("display_order", { ascending: true })
    .order("end_year", { ascending: false });

  if (error) throw error;
  return data;
}

export async function addEducation(input: EducationInput) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("education")
    .insert([{
      advisor_id: user.id,
      ...input
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateEducation(id: number, input: Partial<EducationInput>) {
  const { data, error } = await supabase
    .from("education")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteEducation(id: number) {
  const { error } = await supabase
    .from("education")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

// ============================================
// SKILLS CRUD
// ============================================

export interface Skill {
  id: number;
  advisor_id: string;
  name: string;
  proficiency?: string;
  display_order?: number;
  created_at: string;
}

export async function getSkills() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("skills")
    .select("*")
    .eq("advisor_id", user.id)
    .order("display_order", { ascending: true });

  if (error) throw error;
  return data;
}

export async function addSkill(name: string, proficiency?: string) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("skills")
    .insert([{
      advisor_id: user.id,
      name,
      proficiency
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteSkill(id: number) {
  const { error } = await supabase
    .from("skills")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

// ============================================
// RECOMMENDATIONS CRUD
// ============================================

export interface Recommendation {
  id: number;
  advisor_id: string;
  author_name: string;
  author_title?: string;
  author_company?: string;
  author_avatar_url?: string;
  relationship?: string;
  rating?: number;
  text: string;
  is_featured?: boolean;
  is_visible?: boolean;
  display_order?: number;
  created_at: string;
  updated_at?: string;
}

export interface RecommendationInput {
  author_name: string;
  author_title?: string;
  author_company?: string;
  author_avatar_url?: string;
  relationship?: string;
  rating?: number;
  text: string;
  is_featured?: boolean;
  is_visible?: boolean;
  display_order?: number;
}

export async function getRecommendations() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("recommendations")
    .select("*")
    .eq("advisor_id", user.id)
    .eq("is_visible", true)
    .order("is_featured", { ascending: false })
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

export async function addRecommendation(input: RecommendationInput) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("recommendations")
    .insert([{
      advisor_id: user.id,
      ...input
    }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateRecommendation(id: number, input: Partial<RecommendationInput>) {
  const { data, error } = await supabase
    .from("recommendations")
    .update(input)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteRecommendation(id: number) {
  const { error } = await supabase
    .from("recommendations")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}
