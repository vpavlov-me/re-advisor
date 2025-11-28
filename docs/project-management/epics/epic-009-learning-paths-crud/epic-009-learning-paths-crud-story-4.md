# User Story: Edit Existing Learning Path

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As an advisor, I want to edit existing learning path template including title, modules, and resources
**Epic Link:** FG-EPIC-ALP-002-CRUD
**Priority:** High
**Story Points:** 8
**Sprint:** [To be assigned]

---

## 📖 User Story

**As a** Personal Family Advisor / External Consul / Consultant,
**I want to** edit an existing learning path template by changing title, description, adding/removing modules, and updating content,
**so that** I can improve or adapt my educational content as needs evolve.

---

## 🎯 Business Context

**Why is this Story important?**

Learning content needs continuous improvement. Advisors must update paths as best practices evolve, family needs change, or errors are discovered. Edit capability is essential for maintaining high-quality, relevant educational library.

**User pain point being solved:**
- Cannot fix typos or update outdated information
- Cannot adapt learning paths for different families
- Forced to recreate paths from scratch for minor changes

**Business outcome expected:**
- Advisors maintain current, accurate learning content
- Higher learning path quality through iterative improvement
- Reduced time spent on content management

---

## ✅ Acceptance Criteria

1. **Given** advisor is viewing learning paths library,
   **When** advisor clicks "Edit" button on a learning path card,
   **Then** system opens full editor view with all sections accessible (not wizard flow).

2. **Given** advisor is in edit mode,
   **When** editor loads,
   **Then** system displays all current data: title, description, category, status in "Basic Information" section; all modules with details in "Modules" section.

3. **Given** advisor wants to edit basic information,
   **When** advisor modifies title, description, category, or status fields,
   **Then** system enables real-time validation, shows character counts, and marks form as "unsaved changes".

4. **Given** advisor wants to edit existing module,
   **When** advisor clicks on module card,
   **Then** system expands inline editor showing: title, description, duration, resources; advisor can modify any field; clicking "Update" saves changes.

5. **Given** advisor wants to add new module to existing path,
   **When** advisor clicks "Add Module" in edit mode,
   **Then** system opens module form (same as Story 2), advisor fills details, clicks "Save Module", system assigns next order number and adds to list.

6. **Given** advisor wants to delete module from existing path,
   **When** advisor clicks trash icon on module card,
   **Then** system shows confirmation dialog: "Delete this module? This cannot be undone. [Cancel] [Delete]", if confirmed → system deletes module and re-numbers remaining modules sequentially.

7. **Given** advisor makes changes in edit mode,
   **When** 30 seconds elapse without further changes,
   **Then** system auto-saves to database in background, updates "Last saved: [timestamp]" indicator, and shows brief success indicator.

8. **Given** advisor has unsaved changes,
   **When** advisor clicks browser back button or tries to close tab,
   **Then** browser shows confirmation dialog: "You have unsaved changes. Are you sure you want to leave?"

9. **Given** advisor finishes editing,
   **When** advisor clicks "Save Changes" button,
   **Then** system validates all changes, saves to database, shows success message "Changes saved", and updates `updated_at` timestamp.

10. **Given** advisor wants to discard changes,
    **When** advisor clicks "Cancel" button,
    **Then** system shows confirmation: "Discard unsaved changes? [Stay] [Discard]", if confirmed → system reverts to last saved state and returns to library.

**Additional Criteria:**
- [ ] Auto-save every 30 seconds while editing
- [ ] "Last saved: [timestamp]" indicator always visible
- [ ] "Unsaved changes" warning if user tries to navigate away
- [ ] All validation rules from Stories 1 and 2 apply in edit mode
- [ ] Can edit learning paths with status "Draft" or "Published"
- [ ] Editing Published path does not auto-change status to Draft
- [ ] Module deletion triggers confirmation dialog
- [ ] Module re-numbering automatic after deletion
- [ ] Can reorder modules while editing (Story 3 functionality)
- [ ] Can edit resources (add/remove links)

---

## 🔑 Business Rules

**Edit Permissions:**
1. Only creator advisor can edit (creator_advisor_id = current_advisor_id)
2. If advisor is not creator → System shows 403 Forbidden

**Status Behavior:**
1. Can edit learning path regardless of status (Draft or Published)
2. Editing Published path does NOT automatically change status to Draft
3. Advisor can manually change status from Published to Draft if desired
4. If learning path is assigned to learners (future epic): May need restrictions on editing Published paths

**Module Deletion:**
1. Deleting module requires confirmation
2. Deletion is permanent (no soft delete in MVP)
3. When module deleted:
   - System deletes all associated resources (links, files)
   - System re-numbers remaining modules sequentially
   - Example: Delete module 3 from [1,2,3,4,5] → Result: [1,2,3,4] (old 4→3, old 5→4)
4. Cannot undo deletion (MVP) - confirmation dialog is critical

**Auto-Save:**
1. Triggers every 30 seconds if changes detected
2. Saves entire learning path state (basic info + all modules)
3. Does not trigger on mouse movements or focus changes (only on actual data changes)
4. Shows "Saving..." indicator briefly
5. On failure: Shows error, retries once, if fails again → alerts user

**Data Integrity:**
1. All validation rules from creation apply (title length, module order, etc.)
2. Order sequence maintained (1,2,3...) after any changes
3. Timestamps: `updated_at` refreshed on every save

