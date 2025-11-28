---
doc_id: "DOC-WRK-004"
title: "360-Degree Successor Assessment - Digital Workshop Specification"
type: "workshop-specification"
category: "product"
audience: "product-manager|designer|developer"
complexity: "advanced"
created: "2025-11-03"
updated: "2025-11-03"
version: "2.0.0"
status: "draft"
tags: ["workshop", "360-assessment", "succession", "leadership", "competency-evaluation", "multi-rater-feedback"]
related: ["DOC-WRK-003-Succession", "DOC-SYS-001", "DOC-USR-006"]
owner: "product-team"
maintainer: "product-team"
priority: "high"
---

# 360-Degree Successor Assessment
## Digital Workshop Specification

> **Purpose**: Comprehensive screen-by-screen specification for multi-rater successor assessment. Enables objective evaluation of successor readiness through structured feedback from family members, colleagues, and advisors.

---

## 📋 PART 1: Workshop Overview

### 1.1 Workshop Summary

**Title:** "Оценка готовности преемника" (Successor Readiness Assessment)

**Goal:** Conduct comprehensive 360-degree evaluation of successor candidate(s) across leadership and governance competencies to inform succession planning decisions

**Duration:** 3-4 weeks total
- Setup: 30 minutes (Administrator)
- Individual assessments: 15-20 minutes each (Raters, asynchronous)
- Results review: 60-90 minutes (Candidate + Advisor)
- Development planning: 90 minutes (Candidate + Advisor)

**Format:** Asynchronous digital assessment + synchronous results debrief

**Key Participants:**
- **Assessment Administrator** (Family Council Chair/Succession Committee Lead)
- **Successor Candidate** (G2/G3 family member being evaluated)
- **Raters** (5-15 people across 5 categories)
- **Consultant/Advisor** (External facilitator for results debrief)
- **Platform Administrator** (ReFamily support for technical issues)

### 1.2 Workshop Outputs

**Primary Artifacts:**
1. **360 Assessment Results Report** - Comprehensive PDF with all competency scores, gaps analysis, spider charts
2. **Self vs Others Comparison** - Visual analysis of perception gaps
3. **Category Breakdown Report** - Scores by rater category (Family, Colleagues, Reports, Advisors)
4. **Development Roadmap** - 6-12 month action plan with prioritized initiatives
5. **Candidate Comparison Report** (if multiple candidates) - Side-by-side analysis

**Secondary Artifacts:**
6. Assessment protocol documentation
7. Anonymized rater comments compilation
8. Progress tracking dashboard (for follow-up assessments)
9. Stakeholder communication templates

### 1.3 Assessment Philosophy

**Core Principles:**
- ✅ **Anonymity First** - Individual responses never attributed, only aggregated data shown
- ✅ **Zero Defaults** - All competency models and raters selected explicitly
- ✅ **Development Focus** - Tool for growth, not judgment
- ✅ **Family Context** - Competencies tailored for family business leadership
- ✅ **Professional Caliber** - Executive coaching-level rigor and reporting

**Success Criteria:**
- 70%+ response rate from invited raters
- Candidate receives actionable development insights
- Family Council uses data in succession decision
- Follow-up assessment scheduled within 12 months

### 1.4 Technical Scope

**In Scope:**
- Multi-category rater selection and invitation
- Asynchronous competency assessment interface
- Real-time response tracking and reminders
- Automated results aggregation and anonymization
- Interactive results dashboard with visualizations
- PDF report generation with export
- Development recommendations engine
- Multi-candidate comparison tools
- Integration with Succession Planning module

**Out of Scope (Future Versions):**
- Video interview integration
- External psychometric tools (MBTI, DiSC, etc.)
- Automated IDP generation
- Longitudinal tracking across years
- AI-powered qualitative comment analysis
- 180-degree (upward only) or team assessments

---

## 📐 PART 2: Architecture & Data Models

