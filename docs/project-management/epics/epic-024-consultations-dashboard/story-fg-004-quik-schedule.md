# User Story: Quick Schedule Consultation from Dashboard

> **FG-XXX** - Quick Action for Scheduling Consultations

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As a Consultant, I want to schedule consultations via "+ Schedule Consultation" button on dashboard, so that I can add bookings without navigating away  
**Epic Link:** FG-EPIC-017 (Consultations Dashboard)  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant (DOC-USR-006),  
**I want to** quickly schedule new consultations using the "+ Schedule Consultation" button in the dashboard sidebar,  
**so that** I can add bookings efficiently without leaving the consultations overview, maintaining context and workflow continuity.

---

## 🎯 Business Context

**Why is this Story important?**

Currently, consultants must navigate to separate sections or complex menus to create new consultation bookings, which disrupts their workflow when managing multiple family engagements. This creates friction in the booking process and reduces efficiency.

**User pain point being solved:**
- Time wasted navigating between dashboard and booking creation pages
- Loss of context when leaving consultations overview
- Cognitive overhead of remembering to schedule after reviewing dashboard
- Multiple clicks and page loads to accomplish simple task

**Business outcome expected:**
- Faster consultation scheduling (target: reduce booking creation time by 40%)
- Increased booking volume (easier to add consultations opportunistically)
- Improved consultant satisfaction with platform workflow
- Better dashboard engagement (users stay on primary screen longer)

**Strategic alignment:**
- Supports Consultant productivity and portfolio growth goals
- Enhances Advisor Portal usability as key competitive differentiator
- Aligns with "Quick Actions" design pattern across platform
- Reduces friction in consultant-family engagement cycle

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** Consultant is viewing Consultations Dashboard,  
   **When** they look at the right sidebar "Quick Actions" section,  
   **Then** they see a prominent "+ Schedule Consultation" button displayed.

2. **Given** Consultant clicks "+ Schedule Consultation" button,  
   **When** the action is triggered,  
   **Then** a consultation scheduling interface opens (modal or dedicated page based on EPIC-013 booking flow design).

3. **Given** Consultant completes the consultation booking form with valid data (family, service type, date/time, duration),  
   **When** they submit the form successfully,  
   **Then** the consultation is created and the Consultant returns to the Consultations Dashboard.

4. **Given** Consultant just created a new consultation and returned to dashboard,  
   **When** the dashboard reloads/refreshes,  
   **Then** the newly created consultation appears in the "Upcoming" tab with correct details (family name, date, service type, status "Scheduled").

5. **Given** Consultant just created a new consultation,  
   **When** the dashboard displays overview metrics,  
   **Then** "Total consultations" count increases by 1 AND "Upcoming sessions" count increases by 1.

6. **Given** Consultant clicks "+ Schedule Consultation" button but cancels/closes the booking interface without completing,  
   **When** they return to dashboard,  
   **Then** no new consultation is created, metrics remain unchanged, and dashboard state is preserved (same tab, filters, scroll position).

**Additional Criteria:**
- [ ] Button is visually distinct with clear CTA styling (color, icon, label)
- [ ] Button remains accessible and visible regardless of dashboard scroll position (sticky sidebar or always visible in viewport)
- [ ] Loading state shown during consultation creation (prevent double-submission)
- [ ] Success confirmation message displayed after consultation created ("Consultation scheduled successfully")
- [ ] If booking flow has validation errors, Consultant sees clear error messages and can correct without losing entered data

---

## 🔑 Business Rules

**Validation Rules:**
1. **Family Selection Required:** Consultant must select a family they are associated with (cannot schedule for families not in their portfolio)
2. **Service Type Mandatory:** Must select a service type from Consultant's published service catalog
3. **Date/Time Availability:** Selected slot must be within Consultant's available hours (no double-booking)
4. **Minimum Lead Time:** Cannot schedule consultations less than 2 hours in the future (configurable)
5. **Duration Limits:** Consultation duration must match service catalog offerings (e.g., 30min, 1hr, 2hrs sessions)

**Authorization:**
- **Who can perform this action:** Only users with Consultant role (DOC-USR-006)
- **Who can view results:** Consultant who created the booking, associated family members (Family Council sees bookings on their side)

**Status & Workflow:**
- New consultations created via Quick Action start with status "Scheduled" (not "Pending Approval" - assumes instant confirmation)
- Consultation immediately appears in "Upcoming" tab
- Metrics update in real-time (no page refresh required for dashboard updates)
- Family receives notification about new scheduled consultation (Email + In-App)

**Edge Cases:**
- **No available time slots:** If Consultant has no availability in calendar, show message "Please configure your availability first" with link to Calendar settings
- **Family not selected:** If Consultant hasn't associated with any families yet, show message "You need at least one family client to schedule consultations" with link to Marketplace or family invitation instructions
- **Service catalog empty:** If Consultant hasn't published any services, show warning "Please create service offerings before scheduling" with link to Service Catalog management

---

