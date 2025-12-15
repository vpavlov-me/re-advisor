-- VMV Workshop Tables Migration
-- Values, Mission & Vision Workshop System

-- =============================================
-- VMV Workshop Sessions
-- =============================================
CREATE TABLE vmv_workshop_sessions (
  id BIGSERIAL PRIMARY KEY,
  family_id BIGINT REFERENCES families(id) ON DELETE CASCADE,
  facilitator_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT,

  -- Workshop Configuration
  format TEXT NOT NULL CHECK (format IN ('online', 'offline', 'hybrid')),
  mode TEXT NOT NULL CHECK (mode IN ('synchronous', 'asynchronous')),
  facilitation_type TEXT NOT NULL CHECK (facilitation_type IN ('ai', 'human')),
  expected_duration INTEGER, -- minutes

  -- Schedule (optional for async)
  scheduled_date TIMESTAMPTZ,
  scheduled_time TIME,
  meeting_link TEXT,

  -- Status & Progress
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'in_progress', 'completed', 'cancelled')),
  current_stage INTEGER DEFAULT 1,

  -- Results
  selected_values JSONB, -- Array of selected values
  final_values JSONB, -- Top 5 values with definitions
  mission_statement TEXT,
  mission_short TEXT,
  vision JSONB, -- Vision by dimensions

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- =============================================
-- Workshop Participants
-- =============================================
CREATE TABLE vmv_workshop_participants (
  id BIGSERIAL PRIMARY KEY,
  workshop_id BIGINT REFERENCES vmv_workshop_sessions(id) ON DELETE CASCADE,

  -- Participant Info (either family member or guest)
  family_member_id BIGINT REFERENCES family_members(id),
  guest_email TEXT,
  guest_name TEXT,
  guest_phone TEXT,

  -- Status
  status TEXT NOT NULL DEFAULT 'invited' CHECK (status IN ('invited', 'confirmed', 'declined', 'attended')),
  joined_at TIMESTAMPTZ,

  -- Progress (for async mode)
  current_stage INTEGER DEFAULT 1,
  progress_data JSONB,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraint: must have either family_member_id or guest details
  CONSTRAINT participant_type_check CHECK (
    (family_member_id IS NOT NULL) OR
    (guest_email IS NOT NULL OR guest_phone IS NOT NULL)
  )
);

-- =============================================
-- Individual Value Selections
-- =============================================
CREATE TABLE vmv_value_selections (
  id BIGSERIAL PRIMARY KEY,
  workshop_id BIGINT REFERENCES vmv_workshop_sessions(id) ON DELETE CASCADE,
  participant_id BIGINT REFERENCES vmv_workshop_participants(id) ON DELETE CASCADE,

  value_name TEXT NOT NULL,
  is_custom BOOLEAN DEFAULT FALSE, -- if user added custom value
  selected_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(workshop_id, participant_id, value_name)
);

-- =============================================
-- Value Definitions (collaborative)
-- =============================================
CREATE TABLE vmv_value_definitions (
  id BIGSERIAL PRIMARY KEY,
  workshop_id BIGINT REFERENCES vmv_workshop_sessions(id) ON DELETE CASCADE,
  value_name TEXT NOT NULL,

  -- Value Matrix Components
  definition TEXT,
  we_always JSONB, -- Array of behaviors
  we_never JSONB, -- Array of anti-behaviors
  metrics JSONB, -- How we measure

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(workshop_id, value_name)
);

