# Workshop Constructor

## Overview

The **Workshop Constructor** is a powerful tool that allows external advisers to create custom workshop templates tailored to specific family needs. It enables advisers to build, manage, and share personalized workshops while maintaining the structure and features of the platform.

## What's Been Implemented

### 1. Database Schema (`supabase/migrations/018_add_workshop_constructor.sql`)

Complete database schema with 7 core tables:

- **`workshop_templates`** - Main template storage with metadata
- **`workshop_screens`** - Individual screens/stages within a workshop
- **`workshop_screen_elements`** - Granular elements within each screen
- **`workshop_template_blocks`** - Library of pre-built reusable blocks
- **`workshop_instances`** - Workshop instances shared with families
- **`workshop_instance_participants`** - Participant tracking for instances
- **`workshop_analytics`** - Engagement and completion metrics

**Key Features:**
- Row Level Security (RLS) policies for secure access control
- Support for versioning and cloning templates
- Flexible JSONB fields for content storage
- Navigation logic and conditional flows
- AI facilitation configuration
- Timer and progress tracking capabilities

### 2. Pre-built Template Library (`supabase/migrations/019_seed_workshop_template_blocks.sql`)

**30+ Ready-to-Use Blocks** organized by category:

**Kickoff & Introduction (3 blocks):**
- Welcome & Kickoff
- Ground Rules
- Workshop Objectives

**Assessment & Evaluation (3 blocks):**
- Thomas-Kilmann Conflict Styles
- 360-Degree Assessment
- Values Assessment

**Exercises & Activities (6 blocks):**
- RACI Matrix
- Three Circles Model
- Stakeholder Mapping
- Force Field Analysis
- SWOT Analysis
- Brainstorming Board

**Discussion & Dialogue (3 blocks):**
- Open Discussion
- AI-Facilitated Discussion
- Conflict Escalation Protocol

**Governance (2 blocks):**
- Governance Bodies Setup
- Decision Matrix

**Mission, Vision, Values (3 blocks):**
- Mission Statement Crafting
- Long-term Vision Creation
- Values Matrix Definition

**Succession Planning (2 blocks):**
- Succession Readiness Assessment
- Succession Timeline

**Wrap-up & Follow-up (4 blocks):**
- Action Plan Creation
- Key Takeaways
- Workshop Feedback
- Next Steps & Reminders

### 3. TypeScript Types (`src/types/workshop-constructor.ts`)

Comprehensive type definitions for:
- Template and screen structures
- Content types (20+ supported types)
- Navigation configurations
- AI configurations
- Instance and participant data
- Analytics structures

### 4. User Interface

#### A. Constructor List Page (`/workshops/constructor`)

**Features:**
- Overview dashboard with statistics
- Template grid with cards showing:
  - Category badges
  - Status indicators
  - Screen count and duration
  - Target audience
- Search and filtering:
  - By text (name/description)
  - By category (Governance, Succession, Values, etc.)
  - By status (Draft, Published, Archived)
- Tabs for different views:
  - All Templates
  - My Templates
  - Master Templates
- Actions per template:
  - Edit
  - Preview
  - Clone
  - Share with Family
  - Archive
  - Delete

#### B. Create Workshop Page (`/workshops/constructor/create`)

**Step 1: Choose Creation Method**
- Start from Scratch
- Use Template Library (recommended)
- AI-Assisted Creation

**Step 2: Workshop Details**
- Basic Information:
  - Name (required)
  - Description
  - Category selection
  - Estimated duration
  - Target audience
- Workshop Settings:
  - AI Facilitation (on/off)
  - Live Chat (on/off)
  - Real-time Collaboration (on/off)
  - Allow Screen Skipping (on/off)
  - Show Progress Bar (on/off)
  - Require Completion (on/off)

### 5. Navigation Integration

Added "Constructor" link to the main navigation menu in the app header.

## Architecture

### Data Flow

```
1. Adviser creates template
   └→ workshop_templates (draft status)

2. Adviser builds screens
   └→ workshop_screens (ordered list)
      └→ workshop_screen_elements (individual components)

3. Adviser can use pre-built blocks
   └→ workshop_template_blocks (library)

4. Template published
   └→ workshop_templates (status → published)

5. Share with family
   └→ workshop_instances (creates instance)
      └→ workshop_instance_participants (invites members)

6. Family completes workshop
   └→ instance_data updated with responses
   └→ workshop_analytics generated
```

