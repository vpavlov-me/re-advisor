---
story_id: "STORY-FG-004-003"
title: "External Consul View+Modify All Access"
type: "story"
epic_id: "EPIC-004"
created: "2025-10-16"
updated: "2025-10-20"
priority: "critical"
status: "ready"
estimate: "12h"
story_points: 5
sprint: "Sprint 45"
assignee: ""
labels: ["advisor", "permissions", "external-consul", "modify-all", "advisor-portal"]
dependencies: ["STORY-FG-004-001"]
---

# User Story SAAS-EPIC-XXX-3: External Consul View+Modify All Access

---

## 📋 Basic Information

**Issue Type:** Story
**Project:** RLN1
**Story Number:** SAAS-EPIC-XXX-3
**Summary:** As an External Consul, I want to have View+Modify All access to all sections except Billing and Extensions
**Epic Link:** SAAS-EPIC-XXX [Advisor Portal User Roles and Access]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As an** External Consul (working with multiple families through Advisor Portal),
**I want to** have View+Modify All access to all platform sections except Billing and Extensions,
**so that** I can effectively coordinate family operations, provide strategic guidance, and manage all aspects of family governance across my client families.

---

## 🎯 Business Context

**Why is this Story important?**

External Consuls are professional governance consultants who work with multiple families simultaneously and need comprehensive access to coordinate family operations effectively. They are trusted strategic partners who:

- Guide families through complex governance decisions and constitutional changes
- Coordinate cross-functional family initiatives (meetings, decisions, education, succession)
- Need to view and modify materials across all governance areas to provide holistic guidance
- Should NOT have access to sensitive financial operations (Billing) or system configurations (Extensions)

**User pain point being solved:**
Currently, External Consuls may have limited visibility into different family sections, requiring them to constantly request access or work through intermediaries, which slows down their consulting work and reduces their effectiveness.

**Business outcome expected:**
- Faster, more effective consulting engagements
- Improved family governance coordination
- Reduced administrative overhead for access requests
- Clear security boundaries (no Billing/Extensions access)

**Strategic alignment:**
This aligns with the platform goal of enabling professional advisory services while maintaining appropriate security controls and family data protection.

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** an External Consul logs into Advisor Portal and selects a family,
   **When** they navigate to any section (Meetings, Decisions, Constitution, Communication, Education, Succession, Philanthropy, Conflict Resolution, Assets, Tasks),
   **Then** they can view all content AND create/edit/delete items in those sections.

2. **Given** an External Consul logs into Advisor Portal and views the navigation menu,
   **When** they review available sections,
   **Then** Billing and Extensions sections are completely hidden from navigation and are not visible at all.

3. **Given** an External Consul is working with any family,
   **When** they navigate through the Advisor Portal interface,
   **Then** they never encounter Billing or Extensions sections in any menus, dashboards, or navigation elements.

4. **Given** an External Consul is viewing any accessible section,
   **When** they create, edit, or delete items (meetings, decisions, announcements, etc.),
   **Then** changes are saved successfully and their name appears as the author/modifier of the content.

5. **Given** an External Consul opens the "External Advisors" tab to view advisors associated with current family,
   **When** they open an advisor's profile card,
   **Then** they can view and modify access levels for Personal Family Advisors and Service Advisors, but profiles of other External Consuls and Admins show read-only access information without edit controls.

**Additional Criteria:**
- [ ] External Consul role badge/indicator is visible in their Advisor Portal profile
- [ ] Billing and Extensions sections are completely hidden from External Consul navigation menu
- [ ] Access restrictions apply consistently across all interface elements
- [ ] Multi-family context: Access permissions apply independently for each associated family

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Figma: [Link to Advisor Portal navigation showing hidden Billing/Extensions sections - TBD during design phase]
- Advisor profile cards with permission controls: [Link to design - TBD]

**User Flow:**

**Happy Path - Accessing Allowed Section:**
1. External Consul logs into Advisor Portal
2. Selects "Thompson Family" from their family list
3. Navigates to Meetings section
4. Sees all family meetings with full edit controls
5. Creates new meeting, edits agenda, assigns attendees
6. Changes are saved successfully

**Navigation Visibility:**
1. External Consul logs into Advisor Portal
2. Selects "Thompson Family" from their family list
3. Reviews navigation menu
4. Sees: Meetings, Decisions, Constitution, Communication, Education, Succession, Philanthropy, Conflict Resolution, Assets, Tasks
5. Does NOT see: Billing, Extensions (completely hidden)
6. Can only navigate to sections visible in menu

