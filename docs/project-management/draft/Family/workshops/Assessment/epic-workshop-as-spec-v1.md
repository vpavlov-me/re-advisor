# Epic: Family Governance Assessment Workshop

> **Note:** This is an Epic for Jira FG project. Copy to Jira issue description.

---

## 📋 Basic Information

**Issue Type:** Epic
**Project:** FG
**Epic Name:** Family Governance Assessment Workshop
**Summary:** Comprehensive diagnostic workshop enabling families to assess their governance maturity across 8 dimensions and generate actionable improvement plans
**Parent User Journey:** FG-UJ-XXX [To be linked - Family Governance Maturity Journey]
**Parent Initiative:** FG-XXX [To be linked - Family Governance Platform Core]
**Priority:** High
**Epic Link:** FG-EPIC-XXX

---

## 🎯 Epic Goal

**What will this Epic deliver?**

**User-facing value:**
- Family members can complete a structured 105-question assessment evaluating their governance across 8 key dimensions (Communication & Trust, Financial Transparency, Next Generation Development, Decision Making, Values & Mission, Governance Structures, Ownership & Control, Family Identity)
- Families receive automated analysis including maturity scores, consensus maps, AI-generated insights, and prioritized recommendations
- Users can create actionable plans with timelines, accountability, and recommended next workshops
- Results can be exported in multiple formats (PDF, PowerPoint, Excel) and shared with family or advisors

**Business value:**
- Entry point into the workshop ecosystem - identifies specific needs for targeted workshops
- Provides baseline data for measuring governance improvement over time
- Creates engagement through self-discovery rather than prescriptive advice
- Generates qualified leads for facilitated workshops and advisor services
- Builds family trust through objective, data-driven insights

**Scope boundaries:**

**✅ INCLUDED:**
- Complete 8-dimension assessment framework (105 questions)
- Three completion modes: self-paced, facilitated, AI-guided
- Real-time progress tracking and auto-save functionality
- Automated scoring and consensus analysis
- AI-generated insights and recommendations
- Priority selection and action plan creation
- Export and sharing functionality
- Privacy controls (3 anonymity levels)
- Break reminders and time tracking

**❌ NOT INCLUDED:**
- Facilitator training program or certification
- Benchmark data collection from other families (Phase 2)
- Re-assessment automation and progress tracking (Phase 3)
- Native mobile apps (responsive web only for MVP)
- Multi-language support beyond English/Russian (Phase 4)
- Video/audio response capabilities (Phase 4)
- Integration with external assessment tools

---

## 👥 Target Users

**Who will use this feature?**

- **Primary Personas:** 
  - [DOC-USR-001] Family Member - completes assessment, views aggregated results
  - [DOC-USR-002] Family Council Member - completes assessment, accesses detailed results, creates action plans

- **Secondary Personas:**
  - [DOC-USR-005] External Consul - may facilitate guided sessions
  - [DOC-USR-006] Consultant - may facilitate workshops as marketplace service

---

## 📖 User Stories (High-Level)

**Main scenarios this Epic will enable:**

1. **As a** Family Member, **I want to** complete a comprehensive assessment of our family's governance, **so that** I can objectively evaluate where we stand and identify areas needing improvement

2. **As a** Family Council Member, **I want to** view aggregated results showing family consensus and divergence patterns, **so that** I can facilitate productive discussions and prioritize governance initiatives

3. **As a** Family Council Member, **I want to** receive AI-generated insights based on our assessment results, **so that** I can understand cross-dimensional patterns and get expert recommendations without hiring a consultant immediately

4. **As a** Family Member, **I want to** control the privacy of my individual responses, **so that** I can answer honestly without fear of judgment or conflict

5. **As a** Family Council Member, **I want to** create an action plan with priorities, timelines, and accountability, **so that** our family has concrete next steps rather than just a report

6. **As a** External Consul, **I want to** facilitate a live assessment session with real-time discussion, **so that** I can guide the family through difficult topics and ensure high-quality responses

7. **As a** Family Member, **I want to** see which recommended workshops address our weak areas, **so that** I can understand the path forward and book relevant services

