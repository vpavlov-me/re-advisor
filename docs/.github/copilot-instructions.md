---
description: AI coding instructions for FG_Docs - Family Governance documentation repository
applyTo: workspace
---
# AI Documentation Assistant Instructions

## Repository Purpose
This is **FG_Docs** - the documentation and project management repository for Family Governance Platform. It's designed for **business team collaboration** and contains NO CODE, only documentation, processes, and project management materials.

## Repository Structure
- `business-docs/` - Business requirements, user guides, glossaries, processes
- `project-management/` - Epics, user stories, sprint planning, backlogs
- `workflows/` - Team collaboration processes and guidelines
- `templates/` - Reusable document templates for consistency
- `reports/` - Progress tracking, metrics, and status reports
- `scripts/` - Automation helpers for documentation workflows

## Target Audience
- **Primary**: Business analysts, project managers, product owners, QA team
- **Secondary**: Technical team members reviewing requirements
- **Skill Level**: Non-technical to technical, business-focused

## Writing Guidelines

### Language & Tone
- **Use simple, clear language** - avoid technical jargon
- **Business-friendly tone** - professional but approachable
- **Action-oriented** - focus on what users can DO
- **Inclusive** - accessible to non-technical team members

### Document Structure
- **Always start with clear purpose** - "What is this document for?"
- **Use visual hierarchy** - headers, bullets, numbered lists
- **Include examples** - real scenarios from Family Governance domain
- **Add quick reference sections** - TL;DR summaries

### Content Standards
- **User Stories Format**: "As a [role], I want [goal] so that [benefit]"
- **Requirements Format**: Clear acceptance criteria with testable conditions
- **Process Documentation**: Step-by-step workflows with decision points
- **Glossary Entries**: Business term + definition + example usage

## Domain Knowledge

### Family Governance Platform Context
- **Multi-tenant platform** for family governance and decision-making
- **Key Roles**: Family members, advisors, administrators
- **Core Features**: Constitutions, decision-making, conflict resolution, education
- **Business Process**: Family onboarding → Constitution creation → Decision workflows

### Current Architecture (Business View)
- **Turbo Stack** (new features) - modern, fast development
- **Legacy Stack** (maintenance mode) - existing portals being phased out
- **API Gateway** - single entry point for all services
- **Multi-tenancy** - each family has isolated data and processes

## Common Tasks

### Document Creation
When creating new documents:
1. **Start with template** from `templates/` directory
2. **Fill metadata** (doc_id, title, type, category, audience, etc.)
3. **Add clear purpose statement** in introduction
4. **Use consistent formatting** with existing documents
5. **Include review schedule** and ownership information

### Epic/User Story Creation
For project management documents:
1. **Use standard format**: Epic → User Stories → Tasks
2. **Include business value** - why this matters to families
3. **Add acceptance criteria** - how we know it's done
4. **Reference related documents** - link to requirements, designs
5. **Estimate complexity** - business perspective on effort

### Process Documentation
For workflow documentation:
1. **Start with current state** - how things work now
2. **Define future state** - what we want to achieve
3. **Map transition steps** - how we get there
4. **Identify stakeholders** - who's involved in each step
5. **Include decision points** - when to choose different paths

## File Naming Conventions
- **Use kebab-case** for files: `user-onboarding-process.md`
- **Include date for reports**: `sprint-review-2025-10-22.md`
- **Use descriptive names**: `epic-003-advisor-registration.md`
- **Add version suffix if needed**: `requirements-v2.md`

## Quality Standards

### Documentation Checklist
- [ ] **Clear purpose** stated in first paragraph
- [ ] **Target audience** identified
- [ ] **Business value** explained
- [ ] **Examples provided** from Family Governance domain
- [ ] **Links working** to related documents
- [ ] **Metadata complete** (doc_id, owner, review dates)
- [ ] **Accessible language** for non-technical readers

### Review Process
- **Business Review**: Content accuracy, completeness, business value
- **Technical Review**: Feasibility, integration with existing systems
- **UX Review**: User experience implications, workflow clarity
- **Compliance Review**: Privacy, security, regulatory requirements

## Integration with Technical Repository

### Linking to Code Repository
- **Reference PRs/Issues** by number: "See FG repository issue for implementation"
- **Link to technical specs** in main repository documentation
- **Cross-reference requirements** with actual implementation
- **Track feature status** between business docs and code delivery

### Communication Patterns
- **Business documents drive** technical implementation
- **Technical constraints inform** business decisions
- **Regular sync meetings** align business and technical perspectives
- **Shared terminology** maintained in glossary

## AI Assistant Behavior

### When Working in FG_Docs
- **Focus on business value** and user experience
- **Write for non-technical audience** as primary
- **Use Family Governance examples** in all documentation
- **Maintain document metadata** consistently
- **Follow established templates** and formats
- **Reference related business processes** when relevant

### What NOT to Do
- **Don't write code** - this is documentation only
- **Don't use technical jargon** without explanation
- **Don't skip business context** - always explain WHY
- **Don't ignore templates** - use established formats
- **Don't create orphaned docs** - link to related materials

## Quick Reference

### Common Document Types
- **Epic**: Large feature with multiple user stories
- **User Story**: Single user goal with acceptance criteria
- **Process**: Step-by-step workflow documentation
- **Requirements**: Detailed feature specifications
- **Report**: Status update or progress summary
- **Guide**: How-to instructions for users

### Template Locations
- `templates/epic-template.md` - For new feature epics
- `templates/user-story-template.md` - For individual stories
- `templates/process-template.md` - For workflow documentation
- `templates/requirements-template.md` - For detailed specifications
- `templates/report-template.md` - For status reports

Remember: This repository is the **business brain** of Family Governance Platform. Keep everything focused on business value, user experience, and team collaboration!