**Permission Management Flow:**
1. External Consul navigates to "External Advisors" tab
2. Sees list of all advisors associated with current family (cards or table view)
3. Opens profile card of "Maria Rodriguez" (Personal Family Advisor)
4. Sees her current access level and available sections
5. Changes her access level from "View Only" to "View+Modify All"
6. Saves changes
7. Opens profile card of "David Chen" (another External Consul)
8. Sees his access information displayed as read-only, no edit controls available
9. Sees message "Only Admins can modify Consul permissions"
10. Cannot make any changes to David's access

---

## 🔒 Business Rules

**Authorization Rules:**

**Access Granted (View+Modify All):**
- Meetings - Create, edit, delete meetings, agendas, minutes
- Decisions - Create, edit, delete decision proposals, manage voting
- Constitution - View and modify family constitution, values, mission
- Communication - Create, edit, delete announcements and conversations
- Education - Create, edit learning paths, courses, track progress
- Succession - Create, edit succession plans and assessments
- Philanthropy - Manage philanthropy strategy, grants, impact tracking
- Conflict Resolution - Create, manage conflict records and mediation
- Assets - View and edit asset information and valuations
- Tasks - Create, assign, edit, delete tasks
- [Any future sections except Billing and Extensions]

**Access Denied:**
- Billing - No access (read or write)
- Extensions - No access (read or write)

**Permission Management Rules:**
- **CAN manage:** Personal Family Advisors (all tiers), Service Advisors (all tiers)
- **CANNOT manage:** Other External Consuls, Admins
- Can assign any of three access tiers (View Only, View+Comment, View+Modify All) to allowed advisor types

**Multi-Family Rules:**
- Access permissions apply per family association
- External Consul can have different families in their portfolio
- Must explicitly select family before accessing family-specific sections
- Cannot see or access data from families they are not associated with

**Edge Cases:**
- **New section added to platform:** External Consul automatically gets View+Modify All access unless section is Billing or Extensions
- **External Consul promoted to Admin:** Gains access to Billing and Extensions, retains all previous permissions
- **Family removes External Consul association:** Immediately loses all access to that family's data
- **External Consul tries to delete their own access:** System prevents self-deletion, shows error message

---

## 🧪 Test Scenarios

**Happy Path:**

**Scenario 1: Full Access to Governance Sections**
1. Login as External Consul "John Smith" to Advisor Portal
2. Select "Martinez Family" from family dropdown
3. Navigate to Meetings section
4. Verify: Can view all meetings
5. Create new meeting "Q4 Family Council"
6. Add agenda items, set date/time, invite attendees
7. Save meeting
8. Verify: Meeting created successfully, John Smith shown as creator
9. Edit meeting title to "Q4 Family Council - Strategic Planning"
10. Delete one agenda item
11. Verify: All changes saved, audit log shows modifications
12. Repeat for Decisions, Constitution, Communication sections
13. Expected Result: Full create/edit/delete access in all sections

**Scenario 2: Advisor Permission Management**
1. Login as External Consul "John Smith"
2. Navigate to "External Advisors" tab for Martinez Family
3. Verify: Can see all advisors associated with this family displayed as cards
4. Open profile card of "Maria Rodriguez" (Personal Family Advisor)
5. View her current access level: "View Only"
6. Change her access level to "View+Modify All" using dropdown
7. Save changes
8. Verify: Maria's access updated successfully, confirmation message shown
9. Open profile card of "David Chen" (another External Consul)
10. Verify: Can see his access information (read-only display)
11. Verify: No edit controls available, see message "Only Admins can modify Consul permissions"
12. Expected Result: Cannot modify David's access
13. Open profile card of Admin user "Sarah Williams"
14. Verify: Same read-only view, no edit controls
15. Expected Result: Cannot modify Admin permissions

**Negative Tests:**

**Scenario 1: Billing Section Hidden**
1. Login as External Consul
2. Select family "Thompson Family"
3. Review navigation menu and all available sections
4. Expected Result: Billing section is completely absent from navigation
5. Review dashboard, side menu, settings
6. Expected Result: No Billing links, buttons, or mentions anywhere in interface
7. Verify: External Consul has no visual indication that Billing section exists

**Scenario 2: Extensions Section Hidden**
1. Login as External Consul
2. Select family from dropdown
3. Review all navigation areas and menus
4. Expected Result: Extensions section is completely absent from interface
5. Verify: No way to discover or access Extensions through normal interface usage