8. **As a** Family Council Member, **I want to** export our results in multiple formats, **so that** I can share with advisors, present to the family, or integrate into our governance documentation

---

## 🔗 Dependencies

**System Dependencies:**
- **auth-service** - User authentication, family_id context, role-based permissions
- **notification-service** - Assessment invitations, progress reminders, completion notifications, results availability alerts
- **meeting-service** - Scheduling follow-up family meetings and facilitated workshops
- **education-service** - Linking to recommended workshops based on assessment results
- **workshop-service** (Future) - Integration with workshop booking for recommended next steps

**External Dependencies:**
- **AI/ML Pipeline** - Insight generation, pattern detection, recommendation engine
- **File Storage** - PDF/PowerPoint/Excel export and storage (S3 or similar)
- **Email Service** - Notification delivery for assessment invitations and results

**Data Dependencies:**
- Family profile setup must be complete (family members, roles, basic information)
- At least 2 family members required for meaningful consensus analysis
- Facilitator must be associated with family (if facilitated mode selected)

---

## 🎨 Design & UX

**Figma Links:**
- [Assessment Flow - Full Journey] - To be created
- [Results Dashboard & Visualizations] - To be created
- [Mobile Responsive Views] - To be created

**UX Notes:**
- **User flows:** 
  - **Phase 1: Setup & Context** (5-10 min) → Welcome → Role Confirmation → Privacy Settings → Mode Selection
  - **Phase 2: Individual Assessment** (60-90 min) → 8 Dimensions × 10-16 questions each → Progress tracking → Auto-save every 30 seconds → Break reminders every 25 questions
  - **Phase 3: Real-time Synthesis** (automatic backend) → Score calculation → Consensus analysis → Pattern detection → Insight generation
  - **Phase 4: Results & Discussion** (20-30 min) → Visual dashboard reveal → Consensus map exploration → AI insights review → Priority identification
  - **Phase 5: Action Planning** (10-15 min) → Top 3 priorities selection → Timeline & accountability setup → Workshop recommendations → Export & sharing

- **Key UX Principles:**
  - **Zero defaults** - No pre-selected answers, forces intentional responses
  - **Progressive disclosure** - Show complexity only when needed
  - **Celebration moments** - Acknowledge completion of each dimension
  - **Visual feedback** - Radar charts, progress bars, consensus heat maps
  - **Mobile-friendly** - Responsive design, touch-optimized (desktop primary, mobile secondary)

---

## 🔔 Notifications (if applicable)

**Does this Epic involve user notifications?** Yes

| Trigger | Recipient | Format | Description |
|---------|-----------|--------|-------------|
| Family Council initiates assessment | All invited family members | Email + In-App | "You've been invited to participate in Family Governance Assessment. Complete by [date]." |
| User hasn't started after 3 days | Individual family member | Email | Gentle reminder with direct link to begin assessment |
| User paused mid-assessment (saved progress) | Individual family member | Email (after 24h) | "Continue your assessment - your progress is saved. [X] questions remaining." |
| User completes assessment | Family Council Member | In-App notification | "[User Name] has completed their assessment. [X/Y] family members finished." |
| All family members complete assessment | All participants | Email + In-App | "Assessment complete! Results are being generated. You'll be notified when ready." |
| Results generated and ready | All participants | Email + In-App | "Your Family Governance Assessment results are ready. View insights and action plan." |
| Break reminder during assessment | Individual user (active session) | In-App only | "You've been working for 30 minutes. Consider taking a 5-minute break." |
| Consensus divergence detected | Family Council Member | In-App (during results review) | "Significant divergence detected in [Dimension]. This may require discussion." |
| Action plan deadline approaching | Assigned owner | Email (7 days before) | "Reminder: [Priority Name] target date is [Date]. Update progress?" |

**Notification Configuration Notes:**
- Default notification preferences: All users receive email + in-app by default for assessment-related notifications
- User opt-out capability: Yes - users can disable email notifications but in-app notifications remain active for active sessions
- Frequency limits: Max 1 reminder per day for incomplete assessments; no more than 3 total reminders
- Localization requirements: English and Russian supported in MVP

---

## 🧮 Business Rules

