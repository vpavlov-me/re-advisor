## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Family Administrator, I want to see clear constitution setup methods with updated AI timing
**Epic Link:** FG-EPIC-002-V2-onboarding-upd [Onboarding Flow v2.0 - Registration Restructure & Enhanced Setup Wizard]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Family Administrator on Step 3 of onboarding,
**I want to** see clearly presented constitution setup methods (AI Generated, Workshops, Manual) with realistic timing (AI: 30 min, Workshops 60-180 min),
**so that** I can make an informed decision about which path to take for creating our family constitution.

**Example:**
- **As a** Family Administrator,
- **I want to** see three method cards showing AI Generated (30 min), Workshops (60-180 min), and Manual editing,
- **so that** I can choose the approach that best fits our family's timeline and preferences.

---

## 🎯 Business Context

**Why is this Story important?**

The redesigned Constitution Setup screen addresses critical v1 issues:
- **User pain point:** v1 showed unrealistic AI timing (16 min), causing user frustration when process took longer
- **Business outcome:** Improved user expectations and reduced support tickets (target 40% reduction in "AI too slow" complaints)
- **Strategic alignment:** Clear method presentation increases workshop adoption (target 25% increase) and reduces abandonment

Research shows: Accurate time estimates increase user satisfaction by 30% and reduce task abandonment by 20%.

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** I complete Step 2 (Invite Family Members),
   **When** I click "Continue",
   **Then** I advance to "Constitution Setup" with progress indicator showing 30%.

2. **Given** I'm on Step 3 (Constitution Setup),
   **When** the screen loads,
   **Then** I see educational section "Why Constitution matters?" followed by three method cards: AI Generated (30 min), Workshops (60-180 min), and Manual.

3. **Given** I view the AI Generated method card,
   **When** I read the content,
   **Then** I see robot icon, "30 minutes" timing (updated from 16 min), description, and the card is clickable for selection.

4. **Given** I view the Workshops method card,
   **When** I read the content,
   **Then** I see advisor icon, "60-180 minutes" timing, description, and the card is clickable for selection.

5. **Given** I view the Manual method card,
   **When** I read the content,
   **Then** I see pen icon, "Complete at own pace" timing, description, and the card is clickable for selection.

6. **Given** I click on any method card,
   **When** the card is selected,
   **Then** the card shows visual selection state (highlight/border) and "Next Step" button becomes enabled at the bottom of the screen.

7. **Given** I have selected a method,
   **When** I click the "Next Step" button,
   **Then** my selection is saved and I advance to the appropriate next step (Step 4 for Workshops, or respective workflow for AI/Manual).

**Additional Criteria:**
- [ ] Educational section "Why Constitution matters?" includes 2-3 bullet points on importance
- [ ] Each method card shows icon, title, timing, description and is clickable
- [ ] Selected card displays visual indication (border highlight, background color change)
- [ ] "Next Step" button is disabled until a method is selected
- [ ] "Next Step" button becomes enabled after method card selection
- [ ] Method selection stored per family (family_id)
- [ ] Authorization: Only Admin/Council can select method (Family Members see read-only view)

---

## 🔒 Business Rules

