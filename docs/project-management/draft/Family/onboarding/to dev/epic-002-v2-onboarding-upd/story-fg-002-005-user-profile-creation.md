## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Family Administrator, I want to create my complete user profile first
**Epic Link:** FG-EPIC-002-V2-onboarding-upd [Onboarding Flow v2.0 - Registration Restructure & Enhanced Setup Wizard]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Family Administrator starting onboarding,
**I want to** create my complete user profile (avatar, bio, contact info) as Step 1,
**so that** I can present myself properly to family members I invite in later steps.

**Example:**
- **As a** Family Administrator,
- **I want to** upload my profile photo and add biographical information in Step 1 of onboarding,
- **so that** when I invite family members, they see my complete profile and recognize me as the administrator.

---

## 🎯 Business Context

**Why is this Story important?**

Moving user profile creation to Step 1 (before family invitations) addresses critical UX issues:
- **User pain point:** In v1, administrators invited family without complete profiles, reducing trust and invitation acceptance rates
- **Business outcome:** Increased invitation acceptance rates (target 80%) and improved family engagement
- **Strategic alignment:** Complete profiles establish credibility and encourage family participation

Research shows: Complete profiles with photos increase invitation acceptance rates by 35%.

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** I complete payment setup or skip as admin,
   **When** I'm redirected to onboarding,
   **Then** I see Step 1: "Create User Profile" wizard screen with progress indicator showing 13%.

2. **Given** I'm on Step 1 (User Profile),
   **When** the screen loads,
   **Then** I see avatar upload area with placeholder initials, bio text area, pre-filled email (read-only), and phone number input.

3. **Given** I upload a profile photo,
   **When** I select a valid image file (JPG/PNG, < 5MB),
   **Then** the image uploads successfully and displays in avatar area replacing placeholder initials.

4. **Given** I enter bio text,
   **When** I type into the bio field,
   **Then** I see real-time character counter (0/500 characters) below the text area.

5. **Given** I enter phone number,
   **When** I input valid phone format (e.g., +1-555-123-4567),
   **Then** the field validates format and shows green checkmark.

6. **Given** I complete all optional fields or leave them blank,
   **When** I click "Continue" button,
   **Then** my profile is saved and I advance to Step 2 (Invite Family Members).

**Additional Criteria:**
- [ ] Avatar placeholder shows user's first and last name initials before upload
- [ ] Avatar upload supports drag-and-drop and file picker
- [ ] Bio supports multiline text with line breaks preserved
- [ ] Email field pre-filled from registration and disabled (read-only)
- [ ] Phone number optional (can proceed without entering)
- [ ] "Back" button disabled on Step 1 (first step of onboarding)
- [ ] Progress bar shows 13% completion after finishing Step 1

---

## 🔒 Business Rules

**Validation Rules:**
1. **Avatar Upload:**
   - Accepted formats: JPG, PNG, JPEG
   - Maximum file size: 5 MB
   - Minimum resolution: 200x200 pixels
   - Image automatically cropped to square aspect ratio
   - If no avatar uploaded, placeholder displays initials (First Name [0] + Last Name [0])

2. **Bio Field:**
   - Optional field (can be left blank)
   - Maximum 500 characters
   - Multiline support (line breaks allowed)
   - No HTML/markdown formatting (plain text only)

3. **Email Field:**
   - Pre-filled from registration
   - Read-only (cannot be edited on profile screen)
   - Displayed for user reference only

4. **Phone Number:**
   - Optional field (can be left blank)
   - Format validation: International format (+[country code]-[number])
   - Accepts: +1-555-123-4567, +44-20-1234-5678, etc.
   - Stored in standardized E.164 format

**Authorization:**
- **Who can perform this action:** All users starting onboarding (Admin, Council Member, Family Member)
- **Who can view results:** User themselves + their family members (in family directory)

**Edge Cases:**
- **Avatar upload fails (network error):** Show error message, allow retry without losing other profile data
- **Bio exceeds 500 characters:** Disable "Continue" button, show error "Bio too long (max 500 characters)"
- **Invalid phone format:** Show inline error "Invalid phone format. Use +[country]-[number]"
- **User clicks "Continue" without filling any optional fields:** Allowed, proceed to Step 2 with basic profile (name + email only)
- **Very large image (10 MB):** Show error before upload "File too large. Maximum 5 MB"

---

## 📐 Design & UX

**Mockups/Wireframes:**
- Figma: https://www.figma.com/design/NWeSLJWw6iPinNILwPbsfv/-ReFamily--Web-Platofrm?node-id=3709-77221&t=UgPYb2pfH4R5d3VR-4
- Onboarding Step 01: Create User Profile

**User Flow:**
1. User completes payment setup → auto-redirected to Onboarding Step 1
2. **Step 1 Screen:**
   - Wizard modal overlay with "Step 1: Create User Profile" header
   - Progress bar: 13% filled
   - Avatar upload area (center) with placeholder initials
   - "Upload Photo" button + drag-and-drop hint text
   - Bio text area (multiline, 500 char max)
   - Email input (pre-filled, read-only, grayed out)
   - Phone number input (optional, with country code dropdown)
   - "Continue" primary button (always enabled, optional fields)
3. User uploads avatar → preview displays
4. User enters bio and phone → sees character counter and format validation
5. User clicks "Continue" → profile saved → redirects to Step 2

