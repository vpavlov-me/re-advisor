/**
 * Database Types for Supabase
 * 
 * These types are synchronized with the database schema.
 * Update this file when you make schema changes.
 * 
 * Schema source: supabase/schema.sql + supabase/migrations/*
 */

// ============================================
// ENUM TYPES
// ============================================

export type ProfileStatus = 'draft' | 'submitted' | 'approved' | 'rejected' | 'revision_required';
export type StripeAccountStatus = 'not_started' | 'initiated' | 'pending' | 'active' | 'failed';
export type KycStatus = 'not_started' | 'pending' | 'verified' | 'failed';
export type SubscriptionPlan = 'free' | 'starter' | 'professional' | 'enterprise';
export type SubscriptionStatus = 'inactive' | 'active' | 'cancelled' | 'past_due' | 'trialing';
export type RateType = 'hourly' | 'fixed' | 'retainer';
export type ServiceCategory = 'financial' | 'legal' | 'family' | 'business' | 'personal';
export type ConsultationStatus = 'scheduled' | 'completed' | 'cancelled' | 'no_show';
export type FamilyRole = 'external-consul' | 'consultant' | 'personal-advisor';
export type PaymentStatus = 'paid' | 'pending' | 'no-invoices';
export type FamilyStatus = 'active' | 'pending' | 'inactive';
export type Priority = 'low' | 'medium' | 'high';
export type NotificationType = 'message' | 'alert' | 'update' | 'consultation' | 'payment';
export type TransactionType = 'income' | 'payout' | 'fee' | 'subscription';
export type InvitationStatus = 'pending' | 'accepted' | 'expired' | 'cancelled';
export type ResourceType = 'document' | 'article' | 'video' | 'podcast' | 'template' | 'guide' | 'link' | 'checklist' | 'learning-path';
export type LearningPathDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type OnboardingStepName = 
  | 'account_security'
  | 'profile_basics'
  | 'credentials'
  | 'expertise_mapping'
  | 'services_pricing'
  | 'payments'
  | 'kyc_verification'
  | 'review_submit';

// ============================================
// TABLE TYPES
// ============================================

export interface Profile {
  id: string;
  first_name: string | null;
  last_name: string | null;
  title: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  timezone: string | null;
  company: string | null;
  website: string | null;
  linkedin: string | null;
  twitter: string | null;
  bio: string | null;
  avatar_url: string | null;
  stripe_customer_id: string | null;
  joined_date: string;
  completion_percentage: number;
  updated_at: string;
  // From migration 001
  is_first_login: boolean;
  onboarding_progress: number;
  profile_status: ProfileStatus;
  stripe_account_id: string | null;
  stripe_account_status: StripeAccountStatus | null;
  kyc_status: KycStatus | null;
  kyc_submitted_at: string | null;
  kyc_verified_at: string | null;
  subscription_plan: SubscriptionPlan;
  subscription_status: SubscriptionStatus;
  subscription_expires_at: string | null;
  // From migration 003
  onboarding_step: number;
  onboarding_completed: boolean;
  onboarding_skipped: boolean;
  onboarding_completed_at: string | null;
}

export interface Family {
  id: number;
  advisor_id: string;
  name: string;
  wealth: string | null;
  members_count: number;
  role: FamilyRole | null;
  payment_status: PaymentStatus;
  status: FamilyStatus;
  last_contact: string | null;
  industry: string | null;
  location: string | null;
  email: string | null;
  phone: string | null;
  description: string | null;
  created_at: string;
  updated_at: string;
  // From migration 003
  invite_code: string | null;
  invite_link_enabled: boolean;
}

export interface FamilyMember {
  id: number;
  family_id: number;
  name: string;
  role: string | null;
  email: string | null;
  avatar: string | null;
  created_at: string;
}

export interface Task {
  id: number;
  family_id: number;
  advisor_id: string;
  title: string;
  due_date: string | null;
  priority: Priority;
  completed: boolean;
  created_at: string;
}

export interface ServiceType {
  id: number;
  name: string;
  description: string | null;
  icon: string | null;
  category: ServiceCategory;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: number;
  family_id: number | null;
  advisor_id: string;
  service_type_id: number | null;
  name: string;
  status: string;
  progress: number;
  price: string | null;
  rate: number | null;
  rate_type: RateType;
  start_date: string | null;
  description: string | null;
  is_published: boolean;
  max_clients: number | null;
  current_clients: number;
  created_at: string;
  // Joined relations
  service_type?: ServiceType;
}

export interface Consultation {
  id: number;
  family_id: number;
  advisor_id: string;
  title: string;
  date: string | null;
  time: string | null;
  status: ConsultationStatus;
  meeting_link: string | null;
  created_at: string;
  // Joined relations
  family?: Family;
  families?: Family;
  members?: FamilyMember[];
  consultation_members?: Array<{ family_members: FamilyMember }>;
}

export interface ConsultationMember {
  id: number;
  consultation_id: number;
  family_member_id: number;
  created_at: string;
}

