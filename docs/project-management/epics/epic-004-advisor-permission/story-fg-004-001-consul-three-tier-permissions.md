---
story_id: "STORY-FG-004-001"
title: "Consul Assigns Three-Tier Permissions to Advisors"
type: "story"
epic_id: "EPIC-004"
created: "2025-10-16"
updated: "2025-10-20"
priority: "high"
status: "ready"
estimate: "16h"
story_points: 8
sprint: "Sprint 45"
assignee: ""
labels: ["advisor", "permissions", "rbac", "consul", "three-tier", "access-control"]
dependencies: []
---

# User Story: Consul Assigns Three-Tier Permissions to Advisors

> **Note:** Copy relevant sections to Jira RLN1 issue description.

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** RLN1  
**Story ID:** SAAS-EPIC-XXX-1  
**Summary:** As a Consul, I want to assign three-tier permissions to Personal and Service Advisors per section  
**Epic Link:** SAAS-EPIC-XXX [Advisor Portal User Roles and Access]  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

**Scope Note:** This Story covers Consul role (Family Portal + External Consul) managing Personal Family Advisors and Service Advisors. Admin role managing ALL advisors including Consuls will be separate Story (SAAS-EPIC-XXX-N).

---

## 📖 User Story

**As a** Consul (Family Portal or External Consul),  
**I want to** assign three-tier permissions (View, View+Modify, View+Modify All) to Personal Family Advisors and Service Advisors on a per-section basis,  
**so that** I can control whether they work only with their own materials or have access to all family data in specific sections.

**Note:** This Story covers Consul role permissions management. Admin role (can manage ALL advisors including other Consuls) will be covered in separate Story.

---

## 🎯 Business Context

**Why is this Story important?**

Family Governance has a hierarchy of advisor roles with different levels of permission management access:

**System Roles:**
1. **Admin** - full control over all permissions, including managing Consuls (separate Story)
2. **Consul (Family Portal)** - internal family coordinator, manages Personal and Service Advisors
3. **External Consul** - external coordinator, manages Personal and Service Advisors
4. **Personal Family Advisor** - works with family, cannot manage permissions
5. **Service Advisor** - provides specialized services, cannot manage permissions

**Pain points:**
- Without granular permission management, either all advisors see everything (security risk) or each works in isolation (loses context)
- Consul coordinates multiple advisors and must control their access to confidential family data
- Different advisors have different levels of competency and trusted access to family materials

**Business outcome**: 
- Personal Family Advisors and Service Advisors receive flexible access rights to sections
- Consul controls which sections advisors can only read vs. edit
- Some advisors get full access to their areas of competence (e.g., Service Advisor for workshops can edit all workshops)
- Consul CANNOT manage other Consuls' permissions (only Admin does this) - prevents accidental privilege reduction of coordinators
- Family maintains control over sensitive data

**Example scenario:**  
Family works with 5 advisors: 1 Consul (Family Portal - you), 1 External Consul (external coordinator), 2 Personal Family Advisors (working with conflicts and succession), 1 Service Advisor (workshops). 

As Consul, you assign permissions only to Personal Family Advisors and Service Advisor:
- Personal Family Advisor #1 (Conflicts): View Projects, View+Modify All Conflict Resolution
- Personal Family Advisor #2 (Succession): View Projects, View+Modify Succession Plans  
- Service Advisor (Workshops): View All, View+Modify All Workshops

You do NOT see External Consul in the list for management (only Admin manages their permissions).

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** I am logged in as Consul (Family Portal or External Consul),  
   **When** I navigate to "Advisor Management" section in Advisor Portal,  
   **Then** I see a list of Personal Family Advisors and Service Advisors associated with my family (I do NOT see other Consuls or Admins in this list), with "Manage Permissions" action for each.

2. **Given** I select an advisor from the list,  
   **When** I open their permissions editor,  
   **Then** I see permission settings for each section (Projects, Documents, Consultations, Workshops, Conflict Resolution, Succession Plans, etc.).

