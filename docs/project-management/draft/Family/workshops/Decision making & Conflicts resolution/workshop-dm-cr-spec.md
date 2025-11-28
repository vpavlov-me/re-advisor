---
doc_id: "DOC-WRK-001"
title: "Decision Making & Conflict Resolution Workshop - Digital Interface Specification"
type: "workshop-specification"
category: "product"
audience: "product-manager|designer|developer"
complexity: "advanced"
created: "2025-10-29"
updated: "2025-10-29"
version: "1.0.0"
status: "draft"
tags: ["workshop", "decision-making", "conflict-resolution", "governance", "collaborative-interface"]
related: ["DOC-SYS-001", "DOC-USR-006"]
owner: "product-team"
maintainer: "product-team"
priority: "high"
---

# Decision Making & Conflict Resolution Workshop
## Digital Interface Specification

> **Purpose**: Detailed screen-by-screen specification for digital collaborative workshop interface. Enables Consultant to facilitate "Family Governance Architecture" workshop with real-time family participation.

---

## 📋 Document Overview

### Workshop Summary
- **Title**: "Архитектура семейного управления" (Family Governance Architecture)
- **Goal**: Согласовать каркас Governance Blueprint с ролями и правами
- **Duration**: 3-3.5 hours
- **Format**: Digital collaborative session (real-time)
- **Facilitator**: Consultant (via Advisor Portal)
- **Participants**: Family Council, Board members, CEO, advisors

### Document Structure
1. **Pre-Workshop Introduction** - Onboarding participants
2. **Architecture Overview** - Technical foundation
3. **Workshop Screens (10)** - Detailed screen specifications
4. **Post-Workshop Integration** - Artifact deployment

---

## 🎯 PART 1: Pre-Workshop Introduction

### Screen 0: Workshop Orientation & Setup

**Purpose**: Ensure all participants understand WHAT, WHY, and HOW before starting

#### 🎨 Layout Description

**Header Section:**
- Workshop title: "Family Governance Architecture Workshop"
- Session ID and date/time
- Participant count indicator (e.g., "8 of 10 participants joined")
- Language selector (if multi-language support)

**Hero Section (Center):**
- Large visual roadmap showing 10 stages as timeline
- Progress indicator: "Not started"
- Estimated duration: 3-3.5 hours
- Countdown timer to scheduled start time

**What We'll Do Panel (Left Column):**
```
📍 Workshop Roadmap

Stage 1: Kick-off and objectives (10 min)
Stage 2: Three Circles Model (10 min)
Stage 3: Governance Bodies & Roles (25 min)
Stage 4: Decision Rights Matrix (RACI) (40 min) ⭐
Stage 5: Meeting Frequency & Calendar (20 min)
Stage 6: Family Council Elections (30 min)
Stage 7: Board Interface (25 min)
Stage 8: Conflict Escalation (15 min)
Stage 9: Secretariat & Documentation (10 min)
Stage 10: Summary & Next Steps (10 min)

⭐ = Longest interactive section
```

**Why This Matters Panel (Center-Left):**
```
🎯 Business Value for Your Family

✅ Clarity in Decision-Making
   → Everyone knows WHO decides WHAT
   → Reduces confusion and duplicate work
   → Speeds up strategic decisions

✅ Conflict Prevention
   → Clear escalation procedures
   → Transparent governance rules
   → Early warning system for issues

✅ Governance Maturity
   → Professional family governance structure
   → Alignment with business governance
   → Foundation for multi-generational success

📊 Success Metrics:
   • 60% faster decision turnaround
   • 80% reduction in governance conflicts
   • 90% family satisfaction with transparency
```

**How Results Will Be Used Panel (Center-Right):**
```
🔗 Automatic Platform Integration

After workshop completion, your decisions automatically create:

📊 Decision Rights Matrix
   → Instantly deployed to Decision Making module
   → All family members see WHO decides WHAT
   → Used for future decision proposals

⚖️ Conflict Escalation Procedure
   → Automatically configured in Conflict Resolution module
   → 4-level escalation path activated
   → Mediator assignment rules set

📜 Family Council Charter
   → Updates your Family Constitution
   → Defines election procedures
   → Sets term limits and requirements

📅 Governance Calendar
   → All meetings auto-scheduled
   → Reminders configured
   → Recurring events created

No manual data entry needed - everything is automated!
```

**Participant Roles Panel (Right Column):**
```
👥 Your Role in This Workshop

🎤 Consultant (Facilitator)
   • Guides discussion through stages
   • Controls timing and transitions
   • Provides governance best practices
   • Cannot vote on family decisions

👑 Family Council Members
   • Full editing permissions
   • Vote on governance decisions
   • Define family rules and procedures
   • Shape final governance blueprint

👔 Board Members / CEO
   • Contribute to interface discussions
   • Clarify business governance needs
   • Vote on joint procedures
   • Observer in family-only sections

📋 Observers (Advisors, Legal)
   • Read-only access
   • Can raise hand to speak
   • Provide expert input when requested
   • No voting rights

Real-time collaboration: You'll see everyone's inputs instantly!
```

**Pre-Workshop Checklist (Bottom):**
```
✅ Materials to Have Ready

Before starting, ensure you have:
[ ] Current organizational chart (family, business, ownership)
[ ] Draft family values and mission (if available)
[ ] Calendar of existing meetings
[ ] Corporate documents (charter, shareholder agreement, board regulations)
[ ] List of known conflicts between family, board, and management

Upload documents here: [Upload Zone] (optional, helps facilitator)

🔒 All materials are confidential and encrypted with your family_id
```

**Footer Section:**
- **Pre-Workshop Survey** button (5 min, collects context)
- **I'm Ready to Start** button (disabled until facilitator starts)
- **Technical Check** button (audio, video, connection test)
- **Download Preparation Guide** link (PDF with detailed agenda)

---

#### 📊 Data Collected (Pre-Workshop Survey)

**Survey Questions (Optional, helps facilitator):**
1. "What are your top 3 governance challenges?" (free text)
2. "How formalized is your current family governance?" (scale 1-10)
3. "Do you have existing Family Council?" (Yes/No/Informal)
4. "Main decision-making pain points?" (multiple choice)
5. "Conflicts between family and business governance?" (Yes/No/Sometimes)

**Stored in:**
- Education Service (port 8006) - workshop_sessions table
- Associated with family_id and session_id

---

#### 🔄 Collaborative Mechanics

**Participant Joining:**
- Real-time participant list updates
- Green checkmark when participant acknowledges materials
- Facilitator sees who's ready vs. who's waiting
- Chat panel for pre-workshop questions

**Facilitator Controls:**
- Can start workshop when minimum quorum reached (configurable)
- Can share screen for uploaded materials preview
- Can send individual reminders to late participants

---

#### ⏭️ Transition to Workshop

**"Start Workshop" button (Facilitator only):**
- Locks participant list (latecomers must request admission)
- Starts session timer
- Transitions all participants to Screen 1 simultaneously
- Creates session audit log entry

---

## 🏗️ PART 2: Architecture Overview

### Technical Foundation

#### Services Used
```
Workshop Orchestration:
├── Education Service (8006) - Workshop engine, template management
├── Decision Making Service (8009) - RACI matrix storage
├── Conflict Resolution Service (8015) - Escalation procedures
├── Constitution Service (8002) - Charters, governance documents
├── Meeting Service (8003) - Calendar integration
└── Notification Service (8010) - Real-time updates

Frontend:
└── Advisor Portal (3002) - Consultant facilitator interface
└── Family Portal (3001) - Participant interface

Real-time:
└── WebSocket connections for collaborative editing
└── Redis pub/sub for presence and updates
```

#### Multi-Tenancy & Security
- All workshop data isolated by `family_id`
- Session data encrypted at rest
- WebSocket connections authenticated with JWT
- Participant permissions checked on every action
- Audit trail for all decisions and edits

#### Data Model

```typescript
WorkshopSession {
  session_id: uuid
  family_id: uuid
  workshop_template_id: "dm-cr-governance-blueprint"
  consultant_id: uuid
  status: "not_started" | "in_progress" | "completed"
  current_stage: 0-10
  started_at: timestamp
  completed_at: timestamp
  participants: [
    {
      user_id: uuid
      role: "facilitator" | "family_council" | "board" | "observer"
      joined_at: timestamp
      presence: "online" | "away" | "offline"
    }
  ]
  stage_data: {
    stage_1: {...},
    stage_2: {...},
    // ... all stage outputs
  }
  artifacts: {
    governance_blueprint: {...},
    raci_matrix: {...},
    council_charter: {...},
    meeting_calendar: {...},
    escalation_procedure: {...}
  }
}
```

---

## 🖥️ PART 3: Workshop Screens (Detailed Specifications)

---

### Screen 1: Kick-off and Objectives (10 minutes)

#### 🎯 Goal
Align participants on workshop purpose, ground rules, and expected outcomes

#### ⏱️ Duration
10 minutes

#### 👥 Roles & Permissions

**Consultant (Facilitator):**
- Controls screen content and timing
- Advances through slides
- Can mute/unmute participants
- Manages "raise hand" queue

**Family Council Members:**
- Can raise hand to speak
- Can use reaction emojis (agree, question, etc.)
- Full chat access

**Board Members / CEO:**
- Same as Family Council

**Observers:**
- Can raise hand (lower priority queue)
- Chat access (read-only or restricted)

---

#### 🎨 Wireframe Layout

**Screen Structure:**

