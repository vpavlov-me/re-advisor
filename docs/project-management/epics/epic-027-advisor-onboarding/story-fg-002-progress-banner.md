# User Story - Persistent Onboarding Progress Banner

---

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Consultant, I want to see persistent onboarding banner on my dashboard showing 8 steps and completion percentage
**Epic Link:** FG-XXX [Link to Consultant Onboarding Flow Epic]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant (marketplace advisor),
**I want to** see persistent onboarding banner on my dashboard showing 8 steps and completion percentage,
**so that** I always know my registration progress and what remains to complete before submitting my profile for approval.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point being solved:**
- Consultants lose track of what they've completed during multi-step registration
- No visibility into overall progress towards profile submission
- Users abandon registration not knowing how much remains
- Unclear which step to complete next

**Business outcome expected:**
- Increase onboarding completion rate (target 60% → 80%)
- Reduce time to first profile submission (target 7 days → 3 days)
- Decrease support requests about registration status
- Improve consultant activation rate

**Strategic alignment:**
- Critical for Consultant acquisition and marketplace growth
- Enables self-service onboarding without manual follow-ups
- Foundation for future gamification and engagement features

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** Consultant has active subscription (Standard Consultant OR Premium Consultant) AND incomplete profile (progress < 100%),
   **When** dashboard loads,
   **Then** banner displays:
   - Progress bar showing completion percentage (0-100%)
   - 8 steps with visual indication of completed/incomplete status:
     1. Account & Security
     2. Basic Profile
     3. Credentials
     4. Expertise Mapping
     5. Services & Pricing
     6. Payments
     7. KYC Verification
     8. Under Review

2. **Given** Consultant does NOT have active subscription (no Standard/Premium),
   **When** dashboard loads,
   **Then** onboarding banner is NOT displayed at all.

3. **Given** Consultant clicks on any step (1-6) in banner,
   **When** step is clicked,
   **Then** system navigates to corresponding editing page:
   - Step 1 → /account-settings
   - Step 2 → /profile/basic
   - Step 3 → /profile/credentials
   - Step 4 → /profile/expertise
   - Step 5 → /services
   - Step 6 → /payment-settings

4. **Given** Consultant clicks on Step 7 (KYC Verification) AND Step 6 (Payments) is NOT completed,
   **When** step is clicked,
   **Then** step is disabled (not clickable) and shows tooltip "Complete Payments setup first".

5. **Given** Consultant clicks on Step 7 (KYC Verification) AND Step 6 (Payments) is completed,
   **When** step is clicked,
   **Then** system navigates to /kyc-status.

6. **Given** Consultant clicks on Step 8 (Under Review),
   **When** step is clicked,
   **Then** step is not clickable (no navigation) as it is status-only indicator.

7. **Given** Consultant updates profile data on any step page,
   **When** data is saved,
   **Then** banner progress updates automatically without page refresh (event-driven).

8. **Given** Consultant completes Step 1 (Account & Security),
   **When** email is verified,
   **Then** Step 1 marked as complete (+12.5%) and progress bar updates.

9. **Given** Consultant completes Step 2 (Basic Profile),
   **When** all required fields filled (name, photo, bio, company, location, phone),
   **Then** Step 2 marked as complete (+12.5%) and progress bar updates.

10. **Given** Consultant completes Step 3 (Credentials),
    **When** at least 1 education entry added AND interests filled,
    **Then** Step 3 marked as complete (+12.5%) and progress bar updates.

11. **Given** Consultant completes Step 4 (Expertise Mapping),
    **When** at least 1 specialization selected,
    **Then** Step 4 marked as complete (+12.5%) and progress bar updates.

12. **Given** Consultant completes Step 5 (Services & Pricing),
    **When** at least 1 service created,
    **Then** Step 5 marked as complete (+12.5%) and progress bar updates.

