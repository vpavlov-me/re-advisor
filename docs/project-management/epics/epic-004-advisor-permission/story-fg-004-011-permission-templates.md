---
story_id: "STORY-FG-004-011"
title: "Apply Permission Templates for Advisor Access"
type: "story"
epic_id: "EPIC-004"
created: "2025-10-16"
updated: "2025-10-20"
priority: "medium"
status: "ready"
estimate: "16h"
story_points: 8
sprint: "Sprint 47"
assignee: ""
labels: ["advisor", "permissions", "templates", "bulk-assignment", "consul", "admin"]
dependencies: ["STORY-FG-004-001"]
---

# User Story: Apply Permission Templates for Advisor Access

> **Note:** This User Story is for Jira FG project. Copy relevant sections to Jira issue description.

---

**Document Metadata:**
```yaml
doc_id: "FG-XXX"
title: "User Story: Apply Permission Templates for Advisor Access"
type: "user-story"
category: "feature"
audience: "product-manager|business-analyst|developer|qa"
complexity: "intermediate"
created: "2025-10-17"
updated: "2025-10-17"
version: "1.0.0"
status: "ready-for-grooming"
tags: ["user-story", "advisor-portal", "permissions", "templates", "access-control"]
related: ["FG-EPIC-XXX", "DOC-USR-003"]
owner: "product-team"
priority: "high"
estimated_points: "5-8"
```

---

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As an Admin/Consul, I want to use permission templates so that I can quickly assign appropriate access levels
**Epic Link:** FG-[EPIC-NUMBER] - Advisor Portal User Roles and Access Management
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Admin or Consul (Family Portal Consul / External Consul),
**I want to** apply predefined permission templates when setting up advisor access,
**so that** I can quickly and consistently assign appropriate module access levels without manually configuring each permission.

---

## 🎯 Business Context

**Why is this Story important?**

**User Pain Points Solved:**
- Manual permission configuration is time-consuming and error-prone when onboarding advisors
- Risk of inconsistent access levels across advisors with similar roles
- Difficulty remembering which modules each advisor type typically needs
- Tedious process when managing multiple advisors with similar responsibilities

**Business Outcomes Expected:**
- Reduce advisor onboarding time from 15+ minutes to under 3 minutes
- Ensure consistent access patterns across advisor types
- Minimize configuration errors that could lead to security issues or operational inefficiencies
- Enable Family Council members to safely delegate advisor access management

**Strategic Alignment:**
- Supports scalable multi-advisor family operations
- Reduces administrative burden on family leadership
- Improves governance transparency through standardized access patterns
- Enables families to confidently expand their advisory team

---

## ✅ Acceptance Criteria

### 1. Template Selection Interface

1. **Given** I am logged in as Admin or Consul,
   **When** I navigate to advisor permission management screen,
   **Then** I see a "Use Template" option with dropdown containing available templates.

2. **Given** I am Admin,
   **When** I view permission template options,
   **Then** I see templates: "External Consul", "Consul", "Admin", and specialized role templates (e.g., "Succession Planning Specialist", "Philanthropy Advisor").

3. **Given** I am Consul (Family Portal or External),
   **When** I view permission template options,
   **Then** I see only specialized role templates for Personal and Service Advisors (NOT Consul or Admin templates).

### 2. Template Application

4. **Given** I select a permission template,
   **When** the template is applied,
   **Then** all module permissions are automatically populated according to the template configuration.

5. **Given** I apply "External Consul" template,
   **When** template loads,
   **Then** all 10 modules (Constitution, Meetings, Communication, Assets, Education, Philanthropy, Decisions, Succession, Conflict Resolution, Tasks) are set to "Manage" level.

6. **Given** I apply "Consul" template,
   **When** template loads,
   **Then** all 10 modules are set to "Manage" level.

7. **Given** I apply "Admin" template,
   **When** template loads,
   **Then** all 10 modules are set to "Manage" level AND "Can manage permissions" checkbox is enabled.

8. **Given** I apply a specialized role template (e.g., "Succession Planning Specialist"),
   **When** template loads,
   **Then** relevant modules are set to appropriate levels (e.g., Succession: Manage, Education: Edit, other modules: View or no access).

### 3. Template Customization After Application

9. **Given** I have applied a permission template,
   **When** template permissions are loaded,
   **Then** I can modify individual module permissions before saving.

10. **Given** I modify permissions after applying template,
    **When** I save changes,
    **Then** the customized permissions are saved (not template defaults).

### 4. Permission Hierarchy Enforcement

11. **Given** I am Consul (not Admin),
    **When** I attempt to apply "Admin" or "Consul" templates,
    **Then** these templates are NOT available in my dropdown options.

12. **Given** I am Admin,
    **When** I apply any template,
    **Then** I can assign all three permission levels (View, Edit, Manage) to any module.

13. **Given** I am Consul,
    **When** I apply a template for Personal or Service Advisor,
    **Then** I can assign all three permission levels (View, Edit, Manage) to any module for these advisors.

### 5. User Feedback and Validation

