# Epic Template - Jira SAAS Project

> **Note:** This is a template for creating Epics in Jira SAAS project. Copy relevant sections to Jira issue description.

---

## 📋 Basic Information

**Issue Type:** Epic
**Project:** SAAS
**Epic Name:** Assessment Workshop with External Advisor
**Summary:** Enable families to conduct professional governance assessment workshops with external consultants through advisor marketplace, smart scheduling, and automated action planning
**Parent Initiative:** SAAS-XXX [Link to Constitution Setup Proposal]
**Priority:** High
**Epic Link:** SAAS-EPIC-004

---

## 🎯 Epic Goal

**What will this Epic deliver?**

This Epic delivers a complete workflow for families to:
- Select and book professional governance consultants from an advisor marketplace
- Conduct facilitated assessment workshops with automated material distribution and reminders
- Receive comprehensive assessment results with AI-generated action plans
- Track post-workshop tasks and progress

**User-facing value:**
- Consul/Administrators can access vetted professional consultants for family governance assessment
- Families receive expert facilitation for complex governance discussions with neutral third-party
- Automated scheduling eliminates coordination pain points across multiple family members and time zones
- AI-powered recommendations generate actionable next steps from assessment insights
- Consultants gain efficient multi-family client management through specialized portal

**Business value:**
- Establishes marketplace model connecting families with professional advisors (revenue via consultant fees)
- Increases constitution completion rates through professional guidance (target 80% retention)
- Reduces Consul coordination burden enabling faster assessment completion (<21 days average)
- Creates recurring revenue through follow-up engagements (3-6 month consultation cycles)
- Differentiates platform through expert services integration

**Scope boundaries:**
- ✅ **IN SCOPE:**
  - Advisor marketplace with filtering (specialization, language, timezone, price)
  - Smart scheduling with AI recommendations and availability matrix
  - Live workshop interface with 12 governance dimensions assessment
  - Automated action plan generation and task creation
  - Advisor Portal for consultant-side workshop management

- ❌ **OUT OF SCOPE:**
  - Payment processing (handled separately by payments team)
  - Video conferencing infrastructure (using third-party integration)
  - Advisor verification/onboarding (handled by admin portal separately)
  - Advanced AI analysis beyond basic action plan generation (future enhancement)

---

## 👥 Target Users

**Who will use this feature?**

- **Primary Personas:**
  - Consul (DOC-USR-002) - Leads workshop booking, coordinates family participation, manages follow-up actions
  - External Consultant/Advisor (DOC-USR-003) - Facilitates workshops, provides expert insights, delivers assessment reports

- **Secondary Personas:**
  - Family Members (DOC-USR-001) - Participate in workshops, complete pre-workshop materials, receive assigned tasks
  - Administrator - May initiate workshop booking, manages consultant marketplace quality

---

## 📖 User Stories (High-Level)

**Main scenarios this Epic will enable:**

1. **As a** Consul, **I want to** browse and select vetted professional consultants from a marketplace filtered by specialization, language, timezone and price, **so that** I can find the right expert to guide our family's governance assessment without extensive research

2. **As a** Consul, **I want to** see AI-generated optimal meeting times that work for our consultant and multiple family members across different timezones, **so that** I avoid the painful manual coordination of scheduling across 8+ calendars

3. **As a** Consul, **I want to** receive automated distribution of workshop materials (workbook, questionnaire, intro video) to all participants with completion tracking, **so that** everyone comes prepared without me having to manually chase down responses

4. **As a** Family Member, **I want to** participate in a professionally-facilitated live workshop that systematically evaluates our family's governance readiness across 12 dimensions, **so that** we get expert guidance on our strengths and development areas without internal facilitation bias

5. **As a** Consul, **I want to** receive comprehensive assessment results with consultant insights and an automatically-generated action plan broken down by timeframes (immediate/short-term/long-term), **so that** I have clear next steps with pre-filled tasks, assignees and deadlines ready to track

6. **As an** External Consultant, **I want to** manage multiple family workshops through a dedicated Advisor Portal showing upcoming sessions, client context, pre-workshop responses and deliverable deadlines, **so that** I can efficiently prepare personalized facilitation without manual context switching across 5-15 clients

