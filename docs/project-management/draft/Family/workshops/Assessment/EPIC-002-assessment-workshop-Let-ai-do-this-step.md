# Epic Template - Jira SAAS Project

> **Note:** This is a template for creating Epics in Jira SAAS project. Copy relevant sections to Jira issue description.

---

## 📋 Basic Information

**Issue Type:** Epic
**Project:** SAAS
**Epic Name:** AI Blitz Assessment - Automated Family Governance Survey
**Summary:** Enable families to complete comprehensive assessment via 60-question individual survey with AI-generated constitution draft
**Parent Initiative:** SAAS-XXX [Link to Constitution Setup Wizard Proposal]
**Priority:** Medium
**Epic Link:** SAAS-EPIC-XXX

---

## 🎯 Epic Goal

**What will this Epic deliver?**

This Epic will deliver a fully automated assessment method for families completing Step 4 of the Constitution Setup Wizard. Key deliverables include:

**User-facing value:**
- Individual family members can complete a structured 60-question survey in 10-15 minutes (vs 2-3 hour workshops)
- No scheduling coordination required - each member completes independently at their convenience
- Immediate AI-generated constitution draft upon completion with personalized recommendations
- Real-time dashboard tracking completion status across all family members
- Comprehensive assessment report with governance readiness scores and actionable insights

**Business value:**
- Fastest path to completed assessment (3 days average vs 14-21 days for workshops)
- 100% cost savings vs professional advisor workshops ($500-1500 eliminated)
- Increased assessment completion rates through reduced time commitment barrier
- Automated constitution draft generation eliminating manual document creation overhead
- Scalable solution requiring no human facilitation resources

**Scope boundaries:**
- **INCLUDED:** 60-question survey engine, individual completion tracking, AI constitution generation service, family completion dashboard, comprehensive report with recommendations, PDF export functionality
- **NOT INCLUDED:** Custom question creation by families, multi-language survey support (initial release English only), video tutorials for questions, native mobile app (web-responsive only), benchmark comparison against other families

---

## 👥 Target Users

**Who will use this feature?**

- **Primary Personas:**
  - Consul (DOC-USR-002) - Initiates assessment, tracks family completion, reviews and approves AI-generated constitution draft
  - Family Members (DOC-USR-001) - Complete individual surveys independently, provide honest responses without group pressure

- **Secondary Personas:**
  - Family Council Members - May review aggregated results to understand governance assessment outcomes
  - Administrators - System oversight and configuration of survey question bank

---

## 📖 User Stories (High-Level)

**Main scenarios this Epic will enable:**

1. **As a Consul**, **I want to** select "Let AI do this" assessment method from the wizard, **so that** my family can complete assessment quickly without coordinating schedules for lengthy workshops

2. **As a Family Member**, **I want to** complete a 60-question survey independently in 10-15 minutes, **so that** I can provide honest input without group pressure and minimize time commitment

3. **As a Consul**, **I want to** track which family members have completed surveys on a real-time dashboard, **so that** I know when we have enough participation to generate assessment results

4. **As a Consul**, **I want to** trigger AI analysis and receive an auto-generated constitution draft, **so that** I don't have to manually compile responses and create a constitution document from scratch

5. **As a Family Member**, **I want to** review the comprehensive assessment report with governance scores and recommendations, **so that** I understand our family's strengths and development areas

6. **As a Consul**, **I want to** export the AI-generated constitution draft as a PDF, **so that** I can share it with family members for review and approval offline

[Detailed User Stories will be created in RLN1/RLN2 during Grooming]

---

## 🔗 Dependencies & Risks

### Dependencies (Blockers)
- **Upstream:**
  - Epic: SAAS-XXX - Constitution Setup Wizard Step 1-3 (Family Profile, Governance Structure, Roles)
    - Reason: Survey requires validated family member list with email addresses
  - Epic: SAAS-XXX - Survey Question Bank Creation (60 questions across 12 governance categories)
    - Reason: Cannot launch survey engine without populated question database
  - External: AI Constitution Generation Service (Claude/OpenAI API integration)
    - Reason: Core functionality depends on AI generating personalized constitution drafts

- **Downstream:**
  - Epic: SAAS-XXX - Constitution Setup Step 5 (Values, Mission & Vision)
    - Reason: Assessment completion unlocks next wizard step
  - Epic: SAAS-XXX - Constitution Document Management
    - Reason: Generated draft must be saved to family constitution repository

### Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Low survey completion rates (<75%) due to length/complexity | High - invalidates assessment results, poor user experience | Progress bars, auto-save every 5 questions, estimated time display, mobile-responsive design |
| AI-generated constitution drafts perceived as generic/inaccurate | High - low adoption, manual editing overhead | Template library with proven structures, quality validation rules, manual review capability before finalization |
| Survey fatigue causing abandonment at 30-40 question mark | Medium - incomplete data, skewed results | Category transitions provide mental breaks, resume capability with 7-day expiration, clear progress indicators |
| Coordination overhead for Consul tracking non-completers | Medium - delays assessment finalization | Automated reminder emails, clear dashboard status, real-time completion updates |
| AI service downtime during analysis phase | Medium - user frustration, blocked workflow | Fallback error handling, queue retry mechanism, graceful degradation messaging |
| Cross-family data leakage (multi-tenancy violation) | High - privacy breach, compliance issue | Strict family_id filtering on all queries, isolation testing in QA, security audit before release |

---

## 🎨 Design & UX

**Figma Links:**
- [AI Blitz Assessment - Method Selection Screen - Figma URL TBD]
- [AI Blitz Assessment - Survey Question Flow - Figma URL TBD]
- [AI Blitz Assessment - Family Completion Dashboard - Figma URL TBD]
- [AI Blitz Assessment - Report & Constitution Draft - Figma URL TBD]

**UX Notes:**
- **User flows:**
  - Linear 7-stage flow: Method Selection → Welcome → Survey (60 questions) → Dashboard → AI Analysis → Report Review → Completion
  - Progress visualization: Dual progress bars (overall 1-60 + category-specific 1-5 per section)
  - Individual privacy: Responses not shared until aggregation, each member completes independently
  - Real-time feedback: Immediate transitions between questions, auto-save confirmations, completion status updates

- **Key UX Principles:**
  - Minimize cognitive load: One question per screen, clear answer options, estimated time transparency
  - Maintain momentum: No "Submit" buttons between questions, smooth animations, progress indicators
  - Privacy assurance: Individual responses invisible to other members, aggregated results only
  - Flexible completion: Pause/resume capability, 7-day session retention, auto-save every 5 questions

**See also:** [Link to 05-feature-specifications/FEAT-AI-BLITZ.md for detailed UX]

---

## 🧮 Business Rules & Calculations

**Key Business Rules:**

1. **Survey Completion Requirements:**
   - Minimum 2 family members must complete survey for valid analysis
   - Each member can complete survey only once (no re-dos within 7-day cooldown)
   - Survey consists of exactly 60 questions (5 per category × 12 categories) - not customizable
   - No time limit for completion - members work at their own pace
   - Progress auto-saves every 5 questions to prevent data loss
   - Incomplete surveys retained for 7 days, then deleted if not finished

2. **Analysis & Report Generation:**
   - AI analysis triggered manually by Consul/Admin when minimum 2 completions reached
   - Category scores calculated as average of all completed member responses
   - Constitution draft auto-generated using template library + AI personalization
   - Top 3 lowest-scoring categories become priority recommendations
   - Categories scoring < 3.0 flagged as "development areas" in report
   - Generated report becomes permanent record in family constitution

3. **Permission & Access Control:**
   - Method selection: Consul/Admin only
   - Survey completion: All family members
   - Dashboard viewing: All family members (read-only)
   - Trigger analysis: Consul/Admin only
   - Approve draft: Consul/Admin only
   - Export PDF: Consul/Admin only

4. **Data Retention & Privacy:**
   - Individual responses stored permanently for audit trail
   - Incomplete surveys expire after 7 days inactivity
   - Generated drafts stored permanently in family constitution document
   - Individual responses NOT visible to other members pre-aggregation
   - All data strictly isolated by family_id (multi-tenancy)

**Scoring Calculation Example:**
```
Category Score = AVG(Member1_Score, Member2_Score, Member3_Score)
Overall Readiness = AVG(All 12 Category Scores)

Example:
Communication: (5 + 4 + 5) / 3 = 4.67
Decision-Making: (3 + 2 + 3) / 3 = 2.67
Financial Transparency: (4 + 3 + 4) / 3 = 3.67
...
Overall = (4.67 + 2.67 + 3.67 + ... 9 more) / 12 = 7.2
```

**See also:** [Link to 06-business-rules/ docs]

---

## 📅 Estimated Timeline

**Phases:**