14. **Given** I select a template,
    **When** permissions are populated,
    **Then** I see a confirmation message: "Template '[Template Name]' applied. You can customize permissions before saving."

15. **Given** I am on permission management screen,
    **When** I hover over a template option,
    **Then** I see a tooltip describing which modules and access levels this template includes.

### 6. Visual Indication

16. **Given** I have applied a template,
    **When** viewing permission form,
    **Then** I see an indicator showing which template was used (e.g., "Based on: External Consul template" with option to "Clear template").

17. **Given** I modify permissions after applying template,
    **When** I change any permission setting,
    **Then** the template indicator updates to show "Custom (modified from [Template Name])".

**Additional Criteria:**
- [ ] Template selection is visible and accessible within 2 clicks from advisor list
- [ ] All permission changes (via template or manual) are logged in audit trail
- [ ] Loading template does not cause page refresh or navigation away from current screen
- [ ] Template names are clear and self-explanatory without additional documentation

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Figma: [Link to permission template selector design]
- Figma: [Link to template application confirmation flow]

**User Flow:**

1. **Admin/Consul navigates to advisor management**
   - Clicks "Add New Advisor" or "Edit Permissions" for existing advisor

2. **User sees permission configuration form**
   - Form shows 10 modules with permission dropdowns (None/View/Edit/Manage)
   - At top of form: "Quick Setup" section with "Use Template" dropdown

3. **User selects template from dropdown**
   - Dropdown shows role-appropriate templates with descriptions
   - Hovering shows tooltip with permission summary

4. **System populates permissions**
   - All module permissions update instantly
   - Confirmation message appears: "Template applied - customize if needed"
   - Template name indicator appears above form

5. **User reviews and optionally customizes**
   - Can modify any permission before saving
   - Template indicator updates if changes made

6. **User saves permissions**
   - Final permissions saved (with customizations if made)
   - Audit log records template used and any modifications

**Visual Elements:**
- Template dropdown prominently placed (top of permission section)
- Color-coded permission levels (View: blue, Edit: yellow, Manage: green)
- Clear template indicator badge showing active template
- Tooltip on hover for template descriptions

---

## 🔒 Business Rules

### Validation Rules:

1. **Template Availability Based on User Role:**
   - Admin can access ALL templates (External Consul, Consul, Admin, specialized roles)
   - Consul can access ONLY specialized role templates (Personal/Service Advisor templates)
   - Personal Family Advisor cannot access template feature
   - Service Advisor cannot access template feature

2. **Permission Level Constraints:**
   - Template permissions must respect user's own permission hierarchy
   - Admin can apply templates granting any permission level
   - Consul can apply templates for Personal/Service Advisors with any permission level
   - Cannot create template that grants higher permissions than assigner possesses

3. **Template Modification Rules:**
   - After applying template, user can reduce permissions to any lower level
   - After applying template, user can increase permissions up to their own permission ceiling
   - Consul cannot manually override template to grant Consul or Admin level permissions

### Authorization:

- **Who can use permission templates:** 
  - Admin (all templates)
  - Family Portal Consul (specialized templates only)
  - External Consul (specialized templates only)

- **Who can view template options:** 
  - Same as above (templates visible only to authorized roles)

- **Who cannot use templates:**
  - Personal Family Advisor
  - Service Advisor
  - Regular Family Members

### Edge Cases:

- **User tries to apply template above their permission level:**
  - Template is not shown in dropdown (preventive)
  - If somehow accessed: Display error "You cannot apply this template - insufficient permissions"

