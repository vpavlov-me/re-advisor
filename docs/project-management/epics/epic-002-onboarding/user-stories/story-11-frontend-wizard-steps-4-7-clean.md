STORY 11: Frontend - Constitution Wizard UI (Steps 4-7, Workshop Selection)

**Issue Type:** Story
**Project:** RLN1
**Summary:** As a Family Council Member, I want to select workshop formats for Steps 4-7, so that I choose how to facilitate governance workshops (advisor/AI/manual)
**Epic Link:** SAAS-EPIC-001
**Priority:** High
**Story Points:** 8
**Sprint:** TBD

### ðŸ"– User Story

**As a** Family Council Member,
**I want to** select workshop formats (advisor-led, AI-assisted, or manual) for each governance topic in Steps 4-7,
**so that** I can choose facilitation methods that match my budget and preferences.

### ðŸŽ¯ Business Context

Steps 4-7 are the core governance workshops covering: Assessment, Values/Mission/Vision, Decision Making/Conflict Resolution, and Succession/Development. Workshop format selection determines user experience and cost. Administrator/Council controls this critical decision.

### âœ… Acceptance Criteria

1. **Given** I am a Family Administrator or Council member on Step 4,
   **When** the step loads,
   **Then** I see 3 workshop format options: Advisor-Led, AI-Assisted, Manual, with descriptions and selection buttons.

2. **Given** I select "Advisor-Led" format,
   **When** I click "Open workflow" (it opens workflow, after workflow is finished, advances to Step 5) or "Next step" (in case I do not want to do it now),
   **Then** system saves selection via API, advances to Step 5.

3. **Given** I am a regular Family Member (not Administrator/Council),
   **When** I view Steps 4-7,
   **Then** I see the workshop format already selected by Administrator/Council, with read-only view and acceptance message "Your family leadership has selected [format]. Click Accept to continue."

4. **Given** I am a Family Member on Step 4,
   **When** I click "Open workflow", after workflow is finished, advances to Step 5
   **Then** my acceptance is recorded, wizard advances to Step 5.

**Additional Criteria:**
- [ ] Steps 4-7 each have workshop format selection
- [ ] Format options: Workshop with an Advisor (description: "Professional expert helps identify key risks and growth points"), Workshop with an AI (description: "AI assistant guides the process"), Let AI do this step (description: "AI asks questions and analyses your answers to complete workshop"), I`ll do it manually (description: "You answer questions and set priorities")
- [ ] Backend authorization enforced: Only Administrator/Council can POST selection
- [ ] Progress bar shows 4/8, 5/8, 6/8, 7/8
- [ ] Family Members see read-only view with "Open workflow" button

### ðŸ" Design & UX

**Mockups/Wireframes:**
- Figma: https://www.figma.com/design/NWeSLJWw6iPinNILwPbsfv/-ReFamily--Web-Platofrm?node-id=3690-229557

**User Flow (Administrator/Council):**
1. Step 4 loads with 4 format options
2. Administrator reads descriptions, selects "Workshop with an AI" (it opens workflow, after workflow is finished, advances to Step 5)
3. Clicks "Next step", selection saved, Step 5 loads
4. Repeat for Steps 5-7

**User Flow (Family Member):**
1. Step 4 loads with read-only view showing "Workshop with an AI" format
2. Family Member reads description, clicks "Open workflow" (it opens workflow, after workflow is finished, advances to Step 5)
3. Wizard advances to Step 5

**Workshop Format Options:**
- **Workshop with an Advisor:** "Professional expert helps identify key risks and growth points" 
- **Workshop with an AI:** "AI assistant guides the process"
- **Let AI do this step:** "AI asks questions and analyses your answers to complete workshop"
- **I`ll do it manually:** "You answer questions and set priorities"

### ðŸ"' Business Rules

**Validation Rules:**
1. **Authorization:** Only Family Administrator OR Family Council can select workshop format
2. **Family Members:** Can only "Open workflow" format selected by leadership
3. **Selection scope:** Workshop format is family-level (family_id), not per user
4. **Backend enforcement:** POST `/constitution/workshop-selection` validates JWT token for admin/council role

**Authorization:**
- **Who can select format:** Family Administrator OR Family Council
- **Who can view format:** All family members

**Edge Cases:**
- **Family Member attempts to change format via UI manipulation:** Backend returns 403 Forbidden
- **Administrator changes format after Family Member accepted:** Family Member sees updated format, must re-accept
- **Multiple Council members select different formats concurrently:** Last write wins (no conflict resolution, future: optimistic locking)

### ðŸ§ª Test Scenarios

**Happy Path (Administrator):**
1. Step 4 loads → Administrator selects "Workshop with an Advisor" → Clicks "Open workflow" (it opens workflow, after workflow is finished, advances to Step 5)
 → Clicks "Next" → Selection saved, Step 5 loads

**Happy Path (Family Member):**
1. Step 4 loads → Family Member sees "Workshop with an AI" (read-only) → Clicks "Open workflow" (it opens workflow, after workflow is finished, advances to Step 5) → Step 5 loads

**Negative Tests:**
1. **Unauthorized selection:** Family Member opens browser dev tools, attempts to POST workshop selection → Backend returns 403 Forbidden, UI shows error
2. **No selection made:** Administrator clicks "Next step" without selecting format → No error

**Edge Cases:**
1. **Administrator changes format mid-setup:** Family Member on Step 5 sees updated format, must revisit and re-accept
2. **Multiple browser sessions:** Administrator selects "Workshop with an Advisor" in Browser A, then "Workshop with an AI" in Browser B → Last write wins, both browsers sync to "Workshop with an AI"

### ðŸ"— Dependencies

**Story Dependencies:**
- **Blocked by:** RLN1-012 (Steps 1-3 must be implemented first), RLN2-009 (Backend workshop selection authorization API)
- **Blocks:** RLN1-014 (Step 8 constitution generation depends on workshop selections)

### âš ï¸ Non-Functional Requirements

**Performance:**
- Step load with format options: < 200ms
- API call (save workshop selection): < 100ms

**Security:**
- âœ… CRITICAL: Backend authorization enforced on POST endpoint
- âœ… Frontend UI hiding NOT sufficient; backend validates JWT token

**Accessibility:**
- WCAG level: AA
- Keyboard navigation: Tab through format options, Enter to select
- Screen reader: Announce format descriptions and selection state

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions

### ðŸ" Notes

---