7. **As a** Consul, **I want to** create tasks directly from the action plan recommendations with automatic family_id isolation, **so that** follow-up actions are tracked in our family's task management without cross-family data leakage

8. **As a** Family Member, **I want to** receive clear task assignments with deadlines from the workshop action plan, **so that** I understand my responsibilities and can contribute to our governance implementation

[Detailed User Stories will be created in RLN1/RLN2 during Grooming]

---

## 🔗 Dependencies & Risks

### Dependencies (Blockers)
- **Upstream:**
  - Epic: SAAS-CONST-003 - Constitution Setup Wizard (Step 4 Assessment selection point)
  - Service: Calendar Service - Multi-participant availability checking and scheduling
  - Service: Video Conference Integration - Live workshop video rooms
  - Service: Notification Service - Automated reminders (7 days, 24 hours, 1 hour before)
  - Service: Task Management Service - Action plan task creation and tracking
  - Portal: Advisor Portal Backend - Consultant profile management, availability, workshop access

- **Downstream:**
  - Epic: SAAS-CONST-005 - Values & Mission Workshop (recommended next step after assessment)
  - Feature: Follow-up Consultation Scheduling (3-6 month progress reviews)
  - Analytics: Workshop completion and quality metrics

### Risks
| Risk | Impact | Mitigation |
|------|--------|------------|
| Insufficient consultant supply leads to 4-6 week booking delays, families abandon process | High | Proactive consultant recruitment campaign, show AI workshop alternative prominently, display realistic wait times upfront |
| Scheduling conflicts across multiple timezones frustrates users, manual override increases Consul burden | Medium | Robust AI scheduling with progressive time window expansion, always provide manual calendar fallback, visual availability matrix |
| Workshop technical failures (video drops, data loss) damage consultant credibility and family experience | High | Auto-save every 30 seconds, enable session resumption from last save point, provide alternative video platform links, record all workshops with consent |
| Automated action plans generate generic/irrelevant recommendations, reducing perceived value | Medium | Require consultant review/editing before finalization, gather family feedback on recommendation quality, iterate AI algorithm |
| Cross-family data leakage through consultant portal violates multi-tenancy isolation | Critical | Strict family_id filtering on all queries, explicit family-consultant association checks, regular security audits, encrypted sensitive data |
| Consultant no-shows or cancellations disrupt family schedules and erode trust | Medium | Automated urgent notifications to consultant, 15-minute wait policy with auto-reschedule, track consultant reliability metrics, penalize repeated offenses |

---

## 🎨 Design & UX

**Figma Links:**
- [Advisor Marketplace & Filtering - Figma URL TBD]
- [Smart Scheduling Interface with Availability Matrix - Figma URL TBD]
- [Live Workshop Exercise Interface (12 Dimensions) - Figma URL TBD]
- [Assessment Results Dashboard & Action Plan - Figma URL TBD]
- [Advisor Portal - Workshop Management - Figma URL TBD]

**UX Notes:**
- **User flows:**
  - Consul journey: Constitution Step 4 → Select "Workshop with Advisor" → Browse marketplace → Filter consultants → Send contact message → Book workshop → Smart scheduling → Confirm booking → Receive materials → Attend workshop → Review results → Create tasks → Proceed to Step 5
  - Family Member journey: Receive invitation → Access workshop materials → Complete pre-workshop questionnaire → Attend workshop → View results → Receive assigned tasks
  - Consultant journey: Receive booking notification in Advisor Portal → Review family context & questionnaire → Prepare facilitation → Conduct workshop → Edit auto-generated report → Submit final assessment

- **Key UX principles:**
  - **Reduce Consul coordination burden:** AI scheduling, automated reminders, material distribution, task creation
  - **Multi-tenancy clarity:** Visual indicators showing family context, strict data isolation
  - **Advisor context switching:** Quick family summary cards in portal, consolidated dashboard
  - **Trust signals:** Consultant ratings, credentials, specialization badges, response time tracking

