// Onboarding Progress Tracking
import { supabase, isSupabaseConfigured } from './supabaseClient';

export type OnboardingStepName = 
  | 'account_security'
  | 'profile_basics'
  | 'credentials'
  | 'expertise_mapping'
  | 'services_pricing'
  | 'payments'
  | 'kyc_verification'
  | 'review_submit';

export interface OnboardingStepConfig {
  name: OnboardingStepName;
  title: string;
  description: string;
  icon: string; // Icon name from lucide-react
  order: number;
  required: boolean;
  href: string;
  category: 'setup' | 'profile' | 'business' | 'verification';
}

// 8-step onboarding as per EPIC-032
export const ONBOARDING_STEPS: OnboardingStepConfig[] = [
  {
    name: 'account_security',
    title: 'Account & Security',
    description: 'Set up your account and security settings',
    icon: 'Lock',
    order: 1,
    required: true,
    href: '/settings',
    category: 'setup',
  },
  {
    name: 'profile_basics',
    title: 'Basic Profile',
    description: 'Add your name, photo, and professional details',
    icon: 'User',
    order: 2,
    required: true,
    href: '/profile',
    category: 'profile',
  },
  {
    name: 'credentials',
    title: 'Credentials',
    description: 'Upload your certifications and qualifications',
    icon: 'KeyRound',
    order: 3,
    required: false,
    href: '/profile',
    category: 'profile',
  },
  {
    name: 'expertise_mapping',
    title: 'Expertise Mapping',
    description: 'Define your areas of expertise',
    icon: 'Map',
    order: 4,
    required: false,
    href: '/profile',
    category: 'profile',
  },
  {
    name: 'services_pricing',
    title: 'Services & Pricing',
    description: 'Create your service offerings with pricing',
    icon: 'Briefcase',
    order: 5,
    required: true,
    href: '/services',
    category: 'business',
  },
  {
    name: 'payments',
    title: 'Payments',
    description: 'Set up payment methods and Stripe',
    icon: 'CreditCard',
    order: 6,
    required: true,
    href: '/payments',
    category: 'business',
  },
  {
    name: 'kyc_verification',
    title: 'KYC Verification',
    description: 'Complete identity verification',
    icon: 'IdCard',
    order: 7,
    required: true,
    href: '/settings',
    category: 'verification',
  },
  {
    name: 'review_submit',
    title: 'Review & Submit',
    description: 'Review your profile and submit for approval',
    icon: 'UserCheck',
    order: 8,
    required: true,
    href: '/profile',
    category: 'verification',
  },
];

// Minimum completion percentage to submit profile
export const MIN_COMPLETION_TO_SUBMIT = 60;

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
  // Return default progress if Supabase is not configured
  if (!isSupabaseConfigured()) {
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
      error: null,
    };
  }
  
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

/**
 * Auto-detect and update step completion based on actual data
 * Call this to sync onboarding status with real profile data
 */
export async function syncOnboardingProgress(userId: string): Promise<{
  progress: OnboardingProgress;
  error: Error | null;
}> {
  // Return default progress if Supabase is not configured
  if (!isSupabaseConfigured()) {
    return getOnboardingProgress(userId);
  }
  
  try {
    // Fetch profile data
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    // Fetch services count
    const { count: servicesCount } = await supabase
      .from('services')
      .select('*', { count: 'exact', head: true })
      .eq('advisor_id', userId);

    // Fetch credentials count
    const { count: credentialsCount } = await supabase
      .from('credentials')
      .select('*', { count: 'exact', head: true })
      .eq('advisor_id', userId);

    // Fetch expertise count
    const { count: expertiseCount } = await supabase
      .from('expertise')
      .select('*', { count: 'exact', head: true })
      .eq('advisor_id', userId);

    // Auto-detect completed steps
    const autoCompleted: OnboardingStepName[] = [];

    // Account & Security is complete if user exists (they're logged in)
    autoCompleted.push('account_security');

    // Profile basics - check if name and required fields are filled
    if (profile && profile.first_name && profile.last_name) {
      autoCompleted.push('profile_basics');
    }

    // Credentials - check if any credentials exist
    if (credentialsCount && credentialsCount > 0) {
      autoCompleted.push('credentials');
    }

    // Expertise mapping - check if expertise areas are defined
    if (expertiseCount && expertiseCount > 0) {
      autoCompleted.push('expertise_mapping');
    }

    // Services & Pricing - check if any services exist
    if (servicesCount && servicesCount > 0) {
      autoCompleted.push('services_pricing');
    }

    // Payments - check Stripe status
    if (profile?.stripe_account_status === 'active') {
      autoCompleted.push('payments');
    }

    // KYC Verification
    if (profile?.kyc_status === 'verified') {
      autoCompleted.push('kyc_verification');
    }

    // Review & Submit - check profile status
    if (profile?.profile_status === 'submitted' || profile?.profile_status === 'approved') {
      autoCompleted.push('review_submit');
    }

    // Update steps in database
    for (const stepName of autoCompleted) {
      await supabase
        .from('onboarding_steps')
        .upsert({
          advisor_id: userId,
          step_name: stepName,
          completed: true,
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'advisor_id,step_name',
        });
    }

    // Return updated progress
    return getOnboardingProgress(userId);
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
 * Get step status for dashboard display
 */
export function getStepStatus(
  step: { config: OnboardingStepConfig; completed: boolean },
  allSteps: Array<{ config: OnboardingStepConfig; completed: boolean }>
): 'completed' | 'current' | 'pending' | 'locked' {
  if (step.completed) {
    return 'completed';
  }

  // Find the first incomplete required step
  const firstIncomplete = allSteps.find(s => !s.completed);
  if (firstIncomplete && firstIncomplete.config.name === step.config.name) {
    return 'current';
  }

  // For non-required steps, check if previous required steps are done
  const stepIndex = allSteps.findIndex(s => s.config.name === step.config.name);
  const previousRequired = allSteps
    .slice(0, stepIndex)
    .filter(s => s.config.required);
  
  if (previousRequired.some(s => !s.completed)) {
    return 'locked';
  }

  return 'pending';
}

/**
 * Get submission eligibility
 */
export async function canSubmitProfile(userId: string): Promise<{
  canSubmit: boolean;
  percentage: number;
  missingRequired: OnboardingStepConfig[];
  error: Error | null;
}> {
  const { progress, error } = await getOnboardingProgress(userId);

  if (error) {
    return { canSubmit: false, percentage: 0, missingRequired: [], error };
  }

  const missingRequired = progress.steps
    .filter(s => s.config.required && !s.completed)
    .map(s => s.config);

  const canSubmit = progress.percentage >= MIN_COMPLETION_TO_SUBMIT && missingRequired.length === 0;

  return {
    canSubmit,
    percentage: progress.percentage,
    missingRequired,
    error: null,
  };
}