**Design Specifications:**
- **Avatar Placeholder:** Circular, 120px diameter, gray background, white initials (32px font)
- **Avatar Upload:** Hover state shows "Change photo" text overlay
- **Bio Text Area:** 4 rows visible, auto-expands up to 8 rows
- **Character Counter:** Gray text, turns red when exceeding 500 characters
- **Email Field:** Grayed out with lock icon to indicate read-only
- **Phone Input:** Country code dropdown (flag icons) + number input field
- **Progress Bar:** Linear bar at top, 13% filled blue, remaining gray

---

## 🧪 Test Scenarios

**Happy Path:**
1. Complete payment setup → verify redirect to Step 1 (User Profile)
2. Verify avatar placeholder shows initials (e.g., "JD" for John Doe)
3. Upload valid profile photo (2 MB JPG) → verify image displays in avatar area
4. Enter bio text (200 characters) → verify character counter shows "200/500"
5. Enter phone number (+1-555-123-4567) → verify green checkmark validation
6. Click "Continue" → verify redirect to Step 2 and progress bar shows 13%

**Negative Tests:**
1. **Upload oversized image (8 MB):** Verify error "File too large. Maximum 5 MB"
2. **Upload invalid file type (PDF):** Verify error "Invalid file type. Use JPG or PNG"
3. **Enter 600 characters in bio:** Verify error message and "Continue" button disabled
4. **Enter invalid phone (+123):** Verify inline error "Invalid phone format"
5. **Network error during avatar upload:** Verify retry button appears, other fields intact

**Edge Cases:**
1. **No avatar uploaded:** Verify placeholder initials remain, can proceed to Step 2
2. **Bio left blank:** Verify can proceed to Step 2 (optional field)
3. **Phone left blank:** Verify can proceed to Step 2 (optional field)
4. **Drag-and-drop image onto avatar area:** Verify upload works via drag-and-drop
5. **Mobile device (iOS):** Verify avatar upload opens native photo picker with camera option
6. **User clicks browser back button:** Verify warning "Unsaved changes will be lost"

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** FG-002-004 (Payment setup - must complete payment before onboarding)
- **Blocks:** FG-002-006 (Family invitations - Step 2 shows user profile in context)

**Technical Dependencies:**
- Image upload service (S3, Cloudinary, or similar)
- Image processing library (cropping, resizing, format conversion)
- Phone number validation library (libphonenumber)
- Backend API: `POST /onboarding/profile`, `PUT /onboarding/profile/:user_id`, `GET /onboarding/profile/:user_id`
- Database table: `user_profiles` (user_id, avatar_url, bio, phone_number, created_at, updated_at)

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Avatar upload: < 5 seconds for 5 MB image
- Image processing (crop, resize): < 2 seconds
- Profile save: < 1 second
- Page load time: < 2 seconds

**Security:**
- Avatar images stored in secure CDN with access controls
- Image upload validates file type (prevent SVG/JS injection)
- Phone number stored encrypted at rest
- PII handling: Bio, phone number encrypted, GDPR compliant

**Browser Support:**
- Chrome: 90+
- Safari: 14+ (iOS 14+ for mobile camera upload)
- Firefox: 88+
- Edge: 90+
- Native mobile photo pickers supported

**Accessibility:**
- WCAG 2.1 Level AA compliance
- Avatar upload button keyboard accessible
- Screen reader announces file upload success/errors
- Form labels associated with inputs
- Phone input supports autocomplete="tel"

**Other:**
- Avatar images optimized: WebP format, 300x300px, < 100 KB
- Image CDN with caching (reduce load times on family directory)
- Analytics tracking: Profile completion rate, avatar upload rate, bio fill rate
- Logging: All profile creation attempts logged for audit

---

## 📝 Notes

**Technical Implementation:**
- Use multipart/form-data for avatar upload
- Process images asynchronously (upload → S3 → resize → generate WebP → save URL)
- Store avatar_url in database, not binary image data
- Use libphonenumber for phone validation and E.164 formatting
- Implement optimistic UI updates (show avatar immediately, save in background)

**Avatar Placeholder Logic:**
```javascript
function generateInitials(firstName, lastName) {
  return `${firstName[0]}${lastName[0]}`.toUpperCase();
}
// Example: "John Doe" → "JD"
```

**Phone Number Validation:**
- Use libphonenumber for international format validation
- Store in E.164 format: +[country code][number] (e.g., +15551234567)
- Display in formatted form: +1-555-123-4567

**Migration Considerations:**
- Existing v1 users without profiles: Prompt profile creation on next login
- v1 users with partial profiles (name only): Show Step 1 with pre-filled name, allow completion
- Feature flag: Gradually roll out Step 1 (User Profile) as first onboarding step

**Open Questions:**
- Should we allow users to skip Step 1 entirely (create profile later)?
- Do we need additional profile fields (job title, location, date of birth)?
- Should bio support rich text formatting (bold, italics, links)?
- Do we need profile visibility controls (public/private to family)?

**Assumptions:**
- Users want to create complete profiles before inviting family
- Avatar uploads improve trust and invitation acceptance
- Phone number is optional (not required for platform functionality)
- 500 characters sufficient for bio (average bio: 150-200 characters)

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-30
