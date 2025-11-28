# Epic: EPIC-003-assessment-workshop-ai.md

## 📋 Basic Information

**Issue Type:** Epic
**Project:** FG
**Epic Name:** AI-Guided Assessment Workshop Implementation
**Summary:** Enable families to conduct collaborative governance assessment through AI-facilitated workshop, providing affordable alternative to consultant-led workshops
**Parent Initiative:** FG-XXX [Constitution Setup Wizard - Step 4 Assessment]
**Priority:** High
**Epic Link:** FG-EPIC-005

---

## 🎯 Epic Goal

**What will this Epic deliver?**

This Epic will deliver a complete AI-guided assessment workshop system that enables families to:
- **Collaboratively assess** their family governance maturity across 12 key dimensions through a structured 2-3 hour live workshop
- **Receive personalized AI guidance** throughout the assessment process, with context-specific recommendations based on their unique family situation
- **Generate comprehensive reports** automatically upon completion, identifying strengths and development opportunities
- **Schedule flexibly** using democratic voting mechanism, accommodating family members across time zones

**Business Value:**
- Reduces financial barrier to professional governance assessment by 100% (included in subscription vs $500-1500 consultant fee)
- Accelerates constitution setup completion by providing accessible Step 4 option (target: >40% adoption rate vs other assessment methods)
- Improves family engagement through collaborative real-time experience vs individual completion
- Generates actionable insights through AI analysis of family-specific context

**Scope Boundaries:**

**Included:**
- Method selection interface for choosing AI Workshop vs alternatives (Advisor Workshop, AI Auto-fill, Manual Fill)
- Democratic voting system for workshop scheduling with time slot options
- Live collaborative workshop environment supporting 2-10 simultaneous participants
- 12-block assessment framework with didactic materials, personal reflection prompts, and rating exercises
- AI consultation service providing personalized recommendations based on family context (unlimited requests per block)
- Real-time collaboration features: live participant indicators, progress synchronization, activity status
- Auto-save mechanism (every 30 seconds) with resume capability
- Automated comprehensive report generation with AI insights, strength/opportunity identification, actionable recommendations
- Approval workflow for Consul to validate assessment results before progression
- Integration with Constitution Setup Wizard (Step 4 → Step 5 transition)

---

## 👥 Target Users

**Primary Personas:**
- **Family Council Member (Consul)** - Initiates workshop planning, coordinates scheduling, manages approval workflow, ensures family participation. Key pain point addressed: reduces coordination burden through automated voting and AI facilitation vs manual scheduling and leading discussions.
- **Family Member** - Active workshop participants who contribute reflections, receive AI guidance, and rate dimensions. Key pain point addressed: provides clear structure and real-time collaboration vs confusion about individual vs group work.

**Secondary Personas:**
- **External Advisor** - May receive approved assessment reports if family chooses to share (read-only access, does NOT participate in AI workshop)

---

## 📖 User Stories (High-Level)

**Assessment Method Selection:**
1. **As a** Family Council Member, **I want to** view all assessment method options with clear comparison (cost, duration, facilitation type), **so that** I can make informed decision on AI Workshop vs Advisor Workshop vs other methods based on family needs and budget

**Workshop Planning & Scheduling:**
2. **As a** Family Council Member, **I want to** select workshop date and propose 2-3 time slot options for family voting, **so that** I can democratically coordinate scheduling across family members without manual back-and-forth
3. **As a** Family Member, **I want to** vote for my preferred time slots and see live voting results, **so that** I can participate in scheduling decision and understand family consensus
4. **As a** Family Council Member, **I want to** receive automatic workshop confirmations and calendar invitations for all participants, **so that** I don't have to manually coordinate logistics and reminders

**Live Workshop Participation:**
5. **As a** Family Member, **I want to** work through 12 assessment blocks with clear didactic materials, reflection prompts, and rating exercises, **so that** I understand what's being assessed and can provide thoughtful input
6. **As a** Family Member, **I want to** request AI consultation on my reflections and receive personalized recommendations, **so that** I get guidance specific to my family's context rather than generic advice
7. **As a** Family Member, **I want to** see real-time progress and participant activity during workshop, **so that** I know where we are in the process and what others are doing
8. **As a** Family Council Member, **I want to** monitor overall participation and send gentle nudges to inactive members, **so that** I can ensure engagement without micromanaging
9. **As a** Family Member, **I want to** take breaks during workshop with consensus and resume later, **so that** I'm not forced to complete 2-3 hours in one sitting if family needs pause

