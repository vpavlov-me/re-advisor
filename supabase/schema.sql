-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.AvailabilitySlot (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  dayOfWeek integer NOT NULL,
  startTime text NOT NULL,
  endTime text NOT NULL,
  isRecurring boolean DEFAULT true,
  specificDate timestamp with time zone,
  createdAt timestamp with time zone DEFAULT now(),
  updatedAt timestamp with time zone DEFAULT now(),
  CONSTRAINT AvailabilitySlot_pkey PRIMARY KEY (id)
);
CREATE TABLE public.ConstitutionTemplate (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  sections jsonb,
  isDefault boolean DEFAULT false,
  createdAt timestamp with time zone DEFAULT now(),
  updatedAt timestamp with time zone DEFAULT now(),
  CONSTRAINT ConstitutionTemplate_pkey PRIMARY KEY (id)
);
CREATE TABLE public.Consultation (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  date timestamp with time zone NOT NULL,
  time text,
  duration text,
  type text,
  status text DEFAULT 'scheduled'::text,
  paymentStatus text DEFAULT 'awaiting'::text,
  price text,
  notes text,
  meetingLink text,
  location text,
  familyId uuid NOT NULL,
  createdAt timestamp with time zone DEFAULT now(),
  updatedAt timestamp with time zone DEFAULT now(),
  CONSTRAINT Consultation_pkey PRIMARY KEY (id),
  CONSTRAINT Consultation_familyId_fkey FOREIGN KEY (familyId) REFERENCES public.Family(id)
);
CREATE TABLE public.Family (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  industry text,
  location text,
  email text,
  phone text,
  description text,
  since timestamp with time zone DEFAULT now(),
  status text DEFAULT 'active'::text,
  paymentStatus text DEFAULT 'pending'::text,
  role text DEFAULT 'consultant'::text,
  createdAt timestamp with time zone DEFAULT now(),
  updatedAt timestamp with time zone DEFAULT now(),
  CONSTRAINT Family_pkey PRIMARY KEY (id)
);
CREATE TABLE public.FamilyService (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  status text NOT NULL,
  progress integer DEFAULT 0,
  price text,
  startDate timestamp with time zone,
  familyId uuid NOT NULL,
  CONSTRAINT FamilyService_pkey PRIMARY KEY (id),
  CONSTRAINT FamilyService_familyId_fkey FOREIGN KEY (familyId) REFERENCES public.Family(id)
);
CREATE TABLE public.Member (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  role text,
  email text,
  avatar text,
  familyId uuid NOT NULL,
  CONSTRAINT Member_pkey PRIMARY KEY (id),
  CONSTRAINT Member_familyId_fkey FOREIGN KEY (familyId) REFERENCES public.Family(id)
);
CREATE TABLE public.Resource (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  type text NOT NULL,
  category text,
  description text,
  isFeatured boolean DEFAULT false,
  createdAt timestamp with time zone DEFAULT now(),
  updatedAt timestamp with time zone DEFAULT now(),
  CONSTRAINT Resource_pkey PRIMARY KEY (id)
);
CREATE TABLE public.Service (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  price text,
  priceAmount numeric,
  priceModel text,
  duration text,
  category text,
  status text DEFAULT 'draft'::text,
  activeClients integer DEFAULT 0,
  totalRevenue numeric DEFAULT 0,
  rating double precision DEFAULT 0,
  reviews integer DEFAULT 0,
  createdAt timestamp with time zone DEFAULT now(),
  updatedAt timestamp with time zone DEFAULT now(),
  CONSTRAINT Service_pkey PRIMARY KEY (id)
);
CREATE TABLE public.Task (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  status text DEFAULT 'todo'::text,
  dueDate timestamp with time zone,
  familyId uuid NOT NULL,
  createdAt timestamp with time zone DEFAULT now(),
  updatedAt timestamp with time zone DEFAULT now(),
  CONSTRAINT Task_pkey PRIMARY KEY (id),
  CONSTRAINT Task_familyId_fkey FOREIGN KEY (familyId) REFERENCES public.Family(id)
);
CREATE TABLE public.availability_settings (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  advisor_id uuid UNIQUE,
  timezone text DEFAULT 'America/New_York'::text,
  buffer_before_minutes integer DEFAULT 15,
  buffer_after_minutes integer DEFAULT 15,
  min_notice_hours integer DEFAULT 24,
  max_advance_days integer DEFAULT 60,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT availability_settings_pkey PRIMARY KEY (id),
  CONSTRAINT availability_settings_advisor_id_fkey FOREIGN KEY (advisor_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.bank_accounts (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  advisor_id uuid,
  bank_name text,
  account_type text,
  last4 text,
  is_default boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT bank_accounts_pkey PRIMARY KEY (id),
  CONSTRAINT bank_accounts_advisor_id_fkey FOREIGN KEY (advisor_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.blocked_dates (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  advisor_id uuid,
  date date NOT NULL,
  reason text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT blocked_dates_pkey PRIMARY KEY (id),
  CONSTRAINT blocked_dates_advisor_id_fkey FOREIGN KEY (advisor_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.constitution_sections (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  template_id bigint,
  section_number integer NOT NULL,
  title text NOT NULL,
  content text,
  is_required boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT constitution_sections_pkey PRIMARY KEY (id),
  CONSTRAINT constitution_sections_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.constitution_templates(id)
);
CREATE TABLE public.constitution_templates (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  advisor_id uuid,
  title text NOT NULL,
  description text,
  is_default boolean DEFAULT false,
  is_published boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT constitution_templates_pkey PRIMARY KEY (id),
  CONSTRAINT constitution_templates_advisor_id_fkey FOREIGN KEY (advisor_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.consultation_members (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  consultation_id bigint,
  family_member_id bigint,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT consultation_members_pkey PRIMARY KEY (id),
  CONSTRAINT consultation_members_consultation_id_fkey FOREIGN KEY (consultation_id) REFERENCES public.consultations(id),
  CONSTRAINT consultation_members_family_member_id_fkey FOREIGN KEY (family_member_id) REFERENCES public.family_members(id)
);
CREATE TABLE public.consultations (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  family_id bigint,
  advisor_id uuid,
  title text NOT NULL,
  date date,
  time text,
  status text DEFAULT 'scheduled'::text,
  meeting_link text,
  created_at timestamp with time zone DEFAULT now(),
  type text DEFAULT 'Video Call'::text,
  duration text DEFAULT '1 hour'::text,
  payment_status text DEFAULT 'awaiting'::text,
  price text DEFAULT '$0'::text,
  location text,
  agenda ARRAY DEFAULT '{}'::text[],
  notes text,
  documents jsonb DEFAULT '[]'::jsonb,
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT consultations_pkey PRIMARY KEY (id),
  CONSTRAINT consultations_family_id_fkey FOREIGN KEY (family_id) REFERENCES public.families(id),
  CONSTRAINT consultations_advisor_id_fkey FOREIGN KEY (advisor_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.conversation_participants (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  conversation_id bigint,
  user_id uuid,
  family_member_id bigint,
  participant_name text NOT NULL,
  role text DEFAULT 'member'::text,
  added_at timestamp with time zone DEFAULT now(),
  added_by uuid,
  CONSTRAINT conversation_participants_pkey PRIMARY KEY (id),
  CONSTRAINT conversation_participants_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id),
  CONSTRAINT conversation_participants_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT conversation_participants_family_member_id_fkey FOREIGN KEY (family_member_id) REFERENCES public.family_members(id),
  CONSTRAINT conversation_participants_added_by_fkey FOREIGN KEY (added_by) REFERENCES auth.users(id)
);
CREATE TABLE public.conversations (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  family_id bigint,
  title text,
  last_message text,
  last_message_time timestamp with time zone DEFAULT now(),
  unread_count integer DEFAULT 0,
  pinned boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT conversations_pkey PRIMARY KEY (id),
  CONSTRAINT conversations_family_id_fkey FOREIGN KEY (family_id) REFERENCES public.families(id)
);
CREATE TABLE public.credentials (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  advisor_id uuid,
  name text NOT NULL,
  issuer text,
  year text,
  status text DEFAULT 'pending'::text,
  credential_id text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT credentials_pkey PRIMARY KEY (id),
  CONSTRAINT credentials_advisor_id_fkey FOREIGN KEY (advisor_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.expertise (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  advisor_id uuid,
  area text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT expertise_pkey PRIMARY KEY (id),
  CONSTRAINT expertise_advisor_id_fkey FOREIGN KEY (advisor_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.families (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  advisor_id uuid,
  name text NOT NULL,
  wealth text,
  members_count integer DEFAULT 0,
  role text,
  payment_status text DEFAULT 'pending'::text,
  status text DEFAULT 'active'::text,
  last_contact timestamp with time zone,
  industry text,
  location text,
  email text,
  phone text,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  invite_code text UNIQUE,
  invite_link_enabled boolean DEFAULT true,
  CONSTRAINT families_pkey PRIMARY KEY (id),
  CONSTRAINT families_advisor_id_fkey FOREIGN KEY (advisor_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.family_constitutions (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  family_id bigint,
  advisor_id uuid,
  template_id bigint,
  title text NOT NULL,
  status text DEFAULT 'draft'::text,
  version integer DEFAULT 1,
  adopted_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT family_constitutions_pkey PRIMARY KEY (id),
  CONSTRAINT family_constitutions_family_id_fkey FOREIGN KEY (family_id) REFERENCES public.families(id),
  CONSTRAINT family_constitutions_advisor_id_fkey FOREIGN KEY (advisor_id) REFERENCES public.profiles(id),
  CONSTRAINT family_constitutions_template_id_fkey FOREIGN KEY (template_id) REFERENCES public.constitution_templates(id)
);
CREATE TABLE public.family_invitations (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  family_id bigint,
  invited_by uuid,
  email text NOT NULL,
  role text DEFAULT 'member'::text,
  invite_code text NOT NULL UNIQUE,
  status text DEFAULT 'pending'::text,
  message text,
  expires_at timestamp with time zone DEFAULT (now() + '7 days'::interval),
  accepted_at timestamp with time zone,
  accepted_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT family_invitations_pkey PRIMARY KEY (id),
  CONSTRAINT family_invitations_family_id_fkey FOREIGN KEY (family_id) REFERENCES public.families(id),
  CONSTRAINT family_invitations_invited_by_fkey FOREIGN KEY (invited_by) REFERENCES public.profiles(id),
  CONSTRAINT family_invitations_accepted_by_fkey FOREIGN KEY (accepted_by) REFERENCES public.profiles(id)
);
CREATE TABLE public.family_members (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  family_id bigint,
  name text NOT NULL,
  role text,
  email text,
  avatar text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT family_members_pkey PRIMARY KEY (id),
  CONSTRAINT family_members_family_id_fkey FOREIGN KEY (family_id) REFERENCES public.families(id)
);
CREATE TABLE public.knowledge_resources (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  advisor_id uuid,
  title text NOT NULL,
  description text,
  type text NOT NULL DEFAULT 'document'::text,
  category text DEFAULT 'General'::text,
  content text,
  file_url text,
  external_url text,
  thumbnail_url text,
  is_featured boolean DEFAULT false,
  is_published boolean DEFAULT true,
  view_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT knowledge_resources_pkey PRIMARY KEY (id),
  CONSTRAINT knowledge_resources_advisor_id_fkey FOREIGN KEY (advisor_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.learning_modules (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  learning_path_id bigint,
  title text NOT NULL,
  description text,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT learning_modules_pkey PRIMARY KEY (id),
  CONSTRAINT learning_modules_learning_path_id_fkey FOREIGN KEY (learning_path_id) REFERENCES public.learning_paths(id)
);
CREATE TABLE public.learning_path_resources (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  learning_path_id bigint,
  resource_id bigint,
  position integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT learning_path_resources_pkey PRIMARY KEY (id),
  CONSTRAINT learning_path_resources_learning_path_id_fkey FOREIGN KEY (learning_path_id) REFERENCES public.learning_paths(id),
  CONSTRAINT learning_path_resources_resource_id_fkey FOREIGN KEY (resource_id) REFERENCES public.knowledge_resources(id)
);
CREATE TABLE public.learning_path_steps (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  learning_path_id bigint,
  resource_id bigint,
  title text NOT NULL,
  description text,
  content text,
  step_order integer NOT NULL,
  estimated_duration_minutes integer,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT learning_path_steps_pkey PRIMARY KEY (id),
  CONSTRAINT learning_path_steps_learning_path_id_fkey FOREIGN KEY (learning_path_id) REFERENCES public.learning_paths(id),
  CONSTRAINT learning_path_steps_resource_id_fkey FOREIGN KEY (resource_id) REFERENCES public.knowledge_resources(id)
);
CREATE TABLE public.learning_paths (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  advisor_id uuid,
  title text NOT NULL,
  description text,
  difficulty text DEFAULT 'beginner'::text,
  estimated_duration_minutes integer,
  is_published boolean DEFAULT true,
  thumbnail_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  category text DEFAULT 'general'::text,
  CONSTRAINT learning_paths_pkey PRIMARY KEY (id),
  CONSTRAINT learning_paths_advisor_id_fkey FOREIGN KEY (advisor_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.learning_resources (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  module_id bigint,
  title text NOT NULL,
  type text NOT NULL DEFAULT 'article'::text CHECK (type = ANY (ARRAY['video'::text, 'article'::text, 'guide'::text, 'document'::text, 'link'::text])),
  duration text,
  content_url text,
  order_index integer NOT NULL DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT learning_resources_pkey PRIMARY KEY (id),
  CONSTRAINT learning_resources_module_id_fkey FOREIGN KEY (module_id) REFERENCES public.learning_modules(id)
);
CREATE TABLE public.login_history (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id uuid NOT NULL,
  device_name text,
  device_type text,
  browser text,
  os text,
  ip_address text,
  location text,
  status text DEFAULT 'success'::text,
  failure_reason text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT login_history_pkey PRIMARY KEY (id),
  CONSTRAINT login_history_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.messages (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  conversation_id bigint,
  sender_id uuid,
  sender_name text,
  content text NOT NULL,
  read boolean DEFAULT false,
  is_own boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  attachment_url text,
  attachment_name text,
  attachment_type text,
  attachment_size integer,
  CONSTRAINT messages_pkey PRIMARY KEY (id),
  CONSTRAINT messages_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id),
  CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES auth.users(id)
);
CREATE TABLE public.notification_preferences (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id uuid NOT NULL UNIQUE,
  push_enabled boolean DEFAULT true,
  push_messages boolean DEFAULT true,
  push_consultations boolean DEFAULT true,
  push_payments boolean DEFAULT true,
  push_updates boolean DEFAULT true,
  push_alerts boolean DEFAULT true,
  email_enabled boolean DEFAULT true,
  email_messages boolean DEFAULT true,
  email_consultations boolean DEFAULT true,
  email_payments boolean DEFAULT true,
  email_weekly_digest boolean DEFAULT true,
  quiet_hours_enabled boolean DEFAULT false,
  quiet_hours_start time without time zone DEFAULT '22:00:00'::time without time zone,
  quiet_hours_end time without time zone DEFAULT '08:00:00'::time without time zone,
  timezone text DEFAULT 'UTC'::text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT notification_preferences_pkey PRIMARY KEY (id),
  CONSTRAINT notification_preferences_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.notifications (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id uuid,
  type text,
  title text NOT NULL,
  description text,
  read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT notifications_pkey PRIMARY KEY (id),
  CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.onboarding_steps (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  advisor_id uuid,
  step_name text NOT NULL,
  completed boolean DEFAULT false,
  completed_at timestamp with time zone,
  data jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT onboarding_steps_pkey PRIMARY KEY (id),
  CONSTRAINT onboarding_steps_advisor_id_fkey FOREIGN KEY (advisor_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.payment_methods (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  advisor_id uuid,
  type text,
  brand text,
  last4 text,
  expiry text,
  is_default boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT payment_methods_pkey PRIMARY KEY (id),
  CONSTRAINT payment_methods_advisor_id_fkey FOREIGN KEY (advisor_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL,
  first_name text,
  last_name text,
  title text,
  email text,
  phone text,
  location text,
  timezone text,
  company text,
  website text,
  linkedin text,
  twitter text,
  bio text,
  joined_date timestamp with time zone DEFAULT now(),
  completion_percentage integer DEFAULT 0,
  updated_at timestamp with time zone DEFAULT now(),
  onboarding_step integer DEFAULT 1,
  onboarding_completed boolean DEFAULT false,
  onboarding_skipped boolean DEFAULT false,
  onboarding_completed_at timestamp with time zone,
  is_first_login boolean DEFAULT true,
  onboarding_progress integer DEFAULT 0,
  profile_status text DEFAULT 'draft'::text,
  stripe_account_id text,
  stripe_account_status text DEFAULT 'not_started'::text,
  kyc_status text DEFAULT 'not_started'::text,
  kyc_submitted_at timestamp with time zone,
  kyc_verified_at timestamp with time zone,
  subscription_plan text DEFAULT 'free'::text,
  subscription_status text DEFAULT 'inactive'::text,
  subscription_expires_at timestamp with time zone,
  avatar_url text,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.push_subscriptions (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id uuid NOT NULL,
  endpoint text NOT NULL UNIQUE,
  p256dh_key text NOT NULL,
  auth_key text NOT NULL,
  user_agent text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT push_subscriptions_pkey PRIMARY KEY (id),
  CONSTRAINT push_subscriptions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.resource_shares (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  resource_id bigint,
  family_id bigint,
  shared_by uuid,
  shared_at timestamp with time zone DEFAULT now(),
  CONSTRAINT resource_shares_pkey PRIMARY KEY (id),
  CONSTRAINT resource_shares_resource_id_fkey FOREIGN KEY (resource_id) REFERENCES public.knowledge_resources(id),
  CONSTRAINT resource_shares_family_id_fkey FOREIGN KEY (family_id) REFERENCES public.families(id),
  CONSTRAINT resource_shares_shared_by_fkey FOREIGN KEY (shared_by) REFERENCES public.profiles(id)
);
CREATE TABLE public.service_types (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  name text NOT NULL UNIQUE,
  description text,
  icon text,
  category text,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT service_types_pkey PRIMARY KEY (id)
);
CREATE TABLE public.services (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  family_id bigint,
  advisor_id uuid,
  name text NOT NULL,
  status text DEFAULT 'Pending'::text,
  progress integer DEFAULT 0,
  price text,
  start_date timestamp with time zone,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  service_type_id bigint,
  rate numeric,
  rate_type text DEFAULT 'hourly'::text,
  is_published boolean DEFAULT false,
  max_clients integer,
  current_clients integer DEFAULT 0,
  price_model text DEFAULT 'Fixed Package'::text,
  price_amount numeric,
  duration text DEFAULT '1 hour'::text,
  category text DEFAULT 'Governance'::text,
  active_clients integer DEFAULT 0,
  total_revenue text DEFAULT '$0'::text,
  rating numeric DEFAULT 0,
  reviews integer DEFAULT 0,
  CONSTRAINT services_pkey PRIMARY KEY (id),
  CONSTRAINT services_family_id_fkey FOREIGN KEY (family_id) REFERENCES public.families(id),
  CONSTRAINT services_advisor_id_fkey FOREIGN KEY (advisor_id) REFERENCES public.profiles(id),
  CONSTRAINT services_service_type_id_fkey FOREIGN KEY (service_type_id) REFERENCES public.service_types(id)
);
CREATE TABLE public.subscriptions (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  advisor_id uuid,
  plan_id text NOT NULL,
  status text DEFAULT 'active'::text,
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  stripe_subscription_id text,
  stripe_customer_id text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  portals_used integer DEFAULT 0,
  portals_included integer DEFAULT 0,
  additional_portals integer DEFAULT 0,
  CONSTRAINT subscriptions_pkey PRIMARY KEY (id),
  CONSTRAINT subscriptions_advisor_id_fkey FOREIGN KEY (advisor_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.tasks (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  family_id bigint,
  advisor_id uuid,
  title text NOT NULL,
  due_date timestamp with time zone,
  priority text DEFAULT 'medium'::text,
  completed boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT tasks_pkey PRIMARY KEY (id),
  CONSTRAINT tasks_family_id_fkey FOREIGN KEY (family_id) REFERENCES public.families(id),
  CONSTRAINT tasks_advisor_id_fkey FOREIGN KEY (advisor_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.team_members (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  advisor_id uuid,
  name text NOT NULL,
  email text NOT NULL,
  role text DEFAULT 'member'::text,
  status text DEFAULT 'pending'::text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT team_members_pkey PRIMARY KEY (id),
  CONSTRAINT team_members_advisor_id_fkey FOREIGN KEY (advisor_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.transactions (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  advisor_id uuid,
  family_id bigint,
  amount text,
  status text,
  date timestamp with time zone DEFAULT now(),
  description text,
  type text,
  invoice_id text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT transactions_pkey PRIMARY KEY (id),
  CONSTRAINT transactions_advisor_id_fkey FOREIGN KEY (advisor_id) REFERENCES public.profiles(id),
  CONSTRAINT transactions_family_id_fkey FOREIGN KEY (family_id) REFERENCES public.families(id)
);
CREATE TABLE public.user_sessions (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id uuid NOT NULL,
  device_name text,
  device_type text,
  browser text,
  os text,
  ip_address text,
  location text,
  is_current boolean DEFAULT false,
  last_active_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_sessions_pkey PRIMARY KEY (id),
  CONSTRAINT user_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.weekly_schedule (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  advisor_id uuid,
  day_of_week integer NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time text NOT NULL,
  end_time text NOT NULL,
  is_available boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT weekly_schedule_pkey PRIMARY KEY (id),
  CONSTRAINT weekly_schedule_advisor_id_fkey FOREIGN KEY (advisor_id) REFERENCES public.profiles(id)
);