### 2.1 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Assessment Service                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Assessment   │  │  Competency  │  │   Rater      │     │
│  │ Orchestrator │──│   Library    │  │  Management  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         │                  │                  │             │
│         ▼                  ▼                  ▼             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  Response    │  │ Aggregation  │  │   Results    │     │
│  │  Collector   │──│   Engine     │──│  Generator   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
         │                  │                  │
         ▼                  ▼                  ▼
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│ Notification   │  │  Constitution  │  │   Meeting      │
│   Service      │  │    Service     │  │   Service      │
└────────────────┘  └────────────────┘  └────────────────┘
```

### 2.2 Core Data Schemas

#### Assessment Configuration
```json
{
  "assessment_id": "uuid",
  "family_id": "uuid",
  "assessment_name": "CEO Succession - Alexandra Chen",
  "created_at": "2025-11-03T10:00:00Z",
  "created_by": "user_uuid_david_martinez",
  "status": "draft|active|completed|closed",
  "candidate": {
    "user_id": "uuid",
    "name": "Alexandra Chen",
    "current_role": "VP Operations",
    "target_role": "CEO",
    "generation": "G3"
  },
  "competency_model": {
    "model_id": "ceo_succession_v1",
    "model_name": "CEO Succession Readiness",
    "competencies": [
      {
        "id": "comp_001",
        "category": "Strategic Leadership",
        "name": "Visionary Thinking",
        "definition": "Creates compelling long-term vision...",
        "behavioral_indicators": [
          "Articulates clear 5-10 year strategic direction",
          "Anticipates market trends and opportunities",
          "Inspires others around future possibilities"
        ],
        "required_for_role": true,
        "weight": 1.5
      }
      // ... 15 more competencies
    ],
    "rating_scale": {
      "type": "5_point",
      "anchors": {
        "5": "Exceptional - Exceeds expectations",
        "4": "Strong - Ready for role",
        "3": "Adequate - Needs development",
        "2": "Developing - Significant gaps",
        "1": "Not Demonstrated - Not ready"
      }
    }
  },
  "raters": {
    "self": {
      "user_id": "candidate_uuid",
      "completed_at": null
    },
    "family_members": [
      {
        "rater_id": "uuid",
        "name": "Sarah Chen",
        "relationship": "Aunt",
        "email": "sarah@family.com",
        "invited_at": "2025-11-03T10:30:00Z",
        "reminder_count": 0,
        "completed_at": null,
        "magic_link": "https://refamily.com/assess/token_xyz"
      }
      // ... 4 more family raters
    ],
    "business_colleagues": [...],
    "direct_reports": [...],
    "external_advisors": [...]
  },
  "settings": {
    "deadline": "2025-11-24T23:59:59Z",
    "min_response_threshold": "50%",
    "anonymity_threshold": 3,
    "allow_comments": true,
    "results_visibility": {
      "candidate": true,
      "administrator": true,
      "family_council": false,
      "raters": false
    }
  },
  "progress": {
    "total_invited": 16,
    "total_completed": 8,
    "response_rate": 50.0,
    "by_category": {
      "self": "1/1",
      "family_members": "3/5",
      "business_colleagues": "2/4",
      "direct_reports": "1/3",
      "external_advisors": "1/3"
    }
  }
}
```

#### Individual Response
```json
{
  "response_id": "uuid",
  "assessment_id": "uuid",
  "rater_id": "uuid_anonymized",
  "rater_category": "family_members",
  "submitted_at": "2025-11-10T14:23:45Z",
  "time_to_complete_minutes": 18,
  "ratings": [
    {
      "competency_id": "comp_001",
      "rating": 4,
      "confidence": "high",
      "comment": "Alexandra has shown strong strategic thinking...",
      "unable_to_assess": false
    },
    {
      "competency_id": "comp_002",
      "rating": null,
      "confidence": null,
      "comment": null,
      "unable_to_assess": true,
      "reason": "Insufficient interaction"
    }
    // ... 14 more competencies
  ],
  "overall_comment": "Alexandra is nearly ready for CEO role..."
}
```

#### Aggregated Results
```json
{
  "results_id": "uuid",
  "assessment_id": "uuid",
  "generated_at": "2025-11-24T12:00:00Z",
  "candidate": {
    "name": "Alexandra Chen",
    "current_role": "VP Operations"
  },
  "overall_readiness": {
    "score": 3.8,
    "percentile": 78,
    "interpretation": "Strong - Nearly ready with targeted development"
  },
  "competency_scores": [
    {
      "competency_id": "comp_001",
      "competency_name": "Visionary Thinking",
      "category": "Strategic Leadership",
      "self_rating": 4.0,
      "others_average": 4.2,
      "others_std_dev": 0.4,
      "by_category": {
        "family_members": 4.0,
        "business_colleagues": 4.5,
        "direct_reports": 4.0,
        "external_advisors": 4.5
      },
      "rater_count": 15,
      "gap": -0.2,
      "interpretation": "Hidden strength - Others see more capability",
      "comments_count": 12,
      "comments_themes": ["Strategic vision", "Long-term thinking"],
      "percentile": 82
    }
    // ... 15 more competencies
  ],
  "category_analysis": {
    "strategic_leadership": {
      "avg_score": 4.1,
      "self_vs_others_gap": -0.3,
      "top_strength": "Visionary Thinking",
      "top_development": "Risk Management"
    },
    "family_dynamics": {...},
    "business_acumen": {...},
    "emotional_intelligence": {...},
    "governance_readiness": {...}
  },
  "top_strengths": [
    {
      "competency": "Relationship Building",
      "score": 4.5,
      "why": "Consistently high across all rater groups"
    }
    // ... 2 more
  ],
  "top_development_areas": [
    {
      "competency": "Financial Acumen",
      "score": 3.2,
      "gap_to_ready": 0.8,
      "priority": "high",
      "why": "Critical for CEO role, below threshold"
    }
    // ... 2 more
  ],
  "blind_spots": [
    {
      "competency": "Delegation",
      "self_rating": 4.0,
      "others_average": 2.8,
      "gap": 1.2,
      "note": "Self-perception significantly higher than others"
    }
  ],
  "hidden_strengths": [
    {
      "competency": "Crisis Management",
      "self_rating": 3.0,
      "others_average": 4.3,
      "gap": -1.3,
      "note": "Underestimates own capability"
    }
  ]
}
```

---

## 🖥️ PART 3: Detailed Screen Specifications

### PHASE 1: Assessment Setup (Administrator)

---

### Screen 1: Create Assessment

#### 🎯 Goal
Administrator initiates new 360 assessment, selects candidate and competency model

#### ⏱️ Duration
10 minutes

#### 👥 Roles & Permissions

**Assessment Administrator:**
- Full access to create and configure
- Selects candidate from family database
- Chooses competency model
- Sets deadline and visibility rules

**Consultant (if involved):**
- Advisory access, can suggest configuration
- No direct editing until results phase

---

#### 🎨 Wireframe Layout

```
┌─────────────────────────────────────────────────────────────────┐
│ ReFamily Platform > Succession > 360 Assessments                │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  🎯 Create New 360 Assessment                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Step 1 of 3: Select Candidate                                  │
│  ════════════════════════════════                               │
│                                                                  │
│  Who will be assessed?                                          │
│  ┌─────────────────────────────────────────┐                   │
│  │ 🔍 Search family members...             │ ▼                 │
│  └─────────────────────────────────────────┘                   │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ ○ Alexandra Chen                   [Photo]               │  │
│  │   VP Operations | G3 | Age 32                           │  │
│  │   Current: Operations Leadership                         │  │
│  │   Target: CEO Succession Path                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ ○ Michael Chen                     [Photo]               │  │
│  │   CFO | G3 | Age 35                                      │  │
│  │   Current: Financial Leadership                          │  │
│  │   Target: Board Member Path                              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ ○ James Martinez                   [Photo]               │  │
│  │   COO | G2 | Age 42                                      │  │
│  │   Current: Operations                                    │  │
│  │   Target: Interim CEO Backup                             │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│                                   [Cancel]  [Next: Choose Model]│
└─────────────────────────────────────────────────────────────────┘
```

---

### Screen 2: Select Competency Model

#### 🎯 Goal
Choose pre-built competency framework or customize for specific role

#### 🎨 Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│ 360 Assessment Setup > Alexandra Chen                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Step 2 of 3: Choose Competency Model                           │
│  ════════════════════════════════════                           │
│                                                                  │
│  Select framework for assessment:                               │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ ◉ CEO Succession Readiness              [Recommended]   │  │
│  │                                                           │  │
│  │ 16 competencies across 5 categories:                     │  │
│  │ • Strategic Leadership (4)                               │  │
│  │ • Family Dynamics (3)                                    │  │
│  │ • Business Acumen (4)                                    │  │
│  │ • Emotional Intelligence (3)                             │  │
│  │ • Governance Readiness (2)                               │  │
│  │                                                           │  │
│  │ [View Full Competency List]                              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ ○ Board Leadership Readiness                             │  │
│  │                                                           │  │
│  │ 14 competencies across 4 categories:                     │  │
│  │ • Governance Expertise (4)                               │  │
│  │ • Strategic Oversight (4)                                │  │
│  │ • Stakeholder Management (3)                             │  │
│  │ • Financial Stewardship (3)                              │  │
│  │                                                           │  │
│  │ [View Full Competency List]                              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ ○ Family Office Leadership                               │  │
│  │                                                           │  │
│  │ 12 competencies across 4 categories:                     │  │
│  │ • Wealth Management (3)                                  │  │
│  │ • Family Advisor Skills (3)                              │  │
│  │ • Operations Excellence (3)                              │  │
│  │ • Confidentiality & Trust (3)                            │  │
│  │                                                           │  │
│  │ [View Full Competency List]                              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ ○ Custom Model                                           │  │
│  │   Build from scratch or modify existing                  │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│                                           [Back]  [Next: Raters]│
└─────────────────────────────────────────────────────────────────┘
```

#### 📊 Competency Model Details (CEO Succession)

**Strategic Leadership (4 competencies)**
1. **Visionary Thinking** - Creates compelling long-term vision and inspires others
2. **Strategic Decision Making** - Makes sound decisions balancing short/long-term
3. **Innovation & Adaptation** - Drives change and adapts to market shifts
4. **Risk Management** - Identifies and mitigates strategic risks

**Family Dynamics (3 competencies)**
5. **Family Relationship Management** - Navigates complex family relationships effectively
6. **Generational Bridge Building** - Connects different generations respectfully
7. **Conflict Navigation** - Addresses family disagreements constructively

**Business Acumen (4 competencies)**
8. **Financial Stewardship** - Understands and manages financial performance
9. **Operational Excellence** - Drives efficient operations and execution
10. **Market & Competitive Intelligence** - Understands industry and competition
11. **Stakeholder Management** - Manages relationships with employees, customers, partners

**Emotional Intelligence (3 competencies)**
12. **Self-Awareness** - Understands own strengths, limitations, emotions
13. **Empathy & Listening** - Understands and responds to others' perspectives
14. **Resilience & Composure** - Maintains effectiveness under pressure

**Governance Readiness (2 competencies)**
15. **Board Engagement** - Works effectively with board and oversight structures
16. **Ethical Leadership** - Models integrity and ethical decision-making

---

### Screen 3: Select & Invite Raters