**Edge Cases:**
- **Editing with no changes**: "Save Changes" button disabled if no modifications
- **Deleting all modules**: Allowed (learning path can have 0 modules)
- **Concurrent edits**: Last write wins (MVP) - no conflict resolution
- **Network failure during auto-save**: System retries, shows error if persist

---

## 🎨 Design & UX

**User Flow:**

1. **Entering Edit Mode:**
   - Advisor in library → Clicks "Edit" on learning path card
   - System navigates to `/learning-paths/{id}/edit`
   - System loads full editor view (single page, not wizard)
   - Page sections: "Basic Information", "Modules", "Save/Cancel" buttons

2. **Editing Basic Information:**
   - Advisor changes title from "Governance 101" to "Family Governance Fundamentals"
   - Character counter updates in real-time
   - "Unsaved changes" indicator appears in top bar
   - After 30 seconds → Auto-save triggers → "Last saved: Just now"

3. **Editing Existing Module:**
   - Advisor clicks module card "Introduction to Governance"
   - Card expands showing inline editor
   - Advisor changes duration from 30 to 45 minutes
   - Advisor adds new link: "https://example.com/guide", "Additional Guide"
   - Advisor clicks "Update" → Module updates → Card collapses

4. **Adding New Module:**
   - Advisor clicks "Add Module" button
   - Module form opens (same UI as creation)
   - Advisor fills: Title "Conflict Resolution Basics", Description "...", Duration "60"
   - Advisor clicks "Save Module"
   - System assigns order = 6 (next available)
   - New module appears at bottom of list

5. **Deleting Module:**
   - Advisor clicks trash icon on module card
   - Confirmation dialog appears: "Delete this module? This cannot be undone."
   - Advisor clicks "Delete"
   - System deletes module
   - Remaining modules re-numbered automatically
   - Auto-save triggers

6. **Saving Changes:**
   - Advisor clicks "Save Changes" button (top right)
   - System validates all fields
   - System saves to database
   - Success message: "Changes saved"
   - "Unsaved changes" indicator disappears

7. **Canceling Edit:**
   - Advisor clicks "Cancel" button
   - Confirmation: "Discard unsaved changes? [Stay] [Discard]"
   - Advisor clicks "Discard"
   - System navigates back to library
   - No changes saved

**UI Elements:**
- Top bar: "Editing: [Learning Path Title]" | Auto-save indicator | "Unsaved changes" warning
- "Save Changes" and "Cancel" buttons (sticky top right)
- Collapsible sections: Basic Information (expanded by default), Modules (expanded)
- Inline module editor (expands on click)
- "Last saved: [timestamp]" (bottom of page)

---

## 🧪 Test Scenarios

**Happy Path:**
1. Advisor opens learning path "Governance 101" for editing
2. Changes title to "Advanced Governance"
3. Edits module 2: Changes duration from 30 to 45
4. Deletes module 4 (confirms) → Modules re-numbered
5. Adds new module "Summary" at end
6. Clicks "Save Changes"
7. Expected: All changes persisted, updated_at timestamp refreshed, success message shown

**Negative Tests:**
1. **Unauthorized edit**: Non-creator tries to access edit URL → 403 Forbidden
2. **Invalid title**: Advisor deletes title → Clicks "Save" → Error "Title is required"
3. **Network failure**: Connection drops during save → Error message shown → Changes queued for retry
4. **Stale data**: Advisor A and B edit same path simultaneously → B saves → A saves → B's changes overwritten (last write wins)

**Edge Cases:**
1. **No changes made**: "Save Changes" button disabled
2. **Delete all modules**: Advisor deletes all modules → Path has 0 modules → Allowed
3. **Auto-save during editing**: Advisor typing → 30 seconds pass → Auto-save in background → No UI disruption
4. **Navigate away with unsaved**: Advisor makes changes → Clicks browser back → Browser confirmation shown
5. **Edit Published path**: Advisor edits Published path → Status remains Published unless manually changed

---

## 🔗 Dependencies

**Technical Dependencies:**
- Backend: GET /learning-paths/{id}, PATCH /learning-paths/{id}, DELETE /modules/{id}
- Frontend: Edit view component, inline module editor, auto-save hook
- Database: Optimistic locking or last-write-wins strategy

---

## ⚠️ Non-Functional Requirements

**Security:**
- Authorization required: Yes (creator_advisor_id = current_advisor_id)
- CSRF protection on all write operations
- Input sanitization for XSS prevention

**Performance:**
- Page load: < 1 second (even with 50 modules)
- Auto-save: < 500ms, non-blocking
- Module update: < 300ms
- Consider lazy loading for large module lists

**Usability:**
- Clear "unsaved changes" indicator
- Confirmation dialogs for destructive actions
- Keyboard shortcuts: Ctrl+S to save, Esc to cancel inline edit
- Smooth transitions when expanding/collapsing modules

**Data Integrity:**
- Transaction isolation for concurrent edits
- Validation on both client and server
- Order sequence integrity maintained

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions

---

## 📝 Notes

- Consider adding "Revision History" in future to track changes over time
- Auto-save localStorage backup in case of browser crash
- Consider optimistic locking with version numbers to detect concurrent edits
- Add "Revert to saved" button to undo all unsaved changes without confirmation

---

**Story Version:** 1.0.0
**Created:** 2025-10-24
**Last Updated:** 2025-10-24