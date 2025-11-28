# Draft Epics - Advisor Portal

## 📝 Purpose

This directory contains **draft epics** for the Advisor Portal feature area. Product managers work here to develop and refine new epic proposals before they move into the development pipeline.

## 🔄 Epic Workflow

### Stage 1: Draft (Current Directory)
**Location:** `project-management/draft/Advisor/`

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
draft/Advisor/
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
mkdir -p project-management/draft/Advisor/epic-xxx-feature-name
cp templates/epic-template.md project-management/draft/Advisor/epic-xxx-feature-name/epic-overview.md
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
mv project-management/draft/Advisor/epic-xxx-feature-name project-management/review/
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

## 🤝 Collaboration Guidelines

### For Product Managers:
- Keep drafts focused on business value and user needs
- Write for non-technical audience
- Don't worry about technical implementation details
- Iterate based on stakeholder feedback
- Move to review only when business requirements are solid

### For Developers (during review stage):
- Ask clarifying questions in STAKEHOLDER-QUESTIONS.md
- Provide technical feedback constructively
- Estimate effort realistically
- Identify dependencies early
- Focus on feasibility, not final design

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

---

**Remember:** Draft stage is for **exploration and refinement**. Don't rush to review - a well-defined draft saves significant time during development.
