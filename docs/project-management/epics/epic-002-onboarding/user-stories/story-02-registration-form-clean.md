STORY 2: Registration Form with Email/Password

**Issue Type:** Story
**Project:** RLN1
**Summary:** As a new user, I want to register with email and password, so that I can create an account quickly
**Epic Link:** SAAS-EPIC-001
**Priority:** Critical
**Story Points:** 3
**Sprint:** TBD

### ðŸ"– User Story

**As a** new user (potential Family Administrator),
**I want to** fill out a simple registration form with email and password,
**so that** I can create an account and start using the platform.

### ðŸŽ¯ Business Context

Provides fallback registration method for users who prefer not to use OAuth or have privacy concerns. Essential for users without Google/Apple/LinkedIn accounts.

### âœ… Acceptance Criteria

1. **Given** I am on the registration page,
   **When** I view the registration form,
   **Then** I see fields: Email, Password, Confirm Password, and "Sign Up" button.

2. **Given** I enter valid email and matching passwords (min 8 characters),
   **When** I click "Sign Up",
   **Then** my account is created, and I am redirected to the dashboard.

3. **Given** I enter invalid email or mismatched passwords,
   **When** I click "Sign Up",
   **Then** I see inline validation errors explaining what to fix.

4. **Given** I enter an email that already exists,
   **When** I submit the form,
   **Then** I see error: "Email already registered. Please log in."

**Additional Criteria:**
- [ ] Password field shows strength indicator (weak/medium/strong)
- [ ] "Show/Hide Password" toggle button on password fields
- [ ] Terms of Service and Privacy Policy checkboxes (required)
- [ ] Success: JWT token generated and stored in localStorage

### ðŸ" Design & UX

**Mockups/Wireframes:**
- Figma: https://www.figma.com/design/NWeSLJWw6iPinNILwPbsfv/-ReFamily--Web-Platofrm?node-id=3690-114248

**User Flow:**
1. User fills email field
2. User enters password (sees strength indicator)
3. User confirms password
4. User checks Terms/Privacy checkboxes
5. User clicks "Sign Up"
6. System validates, creates account, redirects to dashboard

### ðŸ"' Business Rules

**Validation Rules:**
1. **Email:** Valid email format, unique in database
2. **Password:** Min 8 characters, at least 1 uppercase, 1 lowercase, 1 number
3. **Password Match:** Password and Confirm Password must match
4. **Terms Acceptance:** Both checkboxes must be checked

**Authorization:**
- **Who can register:** Public (unauthenticated users)

**Edge Cases:**
- **User tries OAuth after email registration:** Accounts should link if same email
- **User registers but doesn't verify email:** Account created but email_verified = FALSE 

### ðŸ§ª Test Scenarios

**Happy Path:**
1. Enter valid email → Enter strong password (12+ chars, mixed case, numbers) → Confirm password matches → Check Terms/Privacy → Click Sign Up → Account created, redirected to dashboard

**Negative Tests:**
1. **Invalid email:** Enter "notanemail" → See error "Invalid email format"
2. **Weak password:** Enter "123456" → See error "Password must be at least 8 characters"
3. **Mismatched passwords:** Password "Test1234", Confirm "Test5678" → See error "Passwords do not match"
4. **Duplicate email:** Register with existing email → See error "Email already registered"

**Edge Cases:**
1. **Submit without Terms acceptance:** Form blocked, error shown
2. **Password with special characters:** Should accept (no restrictions on special chars)

### ðŸ"— Dependencies

**Story Dependencies:**
- **Blocked by:** RLN1-001 (Carousel must be implemented first)
- **Blocks:** RLN1-009 (Backend user creation API)

### âš ï¸ Non-Functional Requirements

**Performance:**
- Form validation: Real-time (on blur), < 50ms
- Registration API response: < 500ms

**Security:**
- Passwords hashed with bcrypt (cost factor 12)
- HTTPS required for registration endpoint
- No PII stored in localStorage (only JWT token)

**Accessibility:**
- WCAG level: AA
- Keyboard navigation: Tab through fields
- Screen reader: Announce field labels and validation errors
- ARIA labels on all form fields

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions

---