#### 🎯 Goal
Build balanced rater pool across 5 categories with minimum 3 per category for anonymity

#### 🎨 Wireframe

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 360 Assessment Setup > Alexandra Chen > CEO Succession Model            │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Step 3 of 3: Select Raters                                             │
│  ════════════════════════                                               │
│                                                                          │
│  Build balanced feedback pool (Recommended: 3-5 per category)           │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ 1️⃣ Self Assessment                                    1 rater  │   │
│  │ ─────────────────────────────────────────────────────────────   │   │
│  │ ✓ Alexandra Chen (Candidate)                 [Required]        │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ 2️⃣ Family Members                                     0 raters  │   │
│  │ ─────────────────────────────────────────────────────────────   │   │
│  │                                                                  │   │
│  │ [+ Add Family Raters]                                           │   │
│  │                                                                  │   │
│  │ Suggestions:                                                     │   │
│  │ □ Sarah Chen (Aunt, Board Member)                               │   │
│  │ □ David Martinez (Father, Former CEO)                           │   │
│  │ □ Linda Chen (Mother, Family Council)                           │   │
│  │ □ Michael Chen (Brother, CFO)                                   │   │
│  │ □ Robert Martinez (Uncle, Owner)                                │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ 3️⃣ Business Colleagues (Peers)                        0 raters  │   │
│  │ ─────────────────────────────────────────────────────────────   │   │
│  │                                                                  │   │
│  │ [+ Add Colleague Raters]                                        │   │
│  │                                                                  │   │
│  │ Non-family members working with Alexandra:                      │   │
│  │ □ Jennifer Park (CMO, Peer)                                     │   │
│  │ □ Thomas Wong (Head of Sales, Peer)                             │   │
│  │ □ Maria Garcia (HR Director, Peer)                              │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ 4️⃣ Direct Reports                                     0 raters  │   │
│  │ ─────────────────────────────────────────────────────────────   │   │
│  │                                                                  │   │
│  │ [+ Add Direct Report Raters]                                    │   │
│  │                                                                  │   │
│  │ People who report to Alexandra:                                 │   │
│  │ □ James Wilson (Operations Manager)                             │   │
│  │ □ Susan Lee (Project Lead)                                      │   │
│  │ □ Carlos Rodriguez (Team Lead)                                  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ 5️⃣ External Advisors                                  0 raters  │   │
│  │ ─────────────────────────────────────────────────────────────   │   │
│  │                                                                  │   │
│  │ [+ Add External Rater]                                          │   │
│  │                                                                  │   │
│  │ Enter email manually:                                           │   │
│  │ ┌─────────────────────────────────────────────────────┐         │   │
│  │ │ Name: _____________________                         │         │   │
│  │ │ Email: ____________________                         │         │   │
│  │ │ Role/Relationship: _________                        │         │   │
│  │ └─────────────────────────────────────────────────────┘         │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│  ⚠️  Anonymity Requirement: Minimum 3 raters per category              │
│     to protect individual response confidentiality                      │
│                                                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ Assessment Settings                                              │   │
│  │                                                                  │   │
│  │ Deadline:  [📅 November 24, 2025]                               │   │
│  │ Assessment Name: CEO Succession - Alexandra Chen                │   │
│  │                                                                  │   │
│  │ Results Visibility:                                              │   │
│  │ ☑ Candidate can view results                                    │   │
│  │ ☑ Administrator can view results                                │   │
│  │ ☐ Family Council can view results                               │   │
│  │ ☐ Raters can view aggregate results                             │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                          │
│                                    [Back]  [Save Draft]  [Send Invites] │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### Screen 4: Invitation Email Preview

#### 🎯 Goal
Review and customize invitation message before sending to raters

#### 🎨 Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│ Review & Send Invitations                                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Ready to send invitations to 15 raters                         │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 📧 Email Preview                                         │  │
│  │                                                           │  │
│  │ Subject: Request for Feedback - Alexandra Chen           │  │
│  │          360 Assessment                                  │  │
│  │                                                           │  │
│  │ ───────────────────────────────────────────              │  │
│  │                                                           │  │
│  │ Dear [Rater Name],                                       │  │
│  │                                                           │  │
│  │ You have been selected to provide confidential feedback  │  │
│  │ for Alexandra Chen as part of a 360-degree leadership   │  │
│  │ assessment.                                              │  │
│  │                                                           │  │
│  │ Purpose: Evaluate Alexandra's readiness for CEO role    │  │
│  │ Your role: Family Member / Colleague / etc.             │  │
│  │ Time required: 15-20 minutes                             │  │
│  │ Deadline: November 24, 2025                              │  │
│  │                                                           │  │
│  │ Your responses will be completely anonymous and          │  │
│  │ aggregated with others in your category. Individual      │  │
│  │ ratings will never be shown.                             │  │
│  │                                                           │  │
│  │ [Provide Feedback] ← Click to start                     │  │
│  │                                                           │  │
│  │ Why your feedback matters:                               │  │
│  │ Your honest input helps Alexandra identify strengths    │  │
│  │ and development areas as part of our family's           │  │
│  │ succession planning process.                             │  │
│  │                                                           │  │
│  │ Questions? Contact: [Administrator Name]                 │  │
│  │                                                           │  │
│  │ Thank you for your participation.                        │  │
│  │                                                           │  │
│  │ [Rater Name], [Optional: Decline to Participate]        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Customize Message (Optional)                             │  │
│  │ ┌────────────────────────────────────────────────────┐   │  │
│  │ │ Additional context or instructions...              │   │  │
│  │ │                                                     │   │  │
│  │ │                                                     │   │  │
│  │ └────────────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Sending to:                                              │  │
│  │ • Self Assessment: 1 person                              │  │
│  │ • Family Members: 5 people                               │  │
│  │ • Business Colleagues: 4 people                          │  │
│  │ • Direct Reports: 3 people                               │  │
│  │ • External Advisors: 2 people                            │  │
│  │                                                           │  │
│  │ Total: 15 invitations                                    │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│                               [Cancel]  [Send Test]  [Send All] │
└─────────────────────────────────────────────────────────────────┘
```

---

### PHASE 2: Rater Assessment Experience

---

### Screen 5: Rater Landing Page (From Magic Link)

#### 🎯 Goal
Orient rater, establish confidentiality, explain process

#### 🎨 Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│ ReFamily 360 Assessment                            [Help] [FAQ] │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │             360 Assessment for Alexandra Chen            │  │
│  │                    [Candidate Photo]                     │  │
│  │                                                           │  │
│  │              VP Operations → CEO Candidate               │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  Welcome, Sarah Chen                                             │
│  You've been selected as a Family Member rater                  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 🎯 Assessment Purpose                                    │  │
│  │                                                           │  │
│  │ Evaluate Alexandra's readiness to assume CEO role based  │  │
│  │ on 16 leadership and governance competencies.            │  │
│  │                                                           │  │
│  │ Your honest feedback will help identify strengths and    │  │
│  │ development areas to support succession planning.        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ 🔒 Your Responses Are Confidential                       │  │
│  │                                                           │  │
│  │ ✓ Your individual ratings will NEVER be shown            │  │
│  │ ✓ Only aggregated data with 3+ raters is reported       │  │
│  │ ✓ Comments are anonymized and cannot be traced back     │  │
│  │ ✓ Platform administrators cannot view individual        │  │
│  │   responses                                              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ ⏱️  What to Expect                                        │  │
│  │                                                           │  │
│  │ • 16 competencies to rate                                │  │
│  │ • 5-point rating scale for each                          │  │
│  │ • Optional comments encouraged                           │  │
│  │ • Option to skip if unable to assess                     │  │
│  │ • Estimated time: 15-20 minutes                          │  │
│  │ • Can save progress and return later                     │  │
│  │ • Deadline: November 24, 2025                            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ ☑️  I understand and agree to:                            │  │
│  │                                                           │  │
│  │ • Provide honest, thoughtful feedback                    │  │
│  │ • Base ratings on actual observations                    │  │
│  │ • Maintain confidentiality of this process               │  │
│  │ • Use feedback constructively for development            │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│                                                                  │
│                    [Decline to Participate]  [Begin Assessment] │
└─────────────────────────────────────────────────────────────────┘
```

