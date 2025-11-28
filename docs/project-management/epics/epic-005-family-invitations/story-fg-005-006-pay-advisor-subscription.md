---
story_id: "STORY-FG-005-006"
title: "Pay for Advisor Subscription During Invitation"
type: "story"
epic_id: "EPIC-005"
created: "2025-10-15"
updated: "2025-10-20"
priority: "high"
status: "ready"
estimate: "12h"
story_points: 5
sprint: "Sprint 46"
assignee: ""
labels: ["family", "payment", "stripe", "advisor-subscription", "monetization", "checkout"]
dependencies: ["STORY-FG-005-005"]
architecture_refs: ["CLAUDE.md", ".claude/contexts/turbo.md", ".claude/contexts/backend.md"]
---

# User Story: US-INV-6 - Pay for Advisor Subscription During Invitation

> **Note:** This is a User Story for Jira FG (Family Governance) project. Copy relevant sections to Jira issue description.

---

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG (Family Governance)
**Summary:** As a Family Council member or Admin, I want to pay for my advisor's Advisor Portal subscription during invitation flow (if prompted), so that they can access the platform immediately upon registration
**Epic Link:** FG-98 - Advisor-Family Mutual Connection via Email Invitations (Bidirectional)
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** Sprint 4 (Phase 2)

---

## 📖 User Story

**As a** Family Council member or Admin,
**I want to** pay for my advisor's Advisor Portal subscription during invitation flow (if prompted),
**so that** they can access the platform immediately upon registration and start working with our family.

---

## 🎯 Business Context

**Why is this Story important?**

**User Pain Point:**
When families want to onboard their existing trusted advisors (lawyers, accountants, family therapists, financial advisors) onto the Family Governance Platform, the advisor may not already have an Advisor Portal account. Currently, there's no way for families to sponsor their advisor's subscription, creating friction in the onboarding process.

**Business Value:**
- **Eliminate onboarding friction:** Families can immediately sponsor advisor access without requiring advisor to sign up and pay separately
- **Faster time-to-value:** Advisor can start working with family immediately after registration (no payment delays)
- **Revenue generation:** Families pay for Advisor Seats (+$X/month for Personal Family Advisor, +$Y/month for External Consul)
- **Professional experience:** Seamless payment flow demonstrates platform sophistication and enterprise readiness
- **Increased conversion:** Removing payment burden from advisor increases invitation acceptance rates

**Strategic Alignment:**
- Supports B2C (Family Subscriptions) growth model through Advisor Seats add-ons
- Enables families to bring their full advisory team onto platform
- Creates network effects (more advisors = more value for families)

---

## ✅ Acceptance Criteria

### AC-1: Payment Screen Display

