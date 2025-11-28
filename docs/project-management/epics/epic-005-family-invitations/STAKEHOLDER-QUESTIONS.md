---
epic_id: "EPIC-005"
title: "Stakeholder Questions - Advisor-Family Email Invitations"
type: "decision-log"
status: "awaiting-decisions"
created: "2025-10-20"
owner: "Eduard Izgorodin"
stakeholder: "Product Team"
---

# 🔴 CRITICAL QUESTIONS - Require Immediate Decision

## Q1: Advisor Registration Model - OAuth vs Email?

**Question:** Should STORY-FG-001 (Advisor OAuth Registration - from another epic) include subscription selection on the same form, or should it be a separate subscription step?

**Context:**
- Advisors invited by families need to register on Advisor Portal
- Registration flow includes: OAuth (Google/Apple) → Profile completion → Subscription selection → Payment
- Need to decide: integrated flow vs multi-step flow
- Affects invitation UX and conversion rates

**Options:**

### Option A: Combined Form (OAuth + Subscription + Payment) - (Recommended ✅)
- **Description:** Single-page flow with all steps visible
- **Pros:**
  - ✅ Lower abandonment rate (fewer steps to drop out)
  - ✅ Modern SaaS pattern (Stripe, Notion use this)
  - ✅ Faster time-to-activation
  - ✅ Clear value proposition upfront
- **Cons:**
  - ⚠️ More complex UI/UX design
  - ⚠️ Longer initial page load
  - ⚠️ More state management complexity

### Option B: Separate Steps (OAuth → Subscription → Payment)
- **Description:** Multi-step wizard with progress indicator
- **Pros:**
  - ✅ Simpler to implement
  - ✅ Easier to test each step
  - ✅ Less overwhelming for users
- **Cons:**
  - ❌ Higher abandonment rate (more friction)
  - ❌ More clicks required
  - ❌ Users may skip subscription selection

**Lana's Recommendation:** **Option A (Combined Form)**
- Industry best practice for conversion optimization
- Family-sponsored invitations need immediate activation
- Technical complexity manageable with proper state management

**Impact on Stories:**
- **FG-005-001:** Cannot finalize invitation flow without knowing target registration UX
- **FG-005-003:** Email template content depends on what user will see after clicking link
- **FG-005-007:** Same issue for advisor receiving family invitation

**Estimated Effort:**
- Option A: 16-24 hours (more complex UI)
- Option B: 12-16 hours (simpler wizard)

**Decision Required By:** Sprint 45 Planning (Week 1)

**Decision Maker:** Product Owner + UX Lead

**Decision:**
- [ ] Option A - Combined form (Recommended)
- [ ] Option B - Separate steps
- [ ] Other: ___________________

**Date Decided:** ___________
**Decided By:** ___________
**Notes:** ___________

---

## Q2: Stripe Integration Scope

**Question:** Are Stripe products/prices already configured for Advisor Seats, or must we create them as part of this epic?

**Context:**
- Need pricing for:
  - Personal Family Advisor seat (+$X/month per family)
  - External Consul seat (+$Y/month per family)
  - Consultant Advisor subscription (Base + per-family add-ons)
- FG-005-006 requires Stripe Checkout integration
- FG-005-002 needs to check subscription limits

**Current Understanding:**
- Stripe integration exists for family subscriptions
- Unclear if Advisor Seats products are configured
- May need to create new SKUs in Stripe dashboard

**Options:**

### Option A: Use Existing Stripe Configuration
- **Description:** Reference existing Advisor Seats products
- **Pros:**
  - ✅ Faster development (just API integration)
  - ✅ No Stripe dashboard setup required
  - ✅ Consistent with existing pricing
- **Cons:**
  - ⚠️ May not exist yet (needs verification)
  - ⚠️ May not match new invitation model

### Option B: Create New Stripe Products (Recommended ✅)
- **Description:** Set up Advisor Seats as separate SKU/add-ons
- **Pros:**
  - ✅ Clear monetization structure
  - ✅ Flexible pricing model
  - ✅ Separate billing from base subscription
  - ✅ Future-proof for pricing changes