---

### Screen 6: Competency Rating Interface

#### 🎯 Goal
Efficiently collect ratings and comments for each competency

#### 🎨 Wireframe

```
┌─────────────────────────────────────────────────────────────────────────┐
│ 360 Assessment: Alexandra Chen                        Progress: 3/16  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  ┌────────────────────────────────────────────────────────────────┐    │
│  │ [Progress Bar: ████████░░░░░░░░░░░░░░░░░░░░░░░░]  19%         │    │
│  └────────────────────────────────────────────────────────────────┘    │
│                                                                          │
│  Category: Strategic Leadership (Competency 3 of 4)                     │
│                                                                          │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ 🎯 Visionary Thinking                                            │ │
│  │                                                                   │ │
│  │ Creates compelling long-term vision for the organization and     │ │
│  │ inspires others to work toward that vision.                      │ │
│  │                                                                   │ │
│  │ Look for:                                                         │ │
│  │ • Articulates clear 5-10 year strategic direction                │ │
│  │ • Anticipates market trends and opportunities                    │ │
│  │ • Inspires others around future possibilities                    │ │
│  │ • Balances idealism with pragmatic execution                     │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  How would you rate Alexandra on this competency?                       │
│                                                                          │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │  ○ 5 - Exceptional                                                │ │
│  │     Consistently exceeds expectations for CEO-level role          │ │
│  │     Demonstrates mastery and serves as role model                 │ │
│  │                                                                   │ │
│  │  ○ 4 - Strong                                                     │ │
│  │     Ready for CEO role in this competency                         │ │
│  │     Performs at expected level consistently                       │ │
│  │                                                                   │ │
│  │  ◉ 3 - Adequate                                                   │ │
│  │     Needs some development before CEO role                        │ │
│  │     Shows capability but inconsistent execution                   │ │
│  │                                                                   │ │
│  │  ○ 2 - Developing                                                 │ │
│  │     Significant development needed for CEO role                   │ │
│  │     Shows potential but gaps are evident                          │ │
│  │                                                                   │ │
│  │  ○ 1 - Not Demonstrated                                           │ │
│  │     Not ready in this area, requires substantial work             │ │
│  │     Competency not yet visible or very limited                    │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  ☐ Unable to assess (insufficient interaction/observation)              │
│                                                                          │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ Optional: Share specific examples or context (max 500 chars)     │ │
│  │ ┌─────────────────────────────────────────────────────────────┐  │ │
│  │ │ Alexandra has shown good strategic thinking in quarterly    │  │ │
│  │ │ planning sessions, but I'd like to see more long-term       │  │ │
│  │ │ vision articulation...                                       │  │ │
│  │ │                                           Characters: 142/500│  │ │
│  │ └─────────────────────────────────────────────────────────────┘  │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  ┌───────────────────────────────────────────────────────────────────┐ │
│  │ 💡 Tip: Be specific and constructive. Examples help candidates    │ │
│  │    understand your feedback better.                               │ │
│  └───────────────────────────────────────────────────────────────────┘ │
│                                                                          │
│  [⬅ Previous: Strategic Decision Making]    [Next: Innovation ➡]      │
│                                                                          │
│  [💾 Save & Exit] [❓ Help]                                             │
└─────────────────────────────────────────────────────────────────────────┘
```

---

### Screen 7: Assessment Review & Submit

#### 🎯 Goal
Let rater review all ratings before final submission

#### 🎨 Wireframe

```
┌─────────────────────────────────────────────────────────────────┐
│ Review Your Assessment                                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  You've completed all 16 competencies. Review before submitting: │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Strategic Leadership                             4.0 avg │  │
│  │ ───────────────────────────────────────────────────────  │  │
│  │ ✓ Visionary Thinking                                  4  │  │
│  │ ✓ Strategic Decision Making                           5  │  │
│  │ ✓ Innovation & Adaptation                             3  │  │
│  │ ✓ Risk Management                                     4  │  │
│  │                                           [Edit Section] │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Family Dynamics                                  3.7 avg │  │
│  │ ───────────────────────────────────────────────────────  │  │
│  │ ✓ Family Relationship Management                      4  │  │
│  │ ✓ Generational Bridge Building                        3  │  │
│  │ ✓ Conflict Navigation                                 4  │  │
│  │                                           [Edit Section] │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Business Acumen                                  3.3 avg │  │
│  │ ───────────────────────────────────────────────────────  │  │
│  │ ✓ Financial Stewardship                               3  │  │
│  │ ✓ Operational Excellence                              4  │  │
│  │ ✓ Market & Competitive Intelligence                   3  │  │
│  │ ✓ Stakeholder Management                              3  │  │
│  │                                           [Edit Section] │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Emotional Intelligence                           4.3 avg │  │
│  │ ───────────────────────────────────────────────────────  │  │
│  │ ✓ Self-Awareness                                      4  │  │
│  │ ✓ Empathy & Listening                                 5  │  │
│  │ ✓ Resilience & Composure                              4  │  │
│  │                                           [Edit Section] │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Governance Readiness                             3.5 avg │  │
│  │ ───────────────────────────────────────────────────────  │  │
│  │ ✓ Board Engagement                                    3  │  │
│  │ ✓ Ethical Leadership                                  4  │  │
│  │                                           [Edit Section] │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Overall Comments (Optional)                              │  │
│  │ ┌────────────────────────────────────────────────────┐   │  │
│  │ │ Alexandra is nearly ready for the CEO role. Her   │   │  │
│  │ │ strongest assets are relationship skills and       │   │  │
│  │ │ emotional intelligence. I recommend focused        │   │  │
│  │ │ development on financial acumen...   Characters: 0│   │  │
│  │ └────────────────────────────────────────────────────┘   │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                  │
│  ⚠️  Once submitted, you cannot edit your responses.            │
│                                                                  │
│  ☐ I have reviewed my ratings and comments                      │
│  ☐ I understand my responses are confidential and anonymous     │
│                                                                  │
│                                          [Go Back]  [Submit ✓]  │
└─────────────────────────────────────────────────────────────────┘
```

---

### PHASE 3: Assessment Monitoring (Administrator)

---

### Screen 8: Assessment Dashboard & Progress Tracking

#### 🎯 Goal
Monitor response rates, send reminders, track completion

#### 🎨 Wireframe