**Results & Report:**
10. **As a** Family Member, **I want to** view comprehensive assessment report showing our scores, AI insights, strengths, and development opportunities, **so that** I understand our family's governance maturity and what to improve
11. **As a** Family Council Member, **I want to** approve assessment results or request changes if inaccurate, **so that** I have control over what becomes permanent record in our constitution
12. **As a** Family Council Member, **I want to** transition smoothly to Step 5 (Values Workshop) after approval, **so that** we maintain momentum in constitution setup process

[Detailed User Stories will be created in FG during Grooming]

---

## 📗 Dependencies & Risks

### Dependencies (Blockers)

**Upstream:**
- **Epic: FG-EPIC-003 - Constitution Setup Wizard Core** - Must be completed first
  - Required: Steps 1-3 completion logic, navigation framework, progress tracking
  - Blocks: Cannot start Step 4 assessment without foundation
  - Timeline: Must be production-ready before AI Workshop Epic begins
  
- **Technical: AI Consultation Service** - Must be operational with <5s response time
  - Required: NLP service (Claude API) with family context analysis capability
  - Blocks: Core workshop value proposition depends on AI guidance quality
  - Alternative: Launch with reduced consultation capacity, scale up based on usage
  
- **Technical: Real-Time Collaboration Infrastructure** - Must support 10 concurrent participants per workshop
  - Required: WebSocket architecture, state synchronization, presence tracking
  - Blocks: Live collaborative workshop experience impossible without this
  - Alternative: Phase 1 could be asynchronous mode (different user story), Phase 2 adds synchronous

**Downstream:**
- **Epic: FG-EPIC-006 - Values, Mission & Vision Workshop** - Depends on assessment completion
  - Impact: Assessment insights inform Values workshop recommendations
  - Timing: Can develop in parallel, but cannot test integration until AI Workshop released
  
- **Feature: Task Management from Recommendations** - Depends on assessment reports
  - Impact: AI-generated recommendations converted to trackable tasks
  - Timing: Can implement after Epic completes, nice-to-have not blocker

**External Dependencies:**
- **Third-party: Anthropic Claude API** - For AI consultation service
  - Risk: API rate limits, cost scaling, service availability
  - Mitigation: Implement fallback messaging, queue system, caching common consultations
  
- **Third-party: Calendar Integration (.ICS generation)** - For workshop scheduling
  - Risk: Different calendar systems may handle invitations differently
  - Mitigation: Test with major providers (Google, Outlook, Apple), provide manual add option

### Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| **AI consultation quality insufficient** - Families find AI recommendations too generic, reducing workshop value vs advisor alternative | High - Core differentiator fails, adoption <40% target | Medium | 1) Extensive testing with diverse family contexts pre-launch<br>2) Implement feedback mechanism (thumbs up/down) to improve AI model<br>3) Offer "Request Changes" if report inaccurate<br>4) Monitor consultation usage rates as leading indicator |
| **Real-time collaboration technical complexity** - State synchronization, disconnection handling, performance issues at scale cause poor UX | High - Workshop unusable if laggy or buggy | Medium | 1) Build robust auto-save every 30s<br>2) Implement graceful reconnection<br>3) Load test with 50 concurrent workshops before release<br>4) Phase 1: Launch with reduced concurrent capacity, scale gradually<br>5) Provide "Take a Break" fallback if technical issues |
| **Low workshop completion rate** - Families start but don't finish (2-3 hours too long, technical friction, disengagement) | High - Wasted effort, incomplete assessments don't generate value | Medium-High | 1) Clear duration expectations upfront (2-3 hours)<br>2) Progress bar prominently visible<br>3) Break option after each block<br>4) Resume capability within 7 days<br>5) Monitor completion funnel: identify drop-off blocks |
| **Scheduling coordination failure** - Voting doesn't converge, families can't find time, low participation | Medium - Families frustrated, abandon AI method for alternatives | Medium | 1) 48-hour voting deadline with automated reminders<br>2) Consul override capability if tie<br>3) Flexible 2-3 time slot options<br>4) Allow rescheduling up to 24h before workshop<br>5) If voting fails repeatedly, suggest asynchronous mode (future) or advisor workshop |
| **Report generation inaccuracy** - AI-generated insights miss key family issues or misinterpret context | Medium - Family dissatisfaction, reduced trust in AI | Low-Medium | 1) "Request Changes" workflow with human review<br>2) Show transparent data: individual ratings visible, not just AI summary<br>3) Report includes raw scores + AI commentary (families validate both)<br>4) Continuous AI model improvement based on feedback |
| **Scope creep into asynchronous mode** - Team pressured to build asynchronous workshop during Epic for distributed families | Medium - Timeline delay, complexity increase | Medium | 1) Document as explicit future enhancement (GAP-1)<br>2) Launch synchronous-only v1, gather data on demand<br>3) If >30% families request asynchronous, prioritize for v2<br>4) Workaround: Families can choose Manual Fill method |
| **Advisor market cannibalization concerns** - External advisors perceive platform as competition, reduce engagement | Low-Medium - May affect advisor relationships long-term | Low | 1) Position as complement not replacement: AI for assessment, advisors for deeper work<br>2) Enable report sharing with advisors<br>3) Promote advisor workshop as premium option<br>4) Market AI workshop to families without existing advisor relationships |

