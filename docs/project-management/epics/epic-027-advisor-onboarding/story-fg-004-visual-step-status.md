# User Story: Visual Step Status Distinction

---

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Consultant, I want to see visual distinction between completed, current, and incomplete steps, so that I understand my progress at a glance
**Epic Link:** FG-EPIC-XXX [Consultant Onboarding Flow - Progress Tracking & Orchestration]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant registering on the platform,
**I want to** see clear visual distinction between completed, in-progress, and not-started steps on the onboarding banner,
**so that** I can instantly understand my registration progress and know which steps need attention.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point being solved:**
Without clear visual status indication, consultants waste time:
- Clicking through steps to check if they're complete
- Uncertainty about which step to work on next
- Confusion about overall progress status
- Not knowing which steps they've already started
- Revisiting already-completed sections unnecessarily

**Business outcome expected:**
- Reduced time-to-completion for consultant registration
- Lower abandonment rates (users see clear path forward)
- Fewer support inquiries about "what to do next"
- Improved user satisfaction with onboarding experience
- Better visibility into partially-completed steps

**Strategic alignment:**
Part of initiative to streamline consultant acquisition funnel and reduce friction in marketplace growth. Clear progress visibility is critical for self-service registration success.

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** consultant has not started a registration step (no draft exists on backend),
   **When** viewing the onboarding banner,
   **Then** that step displays with no visual icon (text only).

2. **Given** consultant has started a step but not completed all required fields (draft exists on backend),
   **When** viewing the onboarding banner,
   **Then** that step displays with yellow clock icon indicating "in progress".

3. **Given** consultant has completed all required fields in a step,
   **When** system validates the step completion,
   **Then** that step displays with green checkmark icon indicating "completed".

4. **Given** consultant saves at least one field in a step for the first time,
   **When** backend creates draft record,
   **Then** that step status changes from "not started" to "in progress" (yellow clock appears).

5. **Given** consultant completes the last required field in a step,
   **When** system validates all requirements are met,
   **Then** that step status changes from "in progress" to "completed" (yellow clock changes to green checkmark).

6. **Given** consultant deletes data that invalidates a previously completed step,
   **When** system detects the change,
   **Then** that step status changes from "completed" (green checkmark) to "in progress" (yellow clock).

**Additional Criteria:**
- [ ] All 8 steps display correct visual states simultaneously
- [ ] Status updates occur in real-time without page refresh
- [ ] Visual distinction matches provided design (green checkmark for completed, yellow clock for in-progress, no icon for not started)
- [ ] Banner displays correctly whether user is on dashboard or registration page
- [ ] Status logic applies consistently across all 8 registration steps

---

## 🔐 Business Rules

**Step Status Determination Logic:**

**"Completed" (Green Checkmark ✓):**
- All required fields for the step are filled
- Data passes validation rules
- Step is ready for submission

**"In Progress" (Yellow Clock ⏰):**
- At least one field has been saved (draft exists on backend)
- NOT all required fields are completed yet
- User has started but not finished the step

**"Not Started" (No Icon):**
- No draft record exists on backend
- User has not entered any data for this step
- Step appears as plain text

**Step Completion Rules (per step):**

1. **Account & Security**: 
   - Required for "completed": email verified, password set
   - "In progress" if: email entered but not verified, or password set but email not verified
   - Optional: MFA enabled (does not affect completion status)

2. **Basic Profile**: 
   - Required for "completed": first name, last name, professional bio (min 50 chars)
   - "In progress" if: any one field saved but not all three required fields complete
   - Optional: photo, date of birth, phone number

3. **Credentials**: 
   - Required for "completed": at least one education entry, at least one professional interest selected
   - "In progress" if: education entry exists but no interests, or interests selected but no education

4. **Expertise Mapping**: 
   - Required for "completed": at least one specialization selected from governance modules
   - "In progress" if: draft exists but no specializations selected yet (unlikely but possible)

5. **Services & Pricing**: 
   - Required for "completed": at least one service with name, description, and price
   - "In progress" if: service draft created but missing required fields (name/description/price)

6. **Payments**: 
   - Required for "completed": Stripe account connected successfully
   - "In progress" if: Stripe connection initiated but not completed
   - "Not started" if: no Stripe connection attempt

7. **KYC Verification**: 
   - Required for "completed": Stripe KYC status = "verified" (automated via Stripe)
   - "In progress" if: KYC submitted but pending verification
   - "Not started" if: Payments step not completed yet