```
┌──────────────────────────────────────────────────────────────────────────┐
│ ReFamily > Succession > 360 Assessments                                  │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  Active Assessment: CEO Succession - Alexandra Chen                      │
│  Status: In Progress | Created: Nov 3, 2025 | Deadline: Nov 24, 2025   │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ 📊 Overall Progress                                                  ││
│  │                                                                      ││
│  │  Responses: 11 of 16 completed (69%)                                ││
│  │  [████████████████████░░░░░░░]                                      ││
│  │                                                                      ││
│  │  ✓ Threshold met (50%+) - Results can be viewed                    ││
│  │  📅 7 days remaining                                                 ││
│  │                                                                      ││
│  │  Last response: 2 hours ago                                         ││
│  │  Recent activity: 3 responses today                                 ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ Response by Category                                                 ││
│  │                                                                      ││
│  │  1️⃣ Self Assessment                    ✅ 1/1 (100%)                 ││
│  │     ✓ Alexandra Chen                   Completed Nov 5               ││
│  │                                                                      ││
│  │  2️⃣ Family Members                     ⏳ 4/5 (80%)                  ││
│  │     ✓ Sarah Chen                       Completed Nov 8               ││
│  │     ✓ David Martinez                   Completed Nov 6               ││
│  │     ✓ Linda Chen                       Completed Nov 10              ││
│  │     ✓ Michael Chen                     Completed Nov 7               ││
│  │     ⏱️  Robert Martinez                Pending [Send Reminder]       ││
│  │                                                                      ││
│  │  3️⃣ Business Colleagues                ⚠️  2/4 (50%)                 ││
│  │     ✓ Jennifer Park                    Completed Nov 9               ││
│  │     ✓ Thomas Wong                      Completed Nov 11              ││
│  │     ⏱️  Maria Garcia                   Pending [Send Reminder]       ││
│  │     ⏱️  Carlos Lopez                   Pending [Send Reminder]       ││
│  │                                                                      ││
│  │  4️⃣ Direct Reports                     ❌ 1/3 (33%)                  ││
│  │     ✓ James Wilson                     Completed Nov 10              ││
│  │     ⏱️  Susan Lee                      Pending [Send Reminder]       ││
│  │     ⏱️  Carlos Rodriguez               Pending [Send Reminder]       ││
│  │                                                                      ││
│  │  5️⃣ External Advisors                  ⏳ 3/3 (100%)                 ││
│  │     ✓ Dr. James Wilson                 Completed Nov 8               ││
│  │     ✓ Michelle Anderson               Completed Nov 9               ││
│  │     ✓ Robert Kim                       Completed Nov 11              ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ Actions                                                              ││
│  │                                                                      ││
│  │ [📧 Send Reminder to All Pending (5 people)]                        ││
│  │ [📊 Preview Preliminary Results] (69% complete)                     ││
│  │ [📅 Extend Deadline]                                                ││
│  │ [✓ Close Assessment Early] (if satisfied with response rate)       ││
│  │ [⚙️  Assessment Settings]                                            ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ 💡 Tips                                                              ││
│  │                                                                      ││
│  │ • Response rate of 70%+ is excellent for 360 assessments            ││
│  │ • Consider closing early if core stakeholders have responded        ││
│  │ • Results become more reliable with 12+ total responses             ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                           │
└──────────────────────────────────────────────────────────────────────────┘
```

---

### PHASE 4: Results Generation & Review

---

### Screen 9: Results Dashboard (Candidate View)

#### 🎯 Goal
Present comprehensive results with clear insights on strengths and development areas

#### 🎨 Wireframe

```
┌──────────────────────────────────────────────────────────────────────────┐
│ Your 360 Assessment Results                                    [Export PDF]│
├──────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  Assessment: CEO Succession Readiness                                    │
│  Completed: November 24, 2025 | Responses: 15 raters                    │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ 🎯 EXECUTIVE SUMMARY                                                 ││
│  │                                                                      ││
│  │  Overall Readiness Score: 3.8 / 5.0                                ││
│  │  [████████████████████████████░░░░░░]                              ││
│  │                                                                      ││
│  │  Interpretation: STRONG - Nearly ready for CEO role with           ││
│  │  targeted development in specific areas                             ││
│  │                                                                      ││
│  │  Percentile: 78th (compared to similar assessments)                 ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                           │
│  ┌────────────────────────────────────┬────────────────────────────────┐│
│  │ ✅ TOP 3 STRENGTHS                │ ⚠️  TOP 3 DEVELOPMENT AREAS    ││
│  │                                    │                                ││
│  │ 1. Empathy & Listening     4.7/5.0│ 1. Financial Stewardship  3.2  ││
│  │    Exceptional interpersonal       │    Critical for CEO role       ││
│  │    skills across all rater groups  │    Needs focused development   ││
│  │                                    │                                ││
│  │ 2. Relationship Mgmt       4.5/5.0│ 2. Risk Management        3.3  ││
│  │    Strong family and business      │    Important strategic skill   ││
│  │    relationship navigation         │    Inconsistent execution      ││
│  │                                    │                                ││
│  │ 3. Strategic Decision      4.4/5.0│ 3. Board Engagement       3.4  ││
│  │    Balances data with intuition    │    Limited board exposure      ││
│  │    Makes sound judgments           │    Key governance competency   ││
│  └────────────────────────────────────┴────────────────────────────────┘│
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ 📊 COMPETENCY PROFILE                                                ││
│  │                                                                      ││
│  │          Strategic Leadership ──●                                    ││
│  │                                   \                                  ││
│  │   Governance Readiness ●           \                                 ││
│  │                        \            ●── Family Dynamics              ││
│  │                         \          /                                 ││
│  │                          \        /                                  ││
│  │       Emotional Intelligence ──●                                     ││
│  │                            /                                         ││
│  │          Business Acumen ●                                           ││
│  │                                                                      ││
│  │  Legend:  ─── Self Rating (4.0 avg)                                ││
│  │           ─── Others Rating (3.8 avg)                               ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ 🔍 PERCEPTION GAPS                                                   ││
│  │                                                                      ││
│  │  BLIND SPOT (You rated higher than others):                         ││
│  │  • Delegation (Self: 4.0 | Others: 2.8) ⚠️  Gap: 1.2               ││
│  │    Consider: Others see you as holding onto tasks too tightly       ││
│  │                                                                      ││
│  │  HIDDEN STRENGTH (Others rated higher than you):                    ││
│  │  • Crisis Management (Self: 3.0 | Others: 4.3) ✨ Gap: -1.3        ││
│  │    Insight: You underestimate your composure under pressure         ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                           │
│  [View Detailed Breakdown by Competency ➡]                              │
│  [View Ratings by Rater Category ➡]                                     │
│  [View Anonymous Comments ➡]                                             │
│  [Create Development Plan ➡]                                             │
│                                                                           │
└──────────────────────────────────────────────────────────────────────────┘
```

---

### Screen 10: Detailed Competency Breakdown

#### 🎯 Goal
Deep dive into each competency with category-specific feedback

#### 🎨 Wireframe

```
┌──────────────────────────────────────────────────────────────────────────┐
│ Detailed Results > Strategic Leadership                                   │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ 💡 Visionary Thinking                                    4.2 / 5.0  ││
│  │                                                                      ││
│  │ Creates compelling long-term vision and inspires others              ││
│  │                                                                      ││
│  │  Your Rating:    4.0  ████████████████░░░░                          ││
│  │  Others Average: 4.2  ████████████████████░                         ││
│  │                                                                      ││
│  │  Ratings by Category:                                                ││
│  │  • Family Members (5):      4.0  "Strategic but needs articulation" ││
│  │  • Colleagues (4):          4.5  "Strong vision for future"         ││
│  │  • Direct Reports (3):      4.0  "Inspires team effectively"        ││
│  │  • External Advisors (3):   4.5  "Sophisticated strategic thinking" ││
│  │                                                                      ││
│  │  Percentile: 82nd (compared to CEO candidates)                      ││
│  │  Interpretation: STRENGTH - Continue to leverage                    ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ 💬 Anonymous Comments (8 raters provided comments)                  ││
│  │                                                                      ││
│  │ Family Member: "Alexandra has great ideas about where the family    ││
│  │ business should go in the next 10 years. She could be more vocal    ││
│  │ about sharing this vision with the broader family."                 ││
│  │                                                                      ││
│  │ Colleague: "Strong strategic thinker who anticipates market shifts  ││
│  │ better than most leaders I've worked with."                         ││
│  │                                                                      ││
│  │ Direct Report: "Her quarterly planning sessions paint a clear       ││
│  │ picture of where we're headed. She makes the strategy feel real."   ││
│  │                                                                      ││
│  │ External Advisor: "Demonstrates CEO-level strategic thinking.       ││
│  │ Would benefit from more board presentation experience."             ││
│  │                                                                      ││
│  │ [Show all 8 comments]                                               ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ 📈 Development Suggestions                                           ││
│  │                                                                      ││
│  │ While this is a strength, you can enhance it further:               ││
│  │                                                                      ││
│  │ 1. Present strategic vision to Board quarterly (practice)           ││
│  │ 2. Lead Family Assembly session on 10-year vision                   ││
│  │ 3. Shadow CEO in investor/analyst presentations                     ││
│  │ 4. Join industry futures/foresight working group                    ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                           │
│                                                                           │
│  [⬅ Previous: Overview]  [Next: Strategic Decision Making ➡]           │
│                                                                           │
└──────────────────────────────────────────────────────────────────────────┘
```

