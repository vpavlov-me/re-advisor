---
story_id: "STORY-FG-001"
title: "OAuth Registration with Subscription"
type: "story"
epic_id: "EPIC-003"
created: "2025-10-17"
updated: "2025-10-20"
priority: "critical"
status: "ready"
estimate: "24h"
story_points: 8
sprint: "Sprint 45"
assignee: ""
labels: ["advisor", "registration", "oauth", "subscription", "stripe"]
dependencies: []
---

# User Story FG-001: OAuth Registration with Subscription

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As an External Advisor, I want to register using OAuth with subscription selection on registration form
**Epic Link:** EPIC-003 (Basic Advisor Registration & Profile)
**Priority:** Critical
**Story Points:** 8
**Sprint:** Sprint 45  

---

## 📖 User Story

**As an** External Advisor (independent consultant or family governance specialist),  
**I want to** register using my LinkedIn, Google, or Apple account with subscription selection on the same registration form,  
**so that** I can quickly create a paid marketplace account and import my professional information without multiple steps.

**Example Scenario:**
- **As a** Family Governance Consultant with LinkedIn profile,
- **I want to** click "Continue with LinkedIn" and select subscription plan on one form,
- **So that** my credentials and payment are processed together, and I land on dashboard ready to build my profile.

---

## 🎯 Business Context

**Why is this Story important?**

OAuth registration with integrated subscription reduces friction in advisor onboarding:

- **Time Efficiency:** Single-form registration vs. multi-step reduces abandonment by 40%
- **Data Quality:** OAuth providers supply verified professional data (name, photo, headline)
- **Trust Building:** Recognized authentication providers (LinkedIn, Google, Apple) increase platform credibility
- **Revenue Generation:** Immediate subscription payment ensures only committed advisors proceed
- **Conversion Rate:** Industry data shows 45% higher completion with OAuth + integrated payment vs. separate steps

**Strategic Alignment:**
- Enables marketplace monetization through advisor subscriptions
- Reduces registration time from 8-10 minutes to 3-5 minutes
- Aligns with Family Portal pattern (subscription on registration form)

---

## ✅ Acceptance Criteria

### Primary Flow - OAuth Registration

1. **Given** I am an unregistered advisor on the registration page,  
   **When** I see OAuth options,  
   **Then** I see three buttons:
   - "Continue with LinkedIn" (LinkedIn blue branding)
   - "Continue with Google" (Google multi-color branding)
   - "Continue with Apple" (Apple black branding)

2. **Given** I click "Continue with [Provider]",  
   **When** OAuth authorization flow starts,  
   **Then** I am redirected to provider's consent page with appropriate scopes requested:
   - LinkedIn: `r_liteprofile`, `r_emailaddress`
   - Google: `profile`, `email`
   - Apple: `name`, `email`

3. **Given** I authorize access on provider's page,  
   **When** I'm redirected back to platform,  
   **Then** I see registration form with:
   - **Pre-filled OAuth data:**
     - Full name (from provider)
     - Email address (from provider)
     - Profile photo URL (if available)
     - Professional headline (LinkedIn only)
   - **Subscription section:**
     - Subscription Plan dropdown (required)
     - Payment method input (Stripe Payment Element)
     - Terms of Service checkbox
     - "Complete Registration" button

4. **Given** I see subscription plan dropdown,  
   **When** I click it,  
   **Then** I see plan options configured in Stripe dashboard (e.g., Growth Plan - Yearly, Basic - Monthly, Professional - Yearly) with pricing and trial information.

5. **Given** I select subscription plan and enter valid payment method,  
   **When** I check Terms of Service and click "Complete Registration",  
   **Then** system:
   - Validates payment method with Stripe
   - Creates advisor account in database
   - Processes subscription payment via Stripe
   - Activates subscription (status managed by Stripe)
   - Sends confirmation email with receipt
   - Redirects to Advisor Portal Dashboard

6. **Given** successful registration and payment,  
   **When** I land on Advisor Portal Dashboard,  
   **Then** I see:
   - Welcome message with my name
   - "Complete Your Profile" CTA card prominently displayed
   - Profile completion: 0%
   - Navigation menu with disabled profile sections (locked until profile started)

### Error Handling

7. **Given** an advisor account already exists with OAuth email,  
   **When** I try to register,  
   **Then** I see error message:
   - "Account already exists with this email"
   - Options to:
     - Log in with existing account
     - Use different email address
     - Contact support

8. **Given** OAuth authorization is cancelled or fails,  
   **When** I return to registration page,  
   **Then** I see error message:
   - "Registration cancelled" or specific error
   - Options to:
     - Try again with same provider
     - Use different provider
     - Register with email

9. **Given** payment processing fails (declined card, insufficient funds, etc.),  
   **When** error occurs,  
   **Then**:
   - Clear error message displayed near payment section
   - All form data preserved (OAuth info, selected plan)
   - Payment fields highlighted
   - "Update Payment Method" option available
   - Account NOT created until payment succeeds

