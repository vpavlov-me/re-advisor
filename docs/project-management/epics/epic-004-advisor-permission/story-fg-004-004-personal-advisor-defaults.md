---
story_id: "STORY-FG-004-004"
title: "Personal Family Advisor Default Permissions"
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
labels: ["advisor", "permissions", "personal-advisor", "defaults", "modify-related"]
dependencies: ["STORY-FG-004-001"]
---

# User Story SAAS-EPIC-XXX-4 - Personal Family Advisor Default Permissions

> **Note:** This is User Story for Jira RLN1 or RLN2 project. Copy relevant sections to Jira issue description.

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** [RLN1 | RLN2]  
**Story ID:** SAAS-EPIC-XXX-4  
**Summary:** As a Personal Family Advisor, I want to have View+Modify (related) permissions for Education by default, so that I can start working with educational materials while Admin/Consul grants additional access as needed  
**Epic Link:** SAAS-EPIC-XXX [Advisor Portal: Role-Based Permissions and Access Control]  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Personal Family Advisor (newly onboarded external advisor with minimal role),  
**I want to** receive default "View+Modify (related)" permissions for Education Service only upon account creation,  
**so that** I can immediately start preparing workshop materials and educational content while waiting for Admin/Consul to grant access to other services based on project needs.

---

## 🎯 Business Context

**Why is this Story important?**

**User Pain Point:**  
Personal Family Advisors (e.g., family attorney, specialized consultant) need a secure starting point when joining the Advisor Portal. Giving full access immediately creates security risks, while giving zero access blocks their onboarding.

**Business Outcome:**
- **Safe onboarding:** Advisors can start productive work (Education materials) without accessing sensitive family data
- **Principle of least privilege:** Default permissions limited to lowest-risk service (Education)
- **Flexible escalation:** Admin/Consul can grant additional access (Projects, Documents, Consultations) per project needs
- **Trust building:** Families can evaluate advisor quality through Education materials before expanding access

**Strategic Alignment:**  
Supports secure multi-family advisor management while enabling efficient advisor onboarding and family-advisor collaboration.

**Use Case Example:**  
A family's estate planning attorney is invited to Advisor Portal. Upon account creation:
- ✅ Can immediately create workshop materials on estate planning law (Education)
- ✅ Can view family name and member list for context
- ❌ Cannot access family constitution (requires explicit grant from Admin/Consul)
- ❌ Cannot access family assets, documents, or sensitive data (requires explicit grant)
- When family requests document review project → Admin grants Documents access for that specific project
- If attorney needs constitution context for workshop → Admin grants Constitution Service access (read-only)
- After project completion → Admin can revoke Documents access, keeping Education only

---

## ✅ Acceptance Criteria

**This Story is complete when:**

### AC1: Automatic Education-Only Permission Assignment

1. **Given** Admin or Consul creates a new advisor account with role "Personal Family Advisor",  
   **When** the advisor account is created and saved,  
   **Then** the system automatically assigns:
   - Education Service: View and Modify access (limited to their own materials)
   - ALL other services (Projects, Documents, Consultations, Assets, Constitution, Meetings, Tasks, Communication, Philanthropy, Succession, Conflict Resolution, Decision-Making): No Access

### AC2: Working with Own Education Materials

2. **Given** Personal Family Advisor is authenticated and logged into Advisor Portal,  
   **When** they navigate to Education Dashboard,  
   **Then** they see:
   - Only their own learning paths, courses, workshop materials (materials they created or were assigned to them)
   - "Create New Workshop" / "Create Learning Path" buttons (enabled)
   - Empty state if no materials created yet: "Create your first workshop materials to get started"  
   **And** they can successfully create, edit, and delete their own education materials.

### AC3: Isolation from Other Advisors' Education Materials

3. **Given** other advisors have created workshop materials in Education Service,  
   **When** Personal Family Advisor opens Education Dashboard,  
   **Then** they do NOT see other advisors' materials (complete isolation),  
   **And** direct URL access to another advisor's material returns 403 Forbidden with message: "Access Denied - You can only view your own materials".

### AC4: Blocked Access to Other Services

