---
title: "Inactive Service Offered Not Appearing in Services List"
category: "bug"
audience: "developer|qa"
created: "2025-11-21"
updated: "2025-11-21"
version: "1.0.0"
status: "open"
tags: ["bug", "frontend", "backend", "ui"]
owner: "product-team"
assignee_frontend: "a.manchenkova@reluna.com"
assignee_backend: "e.izgorodin@reluna.com"
---

# Bug Report - Inactive Service Not Appearing in Services List

> **Issue:** When adding an inactive (toggle set to "No") service offered, the service does not appear in the services list after creation.

---

## 📋 Basic Information

**Issue Type:** Bug
**Project:** FG
**Summary:** Inactive Service Offered not appearing in services list after creation
**Original Epic:** FG-EPIC-003 (Advisor Registration & Profile Management)
**Assignee Frontend:** a.manchenkova@reluna.com
**Assignee Backend:** e.izgorodin@reluna.com
**Priority:** Medium
**Severity:** Major
**Tags:** `bug`, `frontend`, `backend`, `ui`, `advisor-portal`
**Story Points:** TBD
**Sprint:** To be assigned during sprint planning

---

## 🐛 Bug Description

**What is broken?**

When an advisor creates a new service in the "Services Offered" section and sets the "Active" toggle to "No" (inactive), the service does not appear in the services list after submission. The service appears to be created but is not visible to the user.

- **Functionality affected:** Services Offered management in Advisor Profile
- **What's not working:** Inactive services are not displayed in the services list
- **Impact:** Advisors cannot see or manage their inactive services, leading to confusion about whether the service was actually created

---

## 👥 Affected Users

**Who is impacted by this bug?**

- **Primary Personas:** Advisors creating and managing their service offerings
- **User Impact Level:** All advisors managing services
- **Frequency:** Every time an inactive service is created

---

## ✅ Expected Behavior

**What SHOULD happen:**

1. User clicks "Create New" to add a service in the "Services Offered" tab
2. User fills in service details:
   - Service Name: (e.g., "lrvml")
   - Description: (min 50 characters)
   - Price: $1000
   - Duration: 60 minutes
   - Service Type: Consultation
   - Active toggle: Set to "No" (inactive)
3. User submits the form
4. Service should appear in the services list with an indication that it is inactive (e.g., grayed out, "Inactive" label, or disabled state)
5. User should be able to see and edit the inactive service later

---

## ❌ Actual Behavior

**What ACTUALLY happens:**

1. User fills in all service details correctly
2. User sets Active toggle to "No"
3. User submits the form
4. Service does NOT appear in the services list
5. The service list remains empty or shows only other services, making it appear as if the service was not created at all

---

## 📸 Evidence

**Screenshots/Videos:**

See attached screenshots showing:
1. "Add New Service" form with all fields filled and Active toggle set to "No"
2. "Services Offered" list showing previously created service but missing the newly created inactive service

**Reproduction Steps:**

1. Navigate to "Edit Profile" → "Services Offered" tab
2. Click "Create New" button
3. Fill in the form:
   - Service Name: "Test Service" (min 5 characters)
   - Description: "This is a test service description with more than 50 characters to meet requirements"
   - Price: $1000
   - Duration: 60
   - Service Type: Consultation
   - Active: Set toggle to "No"
4. Submit the form
5. Observe that the service does not appear in the services list

---

## 🔍 Root Cause Analysis (To be investigated)

**Possible causes:**

1. **Frontend filtering issue:**
   - Services list may be filtering out inactive services unintentionally
   - Check if there's a filter applied that only shows active services

2. **Backend API issue:**
   - Service creation endpoint may not be handling inactive services correctly
   - Service listing endpoint may be excluding inactive services from response

3. **State management issue:**
   - Frontend state may not be updating correctly after creating inactive service
   - Cache invalidation issue preventing list refresh

---

## 🔧 Suggested Fix

**Areas to investigate:**

### Frontend (a.manchenkova@reluna.com):
- Check services list filtering logic
- Verify state management after service creation
- Ensure inactive services are rendered with appropriate visual indicators
- Review API response handling

### Backend (e.izgorodin@reluna.com):
- Verify service creation endpoint handles `active: false` correctly
- Check service listing endpoint query/filter logic
- Ensure database records are being created for inactive services
- Review any default filters applied to the services query

---

## ✅ Acceptance Criteria for Fix

- [ ] Inactive services appear in the services list after creation
- [ ] Inactive services have clear visual distinction (e.g., grayed out, "Inactive" badge)
- [ ] Users can toggle services between active/inactive states
- [ ] Both active and inactive services can be edited
- [ ] Services list correctly displays all services regardless of active status

---

## 📌 Related Information

**Related Epic:** [EPIC-003: Advisor Registration & Profile Management](../epics/epic-003-adviser-registration/)
**Module:** Advisor Portal - Services Management
**Environment:** Development/Staging
**Browser/Platform:** Cross-browser issue (confirmed on multiple browsers)

---

## 📅 Status Tracking

- [ ] Bug confirmed and reproduced
- [ ] Root cause identified
- [ ] Fix implemented (Frontend)
- [ ] Fix implemented (Backend)
- [ ] Testing completed
- [ ] Documentation updated
- [ ] Ready for deployment
