import type { WorkshopTemplateWithScreens, WorkshopScreen, WorkshopTemplateBlock } from "@/types/workshop-constructor";
import { VMV_WORKSHOP_BLOCKS } from "./vmv-workshop-blocks";

/**
 * Converts WorkshopTemplateBlock to WorkshopScreen format
 */
function convertBlockToScreen(
  block: WorkshopTemplateBlock,
  templateId: string,
  orderIndex: number
): WorkshopScreen {
  return {
    id: `${templateId}-screen-${block.block_key}`,
    template_id: templateId,
    screen_key: block.block_key,
    name: block.name,
    description: block.description,
    order_index: orderIndex,
    duration_minutes: block.estimated_duration,
    screen_type: block.screen_type,
    content_type: block.content_type,
    content: block.default_content,
    navigation: block.default_navigation,
    ai_config: block.default_ai_config,
    has_timer: false,
    timer_config: {},
    is_optional: false,
    show_conditions: {},
    created_at: block.created_at,
    updated_at: block.updated_at,
  };
}

/**
 * VMV Workshop Master Template
 *
 * This is a complete, ready-to-use workshop template for Values, Mission and Vision
 * that appears as a master template card in the Workshop Constructor.
 *
 * Contains 15 pre-configured screens covering all 5 phases:
 * - Phase 1: Introduction and Rules
 * - Phase 2: Values Definition (Brainstorming → Consolidation → Voting → Results)
 * - Phase 3: Mission Development (Discussion → Draft → Refinement → Approval)
 * - Phase 4: Vision Creation (Brainstorming → Draft → Refinement → Approval)
 * - Phase 5: Results Summary and Next Steps
 */
const TEMPLATE_ID = "vmv-master-template";

export const VMV_MASTER_TEMPLATE: WorkshopTemplateWithScreens = {
  id: TEMPLATE_ID,
  created_by: "system",
  name: "Values, Mission and Vision Workshop",
  description: "Complete workshop template for defining your family's core values, mission statement, and long-term vision. Includes AI-powered facilitation, collaborative editing, and structured decision-making across 15 interactive screens.",
  duration_minutes: 120, // 90-120 minutes
  target_audience: "Family Council, Board Members, All Family Members",
  category: "Values",
  is_public: true,
  is_master: true,
  cloned_from: null,
  version: 1,
  status: "published",
  settings: {
    enableAI: true,
    enableChat: true,
    enableCollaboration: true,
    allowSkipScreens: false,
    showProgressBar: true,
    requireCompletion: true,
  },
  screens: VMV_WORKSHOP_BLOCKS.map((block, index) =>
    convertBlockToScreen(block, TEMPLATE_ID, index + 1)
  ),
  screen_count: VMV_WORKSHOP_BLOCKS.length, // 15 screens
  created_at: new Date("2025-01-15").toISOString(),
  updated_at: new Date("2025-01-15").toISOString(),
  published_at: new Date("2025-01-15").toISOString(),
};
