STORY 12: Frontend - Constitution Wizard UI (Step 8, Constitution Generation)

**Issue Type:** Story
**Project:** RLN1
**Summary:** As a Family Council Member, I want to complete Step 8 and generate my family constitution, so that I have a finalized governance document
**Epic Link:** SAAS-EPIC-001
**Priority:** High
**Story Points:** 8
**Sprint:** TBD

### ðŸ"– User Story

**As a** Family Council Member,
**I want to** complete Step 8 of the constitution wizard and generate my family's constitution document,
**so that** I have a comprehensive governance framework to guide family decisions.

### ðŸŽ¯ Business Context

Step 8 is the final step: reviews all previous inputs, generates 12-section constitution document, and marks onboarding complete. Critical milestone for user activation and platform value demonstration.

### âœ… Acceptance Criteria

1. **Given** I complete Steps 1-7 and reach Step 8,
   **When** the step loads,
   **Then** I see a "What`s next window" and a "Go to dashboard" button.

**Additional Criteria:**
- [ ] Progress bar shows 8/8 (100%)
- [ ] Summary displays: Family name, member count, workshop formats selected, key governance decisions
- [ ] Constitution document includes 12 sections: Preamble, Values & Mission, Governance Structure, Decision Making, Conflict Resolution, Voting Rules, Wealth Management, Philanthropy, Succession, Education, Family Business, Amendment Process
- [ ] Success modal with confetti animation (celebration UX)
- [ ] Constitution document downloadable as PDF (future: not in this story)

### ðŸ" Design & UX

**Mockups/Wireframes:**
- Figma: https://www.figma.com/design/NWeSLJWw6iPinNILwPbsfv/-ReFamily--Web-Platofrm?node-id=3690-229557

**User Flow:**
1. User completes Step 7, clicks "Next"
2. Step 8 loads with "What's next" window
3. User clicks "Go to dashboard" button
4. Wizard closes, user redirected to dashboard page

**Summary Content:**
- Family Name: [User input from Step 1]
- Family Members: [Count of invited members]
- Workshop Format: [Selected format from Steps 4-7]
- Key Values: [From Step 5]
- Decision-Making Process: [From Step 6]

### ðŸ"' Business Rules

**Validation Rules:**
1. **Prerequisites:** All Steps 1-7 must be completed before Step 8 is accessible
2. **Constitution Generation:** Requires all step data (validated by backend)
3. **12 Sections Required:** Constitution must include all mandatory sections

**Authorization:**
- **Who can generate:** Family Administrator OR Family Council

