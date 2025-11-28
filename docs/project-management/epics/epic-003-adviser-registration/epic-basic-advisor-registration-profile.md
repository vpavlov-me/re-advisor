---
epic_id: "EPIC-003"
title: "Basic Advisor Registration & Profile"
type: "epic"
category: "advisor-platform"
status: "ready-for-planning"
priority: "critical"
created: "2025-10-17"
updated: "2025-10-20"
owner: "Eduard Izgorodin"
stakeholder: "Product Team"
related_epics: ["EPIC-004"]
tags: ["advisor", "registration", "marketplace", "profile", "subscription", "oauth"]
---

# Epic: Basic Advisor Registration & Profile

## 📋 Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** Basic Advisor Registration & Profile  
**Summary:** Enable advisors to register with subscription, build professional profiles with expertise mapping, and prepare for marketplace publication  
**Parent Initiative:** FG-XXX [Advisor Marketplace Platform]  
**Priority:** Critical  
**Epic Link:** FG-EPIC-ADV-REG-001  

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Complete advisor registration and profile building system enabling external advisors to create marketplace-ready profiles.

**User-facing value (what users can do after this Epic):**
- Register via OAuth (LinkedIn, Google, Apple) or email with subscription selection on registration form
- Build comprehensive professional profiles with photo, bio, work history, and expertise
- Map specializations to platform's 10 governance modules (Conflicts, Constitution, Family Council, Decision Making, Education, Mentorship, Assets, Succession, Philanthropy, Family Management)
- Save draft profiles and resume completion later
- Convert from invited-only advisor to marketplace presence (for advisors initially onboarded by families)

**Business value (how business benefits):**
- Generate recurring subscription revenue from independent advisors
- Build qualified advisor database for marketplace launch
- Enable data-driven advisor-family matching through module-based expertise
- Create conversion funnel: invited advisors → marketplace participants
- Reduce support burden through self-service registration

**Scope boundaries:**

**✅ INCLUDED:**
- Registration flow with subscription selection and payment on same form (advisor PAYS platform)
- OAuth integration (LinkedIn, Google, Apple)
- Email registration with verification
- Basic profile fields (photo, name, title, bio, contact)
- Work experience and education entries
- Expertise selection with 10 governance modules (1-7 modules, up to 3 primary)
- Manual draft saving and profile preview
- Invited advisor conversion to marketplace (upgrade from single-family to marketplace access)

**❌ NOT INCLUDED:**
- Identity verification/KYC (Stage 7 - FG-EPIC-ADV-KYC-001)
- Service catalog configuration (Stage 8 - FG-EPIC-ADV-SERV-001)
- Payment setup for advisor earnings - Stripe Connect (Stage 9 - FG-EPIC-ADV-PAY-001)
- Profile moderation workflow (Stage 10 - admin epic)
- Marketplace publication (Stage 11 - marketplace epic)

**Important:** This epic covers subscription payment where advisor PAYS the platform. Stripe Connect for advisor EARNINGS (receiving payouts from families) is separate epic.

---

## 👥 Target Users

**Who will use this feature?**

- **Primary Personas:** External Advisors (Independent Professionals)
  - Independent consultants, mediators, family governance specialists seeking marketplace presence
  - Reference: `02-user-personas/external-advisor-persona.md`
  
- **Secondary Personas:** 
  - Converting Invited Advisors (advisors initially onboarded by families who want marketplace access)
  - Platform Administrators (monitor onboarding quality)

---

## 📖 User Stories (High-Level)

**Main scenarios this Epic will enable:**

1. **As an** External Advisor, **I want to** register using OAuth (LinkedIn, Google, Apple) with subscription selection on registration form, **so that** I can quickly create a paid account and import professional information in one step

2. **As an** External Advisor, **I want to** register using email/password with subscription selection, **so that** I have control over credentials while subscribing to marketplace access

3. **As an** External Advisor, **I want to** build comprehensive professional profile with photo, bio, and contact information, **so that** families can see my basic professional identity