**Scenario 3: Cannot Modify Other Consul Permissions**
1. Login as External Consul "John Smith"
2. Navigate to "External Advisors" tab
3. Open profile card of another External Consul "Sarah Johnson"
4. Verify: Access information displayed in read-only mode
5. Verify: No edit controls, dropdowns, or save buttons visible
6. Verify: Message shown: "Only Admins can modify Consul permissions"
7. Expected Result: Cannot change Sarah's access level or remove her from family
8. Attempt to interact with any fields
9. Expected Result: No changes possible, interface remains read-only

**Edge Cases:**

**Scenario 1: Multi-Family Context Switching**
1. Login as External Consul associated with 3 families
2. Select "Family A" from dropdown
3. Create meeting in Family A
4. Switch to "Family B" from dropdown
5. Verify: Cannot see Family A's meeting
6. Create meeting in Family B
7. Switch back to "Family A"
8. Verify: Can see only Family A meeting, not Family B meeting
9. Expected Result: Complete data isolation between families

**Scenario 2: New Section Auto-Access**
1. Platform adds new section "Risk Management"
2. External Consul logs in
3. Navigates to family dashboard
4. Expected Result: "Risk Management" appears in navigation
5. Access section
6. Expected Result: Full View+Modify All access automatically granted

**Scenario 3: Self-Permission Removal Prevention**
1. Login as External Consul
2. Navigate to "External Advisors" tab
3. Locate and open own profile card in the list
4. Verify: Own access information displayed in read-only mode
5. Attempt to modify own access level or remove own association
6. Expected Result: System prevents action, shows message "Cannot modify your own permissions - contact Admin"
7. Verify: No changes possible to own permissions

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** 
  - RLN1-XXX - "Define Advisor Role Types in Database" (must have `external_consul` role type defined)
  - RLN1-YYY - "Implement Three-Tier Access Level Framework" (View Only, View+Comment, View+Modify All)
  - RLN1-ZZZ - "Create Advisor Portal Navigation and Role-Based Menu" (navigation must hide restricted sections)

- **Blocks:** 
  - RLN1-AAA - "External Consul Permission Management UI" (needs this story's access model)
  - RLN1-BBB - "Personal Family Advisor Access Levels" (similar pattern)

---

## ⚠️ Non-Functional Requirements

**Performance:**
- Access control checks: < 50ms per request
- Role permission resolution: < 100ms
- Navigation menu rendering with role-based filtering: < 200ms
- Multi-family context switch: < 300ms

**Security:**
- All access decisions enforced at both interface and system layers
- Session timeout: 30 minutes of inactivity
- Cannot access restricted sections through any navigation path
- Zero data leakage between families (strict family isolation)
- Billing and Extensions sections completely hidden for External Consul role

**Accessibility:**
- Access Denied messages must be screen-reader friendly
- Keyboard navigation for all allowed sections
- WCAG AA compliance for restricted access indicators
- Clear visual indicators for disabled/restricted elements

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Edge: Latest 2 versions

**Data Integrity:**
- All modifications tracked with advisor name, timestamp, and action type
- Cannot orphan data when advisor association is removed (graceful handling)
- Transaction rollback on permission check failures
- Changes immediately visible to all family members

---

## 📝 Notes

**Open Questions:**

From Epic Discussion Context:

**Q1: Should External Consuls see Billing/Extensions in navigation at all?**
- **Answer:** NO - Hide these sections from navigation menu entirely for External Consuls. They should not see any indication these sections exist.

**Q2: Can External Consul view billing information in read-only mode?**
- **Answer:** NO - Zero access to billing. This is sensitive financial data that only Admins should see.

**Q3: If new sections are added to the platform in future, should External Consul automatically get access?**
- **Answer:** YES - by default, External Consul gets View+Modify All to all new sections UNLESS specifically designated as restricted (like Billing/Extensions). This ensures consultants maintain comprehensive access without requiring permission updates for each new feature.

**Q4: Can External Consul remove their own access or modify their own permissions?**
- **Answer:** NO - Advisors cannot modify their own permissions. This prevents accidental self-lockout. Only Admins can modify External Consul permissions.

**Q5: What happens if External Consul is promoted to Admin role?**
- **Answer:** They gain access to Billing and Extensions sections. All previous access is retained. This is a role upgrade, not replacement.

**Q6: Access permissions - are they per-family or global?**
- **Answer:** Per-family association. External Consul may work with multiple families and has independent access rights for each family based on their association record.

**Q7: Should there be a grace period if family removes External Consul association, or immediate revocation?**
- **Answer:** Immediate revocation. If Admin removes advisor association, access is revoked immediately. No grace period or license checks for now.

**Q8: Do we need to track "last accessed" timestamp per family for inactive advisor cleanup?**
- **Answer:** NO - not implementing this tracking for now.

**Remaining Questions:**
- [ ] None at this time

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-16
**Author:** Product Team