---

### Screen 11: Development Roadmap Generator

#### 🎯 Goal
Create actionable 6-12 month development plan prioritizing gaps

#### 🎨 Wireframe

```
┌──────────────────────────────────────────────────────────────────────────┐
│ Development Roadmap                                      [Export] [Share]│
├──────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  Based on your 360 results, here's a prioritized development plan:      │
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ 🎯 PRIORITY 1: Financial Stewardship (Score: 3.2 → Target: 4.0+)   ││
│  │                                                                      ││
│  │ Why Priority: Critical for CEO role, below readiness threshold      ││
│  │ Timeline: 6-9 months                                                 ││
│  │ Impact: High - Essential for board confidence                       ││
│  │                                                                      ││
│  │ ✅ Recommended Actions:                                              ││
│  │                                                                      ││
│  │ ☐ Enroll in Executive Financial Management course (3 months)        ││
│  │    → MIT Sloan or similar program                                   ││
│  │    Start: December 2025                                             ││
│  │                                                                      ││
│  │ ☐ Shadow CFO weekly for financial reviews (6 months)                ││
│  │    → Focus on P&L analysis, forecasting, capital allocation         ││
│  │    Start: January 2026                                              ││
│  │                                                                      ││
│  │ ☐ Present quarterly financial analysis to Board (ongoing)           ││
│  │    → Build comfort with financial storytelling                      ││
│  │    First presentation: March 2026 Board meeting                     ││
│  │                                                                      ││
│  │ ☐ Complete online: Financial Modeling for Executives                ││
│  │    → Coursera or CFI certification (self-paced)                     ││
│  │    Deadline: April 2026                                             ││
│  │                                                                      ││
│  │ 📚 Resources:                                                        ││
│  │ • Book: "Financial Intelligence for Entrepreneurs" - Berman         ││
│  │ • Mentor: [CFO Name] (internal) + External financial advisor        ││
│  │ • Course: MIT Sloan Executive Education - Finance Essentials        ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ 🎯 PRIORITY 2: Risk Management (Score: 3.3 → Target: 4.0+)         ││
│  │                                                                      ││
│  │ Why Priority: Strategic competency, achievable quick win            ││
│  │ Timeline: 4-6 months                                                 ││
│  │ Impact: Medium-High - Improves decision quality                     ││
│  │                                                                      ││
│  │ ✅ Recommended Actions:                                              ││
│  │                                                                      ││
│  │ ☐ Lead enterprise risk assessment project (immediate)               ││
│  │    → Identify top 10 business risks with mitigation plans           ││
│  │    Complete: February 2026                                          ││
│  │                                                                      ││
│  │ ☐ Join Board Risk Committee as observer (6 months)                  ││
│  │    → Learn governance-level risk oversight                          ││
│  │    Start: January 2026                                              ││
│  │                                                                      ││
│  │ ☐ Complete scenario planning workshop                               ││
│  │    → Practice risk identification and contingency planning          ││
│  │    Complete: March 2026                                             ││
│  │                                                                      ││
│  │ 📚 Resources:                                                        ││
│  │ • Framework: COSO ERM Framework                                     ││
│  │ • Mentor: Board Risk Committee Chair                                ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ 🎯 PRIORITY 3: Board Engagement (Score: 3.4 → Target: 4.0+)        ││
│  │                                                                      ││
│  │ Why Priority: Governance competency, moderate gap                   ││
│  │ Timeline: 6-12 months                                                ││
│  │ Impact: Medium - Important for CEO credibility                      ││
│  │                                                                      ││
│  │ ✅ Recommended Actions:                                              ││
│  │                                                                      ││
│  │ ☐ Attend Board meetings as observer (12 months)                     ││
│  │    → Present on operations quarterly                                ││
│  │    Start: Next Board meeting                                        ││
│  │                                                                      ││
│  │ ☐ Enroll in Board Governance workshop                               ││
│  │    → NACD Board Leadership course or similar                        ││
│  │    Complete: Summer 2026                                            ││
│  │                                                                      ││
│  │ ☐ Seek independent board seat (external company)                    ││
│  │    → Gain board experience outside family business                  ││
│  │    Target: Late 2026                                                ││
│  │                                                                      ││
│  │ 📚 Resources:                                                        ││
│  │ • Organization: National Association of Corporate Directors         ││
│  │ • Mentor: Current Board Chair                                       ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ 📅 TIMELINE OVERVIEW                                                 ││
│  │                                                                      ││
│  │  Q4 2025  ■■  Courses enrollment, shadow CFO starts                 ││
│  │  Q1 2026  ■■■■  Heavy development period (3 priorities active)      ││
│  │  Q2 2026  ■■■  First Board presentation, risk project complete      ││
│  │  Q3 2026  ■■  Continue board observation, course completion         ││
│  │  Q4 2026  ■  Follow-up 360 assessment                               ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ 🔄 FOLLOW-UP ASSESSMENT                                              ││
│  │                                                                      ││
│  │ Recommended: Q4 2026 (12 months from now)                           ││
│  │ Purpose: Measure development progress in priority areas             ││
│  │                                                                      ││
│  │ [Schedule Follow-up 360]                                            ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                           │
│  [💾 Save Plan] [📧 Share with Advisor] [📅 Add to Calendar] [Export PDF]│
│                                                                           │
└──────────────────────────────────────────────────────────────────────────┘
```

---

### Screen 12: Multi-Candidate Comparison (Administrator View)

#### 🎯 Goal
Compare 2-4 candidates side-by-side for succession decision-making

#### 🎨 Wireframe

