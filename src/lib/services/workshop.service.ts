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

// Re-export types for convenience
export type {
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
};

// ============================================
// CONFIGURATION
// ============================================

// Default to mock mode if not explicitly set to 'live'
const MOCK_MODE = process.env.NEXT_PUBLIC_WORKSHOP_MODE !== 'live';

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

/**
 * Move to previous stage in a workshop
 */
export async function moveToPreviousStage(workshopId: string): Promise<WorkshopStageResult> {
  try {
    const stateResult = await getWorkshopState(workshopId);
    if (!stateResult.success || !stateResult.data) {
      throw new Error('Failed to get workshop state');
    }

    const { stages, currentStage } = stateResult.data;

    if (!currentStage) {
      throw new Error('No current stage found');
    }

    if (currentStage.stage_number === 1) {
      throw new Error('Already at first stage');
    }

    // Find previous stage
    const previousStage = stages.find(
      (stage) => stage.stage_number === currentStage.stage_number - 1
    );

    if (!previousStage) {
      throw new Error('Previous stage not found');
    }

    // Update workshop to point to previous stage
    await updateWorkshop(workshopId, {
      current_stage_id: previousStage.id,
    });

    // Set previous stage to in_progress
    const result = await updateWorkshopStage(previousStage.id, {
      status: 'in_progress',
    });

    return result;
  } catch (error) {
    console.error('Failed to move to previous stage:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to move to previous stage',
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
    {
      id: 'workshop-test-complete',
      advisor_id: advisorId,
      family_id: 'family-1',
      title: 'Johnson Family VMV Workshop - Test',
      description: 'A fully populated test workshop demonstrating the complete VMV process with all stages filled out',
      type: 'vmv',
      status: 'in_progress',
      scheduled_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
      started_at: new Date(Date.now() - 90 * 60 * 1000).toISOString(), // 90 minutes ago
      current_stage_id: 'stage-workshop-test-complete-2',
      metadata: {
        facilitator_notes: 'Great engagement from all family members',
      },
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      updated_at: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
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
  
  // Return fully populated stages for the test workshop
  if (workshopId === 'workshop-test-complete') {
    return [
      {
        id: `stage-${workshopId}-1`,
        workshop_id: workshopId,
        stage_number: 1,
        title: 'Vision Statement',
        description: 'Define the family vision for the future',
        status: 'completed',
        duration_minutes: 45,
        started_at: new Date(Date.now() - 90 * 60 * 1000).toISOString(),
        completed_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        data: {
          statement: 'To be the leading family in sustainable business practices and philanthropic impact, creating generational wealth while preserving our core values and family unity.',
          timeframe: '10-20 years',
          key_elements: [
            'Sustainable business leadership',
            'Generational wealth preservation',
            'Philanthropic excellence',
            'Family unity and values',
          ],
          notes: 'Family unanimously agreed on focusing on sustainability and philanthropy. Strong consensus on the 20-year vision timeframe.',
        },
        metadata: {
          prompts: [
            'What does success look like for our family in 10-20 years?',
            'What legacy do we want to leave?',
            'What impact do we want to have on the world?',
          ],
        },
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
      },
      {
        id: `stage-${workshopId}-2`,
        workshop_id: workshopId,
        stage_number: 2,
        title: 'Mission Statement',
        description: 'Articulate the family mission and purpose',
        status: 'in_progress',
        duration_minutes: 45,
        started_at: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
        data: {
          statement: 'We empower each generation to build upon our legacy through education, entrepreneurship, and ethical stewardship of our resources.',
          core_purpose: 'Empower future generations through education and ethical business practices',
          key_activities: [
            'Family education programs',
            'Entrepreneurship support',
            'Ethical investment practices',
            'Community engagement',
          ],
          notes: 'Currently refining the core purpose statement. Discussion ongoing about balancing business growth with family time.',
        },
        metadata: {
          prompts: [
            'What is our family\'s core purpose?',
            'How do we work together to achieve our vision?',
            'What makes our family unique?',
          ],
        },
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
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
        metadata: {
          prompts: [
            'What principles are most important to us?',
            'How do we make decisions as a family?',
            'What behaviors do we encourage and discourage?',
          ],
        },
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        updated_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];
  }
  
  // Default stages for other workshops
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
      metadata: {
        prompts: [
          'What does success look like for our family in 10-20 years?',
          'What legacy do we want to leave?',
          'What impact do we want to have on the world?',
        ],
      },
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
      metadata: {
        prompts: [
          'What is our family\'s core purpose?',
          'How do we work together to achieve our vision?',
          'What makes our family unique?',
        ],
      },
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
      metadata: {
        prompts: [
          'What principles are most important to us?',
          'How do we make decisions as a family?',
          'What behaviors do we encourage and discourage?',
        ],
      },
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
