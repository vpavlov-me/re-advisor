---
title: "Bug Report: Constitution Template Resource Type Displays Incorrectly as 'Template'"
category: "bug"
audience: "developer|qa|frontend|backend"
created: "2025-11-21"
updated: "2025-11-21"
version: "1.0.0"
status: "active"
tags: ["bug", "frontend", "backend", "ui", "knowledge-base", "resource-types", "display"]
owner: "product-team"
assignee_frontend: "a.manchenkova@reluna.com"
assignee_backend: "i.tkachev@reluna.com"
priority: "Low"
severity: "Minor"
---

# Bug Report: Constitution Template Resource Type Displays Incorrectly as 'Template'

> **Status:** Active
> **Priority:** Low
> **Severity:** Minor
> **Assignee (Frontend):** a.manchenkova@reluna.com
> **Assignee (Backend):** i.tkachev@reluna.com

---

## 📋 Basic Information

**Issue Type:** Bug
**Project:** FG
**Summary:** Resource type "Constitution template" incorrectly displays as generic "Template" instead of full "Constitution template"
**Original Epic:** EPIC-008 Knowledge Center
**Assignee Frontend:** a.manchenkova@reluna.com
**Assignee Backend:** i.tkachev@reluna.com
**Priority:** Low
**Severity:** Minor
**Tags:** `bug`, `frontend`, `backend`, `ui`, `knowledge-base`, `resource-types`, `display`, `labeling`
**Story Points:** TBD
**Sprint:** TBD

---

## 🐛 Bug Description

**What is broken?**

Resources with type "Constitution template" are displaying their type as simply "Template" in the Knowledge Base resource list. This loses important context about the specific template type and creates confusion with other generic templates.

**Affected Area:**
- **Component:** Knowledge Base Resource List
- **Location:** Resource type badge/label on resource cards
- **Navigation Path:** Home → Knowledge Base → Resource cards

**Impact:**
- Loss of specific resource type information
- Users cannot distinguish "Constitution template" from other template types
- Misleading labeling - appears as generic template when it's specific to Constitution
- Affects resource identification and filtering clarity

---

## 👥 Affected Users

**Who is impacted by this bug?**

- **Primary Personas:**
  - Family Members browsing Knowledge Base
  - Advisors searching for specific template types
  - Administrators managing Constitution-related resources

- **User Impact Level:** All users viewing Constitution template resources
- **Frequency:** Every time a Constitution template resource is displayed in the list

---

## ✅ Expected Behavior

**What SHOULD happen:**

1. Resource type badge/label should display the full, accurate type name
2. "Constitution template" resources should show as "Constitution template" (or "Constitution Template" with proper capitalization)
3. Each template subtype should have its own distinct label:
   - Constitution template
   - Document template
   - Other template types (if they exist)
4. The displayed type should match the actual resource type stored in the database

**Expected display:**
```
Resource Card:
┌─────────────────────────────────────┐
│ constitution template               │
│ ekjnvkjnefvqjnkefvqjnkfveknlevfq   │
│                                     │
│ [Constitution template]  ⭐ ↗ →    │
└─────────────────────────────────────┘
```

---

## ❌ Actual Behavior

**What ACTUALLY happens:**

1. Resource type displays as truncated "Template" instead of full "Constitution template"
2. The "Constitution" qualifier is missing from the type label
3. This makes Constitution templates indistinguishable from other template types

**Actual display:**
```
Resource Card:
┌─────────────────────────────────────┐
│ constitution template               │
│ ekjnvkjnefvqjnkefvqjnkfveknlevfq   │
│                                     │
│ [Template]  ⭐ ↗ →                  │
└─────────────────────────────────────┘
     ↑
  Missing "Constitution" prefix
```

---

## 📸 Evidence

**Screenshot:**
![Constitution Template Displays as Template](../attachments/constitution-template-bug.png)

The screenshot shows:
1. Knowledge Base main page with resource list
2. Resource card for "constitution template"
3. Type badge showing only "Template" (highlighted with red arrow)
4. Expected: Should show "Constitution template"

**Key observation:**
- Resource title: "constitution template" (lowercase)
- Type badge: "Template" (generic, missing "Constitution")

---

## 🔄 Steps to Reproduce

