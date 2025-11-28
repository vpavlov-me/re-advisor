## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a user, I want to reset my password through a secure 3-step flow
**Epic Link:** FG-EPIC-002-V2-onboarding-upd [Onboarding Flow v2.0 - Registration Restructure & Enhanced Setup Wizard]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** user who forgot my password,
**I want to** reset my password through a secure 3-step flow (Request → Email → Reset),
**so that** I can regain access to my account without contacting support.

**Example:**
- **As a** returning user who forgot my password,
- **I want to** enter my email on the login screen, receive a reset link via email, and set a new password,
- **so that** I can log back into my family governance platform account.

---

## 🎯 Business Context

**Why is this Story important?**

Password reset is a critical account recovery feature:
- **User pain point:** Users locked out of accounts due to forgotten passwords create support burden
- **Business outcome:** Reduced support tickets (target 80% self-service password resets) and improved user experience
- **Strategic alignment:** Self-service password reset is industry standard and expected by users

Industry data: 20-30% of users forget passwords within 90 days. Self-service reset reduces support costs by 70%.

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** I'm on the login screen and forgot my password,
   **When** I click "Forgot password?" link,
   **Then** I'm redirected to password reset request screen (Step 1).

2. **Given** I'm on password reset request screen,
   **When** I enter my registered email and click "Send reset link",
   **Then** I see confirmation "Password reset email sent to [email]" and receive reset email within 1 minute.

3. **Given** I receive the password reset email,
   **When** I click the reset link,
   **Then** I'm redirected to password reset form (Step 3) with valid token.

4. **Given** I'm on the password reset form,
   **When** I enter new password (8+ chars, 1 uppercase, 1 letter, 1 number), confirm password, and click "Reset password",
   **Then** my password is updated and I see success message "Password reset successfully!".

5. **Given** my password is successfully reset,
   **When** success message displays,
   **Then** I'm automatically redirected to login screen after 3 seconds with "You can now log in with your new password" message.

6. **Given** I click an expired reset link (>1 hour old),
   **When** the page loads,
   **Then** I see error "Reset link expired" with "Request new link" button.

**Additional Criteria:**
- [ ] Reset link is single-use (cannot be used twice)
- [ ] Password strength indicator shows real-time validation (Weak/Medium/Strong)
- [ ] "Confirm password" field validates match with new password
- [ ] Reset token expires after 1 hour
- [ ] Email sent from verified domain with clear instructions
- [ ] Rate limiting: Max 3 reset requests per email per hour

---

## 🔒 Business Rules

