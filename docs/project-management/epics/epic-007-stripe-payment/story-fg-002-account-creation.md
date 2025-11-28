---
story_id: "FG-002"
epic: "EPIC-007"
title: "Stripe Account Creation Backend"
priority: "critical"
sprint: "Week 1"
story_points: "8"
---

# User Story: Stripe Account Creation Backend

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a system, I need to create Stripe Connect Express Account for consultant, so that consultant can proceed with payment onboarding
**Epic Link:** EPIC-007 - Stripe Connect Payment Setup for Consultants
**Priority:** Critical
**Story Points:** 8
**Sprint:** Week 1

---

## 📖 User Story

**As a** Backend System,
**I want to** create Stripe Connect Express Account when consultant initiates payment setup,
**so that** consultant has valid Stripe Account ID to proceed with embedded onboarding.

---

## 🎯 Business Context

**Why is this Story important?**

**Technical foundation:**
- Stripe Account ID is prerequisite for all subsequent payment operations
- Must be created before consultant can access Stripe's onboarding interface
- Account creation establishes relationship between platform and consultant in Stripe

**Business outcome expected:**
- Enable consultant to start Stripe onboarding process
- Establish payment processing capability for marketplace transactions
- Create audit trail of payment setup initiation

**Strategic alignment:**
- Core infrastructure for marketplace monetization
- Enables automated payment processing at scale
- Foundation for future payment features (invoicing, payouts, reporting)

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** consultant clicks "Start Stripe Setup" on guidance screen,
   **When** backend receives account creation request,
   **Then** system creates Stripe Connect Express Account via Stripe API.

2. **Given** Stripe account creation succeeds,
   **When** Stripe returns Account ID,
   **Then** system stores Account ID in consultant profile with timestamp and status='initiated'.

3. **Given** Stripe account creation fails,
   **When** Stripe API returns error,
   **Then** system logs error details and displays user-friendly error message to consultant.

4. **Given** consultant already has Stripe Account ID,
   **When** consultant attempts to create account again,
   **Then** system skips creation and proceeds to session generation using existing Account ID.

5. **Given** account creation request includes consultant profile data,
   **When** calling Stripe API,
   **Then** system passes consultant's email, country, and business type to pre-fill Stripe onboarding.

**Additional Criteria:**
- [ ] Stripe Account ID stored securely in database (consultant profile table)
- [ ] Idempotency: Multiple creation attempts don't create duplicate accounts
- [ ] Error logging captures Stripe API errors for debugging
- [ ] Account creation timestamp recorded
- [ ] Account type set to 'express' (not standard or custom)
- [ ] Platform's Stripe Connect application ID used
- [ ] Consultant notified if creation fails with actionable next steps

---

## 🔐 Business Rules

**Validation Rules:**
1. **Account Creation Prerequisites**:
   - Consultant profile must exist and be active
   - Profile verification status = 'verified'
   - Active subscription (Standard or Premium tier)
   - No existing Stripe Account ID in profile

2. **Stripe Account Configuration**:
   - Account type: `express` (Stripe handles compliance and onboarding)
   - Capabilities requested: `card_payments`, `transfers`
   - Pre-fill data from consultant profile:
     - Email address
     - Country
     - Business type (individual vs company)

3. **Idempotency Rules**:
   - If Stripe Account ID already exists: Skip creation, return existing ID
   - If creation in progress: Return existing request (prevent duplicates)
   - Use idempotency key in API call (consultant_id + timestamp)

**Authorization:**
- **Who can trigger account creation:** Only authenticated consultants for their own profile
- **Platform permissions required:** Stripe Connect platform account with appropriate scopes

**Edge Cases:**
- **Consultant in unsupported country**: API call fails, return error "Stripe not available in your country"
- **Stripe API timeout**: Retry once, if fails log error and display "Service temporarily unavailable"
- **Invalid email format**: Validate before API call, return validation error
- **Platform Stripe account suspended**: Block creation, notify admin, display maintenance message

