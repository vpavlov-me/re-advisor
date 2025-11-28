---
title: "Bug Report: Non-existent 'Links' Resource Type in Filter Dropdown"
category: "bug"
audience: "developer|qa|frontend|backend"
created: "2025-11-21"
updated: "2025-11-21"
version: "1.0.0"
status: "active"
tags: ["bug", "frontend", "backend", "ui", "knowledge-base", "filters", "data"]
owner: "product-team"
assignee_frontend: "a.manchenkova@reluna.com"
assignee_backend: "i.tkachev@reluna.com"
priority: "Low"
severity: "Minor"
---

# Bug Report: Non-existent 'Links' Resource Type in Filter Dropdown

> **Status:** Active
> **Priority:** Low
> **Severity:** Minor
> **Assignee (Frontend):** a.manchenkova@reluna.com
> **Assignee (Backend):** i.tkachev@reluna.com

---

## 📋 Basic Information

**Issue Type:** Bug
**Project:** FG
**Summary:** Filter dropdown shows non-existent "Links" resource type that doesn't exist in the system
**Original Epic:** EPIC-008 Knowledge Center
**Assignee Frontend:** a.manchenkova@reluna.com
**Assignee Backend:** i.tkachev@reluna.com
**Priority:** Low
**Severity:** Minor
**Tags:** `bug`, `frontend`, `backend`, `ui`, `knowledge-base`, `filters`, `data-integrity`
**Story Points:** TBD
**Sprint:** TBD

---

## 🐛 Bug Description

**What is broken?**

In the Knowledge Base "Search and Filters" section, when opening the resource type filter dropdown, the system displays a resource type called "Links" which does not actually exist in the system. This is a data integrity issue where the filter options are out of sync with actual available resource types.

**Affected Area:**
- **Component:** Knowledge Base Search and Filters
- **Location:** Resource Type filter dropdown
- **Navigation Path:** Home → Knowledge Base → Search and Filters dropdown

**Impact:**
- Confusing user experience - users may select "Links" expecting to filter by this type
- No results or unexpected behavior when "Links" filter is applied
- Filter list contains invalid/phantom option
- Data integrity issue between frontend filter options and backend resource types

**Note:** There IS an "External Links" resource type which is valid. The standalone "Links" type should not exist.

---

## 👥 Affected Users

**Who is impacted by this bug?**

- **Primary Personas:**
  - Family Members searching Knowledge Base
  - Advisors browsing resources
  - Administrators managing content

- **User Impact Level:** All users who use resource type filters
- **Frequency:** Every time the filter dropdown is opened

---

## ✅ Expected Behavior

**What SHOULD happen:**

1. Resource type filter dropdown should ONLY show valid, existing resource types
2. Valid resource types should be:
   - All
   - Articles
   - Documents
   - Videos
   - Podcasts
   - Templates
   - Guides
   - **External Links** (not "Links")
   - Checklists
   - Learning Paths

3. Filter options should be synchronized with:
   - Backend database enum/resource type definitions
   - Actual creatable resource types
   - API endpoints that return resource types

4. Selecting a filter type should return only resources of that specific type

**Expected dropdown list:**
```
Type: All
Articles
Documents
Videos
[NO "Links" HERE]
Podcasts
Templates
Guides
External Links  ← Correct naming
Checklists
Learning Paths
```

---

## ❌ Actual Behavior

**What ACTUALLY happens:**

1. Filter dropdown shows "Links" as a selectable option
2. "Links" appears between "Videos" and "Podcasts" in the list
3. This resource type does not exist in the system
4. User can select "Links" but likely gets:
   - No results (if backend correctly rejects invalid type)
   - OR error (if backend validation fails)
   - OR unexpected behavior (if backend tries to process invalid type)

**Actual dropdown list:**
```
Type: All
Articles
Documents
Videos
Links  ← SHOULD NOT EXIST
Podcasts
Templates
Guides
External Links  ← Correct type exists separately
Checklists
Learning Paths
```

**Confusion:** System has both "Links" (invalid) AND "External Links" (valid) in the same dropdown.

---

## 📸 Evidence

**Screenshots:**

