# User Story: Click Consultation Card to View Details

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As a Consultant, I want to click arrow button on consultation cards to view full details  
**Epic Link:** FG-EPIC-XXX (Consultant Dashboard - Homepage)  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant,  
**I want to** click the arrow button (→) on consultation cards to view full consultation details,  
**so that** I can access complete consultation information, prepare for meetings, and manage consultation lifecycle.

---

## 🎯 Business Context

**Why is this Story important?**

**User Pain Point:**
- Consultants manage multiple consultations with different families simultaneously
- Homepage dashboard shows limited information (family, time, payment status)
- Consultants need quick access to full consultation details for preparation and management
- Without clear navigation button, consultants may not know how to access detailed view

**Business Outcome:**
- Reduces time to access consultation details from ~30 seconds to ~2 seconds
- Improves consultant productivity and meeting preparation
- Enables faster consultation lifecycle management
- Provides clear, discoverable navigation pattern

**Strategic Alignment:**
- Core navigation pattern for Advisor Portal
- Supports consultant daily workflow efficiency
- Enables effective multi-family consultation management
- Critical for consultant retention and satisfaction

---

## ✅ Acceptance Criteria

1. **Given** I am a Consultant viewing the homepage dashboard,  
   **When** I click the arrow button (→) on a consultation card in "Upcoming Consultations" section,  
   **Then** I am navigated to the consultation detail page with full consultation information displayed.

2. **Given** I am on the consultation detail page,  
   **When** I click the browser back button,  
   **Then** I return to the homepage dashboard with the same scroll position and state preserved.

3. **Given** I hover over the arrow button (→),  
   **When** the mouse cursor is over the button,  
   **Then** the button shows a hover state (visual feedback) indicating it is clickable.

4. **Given** the consultation detail page loads,  
   **When** data is retrieved,  
   **Then** full consultation information is displayed including:
   - Family name and logo
   - All participant details (not just first 2-3 avatars shown on card)
   - Complete date, time, and duration
   - Service type and description
   - Payment status with amount
   - Consultation agenda/notes
   - Consultation status (Scheduled, In Progress, Completed, Cancelled)
   - Action buttons (Reschedule, Cancel, Edit, Mark Complete)

5. **Given** a consultation card has a three-dot menu,  
   **When** I click on the three-dot menu icon,  
   **Then** a dropdown menu opens with actions (Reschedule, Cancel) WITHOUT navigating to detail page.

6. **Given** I click on other parts of the consultation card (title, family name, badges, participant avatars),  
   **When** the click occurs,  
   **Then** NO navigation happens (only arrow button triggers navigation).

**Additional Criteria:**
- [ ] Arrow button is clearly visible and distinguishable as navigation element
- [ ] Loading state shown during navigation (spinner or skeleton)
- [ ] Error handling if consultation_id is invalid or consultation deleted
- [ ] Keyboard navigation support (Tab to arrow button, Enter key navigates)
- [ ] Screen reader announces arrow button as "View details" or similar

---

## 🔒 Business Rules

**Navigation Rules:**
1. **Clickable Element**: ONLY the arrow button (→) in the top-right corner of consultation card triggers navigation to detail page

2. **Non-Clickable Areas**: The following elements do NOT trigger navigation:
   - Consultation title ("Constitution Workshop")
   - Family name ("Roys Family")
   - Payment status badges ("Paid", "Scheduled")
   - Participant avatars and names
   - Date and time information
   - Card background

3. **Three-Dot Menu Behavior**:
   - Click on three-dot icon → dropdown menu appears
   - Menu contains actions: "Reschedule", "Cancel"
   - Menu click does NOT navigate to detail page
   - Clicking outside menu closes it

**Authorization:**
- **Who can perform this action:** Consultants who have active association with the family related to the consultation
- **Who can view results:** Only the consultant associated with this consultation (multi-tenant data isolation enforced)

**Edge Cases:**
- **Consultation deleted after page load**: Show error message "Consultation not found" on detail page
- **Consultation cancelled**: Still navigable, detail page shows "Cancelled" status
- **Consultation completed**: Still navigable, detail page shows read-only view with completion details
- **Invalid consultation_id in URL**: Show 404 error page with link back to dashboard
- **No permission to view consultation**: Show 403 error "You don't have access to this consultation"

---

## 🎨 Design & UX

**User Flow:**
1. Consultant lands on homepage dashboard
2. Scrolls to "Upcoming Consultations" section (or sees it above fold)
3. Identifies consultation of interest by family name, time, or payment status
4. Locates arrow button (→) in top-right corner of consultation card
5. Hovers over arrow button → sees hover state (color change, cursor pointer)
6. Clicks arrow button
7. Brief loading state (< 500ms)
8. Navigation to consultation detail page
9. Detail page loads with full consultation data
10. Consultant reviews details, performs actions, or clicks back button
11. Returns to homepage dashboard in same state

**Visual Feedback:**
- **Arrow Button Hover State**: 
  - Button background color change (subtle highlight)
  - Cursor changes to pointer
  - Optional: arrow icon slight movement to right
  
- **Arrow Button Click State**: 
  - Brief "pressed" visual feedback
  - Loading indicator appears (spinner or progress bar)
  
