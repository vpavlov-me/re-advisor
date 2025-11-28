# Data Schemas & API Endpoints

---

**Purpose:** Complete data model and API specification for Assessment Workshop implementation.

---

## Database Schema (PostgreSQL)

### Core Tables

```sql
-- Assessment Sessions
CREATE TABLE assessment_sessions (
  session_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family_id UUID NOT NULL REFERENCES families(family_id),

  status VARCHAR(20) NOT NULL CHECK (status IN (
    'draft', 'in_progress', 'completed', 'archived'
  )),

  mode VARCHAR(20) NOT NULL CHECK (mode IN (
    'self_paced', 'facilitated', 'ai_guided'
  )),

  facilitator_id UUID REFERENCES users(user_id),
  language VARCHAR(5) DEFAULT 'en',

  invited_users UUID[] NOT NULL,
  completed_users UUID[] DEFAULT '{}',

  overall_progress INTEGER DEFAULT 0 CHECK (overall_progress BETWEEN 0 AND 100),
  results_generated BOOLEAN DEFAULT FALSE,
  action_plan_created BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMP DEFAULT NOW(),
  started_at TIMESTAMP,
  completed_at TIMESTAMP,

  metadata JSONB DEFAULT '{}'
);

CREATE INDEX idx_sessions_family ON assessment_sessions(family_id);
CREATE INDEX idx_sessions_status ON assessment_sessions(status);


-- User Assessments (individual responses)
CREATE TABLE user_assessments (
  user_assessment_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES assessment_sessions(session_id),
  user_id UUID NOT NULL REFERENCES users(user_id),

  role VARCHAR(50) NOT NULL,
  generation VARCHAR(10) NOT NULL CHECK (generation IN ('G1', 'G2', 'G3+', 'external')),

  privacy_visibility VARCHAR(30) NOT NULL CHECK (privacy_visibility IN (
    'fully_anonymous', 'anonymous_revealable', 'named'
  )),
  text_comments_visibility VARCHAR(30) NOT NULL DEFAULT 'family_visible',

  completion_percentage INTEGER DEFAULT 0,
  questions_answered INTEGER DEFAULT 0,
  questions_skipped INTEGER DEFAULT 0,
  total_time_seconds INTEGER DEFAULT 0,

  started_at TIMESTAMP DEFAULT NOW(),
  last_activity_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP,

  UNIQUE(session_id, user_id)
);

CREATE INDEX idx_user_assessments_session ON user_assessments(session_id);
CREATE INDEX idx_user_assessments_user ON user_assessments(user_id);


-- Answers
CREATE TABLE answers (
  answer_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_assessment_id UUID NOT NULL REFERENCES user_assessments(user_assessment_id),
  question_id VARCHAR(20) NOT NULL,
  dimension_id VARCHAR(30) NOT NULL,

  -- Polymorphic value storage
  value_numeric NUMERIC,           -- For Likert scales
  value_text TEXT,                 -- For text responses
  value_boolean BOOLEAN,           -- For binary questions
  value_array TEXT[],              -- For multi-select

  text_comment TEXT,               -- Optional comment

  skipped BOOLEAN DEFAULT FALSE,

  answered_at TIMESTAMP DEFAULT NOW(),
  time_to_answer_seconds INTEGER,
  previous_edits INTEGER DEFAULT 0,

  metadata JSONB DEFAULT '{}'
);

CREATE INDEX idx_answers_user_assessment ON answers(user_assessment_id);
CREATE INDEX idx_answers_question ON answers(question_id);
CREATE INDEX idx_answers_dimension ON answers(dimension_id);


-- Dimension Scores
CREATE TABLE dimension_scores (
  score_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES assessment_sessions(session_id),
  user_id UUID REFERENCES users(user_id),  -- NULL for family aggregate
  dimension_id VARCHAR(30) NOT NULL,

  raw_score NUMERIC(5,3) NOT NULL,          -- 0.000 - 1.000
  normalized_score NUMERIC(5,2) NOT NULL,   -- 0.00 - 100.00
  confidence NUMERIC(3,2) NOT NULL,         -- 0.00 - 1.00

  questions_answered INTEGER NOT NULL,
  questions_total INTEGER NOT NULL,

  calculated_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(session_id, user_id, dimension_id)
);

CREATE INDEX idx_dimension_scores_session ON dimension_scores(session_id);


-- Consensus Analysis
CREATE TABLE consensus_analysis (
  analysis_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES assessment_sessions(session_id),
  dimension_id VARCHAR(30) NOT NULL,

  family_mean NUMERIC(5,2) NOT NULL,
  family_median NUMERIC(5,2) NOT NULL,
  std_deviation NUMERIC(5,2) NOT NULL,
  range_min NUMERIC(5,2) NOT NULL,
  range_max NUMERIC(5,2) NOT NULL,

  consensus_level VARCHAR(30) NOT NULL CHECK (consensus_level IN (
    'high', 'moderate', 'low', 'critical_divergence'
  )),

  outliers JSONB DEFAULT '[]',              -- Array of {user_id, score, deviation}
  question_consensus JSONB DEFAULT '{}',    -- Per-question consensus data
  generational_analysis JSONB,              -- G1 vs G2 gap analysis

  calculated_at TIMESTAMP DEFAULT NOW(),

  UNIQUE(session_id, dimension_id)
);

CREATE INDEX idx_consensus_session ON consensus_analysis(session_id);


-- Generated Insights
CREATE TABLE generated_insights (
  insight_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES assessment_sessions(session_id),

  type VARCHAR(20) NOT NULL CHECK (type IN (
    'strength', 'concern', 'divergence', 'opportunity'
  )),
  priority VARCHAR(20) NOT NULL CHECK (priority IN (
    'critical', 'high', 'medium', 'low'
  )),

  title VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,

  affected_dimensions VARCHAR(30)[] NOT NULL,
  evidence TEXT[] NOT NULL,

  recommendation TEXT,
  suggested_workshop VARCHAR(50),
  suggested_actions TEXT[],

  confidence_score NUMERIC(3,2) NOT NULL,   -- AI confidence

  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_insights_session ON generated_insights(session_id);
CREATE INDEX idx_insights_priority ON generated_insights(priority);


-- Action Plans
CREATE TABLE action_plans (
  plan_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES assessment_sessions(session_id),
  family_id UUID NOT NULL REFERENCES families(family_id),

  status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN (
    'draft', 'active', 'completed', 'archived'
  )),

  created_at TIMESTAMP DEFAULT NOW(),
  created_by UUID NOT NULL REFERENCES users(user_id),

  reminder_settings JSONB DEFAULT '{
    "email_reminders": true,
    "reminder_frequency": "monthly"
  }'
);

CREATE INDEX idx_action_plans_session ON action_plans(session_id);
CREATE INDEX idx_action_plans_family ON action_plans(family_id);


-- Priorities (part of action plan)
CREATE TABLE priorities (
  priority_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID NOT NULL REFERENCES action_plans(plan_id),
  insight_id UUID REFERENCES generated_insights(insight_id),

  rank INTEGER NOT NULL CHECK (rank BETWEEN 1 AND 10),
  title VARCHAR(200) NOT NULL,
  description TEXT,

  owner_user_id UUID NOT NULL REFERENCES users(user_id),
  co_owners UUID[] DEFAULT '{}',

  target_start DATE NOT NULL,
  target_completion DATE NOT NULL,

  first_step TEXT NOT NULL,

  suggested_workshop_id VARCHAR(50),
  workshop_booked BOOLEAN DEFAULT FALSE,

  status VARCHAR(20) NOT NULL DEFAULT 'not_started' CHECK (status IN (
    'not_started', 'in_progress', 'completed', 'blocked', 'cancelled'
  )),

  progress_percentage INTEGER DEFAULT 0,

  created_at TIMESTAMP DEFAULT NOW(),
  completed_at TIMESTAMP
);

CREATE INDEX idx_priorities_plan ON priorities(plan_id);
CREATE INDEX idx_priorities_owner ON priorities(owner_user_id);
```

