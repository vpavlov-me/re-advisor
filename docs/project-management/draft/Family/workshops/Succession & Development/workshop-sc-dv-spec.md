Syntax highlighting has been disabled due to code size.
---
doc_id: "DOC-WRK-002"
title: "Succession & Development Workshop - Digital Interface Specification"
type: "workshop-specification"
category: "product"
audience: "product-manager|designer|developer"
complexity: "advanced"
created: "2025-10-29"
updated: "2025-10-29"
version: "1.0.0"
status: "draft"
tags: ["workshop", "succession-planning", "leadership-development", "ceo-succession", "talent-pipeline"]
related: ["DOC-WRK-001", "DOC-SYS-001"]
owner: "product-team"
maintainer: "product-team"
priority: "high"
---

# Succession & Development Workshop
## Digital Interface Specification

> **Purpose**: Detailed screen-by-screen specification for digital collaborative workshop interface. Enables Consultant to facilitate "Succession & Development" workshop with real-time participation from owners, board, and leadership.

---

## 📋 Document Overview

### Workshop Summary
- **Title**: "Преемственность и развитие лидеров" (Succession & Development)
- **Goal**: Согласовать принципы и каркас Succession Policy для CEO и ключевых ролей
- **Duration**: 3-3.5 hours
- **Format**: Digital collaborative session (real-time)
- **Facilitator**: Consultant (via Advisor Portal)
- **Participants**: Owners, Family Council, Board Chair, Independent Director, HRD, CEO, Legal (on-call)

### Document Structure
1. **Pre-Workshop Introduction** - Onboarding participants
2. **Architecture Overview** - Technical foundation
3. **Workshop Screens (9)** - Detailed screen specifications
4. **Post-Workshop Integration** - Policy deployment & artifact generation

---

## 🎯 PART 1: Pre-Workshop Introduction

### Screen 0: Workshop Orientation & Setup

**Purpose**: Ensure all participants understand WHAT, WHY, and HOW before starting succession planning workshop

#### 🎨 Layout Description

**Header Section:**
- Workshop title: "Succession & Development Workshop"
- Session ID and date/time
- Participant count indicator (e.g., "9 of 10 participants joined")
- Language selector (Russian/English)

**Hero Section (Center):**
- Large visual roadmap showing 9 stages as timeline
- Progress indicator: "Not started"
- Estimated duration: 3-3.5 hours
- Countdown timer to scheduled start time

**What We'll Do Panel (Left Column):**
```
📋 Workshop Roadmap

Stage 1: Kick-off and Objectives (10 min)
Stage 2: Critical Roles & Risks (15 min)
Stage 3: CEO & Key Role Profiles (25 min)
Stage 4: Selection Criteria & Weights (35 min)
Stage 5: Candidate Assessment (40 min) ⭐
Stage 6: Development Roadmap (35 min)
Stage 7: Emergency Succession Plan (20 min)
Stage 8: Process, RACI & Communications (20 min)
Stage 9: Summary & Protocol (10 min)

⭐ = Longest interactive section
```

**Why This Matters Panel (Center-Left):**
```
🎯 Business Value for Your Family

✅ Leadership Continuity
   → Smooth CEO transitions
   → No power vacuums or crises
   → Business stability maintained

✅ Talent Pipeline
   → Clear development paths
   → NextGen preparation
   → Internal bench strength

✅ Risk Mitigation
   → Emergency plans ready
   → Key person dependency reduced
   → Board confidence increased

✅ Value Preservation
   → Avoid rushed transitions
   → Maintain institutional knowledge
   → Protect family wealth

📊 Success Metrics:
   • 90% of key roles have identified successors
   • 80% reduction in transition disruption
   • 2-3 ready candidates per critical role
   • NextGen leadership pipeline established
```

**How Results Will Be Used Panel (Center-Right):**
```
🔗 Automatic Platform Integration

After workshop completion, your succession plan creates:

📊 Succession Policy Document
   → Instantly deployed to Governance module
   → All stakeholders see succession principles
   → Used for future leadership decisions

👥 Candidate Development Plans
   → Individual roadmaps for each successor
   → Milestone tracking activated
   → Progress dashboards configured

⚠️ Emergency Succession Protocols
   → Automatically loaded into Crisis module
   → Board chair receives access codes
   → Communication templates ready

📅 Review & Update Calendar
   → Annual policy review scheduled
   → Quarterly candidate check-ins
   → Board succession committee meetings

🔐 RACI Matrix Integration
   → Decision rights for succession
   → Linked to governance framework
   → Approval workflows configured

No manual data entry needed - everything is automated!
```

**Participant Roles Panel (Right Column):**
```
👥 Your Role in This Workshop

🎤 Consultant (Facilitator)
   • Guides discussion through stages
   • Controls timing and transitions
   • Provides succession best practices
   • Cannot vote on family decisions

👑 Owners/Shareholders
   • Final approval authority
   • Vote on succession principles
   • Approve CEO successor criteria
   • Ultimate decision rights

🏛️ Family Council Members
   • Input on family values alignment
   • NextGen development priorities
   • Culture and legacy considerations
   • Advisory role

📋 Board Chair & Independent Director
   • CEO performance perspective
   • Leadership assessment input
   • Governance alignment
   • Vote on selection criteria

👨‍💼 HRD (Human Resources Director)
   • Candidate assessment data
   • Development program design
   • Performance metrics input
   • Implementation responsibility

💼 CEO (Current)
   • Successor recommendations
   • Role requirements input
   • Transition planning
   • Development mentorship

⚖️ Legal Counsel (On-Call)
   • Corporate compliance review
   • Employment law guidance
   • Document review
   • Available for questions

Real-time collaboration: You'll see everyone's inputs instantly!
```

**Pre-Workshop Checklist (Bottom):**
```
✅ Materials to Have Ready

Before starting, ensure you have:
[ ] Current organizational chart
[ ] CEO and key executives job descriptions
[ ] Performance reviews (last 2-3 years) for potential candidates
[ ] Family values and mission statement
[ ] Current succession plan (if exists)
[ ] Corporate governance documents
[ ] Key person risk assessment
[ ] Internal/external candidate pool CVs

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
1. "Do you have an existing succession plan?" (Yes/No/Informal)
2. "How urgent is CEO succession?" (1-10 scale: 1=Years away, 10=Immediate)
3. "Internal vs external candidates preference?" (All internal / Mix / Open to external)
4. "Top 3 succession planning challenges?" (free text)
5. "NextGen readiness assessment?" (Not ready / Developing / Ready)

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

#### ⭐ Transition to Workshop

**"Start Workshop" button (Facilitator only):**
- Locks participant list (latecomers must request admission)
- Starts session timer
- Transitions all participants to Screen 1 simultaneously
- Creates session audit log entry

---

## 🗃️ PART 2: Architecture Overview

### Technical Foundation

#### Services Used
```
Workshop Orchestration:
├── Education Service (8006) - Workshop engine, template management
├── Constitution Service (8002) - Succession policy storage
├── Meeting Service (8003) - Review calendar integration
├── Notification Service (8010) - Real-time updates & reminders
└── Auth Service (8001) - Role-based access for succession data

Frontend:
├── Advisor Portal (3002) - Consultant facilitator interface
└── Family Portal (3001) - Participant interface

