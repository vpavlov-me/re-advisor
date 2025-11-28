---
story_id: "FG-008"
epic: "EPIC-007"
title: "Email Notifications for Payment Setup Status"
priority: "medium"
sprint: "Week 4"
story_points: "5"
---

# User Story: Email Notifications for Payment Setup Status

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Consultant, I want to receive email notifications when my payment account verification status changes, so that I know immediately when I can start accepting bookings
**Epic Link:** EPIC-007 - Stripe Connect Payment Setup for Consultants
**Priority:** Medium
**Story Points:** 5
**Sprint:** Week 4

---

## 📖 User Story

**As a** Consultant,
**I want to** receive email notifications when my payment account verification status changes (verified, failed, or requires action),
**so that** I don't need to repeatedly check dashboard and know immediately when I'm ready to accept bookings.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point being solved:**
- Consultants repeatedly check dashboard for verification status ("Am I verified yet?")
- Delayed awareness of verification completion reduces time-to-first-booking
- Verification failures go unnoticed, causing lost booking opportunities
- Uncertainty creates anxiety and reduces platform trust

**Business outcome expected:**
- Reduce time-to-first-booking by notifying immediately when verified
- Reduce support inquiries about verification status
- Increase consultant engagement through timely communication
- Build trust through proactive notification of issues

**Strategic alignment:**
- Improves consultant activation and engagement
- Reduces friction in marketplace enablement
- Enhances overall consultant experience

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** consultant completes Stripe onboarding and status changes to 'pending',
   **When** webhook updates status,
   **Then** system sends "Verification Submitted" email to consultant.

2. **Given** consultant's verification completes successfully (status='active'),
   **When** webhook updates status,
   **Then** system sends "Payment Account Verified ✓" email with next steps.

3. **Given** consultant's verification fails (status='failed'),
   **When** webhook updates status,
   **Then** system sends "Verification Failed" email with error details and "Update Payment Info" link.

4. **Given** consultant resumes incomplete setup and completes it,
   **When** status changes from 'initiated' to 'pending',
   **Then** system sends "Verification Submitted" email.

5. **Given** consultant updates payment info triggering re-verification,
   **When** status changes to 'pending',
   **Then** system sends "Re-Verification In Progress" email.

**Additional Criteria:**
- [ ] Emails are mobile-responsive and render correctly in major email clients
- [ ] Emails include clear call-to-action buttons (View Dashboard, Update Info)
- [ ] Emails are personalized with consultant's name
- [ ] Unsubscribe link included (with note that critical payment emails cannot be disabled)
- [ ] Email delivery tracked (sent, delivered, opened, clicked)
- [ ] Consultant can preview email templates in notification preferences

---

## 🔐 Business Rules

**Validation Rules:**
1. **Email Trigger Rules**:
   ```
   Status Change       | Email Sent
   -------------------|------------------------------------------
   not_started → initiated | No email (setup in progress)
   initiated → pending     | "Verification Submitted"
   pending → active        | "Payment Account Verified ✓"
   pending → failed        | "Verification Failed"
   active → pending        | "Re-Verification In Progress"
   failed → pending        | "Verification Resubmitted"
   ```

2. **Email Content Rules**:
   - Subject line: Clear and actionable
   - Greeting: Personalized with consultant name
   - Status explanation: Plain language, no jargon
   - Call-to-action: Single, prominent button
   - Support link: Always include "Need help?" link
   - Unsubscribe: Footer with preferences link

3. **Delivery Rules**:
   - Send within 5 minutes of status change
   - Retry failed sends (3 attempts with exponential backoff)
   - Track delivery status (sent, delivered, bounced, opened, clicked)
   - Log all email events for debugging

**Authorization:**
- **Who receives emails:** Consultants only (email from profile)
- **Opt-out:** Critical payment emails cannot be disabled (required for business)

**Edge Cases:**
- **Email bounce**: Log bounce, flag consultant profile, send in-app notification
- **Multiple status changes rapidly**: Debounce to send most recent status only
- **Consultant changes email mid-verification**: Send to new email with verification
- **Re-verification after initial verification**: Different email template

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Figma: [Link to Email Template designs]
- Mobile and desktop email views

