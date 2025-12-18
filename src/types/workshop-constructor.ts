// Workshop Constructor Types

export type WorkshopTemplateStatus = 'draft' | 'published' | 'archived';
export type WorkshopTemplateCategory = 'Governance' | 'Succession' | 'Values' | 'Strategy' | 'Assessment' | 'Custom';

export type WorkshopRole = 'family-member' | 'family-consul' | 'external-advisor';

export type ScreenType = 'text' | 'exercise' | 'discussion' | 'assessment' | 'visualization';
export type ContentType =
  | 'introduction' | 'rules' | 'objectives'
  | 'questionnaire' | '360-review' | 'values-selection'
  | 'raci-matrix' | 'three-circles' | 'stakeholder-map' | 'force-field' | 'swot' | 'brainstorm'
  | 'group-discussion' | 'ai-facilitated' | 'conflict-protocol'
  | 'governance-structure' | 'decision-matrix'
  | 'mission-draft' | 'vision-matrix' | 'values-matrix'
  | '9-box-matrix' | 'timeline'
  | 'action-plan' | 'summary' | 'feedback' | 'next-steps'
  | 'values-brainstorming' | 'values-consolidation' | 'values-voting' | 'values-results'
  | 'mission-discussion' | 'mission-refinement' | 'mission-approval'
  | 'vision-brainstorming' | 'vision-draft' | 'vision-refinement' | 'vision-approval'
  | 'collaborative-editing' | 'voting-approval' | 'results-summary';

export type ElementType = 'text' | 'question' | 'input' | 'chart' | 'image' | 'video' | 'file';

export type WorkshopInstanceStatus = 'shared' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
export type ParticipantStatus = 'invited' | 'joined' | 'completed';

export interface WorkshopTemplate {
  id: string;
  created_by: string;
  name: string;
  description: string | null;
  duration_minutes: number | null;
  target_audience: string | null;
  category: WorkshopTemplateCategory;
  is_public: boolean;
  is_master: boolean;
  cloned_from: string | null;
  version: number;
  status: WorkshopTemplateStatus;
  settings: WorkshopSettings;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}

export interface WorkshopSettings {
  enableAI?: boolean;
  enableChat?: boolean;
  enableCollaboration?: boolean;
  allowSkipScreens?: boolean;
  showProgressBar?: boolean;
  requireCompletion?: boolean;
  [key: string]: any;
}

export interface WorkshopScreen {
  id: string;
  template_id: string;
  screen_key: string;
  name: string;
  description: string | null;
  order_index: number;
  duration_minutes: number | null;
  screen_type: ScreenType;
  content_type: ContentType | null;
  content: ScreenContent;
  navigation: NavigationConfig;
  ai_config: AIConfig;
  has_timer: boolean;
  timer_config: TimerConfig;
  is_optional: boolean;
  show_conditions: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ScreenContent {
  title?: string;
  description?: string;
  text?: string;
  instructions?: string;
  questions?: Question[];
  fields?: Field[];
  options?: any[];
  examples?: string[];
  template?: any;
  [key: string]: any;
}

export interface NavigationConfig {
  next?: string;
  previous?: string;
  conditionalNext?: ConditionalNavigation[];
  canSkip?: boolean;
  requiredFields?: string[];
}

export interface ConditionalNavigation {
  condition: string;
  target: string;
}

export interface AIConfig {
  enabled: boolean;
  prompt?: string;
  style?: 'supportive' | 'neutral' | 'strict';
  keyTopics?: string[];
  interventionTriggers?: string[];
}

export interface TimerConfig {
  duration?: number;
  showWarning?: boolean;
  warningAt?: number;
  canExtend?: boolean;
  extensionDuration?: number;
  autoAdvance?: boolean;
}

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'scale' | 'multiple-choice' | 'ranking' | 'open';
  required?: boolean;
  options?: string[];
  min?: number;
  max?: number;
  labels?: string[];
  validation?: ValidationRule;
}

export interface Field {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'rich-text' | 'number' | 'date' | 'select' | 'multi-select';
  placeholder?: string;
  required?: boolean;
  validation?: ValidationRule;
  options?: string[];
  minLength?: number;
  maxLength?: number;
  showCharacterCount?: boolean;
  showWordCount?: boolean;
  helpText?: string;
  exampleText?: string;
  validationHints?: string[];
  autoSave?: boolean;
  formatGuidelines?: TextFormatGuidelines;
}

export interface TextFormatGuidelines {
  tone?: 'formal' | 'informal' | 'inspirational' | 'neutral';
  style?: 'concise' | 'detailed' | 'storytelling';
  bestPractices?: string[];
  examples?: {
    good: string[];
    bad: string[];
  };
}