4. **Given** Personal Family Advisor has default permissions (Education only),  
   **When** they attempt to navigate to restricted services (Projects, Documents, Consultations, etc.),  
   **Then** 
   - Navigation menu does NOT show links to restricted services (completely hidden from view)
   - Direct URL access returns "Access Restricted" page with message: "Contact your administrator to request access to this service"
   - No visual indicators for restricted services since they are not displayed in the UI

### AC5: Admin/Consul Can Grant Additional Access

5. **Given** Admin or Consul wants to grant Personal Family Advisor access to Documents Service for a specific project,  
   **When** they open Permission Management UI for this advisor and add View and Modify access for Documents Service,  
   **Then** 
   - Permission change is saved immediately
   - Personal Family Advisor sees Documents navigation link appear in their menu (doesn't need to log out and back in)
   - Advisor can now access Documents Dashboard and work with their assigned documents  
   **And** Education access remains unchanged (still active).

### AC6: Read-Only Family Context Access

6. **Given** Personal Family Advisor is associated with a family,  
   **When** they open Family Context View (family profile section),  
   **Then** they can view (read-only):
   - Family name and basic information
   - Family members list (names only, no personal identifying information)  
   **And** they CANNOT view:
   - Family constitution (unless Admin/Consul explicitly grants Constitution Service access)
   - Sensitive family data (assets, financials, private communications)
   - Any family information beyond name and member list

### AC7: Cannot Self-Escalate Permissions

7. **Given** Personal Family Advisor wants more access to other services,  
   **When** they try to access their own Permission Settings page,  
   **Then** they see a read-only view of their current permissions with message: "Contact your administrator to request permission changes"  
   **And** no "Edit" or "Request Access" buttons are available (must contact Admin/Consul directly).

**Additional Criteria:**
- [ ] Permission assignment happens automatically during advisor account creation (no manual step required)
- [ ] Permission changes by Admin/Consul take effect in real-time (advisor sees changes within 30 seconds without logging out and back in)
- [ ] Audit log records all permission assignments and changes (who granted, when, what service, what permission level)
- [ ] UI clearly hides restricted services from navigation (clean interface showing only accessible services)
- [ ] Error messages are user-friendly and actionable ("Contact admin" instead of technical errors)

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Figma: [Link to Advisor Portal Navigation with restricted services UI]
- Figma: [Link to Education Dashboard for Personal Family Advisor]
- Figma: [Link to "Access Restricted" page mockup]

**User Flow:**

**Flow 1: New Personal Family Advisor Onboarding**
1. Admin creates Personal Family Advisor account via Admin Portal
2. System automatically assigns Education service with View and Modify access (limited to own materials) and No Access to all other services
3. Advisor receives welcome email with login credentials
4. Advisor logs into Advisor Portal
5. Advisor sees only Education in navigation menu (other services are completely hidden)
6. Advisor opens Education Dashboard → sees empty state "Create your first workshop"
7. Advisor creates workshop materials successfully

**Flow 2: Admin Grants Additional Access Mid-Project**
1. Family requests document review from Personal Family Advisor
2. Admin opens Permission Management for this advisor
3. Admin adds View and Modify access for Documents Service
4. System saves permission change immediately
5. Advisor (without logging out) refreshes page or navigates → sees Documents in navigation
6. Advisor opens Documents Dashboard → can now work with assigned documents

**Flow 3: Personal Family Advisor Attempts Restricted Access**
1. Advisor tries to open Projects (e.g., via direct URL or old bookmark)
2. System checks permissions → No Access for Projects
3. System returns "Access Restricted" page with message + Admin contact info
4. Advisor contacts Admin to request access
5. Admin evaluates request and either grants access or explains why not needed

---

## 🔒 Business Rules

### Default Permission Assignment Rules

1. **Automatic Assignment:** When an advisor is created with the role of Personal Family Advisor, the system MUST automatically assign:
   - Education Service: View and Modify access (limited to materials they create or are assigned to)
   - All other services: No Access

2. **Scope Definition - Related Materials:** 
   - "Related materials" means materials that the advisor created themselves or materials that were explicitly assigned to them by an administrator
   - Personal Family Advisors can ONLY see and edit materials they created or were assigned to

3. **Service Isolation:** Personal Family Advisor with Education-only access:
   - ✅ CAN: Create/edit/delete own learning paths, courses, workshops in Education
   - ✅ CAN: View read-only family name and member list (basic context only)
   - ❌ CANNOT: View family constitution (requires explicit Constitution Service access grant)
   - ❌ CANNOT: View other advisors' education materials
   - ❌ CANNOT: Access Projects, Documents, Consultations, Assets, or any other service (No Access by default)

### Authorization Rules

**Who can perform this action:**
- **Create Personal Family Advisor account:** Admin OR Consul (Family Portal) OR External Consul
- **Modify Personal Family Advisor permissions:** Admin OR Consul (Family Portal) OR External Consul
- **View own permissions (read-only):** Personal Family Advisor themselves

**Who can view results:**
- Personal Family Advisor: Can view own permission status (read-only)
- Admin/Consul: Can view and modify all Personal Family Advisor permissions

### Permission Escalation Rules

4. **No Self-Escalation:** Personal Family Advisor CANNOT:
   - Change own permissions
   - Request access through UI self-service (must contact Admin/Consul directly)
   - View other advisors' permissions or materials

5. **Admin/Consul Escalation:** 
   - Admins and Consuls can grant access to any additional service with any permission level to Personal Family Advisors
   - Permission changes take effect immediately (real-time, advisor doesn't need to log out and log back in)

6. **Permission Persistence:** 
   - Granted permissions do NOT auto-expire
   - Admin/Consul must explicitly revoke access when no longer needed
   - Recommended: Periodic access review (quarterly) for active Personal Family Advisors

### Edge Cases

**Edge Case 1: Advisor Associated with Multiple Families**
- Education access applies to ALL associated families
- Advisor can create materials and assign them to any associated family
- Materials remain advisor-scoped (other advisors of same family cannot see)
- Family-specific restrictions managed separately (not in this story)

**Edge Case 2: Zero Materials Created Yet**
- Education Dashboard shows empty state: "Create your first workshop to get started"
- Cannot see even empty list of other advisors' materials (complete isolation)
- Clear CTA buttons: "Create Workshop", "Create Learning Path"

**Edge Case 3: Permission Revoked Mid-Session**
- Real-time permission check on EVERY API call (not just login)
- If Admin/Consul revokes Education access while advisor is working:
  - Next API call returns 403 Forbidden
  - Frontend detects permission change and shows alert: "Your access has been updated. Please refresh the page."
  - After refresh, Education no longer appears in navigation

**Edge Case 4: Direct URL Access to Restricted Service**
- Advisor bookmarks Projects URL before having access
- Later tries to access via bookmark → Access denied
- UI shows "Access Restricted" page (not generic error)
- Message: "Contact your administrator to request access to Projects"

**Edge Case 5: Family Constitution Access**
- Personal Family Advisor wants to reference family constitution for workshop preparation
- By default, constitution is NOT accessible (requires explicit permission grant)
- Advisor must request Admin/Consul to grant Constitution Service access
- Once granted, advisor can view constitution (read-only)

**Edge Case 5: Concurrent Permission Changes**
- Admin A grants Documents access, Admin B grants Projects access simultaneously
- System handles both operations independently (no conflict)
- Advisor sees both new services in navigation after changes propagate

**Edge Case 6: Family Association Removed**
- If Admin removes family association while advisor has active session:
  - Education materials tied to that family become inaccessible
  - Next API call returns 403 Forbidden: "Family association not found"
  - Advisor must refresh and will see updated family list (family removed)

---

## 🧪 Test Scenarios

### Happy Path

**Scenario 1: New Personal Family Advisor Onboarding**
1. **Given:** Admin is logged into Admin Portal
2. **When:** Admin creates new advisor account:
   - Name: "Jane Smith"
   - Email: "jane.smith@lawfirm.com"
   - Role: "Personal Family Advisor"
   - Associated family: "Anderson Family"
3. **Then:** System creates account with:
   - Education: View and Modify access (limited to own materials)
   - All other services: No Access
4. **And:** Jane receives welcome email with login link
5. **And:** Jane logs in → sees only Education in navigation
6. **And:** Jane opens Education Dashboard → empty state with "Create Workshop" button
7. **And:** Jane creates workshop "Estate Planning Basics" successfully

**Scenario 2: Admin Grants Additional Access for Project**
1. **Given:** Jane Smith (Personal Family Advisor) has Education-only access
2. **When:** Anderson Family requests document review project
3. **And:** Admin opens Permission Management for Jane Smith
4. **And:** Admin adds View and Modify access for Documents Service
5. **Then:** Permission saved successfully (audit log recorded)
6. **And:** Jane (without logging out) refreshes Advisor Portal
7. **And:** Documents link appears in Jane's navigation menu
8. **And:** Jane opens Documents Dashboard → can create/view assigned documents

---

### Negative Tests

**Scenario 1: Unauthorized Access to Restricted Service**
1. **Given:** Personal Family Advisor has Education-only access (No Access to Projects)
2. **When:** Advisor tries to access Projects via direct URL: `/advisor-portal/projects`
3. **Then:** System returns access denied error
4. **And:** UI displays "Access Restricted" page with message: "Contact your administrator to request access to Projects"
5. **And:** No project data is exposed or leaked

**Scenario 2: Attempting to View Family Constitution Without Permission**
1. **Given:** Personal Family Advisor has Education-only access (Constitution not explicitly granted)
2. **When:** Advisor tries to access Constitution via direct URL or navigation attempt
3. **Then:** System returns access denied error
4. **And:** Message displayed: "Constitution access requires explicit permission. Contact your administrator."
5. **And:** No constitution content is visible or accessible

**Scenario 3: Attempting to View Another Advisor's Education Materials**
1. **Given:** Advisor A created workshop "Financial Literacy 101" (ID: workshop-123)
2. **And:** Personal Family Advisor B has Education access
3. **When:** Advisor B tries to access workshop-123 via direct URL
4. **Then:** System returns access denied error
5. **And:** Error message: "Access Denied - You can only view your own materials"

**Scenario 4: Attempting to Self-Escalate Permissions**
1. **Given:** Personal Family Advisor is logged into Advisor Portal
2. **When:** Advisor navigates to Profile/Settings page
3. **And:** Advisor clicks on "My Permissions" section
4. **Then:** Permissions displayed as read-only list (no edit buttons)
5. **And:** Message displayed: "Contact your administrator to request permission changes"
6. **And:** No option available for self-service permission updates

---

### Edge Cases

**Scenario 1: Permission Revoked Mid-Session**
1. **Given:** Personal Family Advisor is actively working in Education Dashboard (creating workshop)
2. **When:** Admin revokes Education access (changes to No Access)
3. **And:** Advisor tries to save workshop changes (next action)
4. **Then:** System returns access denied error
5. **And:** Frontend shows alert: "Your access has been updated. Please refresh the page."
6. **And:** After refresh, Education no longer appears in navigation

**Scenario 2: Multiple Families Association**
1. **Given:** Personal Family Advisor is associated with 3 families: Anderson, Brown, Chen
2. **When:** Advisor creates workshop material in Education
3. **And:** Assigns material to "Anderson Family"
4. **Then:** Material is visible to Advisor (creator)
5. **And:** Material is NOT visible to other advisors of Anderson Family
6. **And:** Material can be reassigned to Brown or Chen families by advisor (creator)

**Scenario 3: Empty State - No Materials Created**
1. **Given:** Newly onboarded Personal Family Advisor with Education-only access
2. **When:** Advisor opens Education Dashboard for the first time
3. **Then:** Empty state displayed with:
   - Illustration/icon
   - Message: "Create your first workshop to get started"
   - "Create Workshop" button (enabled)
   - "Create Learning Path" button (enabled)
4. **And:** No list or table of materials shown (not even empty table)

---

## 🔗 Dependencies

**Story Dependencies:**

**Blocked by:** 
- **SAAS-EPIC-XXX-1** - Role Definition & Database Schema (User Story #1)
  - Requires advisor roles table with "Personal Family Advisor" role defined
  - Requires advisor permissions table structure with service-level granularity
- **SAAS-EPIC-XXX-2 or SAAS-EPIC-XXX-3** - Permission Tier Implementation (from earlier stories)
  - Requires No Access and View+Modify related permission levels implementation
  - Requires "related" scope logic (materials created by or assigned to advisor)

**Blocks:** 
- **SAAS-EPIC-XXX-1 & SAAS-EPIC-XXX-2** - Permission Management UI for Admin/Consul (User Story #1 & #2)
  - Admin/Consul need ability to modify Personal Family Advisor permissions
- **Education Service Integration** - Education Service Integration with Advisor Permissions
  - Education Service must respect advisor permission checks

**Related:**
- **User Story SAAS-EPIC-XXX-1** - Admin Permission Management (Admin can modify Personal Family Advisor permissions)
- **User Story SAAS-EPIC-XXX-2** - Consul Permission Management (Consul can modify Personal Family Advisor permissions)
- **User Story SAAS-EPIC-XXX-3** - Service Advisor Default Permissions (comparison - Service Advisors may have different default permissions based on specialization)

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Permission check on each API call: < 50ms (cached after authentication)
- Navigation menu rendering with permission filtering: < 100ms
- Permission change propagation: < 30 seconds (real-time to active sessions)
- Advisor Portal page load time: < 2 seconds (including permission data fetch)

**Security:**
- CRITICAL: Every operation MUST check advisor permissions before allowing data access (no bypass possible)
- Authentication tokens include advisor identity and role (advisors use association-based access, not single family)
- Permission checks verify advisor's access rights to specific families and services
- Audit log ALL permission assignments and changes (who made the change, when, what changed, from what to what)
- Sensitive advisor personal information encrypted in database

**Accessibility:**
- Keyboard navigation: Full support (Tab, Enter, Escape for all permission-related actions)
- Screen reader support: Clear labels for permission status ("Access granted", "Access restricted")
- Visual indicators: Clear distinction between accessible vs. restricted services (restricted services hidden from navigation)
- Error messages: Descriptive and actionable (not just technical error codes)

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Edge: Latest 2 versions

**Data Integrity:**
- Default permission assignment MUST be atomic (all services set in single operation)
- If permission assignment fails during account creation → rollback entire account creation
- Permission changes MUST be logged to audit trail (permanent record)

---

## 📝 Notes

**Open Questions:**

✅ **Resolved Questions (from Epic discussion):**

**Q1: Can Personal Family Advisor share materials with other advisors?**  
**A:** NO. Only Admin/Consul can manage cross-advisor sharing through explicit permission grants.

**Q2: Can Personal Family Advisor see list of other advisors working with same family?**  
**A:** NO. Only Admin/Consul can view advisor registry and assignments.

**Q3: Can Personal Family Advisor upgrade own permissions?**  
**A:** NO. Personal Family Advisor must contact Admin/Consul directly to request additional access.

**Q4: What happens if advisor needs urgent access to Documents mid-project?**  
**A:** Advisor must contact Admin/Consul who can grant access immediately (takes effect in < 30 seconds without logout).

**Q5: Can Personal Family Advisor see Education materials created by other advisors?**  
**A:** NO. Complete isolation - only sees own materials (materials they created themselves or were explicitly assigned to them).

**Q6: When Admin/Consul grants additional access, does it persist forever?**  
**A:** YES, until explicitly revoked. Does NOT auto-expire. Recommended practice: Periodic access review (quarterly).

**Q7: Why default to Education only instead of Projects or Documents?**  
**A:** Education is lowest-risk service (no sensitive family financial data). Advisor can demonstrate work quality through workshops before getting access to confidential information.

**Q8: Can a Personal Family Advisor be upgraded to Service Advisor or Consul later?**  
**A:** YES. Admin can change role (separate story/feature). When role changes, permissions reset to new role's defaults + any manually granted extras are reevaluated.

---

✅ **All questions resolved:**

**Q1: Should restricted services be completely hidden from navigation OR shown with "locked" icon?**  
**A:** HIDDEN. Restricted services are completely hidden from navigation for cleaner UX. Direct URL access shows "Access Restricted" page.

**Q2: Should advisor receive in-app notification when Admin grants new service access?**  
**A:** NO (not in this version). Advisor will discover new access when they refresh or navigate.

**Q3: When permission revoked mid-session, should there be grace period to save work-in-progress?**  
**A:** NO. Immediate revocation for security. No grace period.

**Q4: Can Personal Family Advisor view their own permission change history (audit log)?**  
**A:** NO (not in this version). Only Admin/Consul can view permission change history.

---

**Template Version:** 1.0.0  
**Story Version:** 1.0.0  
**Story ID:** SAAS-EPIC-XXX-4  
**Last Updated:** 2025-10-17  
**Story Owner:** [Product Manager Name]  
**Technical Lead:** [Lead Developer Name]