Real-time:
├── WebSocket connections for collaborative editing
└── Redis pub/sub for presence and updates
```

#### Multi-Tenancy & Security
- All workshop data isolated by `family_id`
- Session data encrypted at rest (sensitive succession info)
- WebSocket connections authenticated with JWT
- Participant permissions checked on every action
- Audit trail for all decisions and candidate assessments
- **Extra security**: Candidate assessment data restricted to authorized roles only

#### Data Model

```typescript
WorkshopSession {
  session_id: uuid
  family_id: uuid
  workshop_template_id: "succession-development"
  consultant_id: uuid
  status: "not_started" | "in_progress" | "completed"
  current_stage: 0-9
  started_at: timestamp
  completed_at: timestamp
  participants: [
    {
      user_id: uuid
      role: "facilitator" | "owner" | "family_council" | "board_chair" | "hrd" | "ceo" | "legal"
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
    succession_policy: {...},
    ceo_profile: {...},
    criteria_matrix: {...},
    candidate_assessments: {...},
    development_roadmaps: {...},
    emergency_plan: {...},
    raci_matrix: {...}
  }
}
```

---

## 🖥️ PART 3: Workshop Screens (Detailed Specifications)

---

### Screen 1: Kick-off and Objectives (10 minutes)

#### 🎯 Goal
Align participants on workshop purpose, confidentiality rules, and expected succession planning outcomes

#### ⏱️ Duration
10 minutes

#### 👥 Roles & Permissions

**Consultant (Facilitator):**
- Controls screen content and timing
- Advances through slides
- Can mute/unmute participants
- Manages "raise hand" queue

**Owners:**
- Can raise hand to speak
- Can use reaction emojis
- Full chat access

**All Other Participants:**
- Same as Owners

---

#### 🎨 Wireframe Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ Header: Succession & Development Workshop                      │
│ Stage 1 of 9: Kick-off and Objectives | ⏱️ 10:00 | 👥 9 online  │
├──────────────────────────┬──────────────────────────────────────┤
│ Strategic project: On track ✅         │
│                                          │
│ DECISION:                                │
│ (●) Proceed to Phase 2 (Transition Prep) │
│ ( ) Extend Phase 1 (More development)    │
│ ( ) Reassess readiness (Concerns)        │
│                                          │
│ Vote Required: Owners + Board            │
│ [Submit Decision]                        │
└──────────────────────────────────────────┘
```

---

#### ⭐ Transition

**"Complete Roadmaps" button:**

**Validation:**
1. ✅ All "Ready Now" and "Ready 12-24m" candidates have roadmaps?
2. ✅ All roadmaps have checkpoints defined?
3. ✅ Owners/resources assigned to all activities?
4. ⚠️ Resource conflicts identified?

**If validation passes:**
- Saves all development roadmaps
- Generates timeline visualizations
- Exports roadmap PDFs for each candidate
- Integrates with calendar/task systems
- Auto-transition to Screen 7 (Emergency Plan)

---

### Screen 7: Emergency Succession Plan (20 minutes)

#### 🎯 Goal
Create 90-day emergency protocols for sudden CEO unavailability

#### ⏱️ Duration
20 minutes

#### 👥 Roles & Permissions

**Consultant (Facilitator):**
- Guides crisis planning
- Provides emergency succession best practices
- Cannot vote on interim assignments

**Owners + Board Chair:**
- Full editing permissions
- Designate interim CEO
- Approve emergency protocols
- Final decision authority

**CEO (Current):**
- Input on interim capabilities
- Cannot control emergency succession

**Legal Counsel:**
- Active participant for this section
- Ensures legal compliance
- Documents emergency powers

**Others:**
- Read-only view

---

#### 🎨 Wireframe Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ Header: Succession & Development Workshop                      │
│ Stage 7 of 9: Emergency Plan | ⏱️ 20:00 | 👥 9 online           │
├──────────────────────────┬──────────────────────────────────────┤
│                          │                                      │
│  Facilitator Panel       │  Main Workspace: Emergency Protocol  │
│  (Left - 20%)            │  (Center - 60%)                      │
│                          │                                      │
│  🚨 Emergency Triggers:  │  ┌──────────────────────────────────┐│
│                          │  │  90-Day Emergency Succession     ││
│  CEO unavailable >30 days│  │  ────────────────────────────────││
│  due to:                 │  │                                  ││
│  • Medical emergency     │  │  TRIGGER CONDITIONS:             ││
│  • Sudden death          │  │  ────────────────────────────────││
│  • Incapacitation        │  │                                  ││
│  • Immediate resignation │  │  CEO unavailable for >30 days due││
│  • Legal issues          │  │  to any of following:            ││
│  • Family crisis         │  │  ☑️ Medical emergency/incapacity ││
│                          │  │  ☑️ Sudden death                 ││
│  ⏰ Critical first 48hrs │  │  ☑️ Immediate resignation        ││
│                          │  │  ☑️ Legal/regulatory prohibition ││
│  💡 Best Practices:      │  │  ☑️ Family crisis requiring leave││
│                          │  │  ☐ Custom: [______________]      ││
│  Interim CEO should be:  │  │                                  ││
│  • Internal (knows co.)  │  │  WHO DECLARES EMERGENCY:         ││
│  • Trusted by Board      │  │  Primary: [Board Chair]          ││
│  • Available immediately │  │  Backup: [Lead Independent Dir.] ││
│  • Limited term (90 days)│  │  Notification: [Owners + Board]  ││
│                          │  │                                  ││
│  Not permanent CEO:      │  │  ────────────────────────────────││
│  • Different skillset    │  │  INTERIM CEO DESIGNATION:        ││
│  • Crisis management     │  │  ────────────────────────────────││
│  • Stability focus       │  │                                  ││
│                          │  │  Primary Interim:                ││
│  📋 90-Day Plan:         │  │  Name: [COO - Candidate A]       ││
│                          │  │  Current Role: Chief Operating   ││
│  Day 1-7: Stabilize      │  │  Officer                         ││
│  • Crisis communication  │  │  Readiness: [High]               ││
│  • Reassure stakeholders │  │  Availability: [Immediate]       ││
│  • Maintain operations   │  │                                  ││
│                          │  │  Backup Interim:                 ││
│  Day 8-30: Steady state  │  │  Name: [CFO - Candidate X]       ││
│  • Execute current plan  │  │  Reason: If primary unavailable  ││
│  • Regular Board updates │  │                                  ││
│  • No major changes      │  │  Third Option:                   ││
│                          │  │  ( ) Independent Director        ││
│  Day 31-90: Transition   │  │  (●) External interim executive  ││
│  • Permanent search      │  │  ( ) Promote from within other   ││
│  • Succession process    │  │                                  ││
│  • Knowledge transfer    │  │  APPOINTMENT MECHANICS:          ││
│                          │  │  ☑️ Pre-signed appointment letter││
│  [Show Emergency Guide]  │  │     (sealed, stored with legal)  ││
│                          │  │  ☑️ Board resolution template    ││
│                          │  │     (ready to execute)           ││
│                          │  │  ☑️ Powers of attorney (if needed)│
│                          │  │  ☑️ Emergency contact list       ││
│                          │  │                                  ││
│                          │  │  INTERIM CEO AUTHORITY:          ││
│                          │  │  Term: [90] days maximum         ││
│                          │  │  Title: [Acting CEO / Interim CEO│
│                          │  │  ────────────────────────────────││
│                          │  │  [Continue to Authorities →]     ││
│                          │  └──────────────────────────────────┘│
│                          │                                      │
├──────────────────────────┼──────────────────────────────────────┤
│                          │  Emergency Authorities Panel         │
│                          │                                      │
│                          │  ┌──────────────────────────────────┐│
│                          │  │ Interim CEO: Powers & Limits     ││
│                          │  │                                  ││
│                          │  │ APPROVED AUTHORITIES:            ││
│                          │  │ ☑️ Run day-to-day operations     ││
│                          │  │ ☑️ Execute approved budget       ││
│                          │  │ ☑️ Sign contracts <$100K         ││
│                          │  │ ☑️ Make hiring decisions <VP level│
│                          │  │ ☑️ Represent company externally  ││
│                          │  │ ☑️ Attend Board meetings (voting)││
│                          │  │                                  ││
│                          │  │ PROHIBITED ACTIONS:              ││
│                          │  │ ☑️ M&A transactions (any size)   ││
│                          │  │ ☑️ Strategic plan changes        ││
│                          │  │ ☑️ Major capital expenditures    ││
│                          │  │ ☑️ Dividend policy changes       ││
│                          │  │ ☑️ Executive team restructuring  ││
│                          │  │ ☑️ New debt/financing            ││
│                          │  │                                  ││
│                          │  │ REQUIRES BOARD APPROVAL:         ││
│                          │  │ ☑️ Contracts >$100K              ││
│                          │  │ ☑️ VP+ hires or terminations     ││
│                          │  │ ☑️ Legal settlements >$50K       ││
│                          │  │ ☑️ Any crisis communications     ││
│                          │  │                                  ││
│                          │  └──────────────────────────────────┘│
│                          │                                      │
└──────────────────────────┴──────────────────────────────────────┘
│ Footer: [< Previous] [Complete Emergency Plan] [💾 Auto-saving...]│
└─────────────────────────────────────────────────────────────────┘
```

---

#### 📋 Emergency Succession Plan Components

**1. Trigger Conditions** (What activates plan)

```
┌──────────────────────────────────────────────┐
│ Emergency Succession Triggers                │
│ ──────────────────────────────────────────── │
│                                              │
│ Plan activates when CEO is unavailable for   │
│ more than [30] consecutive days due to:      │
│                                              │
│ ☑️ Medical emergency or incapacitation       │
│ ☑️ Sudden death                              │
│ ☑️ Immediate resignation                     │
│ ☑️ Legal or regulatory prohibition           │
│ ☑️ Extended family crisis requiring leave    │
│ ☐ Termination for cause                     │
│ ☐ Custom trigger: [________________]        │
│                                              │
│ WHO DECLARES EMERGENCY:                      │
│ Primary authority: [Board Chair]             │
│ Backup authority: [Lead Independent Director]│
│ Requires: [Simple majority Board vote ▼]     │
│                                              │
│ NOTIFICATION PROTOCOL:                       │
│ Within [24] hours, notify:                   │
│ ☑️ All Owners                                │
│ ☑️ All Board members                         │
│ ☑️ Executive team                            │
│ ☑️ Family Council chair                      │
│ ☑️ Legal counsel                             │
│ ☑️ HR Director                               │
│ [ ] Public announcement (timing: [TBD])      │
│                                              │
└──────────────────────────────────────────────┘
```

---

**2. Interim CEO Designation** (Who steps in)

```
┌──────────────────────────────────────────────┐
│ Interim CEO Designation                      │
│ ──────────────────────────────────────────── │
│                                              │
│ PRIMARY INTERIM CEO:                         │
│ Name: [COO - Candidate A]                    │
│ Current Role: Chief Operating Officer        │
│ Age: [45]                                    │
│                                              │
│ Qualifications:                              │
│ ☑️ Deep knowledge of company operations      │
│ ☑️ Trusted by Board and ownership            │
│ ☑️ Immediately available                     │
│ ☑️ Strong crisis management skills           │
│ ☑️ Internal credibility with team            │
│                                              │
│ Readiness Assessment: [High - Ready Now]     │
│                                              │
│ BACKUP INTERIM CEO:                          │
│ Name: [CFO - Candidate X]                    │
│ Reason for backup: If primary unavailable    │
│                    or conflicted             │
│                                              │
│ THIRD OPTION (if primary + backup fail):     │
│ ( ) Independent Director                     │
│ ( ) Family Council Chair                     │
│ (●) External interim executive (search firm) │
│     Firm pre-selected: [Spencer Stuart]      │
│     Retainer: [Active / To be activated ▼]   │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ APPOINTMENT MECHANICS:                       │
│                                              │
│ ☑️ Pre-signed appointment letter             │
│    Stored: [Legal counsel safe deposit]      │
│    Contents: Authority, term, compensation   │
│    Reviewed: [Annually]                      │
│                                              │
│ ☑️ Board resolution template                 │
│    Pre-drafted and approved in principle     │
│    Ready to execute immediately              │
│                                              │
│ ☑️ Powers of attorney (if needed)            │
│    Checked by legal counsel                  │
│                                              │
│ ☑️ Emergency contact protocol                │
│    24/7 contact numbers for all parties      │
│    Backup communication methods              │
│                                              │
│ COMPENSATION (Interim Period):               │
│ Base salary: [Current salary + 25% premium]  │
│ Bonus: [Prorated based on 90-day performance]│
│ Benefits: [Continue existing]                │
│ Reversion: [Return to prior role after term] │
│                                              │
└──────────────────────────────────────────────┘
```

---

**3. Interim CEO Authority & Constraints** (What they can/cannot do)

```
┌──────────────────────────────────────────────┐
│ Interim CEO: Authority & Constraints         │
│ ──────────────────────────────────────────── │
│                                              │
│ Term: [90] days maximum                      │
│ Title: [Acting CEO / Interim CEO]            │
│ Reports to: [Board Chair]                    │
│ Review frequency: [Weekly for first month,   │
│                    then bi-weekly]           │
│                                              │
│ ══════════════════════════════════════════   │
│ CATEGORY A: FULL AUTHORITY (No approval)     │
│ ══════════════════════════════════════════   │
│                                              │
│ ☑️ Day-to-day operations                     │
│    All routine business decisions            │
│                                              │
│ ☑️ Execute approved budget                   │
│    Within existing financial plan            │
│                                              │
│ ☑️ Contracts <$100K                          │
│    Normal course of business                 │
│                                              │
│ ☑️ Hiring decisions <VP level                │
│    Backfills and planned roles               │
│                                              │
│ ☑️ Expense approvals per policy              │
│    Existing approval authorities continue    │
│                                              │
│ ☑️ External representation                   │
│    Customers, suppliers, partners            │
│    (Position as "Interim CEO")               │
│                                              │
│ ☑️ Board meeting attendance                  │
│    Full participation with voting rights     │
│                                              │
│ ☑️ Team management                           │
│    Performance management, coaching          │
│                                              │
│ ══════════════════════════════════════════   │
│ CATEGORY B: REQUIRES BOARD APPROVAL          │
│ ══════════════════════════════════════════   │
│                                              │
│ ☑️ Contracts >$100K                          │
│    Board Chair can expedite if urgent        │
│                                              │
│ ☑️ VP+ level hires or terminations           │
│    Exception: Backfill for departures        │
│                                              │
│ ☑️ Legal settlements >$50K                   │
│    Risk committee approval required          │
│                                              │
│ ☑️ Off-budget expenditures                   │
│    Any spending not in approved budget       │
│                                              │
│ ☑️ Crisis communications (external)          │
│    Board Chair must approve messaging        │
│                                              │
│ ☑️ Policy changes (HR, operations)           │
│    Material changes to company policies      │
│                                              │
│ ☑️ Real estate transactions                  │
│    Lease, buy, sell property                 │
│                                              │
│ ══════════════════════════════════════════   │
│ CATEGORY C: STRICTLY PROHIBITED              │
│ ══════════════════════════════════════════   │
│                                              │
│ ☑️ M&A transactions (any size)               │
│    No acquisitions, sales, or investments    │
│                                              │
│ ☑️ Strategic plan changes                    │
│    Execute existing plan only                │
│                                              │
│ ☑️ Major capital expenditures                │
│    >$500K or not in approved budget          │
│                                              │
│ ☑️ Dividend policy changes                   │
│    Continue existing policy only             │
│                                              │
│ ☑️ Executive team restructuring              │
│    No org changes at senior level            │
│                                              │
│ ☑️ New debt or financing                     │
│    No changes to capital structure           │
│                                              │
│ ☑️ Related party transactions                │
│    No dealings with family/owners            │
│                                              │
│ ☑️ Compensation changes (executives)         │
│    No raises, bonuses outside plan           │
│                                              │
│ Philosophy: "Stabilize, don't transform"     │
│                                              │
└──────────────────────────────────────────────┘
```

---

**4. 90-Day Action Plan** (What happens when)

```
┌──────────────────────────────────────────────┐
│ 90-Day Emergency Succession Timeline         │
│ ──────────────────────────────────────────── │
│                                              │
│ DAY 1-7: STABILIZATION PHASE                 │
│ ──────────────────────────────────────────── │
│                                              │
│ Hour 0-24: Immediate Actions                 │
│ ☑️ Board Chair activates emergency plan      │
│ ☑️ Interim CEO formally appointed            │
│ ☑️ Emergency notification sent to key parties│
│ ☑️ Crisis management team convened           │
│                                              │
│ Day 1: Internal Communication                │
│ ☑️ Interim CEO addresses executive team      │
│    Message: Continuity, stability, plan      │
│ ☑️ All-hands meeting (if appropriate)        │
│ ☑️ Department head briefings                 │
│                                              │
│ Day 2-3: External Communication              │
│ ☑️ Board-approved statement prepared         │
│ ☑️ Key customer/supplier outreach            │
│    Personal calls from Interim CEO           │
│ ☑️ Investor communication (if applicable)    │
│ ☑️ Media response plan (if needed)           │
│                                              │
│ Day 4-7: Operations Check                    │
│ ☑️ Review critical projects/decisions        │
│ ☑️ Assess immediate risks                    │
│ ☑️ Confirm authority delegations             │
│ ☑️ First Board update (Day 7)                │
│                                              │
│ Communication Templates:                     │
│ • Internal: [Pre-drafted, approved]          │
│ • External: [Pre-drafted, approved]          │
│ • Media: [Holding statements ready]          │
│ • Customer: [Personal outreach scripts]      │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ DAY 8-30: STEADY STATE PHASE                 │
│ ──────────────────────────────────────────── │
│                                              │
│ Objectives:                                  │
│ • Maintain normal operations                 │
│ • Execute existing strategic plan            │
│ • Build confidence with stakeholders         │
│ • No major changes or initiatives            │
│                                              │
│ Weekly Activities:                           │
│ ☑️ Monday: Executive team meeting            │
│ ☑️ Wednesday: Board Chair check-in           │
│ ☑️ Friday: Week-in-review report             │
│                                              │
│ Board Engagement:                            │
│ • Weekly updates (written)                   │
│ • Bi-weekly Board calls                      │
│ • Special meetings as needed                 │
│ • Board Chair on call 24/7                   │
│                                              │
│ Stakeholder Management:                      │
│ • Regular customer check-ins                 │
│ • Supplier relationship maintenance          │
│ • Employee morale monitoring                 │
│ • Performance tracking continues             │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ DAY 31-90: TRANSITION PHASE                  │
│ ──────────────────────────────────────────── │
│                                              │
│ Two Scenarios:                               │
│                                              │
│ SCENARIO A: Current CEO Returns              │
│ ☑️ Gradual handback of responsibilities      │
│ ☑️ Knowledge transfer from Interim           │
│ ☑️ Transition communication plan             │
│ ☑️ Interim CEO returns to prior role         │
│ ☑️ Lessons learned documentation             │
│                                              │
│ SCENARIO B: Permanent CEO Search             │
│ ☑️ Search committee formation (Day 31)       │
│    Members: [Board Chair, Owners, FC rep]    │
│ ☑️ Executive search firm engagement          │
│    Firm: [Pre-selected or rapid selection]   │
│ ☑️ Position profile (use Stage 3 output)     │
│ ☑️ Internal candidates consideration         │
│    (Use Stage 5 assessments)                 │
│ ☑️ Search timeline: [60-90 days typical]     │
│                                              │
│ Interim CEO Extension:                       │
│ IF search takes longer:                      │
│ • Interim can be extended by Board vote      │
│ • Maximum total: [6 months]                  │
│ • Consider internal promotion vs. external   │
│                                              │
│ Transition to New CEO:                       │
│ • 30-day overlap if possible                 │
│ • Interim CEO assists onboarding             │
│ • Knowledge transfer documented              │
│ • Interim returns to role (or exit package)  │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ DECISION POINT: Day 60                       │
│                                              │
│ Board must decide by Day 60:                 │
│ ( ) Current CEO returning (date: [____])     │
│ ( ) Permanent search initiated               │
│ ( ) Internal promotion (candidate: [____])   │
│ ( ) Extend interim (max 6 months total)      │
│                                              │
│ ⚠️ No decision by Day 60 = automatic search  │
│                                              │
└──────────────────────────────────────────────┘
```

---

**5. Emergency Contacts & Documentation**

```
┌──────────────────────────────────────────────┐
│ Emergency Contact Protocol                   │
│ ──────────────────────────────────────────── │
│                                              │
│ 24/7 EMERGENCY CONTACTS:                     │
│                                              │
│ Board Chair: [Name, Cell, Email, WhatsApp]   │
│ Lead Indep. Director: [Contact info]         │
│ Legal Counsel: [Contact info + backup]       │
│ Interim CEO: [Contact info]                  │
│ Backup Interim: [Contact info]               │
│ All Owners: [Contact list with preferences]  │
│ Family Council Chair: [Contact info]         │
│ HRD: [Contact info]                          │
│ PR/Communications Lead: [Contact info]       │
│                                              │
│ DOCUMENT STORAGE:                            │
│ ──────────────────────────────────────────── │
│                                              │
│ Physical Copies Stored At:                   │
│ Location 1: [Legal counsel office safe]      │
│ Location 2: [Board Chair secure location]    │
│ Location 3: [Company safe]                   │
│                                              │
│ Documents Included:                          │
│ ☑️ This emergency succession plan            │
│ ☑️ Pre-signed appointment letters            │
│ ☑️ Board resolution templates                │
│ ☑️ Communication templates (all audiences)   │
│ ☑️ Authority matrix for interim CEO          │
│ ☑️ Emergency contact list                    │
│ ☑️ Key passwords/access (sealed envelope)    │
│ ☑️ Banking/financial authorities             │
│ ☑️ Critical vendor/customer contacts         │
│                                              │
│ Digital Copies:                              │
│ ☑️ Encrypted cloud storage (family_id vault) │
│ ☑️ Platform: Constitution Service            │
│ ☑️ Access: Board Chair, Legal, Owners        │
│ ☑️ Backup: Offline encrypted USB             │
│                                              │
│ ANNUAL REVIEW:                               │
│ ☑️ Review emergency plan: [Every January]    │
│ ☑️ Update contacts: [Immediately when change]│
│ ☑️ Refresh documents: [Annually + CEO change]│
│ ☑️ Test protocol: [Desktop simulation yearly]│
│                                              │
│ INSURANCE:                                   │
│ ☑️ Key person insurance on CEO: [$XM]        │
│ ☑️ D&O insurance current                     │
│ ☑️ Business interruption coverage            │
│                                              │
└──────────────────────────────────────────────┘
```

---

#### 💾 Data Collected

**Stage 7 Output:**
```json
{
  "stage_7": {
    "emergency_succession_plan": {
      "trigger_conditions": {
        "unavailability_days": 30,
        "triggers": ["medical_emergency", "sudden_death", "immediate_resignation", "legal_prohibition", "family_crisis"],
        "declaration_authority": {
          "primary": "board_chair",
          "backup": "lead_independent_director",
          "requires": "simple_majority_board_vote"
        },
        "notification_protocol": {
          "timeframe_hours": 24,
          "notify": ["all_owners", "all_board", "exec_team", "fc_chair", "legal", "hrd"]
        }
      },
      "interim_ceo": {
        "primary": {
          "candidate_id": "uuid",
          "name": "Candidate A (COO)",
          "current_role": "Chief Operating Officer",
          "readiness": "high",
          "availability": "immediate"
        },
        "backup": {
          "candidate_id": "uuid",
          "name": "Candidate X (CFO)"
        },
        "third_option": "external_interim_executive",
        "search_firm": "Spencer Stuart"
      },
      "appointment_mechanics": {
        "pre_signed_letter": true,
        "letter_storage": "legal_counsel_safe_deposit",
        "board_resolution_template": true,
        "powers_of_attorney": true,
        "emergency_contacts": true,
        "annual_review": true
      },
      "interim_authority": {
        "term_days": 90,
        "title": "Acting CEO",
        "full_authority": ["day_to_day_ops", "execute_budget", "contracts_lt_100k", "hiring_lt_vp", "external_representation", "board_attendance"],
        "requires_board_approval": ["contracts_gt_100k", "vp_plus_hires", "legal_settlements_gt_50k", "crisis_comms"],
        "prohibited": ["mna_transactions", "strategic_plan_changes", "major_capex", "dividend_policy", "exec_restructuring", "new_debt"]
      },
      "ninety_day_plan": {
        "day_1_7_stabilization": {
          "hour_0_24": ["board_chair_activates", "interim_appointed", "notifications_sent", "crisis_team_convened"],
          "day_1": ["exec_team_address", "dept_briefings"],
          "day_2_3": ["external_comms", "customer_supplier_outreach", "investor_comms"],
          "day_4_7": ["ops_review", "risk_assessment", "first_board_update"]
        },
        "day_8_30_steady_state": {
          "objectives": ["maintain_operations", "execute_existing_plan", "build_confidence"],
          "weekly_activities": ["monday_exec_meeting", "wednesday_board_chair_checkin", "friday_review"],
          "board_engagement": "weekly_updates_biweekly_calls"
        },
        "day_31_90_transition": {
          "scenarios": ["ceo_returns", "permanent_search"],
          "decision_point_day": 60,
          "interim_extension_max_days": 180
        }
      },
      "emergency_contacts": {
        "board_chair": {"name": "", "mobile": "", "email": ""},
        "lead_independent_director": {},
        "legal_counsel": {},
        "storage_locations": ["legal_office_safe", "board_chair_secure", "company_safe"],
        "digital_storage": "constitution_service_encrypted"
      },
      "communication_templates": {
        "internal": "pre_drafted_approved",
        "external": "pre_drafted_approved",
        "media": "holding_statements_ready",
        "customer": "personal_scripts_ready"
      },
      "plan_pdf": "base64_encoded_document",
      "sealed_envelopes": ["appointment_letter_coo", "board_resolution", "access_codes"]
    }
  }
}
```

**Stored in:** Constitution Service (port 8002) → succession_policy.emergency_plan

**Extra security**: Highest encryption level, access restricted to Board Chair, Owners, Legal

---

#### ⭐ Transition

**"Complete Emergency Plan" button:**

**Validation:**
1. ✅ Triggers defined?
2. ✅ Interim CEO(s) designated?
3. ✅ Authority matrix complete?
4. ✅ 90-day timeline filled?
5. ✅ Emergency contacts provided?
6. ⚠️ Pre-signed letters need physical execution?

**Post-completion actions:**
```
⚠️ CRITICAL: Physical Documents Required

Your emergency succession plan is complete digitally.

NEXT STEPS (Outside Workshop):
1. Board Chair schedules meeting with Interim CEO
2. Execute pre-signed appointment letters
3. Store physical copies in 3 secure locations
4. Annual review calendar event created

[Acknowledge] [Export Emergency Plan PDF]
```

**If validation passes:**
- Saves emergency plan
- Generates sealed document packages
- Schedules annual review reminders
- Auto-transition to Screen 8 (RACI & Communications)

---

### Screen 8: Process, RACI & Communications (20 minutes)

#### 🎯 Goal
Define decision-making process for succession, RACI matrix, and stakeholder communication plan

#### ⏱️ Duration
20 minutes

#### 👥 Roles & Permissions

**Consultant (Facilitator):**
- Guides RACI and process design
- Cannot vote on decision rights

**Owners + Board Chair:**
- Full editing permissions
- Define RACI roles
- Approve communication plan

**All Participants:**
- Input on their respective roles
- Clarify responsibilities

---

#### 🎨 Wireframe Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ Header: Succession & Development Workshop                      │
│ Stage 8 of 9: RACI & Communications | ⏱️ 20:00 | 👥 9 online    │
├──────────────────────────┬──────────────────────────────────────┤
│                          │                                      │
│  Facilitator Panel       │  Main Workspace: RACI Builder        │
│  (Left - 20%)            │  (Center - 60%)                      │
│                          │                                      │
│  📊 Key Decisions:       │  ┌──────────────────────────────────┐│
│  ✅ Final CEO Selection  │  │  Succession RACI Matrix          ││
│  ⏳ Development Plans    │  │  ────────────────────────────────││
│  [ ] Emergency Trigger   │  │                                  ││
│  [ ] Policy Updates      │  │  Decision 1: Final CEO Selection ││
│                          │  │  ────────────────────────────────││
│  ⏰ Per decision: ~4min  │  │                                  ││
│                          │  │  Assign RACI Roles:              ││
│  💡 RACI Key:            │  │                                  ││
│  R = Responsible         │  │  Board of Directors:    [A] [C]  ││
│      (Does the work)     │  │  Owners/Shareholders:   [A] [ ]  ││
│  A = Accountable         │  │  Family Council:        [C] [I]  ││
│      (Final decision)    │  │  HRD:                   [R] [ ]  ││
│  C = Consulted           │  │  CEO (Current):         [C] [ ]  ││
│      (Input sought)      │  │  Legal Counsel:         [C] [I]  ││
│  I = Informed            │  │  Search Committee:      [R] [ ]  ││
│      (Kept in loop)      │  │                                  ││
│                          │  │  Validation:                     ││
│  ⚠️ RACI Rules:          │  │  ✅ Board + Owners both 'A'      ││
│  • At least 1 "A"        │  │  ✅ HRD + Search Comm 'R'        ││
│  • At least 1 "R"        │  │  ⚠️ Current CEO 'C' - appropriate││
│  • C/I optional          │  │                                  ││
│                          │  │  Workflow:                       ││
│  [Show Best Practices]   │  │  1. Search Committee shortlists  ││
│                          │  │  2. HRD coordinates process      ││
│                          │  │  3. Board interviews & recommends││
│                          │  │  4. Owners make final decision   ││
│                          │  │  5. FC and Legal consulted       ││
│                          │  │  6. All stakeholders informed    ││
│                          │  │                                  ││
│                          │  │  [💾 Save] [Next Decision →]     ││
│                          │  └──────────────────────────────────┘│
│                          │                                      │
├──────────────────────────┼──────────────────────────────────────┤
│                          │  Review & Update Schedule (Bottom)   │
│                          │                                      │
│                          │  ┌──────────────────────────────────┐│
│                          │  │ Succession Policy: Review Cycle  ││
│                          │  │                                  ││
│                          │  │ Annual Full Review:              ││
│                          │  │ Frequency: [Every January]       ││
│                          │  │ Led by: [Board Succession Comm.] ││
│                          │  │ Participants: [Board, Owners, HRD││
│                          │  │               FC Chair]          ││
│                          │  │                                  ││
│                          │  │ Quarterly Candidate Check-ins:   ││
│                          │  │ Frequency: [Every 3 months]      ││
│                          │  │ Led by: [HRD + Mentors]          ││
│                          │  │ Format: [Development roadmap     ││
│                          │  │          progress review]        ││
│                          │  │                                  ││
│                          │  │ Trigger Events (Immediate Review)││
│                          │  │ • CEO announces retirement       ││
│                          │  │ • Key candidate leaves company   ││
│                          │  │ • Major org/strategy change      ││
│                          │  │ • Emergency plan activation      ││
│                          │  │                                  ││
│                          │  │ [Configure Calendar Integration] ││
│                          │  └──────────────────────────────────┘│
│                          │                                      │
└──────────────────────────┴──────────────────────────────────────┘
│ Footer: [< Previous] [Complete RACI] [💾 Auto-saving...]        │
└─────────────────────────────────────────────────────────────────┘
```

---

#### 📋 RACI Matrix for Key Succession Decisions

**Decision 1: Final CEO Candidate Selection**

```
┌──────────────────────────────────────────────┐
│ Decision 1: Final CEO Candidate Selection    │
│ ──────────────────────────────────────────── │
│                                              │
│ Assign RACI Roles:                           │
│                                              │
│ Board of Directors:         [A] [C]          │
│ Owners/Shareholders:        [A] [ ]          │
│ Family Council:             [C] [I]          │
│ HRD:                        [R] [ ]          │
│ Search Committee:           [R] [ ]          │
│ CEO (Current):              [C] [ ]          │
│ Legal Counsel:              [C] [I]          │
│ Independent Advisor:        [C] [ ]          │
│                                              │
│ Workflow Description:                        │
│ 1. Search Committee (R) creates shortlist    │
│ 2. HRD (R) coordinates interviews            │
│ 3. Board (A) interviews and recommends       │
│ 4. Owners (A) make final decision            │
│ 5. FC, CEO, Legal (C) provide input          │
│ 6. All stakeholders (I) informed             │
│                                              │
│ Decision Threshold:                          │
│ • Board: [Majority recommendation]           │
│ • Owners: [66% approval required]            │
│                                              │
│ Timeline: Final decision within [30] days    │
│ of Board recommendation                      │
│                                              │
│ Tie-Breaker: [Owners have final authority]   │
│                                              │
└──────────────────────────────────────────────┘
```

---

**Decision 2: Approve Development Plans**

```
┌──────────────────────────────────────────────┐
│ Decision 2: Approve Individual Development   │
│              Plans for Successors            │
│ ──────────────────────────────────────────── │
│                                              │
│ Assign RACI Roles:                           │
│                                              │
│ HRD:                        [R] [ ]          │
│ CEO (Current):              [A] [ ]          │
│ Board Succession Comm:      [C] [ ]          │
│ Owners:                     [I] [ ]          │
│ Candidate's Mentor:         [C] [ ]          │
│ Family Council:             [I] [ ]          │
│                                              │
│ Workflow:                                    │
│ 1. HRD (R) drafts development plans          │
│ 2. CEO (A) reviews and approves              │
│ 3. Board Succession Committee (C) advised    │
│ 4. Owners (I) informed of plans              │
│                                              │
│ Review Frequency: [Quarterly]                │
│                                              │
└──────────────────────────────────────────────┘
```

---

**Decision 3: Trigger Emergency Plan**

```
┌──────────────────────────────────────────────┐
│ Decision 3: Activate Emergency Succession    │
│ ──────────────────────────────────────────── │
│                                              │
│ Assign RACI Roles:                           │
│                                              │
│ Board Chair:                [R] [ ]          │
│ Owners:                     [A] [ ]          │
│ HRD:                        [C] [ ]          │
│ Legal Counsel:              [C] [ ]          │
│ Family Council:             [I] [ ]          │
│ Interim CEO:                [I] [ ]          │
│                                              │
│ Workflow:                                    │
│ 1. Board Chair (R) assesses situation        │
│ 2. Consults Legal, HRD (C)                   │
│ 3. Recommends activation to Owners           │
│ 4. Owners (A) approve (simple majority)      │
│ 5. Interim CEO and FC informed               │
│                                              │
│ Timeframe: Decision within [24 hours]        │
│                                              │
└──────────────────────────────────────────────┘
```

---

**Decision 4: Update Succession Policy**

```
┌──────────────────────────────────────────────┐
│ Decision 4: Amend/Update Succession Policy   │
│ ──────────────────────────────────────────── │
│                                              │
│ Assign RACI Roles:                           │
│                                              │
│ Board Chair:                [R] [ ]          │
│ Board Succession Committee: [R] [ ]          │
│ Owners:                     [A] [ ]          │
│ Family Council:             [C] [ ]          │
│ HRD:                        [C] [ ]          │
│ Legal Counsel:              [C] [ ]          │
│ All Stakeholders:           [I] [ ]          │
│                                              │
│ Workflow:                                    │
│ 1. Board Chair/Committee (R) proposes changes│
│ 2. Consults FC, HRD, Legal (C)               │
│ 3. Owners (A) approve changes                │
│ 4. All stakeholders (I) notified             │
│                                              │
│ Approval Threshold: [66% of owners]          │
│                                              │
│ Review Triggers:                             │
│ • Annual scheduled review                    │
│ • Major organizational change                │
│ • CEO transition completed                   │
│ • Material business change                   │
│                                              │
└──────────────────────────────────────────────┘
```

---

#### 📅 Review & Update Calendar

```
┌──────────────────────────────────────────────┐
│ Succession Policy: Review & Update Schedule  │
│ ──────────────────────────────────────────── │
│                                              │
│ ANNUAL FULL REVIEW:                          │
│ ──────────────────────────────────────────── │
│                                              │
│ Frequency: [Every January]                   │
│ Duration: [Half-day session]                 │
│ Led by: [Board Succession Committee Chair]   │
│                                              │
│ Participants:                                │
│ • All Board members (required)               │
│ • All Owners (required)                      │
│ • HRD (required)                             │
│ • Family Council Chair (required)            │
│ • CEO (required)                             │
│ • Legal Counsel (as needed)                  │
│ • Consultant/Advisor (optional)              │
│                                              │
│ Review Agenda:                               │
│ 1. Candidate pipeline status (60 min)        │
│    • Readiness updates                       │
│    • Development progress                    │
│    • New candidates identified               │
│                                              │
│ 2. Policy updates needed? (30 min)           │
│    • Role profiles still accurate?           │
│    • Selection criteria valid?               │
│    • Emergency plan current?                 │
│                                              │
│ 3. Next year priorities (30 min)             │
│    • Development investments                 │
│    • Timeline adjustments                    │
│    • Action items assignment                 │
│                                              │
│ Outputs:                                     │
│ ☑️ Updated candidate assessments             │
│ ☑️ Revised development plans (if needed)     │
│ ☑️ Policy amendments (if needed)             │
│ ☑️ Annual succession report                  │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ QUARTERLY CANDIDATE CHECK-INS:               │
│ ──────────────────────────────────────────── │
│                                              │
│ Frequency: [Every 3 months]                  │
│ Duration: [1-2 hours per candidate]          │
│ Led by: [HRD + Assigned Mentor]              │
│                                              │
│ Participants:                                │
│ • Candidate                                  │
│ • HRD                                        │
│ • Assigned mentor/coach                      │
│ • Direct manager                             │
│                                              │
│ Review Focus:                                │
│ • Development roadmap progress               │
│ • Milestone achievement                      │
│ • 360 feedback review                        │
│ • Challenges and support needed              │
│ • Go/Stop/Pivot decision (at checkpoints)    │
│                                              │
│ Outputs:                                     │
│ ☑️ Progress report                           │
│ ☑️ Updated development plan (if needed)      │
│ ☑️ Escalation to Board (if issues)           │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ BOARD SUCCESSION COMMITTEE:                  │
│ ──────────────────────────────────────────── │
│                                              │
│ Frequency: [Bi-annual meetings]              │
│ Composition:                                 │
│ • [3] Board members (including 1 independent)│
│ • Board Chair (ex-officio)                   │
│                                              │
│ Responsibilities:                            │
│ • Monitor candidate development              │
│ • Review succession readiness                │
│ • Oversee emergency plan updates             │
│ • Recommend policy changes to full Board     │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ TRIGGER EVENTS (Immediate Policy Review):    │
│ ──────────────────────────────────────────── │
│                                              │
│ ☑️ CEO announces retirement intent           │
│    Action: Accelerate succession timeline    │
│                                              │
│ ☑️ Key successor candidate leaves company    │
│    Action: Reassess pipeline, external search│
│                                              │
│ ☑️ Major organizational change               │
│    Action: Review role profiles & criteria   │
│                                              │
│ ☑️ Emergency plan activated                  │
│    Action: Post-crisis review & lessons      │
│                                              │
│ ☑️ Material business strategy change         │
│    Action: Reassess leadership requirements  │
│                                              │
│ ☑️ Significant family governance change      │
│    Action: Align succession with new structure│
│                                              │
└──────────────────────────────────────────────┘
```

---

#### 📢 Communication Plan

```
┌──────────────────────────────────────────────┐
│ Stakeholder Communication Plan               │
│ ──────────────────────────────────────────── │
│                                              │
│ INTERNAL STAKEHOLDERS:                       │
│ ──────────────────────────────────────────── │
│                                              │
│ 1. Executive Team                            │
│    What: Policy existence, their role,       │
│          development opportunities           │
│    When: [Within 2 weeks of policy approval] │
│    How: [CEO-led meeting]                    │
│    Who: [CEO + HRD present]                  │
│                                              │
│ 2. Succession Candidates                     │
│    What: Their inclusion, development plan,  │
│          expectations, confidentiality       │
│    When: [Individual meetings within 2 weeks]│
│    How: [1-on-1 with CEO and/or Board Chair] │
│    Who: [CEO, Board Chair, or assigned mentor│
│                                              │
│ 3. All Employees                             │
│    What: Policy exists (high-level), ensures │
│          continuity, succession planning is  │
│          strength of organization            │
│    When: [Company-wide communication]        │
│    How: [Email + town hall from CEO]         │
│    Who: [CEO presents]                       │
│    Message: "We have robust succession plans │
│            in place for leadership continuity│
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ EXTERNAL STAKEHOLDERS:                       │
│ ──────────────────────────────────────────── │
│                                              │
│ 1. Key Customers                             │
│    What: Company has strong succession plan, │
│          leadership continuity assured       │
│    When: [As appropriate in relationship]    │
│    How: [Personal conversations by CEO]      │
│    Who: [CEO or account owners]              │
│                                              │
│ 2. Major Suppliers/Partners                  │
│    What: Same as customers                   │
│    When: [Opportunistic]                     │
│    How: [Business reviews, exec meetings]    │
│                                              │
│ 3. Investors (if applicable)                 │
│    What: Succession planning process in place│
│          governance strength                 │
│    When: [Annual investor meetings]          │
│    How: [Board Chair or CEO presents]        │
│                                              │
│ 4. Banks/Lenders                             │
│    What: Leadership continuity assured       │
│    When: [As required by covenants]          │
│    How: [Written compliance confirmation]    │
│                                              │
│ 5. Media/Public                              │
│    What: ONLY upon actual CEO transition     │
│    When: [At time of announcement]           │
│    How: [Press release, as needed]           │
│    Who: [Board Chair + CEO]                  │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ CONFIDENTIALITY RULES:                       │
│ ──────────────────────────────────────────── │
│                                              │
│ CONFIDENTIAL (Limited distribution):         │
│ • Specific candidate names & assessments     │
│ • Individual development plans               │
│ • Candidate scores and readiness             │
│ • Emergency succession designations          │
│ • Specific timelines for transitions         │
│                                              │
│ PUBLIC (Can be shared broadly):              │
│ • Policy existence                           │
│ • Succession planning process (general)      │
│ • Commitment to leadership continuity        │
│ • Governance strength                        │
│                                              │
│ Breach of confidentiality:                   │
│ • Serious governance violation               │
│ • Potential termination/removal from role    │
│ • Legal action if damages result             │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ COMMUNICATION TIMING:                        │
│ ──────────────────────────────────────────── │
│                                              │
│ Event: Policy Approved                       │
│ Timeline:                                    │
│ • Week 1: Board, Owners, FC notified         │
│ • Week 2: Executive team, candidates told    │
│ • Week 3: All employees informed (general)   │
│ • Ongoing: External as appropriate           │
│                                              │
│ Event: CEO Transition Announced              │
│ Timeline:                                    │
│ • Day 0: Board, Owners first                 │
│ • Day 1: Executive team, candidates          │
│ • Day 2: All employees                       │
│ • Day 2: Key customers/suppliers (personal)  │
│ • Day 3: Public announcement (if needed)     │
│                                              │
│ Event: Emergency Succession Activated        │
│ Timeline: See Emergency Plan (Stage 7)       │
│                                              │
│ [💾 Save Communication Plan]                 │
└──────────────────────────────────────────────┘
```

---

#### 💾 Data Collected

**Stage 8 Output:**
```json
{
  "stage_8": {
    "raci_matrix": {
      "decisions": [
        {
          "decision_name": "Final CEO Candidate Selection",
          "roles": {
            "board_of_directors": "A",
            "owners_shareholders": "A",
            "family_council": "C",
            "hrd": "R",
            "search_committee": "R",
            "ceo_current": "C",
            "legal_counsel": "C"
          },
          "workflow": "search_committee_shortlists -> hrd_coordinates -> board_interviews_recommends -> owners_decide",
          "decision_threshold": {
            "board": "majority_recommendation",
            "owners": "66_percent_approval"
          },
          "timeline_days": 30,
          "tie_breaker": "owners_final_authority"
        },
        {
          "decision_name": "Approve Development Plans",
          "roles": {
            "hrd": "R",
            "ceo_current": "A",
            "board_succession_committee": "C",
            "owners": "I"
          }
        },
        {
          "decision_name": "Trigger Emergency Plan",
          "roles": {
            "board_chair": "R",
            "owners": "A",
            "hrd": "C",
            "legal_counsel": "C"
          }
        },
        {
          "decision_name": "Update Succession Policy",
          "roles": {
            "board_chair": "R",
            "board_succession_committee": "R",
            "owners": "A",
            "family_council": "C",
            "hrd": "C",
            "legal_counsel": "C"
          },
          "approval_threshold": "66_percent_owners"
        }
      ]
    },
    "review_calendar": {
      "annual_full_review": {
        "frequency": "every_january",
        "duration_hours": 4,
        "led_by": "board_succession_committee_chair",
        "participants": ["all_board", "all_owners", "hrd", "fc_chair", "ceo", "legal"],
        "outputs": ["updated_assessments", "revised_plans", "policy_amendments", "annual_report"]
      },
      "quarterly_candidate_checkins": {
        "frequency": "every_3_months",
        "duration_hours": 2,
        "led_by": "hrd_and_mentor",
        "focus": ["roadmap_progress", "milestones", "360_feedback", "support_needs"]
      },
      "board_succession_committee": {
        "frequency": "bi_annual",
        "composition": ["3_board_members", "1_independent", "board_chair_exofficio"]
      },
      "trigger_events": ["ceo_retirement_announced", "key_candidate_leaves", "major_org_change", "emergency_activated", "strategy_change"]
    },
    "communication_plan": {
      "internal": {
        "executive_team": {
          "what": "policy_existence_their_role_dev_opportunities",
          "when": "within_2_weeks_approval",
          "how": "ceo_led_meeting"
        },
        "succession_candidates": {
          "what": "inclusion_dev_plan_expectations_confidentiality",
          "when": "individual_meetings_2_weeks",
          "how": "1on1_ceo_or_board_chair"
        },
        "all_employees": {
          "what": "policy_exists_high_level_continuity_strength",
          "when": "company_wide_communication",
          "how": "email_townhall_from_ceo"
        }
      },
      "external": {
        "key_customers": "personal_conversations_as_appropriate",
        "suppliers_partners": "business_reviews_opportunistic",
        "investors": "annual_meetings_governance_strength",
        "banks_lenders": "written_compliance_as_required",
        "media_public": "only_upon_actual_transition"
      },
      "confidentiality_rules": {
        "confidential": ["candidate_names", "assessments", "dev_plans", "scores", "emergency_designations", "timelines"],
        "public": ["policy_existence", "process_general", "continuity_commitment", "governance_strength"]
      }
    }
  }
}
```

**Stored in:** Constitution Service (port 8002) → succession_policy.process_and_comms

---

#### ⭐ Transition

**"Complete RACI" button:**

**Validation:**
1. ✅ All key decisions have RACI assigned?
2. ✅ Review calendar configured?
3. ✅ Communication plan complete?

**If validation passes:**
- Saves RACI matrix
- Schedules review calendar events
- Generates communication templates
- Auto-transition to Screen 9 (Summary & Protocol)

---

### Screen 9: Summary & Protocol (10 minutes)

#### 🎯 Goal
Review complete succession policy, document decisions, generate final artifacts

#### ⏱️ Duration
10 minutes

#### 👥 Roles & Permissions

**Consultant (Facilitator):**
- Presents summary
- Confirms next steps
- Cannot vote on final approval

**Owners:**
- Final approval authority
- Vote to adopt policy

**All Participants:**
- Review and confirm understanding
- Sign protocol (electronically)

---

#### 🎨 Wireframe Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ Header: Succession & Development Workshop                      │
│ Stage 9 of 9: Summary & Protocol | ⏱️ 10:00 | 👥 9 online       │
├──────────────────────────┬──────────────────────────────────────┤
│                          │                                      │
│  Facilitator Panel       │  Main Summary Panel                  │
│  (Left - 20%)            │  (Center - 60%)                      │
│                          │                                      │
│  ✅ Workshop Complete    │  ┌──────────────────────────────────┐│
│                          │  │  Succession Policy Summary       ││
│  📊 Stages Completed:    │  │  v0.9 - Ready for Legal Review   ││
│  ✅ 1. Objectives        │  │  ────────────────────────────────││
│  ✅ 2. Critical Roles    │  │                                  ││
│  ✅ 3. Role Profiles     │  │  POLICY COMPONENTS:              ││
│  ✅ 4. Criteria Matrix   │  │                                  ││
│  ✅ 5. Assessments       │  │  ☑️ 4 Roles under policy         ││
│  ✅ 6. Roadmaps          │  │     (CEO, COO, Head Sales, Intl) ││
│  ✅ 7. Emergency Plan    │  │                                  ││
│  ✅ 8. RACI & Comms      │  │  ☑️ CEO Profile & KPIs defined   ││
│  ✅ 9. Summary           │  │     Purpose, responsibilities,   ││
│                          │  │     competencies, constraints    ││
│  ⏰ Total time: 3:25hrs  │  │                                  ││
│                          │  │  ☑️ Selection Criteria Matrix    ││
│  📦 Artifacts Generated: │  │     7 categories, weights total  ││
│  • Succession Policy v0.9│  │     100%, 0-5 scoring scale     ││
│  • Role Profiles (4)     │  │                                  ││
│  • Criteria Matrix       │  │  ☑️ 3 Candidates assessed        ││
│  • Assessment Scores     │  │     Candidate A: 4.1/5 (Ready)   ││
│  • 9-Box Placements      │  │     Candidate B: 3.8/5 (12-24m)  ││
│  • Roadmaps (3)          │  │     Candidate C: 3.2/5 (>24m)    ││
│  • Emergency Plan        │  │                                  ││
│  • RACI Matrix           │  │  ☑️ Development Roadmaps         ││
│  • Communication Plan    │  │     Individual plans for each    ││
│  • Protocol Document     │  │     with checkpoints & timelines ││
│                          │  │                                  ││
│  🎯 Next Steps:          │  │  ☑️ 90-Day Emergency Plan        ││
│  1. Legal review         │  │     Interim CEO designated,      ││
│  2. Owner ratification   │  │     authorities defined          ││
│  3. Communication        │  │                                  ││
│  4. Implementation       │  │  ☑️ RACI & Review Schedule       ││
│                          │  │     Decision rights clarified,   ││
│  [Download All Artifacts]│  │     annual review calendar       ││
│                          │  │                                  ││
│                          │  │  ────────────────────────────────││
│                          │  │                                  ││
│                          │  │  KEY DECISIONS MADE:             ││
│                          │  │                                  ││
│                          │  │  • Succession urgency: CEO (7/10)││
│                          │  │  • Values weight: 20% (highest)  ││
│                          │  │  • Primary successor: Candidate A││
│                          │  │  • Interim CEO: COO (Candidate A)││
│                          │  │  • Annual review: Every January  ││
│                          │  │                                  ││
│                          │  │  ────────────────────────────────││
│                          │  │                                  ││
│                          │  │  [📄 View Full Policy Document]  ││
│                          │  │  [📊 Export All Artifacts]       ││
│                          │  └──────────────────────────────────┘│
│                          │                                      │
├──────────────────────────┼──────────────────────────────────────┤
│                          │  Protocol & Sign-off Panel           │
│                          │                                      │
│                          │  ┌──────────────────────────────────┐│
│                          │  │  Workshop Protocol & Approval    ││
│                          │  │                                  ││
│                          │  │  Session ID: [WS-20251029-001]   ││
│                          │  │  Date: October 29, 2025          ││
│                          │  │  Duration: 3 hours 25 minutes    ││
│                          │  │                                  ││
│                          │  │  Participants (9):               ││
│                          │  │  ☑️ Alex (Consultant/Facilitator)││
│                          │  │  ☑️ Maria (Owner) ✓ Signed       ││
│                          │  │  ☑️ John (Owner) ✓ Signed        ││
│                          │  │  ☑️ Sarah (Family Council)       ││
│                          │  │  ☑️ David (Board Chair) ✓ Signed ││
│                          │  │  ☑️ Emma (Independent Dir)       ││
│                          │  │  ☑️ Michael (HRD)                ││
│                          │  │  ☑️ Lisa (CEO)                   ││
│                          │  │  ☑️ Robert (Legal Counsel)       ││
│                          │  │                                  ││
│                          │  │  OWNER APPROVAL:                 ││
│                          │  │  ────────────────────────────────││
│                          │  │  We, the undersigned Owners,     ││
│                          │  │  approve Succession Policy v0.9  ││
│                          │  │  pending legal review            ││
│                          │  │                                  ││
│                          │  │  Maria _______________  ✅       ││
│                          │  │  John  _______________  ✅       ││
│                          │  │  [Owner 3] ___________  ⏳       ││
│                          │  │                                  ││
│                          │  │  Approval: 2/3 (66%) ✅          ││
│                          │  │                                  ││
│                          │  │  [Sign Protocol Electronically]  ││
│                          │  └──────────────────────────────────┘│
│                          │                                      │
└──────────────────────────┴──────────────────────────────────────┘
│ Footer: [< Previous] [✅ Complete Workshop] [💾 Saving...]      │
└─────────────────────────────────────────────────────────────────┘
```

---

#### 📋 Summary Components

**Policy Summary (Auto-generated):**

```
SUCCESSION POLICY v0.9 SUMMARY

Total Roles: 4 (CEO, COO, Head of Sales, Head of International)
Risk Level: CEO - Critical (7/10 urgency)

SELECTION CRITERIA:
Top 3 Weights: Values (20%), Leadership (20%), Strategy (20%)
Minimum Threshold: 3.0/5.0 overall to qualify

CANDIDATE PIPELINE:
Ready Now: 1 (Candidate A - CEO)
12-24 Months: 1 (Candidate B - CEO)
>24 Months: 1 (Candidate C - CEO)
Total Pipeline Strength: Adequate

EMERGENCY READINESS:
Interim CEO: Designated (COO)
Plan Activated If: CEO unavailable >30 days
Emergency Plan Status: Complete, sealed documents ready

GOVERNANCE:
Review Frequency: Annual (January)
Decision Authority: Owners (final), Board (recommend)
Next Review Date: January 2026
```

---

**Home Assignments (Post-Workshop):**

```
┌──────────────────────────────────────────────┐
│ Post-Workshop Action Items                   │
│ ──────────────────────────────────────────── │
│                                              │
│ 1. HRD - Development Plans Finalization      │
│    Owner: [HRD Name]                         │
│    Due: [10 business days]                   │
│    Deliverable: Detailed development plans   │
│                 for all 3 candidates         │
│                                              │
│ 2. Legal - Policy Review & Compliance        │
│    Owner: [Legal Counsel Name]               │
│    Due: [10 business days]                   │
│    Deliverable: Legal review memo,           │
│                 compliance confirmation,     │
│                 recommended edits            │
│                                              │
│ 3. Board Chair - Board Ratification          │
│    Owner: [Board Chair Name]                 │
│    Due: [Next Board meeting]                 │
│    Deliverable: Bring policy to Board for    │
│                 formal approval vote         │
│                                              │
│ 4. Owners - Shareholder Approval (if needed) │
│    Owner: [Owner Lead Name]                  │
│    Due: [Within 30 days]                     │
│    Deliverable: Formal owner vote recorded   │
│                                              │
│ 5. HRD - Stakeholder Communication           │
│    Owner: [HRD Name]                         │
│    Due: [Per communication plan timeline]    │
│    Deliverable: Execute internal/external    │
│                 communications per Stage 8   │
│                                              │
│ 6. Board Chair - Emergency Documents         │
│    Owner: [Board Chair Name]                 │
│    Due: [Within 2 weeks]                     │
│    Deliverable: Execute pre-signed letters,  │
│                 store in 3 secure locations  │
│                                              │
│ 7. All - Calendar Integration                │
│    Owner: [HRD + Admin]                      │
│    Due: [Within 1 week]                      │
│    Deliverable: All review meetings scheduled│
│                 in calendars                 │
│                                              │
└──────────────────────────────────────────────┘
```

---

#### 📦 Artifacts Package

**Auto-generated and downloadable:**

1. **Succession Policy v0.9** (PDF, 30-40 pages)
   - Complete policy document ready for legal review
   
2. **Role Profiles** (4 × one-pagers, PDF)
   - CEO, COO, Head of Sales, Head of International
   
3. **Selection Criteria Matrix** (Excel + PDF)
   - All 7 categories with weights and sub-criteria
   
4. **Candidate Assessment Report** (PDF, Confidential)
   - Scores, 9-box placements, readiness classifications
   
5. **Development Roadmaps** (3 × PDF)
   - Candidate A, B, C individual plans with timelines
   
6. **Emergency Succession Plan** (PDF, Sealed)
   - 90-day plan, interim CEO, sealed appointment letters
   
7. **RACI Matrix** (Excel + Visual)
   - All succession decisions with roles
   
8. **Communication Plan** (PDF)
   - Stakeholder matrix, messages, timing
   
9. **Workshop Protocol** (PDF, Signed)
   - Session record, participants, decisions, signatures
   
10. **Implementation Checklist** (PDF)
    - Post-workshop action items with owners and dates

---

#### 💾 Data Collected

**Stage 9 Output:**
```json
{
  "stage_9": {
    "workshop_completion": {
      "session_id": "uuid",
      "completed_at": "2025-10-29T17:25:00Z",
      "total_duration_minutes": 205,
      "stages_completed": 9,
      "participants_present": 9
    },
    "policy_summary": {
      "version": "0.9",
      "status": "pending_legal_review",
      "total_roles": 4,
      "candidates_assessed": 3,
      "pipeline_strength": "adequate",
      "emergency_readiness": "complete"
    },
    "owner_approval": {
      "approved_by": ["owner_1_uuid", "owner_2_uuid"],
      "approval_percentage": 66,
      "approval_status": "conditional_on_legal_review",
      "approval_timestamp": "2025-10-29T17:20:00Z"
    },
    "protocol_document": {
      "signed_by": ["maria_uuid", "john_uuid", "david_uuid"],
      "protocol_pdf": "base64_encoded_signed_document"
    },
    "artifacts_generated": [
      {"artifact_name": "succession_policy_v0.9", "format": "pdf", "pages": 35},
      {"artifact_name": "role_profiles", "format": "pdf", "count": 4},
      {"artifact_name": "criteria_matrix", "format": "excel"},
      {"artifact_name": "candidate_assessments", "format": "pdf", "confidential": true},
      {"artifact_name": "development_roadmaps", "format": "pdf", "count": 3},
      {"artifact_name": "emergency_plan", "format": "pdf", "sealed": true},
      {"artifact_name": "raci_matrix", "format": "excel"},
      {"artifact_name": "communication_plan", "format": "pdf"},
      {"artifact_name": "protocol", "format": "pdf", "signed": true},
      {"artifact_name": "implementation_checklist", "format": "pdf"}
    ],
    "post_workshop_actions": [
      {"action": "hrd_finalize_plans", "owner": "hrd", "due_days": 10},
      {"action": "legal_review", "owner": "legal", "due_days": 10},
      {"action": "board_ratification", "owner": "board_chair", "due": "next_board_meeting"},
      {"action": "stakeholder_communication", "owner": "hrd", "due": "per_plan"},
      {"action": "emergency_documents_execution", "owner": "board_chair", "due_days": 14},
      {"action": "calendar_integration", "owner": "hrd_admin", "due_days": 7}
    ]
  }
}
```

**Stored in:** Education Service (port 8006) → workshop_sessions (session complete)

---

#### ⭐ Final Transition

**"Complete Workshop" button:**

**Actions:**
1. Finalizes all session data
2. Generates all artifacts
3. Sends artifacts package to authorized participants
4. Creates post-workshop task list
5. Schedules follow-up meetings
6. Transitions to post-workshop integration phase

**Success Modal:**
```
✅ Workshop Successfully Completed!

Your Succession & Development Policy v0.9 is ready.

📦 Artifacts package sent to:
   • All Owners
   • Board Chair
   • HRD
   • Legal Counsel

📅 Next steps scheduled:
   • Legal review: Due Nov 8, 2025
   • Board ratification: Nov 15, 2025
   • Implementation begins: Nov 22, 2025

🔒 Confidential materials encrypted and 
   access-controlled per family_id

[Download Artifacts] [View Action Items] [Close]
```

---

## 📤 PART 4: Post-Workshop Integration

### Automatic Deployment

**Upon Workshop Completion:**

1. **Constitution Service** receives:
   - Complete Succession Policy v0.9
   - All role profiles
   - Selection criteria matrix
   - Candidate assessments (encrypted)
   - Development roadmaps
   - Emergency plan (sealed)
   - RACI matrix
   - Review calendar

2. **Meeting Service** receives:
   - Annual review meeting (January)
   - Quarterly candidate check-ins
   - Board Succession Committee meetings
   - All roadmap milestone checkpoints

3. **Notification Service** activates:
   - HRD task reminders
   - Legal review deadline
   - Board meeting agenda item
   - Annual review notifications
   - Candidate checkpoint reminders

4. **Auth Service** updates:
   - Access controls for candidate assessments
   - Board Succession Committee members
   - Emergency plan access (Board Chair, Owners, Legal only)

---

### Policy v0.9 → v1.0 Path

```
Workshop Output: v0.9 (Draft for Review)
         ↓
Legal Review (10 days)
         ↓
Board Ratification (Next meeting)
         ↓
Owner Final Approval (66%+ vote)
         ↓
Policy v1.0 (Active)
         ↓
Stakeholder Communication
         ↓
Implementation & Monitoring
```

---

### Success Metrics

**Workshop Success:**
- ✅ All 9 stages completed
- ✅ Owner approval received (66%+)
- ✅ All artifacts generated
- ✅ Post-workshop actions assigned

**Policy Success (Measured Ongoing):**
- CEO transition occurs smoothly when needed
- Candidates progress per development roadmaps
- Annual reviews conducted on schedule
- Emergency plan tested (desktop simulation)
- Bench strength maintained (2-3 candidates per critical role)

---

### Integration with Other Modules

**Links to Decision Making Workshop:**
- CEO selection uses Decision Making module workflows
- RACI matrix integrates with governance RACI
- Owner approval process follows DM patterns

**Links to Conflict Resolution:**
- Succession disputes escalate per CR procedures
- Candidate assessment disagreements use CR mediation

**Links to Family Constitution:**
- Succession policy becomes part of constitution
- Role profiles inform family employment policy
- Emergency plan referenced in governance structure

---

## 🏁 DOCUMENT END

**Total Specification:**
- Pre-Workshop: 1 screen (Orientation)
- Workshop: 9 screens (210 minutes)
- Post-Workshop: Automatic deployment

**Key Features:**
- Real-time collaborative editing
- Role-based permissions
- Encrypted candidate data
- Automatic artifact generation
- Calendar/task integration
- Multi-service architecture

**Artifacts Generated:**
- 10 PDF documents
- 2 Excel workbooks
- Sealed emergency envelopes
- Signed protocol
- Implementation checklist

---

*End of Succession & Development Workshop Technical Specification*          │                                      │
│  Facilitator Panel       │  Main Presentation Area             │
│  (Left - 20% width)      │  (Center - 60% width)               │
│                          │                                      │
│  📋 Script:              │  ┌──────────────────────────────────┐│
│  • Welcome everyone      │  │ 🎯 Workshop Objectives           ││
│  • Emphasize confidential│  │                                  ││
│  • Review agenda         │  │ 1. Define Succession Principles  ││
│  • Set ground rules      │  │    → Clear leadership criteria   ││
│                          │  │                                  ││
│  ⭐ Content Slides:      │  │ 2. Assess Current Talent Pool    ││
│  [● Objectives]          │  │    → Internal/external candidates││
│  [ ] Ground Rules        │  │                                  ││
│  [ ] Confidentiality     │  │ 3. Build Development Roadmaps    ││
│  [ ] Expected Outputs    │  │    → Prepare next leaders        ││
│                          │  │                                  ││
│  ⏰ Stage Timer:         │  │ 4. Create Emergency Protocols    ││
│  ⏱️ 10:00 remaining      │  │    → Crisis readiness            ││
│                          │  │                                  ││
│  🎤 Speaking Queue:      │  │ 5. Establish Review Process      ││
│  (empty)                 │  │    → Ongoing succession planning ││
│                          │  │                                  ││
│                          │  │ Expected Time: 3-3.5 hours       ││
│                          │  └──────────────────────────────────┘│
│                          │                                      │
│                          │  [< Previous] [Next Slide >]        │
│                          │                                      │
├──────────────────────────┼──────────────────────────────────────┤
│                          │  Participants Panel                  │
│                          │  (Right - 20% width)                 │
│                          │                                      │
│                          │  👥 Participants (9)                 │
│                          │  🟢 Alex (Facilitator)               │
│                          │  🟢 Maria (Owner) 👑                 │
│                          │  🟢 John (Owner) 👑                  │
│                          │  🟢 Sarah (FC)                       │
│                          │  🟢 David (Board Chair)              │
│                          │  🟢 Emma (Independent Dir)           │
│                          │  🟢 Michael (HRD)                    │
│                          │  🟢 Lisa (CEO)                       │
│                          │  🟡 Robert (Legal) - on call         │
│                          │                                      │
│                          │  💬 Chat                             │
│                          │  ┌──────────────────────┐           │
│                          │  │ Maria: Ready to start│           │
│                          │  │ David: +1            │           │
│                          │  └──────────────────────┘           │
│                          │  [Type message...]                   │
│                          │                                      │
└──────────────────────────┴──────────────────────────────────────┘
│ Footer: [⏸️ Pause] [📊 Progress: 0/9] [💾 Auto-saving...]      │
└─────────────────────────────────────────────────────────────────┘
```

---

#### 📊 Content Slides (Facilitator advances through)

**Slide 1: Workshop Objectives**
- Define succession principles for CEO and key leadership roles
- Assess current talent pool and readiness
- Create development roadmaps for successors
- Establish emergency succession protocols
- Set up ongoing review and update process

**Slide 2: Ground Rules**
```
✅ Confidentiality - ALL succession discussions stay confidential
✅ Candor - Honest assessment of people and capabilities
✅ No attribution - Comments not linked to individuals in notes
✅ Future-focused - We're building for continuity
✅ Data-driven - Assessments based on evidence
✅ Family first - Decisions serve family and business interests
✅ Time respect - We'll stick to schedule
```

**Interactive checkbox: Each participant checks "I agree to ground rules"**
→ Tracks acceptance in session data

**Slide 3: Confidentiality Emphasis**
```
🔒 CRITICAL: Succession Planning is Highly Sensitive

Why confidentiality matters:
• Protects candidate privacy and dignity
• Prevents market speculation
• Maintains organizational stability
• Enables honest assessment
• Preserves family harmony

What stays confidential:
• All candidate names and assessments
• Performance discussions
• Development plans
• Emergency succession plans
• Any family disagreements

Who has access:
• Workshop participants only
• Encrypted platform storage
• Need-to-know basis post-workshop

Breach of confidentiality = serious governance violation
```

**Slide 4: Expected Outputs**
Visual diagram showing artifacts:
- Succession Policy v0.9 (ready for legal review)
- CEO Role Profile
- Selection Criteria Matrix
- Candidate Assessment (9-box + scores)
- Individual Development Roadmaps
- Emergency Succession Plan (90-day)
- RACI Matrix for succession decisions
- Review Calendar

**Slide 5: Roles in Succession Planning**
Clarify who decides what:
- Owners: Ultimate approval authority
- Board: CEO selection recommendation
- Family Council: Cultural alignment input
- HRD: Assessment & development execution
- CEO: Successor mentorship & transition
- Legal: Compliance & documentation

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
    "confidentiality_acknowledged": [
      {"user_id": "uuid", "acknowledged_at": "timestamp"},
      // ... all participants
    ],
    "parking_lot_items": [],
    "facilitator_notes": "string"
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
- After speaking, hand automatically lowered

**Reaction Emojis:**
- 👍 Agree
- ❓ Question
- ⏰ Need more time
- ✅ Ready to move on

**Chat:**
- Side conversation allowed
- Facilitator can pin important messages
- Auto-archived in session transcript

---

#### ⭐ Transition

**"Next Stage" button (Facilitator only):**
- Checks: All participants accepted ground rules + confidentiality?
- If yes → Auto-transition to Screen 2
- If no → Warning modal: "2 participants haven't accepted. Continue anyway?"
- Transition logged in audit trail

---

### Screen 2: Critical Roles & Risk Assessment (15 minutes)

#### 🎯 Goal
Identify which roles fall under succession policy and assess key person dependency risks

#### ⏱️ Duration
15 minutes

#### 👥 Roles & Permissions

**Consultant (Facilitator):**
- Guides risk assessment discussion
- Cannot vote on role selection

**Owners + Board Chair:**
- Full editing permissions
- Select roles for succession planning
- Vote on risk priorities

**HRD:**
- Provides organizational chart
- Suggests critical roles
- No voting on final list

**CEO:**
- Input on role criticality
- Cannot vote (conflict of interest)

**Others:**
- Read-only view

---

#### 🎨 Wireframe Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ Header: Succession & Development Workshop                      │
│ Stage 2 of 9: Critical Roles & Risks | ⏱️ 15:00 | 👥 9 online   │
├──────────────────────────┬──────────────────────────────────────┤
│                          │                                      │
│  Facilitator Panel       │  Main Canvas: Role Selection         │
│  (Left - 20%)            │  (Center - 60%)                      │
│                          │                                      │
│  📚 Best Practices:      │  ┌──────────────────────────────────┐│
│                          │  │ Select Roles for Succession Plan ││
│  Critical Roles:         │  │                                  ││
│  • CEO (always)          │  │ Available Roles:                 ││
│  • COO/CFO (if exists)   │  │                                  ││
│  • Business unit heads   │  │ ☑️ CEO                           ││
│  • Family business roles │  │ ☑️ COO (Chief Operating Officer) ││
│  • Key technical experts │  │ ☐ CFO (Chief Financial Officer) ││
│                          │  │ ☐ CTO (Chief Technology Officer)││
│  Typical count: 3-7      │  │ ☑️ Head of Sales                 ││
│  roles for family        │  │ ☐ Head of Manufacturing         ││
│  business                │  │ ☑️ Head of International Ops    ││
│                          │  │ ☐ Head of R&D                   ││
│  ⏰ Timer: 15:00         │  │ ☐ General Counsel               ││
│                          │  │ ☐ CHRO                          ││
│                          │  │                                  ││
│  💡 Risk Assessment:     │  │ [+ Add Custom Role]              ││
│                          │  │                                  ││
│  Ask for each role:      │  │ Selected Roles (4):              ││
│  • Impact if vacant?     │  │ 1. CEO - Impact: Critical        ││
│  • How long to replace?  │  │    Difficulty: 12-18 months     ││
│  • Internal candidates?  │  │                                  ││
│  • Succession urgency?   │  │ 2. COO - Impact: High            ││
│                          │  │    Difficulty: 6-12 months      ││
│                          │  │                                  ││
│  [Show Org Chart]        │  │ 3. Head of Sales - Impact: High  ││
│                          │  │    Difficulty: 6-9 months       ││
│                          │  │                                  ││
│                          │  │ 4. Head of Intl - Impact: Medium││
│                          │  │    Difficulty: 6-9 months       ││
│                          │  │                                  ││
│                          │  │ [Continue to Risk Assessment →] ││
│                          │  └──────────────────────────────────┘│
│                          │                                      │
├──────────────────────────┼──────────────────────────────────────┤
│                          │  Risk Assessment Panel (Bottom)      │
│                          │                                      │
│                          │  For each selected role, assess:     │
│                          │  ┌──────────────────────────────────┐│
│                          │  │ CEO Risk Assessment              ││
│                          │  │                                  ││
│                          │  │ Impact if vacant:                ││
│                          │  │ (●) Critical - Business paralysis││
│                          │  │ ( ) High - Major disruption      ││
│                          │  │ ( ) Medium - Manageable impact   ││
│                          │  │                                  ││
│                          │  │ Time to replace:                 ││
│                          │  │ [12-18] months (external search) ││
│                          │  │                                  ││
│                          │  │ Internal candidates ready:       ││
│                          │  │ ( ) Yes, now                     ││
│                          │  │ (●) Yes, but needs development   ││
│                          │  │ ( ) No internal candidates       ││
│                          │  │                                  ││
│                          │  │ Succession urgency:              ││
│                          │  │ Slider: [──────●──] 7/10         ││
│                          │  │ (Current CEO 58 years old)       ││
│                          │  │                                  ││
│                          │  │ [Save] [Next Role →]             ││
│                          │  └──────────────────────────────────┘│
│                          │                                      │
└──────────────────────────┴──────────────────────────────────────┘
│ Footer: [< Previous Stage] [Complete Assessment >] [💾 Saving...]│
└─────────────────────────────────────────────────────────────────┘
```

---

#### 📋 Role Selection Process

**Step 1: Select Roles (Checkbox list)**
- Pre-populated with common roles from org chart
- Owners + Board Chair check boxes for roles to include
- Can add custom roles (e.g., "Family Brand Ambassador")
- Typical selection: 3-7 roles for family business

**Step 2: Risk Assessment Per Role**

For each selected role, complete form:

```
┌────────────────────────────────────────────┐
│ [Role Name] Risk Assessment                │
│ ──────────────────────────────────────────│
│                                            │
│ Impact if vacant:                          │
│ ( ) Critical - Business paralysis/crisis   │
│ ( ) High - Major operational disruption    │
│ ( ) Medium - Manageable with interim plan  │
│ ( ) Low - Minimal short-term impact        │
│                                            │
│ Time to replace externally:                │
│ [___] months                               │
│ (How long to recruit & onboard external?)  │
│                                            │
│ Internal candidates available:             │
│ ( ) Yes, ready now                         │
│ ( ) Yes, but needs development             │
│ ( ) Limited candidates (1 person)          │
│ ( ) No internal candidates                 │
│                                            │
│ Current incumbent age/tenure:              │
│ Age: [__] years                            │
│ Tenure: [__] years in role                │
│                                            │
│ Succession urgency (1-10):                 │
│ Slider: [─────────] __/10                  │
│ 1=Distant future, 10=Immediate need        │
│                                            │
│ Key person dependency risk:                │
│ [x] Unique technical knowledge             │
│ [x] Critical client relationships          │
│ [ ] Founder/family legacy tied to person   │
│ [ ] Key institutional knowledge            │
│ [ ] Custom: ___________________            │
│                                            │
│ Notes (optional):                          │
│ [Text area for special circumstances]      │
│                                            │
│ [Save Assessment] [Next Role →]            │
└────────────────────────────────────────────┘
```

---

#### 💾 Data Collected

**Stage 2 Output:**
```json
{
  "stage_2": {
    "roles_under_succession_policy": [
      {
        "role_id": "uuid",
        "role_title": "CEO",
        "risk_assessment": {
          "impact_if_vacant": "critical",
          "time_to_replace_months": 15,
          "internal_candidates": "needs_development",
          "current_incumbent": {
            "age": 58,
            "tenure_years": 12
          },
          "succession_urgency": 7,
          "key_person_risks": ["unique_knowledge", "client_relationships"],
          "notes": "Current CEO planning retirement in 3-5 years"
        }
      },
      {
        "role_id": "uuid",
        "role_title": "COO",
        "risk_assessment": {...}
      }
      // ... other roles
    ],
    "risk_matrix_snapshot": "base64_encoded_image",
    "total_roles_selected": 4,
    "critical_urgency_roles": ["CEO"],
    "high_urgency_roles": ["COO", "Head of Sales"]
  }
}
```

**Stored in:** Constitution Service (port 8002) → succession_policy.roles

---

#### 📊 Auto-Generated Risk Matrix

**Bottom panel shows heat map:**

```
┌──────────────────────────────────────────────────┐
│  Key Person Risk Matrix                          │
│                                                   │
│     High Impact                                   │
│        ↑                                          │
│        │   [CEO]                                  │
│        │   Urgency: 7/10                          │
│        │   Replace: 15mo                          │
│  Impact│                                          │
│        │         [COO]           [Sales]          │
│        │         Urgency: 5/10   Urgency: 4/10    │
│        │                                          │
│        │                    [Intl]                │
│        │                    Urgency: 3/10         │
│        │                                          │
│     Low└───────────────────────────→              │
│         Low Difficulty      High Difficulty       │
│         to Replace          to Replace            │
│                                                   │
│  Priority Order (by urgency):                     │
│  1. CEO (Critical impact, 7/10 urgency)          │
│  2. COO (High impact, 5/10 urgency)              │
│  3. Head of Sales (High impact, 4/10 urgency)    │
│  4. Head of International (Medium, 3/10 urgency) │
│                                                   │
│  [Export Matrix] [Download Report]               │
└──────────────────────────────────────────────────┘
```

---

#### 🔄 Collaborative Mechanics

**Role Selection:**
- Owners + Board Chair can check/uncheck roles
- Real-time sync across participants
- Majority vote required if disagreement (2 of 3 owners must agree)

**Risk Assessment:**
- HRD provides data (incumbent age, tenure, candidates)
- Board Chair + Owners complete impact assessment
- CEO provides input but cannot vote on own succession

**Auto-Save:**
- Each role assessment auto-saves after completion
- Can return to edit any role before stage completion

---

#### ⭐ Transition

**"Complete Assessment" button:**

**Validation:**
1. ✅ At least 1 role selected (typically CEO minimum)?
2. ✅ All selected roles have completed risk assessment?
3. ⚠️ Any roles marked "Critical" without internal candidates?

**If validation passes:**
- Saves role list and risk assessments
- Generates risk matrix visualization
- Auto-transition to Screen 3 (CEO Profile Builder)
- Transition logged

**Warning if critical gaps:**
```
⚠️ High Risk Identified

CEO role marked as:
• Critical impact if vacant
• No ready internal candidates
• High urgency (7/10)

This workshop will help address this risk by:
→ Defining clear successor criteria
→ Identifying development candidates
→ Creating emergency backup plan

[Acknowledge & Continue]
```

---

### Screen 3: CEO & Key Role Profiles (25 minutes)

#### 🎯 Goal
Define detailed role profile for CEO and other key positions: responsibilities, KPIs, competencies, and constraints

#### ⏱️ Duration
25 minutes

#### 👥 Roles & Permissions

**Consultant (Facilitator):**
- Guides profile building
- Provides role profile templates
- Cannot vote on role requirements

**Owners + Board Chair:**
- Full editing permissions
- Define role requirements
- Approve final profiles

**CEO (Current):**
- Input on role reality
- Cannot unilaterally define successor requirements (conflict of interest)

**HRD:**
- Provides competency frameworks
- Suggests KPIs
- No voting rights

**Others:**
- Read-only view

---

#### 🎨 Wireframe Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ Header: Succession & Development Workshop                      │
│ Stage 3 of 9: Role Profiles | ⏱️ 25:00 | 👥 9 online            │
├──────────────────────────┬──────────────────────────────────────┤
│                          │                                      │
│  Facilitator Panel       │  Main Workspace: Role Profile Builder│
│  (Left - 20%)            │  (Center - 60%)                      │
│                          │                                      │
│  📊 Roles to Profile:    │  ┌──────────────────────────────────┐│
│  [●] CEO                 │  │  CEO Role Profile (One-Pager)    ││
│  [ ] COO                 │  │  ────────────────────────────────││
│  [ ] Head of Sales       │  │                                  ││
│  [ ] Head of Intl        │  │  Section 1: Role Purpose         ││
│                          │  │  ────────────────────────────────││
│  ⏰ Per role: ~6 min     │  │  [Text editor - 200 char limit]  ││
│                          │  │  "Lead the company to achieve    ││
│  💡 Profile Components:  │  │   profitable growth while        ││
│                          │  │   preserving family values and   ││
│  1. Role Purpose         │  │   building sustainable legacy"   ││
│  2. Top 5 Responsibilities│ │                                  ││
│  3. KPIs (12-24 months)  │  │  💡 Suggested purpose templates: ││
│  4. Required Competencies│  │  [Load Template ▼]               ││
│  5. Constraints          │  │                                  ││
│                          │  │  Section 2: Top 5 Responsibilities│
│  📚 Template Library:    │  │  ────────────────────────────────││
│  [Load Template ▼]       │  │  1. [Text field - 100 chars]     ││
│  • Family Business CEO   │  │     "Set strategic direction and ││
│  • Public Company CEO    │  │      ensure Board alignment"     ││
│  • Growth-Stage CEO      │  │                                  ││
│  • Founder-CEO           │  │  2. [Text field]                 ││
│                          │  │     "Drive financial performance ││
│  ⚖️ Balance to strike:   │  │      and shareholder returns"    ││
│                          │  │                                  ││
│  CEO should be:          │  │  3. [Text field]                 ││
│  • Strategic leader      │  │     "Build & develop leadership  ││
│  • Operational executor  │  │      team & talent pipeline"     ││
│  • Family steward        │  │                                  ││
│  • Relationship builder  │  │  4. [Text field]                 ││
│  • Change agent          │  │     "Represent company to        ││
│                          │  │      external stakeholders"      ││
│  [Show Full Template]    │  │                                  ││
│                          │  │  5. [Text field]                 ││
│                          │  │     "Ensure governance, risk,    ││
│                          │  │      and compliance excellence"  ││
│                          │  │                                  ││
│                          │  │  [+ Add Responsibility] (max 7)  ││
│                          │  │                                  ││
│                          │  │  [Continue to KPIs →]            ││
│                          │  └──────────────────────────────────┘│
│                          │                                      │
├──────────────────────────┼──────────────────────────────────────┤
│                          │  Participants Panel (Right - 20%)    │
│                          │                                      │
│                          │  👥 Active Editors (3):              │
│                          │  Maria (editing responsibilities...) │
│                          │  David (reviewing purpose)           │
│                          │  Michael (preparing KPIs)            │
│                          │                                      │
│                          │  💬 Chat:                            │
│                          │  Lisa (CEO): "Purpose should mention │
│                          │               innovation"            │
│                          │  John: "Agree - add to purpose"      │
│                          │  Maria: "Done ✓"                     │
│                          │                                      │
└──────────────────────────┴──────────────────────────────────────┘
│ Footer: [< Previous] [Save Profile] [Next Role >] [💾 Saving...]│
└─────────────────────────────────────────────────────────────────┘
```

---

#### 📋 CEO Role Profile Builder (5 Sections)

---

**Section 1: Role Purpose (One Sentence)**

```
What is the fundamental purpose of this role?

[Text editor - 200 character limit]

Example purposes:
• "Lead the organization to achieve sustainable profitable 
   growth while preserving family values and legacy"
• "Transform the business into a market leader through 
   innovation and operational excellence"
• "Steward the family enterprise for multi-generational 
   continuity and prosperity"

💡 Keep it concise, inspirational, and aligned with family values

[Load Template ▼]  [AI Suggest]
```

---

**Section 2: Top 5 Responsibilities**

```
What are the CEO's primary areas of accountability?

Priority order (drag to reorder):

1. [Text field - 100 chars]
   "Set strategic direction and ensure Board alignment"
   
2. [Text field]
   "Drive financial performance and shareholder returns"
   
3. [Text field]
   "Build and develop leadership team & talent pipeline"
   
4. [Text field]
   "Represent company to external stakeholders"
   
5. [Text field]
   "Ensure governance, risk, and compliance excellence"

[+ Add Responsibility] (max 7 total)

💡 Focus on outcomes, not activities
💡 Make responsibilities measurable where possible
```

---

**Section 3: KPIs (12-24 month targets)**

```
How will CEO performance be measured?

Financial KPIs:
☑️ Revenue Growth: [___]% annually
☑️ EBITDA Margin: [___]% minimum
☑️ Return on Equity: [___]% minimum
☐ Free Cash Flow: $[___]M minimum
☐ Custom: [________________]

Strategic KPIs:
☑️ Market Share Growth: [___] percentage points
☑️ New Product Revenue: [___]% of total
☐ Geographic Expansion: [___] new markets
☐ Customer Satisfaction: [___]/10 NPS score
☐ Custom: [________________]

Organizational KPIs:
☑️ Employee Engagement: [___]% favorable
☑️ Leadership Bench Strength: [___] ready successors
☑️ Diversity Targets: [___]% leadership
☐ Turnover (key roles): < [___]% annually
☐ Custom: [________________]

Governance KPIs:
☑️ Board Effectiveness Score: [___]/10
☐ Compliance: Zero material breaches
☐ Risk Management: All risks within appetite
☐ Custom: [________________]

[+ Add Custom KPI]

💡 Balance short-term results with long-term value creation
💡 Include both quantitative and qualitative metrics
💡 Align with family's strategic priorities
```

---

**Section 4: Required Competencies**

```
What skills, experiences, and attributes are essential?

Core Leadership Competencies:
☑️ Strategic Thinking & Visioning
☑️ Decision Making & Judgment
☑️ Leading Change & Transformation
☑️ Building High-Performance Teams
☑️ Stakeholder Management
☑️ Financial Acumen
☑️ Operational Excellence
☑️ Risk Management

Family Business Specific:
☑️ Family Dynamics Navigation
☑️ Multi-Generational Leadership
☑️ Values Stewardship
☑️ Long-Term Orientation
☐ Conflict Resolution (family contexts)
☐ Legacy Mindset

Technical/Industry:
☐ Industry Expertise: [Specify: _______________]
☐ Technical Knowledge: [Specify: _______________]
☐ Market Knowledge: [Specify: _______________]

Experience Requirements:
Minimum years total experience: [15] years
Minimum years leadership experience: [10] years
Minimum years P&L responsibility: [5] years

Required experiences (check all that apply):
☑️ External work experience (non-family business): [3]+ years
☑️ Multi-functional leadership (led 2+ functions)
☐ International experience
☐ M&A transaction experience
☐ Turnaround/crisis management
☐ IPO or public company experience
☑️ Board exposure or governance training

Educational Requirements:
Minimum education: [Bachelor's degree ▼]
Preferred: [MBA or advanced degree]
Certifications: [Optional: _______________]

Personal Attributes:
☑️ Integrity & Ethical Leadership
☑️ Emotional Intelligence
☑️ Resilience & Adaptability
☑️ Collaborative Style
☑️ Communication Excellence
☐ Entrepreneurial Mindset
☐ Innovation Drive
☐ Customer Centricity

[+ Add Custom Competency]
```

---

**Section 5: Constraints & Disqualifiers**

```
What limitations or conflicts are unacceptable?

Role Constraints:
☑️ Cannot serve on competing company boards
☑️ Must reside within [50] miles of headquarters
☐ Cannot hold significant outside business interests
☐ Time commitment: [90]%+ to company
☐ Travel requirements: up to [30]% time
☐ Custom: [_________________________]

Governance Constraints:
☑️ Must attend all Board meetings (unless excused)
☑️ Subject to annual Board evaluation
☑️ Term length: [Indefinite / 5-year renewable ▼]
☐ Mandatory retirement age: [___] years
☐ Custom: [_________________________]

Family Business Specific:
☑️ Must align with family values
☐ Family member preference (but not required)
☑️ Subject to family governance policies
☐ Cannot be related to more than [__] Board members
☐ Custom: [_________________________]

Disqualifying Factors:
☑️ Criminal conviction
☑️ Bankruptcy or financial misconduct
☑️ Material breach of prior employment agreements
☑️ Serious reputation risk
☐ Regulatory prohibition
☐ Conflict of interest that cannot be resolved
☐ Custom: [_________________________]

[+ Add Constraint]

💡 Be specific but not overly restrictive
💡 Balance family preferences with business needs
```

---

#### 💾 Data Collected

**Stage 3 Output:**
```json
{
  "stage_3": {
    "role_profiles": [
      {
        "role_id": "uuid",
        "role_title": "CEO",
        "profile": {
          "purpose": "Lead the organization to achieve sustainable profitable growth while preserving family values",
          "top_responsibilities": [
            "Set strategic direction and ensure Board alignment",
            "Drive financial performance and shareholder returns",
            "Build leadership team and talent pipeline",
            "Represent company to external stakeholders",
            "Ensure governance and compliance excellence"
          ],
          "kpis": {
            "financial": [
              {"metric": "revenue_growth", "target": "10% annually"},
              {"metric": "ebitda_margin", "target": "20% minimum"},
              {"metric": "roe", "target": "15% minimum"}
            ],
            "strategic": [
              {"metric": "market_share_growth", "target": "2 percentage points"},
              {"metric": "new_product_revenue", "target": "15% of total"}
            ],
            "organizational": [
              {"metric": "employee_engagement", "target": "80% favorable"},
              {"metric": "leadership_bench", "target": "2 ready successors per role"}
            ],
            "governance": [
              {"metric": "board_effectiveness", "target": "8/10 score"}
            ]
          },
          "competencies": {
            "core_leadership": ["strategic_thinking", "decision_making", "change_leadership", "team_building"],
            "family_business": ["family_dynamics", "multi_generational", "values_stewardship"],
            "experience_required": {
              "total_years": 15,
              "leadership_years": 10,
              "pl_responsibility_years": 5,
              "external_experience_years": 3,
              "must_have_experiences": ["external_work", "multi_functional"]
            },
            "education": {
              "minimum": "bachelors",
              "preferred": "mba_or_advanced"
            },
            "personal_attributes": ["integrity", "emotional_intelligence", "resilience", "collaboration"]
          },
          "constraints": {
            "role_constraints": ["no_competing_boards", "50_mile_residence"],
            "governance_constraints": ["attend_all_board_meetings", "annual_evaluation"],
            "family_constraints": ["align_family_values", "subject_to_governance"],
            "disqualifiers": ["criminal_conviction", "bankruptcy", "breach_agreements", "reputation_risk"]
          }
        },
        "profile_snapshot": "base64_encoded_one_pager_pdf"
      },
      {
        "role_id": "uuid",
        "role_title": "COO",
        "profile": {...}
      }
      // ... other roles
    ]
  }
}
```

**Stored in:** Constitution Service (port 8002) → succession_policy.role_profiles

---

#### 🔄 Collaborative Mechanics

**Template Loading:**
```
Facilitator can load role profile templates:

┌──────────────────────────────────────────┐
│ 📚 Load CEO Profile Template             │
│                                          │
│ Family Business CEO (Traditional):       │
│ • Stewardship and continuity focus       │
│ • Strong family values alignment         │
│ • Conservative financial targets         │
│                                          │
│ Growth-Stage CEO:                        │
│ • Innovation and expansion focus         │
│ • Aggressive financial targets           │
│ • Change management emphasis             │
│                                          │
│ Public Company CEO:                      │
│ • Investor relations focus               │
│ • Quarterly performance emphasis         │
│ • Governance and compliance heavy        │
│                                          │
│ [Preview] [Load & Customize]             │
└──────────────────────────────────────────┘
```

**Real-time Co-editing:**
- Multiple participants can edit different sections
- Active editors shown with colored cursors
- Auto-save every 5 seconds
- Conflict resolution: Last edit wins with version history

**AI Suggestions:**
- System suggests KPIs based on industry and company size
- Competency recommendations based on role type
- Purpose statement variations

**One-Pager Preview:**
```
Right panel shows live preview of formatted profile:

┌────────────────────────────────────────┐
│ CEO ROLE PROFILE                       │
│ Last Updated: October 29, 2025         │
│ ──────────────────────────────────────│
│                                        │
│ PURPOSE                                │
│ Lead the organization to achieve...    │
│                                        │
│ TOP 5 RESPONSIBILITIES                 │
│ 1. Set strategic direction...          │
│ 2. Drive financial performance...      │
│ ...                                    │
│                                        │
│ [View Full Profile]                    │
│ [Download PDF]                         │
└────────────────────────────────────────┘
```

---

#### ⭐ Transition

**"Save Profile" button (per role):**

**Validation:**
1. ✅ Purpose statement completed?
2. ✅ At least 3 responsibilities defined?
3. ✅ At least 3 KPIs set?
4. ✅ Core competencies selected?
5. ⚠️ No disqualifiers that would exclude all candidates?

**If validation passes:**
- Saves role profile
- Generates one-pager PDF
- Moves to next role in queue OR transitions to Screen 4 if all roles complete
- Profile available for download

**After all roles completed:**
- Bundle all role profiles
- Auto-transition to Screen 4 (Selection Criteria)
- Transition logged

---

### Screen 4: Selection Criteria Matrix & Weights (35 minutes)

#### 🎯 Goal
Define evaluation criteria for successor candidates and assign weights to create objective scoring system

**Note**: This is a LONG section - detailed candidate evaluation framework

#### ⏱️ Duration
35 minutes

#### 👥 Roles & Permissions

**Consultant (Facilitator):**
- Guides criteria definition
- Provides industry benchmarks
- Cannot vote on weights

**Owners + Board Chair:**
- Full editing permissions
- Define criteria
- Set weights (must sum to 100%)
- Vote on final matrix

**Family Council:**
- Input on values/culture fit criteria
- No voting on business criteria

**HRD:**
- Suggests assessment methods
- Provides competency frameworks
- No voting on weights

**Others:**
- Read-only view

---

#### 🎨 Wireframe Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ Header: Succession & Development Workshop                      │
│ Stage 4 of 9: Selection Criteria | ⏱️ 35:00 | 👥 9 online       │
├──────────────────────────┬──────────────────────────────────────┤
│                          │                                      │
│  Facilitator Panel       │  Main Workspace: Criteria Builder    │
│  (Left - 20%)            │  (Center - 60%)                      │
│                          │                                      │
│  📊 Criteria Categories: │  ┌──────────────────────────────────┐│
│  ✅ Values & Culture     │  │  Selection Criteria Matrix       ││
│  ✅ Leadership           │  │  (Weights must sum to 100%)      ││
│  ⏳ Strategy & P&L       │  │  ────────────────────────────────││
│  [ ] Track Record        │  │                                  ││
│  [ ] Stakeholder Fit     │  │  Criterion Category 1:           ││
│  [ ] External Experience │  │  VALUES & CULTURE FIT            ││
│  [ ] Risk & Compliance   │  │                                  ││
│                          │  │  Weight: [20]% ◄────────►        ││
│  ⏰ Per category: ~5min  │  │                                  ││
│                          │  │  Sub-criteria (check to include):││
│  💡 Typical Weights:     │  │  ☑️ Family values alignment      ││
│                          │  │     Assessment: [Interview ▼]    ││
│  Values: 15-25%          │  │     Scale: 0-5                   ││
│  Leadership: 20-25%      │  │                                  ││
│  Strategy: 15-20%        │  │  ☑️ Cultural fit with organization│
│  Track Record: 15-20%    │  │     Assessment: [360 feedback ▼] ││
│  Stakeholder: 10-15%     │  │     Scale: 0-5                   ││
│  External Exp: 5-15%     │  │                                  ││
│  Risk: 5-10%             │  │  ☑️ Long-term orientation        ││
│                          │  │     Assessment: [Behavioral ▼]   ││
│  Total must = 100%       │  │     Scale: 0-5                   ││
│                          │  │                                  ││
│  📚 Templates:           │  │  ☐ Ethical leadership            ││
│  [Load Template ▼]       │  │  ☐ Humility & service mindset    ││
│  • Family Business Std   │  │  [+ Add Custom Sub-criterion]    ││
│  • Performance-Focused   │  │                                  ││
│  • NextGen Development   │  │  How scored:                     ││
│                          │  │  Average of sub-criteria scores  ││
│  [Show Scoring Guide]    │  │  × Category weight (20%)         ││
│                          │  │  = Weighted score                ││
│                          │  │                                  ││
│                          │  │  [💾 Save Category] [Next →]     ││
│                          │  └──────────────────────────────────┘│
│                          │                                      │
├──────────────────────────┼──────────────────────────────────────┤
│                          │  Weight Allocation Panel (Right)     │
│                          │                                      │
│                          │  📊 Total Weight Distribution:       │
│                          │  ┌──────────────────────────────────┐│
│                          │  │ Values & Culture:     20% ████░░││
│                          │  │ Leadership:           20% ████░░││
│                          │  │ Strategy & P&L:       __% ░░░░░░││
│                          │  │ Track Record:         __% ░░░░░░││
│                          │  │ Stakeholder Fit:      __% ░░░░░░││
│                          │  │ External Experience:  __% ░░░░░░││
│                          │  │ Risk & Compliance:    __% ░░░░░░││
│                          │  │                                  ││
│                          │  │ TOTAL: 40% / 100%                ││
│                          │  │ ⚠️ Must reach 100% to continue   ││
│                          │  └──────────────────────────────────┘│
│                          │                                      │
│                          │  💬 Chat:                            │
│                          │  Maria: "20% for values feels right"│
│                          │  John: "Agree - family fit crucial" │
│                          │  David: "Need more weight on results│
│                          │                                      │
└──────────────────────────┴──────────────────────────────────────┘
│ Footer: [< Previous] [Complete Matrix] [💾 Auto-saving...]     │
└─────────────────────────────────────────────────────────────────┘
```

---

#### 📋 Selection Criteria Matrix (7 Categories)

---

**Category 1: Values & Cultural Fit (Typical: 15-25%)**

```
┌──────────────────────────────────────────────┐
│ Category 1: VALUES & CULTURAL FIT            │
│ Weight: [20]% ◄──────────►                   │
│ ──────────────────────────────────────────── │
│                                              │
│ Sub-Criteria (select all that apply):        │
│                                              │
│ ☑️ Family values alignment                   │
│    What it measures: How well candidate      │
│    embodies family's core values             │
│    Assessment method: [Structured interview ▼]│
│    Scale: 0-5 (0=Poor fit, 5=Perfect fit)    │
│                                              │
│ ☑️ Cultural fit with organization            │
│    What it measures: Compatibility with      │
│    company culture and way of working        │
│    Assessment: [360 feedback + interviews ▼] │
│    Scale: 0-5                                │
│                                              │
│ ☑️ Long-term orientation                     │
│    What it measures: Focus on sustainable    │
│    value vs. short-term gains                │
│    Assessment: [Behavioral interview ▼]      │
│    Scale: 0-5                                │
│                                              │
│ ☐ Ethical leadership & integrity             │
│ ☐ Humility & service mindset                 │
│ ☐ Commitment to family legacy                │
│ [+ Add Custom Sub-criterion]                 │
│                                              │
│ Scoring Method:                              │
│ ( ) Average all sub-criteria                 │
│ (●) Weighted average of sub-criteria         │
│ ( ) Must pass all (threshold)                │
│                                              │
│ Minimum threshold to pass:                   │
│ [3.5]/5.0 average required                   │
│                                              │
│ [Save Category] [Next Category →]            │
└──────────────────────────────────────────────┘
```

---

**Category 2: Leadership of People & Teams (Typical: 20-25%)**

```
┌──────────────────────────────────────────────┐
│ Category 2: LEADERSHIP OF PEOPLE & TEAMS     │
│ Weight: [20]% ◄──────────►                   │
│ ──────────────────────────────────────────── │
│                                              │
│ Sub-Criteria:                                │
│                                              │
│ ☑️ Building and developing teams             │
│    Assessment: [360 feedback + references ▼] │
│    Scale: 0-5                                │
│                                              │
│ ☑️ Inspiring and motivating others           │
│    Assessment: [360 feedback ▼]              │
│    Scale: 0-5                                │
│                                              │
│ ☑️ Change management and transformation      │
│    Assessment: [Track record + cases ▼]      │
│    Scale: 0-5                                │
│                                              │
│ ☑️ Coaching and mentoring capability         │
│    Assessment: [References + examples ▼]     │
│    Scale: 0-5                                │
│                                              │
│ ☐ Conflict resolution skills                 │
│ ☐ Delegation and empowerment                 │
│ ☐ Diversity and inclusion commitment         │
│ [+ Add Custom]                               │
│                                              │
│ Evidence Required:                           │
│ [x] Direct reports feedback (360)            │
│ [x] Peer feedback (360)                      │
│ [x] Examples of team building                │
│ [ ] Leadership assessment center results     │
│                                              │
│ Minimum threshold: [3.5]/5.0                 │
│                                              │
│ [Save Category] [Next Category →]            │
└──────────────────────────────────────────────┘
```

---

**Category 3: Strategic Thinking & P&L Management (Typical: 15-20%)**

```
┌──────────────────────────────────────────────┐
│ Category 3: STRATEGIC THINKING & P&L         │
│ Weight: [20]% ◄──────────►                   │
│ ──────────────────────────────────────────── │
│                                              │
│ Sub-Criteria:                                │
│                                              │
│ ☑️ Strategic vision and planning             │
│    Assessment: [Case study + interview ▼]    │
│    Scale: 0-5                                │
│                                              │
│ ☑️ Financial acumen & P&L ownership          │
│    Assessment: [Track record + test ▼]       │
│    Scale: 0-5                                │
│                                              │
│ ☑️ Business model innovation                 │
│    Assessment: [Examples + creativity test ▼]│
│    Scale: 0-5                                │
│                                              │
│ ☑️ Market and competitive analysis           │
│    Assessment: [Case study ▼]                │
│    Scale: 0-5                                │
│                                              │
│ ☐ Growth strategy development                │
│ ☐ Resource allocation decisions              │
│ ☐ Long-term value creation                   │
│ [+ Add Custom]                               │
│                                              │
│ Evidence Required:                           │
│ [x] P&L track record (revenue, margins)      │
│ [x] Strategic plan examples                  │
│ [x] Financial literacy test                  │
│ [ ] Business case presentation               │
│                                              │
│ Minimum threshold: [3.0]/5.0                 │
│                                              │
│ [Save Category] [Next Category →]            │
└──────────────────────────────────────────────┘
```

---

**Category 4: Track Record & Results (Typical: 15-20%)**

```
┌──────────────────────────────────────────────┐
│ Category 4: TRACK RECORD & RESULTS (3 years) │
│ Weight: [15]% ◄──────────►                   │
│ ──────────────────────────────────────────── │
│                                              │
│ Sub-Criteria:                                │
│                                              │
│ ☑️ Financial performance delivered           │
│    Metrics:                                  │
│    • Revenue growth vs. target               │
│    • Margin improvement                      │
│    • Cost management                         │
│    Assessment: [Historical data ▼]           │
│    Scale: 0-5                                │
│                                              │
│ ☑️ Strategic initiatives completed           │
│    Metrics:                                  │
│    • On-time delivery                        │
│    • Budget adherence                        │
│    • Impact achieved                         │
│    Assessment: [Project reviews ▼]           │
│    Scale: 0-5                                │
│                                              │
│ ☑️ Operational excellence                    │
│    Metrics:                                  │
│    • Process improvements                    │
│    • Quality metrics                         │
│    • Customer satisfaction                   │
│    Assessment: [Performance data ▼]          │
│    Scale: 0-5                                │
│                                              │
│ ☐ Crisis management (if applicable)          │
│ ☐ Turnaround success (if applicable)         │
│ [+ Add Custom]                               │
│                                              │
│ Time Period for Assessment:                  │
│ Last [3] years of performance                │
│                                              │
│ Weight Recent vs. Historical:                │
│ Last year: [50]%                             │
│ Prior 2 years: [50]%                         │
│                                              │
│ Minimum threshold: [3.0]/5.0                 │
│                                              │
│ [Save Category] [Next Category →]            │
└──────────────────────────────────────────────┘
```

---

**Category 5: Stakeholder Relationships (Typical: 10-15%)**

```
┌──────────────────────────────────────────────┐
│ Category 5: STAKEHOLDER RELATIONSHIPS         │
│ Weight: [10]% ◄──────────►                   │
│ ──────────────────────────────────────────── │
│                                              │
│ Sub-Criteria:                                │
│                                              │
│ ☑️ Owner/shareholder relationship            │
│    What it measures: Trust and communication │
│    with ownership group                      │
│    Assessment: [Owner interviews ▼]          │
│    Scale: 0-5                                │
│                                              │
│ ☑️ Board effectiveness                       │
│    What it measures: Ability to work with    │
│    and support Board governance              │
│    Assessment: [Board member feedback ▼]     │
│    Scale: 0-5                                │
│                                              │
│ ☑️ External relationship building            │
│    Stakeholders: Customers, partners,        │
│    community, government                     │
│    Assessment: [References + examples ▼]     │
│    Scale: 0-5                                │
│                                              │
│ ☐ Family Council collaboration               │
│ ☐ Employee trust and engagement              │
│ ☐ Industry reputation and network            │
│ [+ Add Custom]                               │
│                                              │
│ Evidence Required:                           │
│ [x] Stakeholder interviews                   │
│ [x] Relationship examples                    │
│ [ ] Net Promoter Score (if applicable)       │
│                                              │
│ Minimum threshold: [3.5]/5.0                 │
│                                              │
│ [Save Category] [Next Category →]            │
└──────────────────────────────────────────────┘
```

---

**Category 6: External Experience (Typical: 5-15%)**

```
┌──────────────────────────────────────────────┐
│ Category 6: EXTERNAL EXPERIENCE               │
│ Weight: [10]% ◄──────────►                   │
│ ──────────────────────────────────────────── │
│                                              │
│ Why this matters:                            │
│ External experience brings:                  │
│ • Fresh perspectives                         │
│ • Best practices from other organizations    │
│ • Credibility with non-family stakeholders   │
│ • Proof of marketability                     │
│                                              │
│ Sub-Criteria:                                │
│                                              │
│ ☑️ Years of external experience              │
│    Requirement: Minimum [3] years outside    │
│    family business (any role)                │
│    Assessment: [CV verification ▼]           │
│    Scale: 0-5                                │
│    (0=None, 3=Min met, 5=Extensive)          │
│                                              │
│ ☑️ Quality of external experience            │
│    Factors: Company reputation, role level,  │
│    achievement, relevance                    │
│    Assessment: [CV evaluation ▼]             │
│    Scale: 0-5                                │
│                                              │
│ ☐ Industry diversity (multiple sectors)      │
│ ☐ Geographic diversity (international)       │
│ ☐ Functional diversity (multiple roles)      │
│ [+ Add Custom]                               │
│                                              │
│ Alternative Credit:                          │
│ [ ] Board service on external company        │
│ [ ] Significant consulting/advisory roles    │
│ [ ] Entrepreneurial venture outside family   │
│                                              │
│ Rationale for Weight:                        │
│ Why [10]% weight?                            │
│ [Text field for family's reasoning]          │
│ "Demonstrates independence and validates     │
│  candidate has options beyond family         │
│  business, proving merit-based selection"    │
│                                              │
│ Minimum threshold: [2.0]/5.0                 │
│ (Flexible - family preference)               │
│                                              │
│ [Save Category] [Next Category →]            │
└──────────────────────────────────────────────┘
```

---

**Category 7: Risk Management & Compliance (Typical: 5-10%)**

```
┌──────────────────────────────────────────────┐
│ Category 7: RISK MANAGEMENT & COMPLIANCE      │
│ Weight: [5]% ◄──────────►                    │
│ ──────────────────────────────────────────── │
│                                              │
│ Sub-Criteria:                                │
│                                              │
│ ☑️ Risk identification and mitigation        │
│    Assessment: [Case study + track record ▼] │
│    Scale: 0-5                                │
│                                              │
│ ☑️ Compliance and governance mindset         │
│    Assessment: [Interview + history ▼]       │
│    Scale: 0-5                                │
│                                              │
│ ☑️ Crisis management capability              │
│    Assessment: [Examples + simulation ▼]     │
│    Scale: 0-5                                │
│                                              │
│ ☐ Legal and regulatory knowledge             │
│ ☐ Internal controls discipline               │
│ [+ Add Custom]                               │
│                                              │
│ Red Flags (Auto-fail):                       │
│ [x] History of compliance violations         │
│ [x] Material litigation involvement          │
│ [x] Reputation risk issues                   │
│ [x] Background check failures                │
│                                              │
│ Minimum threshold: [3.0]/5.0                 │
│                                              │
│ [Save Category] [Complete Matrix →]          │
└──────────────────────────────────────────────┘
```

---

#### 📊 Weight Allocation & Validation

**Real-time Weight Tracker (Right Panel):**

```
┌──────────────────────────────────────────────┐
│ 📊 Criteria Weight Distribution              │
│ ──────────────────────────────────────────── │
│                                              │
│ Values & Culture:          20% ████░░░░░░░░ │
│ Leadership:                20% ████░░░░░░░░ │
│ Strategy & P&L:            20% ████░░░░░░░░ │
│ Track Record:              15% ███░░░░░░░░░ │
│ Stakeholder Fit:           10% ██░░░░░░░░░░ │
│ External Experience:       10% ██░░░░░░░░░░ │
│ Risk & Compliance:          5% █░░░░░░░░░░░ │
│                           ────              │
│ TOTAL:                    100% ████████████ │
│                                              │
│ ✅ Weights sum to 100% - Ready to proceed    │
│                                              │
│ Family's Philosophy:                         │
│ "We weight values and leadership heavily     │
│  because culture and people matter most.     │
│  Track record and skills can be developed    │
│  but values alignment is non-negotiable."    │
│                                              │
│ [Adjust Weights] [Lock & Continue]           │
└──────────────────────────────────────────────┘
```

**Validation Rules:**
- Total weights must equal exactly 100%
- Each category must have at least 1 sub-criterion
- At least one minimum threshold must be set
- Slider locks when 100% reached

---

#### 💾 Data Collected

**Stage 4 Output:**
```json
{
  "stage_4": {
    "selection_criteria_matrix": {
      "categories": [
        {
          "category_name": "Values & Cultural Fit",
          "weight_percentage": 20,
          "sub_criteria": [
            {
              "name": "Family values alignment",
              "assessment_method": "structured_interview",
              "scale": "0-5",
              "description": "How well candidate embodies family's core values"
            },
            {
              "name": "Cultural fit with organization",
              "assessment_method": "360_feedback_interview",
              "scale": "0-5"
            },
            {
              "name": "Long-term orientation",
              "assessment_method": "behavioral_interview",
              "scale": "0-5"
            }
          ],
          "scoring_method": "weighted_average",
          "minimum_threshold": 3.5
        },
        {
          "category_name": "Leadership of People & Teams",
          "weight_percentage": 20,
          "sub_criteria": [...]
        }
        // ... other categories
      ],
      "total_weight": 100,
      "philosophy_statement": "We weight values and leadership heavily because culture matters most",
      "overall_minimum_threshold": 3.0,
      "matrix_snapshot": "base64_encoded_visual"
    }
  }
}
```

**Stored in:** Constitution Service (port 8002) → succession_policy.selection_criteria

---

#### 🔄 Collaborative Mechanics

**Weight Sliders:**
- Drag sliders to adjust weights in real-time
- Total shown at bottom (must = 100%)
- Locks when 100% reached
- Can unlock to readjust

**Template Loading:**
```
Facilitator can load pre-built criteria templates:

Family Business Standard:
• Values: 20%
• Leadership: 20%
• Strategy: 20%
• Track Record: 15%
• Stakeholder: 10%
• External: 10%
• Risk: 5%

Performance-Focused:
• Track Record: 25%
• Strategy: 25%
• Leadership: 20%
• Values: 15%
• External: 10%
• Stakeholder: 5%

[Load & Customize]
```

**Voting on Disputed Weights:**
```
If Owners disagree on weights:

┌──────────────────────────────────────────┐
│ Vote: External Experience Weight          │
│                                          │
│ Proposal A: 10% (Maria)                  │
│ Votes: ■■ (2 owners)                     │
│                                          │
│ Proposal B: 15% (John)                   │
│ Votes: ■ (1 owner)                       │
│                                          │
│ ⏱️ Time remaining: 1:30                   │
│                                          │
│ Proposal A wins (simple majority)        │
│ [Apply Result]                           │
└──────────────────────────────────────────┘
```

---

#### ⭐ Transition

**"Complete Matrix" button:**

**Validation:**
1. ✅ All 7 categories have weights assigned?
2. ✅ Weights sum to exactly 100%?
3. ✅ Each category has at least 1 sub-criterion?
4. ✅ Assessment methods selected for all sub-criteria?
5. ✅ Minimum thresholds set?

**If validation passes:**
- Saves complete selection criteria matrix
- Generates visual matrix diagram
- Auto-transition to Screen 5 (Candidate Assessment)
- Makes matrix available for scoring in next stage

**Summary Modal before transition:**
```
✅ Selection Criteria Matrix Complete

You've defined how CEO and key role successors 
will be evaluated:

Total Criteria: 7 categories, 23 sub-criteria
Highest Weights: Values (20%), Leadership (20%), 
                  Strategy (20%)
Overall Threshold: 3.0/5.0 minimum to qualify

This matrix will be used to score all candidates 
in the next stage.

[Continue to Candidate Assessment →]
```

---

### Screen 5: Candidate Assessment (9-box + Scoring) (40 minutes)

#### 🎯 Goal
Assess candidate pool using 9-box readiness matrix and selection criteria scoring

**Note**: This is the LONGEST and most sensitive section - individual candidate evaluation

#### ⏱️ Duration
40 minutes

#### 👥 Roles & Permissions

**Consultant (Facilitator):**
- Guides assessment process
- Ensures objectivity
- Cannot vote on candidate scores

**Owners + Board Chair:**
- Full assessment permissions
- Score candidates on criteria
- Place candidates in 9-box
- Vote on readiness classification

**HRD:**
- Provides performance data
- Presents 360 feedback
- Candidate background info
- No voting on final scores

**CEO (Current):**
- Provides input on internal candidates
- Recuses from own succession discussion

**Family Council:**
- Input on cultural fit only
- No scoring permissions

**Legal:**
- Available for compliance questions
- No scoring permissions

---

#### 🎨 Wireframe Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ Header: Succession & Development Workshop                      │
│ Stage 5 of 9: Candidate Assessment | ⏱️ 40:00 | 👥 9 online     │
├──────────────────────────┬──────────────────────────────────────┤
│                          │                                      │
│  Facilitator Panel       │  Main Workspace: Candidate Scorer    │
│  (Left - 20%)            │  (Center - 60%)                      │
│                          │                                      │
│  📊 Candidate Pool:      │  ┌──────────────────────────────────┐│
│  CEO Role:               │  │  Candidate Assessment            ││
│  ✅ Candidate A          │  │  Candidate A (Internal)          ││
│  ⏳ Candidate B          │  │  ────────────────────────────────││
│  [ ] Candidate C         │  │                                  ││
│  [ ] External Pool       │  │  Profile:                        ││
│                          │  │  • Current Role: COO             ││
│  COO Role:               │  │  • Age: 45                       ││
│  [ ] Candidate D         │  │  • Tenure: 8 years               ││
│  [ ] Candidate E         │  │  • Education: MBA, Harvard       ││
│                          │  │  • External Experience: 5 years  ││
│  ⏰ Per candidate:       │  │                                  ││
│  ~8-10 minutes           │  │  Scoring Grid:                   ││
│                          │  │  (Based on Stage 4 criteria)     ││
│  💡 9-Box Grid:          │  │                                  ││
│                          │  │  ┌────────────────────────────┐ ││
│  High Potential          │  │  │ Criterion        Score  →  │ ││
│    ↑                     │  │  ├────────────────────────────┤ ││
│    │  [B]       [A]      │  │  │ Values & Culture  [4.2]/5 │ ││
│  Po│             Ready   │  │  │ Weight: 20%    = 0.84     │ ││
│  te│  Develop   Now      │  │  │                            │ ││
│  nt│                     │  │  │ ▸ Family values:    [5]/5 │ ││
│  ia│  [C]       [ ]      │  │  │ ▸ Cultural fit:     [4]/5 │ ││
│  l │             12-24m  │  │  │ ▸ Long-term focus:  [4]/5 │ ││
│    │  Not Fit   >24m     │  │  ├────────────────────────────┤ ││
│  Low└──────────────→     │  │  │ Leadership         [4.5]/5│ ││
│      Low    Performance  │  │  │ Weight: 20%    = 0.90     │ ││
│           High           │  │  │                            │ ││
│                          │  │  │ ▸ Team building:    [5]/5 │ ││
│  🎯 Readiness Classes:   │  │  │ ▸ Inspiring others: [4]/5 │ ││
│  • Ready now             │  │  │ ▸ Change mgmt:      [4]/5 │ ││
│  • Ready 12-24 months    │  │  │ ▸ Coaching:         [5]/5 │ ││
│  • Ready >24 months      │  │  ├────────────────────────────┤ ││
│  • Not fit for role      │  │  │ Strategy & P&L     [3.8]/5│ ││
│                          │  │  │ Weight: 20%    = 0.76     │ ││
│  [Show Assessment Guide] │  │  │                            │ ││
│                          │  │  │ ▸ Strategic vision: [4]/5 │ ││
│                          │  │  │ ▸ Financial acumen: [4]/5 │ ││
│                          │  │  │ ▸ Innovation:       [3]/5 │ ││
│                          │  │  │ ▸ Market analysis:  [4]/5 │ ││
│                          │  │  ├────────────────────────────┤ ││
│                          │  │  │ ... (other categories)     │ ││
│                          │  │  ├────────────────────────────┤ ││
│                          │  │  │                            │ ││
│                          │  │  │ TOTAL WEIGHTED SCORE:      │ ││
│                          │  │  │ [4.1]/5.0 (82%)           │ ││
│                          │  │  │ ✅ Exceeds 3.0 threshold   │ ││
│                          │  │  │                            │ ││
│                          │  │  │ [Save Scores] [Next →]     │ ││
│                          │  │  └────────────────────────────┘ ││
│                          │  │                                  ││
│                          │  │  9-Box Placement:                ││
│                          │  │  Performance: [High ▼]           ││
│                          │  │  Potential: [High ▼]             ││
│                          │  │  → Readiness: Ready Now          ││
│                          │  │                                  ││
│                          │  │  [💾 Save Assessment]            ││
│                          │  └──────────────────────────────────┘│
│                          │                                      │
├──────────────────────────┼──────────────────────────────────────┤
│                          │  Participants Panel (Right - 20%)    │
│                          │                                      │
│                          │  🔒 Confidentiality Reminder:        │
│                          │  All candidate discussions are       │
│                          │  strictly confidential               │
│                          │                                      │
│                          │  👥 Assessors (authorized):          │
│                          │  Maria, John, David, Emma            │
│                          │                                      │
│                          │  💬 Private Notes (per assessor):    │
│                          │  [Text area - not shared]            │
│                          │                                      │
│                          │  📊 Average Scores:                  │
│                          │  4 assessors completed               │
│                          │  Consensus: [High]                   │
│                          │                                      │
└──────────────────────────┴──────────────────────────────────────┘
│ Footer: [< Previous Candidate] [Next Candidate >] [💾 Saving...] │
└─────────────────────────────────────────────────────────────────┘
```

---

#### 📋 Candidate Assessment Process

**Step 1: Candidate List**

For CEO role (and each key role):
- Internal Candidate A
- Internal Candidate B  
- Internal Candidate C
- External Candidate Pool (aggregated)
- "Other" option for future candidates

**Step 2: Scoring Per Candidate**

For each candidate, score against Stage 4 criteria:

```
┌──────────────────────────────────────────────┐
│ Candidate A: [Name] - CEO Assessment         │
│ ──────────────────────────────────────────── │
│                                              │
│ Profile Summary:                             │
│ Current Role: COO                            │
│ Age: 45 | Tenure: 8 years                    │
│ Education: MBA, Harvard                      │
│ External Experience: 5 years (McKinsey)      │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ CATEGORY 1: Values & Cultural Fit (20%)      │
│                                              │
│ Sub-criterion 1: Family values alignment     │
│ Score: [─────●──] 5/5                        │
│ Evidence: Deep understanding of family       │
│           legacy, aligned actions            │
│                                              │
│ Sub-criterion 2: Cultural fit                │
│ Score: [────●───] 4/5                        │
│ Evidence: 360 feedback very positive,        │
│           minor style differences            │
│                                              │
│ Sub-criterion 3: Long-term orientation       │
│ Score: [────●───] 4/5                        │
│ Evidence: Track record of sustainable        │
│           decisions, patient capital         │
│                                              │
│ CATEGORY AVERAGE: 4.3/5                      │
│ WEIGHTED SCORE: 4.3 × 20% = 0.86             │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ CATEGORY 2: Leadership (20%)                 │
│                                              │
│ [Similar scoring grid for each sub-criterion]│
│                                              │
│ CATEGORY AVERAGE: 4.5/5                      │
│ WEIGHTED SCORE: 4.5 × 20% = 0.90             │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ ... (Continue for all 7 categories)          │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ TOTAL WEIGHTED SCORE: 4.1/5.0 (82%)          │
│                                              │
│ Category Breakdown:                          │
│ • Values & Culture:    0.86/1.00 ████████▓░ │
│ • Leadership:          0.90/1.00 █████████░ │
│ • Strategy & P&L:      0.76/1.00 ███████▓░░ │
│ • Track Record:        0.63/0.75 ████████▓  │
│ • Stakeholder Fit:     0.50/0.50 ██████████ │
│ • External Exp:        0.25/0.50 █████░░░░░ │
│ • Risk & Compliance:   0.20/0.25 ████████░░ │
│                                              │
│ ✅ QUALIFIES (Exceeds 3.0 minimum)           │
│                                              │
│ Strengths:                                   │
│ • Exceptional leadership and values fit      │
│ • Strong stakeholder relationships           │
│ • Proven P&L performance                     │
│                                              │
│ Development Needs:                           │
│ • More strategic thinking exposure           │
│ • Limited external experience                │
│                                              │
│ [Save Assessment] [Next Section: 9-Box]      │
└──────────────────────────────────────────────┘
```

---

**Step 3: 9-Box Placement**

After scoring, place candidate in readiness matrix:

```
┌──────────────────────────────────────────────┐
│ Candidate A: 9-Box Readiness Assessment      │
│ ──────────────────────────────────────────── │
│                                              │
│ 9-Box Grid:                                  │
│                                              │
│      High Potential                          │
│         ↑                                    │
│      9  │  6  │  3                           │
│         │     │  [A]  ← Click to place       │
│    Pote-├─────┼─────┤                        │
│    ntial│  8  │  5  │  2                     │
│         │     │     │                        │
│      Low├─────┼─────┤                        │
│      7  │  4  │  1                           │
│         │     │     │                        │
│         └─────┴─────┴──────→                 │
│          Low  Performance  High              │
│                                              │
│ Box Definitions:                             │
│ 1. Emerging Talent - High perf, high pot     │
│ 2. Core Contributor - High perf, medium pot  │
│ 3. Star Performer - High perf, low pot       │
│ 4. Growth Potential - Med perf, high pot     │
│ 5. Solid Performer - Med perf, medium pot    │
│ 6. Trusted Professional - Med perf, low pot  │
│ 7. Inconsistent - Low perf, high pot         │
│ 8. Problem - Low perf, medium pot            │
│ 9. Poor Fit - Low perf, low pot              │
│                                              │
│ Candidate A Placement: Box 3 (Star)          │
│                                              │
│ Performance Rating: [High ▼]                 │
│ • Current role performance: Excellent        │
│ • Consistently exceeds targets               │
│ • Track record: 4.2/5.0                      │
│                                              │
│ Potential Rating: [High ▼]                   │
│ • Capacity for CEO role: Strong              │
│ • Leadership capability: Proven              │
│ • Strategic thinking: Developing             │
│ • Overall potential: 4.5/5.0                 │
│                                              │
│ READINESS CLASSIFICATION:                    │
│ (●) Ready Now (0-6 months)                   │
│ ( ) Ready in 12-24 months                    │
│ ( ) Ready >24 months                         │
│ ( ) Not fit for this role                    │
│                                              │
│ Readiness Details:                           │
│ [x] Has required competencies                │
│ [x] Meets experience requirements            │
│ [x] Cultural and values fit                  │
│ [~] Some strategic depth needed              │
│ [ ] Requires significant development         │
│                                              │
│ Recommended Next Steps:                      │
│ • Shadow CEO for 6 months                    │
│ • Board exposure program                     │
│ • External executive coaching                │
│ • Strategic planning leadership              │
│                                              │
│ [Save 9-Box Placement] [Next Candidate →]    │
└──────────────────────────────────────────────┘
```

---

**Readiness Classification Guide:**

```
┌──────────────────────────────────────────────┐
│ Succession Readiness Definitions             │
│ ──────────────────────────────────────────── │
│                                              │
│ READY NOW (0-6 months)                       │
│ • Meets all critical requirements            │
│ • Could step into role immediately           │
│ • Minimal transition support needed          │
│ • High confidence in success                 │
│                                              │
│ READY IN 12-24 MONTHS                        │
│ • Meets most requirements                    │
│ • 1-2 development gaps identified            │
│ • Targeted development plan needed           │
│ • Good confidence with preparation           │
│                                              │
│ READY >24 MONTHS                             │
│ • Meets some requirements                    │
│ • Multiple development needs                 │
│ • Extensive preparation required             │
│ • Potential uncertain, needs proof           │
│                                              │
│ NOT FIT FOR ROLE                             │
│ • Significant gaps in requirements           │
│ • Better suited for different role           │
│ • Remove from succession consideration       │
│                                              │
└──────────────────────────────────────────────┘
```

---

#### 📊 Candidate Comparison Dashboard

After all candidates assessed, show comparison:

```
┌──────────────────────────────────────────────────────────┐
│ CEO Succession: Candidate Comparison                     │
│ ──────────────────────────────────────────────────────── │
│                                                           │
│                Cand A   Cand B   Cand C   External       │
│ ──────────────────────────────────────────────────────── │
│ Total Score    4.1/5.0  3.8/5.0  3.2/5.0  TBD            │
│ ──────────────────────────────────────────────────────── │
│ Values (20%)   0.86     0.80     0.76     -              │
│ Leadership     0.90     0.70     0.60     -              │
│ Strategy       0.76     0.80     0.60     -              │
│ Track Record   0.63     0.58     0.45     -              │
│ Stakeholder    0.50     0.48     0.35     -              │
│ External Exp   0.25     0.44     0.24     -              │
│ Risk/Comp      0.20     0.20     0.20     -              │
│ ──────────────────────────────────────────────────────── │
│ Readiness      Ready    12-24mo  >24mo    12-18mo        │
│ 9-Box          Box 3    Box 5    Box 4    TBD            │
│ ──────────────────────────────────────────────────────── │
│                                                           │
│ RECOMMENDATION:                                           │
│ • Primary: Candidate A (ready now, highest scores)       │
│ • Backup 1: Candidate B (strong, needs development)      │
│ • Backup 2: External search (if A/B not available)       │
│ • Pipeline: Candidate C (long-term development)          │
│                                                           │
│ [Export Comparison] [Generate Report]                    │
└──────────────────────────────────────────────────────────┘
```

---

#### 💾 Data Collected

**Stage 5 Output:**
```json
{
  "stage_5": {
    "candidate_assessments": [
      {
        "candidate_id": "uuid",
        "candidate_name": "Candidate A (anonymized in storage)",
        "role_target": "CEO",
        "scores": {
          "values_culture": {
            "sub_scores": [5, 4, 4],
            "category_average": 4.3,
            "weighted_score": 0.86,
            "weight_percentage": 20
          },
          "leadership": {
            "sub_scores": [5, 4, 4, 5],
            "category_average": 4.5,
            "weighted_score": 0.90,
            "weight_percentage": 20
          },
          // ... other categories
          "total_weighted_score": 4.1,
          "total_percentage": 82,
          "qualifies": true,
          "exceeds_threshold": true
        },
        "nine_box": {
          "performance_rating": "high",
          "potential_rating": "high",
          "box_number": 3,
          "box_label": "Star Performer"
        },
        "readiness": {
          "classification": "ready_now",
          "timeframe_months": "0-6",
          "confidence_level": "high",
          "development_needs": ["strategic_exposure", "board_presence"],
          "recommended_actions": ["ceo_shadowing", "board_program", "executive_coaching"]
        },
        "assessor_notes": "Encrypted and access-controlled",
        "assessment_date": "2025-10-29T15:30:00Z"
      },
      {
        "candidate_id": "uuid",
        "candidate_name": "Candidate B",
        "role_target": "CEO",
        "scores": {...}
      }
      // ... other candidates
    ],
    "succession_depth": {
      "ceo_role": {
        "ready_now": 1,
        "ready_12_24_months": 1,
        "ready_gt_24_months": 1,
        "total_pipeline": 3
      },
      "coo_role": {...}
    },
    "comparison_matrix_snapshot": "base64_encoded_image",
    "risk_assessment": {
      "single_point_of_failure": false,
      "bench_strength": "adequate",
      "external_search_needed": false
    }
  }
}
```

**Stored in:** 
- Constitution Service (port 8002) → succession_policy.candidate_assessments
- **Extra security**: Role-based access control, encrypted at rest

---

#### 🔄 Collaborative Mechanics

**Multi-Assessor Scoring:**
- Owners + Board Chair each score independently
- System calculates average scores
- Highlights disagreements (>1 point spread)
- Can discuss and revise scores

**Calibration Session:**
```
If assessors have divergent scores:

┌──────────────────────────────────────────┐
│ Score Calibration: Candidate A           │
│                                          │
│ Leadership: Team Building sub-criterion  │
│                                          │
│ Maria scored: 5/5 "Exceptional"          │
│ John scored: 3/5 "Adequate"              │
│ David scored: 4/5 "Strong"               │
│                                          │
│ Spread: 2 points (requires discussion)   │
│                                          │
│ [Open Discussion Thread]                 │
│ [Show Evidence/Data]                     │
│ [Revise Scores]                          │
└──────────────────────────────────────────┘
```

**Anonymization Option:**
- Workshop can be conducted with candidate names hidden
- Use "Candidate A", "Candidate B" labels
- Revealed after scoring complete
- Reduces bias

**Reference Data Integration:**
- HRD can upload performance reviews, 360 feedback
- Documents attached to candidate profile
- Assessors can view during scoring
- Auto-summarized by AI

---

#### ⭐ Transition

**"Complete Assessment" button:**

**Validation:**
1. ✅ All candidates scored on all criteria?
2. ✅ All candidates placed in 9-box?
3. ✅ Readiness classifications assigned?
4. ⚠️ At least 1 "Ready Now" or "Ready 12-24m" candidate for each critical role?

**If validation fails:**
```
⚠️ Succession Depth Concern

CEO Role Analysis:
• 0 candidates "Ready Now"
• 1 candidate "Ready in 12-24 months"
• 2 candidates "Ready >24 months"

Recommendation:
→ Accelerate development of top candidate
→ Consider external search as backup
→ Create interim CEO plan

This will be addressed in next stages 
(Development Roadmap + Emergency Plan)

[Acknowledge & Continue]
```

**If validation passes:**
- Saves all candidate assessments
- Generates comparison dashboard
- Auto-transition to Screen 6 (Development Roadmap)
- Sends encrypted assessment data to authorized stakeholders

---

### Screen 6: Development Roadmap Builder (35 minutes)

#### 🎯 Goal
Create individual development plans for successor candidates with milestones and timelines

#### ⏱️ Duration
35 minutes

#### 👥 Roles & Permissions

**Consultant (Facilitator):**
- Guides roadmap building
- Provides development best practices
- Cannot vote on specific assignments

**Owners + Board Chair + HRD:**
- Full editing permissions
- Design development tracks
- Set milestones and timelines
- Approve roadmaps

**CEO (Current):**
- Input on developmental assignments
- Mentorship commitment
- Cannot control own succession timeline

**Others:**
- Read-only view

---

#### 🎨 Wireframe Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Header: Succession & Development Workshop                   │
│ Stage 6 of 9: Development Roadmap | ⏱️ 35:00 | 👥 9 online  │
├─────────────────────────┬───────────────────────────────────┤
│                         │                                   │
│  Facilitator Panel      │  Main Workspace: Roadmap Builder  │
│  (Left - 20%)           │  (Center - 60%)                   │
│                         │                                   │
│  📊 Candidates to Plan: │  ┌─────────────────────────────┐ │
│  CEO Succession:        │  │  Development Roadmap        │ │
│  ✅ Candidate A (Ready) │  │  Candidate A → CEO          │ │
│  ⏳ Candidate B (12-24m)│  │  ───────────────────────────│ │
│  [ ] Candidate C (>24m) │  │                             │ │
│                         │  │  Current Readiness: Ready   │ │
│  COO Succession:        │  │  Target Timeline: 6-12 mo   │ │
│  [ ] Candidate D        │  │                             │ │
│                         │  │  Development Track:         │ │
│  ⏰ Per candidate:      │  │  ───────────────────────────│ │
│  ~8-10 minutes          │  │                             │ │
│                         │  │  Phase 1: Exposure (1-6mo)  │ │
│  💡 Standard Tracks:    │  │  ☑️ Shadow CEO (2 days/wk)  │ │
│                         │  │     Start: [Month 1]        │ │
│  Ready Now Track:       │  │     Duration: [6] months    │ │
│  • CEO shadowing        │  │     Owner: [Current CEO]    │ │
│  • Board exposure       │  │                             │ │
│  • Exec coaching        │  │  ☑️ Attend Board meetings   │ │
│  • Strategic projects   │  │     Start: [Month 1]        │ │
│  6-12 month prep        │  │     Role: Observer          │ │
│                         │  │     Owner: [Board Chair]    │ │
│  12-24 Month Track:     │  │                             │ │
│  • External role        │  │  ☑️ Executive coaching      │ │
│  • Internal rotation    │  │     Provider: [External ▼]  │ │
│  • Stretch assignment   │  │     Frequency: [Monthly]    │ │
│  • 360 evaluations      │  │     Focus: [Strategic lead] │ │
│  • Mentorship           │  │                             │ │
│                         │  │  ☑️ Lead strategic project  │ │
│  >24 Month Track:       │  │     Project: [Expansion]    │ │
│  • Foundational skills  │  │     Budget: [$500K]         │ │
│  • Multiple rotations   │  │     Timeline: [6 months]    │ │
│  • Leadership program   │  │     Success: [Revenue ↑]    │ │
│  • External experience  │  │                             │ │
│                         │  │  [+ Add Activity]           │ │
│  [Load Template ▼]      │  │                             │ │
│                         │  │  Phase 2: Assessment (Mo 6) │ │
│                         │  │  Checkpoint Review:         │ │
│                         │  │  ☑️ 360 feedback evaluation │ │
│                         │  │  ☑️ Board assessment        │ │
│                         │  │  ☑️ Strategic project review│ │
│                         │  │  ☑️ Go/No-Go decision       │ │
│                         │  │                             │ │
│                         │  │  [Save Roadmap] [Next →]    │ │
│                         │  └─────────────────────────────┘ │
│                         │                                   │
├─────────────────────────┼───────────────────────────────────┤
│                         │  Timeline Visualizer (Bottom)     │
│                         │                                   │
│                         │  ┌─────────────────────────────┐ │
│                         │  │ Candidate A Timeline        │ │
│                         │  │                             │ │
│                         │  │ Month 1-6: CEO Shadow       │ │
│                         │  │ ████████████████████        │ │
│                         │  │ ├─ Weekly shadow sessions   │ │
│                         │  │ ├─ Board attendance         │ │
│                         │  │ └─ Strategic project lead   │ │
│                         │  │                             │ │
│                         │  │ Month 6: ⚠️ CHECKPOINT       │ │
│                         │  │                             │ │
│                         │  │ Month 7-12: Transition Prep │ │
│                         │  │ ███████████████             │ │
│                         │  │ ├─ Assume interim duties    │ │
│                         │  │ ├─ External stakeholder mtg │ │
│                         │  │ └─ Transition plan dev      │ │
│                         │  │                             │ │
│                         │  │ Month 12: 🎯 READY FOR CEO  │ │
│                         │  │                             │ │
│                         │  │ [Export] [Print PDF]        │ │
│                         │  └─────────────────────────────┘ │
│                         │                                   │
└─────────────────────────┴───────────────────────────────────┘
│ Footer: [< Previous] [Complete Roadmaps] [💾 Saving...]    │
└─────────────────────────────────────────────────────────────┘
```

---

#### 📋 Development Roadmap Components

**For Each Candidate (Based on Readiness):**

---

**READY NOW Track (0-6 month preparation)**

```
┌──────────────────────────────────────────────┐
│ Candidate A: "Ready Now" Development Plan    │
│ Goal: Prepare for CEO transition in 6-12mo   │
│ ──────────────────────────────────────────── │
│                                              │
│ PHASE 1: Exposure & Validation (Months 1-6)  │
│                                              │
│ 1. CEO Shadowing Program                     │
│    ☑️ Enable                                 │
│    Frequency: [2] days per week              │
│    Duration: [6] months                      │
│    Activities:                               │
│    • Attend all executive meetings           │
│    • Shadow key stakeholder interactions     │
│    • Review strategic decisions in real-time │
│    • Weekly debrief with CEO                 │
│    Owner: [Current CEO]                      │
│                                              │
│ 2. Board Exposure Program                    │
│    ☑️ Enable                                 │
│    Activities:                               │
│    • Attend all Board meetings (observer)    │
│    • Present quarterly business updates      │
│    • Prepare Board materials with CEO        │
│    • 1-on-1s with each Board member          │
│    Owner: [Board Chair]                      │
│                                              │
│ 3. Executive Coaching                        │
│    ☑️ Enable                                 │
│    Coach: [External provider ▼]              │
│    Focus areas:                              │
│    • Strategic leadership                    │
│    • Stakeholder management                  │
│    • CEO transition psychology               │
│    Frequency: [2x per month]                 │
│    Duration: [12 months]                     │
│                                              │
│ 4. Lead Strategic Initiative                 │
│    ☑️ Enable                                 │
│    Project: [Market expansion to Europe]     │
│    Budget: [$500K]                           │
│    Timeline: [6 months]                      │
│    Success metrics:                          │
│    • Market entry plan approved by Board     │
│    • 3 pilot customers secured               │
│    • Projected ROI >15%                      │
│    Owner: [Candidate A, reports to CEO]      │
│                                              │
│ 5. External Stakeholder Engagement           │
│    ☑️ Enable                                 │
│    Activities:                               │
│    • Lead 2 investor relations meetings      │
│    • Represent company at industry conference│
│    • Meet top 10 customers with CEO          │
│    • Build relationships with key suppliers  │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ CHECKPOINT: Month 6 Review                   │
│                                              │
│ Assessment Activities:                       │
│ ☑️ 360-degree feedback evaluation            │
│    Participants: Direct reports, peers,      │
│    CEO, Board members                        │
│                                              │
│ ☑️ Board assessment interview                │
│    Format: 1-hour session with full Board    │
│    Topics: Leadership, strategy, vision      │
│                                              │
│ ☑️ Strategic project outcomes review         │
│    Criteria: On-time, on-budget, impact      │
│                                              │
│ ☑️ Go/No-Go Decision                         │
│    Decision makers: [Owners + Board]         │
│    Options:                                  │
│    • Proceed to Phase 2 (transition)         │
│    • Extend Phase 1 (more development)       │
│    • Reassess readiness (major concerns)     │
│                                              │
│ Required thresholds to proceed:              │
│ • 360 feedback: ≥4.0/5.0 average             │
│ • Board interview: Majority approval         │
│ • Strategic project: Meets success criteria  │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ PHASE 2: Transition Preparation (Months 7-12)│
│ (Only if Phase 1 checkpoint passed)          │
│                                              │
│ 1. Assume Interim CEO Responsibilities       │
│    ☑️ Enable                                 │
│    Scope: [50%] of CEO duties                │
│    Current CEO remains: [50%] oversight      │
│    Duration: [6 months]                      │
│    Gradual handoff plan                      │
│                                              │
│ 2. External Reputation Building              │
│    ☑️ Enable                                 │
│    • Lead investor roadshow                  │
│    • Media interviews & thought leadership   │
│    • Industry association leadership         │
│    • Community/philanthropy representation   │
│                                              │
│ 3. Transition Plan Development               │
│    ☑️ Enable                                 │
│    Create detailed 90-day transition plan    │
│    including:                                │
│    • Stakeholder communication plan          │
│    • Quick wins for new CEO                  │
│    • Org changes (if any)                    │
│    • Outgoing CEO role (if staying)          │
│                                              │
│ 4. Final Readiness Assessment                │
│    ☑️ Enable                                 │
│    Timing: [Month 12]                        │
│    Format: Board + Owners vote               │
│    Threshold: [66]% approval to proceed      │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ PHASE 3: CEO Transition (Month 12+)          │
│                                              │
│ Transition Date: [TBD based on readiness]    │
│ Announcement Plan: [Internal first, then     │
│                     external stakeholders]   │
│ Outgoing CEO Role: [Board Chair / Advisor]   │
│                                              │
│ First 90 Days as CEO:                        │
│ • Weekly check-ins with Board Chair          │
│ • Monthly Board CEO evaluation               │
│ • Continued executive coaching               │
│ • Focus on listening and relationship build  │
│                                              │
│ [💾 Save Roadmap] [Export PDF]               │
└──────────────────────────────────────────────┘
```

---

**12-24 MONTH Track (Structured development)**

```
┌──────────────────────────────────────────────┐
│ Candidate B: "12-24 Month" Development Plan  │
│ Goal: Prepare for CEO role in 2 years        │
│ ──────────────────────────────────────────── │
│                                              │
│ Mandatory Development Track Components:      │
│                                              │
│ 1. External Role Requirement                 │
│    ☑️ Must complete [24] months outside      │
│       family business in senior role         │
│                                              │
│    Options:                                  │
│    ( ) CEO of smaller company                │
│    ( ) President of division in larger co.   │
│    ( ) Consulting role with strategy firm    │
│    (●) GM role in portfolio company          │
│                                              │
│    Why: Prove capability outside family      │
│    context, gain fresh perspective           │
│                                              │
│    Timeline: [Months 1-24]                   │
│    Support: Family maintains relationship,   │
│             quarterly check-ins              │
│                                              │
│ 2. Internal Role Rotation                    │
│    ☑️ After external role, rotate through    │
│       [2] key internal functions             │
│                                              │
│    Rotation 1: [Sales/Marketing - 9 months]  │
│    Rotation 2: [Operations - 9 months]       │
│                                              │
│    Purpose: Build cross-functional expertise │
│    and internal relationships                │
│                                              │
│    Timeline: [Months 25-42]                  │
│                                              │
│ 3. Independent Board Mentor                  │
│    ☑️ Assign independent director as mentor  │
│                                              │
│    Mentor: [Independent Director Name ▼]     │
│    Meeting frequency: [Monthly]              │
│    Duration: [24 months]                     │
│                                              │
│    Focus:                                    │
│    • Leadership development                  │
│    • Strategic thinking                      │
│    • Board-CEO dynamics                      │
│    • Career guidance                         │
│                                              │
│ 4. Quarterly 360 Evaluations                 │
│    ☑️ Enable ongoing assessment              │
│                                              │
│    Frequency: [Every 3 months]               │
│    Participants: Manager, peers, reports     │
│    Focus areas: Leadership, results, values  │
│    Review with: [HRD + Mentor]               │
│                                              │
│ 5. Executive Education Program               │
│    ☑️ Formal leadership development          │
│                                              │
│    Program: [Harvard Business School AMP]    │
│    Duration: [8 weeks over 2 years]          │
│    Cost: [$50K] (company funded)             │
│    Timing: [Years 1-2]                       │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ CHECKPOINTS: T+6, T+12, T+18, T+24           │
│                                              │
│ Each checkpoint includes:                    │
│ • 360 feedback review                        │
│ • Performance vs. KPIs                       │
│ • Behavioral assessment                      │
│ • Go/Stop/Pivot decision                     │
│                                              │
│ Checkpoint Decision Authority:               │
│ R: HRD prepares assessment                   │
│ A: CEO makes recommendation                  │
│ C: Board Chair reviews                       │
│ I: Owners informed                           │
│                                              │
│ Stop conditions (remove from track):         │
│ • Performance <3.5/5.0 for 2 consecutive     │
│   periods                                    │
│ • Behavioral concerns flagged by 360         │
│ • Voluntary withdrawal from track            │
│ • Strategic fit no longer exists             │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ Expected Completion: [Month 42-48]           │
│ At completion, candidate should be:          │
│ • "Ready Now" for CEO role                   │
│ • Proven external capability                 │
│ • Cross-functional expertise                 │
│ • Strong internal/external relationships     │
│                                              │
│ [💾 Save Roadmap] [Export PDF]               │
└──────────────────────────────────────────────┘
```

---

**>24 MONTH Track (Long-term pipeline)**

```
┌──────────────────────────────────────────────┐
│ Candidate C: "Long-Term" Development Plan    │
│ Goal: Build foundational CEO capabilities    │
│ ──────────────────────────────────────────── │
│                                              │
│ PHASE 1: Foundation Building (Years 1-2)     │
│                                              │
│ 1. Functional Excellence                     │
│    ☑️ Master current role (e.g., CFO)        │
│    Performance target: Top quartile          │
│    KPIs: [Specific to role]                  │
│    Timeline: [Ongoing]                       │
│                                              │
│ 2. Leadership Fundamentals Program           │
│    ☑️ Enroll in leadership development       │
│    Program: [Internal + external blend]      │
│    Modules:                                  │
│    • Leading teams (6 months)                │
│    • Strategic thinking (6 months)           │
│    • Change management (6 months)            │
│    • Executive presence (6 months)           │
│                                              │
│ 3. Cross-Functional Exposure                 │
│    ☑️ Participate in cross-functional teams  │
│    Projects: [2-3 strategic initiatives]     │
│    Role: Team member, not leader yet         │
│    Timeline: [Years 1-2]                     │
│                                              │
│ 4. Executive Coach Assignment                │
│    ☑️ Monthly coaching sessions              │
│    Focus: Leadership fundamentals            │
│    Duration: [24 months]                     │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ PHASE 2: Leadership Experience (Years 3-4)   │
│                                              │
│ 1. P&L Responsibility                        │
│    ☑️ Assign business unit or geography      │
│    Size: [$10-20M revenue]                   │
│    Team: [20-50 people]                      │
│    Duration: [24 months minimum]             │
│                                              │
│ 2. Multi-Functional Role                     │
│    ☑️ Rotate to role managing 2+ functions   │
│    Example: COO, General Manager             │
│    Timeline: [Years 3-4]                     │
│                                              │
│ 3. External Board Service                    │
│    ☑️ Seek external board seat               │
│    Target: [Mid-size company, non-competing] │
│    Purpose: Governance exposure              │
│    Timeline: [Year 4+]                       │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ PHASE 3: CEO Preparation (Years 5-6)         │
│                                              │
│ 1. Transition to 12-24 Month Track           │
│    ☑️ After Phase 2, reassess readiness      │
│    If strong progress: Move to faster track  │
│    If slower: Continue development           │
│                                              │
│ 2. External Experience Requirement           │
│    ☑️ Plan for external role if needed       │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ Annual Checkpoints: T+12, T+24, T+36, etc.   │
│                                              │
│ Reassessment at each checkpoint:             │
│ • Still on track for CEO long-term?          │
│ • Accelerate to 12-24 month track?           │
│ • Better fit for other leadership role?      │
│ • Remove from CEO succession planning?       │
│                                              │
│ [💾 Save Roadmap] [Export PDF]               │
└──────────────────────────────────────────────┘
```

---

#### 💾 Data Collected

**Stage 6 Output:**
```json
{
  "stage_6": {
    "development_roadmaps": [
      {
        "candidate_id": "uuid",
        "role_target": "CEO",
        "readiness_track": "ready_now",
        "total_duration_months": 12,
        "phases": [
          {
            "phase_number": 1,
            "phase_name": "Exposure & Validation",
            "duration_months": 6,
            "start_month": 1,
            "activities": [
              {
                "activity_name": "CEO Shadowing Program",
                "enabled": true,
                "frequency": "2 days per week",
                "duration_months": 6,
                "owner": "current_ceo",
                "success_criteria": ["attend_all_exec_meetings", "weekly_debrief"]
              },
              {
                "activity_name": "Board Exposure Program",
                "enabled": true,
                "activities": ["attend_meetings", "quarterly_presentations", "board_1on1s"],
                "owner": "board_chair"
              },
              {
                "activity_name": "Executive Coaching",
                "enabled": true,
                "coach_provider": "external",
                "frequency": "2x per month",
                "focus_areas": ["strategic_leadership", "stakeholder_mgmt"],
                "duration_months": 12
              },
              {
                "activity_name": "Lead Strategic Initiative",
                "enabled": true,
                "project_name": "Market expansion to Europe",
                "budget": 500000,
                "timeline_months": 6,
                "success_metrics": ["board_approval", "3_pilot_customers", "roi_gt_15pct"]
              }
            ]
          },
          {
            "phase_number": 2,
            "phase_name": "Checkpoint Review",
            "month": 6,
            "assessment_activities": [
              {"type": "360_feedback", "threshold": ">=4.0/5.0"},
              {"type": "board_interview", "threshold": "majority_approval"},
              {"type": "strategic_project_review", "threshold": "meets_criteria"},
              {"type": "go_no_go_decision", "decision_makers": ["owners", "board"]}
            ],
            "proceed_conditions": "all_thresholds_met",
            "alternative_paths": ["proceed_phase_2", "extend_phase_1", "reassess_readiness"]
          }
        ],
        "checkpoints": [
          {
            "checkpoint_month": 6,
            "assessment_type": "go_no_go",
            "decision_authority": "owners_board",
            "required_outcomes": ["360>=4.0", "board_approval", "project_success"]
          },
          {
            "checkpoint_month": 12,
            "assessment_type": "final_readiness",
            "decision_authority": "owners_board",
            "approval_threshold": "66_percent"
          }
        ],
        "expected_completion_month": 12,
        "roadmap_status": "approved",
        "roadmap_pdf": "base64_encoded_document"
      }
    ]
  }
}
```

**Stored in:** Constitution Service (port 8002) → succession_policy.development_roadmaps

---

#### 🔄 Collaborative Mechanics

**Template Loading:**
- Standard tracks pre-populated based on readiness
- Can customize all activities and timelines
- Templates ensure consistency across candidates

**Timeline Visualization:**
- Gantt-style timeline shows all activities
- Overlapping activities highlighted
- Resource conflicts flagged (e.g., CEO mentoring multiple candidates)

**Milestone Tracking Integration:**
```
Development roadmaps automatically create:
→ Calendar events in Meeting Service
→ Task assignments in project management
→ Notification reminders for checkpoints
→ Progress dashboards for HRD and Board
```

**Go/No-Go Decision Points:**
```
At each checkpoint, system prompts:

┌──────────────────────────────────────────┐
│ Checkpoint Review: Candidate A (Month 6) │
│                                          │
│ Assessment Results:                      │
│ • 360 feedback: 4.3/5.0 ✅              │
│ • Board interview: 6/7 approve ✅        │
│ • Strategic project: On track ✅         │
│                                          │
│ DECISION:                                │
│ (●) Proceed to Phase 2 (Transition Prep) │
│ ( ) Extend Phase 1 (More development)    │
│ ( ) Reassess readiness (Concerns)        │
│                                          │
│ Vote Required: Owners + Board            │
│ [Submit Decision]                        │
└──────────────────────────────────────────┘
```

**Resource Conflict Detection:**
```
If multiple candidates need same resource:

┌──────────────────────────────────────────┐
│ ⚠️ Resource Conflict Detected           │
│                                          │
│ CEO Shadowing requested for:            │
│ • Candidate A: 2 days/week (6 months)   │
│ • Candidate B: 1 day/week (12 months)  │
│                                          │
│ Current CEO availability: 3 days/week   │
│                                          │
│ Recommended Solution:                    │
│ • Stagger timelines                      │
│ • Assign Candidate B to COO shadowing   │
│ • Reduce frequency for one candidate    │
│                                          │
│ [Adjust Schedules] [Accept Conflict]    │
└──────────────────────────────────────────┘
```

---

#### ⭐ Transition

**"Complete Roadmaps" button:**

**Validation:**
1. ✅ All "Ready Now" and "Ready 12-24m" candidates have roadmaps?
2. ✅ All roadmaps have checkpoints defined?
3. ✅ Owners/resources assigned to all activities?
4. ⚠️ Resource conflicts identified?

**If validation passes:**
- Saves all development roadmaps
- Generates timeline visualizations
- Exports roadmap PDFs for each candidate
- Integrates with calendar/task systems
- Auto-transition to Screen 7 (Emergency Plan)

**Summary before transition:**
```
✅ Development Roadmaps Complete

Created roadmaps for:
• Candidate A (CEO): 12-month "Ready Now" track
• Candidate B (CEO): 24-month development track
• Candidate D (COO): 18-month track

Total checkpoints scheduled: 8
Resources allocated: CEO (mentoring), Board Chair (coaching), HRD (coordination)

Next: Emergency succession planning

[Continue to Emergency Plan →]
```

---

### Screen 7: Emergency Succession Plan (20 minutes)

#### 🎯 Goal
Create 90-day emergency protocols for sudden CEO unavailability

#### ⏱️ Duration
20 minutes

#### 👥 Roles & Permissions

**Consultant (Facilitator):**
- Guides crisis planning
- Provides emergency succession best practices
- Cannot vote on interim assignments

**Owners + Board Chair:**
- Full editing permissions
- Designate interim CEO
- Approve emergency protocols
- Final decision authority

**CEO (Current):**
- Input on interim capabilities
- Cannot control emergency succession

**Legal Counsel:**
- Active participant for this section
- Ensures legal compliance
- Documents emergency powers

**Others:**
- Read-only view

---

#### 🎨 Wireframe Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Header: Succession & Development Workshop                   │
│ Stage 7 of 9: Emergency Plan | ⏱️ 20:00 | 👥 9 online      │
├─────────────────────────┬───────────────────────────────────┤
│                         │                                   │
│  Facilitator Panel      │  Main Workspace: Emergency Proto  │
│  (Left - 20%)           │  (Center - 60%)                   │
│                         │                                   │
│  🚨 Emergency Triggers: │  ┌─────────────────────────────┐ │
│                         │  │  90-Day Emergency Succession│ │
│  CEO unavailable >30 d  │  │  ───────────────────────────│ │
│  due to:                │  │                             │ │
│  • Medical emergency    │  │  TRIGGER CONDITIONS:        │ │
│  • Sudden death         │  │  ───────────────────────────│ │
│  • Incapacitation       │  │                             │ │
│  • Immediate resignation│  │  CEO unavailable >30 days:  │ │
│  • Legal issues         │  │  ☑️ Medical emergency       │ │
│  • Family crisis        │  │  ☑️ Sudden death            │ │
│                         │  │  ☑️ Immediate resignation   │ │
│  ⏰ Critical first 48h  │  │  ☑️ Legal prohibition       │ │
│                         │  │  ☑️ Family crisis leave     │ │
│  💡 Best Practices:     │  │  ☐ Custom: [__________]    │ │
│                         │  │                             │ │
│  Interim CEO should be: │  │  WHO DECLARES EMERGENCY:    │ │
│  • Internal (knows co.) │  │  Primary: [Board Chair]     │ │
│  • Trusted by Board     │  │  Backup: [Lead Indep Dir]   │ │
│  • Available immediate  │  │  Notification: [Owners+Bd]  │ │
│  • Limited term (90d)   │  │                             │ │
│                         │  │  ───────────────────────────│ │
│  Not permanent CEO:     │  │  INTERIM CEO DESIGNATION:   │ │
│  • Different skillset   │  │  ───────────────────────────│ │
│  • Crisis management    │  │                             │ │
│  • Stability focus      │  │  Primary Interim:           │ │
│                         │  │  Name: [COO - Candidate A]  │ │
│  📋 90-Day Plan:        │  │  Current Role: COO          │ │
│                         │  │  Readiness: [High]          │ │
│  Day 1-7: Stabilize     │  │  Availability: [Immediate]  │ │
│  • Crisis communication │  │                             │ │
│  • Reassure stakeholder │  │  Backup Interim:            │ │
│  • Maintain operations  │  │  Name: [CFO - Candidate X]  │ │
│                         │  │  Reason: If primary unavail │ │
│  Day 8-30: Steady state │  │                             │ │
│  • Execute current plan │  │  Third Option:              │ │
│  • Regular Board update │  │  ( ) Independent Director   │ │
│  • No major changes     │  │  (●) External interim exec  │ │
│                         │  │  ( ) Promote from within    │ │
│  Day 31-90: Transition  │  │                             │ │
│  • Permanent search     │  │  APPOINTMENT MECHANICS:     │ │
│  • Succession process   │  │  ☑️ Pre-signed letter       │ │
│  • Knowledge transfer   │  │     (sealed, with legal)    │ │
│                         │  │  ☑️ Board resolution ready  │ │
│  [Show Emergency Guide] │  │  ☑️ Powers of attorney      │ │
│                         │  │  ☑️ Emergency contact list  │ │
│                         │  │                             │ │
│                         │  │  INTERIM CEO AUTHORITY:     │ │
│                         │  │  Term: [90] days maximum    │ │
│                         │  │  Title: [Acting CEO]        │ │
│                         │  │                             │ │
│                         │  │  [Continue to Authority →]  │ │
│                         │  └─────────────────────────────┘ │
│                         │                                   │
├─────────────────────────┼───────────────────────────────────┤
│                         │  Emergency Authorities Panel      │
│                         │                                   │
│                         │  ┌─────────────────────────────┐ │
│                         │  │ Interim CEO: Powers & Limits│ │
│                         │  │                             │ │
│                         │  │ APPROVED AUTHORITIES:       │ │
│                         │  │ ☑️ Run day-to-day ops       │ │
│                         │  │ ☑️ Execute approved budget  │ │
│                         │  │ ☑️ Sign contracts <$100K    │ │
│                         │  │ ☑️ Hire decisions <VP level │ │
│                         │  │ ☑️ Represent company extern │ │
│                         │  │ ☑️ Attend Board (voting)    │ │
│                         │  │                             │ │
│                         │  │ PROHIBITED ACTIONS:         │ │
│                         │  │ ☑️ M&A transactions         │ │
│                         │  │ ☑️ Strategic plan changes   │ │
│                         │  │ ☑️ Major capital expenditure│ │
│                         │  │ ☑️ Dividend policy changes  │ │
│                         │  │ ☑️ Executive restructuring  │ │
│                         │  │ ☑️ New debt/financing       │ │
│                         │  │                             │ │
│                         │  │ REQUIRES BOARD APPROVAL:    │ │
│                         │  │ ☑️ Contracts >$100K         │ │
│                         │  │ ☑️ VP+ hires/terminations   │ │
│                         │  │ ☑️ Legal settlements >$50K  │ │
│                         │  │ ☑️ Crisis communications    │ │
│                         │  │                             │ │
│                         │  └─────────────────────────────┘ │
│                         │                                   │
└─────────────────────────┴───────────────────────────────────┘
│ Footer: [< Previous] [Complete Emergency Plan] [💾 Saving...] │
└─────────────────────────────────────────────────────────────┘
```

---

#### 📋 Emergency Succession Plan Components

**1. Trigger Conditions** (What activates plan)

```
┌──────────────────────────────────────────────┐
│ Emergency Succession Triggers                │
│ ──────────────────────────────────────────── │
│                                              │
│ Plan activates when CEO is unavailable for   │
│ more than [30] consecutive days due to:      │
│                                              │
│ ☑️ Medical emergency or incapacitation       │
│ ☑️ Sudden death                              │
│ ☑️ Immediate resignation                     │
│ ☑️ Legal or regulatory prohibition           │
│ ☑️ Extended family crisis requiring leave    │
│ ☐ Termination for cause                     │
│ ☐ Custom trigger: [________________]        │
│                                              │
│ WHO DECLARES EMERGENCY:                      │
│ Primary authority: [Board Chair]             │
│ Backup authority: [Lead Independent Director]│
│ Requires: [Simple majority Board vote ▼]     │
│                                              │
│ NOTIFICATION PROTOCOL:                       │
│ Within [24] hours, notify:                   │
│ ☑️ All Owners                                │
│ ☑️ All Board members                         │
│ ☑️ Executive team                            │
│ ☑️ Family Council chair                      │
│ ☑️ Legal counsel                             │
│ ☑️ HR Director                               │
│ [ ] Public announcement (timing: [TBD])      │
│                                              │
└──────────────────────────────────────────────┘
```

---

**2. Interim CEO Designation** (Who steps in)

```
┌──────────────────────────────────────────────┐
│ Interim CEO Designation                      │
│ ──────────────────────────────────────────── │
│                                              │
│ PRIMARY INTERIM CEO:                         │
│ Name: [COO - Candidate A]                    │
│ Current Role: Chief Operating Officer        │
│ Age: [45]                                    │
│                                              │
│ Qualifications:                              │
│ ☑️ Deep knowledge of company operations      │
│ ☑️ Trusted by Board and ownership            │
│ ☑️ Immediately available                     │
│ ☑️ Strong crisis management skills           │
│ ☑️ Internal credibility with team            │
│                                              │
│ Readiness Assessment: [High - Ready Now]     │
│                                              │
│ BACKUP INTERIM CEO:                          │
│ Name: [CFO - Candidate X]                    │
│ Reason for backup: If primary unavailable    │
│                    or conflicted             │
│                                              │
│ THIRD OPTION (if primary + backup fail):     │
│ ( ) Independent Director                     │
│ ( ) Family Council Chair                     │
│ (●) External interim executive (search firm) │
│     Firm pre-selected: [Spencer Stuart]      │
│     Retainer: [Active / To be activated ▼]   │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ APPOINTMENT MECHANICS:                       │
│                                              │
│ ☑️ Pre-signed appointment letter             │
│    Stored: [Legal counsel safe deposit]      │
│    Contents: Authority, term, compensation   │
│    Reviewed: [Annually]                      │
│                                              │
│ ☑️ Board resolution template                 │
│    Pre-drafted and approved in principle     │
│    Ready to execute immediately              │
│                                              │
│ ☑️ Powers of attorney (if needed)            │
│    Checked by legal counsel                  │
│                                              │
│ ☑️ Emergency contact protocol                │
│    24/7 contact numbers for all parties      │
│    Backup communication methods              │
│                                              │
│ COMPENSATION (Interim Period):               │
│ Base salary: [Current salary + 25% premium]  │
│ Bonus: [Prorated based on 90-day performance]│
│ Benefits: [Continue existing]                │
│ Reversion: [Return to prior role after term] │
│                                              │
└──────────────────────────────────────────────┘
```

---

**3. Interim CEO Authority & Constraints** (What they can/cannot do)

```
┌──────────────────────────────────────────────┐
│ Interim CEO: Authority & Constraints         │
│ ──────────────────────────────────────────── │
│                                              │
│ Term: [90] days maximum                      │
│ Title: [Acting CEO / Interim CEO]            │
│ Reports to: [Board Chair]                    │
│ Review frequency: [Weekly for first month,   │
│                    then bi-weekly]           │
│                                              │
│ ═══════════════════════════════════════════  │
│ CATEGORY A: FULL AUTHORITY (No approval)     │
│ ═══════════════════════════════════════════  │
│                                              │
│ ☑️ Day-to-day operations                     │
│    All routine business decisions            │
│                                              │
│ ☑️ Execute approved budget                   │
│    Within existing financial plan            │
│                                              │
│ ☑️ Contracts <$100K                          │
│    Normal course of business                 │
│                                              │
│ ☑️ Hiring decisions <VP level                │
│    Backfills and planned roles               │
│                                              │
│ ☑️ Expense approvals per policy              │
│    Existing approval authorities continue    │
│                                              │
│ ☑️ External representation                   │
│    Customers, suppliers, partners            │
│    (Position as "Interim CEO")               │
│                                              │
│ ☑️ Board meeting attendance                  │
│    Full participation with voting rights     │
│                                              │
│ ☑️ Team management                           │
│    Performance management, coaching          │
│                                              │
│ ═══════════════════════════════════════════  │
│ CATEGORY B: REQUIRES BOARD APPROVAL          │
│ ═══════════════════════════════════════════  │
│                                              │
│ ☑️ Contracts >$100K                          │
│    Board Chair can expedite if urgent        │
│                                              │
│ ☑️ VP+ level hires or terminations           │
│    Exception: Backfill for departures        │
│                                              │
│ ☑️ Legal settlements >$50K                   │
│    Risk committee approval required          │
│                                              │
│ ☑️ Off-budget expenditures                   │
│    Any spending not in approved budget       │
│                                              │
│ ☑️ Crisis communications (external)          │
│    Board Chair must approve messaging        │
│                                              │
│ ☑️ Policy changes (HR, operations)           │
│    Material changes to company policies      │
│                                              │
│ ☑️ Real estate transactions                  │
│    Lease, buy, sell property                 │
│                                              │
│ ═══════════════════════════════════════════  │
│ CATEGORY C: STRICTLY PROHIBITED              │
│ ═══════════════════════════════════════════  │
│                                              │
│ ☑️ M&A transactions (any size)               │
│    No acquisitions, sales, or investments    │
│                                              │
│ ☑️ Strategic plan changes                    │
│    Execute existing plan only                │
│                                              │
│ ☑️ Major capital expenditures                │
│    >$500K or not in approved budget          │
│                                              │
│ ☑️ Dividend policy changes                   │
│    Continue existing policy only             │
│                                              │
│ ☑️ Executive team restructuring              │
│    No org changes at senior level            │
│                                              │
│ ☑️ New debt or financing                     │
│    No changes to capital structure           │
│                                              │
│ ☑️ Related party transactions                │
│    No dealings with family/owners            │
│                                              │
│ ☑️ Compensation changes (executives)         │
│    No raises, bonuses outside plan           │
│                                              │
│ Philosophy: "Stabilize, don't transform"     │
│                                              │
└──────────────────────────────────────────────┘
```

---

**4. 90-Day Action Plan** (What happens when)

```
┌──────────────────────────────────────────────┐
│ 90-Day Emergency Succession Timeline         │
│ ──────────────────────────────────────────── │
│                                              │
│ DAY 1-7: STABILIZATION PHASE                 │
│ ──────────────────────────────────────────── │
│                                              │
│ Hour 0-24: Immediate Actions                 │
│ ☑️ Board Chair activates emergency plan      │
│ ☑️ Interim CEO formally appointed            │
│ ☑️ Emergency notification sent to key parties│
│ ☑️ Crisis management team convened           │
│                                              │
│ Day 1: Internal Communication                │
│ ☑️ Interim CEO addresses executive team      │
│    Message: Continuity, stability, plan      │
│ ☑️ All-hands meeting (if appropriate)        │
│ ☑️ Department head briefings                 │
│                                              │
│ Day 2-3: External Communication              │
│ ☑️ Board-approved statement prepared         │
│ ☑️ Key customer/supplier outreach            │
│    Personal calls from Interim CEO           │
│ ☑️ Investor communication (if applicable)    │
│ ☑️ Media response plan (if needed)           │
│                                              │
│ Day 4-7: Operations Check                    │
│ ☑️ Review critical projects/decisions        │
│ ☑️ Assess immediate risks                    │
│ ☑️ Confirm authority delegations             │
│ ☑️ First Board update (Day 7)                │
│                                              │
│ Communication Templates:                     │
│ • Internal: [Pre-drafted, approved]          │
│ • External: [Pre-drafted, approved]          │
│ • Media: [Holding statements ready]          │
│ • Customer: [Personal outreach scripts]      │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ DAY 8-30: STEADY STATE PHASE                 │
│ ──────────────────────────────────────────── │
│                                              │
│ Objectives:                                  │
│ • Maintain normal operations                 │
│ • Execute existing strategic plan            │
│ • Build confidence with stakeholders         │
│ • No major changes or initiatives            │
│                                              │
│ Weekly Activities:                           │
│ ☑️ Monday: Executive team meeting            │
│ ☑️ Wednesday: Board Chair check-in           │
│ ☑️ Friday: Week-in-review report             │
│                                              │
│ Board Engagement:                            │
│ • Weekly updates (written)                   │
│ • Bi-weekly Board calls                      │
│ • Special meetings as needed                 │
│ • Board Chair on call 24/7                   │
│                                              │
│ Stakeholder Management:                      │
│ • Regular customer check-ins                 │
│ • Supplier relationship maintenance          │
│ • Employee morale monitoring                 │
│ • Performance tracking continues             │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ DAY 31-90: TRANSITION PHASE                  │
│ ──────────────────────────────────────────── │
│                                              │
│ Two Scenarios:                               │
│                                              │
│ SCENARIO A: Current CEO Returns              │
│ ☑️ Gradual handback of responsibilities      │
│ ☑️ Knowledge transfer from Interim           │
│ ☑️ Transition communication plan             │
│ ☑️ Interim CEO returns to prior role         │
│ ☑️ Lessons learned documentation             │
│                                              │
│ SCENARIO B: Permanent CEO Search             │
│ ☑️ Search committee formation (Day 31)       │
│    Members: [Board Chair, Owners, FC rep]    │
│ ☑️ Executive search firm engagement          │
│    Firm: [Pre-selected or rapid selection]   │
│ ☑️ Position profile (use Stage 3 output)     │
│ ☑️ Internal candidates consideration         │
│    (Use Stage 5 assessments)                 │
│ ☑️ Search timeline: [60-90 days typical]     │
│                                              │
│ Interim CEO Extension:                       │
│ IF search takes longer:                      │
│ • Interim can be extended by Board vote      │
│ • Maximum total: [6 months]                  │
│ • Consider internal promotion vs. external   │
│                                              │
│ Transition to New CEO:                       │
│ • 30-day overlap if possible                 │
│ • Interim CEO assists onboarding             │
│ • Knowledge transfer documented              │
│ • Interim returns to role (or exit package)  │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ DECISION POINT: Day 60                       │
│                                              │
│ Board must decide by Day 60:                 │
│ ( ) Current CEO returning (date: [____])     │
│ ( ) Permanent search initiated               │
│ ( ) Internal promotion (candidate: [____])   │
│ ( ) Extend interim (max 6 months total)      │
│                                              │
│ ⚠️ No decision by Day 60 = automatic search  │
│                                              │
└──────────────────────────────────────────────┘
```

---

**5. Emergency Contacts & Documentation**

```
┌──────────────────────────────────────────────┐
│ Emergency Contact Protocol                   │
│ ──────────────────────────────────────────── │
│                                              │
│ 24/7 EMERGENCY CONTACTS:                     │
│                                              │
│ Board Chair: [Name, Cell, Email, WhatsApp]   │
│ Lead Indep. Director: [Contact info]         │
│ Legal Counsel: [Contact info + backup]       │
│ Interim CEO: [Contact info]                  │
│ Backup Interim: [Contact info]               │
│ All Owners: [Contact list with preferences]  │
│ Family Council Chair: [Contact info]         │
│ HRD: [Contact info]                          │
│ PR/Communications Lead: [Contact info]       │
│                                              │
│ DOCUMENT STORAGE:                            │
│ ──────────────────────────────────────────── │
│                                              │
│ Physical Copies Stored At:                   │
│ Location 1: [Legal counsel office safe]      │
│ Location 2: [Board Chair secure location]    │
│ Location 3: [Company safe]                   │
│                                              │
│ Documents Included:                          │
│ ☑️ This emergency succession plan            │
│ ☑️ Pre-signed appointment letters            │
│ ☑️ Board resolution templates                │
│ ☑️ Communication templates (all audiences)   │
│ ☑️ Authority matrix for interim CEO          │
│ ☑️ Emergency contact list                    │
│ ☑️ Key passwords/access (sealed envelope)    │
│ ☑️ Banking/financial authorities             │
│ ☑️ Critical vendor/customer contacts         │
│                                              │
│ Digital Copies:                              │
│ ☑️ Encrypted cloud storage (family_id vault) │
│ ☑️ Platform: Constitution Service            │
│ ☑️ Access: Board Chair, Legal, Owners        │
│ ☑️ Backup: Offline encrypted USB             │
│                                              │
│ ANNUAL REVIEW:                               │
│ ☑️ Review emergency plan: [Every January]    │
│ ☑️ Update contacts: [Immediately when change]│
│ ☑️ Refresh documents: [Annually + CEO change]│
│ ☑️ Test protocol: [Desktop simulation yearly]│
│                                              │
│ INSURANCE:                                   │
│ ☑️ Key person insurance on CEO: [$XM]        │
│ ☑️ D&O insurance current                     │
│ ☑️ Business interruption coverage            │
│                                              │
└──────────────────────────────────────────────┘
```

---

#### 💾 Data Collected

**Stage 7 Output:**
```json
{
  "stage_7": {
    "emergency_succession_plan": {
      "trigger_conditions": {
        "unavailability_days": 30,
        "triggers": ["medical_emergency", "sudden_death", "immediate_resignation", "legal_prohibition", "family_crisis"],
        "declaration_authority": {
          "primary": "board_chair",
          "backup": "lead_independent_director",
          "requires": "simple_majority_board_vote"
        },
        "notification_protocol": {
          "timeframe_hours": 24,
          "notify": ["all_owners", "all_board", "exec_team", "fc_chair", "legal", "hrd"]
        }
      },
      "interim_ceo": {
        "primary": {
          "candidate_id": "uuid",
          "name": "Candidate A (COO)",
          "current_role": "Chief Operating Officer",
          "readiness": "high",
          "availability": "immediate"
        },
        "backup": {
          "candidate_id": "uuid",
          "name": "Candidate X (CFO)"
        },
        "third_option": "external_interim_executive",
        "search_firm": "Spencer Stuart"
      },
      "appointment_mechanics": {
        "pre_signed_letter": true,
        "letter_storage": "legal_counsel_safe_deposit",
        "board_resolution_template": true,
        "powers_of_attorney": true,
        "emergency_contacts": true,
        "annual_review": true
      },
      "interim_authority": {
        "term_days": 90,
        "title": "Acting CEO",
        "full_authority": ["day_to_day_ops", "execute_budget", "contracts_lt_100k", "hiring_lt_vp", "external_representation", "board_attendance"],
        "requires_board_approval": ["contracts_gt_100k", "vp_plus_hires", "legal_settlements_gt_50k", "crisis_comms"],
        "prohibited": ["mna_transactions", "strategic_plan_changes", "major_capex", "dividend_policy", "exec_restructuring", "new_debt"]
      },
      "ninety_day_plan": {
        "day_1_7_stabilization": {
          "hour_0_24": ["board_chair_activates", "interim_appointed", "notifications_sent", "crisis_team_convened"],
          "day_1": ["exec_team_address", "dept_briefings"],
          "day_2_3": ["external_comms", "customer_supplier_outreach", "investor_comms"],
          "day_4_7": ["ops_review", "risk_assessment", "first_board_update"]
        },
        "day_8_30_steady_state": {
          "objectives": ["maintain_operations", "execute_existing_plan", "build_confidence"],
          "weekly_activities": ["monday_exec_meeting", "wednesday_board_chair_checkin", "friday_review"],
          "board_engagement": "weekly_updates_biweekly_calls"
        },
        "day_31_90_transition": {
          "scenarios": ["ceo_returns", "permanent_search"],
          "decision_point_day": 60,
          "interim_extension_max_days": 180
        }
      },
      "emergency_contacts": {
        "board_chair": {"name": "", "mobile": "", "email": ""},
        "lead_independent_director": {},
        "legal_counsel": {},
        "storage_locations": ["legal_office_safe", "board_chair_secure", "company_safe"],
        "digital_storage": "constitution_service_encrypted"
      },
      "communication_templates": {
        "internal": "pre_drafted_approved",
        "external": "pre_drafted_approved",
        "media": "holding_statements_ready",
        "customer": "personal_scripts_ready"
      },
      "plan_pdf": "base64_encoded_document",
      "sealed_envelopes": ["appointment_letter_coo", "board_resolution", "access_codes"]
    }
  }
}
```

**Stored in:** Constitution Service (port 8002) → succession_policy.emergency_plan

**Extra security**: Highest encryption level, access restricted to Board Chair, Owners, Legal

---

#### ⭐ Transition

**"Complete Emergency Plan" button:**

**Validation:**
1. ✅ Triggers defined?
2. ✅ Interim CEO(s) designated?
3. ✅ Authority matrix complete?
4. ✅ 90-day timeline filled?
5. ✅ Emergency contacts provided?
6. ⚠️ Pre-signed letters need physical execution?

**Post-completion actions:**
```
⚠️ CRITICAL: Physical Documents Required

Your emergency succession plan is complete digitally.

NEXT STEPS (Outside Workshop):
1. Board Chair schedules meeting with Interim CEO
2. Execute pre-signed appointment letters
3. Store physical copies in 3 secure locations
4. Annual review calendar event created

[Acknowledge] [Export Emergency Plan PDF]
```

**If validation passes:**
- Saves emergency plan
- Generates sealed document packages
- Schedules annual review reminders
- Auto-transition to Screen 8 (RACI & Communications)

---

### Screen 8: Process, RACI & Communications (20 minutes)

#### 🎯 Goal
Define decision-making process for succession, RACI matrix, and stakeholder communication plan

#### ⏱️ Duration
20 minutes

#### 👥 Roles & Permissions

**Consultant (Facilitator):**
- Guides RACI and process design
- Cannot vote on decision rights

**Owners + Board Chair:**
- Full editing permissions
- Define RACI roles
- Approve communication plan

**All Participants:**
- Input on their respective roles
- Clarify responsibilities

---

#### 🎨 Wireframe Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Header: Succession & Development Workshop                   │
│ Stage 8 of 9: RACI & Communications | ⏱️ 20:00 | 👥 9 online│
├─────────────────────────┬───────────────────────────────────┤
│                         │                                   │
│  Facilitator Panel      │  Main Workspace: RACI Builder     │
│  (Left - 20%)           │  (Center - 60%)                   │
│                         │                                   │
│  📊 Key Decisions:      │  ┌─────────────────────────────┐ │
│  ✅ Final CEO Selection │  │  Succession RACI Matrix     │ │
│  ⏳ Development Plans   │  │  ───────────────────────────│ │
│  [ ] Emergency Trigger  │  │                             │ │
│  [ ] Policy Updates     │  │  Decision 1: Final CEO      │ │
│                         │  │  Selection                  │ │
│  ⏰ Per decision: ~4min │  │  ───────────────────────────│ │
│                         │  │                             │ │
│  💡 RACI Key:           │  │  Assign RACI Roles:         │ │
│  R = Responsible        │  │                             │ │
│      (Does the work)    │  │  Board of Directors: [A][C] │ │
│  A = Accountable        │  │  Owners/Shareholders:[A][ ] │ │
│      (Final decision)   │  │  Family Council:     [C][I] │ │
│  C = Consulted          │  │  HRD:                [R][ ] │ │
│      (Input sought)     │  │  CEO (Current):      [C][ ] │ │
│  I = Informed           │  │  Legal Counsel:      [C][I] │ │
│      (Kept in loop)     │  │  Search Committee:   [R][ ] │ │
│                         │  │                             │ │
│  ⚠️ RACI Rules:         │  │  Validation:                │ │
│  • At least 1 "A"       │  │  ✅ Board + Owners both 'A' │ │
│  • At least 1 "R"       │  │  ✅ HRD + Search Comm 'R'   │ │
│  • C/I optional         │  │  ⚠️ Current CEO 'C' - OK    │ │
│                         │  │                             │ │
│  [Show Best Practices]  │  │  Workflow:                  │ │
│                         │  │  1. Search Committee list   │ │
│                         │  │  2. HRD coordinates process │ │
│                         │  │  3. Board interviews & rec  │ │
│                         │  │  4. Owners make final       │ │
│                         │  │  5. FC and Legal consulted  │ │
│                         │  │  6. All stakeholders inform │ │
│                         │  │                             │ │
│                         │  │  [💾 Save] [Next Decision→] │ │
│                         │  └─────────────────────────────┘ │
│                         │                                   │
├─────────────────────────┼───────────────────────────────────┤
│                         │  Review & Update Schedule (Bottom)│
│                         │                                   │
│                         │  ┌─────────────────────────────┐ │
│                         │  │ Succession Policy: Review   │ │
│                         │  │                             │ │
│                         │  │ Annual Full Review:         │ │
│                         │  │ Frequency: [Every January]  │ │
│                         │  │ Led by: [Board Succession]  │ │
│                         │  │ Participants: [Board,       │ │
│                         │  │   Owners, HRD, FC Chair]    │ │
│                         │  │                             │ │
│                         │  │ Quarterly Candidate Check:  │ │
│                         │  │ Frequency: [Every 3 months] │ │
│                         │  │ Led by: [HRD + Mentors]     │ │
│                         │  │ Format: [Development review]│ │
│                         │  │                             │ │
│                         │  │ Trigger Events (Immediate): │ │
│                         │  │ • CEO announces retirement  │ │
│                         │  │ • Key candidate leaves      │ │
│                         │  │ • Major org/strategy change │ │
│                         │  │ • Emergency plan activation │ │
│                         │  │                             │ │
│                         │  │ [Configure Calendar]        │ │
│                         │  └─────────────────────────────┘ │
│                         │                                   │
└─────────────────────────┴───────────────────────────────────┘
│ Footer: [< Previous] [Complete RACI] [💾 Auto-saving...]   │
└─────────────────────────────────────────────────────────────┘
```

---

#### 📋 RACI Matrix for Key Succession Decisions

**Decision 1: Final CEO Candidate Selection**

```
┌──────────────────────────────────────────────┐
│ Decision 1: Final CEO Candidate Selection    │
│ ──────────────────────────────────────────── │
│                                              │
│ Assign RACI Roles:                           │
│                                              │
│ Board of Directors:         [A] [C]          │
│ Owners/Shareholders:        [A] [ ]          │
│ Family Council:             [C] [I]          │
│ HRD:                        [R] [ ]          │
│ Search Committee:           [R] [ ]          │
│ CEO (Current):              [C] [ ]          │
│ Legal Counsel:              [C] [I]          │
│ Independent Advisor:        [C] [ ]          │
│                                              │
│ Workflow Description:                        │
│ 1. Search Committee (R) creates shortlist    │
│ 2. HRD (R) coordinates interviews            │
│ 3. Board (A) interviews and recommends       │
│ 4. Owners (A) make final decision            │
│ 5. FC, CEO, Legal (C) provide input          │
│ 6. All stakeholders (I) informed             │
│                                              │
│ Decision Threshold:                          │
│ • Board: [Majority recommendation]           │
│ • Owners: [66% approval required]            │
│                                              │
│ Timeline: Final decision within [30] days    │
│ of Board recommendation                      │
│                                              │
│ Tie-Breaker: [Owners have final authority]   │
│                                              │
└──────────────────────────────────────────────┘
```

---

**Decision 2: Approve Development Plans**

```
┌──────────────────────────────────────────────┐
│ Decision 2: Approve Individual Development   │
│              Plans for Successors            │
│ ──────────────────────────────────────────── │
│                                              │
│ Assign RACI Roles:                           │
│                                              │
│ HRD:                        [R] [ ]          │
│ CEO (Current):              [A] [ ]          │
│ Board Succession Comm:      [C] [ ]          │
│ Owners:                     [I] [ ]          │
│ Candidate's Mentor:         [C] [ ]          │
│ Family Council:             [I] [ ]          │
│                                              │
│ Workflow:                                    │
│ 1. HRD (R) drafts development plans          │
│ 2. CEO (A) reviews and approves              │
│ 3. Board Succession Committee (C) advised    │
│ 4. Owners (I) informed of plans              │
│                                              │
│ Review Frequency: [Quarterly]                │
│                                              │
└──────────────────────────────────────────────┘
```

---

**Decision 3: Trigger Emergency Plan**

```
┌──────────────────────────────────────────────┐
│ Decision 3: Activate Emergency Succession    │
│ ──────────────────────────────────────────── │
│                                              │
│ Assign RACI Roles:                           │
│                                              │
│ Board Chair:                [R] [ ]          │
│ Owners:                     [A] [ ]          │
│ HRD:                        [C] [ ]          │
│ Legal Counsel:              [C] [ ]          │
│ Family Council:             [I] [ ]          │
│ Interim CEO:                [I] [ ]          │
│                                              │
│ Workflow:                                    │
│ 1. Board Chair (R) assesses situation        │
│ 2. Consults Legal, HRD (C)                   │
│ 3. Recommends activation to Owners           │
│ 4. Owners (A) approve (simple majority)      │
│ 5. Interim CEO and FC informed               │
│                                              │
│ Timeframe: Decision within [24 hours]        │
│                                              │
└──────────────────────────────────────────────┘
```

---

**Decision 4: Update Succession Policy**

```
┌──────────────────────────────────────────────┐
│ Decision 4: Amend/Update Succession Policy   │
│ ──────────────────────────────────────────── │
│                                              │
│ Assign RACI Roles:                           │
│                                              │
│ Board Chair:                [R] [ ]          │
│ Board Succession Committee: [R] [ ]          │
│ Owners:                     [A] [ ]          │
│ Family Council:             [C] [ ]          │
│ HRD:                        [C] [ ]          │
│ Legal Counsel:              [C] [ ]          │
│ All Stakeholders:           [I] [ ]          │
│                                              │
│ Workflow:                                    │
│ 1. Board Chair/Committee (R) proposes changes│
│ 2. Consults FC, HRD, Legal (C)               │
│ 3. Owners (A) approve changes                │
│ 4. All stakeholders (I) notified             │
│                                              │
│ Approval Threshold: [66% of owners]          │
│                                              │
│ Review Triggers:                             │
│ • Annual scheduled review                    │
│ • Major organizational change                │
│ • CEO transition completed                   │
│ • Material business change                   │
│                                              │
└──────────────────────────────────────────────┘
```

---

#### 📅 Review & Update Calendar

```
┌──────────────────────────────────────────────┐
│ Succession Policy: Review & Update Schedule  │
│ ──────────────────────────────────────────── │
│                                              │
│ ANNUAL FULL REVIEW:                          │
│ ──────────────────────────────────────────── │
│                                              │
│ Frequency: [Every January]                   │
│ Duration: [Half-day session]                 │
│ Led by: [Board Succession Committee Chair]   │
│                                              │
│ Participants:                                │
│ • All Board members (required)               │
│ • All Owners (required)                      │
│ • HRD (required)                             │
│ • Family Council Chair (required)            │
│ • CEO (required)                             │
│ • Legal Counsel (as needed)                  │
│ • Consultant/Advisor (optional)              │
│                                              │
│ Review Agenda:                               │
│ 1. Candidate pipeline status (60 min)        │
│    • Readiness updates                       │
│    • Development progress                    │
│    • New candidates identified               │
│                                              │
│ 2. Policy updates needed? (30 min)           │
│    • Role profiles still accurate?           │
│    • Selection criteria valid?               │
│    • Emergency plan current?                 │
│                                              │
│ 3. Next year priorities (30 min)             │
│    • Development investments                 │
│    • Timeline adjustments                    │
│    • Action items assignment                 │
│                                              │
│ Outputs:                                     │
│ ☑️ Updated candidate assessments             │
│ ☑️ Revised development plans (if needed)     │
│ ☑️ Policy amendments (if needed)             │
│ ☑️ Annual succession report                  │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ QUARTERLY CANDIDATE CHECK-INS:               │
│ ──────────────────────────────────────────── │
│                                              │
│ Frequency: [Every 3 months]                  │
│ Duration: [1-2 hours per candidate]          │
│ Led by: [HRD + Assigned Mentor]              │
│                                              │
│ Participants:                                │
│ • Candidate                                  │
│ • HRD                                        │
│ • Assigned mentor/coach                      │
│ • Direct manager                             │
│                                              │
│ Review Focus:                                │
│ • Development roadmap progress               │
│ • Milestone achievement                      │
│ • 360 feedback review                        │
│ • Challenges and support needed              │
│ • Go/Stop/Pivot decision (at checkpoints)    │
│                                              │
│ Outputs:                                     │
│ ☑️ Progress report                           │
│ ☑️ Updated development plan (if needed)      │
│ ☑️ Escalation to Board (if issues)           │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ BOARD SUCCESSION COMMITTEE:                  │
│ ──────────────────────────────────────────── │
│                                              │
│ Frequency: [Bi-annual meetings]              │
│ Composition:                                 │
│ • [3] Board members (including 1 independent)│
│ • Board Chair (ex-officio)                   │
│                                              │
│ Responsibilities:                            │
│ • Monitor candidate development              │
│ • Review succession readiness                │
│ • Oversee emergency plan updates             │
│ • Recommend policy changes to full Board     │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ TRIGGER EVENTS (Immediate Policy Review):    │
│ ──────────────────────────────────────────── │
│                                              │
│ ☑️ CEO announces retirement intent           │
│    Action: Accelerate succession timeline    │
│                                              │
│ ☑️ Key successor candidate leaves company    │
│    Action: Reassess pipeline, external search│
│                                              │
│ ☑️ Major organizational change               │
│    Action: Review role profiles & criteria   │
│                                              │
│ ☑️ Emergency plan activated                  │
│    Action: Post-crisis review & lessons      │
│                                              │
│ ☑️ Material business strategy change         │
│    Action: Reassess leadership requirements  │
│                                              │
│ ☑️ Significant family governance change      │
│    Action: Align succession with new structure│
│                                              │
└──────────────────────────────────────────────┘
```

---

#### 📢 Communication Plan

```
┌──────────────────────────────────────────────┐
│ Stakeholder Communication Plan               │
│ ──────────────────────────────────────────── │
│                                              │
│ INTERNAL STAKEHOLDERS:                       │
│ ──────────────────────────────────────────── │
│                                              │
│ 1. Executive Team                            │
│    What: Policy existence, their role,       │
│          development opportunities           │
│    When: [Within 2 weeks of policy approval] │
│    How: [CEO-led meeting]                    │
│    Who: [CEO + HRD present]                  │
│                                              │
│ 2. Succession Candidates                     │
│    What: Their inclusion, development plan,  │
│          expectations, confidentiality       │
│    When: [Individual meetings within 2 weeks]│
│    How: [1-on-1 with CEO and/or Board Chair] │
│    Who: [CEO, Board Chair, or assigned mentor│
│                                              │
│ 3. All Employees                             │
│    What: Policy exists (high-level), ensures │
│          continuity, succession planning is  │
│          strength of organization            │
│    When: [Company-wide communication]        │
│    How: [Email + town hall from CEO]         │
│    Who: [CEO presents]                       │
│    Message: "We have robust succession plans │
│            in place for leadership continuity│
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ EXTERNAL STAKEHOLDERS:                       │
│ ──────────────────────────────────────────── │
│                                              │
│ 1. Key Customers                             │
│    What: Company has strong succession plan, │
│          leadership continuity assured       │
│    When: [As appropriate in relationship]    │
│    How: [Personal conversations by CEO]      │
│    Who: [CEO or account owners]              │
│                                              │
│ 2. Major Suppliers/Partners                  │
│    What: Same as customers                   │
│    When: [Opportunistic]                     │
│    How: [Business reviews, exec meetings]    │
│                                              │
│ 3. Investors (if applicable)                 │
│    What: Succession planning process in place│
│          governance strength                 │
│    When: [Annual investor meetings]          │
│    How: [Board Chair or CEO presents]        │
│                                              │
│ 4. Banks/Lenders                             │
│    What: Leadership continuity assured       │
│    When: [As required by covenants]          │
│    How: [Written compliance confirmation]    │
│                                              │
│ 5. Media/Public                              │
│    What: ONLY upon actual CEO transition     │
│    When: [At time of announcement]           │
│    How: [Press release, as needed]           │
│    Who: [Board Chair + CEO]                  │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ CONFIDENTIALITY RULES:                       │
│ ──────────────────────────────────────────── │
│                                              │
│ CONFIDENTIAL (Limited distribution):         │
│ • Specific candidate names & assessments     │
│ • Individual development plans               │
│ • Candidate scores and readiness             │
│ • Emergency succession designations          │
│ • Specific timelines for transitions         │
│                                              │
│ PUBLIC (Can be shared broadly):              │
│ • Policy existence                           │
│ • Succession planning process (general)      │
│ • Commitment to leadership continuity        │
│ • Governance strength                        │
│                                              │
│ Breach of confidentiality:                   │
│ • Serious governance violation               │
│ • Potential termination/removal from role    │
│ • Legal action if damages result             │
│                                              │
│ ──────────────────────────────────────────── │
│                                              │
│ COMMUNICATION TIMING:                        │
│ ──────────────────────────────────────────── │
│                                              │
│ Event: Policy Approved                       │
│ Timeline:                                    │
│ • Week 1: Board, Owners, FC notified         │
│ • Week 2: Executive team, candidates told    │
│ • Week 3: All employees informed (general)   │
│ • Ongoing: External as appropriate           │
│                                              │
│ Event: CEO Transition Announced              │
│ Timeline:                                    │
│ • Day 0: Board, Owners first                 │
│ • Day 1: Executive team, candidates          │
│ • Day 2: All employees                       │
│ • Day 2: Key customers/suppliers (personal)  │
│ • Day 3: Public announcement (if needed)     │
│                                              │
│ Event: Emergency Succession Activated        │
│ Timeline: See Emergency Plan (Stage 7)       │
│                                              │
│ [💾 Save Communication Plan]                 │
└──────────────────────────────────────────────┘
```

---

#### 💾 Data Collected

**Stage 8 Output:**
```json
{
  "stage_8": {
    "raci_matrix": {
      "decisions": [
        {
          "decision_name": "Final CEO Candidate Selection",
          "roles": {
            "board_of_directors": "A",
            "owners_shareholders": "A",
            "family_council": "C",
            "hrd": "R",
            "search_committee": "R",
            "ceo_current": "C",
            "legal_counsel": "C"
          },
          "workflow": "search_committee_shortlists -> hrd_coordinates -> board_interviews_recommends -> owners_decide",
          "decision_threshold": {
            "board": "majority_recommendation",
            "owners": "66_percent_approval"
          },
          "timeline_days": 30,
          "tie_breaker": "owners_final_authority"
        },
        {
          "decision_name": "Approve Development Plans",
          "roles": {
            "hrd": "R",
            "ceo_current": "A",
            "board_succession_committee": "C",
            "owners": "I"
          }
        },
        {
          "decision_name": "Trigger Emergency Plan",
          "roles": {
            "board_chair": "R",
            "owners": "A",
            "hrd": "C",
            "legal_counsel": "C"
          }
        },
        {
          "decision_name": "Update Succession Policy",
          "roles": {
            "board_chair": "R",
            "board_succession_committee": "R",
            "owners": "A",
            "family_council": "C",
            "hrd": "C",
            "legal_counsel": "C"
          },
          "approval_threshold": "66_percent_owners"
        }
      ]
    },
    "review_calendar": {
      "annual_full_review": {
        "frequency": "every_january",
        "duration_hours": 4,
        "led_by": "board_succession_committee_chair",
        "participants": ["all_board", "all_owners", "hrd", "fc_chair", "ceo", "legal"],
        "outputs": ["updated_assessments", "revised_plans", "policy_amendments", "annual_report"]
      },
      "quarterly_candidate_checkins": {
        "frequency": "every_3_months",
        "duration_hours": 2,
        "led_by": "hrd_and_mentor",
        "focus": ["roadmap_progress", "milestones", "360_feedback", "support_needs"]
      },
      "board_succession_committee": {
        "frequency": "bi_annual",
        "composition": ["3_board_members", "1_independent", "board_chair_exofficio"]
      },
      "trigger_events": ["ceo_retirement_announced", "key_candidate_leaves", "major_org_change", "emergency_activated", "strategy_change"]
    },
    "communication_plan": {
      "internal": {
        "executive_team": {
          "what": "policy_existence_their_role_dev_opportunities",
          "when": "within_2_weeks_approval",
          "how": "ceo_led_meeting"
        },
        "succession_candidates": {
          "what": "inclusion_dev_plan_expectations_confidentiality",
          "when": "individual_meetings_2_weeks",
          "how": "1on1_ceo_or_board_chair"
        },
        "all_employees": {
          "what": "policy_exists_high_level_continuity_strength",
          "when": "company_wide_communication",
          "how": "email_townhall_from_ceo"
        }
      },
      "external": {
        "key_customers": "personal_conversations_as_appropriate",
        "suppliers_partners": "business_reviews_opportunistic",
        "investors": "annual_meetings_governance_strength",
        "banks_lenders": "written_compliance_as_required",
        "media_public": "only_upon_actual_transition"
      },
      "confidentiality_rules": {
        "confidential": ["candidate_names", "assessments", "dev_plans", "scores", "emergency_designations", "timelines"],
        "public": ["policy_existence", "process_general", "continuity_commitment", "governance_strength"]
      }
    }
  }
}
```

**Stored in:** Constitution Service (port 8002) → succession_policy.process_and_comms

---

#### ⭐ Transition

**"Complete RACI" button:**

**Validation:**
1. ✅ All key decisions have RACI assigned?
2. ✅ Review calendar configured?
3. ✅ Communication plan complete?

**If validation passes:**
- Saves RACI matrix
- Schedules review calendar events
- Generates communication templates
- Auto-transition to Screen 9 (Summary & Protocol)

---

### Screen 9: Summary & Protocol (10 minutes)

#### 🎯 Goal
Review complete succession policy, document decisions, generate final artifacts

#### ⏱️ Duration
10 minutes

#### 👥 Roles & Permissions

**Consultant (Facilitator):**
- Presents summary
- Confirms next steps
- Cannot vote on final approval

**Owners:**
- Final approval authority
- Vote to adopt policy

**All Participants:**
- Review and confirm understanding
- Sign protocol (electronically)

---

#### 🎨 Wireframe Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Header: Succession & Development Workshop                   │
│ Stage 9 of 9: Summary & Protocol | ⏱️ 10:00 | 👥 9 online  │
├─────────────────────────┬───────────────────────────────────┤
│                         │                                   │
│  Facilitator Panel      │  Main Summary Panel               │
│  (Left - 20%)           │  (Center - 60%)                   │
│                         │                                   │
│  ✅ Workshop Complete   │  ┌─────────────────────────────┐ │
│                         │  │  Succession Policy Summary  │ │
│  📊 Stages Completed:   │  │  v0.9 - Ready for Legal     │ │
│  ✅ 1. Objectives       │  │  ───────────────────────────│ │
│  ✅ 2. Critical Roles   │  │                             │ │
│  ✅ 3. Role Profiles    │  │  POLICY COMPONENTS:         │ │
│  ✅ 4. Criteria Matrix  │  │                             │ │
│  ✅ 5. Assessments      │  │  ☑️ 4 Roles under policy    │ │
│  ✅ 6. Roadmaps         │  │     (CEO, COO, Head Sales,  │ │
│  ✅ 7. Emergency Plan   │  │      Head of International) │ │
│  ✅ 8. RACI & Comms     │  │                             │ │
│  ✅ 9. Summary          │  │  ☑️ CEO Profile & KPIs      │ │
│                         │  │     Purpose, responsibilit  │ │
│  ⏰ Total time: 3:25hrs │  │     competencies, constrain │ │
│                         │  │                             │ │
│  📦 Artifacts Generated:│  │  ☑️ Selection Criteria      │ │
│  • Succession Policy    │  │     7 categories, weights   │ │
│  • Role Profiles (4)    │  │     100%, 0-5 scoring scale │ │
│  • Criteria Matrix      │  │                             │ │
│  • Assessment Scores    │  │  ☑️ 3 Candidates assessed   │ │
│  • 9-Box Placements     │  │     Candidate A: 4.1/5      │ │
│  • Roadmaps (3)         │  │     Candidate B: 3.8/5      │ │
│  • Emergency Plan       │  │     Candidate C: 3.2/5      │ │
│  • RACI Matrix          │  │                             │ │
│  • Communication Plan   │  │  ☑️ Development Roadmaps    │ │
│  • Protocol Document    │  │     Individual plans for    │ │
│                         │  │     each with checkpoints   │ │
│  🎯 Next Steps:         │  │                             │ │
│  1. Legal review        │  │  ☑️ 90-Day Emergency Plan   │ │
│  2. Owner ratification  │  │     Interim CEO designated, │ │
│  3. Communication       │  │     authorities defined     │ │
│  4. Implementation      │  │                             │ │
│                         │  │  ☑️ RACI & Review Schedule  │ │
│  [Download All]         │  │     Decision rights clear,  │ │
│                         │  │     annual review calendar  │ │
│                         │  │                             │ │
│                         │  │  ───────────────────────────│ │
│                         │  │                             │ │
│                         │  │  KEY DECISIONS MADE:        │ │
│                         │  │                             │ │
│                         │  │  • Succession urgency: 7/10 │ │
│                         │  │  • Values weight: 20% (top) │ │
│                         │  │  • Primary successor: Cand A│ │
│                         │  │  • Interim CEO: COO (Cand A)│ │
│                         │  │  • Annual review: January   │ │
│                         │  │                             │ │
│                         │  │  ───────────────────────────│ │
│                         │  │                             │ │
│                         │  │  [📄 View Full Policy Doc]  │ │
│                         │  │  [📊 Export All Artifacts]  │ │
│                         │  └─────────────────────────────┘ │
│                         │                                   │
├─────────────────────────┼───────────────────────────────────┤
│                         │  Protocol & Sign-off Panel        │
│                         │                                   │
│                         │  ┌─────────────────────────────┐ │
│                         │  │  Workshop Protocol & Approve│ │
│                         │  │                             │ │
│                         │  │  Session ID: [WS-20251029]  │ │
│                         │  │  Date: October 29, 2025     │ │
│                         │  │  Duration: 3h 25min         │ │
│                         │  │                             │ │
│                         │  │  Participants (9):          │ │
│                         │  │  ☑️ Alex (Consultant/Facil) │ │
│                         │  │  ☑️ Maria (Owner) ✓ Signed  │ │
│                         │  │  ☑️ John (Owner) ✓ Signed   │ │
│                         │  │  ☑️ Sarah (Family Council)  │ │
│                         │  │  ☑️ David (Board) ✓ Signed  │ │
│                         │  │  ☑️ Emma (Independent Dir)  │ │
│                         │  │  ☑️ Michael (HRD)           │ │
│                         │  │  ☑️ Lisa (CEO)              │ │
│                         │  │  ☑️ Robert (Legal Counsel)  │ │
│                         │  │                             │ │
│                         │  │  OWNER APPROVAL:            │ │
│                         │  │  ───────────────────────────│ │
│                         │  │  We, the undersigned Owners │ │
│                         │  │  approve Succession Policy  │ │
│                         │  │  v0.9 pending legal review  │ │
│                         │  │                             │ │
│                         │  │  Maria ______________ ✅    │ │
│                         │  │  John  ______________ ✅    │ │
│                         │  │  [Owner 3] __________ ⏳    │ │
│                         │  │                             │ │
│                         │  │  Approval: 2/3 (66%) ✅     │ │
│                         │  │                             │ │
│                         │  │  [Sign Protocol]            │ │
│                         │  └─────────────────────────────┘ │
│                         │                                   │
└─────────────────────────┴───────────────────────────────────┘
│ Footer: [< Previous] [✅ Complete Workshop] [💾 Saving...]  │
└─────────────────────────────────────────────────────────────┘
```

---

#### 📋 Summary Components

**Policy Summary (Auto-generated):**

```
SUCCESSION POLICY v0.9 SUMMARY

Total Roles: 4 (CEO, COO, Head of Sales, Head of International)
Risk Level: CEO - Critical (7/10 urgency)

SELECTION CRITERIA:
Top 3 Weights: Values (20%), Leadership (20%), Strategy (20%)
Minimum Threshold: 3.0/5.0 overall to qualify

CANDIDATE PIPELINE:
Ready Now: 1 (Candidate A - CEO)
12-24 Months: 1 (Candidate B - CEO)
>24 Months: 1 (Candidate C - CEO)
Total Pipeline Strength: Adequate

EMERGENCY READINESS:
Interim CEO: Designated (COO)
Plan Activated If: CEO unavailable >30 days
Emergency Plan Status: Complete, sealed documents ready

GOVERNANCE:
Review Frequency: Annual (January)
Decision Authority: Owners (final), Board (recommend)
Next Review Date: January 2026
```

---

**Home Assignments (Post-Workshop):**

```
┌──────────────────────────────────────────────┐
│ Post-Workshop Action Items                   │
│ ──────────────────────────────────────────── │
│                                              │
│ 1. HRD - Development Plans Finalization      │
│    Owner: [HRD Name]                         │
│    Due: [10 business days]                   │
│    Deliverable: Detailed development plans   │
│                 for all 3 candidates         │
│                                              │
│ 2. Legal - Policy Review & Compliance        │
│    Owner: [Legal Counsel Name]               │
│    Due: [10 business days]                   │
│    Deliverable: Legal review memo,           │
│                 compliance confirmation,     │
│                 recommended edits            │
│                                              │
│ 3. Board Chair - Board Ratification          │
│    Owner: [Board Chair Name]                 │
│    Due: [Next Board meeting]                 │
│    Deliverable: Bring policy to Board for    │
│                 formal approval vote         │
│                                              │
│ 4. Owners - Shareholder Approval (if needed) │
│    Owner: [Owner Lead Name]                  │
│    Due: [Within 30 days]                     │
│    Deliverable: Formal owner vote recorded   │
│                                              │
│ 5. HRD - Stakeholder Communication           │
│    Owner: [HRD Name]                         │
│    Due: [Per communication plan timeline]    │
│    Deliverable: Execute internal/external    │
│                 communications per Stage 8   │
│                                              │
│ 6. Board Chair - Emergency Documents         │
│    Owner: [Board Chair Name]                 │
│    Due: [Within 2 weeks]                     │
│    Deliverable: Execute pre-signed letters,  │
│                 store in 3 secure locations  │
│                                              │
│ 7. All - Calendar Integration                │
│    Owner: [HRD + Admin]                      │
│    Due: [Within 1 week]                      │
│    Deliverable: All review meetings scheduled│
│                 in calendars                 │
│                                              │
└──────────────────────────────────────────────┘
```

---

#### 📦 Artifacts Package

**Auto-generated and downloadable:**

1. **Succession Policy v0.9** (PDF, 30-40 pages)
   - Complete policy document ready for legal review
   
2. **Role Profiles** (4 × one-pagers, PDF)
   - CEO, COO, Head of Sales, Head of International
   
3. **Selection Criteria Matrix** (Excel + PDF)
   - All 7 categories with weights and sub-criteria
   
4. **Candidate Assessment Report** (PDF, Confidential)
   - Scores, 9-box placements, readiness classifications
   
5. **Development Roadmaps** (3 × PDF)
   - Candidate A, B, C individual plans with timelines
   
6. **Emergency Succession Plan** (PDF, Sealed)
   - 90-day plan, interim CEO, sealed appointment letters
   
7. **RACI Matrix** (Excel + Visual)
   - All succession decisions with roles
   
8. **Communication Plan** (PDF)
   - Stakeholder matrix, messages, timing
   
9. **Workshop Protocol** (PDF, Signed)
   - Session record, participants, decisions, signatures
   
10. **Implementation Checklist** (PDF)
    - Post-workshop action items with owners and dates

---

#### 💾 Data Collected

**Stage 9 Output:**
```json
{
  "stage_9": {
    "workshop_completion": {
      "session_id": "uuid",
      "completed_at": "2025-10-29T17:25:00Z",
      "total_duration_minutes": 205,
      "stages_completed": 9,
      "participants_present": 9
    },
    "policy_summary": {
      "version": "0.9",
      "status": "pending_legal_review",
      "total_roles": 4,
      "candidates_assessed": 3,
      "pipeline_strength": "adequate",
      "emergency_readiness": "complete"
    },
    "owner_approval": {
      "approved_by": ["owner_1_uuid", "owner_2_uuid"],
      "approval_percentage": 66,
      "approval_status": "conditional_on_legal_review",
      "approval_timestamp": "2025-10-29T17:20:00Z"
    },
    "protocol_document": {
      "signed_by": ["maria_uuid", "john_uuid", "david_uuid"],
      "protocol_pdf": "base64_encoded_signed_document"
    },
    "artifacts_generated": [
      {"artifact_name": "succession_policy_v0.9", "format": "pdf", "pages": 35},
      {"artifact_name": "role_profiles", "format": "pdf", "count": 4},
      {"artifact_name": "criteria_matrix", "format": "excel"},
      {"artifact_name": "candidate_assessments", "format": "pdf", "confidential": true},
      {"artifact_name": "development_roadmaps", "format": "pdf", "count": 3},
      {"artifact_name": "emergency_plan", "format": "pdf", "sealed": true},
      {"artifact_name": "raci_matrix", "format": "excel"},
      {"artifact_name": "communication_plan", "format": "pdf"},
      {"artifact_name": "protocol", "format": "pdf", "signed": true},
      {"artifact_name": "implementation_checklist", "format": "pdf"}
    ],
    "post_workshop_actions": [
      {"action": "hrd_finalize_plans", "owner": "hrd", "due_days": 10},
      {"action": "legal_review", "owner": "legal", "due_days": 10},
      {"action": "board_ratification", "owner": "board_chair", "due": "next_board_meeting"},
      {"action": "stakeholder_communication", "owner": "hrd", "due": "per_plan"},
      {"action": "emergency_documents_execution", "owner": "board_chair", "due_days": 14},
      {"action": "calendar_integration", "owner": "hrd_admin", "due_days": 7}
    ]
  }
}
```

**Stored in:** Education Service (port 8006) → workshop_sessions (session complete)

---

#### ⭐ Final Transition

**"Complete Workshop" button:**

**Actions:**
1. Finalizes all session data
2. Generates all artifacts
3. Sends artifacts package to authorized participants
4. Creates post-workshop task list
5. Schedules follow-up meetings
6. Transitions to post-workshop integration phase

**Success Modal:**
```
✅ Workshop Successfully Completed!

Your Succession & Development Policy v0.9 is ready.

📦 Artifacts package sent to:
   • All Owners
   • Board Chair
   • HRD
   • Legal Counsel

📅 Next steps scheduled:
   • Legal review: Due Nov 8, 2025
   • Board ratification: Nov 15, 2025
   • Implementation begins: Nov 22, 2025

🔒 Confidential materials encrypted and 
   access-controlled per family_id

[Download Artifacts] [View Action Items] [Close]
```

---

## 📤 PART 4: Post-Workshop Integration

### Automatic Deployment

**Upon Workshop Completion:**

1. **Constitution Service** receives:
   - Complete Succession Policy v0.9
   - All role profiles
   - Selection criteria matrix
   - Candidate assessments (encrypted)
   - Development roadmaps
   - Emergency plan (sealed)
   - RACI matrix
   - Review calendar

2. **Meeting Service** receives:
   - Annual review meeting (January)
   - Quarterly candidate check-ins
   - Board Succession Committee meetings
   - All roadmap milestone checkpoints

3. **Notification Service** activates:
   - HRD task reminders
   - Legal review deadline
   - Board meeting agenda item
   - Annual review notifications
   - Candidate checkpoint reminders

4. **Auth Service** updates:
   - Access controls for candidate assessments
   - Board Succession Committee members
   - Emergency plan access (Board Chair, Owners, Legal only)

---

### Policy v0.9 → v1.0 Path

```
Workshop Output: v0.9 (Draft for Review)
         ↓
Legal Review (10 days)
         ↓
Board Ratification (Next meeting)
         ↓
Owner Final Approval (66%+ vote)
         ↓
Policy v1.0 (Active)
         ↓
Stakeholder Communication
         ↓
Implementation & Monitoring
```

---

### Success Metrics

**Workshop Success:**
- ✅ All 9 stages completed
- ✅ Owner approval received (66%+)
- ✅ All artifacts generated
- ✅ Post-workshop actions assigned

**Policy Success (Measured Ongoing):**
- CEO transition occurs smoothly when needed
- Candidates progress per development roadmaps
- Annual reviews conducted on schedule
- Emergency plan tested (desktop simulation)
- Bench strength maintained (2-3 candidates per critical role)

---

### Integration with Other Modules

**Links to Decision Making Workshop:**
- CEO selection uses Decision Making module workflows
- RACI matrix integrates with governance RACI
- Owner approval process follows DM patterns

**Links to Conflict Resolution:**
- Succession disputes escalate per CR procedures
- Candidate assessment disagreements use CR mediation

**Links to Family Constitution:**
- Succession policy becomes part of constitution
- Role profiles inform family employment policy
- Emergency plan referenced in governance structure

---

## 🏁 DOCUMENT END

**Total Specification:**
- Pre-Workshop: 1 screen (Orientation)
- Workshop: 9 screens (210 minutes)
- Post-Workshop: Automatic deployment

**Key Features:**
- Real-time collaborative editing
- Role-based permissions
- Encrypted candidate data
- Automatic artifact generation
- Calendar/task integration
- Multi-service architecture

**Artifacts Generated:**
- 10 PDF documents
- 2 Excel workbooks
- Sealed emergency envelopes
- Signed protocol
- Implementation checklist

---

*End of Succession & Development Workshop Technical Specification*