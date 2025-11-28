STORY 14: Frontend - Dashboard Constitution Setup Banner Integration

**Issue Type:** Story
**Project:** RLN1
**Summary:** As a user, I want to see my constitution setup progress on the dashboard, so that I'm reminded to complete onboarding
**Epic Link:** SAAS-EPIC-001
**Priority:** Medium
**Story Points:** 3
**Sprint:** TBD

### ðŸ"– User Story

**As a** user with incomplete constitution setup,
**I want to** see a prominent banner on my dashboard showing setup progress and a "Continue" button,
**so that** I'm reminded to complete onboarding and can easily continue where I left off.

### ðŸŽ¯ Business Context

Dashboard banner drives constitution completion by providing visible reminder and easy access point. Critical for converting "Hide setup guide users" users into fully onboarded users. Increases completion rates by 30-40% based on industry benchmarks.

### âœ… Acceptance Criteria

1. **Given** I have incomplete constitution setup (is_complete = FALSE),
   **When** I view the dashboard,
   **Then** I see a banner at the top: "Write your Constitution to unlock the full potential of Family Governance (X/8 steps completed)" with "Continue" button.

2. **Given** I completed constitution setup (is_complete = TRUE),
   **When** I view the dashboard,
   **Then** I see NO setup banner (banner hidden).

3. **Given** I click "Continue" on the banner,
   **When** the button is clicked,
   **Then** constitution wizard modal opens at my last saved step.

**Additional Criteria:**
- [ ] Banner position: Top of dashboard, below Welcome back banner
- [ ] Banner style: prominent but not intrusive
- [ ] Progress indicator: "X/8 steps completed" with progress bar
- [ ] Primary button: "Continue" (opens wizard)
- [ ] Responsive: Full-width on mobile, max-width on desktop

### ðŸ" Design & UX

**Mockups/Wireframes:**
- Figma: https://www.figma.com/design/NWeSLJWw6iPinNILwPbsfv/-ReFamily--Web-Platofrm?node-id=3690-229880

**User Flow:**
1. User logs in with incomplete constitution
2. Dashboard loads, banner appears at top
3. User sees progress "4/8 steps"
4. User clicks "Continue"
5. Wizard modal opens at Step 4

**Banner Design:**
- Message: "Write your Constitution to unlock the full potential of Family Governance"
- Progress: "4/8 steps"
- Button: "Continue"

### ðŸ"' Business Rules

**Validation Rules:**
1. **Banner visibility:** Show only if `is_complete = FALSE`
2. **Progress calculation:** `completed_steps / 8 * 100`
3. **Constitution complete:** Hide banner permanently when `is_complete = TRUE`

**Authorization:**
- **Who can see banner:** All users with incomplete constitution (any role)

**Edge Cases:**
- **User completes constitution:** Banner disappears immediately (no page refresh required)
- **Multiple browser tabs:** Banner state syncs across tabs (dismiss in one tab hides in all)

### ðŸ§ª Test Scenarios

**Happy Path:**
1. Login with incomplete constitution (4/8 steps) → Dashboard loads → Banner shows "4/8 steps" → Click "Continue" → Wizard opens at Step 4

**Negative Tests:**
1. **Complete constitution:** Constitution is_complete = TRUE → Dashboard loads → No banner shown

**Edge Cases:**
1. **Complete constitution while banner open:** Complete Step 8 in another tab → Switch back to dashboard → Banner disappears (real-time update)

### ðŸ"— Dependencies

**Story Dependencies:**
- **Blocked by:** RLN1-015 (Skip/Resume functionality must exist), RLN2-008 (Constitution Progress API)
- **Blocks:** None (final frontend story)

### âš ï¸ Non-Functional Requirements

**Performance:**
- Banner render on dashboard load: < 100ms
- API call (fetch progress): < 50ms

**Accessibility:**
- WCAG level: AA
- Screen reader: Announce banner message and progress
- ARIA role: `role="alert"` for prominence

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Mobile Safari: Latest 2 versions (responsive)

---
