# User Story: Duplicate Learning Path

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As an advisor, I want to duplicate existing learning path to create variations quickly
**Epic Link:** FG-EPIC-ALP-002-CRUD
**Priority:** Medium
**Story Points:** 5
**Sprint:** [To be assigned]

---

## 📖 User Story

**As a** Personal Family Advisor / External Consul / Consultant,
**I want to** duplicate an existing learning path to create a variation quickly,
**so that** I can build similar programs without starting from scratch and save time creating related content.

---

## 🎯 Business Context

**Why is this Story important?**

Advisors often create similar learning paths for different families or variations of same topic. Duplication enables rapid content creation by copying existing structure and content, then making targeted modifications.

**User pain point being solved:**
- Creating similar learning paths from scratch is time-consuming
- Manually recreating module structure is error-prone
- Difficult to maintain consistency across similar programs

**Business outcome expected:**
- 70% faster creation of similar learning paths
- Consistent structure across related programs
- Improved advisor productivity through content reuse

---

## ✅ Acceptance Criteria

1. **Given** advisor is viewing learning paths library,
   **When** advisor clicks three-dot menu (⋮) on learning path card,
   **Then** system displays menu with options: "Edit", "Duplicate", "Delete".

2. **Given** advisor clicks "Duplicate" option in menu,
   **When** action is triggered,
   **Then** system shows confirmation dialog:
     - Title: "Duplicate this learning path?"
     - Message: "This will create a complete copy with all modules and resources."
     - Preview: Shows original title and module count
     - Buttons: [Cancel] [Duplicate]

3. **Given** confirmation dialog is displayed,
   **When** advisor clicks "Duplicate" button,
   **Then** system:
     - Creates complete copy with new unique ID
     - Copies all modules with new IDs (preserving order)
     - Copies all resource records (links with URLs, file references)
     - Sets title to "[Original Title] - Copy"
     - Sets status to "Draft" (regardless of original status)
     - Sets creator_advisor_id to current advisor
     - Sets created_at and updated_at to current timestamp
     - Shows success toast: "Learning path duplicated"
     - Opens duplicate in edit mode

4. **Given** duplicate title conflicts with existing path,
   **When** system generates duplicate title,
   **Then** system appends incrementing number:
     - First duplicate: "[Original Title] - Copy"
     - Second duplicate: "[Original Title] - Copy (2)"
     - Third duplicate: "[Original Title] - Copy (3)"

5. **Given** advisor clicks "Cancel" in confirmation dialog,
   **When** cancel action is triggered,
   **Then** system closes dialog with no changes, returns to library.

6. **Given** duplication is in progress,
   **When** network error occurs,
   **Then** system shows error toast "Failed to duplicate. Please try again." and does NOT create partial duplicate.

7. **Given** advisor attempts to duplicate learning path they didn't create,
   **When** duplicate action is triggered,
   **Then** system still allows duplication (any advisor can duplicate any path they can see).

