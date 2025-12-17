import type { WorkshopTemplateWithScreens } from "@/types/workshop-constructor";

/**
 * VMV Workshop V1 Template
 *
 * Original VMV workshop implementation with simplified structure.
 * This is a standalone workshop template separate from the master template.
 *
 * Contains 8 screens:
 * 1. Session Introduction
 * 2. Values Selection
 * 3. Values Collective Discussion
 * 4. Values Matrix
 * 5. Mission Draft
 * 6. Mission Finalization
 * 7. Vision Creation
 * 8. Summary & Results
 */

export const VMV_V1_TEMPLATE: WorkshopTemplateWithScreens = {
  id: "vmv-v1",
  created_by: "system",
  name: "VMV Workshop V1",
  description: "Original Values, Mission and Vision workshop with streamlined process. Perfect for smaller families or quick sessions focusing on core elements.",
  duration_minutes: 90,
  target_audience: "Family Members, Family Council",
  category: "Values",
  is_public: true,
  is_master: false,
  cloned_from: null,
  version: 1,
  status: "published",
  settings: {
    enableAI: false,
    enableChat: false,
    enableCollaboration: true,
    allowSkipScreens: true,
    showProgressBar: true,
    requireCompletion: false,
  },
  screens: [
    {
      id: "vmv-v1-screen-1",
      template_id: "vmv-v1",
      screen_key: "session-intro",
      name: "Session Introduction",
      description: "Welcome and workshop overview",
      order_index: 1,
      duration_minutes: 5,
      screen_type: "text",
      content_type: "introduction",
      content: {
        title: "Values, Mission & Vision Workshop",
        description: "Welcome to the workshop. Today we'll define your family's values, mission, and vision.",
        objectives: [
          "Identify core family values",
          "Create a mission statement",
          "Define long-term vision"
        ]
      },
      navigation: { next: "values-select" },
      ai_config: { enabled: false },
      has_timer: false,
      timer_config: {},
      is_optional: false,
      show_conditions: {},
      created_at: new Date("2025-01-15").toISOString(),
      updated_at: new Date("2025-01-15").toISOString(),
    },
    {
      id: "vmv-v1-screen-2",
      template_id: "vmv-v1",
      screen_key: "values-select",
      name: "Values Selection",
      description: "Select your top family values",
      order_index: 2,
      duration_minutes: 15,
      screen_type: "assessment",
      content_type: "values-selection",
      content: {
        title: "Select Family Values",
        description: "Choose the values that best represent your family"
      },
      navigation: { previous: "session-intro", next: "values-collective" },
      ai_config: { enabled: false },
      has_timer: false,
      timer_config: {},
      is_optional: false,
      show_conditions: {},
      created_at: new Date("2025-01-15").toISOString(),
      updated_at: new Date("2025-01-15").toISOString(),
    },
    {
      id: "vmv-v1-screen-3",
      template_id: "vmv-v1",
      screen_key: "values-collective",
      name: "Collective Values Discussion",
      description: "Discuss and align on family values",
      order_index: 3,
      duration_minutes: 10,
      screen_type: "discussion",
      content_type: "group-discussion",
      content: {
        title: "Values Discussion",
        description: "Let's discuss the values selected by all participants"
      },
      navigation: { previous: "values-select", next: "values-matrix" },
      ai_config: { enabled: false },
      has_timer: false,
      timer_config: {},
      is_optional: false,
      show_conditions: {},
      created_at: new Date("2025-01-15").toISOString(),
      updated_at: new Date("2025-01-15").toISOString(),
    },
    {
      id: "vmv-v1-screen-4",
      template_id: "vmv-v1",
      screen_key: "values-matrix",
      name: "Values Matrix",
      description: "Organize values into a matrix",
      order_index: 4,
      duration_minutes: 10,
      screen_type: "exercise",
      content_type: "values-matrix",
      content: {
        title: "Values Matrix",
        description: "Organize and prioritize family values"
      },
      navigation: { previous: "values-collective", next: "mission-draft" },
      ai_config: { enabled: false },
      has_timer: false,
      timer_config: {},
      is_optional: true,
      show_conditions: {},
      created_at: new Date("2025-01-15").toISOString(),
      updated_at: new Date("2025-01-15").toISOString(),
    },
    {
      id: "vmv-v1-screen-5",
      template_id: "vmv-v1",
      screen_key: "mission-draft",
      name: "Mission Draft",
      description: "Create family mission statement",
      order_index: 5,
      duration_minutes: 15,
      screen_type: "exercise",
      content_type: "mission-draft",
      content: {
        title: "Draft Mission Statement",
        description: "Create a mission statement that reflects your family's purpose"
      },
      navigation: { previous: "values-matrix", next: "mission-final" },
      ai_config: { enabled: false },
      has_timer: false,
      timer_config: {},
      is_optional: false,
      show_conditions: {},
      created_at: new Date("2025-01-15").toISOString(),
      updated_at: new Date("2025-01-15").toISOString(),
    },
    {
      id: "vmv-v1-screen-6",
      template_id: "vmv-v1",
      screen_key: "mission-final",
      name: "Mission Finalization",
      description: "Finalize and approve mission statement",
      order_index: 6,
      duration_minutes: 10,
      screen_type: "discussion",
      content_type: "mission-approval",
      content: {
        title: "Finalize Mission",
        description: "Review and approve the final mission statement"
      },
      navigation: { previous: "mission-draft", next: "vision" },
      ai_config: { enabled: false },
      has_timer: false,
      timer_config: {},
      is_optional: false,
      show_conditions: {},
      created_at: new Date("2025-01-15").toISOString(),
      updated_at: new Date("2025-01-15").toISOString(),
    },
    {
      id: "vmv-v1-screen-7",
      template_id: "vmv-v1",
      screen_key: "vision",
      name: "Vision Creation",
      description: "Define family's long-term vision",
      order_index: 7,
      duration_minutes: 15,
      screen_type: "exercise",
      content_type: "vision-draft",
      content: {
        title: "Family Vision",
        description: "Describe where you see your family in 10-20 years"
      },
      navigation: { previous: "mission-final", next: "summary" },
      ai_config: { enabled: false },
      has_timer: false,
      timer_config: {},
      is_optional: false,
      show_conditions: {},
      created_at: new Date("2025-01-15").toISOString(),
      updated_at: new Date("2025-01-15").toISOString(),
    },
    {
      id: "vmv-v1-screen-8",
      template_id: "vmv-v1",
      screen_key: "summary",
      name: "Summary & Results",
      description: "Workshop summary and next steps",
      order_index: 8,
      duration_minutes: 10,
      screen_type: "text",
      content_type: "summary",
      content: {
        title: "Workshop Complete",
        description: "Review your family's values, mission, and vision"
      },
      navigation: { previous: "vision" },
      ai_config: { enabled: false },
      has_timer: false,
      timer_config: {},
      is_optional: false,
      show_conditions: {},
      created_at: new Date("2025-01-15").toISOString(),
      updated_at: new Date("2025-01-15").toISOString(),
    },
  ],
  screen_count: 8,
  created_at: new Date("2025-01-15").toISOString(),
  updated_at: new Date("2025-01-15").toISOString(),
  published_at: new Date("2025-01-15").toISOString(),
};
