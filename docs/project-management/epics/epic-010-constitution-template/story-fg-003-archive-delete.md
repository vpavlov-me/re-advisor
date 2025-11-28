# User Story: Archive or Delete Constitution Template

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As an External Advisor, I want to archive or delete unused templates  
**Epic Link:** FG-EPIC-XXX (Constitution Templates for External Advisors)  
**Priority:** Medium  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As an** External Advisor,  
**I want to** archive or delete Constitution Templates I no longer use,  
**so that** I can maintain a clean, organized library of current frameworks.

---

## 🎯 Business Context

**Why is this Story important?**

Over time, advisors accumulate templates—outdated frameworks, experimental versions, or templates for specific scenarios. A cluttered library reduces productivity and makes it hard to find relevant templates.

**User pain point being solved:**
- Cluttered template libraries with outdated or unused frameworks
- Difficulty finding relevant templates among many versions
- Cannot remove templates without permanently losing them

**Business outcome expected:**
- Better advisor user experience with organized libraries
- Reduced confusion when selecting templates
- Ability to safely remove old templates while retaining option to restore

**Strategic alignment:**
- Professional tools require good information management
- Advisor retention through quality UX
- Enables advisors to evolve their practice without technical debt

---

## ✅ Acceptance Criteria

1. **Given** I have templates in my library,  
   **When** I select a template,  
   **Then** I see "Archive" and "Delete" action buttons.

2. **Given** I click "Archive" on a template,  
   **When** confirmation dialog appears,  
   **Then** I can confirm or cancel archiving.

3. **Given** I confirm archiving,  
   **When** archive completes,  
   **Then** template moves to "Archived" section and is hidden from active library.

4. **Given** I have archived templates,  
   **When** I navigate to "Archived Templates" view,  
   **Then** I see list of archived templates with "Restore" and "Delete" buttons.

5. **Given** I click "Restore" on archived template,  
   **When** restore completes,  
   **Then** template returns to active library.

6. **Given** I click "Delete" on template (active or archived),  
   **When** confirmation dialog appears with strong warning,  
   **Then** I can confirm or cancel deletion.

7. **Given** I confirm deletion,  
   **When** delete completes,  
   **Then** template is permanently removed from database.

**Additional Criteria:**
- [ ] Archive is soft delete (data retained in database)
- [ ] Delete is hard delete (permanent removal)
- [ ] Archived templates do not appear in default library view
- [ ] Archived templates count shown in UI ("5 archived templates")
- [ ] Confirmation dialogs clearly explain action consequences
- [ ] Success/confirmation messages after each action
- [ ] Cannot delete or archive template if advisor is currently editing it

---

## 🔒 Business Rules

**Archive Rules:**
1. **Archive operation:**
   - Soft delete (sets `archived_at` timestamp)
   - Template data retained in database
   - Removed from active library view
   - Can be restored at any time

2. **Who can archive:**
   - Template creator only
   - Can archive any template (no restrictions)

**Restore Rules:**
1. **Restore operation:**
   - Clears `archived_at` timestamp
   - Returns template to active library
   - All content and metadata preserved

2. **Who can restore:**
   - Template creator only

**Delete Rules:**
1. **Delete operation:**
   - Hard delete (permanent removal from database)
   - Cannot be recovered after deletion
   - Available for both active and archived templates

2. **Who can delete:**
   - Template creator only

3. **Delete confirmation:**
   - Strong warning required
   - Must type template name to confirm (for extra safety)

**Authorization:**
- **Who can archive/restore/delete:** Template creator only

**Edge Cases:**
- **Template currently open for editing:** Cannot archive/delete → Show message: "Close template editor before archiving/deleting"
- **Last remaining template:** Can be archived or deleted (no minimum requirement)
- **Archived template with same name as active:** Allowed (name uniqueness applies only to active templates)

---

## 🎨 Design & UX

**User Flow:**

**Flow 1: Archive Template**
1. Advisor selects template from library
2. Clicks "Archive" button (or 3-dot menu → Archive)
3. Confirmation dialog appears:
```
   Archive "[Template Name]"?
   
   This template will be hidden from your active library 
   but can be restored later.
   
   [Cancel] [Archive Template]
```
4. Advisor confirms
5. Success message: "Template archived successfully"
6. Template removed from active library view

**Flow 2: View Archived Templates**
1. Advisor clicks "Archived Templates" tab/filter
2. List of archived templates appears
3. Each shows: Name, Archived Date, "Restore" and "Delete" buttons

**Flow 3: Restore Archived Template**
1. Advisor navigates to "Archived Templates"
2. Clicks "Restore" on a template
3. Confirmation dialog (optional, lightweight):
```
   Restore "[Template Name]"?
   
   This template will return to your active library.
   
   [Cancel] [Restore]
```
4. Template restored to active library
5. Success message: "Template restored successfully"

**Flow 4: Delete Template (Permanent)**
1. Advisor selects template (active or archived)
2. Clicks "Delete" button
3. Strong warning dialog:
```
   ⚠️ Permanently Delete "[Template Name]"?
   
   This action CANNOT be undone. All content will be 
   permanently deleted.
   
   Type the template name below to confirm:
   [___________________________]
   
   [Cancel] [Delete Permanently]
```
4. Advisor types template name exactly
5. "Delete Permanently" button enables
6. Advisor confirms
7. Success message: "Template deleted permanently"