```
┌──────────────────────────────────────────────────────────────────────────┐
│ Candidate Comparison                                          [Export PDF]│
├──────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  Comparing: 3 CEO Candidates                                             │
│                                                                           │
│  ┌────────────────────────┬────────────────────────┬────────────────────┐│
│  │ Alexandra Chen         │ Michael Chen           │ James Martinez     ││
│  │ [Photo]                │ [Photo]                │ [Photo]            ││
│  │                        │                        │                    ││
│  │ VP Operations | G3     │ CFO | G3               │ COO | G2           ││
│  │ Age 32                 │ Age 35                 │ Age 42             ││
│  │                        │                        │                    ││
│  │ Overall: 3.8 / 5.0     │ Overall: 3.5 / 5.0     │ Overall: 4.0 / 5.0 ││
│  │ ████████████████████░░ │ ██████████████████░░░░ │ ████████████████████││
│  │ STRONG                 │ ADEQUATE               │ READY              ││
│  └────────────────────────┴────────────────────────┴────────────────────┘│
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ 📊 COMPETENCY COMPARISON                                             ││
│  │                                                                      ││
│  │                      Alexandra │ Michael  │ James                    ││
│  │                                │          │                          ││
│  │ STRATEGIC LEADERSHIP           │          │                          ││
│  │ Visionary Thinking      4.2 ●──┼──────────┼──● 3.5    ● 4.5         ││
│  │ Strategic Decision      4.4 ●──┼──────────┼────● 3.8  ● 4.6         ││
│  │ Innovation              3.8 ●──┼──────●   │ 3.9       ● 4.0         ││
│  │ Risk Management         3.3 ●  │ ● 4.2 ───┼────────●  4.3           ││
│  │                                │          │                          ││
│  │ FAMILY DYNAMICS                │          │                          ││
│  │ Relationship Mgmt       4.5 ●──┼──────────┼──────● 3.2  ● 4.0       ││
│  │ Generational Bridge     3.6 ●──┼──●       │ 3.5    ● 4.2            ││
│  │ Conflict Navigation     4.0 ●──┼────● 3.6 │         ● 4.4           ││
│  │                                │          │                          ││
│  │ BUSINESS ACUMEN                │          │                          ││
│  │ Financial Stewardship   3.2 ●  │ ● 4.8 ───┼──────────● 4.0          ││
│  │ Operational Excellence  4.1 ●──┼──────────┼──● 3.3   ● 4.7          ││
│  │ Market Intelligence     3.5 ●──┼──● 3.4   │         ● 4.2           ││
│  │ Stakeholder Mgmt        3.8 ●──┼────● 3.7 │         ● 4.1           ││
│  │                                │          │                          ││
│  │ EMOTIONAL INTELLIGENCE         │          │                          ││
│  │ Self-Awareness          4.0 ●──┼──────●   │ 3.9     ● 4.3           ││
│  │ Empathy & Listening     4.7 ●──┼──────────┼──────────● 3.5  ● 4.0   ││
│  │ Resilience              4.2 ●──┼────● 3.8 │         ● 4.5           ││
│  │                                │          │                          ││
│  │ GOVERNANCE READINESS           │          │                          ││
│  │ Board Engagement        3.4 ●  │ ● 3.9 ───┼────● 4.4                ││
│  │ Ethical Leadership      4.3 ●──┼────● 4.1 │         ● 4.6           ││
│  │                                │          │                          ││
│  │ Legend: ● 5.0  ● 4.0  ● 3.0  ● 2.0  ● 1.0                          ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ 🎯 STRENGTHS & GAPS SUMMARY                                          ││
│  │                                                                      ││
│  │ Alexandra Chen:                                                      ││
│  │ ✅ Top Strengths: Empathy (4.7), Relationship Management (4.5)      ││
│  │ ⚠️  Key Gaps: Financial Stewardship (3.2), Board Engagement (3.4)   ││
│  │ 📊 Best for: People-centric leadership, family harmony               ││
│  │ ⏱️  Timeline to ready: 6-12 months with focused development          ││
│  │                                                                      ││
│  │ Michael Chen:                                                        ││
│  │ ✅ Top Strengths: Financial Stewardship (4.8), Risk Mgmt (4.2)      ││
│  │ ⚠️  Key Gaps: Family Relationships (3.2), Empathy (3.5)             ││
│  │ 📊 Best for: Financial leadership, risk management                   ││
│  │ ⏱️  Timeline to ready: 12-18 months, needs interpersonal development ││
│  │                                                                      ││
│  │ James Martinez:                                                      ││
│  │ ✅ Top Strengths: Operational Excellence (4.7), Strategic (4.6)     ││
│  │ ⚠️  Key Gaps: None critical (all competencies >3.5)                 ││
│  │ 📊 Best for: Immediate CEO transition, operational focus             ││
│  │ ⏱️  Timeline to ready: Ready now                                     ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐│
│  │ 💡 RECOMMENDATION                                                    ││
│  │                                                                      ││
│  │ Based on 360 data and strategic context:                            ││
│  │                                                                      ││
│  │ SHORT-TERM (0-2 years): James Martinez                              ││
│  │ → Most ready for immediate CEO transition                           ││
│  │ → Strong across all competency categories                           ││
│  │ → Can provide mentorship to G3 candidates                           ││
│  │                                                                      ││
│  │ MEDIUM-TERM (2-5 years): Alexandra Chen                             ││
│  │ → High ceiling with focused development                             ││
│  │ → Excels in people skills critical for family business              ││
│  │ → Needs financial and governance depth (achievable)                 ││
│  │                                                                      ││
│  │ ALTERNATIVE: Michael Chen for CFO/Board role                        ││
│  │ → Outstanding financial capabilities                                ││
│  │ → May be better suited for financial/board leadership              ││
│  │ → Consider developing for Board Chair path                          ││
│  └─────────────────────────────────────────────────────────────────────┘│
│                                                                           │
│  [📄 Generate Detailed Comparison Report] [📧 Share with Succession    │
│  [💬 Add Notes for Family Council]        Committee]                    │
│                                                                           │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 PART 4: Post-Assessment Integration

### 4.1 Automatic Service Integration

**Constitution Service Integration:**
```javascript
POST /api/constitution/update-succession-data
{
  "family_id": "uuid",
  "assessment_id": "uuid",
  "update_type": "append_candidate_profile",
  "data": {
    "candidate": "Alexandra Chen",
    "assessment_date": "2025-11-24",
    "readiness_score": 3.8,
    "recommended_role": "CEO (with development)",
    "development_timeline": "6-12 months",
    "key_strengths": ["Empathy", "Relationship Management"],
    "development_areas": ["Financial Stewardship", "Risk Management"]
  }
}
```

**Meeting Service Integration:**
```javascript
POST /api/meetings/create-succession-review
{
  "family_id": "uuid",
  "meeting_type": "succession_committee",
  "agenda_items": [
    {
      "title": "360 Assessment Results Review",
      "type": "discussion",
      "duration": 45,
      "materials": [
        "360_results_alexandra_chen.pdf",
        "candidate_comparison_report.pdf"
      ]
    },
    {
      "title": "Development Plan Approval",
      "type": "decision",
      "duration": 30,
      "decision_required": true
    }
  ],
  "suggested_date": "2025-12-10",
  "attendees": ["family_council", "succession_committee", "external_advisor"]
}
```

**Notification Service Triggers:**
```javascript
// Immediate notifications after assessment closes
notifications: [
  {
    "to": "candidate",
    "type": "results_ready",
    "template": "360_results_available",
    "actions": ["view_results", "schedule_debrief"]
  },
  {
    "to": "administrator",
    "type": "assessment_complete",
    "template": "360_complete_admin",
    "data": {
      "response_rate": "94%",
      "key_findings": "...",
      "next_steps": "..."
    }
  },
  {
    "to": "succession_committee",
    "type": "decision_input_ready",
    "template": "360_committee_notification"
  },
  {
    "to": "external_advisor",
    "type": "debrief_scheduling",
    "template": "360_advisor_debrief_request"
  }
]
```

### 4.2 Artifact Generation

**Primary PDF Reports:**
1. **Executive Summary Report** (5 pages)
   - Overall readiness assessment
   - Top strengths and development areas
   - Competency spider chart
   - Key recommendations

2. **Detailed Results Report** (25-30 pages)
   - Competency-by-competency breakdown
   - Ratings by category
   - Anonymous comments compilation
   - Statistical analysis
   - Percentile rankings

3. **Development Roadmap** (10 pages)
   - Prioritized development areas
   - Action plans with timelines
   - Resources and mentors
   - Progress milestones
   - Follow-up assessment schedule

4. **Candidate Comparison Report** (if applicable, 15 pages)
   - Side-by-side competency analysis
   - Relative strengths/weaknesses
   - Role fit recommendations
   - Succession timing considerations

### 4.3 Follow-up Actions

**Automated Scheduling:**
- Results debrief session with candidate + advisor (within 1 week)
- Succession committee review meeting (within 2 weeks)
- Development plan kickoff meeting (within 3 weeks)
- 3-month progress check-in
- 6-month mid-point review
- 12-month follow-up 360 assessment

**Calendar Integration:**
```json
{
  "events": [
    {
      "title": "360 Results Debrief - Alexandra Chen",
      "type": "advisory_session",
      "duration": 90,
      "attendees": ["alexandra_chen", "external_advisor"],
      "materials": ["360_results.pdf", "development_roadmap.pdf"],
      "agenda": "Review results, discuss perception gaps, align on development priorities",
      "suggested_dates": ["2025-11-27", "2025-11-28", "2025-11-29"]
    },
    {
      "title": "3-Month Development Progress Check",
      "type": "checkpoint",
      "duration": 60,
      "date": "2026-02-24",
      "attendees": ["alexandra_chen", "succession_committee_chair"],
      "recurring": "monthly"
    },
    {
      "title": "Follow-up 360 Assessment",
      "type": "assessment",
      "date": "2026-11-24",
      "notes": "Measure progress on financial stewardship, risk management, board engagement"
    }
  ]
}
```

---

## 📊 PART 5: Analytics & Metrics

### 5.1 Assessment Health Metrics

```json
{
  "assessment_analytics": {
    "assessment_id": "uuid",
    "completion_metrics": {
      "response_rate": 94.0,
      "avg_time_to_complete": 18.5,
      "completion_by_category": {
        "family": 100.0,
        "colleagues": 75.0,
        "reports": 100.0,
        "advisors": 100.0
      },
      "reminder_effectiveness": {
        "responses_after_first_reminder": 3,
        "responses_after_second_reminder": 1
      }
    },
    "data_quality": {
      "comment_rate": 73.0,
      "avg_comments_per_rater": 8.2,
      "unable_to_assess_rate": 5.0,
      "rating_distribution": {
        "5": 18.0,
        "4": 45.0,
        "3": 28.0,
        "2": 7.0,
        "1": 2.0
      }
    },
    "rater_agreement": {
      "inter_rater_reliability": 0.78,
      "category_agreement": {
        "family_vs_colleagues": 0.72,
        "family_vs_advisors": 0.68,
        "colleagues_vs_reports": 0.85
      }
    }
  }
}
```

### 5.2 Platform Usage Metrics

**Track across all assessments:**
- Assessments per family per year
- Average response rates
- Time from invitation to completion
- PDF export rates
- Development plan creation rates
- Follow-up assessment scheduling rates
- Candidate comparison usage

### 5.3 Success Indicators

- ✅ 70%+ response rate achieved
- ✅ Results reviewed within 1 week of completion
- ✅ Development plan created and saved
- ✅ Progress check-ins scheduled
- ✅ Follow-up assessment scheduled within 12 months
- ✅ Assessment data referenced in succession decisions

---

## 🔐 PART 6: Security & Privacy

### 6.1 Anonymity Protection

**Technical Implementation:**
```javascript
// Response storage - no linkage to rater identity
ResponseSchema = {
  response_id: uuid,
  assessment_id: uuid,
  rater_category: enum, // Only category, not individual ID
  submitted_at: timestamp,
  ratings: [...],
  // NO rater_id, NO rater_name, NO IP address
}

