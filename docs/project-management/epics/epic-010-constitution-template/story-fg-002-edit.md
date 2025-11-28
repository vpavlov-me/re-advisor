# User Story: Edit Constitution Template

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As an External Advisor, I want to edit my Constitution Templates  
**Epic Link:** FG-EPIC-XXX (Constitution Templates for External Advisors)  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As an** External Advisor,  
**I want to** edit my Constitution Templates,  
**so that** I can refine and improve my governance frameworks over time.

---

## 🎯 Business Context

**Why is this Story important?**

Advisors need to iterate on templates based on feedback, new insights, or changing best practices. Templates are living documents that evolve as advisors learn what works best for different family types.

**User pain point being solved:**
- Cannot improve templates after initial creation
- Typos or mistakes remain in templates
- Cannot adapt templates as governance best practices evolve

**Business outcome expected:**
- Higher quality templates through iterative refinement
- Reduced need to create duplicate templates for minor variations
- Advisor satisfaction with template tool (can evolve over time)

**Strategic alignment:**
- Professional advisors expect ability to refine their work products
- Quality improvement leads to better family outcomes
- Reduces template proliferation (1 good template > 5 variations)

---

## ✅ Acceptance Criteria

1. **Given** I have templates in my library,  
   **When** I select a template,  
   **Then** I see "Edit Template" button.

2. **Given** I click "Edit Template",  
   **When** template editor opens,  
   **Then** I see all template details pre-filled: name, description, selected sections, content.

3. **Given** template editor is open,  
   **When** I modify any field (name, description, section selection, or content),  
   **Then** changes are tracked and "Save Changes" button becomes enabled.

4. **Given** I add new sections to template,  
   **When** I save changes,  
   **Then** new sections appear as empty editors and existing section content is preserved.

5. **Given** I remove sections from template,  
   **When** I save changes,  
   **Then** removed sections and their content are deleted permanently (with confirmation).

6. **Given** I save changes,  
   **When** save completes,  
   **Then** I see success message, "Last Modified" timestamp updates, and I return to Template Library.

**Additional Criteria:**
- [ ] Template name uniqueness validated on save (excluding current template)
- [ ] Can cancel editing without saving (returns to library)
- [ ] Unsaved changes warning if navigating away
- [ ] Cannot change template name if it would create duplicate
- [ ] Removing sections shows confirmation: "Removing sections will permanently delete their content. Continue?"
- [ ] Section order cannot be changed (fixed order 1-12)
- [ ] Edit history not tracked (simple overwrite, no versioning)

---

## 🔒 Business Rules

**Validation Rules:**
1. **Template name:** 
   - Must be unique within advisor's library (excluding current template)
   - 3-100 characters
   - Same validation as create

2. **Section modification:**
   - Can add sections (new empty editors appear)
   - Can remove sections (content deleted permanently after confirmation)
   - Cannot reorder sections (fixed order 1-12)
   - Must have at least 1 section after edit

3. **Content validation:**
   - Same as create: max 50,000 characters per section
   - Rich text formatting preserved

**Authorization:**
- **Who can edit:** Template creator only (advisor who created it)
- **Who can view:** Template creator only

**Edge Cases:**
- **Template name conflict:** If edited name matches another template → Show error: "Template with this name already exists"
- **Removing all sections:** If advisor tries to deselect all sections → Validation error: "Template must have at least 1 section"
- **Section removal with content:** If removing section with content → Show warning: "Section '[Name]' contains content. Removing it will permanently delete this content. Continue?"
- **Concurrent edit:** Not applicable in this epic (advisor edits their own template, no sharing/assignment yet)

---

## 🎨 Design & UX

**User Flow:**

**Step 1: Open Template for Editing**
1. Advisor navigates to Template Library
2. Clicks template to open details view
3. Clicks "Edit Template" button
4. Template editor loads with existing data

**Step 2: Edit Template (Same UI as Create)**
1. **Step 1 of 3:** Template Details
   - Modify name or description
   - Click "Continue"

2. **Step 2 of 3:** Section Selection
   - See existing sections pre-selected (checkboxes checked)
   - Can add sections (check new boxes)
   - Can remove sections (uncheck boxes) → Warning shown
   - Click "Continue"

3. **Step 3 of 3:** Content Editor
   - See rich text editors for all selected sections
   - Existing content pre-filled
   - New sections show empty editors
   - Modify content as needed
   - Click "Save Changes"

**Step 3: Save Confirmation**
1. Success message: "Template '[Name]' updated successfully!"
2. Redirect to Template Library
3. Updated template shows new "Last Modified" timestamp

**UI Elements:**

**Edit Button Location:**
- Template details view: "Edit Template" button (top right)
- Template Library list: "Edit" icon/button per template

