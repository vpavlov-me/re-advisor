# User Story 5: Save Service as Draft

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Consultant, I want to save service as draft without activating
**Epic Link:** EPIC-006 - Advisor Service Catalog & Package Builder
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant,
**I want to** save service as draft without activating it to marketplace,
**so that** I can refine offerings, adjust pricing, perfect descriptions, gather feedback from colleagues, or wait for profile approval before publishing to families.

---

## 🎯 Business Context

**Why is this Story important?**

Draft functionality removes pressure to publish immediately and enables iterative refinement. Advisors may need time to finalize pricing strategy, get approval from business partners, or simply return later when less busy. Without drafts, advisors either rush publication or abandon partially completed services.

**User pain point being solved:**
- Advisors interrupted during service creation lose all progress
- Advisors unsure about pricing/description want to save and think before publishing
- New advisors waiting for profile approval can prepare services in advance
- Advisors want colleague feedback on service description before going live

**Business outcome expected:**
- Higher quality published services (more time for refinement)
- Reduced service creation abandonment rate
- Enable advisors to prepare services before profile approval (activation still gated)
- Improved advisor satisfaction with flexible creation process

**Strategic alignment:**
- Aligns with self-service advisor onboarding (work at your own pace)
- Reduces support burden (fewer "I lost my work" complaints)
- Enables advisory firms to review services before publication
- Creates pipeline of services ready to activate upon profile approval

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** advisor is creating new service and has completed at least service type and name (minimum required for draft),
   **When** advisor clicks "Save as Draft" button,
   **Then** system saves service with status = "Draft", displays confirmation "Service saved as draft. You can edit and activate it later.", and returns advisor to services dashboard.

2. **Given** advisor saves service as draft,
   **When** service is saved,
   **Then** system stores all entered data (partial or complete configuration) and assigns unique service ID for future reference.

3. **Given** advisor has saved service as draft,
   **When** advisor views services dashboard,
   **Then** draft service appears in "Drafts" section with visual indicators: "Draft" badge, service name, last edited timestamp, "Continue Editing" and "Delete" action buttons.

4. **Given** advisor clicks "Continue Editing" on draft service,
   **When** button is clicked,
   **Then** system opens service creation/edit form pre-populated with all previously saved data at step where advisor left off.

5. **Given** advisor continues editing draft service and completes all required fields,
   **When** advisor reaches preview step,
   **Then** system provides both "Save as Draft" (update existing draft) and "Activate Service" buttons (if profile approved).

6. **Given** advisor attempts to navigate away from service creation with unsaved changes,
   **When** advisor clicks browser back, closes tab, or navigates to different page,
   **Then** system displays browser confirmation dialog: "You have unsaved changes. Leave page?" to prevent accidental data loss.

