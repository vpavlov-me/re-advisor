---
doc_id: "FG-XXX-001"
title: "User Story: Edit Advisor Module Permissions"
type: "user-story"
category: "planning"
audience: "product-manager|business-analyst|developer|qa"
complexity: "intermediate"
created: "2025-10-23"
updated: "2025-10-23"
version: "1.0.0"
status: "draft"
tags: ["user-story", "external-consul", "advisor-management", "permissions", "access-control"]
related: ["FG-XXX"]
epic_link: "FG-XXX"
priority: "high"
---

# User Story - Edit Advisor Module Permissions

---

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As an External Consul, I want to edit module permissions for advisors to coordinate advisory teams effectively
**Epic Link:** FG-XXX [External Consul: Advisor Management & Permissions]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As an** External Consul,
**I want to** edit permissions for Personal Family Advisors and Service Advisors by granting or removing access to specific modules and setting their access level (View/Modify Related/Modify All),
**so that** I can coordinate advisory teams while respecting the hierarchy (cannot manage other Consuls or Admins).

---

## 🎯 Business Context

**Why is this Story important?**

External Consuls serve as strategic governance partners with comprehensive family oversight. They often coordinate teams of specialized advisors (Personal Family Advisors and Service Advisors) who need different levels of access to various governance modules. 

**User pain point being solved:**
- Currently, only Admins can manage advisor permissions, creating bottlenecks
- External Consuls need operational flexibility to adjust advisor access without escalating to Admin
- Specialized advisors require tailored access based on their expertise and engagement scope

**Business outcome expected:**
- External Consuls can independently manage their advisory teams
- Faster advisor onboarding and permission adjustments
- Reduced Admin workload for routine permission changes
- Better access control aligned with advisor specializations

**Strategic alignment:**
- Empowers External Consuls with governance coordination capabilities
- Maintains security hierarchy (Consuls cannot manage other Consuls/Admins)
- Supports multi-advisor family governance models

---

## ✅ Acceptance Criteria

1. **Given** External Consul views an advisor's profile (Personal Family Advisor or Service Advisor),
   **When** they navigate to the permissions section,
   **Then** they see a list of all 10 governance modules with current access levels for that advisor.

2. **Given** External Consul is editing advisor permissions,
   **When** they select a module,
   **Then** they can choose from access levels: No Access, View, Modify Related, Modify All.

3. **Given** External Consul changes access level for one or more modules,
   **When** they click "Save Changes",
   **Then** the system validates changes, updates permissions, and displays success confirmation.

4. **Given** External Consul attempts to edit permissions for another External Consul,
   **When** they try to access that advisor's permissions,
   **Then** the system prevents access and displays "You cannot manage permissions for other External Consuls or Admins".

5. **Given** External Consul attempts to edit permissions for an Admin,
   **When** they try to access that advisor's permissions,
   **Then** the system prevents access and displays "You cannot manage permissions for other External Consuls or Admins".

6. **Given** External Consul removes all module access for an advisor (sets all to "No Access"),
   **When** they save changes,
   **Then** the system displays warning "This advisor will have no access to any modules. Continue?" with Confirm/Cancel options.

7. **Given** External Consul is viewing advisor list,
   **When** the list displays,
   **Then** they see only Personal Family Advisors and Service Advisors (other Consuls and Admins are not shown or are marked as "Cannot manage").

8. **Given** External Consul changes advisor permissions,
   **When** changes are saved,
   **Then** the advisor's access is updated immediately (no delay or logout required).

**Additional Criteria:**
- [ ] Changes respect family_id isolation (cannot edit advisors from other families)
- [ ] UI clearly indicates which advisors can/cannot be managed
- [ ] Permission changes are atomic (all-or-nothing save)
- [ ] System displays current access level clearly before editing
- [ ] Consul can cancel changes without saving

---

## 🔐 Business Rules

**Validation Rules:**
1. **Role Hierarchy**: External Consul can only manage Personal Family Advisors and Service Advisors, NOT other External Consuls or Admins
2. **Family Isolation**: Can only edit permissions for advisors within their own family (family_id match required)
3. **Module Access Levels**: Each module must have exactly one of four states: No Access, View, Modify Related, Modify All
4. **Minimum Access**: System warns if removing all module access (advisor becomes effectively inactive)
5. **Valid Module List**: Only 10 governance modules can be configured (Constitution, Meetings, Communication, Assets, Education, Philanthropy, Decisions, Succession, Conflict Resolution, Tasks)

**Authorization:**
- **Who can perform this action:** External Consul role only (is_external_consul = true)
- **Who can view results:** External Consuls can view advisor permissions; Advisors cannot see their own permission management interface

**Edge Cases:**
- **Advisor has active tasks/bookings**: System allows permission changes but may display warning "This advisor has active tasks/bookings in modules you're removing access from"
- **Multiple Consuls editing simultaneously**: Last save wins (optimistic locking), display conflict warning
- **Advisor being edited is deleted**: System displays "Advisor no longer exists" and prevents save
- **Consul loses External Consul role during edit**: System blocks save and redirects with "You no longer have permission to manage advisors"

---

## 🧪 Test Scenarios

**Happy Path:**
1. External Consul logs in
2. Navigates to Advisor Management section
3. Selects Personal Family Advisor "Jane Succession Expert"
4. Views current permissions: Succession (Modify All), Education (View), other modules (No Access)
5. Changes Education module to "Modify Related"
6. Adds Assets module with "View" access
7. Clicks "Save Changes"
8. System validates, saves, and displays "Permissions updated successfully"
9. Advisor Jane now has updated access levels immediately

**Negative Tests:**
1. **Unauthorized hierarchy management**
   - External Consul attempts to edit another External Consul's permissions
   - System blocks access with error message "You cannot manage permissions for other External Consuls or Admins"

2. **Cross-family access attempt**
   - External Consul tries to edit advisor from different family (via URL manipulation)
   - System returns 403 Forbidden with message "You can only manage advisors in your own family"

3. **Invalid access level**
   - Consul attempts to set invalid access level (via API manipulation)
   - System rejects with validation error "Invalid access level. Must be: No Access, View, Modify Related, or Modify All"

4. **Removing all access**
   - Consul sets all modules to "No Access"
   - System displays warning "This advisor will have no access to any modules. Continue?"
   - If confirmed, saves; if cancelled, reverts changes

**Edge Cases:**
1. **Concurrent editing conflict**
   - Two Consuls edit same advisor simultaneously
   - Last save wins
   - System displays "Permissions were updated by another user. Your changes may overwrite theirs. Continue?"

2. **Advisor with active engagements**
   - Consul removes module access where advisor has active tasks
   - System displays warning "This advisor has 3 active tasks in Succession module. Removing access may impact their work."
   - Allows save but advisor can no longer access those tasks

3. **Consul permission revoked during edit**
   - Consul is editing advisor permissions
   - Admin removes Consul's External Consul role
   - On save attempt, system blocks with "You no longer have permission to manage advisors"

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Permission update response time: < 500ms
- Advisor list load time: < 1 second
- Module permission UI render: < 300ms

**Security:**
- Authorization check on every permission change request
- Family_id validation on all queries
- Role hierarchy validation (cannot manage Consuls/Admins)
- Audit trail for all permission changes (handled in separate epic)

**Accessibility:**
- Keyboard navigation for module permission toggles
- Screen reader support for access level changes
- Clear visual indication of current vs. new access levels

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Edge: Latest 2 versions

---

## 📝 Notes

**Questions:**
- [No open questions - all clarified in epic discussion]

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-23
