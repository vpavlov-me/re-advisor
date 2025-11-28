---
epic_id: "EPIC-005"
title: "Advisor-Family Mutual Connection via Email Invitations"
type: "epic"
category: "advisor-platform"
status: "ready-for-planning"
priority: "critical"
created: "2025-10-15"
updated: "2025-10-20"
owner: "Eduard Izgorodin"
stakeholder: "Product Team"
related_epics: ["EPIC-003", "EPIC-004"]
tags: ["advisor", "family", "invitations", "email", "bidirectional", "subscription", "payment", "verification", "roles"]
---

# Epic: Advisor-Family Mutual Connection via Email Invitations (Bidirectional)

> **Note:** This Epic is for Jira FG (Family Governance) project. Detailed User Stories are in separate files in this folder.

---

## 📋 Basic Information

**Issue Type:** Epic
**Project:** FG (Family Governance)
**Epic Name:** Advisor-Family Mutual Connection via Email Invitations (Bidirectional)
**Summary:** Enable both advisors and families to invite each other through simple "Invite" button, instantly creating connections and sending email invitations with verification links, with automatic subscription validation
**Parent Initiative:** FG-XXX [To be linked]
**Priority:** Critical
**Epic Link:** EPIC-MUTUAL-INVITE-001

---

## 🎯 Epic Goal

**What will this Epic deliver?**

This Epic delivers a complete **bidirectional email-based invitation system**, enabling both advisors and families to invite each other with immediate connection creation and automated onboarding:

**User-Facing Value:**

**For Advisors:**
- Click "Invite Family" button in Advisor Portal
- Fill simple form: email, first name, last name
- System checks subscription limits (can advisor add another family?)
- Instant connection created in database
- Email with verification link automatically sent to family
- Family completes registration and gets immediate access

**For Families (Family Council/Admin):**
- Click "Invite Advisor" button in Family Portal
- Fill form: email, first name, last name, role (Consul or Personal Family Advisor)
- System checks if advisor already exists on Advisor Portal
  - If yes: instant connection (advisor already paid)
  - If no: prompt to pay for advisor subscription
- Instant connection created in database
- Email with verification link automatically sent to advisor
- Advisor completes registration and gets immediate access

**For Both Parties:**
- No manual code entry or sharing needed
- Professional automated email invitations
- Instant connection upon verification
- Clear role-based access from day one
- Subscription validation built into flow

**Business Value:**
- Eliminate manual code management complexity
- Automatic subscription enforcement prevents revenue leakage
- Faster onboarding (1-click invite vs multi-step code sharing)
- Reduce user errors (no manual code entry/typos)
- Built-in payment prompts increase subscription conversions
- Professional email-based flow familiar to all users
- Instant connection tracking (no "pending code redemption" state)

**Scope Boundaries:**
- ✅ **Included:** 
  - "Invite" button in both portals
  - Email + name + role input forms
  - Automatic subscription validation
  - Instant database connection creation
  - Automated email invitations with verification links
  - Role-based access assignment (Personal Family Advisor/External Consul for family-invited, Consultant for advisor-invited)
  - Payment prompts for advisor subscriptions
  - Custom email templates per advisor role (Personal Family Advisor, External Consul, Consultant)
