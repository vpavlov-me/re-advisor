---
doc_id: "EPIC-ALP-002-CRUD"
title: "Advisor Portal: Learning Path Template Management (CRUD)"
type: "epic"
category: "product"
audience: "product-team"
complexity: "advanced"
created: "2025-10-23"
updated: "2025-10-23"
version: "1.0.0"
status: "draft"
tags: ["learning-paths", "advisor-portal", "crud", "education", "template-management"]
related: ["DOC-USR-004", "DOC-USR-005", "DOC-USR-006", "EPIC-ALP-002-ASSIGN", "EPIC-007"]
owner: "product-manager-advisor-platform"
maintainer: "backend-lead-advisor-portal"
reviewer: "senior-architect"
review_cycle: "monthly"
next_review: "2025-11-23"
---

# Epic: Advisor Portal - Learning Path Template Management (CRUD)

---

## 📋 Basic Information

**Issue Type:** Epic
**Project:** FG
**Epic Name:** Advisor Portal - Learning Path Template Management
**Summary:** Enable advisors to create, edit, and manage learning path templates with multiple modules for their family clients
**Parent Initiative:** FG-XXX [Link to Advisor Portal Initiative]
**Priority:** High
**Epic Link:** FG-EPIC-ALP-002-CRUD

---

## 🎯 Epic Goal

**What will this Epic deliver?**

This Epic delivers a complete learning path template management system that enables advisors to create, edit, and organize structured educational programs as reusable templates.

**User-Facing Value:**
- Advisors can create learning path templates from scratch with multiple modules
- Advisors can edit existing learning paths (change structure, modules, content)
- Advisors can organize modules within paths (add, remove, reorder)
- Advisors can save templates as drafts or publish them as ready-to-use
- Advisors can delete templates they no longer need
- Advisors can duplicate existing paths to create variations quickly
- All templates are saved and accessible for future use with families

**Business Value:**
- Enables advisors to build library of educational content for families
- Reduces time to create structured learning programs
- Provides foundation for assigning learning to family members (future epic)
- Improves advisor productivity through reusable templates
- Positions platform as professional education delivery tool

**Scope Boundaries:**

