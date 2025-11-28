---
title: "Connect Stripe Button Non-Functional - No Click Response or Redirect"
category: "bug"
audience: "developer|qa"
created: "2025-11-27"
updated: "2025-11-27"
version: "1.0.0"
status: "open"
tags: ["bug", "frontend", "stripe", "payment", "blocker"]
owner: "product-team"
assignee: "itkachev-reluna"
---

# Bug Report - Connect Stripe Button Non-Functional

> **Issue:** The "Connect Stripe" button on Payment Settings page does not respond to clicks and does not initiate redirect to Stripe onboarding flow, completely blocking users from setting up payment accounts.

---

## 📋 Basic Information

**Issue Type:** Bug
**Project:** FG
**Summary:** "Connect Stripe" button is unclickable and does not redirect to Stripe OAuth flow
**Original Epic:** FG-EPIC-007 (Stripe Connect Payment Setup for Consultants)
**Assignee:** itkachev-reluna
**Priority:** High
**Severity:** Critical
**Tags:** `bug`, `frontend`, `stripe`, `payment`, `blocker`, `ui`, `button`
**Story Points:** TBD
**Sprint:** To be assigned during sprint planning (URGENT)

---

## 🐛 Bug Description

**What is broken?**

The "Connect Stripe" button in the Payment Settings page blue banner is completely non-functional:
- Button does not respond to clicks (no visual feedback)
- No redirect to Stripe onboarding/OAuth flow occurs
- No console errors visible (to be confirmed during debugging)
- Button appears visually but has no functionality

This **completely blocks** the Stripe Connect integration flow, preventing advisors/consultants from:
- Setting up payment accounts
- Receiving payments from families
- Completing the payment onboarding process
- Accessing any Stripe-related functionality

**Functionality affected:** Stripe Connect onboarding initiation
**What's not working:** "Connect Stripe" button click handler and redirect logic
**Impact:** Complete blocker for payment setup - users cannot proceed with Stripe integration at all

---

## 👥 Affected Users

**Who is impacted by this bug?**

- **Primary Personas:** All advisors/consultants who need to set up payment processing
- **User Impact Level:** 100% of users attempting to connect Stripe account
- **Frequency:** Every time - button consistently does not work
- **Severity:** BLOCKER - No workaround available, completely prevents payment setup

---

## ✅ Expected Behavior

**What SHOULD happen:**

1. User navigates to Payment Settings page
2. User sees blue banner with message: "Stripe not connected"
3. User sees "Connect Stripe >" button on the right side of banner
4. **When user clicks "Connect Stripe" button:**
   - Button should show visual feedback (hover state, click state)
   - System should initiate Stripe Connect onboarding flow
   - User should be redirected to Stripe OAuth/onboarding page
   - OR: Modal/embedded component should open for Stripe onboarding
5. User completes Stripe onboarding on Stripe's page
6. User is redirected back to Payment Settings with updated status
7. Status changes from "Not Started" to "Pending" or "In Progress"

**Expected technical flow:**
```
User clicks "Connect Stripe"
→ Frontend sends request to backend API
→ Backend generates Stripe Connect OAuth URL
→ Backend returns OAuth URL to frontend
→ Frontend redirects user to Stripe OAuth page
→ User completes onboarding on Stripe
→ Stripe redirects back to callback URL
→ System processes callback and updates status
```

---

## ❌ Actual Behavior

**What ACTUALLY happens:**

1. User navigates to Payment Settings page
2. User sees blue banner with "Stripe not connected" message
3. User sees "Connect Stripe >" button (visually appears normal)
4. **When user clicks "Connect Stripe" button:**
   - Nothing happens
   - No visual feedback on button click
   - No redirect occurs
   - No modal or component opens
   - User remains on the same page
   - No apparent error message displayed
5. User cannot proceed with Stripe integration
6. Payment setup is completely blocked

**Observed behavior:**
- Button appears clickable (has cursor pointer style, presumably)
- No visible response to user interaction
- No console errors reported (to be verified during reproduction)
- No network requests triggered (to be verified in Network tab)

---

## 📸 Evidence

**Screenshots/Videos:**
- Screenshot provided showing Payment Settings page
- Blue banner at top with "Stripe not connected" message
- "Connect Stripe >" button visible on right side of banner
- Red arrow pointing to the "Connect Stripe" button
- Button visually appears normal but is non-functional

