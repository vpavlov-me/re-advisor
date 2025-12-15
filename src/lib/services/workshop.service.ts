/**
 * Workshop Service
 * 
 * Service layer for workshop management following RE-Advisor architecture patterns
 */

import { supabase } from '@/lib/supabaseClient';
import type {
  Workshop,
  WorkshopStage,
  WorkshopParticipant,
  WorkshopState,
  WorkshopResult,
  WorkshopsListResult,
  WorkshopStageResult,
  WorkshopStagesListResult,
  WorkshopStateResult,
  CreateWorkshopParams,
  UpdateWorkshopParams,
  UpdateStageParams,
  WorkshopStatus,
  StageStatus,
  WorkshopConfig,
} from '@/types/workshop';

// ============================================
// CONFIGURATION
// ============================================

const MOCK_MODE = process.env.NEXT_PUBLIC_WORKSHOP_MODE === 'mock';

// ============================================
// WORKSHOP CRUD OPERATIONS
// ============================================

/**
 * Get all workshops for an advisor
 */
export async function getWorkshops(
  advisorId: string,
  status?: WorkshopStatus
): Promise<WorkshopsListResult> {
  try {
    if (MOCK_MODE) {
      return {
        success: true,
        data: getMockWorkshops(advisorId, status),
      };
    }

    let query = supabase
      .from('workshops')
      .select('*')
      .eq('advisor_id', advisorId)
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) throw error;

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Failed to get workshops:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get workshops',
    };
  }
}

/**
 * Get a single workshop by ID
 */
export async function getWorkshop(workshopId: string): Promise<WorkshopResult> {
  try {
    if (MOCK_MODE) {
      return {
        success: true,
        data: getMockWorkshop(workshopId),
      };
    }

    const { data, error } = await supabase
      .from('workshops')
      .select('*')
      .eq('id', workshopId)
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Failed to get workshop:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get workshop',
    };
  }
}

/**
 * Create a new workshop
 */
export async function createWorkshop(
  advisorId: string,
  params: CreateWorkshopParams
): Promise<WorkshopResult> {
  try {
    if (MOCK_MODE) {
      return {
        success: true,
        data: createMockWorkshop(advisorId, params),
      };
    }

    const { data, error } = await supabase
      .from('workshops')
      .insert({
        advisor_id: advisorId,
        family_id: params.family_id,
        title: params.title,
        description: params.description,
        type: params.type,
        status: 'draft',
        scheduled_at: params.scheduled_at,
        metadata: params.metadata || {},
      })
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Failed to create workshop:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create workshop',
    };
  }
}

/**
 * Update a workshop
 */
export async function updateWorkshop(
  workshopId: string,
  params: UpdateWorkshopParams
): Promise<WorkshopResult> {
  try {
    if (MOCK_MODE) {
      return {
        success: true,
        data: updateMockWorkshop(workshopId, params),
      };
    }

    const { data, error } = await supabase
      .from('workshops')
      .update({
        ...params,
        updated_at: new Date().toISOString(),
      })
      .eq('id', workshopId)
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Failed to update workshop:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update workshop',
    };
  }
}

/**
 * Delete a workshop
 */
export async function deleteWorkshop(workshopId: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (MOCK_MODE) {
      return { success: true };
    }

    const { error } = await supabase
      .from('workshops')
      .delete()
      .eq('id', workshopId);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Failed to delete workshop:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete workshop',
    };
  }
}

// ============================================
// WORKSHOP STAGE OPERATIONS
// ============================================

/**
 * Get all stages for a workshop
 */
export async function getWorkshopStages(workshopId: string): Promise<WorkshopStagesListResult> {
  try {
    if (MOCK_MODE) {
      return {
        success: true,
        data: getMockWorkshopStages(workshopId),
      };
    }

    const { data, error } = await supabase
      .from('workshop_stages')
      .select('*')
      .eq('workshop_id', workshopId)
      .order('stage_number', { ascending: true });

    if (error) throw error;

    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Failed to get workshop stages:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get workshop stages',
    };
  }
}

/**
 * Update a workshop stage
 */
export async function updateWorkshopStage(
  stageId: string,
  params: UpdateStageParams
): Promise<WorkshopStageResult> {
  try {
    if (MOCK_MODE) {
      return {
        success: true,
        data: updateMockWorkshopStage(stageId, params),
      };
    }

    const { data, error } = await supabase
      .from('workshop_stages')
      .update({
        ...params,
        updated_at: new Date().toISOString(),
      })
      .eq('id', stageId)
      .select()
      .single();

    if (error) throw error;

    return { success: true, data };
  } catch (error) {
    console.error('Failed to update workshop stage:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update workshop stage',
    };
  }
}