**Additional Criteria:**
- [ ] Duplicate is completely independent (changes to original don't affect duplicate)
- [ ] All modules copied with correct sequential order (1, 2, 3...)
- [ ] External links copied with same URLs and titles
- [ ] File resources: Create new file records pointing to same storage files (no re-upload)
- [ ] Duplicate automatically set to Draft status
- [ ] Opens in edit mode immediately after creation
- [ ] Original path unchanged (remains in library)
- [ ] Success toast with link to edit duplicate

---

## 🔑 Business Rules

**Duplication Logic:**
1. **Complete deep copy**:
   - Learning path record duplicated with new ID
   - All modules duplicated with new IDs
   - All resource records duplicated with new IDs
   - Module order preserved exactly (1, 2, 3...)
   - All content copied (titles, descriptions, durations)

2. **Title generation**:
   - Base pattern: "[Original Title] - Copy"
   - If "[Original Title] - Copy" exists → "[Original Title] - Copy (2)"
   - If "[Original Title] - Copy (2)" exists → "[Original Title] - Copy (3)"
   - System checks for existing titles by same advisor
   - Increments number until unique title found

3. **Status and ownership**:
   - Duplicate always set to "Draft" (even if original was Published)
   - Duplicate's creator_advisor_id = current advisor (not original creator)
   - Duplicate's created_at = duplication timestamp (not copied from original)
   - Duplicate's updated_at = duplication timestamp

4. **Resource handling**:
   - **External links**: Copy URL and title to new resource record
   - **File uploads (future)**: Create new file record pointing to same storage file (reference counting)
     - Do NOT upload file again (waste of storage)
     - If original file deleted later: Need reference counting logic (future consideration)

**Authorization:**
- Any advisor can duplicate any learning path visible to them
- In MVP: All paths are private (advisor only sees their own)
- So effectively: Advisor can only duplicate their own paths
- Future: If marketplace sharing exists, advisor can duplicate others' shared paths

**Data Integrity:**
1. Duplication performed in single transaction (atomicity)
2. If any step fails → rollback entire operation, show error
3. Duplicate must be complete (all modules and resources) or not exist

**Edge Cases:**
- **Duplicate of duplicate**: Allowed, creates third independent copy
- **Very long title**: Original title = 240 chars → "[Title...] - Copy" may exceed 255 → Truncate original title to fit
- **Empty learning path (0 modules)**: Allowed, creates empty duplicate
- **Duplicate during edit**: If advisor editing original while another duplicates → Duplicate reflects last saved state, not in-progress edits

---

## 🎨 Design & UX

**User Flow:**

1. **Initiating Duplication:**
   - Advisor viewing library with learning path cards
   - Learning path: "Family Governance Fundamentals" with 8 modules
   - Advisor hovers over card → Three-dot menu appears
   - Advisor clicks menu → Dropdown opens
   - Advisor clicks "Duplicate" (copy icon)

2. **Confirmation Dialog:**
   - Modal appears (center screen, overlay backdrop)
   - Dialog content:
     - Icon: Copy/duplicate icon (📋)
     - Title: "Duplicate this learning path?"
     - Message: "This will create a complete copy with all modules and resources."
     - Preview box (light background):
       - Original title: "Family Governance Fundamentals"
       - Module count: "8 modules"
       - Resource count: "15 resources"
     - Buttons:
       - "Cancel" (secondary, gray) - left
       - "Duplicate" (primary, blue) - right, focused

3. **Duplication Process:**
   - Advisor clicks "Duplicate" button
   - Button shows loading spinner
   - System performs deep copy:
     - Creates learning path: "Family Governance Fundamentals - Copy"
     - Copies 8 modules with new IDs (order: 1-8)
     - Copies 15 resource records
   - Dialog closes
   - Success toast appears: "Learning path duplicated" with "Edit now" link
   - System automatically navigates to edit mode of duplicate

4. **Edit Mode Opens:**
   - Advisor sees editor with duplicated content
   - Title field shows: "Family Governance Fundamentals - Copy"
   - All 8 modules visible with same content
   - Status: "Draft"
   - Advisor can immediately start editing to customize

5. **Subsequent Duplications:**
   - Advisor returns to library
   - Duplicates same path again
   - System generates title: "Family Governance Fundamentals - Copy (2)"
   - Opens in edit mode

**UI Elements:**
- Three-dot menu with "Duplicate" option (copy icon)
- Confirmation dialog with preview
- Loading spinner on button
- Success toast with link
- Automatic navigation to edit mode

**Visual Feedback:**
- Duplicate option styled neutral (not danger like delete)
- Preview box shows what will be copied
- Success toast confirms action
- Smooth transition to edit mode

---

## 🧪 Test Scenarios

**Happy Path:**
1. Advisor has learning path "Succession Planning" with 5 modules and 10 resources
2. Advisor clicks three-dot menu → "Duplicate"
3. Confirmation dialog appears showing "5 modules, 10 resources"
4. Advisor clicks "Duplicate"
5. System creates complete copy:
   - ID: new UUID
   - Title: "Succession Planning - Copy"
   - Status: "Draft"
   - Creator: current advisor
   - 5 modules with new IDs (order preserved)
   - 10 resources with new IDs
6. Success toast appears
7. Edit mode opens with duplicate
8. Verify database: 2 independent learning paths exist

**Negative Tests:**
1. **Network failure**: Advisor clicks Duplicate → Connection drops → Error toast → No partial duplicate created
2. **Transaction failure**: One module fails to copy → Entire duplication rolled back → Error toast
3. **Duplicate non-existent path**: Advisor has stale view, path deleted → Clicks Duplicate → 404 Not Found → Error toast

**Edge Cases:**
1. **Title conflict resolution**:
   - First duplicate: "Governance 101 - Copy"
   - Second duplicate: "Governance 101 - Copy (2)"
   - Third duplicate: "Governance 101 - Copy (3)"
2. **Long title truncation**:
   - Original: "The Comprehensive Guide to Family Governance and Wealth Management Across Generations and Multiple Jurisdictions with International Tax Considerations" (150 chars)
   - Duplicate: "The Comprehensive Guide to Family Governance and Wealth Management Across Generations and Multiple Jurisdictions with International Tax Con... - Copy" (truncated to fit 255 limit)
3. **Empty learning path**: Advisor duplicates path with 0 modules → Creates empty duplicate with "[Title] - Copy"
4. **Rapid duplication**: Advisor clicks Duplicate multiple times quickly → System processes once (button disabled during operation)

---

## 🔗 Dependencies

**Technical Dependencies:**
- Backend: POST /learning-paths/{id}/duplicate endpoint with deep copy logic
- Database: Transaction support for atomic duplication
- Frontend: Confirmation dialog, toast notifications, navigation to edit mode

---

## ⚠️ Non-Functional Requirements

**Security:**
- Authorization required: Yes (authenticated advisor)
- Currently: Advisor can only see/duplicate own paths (data isolation)
- Future: If marketplace exists, validate advisor has access to original path

**Performance:**
- Duplication operation: < 2 seconds (even with 50 modules and 100 resources)
- Transaction must be efficient (bulk INSERT operations)
- Success toast appears within 200ms of completion
- Edit mode loads immediately after duplication

**Data Integrity:**
- Transaction atomicity: All copies succeed or all fail
- Foreign key relationships maintained correctly
- Module order sequence preserved (1, 2, 3...)
- No data loss during copy

**Usability:**
- Confirmation dialog prevents accidental duplication
- Preview shows what will be copied (transparency)
- Success toast with actionable link ("Edit now")
- Automatic navigation to edit mode (seamless workflow)
- Clear indication that duplicate is in Draft status

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions

---

## 📝 Notes

- **Future enhancement**: "Duplicate to different family" (for consultants serving multiple families)
- **Future enhancement**: "Duplicate as template" (share to marketplace)
- **Future enhancement**: "Selective duplication" (choose which modules to copy)
- Consider adding "Original: [Link]" metadata to duplicate for traceability
- File upload consideration: Implement reference counting to prevent deleting shared files
- Performance: For very large paths (100+ modules), consider background job with notification

---

**Story Version:** 1.0.0
**Created:** 2025-10-24
**Last Updated:** 2025-10-24