- **Arrow Button Focus State** (keyboard navigation): 
  - Clear focus ring around button
  - High contrast outline for accessibility

---

## 🧪 Test Scenarios

**Happy Path:**
1. Navigate to homepage dashboard as Consultant
2. Locate consultation card in "Upcoming Consultations" (e.g., "Constitution Workshop" with Roys Family)
3. Click arrow button (→) in top-right corner
4. Verify navigation to consultation detail page occurs
5. Verify detail page loads with:
   - Correct family name and logo ("Roys Family")
   - All participants listed (Shiv Roy, Kendal Roy, and 3 more - full list shown)
   - Full date/time display ("15 July · 06:00 — 07:00 PM")
   - Service type ("Constitution Workshop")
   - Payment status ("Paid")
   - Action buttons visible
6. Click browser back button
7. Verify return to homepage dashboard
8. Verify same scroll position maintained

**Negative Tests:**

1. **Click on Non-Arrow Areas:**
   - Click on consultation title ("Constitution Workshop")
   - Verify NO navigation occurs
   - Click on family name ("Roys Family")
   - Verify NO navigation occurs
   - Click on badges ("Paid", "Scheduled")
   - Verify NO navigation occurs
   - Click on participant avatars
   - Verify NO navigation occurs
   - Click on date/time
   - Verify NO navigation occurs

2. **Invalid Consultation ID:**
   - Manually enter URL with non-existent consultation ID
   - Verify 404 error page displays
   - Verify error message: "Consultation not found"
   - Verify "Return to Dashboard" link present

3. **Unauthorized Access:**
   - Attempt to access consultation from different consultant's family
   - Verify 403 error page displays
   - Verify error message: "You don't have access to this consultation"

4. **Deleted Consultation:**
   - Click arrow button for consultation that was deleted after page load
   - Verify error message on detail page
   - Verify graceful error handling

5. **Three-Dot Menu Click:**
   - Click on three-dot menu icon
   - Verify dropdown menu opens with "Reschedule" and "Cancel" options
   - Verify NO navigation to detail page occurs
   - Click outside menu
   - Verify menu closes

**Edge Cases:**

1. **Slow Network:**
   - Simulate slow 3G connection
   - Click arrow button
   - Verify loading indicator appears immediately
   - Verify page doesn't become unresponsive
   - Verify detail page eventually loads (timeout: 10 seconds)

2. **Keyboard Navigation:**
   - Use Tab key to focus arrow button (→)
   - Press Enter key
   - Verify navigation occurs (same as mouse click)

3. **Screen Reader:**
   - Enable screen reader (NVDA/JAWS)
   - Navigate to arrow button using Tab
   - Verify button announced as "View consultation details" or "View details button"
   - Press Enter
   - Verify navigation occurs

4. **Multiple Rapid Clicks on Arrow:**
   - Click arrow button multiple times rapidly
   - Verify only ONE navigation occurs
   - Verify no duplicate pages opened

5. **Touch Target (Mobile):**
   - Use mobile device or DevTools mobile emulation
   - Verify arrow button is easily tappable (44x44px minimum)
   - Verify no accidental clicks on adjacent elements

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Navigation should occur within 500ms of arrow button click
- Detail page should load within 2 seconds on average connection
- No perceptible lag on hover state transitions

**Security:**
- Authorization required: Yes (Consultant must have association with family)
- Data encryption: Yes (consultation data transmitted over HTTPS)
- PII handling: Yes (participant names, contact info must be encrypted at rest)
- Multi-tenant isolation: CRITICAL - consultant can ONLY access consultations from associated families

**Accessibility:**
- WCAG 2.1 AA compliance required
- Keyboard navigation support (Tab to button, Enter to activate)
- Screen reader support (ARIA label: "View consultation details")
- Focus indicators visible with 3:1 contrast ratio
- Touch target size minimum 44x44px (mobile)
- Button must have accessible name and role

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Edge: Latest version
- Mobile Safari (iOS): Latest version
- Chrome Mobile (Android): Latest version

**Other:**
- URL must be shareable and bookmarkable
- Browser history preserved (back button works)
- Deep linking supported (direct URL access)

---

## 📝 Notes

**Assumptions:**
- Consultation detail page already exists or is being developed in parallel (Consultations Epic EPIC-013)
- Consultation ID is stable identifier (not changed during consultation lifecycle)
- Homepage dashboard API provides consultation_id in card data
- Multi-tenant data isolation enforced at API level (consultant_id → family associations → consultations)
- Arrow button design follows platform design system

**Design Clarification:**
- Arrow button (→) is the ONLY clickable element for navigation
- Other card elements (title, family name, badges) are informational only
- This pattern prevents accidental navigation and makes action explicit

**Interaction with Three-Dot Menu (Story #9):**
- This story handles arrow button click (navigation)
- Story #9 (separate) handles three-dot menu functionality (Reschedule, Cancel actions)
- Both buttons are clearly separated in top-right corner

**Related User Stories:**
- Story #3: Display upcoming consultation cards (provides the cards)
- Story #9: Access consultation actions via three-dot menu (complementary action)
- Consultations Epic stories: Consultation detail page, consultation management

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-31  
**Story Status:** Ready for Grooming
