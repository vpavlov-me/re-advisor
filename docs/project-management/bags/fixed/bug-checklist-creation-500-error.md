---
title: "Bug: Error 500 When Creating Checklist Resource"
category: "bug"
audience: "developer|qa"
created: "2025-11-21"
updated: "2025-11-21"
version: "1.0.0"
status: "fixed"
tags: ["bug", "backend", "api", "checklist"]
assignee_frontend: "a.manchenkova@reluna.com"
assignee_backend: "i.tkachev@reluna.com"
priority: "High"
severity: "Major"
---

# Bug: Error 500 When Creating Checklist Resource

## 📋 Basic Information

**Issue Type:** Bug
**Project:** FG
**Summary:** System returns 500 Internal Server Error when attempting to save a new Checklist resource
**Original Epic:** EPIC-008 Knowledge Center
**Assignee (Frontend):** a.manchenkova@reluna.com
**Assignee (Backend):** i.tkachev@reluna.com
**Priority:** High
**Severity:** Major
**Tags:** `bug`, `backend`, `api`, `checklist`, `500-error`

---

## 🐛 Bug Description

**What is broken?**

When attempting to create a new resource of type "Checklist" through the "Create New Resource" form and clicking the "Save" button, the system returns a 500 error (Internal Server Error).

The form is filled out correctly:
- **Type:** Checklist
- **Title:** filled
- **Description:** filled
- **Folder:** selected
- **Checklist items:** 3 items added

Error is displayed at the bottom of the form: "Failed to create resource: 500"

---

## 👥 Affected Users

**Who is impacted by this bug?**

- **Primary Personas:** All users attempting to create Checklist type resources
- **User Impact Level:** All users of this functionality
- **Frequency:** Every time a Checklist creation is attempted

---

## ✅ Expected Behavior

**What SHOULD happen:**

1. User fills out the Checklist resource creation form
2. Enters Title, Description
3. Selects Folder
4. Adds checklist items
5. Clicks "Save" button
6. System successfully creates the resource
7. Success message is displayed
8. Form closes or clears
9. New Checklist appears in the resource list

---

## ❌ Actual Behavior

**What ACTUALLY happens:**

1. User fills out the Checklist resource creation form
2. Enters Title, Description
3. Selects Folder
4. Adds checklist items
5. Clicks "Save" button
6. **System returns 500 error**
7. **Error message appears at bottom of form: "Failed to create resource: 500"**
8. Resource is not created
9. Form remains open with entered data

---

## 📸 Evidence

**Screenshots:**
![Error 500 when creating Checklist](screenshot attached)

**Form data at time of error:**
- **Type:** Checklist
- **Folder:** Choose folder (selected)
- **Title:** длумьдлуь
- **Description:** лъаьлмъдлмъуд
- **Checklist items:**
  1. ☐ лъмлу мд
  2. ☐ удлмдул кдък
  3. ☐ уь мъум къ

**Error message:**
```
Failed to create resource: 500
```

---

## 🔍 Steps to Reproduce

**Preconditions:**
- User is authenticated in the system
- User has permissions to create resources
- At least one Folder exists for placing the resource

**Steps:**
1. Open "Create New Resource" form
2. In "Type" field, select "Checklist"
3. In "Folder" field, select any available folder
4. In "Title" field, enter any text (e.g., "длумьдлуь")
5. In "Description" field, enter any text (e.g., "лъаьлмъдлмъуд")
6. In "Checklist" section, add several items:
   - Enter text for first item
   - Click "Add +"
   - Enter text for second item
   - Click "Add +"
   - Enter text for third item
7. Click "Save" button

**Expected Result:** Resource is created successfully
**Actual Result:** Error "Failed to create resource: 500"

**Reproduction Rate:** 100% (consistent failure)

---

## 🔧 Technical Investigation Needed

**Backend Team (i.tkachev@reluna.com):**
- [ ] Check server logs for 500 error stack trace
- [ ] Identify the endpoint returning the error (likely: POST `/api/resources` or similar)
- [ ] Verify input data validation for Checklist creation
- [ ] Check database operations (possible issue with saving related entities)
- [ ] Verify checklist items (array) handling in backend
- [ ] Check access permissions and authorization for resource creation

**Possible Backend Issues:**
- Incorrect handling of checklist items array
- Missing required field in request
- Database transaction issue (creating resource + related checklist items)
- Incorrect data validation
- Foreign key constraint problem (e.g., folder_id)

**Frontend Team (a.manchenkova@reluna.com):**
- [ ] Check the request payload format (data structure)
- [ ] Ensure all required fields are included in the request
- [ ] Verify checklist items data format in request
- [ ] Add more informative error handling (show response details)
- [ ] Verify correct Content-Type header is sent

**Possible Frontend Issues:**
- Incorrect JSON structure for checklist items
- Missing required field in payload
- Incorrect Content-Type
- Encoding issue (if Cyrillic text is used)

---

## 🧪 Test Cases to Verify Fix

### Test Case 1: Create Checklist with valid data
**Given:** User is on resource creation form
**When:** Fills all fields and adds 3 checklist items, clicks Save
**Then:** Resource is created successfully, success message is displayed

### Test Case 2: Create Checklist with minimal data
**Given:** User is on resource creation form
**When:** Fills only required fields (Type, Title, Folder), adds 1 checklist item
**Then:** Resource is created successfully

### Test Case 3: Create Checklist with Cyrillic text
**Given:** User is on resource creation form
**When:** Fills Title, Description, and checklist items with Cyrillic text
**Then:** Resource is created successfully, Cyrillic text displays correctly

### Test Case 4: Create Checklist without selecting Folder
**Given:** User is on resource creation form
**When:** Fills all fields except Folder
**Then:** Either creates in root directory or shows validation error (depending on business logic)

### Test Case 5: Verification after bug fix
**Given:** Bug is fixed
**When:** Repeat exact steps from "Steps to Reproduce"
**Then:** Resource is created successfully without 500 error

---

## 📊 Business Impact

**Severity Justification (Major):**
- Completely blocks creation of Checklist type resources
- Affects all users of this functionality
- Potential data loss when retrying

**Priority Justification (High):**
- Critical functionality for working with checklists
- Negative user experience
- Requires urgent fix

**Users Affected:**
- All users working with Checklist resources
- Potentially blocks workflows related to checklists

---

## 💡 Possible Root Causes

1. **Backend validation error:** Incorrect validation of checklist items data structure
2. **Database constraint violation:** Issue with foreign keys or required fields
3. **Serialization error:** Incorrect JSON processing with checklist items array
4. **Transaction rollback:** Error when saving related entities (resource + checklist items)
5. **Encoding issue:** Problem with Cyrillic text (unlikely but possible)

---

## 🔄 Related Issues

- [ ] Check if similar error occurs when creating other resource types
- [ ] Check if editing existing Checklist resources works correctly

---

## ✅ Definition of Done

- [ ] Backend logs analyzed, root cause identified
- [ ] Backend fix implemented and tested
- [ ] Frontend error handling improved (if needed)
- [ ] All test cases pass successfully
- [ ] Checklist resources are created without errors
- [ ] Regression testing passed (other resource types work correctly)
- [ ] Documentation updated (if needed)

---

**Status:** Open
**Created:** 2025-11-21
**Last Updated:** 2025-11-21