```
┌─────────────────────────────────────────────────────────────────────┐
│ Header: Decision Making & Conflict Resolution Workshop             │
│ Stage 1 of 10: Kick-off and Objectives | ⏱️ 10:00 | 👥 8 online    │
├──────────────────────────┬──────────────────────────────────────────┤
│                          │                                          │
│  Facilitator Panel       │  Main Presentation Area                 │
│  (Left - 20% width)      │  (Center - 60% width)                   │
│                          │                                          │
│  📋 Script:              │  ┌────────────────────────────────────┐ │
│  • Welcome everyone      │  │ 🎯 Workshop Objectives             │ │
│  • Confirm quorum        │  │                                     │ │
│  • Review agenda         │  │ 1. Create Governance Blueprint     │ │
│  • Set ground rules      │  │    → Clear roles and rights        │ │
│                          │  │                                     │ │
│  ⏭️ Content Slides:      │  │ 2. Define Decision Matrix (RACI)  │ │
│  [• Objectives]          │  │    → Who decides what              │ │
│  [ ] Ground Rules        │  │                                     │ │
│  [ ] Expected Outputs    │  │ 3. Establish Conflict Escalation  │ │
│  [ ] Time Management     │  │    → Clear resolution path         │ │
│                          │  │                                     │ │
│  ⏰ Stage Timer:         │  │ 4. Build Governance Calendar      │ │
│  ⏱️ 10:00 remaining      │  │    → Meeting rhythm                │ │
│                          │  │                                     │ │
│  🎤 Speaking Queue:      │  │ Expected Time: 3-3.5 hours        │ │
│  (empty)                 │  └────────────────────────────────────┘ │
│                          │                                          │
│                          │  [< Previous] [Next Slide >]            │
│                          │                                          │
├──────────────────────────┼──────────────────────────────────────────┤
│                          │  Participants Panel                      │
│                          │  (Right - 20% width)                     │
│                          │                                          │
│                          │  👥 Participants (8)                     │
│                          │  🟢 Alex (Facilitator)                   │
│                          │  🟢 Maria (FC) 👑                        │
│                          │  🟢 John (FC) 👑                         │
│                          │  🟢 Sarah (Board)                        │
│                          │  🟢 David (CEO)                          │
│                          │  🟡 Emma (Observer)                      │
│                          │  🔴 Michael (Offline)                    │
│                          │  🟢 Lisa (Legal)                         │
│                          │                                          │
│                          │  💬 Chat                                 │
│                          │  ┌──────────────────────┐               │
│                          │  │ Maria: Ready to start│               │
│                          │  │ John: +1             │               │
│                          │  └──────────────────────┘               │
│                          │  [Type message...]       │               │
│                          │                                          │
└──────────────────────────┴──────────────────────────────────────────┘
│ Footer: [⏸️ Pause] [📊 Progress: 0/10] [💾 Auto-saving...]        │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### 📊 Content Slides (Facilitator advances through)

**Slide 1: Workshop Objectives**
- Create Governance Blueprint with roles and decision rights
- Define clear RACI matrix for major family decisions
- Establish conflict escalation procedures
- Build governance meeting calendar

**Slide 2: Ground Rules**
```
✅ Confidentiality - What's discussed stays in the family
✅ One agenda - Stay focused on governance architecture
✅ All voices heard - Everyone's input matters
✅ Decision documentation - All decisions recorded in protocol
✅ Parking lot - Off-topic items saved for later
✅ Time respect - We'll stick to schedule
```

Interactive checkbox: Each participant checks "I agree to ground rules"
→ Tracks acceptance in session data

**Slide 3: Expected Outputs**
Visual diagram showing artifacts:
- Governance Blueprint v0.9
- Decision Rights Matrix (RACI)
- Family Council Charter
- Meeting Calendar
- Conflict Escalation Procedure
- Secretariat Regulations

**Slide 4: Time Management**
Timeline visualization of 10 stages with duration bars
Facilitator reviews: "We'll move fast through some sections, take time on RACI matrix"

---

#### 💾 Data Collected

**Stage 1 Output:**
```json
{
  "stage_1": {
    "started_at": "2025-10-29T14:00:00Z",
    "completed_at": "2025-10-29T14:10:00Z",
    "ground_rules_accepted": [
      {"user_id": "uuid", "accepted_at": "timestamp"},
      // ... all participants
    ],
    "parking_lot_items": [], // Populated if participants raise issues
    "facilitator_notes": "string" // Optional notes by consultant
  }
}
```

**Stored in:** Education Service → workshop_sessions.stage_data

---

#### 🔄 Collaborative Mechanics

**Raise Hand Feature:**
- Participant clicks "✋ Raise Hand" button
- Appears in Facilitator Panel speaking queue
- Facilitator can call on participant (spotlight mode)
- Participant's video/audio highlighted
- After speaking, hand automatically lowered

**Reaction Emojis:**
- 👍 Agree
- ❓ Question
- ⏰ Need more time
- ✅ Ready to move on
- Real-time emoji counter shows aggregate sentiment

**Chat:**
- Side conversation allowed
- Facilitator can pin important messages to main screen
- Auto-archived in session transcript

---

#### ⏭️ Transition

**"Next Stage" button (Facilitator only):**
- Checks: All participants accepted ground rules?
- If yes → Auto-transition to Screen 2
- If no → Warning modal: "2 participants haven't accepted ground rules. Continue anyway?"
- Transition logged in audit trail

---

### Screen 2: Three Circles Model (10 minutes)

#### 🎯 Goal
Visualize and align on the overlapping relationship between Family, Ownership, and Business

#### ⏱️ Duration
10 minutes

#### 👥 Roles & Permissions

**Consultant (Facilitator):**
- Controls diagram builder
- Can place participant names in circles
- Explains model and implications

**Family Council Members:**
- Can drag their own name between circles
- Can suggest where others belong
- Vote on final placement (if dispute)

**Board Members / CEO:**
- Can position themselves
- Provide input on business circle membership

**Observers:**
- Read-only view

---

#### 🎨 Wireframe Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│ Header: Decision Making & Conflict Resolution Workshop             │
│ Stage 2 of 10: Three Circles Model | ⏱️ 10:00 | 👥 8 online         │
├──────────────────────────┬──────────────────────────────────────────┤
│                          │                                          │
│  Facilitator Panel       │  Main Canvas: Three Circles Diagram     │
│  (Left - 20%)            │  (Center - 60%)                          │
│                          │                                          │
│  📚 Model Explanation:   │  ┌────────────────────────────────────┐ │
│                          │  │                                     │ │
│  "Three Circles Model    │  │        ┌─────────────┐             │ │
│  shows how Family,       │  │       /  FAMILY      \             │ │
│  Ownership, and          │  │      /                \            │ │
│  Business overlap"       │  │     /  Maria, John,   \            │ │
│                          │  │    │   Emma, Lisa      │           │ │
│  Key Concepts:           │  │     \                /             │ │
│  • Family = Blood/       │  │      \    ┌─────┐   /              │ │
│    Marriage ties         │  │       \───┤BOTH ├──/               │ │
│  • Ownership = Shares    │  │           │Alex │                  │ │
│  • Business = Roles      │  │           │David│                  │ │
│                          │  │       ┌───┤Sarah├──┐               │ │
│  🎯 Workshop Goal:       │  │      /    └─────┘   \              │ │
│  Identify who sits where │  │     /                 \            │ │
│  to clarify governance   │  │    │   OWNERSHIP       │           │ │
│  interfaces              │  │     \                 /            │ │
│                          │  │      \               /             │ │
│  ⏰ Timer: 10:00         │  │       \─────────────/              │ │
│                          │  │          \         /               │ │
│                          │  │           \       /                │ │
│  📊 Participant Cards:   │  │            \     /                 │ │
│  Drag names to circles   │  │             \   /  BUSINESS        │ │
│                          │  │              \ /                   │ │
│  👤 Maria (FC)           │  │           ┌──────┐                │ │
│  👤 John (FC)            │  │           │Michael│               │ │
│  👤 Alex (Consultant)    │  │           │(CFO)  │               │ │
│  👤 Sarah (Board)        │  │           └──────┘                │ │
│  👤 David (CEO)          │  │                                    │ │
│  👤 Emma (Family)        │  │  Instructions: Drag participant   │ │
│  👤 Michael (CFO)        │  │  cards to appropriate circles     │ │
│  👤 Lisa (Legal)         │  │                                    │ │
│                          │  └────────────────────────────────────┘ │
│                          │                                          │
│  [Reset Diagram]         │  [Zoom +] [Zoom -] [Export PNG]         │
│                          │                                          │
├──────────────────────────┼──────────────────────────────────────────┤
│                          │  Participants Panel (Right - 20%)        │
│                          │  👥 Active: 8 | 💬 Chat | ✋ 1 raised   │
│                          │                                          │
│                          │  Sarah ✋: "I'm on Board but not owner" │
│                          │  Facilitator: "Great, drag to Business  │
│                          │               circle only"              │
└──────────────────────────┴──────────────────────────────────────────┘
│ Footer: [< Previous Stage] [Complete Stage 2 >] [💾 Saved]        │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### 📊 Diagram Builder Features

**Interactive Elements:**

**Circle Areas (3):**
1. **Family Circle** (Red/Pink)
   - Drop zone for family members
   - Auto-label: "Family Member"
   
2. **Ownership Circle** (Blue)
   - Drop zone for shareholders
   - Auto-label: "Owner/Shareholder"
   
3. **Business Circle** (Green)
   - Drop zone for business roles
   - Auto-label: "Business Role"

**Overlap Zones (4):**
4. **Family + Ownership** (Red+Blue)
   - "Family Shareholder"
   
5. **Family + Business** (Red+Green)
   - "Family Employee"
   
6. **Ownership + Business** (Blue+Green)
   - "Shareholder Executive"
   
7. **All Three** (Center)
   - "Family Shareholder Executive" (highest complexity)

**Participant Cards:**
- Each participant represented as draggable card
- Color-coded by current role (FC = gold crown, Board = blue, etc.)
- Shows photo (if available) + name + primary role
- Can be placed in multiple circles (appears in overlap)

**Drag and Drop:**
- Participants can drag own card
- Facilitator can drag any card
- Family Council can suggest placement for others
- Real-time updates for all participants
- Undo/redo functionality

---

#### 💾 Data Collected

**Stage 2 Output:**
```json
{
  "stage_2": {
    "three_circles_model": {
      "family_only": ["user_id_1", "user_id_2"],
      "ownership_only": ["user_id_3"],
      "business_only": ["user_id_4"],
      "family_ownership": ["user_id_5"],
      "family_business": [],
      "ownership_business": ["user_id_6"],
      "all_three": ["user_id_7", "user_id_8"]
    },
    "diagram_snapshot": "base64_encoded_image",
    "complexity_score": 7, // 1-10 based on overlap
    "governance_implications": [
      "7 participants in overlapping roles require clear decision boundaries",
      "Family-Business overlap creates potential conflict of interest scenarios",
      "Ownership-Business participants need independent board oversight"
    ],
    "facilitator_notes": "High complexity family - need strong RACI matrix"
  }
}
```

**Stored in:** Education Service → workshop_sessions.stage_data

---

#### 🔄 Collaborative Mechanics

**Real-time Sync:**
- When participant drags card, all screens update instantly
- Position locked briefly (2 sec) to prevent collision
- If two people try to move same card: "Maria is positioning this card, please wait"

**Voting on Disputed Placement:**
- If Family Council member disagrees with placement
- Click "Dispute" button on card
- Opens mini poll: "Should [Name] be in [Circle]?" 
- Simple majority among Family Council
- Facilitator can override with explanation

**Chat Integration:**
- Participants can comment on placements
- "@mention" feature to ask specific people
- Facilitator can pin important clarifications

---

#### 📈 Auto-Generated Insights

**Complexity Analysis (shown to Facilitator):**
```
⚠️ Governance Complexity: HIGH

• 3 participants in "All Three" overlap
  → High potential for role confusion
  → Recommendation: Extra clarity needed in RACI matrix
  
• 5 family members NOT in business
  → May feel disconnected from operations
  → Recommendation: Strong Family Council communication
  
• 2 business roles WITHOUT ownership
  → Potential alignment issues
  → Recommendation: Clear board reporting structure