### Content Type System

The system supports **20+ content types** across 5 screen types:

1. **Text** - Introduction, Rules, Objectives
2. **Exercise** - RACI, SWOT, Values, Governance structures
3. **Discussion** - Group discussions, AI-facilitated dialogue
4. **Assessment** - Questionnaires, 360 reviews, surveys
5. **Visualization** - Charts, timelines, maps, matrices

### Navigation System

**Three navigation modes:**

1. **Linear** - Next/Previous buttons
2. **Conditional** - Route based on answers
   ```typescript
   conditionalNext: [
     { condition: "answer_x == 'yes'", target: "screen-5" },
     { condition: "answer_x == 'no'", target: "screen-7" }
   ]
   ```
3. **Skip-based** - Allow participants to skip optional screens

### AI Facilitation

Each screen can have AI configuration:
```typescript
{
  enabled: true,
  prompt: "AI facilitation instructions",
  style: "supportive" | "neutral" | "strict",
  keyTopics: ["topic1", "topic2"],
  interventionTriggers: ["confusion", "conflict", "silence"]
}
```

## What's Next (Not Yet Implemented)

### Immediate Next Steps

1. **Workshop Builder** (`/workshops/constructor/[id]/builder`)
   - Drag-and-drop interface for arranging screens
   - Screen editor with content type selectors
   - Template library sidebar
   - Preview mode
   - Publish workflow

2. **Screen Editor** (`/workshops/constructor/[id]/screen/[screenKey]`)
   - Rich content editor for each screen type
   - Element management (add/remove/reorder)
   - AI prompt customization
   - Navigation logic builder
   - Timer configuration

3. **Template Library Browser** (`/workshops/constructor/blocks`)
   - Browse all 30+ pre-built blocks
   - Filter by category and tags
   - Preview block content
   - One-click add to template
   - Create custom blocks

4. **Share with Family** (`/workshops/constructor/[id]/share`)
   - Select family
   - Choose participants
   - Schedule workshop
   - Add custom message
   - Send invitations

5. **Progress Dashboard** (`/workshops/constructor/[id]/analytics`)
   - Real-time participant tracking
   - Screen-by-screen progress
   - Engagement metrics
   - Response viewing
   - Export results

### Future Enhancements

- **AI-Assisted Creation** - Full implementation of AI suggesting structure
- **Collaborative Template Editing** - Multiple advisers working together
- **Template Marketplace** - Share templates with other advisers
- **Version Control** - Track changes, rollback, compare versions
- **Mobile Builder** - Create/edit templates on mobile devices
- **Integration with VMV Workshop** - Link custom workshops with existing features
- **Breakout Sessions** - Support for parallel group activities
- **Live Co-facilitation** - Multiple facilitators in same workshop
- **Export/Import** - Share templates across installations

## Usage Example

### Creating a Dividend Policy Workshop

**Step 1:** Create Template
```typescript
{
  name: "Dividend Policy Workshop for Martinez Family",
  category: "Governance",
  duration_minutes: 180,
  target_audience: "Family Council, Shareholders"
}
```

**Step 2:** Build Structure
1. Kick-off (10 min) - Use "Welcome & Kickoff" block
2. Current Analysis (20 min) - Custom screen with uploaded Excel
3. Family Needs (30 min) - Use "Assessment" block, customize questions
4. Business Requirements (20 min) - Custom screen with financial data
5. Options Brainstorming (40 min) - Use "AI-Facilitated Discussion" block
6. Decision Matrix (30 min) - Use "RACI Matrix" block
7. Draft Policy (30 min) - Custom collaborative editing screen
8. Next Steps (10 min) - Use "Action Plan Creation" block

**Step 3:** Configure AI
- Add custom AI prompt focused on win-win solutions
- Set intervention triggers for generational conflicts

**Step 4:** Publish & Share
- Publish template
- Share with Martinez family
- Track progress in real-time

**Step 5:** Results
- Automatically generated PDF: "Dividend Policy Draft"
- Action Plan with owners and deadlines
- Meeting protocol document