10. **Given** OAuth provider is experiencing downtime,  
    **When** authorization fails due to provider unavailability,  
    **Then** I see error message:
    - "[Provider] is temporarily unavailable. Please try again in a few minutes or use different registration method."
    - Options to try different OAuth provider or email registration

### Data Handling

11. **Given** OAuth provider returns incomplete data (e.g., no email),  
    **When** required fields are missing,  
    **Then** I am prompted to manually enter missing required fields before proceeding.

12. **Given** OAuth profile photo URL is provided,  
    **When** system fetches the image,  
    **Then** it is:
    - Downloaded and validated (size, format)
    - Stored in S3 with advisor-specific path
    - CDN URL saved to advisor profile

**Additional Criteria:**
- [ ] OAuth tokens are NOT stored; only profile data is extracted
- [ ] Session created with JWT containing advisor_id (not family_id)
- [ ] Advisor account created with advisor_type: 'marketplace'
- [ ] PII data encrypted using pgcrypto before storage
- [ ] Analytics event fired: `advisor_registration_completed` with method: 'oauth_[provider]'
- [ ] Email notification sent to advisor with welcome message and next steps
- [ ] All three OAuth providers (LinkedIn, Google, Apple) functional

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Registration Page with OAuth Buttons *(Figma link to be added)*
- OAuth Registration Form with Pre-filled Data *(Figma link to be added)*
- Subscription Section on Registration Form *(Figma link to be added)*
- Dashboard Welcome State *(Figma link to be added)*

**User Flow:**
```
1. Advisor lands on /advisor/register
2. Sees OAuth buttons prominently above email option
3. Clicks "Continue with LinkedIn"
4. LinkedIn OAuth consent page opens
5. Advisor authorizes access
6. Returns to platform at /advisor/oauth/callback
7. Sees registration form with pre-filled data (name, email, photo)
8. Selects subscription plan from dropdown
9. Enters payment method (Stripe Element)
10. Checks Terms of Service
11. Clicks "Complete Registration"
12. Loading spinner during payment processing
13. Success message briefly shown
14. Redirected to /advisor/dashboard
15. Sees "Complete Your Profile" CTA
```

**UI Components:**
- OAuth provider buttons with official branding and icons
- Registration form with clear sections (OAuth Data, Subscription, Payment)
- Stripe Payment Element (embedded card input)
- Loading states during OAuth callback and payment processing
- Success toast notification after registration
- Error modals for failure scenarios with clear next steps
- Dashboard welcome card with profile completion CTA

---

## 🔒 Business Rules

### Validation Rules

1. **Email Uniqueness:** OAuth email must not exist in advisor or family user databases
2. **Email Verification:** OAuth provider must confirm email is verified
3. **Profile Photo:** If provided, must be valid image (JPG/PNG), auto-downloaded and stored
4. **Subscription Selection:** Required field - cannot proceed without selecting plan
5. **Payment Method:** Must pass Stripe validation before account creation
6. **Terms Acceptance:** Required checkbox - must be checked to submit

### Authorization

- **Who can perform:** Anyone (public registration endpoint)
- **OAuth Scopes Required:**
  - LinkedIn: `r_liteprofile`, `r_emailaddress`
  - Google: `profile`, `email`
  - Apple: `name`, `email`
- **Post-registration access:** Advisor Portal with advisor-specific JWT (contains advisor_id, not family_id)

### Subscription Rules

- Subscription plans, pricing, trial periods, and billing frequency managed through **Stripe dashboard**
- Platform retrieves available plans from Stripe API for dropdown display
- Payment processed via Stripe Payment Element
- Subscription status and trial management handled by Stripe
- Account creation blocked until successful payment confirmation via Stripe webhook

### Edge Cases

- **Multiple OAuth accounts same email:** First registration wins, others see "already exists" error
- **OAuth email change after registration:** Email becomes immutable after account creation
- **OAuth provider returns empty bio/photo:** Fields left empty, not required for registration
- **Network timeout during callback:** Show retry with saved OAuth state (5-minute TTL)
- **Expired OAuth profile photo URL:** Attempt fetch, use placeholder if fails
- **Payment processing timeout:** Queue for retry, show user waiting message, notify when complete

---

## 🧪 Test Scenarios

### Happy Path
```
1. Navigate to /advisor/register
2. Click "Continue with LinkedIn"
3. Authorize on LinkedIn with all permissions
4. Return to platform with pre-filled data (name, email, photo, headline)
5. Select "Growth Plan - Yearly" from dropdown
6. Enter valid credit card in Stripe Element
7. Check Terms of Service
8. Click "Complete Registration"
9. See success message
10. Redirected to /advisor/dashboard
11. Verify JWT token contains advisor_id
12. See "Complete Your Profile" CTA on dashboard
13. Verify subscription active in Stripe dashboard
14. Verify welcome email received
```

