---
story_id: "STORY-FG-004"
title: "Work Experience & Education"
type: "story"
epic_id: "EPIC-003"
created: "2025-10-17"
updated: "2025-10-20"
priority: "high"
status: "ready"
estimate: "16h"
story_points: 5
sprint: "Sprint 45"
assignee: ""
labels: ["advisor", "profile", "credentials", "document-upload", "linkedin-import"]
dependencies: ["STORY-FG-003"]
---

# User Story FG-004: Work Experience & Education

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As an External Advisor, I want to add my work history and educational background
**Epic Link:** EPIC-003 (Basic Advisor Registration & Profile)
**Priority:** High
**Story Points:** 5
**Sprint:** Sprint 45  

---

## 📖 User Story

**As an** External Advisor with professional background in family governance,  
**I want to** add my work experience entries and educational credentials to my profile,  
**So that** families can evaluate my qualifications, credibility, and relevant experience before engaging my services.

**Example Scenario:**
- **As a** Succession Planning Consultant with 10 years at a major advisory firm,
- **I want to** add my current and previous positions with descriptions, plus my MBA and CFA certification,
- **So that** families see my track record and trust that I have the expertise to guide their succession process.

---

## 🎯 Business Context

**Why is this Story important?**

Work history and credentials are critical trust indicators:

- **Credibility Building:** 85% of families review work experience before contacting advisors
- **Qualification Verification:** Educational background validates expertise claims
- **Differentiation:** Detailed experience descriptions help advisors stand out (40% higher engagement)
- **Search Ranking:** Profiles with complete work history rank 35% higher in marketplace
- **Trust Signal:** Minimum 1 work experience required demonstrates professional legitimacy

**Platform Strategy:**
- Step 2 of 4 in profile building journey
- Minimum 1 work experience entry required for profile submission
- Education optional but recommended for higher profile quality score

---

## ✅ Acceptance Criteria

### Page Entry & Structure

1. **Given** I completed Step 1 (Basic Information),  
   **When** I'm redirected to Step 2,  
   **Then** I see:
   - Header: "Step 2 of 4: Work Experience & Education"
   - Progress bar: 50% (Step 2 of 4)
   - Two main sections:
     - "Work Experience" (required, minimum 1 entry)
     - "Education & Credentials" (optional)
   - "Back" button (returns to Step 1)
   - "Save as Draft" button (secondary)
   - "Save & Continue" button (primary, disabled until 1 work entry added)

### Work Experience Section

2. **Given** I'm on Work Experience section,  
   **When** page loads,  
   **Then** I see:
   - Section header: "Work Experience" with required indicator (*)
   - "Add Position" button (primary)
   - Helper text: "Add at least 1 position. Include your current role and relevant past experience."
   - Empty state message if no entries

3. **Given** I click "Add Position",  
   **When** form expands,  
   **Then** I see fields:
   - **Company/Organization** (required, text input, 2-100 characters)
   - **Job Title/Role** (required, text input, 2-100 characters)
   - **Start Date** (required, month/year picker)
   - **End Date** (optional, month/year picker OR "Present" checkbox)
   - **Description** (optional, textarea, max 500 characters)
   - Character counter for description
   - "Save Position" button
   - "Cancel" button

4. **Given** I check "I currently work here" checkbox,  
   **When** checkbox is checked,  
   **Then**:
   - End Date field becomes disabled and grayed out
   - Position shows "Present" instead of end date
   - Start Date must not be in future

5. **Given** I filled all required fields for position,  
   **When** I click "Save Position",  
   **Then**:
   - Entry validates (end date >= start date if both provided)
   - Position added to list
   - Displayed as card with:
     - Company name (bold)
     - Job title
     - Date range: "Jan 2020 - Present" or "Jan 2018 - Dec 2020"
     - Description preview (first 100 chars)
     - "Edit" and "Delete" buttons
   - Form collapses back to "Add Position" button
   - "Save & Continue" button becomes enabled (minimum 1 entry met)

6. **Given** I have multiple work entries,  
   **When** viewing the list,  
   **Then**:
   - Entries sorted reverse chronologically (newest first, "Present" positions at top)
   - Drag handles visible for manual reordering
   - Each entry shows: company, title, dates, description preview
   - Maximum 20 positions allowed
   - Warning at 15 positions: "Consider focusing on most relevant roles"