13. **Given** Consultant completes Step 6 (Payments),
    **When** Stripe account connected AND status = 'active',
    **Then** Step 6 marked as complete (+12.5%) AND Step 7 (KYC) becomes clickable.

14. **Given** Consultant completes Step 7 (KYC Verification),
    **When** Stripe KYC status = 'verified',
    **Then** Step 7 marked as complete (+12.5%) and progress bar shows 87.5%.

15. **Given** Consultant completes all steps 1-7 (progress = 87.5%),
    **When** profile submission is initiated (automatically or manually),
    **Then** Step 8 "Under Review" becomes active, profile status changes to 'submitted', and progress updates to 100%.

16. **Given** Consultant profile is under review (status = 'submitted', Step 8 active),
    **When** dashboard loads,
    **Then** banner displays with Step 8 showing "Under Review" status and progress shows 100%.

17. **Given** Consultant removes previously saved data (e.g., deletes all services),
    **When** data is deleted,
    **Then** corresponding step becomes incomplete and progress decreases (-12.5%).

18. **Given** Consultant profile is approved and published (status = 'approved'),
    **When** dashboard loads,
    **Then** onboarding banner is hidden permanently.

19. **Given** Consultant subscription expires or is cancelled,
    **When** dashboard loads,
    **Then** onboarding banner is hidden immediately (regardless of profile completion status).

**Additional Criteria:**
- [ ] Banner is responsive across desktop, tablet, mobile
- [ ] Progress calculation is accurate and matches backend validation
- [ ] Step completion status persists across sessions
- [ ] Banner loading does not block dashboard rendering
- [ ] All step navigation links work correctly (respecting disabled states)
- [ ] Progress updates are real-time (no page refresh needed)
- [ ] Subscription status check is performed on every dashboard load
- [ ] Step 7 is disabled until Step 6 is completed
- [ ] Disabled steps show visual indication (grayed out, cursor not-allowed)
- [ ] Tooltip displays for disabled Step 7 on hover

---

## 📐 Business Rules

### Progress Calculation Rules:

**Step Completion Criteria:**

| Step | Required to Complete | Completion Weight |
|------|---------------------|-------------------|
| 1. Account & Security | Email verified | 12.5% |
| 2. Basic Profile | All 6 required fields filled (name, photo, bio, company, location, phone) | 12.5% |
| 3. Credentials | At least 1 education entry + interests field filled | 12.5% |
| 4. Expertise Mapping | At least 1 specialization selected | 12.5% |
| 5. Services & Pricing | At least 1 service created | 12.5% |
| 6. Payments | Stripe account connected + status = 'active' | 12.5% |
| 7. KYC Verification | Stripe KYC status = 'verified' | 12.5% |
| 8. Under Review | Profile submitted for review | 12.5% |

**Progress Milestones:**
```
Steps 1-7 completed = 87.5%
Step 8 completed (submission) = 100%
```

**Progress Formula:**
```
Progress % = (Number of completed steps / 8) × 100
```

**Step Status Logic:**
- ✅ **Complete**: All criteria met for step
- ⏳ **Incomplete**: Missing required data
- 🔒 **Disabled**: Prerequisites not met (Step 7 when Step 6 incomplete)
- 🔍 **Under Review**: Profile submitted (Step 8 active)

### Step Navigation Rules:

**Clickable Steps:**
- Steps 1-6: Always clickable (can navigate to edit at any time)
- Step 7: Clickable ONLY IF Step 6 is completed
- Step 8: Not clickable (status indicator only)

**Disabled Step Logic:**
```
IF Step 6 incomplete (Stripe not connected)
THEN Step 7 disabled
  - Visual state: grayed out, opacity reduced
  - Cursor: not-allowed
  - Tooltip on hover: "Complete Payments setup first"
  - Click event: no navigation

IF Step 6 complete (Stripe connected + active)
THEN Step 7 enabled
  - Visual state: normal (clickable)
  - Cursor: pointer
  - Click event: navigate to /kyc-status
```

