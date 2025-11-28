---
story_id: "STORY-FG-002"
title: "Email Registration with Subscription"
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
labels: ["advisor", "registration", "email", "subscription", "verification"]
dependencies: ["STORY-FG-001"]
---

# User Story FG-002: Email Registration with Subscription

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As an External Advisor, I want to register using email/password with subscription selection
**Epic Link:** EPIC-003 (Basic Advisor Registration & Profile)
**Priority:** High
**Story Points:** 5
**Sprint:** Sprint 45  

---

## 📖 User Story

**As an** External Advisor working in a corporate or institutional environment,  
**I want to** register using my professional email and password with subscription selection on the registration form,  
**So that** I can create an account without connecting social media profiles while subscribing to marketplace access.

**Example Scenario:**
- **As a** Senior Family Mediator at an advisory firm,
- **I want to** register using my company email domain and create my own password,
- **So that** I comply with my firm's policy against social logins and maintain full control over my credentials.

---

## 🎯 Business Context

**Why is this Story important?**

Email registration remains critical despite OAuth alternatives:

- **Corporate Compliance:** 60% of advisory firms prohibit social login usage for business accounts
- **Regional Preferences:** EU advisors prefer email due to GDPR and data sovereignty concerns (40% market)
- **Professional Boundaries:** Advisors want separation between personal social accounts and client work
- **Universal Access:** Works regardless of social media presence or company restrictions
- **B2B Trust:** Professional email domains (@firmname.com) build more credibility than personal Gmail

**Market Reality:**
- 35-40% of B2B professionals prefer email registration over OAuth
- Financial services firms commonly restrict OAuth usage
- Enterprise clients expect email-based authentication

---

## ✅ Acceptance Criteria

### Registration Form

1. **Given** I am on the advisor registration page,  
   **When** I choose email registration option,  
   **Then** I see form with fields:
   - Email address (required)
   - Password (required, with show/hide toggle)
   - Password strength indicator
   - "Register" button

2. **Given** I enter email and password,  
   **When** I submit the form,  
   **Then** system validates:
   - **Email format:** Valid RFC 5322 format
   - **Email uniqueness:** Does not exist in system
   - **Password strength:** Meets requirements (min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char)
   - If valid: Creates unverified account and sends verification email
   - If invalid: Shows inline error messages

3. **Given** I see password strength indicator,  
   **When** I type password,  
   **Then** indicator updates in real-time:
   - Weak (red): < 6 characters or no complexity
   - Fair (yellow): 6-7 characters with some complexity
   - Good (light green): 8+ characters with mixed case and numbers
   - Strong (dark green): 10+ characters with all requirements + special chars

### Email Verification

4. **Given** I submitted valid registration form,  
   **When** account is created,  
   **Then** system:
   - Creates advisor account with status: 'unverified'
   - Generates verification token (cryptographically secure, 24-hour expiry)
   - Sends verification email with:
     - Personalized greeting
     - Verification link with token
     - Token expiry notice (24 hours)
     - Support contact information
   - Shows "Check Your Email" confirmation page

5. **Given** I receive verification email,  
   **When** I click verification link within 24 hours,  
   **Then** system:
   - Validates token (checks: exists, not expired, not already used)
   - Updates account status: 'unverified' → 'verified'
   - Displays success message: "Email verified! Complete your subscription to continue."
   - Redirects to subscription selection page

6. **Given** verification link is expired (>24 hours),  
   **When** I click it,  
   **Then** I see:
   - "Verification link expired" message
   - "Resend Verification Email" button
   - Link to support if issues persist

### Subscription Selection (After Verification)

7. **Given** I successfully verified my email,  
   **When** I'm on subscription selection page,  
   **Then** I see:
   - Subscription plan dropdown (same options as OAuth flow)
   - Payment method input (Stripe Payment Element)
   - Plan details expandable (features, billing frequency)
   - Terms of Service checkbox
   - "Complete Registration" button

8. **Given** I select subscription plan and enter valid payment method,  
   **When** I check Terms and click "Complete Registration",  
   **Then** system:
   - Processes payment via Stripe
   - Activates subscription (managed by Stripe)
   - Updates account status: 'verified' → 'active'
   - Sends confirmation email with receipt
   - Redirects to Advisor Portal Dashboard

9. **Given** successful subscription activation,  
   **When** I land on dashboard,  
   **Then** I see:
   - Welcome message with my name
   - "Complete Your Profile" CTA
   - Profile completion: 0%

### Error Handling

10. **Given** I enter email that already exists,  
    **When** I submit form,  
    **Then** I see error:
    - "An account with this email already exists"
    - Options: Log in | Reset password | Contact support

