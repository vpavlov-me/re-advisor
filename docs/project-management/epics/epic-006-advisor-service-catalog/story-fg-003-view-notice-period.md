# User Story 3: View Current Notice Period During Service Creation

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Consultant, I want to see current notice period when creating service with quick access to change it
**Epic Link:** EPIC-006 - Advisor Service Catalog & Package Builder
**Priority:** Medium
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant,
**I want to** see my current notice period setting displayed during service creation flow with quick access link to change it,
**so that** I can adjust my operational policy if needed without abandoning service creation and losing my work.

---

## 🎯 Business Context

**Why is this Story important?**

Advisors may realize during service creation that their notice period needs adjustment for the specific service they're creating. Rather than forcing them to abandon the flow, navigate to settings, change policies, and restart service creation, this provides convenient access to adjust policies mid-flow.

**User pain point being solved:**
- Advisors forget what notice period they configured
- Creating new service type (e.g., mediation requiring shorter notice) reveals need to adjust policies
- Current flow forces abandoning service creation to change policies elsewhere

**Business outcome expected:**
- Reduce service creation abandonment rate
- Improve advisor experience with convenient policy management
- Increase service creation completion rate

**Strategic alignment:**
- Removes friction from service creation flow
- Supports advisor autonomy and self-service
- Enhances UX consistency with progressive disclosure pattern

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** advisor is in service creation flow after configuring service details and pricing,
   **When** advisor reaches session duration configuration step,
   **Then** system displays current notice period setting prominently: "Minimum notice period: 48 hours (from your service policies)" with visual emphasis (e.g., info box or highlighted text).

2. **Given** advisor sees current notice period display during service creation,
   **When** display appears,
   **Then** system includes clickable link/button labeled "Change Settings" or "Edit Policies" immediately adjacent to notice period display.

3. **Given** advisor clicks "Change Settings" link during service creation,
   **When** link is clicked,
   **Then** system opens service policies modal (same as Story 2) overlaying service creation form without closing or losing current form data.

4. **Given** advisor changes service policies from within service creation flow,
   **When** advisor saves policy changes in modal,
   **Then** system closes policies modal, returns to service creation form with all previous data intact, and updates displayed notice period to new value.

5. **Given** advisor cancels policy changes from within service creation flow,
   **When** advisor clicks Cancel in policies modal,
   **Then** system closes modal, returns to service creation form with all data intact, and continues showing previous notice period setting.

6. **Given** advisor has not yet configured service policies and attempts to create first service,
   **When** advisor reaches session duration step,
   **Then** system displays message: "Service policies not configured. Configure your minimum notice period and capacity settings" with prominent button to open policies configuration.

7. **Given** advisor configures policies for first time from within service creation flow,
   **When** policies are saved,
   **Then** system returns to service creation flow, displays newly configured notice period, and allows advisor to continue creating service.

**Additional Criteria:**
- [ ] Notice period display uses consistent formatting across platform (e.g., "48 hours" not "2 days" to match policies configuration)
- [ ] "Change Settings" link is visually distinct (underlined, different color) to indicate it's clickable
- [ ] Tooltip or help icon explains why notice period matters for this service
- [ ] Mobile responsive: notice period display and change link work well on small screens

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Figma: [Link to service creation with policy display - to be added]
- Screenshot: [To be attached]

**User Flow:**
1. Advisor is creating service, completes service type, details, pricing
2. Reaches session duration configuration step
3. Below session duration input, sees info box: 
   - Icon (ℹ️) + "Minimum notice period: 48 hours (from your service policies)"
   - Adjacent: "[Change Settings]" link in blue/underlined
4. Advisor clicks "[Change Settings]" link
5. Service policies modal opens overlaying service creation form (form dimmed in background)
6. Modal shows current policies: Notice period = "48 hours", Max clients = 5
7. Advisor changes notice period to "24 hours"
8. Clicks "Save Policies"
9. Modal closes with animation
10. Service creation form returns to focus, info box now shows: "Minimum notice period: 24 hours (from your service policies)"
11. Advisor continues with service creation using new policy

**Alternative Flow - First Time Setup:**
1. New advisor creating first service reaches session duration step
2. Sees warning box: "⚠️ Service policies not configured. Configure your minimum notice period and capacity settings before activating services."
3. Large button: "Configure Service Policies Now"
4. Advisor clicks button → policies modal opens
5. Advisor configures policies, saves
6. Returns to service creation with policies now displayed

---

## 🔐 Business Rules

**Validation Rules:**
1. **Display trigger**: Notice period display appears at session duration configuration step (after pricing, before preview)
2. **Link behavior**: "Change Settings" link opens policies modal without navigating away from service creation
3. **Form preservation**: All service creation form data must persist when policies modal opens/closes
4. **Auto-save**: Service creation form data optionally auto-saved when policies modal opens (to prevent data loss if browser crashes)
5. **Policy changes propagation**: New policy settings immediately reflected in service creation form upon modal close
6. **Consistency**: Notice period display formatting matches policies configuration modal exactly

