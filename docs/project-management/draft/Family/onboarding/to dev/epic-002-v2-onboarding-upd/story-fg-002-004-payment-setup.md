## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a new user, I want to set up payment during registration
**Epic Link:** FG-EPIC-002-V2-onboarding-upd [Onboarding Flow v2.0 - Registration Restructure & Enhanced Setup Wizard]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** new user who has just verified my email,
**I want to** set up my payment method using Stripe during registration,
**so that** I don't experience friction later when accessing premium features.

**Example:**
- **As a** new user,
- **I want to** add my credit card securely through Stripe after email verification,
- **so that** I can immediately access the full platform without payment interruptions later.

---

## 🎯 Business Context

**Why is this Story important?**

Moving payment setup to registration flow addresses critical business needs:
- **User pain point:** Users in v1 encountered payment walls mid-workflow, causing abandonment
- **Business outcome:** Reduced payment abandonment rates (target 90% completion) and improved revenue collection
- **Strategic alignment:** Upfront payment reduces churn and ensures committed users proceed to onboarding

Data shows: Setting up payment early increases lifetime value by 40% compared to delayed payment collection.

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** I successfully verify my email,
   **When** verification completes,
   **Then** I'm automatically redirected to payment setup screen.

2. **Given** I'm on the payment setup screen,
   **When** the page loads,
   **Then** I see Stripe payment form with secure card input fields (card number, expiry, CVC) and "Add Payment Method" button.

3. **Given** I enter valid payment details,
   **When** I click "Add Payment Method",
   **Then** Stripe securely processes my payment method and I see success message "Payment method added successfully".

4. **Given** payment method is successfully added,
   **When** success message displays,
   **Then** I'm automatically redirected to onboarding Step 1 (User Profile) after 2 seconds.

5. **Given** I am an Administrator and on payment setup screen,
   **When** I click "Skip for now" link,
   **Then** payment setup is skipped and I proceed to onboarding with a "Payment Required" badge visible on my account.

6. **Given** I enter invalid payment details (expired card),
   **When** I submit,
   **Then** I see Stripe error message "Your card has expired" and can retry.

**Additional Criteria:**
- [ ] Stripe Elements UI integrated for PCI compliance (platform never handles raw card data)
- [ ] Payment method stored securely in Stripe (no card details in platform database)
- [ ] "Secure payment by Stripe" badge displayed for user trust
- [ ] Support major card types (Visa, Mastercard, Amex, Discover)
- [ ] Mobile-optimized payment form (responsive design)
- [ ] Skip option only visible to Administrator role

---

## 🔒 Business Rules

**Validation Rules:**
1. **Payment Method Requirements:**
   - Card number: 13-19 digits, valid Luhn checksum
   - Expiry date: Must be future date (MM/YY format)
   - CVC: 3-4 digits depending on card type
   - All fields required (no optional payment fields)

2. **Authorization Rules:**
   - **Skip Option:** Only available to Family Administrator role
   - **Family Members / Council Members:** Must add payment method (no skip option)
   - **OAuth users:** Same payment requirements as email/password users

3. **Payment Processing:**
   - No charge applied during setup (authorization only)
   - Creates Stripe Customer ID and stores payment method
   - Payment method becomes default for future charges
   - User can update payment method later in account settings

**Authorization:**
- **Who can perform this action:** All verified users (post-email verification)
- **Who can skip:** Family Administrator only
- **Who can view results:** User themselves (payment status in account settings)

**Edge Cases:**
- **Card declined:** Show Stripe error message, allow retry with different card
- **Network timeout during Stripe call:** Show "Processing..." loader, retry automatically (up to 3 attempts)
- **User closes browser during processing:** Resume payment setup on next login
- **Already has payment method (returning user):** Skip payment setup, redirect to onboarding
- **Multiple family admins:** Each admin can skip independently for their account

---

## 📐 Design & UX

**Mockups/Wireframes:**
- Figma: https://www.figma.com/design/NWeSLJWw6iPinNILwPbsfv/-ReFamily--Web-Platofrm?node-id=3953-17905&t=UgPYb2pfH4R5d3VR-4
- Payment setup screen design

**User Flow:**
1. User verifies email → auto-redirected to payment setup screen
2. **Payment Setup Screen:**
   - Heading: "Add Payment Method"
   - Body text: "Secure your account with a payment method for platform access"
   - Stripe Elements form (Card Number, Expiry Date, CVC)
   - "Secure payment by Stripe" trust badge
   - "Add Payment Method" primary button
   - "Skip for now" link (Admin only)
3. User enters card details → clicks "Add Payment Method"
4. Stripe processes → success message "Payment method added!"
5. Auto-redirect to Onboarding Step 1 after 2 seconds

**Design Specifications:**
- **Stripe Elements Styling:** Match platform design system (colors, fonts, border radius)
- **Card Icons:** Show card type icons (Visa, Mastercard, etc.) as user types
- **Loading State:** Spinner overlay during Stripe processing
- **Error Display:** Red text below card input with specific Stripe error message
- **Trust Signals:**
  - Stripe logo
  - "PCI Compliant" badge
  - Lock icon next to "Secure payment"
  - "Your card details are never stored on our servers" text