## Technical Stack

- **Frontend:** Next.js 16, React 19, TypeScript
- **UI:** Tailwind CSS, Radix UI components
- **Database:** PostgreSQL (Supabase)
- **Real-time:** Supabase Realtime (for live collaboration)
- **State:** React hooks, local state management
- **Forms:** React Hook Form (to be integrated)
- **Validation:** Zod schemas (to be integrated)

## File Structure

```
src/
├── app/
│   └── workshops/
│       └── constructor/
│           ├── page.tsx                    # List templates
│           ├── create/
│           │   └── page.tsx                # Create new template
│           ├── [id]/
│           │   ├── builder/                # (TODO) Visual builder
│           │   ├── edit/                   # (TODO) Edit template details
│           │   ├── preview/                # (TODO) Preview template
│           │   ├── share/                  # (TODO) Share with families
│           │   ├── analytics/              # (TODO) Progress dashboard
│           │   └── screen/
│           │       └── [screenKey]/        # (TODO) Screen editor
│           └── blocks/                     # (TODO) Template library
├── types/
│   └── workshop-constructor.ts             # TypeScript types
└── lib/
    └── workshops/                          # (TODO) API services
        ├── templates.service.ts
        ├── screens.service.ts
        ├── instances.service.ts
        └── analytics.service.ts

supabase/
└── migrations/
    ├── 018_add_workshop_constructor.sql    # Main schema
    └── 019_seed_workshop_template_blocks.sql # Template library
```

## Security

### Row Level Security (RLS)

All tables have RLS enabled with policies:

- **Templates:** Advisers can only see/edit their own templates (or public ones)
- **Screens/Elements:** Access controlled via template ownership
- **Blocks:** Everyone can read, only creators can modify custom blocks
- **Instances:** Advisers see their instances, family members see theirs
- **Participants:** Access via instance permissions
- **Analytics:** Only advisers can view their analytics

### Data Validation

- Required fields enforced at database level
- JSONB validation through TypeScript types
- Foreign key constraints prevent orphaned records
- Soft deletes via status changes (archived) where appropriate

## API Endpoints (To Be Implemented)

```typescript
// Templates
GET    /api/workshops/templates          // List all templates
POST   /api/workshops/templates          // Create template
GET    /api/workshops/templates/:id      // Get template
PUT    /api/workshops/templates/:id      // Update template
DELETE /api/workshops/templates/:id      // Delete template
POST   /api/workshops/templates/:id/clone // Clone template
POST   /api/workshops/templates/:id/publish // Publish template

// Screens
GET    /api/workshops/templates/:id/screens // List screens
POST   /api/workshops/templates/:id/screens // Add screen
PUT    /api/workshops/screens/:id           // Update screen
DELETE /api/workshops/screens/:id           // Delete screen
POST   /api/workshops/screens/:id/reorder   // Reorder screens

// Template Blocks
GET    /api/workshops/blocks              // List all blocks
GET    /api/workshops/blocks/:key         // Get block
POST   /api/workshops/blocks              // Create custom block

// Instances
POST   /api/workshops/instances           // Share with family
GET    /api/workshops/instances/:id       // Get instance
PUT    /api/workshops/instances/:id       // Update instance
GET    /api/workshops/instances/:id/analytics // Get analytics
```

## Benefits

### For Advisers
- ⏱️ Save time with reusable templates
- 🎨 Professional, branded workshops
- 📊 Track engagement and completion
- 🤖 Optional AI assistance
- 📋 Standardize best practices
- 🔄 Iterate and improve templates

### For Families
- 🎯 Personalized to their needs
- 📱 Accessible from any device
- 🤝 Collaborative and engaging
- 📄 Concrete outputs (documents, plans)
- 👀 Transparent progress tracking
- ⚡ Efficient use of time

### For Platform
- 📈 Increased engagement
- 🎨 Content diversity
- 🌐 Network effects (advisers share best practices)
- 💡 Innovation from advisers
- 🔒 Data on what works

## Support & Documentation

For questions or issues:
1. Check this README
2. Review the database schema comments
3. Examine TypeScript types for data structures
4. Look at seed data for example content

## License

Part of the Adviser Portal platform. All rights reserved.
