# User Story: Organize Resources into Folders

---

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As an External Advisor, I want to organize resources into folders, so that I can structure my library by client type, service offering, or topic
**Epic Link:** FG-XXX [Knowledge Center Library for Advisors]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As an** External Advisor,
**I want to** organize resources into folders,
**so that** I can structure my library by client type, service offering, or topic and quickly find materials when needed.

---

## 🎯 Business Context

**Why is this Story important?**

External Advisors manage extensive libraries of resources (presentations, templates, guides, case studies) that they reuse across different client engagements. Without organizational structure, advisors waste time searching through flat lists of resources, leading to:
- Inefficient client preparation (searching takes 5-10 minutes per session)
- Difficulty scaling library as it grows beyond 50+ resources
- Risk of using outdated or wrong materials due to poor organization

This story enables advisors to create personalized folder structures that match their workflow (e.g., "Family Governance Workshops", "Succession Planning Materials", "High Net Worth Clients"), reducing search time to under 1 minute and improving material relevance during client consultations.

**Business value:**
- **Time savings**: Reduce material search time from 5-10 minutes to < 1 minute
- **Scalability**: Enable advisors to manage libraries of 100+ resources efficiently
- **Professionalism**: Present organized, relevant materials to clients faster
- **Strategic alignment**: Support advisor efficiency and client satisfaction goals

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** I am logged into Advisor Portal with resources in my library,
   **When** I navigate to Knowledge Center Library page,
   **Then** I see a "Create Folder" button and folder management interface.

2. **Given** I am viewing my Knowledge Center Library,
   **When** I click "Create Folder" and enter folder name (e.g., "Succession Planning"),
   **Then** new folder appears in my library structure and is immediately available for organizing resources.

3. **Given** I have created folders in my library,
   **When** I drag-and-drop a resource from one folder to another (or from uncategorized to folder),
   **Then** resource moves to new folder and displays under correct folder in library view.

4. **Given** I have folder structure with resources,
   **When** I expand/collapse folders,
   **Then** I can see nested resources and navigate folder hierarchy (up to 3 levels deep).

5. **Given** I have created folders,
   **When** I right-click on folder and select "Rename" or "Delete",
   **Then** I can rename folder (with validation) or delete empty folders (with confirmation prompt).

6. **Given** I attempt to delete folder containing resources,
   **When** I select delete action,
   **Then** system shows warning "This folder contains X resources. Move them first or they will be moved to Uncategorized" with option to cancel or proceed.

**Additional Criteria:**
- [ ] Folder names must be unique within same parent folder (sibling folders)
- [ ] Folder names limited to 50 characters, no special characters except spaces, hyphens, underscores
- [ ] Maximum folder nesting depth: 3 levels (Folder > Subfolder > Sub-subfolder)
- [ ] Empty folders display "No resources yet. Drag resources here to organize."
- [ ] Resources without folder assignment appear in "Uncategorized" section (if implemented) or at root level
- [ ] Folder structure persists across sessions (saved to advisor profile)
- [ ] Each advisor has independent folder structure (no cross-advisor folder visibility)

---

## 🔐 Business Rules

**Validation Rules:**
1. **Folder Name Uniqueness**: Folder names must be unique among siblings (folders with same parent). Duplicate names at different hierarchy levels are allowed (e.g., "Templates" under "Governance" and "Templates" under "Succession" is valid).
2. **Folder Name Format**: 
   - Min length: 1 character
   - Max length: 50 characters
   - Allowed characters: letters, numbers, spaces, hyphens (-), underscores (_)
   - No special characters: / \ : * ? " < > |
3. **Nesting Depth Limit**: Maximum 3 levels of folder nesting. User cannot create subfolder inside 3rd-level folder.
4. **Resource-Folder Relationship**: Each resource can belong to only ONE folder at a time (single-parent hierarchy).

**Authorization:**
- **Who can perform this action:** External Advisors only (not Family Members or Admin)
- **Who can view results:** Only the advisor who created folders (advisor-specific isolation)

**Edge Cases:**
- **Empty folder deletion**: Allow immediate deletion with simple confirmation ("Delete folder [Name]?")
- **Non-empty folder deletion**: Show warning with resource count, offer to move resources to Uncategorized or cancel operation
- **Drag-and-drop to same folder**: No action, resource stays in place
- **Drag-and-drop to root/uncategorized**: Resource moved out of folder, becomes uncategorized
- **Maximum nesting reached**: Disable "Create Subfolder" option when viewing 3rd-level folder
- **Folder rename conflict**: Show error "Folder name already exists at this level" and keep old name
- **Network interruption during move**: Show error message, revert resource to original folder, allow retry

---

## 🧪 Test Scenarios

**Happy Path:**
1. Advisor logs into Advisor Portal, navigates to Knowledge Center Library
2. Clicks "Create Folder", enters name "Family Governance", clicks Save
3. New folder "Family Governance" appears in folder list
4. Advisor drags resource "Constitution Template.pptx" into "Family Governance" folder
5. Resource appears under "Family Governance" when folder is expanded
6. Advisor creates subfolder "Workshops" under "Family Governance"
7. Advisor drags another resource into "Workshops" subfolder
8. Advisor collapses and expands folders - structure persists
9. Advisor logs out and logs back in - folder structure remains intact

**Negative Tests:**
1. **Duplicate folder name**: Advisor tries to create folder with existing name at same level → System shows error "Folder name already exists"
2. **Invalid characters**: Advisor enters folder name with "/" or "*" → System shows error "Invalid characters in folder name"
3. **Empty folder name**: Advisor submits empty folder name → System shows error "Folder name required"
4. **Exceed nesting limit**: Advisor tries to create 4th level subfolder → "Create Subfolder" button disabled or shows error
5. **Delete non-empty folder without confirmation**: Advisor deletes folder with resources → System shows warning with resource count and requires explicit confirmation

**Edge Cases:**
1. **Drag resource to same folder**: Resource position unchanged, no error
2. **Very long folder name (50 characters)**: Folder created successfully, name truncated in display with tooltip showing full name
3. **Move resource between nested folders**: Resource successfully moves from Level 3 folder to Level 1 folder
4. **Rename folder to same name**: No changes made, no error shown
5. **Network interruption**: Move operation fails gracefully, resource returns to original folder, error message displayed

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Folder creation/rename: < 500ms response time
- Drag-and-drop move: < 300ms visual feedback, < 1s to persist
- Folder tree rendering: < 200ms for up to 50 folders

**Security:**
- Authorization required: Yes - advisor_id validation
- Data encryption: Standard (advisor-specific folder structure)
- PII handling: No - folder names are not PII

**Accessibility:**
- WCAG level: AA
- Keyboard navigation: Required (arrow keys for folder navigation, Enter to expand/collapse)
- Screen reader support: Required (announce folder structure changes)

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions

---

## 📝 Notes

**Open Questions:**
- [x] **Can resource belong to multiple folders?** → No, single-parent hierarchy for v1 (simplicity)
- [x] **What happens to resources in deleted folder?** → Move to "Uncategorized" with user confirmation
- [x] **Maximum number of folders per advisor?** → No hard limit initially, monitor usage (expect < 30 folders per advisor)
- [x] **Folder nesting depth limit?** → 3 levels maximum
- [x] **Should we support folder templates (pre-defined structures)?** → No for v1, consider for future iteration
- [x] **Drag-and-drop vs. modal for moving resources?** → Drag-and-drop primary UX, with "Move to folder" dropdown as alternative for accessibility
- [x] **Should folders be collapsible by default?** → Yes, start collapsed to reduce visual clutter

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-22