- **Cons:**
  - ⚠️ Requires Stripe dashboard configuration (2-4 hours)
  - ⚠️ Need to define pricing structure

**Lana's Recommendation:** **Verify first, then Option B if missing**
- Check with Backend Lead if Advisor Seats products exist
- If not, create them with clear naming convention
- Use Stripe's add-on/metered billing for per-family charges

**Required Stripe Products:**
```
1. advisor_seat_personal_family_advisor
   - Type: Recurring add-on
   - Price: $X/month per seat
   - Metadata: { role: "Personal Family Advisor", access_level: "full" }

2. advisor_seat_external_consul
   - Type: Recurring add-on
   - Price: $Y/month per seat
   - Metadata: { role: "External Consul", access_level: "limited" }

3. consultant_base_subscription
   - Type: Base plan
   - Price: $Z/month
   - Includes: 3 family connections
   - Add-ons: Additional family seats
```

**Decision Required By:** Sprint 45 Week 1 (before FG-005-002 starts)

**Decision Maker:** Backend Lead + Product Owner

**Action Items:**
- [ ] Backend Lead: Verify existing Stripe configuration
- [ ] If missing: Product Owner approves pricing structure
- [ ] If missing: Backend Lead creates Stripe products

**Decision:**
- [ ] Option A - Use existing configuration
- [ ] Option B - Create new products (if missing)
- [ ] Configuration verified - exists: _____ / missing: _____

**Date Decided:** ___________
**Decided By:** ___________
**Notes:** ___________

---

## Q3: Email Service Configuration

**Question:** Is turbo_mail service (port 8017) ready for production email sending? What template system should we use - MJML vs plain HTML?

**Context:**
- Need to send 2 types of invitation emails:
  - FG-005-003: Advisor invites family (email to family member)
  - FG-005-007: Family invites advisor (email to advisor)
- Email deliverability critical (target >95% delivery rate)
- Template maintenance and cross-client compatibility important

**Options:**

### Option A: MJML Templates (Recommended ✅)
- **Description:** Use MJML framework for email templates
- **Pros:**
  - ✅ Better email client compatibility (Outlook, Gmail, Apple Mail)
  - ✅ Higher deliverability (proper HTML structure)
  - ✅ Responsive by default
  - ✅ Industry standard for transactional emails
- **Cons:**
  - ⚠️ More setup (MJML compiler integration)
  - ⚠️ Learning curve for developers
  - ⚠️ Build step required

### Option B: Plain HTML / React Email
- **Description:** Use plain HTML or React Email library
- **Pros:**
  - ✅ Faster development (familiar tech)
  - ✅ No build step
  - ✅ Easier to iterate
- **Cons:**
  - ❌ Poor email client compatibility
  - ❌ Manual responsive design
  - ❌ Higher risk of spam filtering

**Lana's Recommendation:** **Option A (MJML)**
- Email deliverability is critical success metric (>95%)
- MJML significantly improves cross-client rendering
- Setup cost is one-time, benefits are long-term

**Implementation Approach:**
```typescript
// turbo/apps/mail/src/templates/advisor-invite-family.mjml
<mjml>
  <mj-head>
    <mj-title>{{advisor_name}} invites you to Family Governance</mj-title>
  </mj-head>
  <mj-body>
    <mj-section>
      <mj-column>
        <mj-text>Hi {{family_name}},</mj-text>
        <mj-text>{{advisor_name}} from {{advisor_firm}} has invited you...</mj-text>
        <mj-button href="{{invitation_link}}">Accept Invitation</mj-button>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
```

**Production Readiness Checklist:**
- [ ] turbo_mail service deployed and accessible
- [ ] SMTP credentials configured (AWS SES)
- [ ] SPF/DKIM/DMARC records set up for domain
- [ ] Bounce handling configured
- [ ] Email sending rate limits understood
- [ ] CloudWatch monitoring for delivery rate