// ============================================
// WORKSHOP STATE OPERATIONS
// ============================================

/**
 * Get complete workshop state (workshop + stages + participants)
 */
export async function getWorkshopState(workshopId: string): Promise<WorkshopStateResult> {
  try {
    if (MOCK_MODE) {
      return {
        success: true,
        data: getMockWorkshopState(workshopId),
      };
    }

    // Get workshop
    const workshopResult = await getWorkshop(workshopId);
    if (!workshopResult.success || !workshopResult.data) {
      throw new Error('Workshop not found');
    }

    // Get stages
    const stagesResult = await getWorkshopStages(workshopId);
    if (!stagesResult.success) {
      throw new Error('Failed to get workshop stages');
    }

    // Get participants
    const { data: participants, error: participantsError } = await supabase
      .from('workshop_participants')
      .select('*')
      .eq('workshop_id', workshopId);

    if (participantsError) throw participantsError;

    const stages = stagesResult.data || [];
    const currentStage = stages.find(
      (stage) => stage.id === workshopResult.data?.current_stage_id
    );

    const state: WorkshopState = {
      workshop: workshopResult.data,
      stages,
      currentStage,
      participants: participants || [],
    };

    return { success: true, data: state };
  } catch (error) {
    console.error('Failed to get workshop state:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get workshop state',
    };
  }
}

/**
 * Start a workshop
 */
export async function startWorkshop(workshopId: string): Promise<WorkshopResult> {
  try {
    // Get the first stage
    const stagesResult = await getWorkshopStages(workshopId);
    if (!stagesResult.success || !stagesResult.data || stagesResult.data.length === 0) {
      throw new Error('No stages found for workshop');
    }

    const firstStage = stagesResult.data[0];

    // Update workshop status and set current stage
    const result = await updateWorkshop(workshopId, {
      status: 'in_progress',
      current_stage_id: firstStage.id,
    });

    if (!result.success) {
      throw new Error(result.error || 'Failed to start workshop');
    }

    // Update first stage status
    await updateWorkshopStage(firstStage.id, {
      status: 'in_progress',
    });

    return result;
  } catch (error) {
    console.error('Failed to start workshop:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to start workshop',
    };
  }
}

/**
 * Complete a workshop
 */
export async function completeWorkshop(workshopId: string): Promise<WorkshopResult> {
  return updateWorkshop(workshopId, {
    status: 'completed',
  });
}

/**
 * Move to next stage in a workshop
 */
export async function moveToNextStage(workshopId: string): Promise<WorkshopStageResult> {
  try {
    const stateResult = await getWorkshopState(workshopId);
    if (!stateResult.success || !stateResult.data) {
      throw new Error('Failed to get workshop state');
    }

    const { stages, currentStage } = stateResult.data;

    if (!currentStage) {
      throw new Error('No current stage found');
    }

    // Complete current stage
    await updateWorkshopStage(currentStage.id, {
      status: 'completed',
    });

    // Find next stage
    const nextStage = stages.find(
      (stage) => stage.stage_number === currentStage.stage_number + 1
    );

    if (!nextStage) {
      // No more stages, complete the workshop
      await completeWorkshop(workshopId);
      return {
        success: true,
        data: currentStage,
      };
    }

    // Update workshop to point to next stage
    await updateWorkshop(workshopId, {
      current_stage_id: nextStage.id,
    });

    // Start next stage
    const result = await updateWorkshopStage(nextStage.id, {
      status: 'in_progress',
    });

    return result;
  } catch (error) {
    console.error('Failed to move to next stage:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to move to next stage',
    };
  }
}

// ============================================
// WORKSHOP TEMPLATES
// ============================================

/**
 * Create a workshop from a template configuration
 */
export async function createWorkshopFromTemplate(
  advisorId: string,
  familyId: string,
  config: WorkshopConfig
): Promise<WorkshopResult> {
  try {
    // Create the workshop
    const workshopResult = await createWorkshop(advisorId, {
      family_id: familyId,
      title: config.title,
      description: config.description,
      type: config.type,
      metadata: config.metadata || {},
    });

    if (!workshopResult.success || !workshopResult.data) {
      throw new Error(workshopResult.error || 'Failed to create workshop');
    }

    const workshop = workshopResult.data;

    // Create stages
    if (!MOCK_MODE) {
      for (const stageConfig of config.stages) {
        await supabase.from('workshop_stages').insert({
          workshop_id: workshop.id,
          stage_number: stageConfig.order,
          title: stageConfig.title,
          description: stageConfig.description,
          duration_minutes: stageConfig.duration_minutes,
          status: 'not_started',
          data: {},
          metadata: stageConfig.metadata || {},
        });
      }
    }

    return { success: true, data: workshop };
  } catch (error) {
    console.error('Failed to create workshop from template:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create workshop from template',
    };
  }
}