```

Helps facilitator anticipate Stage 4 (RACI matrix) challenges

---

#### ⏭️ Transition

**"Complete Stage 2" button:**
- Saves diagram snapshot
- Validates: All participants placed in at least one circle?
- If yes → Auto-transition to Screen 3
- If no → Warning: "3 participants not placed. Add them or mark as 'External'?"
- Generates governance implications summary
- Transition logged

---

### Screen 3: Governance Bodies & Roles (25 minutes)

#### 🎯 Goal
Define the four key governance organs (Family Assembly, Family Council, Board of Directors, Management) with clear mandates and composition

#### ⏱️ Duration
25 minutes

#### 👥 Roles & Permissions

**Consultant (Facilitator):**
- Guides discussion through each governance body
- Provides governance best practice templates
- Cannot vote on family-specific decisions

**Family Council Members:**
- Full editing permissions on all bodies
- Vote on composition and mandates
- Define selection criteria

**Board Members / CEO:**
- Input on Board-Management interface
- Cannot vote on Family Assembly/Council definitions
- Can propose Board governance recommendations

**Observers:**
- Can raise hand to provide legal/advisory input
- No editing permissions

---

#### 🎨 Wireframe Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│ Header: Decision Making & Conflict Resolution Workshop             │
│ Stage 3 of 10: Governance Bodies & Roles | ⏱️ 25:00 | 👥 8 online  │
├──────────────────────────┬──────────────────────────────────────────┤
│                          │                                          │
│  Facilitator Panel       │  Main Workspace: Governance Org Chart   │
│  (Left - 20%)            │  (Center - 60%)                          │
│                          │                                          │
│  📊 Current Body:        │  ┌────────────────────────────────────┐ │
│  [1/4] Family Assembly   │  │  Governance Body Builder           │ │
│                          │  │                                     │ │
│  ✅ Family Assembly      │  │  Body 1: FAMILY ASSEMBLY           │ │
│  [ ] Family Council      │  │  ────────────────────────────────  │ │
│  [ ] Board of Directors  │  │                                     │ │
│  [ ] Management          │  │  📝 Mandate:                       │ │
│                          │  │  [Text editor with suggestions]    │ │
│  ⏰ Per Body: ~6 min     │  │  "Highest governing body of family │ │
│                          │  │   Ratifies major family decisions  │ │
│  💡 Best Practices:      │  │   Elects Family Council           │ │
│                          │  │   Amends Family Constitution"     │ │
│  Family Assembly:        │  │                                     │ │
│  • All adult family      │  │  👥 Composition & Voting:          │ │
│    members               │  │                                     │ │
│  • Meets 1-2x/year       │  │  Who can be member?               │ │
│  • Ratifies major        │  │  [x] All adult family members     │ │
│    decisions             │  │  [x] Age 18+                      │ │
│  • Elects FC             │  │  [ ] Shareholders only            │ │
│                          │  │  [ ] Include spouses: [Yes/No]    │ │
│  📄 Template Library:    │  │  [ ] Custom criteria: [________]  │ │
│  [Load Template ▼]       │  │                                     │ │
│  • Basic Structure       │  │  Voting Rights:                   │ │
│  • Single Family Office  │  │  ( ) One person = one vote        │ │
│  • Multi-Family Office   │  │  ( ) Weighted by ownership %      │ │
│  • NextGen Inclusive     │  │  (•) Hybrid model: [Describe]     │ │
│                          │  │                                     │ │
│                          │  │  📊 Quorum & Decision Threshold:  │ │
│                          │  │  Quorum required: [50]% present   │ │
│                          │  │  Simple decisions: [50]%+ approve │ │
│                          │  │  Major decisions: [66]%+ approve  │ │
│                          │  │                                     │ │
│                          │  │  📅 Meeting Frequency:            │ │
│                          │  │  [ ] Annually                     │ │
│                          │  │  [x] Semi-annually (2x/year)      │ │
│                          │  │  [ ] Quarterly                    │ │
│                          │  │  [ ] Custom: [________]           │ │
│                          │  │                                     │ │
│                          │  │  ⚖️ Exclusive Powers:             │ │
│                          │  │  [x] Amend Family Constitution    │ │
│                          │  │  [x] Elect/remove FC members      │ │
│                          │  │  [x] Approve dividend policy      │ │
│                          │  │  [x] Major asset transactions     │ │
│                          │  │  [ ] Custom: [Add more...]        │ │
│                          │  │                                     │ │
│                          │  └────────────────────────────────────┘ │
│                          │                                          │
│                          │  [< Previous Body] [Save & Next Body >] │
│                          │                                          │
├──────────────────────────┼──────────────────────────────────────────┤
│                          │  Participants Panel (Right - 20%)        │
│                          │                                          │
│                          │  👥 Active Editors (3):                  │
│                          │  Maria (typing mandate...)               │
│                          │  John (reviewing quorum)                 │
│                          │  Alex (facilitating)                     │
│                          │                                          │
│                          │  💬 Chat:                                │
│                          │  Sarah: "Should spouses vote?"           │
│                          │  Maria: "Let's discuss case by case"     │
│                          │  John: "I propose yes on family matters" │
│                          │                                          │
│                          │  🗳️ Active Polls (0)                    │
│                          │                                          │
└──────────────────────────┴──────────────────────────────────────────┘
│ Footer: [⏸️ Pause] [📊 Progress: 2/10] [💾 Auto-saving...]        │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### 📊 Governance Body Builder (4 Sequential Forms)

**Each governance body has same structure, repeat 4 times:**

**Form Structure:**

**1. Mandate Definition** (Free text editor with AI suggestions)
- Pre-populated template based on best practices
- Editable by Family Council
- Word limit: 500 characters (forces clarity)
- AI helper: "This mandate is clear/unclear/overlaps with [other body]"

**2. Composition & Membership Criteria**
- Checkboxes for eligibility (age, family status, ownership, etc.)
- Custom criteria field
- Visual preview: "Based on Stage 2, X people qualify"
- Warning if criteria exclude current participants

**3. Selection/Election Process**
- Dropdown: Appointed / Elected / Hybrid
- If Elected: Method (Simple majority / STV / Cumulative)
- Term length slider: 1-5 years
- Term limit: 0-3 consecutive terms
- Staggered rotation: Yes/No

**4. Voting Rights & Quorum**
- Voting model: Equal / Weighted / Custom
- Quorum percentage slider (33-100%)
- Decision thresholds:
  - Simple majority (50%+)
  - Super majority (66%+)
  - Unanimous (100%)
- Can set different thresholds for different decision types

**5. Meeting Frequency**
- Preset buttons: Annual / Semi-annual / Quarterly / Monthly
- Custom schedule builder
- Integration with Stage 5 calendar

**6. Exclusive Powers** (Multi-select checklist)
Pre-loaded common powers, can add custom
- Constitutional amendments
- Elect/remove other bodies
- Major financial decisions
- Strategy approval
- Etc.

---

#### 📋 Four Governance Bodies

**Body 1: Family Assembly** (Completed form above)

**Body 2: Family Council**
```
Focus areas for facilitator to guide:
• Size: 3-7 members typically
• Representation: By generation? By branch? Merit-based?
• Eligibility: Age, experience, family standing requirements
• Term: 2-3 years with rotation
• Committees: NextGen, Philanthropy, Education, etc.
• Powers: Policy development, Assembly preparation, operational governance
```

**Body 3: Board of Directors**
```
Focus areas:
• Composition: Family vs. Independent ratio
• Nomination process: Who proposes directors?
• Family Council liaison role (observer, no vote)
• Interface with Family Council (joint meetings, reporting)
• Independence requirements for family members on board
```

**Body 4: Management Team**
```
Focus areas:
• Who appoints CEO? (Board? Assembly?)
• Family employment policy (can family work in business?)
• Reporting lines to Board vs. Family Council
• Performance evaluation process
• Succession planning oversight
```

---

#### 💾 Data Collected

**Stage 3 Output:**
```json
{
  "stage_3": {
    "governance_bodies": {
      "family_assembly": {
        "mandate": "string",
        "eligibility": {
          "age_minimum": 18,
          "family_status": ["adult", "spouse"],
          "custom_criteria": []
        },
        "voting_model": "one_person_one_vote",
        "quorum": 50,
        "decision_thresholds": {
          "simple": 50,
          "major": 66
        },
        "meeting_frequency": "semi_annual",
        "exclusive_powers": ["amend_constitution", "elect_fc", "approve_dividends"],
        "eligible_members_count": 15
      },
      "family_council": {...},
      "board_of_directors": {...},
      "management": {...}
    },
    "org_chart_snapshot": "base64_encoded_image",
    "complexity_analysis": {
      "overlap_risks": ["Family Council and Board have similar strategy powers"],
      "gap_risks": ["No clear NextGen development ownership"],
      "recommendations": ["Consider NextGen committee under Family Council"]
    }
  }
}
```

**Stored in:** Constitution Service (port 8002) → governance_structure table

---

#### 🔄 Collaborative Mechanics

**Real-time Co-editing:**
- Multiple participants can edit different fields simultaneously
- Active editors shown with colored cursors/highlights
- Typing indicator: "Maria is editing mandate..."
- Auto-save every 5 seconds
- Conflict resolution: Last edit wins, with version history

**Voting on Disputed Items:**
- Any Family Council member can call for vote on specific field
- Click "📊 Vote on this" button next to field
- Quick poll modal appears for all Family Council members
- Results shown in real-time
- Simple majority applies (unless body requires higher threshold)
- Facilitator can pause discussion for vote

**Template Suggestions:**
- Facilitator can load pre-built templates
- Modal: "Apply 'Single Family Office Standard' template?"
- Shows preview of what will change
- Family Council votes to accept/reject
- Can mix templates (e.g., Assembly from Template A, Council from Template B)

**AI-Powered Validation:**
- As participants fill forms, AI checks for:
  - Overlapping powers between bodies
  - Missing governance responsibilities
  - Contradictions (e.g., "Board appoints CEO" but "Family Council approves CEO")
  - Best practice violations
- Warning badges appear on problematic fields
- Facilitator can explain and help resolve

---

#### 📈 Visual Org Chart (Auto-Generated)

**Bottom panel** (collapsible):
```
┌──────────────────────────────────────────────────┐
│  Live Governance Organization Chart              │
│                                                   │
│           ┌────────────────────┐                 │
│           │  Family Assembly   │                 │
│           │  (15 members)      │                 │
│           └──────────┬─────────┘                 │
│                      │ Elects                    │
│                      ↓                            │
│           ┌────────────────────┐                 │
│           │  Family Council    │                 │
│           │  (5 members)       │                 │
│           └──────────┬─────────┘                 │
│                      │ Advises                   │
│           ┌──────────┼─────────┐                │
│           ↓          ↓          ↓                │
│      ┌────────┐ ┌────────┐ ┌────────┐          │
│      │NextGen │ │Philanth│ │Assets  │          │
│      │Comm.   │ │Comm.   │ │Comm.   │          │
│      └────────┘ └────────┘ └────────┘          │
│                      │ Liaison                   │
│                      ↓                            │
│           ┌────────────────────┐                 │
│           │ Board of Directors │                 │
│           │  (7 members)       │                 │
│           └──────────┬─────────┘                 │
│                      │ Oversees                  │
│                      ↓                            │
│           ┌────────────────────┐                 │
│           │   Management Team  │                 │
│           │   (CEO + Execs)    │                 │
│           └────────────────────┘                 │
└──────────────────────────────────────────────────┘
```

Updates in real-time as participants define bodies
Exportable as PNG/SVG

---

#### ⏭️ Transition

**"Complete Stage 3" button:**
- Validates: All 4 bodies defined with minimum fields?
- Checks for conflicts: AI highlights unresolved issues
- If critical conflicts exist: "⚠️ 2 conflicts detected. Resolve or continue?"
- Saves all governance bodies
- Generates org chart snapshot
- Auto-transition to Screen 4 (RACI Matrix)
- Transition logged

---

### Screen 4: Decision Rights Matrix (RACI) (40 minutes)

#### 🎯 Goal
Create comprehensive RACI matrix defining who Decides, who Recommends, who Consults, who Informs for major family decisions

**Note**: This is the LONGEST and most critical stage of workshop

#### ⏱️ Duration
40 minutes

#### 👥 Roles & Permissions

**Consultant (Facilitator):**
- Proposes decision categories and sample decisions
- Guides discussion on each decision
- Cannot vote on RACI assignments
- Can suggest industry best practices

**Family Council Members:**
- Full editing permissions
- Assign RACI roles for each decision
- Vote on disputed assignments
- Can add custom decision types

**Board Members / CEO:**
- Can propose Board-related decisions
- Vote on decisions affecting Board-Management interface
- Cannot vote on family-only decisions

**Observers:**
- Can raise hand to provide input
- Read-only view

---

#### 🎨 Wireframe Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│ Header: Decision Making & Conflict Resolution Workshop             │
│ Stage 4 of 10: Decision Rights Matrix (RACI) | ⏱️ 40:00 | 👥 8     │
├──────────────────────────┬──────────────────────────────────────────┤
│                          │                                          │
│  Facilitator Panel       │  Main Workspace: RACI Matrix Builder    │
│  (Left - 20%)            │  (Center - 60%)                          │
│                          │                                          │
│  📊 Progress:            │  ┌────────────────────────────────────┐ │
│  Decision Categories     │  │  Interactive RACI Matrix           │ │
│  ✅ Family Governance    │  │  ────────────────────────────────  │ │
│  ⏳ Business Strategy    │  │                                     │ │
│  [ ] Financial           │  │  Category: Family Governance       │ │
│  [ ] Employment          │  │  Decision 3 of 8                   │ │
│  [ ] Brand/Reputation    │  │                                     │ │
│                          │  │  Decision Type:                    │ │
│  ⏰ Time per category:   │  │  "Amend Family Constitution"       │ │
│  ~8 minutes              │  │                                     │ │
│                          │  │  [Edit Decision ✏️] [Delete 🗑️]    │ │
│  💡 RACI Key:            │  │                                     │ │
│  R = Responsible         │  │  ┌────────────────────────────┐   │ │
│      (Does the work)     │  │  │ Assign RACI Roles:         │   │ │
│  A = Accountable         │  │  │                             │   │ │
│      (Final decision)    │  │  │ Family Assembly    [A] [C]  │   │ │
│  C = Consulted           │  │  │ Family Council     [R] [I]  │   │ │
│      (Input sought)      │  │  │ Board of Directors [C] [ ]  │   │ │
│  I = Informed            │  │  │ Management         [I] [ ]  │   │ │
│      (Kept in loop)      │  │  │ Legal Advisor      [C] [ ]  │   │ │
│                          │  │  │                             │   │ │
│  ⚠️ RACI Rules:          │  │  │ Validation:                │   │ │
│  • Exactly 1 "A"         │  │  │ ✅ One Accountable (A)     │   │ │
│  • At least 1 "R"        │  │  │ ✅ At least one Responsible│   │ │
│  • C/I optional          │  │  │ ⚠️  Consider informing CEO │   │ │
│                          │  │  └────────────────────────────┘   │ │
│  📚 Quick Add:           │  │                                     │ │
│  [+ Add from Template]   │  │  💬 Discussion Notes:              │ │
│  • Strategic Planning    │  │  [Text area]                       │ │
│  • CEO Appointment       │  │  "Assembly must vote on any       │ │
│  • Dividend Policy       │  │   constitutional changes per      │ │
│  • M&A Decisions         │  │   charter. Family Council drafts  │ │
│  • Family Employment     │  │   proposals for Assembly review." │ │
│  • Brand Usage           │  │                                     │ │
│                          │  │  [💾 Save Decision] [⏭️ Next]      │ │
│                          │  └────────────────────────────────────┘ │
│                          │                                          │
│  [Export Matrix]         │  Full Matrix Preview (Collapsible):     │
│  [Load Template]         │  [Show/Hide Full Matrix ▼]             │
│                          │                                          │
├──────────────────────────┼──────────────────────────────────────────┤
│                          │  Participants Panel (Right - 20%)        │
│                          │                                          │
│                          │  👥 Active: 8                            │
│                          │                                          │
│                          │  🗳️ Active Vote:                        │
│                          │  "Who should be Accountable?"            │
│                          │  Family Assembly: 4 votes 👑             │
│                          │  Family Council: 2 votes                 │
│                          │  Board: 1 vote                           │
│                          │  ⏱️ 0:15 remaining                       │
│                          │                                          │
│                          │  💬 Chat:                                │
│                          │  John: "Assembly is too slow for day-  │
│                          │        to-day decisions"                 │
│                          │  Maria: "Agree - FC should be A"        │
│                          │  Sarah: "Board needs to be consulted"   │
│                          │                                          │
└──────────────────────────┴──────────────────────────────────────────┘
│ Footer: [< Previous Stage] [Complete RACI Matrix >] [💾 Saving...] │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### 📊 Decision Categories & Sample Decisions

Workshop covers **5 major categories** with **25-30 total decisions**:

**Category 1: Family Governance (8 decisions)**
1. Amend Family Constitution
2. Elect/remove Family Council members
3. Change Family Assembly meeting frequency
4. Approve Family Council committee structure
5. Adopt new family policies (employment, education, etc.)
6. Resolve Family Council member conflicts of interest
7. Change Family Assembly voting rules
8. Approve multi-year family strategic plan

**Category 2: Business Strategy & Operations (6 decisions)**
9. Approve annual business strategy
10. Approve/reject major M&A transactions (>$X threshold)
11. Approve annual budget
12. Appoint/remove CEO
13. Approve executive compensation packages
14. Change dividend distribution policy

**Category 3: Financial & Asset Management (5 decisions)**
15. Approve major capital expenditures (>$X threshold)
16. Approve new investment strategies
17. Sell/acquire major assets (real estate, businesses)
18. Approve borrowing/debt transactions
19. Change asset allocation strategy

**Category 4: Family Employment & Development (4 decisions)**
20. Approve family employment policy
21. Hire family members into business roles
22. Approve NextGen development programs
23. Fund family education initiatives

**Category 5: Brand, Reputation & Philanthropy (4 decisions)**
24. Approve use of family name/brand by members
25. Approve family philanthropy strategy
26. Approve major charitable commitments
27. Manage family reputation crisis

**Plus**: Ability to add **custom decisions** specific to family

---

#### 🎨 RACI Assignment Interface

**For Each Decision:**

**Top Section: Decision Card**
```
┌──────────────────────────────────────────┐
│ Decision #3: Amend Family Constitution   │
│ Category: Family Governance              │
│ Frequency: Rare (as needed)              │
│ Impact: Very High                        │
│                                           │
│ Description:                             │
│ "Any changes to the family constitution  │
│  document, including values, mission,    │
│  governance structure, or procedures"    │
│                                           │
│ [✏️ Edit] [🗑️ Delete] [💡 Best Practice] │
└──────────────────────────────────────────┘
```

**Middle Section: RACI Grid**

Table with governance bodies as rows, RACI roles as columns:

```
┌────────────────────┬───┬───┬───┬───┬──────────┐
│ Governance Body    │ R │ A │ C │ I │ Status   │
├────────────────────┼───┼───┼───┼───┼──────────┤
│ Family Assembly    │ [ ]│[●]│ [ ]│ [ ]│ Selected │
│ Family Council     │[●]│ [ ]│ [ ]│ [ ]│ Selected │
│ Board of Directors │ [ ]│ [ ]│[●]│ [ ]│ Selected │
│ Management Team    │ [ ]│ [ ]│ [ ]│[●]│ Selected │
│ Legal Counsel      │ [ ]│ [ ]│[●]│ [ ]│ Selected │
│ (Add Custom Role)  │ [ ]│ [ ]│ [ ]│ [ ]│ Add...   │
└────────────────────┴───┴───┴───┴───┴──────────┘

Validation: ✅ Passes RACI rules
```

**Radio button behavior:**
- Only ONE body can be "A" (Accountable) - enforced
- Multiple bodies can be "R" (Responsible)
- Multiple bodies can be "C" (Consulted)
- Multiple bodies can be "I" (Informed)
- If Family Council tries to select "A" when Assembly already has it:
  → Tooltip: "Only one body can be Accountable. Remove Assembly's 'A' first?"
  → Auto-suggest switch modal

**Best Practice Suggestions (AI-powered):**
```
💡 Common Pattern for Constitutional Changes:
   R: Family Council (drafts proposal)
   A: Family Assembly (final approval)
   C: Legal Counsel (ensures legality)
   I: All family members (transparency)
   
