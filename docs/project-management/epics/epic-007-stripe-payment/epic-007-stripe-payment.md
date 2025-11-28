---
epic_id: "EPIC-007"
title: "Stripe Connect Payment Setup for Consultants"
status: "draft"
priority: "critical"
start_date: ""
target_date: ""
owner: "@anastasiabronina"
stakeholders: []
parent_initiative: ""
related_epics: ["EPIC-003"]
---

# Epic: Stripe Connect Payment Setup for Consultants

> **Note:** This is an Epic for the FG project. This document defines the scope, user stories, and requirements for enabling consultants to connect payment accounts via Stripe Connect.

---

## 📋 Basic Information

**Issue Type:** Epic
**Project:** FG
**Epic Name:** Stripe Connect Payment Setup for Consultants
**Summary:** Enable consultants to connect payment accounts to receive earnings from family service bookings
**Parent User Journey:** [Consultant Marketplace User Journey](../user-journey-consultant-marketplace.md)
**Parent Initiative:** —
**Related Epics:** EPIC-003 (Basic Advisor Registration & Profile)
**Priority:** Critical
**Epic Link:** EPIC-007

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Complete payment account connection system enabling consultants to receive earnings from marketplace bookings through Stripe Connect integration.

**User-facing value (what users can do after this Epic):**
- Connect payment account (bank account) to receive earnings from family bookings
- Understand upfront what information and documents are needed for Stripe onboarding
- Complete Stripe onboarding process within platform interface
- See real-time verification status on dashboard
- Resume incomplete Stripe setup without losing progress
- Update payment information when bank details change
- Receive confirmation when ready to accept paid bookings

**Business value (how business benefits):**
- Enable marketplace transaction processing (prerequisite for revenue)
- Reduce support burden through Stripe-hosted onboarding (compliance, UI, verification handled by Stripe)
- Ensure compliance through Stripe's built-in verification and KYC
- Create trust through transparent payment setup process
- Minimize payment failures through Stripe's bank account verification

**Scope boundaries:**

**✅ INCLUDED:**
- Payment connector entry point on consultant dashboard
- Pre-setup guidance (what Stripe will ask for, estimated time)
- Create Stripe Connect Account for consultant
- Generate Account Session for accessing Stripe UI
- Display Stripe embedded onboarding component
- Store Stripe Account ID in consultant profile
- Receive and process Stripe webhook updates for verification status
- Display verification status on dashboard
- Resume incomplete setup (generate fresh Account Session)
- Update payment information workflow (re-open Stripe onboarding)
- Error handling when Stripe webhooks fail or are delayed

**❌ NOT INCLUDED:**
- Stripe onboarding UI (Stripe provides this)
- Bank account validation (Stripe handles)
- Tax identification verification (Stripe handles)
- KYC document processing (Stripe handles)
- Payout scheduling UI (Stripe Dashboard)
- Invoice creation for services (separate epic)
- Payment processing for family bookings (separate epic)
- Transaction history and reporting (separate epic)
- Dispute resolution and refunds (separate epic)

**Important Notes:**
- **Stripe owns**: Onboarding UI, data collection, validation, storage, compliance
- **Platform owns**: Account creation, session management, status tracking, dashboard integration
- Platform NEVER stores bank account numbers or sensitive financial data
- Consultant can have both Standard and Premium subscriptions

---

## 👥 Target Users

**Who will use this feature?**

- **Primary Personas:** Consultant (Independent Marketplace Professional)
  - Both Standard Consultants (marketplace-only) and Premium Consultants (with managed families)
  - Seeking to monetize expertise through marketplace bookings
  - May have limited financial/payment processing knowledge
  - Need clear guidance and transparent process
  - Reference: `consultant-persona.md` (DOC-USR-006)

- **Secondary Personas:**
  - Platform Administrator (monitors setup completion rates, troubleshoots issues)
  - Family Members (indirectly benefit from reliable consultant payment setup)

---

## 📖 User Stories (High-Level)

**Main scenarios this Epic will enable:**

1. **As a** Consultant, **I want to** see clear explanation of what Stripe will ask for before starting, **so that** I can gather necessary documents and information in advance

2. **As a** Consultant, **I want to** connect my payment account through Stripe's onboarding process within the platform, **so that** I can start receiving earnings from family bookings without leaving the platform

3. **As a** Consultant, **I want to** see real-time status of my Stripe account verification on my dashboard, **so that** I know when I can accept paid bookings

4. **As a** Consultant, **I want to** resume incomplete Stripe onboarding from where I left off, **so that** I don't have to restart if interrupted

5. **As a** Consultant, **I want to** update my payment information through Stripe, **so that** I can change banks or correct errors

6. **As a** Consultant, **I want to** understand why my Stripe verification is pending or failed, **so that** I know what actions to take