**Validation Rules:**
1. **Constitution Method Options:**
   - **AI Generated:**
     - Timing: 30 minutes (updated from v1's 16 minutes)
     - Icon: Robot icon
     - Description: "Quick AI-generated constitution based on your family's needs"
     - Selection: Click on card to select

   - **Workshops:**
     - Timing: 60-180 minutes (varies by workshop selection)
     - Icon: Advisor icon
     - Description: "Guided workshops to create comprehensive constitution"
     - Selection: Click on card to select

   - **Manual:**
     - Timing: "Complete at own pace"
     - Icon: Pen/edit icon
     - Description: "Create constitution manually with full editing control"
     - Selection: Click on card to select

2. **Method Selection Flow:**
   - Step 1: User clicks on one of the three method cards
   - Step 2: Card shows visual selection state (highlighted border, background color change)
   - Step 3: "Next Step" button at bottom of screen becomes enabled
   - Step 4: User clicks "Next Step" to proceed to selected method's workflow
   - One method can be selected at a time
   - User can change selection by clicking different card before clicking "Next Step"

3. **Method Selection Rules:**
   - One method active per family at a time
   - Can switch methods, but progress resets (show confirmation dialog)
   - Method selection persists across sessions

4. **Authorization Rules:**
   - **Admin/Council:** Can select and change methods
   - **Family Members:** Read-only view (see selected method but cannot change)
   - Method selection requires authenticated user with appropriate role

5. **Educational Content:**
   - "Why Constitution matters?" section always visible
   - 2-3 bullet points explaining constitution importance
   - Example bullets: "Establishes clear family values", "Provides decision-making framework", "Ensures smooth succession planning"

**Authorization:**
- **Who can perform this action:** Family Administrator, Family Council Member
- **Who can view results:** All family members (read-only for Family Member role)

---

## 📐 Design & UX

**Mockups/Wireframes:**
- Figma: https://www.figma.com/design/NWeSLJWw6iPinNILwPbsfv/-ReFamily--Web-Platofrm?node-id=3690-229654&t=UgPYb2pfH4R5d3VR-4
- Onboarding Step 03: Constitution Setup (Alternative screens)

**User Flow:**
1. User completes Step 2 (Invite Family) → advances to Step 3
2. **Step 3 Screen:**
   - Wizard modal: "Constitution Setup"
   - Progress bar: 30%
   - **Educational Section:**
     - Heading: "Why Constitution matters?"
     - 3 bullet points with icons
   - **Method Cards (3 cards in row):**
     - **Card 1: AI Generated**
       - Robot icon (top)
       - "AI Generated" heading
       - "30 minutes" subheading
       - Description text
       - **Clickable card** - entire card is interactive
       - Shows selection state when clicked (highlighted border)
     - **Card 2: Workshops**
       - Advisor icon
       - "Workshops" heading
       - "60-180 minutes" subheading
       - Description text
       - **Clickable card** - entire card is interactive
       - Shows selection state when clicked (highlighted border)
     - **Card 3: Manual**
       - Pen icon
       - "Manual" heading
       - "Complete at own pace" subheading
       - Description text
       - **Clickable card** - entire card is interactive
       - Shows selection state when clicked (highlighted border)
   - **Navigation:**
     - "Back" button (returns to Step 2)
     - **"Next Step" button** (disabled by default, becomes enabled after card selection)
3. User clicks on any method card → card shows visual selection (border highlight) → "Next Step" button becomes enabled
4. User can click different card to change selection (before clicking "Next Step")
5. User clicks **"Next Step"** button → method saved → advances to appropriate workflow:
   - AI method → AI survey screen
   - Workshops → Step 4 (Workshop Selection)
   - Manual → Constitution editor

**Design Specifications:**
- **Educational Section:** Light blue background box, 3 bullet points with checkmark icons
- **Method Cards:**
  - White cards with shadow, 300px width, equal height
  - Entire card is clickable (cursor: pointer)
  - Hover state: shadow increase, subtle background color change
  - Selected state: highlighted border (3px blue), background color change (light blue tint)
  - Unselected state: gray border (1px)
- **Icons:** 64px, centered at top of card, brand colors (blue robot, green advisor, gray pen)
- **Timing Text:** Bold, larger font (18px), primary color
- **Next Step Button:**
  - Located at bottom of screen (wizard navigation area)
  - Disabled state: gray background, cursor not-allowed
  - Enabled state: primary blue background, cursor pointer
  - Visible label: "Next Step"
- **Responsive:** Stack cards vertically on mobile (<768px)

---

## 🧪 Test Scenarios

**Happy Path:**
1. Complete Step 2 → advance to Step 3 (Constitution Setup)
2. Verify educational section "Why Constitution matters?" displays with 3 bullet points
3. Verify 3 method cards displayed with correct icons, timings, descriptions
4. Verify "Next Step" button is disabled by default
5. Click on "AI Generated" card → verify card shows selection state (highlighted border) → verify "Next Step" button becomes enabled
6. Click "Next Step" button → verify method saved → verify advance to AI survey screen
7. Return to Step 3 → verify previously selected method is remembered

**Negative Tests:**
1. **Try to click "Next Step" without selecting a method:** Verify button remains disabled, no navigation occurs
2. **Family Member role tries to select method:** Verify method cards are not clickable (disabled state with tooltip "Admin access required")
3. **Click "Next Step" twice rapidly:** Verify no duplicate method save (idempotency)
4. **Network error during method save (after clicking "Next Step"):** Verify error message "Failed to save selection. Please try again."
5. **Switch from AI (50% complete) to Workshops:** Select AI → click "Next Step" → return → select Workshops → verify confirmation dialog "Switching methods will reset AI progress. Continue? [Yes] [Cancel]"

**Edge Cases:**
1. **User selects AI card, then changes to Workshops card (before clicking "Next Step"):** Verify AI card deselects, Workshops card selects, "Next Step" remains enabled
2. **User clicks "Back" after selecting a card but before clicking "Next Step":** Verify return to Step 2, selection not saved
3. **User on Step 3 with AI method 70% complete (returning user):** Verify previously selected card shows selection state, "Next Step" is enabled
4. **Multiple admins:** Admin A selects AI and clicks "Next Step" → Admin B tries to select Workshops → verify error "Method already in progress. Contact [Admin A] to coordinate."
5. **AI timing verification:** After selecting AI and clicking "Next Step" → verify progress indicator shows "Estimated 30 minutes remaining"
6. **Mobile view (<768px):** Verify method cards stack vertically, selection states work correctly, "Next Step" button accessible

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** FG-002-006 (Family invitations - Step 2 must complete first)
- **Blocks:** FG-002-008 (Workshop selection grid - Step 4 follows if Workshops selected)

**Technical Dependencies:**
- Backend API:
  - `PUT /onboarding/constitution/method` (save method selection)
  - `GET /onboarding/constitution/status/:family_id` (get current method and progress)
  - `GET /onboarding/constitution/ai-estimate` (return 30 min timing)
  - `POST /onboarding/constitution/reset` (restart method)
- Database update: `constitution_progress` table (method field, AI timing update to 30 min)
- AI service integration (if AI method selected)
- Workshop service integration (if Workshops selected)

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Page load time: < 2 seconds
- Method selection save: < 500ms
- AI timing calculation: < 100ms

**Security:**
- Method selection authorization: Check user role (Admin/Council) before allowing selection
- Method changes logged for audit trail
- HTTPS required for all API calls

**Browser Support:**
- Chrome: 90+
- Safari: 14+
- Firefox: 88+
- Edge: 90+

**Accessibility:**
- WCAG 2.1 Level AA compliance
- Method cards keyboard navigable (Tab to card, Enter to select)
- Screen readers announce method timing and descriptions
- High contrast mode support for icons and text

**Other:**
- Analytics tracking: Method selection distribution (AI vs. Workshops vs. Manual)
- A/B testing: Compare 30 min vs. 16 min AI timing on user satisfaction
- Logging: All method selections, switches, and restarts logged

---

## 📝 Notes

**AI Timing Update Justification:**
- v1 showed 16 minutes, actual average: 28-32 minutes
- v2 shows 30 minutes (realistic estimate based on data)
- Reduces support tickets related to "AI taking too long"
- Sets accurate user expectations

**Educational Content Examples:**
```
Why Constitution matters?
✓ Establishes clear family values and mission
✓ Provides structured decision-making framework
✓ Ensures smooth succession and wealth transfer
```

**Method Selection State Machine:**
```
States:
- NOT_STARTED: Show "Start with [Method]" button
- IN_PROGRESS: Show "Continue" button (primary)
- COMPLETED: Show "Continue" (primary) + "Restart" (secondary)

Transitions:
- NOT_STARTED → IN_PROGRESS: User clicks "Start"
- IN_PROGRESS → COMPLETED: User finishes method workflow
- COMPLETED → IN_PROGRESS: User clicks "Restart" (after confirmation)
```

**Method Switching Confirmation Dialog:**
```
⚠️ Switch Constitution Method?

You currently have AI Generated method at 50% completion.
Switching to Workshops will reset all AI progress.

[Cancel] [Switch to Workshops]
```

**Migration Considerations:**
- Existing v1 families on Step 3: Update AI timing display to 30 min (no data migration needed)
- Existing families with completed constitutions: Show "Restart" option on all methods
- Feature flag: Gradually roll out redesigned Step 3 (A/B test v1 vs. v2 layouts)

**Open Questions:**
- Should we allow parallel method exploration (start AI and Workshops simultaneously)?
- Do we need method comparison table (AI vs. Workshops vs. Manual features)?
- Should we track actual AI generation time and display personalized estimates?
- Do we need "Preview" option to see sample constitution before selecting method?

**Assumptions:**
- Users want clear timing estimates before committing to a method
- 30-minute estimate for AI is accurate (based on current AI performance data)
- Users prefer visual method cards over dropdown/list selection
- Most families will choose Workshops (60%) > AI (30%) > Manual (10%)

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-30
