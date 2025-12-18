-- Workshop Constructor Tables
-- Allows advisers to create custom workshop templates

-- Main workshop templates table
CREATE TABLE IF NOT EXISTS workshop_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_by UUID REFERENCES profiles(id) ON DELETE CASCADE,

  -- Basic information
  name VARCHAR(255) NOT NULL,
  description TEXT,
  duration_minutes INTEGER, -- estimated total duration
  target_audience VARCHAR(100), -- "Family Council", "Board", "All Family Members", etc.
  category VARCHAR(50), -- "Governance", "Succession", "Values", "Custom"

  -- Template metadata
  is_public BOOLEAN DEFAULT FALSE, -- can be shared with other advisers
  is_master BOOLEAN DEFAULT FALSE, -- master template that can be cloned
  cloned_from UUID REFERENCES workshop_templates(id) ON DELETE SET NULL,
  version INTEGER DEFAULT 1,

  -- Template status
  status VARCHAR(20) DEFAULT 'draft', -- draft, published, archived

  -- Configuration
  settings JSONB DEFAULT '{}'::jsonb, -- { enableAI, enableChat, enableCollaboration, etc. }

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  published_at TIMESTAMPTZ
);

-- Workshop screens/modules (stages of the workshop)
CREATE TABLE IF NOT EXISTS workshop_screens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_id UUID REFERENCES workshop_templates(id) ON DELETE CASCADE,

  -- Screen identification
  screen_key VARCHAR(100) NOT NULL, -- unique key like "kick-off", "values-select"
  name VARCHAR(255) NOT NULL,
  description TEXT,

  -- Order and timing
  order_index INTEGER NOT NULL,
  duration_minutes INTEGER,

  -- Screen type and configuration
  screen_type VARCHAR(50) NOT NULL, -- "text", "exercise", "discussion", "assessment", "visualization"
  content_type VARCHAR(50), -- specific type: "questionnaire", "raci-matrix", "voting", etc.

  -- Content
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  /* Content structure examples:
    Text: { text, instructions, examples }
    Exercise: { type, instructions, fields, options }
    Discussion: { questions, format, aiPrompt }
    Assessment: { questions, scale, options }
    Visualization: { chartType, dataPoints, config }
  */

  -- Navigation logic
  navigation JSONB DEFAULT '{}'::jsonb,
  /* Navigation structure:
    {
      next: "screen-key",
      previous: "screen-key",
      conditionalNext: [
        { condition: "answer_x == 'yes'", target: "screen-5" },
        { condition: "answer_x == 'no'", target: "screen-7" }
      ],
      canSkip: true/false,
      requiredFields: ["field1", "field2"]
    }
  */

  -- AI facilitation
  ai_config JSONB DEFAULT '{}'::jsonb,
  /* AI configuration:
    {
      enabled: true/false,
      prompt: "AI facilitation prompt",
      style: "supportive" | "neutral" | "strict",
      keyTopics: ["topic1", "topic2"],
      interventionTriggers: ["confusion", "conflict", "silence"]
    }
  */

  -- Timing controls
  has_timer BOOLEAN DEFAULT FALSE,
  timer_config JSONB DEFAULT '{}'::jsonb, -- { duration, showWarning, canExtend, autoAdvance }

  -- Visibility and requirements
  is_optional BOOLEAN DEFAULT FALSE,
  show_conditions JSONB DEFAULT '{}'::jsonb, -- conditions for showing this screen

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Workshop screen elements (individual components within a screen)
CREATE TABLE IF NOT EXISTS workshop_screen_elements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  screen_id UUID REFERENCES workshop_screens(id) ON DELETE CASCADE,

  -- Element identification
  element_key VARCHAR(100) NOT NULL,
  element_type VARCHAR(50) NOT NULL, -- "text", "question", "input", "chart", "image", "video", "file"

  -- Positioning
  order_index INTEGER NOT NULL,
  layout_config JSONB DEFAULT '{}'::jsonb, -- { width, height, position, responsive }

  -- Content
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  /* Content varies by element_type:
    text: { text, format, style }
    question: { question, type, options, required, validation }
    input: { label, type, placeholder, validation }
    chart: { type, data, config }
    image: { url, alt, caption }
    file: { url, name, type, downloadable }
  */

  -- Interactivity
  is_interactive BOOLEAN DEFAULT FALSE,
  validation_rules JSONB DEFAULT '{}'::jsonb,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pre-built template blocks library
