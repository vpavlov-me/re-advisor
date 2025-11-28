# User Story - Step Navigation from Onboarding Banner

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As a Consultant, I want to click any step on the banner to navigate to that registration page, so that I can jump directly to where I need to work  
**Epic Link:** FG-EPIC-XXX - Consultant Onboarding Flow  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant (marketplace advisor),  
**I want to** click any step on the onboarding banner to navigate to that registration page,  
**so that** I can jump directly to where I need to work without going through steps sequentially.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point being solved:**
- Consultants need flexibility to fill profile sections in any order (not forced linear flow)
- Need quick access to edit previously completed sections
- Avoid frustration of clicking "Next" multiple times to reach specific step
- Support non-linear workflows (e.g., consultant gets document → jumps to Credentials step)

**Business outcome expected:**
- Reduced onboarding abandonment (users can work in comfortable order)
- Faster profile completion (direct access saves time)
- Higher data quality (easy editing encourages updates)
- Better UX perception (platform feels intuitive and user-friendly)

**Strategic alignment:**
- Core to guided onboarding experience (Epic goal)
- Essential for consultant autonomy and satisfaction
- Foundation for profile editing after initial completion

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** Consultant is on Advisor Portal dashboard with onboarding banner visible,  
   **When** Consultant clicks "Basic Profile" step (Step 2),  
   **Then** Page navigates to `/profile/basic` and user sees Basic Profile form.

2. **Given** Consultant is on dashboard,  
   **When** Consultant clicks "Credentials" step (Step 3),  
   **Then** Page navigates to `/profile/credentials` and user sees education/interests form.

3. **Given** Consultant is on dashboard,  
   **When** Consultant clicks "Payments" step (Step 6) OR "KYC Verification" step (Step 7),  
   **Then** Both clicks navigate to `/payment-settings` page (same destination).

4. **Given** Consultant has progress < 100%,  
   **When** Consultant hovers over "Under Review" step (Step 8),  
   **Then** Step appears disabled (greyed out), cursor shows "not-allowed", no click action.

5. **Given** Consultant has progress = 100% and profile submitted,  
   **When** Consultant clicks "Under Review" step (Step 8),  
   **Then** Info modal opens on dashboard showing review status (no page navigation).

6. **Given** Consultant clicks any step (1-7),  
   **When** Page navigates to target form,  
   **Then** Banner remains visible on target page showing current step highlighted.

7. **Given** Consultant is on registration page (e.g., `/profile/basic`),  
   **When** Consultant clicks browser back OR dashboard link,  
   **Then** Returns to dashboard with banner showing correct progress state.

**Additional Criteria:**
- [ ] All steps 1-7 show hover effect (cursor: pointer, visual highlight)
- [ ] Step 8 shows hover effect only when progress = 100%
- [ ] Completed steps remain clickable (can edit anytime)
- [ ] Navigation preserves any unsaved form data warning (if applicable)
- [ ] Step numbers match visual design (1-8 sequential)

---

## 🔒 Business Rules

**Navigation Mapping:**

| Step # | Step Name | Destination URL | Notes |
|--------|-----------|----------------|-------|
| 1 | Account & Security | `/account-settings` | Always clickable |
| 2 | Basic Profile | `/profile/basic` | Always clickable |
| 3 | Credentials | `/profile/credentials` | Always clickable |
| 4 | Expertise Mapping | `/profile/expertise` | Always clickable |
| 5 | Services & Pricing | `/services` | Always clickable |
| 6 | Payments | `/payment-settings` | Always clickable |
| 7 | KYC Verification | `/payment-settings` | Same page as Step 6 |
| 8 | Under Review | Info modal (no navigation) | Conditional clickability |

**Step 8 Special Logic:**
```
IF onboarding_progress < 100%:
  - Step 8 disabled (visual: greyed out)
  - Cursor: not-allowed
  - Click: no action
  
IF onboarding_progress = 100%:
  - Step 8 enabled (visual: active)
  - Cursor: pointer
  - Click: Open info modal with review status
  - Modal content: "Profile Under Review" OR "Profile Approved" message
```

**Clickability Rules:**
- Steps 1-7: Always clickable, regardless of completion status
- Completed steps remain editable (consultant can update anytime)
- Step 8: Clickable only at 100% progress
- No enforcement of sequential completion (user can skip around)

