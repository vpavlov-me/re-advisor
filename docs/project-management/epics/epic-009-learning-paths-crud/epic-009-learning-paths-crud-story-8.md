# User Story: Review & Publish Learning Path

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As an advisor, I want to review and publish my learning path when it's ready
**Epic Link:** FG-EPIC-ALP-002-CRUD
**Priority:** High
**Story Points:** 3
**Sprint:** [To be assigned]

---

## 📖 User Story

**As a** Personal Family Advisor / External Consul / Consultant,
**I want to** review my completed learning path and publish it when ready,
**so that** it's marked as finalized and ready for use with families.

---

## 🎯 Business Context

**Why is this Story important?**

Publishing signals that learning path is complete, reviewed, and ready for professional use. This step provides final quality check and clear status distinction between work-in-progress drafts and finished content.

**User pain point being solved:**
- No clear indication when learning path is complete vs. in-progress
- No final review step before using with families
- Difficult to distinguish polished content from drafts

**Business outcome expected:**
- Clear status separation (Draft vs. Published)
- Quality assurance through review step
- Confidence in content readiness for family use
- Foundation for future assignment workflow (only published paths can be assigned)

---

## ✅ Acceptance Criteria

1. **Given** advisor has completed Steps 1 and 2 (Basic Information and Modules) in creation wizard,
   **When** advisor clicks "Next" from Step 2,
   **Then** system navigates to Step 3 (Review & Publish) showing complete preview of learning path.

2. **Given** advisor is on Step 3 (Review & Publish),
   **When** page loads,
   **Then** system displays:
     - Progress indicator: "Step 3 of 3: Review & Publish"
     - Section "Basic Information": Title, description, category, status (read-only preview)
     - Section "Modules": List of all modules in order with titles, descriptions, resource counts
     - Summary card: Total module count, total estimated duration (sum of all modules), total resource count
     - Warning if 0 modules: "⚠️ This learning path has no modules. Consider adding at least one module before publishing."
     - Buttons: "< Back" (to Step 2), "Save as Draft", "Publish"

3. **Given** advisor reviews learning path content,
   **When** advisor wants to make changes,
   **Then** advisor clicks "< Back" button to return to Step 2 (modules) or clicks "Edit Basic Info" link to return to Step 1.

4. **Given** advisor is satisfied with review,
   **When** advisor clicks "Save as Draft" button,
   **Then** system:
     - Saves learning path with status = "draft"
     - Shows success toast: "Learning path saved as draft"
     - Redirects to learning paths library
     - Path visible with [Draft] badge

5. **Given** advisor wants to publish learning path,
   **When** advisor clicks "Publish" button,
   **Then** system checks:
     - If 0 modules: Shows confirmation dialog: "Publish without modules? This learning path has no modules. Are you sure you want to publish? [Cancel] [Publish Anyway]"
     - If ≥1 module: Proceeds directly to publish

6. **Given** advisor confirms publish (with or without override),
   **When** system processes publish action,
   **Then** system:
     - Saves learning path with status = "published"
     - Shows success toast: "Learning path published successfully!"
     - Redirects to learning paths library
     - Path visible with [Published] badge (green)

7. **Given** learning path has 0 modules and advisor clicks "Publish",
   **When** confirmation dialog appears,
   **Then** advisor can:
     - Click "Cancel" → Returns to Step 3, no changes
     - Click "Publish Anyway" → Publishes despite 0 modules

8. **Given** publish operation fails (network error),
   **When** system attempts to save,
   **Then** system shows error toast "Failed to publish. Please try again." and remains on Step 3.

**Additional Criteria:**
- [ ] Review page is read-only (no editing inline)
- [ ] Module details expandable (click to see full description and resources)
- [ ] Summary card displays totals: X modules, Y min duration, Z resources
- [ ] Clear visual distinction between Draft and Published states
- [ ] Confirmation required only if 0 modules (not for normal publish)
- [ ] Success message includes status: "Saved as draft" vs "Published"
- [ ] Can publish learning path that's already published (re-publish, no status change)

---

## 🔑 Business Rules