**Visual Evidence Description:**
The screenshot shows:
- Payment Settings page with "Overview" tab active
- Prominent blue banner across top section
- Banner text: "Stripe not connected - Connect your Stripe account to receive payments from families securely and automatically."
- "Connect Stripe >" button clearly visible with right arrow
- Button styling suggests it should be interactive
- No error messages visible on the page

**To be captured during reproduction:**
- Browser console logs (any errors or warnings)
- Network tab showing no API requests when button clicked
- Element inspection showing button HTML structure
- Event listener status on button element

---

## 🔍 Steps to Reproduce

### Prerequisites
- User logged in as advisor/consultant role
- User has not previously connected Stripe (or has disconnected)
- Payment Settings page accessible

### Reproduction Steps

1. Log in to the platform as advisor/consultant
2. Navigate to: **Dashboard → Payment Settings**
3. Verify the blue banner appears with message "Stripe not connected"
4. Locate the "Connect Stripe >" button on the right side of the banner
5. Click the "Connect Stripe" button
6. **Observe:** Nothing happens - no redirect, no modal, no response

### Expected vs Actual

| Step | Expected Result | Actual Result |
|------|----------------|---------------|
| Click button | Redirect to Stripe or open modal | No action occurs |
| Visual feedback | Button shows clicked/loading state | No visual change |
| API request | Network request to generate OAuth URL | No request made |
| User flow | Onboarding process begins | User stuck on same page |

**Reproducibility:** 100% - occurs every time button is clicked

---

## 🔍 Root Cause Analysis (Initial Assessment)

**Likely technical causes:**

### 1. **Event Handler Not Attached**
- Click event listener may not be properly attached to button element
- React/component lifecycle issue preventing handler registration
- Button rendered but event binding failed

### 2. **JavaScript Error Blocking Execution**
- Silent error preventing click handler from executing
- Error in component initialization blocking event handlers
- Missing dependency or undefined function

### 3. **API Integration Missing**
- Backend endpoint not implemented or not accessible
- Frontend trying to call non-existent API endpoint
- CORS or authentication issue preventing API call

### 4. **Button Disabled State**
- Button may be in disabled state (not visually apparent)
- Conditional logic preventing button activation
- CSS or z-index issue making button unclickable

### 5. **Routing/Navigation Issue**
- Missing route configuration for Stripe redirect
- OAuth URL generation failing
- Redirect logic not implemented

---

## 🔬 Debugging Steps

**Frontend Developer should check:**

1. **Console Errors:**
   ```
   - Open browser DevTools → Console tab
   - Click "Connect Stripe" button
   - Check for any JavaScript errors or warnings
   ```

2. **Network Requests:**
   ```
   - Open DevTools → Network tab
   - Click "Connect Stripe" button
   - Verify if any API request is made (should be call to generate OAuth URL)
   ```

3. **Element Inspection:**
   ```html
   - Inspect "Connect Stripe" button element
   - Check if button has `disabled` attribute
   - Verify click event listeners are attached
   - Check CSS z-index and pointer-events properties
   ```

4. **React DevTools:**
   ```
   - Check component props and state
   - Verify onClick handler is defined in component
   - Check for conditional rendering logic
   ```

5. **Console Test:**
   ```javascript
   // In browser console, try to manually trigger button
   document.querySelector('[aria-label*="Connect Stripe"]')?.click()
   // or
   document.querySelector('button:contains("Connect Stripe")')?.click()
   ```

---

## 💡 Recommended Fix

**Technical approach (depends on root cause):**

### If Event Handler Missing:
```typescript
// Ensure onClick handler is properly attached
<Button
  onClick={handleConnectStripe}
  disabled={isLoading}
>
  Connect Stripe
</Button>

const handleConnectStripe = async () => {
  try {
    setIsLoading(true);
    const response = await api.post('/api/advisors/stripe/connect');
    const { oauthUrl } = response.data;
    window.location.href = oauthUrl; // Redirect to Stripe
  } catch (error) {
    console.error('Failed to connect Stripe:', error);
    showErrorMessage('Unable to connect Stripe. Please try again.');
  } finally {
    setIsLoading(false);
  }
};
```

### If API Missing:
- Backend team needs to implement Stripe Connect OAuth URL generation endpoint
- Endpoint should return Stripe OAuth URL with proper parameters
- Frontend should redirect user to the returned URL

