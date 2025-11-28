# User Story: Consultation Quick Actions via Three-Dot Menu

---

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Consultant, I want to access consultation actions via three-dot menu, so that I can reschedule, cancel, or view consultation details quickly
**Epic Link:** FG-EPIC-XXX [Homepage Dashboard for Consultant]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant,
**I want to** access quick actions (reschedule, cancel, view details) via three-dot menu on consultation cards,
**so that** I can manage my consultations efficiently without navigating to separate pages.

---

## 🎯 Business Context

**Why is this Story important?**

Consultants manage multiple family consultations simultaneously and need quick access to common actions. Currently, managing consultations requires navigation to detail pages, creating friction in workflow. This story enables:

- **Faster consultation management** - Actions accessible directly from dashboard
- **Reduced clicks** - No need to navigate to detail pages for common actions
- **Better UX** - Consultant stays in context of homepage dashboard
- **Professional experience** - Modern UI pattern (three-dot menu) expected by users

**Business Value:**
- Improved Consultant satisfaction with platform efficiency
- Reduced time spent on administrative tasks
- Lower risk of missed/forgotten rescheduling or cancellations
- Professional platform perception

---

## ✅ Acceptance Criteria

1. **Given** I am viewing upcoming consultations on homepage,
   **When** I hover over a consultation card,
   **Then** I see a three-dot menu icon (⋮) in the top-right corner of the card.

2. **Given** I click the three-dot menu icon,
   **When** the dropdown opens,
   **Then** I see three options:
   - "Reschedule"
   - "Cancel Consultation"
   - "View Details"

3. **Given** I select "Reschedule" from the menu,
   **When** the action is triggered,
   **Then** a modal/slide-over opens with:
   - Current consultation date/time displayed
   - Calendar picker for new date
   - Time slot selector
   - "Confirm Reschedule" and "Cancel" buttons

4. **Given** I select a new date and time in Reschedule modal,
   **When** I click "Confirm Reschedule",
   **Then**:
   - System validates new time slot availability
   - Consultation is updated with new date/time
   - Family receives notification about reschedule
   - Success message displayed
   - Modal closes and dashboard refreshes with updated consultation

5. **Given** I select "Cancel Consultation" from the menu,
   **When** the action is triggered,
   **Then** a confirmation modal opens with:
   - Warning message about cancellation
   - Required field: "Reason for cancellation" (text area)
   - Cancellation policy reminder (if < 24 hours notice)
   - "Confirm Cancellation" and "Go Back" buttons

6. **Given** I confirm cancellation with reason,
   **When** I click "Confirm Cancellation",
   **Then**:
   - Consultation status changes to "Cancelled"
   - Family receives cancellation notification with reason
   - Consultation is removed from "Upcoming Consultations" section
   - Success message displayed
   - Dashboard refreshes

7. **Given** I select "View Details" from the menu,
   **When** the action is triggered,
   **Then** I am navigated to the full consultation detail page.

**Additional Criteria:**
- [ ] Three-dot menu closes when clicking outside the dropdown
- [ ] Three-dot menu closes after selecting any action
- [ ] All modals have proper close/cancel functionality
- [ ] Loading states shown during API calls (reschedule/cancel)
- [ ] Error handling for failed operations (network errors, validation failures)
- [ ] Keyboard navigation support (Tab, Enter, Esc)

---

## 🔒 Business Rules

**Reschedule Rules:**
1. **Time slot validation**: New time slot must be available in Consultant's calendar
2. **Minimum notice**: System should warn if rescheduling with < 24 hours notice
3. **Family availability**: Ideally check if new time works for family (future enhancement)
4. **Multiple reschedules**: Track number of reschedules (for analytics, no hard limit in MVP)

**Cancellation Rules:**
1. **Mandatory reason**: Consultant must provide cancellation reason (min 10 characters)
2. **24-hour policy**: If cancelling < 24 hours before consultation:
   - Show warning message
   - Still allow cancellation (policy enforcement is future enhancement)
3. **Refund handling**: Cancellation triggers refund process (handled by payment service)
4. **Historical record**: Cancelled consultations remain in history with "Cancelled" status

**Authorization:**
- **Who can perform actions**: Only the Consultant who owns the consultation
- **Who can view menu**: Only the consultation owner sees three-dot menu on their consultations
- **System validation**: Backend validates Consultant ID matches consultation owner

**Edge Cases:**
- **Consultation already started**: If current time > consultation start time, disable "Reschedule" and show "Mark as Completed" instead
- **Consultation in < 1 hour**: Show warning before reschedule ("Consultation starts soon. Family may not see reschedule in time")
- **Network failure during action**: Show error message, allow retry, consultation remains unchanged
- **Family already cancelled**: If family cancelled first, Consultant sees status but cannot reschedule/cancel

---

## 🎨 Design & UX

**User Flow:**

**Reschedule Flow:**
1. User hovers over consultation card
2. Three-dot menu appears in top-right corner
3. User clicks three-dot menu → dropdown opens
4. User clicks "Reschedule" → modal opens
5. User sees current date/time, selects new date/time from calendar picker
6. User clicks "Confirm Reschedule"
7. System validates availability
8. Success message → modal closes → dashboard refreshes with updated consultation