**Publishing Rules:**
1. **Status transition**:
   - Draft → Published: Allowed anytime
   - Published → Published: Allowed (re-publish, essentially a no-op)
   - System does NOT prevent publishing paths with 0 modules (shows warning, but allows override)

2. **Module count validation**:
   - 0 modules: Show warning and require confirmation to publish
   - 1+ modules: Publish directly without confirmation
   - No maximum module limit for publishing

3. **Status semantics**:
   - **Draft**: Work in progress, not ready for family use, can be freely edited
   - **Published**: Finalized, ready for family use, signals quality and completeness
   - In MVP: Both Draft and Published can be edited equally (no restrictions)
   - Future: Published paths may have edit restrictions if assigned to learners

4. **Review content**:
   - Shows complete read-only preview
   - No inline editing (must go back to previous steps)
   - Ensures advisor reviews before finalizing

**Authorization:**
- Only creator can publish (creator_advisor_id = current_advisor_id)
- All publish actions server-side validated

**Data Updates on Publish:**
1. Set status = "published"
2. Update updated_at timestamp
3. No other changes to content

**Edge Cases:**
- **Already published**: Re-clicking "Publish" on published path → No error, status remains "published"
- **Draft to Draft**: Clicking "Save as Draft" on draft → No error, status remains "draft"
- **Empty path publish**: 0 modules → Confirmation required → Can override and publish
- **Network failure**: Publish fails → Error shown → Remains on Step 3 → Can retry

---

## 🎨 Design & UX

**User Flow:**

1. **Arriving at Review Step:**
   - Advisor completes adding modules in Step 2
   - Advisor clicks "Next" button
   - System navigates to Step 3
   - Progress indicator: "Step 3 of 3: Review & Publish"
   - Page loads with complete preview

2. **Review Layout:**
   ```
   ┌─────────────────────────────────────────────────┐
   │ Step 3 of 3: Review & Publish                  │
   ├─────────────────────────────────────────────────┤
   │                                                 │
   │ Summary                                         │
   │ ┌─────────────────────────────────────────────┐│
   │ │ 📚 8 modules  ⏱️ 240 minutes  🔗 15 resources││
   │ └─────────────────────────────────────────────┘│
   │                                                 │
   │ Basic Information                               │
   │ ┌─────────────────────────────────────────────┐│
   │ │ Title: Family Governance Fundamentals       ││
   │ │ Category: GOVERNANCE                        ││
   │ │ Status: Draft → Will become Published       ││
   │ │ Description: Comprehensive introduction...  ││
   │ └─────────────────────────────────────────────┘│
   │ [Edit Basic Info]                               │
   │                                                 │
   │ Modules                                         │
   │ ┌─────────────────────────────────────────────┐│
   │ │ 1. Introduction to Family Governance        ││
   │ │    📝 Overview of key concepts              ││
   │ │    ⏱️ 30 min  🔗 2 resources                 ││
   │ │    [Expand ▼]                               ││
   │ └─────────────────────────────────────────────┘│
   │ ┌─────────────────────────────────────────────┐│
   │ │ 2. Creating a Family Constitution           ││
   │ │    ... (collapsed view)                     ││
   │ └─────────────────────────────────────────────┘│
   │ ... (modules 3-8)                               │
   │                                                 │
   │ [< Back]  [Save as Draft]  [Publish]           │
   └─────────────────────────────────────────────────┘
   ```

3. **Publishing with Modules (Happy Path):**
   - Advisor reviews content
   - Sees summary: "8 modules, 240 minutes, 15 resources"
   - Everything looks good
   - Advisor clicks "Publish" button
   - Button shows loading spinner briefly
   - System saves with status = "published"
   - Success toast: "Learning path published successfully!" (green checkmark)
   - Redirects to library
   - Path now shows [Published] badge (green)

4. **Publishing without Modules (Edge Case):**
   - Advisor on Step 3
   - Summary shows: "0 modules, 0 minutes, 0 resources"
   - Warning displayed: "⚠️ This learning path has no modules. Consider adding at least one module before publishing."
   - Advisor clicks "Publish" anyway
   - Confirmation dialog appears:
     ```
     ┌────────────────────────────────────────┐
     │ ⚠️  Publish without modules?           │
     │                                        │
     │ This learning path has no modules.     │
     │ Are you sure you want to publish?      │
     │                                        │
     │ [Cancel]           [Publish Anyway]    │
     └────────────────────────────────────────┘
     ```
   - Advisor clicks "Publish Anyway"
   - System publishes despite 0 modules
   - Success toast shown
   - Redirects to library