### Banner Display Rules:

**SHOW banner when ALL conditions met:**
- `subscription_type IN ('Standard Consultant', 'Premium Consultant')` AND
- `subscription_status = 'active'` AND
- (`onboarding_progress < 100%` OR `profile_status = 'submitted'`)

**HIDE banner when ANY condition met:**
- `subscription_type NOT IN ('Standard Consultant', 'Premium Consultant')` OR
- `subscription_status != 'active'` OR
- (`profile_status = 'approved'` AND `marketplace_published = true`)

**Subscription Check Priority:**
```
1. Check subscription status FIRST (before checking profile progress)
2. If no valid subscription → Hide banner, skip all other checks
3. If valid subscription → Continue to profile progress checks
```

### Progress Decrease Rules:

**WHEN data is removed:**
- Consultant deletes all services → Step 5 becomes incomplete (-12.5%)
- Consultant removes all education entries → Step 3 becomes incomplete (-12.5%)
- Stripe account disconnected → Step 6 becomes incomplete (-12.5%) AND Step 7 becomes disabled
- Any required field cleared → Respective step becomes incomplete (-12.5%)

**Important:**
- If progress drops below 100% after submission, `profile_status` remains 'submitted'
- Step 8 remains "Under Review" (admin still reviewing)
- Data changes are flagged for admin review
- If Step 6 becomes incomplete after completion, Step 7 becomes disabled again (even if previously completed)

### Authorization:
- **Who can view banner:** Only the Consultant who owns the profile AND has active Standard/Premium subscription
- **Who can interact:** Only the Consultant (click steps, navigate)
- **No cross-consultant visibility:** Banner data is strictly isolated by advisor_id

### Edge Cases:

**Edge Case 1: Parallel edits**
- User opens multiple tabs, edits different steps
- Expected: Progress updates in all tabs via event listeners

**Edge Case 2: Backend validation fails**
- User fills form, submission fails backend validation
- Expected: Step remains incomplete, validation errors shown

**Edge Case 3: Stripe webhook delays**
- KYC verification webhook delayed
- Expected: Step 7 remains incomplete until webhook received

**Edge Case 4: Profile rejected after submission**
- Admin rejects profile (handled in separate epic)
- Expected: Banner remains visible, profile status returns to previous state

**Edge Case 5: Subscription expires mid-session**
- Consultant viewing dashboard with banner displayed
- Subscription expires (payment fails, cancellation, etc.)
- Expected: Banner hidden immediately on next page load or refresh

**Edge Case 6: Stripe disconnected after KYC completed**
- Consultant completes Step 6 (Payments) and Step 7 (KYC)
- Consultant disconnects Stripe account
- Expected: Step 6 becomes incomplete, Step 7 becomes disabled, progress decreases by 12.5%

---

## 🧪 Test Scenarios

### Happy Path:

**Scenario 1: New Consultant with Active Subscription**
1. Consultant creates account with Standard Consultant subscription
2. Logs into dashboard
3. Dashboard loads with banner displayed
4. All 8 steps displayed, Steps 1-6 showing incomplete, Step 7 disabled (grayed out), Step 8 inactive
5. Progress bar shows 0%
6. Consultant clicks Step 2 "Basic Profile"
7. Navigates to `/profile/basic`

**Scenario 2: Complete Steps 1-6, Step 7 Unlocks**
1. Consultant completes Steps 1-5
2. Progress shows 62.5%
3. Step 7 still disabled (grayed out)
4. Consultant hovers over Step 7 → Tooltip: "Complete Payments setup first"
5. Consultant completes Step 6 (Payments - Stripe connected)
6. Banner updates: Step 6 ✅, Progress: 75%
7. Step 7 becomes enabled (clickable, normal visual state)
8. Consultant clicks Step 7 → Navigates to /kyc-status

**Scenario 3: Complete Steps 1-7**
1. Consultant completes KYC verification (Step 7)
2. Banner updates: Step 7 ✅, Progress: 87.5%
3. Step 8 "Under Review" still shows as inactive