---

## API Endpoints

### Base URL: `/api/v1/assessments`

### 1. Session Management

#### Create Assessment Session
```http
POST /api/v1/assessments
Authorization: Bearer {token}

Request:
{
  "family_id": "uuid",
  "mode": "self_paced" | "facilitated",
  "invited_users": ["uuid1", "uuid2"],
  "facilitator_id": "uuid",  // optional
  "language": "en" | "ru"
}

Response: 201 Created
{
  "session_id": "uuid",
  "status": "draft",
  "invite_links": {
    "user_id_1": "https://app.refamily.com/assessment/join/{token}",
    "user_id_2": "..."
  },
  "created_at": "2025-10-31T10:00:00Z"
}
```

#### Get Session Status
```http
GET /api/v1/assessments/:session_id
Authorization: Bearer {token}

Response: 200 OK
{
  "session_id": "uuid",
  "status": "in_progress",
  "overall_progress": 62,
  "completed_users": ["uuid1", "uuid2"],
  "pending_users": ["uuid3"],
  "results_available": false,
  "created_at": "...",
  "updated_at": "..."
}
```

### 2. User Assessment

#### Start User Assessment
```http
POST /api/v1/assessments/:session_id/users
Authorization: Bearer {token}

Request:
{
  "role": "heir_g2",
  "generation": "G2",
  "privacy_visibility": "anonymous_revealable",
  "text_comments_visibility": "family_visible"
}

Response: 201 Created
{
  "user_assessment_id": "uuid",
  "session_id": "uuid",
  "user_id": "uuid",
  "started_at": "..."
}
```