**Validation Rules:**
1. **Step 1 - Request Reset:**
   - Email: Required, valid email format
   - Email must exist in system (but don't reveal if email not found for security)
   - Rate limiting: Max 3 requests per email per hour
   - Always show success message even if email doesn't exist (prevent email enumeration)

2. **Step 2 - Email:**
   - Reset token: 256-bit cryptographically secure random string
   - Token expires after 1 hour
   - Single-use only (invalidated after successful reset)
   - Email subject: "Reset Your Family Governance Password"
   - Email contains: Reset link, expiration notice (1 hour), support contact

3. **Step 3 - Reset Password:**
   - New password: Required, minimum 8 characters, at least 1 uppercase letter, 1 letter, 1 number
   - Confirm password: Must match new password exactly
   - Token validation: Check not expired, not already used, matches user
   - Password cannot be same as previous password (compare hash)

**Authorization:**
- **Who can perform this action:** Any user (authenticated or not)
- **Who can view results:** User themselves (password reset for their account only)

**Edge Cases:**
- **Email not in system:** Show success message "If email exists, reset link sent" (don't reveal email doesn't exist)
- **Reset link clicked on different device/browser:** Works seamlessly (token-based, not session-based)
- **User requests reset multiple times:** Invalidate previous tokens, only latest token valid
- **Password reset during active session:** Force logout all sessions after reset (security measure)
- **User closes browser before completing reset:** Can return via reset link (as long as not expired)

---

## 📐 Design & UX

**Mockups/Wireframes:**
- Figma: https://www.figma.com/design/NWeSLJWw6iPinNILwPbsfv/-ReFamily--Web-Platofrm?node-id=3953-18118&t=UgPYb2pfH4R5d3VR-4
- Password reset flow screens

**User Flow:**

**Step 1: Request Reset**
1. User on login screen clicks "Forgot password?" link
2. Redirects to password reset request screen
3. Screen shows:
   - Heading: "Reset your password"
   - Email input field
   - "Send reset link" button
   - "Return to login" link
4. User enters email → clicks "Send reset link"
5. Success message: "Password reset email sent to [email]. Check your inbox."

**Step 2: Email**
6. User opens email inbox → finds reset email
7. Email contains:
   - Subject: "Reset Your Family Governance Password"
   - Body: "Click the button below to reset your password"
   - "Reset Password" CTA button
   - Plain text link alternative
   - "This link expires in 1 hour"
   - "If you didn't request this, ignore this email"

**Step 3: Reset Password**
8. User clicks reset link in email
9. Redirects to password reset form
10. Screen shows:
    - Heading: "Create new password"
    - New password input (with show/hide toggle)
    - Password strength indicator (real-time)
    - Confirm password input
    - "Reset password" button
11. User enters new password and confirmation → clicks "Reset password"
12. Success message: "Password reset successfully! Redirecting to login..."
13. Auto-redirect to login screen after 3 seconds

**Design Specifications:**
- **Step 1 Screen:** Simple form, centered, email input + button
- **Success Message:** Green banner at top, checkmark icon
- **Step 3 Screen:** Two password fields stacked, password requirements list below
- **Password Strength Indicator:** Progress bar (red=weak, yellow=medium, green=strong)
- **Confirm Password Validation:** Red error text if passwords don't match
- **Reset Email:** Responsive HTML, prominent CTA button, plain text fallback

---

## 🧪 Test Scenarios

**Happy Path:**
1. Click "Forgot password?" on login screen → verify redirect to reset request screen
2. Enter valid registered email → click "Send reset link" → verify success message
3. Check email inbox → verify reset email received within 1 minute
4. Click reset link in email → verify redirect to password reset form
5. Enter new password (meets requirements) and matching confirmation → click "Reset password"
6. Verify success message and auto-redirect to login after 3 seconds
7. Login with new password → verify successful authentication

**Negative Tests:**
1. **Expired token (>1 hour):** Click old reset link → verify error "Reset link expired" with "Request new link" button
2. **Already-used token:** Click reset link twice → second click shows "Link already used. Request new link."
3. **Weak password (6 chars):** Enter weak password → verify error "Password must be at least 8 characters"
4. **Mismatched passwords:** Enter different passwords in new/confirm fields → verify error "Passwords do not match"
5. **Invalid token (manipulated URL):** Access reset form with fake token → verify error "Invalid reset link"

**Edge Cases:**
1. **Email not in system:** Enter unregistered email → verify still shows success message (don't reveal email doesn't exist)
2. **Request reset 4 times in 30 minutes:** Verify rate limiting error "Too many requests. Try again in 30 minutes."
3. **User has active session:** Complete password reset → verify forced logout from all sessions
4. **Click reset link on mobile while requested on desktop:** Verify works cross-device
5. **Network error during password reset:** Verify error message "Failed to reset password. Please try again."
6. **User tries to reuse previous password:** Verify error "Cannot reuse previous password"

**Stripe Test Cards (not applicable for password reset):**
N/A

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** FG-002-002 (3-step sign-up wizard - users need accounts before resetting passwords)
- **Blocks:** None (standalone account recovery feature)

**Technical Dependencies:**
- Email delivery service (SendGrid, AWS SES)
- Token generation library (crypto.randomBytes)
- Password hashing library (bcrypt)
- Backend API:
  - `POST /auth/reset-password/request` (initiate reset)
  - `GET /auth/reset-password/validate/:token` (validate reset token)
  - `POST /auth/reset-password/confirm` (complete reset with new password)
- Database table: `password_resets` (user_id, token_hash, expires_at, used_at)

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Reset email delivery: < 60 seconds (95th percentile)
- Token validation: < 200ms
- Password reset completion: < 1 second

**Security:**
- Reset tokens: 256-bit cryptographically secure random strings
- Tokens stored hashed in database (SHA-256)
- HTTPS required for all reset pages
- Tokens expire after 1 hour
- Single-use tokens (invalidated after use)
- Rate limiting: 3 requests per email per hour, 10 resets per IP per day
- Force logout all sessions after password reset
- Password hashed with bcrypt (cost factor 12)
- No password history stored (only hash of current password for comparison)

**Browser Support:**
- Chrome: 90+
- Safari: 14+
- Firefox: 88+
- Edge: 90+
- Email: Compatible with major email clients (Gmail, Outlook, Apple Mail, Yahoo)

**Accessibility:**
- WCAG 2.1 Level AA compliance
- Form labels associated with inputs
- Password strength indicator accessible (aria-live announcements)
- Error messages announced to screen readers
- Keyboard navigation (Tab + Enter)

**Other:**
- Email deliverability: SPF, DKIM, DMARC configured
- Monitoring: Track reset request rate, completion rate, expired token rate
- Logging: All reset attempts logged for security audit (but not passwords)
- Password requirements displayed clearly (before user starts typing)

---

## 📝 Notes

**Technical Implementation:**
- Use JWT tokens with embedded user_id and expiration timestamp for reset tokens
- Store token hash in database (not plain token) for validation
- Implement exponential backoff for rate limiting (3 requests → 1 hour cooldown)
- Queue email sending via background job (don't block API response)
- Use constant-time comparison for token validation (prevent timing attacks)

**Reset Email Template:**
```
Subject: Reset Your Family Governance Password

Hi [First Name],

We received a request to reset your password for your Family Governance account.

Click the button below to reset your password:

[Reset Password Button]

Or copy this link into your browser:
https://platform.com/reset-password?token=abc123...

This link expires in 1 hour.

If you didn't request this, you can safely ignore this email.
Your password will remain unchanged.

Need help? Contact support@familygovernance.com

Best regards,
Family Governance Team
```

**Password Requirements Display:**
```
Password requirements:
✓ At least 8 characters
✓ At least 1 uppercase letter
✓ At least 1 lowercase letter
✓ At least 1 number
```

**Token Invalidation Logic:**
```javascript
// After successful password reset:
1. Update user password hash
2. Mark reset token as used (used_at = NOW())
3. Force logout all user sessions (clear all session tokens)
4. Invalidate all other pending reset tokens for user
5. Log password change event for audit
```

**Migration Considerations:**
- Existing v1 users: Password reset flow available immediately
- v1 reset tokens (if different format): Invalidate all v1 tokens, require new reset request
- Feature flag: Gradually roll out new 3-step reset flow (if v1 had different flow)

**Open Questions:**
- Should we send confirmation email after password reset (in addition to reset email)?
- Do we need multi-factor authentication (MFA) before allowing password reset?
- Should we allow password reset via SMS (alternative to email)?
- Do we need CAPTCHA on reset request form (prevent abuse)?

**Assumptions:**
- Users have access to registered email inbox
- Email delivery service has 99.9% uptime SLA
- Most users will complete password reset within 15 minutes of requesting
- 1-hour token expiration is sufficient (industry standard)
- Users prefer self-service password reset over contacting support

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-30