## 🎨 Design & UX

**User Flow:**

**Happy Path - Successful Scheduling:**
1. Consultant navigates to Consultations Dashboard (main view loaded)
2. Reviews current consultations and metrics in main area
3. Looks at right sidebar → sees "Quick Actions" section with "+ Schedule Consultation" button
4. Clicks button → booking interface opens (modal overlay OR dedicated page - design decision pending)
5. Fills out form:
   - Selects family from dropdown (filtered to Consultant's associated families)
   - Selects service type from dropdown (Consultant's service catalog)
   - Picks date from calendar widget (shows Consultant's availability)
   - Selects time slot from available options
   - Optionally adds notes/description
6. Clicks "Schedule" / "Confirm" button
7. System validates inputs → shows loading spinner
8. Success: Modal closes OR redirects to dashboard
9. Dashboard refreshes → sees success message banner "Consultation scheduled with [Family Name] on [Date]"
10. New consultation card appears at top of "Upcoming" tab
11. Metrics update: Total consultations +1, Upcoming sessions +1

**Cancellation Flow:**
1. Steps 1-5 same as happy path
2. Consultant clicks "Cancel" or closes modal (X button)
3. Confirmation prompt: "Discard changes? Your consultation won't be scheduled."
4. Clicks "Yes, discard" → returns to dashboard, no changes made
5. Clicks "No, continue editing" → stays in booking form

**Error Handling Flow:**
1. Steps 1-6 same as happy path
2. System validates inputs → finds errors (e.g., time slot no longer available)
3. Error message displays: "This time slot is no longer available. Please select another time."
4. Form remains open with entered data preserved
5. Consultant corrects error and resubmits
6. Proceeds to success path

**UI Elements & Interactions:**
- **Button Design:** 
  - Primary CTA styling (likely blue/green button with + icon)
  - Clear label: "+ Schedule Consultation" or "New Consultation"
  - Fixed position in sidebar (always visible)
  
- **Booking Interface Options:**
  - **Option A (Modal):** Overlay modal with form, dims background, focus locked
  - **Option B (Dedicated Page):** Navigates to `/consultations/new` page, back button returns to dashboard
  
- **Form Layout:**
  - Vertical form with clear labels and helper text
  - Dropdowns for family and service type (searchable if many options)
  - Calendar widget for date selection (shows availability visually)
  - Time slot picker (shows available times only)
  - Notes field (optional, multi-line textarea)
  
- **Success Feedback:**
  - Toast notification or banner message
  - Auto-dismisses after 5 seconds
  - Green checkmark icon with confirmation text

---

## 🧪 Test Scenarios

**Happy Path:**
1. Login as Consultant with at least 2 associated families and 3+ service offerings
2. Navigate to Consultations Dashboard → verify page loads with tabs and sidebar
3. Locate "+ Schedule Consultation" button in right sidebar "Quick Actions" section → verify button is visible and clickable
4. Click button → verify booking interface opens (modal OR new page)
5. Select "Anderson Family" from family dropdown → verify dropdown populates with associated families only
6. Select "Succession Planning Workshop (2 hours)" from service type dropdown → verify service catalog loads correctly
7. Click date field → calendar widget opens showing next 30 days
8. Select date 5 days from now → calendar closes, date field shows selected date
9. Time slot picker shows available times (e.g., 10:00 AM, 2:00 PM, 4:00 PM) → select "2:00 PM"
10. Add optional notes: "Please prepare family tree documents"
11. Click "Schedule Consultation" button → loading spinner appears
12. Success → dashboard reloads/refreshes (2-3 second transition)
13. **Verify:** Success message displays "Consultation scheduled with Anderson Family on [Date]"
14. **Verify:** New consultation card appears in "Upcoming" tab with:
    - Family name: Anderson Family
    - Service: Succession Planning Workshop
    - Date: [Selected date]
    - Time: 2:00 PM
    - Status: Scheduled
15. **Verify:** Metrics update:
    - "Total consultations" increased by 1
    - "Upcoming sessions" increased by 1
16. **Verify:** Consultation visible only to this Consultant and Anderson Family members

**Negative Tests:**

**Test 1: Invalid Time Slot (Double Booking)**
1. Follow happy path steps 1-8
2. Attempt to select time slot that overlaps with existing consultation (e.g., 2:00 PM when consultant has 1:30 PM - 3:00 PM session)
3. **Expected:** Time slot is disabled/grayed out in picker OR shows warning "Not available - conflicts with existing consultation"
4. **Expected:** Cannot submit form until valid time selected

**Test 2: Form Cancellation**
1. Follow happy path steps 1-7
2. Click "Cancel" button OR close modal (X icon)
3. **Expected:** Confirmation prompt appears: "Discard changes? Your consultation won't be scheduled."
4. Click "Yes, discard"
5. **Expected:** Returns to dashboard, no new consultation created, metrics unchanged, no success message
6. **Verify:** Dashboard state preserved (same tab selected, scroll position maintained)

**Test 3: Unauthorized User (Non-Consultant)**
1. Login as Family Member (not Consultant role)
2. Navigate to Family Portal (not Advisor Portal)
3. **Expected:** "+ Schedule Consultation" button does NOT appear (Consultants-only feature)
4. **Alternative:** If accessing Advisor Portal URL directly, redirect to appropriate user interface

**Test 4: Consultant with No Families**
1. Login as newly registered Consultant with no family associations yet
2. Navigate to Consultations Dashboard → empty state shows
3. Click "+ Schedule Consultation" button
4. **Expected:** Modal opens with warning message: "You need at least one family client to schedule consultations"
5. **Expected:** Family dropdown is empty OR disabled
6. **Expected:** Button or link provided: "Find families in Marketplace" → links to marketplace discovery

**Test 5: Network Error During Submission**
1. Follow happy path steps 1-11
2. Simulate network failure during submission
3. **Expected:** Error message displays: "Failed to schedule consultation. Please check your connection and try again."
4. **Expected:** Form data preserved (don't lose entered information)
5. **Expected:** "Retry" button available to resubmit without re-entering data

**Edge Cases:**

**Edge Case 1: Consultant at Availability Limit**
1. Consultant has fully booked calendar (no available slots in next 30 days)
2. Click "+ Schedule Consultation" button → modal opens
3. Select family and service type
4. Click date field → calendar widget shows all dates grayed out with message "No availability"
5. **Expected:** Cannot proceed with booking
6. **Expected:** Helper text displays: "Your calendar is fully booked. Please add availability or cancel existing consultations to schedule new sessions."
7. **Expected:** Link to Calendar settings: "Manage Availability"

**Edge Case 2: Rapid Multiple Submissions (Double-Click Prevention)**
1. Follow happy path steps 1-11
2. Double-click "Schedule Consultation" button rapidly (< 500ms between clicks)
3. **Expected:** Only ONE consultation created (not duplicate)
4. **Expected:** Button disabled during submission (loading state prevents re-clicks)
5. **Verify:** Metrics increase by 1 only, not 2

**Edge Case 3: Browser Back Button After Scheduling**
1. Complete happy path successfully (consultation scheduled)
2. Press browser back button
3. **Expected:** If modal-based: returns to dashboard (same as success)
4. **Expected:** If page-based: navigates back to dashboard, shows same success state
5. **Expected:** Does NOT re-open booking form or attempt re-submission
6. **Verify:** No duplicate consultation created

---

## ⚠️ Non-Functional Requirements

**Performance:**
- Button click → booking interface opens in < 300ms
- Form submission → success response in < 2 seconds (p95)
- Dashboard refresh after creation → new consultation visible in < 1 second
- Metrics update without full page reload (optimistic UI updates acceptable)

**Security:**
- User session must be valid (authenticated as Consultant)
- CSRF protection on form submission
- Family dropdown only shows families associated with current Consultant (server-side filtering enforced)
- Cannot schedule consultations for other Consultants' families (authorization check)

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions  
- Firefox: Latest 2 versions
- Edge: Latest version
- Mobile browsers: iOS Safari, Chrome Android (responsive design)

**Accessibility:**
- Keyboard navigation: Tab through form fields, Enter to submit, Escape to cancel modal
- Screen reader support: ARIA labels for all form inputs, success/error announcements
- Focus management: Focus returns to "+ Schedule Consultation" button after cancellation
- Color contrast: WCAG 2.1 AA compliance for all text and interactive elements
- Error messages read aloud by screen readers

**Other:**
- Form data persists if user navigates away accidentally (session storage) for 30 minutes
- Time slots display in Consultant's local timezone (auto-detected or configurable in settings)
- Date picker defaults to "today + 2 days" (respects minimum lead time business rule)
- Success message auto-dismisses after 5 seconds but can be manually closed
- Mobile responsive: Touch-friendly button size (min 44×44px), full-screen modal on small screens

---

## 📝 Notes

**Key Design Decisions Referenced from Epic Chat:**

1. **Modal vs. Dedicated Page:** Design will determine whether booking interface is a modal overlay (keeps user on dashboard) or dedicated page (navigates to /consultations/new). Modal preferred for "Quick Action" pattern but may be limiting for complex booking flows.

2. **Integration with EPIC-013:** This story leverages the Service Request Lifecycle booking flow (EPIC-013). Exact form fields, validation logic, and workflow steps defined in that epic. This story focuses on entry point (button) and return experience (dashboard updates).

3. **Real-time Updates:** Dashboard should update optimistically (show new consultation immediately) with background sync to prevent perceived latency.

**Assumptions:**
- Consultant has completed profile setup (service catalog published, availability configured)
- Consultant is associated with at least one family OR appropriate empty state guidance provided
- Calendar & Availability service (EPIC-010) is operational and returns accurate availability data
- Notification service sends confirmation to family after Consultant schedules (handled separately)

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-27  
**Story Status:** Ready for Grooming
