# User Story: Quick Actions Sidebar for Consultant Dashboard

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As a Consultant, I want to access quick action shortcuts (schedule, message, knowledge center), so that I can perform common tasks without navigating away from dashboard  
**Epic Link:** FG-EPIC-XXX [Consultant Dashboard - Homepage]  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant,  
**I want to** access quick action shortcuts (schedule consultation, send message, knowledge center) from dashboard sidebar,  
**so that** I can quickly perform common tasks without navigating away from my dashboard and losing context.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point being solved:**
- Consultants currently need to navigate through multiple pages to perform frequent actions (scheduling, messaging, accessing resources)
- Context loss when leaving dashboard to perform simple tasks
- Time wasted on repetitive navigation for routine operations

**Business outcome expected:**
- Increased consultant productivity by reducing clicks for common tasks
- Improved user experience through faster access to key functionality
- Higher consultant satisfaction with platform efficiency
- Reduced time-to-action for scheduling and communication

**Strategic alignment:**
- Supports Consultant persona's need for efficient multi-family management
- Aligns with dashboard goal of centralizing critical functionality
- Enhances platform stickiness through improved UX

---

## ✅ Acceptance Criteria

1. **Given** Consultant is viewing dashboard homepage,  
   **When** page loads,  
   **Then** Quick Actions sidebar is visible on the right side of the screen with 3 action buttons: "Schedule a consultation", "Send message", "Knowledge center"

2. **Given** Consultant is on dashboard,  
   **When** Consultant clicks "Schedule a consultation" button,  
   **Then** consultation scheduling flow opens (modal or new view)

3. **Given** Consultant is on dashboard,  
   **When** Consultant clicks "Send message" button,  
   **Then** message composer opens with ability to select recipient family

4. **Given** Consultant is on dashboard,  
   **When** Consultant clicks "Knowledge center" button,  
   **Then** system navigates to Knowledge Center page

5. **Given** Consultant scrolls down on dashboard,  
   **When** Quick Actions sidebar reaches top of viewport,  
   **Then** sidebar remains visible (sticky positioning) OR scrolls naturally with page (to be confirmed in design)

**Additional Criteria:**
- [ ] All 3 quick action buttons are always enabled (no conditional visibility or disabled states in MVP)
- [ ] Quick Actions sidebar is visually distinct from main dashboard content
- [ ] Buttons have clear icons and labels for each action
- [ ] Buttons have hover states indicating they are clickable
- [ ] Quick Actions section works responsively on tablet and desktop
- [ ] On mobile, Quick Actions appear below main content (not as sticky sidebar)

---

## 🔒 Business Rules

**Access Control:**
1. **Consultant-Only Feature**: Quick Actions sidebar is ONLY visible to users with `role = CONSULTANT` or `role = PREMIUM_CONSULTANT`
2. **No Permission Checks**: All 3 actions are always available to any Consultant (no further permission validation in MVP)

**Visibility Rules:**
3. **Always Visible**: Quick Actions sidebar is always displayed when dashboard loads (no conditional hiding)
4. **All Actions Enabled**: All 3 buttons are always enabled, no disabled states based on data availability

**Navigation Behavior:**
5. **Schedule Consultation**: Opens scheduling flow without leaving dashboard (modal/overlay preferred)
6. **Send Message**: Opens message composer without leaving dashboard (modal/overlay preferred)
7. **Knowledge Center**: Navigates away from dashboard to Knowledge Center page (full page navigation)

**Edge Cases:**
8. **Zero State - No Families**: Even if Consultant has 0 family clients, all Quick Actions remain enabled. "Schedule consultation" and "Send message" flows will handle family selection or show appropriate "No families yet" messages
9. **Zero State - No Services**: "Schedule consultation" remains enabled even if Consultant has 0 services configured

---

## 📐 Design & UX

**User Flow:**

**Flow 1: Schedule Consultation**
1. Consultant views dashboard
2. Consultant clicks "Schedule a consultation" in Quick Actions
3. Modal/overlay opens with consultation scheduling form
4. Consultant completes scheduling
5. Consultant remains on dashboard, consultation appears in "Upcoming Consultations" section

**Flow 2: Send Message**
1. Consultant views dashboard
2. Consultant clicks "Send message" in Quick Actions
3. Message composer modal opens
4. Consultant selects recipient family and writes message
5. Consultant sends message
6. Confirmation shown, Consultant remains on dashboard

