---
title: "Featured Resource Status Resets After Viewing Any Resource"
category: "bug"
audience: "developer|qa|product-manager"
created: "2025-11-21"
updated: "2025-11-21"
version: "1.0.0"
status: "fixed"
tags: ["bug", "frontend", "backend", "knowledge-base", "featured", "state-management"]
owner: "product-team"
maintainer: "product-team"
reviewer: ""
assignee_frontend: "a.manchenkova@reluna.com"
assignee_backend: "i.tkachev@reluna.com"
---

# Bug: Featured Resource Status Resets After Viewing Any Resource

> **Issue:** Featured flag on resources is lost/reset after user views any resource in Knowledge Base

---

## 📋 Basic Information

**Issue Type:** Bug
**Project:** FG
**Summary:** Featured resource status is lost/reset after user opens/views any resource in Knowledge Base
**Original Epic:** EPIC-008 Knowledge Center
**Assignee Frontend:** a.manchenkova@reluna.com
**Assignee Backend:** i.tkachev@reluna.com
**Priority:** High
**Severity:** Major
**Tags:** `bug`, `frontend`, `backend`, `knowledge-base`, `featured`, `state-management`, `data-persistence`
**Story Points:** [To be estimated]
**Sprint:** [To be assigned during sprint planning]

---

## 🐛 Bug Description

**What is broken?**

When a user marks a resource as "Featured" in Knowledge Base:
- The featured status appears to be set successfully (resource shows as featured)
- User navigates to view/open any resource (the featured one or any other)
- **After returning to the main Knowledge Base view, the featured status is lost**
- The resource is no longer marked as featured
- The "Featured" tab count does not reflect the previously featured resource
- This happens consistently every time a user views any resource

**Business Impact:**
- Featured resources cannot be reliably curated
- Users lose their featured selections unexpectedly
- Defeats the purpose of the Featured functionality
- Creates confusion and frustration for users
- Forces users to re-feature resources repeatedly
- May indicate broader data persistence issue

---

## 👥 Affected Users

**Who is impacted by this bug?**

- **Primary Personas:** Family Members, Advisors, Administrators - anyone using Featured functionality
- **User Impact Level:** All users attempting to curate featured resources
- **Frequency:** Every time a user views any resource after featuring it (100% reproduction rate)
- **Workflow Disruption:** Severely impacts Knowledge Base curation and organization

---

## ✅ Expected Behavior

**What SHOULD happen:**

1. User marks a resource as "Featured" (via star icon, context menu, or similar)
2. System saves the featured status to the database
3. Resource appears in "Featured" tab
4. "Featured" tab count increases (e.g., "Featured 1")
5. User navigates to view/open any resource
6. User reads or interacts with the resource
7. User returns to main Knowledge Base view
8. **Featured resource REMAINS featured**
9. "Featured" tab still shows correct count
10. Featured status persists across:
    - Viewing resources
    - Page refreshes
    - Navigation within app
    - Logout/login sessions

**Expected persistence:**
- Featured status is a property of the resource stored in database
- Should not change unless user explicitly un-features the resource
- Should be independent of viewing/navigation actions

---

## ❌ Actual Behavior

**What ACTUALLY happens:**

1. User marks a resource as "Featured" (via star icon, context menu, or similar)
2. System appears to save the featured status
3. Resource appears in "Featured" tab
4. "Featured" tab count increases (e.g., "Featured 1")
5. User navigates to view/open **any resource** (featured or not)
6. User reads or interacts with the resource
7. User returns to main Knowledge Base view
8. **Featured status is LOST/RESET**
9. Resource no longer appears as featured
10. "Featured" tab count resets to 0
11. User must re-feature the resource (which will be lost again)

**Trigger:** Simply viewing/opening any resource causes featured status to reset

---

## 📸 Evidence

**Video Recording:**
- [Video recording provided showing the bug reproduction]
- Video demonstrates:
  - Resource being marked as featured
  - User opening/viewing a resource
  - Featured status disappearing after returning to main view

**Expected Observations:**
- Initial state: Resource marked as featured, "Featured" tab shows count
- Action: User opens/views any resource
- Result: After returning, featured status is gone, count is 0

---

## 🔄 Steps to Reproduce

**Environment:**
- Application: RE:Advisor (Family Governance Platform)
- Module: Knowledge Center / Knowledge Base
- Feature: Featured Resources
- User Role: [Any role with Knowledge Base access]