CREATE TABLE IF NOT EXISTS workshop_template_blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Block identification
  block_key VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(50), -- "kickoff", "assessment", "exercise", "wrapup"

  -- Block content (can be copied to workshop_screens)
  screen_type VARCHAR(50) NOT NULL,
  content_type VARCHAR(50),
  default_content JSONB NOT NULL DEFAULT '{}'::jsonb,
  default_navigation JSONB DEFAULT '{}'::jsonb,
  default_ai_config JSONB DEFAULT '{}'::jsonb,

  -- Metadata
  tags VARCHAR(50)[],
  estimated_duration INTEGER, -- minutes
  thumbnail_url TEXT,

  -- Usage stats
  usage_count INTEGER DEFAULT 0,

  -- Visibility
  is_system BOOLEAN DEFAULT TRUE, -- system-provided vs user-created
  created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Workshop instances (when a template is shared with a family)
CREATE TABLE IF NOT EXISTS workshop_instances (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_id UUID REFERENCES workshop_templates(id) ON DELETE CASCADE,
  family_id UUID REFERENCES families(id) ON DELETE CASCADE,
  adviser_id UUID REFERENCES profiles(id) ON DELETE CASCADE,

  -- Instance metadata
  name VARCHAR(255) NOT NULL, -- can override template name
  scheduled_at TIMESTAMPTZ,
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,

  -- Status tracking
  status VARCHAR(20) DEFAULT 'shared', -- shared, scheduled, in_progress, completed, cancelled
  current_screen_key VARCHAR(100),

  -- Instance data (family-specific responses and outputs)
  instance_data JSONB DEFAULT '{}'::jsonb,
  /* Structure:
    {
      screens: {
        "screen-key": {
          responses: {},
          completedAt: timestamp,
          timeSpent: seconds
        }
      },
      artifacts: [
        { type: "document", name: "Governance Blueprint", url: "..." }
      ]
    }
  */

  -- Sharing and permissions
  shared_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
  shared_at TIMESTAMPTZ DEFAULT NOW(),
  share_message TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Workshop instance participants (family members in a workshop instance)
CREATE TABLE IF NOT EXISTS workshop_instance_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  instance_id UUID REFERENCES workshop_instances(id) ON DELETE CASCADE,
  family_member_id UUID REFERENCES family_members(id) ON DELETE CASCADE,

  -- Participation
  status VARCHAR(20) DEFAULT 'invited', -- invited, joined, completed
  current_screen_key VARCHAR(100),

  -- Progress tracking
  participant_data JSONB DEFAULT '{}'::jsonb,
  /* Structure:
    {
      screensCompleted: ["screen-1", "screen-2"],
      responses: {
        "screen-key": {
          "element-key": "value"
        }
      },
      timeSpent: { "screen-1": 300, "screen-2": 450 }
    }
  */

  -- Engagement
  joined_at TIMESTAMPTZ,
  last_active_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Workshop analytics (for adviser insights)
CREATE TABLE IF NOT EXISTS workshop_analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  instance_id UUID REFERENCES workshop_instances(id) ON DELETE CASCADE,

  -- Timing metrics
  total_duration_seconds INTEGER,
  screen_durations JSONB DEFAULT '{}'::jsonb, -- { "screen-key": seconds }

  -- Engagement metrics
  participant_engagement JSONB DEFAULT '{}'::jsonb,
  /* Structure:
    {
      "participant_id": {
        "timeSpent": seconds,
        "screensCompleted": count,
        "interactionCount": count,
        "engagementLevel": "high" | "medium" | "low"
      }
    }
  */

  -- Completion metrics
  completion_rate DECIMAL(5,2), -- percentage
  dropout_screens VARCHAR(100)[], -- screens where participants dropped off

  -- Consensus metrics (for collaborative exercises)
  consensus_data JSONB DEFAULT '{}'::jsonb,

  -- Generated insights
  insights JSONB DEFAULT '{}'::jsonb, -- AI-generated insights

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indices for performance
CREATE INDEX idx_workshop_templates_created_by ON workshop_templates(created_by);
CREATE INDEX idx_workshop_templates_status ON workshop_templates(status);
CREATE INDEX idx_workshop_templates_category ON workshop_templates(category);

CREATE INDEX idx_workshop_screens_template_id ON workshop_screens(template_id);
CREATE INDEX idx_workshop_screens_order ON workshop_screens(template_id, order_index);

CREATE INDEX idx_workshop_elements_screen_id ON workshop_screen_elements(screen_id);
CREATE INDEX idx_workshop_elements_order ON workshop_screen_elements(screen_id, order_index);

CREATE INDEX idx_workshop_blocks_category ON workshop_template_blocks(category);
CREATE INDEX idx_workshop_blocks_key ON workshop_template_blocks(block_key);

CREATE INDEX idx_workshop_instances_template ON workshop_instances(template_id);
CREATE INDEX idx_workshop_instances_family ON workshop_instances(family_id);
CREATE INDEX idx_workshop_instances_adviser ON workshop_instances(adviser_id);
CREATE INDEX idx_workshop_instances_status ON workshop_instances(status);

CREATE INDEX idx_workshop_participants_instance ON workshop_instance_participants(instance_id);
CREATE INDEX idx_workshop_participants_member ON workshop_instance_participants(family_member_id);

CREATE INDEX idx_workshop_analytics_instance ON workshop_analytics(instance_id);

-- Row Level Security (RLS)
ALTER TABLE workshop_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshop_screens ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshop_screen_elements ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshop_template_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshop_instances ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshop_instance_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE workshop_analytics ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Templates: Advisers can CRUD their own templates, read public templates
CREATE POLICY "Advisers can view their own templates"
  ON workshop_templates FOR SELECT
  USING (created_by = auth.uid() OR is_public = TRUE);

CREATE POLICY "Advisers can create templates"
  ON workshop_templates FOR INSERT
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Advisers can update their own templates"
  ON workshop_templates FOR UPDATE
  USING (created_by = auth.uid());

CREATE POLICY "Advisers can delete their own templates"
  ON workshop_templates FOR DELETE
  USING (created_by = auth.uid());

-- Screens: Access controlled via template ownership
CREATE POLICY "Users can view screens of their templates"
  ON workshop_screens FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM workshop_templates
      WHERE workshop_templates.id = workshop_screens.template_id
      AND (workshop_templates.created_by = auth.uid() OR workshop_templates.is_public = TRUE)
    )
  );