1. **Filter dropdown showing "Links" option:**
   ![Search and Filters with Links](../attachments/links-filter-bug-1.png)
   - Shows "Search and Filters" section
   - "Links" displayed as selected filter type (highlighted in blue box)

2. **Dropdown menu showing all types including invalid "Links":**
   ![Dropdown with Links type](../attachments/links-filter-bug-2.png)
   - Shows complete dropdown menu
   - "Links" option visible with checkmark (4th option after Videos)
   - "External Links" appears separately later in list (8th option)

**Expected vs Actual:**
- **Expected:** Only "External Links" should exist
- **Actual:** Both "Links" AND "External Links" appear in dropdown

---

## 🔄 Steps to Reproduce

**Prerequisites:**
- Access to Knowledge Base
- Search and Filters section visible

**Steps:**
1. Navigate to Knowledge Base main page
2. Locate "Search and Filters" section (top of page)
3. Click on the resource type filter dropdown (shows current selection, e.g., "Links")
4. Observe the dropdown menu options
5. Note that "Links" appears as option #4 (after Videos, before Podcasts)
6. Also note that "External Links" appears separately as option #8

**Reproducibility:** 100% - "Links" always appears in the dropdown

**Environment:**
- **Browser:** All browsers
- **OS:** All operating systems
- **User Role:** All roles (family members, advisors, admins)
- **Component:** Knowledge Base Search and Filters

---

## 🎯 Acceptance Criteria for Fix

**Fix is complete when:**

