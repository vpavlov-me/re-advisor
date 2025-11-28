STORY 18: Analytics - Onboarding Funnel Tracking

**Issue Type:** Story
**Project:** RLN2
**Summary:** As a product manager, I want to track onboarding funnel metrics, so that I identify dropoff points and optimize conversion
**Epic Link:** SAAS-EPIC-001
**Priority:** Medium
**Story Points:** 5
**Sprint:** TBD

### ðŸ"– User Story

**As a** product manager,
**I want to** implement analytics tracking for registration and constitution setup funnel,
**so that** I can identify where users drop off and optimize those steps for higher completion rates.

### ðŸŽ¯ Business Context

Data-driven optimization of onboarding is critical for conversion improvement. Analytics reveal bottlenecks (e.g., "80% drop off at Step 5") and enable A/B testing.

### âœ… Acceptance Criteria

1. **Given** analytics tracking is implemented,
   **When** user progresses through onboarding,
   **Then** system logs events: Registration Started, Registration Completed, Wizard Opened, Step X Completed, Tour Skipped, Constitution Generated.

2. **Given** analytics dashboard is created,
   **When** product team views dashboard,
   **Then** they see funnel metrics: Registration conversion rate, Step completion rates, Average time per step, Dropout points, Skip rate, Resume rate.

3. **Given** A/B test framework is implemented,
   **When** product team runs experiment (e.g., auto-advance timing 5s vs 7s),
   **Then** system tracks variant assignment and conversion metrics per variant.

4. **Given** analytics data is captured,
   **When** product team exports data,
   **Then** they can analyze in SQL or BI tool (e.g., Tableau, Looker).

**Additional Criteria:**
- [ ] Event tracking: Google Analytics / Mixpanel / Segment
- [ ] Events: `registration_started`, `registration_completed`, `wizard_opened`, `step_X_completed`, `tour_skipped`, `tour_resumed`, `constitution_generated`
- [ ] Properties: user_id, family_id, step_number, time_spent, device_type, browser
- [ ] Funnel visualization: Dashboard showing conversion at each step
- [ ] A/B testing: Variant assignment via feature flags

### ðŸ" Design & UX

N/A (Backend analytics story)

### ðŸ"' Business Rules

**Tracking Events:**
1. **Registration Started:** When user clicks "Sign Up" or OAuth button
2. **Registration Completed:** When user account created and JWT issued
3. **Wizard Opened:** When constitution wizard modal first opens
4. **Step X Completed:** When user clicks "Next step" from any step
5. **Tour Skipped:** When user clicks "Hide setup guide"
6. **Tour Resumed:** When user clicks "Continue" from dashboard
7. **Constitution Generated:** When Step 8 completes successfully

**Authorization:**
N/A (backend tracking)

**Edge Cases:**
- **User abandons mid-step:** Track time spent on step before abandonment
- **User uses multiple devices:** Track user_id across devices
- **User clears cookies:** May appear as new user (limitation)

### ðŸ§ª Test Scenarios

**Happy Path:**
1. User registers → Event: `registration_completed` logged → User opens wizard → Event: `wizard_opened` → User completes Step 1 → Event: `step_1_completed` → Continue through all 8 steps → Event: `constitution_generated`

**Negative Tests:**
N/A (Analytics tracking doesn't have failure modes, only data quality issues)

**Edge Cases:**
1. **User skips at Step 4:** Event: `tour_skipped` with property `last_step = 4` → User resumes next day → Event: `tour_resumed` with property `resume_step = 4`
2. **User abandons at Step 6:** No `step_6_completed` event logged → Funnel shows 60% completion at Step 5, 40% at Step 6

### ðŸ"— Dependencies

**Story Dependencies:**
- **Blocked by:** RLN1-014 (All frontend stories must be implemented to track events)
- **Blocks:** None (analytics story, not blocking development)
- **External:** Google Analytics / Mixpanel account setup required

### âš ï¸ Non-Functional Requirements

**Performance:**
- Event tracking: < 10ms overhead (async, non-blocking)
- Data warehouse sync: Daily batch job

**Privacy:**
- No PII in event properties (use user_id, not email)
- GDPR compliance: Allow users to opt-out of tracking