8. **Under Review**: 
   - Required for "completed": all previous 7 steps completed, profile submitted for review
   - "In progress" if: all steps complete but not yet submitted
   - "Not started" if: any previous step incomplete

**Status Update Triggers:**
- Step status recalculated on:
  - Page load
  - Form field save (creates/updates draft)
  - Form submission
  - Data deletion
  - Stripe webhook notification (for Payments/KYC)
  - Profile submission

**Authorization:**
- **Who can view banner:** Only Consultants with incomplete/unsubmitted profiles
- **Who can see statuses:** The Consultant viewing their own profile only

**Edge Cases:**
- **Draft with only optional fields**: If consultant saves only optional fields, step remains "not started" (no draft for required fields)
- **Submitted profile under moderation**: All steps show "completed", banner may be hidden
- **Rejected profile**: Step that caused rejection changes to "in progress" (draft preserved but incomplete)
- **Partial data deletion**: If consultant deletes required data, step reverts from "completed" to "in progress" (draft still exists)
- **Complete data deletion**: If consultant deletes all data including draft, step reverts to "not started"
- **Multiple tabs open**: Status updates sync across all open tabs in real-time

---

## 🧪 Test Scenarios

**Happy Path:**
1. New consultant logs in for first time
2. Views banner - all 8 steps show no icons (all "not started")
3. Enters email and password in Step 1
4. Yellow clock appears on Step 1 ("in progress")
5. Verifies email, completes Step 1
6. Green checkmark appears on Step 1 ("completed")
7. Starts Step 2, enters name only
8. Yellow clock appears on Step 2 ("in progress")
9. Completes all required fields in Step 2
10. Green checkmark appears on Step 2 ("completed")
11. Continues through all steps to completion

**Negative Tests:**
1. **Incomplete required field**: Consultant fills only 2 of 3 required fields → step shows yellow clock (in progress), not green checkmark
2. **Optional field only**: Consultant saves only optional field (photo) → step remains "not started" (no icon)
3. **Data deletion - partial**: Consultant deletes one required field from completed step → green checkmark changes to yellow clock
4. **Data deletion - complete**: Consultant deletes all data including draft → yellow clock disappears, no icon (not started)
5. **Stripe connection failure**: Consultant attempts Stripe setup but cancels → Payments step shows yellow clock if attempt was registered

**Edge Cases:**
1. **KYC pending**: Stripe connected → Payments shows green checkmark, KYC shows yellow clock (processing)
2. **Multiple incomplete steps**: User starts Step 2 and Step 4 → both show yellow clocks
3. **All steps started but none completed**: All 8 steps show yellow clocks
4. **Mixed statuses**: Steps 1-3 green checkmarks, Steps 4-5 yellow clocks, Steps 6-8 no icons

---

## 📝 Notes

**Visual State Requirements (from provided design):**
- ✓ **Completed**: Green checkmark icon + step name
- ⏰ **In Progress**: Yellow clock icon + step name  
- **Not Started**: Step name only, no icon

**Backend Draft Logic:**
- Draft record creation triggers "in progress" status
- Draft persists until data is deleted or step is completed
- Draft allows users to save partial progress and return later

**Performance Considerations:**
- Status determination should be fast (< 50ms per step)
- Banner should not block page rendering
- Real-time updates should not cause UI flicker
- Icon transitions should be smooth (no jarring changes)

**Open Questions (from Epic chat):**

**Q: What if consultant deletes data from completed step?**
**A:** If any required data is deleted, status changes from "completed" (green checkmark) to "in progress" (yellow clock). If ALL data including draft is deleted, reverts to "not started" (no icon).

**Q: Can status go backwards (completed → in progress → not started)?**
**A:** Yes. Completed → In Progress (delete some required data). In Progress → Not Started (delete all data including draft).

**Q: When does draft get created?**
**A:** When consultant saves any field for the first time in a step. This triggers "in progress" status (yellow clock).

**Q: What happens during Stripe KYC processing?**
**A:** Payments step = "completed" (green checkmark), KYC step = "in progress" (yellow clock) until Stripe webhook confirms verification, then KYC becomes "completed".

**Q: Are statuses cached or calculated on-demand?**
**A:** Calculated on-demand on page load, then updated via event system when draft is created/updated or data changes.

---

**Template Version:** 1.0.0
**Last Updated:** 2025-11-26