**See also:** DOC-JRN-004 - Assessment Workshop with External Advisor User Journey

---

## 🧮 Business Rules & Calculations

**Key Business Rules:**

1. **Workshop Participation Requirements:**
   - Minimum 2 family members must confirm attendance for valid assessment
   - Selected consultant must have "Assessment" in their specialization list
   - Workshops cannot be scheduled <48 hours in advance (consultant prep time)
   - Standard workshop duration: 1.5-2 hours (consultant determines based on family size)

2. **Assessment Completion Validation:**
   - Minimum 10 of 12 governance dimensions must be completed for valid results
   - Overall readiness score calculated as weighted average of all dimensions
   - Top 4 strengths: dimensions with highest scores
   - Top 4 development areas: dimensions with lowest scores

3. **Authorization & Permissions:**
   - Only Consul or Administrator roles can book paid consultant engagements
   - Only Consul or Administrator can approve final assessment results
   - All family members can view results (read-only), only Consul can create tasks
   - Consultant access to family data requires explicit family-consultant association

4. **Scheduling Rules:**
   - System validates all selected participants are available before confirming booking
   - Automated reminders sent at: 7 days, 24 hours, 1 hour before workshop (cannot be disabled)
   - Cancellations require 48-hour notice (policy may vary by consultant)
   - All times displayed in user's local timezone with explicit timezone label

5. **Data Privacy & Isolation:**
   - Assessment responses and results accessible only to family and selected consultant
   - Workshop recordings require explicit consent from all participants
   - Consultant access to family data expires after 12 months unless explicitly renewed
   - All approvals, task creations, consultant communications logged with timestamp + user ID

6. **Consultant Marketplace Quality:**
   - All consultants verified by platform admin before appearing in marketplace
   - Consultants must select 1-5 specializations from predefined list
   - Expected response time to family contact messages: <24 hours (tracked for quality)
   - Only families who completed/paid ≥1 session can leave ratings/reviews
   - Consultants with consistently low ratings (<3.5/5) removed from marketplace

7. **Action Plan Generation:**
   - Plans auto-generated by system based on assessment patterns
   - Categorized by timeframe: Immediate (7 days), Short-term (1-3 months), Long-term (6-12 months)
   - Each item includes: description, recommended assignee, deadline, priority
   - Consultant must review and can modify recommendations before finalization
   - Tasks created from action plan automatically inherit family_id isolation

8. **Follow-up Engagement:**
   - Follow-up sessions recommended 3-6 months after initial assessment
   - Families can request assessment revision if Consul disagrees with results
   - Consultant can schedule additional session to complete incomplete assessments (<10 dimensions)

**Calculations:**

1. **Overall Governance Readiness Score:**
   ```
   Overall Score = Weighted Average of 12 Dimension Scores
   Where each dimension scored 1-5 during workshop
   Display as: X.X/10 (e.g., 7.2/10)

   Color coding:
   - 8.0-10.0: Green (Strong readiness)
   - 6.0-7.9: Yellow (Moderate readiness)
   - 0.0-5.9: Red (Development needed)
   ```

2. **AI Smart Scheduling Ranking:**
   ```
   Time Slot Score = (Availability Match Weight × 0.6) + (Time Quality Weight × 0.3) + (Timezone Fairness × 0.1)

   Availability Match: % of required participants available
   Time Quality: Peak hours (9am-5pm local) = 1.0, Edge hours = 0.5
   Timezone Fairness: Minimize extreme hours for any participant

   Rank top 3 slots as: "Optimal", "Good", "Acceptable"
   ```

3. **Consultant Utilization Rate:**
   ```
   Utilization = (Booked Workshop Hours / Total Available Hours) × 100%
   Target: >60% utilization
   Track monthly for consultant performance
   ```

**See also:** DOC-JRN-004 - Business Rules section for complete rules list

---

## 📅 Estimated Timeline

**Phases:**

1. **Investigation & Solution Design:** 3 weeks
   - Advisor marketplace architecture and filtering logic
   - Smart scheduling algorithm design with multi-participant availability
   - Live workshop interface with 12 governance dimensions
   - Action plan generation logic and task creation flow
   - Advisor Portal consultant-side features
   - Multi-tenancy isolation validation for consultant access model