Apply this pattern? [Yes] [No, customize]
```

**Bottom Section: Discussion & Notes**
```
💬 Discussion Space (visible to all, editable by FC)
"Rationale: Assembly must approve constitutional changes 
 per founding charter. Family Council prepares proposals 
 and recommendations for Assembly review at semi-annual 
 meetings."

🗳️ If disputed, click [Call Vote] to poll Family Council
```

---

#### 🔄 Collaborative Mechanics

**Quick Assignment:**
- Facilitator can propose RACI assignments based on best practices
- Family Council members see proposal as "ghosted" checkboxes
- Click "Accept All" or modify individual assignments
- Real-time updates across all participants

**Voting on Disputed Decisions:**
```
When Family Council members disagree on RACI assignment:

1. Any FC member clicks "📊 Call Vote" button
2. Modal appears for all FC members:
   
   ┌─────────────────────────────────────┐
   │ Vote: Who should be ACCOUNTABLE?    │
   │                                      │
   │ ( ) Family Assembly                  │
   │ (•) Family Council                   │
   │ ( ) Board of Directors               │
   │ ( ) Other: ____________              │
   │                                      │
   │ Timer: ⏱️ 1:00 remaining             │
   │                                      │
   │ Current votes:                       │
   │ Family Assembly: ⬤⬤⬤                │
   │ Family Council: ⬤⬤                  │
   │                                      │
   │ [Submit Vote]                        │
   └─────────────────────────────────────┘

3. Simple majority wins
4. Result automatically applied to matrix
5. Logged in decision notes
```

**Template Loading:**
```
Facilitator can load industry templates:

┌─────────────────────────────────────────┐
│ 📚 Load RACI Template                   │
│                                          │
│ Templates available:                     │
│ ( ) Single Family Office Standard       │
│ ( ) Multi-Family Office Standard        │
│ ( ) Public Company Family Shareholders   │
│ ( ) Private Company with Board          │
│ ( ) Entrepreneur Family (No Board)      │
│                                          │
│ Preview shows 25 pre-filled decisions   │
│ with suggested RACI assignments         │
│                                          │
│ Note: You can customize after loading   │
│                                          │
│ [Preview] [Cancel] [Load Template]      │
└─────────────────────────────────────────┘

After loading, family reviews and adjusts each decision
```

**Bulk Operations:**
```
Select multiple decisions at once:

[x] Decision 9: Annual business strategy
[x] Decision 10: M&A transactions
[x] Decision 11: Annual budget

Bulk action: [Assign RACI Pattern ▼]
→ Applies same RACI roles to all selected
→ Saves time for similar decision types
```

---

#### 📈 Full Matrix View (Collapsible Panel)

**Heat Map Visualization:**

```
┌────────────────────────────────────────────────────────────┐
│  Complete RACI Matrix - Heat Map View                     │
│                                                             │
│                 Family  Family  Board   Mgmt   Legal       │
│                 Assembly Council  Dir.  Team   Counsel     │
│ ────────────────────────────────────────────────────────── │
│ Amend Constit.    🟢A    🔵R    🟡C     ⚪I    🟡C         │
│ Elect FC          🟢A    🟡C    ⚪I     ⚪I    ⚪         │
│ Business Strategy ⚪I    🟡C    🟢A     🔵R    ⚪         │
│ CEO Appointment   ⚪I    🟡C    🟢A     ⚪I    🟡C         │
│ M&A Decisions     🟡C    🟡C    🟢A     🔵R    🟡C         │
│ Dividend Policy   🟢A    🔵R    🟡C     🟡C    🟡C         │
│ Family Employ.    ⚪I    🟢A    🟡C     🔵R    ⚪         │
│ Brand Usage       ⚪I    🟢A    🟡C     🟡C    🟡C         │
│ Philanthropy      🟡C    🟢A    ⚪I     ⚪I    ⚪         │
│ ...               ...    ...    ...     ...    ...         │
│                                                             │
│ Legend:                                                     │
│ 🟢 Accountable (A)  🔵 Responsible (R)                    │
│ 🟡 Consulted (C)    ⚪ Informed (I)                        │
│                                                             │
│ Analysis:                                                   │
│ • Family Assembly: 6 Accountable roles (high authority)   │
│ • Family Council: 8 Accountable roles (operational)       │
│ • Board: 10 Accountable roles (business focus)            │
│ • Management: 0 Accountable roles (execution only)        │
│                                                             │
│ ⚠️ Recommendations:                                        │
│ • Management has no final authority - is this intended?   │
│ • Family Council and Board overlap on M&A - clarify       │
│                                                             │
│ [Export to Excel] [Export to PDF] [Copy to Clipboard]     │
└────────────────────────────────────────────────────────────┘
```

**Sortable and filterable:**
- Sort by decision category
- Filter by governance body
- Highlight conflicts (multiple "A" assignments)
- Show gaps (no "A" or "R" assigned)

---

#### 💾 Data Collected

**Stage 4 Output:**
```json
{
  "stage_4": {
    "raci_matrix": {
      "decisions": [
        {
          "decision_id": "uuid",
          "category": "family_governance",
          "title": "Amend Family Constitution",
          "description": "Any changes to family constitution document",
          "frequency": "rare",
          "impact": "very_high",
          "raci_assignments": {
            "family_assembly": "A",
            "family_council": "R",
            "board_of_directors": "C",
            "management": "I",
            "legal_counsel": "C"
          },
          "discussion_notes": "Assembly must approve per charter. FC drafts proposals.",
          "vote_history": [
            {
              "timestamp": "2025-10-29T15:23:00Z",
              "question": "Who should be Accountable?",
              "results": {
                "family_assembly": 4,
                "family_council": 2
              },
              "winner": "family_assembly"
            }
          ]
        },
        // ... 25-30 more decisions
      ],
      "matrix_snapshot": "base64_encoded_heatmap_image",
      "analysis": {
        "accountability_distribution": {
          "family_assembly": 6,
          "family_council": 8,
          "board_of_directors": 10,
          "management": 0
        },
        "conflicts": [
          "Decision 12 and 15 both have Board + FC as Accountable - resolve?"
        ],
        "gaps": [
          "No clear owner for 'Family member reputation crisis' - add decision?"
        ]
      }
    },
    "completion_time": "42 minutes" // Actual time taken
  }
}
```

**Stored in:**
- Decision Making Service (port 8009) → decision_rights_matrix table
- Constitution Service (port 8002) → governance_policies (linked)

**Automatic Integration:**
- All decisions with RACI assignments → available in Decision Making module
- When family creates new decision proposal → system suggests Accountable body
- When decision requires approval → routes to correct governance body automatically

---

#### ⏭️ Transition

**"Complete RACI Matrix" button:**

**Validation checks:**
1. ✅ All decisions have exactly 1 "A" assignment?
2. ✅ All decisions have at least 1 "R" assignment?
3. ⚠️  Conflicts detected? (Show list)
4. ⚠️  Gaps detected? (Show list)

**If validation fails:**
```
⚠️ RACI Matrix Incomplete

Issues found:
• 3 decisions missing Accountable (A) role
• 2 decisions have multiple Accountable roles
• 5 decisions have no Responsible (R) role

[Review Issues] [Continue Anyway] [Cancel]

Recommendation: Fix critical issues before proceeding
```

**If validation passes or user continues:**
- Saves complete RACI matrix
- Generates heat map visualization
- Auto-transition to Screen 5
- Sends matrix to Decision Making Service for integration
- Transition logged

**Post-Stage Actions:**
- RACI matrix immediately available in Decision Making module
- Family Council members notified: "Your decision rights matrix is now active"
- All family members can view matrix in Constitution section

---

### Screen 5: Meeting Frequency & Calendar (20 minutes)

#### 🎯 Goal
Define meeting cadence for all governance bodies and create annual governance calendar

#### ⏱️ Duration
20 minutes

#### 👥 Roles & Permissions

**Consultant (Facilitator):**
- Provides best practice recommendations
- Guides calendar building process
- Cannot vote on meeting schedules

**Family Council Members:**
- Full editing permissions
- Set meeting frequencies
- Approve calendar

**Board Members / CEO:**
- Input on Board meeting schedule
- Must align with family meeting calendar
- Vote on joint meeting schedules

**Observers:**
- Read-only view

---

#### 🎨 Wireframe Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│ Header: Decision Making & Conflict Resolution Workshop             │
│ Stage 5 of 10: Meeting Frequency & Calendar | ⏱️ 20:00 | 👥 8      │
├──────────────────────────┬──────────────────────────────────────────┤
│                          │                                          │
│  Facilitator Panel       │  Main Workspace: Governance Calendar     │
│  (Left - 20%)            │  (Center - 60%)                          │
│                          │                                          │
│  📊 Calendar Setup:      │  ┌────────────────────────────────────┐ │
│                          │  │  Step 1: Set Meeting Frequencies   │ │
│  Bodies to Schedule:     │  │  ────────────────────────────────  │ │
│  ✅ Family Assembly      │  │                                     │ │
│  ✅ Family Council       │  │  Governance Body: Family Assembly  │ │
│  ⏳ Board of Directors   │  │                                     │ │
│  [ ] FC Committees       │  │  Meeting Frequency:                │ │
│  [ ] Joint Sessions      │  │  ( ) Annually (1x/year)            │ │
│                          │  │  (•) Semi-annually (2x/year)       │ │
│  ⏰ Time per body:       │  │  ( ) Quarterly (4x/year)           │ │
│  ~4 minutes              │  │  ( ) Monthly (12x/year)            │ │
│                          │  │  ( ) Custom: [_____]               │ │
│  💡 Best Practices:      │  │                                     │ │
│                          │  │  📅 Preferred Months:              │ │
│  Family Assembly:        │  │  [x] January    [ ] July           │ │
│  • 1-2x/year             │  │  [ ] February   [x] August         │ │
│  • Spring & Fall         │  │  [ ] March      [ ] September      │ │
│                          │  │  [ ] April      [ ] October        │ │
│  Family Council:         │  │  [ ] May        [ ] November       │ │
│  • Quarterly minimum     │  │  [x] June       [ ] December       │ │
│  • Before Assembly       │  │                                     │ │
│                          │  │  💡 Recommendation:                │ │
│  Board:                  │  │  Schedule 2 weeks before Board     │ │
│  • Quarterly minimum     │  │  quarterly meetings                │ │
│  • Avoid family dates    │  │                                     │ │
│                          │  │  Duration per meeting:             │ │
│  🗓️ Coordination:       │  │  [4] hours (half-day)              │ │
│                          │  │                                     │ │
│  Q1: Jan-Mar            │  │  Location preference:              │ │
│  Q2: Apr-Jun            │  │  ( ) In-person only                │ │
│  Q3: Jul-Sep            │  │  (•) Hybrid (in-person + remote)   │ │
│  Q4: Oct-Dec            │  │  ( ) Remote only                   │ │
│                          │  │                                     │ │
│  [Show Calendar View]    │  │  [💾 Save] [⏭️ Next Body]          │ │
│                          │  └────────────────────────────────────┘ │
│                          │                                          │
├──────────────────────────┼──────────────────────────────────────────┤
│                          │  Participants Panel (Right - 20%)        │
│                          │                                          │
│                          │  💬 Chat:                                │
│                          │  Maria: "June works - no school"         │
│                          │  John: "Avoid August - vacations"        │
│                          │  David: "Align with Board Q2 meeting"    │
│                          │                                          │
└──────────────────────────┴──────────────────────────────────────────┘
│ Footer: [< Previous] [Generate Calendar] [💾 Auto-saving...]       │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### 📊 Meeting Frequency Setup (Per Body)

**For Each Governance Body:**

**Form Fields:**

1. **Meeting Frequency** (Radio buttons)
   - Annually (1x/year)
   - Semi-annually (2x/year)
   - Quarterly (4x/year)
   - Bi-monthly (6x/year)
   - Monthly (12x/year)
   - Custom schedule

2. **Preferred Timing**
   - Month preferences (multi-select checkboxes)
   - Time of year (Spring, Summer, Fall, Winter)
   - Avoid holidays toggle

3. **Meeting Duration**
   - Slider: 1-8 hours
   - Half-day vs. Full-day
   - Multi-day option for Assembly

4. **Location Preference**
   - In-person only
   - Remote only
   - Hybrid (default)

5. **Coordination Rules**
   - Schedule before/after other bodies
   - Example: "Family Council meets 2 weeks before Family Assembly"
   - Buffer days between meetings

---

#### 🗓️ Annual Calendar Builder

**After setting frequencies, transition to calendar view:**

```
┌─────────────────────────────────────────────────────────────────────┐
│  Step 2: Build Annual Governance Calendar (2025)                   │
│  ────────────────────────────────────────────────────────────────  │
│                                                                      │
│  📅 Calendar View (Drag & Drop)                                    │
│                                                                      │
│  Q1: January - March 2025                                           │
│  ┌────────┬────────┬────────┬────────┬────────┬────────┬────────┐ │
│  │ Jan    │ Feb    │ Mar    │ Apr    │ May    │ Jun    │ Notes  │ │
│  ├────────┼────────┼────────┼────────┼────────┼────────┼────────┤ │
│  │ ðŸ"´FC1  │        │        │ ðŸ"´FC2  │        │ ðŸ"´FC3  │ FC:    │ │
│  │ 15th   │        │        │ 10th   │        │ 12th   │ Quart. │ │
│  │        │        │ 🟢FA1  │        │        │ ðŸ'™BD2  │        │ │
│  │        │        │ 28th   │        │        │ 20th   │ Board  │ │
│  │        │        │        │        │        │        │ after  │ │
│  │        │        │        │        │        │        │ FC     │ │
│  └────────┴────────┴────────┴────────┴────────┴────────┴────────┘ │
│                                                                      │
│  Q2: April - June 2025                                              │
│  [Similar grid...]                                                  │
│                                                                      │
│  Q3: July - September 2025                                          │
│  [Similar grid...]                                                  │
│                                                                      │
│  Q4: October - December 2025                                        │
│  [Similar grid...]                                                  │
│                                                                      │
│  Legend:                                                            │
│  ðŸ"´ Family Council (FC)  🟢 Family Assembly (FA)                  │
│  ðŸ'™ Board of Directors   🟡 Joint Session                          │
│  🟣 FC Committee          ⚪ Other                                  │
│                                                                      │
│  Validation:                                                        │
│  ✅ Family Council: 4 meetings scheduled                           │
│  ✅ Family Assembly: 2 meetings scheduled                          │
│  ✅ Board: 4 meetings scheduled                                    │
│  ✅ Joint Sessions: 2 scheduled                                    │
│  ⚠️  Warning: FC3 only 2 weeks before FA1 - tight timeline         │
│                                                                      │
│  [Auto-Schedule] [Clear All] [Export Calendar] [💾 Save]           │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### 📋 Meeting Types to Schedule