---

## 🧪 Test Scenarios

**Happy Path:**
1. Complete email verification → verify redirect to payment setup screen
2. Enter valid card (4242 4242 4242 4242) → submit → verify success message
3. Verify redirect to Onboarding Step 1 after 2 seconds
4. Check database: Verify Stripe Customer ID and payment method ID stored

**Negative Tests:**
1. **Expired card (test card 4000 0000 0000 0069):** Verify error "Your card has expired"
2. **Insufficient funds card (4000 0000 0000 9995):** Verify error "Your card has insufficient funds"
3. **Invalid CVC:** Verify real-time validation error "Invalid security code"
4. **Incorrect card number:** Verify error "Your card number is invalid"
5. **Network timeout:** Verify retry logic (3 attempts) then show "Try again later" message

**Edge Cases:**
1. **Administrator clicks "Skip":** Verify redirect to onboarding with "Payment Required" badge on account
2. **Family Member tries to access "Skip" link (via URL manipulation):** Verify blocked, redirect back to payment form
3. **User has existing payment method (edge case: re-registration):** Verify payment setup skipped automatically
4. **Browser back button during Stripe processing:** Verify payment status checked on return, no duplicate charges
5. **Mobile device (iOS Safari):** Verify card input fields trigger numeric keyboard

**Stripe Test Cards:**
- Success: 4242 4242 4242 4242
- Declined: 4000 0000 0000 0002
- Expired: 4000 0000 0000 0069
- Processing error: 4000 0000 0000 0119

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** FG-002-003 (Email verification - must verify email before payment setup)
- **Blocks:** FG-002-005 (User profile creation - onboarding starts after payment)

**Technical Dependencies:**
- Stripe SDK (stripe.js v3)
- Stripe Elements for secure card input
- Backend API: `POST /payment/setup`, `GET /payment/status/:user_id`
- Stripe webhook handler for payment method updates
- Database table: `payment_setups` (user_id, stripe_customer_id, payment_method_id, setup_complete, setup_skipped)

**External Dependencies:**
- Stripe account with live API keys
- PCI compliance certification (handled by Stripe Elements)

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Stripe Elements load time: < 1 second
- Payment method submission: < 3 seconds (including Stripe API call)
- Page redirect after success: 2 seconds with countdown timer

**Security:**
- PCI DSS Level 1 compliance (via Stripe Elements)
- Platform never stores raw card data
- Stripe payment method IDs stored encrypted at rest
- HTTPS required for all payment pages
- Stripe webhook signatures validated
- Rate limiting: Max 5 payment attempts per user per hour

**Browser Support:**
- Chrome: 90+ (Stripe Elements support)
- Safari: 14+ (iOS 14+)
- Firefox: 88+
- Edge: 90+
- Note: Stripe Elements handles browser compatibility

**Accessibility:**
- WCAG 2.1 Level AA compliance
- Stripe Elements inherently accessible (keyboard navigation, screen reader support)
- Error messages announced to screen readers
- High contrast mode support

**Other:**
- Stripe API error handling with user-friendly messages
- Logging: All payment setup attempts (success/failure) logged for audit
- Monitoring: Track payment setup completion rates, error types
- SLA: 99.9% uptime (dependent on Stripe availability)

---

## 📝 Notes

**Technical Implementation:**
- Use Stripe Payment Intents API for future flexibility (supports SCA compliance)
- Store `stripe_customer_id` on user record for recurring billing
- Implement idempotency keys to prevent duplicate payment method creation
- Use Stripe webhooks to handle asynchronous payment method updates

**Stripe Elements Configuration:**
```javascript
const stripe = Stripe('pk_live_...');
const elements = stripe.elements();
const cardElement = elements.create('card', {
  style: {
    base: {
      fontSize: '16px',
      color: '#32325d',
      fontFamily: '"Inter", sans-serif'
    }
  }
});
```

**Skip Functionality Implementation:**
- Frontend: Show "Skip for now" link only if `user.role === 'admin'`
- Backend: `POST /payment/skip` validates user role before allowing skip
- Set `payment_setup.setup_skipped = true` in database
- Display "Payment Required" badge on account settings page

**Migration Considerations:**
- Existing v1 users without payment methods: Prompt payment setup on next login (with skip option for admins)
- Feature flag: Gradually roll out payment requirement
- A/B test: Registration with payment vs. without payment (conversion rate comparison)

**Open Questions:**
- Should we allow multiple payment methods per family (shared payment)?
- Do we need to support non-card payment methods (bank account, PayPal)?
- Should payment setup failure block onboarding access entirely, or allow limited trial?
- What happens if admin skips payment but later needs to make a charge?

**Assumptions:**
- Users have valid credit/debit card for payment
- Stripe has 99.9% uptime (minimal payment processing failures)
- Upfront payment setup increases user commitment without deterring registration
- Administrators need flexibility to skip payment for evaluation purposes

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-30