// Aggregation rules
if (responses_in_category < 3) {
  // Combine with adjacent category OR suppress display
  return "Insufficient responses for anonymous reporting"
}

// Comment anonymization
comments = comments.map(c => ({
  text: c.text,
  category: c.category,
  // NO attribution, NO timestamps that could identify
}))
```

### 6.2 Access Control Matrix

| Role | Create Assessment | View Setup | Complete Rating | View Own Results | View Others' Results | Compare Candidates | Export Reports |
|------|-------------------|------------|-----------------|------------------|----------------------|--------------------| --------------|
| **Assessment Admin** | ✅ | ✅ | ✅ (self only) | ✅ | ✅ (if granted) | ✅ | ✅ |
| **Successor Candidate** | ❌ | ❌ | ✅ (self only) | ✅ | ❌ | ❌ | ✅ (own only) |
| **Rater** | ❌ | ❌ | ✅ (once) | ❌ | ❌ | ❌ | ❌ |
| **External Advisor** | ❌ | ❌ | ✅ (if invited) | ❌ | ✅ (if granted) | ❌ | ✅ (if granted) |
| **Family Council** | ❌ | ❌ | ✅ (if invited) | ❌ | ✅ (if granted) | ✅ (if granted) | ✅ (if granted) |
| **Platform Admin** | ❌ | ✅ (support) | ❌ | ❌ | ❌ | ❌ | ❌ |

### 6.3 Data Retention

- **Active assessments:** Retained indefinitely
- **Closed assessments:** Retained for 7 years (succession planning needs)
- **Individual responses:** Aggregated after completion, raw responses deleted after 90 days
- **Audit logs:** Retained for 3 years
- **Candidate can request deletion:** Full deletion including results (GDPR compliance)

---

## 📱 PART 7: Technical Requirements

### 7.1 Performance Requirements

- Assessment loading: <2 seconds
- Rating submission: <1 second
- Results generation: <30 seconds for 20 raters
- PDF export: <10 seconds
- Mobile responsive: 320px minimum width
- Offline capability: Save progress, sync when online

### 7.2 Browser Support

- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+
- Mobile: iOS 14+, Android 10+

### 7.3 Integrations

**Required:**
- Constitution Service (candidate profiles)
- Meeting Service (review scheduling)
- Notification Service (emails, reminders)
- Auth Service (permissions, access control)

**Optional:**
- Calendar sync (Google, Outlook)
- External executive assessment tools (future)

---

## 🏁 Implementation Roadmap

### Phase 1: Core Assessment (Sprints 1-3)
- Assessment creation and configuration
- Rater selection and invitation
- Competency rating interface
- Response collection and tracking
- Basic results aggregation

### Phase 2: Results & Insights (Sprints 3-4)
- Results dashboard with visualizations
- Competency breakdown views
- Perception gap analysis
- Anonymous comments display
- PDF report generation

### Phase 3: Development Planning (Sprint 4)
- Development roadmap generator
- Action item tracking
- Resource library
- Follow-up scheduling

### Phase 4: Comparison & Advanced (Sprint 5)
- Multi-candidate comparison
- Platform admin tools
- Advanced analytics
- Integration with other services

### Phase 5: Polish & Scale (Ongoing)
- Mobile optimization
- Performance tuning
- Additional competency models
- Longitudinal tracking (future)

---

## ✅ Acceptance Criteria

**Assessment is considered complete when:**
- ✅ Administrator can create and configure assessment in <15 minutes
- ✅ Raters can complete assessment on mobile in <20 minutes
- ✅ Response rate >70% with automated reminders
- ✅ Results available within 1 hour of deadline
- ✅ Anonymity mathematically guaranteed (k-anonymity >= 3)
- ✅ PDF reports export successfully 100% of time
- ✅ Development plan created for 80%+ of candidates
- ✅ Zero PII leakage or anonymity breaches
- ✅ 90%+ user satisfaction (NPS >40)
- ✅ All integrations working with other services

---

**Document Version:** 2.0.0  
**Status:** Ready for Development  
**Total Estimated Effort:** 105 story points (~5 sprints)  

---

*End of 360-Degree Successor Assessment Specification*