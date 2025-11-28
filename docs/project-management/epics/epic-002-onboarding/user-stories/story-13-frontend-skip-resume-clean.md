STORY 13: Frontend - Skip Tour & Resume Setup Functionality

**Issue Type:** Story
**Project:** RLN1
**Summary:** As a user, I want to skip onboarding tour and resume it later, so that I can explore the platform at my own pace
**Epic Link:** SAAS-EPIC-001
**Priority:** Medium
**Story Points:** 5
**Sprint:** TBD

### ðŸ"– User Story

**As a** user (any role),
**I want to** skip the constitution setup wizard and resume it later from where I left off,
**so that** I can explore the platform without pressure and return when I'm ready.

### ðŸŽ¯ Business Context

Reduces completion pressure and abandonment by allowing users to pause onboarding. Critical for users who want to explore platform first before committing to full setup. Research shows "forced onboarding" increases bounce rates.

### âœ… Acceptance Criteria

1. **Given** I am in the constitution wizard at any step,
   **When** I click "Hide setup guide" button (top-right corner),
   **Then** wizard closes, progress is saved, and I see dashboard.

2. **Given** I skipped the tour at Step 4,
   **When** I view the dashboard,
   **Then** I see a prominent banner with "Continue" button.

3. **Given** I click "Continue" on the dashboard banner,
   **When** the wizard reopens,
   **Then** wizard starts at Step 4 (where I left off) with previously entered data pre-filled.

**Additional Criteria:**
- [ ] "Hide setup guide" button visible on all wizard steps
- [ ] Progress saved via API on "Hide setup guide" click: `tour_skipped = TRUE`, `last_viewed_step = X`
- [ ] Dashboard banner persists until constitution is complete (`is_complete = TRUE`)
- [ ] Banner shows progress: "X/8 steps completed"
- [ ] "Continue" button reopens wizard at saved step

### ðŸ" Design & UX

**Mockups/Wireframes:**
- Figma: https://www.figma.com/design/NWeSLJWw6iPinNILwPbsfv/-ReFamily--Web-Platofrm?node-id=3690-229880

**User Flow (Skip):**
1. User on Step 4 of wizard
2. Clicks "Hide setup guide" (top-right corner)
3. Wizard closes, dashboard loads with banner

**User Flow (Resume):**
1. User sees dashboard banner "Continue"
2. Clicks "Continue" button
3. Wizard reopens at Step 4 with data pre-filled

**Dashboard Banner Design:**
- Info icon + message: "Write your Constitution to unlock the full potential of Family Governance"
- Progress indicator: "4/8 steps completed"
- Primary button: "Continue"

### ðŸ"' Business Rules

**Validation Rules:**
1. **Skip confirmation:** Show confirmation modal to prevent accidental skips
2. **Progress persistence:** All step data saved, no data loss on skip
3. **Resume behavior:** Wizard reopens at `last_viewed_step`
4. **Banner visibility:** Show banner until `is_complete = TRUE`

**Authorization:**
- **Who can skip:** All users (any role)

### ðŸ§ª Test Scenarios

**Happy Path:**
1. Wizard at Step 4 → Click "Hide setup guide" → Dashboard loads with banner "4/8 steps completed" → Click "Continue" → Wizard reopens at Step 4

**Edge Cases:**
1. **Multiple skips:** Skip at Step 3 → Resume at Step 3 → Advance to Step 5 → Skip again → Resume at Step 5
2. **Cross-device resume:** Skip on desktop → Login on mobile → See banner → Click "Resume Setup" → Wizard opens at same step

### ðŸ"— Dependencies

**Story Dependencies:**
- **Blocked by:** RLN2-008 (Constitution Progress API for saving skip state)
- **Blocks:** RLN1-016 (Dashboard banner integration)

### âš ï¸ Non-Functional Requirements

**Performance:**
- Skip action (save progress): < 200ms
- Resume wizard load: < 300ms
- Banner render on dashboard: < 100ms

**Accessibility:**
- WCAG level: AA
- Keyboard navigation: Escape key to skip (after confirmation)
- Screen reader: Announce "Tour skipped, progress saved"

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Mobile Safari: Latest 2 versions (responsive banner)

---
