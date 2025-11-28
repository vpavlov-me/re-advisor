---
title: "Knowledge Base Folder Created but Not Visible in UI"
category: "bug"
audience: "developer|qa|product-manager"
created: "2025-11-21"
updated: "2025-11-21"
version: "1.0.0"
status: "fixed"
tags: ["bug", "frontend", "ui", "knowledge-base"]
owner: "product-team"
maintainer: "product-team"
reviewer: ""
assignee_frontend: "a.manchenkova@reluna.com"
assignee_backend: "i.tkachev@reluna.com"
---

# Bug Report - Knowledge Base Folder Not Visible After Creation

> **Issue:** Folder creation succeeds on backend but created folder doesn't appear in the UI

---

## 📋 Basic Information

**Issue Type:** Bug
**Project:** FG
**Summary:** Knowledge Base folder created successfully on backend but not displayed in frontend UI
**Original Epic:** EPIC-008 Knowledge Center
**Assignee Frontend:** a.manchenkova@reluna.com
**Assignee Backend:** i.tkachev@reluna.com
**Priority:** High
**Severity:** Major
**Tags:** `bug`, `frontend`, `ui`, `knowledge-base`, `sync-issue`
**Story Points:** [To be estimated]
**Sprint:** [To be assigned during sprint planning]

---

## 🐛 Bug Description

**What is broken?**

When a user creates a new folder in the Knowledge Base through the "Create Folder" action:
- The backend successfully creates the folder (confirmed by success notification)
- The frontend shows a success toast: "Folder created" / "has been created successfully"
- However, the newly created folder does NOT appear in the Knowledge Base UI
- The main content area still shows "No resources yet" message
- User cannot access the folder they just created

**Business Impact:**
- Users cannot organize their knowledge base resources into folders
- Creates confusion as success message appears but no visible result
- Blocks knowledge base content management workflow

---

## 👥 Affected Users

**Who is impacted by this bug?**

- **Primary Personas:** Family Members, Advisors, Administrators - anyone managing knowledge base resources
- **User Impact Level:** All users trying to create folder structure in Knowledge Base
- **Frequency:** Every time a folder is created (100% reproduction rate based on screenshot)

---

## ✅ Expected Behavior

**What SHOULD happen:**

1. User clicks "+ Create Folder" button in Quick Actions section
2. User enters folder name in the creation dialog
3. User confirms folder creation
4. Backend creates the folder successfully
5. **Frontend immediately displays the new folder in the Knowledge Base list**
6. User can see the folder and interact with it (open, add resources, etc.)
7. Success notification appears confirming the action

---

## ❌ Actual Behavior

**What ACTUALLY happens:**

