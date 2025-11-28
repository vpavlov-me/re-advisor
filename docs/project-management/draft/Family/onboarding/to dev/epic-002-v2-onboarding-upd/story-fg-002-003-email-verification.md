## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a new user, I want to verify my email address after registration
**Epic Link:** FG-EPIC-002-V2-onboarding-upd [Onboarding Flow v2.0 - Registration Restructure & Enhanced Setup Wizard]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** new user who just completed registration,
**I want to** verify my email address through a verification link,
**so that** the platform can confirm my identity and enable my account access.

**Example:**
- **As a** new user,
- **I want to** click a verification link sent to my registered email,
- **so that** I can activate my account and proceed to payment setup.

---

## 🎯 Business Context

**Why is this Story important?**

Email verification is critical for:
- **Security:** Prevents fraudulent account creation with fake email addresses
- **User confidence:** Confirms users own the email address they registered with
- **Communication reliability:** Ensures platform notifications reach real users
- **Legal compliance:** Required for GDPR and CAN-SPAM compliance

Industry best practice: Email verification reduces spam accounts by 90% and improves email deliverability rates.

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** I complete registration (Step 3 of sign-up wizard),
   **When** I submit the final form,
   **Then** I'm redirected to an email verification screen showing "Check your email" message.

2. **Given** I'm on the email verification screen,
   **When** the page loads,
   **Then** I see my registered email address displayed and a message "Verification email sent to [email]".

3. **Given** verification email was sent,
   **When** I check my email inbox,
   **Then** I receive an email within 1 minute with subject "Verify Your Family Governance Account" and a verification link.

4. **Given** I click the verification link in email,
   **When** the link is valid and not expired,
   **Then** I'm redirected to platform and see "Email verified successfully!" message.

5. **Given** I'm on the email verification screen and haven't received email,
   **When** I click "Resend verification email" button,
   **Then** a new verification email is sent and I see confirmation "Verification email resent".

6. **Given** I click an expired verification link (>24 hours old),
   **When** the page loads,
   **Then** I see error message "Verification link expired" with "Request new link" button.

**Additional Criteria:**
- [ ] Verification link is single-use (cannot be clicked twice)
- [ ] User cannot access platform features until email is verified
- [ ] Resend button has 60-second cooldown to prevent abuse
- [ ] Verification email includes clear instructions and support contact
- [ ] Email verification status persists across user sessions

---

## 🔒 Business Rules

**Validation Rules:**
1. **Verification Token:**
   - Cryptographically secure random token (256-bit)
   - Expires after 24 hours
   - Single-use only (invalidated after verification)

2. **Email Sending:**
   - Maximum 3 verification emails per account per day
   - Minimum 60 seconds between resend requests
   - Email sent from verified domain (noreply@familygovernance.com)

3. **Account Access:**
   - Users with unverified email cannot access payment setup
   - Users with unverified email cannot access onboarding wizard
   - Login blocked until email verified (show "Verify your email first" message)

**Authorization:**
- **Who can perform this action:** Newly registered users (pre-authentication state)
- **Who can view results:** User themselves (verification status tied to their account)

**Edge Cases:**
- **Email not received (spam folder):** Show instructions to check spam/junk folders
- **Wrong email address registered:** Allow email address change before verification
- **Verification link clicked on different device:** Works seamlessly (token-based, not session-based)
- **Multiple resend requests:** Invalidate previous tokens, only latest token valid
- **User closes verification screen:** Can return via login → show "Verify email" prompt

---

## 📐 Design & UX

**Mockups/Wireframes:**
- Email verification screen design (post-registration)

**User Flow:**
1. User completes registration Step 3 → clicks "Complete Sign-Up"
2. System creates account → redirects to email verification screen
3. Email verification screen displays: "Check your email" heading, registered email address, "Resend" button
4. User opens email inbox → finds verification email
5. User clicks "Verify Email" button in email
6. Browser opens platform → shows "Email verified!" success message
7. System automatically redirects to payment setup screen after 3 seconds