3. **Given** I am editing advisor permissions,  
   **When** I select a section (e.g., "Projects"),  
   **Then** I can choose from three permission levels:
   - **View** - read-only access to all data
   - **View+Modify** - read all, edit/create only own materials (created_by = advisor_id)
   - **View+Modify All** - full read/write access to all materials

4. **Given** I have assigned different permissions to different sections,  
   **When** I click "Save Changes",  
   **Then** the system validates, saves permissions, and shows confirmation "Permissions updated for [Advisor Name]".

5. **Given** I assigned "View" permission to Projects section,  
   **When** that advisor logs in and accesses Projects,  
   **Then** they can only read project data, with no "Create", "Edit", or "Delete" buttons visible.

6. **Given** I assigned "View+Modify" permission to Documents section,  
   **When** that advisor accesses Documents,  
   **Then** they can create new documents and edit/delete only documents where created_by = their advisor_id.

7. **Given** I assigned "View+Modify All" permission to Workshops section,  
   **When** that advisor accesses Workshops,  
   **Then** they can create, edit, delete any workshop regardless of creator.

8. **Given** I changed advisor permissions and saved,  
   **When** that advisor is actively using the portal,  
   **Then** their access changes take effect immediately (within next API call or page refresh).

9. **Given** I am an Admin user,  
   **When** I access Advisor Management section,  
   **Then** I see "Download Permission History" button that exports all permission changes across all families (CSV format with columns: timestamp, family_name, consul_name, advisor_name, section, old_permission, new_permission).

10. **Given** my family has 1 External Consul, 2 Personal Family Advisors, 1 Service Advisor, and I am Consul (Family Portal),  
   **When** I open Advisor Management,  
   **Then** I see only 3 advisors in the list (2 Personal Family Advisors + 1 Service Advisor), and External Consul is NOT visible.

**Additional Criteria:**
- [ ] Only Consul (Family Portal or External Consul) roles can access Advisor Management section (403 Forbidden for Personal Family Advisors and Service Advisors)
- [ ] Consul can only see and manage Personal Family Advisors and Service Advisors (cannot see other Consuls or Admins in the list)
- [ ] Consul can only manage permissions for advisors associated with their family (cannot see advisors from other families)
- [ ] Unsaved changes show warning modal when navigating away
- [ ] Permission changes are logged in audit trail (timestamp, who changed, what changed, old/new values)
- [ ] Admin users can download permission history report (CSV format) - download button in Advisor Management
- [ ] Advisor notification about permission changes: NOT implemented in this Story (future enhancement)

---

## 🎨 Design & UX

**User Flow:**

1. **Consul** logs into Advisor Portal (port 3002)
2. Clicks "Advisor Management" in navigation menu (new section, Consul-only)
3. Sees table of Personal Family Advisors and Service Advisors associated with family (does NOT see other Consuls or Admins):
```
   | Advisor Name     | Role                    | Specialization     | Active Projects | Actions           |
   |------------------|-------------------------|--------------------|-----------------|-------------------|
   | Jane Smith       | Personal Family Advisor | Conflict Resolution| 2               | Manage Permissions|
   | John Doe         | Personal Family Advisor | Succession Planning| 1               | Manage Permissions|
   | Sarah Johnson    | Service Advisor         | Workshops          | 3               | Manage Permissions|
```
4. Clicks "Manage Permissions" for "Jane Smith"
5. Opens Permissions Editor (modal or side panel) showing sections matrix:
```
   Section                  | Permission Level
   -------------------------|------------------
   Projects                 | [View ▼]
   Documents                | [View+Modify ▼]
   Consultations            | [View+Modify All ▼]
   Workshops                | [View+Modify All ▼]
   Conflict Resolution      | [View+Modify All ▼]
   Succession Plans         | [View ▼]
   Education Programs       | [View ▼]
```
6. Consul changes permissions using dropdown selectors
7. Clicks "Save Changes" button
8. System validates (loading state)
9. Success toast: "Permissions updated for Jane Smith"
10. Permissions Editor closes, table refreshes
11. **Jane's next API call** reflects new permissions immediately