**Prerequisites:**
- Access to Knowledge Base
- Existing "Constitution template" resource in the system

**Steps:**
1. Navigate to Knowledge Base main page
2. Locate any resource with type "Constitution template"
3. Observe the type badge/label on the resource card
4. Note that it displays as "Template" instead of "Constitution template"

**Reproducibility:** 100% - all Constitution template resources show incorrect type

**Environment:**
- **Browser:** All browsers (Chrome, Firefox, Safari, Edge)
- **OS:** All operating systems
- **User Role:** All roles
- **Component:** Knowledge Base resource list view

---

## 🎯 Acceptance Criteria for Fix

**Fix is complete when:**

- [ ] "Constitution template" resources display full type name "Constitution template" (not truncated to "Template")
- [ ] Type label accurately reflects the resource type stored in database
- [ ] Proper capitalization applied consistently (e.g., "Constitution Template" or "Constitution template")
- [ ] Other template subtypes (if any) also display correctly with their full names
- [ ] Change applies across all views where resource type is displayed:
  - [ ] Resource list cards
  - [ ] Resource detail page
  - [ ] Search results
  - [ ] Filter selections
- [ ] No other resource types are affected negatively by the fix
- [ ] QA verifies correct display across all browsers and screen sizes

---

## 💡 Root Cause Analysis & Suggested Solutions

**Possible Root Causes:**

1. **String truncation logic** - Frontend code may be truncating "Constitution template" to just "Template"
2. **Incorrect type mapping** - Backend or frontend mapping converts full type to shortened version
3. **Display logic issue** - Code extracts only the last word or uses generic fallback
4. **Database issue** - Type stored as "Template" instead of "Constitution template" (less likely)
5. **Localization/translation issue** - Type label lookup returns generic "Template" instead of full name

**Investigation Steps:**

1. **Backend Investigation:**
   - [ ] Query database for this resource: Check actual `type` or `resource_type` field value
   - [ ] Verify API response: Check what type value API returns for this resource
   - [ ] Check resource type enum/constants: Confirm "Constitution template" exists as valid type
   - [ ] Example query: `SELECT id, title, type FROM resources WHERE title = 'constitution template'`

2. **Frontend Investigation:**
   - [ ] Check resource card component code
   - [ ] Find where type label is rendered
   - [ ] Look for type mapping/transformation logic
   - [ ] Check for string manipulation (split, substring, regex) on type field
   - [ ] Review type label display component/utility function

**Suggested Solutions:**

### Solution A: Fix Type Mapping (Frontend)

If frontend is truncating the type:

```typescript
// INCORRECT CODE (example of what might be causing the bug):
const displayType = resource.type.split('_').pop(); // Gets only last word
// For "constitution_template" -> shows "template"

// CORRECT CODE:
const displayType = resource.type.replace(/_/g, ' '); // Keep full type
// For "constitution_template" -> shows "constitution template"

// OR with proper capitalization:
const displayType = resource.type
  .replace(/_/g, ' ')
  .split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');
// For "constitution_template" -> shows "Constitution Template"
```

### Solution B: Fix Type Enum/Constant (Backend)

If backend is returning wrong type:

```python
# Ensure enum has correct full name
class ResourceType(str, Enum):
    CONSTITUTION_TEMPLATE = "constitution_template"  # Not just "template"
    DOCUMENT_TEMPLATE = "document_template"
    GENERIC_TEMPLATE = "template"
    # etc.

# Ensure display labels are complete
RESOURCE_TYPE_LABELS = {
    ResourceType.CONSTITUTION_TEMPLATE: "Constitution Template",
    ResourceType.DOCUMENT_TEMPLATE: "Document Template",
    ResourceType.GENERIC_TEMPLATE: "Template",
}
```

### Solution C: Fix Type Label Component

Create proper type label display utility:

```typescript
// Create type label formatter
function formatResourceTypeLabel(type: string): string {
  const typeLabels: Record<string, string> = {
    'constitution_template': 'Constitution Template',
    'document_template': 'Document Template',
    'template': 'Template',
    'article': 'Article',
    'guide': 'Guide',
    // ... other types
  };

  return typeLabels[type] || type.replace(/_/g, ' '); // Fallback to formatted version
}

// Use in component
<TypeBadge>{formatResourceTypeLabel(resource.type)}</TypeBadge>
```