**Scenario 4: Submit Profile (Step 8)**
1. Consultant has completed steps 1-7 (progress 87.5%)
2. Consultant submits profile for review
3. System changes profile_status to 'submitted'
4. Banner updates: Step 8 "Under Review" ✅, Progress: 100%
5. Step 8 shows "Under Review" status indicator

**Scenario 5: Return User with Active Subscription**
1. Consultant logs in (subsequent visit)
2. System checks: subscription = 'Standard Consultant', status = 'active' ✅
3. Banner displays with saved progress state (e.g., 50%)
4. Completed steps remain marked as complete
5. Step 7 disabled if Step 6 not completed
6. Consultant continues from last incomplete step

### Negative Tests:

**Scenario 1: Consultant Without Subscription**
1. Consultant creates account but does not purchase subscription
2. Logs into dashboard
3. System checks: subscription = null ❌
4. Onboarding banner is NOT displayed
5. Dashboard shows other content (upsell banner, features overview, etc.)

**Scenario 2: Consultant with Expired Subscription**
1. Consultant previously had Standard Consultant subscription
2. Subscription expired (payment failed)
3. Logs into dashboard
4. System checks: subscription_status = 'expired' ❌
5. Onboarding banner is NOT displayed
6. Dashboard may show subscription renewal prompt

**Scenario 3: Consultant with Wrong Subscription Type**
1. Consultant has subscription type other than Standard/Premium Consultant
2. Logs into dashboard
3. System checks: subscription_type NOT IN required types ❌
4. Onboarding banner is NOT displayed

**Scenario 4: Click Disabled Step 7**
1. Consultant has completed Steps 1-5 (Step 6 incomplete)
2. Step 7 is disabled (grayed out)
3. Consultant clicks on Step 7
4. No navigation occurs
5. Tooltip shows: "Complete Payments setup first"
6. Step remains disabled

**Scenario 5: Data Removal After Step 7 Completion**
1. Consultant has 87.5% progress (steps 1-7 complete)
2. Consultant navigates to `/services` and deletes all services
3. Banner updates: Step 5 becomes incomplete ❌
4. Progress decreases to 75% (87.5% - 12.5%)
5. Step 7 remains enabled (Step 6 still complete)
6. Step 8 remains inactive (not yet submitted)

**Scenario 6: Stripe Disconnected After Completion**
1. Consultant has Steps 6 and 7 complete (75% progress)
2. Consultant disconnects Stripe account in /payment-settings
3. Banner updates: Step 6 becomes incomplete ❌
4. Progress decreases to 62.5%
5. Step 7 becomes disabled (grayed out) even though previously completed
6. Step 7 completion status cleared (KYC invalid without active Stripe)

**Scenario 7: Data Removal After Submission (100%)**
1. Consultant has 100% progress (submitted, Step 8 active)
2. Consultant deletes all services
3. Banner updates: Step 5 becomes incomplete ❌
4. Progress decreases to 87.5% (100% - 12.5%)
5. Step 8 "Under Review" remains active (status still 'submitted')
6. Data changes flagged for admin review

**Scenario 8: Invalid Data**
1. Consultant fills Step 2 with invalid data (e.g., invalid email format)
2. Saves form
3. Backend validation fails
4. Step 2 remains incomplete
5. Error message displayed on form
6. Banner progress unchanged

**Scenario 9: Network Failure**
1. Consultant saves data on Step 3
2. Network request fails
3. Step 3 remains incomplete
4. Error toast/banner displayed
5. Retry mechanism available

### Edge Cases:

**Scenario 1: Subscription Expires During Active Session**
1. Consultant viewing dashboard with banner displayed (progress 50%)
2. Subscription expires in background (payment failure)
3. Consultant navigates to another page or refreshes dashboard
4. System checks: subscription_status = 'expired' ❌
5. Banner disappears
6. Subscription renewal prompt shown