**UI Components needed:**
- Advisor list table (searchable, filterable by role/specialization)
- "Manage Permissions" button per advisor row
- Permissions Editor modal/panel:
  - Section name labels (left column)
  - Permission level dropdowns (right column)
  - Save/Cancel buttons
  - Unsaved changes indicator
- Confirmation toast/snackbar
- Loading states during save
- Warning modal for unsaved changes

---

## 🔒 Business Rules

**Validation Rules:**
1. **Consul-only access**: Only Consul (Family Portal or External Consul) roles can access Advisor Management section
2. **Role-based filtering**: Consul can only see and manage Personal Family Advisors and Service Advisors (other Consuls and Admins are excluded from the list)
3. **Family isolation**: Consul can only manage advisors associated with their own family (cannot see advisors from other families)
4. **Permission level values**: Only three valid permission levels: View, View+Modify, View+Modify All
5. **At least one section**: Every advisor must have at least one section with assigned permission (system prevents completely empty permissions)
6. **Explicit save required**: Permission changes apply only after clicking "Save Changes" button (no auto-save on dropdown change)

**Authorization:**
- **Who can perform this action**: Consul (Family Portal or External Consul) roles only, within their family context
- **Who can view results**: 
  - Consul can see and edit Personal Family Advisors and Service Advisors permissions for their family
  - Personal Family Advisors and Service Advisors can view their own permissions in read-only mode (separate Story)
  - Family Members cannot see advisor permissions (not relevant to them)
- **Who can access permission history**: Admin users only (platform-wide role) can download permission change history reports
- **What Consul CANNOT do**: Manage permissions for other Consuls, Admins, or advisors from other families

**Edge Cases:**

1. **Advisor has no permissions set initially**:  
   - **Expected behavior**: System defaults all sections to "View" permission
   - **UI**: Show all sections with "View" selected

2. **New section added to platform later (e.g., "Reports")**:  
   - **Expected behavior**: Existing advisors automatically get "View" permission for new sections
   - **UI**: Consul sees new section in Permissions Editor with "View" default

3. **Consul removes all elevated permissions (sets everything to View)**:  
   - **Expected behavior**: Advisor retains access to portal but can only read data
   - **UI**: Warning message: "⚠️ [Advisor Name] will have View-only access to all sections"

4. **Multiple Consuls editing same advisor simultaneously**:  
   - **Expected behavior**: Last save wins (optimistic locking)
   - **UI**: If conflict detected (version mismatch), show warning: "Permissions were changed by another user. Please review and save again."

5. **Advisor is actively using portal when permissions change**:  
   - **Expected behavior**: New permissions apply on next API call (no immediate session termination)
   - **UI**: Advisor may see "Access denied" error if they attempt action no longer permitted

6. **Section has no data yet (e.g., new family, empty Projects)**:  
   - **Expected behavior**: Permissions still assignable, enforced when data is created
   - **UI**: Show all sections regardless of data presence

7. **Consul tries to access another Consul's or Admin's permissions (should be impossible via UI)**:  
   - **Expected behavior**: Other Consuls and Admins are NOT shown in advisor list at all
   - **If somehow API call made directly**: 403 Forbidden error
   - **UI**: Consul never sees other Consuls/Admins in Advisor Management interface

---

## 🧪 Test Scenarios

**Happy Path:**

1. **Scenario: Consul assigns mixed permissions to Personal Family Advisor**
   - Consul (Family Portal or External) logs in
   - Opens Advisor Management section
   - Sees list with Personal Family Advisors and Service Advisors (does NOT see other Consuls or Admins)
   - Clicks "Manage Permissions" for "Jane Smith - Personal Family Advisor (Conflict Resolution)"
   - Sets permissions:
     - Projects: View
     - Documents: View+Modify
     - Conflict Resolution: View+Modify All
     - Workshops: View+Modify All
   - Clicks "Save Changes"
   - Sees success message: "Permissions updated for Jane Smith"
   - Jane Smith logs in:
     - Can view all projects (no edit buttons)
     - Can edit her own documents, sees "Create Document" button
     - Can edit any conflict resolution case, sees "Edit" on all records
     - Can edit any workshop, full CRUD access