---

## 🔍 Technical Investigation Questions

**Need to determine:**

1. **Database Check:**
   - What is the exact value stored in `resources.type` field for this resource?
   - Does database contain "constitution_template" or "template"?

2. **API Response Check:**
   - What does API return in the response?
   ```json
   {
     "id": "xxx",
     "title": "constitution template",
     "type": "???"  // What value appears here?
   }
   ```

3. **Frontend Processing:**
   - Where is the type label rendered? (Component name/file)
   - Is there any transformation logic applied?
   - Are there type mapping constants/configs?

4. **Scope Check:**
   - Are other template subtypes (if they exist) also affected?
   - Do other hyphenated/multi-word types display correctly?

---

## 🧪 Testing Requirements

**QA must verify:**

1. **Correct Type Display:**
   - [ ] "Constitution template" displays as "Constitution Template" (or "Constitution template")
   - [ ] Type badge shows complete, accurate type name
   - [ ] No truncation or abbreviation occurs

2. **Consistency Across Views:**
   - [ ] Resource list view shows correct type
   - [ ] Resource detail page shows correct type
   - [ ] Search results show correct type
   - [ ] Filter dropdown shows correct type option
   - [ ] Breadcrumbs (if applicable) show correct type

3. **Other Template Types:**
   - [ ] Verify other template subtypes display correctly
   - [ ] Generic "Template" (if exists) still shows as "Template"
   - [ ] No regression in other resource type labels

4. **Capitalization:**
   - [ ] Type label capitalization is consistent with design system
   - [ ] Follows established pattern (Title Case, Sentence case, or lowercase)

5. **Cross-Browser Testing:**
   - [ ] Chrome (latest)
   - [ ] Firefox (latest)
   - [ ] Safari (latest)
   - [ ] Edge (latest)

6. **Responsive Testing:**
   - [ ] Desktop (1920px, 1440px, 1280px)
   - [ ] Tablet (768px, 1024px)
   - [ ] Mobile (375px, 414px)
   - [ ] Type label doesn't break layout on small screens

---

## 🔗 Related Issues

**Potentially Related:**
- Resource type display consistency issues
- Type labeling and localization bugs
- Other Knowledge Base UI inconsistencies

**Related User Stories:**
- Knowledge Base resource display functionality
- Resource type management and categorization

---

## 📊 Priority Justification

**Why Low Priority + Minor Severity?**

- **Low Priority:** Cosmetic issue, doesn't prevent functionality
- **Minor Severity:** Resource is still accessible and usable, only label is incorrect
- **Business Impact:** Low - minor confusion, doesn't block workflows
- **Technical Effort:** Low - likely simple label fix
- **Risk:** Very Low - isolated display issue
- **User Experience:** Minor inconvenience, reduces clarity but not critical

**However, consider increasing priority if:**
- Constitution templates are frequently used feature
- Users actively complain about inability to identify template types
- This affects legal compliance or important business processes
- Multiple template types are affected (broader issue)

**Recommendation:** Fix when convenient, can be bundled with other Knowledge Base UI improvements.

---

## 📅 Timeline

**Reported:** 2025-11-21
**Target Fix Date:** TBD (Next available sprint)
**Estimated Effort:** 1-3 hours (investigation + fix + testing)

---

## 📝 Notes

**Investigation Priority:**
1. First, check database: What is actual stored type value?
2. Check API response: What does backend return?
3. Check frontend: Where and how is type label displayed?

**Domain Context:**
- **Constitution templates** are important in Family Governance Platform context
- These are likely templates specifically for family constitution documents
- Proper labeling helps users find correct governance document templates
- Distinction from generic templates is meaningful for business logic

**Future Improvements:**
- Consider adding resource type icons for visual distinction
- Implement consistent type labeling across all resource types
- Add tooltips explaining what each template type is for
- Create resource type legend/glossary for users

**Validation:**
After fix, ensure:
- Database schema documentation reflects correct type values
- API documentation shows correct type labels
- Frontend constants/enums match backend definitions
- User-facing documentation (if any) uses correct type names

---

**Bug ID:** TBD (to be assigned in Jira)
**Reported by:** e.savelova
**Date:** 2025-11-21
