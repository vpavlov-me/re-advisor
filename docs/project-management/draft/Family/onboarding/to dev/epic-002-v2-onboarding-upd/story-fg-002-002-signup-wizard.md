## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a new user, I want to complete registration in clear progressive steps
**Epic Link:** FG-EPIC-002-V2-onboarding-upd [Onboarding Flow v2.0 - Registration Restructure & Enhanced Setup Wizard]
**Priority:** Critical
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** new user registering for the Family Governance Platform,
**I want to** complete registration in 3 clear progressive steps (Personal Info → Account Setup → Family Details),
**so that** I don't feel overwhelmed and can provide information in logical chunks.

**Example:**
- **As a** new user,
- **I want to** complete Step 1 (name and birthdate) before moving to Step 2 (email and password),
- **so that** the registration process feels manageable and I can navigate back if needed to correct information.

---

## 🎯 Business Context

**Why is this Story important?**

The single-form registration in v1 was causing abandonment due to information overload:
- **User pain point:** All-at-once registration form overwhelmed users with too many fields
- **Business outcome:** Reduced abandonment rates and increased registration completion (target 85%)
- **Strategic alignment:** Progressive disclosure pattern reduces cognitive load and improves UX

Research shows multi-step forms with clear progress indicators increase completion rates by 20-30%.

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** I click "Sign Up" from the login screen,
   **When** the sign-up page loads,
   **Then** I see Step 1 of 3: Personal Information form with First Name, Last Name, and Birthdate fields.

2. **Given** I am on Step 1,
   **When** I fill all required fields and click "Continue",
   **Then** I advance to Step 2: Account Setup with Email and Password fields.

3. **Given** I am on Step 2,
   **When** I fill valid email and password (8+ chars, 1 uppercase, 1 letter, 1 number) and click "Continue",
   **Then** I advance to Step 3: Family Details.

4. **Given** I am on Step 3,
   **When** I enter Family Name and select at least one role checkbox and click "Complete Sign-Up",
   **Then** my account is created and I'm redirected to email verification screen.

5. **Given** I am on Step 2 or Step 3,
   **When** I click "Back" button,
   **Then** I return to previous step with my previously entered data preserved.

6. **Given** I submit any step with invalid data,
   **When** validation fails,
   **Then** I see specific error messages next to invalid fields without losing other entered data.

**Additional Criteria:**
- [ ] Progress indicator shows current step (1/3, 2/3, 3/3)
- [ ] OAuth options (Google, Apple, LinkedIn) available on Step 2
- [ ] Password strength indicator displays real-time validation
- [ ] All fields have proper labels, placeholders, and validation messages
- [ ] Form data persists if user navigates away and returns (browser session)
- [ ] Mobile responsive layout maintains usability

---

## 🔒 Business Rules

**Validation Rules:**
1. **Step 1 - Personal Info:**
   - First Name: Required, 2-50 characters, letters and spaces only
   - Last Name: Required, 2-50 characters, letters and spaces only
   - Birthdate: Required, must be 18+ years old, valid date format

2. **Step 2 - Account Setup:**
   - Email: Required, valid email format, unique (not already registered)
   - Password: Required, minimum 8 characters, at least 1 uppercase letter, 1 letter, 1 number
   - OAuth: Alternative to email/password, auto-fills Step 2

3. **Step 3 - Family Details:**
   - Family Name: Required, 2-100 characters
   - Role Selection: At least 1 role checkbox must be selected (Admin, Council Member, Family Member)

**Authorization:**
- **Who can perform this action:** Any visitor (no authentication required)
- **Who can view results:** User themselves after successful registration

**Edge Cases:**
- **Email already registered:** Show error on Step 2 with "Login instead" link
- **OAuth partial failure:** Fallback to manual email/password entry
- **Session timeout:** Save form data to browser localStorage for 24 hours
- **Browser back button:** Treat as "Back" navigation, preserve data
- **Multiple role selection:** Allow multiple roles (e.g., Admin + Council Member)

---

## 📐 Design & UX

**Mockups/Wireframes:**
- Figma: https://www.figma.com/design/NWeSLJWw6iPinNILwPbsfv/-ReFamily--Web-Platofrm?node-id=3690-114247&t=UgPYb2pfH4R5d3VR-1