- ❌ **NOT Included in MVP:** 
  - Bulk invitations (invite multiple at once)
  - Invitation expiration (MVP: invites don't expire)
  - Invitation revocation before acceptance
  - Invitation tracking dashboard (list of pending/completed invitations)
  - Social media-based invitations

---

## 👥 Target Users

**Who will use this feature?**

**Primary Personas:**

**External Advisor Roles (Advisor Portal):**
- **External Consul (Advisor Portal)** - Strategic governance consultant, invites families they want to serve - **Path 1 initiator**
- **Personal Family Advisor** - Trusted advisor receiving invitations from existing family clients - **Path 2 recipient**
- **Service Advisor** - Specialized consultant, invites selective families (Path 1)

**Family Roles (Family Portal):**
- **Consul (Family Council Member)** - Governance leader, invites trusted advisors to platform - **Path 2 initiator**
- **Admin (Family Portal)** - Platform administrator with full permissions, can invite advisors - **Path 2 initiator**
- **Family Member** - Receives invitations from advisors, completes registration - **Path 1 recipient**

**Secondary Personas:**
- **Platform Administrator** - Reduced workload as invitations are self-service

---

## 📖 User Stories (High-Level)

**Main scenarios this Epic will enable:**

### Phase 0: Cleanup (Frontend Code Removal)

**US-INV-0 (FG-97):** **As a** developer, **I want to** remove all invite code UI components from both portals, **so that** the codebase is clean and users don't see deprecated code-based functionality. [Detailed: US-INV-0-remove-invite-code-ui.md]

### Path 1: Advisor → Family (Advisor-Initiated)

1. **US-INV-1 (FG-98):** **As a** Consultant advisor, **I want to** click "Invite Family" and enter their email/name, **so that** the system instantly creates a connection and sends them an automated invitation to join my services. [Detailed: US-INV-1-advisor-invites-family.md]

2. **US-INV-2 (FG-99):** **As a** Consultant advisor, **I want to** see subscription validation before sending invitation, **so that** I know if I need to upgrade my plan to add another family. [Detailed: US-INV-2-advisor-subscription-check.md]

3. **US-INV-3 (FG-100):** **As a** family member, **I want to** receive an email invitation from a Consultant advisor with clear next steps, **so that** I can verify my email and complete registration on Family Portal. [Detailed: US-INV-3-family-receives-invitation.md]

### Path 2: Family → Advisor (Family-Initiated)

4. **US-INV-4 (FG-103):** **As a** Family Council member or Admin, **I want to** click "Invite Advisor", enter their email/name, and select role (Personal Family Advisor or External Consul), **so that** I can bring my trusted advisor onto the platform with appropriate access level. [Detailed: US-INV-4-family-invites-advisor.md]

5. **US-INV-5 (FG-104):** **As a** Family Council member or Admin, **I want to** the system to automatically determine if payment is required and show payment prompt only when needed, **so that** I have a seamless invitation experience without manual checks. [Detailed: US-INV-5-automatic-payment-detection.md]

6. **US-INV-6 (FG-108):** **As a** Family Council member or Admin, **I want to** pay for my advisor's Advisor Portal subscription during invitation flow (if prompted), **so that** they can access the platform immediately upon registration. [Detailed: US-INV-6-pay-advisor-subscription.md]

7. **US-INV-7 (FG-105):** **As an** invited advisor (Personal Family Advisor or External Consul), **I want to** receive an email invitation from a family with my assigned role details, **so that** I can verify my email and complete registration on Advisor Portal with correct access. [Detailed: US-INV-7-advisor-receives-invitation.md]

### Cross-Path Functionality

8. **US-INV-8 (FG-106):** **As a** Consultant advisor or Family Council member or Admin, **I want to** receive an in-app notification in my portal's notification center when my invited user completes verification, **so that** I know they've joined and can follow up with onboarding guidance. [Detailed: US-INV-8-verification-notifications.md]

[Detailed User Stories with full acceptance criteria are in separate files in this folder]

**Note on Email Notifications:**
- **Invitation emails** (with verification links) are sent to invitees as part of US-INV-3 (Path 1) and US-INV-7 (Path 2)
- **Verification completion notifications** are in-app only (US-INV-8), displayed in portal notification centers

---

## 🔄 Invitation Flow Overview

### Path 1: Advisor-Initiated Invitation (Advisor → Family)
**Scenario:** Advisor wants to onboard a new family client

1. **Advisor** clicks "Invite Family" button in Advisor Portal
2. **System checks** advisor's subscription: Can they add another family?
   - If **NO** → Show upgrade prompt: "Your current plan allows X families. Upgrade to add more."
   - If **YES** → Proceed to invitation form
3. **Advisor** fills form: Email, First Name, Last Name
4. **Advisor** clicks "Send Invitation"
5. **System** instantly creates `FamilyAdvisorAssociation` (status=`pending_verification`)
6. **System** sends automated email to family:
   - Subject: "You've been invited by [Advisor Name] to join Family Governance Platform"
   - Body: Welcome message, verification link to Family Portal
   - Link format: `https://family.portal.com/verify?token=xyz123`
7. **Family** receives email, clicks verification link
8. **Family** lands on Family Portal registration page (email pre-filled)
9. **Family** completes profile: Password, additional info
10. **System** updates association status to `active`
11. **Both parties** receive confirmation notifications
12. **Advisor** sees family in their multi-family dashboard
13. **Family** sees advisor in their advisor list

### Path 2: Family-Initiated Invitation (Family → Advisor)
**Scenario:** Family wants to bring their existing advisor onto platform

1. **Family Council/Admin** clicks "Invite Advisor" button in Family Portal
2. **System** shows invitation form: Email, First Name, Last Name, Role dropdown
3. **Family Council/Admin** fills form and selects role:
   - **Consul (External Consul)** - Full governance access
   - **Personal Family Advisor** - Limited advisor access
4. **Family Council/Admin** clicks "Send Invitation"
5. **System checks** if email exists on Advisor Portal:
   - **If YES (advisor exists):**
     - Show message: "This advisor already has an Advisor Portal account. No payment needed."
     - Proceed to step 7
   - **If NO (advisor doesn't exist):**
     - Show payment prompt: "Advisor Portal subscription required: $X/month. Pay now to enable advisor access."
     - Family pays or confirms payment
6. **System** instantly creates `FamilyAdvisorAssociation` (status=`pending_verification`, role assigned)
7. **System** sends automated email to advisor:
   - Subject: "You've been invited by [Family Name] to join Family Governance Platform"
   - Body: Welcome message, role details, verification link to Advisor Portal
   - Link format: `https://advisor.portal.com/verify?token=abc456`
8. **Advisor** receives email, clicks verification link
9. **Advisor** lands on Advisor Portal registration page (email pre-filled, family pre-assigned)
10. **Advisor** completes profile: Password, professional info
11. **System** updates association status to `active`
12. **Both parties** receive confirmation notifications
13. **Advisor** sees family in their multi-family dashboard
14. **Family** sees advisor in their advisor list

**Key Principle:** Instant connection creation enables immediate tracking, automated emails eliminate manual sharing, verification ensures security.

---

## 🚀 Product Delivery Phases & Story Sequencing

### Phase 0: Frontend Cleanup - Remove Invite Code UI (🔲 PLANNED)
**Status:** 🔲 Not started - Preparatory work

**Deliverables:**
- 🔲 Remove invite code creation UI components (Advisor Portal)
- 🔲 Remove invite code management dashboard (Advisor Portal)
- 🔲 Remove code entry pages (Family Portal - if exists)
- 🔲 Remove `FamilyInvitation.js` or similar components using mock data
- 🔲 Remove any "Enter Code" forms, modals, buttons
- 🔲 Remove code-related API calls from frontend
- 🔲 Update navigation menus (remove code management links)
- 🔲 Clean up unused CSS/styles related to code UI
- 🔲 Remove code-related state management (Redux/Context if applicable)

**User Story:**
**US-INV-0 (FG-97)** - Remove invite code UI from frontend [Phase 0, Sprint 1]
   - **Dependencies:** None (can start immediately)
   - **Blocks:** US-INV-1 (clean slate for new invite UI)
   - **Deliverable:** All invite code UI components removed from both portals

**Technical Context (for dev team):**
- **Advisor Portal:** Remove existing code creation/management UI (if exists from previous epic)
- **Family Portal:** Remove any code entry forms (partial implementation from EPIC-ADV-INVITE-001)
- **Affected files:** 
  - `frontend/advisor-portal/src/pages/FamilyInvitation.js` (mentioned in previous epic as using mock data)
  - Any code-related components in `src/components/`
  - Navigation/routing files referencing code pages
- **Database:** Backend code tables remain (don't touch DB in this story, only frontend)
- **Backend APIs:** Leave backend code endpoints intact (will be deprecated but not removed for backward compatibility)

**Success Criteria:**
- No visible invite code UI in either portal
- No broken links or 404 errors after removal
- Clean git history (proper commit messages)
- Updated component documentation (if applicable)
- No console errors related to removed components

**Timeline:** 1 week
**Target Release:** Sprint 1, Q4 2025 (before new invite functionality)

---

### Phase 1: Path 1 - Advisor Invites Family (🔲 PLANNED)
**Status:** 🔲 Not started

**Deliverables:**
- 🔲 "Invite Family" button in Advisor Portal
- 🔲 Invitation form: email, first name, last name
- 🔲 Subscription validation logic (check advisor's plan limits)
- 🔲 Upgrade prompt UI if limit exceeded
- 🔲 Instant `FamilyAdvisorAssociation` creation (status=pending)
- 🔲 Automated email service integration
- 🔲 Email template: Family invitation from advisor
- 🔲 Verification link generation and validation
- 🔲 Family Portal registration page with pre-filled email
- 🔲 Association status update to active upon completion

**User Stories (In Order):**
1. 🔲 **US-INV-1 (FG-98)** - Advisor invites family [Phase 1, Sprint 1]
   - **Dependencies:** None (foundational story)
   - **Blocks:** US-INV-2, US-INV-3
   - **Deliverable:** Invite button + form + instant connection

2. 🔲 **US-INV-2 (FG-99)** - Subscription validation [Phase 1, Sprint 1]
   - **Dependencies:** US-INV-1 (integrated into invite flow)
   - **Parallel with:** US-INV-1 (same feature)
   - **Deliverable:** Plan limit check + upgrade prompt

3. 🔲 **US-INV-3 (FG-100)** - Family receives email & verifies [Phase 1, Sprint 2]
   - **Dependencies:** US-INV-1 (email must be sent)
   - **Deliverable:** Email template + verification flow + registration

**User Value:**
- Advisors can invite families with 1 click
- Subscription limits enforced automatically
- Families receive professional automated invitations
- Complete Path 1 (Advisor → Family) user journey

**Success Metrics:**
- 80%+ advisors successfully invite at least one family within 30 days
- < 1 minute time to send invitation
- 70%+ invitation acceptance rate (email sent → verified)
- < 5% subscription upgrade prompts abandoned
- 90%+ families complete registration after clicking verification link

**Timeline:** 3 weeks
**Target Release:** Sprint 1-2, Q4 2025

---

### Phase 2: Path 2 - Family Invites Advisor (🔲 PLANNED)
**Status:** 🔲 Not started

**Deliverables:**
- 🔲 "Invite Advisor" button in Family Portal (Council/Admin only)
- 🔲 Invitation form: email, first name, last name, role dropdown (Personal Family Advisor/External Consul)
- 🔲 Automatic advisor existence check (backend logic, invisible to user)
- 🔲 Conditional payment prompt (shows only if advisor doesn't exist)
- 🔲 Payment integration for advisor subscription
- 🔲 Instant `FamilyAdvisorAssociation` creation with role assignment
- 🔲 Automated email service integration
- 🔲 Custom email templates: Personal Family Advisor template, External Consul template
- 🔲 Verification link generation and validation
- 🔲 Advisor Portal registration page with pre-filled email, family context, and role display
- 🔲 Association status update to active upon completion

**User Stories (In Order):**
4. 🔲 **US-INV-4 (FG-103)** - Family invites advisor with role selection [Phase 2, Sprint 3]
   - **Dependencies:** Phase 1 complete (foundation established)
   - **Blocks:** US-INV-5, US-INV-6, US-INV-7
   - **Deliverable:** Invite button + form + role dropdown (Personal Family Advisor/External Consul)

5. 🔲 **US-INV-5 (FG-104)** - Automatic payment detection [Phase 2, Sprint 3]
   - **Dependencies:** US-INV-4 (integrated into invite flow)
   - **Parallel with:** US-INV-4 (same feature)
   - **Deliverable:** Backend existence check + conditional payment prompt (user doesn't see check result, only payment prompt if needed)

6. 🔲 **US-INV-6 (FG-108)** - Pay for advisor subscription [Phase 2, Sprint 4]
   - **Dependencies:** US-INV-5 (payment only if advisor doesn't exist)
   - **Deliverable:** Payment flow + Stripe integration

7. 🔲 **US-INV-7 (FG-105)** - Advisor receives role-specific email & verifies [Phase 2, Sprint 4]
   - **Dependencies:** US-INV-4 (email must be sent)
   - **Deliverable:** 2 custom email templates (Personal Family Advisor, External Consul) + verification flow + registration

**User Value:**
- Families can invite advisors with clear role assignment
- Automatic payment detection (no manual existence check needed)
- Seamless payment flow only when required
- Advisors receive role-appropriate email with context
- Complete Path 2 (Family → Advisor) user journey

**Success Metrics:**
- 60%+ Family Councils invite at least one advisor within 60 days
- < 1 minute time to send invitation
- 75%+ invitation acceptance rate (email sent → verified)
- 90%+ families understand payment requirement when prompted
- 95%+ advisors complete registration after clicking verification link
- 100% accurate payment detection (no false prompts)

**Timeline:** 4 weeks
**Target Release:** Sprint 3-4, Q4 2025 / Early Q1 2026

---

### Phase 3: Notification System (🔲 PLANNED)
**Status:** 🔲 Not started

**Deliverables:**
- 🔲 Real-time notifications when invitation accepted
- 🔲 Email notifications for both parties upon verification completion
- 🔲 Notification preferences for invitation events

**User Story:**
8. 🔲 **US-INV-8 (FG-106)** - Verification notifications [Phase 3, Sprint 5]
   - **Dependencies:** Phase 1 & 2 complete (both flows working)
   - **Deliverable:** Real-time & email notifications (both directions)

**User Value:**
- Real-time awareness when invitations are accepted
- Professional confirmation experience
- Timely follow-up for onboarding

**Success Metrics:**
- 100% notification delivery rate (both directions)
- < 60 seconds notification latency
- 95%+ users report notifications are helpful

**Timeline:** 1 week
**Target Release:** Sprint 5, Q1 2026

---

## 📊 Story Dependencies & Sequencing

```
Phase 0 (Frontend Cleanup):
└── US-INV-0 (FG-97) 🔲 Remove invite code UI
    └── Blocks: US-INV-1 (clean slate needed)

Phase 1 (Advisor → Family):
├── US-INV-1 (FG-98) 🔲 Advisor invites + form
│   └── Depends on: US-INV-0 (cleanup first)
│   └── Blocks: US-INV-2, US-INV-3
├── US-INV-2 (FG-99) 🔲 Subscription check
│   └── Depends on: US-INV-1 (integrated)
└── US-INV-3 (FG-100) 🔲 Family verifies
    └── Depends on: US-INV-1

Phase 2 (Family → Advisor):
├── US-INV-4 (FG-103) 🔲 Family invites + form + role
│   └── Blocks: US-INV-5, US-INV-6, US-INV-7
├── US-INV-5 (FG-104) 🔲 Automatic payment detection
│   └── Depends on: US-INV-4 (integrated)
├── US-INV-6 (FG-108) 🔲 Payment for advisor
│   └── Depends on: US-INV-5
└── US-INV-7 (FG-105) 🔲 Advisor verifies (role-specific email)
    └── Depends on: US-INV-4

Phase 3 (Notifications):
└── US-INV-8 (FG-106) 🔲 Notifications
    └── Depends on: Phase 1 & 2 complete
```

**Critical Path:**
US-INV-0 (cleanup) → US-INV-1 → US-INV-3 (Path 1) → US-INV-4 → US-INV-7 (Path 2) → US-INV-8

**Can be developed in parallel:**
- US-INV-2 with US-INV-1 (same feature)
- US-INV-5 with US-INV-4 (same feature)

---

## 📐 Design & UX

**Figma Links:**
- [To be added - Advisor Portal "Invite Family" button and form]
- [To be added - Family Portal "Invite Advisor" button and form]
- [To be added - Subscription upgrade prompt]
- [To be added - Payment flow for advisor subscription]
- [To be added - Email templates (both directions)]
- [To be added - Verification & registration pages]

**UX Notes:**

**Path 1 (Advisor → Family) Pages:**
- 🔲 Advisor Portal: "Invite Family" button (prominent placement for Consultants)
- 🔲 Advisor Portal: Invitation modal/form (email, first name, last name)
- 🔲 Advisor Portal: Subscription limit warning (if exceeded)
- 🔲 Advisor Portal: Upgrade plan prompt
- 🔲 Advisor Portal: Notification center - displays in-app notification when family completes verification
- 🔲 Email: Consultant invitation template (professional, clear CTA)
- 🔲 Family Portal: Verification landing page (email pre-filled)
- 🔲 Family Portal: Registration completion form

**Path 2 (Family → Advisor) Pages:**
- 🔲 Family Portal: "Invite Advisor" button (Council/Admin only)
- 🔲 Family Portal: Invitation modal/form (email, first name, last name, role dropdown)
- 🔲 Family Portal: Role dropdown with descriptions:
  - Personal Family Advisor (1-7 modules, limited access)
  - External Consul (all 10 modules, full governance)
- 🔲 Family Portal: Automatic payment detection (system shows prompt only if needed)
- 🔲 Family Portal: Payment prompt (if advisor doesn't exist): "Advisor Portal subscription required: $X/month"
- 🔲 Family Portal: Payment flow (Stripe integration)
- 🔲 Family Portal: Notification center - displays in-app notification when advisor completes verification
- 🔲 Email: Personal Family Advisor invitation template (emphasizes limited access, 1-7 modules)
- 🔲 Email: External Consul invitation template (emphasizes full governance, 10 modules)
- 🔲 Advisor Portal: Verification landing page (email pre-filled, family context, role displayed)
- 🔲 Advisor Portal: Registration completion form

**Shared UX Components:**
- Invitation status badges (pending, verified, active)
- Email verification success screen
- Confirmation modals (both directions)
- Role badges (Personal Family Advisor, External Consul, Consultant)
- Notification bell/center (in-app notifications for verification completion)

**User Flows:**

**Flow 1 (Advisor → Family):**
1. Consultant: Login → Dashboard → Click "Invite Family" → Fill form → Check subscription → Send
2. System: Create association → Send invitation email to family
3. Family: Receive email → Click link → Verify → Complete profile → Active
4. Consultant: Receives in-app notification in Advisor Portal notification center

**Flow 2 (Family → Advisor):**
1. Family Council/Admin: Login → Settings → Click "Invite Advisor" → Fill form + role → System checks payment → Pay (if needed) → Send
2. System: Create association → Send role-specific invitation email to advisor
3. Advisor: Receive email → Click link → Verify → Complete profile → Active
4. Family Council/Admin: Receives in-app notification in Family Portal notification center

**Key UX Principles:**
- **1-click action:** "Invite" button prominently placed
- **Minimal friction:** Only essential fields (email, name, role)
- **Instant feedback:** Success confirmation immediately after sending
- **Clear status:** Always show invitation status (pending/verified)
- **Automated communication:** No manual email composition needed

---

## 🧮 Business Rules

**Key Business Rules:**

### 1. Multi-Tenancy & Data Isolation

**Family Data:**
- All family data strictly filtered by `family_id`
- Families cannot access other families' information
- Family Council members can only invite advisors for their own family
- Advisors can only see families they're associated with

**Advisor Data:**
- Advisors exist in global registry (not tied to single family)
- Advisors can be associated with multiple families
- Advisor PII is encrypted for security
- Each advisor-family relationship is tracked independently

### 2. Invitation Creation (Both Directions)

**Instant Association:**
- Upon clicking "Send Invitation", `FamilyAdvisorAssociation` is created immediately
- Initial status: `pending_verification`
- Association includes: advisor_id (or placeholder), family_id, role (for Path 2), created_at
- If invitee doesn't exist in system, placeholder user created with email only

**Email Generation:**
- System automatically generates verification token (secure, time-limited)
- Email sent immediately via email service
- Email includes: Inviter name, platform details, verification link, role context (if applicable)
- No manual email composition by user

### 3. Permissions & Access Control

**Who Can Send Invitations:**
- **Path 1:** Any Consultant advisor can invite families (if subscription allows)
- **Path 2:** Only Family Council members (`is_family_council = true`) OR Admins (`is_admin = true`) can invite advisors
- Regular family members CANNOT invite advisors

**Role Assignment (Path 2 Only):**
- Family must select role when inviting advisor:
  - **Personal Family Advisor:** Limited access (1-7 modules), family pays subscription
  - **External Consul:** Full governance access (all 10 modules), family pays subscription
- Role is permanently assigned during invitation (cannot be changed post-acceptance in MVP)
- Role determines:
  - Advisor's module access permissions
  - Email template used for invitation
  - Subscription pricing (if payment required)

**Advisor Types Overview:**
```
FAMILY-INVITED ADVISORS (Family Pays):
├─ Personal Family Advisor (1-7 modules)
└─ External Consul (all 10 modules)

MARKETPLACE ADVISORS (Advisor Pays):
└─ Consultant (multiple families, service-based)
```

### 4. Subscription Validation

**Path 1: Consultant Advisor Invites Family**
- Before invitation form appears, system checks advisor's subscription plan
- Query: Current family count vs plan limit
- If `current_families >= plan_limit`:
  - Block invitation
  - Show upgrade prompt: "Your [Plan Name] allows [X] families. Upgrade to [Next Plan] to add more."
  - Provide "Upgrade Now" button → billing page
- If within limit: Allow invitation

**Path 2: Family Invites Advisor (Automatic Payment Detection)**
- **System automatically determines payment requirement (backend logic, invisible to user)**
- After Family Council/Admin enters advisor email and clicks "Send Invitation"
- **Backend checks:** `SELECT * FROM advisors WHERE email = '[input]'`
- **Payment Logic (executed silently):**
  - **If advisor EXISTS (email found in Advisor Portal DB):**
    - Advisor already has active subscription (self-paid or paid by another family)
    - **NO payment required**
    - Skip payment step entirely
    - Proceed directly to send invitation
  - **If advisor DOES NOT EXIST (email not found):**
    - New advisor needs subscription
    - **Payment required**
    - Show payment prompt to family: "Advisor Portal subscription required: $[X]/month. Pay now to grant your advisor access."
    - Block invitation until payment confirmed
- **User Experience:** Family doesn't manually check existence. System either:
  - Shows payment prompt (advisor doesn't exist)
  - OR proceeds without payment (advisor exists)
- **After payment (if needed):** Allow invitation to proceed

### 5. Verification Flow

**Token Generation:**
- Secure token generated for each invitation (UUID or similar)
- Token stored in database with expiration (MVP: no expiration, but could be 7 days)
- Token linked to pending association

**Verification Link:**
- Format: `https://[portal].com/verify?token=[secure_token]`
- Click link → System validates token → Pre-fills email → Shows registration form

**Registration Completion:**
- Invitee enters password + additional required profile fields
- Upon submission: User account created (or updated if placeholder existed)
- Association status updated: `pending_verification` → `active`
- Both parties notified

### 6. Association Status Lifecycle

**Status Flow:**
```
pending_verification → active
```

**Status Definitions:**
- `pending_verification`: Invitation sent, awaiting invitee registration
- `active`: Invitee completed registration, connection fully operational

**No intermediate states:** Unlike code-based system, no "code created but not shared" state

### 7. Duplicate Prevention

**Same Advisor-Family Pair:**
- System checks for existing `FamilyAdvisorAssociation` before creating new one
- Query: `WHERE advisor_id = X AND family_id = Y`
- If exists (any status): Block invitation, show error: "This advisor is already connected to your family."

**Same Email Invited Twice:**
- Allow re-sending invitation if previous status is `pending_verification`
- Option: "Resend Invitation" button for pending invitations
- New email sent with new verification token (old token invalidated)

### 8. Email Deliverability

**Email Requirements:**
- Valid email format required (basic regex validation)
- Email service: Transactional email provider (e.g., SendGrid, AWS SES)
- Email must include: Subject, body, verification link, support contact
- Track email delivery status (sent, delivered, bounced)

**Email Templates (Role-Based):**
- **Path 1 (Consultant → Family):** Single standard template
- **Path 2 (Family → Advisor):** Role-specific templates:
  - **Personal Family Advisor template:** 
    - Emphasizes limited access (1-7 modules)
    - Explains family-paid subscription
    - Lists accessible modules
  - **External Consul template:**
    - Emphasizes full governance access (all 10 modules)
    - Explains strategic advisory role
    - Lists all accessible modules

**Bounce Handling:**
- If email bounces: Update invitation status to `failed`
- Notify inviter: "Email delivery failed. Please verify the email address."
- Allow re-sending with corrected email

### 9. Role-Based Access

**Role Application:**
- **Path 1 (Consultant invites family):** No role selection needed (Consultant is Marketplace Advisor)
- **Path 2 (Family invites advisor):** Role MUST be selected during invitation
  - Personal Family Advisor
  - External Consul
- Role stored in `FamilyAdvisorAssociation.role` field
- Upon registration completion, advisor's permissions are set based on role

**Role Permissions (Path 2 - Family-Invited Advisors):**
- **Personal Family Advisor:** 
  - Limited access (1-7 modules, configurable per family)
  - Examples: Assets, Education, Philanthropy, Tasks
  - Family pays subscription
- **External Consul:** 
  - Full governance access (all 10 modules)
  - Includes: Meetings, Constitution, Decisions, Communication, etc.
  - Family pays subscription

**Role Permissions (Path 1 - Marketplace Advisor):**
- **Consultant:**
  - Access determined by service-based engagement
  - Multiple families, self-paid subscription
  - Module access varies by service contract

**Module Access Overview:**
```
Personal Family Advisor: 1-7 modules (limited)
External Consul:         10 modules (full governance)
Consultant:              Variable (service-based)
```

### 10. Payment Enforcement (Path 2)

**Payment Trigger:**
- Triggered only when family invites advisor who doesn't exist on Advisor Portal
- Payment amount: Advisor Portal monthly subscription fee
- Payment method: Credit card via Stripe (or similar)

**Payment Flow:**
- Family Council/Admin sees payment prompt
- Clicks "Pay Now" → Stripe checkout
- Upon successful payment: Subscription created for advisor
- Invitation proceeds automatically
- If payment fails: Block invitation, show error, allow retry

**See also:** Multi-tenancy rules in `06-business-rules/` (if documented)

---

## 🔗 Dependencies & Risks

### Product Dependencies

**Feature Dependencies:**
- ✅ Advisor registration and authentication (already complete)
- ✅ Family registration and authentication (already complete)
- 🔲 Email service integration (transactional emails)
- 🔲 Payment gateway integration (Stripe for advisor subscriptions)
- 🔲 Subscription management system (track advisor plan limits)
- 🔲 Notification service integration (Phase 3)

**External Dependencies:**
- Auth Service for user lookup and creation (both portals)
- Email Service (SendGrid, AWS SES, or similar) for automated invitations
- Payment Gateway (Stripe) for advisor subscription payments
- Notification Service for real-time alerts (Phase 3)

### Product Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Email Deliverability:** Invitations go to spam, users don't receive them | High | Use reputable transactional email service, proper SPF/DKIM setup, track bounce rates, provide resend support |
| **Payment Friction:** Families abandon invitation when asked to pay for advisor | High | Clear value proposition in payment prompt, transparent pricing, option to decline and notify advisor they need to self-register |
| **Subscription Limit Confusion:** Consultants don't understand why they can't invite more families | Medium | Clear messaging in upgrade prompt, proactive plan limit display in dashboard, easy upgrade path |
| **Role Misassignment:** Family assigns wrong role to advisor (Personal vs External Consul), advisor has incorrect permissions | Medium | Clear role descriptions in form with examples, confirmation modal before sending, support documentation |
| **Duplicate Invitations:** Users accidentally invite same person twice | Low | Duplicate prevention logic, clear messaging if already connected |
| **Verification Link Expiration:** User clicks link after token expires | Medium | Long expiration window (7+ days), "Request new link" option on error page |
| **Incomplete Registration:** User clicks verification link but doesn't complete profile | Medium | Save progress, reminder emails, allow resuming registration |
| **Cross-Portal Confusion:** Users unsure which portal to use after clicking verification link | Low | Clear branding in email, verification link goes directly to correct portal (family vs advisor) |
| **Payment Detection Accuracy:** System shows payment prompt when advisor already exists or vice versa | High | Thorough testing of existence check logic, 100% accuracy target, error logging for failed checks |
| **Role-Specific Email Issues:** Wrong template sent to wrong advisor type | Medium | Template selection validation, automated tests for template routing |

---

## ✅ Acceptance Criteria (Product Level)

**This Epic is complete when:**

### User-Facing Criteria

1. [ ] **Phase 0 (Cleanup) completed successfully:**
   - All invite code UI components removed from both portals
   - No broken links or navigation errors
   - No visible references to "invite codes" in user-facing text
   - Frontend codebase clean (no unused code-related files)

2. [ ] **Path 1 (Advisor → Family) fully functional:**
   - Advisor can click "Invite Family" and see form
   - Subscription validation works (blocks if limit exceeded)
   - Upgrade prompt appears when needed
   - Invitation sent and email delivered < 1 minute
   - Family receives email with working verification link
   - Family completes registration successfully
   - Association status updates to active
   - Both parties see connection in dashboards

2. [ ] **Path 2 (Family → Advisor) fully functional:**
   - Family Council/Admin can click "Invite Advisor" and see form
   - Role selection dropdown works correctly
   - Advisor existence check works accurately (>95% accuracy)
   - Payment prompt appears only when advisor doesn't exist
   - Payment flow completes successfully
   - Invitation sent and email delivered < 1 minute
   - Advisor receives email with working verification link
   - Advisor completes registration successfully
   - Association status updates to active with correct role
   - Both parties see connection in dashboards

3. [ ] **Permission enforcement working:**
   - Only Family Council members or Admins can invite advisors
   - Regular family members see clear message explaining restriction
   - All advisors can invite families (within subscription limits)

4. [ ] **Email delivery reliable:**
   - 95%+ emails delivered successfully
   - Emails render correctly in major email clients (Gmail, Outlook, Apple Mail)
   - Verification links work on mobile and desktop
   - Bounce handling implemented with user notification

5. [ ] **UI/UX matches approved designs:**
   - All forms, modals, and pages implemented per Figma specs
   - Consistent design language across both portals
   - Mobile-responsive invite forms and registration pages

6. [ ] **User documentation complete:**
   - Advisor guide: "How to invite a family to your services"
   - Family Council/Admin guide: "How to invite your advisor to the platform" (includes payment info)
   - FAQ: Common questions about invitations, roles, subscriptions
   - Video tutorial: Complete invitation flow (both directions)

### Business Criteria

7. [ ] **Business rules validated:**
   - Multi-tenancy isolation (no cross-family data leaks)
   - Permission-based invitation (Council/Admin for Path 2)
   - Subscription validation (advisor plan limits)
   - Advisor existence check (accurate detection)
   - Payment enforcement (required when advisor doesn't exist)
   - Role assignment (correct permissions applied)
   - Duplicate prevention (no duplicate associations)

8. [ ] **Key business metrics trackable:**
   - **Path 1 metrics:**
     - Invitation send rate (invites per advisor per month)
     - Invitation acceptance rate (sent → verified)
     - Subscription upgrade rate (prompted → upgraded)
   - **Path 2 metrics:**
     - Invitation send rate (invites per Family Council per quarter)
     - Invitation acceptance rate (sent → verified)
     - Payment completion rate (prompted → paid)
     - Advisor existence detection accuracy
   - **Cross-path metrics:**
     - Time to send invitation (target: < 1 minute)
     - Time to complete registration (target: < 5 minutes)
     - Email deliverability rate (target: >95%)
     - Connection quality (% active after 90 days)

9. [ ] **Stakeholder demo conducted and approved:**
   - Demo of both Path 1 and Path 2 workflows
   - Approval from Family Council representative
   - Approval from Advisor representative
   - Approval from Finance (payment flow)

10. [ ] **Adoption targets met (90 days post-launch):**
    - 80%+ advisors invite at least one family
    - 50%+ Family Councils invite at least one advisor
    - 60%+ new advisor-family connections use invitation system
    - 75%+ invitations accepted within 7 days

### Quality Criteria

11. [ ] **All critical/high bugs fixed** in both paths

12. [ ] **Regression testing passed:**
    - No existing features broken in either portal
    - Existing authentication flows unchanged

13. [ ] **Performance acceptable:**
    - Invitation form submission < 500ms
    - Email sent < 30 seconds after submission
    - Verification link redirect < 1 second
    - Registration completion < 1 second

14. [ ] **Security audit passed:**
    - Multi-tenancy isolation verified (both paths)
    - Permission enforcement tested (Family Council/Admin restriction)
    - Verification token security validated (no token prediction)
    - Payment flow secure (PCI compliance if handling card data)
    - Advisor PII encryption verified
    - No cross-family data leaks possible
    - Email links use HTTPS only

15. [ ] **Email deliverability tested:**
    - Emails don't go to spam (>95% inbox delivery)
    - SPF/DKIM/DMARC configured correctly
    - Email templates render in all major clients
    - Bounce handling works correctly

### Documentation

16. [ ] **Feature Spec in KB:** Status "published" with bidirectional flow documented

17. [ ] **User-facing documentation complete:**
    - 2 invitation guides (advisor, family)
    - FAQ addressing common questions about invitations, roles, subscriptions
    - Troubleshooting guide (email not received, verification link issues)
    - Video tutorials showing both workflows

18. [ ] **Internal documentation updated:**
    - System Components Catalog updated with invitation functionality
    - Persona documents updated with invitation scenarios
    - Business rules documented for both paths
    - Email templates documented in codebase

---

## 📅 Estimated Timeline

**Overall Timeline:**

### Phase 0: Frontend Cleanup
1. **Code Review:** 0.5 weeks
   - Identify all invite code UI components across both portals
   - Create cleanup checklist
   - Plan safe removal strategy (avoid breaking other features)
2. **Development:** 0.5 weeks
   - US-INV-0: Remove invite code UI components
   - Remove navigation links
   - Clean up unused styles
3. **Testing:** 0.5 weeks
   - Verify no broken links or 404 errors
   - Regression testing (ensure nothing else broke)
   - Deploy to production

**Phase 0 Total:** 1.5 weeks
**Phase 0 Target Release:** Sprint 1, Q4 2025

---

### Phase 1: Path 1 - Advisor Invites Family
1. **Discovery & Design:** 1 week
   - Design invitation form and flow
   - Define subscription validation logic
   - Create email template
   - Design upgrade prompt
2. **Development:** 2 weeks
   - US-INV-1: Invite button, form, instant association (1 week)
   - US-INV-2: Subscription validation (0.5 weeks)
   - US-INV-3: Email service integration, verification flow (0.5 weeks)
3. **Testing & Release:** 1 week
   - End-to-end testing Path 1
   - Email deliverability testing
   - Security review
   - Deploy to production

**Phase 1 Total:** 4 weeks
**Phase 1 Target Release:** Sprint 1-2, Q4 2025

---

### Phase 2: Path 2 - Family Invites Advisor
1. **Discovery & Design:** 1 week
   - Design invitation form with role selection
   - Define advisor existence check logic
   - Design payment flow
   - Create email template for advisors
2. **Development:** 3 weeks
   - US-INV-4: Invite button, form, role selection (1 week)
   - US-INV-5: Advisor existence check (0.5 weeks)
   - US-INV-6: Payment integration (Stripe) (1 week)
   - US-INV-7: Email service integration, verification flow (0.5 weeks)
3. **Testing & Release:** 1 week
   - End-to-end testing Path 2
   - Payment flow testing
   - Email deliverability testing
   - Security review
   - Deploy to production

**Phase 2 Total:** 5 weeks
**Phase 2 Target Release:** Sprint 3-4, Late Q4 2025 / Early Q1 2026

---

### Phase 3: Notification System
1. **Discovery & Design:** 0.5 weeks
   - Define notification triggers
   - Configure notification templates for both directions
2. **Development:** 0.5 weeks
   - US-INV-8: Verification notifications
3. **Testing & Release:** 0.5 weeks
   - Test notifications both directions
   - Verify notification delivery
   - Deploy to production

**Phase 3 Total:** 1.5 weeks
**Phase 3 Target Release:** Sprint 5, Q1 2026

---

**Total Timeline:** 11 weeks across Phases 0-3 (Phase 0: 1.5 weeks, Phase 1: 4 weeks, Phase 2: 5 weeks, Phase 3: 1.5 weeks)
**MVP Target Release (All Paths Functional):** Q1 2026

---

## 🔗 Related Documentation

**Product Documentation:**
- User Journey: [To be created - Bidirectional email-based invitation]
- Feature Spec: [To be created in KB]
- Business Rules: `06-business-rules/` (multi-tenancy, permissions, subscriptions, payments)

**Design Resources:**
- Figma: [To be added - both portals, both paths]
- Email Templates: [To be added - invitation emails for both directions]
- User Research: [To be added]

**Personas:**
- `external-advisor-persona.md` - Primary user for Path 1 initiation, Path 2 reception
- `family-council-member-persona.md` - Primary user for Path 2 initiation, Path 1 reception
- `family-member-persona.md` - Secondary user for Path 1 reception

**System Context:**
- `SYSTEM_COMPONENTS_CATALOG.md` - Architecture overview
- Advisor Portal Service (port 8011) - Association-based access
- Family Portal (port 3001) - Family_id-based access
- Auth Service (port 8001) - User authentication both portals
- Notification Service (port 8010) - Verification notifications (Phase 3)

---

## 📝 Notes

### Discovery Notes

**Migration from Code-Based to Email-Based System:**
- **Previous Implementation:** EPIC-ADV-INVITE-001 partially implemented invite code system
  - Backend API for code generation/validation (100% complete, production-ready)
  - Advisor Portal UI with code creation/management (partial, uses mock data)
  - Family Portal code entry page (20% complete, not deployed)
- **Reason for Change:** User research and stakeholder feedback identified:
  - Code sharing friction (users forget codes, typos in manual entry)
  - Code management complexity (dashboard, expiration, deactivation)
  - Unfamiliar pattern for target audience (prefer email invitations)
  - Monetization challenges (payment not integrated into code flow)
- **Migration Strategy:**
  - **Phase 0:** Remove all code-related UI components from frontend (clean slate)
  - **Phases 1-3:** Build new email-based invitation system
  - **Backend:** Keep existing code API endpoints for backward compatibility (deprecate but don't remove)
  - **Database:** Existing `AdvisorInviteCode` tables remain unused (potential future use or cleanup)

**Design Philosophy:**
- **Simplicity over flexibility:** Single "Invite" button vs complex code management
- **Instant gratification:** Connection created immediately, no waiting for code redemption
- **Automated communication:** System handles emails, no manual message composition
- **Built-in monetization:** Subscription validation and payment prompts integrated into flow

**Key Design Decisions:**
- **2025-10-20** - Removed invite codes: Users no longer see or manually share codes
- **2025-10-20** - Email-based only: All invitations sent via automated emails
- **2025-10-20** - Instant connection: `FamilyAdvisorAssociation` created immediately upon invitation
- **2025-10-20** - Role assignment: Family selects Personal Family Advisor or External Consul role during invitation
- **2025-10-20** - Three advisor types defined:
  - Family-Invited: Personal Family Advisor (1-7 modules), External Consul (10 modules) - family pays
  - Marketplace: Consultant (service-based, multiple families) - advisor pays
- **2025-10-20** - Subscription validation: Consultant plan limits checked before sending invitation
- **2025-10-20** - Automatic payment detection: System silently checks advisor existence, shows payment prompt ONLY if needed
- **2025-10-20** - Family doesn't manually check existence: Backend logic determines payment requirement automatically
- **2025-10-20** - Verification flow: Invitee clicks email link, completes registration, connection activates
- **2025-10-20** - Custom email templates: Personal Family Advisor template, External Consul template, Consultant template
- **2025-10-20** - Frontend cleanup: Phase 0 added to remove all existing invite code UI before building new system
- **2025-10-20** - Invitation tracking removed from MVP: Phase 3 only includes notifications, not tracking dashboard

**Advantages Over Code-Based System:**
- Faster user flow (1 click vs multi-step code sharing)
- No code management complexity (no dashboard, expiration, deactivation)
- No user errors (no typos in manual code entry)
- Built-in monetization (subscription and payment checks)
- Professional email communication (no generic codes)
- Instant tracking (know immediately when invitation sent)

### Risks to Monitor Post-Launch

**Usage Pattern Risks:**
- If 90%+ connections use only one path, evaluate if bidirectional model necessary
- If email acceptance rate < 60%, investigate deliverability or messaging issues
- If payment completion rate < 70%, optimize payment prompt UX

**Operational Risks:**
- Email deliverability issues (spam filters, bounces)
- Payment gateway downtime or errors
- Subscription validation logic errors (allowing invites when shouldn't)
- Verification token security vulnerabilities

**Mitigation Plan:**
- Monitor email delivery rates daily (first 30 days)
- A/B test payment prompt messaging (first 60 days)
- Weekly review of subscription validation edge cases
- Monthly security audit of verification tokens

---

**Template Version:** epic-template 2.1.0
**Epic Version:** 2.3.0
**Last Updated:** 2025-10-20
**Next Review:** After Phase 0 completion (Q4 2025)