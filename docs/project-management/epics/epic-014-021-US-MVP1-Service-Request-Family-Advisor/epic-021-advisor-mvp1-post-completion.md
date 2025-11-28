# EPIC-021-MVP1: Post-Completion (Consultant)

> **Note:** This Epic is part of MVP1 Service Request Journey

---

## 📋 Basic Information

**Issue Type:** Epic
**Project:** FG
**Epic Name:** Post-Completion for Consultants (MVP1)
**Summary:** Enable consultants to receive payment confirmation and view service history
**Parent User Journey:** MVP1 Service Request Journey
**Priority:** Medium
**Epic Link:** FG-EPIC-021-MVP1

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Enable consultants to receive payment notifications and access historical records of completed services.

**User-facing value:**
- Consultants receive immediate payment confirmation
- Consultants can view service history for reference
- Consultants understand their access has been revoked

**Business value:**
- Payment transparency builds trust
- Service history enables repeat engagements
- Clear closure reduces support inquiries

**Scope boundaries:**
- **Included:**
  - Payment confirmation email
  - Service history view in consultant portal
  - Basic service details display

- **NOT included:**
  - Post-service access to family data
  - View-only mode after completion
  - Re-engagement recommendations
  - Earnings analytics

---

## 👥 Target Users

**Primary Personas:**
- Consultant - Receives payment and tracks completed work

---

## 📖 User Stories (High-Level)

**US-MVP1-019: Receive Payment Confirmation**
- **As a** Consultant
- **I want to** receive notification when payment is received and service is fully closed
- **So that** I know I've been compensated and the engagement is complete

**US-MVP1-020: View Service Request History**
- **As a** Consultant
- **I want to** see a history of all my completed service requests
- **So that** I can track my work with different families and reference past projects

---

## 🔗 Dependencies

**Upstream:** EPIC-018-MVP1 (Completion & Payment) - Payment must be processed
**Downstream:** None (terminal state)
**Technical:** Service history queries, consultant portal views

---

## 📐 Design & UX

**User Flow:**
1. Consultant receives email: "Payment received from Family [Name]"
2. Email details:
   - Service completed
   - Amount received (minus platform fee)
   - Service closed
   - Access revoked
3. Consultant can log into portal
4. Sees "Service Requests" page
5. Filter: "Completed"
6. Views list of completed services:
   - Family name (anonymized if needed)
   - Service date range
   - Amount earned
   - Service type
7. Can click for details:
   - Original service request
   - Services delivered
   - Deliverables shared
   - Final price
   - Completion date

---

## 🔔 Notifications

| Trigger | Recipient | Format | Description |
|---------|-----------|--------|-------------|
| Payment received | Consultant | Email | "Payment received from Family [Name] - Service closed, access revoked. Amount: $[amount]" |

---

## 🧮 Business Rules

1. Consultant access fully revoked upon payment
2. No post-service access to family data
3. Service history accessible indefinitely
4. Cannot re-open closed Service Requests
5. Payment amount shown net of platform fees

---

## 📝 Notes

**MVP1 Simplifications:**
- No post-service access
- No re-engagement workflow
- No earnings analytics
- Simple history list

**Future Enhancements:**
- View-only access retention
- Quick re-booking option
- Earnings dashboard
- Performance metrics
- Family satisfaction ratings

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-27
**Epic Status:** Draft
**Story Points Estimate:** 2 SP