2. **Development:** 8 weeks
   - Sprint 1-2: Advisor marketplace, consultant profiles, filtering, contact messaging
   - Sprint 3-4: Smart scheduling, availability matrix, booking confirmation, material distribution
   - Sprint 5-6: Live workshop interface, 12 dimension exercises, real-time saving, consultant facilitation controls
   - Sprint 7-8: Assessment results generation, action plan creation, task integration, Advisor Portal dashboard

3. **Testing:** 2 weeks
   - Multi-tenancy isolation testing (consultant accessing only associated families)
   - End-to-end workshop flow with multiple participants
   - AI scheduling algorithm validation across timezones
   - Action plan generation quality testing
   - Performance testing under concurrent workshops
   - Security audit for family data access controls

4. **Release & Knowledge Transfer:** 1 week
   - Phased rollout: Beta with 5 pilot families + 2 consultants
   - Monitor workshop completion rates, scheduling success, task creation
   - Gather feedback on consultant and family experience
   - Documentation for support team and consultant onboarding

**Target Release:** Q1 2026 - Sprint 24-27 (estimated)

**Dependencies Timeline:**
- Constitution Wizard Step 4 must be completed first (prerequisite)
- Calendar Service availability checking API (parallel development)
- Task Management Service integration (parallel development)
- Advisor Portal backend consultant features (parallel development)

---

## 🔗 Related Documentation

**Knowledge Base:**
- User Journey: DOC-JRN-004 - Assessment Workshop with External Advisor
- User Personas:
  - DOC-USR-002 - Consul/Council Member
  - DOC-USR-003 - External Consultant/Advisor
  - DOC-USR-001 - Family Member
- Feature Spec: [FEAT-004-assessment-workshop.md - to be created during grooming]
- Data Model: [08-data-model/advisor-marketplace-model.md - to be created]
- Business Rules: [06-business-rules/assessment-workshop-rules.md - to be created]
- Architecture: [CLAUDE.md - Multi-tenancy architecture and service ports]

**Related Epics:**
- SAAS-CONST-003 - Constitution Setup Wizard (upstream dependency)
- SAAS-CONST-005 - Values & Mission Workshop (downstream workflow)
- SAAS-ADV-001 - Advisor Portal Core Features (parallel development)
- SAAS-TASK-001 - Task Management Service (integration dependency)

---

## 📝 Notes

**Open Questions:**
- [ ] Which video conferencing platform to integrate? (Zoom, custom WebRTC, or multi-provider?)
- [ ] Payment processing model: Platform fee on consultant bookings or subscription included? (affects pricing calculation)
- [ ] Should AI action plan generation use LLM or rule-based templates initially? (impacts development complexity)
- [ ] Minimum viable consultant marketplace size before launch? (5? 10? 20 consultants?)
- [ ] Should workshop recordings be stored permanently or expire after X months? (storage cost implications)
- [ ] What level of calendar integration needed? (Read-only availability check or full bidirectional sync?)
- [ ] Should consultant-family messaging be real-time chat or async email-style? (impacts infrastructure)
- [ ] How to handle consultant cancellations/no-shows policy and refunds? (business policy decision)

**Key Success Metrics:**
- Workshop booking completion rate >70% after consultant selection
- Workshop attendance rate >85% (matches meeting attendance target)
- Assessment completion rate >90% (all 12 dimensions)
- Action plan task creation rate >65%
- Family satisfaction with consultant services >4.5/5
- Consultant utilization rate >60%
- Average time from assessment choice to completed results <21 days
- Retention to next constitution step >80%

**Migration Considerations:**
- None - this is a new feature, no existing data migration needed
- Consultant profiles will need initial seeding with 5-10 verified professionals before launch
- Integration with existing Constitution Wizard Step 4 as new assessment method option

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-20
**Epic Version:** 1.0.0
**Epic Created:** 2025-10-20
**Source User Journey:** DOC-JRN-004 v2.0.0