1. User clicks "+ Create Folder" button in Quick Actions section
2. User enters folder name in the creation dialog
3. User confirms folder creation
4. Backend creates the folder successfully (confirmed by success notification)
5. **Success toast appears: "Folder created" / "has been created successfully"**
6. **BUT: Frontend does not refresh or update to show the new folder**
7. Main content area continues to show "No resources yet" empty state
8. The "Featured" tab shows "0" items (doesn't update)
9. User must manually refresh the page to potentially see the folder

---

## 📸 Evidence

**Screenshots/Videos:**
- [Screenshot provided showing]:
  - "Folder created" success notification in bottom right
  - "No resources yet" empty state still visible in main area
  - "Create Folder" button highlighted with red arrows
  - "All 0" and "Featured 0" tabs showing no content

**UI Elements Visible:**
- Top navigation: Dashboard, Families, Knowledge Center (active), Consultations, Mentorship, Messages, Service Settings, Payment Settings
- Breadcrumb: Home > Knowledge Base
- Two tabs: "All 0" and "Featured 0"
- Empty state message: "Start building your knowledge base by creating your first resource"
- Quick Actions section with:
  - "+ Create Resource" button (with arrow)
  - "+ Create Folder" button (with arrow - circled)
  - "📄 Sharings Report" link

**Console Logs:**
```
[To be collected from browser console during reproduction]
```

**Network Tab:**
```
[To be collected - check for:
- POST request to create folder (should be 200/201 success)
- GET request to fetch folders list (may be missing or not triggered)
- Response data from folder creation]
```

---

## 🔄 Steps to Reproduce

**Environment:**
- Application: RE:Advisor (Family Governance Platform)
- Module: Knowledge Center / Knowledge Base
- User Role: [Any role with Knowledge Base access]

**Steps:**
1. Navigate to Knowledge Center → Knowledge Base
2. Verify you see empty state: "No resources yet"
3. Click "+ Create Folder" button in Quick Actions section (right sidebar)
4. Enter folder name (e.g., "Test Folder")
5. Click Create/Confirm button
6. Observe success notification appears
7. **BUG:** Check main content area - folder is NOT visible
8. Tab counts remain at "All 0" and "Featured 0"

**Reproduction Rate:** 100% (appears to happen every time based on screenshot)

---

## 🔍 Root Cause Analysis (Initial Hypothesis)

**Potential causes:**

1. **Frontend state not updated after folder creation**
   - Success callback from API doesn't trigger state update
   - Folder list component not re-rendering after creation

2. **Missing API call to refresh folder list**
   - Creation succeeds but no subsequent GET request to fetch updated list
   - Frontend relies on manual refresh instead of automatic update

3. **WebSocket/real-time sync issue**
   - If using real-time updates, the event might not be emitted/received
   - Frontend not subscribed to folder creation events

4. **Cache invalidation issue**
   - Folder list cached and not invalidated after creation
   - Stale data displayed instead of fresh data

**Investigation needed:**
- Check Network tab for API calls after folder creation
- Verify frontend state management (Redux/Context) updates
- Check if folder creation triggers a refetch of folders list
- Verify success callback implementation

---

## 🛠 Technical Context

**Related Components:**
- **Frontend:** Knowledge Base folder list component (React)
- **Frontend:** Create Folder modal/form component
- **Frontend:** State management for Knowledge Base data
- **Backend API:** POST endpoint for folder creation
- **Backend API:** GET endpoint for retrieving folders list

**Repository References:**
- **Technical Implementation:** See `../FG/frontend/` (Knowledge Center module)
- **API Endpoints:**
  - POST `/api/knowledge-base/folders` (assumed - creates folder)
  - GET `/api/knowledge-base/folders` (assumed - retrieves folders)

---

## ✅ Acceptance Criteria for Fix

**Definition of Done:**

- [ ] When user creates a folder via "+ Create Folder" button, the folder immediately appears in the Knowledge Base UI
- [ ] Tab count updates from "All 0" to "All 1" (or appropriate count)
- [ ] Empty state ("No resources yet") is replaced with folder list view
- [ ] New folder is visible and interactive (can be clicked, opened, edited)
- [ ] Success notification still appears confirming creation
- [ ] **No page refresh required** - update happens automatically
- [ ] Works consistently across all user roles with KB access
- [ ] Browser console shows no errors during folder creation
- [ ] Network tab shows proper API call sequence (POST create → GET refresh)

**Additional Requirements:**
- [ ] If multiple folders created in sequence, all appear correctly
- [ ] Folder appears in correct sort order (alphabetical, date created, etc.)
- [ ] Loading state shown during folder creation if needed
- [ ] Error handling works if creation fails (proper error message, no success toast)

---

## 🧪 Test Scenarios

### Happy Path
- [ ] User creates first folder in empty Knowledge Base - folder appears immediately
- [ ] User creates second folder when one exists - both folders visible
- [ ] User creates folder, then immediately creates a resource in it - both operations work

### Edge Cases
- [ ] User creates folder with very long name - folder appears with name truncated/wrapped appropriately
- [ ] User creates folder with special characters - folder appears with correct name
- [ ] Multiple users create folders simultaneously - all folders appear for all users
- [ ] User has slow network connection - loading state shown, folder appears when ready

### Error Handling
- [ ] Backend returns error during folder creation - error message shown, no success toast
- [ ] Network timeout during creation - appropriate error handling
- [ ] User lacks permissions to create folder - proper error message before creation attempt

---

## 🚨 Workaround

**How to verify folders were actually created:**

**Option 1: Via "Create Resource" flow**
1. Click "+ Create Resource" button
2. In the resource creation form, click "Choose Folder" dropdown
3. All created folders will appear as selectable options in the dropdown
4. This confirms folders exist on backend but are hidden from main view

**Option 2: Create resource inside the folder**
1. Click "+ Create Resource" button
2. Choose one of the previously created folders from "Choose Folder" dropdown
3. Complete resource creation and save
4. **The folder will NOW appear in the main Knowledge Base view** together with the resource inside it
5. This means folders only become visible when they contain at least one resource

**Key finding:**
- Empty folders are created successfully on backend
- Empty folders are accessible in "Choose Folder" dropdown
- Empty folders are NOT displayed in main Knowledge Base list view
- Folders only appear in main view after adding a resource to them

**Note:** This confirms the folder IS being created on backend and is accessible in certain UI contexts, but the main Knowledge Base list view has conditional visibility logic that hides empty folders.

---

## 📊 Priority Justification

**Why is this High Priority / Major Severity?**

1. **Core functionality broken:** Knowledge Base organization relies on folders
2. **User experience severely impacted:** Success message followed by no visible result creates confusion
3. **100% reproduction rate:** Affects all folder creation attempts
4. **Blocks feature adoption:** Users cannot organize knowledge base resources
5. **Simple fix expected:** Likely a missing state update/refetch call

**Recommended action:** Fix in next sprint to unblock Knowledge Base usage

---

## 📝 Notes

- Screenshot timestamp: 2025-11-21
- Platform: Web application (RE:Advisor)
- Beta version indicated in footer: "v0.1.3 Beta"
- This bug suggests backend/frontend synchronization issue rather than backend failure
- Similar issue may exist with "Create Resource" functionality - should be tested

---

## 🔗 Related Issues

- [Link to Knowledge Base Epic when available]
- [Link to any related folder management user stories]
- [Check if similar sync issues exist with Resource creation]

---

**Reporter:** Product Team (via screenshot analysis)
**Date Reported:** 2025-11-21
**Status:** Open - Awaiting assignment and sprint planning
