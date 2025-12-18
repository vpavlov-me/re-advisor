/**
 * Workshop Types
 * 
 * Core type definitions for the modular workshop system
 */

// ============================================
// ENUM TYPES
// ============================================

export type WorkshopStatus = 'draft' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
export type WorkshopType = 'vmv' | 'custom';
export type StageStatus = 'not_started' | 'in_progress' | 'completed' | 'skipped';
export type ParticipantRole = 'facilitator' | 'participant' | 'observer';

// ============================================
// WORKSHOP TYPES
// ============================================

export interface Workshop {
  id: string;
  advisor_id: string;
  family_id: string;
  title: string;
  description?: string;
  type: WorkshopType;
  status: WorkshopStatus;
  scheduled_at?: string;
  started_at?: string;
  completed_at?: string;
  current_stage_id?: string;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface WorkshopStage {
  id: string;
  workshop_id: string;
  stage_number: number;
  title: string;
  description?: string;
  status: StageStatus;
  duration_minutes?: number;
  started_at?: string;
  completed_at?: string;
  data: Record<string, unknown>;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export interface WorkshopParticipant {
  id: string;
  workshop_id: string;
  user_id: string;
  role: ParticipantRole;
  joined_at: string;
  left_at?: string;
  metadata: Record<string, unknown>;
}

// ============================================
// WORKSHOP ENGINE TYPES
// ============================================

export interface WorkshopConfig {
  type: WorkshopType;
  title: string;
  description?: string;
  stages: StageConfig[];
  metadata?: Record<string, unknown>;
}

export interface StageConfig {
  title: string;
  description?: string;
  duration_minutes?: number;
  order: number;
  component?: string;
  validation?: StageValidation;
  metadata?: Record<string, unknown>;
}

export interface StageValidation {
  required_fields?: string[];
  min_duration?: number;
  custom_validation?: (data: Record<string, unknown>) => boolean | Promise<boolean>;
}

export interface WorkshopState {
  workshop: Workshop;
  stages: WorkshopStage[];
  currentStage?: WorkshopStage;
  participants: WorkshopParticipant[];
}

export interface StageTransition {
  from_stage_id?: string;
  to_stage_id: string;
  timestamp: string;
  triggered_by: string;
}

// ============================================
// VMV WORKSHOP SPECIFIC TYPES
// ============================================

export interface VMVWorkshopData {
  vision?: {
    statement?: string;
    timeframe?: string;
    key_elements?: string[];
    notes?: string;
  };
  mission?: {
    statement?: string;
    core_purpose?: string;
    key_activities?: string[];
    notes?: string;
  };
  values?: {
    core_values?: Array<{
      name: string;
      description: string;
      priority: number;
    }>;
    notes?: string;
  };
}

// ============================================
// SERVICE RESULT TYPES
// ============================================

export interface WorkshopResult {
  success: boolean;
  data?: Workshop;
  error?: string;
}

export interface WorkshopsListResult {
  success: boolean;
  data?: Workshop[];
  error?: string;
}

export interface WorkshopStageResult {
  success: boolean;
  data?: WorkshopStage;
  error?: string;
}

export interface WorkshopStagesListResult {
  success: boolean;
  data?: WorkshopStage[];
  error?: string;
}

export interface WorkshopStateResult {
  success: boolean;
  data?: WorkshopState;
  error?: string;
}

// ============================================
// CREATE/UPDATE PARAMS
// ============================================

export interface CreateWorkshopParams {
  family_id: string;
  title: string;
  description?: string;
  type: WorkshopType;
  scheduled_at?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateWorkshopParams {
  title?: string;
  description?: string;
  status?: WorkshopStatus;
  scheduled_at?: string;
  current_stage_id?: string;
  metadata?: Record<string, unknown>;
}

export interface UpdateStageParams {
  status?: StageStatus;
  data?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}
