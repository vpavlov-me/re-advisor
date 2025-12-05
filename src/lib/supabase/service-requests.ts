import { supabase } from "@/lib/supabaseClient";

// Types
export type ServiceRequestStatus = 
  | "pending_consultant"
  | "awaiting_family_approval"
  | "in_progress"
  | "delivered"
  | "completed_paid"
  | "declined_consultant"
  | "declined_family"
  | "cancelled";

export interface ServiceRequestItem {
  id: number;
  service_request_id: number;
  service_id: number;
  service_name: string;
  service_description?: string;
  price_at_booking: number;
  is_original: boolean;
  added_by: "family" | "consultant";
}

export interface ServiceDeliverable {
  id: number;
  service_request_id: number;
  title: string;
  description?: string;
  external_link?: string;
  uploaded_at: string;
}

export interface ServiceRequest {
  id: number;
  request_number: string;
  family_id: number;
  family_name: string;
  family_email?: string;
  consultant_id: string;
  original_service_id?: number;
  original_service_name: string;
  status: ServiceRequestStatus;
  family_notes?: string;
  consultant_comment?: string;
  decline_reason?: string;
  original_amount: number;
  additional_amount: number;
  total_amount: number;
  estimated_timeline?: string;
  booked_at: string;
  consultant_response_deadline?: string;
  consultant_confirmed_at?: string;
  family_approved_at?: string;
  started_at?: string;
  completed_at?: string;
  paid_at?: string;
  items: ServiceRequestItem[];
  deliverables: ServiceDeliverable[];
}

export interface ConsultantService {
  id: number;
  name: string;
  description: string;
  price: string;
  price_amount: number;
}

// Fetch all service requests for the current consultant
export async function getServiceRequests(): Promise<{
  requests: ServiceRequest[];
  consultantServices: ConsultantService[];
}> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Not authenticated");

  // Fetch service requests from database
  const { data: requestsData, error: requestsError } = await supabase
    .from("service_requests")
    .select(`
      *,
      families:family_id (
        id,
        name,
        email
      ),
      services:original_service_id (
        id,
        name
      )
    `)
    .eq("consultant_id", user.id)
    .order("created_at", { ascending: false });

  if (requestsError) throw requestsError;

  // Fetch items and deliverables for all requests
  const requestIds = requestsData?.map((r: any) => r.id) || [];
  
  let itemsData: any[] = [];
  let deliverablesData: any[] = [];
  
  if (requestIds.length > 0) {
    const [itemsResult, deliverablesResult] = await Promise.all([
      supabase
        .from("service_request_items")
        .select("*")
        .in("service_request_id", requestIds),
      supabase
        .from("service_deliverables")
        .select("*")
        .in("service_request_id", requestIds)
    ]);
    
    itemsData = itemsResult.data || [];
    deliverablesData = deliverablesResult.data || [];
  }

  // Transform data to match component types
  const requests: ServiceRequest[] = (requestsData || []).map((req: any) => ({
    id: req.id,
    request_number: req.request_number || `SR-${req.id}`,
    family_id: req.family_id,
    family_name: req.families?.name || "Unknown Family",
    family_email: req.families?.email || undefined,
    consultant_id: req.consultant_id,
    original_service_id: req.original_service_id,
    original_service_name: req.services?.name || "Service",
    status: req.status as ServiceRequestStatus,
    family_notes: req.family_notes,
    consultant_comment: req.consultant_comment,
    decline_reason: req.decline_reason,
    original_amount: Number(req.original_amount) || 0,
    additional_amount: Number(req.additional_amount) || 0,
    total_amount: Number(req.total_amount) || 0,
    estimated_timeline: req.estimated_timeline,
    booked_at: req.booked_at || req.created_at,
    consultant_response_deadline: req.consultant_response_deadline,
    consultant_confirmed_at: req.consultant_confirmed_at,
    family_approved_at: req.family_approved_at,
    started_at: req.started_at,
    completed_at: req.completed_at,
    paid_at: req.paid_at,
    items: itemsData
      .filter((item: any) => item.service_request_id === req.id)
      .map((item: any) => ({
        id: item.id,
        service_request_id: item.service_request_id,
        service_id: item.service_id,
        service_name: item.service_name,
        service_description: item.service_description,
        price_at_booking: Number(item.price_at_booking) || 0,
        is_original: item.is_original,
        added_by: item.added_by as "family" | "consultant",
      })),
    deliverables: deliverablesData
      .filter((d: any) => d.service_request_id === req.id)
      .map((d: any) => ({
        id: d.id,
        service_request_id: d.service_request_id,
        title: d.title,
        description: d.description,
        external_link: d.external_link,
        uploaded_at: d.uploaded_at,
      })),
  }));

  // Fetch consultant's services for adding to requests
  const { data: servicesData } = await supabase
    .from("services")
    .select("id, name, description, price, price_amount")
    .eq("advisor_id", user.id)
    .eq("status", "active");

  const consultantServices: ConsultantService[] = (servicesData || []).map((s: any) => ({
    id: s.id,
    name: s.name,
    description: s.description || "",
    price: s.price || "$0",
    price_amount: s.price_amount || 0,
  }));

  return { requests, consultantServices };
}

// Update service request status
export async function updateServiceRequestStatus(
  requestId: number,
  status: ServiceRequestStatus,
  additionalData?: {
    consultant_comment?: string;
    decline_reason?: string;
    estimated_timeline?: string;
    additional_amount?: number;
  }
): Promise<ServiceRequest | null> {
  const updateData: any = { status };
  
  if (additionalData?.consultant_comment) {
    updateData.consultant_comment = additionalData.consultant_comment;
  }
  if (additionalData?.decline_reason) {
    updateData.decline_reason = additionalData.decline_reason;
  }
  if (additionalData?.estimated_timeline) {
    updateData.estimated_timeline = additionalData.estimated_timeline;
  }
  if (additionalData?.additional_amount !== undefined) {
    updateData.additional_amount = additionalData.additional_amount;
  }

  // Set timestamp based on status
  const now = new Date().toISOString();
  switch (status) {
    case "awaiting_family_approval":
      updateData.consultant_confirmed_at = now;
      break;
    case "in_progress":
      updateData.started_at = now;
      break;
    case "delivered":
    case "completed_paid":
      updateData.completed_at = now;
      break;
  }

  const { data, error } = await supabase
    .from("service_requests")
    .update(updateData)
    .eq("id", requestId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Add deliverable to service request
export async function addDeliverable(
  requestId: number,
  deliverable: {
    title: string;
    description?: string;
    external_link?: string;
  }
): Promise<ServiceDeliverable> {
  const { data, error } = await supabase
    .from("service_deliverables")
    .insert({
      service_request_id: requestId,
      title: deliverable.title,
      description: deliverable.description,
      external_link: deliverable.external_link,
      uploaded_at: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Add service item to request
export async function addServiceItem(
  requestId: number,
  item: {
    service_id: number;
    service_name: string;
    service_description?: string;
    price_at_booking: number;
  }
): Promise<ServiceRequestItem> {
  const { data, error } = await supabase
    .from("service_request_items")
    .insert({
      service_request_id: requestId,
      service_id: item.service_id,
      service_name: item.service_name,
      service_description: item.service_description,
      price_at_booking: item.price_at_booking,
      is_original: false,
      added_by: "consultant",
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