**Email Template 1: Verification Submitted**
```
Subject: Your Payment Account is Being Verified

Hi [Consultant Name],

Great news! We've received your payment account information
and Stripe is now verifying your details.

✅ Bank account submitted
✅ Tax identification submitted

⏱️  Verification typically takes 1-3 business days.
We'll notify you as soon as your account is approved.

[View Dashboard]

Need help?
Visit our Help Center or contact support.

---
You're receiving this email because you set up a payment
account on Family Governance Platform.
```

**Email Template 2: Payment Account Verified**
```
Subject: ✓ Your Payment Account is Ready!

Hi [Consultant Name],

Congratulations! Your payment account has been verified
and you're ready to start accepting paid bookings.

✅ Account verified
✅ Ready to receive payments
✅ Marketplace profile can now go live

What's next?
1. Publish your marketplace profile
2. Set your service pricing
3. Start accepting family bookings

[Publish Marketplace Profile] [View Dashboard]

Need to update your bank details?
You can update your payment information anytime from your
dashboard.

---
You're receiving this email because you set up a payment
account on Family Governance Platform.
```

**Email Template 3: Verification Failed**
```
Subject: Action Required: Payment Account Verification Failed

Hi [Consultant Name],

We need your help to complete payment account setup.

❌ Verification failed
Reason: [Stripe error message in plain language]

Common reasons:
• Bank account number or routing number incorrect
• Name on bank account doesn't match profile
• Tax ID verification failed

What to do:
1. Check your bank account details
2. Verify your tax ID (EIN or SSN)
3. Update your information

[Update Payment Info] [View Dashboard]

Need help?
Our support team can guide you through verification.
Contact support or visit Help Center.

---
You're receiving this email because you set up a payment
account on Family Governance Platform.
```

**Email Template 4: Re-Verification In Progress**
```
Subject: Your Payment Information is Being Re-Verified

Hi [Consultant Name],

Thanks for updating your payment information. Stripe is
now verifying your new details.

🔄 Re-verification in progress
✅ You can continue accepting bookings during verification
⏱️  Typically takes 1-2 business days

We'll notify you once re-verification is complete.

[View Dashboard]

---
You're receiving this email because you updated payment
account information on Family Governance Platform.
```

**Key UX Principles:**
- **Clarity**: Plain language, no technical jargon
- **Action-oriented**: Clear next steps with prominent CTA
- **Reassurance**: Set expectations for timing
- **Mobile-first**: Responsive design, large touch targets
- **Trust-building**: Professional tone, helpful resources

---

## 🧪 Test Scenarios

**Happy Path:**
1. Consultant completes Stripe onboarding
2. Webhook updates status to 'pending'
3. Notification service triggers "Verification Submitted" email
4. Email delivered to consultant's email address
5. Consultant receives email within 5 minutes
6. Email renders correctly on mobile and desktop
7. Consultant clicks "View Dashboard" link
8. After 2 days, webhook updates status to 'active'
9. Notification service triggers "Payment Account Verified" email
10. Consultant receives email and publishes marketplace profile

**Negative Tests:**
1. **Email Delivery Fails:**
   - Given: Email service returns error (bounce, invalid address)
   - When: Notification service attempts send
   - Then: Log error, retry 3 times with exponential backoff, flag consultant profile

2. **Multiple Status Changes Rapidly:**
   - Given: Status changes pending → active within 30 seconds
   - When: Both webhooks processed
   - Then: Debounce emails, send only "Payment Account Verified" (most recent)

3. **Consultant Email Invalid:**
   - Given: Consultant email = "invalid@invalid"
   - When: Email send attempted
   - Then: Email bounces, log error, send in-app notification instead

**Edge Cases:**
1. **Consultant Changes Email Mid-Verification:**
   - Given: Consultant updates email in profile after submitting onboarding
   - When: Verification completes
   - Then: Send email to NEW email address