---

## 🔗 Dependencies & Risks

### Dependencies (Blockers)

**Upstream (what must be completed before this Epic can start):**
- **EPIC-003**: Basic Advisor Registration & Profile (consultant account must exist)
- **Profile Verification (Stage 7)**: Consultant profile must be verified before payment setup
- **Platform Stripe Account**:
  - Platform registered with Stripe
- **Legal & Compliance**:
  - Platform terms of service include payment processing terms

**Downstream (what depends on this Epic):**
- Epic: Service Booking & Payment Processing (families paying consultants via Stripe)
- Epic: Invoice Creation (consultants creating invoices, requires Stripe Account ID)
- Epic: Transaction History & Reporting (consultants viewing earnings from Stripe)
- Epic: Marketplace Publication (payment setup required before going live)

**External Dependencies:**
- Stripe API availability and uptime
- Stripe Connect embedded component library (`@stripe/connect-js`)
- Stripe webhook delivery (best-effort with 72-hour retry window)
- Consultant's bank must support direct deposits

### Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Consultant abandons Stripe onboarding (>40%) | High | Clear pre-setup guidance, explain why info needed, show estimated time (15-20 min), resume capability |
| Stripe verification delays (2-5 business days) | Medium | Set expectations upfront ("Verification takes 1-3 business days"), send email notifications on status change |
| Stripe embedded component fails to load | High | Fallback to redirect flow (Stripe-hosted page), display clear error message with retry option |
| International consultants in unsupported countries | High | Display Stripe Connect supported countries early, offer waitlist for unsupported regions |
| Webhook delivery failures or delays | Medium | Poll Stripe API as backup if webhook not received within 24 hours, display "verification in progress" status |
| Consultant confusion about what Stripe asks for | Medium | Pre-setup guidance explains what info Stripe needs and why, link to Stripe's documentation |
| Security concerns about providing bank details | Medium | Explain Stripe's security credentials (SOC 2, PCI-DSS), clarify platform never sees bank account numbers |

---

## 🎨 Design & UX

**Figma Links:**
- Payment Setup Pre-Start Guidance Screen *(to be added)*
- Payment Connector Status Widget (Dashboard) *(to be added)*
- Stripe Embedded Onboarding Modal *(to be added)*
- Verification Status Timeline *(to be added)*

**UX Notes:**

**Entry Point:**
```
Consultant Dashboard
├── "Setup Payment Account" prominent CTA (if not setup)
├── "Payment Status: Pending Verification" badge (if in progress)
└── "Payment Ready ✓" with green checkmark (if complete)
```

**Pre-Setup Guidance Screen:**
```
┌────────────────────────────────────────┐
│ Connect Your Payment Account (Stripe) │
├────────────────────────────────────────┤
│                                        │
│ Stripe will ask you for:              │
│ ✓ Bank account information            │
│ ✓ Tax identification (EIN or SSN)     │
│ ✓ Business information (if applicable)│
│                                        │
│ Estimated time: 15-20 minutes         │
│ Verification: 1-3 business days       │
│                                        │
│ Your bank details are stored securely │
│ by Stripe - we never see them.        │
│                                        │
│ [Start Stripe Setup] [Learn More]     │
└────────────────────────────────────────┘
```

**Stripe Embedded Onboarding Flow:**
- Opens Stripe's onboarding UI in modal overlay (not new window)
- Stripe component handles all data collection, validation, and storage
- Progress indicator shows completion (provided by Stripe component)
- "Save & Exit" option allows resuming later (Stripe persists data)
- On completion: Modal closes, dashboard updates to "Pending Verification"

**Status Tracking Widget:**
```
Payment Account Status:

◉ Setup Initiated       (Today)
◉ Information Submitted (Today)
◉ Verification Pending  (Current - 1-3 days)
○ Ready to Receive Payments

Stripe is verifying your account.
We'll notify you once complete.
```

**Key UX Principles:**
- **Transparency**: Clear explanation that Stripe handles onboarding (not us)
- **Trust Building**: Explain Stripe's security credentials, platform doesn't store bank details
- **Progress Visibility**: Show current verification status with estimated completion time
- **Error Prevention**: Stripe validates inputs in real-time
- **Error Recovery**: If Stripe rejects, show clear error from Stripe with retry option
- **Mobile Support**: Responsive design (Stripe component is mobile-responsive)
- **Resume Capability**: Generate fresh Account Session to resume incomplete onboarding

**See also:** User Journey [user-journey-consultant-marketplace.md](../user-journey-consultant-marketplace.md) Stage 9 for detailed flow

---

## 🧮 Business Rules

**Key Business Rules:**

