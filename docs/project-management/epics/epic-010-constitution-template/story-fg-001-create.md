# User Story: Create Constitution Template

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As an External Advisor, I want to create Constitution Templates from 12 predefined sections  
**Epic Link:** FG-EPIC-XXX (Constitution Templates for External Advisors)  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As an** External Advisor (External Consul or Consultant),  
**I want to** create Constitution Templates by selecting from 12 predefined sections and adding content,  
**so that** I can build reusable governance frameworks for my clients.

---

## 🎯 Business Context

**Why is this Story important?**

External Advisors repeatedly create similar constitution structures for different families. Creating templates saves time, ensures consistency, and allows advisors to leverage proven governance frameworks across their client portfolio.

**User pain point being solved:**
- Manually recreating constitutions from scratch for each family is time-consuming
- Inconsistent quality across different family engagements
- Cannot reuse proven frameworks efficiently

**Business outcome expected:**
- Faster constitution creation process
- Higher quality governance documents through standardization
- Improved advisor efficiency (less repetitive work)
- Advisor can scale practice with reusable assets

**Strategic alignment:**
- Positions platform as professional advisory tool
- Increases advisor retention (valuable tool they can't get elsewhere)
- Enables advisors to deliver more value to families

---

## ✅ Acceptance Criteria

1. **Given** I am an External Advisor logged into Advisor Portal,  
   **When** I navigate to "Constitution Templates" section,  
   **Then** I see "Create New Template" button and list of my existing templates (if any).

2. **Given** I click "Create New Template",  
   **When** the template creator opens,  
   **Then** I see form with fields: Template Name, Description (optional), and 12 section checkboxes.

3. **Given** I enter template name "Large Family Governance Framework",  
   **When** I select sections to include (e.g., sections 1, 2, 3, 4, 7, 10),  
   **Then** I can proceed to content editor for only those selected sections.

4. **Given** I proceed to content editor,  
   **When** editor loads,  
   **Then** I see rich text editor for each selected section with section name as header.

5. **Given** I fill in content for all selected sections,  
   **When** I click "Save Template",  
   **Then** template is saved to my library and I see success message.

6. **Given** I save a template,  
   **When** I return to Template Library,  
   **Then** I see my new template listed with: name, section count (e.g., "6/12 sections"), creation date, status "Active".

**Additional Criteria:**
- [ ] Template name must be unique within advisor's library (show validation error if duplicate)
- [ ] At least 1 section must be selected to proceed (max 12)
- [ ] Rich text editor supports: bold, italic, underline, bullet lists, numbered lists, headings (H2, H3)
- [ ] Empty sections allowed (advisor can save template with partial content)
- [ ] Template can be saved as "Draft" (incomplete) - advisor can return to edit later
- [ ] "Last Modified" timestamp automatically updated
- [ ] Character limit: 50,000 characters per section
- [ ] Template description: optional, max 500 characters

---

## 🔒 Business Rules

**Validation Rules:**
1. **Template name:** 
   - Required field
   - 3-100 characters
   - Must be unique within advisor's template library
   - Special characters allowed: letters, numbers, spaces, hyphens, underscores

2. **Section selection:** 
   - Minimum 1 section required
   - Maximum 12 sections (all predefined sections)
   - Cannot create custom sections

3. **Content validation:**
   - Rich text only (HTML formatted)
   - Max 50,000 characters per section
   - No file uploads in this story (text only)
   - Empty content allowed (can be filled later)

4. **Description:**
   - Optional field
   - Max 500 characters
   - Plain text only

**Authorization:**
- **Who can create templates:** External Consul, Consultant (both advisor personas)
- **Who can view templates:** Only template creator (no sharing in this epic)

**Edge Cases:**
- **Duplicate name:** If advisor tries to create template with name that already exists in their library → Show error: "Template with this name already exists. Please choose a different name."
- **0 sections selected:** If advisor selects no sections → "Continue" button disabled, show message: "Select at least 1 section to create template"
- **Unsaved changes:** If advisor navigates away without saving → Show confirmation dialog: "You have unsaved changes. Are you sure you want to leave?"
- **Browser crash:** If browser closes during creation → Template not saved (no auto-save in v1)
- **Section content too long:** If content exceeds 50,000 characters → Show error: "Section content too long. Maximum 50,000 characters."

---

## 🎨 Design & UX

**User Flow:**

**Step 1: Navigate to Templates**
1. Advisor logs into Advisor Portal
2. Clicks "Constitution Templates" in left sidebar
3. Lands on Template Library page

**Step 2: Initiate Template Creation**
1. Clicks "Create New Template" button (top right)
2. Template creator modal/page opens

**Step 3: Template Details (Step 1 of 3)**
1. Enter "Template Name" (required)
2. Enter "Description" (optional)
3. Click "Continue"

**Step 4: Section Selection (Step 2 of 3)**
1. See list of 12 predefined sections with checkboxes
2. Each section shows: Section Name, Short Description (1-2 sentences)
3. Select sections to include (min 1, max 12)
4. Click "Continue"

**Step 5: Content Editor (Step 3 of 3)**
1. See rich text editor for each selected section
2. Section name appears as header above each editor
3. Fill in content for each section
4. Click "Save Template" or "Save as Draft"

**Step 6: Confirmation**
1. Success message: "Template '[Name]' created successfully!"
2. Redirect to Template Library
3. New template appears in list

**UI Elements:**

**Section Selection UI:**
```
[ ] Section 1: Family Vision & Mission
    Brief description: Define family's purpose and long-term aspirations

[ ] Section 2: Family Values
    Brief description: Core principles guiding family decisions

[...continue for all 12 sections]
```

**Rich Text Editor Toolbar:**
- Bold, Italic, Underline
- Bullet List, Numbered List
- Heading 2, Heading 3
- Clear Formatting
- Character count: "1,234 / 50,000"

**Progress Indicator:**
- Step 1 of 3: Template Details
- Step 2 of 3: Section Selection
- Step 3 of 3: Content Editor

**Save Options:**
- "Save as Draft" (gray button) - saves incomplete template
- "Save Template" (primary blue button) - saves complete template

---

## 🧪 Test Scenarios

**Happy Path Test:**
1. **Given** External Consul "John Smith" logs into Advisor Portal
2. **When** he navigates to Constitution Templates
3. **Then** he sees "Create New Template" button
4. **When** he clicks "Create New Template"
5. **Then** template creator opens
6. **When** he enters:
   - Template Name: "Family Office Governance Framework"
   - Description: "Comprehensive governance for family offices with 20+ members"
7. **And** selects 6 sections: 1, 2, 3, 4, 7, 10
8. **And** clicks "Continue"
9. **Then** he sees content editor with 6 rich text fields
10. **When** he fills content for all 6 sections
11. **And** clicks "Save Template"
12. **Then** he sees success message
13. **And** template appears in his library with status "Active" and "6/12 sections"

**Negative Tests:**

**Test 1: Duplicate Template Name**
1. **Given** advisor already has template named "Basic Governance"
2. **When** advisor tries to create new template with same name
3. **Then** validation error shown: "Template with this name already exists"
4. **And** "Continue" button disabled

**Test 2: No Sections Selected**
1. **Given** advisor enters template name
2. **When** advisor clicks "Continue" without selecting any sections
3. **Then** "Continue" button is disabled
4. **And** helper text shows: "Select at least 1 section"

**Test 3: Content Exceeds Character Limit**
1. **Given** advisor is editing section content
2. **When** content reaches 50,000 characters
3. **Then** editor stops accepting input
4. **And** character counter shows "50,000 / 50,000" in red

**Test 4: Unsaved Changes Warning**
1. **Given** advisor has entered template details and content
2. **When** advisor clicks browser back button
3. **Then** confirmation dialog appears: "You have unsaved changes. Leave anyway?"
4. **And** advisor can choose "Stay" or "Leave"

**Edge Cases:**

**Test 1: All 12 Sections Selected**
1. **Given** advisor selects all 12 sections
2. **When** proceeding to content editor
3. **Then** all 12 rich text editors displayed (scrollable page)
4. **And** advisor can save template with all sections

**Test 2: Only 1 Section Selected**
1. **Given** advisor selects only "Family Vision & Mission"
2. **When** proceeding to content editor
3. **Then** only 1 rich text editor displayed
4. **And** template saves successfully as "1/12 sections"

**Test 3: Save as Draft (Incomplete Content)**
1. **Given** advisor fills content for 2 out of 6 selected sections
2. **When** advisor clicks "Save as Draft"
3. **Then** template saves with partial content
4. **And** status shows "Draft" in Template Library

**Test 4: Empty Content (No Text in Sections)**
1. **Given** advisor selects 3 sections
2. **When** advisor saves without adding any content
3. **Then** template saves successfully (empty sections allowed)
4. **And** advisor can edit later to add content

**Test 5: Special Characters in Template Name**
1. **Given** advisor enters name: "Smith Family - Estate & Governance (2024)"
2. **When** advisor saves template
3. **Then** template name accepted (hyphens, ampersands, parentheses allowed)

---

## ⚠️ Non-Functional Requirements

**Performance:**
- Template save operation: < 2 seconds
- Template creator page load: < 1 second
- Rich text editor initialization: < 500ms per editor

**Security:**
- Authorization required: Yes (External Consul or Consultant role)
- Data encryption: No (template content not encrypted at rest)
- PII handling: No (templates contain guidance, not personal data)
- SQL injection protection: Yes (parameterized queries)
- XSS protection: Yes (sanitize HTML in rich text)

**Data Retention:**
- Templates stored indefinitely until advisor deletes
- Soft delete on archive (data retained)
- Hard delete on permanent deletion

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Edge: Latest 2 versions
- Mobile: Responsive design (tablet optimized, phone view limited)

**Accessibility:**
- Keyboard navigation for all form fields
- Screen reader compatible
- ARIA labels on checkboxes and buttons
- Focus indicators visible

**Localization:**
- English only in v1
- UI labels: English
- Template content: Advisor's language choice

---

## 📝 Notes

**Assumptions:**
- Advisor Portal already has navigation structure for new "Constitution Templates" section
- Rich text editor component already exists and can be reused
- No file upload needed in templates (text content only)
- 12 predefined sections are final and won't change

**Open Questions:**
- **Q: Should we allow advisor to reorder sections in template?**  
  A: No, sections remain in fixed order 1-12 (answered in epic discussion)

- **Q: Should we have default/suggested content for each section?**  
  A: Out of scope for v1, advisor creates content from scratch

- **Q: Should we show character count in real-time or only on save?**  
  A: Real-time character count shown in editor (1,234 / 50,000 format)

- **Q: Should we implement auto-save (every 30 seconds)?**  
  A: No auto-save in v1, manual save only

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-27  
**Created By:** Product Team