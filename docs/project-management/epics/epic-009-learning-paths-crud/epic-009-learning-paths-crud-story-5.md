# User Story: Delete Learning Path

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As an advisor, I want to delete learning path templates I no longer need
**Epic Link:** FG-EPIC-ALP-002-CRUD
**Priority:** Medium
**Story Points:** 3
**Sprint:** [To be assigned]

---

## 📖 User Story

**As a** Personal Family Advisor / External Consul / Consultant,
**I want to** delete learning path templates I no longer need,
**so that** I can keep my library organized and remove outdated or incorrect content.

---

## 🎯 Business Context

**Why is this Story important?**

Advisors need ability to remove outdated, incorrect, or unnecessary learning paths to maintain clean, organized library. Without deletion capability, library becomes cluttered with obsolete content, reducing productivity.

**User pain point being solved:**
- Cannot remove test learning paths created during exploration
- Outdated content clutters library and confuses usage
- No way to clean up after mistakes or experimental paths

**Business outcome expected:**
- Clean, organized learning path libraries
- Reduced confusion from obsolete content
- Improved advisor confidence in content quality

---

## ✅ Acceptance Criteria

1. **Given** advisor is viewing learning paths library,
   **When** advisor hovers over learning path card,
   **Then** system displays three-dot menu (⋮) icon in top-right corner of card.

2. **Given** advisor clicks three-dot menu on learning path card,
   **When** menu opens,
   **Then** system displays options: "Edit", "Duplicate", "Delete" with delete option in red/warning color.

3. **Given** advisor clicks "Delete" option in menu,
   **When** action is triggered,
   **Then** system displays confirmation dialog with:
     - Title: "Delete learning path?"
     - Message: "This will permanently delete: [Learning Path Title]"
     - Warning: "This action cannot be undone."
     - Warning icon (⚠️)
     - Buttons: [Cancel] (secondary) [Delete] (danger/red, primary)

4. **Given** confirmation dialog is displayed,
   **When** advisor clicks "Cancel",
   **Then** system closes dialog and returns to library with no changes.

5. **Given** confirmation dialog is displayed,
   **When** advisor clicks "Delete",
   **Then** system:
     - Performs cascade delete: learning path, all modules, all resources
     - Removes learning path from database (hard delete in MVP)
     - Shows success toast: "Learning path deleted"
     - Removes card from library view
     - Updates count if displayed (e.g., "5 learning paths" → "4 learning paths")

6. **Given** deletion is in progress,
   **When** network error occurs,
   **Then** system shows error message "Failed to delete learning path. Please try again." and does NOT remove card from view.

7. **Given** advisor attempts to delete learning path they didn't create,
   **When** delete action is triggered,
   **Then** system returns 403 Forbidden error and shows message "You can only delete learning paths you created."

**Additional Criteria:**
- [ ] Deletion is permanent (no soft delete in MVP)
- [ ] No "undo" functionality (MVP limitation)
- [ ] Cascade delete removes all associated data (modules, resources)
- [ ] Only creator can delete (creator_advisor_id validation)
- [ ] Delete button styled in warning/danger color (red)
- [ ] Confirmation required (prevent accidental deletion)
- [ ] Success feedback via toast notification
- [ ] Library view updates immediately after deletion

---

## 🔑 Business Rules

**Delete Authorization:**
1. Only creator advisor can delete (creator_advisor_id = current_advisor_id)
2. System validates authorization server-side (never trust client)
3. Unauthorized attempts return 403 Forbidden

**Cascade Delete Logic:**
1. When learning path is deleted:
   - Delete learning path record from `learning_paths` table
   - Delete all module records from `learning_path_modules` table (WHERE learning_path_id = ?)
   - Delete all resource records from `module_resources` table (WHERE module_id IN ...)
   - If file resources exist: Delete file records and optionally remove from storage (S3, etc.)
2. All deletes performed in single transaction (atomicity)
3. If any part fails → rollback entire operation

**Delete Restrictions (MVP):**
1. No restrictions in MVP - can delete any learning path regardless of:
   - Status (Draft or Published)
   - Age (newly created or old)
   - Usage (assigned to learners - future consideration)
2. Future consideration: Block deletion if learning path is assigned to family members

**Data Integrity:**
1. Hard delete (permanent removal from database)
2. No soft delete flag in MVP
3. No delete audit log in MVP (consider for future)
4. No recovery mechanism (consider "recently deleted" feature for future)

**Edge Cases:**
- **Deleting last learning path**: Allowed, library shows empty state
- **Concurrent deletion**: Two advisors try to delete same path → First succeeds, second gets 404 Not Found
- **Network failure during delete**: Transaction rolled back, learning path remains, error shown to user
- **Delete with active assignments (future)**: Should be blocked or handled specially when assignment feature exists

---

## 🎨 Design & UX

**User Flow:**