**Authorization:**
- **Who can perform this action:** Logged-in Consultant only
- **Who can view banner:** Only Consultant (not visible to invited advisors)

**Edge Cases:**
- **Multiple clicks rapid-fire:** Debounce navigation (prevent double-routing)
- **Step 6 vs Step 7 click:** Both go to same page, no different behavior
- **Step 8 at exactly 100% but not submitted:** Modal shows "Ready to Submit" CTA
- **Incomplete form data:** Show browser warning if user navigates away with unsaved changes

---

## 🧪 Test Scenarios

**Happy Path:**

**TC1: Navigate to any Step 1-7**
1. Login as Consultant with incomplete profile (progress < 100%)
2. On dashboard, click each step 1-7 sequentially
3. Verify each click navigates to correct URL
4. Verify banner remains visible on each page
5. Verify correct step highlighted on each page
6. Return to dashboard after each navigation

**TC2: Steps 6 and 7 Same Destination**
1. On dashboard, click Step 6 (Payments)
2. Verify URL = `/payment-settings`
3. Navigate back to dashboard
4. Click Step 7 (KYC Verification)
5. Verify URL = `/payment-settings` (same as Step 6)
6. Verify both Step 6 and Step 7 show highlighted when on this page

**TC3: Step 8 at 100% Progress**
1. Complete profile to 100% (all steps done, not submitted)
2. On dashboard, click Step 8 (Under Review)
3. Verify info modal opens on dashboard (no page navigation)
4. Verify modal shows "Ready to Submit Profile" message
5. Close modal → remains on dashboard

**Negative Tests:**

**TC4: Step 8 Disabled Before 100%**
1. Login with profile at 60% progress
2. Hover over Step 8 → verify cursor = "not-allowed"
3. Click Step 8 → verify no navigation occurs
4. Verify no modal opens
5. Verify tooltip shows "Complete all steps to submit"

**TC5: Rapid Multiple Clicks**
1. On dashboard, rapidly click Step 2 five times in 1 second
2. Verify only ONE navigation occurs (debounced)
3. Verify page navigates to `/profile/basic` only once
4. No console errors or routing issues

**TC6: Navigation with Unsaved Changes**
1. Navigate to Step 2 (`/profile/basic`)
2. Edit form fields but don't save
3. Click Step 3 on banner
4. Verify browser shows "Leave page?" warning (if implemented)
5. Cancel → remains on Step 2
6. Confirm → navigates to Step 3, unsaved changes lost

**Edge Cases:**

**TC7: Completed Step Remains Clickable**
1. Complete Step 2 (Basic Profile) → green checkmark appears
2. Click Step 2 again → navigates to `/profile/basic`
3. Verify form shows saved data (editable)
4. Make changes, save
5. Return to dashboard → Step 2 remains completed

**TC8: Step 8 After Profile Submitted**
1. Submit profile for review (progress = 100%, status = 'submitted')
2. Click Step 8 → modal opens
3. Verify modal shows "Profile Under Review" status
4. Verify no Submit button (already submitted)
5. Modal shows estimated review timeline

**TC9: Browser Back Button After Navigation**
1. On dashboard, click Step 4
2. Navigate to `/profile/expertise`
3. Press browser back button
4. Verify returns to dashboard
5. Verify banner still displays with correct progress

---

## 📝 Notes

**Implementation Context:**
- All destination pages (Steps 1-7) already exist and are functional
- This story adds ONLY navigation logic from banner to pages
- Banner component implementation covered in separate story (FG-XXX)
- Progress calculation logic in separate story (FG-XXX)

**Step 8 Modal Content:**
- Modal design/content TBD in separate UX story
- This story covers ONLY click behavior (open modal vs disabled)
- Modal should include review status, timeline, contact support link

**Accessibility:**
- Disabled Step 8 should have `aria-disabled="true"`
- Clickable steps should have `role="button"` and `tabindex="0"`
- Keyboard navigation: Enter/Space triggers click
- Screen reader announces: "Step X: [Name], [Status]"

**Performance:**
- Debounce click events (300ms) to prevent double-navigation
- Use React Router for SPA navigation (no full page reload)
- Preserve scroll position when returning to dashboard

---

**Story Version:** 1.0.0  
**Last Updated:** 2025-11-26  
**Related Epic:** FG-EPIC-XXX - Consultant Onboarding Flow