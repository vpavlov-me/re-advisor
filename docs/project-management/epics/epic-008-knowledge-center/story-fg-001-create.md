# User Story: Create and Organize Educational Resource

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As an External Advisor, I want to create and organize educational resources of 10 different types, so that I can build a comprehensive knowledge library for my consulting practice  
**Epic Link:** FG-XXX [Knowledge Center Library for Advisors]  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As an** External Advisor,  
**I want to** create and organize educational resources of 10 different types (Articles, Case Studies, Best Practices, Constitution Templates, Learning Path Templates, Checklists, Video Tutorials, Webinar Recordings, Podcasts, Research Papers),  
**so that** I can build a comprehensive knowledge library for my consulting practice and share valuable content with my family clients.

---

## 🎯 Business Context

**Why is this Story important?**

External Advisors need a centralized way to create, organize, and manage their educational content across multiple formats. Currently, advisors struggle with:
- **Scattered content**: Resources stored across different platforms (Google Drive, Dropbox, personal computers)
- **Lack of organization**: No systematic categorization or tagging making resources hard to find
- **No visibility control**: Cannot easily control which resources are private vs. shared with families
- **Time waste**: Spend significant time searching for and preparing materials for each consultation

**Business Value:**
- Enables advisors to build professional knowledge library within platform
- Reduces time spent preparing consultation materials (target: 30% time savings)
- Increases advisor credibility through organized, high-quality content portfolio
- Creates foundation for Knowledge Marketplace monetization
- Improves family engagement through readily available educational resources

**Strategic Alignment:**
- Supports advisor retention and platform stickiness
- Enables future Knowledge Marketplace revenue stream
- Differentiates platform from basic consulting management tools

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** I am logged in as External Advisor,  
   **When** I navigate to Knowledge Center and click "Create Resource",  
   **Then** I see a form with Type dropdown containing all 10 resource types (Articles, Case Studies, Best Practices, Constitution Templates, Learning Path Templates, Checklists, Video Tutorials, Webinar Recordings, Podcasts, Research Papers).

2. **Given** I am on Create Resource form,  
   **When** I view the form,  
   **Then** I see two sections: "Basic Information" (left) and "Settings" (right) with all required fields.

3. **Given** I selected a resource type,  
   **When** I fill in required metadata fields (title, description, category, tags, difficulty level, duration),  
   **Then** the system validates all fields in real-time and shows clear error messages for invalid inputs.

4. **Given** I selected a file-based resource type (Article, Case Study, Constitution Template, Learning Path Template, Checklist, Video Tutorial, Webinar Recording, Podcast, Research Paper),  
   **When** I click "Choose File" and select a file,  
   **Then** the system validates file format and size, shows upload progress, and displays success/error message.

5. **Given** I am uploading a video/webinar resource,  
   **When** I don't want to upload a file,  
   **Then** I can provide External URL instead (YouTube, website, etc.) and system validates URL format.

6. **Given** I selected a text-based resource type (Best Practices, Articles with rich text option),  
   **When** I use the rich text editor,  
   **Then** I can format text (bold, italic, headings, lists, links) and the formatting is preserved.

7. **Given** I filled in all required fields and content,  
   **When** I click "Preview",  
   **Then** I see exactly how the resource will appear to families, including all metadata and formatted content.

8. **Given** I completed resource creation,  
   **When** I leave "Public Resource" toggle OFF and click "Save",  
   **Then** the resource is saved as private and only visible to me in My Resources section.

9. **Given** I completed resource creation,  
   **When** I turn "Public Resource" toggle ON and click "Publish",  
   **Then** the resource is saved and becomes visible in Knowledge Marketplace to all families.

10. **Given** I am creating a resource,  
    **When** I add tags (up to 10),  
    **Then** the system suggests existing tags as I type and allows me to create new tags.

11. **Given** I am creating a resource,  
    **When** I select difficulty level (Beginner/Intermediate/Advanced),  
    **Then** the difficulty badge appears on resource card in marketplace.

12. **Given** I am creating a resource,  
    **When** I enter Points Value,  
    **Then** the system validates it's a positive number and assigns points for resource completion tracking.