1. **Initiating Delete:**
   - Advisor viewing library with learning path cards
   - Advisor hovers over learning path card → Three-dot menu appears
   - Advisor clicks three-dot menu → Dropdown opens
   - Options shown: "Edit" (pencil icon), "Duplicate" (copy icon), "Delete" (trash icon, red)

2. **Confirmation Dialog:**
   - Advisor clicks "Delete"
   - Modal dialog appears (center screen, overlay backdrop)
   - Dialog content:
     - Warning icon (⚠️ in orange/yellow)
     - Title: "Delete learning path?" (bold, large)
     - Learning path title displayed: "Family Governance 101" (quoted, slightly gray)
     - Warning message: "This action cannot be undone."
     - Two buttons:
       - "Cancel" (secondary, gray) - left side
       - "Delete" (danger, red) - right side, focus default
   - Backdrop click closes dialog (same as Cancel)

3. **Deletion Process:**
   - Advisor clicks "Delete" button
   - Button shows loading spinner briefly
   - System performs cascade delete
   - Dialog closes
   - Success toast appears (top-right): "Learning path deleted" with checkmark (green)
   - Card fades out from library view (smooth 300ms animation)
   - Card removed from DOM

4. **Error Handling:**
   - If network error: Toast message "Failed to delete. Please try again." (red, with retry option)
   - If unauthorized: Toast message "You can only delete learning paths you created." (red)
   - Card remains in library view (no changes)

**UI Elements:**
- Three-dot menu (⋮) on hover
- Dropdown menu with icons
- Modal confirmation dialog
- Warning icon and danger button
- Toast notification (success/error)
- Card fade-out animation

**Visual Hierarchy:**
- Delete option in red (danger color)
- Cancel button less prominent (secondary)
- Delete button primary focus (dangerous action, but intentional)

---

## 🧪 Test Scenarios

**Happy Path:**
1. Advisor has 5 learning paths in library
2. Advisor hovers over "Old Test Path" → Three-dot menu appears
3. Advisor clicks menu → Clicks "Delete"
4. Confirmation dialog appears with path title and warning
5. Advisor clicks "Delete" button
6. System deletes learning path + 3 modules + 5 resources
7. Success toast appears
8. Card removed from library
9. Count updates: "5 learning paths" → "4 learning paths"

**Negative Tests:**
1. **Unauthorized delete**: Advisor B tries to delete Advisor A's path → System returns 403 → Error toast shown
2. **Network failure**: Advisor clicks Delete → Connection drops → Error toast: "Failed to delete. Please try again." → Card remains
3. **Already deleted**: Advisor A deletes path → Advisor B (who had stale view) tries to delete same path → 404 Not Found → Error toast

**Edge Cases:**
1. **Cancel deletion**: Advisor clicks Delete → Confirmation shown → Clicks Cancel → Dialog closes → No changes
2. **Backdrop click**: Advisor clicks Delete → Clicks outside dialog (backdrop) → Dialog closes → No changes (same as Cancel)
3. **Delete last path**: Advisor deletes only learning path → Library shows empty state: "No learning paths yet. Create your first one!"
4. **Rapid clicks**: Advisor double-clicks Delete button → System processes only once (button disabled during operation)

---

## 🔗 Dependencies

**Technical Dependencies:**
- Backend: DELETE /learning-paths/{id} endpoint with cascade delete logic
- Database: Foreign key constraints or manual cascade delete in code
- Frontend: Three-dot menu component, confirmation dialog component, toast notifications

---

## ⚠️ Non-Functional Requirements

**Security:**
- Authorization required: Yes (creator_advisor_id = current_advisor_id)
- CSRF token validation for DELETE request
- Rate limiting: Prevent mass deletion attacks (e.g., max 10 deletes per minute)

**Performance:**
- Delete operation: < 1 second (even with 50 modules and 100 resources)
- Card removal animation: 300ms smooth fade
- Toast notification appears within 200ms of completion

**Data Integrity:**
- Transaction atomicity: All deletes succeed or all fail
- Foreign key cascade delete or manual cascade in code
- Database constraints enforced

**Usability:**
- Clear confirmation dialog prevents accidental deletion
- Danger color (red) signals destructive action
- Success feedback confirms completion
- Error messages actionable ("try again" vs just "error")

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions

---

## 📝 Notes

- **Future enhancement**: Soft delete with "Recently Deleted" recovery period (30 days)
- **Future enhancement**: Delete audit log for compliance
- **Future enhancement**: Block deletion if learning path is assigned to active learners
- **Future enhancement**: Bulk delete (select multiple, delete at once)
- Consider keyboard shortcut: Select path + Delete key = show confirmation
- Toast notification should auto-dismiss after 3 seconds

---

**Story Version:** 1.0.0
**Created:** 2025-10-24
**Last Updated:** 2025-10-24