**Negative Tests:**

1. **Scenario: Personal Family Advisor tries to access Advisor Management**
   - Personal Family Advisor (Jane Smith) logs in
   - Tries to access Advisor Management section (via menu or URL)
   - **Expected**: 403 Forbidden error, redirect to dashboard
   - UI shows: "Access denied. This section is available only to Consuls and Admins."

2. **Scenario: Service Advisor tries to access Advisor Management**
   - Service Advisor (Sarah Johnson) logs in
   - Tries to access `/advisor-management` URL directly
   - **Expected**: 403 Forbidden error, redirect to dashboard
   - UI shows: "Access denied. This section is available only to Consuls and Admins."

3. **Scenario: Consul tries to manage advisor from different family**
   - Consul logs in (Family A)
   - Tries to access advisor who works with Family B
   - **Expected**: Cannot see that advisor in the list (family isolation working)
   - No data leakage between families

4. **Scenario: Network error during permission save**
   - Consul edits permissions
   - Clicks Save, but network request fails (500 error)
   - **Expected**: Error toast: "Failed to save permissions. Please try again."
   - Permissions remain unchanged, editor stays open

5. **Scenario: Invalid permission value sent to API**
   - System error sends invalid permission level (bug or malicious request)
   - **Expected**: Request rejected with error message
   - Error shown: "Invalid permission level. Must be one of: View, View+Modify, View+Modify All"

6. **Scenario: Consul tries to access another Consul's permissions (edge case security test)**
   - Consul (Family Portal) sees advisor list
   - External Consul is associated with same family
   - **Expected**: External Consul does NOT appear in the list
   - If Consul somehow crafts direct API call to manage External Consul: 403 Forbidden response

**Edge Cases:**

1. **Scenario: Advisor has no existing permissions (new advisor)**
   - Consul opens Permissions Editor for newly added Personal Family Advisor
   - **Expected**: All sections show "View" as default
   - Consul can change and save
   - After save, advisor can access portal with View permissions

2. **Scenario: New section "Reports" added to platform**
   - Platform upgrade adds "Reports" section
   - Consul opens Permissions Editor for existing Service Advisor
   - **Expected**: "Reports" section appears with "View" default
   - Consul can modify and save

3. **Scenario: Consul removes all elevated permissions**
   - Consul sets all sections to "View" for Personal Family Advisor
   - Clicks Save
   - **Expected**: Warning modal: "⚠️ Jane Smith will have View-only access to all sections. Continue?"
   - If confirmed, permissions saved
   - Advisor can still log in but cannot edit anything

4. **Scenario: Two Consuls edit same advisor simultaneously (conflict scenario)**
   - Consul (Family Portal) opens Permissions Editor for Jane (family has multiple Consuls)
   - External Consul opens Permissions Editor for Jane (different browser/device)
   - Consul (Family Portal) saves changes
   - External Consul tries to save changes (working with outdated state)
   - **Expected**: Warning shown: "Permissions were changed by [Consul Name] at [timestamp]. Please review current state and save again."
   - External Consul's editor refreshes with latest permissions
   - External Consul can review and save again if still needed

5. **Scenario: Consul views advisor list with multiple advisor roles**
   - Family has: 1 External Consul, 2 Personal Family Advisors, 1 Service Advisor
   - Consul (Family Portal) opens Advisor Management
   - **Expected**: Sees only 2 Personal Family Advisors + 1 Service Advisor in list (total 3)
   - Does NOT see External Consul
   - Each advisor row clearly shows their role in "Role" column

---

## ⚠️ Non-Functional Requirements

**Performance:**
- Permission editor load time: < 500ms (fetch advisor data and current permissions)
- Permission save time: < 1 second (validate and update)
- Permission check during normal advisor work: < 50ms (cached for fast validation)
- Permissions list fetch: < 300ms for up to 20 advisors

