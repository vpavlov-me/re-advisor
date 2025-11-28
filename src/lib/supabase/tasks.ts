import { supabase } from "@/lib/supabaseClient";

// Types
export interface Task {
  id: number;
  family_id: number;
  advisor_id: string;
  title: string;
  due_date?: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
  created_at: string;
  family?: {
    id: number;
    name: string;
  };
}

export interface CreateTaskInput {
  family_id: number;
  title: string;
  due_date?: string;
  priority?: "low" | "medium" | "high";
}

// Tasks CRUD
export async function getTasks() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("tasks")
    .select(`
      *,
      family:families(id, name)
    `)
    .eq("advisor_id", user.id)
    .order("completed", { ascending: true })
    .order("due_date", { ascending: true });

  if (error) throw error;
  return data;
}

export async function getTasksByFamily(familyId: number) {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("family_id", familyId)
    .order("completed", { ascending: true })
    .order("due_date", { ascending: true });

  if (error) throw error;
  return data;
}

export async function getUpcomingTasks(limit = 10) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("tasks")
    .select(`
      *,
      family:families(id, name)
    `)
    .eq("advisor_id", user.id)
    .eq("completed", false)
    .order("due_date", { ascending: true })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function createTask(input: CreateTaskInput) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("tasks")
    .insert([{
      advisor_id: user.id,
      family_id: input.family_id,
      title: input.title,
      due_date: input.due_date,
      priority: input.priority || "medium",
      completed: false
    }])
    .select(`
      *,
      family:families(id, name)
    `)
    .single();

  if (error) throw error;
  return data;
}

export async function updateTask(id: number, updates: Partial<CreateTaskInput & { completed: boolean }>) {
  const { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function toggleTaskComplete(id: number) {
  // First get current state
  const { data: task, error: getError } = await supabase
    .from("tasks")
    .select("completed")
    .eq("id", id)
    .single();

  if (getError) throw getError;

  const { data, error } = await supabase
    .from("tasks")
    .update({ completed: !task.completed })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteTask(id: number) {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

// Stats
export async function getTasksStats() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("tasks")
    .select("id, completed, priority, due_date")
    .eq("advisor_id", user.id);

  if (error) throw error;

  const today = new Date().toISOString().split("T")[0];
  const stats = {
    total: data?.length || 0,
    completed: data?.filter(t => t.completed).length || 0,
    pending: data?.filter(t => !t.completed).length || 0,
    overdue: data?.filter(t => !t.completed && t.due_date && t.due_date < today).length || 0,
    highPriority: data?.filter(t => !t.completed && t.priority === "high").length || 0
  };

  return stats;
}
