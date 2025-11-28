# User Story - External Consul Dashboard Navigation

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As an External Consul, I want to navigate between my workspace modules and family governance modules using a sidebar menu, so that I can efficiently manage my consulting work and access family information in one place  
**Epic Link:** FG-XXX [External Consul - Multi-Family Client Management & Governance Dashboard]  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As an** External Consul,  
**I want to** open any family's dashboard and navigate between my workspace modules (Tasks, Messages, Service List, Meetings) and family governance modules (Constitution, Family Council, etc.) using a sidebar menu,  
**so that** I can efficiently manage my consulting activities, track service delivery and payments, and access all family governance information without switching between different interfaces.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point being solved:**
- External Consuls manage 5-15 families simultaneously and need to track their own work (tasks, communications, services, meetings) separately from family governance information
- Context switching between "my work for this family" and "family governance status" is currently inefficient
- No centralized view of service delivery status and payment tracking causes consultants to miss unpaid invoices
- Jumping between different sections requires too many clicks and mental overhead

**Business outcome expected:**
- Single unified dashboard per family combining Consul's workspace and family governance visibility
- Immediate visibility of payment status through visual alerts (unpaid invoices)
- Faster context switching between different areas of work (< 2 seconds per module switch)
- Reduced time spent navigating - more time spent on actual consulting work
- Better financial tracking of services and payments

**Strategic alignment:**
- Supports multi-family portfolio management efficiency
- Enables transparent service delivery and billing tracking
- Provides holistic view combining consultant's operations with family governance oversight
- Foundation for future cross-family analytics and reporting

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** Consul has opened a family dashboard from Families List,  
   **When** dashboard loads,  
   **Then** sidebar menu is visible on the left side with all modules organized into categories:
   - Overview (top)
   - Consul Workspace section (Tasks, Messages, Service List, Meetings)
   - GOVERNANCE section (Constitution, Family Council, Decision Making, Conflict Resolution)
   - DEVELOPMENT section (Education)
   - FAMILY AFFAIRS section (Assets, Succession, Philanthropy, Family)
   - TOOLS section (Activity, Notifications)

2. **Given** Consul is viewing a family dashboard,  
   **When** Consul clicks on any module in the sidebar,  
   **Then** the content area updates to show the selected module's content without page reload, and the selected module is visually highlighted in the sidebar.

3. **Given** Consul has unpaid invoices in Service List for current family,  
   **When** dashboard loads or Service List status changes,  
   **Then** Service List module displays a visual alert indicator (exclamation mark) next to module name.

4. **Given** Consul is navigating between modules,  
   **When** switching from one module to another,  
   **Then** transition happens in less than 2 seconds and current family context is maintained (family name visible in header).

5. **Given** Consul is viewing any module,  
   **When** Consul looks at the sidebar,  
   **Then** all modules show "Full Access" badge indicators (as Consul has full permissions to all family modules).

**Additional Criteria:**
- [ ] Sidebar remains visible at all times (does not collapse/hide)
- [ ] Module categories (GOVERNANCE, DEVELOPMENT, etc.) can be visually distinguished (headers, separators, or grouping)
- [ ] Active module is clearly highlighted with accent color
- [ ] Badge indicators show counts where applicable (e.g., unread messages, pending tasks)
- [ ] "Back to Families List" navigation is clearly visible in dashboard header
- [ ] Current family name is prominently displayed in dashboard header
- [ ] Sidebar supports vertical scrolling if module list exceeds viewport height

---

## 🎨 Design & UX

**User Flow:**

**Flow: Navigate Family Dashboard Modules**
```
Start → Families List → Click "View" on Anderson Family
→ Family Dashboard opens
→ Dashboard Header shows: "Anderson Family" + "Full Access" badge + "← Back to Families"
→ Sidebar visible on left with module structure:
   
   📊 Overview
   
   🔧 CONSUL WORKSPACE
   ├── ✓ Tasks (3)
   ├── 💬 Messages (2 unread)
   ├── ❗ Service List [alert indicator]
   └── 📅 Meetings
   
   --- separator ---
   
   ⚖️ GOVERNANCE
   ├── 📜 Constitution
   ├── 👥 Family Council
   ├── 🗳️ Decision Making (5 open)
   └── 🤝 Conflict Resolution
   
   📚 DEVELOPMENT
   └── 🎓 Education
   
   👨‍👩‍👧‍👦 FAMILY AFFAIRS
   ├── 💰 Assets
   ├── 🔄 Succession
   ├── ❤️ Philanthropy
   └── 🌳 Family
   
   🔧 TOOLS
   ├── 📊 Activity
   └── 🔔 Notifications

→ Default: Overview module active (highlighted)
→ Content area shows: Overview page content
→ Click "Service List" in Consul Workspace
→ Sidebar: Service List highlighted, Overview unhighlighted
→ Content area: Updates to Service List (shows services with payment status)
→ Notice: Exclamation mark visible on Service List due to unpaid invoice
→ Click "Constitution" in GOVERNANCE
→ Sidebar: Constitution highlighted
→ Content area: Updates to Constitution module
→ Click "← Back to Families" in header
→ Returns to Families List
```

---

## 🔐 Business Rules

**Validation Rules:**
1. **Module Access**: External Consul always has "Full Access" to all family modules (Constitution, Family Council, Decision Making, Conflict Resolution, Education, Assets, Succession, Philanthropy, Family, Activity, Notifications)
2. **Payment Alert**: Service List shows alert indicator (❗) when at least one invoice has status "unpaid" or "overdue"
3. **Badge Counts**: Modules show badge counts for actionable items:
   - Tasks: count of tasks in "To Do" or "In Progress" status
   - Messages: count of unread messages
   - Decision Making: count of decisions in "Open" status
   - Conflict Resolution: count of conflicts not in "Closed" status