**Detailed Steps:**

### Setup
1. Navigate to Knowledge Center → Knowledge Base
2. Ensure at least one resource exists (any type: Article, Checklist, External Link)
3. Verify resource is NOT currently featured

### Reproduce Bug
1. Mark a resource as "Featured":
   - Click star icon next to resource, OR
   - Open resource context menu and select "Add to Featured", OR
   - Use whatever UI mechanism exists for featuring
2. **Verify featured status is set:**
   - Resource shows featured indicator (star icon filled, badge, etc.)
   - "Featured" tab count increases (e.g., "Featured 1")
   - Optional: Switch to "Featured" tab and verify resource appears there
3. **Trigger the bug:**
   - Click to open/view ANY resource (the featured one or a different one)
   - Resource detail view opens
4. **Return to main Knowledge Base view:**
   - Click back button, close modal, or navigate back to main list
5. **BUG: Observe featured status is lost:**
   - Previously featured resource no longer shows featured indicator
   - "Featured" tab count resets to 0
   - Resource does not appear in "Featured" tab

**Reproduction Rate:** 100% (consistent every time)

**Variations to Test:**
- Featuring the resource, then viewing THE SAME resource
- Featuring resource A, then viewing different resource B
- Featuring multiple resources, then viewing any resource (all featured statuses lost?)
- Featuring resource, refreshing page, then viewing resource (does refresh also reset?)

---

## 🔍 Root Cause Analysis (Initial Hypothesis)

**Potential causes:**

### Frontend Issues

1. **State management problem:**
   - Featured status stored in local component state instead of persisted state
   - State reset when navigating between views
   - Not properly updating Redux/Context store
   - State overwritten by fresh API response without featured flags

2. **API response overwriting local state:**
   - After viewing resource, API refetch returns resources without featured flags
   - Frontend replaces state with API response, losing featured status
   - Featured status not included in resource list API response

3. **Routing/navigation issue:**
   - Component unmount/remount loses local state
   - Featured status not persisted before navigation
   - No state restoration after navigation

### Backend Issues

4. **Featured status not saving to database:**
   - API endpoint returns success but doesn't actually save
   - Database constraint or validation preventing save
   - Transaction rollback issue

5. **API response not including featured flag:**
   - GET `/api/resources` endpoint doesn't include `is_featured` field
   - Featured status exists in DB but not serialized in response
   - Different endpoints returning inconsistent data

6. **Featured status tied to wrong scope:**
   - Featured flag tied to session/temporary state instead of resource
   - Flag cleared when viewing resources (incorrect logic)

### Data Model Issues

7. **Database design problem:**
   - Featured status stored in wrong table or relation
   - ON DELETE CASCADE or similar removing featured status
   - Trigger or database logic incorrectly clearing featured flag

**Investigation needed:**
- Check Network tab: Does POST/PUT request to set featured succeed?
- Check Database: After featuring, is `is_featured` flag set in DB?
- Check API response: Does GET `/api/resources` include `is_featured` field?
- Check Frontend state: Is featured status in Redux/Context store?
- Check if featured status resets on page refresh (isolate frontend vs backend issue)

---

## 🛠 Technical Context

**Related Components:**
- **Frontend:** Knowledge Base resource list component (React)
- **Frontend:** Featured resources state management (Redux/Context)
- **Frontend:** Resource detail view component
- **Frontend:** Navigation/routing logic
- **Backend API:** POST/PUT `/api/resources/{id}/featured` (or similar)
- **Backend API:** GET `/api/resources` (list endpoint)
- **Backend API:** GET `/api/resources/{id}` (detail endpoint)
- **Database:** Resources table with `is_featured` field (or separate featured_resources junction table)

**Expected API Endpoints:**
```
POST /api/resources/{id}/feature     - Mark resource as featured
DELETE /api/resources/{id}/feature   - Unmark resource as featured
GET /api/resources                   - List resources (should include is_featured flag)
GET /api/resources?featured=true     - List only featured resources
```

**Expected Data Model:**
```javascript
// Resource object should include:
{
  id: "uuid",
  title: "Resource Title",
  type: "article|checklist|external_link",
  is_featured: true/false,  // <-- This flag
  created_at: "timestamp",
  // ... other fields
}
```