7. **Given** I want to edit existing position,  
   **When** I click "Edit" on position card,  
   **Then**:
   - Form expands with fields pre-filled
   - Can modify any field
   - "Update Position" button replaces "Save Position"
   - "Cancel" button discards changes

8. **Given** I want to delete position,  
   **When** I click "Delete" on position card,  
   **Then**:
   - Confirmation modal: "Delete this position?"
   - Options: "Delete" (red) | "Cancel"
   - If confirmed: Position removed from list
   - If only entry and deleted: "Save & Continue" button disabled again

### Education & Credentials Section

9. **Given** I scroll to Education section,  
   **When** I see the section,  
   **Then** I see:
   - Section header: "Education & Credentials" (optional indicator)
   - "Add Education" button
   - Helper text: "Add your degrees, certifications, and professional licenses"
   - Empty state if no entries

10. **Given** I click "Add Education",  
    **When** form expands,  
    **Then** I see fields:
    - **Institution/Organization** (required, text input, 2-100 characters)
    - **Degree/Certification** (required, text input, e.g., "MBA", "CFA", "J.D.")
    - **Field of Study** (optional, text input, e.g., "Business Administration", "Law")
    - **Graduation Year** (required, year picker, 1950-current year)
    - **Honors/Awards** (optional, textarea, max 200 characters)
    - "Save Education" button
    - "Cancel" button

11. **Given** I saved education entry,  
    **When** entry is added,  
    **Then**:
    - Displayed as card with:
      - Institution name (bold)
      - Degree/certification
      - Field of study (if provided)
      - Graduation year
      - Honors (if provided)
      - "Edit" and "Delete" buttons
    - Entries sorted reverse chronologically (newest first)
    - No limit on number of education entries (but recommend max 5-7)

### Credential Documents Upload (Optional)

12. **Given** I see "Upload Credential Documents" subsection,  
    **When** I click "Upload Document",  
    **Then**:
    - File picker opens
    - Accepts: PDF, JPG, PNG
    - Max file size: 10MB per file
    - Max 5 files total
    - Labels: "Professional License", "Certification", "Award", "Other"

13. **Given** I uploaded credential document,  
    **When** upload completes,  
    **Then**:
    - File shown in list with:
      - Document name
      - File size
      - Upload date
      - Label/type dropdown
      - "Download" and "Delete" buttons
    - Documents stored securely with encryption
    - Warning if approaching 5 file limit

### Form Validation & Navigation

14. **Given** I have at least 1 work experience entry,  
    **When** I click "Save & Continue",  
    **Then**:
    - All work experience entries validated (dates, required fields)
    - All education entries validated (if any)
    - Data saved to database
    - Profile completion updated: ~50% (Step 2 complete)
    - Redirected to Step 3: Expertise Module Selection (FG-005)
    - Success toast: "Experience and education saved"

15. **Given** I have 0 work experience entries,  
    **When** I try to click "Save & Continue",  
    **Then**:
    - Button remains disabled
    - Error message: "Add at least 1 work experience to continue"
    - Scroll to Work Experience section

16. **Given** I click "Back" button,  
    **When** navigating to Step 1,  
    **Then**:
    - If unsaved changes: Warning modal appears
    - If saved or no changes: Navigate to Step 1 immediately

**Additional Criteria:**
- [ ] OAuth users (LinkedIn): Attempt to pre-populate work history from LinkedIn profile
- [ ] Date validation: End date cannot be before start date
- [ ] Current position validation: Cannot have multiple "Present" positions at same company
- [ ] Company autocomplete: Suggest existing companies for consistency
- [ ] Character counters for description fields
- [ ] Profile completion contribution: Work experience 20%, Education 10%

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Work Experience Form *(Figma link to be added)*
- Position Entry Card Layout *(Figma link to be added)*
- Education Form *(Figma link to be added)*
- Document Upload Interface *(Figma link to be added)*

