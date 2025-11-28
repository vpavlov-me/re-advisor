---
title: "Bug Report: Learning Path Resource Type Displays with Underscore Instead of Space"
category: "bug"
audience: "developer|qa|frontend|backend"
created: "2025-11-21"
updated: "2025-11-21"
version: "1.0.0"
status: "active"
tags: ["bug", "frontend", "backend", "ui", "knowledge-base", "resource-types", "display", "formatting"]
owner: "product-team"
assignee_frontend: "a.manchenkova@reluna.com"
assignee_backend: "i.tkachev@reluna.com"
priority: "Low"
severity: "Minor"
---

# Bug Report: Learning Path Resource Type Displays with Underscore Instead of Space

> **Status:** Active
> **Priority:** Low
> **Severity:** Minor
> **Assignee (Frontend):** a.manchenkova@reluna.com
> **Assignee (Backend):** i.tkachev@reluna.com

---

## 📋 Basic Information

**Issue Type:** Bug
**Project:** FG
**Summary:** Resource type "Learning Path" displays as "Learning_path" with underscore instead of space in resource type badge
**Original Epic:** EPIC-008 Knowledge Center
**Assignee Frontend:** a.manchenkova@reluna.com
**Assignee Backend:** i.tkachev@reluna.com
**Priority:** Low
**Severity:** Minor
**Tags:** `bug`, `frontend`, `backend`, `ui`, `knowledge-base`, `resource-types`, `display`, `formatting`, `text-formatting`
**Story Points:** TBD
**Sprint:** TBD

---

## 🐛 Bug Description

**What is broken?**

Resources with type "Learning Path" are displaying their type badge as "Learning_path" (with underscore) instead of the proper, user-friendly format "Learning Path" (with space). This exposes the internal database/backend naming convention to end users, which is poor UX.

**Affected Area:**
- **Component:** Knowledge Base Resource List
- **Location:** Resource type badge/label on resource cards
- **Navigation Path:** Home → Knowledge Base → Resource cards

**Impact:**
- Unprofessional appearance - technical naming exposed to users
- Inconsistent formatting with other multi-word resource types
- Breaks user experience - underscores are internal convention, not user-facing format
- Applies to all Learning Path resources in the system

---

## 👥 Affected Users

**Who is impacted by this bug?**

- **Primary Personas:**
  - Family Members browsing Knowledge Base
  - Advisors viewing learning materials
  - Administrators managing Learning Path resources

- **User Impact Level:** All users viewing Learning Path resources
- **Frequency:** Every time a Learning Path resource is displayed

---

## ✅ Expected Behavior

**What SHOULD happen:**

1. Resource type badge should display human-readable, properly formatted text
2. "Learning Path" should show with space: "Learning Path" (or "Learning path")
3. Multi-word resource types should have spaces between words, not underscores
4. Internal database naming (snake_case) should NOT be visible to users
5. Frontend should transform technical format to user-friendly format

**Expected display:**
```
Resource Card:
┌─────────────────────────────────────┐
│ дладлвабъа                          │
│ кавдлцуджйбудъабъу авъу абъ бъук... │
│                                     │
│ [Learning Path]  ⭐ ↗ →             │
└─────────────────────────────────────┘
     ↑
  Space, not underscore
```

**Proper capitalization options:**
- "Learning Path" (Title Case) - Recommended
- "Learning path" (Sentence case) - Acceptable
- "LEARNING PATH" (All caps) - Less common

**NOT:**
- ❌ "Learning_path" (snake_case - technical format)
- ❌ "learning_path" (lowercase snake_case)
- ❌ "LEARNING_PATH" (uppercase snake_case)

---

## ❌ Actual Behavior

**What ACTUALLY happens:**

1. Resource type displays as "Learning_path" with underscore
2. Technical/database naming convention exposed to users
3. Inconsistent with user-facing design standards
4. Looks unprofessional and unpolished

**Actual display:**
```
Resource Card:
┌─────────────────────────────────────┐
│ дладлвабъа                          │
│ кавдлцуджйбудъабъу авъу абъ бъук... │
│                                     │
│ [Learning_path]  ⭐ ↗ →             │
└─────────────────────────────────────┘
     ↑
  Underscore visible - should be space
```

---

## 📸 Evidence

**Screenshot:**
![Learning Path Type with Underscore](../attachments/learning-path-underscore-bug.png)

The screenshot shows:
1. Knowledge Base main page with resource list
2. Resource card with title "дладлвабъа"
3. Type badge displaying "Learning_path" with underscore
4. Other UI elements (All: 7, Featured: 0, Archive: 1)