#### Get Progress
```http
GET /api/v1/assessments/:session_id/users/:user_id/progress
Authorization: Bearer {token}

Response: 200 OK
{
  "completion_percentage": 62,
  "questions_answered": 65,
  "questions_total": 105,
  "questions_skipped": 3,
  "current_dimension": "3_next_generation",
  "current_question": "Q3.8",
  "estimated_time_remaining_minutes": 35,
  "last_saved_at": "..."
}
```

### 3. Answer Submission

#### Submit Answer
```http
POST /api/v1/assessments/:session_id/answers
Authorization: Bearer {token}

Request:
{
  "user_assessment_id": "uuid",
  "question_id": "Q1.1",
  "dimension_id": "1_communication_trust",
  "value": 6,                    // Likert 7 value
  "text_comment": "Optional comment...",
  "time_to_answer_seconds": 45
}

Response: 201 Created
{
  "answer_id": "uuid",
  "next_question_id": "Q1.2",
  "dimension_progress": {
    "answered": 1,
    "total": 12,
    "percentage": 8
  },
  "overall_progress": 1,
  "saved_at": "..."
}
```

#### Bulk Submit (for facilitated sessions)
```http
POST /api/v1/assessments/:session_id/answers/bulk
Authorization: Bearer {token}

Request:
{
  "answers": [
    {
      "user_assessment_id": "uuid",
      "question_id": "Q1.1",
      "value": 6
    },
    ...
  ]
}

Response: 201 Created
{
  "created_count": 10,
  "failed_count": 0
}
```

### 4. Results & Synthesis

#### Generate Results
```http
POST /api/v1/assessments/:session_id/generate-results
Authorization: Bearer {token}

Response: 202 Accepted
{
  "job_id": "uuid",
  "status": "processing",
  "estimated_completion_seconds": 5
}
```

#### Get Results
```http
GET /api/v1/assessments/:session_id/results
Authorization: Bearer {token}

Response: 200 OK
{
  "session_id": "uuid",
  "generated_at": "...",

  "overall_maturity_score": 64.2,
  "maturity_level": "developing",

  "dimension_scores": [
    {
      "dimension_id": "1_communication_trust",
      "name": "Коммуникация и доверие",
      "family_mean": 78.5,
      "range": { "min": 72, "max": 85 },
      "consensus_level": "high"
    },
    ...
  ],

  "consensus_analysis": [...],
  "insights": [...],
  "recommended_workshops": [...]
}
```

#### Get Consensus Map
```http
GET /api/v1/assessments/:session_id/consensus
Authorization: Bearer {token}

Query params:
  ?dimension_id=1_communication_trust  // optional filter

Response: 200 OK
{
  "session_id": "uuid",
  "dimensions": [
    {
      "dimension_id": "2_financial_transparency",
      "consensus_level": "low",
      "std_deviation": 28.4,
      "divergent_questions": [
        {
          "question_id": "Q2.5",
          "question_text": "...",
          "g1_mean": 2.3,
          "g2_mean": 6.2,
          "gap": 3.9,
          "insight": "..."
        }
      ]
    }
  ]
}
```

#### Get AI Insights
```http
GET /api/v1/assessments/:session_id/insights
Authorization: Bearer {token}

Query params:
  ?priority=critical,high  // filter by priority

Response: 200 OK
{
  "session_id": "uuid",
  "insights": [
    {
      "insight_id": "uuid",
      "type": "concern",
      "priority": "critical",
      "title": "Разрыв в преемственности",
      "description": "...",
      "affected_dimensions": ["3_next_generation", "7_ownership_control"],
      "evidence": [...],
      "recommendation": "...",
      "suggested_workshop": "succession_planning",
      "confidence_score": 0.95
    },
    ...
  ]
}
```

### 5. Action Planning

#### Create Action Plan
```http
POST /api/v1/assessments/:session_id/action-plan
Authorization: Bearer {token}

Request:
{
  "priorities": [
    {
      "insight_id": "uuid",
      "rank": 1,
      "owner_user_id": "uuid",
      "co_owners": ["uuid2"],
      "target_start": "2025-11-15",
      "target_completion": "2026-03-15",
      "first_step": "Schedule kickoff meeting..."
    },
    ...
  ],
  "reminder_settings": {
    "email_reminders": true,
    "reminder_frequency": "monthly"
  }
}

Response: 201 Created
{
  "plan_id": "uuid",
  "session_id": "uuid",
  "priorities_count": 3,
  "status": "active",
  "created_at": "..."
}
```

