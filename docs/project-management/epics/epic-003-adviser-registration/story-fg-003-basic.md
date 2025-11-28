---
story_id: "STORY-FG-003"
title: "Basic Profile Information"
type: "story"
epic_id: "EPIC-003"
created: "2025-10-17"
updated: "2025-10-20"
priority: "high"
status: "ready"
estimate: "20h"
story_points: 5
sprint: "Sprint 45"
assignee: ""
labels: ["advisor", "profile", "wizard", "ui", "photo-upload"]
dependencies: ["STORY-FG-001", "STORY-FG-002"]
---

# User Story FG-003: Basic Profile Information

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As an External Advisor, I want to create my basic professional profile
**Epic Link:** EPIC-003 (Basic Advisor Registration & Profile)
**Priority:** High
**Story Points:** 5
**Sprint:** Sprint 45  

---

## 📖 User Story

**As an** External Advisor with specialized expertise in family governance,  
**I want to** create my basic professional profile with photo, name, title, bio, and contact information,  
**So that** families can see my professional identity and understand who I am at a glance.

**Example Scenario:**
- **As a** Family Constitution Consultant,
- **I want to** upload my professional headshot, write a compelling 200-character bio, and add my phone and location,
- **So that** families viewing my marketplace profile see credible, professional

 information that builds trust.

---

## 🎯 Business Context

**Why is this Story important?**

Basic profile information is the foundation of advisor credibility:

- **First Impression:** 73% of families cite photo and bio as primary factors in initial advisor evaluation
- **Trust Building:** Complete basic profiles have 3x higher engagement rates than partial profiles
- **Search Visibility:** Profiles with location and contact info rank 40% higher in marketplace search
- **Conversion Impact:** Advisors with professional photos receive 60% more booking requests

**Platform Strategy:**
- Basic profile is Step 1 of 4 in profile building journey
- Required minimum for draft saving and progress tracking
- Foundation for subsequent profile sections (experience, expertise)

---

## ✅ Acceptance Criteria

### Profile Builder Entry

1. **Given** I registered and landed on dashboard,  
   **When** I click "Complete Your Profile" CTA,  
   **Then** I'm redirected to profile builder at /advisor/profile/setup
   - Shows: "Step 1 of 4: Basic Information"
   - Progress bar: 25% (Step 1 of 4)
   - Form sections clearly organized

### Photo Upload

2. **Given** I'm on Basic Information step,  
   **When** I see photo upload section,  
   **Then** I see:
   - Circular placeholder with camera icon
   - "Upload Photo" button
   - Guidelines: "Professional headshot, JPG/PNG, max 5MB"
   - Example photo thumbnail (reference)

3. **Given** I click "Upload Photo",  
   **When** file picker opens,  
   **Then** I can:
   - Select JPG or PNG file from device
   - Drag-and-drop file onto upload area
   - See file size and format validation in real-time

4. **Given** I selected valid photo (< 5MB, JPG/PNG),  
   **When** upload completes,  
   **Then** I see:
   - Crop tool overlay with adjustable frame
   - Zoom slider (50%-200%)
   - Rotate buttons (90° increments)
   - "Apply" and "Cancel" buttons

5. **Given** I adjusted crop and clicked "Apply",  
   **When** processing completes,  
   **Then**:
   - Cropped photo displayed in circular preview
   - Photo uploaded to S3
   - CDN URL saved to profile
   - "Change Photo" option available
   - Success message: "Photo uploaded successfully"

6. **Given** I upload invalid file (>5MB or wrong format),  
   **When** validation fails,  
   **Then** I see error:
   - "File too large. Maximum 5MB" OR "Invalid format. Please upload JPG or PNG"
   - Upload area remains empty
   - Option to select different file

### Basic Information Fields

7. **Given** I'm filling basic information form,  
   **When** I see the form,  
   **Then** fields are:
   - **Full Name** (required, pre-filled from registration)
   - **Professional Title** (required, placeholder: "e.g., Family Governance Consultant")
   - **Professional Bio** (required, rich text editor, 100-500 characters)
   - **Phone Number** (optional, international format selector)
   - **Location** (required, city + country dropdown/autocomplete)
   - **Years of Experience** (required, dropdown: <1, 1-3, 3-5, 5-10, 10-15, 15+)
   - **Languages** (optional, multi-select with proficiency levels)

8. **Given** I'm writing professional bio,  
   **When** I type in bio field,  
   **Then** I see:
   - Rich text toolbar (bold, italic, bullet list)
   - Character counter: "150 / 500" (updates in real-time)
   - Minimum 100 characters required message
   - Writing tips tooltip: "Describe your expertise, approach, and value proposition"

9. **Given** bio is less than 100 characters,  
   **When** I try to proceed,  
   **Then** error shown: "Bio must be at least 100 characters (currently: 75)"

10. **Given** I'm entering phone number,  
    **When** I select country code,  
    **Then** format example shown: "+1 (555) 123-4567" for US, "+44 20 1234 5678" for UK, etc.

11. **Given** I'm selecting location,  
    **When** I type city name,  
    **Then** Google Places autocomplete suggests cities with country