**Security:**
- **Authorization required**: Yes - Consul role only, verified by authentication system
- **Data encryption**: Yes - permissions stored securely with family data isolation
- **PII handling**: No - permissions are metadata, not personal information
- **Audit log**: Yes - track who changed permissions, when, what changed (timestamp, consul name, advisor name, section, old permission, new permission)
- **Input validation**: Validate all permission level values against allowed options
- **Rate limiting**: Maximum 10 permission updates per minute per Consul (prevent system abuse)

**Accessibility:**
- **WCAG level**: AA compliance
- **Keyboard navigation**: Required
  - Tab through advisor list
  - Enter to open Permissions Editor
  - Tab through section dropdowns
  - Space/Enter to open dropdown
  - Arrow keys to select permission level
  - Tab to Save/Cancel buttons, Enter to activate
- **Screen reader support**: Required
  - Announce current permission level for each section
  - Announce permission changes on save
  - Announce validation errors clearly

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions (macOS and iOS)
- Firefox: Latest 2 versions
- Edge: Latest version
- Mobile browsers: iOS Safari 15+, Chrome Mobile 90+

**Responsive Design:**
- Desktop: Permissions Editor as modal (1024px+)
- Tablet: Permissions Editor as full-screen overlay (768-1023px)
- Mobile: Not primary use case, but should be accessible (640-767px)

---

## 📝 Notes

**Open Questions:**

- [ ] **Permission history report format**: Confirm exact columns for CSV export
  - **Decision**: Download report available for Admin users only, no dedicated UI page
  - **Question**: Confirm CSV columns: timestamp, family_name, consul_name, advisor_name, advisor_role, section, old_permission, new_permission?
  - **Question**: Should report include changes made by Admins to Consul permissions (out of scope for this Story)?
  
- [ ] **Permission Templates - scope and management**:
  - **Decision**: Templates ARE needed for quick permission assignment
  - **Question**: Should templates be family-specific (each family creates own templates) or platform-wide defaults (all families see same templates)?
  - **Question**: Where to create/manage templates? In Advisor Management section or separate Settings page?
  - **Suggested template names**: "View All Sections", "Workshop Facilitator Standard", "Conflict Resolution Specialist", "Succession Planning Specialist"
  - **Note**: Template creation and application will be separate Story (SAAS-EPIC-XXX-7)
  
- [ ] **Bulk operations support**:
  - **Question**: Should Consul be able to select multiple advisors (checkboxes) and apply same permission template to all at once?
  - **Use case**: Family adds 3 new Service Advisors with identical permission needs
  - **Benefit**: Faster setup, reduced clicks
  - **Scope**: May be enhancement Story after Templates are implemented

- [ ] **Advisor role column in list**:
  - **Question**: Should advisor list table show "Role" column (Personal Family Advisor vs Service Advisor)?
  - **Benefit**: Quick visual identification of advisor type
  - **Alternative**: Show role in tooltip or advisor detail view only

**Design Considerations:**
- Should permissions be presented as dropdown, radio buttons, or toggle matrix?
  - **Recommendation**: Dropdown (most compact, scalable if we add more permission levels later)
- Should we show number of sections with elevated permissions in advisor list? (e.g., "5 sections with modify access")
  - **Benefit**: Quick visibility into advisor access level without opening editor
- **Role column in advisor list**: Add "Role" column showing "Personal Family Advisor" or "Service Advisor" for clear identification
  - **Benefit**: Consul can quickly see advisor type before managing permissions
- **Permission Templates** (confirmed needed): Consider adding "Apply Template" button above section list in Permissions Editor for quick bulk assignment
- **Default permissions for new advisors**: Mechanism already described in Epic (separate from this Story)
- **Filtering by role**: Consider adding filter dropdown above advisor list: "All Roles | Personal Family Advisors | Service Advisors"

---

**Template Version:** 1.0.0  
**Story Created:** 2025-10-16  
**Author:** Product Management Team