**Design Specifications:**
- **Verification Screen:**
  - Large email icon
  - Heading: "Check your email"
  - Body text: "We've sent a verification link to [user@email.com]"
  - Secondary text: "Click the link in the email to verify your account"
  - "Resend verification email" link (disabled for 60 seconds after send)
  - "Change email address" link
  - "Return to login" link

- **Verification Email:**
  - Subject: "Verify Your Family Governance Account"
  - Preheader: "One click to activate your account"
  - Prominent "Verify Email" CTA button
  - Plain text link alternative below button
  - Expiration notice: "This link expires in 24 hours"
  - Support contact information

---

## 🧪 Test Scenarios

**Happy Path:**
1. Complete registration → verify redirection to email verification screen
2. Check email inbox → verify verification email received within 1 minute
3. Click verification link in email → verify redirect to platform with success message
4. Verify user can now proceed to payment setup

**Negative Tests:**
1. **Click expired token (>24 hours):** Verify error message "Link expired" with resend option
2. **Click already-used token:** Verify error "Link already used" with login prompt
3. **Click resend button 4 times rapidly:** Verify rate limiting (3 max per day)
4. **Attempt login before verification:** Verify blocked with "Verify email first" message
5. **Click verification link on mobile while registered on desktop:** Verify works cross-device

**Edge Cases:**
1. **Email in spam folder:** Instructions displayed on verification screen
2. **User changes email before verifying:** New verification email sent to new address, old token invalidated
3. **Network error during verification:** Show retry button, maintain token validity
4. **Verification email fails to send (email service down):** Log error, show "Technical issue" message with support contact
5. **User closes browser before verifying:** Can return to verification screen via login attempt

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** FG-002-002 (3-step sign-up wizard - must complete registration first)
- **Blocks:** FG-002-004 (Payment setup - requires verified email)

**Technical Dependencies:**
- Email delivery service (SendGrid, AWS SES, or similar)
- Token generation library (crypto.randomBytes)
- Email template rendering engine
- Database table: `email_verifications` (token, user_id, expires_at, verified_at)

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Email delivery: < 60 seconds (95th percentile)
- Verification link click → redirect: < 2 seconds
- Resend button: Instant UI feedback with cooldown timer

**Security:**
- Tokens: 256-bit cryptographically secure random strings
- HTTPS required for all verification links
- Tokens stored hashed in database (SHA-256)
- Rate limiting: 3 emails per day per user, 5 verification attempts per IP per hour
- PII handling: Email address encrypted at rest

**Browser Support:**
- Verification screen: All modern browsers (Chrome 90+, Safari 14+, Firefox 88+, Edge 90+)
- Email: Compatible with major email clients (Gmail, Outlook, Apple Mail, Yahoo)

**Accessibility:**
- WCAG 2.1 Level AA compliance
- Verification screen readable by screen readers
- Email uses semantic HTML for accessibility

**Other:**
- Email deliverability: SPF, DKIM, DMARC configured
- Monitoring: Track email bounce rates, verification completion rates
- Logging: All verification attempts logged for security audit

---

## 📝 Notes

**Technical Implementation:**
- Use JWT tokens with embedded user_id and expiration timestamp
- Store token hash in database for validation and single-use enforcement
- Implement exponential backoff for resend requests (60s → 120s → 300s)
- Queue email sending via background job (don't block registration response)

**Email Best Practices:**
- Include plain text version for email clients that block HTML
- Use recognizable sender name "Family Governance Platform"
- Keep email content concise (< 200 words)
- Include troubleshooting tips (check spam, contact support)

**Migration Considerations:**
- Existing v1 users with verified emails: No action needed
- Existing v1 users without verified emails: Prompt verification on next login
- Feature flag: Gradually roll out email verification requirement

**Open Questions:**
- Should we allow platform access before email verification (with limited features)?
- Do we need phone number verification as alternative to email?
- Should verification email include personalized welcome message?

**Assumptions:**
- Users have access to registered email inbox within 24 hours
- Email delivery service has 99.9% uptime SLA
- Most users will verify email within first hour of registration

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-30
