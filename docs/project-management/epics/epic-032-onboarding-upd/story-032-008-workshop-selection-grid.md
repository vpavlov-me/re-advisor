## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Family Administrator, I want to see all 4 workshops simultaneously with progress tracking
**Epic Link:** FG-EPIC-002-V2-onboarding-upd [Onboarding Flow v2.0 - Registration Restructure & Enhanced Setup Wizard]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Family Administrator who selected Workshops method,
**I want to** see all 4 workshop options displayed simultaneously in a grid with progress badges,
**so that** I can understand the full workshop journey and choose which workshops to complete (or continue).

**Example:**
- **As a** Family Administrator,
- **I want to** view all 4 workshop cards (Assessment, Values/Mission/Vision, Decision Making, Succession) at once with their timing and current progress,
- **so that** I can decide which workshop to start or continue based on my family's priorities and available time.

---

## 🎯 Business Context

**Why is this Story important?**

The redesigned workshop selection addresses critical v1 UX issues:
- **User pain point:** v1 showed workshops step-by-step (Steps 4-7), users couldn't see full picture upfront
- **Business outcome:** Increased workshop completion rates (target 70% engagement) by showing full journey
- **Strategic alignment:** Transparent workflow increases user confidence and reduces abandonment

Data shows: Showing full journey upfront increases task completion by 40% compared to step-by-step revelation.

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** I selected "Workshops" method in Step 3,
   **When** I advance to Step 4,
   **Then** I see "Workshop Selection" with all 4 workshop cards displayed simultaneously in a grid layout.

2. **Given** I'm viewing the workshop grid,
   **When** the screen loads,
   **Then** I see 4 workshop cards with titles, duration, progress badges (if started), and dual action buttons.

3. **Given** I view the Assessment workshop card,
   **When** I read the content,
   **Then** I see "Assessment" title, "60 minutes" duration, progress badge (e.g., "72% complete" if started), and action buttons: "Continue"/"Start with Advisor" and "Restart"/"Start with AI".

4. **Given** I view the Values, Mission & Vision workshop card,
   **When** I read the content,
   **Then** I see "Values, Mission & Vision" title, "120 minutes" duration, progress badge (e.g., "55%" if started), and dual action buttons.

5. **Given** I view the Decision-Making & Conflict Management workshop card,
   **When** I read the content,
   **Then** I see title, "180 minutes" duration, progress badge (if started), and dual action buttons.

6. **Given** I view the Succession & Development workshop card,
   **When** I read the content,
   **Then** I see title, "180 minutes" duration, progress badge (if started), and dual action buttons.

7. **Given** I select any workshop method (Advisor or AI),
   **When** I click the corresponding button,
   **Then** I'm redirected to that workshop's workflow with my selection saved.

**Additional Criteria:**
- [ ] All 4 workshops visible simultaneously (not step-by-step)
- [ ] Progress badges show completion percentage if workshop started
- [ ] Each workshop independently selectable (can do Assessment with Advisor, Values with AI)
- [ ] "Restart" button resets workshop progress to 0% with confirmation
- [ ] Grid layout responsive: 2x2 on desktop, stacked on mobile
- [ ] Alternative flow: Large survey screen for "AI Generated" method
- [ ] Alternative flow: Redirect to Constitution editor for "Manual" method

---

## 🔒 Business Rules

**Validation Rules:**
1. **Workshop Cards Structure:**
   - **Workshop 1: Assessment**
     - Duration: 60 minutes
     - Progress badge: Shows 0-100% completion if started
     - Actions: "Continue"/"Start with Advisor" (primary), "Restart"/"Start with AI" (secondary)

   - **Workshop 2: Values, Mission & Vision**
     - Duration: 120 minutes
     - Progress badge: Shows 0-100% completion if started
     - Actions: "Continue"/"Start with Advisor" (primary), "Restart"/"Start with AI" (secondary)

   - **Workshop 3: Decision-Making & Conflict Management**
     - Duration: 180 minutes
     - Progress badge: Shows 0-100% completion if started
     - Actions: "Continue"/"Start with Advisor" (primary), "Restart"/"Start with AI" (secondary)

   - **Workshop 4: Succession & Development**
     - Duration: 180 minutes
     - Progress badge: Shows 0-100% completion if started
     - Actions: "Continue"/"Start with Advisor" (primary), "Restart"/"Start with AI" (secondary)

2. **Progress Calculation:**
   - Each workshop tracks progress independently (0-100%)
   - Progress badge appears only if workshop progress > 0%
   - Progress stored per workshop per family in `workshop_progress` table
   - Formula: `progress = (completed_questions / total_questions) * 100`