7. **Given** advisor saves service as draft multiple times,
   **When** each save occurs,
   **Then** system updates existing draft (doesn't create duplicates) and updates "Last edited" timestamp on dashboard.

8. **Given** advisor has profile status = "Pending Review" and saves service as draft,
   **When** draft is saved,
   **Then** system allows draft creation but displays notice: "Your profile is pending approval. You can activate services once approved." on dashboard draft card.

**Additional Criteria:**
- [ ] Draft services never visible to families in marketplace (hidden until activated)
- [ ] Advisors can have unlimited draft services (no limit on drafts)
- [ ] Draft data retained indefinitely until advisor deletes or activates
- [ ] Auto-save functionality: System auto-saves form data every 60 seconds while advisor types (optional enhancement for extra safety)
- [ ] Draft list sortable by: Last edited (default), Service name alphabetically, Service type

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Figma: [Link to draft services dashboard section - to be added]
- Screenshot: [To be attached]

**User Flow:**
1. Advisor creating new "Mediation" service
2. Completes: Type (Mediation), Name ("Family Conflict Resolution"), Short description (75 chars)
3. Realizes needs to research competitive pricing before continuing
4. Clicks "Save as Draft" button (secondary style, next to "Continue")
5. System saves: service_id created, status = "Draft", data stored
6. Confirmation toast appears: "✓ Service saved as draft"
7. Redirects to services dashboard
8. Dashboard shows sections: "Active Services (2)", "Drafts (1)", "Inactive (0)"
9. In Drafts section, new card displays:
   - "Draft" badge (yellow/orange)
   - Service name: "Family Conflict Resolution"
   - Service type: "Mediation"
   - Last edited: "5 minutes ago"
   - Completion indicator: "60% complete" (optional)
   - Actions: [Continue Editing] [Delete] buttons
10. Two days later, advisor returns
11. Clicks "Continue Editing" on draft card
12. Form opens with all previous data intact
13. Advisor completes pricing, duration, previews
14. Satisfied → clicks "Activate Service" (profile approved) OR "Save as Draft" again
15. If activated: Moves from Drafts to Active Services section

**Key Design Principles:**
- **Always accessible**: "Save as Draft" button visible at every step of service creation
- **Clear status**: Draft badge and status clearly distinguishable from Active
- **Low pressure**: Secondary button style (not primary) - no pressure to activate immediately
- **Data preservation**: All data saved, even incomplete configurations
- **Resumption ease**: "Continue Editing" picks up exactly where advisor left off
- **Cleanup capability**: Easy to delete drafts no longer needed

---

## 🔐 Business Rules

**Validation Rules:**
1. **Minimum data for draft save**: Service type and service name required (bare minimum to identify draft)
2. **Incomplete drafts allowed**: System saves drafts even with required fields empty (except type and name)
3. **Duplicate drafts prevented**: Saving draft multiple times updates same draft record (by service_id)
4. **Draft visibility**: Draft services status = "Draft", hidden from marketplace, visible only in advisor dashboard
5. **Draft retention**: Draft services retained indefinitely until advisor deletes or activates
6. **No activation requirement**: Advisors never forced to activate drafts (can keep as drafts forever)
7. **Profile approval independence**: Draft creation allowed regardless of profile approval status (activation requires approval)

**Authorization:**
- **Who can perform this action:** Any logged-in advisor (no profile approval required for draft creation)
- **Who can view results:** Only advisor who created draft sees it in their dashboard

**Edge Cases:**
- **Advisor creates draft, never returns**: Draft persists indefinitely, takes minimal database space
- **Advisor creates 50 drafts**: System allows, dashboard paginated if needed (show 20 per page)
- **Advisor saves draft, logs out, logs in from different device**: Draft accessible from any device (cloud-stored)
- **Advisor's browser crashes mid-edit**: Last auto-save recovered if auto-save enabled, otherwise loses changes since last manual save
- **Advisor deletes draft accidentally**: No undo (add confirmation dialog "Delete draft? This cannot be undone.")
- **Two browser tabs editing same draft**: Last save wins (no conflict resolution in Phase 1)

---

## 🧪 Test Scenarios

**Happy Path:**
1. Advisor creating "Succession Planning Mentorship" service
2. Completes: Type (Mentorship), Name ("Next-Gen Leadership Development"), Short desc (80 chars)
3. Decides to pause and research pricing models
4. Clicks "Save as Draft"
5. Confirmation displays: "✓ Service saved as draft"
6. Returns to dashboard
7. Sees Drafts section (1) with new draft card showing service details and "Continue Editing" button
8. Three days later, advisor returns
9. Clicks "Continue Editing" on draft
10. Form opens with all previous data: Type, Name, Description intact
11. Continues from Step 4 (pricing configuration)
12. Completes pricing (Monthly Retainer $2,000, 6 month term), duration (1 hour sessions), previews
13. Clicks "Activate Service" (profile approved)
14. Service moves from Drafts to Active Services, appears in marketplace
15. Expected result: Seamless save/resume, no data loss, successful activation

**Negative Tests:**
1. **Attempt to save draft without service type**: System displays error "Service type required to save draft. Select type to continue."
2. **Attempt to save draft without service name**: System displays error "Service name required to save draft. Enter name to continue."
3. **Network error during save**: System displays error "Unable to save draft. Check connection and try again." Data remains in form for retry
4. **Browser crashes before save**: Data lost (expected without auto-save). On return, form is blank, advisor must start over

**Edge Cases:**
1. **Auto-save functionality (if implemented)**:
   - Advisor creating service, typing service name
   - After 60 seconds of inactivity, system auto-saves with notification: "Draft auto-saved"
   - Advisor closes browser without clicking Save
   - Returns later → form shows auto-saved data up to last auto-save point

2. **Draft list with 25 drafts**:
   - Dashboard Drafts section shows first 20 drafts
   - "Load more" button or pagination: "Showing 1-20 of 25"
   - Sorting dropdown: Last Edited (default), Name A-Z, Type
   - Advisor sorts by Name A-Z → list reorders alphabetically

3. **Advisor saves draft, profile gets rejected**:
   - Draft persists on dashboard
   - "Activate Service" button disabled with tooltip: "Complete profile approval to activate services"
   - "Continue Editing" still available

4. **Delete draft with confirmation**:
   - Advisor clicks "Delete" on draft card
   - Confirmation modal: "Delete draft 'Family Conflict Resolution'? This cannot be undone."
   - Options: [Cancel] [Delete Draft]
   - Advisor confirms deletion
   - Draft removed from dashboard, confirmation: "Draft deleted"

5. **Concurrent editing in two tabs**:
   - Advisor opens draft in Tab A, edits service name
   - Opens same draft in Tab B, edits pricing
   - Tab A saves first → name updated
   - Tab B saves second → overwrites name change, saves pricing
   - Result: Last save (Tab B) wins, Tab A changes lost (acceptable for Phase 1)

**Test Cases Location:** `Knowledge-Base/product-management/test-cases/EPIC-ADV-SERV-001-test-cases.md`

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** 
  - FG-STORY-ADV-SERV-001 (Create Service Offering) - needs service creation form and data model
- **Blocks:** 
  - FG-STORY-ADV-SERV-006 (Activate Services) - drafts must exist before activation
  - FG-STORY-ADV-SERV-008 (Edit Active Services) - draft editing informs active service editing

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Draft save time: < 1 second
- Dashboard load with 50 drafts: < 2 seconds
- Auto-save (if implemented): < 500ms, non-blocking (doesn't interrupt typing)
- Draft retrieval for editing: < 1 second to pre-populate form

**Security:**
- Authorization required: Yes (valid advisor JWT token)
- Data encryption: Standard HTTPS, draft data same security as active services
- Draft data isolation: Each advisor sees only their own drafts (strict family_id equivalent for advisors)

**Accessibility:**
- WCAG level: AA compliance
- Keyboard navigation: Tab to "Save as Draft" button, Enter to save
- Screen reader: Announces "Save as draft button" and confirmation "Service saved as draft"
- Focus management: After save, focus moves to confirmation message, then dashboard

**Browser Support:**
- Same as Story 1 (Chrome, Safari, Firefox, Edge latest 2 versions)
- Auto-save uses browser local storage for backup (if connection lost)

---

## 📝 Notes

**Questions:**
- [ ] Should we implement auto-save every 60 seconds? **Impact:** +2 days development **Recommendation:** Yes, huge UX improvement, low cost
- [ ] Do we need version history for drafts (show previous saved versions)? **Recommendation:** No for Phase 1, simple overwrite sufficient
- [ ] Should advisors receive email reminder "You have 3 draft services" after 30 days? **Recommendation:** Future enhancement, not MVP
- [ ] How long to retain drafts before auto-deletion (if ever)? **Decision:** Indefinite retention, no auto-deletion

---

**Template Version:** 1.0.0
**Story Created:** 2025-10-17