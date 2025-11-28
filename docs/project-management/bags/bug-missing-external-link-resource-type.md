---
title: "Missing External Link Resource Type in Knowledge Center"
category: "bug"
audience: "developer|qa"
created: "2025-11-21"
updated: "2025-11-21"
version: "1.0.0"
status: "open"
tags: ["bug", "frontend", "backend", "knowledge-center", "resources"]
owner: "product-team"
assignee_frontend: "a.manchenkova@reluna.com"
assignee_backend: "i.tkachev@reluna.com"
---

# Bug Report - Missing External Link Resource Type in Knowledge Center

> **Issue:** The "External Link" resource type is missing from the Type dropdown when creating a new resource in the Knowledge Center.

---

## 📋 Basic Information

**Issue Type:** Bug
**Project:** FG
**Summary:** External Link resource type not available in Create New Resource form
**Original Epic:** EPIC-008 Knowledge Center
**Assignee Frontend:** a.manchenkova@reluna.com
**Assignee Backend:** i.tkachev@reluna.com
**Priority:** Low
**Severity:** Minor
**Tags:** `bug`, `frontend`, `backend`, `knowledge-center`, `resources`, `ui`
**Story Points:** TBD
**Sprint:** To be assigned during sprint planning

---

## 🐛 Bug Description

**What is broken?**

When creating a new resource in the Knowledge Center, the "Type" dropdown menu does not include "External Link" as an option. This prevents users from properly categorizing resources that are external links to third-party content.

- **Functionality affected:** Resource creation in Knowledge Center
- **What's not working:** Missing "External Link" resource type in Type dropdown
- **Impact:** Users cannot properly categorize external link resources. They must either:
  - Choose an incorrect resource type (e.g., "Document", "Article")
  - Skip adding external resources to the Knowledge Center
  - Use a workaround that results in improper data categorization

---

## 👥 Affected Users

**Who is impacted by this bug?**

- **Primary Personas:**
  - Advisors creating/managing Knowledge Center resources
  - Content administrators populating the Knowledge Center
  - Family members browsing resources (indirectly - may see miscategorized content)
- **User Impact Level:** All users managing Knowledge Center content
- **Frequency:** Every time user tries to add external link resource

---

## ✅ Expected Behavior

**What SHOULD happen:**

1. User navigates to Knowledge Center and clicks to create a new resource
2. "Create New Resource" modal opens with "Basic Information" section
3. In the "Type" dropdown, user should see the following options:
   - Document
   - Article
   - Checklist
   - Constitution template
   - Video
   - Learning paths
   - Podcast
   - Guide
   - **External Link** ⬅️ This option should be present
4. User can select "External Link" as the resource type
5. When "External Link" is selected, appropriate fields appear (especially the "Link" field under "Link to the document" section)
6. User can successfully create an external link resource with proper categorization

---

## ❌ Actual Behavior

**What ACTUALLY happens:**

1. User opens "Create New Resource" modal
2. The "Type" dropdown shows these options:
   - ✓ Document
   - Article
   - Checklist
   - Constitution template
   - Video
   - Learning paths
   - Podcast
   - Guide (currently selected/highlighted in blue)
3. **"External Link" option is missing** from the dropdown
4. User cannot properly categorize external link resources
5. User must choose an incorrect type or abandon adding the resource

---

## 📸 Evidence

**Screenshots/Videos:**

See attached screenshot showing:
- "Create New Resource" modal
- "Type" dropdown menu expanded
- Available resource types listed (Document, Article, Checklist, Constitution template, Video, Learning paths, Podcast, Guide)
- "Guide" option highlighted in blue
- "External Link" option is noticeably absent
- "Link to the document" section visible below with "Link *" field

**Visual Context:**
- Modal title: "Create New Resource"
- Section: "Basic Information"
- Type dropdown fully expanded showing all current options
- Folder dropdown: "Choose folder" (collapsed)

---

## 🔍 Root Cause Analysis (To be investigated)

**Possible causes:**

1. **Frontend dropdown configuration:**
   - Resource type options hardcoded without External Link
   - Missing enum value in frontend constants
   - Type list not synchronized with backend capabilities

2. **Backend API issue:**
   - Backend supports External Link but frontend not updated
   - Resource type endpoint not returning all available types
   - Database enum missing External Link value

3. **Feature incomplete:**
   - External Link functionality partially implemented
   - Type option intentionally omitted pending full implementation
   - Frontend/backend mismatch in supported resource types

4. **Data source issue:**
   - Dropdown options fetched from API but External Link not included
   - Configuration/settings missing External Link resource type

---

## 🔧 Suggested Fix

**Areas to investigate:**

### Frontend (a.manchenkova@reluna.com):
- Check resource type dropdown component and its data source
- Verify enum or constants file defining available resource types
- Add "External Link" option to the Type dropdown
- Ensure proper form validation and field visibility for External Link type
- Verify that selecting External Link shows appropriate fields (Link field should be prominent/required)
- Check if any conditional logic needs updating for External Link type

### Backend (i.tkachev@reluna.com):
- Verify database schema supports External Link resource type
- Check if External Link is defined in resource type enum/table
- Ensure API endpoints return External Link in available types
- Verify resource creation endpoint handles External Link type correctly
- Check validation rules for External Link resources (e.g., Link field required)
- Ensure proper storage and retrieval of External Link resources

### Testing scenarios:
- [ ] External Link appears in Type dropdown
- [ ] Selecting External Link shows appropriate form fields
- [ ] Link field is required when External Link type selected
- [ ] Can successfully create External Link resource
- [ ] External Link resources display correctly in resource list
- [ ] Filtering/searching by type includes External Link
- [ ] External Link resources can be edited and deleted

---

## ✅ Acceptance Criteria for Fix

- [ ] "External Link" option is visible in the Type dropdown menu
- [ ] "External Link" option appears in logical alphabetical position or grouped appropriately
- [ ] Selecting "External Link" displays appropriate form fields
- [ ] Link field is properly validated (required, valid URL format)
- [ ] Can successfully create a resource with type "External Link"
- [ ] Created External Link resources display correctly in Knowledge Center
- [ ] External Link resources can be filtered, searched, edited, and deleted
- [ ] Type is properly saved and retrieved from backend
- [ ] No regression in other resource types

---

## 📌 Related Information

**Related Epic:** Knowledge Center functionality
**Module:** Knowledge Center - Resource Management
**Environment:** Development/Staging
**Browser/Platform:** Cross-browser issue (appears to be data/configuration issue, not browser-specific)

**Workaround:**
Currently, users may select "Article" or "Document" type and use the Link field, but this results in improper categorization and may cause issues with filtering, searching, or displaying resources.

---

## 🎯 Business Impact

**Why this matters:**

- **Content Organization:** External links cannot be properly categorized, leading to messy data
- **Resource Discovery:** Users filtering by type won't find external links correctly
- **User Experience:** Content creators confused about how to add external resources
- **Data Quality:** Miscategorized resources reduce Knowledge Center effectiveness

**Priority/Severity Justification:**
- **Priority: Low** - Workarounds exist (using other types), not blocking core functionality
- **Severity: Minor** - Affects content organization but doesn't break critical workflows
- Should be addressed to maintain proper data structure and user experience

---

## 📅 Status Tracking

- [ ] Bug confirmed and reproduced
- [ ] Root cause identified (Frontend vs Backend)
- [ ] Fix implemented (Frontend)
- [ ] Fix implemented (Backend if needed)
- [ ] Code review completed
- [ ] Testing completed (all resource types work correctly)
- [ ] Documentation updated
- [ ] Ready for deployment
