# User Story: Create New Learning Path - Basic Information

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As an advisor, I want to create a new learning path template with basic information
**Epic Link:** FG-EPIC-ALP-002-CRUD
**Priority:** High
**Story Points:** 5
**Sprint:** [To be assigned]

---

## 📖 User Story

**As a** Personal Family Advisor / External Consul / Consultant,
**I want to** create a new learning path template by providing title, description, and category,
**so that** I can start building structured educational content for my family clients.

---

## 🎯 Business Context

**Why is this Story important?**

This is the foundation story for learning path creation. Advisors need ability to initialize a learning path with basic metadata before adding educational modules. This enables advisors to organize their educational content library and begin building structured programs for families.

**User pain point being solved:**
- Advisors currently have no way to create reusable educational templates
- Manual creation of learning programs for each family is time-consuming
- Lack of structured approach to family education

**Business outcome expected:**
- Advisors can start building learning path library
- Foundation for future learning path assignment functionality
- Improved advisor productivity through reusable templates

---

## ✅ Acceptance Criteria

1. **Given** advisor is logged into Advisor Portal,
   **When** advisor navigates to "Learning Paths" section and clicks "Create New Learning Path",
   **Then** system opens creation wizard on Step 1 (Basic Information).

2. **Given** advisor is on Step 1 of creation wizard,
   **When** advisor enters learning path title (max 255 chars), description (optional, max 2000 chars), selects category (GOVERNANCE/BUSINESS/FINANCE/LEADERSHIP/CUSTOM), and selects status (Draft/Published),
   **Then** system displays character count for title and description fields in real-time.

3. **Given** advisor has filled required fields (title, category, status),
   **When** advisor clicks "Next" button,
   **Then** system validates inputs and proceeds to Step 2 (Add Modules).

4. **Given** advisor is on Step 1 and wants to save work-in-progress,
   **When** advisor clicks "Save Draft" button,
   **Then** system saves learning path with status "Draft", shows success message "Draft saved", and redirects to learning paths library.

5. **Given** advisor has not filled title field,
   **When** advisor clicks "Next" or "Save Draft",
   **Then** system shows validation error "Title is required" and prevents proceeding.

6. **Given** advisor enters title exceeding 255 characters,
   **When** advisor types beyond limit,
   **Then** system prevents further input and shows warning "Maximum 255 characters".

7. **Given** advisor enters description exceeding 2000 characters,
   **When** advisor types beyond limit,
   **Then** system prevents further input and shows warning "Maximum 2000 characters".

8. **Given** learning path is created,
   **When** system saves to database,
   **Then** system records: unique ID (UUID), creator_advisor_id (current advisor), created_at timestamp, updated_at timestamp, and filters all future queries by creator_advisor_id.

**Additional Criteria:**
- [ ] Rich text editor supports bold, italic, lists, links for description field
- [ ] Category dropdown shows all 5 options with clear labels
- [ ] Status dropdown defaults to "Draft"
- [ ] "Cancel" button returns to learning paths library without saving
- [ ] Form persists data if browser accidentally closed (localStorage backup)
- [ ] Auto-save to draft every 30 seconds if any fields filled

---

## 🔑 Business Rules

**Validation Rules:**
1. **Title**: Required, max 255 characters, cannot be empty string
2. **Description**: Optional, max 2000 characters, supports rich text
3. **Category**: Required, must be one of: GOVERNANCE, BUSINESS, FINANCE, LEADERSHIP, CUSTOM
4. **Status**: Required, must be "draft" or "published"

**Authorization:**
- **Who can perform this action:** Personal Family Advisor, External Consul, Consultant, Consultant with Family Seats (all advisor types)
- **Who can view results:** Only the advisor who created the learning path (creator_advisor_id = current_advisor_id)

**Data Isolation:**
- All learning paths filtered by creator_advisor_id
- No cross-advisor visibility
- Server-side filtering enforced (never trust client-side)