**User Flow:**
```
1. Complete Step 1 → Redirected to Step 2
2. See "Work Experience" section (empty)
3. Click "Add Position"
4. Fill: Company "Smith Advisory LLC", Title "Senior Consultant"
5. Start Date: Jan 2020
6. Check "I currently work here" (no end date)
7. Description: "Leading family governance engagements..." (200 chars)
8. Click "Save Position"
9. Position card appears in list
10. "Save & Continue" button enabled
11. Scroll to Education section
12. Click "Add Education"
13. Fill: Institution "Harvard Business School", Degree "MBA"
14. Field: "Business Administration", Year: 2019
15. Click "Save Education"
16. Education card appears
17. Optionally upload credential document (CFA certificate PDF)
18. Click "Save & Continue"
19. Redirect to Step 3 (Expertise Selection)
```

**UI Components:**
- Repeatable form sections (work, education)
- Month/year date pickers
- "Present" checkbox for current position
- Character counter for description textarea
- Sortable/draggable list items with drag handles
- Collapsible forms (expand when "Add" clicked, collapse after "Save")
- File upload with drag-drop support
- Progress bar showing 50% on this step
- Validation error highlights (red borders)

---

## 🔒 Business Rules

### Work Experience Rules

- **Minimum Required:** 1 work experience entry mandatory for profile submission
- **Maximum Allowed:** 20 positions (warn at 15)
- **Required Fields:** Company, job title, start date
- **Optional Fields:** End date (auto-fills "Present" if unchecked), description
- **Date Validation:** 
  - End date >= start date
  - Start date cannot be in future
  - "Present" positions: End date = null
- **Chronological Sorting:** Newest first, "Present" positions at top

### Education Rules

- **Minimum Required:** 0 (optional)
- **Maximum Recommended:** 5-7 entries (no hard limit but UI suggests focus)
- **Required Fields:** Institution, degree/certification, graduation year
- **Optional Fields:** Field of study, honors/awards
- **Year Validation:** 1950 - current year

### Document Upload Rules

- **Accepted Formats:** PDF, JPG, PNG
- **Max File Size:** 10MB per file
- **Max Total Files:** 5 documents
- **Storage:** Encrypted storage (pgcrypto) in secure S3 bucket
- **Naming:** Original filename preserved, stored with advisor_id path
- **Labels:** Professional License, Certification, Award, Other

### LinkedIn Pre-population (OAuth Users)

- If registered via LinkedIn OAuth, attempt to fetch:
  - Work positions (company, title, dates, description)
  - Education (institution, degree, year)
- Pre-fill forms with LinkedIn data
- Advisor can edit or remove any pre-filled entry
- Manual entries take precedence over LinkedIn data

### Profile Completion Contribution

- Work Experience: 20% (minimum 1 entry = 10%, additional entries +2% each up to 20%)
- Education: 10% (1+ entries = 10%)
- Credential Documents: 5% bonus (not counted in base 100%)

---

## 🧪 Test Scenarios

### Happy Path
```
1. Complete Step 1 (Basic Info)
2. Land on Step 2: Work Experience & Education
3. See progress bar: 50%
4. Click "Add Position"
5. Fill: Company "Jones & Partners", Title "Family Office Advisor"
6. Start: Jan 2015, End: Dec 2020
7. Description: "Advised 20+ families on governance structures..."
8. Click "Save Position"
9. Position card appears
10. Click "Add Position" again (add second entry)
11. Fill: Company "Smith Advisory", Title "Senior Consultant"
12. Start: Jan 2021, Check "Currently work here"
13. Click "Save Position"
14. Two positions displayed, "Present" position at top
15. Scroll to Education
16. Click "Add Education"
17. Fill: "Stanford University", "MBA", "Finance", 2014
18. Click "Save Education"
19. Education card appears
20. Upload credential document: CFA_Certificate.pdf (2MB)
21. Click "Save & Continue"
22. Success toast shown
23. Redirect to Step 3 (Expertise)
24. Verify profile completion: 50%
```

### Work Experience Tests

1. **Minimum Requirement:**
   - Try to continue without adding work experience
   - "Save & Continue" disabled
   - Error: "Add at least 1 work experience to continue"
   - Add 1 position
   - Button becomes enabled

2. **Date Validation:**
   - Add position: Start Jan 2020, End Dec 2019 (invalid)
   - Click "Save Position"
   - Error: "End date must be after start date"
   - Correct: End Dec 2020
   - Saves successfully

3. **Current Position:**
   - Add position, check "I currently work here"
   - End date field disabled
   - Position shows "Jan 2020 - Present"
   - Saves successfully

