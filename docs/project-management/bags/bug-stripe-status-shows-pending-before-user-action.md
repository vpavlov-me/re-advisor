---
title: "Stripe Integration Status Shows 'Pending' Before User Initiates Connection"
category: "bug"
audience: "developer|qa"
created: "2025-11-27"
updated: "2025-11-27"
version: "1.0.0"
status: "open"
tags: ["bug", "frontend", "stripe", "payment", "ui"]
owner: "product-team"
assignee: "itkachev-reluna"
---

# Bug Report - Stripe Integration Status Shows 'Pending' Before User Initiates Connection

> **Issue:** Payment Settings page displays Stripe integration status as "Pending" immediately upon first visit, even when the user has never clicked "Connect Stripe" button or initiated any integration action.

---

## 📋 Basic Information

**Issue Type:** Bug
**Project:** FG
**Summary:** Stripe account status incorrectly displays "Pending" instead of "Not Started" when user has not initiated connection
**Original Epic:** FG-EPIC-007 (Stripe Connect Payment Setup for Consultants)
**Assignee:** itkachev-reluna
**Priority:** High
**Severity:** Major
**Tags:** `bug`, `frontend`, `stripe`, `payment`, `ui`, `status-display`
**Story Points:** TBD
**Sprint:** To be assigned during sprint planning

---

## 🐛 Bug Description

**What is broken?**

The Payment Settings page displays incorrect Stripe integration status information. When a user (consultant/advisor) navigates to Payment Settings for the first time without ever clicking the "Connect Stripe" button, the Stripe Account section shows:

- Status: **"Pending"**
- Message: **"Stripe received info, verification in progress (1-3 days)"**

This is misleading because:
- The user has not initiated any Stripe connection
- No information has been sent to Stripe
- No verification process has started
- The user has not clicked "Connect Stripe" button

**Functionality affected:** Stripe integration status display
**What's not working:** Status incorrectly shows "Pending" instead of "Not Started"
**Impact:** Users are confused about their actual Stripe integration status and may believe they've already started the connection process when they haven't

---

## 👥 Affected Users

**Who is impacted by this bug?**

- **Primary Personas:** All advisors/consultants using the platform who need to set up payment processing
- **User Impact Level:** All new users accessing Payment Settings for the first time
- **Frequency:** Every time - consistently displays incorrect status for users who haven't initiated Stripe connection

---

## ✅ Expected Behavior

**What SHOULD happen:**

1. When a user navigates to Payment Settings page and has **never clicked "Connect Stripe" button**, the system should display:
   - Status: **"Not Started"**
   - Message indicating that Stripe connection has not been initiated yet
   - Clear call-to-action to begin the connection process

2. Status should only change to **"Pending"** when:
   - User clicks "Connect Stripe" button
   - Stripe OAuth/onboarding flow is initiated
   - Information is actually submitted to Stripe
   - Verification process has genuinely started

3. Status lifecycle should be:
   - **Not Started** → User hasn't clicked "Connect Stripe"
   - **In Progress** → User clicked button, OAuth flow initiated
   - **Pending** → Information submitted to Stripe, awaiting verification
   - **Verified** → Stripe account verified and ready
   - **Action Required** → User needs to provide additional information

---

## ❌ Actual Behavior

**What ACTUALLY happens:**

1. User navigates to Payment Settings page for the first time
2. User sees "Stripe not connected" blue banner at the top (correct)
3. In the "Stripe Account" section below, system immediately displays:
   - ⏱️ Icon with yellow background
   - Status text: **"Pending"**
   - Subtitle: **"Stripe received info, verification in progress (1-3 days)"**
4. Additional status cards all show "Pending":
   - Card Payments: Pending
   - Transfers: Pending
   - Tax Reporting: Pending
5. User is confused because they haven't clicked "Connect Stripe" button yet
6. No actual connection or verification process has been initiated

---

## 📸 Evidence

**Screenshots/Videos:**
- Screenshot provided showing Payment Settings page with incorrect "Pending" status
- Red arrow pointing to "Pending" status in Stripe Account section
- Blue banner at top correctly shows "Stripe not connected" with "Connect Stripe" button

**Visual Evidence Description:**
The screenshot shows:
- Top section: Blue banner stating "Stripe not connected" with call-to-action
- Overview section: Shows $0.00 balances (correct for new account)
- Stripe Account section: Incorrectly shows "Pending" status with message "Stripe received info, verification in progress (1-3 days)"
- All sub-statuses (Card Payments, Transfers, Tax Reporting) show "Pending"
- This creates inconsistency: banner says "not connected" but status shows "pending verification"

---

## 🔍 Steps to Reproduce

1. Create a new consultant/advisor account or use existing account that has never connected Stripe
2. Ensure the user has **never** clicked "Connect Stripe" button
3. Navigate to: **Dashboard → Payment Settings**
4. Select "Overview" tab (default view)
5. Scroll down to "Stripe Account" section
6. **Observe:** Status shows "Pending" instead of "Not Started"

**Prerequisites:**
- User must be logged in as consultant/advisor role
- User must have never initiated Stripe connection process
- Stripe integration must be available in the environment

---

## 🎯 Root Cause Analysis (Initial Assessment)

**Likely technical causes:**

1. **Default status initialization issue:**
   - Frontend or backend initializes Stripe status as "Pending" by default
   - Missing check for whether user has actually initiated connection

2. **Missing status state:**
   - "Not Started" or "Not Connected" status may not be defined in the status enum
   - System defaults to "Pending" when no Stripe account record exists