**1. Family Assembly Meetings**
- Based on frequency set in previous step
- Typical: 2x/year (Spring + Fall)

**2. Family Council Meetings**
- Based on frequency (typically quarterly)
- Schedule BEFORE Family Assembly (preparation time)

**3. Board of Directors Meetings**
- Align with business reporting cycles
- Coordination with Family Council

**4. Family Council Committees**
- NextGen Committee
- Philanthropy Committee
- Education Committee
- Asset Committee
- Ad-hoc as needed

**5. Joint Sessions** (Family Council + Board)
- 2x/year recommended
- Strategic alignment meetings
- Expectation setting

**6. Special Events**
- Annual Q&A with CEO
- Family education workshops
- Family retreats

---

#### 🔄 Collaborative Mechanics

**Drag-and-Drop Calendar:**
- Facilitator or Family Council can drag meeting cards to calendar
- Meetings snap to weeks
- Hover shows details (date, time, location, duration)
- Color-coded by meeting type
- Conflicts highlighted (e.g., two meetings same day)

**Auto-Schedule Feature:**
```
Smart scheduling algorithm:

1. Takes frequencies for all bodies
2. Applies coordination rules (FC before FA, etc.)
3. Avoids holidays and typical vacation periods
4. Distributes meetings evenly across quarters
5. Minimizes date conflicts

Click [Auto-Schedule] → generates suggested calendar
Family Council reviews and adjusts manually
```

**Conflict Detection:**
```
⚠️ Date Conflict Detected

Family Council Meeting 3: June 12, 2025
Board Meeting 2: June 12, 2025

Both scheduled for same day. Reschedule one?

[Keep Both (different times)]
[Move FC to June 5]
[Move Board to June 19]
[Choose Manually]
```

**Meeting Details Panel:**
```
Click any meeting card to edit:

┌─────────────────────────────────────┐
│ Family Council Meeting Q2           │
│ ─────────────────────────────────── │
│ Date: June 12, 2025                 │
│ Time: 2:00 PM - 6:00 PM             │
│ Duration: 4 hours                   │
│ Location: Hybrid                    │
│   • In-person: Family Office        │
│   • Remote: Zoom link               │
│                                      │
│ Standard Agenda Items:              │
│ [x] Review Q1 actions               │
│ [x] Prepare FA meeting materials    │
│ [x] Committee updates               │
│ [x] Decision proposals review       │
│ [ ] Custom: ____________            │
│                                      │
│ Invitees: (Auto from Stage 3)       │
│ ✅ All 5 FC members                 │
│ ✅ Secretary (if applicable)        │
│ [ ] External consultant             │
│                                      │
│ [💾 Save Changes] [🗑️ Delete]       │
└─────────────────────────────────────┘
```

---

#### 💾 Data Collected

**Stage 5 Output:**
```json
{
  "stage_5": {
    "meeting_frequencies": {
      "family_assembly": {
        "frequency": "semi_annual",
        "count_per_year": 2,
        "preferred_months": ["March", "September"],
        "duration_hours": 8,
        "location": "hybrid"
      },
      "family_council": {
        "frequency": "quarterly",
        "count_per_year": 4,
        "preferred_months": ["January", "April", "July", "October"],
        "duration_hours": 4,
        "location": "hybrid",
        "coordination_rule": "2_weeks_before_family_assembly"
      },
      "board_of_directors": {...},
      "fc_committees": {...}
    },
    "annual_calendar": [
      {
        "meeting_id": "uuid",
        "meeting_type": "family_council",
        "date": "2025-01-15",
        "time_start": "14:00",
        "time_end": "18:00",
        "location": "hybrid",
        "invitees": ["user_id_1", "user_id_2", ...],
        "standard_agenda": ["review_actions", "prepare_fa", "committees", "decisions"]
      },
      // ... all meetings for year
    ],
    "calendar_snapshot": "base64_encoded_calendar_image",
    "statistics": {
      "total_meetings": 18,
      "family_assembly": 2,
      "family_council": 4,
      "board": 4,
      "committees": 6,
      "joint_sessions": 2
    }
  }
}
```

**Stored in:**
- Meeting Service (port 8003) → governance_calendar table
- All meetings auto-created as recurring events
- Invitations sent to participants

**Automatic Integration:**
- Calendar synced to Meeting Service immediately
- All Family Council members receive calendar invites
- Recurring meeting series created
- Agenda templates prepared for each meeting type

---

#### ⏭️ Transition

**"Complete Calendar" button:**

**Validation:**
1. ✅ All required meeting types scheduled?
2. ✅ Minimum frequency met for each body?
3. ⚠️  Any conflicts remaining?
4. ⚠️  Gaps between Family Council and Assembly meetings?

**If validation passes:**
- Saves annual governance calendar
- Creates recurring meeting series in Meeting Service
- Sends calendar invites to all participants
- Auto-transition to Screen 6
- Transition logged

**Export Options:**
- Download as iCal file (import to Outlook/Google Calendar)
- Export as PDF (print)
- Share link (view-only calendar page)

---

### Screen 6: Family Council Elections (30 minutes)

#### 🎯 Goal
Define Family Council election procedures, term limits, composition rules, and committee structure

#### ⏱️ Duration
30 minutes

#### 👥 Roles & Permissions

**Consultant (Facilitator):**
- Provides election best practices
- Guides through charter building
- Cannot vote on family-specific rules

**Family Council Members:**
- Full editing permissions
- Define election procedures
- Vote on composition rules

**Board Members / CEO:**
- Observer role
- No voting rights (family internal matter)

**Observers:**
- Read-only view

---

#### 🎨 Wireframe Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│ Header: Decision Making & Conflict Resolution Workshop             │
│ Stage 6 of 10: Family Council Elections | ⏱️ 30:00 | 👥 8          │
├──────────────────────────┬──────────────────────────────────────────┤
│                          │                                          │
│  Facilitator Panel       │  Main Workspace: FC Charter Builder     │
│  (Left - 20%)            │  (Center - 60%)                          │
│                          │                                          │
│  📊 Charter Sections:    │  ┌────────────────────────────────────┐ │
│  ✅ Eligibility          │  │  Family Council Charter            │ │
│  ⏳ Composition          │  │  Section 1 of 7: Eligibility       │ │
│  [ ] Term Length         │  │  ────────────────────────────────  │ │
│  [ ] Election Process    │  │                                     │ │
│  [ ] Committees          │  │  Who can be elected to FC?         │ │
│  [ ] Removal             │  │                                     │ │
│  [ ] Conflict of Int.    │  │  Basic Requirements:               │ │
│                          │  │  [x] Adult family members (18+)    │ │
│  ⏰ Per section: ~4min   │  │  [x] Shareholders only             │ │
│                          │  │  [ ] Include spouses               │ │
│  💡 Best Practices:      │  │  [ ] NextGen members (under 30)    │ │
│                          │  │                                     │ │
│  Eligibility:            │  │  Additional Criteria:              │ │
│  • Age 21+ common        │  │  Minimum age: [21] years           │ │
│  • Shareholders pref.    │  │  Residency: [No requirement ▼]     │ │
│  • Consider NextGen      │  │  Work in family business:          │ │
│    seats                 │  │  ( ) Required                      │ │
│                          │  │  (•) Not required                  │ │
│  Composition:            │  │  ( ) Disqualifying factor          │ │
│  • 3-7 members ideal     │  │                                     │ │
│  • Balance generations   │  │  Professional experience:          │ │
│  • Balance branches      │  │  Minimum years: [5] (any field)    │ │
│                          │  │                                     │ │
│  Term Length:            │  │  Disqualifying Factors:            │ │
│  • 2-3 years typical     │  │  [x] Bankruptcy                    │ │
│  • Staggered rotation    │  │  [x] Criminal conviction           │ │
│  • Term limits: 2-3      │  │  [x] Serious family conflict       │ │
│                          │  │  [ ] Divorce from family member    │ │
│  📚 Template Library:    │  │  [ ] Custom: ________________      │ │
│  [Load Template ▼]       │  │                                     │ │
│  • Traditional           │  │  💡 Estimated eligible members:    │ │
│  • Progressive           │  │  Based on Stage 2 data: 12 people  │ │
│  • NextGen Inclusive     │  │                                     │ │
│                          │  │  [💾 Save] [⏭️ Next Section]       │ │
│  [Show Full Charter]     │  └────────────────────────────────────┘ │
│                          │                                          │
├──────────────────────────┼──────────────────────────────────────────┤
│                          │  Participants Panel (Right - 20%)        │
│                          │                                          │
│                          │  💬 Chat:                                │
│                          │  Maria: "Should we require business     │
│                          │         experience?"                     │
│                          │  John: "No - limits NextGen"             │
│                          │  Emma: "Agree - age is enough"           │
│                          │                                          │
│                          │  🗳️ No active votes                     │
│                          │                                          │
└──────────────────────────┴──────────────────────────────────────────┘
│ Footer: [< Previous] [Complete Charter] [💾 Auto-saving...]        │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### 📋 Family Council Charter - 7 Sections

---

**Section 1: Eligibility Requirements**

**Who can be elected to Family Council?**

Fields:
- Basic eligibility criteria (checkboxes)
  - Adult family members
  - Shareholders
  - Spouses
  - NextGen members
- Minimum age (slider 18-30)
- Residency requirements (dropdown)
- Work status requirements
- Professional experience minimum
- Disqualifying factors (checkboxes + custom)

Estimated eligible members shown in real-time based on Stage 2 data

---

**Section 2: Council Composition**

```
┌────────────────────────────────────────────────┐
│ Family Council Size & Composition              │
│ ─────────────────────────────────────────────  │
│                                                 │
│ Council Size:                                   │
│ Minimum: [3] members                            │
│ Maximum: [7] members                            │
│ Target: [5] members (recommended)               │
│                                                 │
│ Representation Requirements:                    │
│                                                 │
│ By Generation:                                  │
│ [x] At least 1 from Gen 2 (founders)            │
│ [x] At least 2 from Gen 3 (next gen)            │
│ [ ] At least 1 from Gen 4 (if applicable)       │
│                                                 │
│ By Family Branch:                               │
│ [x] Each branch gets 1 seat minimum             │
│ [ ] Proportional to branch ownership            │
│ [ ] No branch requirements                      │
│                                                 │
│ By Role/Expertise:                              │
│ [ ] At least 1 with business background         │
│ [ ] At least 1 with nonprofit experience        │
│ [ ] At least 1 NextGen representative           │
│ [ ] No role requirements                        │
│                                                 │
│ Gender/Diversity:                               │
│ [ ] Strive for gender balance                   │
│ [ ] No specific requirements                    │
│                                                 │
│ Reserved Seats:                                 │
│ [ ] 1 seat reserved for NextGen (under 35)      │
│ [ ] 1 seat reserved for founder generation      │
│ [ ] No reserved seats                           │
│                                                 │
│ Current FC members: 5                           │
│ Meets composition rules: ✅ Yes                │
│                                                 │
│ [💾 Save] [⏭️ Next Section]                     │
└────────────────────────────────────────────────┘
```

**Visual Composition Preview:**
```
Current Family Council:
┌─────────┬─────────┬─────────┬─────────┬─────────┐
│ Maria   │ John    │ Sarah   │ Michael │ Lisa    │
│ Gen 2   │ Gen 2   │ Gen 3   │ Gen 3   │ Gen 3   │
│ Branch A│ Branch A│ Branch B│ Branch B│ Branch C│
│ Founder │ Business│ NextGen │ Nonprofit│ Legal  │
└─────────┴─────────┴─────────┴─────────┴─────────┘

Composition validation:
✅ Min 3, Max 7: 5 members (within range)
✅ Gen 2: 2 members (requirement: 1+)
✅ Gen 3: 3 members (requirement: 2+)
✅ Branch A: 2, Branch B: 2, Branch C: 1 (all represented)
✅ NextGen: 1 member (Sarah, age 28)
```

---

**Section 3: Term Length & Rotation**

```
┌────────────────────────────────────────────────┐
│ Term Length & Rotation Rules                   │
│ ─────────────────────────────────────────────  │
│                                                 │
│ Term Duration:                                  │
│ ( ) 1 year                                      │
│ (•) 2 years (recommended)                       │
│ ( ) 3 years                                     │
│ ( ) Custom: [___] years                         │
│                                                 │
│ Term Limits:                                    │
│ Consecutive terms allowed: [2] maximum          │
│ Total lifetime terms: [No limit ▼]              │
│ Cool-off period after max: [1] year             │
│                                                 │
│ Rotation Schedule:                              │
│ (•) Staggered (half council rotates each cycle)│
│ ( ) All at once (full election every term)      │
│ ( ) Custom rotation pattern                     │
│                                                 │
│ If Staggered:                                   │
│ Year 1: [3] seats up for election               │
│ Year 2: [2] seats up for election               │
│ (Alternates each cycle)                         │
│                                                 │
│ Re-election:                                    │
│ [x] Members can run for re-election             │
│ [x] Requires new nomination (not automatic)     │
│ [ ] Requires family re-confirmation             │
│                                                 │
│ Example Timeline:                               │
│ 2025: Maria, John, Sarah elected (first cycle)  │
│ 2026: Michael, Lisa elected (completes council) │
│ 2027: Maria, John, Sarah terms end (3 open)     │
│       → Can run again if nominated              │
│ 2028: Michael, Lisa terms end (2 open)          │
│                                                 │
│ [💾 Save] [⏭️ Next Section]                     │
└────────────────────────────────────────────────┘
```