**Key Business Rules:**

**Assessment Participation:**
1. Minimum 2 family members must participate for consensus analysis to be meaningful
2. Family Council Members can see full results; Regular Family Members see aggregated results only (unless privacy settings allow)
3. Maximum 10 invited participants per assessment session (can run multiple sessions)
4. Assessment session expires after 30 days of inactivity

**Question Response Rules:**
5. Users cannot proceed without answering or explicitly skipping a question
6. Maximum 3 skipped questions per dimension allowed (>3 skips = dimension marked as incomplete)
7. Text comments are optional but encouraged for divergent responses
8. Once a dimension is completed, users can go back and edit answers until full assessment submission

**Privacy & Anonymity:**
9. Three anonymity levels: (1) Fully anonymous - only aggregated data visible, (2) Anonymous with reveal option - can choose to reveal later, (3) Named responses - all participants see who answered what
10. Facilitators ALWAYS see full individual responses with names (for effective guidance)
11. Privacy settings cannot be changed after assessment completion (data integrity)
12. Individual text comments are NEVER shown in aggregated views unless user explicitly publishes them

**Scoring & Analysis:**
13. Each dimension scored on 0-100 scale (normalized from 1-7 Likert responses)
14. Overall maturity score is weighted average across all 8 dimensions (critical dimensions weighted higher)
15. Confidence score calculated based on: (a) completion percentage (70% weight), (b) answer consistency (30% weight)
16. Consensus levels: High (σ < 10), Moderate (σ 10-20), Low (σ 20-30), Critical divergence (σ > 30)

**Insight Generation:**
17. AI insights prioritized as: Critical → High → Medium → Low
18. Minimum 3 insights generated per assessment (1 strength, 1 concern, 1 opportunity)
19. Workshop recommendations triggered when dimension score < 50/100
20. Cross-dimensional pattern detection requires minimum 3 dimensions completed

**Action Planning:**
21. Users can select maximum 3 priorities for action plan (focus principle)
22. Each priority must have: assigned owner, target timeline, first concrete step
23. Recommended workshop links are automatically generated based on priority selection
24. Action plans can be edited after creation but maintain version history

**Export & Sharing:**
25. PDF exports include: overview, dimension scores, consensus maps, top 3 insights, action plan
26. Individual answer details included in export ONLY if privacy settings permit
27. Exports are valid for 90 days after generation, then archived
28. Sharing via email requires recipient to have Family Portal account (or create one)

---

## 📝 Notes

**Additional Context:**

**Phase-based Development:**
- **MVP (Phase 1)**: Focus on core assessment flow, basic scoring, manual insight review, PDF export
- **Intelligence (Phase 2)**: Add automated AI insights, advanced consensus analysis, benchmark comparisons
- **Ecosystem (Phase 3)**: Integrate with workshop booking, progress tracking, re-assessment automation
- **Advanced (Phase 4)**: Multi-language, native mobile apps, video responses

**Success Metrics:**
- Completion rate >85% (users who start finish the assessment)
- Average completion time: 90-120 minutes
- <10% skip rate per dimension
- 70%+ families create action plan after viewing results
- 50%+ schedule recommended workshop within 30 days

**Assumptions:**
- Families understand the value of objective self-assessment
- Users will answer honestly if privacy controls are robust
- AI-generated insights provide sufficient value vs. human facilitator for initial assessment
- 105 questions is acceptable length if UX is optimized with progress tracking and breaks

**Constraints:**
- Must work on desktop and tablet reliably (mobile phone support secondary)
- Response time <2 seconds for question navigation
- Results generation <30 seconds after last participant completes
- HIPAA-compliant data storage (family health information may be discussed in comments)
- Multi-tenant architecture - strict family_id isolation throughout

**Open Questions:**
- Should we allow partial assessment completion (e.g., only 5 of 8 dimensions) for faster insights?
- What happens if only 1 family member completes assessment? (No consensus analysis possible)
- Should facilitators be able to edit/weight questions during live sessions?
- How do we handle assessment re-takes (e.g., after 6 months)? New session or update existing?

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-31
**Created By:** Product Team
**Epic Status:** Draft - Pending Approval