4. **As an** External Advisor, **I want to** add my work history and educational background, **so that** families can evaluate my qualifications and credibility

5. **As an** External Advisor, **I want to** select expertise areas from 10 governance modules, **so that** families find me for relevant needs

6. **As an** External Advisor, **I want to** manually save profile as draft and resume later, **so that** I don't lose work if interrupted

7. **As an** Invited Advisor, **I want to** upgrade to marketplace presence, **so that** I can acquire additional family clients beyond my current relationship

**Detailed User Stories will be created in FG during Grooming:**
- FG-001: OAuth Registration with Subscription (8 SP)
- FG-002: Email Registration with Subscription (5 SP)
- FG-003: Basic Profile Information (5 SP)
- FG-004: Work Experience & Education (5 SP)
- FG-005: Expertise Module Selection (5 SP)
- FG-006: Draft Profile Saving (3 SP)
- FG-007: Invited Advisor Conversion (5 SP)

---

## 🔗 Dependencies & Risks

### Dependencies (Blockers)

**Upstream (what must be completed before this Epic can start):**
- **OAuth Providers:**
  - LinkedIn OAuth app credentials configured
  - Google OAuth app credentials configured
  - Apple Sign In credentials configured
- **Stripe Integration:**
  - Stripe account configured with subscription plans, pricing, and trial logic
  - Stripe API keys (test and production)
  - Stripe webhook endpoint configured
- **Storage:**
  - S3 bucket for photo/document storage
  - CDN for photo delivery
- **Email Service:**
  - Email service configured (SendGrid/SES or SMTP)

**Downstream (what depends on this Epic):**
- Epic: FG-EPIC-ADV-KYC-001 - Identity Verification (requires completed profile)
- Epic: FG-EPIC-ADV-SERV-001 - Service Catalog (requires verified profile)
- Epic: FG-EPIC-ADV-PAY-001 - Stripe Connect for Earnings (requires profile + KYC)
- Epic: FG-EPIC-ADV-MKTPL-001 - Marketplace Publication (requires all above)

**External Dependencies:**
- LinkedIn API availability
- Google OAuth API availability
- Apple Sign In API availability
- Stripe payment processing uptime
- Email deliverability

### Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| High registration abandonment (>50%) | High | Progress indicators, motivation, minimize required fields (60% minimum) |
| Payment integration complexity on form | High | Use Stripe Payment Element, test thoroughly, fallback to post-registration payment if needed |
| OAuth provider API changes/downtime | Medium | Email registration fallback, monitor OAuth rates, clear error messages |
| Poor quality profiles affecting trust | Medium | 60% minimum completion, examples/guidelines, photo quality tips |
| Subscription pricing rejection | High | 30-day free trial, clear ROI messaging, annual discount |
| Converting advisor data conflicts | Medium | Clear data mapping, manual overrides, preview before save |

---

## 🎨 Design & UX

**Figma Links:**
- Registration Flow - OAuth and Email with Subscription *(to be added)*
- Profile Builder - Multi-Step Form *(to be added)*
- Expertise Selection Interface *(to be added)*
- Dashboard Draft Widget *(to be added)*

**UX Notes:**

**Registration Flow Pattern (follows Family Portal):**
```
Step 1: Personal Information (OAuth OR Email)
Step 2: Email Verification (if email path)
Step 3: Subscription & Payment (ON SAME FORM)
  ├── Subscription Plan Dropdown
  ├── Payment Method (Stripe Element)
  ├── Terms Acceptance
  └── [Complete Registration]

After Submit → Advisor Portal Dashboard (NOT profile builder)
```

**Profile Building Flow:**
```
Dashboard "Complete Your Profile" CTA →
Step 1 of 4: Basic Information →
Step 2 of 4: Experience & Education →
Step 3 of 4: Expertise Selection →
Step 4 of 4: Review & Submit
```

**Key UX Principles:**
- Progressive disclosure with clear progress ("Step 2 of 4")
- Pre-populate from OAuth when available
- Inline validation with real-time feedback
- Mobile responsive (desktop primary, tablet/mobile supported)
- Manual save with "Save as Draft" button
- Profile completion percentage tracking