---

**Section 4: Election Process**

```
┌────────────────────────────────────────────────┐
│ Election Process & Procedures                  │
│ ─────────────────────────────────────────────  │
│                                                 │
│ Nomination Process:                             │
│ Who can nominate FC candidates?                 │
│ [x] Self-nomination allowed                     │
│ [x] Any family member can nominate              │
│ [ ] Only current FC can nominate                │
│ [ ] Nominations committee                       │
│                                                 │
│ Nomination requirements:                        │
│ [ ] Statement of interest (max 500 words)       │
│ [x] Endorsement from [2] family members         │
│ [x] Acceptance of fiduciary duty                │
│ [ ] Interview with nominations committee        │
│                                                 │
│ Voting Method:                                  │
│ ( ) Simple plurality (most votes wins)          │
│ (•) Majority required (50%+ of votes)           │
│ ( ) Single Transferable Vote (STV)              │
│ ( ) Approval voting (vote for multiple)         │
│ ( ) Cumulative voting (distribute points)       │
│                                                 │
│ Voting Rights:                                  │
│ Who can vote in FC elections?                   │
│ [x] All Family Assembly members                 │
│ [ ] Shareholders only                           │
│ [ ] Weighted by ownership percentage            │
│ [ ] One vote per branch                         │
│                                                 │
│ Voting Format:                                  │
│ (•) Secret ballot (anonymous)                   │
│ ( ) Open ballot (public)                        │
│ ( ) Mixed (open nomination, secret final)       │
│                                                 │
│ Quorum for Election:                            │
│ [66]% of eligible voters must participate       │
│                                                 │
│ Election Timeline:                              │
│ Nominations open: [60] days before term end     │
│ Nominations close: [30] days before term end    │
│ Voting period: [14] days                        │
│ Results announced: [7] days before term start   │
│                                                 │
│ Platform Integration:                           │
│ ✅ Nomination submissions via platform          │
│ ✅ Candidate profiles visible to all            │
│ ✅ Online voting with verification              │
│ ✅ Automatic result calculation                 │
│ ✅ Term start notifications                     │
│                                                 │
│ [💾 Save] [⏭️ Next Section]                     │
└────────────────────────────────────────────────┘
```

---

**Section 5: Family Council Committees**

```
┌────────────────────────────────────────────────┐
│ Family Council Committee Structure             │
│ ─────────────────────────────────────────────  │
│                                                 │
│ Standing Committees (Always active):            │
│                                                 │
│ [x] NextGen Development Committee               │
│     Purpose: Support next generation prep       │
│     Members: [2-3] FC members + [2] NextGen     │
│     Chair: Rotating among FC members            │
│     Meetings: [Quarterly ▼]                     │
│                                                 │
│ [x] Philanthropy Committee                      │
│     Purpose: Family charitable giving           │
│     Members: [2-3] FC members + [1] external    │
│     Chair: [Appointed by FC ▼]                  │
│     Meetings: [Quarterly ▼]                     │
│                                                 │
│ [x] Education & Development Committee           │
│     Purpose: Family learning programs           │
│     Members: [2-3] FC members                   │
│     Chair: [Rotating ▼]                         │
│     Meetings: [Bi-annually ▼]                   │
│                                                 │
│ [ ] Asset Management Committee                  │
│     Purpose: Oversee family assets              │
│     Members: [___] FC members + [___] experts   │
│     Chair: [_________]                          │
│     Meetings: [_________]                       │
│                                                 │
│ [ ] Custom Committee: [________________]        │
│                                                 │
│ Ad-Hoc Committees:                              │
│ [x] FC can create temporary committees          │
│     Max duration: [12] months                   │
│     Requires: [Simple majority ▼] FC vote       │
│                                                 │
│ Committee Governance:                           │
│ [x] All committees report to full FC            │
│ [x] Minutes required for all meetings           │
│ [x] Budget approval needed from FC              │
│ [ ] Committee decisions binding (vs advisory)   │
│                                                 │
│ Participation:                                  │
│ Non-FC family members can:                      │
│ [x] Serve on committees                         │
│ [x] Attend committee meetings as observers      │
│ [ ] Vote on committee recommendations           │
│                                                 │
│ [Add Another Committee]                         │
│ [💾 Save] [⏭️ Next Section]                     │
└────────────────────────────────────────────────┘
```

---

**Section 6: Removal & Vacancy Procedures**

```
┌────────────────────────────────────────────────┐
│ Removal, Resignation & Vacancy Procedures      │
│ ─────────────────────────────────────────────  │
│                                                 │
│ Voluntary Resignation:                          │
│ FC member can resign:                           │
│ [x] At any time with written notice             │
│ Notice period: [30] days minimum                │
│ [ ] Must complete current term                  │
│                                                 │
│ Involuntary Removal:                            │
│ FC member can be removed for:                   │
│ [x] Non-attendance (missed [3] meetings)        │
│ [x] Conflict of interest violations             │
│ [x] Breach of confidentiality                   │
│ [x] Criminal conviction                         │
│ [x] Conduct harmful to family                   │
│ [ ] Custom grounds: [________________]          │
│                                                 │
│ Removal Process:                                │
│ Who can initiate removal?                       │
│ [x] Any [3] family members petition             │
│ [x] Any [2] FC members vote                     │
│ [ ] Family Assembly vote only                   │
│                                                 │
│ Removal vote required:                          │
│ ( ) Simple majority of Family Assembly          │
│ (•) Super majority (66%) of Family Assembly     │
│ ( ) Unanimous FC vote                           │
│                                                 │
│ Due process:                                    │
│ [x] Member receives written notice of grounds   │
│ [x] Member can present defense                  │
│ [x] Independent mediator reviews case           │
│ [x] Final vote by Family Assembly               │
│                                                 │
│ Vacancy Filling:                                │
│ When FC seat becomes vacant:                    │
│ (•) Special election within [60] days           │
│ ( ) FC appoints interim member                  │
│ ( ) Seat remains empty until next election      │
│                                                 │
│ Interim appointment:                            │
│ [ ] Can serve remainder of term                 │
│ [x] Serves until next regular election          │
│ Term counts toward lifetime limit:              │
│ ( ) Yes  (•) No  ( ) Partial count              │
│                                                 │
│ [💾 Save] [⏭️ Next Section]                     │
└────────────────────────────────────────────────┘
```

---

**Section 7: Conflict of Interest & Fiduciary Duty**

```
┌────────────────────────────────────────────────┐
│ Conflict of Interest & Fiduciary Duty         │
│ ─────────────────────────────────────────────  │
│                                                 │
│ Fiduciary Duty:                                 │
│ All FC members agree to:                        │
│ [x] Act in best interest of entire family       │
│ [x] Duty of loyalty to family as whole          │
│ [x] Duty of care (informed decisions)           │
│ [x] Duty of confidentiality                     │
│ [x] Duty of impartiality (no favoritism)        │
│                                                 │
│ Conflict of Interest Disclosure:                │
│ FC members must disclose:                       │
│ [x] Business transactions with family entities  │
│ [x] Personal financial interests                │
│ [x] Outside board positions                     │
│ [x] Relationships with vendors/advisors         │
│ [x] Family disputes or litigation               │
│                                                 │
│ Disclosure Frequency:                           │
│ (•) Annual declaration (at year start)          │
│ ( ) Per-meeting declaration                     │
│ [x] Ad-hoc when conflict arises                 │
│                                                 │
│ Conflict Management:                            │
│ When conflict identified:                       │
│ Step 1: [x] Member discloses to full FC         │
│ Step 2: [x] FC discusses and documents          │
│ Step 3: (•) Member recuses from vote            │
│         ( ) Member can vote with disclosure     │
│         ( ) Member removed from discussion      │
│                                                 │
│ Serious conflicts (material):                   │
│ [ ] Requires Family Assembly approval           │
│ [x] Member temporarily steps down               │
│ [ ] Member permanently removed                  │
│                                                 │
│ Records & Transparency:                         │
│ [x] All conflicts logged in register            │
│ [x] Annual report to Family Assembly            │
│ [x] Visible to all family members               │
│ [ ] Confidential (FC only)                      │
│                                                 │
│ Training:                                       │
│ New FC members receive:                         │
│ [x] Fiduciary duty training (2 hours)           │
│ [x] Conflict of interest policy review          │
│ [x] Family governance orientation               │
│ [ ] External governance certification           │
│                                                 │
│ [💾 Save] [Complete Charter]                   │
└────────────────────────────────────────────────┘
```

---

#### 💾 Data Collected

**Stage 6 Output:**
```json
{
  "stage_6": {
    "family_council_charter": {
      "eligibility": {
        "minimum_age": 21,
        "shareholders_only": true,
        "include_spouses": false,
        "professional_experience_years": 5,
        "disqualifying_factors": ["bankruptcy", "criminal_conviction", "serious_conflict"],
        "estimated_eligible_count": 12
      },
      "composition": {
        "size_minimum": 3,
        "size_maximum": 7,
        "size_target": 5,
        "generation_requirements": {
          "gen_2_minimum": 1,
          "gen_3_minimum": 2
        },
        "branch_requirements": "one_per_branch_minimum",
        "reserved_seats": ["nextgen_under_35"]
      },
      "term": {
        "duration_years": 2,
        "consecutive_terms_max": 2,
        "cooloff_period_years": 1,
        "rotation_schedule": "staggered",
        "reelection_allowed": true
      },
      "election_process": {
        "nomination_open_to": ["self", "any_family_member"],
        "nomination_requirements": ["endorsements_2", "fiduciary_acceptance"],
        "voting_method": "majority_required",
        "voting_rights": "all_family_assembly",
        "voting_format": "secret_ballot",
        "quorum_percentage": 66,
        "timeline_days": {
          "nominations_open": 60,
          "nominations_close": 30,
          "voting_period": 14,
          "results_announcement": 7
        }
      },
      "committees": [
        {
          "name": "NextGen Development",
          "purpose": "Support next generation preparation",
          "type": "standing",
          "members_fc": 2,
          "members_other": 2,
          "chair_selection": "rotating",
          "meeting_frequency": "quarterly"
        },
        {
          "name": "Philanthropy",
          "purpose": "Family charitable giving",
          "type": "standing",
          "members_fc": 3,
          "members_external": 1,
          "chair_selection": "appointed_by_fc",
          "meeting_frequency": "quarterly"
        }
      ],
      "removal_procedures": {
        "voluntary_resignation": {
          "allowed": true,
          "notice_days": 30
        },
        "involuntary_removal": {
          "grounds": ["non_attendance_3", "conflict_violation", "confidentiality_breach"],
          "initiation": "3_family_members_or_2_fc",
          "vote_required": "supermajority_66",
          "due_process": true
        },
        "vacancy_filling": "special_election_60_days"
      },
      "conflict_of_interest": {
        "disclosure_required": ["business_transactions", "financial_interests", "outside_boards"],
        "disclosure_frequency": ["annual", "ad_hoc"],
        "conflict_management": "recuse_from_vote",
        "transparency": "visible_to_all_family",
        "training_required": true
      }
    },
    "charter_document": "base64_encoded_pdf" // Formatted charter for signatures
  }
}
```

**Stored in:**
- Constitution Service (port 8002) → family_council_charter table
- Auth Service (port 8001) → Integrated with role management

---

#### 🔄 Collaborative Mechanics

**Real-time Form Editing:**
- Multiple Family Council members can edit different sections
- Changes synced in real-time
- Version history maintained

**Section-by-Section Voting:**
```
If family members disagree on any section:

1. Click [📊 Vote on Section] button
2. Modal shows current proposals:
   
   ┌─────────────────────────────────────┐
   │ Vote: Term Length                   │
   │                                      │
   │ Proposal A: 2 years (Maria)          │
   │ Votes: ⬤⬤⬤⬤ (4)                     │
   │                                      │
   │ Proposal B: 3 years (John)           │
   │ Votes: ⬤⬤ (2)                       │
   │                                      │
   │ ⏱️ Time remaining: 2:00              │
   │                                      │
   │ [Cast Your Vote]                     │
   └─────────────────────────────────────┘

3. Simple majority wins
4. Winning option auto-selected
```

**Template Loading:**
```
Facilitator can load charter templates:

┌─────────────────────────────────────────┐
│ 📚 Load Charter Template                │
│                                          │
│ Traditional Family Governance:           │
│ • Conservative eligibility (21+, 10y exp)│
│ • 3-year terms, strict limits            │
│ • Formal election process                │
│                                          │
│ Progressive Family Governance:           │
│ • Inclusive eligibility (18+, 3y exp)    │
│ • 2-year terms, flexible rotation        │
│ • NextGen reserved seats                 │
│                                          │
│ NextGen-Focused Governance:              │
│ • Low barriers (18+, no experience req.) │
│ • 1-year terms, rapid rotation           │
│ • 50% NextGen composition requirement    │
│                                          │
│ [Preview] [Load & Customize]             │
└─────────────────────────────────────────┘

Templates are starting points - all customizable
```

**Visual Charter Preview:**
```
Right panel shows live preview of charter document:

┌────────────────────────────────────┐
│ FAMILY COUNCIL CHARTER             │
│ Adopted: October 29, 2025          │
│ ─────────────────────────────────  │
│                                     │
│ Article I: Eligibility              │
│ Members of the Family Council      │
│ shall be family members aged 21+   │
│ who are shareholders...             │
│                                     │
│ Article II: Composition             │
│ The Family Council shall consist   │
│ of 3-7 members...                   │
│                                     │
│ [View Full Document]                │
│ [Download PDF]                      │
└────────────────────────────────────┘
```

