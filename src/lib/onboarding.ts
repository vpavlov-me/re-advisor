// Onboarding Progress Tracking
import { supabase } from './supabaseClient';
import type { OnboardingStep } from './database.types';

export type OnboardingStepName = 
  | 'profile_basics'
  | 'credentials'
  | 'services'
  | 'stripe_setup'
  | 'availability';

export interface OnboardingStepConfig {
  name: OnboardingStepName;
  title: string;
  description: string;
  icon: string; // Icon name from lucide-react
  order: number;
  required: boolean;
}

export const ONBOARDING_STEPS: OnboardingStepConfig[] = [
  {
    name: 'profile_basics',
    title: 'Complete Your Profile',
    description: 'Add your name, photo, and professional details',
    icon: 'User',
    order: 1,
    required: true,
  },
  {
    name: 'credentials',
    title: 'Add Credentials',
    description: 'Upload your certifications and qualifications',
    icon: 'Award',
    order: 2,
    required: false,
  },
  {
    name: 'services',
    title: 'Set Up Services',
    description: 'Create your first service offering',
    icon: 'Briefcase',
    order: 3,
    required: true,
  },
  {
    name: 'stripe_setup',
    title: 'Connect Payments',
    description: 'Set up Stripe to receive payments',
    icon: 'CreditCard',
    order: 4,
    required: true,
  },
  {
    name: 'availability',
    title: 'Set Availability',
    description: 'Configure your working hours',
    icon: 'Calendar',
    order: 5,
    required: false,
  },
];

export interface OnboardingProgress {
  currentStep: number;
  totalSteps: number;
  percentage: number;
  steps: Array<{
    config: OnboardingStepConfig;
    completed: boolean;
    completedAt: string | null;
  }>;
  isComplete: boolean;
  requiredComplete: boolean;
  nextStep: OnboardingStepConfig | null;
}

/**
 * Get onboarding progress for a user
 */
export async function getOnboardingProgress(userId: string): Promise<{
  progress: OnboardingProgress;
  error: Error | null;
}> {
  try {
    // Fetch completed steps from database
    const { data: completedSteps, error } = await supabase
      .from('onboarding_steps')
      .select('*')
      .eq('advisor_id', userId);

    if (error) {
      throw error;
    }

    const completedStepNames = new Set(
      completedSteps?.filter(s => s.completed).map(s => s.step_name) || []
    );

    const steps = ONBOARDING_STEPS.map(config => ({
      config,
      completed: completedStepNames.has(config.name),
      completedAt: completedSteps?.find(s => s.step_name === config.name)?.completed_at || null,
    }));

    const completedCount = steps.filter(s => s.completed).length;
    const requiredSteps = steps.filter(s => s.config.required);
    const requiredComplete = requiredSteps.every(s => s.completed);
    
    // Find next incomplete step
    const nextStep = steps.find(s => !s.completed)?.config || null;

    return {
      progress: {
        currentStep: completedCount + 1,
        totalSteps: ONBOARDING_STEPS.length,
        percentage: Math.round((completedCount / ONBOARDING_STEPS.length) * 100),
        steps,
        isComplete: completedCount === ONBOARDING_STEPS.length,
        requiredComplete,
        nextStep,
      },
      error: null,
    };
  } catch (err) {
    return {
      progress: {
        currentStep: 1,
        totalSteps: ONBOARDING_STEPS.length,
        percentage: 0,
        steps: ONBOARDING_STEPS.map(config => ({
          config,
          completed: false,
          completedAt: null,
        })),
        isComplete: false,
        requiredComplete: false,
        nextStep: ONBOARDING_STEPS[0],
      },
      error: err as Error,
    };
  }
}

/**
 * Mark an onboarding step as complete
 */
export async function completeOnboardingStep(
  userId: string,
  stepName: OnboardingStepName,
  data?: Record<string, unknown>
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { error } = await supabase
      .from('onboarding_steps')
      .upsert({
        advisor_id: userId,
        step_name: stepName,
        completed: true,
        completed_at: new Date().toISOString(),
        data: data || null,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'advisor_id,step_name',
      });

    if (error) throw error;

    // Update overall onboarding progress in profile
    const { progress } = await getOnboardingProgress(userId);
    await supabase
      .from('profiles')
      .update({ 
        onboarding_progress: progress.percentage,
        is_first_login: !progress.requiredComplete,
      })
      .eq('id', userId);

    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err as Error };
  }
}

/**
 * Reset an onboarding step (mark as incomplete)
 */
export async function resetOnboardingStep(
  userId: string,
  stepName: OnboardingStepName
): Promise<{ success: boolean; error: Error | null }> {
  try {
    const { error } = await supabase
      .from('onboarding_steps')
      .update({
        completed: false,
        completed_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq('advisor_id', userId)
      .eq('step_name', stepName);

    if (error) throw error;

    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err as Error };
  }
}

/**
 * Check if a specific step is complete
 */
export async function isStepComplete(
  userId: string,
  stepName: OnboardingStepName
): Promise<boolean> {
  const { data, error } = await supabase
    .from('onboarding_steps')
    .select('completed')
    .eq('advisor_id', userId)
    .eq('step_name', stepName)
    .single();

  if (error || !data) return false;
  return data.completed;
}

/**
 * Skip an optional onboarding step
 */
export async function skipOnboardingStep(
  userId: string,
  stepName: OnboardingStepName
): Promise<{ success: boolean; error: Error | null }> {
  const stepConfig = ONBOARDING_STEPS.find(s => s.name === stepName);
  
  // Can't skip required steps
  if (stepConfig?.required) {
    return { success: false, error: new Error('Cannot skip required steps') };
  }

  return completeOnboardingStep(userId, stepName, { skipped: true });
}

/**
 * Initialize onboarding for a new user
 */
export async function initializeOnboarding(userId: string): Promise<{ 
  success: boolean; 
  error: Error | null 
}> {
  try {
    // Create initial step records
    const steps = ONBOARDING_STEPS.map(config => ({
      advisor_id: userId,
      step_name: config.name,
      completed: false,
      completed_at: null,
      data: null,
    }));

    const { error } = await supabase
      .from('onboarding_steps')
      .upsert(steps, {
        onConflict: 'advisor_id,step_name',
        ignoreDuplicates: true,
      });

    if (error) throw error;

    return { success: true, error: null };
  } catch (err) {
    return { success: false, error: err as Error };
  }
}
