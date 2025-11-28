## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Family Member, I want to see expanded progress on dashboard banner
**Epic Link:** FG-EPIC-002-V2-onboarding-upd [Onboarding Flow v2.0 - Registration Restructure & Enhanced Setup Wizard]
**Priority:** Medium
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Family Member using the platform,
**I want to** see an expandable dashboard progress banner showing all 8 onboarding steps,
**so that** I know exactly where we are in the onboarding process and what steps remain.

**Example:**
- **As a** Family Council Member,
- **I want to** expand the onboarding banner on my dashboard to see visual cards for all 8 steps (User Profile → Invite Family → Constitution → Workshops → Finalization),
- **so that** I can track our family's onboarding progress and understand which steps are complete and which are locked.

---

## 🎯 Business Context

**Why is this Story important?**

The expanded dashboard banner addresses critical visibility issues in v1:
- **User pain point:** v1 banner showed only current step and percentage, users couldn't see full onboarding journey
- **Business outcome:** Increased onboarding completion rates (target 65% full completion) by providing clear visibility
- **Strategic alignment:** Transparent progress tracking motivates users and reduces abandonment

Research shows: Visual progress indicators with step breakdowns increase task completion by 35%.

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** I have an active onboarding in progress,
   **When** I view my dashboard,
   **Then** I see an onboarding progress banner in collapsed state showing progress ring, CTA, and step count (e.g., "3/8 steps").

2. **Given** the banner is in collapsed state,
   **When** I click the expand icon/button,
   **Then** the banner expands to show all 8 step cards in a grid layout.

3. **Given** the banner is expanded,
   **When** I view the step cards,
   **Then** I see 8 cards with icons, titles, and status indicators (checkmark for completed, lock for locked/future steps).

4. **Given** the banner is expanded,
   **When** I view the 8 steps,
   **Then** I see: (1) User Profile, (2) Invite Family Members, (3) Why Constitution Matters, (4) Assessment, (5) Values/Mission/Vision, (6) Decision Making & Conflicts, (7) Succession & Development, (8) Constitution Finalization.

5. **Given** I have completed steps 1-3,
   **When** I view the expanded banner,
   **Then** I see checkmarks on steps 1-3, current step highlighted (step 4), and locks on steps 5-8.

6. **Given** the banner is expanded,
   **When** I click the "Continue" button,
   **Then** I'm redirected to my current onboarding step.

7. **Given** the banner is expanded,
   **When** I click the collapse toggle,
   **Then** the banner collapses back to compact view with my expansion state saved.

**Additional Criteria:**
- [ ] Banner shows on all main platform pages (dashboard, settings, family directory)
- [ ] Expansion state persists across sessions (stored per user)
- [ ] "Hide setup guide" option available (sets `banner_hidden = TRUE`)
- [ ] Progress ring shows percentage (0-100%) visually
- [ ] Step cards responsive: 4x2 grid on desktop, 2x4 on tablet, 1x8 on mobile
- [ ] Banner dismissible: Once hidden, shows small "Show setup guide" link in corner

---

## 🔒 Business Rules

**Validation Rules:**
1. **Banner Display Rules:**
   - Shows only if onboarding not completed (`onboarding_complete = FALSE`)
   - Hidden if user clicked "Hide setup guide" (`banner_hidden = TRUE`)
   - Appears on: Dashboard, Settings, Family Directory, Profile pages
   - Position: Top of page content, below main navigation

2. **Collapsed State Content:**
   - Progress ring: Circular progress indicator (0-100%)
   - Step count: "X/8 steps" text
   - CTA text: "Complete your family setup"
   - Expand icon: Chevron down icon
   - Hide link: "Hide setup guide" (small link, right side)

3. **Expanded State Content:**
   - All 8 step cards in grid layout
   - Each card shows:
     - Icon (step-specific: user icon, envelope icon, document icon, etc.)
     - Title (e.g., "User Profile", "Invite Family Members")
     - Status indicator:
       - **Completed:** Green checkmark icon
       - **Current:** Blue highlight border, no icon
       - **Locked:** Gray lock icon
   - "Continue" button (primary blue, bottom of banner)
   - Collapse toggle: Chevron up icon

4. **The 8 Steps:**
   - Step 1: User Profile (icon: user)
   - Step 2: Invite Family Members (icon: envelope/users)
   - Step 3: Why Constitution Matters (icon: document/lightbulb)
   - Step 4: Assessment (icon: clipboard)
   - Step 5: Values, Mission & Vision (icon: heart/star)
   - Step 6: Decision Making & Conflicts (icon: scales)
   - Step 7: Succession & Development (icon: tree/arrow-up)
   - Step 8: Constitution Finalization (icon: check-circle/trophy)

