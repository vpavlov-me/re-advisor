---
doc_id: "DOC-WRK-002"
title: "Mission, Vision & Values Workshop - Digital Interface Specification"
type: "workshop-specification"
category: "product"
audience: "product-manager|designer|developer"
complexity: "advanced"
created: "2025-10-29"
updated: "2025-10-29"
version: "1.0.0"
status: "draft"
tags: ["workshop", "values", "mission", "vision", "family-identity", "collaborative-interface"]
related: ["DOC-SYS-001", "DOC-USR-006", "DOC-WRK-001"]
owner: "product-team"
maintainer: "product-team"
priority: "high"
---

# Mission, Vision & Values Workshop
## Digital Interface Specification

> **Purpose**: Detailed screen-by-screen specification for digital collaborative workshop interface. Enables Consultant to facilitate "Family Identity & Purpose" workshop with real-time family participation.

---

## 📋 Document Overview

### Workshop Summary
- **Title**: "История, ценности, миссия, видение" (Family Identity & Purpose)
- **Goal**: Создать draft семейных ценностей, миссии и 10-20 летнего видения
- **Duration**: 3-3.5 hours
- **Format**: Digital collaborative session (real-time)
- **Facilitator**: Consultant (via Advisor Portal)
- **Participants**: Family Council, Family Assembly members, external advisors

### Workshop Outputs
1. **Family Timeline** - Historical events, key choices, lessons learned
2. **Values Matrix** - 5-7 core values with behavioral indicators
3. **Family Mission Statement** - Purpose and impact statement
4. **10-20 Year Vision** - Strategic future state across 6 dimensions
5. **Dilemmas Framework** - Stress-test scenarios for values
6. **Constitution Integration Map** - Where values/mission/vision appear in governance docs

### Document Structure
1. **Pre-Workshop Introduction** - Onboarding participants
2. **Architecture Overview** - Technical foundation
3. **Workshop Screens (6)** - Detailed screen specifications
4. **Post-Workshop Integration** - Artifact deployment

---

## 🎯 PART 1: Pre-Workshop Introduction

### Screen 0: Workshop Orientation & Setup

**Purpose**: Ensure all participants understand workshop goals, process, and expected contributions

#### 🎨 Layout Description

**Header Section:**
- Workshop title: "Mission, Vision & Values Workshop"
- Session ID and date/time
- Participant count indicator (e.g., "12 of 15 participants joined")
- Language selector: RU / EN toggle

**Hero Section (Center):**
- Large visual roadmap showing 6 stages as timeline
- Progress indicator: "Not started"
- Estimated duration: 3-3.5 hours
- Countdown timer to scheduled start time

**What We'll Do Panel (Left Column):**
```
📚 Workshop Roadmap

Stage 1: Family Timeline & Lessons (40 min) 🌟
Stage 2: Core Values Discovery (45 min) ⭐
Stage 3: Values Matrix & Behaviors (30 min)
Stage 4: Family Mission Statement (35 min)
Stage 5: 10-20 Year Vision Canvas (40 min)
Stage 6: Integration & Next Steps (20 min)

🌟 = Most reflective/emotional section
⭐ = Most collaborative section
```

**Why This Matters Panel (Center-Left):**
```
🎯 Foundation for Everything Else

✅ Unifies Family Purpose
   → Everyone aligned on "why we exist"
   → Shared sense of identity and legacy
   → Foundation for all governance decisions

✅ Guides Difficult Decisions
   → Values provide decision framework
   → Mission clarifies priorities
   → Vision sets strategic direction

✅ Builds Multi-Generational Legacy
   → Passes down what matters most
   → NextGen understands family story
   → Creates continuity across generations

✅ Strengthens Family Bond
   → Shared reflection builds connection
   → Articulating values creates clarity
   → Vision aligns everyone's efforts

📊 Research Shows:
   • 85% of successful family businesses have 
     clearly articulated values
   • Families with written mission statements 
     have 3x better succession outcomes
   • Values-driven families report 60% higher 
     satisfaction with family governance
```

**How Results Will Be Used Panel (Center-Right):**
```
🔗 Direct Integration into Your Governance

After workshop completion, outputs become:

📜 Family Constitution Core
   → Values = Section 2 (referenced everywhere)
   → Mission = Preamble (context for all policies)
   → Vision = Appendix (reviewed annually)
   
🎯 Decision-Making Framework
   → Automatic integration with Decision Module
   → Every decision proposal includes:
     * "Which values does this support?"
     * "How does this align with our mission?"
   → Values-based decision scoring

👨‍👩‍👧‍👦 Family Code of Conduct
   → Behavioral expectations based on values
   → Conflict resolution guided by values
   → Family member commitments

📈 Strategic Planning
   → Vision informs 5-year family strategy
   → Annual goals aligned to vision milestones
   → Performance metrics tied to vision

📅 Annual Review Process
   → First Family Assembly review in 12 months
   → Ongoing refinement as family evolves
   → Living document, not static

All outputs auto-populate your platform modules!
```

**Participant Roles Panel (Right Column):**
```
👥 Your Role in This Workshop

🎤 Consultant (Facilitator)
   • Guides reflective discussions
   • Provides values articulation frameworks
   • Cannot vote on family-specific content
   • Ensures all voices heard

👑 Family Council Members
   • Lead values articulation process
   • Shape mission and vision drafts
   • Vote on final wording
   • Drive consensus-building

👨‍👩‍👧‍👦 Family Assembly Members  
   • Share family stories and history
   • Contribute to values identification
   • Input on mission alignment
   • Ratify final mission/vision

📋 Observers (Advisors, Legal)
   • Provide expert perspective when requested
   • Ensure legal/governance alignment
   • Read-only access to discussions
   • No voting rights

This is collaborative storytelling - everyone's voice matters!
```

**Pre-Workshop Preparation (Bottom):**
```
📝 Homework to Bring (Optional but Helpful)

To make this workshop more meaningful:
[ ] Family photos from different eras (upload here)
[ ] Old family documents/letters (if available)
[ ] Stories from elders about family history
[ ] Personal reflections: "What makes our family special?"
[ ] Draft values you personally hold important

Upload materials: [Drag & Drop Zone]

💡 Tip: Interview older generation before workshop!
   Ask: "What values did our ancestors live by?"
         "What were the defining moments in our family?"
         "What should we never lose as a family?"

🔒 All materials confidential and encrypted
```

**Footer Section:**
- **Pre-Workshop Reflection Survey** button (10 min)
- **I'm Ready to Start** button (disabled until facilitator starts)
- **Technical Check** button (audio, video, connection test)
- **Download Preparation Guide** link (PDF with reflection questions)

---

#### 📊 Data Collected (Pre-Workshop Survey)

**Reflection Questions (Optional, helps facilitator):**
1. "What are you most proud of in your family's history?" (free text)
2. "What values do you think define our family today?" (free text, can list multiple)
3. "What should our family be known for 20 years from now?" (free text)
4. "What's one family story that shaped who we are?" (free text)
5. "How aligned do you feel family members are on values?" (scale 1-10)

**Stored in:**
- Education Service (port 8006) - workshop_sessions table
- Pre-workshop responses used by facilitator to seed discussions

---

#### 📄 Collaborative Mechanics

**Participant Joining:**
- Real-time participant list updates
- Green checkmark when participant completes prep survey
- Facilitator sees aggregated pre-workshop insights
- Chat panel for pre-workshop informal connection

**Material Upload:**
- Photos displayed in workshop photo gallery
- Documents stored for reference during timeline building
- Facilitator can spotlight specific materials during session

---

#### ⭐ Transition to Workshop

**"Start Workshop" button (Facilitator only):**
- Locks participant list (latecomers must request admission)
- Starts session timer
- Transitions all participants to Screen 1 simultaneously
- Creates session audit log entry
- Displays welcome message: "Welcome! Let's explore what makes your family unique."

---

## 🗂️ PART 2: Architecture Overview

### Technical Foundation

#### Services Used
```
Workshop Orchestration:
├── Education Service (8006) - Workshop engine, template management
├── Constitution Service (8002) - Values/Mission storage, integration
├── Decision Making Service (8009) - Values-based decision frameworks
├── Family Member Service (8004) - Participant profiles, family tree
├── Document Service (8008) - Photo storage, timeline artifacts
└── Notification Service (8010) - Real-time updates

Frontend:
├── Advisor Portal (3002) - Consultant facilitator interface
└── Family Portal (3001) - Participant interface

Real-time:
├── WebSocket connections for collaborative editing
└── Redis pub/sub for presence and multimedia sync
```

#### Multi-Tenancy & Security
- All workshop data isolated by `family_id`
- Personal stories encrypted at rest
- WebSocket connections authenticated with JWT
- Participant permissions checked on every action
- Audit trail for all contributions and edits

#### Data Model

```typescript
WorkshopSession {
  session_id: uuid
  family_id: uuid
  workshop_template_id: "mvv-family-identity"
  consultant_id: uuid
  status: "not_started" | "in_progress" | "completed"
  current_stage: 0-6
  started_at: timestamp
  completed_at: timestamp
  participants: [
    {
      user_id: uuid
      role: "facilitator" | "family_council" | "family_member" | "observer"
      joined_at: timestamp
      presence: "online" | "away" | "offline"
      contributions_count: number
    }
  ]
  stage_data: {
    stage_1_timeline: {...},
    stage_2_values_discovery: {...},
    stage_3_values_matrix: {...},
    stage_4_mission: {...},
    stage_5_vision: {...},
    stage_6_integration: {...}
  }
  artifacts: {
    family_timeline: {...},
    values_list: [...],
    values_matrix: {...},
    mission_statement: {...},
    vision_canvas: {...},
    integration_map: {...}
  }
  media: {
    photos: [...],
    documents: [...],
    recordings: [...] // If family allows recording
  }
}
```

---

## 🖥️ PART 3: Workshop Screens (Detailed Specifications)

---

### Screen 1: Family Timeline & Lessons (40 minutes)

#### 🎯 Goal
Create interactive family timeline capturing key events, decisions, proud moments, and lessons learned - establishing foundation for values discovery

#### ⏱️ Duration
40 minutes

#### 👥 Roles & Permissions

**Consultant (Facilitator):**
- Guides timeline building process
- Asks probing questions to surface stories
- Can add timeline events suggested by family
- Controls pacing and depth of discussion

**Family Council Members:**
- Full editing permissions on timeline
- Can add/edit/delete events
- Lead storytelling process
- Vote on which events to include

**Family Assembly Members:**
- Can propose events for timeline
- Can comment on events
- Share personal stories and memories
- Vote on lessons learned

**Observers:**
- Read-only view
- Can raise hand to contribute historical context

---