**Included:**
- Create new learning path template (draft or published status)
- Edit existing learning path template (title, description, category, status)
- Add modules to learning path (unlimited count)
- Edit module details (title, description, resources, order)
- Remove modules from learning path
- Reorder modules within learning path (drag-and-drop)
- Delete entire learning path template
- Duplicate learning path template (copy with new name)
- Attach resources to modules (external links)
- Categorize learning paths (5 predefined categories: GOVERNANCE, BUSINESS, FINANCE, LEADERSHIP, CUSTOM)
- View list of all created learning paths (advisor's own templates only)
- Search and filter learning paths by category, status

**NOT Included (Future Phases):**
- Assignment of learning paths to family members (separate epic: FG-EPIC-ALP-002-ASSIGN)
- Progress tracking and completion (separate epic)
- Notifications to learners (separate epic)
- Learning path templates library/marketplace (separate epic: FG-EPIC-007)
- Pre-built templates from platform (separate epic)
- Version control and history (future enhancement)
- Collaboration with other advisors on templates (future enhancement)
- Import/export learning paths (future enhancement)
- Analytics on template usage (future enhancement)

---

## 👥 Target Users

**Primary Personas:**
- **Personal Family Advisor** (DOC-USR-004) - Creates learning paths for families within permitted modules
- **External Consul** (DOC-USR-005) - Creates comprehensive learning paths across all governance areas
- **Consultant** (DOC-USR-006) - Creates learning paths for multiple families via marketplace engagements
- **Consultant with Family Seats** (DOC-USR-006) - Creates learning paths for managed family portals

**Secondary Personas:**
- None (this epic focuses solely on advisor creation/management workflow)

---

## 📖 User Stories (High-Level)

**Main scenarios this Epic will enable:**

1. **As an advisor**, I want to create a new learning path template with a title, description, and category, so that I can start building structured educational content

2. **As an advisor**, I want to add multiple modules to my learning path with titles, descriptions, and resources, so that I can create comprehensive multi-step educational programs

3. **As an advisor**, I want to reorder modules within my learning path by dragging and dropping, so that I can adjust the learning sequence easily

4. **As an advisor**, I want to save my learning path as a draft while I'm still working on it, so that I can return and complete it later

5. **As an advisor**, I want to edit an existing learning path template (change title, add/remove modules, update content), so that I can improve or adapt my educational content

6. **As an advisor**, I want to duplicate an existing learning path to create a variation, so that I can quickly build similar programs without starting from scratch

7. **As an advisor**, I want to delete learning path templates I no longer need, so that I can keep my library organized

8. **As an advisor**, I want to see a list of all my created learning paths with filters by category and status, so that I can easily find and manage my templates

9. **As an advisor**, I want to attach resources ( links) to each module, so that learners have materials to support their education

10. **As an advisor**, I want to publish my learning path when it's ready, so that it's marked as complete and ready for use with families

[Detailed User Stories will be created in FG during Grooming]

---

### Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Advisors create overly complex learning paths (100+ modules) | Medium | Add recommended module limit guidance (10-15); add UI warning at 20+ modules; ensure performance testing with large paths |
| Data isolation issues - advisors see other advisors' templates | Critical | Implement strict filtering by advisor_id or family_id; comprehensive automated security tests; manual security review before release |
| File upload failures or large file sizes slow system | Medium | Implement file size limits (10MB per file); provide clear upload progress indicators; handle upload errors gracefully; use direct-to-storage uploads |
| Advisors lose work if browser crashes during creation | Medium | Implement auto-save every 30 seconds to draft; show "last saved" timestamp; allow recovery from drafts |
| Complex UI overwhelms advisors new to platform | High | Create simple 3-step wizard flow; provide in-app tooltips; record 3-minute tutorial video; offer first-time onboarding tour |
| Database performance with many modules per path | Low | Add database indexes on learning_path_id and order fields; implement lazy loading for module lists; target <500ms load time |

---

**User Flow:**

### Creating New Learning Path:

1. **Entry Point:**
   - Advisor navigates to "Learning Paths" section in Advisor Portal
   - Advisor clicks "Create New Learning Path" button
   - System opens creation wizard

2. **Step 1 - Basic Information:**
   - Enter learning path title (required, max 255 chars)
   - Enter description (optional, rich text, max 2000 chars)
   - Select category from dropdown: GOVERNANCE, BUSINESS, FINANCE, LEADERSHIP, CUSTOM
   - Select status: Draft or Published
   - Click "Next" or "Save Draft"
   - System validates required fields
   - System proceeds to Step 2 or saves draft

3. **Step 2 - Add Modules:**
   - Click "Add Module" button
   - Enter module title (required, max 255 chars)
   - Enter module description (optional, rich text, max 1000 chars)
   - Add estimated duration (optional, in minutes)
   - **Attach resources:**
     - Add external link: Click "Add Link" → Enter URL and link title → System validates URL format
   - System automatically assigns sequential order (1, 2, 3...)
   - Click "Save Module"
   - Repeat to add more modules
   - Drag and drop module cards to reorder
   - Click "Next" or "Save Draft"

4. **Step 3 - Review & Publish:**
   - System displays preview of entire learning path structure
   - Shows: Title, description, category, status
   - Shows: All modules in order with titles and resource counts
   - Displays module count and estimated total duration
   - Option to go back and edit (navigate to previous steps)
   - Click "Publish" (changes status to Published) or "Save Draft"
   - System validates (warning if Published with 0 modules)
   - System saves learning path
   - System shows success message: "Learning path created successfully!"
   - System redirects to learning paths library

### Editing Existing Learning Path:

1. **Entry Point:**
   - Advisor navigates to "Learning Paths" library
   - Advisor uses search/filter to find learning path
   - Advisor clicks "Edit" button on learning path card
   - System opens full editor view

2. **Editor View:**
   - System displays all sections in single page (not wizard)
   - **Basic Information section:**
     - Edit title, description, category, status
     - Changes auto-save every 30 seconds
   - **Modules section:**
     - View all modules in list/card format
     - Each module shows: order number, title, description preview, resource count
     - **Add new module:** Click "Add Module" → Opens module form → Fill details → Click "Save"
     - **Edit module:** Click module card → Expands inline editor → Edit fields → Click "Update"
     - **Delete module:** Click trash icon → Confirmation dialog: "Delete this module? This cannot be undone. [Cancel] [Delete]" → System deletes and reorders remaining modules
     - **Reorder modules:** Drag and drop module cards → System updates order numbers automatically
   - Click "Save Changes" button (top right)
   - System validates all changes
   - System saves to database
   - System shows success message: "Changes saved"

3. **Auto-save functionality:**
   - Every 30 seconds, system saves current state to draft
   - Shows "Last saved: [timestamp]" indicator
   - If connection lost, shows warning and attempts to reconnect
   - On reconnect, auto-saves pending changes

### Duplicating Learning Path:

1. **Entry Point:**
   - Advisor navigates to "Learning Paths" library
   - Advisor finds learning path to duplicate
   - Advisor clicks "Duplicate" button (three-dot menu)
   - System shows confirmation: "Duplicate this learning path? [Cancel] [Duplicate]"

2. **Duplication Process:**
   - System creates complete copy with all modules and resources
   - System generates new unique ID
   - System sets title to "[Original Title] - Copy"
   - System sets status to "Draft"
   - System sets creator to current advisor
   - System shows success message: "Learning path duplicated"
   - System opens duplicate in edit mode

3. **Post-duplication:**
   - Advisor modifies as needed (rename, edit modules, etc.)
   - Advisor clicks "Save Changes"
   - Duplicate saved as new independent learning path

### Deleting Learning Path:

1. **Entry Point:**
   - Advisor navigates to "Learning Paths" library
   - Advisor finds learning path to delete
   - Advisor clicks "Delete" button (three-dot menu)

2. **Confirmation:**
   - System shows confirmation dialog:
     - "Delete learning path?"
     - "This will permanently delete: [Learning Path Title]"
     - "This action cannot be undone."
     - Warning icon
     - [Cancel] [Delete] buttons

3. **Deletion:**
   - If confirmed: System deletes learning path and all associated modules and resources
   - System removes from database (hard delete in MVP)
   - System shows success message: "Learning path deleted"
   - System refreshes library view

4. **If canceled:**
   - System closes dialog
   - No changes made

### Key UX Principles:
- **Progressive disclosure:** Start simple (basic info), add complexity gradually (modules)
- **Auto-save:** Save draft every 30 seconds to prevent data loss, show "Last saved" timestamp
- **Visual feedback:** Show "Saving...", "Saved", upload progress, validation errors
- **Error prevention:** Validate required fields, show warnings, confirm destructive actions
- **Undo capability:** Allow draft revert if advisor wants to discard changes
- **Drag-and-drop:** Smooth module reordering with visual feedback
- **Mobile consideration:** Primary use on desktop, but ensure responsive layout works for tablet

---

## 🔒 Business Rules

**Key Business Rules:**

### 1. Learning Path Creation Rules:
- Title is required, maximum 255 characters
- Description is optional, maximum 2000 characters (rich text supported: bold, italic, lists, links)
- Category must be one of 5 predefined options: GOVERNANCE, BUSINESS, FINANCE, LEADERSHIP, CUSTOM
- Status must be either "Draft" or "Published"
- Learning path can be saved with 0 modules as draft
- Published paths should have at least 1 module (system shows warning if 0 modules, but allows override)
- Advisor can only create learning paths for families they serve (filtered by advisor-family association)
- Each learning path gets unique identifier (UUID or auto-increment ID)
- Creation timestamp recorded automatically
- Last updated timestamp updated on any change

### 2. Module Management Rules:
- Each module requires a title (required, max 255 characters)
- Module description is optional (max 1000 characters, rich text)
- Module order is sequential (1, 2, 3...) and automatically maintained by system
- When module is added: System assigns next available order number
- When module is deleted: System re-numbers remaining modules sequentially (no gaps)
- When module is reordered: System updates order numbers for all affected modules
- **No maximum limit** on number of modules per learning path
- UI may show warning when 20+ modules added (usability guidance, not blocking)
- Estimated duration is optional (stored in minutes, integer)
- Each module can have 0 or more resources attached

### 3. Resource Attachment Rules:

**External links:**
- Must be valid URL format (starts with http:// or https://)
- Support for any valid URL: YouTube, Vimeo, Google Drive, Dropbox, websites, etc.
- Link title is required (for display, max 255 chars)
- Link URL stored as-is (not validated for accessibility)
- No limit on number of links per module

**Resource deletion:**
- When module is deleted, all attached resources are deleted
- When learning path is deleted, all modules and resources are deleted
- Link deletion removes from database only

### 4. Status and Publishing Rules:
- **Draft:** 
  - Visible only to advisor who created it
  - Can be edited freely
  - Not available for assignment to learners (future epic)
  - Indicates "work in progress"
  
- **Published:** 
  - Visible only to advisor who created it (no public marketplace in MVP)
  - Can still be edited after publishing
  - Signals "ready for use with families"
  - Available for assignment to learners (future epic)
  
- Status change from Draft → Published:
  - System shows warning if 0 modules: "This learning path has no modules. Are you sure you want to publish?"
  - Allowed with override (user clicks "Publish Anyway")
  
- Status change from Published → Draft:
  - Allowed with no restrictions in MVP
  - Future consideration: May need restrictions if path is actively assigned to learners

### 5. Edit and Delete Rules:
- Advisor can only edit/delete learning paths they created (creator_advisor_id = current_advisor_id)
- System filters all queries by creator_advisor_id or advisor-family association
- Deleting a learning path performs cascade delete:
  - Deletes all modules
  - Deletes all resource records
  - Deletes uploaded files from storage
- Deletion requires explicit confirmation (dialog with warning)
- **No "soft delete"** - permanent deletion from database
- No undo/restore capability
- **Future consideration:** If learning path is assigned to family members (future epic), deletion may be:
  - Blocked entirely ("Cannot delete - already assigned")
  - Soft delete (hidden from advisor, but learners keep access)
  - Or require different handling

### 6. Duplication Rules:
- Duplicating creates complete independent copy
- Duplicated path gets new unique ID (not related to original)
- Duplicated path automatically set to "Draft" status (even if original was Published)
- Title becomes "[Original Title] - Copy"
- If "[Original Title] - Copy" already exists, append " (2)", " (3)", etc.
- All modules are deep copied with new IDs
- Module order preserved exactly
- All resource records copied
- **Files:** System creates new file records pointing to same storage files (no duplicate upload)
- **Links:** System copies link records with URLs
- Creator of duplicate = advisor who clicked duplicate (creator_advisor_id changes)
- Created timestamp = duplication time (not copied from original)

### 7. Data Isolation Rules (CRITICAL):

**General isolation:**
- Advisors only see learning paths they created
- All queries filtered by creator_advisor_id = current_advisor_id
- No cross-advisor visibility of templates in MVP
- Family members cannot see learning paths until assigned (future epic)

**Multi-tenancy considerations:**
- Learning paths are advisor-scoped, not family-scoped in creation phase
- Same advisor can use same learning path template with multiple families
- When assigned (future epic), assignment creates family-specific instance
- All database queries must include advisor ID filter
- **Security:** Never trust client-side filtering - always enforce server-side

**Advisor type specific rules:**
- **Personal Family Advisor:** Can create learning paths, usable with families where they have module access
- **External Consul:** Can create learning paths, usable with all families they serve
- **Consultant:** Can create learning paths, usable with families they have active bookings OR managed families
- **Consultant with Family Seats:** Can create learning paths, usable with all managed family portals

### 8. Validation Rules:

**Server-side validation (enforced):**
- Title cannot be empty
- Title maximum 255 characters
- Description maximum 2000 characters (if provided)
- Category must be one of 5 valid options
- Status must be "draft" or "published"
- Module title cannot be empty
- Module title maximum 255 characters
- File size must be ≤ 10MB
- File format must be in allowed list
- Link URL must be valid URL format (http/https)
- Module order must be positive integer

**Client-side validation (UX guidance):**
- Show character count for title/description fields
- Disable "Next" button until required fields filled
- Show error messages inline near fields
- Warn when publishing with 0 modules (can override)
- Warn when adding 20+ modules (performance guidance, not blocking)
- Show file upload progress
- Show file size before upload confirmation

**Business logic validation:**
- Duplicate title detection: System checks if advisor has another learning path with same/similar title
- If found, show warning: "You already have a learning path with similar title. Continue anyway?"
- Not blocking - advisor can proceed

### 9. Performance and Limits:

**Recommended limits (guidance, not enforced):**
- 10-15 modules per learning path (optimal for learner experience)
- Warning at 20+ modules

**System limits (enforced):**
- File upload: 10MB per file
- Text fields: As specified in character limits
- No limit on total number of learning paths per advisor
- No limit on total number of modules per path (performance tested up to 50)

**Performance targets:**
- Page load: < 1 second
- Save operation: < 500ms
- File upload: Progress indicator, no timeout
- Auto-save: Background, no UI blocking

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-23
**Status:** Ready for Review & Grooming
**Next Steps:** Schedule grooming session with development team