5. **Progress Calculation (Updated from Epic):**
   ```python
   step_weights = {
       1: 13,  # User Profile
       2: 13,  # Invite Family (doesn't increment %)
       3: 13,  # Constitution Setup
       4: 13,  # Workshop selection
       5: 13,  # Assessment workshop
       6: 13,  # Values/Mission/Vision workshop
       7: 13,  # Decision Making workshop
       8: 22   # Succession & Finalization
   }
   progress_percentage = sum(step_weights[s] for s in completed_steps)
   ```

**Authorization:**
- **Who can perform this action:** All family members (view banner)
- **Who can view results:** User themselves (banner state per user)

**Edge Cases:**
- **User completes all 8 steps:** Banner shows "Setup Complete!" message with "Go to Dashboard" button, auto-hides after 3 seconds
- **User hides banner:** Shows small "Show setup guide" link in top-right corner
- **User on mobile (<768px):** Expanded banner shows steps in single column (1x8), scrollable
- **Multiple family members at different steps:** Each sees their own progress (per user, not per family)
- **Browser back button from onboarding:** Returns to dashboard, banner updates with latest progress

---

## 📐 Design & UX

**Mockups/Wireframes:**
- Figma: https://www.figma.com/design/NWeSLJWw6iPinNILwPbsfv/-ReFamily--Web-Platofrm?node-id=3887-22524&t=UgPYb2pfH4R5d3VR-4
- Onboarding banner expanded design

**User Flow:**
1. User logs in → sees dashboard with collapsed onboarding banner at top
2. **Collapsed Banner:**
   - Left: Progress ring (blue, shows 38% filled)
   - Center: "Complete your family setup" text, "3/8 steps" subtext
   - Right: Chevron down icon, "Hide" link
3. User clicks chevron down → banner expands
4. **Expanded Banner:**
   - Title: "Setup Your Family Governance" (top)
   - **Step Cards Grid (4x2 on desktop):**
     - Row 1: Steps 1-4 cards
     - Row 2: Steps 5-8 cards
     - Each card: Icon (48px), Title, Status indicator
     - Example statuses:
       - Step 1: Green checkmark (completed)
       - Step 2: Green checkmark (completed)
       - Step 3: Green checkmark (completed)
       - Step 4: Blue border (current, no icon)
       - Steps 5-8: Gray lock icon (locked)
   - Bottom: "Continue" button (center), Chevron up icon (right)
5. User clicks "Continue" → redirects to Step 4 (current step)
6. User clicks chevron up → banner collapses, state saved

**Design Specifications:**
- **Collapsed Banner:** 80px height, light blue background, full width
- **Expanded Banner:** Auto height (fits content), white background, subtle shadow
- **Progress Ring:** 60px diameter, 6px stroke, blue fill, gray background
- **Step Cards:** 200px width, 120px height (desktop), white, border radius 8px
- **Step Icons:** 48px, centered at top of card, icon colors: blue (current), green (completed), gray (locked)
- **Status Indicators:**
  - Checkmark: 24px, green circle background, white check
  - Lock: 24px, gray icon, bottom-right corner
  - Current: No icon, blue 2px border around card
- **Grid Layout:**
  - Desktop (>1024px): 4x2 grid
  - Tablet (768-1024px): 2x4 grid
  - Mobile (<768px): 1x8 stacked

---

## 🧪 Test Scenarios

**Happy Path:**
1. Login with active onboarding (3/8 steps complete) → verify collapsed banner shows "3/8 steps" and 38% progress ring
2. Click expand icon → verify banner expands showing all 8 step cards
3. Verify steps 1-3 have green checkmarks, step 4 has blue border, steps 5-8 have gray locks
4. Click "Continue" button → verify redirect to Step 4 (current step)
5. Return to dashboard → verify banner remains expanded (state persisted)
6. Click collapse toggle → verify banner collapses and state saved

**Negative Tests:**
1. **User with onboarding complete:** Verify banner doesn't show (or shows "Setup Complete!" with auto-hide)
2. **User clicks "Hide setup guide":** Verify banner hidden, small "Show setup guide" link appears
3. **Network error loading progress:** Verify banner shows loading skeleton, then retry
4. **Invalid progress data (e.g., step 9):** Verify fallback to safe state (show all 8 steps, none marked complete)