#### 🎨 Wireframe Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ Header: Mission, Vision & Values Workshop                      │
│ Stage 1 of 6: Family Timeline & Lessons | ⏱️ 40:00 | 👥 12     │
├─────────────────────────┬───────────────────────────────────────┤
│                         │                                       │
│  Facilitator Panel      │  Main Canvas: Interactive Timeline    │
│  (Left - 20%)           │  (Center - 60%)                       │
│                         │                                       │
│  📊 Timeline Progress:  │  ┌────────────────────────────────────┐│
│  Events added: 8/15     │  │  Family Timeline Canvas           ││
│  Decades covered: 4     │  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ││
│  Photos attached: 3     │  │                                    ││
│                         │  │  [Interactive horizontal timeline] ││
│  ⏰ Time Guidelines:    │  │                                    ││
│  • Discovery: 15 min    │  │  1950s   1970s   1990s   2010s    ││
│  • Deep dive: 20 min    │  │    │       │       │       │      ││
│  • Lessons: 5 min       │  │    ●───────●───────●───────●──    ││
│                         │  │    │       │       │       │      ││
│  💡 Facilitator Tips:   │  │  [Event cards appear on timeline] ││
│                         │  │                                    ││
│  Opening questions:     │  │  Currently hovering: 1987         ││
│  • "How did family      │  │  ┌─────────────────────────────┐  ││
│    start business?"     │  │  │ 📌 Event: Founded Company   │  ││
│  • "Biggest turning     │  │  │ Date: March 1987            │  ││
│    point?"              │  │  │                             │  ││
│  • "Proudest moment?"   │  │  │ 🎯 Key Choice:              │  ││
│  • "Hardest decision?"  │  │  │ Rejected investor offer,    │  ││
│                         │  │  │ maintained family control   │  ││
│  Deep dive prompts:     │  │  │                             │  ││
│  • "Who made decision?" │  │  │ 🏆 Proud Of:                │  ││
│  • "What were risks?"   │  │  │ Built from scratch,         │  ││
│  • "What did we learn?" │  │  │ employed 50 people          │  ││
│  • "How does this shape │  │  │                             │  ││
│    us today?"           │  │  │ 📚 Lesson Learned:          │  ││
│                         │  │  │ "Maintain independence at   │  ││
│  🎨 Themes Emerging:    │  │  │  all costs"                 │  ││
│  (Auto-detected)        │  │  │                             │  ││
│  • Independence         │  │  │ 👥 Contributors:            │  ││
│  • Family unity         │  │  │ Maria, John, Elena          │  ││
│  • Innovation           │  │  │                             │  ││
│  • Community service    │  │  │ 📷 [Photo icon]             │  ││
│                         │  │  │                             │  ││
│  📸 Media Gallery:      │  │  │ [Edit] [Delete] [Add Photo] │  ││
│  [3 photos uploaded]    │  │  └─────────────────────────────┘  ││
│  • 1960s factory        │  │                                    ││
│  • 1987 founding        │  │  [Zoom In] [Zoom Out] [Fit View]  ││
│  • 2010 expansion       │  │  [+ Add Event]                     ││
│                         │  └────────────────────────────────────┘│
│                         │                                       │
│  [Show All Events List] │  Event Creation Panel (Collapsed):   │
│                         │  [Click + Add Event to open]          │
│                         │                                       │
├─────────────────────────┼───────────────────────────────────────┤
│                         │  Participants Panel (Right - 20%)     │
│                         │                                       │
│                         │  👥 Active Contributors (12):         │
│                         │  🟢 Maria (typing...)                 │
│                         │  🟢 John (adding event)               │
│                         │  🟢 Elena (FC)                        │
│                         │  🟢 Alex (Facilitator)                │
│                         │  🟡 David (away)                      │
│                         │  ... [7 more]                         │
│                         │                                       │
│                         │  💬 Story Sharing Chat:               │
│                         │  ┌─────────────────────────────────┐ │
│                         │  │ Maria: "My father always said   │ │
│                         │  │        family comes first"      │ │
│                         │  │ John: "Remember when we almost  │ │
│                         │  │       lost everything in '08?"  │ │
│                         │  │ Elena: "That's when we learned  │ │
│                         │  │        resilience"              │ │
│                         │  └─────────────────────────────────┘ │
│                         │  [Type your story...]                 │
│                         │                                       │
│                         │  ✋ Raised Hands (0)                  │
│                         │                                       │
└─────────────────────────┴───────────────────────────────────────┘
│ Footer: [▶️ Next Stage] [📊 Progress: 1/6] [💾 Auto-saving...]  │
└─────────────────────────────────────────────────────────────────┘
```

---

#### 📊 Interactive Timeline Builder

**Timeline Features:**

**Horizontal Scrollable Canvas:**
- Zoomable timeline from earliest family history to present
- Decade markers automatically generated
- Events appear as cards on timeline
- Hover shows event preview
- Click expands full event detail panel

**Event Card Structure:**
```
Each event contains:
┌─────────────────────────────────┐
│ 📌 Event Title [Required]       │
│ Date/Period [Required]          │
│                                 │
│ 🎯 Key Choice Made              │
│ [Free text - optional]          │
│                                 │
│ 🏆 What We're Proud Of          │
│ [Free text - optional]          │
│                                 │
│ 📚 Lesson Learned               │
│ [Free text - required]          │
│                                 │
│ 👥 Contributors                 │
│ [Auto-tagged from edits]        │
│                                 │
│ 📷 Photos/Documents             │
│ [Upload zone]                   │
│                                 │
│ 🏷️ Auto-Detected Themes         │
│ #independence #family-unity     │
│                                 │
│ [💾 Save] [🗑️ Delete]            │
└─────────────────────────────────┘
```

**Add Event Modal:**
```
┌────────────────────────────────────────────────┐
│ ➕ Add Family Timeline Event                   │
│ ─────────────────────────────────────────────  │
│                                                │
│ Event Title:                                   │
│ [_______________________________________]      │
│                                                │
│ Date/Period:                                   │
│ (•) Specific date: [📅 MM/YYYY]                │
│ ( ) Period: [1990s ▼]                          │
│ ( ) "Early years" / "Founding era" [text]      │
│                                                │
│ Event Category: [Select ▼]                     │
│ • Business milestone                           │
│ • Family milestone                             │
│ • Crisis/Challenge overcome                    │
│ • Major decision                               │
│ • Achievement                                  │
│ • Generational transition                      │
│ • Custom: [_______]                            │
│                                                │
│ 🎯 Key Choice or Decision Made:                │
│ [Text area - 500 char max]                     │
│ What pivotal choice did the family make?       │
│                                                │
│ 🏆 What We're Proud Of:                        │
│ [Text area - 500 char max]                     │
│ What makes this moment special or important?   │
│                                                │
│ 📚 Lesson Learned: [Required]                  │
│ [Text area - 500 char max]                     │
│ What wisdom came from this experience?         │
│                                                │
│ 📷 Attach Photo or Document:                   │
│ [Drag & Drop or Browse]                        │
│ Accepted: JPG, PNG, PDF                        │
│                                                │
│ 👥 Who was involved?                           │
│ [Multi-select family members]                  │
│ ☐ Grandparents generation                      │
│ ☐ Parents generation                           │
│ ☐ Current generation                           │
│ ☐ External advisors                            │
│                                                │
│ [Cancel] [Save & Add to Timeline]              │
└────────────────────────────────────────────────┘
```

---

#### 💡 AI-Powered Theme Detection

As family adds events, AI automatically identifies recurring themes:

```
🎨 Emerging Themes (Auto-Detected)

Based on your 8 timeline events, we're detecting:

1. Independence & Autonomy (4 mentions)
   → "maintained control" (1987)
   → "rejected buyout" (2005)
   → "funded by family only" (2015)
   → "our way or no way" (2020)

2. Family Unity (3 mentions)
   → "stuck together during crisis" (2008)
   → "all generations participated" (2010)
   → "unanimous decision" (2018)

3. Long-term Thinking (3 mentions)
   → "passed on quick profit" (1995)
   → "invested in education" (2000)
   → "100-year vision" (2022)

4. Community Service (2 mentions)
   → "donated to hospital" (2003)
   → "scholarship program" (2019)

💡 These themes might become your core values!

[Mark as Potential Values] [Dismiss]
```

This AI analysis feeds directly into Stage 2 (Values Discovery)

---

#### 📸 Media Integration

**Photo Gallery Panel:**
```
┌────────────────────────────────┐
│ 📸 Timeline Photo Gallery       │
│ ────────────────────────────   │
│                                │
│ [Thumbnail Grid]               │
│ ┌───┐ ┌───┐ ┌───┐             │
│ │ 🖼 │ │ 🖼 │ │ 🖼 │             │
│ └───┘ └───┘ └───┘             │
│ 1960s  1987  2010              │
│                                │
│ [+ Upload Photos]              │
│                                │
│ Click any photo to:            │
│ • Attach to timeline event     │
│ • View full size               │
│ • Add caption                  │
│ • Tag family members           │
│                                │
│ 💡 Tip: Photos make timeline   │
│    more engaging for NextGen!  │
└────────────────────────────────┘
```

**Photo Attachment:**
- Drag photo from gallery to timeline event
- Photo appears as thumbnail on event card
- Click thumbnail to view full-size lightbox
- AI suggests which event based on photo date metadata

---

#### 💾 Data Collected

**Stage 1 Output:**
```json
{
  "stage_1": {
    "family_timeline": {
      "events": [
        {
          "event_id": "uuid",
          "title": "Founded Family Business",
          "date": "1987-03",
          "category": "business_milestone",
          "key_choice": "Rejected investor offer, maintained family control",
          "proud_of": "Built from scratch, employed 50 people in 5 years",
          "lesson_learned": "Independence and family control worth more than quick money",
          "contributors": ["user_id_1", "user_id_2"],
          "photos": ["photo_uuid_1"],
          "detected_themes": ["independence", "family_unity", "long_term_thinking"],
          "generation": "parents",
          "created_by": "user_id_1",
          "created_at": "2025-10-29T14:15:00Z"
        },
        // ... 7-15 more events typically
      ],
      "timeline_range": {
        "earliest_year": 1950,
        "latest_year": 2025,
        "span_years": 75
      },
      "detected_themes": {
        "independence": { "count": 4, "strength": "high" },
        "family_unity": { "count": 3, "strength": "medium" },
        "long_term_thinking": { "count": 3, "strength": "medium" },
        "community_service": { "count": 2, "strength": "low" }
      },
      "participant_contributions": {
        "total_events_added": 8,
        "total_edits": 23,
        "total_photos": 3,
        "top_contributors": ["Maria", "John", "Elena"]
      }
    },
    "photos": [
      {
        "photo_id": "uuid",
        "filename": "1987_founding.jpg",
        "upload_date": "2025-10-29T14:10:00Z",
        "uploaded_by": "user_id_2",
        "attached_to_events": ["event_uuid_1"],
        "caption": "Opening day of first factory",
        "date_taken": "1987-03-15"
      }
    ],
    "facilitator_notes": "Strong themes of independence and family unity. Multiple crises overcome together. Good foundation for values."
  }
}
```

**Stored in:**
- Education Service (port 8006) → workshop_sessions.stage_data
- Document Service (port 8008) → timeline photos
- Family Member Service (port 8004) → linked to family tree

---

#### 📄 Collaborative Mechanics

**Real-time Co-Creation:**
- Multiple family members can add events simultaneously
- Each event shows who's currently editing: "Maria is editing this event..."
- Auto-save every 5 seconds
- Conflict resolution: Last save wins, with full version history

**Storytelling Chat:**
- Side chat for sharing memories and anecdotes
- Facilitator can pin important stories to main screen
- Chat messages can be "promoted to event" with one click
  ```
  Maria: "Remember when grandfather turned down 
         that huge offer in 1995? He said 'money 
         comes and goes, but family stays forever'"
         
  [👍 5 reactions]
  
  [➕ Convert to Timeline Event] ← Facilitator button
  ```

**Photo Sharing:**
- Real-time photo upload during workshop
- Photos appear immediately in gallery for all participants
- Family members can react with emoji: ❤️ 😢 😊 👏
- Most-reacted photos highlighted for timeline

**Theme Voting:**
```
When AI detects themes, family can vote:

🎨 Detected Theme: "Independence"
   Appears in 4 events on timeline
   
   Is this an important family value?
   👍 Yes (8 votes)  👎 No (1 vote)  🤔 Maybe (2 votes)
   
   [Mark as Core Value for Stage 2]