- **Template includes module user doesn't have Manage access to:**
  - For Admin: No restriction
  - For Consul applying Personal/Service Advisor template: Allowed (Consuls can grant permissions even if they don't manage that specific module)

- **Applying template to user's own permissions:**
  - Admin can apply template to own permissions (for testing/demonstration)
  - Consul cannot increase own permissions via template (system validation prevents)

- **Template definition changes after advisor was created:**
  - Existing advisor permissions remain unchanged
  - Re-applying template applies new definition
  - System tracks template version in audit log

---

## 🧪 Test Scenarios

### Happy Path:

**Scenario 1: Admin applies External Consul template**
1. Admin logs in and navigates to "Add New Advisor"
2. Admin enters advisor basic information (name, email)
3. Admin clicks "Use Template" dropdown in permission section
4. Admin selects "External Consul" template
5. System populates all 10 modules with "Manage" permission
6. Admin reviews permissions (optionally modifies specific modules)
7. Admin clicks "Save Advisor"
8. System creates advisor with template-based permissions
9. **Expected Result:** Advisor has Manage access to all modules, audit log shows "External Consul template applied"

**Scenario 2: Consul applies specialized template for Service Advisor**
1. Consul logs in and navigates to "Add New Advisor"
2. Consul enters advisor information, selects role "Service Advisor - Succession Planning"
3. Consul clicks "Use Template" dropdown
4. Consul sees only specialized templates (NOT Consul/Admin templates)
5. Consul selects "Succession Planning Specialist" template
6. System populates: Succession (Manage), Education (Edit), Tasks (Edit), other modules (View)
7. Consul modifies Assets permission from View to Edit
8. Consul clicks "Save Advisor"
9. **Expected Result:** Advisor created with customized permissions, template indicator shows "Custom (modified from Succession Planning Specialist)"

### Negative Tests:

**Scenario 1: Consul attempts to access Admin template**
1. Consul logs in and navigates to advisor permission management
2. Consul clicks "Use Template" dropdown
3. **Expected Result:** Admin and Consul templates are NOT visible in dropdown
4. Consul sees only message: "Available templates for Service/Personal Advisors" with specialized options

**Scenario 2: Personal Advisor tries to use templates**
1. Personal Family Advisor logs in
2. Personal Advisor navigates to advisor list (if accessible)
3. **Expected Result:** No "Add Advisor" or "Manage Permissions" options visible
4. If directly accessing URL: Error message "You do not have permission to manage advisor access"

**Scenario 3: Applying template with invalid permissions**
1. Admin applies "External Consul" template
2. Admin manually tries to add custom permission not in system (via browser manipulation)
3. **Expected Result:** System validates permissions on save, shows error "Invalid permission level detected"

### Edge Cases:

**Scenario 1: Template customization and re-application**
1. Admin applies "External Consul" template to advisor
2. Admin modifies Assets permission from Manage to View
3. Admin saves advisor
4. Later, Admin edits same advisor permissions
5. Admin re-applies "External Consul" template
6. **Expected Result:** ALL permissions reset to template defaults (including Assets back to Manage), confirmation prompt warns "This will overwrite current custom permissions"

**Scenario 2: Consul managing advisor with higher permissions**
1. Admin creates Service Advisor with Manage access to Constitution
2. Consul later edits this advisor's permissions
3. Consul applies "Philanthropy Advisor" template (which has View on Constitution)
4. **Expected Result:** Constitution permission changes from Manage to View (Consul can reduce permissions even if higher than template)

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** 
  - FG-XXX - Define advisor role hierarchy and permission levels (MUST be completed)
  - FG-XXX - Implement permission management UI for manual permission assignment (SHOULD be completed first for baseline functionality)

- **Blocks:** 
  - FG-XXX - Bulk advisor permission updates using templates
  - FG-XXX - Template management and customization (Admin-only feature to create custom templates)


---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Template application (populating form fields): < 500ms
- Template dropdown load time: < 200ms
- No page refresh required when applying template

**Security:**
- Template selection validated server-side (not just UI restriction)
- Cannot apply template granting permissions above user's own level (enforced at business logic layer)
- Audit trail captures template usage with timestamp and user ID

**Usability:**
- Template dropdown accessible within 2 clicks from advisor list
- Template names clearly indicate target advisor role and scope
- Tooltip/description appears on hover without requiring click
- Mobile-responsive design for template selection

**Accessibility:**
- Template dropdown keyboard navigable
- Screen reader announces selected template and permission changes
- WCAG 2.1 AA compliance for template selector

**Browser Support:**
- Chrome: Last 2 versions
- Safari: Last 2 versions
- Firefox: Last 2 versions
- Edge: Last 2 versions

---

## 📝 Notes

**Open Questions:**
- [x] **Q: How many specialized templates should be predefined?**
  - A: Start with 4 specialized templates: (1) Succession Planning Specialist, (2) Philanthropy Advisor, (3) Financial Oversight Advisor, (4) Communication Facilitator. More can be added based on family feedback.

- [x] **Q: Should template application require confirmation dialog?**
  - A: Yes, if overwriting existing custom permissions. No, if applying to new advisor or advisor with no permissions set yet.

- [x] **Q: Can users create custom templates or only use predefined ones?**
  - A: Phase 1 (this story): Only predefined templates. Phase 2 (future story): Admin can create custom templates for their family.

- [x] **Q: Should template dropdown be searchable for large template lists?**
  - A: No for Phase 1 (< 10 templates expected). Yes for Phase 2 when custom templates introduced.

- [x] **Q: What happens if advisor role changes - should template be reapplied automatically?**
  - A: No automatic reapplication. System warns Admin/Consul: "Role changed - consider reviewing permissions or reapplying template."

- [ ] **Q: Should there be a "Template Library" page showing all templates with detailed descriptions?**
  - Decision needed: Helpful for transparency, but adds UI complexity. Consider for Phase 2.

- [x] **Q: How to handle template versioning if definitions change over time?**
  - A: Audit log tracks template version used. Existing advisors NOT automatically updated. Admin can manually reapply updated template if desired.

**Design Considerations:**
- Template indicator should be non-intrusive but always visible when permissions are based on template
- Consider "Recommend Template" feature that suggests template based on advisor role selected
- Future enhancement: Show "popular templates" or "recently used templates" at top of dropdown

**Testing Notes:**
- Test with all role combinations (Admin → all templates, Consul → specialized only)
- Verify template cannot be bypassed via API direct calls
- Test template application with slow network (ensure form doesn't become unresponsive)
- Verify audit log captures template details correctly

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-17
**Story Status:** Ready for Grooming
**Estimated Complexity:** Medium (5-8 story points estimated)