---

## 🔍 Design & UX

**UX Notes:**

**Key User Flows:**
1. **Method Selection Flow:**
   - User (Consul) reaches Step 4 in Constitution Setup Wizard
   - Views 4 assessment method cards in grid layout with clear comparison
   - Selects "Workshop with AI" card → "Continue to Workshop Setup" button
   - Transition: Smooth slide to scheduling screen

2. **Scheduling & Voting Flow:**
   - Consul selects date from calendar widget
   - Chooses 2-3 time slots from 4 standard options (Morning/Late Morning/Afternoon/Evening)
   - Clicks "Send Invitations & Voting Link" → System generates unique voting link
   - Family Members receive email, click link, vote for preferred slots (can select multiple)
   - Live voting dashboard updates real-time with participant count and results
   - After 48h OR all members voted: System determines winning time slot
   - Consul receives "Voting Complete" notification → Confirms final schedule
   - All participants receive calendar invitations (.ICS files) + preparation instructions

3. **Live Workshop Flow:**
   - Participants click workshop room link 1 hour before start
   - Workshop room opens: AI Facilitator "Archimedes" introduces Block 1
   - **For each of 12 blocks (repeated):**
     - AI introduction explaining dimension importance
     - Didactic material: "Why Matters", "Key Dimensions", "Best Practice" (expandable sections)
     - Personal reflection: Textarea with guiding questions, 50-char minimum
     - AI consultation (optional): "Ask AI" button → 2-3 sec loading → Personalized response (Analysis + Rating Guidance + 3 Recommendations)
     - Rating exercise: 1-5 scale with emoji + label, click to select, auto-save
     - Submit & Continue: Wait for all participants → System shows aggregated results
     - Aggregated view: Family average score, individual ratings visible, AI family insight
   - Progress bar updates after each block: "Block X of 12 - Y% complete"
   - "Take a Break" option available (requires consensus)
   - After Block 12: "Workshop Complete!" celebration screen

4. **Report Review & Approval Flow:**
   - System generates comprehensive report (1-2 min processing)
   - Consul and Members receive "Assessment Report Ready" notification
   - Report displays: Overall Readiness Score (0-10), 12 dimension summaries, Key Findings (Strengths + Development Areas), AI Recommendations
   - Consul reviews thoroughly → Clicks "Approve Report & Continue" OR "Request Changes"
   - If approved: Success screen shows constitution progress (50% complete, Step 5 unlocked)
   - Transition: "Continue to Step 5" button → Values, Mission & Vision Workshop

**Critical UX Principles:**
- **Clarity over cleverness**: Every action clearly labeled, no ambiguous buttons
- **Progress transparency**: Always show where user is in journey (Stage 2 of 6, Block 5 of 12, 42% complete)
- **Real-time feedback**: Live status indicators ("3 of 4 members voted", "Mary is writing reflection")
- **Graceful errors**: If AI consultation fails, show friendly message + retry option, don't block progress
- **Responsive design**: Desktop-optimized but tablet-friendly (workshop doable on iPad), mobile not primary target
- **Accessibility**: Keyboard navigation, screen reader support for critical paths, WCAG AA compliance

**See also:** [JRN-003-assessment-workshop-ai](Product\00-final\Assesment workshop\03 Assessment workshop with AI\JRN-003-assessment-workshop-ai.md) for detailed stage-by-stage UX descriptions

---

## 🧮 Business Rules

**Key Business Rules:**

### Workshop Participation & Completion
1. **Minimum participation**: At least 2 family members (including Consul) must participate for valid assessment
2. **Synchronous requirement**: Workshop is live synchronous event - all participants work together real-time
3. **Invitation-only access**: Only explicitly invited family members can join workshop room via unique link
4. **One workshop per family per Step 4**: Family conducts only one AI workshop for completing Step 4 (no multiple attempts)
5. **Minimum blocks for valid report**: At least 10 of 12 blocks must be completed to generate assessment report