3. **State management issue:**
   - Component may be checking for Stripe account existence incorrectly
   - Presence of null/undefined account record triggers "Pending" display

4. **API response issue:**
   - Backend API returns "Pending" status for non-existent Stripe connections
   - Missing differentiation between "no connection" and "connection pending"

---

## 💡 Recommended Fix

**Technical approach:**

1. **Add "Not Started" status state:**
   - Define clear status enum: `NOT_STARTED`, `IN_PROGRESS`, `PENDING_VERIFICATION`, `VERIFIED`, `ACTION_REQUIRED`, `FAILED`
   - Use `NOT_STARTED` as default when no Stripe connection exists

2. **Backend changes:**
   - API should return `status: "NOT_STARTED"` when no Stripe account record exists
   - Only return `PENDING` when actual Stripe onboarding has been initiated
   - Track timestamp of "Connect Stripe" button click

3. **Frontend changes:**
   - Update Payment Settings UI to display appropriate message for each status
   - For `NOT_STARTED`: Show message like "Stripe account not yet connected. Click 'Connect Stripe' to begin setup."
   - Update status icon and color coding for each state

4. **Status transition logic:**
   ```
   NOT_STARTED (no record)
   → IN_PROGRESS (user clicked button, OAuth started)
   → PENDING (info submitted to Stripe)
   → VERIFIED (Stripe confirmed)
   ```

---

## 🧪 Test Scenarios

### Scenario 1: New User First Visit
**Given:** User has never clicked "Connect Stripe"
**When:** User navigates to Payment Settings
**Then:**
- Status should show "Not Started" (not "Pending")
- Message should indicate no connection initiated
- "Connect Stripe" button visible in banner

### Scenario 2: User Initiates Connection
**Given:** User on Payment Settings page with "Not Started" status
**When:** User clicks "Connect Stripe" button
**Then:**
- Status should change to "In Progress"
- OAuth flow should begin
- When OAuth returns, status becomes "Pending"

### Scenario 3: User Returns After Clicking Connect
**Given:** User previously clicked "Connect Stripe" and started OAuth
**When:** User returns to Payment Settings page
**Then:**
- Status should show "Pending" (correct behavior)
- Message should show verification timeline

### Scenario 4: Verification Complete
**Given:** Stripe completes verification
**When:** User visits Payment Settings
**Then:**
- Status should show "Verified" or "Active"
- No "Connect Stripe" banner visible
- Payment functions enabled

---

## 📊 Business Impact

**User Experience Impact:**
- **Confusion:** Users believe they've already started the process when they haven't
- **Trust:** Inconsistent status messages erode user confidence in the platform
- **Support burden:** Users may contact support thinking their verification is delayed

**Business Impact:**
- **Delayed onboarding:** Users may not realize they need to click "Connect Stripe" to actually begin
- **Reduced activation rate:** Confused users may abandon the payment setup process
- **Support tickets:** Increased support inquiries about "stuck" pending status

**Severity Justification (Major):**
- Affects all new users setting up payments (100% of first-time payment setup users)
- Creates confusion in critical payment onboarding flow
- Does not block functionality but significantly degrades UX
- May lead to support escalations and user drop-off

---

## 🔗 Related Documentation

**Epic & User Stories:**
- [EPIC-007: Stripe Connect Payment Setup](../epics/epic-007-stripe-payment/epic-007-stripe-payment.md)
- [Story FG-006: Dashboard Widget](../epics/epic-007-stripe-payment/story-fg-006-dashboard-widget.md)
- [Story FG-007: Resume & Update](../epics/epic-007-stripe-payment/story-fg-007-resume-update.md)

**Technical Implementation:**
- Backend service: `../FG/backend/stripe_service/` (assumed)
- Frontend component: `../FG/frontend/advisor_portal/payment-settings/` (assumed)
- API endpoint: GET `/api/advisors/stripe/status` (assumed)

---

## 🏷️ Additional Context

**Priority Justification (High):**
- Affects critical payment setup flow
- Impacts user trust and onboarding completion rate
- Causes confusion for 100% of new users accessing Payment Settings
- Fix is relatively straightforward (status display logic)

**Assignee Context:**
- Assigned to: itkachev-reluna (frontend)
- May require backend coordination if status logic is server-side
- Should coordinate with EPIC-007 implementation team

---

## ✅ Acceptance Criteria for Bug Fix

- [ ] Users who have never clicked "Connect Stripe" see "Not Started" status (not "Pending")
- [ ] Status only shows "Pending" after user initiates Stripe connection (clicks button)
- [ ] Status message accurately reflects current state of integration
- [ ] No inconsistency between banner message and status section
- [ ] Status transitions follow logical flow: Not Started → In Progress → Pending → Verified
- [ ] Existing users with legitimate "Pending" status are not affected by the fix
- [ ] Manual testing confirms correct status display for all states
- [ ] No console errors or warnings introduced by the fix

---

## 📝 Notes

- Screenshot clearly shows the issue: banner says "not connected" but status shows "pending verification"
- This is a display/status logic bug, not a Stripe API integration issue
- Fix should be coordinated with EPIC-007 Stripe Connect implementation
- Consider adding analytics to track how many users get confused by this status

---

**Reporter:** Elena Savelova (@e.savelova)
**Date Reported:** 2025-11-27
**Environment:** Production/Staging (specify as applicable)
**Browser:** (to be documented during reproduction)
**Platform:** Web Application