#### Get Action Plan
```http
GET /api/v1/assessments/:session_id/action-plan
Authorization: Bearer {token}

Response: 200 OK
{
  "plan_id": "uuid",
  "session_id": "uuid",
  "status": "active",
  "priorities": [
    {
      "priority_id": "uuid",
      "rank": 1,
      "title": "Create succession plan",
      "owner": {
        "user_id": "uuid",
        "name": "Владислав"
      },
      "target_start": "2025-11-15",
      "target_completion": "2026-03-15",
      "status": "in_progress",
      "progress_percentage": 25
    },
    ...
  ],
  "created_at": "..."
}
```

#### Update Priority Progress
```http
PATCH /api/v1/action-plans/:plan_id/priorities/:priority_id
Authorization: Bearer {token}

Request:
{
  "status": "in_progress",
  "progress_percentage": 25,
  "notes": "Kickoff meeting completed"
}

Response: 200 OK
{
  "priority_id": "uuid",
  "status": "in_progress",
  "progress_percentage": 25,
  "updated_at": "..."
}
```

### 6. Export

#### Export Results
```http
POST /api/v1/assessments/:session_id/export
Authorization: Bearer {token}

Request:
{
  "format": "pdf" | "pptx" | "xlsx",
  "include": {
    "radar_chart": true,
    "dimension_scores": true,
    "insights": true,
    "consensus_analysis": true,
    "individual_answers": false,  // requires permission
    "action_plan": true
  }
}

Response: 202 Accepted
{
  "export_id": "uuid",
  "status": "processing",
  "estimated_completion_seconds": 10
}
```

#### Download Export
```http
GET /api/v1/assessments/:session_id/exports/:export_id
Authorization: Bearer {token}

Response: 200 OK (if ready)
{
  "export_id": "uuid",
  "status": "completed",
  "download_url": "https://s3.../report.pdf",
  "expires_at": "2025-11-01T10:00:00Z"
}

OR

Response: 202 Accepted (if still processing)
{
  "status": "processing",
  "progress": 65
}
```

---

## WebSocket Events (Real-time Updates)

### Connection
```javascript
ws://app.refamily.com/api/v1/ws/assessments/:session_id
Authorization: Bearer {token}
```

### Events

#### Family Progress Update
```json
{
  "event": "progress_update",
  "data": {
    "user_id": "uuid",
    "user_name": "Мария",
    "completion_percentage": 75,
    "current_dimension": "5_values_mission"
  }
}
```

#### User Completed
```json
{
  "event": "user_completed",
  "data": {
    "user_id": "uuid",
    "user_name": "Дмитрий",
    "completed_at": "...",
    "total_users_completed": 3,
    "total_users_invited": 5
  }
}
```

#### All Completed (Trigger Results Generation)
```json
{
  "event": "all_completed",
  "data": {
    "session_id": "uuid",
    "completed_at": "...",
    "results_generating": true
  }
}
```

#### Results Ready
```json
{
  "event": "results_ready",
  "data": {
    "session_id": "uuid",
    "overall_maturity_score": 64.2,
    "results_url": "/assessments/uuid/results"
  }
}
```

---

## Data Flows

### Flow 1: Individual Assessment
```
1. POST /assessments → Create session
2. GET /assessments/:id → User joins
3. POST /assessments/:id/users → Start user assessment
4. Loop:
   - POST /assessments/:id/answers → Submit answer
   - GET /assessments/:id/users/:uid/progress → Check progress
5. When complete → WebSocket: user_completed event
6. When all complete → POST /assessments/:id/generate-results
7. GET /assessments/:id/results → View results
8. POST /assessments/:id/action-plan → Create plan
9. POST /assessments/:id/export → Export report
```

### Flow 2: Facilitator-Led Session
```
1. POST /assessments (mode=facilitated) → Create session
2. Facilitator navigates through questions
3. POST /assessments/:id/answers/bulk → Submit all answers at once
4. Immediate: POST /assessments/:id/generate-results
5. Present results to family in real-time
6. Collaborative: POST /assessments/:id/action-plan
```

---

## Performance SLAs

- Answer submission: <200ms p95
- Progress retrieval: <100ms p95
- Results generation: <5 seconds (complete assessment)
- Export generation: <10 seconds (PDF)
- WebSocket latency: <50ms

---

**Implementation Notes:**
- Use PostgreSQL JSONB for flexible metadata storage
- Redis caching for frequently accessed data (progress, scores)
- Background jobs (Bull/Celery) for synthesis and exports
- WebSocket server for real-time collaboration
- S3 for export file storage with signed URLs
- Rate limiting: 100 requests/minute per user
