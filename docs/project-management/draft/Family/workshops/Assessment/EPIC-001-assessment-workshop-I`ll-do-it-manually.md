---

## 📋 Basic Information

**Issue Type:** Epic
**Project:** Family Governance (FG)
**Epic Name:** Assessment Workshop I`ll do it manually
**Summary:** Implementation of an asynchronous process for collecting individual assessments from family members across 12 aspects of family governance to form a draft family constitution
**Parent Initiative:** FG-XXX
**Priority:** High
**Epic Link:** FG-EPIC-XXX

---

## 🎯 Epic Goal

**What will this Epic deliver?**

This Epic will provide functionality for asynchronous collection of structured assessments from all family members across 12 key aspects of family governance (Trust & Accountability, Communication, Decision Making, Conflict Resolution, Values & Mission, Wealth Philosophy, Succession Planning, Next-Gen Development, Philanthropy Strategy, Family Business Involvement, Education & Development, Family Unity).

**User-facing value:**
- Family Council Members can initiate Assessment Workshop in "I'll do it manually" mode, track real-time progress of all participants, receive aggregated results and insights for decision-making
- Family members can complete individual assessments at their convenience without group pressure, save intermediate progress, receive educational content for each aspect of family governance
- External advisor (optional) can be invited to interpret results and facilitate next steps

**Business value:**
- Collect structured data about family dynamics perception to form draft family constitution
- Identify strengths and improvement areas in family governance based on real data
- Ensure equal participation from all family members regardless of schedules and time zones
- Create foundation for Values & Mission (Step 5) based on aggregated analysis

**Scope boundaries:**
- **Included:**
  - Selection of Workshop method (4 options, focus on "I'll do it manually")
  - Sending invitations to all family members
  - Interface for completing 12 assessment blocks with educational materials
  - Saving intermediate progress for each participant
  - Progress tracking of all participants for consul
  - Reminder system for participants who haven't completed
  - Aggregated analysis of results (Family Readiness Score, strengths, improvement areas)
  - Export results
  - Multi-tenancy isolation (each family sees only their own data)

---

## 👥 Target Users

**Who will use this feature?**

- **Primary Personas:**
  - Family Council Member (Consul) - DOC-USR-002
  - Family Member - DOC-USR-001

- **Secondary Personas:**
  - External Advisor - DOC-USR-003 (can be invited during results interpretation phase)

---

## 📖 User Stories (High-Level)

**Main scenarios this Epic will enable:**

1. **As a** Family Council Member, **I want to** select "I'll do it manually" method for Assessment Workshop, **so that** I can initiate asynchronous individual assessments for all family members
2. **As a** Family Council Member, **I want to** see real-time progress of all family members completing their assessments, **so that** I can track overall family engagement and send reminders if needed
3. **As a** Family Council Member, **I want to** view aggregated analysis with Family Readiness Score and key insights, **so that** I can understand family strengths and improvement areas before proceeding to constitution creation
4. **As a** Family Member, **I want to** complete 12 assessment blocks at my own pace with educational content, **so that** I can thoughtfully reflect on my family governance experience without time pressure
5. **As a** Family Member, **I want to** save my progress between blocks, **so that** I can return later and complete remaining sections without losing my responses
6. **As a** Family Member, **I want to** receive email/push notifications to remind me about incomplete assessment, **so that** I don't forget to complete my contribution to family constitution

[Detailed User Stories will be created in RLN1/RLN2 during Grooming]

---

## 🎨 Design & UX

**UX Notes:**
- **User flows:**
  - Consul Flow: Method Selection → Introduction → Progress Tracking → Analysis Review → Step 5 Transition
  - Family Member Flow: Email Invitation → Assessment Block 1 → ... → Assessment Block 12 → Completion Confirmation
  - Progress Saving: Auto-save every 30 sec, manual "Save Progress" button, return to last incomplete block on login