---

## 🎨 Design & UX

**User Flow:**
1. Consultant clicks "Start Stripe Setup" (Story 1)
2. System creates payment account with Stripe
3. System stores payment account identifier
4. System confirms account creation to consultant
5. Consultant proceeds to complete onboarding (Story 3)

**What Consultant Experiences:**
- Brief loading indicator ("Creating secure payment account...")
- Seamless transition to onboarding interface
- No visible account creation step (happens automatically)
- If error: Clear message "Unable to create payment account. Please try again."

---

## 🧪 Test Scenarios

**Happy Path:**
1. Authenticated consultant with verified profile initiates setup
2. Backend receives account creation request
3. Backend calls Stripe API with consultant data (email, country)
4. Stripe returns Account ID successfully
5. Backend stores Account ID in consultant profile
6. Backend returns Account ID to frontend
7. Frontend proceeds to session generation

**Negative Tests:**
1. **Duplicate Creation Attempt:**
   - Given: Consultant already has Stripe Account ID
   - When: Attempts to create account again
   - Then: Backend skips creation, returns existing Account ID with status='existing'

2. **Stripe API Failure:**
   - Given: Stripe API returns 500 error
   - When: Backend retries once
   - Then: If retry fails, log error and return user-friendly error message

3. **Unauthorized Access:**
   - Given: Non-consultant user attempts to create account
   - When: Backend validates role
   - Then: Returns 403 Forbidden error

4. **Profile Verification Incomplete:**
   - Given: Consultant profile verification = 'pending'
   - When: Attempts to create account
   - Then: Returns validation error "Complete profile verification first"

**Edge Cases:**
1. **Consultant in Unsupported Country:**
   - Given: Consultant country = "Iran" (Stripe unsupported)
   - When: Backend calls Stripe API
   - Then: Stripe returns error, backend returns "Stripe not available in your country"

2. **Network Timeout:**
   - Given: Stripe API request times out (>30 seconds)
   - When: Backend retry logic executes
   - Then: Returns error "Service temporarily unavailable, please try again"

3. **Concurrent Requests:**
   - Given: Frontend sends duplicate requests simultaneously
   - When: Backend uses idempotency key
   - Then: Only one account created, both requests return same Account ID

---

## 📗 Dependencies

**Story Dependencies:**
- **Blocked by:**
  - FG-001 (Pre-Setup Guidance Screen) - user journey starts there
  - Platform Stripe Connect account setup (infrastructure)
- **Blocks:**
  - FG-003 (Account Session Generation)
  - FG-004 (Embedded Onboarding Component)

**Technical Dependencies:**
- Platform has agreement with payment processor (Stripe)
- Payment account creation service available
- Consultant profile database ready to store payment account reference

**External Dependencies:**
- Payment processor (Stripe) service availability
- Network connectivity to payment processor

---

## ⚠️ Non-Functional Requirements

**Security:**
- Authorization required: Yes (consultant role only, own profile)
- Data encryption: Payment account identifier stored securely
- PII handling: Consultant email and country used for account setup (already consented)

**Performance:**
- Account creation time: < 3 seconds
- Retry on failure: 1 automatic retry
- Timeout: 30 seconds maximum

**Reliability:**
- Prevent duplicate accounts: System checks if account already exists
- Error logging: Track all failures for support team
- Success rate monitoring: Alert if failure rate >5%

**Browser Support:**
- N/A (backend process)

---

## 📝 Notes

**Open Questions:**
- [ ] Should system support business accounts initially, or individual only?
  - **Recommendation:** Support both, default to 'individual'
- [ ] What if consultant changes country after account created?
  - **Recommendation:** Block country changes if payment account exists
- [ ] Should system validate country support before account creation?
  - **Recommendation:** Yes, display supported countries in guidance

---

**Story Version:** 1.0.0
**Last Updated:** 2025-10-23
**Status:** Ready for Development