3. **Button States:**
   - **NOT_STARTED:** Show "Start with Advisor" (primary), "Start with AI" (secondary)
   - **IN_PROGRESS:** Show "Continue" (primary), "Restart" (secondary)
   - **COMPLETED:** Show "Continue" (primary, for review), "Restart" (secondary)

4. **Authorization:**
   - Only Admin/Council can initiate or restart workshops
   - Family Members can view workshop progress (read-only)

**Authorization:**
- **Who can perform this action:** Family Administrator, Family Council Member
- **Who can view results:** All family members (read-only for Family Member role)

**Edge Cases:**
- **Click "Restart" on 72% complete workshop:** Show confirmation "This will reset all progress for Assessment workshop. Continue? [Yes] [Cancel]"
- **Multiple admins selecting different workshops simultaneously:** Allow parallel workshop progress (each workshop independent)
- **User closes browser mid-workshop:** Progress auto-saved at each question, resume on return
- **Workshop service error (AI unavailable):** Show error "AI service temporarily unavailable. Try Advisor method."
- **All 4 workshops completed:** Show success banner "All workshops complete! Proceed to finalization."

---

## 📐 Design & UX

**Mockups/Wireframes:**
- Figma: https://www.figma.com/design/NWeSLJWw6iPinNILwPbsfv/-ReFamily--Web-Platofrm?node-id=4226-22240&t=UgPYb2pfH4R5d3VR-4
- Onboarding Step 04: Workshop Selection (Alternative screens showing all 4 workshops)

**User Flow:**
1. User selects "Workshops" in Step 3 → advances to Step 4
2. **Step 4 Screen:**
   - Wizard modal: "Step 4 of 8: Workshop Selection"
   - Progress bar: 13%
   - **Workshop Grid (2x2 layout on desktop):**
     - **Card 1: Assessment**
       - Icon (assessment icon)
       - "Assessment" heading
       - "60 min" subheading
       - Progress badge: "72% complete" (blue circular badge, top-right corner)
       - Description: Brief 1-line description
       - "Continue" button (primary blue, full width)
       - "Restart" button (secondary gray, full width)
     - **Card 2: Values, Mission & Vision**
       - Similar structure
       - Progress badge: "55% complete"
       - "Continue" / "Restart" buttons
     - **Card 3: Decision-Making & Conflict Management**
       - Similar structure
       - No progress badge (not started)
       - "Start with Advisor" / "Start with AI" buttons
     - **Card 4: Succession & Development**
       - Similar structure
       - No progress badge
       - "Start with Advisor" / "Start with AI" buttons
   - **Navigation:**
     - "Back" button (returns to Step 3)
     - "Skip for now" link (Admin only, proceeds to Step 8)
3. User clicks "Continue" on Assessment workshop → redirects to Assessment workshop questions
4. User clicks "Start with AI" on Decision-Making → redirects to AI-generated workshop flow

**Design Specifications:**
- **Grid Layout:** 2x2 on desktop (>1024px), 2x1 on tablet (768-1024px), 1x4 on mobile (<768px)
- **Workshop Cards:** 400px width (desktop), equal height, white background, subtle shadow
- **Progress Badge:** Circular badge, blue background, white text, positioned top-right corner of card
- **Icons:** 48px, workshop-specific icons (assessment=clipboard, values=heart, decision=scales, succession=tree)
- **Duration Text:** Gray, smaller font (14px), below heading
- **Action Buttons:** Full width within card, 8px vertical spacing, primary button on top
- **Hover State:** Card shadow increases, slight scale (1.02x)

---

## 🧪 Test Scenarios

**Happy Path:**
1. Select "Workshops" in Step 3 → advance to Step 4 (Workshop Selection)
2. Verify all 4 workshop cards displayed in 2x2 grid
3. Verify Assessment card shows "72% complete" progress badge
4. Verify Values card shows "55% complete" progress badge
5. Verify Decision-Making and Succession cards show no progress badges (not started)
6. Click "Continue" on Assessment → verify redirect to Assessment workshop questions at 72% progress
7. Click "Start with AI" on Decision-Making → verify redirect to AI-generated workshop flow

**Negative Tests:**
1. **Family Member role tries to click "Start":** Verify button disabled with tooltip "Admin access required"
2. **Network error during workshop selection:** Verify error message "Failed to load workshop data. Please refresh."
3. **Click "Restart" on 72% Assessment workshop:** Verify confirmation dialog appears
4. **Cancel "Restart" confirmation:** Verify progress remains at 72%, no changes
5. **Confirm "Restart":** Verify progress resets to 0%, button changes to "Start with Advisor"/"Start with AI"