**Section Removal Warning Dialog:**
```
⚠️ Remove Section?

Removing "Family Vision & Mission" will permanently 
delete its content (1,234 characters).

This action cannot be undone.

[Cancel] [Remove Section]
```

**Unsaved Changes Dialog:**
```
⚠️ Unsaved Changes

You have unsaved changes. Do you want to leave 
without saving?

[Stay] [Leave Anyway]
```

**Save Changes Button:**
- Disabled (gray) when no changes made
- Enabled (blue) when changes detected
- Shows loading spinner during save

---

## 🧪 Test Scenarios

**Happy Path Test:**
1. **Given** advisor has template "Basic Governance" with 4 sections
2. **When** advisor clicks "Edit Template"
3. **Then** editor opens with existing content pre-filled
4. **When** advisor:
   - Changes name to "Enhanced Governance Framework"
   - Adds 2 new sections (sections 7, 10)
   - Updates content in section 2
5. **And** clicks "Save Changes"
6. **Then** template updates successfully
7. **And** advisor sees 6 sections in updated template
8. **And** "Last Modified" timestamp updated

**Negative Tests:**

**Test 1: Duplicate Name on Edit**
1. **Given** advisor has templates "Template A" and "Template B"
2. **When** advisor edits "Template A" and changes name to "Template B"
3. **Then** validation error shown: "Template with this name already exists"
4. **And** "Save Changes" button disabled

**Test 2: Remove All Sections**
1. **Given** advisor is editing template with 3 sections
2. **When** advisor unchecks all 3 sections
3. **Then** "Continue" button disabled
4. **And** error message: "Template must have at least 1 section"

**Test 3: Cancel Editing with Unsaved Changes**
1. **Given** advisor has modified template content
2. **When** advisor clicks "Cancel" or browser back
3. **Then** confirmation dialog appears
4. **And** advisor can choose "Stay" or "Leave Anyway"

**Edge Cases:**

**Test 1: Remove Section with Content**
1. **Given** advisor editing template with section "Family Values" containing 2,000 characters
2. **When** advisor unchecks "Family Values" section
3. **And** clicks "Continue"
4. **Then** warning dialog appears: "Section 'Family Values' contains content (2,000 characters). Removing it will permanently delete this content."
5. **When** advisor confirms
6. **Then** section and content removed

**Test 2: Add Section to Existing Template**
1. **Given** template has sections 1, 2, 3 with content
2. **When** advisor adds section 7 (Education & Development)
3. **And** saves template
4. **Then** section 7 appears as empty editor
5. **And** existing content in sections 1, 2, 3 preserved

**Test 3: Edit Template Name Only**
1. **Given** advisor edits only template name
2. **When** advisor saves changes
3. **Then** only name and "Last Modified" updated
4. **And** section content unchanged

**Test 4: No Changes Made**
1. **Given** advisor opens template editor
2. **When** advisor makes no changes
3. **Then** "Save Changes" button disabled
4. **And** no validation errors

**Test 5: Modify Content in Multiple Sections**
1. **Given** template has 6 sections
2. **When** advisor modifies content in 3 sections
3. **And** saves changes
4. **Then** only modified sections updated
5. **And** other 3 sections unchanged

---

## ⚠️ Non-Functional Requirements

**Performance:**
- Template load for editing: < 1 second
- Save changes operation: < 2 seconds
- No performance degradation for templates with all 12 sections

**Security:**
- Authorization: Only template creator can edit
- Same security requirements as Create Template story
- SQL injection protection: Yes (parameterized queries)
- XSS protection: Yes (sanitize HTML in rich text)

**Data Integrity:**
- Template updates are atomic (all changes or none)
- Section removal permanently deletes content (no recovery)
- Concurrent edit protection not required in v1 (single-user editing)

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Edge: Latest 2 versions

**Accessibility:**
- Keyboard navigation for all form fields
- Screen reader compatible for dialogs
- ARIA labels on buttons and warnings
- Focus indicators visible

---

## 📝 Notes

**Assumptions:**
- No concurrent editing scenarios (one advisor editing their own template)
- No version history or undo needed
- Section removal is permanent (no soft delete of section content)
- Same rich text editor component as Create Template story

**Open Questions:**
- **Q: Should we show diff/changelog of what changed?**  
  A: Out of scope for v1, simple overwrite only

- **Q: Should we warn if major changes (e.g., removing 5+ sections)?**  
  A: Out of scope for v1, standard confirmation dialog sufficient

- **Q: Should "Last Modified" show user-friendly relative time ("2 hours ago")?**  
  A: Out of scope for v1, can use standard timestamp format

- **Q: Should advisor be able to reorder sections in template?**  
  A: No, sections remain in fixed order 1-12 (answered in epic discussion)

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-27  
**Created By:** Product Team