### Language Proficiency

12. **Given** I want to add languages,  
    **When** I click "Add Language",  
    **Then** I see:
    - Language dropdown (searchable list)
    - Proficiency level dropdown: Native | Fluent | Conversational | Basic
    - "Remove" button for each language
    - Can add maximum 10 languages

### Form Validation & Navigation

13. **Given** I filled all required fields correctly,  
    **When** I click "Save & Continue",  
    **Then** system:
    - Validates all fields
    - Saves data to database
    - Updates profile completion: ~30% (Step 1 of 4 complete)
    - Redirects to Step 2: Work Experience & Education (FG-004)
    - Shows success toast: "Basic information saved"

14. **Given** required fields are incomplete,  
    **When** I try to continue,  
    **Then**:
    - Form does not submit
    - Missing/invalid fields highlighted in red
    - Error summary at top: "Please complete required fields"
    - Page scrolls to first error

15. **Given** I want to exit without saving,  
    **When** I click "Back to Dashboard" or browser back,  
    **Then**:
    - Warning modal: "You have unsaved changes. Save as draft?"
    - Options: "Save Draft" | "Discard Changes" | "Continue Editing"

**Additional Criteria:**
- [ ] Form supports pre-populated data from OAuth (name, photo) if registered via OAuth
- [ ] All text fields have maxlength validation
- [ ] Phone number validates international formats (E.164)
- [ ] Location validates against Google Places API
- [ ] Photo compressed client-side before upload if > 2MB
- [ ] Profile completion percentage updates after save
- [ ] "Save as Draft" button always visible (manual save)
- [ ] Tooltip guidance for each field (icon with hover)

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Profile Builder Step 1 Layout *(Figma link to be added)*
- Photo Upload with Crop Tool *(Figma link to be added)*
- Bio Rich Text Editor *(Figma link to be added)*
- Form Validation States *(Figma link to be added)*

**User Flow:**
```
1. Dashboard → Click "Complete Your Profile"
2. Land on /advisor/profile/setup (Step 1 of 4)
3. See progress: "Basic Information" (25%)
4. Upload photo → Crop → Apply
5. Verify name (pre-filled)
6. Enter professional title
7. Write bio (100-500 chars, see character count)
8. Enter phone number (optional)
9. Select location (autocomplete)
10. Select years of experience
11. Add languages (optional, up to 10)
12. Review form
13. Click "Save & Continue"
14. Validation passes
15. Redirect to Step 2 (Work Experience)
```

**UI Components:**
- Progress stepper: Step 1 of 4 (active), Steps 2-4 (disabled)
- Circular photo preview with upload overlay
- Crop tool modal with zoom/rotate controls
- Rich text editor (Quill or TipTap)
- Character counter (bio): "150 / 500"
- International phone input with flag selector
- Location autocomplete (Google Places)
- Dropdown: Years of experience
- Multi-select language picker with proficiency
- "Save as Draft" button (secondary)
- "Save & Continue" button (primary, blue)
- Back navigation with unsaved changes warning

---

## 🔒 Business Rules

### Photo Requirements

- **Format:** JPG, PNG only
- **Size:** Maximum 5MB, auto-compress if > 2MB before upload
- **Dimensions:** Minimum 400x400px, recommended 800x800px
- **Quality Guidelines:** Professional headshot, clear face, neutral background, business attire
- **Storage:** S3 with advisor-specific path: `/advisors/{advisor_id}/profile-photo.jpg`
- **CDN:** CloudFront URL saved to profile for fast delivery

### Field Validation

- **Full Name:** 2-100 characters, required, pre-filled from registration
- **Professional Title:** 5-100 characters, required
- **Bio:** 100-500 characters, required, rich text (bold, italic, bullets allowed)
- **Phone:** Optional, E.164 format validation if provided
- **Location:** Required, city + country, validated against Google Places
- **Years of Experience:** Required, dropdown selection
- **Languages:** Optional, max 10, each with proficiency level

### Profile Completion Contribution

- This step contributes **30%** to overall profile completion:
  - Photo: 10%
  - Name: 5%
  - Title: 5%
  - Bio: 10%

### Data Pre-population

- **OAuth Registration:** Name, photo pre-filled from OAuth provider (LinkedIn/Google/Apple)
- **Email Registration:** Name pre-filled from registration form, photo empty
- **Existing Data:** If advisor returns to edit, all fields pre-populated

---

## 🧪 Test Scenarios

### Happy Path
```
1. Register via LinkedIn OAuth
2. Dashboard shows "Complete Your Profile" CTA
3. Click CTA → Redirected to Step 1 of 4
4. See name and photo pre-filled from LinkedIn
5. Verify name: "Jane Smith"
6. Photo already uploaded, looks good, skip
7. Enter title: "Family Governance Consultant"
8. Write bio: "Helping families navigate complex governance challenges with 15+ years of experience in mediation and strategic planning. Specialized in multi-generational wealth transitions." (150 chars)
9. Enter phone: "+1 (555) 123-4567"
10. Select location: "London, United Kingdom" (autocomplete)
11. Select years: "15+ years"
12. Add language: "English - Native"
13. Add language: "Spanish - Fluent"
14. Review form - all fields complete
15. Click "Save & Continue"
16. Success toast shown
17. Redirected to Step 2
18. Verify profile completion: 30%
```