**Key UX Principles:**
- Clear progress indicators (X of 12 blocks, percentage complete, estimated time remaining)
- Educational content first, assessment questions second (learn → reflect → answer pattern)
- Non-intrusive reminders (7 days, 14 days, manual by consul)
- Confidentiality assurance (individual answers private until analysis complete)
- Visual status differentiation (Completed = green, In Progress = orange, Not Started = gray)

---

## 🧮 Business Rules & Calculations

**Key Business Rules:**

1. **Minimum Participation Threshold:**
   - Draft Constitution generation requires ≥50% family members to complete assessment
   - Absolute minimum: 2 completed assessments (even if family has 3+ members)
   - Consul receives warning if viewing results with <50% completion

2. **Response Validation:**
   - Quantitative rating (1-5): Required for each block
   - Qualitative text response: Optional but recommended
   - Text minimum length: 10 characters (if provided)
   - Text maximum length: 2000 characters

3. **Progress Persistence:**
   - Auto-save interval: 30 seconds after change
   - Intermediate progress retention: 90 days
   - Submitted blocks: Cannot be edited after submission

4. **Reminder Logic:**
   - First reminder: 7 days after invitation if not started
   - Second reminder: 14 days after invitation if not started + notify consul
   - Expiration: 30 days after start without completion → status "Expired"
   - Manual reminder limit: 1 per 24 hours by consul

5. **Repeat Assessment:**
   - Minimum interval between assessments: 1 month (prevents survey fatigue)
   - Previous results preserved for comparison
   - Change tracking: "Trust level improved from 6.2 to 7.8"

6. **Analysis Calculations:**
   - **Family Readiness Score:** Average of all participant scores across all 12 dimensions
     - Formula: `(Σ all_ratings) / (number_of_participants × 12 dimensions)`
   - **Top Strengths:** Top 3 dimensions with highest average scores
   - **Improvement Areas:** Top 3 dimensions with lowest average scores
   - **High Variance Flag:** Standard deviation >2.0 indicates significant perception differences

7. **Multi-tenancy Isolation:**
   - All queries filtered by `family_id`
   - Consul sees only own family members' progress
   - Individual responses isolated until analysis complete
   - External advisor access requires explicit consul permission

**See also:** [Link to 06-business-rules/BIZ-001-assessment-rules.md - to be created]

---

## 📊 Success Metrics

**User Experience Metrics:**
- Completion rate: >75% family members complete all 12 blocks
- Time to complete: <45 minutes per participant for all blocks
- Drop-off rate: <20% after starting assessment
- User satisfaction: >4.2/5 for assessment experience
- Average time between blocks: <10 minutes (engagement indicator)

**Business Impact Metrics:**
- Family engagement: >80% members start within 7 days of invitation
- Assessment quality: >70% responses include text comments (not just ratings)
- Time to full completion: All family members complete within 14 days
- Constitution readiness: Transition to Step 5 within 3 days after completion
- Repeat engagement: >60% families conduct repeat assessment within 12 months

**Technical Performance:**
- Analysis processing time: <3 minutes for families with <10 members, <10 minutes for 30+ members
- Auto-save reliability: >99.5% successful saves
- Notification delivery: >98% emails delivered within 5 minutes
- System uptime: >99.9% during assessment period

---

## 🔗 Related Documentation

**Knowledge Base:**
- 12 aspects of family governance content: [EPIC-001-family-assessment-workshop.md]Product\01-product-management\02-epics\EPIC-001-family-assessment-workshop.md
- User Journey: [JRN-001-assessment-workshop-solo-mode.md](../03-user-journeys/JRN-001-assessment-workshop-solo-mode.md)
- User Personas:
  - DOC-USR-001 (Family Member)
  - DOC-USR-002 (Family Council Member)
  - DOC-USR-003 (External Advisor)

**Technical References:**
- Backend: FastAPI microservices pattern (@.claude/patterns/fastapi.md)
- Frontend: React HashRouter navigation (@.claude/patterns/react.md)
- Multi-tenancy: Family isolation architecture (@.claude/contexts/database.md)
- Testing: TDD workflow guide (@docs/testing/tdd-workflow-guide.md)

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-20
**Created by:** Vladislav Atnashev
**Approved by:** [Pending]