**Key observation:**
- Type badge shows: "Learning_path" (with underscore)
- Expected: "Learning Path" (with space)

---

## 🔄 Steps to Reproduce

**Prerequisites:**
- Access to Knowledge Base
- Existing "Learning Path" resource in the system

**Steps:**
1. Navigate to Knowledge Base main page
2. Locate any resource with type "Learning Path"
3. Observe the type badge on the resource card
4. Note that it displays as "Learning_path" with underscore

**Reproducibility:** 100% - all Learning Path resources show underscore

**Environment:**
- **Browser:** All browsers (Chrome, Firefox, Safari, Edge)
- **OS:** All operating systems
- **User Role:** All roles
- **Component:** Knowledge Base resource list view

---

## 🎯 Acceptance Criteria for Fix

**Fix is complete when:**

- [ ] "Learning Path" resources display type as "Learning Path" with space (not underscore)
- [ ] Proper capitalization applied: "Learning Path" (Title Case recommended)
- [ ] Change applies consistently across ALL views:
  - [ ] Resource list cards
  - [ ] Resource detail page
  - [ ] Search results
  - [ ] Filter dropdown options
  - [ ] Breadcrumbs (if applicable)
- [ ] Other multi-word resource types also checked and fixed if affected:
  - [ ] "External Links" (not "External_Links")
  - [ ] "Constitution template" / "Constitution Template" (not "Constitution_template")
  - [ ] Any other multi-word types
- [ ] Internal database values remain unchanged (still use snake_case)
- [ ] Only display/presentation layer is changed
- [ ] No other resource types are negatively affected
- [ ] QA verifies correct display across all browsers and screen sizes

---

## 💡 Root Cause Analysis & Suggested Solutions

**Root Cause:**

The frontend is directly displaying the raw database/backend value without formatting. Backend likely stores resource types in snake_case format (`learning_path`), which is standard practice for databases and APIs. However, the frontend is not transforming this technical format into user-friendly format.

**Common pattern:**
- **Backend/Database:** `learning_path` (snake_case for technical consistency)
- **Frontend Display:** "Learning Path" (human-readable with proper formatting)

**Investigation Steps:**

1. **Check API Response:**
   ```json
   // What does the API return?
   {
     "id": "xxx",
     "title": "дладлвабъа",
     "type": "learning_path"  // or "Learning_path"?
   }
   ```

2. **Check Frontend Rendering:**
   - Where is the type badge rendered?
   - Is there a type formatting/mapping function?
   - Is raw value being displayed directly?

3. **Check Other Multi-Word Types:**
   - Do "External Links", "Constitution template" have same issue?
   - Is this isolated to "Learning Path" or system-wide?

**Suggested Solutions:**

### Solution A: Create Type Label Formatter Utility (Recommended)

Create a centralized utility function to format all resource type labels:

```typescript
// utils/formatResourceType.ts
export function formatResourceTypeLabel(type: string): string {
  // Mapping for all resource types
  const typeLabels: Record<string, string> = {
    'learning_path': 'Learning Path',
    'external_links': 'External Links',
    'constitution_template': 'Constitution Template',
    'article': 'Article',
    'document': 'Document',
    'video': 'Video',
    'podcast': 'Podcast',
    'template': 'Template',
    'guide': 'Guide',
    'checklist': 'Checklist',
  };

  // Return mapped label or fallback to formatted version
  return typeLabels[type] || formatSnakeCase(type);
}

// Fallback formatter for dynamic/unknown types
function formatSnakeCase(str: string): string {
  return str
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Usage in component
<TypeBadge>{formatResourceTypeLabel(resource.type)}</TypeBadge>
```

### Solution B: Backend Provides Display Labels

Backend API returns both technical value and display label:

```json
{
  "id": "xxx",
  "title": "дладлвабъа",
  "type": "learning_path",
  "type_display": "Learning Path"  // Backend provides formatted label
}
```

Frontend uses `type_display` for UI, `type` for filtering/logic.

### Solution C: Simple String Replacement (Quick Fix)

Quick fix in the component:

```typescript
// In resource card component
const displayType = resource.type.replace(/_/g, ' ');
// "learning_path" → "learning path"

// With capitalization
const displayType = resource.type
  .replace(/_/g, ' ')
  .split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');
// "learning_path" → "Learning Path"
```

**Recommendation:** Use Solution A (centralized formatter) for consistency and maintainability.

---

## 🔍 Related Issues