11. **Given** I haven't verified email within 3 hours,  
    **When** reminder job runs,  
    **Then** system sends follow-up email:
    - "Don't forget to verify your email"
    - New verification link
    - Same 24-hour expiry from new email

12. **Given** I attempt to resend verification more than 5 times,  
    **When** 6th attempt is made,  
    **Then** system:
    - Blocks further resends for this email
    - Shows: "Maximum resends reached. Contact support@platform.com"

13. **Given** payment processing fails during subscription,  
    **When** error occurs,  
    **Then**:
    - Account remains in 'verified' status (email confirmed but not paid)
    - Clear error message shown
    - Option to update payment method and retry
    - Can re-attempt payment unlimited times

**Additional Criteria:**
- [ ] Email verification required before subscription access
- [ ] Password hashed using bcrypt (cost factor 12)
- [ ] Verification tokens are single-use and cryptographically secure
- [ ] Rate limiting: Max 3 verification email requests per hour per email
- [ ] Support for international email formats and IDN domains
- [ ] Verification email sent asynchronously (non-blocking)
- [ ] Analytics events: `advisor_registration_started` (method: 'email'), `email_verified`, `subscription_completed`

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Email Registration Form *(Figma link to be added)*
- Password Strength Indicator *(Figma link to be added)*
- Check Your Email Page *(Figma link to be added)*
- Email Verification Success *(Figma link to be added)*
- Subscription Selection Page *(Figma link to be added)*

**User Flow:**
```
1. Navigate to /advisor/register
2. Click "Register with Email" (below OAuth options)
3. Enter email and password
4. See password strength update as typing
5. Submit form
6. See "Check Your Email" confirmation page
7. Open email client
8. Click verification link in email
9. Return to platform at /advisor/verify/{token}
10. See "Email Verified!" success message
11. Redirected to /advisor/subscription
12. Select subscription plan from dropdown
13. Enter payment method (Stripe Element)
14. Check Terms of Service
15. Click "Complete Registration"
16. Payment processed
17. Redirected to /advisor/dashboard
18. See "Complete Your Profile" CTA
```

**UI Elements:**
- Email and password inputs with validation states
- Password visibility toggle icon
- Password strength meter (visual bar + text: Weak/Fair/Good/Strong)
- Terms of Service and Privacy Policy checkboxes
- Loading state during form submission and payment
- Success page with email illustration and instructions
- Verification success animation
- Subscription plan comparison cards

---

## 🔒 Business Rules

### Validation Rules

1. **Email Format:**
   - Valid RFC 5322 format
   - No disposable email domains (maintain blocklist: guerrillamail, temp-mail, etc.)
   - International domains supported (IDN)
   - Corporate domains (@company.com) get "Verified Business" badge (future)