5. **Saving as Draft:**
   - Advisor not ready to publish
   - Advisor clicks "Save as Draft"
   - No confirmation needed
   - System saves with status = "draft"
   - Success toast: "Learning path saved as draft"
   - Redirects to library
   - Path shows [Draft] badge (gray)

6. **Making Changes:**
   - Advisor on Step 3, notices typo in title
   - Advisor clicks "Edit Basic Info" link OR "< Back" button
   - Returns to Step 1 or Step 2
   - Makes corrections
   - Proceeds back to Step 3
   - Reviews again
   - Publishes

**UI Elements:**
- Progress indicator (top)
- Summary card with icons and numbers
- Collapsible module cards
- "Edit Basic Info" link
- Warning message if 0 modules (yellow background, warning icon)
- Navigation buttons: "< Back", "Save as Draft" (secondary), "Publish" (primary, green)
- Loading spinners on buttons
- Success/error toasts

---

## 🧪 Test Scenarios

**Happy Path:**
1. Advisor completes Steps 1 and 2 (creates "Governance 101" with 5 modules)
2. Clicks "Next" → Arrives at Step 3
3. Reviews preview: Title, description, 5 modules, total 150 minutes, 8 resources
4. Clicks "Publish"
5. System saves with status = "published"
6. Success toast appears
7. Redirects to library
8. Path visible with [Published] badge
9. Verify database: status = "published", updated_at = now

**Negative Tests:**
1. **Network failure**: Advisor clicks Publish → Connection drops → Error toast: "Failed to publish. Please try again." → Remains on Step 3
2. **Unauthorized**: Non-creator tries to access Step 3 URL → 403 Forbidden
3. **Invalid data**: Path has invalid module (shouldn't happen, but validate) → Error toast

**Edge Cases:**
1. **0 modules publish**:
   - Step 3 shows warning
   - Clicks "Publish" → Confirmation dialog
   - Clicks "Publish Anyway" → Publishes successfully
2. **0 modules draft**:
   - Step 3 shows warning
   - Clicks "Save as Draft" → Saves immediately (no confirmation for draft)
3. **Already published**:
   - Edit published path
   - Navigate through wizard to Step 3
   - Click "Publish" → Status remains "published" (no error)
4. **Expand/collapse modules**:
   - Click module card → Expands to show full description and resources
   - Click again → Collapses
5. **Navigate back**:
   - On Step 3 → Click "< Back" → Returns to Step 2
   - Modules still there, can continue editing

---

## 🔗 Dependencies

**Technical Dependencies:**
- Backend: PATCH /learning-paths/{id}/publish endpoint (or PATCH with status field)
- Frontend: Review preview component, confirmation dialog, navigation logic
- Database: Update status field with transaction

---

## ⚠️ Non-Functional Requirements

**Performance:**
- Page load: < 500ms (loading preview)
- Publish operation: < 500ms
- Redirect after publish: Immediate (< 200ms)

**Usability:**
- Clear read-only preview (no accidental edits)
- Summary provides quick overview
- Warning prevents publishing incomplete content unintentionally
- Confirmation only when necessary (0 modules)
- Success feedback confirms action

**Accessibility:**
- WCAG 2.1 Level AA compliance
- Screen reader announces: "Step 3 of 3: Review and Publish"
- Keyboard navigation: Tab through buttons, Enter to activate
- Focus management: Focus on "Publish" button by default

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions

---

## 📝 Notes

- Consider adding "Preview" mode in future (see how learner will experience path)
- Consider email notification to advisor when published (future enhancement)
- Future: If path is assigned to learners, publishing new version may need versioning
- Status change logging (audit trail) could be useful for future compliance
- Consider adding "Unpublish" action in library (change Published → Draft)

---

**Story Version:** 1.0.0
**Created:** 2025-10-24
**Last Updated:** 2025-10-24