export interface Credential {
  id: number;
  advisor_id: string;
  name: string;
  issuer: string | null;
  year: string | null;
  status: string;
  credential_id: string | null;
  created_at: string;
}

export interface Expertise {
  id: number;
  advisor_id: string;
  area: string;
  created_at: string;
}

export interface Notification {
  id: number;
  user_id: string;
  type: NotificationType | null;
  title: string;
  description: string | null;
  read: boolean;
  created_at: string;
}

export interface Conversation {
  id: number;
  family_id: number;
  title: string | null;
  last_message: string | null;
  last_message_time: string;
  unread_count: number;
  pinned: boolean;
  created_at: string;
  // Joined relations
  family?: Family;
  families?: Family;
}

export interface Message {
  id: number;
  conversation_id: number;
  sender_id: string | null;
  sender_name: string | null;
  content: string;
  read: boolean;
  is_own: boolean;
  created_at: string;
}

export interface Transaction {
  id: number;
  advisor_id: string;
  family_id: number | null;
  amount: string;
  status: string | null;
  date: string;
  description: string | null;
  type: TransactionType | null;
  invoice_id: string | null;
  created_at: string;
  // Joined relations
  family?: Family;
}

export interface PaymentMethod {
  id: number;
  advisor_id: string;
  type: string | null;
  brand: string | null;
  last4: string | null;
  expiry: string | null;
  is_default: boolean;
  created_at: string;
}

export interface BankAccount {
  id: number;
  advisor_id: string;
  bank_name: string | null;
  account_type: string | null;
  last4: string | null;
  is_default: boolean;
  created_at: string;
}

export interface TeamMember {
  id: number;
  advisor_id: string;
  name: string;
  email: string;
  role: 'admin' | 'member' | 'viewer';
  status: 'active' | 'pending' | 'inactive';
  avatar_url: string | null;
  created_at: string;
}

export interface Subscription {
  id: number;
  advisor_id: string;
  plan_id: string;
  status: SubscriptionStatus;
  current_period_start: string | null;
  current_period_end: string | null;
  stripe_subscription_id: string | null;
  stripe_customer_id: string | null;
  created_at: string;
  updated_at: string;
}