**Authorization:**
- **Who can perform this action:** Any advisor in service creation flow (same permissions as service creation)
- **Who can view results:** Only advisor creating service sees this display

**Edge Cases:**
- **Advisor clicks "Change Settings" rapidly multiple times**: System prevents multiple modals opening (disable link until modal loads)
- **Advisor changes policies but cancels service creation**: Policy changes persist (they're global settings, not tied to individual service)
- **Advisor has browser tab open with policies modal, opens service creation in another tab**: Each tab operates independently, last save wins
- **Advisor's session expires while policies modal open**: System detects session expiration, closes modal, prompts re-authentication

---

## 🧪 Test Scenarios

**Happy Path:**
1. Advisor logged in, creating new "Mediation" service
2. Completes service type, name, description, pricing (Fixed Package $3000)
3. Enters session duration: 2 hours
4. Below duration input, sees: "Minimum notice period: 48 hours (from your service policies) [Change Settings]"
5. Realizes mediation needs shorter notice (conflicts are urgent)
6. Clicks "[Change Settings]" link
7. Policies modal opens showing current settings: Notice = "48 hours", Max clients = 5
8. Changes notice period to "24 hours"
9. Clicks "Save Policies"
10. Modal closes, returns to service creation
11. Display now shows: "Minimum notice period: 24 hours (from your service policies)"
12. Advisor continues to preview and saves service
13. Expected result: Service created with 24-hour notice requirement, all form data preserved

**Negative Tests:**
1. **Link clicked before form fully loaded**: System disables link until form ready, shows loading indicator
2. **Modal opened, advisor clicks outside modal**: System treats as Cancel, closes modal, returns to form with no changes
3. **Network error while saving policies**: System displays error: "Unable to save policies. Check connection and try again." Modal remains open, changes not lost
4. **Advisor changes policies but doesn't save service**: Policy changes persist globally, unsaved service data lost if navigates away (expected behavior)

**Edge Cases:**
1. **First-time advisor without policies configured**:
   - Creates first service, reaches duration step
   - Sees: "⚠️ Service policies not configured" warning instead of notice period display
   - Clicks "Configure Service Policies Now" button
   - Configures policies: Notice = "3 days", Max clients = 8
   - Saves, returns to service creation
   - Display now shows: "Minimum notice period: 3 days (from your service policies) [Change Settings]"
   - Completes service creation successfully

2. **Advisor opens multiple services for editing simultaneously**:
   - Has 3 browser tabs: Service A creation, Service B edit, Service C edit
   - Changes policies from Service A creation (48 hours → 24 hours)
   - Refreshes Service B tab → sees updated notice period (24 hours)
   - Service C tab (not refreshed) still shows old value (48 hours) until refresh

3. **Mobile device - small screen**:
   - Notice period display stacks vertically
   - "Change Settings" link moves to next line or remains inline (responsive)
   - Modal opens full-screen on mobile
   - All interactions work with touch (no hover states required)

**Test Cases Location:** `Knowledge-Base/product-management/test-cases/EPIC-ADV-SERV-001-test-cases.md`

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** 
  - FG-STORY-ADV-SERV-001 (Create Service Offering) - needs service creation form
  - FG-STORY-ADV-SERV-002 (Configure Service Policies) - needs policies modal component
- **Blocks:** None (enhancement to existing flows)

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Notice period display: Loads with form (< 50ms additional time)
- Modal open time: < 500ms
- Policy save from modal: < 1 second (same as Story 2)

**Security:**
- Authorization required: Yes (valid advisor JWT token)
- Form data preservation: Service creation data stored in browser session storage while modal open

**Accessibility:**
- WCAG level: AA compliance
- Keyboard navigation: Tab to "Change Settings" link, Enter to open modal
- Screen reader: Announces "Current notice period: 48 hours. Link: Change Settings"
- Focus management: When modal opens, focus moves to modal. When modal closes, focus returns to "Change Settings" link

**Browser Support:**
- Same as Story 1 and 2 (Chrome, Safari, Firefox, Edge latest 2 versions)
- Modal overlay uses modern CSS (backdrop-filter supported or graceful degradation)

---

## 📝 Notes

**Questions:**
- [ ] Should we show capacity status too (e.g., "3 of 5 clients") or just notice period? **Recommendation:** Notice period only for simplicity, capacity less relevant during service creation
- [ ] Do we need undo/redo for policy changes made mid-creation? **Decision:** No, policy changes are global and persist independently
- [ ] Should system warn if advisor changes notice period significantly (e.g., 1 week → same day) during service creation? **Recommendation:** Yes, reuse warning from Story 2
- [ ] Mobile UX: Should policies modal be full-screen takeover on small devices? **Decision:** Yes, improves usability on mobile

---

**Template Version:** 1.0.0
**Story Created:** 2025-10-17