1. **Given** Family Council member or Admin has filled invitation form (email, name, role selected),
   **And** system determined payment is required (advisor doesn't exist),
   **When** they click "Continue" or "Next" on invitation form,
   **Then** they are redirected to **Payment Screen** with following elements:
   - Page title: "Complete Advisor Invitation"
   - Section header: "Payment Required - Advisor Seat"
   - Progress indicator showing: "Step 2 of 3: Payment" (or similar)

2. **Given** user is on Payment Screen,
   **When** page loads,
   **Then** they see **Subscription Summary Box** displaying:
   - **Advisor Name:** "[First Name] [Last Name]" (from invitation form)
   - **Advisor Email:** "[email@example.com]" (from invitation form)
   - **Advisor Role:** "Personal Family Advisor" OR "External Consul" (based on selection)
   - **Access Level:** "Single Family Access - [Your Family Name]"
   - **Module Access:** 
     - If Personal Family Advisor: "1-7 selected modules"
     - If External Consul: "All 10 modules"

3. **Given** user is on Payment Screen,
   **When** they view Subscription Summary Box,
   **Then** they see **Pricing Information**:
   - Billing frequency selector: [Monthly] / [Annual] (toggle or radio buttons)
   - Price display: 
     - If Personal Family Advisor + Monthly: "+$X/month added to your subscription"
     - If Personal Family Advisor + Annual: "+$Y/year added to your subscription"
     - If External Consul + Monthly: "+$Z/month added to your subscription"
     - If External Consul + Annual: "+$W/year added to your subscription"
   - Small text: "Billed [monthly/annually] starting today. Cancel anytime."

4. **Given** user is on Payment Screen,
   **When** they scroll down,
   **Then** they see **What's Included** section explaining:
   - "Your advisor will receive:"
   - ✓ Dedicated Advisor Portal access
   - ✓ Access to [Your Family Name]'s governance tools
   - ✓ Real-time collaboration with family members
   - ✓ [Module list based on role selection]
   - Small note: "This is an Advisor Seat subscription. Advisor can work only with your family. To work with multiple families, advisor can upgrade to Consultant Subscription later."

### AC-2: Payment Form

5. **Given** user is on Payment Screen,
   **When** they scroll to payment section,
   **Then** they see **Payment Form** with:
   - Section header: "Payment Details"
   - Stripe payment element (credit card input fields)
   - Accepted payment methods icons (Visa, Mastercard, Amex, etc.)
   - Fields: Card number, Expiration date, CVC, ZIP code (Stripe standard fields)
   - Checkbox: "Save payment method for future purchases" (optional, checked by default)

6. **Given** user is viewing Payment Form,
   **When** they see buttons section,
   **Then** they see:
   - **Primary button:** "Complete Payment & Send Invitation" (prominent, call-to-action styling)
   - **Secondary button:** "Back" or "Cancel" (less prominent)
   - **Link text below:** "By completing payment, you agree to [Terms of Service] and [Subscription Agreement]"

### AC-3: Payment Validation

7. **Given** user clicks "Complete Payment & Send Invitation",
   **When** they haven't filled all required payment fields,
   **Then**:
   - Form shows inline validation errors (Stripe standard errors)
   - Error messages appear below invalid fields (e.g., "Card number is invalid", "Expiration date is required")
   - Primary button remains enabled (allow retry)
   - No navigation occurs

8. **Given** user has filled all payment fields correctly,
   **When** they click "Complete Payment & Send Invitation",
   **Then**:
   - Button changes to loading state: "Processing..." (with spinner icon)
   - Form fields become disabled (prevent double submission)
   - User cannot navigate away (show confirmation dialog if they try)

### AC-4: Payment Success Flow

9. **Given** payment is processing,
   **When** payment succeeds,
   **Then**:
   - User is redirected to **Invitation Success Page**
   - Success page displays:
     - ✓ Checkmark icon
     - Heading: "Payment Successful!"
     - Subheading: "Invitation Sent to [Advisor Name]"
     - Message: "We've sent an email to [advisor@email.com] with instructions to complete registration. They'll have access to your family's portal as soon as they verify their email."
     - **Action buttons:**
       - Primary: "Back to Advisor Management" (redirect to advisor list page)
       - Secondary: "Invite Another Advisor" (redirect to invitation form)

10. **Given** payment succeeded,
    **When** user is on Invitation Success Page,
    **Then** they see **Next Steps** section:
    - "What happens next?"
    - 1. [Advisor Name] will receive an email invitation
    - 2. They'll verify their email and complete registration
    - 3. You'll be notified when they join
    - 4. Advisor will appear in your Advisor List with "Pending Verification" status

11. **Given** payment succeeded,
    **When** user navigates to Advisor Management page (from Success Page or directly),
    **Then** they see newly invited advisor in list:
    - Status: "Pending Verification"
    - Badge: "Family-Sponsored"
    - Role: [Personal Family Advisor OR External Consul]
    - Email: [advisor@email.com]
    - Invited date: [Today's date]

### AC-5: Payment Error Handling

12. **Given** payment is processing,
    **When** payment fails (insufficient funds, card declined, etc.),
    **Then**:
    - User remains on Payment Screen (no navigation)
    - Loading state ends
    - Form fields become enabled again
    - **Error Alert** appears at top of Payment Form:
      - Red alert box with error icon
      - Heading: "Payment Failed"
      - Message: [Specific error from Stripe, e.g., "Your card was declined. Please try a different payment method."]
      - Dismiss button (X icon)
    - User can edit payment details and retry

13. **Given** payment failed,
    **When** user sees error alert,
    **Then** they have options:
    - Edit payment details and click "Complete Payment & Send Invitation" again (retry)
    - Click "Back" to return to invitation form (cancel)
    - Click "Cancel" to abort entire invitation process (show confirmation dialog)

14. **Given** payment failed multiple times (3+ attempts),
    **When** user sees error,
    **Then** error message includes:
    - Main error message (same as above)
    - Additional help text: "If issue persists, please contact support at [support@email.com] or try again later."
    - **Alternative action button:** "Contact Support" (opens support chat or email)

### AC-6: Cancel/Back Functionality

15. **Given** user is on Payment Screen,
    **When** they click "Back" or "Cancel" button,
    **Then**:
    - System shows confirmation dialog:
      - Heading: "Cancel Invitation?"
      - Message: "You haven't completed payment yet. Advisor invitation will not be sent. Are you sure you want to go back?"
      - Buttons: "Yes, Go Back" (primary), "No, Stay Here" (secondary)

16. **Given** user confirmed cancellation,
    **When** they click "Yes, Go Back",
    **Then**:
    - User is redirected back to invitation form
    - Form fields retain previously entered data (email, name, role)
    - User can edit and resubmit
    - No payment charge occurs
    - No database records created

### AC-7: Mobile Responsiveness

17. **Given** user is on mobile device (< 768px width),
    **When** they view Payment Screen,
    **Then**:
    - Subscription Summary Box stacks vertically (full width)
    - Payment Form fields stack vertically (full width)
    - Buttons stack vertically: "Complete Payment" on top, "Back" below
    - Stripe payment element adapts to mobile layout (Stripe standard responsive behavior)
    - All text remains readable without horizontal scroll

### AC-8: Loading States & Progress Feedback

18. **Given** user is on Payment Screen,
    **When** page is loading,
    **Then**:
    - Show skeleton loader for Subscription Summary Box
    - Show skeleton loader for Payment Form
    - Disable "Complete Payment" button until page fully loads

19. **Given** user clicked "Complete Payment & Send Invitation",
    **When** payment is processing,
    **Then**:
    - User sees clear progress feedback:
      - Button text changes to "Processing..." with animated spinner
      - Optional: Progress bar or loading overlay
      - Estimated time message: "This may take a few seconds..."

---

## 🎨 Design & UX

**User Flow:**

```
1. User on Invitation Form (US-INV-4)
   ↓ Clicks "Continue"
2. System checks if payment needed (US-INV-5)
   ↓ Payment required → redirect to:
3. 📍 PAYMENT SCREEN (THIS STORY)
   ├─ View Subscription Summary (advisor details, role, pricing)
   ├─ View What's Included
   ├─ Fill Payment Form (Stripe)
   ├─ Click "Complete Payment & Send Invitation"
   ↓
4. Payment Processing (loading state)
   ↓
5a. SUCCESS → Invitation Success Page
    ├─ See confirmation message
    ├─ View next steps
    ├─ Options: "Back to Advisors" OR "Invite Another"
    ↓ Navigate to:
6a. Advisor Management (see new advisor with "Pending" status)

5b. FAILURE → Stay on Payment Screen
    ├─ See error message
    ├─ Options: Retry payment OR Go back OR Cancel
```

**UX Principles:**
- **Transparency:** Clear breakdown of what family is paying for (advisor name, role, modules, price)
- **Trust:** Professional payment form with recognized Stripe branding
- **Guidance:** Clear next steps after payment success
- **Error handling:** Helpful error messages with actionable recovery options
- **Progress visibility:** User always knows where they are in invitation process
- **Flexibility:** Easy to go back/cancel without penalty before payment

**Copy Tone:**
- Professional and clear
- Reassuring (especially on payment screen)
- Celebratory on success page
- Helpful and supportive on error states

---

## 📐 Business Rules

### Pricing Rules

**BR-1: Advisor Seat Pricing**
- **Personal Family Advisor:**
  - Monthly: +$X/month added to family subscription
  - Annual: +$Y/year added to family subscription
- **External Consul:**
  - Monthly: +$Z/month added to family subscription
  - Annual: +$W/year added to family subscription
- **Note:** Actual pricing values to be determined by business team

**BR-2: Billing Frequency**
- Family can choose Monthly or Annual billing at time of payment
- Selection affects price display and subsequent billing
- Billing frequency can be changed later in subscription management (future feature)

**BR-3: Proration**
- If family already on monthly/annual billing cycle, advisor seat is prorated for current period
- Prorated amount calculated and charged immediately
- Next full charge occurs on family's regular billing date

### Payment Rules

**BR-4: Payment Method**
- Family uses payment method already on file for family subscription (if exists)
- OR family enters new payment method on Payment Screen
- Payment method can be saved for future use (checkbox option)
- Only one active payment method per family

**BR-5: Payment Validation**
- Minimum charge: No minimum (advisor seat price is the charge)
- Payment currency: USD (or family's subscription currency)
- Payment must succeed before invitation email sent
- Failed payment = no invitation sent, no database records created

**BR-6: Refund Policy**
- If advisor never registers: Family can request refund (manual process, contact support)
- If advisor registers and leaves within X days: Prorated refund available (business policy TBD)
- If family cancels advisor seat: No refund for current billing period (standard subscription terms)
- Refund requests handled via support, not automated in MVP

### Authorization Rules

**BR-7: Who Can Pay**
- Only users with `is_family_council = true` OR `is_admin = true` can access Payment Screen
- Regular family members cannot pay for advisor seats (no access to invitation flow)

**BR-8: Subscription Limit Validation**
- Family subscription must be active to add advisor seats
- If family subscription expired/cancelled: Cannot add advisor seats (show error, prompt to reactivate)
- No hard limit on number of advisor seats family can purchase (business can set soft limits later)

### Data Handling Rules

**BR-9: Payment Record Keeping**
- Payment transaction ID stored for audit trail
- Payment timestamp recorded
- Payment amount, currency, method stored
- Link payment to specific advisor invitation

**BR-10: Invitation Creation Timing**
- Database records (FamilyAdvisorAssociation, subscription) created ONLY after successful payment
- Email sent ONLY after successful payment
- If payment fails: No records created, invitation flow aborted

**BR-11: Advisor Access Timing**
- Advisor gets access ONLY after:
  1. Family pays successfully (this story)
  2. Advisor receives email (US-INV-7)
  3. Advisor verifies email and completes registration (US-INV-7)
- Access level: Single Family Only (cannot work with other families unless upgrades to Consultant Subscription)

---

## 🧪 Test Scenarios

### Happy Path

**Test Scenario 1: Successful Payment for Personal Family Advisor (Monthly)**

1. Family Council member invites new advisor
2. Selects role: "Personal Family Advisor"
3. System determines payment required
4. User lands on Payment Screen
5. **Verify:** Subscription Summary shows:
   - Advisor name, email from invitation form
   - Role: Personal Family Advisor
   - Pricing: "+$X/month"
6. User selects "Monthly" billing
7. User enters valid credit card details
8. User checks "Save payment method" (optional)
9. User clicks "Complete Payment & Send Invitation"
10. **Verify:** Button shows "Processing..." state
11. **Verify:** Payment succeeds
12. **Verify:** User redirected to Success Page
13. **Verify:** Success Page shows:
    - ✓ "Payment Successful!"
    - Advisor name and email
    - Next steps instructions
14. User clicks "Back to Advisor Management"
15. **Verify:** Advisor appears in list with:
    - Status: "Pending Verification"
    - Badge: "Family-Sponsored"
    - Role: Personal Family Advisor

**Test Scenario 2: Successful Payment for External Consul (Annual)**

1. Family Admin invites new advisor
2. Selects role: "External Consul"
3. System determines payment required
4. User lands on Payment Screen
5. **Verify:** Subscription Summary shows:
   - Role: External Consul
   - Pricing: "+$W/year"
6. User selects "Annual" billing
7. User enters valid payment details
8. User clicks "Complete Payment & Send Invitation"
9. **Verify:** Payment succeeds
10. **Verify:** Success Page displays correctly
11. **Verify:** Advisor in list with "External Consul" role

### Negative Tests

**Test Scenario 3: Payment Declined - Insufficient Funds**

1. User on Payment Screen
2. User enters card with insufficient funds (test card)
3. User clicks "Complete Payment & Send Invitation"
4. **Verify:** Payment fails
5. **Verify:** User remains on Payment Screen (no navigation)
6. **Verify:** Error alert appears:
   - "Payment Failed"
   - Error message: "Your card has insufficient funds. Please try a different payment method."
7. **Verify:** Form fields re-enabled
8. User enters different valid card
9. User clicks "Complete Payment" again
10. **Verify:** Payment succeeds on retry

**Test Scenario 4: Invalid Card Details**

1. User on Payment Screen
2. User enters invalid card number (e.g., "1234 5678")
3. User attempts to submit
4. **Verify:** Stripe inline validation shows error: "Card number is invalid"
5. **Verify:** "Complete Payment" button remains enabled (allow correction)
6. User corrects card number
7. **Verify:** Error clears
8. User completes payment successfully

**Test Scenario 5: User Cancels Payment**

1. User on Payment Screen
2. User clicks "Back" button
3. **Verify:** Confirmation dialog appears:
   - "Cancel Invitation?"
   - "You haven't completed payment yet. Advisor invitation will not be sent. Are you sure you want to go back?"
4. User clicks "Yes, Go Back"
5. **Verify:** User redirected to invitation form
6. **Verify:** Form fields retain previous data (email, name, role)
7. **Verify:** No payment charged
8. **Verify:** No advisor record created in database

**Test Scenario 6: Network Timeout During Payment**

1. User on Payment Screen
2. User enters valid payment details
3. User clicks "Complete Payment"
4. Simulate network timeout (slow connection)
5. **Verify:** User sees "Processing..." state for extended time
6. **Verify:** After timeout (30 seconds), error appears:
   - "Payment failed: Request timed out. Please try again."
7. **Verify:** User can retry payment

### Edge Cases

**Test Scenario 7: Family Subscription Expired During Payment**

1. User starts invitation flow
2. Family subscription expires during payment process
3. User attempts to complete payment
4. **Verify:** Payment fails with error:
   - "Your family subscription has expired. Please reactivate your subscription to add advisor seats."
5. **Verify:** Link/button to "Renew Subscription"

**Test Scenario 8: Advisor Registers Before Payment Completes**

1. Family sends invitation to advisor who already has Advisor Portal account (unlikely edge case)
2. Family on Payment Screen
3. Meanwhile, advisor independently creates account
4. Family attempts payment
5. **Verify:** System detects advisor now exists
6. **Verify:** Payment cancelled with message:
   - "This advisor has already registered on Advisor Portal. Payment not required. Sending connection request instead."
7. **Verify:** User redirected to invitation success (no payment)

**Test Scenario 9: Multiple Simultaneous Payments**

1. Family Council member and Admin both invite same advisor (unlikely, but possible)
2. Both land on Payment Screen simultaneously
3. First user completes payment successfully
4. Second user attempts payment
5. **Verify:** System prevents duplicate payment
6. **Verify:** Second user sees message:
   - "This advisor has already been invited by [User Name]. Payment completed. Advisor will receive invitation shortly."

**Test Scenario 10: Mobile Payment Flow**

1. User on mobile device (iPhone Safari)
2. User navigates to Payment Screen
3. **Verify:** Layout stacks vertically
4. **Verify:** Stripe payment form adapts to mobile
5. **Verify:** All buttons accessible without horizontal scroll
6. User completes payment successfully
7. **Verify:** Success Page displays correctly on mobile

---

## 📐 Business Rules (Summary Table)

| Rule ID | Category | Description |
|---------|----------|-------------|
| BR-1 | Pricing | Personal Family Advisor: +$X/month or +$Y/year |
| BR-1 | Pricing | External Consul: +$Z/month or +$W/year |
| BR-2 | Billing | Family chooses Monthly or Annual at payment time |
| BR-3 | Billing | Prorated charge for current period + full charge on next billing date |
| BR-4 | Payment | Use existing payment method or enter new |
| BR-5 | Payment | Payment must succeed before invitation sent |
| BR-6 | Refund | Refunds handled manually via support (no automated refunds in MVP) |
| BR-7 | Authorization | Only Family Council or Admin can pay |
| BR-8 | Validation | Family subscription must be active to add advisor seats |
| BR-9 | Data | Store payment transaction ID, timestamp, amount for audit |
| BR-10 | Timing | Create database records ONLY after successful payment |
| BR-11 | Access | Advisor gets Single Family Access after payment + registration |

---

## 🔗 Dependencies

**Story Dependencies:**

**Blocked By:**
- ✅ **US-INV-4 (FG-103)** - Family invitation form (must be complete to pass data to payment screen)
- ✅ **US-INV-5 (FG-104)** - Automatic payment detection (determines when to show payment screen)

**Blocks:**
- 🔲 **US-INV-7 (FG-105)** - Advisor receives email invitation (email sent only after successful payment)
- 🔲 **US-INV-8 (FG-106)** - Verification notifications (notifications sent after payment + registration complete)

**Related Stories:**
- **US-INV-2 (FG-99)** - Advisor subscription validation (similar validation logic, but for advisor side)
- **Future:** Subscription management page (where families manage advisor seats)

**External Dependencies:**
- **Stripe API Integration:** Payment processing requires Stripe account configuration
- **Pricing Data:** Business team must provide final pricing for Personal Family Advisor and External Consul seats
- **Subscription Service:** Must support adding advisor seats to family subscriptions
- **Email Service:** Must be configured to send invitation emails (US-INV-7)

---

## ⚠️ Non-Functional Requirements (Briefly)

### Performance

- **Payment screen load time:** < 2 seconds (including Stripe elements)
- **Payment processing time:** < 5 seconds for typical transactions
- **Success page redirect:** < 1 second after payment confirmation
- **Form validation response:** < 100ms (instant inline validation)

### Security

- **Payment data security:** 
  - All payment data handled by Stripe (PCI compliance)
  - No credit card details stored on Family Governance Platform servers
  - Stripe tokenization for payment methods
- **Authorization required:** Yes - Must be Family Council or Admin
- **HTTPS required:** All payment pages served over HTTPS
- **Session timeout:** Payment session expires after 30 minutes of inactivity

### Accessibility

- **WCAG level:** AA compliance required
- **Keyboard navigation:** Full keyboard support for payment form and buttons
- **Screen reader support:** 
  - All form fields have proper labels
  - Error messages announced to screen readers
  - Success/failure states clearly announced
- **Color contrast:** Minimum 4.5:1 ratio for all text
- **Focus indicators:** Visible focus states on all interactive elements

### Browser Support

- **Chrome:** Latest version + 2 previous versions
- **Safari:** Latest version + 2 previous versions (iOS Safari included)
- **Firefox:** Latest version + 1 previous version
- **Edge:** Latest version
- **Mobile browsers:** iOS Safari 14+, Chrome Mobile 90+

### Error Recovery

- **Payment failure retry:** Unlimited retries (user can try different payment methods)
- **Form data persistence:** If payment fails, form fields retain data (no re-entry required)
- **Session recovery:** If user accidentally closes tab during payment, can return and restart (invitation form data preserved)
- **Graceful degradation:** If Stripe unavailable, show clear error message with support contact

---

## 📝 Notes

### Open Questions (Resolved from Epic Chat)

✅ **Resolved Questions:**

1. **Q:** What are the exact pricing amounts for Personal Family Advisor and External Consul?
   - **A:** To be determined by business team (use placeholders $X, $Y, $Z, $W in mockups)

2. **Q:** Should we support multiple payment methods (credit card, ACH, wire transfer)?
   - **A:** MVP: Credit card only via Stripe. Future: ACH, wire transfer for large invoices

3. **Q:** What happens if family's primary subscription expires before advisor seat payment?
   - **A:** Payment blocked, show error message prompting family to reactivate subscription first

4. **Q:** Can family change billing frequency (monthly ↔ annual) later?
   - **A:** Yes, but not in MVP scope. Future feature in subscription management.

5. **Q:** What if advisor never completes registration after family pays?
   - **A:** Family can request refund via support. Future: Automated expiration after X days.

6. **Q:** Should we show estimated billing date on payment screen?
   - **A:** Yes - Show: "You'll be charged [amount] today, then every [month/year] on [date]"

7. **Q:** How to handle failed payments after retry limit?
   - **A:** No hard retry limit in UI. If persistent failures, suggest contacting support.

8. **Q:** Should payment confirmation email be sent to family?
   - **A:** Yes - Family receives payment receipt email (separate from advisor invitation email)

### Future Enhancements (Out of MVP Scope)

- **Bulk advisor invitations:** Pay for multiple advisors in one transaction
- **Discounts/promotions:** Apply promo codes to advisor seat subscriptions
- **Invoice generation:** Download PDF invoices for accounting purposes
- **Saved payment methods:** Manage multiple payment methods, select at checkout
- **Alternative payment methods:** ACH, wire transfer, PayPal
- **Subscription upgrades:** Upgrade advisor from Personal Family Advisor to External Consul
- **Pause/unpause advisor seats:** Temporarily suspend advisor access without cancellation
- **Automated refunds:** If advisor doesn't register within X days, automatic refund

### Technical Considerations (For Dev Team Reference)

- Use Stripe Payment Element for PCI compliance and modern UX
- Implement idempotency keys to prevent duplicate charges
- Store Stripe Payment Intent ID for payment tracking and debugging
- Consider Stripe webhook integration for payment status updates
- Implement client-side and server-side payment validation
- Use Stripe test mode for development/staging environments
- Handle 3D Secure (SCA) authentication flows for European cards

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-20
**Story Author:** Product Team
**Related Epic:** FG-98 - Advisor-Family Mutual Connection via Email Invitations (Bidirectional)
**Phase:** Phase 2 (Family → Advisor Path)
**Sprint:** Sprint 4