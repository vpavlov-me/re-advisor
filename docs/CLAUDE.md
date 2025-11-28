# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🎯 Repository Purpose

**FG_Docs** is the business documentation and project management repository for Family Governance Platform. This repository contains **ZERO CODE** - only markdown documentation, project management artifacts, and business processes.

**Critical Context:** This repository works in tandem with the **FG** technical repository (located at `../FG/`). Business requirements documented here drive technical implementation there.

## 📁 Repository Architecture

### Core Structure
```
FG_Docs/
├── project-management/      # Epics, sprints, user stories
│   ├── epics/              # Feature epics with acceptance criteria
│   │   ├── epic-003-adviser-registration/
│   │   └── epic-004-advisor-permission/
│   └── sprints/            # Sprint planning and retrospectives
├── business-docs/          # Business requirements and processes
│   ├── requirements/
│   ├── user-guides/
│   ├── processes/
│   └── glossary/
├── templates/              # Document templates for consistency
│   ├── epic-template.md
│   ├── sprint-template.md
│   └── user-story-template.md
├── reports/                # Progress tracking and metrics
├── scripts/                # Automation helpers
└── workflows/              # Team collaboration processes
```

### Multi-Repository Workspace

**CRITICAL:** FG_Docs is designed to work within a multi-repository workspace:
- **FG_Docs** (this repo) - Business documentation and PM
- **FG** (sibling repo at `../FG/`) - Technical implementation

When working across repositories:
1. Requirements defined here in FG_Docs
2. Implementation happens in FG repository
3. Status updates flow back to FG_Docs
4. Cross-reference using relative paths: `../FG/backend/service_name/`

## 🛠 Essential Commands

### Workspace Setup

**Mac/Linux:**
```bash
# Setup entire workspace (FG_Docs + FG repositories)
./setup-workspace.sh

# This creates VS Code workspace with both repositories
# Opens: FG-Complete-Workspace.code-workspace
```

**Windows PowerShell:**
```powershell
# Setup entire workspace (FG_Docs + FG repositories)
.\setup-workspace.ps1

# This creates VS Code workspace with both repositories
# Opens: FG-Complete-Workspace.code-workspace
```

**📖 Platform-Specific Guides:**
- **Windows Users:** See [WINDOWS-SETUP.md](./WINDOWS-SETUP.md) for complete Windows setup
- **All Platforms:** See [SETUP-GUIDE.md](./SETUP-GUIDE.md) for detailed instructions

### Git Workflow
```bash
# Standard documentation update workflow
git pull                                    # Get latest changes
git add .                                   # Stage documentation changes
git commit -m "Descriptive message"         # Commit with clear description
git push                                    # Push to remote

# Commit message format (follow existing patterns)
# - "Add user stories for EPIC-003 advisor registration"
# - "Update sprint-1 status with completed tasks"
# - "Fix broken links in business-docs/"
```

### Document Creation
```bash
# Create new epic from template
cp templates/epic-template.md project-management/epics/epic-005-new-feature/epic-overview.md

# Create user story
cp templates/user-story-template.md project-management/epics/epic-003/story-fg-008-new-story.md

# Create sprint report
cp templates/sprint-template.md project-management/sprints/sprint-2-report.md
```

## 📝 Document Metadata Standards

**Every document MUST include YAML frontmatter with:**

### Epic Documents
```yaml
---
epic_id: "EPIC-XXX"
title: "Feature Name"
status: "planning" | "in_progress" | "completed"
priority: "high" | "medium" | "low"
start_date: "YYYY-MM-DD"
target_date: "YYYY-MM-DD"
owner: "@username"
stakeholders: ["@user1", "@user2"]
---
```

### User Story Documents
```yaml
---
story_id: "US-XXX" or "FG-XXX"
epic_id: "EPIC-XXX"
title: "Story Title"
priority: "high" | "medium" | "low"
story_points: 1-8
assignee: "@username"
status: "backlog" | "in_progress" | "completed"
---
```