13. **Given** I uploaded a file that exceeds size limit (100MB) or has wrong format,  
    **When** the system validates the file,  
    **Then** I see a clear error message explaining the limit/format requirements and the upload is blocked.

14. **Given** I am creating a resource,  
    **When** I navigate away without saving,  
    **Then** the system shows a confirmation dialog warning about unsaved changes.

15. **Given** I am creating a resource,  
    **When** I view Author field in Settings section,  
    **Then** it is auto-filled with my name and non-editable.

**Additional Criteria:**
- [ ] All 10 resource types can be successfully created and saved
- [ ] Required metadata fields cannot be skipped (validation enforced)
- [ ] File upload shows progress indicator for large files
- [ ] Rich text editor supports basic formatting (bold, italic, headings, lists, links)
- [ ] Preview accurately reflects final resource appearance
- [ ] Tags are case-insensitive and duplicate tags are prevented
- [ ] Difficulty level badges are visually distinct (color-coded or icon-based)
- [ ] Public resources immediately appear in marketplace
- [ ] Private resources are isolated to creating advisor only
- [ ] System handles network errors gracefully during file upload
- [ ] Created resources appear in "My Resources" section with correct metadata
- [ ] Constitution Templates and Learning Path Templates are clearly distinguished from other resource types
- [ ] Resource type icons/labels help advisors quickly identify resource types in lists
- [ ] External URL validation checks for valid URL format (http/https)
- [ ] Duration field only accepts numeric values (minutes)
- [ ] Points Value field only accepts positive integers

---

## 🎨 Design & UX

**User Flow:**
1. Advisor navigates to Knowledge Center → My Resources
2. Clicks "Create Resource" button
3. Form appears with two-column layout:
   
   **Left Column - Basic Information:**
   - Title * (text input, 200 char max)
   - Description (textarea, 1000 char max)
   - Type (dropdown): Articles, Case Studies, Best Practices, Constitution Templates, Learning Path Templates, Checklists, Video Tutorials, Webinar Recordings, Podcasts, Research Papers
   - Category (dropdown): Governance, Succession Planning, Conflict Resolution, Philanthropy, Education, Communication, Wealth Management, Family Dynamics
   - Tags (tag input with autocomplete, max 10 tags)
   - Difficulty Level (radio buttons or dropdown): Beginner, Intermediate, Advanced
   
   **File Upload Section:**
   - "Choose File" button with drag-and-drop zone
   - File requirements displayed: "Max file size: 100MB. Supported formats: [format list based on Type]"
   - External URL field (text input) - for videos/webinars: "Link to external content (YouTube, website, etc.)"
   
   **Right Column - Settings:**
   - Author (auto-filled, read-only: "Elena Savelova")
   - Duration (minutes) (numeric input)
   - Points Value (numeric input, default: 5)
   - Public Resource (toggle switch: OFF = Private, ON = Published)

4. When Type changes, File Upload section updates supported formats:
   - **Articles, Case Studies, Research Papers**: PDF only
   - **Constitution Templates, Learning Path Templates, Checklists**: PDF or DOCX
   - **Video Tutorials, Webinar Recordings**: MP4, AVI, MOV, WMV, FLV, WEBM (or External URL)
   - **Podcasts**: MP3, WAV, AAC

5. Advisor fills in all fields and adds content (file upload OR external URL OR rich text)
6. System validates in real-time, shows errors inline
7. Advisor adds tags - system shows autocomplete suggestions from existing tags
8. Advisor selects difficulty level - preview shows how badge will appear
9. Advisor clicks "Preview" → sees resource as families would see it (new tab or modal)
10. Advisor toggles "Public Resource" ON/OFF
11. Advisor clicks "Save" (if Private) or "Publish" (if Public)
12. System shows success message and redirects to resource detail page
13. Resource appears in "My Resources" list with resource type icon/badge, difficulty badge, and visibility indicator

---

## 🔒 Business Rules

