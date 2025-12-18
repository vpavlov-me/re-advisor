/**
 * WorkshopEngine
 * 
 * Core engine for managing workshop lifecycle and orchestrating workshop operations
 */

import type {
  Workshop,
  WorkshopStage,
  WorkshopState,
  WorkshopStatus,
  StageStatus,
} from '@/types/workshop';

import {
  getWorkshopState,
  updateWorkshop,
  startWorkshop as startWorkshopService,
  completeWorkshop as completeWorkshopService,
} from '@/lib/services/workshop.service';

export interface WorkshopEngineConfig {
  workshopId: string;
  onStateChange?: (state: WorkshopState) => void;
  onError?: (error: Error) => void;
}

export class WorkshopEngine {
  private workshopId: string;
  private currentState: WorkshopState | null = null;
  private listeners: Set<(state: WorkshopState) => void> = new Set();
  private onError?: (error: Error) => void;

  constructor(config: WorkshopEngineConfig) {
    this.workshopId = config.workshopId;
    this.onError = config.onError;
    
    if (config.onStateChange) {
      this.listeners.add(config.onStateChange);
    }
  }

  /**
   * Initialize the workshop engine and load current state
   */
  async initialize(): Promise<void> {
    try {
      const result = await getWorkshopState(this.workshopId);
      
      if (result.success && result.data) {
        this.currentState = result.data;
        this.notifyListeners();
      } else {
        throw new Error(result.error || 'Failed to load workshop state');
      }
    } catch (error) {
      this.handleError(error as Error);
      throw error;
    }
  }

  /**
   * Get the current workshop state
   */
  getState(): WorkshopState | null {
    return this.currentState;
  }

  /**
   * Get the current workshop
   */
  getWorkshop(): Workshop | null {
    return this.currentState?.workshop || null;
  }

  /**
   * Get all stages
   */
  getStages(): WorkshopStage[] {
    return this.currentState?.stages || [];
  }

  /**
   * Get the current active stage
   */
  getCurrentStage(): WorkshopStage | null {
    return this.currentState?.currentStage || null;
  }

  /**
   * Check if workshop can be started
   */
  canStart(): boolean {
    const workshop = this.getWorkshop();
    return workshop?.status === 'draft' || workshop?.status === 'scheduled';
  }

  /**
   * Start the workshop
   */
  async start(): Promise<void> {
    if (!this.canStart()) {
      throw new Error('Workshop cannot be started in current state');
    }

    try {
      const result = await startWorkshopService(this.workshopId);
      
      if (result.success) {
        await this.refresh();
      } else {
        throw new Error(result.error || 'Failed to start workshop');
      }
    } catch (error) {
      this.handleError(error as Error);
      throw error;
    }
  }

  /**
   * Check if workshop is in progress
   */
  isInProgress(): boolean {
    return this.getWorkshop()?.status === 'in_progress';
  }

  /**
   * Check if workshop is completed
   */
  isCompleted(): boolean {
    return this.getWorkshop()?.status === 'completed';
  }

  /**
   * Complete the workshop
   */
  async complete(): Promise<void> {
    if (!this.isInProgress()) {
      throw new Error('Workshop must be in progress to complete');
    }

    try {
      const result = await completeWorkshopService(this.workshopId);
      
      if (result.success) {
        await this.refresh();
      } else {
        throw new Error(result.error || 'Failed to complete workshop');
      }
    } catch (error) {
      this.handleError(error as Error);
      throw error;
    }
  }

  /**
   * Update workshop status
   */
  async updateStatus(status: WorkshopStatus): Promise<void> {
    try {
      const result = await updateWorkshop(this.workshopId, { status });
      
      if (result.success) {
        await this.refresh();
      } else {
        throw new Error(result.error || 'Failed to update workshop status');
      }
    } catch (error) {
      this.handleError(error as Error);
      throw error;
    }
  }

  /**
   * Calculate workshop progress
   */
  getProgress(): number {
    const stages = this.getStages();
    if (stages.length === 0) return 0;
    
    const completed = stages.filter(s => s.status === 'completed').length;
    return Math.round((completed / stages.length) * 100);
  }

  /**
   * Get workshop duration estimate
   */
  getEstimatedDuration(): number {
    const stages = this.getStages();
    return stages.reduce((total, stage) => total + (stage.duration_minutes || 0), 0);
  }

  /**
   * Get elapsed time
   */
  getElapsedTime(): number {
    const workshop = this.getWorkshop();
    if (!workshop?.started_at) return 0;
    
    const start = new Date(workshop.started_at).getTime();
    const end = workshop.completed_at 
      ? new Date(workshop.completed_at).getTime()
      : Date.now();
    
    return Math.floor((end - start) / 1000 / 60); // minutes
  }

  /**
   * Subscribe to state changes
   */
  subscribe(listener: (state: WorkshopState) => void): () => void {
    this.listeners.add(listener);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Refresh workshop state
   */
  async refresh(): Promise<void> {
    await this.initialize();
  }

  /**
   * Notify all listeners of state change
   */
  private notifyListeners(): void {
    if (this.currentState) {
      const currentState = this.currentState;
      this.listeners.forEach(listener => {
        try {
          listener(currentState);
        } catch (error) {
          console.error('Listener error:', error);
        }
      });
    }
  }

  /**
   * Handle errors
   */
  private handleError(error: Error): void {
    console.error('[WorkshopEngine] Error:', error);
    
    if (this.onError) {
      this.onError(error);
    }
  }

  /**
   * Cleanup
   */
  dispose(): void {
    this.listeners.clear();
    this.currentState = null;
  }
}