**UI Elements:**

**Template Actions (Active Template):**
- Edit button (primary action)
- Archive button (secondary)
- Delete button (danger, tertiary)

**Template Actions (Archived Template):**
- Restore button (primary action)
- Delete button (danger, secondary)

**Library View Toggle:**
```
[Active Templates (12)] [Archived Templates (5)]
```

**Confirmation Dialog Examples:**

**Archive Confirmation (Low Risk):**
```
Archive "Large Family Governance"?

This template will be hidden but can be restored later.

[Cancel] [Archive]
```

**Delete Confirmation (High Risk):**
```
⚠️ Permanently Delete "Old Template"?

This action CANNOT be undone. All content will be 
permanently deleted from the database.

To confirm, type the template name: Old Template

[_________________________________]

[Cancel] [Delete Permanently]
                  ^^^ (disabled until name matches)
```

---

## 🧪 Test Scenarios

**Happy Path Test:**

**Test 1: Archive Template**
1. **Given** advisor has template "Basic Governance" in active library
2. **When** advisor clicks "Archive"
3. **And** confirms in dialog
4. **Then** template moves to archived section
5. **And** no longer appears in active library
6. **And** success message shown

**Test 2: Restore Template**
1. **Given** advisor has archived template "Basic Governance"
2. **When** advisor navigates to "Archived Templates"
3. **And** clicks "Restore" on template
4. **Then** template returns to active library
5. **And** success message shown

**Test 3: Delete Template Permanently**
1. **Given** advisor has template "Old Template"
2. **When** advisor clicks "Delete"
3. **And** types template name "Old Template" in confirmation
4. **And** clicks "Delete Permanently"
5. **Then** template permanently removed
6. **And** confirmation message shown

**Negative Tests:**

**Test 1: Delete Without Typing Name**
1. **Given** delete confirmation dialog open
2. **When** advisor doesn't type template name
3. **Then** "Delete Permanently" button remains disabled

**Test 2: Delete with Incorrect Name**
1. **Given** delete confirmation dialog for "Template A"
2. **When** advisor types "Template B"
3. **Then** "Delete Permanently" button remains disabled
4. **And** validation error: "Name doesn't match"

**Test 3: Archive While Template is Open**
1. **Given** advisor has template open in editor
2. **When** advisor tries to archive from library
3. **Then** error message: "Close template editor before archiving"

**Edge Cases:**

**Test 1: Archive Last Template**
1. **Given** advisor has only 1 template
2. **When** advisor archives it
3. **Then** archive succeeds
4. **And** active library shows "No templates" state

**Test 2: Restore Template with Duplicate Name**
1. **Given** advisor has active template "Governance Framework"
2. **And** archived template also named "Governance Framework"
3. **When** advisor restores archived template
4. **Then** error: "Template with this name already exists in active library. Rename before restoring."

**Test 3: Delete Archived Template**
1. **Given** archived template exists
2. **When** advisor deletes from archived view
3. **Then** permanent deletion works same as active template

**Test 4: Multiple Archives/Restores**
1. **Given** advisor archives template "Template A"
2. **When** advisor restores it
3. **And** archives it again
4. **Then** operations succeed (no restrictions on repeat actions)

---

## ⚠️ Non-Functional Requirements

**Performance:**
- Archive operation: < 500ms (just timestamp update)
- Restore operation: < 500ms (clear timestamp)
- Delete operation: < 1 second (hard delete)
- Archived templates list load: < 1 second

**Security:**
- Authorization: Only template creator can archive/restore/delete
- Hard delete: Ensure no orphaned data or references
- Soft delete protection: Archived data retained securely

**Data Retention:**
- Archived templates: Retained indefinitely until deleted
- Deleted templates: Permanently removed, cannot be recovered
- No backup or recovery mechanism for deleted templates

**Audit Trail:**
- Log archive actions (advisor_id, template_id, timestamp)
- Log delete actions (advisor_id, template_id, timestamp)
- No restoration of deleted templates (permanent loss)

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Edge: Latest 2 versions

**Accessibility:**
- Confirmation dialogs keyboard accessible
- Screen reader announces actions clearly
- Danger actions (delete) have clear ARIA labels
- Focus trap in confirmation dialogs

---

## 📝 Notes

**Assumptions:**
- No dependencies on templates (no assignments yet in this epic)
- No template sharing (advisor can safely delete their own)
- No multi-user scenarios (advisor manages their own templates)
- Archive is reversible, delete is not

**Open Questions:**
- **Q: Should we require typing name for archive too (not just delete)?**  
  A: No, archive is low-risk (reversible), only delete requires name confirmation

- **Q: Should archived templates expire after X months?**  
  A: Out of scope for v1, manual restore/delete only

- **Q: Should we show "Archived by mistake? Restore" undo action?**  
  A: Out of scope for v1, can use standard restore flow

- **Q: Should we limit number of archived templates (storage concerns)?**  
  A: Out of scope for v1, no quota enforcement

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-27  
**Created By:** Product Team
