// Tasks Service - CRUD operations for task management
import { supabase } from './supabaseClient';

// Types
export interface Task {
  id: number;
  family_id?: number;
  advisor_id: string;
  title: string;
  due_date?: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  created_at: string;
  // Joined data
  family?: {
    name: string;
  };
}

export interface CreateTaskInput {
  title: string;
  family_id?: number;
  due_date?: string;
  priority?: 'low' | 'medium' | 'high';
}

export interface UpdateTaskInput {
  title?: string;
  family_id?: number;
  due_date?: string;
  priority?: 'low' | 'medium' | 'high';
  completed?: boolean;
}

// ============ TASKS CRUD ============

/**
 * Get all tasks for the current advisor
 */
export async function getTasks(options?: {
  familyId?: number;
  completed?: boolean;
  priority?: 'low' | 'medium' | 'high';
  dueBefore?: string;
  limit?: number;
}): Promise<{ data: Task[] | null; error: Error | null }> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, error: new Error('Not authenticated') };
  }

  let query = supabase
    .from('tasks')
    .select(`
      *,
      family:families(name)
    `)
    .eq('advisor_id', user.id)
    .order('due_date', { ascending: true, nullsFirst: false })
    .order('priority', { ascending: false })
    .order('created_at', { ascending: false });

  if (options?.familyId) {
    query = query.eq('family_id', options.familyId);
  }

  if (options?.completed !== undefined) {
    query = query.eq('completed', options.completed);
  }

  if (options?.priority) {
    query = query.eq('priority', options.priority);
  }

  if (options?.dueBefore) {
    query = query.lte('due_date', options.dueBefore);
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  return { data, error };
}

/**
 * Get tasks due today
 */
export async function getTodaysTasks(): Promise<{
  data: Task[] | null;
  error: Error | null;
}> {
  const today = new Date().toISOString().split('T')[0];
  
  return getTasks({
    dueBefore: today,
    completed: false,
  });
}

/**
 * Get overdue tasks
 */
export async function getOverdueTasks(): Promise<{
  data: Task[] | null;
  error: Error | null;
}> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, error: new Error('Not authenticated') };
  }

  const today = new Date().toISOString().split('T')[0];

  const { data, error } = await supabase
    .from('tasks')
    .select(`
      *,
      family:families(name)
    `)
    .eq('advisor_id', user.id)
    .eq('completed', false)
    .lt('due_date', today)
    .order('due_date', { ascending: true });

  return { data, error };
}

/**
 * Get a single task by ID
 */
export async function getTask(taskId: number): Promise<{
  data: Task | null;
  error: Error | null;
}> {
  const { data, error } = await supabase
    .from('tasks')
    .select(`
      *,
      family:families(name)
    `)
    .eq('id', taskId)
    .single();

  return { data, error };
}

/**
 * Create a new task
 */
export async function createTask(input: CreateTaskInput): Promise<{
  data: Task | null;
  error: Error | null;
}> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, error: new Error('Not authenticated') };
  }

  const { data, error } = await supabase
    .from('tasks')
    .insert({
      advisor_id: user.id,
      title: input.title,
      family_id: input.family_id,
      due_date: input.due_date,
      priority: input.priority || 'medium',
      completed: false,
    })
    .select(`
      *,
      family:families(name)
    `)
    .single();

  return { data, error };
}

/**
 * Update a task
 */
export async function updateTask(
  taskId: number,
  input: UpdateTaskInput
): Promise<{ data: Task | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('tasks')
    .update(input)
    .eq('id', taskId)
    .select(`
      *,
      family:families(name)
    `)
    .single();

  return { data, error };
}

/**
 * Toggle task completion status
 */
export async function toggleTaskComplete(taskId: number): Promise<{
  data: Task | null;
  error: Error | null;
}> {
  // First get current status
  const { data: current, error: fetchError } = await supabase
    .from('tasks')
    .select('completed')
    .eq('id', taskId)
    .single();

  if (fetchError || !current) {
    return { data: null, error: fetchError };
  }

  // Toggle it
  const { data, error } = await supabase
    .from('tasks')
    .update({ completed: !current.completed })
    .eq('id', taskId)
    .select(`
      *,
      family:families(name)
    `)
    .single();

  return { data, error };
}

/**
 * Mark task as complete
 */
export async function completeTask(taskId: number): Promise<{
  success: boolean;
  error: Error | null;
}> {
  const { error } = await supabase
    .from('tasks')
    .update({ completed: true })
    .eq('id', taskId);

  return { success: !error, error };
}

/**
 * Mark task as incomplete
 */
