# User Story - Stripe Customer Portal Registration

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG 
**Summary:** As a Family Administrator, I want to complete registration through Stripe Customer Portal with embedded payment  
**Epic Link:** FG-EPIC-001 [Registration Flow with Educational Carousel & Constitution Setup]  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Family Administrator,  
**I want to** complete registration through Stripe's embedded customer portal with integrated payment,  
**so that** my account and subscription are created simultaneously in one seamless flow.

---

## 🎯 Business Context

**Why is this Story important?**

This story leverages Stripe's Customer Portal for a fully integrated registration and payment experience, eliminating the need for separate payment modal development. Using Stripe's native registration flow:

- Reduces development time by using battle-tested Stripe UI components
- Ensures PCI compliance out-of-the-box (no custom payment form needed)
- Provides seamless account + subscription creation in one flow
- Leverages Stripe's built-in validation, error handling, and security
- Aligns with Stripe best practices for SaaS subscription management

**User pain point being solved:**
- Users experience fragmented registration → payment flow
- Unclear subscription status during multi-step onboarding
- Security concerns about entering payment information in custom forms
- Trust issues with new platform's payment handling

**Business outcome expected:**
- Increased paid conversion rate through trusted Stripe interface
- Reduced time-to-revenue with immediate subscription activation
- Lower development and maintenance costs (no custom payment UI)
- Higher user trust and reduced payment abandonment

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** a new user completes OAuth registration (Google/Apple/LinkedIn) or email signup,  
   **When** registration is successful,  
   **Then** system redirects user to Stripe Customer Portal registration page with pre-filled email.

2. **Given** user is on Stripe Customer Portal registration page,  
   **When** user completes Stripe account creation (password, payment method, billing details),  
   **Then** Stripe creates customer record, saves payment method, and activates subscription.

3. **Given** Stripe registration is successfully completed,  
   **When** Stripe redirects user back to our platform (success_url),  
   **Then** system creates/updates user account with Stripe customer_id, marks subscription as active, and displays constitution onboarding modal at Step 1 (User Profile).

4. **Given** user cancels or closes Stripe registration page,  
   **When** user returns to our platform (cancel_url),  
   **Then** system redirects to dashboard with persistent banner: "Complete subscription setup to access all features" with CTA to restart Stripe registration.

5. **Given** user skipped Stripe registration and is on dashboard,  
   **When** user clicks banner CTA,  
   **Then** system generates new Stripe Customer Portal session and redirects user to complete registration.

