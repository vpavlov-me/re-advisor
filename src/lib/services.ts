import { supabase } from './supabaseClient';
import type { Service, ServiceType } from './database.types';

export interface CreateServiceInput {
  name: string;
  service_type_id: number | null;
  description: string | null;
  rate: number | null;
  rate_type: 'hourly' | 'fixed' | 'retainer';
  max_clients: number | null;
  is_published: boolean;
}

export interface UpdateServiceInput extends Partial<CreateServiceInput> {
  id: number;
}

// Get all service types
export async function getServiceTypes(): Promise<{ data: ServiceType[] | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('service_types')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  return { data, error };
}

// Get service types grouped by category
export async function getServiceTypesGrouped(): Promise<{ 
  data: Record<string, ServiceType[]> | null; 
  error: Error | null 
}> {
  const { data, error } = await getServiceTypes();
  
  if (error || !data) {
    return { data: null, error };
  }

  const grouped = data.reduce((acc, type) => {
    const category = type.category || 'other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(type);
    return acc;
  }, {} as Record<string, ServiceType[]>);

  return { data: grouped, error: null };
}

// Get all services for the current advisor
export async function getServices(): Promise<{ data: Service[] | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('services')
    .select(`
      *,
      service_type:service_types(*)
    `)
    .is('family_id', null) // Get template services (not assigned to a family)
    .order('created_at', { ascending: false });

  return { data, error };
}

// Get a single service by ID
export async function getServiceById(id: number): Promise<{ data: Service | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('services')
    .select(`
      *,
      service_type:service_types(*)
    `)
    .eq('id', id)
    .single();

  return { data, error };
}

// Create a new service
export async function createService(input: CreateServiceInput): Promise<{ data: Service | null; error: Error | null }> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { data: null, error: new Error('Not authenticated') };
  }

  const { data, error } = await supabase
    .from('services')
    .insert({
      advisor_id: user.id,
      name: input.name,
      service_type_id: input.service_type_id,
      description: input.description,
      rate: input.rate,
      rate_type: input.rate_type,
      max_clients: input.max_clients,
      is_published: input.is_published,
      status: input.is_published ? 'Active' : 'Pending',
      progress: 0,
      current_clients: 0,
    })
    .select(`
      *,
      service_type:service_types(*)
    `)
    .single();

  return { data, error };
}

// Update a service
export async function updateService(input: UpdateServiceInput): Promise<{ data: Service | null; error: Error | null }> {
  const { id, ...updates } = input;
  
  // If publishing status changes, update the status field too
  if (updates.is_published !== undefined) {
    (updates as any).status = updates.is_published ? 'Active' : 'Pending';
  }

  const { data, error } = await supabase
    .from('services')
    .update(updates)
    .eq('id', id)
    .select(`
      *,
      service_type:service_types(*)
    `)
    .single();

  return { data, error };
}

// Delete a service
export async function deleteService(id: number): Promise<{ error: Error | null }> {
  const { error } = await supabase
    .from('services')
    .delete()
    .eq('id', id);

  return { error };
}

// Toggle service publish status
export async function toggleServicePublish(id: number, isPublished: boolean): Promise<{ data: Service | null; error: Error | null }> {
  const { data, error } = await supabase
    .from('services')
    .update({
      is_published: isPublished,
      status: isPublished ? 'Active' : 'Pending',
    })
    .eq('id', id)
    .select(`
      *,
      service_type:service_types(*)
    `)
    .single();

  return { data, error };
}

// Get published services count
export async function getPublishedServicesCount(): Promise<{ count: number; error: Error | null }> {
  const { count, error } = await supabase
    .from('services')
    .select('*', { count: 'exact', head: true })
    .is('family_id', null)
    .eq('is_published', true);

  return { count: count || 0, error };
}

// Duplicate a service
export async function duplicateService(id: number): Promise<{ data: Service | null; error: Error | null }> {
  const { data: original, error: fetchError } = await getServiceById(id);
  
  if (fetchError || !original) {
    return { data: null, error: fetchError || new Error('Service not found') };
  }

  return createService({
    name: `${original.name} (Copy)`,
    service_type_id: original.service_type_id,
    description: original.description,
    rate: original.rate,
    rate_type: original.rate_type,
    max_clients: original.max_clients,
    is_published: false, // Copies start as unpublished
  });
}