### File Naming Conventions
- **Epics:** `epic-003-adviser-registration/epic-overview.md`
- **User Stories:** `story-fg-001-oauth.md`
- **Sprint Reports:** `sprint-1-status.md`
- **Processes:** `advisor-onboarding-process.md`
- **Date-stamped reports:** `2025-10-22-weekly-status.md`

## 🎯 User Story Format

**Standard structure** (enforced by template):

```markdown
## 📝 User Story
**As a** [type of user]
**I want** [some goal/functionality]
**So that** [some reason/benefit]

## 🎯 Acceptance Criteria
- [ ] **Given** [context], **when** [action], **then** [expected result]
- [ ] **Given** [context], **when** [action], **then** [expected result]

## 📋 Requirements
- Functional requirement 1
- Non-functional requirement 1

## 🧪 Test Scenarios
### Happy Path
- [ ] Test scenario 1

### Edge Cases
- [ ] Edge case 1

### Error Handling
- [ ] Error scenario 1
```

## 🔗 Cross-Repository Integration

### Linking to Technical Implementation

When referencing technical implementation in FG repository:

```markdown
**Technical Implementation:** See `../FG/backend/advisor_portal_service/`
**Related PR:** FG repository PR #123
**API Endpoint:** POST `/api/advisors/register` (port 8011)
**Database:** `advisor_portal_db.advisors` table
```

### Tracking Implementation Status

User stories should track both business and technical completion:

```markdown
## Status Tracking
- [ ] Business requirements finalized
- [ ] Acceptance criteria approved
- [ ] Technical design reviewed
- [ ] Implementation completed (FG repo)
- [ ] Testing completed
- [ ] Documentation updated
```

## 📊 Epic Structure Pattern

**Observed pattern from existing epics:**

```
epic-003-adviser-registration/
├── epic-basic-advisor-registration-profile.md    # Main epic overview
├── user-journey-independent-advisor-marketplace.md
├── story-fg-001-oauth.md                         # Individual user stories
├── story-fg-002-email.md
├── story-fg-003-basic.md
├── STORY-RECOMMENDATIONS.md                      # Story planning
└── STAKEHOLDER-QUESTIONS.md                      # Open questions
```

**Key documents per epic:**
1. **Epic Overview** - Main feature description and objectives
2. **User Stories** - Individual stories with acceptance criteria
3. **Story Recommendations** - Backlog and prioritization notes
4. **Stakeholder Questions** - Open items requiring decision
5. **User Journey** (optional) - End-to-end user flow

## 🎨 Writing Guidelines

### Tone and Audience
- **Primary audience:** Business team (non-technical)
- **Tone:** Professional, clear, action-oriented
- **Language:** Simple, avoid technical jargon
- **Examples:** Always from Family Governance domain

### Family Governance Domain Context

**Key Roles:**
- **Family Members** - Primary users managing family governance
- **Advisors** - External consultants (lawyers, accountants, trustees)
- **Administrators** - Platform administrators

**Core Features:**
- Constitution management
- Decision-making workflows
- Conflict resolution
- Succession planning
- Philanthropy tracking
- Advisor portal (current focus: EPIC-003, EPIC-004)

### Documentation Completeness Checklist

Every document should include:
- [ ] Clear purpose statement in first paragraph
- [ ] Target audience identified
- [ ] Business value explained
- [ ] Examples from Family Governance domain
- [ ] Cross-references to related documents
- [ ] Metadata complete (frontmatter)
- [ ] Review dates and ownership

## 🚨 Critical Rules

### NEVER Do These:
1. **Never write code** - This repository is documentation only
2. **Never skip templates** - Always use templates from `templates/`
3. **Never break naming conventions** - Follow established patterns
4. **Never create orphaned documents** - Always link to related materials
5. **Never skip metadata** - All documents must have frontmatter

