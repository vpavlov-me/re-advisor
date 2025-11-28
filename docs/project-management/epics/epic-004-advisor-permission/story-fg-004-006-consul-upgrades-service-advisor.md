---
story_id: "STORY-FG-004-006"
title: "Consul Upgrades Service Advisor Section Access"
type: "story"
epic_id: "EPIC-004"
created: "2025-10-16"
updated: "2025-10-20"
priority: "medium"
status: "ready"
estimate: "12h"
story_points: 5
sprint: "Sprint 46"
assignee: ""
labels: ["advisor", "permissions", "service-advisor", "upgrade", "tier-change"]
dependencies: ["STORY-FG-004-001", "STORY-FG-004-005"]
---

# User Story: Consul Upgrades Service Advisor Section Access

> **Note:** This User Story is part of Epic FG-EPIC-055: Advisor Portal User Roles and Access Management

---

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Consul, I want to upgrade Service Advisor from "Related only" to "All" access on specific sections, so that I can expand their scope when needed
**Story ID:** FG-EPIC-055-6
**Epic Link:** FG-EPIC-055 [Advisor Portal User Roles and Access Management]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consul (Family Portal or External),
**I want to** upgrade Service Advisor's access level from "Related only" to "All" on specific sections within my family,
**so that** I can expand their visibility and involvement when their role grows or trust increases, without manually associating them to every individual object.

**Example:**
- **As a** Consul managing family governance,
- **I want to** give our Education Service Advisor full access to all Education materials and courses,
- **so that** they can develop comprehensive learning programs without being limited to only the courses I explicitly assigned them to.

---

## 🎯 Business Context

**Why is this Story important?**

**User Pain Point:**
- Consuls currently must manually associate Service Advisors to individual objects (meetings, tasks, documents) in each section
- As Service Advisors prove their value, this manual association becomes tedious and limits their effectiveness
- Consuls need a quick way to "promote" trusted advisors to full section access without creating dozens of individual associations

**Business Outcome:**
- Streamlined advisor permission management reduces Consul administrative burden
- Service Advisors can operate more autonomously within their areas of expertise
- Faster onboarding and scope expansion for trusted advisors
- Clear permission model supports gradual trust-building with external consultants

**Strategic Alignment:**
- Supports efficient multi-family advisory services
- Enables flexible engagement models (project-based → retainer-based transition)
- Maintains security through granular, section-level access control

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** Consul is viewing a Service Advisor's card in External Advisors section,
   **When** Consul sees the list of 10 sections with current access levels,
   **Then** sections currently set to "Related only" show a clear option to upgrade to "All".

2. **Given** Consul upgrades Service Advisor's access from "Related only" to "All" on Education section,
   **When** Consul saves the changes,
   **Then** system confirms successful update and Service Advisor immediately gains access to all Education data in this family.

3. **Given** Consul upgrades multiple sections (e.g., Education and Meetings) from "Related only" to "All" in one action,
   **When** Consul saves the changes,
   **Then** all selected sections are updated simultaneously and Service Advisor gains full access to all selected sections.

4. **Given** Service Advisor has "All" access to Education section,
   **When** Service Advisor views Education area in Advisor Portal,
   **Then** they see all courses, learning paths, and educational materials for this family without needing individual associations.

5. **Given** Consul attempts to upgrade access for another Consul or Admin,
   **When** Consul opens their advisor card,
   **Then** system prevents access level modification and displays message "You cannot modify permissions for Consuls or Admins".

6. **Given** Service Advisor has "All" access to Meetings but "Related only" to Assets,
   **When** Service Advisor navigates between these sections,
   **Then** Meetings shows all family meetings, but Assets shows only explicitly associated assets.

**Additional Criteria:**
- [ ] Access level changes take effect immediately without requiring logout/login
- [ ] UI clearly distinguishes between "Related only" and "All" access states
- [ ] Consul can upgrade multiple sections in a single save operation
- [ ] System validates Consul's permission to modify this specific advisor before allowing changes
- [ ] Confirmation dialog appears before saving access level changes
- [ ] Success message confirms which sections were updated

---

## 🎨 Design & UX

**User Flow:**
1. Consul navigates to **Family Portal → External Advisors** section
2. Consul selects Service Advisor from the list
3. System opens **Advisor Card** showing advisor details and permissions
4. Consul sees **10 sections** displayed in a list/grid:
   - Constitution, Assets, Meetings, Decisions, Tasks, Communications, Education, Philanthropy, Conflict Resolution, Succession
5. Each section shows current access level with visual indicator:
   - "None" (grayed out/disabled)
   - "Related only" (default state, toggle/dropdown available)
   - "All" (highlighted/active state)
6. Consul clicks on section with "Related only" access
7. Consul selects "All" from dropdown/toggle
8. Visual change indicates pending update (e.g., section highlights, asterisk appears)
9. Consul repeats for additional sections if needed
10. Consul clicks **"Save Changes"** button
11. System displays confirmation dialog: "You are granting full access to [X sections]. Service Advisor will see all data in these areas. Continue?"
12. Consul confirms
13. System saves changes and displays success message: "Access updated for [Advisor Name]. They now have full access to [Section Names]."
14. Updated access levels reflected immediately in advisor card

