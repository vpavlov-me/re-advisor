# User Story: Add Modules to Learning Path

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As an advisor, I want to add multiple modules to my learning path with details and resources
**Epic Link:** FG-EPIC-ALP-002-CRUD
**Priority:** High
**Story Points:** 8
**Sprint:** [To be assigned]

---

## 📖 User Story

**As a** Personal Family Advisor / External Consul / Consultant,
**I want to** add multiple modules to my learning path with titles, descriptions, duration, and external link resources,
**so that** I can create comprehensive multi-step educational programs with supporting materials.

---

## 🎯 Business Context

**Why is this Story important?**

Modules are the core building blocks of learning paths. Advisors need ability to create structured, sequential educational content with supporting resources. This enables delivery of professional, organized learning experiences to families.

**User pain point being solved:**
- Advisors need to break complex topics into digestible learning steps
- Learners need external resources (videos, articles, documents) to support learning
- Manual management of learning materials is inefficient

**Business outcome expected:**
- Advisors can build professional multi-module learning programs
- Structured learning delivery improves family engagement
- Reusable modules save advisor time across families

---

## ✅ Acceptance Criteria

1. **Given** advisor has completed Step 1 (Basic Information) or is editing existing learning path,
   **When** advisor is on Step 2 (Add Modules) or modules section,
   **Then** system displays "Add Module" button and list of existing modules (if any).

2. **Given** advisor clicks "Add Module" button,
   **When** module form opens,
   **Then** system displays fields: Title (required, max 255 chars), Description (optional, rich text, max 1000 chars), Duration (optional, minutes), and "Resources" section.

3. **Given** advisor fills module title and optionally description/duration,
   **When** advisor clicks "Save Module",
   **Then** system validates, saves module with auto-assigned sequential order (1, 2, 3...), displays module card in list, and closes form.

