/**
 * StageManager
 * 
 * Manages stage transitions and validation for workshops
 */

import type {
  WorkshopStage,
  StageStatus,
  StageTransition,
  StageValidation,
} from '@/types/workshop';

import {
  updateWorkshopStage,
  moveToNextStage as moveToNextStageService,
  moveToPreviousStage as moveToPreviousStageService,
} from '@/lib/services/workshop.service';

export interface StageManagerConfig {
  stages: WorkshopStage[];
  currentStageId?: string;
  onStageChange?: (stage: WorkshopStage) => void;
  onValidationError?: (errors: string[]) => void;
}

export class StageManager {
  private stages: WorkshopStage[];
  private currentStageId?: string;
  private onStageChange?: (stage: WorkshopStage) => void;
  private onValidationError?: (errors: string[]) => void;
  private transitionHistory: StageTransition[] = [];

  constructor(config: StageManagerConfig) {
    this.stages = config.stages;
    this.currentStageId = config.currentStageId;
    this.onStageChange = config.onStageChange;
    this.onValidationError = config.onValidationError;
  }

  /**
   * Get all stages
   */
  getStages(): WorkshopStage[] {
    return this.stages;
  }

  /**
   * Get current stage
   */
  getCurrentStage(): WorkshopStage | null {
    if (!this.currentStageId) return null;
    return this.stages.find(s => s.id === this.currentStageId) || null;
  }

  /**
   * Get stage by ID
   */
  getStage(stageId: string): WorkshopStage | null {
    return this.stages.find(s => s.id === stageId) || null;
  }

  /**
   * Get stage by number
   */
  getStageByNumber(stageNumber: number): WorkshopStage | null {
    return this.stages.find(s => s.stage_number === stageNumber) || null;
  }

  /**
   * Get next stage
   */
  getNextStage(): WorkshopStage | null {
    const current = this.getCurrentStage();
    if (!current) return this.stages[0] || null;
    
    return this.stages.find(s => s.stage_number === current.stage_number + 1) || null;
  }

  /**
   * Get previous stage
   */
  getPreviousStage(): WorkshopStage | null {
    const current = this.getCurrentStage();
    if (!current || current.stage_number === 1) return null;
    
    return this.stages.find(s => s.stage_number === current.stage_number - 1) || null;
  }

  /**
   * Check if stage can be accessed
   */
  canAccessStage(stageNumber: number): boolean {
    // Can access current stage
    const current = this.getCurrentStage();
    if (current && current.stage_number === stageNumber) return true;

    // Can access completed stages
    const stage = this.getStageByNumber(stageNumber);
    if (stage && stage.status === 'completed') return true;

    // Can access next stage if current is completed
    if (current?.status === 'completed' && current.stage_number + 1 === stageNumber) {
      return true;
    }

    return false;
  }

  /**
   * Check if can move to next stage
   */
  canMoveToNext(): boolean {
    const current = this.getCurrentStage();
    if (!current) return false;
    
    const next = this.getNextStage();
    if (!next) return false;

    // Current stage should be in progress or completed
    return current.status === 'in_progress' || current.status === 'completed';
  }

  /**
   * Check if can move to previous stage
   */
  canMoveToPrevious(): boolean {
    const current = this.getCurrentStage();
    if (!current || current.stage_number === 1) return false;
    
    return true;
  }

  /**
   * Validate stage data
   */
  async validateStage(stage: WorkshopStage, validation?: StageValidation): Promise<string[]> {
    const errors: string[] = [];

    if (!validation) return errors;

    // Check required fields
    if (validation.required_fields) {
      for (const field of validation.required_fields) {
        if (!stage.data[field]) {
          errors.push(`${field} is required`);
        }
      }
    }

    // Check minimum duration
    if (validation.min_duration) {
      if (!stage.started_at || !stage.completed_at) {
        errors.push('Stage must be started and completed');
      } else {
        const start = new Date(stage.started_at).getTime();
        const end = new Date(stage.completed_at).getTime();
        const durationMinutes = (end - start) / 1000 / 60;
        
        if (durationMinutes < validation.min_duration) {
          errors.push(`Stage duration must be at least ${validation.min_duration} minutes`);
        }
      }
    }

    // Custom validation
    if (validation.custom_validation) {
      try {
        const isValid = await validation.custom_validation(stage.data);
        if (!isValid) {
          errors.push('Custom validation failed');
        }
      } catch (error) {
        errors.push('Custom validation error');
      }
    }

    return errors;
  }