2. **Re-Verification vs Initial Verification:**
   - Given: Consultant updates bank account (triggers re-verification)
   - When: Webhook updates status to 'pending'
   - Then: Send "Re-Verification In Progress" email (different template)

3. **Multiple Failed Verification Attempts:**
   - Given: Consultant's verification fails 3 times
   - When: Each failure triggers email
   - Then: All 3 emails sent (important to notify each time)

---

## 📗 Dependencies

**Story Dependencies:**
- **Blocked by:**
  - FG-005 (Webhook Processing) - status changes trigger notifications
- **Blocks:** None (enhancement of existing flow)

**Technical Dependencies:**
- Email service configured (SendGrid, AWS SES, or similar)
- Email templates designed and approved
- Notification service
- Email tracking integration (optional but recommended)

**External Dependencies:**
- Email service provider availability
- Email delivery infrastructure (DNS, SPF, DKIM)

---

## ⚠️ Non-Functional Requirements

**Security:**
- **No authentication required** for sending (triggered by system events)
- **Data encryption:** Email content contains no sensitive data (no bank details)
- **PII handling:** Consultant name and email only
- **Unsubscribe handling:** Required by CAN-SPAM, track preferences

**Performance:**
- Email sending: < 5 seconds per email
- Delivery time: < 5 minutes from status change
- Retry on failure: 3 attempts with exponential backoff
- Batch processing: If multiple consultants verify simultaneously

**Reliability:**
- Delivery success rate target: >98%
- Bounce rate target: <2%
- Open rate target: >40% (industry average for transactional emails)
- Click-through rate target: >20%

**Browser Support:**
- Email clients: Gmail, Outlook, Apple Mail, Yahoo Mail, Mobile clients
- Responsive design: Works on all screen sizes

---

## 📝 Notes

**Email Templates:**
Four primary email types:
1. Verification Submitted - Confirmation that onboarding received
2. Payment Account Verified - Ready to accept bookings
3. Verification Failed - Action required with guidance
4. Re-Verification In Progress - Update confirmation

**Trigger Logic from Webhook Processing (FG-005):**
When payment status changes, system:
1. Detects status change (old status → new status)
2. Determines appropriate email template
3. Sends email to consultant
4. Tracks delivery status

**Debouncing Strategy:**
Prevent duplicate emails within 30-second window:
- If multiple status changes occur rapidly
- Send only most recent status email
- Prevents email spam during system updates

**Error Message Formatting:**
Map payment processor error codes to user-friendly messages:
- Bank account verification failed → "Please check your account and routing numbers"
- Tax ID invalid → "Please verify your EIN or SSN is correct"
- Identity verification failed → "You may need to upload a government-issued ID"
- Unsupported country → "Your country is not currently supported"

**Analytics Events:**
Track email engagement:
- Payment Status Email Sent (with status and template)
- Payment Status Email Opened (with timestamp)
- Payment Status Email Clicked (with link and timestamp)
- Payment Status Email Bounced (with reason)

**Unsubscribe Handling:**
Note in email footer:
"You're receiving this email because you set up a payment account.
These critical payment emails cannot be disabled, but you can
manage other notification preferences."

Consultant can disable non-critical emails but NOT payment status emails (required for business operations).

**Monitoring:**
- Track email delivery success rate (target: >98%)
- Alert if bounce rate >5% (indicates email infrastructure issue)
- Track email engagement (opens, clicks) to optimize content
- Alert if email sending fails for >10 consultants (service outage)

**Open Questions:**
- [ ] Should system send reminder email if consultant doesn't resume incomplete setup within 7 days?
  - **Recommendation:** Yes, gentle reminder with "Resume Setup" link
- [ ] Should system send weekly digest of payment account status?
  - **Recommendation:** No, only send on status changes (avoid spam)
- [ ] Should email include estimated re-verification completion date?
  - **Recommendation:** Yes, calculate based on submission time (1-2 days)

---

**Story Version:** 1.0.0
**Last Updated:** 2025-10-23
**Status:** Ready for Development