**Cancel Flow:**
1. User hovers over consultation card
2. Three-dot menu appears in top-right corner
3. User clicks three-dot menu → dropdown opens
4. User clicks "Cancel Consultation" → confirmation modal opens
5. User enters cancellation reason (required)
6. User clicks "Confirm Cancellation"
7. System processes cancellation, notifies family
8. Success message → modal closes → consultation removed from dashboard

**View Details Flow:**
1. User clicks three-dot menu → dropdown opens
2. User clicks "View Details"
3. System navigates to consultation detail page

---

## 🧪 Test Scenarios

**Happy Path - Reschedule:**
1. Navigate to Consultant homepage dashboard
2. View upcoming consultations section
3. Hover over consultation card → three-dot menu appears
4. Click three-dot menu → dropdown opens with 3 options
5. Click "Reschedule" → modal opens
6. Select new date (tomorrow) and time (14:00)
7. Click "Confirm Reschedule"
8. Verify success message displayed
9. Verify consultation card shows new date/time
10. Verify family receives notification (check notification service logs)

**Happy Path - Cancel:**
1. Navigate to Consultant homepage dashboard
2. Hover over consultation card → click three-dot menu
3. Click "Cancel Consultation" → confirmation modal opens
4. Enter cancellation reason: "Family emergency, need to reschedule"
5. Click "Confirm Cancellation"
6. Verify success message displayed
7. Verify consultation removed from "Upcoming Consultations"
8. Verify family receives cancellation notification

**Happy Path - View Details:**
1. Navigate to Consultant homepage dashboard
2. Click three-dot menu on consultation card
3. Click "View Details"
4. Verify navigation to consultation detail page with correct consultation ID

**Negative Tests:**
1. **Reschedule with unavailable time slot:**
   - Select time slot already booked in calendar
   - System shows error: "This time slot is not available"
   - Modal remains open, user can select different time

2. **Cancel without reason:**
   - Click "Cancel Consultation"
   - Leave reason field empty
   - Click "Confirm Cancellation"
   - System shows validation error: "Cancellation reason is required"
   - Modal remains open

3. **Network failure during reschedule:**
   - Simulate network error during API call
   - System shows error message: "Failed to reschedule. Please try again."
   - Modal remains open, user can retry

4. **Unauthorized access:**
   - Attempt to access three-dot menu on consultation owned by different Consultant
   - System hides menu or shows disabled state

**Edge Cases:**
1. **Consultation already started:**
   - Current time > consultation start time
   - "Reschedule" option disabled or replaced with "Mark as Completed"

2. **Consultation in < 1 hour:**
   - Show warning in reschedule modal: "This consultation starts soon. Family may not see reschedule notification in time."
   - Allow reschedule to proceed

3. **Multiple rapid clicks:**
   - User clicks three-dot menu multiple times rapidly
   - Only one dropdown opens, no duplicate modals

4. **Consultation cancelled by family:**
   - Consultation status = "Cancelled by Family"
   - Three-dot menu still shows, but actions disabled
   - Show informational message: "This consultation was cancelled by the family"

---

## 📝 Notes

**UX Considerations:**
- Three-dot menu should be **subtle but discoverable** (light gray, becomes darker on hover)
- Dropdown should **close when clicking outside** (standard behavior)
- Modals should have **backdrop overlay** to focus attention
- Success messages should **auto-dismiss after 3 seconds**
- Loading states should show **spinner during API calls**

**Accessibility:**
- Three-dot menu must be keyboard accessible (Tab to focus, Enter to open)
- Modals must trap focus and return focus on close
- All actions must have proper ARIA labels
- Cancellation reason field must have clear error messaging for screen readers

**Performance:**
- Dashboard should not re-fetch all consultations after reschedule/cancel (optimistic update)
- Only update the affected consultation card in UI
- Background sync to ensure data consistency

---

## ❓ Open Questions

**Q: Should Consultant be able to add notes during reschedule?**
**A:** Not in MVP. Current story focuses on date/time change only. Notes can be added in future iteration.

**Q: What happens if family rejects the reschedule?**
**A:** Not in scope for this story. In MVP, reschedule is immediate (no family approval required). Family approval flow is future enhancement.

**Q: Should we show cancellation history in the three-dot menu?**
**A:** No. Cancellation history is accessible on consultation detail page. Three-dot menu is for quick actions only.

**Q: What if Consultant wants to reschedule to a time outside their usual availability?**
**A:** System should warn but allow (with disclaimer). Consultant can override their calendar availability for exceptional cases.

**Q: Should we limit number of reschedules per consultation?**
**A:** Not enforced in MVP. System tracks reschedule count for analytics. Hard limits can be added later if needed.

**Q: What notification channels for family (email, in-app, SMS)?**
**A:** Email + In-app notifications (default). SMS is future enhancement based on family notification preferences.

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-31