- [ ] "Links" resource type is removed from filter dropdown
- [ ] Only valid resource types appear in dropdown
- [ ] "External Links" remains as valid option (if it's a real type)
- [ ] Filter dropdown options match backend resource type definitions exactly
- [ ] Frontend filter options are synced with backend enum/constants
- [ ] Selecting any filter type returns correct results
- [ ] No console errors when opening/using filter dropdown
- [ ] QA verifies all resource types in dropdown actually exist in system

---

## 💡 Root Cause Analysis & Suggested Solutions

**Possible Root Causes:**

1. **Hardcoded frontend filter list** - Frontend has static list that's out of sync with backend
2. **Legacy resource type** - "Links" was deprecated but not removed from filter config
3. **Incorrect API response** - Backend returns invalid resource type in filter options
4. **Database migration issue** - Old resource type data not cleaned up
5. **Configuration mismatch** - Frontend config file has outdated resource type list

**Investigation Steps:**

1. **Frontend Investigation:**
   - [ ] Check where filter options are defined (component, config file, constants)
   - [ ] Verify if list is hardcoded or fetched from API
   - [ ] Review filter component code for resource type mapping

2. **Backend Investigation:**
   - [ ] Check resource type enum/constants definition
   - [ ] Verify API endpoint that provides filter options
   - [ ] Query database for any resources with type "Links"
   - [ ] Review database schema for resource_type column/enum

**Suggested Solutions:**

### Solution A: Frontend Fix (if hardcoded list)
```typescript
// Remove "Links" from hardcoded filter options
const RESOURCE_TYPES = [
  { value: 'all', label: 'All' },
  { value: 'articles', label: 'Articles' },
  { value: 'documents', label: 'Documents' },
  { value: 'videos', label: 'Videos' },
  // { value: 'links', label: 'Links' }, // REMOVE THIS
  { value: 'podcasts', label: 'Podcasts' },
  { value: 'templates', label: 'Templates' },
  { value: 'guides', label: 'Guides' },
  { value: 'external_links', label: 'External Links' }, // Keep this
  { value: 'checklists', label: 'Checklists' },
  { value: 'learning_paths', label: 'Learning Paths' },
];
```

### Solution B: Backend Fix (if API returns invalid type)
```python
# Remove "Links" from resource type enum/API response
class ResourceType(str, Enum):
    ARTICLES = "articles"
    DOCUMENTS = "documents"
    VIDEOS = "videos"
    # LINKS = "links"  # REMOVE THIS
    PODCASTS = "podcasts"
    TEMPLATES = "templates"
    GUIDES = "guides"
    EXTERNAL_LINKS = "external_links"  # Keep this
    CHECKLISTS = "checklists"
    LEARNING_PATHS = "learning_paths"
```

### Solution C: Dynamic Sync (best practice)
- Frontend fetches available resource types from backend API
- Backend provides only valid, active resource types
- Ensures frontend and backend always stay in sync

---

## 🔍 Technical Details

**Needs Investigation:**

- [ ] Where is the filter dropdown data source? (Frontend constants vs API call)
- [ ] Does "Links" resource type exist in database at all?
- [ ] Are there any actual resources with type "Links" in the system?
- [ ] What happens when user selects "Links" filter? (Error? Empty results?)
- [ ] Is "External Links" the correct/only valid link-related type?

**Backend Tasks:**
1. Verify resource type enum/constants
2. Check API endpoint: GET `/api/resources/types` (or similar)
3. Database query: `SELECT DISTINCT type FROM resources WHERE type = 'links'`
4. Clean up any orphaned "Links" type data if found

**Frontend Tasks:**
1. Locate filter dropdown component
2. Identify data source for resource type options
3. Remove "Links" from list (if hardcoded)
4. OR fix API integration (if backend needs to provide correct list)
5. Add unit test to prevent invalid resource types in filters

---

## 🧪 Testing Requirements

**QA must verify:**

1. **Filter Dropdown Contents:**
   - [ ] "Links" is no longer visible in dropdown
   - [ ] All remaining options are valid resource types
   - [ ] "External Links" still appears (if valid)
   - [ ] Options are in correct/alphabetical order

2. **Filter Functionality:**
   - [ ] Selecting "All" shows all resources
   - [ ] Selecting each individual type filters correctly
   - [ ] No errors in console when using filters
   - [ ] Filter selection persists correctly

3. **Data Validation:**
   - [ ] All filter options correspond to actual resource types in database
   - [ ] No orphaned "Links" type resources exist
   - [ ] Backend returns only valid resource types in API response

4. **Edge Cases:**
   - [ ] If user had "Links" filter selected (old state), system handles gracefully
   - [ ] URL parameters with `type=links` are rejected or redirected
   - [ ] Bookmarks with invalid filter show appropriate error/default

5. **Cross-Browser Testing:**
   - [ ] Chrome, Firefox, Safari, Edge - all show correct filter list

---

## 🔗 Related Issues

**Potentially Related:**
- Any other Knowledge Base filter bugs
- Resource type management issues
- Data synchronization problems between frontend/backend

**Related User Stories:**
- Knowledge Base search and filtering functionality
- Resource type management

---

## 📊 Priority Justification

**Why Low Priority + Minor Severity?**

- **Low Priority:** Cosmetic issue, doesn't break core functionality
- **Minor Severity:** Users can still filter by other valid types, minor confusion only
- **Business Impact:** Low - users likely won't notice or will skip "Links" option
- **Technical Effort:** Low - simple removal from list (frontend or backend)
- **Risk:** Very Low - removing invalid option has no negative impact
- **User Experience:** Minor inconvenience, not blocking workflows

**However, consider increasing priority if:**
- Many users are selecting "Links" and getting confused
- "Links" selection causes errors or crashes
- This indicates larger data integrity issues

**Recommendation:** Fix when convenient, can be bundled with other Knowledge Base improvements.

---

## 📅 Timeline

**Reported:** 2025-11-21
**Target Fix Date:** TBD (Next available sprint or maintenance window)
**Estimated Effort:** 1-2 hours (investigation + fix + testing)

---

## 📝 Notes

**Investigation Priority:**
1. First, determine WHERE "Links" is defined (frontend vs backend)
2. Check if any actual resources have type "Links" in database
3. Understand relationship between "Links" and "External Links"

**Possible Quick Win:**
- If frontend hardcoded list, this is a 5-minute fix
- If backend API issue, requires coordination between teams

**Documentation Updates:**
- After fix, document official list of valid resource types
- Add validation to prevent future invalid types in filters
- Consider adding automated test to verify filter options match backend enums

**Future Prevention:**
- Implement dynamic resource type loading from backend
- Add backend validation that returns only active resource types
- Create shared constants between frontend/backend for resource types

---

**Bug ID:** TBD (to be assigned in Jira)
**Reported by:** e.savelova
**Date:** 2025-11-21
