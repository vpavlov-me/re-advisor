---
title: "Bug Report: Constitution Template Section Has Unnecessary Status Field"
category: "bug"
audience: "developer|qa|frontend|backend|product"
created: "2025-11-21"
updated: "2025-11-21"
version: "1.0.0"
status: "active"
tags: ["bug", "frontend", "backend", "ui", "constitution", "template", "ux", "business-logic"]
owner: "product-team"
assignee_frontend: "a.manchenkova@reluna.com"
assignee_backend: "i.tkachev@reluna.com"
priority: "Low"
severity: "Minor"
---

# Bug Report: Constitution Template Section Has Unnecessary Status Field

> **Status:** Active
> **Priority:** Low
> **Severity:** Minor
> **Assignee (Frontend):** a.manchenkova@reluna.com
> **Assignee (Backend):** i.tkachev@reluna.com

---

## 📋 Basic Information

**Issue Type:** Bug
**Project:** FG
**Summary:** "Create New Section" form for Constitution Template includes unnecessary "Status" field that has no clear purpose for templates
**Original Epic:** EPIC-008 Knowledge Center
**Assignee Frontend:** a.manchenkova@reluna.com
**Assignee Backend:** i.tkachev@reluna.com
**Priority:** Low
**Severity:** Minor
**Tags:** `bug`, `frontend`, `backend`, `ui`, `constitution`, `template`, `ux`, `business-logic`, `form`
**Story Points:** TBD
**Sprint:** TBD

---

## 🐛 Bug Description

**What is broken?**

When creating a new section for a Constitution Template, the "Create New Section" form requires users to select a "Status" (required field marked with red asterisk) with options:
- Not Started
- In Progress
- Complete

However, the purpose and functionality of this "Status" field is unclear in the context of a **template**. Templates are static, reusable content structures—they don't have a "status" in the traditional sense. Status fields typically apply to **active documents** or **tasks**, not templates.

**Affected Area:**
- **Component:** Constitution Template - Create New Section Modal
- **Location:** "Status" dropdown in General Info section
- **Navigation Path:** Constitution Template → Create New Section → General Info