**Edge Cases:**
1. **Click expand/collapse rapidly (5 times in 2 seconds):** Verify smooth transitions, no animation glitches
2. **Mobile portrait (375px width):** Verify steps stack vertically (1x8), scrollable within banner
3. **User on Step 8 (finalization):** Verify step 8 has blue border (current), steps 1-7 have checkmarks
4. **Browser back from Step 5 to dashboard:** Verify banner updates with latest progress (steps 1-4 complete)
5. **Click "Hide setup guide" → click "Show setup guide":** Verify banner reappears in collapsed state
6. **Two tabs open:** Update progress in Tab 1 → refresh Tab 2 → verify updated progress shown

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** FG-002-005, FG-002-006, FG-002-007, FG-002-008 (all onboarding steps must exist to display progress)
- **Blocks:** None (UI enhancement, doesn't block other features)

**Technical Dependencies:**
- Backend API:
  - `GET /dashboard/onboarding-progress/:user_id` (get step completion data)
  - `PUT /dashboard/banner-state/:user_id` (save expanded/collapsed state)
  - `PUT /dashboard/banner-hide/:user_id` (hide banner permanently)
- Database table: `user_preferences` (user_id, banner_expanded, banner_hidden)
- React Context/Redux for banner state management (expand/collapse)

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Banner load time: < 500ms
- Expand/collapse animation: 300ms smooth transition
- Progress data fetch: < 1 second

**Security:**
- No sensitive data in banner (only step completion status)
- User-specific progress (cannot see other users' progress)
- HTTPS for all API calls

**Browser Support:**
- Chrome: 90+
- Safari: 14+
- Firefox: 88+
- Edge: 90+

**Accessibility:**
- WCAG 2.1 Level AA compliance
- Expand/collapse buttons keyboard accessible (Tab + Enter)
- Screen readers announce step status ("Step 1: User Profile, Completed")
- Progress ring has aria-label="38 percent complete"
- High contrast mode support for step status indicators

**Other:**
- Analytics tracking: Banner expansion rate, "Continue" button clicks, "Hide" action rate
- A/B testing: Collapsed-only vs. expandable banner on completion rates
- Logging: Banner state changes, hide actions logged
- Banner state persists across devices (synced via user preferences)

---

## 📝 Notes

**Technical Implementation:**
- Use CSS transitions for smooth expand/collapse (max-height animation)
- Store banner state in backend user preferences (not just localStorage)
- Implement lazy loading: Fetch progress data only when expanding banner (optimize page load)
- Use React Context to share banner state across dashboard pages

**Progress Ring SVG Example:**
```javascript
<svg width="60" height="60">
  <circle
    cx="30"
    cy="30"
    r="27"
    stroke="#e0e0e0"
    strokeWidth="6"
    fill="none"
  />
  <circle
    cx="30"
    cy="30"
    r="27"
    stroke="#2196F3"
    strokeWidth="6"
    fill="none"
    strokeDasharray={`${progress * 1.7} 170`}
    strokeDashoffset="0"
    transform="rotate(-90 30 30)"
  />
</svg>
```

**Step Status Logic:**
```javascript
function getStepStatus(stepNumber, currentStep, completedSteps) {
  if (completedSteps.includes(stepNumber)) {
    return 'completed'; // Show green checkmark
  } else if (stepNumber === currentStep) {
    return 'current'; // Show blue border, no icon
  } else {
    return 'locked'; // Show gray lock icon
  }
}
```

**Banner State Management:**
- `banner_expanded`: Boolean, default FALSE (collapsed)
- `banner_hidden`: Boolean, default FALSE (visible)
- Persist to backend on change (debounced 500ms to reduce API calls)

**Hide/Show Flow:**
1. User clicks "Hide setup guide" → `banner_hidden = TRUE` → Banner disappears
2. Small link appears: "Show setup guide" (top-right corner, subtle)
3. User clicks "Show setup guide" → `banner_hidden = FALSE` → Banner reappears in collapsed state

**Migration Considerations:**
- Existing v1 users with onboarding in progress: Show banner with current progress
- v1 banner (simple progress bar): Replace with v2 expandable banner
- Feature flag: Gradually roll out expandable banner (A/B test v1 vs. v2)

**Open Questions:**
- Should clicking a completed step card allow users to review that step?
- Do we need progress percentage text (e.g., "38%") in addition to visual ring?
- Should banner show different content for Admin vs. Family Member roles?
- Do we need step descriptions in expanded view (e.g., "Create your personal profile")?

**Assumptions:**
- Users want high-level progress visibility on dashboard (not just when in onboarding)
- Expandable banner provides sufficient detail without overwhelming users
- Most users will expand banner at least once (target 60%)
- Users prefer visual step cards over list-based progress indicators

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-30