### 1. Stripe Account Creation Requirements
```
Prerequisites:
- Consultant account must exist and be active
- Profile verification (Stage 7) must be complete
- Minimum profile completion: 60%
- Active subscription (Standard or Premium tier)

Platform Actions:
- Create Stripe Connect Express Account
- Store Stripe Account ID in consultant record
- Enable consultant to access Stripe onboarding interface
```

### 2. Stripe Onboarding Process
```
Platform Responsibilities:
- Provide access to Stripe embedded onboarding component
- Display Stripe's onboarding UI within platform modal
- Allow consultant to exit and resume later

Stripe Responsibilities:
- Collect bank account information
- Collect tax identification
- Validate all inputs in real-time
- Store all data securely (encrypted)
- Perform bank account verification
- Run KYC/compliance checks
```

### 3. Verification Status Tracking
```
Status Flow:
1. not_started    → Consultant hasn't clicked "Setup Payment Account"
2. initiated      → Stripe Account created, onboarding not yet submitted
3. pending        → Stripe received info, verification in progress (1-3 days)
4. active         → Stripe approved, consultant can receive payments
5. failed         → Stripe rejected (bank account invalid, info mismatch, etc.)
```

### 4. Resume and Update Rules
```
Resume Incomplete Setup:
- If consultant exits Stripe onboarding before completion
- Consultant can return and continue where they left off
- Stripe preserves previously entered data
- No data loss during interruptions

Update Payment Information:
- Consultant can re-open Stripe onboarding anytime
- Stripe allows updating bank account, tax info, business details
- Changes may require re-verification (1-2 days)
- Pending payouts are processed before account information changes take effect
```

### 5. Data Ownership and Storage

Platform stores only non-sensitive identifiers: Stripe Account ID, verification status, and timestamps.

**Stripe Stores (Platform NEVER sees):**
- Bank account number and routing number
- Tax identification (SSN, EIN, etc.)
- Business legal name and address
- Identity verification documents

### 6. Security and Compliance
```
Platform Security:
- Never store bank account numbers
- Never store tax identification numbers
- Use HTTPS for all Stripe API calls
- Store Stripe Account ID only (not sensitive)
- Audit logs track all payment setup actions with timestamps
```

### 7. Access Control
```
Permissions:
- Only consultant who owns profile can initiate payment setup
- Only consultant who owns profile can view Stripe verification status
- Only consultant who owns profile can update payment information
- Platform administrators CAN view verification status (for support)
- Platform administrators CANNOT access bank account details (stored by Stripe)
```

### 8. Marketplace Readiness
```
Blocking Rules:
- Payment account verification REQUIRED before marketplace publication
- Consultants with pending verification can complete other profile sections
- Marketplace booking acceptance blocked until status = "active"
- Dashboard displays: "Complete payment setup to start accepting bookings"
```

### 9. Failed Verification Handling
```
When Stripe Rejects:
- Consultant notified immediately via email and dashboard
- Display Stripe's error message (e.g., "Bank account verification failed")
- Provide actionable steps from Stripe's guidance
- Allow consultant to re-open Stripe onboarding and correct information
- Unlimited retry attempts (no lockout)

Common Failure Reasons (from Stripe):
- Invalid bank account number or routing number
- Name mismatch (bank account name ≠ profile name)
- Bank doesn't support direct deposits
- Tax ID verification failed
- Identity verification failed (KYC)
```

### 10. Supported Countries
```
Consultant Eligibility:
- Must be in country where Stripe Connect is available
- Display list of supported countries in pre-setup guidance
- If consultant in unsupported country: Show waitlist option

Stripe Connect Availability:
- Check Stripe documentation for current list
- Includes: US, Canada, UK, EU countries, Australia, Singapore, etc.
- Updated by Stripe, not controlled by platform
```

**See also:**
- User Journey [user-journey-consultant-marketplace.md](../user-journey-consultant-marketplace.md) Stage 9 for business context
- Consultant Persona `consultant-persona.md` for user needs and motivations
- Stripe Connect Documentation: https://docs.stripe.com/connect

---

## 📅 Estimated Timeline

**Phases:**

### Week 1: Dashboard Integration & Stripe Account Creation (32h)
- Design and implement payment setup entry point on dashboard
- Build pre-setup guidance screen with Stripe requirements
- Implement backend endpoint to create Stripe Connect Account
- Store Stripe Account ID in consultant profile
- Create payment connector status widget
- Test Stripe account creation with test API keys

### Week 2: Embedded Onboarding & Session Management (32h)
- Install and configure `@stripe/connect-js` library
- Implement backend endpoint to generate Account Session
- Build modal component to display Stripe embedded onboarding
- Implement exit and resume flow (generate fresh Account Session)
- Handle Stripe component loading errors (fallback to redirect)
- Test cross-browser compatibility (Chrome, Firefox, Safari, Edge)