**Impact:**
- Confusing user experience - unclear what status means for template section
- Unnecessary required field that users must fill without understanding purpose
- Potential data pollution - storing meaningless status values
- Inconsistent with template concept (templates shouldn't have workflow status)
- May be vestige from copying section form from active constitution documents

---

## 👥 Affected Users

**Who is impacted by this bug?**

- **Primary Personas:**
  - Family Administrators creating/editing Constitution templates
  - Advisors setting up Constitution template structures
  - Template designers building reusable Constitution frameworks

- **User Impact Level:** All users creating Constitution template sections
- **Frequency:** Every time a new template section is created

---

## ✅ Expected Behavior

**What SHOULD happen:**

### Scenario A: Status Field Should Not Exist (Recommended)

**For Template Sections:**
1. "Create New Section" form should NOT include "Status" field at all
2. Template sections are structural components, not workflow items
3. Form should only include:
   - **Section Title** (required) - Name of the section
   - **Section Type** (required) - Type classification (Custom, etc.)
   - **Section Content** (required) - Template content/placeholder text
   - Content management info

**Rationale:**
- Templates are **blueprints**, not active documents
- Status (Not Started/In Progress/Complete) implies workflow tracking
- Workflow status is only relevant when template is **instantiated** as actual constitution
- Template sections should be marked as "published/draft" if anything, not workflow status

### Scenario B: Status Field Has Different Options (Alternative)

If status is required for templates, it should have template-appropriate options:
- **Draft** - Template section being designed
- **Published** - Template section ready for use
- **Archived** - Template section deprecated

**NOT workflow statuses like:**
- ❌ Not Started (implies task)
- ❌ In Progress (implies active work)
- ❌ Complete (implies finished task)

---

## ❌ Actual Behavior

**What ACTUALLY happens:**

1. "Create New Section" form includes required "Status" field
2. Status options are workflow-oriented (Not Started, In Progress, Complete)
3. User must select a status to create section, but unclear what it means
4. No explanation provided about what status affects or how it's used
5. Status seems irrelevant to template functionality

**Current form fields:**
```
General Info
├── Section Title * [required]
├── Status * [required] ← PROBLEM FIELD
│   ├── Not Started (default)
│   ├── In Progress
│   └── Complete
├── Section Type * [required]
│   └── Custom (default)
└── Section Content * [required]
```

---

## 📸 Evidence

**Screenshot:**
![Create New Section - Status Field](../attachments/constitution-template-section-status.png)

The screenshot shows:
1. "Create New Section" modal dialog
2. "General Info" section
3. "Status *" field (required, marked with red asterisk) - highlighted with red box
4. Dropdown showing options: "Not Started", "In Progress", "Complete"
5. This status field appears alongside "Section Type" field

**Key observations:**
- Status field is required (red asterisk)
- Default value: "Not Started"
- Options suggest task/workflow tracking, not template design
- No tooltip or help text explaining purpose

---

## 🔄 Steps to Reproduce

**Prerequisites:**
- Access to Constitution Template editing
- Permissions to create template sections

**Steps:**
1. Navigate to any Constitution Template
2. Click "Create New Section" or "+ Add Section"
3. "Create New Section" modal opens
4. Observe "General Info" section
5. Note that "Status *" field is present and required
6. Click Status dropdown
7. Observe options: "Not Started", "In Progress", "Complete"
8. Try to understand what status means in template context (unclear)

**Reproducibility:** 100% - Status field always appears in Create New Section form

**Environment:**
- **Browser:** All browsers
- **OS:** All operating systems
- **User Role:** Admin, Advisor (anyone who can edit templates)
- **Component:** Constitution Template Section Creation

---

## 🎯 Acceptance Criteria for Fix

**Fix is complete when:**

### Option A: Remove Status Field (Recommended)
- [ ] "Status" field is removed from "Create New Section" form for **templates**
- [ ] Backend no longer requires status for template section creation
- [ ] Existing template sections with status values are handled gracefully (migration or default)
- [ ] Form validation updated to not require status
- [ ] Database allows NULL or has default value for template section status
- [ ] **Active constitution documents** (if they exist separately) still retain status functionality

### Option B: Change Status Options (Alternative)
- [ ] Status field renamed to "Template Status" or "Publication Status"
- [ ] Status options changed to template-appropriate values:
  - [ ] Draft
  - [ ] Published
  - [ ] Archived
- [ ] Tooltip/help text added explaining purpose
- [ ] Backend enum updated to support new status values

### Both Options:
- [ ] No breaking changes to existing template sections
- [ ] Data migration plan (if needed) for existing status values
- [ ] QA verifies templates function correctly without workflow status
- [ ] Documentation updated to reflect correct template section fields
- [ ] User testing confirms clarity and usability improvement

---

## 💡 Root Cause Analysis & Suggested Solutions

**Possible Root Causes:**

1. **Form Reuse from Active Documents** - Most likely cause
   - Template section form may be same component as active constitution section form
   - Active constitutions DO need status (track completion of sections)
   - Form was not adapted properly when reused for templates

2. **Incomplete Template/Instance Separation**
   - System may not properly distinguish between:
     - **Template Constitution** (blueprint with no status)
     - **Active Constitution** (instance with workflow tracking)

3. **Legacy Feature**
   - Status field may be leftover from earlier design where templates had workflow
   - Feature was deprecated but field not removed

4. **Misunderstanding of Template Concept**
   - Developers may have assumed templates need same fields as documents
   - Template-specific design not fully implemented

**Investigation Steps:**

1. **Product/Design Investigation:**
   - [ ] Confirm: Should template sections have status at all?
   - [ ] Clarify: What is difference between template and active constitution?
   - [ ] Determine: What fields are appropriate for template sections?

2. **Technical Investigation:**
   - [ ] Check if same form component used for templates and active documents
   - [ ] Verify database schema: `template_sections` vs `constitution_sections` tables
   - [ ] Review backend API: Does it require status for template section creation?
   - [ ] Check existing data: Do template sections have status values? Are they used?

3. **User Impact Investigation:**
   - [ ] Survey users: Do they understand what status means for templates?
   - [ ] Check analytics: What status values are users selecting?
   - [ ] Review support tickets: Any confusion about template section status?

**Suggested Solutions:**

### Solution A: Remove Status from Template Form (Recommended)

**Frontend:**
```typescript
// Conditionally render status field based on context
function SectionForm({ isTemplate }: { isTemplate: boolean }) {
  return (
    <>
      <SectionTitleInput required />

      {/* Only show status for active documents, NOT templates */}
      {!isTemplate && (
        <StatusSelect required options={['Not Started', 'In Progress', 'Complete']} />
      )}

      <SectionTypeSelect required />
      <SectionContentEditor required />
    </>
  );
}
```

**Backend:**
```python
# Template section model - status is optional or not present
class TemplateSectionCreate(BaseModel):
    title: str
    type: str
    content: str
    # status: Optional[str] = None  # Not required for templates

# Active constitution section model - status is required
class ConstitutionSectionCreate(BaseModel):
    title: str
    type: str
    content: str
    status: str  # Required for tracking progress
```

### Solution B: Separate Template and Document Forms

Create distinct form components:
- `TemplateSection Form` - No status field
- `ConstitutionSectionForm` - Includes status field

This ensures proper separation of concerns and prevents confusion.

### Solution C: Change Status to Publication Status

If templates need some kind of status:
```typescript
// Template-appropriate status options
enum TemplatePublicationStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  ARCHIVED = 'archived'
}

// With helpful tooltip
<StatusSelect
  label="Publication Status"
  options={['Draft', 'Published', 'Archived']}
  tooltip="Draft: Still being designed. Published: Ready for use. Archived: Deprecated."
  defaultValue="draft"
/>
```

---

## 🔍 Business Logic Questions

**Product decisions needed:**

1. **Template vs Active Constitution:**
   - Q: Are templates and active constitutions separate entities in the system?
   - Q: Does a template get "instantiated" into an active constitution for a family?
   - Q: If so, when does status become relevant? (At instantiation time?)

2. **Status Purpose:**
   - Q: What is the intended purpose of status on template sections?
   - Q: Are users expected to track template design progress?
   - Q: Does status affect template availability or behavior?

3. **User Workflow:**
   - Q: How do families use templates? Do they copy to create active constitution?
   - Q: Does template section status carry over to active constitution?
   - Q: Who manages templates? (Admins only? Families?)

4. **Data Model:**
   - Q: Are templates and constitutions in same database table or separate?
   - Q: Is there a `is_template` flag or separate `templates` and `constitutions` tables?

**Recommendation:**
Schedule 30-minute alignment meeting with Product, Design, and Engineering to clarify template/document distinction and determine if status should exist on templates.

---

## 🧪 Testing Requirements

**QA must verify:**

### If Status Field is Removed:

1. **Template Section Creation:**
   - [ ] Can create template section without status field
   - [ ] No validation errors related to missing status
   - [ ] Section saves successfully
   - [ ] No console errors

2. **Existing Template Sections:**
   - [ ] Template sections with existing status values display correctly
   - [ ] Can edit existing template sections
   - [ ] No data loss or corruption

3. **Active Constitutions (if separate):**
   - [ ] Active constitution sections STILL have status field (not removed accidentally)
   - [ ] Status functionality works correctly for active documents
   - [ ] No regression in active document workflow

4. **Form Validation:**
   - [ ] Form validates correctly without status
   - [ ] Required fields (Title, Type, Content) still enforced
   - [ ] Cannot submit incomplete form

### If Status Options Changed:

1. **New Status Options:**
   - [ ] Draft, Published, Archived options appear
   - [ ] Tooltip/help text displays correctly
   - [ ] Each option functions as expected

2. **Data Migration:**
   - [ ] Existing "Not Started" → "Draft" (or appropriate mapping)
   - [ ] Existing "In Progress" → "Draft"
   - [ ] Existing "Complete" → "Published"
   - [ ] No data loss

### General Testing:

1. **Cross-Browser:**
   - [ ] Chrome, Firefox, Safari, Edge

2. **User Roles:**
   - [ ] Admin can create sections
   - [ ] Advisor can create sections (if permitted)
   - [ ] Appropriate permissions enforced

---

## 🔗 Related Issues

**Potentially Related:**
- Constitution template vs active constitution separation
- Template instantiation workflow
- Section status functionality in active documents

**Related User Stories:**
- Constitution template management
- Constitution section creation and editing
- Template to active document conversion (if exists)

---

## 📊 Priority Justification

**Why Low Priority + Minor Severity?**

- **Low Priority:** Confusing but not blocking, users can still create sections
- **Minor Severity:** UX issue, doesn't prevent functionality
- **Business Impact:** Low - minor confusion, doesn't affect core workflows
- **Technical Effort:** Low-Medium - form field removal or conditional rendering
- **Risk:** Low-Medium - requires product alignment on template concept
- **User Experience:** Moderate confusion, users question field purpose but can proceed

**However, consider increasing priority if:**
- Users frequently ask "what does status mean?" in support tickets
- This indicates larger conceptual confusion about templates vs documents
- Product team wants to improve template creation experience
- Planning larger template functionality improvements

**Recommendation:**
1. Quick fix: Hide status field for templates
2. Longer term: Clarify template vs document architecture and ensure proper separation

---

## 📅 Timeline

**Reported:** 2025-11-21
**Target Fix Date:** TBD (Requires product alignment first)
**Estimated Effort:**
- Product alignment: 30-60 minutes
- Implementation: 2-4 hours (conditional rendering + backend adjustment)
- Testing: 2-3 hours

---

## 📝 Notes

**Key Insight:**
This bug reveals potential architectural confusion between:
- **Templates** (static blueprints, no workflow)
- **Active Constitutions** (living documents, with workflow/status tracking)

**Recommendation for Product Team:**
Use this as opportunity to clarify:
1. What is a Constitution Template? (reusable structure)
2. What is an Active Constitution? (family-specific document)
3. How does template → active constitution conversion work?
4. What fields belong to each?

**Template Best Practices:**
- Templates should have **publication status** (draft/published)
- Templates should NOT have **workflow status** (not started/complete)
- Workflow status only makes sense after template is instantiated

**User Story Consideration:**
May need to create new user story: "Clarify Template vs Active Document Architecture" to properly address underlying conceptual issues.

**Quick Win:**
- Frontend: Add conditional `{!isTemplate && <StatusField />}`
- Backend: Make status optional for template endpoints
- Document: Add comment explaining why status is excluded for templates

---

**Bug ID:** TBD (to be assigned in Jira)
**Reported by:** e.savelova
**Date:** 2025-11-21