export interface ValidationRule {
  type: 'required' | 'min' | 'max' | 'pattern' | 'custom';
  value?: any;
  message?: string;
}

export interface WorkshopScreenElement {
  id: string;
  screen_id: string;
  element_key: string;
  element_type: ElementType;
  order_index: number;
  layout_config: LayoutConfig;
  content: ElementContent;
  is_interactive: boolean;
  validation_rules: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface LayoutConfig {
  width?: string | number;
  height?: string | number;
  position?: 'full' | 'left' | 'right' | 'center';
  responsive?: boolean;
  [key: string]: any;
}

export interface ElementContent {
  text?: string;
  format?: 'plain' | 'markdown' | 'html';
  style?: Record<string, any>;
  question?: Question;
  field?: Field;
  chartType?: 'bar' | 'line' | 'pie' | 'radar' | 'scatter';
  data?: any;
  url?: string;
  alt?: string;
  caption?: string;
  name?: string;
  downloadable?: boolean;
  [key: string]: any;
}

export interface WorkshopTemplateBlock {
  id: string;
  block_key: string;
  name: string;
  description: string | null;
  category: 'kickoff' | 'assessment' | 'exercise' | 'discussion' | 'governance' | 'strategy' | 'succession' | 'wrapup';
  screen_type: ScreenType;
  content_type: ContentType | null;
  default_content: ScreenContent;
  default_navigation: NavigationConfig;
  default_ai_config: AIConfig;
  tags: string[];
  estimated_duration: number | null;
  thumbnail_url: string | null;
  usage_count: number;
  is_system: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface WorkshopInstance {
  id: string;
  template_id: string;
  family_id: string;
  adviser_id: string;
  name: string;
  scheduled_at: string | null;
  started_at: string | null;
  completed_at: string | null;
  status: WorkshopInstanceStatus;
  current_screen_key: string | null;
  instance_data: InstanceData;
  shared_by: string | null;
  shared_at: string;
  share_message: string | null;
  created_at: string;
  updated_at: string;
}

export interface InstanceData {
  screens?: Record<string, ScreenInstanceData>;
  artifacts?: Artifact[];
  [key: string]: any;
}

export interface ScreenInstanceData {
  responses?: Record<string, any>;
  completedAt?: string;
  timeSpent?: number;
}

export interface Artifact {
  type: 'document' | 'spreadsheet' | 'presentation' | 'other';
  name: string;
  url: string;
  createdAt: string;
}

export interface WorkshopInstanceParticipant {
  id: string;
  instance_id: string;
  family_member_id: string;
  status: ParticipantStatus;
  current_screen_key: string | null;
  participant_data: ParticipantData;
  joined_at: string | null;
  last_active_at: string | null;
  completed_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface ParticipantData {
  screensCompleted?: string[];
  responses?: Record<string, Record<string, any>>;
  timeSpent?: Record<string, number>;
}

export interface WorkshopAnalytics {
  id: string;
  instance_id: string;
  total_duration_seconds: number | null;
  screen_durations: Record<string, number>;
  participant_engagement: Record<string, ParticipantEngagement>;
  completion_rate: number | null;
  dropout_screens: string[];
  consensus_data: Record<string, any>;
  insights: Record<string, any>;
  created_at: string;
  updated_at: string;
}

export interface ParticipantEngagement {
  timeSpent: number;
  screensCompleted: number;
  interactionCount: number;
  engagementLevel: 'high' | 'medium' | 'low';
}

// Helper types for UI
export interface WorkshopTemplateWithScreens extends WorkshopTemplate {
  screens: WorkshopScreen[];
  screen_count: number;
}

export interface WorkshopInstanceWithDetails extends WorkshopInstance {
  template: WorkshopTemplate;
  participants: WorkshopInstanceParticipant[];
  analytics?: WorkshopAnalytics;
}

// Form types for creating/editing
export interface CreateWorkshopTemplateInput {
  name: string;
  description?: string;
  duration_minutes?: number;
  target_audience?: string;
  category: WorkshopTemplateCategory;
  settings?: WorkshopSettings;
}

export interface CreateWorkshopScreenInput {
  template_id: string;
  screen_key: string;
  name: string;
  description?: string;
  order_index: number;
  duration_minutes?: number;
  screen_type: ScreenType;
  content_type?: ContentType;
  content: ScreenContent;
  navigation?: NavigationConfig;
  ai_config?: AIConfig;
  has_timer?: boolean;
  timer_config?: TimerConfig;
  is_optional?: boolean;
}

export interface ShareWorkshopInput {
  template_id: string;
  family_id: string;
  name?: string;
  scheduled_at?: string;
  share_message?: string;
}