1. **Investigation & Solution Design:** 2 weeks
   - Survey engine architecture design
   - AI constitution generation service integration planning
   - Multi-tenancy security review
   - Question bank finalization (60 questions across 12 categories)
   - Dashboard real-time update mechanism design

2. **Development:** 4 weeks
   - Week 1: Survey engine backend (question retrieval, answer submission, auto-save)
   - Week 2: Survey frontend (question screens, progress bars, resume capability)
   - Week 3: Dashboard & AI analysis (completion tracking, analysis trigger, AI integration)
   - Week 4: Report generation & export (constitution draft display, PDF export)

3. **Testing:** 2 weeks
   - Multi-tenancy isolation testing (highest priority)
   - Survey completion flow testing (auto-save, resume, progress bars)
   - AI constitution quality validation (relevance, accuracy)
   - Permission enforcement testing (role-based access)
   - Performance testing (survey transitions <200ms, analysis <10s)

4. **Release & Knowledge Transfer:** 1 week
   - Staging deployment and validation
   - Production release with monitoring
   - Documentation for support team
   - User-facing tutorial/onboarding materials

**Target Release:** Q1 2026 / Sprint 12

---

## 🔗 Related Documentation

**Knowledge Base:**
- User Journey: [JRN-006: AI Blitz Assessment - Automated Family Assessment](./JRN-006-ai-blitz-assessment.md)
- Feature Spec: [FEAT-AI-BLITZ.md - to be created]
- Data Model: [Links to 08-data-model/ docs - SurveySession, SurveyResponse, AssessmentReport]
- Business Rules: [Links to 06-business-rules/ docs - Survey completion rules, scoring calculations]
- User Personas:
  - [DOC-USR-001: Family Member](../02-user-personas/USR-001-family-member.md)
  - [DOC-USR-002: Consul](../02-user-personas/USR-002-consul.md)

**API Endpoints Required:**
- `POST /api/assessment/ai-blitz/initiate` - Start assessment
- `GET /api/assessment/ai-blitz/survey/:session_id/questions` - Fetch questions
- `POST /api/assessment/ai-blitz/survey/:session_id/answers` - Submit answers
- `GET /api/assessment/ai-blitz/dashboard/:family_id` - Completion status
- `POST /api/assessment/ai-blitz/analyze/:family_id` - Trigger AI analysis
- `GET /api/assessment/ai-blitz/report/:family_id` - Fetch report
- `POST /api/assessment/ai-blitz/export/:family_id` - Generate PDF

**Frontend Routes:**
- `/constitution-setup/assessment/methods` - Method selection
- `/constitution-setup/assessment/ai-blitz/welcome` - Welcome screen
- `/constitution-setup/assessment/ai-blitz/survey/:session_id` - Survey questions
- `/constitution-setup/assessment/ai-blitz/dashboard` - Completion dashboard
- `/constitution-setup/assessment/ai-blitz/analysis` - AI analysis loading
- `/constitution-setup/assessment/ai-blitz/report` - Report & constitution draft

---

## 📝 Notes

**Open Questions:**
- [ ] What happens if AI service unavailable during analysis? (Fallback mechanism needed)
- [ ] How to handle families requesting re-assessment before 7-day cooldown expires? (Business rule TBD)
- [ ] Should incomplete surveys be visible to Consul for manual nudging? (Privacy vs coordination trade-off)
- [ ] What level of constitution draft editing should Consuls have? (Inline editing vs feedback form)
- [ ] Should we provide benchmark comparison data against other families? (Privacy implications)

**Key Success Metrics to Track:**
- Survey completion rate: Target 75%+
- Average completion time per person: Target <15 minutes
- 48-hour family completion rate: Target 70%+
- Constitution draft approval rate: Target 60%+ without major revisions
- Method adoption rate: Target 30%+ choosing AI Blitz vs other methods
- Conversion to Step 5: Target 80%+ continuing after assessment completion

**Critical Testing Focus:**
1. Multi-tenancy isolation (HIGHEST PRIORITY) - Zero tolerance for cross-family data leakage
2. Survey auto-save reliability - Must prevent data loss
3. AI constitution draft quality - Manual review of first 20 generated drafts
4. Permission enforcement - Strict role-based access validation

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-20
**Epic Status:** Draft - Ready for Product Manager Review
**Next Steps:**
1. Product manager review and validation
2. Technical feasibility confirmation for AI integration
3. Prioritization decision within constitution setup roadmap
4. Hand-off to engineering for detailed technical design