### Block Completion Requirements
6. **Reflection minimum**: Participants must enter minimum 50 characters in personal reflection before requesting AI consultation
7. **Rating requirement**: Participants must select rating (1-5) before submitting block (AI consultation optional)
8. **Sequential progression**: Blocks completed sequentially (cannot skip ahead to Block 5 without completing 1-4)

### Voting & Scheduling
9. **Date selection authority**: Only Consul/Admin can select workshop date and propose time slots for voting
10. **Time slot options**: Consul must propose minimum 2 and maximum 3 time slots for voting
11. **Voting window**: Voting remains open 48 hours OR until all members voted (whichever comes first)
12. **Winning determination**: Time slot with most votes becomes scheduled time; in tie scenario, Consul manually selects
13. **Reschedule policy**: Workshop can be rescheduled up to 24 hours before start time; after that, no rescheduling allowed
14. **Late voting**: Members can vote after deadline only if voting still open (no retroactive votes)

### AI Consultation Service
15. **Context requirement**: AI consultation requires minimum 50 characters reflection entered (same as block completion requirement)
16. **Response time SLA**: AI must generate consultation response within 5 seconds (performance requirement)
17. **Unlimited consultations**: Participants can request AI guidance unlimited times per block (not capped)
18. **Personalization requirement**: AI responses must be specific to family's shared context, not generic templated advice
19. **Recommendation format**: AI must provide exactly 3 actionable recommendations per consultation (standardized structure)
20. **Rating guidance approach**: AI suggests rating range (e.g., "2-3"), doesn't dictate exact rating (preserves participant judgment)

### Progress & Save
21. **Auto-save frequency**: Workshop progress auto-saved every 30 seconds without user action required
22. **Resume timeframe**: Workshop can be resumed within 7 days after taking break; after that, session expires and must restart
23. **Disconnection handling**: If participant disconnects, their progress preserved and can reconnect to resume on same block
24. **Break consensus**: "Take a Break" requires consensus from all participants before pausing workshop

### Report Generation & Approval
25. **Scoring calculation**: Each dimension score = arithmetic mean of all participant ratings for that dimension
26. **Overall readiness score**: Weighted average of all 12 dimensions (some weighted higher based on governance importance), converted to 0-10 scale
27. **Strengths identification**: Dimensions scoring ≥4.0 considered strengths, top 3-4 highlighted in report
28. **Development areas identification**: Dimensions scoring <3.5 considered opportunities, top 3-4 flagged for improvement
29. **Approval authority**: Only Consul or Administrator can approve final assessment report
30. **Report immutability**: After approval, report becomes permanent record (cannot edit), stored in family's constitution

### Access Control & Permissions
31. **Method selection permission**: Only Consul/Admin can select AI Workshop method in Step 4
32. **Workshop room access**: Only invited family members with valid workshop room link can join live session
33. **Consul special controls**: Consul has additional workshop management capabilities (pause session, send reminders, skip problematic blocks if technical issues)
34. **Report access**: All family members can view report (read-only); only Consul/Admin can approve or request changes
35. **External sharing**: Only Consul/Admin can share approved assessment report with external advisors

**See also:** [DOC-JRN-003: Business Rules & Controls Section](Product\00-final\Assesment workshop\03 Assessment workshop with AI\JRN-003-assessment-workshop-ai.md#business-rules--controls) for validation logic, state transitions, compliance requirements

**Implementation Notes:**
- **Technology Stack Recommendation**: React + WebSocket (socket.io) for frontend real-time; Node.js/Python FastAPI for backend; PostgreSQL + Redis for data/session state; OpenAI GPT-4 API for consultations (start with this, can switch to Claude if needed); S3 for report PDFs
- **Security Considerations**: Workshop room links must be cryptographically secure (UUID v4), single-use per family, expire after completion; WebSocket auth on every message not just handshake; AI consultations rate-limited per user; report data encrypted at rest
- **Performance Targets**: API response <200ms p95, AI consultation <5s p99, WebSocket sync latency <500ms, workshop completion >85%, voting participation >80%, report approval <7 days
- **Monitoring & Alerts**: Track workshop completion funnel (identify drop-off blocks), AI consultation satisfaction ratings (thumbs up/down), WebSocket disconnection rates, report approval time, family retention to Step 5

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-20
**Epic Status:** Draft - Ready for Review
**Next Review:** Product Team Planning Meeting (schedule TBD)