**Flow 3: Knowledge Center**
1. Consultant views dashboard
2. Consultant clicks "Knowledge center" in Quick Actions
3. Browser navigates to Knowledge Center page (full page navigation)
4. Consultant can return to dashboard via back button or navigation menu

---

## 🧪 Test Scenarios

**Happy Path:**

**Scenario 1: Access Quick Actions**
1. Login as Consultant
2. Navigate to dashboard homepage
3. Verify Quick Actions sidebar is visible on right side
4. Verify all 3 buttons are present and enabled: "Schedule a consultation", "Send message", "Knowledge center"
5. Verify buttons have clear icons and labels

**Scenario 2: Schedule Consultation Action**
1. Login as Consultant with at least 1 family client
2. On dashboard, click "Schedule a consultation"
3. Verify scheduling flow opens (modal/overlay)
4. Verify Consultant can select family, service, date/time
5. Complete scheduling
6. Verify Consultant remains on dashboard
7. Verify new consultation appears in "Upcoming Consultations"

**Scenario 3: Send Message Action**
1. Login as Consultant with at least 1 family client
2. On dashboard, click "Send message"
3. Verify message composer opens
4. Verify Consultant can select recipient family
5. Write and send message
6. Verify Consultant remains on dashboard
7. Verify sent message appears in conversation history

**Scenario 4: Knowledge Center Action**
1. Login as Consultant
2. On dashboard, click "Knowledge center"
3. Verify browser navigates to Knowledge Center page
4. Verify Knowledge Center content loads correctly

**Negative Tests:**

**Scenario 1: Non-Consultant Access**
1. Login as Family Member
2. Attempt to access Consultant dashboard URL
3. Verify redirect to appropriate portal (Family Portal)
4. Verify Quick Actions sidebar NOT visible

**Scenario 2: Zero State - No Families**
1. Login as new Consultant with 0 family clients
2. Navigate to dashboard
3. Verify Quick Actions sidebar is visible
4. Click "Schedule a consultation"
5. Verify scheduling flow opens with message "No families yet. Connect with families in Marketplace"
6. Click "Send message"
7. Verify message composer shows "No families to message. Connect with families first"

**Edge Cases:**

**Scenario 1: Mobile Responsiveness**
1. Login as Consultant on mobile device (or responsive view)
2. Navigate to dashboard
3. Verify Quick Actions appear below main dashboard content (not as sticky sidebar)
4. Verify all 3 buttons are accessible and clickable
5. Click each button and verify expected behavior

**Scenario 2: Scroll Behavior**
1. Login as Consultant
2. Dashboard with enough content to scroll
3. Scroll down on dashboard
4. Verify Quick Actions sidebar behavior (sticky OR scrolls with content - to be confirmed)
5. Verify buttons remain accessible throughout scroll

---

## ⚠️ Non-Functional Requirements

**Security:**
- Authorization required: Yes (Consultant role only)
- Data encryption: N/A (no data stored in this component)
- PII handling: No

**Performance:**
- Quick Actions sidebar must render within 100ms of dashboard load
- Button click response time < 50ms
- Modal/overlay open time < 200ms

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Mobile

**Accessibility:**
- All buttons must have proper ARIA labels
- Keyboard navigation support (Tab, Enter to activate)
- Focus indicators visible on all interactive elements
- Screen reader compatible button labels

---

## 📝 Notes

**Integration Notes:**
- "Schedule a consultation" opens existing consultation scheduling flow (separate epic/story)
- "Send message" opens existing message composer (separate epic/story)
- "Knowledge center" navigates to existing Knowledge Center page

**Assumptions:**
- Consultation scheduling flow and message composer already exist or are in parallel development
- Knowledge Center page exists and is accessible to Consultants
- Dashboard layout accommodates right sidebar without compromising main content readability

---

## ❓ Open Questions

**Q1: Should Quick Actions sidebar be sticky (fixed position) or scroll with content?**
- **Answer from Epic**: To be confirmed in design, but likely sticky for constant accessibility

**Q2: What happens when Consultant clicks "Schedule consultation" but has no services configured?**
- **Answer from Epic**: Button remains enabled. Scheduling flow will show "Add services to your catalog first" message

**Q3: Should "Send message" pre-select last contacted family or show family selector?**
- **Answer**: Show family selector for flexibility (confirmed in Epic discussion)

**Q4: On mobile, where exactly do Quick Actions appear?**
- **Answer**: Below main dashboard content, as horizontal row or stacked buttons (design to confirm)

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-31