4. **Given** advisor wants to add external link resource to module,
   **When** advisor clicks "Add Link" in Resources section, enters link URL and title, and clicks "Save",
   **Then** system validates URL format (must start with http:// or https://), saves link record, and displays link in module's resources list.

5. **Given** advisor has added multiple modules,
   **When** advisor views modules list,
   **Then** system displays modules in sequential order with: order number, title, description preview (first 100 chars), estimated duration, and resource count badge (e.g., "3 resources").

6. **Given** advisor adds modules in any order,
   **When** system assigns order numbers,
   **Then** system automatically assigns next available order number starting from 1 (e.g., first module = 1, second = 2, etc.).

7. **Given** module title exceeds 255 characters,
   **When** advisor types beyond limit,
   **Then** system prevents further input and shows warning "Maximum 255 characters".

8. **Given** module description exceeds 1000 characters,
   **When** advisor types beyond limit,
   **Then** system prevents further input and shows warning "Maximum 1000 characters".

9. **Given** advisor has not filled module title,
   **When** advisor clicks "Save Module",
   **Then** system shows validation error "Module title is required" and prevents saving.

10. **Given** advisor enters invalid URL format (missing http/https),
    **When** advisor clicks "Save" on link form,
    **Then** system shows validation error "Please enter a valid URL starting with http:// or https://".

**Additional Criteria:**
- [ ] Auto-save entire learning path (including modules) to draft every 30 seconds
- [ ] Show "Last saved: [timestamp]" indicator
- [ ] Allow unlimited number of modules per learning path
- [ ] Show warning UI message (not blocking) when 20+ modules added: "Large learning paths may be overwhelming for learners. Consider breaking into multiple paths."
- [ ] Rich text editor for module description supports bold, italic, lists, links
- [ ] Duration field accepts only positive integers (minutes)
- [ ] Each module can have 0 or more external links
- [ ] Link title is required (max 255 chars)
- [ ] No file upload in this story (external links only)

---

## 🔑 Business Rules

**Validation Rules:**
1. **Module Title**: Required, max 255 characters, cannot be empty
2. **Module Description**: Optional, max 1000 characters, supports rich text
3. **Duration**: Optional, positive integer (minutes), 0 is not allowed
4. **Module Order**: Auto-assigned sequentially (1, 2, 3...), maintained by system
5. **Link URL**: Required, must start with http:// or https://, max 2048 characters
6. **Link Title**: Required, max 255 characters

**Authorization:**
- **Who can perform this action:** Only the advisor who created the learning path (creator_advisor_id = current_advisor_id)
- **Who can view results:** Only the creator advisor

**Business Logic:**
- When module is added: System assigns next available order number (e.g., if 3 modules exist, new module gets order = 4)
- Module order is sequential with no gaps (1, 2, 3, 4...)
- When module is deleted (future story): System re-numbers remaining modules to eliminate gaps
- No maximum limit on number of modules per path
- Warning shown at 20+ modules (guidance only, not enforced)

**Edge Cases:**
- **No modules added**: Advisor can proceed to Step 3 with 0 modules → System shows warning on publish: "This learning path has no modules. Are you sure you want to publish?" → Can override
- **Duplicate link URLs**: Allowed (same URL can be added multiple times to different modules or same module)
- **Invalid URL format**: System validates and rejects (e.g., "google.com" without http/https)
- **Empty link title**: System rejects, shows error "Link title is required"

---

## 🎨 Design & UX

**User Flow:**

1. **Adding First Module:**
   - User on Step 2 or modules section → Clicks "Add Module" button
   - System opens module form (inline or modal)
   - User fills: Title "Introduction to Family Governance", Description "Overview of key concepts", Duration "30"
   - User clicks "Add Link" → Enters URL "https://youtube.com/watch?v=abc123", Link Title "Family Governance Video"
   - User clicks "Save" on link form → System validates → Link added to resources list
   - User clicks "Save Module" → System validates → Module saved with order = 1 → Module card appears in list

2. **Adding Subsequent Modules:**
   - User clicks "Add Module" again
   - User fills: Title "Creating a Family Constitution", Description "Step-by-step guide", Duration "45"
   - User adds link: "https://familygovernance.org/guide", "Constitution Guide"
   - User clicks "Save Module" → Module saved with order = 2 → Appears below first module

3. **Modules List View:**
   - System displays module cards vertically in order
   - Each card shows:
     - Order number (badge): "1", "2", "3"
     - Module title (bold)
     - Description preview (first 100 chars with "..." if truncated)
     - Duration badge (e.g., "30 min")
     - Resource count badge (e.g., "2 resources")
   - Hover/click to expand full details
   - Edit and Delete icons (separate stories)

4. **Proceeding to Step 3:**
   - User clicks "Next" button (below modules list)
   - System proceeds to Step 3 (Review & Publish)

**UI Elements:**
- "Add Module" button (prominent, primary color)
- Module cards with order badge, title, preview
- "Add Link" button within module form
- Character counters for title, description, link title
- Duration input with "minutes" label
- "Cancel" and "Save Module" buttons
- Progress indicator: "Step 2 of 3: Add Modules"

---

## 🧪 Test Scenarios

**Happy Path:**
1. Advisor on Step 2 → Clicks "Add Module"
2. Fills: Title "Module 1", Description "Test", Duration "30"
3. Clicks "Add Link" → Enters "https://example.com", "Example Link" → Saves
4. Clicks "Save Module" → System validates → Module saved with order = 1
5. Repeats for Module 2 → System assigns order = 2
6. Expected: 2 modules displayed in list, order 1 and 2, each with 1 resource

**Negative Tests:**
1. **Missing module title**: User leaves title empty → Clicks "Save Module" → System shows error "Module title is required"
2. **Title too long**: User enters 300 characters → System stops at 255 → Shows warning
3. **Invalid link URL**: User enters "google.com" (no http/https) → Clicks "Save" → System shows error "Please enter a valid URL starting with http:// or https://"
4. **Missing link title**: User enters URL but leaves title empty → Clicks "Save" → System shows error "Link title is required"
5. **Negative duration**: User enters "-10" → System rejects or converts to 0

**Edge Cases:**
1. **Zero modules**: Advisor clicks "Next" without adding modules → System allows proceeding to Step 3 (warning shown on publish)
2. **Many modules (20+)**: Advisor adds 21st module → System shows warning "Large learning paths may be overwhelming" → Allows proceeding
3. **Duplicate URLs**: Advisor adds same URL twice to same module → System allows (no uniqueness check)
4. **Very long link URL**: User pastes 3000-char URL → System truncates at 2048 chars or rejects

---

## 🔗 Dependencies

**Technical Dependencies:**
- Database: `learning_path_modules` table with columns: id, learning_path_id, title, description, order, duration
- Database: `module_resources` table with columns: id, module_id, resource_type (link/file), url, title
- Backend: POST /learning-paths/{id}/modules, POST /modules/{id}/resources/links
- Frontend: React form components, rich text editor

---

## ⚠️ Non-Functional Requirements

**Security:**
- Authorization required: Yes (creator_advisor_id validation)
- Data encryption: Yes (description may contain sensitive info)
- Input sanitization: Yes (prevent XSS in description/links)

**Performance:**
- Module save: < 500ms
- Link validation: < 200ms
- Page load with 50 modules: < 1 second (lazy loading if needed)

**Usability:**
- Inline validation feedback (real-time)
- Character counters visible
- Clear error messages
- Smooth scroll to newly added module

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions

---

## 📝 Notes

- Consider collapse/expand for module cards to reduce visual clutter with many modules
- Link validation: Only check format, not accessibility (don't ping URLs)
- Future enhancement: File upload support (separate story)
- Future enhancement: Video embed preview for YouTube/Vimeo links

---

**Story Version:** 1.0.0
**Created:** 2025-10-24
**Last Updated:** 2025-10-24