### ALWAYS Do These:
1. **Always use templates** from `templates/` directory
2. **Always include business context** - explain WHY, not just WHAT
3. **Always cross-reference** related documents and technical implementation
4. **Always write for non-technical audience** first
5. **Always maintain metadata** (doc_id, owner, review dates)

## 🔍 Working with Claude Code

### Effective Prompts for Documentation Tasks

**Creating Documents:**
```
> Create a new epic EPIC-005 for "Family Member Profile Management"
  using templates/epic-template.md. Include 5-7 user stories.
```

**Analyzing Implementation Status:**
```
> Compare user stories in project-management/epics/epic-003/
  with implementation in ../FG/backend/advisor_portal_service/
  and report completion status.
```

**Generating Reports:**
```
> Create weekly status report for all epics in project-management/epics/,
  include completion percentage and blockers.
```

**Validating Documentation:**
```
> Check all documents in business-docs/ for:
  - Missing metadata
  - Broken internal links
  - Naming convention violations
```

### Context Loading Pattern

When working on complex tasks, load context explicitly:

```
> Read the copilot instructions at .github/copilot-instructions.md
  and README.md, then create a new epic for [feature name]
```

## 📈 Sprint and Epic Tracking

### Current Active Epics (as of setup)
- **EPIC-003:** Advisor Registration & Profile Management
  - Status: In Development
  - Sprint: 1-3 (6 weeks total)
  - Focus: Basic registration, OAuth, profile management

- **EPIC-004:** Advisor Portal RBAC Permission Management
  - Status: Planning
  - Focus: Three-tier permissions, expiration dates, audit logs

### Sprint Cadence
- **Duration:** 2 weeks per sprint
- **Planning:** Mondays (business + tech alignment)
- **Reviews:** Fridays (demo + retrospective)
- **Artifacts:** `project-management/sprints/sprint-N-*`

## 🔐 Related Technical Context

**Technical repository:** `../FG/` contains:
- Backend: FastAPI microservices (Python)
- Frontend: React portals with TypeScript
- Infrastructure: Docker, Kubernetes, AWS
- **Advisor Portal Service:** Port 8011
- **API Gateway:** Port 8000 (routes `/api/*`)

**When writing user stories**, consider technical constraints from:
- `../FG/CLAUDE.md` - Technical architecture guidance
- `../FG/backend/advisor_portal_service/` - Current implementation
- `../FG/docs/` - Technical documentation

## 🎓 Learning from Existing Documents

**Best practices observed in existing epics:**

1. **STORY-RECOMMENDATIONS.md pattern** - Each epic has recommendations document
2. **STAKEHOLDER-QUESTIONS.md pattern** - Track open decisions
3. **User journey documents** - Visual flow of user experience
4. **Story numbering** - `story-fg-001`, `story-fg-002`, etc.
5. **Hierarchical structure** - Epic → Stories → Tasks

**When creating similar documents**, study existing patterns in:
- `project-management/epics/epic-003-adviser-registration/`
- `project-management/epics/epic-004-advisor-permission/`

## 📚 Quick Reference

### Essential Files
- `README.md` - Repository overview and quick links
- `GIT-GUIDE.md` - Git workflow for business team
- `SETUP-GUIDE.md` - Workspace setup instructions
- `QUICK-START.md` - 2-minute onboarding
- `ONBOARDING-CHECKLIST.md` - New team member guide
- `CLAUDE-CODE-GUIDE.md` - Extended AI assistant guide
- `.github/copilot-instructions.md` - AI coding instructions

### VS Code Tasks (Ctrl+Shift+P → Tasks: Run Task)
- **📝 Create New Epic** - Copy epic template
- **📋 Create Sprint Report** - Copy sprint template
- **🚀 Start Development Stack** - Launch FG services (requires FG repo)
- **🛑 Stop Development Stack** - Stop all services

---

**Remember:** This repository is the **business brain** of Family Governance Platform. Focus on business value, user experience, and clear communication. Technical implementation happens in the FG repository - this repository defines WHAT and WHY, FG repository implements HOW.