// ============================================
// MOCK DATA HELPERS
// ============================================

function getMockWorkshops(advisorId: string, status?: WorkshopStatus): Workshop[] {
  const now = new Date().toISOString();
  const workshops: Workshop[] = [
    {
      id: 'workshop-1',
      advisor_id: advisorId,
      family_id: 'family-1',
      title: 'Family Vision, Mission & Values Workshop',
      description: 'Define the core vision, mission, and values for the family',
      type: 'vmv',
      status: 'scheduled',
      scheduled_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      metadata: {},
      created_at: now,
      updated_at: now,
    },
    {
      id: 'workshop-2',
      advisor_id: advisorId,
      family_id: 'family-2',
      title: 'Succession Planning Workshop',
      description: 'Plan the succession strategy for family business',
      type: 'custom',
      status: 'draft',
      metadata: {},
      created_at: now,
      updated_at: now,
    },
  ];

  return status ? workshops.filter((w) => w.status === status) : workshops;
}

function getMockWorkshop(workshopId: string): Workshop {
  const now = new Date().toISOString();
  return {
    id: workshopId,
    advisor_id: 'current-advisor',
    family_id: 'family-1',
    title: 'Family Vision, Mission & Values Workshop',
    description: 'Define the core vision, mission, and values for the family',
    type: 'vmv',
    status: 'draft',
    metadata: {},
    created_at: now,
    updated_at: now,
  };
}

function createMockWorkshop(advisorId: string, params: CreateWorkshopParams): Workshop {
  const now = new Date().toISOString();
  return {
    id: `workshop-${Date.now()}`,
    advisor_id: advisorId,
    family_id: params.family_id,
    title: params.title,
    description: params.description,
    type: params.type,
    status: 'draft',
    scheduled_at: params.scheduled_at,
    metadata: params.metadata || {},
    created_at: now,
    updated_at: now,
  };
}

function updateMockWorkshop(workshopId: string, params: UpdateWorkshopParams): Workshop {
  const now = new Date().toISOString();
  return {
    id: workshopId,
    advisor_id: 'current-advisor',
    family_id: 'family-1',
    title: params.title || 'Workshop',
    description: params.description,
    type: 'vmv',
    status: params.status || 'draft',
    scheduled_at: params.scheduled_at,
    current_stage_id: params.current_stage_id,
    metadata: params.metadata || {},
    created_at: now,
    updated_at: now,
  };
}

function getMockWorkshopStages(workshopId: string): WorkshopStage[] {
  const now = new Date().toISOString();
  return [
    {
      id: `stage-${workshopId}-1`,
      workshop_id: workshopId,
      stage_number: 1,
      title: 'Vision Statement',
      description: 'Define the family vision for the future',
      status: 'not_started',
      duration_minutes: 45,
      data: {},
      metadata: {},
      created_at: now,
      updated_at: now,
    },
    {
      id: `stage-${workshopId}-2`,
      workshop_id: workshopId,
      stage_number: 2,
      title: 'Mission Statement',
      description: 'Articulate the family mission and purpose',
      status: 'not_started',
      duration_minutes: 45,
      data: {},
      metadata: {},
      created_at: now,
      updated_at: now,
    },
    {
      id: `stage-${workshopId}-3`,
      workshop_id: workshopId,
      stage_number: 3,
      title: 'Core Values',
      description: 'Identify and prioritize core family values',
      status: 'not_started',
      duration_minutes: 60,
      data: {},
      metadata: {},
      created_at: now,
      updated_at: now,
    },
  ];
}

function updateMockWorkshopStage(stageId: string, params: UpdateStageParams): WorkshopStage {
  const now = new Date().toISOString();
  return {
    id: stageId,
    workshop_id: 'workshop-1',
    stage_number: 1,
    title: 'Vision Statement',
    description: 'Define the family vision for the future',
    status: params.status || 'not_started',
    duration_minutes: 45,
    data: params.data || {},
    metadata: params.metadata || {},
    created_at: now,
    updated_at: now,
  };
}

function getMockWorkshopState(workshopId: string): WorkshopState {
  const workshop = getMockWorkshop(workshopId);
  const stages = getMockWorkshopStages(workshopId);
  return {
    workshop,
    stages,
    currentStage: stages[0],
    participants: [],
  };
}