### Negative Tests

1. **Duplicate Email:**
   - Register with email via email registration first
   - Attempt OAuth with same email
   - Verify "Account already exists" error shown
   - Verify login link provided

2. **Payment Declined:**
   - Complete OAuth successfully
   - Enter declined test card (4000 0000 0000 0002)
   - Submit form
   - Verify error message displayed
   - Verify account NOT created
   - Verify form data preserved
   - Enter valid card and retry successfully

3. **OAuth Cancellation:**
   - Click LinkedIn OAuth
   - Cancel on LinkedIn consent page
   - Verify return to registration with error
   - Verify other options available

4. **Missing Required Data:**
   - Mock OAuth response without email
   - Verify prompt to enter email manually
   - Verify cannot proceed without email

5. **Provider Downtime:**
   - Simulate LinkedIn API timeout
   - Verify graceful error message
   - Verify alternative options suggested

### Edge Cases

1. **Photo Download Failure:**
   - OAuth returns photo URL that's expired/broken
   - Verify system attempts download
   - Verify fallback to placeholder if fails
   - Verify registration still succeeds

2. **Concurrent Registrations:**
   - Start two OAuth flows with same email simultaneously
   - Verify first completes successfully
   - Verify second shows duplicate error

3. **Stripe Webhook Delay:**
   - Complete payment successfully
   - Simulate webhook delay (not received immediately)
   - Verify user sees "Processing..." state
   - Verify redirect after webhook confirms

---

## 🔗 Dependencies

### Story Dependencies
- **Prerequisite:** OAuth provider apps configured (LinkedIn, Google, Apple)
- **Blocks:** FG-003 - Basic Profile Information (needs created account)
- **Related:** FG-002 - Email Registration (alternative flow)

### Technical Dependencies
- Auth Service (port 8001) for JWT generation and advisor account creation
- Advisor Portal Service (port 8011) for advisor data storage
- Stripe API for subscription creation and payment processing
- Stripe webhooks configured for payment confirmation
- S3 bucket for profile photo storage
- CDN for photo serving
- PostgreSQL with pgcrypto extension for PII encryption
- Email service for welcome email

### External Dependencies
- LinkedIn OAuth API availability (uptime SLA)
- Google OAuth API availability
- Apple Sign In API availability
- Stripe payment processing uptime

---

## ⚠️ Non-Functional Requirements

### Performance
- OAuth callback processing: < 2 seconds
- Account creation: < 1 second
- Profile photo download and store: < 3 seconds
- Payment processing: < 5 seconds (Stripe standard)
- Total registration time: < 10 seconds (user perspective)

### Security
- OAuth state parameter for CSRF protection
- HTTPS required for all OAuth flows and payment processing
- OAuth tokens never stored, only exchanged
- PII encrypted at rest using pgcrypto
- Stripe Payment Element (PCI compliant, no card data touches server)
- Rate limiting: 5 registration attempts per IP per hour
- JWT tokens secure with expiration

### Accessibility
- OAuth buttons keyboard accessible (Tab, Enter)
- Screen reader labels for all buttons and form fields
- Color contrast WCAG AA compliant
- Error messages clearly associated with fields
- Loading states announced to screen readers

### Browser Support
- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+
- Mobile browsers: iOS Safari 14+, Chrome Mobile

### Monitoring & Analytics
- Track OAuth success/failure rates by provider (LinkedIn vs. Google vs. Apple)
- Monitor callback processing time
- Monitor payment success/failure rates
- Alert on OAuth provider errors > 5% threshold
- Analytics events:
  - `advisor_registration_started` (method: 'oauth_[provider]')
  - `oauth_authorization_completed`
  - `subscription_selected` (plan_id)
  - `payment_initiated`
  - `advisor_registration_completed`

---

## 📝 Notes

**Questions:**
- [ ] Should we store OAuth refresh tokens for profile updates? (Currently: No, only one-time data import)
- [ ] Do we need audit logging for OAuth registrations? (Recommend: Yes, for security)
- [ ] Should OAuth data override manual edits if advisor reconnects account? (Recommend: No, manual takes precedence)

**Assumptions:**
- OAuth providers have 99.9% uptime
- Advisors will authorize all requested scopes
- LinkedIn profile data is accurate and up-to-date
- Stripe subscription plans are pre-configured in dashboard before this feature launches
- Photo URLs from OAuth providers are publicly accessible

**Future Enhancements:**
- Microsoft/Azure AD OAuth for enterprise advisory firms
- Option to import more data from LinkedIn (work history, education)
- Periodic profile sync with OAuth provider (with advisor consent)
- Single Sign-On (SSO) for advisory firm bulk onboarding

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-17  
**Story Status:** Ready for Development  
**Sprint:** Sprint 45