export async function uncompleteTask(taskId: number): Promise<{
  success: boolean;
  error: Error | null;
}> {
  const { error } = await supabase
    .from('tasks')
    .update({ completed: false })
    .eq('id', taskId);

  return { success: !error, error };
}

/**
 * Delete a task
 */
export async function deleteTask(taskId: number): Promise<{
  success: boolean;
  error: Error | null;
}> {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', taskId);

  return { success: !error, error };
}

// ============ BULK OPERATIONS ============

/**
 * Complete multiple tasks
 */
export async function completeTasks(taskIds: number[]): Promise<{
  success: boolean;
  error: Error | null;
}> {
  const { error } = await supabase
    .from('tasks')
    .update({ completed: true })
    .in('id', taskIds);

  return { success: !error, error };
}

/**
 * Delete multiple tasks
 */
export async function deleteTasks(taskIds: number[]): Promise<{
  success: boolean;
  error: Error | null;
}> {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .in('id', taskIds);

  return { success: !error, error };
}

// ============ STATISTICS ============

/**
 * Get task statistics for dashboard
 */
export async function getTaskStats(): Promise<{
  total: number;
  completed: number;
  pending: number;
  overdue: number;
  dueToday: number;
  error: Error | null;
}> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return {
      total: 0,
      completed: 0,
      pending: 0,
      overdue: 0,
      dueToday: 0,
      error: new Error('Not authenticated'),
    };
  }

  const today = new Date().toISOString().split('T')[0];

  const { count: total } = await supabase
    .from('tasks')
    .select('*', { count: 'exact', head: true })
    .eq('advisor_id', user.id);

  const { count: completed } = await supabase
    .from('tasks')
    .select('*', { count: 'exact', head: true })
    .eq('advisor_id', user.id)
    .eq('completed', true);

  const { count: pending } = await supabase
    .from('tasks')
    .select('*', { count: 'exact', head: true })
    .eq('advisor_id', user.id)
    .eq('completed', false);

  const { count: overdue } = await supabase
    .from('tasks')
    .select('*', { count: 'exact', head: true })
    .eq('advisor_id', user.id)
    .eq('completed', false)
    .lt('due_date', today);

  const { count: dueToday } = await supabase
    .from('tasks')
    .select('*', { count: 'exact', head: true })
    .eq('advisor_id', user.id)
    .eq('completed', false)
    .eq('due_date', today);

  return {
    total: total || 0,
    completed: completed || 0,
    pending: pending || 0,
    overdue: overdue || 0,
    dueToday: dueToday || 0,
    error: null,
  };
}

// ============ HELPERS ============

export const priorityLabels: Record<string, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export function getPriorityColor(priority: string): string {
  switch (priority) {
    case 'high':
      return 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300';
    case 'medium':
      return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300';
    case 'low':
      return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

export function getPriorityIcon(priority: string): string {
  switch (priority) {
    case 'high':
      return '🔴';
    case 'medium':
      return '🟡';
    case 'low':
      return '🔵';
    default:
      return '⚪';
  }
}

/**
 * Format due date for display
 */
export function formatDueDate(dateString?: string): string {
  if (!dateString) return 'No due date';
  
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const taskDate = new Date(dateString);
  taskDate.setHours(0, 0, 0, 0);

  if (taskDate.getTime() === today.getTime()) {
    return 'Today';
  }
  
  if (taskDate.getTime() === tomorrow.getTime()) {
    return 'Tomorrow';
  }
  
  if (taskDate < today) {
    const diffDays = Math.floor((today.getTime() - taskDate.getTime()) / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays > 1 ? 's' : ''} overdue`;
  }

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Check if task is overdue
 */
export function isTaskOverdue(dueDate?: string): boolean {
  if (!dueDate) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dueDate) < today;
}

/**
 * Check if task is due today
 */
export function isTaskDueToday(dueDate?: string): boolean {
  if (!dueDate) return false;
  const today = new Date().toISOString().split('T')[0];
  return dueDate === today;
}

/**
 * Sort tasks by priority (high first) then by due date
 */
export function sortTasksByPriority(tasks: Task[]): Task[] {
  const priorityOrder: Record<string, number> = { high: 3, medium: 2, low: 1 };
  
  return [...tasks].sort((a, b) => {
    // First by priority
    const priorityDiff = (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
    if (priorityDiff !== 0) return priorityDiff;
    
    // Then by due date (earlier first, null last)
    if (!a.due_date && !b.due_date) return 0;
    if (!a.due_date) return 1;
    if (!b.due_date) return -1;
    return new Date(a.due_date).getTime() - new Date(b.due_date).getTime();
  });
}
