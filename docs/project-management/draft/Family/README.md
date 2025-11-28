# Draft Epics - Family Portal

## 📝 Purpose

This directory contains **draft epics** for the Family Portal feature area. Product managers work here to develop and refine new epic proposals before they move into the development pipeline.

## 🔄 Epic Workflow

### Stage 1: Draft (Current Directory)
**Location:** `project-management/draft/Family/`

**Who works here:** Product Managers

**Activities:**
- Initial epic ideation and scoping
- User story drafting
- Stakeholder questions collection
- Business requirements definition
- User journey mapping
- Acceptance criteria development

**Exit criteria:**
- Epic overview completed with clear business value
- User stories drafted with acceptance criteria
- Stakeholder questions documented
- Initial priority and scope defined

### Stage 2: Review
**Location:** `project-management/review/`

**Who works here:** Development team (architects, tech leads, developers)

**Activities:**
- Technical feasibility analysis
- Architecture and design review
- Effort estimation
- Technical dependencies identification
- Risk assessment
- Clarification of requirements

**Exit criteria:**
- Technical approach agreed upon
- Effort estimated (story points assigned)
- All stakeholder questions answered
- Technical risks identified and mitigation planned
- Team consensus on acceptance criteria

### Stage 3: Development Queue
**Location:** `project-management/epics/`

**Who works here:** Development team

**Activities:**
- Sprint planning and assignment
- Implementation
- Testing and QA
- Documentation updates
- Deployment

**Status:** Epic is now active and tracked through completion

## 📂 Directory Structure

```
draft/Family/
├── README.md (this file)
├── epic-xxx-feature-name/
│   ├── epic-overview.md
│   ├── story-fg-xxx-story-name.md
│   ├── STORY-RECOMMENDATIONS.md
│   ├── STAKEHOLDER-QUESTIONS.md
│   └── user-journey-*.md (optional)
└── epic-yyy-another-feature/
    └── ...
```

## 🎯 Creating New Draft Epics

### Step 1: Use Template
```bash
# Copy epic template
mkdir -p project-management/draft/Family/epic-xxx-feature-name
cp templates/epic-template.md project-management/draft/Family/epic-xxx-feature-name/epic-overview.md
```

### Step 2: Develop Epic Content
- Fill out epic overview with business context
- Create user stories using `templates/user-story-template.md`
- Document stakeholder questions
- Map user journeys if needed

### Step 3: Review Internally
- Product manager review
- Business stakeholder approval
- Completeness check

### Step 4: Move to Review
```bash
# Move epic to review stage
mv project-management/draft/Family/epic-xxx-feature-name project-management/review/
```

## ✅ Draft Completion Checklist

Before moving an epic to `review/`, ensure:

- [ ] Epic overview complete with clear business value
- [ ] All user stories include acceptance criteria
- [ ] Requirements documented (functional and non-functional)
- [ ] Test scenarios outlined
- [ ] Stakeholder questions captured (even if unanswered)
- [ ] Priority assigned (high/medium/low)
- [ ] Target timeline or constraints noted
- [ ] Cross-references to related epics included
- [ ] Metadata complete (epic_id, owner, dates)

## 🚫 What NOT to Include in Drafts

- Technical implementation details (too early)
- Final story point estimates (done in review)
- Sprint assignments (done during sprint planning)
- Code references (no code exists yet)
- Deployment plans (premature)

## 📋 Current Draft Epics

_(Product managers: update this list as epics move through workflow)_

| Epic ID | Title | Owner | Status | Next Action |
|---------|-------|-------|--------|-------------|
| _None currently_ | - | - | - | - |

## 🏠 Family Portal Context

### Target Users
Draft epics in this directory focus on features for **Family Portal** users:

- **Family Members** - Primary users managing family governance
- **Family Council Members** - Leadership roles with elevated permissions
- **Admins** - Platform administrators with full access
- **Successors** - Next-generation family members in training

### Key Feature Areas

**Core Governance:**
- Constitution management
- Family council meetings
- Decision-making workflows
- Conflict resolution processes

**Wealth & Assets:**
- Asset tracking and portfolio visibility
- Succession planning
- Trust management
- Financial education

**Family Development:**
- Education programs and learning paths
- Philanthropy tracking
- Task and project management
- Communication and collaboration

**Advisor Collaboration:**
- Inviting and managing advisors
- Defining advisor access and permissions
- Collaborating on governance documents
- Tracking advisor engagements

### Family Governance Domain Examples

When writing epics and user stories, use real-world Family Governance scenarios:

**Good Examples:**
- "As a Family Council member, I want to create a family constitution..."
- "As a family member, I want to view our philanthropic commitments..."
- "As an admin, I want to invite our financial advisor to the platform..."

**Avoid Generic Examples:**
- "As a user, I want to create a document..." (too generic)
- "As an admin, I want to manage permissions..." (use specific family roles)

## 🤝 Collaboration Guidelines

### For Product Managers:
- Keep drafts focused on **family user** needs and experiences
- Write for non-technical audience (family members, not developers)
- Use Family Governance terminology consistently
- Consider multi-generational users (from elders to young successors)
- Think about family privacy and sensitive data handling
- Don't worry about technical implementation details
- Iterate based on stakeholder feedback
- Move to review only when business requirements are solid

### For Developers (during review stage):
- Ask clarifying questions in STAKEHOLDER-QUESTIONS.md
- Provide technical feedback constructively
- Estimate effort realistically
- Identify dependencies early
- Focus on feasibility, not final design
- Consider Family Portal architecture constraints

## 🔗 Related Documentation

- [Epic Template](../../../templates/epic-template.md)
- [User Story Template](../../../templates/user-story-template.md)
- [Sprint Template](../../../templates/sprint-template.md)
- [Active Epics](../../epics/)
- [CLAUDE.md](../../../CLAUDE.md) - Repository guidelines

## 📞 Questions?

- **Epic scoping questions:** Contact Product Manager
- **Workflow questions:** See [WORKFLOWS.md](../../../workflows/epic-workflow.md) _(if exists)_
- **Template usage:** See [CLAUDE.md](../../../CLAUDE.md)

## 🔗 Cross-Portal Considerations

When drafting Family Portal epics, consider:

### Integration with Advisor Portal
- How will families invite advisors? (see EPIC-005)
- What data do advisors need to see?
- How are permissions managed across portals?

### Family-Specific Privacy
- Family data must be strictly isolated by `family_id`
- Sensitive information (wealth data, conflicts) requires extra security
- Multi-generational users have different tech comfort levels

### Multi-Tenancy
- Each family is a separate tenant
- Families cannot see other families' data
- Advisors may work with multiple families (controlled via associations)

---

**Remember:** Draft stage is for **exploration and refinement**. Don't rush to review - a well-defined draft saves significant time during development.

---

**Key Difference from Advisor Portal Drafts:**
- **Advisor Portal** focuses on professional tools for managing multiple families, marketplace features, and service-based engagements
- **Family Portal** focuses on governance, wealth management, succession planning, and family member collaboration
- Both portals integrate through advisor invitations and family-advisor associations