CREATE POLICY "Users can manage screens of their templates"
  ON workshop_screens FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM workshop_templates
      WHERE workshop_templates.id = workshop_screens.template_id
      AND workshop_templates.created_by = auth.uid()
    )
  );

-- Screen elements: Access controlled via screen ownership
CREATE POLICY "Users can view elements of accessible screens"
  ON workshop_screen_elements FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM workshop_screens ws
      JOIN workshop_templates wt ON wt.id = ws.template_id
      WHERE ws.id = workshop_screen_elements.screen_id
      AND (wt.created_by = auth.uid() OR wt.is_public = TRUE)
    )
  );

CREATE POLICY "Users can manage elements of their screens"
  ON workshop_screen_elements FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM workshop_screens ws
      JOIN workshop_templates wt ON wt.id = ws.template_id
      WHERE ws.id = workshop_screen_elements.screen_id
      AND wt.created_by = auth.uid()
    )
  );

-- Template blocks: Everyone can read, only system/creators can modify
CREATE POLICY "Everyone can view template blocks"
  ON workshop_template_blocks FOR SELECT
  TO authenticated
  USING (TRUE);

CREATE POLICY "Users can create custom blocks"
  ON workshop_template_blocks FOR INSERT
  WITH CHECK (created_by = auth.uid() AND is_system = FALSE);