**Edge Cases:**
1. **All 4 workshops at 100% complete:** Verify success banner "All workshops complete!" and "Proceed to Finalization" button
2. **Multiple admins working on different workshops:** Admin A does Assessment, Admin B does Values → verify both progress independently tracked
3. **User on mobile (375px width):** Verify cards stack vertically (1x4), remain fully functional
4. **Workshop progress at exactly 50%:** Verify progress badge shows "50% complete"
5. **Browser back button from workshop questions:** Return to Step 4 → verify progress updated correctly
6. **AI service unavailable:** Click "Start with AI" → verify error "AI service unavailable. Try Advisor method or try again later."

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** FG-002-007 (Constitution Setup - must select Workshops method first)
- **Blocks:** None (final workshop step, leads to finalization Step 8)

**Technical Dependencies:**
- Backend API:
  - `GET /onboarding/workshops/all/:family_id` (get all workshop progress)
  - `PUT /onboarding/workshops/progress` (update workshop progress)
  - `POST /onboarding/workshops/reset/:workshop_id` (restart workshop)
  - `GET /onboarding/workshops/:workshop_id/questions` (get workshop questions)
- Database table: `workshop_progress` (family_id, workshop_id, method, progress_percentage, completed_questions, total_questions)
- Workshop service integration (Advisor/AI workshop flows)

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Workshop grid load time: < 2 seconds
- Progress badge calculation: < 100ms
- Workshop selection save: < 500ms

**Security:**
- Authorization check: Verify Admin/Council role before allowing workshop start/restart
- Workshop progress data encrypted at rest
- HTTPS required for all API calls

**Browser Support:**
- Chrome: 90+
- Safari: 14+
- Firefox: 88+
- Edge: 90+

**Accessibility:**
- WCAG 2.1 Level AA compliance
- Workshop cards keyboard navigable (Tab to card, Enter to select)
- Screen readers announce workshop titles, durations, progress percentages
- Progress badges have aria-label="72 percent complete"
- High contrast mode support

**Other:**
- Analytics tracking: Workshop selection distribution, completion rates per workshop, Advisor vs. AI preference
- A/B testing: Grid layout vs. step-by-step (v1) on completion rates
- Logging: All workshop selections, restarts, completions logged
- SLA: 99.5% uptime for workshop service

---

## 📝 Notes

**Technical Implementation:**
- Load all 4 workshop progress states in single API call (batch fetch for performance)
- Use React Context or Redux to share workshop progress across components
- Implement optimistic UI updates: Show loading state, then update progress badge
- Cache workshop progress (5-minute TTL) to reduce API calls

**Progress Badge Calculation:**
```javascript
const progressPercentage = Math.round(
  (completedQuestions / totalQuestions) * 100
);

// Display logic:
if (progressPercentage === 0) {
  // Don't show progress badge
} else if (progressPercentage === 100) {
  // Show "Completed" badge (green)
} else {
  // Show "{progressPercentage}% complete" badge (blue)
}
```

**Workshop Durations:**
- Assessment: 60 min (shortest, recommended first)
- Values, Mission & Vision: 120 min
- Decision-Making & Conflict: 180 min
- Succession & Development: 180 min
- **Total:** 540 min (9 hours) if all workshops completed

**Restart Confirmation Dialog:**
```
⚠️ Restart Assessment Workshop?

You are currently at 72% completion.
Restarting will reset all progress to 0%.

This action cannot be undone.

[Cancel] [Restart Workshop]
```

**Alternative Flows:**
1. **AI Generated Method:** Instead of Step 4, show large survey screen (alternative flow)
2. **Manual Method:** Redirect directly to Constitution editor (bypass Step 4)

**Migration Considerations:**
- Existing v1 families on Steps 4-7 (individual workshops): Consolidate progress into Step 4 grid view
- v1 workshop progress: Migrate to new `workshop_progress` table with percentage calculations
- Feature flag: Gradually roll out grid view (A/B test step-by-step vs. grid)

**Open Questions:**
- Should workshop order be enforced (complete Assessment before Values)?
- Do we need workshop preview/sample questions before starting?
- Should we recommend workshop order (e.g., "Start with Assessment")?
- Do we need workshop time estimates based on family size (larger families = longer workshops)?

**Assumptions:**
- Users prefer seeing full workshop journey upfront (all 4 workshops)
- Independent workshop selection increases flexibility and completion rates
- Progress badges motivate users to complete partial workshops
- Most families will complete 2-3 workshops (not all 4)
- Average completion order: Assessment → Values → Decision-Making → Succession

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-30