```

---

#### ⭐ Transition

**"Next Stage" button (Facilitator):**

**Validation checks:**
1. ✅ Minimum 5 events added?
2. ✅ Each event has "Lesson Learned" filled?
3. ✅ Timeline covers at least 2 generations?
4. ⚠️  No photos attached - encourage adding some?

**Pre-transition summary modal:**
```
┌──────────────────────────────────────────┐
│ 📊 Stage 1 Complete - Timeline Summary   │
│ ──────────────────────────────────────── │
│                                          │
│ Events Captured: 8                       │
│ Time Span: 1950 - 2025 (75 years)       │
│ Photos Added: 3                          │
│ Participants Contributed: 9 of 12        │
│                                          │
│ 🎨 Top Emerging Themes:                  │
│ 1. Independence (4 mentions)             │
│ 2. Family Unity (3 mentions)             │
│ 3. Long-term Thinking (3 mentions)       │
│                                          │
│ These themes will seed your values       │
│ discovery in Stage 2.                    │
│                                          │
│ 💡 Well done! You've captured your       │
│    family story.                         │
│                                          │
│ [< Back to Timeline] [Continue to Stage 2│
└──────────────────────────────────────────┘
```

**If validation passes:**
- Saves complete timeline with all photos
- Generates timeline visualization (PDF export)
- Passes detected themes to Stage 2 as seeds
- Auto-transition to Screen 2
- Transition logged

---

### Screen 2: Core Values Discovery (45 minutes)

#### 🎯 Goal
Identify 5-7 core family values through structured brainstorming, building on timeline themes and family input

#### ⏱️ Duration
45 minutes

#### 👥 Roles & Permissions

**Consultant (Facilitator):**
- Guides values brainstorming process
- Provides values examples and frameworks
- Helps articulate vague concepts into clear values
- Cannot vote on which values to keep

**Family Council Members:**
- Full editing permissions
- Lead values prioritization
- Vote on final values list
- Ensure values authentically represent family

**Family Assembly Members:**
- Propose values for consideration
- Vote on values prioritization
- Share examples of values in action
- Validate values resonate with all generations

**Observers:**
- Read-only view
- Can suggest values articulation improvements

---

#### 🎨 Wireframe Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ Header: Mission, Vision & Values Workshop                      │
│ Stage 2 of 6: Core Values Discovery | ⏱️ 45:00 | 👥 12         │
├─────────────────────────┬───────────────────────────────────────┤
│                         │                                       │
│  Facilitator Panel      │  Main Workspace: Values Discovery     │
│  (Left - 20%)           │  (Center - 60%)                       │
│                         │                                       │
│  📊 Discovery Progress: │  ┌────────────────────────────────────┐│
│                         │  │  Values Brainstorm Board          ││
│  Phase 1: Diverge       │  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ││
│  ✅ (15 min)            │  │                                    ││
│  • 23 values proposed   │  │  Current Phase: CONVERGE           ││
│                         │  │  Narrow from 23 → 5-7 final values ││
│  Phase 2: Group         │  │                                    ││
│  ✅ (15 min)            │  │  ┌──────────────────────────────┐  ││
│  • 6 clusters created   │  │  │ 🎨 FROM TIMELINE THEMES      │  ││
│                         │  │  │ (Auto-generated suggestions) │  ││
│  Phase 3: Converge      │  │  ├──────────────────────────────┤  ││
│  ⏳ (15 min)            │  │  │ ⭐ Independence              │  ││
│  • Voting in progress   │  │  │    [4 timeline mentions]    │  ││
│                         │  │  │    [Add to Final List] [Edit││
│  Target: 5-7 values     │  │  │                             │  ││
│  Current: 0 finalized   │  │  │ ⭐ Family Unity              │  ││
│                         │  │  │    [3 timeline mentions]    │  ││
│  💡 Facilitator Tips:   │  │  │    [Add to Final List] [Edit││
│                         │  │  │                             │  ││
│  Phase 1 (Diverge):     │  │  │ ⭐ Long-term Thinking        │  ││
│  • "No bad ideas!"      │  │  │    [3 timeline mentions]    │  ││
│  • Quantity over quality│  │  │    [Add to Final List] [Edit││
│  • Personal values OK   │  │  └──────────────────────────────┘  ││
│  • Examples: integrity, │  │                                    ││
│    innovation, respect  │  │  ┌──────────────────────────────┐  ││
│                         │  │  │ 💡 PROPOSED BY FAMILY        │  ││
│  Phase 2 (Group):       │  │  │                              │  ││
│  • Find similar values  │  │  │ ┌──────┐ ┌──────┐ ┌──────┐  │  ││
│  • Name clusters        │  │  │ │Integrity│Honesty│Trust │  │  ││
│  • Look for patterns    │  │  │ │(Maria) │(John)│(Elena)│  │  ││
│                         │  │  │ └───┬───┘ └──┬──┘ └──┬───┘  │  ││
│  Phase 3 (Converge):    │  │  │     └────────┴──────┘        │  ││
│  • Which matter most?   │  │  │     Cluster: "Honesty &      │  ││
│  • What's non-negotiable│  │  │              Integrity"      │  ││
│  • Max 7, aim for 5     │  │  │     [9 votes] [Add] [Merge]  │  ││
│  • Must be authentic    │  │  │                              │  ││
│                         │  │  │ ┌──────┐ ┌──────┐           │  ││
│  📚 Values Examples:    │  │  │ │Innovation│Creativity│      │  ││
│  [Show Library ▼]       │  │  │ │(David) │(Sarah) │         │  ││
│  • Family-specific      │  │  │ └───┬───┘ └──┬──┘           │  ││
│  • Business-oriented    │  │  │     └────────┘               │  ││
│  • Legacy-focused       │  │  │     Cluster: "Innovation"    │  ││
│                         │  │  │     [7 votes] [Add] [Merge]  │  ││
│  🎯 Quality Checks:     │  │  │                              │  ││
│  □ Each value is clear  │  │  │ [See all 23 proposals →]     │  ││
│  □ Values are distinct  │  │  └──────────────────────────────┘  ││
│  □ All generations      │  │                                    ││
│    represented          │  │  ┌──────────────────────────────┐  ││
│  □ Not just aspirational│  │  │ 🏆 FINAL VALUES LIST (5-7)   │  ││
│    (family lives them)  │  │  │                              │  ││
│                         │  │  │ Currently: 0 values          │  ││
│  [Export All Proposals] │  │  │                              │  ││
│                         │  │  │ Drag values here from above  │  ││
│                         │  │  │ or click [Add to Final List] │  ││
│                         │  │  │                              │  ││
│                         │  │  │ [Drop Zone]                  │  ││
│                         │  │  │                              │  ││
│                         │  │  └──────────────────────────────┘  ││
│                         │  │                                    ││
│                         │  │  [+ Add Custom Value]              ││
│                         │  └────────────────────────────────────┘│
│                         │                                       │
├─────────────────────────┼───────────────────────────────────────┤
│                         │  Participants Panel (Right - 20%)     │
│                         │                                       │
│                         │  👥 Active: 12                        │
│                         │                                       │
│                         │  🗳️ Active Vote:                       │
│                         │  "Which value matters most?"          │
│                         │  ┌─────────────────────────────────┐ │
│                         │  │ Honesty & Integrity: ⬛⬛⬛⬛⬛⬛⬛⬛⬛ 9│ │
│                         │  │ Innovation: ⬛⬛⬛⬛⬛⬛⬛ 7          │ │
│                         │  │ Community Service: ⬛⬛⬛⬛⬛ 5    │ │
│                         │  │ Resilience: ⬛⬛⬛⬛ 4            │ │
│                         │  │                             │ │
│                         │  │ ⏱️ Voting closes in 2:00      │ │
│                         │  └─────────────────────────────────┘ │
│                         │                                       │
│                         │  💬 Values Discussion:                │
│                         │  Maria: "Independence is who we are"  │
│                         │  John: "But innovation drives us"     │
│                         │  Elena: "Can't we have both?"         │
│                         │  Alex (Fac): "Yes! Let's prioritize"  │
│                         │                                       │
│                         │  ✋ Raised Hands (1)                  │
│                         │  David: "What about sustainability?"  │
│                         │                                       │
└─────────────────────────┴───────────────────────────────────────┘
│ Footer: [< Previous] [Next Stage >] [💾 Auto-saving...]         │
└─────────────────────────────────────────────────────────────────┘
```

---

#### 🎨 Three-Phase Discovery Process

**PHASE 1: DIVERGE (15 minutes) - Brainstorm All Possible Values**

```
Goal: Generate 20-30 potential values (quantity over quality)

Process:
1. Everyone proposes values simultaneously
2. No criticism or filtering yet
3. Sticky note style: one value per card
4. Duplicates OK at this stage

Value Card Template:
┌────────────────────────────────┐
│ 💡 Value Name                  │
│ [One word or short phrase]     │
│                                │
│ Proposed by: Maria             │
│ Based on: Timeline event #3    │
│                                │
│ Example: "When we turned down  │
│ investor in 1987 to maintain   │
│ independence"                  │
│                                │
│ [👍 React] [📝 Edit] [🗑️ Delete] │
└────────────────────────────────┘

Values Board shows all proposals in grid:
[Integrity] [Innovation] [Independence]
[Family]    [Honesty]    [Creativity]
[Trust]     [Excellence] [Community]
... (20-30 cards total)
```

**Add Value Modal:**
```
┌──────────────────────────────────────────┐
│ ➕ Propose a Family Value                │
│ ──────────────────────────────────────── │
│                                          │
│ Value Name: [Required]                   │
│ [_______________________________]        │
│ (One word or short phrase)               │
│                                          │
│ Examples: Integrity, Innovation,         │
│           Family First, Excellence       │
│                                          │
│ What does this mean to our family?       │
│ [Text area - 200 char]                   │
│ Brief explanation                        │
│                                          │
│ Real example from family history:        │
│ [Text area - 300 char]                   │
│ Link to timeline event or story          │
│                                          │
│ 💡 This value is:                        │
│ [x] Something we already live by         │
│ [ ] Something we aspire to               │
│ [ ] Mix of both                          │
│                                          │
│ [Cancel] [Add Value]                     │
└──────────────────────────────────────────┘
```

**PHASE 2: GROUP (15 minutes) - Cluster Similar Values**

```
Goal: Organize 20-30 values into 6-8 thematic clusters

Process:
1. Drag similar values together
2. Name each cluster
3. Identify the core concept
4. Merge duplicates

Clustering Interface:
┌─────────────────────────────────────────┐
│ 🎨 Cluster: Honesty & Integrity         │
│ ───────────────────────────────────────  │
│                                         │
│ ┌──────────┐ ┌──────────┐ ┌──────────┐ │
│ │Integrity │ │ Honesty  │ │  Trust   │ │
│ │(Maria)   │ │(John)    │ │(Elena)   │ │
│ └──────────┘ └──────────┘ └──────────┘ │
│                                         │
│ Core Meaning:                           │
│ "We always do what's right, even when   │
│  it's hard. We're transparent with      │
│  family and partners."                  │
│                                         │
│ Examples from timeline:                 │
│ • Refused to hide bad news in 2008      │
│ • Always paid suppliers on time         │
│                                         │
│ 👥 9 participants agree this cluster    │
│    represents one core value            │
│                                         │
│ [Rename Cluster] [Split] [Merge with >] │
└─────────────────────────────────────────┘

Facilitator can suggest similar clusters:
"💡 'Honesty' cluster and 'Transparency' 
    cluster seem related. Merge them?"
[Yes, Merge] [No, Keep Separate]
```

**PHASE 3: CONVERGE (15 minutes) - Select Final 5-7 Values**

```
Goal: Narrow clusters down to final 5-7 core values

Process:
1. Vote on each cluster's importance
2. Rank by votes
3. Select top 5-7
4. Ensure they're distinct and meaningful

Voting Interface:
┌────────────────────────────────────────┐
│ 🗳️ Vote: Which values matter most?     │
│ ────────────────────────────────────   │
│                                        │
│ Instructions:                          │
│ • You have 5 votes total               │
│ • Can give multiple votes to one value │
│ • Vote for what truly defines us       │
│                                        │
│ Clusters to vote on:                   │
│                                        │
│ □□□□□ Honesty & Integrity              │
│ Votes: ⬛⬛⬛⬛⬛⬛⬛⬛⬛ (9)                     │
│                                        │
│ □□□□□ Innovation & Creativity          │
│ Votes: ⬛⬛⬛⬛⬛⬛⬛ (7)                       │
│                                        │
│ □□□□□ Family Unity                     │
│ Votes: ⬛⬛⬛⬛⬛⬛⬛⬛ (8)                      │
│                                        │
│ □□□□□ Independence                     │
│ Votes: ⬛⬛⬛⬛⬛⬛ (6)                        │
│                                        │
│ □□□□□ Community Service                │
│ Votes: ⬛⬛⬛⬛⬛ (5)                         │
│                                        │
│ □□□□□ Excellence                       │
│ Votes: ⬛⬛⬛⬛ (4)                          │
│                                        │
│ □□□□□ Resilience                       │
│ Votes: ⬛⬛⬛ (3)                           │
│                                        │
│ □□□□□ Sustainability                   │
│ Votes: ⬛⬛ (2)                            │
│                                        │
│ Your remaining votes: 2/5              │
│ ⏱️ 3:00 remaining                       │
│                                        │
│ [Submit Votes]                         │
└────────────────────────────────────────┘

After voting, facilitator guides selection:
"Top 7 by votes are clear front-runners.
 Let's review if these truly capture us..."
```

**Final Values Selection:**
```
┌────────────────────────────────────────┐
│ 🏆 Final Family Values (Draft)         │
│ ────────────────────────────────────   │
│                                        │
│ 1. Honesty & Integrity (9 votes) ⭐    │
│    "We always do what's right"         │
│    [Edit Name] [Edit Description]      │
│                                        │
│ 2. Family Unity (8 votes) ⭐           │
│    "Family comes first, always"        │
│    [Edit Name] [Edit Description]      │
│                                        │
│ 3. Innovation (7 votes) ⭐             │
│    "We constantly evolve and improve"  │
│    [Edit Name] [Edit Description]      │
│                                        │
│ 4. Independence (6 votes) ⭐           │
│    "We control our own destiny"        │
│    [Edit Name] [Edit Description]      │
│                                        │
│ 5. Community Service (5 votes) ⭐      │
│    "We give back to society"           │
│    [Edit Name] [Edit Description]      │
│                                        │
│ ─────────────────────────────────────  │
│                                        │
│ Consider adding? (4+ votes)            │
│ • Excellence (4 votes)                 │
│ • Resilience (3 votes)                 │
│                                        │
│ [Add 6th Value ▼] [Add 7th Value ▼]    │
│                                        │
│ Quality Check:                         │
│ ✅ 5-7 values (currently: 5)           │
│ ✅ Each is distinct                    │
│ ✅ All generations represented         │
│ ⚠️  Consider: Do we need more?         │
│                                        │
│ [Finalize Values List]                 │
└────────────────────────────────────────┘
```

---

#### 📚 Values Library (Reference)

Facilitator can show examples to spark ideas:

```
┌────────────────────────────────────────┐
│ 📚 Family Values Library               │
│ ────────────────────────────────────   │
│                                        │
│ Browse by category:                    │
│ [All] [Relationship] [Character]       │
│ [Business] [Legacy] [Community]        │
│                                        │
│ Common Family Values:                  │
│                                        │
│ 💎 Character Values                    │
│ • Integrity • Honesty • Transparency   │
│ • Humility • Courage • Resilience      │
│                                        │
│ ❤️ Relationship Values                 │
│ • Family Unity • Respect • Trust       │
│ • Communication • Support • Loyalty    │
│                                        │
│ 💼 Business Values                     │
│ • Excellence • Innovation • Quality    │
│ • Customer Focus • Sustainability      │
│                                        │
│ 🌱 Legacy Values                       │
│ • Education • Stewardship              │
│ • Long-term Thinking • Tradition       │
│                                        │
│ 🌍 Community Values                    │
│ • Service • Generosity • Justice       │
│ • Environmental Care • Social Impact   │
│                                        │
│ Click any value to see:                │
│ • Full definition                      │
│ • Example behaviors                    │
│ • Example from other families          │
│                                        │
│ [Close Library]                        │
└────────────────────────────────────────┘
```

---

#### 💾 Data Collected

**Stage 2 Output:**
```json
{
  "stage_2": {
    "values_discovery": {
      "phase_1_brainstorm": {
        "total_proposed": 23,
        "proposals": [
          {
            "value_id": "uuid",
            "name": "Integrity",
            "description": "Always doing what's right, even when difficult",
            "example": "Refused to hide bad news in 2008 crisis",
            "proposed_by": "user_id_1",
            "based_on_timeline_event": "event_uuid_3",
            "is_aspirational": false,
            "reactions": { "👍": 8, "❤️": 5 }
          }
          // ... 22 more
        ]
      },
      "phase_2_clustering": {
        "clusters": [
          {
            "cluster_id": "uuid",
            "name": "Honesty & Integrity",
            "values_included": ["Integrity", "Honesty", "Trust"],
            "core_meaning": "We always do what's right, transparent with all",
            "examples": ["event_uuid_3", "event_uuid_5"],
            "participants_agreement": 9
          }
          // ... 5-7 more clusters
        ]
      },
      "phase_3_convergence": {
        "voting_results": {
          "honesty_integrity": 9,
          "family_unity": 8,
          "innovation": 7,
          "independence": 6,
          "community_service": 5,
          "excellence": 4,
          "resilience": 3
        },
        "final_values": [
          {
            "value_id": "uuid",
            "name": "Honesty & Integrity",
            "short_description": "We always do what's right",
            "full_description": "We maintain highest ethical standards in all we do. We're transparent with family, partners, and community.",
            "votes": 9,
            "rank": 1,
            "source_cluster": "cluster_uuid_1",
            "timeline_examples": ["event_uuid_3", "event_uuid_5"]
          }
          // ... 4-6 more values
        ],
        "total_final_values": 5
      }
    },
    "participant_engagement": {
      "total_proposals": 23,
      "total_votes_cast": 60,
      "participants_proposed": 11,
      "participants_voted": 12
    }
  }
}
```

**Stored in:**
- Education Service (port 8006) → workshop_sessions.stage_data
- Constitution Service (port 8002) → family_values table (preliminary)

---

#### 📄 Collaborative Mechanics

**Real-time Value Proposals:**
- Click "+ Add Value" to propose new value
- Appears immediately for all participants
- Others can react with emoji: 👍 ❤️ 💡 🤔
- Most-reacted values highlighted

**Drag-and-Drop Clustering:**
- Phase 2: Drag value cards to group together
- Multiple people can drag simultaneously
- Collision detection: "John is moving this card..."
- Cluster auto-saves as values are grouped

**Live Voting:**
- Phase 3: Dot voting system (5 votes per person)
- Real-time vote counter updates
- Vote distribution shown as bar chart
- Timer counts down voting period

**Values Refinement:**
```
Any family member can suggest edit:
┌────────────────────────────────────────┐
│ ✏️ Suggest Edit to Value Name           │
│ ────────────────────────────────────   │
│                                        │
│ Current: "Honesty & Integrity"         │
│                                        │
│ Your suggestion:                       │
│ [Integrity & Transparency_______]      │
│                                        │
│ Reason for change:                     │
│ "Transparency better captures how we   │
│  actually communicate"                 │
│                                        │
│ [Cancel] [Suggest Change]              │
└────────────────────────────────────────┘

Suggestion appears to all participants:
"Maria suggested changing 'Honesty & Integrity'
 to 'Integrity & Transparency'"
 
[👍 Accept] [💬 Discuss] [👎 Decline]
```

---

#### ⭐ Transition

**"Next Stage" button (Facilitator):**

**Validation checks:**
1. ✅ Between 5-7 final values selected?
2. ✅ Each value has a description?
3. ✅ At least 80% of participants voted?
4. ⚠️  Values are distinct (not overlapping)?

**Pre-transition summary:**
```
┌──────────────────────────────────────────┐
│ 🎉 Stage 2 Complete - Values Discovered  │
│ ──────────────────────────────────────── │
│                                          │
│ Your Family's Core Values:               │
│                                          │
│ 1. Honesty & Integrity                   │
│ 2. Family Unity                          │
│ 3. Innovation                            │
│ 4. Independence                          │
│ 5. Community Service                     │
│                                          │
│ Next: Define behaviors that demonstrate  │
│ these values in Stage 3.                 │
│                                          │
│ [< Revise Values] [Continue to Stage 3 >]│
└──────────────────────────────────────────┘
```

**If validation passes:**
- Saves final values list
- Passes values to Stage 3 for behavior mapping
- Auto-transition to Screen 3
- Transition logged

---

### Screen 3: Values Matrix & Behaviors (30 minutes)

#### 🎯 Goal
For each core value, define specific behaviors ("We always..."), anti-behaviors ("We never..."), and measurement criteria

#### ⏱️ Duration
30 minutes

#### 👥 Roles & Permissions

**Consultant (Facilitator):**
- Guides behavior definition process
- Provides behavior examples
- Ensures behaviors are specific and measurable
- Cannot vote on family-specific behaviors

**Family Council Members:**
- Full editing permissions on behaviors
- Lead definition of "We always" and "We never"
- Vote on measurement criteria
- Ensure behaviors are realistic

**Family Assembly Members:**
- Propose behaviors based on personal experience
- Vote on which behaviors to include
- Share examples of behaviors in practice
- Validate behaviors feel authentic

**Observers:**
- Read-only view
- Can suggest measurement approaches

---

#### 🎨 Wireframe Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ Header: Mission, Vision & Values Workshop                      │
│ Stage 3 of 6: Values Matrix | ⏱️ 30:00 | 👥 12                 │
├─────────────────────────┬───────────────────────────────────────┤
│                         │                                       │
│  Facilitator Panel      │  Main Workspace: Values Matrix        │
│  (Left - 20%)           │  (Center - 60%)                       │
│                         │                                       │
│  📊 Matrix Progress:    │  ┌────────────────────────────────────┐│
│                         │  │  Value 1 of 5: Honesty & Integrity││
│  ✅ Value 1: Complete   │  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ││
│  ⏳ Value 2: In Progress│  │                                    ││
│  ⏹️ Value 3: Not Started│  │  Matrix Components:                ││
│  ⏹️ Value 4: Not Started│  │                                    ││
│  ⏹️ Value 5: Not Started│  │  ┌──────────────────────────────┐  ││
│                         │  │  │ 💎 VALUE DEFINITION          │  ││
│  ⏰ Time per value:     │  │  │                              │  ││
│  ~6 minutes             │  │  │ "We maintain highest ethical │  ││
│                         │  │  │  standards in all we do."    │  ││
│  💡 Behavior Tips:      │  │  │                              │  ││
│                         │  │  │ [✏️ Edit Definition]          │  ││
│  "We Always" should:    │  │  └──────────────────────────────┘  ││
│  • Be specific actions  │  │                                    ││
│  • Be observable        │  │  ┌──────────────────────────────┐  ││
│  • Be achievable        │  │  │ ✅ WE ALWAYS... (Behaviors)  │  ││
│  • Set expectations     │  │  │                              │  ││
│                         │  │  │ 1. Tell truth even when hard │  ││
│  "We Never" should:     │  │  │    [Edit] [Delete]           │  ││
│  • Be clear boundaries  │  │  │                              │  ││
│  • Be non-negotiable    │  │  │ 2. Disclose conflicts openly │  ││
│  • Prevent violations   │  │  │    [Edit] [Delete]           │  ││
│  • Protect values       │  │  │                              │  ││
│                         │  │  │ 3. Honor commitments always  │  ││
│  Metrics should:        │  │  │    [Edit] [Delete]           │  ││
│  • Be measurable        │  │  │                              │  ││
│  • Be regular           │  │  │ [+ Add Behavior]             │  ││
│  • Provide feedback     │  │  └──────────────────────────────┘  ││
│  • Drive improvement    │  │                                    ││
│                         │  │  ┌──────────────────────────────┐  ││
│  📚 Example Library:    │  │  │ ❌ WE NEVER... (Anti-behaviors│  ││
│  [Show Examples ▼]      │  │  │                              │  ││
│  • Honesty behaviors    │  │  │ 1. Hide mistakes or bad news │  ││
│  • Integrity metrics    │  │  │    [Edit] [Delete]           │  ││
│  • Innovation actions   │  │  │                              │  ││
│                         │  │  │ 2. Make promises we can't keep│ ││
│                         │  │  │    [Edit] [Delete]           │  ││
│  🎯 Quality Checks:     │  │  │                              │  ││
│  □ 3+ "Always" per value│  │  │ 3. Mislead partners/family   │  ││
│  □ 2+ "Never" per value │  │  │    [Edit] [Delete]           │  ││
│  □ Metrics are specific │  │  │                              │  ││
│  □ Anti-examples clear  │  │  │ [+ Add Anti-Behavior]        │  ││
│                         │  │  └──────────────────────────────┘  ││
│  [Export Full Matrix]   │  │                                    ││
│                         │  │  ┌──────────────────────────────┐  ││
│                         │  │  │ 📊 HOW WE MEASURE            │  ││
│                         │  │  │                              │  ││
│                         │  │  │ Annual Survey Question:      │  ││
│                         │  │  │ "Do family members feel they │  ││
│                         │  │  │  can speak openly about      │  ││
│                         │  │  │  mistakes?"                  │  ││
│                         │  │  │ Target: 90%+ say "Yes"       │  ││
│                         │  │  │ [Edit]                       │  ││
│                         │  │  │                              │  ││
│                         │  │  │ Behavioral Indicator:        │  ││
│                         │  │  │ "Zero instances of hiding    │  ││
│                         │  │  │  material information in     │  ││
│                         │  │  │  Family Council reports"     │  ││
│                         │  │  │ [Edit]                       │  ││
│                         │  │  │                              │  ││
│                         │  │  │ [+ Add Measurement]          │  ││
│                         │  │  └──────────────────────────────┘  ││
│                         │  │                                    ││
│                         │  │  ┌──────────────────────────────┐  ││
│                         │  │  │ 🚨 ANTI-EXAMPLE (Real Story) │  ││
│                         │  │  │                              │  ││
│                         │  │  │ "When we violated this value:│  ││
│                         │  │  │                              │  ││
│                         │  │  │ In 2015, delayed telling     │  ││
│                         │  │  │ Board about cost overruns.   │  ││
│                         │  │  │ Damaged trust, took 2 years  │  ││
│                         │  │  │ to rebuild."                 │  ││
│                         │  │  │                              │  ││
│                         │  │  │ [Edit] [Clear]               │  ││
│                         │  │  └──────────────────────────────┘  ││
│                         │  │                                    ││
│                         │  │  [💾 Save Value Matrix]            ││
│                         │  │  [< Previous Value] [Next Value >] ││
│                         │  └────────────────────────────────────┘│
│                         │                                       │
├─────────────────────────┼───────────────────────────────────────┤
│                         │  Participants Panel (Right - 20%)     │
│                         │                                       │
│                         │  👥 Active: 12                        │
│                         │                                       │
│                         │  💬 Behavior Suggestions:             │
│                         │  Maria: "We should add 'always admit │
│                         │         when we're wrong'"            │
│                         │  [Add as Behavior]                    │
│                         │                                       │
│                         │  John: "For metrics, track Board      │
│                         │        feedback scores?"              │
│                         │  [Add as Metric]                      │
│                         │                                       │
│                         │  Elena: "Remember 2015 incident?"     │
│                         │  [Add as Anti-Example]                │
│                         │                                       │
│                         │  ✋ Raised Hands (0)                  │
│                         │                                       │
│                         │  📊 Completion Status:                │
│                         │  Value 1: ✅ Complete (3 behaviors)   │
│                         │  Value 2: ⏳ In progress (1 behavior) │
│                         │  Value 3: ⏹️ Not started              │
│                         │                                       │
└─────────────────────────┴───────────────────────────────────────┘
│ Footer: [< Previous] [Complete Matrix >] [💾 Auto-saving...]    │
└─────────────────────────────────────────────────────────────────┘
```

---

#### 📋 Values Matrix Structure (Per Value)

Each of the 5-7 values gets this complete matrix:

**Section 1: Value Definition** (from Stage 2)
```
Editable short description of the value
Example: "We maintain highest ethical standards 
         in all we do. We're transparent with 
         family, partners, and community."
```

**Section 2: "We Always..." Behaviors (3-5 required)**
```
Specific observable actions that demonstrate value

Add Behavior Modal:
┌────────────────────────────────────────┐
│ ✅ Add "We Always..." Behavior          │
│ ──────────────────────────────────────  │
│                                        │
│ Behavior:                              │
│ [We always tell the truth, even when  │
│  it's difficult or uncomfortable___]  │
│                                        │
│ 💡 Make it:                            │
│ • Specific and clear                   │
│ • Observable by others                 │
│ • Actionable by all family             │
│ • Achievable realistically             │
│                                        │
│ Example from family:                   │
│ [In 2008 crisis, told employees truth │
│  about finances rather than sugar-coat│
│                                        │
│ Who does this apply to?                │
│ [x] All family members                 │
│ [x] Family business leadership         │
│ [ ] Family Council only                │
│                                        │
│ [Cancel] [Add Behavior]                │
└────────────────────────────────────────┘

Behaviors appear as list:
1. ✅ Tell truth even when hard
2. ✅ Disclose conflicts openly
3. ✅ Honor commitments always
4. ✅ Admit mistakes quickly
5. ✅ Provide transparent reporting

[+ Add Another Behavior] (up to 7 total)
```

**Section 3: "We Never..." Anti-Behaviors (2-4 required)**
```
Clear boundaries - what violates this value

Add Anti-Behavior Modal:
┌────────────────────────────────────────┐
│ ❌ Add "We Never..." Anti-Behavior      │
│ ──────────────────────────────────────  │
│                                        │
│ Anti-Behavior:                         │
│ [We never hide mistakes or bad news_]  │
│                                        │
│ Why is this non-negotiable?            │
│ [Hiding problems destroys trust and   │
│  prevents family from solving issues  │
│  together_____________________]        │
│                                        │
│ What happens if violated?              │
│ [Immediate disclosure required to FC. │
│  Repeated violations = removal from   │
│  leadership_________________]          │
│                                        │
│ [Cancel] [Add Anti-Behavior]           │
└────────────────────────────────────────┘

Anti-behaviors appear as list:
1. ❌ Hide mistakes or bad news
2. ❌ Make promises we can't keep
3. ❌ Mislead partners or family
4. ❌ Prioritize short-term gain over ethics

[+ Add Another Anti-Behavior] (up to 5 total)
```

**Section 4: How We Measure (2-3 metrics)**
```
Concrete ways to track if we're living this value

Add Measurement Modal:
┌────────────────────────────────────────┐
│ 📊 Add Measurement Metric               │
│ ──────────────────────────────────────  │
│                                        │
│ Metric Type:                           │
│ ( ) Survey question                    │
│ (•) Behavioral indicator               │
│ ( ) Data/statistics                    │
│ ( ) External feedback                  │
│                                        │
│ Description:                           │
│ [Annual survey: "Do you feel family   │
│  members are transparent about        │
│  challenges?" Target: 90%+ "Yes"___]  │
│                                        │
│ Frequency:                             │
│ (•) Annual  ( ) Quarterly  ( ) Ad-hoc  │
│                                        │
│ Who measures?                          │
│ [Family Council ▼]                     │
│                                        │
│ Target/Threshold:                      │
│ [90% positive responses________]       │
│                                        │
│ What if we miss target?                │
│ [Family Council discusses root causes │
│  and develops action plan_________]   │
│                                        │
│ [Cancel] [Add Metric]                  │
└────────────────────────────────────────┘

Metrics appear as list:
1. 📊 Annual survey: "Transparency score"
   Target: 90%+ positive
2. 📊 Zero instances of hiding material info
   in FC reports
3. 📊 External partner feedback: "Trustworthy"
   rating >4.5/5
```

**Section 5: Anti-Example (Optional but Powerful)**
```
Real story when family violated this value - 
serves as cautionary tale

Add Anti-Example Modal:
┌────────────────────────────────────────┐
│ 🚨 Add Real Anti-Example                │
│ ──────────────────────────────────────  │
│                                        │
│ What happened?                         │
│ [In 2015, delayed telling Board about │
│  major cost overruns on new factory.  │
│  Tried to fix it quietly. Board found │
│  out from external auditor._______]   │
│                                        │
│ Impact/Consequences:                   │
│ [Severely damaged Board trust. Three  │
│  Board members nearly resigned. Took  │
│  2 years to rebuild relationship.__]  │
│                                        │
│ Lesson learned:                        │
│ [Transparency is non-negotiable, even │
│  when news is bad. Early disclosure   │
│  allows collaborative problem-solving │
│                                        │
│ How do we prevent repetition?          │
│ [Implemented 30-day disclosure policy │
│  for material issues. FC reviews all  │
│  Board materials in advance.______]   │
│                                        │
│ 💡 Sharing real failures builds        │
│    credibility and reinforces values   │
│                                        │
│ [Cancel] [Add Anti-Example]            │
└────────────────────────────────────────┘
```

---

#### 📚 Behavior Library (Reference)

Facilitator can show behavior examples:

```
┌────────────────────────────────────────┐
│ 📚 Values Behavior Library             │
│ ────────────────────────────────────   │
│                                        │
│ Current Value: Honesty & Integrity     │
│                                        │
│ Common "We Always" Behaviors:          │
│                                        │
│ ✅ Communication:                      │
│ • Share bad news quickly               │
│ • Speak up when we disagree            │
│ • Provide context, not just data       │
│ • Listen before judging                │
│                                        │
│ ✅ Decision-Making:                    │
│ • Consider long-term consequences      │
│ • Disclose conflicts of interest       │
│ • Seek input before deciding           │
│ • Explain our reasoning                │
│                                        │
│ ✅ Accountability:                     │
│ • Admit mistakes quickly               │
│ • Make amends when we err              │
│ • Honor commitments                    │
│ • Accept consequences                  │
│                                        │
│ ✅ Relationships:                      │
│ • Keep confidences                     │
│ • Give credit where due                │
│ • Treat all family with respect        │
│ • Be consistent in actions             │
│                                        │
│ Common "We Never" Boundaries:          │
│                                        │
│ ❌ Hide information to look good       │
│ ❌ Blame others for our mistakes       │
│ ❌ Make promises we can't keep         │
│ ❌ Manipulate facts to suit our needs  │
│ ❌ Take credit for others' work        │
│                                        │
│ [Copy Any to Use] [See More Examples]  │
└────────────────────────────────────────┘
```

---

#### 💾 Data Collected

**Stage 3 Output:**
```json
{
  "stage_3": {
    "values_matrix": [
      {
        "value_id": "uuid",
        "value_name": "Honesty & Integrity",
        "value_definition": "We maintain highest ethical standards in all we do",
        "behaviors_always": [
          {
            "behavior_id": "uuid",
            "text": "Tell truth even when difficult or uncomfortable",
            "example": "In 2008 crisis, told employees truth about finances",
            "applies_to": ["all_family", "business_leadership"],
            "added_by": "user_id_1",
            "votes_support": 11
          }
          // ... 3-7 more
        ],
        "behaviors_never": [
          {
            "anti_behavior_id": "uuid",
            "text": "Hide mistakes or bad news",
            "rationale": "Destroys trust and prevents collaborative problem-solving",
            "consequences": "Immediate disclosure to FC required",
            "added_by": "user_id_2",
            "votes_support": 12
          }
          // ... 2-4 more
        ],
        "measurements": [
          {
            "metric_id": "uuid",
            "type": "survey",
            "description": "Annual survey: Do family members feel they can speak openly?",
            "frequency": "annual",
            "measured_by": "family_council",
            "target": "90% positive responses",
            "action_if_missed": "FC discusses root causes and develops action plan",
            "added_by": "user_id_3"
          }
          // ... 2-3 more
        ],
        "anti_example": {
          "incident": "In 2015, delayed telling Board about cost overruns",
          "impact": "Severely damaged Board trust, 2 years to rebuild",
          "lesson": "Transparency non-negotiable even with bad news",
          "prevention": "30-day disclosure policy implemented",
          "shared_by": "user_id_4"
        }
      }
      // ... 4-6 more values with full matrices
    ],
    "completion_stats": {
      "total_values": 5,
      "total_behaviors": 18,
      "total_anti_behaviors": 11,
      "total_measurements": 13,
      "anti_examples_shared": 3,
      "avg_behaviors_per_value": 3.6
    }
  }
}
```

**Stored in:**
- Constitution Service (port 8002) → values_matrix table
- This becomes Code of Conduct foundation

---

#### 📄 Collaborative Mechanics

**Sequential Value Processing:**
- Work through values one at a time (avoid overwhelm)
- Progress bar shows completion: "Value 2 of 5"
- Can't move to next value until current is "complete"
- "Complete" = minimum 3 behaviors, 2 anti-behaviors, 2 metrics

**Behavior Suggestions from Chat:**
```
Any participant can suggest in chat:
Maria: "We should add 'always admit when we're wrong'"

Facilitator or FC member can click:
[Add as Behavior] button appears next to message

Instantly creates draft behavior:
✅ Admit when we're wrong
   Source: Maria's suggestion
   [Edit] [Approve] [Delete]
```

**Real-time Voting on Behaviors:**
```
If family disagrees on whether to include behavior:

Quick poll appears:
┌────────────────────────────────────────┐
│ 🗳️ Vote: Include this behavior?        │
│ ────────────────────────────────────   │
│                                        │
│ "We always seek outside advisors       │
│  before major family decisions"        │
│                                        │
│ 👍 Include: ⬛⬛⬛⬛⬛⬛⬛⬛ (8)               │
│ 👎 Exclude: ⬛⬛⬛ (3)                    │
│ 🤔 Revise wording: ⬛ (1)               │
│                                        │
│ ⏱️ 1:00 remaining                       │
│                                        │
│ [Vote Now]                             │
└────────────────────────────────────────┘

Simple majority decides
```

**Template Application:**
```
Facilitator can load behavior templates:

"For 'Honesty & Integrity' value, load 
 common behaviors from library?"
 
[Preview Template] shows:
• Tell truth even when difficult (5 examples)
• Disclose conflicts of interest (3 examples)
• Admit mistakes quickly (4 examples)
... 8 more suggested behaviors

Family reviews and selects:
☑️ This one - use as-is
☑️ This one - modify wording
☐ Skip this one
☑️ This one - add to our list

[Apply Selected Behaviors]
```

---

#### ⭐ Transition

**"Complete Matrix" button:**

**Validation per value:**
1. ✅ 3+ "We always" behaviors?
2. ✅ 2+ "We never" anti-behaviors?
3. ✅ 2+ measurement metrics?
4. ⚠️  Consider adding anti-example?

**Overall validation:**
1. ✅ All 5-7 values have complete matrices?
2. ✅ Behaviors are specific and observable?
3. ✅ Metrics are actually measurable?

**Pre-transition summary:**
```
┌──────────────────────────────────────────┐
│ 🎉 Stage 3 Complete - Values Matrix Done │
│ ──────────────────────────────────────── │
│                                          │
│ You've defined behavioral expectations   │
│ for all 5 core values:                   │
│                                          │
│ ✅ Honesty & Integrity (4 behaviors)     │
│ ✅ Family Unity (3 behaviors)            │
│ ✅ Innovation (4 behaviors)              │
│ ✅ Independence (3 behaviors)            │
│ ✅ Community Service (4 behaviors)       │
│                                          │
│ Total: 18 "We always" behaviors          │
│        11 "We never" boundaries          │
│        13 measurement metrics            │
│                                          │
│ 💡 This matrix becomes your Family       │
│    Code of Conduct.                      │
│                                          │
│ Next: Craft your Family Mission          │
│                                          │
│ [< Revise Matrix] [Continue to Stage 4 >]│
└──────────────────────────────────────────┘
```

**If validation passes:**
- Saves complete values matrix
- Generates printable values poster (PDF)
- Passes values to Stage 4 (inform mission)
- Auto-transition to Screen 4
- Transition logged

---

### Screen 4: Family Mission Statement (35 minutes)

#### 🎯 Goal
Craft concise family mission statement that captures purpose, impact, and values - the "why we exist" declaration

#### ⏱️ Duration
35 minutes

#### 👥 Roles & Permissions

**Consultant (Facilitator):**
- Guides mission crafting process
- Provides mission statement frameworks
- Helps wordsmith and refine language
- Cannot vote on final mission wording

**Family Council Members:**
- Full editing permissions on mission draft
- Lead mission articulation
- Vote on final mission statement
- Ensure mission is authentic and inspiring

**Family Assembly Members:**
- Contribute ideas for mission components
- Vote on mission statement options
- Validate mission resonates emotionally
- Ratify final mission

**Observers:**
- Read-only view
- Can suggest linguistic improvements

---

#### 🎨 Wireframe Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ Header: Mission, Vision & Values Workshop                      │
│ Stage 4 of 6: Family Mission | ⏱️ 35:00 | 👥 12                │
├─────────────────────────┬───────────────────────────────────────┤
│                         │                                       │
│  Facilitator Panel      │  Main Workspace: Mission Builder      │
│  (Left - 20%)           │  (Center - 60%)                       │
│                         │                                       │
│  📊 Mission Progress:   │  ┌────────────────────────────────────┐│
│                         │  │  Family Mission Statement          ││
│  Phase 1: Components    │  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ││
│  ✅ (10 min)            │  │                                    ││
│  • Impact defined       │  │  Mission Formula:                  ││
│  • Audience identified  │  │                                    ││
│  • Approach captured    │  │  We exist to [impact/purpose]      ││
│  • Values referenced    │  │  for [audience/beneficiaries]      ││
│                         │  │  through [approach/how]            ││
│  Phase 2: Draft         │  │  guided by [core values]           ││
│  ⏳ (15 min)            │  │                                    ││
│  • Writing mission      │  │  ┌──────────────────────────────┐  ││
│                         │  │  │ Component 1: IMPACT          │  ││
│  Phase 3: Refine        │  │  │                              │  ││
│  ⏹️ (10 min)            │  │  │ Our fundamental purpose:     │  ││
│  • Review & polish      │  │  │                              │  ││
│                         │  │  │ We exist to:                 │  ││
│  💡 Mission Tips:       │  │  │ [Build lasting prosperity   │  ││
│                         │  │  │  and unity across           │  ││
│  Great missions are:    │  │  │  generations_____________]  │  ││
│  • Inspiring            │  │  │                              │  ││
│  • Clear                │  │  │ 💡 Impact Examples:          │  ││
│  • Authentic            │  │  │ • Create lasting value       │  ││
│  • Forward-looking      │  │  │ • Build enduring legacy      │  ││
│  • Actionable           │  │  │ • Strengthen family bonds    │  ││
│                         │  │  │ • Serve our community        │  ││
│  Great missions avoid:  │  │  │ • Foster innovation          │  ││
│  • Jargon               │  │  │                              │  ││
│  • Vagueness            │  │  │ [See More Examples]          │  ││
│  • Over-complexity      │  │  └──────────────────────────────┘  ││
│  • Corporate-speak      │  │                                    ││
│                         │  │  ┌──────────────────────────────┐  ││
│  📚 Mission Examples:   │  │  │ Component 2: AUDIENCE        │  ││
│  [Show Library ▼]       │  │  │                              │  ││
│  • Family Office        │  │  │ Who benefits?                │  ││
│  • Family Enterprise    │  │  │                              │  ││
│  • Philanthropic        │  │  │ For:                         │  ││
│  • Multi-generational   │  │  │ [Our family members, our    │  ││
│                         │  │  │  employees, and the         │  ││
│  🎯 Your Values:        │  │  │  communities we serve____]  │  ││
│  (Reference from Stage 2│  │  │                              │  ││
│                         │  │  │ 💡 Audience Options:         │  ││
│  • Honesty & Integrity  │  │  │ • Family members (all gens)  │  ││
│  • Family Unity         │  │  │ • Our employees/partners     │  ││
│  • Innovation           │  │  │ • Future generations         │  ││
│  • Independence         │  │  │ • Our community              │  ││
│  • Community Service    │  │  │ • Society at large           │  ││
│                         │  │  │ • Specific causes            │  ││
│  Consider how mission   │  │  │                              │  ││
│  reflects these!        │  │  │ [See More Examples]          │  ││
│                         │  │  └──────────────────────────────┘  ││
│  [Export Mission]       │  │                                    ││
│                         │  │  ┌──────────────────────────────┐  ││
│                         │  │  │ Component 3: APPROACH        │  ││
│                         │  │  │                              │  ││
│                         │  │  │ How we do it:                │  ││
│                         │  │  │                              │  ││
│                         │  │  │ Through:                     │  ││
│                         │  │  │ [Strategic leadership,      │  ││
│                         │  │  │  collaborative governance,  │  ││
│                         │  │  │  and responsible ownership_]│  ││
│                         │  │  │                              │  ││
│                         │  │  │ 💡 Approach Elements:        │  ││
│                         │  │  │ • How we work (collaborative)│  ││
│                         │  │  │ • What we leverage (assets) │  ││
│                         │  │  │ • How we govern (structures)│  ││
│                         │  │  │ • Our unique strengths      │  ││
│                         │  │  │                              │  ││
│                         │  │  │ [See More Examples]          │  ││
│                         │  │  └──────────────────────────────┘  ││
│                         │  │                                    ││
│                         │  │  ┌──────────────────────────────┐  ││
│                         │  │  │ Component 4: VALUES          │  ││
│                         │  │  │                              │  ││
│                         │  │  │ Guided by:                   │  ││
│                         │  │  │ [Our values of integrity,   │  ││
│                         │  │  │  unity, innovation, and     │  ││
│                         │  │  │  service_________________]  │  ││
│                         │  │  │                              │  ││
│                         │  │  │ Reference your values:       │  ││
│                         │  │  │ ☑️ Honesty & Integrity       │  ││
│                         │  │  │ ☑️ Family Unity              │  ││
│                         │  │  │ ☑️ Innovation                │  ││
│                         │  │  │ ☐ Independence               │  ││
│                         │  │  │ ☑️ Community Service         │  ││
│                         │  │  │                              │  ││
│                         │  │  │ [Auto-Generate Values Text]  │  ││
│                         │  │  └──────────────────────────────┘  ││
│                         │  │                                    ││
│                         │  │  [Generate Full Mission ▼]         ││
│                         │  └────────────────────────────────────┘│
│                         │                                       │
├─────────────────────────┼───────────────────────────────────────┤
│                         │  Mission Preview Panel                │
│                         │  (Below components)                   │
│                         │                                       │
│                         │  ┌────────────────────────────────────┐│
│                         │  │ 📜 FULL MISSION STATEMENT (Draft)  ││
│                         │  │                                    ││
│                         │  │ We exist to build lasting         ││
│                         │  │ prosperity and unity across       ││
│                         │  │ generations for our family        ││
│                         │  │ members, our employees, and the   ││
│                         │  │ communities we serve, through     ││
│                         │  │ strategic leadership,             ││
│                         │  │ collaborative governance, and     ││
│                         │  │ responsible ownership, guided     ││
│                         │  │ by our values of integrity,       ││
│                         │  │ unity, innovation, and service.   ││
│                         │  │                                    ││
│                         │  │ [✏️ Edit Full Text] [↻ Regenerate]││
│                         │  └────────────────────────────────────┘│
│                         │                                       │
│                         │  ┌────────────────────────────────────┐│
│                         │  │ 🎯 ONE-LINER VERSION (≤20 words)   ││
│                         │  │                                    ││
│                         │  │ "Building generational prosperity  ││
│                         │  │  through integrity, unity, and     ││
│                         │  │  service."                         ││
│                         │  │                                    ││
│                         │  │ [✏️ Edit] [↻ Regenerate]           ││
│                         │  └────────────────────────────────────┘│
│                         │                                       │
│                         │  Quality Checks:                      │
│                         │  ✅ Clear and understandable          │
│                         │  ✅ Inspiring and aspirational        │
│                         │  ✅ Authentic to family               │
│                         │  ✅ References core values            │
│                         │  ⚠️  Consider: Is it memorable?       │
│                         │                                       │
├─────────────────────────┼───────────────────────────────────────┤
│                         │  Participants Panel (Right - 20%)     │
│                         │                                       │
│                         │  👥 Active: 12                        │
│                         │                                       │
│                         │  🗳️ Mission Vote:                      │
│                         │  "Approve this mission statement?"    │
│                         │  ┌─────────────────────────────────┐ │
│                         │  │ 👍 Approve: ⬛⬛⬛⬛⬛⬛⬛⬛⬛⬛ 10    │ │
│                         │  │ 👎 Revise: ⬛⬛ 2                │ │
│                         │  │                             │ │
│                         │  │ ⏱️ 2:00 remaining            │ │
│                         │  └─────────────────────────────────┘ │
│                         │                                       │
│                         │  💬 Mission Feedback:                 │
│                         │  Maria: "Love 'lasting prosperity' - │
│                         │         captures it perfectly"        │
│                         │  John: "Should add 'innovation'?"     │
│                         │  Elena: "One-liner is perfect!"       │
│                         │  David: "'Guided by' feels right"     │
│                         │                                       │
│                         │  ✋ Raised Hands (1)                  │
│                         │  Sarah: "Can we emphasize NextGen     │
│                         │         more?"                        │
│                         │                                       │
└─────────────────────────┴───────────────────────────────────────┘
│ Footer: [< Previous] [Finalize Mission >] [💾 Auto-saving...]   │
└─────────────────────────────────────────────────────────────────┘
```

---

#### 📝 Mission Building Process

**PHASE 1: Component Definition (10 minutes)**

Work through 4 components using formula:

```
Mission Formula Template:

We exist to [IMPACT / PURPOSE]
for [AUDIENCE / BENEFICIARIES]
through [APPROACH / HOW]
guided by [CORE VALUES]
```

**Component 1: Impact/Purpose**
```
Question: "Why does your family exist 
          beyond just owning assets?"

Prompts to explore:
• What difference do you want to make?
• What would be lost if your family dissolved?
• What legacy do you want to leave?
• What gives your family meaning?

Example answers:
• "Build lasting prosperity across generations"
• "Create positive impact in our community"
• "Preserve family unity and shared purpose"
• "Steward resources for future generations"
• "Foster innovation and entrepreneurship"

Free text input field with AI suggestions 
based on Stage 1 timeline themes
```

**Component 2: Audience/Beneficiaries**
```
Question: "Who benefits from your family's 
          existence and work?"

Checkbox options:
☑️ Family members (current generation)
☑️ Future family generations
☑️ Employees and their families
☑️ Business partners
☑️ Local community
☐ Specific causes (specify: [_______])
☐ Society at large

Selected items auto-compose into natural language:
"For our family members, our employees, 
 and the communities we serve"
```

**Component 3: Approach/How**
```
Question: "How do you accomplish your purpose?
          What's your unique approach?"

Prompts to explore:
• What are your distinctive strengths?
• How do you work together?
• What assets/capabilities do you leverage?
• What's your governance philosophy?

Example elements:
• "Through strategic leadership"
• "Collaborative decision-making"
• "Responsible ownership"
• "Long-term stewardship"
• "Innovative thinking"
• "Active engagement"

Multi-select + custom text input
```

**Component 4: Values Reference**
```
Auto-populated from Stage 2 values:

Which values should appear in mission?
☑️ Honesty & Integrity
☑️ Family Unity
☑️ Innovation
☐ Independence
☑️ Community Service

AI generates natural phrasing:
"guided by our values of integrity, 
 unity, innovation, and service"

Or more elaborate:
"grounded in our commitment to integrity,
 driven by innovation, united as a family,
 and dedicated to serving others"
```

---

**PHASE 2: Draft Full Mission (15 minutes)**

```
System auto-generates full mission from components:

┌────────────────────────────────────────┐
│ 📜 Generated Mission Statement          │
│ ──────────────────────────────────────  │
│                                        │
│ Full Version (45 words):               │
│                                        │
│ "We exist to build lasting prosperity  │
│  and unity across generations for our  │
│  family members, our employees, and    │
│  the communities we serve, through     │
│  strategic leadership, collaborative   │
│  governance, and responsible           │
│  ownership, guided by our values of    │
│  integrity, unity, innovation, and     │
│  service."                             │
│                                        │
│ One-Liner (12 words):                  │
│                                        │
│ "Building generational prosperity      │
│  through integrity, unity, and         │
│  service."                             │
│                                        │
│ Alternative Versions:                  │
│ [Show 3 alternative phrasings ▼]       │
│                                        │
│ [✏️ Edit Manually] [↻ Regenerate]      │
└────────────────────────────────────────┘

Family can:
• Edit directly (collaborative text editor)
• Choose from AI-generated alternatives
• Mix and match components
• Add/remove words
• Adjust tone
```

**Collaborative Editing:**
```
Real-time text editor for mission statement:
• Multiple cursors visible
• Change tracking: "Maria changed 'prosperity' 
                    to 'wealth and wellbeing'"
• Suggestion mode: Family members propose edits,
                   FC approves/rejects
• Version history: Can revert to any previous draft
• Word count tracker: Keep one-liner ≤20 words

Side panel shows edit activity:
┌─────────────────────────────────────┐
│ 📝 Recent Changes:                  │
│                                     │
│ • Maria: Added "enduring" (2 min ago│
│ • John: Removed "strategic" (5 min) │
│ • Elena: Suggested "nurture" instead│
│   of "build" (pending approval)     │
│                                     │
│ [View Full History]                 │
└─────────────────────────────────────┘
```

**Alternative Versions Generator:**
```
AI can generate multiple variations:

┌────────────────────────────────────────┐
│ 🔄 Alternative Mission Phrasings        │
│ ──────────────────────────────────────  │
│                                        │
│ Version A (Formal):                    │
│ "Our family exists to cultivate        │
│  multigenerational prosperity..."      │
│ [Preview Full] [Use This]              │
│                                        │
│ Version B (Inspirational):             │
│ "We are united in building a lasting   │
│  legacy of prosperity..."              │
│ [Preview Full] [Use This]              │
│                                        │
│ Version C (Action-Oriented):           │
│ "We create enduring value for family,  │
│  employees, and community..."          │
│ [Preview Full] [Use This]              │
│                                        │
│ Version D (Values-First):              │
│ "Guided by integrity and unity, we     │
│  build generational prosperity..."     │
│ [Preview Full] [Use This]              │
│                                        │
│ [Generate More Versions]               │
└────────────────────────────────────────┘
```

---

**PHASE 3: Refine & Finalize (10 minutes)**

```
Quality checks and final polish:

┌────────────────────────────────────────┐
│ ✅ Mission Quality Checklist            │
│ ──────────────────────────────────────  │
│                                        │
│ Clarity:                               │
│ ✅ Easy to understand                  │
│ ✅ No jargon or complex terms          │
│ ✅ Clear who/what/how/why              │
│                                        │
│ Authenticity:                          │
│ ✅ Reflects real family identity       │
│ ✅ Not generic/borrowed                │
│ ✅ Family members feel ownership       │
│                                        │
│ Inspiration:                           │
│ ✅ Motivating and uplifting            │
│ ⚠️  Consider: Does it give you pride?  │
│ ⚠️  Consider: Would NextGen embrace it?│
│                                        │
│ Actionability:                         │
│ ✅ Guides decision-making              │
│ ✅ Concrete enough to operationalize   │
│ ✅ Links to values clearly             │
│                                        │
│ Memorability:                          │
│ ⚠️  One-liner is memorable? Test it!   │
│ ✅ Full version is ≤50 words           │
│ ✅ Can be explained in 30 seconds      │
│                                        │
│ [Mission Passes All Checks] ✅          │
│ [Some Items Need Attention] ⚠️          │
└────────────────────────────────────────┘
```

**Test Your Mission:**
```
Interactive testing prompts:

┌────────────────────────────────────────┐
│ 🧪 Mission Stress Test                 │
│ ──────────────────────────────────────  │
│                                        │
│ Read your mission aloud, then answer:  │
│                                        │
│ 1. "Can you explain what this means    │
│     to a 10-year-old in your family?"  │
│    [Yes, easily] [Somewhat] [Not really│
│                                        │
│ 2. "Does this capture why you're proud │
│     to be part of this family?"        │
│    [Definitely] [Mostly] [Not quite]   │
│                                        │
│ 3. "Will this guide tough decisions    │
│     10 years from now?"                │
│    [Yes] [Probably] [Unsure]           │
│                                        │
│ 4. "Can family members recite the      │
│     one-liner from memory after        │
│     hearing it twice?"                 │
│    Test it now! [Start Memory Test]    │
│                                        │
│ If you answered "Yes/Definitely" to    │
│ all - your mission is ready!           │
│                                        │
│ [We're Ready] [Need More Work]         │
└────────────────────────────────────────┘
```

---

#### 📚 Mission Examples Library

```
┌────────────────────────────────────────┐
│ 📚 Family Mission Examples              │
│ ──────────────────────────────────────  │
│                                        │
│ Filter by type:                        │
│ [All] [Family Office] [Enterprise]     │
│ [Philanthropic] [Multi-Gen]            │
│                                        │
│ Example 1: Family Enterprise           │
│ ───────────────────────────────────   │
│ "We exist to build enduring value for  │
│  all stakeholders through innovative   │
│  leadership, responsible stewardship,  │
│  and unified family governance,        │
│  guided by our principles of           │
│  integrity, excellence, and service."  │
│                                        │
│ One-liner: "Creating lasting value     │
│             through unity and service" │
│                                        │
│ [Use as Template] [See Full Story]     │
│                                        │
│ Example 2: Philanthropic Family        │
│ ───────────────────────────────────   │
│ "We leverage our resources, talents,   │
│  and unity to create transformational  │
│  impact in education and healthcare    │
│  for underserved communities, living   │
│  our values of compassion, innovation, │
│  and justice across generations."      │
│                                        │
│ One-liner: "Transforming lives through │
│             compassionate generosity"  │
│                                        │
│ [Use as Template] [See Full Story]     │
│                                        │
│ [Show More Examples] (12 total)        │
└────────────────────────────────────────┘
```

---

#### 💾 Data Collected

**Stage 4 Output:**
```json
{
  "stage_4": {
    "family_mission": {
      "components": {
        "impact": "Build lasting prosperity and unity across generations",
        "audience": ["family_members", "employees", "communities"],
        "approach": "Strategic leadership, collaborative governance, responsible ownership",
        "values_referenced": ["honesty_integrity", "family_unity", "innovation", "community_service"]
      },
      "full_statement": "We exist to build lasting prosperity and unity across generations for our family members, our employees, and the communities we serve, through strategic leadership, collaborative governance, and responsible ownership, guided by our values of integrity, unity, innovation, and service.",
      "one_liner": "Building generational prosperity through integrity, unity, and service.",
      "word_count": {
        "full": 45,
        "one_liner": 9
      },
      "versions_generated": 4,
      "edits_made": 12,
      "quality_checks": {
        "clarity": true,
        "authenticity": true,
        "inspiration": true,
        "actionability": true,
        "memorability": true,
        "all_passed": true
      },
      "voting_results": {
        "approve": 10,
        "revise": 2,
        "approval_percentage": 83
      },
      "finalized_at": "2025-10-29T16:45:00Z"
    }
  }
}
```

**Stored in:**
- Constitution Service (port 8002) → family_mission table
- Becomes Constitution preamble

---

#### 📄 Collaborative Mechanics

**Component Building:**
- Work through components sequentially
- Can't proceed to next until current is "complete"
- Real-time preview of how components combine

**AI-Assisted Generation:**
- After components filled, AI generates multiple full versions
- Family reviews and selects favorite
- Can mix elements from different versions

**Live Editing:**
- Google Docs style collaborative editing
- All participants see cursor positions
- Suggested edits mode for major changes
- Version control with "Revert to" option

**Voting on Final Version:**
```
When mission seems ready:

┌────────────────────────────────────────┐
│ 🗳️ Vote to Finalize Mission            │
│ ──────────────────────────────────────  │
│                                        │
│ Current Mission Statement:             │
│ "We exist to build lasting prosperity  │
│  and unity across generations..."      │
│                                        │
│ [Read Full Version]                    │
│                                        │
│ Your vote:                             │
│ (•) Approve - I'm proud of this        │
│ ( ) Revise - Needs changes             │
│ ( ) Abstain                            │
│                                        │
│ If revise, what needs to change?       │
│ [Optional feedback: _______________]   │
│                                        │
│ Threshold: 75% approval to finalize    │
│ Current: 10/12 approve (83%) ✅         │
│                                        │
│ [Submit Vote]                          │
└────────────────────────────────────────┘

If threshold not met, facilitator leads 
discussion on concerns and revises
```

---

#### ⭐ Transition

**"Finalize Mission" button:**

**Validation:**
1. ✅ All 4 components defined?
2. ✅ Full mission statement ≤50 words?
3. ✅ One-liner ≤20 words?
4. ✅ 75%+ approval from family?
5. ✅ Quality checks passed?

**Pre-transition celebration:**
```
┌──────────────────────────────────────────┐
│ 🎊 Mission Statement Complete!           │
│ ──────────────────────────────────────── │
│                                          │
│ YOUR FAMILY MISSION:                     │
│                                          │
│ "Building generational prosperity        │
│  through integrity, unity, and service." │
│                                          │
│ This mission will:                       │
│ • Appear in your Constitution preamble   │
│ • Guide all family decisions             │
│ • Inspire NextGen                        │
│ • Shape your legacy                      │
│                                          │
│ 💡 Next: Create your 10-20 year vision   │
│    to bring this mission to life         │
│                                          │
│ [< Revise Mission] [Continue to Stage 5 >│
└──────────────────────────────────────────┘
```

**If validation passes:**
- Saves final mission statement
- Generates printable mission poster
- Passes mission to Stage 5 (vision should align)
- Auto-transition to Screen 5
- Transition logged

---

### Screen 5: 10-20 Year Vision Canvas (40 minutes)

#### 🎯 Goal
Create strategic vision for family's future across 6 key dimensions, with measurable milestones and risk mitigation

#### ⏱️ Duration
40 minutes

#### 👥 Roles & Permissions

**Consultant (Facilitator):**
- Guides vision canvas process across 6 dimensions
- Helps set realistic yet ambitious goals
- Ensures vision aligns with mission and values
- Cannot vote on family-specific vision

**Family Council Members:**
- Full editing permissions on vision
- Lead goal-setting for each dimension
- Vote on priorities and milestones
- Ensure vision is achievable

**Family Assembly Members:**
- Contribute vision ideas
- Vote on ambitious vs. conservative goals
- Share aspirations for future
- Validate vision is inspiring

**Board Members / CEO (if present):**
- Input on business dimension viability
- Reality-check on resource requirements
- Align business strategy with family vision

**Observers:**
- Read-only view

---

#### 🎨 Wireframe Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ Header: Mission, Vision & Values Workshop                      │
│ Stage 5 of 6: 10-20 Year Vision | ⏱️ 40:00 | 👥 12             │
├─────────────────────────┬───────────────────────────────────────┤
│                         │                                       │
│  Facilitator Panel      │  Main Workspace: Vision Canvas        │
│  (Left - 20%)           │  (Center - 60%)                       │
│                         │                                       │
│  📊 Vision Progress:    │  ┌────────────────────────────────────┐│
│                         │  │  10-20 Year Family Vision          ││
│  Dimensions:            │  │  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━  ││
│  ✅ Family              │  │                                    ││
│  ⏳ Business            │  │  Current Dimension: FAMILY         ││
│  ⏹️ Capital             │  │  Time Horizon: 10-20 years         ││
│  ⏹️ Social/Philanthropy │  │                                    ││
│  ⏹️ Reputation/Legacy   │  │  ┌──────────────────────────────┐  ││
│  ⏹️ Risk Management     │  │  │ 📋 Dimension Overview         │  ││
│                         │  │  │                              │  ││
│  ⏰ Time per dimension: │  │  │ 1. Family                    │  ││
│  ~6-7 minutes           │  │  │ 2. Business                  │  ││
│                         │  │  │ 3. Capital/Assets            │  ││
│  💡 Vision Tips:        │  │  │ 4. Social Impact/Philanthropy│  ││
│                         │  │  │ 5. Reputation/Legacy         │  ││
│  Good visions are:      │  │  │ 6. Risk Management           │  ││
│  • Ambitious but        │  │  └──────────────────────────────┘  ││
│    achievable           │  │                                    ││
│  • Specific with        │  │  ┌──────────────────────────────┐  ││
│    measurable milestones│  │  │ 👨‍👩‍👧‍👦 FAMILY DIMENSION        │  ││
│  • Aligned to mission   │  │  │                              │  ││
│  • Inspiring NextGen    │  │  │ Future Goal (10-20 years):   │  ││
│  • Multi-dimensional    │  │  │ [Text editor]                │  ││
│                         │  │  │ "All family members actively │  ││
│  Common mistakes:       │  │  │  engaged in governance.      │  ││
│  • Too vague            │  │  │  NextGen leadership prepared.│  ││
│  • Unrealistic          │  │  │  Strong bonds across 4 gens."│  ││
│  • Only financial       │  │  │                              │  ││
│  • Ignoring risks       │  │  │ 💡 Family Vision Prompts:    │  ││
│                         │  │  │ • How many generations?      │  ││
│  📚 Vision Examples:    │  │  │ • NextGen roles?             │  ││
│  [Show Library ▼]       │  │  │ • Family gatherings?         │  ││
│  • Family Office        │  │  │ • Governance participation?  │  ││
│  • Multi-generation     │  │  │ • Relationship quality?      │  ││
│  • Philanthropic        │  │  │                              │  ││
│  • Business Family      │  │  │ [See Examples]               │  ││
│                         │  │  └──────────────────────────────┘  ││
│  🎯 Your Mission:       │  │                                    ││
│  (Reference)            │  │  ┌──────────────────────────────┐  ││
│                         │  │  │ 🚫 NON-GOALS                 │  ││
│  "Building generational │  │  │ What we explicitly DON'T want││
│   prosperity through    │  │  │                              │  ││
│   integrity, unity,     │  │  │ [Checkboxes]                 │  ││
│   and service."         │  │  │ [x] Force participation      │  ││
│                         │  │  │ [x] All family in business   │  ││
│  Vision should support  │  │  │ [ ] Geographic concentration │  ││
│  this mission!          │  │  │ [ ] Custom: [___________]    │  ││
│                         │  │  │                              │  ││
│  [Export Vision Canvas] │  │  │ [+ Add Non-Goal]             │  ││
│                         │  │  └──────────────────────────────┘  ││
│                         │  │                                    ││
│                         │  │  ┌──────────────────────────────┐  ││
│                         │  │  │ 📅 FIRST MILESTONE (12 months│  ││
│                         │  │  │                              │  ││
│                         │  │  │ What's the first step?       │  ││
│                         │  │  │ [Text editor]                │  ││
│                         │  │  │ "Launch NextGen Council with │  ││
│                         │  │  │  5 members under age 35"     │  ││
│                         │  │  │                              │  ││
│                         │  │  │ Due Date: [Dec 2026_____]    │  ││
│                         │  │  │ Owner: [Family Council ▼]    │  ││
│                         │  │  │ Success Metric: [5 active    │  ││
│                         │  │  │                 members____] │  ││
│                         │  │  │                              │  ││
│                         │  │  │ [+ Add Milestone]            │  ││
│                         │  │  └──────────────────────────────┘  ││
│                         │  │                                    ││
│                         │  │  ┌──────────────────────────────┐  ││
│                         │  │  │ ⚠️ PRIMARY RISK              │  ││
│                         │  │  │                              │  ││
│                         │  │  │ What could prevent this?     │  ││
│                         │  │  │ [Dropdown + text]            │  ││
│                         │  │  │ Type: [Family Conflict ▼]    │  ││
│                         │  │  │ Description: "NextGen loses  │  ││
│                         │  │  │  interest if not involved    │  ││
│                         │  │  │  meaningfully"               │  ││
│                         │  │  │                              │  ││
│                         │  │  │ Mitigation Strategy:         │  ││
│                         │  │  │ "Early involvement in FC.    │  ││
│                         │  │  │  Mentorship program."        │  ││
│                         │  │  │                              │  ││
│                         │  │  │ [+ Add Risk]                 │  ││
│                         │  │  └──────────────────────────────┘  ││
│                         │  │                                    ││
│                         │  │  [💾 Save Dimension]               ││
│                         │  │  [Next Dimension: Business >]      ││
│                         │  └────────────────────────────────────┘│
│                         │                                       │
├─────────────────────────┼───────────────────────────────────────┤
│                         │  Participants Panel (Right - 20%)     │
│                         │                                       │
│                         │  👥 Active: 12                        │
│                         │                                       │
│                         │  💬 Vision Discussion:                │
│                         │  Maria: "Love '4 generations' goal"  │
│                         │  John: "What about family members     │
│                         │        who live abroad?"              │
│                         │  Elena: "Virtual participation OK!"   │
│                         │  Sarah: "NextGen Council brilliant!"  │
│                         │                                       │
│                         │  ✋ Raised Hands (1)                  │
│                         │  David: "Should we set engagement     │
│                         │         target percentage?"           │
│                         │                                       │
│                         │  📊 Dimension Status:                 │
│                         │  ✅ Family: Complete                  │
│                         │  ⏳ Business: In progress              │
│                         │  ⏹️ Capital: Not started              │
│                         │                                       │
└─────────────────────────┴───────────────────────────────────────┘
│ Footer: [< Previous] [Complete Vision >] [💾 Auto-saving...]    │
└─────────────────────────────────────────────────────────────────┘
```

---

#### 📋 Vision Canvas - 6 Dimensions

Work through each dimension systematically:

---

**DIMENSION 1: FAMILY** (👨‍👩‍👧‍👦)

```
┌────────────────────────────────────────┐
│ 👨‍👩‍👧‍👦 FAMILY DIMENSION                  │
│ ──────────────────────────────────────  │
│                                        │
│ Future State (10-20 years):            │
│ What does family success look like?    │
│                                        │
│ [Text editor - 500 char max]           │
│ "All family members actively engaged   │
│  in governance appropriate to age/     │
│  interest. NextGen leadership pipeline │
│  established. Strong bonds across 4    │
│  generations. Family gatherings 2x/year│
│  with 90%+ attendance."                │
│                                        │
│ 💡 Consider:                           │
│ • How many generations will exist?     │
│ • What % participation in governance?  │
│ • How will NextGen be prepared?        │
│ • Quality of relationships?            │
│ • Family traditions and gatherings?    │
│ • Geographic distribution?             │
│                                        │
│ Non-Goals (what we DON'T want):        │
│ [x] Force participation                │
│ [x] Require all family in business     │
│ [x] Expect geographic concentration    │
│ [ ] Custom: [___________________]      │
│                                        │
│ First Milestone (Year 1):              │
│ [Launch NextGen Council with 5 members]│
│ Due: [December 2026]                   │
│ Owner: [Family Council]                │
│ Metric: [5 active members, 80% mtg     │
│          attendance]                   │
│                                        │
│ [+ Add More Milestones]                │
│                                        │
│ Primary Risk:                          │
│ Type: [Family Conflict ▼]              │
│ "NextGen loses interest if not         │
│  meaningfully involved"                │
│                                        │
│ Mitigation:                            │
│ "Early FC involvement. Mentorship      │
│  program. Real decision authority."    │
│                                        │
│ [+ Add More Risks]                     │
│                                        │
│ [💾 Save] [Next Dimension >]           │
└────────────────────────────────────────┘
```

---

**DIMENSION 2: BUSINESS** (💼)

```
┌────────────────────────────────────────┐
│ 💼 BUSINESS DIMENSION                   │
│ ──────────────────────────────────────  │
│                                        │
│ Future State (10-20 years):            │
│ What does business success look like?  │
│                                        │
│ [Text editor]                          │
│ "Three successful business lines       │
│  generating $XXM revenue. Professional │
│  management team. Family maintains     │
│  control through Board. Profitable and │
│  sustainable. Market leader in Y."     │
│                                        │
│ 💡 Consider:                           │
│ • Revenue/profitability targets?       │
│ • Market position?                     │
│ • Family vs. professional management?  │
│ • Business expansion or focus?         │
│ • Succession planning status?          │
│ • Innovation priorities?               │
│                                        │
│ Non-Goals:                             │
│ [x] Maximize growth at any cost        │
│ [x] IPO or sale of core business       │
│ [ ] Diversify into unrelated sectors   │
│ [ ] Custom: [___________________]      │
│                                        │
│ First Milestone (Year 1):              │
│ [Complete 5-year strategic plan]       │
│ Due: [June 2026]                       │
│ Owner: [Board of Directors]            │
│ Metric: [Board-approved plan