CREATE POLICY "Users can update their own blocks"
  ON workshop_template_blocks FOR UPDATE
  USING (created_by = auth.uid() AND is_system = FALSE);

-- Workshop instances: Advisers see their instances, families see theirs
CREATE POLICY "Advisers can view their workshop instances"
  ON workshop_instances FOR SELECT
  USING (adviser_id = auth.uid());

CREATE POLICY "Family members can view workshops shared with their family"
  ON workshop_instances FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM family_members
      WHERE family_members.family_id = workshop_instances.family_id
      AND family_members.user_id = auth.uid()
    )
  );

CREATE POLICY "Advisers can create workshop instances"
  ON workshop_instances FOR INSERT
  WITH CHECK (adviser_id = auth.uid());

CREATE POLICY "Advisers can update their workshop instances"
  ON workshop_instances FOR UPDATE
  USING (adviser_id = auth.uid());

-- Participants: Access via instance permissions
CREATE POLICY "Users can view participants of accessible instances"
  ON workshop_instance_participants FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM workshop_instances wi
      WHERE wi.id = workshop_instance_participants.instance_id
      AND (
        wi.adviser_id = auth.uid()
        OR EXISTS (
          SELECT 1 FROM family_members
          WHERE family_members.family_id = wi.family_id
          AND family_members.user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Advisers can manage participants"
  ON workshop_instance_participants FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM workshop_instances
      WHERE workshop_instances.id = workshop_instance_participants.instance_id
      AND workshop_instances.adviser_id = auth.uid()
    )
  );

-- Analytics: Only advisers can view their analytics
CREATE POLICY "Advisers can view analytics for their instances"
  ON workshop_analytics FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM workshop_instances
      WHERE workshop_instances.id = workshop_analytics.instance_id
      AND workshop_instances.adviser_id = auth.uid()
    )
  );

CREATE POLICY "System can manage analytics"
  ON workshop_analytics FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM workshop_instances
      WHERE workshop_instances.id = workshop_analytics.instance_id
      AND workshop_instances.adviser_id = auth.uid()
    )
  );

-- Functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_workshop_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_workshop_templates_updated_at
  BEFORE UPDATE ON workshop_templates
  FOR EACH ROW EXECUTE FUNCTION update_workshop_updated_at();

CREATE TRIGGER update_workshop_screens_updated_at
  BEFORE UPDATE ON workshop_screens
  FOR EACH ROW EXECUTE FUNCTION update_workshop_updated_at();

CREATE TRIGGER update_workshop_elements_updated_at
  BEFORE UPDATE ON workshop_screen_elements
  FOR EACH ROW EXECUTE FUNCTION update_workshop_updated_at();

CREATE TRIGGER update_workshop_blocks_updated_at
  BEFORE UPDATE ON workshop_template_blocks
  FOR EACH ROW EXECUTE FUNCTION update_workshop_updated_at();

CREATE TRIGGER update_workshop_instances_updated_at
  BEFORE UPDATE ON workshop_instances
  FOR EACH ROW EXECUTE FUNCTION update_workshop_updated_at();

CREATE TRIGGER update_workshop_participants_updated_at
  BEFORE UPDATE ON workshop_instance_participants
  FOR EACH ROW EXECUTE FUNCTION update_workshop_updated_at();