**See also:** User Journey `user-journey-independent-advisor-marketplace.md` (Stages 1-6)

---

## 🧮 Business Rules

**Key Business Rules:**

**1. Profile Completion Requirements**
```
Minimum for Submission (60%):
- Profile photo (10%)
- Full name (10%)
- Professional title (10%)
- Bio (min 100 chars, 10%)
- Email verified (10%)
- At least 1 work experience (10%)

Optional for Higher Quality (40%):
- Phone, location, expertise, years experience (10% each)

Submission: Allowed at 60%+, recommended 80%+ for marketplace ranking
```

**2. Subscription Management**
- Subscription plans, pricing, trial periods, and billing logic managed through **Stripe dashboard** by platform provider
- Payment collection via Stripe Payment Element on registration form
- Payment required before account creation
- Subscription status tracked in advisor record

**3. Expertise Selection Rules**
- Minimum 1 module, maximum 7 modules
- Primary designation: 1-3 modules maximum
- 10 governance modules available: Conflicts, Constitution, Family Council, Decision Making, Education, Mentorship, Assets, Succession, Philanthropy, Family Management

**4. Draft Management**
- **Manual save only** via "Save as Draft" button
- Draft stored with profile completion percentage
- Email reminders at 24h, 3d, 7d, 14d intervals
- Draft archived after 90 days inactive
- Resume draft from dashboard "Complete Your Profile" CTA

**5. Converting Advisor Requirements**
- Current status: Invited advisor (from JRN-ADV-002)
- Must complete missing profile sections to reach 60%
- Subscription payment required (upgrade from free invited to paid marketplace)
- Existing family association maintained post-conversion

**6. Data Validation**
- Photo: JPG/PNG, max 5MB, min 400x400px
- Email: Unique, RFC 5322 format, verification required
- Password: Min 8 chars, complexity requirements
- Work experience: End date >= start date, min 1 entry
- Bio: 100-500 characters, professional content only

**See also:** 
- Stripe subscription configuration documentation
- User Journey `user-journey-independent-advisor-marketplace.md` for detailed business logic

---

## 📅 Estimated Timeline

**Phases:**

1. **Week 1-2: Registration with Subscription (64h)**
   - OAuth integration (LinkedIn, Google, Apple)
   - Email registration with verification
   - Subscription selection UI on form
   - Stripe Payment Element integration
   - Database setup with PII encryption

2. **Week 2-3: Profile Building (40h)**
   - Basic profile information (photo, name, bio, contact)
   - Work experience and education entries
   - Document uploads for credentials

3. **Week 3-4: Expertise & Conversion (40h)**
   - Module selection interface (10 governance modules)
   - Manual draft saving and progress tracking
   - Invited advisor conversion flow
   - Testing and bug fixes

**Total Duration:** 4 weeks (~144 hours)

**Target Release:** Sprint 45 (Q1 2025 - Week 4)

---

## 📝 Notes

**Open Questions:**
- [ ] Should subscription plans offer monthly payment option or annual only?
  - **Answer:** Depends on Stripe dashboard configuration - can be any billing frequency configured by platform provider
- [ ] What happens if invited advisor conversion payment fails?
  - **Answer:** Advisor cannot proceed to complete marketplace profile until subscription payment succeeds. Account remains in invited-only status with option to retry payment.

**Decisions Made:**
- ✅ **GDPR Compliance:** YES - Platform will implement GDPR-compliant data handling (encryption, export, deletion rights) for EU-based advisors
- ✅ **Apple Sign In:** YES - Apple Sign In will be included in Phase 1 alongside LinkedIn and Google OAuth

**Related Documentation:**
- User Journey: `user-journey-independent-advisor-marketplace.md` (Stages 1-6)
- Persona: `external-advisor-persona.md`
- System Catalog: `SYSTEM_COMPONENTS_CATALOG.md` (Advisor Portal Service port 8011)

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-17  
**Epic Status:** Ready for Sprint Planning  
**Sprint:** Sprint 45