2. **Password Policy:**
   - Minimum 8 characters
   - At least 1 uppercase letter
   - At least 1 lowercase letter
   - At least 1 number
   - At least 1 special character (!@#$%^&*)
   - Cannot contain email username part
   - Cannot be from common passwords list (top 10,000)

3. **Verification Requirements:**
   - Must verify within 7 days or account is purged
   - Verification token expires in 24 hours
   - Maximum 5 resend requests per account
   - Each resend invalidates previous token

4. **Email Uniqueness:**
   - Must not exist in advisors table
   - Must not exist in family users table
   - Case-insensitive matching (email stored lowercase)

### Authorization

- **Who can perform:** Anyone (public registration endpoint)
- **Post-verification:** Email + password authentication
- **Post-subscription:** Full Advisor Portal access with advisor-specific JWT

### Subscription Rules

- Same subscription plans as OAuth flow (managed in Stripe dashboard)
- Payment required after email verification before profile access
- Subscription activation handled by Stripe webhooks
- Trial period and billing managed by Stripe

### Edge Cases

- **Email alias handling:** user+alias@domain.com treated as unique email
- **Case sensitivity:** Emails stored lowercase, case-insensitive matching
- **Unicode emails:** Full UTF-8 support for international domains
- **Typo correction:** Suggest corrections for common domain typos (gmial.com → gmail.com)
- **Concurrent registration:** Last submission with same email wins, previous marked invalid

---

## 🧪 Test Scenarios

### Happy Path
```
1. Navigate to /advisor/register
2. Click "Register with Email"
3. Enter: john.smith@advisoryfirm.com
4. Enter password: SecurePass123!
5. See "Strong" password indicator
6. Submit form
7. See "Check Your Email" page
8. Open email inbox
9. Verify email arrives within 30 seconds
10. Click verification link
11. See "Email Verified!" message
12. Redirected to subscription page
13. Select "Growth Plan - Yearly"
14. Enter valid payment method
15. Check Terms of Service
16. Click "Complete Registration"
17. Payment processed successfully
18. Redirected to dashboard
19. See "Complete Your Profile" CTA
20. Verify JWT token contains advisor_id
```

### Negative Tests

1. **Invalid Email Format:**
   - Enter: "notanemail"
   - See error: "Please enter a valid email address"
   - Submit button remains disabled

2. **Weak Password:**
   - Enter password: "pass123"
   - See "Weak" indicator (red)
   - Submit shows: "Password does not meet requirements"
   - Must improve password to proceed

3. **Duplicate Email:**
   - Register with existing email
   - See error: "Account already exists"
   - Links to login and password reset provided

4. **Expired Verification:**
   - Wait 25 hours after registration
   - Click verification link
   - See "Link expired" page
   - Click "Resend Verification"
   - New email sent successfully

5. **Multiple Resend Attempts:**
   - Request resend 5 times
   - 6th attempt blocked
   - Message: "Maximum resends reached. Contact support."

6. **Payment Failure After Verification:**
   - Complete email verification successfully
   - Enter declined test card on subscription page
   - See payment error message
   - Email remains verified (not lost)
   - Can retry with different payment method

### Edge Cases

1. **Email Typo Detection:**
   - Enter: john@gmial.com
   - See suggestion: "Did you mean gmail.com?"
   - Option to accept correction or continue

2. **Concurrent Registration:**
   - Start registration with email1@test.com
   - Before verifying, start another with same email
   - First verification link invalidated
   - Only second link works
   - First attempt shows "Token invalid or already used"

3. **Case Sensitivity:**
   - Register: John@Test.com
   - Later try: john@test.com
   - System recognizes as duplicate
   - Shows "Account already exists"

---

## 🔗 Dependencies

### Story Dependencies
- **Related:** FG-001 - OAuth Registration (alternative flow)
- **Blocks:** FG-003 - Basic Profile Information (needs created account)
- **Blocks:** FG-006 - Draft Profile Saving (needs active account)

### Technical Dependencies
- Auth Service (port 8001) for account creation and password hashing
- Email service (SendGrid/SES or SMTP) for verification emails
- Notification Service (port 8010) for email templates
- Stripe API for subscription and payment
- PostgreSQL with advisor tables
- Redis for rate limiting verification resends

### External Dependencies
- Email delivery service SLA (>99% deliverability)
- Spam filter compatibility (emails not flagged as spam)
- Stripe payment processing uptime

---

## ⚠️ Non-Functional Requirements

### Performance
- Registration form submission: < 500ms
- Email sent within: 5 seconds of registration
- Verification token validation: < 1 second
- Password hashing time: < 200ms (bcrypt cost 12)
- Payment processing: < 5 seconds (Stripe standard)

### Security
- Passwords hashed with bcrypt (cost factor 12, industry standard)
- Verification tokens: 32 bytes, URL-safe, cryptographically random
- HTTPS required for all registration endpoints
- Rate limiting:
  - Registration: 5 attempts per IP per hour
  - Verification resend: 3 per email per hour
- CAPTCHA after 3 failed registration attempts from same IP
- PII encrypted at rest (pgcrypto)

### Reliability
- Email delivery retry logic (3 attempts with exponential backoff)
- Verification token stored in Redis with automatic expiry
- Graceful handling of email service outages (queue and retry)
- Audit log for all registration attempts

### Accessibility
- Form fields with proper labels (for screen readers)
- Error messages linked to fields (ARIA)
- Keyboard navigation support (Tab, Enter)
- Screen reader announcements for:
  - Password strength changes
  - Form submission status
  - Success/error messages
- High contrast mode support

### Browser Support
- All modern browsers (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Mobile responsive design
- Progressive enhancement for older browsers

---

## 📝 Notes

**Questions:**
- [ ] Should we support magic link authentication as alternative to passwords? (Passwordless flow)
- [ ] Do we need two-factor authentication (2FA) at registration? (Recommend: No for MVP, add later)
- [ ] Should corporate domains skip email verification if domain is pre-trusted? (Recommend: No, always verify)
- [ ] Email allowlist for beta period? (If yes, maintain list of approved domains)

**Assumptions:**
- Email service has 99.9% uptime and deliverability
- Advisors check email within 24 hours
- Corporate email addresses are preferred over personal (Gmail/Yahoo)
- Password managers are commonly used by professional advisors
- Spam filters don't block platform verification emails (proper SPF/DKIM/DMARC configured)

**Future Enhancements:**
- Social proof during registration ("500+ advisors already joined")
- Magic link authentication (passwordless)
- Progressive profiling (collect additional data over time)
- Single Sign-On (SSO) for enterprise advisory firms
- Email domain verification for corporate accounts (bulk onboarding)

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-17  
**Story Status:** Ready for Development  
**Sprint:** Sprint 45