**Decision Required By:** Sprint 45 Week 1 (before FG-005-003 starts)

**Decision Maker:** DevOps Lead + Backend Lead

**Action Items:**
- [ ] DevOps: Confirm turbo_mail production status
- [ ] DevOps: Verify email deliverability setup (SPF/DKIM)
- [ ] Backend Lead: Choose template system
- [ ] Backend Lead: Set up MJML build pipeline (if Option A)

**Decision:**
- [ ] Option A - MJML templates (Recommended)
- [ ] Option B - Plain HTML/React Email
- [ ] turbo_mail production ready: Yes / No / Needs work: _____

**Date Decided:** ___________
**Decided By:** ___________
**Notes:** ___________

---

## Q4: Invitation Token Security & Expiry

**Question:** What token generation algorithm and expiry policy should we use for invitation tokens?

**Context:**
- Tokens secure access to invitation acceptance flow
- Balance security (short expiry) vs UX (user convenience)
- Industry standard: 7-30 days for invitation tokens

**Options:**

### Option A: 30-day Expiry (Recommended ✅)
- **Description:** Secure random tokens with 30-day expiration
- **Pros:**
  - ✅ Industry standard (most SaaS products use 14-30 days)
  - ✅ Balances security and convenience
  - ✅ Lower support burden (fewer "expired link" complaints)
  - ✅ Reasonable for professional invitations
- **Cons:**
  - ⚠️ Longer exposure window if token leaks
  - ⚠️ Need cleanup job for expired tokens

### Option B: 7-day Expiry
- **Description:** Shorter expiry for higher security
- **Pros:**
  - ✅ Higher security (shorter exposure)
  - ✅ Forces faster action
- **Cons:**
  - ❌ Higher support burden (more expirations)
  - ❌ Poor UX for busy users
  - ❌ May need resend functionality

### Option C: No Expiry
- **Description:** Tokens valid indefinitely
- **Pros:**
  - ✅ Zero friction for users
- **Cons:**
  - ❌ Security risk (tokens never invalidate)
  - ❌ Not recommended for production

**Lana's Recommendation:** **Option A (30-day expiry)**
- Industry best practice
- Balances security and user experience
- Aligns with professional advisory engagements timeline

**Technical Implementation:**
```typescript
// Token generation
import { randomBytes } from 'crypto';

function generateInvitationToken(): string {
  // 32 bytes = 256 bits of entropy
  return randomBytes(32).toString('base64url');
}

// Token validation
async function validateToken(token: string): Promise<Invitation | null> {
  const invitation = await prisma.invitation.findFirst({
    where: {
      token,
      expires_at: { gt: new Date() }, // Check expiry
      status: { in: ['SENT', 'OPENED'] } // Only active invitations
    }
  });

  if (!invitation) {
    throw new Error('Invalid or expired invitation token');
  }

  return invitation;
}
```

**Security Measures:**
- Use `crypto.randomBytes` (Node.js) - cryptographically secure
- 32 bytes = 256 bits of entropy (very strong)
- Store hashed tokens in database (optional - depends on Q5)
- Rate limit token validation attempts (prevent brute force)
- One-time use tokens (mark as ACCEPTED after use)

**Decision Required By:** Sprint 45 Week 1 (blocks FG-005-001, FG-005-004)

**Decision Maker:** Security Lead + Product Owner

**Decision:**
- [ ] Option A - 30-day expiry (Recommended)
- [ ] Option B - 7-day expiry
- [ ] Option C - No expiry (Not recommended)
- [ ] Other expiry period: _____ days

**Date Decided:** ___________
**Decided By:** ___________
**Notes:** ___________

---

# 🟡 IMPORTANT QUESTIONS - Affects Scope

## Q5: Concurrent Invitation Handling

**Question:** What happens if advisor/family sends multiple invitations to the same email before the first is accepted?

**Context:**
- User might:
  - Accidentally click "Send Invitation" multiple times
  - Intentionally resend after no response
  - Make a mistake and want to cancel/resend
- Need to prevent confusion and data integrity issues

