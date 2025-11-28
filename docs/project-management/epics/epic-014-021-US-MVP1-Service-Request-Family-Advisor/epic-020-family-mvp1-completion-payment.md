# EPIC-020-MVP1: Completion & Payment (Family)

> **Note:** This Epic is part of MVP1 Service Request Journey

---

## 📋 Basic Information

**Issue Type:** Epic
**Project:** FG
**Epic Name:** Service Completion & Payment for Families (MVP1)
**Summary:** Enable families to review completed work, confirm completion, and pay consultants via Stripe
**Parent User Journey:** MVP1 Service Request Journey
**Priority:** Critical
**Epic Link:** FG-EPIC-020-MVP1

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Enable families to review consultant deliverables, confirm service completion, and process 100% payment through Stripe, completing the service lifecycle.

**User-facing value:**
- Families can review all deliverables before payment
- Single-step completion and payment process
- Secure payment through Stripe
- Clear confirmation that service is closed

**Business value:**
- Postpayment model reduces upfront barrier
- Stripe handles payment security and disputes
- Consultant access revoked after payment (security)
- Clear service closure reduces ambiguity

**Scope boundaries:**
- **Included:**
  - Deliverables review interface
  - Confirm completion button
  - Stripe Checkout integration (100% postpayment)
  - Access revocation upon payment
  - Email confirmations to both parties
  - Service Request closure

- **NOT included:**
  - Quality ratings/reviews
  - Feedback forms
  - Partial payment
  - Payment plans/milestones
  - Dispute resolution workflow
  - Refunds (handled by Stripe directly)

---

## 👥 Target Users

**Primary Personas:**
- Family Admin - Approves completion and processes payment

---

## 📖 User Stories (High-Level)

**US-MVP1-017: Review Completed Work**
- **As a** Family Admin
- **I want to** access all deliverables the consultant provided
- **So that** I can verify the work meets our expectations before payment

**US-MVP1-018: Confirm Completion & Pay**
- **As a** Family Admin
- **I want to** confirm service completion and pay 100% via Stripe in one step
- **So that** I can close out the engagement and compensate the consultant

---

## 🔗 Dependencies

**Upstream:** EPIC-016-MVP1 (Service Delivery) - Must be marked complete
**Downstream:** Access revocation, final notifications
**Technical:** Stripe Checkout integration, payment webhooks

---

## 📐 Design & UX

**User Flow:**
1. Family receives email: "Service completed by consultant"
2. Opens Service Request detail page
3. Status: "Delivered - Awaiting Your Confirmation"
4. Sees deliverables section:
   - List of all deliverable links
   - Can click to open external links
5. Reviews work
6. Clicks "Confirm Completion & Pay"
7. Confirmation modal:
   - "Confirm this service is complete?"
   - Service summary
   - Total price: $800
   - "You'll be redirected to secure payment"
8. Clicks "Confirm & Pay"
9. Redirects to Stripe Checkout:
   - Service details
   - Amount: $800
   - Payment method form
10. Completes payment in Stripe
11. Stripe webhook triggers:
    - Status → "Completed & Paid"
    - Access revoked immediately
    - Emails sent
12. Redirects back to platform:
    - Success message: "Payment complete! Service closed."
    - Service Request status: "Completed & Paid"

---

## 🔔 Notifications

| Trigger | Recipient | Format | Description |
|---------|-----------|--------|-------------|
| Consultant marks complete | Family Admin/Council | Email | "Service completed by consultant - Please review and pay" |
| Payment successful | Consultant | Email | "Payment received from Family [Name] - Service closed, access revoked" |
| Payment successful | Family Admin | Email | "Payment confirmed - Service completed successfully" |

---

## 🧮 Business Rules

1. Only Admin can confirm completion and pay
2. Payment must be 100% (no partial payment)
3. Payment processes through Stripe (platform takes commission)
4. Consultant access revoked ONLY after successful payment
5. If payment fails: Service remains "Delivered", family can retry
6. Payment is final (refunds handled directly through Stripe dispute process)
7. Service Request closed only after payment confirmation

---

## 📝 Notes

**MVP1 Simplifications:**
- No quality ratings/reviews
- No feedback form
- No milestone payments
- No platform-mediated disputes
- Immediate access revocation (no grace period)

**Payment Flow:**
- Family confirms completion → Stripe Checkout Session created
- Family pays in Stripe → Webhook confirms payment
- Upon confirmation: Access revoked + emails sent + SR closed

**Future Enhancements:**
- Quality ratings system
- Detailed feedback forms
- Milestone-based payments
- Dispute resolution workflow
- Partial refunds for incomplete work

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-27
**Epic Status:** Draft
**Story Points Estimate:** 5 SP