---

#### ⏭️ Transition

**"Complete Charter" button:**

**Validation:**
1. ✅ All 7 sections completed?
2. ✅ Current FC members meet new eligibility criteria?
3. ⚠️  Composition rules compatible with eligible members?
4. ⚠️  Election timeline realistic?

**If validation fails:**
```
⚠️ Charter Issues Detected

• Current FC member Lisa (age 19) doesn't meet 
  new age requirement (21+)
  → Grandfather her in? Or adjust requirement?

• Only 12 eligible members but composition requires 
  5 FC + committees
  → Pool might be too small for rotations

[Adjust Charter] [Continue with Exceptions] [Cancel]
```

**If validation passes:**
- Generates formal charter document (PDF)
- Saves all election rules
- Integrates with Auth Service (eligibility checks)
- Auto-transition to Screen 7
- Sends draft charter to all Family Assembly members for review

---

### Screen 7: Board Interface & Reporting (25 minutes)

#### 🎯 Goal
Define how Family Council and Board of Directors interact, including joint meetings, reporting, and decision coordination

#### ⏱️ Duration
25 minutes

#### 👥 Roles & Permissions

**Consultant (Facilitator):**
- Guides interface design
- Provides corporate governance best practices
- Cannot vote on family-specific arrangements

**Family Council Members:**
- Full editing permissions
- Define family expectations
- Approve liaison arrangements

**Board Members:**
- Full editing permissions (equal partner in interface design)
- Define board reporting needs
- Vote on joint procedures

**CEO:**
- Input on operational implications
- Cannot vote on governance structure

**Observers:**
- Read-only view

---

#### 🎨 Wireframe Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│ Header: Decision Making & Conflict Resolution Workshop             │
│ Stage 7 of 10: Board Interface | ⏱️ 25:00 | 👥 8 online            │
├──────────────────────────┬──────────────────────────────────────────┤
│                          │                                          │
│  Facilitator Panel       │  Main Workspace: FC-Board Interface     │
│  (Left - 20%)            │  (Center - 60%)                          │
│                          │                                          │
│  📊 Interface Topics:    │  ┌────────────────────────────────────┐ │
│  ✅ Liaison Role         │  │  FC-Board Interface Builder        │ │
│  ⏳ Joint Meetings       │  │  Topic 1 of 5: Liaison Arrangement │ │
│  [ ] Info Exchange       │  │  ────────────────────────────────  │ │
│  [ ] Expectations Letter │  │                                     │ │
│  [ ] Escalation          │  │  Family Council Liaison to Board   │ │
│                          │  │                                     │ │
│  ⏰ Per topic: ~5 min    │  │  Purpose:                          │ │
│                          │  │  Provide family perspective to     │ │
│  💡 Best Practices:      │  │  Board, report Board activities    │ │
│                          │  │  to FC, bridge communication       │ │
│  Liaison Role:           │  │                                     │ │
│  • Non-voting observer   │  │  Selection:                        │ │
│  • Attends all meetings  │  │  (•) Rotating FC member (annual)   │ │
│  • Reports to FC         │  │  ( ) Permanent FC chair            │ │
│                          │  │  ( ) Elected by FC for 2-year term │ │
│  Joint Meetings:         │  │  ( ) FC appoints & Board approves  │ │
│  • 2x/year recommended   │  │                                     │ │
│  • Strategy + dividends  │  │  Attendance Rights:                │ │
│  • Full day format       │  │  [x] Attend all Board meetings     │ │
│                          │  │  [x] Receive all Board materials   │ │
│  Expectations Letter:    │  │  [x] Participate in discussions    │ │
│  • Annual from FC        │  │  [ ] Voting rights (NO)            │ │
│  • Strategy priorities   │  │  [x] Can request agenda items      │ │
│  • Risk tolerance        │  │                                     │ │
│  • Performance metrics   │  │  Reporting Obligations:            │ │
│                          │  │  [x] Report to FC after each Board │ │
│  📚 Template Library:    │  │      meeting (within 48 hours)     │ │
│  [Load Template ▼]       │  │  [x] Quarterly written report      │ │
│  • Public Company Model  │  │  [x] Flag urgent issues immediately│ │
│  • Private Family Model  │  │  [ ] Annual Board performance eval │ │
│  • Hybrid Model          │  │                                     │ │
│                          │  │  Confidentiality:                  │ │
│                          │  │  Liaison bound by:                 │ │
│  [Show Full Framework]   │  │  [x] Board confidentiality rules   │ │
│                          │  │  [x] FC disclosure obligations     │ │
│                          │  │  [x] Legal/regulatory requirements │ │
│                          │  │                                     │ │
│                          │  │  💡 Recommendation:                │ │
│                          │  │  Rotate annually to develop        │ │
│                          │  │  governance skills across FC       │ │
│                          │  │                                     │ │
│                          │  │  [💾 Save] [⏭️ Next Topic]         │ │
│                          │  └────────────────────────────────────┘ │
│                          │                                          │
├──────────────────────────┼──────────────────────────────────────────┤
│                          │  Participants Panel (Right - 20%)        │
│                          │                                          │
│                          │  💬 Chat:                                │
│                          │  Sarah (Board): "Liaison needs access    │
│                          │                 to exec sessions?"       │
│                          │  Maria (FC): "Only general sessions"     │
│                          │  David (CEO): "Agree - exec is Board-only│
│                          │                                          │
└──────────────────────────┴──────────────────────────────────────────┘
│ Footer: [< Previous] [Complete Interface] [💾 Auto-saving...]      │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### 📋 FC-Board Interface Topics (5 Sections)

---

**Topic 1: Family Council Liaison to Board**
(Completed form shown above)

Key decisions:
- Selection method (rotating, permanent, elected)
- Attendance rights (all meetings, materials access, discussion participation)
- Reporting obligations (frequency, format, urgency escalation)
- Confidentiality boundaries
- Voting rights (typically NO)

---

**Topic 2: Joint Strategic Sessions**

```
┌────────────────────────────────────────────────┐
│ Joint Family Council + Board Sessions          │
│ ─────────────────────────────────────────────  │
│                                                 │
│ Frequency:                                      │
│ ( ) Annually (1x/year)                          │
│ (•) Semi-annually (2x/year) - Recommended       │
│ ( ) Quarterly (4x/year)                         │
│ ( ) Custom: [____]                              │
│                                                 │
│ Timing:                                         │
│ [x] Schedule after quarterly results            │
│ [x] Before major strategic decisions            │
│ [x] Aligned with Stage 5 calendar               │
│     → Proposed: March & September               │
│                                                 │
│ Duration:                                       │
│ ( ) Half-day (4 hours)                          │
│ (•) Full-day (8 hours)                          │
│ ( ) Multi-day (specify: [___])                  │
│                                                 │
│ Standard Agenda Items:                          │
│ [x] Strategic plan review & alignment           │
│ [x] Annual budget discussion                    │
│ [x] Dividend policy review                      │
│ [x] Performance metrics review                  │
│ [x] Risk assessment & risk tolerance            │
│ [x] CEO performance (if applicable)             │
│ [x] Major capital decisions                     │
│ [x] M&A pipeline review                         │
│ [ ] Custom: [_________________]                 │
│                                                 │
│ Participants:                                   │
│ Required attendees:                             │
│ [x] All Family Council members                  │
│ [x] All Board members (including independents)  │
│ [x] CEO                                         │
│ [ ] CFO                                         │
│ [ ] Legal counsel                               │
│ [ ] External advisors (specify: [____])         │
│                                                 │
│ Executive Sessions:                             │
│ [x] FC-only session (30 min) - before           │
│ [x] Board-only session (30 min) - after         │
│ [x] Joint session (majority of time)            │
│                                                 │
│ Outputs/Deliverables:                           │
│ [x] Joint meeting minutes                       │
│ [x] Agreed action items with owners             │
│ [x] Updated strategic priorities document       │
│ [ ] Formal resolutions (if needed)              │
│                                                 │
│ [💾 Save] [⏭️ Next Topic]                       │
└────────────────────────────────────────────────┘
```

---

**Topic 3: Information Exchange Protocol**

```
┌────────────────────────────────────────────────┐
│ Information Sharing Between FC and Board       │
│ ─────────────────────────────────────────────  │
│                                                 │
│ FROM BOARD TO FAMILY COUNCIL:                   │
│                                                 │
│ Regular Reporting (Quarterly):                  │
│ [x] Board meeting minutes (redacted if needed)  │
│ [x] Financial performance summary               │
│ [x] Strategic initiative progress updates       │
│ [x] Risk register and mitigation status         │
│ [x] CEO dashboard/scorecard                     │
│ [ ] Detailed operational reports                │
│                                                 │
│ Annual Reporting:                               │
│ [x] Complete annual financial statements        │
│ [x] Audited financials and audit report         │
│ [x] Strategic plan for coming year              │
│ [x] Board self-evaluation results               │
│ [x] Executive compensation report               │
│                                                 │
│ Ad-Hoc Reporting (As needed):                   │
│ [x] Material events (M&A, litigation, crises)   │
│ [x] Major capital decisions (>$X threshold)     │
│ [x] Regulatory/compliance issues                │
│ [x] Senior executive changes                    │
│                                                 │
│ Timing:                                         │
│ Materials delivered: [7] days after Board meet  │
│ Format: ( ) PDF  (•) Platform dashboard  ( ) Both│
│                                                 │
│ ─────────────────────────────────────────────  │
│                                                 │
│ FROM FAMILY COUNCIL TO BOARD:                   │
│                                                 │
│ Annual "Expectations Letter":                   │
│ [x] Family strategic priorities for year        │
│ [x] Risk tolerance and appetite                 │
│ [x] Dividend expectations                       │
│ [x] Performance metrics family cares about      │
│ [x] Major concerns or questions                 │
│ [x] Family capability/resource availability     │
│                                                 │
│ Timing: [January ▼] each year                   │
│ Delivered to: [Board Chair ▼]                   │
│                                                 │
│ Ongoing Communications:                         │
│ [x] FC feedback on Board materials              │
│ [x] Questions for Board clarification           │
│ [x] Family governance updates (constitution,    │
│     new policies, etc.)                         │
│ [ ] Family member proposals/suggestions         │
│                                                 │
│ Response Timeline:                              │
│ Board responds to FC inquiries within:          │
│ Urgent: [2] business days                       │
│ Standard: [10] business days                    │
│                                                 │
│ [💾 Save] [⏭️ Next Topic]                       │
└────────────────────────────────────────────────┘
```

---

**Topic 4: Owner Expectations Letter Template**

```
┌────────────────────────────────────────────────┐
│ Annual Owner Expectations Letter               │
│ Template Builder                                │
│ ─────────────────────────────────────────────  │
│                                                 │
│ This letter is sent annually by Family Council │
│ to Board of Directors outlining family         │
│ priorities and expectations.                    │
│                                                 │
│ Standard Sections (check to include):           │
│                                                 │
│ [x] Strategic Priorities                        │
│     Family's top 3-5 strategic goals for year   │
│     Example: "Expand into European markets"     │
│                                                 │
│ [x] Financial Expectations                      │
│     Revenue growth targets: [8-10]% annually    │
│     EBITDA margin targets: [20-25]%             │
│     Return on equity: [15]%+ minimum            │
│                                                 │
│ [x] Dividend Policy                             │
│     Payout ratio: [30-40]% of net income        │
│     Frequency: [Quarterly ▼]                    │
│     Special dividends: [Considered if cash>$XM] │
│                                                 │
│ [x] Risk Tolerance                              │
│     ( ) Conservative (preserve capital)         │
│     (•) Moderate (balanced growth)              │
│     ( ) Aggressive (maximize returns)           │
│                                                 │
│ [x] Capital Allocation Priorities               │
│     1. Organic growth investment                │
│     2. Strategic M&A (< $X size)                │
│     3. Return to shareholders (dividends/buyback│
│     4. Debt reduction                           │
│                                                 │
│ [x] Governance & ESG                            │
│     Sustainability commitments                  │
│     Board diversity expectations                │
│     Community impact priorities                 │
│                                                 │
│ [x] Family Involvement                          │
│     NextGen roles in business                   │
│     Family member employment policy             │
│     Family Council-Board joint initiatives      │
│                                                 │
│ [x] Key Concerns/Questions                      │
│     Free text area for specific topics          │
│                                                 │
│ [ ] Custom Section: [_________________]         │
│                                                 │
│ Letter Approval Process:                        │
│ 1. FC drafts letter (Month: December)           │
│ 2. FC votes to approve (Quorum: [66]%)          │
│ 3. Delivered to Board Chair (Timing: January)   │
│ 4. Board discusses & responds (Within: 30 days) │
│                                                 │
│ [Generate Template] [💾 Save] [⏭️ Next Topic]   │
└────────────────────────────────────────────────┘
```

Auto-generates downloadable Word/PDF template

---

**Topic 5: Escalation & Dispute Resolution**