### If Button Disabled:
- Remove or fix conditional logic that incorrectly disables button
- Ensure proper loading state management
- Add visual feedback for disabled vs enabled states

### General Improvements:
1. Add loading spinner when button is clicked
2. Add error handling and user-facing error messages
3. Add console logging for debugging
4. Implement proper disabled state visual styling
5. Add telemetry/analytics to track button clicks

---

## 🧪 Test Scenarios

### Scenario 1: Button Click Response (Primary Issue)
**Given:** User on Payment Settings page with "Stripe not connected" banner
**When:** User clicks "Connect Stripe" button
**Then:**
- Button should show loading state immediately
- API request should be made to backend
- User should be redirected to Stripe OAuth page
- OR: Error message should display if request fails

### Scenario 2: Loading State
**Given:** User clicks "Connect Stripe" button
**When:** API request is in progress
**Then:**
- Button should show loading spinner or disabled state
- User cannot click button multiple times
- Loading indicator visible to user

### Scenario 3: Error Handling
**Given:** User clicks "Connect Stripe" button
**When:** API request fails (network error, server error)
**Then:**
- Error message displayed to user
- Button returns to clickable state
- User can retry the action
- Error logged to console for debugging

### Scenario 4: Successful Redirect
**Given:** User clicks "Connect Stripe" button
**When:** API returns valid OAuth URL
**Then:**
- User is redirected to Stripe onboarding page
- Stripe page loads successfully
- User can complete onboarding process

### Scenario 5: Return from Stripe
**Given:** User completed Stripe onboarding
**When:** Stripe redirects back to platform
**Then:**
- User lands on Payment Settings page
- Status updated to reflect connection progress
- Success message or updated UI displayed

---

## 📊 Business Impact

### User Experience Impact (CRITICAL)
- **Complete Blocker:** Users cannot set up payment accounts at all
- **Dead End:** No workaround available - flow is completely broken
- **Frustration:** Users attempt to click button multiple times with no feedback
- **Abandonment Risk:** High likelihood users will abandon payment setup

### Business Impact (SEVERE)
- **Revenue Impact:** No consultants can receive payments = zero transaction revenue
- **Onboarding Failure:** New consultants cannot complete payment setup
- **Launch Blocker:** Cannot launch payment features to production with this bug
- **Support Burden:** All users will report this issue when attempting payment setup
- **Reputation Risk:** Broken core functionality damages platform credibility

### Severity Justification (Critical)
- **Blocker:** Completely prevents core payment functionality
- **Workaround:** None available - no alternative path to connect Stripe
- **Scope:** Affects 100% of users attempting to set up payments
- **Business Critical:** Blocks revenue generation for the platform
- **User Facing:** Highly visible and immediately impactful
- **Data Loss:** None, but prevents any progress in payment setup

**Priority: HIGH / Severity: CRITICAL = MUST FIX IMMEDIATELY**

---

## 🔗 Related Issues

**Related Bugs:**
- [Bug: Stripe Status Shows Pending Before User Action](./bug-stripe-status-shows-pending-before-user-action.md) - Related status display issue

**Related User Stories:**
- [Story FG-002: Stripe Account Creation Flow](../epics/epic-007-stripe-payment/story-fg-002-account-creation.md)
- [Story FG-003: OAuth Session Generation](../epics/epic-007-stripe-payment/story-fg-003-session-gen.md)
- [Story FG-004: Embedded Onboarding Component](../epics/epic-007-stripe-payment/story-fg-004-embedded-component.md)

**Epic:**
- [EPIC-007: Stripe Connect Payment Setup](../epics/epic-007-stripe-payment/epic-007-stripe-payment.md)

**Technical Implementation:**
- Backend service: `../FG/backend/stripe_service/` (assumed)
- Frontend component: `../FG/frontend/advisor_portal/components/PaymentSettings/` (assumed)
- API endpoint (expected): POST `/api/advisors/stripe/connect` or `/api/stripe/oauth/initiate`

---

## 🏷️ Additional Context

### Priority & Severity Explanation

**Why Critical Severity?**
- Completely blocks a core user flow (payment setup)
- No workaround exists
- Affects all users attempting the action
- Prevents business from generating revenue
- Must be fixed before any payment features can be used