**Repository References:**
- **Technical Implementation:** See `../FG/frontend/` (Knowledge Center module)
- **API Implementation:** See `../FG/backend/knowledge_base_service/` (or similar)

---

## ✅ Acceptance Criteria for Fix

**Definition of Done:**

### Functional Requirements
- [ ] User can mark a resource as featured
- [ ] Featured status PERSISTS after viewing any resource
- [ ] Featured status PERSISTS after page refresh
- [ ] Featured status PERSISTS after logout/login
- [ ] "Featured" tab count accurately reflects number of featured resources
- [ ] Featured resources appear in "Featured" tab correctly
- [ ] User can un-feature a resource (remove featured status)
- [ ] Multiple resources can be featured simultaneously
- [ ] Featured status is user-specific (if feature is per-user) OR global (if feature is system-wide)

### API Requirements
- [ ] POST/PUT request to set featured status returns success and actually saves to DB
- [ ] Database stores featured status correctly
- [ ] GET `/api/resources` includes `is_featured` field in response
- [ ] Featured status is included in all resource API responses consistently
- [ ] API endpoints are idempotent (featuring twice doesn't cause issues)

### Frontend Requirements
- [ ] Featured status stored in proper state management (Redux/Context)
- [ ] State persists across navigation
- [ ] State synchronized with backend on page load
- [ ] Optimistic updates work correctly (UI updates immediately, syncs with backend)
- [ ] Error handling for failed featured status updates

### Testing Requirements
- [ ] Feature resource, view different resource, return - featured status persists
- [ ] Feature resource, view SAME resource, return - featured status persists
- [ ] Feature multiple resources, view any resource - all featured statuses persist
- [ ] Feature resource, refresh page - featured status persists
- [ ] Feature resource, logout/login - featured status persists (if applicable)
- [ ] Verify in database that featured flag is correctly saved
- [ ] Network tab shows correct API calls with proper responses

---

## 🧪 Test Scenarios

### Happy Path
- [ ] User features a resource, views a different resource, returns - featured status persists
- [ ] User features multiple resources, views one - all featured statuses persist
- [ ] User features resource, refreshes browser - featured status persists
- [ ] Featured tab shows correct count and lists all featured resources

### Edge Cases
- [ ] User features resource, views it, then un-features it - status updates correctly
- [ ] User features 10+ resources, views any - all featured statuses persist
- [ ] User features resource in one browser tab, views resource in another tab - status syncs
- [ ] Multiple users feature same resource (if global featured) - all users see it featured

### Error Handling
- [ ] Backend fails to save featured status - frontend shows error, doesn't show false success
- [ ] Network error during feature action - proper retry or error message
- [ ] User lacks permission to feature resources - clear error message

### Persistence Testing
- [ ] Feature resource → close browser → reopen → featured status persists
- [ ] Feature resource → logout → login → featured status persists (if user-specific)
- [ ] Feature resource → clear cache → reload → featured status persists

---

## 🚨 Workaround

**Current user workaround:**

**No effective workaround available:**
- ❌ Featured status cannot be maintained while actively using Knowledge Base
- ❌ Any resource viewing action resets featured status
- ❌ Cannot curate a stable set of featured resources

**Temporary mitigation:**
1. **Avoid viewing resources** if you need to maintain featured status (not practical)
2. **Re-feature resources** after each viewing session (tedious, defeats purpose)
3. **Use external documentation** to track which resources should be featured (manual workaround)

**Impact:** Featured functionality is essentially unusable in its current state.

---

## 📊 Priority Justification

**Why is this High Priority / Major Severity?**

**Priority: High**
- Core feature (Featured resources) is non-functional
- Affects all users attempting to use featured functionality
- Severely impacts Knowledge Base usability and curation
- Creates negative user experience (unexpected data loss)
- May indicate broader state management or data persistence issue

**Severity: Major**
- Feature is completely unreliable (featured status doesn't persist)
- 100% reproduction rate
- Makes Featured functionality unusable
- Blocks Knowledge Base curation workflows
- May indicate systemic issue affecting other features

**Business Justification:**
1. Featured resources are key for content curation and discoverability
2. Bug defeats entire purpose of Featured functionality
3. Creates user frustration (repeated data loss)
4. May indicate larger technical debt in state management
5. Impacts perception of product quality and reliability

**Recommended action:**
- **High priority for next sprint**
- Requires investigation to determine if issue is frontend, backend, or both
- May uncover related issues with resource state management
- Quick fix possible if isolated to frontend state management

---

## 🔬 Investigation Checklist

**Backend Team (i.tkachev@reluna.com):**

- [ ] **Verify database schema:**
  - Does resources table have `is_featured` column (or equivalent)?
  - What is the data type? (boolean, integer, etc.)
  - Are there any constraints or defaults?

- [ ] **Check API endpoint for setting featured:**
  - Does POST/PUT `/api/resources/{id}/feature` exist?
  - Does it successfully save to database?
  - Check server logs for successful write operations
  - Verify database query actually updates the record

- [ ] **Check API endpoint for getting resources:**
  - Does GET `/api/resources` include `is_featured` in serialized response?
  - Check API response payload in logs or Postman
  - Verify field is not filtered out by serializer

- [ ] **Check resource detail endpoint:**
  - Does GET `/api/resources/{id}` include `is_featured`?
  - Is there any logic that clears featured status on resource view?

- [ ] **Check for triggers or side effects:**
  - Are there database triggers that modify `is_featured`?
  - Is there background job or cleanup task removing featured status?

**Frontend Team (a.manchenkova@reluna.com):**

- [ ] **Check state management:**
  - Is featured status stored in Redux/Context?
  - Or only in local component state?
  - Does state persist across navigation?

- [ ] **Check API integration:**
  - Does frontend call feature API endpoint?
  - Does it handle response correctly?
  - Are there race conditions with resource list API?

- [ ] **Check resource list refresh logic:**
  - After viewing resource, does list component refetch data?
  - Does refetch overwrite local state?
  - Is featured status from API response being used?

- [ ] **Check browser DevTools:**
  - Network tab: Verify POST/PUT feature request succeeds
  - Network tab: Check GET resources response includes `is_featured`
  - Redux DevTools: Check state before/after navigation
  - Console: Any errors related to featured status?

- [ ] **Check routing/navigation:**
  - Does component unmount/remount lose state?
  - Is state properly saved before navigation?
  - Is state restored after navigation?

---

## 💡 Recommended Fix Approach

**Based on most likely root cause:**

### If Frontend State Management Issue:
1. Store featured status in Redux/Context (not local component state)
2. Persist state across navigation
3. Synchronize with backend on mount
4. Implement optimistic updates with backend sync

### If Backend Response Issue:
1. Ensure GET `/api/resources` includes `is_featured` field
2. Update serializer to include featured status
3. Verify field is properly hydrated from database

### If Backend Persistence Issue:
1. Fix featured status save logic
2. Verify database transaction commits successfully
3. Add logging to track featured status changes

### Recommended Implementation:
```javascript
// Frontend pseudocode
const handleFeatureToggle = async (resourceId) => {
  // Optimistic update
  dispatch(toggleFeaturedLocal(resourceId));

  try {
    // Sync with backend
    await api.post(`/api/resources/${resourceId}/feature`);
  } catch (error) {
    // Rollback on error
    dispatch(toggleFeaturedLocal(resourceId));
    showError('Failed to update featured status');
  }
};

// On resource list load
const fetchResources = async () => {
  const resources = await api.get('/api/resources');
  // resources should include is_featured field
  dispatch(setResources(resources));
};
```

---

## 🔗 Related Issues

- **Epic:** EPIC-008 Knowledge Center
- [Check if other resource properties also reset after viewing (tags, categories, etc.)]
- [Check if issue affects other list views in the application]
- [Review overall state management architecture for similar issues]

---

## 📝 Notes

- Date Reported: 2025-11-21
- Platform: Web application (RE:Advisor)
- Video evidence provided by reporter
- This is a **critical usability bug** for Featured functionality
- May reveal broader state management or persistence issues
- Should investigate if other resource metadata has similar issues
- Consider adding automated tests for featured status persistence

**Immediate Actions:**
1. Review video recording to understand exact user flow
2. Check database to confirm featured status is (or isn't) being saved
3. Check API responses to confirm featured field is (or isn't) included
4. Determine if issue is frontend-only or requires backend changes
5. Estimate fix complexity and prioritize in sprint

---

**Reporter:** Product Team (via video recording)
**Date Reported:** 2025-11-21
**Status:** Open - Requires immediate investigation and fix