**User Flow:**
1. User on login screen clicks "Sign Up" link
2. **Step 1/3:** User enters First Name, Last Name, Birthdate → clicks "Continue"
3. **Step 2/3:** User enters Email, Password (or selects OAuth) → clicks "Continue"
4. **Step 3/3:** User enters Family Name, selects Role(s) → clicks "Complete Sign-Up"
5. System creates account → redirects to email verification screen

**Design Specifications:**
- **Progress Indicator:** Step numbers with connecting lines, current step highlighted
- **Step 1 Fields:** 3 fields (First Name, Last Name, Birthdate with date picker)
- **Step 2 Fields:** Email, Password with show/hide toggle, OAuth buttons
- **Step 3 Fields:** Family Name text input, Role checkboxes (3 options)
- **Navigation:** "Back" button (except Step 1), "Continue" / "Complete Sign-Up" primary button
- **Password Strength:** Real-time indicator (Weak / Medium / Strong)

---

## 🧪 Test Scenarios

**Happy Path:**
1. Navigate to sign-up → complete Step 1 with valid data → advance to Step 2
2. Complete Step 2 with valid email/password → advance to Step 3
3. Complete Step 3 with family name and role → successfully create account
4. Verify redirect to email verification screen

**Negative Tests:**
1. **Step 1 - Invalid birthdate (under 18):** Show error "Must be 18 or older"
2. **Step 2 - Weak password (6 chars):** Show error "Minimum 8 characters required"
3. **Step 2 - Email already registered:** Show error "Email already in use. Login instead?"
4. **Step 3 - No role selected:** Show error "Please select at least one role"
5. **Back navigation from Step 3 to Step 1:** Verify all data preserved

**Edge Cases:**
1. **OAuth Google login:** Verify Steps 1-2 auto-filled, only Step 3 required
2. **Browser back button on Step 2:** Verify returns to Step 1 with data intact
3. **Session timeout after 30 minutes:** Verify data recovered from localStorage
4. **Submit Step 3 with network error:** Show error, allow retry without data loss
5. **Mobile landscape orientation:** Verify form layout remains usable

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** FG-002-001 (Educational carousel - shares login/sign-up screen layout)
- **Blocks:** FG-002-003 (Email verification - receives redirect after registration)

**Technical Dependencies:**
- Backend API endpoints: `POST /auth/signup/step-1`, `/auth/signup/step-2`, `/auth/signup/step-3`
- OAuth providers: Google, Apple, LinkedIn SDKs
- Form validation library (e.g., React Hook Form, Formik)
- Date picker component
- Password strength calculator library

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Step navigation: < 300ms transition time
- Form validation: Real-time (< 100ms debounced)
- OAuth redirect: < 2 seconds round-trip

**Security:**
- Password hashed with bcrypt (backend)
- HTTPS required for all form submissions
- CSRF token validation on backend
- Rate limiting: Max 5 registration attempts per IP per hour
- PII handling: First Name, Last Name, Birthdate, Email encrypted at rest

**Browser Support:**
- Chrome: 90+
- Safari: 14+
- Firefox: 88+
- Edge: 90+
- Mobile Safari (iOS 14+)
- Mobile Chrome (Android 10+)

**Accessibility:**
- WCAG 2.1 Level AA compliance
- Form labels associated with inputs (for screen readers)
- Error messages announced to screen readers
- Keyboard navigation: Tab order follows visual flow

**Other:**
- Form data persisted in browser localStorage (24-hour expiration)
- Analytics tracking: step completion rates, abandonment points
- Error logging: Failed validations, API errors sent to monitoring service

---

## 📝 Notes

**Technical Implementation:**
- Consider using React Hook Form with Zod schema validation
- Store intermediate form data in React Context or Redux state
- Use browser localStorage as backup for session recovery
- Implement optimistic UI updates with error rollback

**Migration Considerations:**
- Existing v1 single-form registrations should continue to work (backward compatibility)
- Feature flag to gradually roll out 3-step wizard (A/B testing)
- Analytics comparison: v1 single-form vs. v2 3-step completion rates

**Open Questions:**
- Should we allow "Skip" on Step 3 (Family Details) for individual users?
- Do we need email verification BEFORE allowing Step 3, or after full registration?
- Should OAuth users still see all 3 steps, or skip directly to Step 3?

**Assumptions:**
- Users prefer progressive disclosure over all-at-once forms
- Back navigation is critical for user confidence
- 18+ age requirement is legally necessary for platform usage

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-30