**Options:**

### Option A: Block Duplicate Invitations (Recommended ✅)
- **Description:** Prevent sending new invitation if active one exists
- **UI Behavior:** Show error message with link to pending invitation
- **Pros:**
  - ✅ Clear, predictable behavior
  - ✅ No confusion for recipients
  - ✅ Simple implementation
  - ✅ Data integrity maintained
- **Cons:**
  - ⚠️ Need "Resend" functionality for legitimate resends
  - ⚠️ Need "Cancel" to send new invitation

**Implementation:**
```typescript
// Before creating invitation
const existingInvitation = await prisma.invitation.findFirst({
  where: {
    recipient_email: email,
    sender_id: currentUser.id,
    status: { in: ['DRAFT', 'SENT', 'OPENED'] }
  }
});

if (existingInvitation) {
  throw new Error('Active invitation already exists for this email');
}
```

### Option B: Allow Duplicates, Honor First Acceptance
- **Description:** Allow multiple invitations, only first acceptance counts
- **Pros:**
  - ✅ Flexible for users
  - ✅ No blocking
- **Cons:**
  - ❌ Confusing for recipients (multiple emails)
  - ❌ Complex race condition handling
  - ❌ Wasted email sends

### Option C: Cancel Previous, Send New
- **Description:** Automatically cancel old invitation when sending new one
- **Pros:**
  - ✅ Always up-to-date invitation
  - ✅ Self-correcting for mistakes
- **Cons:**
  - ❌ Old links break (bad UX if recipient already saw it)
  - ❌ Confusing if recipient has both emails

**Lana's Recommendation:** **Option A (Block with Resend)**
- Provide "Resend Invitation" button in UI (same token, new email)
- Provide "Cancel & Create New" for corrections
- Clear error message: "Active invitation already sent to this email. [Resend] or [Cancel & Create New]"

**Decision Required By:** Sprint 45 Week 2

**Decision Maker:** Product Owner + UX Lead

**Decision:**
- [ ] Option A - Block duplicates with Resend/Cancel (Recommended)
- [ ] Option B - Allow duplicates
- [ ] Option C - Cancel previous automatically
- [ ] Other: ___________________

**Date Decided:** ___________
**Decided By:** ___________
**Notes:** ___________

---

## Q6: Subscription Plan Limits - Grace Period?

**Question:** If advisor reaches their family limit, can they send an invitation with a grace period before payment is required?

**Context:**
- FG-005-002 validates subscription limits before allowing invitation
- Two monetization approaches:
  - Hard block: Force payment immediately (clear signal)
  - Grace period: Allow invitation, require payment before acceptance (softer)
- Affects user experience and revenue timing

**Options:**

### Option A: Hard Block (Recommended ✅)
- **Description:** Require payment before sending invitation
- **UI Behavior:** Show upgrade modal immediately on "Send Invitation" click
- **Pros:**
  - ✅ Clear monetization signal
  - ✅ Guaranteed payment before value delivery
  - ✅ Simple implementation
  - ✅ No partial state (invitation created but unpaid)
- **Cons:**
  - ⚠️ Friction at critical moment (may lose intent)
  - ⚠️ User can't "commit" to invitation first

### Option B: Grace Period
- **Description:** Allow invitation send, block advisor registration until payment
- **Pros:**
  - ✅ Lower friction at invitation moment
  - ✅ Advisor can express intent to connect
  - ✅ Payment comes after commitment