// From migration 001
export interface OnboardingStep {
  id: number;
  advisor_id: string;
  step_name: OnboardingStepName;
  completed: boolean;
  completed_at: string | null;
  data: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

export interface AvailabilitySettings {
  id: number;
  advisor_id: string;
  timezone: string;
  buffer_before_minutes: number;
  buffer_after_minutes: number;
  min_notice_hours: number;
  max_advance_days: number;
  created_at: string;
  updated_at: string;
}

export interface WeeklySchedule {
  id: number;
  advisor_id: string;
  day_of_week: number; // 0 = Sunday, 6 = Saturday
  start_time: string;
  end_time: string;
  is_available: boolean;
  created_at: string;
}

export interface BlockedDate {
  id: number;
  advisor_id: string;
  date: string;
  reason: string | null;
  created_at: string;
}

// From migration 003 - Family Invitations
export interface FamilyInvitation {
  id: string; // UUID
  family_id: number;
  invited_by: string;
  email: string;
  role: string;
  invite_code: string;
  status: InvitationStatus;
  message: string | null;
  expires_at: string;
  accepted_at: string | null;
  accepted_by: string | null;
  created_at: string;
  updated_at: string;
}

// From migration 005 - Knowledge Resources
export interface KnowledgeResource {
  id: number;
  advisor_id: string;
  title: string;
  description: string | null;
  type: ResourceType;
  category: string;
  content: string | null;
  file_url: string | null;
  external_url: string | null;
  thumbnail_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface ResourceShare {
  id: number;
  resource_id: number;
  family_id: number;
  shared_by: string;
  shared_at: string;
}

export interface LearningPath {
  id: number;
  advisor_id: string;
  title: string;
  description: string | null;
  difficulty: LearningPathDifficulty;
  estimated_duration_minutes: number | null;
  is_published: boolean;
  thumbnail_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface LearningPathStep {
  id: number;
  learning_path_id: number;
  resource_id: number | null;
  title: string;
  description: string | null;
  content: string | null;
  step_order: number;
  estimated_duration_minutes: number | null;
  created_at: string;
}

export interface ConstitutionTemplate {
  id: number;
  advisor_id: string;
  title: string;
  description: string | null;
  is_default: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ConstitutionSection {
  id: number;
  template_id: number;
  section_number: number;
  title: string;
  content: string | null;
  is_required: boolean;
  created_at: string;
}

// From migration 006 - Push Notifications
export interface PushSubscription {
  id: number;
  user_id: string;
  endpoint: string;
  p256dh_key: string;
  auth_key: string;
  user_agent: string | null;
  created_at: string;
  updated_at: string;
}

export interface NotificationPreferences {
  id: number;
  user_id: string;
  push_enabled: boolean;
  push_messages: boolean;
  push_consultations: boolean;
  push_payments: boolean;
  push_updates: boolean;
  push_alerts: boolean;
  email_enabled: boolean;
  email_messages: boolean;
  email_consultations: boolean;
  email_payments: boolean;
  email_weekly_digest: boolean;
  quiet_hours_enabled: boolean;
  quiet_hours_start: string;
  quiet_hours_end: string;
  timezone: string;
  created_at: string;
  updated_at: string;
}

// ============================================
// DATABASE HELPER TYPE
// ============================================

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string };
        Update: Partial<Profile>;
      };
      families: {
        Row: Family;
        Insert: Omit<Family, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Family>;
      };
      family_members: {
        Row: FamilyMember;
        Insert: Omit<FamilyMember, 'id' | 'created_at'>;
        Update: Partial<FamilyMember>;
      };
      tasks: {
        Row: Task;
        Insert: Omit<Task, 'id' | 'created_at'>;
        Update: Partial<Task>;
      };
      service_types: {
        Row: ServiceType;
        Insert: Omit<ServiceType, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<ServiceType>;
      };
      services: {
        Row: Service;
        Insert: Omit<Service, 'id' | 'created_at'>;
        Update: Partial<Service>;
      };
      consultations: {
        Row: Consultation;
        Insert: Omit<Consultation, 'id' | 'created_at'>;
        Update: Partial<Consultation>;
      };
      consultation_members: {
        Row: ConsultationMember;
        Insert: Omit<ConsultationMember, 'id' | 'created_at'>;
        Update: Partial<ConsultationMember>;
      };
      credentials: {
        Row: Credential;
        Insert: Omit<Credential, 'id' | 'created_at'>;
        Update: Partial<Credential>;
      };
      expertise: {
        Row: Expertise;
        Insert: Omit<Expertise, 'id' | 'created_at'>;
        Update: Partial<Expertise>;
      };
      notifications: {
        Row: Notification;
        Insert: Omit<Notification, 'id' | 'created_at'>;
        Update: Partial<Notification>;
      };
      conversations: {
        Row: Conversation;
        Insert: Omit<Conversation, 'id' | 'created_at'>;
        Update: Partial<Conversation>;
      };
      messages: {
        Row: Message;
        Insert: Omit<Message, 'id' | 'created_at'>;
        Update: Partial<Message>;
      };
      transactions: {
        Row: Transaction;
        Insert: Omit<Transaction, 'id' | 'created_at'>;
        Update: Partial<Transaction>;
      };
      payment_methods: {
        Row: PaymentMethod;
        Insert: Omit<PaymentMethod, 'id' | 'created_at'>;
        Update: Partial<PaymentMethod>;
      };
      bank_accounts: {
        Row: BankAccount;
        Insert: Omit<BankAccount, 'id' | 'created_at'>;
        Update: Partial<BankAccount>;
      };
      team_members: {
        Row: TeamMember;
        Insert: Omit<TeamMember, 'id' | 'created_at'>;
        Update: Partial<TeamMember>;
      };
      subscriptions: {
        Row: Subscription;
        Insert: Omit<Subscription, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Subscription>;
      };
      onboarding_steps: {
        Row: OnboardingStep;
        Insert: Omit<OnboardingStep, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<OnboardingStep>;
      };
      availability_settings: {
        Row: AvailabilitySettings;
        Insert: Omit<AvailabilitySettings, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<AvailabilitySettings>;
      };
      weekly_schedule: {
        Row: WeeklySchedule;
        Insert: Omit<WeeklySchedule, 'id' | 'created_at'>;
        Update: Partial<WeeklySchedule>;
      };
      blocked_dates: {
        Row: BlockedDate;
        Insert: Omit<BlockedDate, 'id' | 'created_at'>;
        Update: Partial<BlockedDate>;
      };
      family_invitations: {
        Row: FamilyInvitation;
        Insert: Omit<FamilyInvitation, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<FamilyInvitation>;
      };
      knowledge_resources: {
        Row: KnowledgeResource;
        Insert: Omit<KnowledgeResource, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<KnowledgeResource>;
      };
      resource_shares: {
        Row: ResourceShare;
        Insert: Omit<ResourceShare, 'id' | 'shared_at'>;
        Update: Partial<ResourceShare>;
      };
      learning_paths: {
        Row: LearningPath;
        Insert: Omit<LearningPath, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<LearningPath>;
      };
      learning_path_steps: {
        Row: LearningPathStep;
        Insert: Omit<LearningPathStep, 'id' | 'created_at'>;
        Update: Partial<LearningPathStep>;
      };
      constitution_templates: {
        Row: ConstitutionTemplate;
        Insert: Omit<ConstitutionTemplate, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<ConstitutionTemplate>;
      };
      constitution_sections: {
        Row: ConstitutionSection;
        Insert: Omit<ConstitutionSection, 'id' | 'created_at'>;
        Update: Partial<ConstitutionSection>;
      };
      push_subscriptions: {
        Row: PushSubscription;
        Insert: Omit<PushSubscription, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<PushSubscription>;
      };
      notification_preferences: {
        Row: NotificationPreferences;
        Insert: Omit<NotificationPreferences, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<NotificationPreferences>;
      };
    };
  };
}