### Photo Upload Tests

1. **Valid Photo Upload:**
   - Upload 3MB JPG professional headshot
   - Crop tool opens
   - Adjust crop area, zoom 150%
   - Click "Apply"
   - Photo displayed in circular preview
   - CDN URL saved

2. **Invalid Photo - Too Large:**
   - Upload 8MB PNG
   - Error: "File too large. Maximum 5MB"
   - Upload area remains empty
   - Select smaller file successfully

3. **Invalid Photo - Wrong Format:**
   - Upload PDF file
   - Error: "Invalid format. Please upload JPG or PNG"
   - File picker reopens

4. **Photo Replacement:**
   - Upload first photo successfully
   - Click "Change Photo"
   - Upload different photo
   - Crop and apply
   - New photo replaces old in preview

### Validation Tests

1. **Bio Too Short:**
   - Enter 50 characters
   - Click "Save & Continue"
   - Error: "Bio must be at least 100 characters (currently: 50)"
   - Add more text to reach 100+ chars
   - Submit successfully

2. **Missing Required Fields:**
   - Leave professional title empty
   - Click "Save & Continue"
   - Error summary: "Please complete required fields"
   - Title field highlighted in red
   - Fill title
   - Submit successfully

3. **Invalid Phone Format:**
   - Enter phone: "123" (incomplete)
   - Blur from field
   - Error: "Please enter valid phone number"
   - Enter: "+1 (555) 123-4567"
   - Error clears

### Navigation Tests

1. **Unsaved Changes Warning:**
   - Fill half the form
   - Click browser back button
   - Modal: "You have unsaved changes. Save as draft?"
   - Click "Save Draft"
   - Data saved, return to dashboard
   - Return to profile builder
   - Verify data persisted

2. **Save as Draft:**
   - Fill form partially (only required fields)
   - Click "Save as Draft" button
   - Success: "Draft saved"
   - Dashboard shows 30% completion
   - Return later
   - All data pre-filled

---

## 🔗 Dependencies

### Story Dependencies
- **Depends on:** FG-001 or FG-002 (Registration completed, advisor account exists)
- **Blocks:** FG-004 - Work Experience & Education (next step in profile builder)
- **Related:** FG-006 - Draft Profile Saving (uses draft save functionality)

### Technical Dependencies
- S3 bucket for photo storage with advisor-specific folder structure
- CDN (CloudFront) for photo delivery
- Image processing library (Sharp or ImageMagick) for compression and resizing
- Rich text editor library (Quill or TipTap)
- Google Places API for location autocomplete
- International phone number library (libphonenumber)

### Data Dependencies
- Advisor account must exist (from FG-001 or FG-002)
- OAuth data may be pre-populated (name, photo from LinkedIn/Google/Apple)

---

## ⚠️ Non-Functional Requirements

### Performance
- Page load: < 2 seconds
- Photo upload: < 5 seconds for 5MB file
- Image compression: < 2 seconds
- Form save: < 500ms
- Location autocomplete: < 300ms response time

### Security
- Photo virus scanning before storage (ClamAV or similar)
- XSS prevention in rich text bio (sanitize HTML)
- SQL injection protection on all text inputs
- CSRF tokens for form submission
- Uploaded photos isolated by advisor_id (no cross-advisor access)

### Accessibility
- WCAG AA compliance
- Keyboard navigation for all form elements (Tab, Enter, Esc)
- Screen reader support:
  - Form labels announced
  - Error messages linked to fields (ARIA)
  - Character counter announced
- Focus indicators visible (blue outline)
- Color contrast 4.5:1 minimum

### Mobile Support
- Responsive design 320px to desktop width
- Touch-friendly controls (44px minimum tap targets)
- Photo capture from device camera on mobile
- Optimized layout for tablet profile editing
- Virtual keyboard doesn't obscure form fields

---

## 📝 Notes

**Questions:**
- [ ] Should we verify phone numbers with SMS code? (Recommend: No for MVP, optional later)
- [ ] Do we need face detection validation on photos? (AI to check if face present)
- [ ] Should advisors showcase video introduction instead of/in addition to photo? (Future enhancement)
- [ ] Allow advisors to import bio from LinkedIn? (If OAuth registered)

**Assumptions:**
- Advisors have professional headshots available (or will take one)
- Advisors can write compelling 100-500 character bio
- Google Places API provides accurate location data
- CDN delivers photos fast enough for good UX (<1 second load)

**Future Enhancements:**
- AI-powered bio writing assistant (suggest improvements)
- Photo quality scoring (AI checks lighting, clarity, professionalism)
- Video introduction (15-30 second clip)
- Portfolio/work samples upload
- Social media links (LinkedIn, website)
- Calendar availability preview (link to scheduling)

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-17  
**Story Status:** Ready for Development  
**Sprint:** Sprint 45