-- =============================================
-- Workshop Messages (Chat)
-- =============================================
CREATE TABLE vmv_workshop_messages (
  id BIGSERIAL PRIMARY KEY,
  workshop_id BIGINT REFERENCES vmv_workshop_sessions(id) ON DELETE CASCADE,
  participant_id BIGINT REFERENCES vmv_workshop_participants(id),

  message TEXT NOT NULL,
  message_type TEXT DEFAULT 'chat' CHECK (message_type IN ('chat', 'system', 'ai')),

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- AI Facilitator Tips (for human facilitators)
-- =============================================
CREATE TABLE vmv_facilitator_tips (
  id BIGSERIAL PRIMARY KEY,
  workshop_id BIGINT REFERENCES vmv_workshop_sessions(id) ON DELETE CASCADE,
  stage INTEGER NOT NULL,

  tip_type TEXT NOT NULL CHECK (tip_type IN ('script', 'timing', 'engagement', 'intervention')),
  content TEXT NOT NULL,
  shown BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- Stage Progress Tracking
-- =============================================
CREATE TABLE vmv_stage_progress (
  id BIGSERIAL PRIMARY KEY,
  workshop_id BIGINT REFERENCES vmv_workshop_sessions(id) ON DELETE CASCADE,
  stage INTEGER NOT NULL,

  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  time_spent INTEGER, -- seconds

  -- Stage-specific data
  stage_data JSONB,

  UNIQUE(workshop_id, stage)
);

-- =============================================
-- Individual Mission Drafts
-- =============================================
CREATE TABLE vmv_mission_drafts (
  id BIGSERIAL PRIMARY KEY,
  workshop_id BIGINT REFERENCES vmv_workshop_sessions(id) ON DELETE CASCADE,
  participant_id BIGINT REFERENCES vmv_workshop_participants(id) ON DELETE CASCADE,

  purpose TEXT,
  audience TEXT,
  approach TEXT,
  selected_values JSONB,
  generated_mission TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(workshop_id, participant_id)
);

-- =============================================
-- Voting Records (for collective decisions)
-- =============================================
CREATE TABLE vmv_votes (
  id BIGSERIAL PRIMARY KEY,
  workshop_id BIGINT REFERENCES vmv_workshop_sessions(id) ON DELETE CASCADE,
  participant_id BIGINT REFERENCES vmv_workshop_participants(id) ON DELETE CASCADE,

  vote_type TEXT NOT NULL CHECK (vote_type IN ('value_final', 'mission_approve', 'mission_revise')),
  vote_data JSONB NOT NULL, -- { value_name: "Integrity" } or { approve: true }

  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(workshop_id, participant_id, vote_type)
);

-- =============================================
-- Indexes for Performance
-- =============================================
CREATE INDEX idx_vmv_sessions_family ON vmv_workshop_sessions(family_id);
CREATE INDEX idx_vmv_sessions_facilitator ON vmv_workshop_sessions(facilitator_id);
CREATE INDEX idx_vmv_sessions_status ON vmv_workshop_sessions(status);
CREATE INDEX idx_vmv_participants_workshop ON vmv_workshop_participants(workshop_id);
CREATE INDEX idx_vmv_participants_family_member ON vmv_workshop_participants(family_member_id);
CREATE INDEX idx_vmv_messages_workshop ON vmv_workshop_messages(workshop_id);
CREATE INDEX idx_vmv_messages_created ON vmv_workshop_messages(workshop_id, created_at DESC);
CREATE INDEX idx_vmv_value_selections_workshop ON vmv_value_selections(workshop_id);
CREATE INDEX idx_vmv_value_selections_participant ON vmv_value_selections(participant_id);
CREATE INDEX idx_vmv_stage_progress_workshop ON vmv_stage_progress(workshop_id);
CREATE INDEX idx_vmv_votes_workshop ON vmv_votes(workshop_id);

-- =============================================
-- Row Level Security (RLS) Policies
-- =============================================

-- Enable RLS
ALTER TABLE vmv_workshop_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE vmv_workshop_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE vmv_value_selections ENABLE ROW LEVEL SECURITY;
ALTER TABLE vmv_value_definitions ENABLE ROW LEVEL SECURITY;
ALTER TABLE vmv_workshop_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE vmv_facilitator_tips ENABLE ROW LEVEL SECURITY;
ALTER TABLE vmv_stage_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE vmv_mission_drafts ENABLE ROW LEVEL SECURITY;
ALTER TABLE vmv_votes ENABLE ROW LEVEL SECURITY;

-- Workshop Sessions Policies
CREATE POLICY "Facilitators can view their workshops"
  ON vmv_workshop_sessions FOR SELECT
  USING (facilitator_id = auth.uid());

CREATE POLICY "Facilitators can create workshops"
  ON vmv_workshop_sessions FOR INSERT
  WITH CHECK (facilitator_id = auth.uid());

CREATE POLICY "Facilitators can update their workshops"
  ON vmv_workshop_sessions FOR UPDATE
  USING (facilitator_id = auth.uid());

CREATE POLICY "Facilitators can delete their workshops"
  ON vmv_workshop_sessions FOR DELETE
  USING (facilitator_id = auth.uid());

-- Workshop Participants Policies
CREATE POLICY "Participants can view workshop participants"
  ON vmv_workshop_participants FOR SELECT
  USING (
    workshop_id IN (
      SELECT id FROM vmv_workshop_sessions WHERE facilitator_id = auth.uid()
    ) OR
    id IN (
      SELECT id FROM vmv_workshop_participants
      WHERE family_member_id IN (
        SELECT id FROM family_members WHERE user_id = auth.uid()
      )
    )
  );

CREATE POLICY "Facilitators can manage participants"
  ON vmv_workshop_participants FOR ALL
  USING (
    workshop_id IN (
      SELECT id FROM vmv_workshop_sessions WHERE facilitator_id = auth.uid()
    )
  );

-- Value Selections Policies
CREATE POLICY "Users can view workshop value selections"
  ON vmv_value_selections FOR SELECT
  USING (
    workshop_id IN (
      SELECT ws.id FROM vmv_workshop_sessions ws
      LEFT JOIN vmv_workshop_participants wp ON ws.id = wp.workshop_id
      LEFT JOIN family_members fm ON wp.family_member_id = fm.id
      WHERE ws.facilitator_id = auth.uid() OR fm.user_id = auth.uid()
    )
  );

CREATE POLICY "Participants can manage their value selections"
  ON vmv_value_selections FOR ALL
  USING (
    participant_id IN (
      SELECT wp.id FROM vmv_workshop_participants wp
      LEFT JOIN family_members fm ON wp.family_member_id = fm.id
      WHERE fm.user_id = auth.uid()
    )
  );

-- Value Definitions Policies (collaborative)
CREATE POLICY "Workshop participants can view value definitions"
  ON vmv_value_definitions FOR SELECT
  USING (
    workshop_id IN (
      SELECT ws.id FROM vmv_workshop_sessions ws
      LEFT JOIN vmv_workshop_participants wp ON ws.id = wp.workshop_id
      LEFT JOIN family_members fm ON wp.family_member_id = fm.id
      WHERE ws.facilitator_id = auth.uid() OR fm.user_id = auth.uid()
    )
  );

CREATE POLICY "Workshop participants can edit value definitions"
  ON vmv_value_definitions FOR ALL
  USING (
    workshop_id IN (
      SELECT ws.id FROM vmv_workshop_sessions ws
      LEFT JOIN vmv_workshop_participants wp ON ws.id = wp.workshop_id
      LEFT JOIN family_members fm ON wp.family_member_id = fm.id
      WHERE ws.facilitator_id = auth.uid() OR fm.user_id = auth.uid()
    )
  );

-- Workshop Messages Policies
CREATE POLICY "Workshop participants can view messages"
  ON vmv_workshop_messages FOR SELECT
  USING (
    workshop_id IN (
      SELECT ws.id FROM vmv_workshop_sessions ws
      LEFT JOIN vmv_workshop_participants wp ON ws.id = wp.workshop_id
      LEFT JOIN family_members fm ON wp.family_member_id = fm.id
      WHERE ws.facilitator_id = auth.uid() OR fm.user_id = auth.uid()
    )
  );

CREATE POLICY "Workshop participants can send messages"
  ON vmv_workshop_messages FOR INSERT
  WITH CHECK (
    workshop_id IN (
      SELECT ws.id FROM vmv_workshop_sessions ws
      LEFT JOIN vmv_workshop_participants wp ON ws.id = wp.workshop_id
      LEFT JOIN family_members fm ON wp.family_member_id = fm.id
      WHERE ws.facilitator_id = auth.uid() OR fm.user_id = auth.uid()
    )
  );

-- Facilitator Tips Policies (only for facilitators)
CREATE POLICY "Facilitators can view their tips"
  ON vmv_facilitator_tips FOR SELECT
  USING (
    workshop_id IN (
      SELECT id FROM vmv_workshop_sessions WHERE facilitator_id = auth.uid()
    )
  );

CREATE POLICY "Facilitators can manage tips"
  ON vmv_facilitator_tips FOR ALL
  USING (
    workshop_id IN (
      SELECT id FROM vmv_workshop_sessions WHERE facilitator_id = auth.uid()
    )
  );

-- Stage Progress Policies
CREATE POLICY "Workshop participants can view stage progress"
  ON vmv_stage_progress FOR SELECT
  USING (
    workshop_id IN (
      SELECT ws.id FROM vmv_workshop_sessions ws
      LEFT JOIN vmv_workshop_participants wp ON ws.id = wp.workshop_id
      LEFT JOIN family_members fm ON wp.family_member_id = fm.id
      WHERE ws.facilitator_id = auth.uid() OR fm.user_id = auth.uid()
    )
  );

CREATE POLICY "Facilitators can manage stage progress"
  ON vmv_stage_progress FOR ALL
  USING (
    workshop_id IN (
      SELECT id FROM vmv_workshop_sessions WHERE facilitator_id = auth.uid()
    )
  );

-- Mission Drafts Policies
CREATE POLICY "Participants can view mission drafts"
  ON vmv_mission_drafts FOR SELECT
  USING (
    workshop_id IN (
      SELECT ws.id FROM vmv_workshop_sessions ws
      LEFT JOIN vmv_workshop_participants wp ON ws.id = wp.workshop_id
      LEFT JOIN family_members fm ON wp.family_member_id = fm.id
      WHERE ws.facilitator_id = auth.uid() OR fm.user_id = auth.uid()
    )
  );

CREATE POLICY "Participants can manage their mission drafts"
  ON vmv_mission_drafts FOR ALL
  USING (
    participant_id IN (
      SELECT wp.id FROM vmv_workshop_participants wp
      LEFT JOIN family_members fm ON wp.family_member_id = fm.id
      WHERE fm.user_id = auth.uid()
    )
  );

-- Votes Policies
CREATE POLICY "Participants can view votes"
  ON vmv_votes FOR SELECT
  USING (
    workshop_id IN (
      SELECT ws.id FROM vmv_workshop_sessions ws
      LEFT JOIN vmv_workshop_participants wp ON ws.id = wp.workshop_id
      LEFT JOIN family_members fm ON wp.family_member_id = fm.id
      WHERE ws.facilitator_id = auth.uid() OR fm.user_id = auth.uid()
    )
  );

CREATE POLICY "Participants can manage their votes"
  ON vmv_votes FOR ALL
  USING (
    participant_id IN (
      SELECT wp.id FROM vmv_workshop_participants wp
      LEFT JOIN family_members fm ON wp.family_member_id = fm.id
      WHERE fm.user_id = auth.uid()
    )
  );

-- =============================================
-- Functions
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_vmv_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_vmv_workshop_sessions_updated_at
  BEFORE UPDATE ON vmv_workshop_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_vmv_updated_at();

CREATE TRIGGER update_vmv_workshop_participants_updated_at
  BEFORE UPDATE ON vmv_workshop_participants
  FOR EACH ROW
  EXECUTE FUNCTION update_vmv_updated_at();

CREATE TRIGGER update_vmv_value_definitions_updated_at
  BEFORE UPDATE ON vmv_value_definitions
  FOR EACH ROW
  EXECUTE FUNCTION update_vmv_updated_at();

CREATE TRIGGER update_vmv_mission_drafts_updated_at
  BEFORE UPDATE ON vmv_mission_drafts
  FOR EACH ROW
  EXECUTE FUNCTION update_vmv_updated_at();

-- =============================================
-- Comments
-- =============================================
COMMENT ON TABLE vmv_workshop_sessions IS 'Values, Mission & Vision workshop sessions';
COMMENT ON TABLE vmv_workshop_participants IS 'Participants in VMV workshops (family members or guests)';
COMMENT ON TABLE vmv_value_selections IS 'Individual value selections by participants';
COMMENT ON TABLE vmv_value_definitions IS 'Collaborative value definitions with behaviors and metrics';
COMMENT ON TABLE vmv_workshop_messages IS 'Real-time chat messages during workshops';
COMMENT ON TABLE vmv_facilitator_tips IS 'AI-generated tips for human facilitators';
COMMENT ON TABLE vmv_stage_progress IS 'Progress tracking for each workshop stage';
COMMENT ON TABLE vmv_mission_drafts IS 'Individual mission statement drafts';
COMMENT ON TABLE vmv_votes IS 'Voting records for collective decisions';
