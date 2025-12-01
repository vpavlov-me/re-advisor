/**
 * Common Types Index
 * 
 * Re-exports all shared types from a single location.
 * Import from '@/types' in components.
 */

// Database types
export type {
  Database,
  OnboardingStepName,
  ProfileStatus,
  StripeAccountStatus,
  KycStatus,
  SubscriptionPlan,
  SubscriptionStatus,
  FamilyStatus,
  ConsultationStatus,
  TransactionType,
  NotificationType,
  Profile,
  Family,
  FamilyMember,
  Consultation,
  Notification,
  Message,
  Conversation,
  Transaction,
} from '@/lib/database.types';

// Onboarding types
export type {
  OnboardingStepConfig,
  OnboardingProgress,
} from '@/lib/onboarding';

// Service types - Stripe
export type {
  PlanId,
  StripeAccountStatus as StripeServiceAccountStatus,
  SubscriptionStatus as StripeSubscriptionStatus,
  StripeAccount,
  Subscription as StripeSubscription,
  PaymentMethod as StripePaymentMethod,
  Transaction as StripeTransaction,
  CheckoutSession,
} from '@/lib/services/stripe.service';

// Service types - Email
export type {
  EmailType,
  EmailResult,
} from '@/lib/services/email.service';

// Service types - Avatar
export type {
  UploadResult as AvatarUploadResult,
} from '@/lib/services/avatar.service';