**Scenario 2: Subscription Upgraded Mid-Session**
1. Consultant has Standard Consultant subscription
2. Upgrades to Premium Consultant
3. Refreshes dashboard
4. System checks: subscription_type = 'Premium Consultant' ✅
5. Banner remains visible with same progress state
6. No change in onboarding progress or step states

**Scenario 3: Stripe KYC Webhook Delay**
1. Consultant completes Stripe KYC process (Step 7)
2. Webhook not received yet
3. Step 7 remains incomplete (progress stuck at 75%)
4. User sees "Verification in progress..." message on /kyc-status
5. Once webhook received → Step 7 completes automatically
6. Progress updates to 87.5%
7. Banner updates without page refresh

**Scenario 4: Concurrent Tab Updates**
1. Consultant opens dashboard in Tab 1 (Step 6 incomplete, Step 7 disabled)
2. Opens `/payment-settings` in Tab 2
3. Connects Stripe in Tab 2, Step 6 completes
4. Tab 1 banner updates automatically (event listener)
5. Step 7 becomes enabled in Tab 1
6. Both tabs show same progress state

**Scenario 5: Profile Approved During Session**
1. Consultant viewing dashboard with 100% progress (submitted)
2. Admin approves profile in background
3. Event triggered → Banner fades out
4. Success message displayed
5. Dashboard refreshes without banner

**Scenario 6: New Consultant Purchases Subscription After Registration**
1. Consultant creates account (no subscription yet)
2. Logs into dashboard → NO banner displayed
3. Consultant purchases Standard Consultant subscription
4. Returns to dashboard
5. System checks: subscription active ✅
6. Banner appears with onboarding progress (likely 0%)
7. Step 7 is disabled initially (Step 6 not completed)

**Scenario 7: Stripe Account Connected But Not Active**
1. Consultant connects Stripe account
2. Stripe status = 'pending' (not 'active')
3. Step 6 remains incomplete
4. Step 7 remains disabled
5. Tooltip still shows "Complete Payments setup first"
6. Once Stripe status changes to 'active' → Step 6 completes, Step 7 enables

---

## 📝 Notes

**Implementation Notes:**
- Use WebSocket or Server-Sent Events for real-time progress updates
- Consider caching progress calculation (with TTL) to reduce backend load
- Ensure banner component is lightweight (< 50KB)
- Add loading skeleton for initial banner render
- **Subscription check must be performed on every dashboard load** (do not cache subscription status)
- Step 8 logic should be triggered when Steps 1-7 reach 87.5% completion
- **Step 7 disabled state must be reactive** to Step 6 completion status changes

**Accessibility:**
- Banner must be keyboard navigable (Tab through steps)
- Screen reader support for progress percentage
- High contrast mode support
- Focus indicators on step buttons
- **Disabled steps must be announced to screen readers** with aria-disabled="true" and aria-label explaining why
- Tooltip for disabled Step 7 must be accessible via keyboard focus

**Performance:**
- Banner should load asynchronously (non-blocking)
- Progress calculation should be memoized
- Event listeners should debounce (avoid excessive updates)
- Subscription status check should be fast (< 50ms)
- Step 7 disabled state check should be computed client-side (no additional API call)

**Data Privacy:**
- Banner data is advisor-scoped only (no cross-advisor access)
- Progress state should not be cached in browser localStorage (security)
- All API calls must include advisor_id validation

**Subscription Integration:**
- Banner visibility depends on active subscription check
- Integration with subscription service required
- Handle subscription state changes gracefully (no errors if service unavailable)

**Visual Design:**
- Disabled Step 7: opacity 0.5, cursor not-allowed, grayed out
- Tooltip: positioned above Step 7, visible on hover and keyboard focus
- Step 8: not clickable but should not appear disabled (different visual state)

---

**Template Version:** 1.0.0
**Last Updated:** 2025-11-26