**Validation Rules:**
1. **Title**: Required, 1-200 characters, must be unique within advisor's resources
2. **Description**: Required, 1-1000 characters
3. **Type**: Required, must be one of 10 resource types
4. **Category**: Required, must be one of predefined categories (Governance, Succession Planning, Conflict Resolution, Philanthropy, Education, Communication, Wealth Management, Family Dynamics)
5. **Tags**: Optional, max 10 tags per resource, each tag 1-30 characters, case-insensitive, alphanumeric + spaces + hyphens only
6. **Difficulty Level**: Required, must be one of: Beginner, Intermediate, Advanced
7. **Duration (minutes)**: 
   - Required for: Articles, Video Tutorials, Webinar Recordings, Podcasts
   - Optional for: Case Studies, Best Practices, Constitution Templates, Learning Path Templates, Checklists, Research Papers
   - Must be positive integer (1-999 minutes)
8. **Points Value**: Required, must be positive integer (1-100), default value: 5
9. **Author**: Auto-filled with logged-in advisor's name, read-only
10. **Public Resource**: Required (toggle), default: OFF (Private)
11. **File Upload OR External URL**: One of them required (cannot have both empty)
    - If External URL provided, must be valid URL format (http:// or https://)
    - If file uploaded, must pass format and size validation
12. **File Format Validation**:
    - Articles, Case Studies, Research Papers: PDF only
    - Constitution Templates, Learning Path Templates, Checklists: PDF or DOCX
    - Video Tutorials, Webinar Recordings: MP4, AVI, MOV, WMV, FLV, WEBM
    - Podcasts: MP3, WAV, AAC
13. **File Size Limit**: Max 100MB for all file types

**Authorization:**
- **Who can perform this action:** External Advisors only (advisor role required)
- **Who can view results:** 
  - Private resources (Public Resource = OFF): Only creating advisor
  - Public resources (Public Resource = ON): All families in marketplace, creating advisor in "My Resources"

**Edge Cases:**
- **Draft functionality**: If advisor navigates away without saving, show confirmation dialog; Consider auto-save draft feature for future story
- **Wrong file format**: Block upload, show error: "Invalid file format. Accepted formats: [list]"
- **File size exceeded**: Block upload, show error: "File size exceeds limit of 100MB. Please reduce file size."
- **Duplicate title**: Show error: "You already have a resource with this title. Please choose a different title."
- **Network error during upload**: Show retry option, allow resume upload if possible
- **Empty required fields on submit**: Highlight all empty required fields in red, show validation summary at top
- **Template-specific validation**: Constitution Templates and Learning Path Templates should have clear indicators they are templates (e.g., template badge/icon)
- **Both file and URL provided**: Accept file, ignore URL (or show warning: "Please provide either file or URL, not both")
- **Invalid URL format**: Show error: "Please enter a valid URL starting with http:// or https://"
- **Duration not a number**: Show error: "Duration must be a number in minutes"
- **Points Value not a number or negative**: Show error: "Points Value must be a positive number between 1-100"
- **Tags exceed max limit**: Prevent adding 11th tag, show message: "Maximum 10 tags allowed"

---

## 🧪 Test Scenarios

**Happy Path:**
1. Login as External Advisor
2. Navigate to Knowledge Center → My Resources
3. Click "Create Resource"
4. Select Type: "Constitution Templates"
5. Fill in title: "Basic Family Constitution Framework"
6. Fill in description: "Comprehensive template for creating a family constitution, including governance structure, values, and decision-making processes"
7. Select category: "Governance"
8. Add tags: "constitution", "template", "governance", "framework" (autocomplete suggestions appear)
9. Select difficulty: "Intermediate"
10. Verify Author auto-filled: "Elena Savelova" (read-only)
11. Enter duration: "60" minutes
12. Enter Points Value: "10"
13. Click "Choose File", upload DOCX file (8MB, valid format) → upload progress bar appears → success indicator
14. Turn "Public Resource" toggle ON
15. Click "Preview" → new tab/modal opens showing resource as families would see it with template badge, difficulty badge
16. Click "Publish"
17. **Expected result**: Success message appears, resource appears in "My Resources" and Knowledge Marketplace with "Template" badge, difficulty badge "Intermediate", duration "60 min", points "10", metadata is correctly saved

**Happy Path - External URL:**
1. Login as External Advisor
2. Navigate to Knowledge Center → My Resources
3. Click "Create Resource"
4. Select Type: "Video Tutorials"
5. Fill in title: "Introduction to Family Governance"
6. Fill in description: "Comprehensive video introduction covering key concepts and best practices in family governance"
7. Select category: "Governance"
8. Add tags: "governance", "video", "introduction"
9. Select difficulty: "Beginner"
10. Enter duration: "45" minutes
11. Enter Points Value: "5"
12. Enter External URL: "https://www.youtube.com/watch?v=example123"
13. Leave "Public Resource" toggle OFF (Private)
14. Click "Preview"
15. Click "Save"
16. **Expected result**: Success message, resource saved as Private with YouTube link, appears only in advisor's "My Resources"

**Negative Tests:**
1. **Invalid file format scenario**:
   - Select Type: "Video Tutorials"
   - Attempt to upload PDF file
   - **Expected**: Error message "Invalid file format. Accepted formats: MP4, AVI, MOV, WMV, FLV, WEBM"

2. **File size exceeded scenario**:
   - Select Type: "Webinar Recordings"
   - Attempt to upload 150MB MP4
   - **Expected**: Error message "File size exceeds limit of 100MB. Please reduce file size."

3. **Missing required fields scenario**:
   - Select Type: "Podcast"
   - Fill in only title, leave description, category, difficulty, and duration empty
   - Click "Publish"
   - **Expected**: Description, Category, Difficulty Level, and Duration fields highlighted in red, validation summary shows "Please fill in all required fields"

4. **Invalid duration scenario**:
   - Select Type: "Article"
   - Enter duration: "abc" (non-numeric)
   - Click "Save"
   - **Expected**: Duration field shows error "Duration must be a number in minutes"

5. **Invalid Points Value scenario**:
   - Enter Points Value: "-5" (negative)
   - Click "Save"
   - **Expected**: Points Value field shows error "Points Value must be a positive number between 1-100"

6. **Invalid URL scenario**:
   - Select Type: "Video Tutorials"
   - Enter External URL: "not-a-valid-url"
   - Click "Save"
   - **Expected**: External URL field shows error "Please enter a valid URL starting with http:// or https://"

7. **Duplicate title scenario**:
   - Create resource with title "Family Governance Guide"
   - Attempt to create another resource with same title
   - **Expected**: Error message "You already have a resource with this title. Please choose a different title."

8. **Unauthorized access scenario**:
   - Attempt to access resource creation as Family Member (non-advisor)
   - **Expected**: Access denied, redirect to home page or show error message

**Edge Cases:**
1. **Navigate away without saving**:
   - Start filling in resource form for "Learning Path Template"
   - Click browser back button or navigate to different page
   - **Expected**: Confirmation dialog "You have unsaved changes. Are you sure you want to leave?"

2. **Network error during upload**:
   - Start uploading large video file (90MB) for "Webinar Recording"
   - Simulate network disconnection mid-upload
   - **Expected**: Error message "Upload failed due to network error. Please check your connection and try again." with "Retry" button

3. **Maximum tags scenario**:
   - Add 10 tags successfully to "Best Practices" resource
   - Attempt to add 11th tag
   - **Expected**: Tag input disabled or shows message "Maximum 10 tags allowed"

4. **Template resource type selection**:
   - Select Type: "Constitution Templates"
   - **Expected**: Form clearly indicates this is a template resource with appropriate icon/badge, description field includes hint "Describe how to use this template"

5. **Optional duration field**:
   - Select Type: "Checklist" (duration optional)
   - Leave duration empty
   - Fill all other required fields
   - Click "Publish"
   - **Expected**: Resource successfully published without duration

6. **Both file and URL provided**:
   - Upload a PDF file
   - Also enter External URL
   - Click "Save"
   - **Expected**: System accepts file, ignores URL (or shows warning: "Please provide either file or URL, not both")

7. **Author field immutability**:
   - Attempt to edit Author field
   - **Expected**: Field is read-only, cannot be edited

8. **Tag autocomplete**:
   - Start typing "gov" in tags field
   - **Expected**: System shows autocomplete suggestions with existing tags starting with "gov" (e.g., "governance", "government")

9. **Default Points Value**:
   - Create new resource without entering Points Value
   - **Expected**: Points Value defaults to "5"

10. **Resource type change during creation**:
    - Select Type: "Video Tutorials"
    - Upload MP4 file
    - Change Type to: "Articles"
    - **Expected**: File upload section updates to show PDF format requirement, previously uploaded MP4 is cleared with confirmation

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Page load time: < 2 seconds
- File upload progress indicator updates every 500ms
- Real-time validation response: < 100ms
- Tag autocomplete suggestions appear within 200ms of typing
- Preview generation: < 1 second for text-based, < 3 seconds for file-based resources
- Form auto-save draft every 30 seconds (if implemented)

**Security:**
- Authorization required: Yes (External Advisor role only)
- File upload validation: Server-side validation of file type and size (client-side validation is not sufficient)
- External URL validation: Server-side validation of URL format and optionally check URL accessibility
- XSS protection: Rich text editor must sanitize HTML input
- Private resources: Strict isolation, only creating advisor can access
- File storage: Secure file storage with access control (S3 with signed URLs or similar)

**Accessibility:**
- WCAG level: AA
- Keyboard navigation: Required for all form fields, buttons, toggles
- Screen reader support: Required for form labels, error messages, upload status, resource type descriptions, toggle states
- Focus indicators: Visible focus states for all interactive elements
- Color contrast: Error messages and validation indicators must meet WCAG AA contrast ratios
- Form labels: All inputs must have associated labels (explicit or aria-label)

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Edge: Latest 2 versions

---

## 📝 Notes

**Open Questions:**
- [x] **Q: Should we support auto-save draft functionality?**
  - **A**: Not in this story. Create separate story for draft auto-save feature. For now, show confirmation dialog on navigate away with unsaved changes.

- [x] **Q: What happens if advisor tries to publish resource with same title as existing published resource from another advisor?**
  - **A**: Allow it. Title uniqueness is only within advisor's own resources, not global. Different advisors can have resources with same title.

- [x] **Q: Should rich text editor support image embedding?**
  - **A**: Not in this story. Rich text editor supports basic formatting only (bold, italic, headings, lists, links). Image embedding can be separate story.

- [x] **Q: Can advisor edit resource after publishing?**
  - **A**: Yes, but this is separate story. This story focuses on creation only. Edit functionality will be in separate story with version history tracking.

- [x] **Q: Should we show upload progress percentage?**
  - **A**: Yes, show percentage (0-100%) for files > 5MB. For smaller files, simple spinner is sufficient.

- [x] **Q: What happens if advisor uploads file with virus or malware?**
  - **A**: Not in scope for this story. Virus scanning should be separate infrastructure story. For now, assume file upload service handles basic security.

- [x] **Q: How do we distinguish Constitution Templates and Learning Path Templates from regular articles/documents?**
  - **A**: Both in UI (template badge/icon on resource cards) and metadata (resource_type field clearly indicates template). Templates should have visual indicators that they are meant to be used/adapted by families.

- [x] **Q: Should Learning Path Templates have special fields or structure?**
  - **A**: Not in this story. This story treats them as file upload resources (DOCX/PDF). Future story can add structured learning path builder with steps, milestones, etc.

- [x] **Q: What is Points Value used for?**
  - **A**: Points Value represents learning points families earn by completing/engaging with this resource. Used for gamification and tracking family engagement with educational content. Default is 5 points, advisor can adjust based on resource depth/complexity.

- [x] **Q: Can advisor provide both file upload AND external URL for same resource?**
  - **A**: No, it's either/or. If both provided, system should accept file and ignore URL (or show warning). External URL is primarily for videos/webinars hosted externally (YouTube, Vimeo, etc.).

- [x] **Q: Should External URL field validate if link is accessible/working?**
  - **A**: Not in this story. Just validate URL format (http/https). Link accessibility check can be separate story for link health monitoring.

- [x] **Q: What happens to uploaded file if advisor changes resource Type during creation?**
  - **A**: Clear the uploaded file and show confirmation message: "Changing resource type will clear your uploaded file. Continue?" This prevents format mismatches.

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-22