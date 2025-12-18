/**
 * Services Index
 * 
 * Centralized exports for all client-side services.
 * These services are designed for GitHub Pages static deployment.
 */

// Stripe/Payment Service
export {
  STRIPE_MODE,
  IS_MOCK_MODE as IS_STRIPE_MOCK,
  PLANS,
  createCheckoutSession,
  getSubscription,
  cancelSubscription,
  changePlan,
  startStripeOnboarding,
  getStripeAccountStatus,
  getBalance,
  getTransactions,
  requestPayout,
  type PlanId,
  type StripeAccountStatus,
  type SubscriptionStatus,
  type StripeAccount,
  type Subscription,
  type PaymentMethod,
  type Transaction,
  type CheckoutSession,
} from './stripe.service';

// Email Service
export {
  EMAIL_MODE,
  IS_MOCK_MODE as IS_EMAIL_MOCK,
  sendWelcomeEmail,
  sendConsultationReminder,
  sendPaymentConfirmation,
  sendPaymentFailed,
  sendNewMessageNotification,
  sendPasswordResetEmail,
  hasEmailNotificationsEnabled,
  updateEmailPreferences,
  type EmailType,
  type EmailResult,
} from './email.service';

// Avatar Service
export {
  uploadAvatar,
  deleteAvatar,
  getAvatarUrl,
  getInitials,
  getPlaceholderAvatarUrl,
  type UploadResult,
} from './avatar.service';

// Workshop Service
export {
  getWorkshops,
  getWorkshop,
  createWorkshop,
  updateWorkshop,
  deleteWorkshop,
  getWorkshopStages,
  updateWorkshopStage,
  getWorkshopState,
  startWorkshop,
  completeWorkshop,
  moveToNextStage,
  createWorkshopFromTemplate,
  type Workshop,
  type WorkshopStage,
  type WorkshopParticipant,
  type WorkshopState,
  type WorkshopResult,
  type WorkshopsListResult,
  type WorkshopStageResult,
  type WorkshopStagesListResult,
  type WorkshopStateResult,
  type CreateWorkshopParams,
  type UpdateWorkshopParams,
  type UpdateStageParams,
  type WorkshopStatus,
  type StageStatus,
  type WorkshopConfig,
} from './workshop.service';