```
┌────────────────────────────────────────────────┐
│ FC-Board Escalation & Dispute Resolution       │
│ ─────────────────────────────────────────────  │
│                                                 │
│ When disagreements arise between Family        │
│ Council and Board, follow this process:         │
│                                                 │
│ LEVEL 1: Direct Discussion (First 30 days)     │
│ ──────────────────────────────────────────────│
│ Process:                                        │
│ [x] FC Chair and Board Chair meet               │
│ [x] Discuss issue and seek common ground       │
│ [x] Document positions and rationale            │
│ [x] Attempt to reach consensus                  │
│                                                 │
│ Timeline: Must resolve within [30] days         │
│ Success Rate (expected): ~70% of disputes       │
│                                                 │
│ LEVEL 2: Joint Working Group (Next 60 days)    │
│ ──────────────────────────────────────────────│
│ If Level 1 fails:                               │
│ [x] Form joint task force:                      │
│     - [2] FC members                            │
│     - [2] Board members                         │
│     - [1] independent facilitator (optional)    │
│ [x] Deep dive into issue                        │
│ [x] Explore alternatives                        │
│ [x] Present recommendations to both bodies      │
│                                                 │
│ Timeline: [60] days from formation              │
│ Success Rate (expected): ~20% of disputes       │
│                                                 │
│ LEVEL 3: External Mediation (Next 45 days)     │
│ ──────────────────────────────────────────────│
│ If Level 2 fails:                               │
│ [x] Engage external mediator:                   │
│     Qualifications: [Governance expert with     │
│     family business experience]                 │
│ [x] Mediator reviews positions                  │
│ [x] Facilitated mediation sessions              │
│ [x] Non-binding recommendation                  │
│                                                 │
│ Mediator selection:                             │
│ (•) Jointly agreed by FC + Board                │
│ ( ) From pre-approved roster                    │
│                                                 │
│ Cost: Shared [50/50 ▼] by FC and Board         │
│ Timeline: [45] days from engagement             │
│                                                 │
│ LEVEL 4: Arbitration (Final Resolution)        │
│ ──────────────────────────────────────────────│
│ If Level 3 fails (rare):                        │
│ [x] Binding arbitration per corporate documents │
│ [x] Follow shareholder agreement procedures     │
│ [x] Arbitrator decision is final                │
│                                                 │
│ Note: This level governed by legal documents,   │
│       not governance charter.                   │
│                                                 │
│ ─────────────────────────────────────────────  │
│                                                 │
│ Specific Issue Types & Fast-Track:             │
│                                                 │
│ CEO Performance Dispute:                        │
│ ( ) Follow standard 4 levels                    │
│ (•) Fast-track to Level 3 (external mediator)   │
│     Rationale: Too sensitive for internal       │
│                                                 │
│ Dividend Policy Dispute:                        │
│ (•) Follow standard 4 levels                    │
│ ( ) Skip Level 1, start at Level 2              │
│                                                 │
│ Strategic Direction Dispute:                    │
│ (•) Follow standard 4 levels                    │
│ ( ) Require Family Assembly vote (Level 2.5)    │
│                                                 │
│ [💾 Save] [Complete FC-Board Interface]        │
└────────────────────────────────────────────────┘
```

---

#### 💾 Data Collected

**Stage 7 Output:**
```json
{
  "stage_7": {
    "fc_board_interface": {
      "liaison": {
        "selection_method": "rotating_annual",
        "attendance_rights": ["all_meetings", "all_materials", "discussion_participation"],
        "voting_rights": false,
        "reporting_obligations": {
          "after_each_meeting": "48_hours",
          "quarterly_report": true,
          "urgent_escalation": true
        },
        "confidentiality": ["board_rules", "fc_disclosure", "legal_requirements"]
      },
      "joint_meetings": {
        "frequency": "semi_annual",
        "proposed_months": ["March", "September"],
        "duration_hours": 8,
        "standard_agenda": ["strategy", "budget", "dividends", "performance", "risk", "capital_decisions"],
        "participants": ["all_fc", "all_board", "ceo"],
        "outputs": ["minutes", "action_items", "priorities_document"]
      },
      "information_exchange": {
        "board_to_fc": {
          "quarterly": ["minutes", "financials", "initiatives", "risk_register"],
          "annual": ["audited_financials", "strategic_plan", "board_eval", "compensation"],
          "ad_hoc": ["material_events", "capital_decisions", "compliance_issues"],
          "timing_days": 7,
          "format": "platform_dashboard"
        },
        "fc_to_board": {
          "annual_expectations_letter": {
            "month": "January",
            "sections": ["strategic_priorities", "financial_targets", "dividend_policy", "risk_tolerance", "capital_allocation"],
            "delivered_to": "board_chair"
          },
          "ongoing": ["feedback", "questions", "governance_updates"],
          "response_timeline": {
            "urgent_days": 2,
            "standard_days": 10
          }
        }
      },
      "expectations_letter_template": {
        "sections": ["strategic", "financial", "dividends", "risk", "capital", "governance", "family_involvement"],
        "approval_quorum": 66,
        "generated_template": "base64_encoded_docx"
      },
      "escalation_process": {
        "level_1": {
          "name": "Direct Discussion",
          "participants": ["fc_chair", "board_chair"],
          "timeline_days": 30,
          "success_rate_expected": 70
        },
        "level_2": {
          "name": "Joint Working Group",
          "participants": ["2_fc_members", "2_board_members", "optional_facilitator"],
          "timeline_days": 60,
          "success_rate_expected": 20
        },
        "level_3": {
          "name": "External Mediation",
          "mediator_qualifications": "governance_expert_family_business",
          "selection_method": "jointly_agreed",
          "cost_sharing": "50_50",
          "timeline_days": 45,
          "binding": false
        },
        "level_4": {
          "name": "Arbitration",
          "governed_by": "corporate_documents",
          "binding": true
        },
        "fast_track_issues": {
          "ceo_performance": "level_3",
          "dividend_policy": "standard",
          "strategic_direction": "standard"
        }
      }
    }
  }
}
```

**Stored in:**
- Constitution Service (port 8002) → fc_board_interface table
- Meeting Service (port 8003) → Joint meeting calendar entries
- Conflict Resolution Service (port 8015) → Escalation procedures

**Automatic Integration:**
- Liaison role created in Auth Service
- Joint meetings added to governance calendar
- Expectations letter template available for download
- Escalation process activated in Conflict Resolution module

---

#### 🔄 Collaborative Mechanics

**FC and Board Equal Partners:**
- Both Family Council and Board members can edit all sections
- Real-time sync between all participants
- Voting requires majority from BOTH bodies:
  ```
  Joint vote required: 
  ✅ Family Council: 4/5 approve (80%)
  ✅ Board: 5/7 approve (71%)
  → PASSED (both majorities met)
  ```

**Template Generation:**
- System auto-generates Owner Expectations Letter template
- Pre-filled with Stage 3 data (governance structure)
- Pre-filled with Stage 4 data (decision rights)
- Downloadable as Word doc for annual use

**Calendar Integration:**
- Joint meetings automatically added to Stage 5 calendar
- Liaison attendance auto-added to all Board meetings
- Reminders configured for information exchange deadlines

---

#### ⏭️ Transition

**"Complete FC-Board Interface" button:**

**Validation:**
1. ✅ Liaison arrangement defined?
2. ✅ Joint meeting schedule set?
3. ✅ Information exchange protocol complete?
4. ✅ Expectations letter template generated?
5. ✅ Escalation process defined?

**If validation passes:**
- Saves complete FC-Board interface
- Generates interface documentation
- Updates governance calendar with joint meetings
- Creates liaison role assignment
- Auto-transition to Screen 8
- Transition logged

---

### Screen 8: Conflict Escalation & Compliance (15 minutes)

#### 🎯 Goal
Define 4-level conflict escalation procedure for family governance disputes and establish compliance monitoring

#### ⏱️ Duration
15 minutes

#### 👥 Roles & Permissions

**Consultant (Facilitator):**
- Guides escalation framework design
- Provides conflict resolution best practices
- Cannot vote on family-specific procedures

**Family Council Members:**
- Full editing permissions
- Define escalation triggers and timelines
- Approve mediator criteria

**Board Members / CEO:**
- Input on business-impacting conflicts
- No voting on family-internal procedures

**Observers:**
- Read-only view

---

#### 🎨 Wireframe Layout

```
┌─────────────────────────────────────────────────────────────────────┐
│ Header: Decision Making & Conflict Resolution Workshop             │
│ Stage 8 of 10: Conflict Escalation | ⏱️ 15:00 | 👥 8               │
├──────────────────────────┬──────────────────────────────────────────┤
│                          │                                          │
│  Facilitator Panel       │  Main Workspace: Escalation Builder     │
│  (Left - 20%)            │  (Center - 60%)                          │
│                          │                                          │
│  📊 Escalation Framework:│  ┌────────────────────────────────────┐ │
│                          │  │  4-Level Escalation Procedure      │ │
│  ✅ Level 1: Discussion  │  │  ────────────────────────────────  │ │
│  ✅ Level 2: Working Grp │  │                                     │ │
│  ⏳ Level 3: Mediation   │  │  Visual Flow Diagram:              │ │
│  [ ] Level 4: Arbitration│  │                                     │ │
│                          │  │  Conflict Identified                │ │
│  ⏰ Per level: ~3 min    │  │         ↓                          │ │
│                          │  │  ┌─────────────────┐              │ │
│  💡 Key Principles:      │  │  │ LEVEL 1         │              │ │
│                          │  │  │ FC Discussion   │              │ │
│  Fast Resolution:        │  │  │ 15 days max     │              │ │
│  • Start simple          │  │  └────────┬────────┘              │ │
│  • Escalate if needed    │  │           │                        │ │
│  • Avoid litigation      │  │      Unresolved?                   │ │
│                          │  │           ↓                        │ │
│  Transparency:           │  │  ┌─────────────────┐              │ │
│  • Document everything   │  │  │ LEVEL 2         │              │ │
│  • All FC members aware  │  │  │ Working Group   │              │ │
│  • Confidential outside  │  │  │ 30 days max     │              │ │
│                          │  │  └────────┬────────┘              │ │
│  Mediator Roster:        │  │           │                        │ │
│  • Pre-approved list     │  │      Unresolved?                   │ │
│  • Updated annually      │  │           ↓                        │ │
│  • 3-5 professionals     │  │  ┌─────────────────┐              │ │
│                          │  │  │ LEVEL 3         │              │ │
│  📚 Template Library:    │  │  │ External Mediation│            │ │
│  [Load Template ▼]       │  │  │ 45 days max     │              │ │
│  • Family Office Std     │  │  └────────┬────────┘              │ │
│  • Mediation-First       │  │           │                        │ │
│  • Legal-Heavy           │  │      Unresolved?                   │ │
│                          │  │           ↓                        │ │
│                          │  │  ┌─────────────────┐              │ │
│  [Show Full Process]     │  │  │ LEVEL 4         │              │ │
│                          │  │  │ Arbitration     │              │ │
│                          │  │  │ Per Corp Docs   │              │ │
│                          │  │  └─────────────────┘              │ │
│                          │  │                                     │ │
│                          │  │  Currently configuring: LEVEL 3    │ │
│                          │  └────────────────────────────────────┘ │
│                          │                                          │
├──────────────────────────┼──────────────────────────────────────────┤
│                          │  Level 3 Configuration Panel             │
│                          │                                          │
│                          │  External Mediation Details:             │
│                          │  ┌────────────────────────────────────┐ │
│                          │  │ Mediator Selection:                │ │
│                          │  │ (•) From pre-approved roster       │ │
│                          │  │ ( ) Jointly selected at time       │ │
│                          │  │ ( ) FC selects unilaterally        │ │
│                          │  │                                     │ │
│                          │  │ Mediator Qualifications:           │ │
│                          │  │ [x] Family business governance exp │ │
│                          │  │ [x] Mediation certification        │ │
│                          │  │ [x] No prior family relationship   │ │
│                          │  │ [x] 10+ years experience           │ │
│                          │  │                                     │ │
│                          │  │ Cost Allocation:                   │ │
│                          │  │ ( ) Family pays 100%               │ │
│                          │  │ (•) Split among parties (50/50)    │ │
│                          │  │ ( ) Losing party pays              │ │
│                          │  │                                     │ │
│                          │  │ Timeline: [45] days maximum        │ │
│                          │  │                                     │ │
│                          │  │ Binding: ( ) Yes (•) No            │ │
│                          │  │                                     │ │
│                          │  │ [💾 Save Level] [⏭️ Next Level]    │ │
│                          │  └────────────────────────────────────┘ │
│                          │                                          │
└──────────────────────────┴──────────────────────────────────────────┘
│ Footer: [< Previous] [Complete Escalation] [💾 Auto-saving...]     │
└─────────────────────────────────────────────────────────────────────┘
```

---

#### 📋 4-Level Escalation Procedure (Detailed)

---

**LEVEL 1: Family Council Discussion (Internal Resolution)**

```
┌────────────────────────────────────────────────┐
│ Level 1: Family Council Discussion            │
│ ─────────────────────────────────────────────  │
│                                                 │
│ Trigger:                                        │
│ Any conflict between family members related to: │
│ [x] Governance interpretation                   │
│ [x] Decision rights disputes                    │
│ [x] Family Council procedures                   │
│ [x] Constitutional interpretation               │
│ [x] Resource allocation                         │
│ [ ] Personal family disputes (use separate)     │
│                                                 │
│ Who Can Raise Conflict:                         │
│ [x] Any family member                           │
│ [x] Any FC member                               │
│ [ ] Board member (for governance issues)        │
│ [ ] External advisor                            │
│                                                 │
│ Process:                                        │
│ 1. Conflict raised to FC Chair                  │
│    Method: [Email/Platform ▼]                   │
│    Timeline: Within [5] days of issue arising   │
│                                                 │
│ 2. FC Chair adds to next FC meeting agenda      │
│    Timeline: Next scheduled meeting OR          │
│              Special meeting if urgent          │
│                                                 │
│ 3. FC discusses and attempts resolution         │
│    All parties present their views              │
│    FC facilitates discussion                    │
│    Seeks consensus solution                     │
│                                                 │
│ 4. FC votes on resolution (if needed)           │
│    Threshold: [Simple majority ▼]               │
│    Conflicted members: [Recuse ▼]               │
│                                                 │
│ 5. Decision documented in protocol              │
│    Template: [Decision Record ▼]                │
│                                                 │
│ Maximum Duration: [15] days from issue raised   │
│                                                 │
│ Success Criteria:                               │
│ ✅ Parties accept FC decision                   │
│ ✅ Issue marked as resolved                     │
│ ✅ Implementation plan created                  │
│                                                 │
│ If Unresolved:                                  │
│ → Escalate to Level 2 (Working Group)          │
│                                                 │
│ Documentation Required:                         │
│ [x] Conflict description