### Week 3: Webhook Processing & Status Tracking (32h)
- Implement webhook endpoint to receive Stripe events
- Add webhook signature verification
- Process `account.updated` events and update database
- Build verification status display on dashboard (timeline widget)
- Implement email notifications for status changes
- Add fallback: Poll Stripe API if webhook delayed >24h
- Test webhook delivery and processing

### Week 4: Testing, Error Handling & Documentation (24h)
- Test complete flow: Create account → Onboarding → Webhook → Status update
- Test resume flow with interrupted onboarding
- Test update payment info flow
- Test error scenarios (webhook failures, Stripe API errors)
- Security audit: Verify no sensitive data stored
- Write support documentation for common issues
- Fix bugs and refine UX based on testing feedback

**Total Duration:** 4 weeks (~120 hours)

**Target Release:** Sprint 48 (Q2 2025 - Week 4)

---

## 📝 Notes

### Open Questions

- [ ] Should we poll Stripe API as backup if webhook not received within 24 hours?
  - **Recommendation:** Yes - webhook delivery is best-effort, polling provides reliability
  - **Decision Needed By:** Week 3 of development

- [ ] What happens if consultant tries to setup payment before profile verification complete?
  - **Recommendation:** Block payment setup, show message "Complete profile verification first"
  - **Decision Needed By:** Week 1 of development

- [ ] Should consultants see link to Stripe Dashboard to manage payouts?
  - **Recommendation:** Yes - provide link to Stripe Express Dashboard (Stripe-hosted)
  - **Decision Needed By:** Week 4 of development

- [ ] How long should we keep Stripe Account ID if consultant deletes account?
  - **Recommendation:** Retain for 7 years (financial audit requirements)
  - **Decision Needed By:** Before production launch

### Decisions Made

- ✅ **Stripe Account Type**: Using Express Accounts (simpler onboarding, Stripe handles compliance)
- ✅ **Embedded vs Redirect**: Using embedded onboarding for better UX (modal overlay)
- ✅ **Webhook Backup**: Implement polling as fallback if webhook delayed >24h
- ✅ **Verification Notifications**: Email + in-platform notifications for status changes
- ✅ **Mobile Support**: Stripe component is mobile-responsive, fully supported
- ✅ **Security**: Platform never stores bank account numbers - Stripe owns all sensitive data
- ✅ **Resume Flow**: Generate fresh Account Session, Stripe persists previous data
- ✅ **Failed Verification**: Display Stripe's error message, allow unlimited retries

### What Stripe Owns (Not Our Scope)

- ❌ UI for collecting bank account information
- ❌ UI for collecting tax identification
- ❌ Validation of routing numbers, account numbers
- ❌ Storage of sensitive financial data (encrypted by Stripe)
- ❌ Bank account verification process
- ❌ KYC document processing
- ❌ Fraud detection and AML checks
- ❌ Payout scheduling and management
- ❌ Compliance with financial regulations

### What Platform Owns (Our Scope)

- ✅ Create Stripe Connect Account via API
- ✅ Generate Account Session (client_secret for UI access)
- ✅ Display Stripe embedded component in modal
- ✅ Store Stripe Account ID in our database
- ✅ Receive and process Stripe webhooks
- ✅ Display verification status on dashboard
- ✅ Send email notifications on status changes
- ✅ Provide resume and update workflows

### Related Documentation

- User Journey: [user-journey-consultant-marketplace.md](../user-journey-consultant-marketplace.md) Stage 9
- Persona: `consultant-persona.md` (DOC-USR-006)
- Epic: EPIC-003 (Basic Advisor Registration & Profile)
- Stripe Connect Documentation: https://docs.stripe.com/connect
- Stripe Embedded Components: https://docs.stripe.com/connect/get-started-connect-embedded-components

### Success Criteria for Epic Completion

- [ ] Consultant can click "Setup Payment Account" from dashboard
- [ ] Pre-setup guidance screen displays Stripe requirements clearly
- [ ] Backend creates Stripe Connect Account and stores Account ID
- [ ] Backend generates Account Session and returns client_secret
- [ ] Stripe embedded onboarding component loads in modal
- [ ] Consultant can complete Stripe onboarding within platform
- [ ] Consultant can exit and resume onboarding without data loss
- [ ] Webhook endpoint receives and validates Stripe events
- [ ] Verification status updates automatically in database
- [ ] Dashboard displays current status (initiated, pending, active, failed)
- [ ] Email notifications sent when status changes (pending → active, pending → failed)
- [ ] Consultant can re-open onboarding to update payment information
- [ ] Payment setup blocks marketplace publication until status = "active"
- [ ] Error messages display clearly when Stripe component fails to load
- [ ] Mobile-responsive design works on tablets and phones
- [ ] Support documentation available for common Stripe issues

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-23
**Epic Status:** Draft
**Next Steps:** Review and refine requirements, add to sprint planning backlog