**Additional Criteria:**
- [ ] Stripe Customer Portal session expires after 24 hours if not completed
- [ ] System webhook handles `customer.created`, `customer.subscription.created`, `payment_method.attached` events
- [ ] Subscription status synced from Stripe: `trialing`, `active`, `past_due`, `canceled`
- [ ] User account linked to Stripe customer_id immediately after successful registration
- [ ] Analytics event tracking: `stripe_registration_started`, `stripe_registration_completed`, `stripe_registration_abandoned`
- [ ] Error handling for webhook failures (retry mechanism, manual sync option)

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Figma: [Stripe Registration Flow - integration points only]
- Reference: Stripe Customer Portal default UI (https://stripe.com/docs/customer-management/customer-portal)
- Style: Stripe-hosted pages with our brand logo, colors configured in Stripe Dashboard

**User Flow:**

**Happy Path (Stripe Registration Completed):**
1. User completes registration on our platform → clicks "Continue to Subscription Setup"
2. System creates Stripe Customer Portal session with user's email pre-filled
3. User redirected to Stripe-hosted registration page (stripe.com/portal/...)
4. User creates Stripe account: sets password, enters payment details, confirms billing address
5. Stripe validates payment method and activates subscription (14-day trial if enabled)
6. Stripe redirects to our success_url: `https://my.reluna.family/#/onboarding-success`
7. Our backend receives webhook: `customer.subscription.created`
8. System updates user record: `stripe_customer_id`, `subscription_status = 'active'`
9. Constitution onboarding modal opens at Step 1 (User Profile)

**Alternate Path (Stripe Registration Abandoned):**
1. User completes registration on our platform → clicks "Continue to Subscription Setup"
2. User redirected to Stripe Customer Portal session
3. User closes browser tab or clicks "Cancel" in Stripe portal
4. Stripe redirects to our cancel_url: `https://my.reluna.family/#/dashboard`
5. Dashboard displays banner: "Complete subscription setup to unlock all features"
6. User clicks banner CTA → system generates new Stripe session → repeat flow

**Integration Points:**
- **success_url:** `https://my.reluna.family/#/onboarding-success?session_id={CHECKOUT_SESSION_ID}`
- **cancel_url:** `https://my.reluna.family/#/dashboard?registration=incomplete`
- **Stripe branding:** Logo, primary color, business name configured in Stripe Dashboard
- **Pre-filled data:** Email address, customer name (if available from OAuth)

---

## 🔒 Business Rules

**Validation Rules:**

1. **Stripe Customer Portal Session Creation:**
   - Requires valid user email (from registration)
   - Session valid for 24 hours only
   - One active session per user (invalidate previous if new created)
   - Price ID configured: `price_xxx` (monthly/annual subscription)

2. **Subscription Activation:**
   - Payment method validated by Stripe (automatic)
   - 14-day trial period activated (if configured in Stripe product)
   - Subscription status: `trialing` → `active` after trial
   - First charge scheduled for trial end date

3. **Feature Access:**
   - **Without Stripe registration:** Dashboard access, read-only constitution view, limited features
   - **With active subscription:** Full platform access, constitution editing, all modules unlocked
   - **Trial period:** Full access during trial, payment required before trial ends

4. **Webhook Event Handling:**
   - `customer.created`: Store `stripe_customer_id` in user record
   - `customer.subscription.created`: Update subscription status to `active` or `trialing`
   - `payment_method.attached`: Mark payment method as added
   - `customer.subscription.updated`: Sync subscription status changes
   - `customer.subscription.deleted`: Mark subscription as `canceled`

**Authorization:**
- **Who can perform this action:** Family Administrator only (first user registering family)
- **Who can view results:** Same user who completed Stripe registration

**Edge Cases:**
- **Webhook delivery failure:** Implement retry mechanism (3 attempts), manual sync button in admin panel
- **Duplicate webhook events:** Idempotency key handling (Stripe event ID)
- **User closes browser during Stripe flow:** Session expires, can restart from dashboard banner
- **Payment declined during trial end:** Stripe sends `invoice.payment_failed` event, display payment update prompt
- **Multiple Stripe sessions created:** Only most recent session valid, previous invalidated

---

## 🧪 Test Scenarios

**Happy Path:**
1. Register new family → click "Continue to Subscription Setup"
2. Redirected to Stripe Customer Portal (verify pre-filled email)
3. Complete Stripe registration with test card (4242 4242 4242 4242)
4. Redirected back to platform → verify constitution onboarding opens at Step 1
5. Verify database: `stripe_customer_id` saved, `subscription_status = 'active'`
6. Verify webhook received: `customer.subscription.created`

**Negative Tests:**
1. **Invalid Stripe session:** Manually construct invalid session URL → error "Session expired or invalid"
2. **Webhook signature invalid:** Send webhook with wrong signature → reject event (403)
3. **Duplicate webhook:** Send same webhook twice → process only once (idempotency)
4. **Network timeout during redirect:** Simulate timeout → show error, provide retry button

**Edge Cases:**
1. **Abandon Stripe registration:** Close Stripe portal tab → return to dashboard → banner displayed
2. **Restart registration from banner:** Click banner CTA → new Stripe session generated → redirect to Stripe
3. **Session expiration:** Wait 24 hours → try to use old session URL → error "Session expired"
4. **Trial expiration:** Fast-forward to trial end → Stripe attempts charge → if failed, subscription status = `past_due`

**Test Cases Location:** `Knowledge-Base/product-management/test-cases/EPIC-SAAS-001-test-cases.md`

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** 
  - SAAS-XXX - OAuth registration implementation (Google/Apple/LinkedIn)
  - SAAS-YYY - Stripe API integration backend setup (Customer Portal API)
  - SAAS-ZZZ - Webhook endpoint implementation for Stripe events
- **Blocks:** 
  - SAAS-AAA - Constitution onboarding Step 1 (User Profile) - requires subscription status check

**External Dependencies:**
- **Stripe Customer Portal API:** Session creation, customer management
- **Stripe Webhooks:** Event notifications for subscription lifecycle
- **Stripe Products/Prices:** Pre-configured subscription plans

---

## ⚠️ Non-Functional Requirements

**Performance:**
- Stripe Customer Portal session creation: < 1 second
- Redirect to Stripe: < 500ms
- Webhook processing time: < 2 seconds (async job queue)
- Return redirect from Stripe: < 1 second

**Security:**
- **PCI DSS Compliance:** Fully handled by Stripe (no payment data touches our servers)
- **Webhook signature verification:** Required for all webhook events (prevent spoofing)
- **HTTPS only:** All redirects and callbacks over HTTPS
- **Customer Portal session security:** One-time use, expires after 24 hours
- **Authorization required:** Only Family Administrator can initiate Stripe registration

**Accessibility:**
- Stripe Customer Portal: WCAG 2.1 Level AA compliant (Stripe-managed)
- Our platform: Ensure success/cancel pages are accessible
- Screen reader announcements for redirect messages

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Edge: Latest 2 versions
- Mobile browsers: iOS Safari, Android Chrome

**Technical Notes:**
- **Stripe Customer Portal API:** https://stripe.com/docs/api/customer_portal/sessions
- **Webhook endpoint:** `POST /api/webhooks/stripe` (payment-service, port TBD)
- **Webhook events to handle:** 
  - `customer.created`
  - `customer.subscription.created`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
  - `payment_method.attached`
  - `invoice.payment_failed`
- **Database fields to add:**
  - `users.stripe_customer_id` (VARCHAR, indexed)
  - `families.subscription_status` (ENUM: trialing, active, past_due, canceled)
  - `families.subscription_id` (VARCHAR, Stripe subscription ID)
  - `families.trial_end_date` (TIMESTAMP)
- **Environment variables:**
  - `STRIPE_PUBLISHABLE_KEY`
  - `STRIPE_SECRET_KEY`
  - `STRIPE_WEBHOOK_SECRET`
  - `STRIPE_PRICE_ID` (monthly subscription)
- **Frontend redirect handling:** `frontend/react-app/src/pages/OnboardingSuccess.jsx`
- **Backend session creation:** Payment service endpoint `POST /api/payments/create-portal-session`

**Stripe Configuration Checklist:**
- [ ] Create Product in Stripe Dashboard (e.g., "Family Governance Platform")
- [ ] Create Price for Product (e.g., $49/month, 14-day trial)
- [ ] Enable Customer Portal in Stripe Dashboard
- [ ] Configure Customer Portal branding (logo, colors, business name)
- [ ] Set up webhook endpoint and verify signature
- [ ] Configure success_url and cancel_url in session creation
- [ ] Test with Stripe test mode before production

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-17