  /**
   * Update stage status
   */
  async updateStageStatus(stageId: string, status: StageStatus): Promise<void> {
    const stage = this.getStage(stageId);
    if (!stage) {
      throw new Error('Stage not found');
    }

    const result = await updateWorkshopStage(stageId, { status });
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to update stage status');
    }

    // Update local state
    stage.status = status;
    
    if (status === 'in_progress' && !stage.started_at) {
      stage.started_at = new Date().toISOString();
    } else if (status === 'completed' && !stage.completed_at) {
      stage.completed_at = new Date().toISOString();
    }
  }

  /**
   * Update stage data
   */
  async updateStageData(stageId: string, data: Record<string, unknown>): Promise<void> {
    const stage = this.getStage(stageId);
    if (!stage) {
      throw new Error('Stage not found');
    }

    const result = await updateWorkshopStage(stageId, { data });
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to update stage data');
    }

    // Update local state
    stage.data = data;
  }

  /**
   * Move to next stage
   */
  async moveToNext(workshopId: string, triggeredBy: string): Promise<WorkshopStage | null> {
    if (!this.canMoveToNext()) {
      throw new Error('Cannot move to next stage');
    }

    const current = this.getCurrentStage();
    const next = this.getNextStage();
    
    if (!next) return null;

    const result = await moveToNextStageService(workshopId);
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to move to next stage');
    }

    // Record transition
    this.recordTransition({
      from_stage_id: current?.id,
      to_stage_id: next.id,
      timestamp: new Date().toISOString(),
      triggered_by: triggeredBy,
    });

    // Update current stage
    this.currentStageId = next.id;

    // Notify listeners
    if (this.onStageChange) {
      this.onStageChange(next);
    }

    return next;
  }

  /**
   * Move to previous stage
   */
  async moveToPrevious(workshopId: string, triggeredBy: string): Promise<WorkshopStage | null> {
    if (!this.canMoveToPrevious()) {
      throw new Error('Cannot move to previous stage');
    }

    const current = this.getCurrentStage();
    const previous = this.getPreviousStage();
    
    if (!previous) return null;

    const result = await moveToPreviousStageService(workshopId);
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to move to previous stage');
    }

    // Record transition
    this.recordTransition({
      from_stage_id: current?.id,
      to_stage_id: previous.id,
      timestamp: new Date().toISOString(),
      triggered_by: triggeredBy,
    });

    // Update current stage
    this.currentStageId = previous.id;

    // Notify listeners
    if (this.onStageChange) {
      this.onStageChange(previous);
    }

    return previous;
  }

  /**
   * Jump to specific stage
   */
  async jumpToStage(workshopId: string, stageNumber: number, triggeredBy: string): Promise<WorkshopStage | null> {
    if (!this.canAccessStage(stageNumber)) {
      throw new Error('Cannot access this stage');
    }

    const current = this.getCurrentStage();
    const target = this.getStageByNumber(stageNumber);
    
    if (!target) {
      throw new Error('Stage not found');
    }

    // Update current stage ID
    const result = await updateWorkshopStage(target.id, { status: 'in_progress' });
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to jump to stage');
    }

    // Record transition
    this.recordTransition({
      from_stage_id: current?.id,
      to_stage_id: target.id,
      timestamp: new Date().toISOString(),
      triggered_by: triggeredBy,
    });

    // Update current stage
    this.currentStageId = target.id;

    // Notify listeners
    if (this.onStageChange) {
      this.onStageChange(target);
    }

    return target;
  }

  /**
   * Get transition history
   */
  getTransitionHistory(): StageTransition[] {
    return [...this.transitionHistory];
  }

  /**
   * Calculate stage progress
   */
  getStageProgress(): number {
    const completed = this.stages.filter(s => s.status === 'completed').length;
    return Math.round((completed / this.stages.length) * 100);
  }

  /**
   * Record a stage transition
   */
  private recordTransition(transition: StageTransition): void {
    this.transitionHistory.push(transition);
  }

  /**
   * Update stages
   */
  updateStages(stages: WorkshopStage[]): void {
    this.stages = stages;
  }

  /**
   * Update current stage ID
   */
  setCurrentStageId(stageId: string | undefined): void {
    this.currentStageId = stageId;
  }
}
