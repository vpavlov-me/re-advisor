// Profile completion calculation and management
import { supabase } from './supabaseClient';
import type { Profile } from './database.types';

export interface ProfileField {
  key: keyof Profile;
  label: string;
  required: boolean;
  weight: number; // Percentage weight for completion calculation
  section: 'basic' | 'contact' | 'professional' | 'verification';
}

// Define all profile fields with their weights
export const PROFILE_FIELDS: ProfileField[] = [
  // Basic Info (30%)
  { key: 'first_name', label: 'First Name', required: true, weight: 8, section: 'basic' },
  { key: 'last_name', label: 'Last Name', required: true, weight: 8, section: 'basic' },
  { key: 'title', label: 'Professional Title', required: false, weight: 5, section: 'basic' },
  { key: 'bio', label: 'Bio / About', required: false, weight: 5, section: 'basic' },
  { key: 'avatar_url', label: 'Profile Photo', required: false, weight: 4, section: 'basic' },
  
  // Contact Info (20%)
  { key: 'email', label: 'Email', required: true, weight: 5, section: 'contact' },
  { key: 'phone', label: 'Phone Number', required: false, weight: 5, section: 'contact' },
  { key: 'location', label: 'Location', required: false, weight: 5, section: 'contact' },
  { key: 'timezone', label: 'Timezone', required: false, weight: 5, section: 'contact' },
  
  // Professional (30%)
  { key: 'company', label: 'Company / Firm', required: false, weight: 8, section: 'professional' },
  { key: 'website', label: 'Website', required: false, weight: 7, section: 'professional' },
  { key: 'linkedin', label: 'LinkedIn Profile', required: false, weight: 8, section: 'professional' },
  { key: 'twitter', label: 'Twitter / X', required: false, weight: 7, section: 'professional' },
  
  // Verification (20%)
  { key: 'stripe_account_status', label: 'Payment Setup', required: false, weight: 10, section: 'verification' },
  { key: 'kyc_status', label: 'Identity Verification', required: false, weight: 10, section: 'verification' },
];

export interface ProfileCompletionResult {
  percentage: number;
  completedFields: string[];
  missingFields: ProfileField[];
  sectionProgress: {
    basic: { completed: number; total: number; percentage: number };
    contact: { completed: number; total: number; percentage: number };
    professional: { completed: number; total: number; percentage: number };
    verification: { completed: number; total: number; percentage: number };
  };
  requiredComplete: boolean;
}

/**
 * Check if a field value is considered "complete"
 */
function isFieldComplete(value: unknown, key: string): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string' && value.trim() === '') return false;
  
  // Special handling for status fields
  if (key === 'stripe_account_status') {
    return value === 'active';
  }
  if (key === 'kyc_status') {
    return value === 'verified';
  }
  
  return true;
}

/**
 * Calculate profile completion percentage and details
 */
export function calculateProfileCompletion(profile: Partial<Profile> | null): ProfileCompletionResult {
  if (!profile) {
    return {
      percentage: 0,
      completedFields: [],
      missingFields: PROFILE_FIELDS,
      sectionProgress: {
        basic: { completed: 0, total: 5, percentage: 0 },
        contact: { completed: 0, total: 4, percentage: 0 },
        professional: { completed: 0, total: 4, percentage: 0 },
        verification: { completed: 0, total: 2, percentage: 0 },
      },
      requiredComplete: false,
    };
  }

  let totalWeight = 0;
  let completedWeight = 0;
  const completedFields: string[] = [];
  const missingFields: ProfileField[] = [];
  
  const sectionProgress = {
    basic: { completed: 0, total: 0, percentage: 0 },
    contact: { completed: 0, total: 0, percentage: 0 },
    professional: { completed: 0, total: 0, percentage: 0 },
    verification: { completed: 0, total: 0, percentage: 0 },
  };

  let requiredComplete = true;

  for (const field of PROFILE_FIELDS) {
    totalWeight += field.weight;
    sectionProgress[field.section].total++;
    
    const value = profile[field.key];
    const isComplete = isFieldComplete(value, field.key);
    
    if (isComplete) {
      completedWeight += field.weight;
      completedFields.push(field.key);
      sectionProgress[field.section].completed++;
    } else {
      missingFields.push(field);
      if (field.required) {
        requiredComplete = false;
      }
    }
  }

  // Calculate section percentages
  for (const section of Object.keys(sectionProgress) as Array<keyof typeof sectionProgress>) {
    const s = sectionProgress[section];
    s.percentage = s.total > 0 ? Math.round((s.completed / s.total) * 100) : 0;
  }

  const percentage = totalWeight > 0 ? Math.round((completedWeight / totalWeight) * 100) : 0;

  return {
    percentage,
    completedFields,
    missingFields,
    sectionProgress,
    requiredComplete,
  };
}

/**
 * Get profile with completion data
 */
export async function getProfileWithCompletion(userId: string): Promise<{
  profile: Profile | null;
  completion: ProfileCompletionResult;
  error: Error | null;
}> {
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    return {
      profile: null,
      completion: calculateProfileCompletion(null),
      error: error as Error,
    };
  }

  return {
    profile: profile as Profile,
    completion: calculateProfileCompletion(profile as Profile),
    error: null,
  };
}

/**
 * Update profile and recalculate completion
 */
export async function updateProfile(
  userId: string, 
  updates: Partial<Profile>
): Promise<{
  profile: Profile | null;
  completion: ProfileCompletionResult;
  error: Error | null;
}> {
  const { data: profile, error } = await supabase
    .from('profiles')
    .update({
      ...updates,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) {
    return {
      profile: null,
      completion: calculateProfileCompletion(null),
      error: error as Error,
    };
  }

  const completion = calculateProfileCompletion(profile as Profile);
  
  // Also update the completion_percentage in the profile
  await supabase
    .from('profiles')
    .update({ completion_percentage: completion.percentage })
    .eq('id', userId);

  return {
    profile: profile as Profile,
    completion,
    error: null,
  };
}

/**
 * Get next recommended action to improve profile
 */
export function getNextRecommendedAction(completion: ProfileCompletionResult): {
  field: ProfileField | null;
  message: string;
  priority: 'high' | 'medium' | 'low';
} {
  // First, check for required fields
  const missingRequired = completion.missingFields.filter(f => f.required);
  if (missingRequired.length > 0) {
    return {
      field: missingRequired[0],
      message: `Complete your ${missingRequired[0].label} to continue`,
      priority: 'high',
    };
  }

  // Then, suggest high-weight optional fields
  const sortedMissing = [...completion.missingFields].sort((a, b) => b.weight - a.weight);
  
  if (sortedMissing.length === 0) {
    return {
      field: null,
      message: 'Your profile is complete!',
      priority: 'low',
    };
  }

  const nextField = sortedMissing[0];
  
  // Verification fields are high priority
  if (nextField.section === 'verification') {
    return {
      field: nextField,
      message: `Complete ${nextField.label} to unlock all features`,
      priority: 'high',
    };
  }

  return {
    field: nextField,
    message: `Add your ${nextField.label} to improve your profile`,
    priority: nextField.weight >= 7 ? 'medium' : 'low',
  };
}