4. **Default Module**: When dashboard opens, Overview module is active by default
5. **Context Preservation**: Switching between modules maintains family context - family_id does not change

**Authorization:**
- **Who can perform this action:** External Consul with active association to the family
- **Who can view results:** Same External Consul only (cannot see other advisors' workspaces)

**Edge Cases:**
- **No unpaid invoices**: Service List shows no alert indicator
- **Empty module**: If module has no data (e.g., no tasks), show empty state with "Create" action
- **Large module list**: If viewport height < sidebar content height, sidebar scrolls vertically while header remains fixed
- **Module loading error**: If module fails to load, show error message in content area but sidebar remains functional for switching to other modules
- **First-time access**: If Consul opens family for first time, show onboarding tip highlighting Overview and Workspace sections

---

## 🧪 Test Scenarios

**Happy Path:**
1. **Consul opens family dashboard and navigates modules:**
   - Start at Families List
   - Click "View" on "Anderson Family"
   - Dashboard loads with Overview active
   - Verify: Sidebar shows all modules organized by categories
   - Verify: Header shows "Anderson Family" and "← Back to Families"
   - Click "Tasks" in Consul Workspace
   - Verify: Tasks module loads, Tasks highlighted in sidebar, Overview unhighlighted
   - Verify: Page loads in < 2 seconds
   - Click "Constitution" in GOVERNANCE
   - Verify: Constitution module loads, Constitution highlighted
   - Click "Service List"
   - Verify: Service List loads with services and payment statuses visible
   - Click "← Back to Families"
   - Verify: Returns to Families List

**Negative Tests:**
1. **User without Consul access attempts to view dashboard:**
   - User who is not associated with family attempts to access dashboard
   - Expected: Access denied, redirected to Families List with error message

2. **Module fails to load:**
   - Consul clicks on "Education" module
   - Backend returns error or timeout
   - Expected: Error message in content area "Failed to load Education module", sidebar remains functional, can try other modules

3. **Network interruption during module switch:**
   - Consul clicks "Succession" while offline
   - Expected: Loading indicator shown, graceful error after timeout, user can retry

**Edge Cases:**
1. **Service List with unpaid invoices:**
   - Family has 2 services: one paid, one unpaid
   - Verify: Service List shows ❗ alert indicator
   - Consul marks unpaid invoice as paid
   - Verify: Alert indicator disappears immediately

2. **Module with no data (empty state):**
   - Family has no conflicts in Conflict Resolution
   - Consul clicks "Conflict Resolution"
   - Verify: Shows empty state message "No conflicts recorded" with "Create Conflict" button

3. **Very long module list (many modules, many categories):**
   - Viewport height = 800px
   - Sidebar content height = 1200px
   - Verify: Sidebar scrolls vertically, header remains fixed

4. **Badge count updates:**
   - Tasks module shows badge "3"
   - Consul completes a task
   - Returns to Overview
   - Verify: Tasks badge now shows "2"

**Test Cases Location:** `Knowledge-Base/product-management/test-cases/FG-EPIC-XXX-test-cases.md`

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Module switch (click to content display): < 2 seconds
- Sidebar render time on dashboard load: < 500ms
- Badge count updates: Real-time or < 5 seconds after status change
- Smooth scrolling: No lag when scrolling long module lists

**Security:**
- Sidebar only shows modules where Consul has access (for Consul: all modules)
- Family context (family_id) validated on every module load
- Cross-family data leakage prevention: Switching families refreshes entire dashboard context

**Accessibility:**
- Keyboard navigation: Tab through modules, Enter to activate
- Screen reader support: Module names and categories announced
- Focus indicators: Visible focus state on active element
- Color contrast: WCAG AA compliance for module names, badges, alerts

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Android (responsive sidebar)

**Usability:**
- Alert indicators (❗) must be visually distinct and noticeable
- Active module highlighting must be obvious
- Category headers clearly separate module groups
- Badge counts readable and not overwhelming
- "Back to Families" always accessible

---

## 📝 Notes

**Open Questions:**
_[Answers from Epic creation chat]_

- ✅ **Q: Should module categories (GOVERNANCE, DEVELOPMENT, etc.) be collapsible?**  
  A: Optional future enhancement. Initial version: always expanded for clarity. Can add collapse functionality if user feedback indicates need.

- ✅ **Q: What happens if Consul has limited access to some modules (not full Consul permissions)?**  
  A: This story assumes full Consul access (all modules show "Full Access" badge). Limited access scenarios handled by permission system in separate stories.

- ✅ **Q: Should sidebar remember last active module when returning to family dashboard?**  
  A: No, always default to Overview on dashboard load. Preserves consistent starting point for each family session.

- ✅ **Q: How to handle modules that are not yet implemented/available?**  
  A: Show module in sidebar but with "Coming Soon" badge and disabled state. Prevents confusion about missing functionality.

- ✅ **Q: Should Service List alert (❗) be numeric (count of unpaid) or just boolean indicator?**  
  A: Boolean indicator (❗) sufficient. Clicking Service List shows detailed breakdown. Avoids cluttering sidebar with too many numbers.

- ✅ **Q: What's the module loading sequence priority?**  
  A: Overview loads immediately on dashboard open. Other modules load on-demand when clicked. Badge counts fetch asynchronously after initial render.

**Related Documentation:**
- Epic: FG-XXX - External Consul Multi-Family Client Management & Governance Dashboard
- Personas: DOC-USR-003 - External Advisor (Consul specialization)
- System Components: DOC-SYS-001 - Advisor Portal Service (port 8011)

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-21