**UI Considerations:**
- Clear visual distinction between three access levels (None, Related only, All)
- Section-by-section controls (not single global switch)
- Confirmation step before saving to prevent accidental changes
- Disabled state for sections where advisor has no access (None)
- Tooltip explanations for each access level

---

## 🔒 Business Rules

**Validation Rules:**
1. **Authorization:** Only users with Consul role (Family Portal or External) or Admin role can upgrade Service Advisor access
2. **Target Role Restriction:** Consul can only modify Personal Family Advisor or Service Advisor permissions (NOT other Consuls or Admins). Admin can modify all advisor roles including other Consuls
3. **Family Context:** Consul can only modify advisors associated with their own family
4. **Access Level Progression:** Can upgrade from "Related only" to "All" (this story), downgrade handled separately
5. **Immediate Effect:** Access changes apply immediately without requiring re-authentication
6. **Section Granularity:** Each of 10 sections has independent access level setting

**Authorization:**
- **Who can perform this action:** Admin, Consul (Family Portal), External Consul
- **Who can view results:** Admin (audit trail + current state), Consul (current state only), Service Advisor (their own access in Advisor Portal)

**Edge Cases:**
- **Consul tries to upgrade another Consul's access:** System blocks action, displays error "You cannot modify permissions for Consuls or Admins"
- **Consul tries to upgrade Admin's access:** System blocks action, displays error "You cannot modify permissions for Admins"
- **Service Advisor has "All" access but no family association:** System maintains access level but advisor cannot see family data until association exists
- **Multiple Consuls modify same advisor simultaneously:** Last save wins, no conflict resolution needed (rare scenario)
- **Consul downgrades access (not in this story scope):** Handled in separate story FG-XXX
- **Section is disabled/not available for family:** Section appears grayed out with explanation, cannot be modified

---

## 🧪 Test Scenarios

**Happy Path:**
1. **Setup:** Consul logged in, Service Advisor exists with "Related only" access to Education
2. Consul navigates to External Advisors → selects Service Advisor
3. Advisor card opens showing Education section with "Related only" access
4. Consul changes Education access to "All"
5. Consul clicks "Save Changes"
6. Confirmation dialog appears: "You are granting full access to Education. Continue?"
7. Consul clicks "Confirm"
8. Success message: "Access updated for [Advisor]. They now have full access to Education."
9. Education section now shows "All" access in advisor card
10. **Verification:** Service Advisor logs into Advisor Portal, sees all Education materials for this family

**Multiple Sections Upgrade:**
1. **Setup:** Service Advisor has "Related only" on Education, Meetings, Tasks
2. Consul upgrades all three sections to "All" in single operation
3. Saves changes with one confirmation
4. All three sections update simultaneously
5. **Verification:** Service Advisor sees all data in all three sections

**Negative Tests:**
1. **Unauthorized Target:** Consul attempts to upgrade another Consul's access
   - System blocks action, displays error "You cannot modify permissions for Consuls or Admins"
   
2. **Cross-Family Attempt:** Consul tries to modify advisor from different family
   - System blocks action (advisor not visible in their External Advisors list)

3. **Invalid Role:** Personal Family Advisor attempts to access permission management
   - System denies access to Advisor Management interface

**Edge Cases:**
1. **No Association Exists:** Consul upgrades Service Advisor to "All" on Education, but advisor has no active family association
   - System saves access level, but advisor cannot access data until association created
   - Message: "Access level saved. Note: Advisor must have active family association to view data."

2. **Partial Section Availability:** Some sections disabled for this family (e.g., Philanthropy not used)
   - Disabled sections appear grayed out with tooltip "Section not available for this family"
   - Cannot be modified

---

## ⚠️ Non-Functional Requirements

**Performance:**
- Access level change saves within < 2 seconds
- Updated permissions reflected in Advisor Portal within < 5 seconds
- Advisor card loads with current permissions in < 1 second

**Security:**
- Authorization check before displaying permission controls
- Server-side validation of Consul's right to modify this specific advisor
- Access level changes logged for Admin audit trail (not visible to Consul in this story)

**Usability:**
- Clear confirmation dialog before saving prevents accidental changes
- Visual feedback during save operation (loading state)
- Success message confirms which sections were updated

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions

---

## 📝 Notes

**Open Questions:**
- [ANSWERED in Epic] What happens if Consul downgrades access later? → Separate story FG-XXX
- [ANSWERED in Epic] Can multiple sections be upgraded in one operation? → Yes, multi-select supported
- [ANSWERED in Epic] Is audit trail visible to Consul? → No, only to Admin
- [ANSWERED in Epic] How are the 10 sections displayed? → List/grid format in advisor card, exact design TBD in design review

**Related Documentation:**
- See Epic FG-EPIC-055 for complete access tier framework
- See `external-advisor-persona.md` for advisor role details
- See `SYSTEM_COMPONENTS_CATALOG.md` for Advisor Portal Service architecture

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-16
**Story Created:** 2025-10-16