**Why High Priority?**
- Blocks EPIC-007 completion and testing
- Prevents production release of payment features
- Affects all new consultants joining the platform
- High visibility issue - immediately noticed by users

### Dependencies

**Blocking:**
- All EPIC-007 user stories depend on this working
- Payment dashboard widget cannot be tested
- Webhook processing cannot be verified
- Email notifications cannot be triggered

**Requires:**
- Backend Stripe Connect OAuth endpoint must be implemented
- Frontend-backend API integration must be functional
- Stripe API keys must be properly configured in environment

### Assignee Notes

**For Frontend Developer (itkachev-reluna):**

1. **First Priority:** Verify if this is frontend or backend issue
   - Check if API endpoint exists and is reachable
   - Check if frontend is making the API call
   - Check browser console for any errors

2. **Frontend Fix Checklist:**
   - [ ] Verify button onClick handler is attached
   - [ ] Implement loading state on button click
   - [ ] Add error handling with user-facing messages
   - [ ] Test redirect flow to Stripe OAuth
   - [ ] Add console logging for debugging
   - [ ] Verify proper error boundaries are in place

3. **If Backend Issue:**
   - Coordinate with backend team to implement OAuth endpoint
   - Define API contract (request/response format)
   - Implement frontend integration when backend is ready

4. **Testing:**
   - Test with browser DevTools open (Console + Network tabs)
   - Test in multiple browsers
   - Test error scenarios (network failure, API errors)
   - Test successful flow end-to-end

---

## ✅ Acceptance Criteria for Bug Fix

### Must Have (Required for Bug Closure)
- [ ] "Connect Stripe" button responds to clicks (visual feedback)
- [ ] Button click triggers API request to backend
- [ ] User is redirected to Stripe OAuth/onboarding page
- [ ] Loading state displayed while request is processing
- [ ] Error messages shown if request fails
- [ ] No console errors when button is clicked
- [ ] Successful completion redirects user back to Payment Settings
- [ ] Status updates correctly after Stripe connection initiated

### Should Have (Important but not blocking)
- [ ] Button shows disabled state while loading (prevents double-click)
- [ ] Analytics event fired when button clicked
- [ ] Graceful error handling for all failure scenarios
- [ ] Retry capability if initial attempt fails
- [ ] Console logging for debugging

### Testing Requirements
- [ ] Manual testing: Button click works in Chrome, Firefox, Safari
- [ ] Manual testing: Network tab shows API request
- [ ] Manual testing: Redirect to Stripe occurs successfully
- [ ] Manual testing: Error scenario handled gracefully
- [ ] Manual testing: Loading state visible during API call
- [ ] Code review: Event handlers properly implemented
- [ ] Code review: Error boundaries in place

---

## 📝 Notes

### Investigation Notes
- Screenshot shows button is visually present and styled correctly
- No obvious visual indication that button is disabled
- Blue banner suggests feature is enabled and ready to use
- Related bug shows status is incorrectly set to "Pending" even without connection

### Hypothesis
Most likely causes (in order of probability):
1. **Event handler not attached** - Most common React component issue
2. **API endpoint not implemented** - Backend integration missing
3. **Silent JavaScript error** - Error preventing handler execution
4. **Environment configuration issue** - Missing Stripe API keys or OAuth config

### Quick Win
If this is simply a missing onClick handler, fix can be deployed quickly. If backend integration is missing, this requires more extensive work including backend API implementation.

---

**Reporter:** Elena Savelova (@e.savelova)
**Date Reported:** 2025-11-27
**Environment:** Production/Staging (specify as applicable)
**Browser:** To be documented during reproduction
**Platform:** Web Application - Advisor Portal

---

## 🚨 URGENT ACTION REQUIRED

This is a **CRITICAL BLOCKER** for EPIC-007 and all payment-related functionality. Recommend:

1. **Immediate triage** - Determine if this is frontend or backend issue
2. **Assign to sprint immediately** - Do not wait for planning
3. **Block production deployment** of payment features until fixed
4. **Daily status updates** until resolved
5. **Cross-team coordination** if backend work required

**Estimated Fix Time:**
- If frontend only: 2-4 hours
- If requires backend: 1-2 days
- If requires Stripe configuration: 1-3 days

**Blocking:** All payment feature testing, EPIC-007 completion, production launch