4. **Edit Existing:**
   - Click "Edit" on position card
   - Form expands with pre-filled data
   - Change title from "Consultant" to "Senior Consultant"
   - Click "Update Position"
   - Card updates with new title

5. **Delete Position:**
   - Click "Delete" on position card
   - Confirmation modal: "Delete this position?"
   - Click "Delete"
   - Position removed from list
   - If last entry: "Save & Continue" disabled again

### Education Tests

1. **Optional Education:**
   - Skip education section entirely
   - Add only work experience
   - Click "Save & Continue"
   - Successfully proceed to Step 3

2. **Multiple Education Entries:**
   - Add: "Harvard MBA" 2015
   - Add: "Yale Law" 2012
   - Add: "Princeton BA" 2010
   - All three displayed, sorted newest first

### Document Upload Tests

1. **Valid Document Upload:**
   - Upload PDF: CFA_Certificate.pdf (5MB)
   - File appears in list
   - Label: "Certification"
   - Can download and view

2. **Invalid Document:**
   - Upload .docx file
   - Error: "Invalid format. Please upload PDF, JPG, or PNG"
   - Try again with PDF
   - Success

3. **File Too Large:**
   - Upload 15MB PDF
   - Error: "File too large. Maximum 10MB"
   - Compress file to 8MB
   - Upload successfully

4. **Maximum Files:**
   - Upload 5 documents successfully
   - Try to upload 6th
   - Error: "Maximum 5 documents allowed"
   - Must delete one to upload another

### LinkedIn Pre-population (OAuth)

1. **LinkedIn Data Import:**
   - Register via LinkedIn
   - Complete Step 1
   - Land on Step 2
   - Work Experience section shows 2 pre-filled positions from LinkedIn
   - Can edit or delete them
   - Can add additional manual entries

---

## 🔗 Dependencies

### Story Dependencies
- **Depends on:** FG-003 - Basic Profile Information (Step 1 must be complete)
- **Blocks:** FG-005 - Expertise Module Selection (Step 3)
- **Related:** FG-001 - OAuth Registration (LinkedIn data pre-population)

### Technical Dependencies
- S3 bucket for credential document storage with encryption
- LinkedIn API for work history import (OAuth users only)
- Company autocomplete data (optional, for consistency)
- Date picker library (React DatePicker or similar)
- File upload library with validation

### Data Dependencies
- Advisor account exists (from FG-001 or FG-002)
- Step 1 (Basic Info) completed

---

## ⚠️ Non-Functional Requirements

### Performance
- Page load: < 2 seconds
- Form expand/collapse: < 200ms
- Position save: < 500ms
- Document upload: < 10 seconds for 10MB file
- LinkedIn data import: < 3 seconds

### Security
- Document virus scanning before storage (ClamAV)
- Encrypted document storage (pgcrypto or S3 server-side encryption)
- Access control: Advisors can only access their own documents
- Download URLs time-limited (pre-signed S3 URLs, 1-hour expiry)

### Accessibility
- Keyboard navigation (Tab, Enter for forms)
- Screen reader support for dynamic content
- Form validation errors announced
- Date pickers accessible
- Drag-and-drop alternative (up/down buttons)

### Mobile Support
- Responsive forms on mobile/tablet
- Touch-friendly date pickers
- File upload from camera/gallery on mobile
- Optimized layout for smaller screens

---

## 📝 Notes

**Questions:**
- [ ] Should we verify employment history with companies? (LinkedIn does this)
- [ ] Do we need to validate professional licenses against issuing authorities?
- [ ] Should advisors rank positions by relevance vs. chronological?
- [ ] Allow importing work history from CV/resume upload?

**Assumptions:**
- LinkedIn API provides accurate work history
- Advisors have at least 1 professional position to add
- Most advisors will add 2-4 work entries (not all 20 allowed)
- Education is important but not mandatory
- Credential documents are optional for MVP

**Future Enhancements:**
- Import work history from PDF resume (AI parsing)
- Verify licenses with issuing authorities (API integration)
- Skill extraction from job descriptions (AI)
- Endorsements from clients/colleagues
- "Highlight Top 3 Positions" feature

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-17  
**Story Status:** Ready for Development  
**Sprint:** Sprint 45