**Check if Similar Issues Exist:**

This bug may be related to or part of a broader pattern:

1. **Other Multi-Word Types:**
   - Does "External Links" display as "External_Links"?
   - Does "Constitution template" display as "Constitution_template"?

2. **System-Wide Formatting:**
   - Are other snake_case values exposed in UI elsewhere?
   - Do filter dropdowns show underscores?
   - Do breadcrumbs show underscores?

3. **Related Bug:**
   - See: [bug-constitution-template-displays-as-template.md] - Similar type display issue

**Recommendation:**
- Fix this bug as part of broader "Resource Type Display Standardization" task
- Audit ALL resource type displays in the system
- Implement centralized formatting solution for all types

---

## 🧪 Testing Requirements

**QA must verify:**

1. **Learning Path Type Display:**
   - [ ] "Learning Path" displays with space (not underscore)
   - [ ] Proper capitalization: "Learning Path" (Title Case)
   - [ ] Displays correctly in all locations:
     - [ ] Resource list cards
     - [ ] Resource detail page
     - [ ] Search results
     - [ ] Filter dropdown
     - [ ] Anywhere else type is shown

2. **Other Multi-Word Types:**
   - [ ] "External Links" displays correctly (with space)
   - [ ] "Constitution Template" displays correctly
   - [ ] Any other multi-word types display correctly

3. **Single-Word Types Not Affected:**
   - [ ] "Article", "Document", "Video", etc. still display correctly
   - [ ] No regression in existing type displays

4. **Consistency Check:**
   - [ ] All resource types use same capitalization pattern (Title Case or Sentence case)
   - [ ] No underscores visible anywhere in user-facing UI

5. **Cross-Browser Testing:**
   - [ ] Chrome (latest)
   - [ ] Firefox (latest)
   - [ ] Safari (latest)
   - [ ] Edge (latest)

6. **Responsive Testing:**
   - [ ] Desktop (1920px, 1440px, 1280px)
   - [ ] Tablet (768px, 1024px)
   - [ ] Mobile (375px, 414px)

7. **Backend Unchanged:**
   - [ ] Database still stores `learning_path` (snake_case)
   - [ ] API still returns `learning_path` (snake_case)
   - [ ] Only frontend display is changed
   - [ ] Filtering/querying by type still works

---

## 📊 Priority Justification

**Why Low Priority + Minor Severity?**

- **Low Priority:** Cosmetic issue, doesn't prevent functionality
- **Minor Severity:** Resource is fully functional, only display format is wrong
- **Business Impact:** Low - minor unprofessional appearance
- **Technical Effort:** Very Low - simple string formatting fix
- **Risk:** Very Low - isolated display change, no business logic affected
- **User Experience:** Minor annoyance, slightly unprofessional but not blocking

**Quick Win Opportunity:**
- Very easy fix (1-2 hours including testing)
- High visibility improvement
- Can be bundled with other type display fixes
- Good candidate for "polish sprint" or bug bash

**Recommendation:** Fix soon as a quick win to improve overall polish and professionalism of UI.

---

## 📅 Timeline

**Reported:** 2025-11-21
**Target Fix Date:** TBD (Next available sprint - good quick win candidate)
**Estimated Effort:** 1-2 hours (fix + comprehensive testing of all types)

---

## 📝 Notes

**Design System Consideration:**
- Establish standard for multi-word type formatting across platform
- Document in design system / style guide
- Options to decide:
  - **Capitalization:** Title Case (Learning Path) vs Sentence case (Learning path)
  - **Separator:** Always space (never underscore/hyphen in display)

**Code Quality:**
- Create centralized `formatResourceType()` utility
- Use consistently throughout codebase
- Add unit tests for formatting function
- Prevents similar issues in future

**Database vs Display:**
- **Database/API:** Keep snake_case (`learning_path`) - this is correct for backend
- **Display/UI:** Always format to human-readable ("Learning Path")
- **Never mix:** Don't show database format in UI

**Future Prevention:**
- Add linter rule to catch raw snake_case display in UI
- Code review checklist: "Are all user-facing labels properly formatted?"
- Add to component library: `<ResourceTypeBadge>` with built-in formatting

**Related Best Practices:**
- Apply same principle to other technical fields:
  - Status values (e.g., "in_progress" → "In Progress")
  - Role names (e.g., "family_member" → "Family Member")
  - Any enum/constant values shown to users

---

**Bug ID:** TBD (to be assigned in Jira)
**Reported by:** e.savelova
**Date:** 2025-11-21