- **Cons:**
  - ❌ Complex state management (unpaid invitation)
  - ❌ Risk of non-payment (advisor invites but never pays)
  - ❌ Recipient sees broken experience (can't complete registration)

**Lana's Recommendation:** **Option A (Hard Block)**
- Modern SaaS pattern: Stripe, Notion, Linear all block at limit
- Clear value exchange: payment → increased capacity
- Simpler implementation, fewer edge cases

**UI Mock for Hard Block:**
```
┌─────────────────────────────────────┐
│  Upgrade Required                   │
├─────────────────────────────────────┤
│  You've reached your family limit   │
│  (3/3 families connected)           │
│                                     │
│  Upgrade to add more families:      │
│  +1 family: $49/month              │
│  Unlimited: $199/month             │
│                                     │
│  [Upgrade Now]  [Cancel]           │
└─────────────────────────────────────┘
```

**Decision Required By:** Sprint 45 Week 2 (before FG-005-002 implementation)

**Decision Maker:** Product Owner + Business Strategy

**Decision:**
- [ ] Option A - Hard block (Recommended)
- [ ] Option B - Grace period
- [ ] Other: ___________________

**Date Decided:** ___________
**Decided By:** ___________
**Notes:** ___________

---

## Q7: Failed Payment Handling

**Question:** If family's payment fails during advisor invitation (FG-005-006), what happens to the invitation?

**Context:**
- FG-005-006: Family pays for advisor's subscription during invitation
- Payment can fail: insufficient funds, expired card, fraud detection
- Need graceful failure handling

**Options:**

### Option A: Keep in Draft, Allow Retry
- **Description:** Invitation saved but not sent, user can retry payment
- **Pros:**
  - ✅ No data loss (invitation preserved)
  - ✅ User can fix payment and continue
- **Cons:**
  - ⚠️ Invitation never sent (advisor waiting)
  - ⚠️ Need draft management UI

### Option B: Cancel Invitation, Require Restart
- **Description:** Delete invitation, user starts over
- **Pros:**
  - ✅ Clean state (no orphaned data)
  - ✅ Simple logic
- **Cons:**
  - ❌ Poor UX (lose all input data)
  - ❌ Frustrating for users

### Option C: Send Invitation, Gate Registration on Payment (Recommended ✅)
- **Description:** Email sent, but advisor registration blocked until payment succeeds
- **Pros:**
  - ✅ Advisor knows family wants to connect (receives email)
  - ✅ Family can retry payment without resending
  - ✅ Clear error message for advisor: "Family is completing payment setup"
  - ✅ Automatic unlock when payment succeeds (webhook)
- **Cons:**
  - ⚠️ More complex state management
  - ⚠️ Advisor sees partial experience temporarily

**Lana's Recommendation:** **Option C (Send, Gate on Payment)**
- Best user experience for both sides
- Family doesn't lose intent/momentum
- Advisor knows connection is coming
- Stripe webhooks automatically unblock on payment success

**Implementation Flow:**
```typescript
// 1. Create invitation with PENDING_PAYMENT status
const invitation = await createInvitation({
  status: 'PENDING_PAYMENT',
  payment_intent_id: stripePaymentIntent.id
});

// 2. Send email to advisor
await sendInvitationEmail(invitation);

// 3. Stripe webhook on successful payment
async function handlePaymentSuccess(paymentIntent) {
  await prisma.invitation.update({
    where: { payment_intent_id: paymentIntent.id },
    data: { status: 'SENT' } // Unlock registration
  });
}
```

**Decision Required By:** Sprint 46 Week 2 (before FG-005-006 implementation)

**Decision Maker:** Product Owner + Backend Lead

**Decision:**
- [ ] Option A - Keep in draft, allow retry
- [ ] Option B - Cancel invitation
- [ ] Option C - Send invitation, gate registration (Recommended)
- [ ] Other: ___________________

**Date Decided:** ___________
**Decided By:** ___________
**Notes:** ___________

---

# 🟢 NICE-TO-HAVE CLARIFICATIONS

## Q8: Invitation Analytics & Tracking

**Question:** Should we track invitation open rates, click-through rates, and time-to-acceptance metrics?

**Context:**
- Product insights for optimizing invitation flows
- Success metrics: acceptance rate >60% in 7 days
- Trade-off: complexity vs insights

**Options:**

### Option A: Full Analytics
- **Description:** Track opens, clicks, conversion funnel
- **Implementation:** Email pixel tracking, link click tracking, analytics service
- **Effort:** 12-16 hours (FG-005-008 enhancement)
- **Pros:**
  - ✅ Deep product insights
  - ✅ Can optimize email templates
  - ✅ A/B testing capability
- **Cons:**
  - ⚠️ Privacy concerns (email tracking pixels)
  - ⚠️ Additional infrastructure
  - ⚠️ More complex

### Option B: Basic Tracking (Recommended ✅)
- **Description:** Track sent, accepted, rejected events only
- **Implementation:** State machine transitions logged
- **Effort:** 4 hours (minimal addition to FG-005-008)
- **Pros:**
  - ✅ Simple, privacy-friendly
  - ✅ Covers key metrics
  - ✅ Low overhead
- **Cons:**
  - ⚠️ No open/click insights
  - ⚠️ Can't optimize email content

**Lana's Recommendation:** **Option B for MVP**
- Start with basic tracking (sent, accepted, rejected)
- Upgrade to Option A in future iteration if needed
- Focus MVP effort on core functionality

**Basic Metrics to Track:**
- Invitations sent (by type: advisor→family, family→advisor)
- Acceptance rate
- Time to acceptance (average, p50, p95)
- Rejection rate
- Expiration rate

**Decision:**
- [ ] Option A - Full analytics
- [ ] Option B - Basic tracking (Recommended for MVP)
- [ ] Defer to future iteration

**Date Decided:** ___________
**Notes:** ___________

---

# 📊 Decision Summary

**Total Critical Decisions:** 4 (Q1, Q2, Q3, Q4)
**Total Important Decisions:** 3 (Q5, Q6, Q7)
**Total Nice-to-Have:** 1 (Q8)

**Blocking Development:**
- Q1: Advisor Registration Model (blocks FG-005-001, FG-005-003, FG-005-007)
- Q2: Stripe Integration Scope (blocks FG-005-002, FG-005-006)
- Q3: Email Service Configuration (blocks FG-005-003, FG-005-007)
- Q4: Token Security & Expiry (blocks FG-005-001, FG-005-004)

**Affecting Scope:**
- Q5: Concurrent Invitation Handling (affects FG-005-001, FG-005-004 validation logic)
- Q6: Subscription Limits (affects FG-005-002 monetization flow)
- Q7: Failed Payment Handling (affects FG-005-006 user experience)

**Can Defer:**
- Q8: Invitation Analytics (nice-to-have for FG-005-008)

---

# 🔄 Recommended Decision Timeline

## Week 1 (Sprint 45 Planning)
**Critical Path - Must Resolve:**
- [ ] Q1: Advisor Registration Model (Product Owner + UX Lead)
- [ ] Q2: Stripe Configuration Verification (Backend Lead)
- [ ] Q3: Email Service Status (DevOps + Backend Lead)
- [ ] Q4: Token Security Policy (Security Lead + Product Owner)

**Reason:** These block FG-005-001 (Advisor invites family) - first development story

## Week 2 (Sprint 45 Development)
**Important - Should Resolve:**
- [ ] Q5: Concurrent Invitation Handling (Product Owner + UX Lead)
- [ ] Q6: Subscription Limits Policy (Product Owner + Business)

**Reason:** Needed for FG-005-002 (Subscription validation) validation logic

## Week 4-5 (Sprint 46)
**Important - Should Resolve:**
- [ ] Q7: Failed Payment Handling (Product Owner + Backend Lead)

**Reason:** Needed for FG-005-006 (Payment processing) implementation

## Future (Post-MVP)
**Can Defer:**
- [ ] Q8: Invitation Analytics (defer to future iteration)

---

**Next Steps:**
1. Schedule decision-making meeting for Week 1 questions (Q1-Q4)
2. Technical validation: Backend Lead verifies Stripe configuration (Q2)
3. Technical validation: DevOps confirms turbo_mail production status (Q3)
4. Update this document with decisions as they're made
5. Proceed to Sprint 45 planning after all Critical questions answered

---

**Document Status:** Awaiting Decisions
**Last Updated:** 2025-10-20
**Owner:** Eduard Izgorodin
**Next Review:** Sprint 45 Planning Week 1