**Edge Cases:**
- **Duplicate title**: System checks if advisor has another learning path with same/similar title → Shows warning "You already have a learning path with similar title. Continue anyway?" → Not blocking, advisor can proceed
- **Browser crash during creation**: Auto-save to localStorage every 30 seconds → On return, system offers to restore unsaved draft
- **Network timeout**: System shows "Connection lost, retrying..." and attempts to reconnect → On reconnect, auto-saves pending changes

---

## 🎨 Design & UX

**User Flow:**
1. User clicks "Create New Learning Path" button in Learning Paths section
2. System opens modal/page with creation wizard
3. User sees Step 1 form with fields: Title (text input), Description (rich text editor), Category (dropdown), Status (dropdown)
4. User fills title, optionally adds description, selects category and status
5. User clicks "Next" to proceed to Step 2 OR "Save Draft" to save and exit
6. System validates, saves (if draft), and either proceeds to Step 2 or redirects to library

**UI Elements:**
- Progress indicator: "Step 1 of 3: Basic Information"
- Character counters below title and description fields
- Tooltip icons explaining each field
- "Cancel", "Save Draft", "Next" buttons (right-aligned)
- Rich text toolbar: Bold, Italic, Bullet list, Link

---

## 🧪 Test Scenarios

**Happy Path:**
1. Advisor logs in → Navigates to Learning Paths → Clicks "Create New"
2. System opens wizard Step 1
3. Advisor enters title "Family Governance 101", description "Introduction to family governance", selects "GOVERNANCE", status "Draft"
4. Advisor clicks "Next"
5. System validates → Saves basic info → Proceeds to Step 2
6. Expected: Learning path created with unique ID, advisor as creator, timestamps recorded

**Negative Tests:**
1. **Missing title**: Advisor leaves title empty → Clicks "Next" → System shows error "Title is required" → Next button disabled
2. **Title too long**: Advisor enters 300 characters → System stops input at 255 → Shows warning
3. **Invalid category**: Advisor somehow submits invalid category (e.g., via API) → System rejects with 400 error "Invalid category"
4. **Unauthorized access**: Non-advisor user attempts to access creation wizard → System redirects to 403 Forbidden

**Edge Cases:**
1. **Auto-save**: Advisor fills title, waits 30 seconds → System auto-saves to draft → Shows "Last saved: [timestamp]"
2. **Duplicate title warning**: Advisor enters title "Succession Planning" (already exists) → System shows warning but allows proceeding
3. **Browser crash recovery**: Advisor fills form, browser crashes → Reopens browser → System offers "Restore unsaved draft?" → User clicks "Restore" → Form restored

---

## 🔗 Dependencies


**Technical Dependencies:**
- Database: `learning_paths` table with columns: id, creator_advisor_id, title, description, category, status, created_at, updated_at
- Backend service: advisor-portal-service (port 8011) with endpoint POST /learning-paths
- Frontend: Advisor Portal React app with Learning Paths section

---

## ⚠️ Non-Functional Requirements

**Security:**
- Authorization required: Yes (JWT token with advisor role)
- Data encryption: Yes (PII fields encrypted at rest if description contains sensitive info)
- PII handling: Yes - description may contain family-specific context, encrypt if needed
- All queries filtered by creator_advisor_id server-side

**Performance:**
- Page load: < 1 second
- Save operation: < 500ms
- Auto-save: Background, no UI blocking

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions (if specified)

**Accessibility:**
- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatible labels

---

## 📝 Notes

- This story covers Step 1 only - subsequent stories handle Step 2 (modules) and Step 3 (review/publish)
- Rich text editor: Consider using TipTap, Quill, or Draft.js
- Auto-save: Use debounced localStorage write, then sync to backend
- Consider adding "estimated time to complete" field in future iteration

---

**Story Version:** 1.0.0
**Created:** 2025-10-24
**Last Updated:** 2025-10-24