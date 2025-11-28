---
story_id: "FG-003"
epic: "EPIC-007"
title: "Generate Account Session for Stripe Embedded Onboarding"
priority: "critical"
sprint: "Week 2"
story_points: "5"
---

# User Story: Generate Account Session for Stripe Embedded Onboarding

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a system, I need to generate Stripe Account Session, so that frontend can display embedded onboarding component
**Epic Link:** EPIC-007 - Stripe Connect Payment Setup for Consultants
**Priority:** Critical
**Story Points:** 5
**Sprint:** Week 2

---

## 📖 User Story

**As a** Backend System,
**I want to** generate Stripe Account Session with client_secret,
**so that** frontend can securely access Stripe's embedded onboarding component without exposing API keys.

---

## 🎯 Business Context

**Why is this Story important?**

**Technical foundation:**
- Account Session provides secure, time-limited access to Stripe's embedded components
- Prevents frontend from needing Stripe API keys (security best practice)
- Enables seamless integration of Stripe UI within platform interface

**Business outcome expected:**
- Enable consultant to complete Stripe onboarding without leaving platform
- Maintain consistent branding and user experience
- Reduce consultant friction (no redirect to Stripe-hosted pages)

**Strategic alignment:**
- Enables embedded onboarding experience (better UX than redirect flow)
- Maintains platform control over user journey
- Foundation for future embedded Stripe features (dashboard, payouts UI)

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** Stripe Account ID exists for consultant,
   **When** frontend requests Account Session,
   **Then** backend generates session via Stripe API and returns client_secret.

2. **Given** Account Session is requested,
   **When** backend calls Stripe API,
   **Then** session configured for `account_onboarding` component with return URL.

3. **Given** Account Session generation succeeds,
   **When** Stripe returns client_secret,
   **Then** backend returns client_secret to frontend (expires in 1 hour).

4. **Given** Account Session generation fails,
   **When** Stripe API returns error,
   **Then** backend logs error and returns user-friendly error message.

5. **Given** consultant already completed onboarding,
   **When** session requested again (for updates),
   **Then** backend generates fresh session allowing data modifications.

**Additional Criteria:**
- [ ] Session expires after 1 hour (Stripe default)
- [ ] Return URL configured to platform's completion page
- [ ] Component type set to 'account_onboarding'
- [ ] Features configured: external_account_collection, account_management (for updates)
- [ ] Error handling for expired Account Sessions
- [ ] Rate limiting: Max 10 session generations per consultant per hour

---

## 🔐 Business Rules

**Validation Rules:**
1. **Session Generation Prerequisites**:
   - Consultant must be authenticated
   - Stripe Account ID must exist in consultant profile
   - Consultant subscription must be active

2. **Session Configuration**:
   - Component type: `account_onboarding`
   - Features enabled:
     - `external_account_collection` (bank account setup)
     - `account_management` (allows updates after initial setup)
   - Return URL: `https://advisor-portal.domain.com/#/payment-setup/complete`

3. **Security Rules**:
   - client_secret must never be logged or stored
   - Session valid for 1 hour only
   - Each session single-use for onboarding completion
   - Generate fresh session for each request (no caching)

**Authorization:**
- **Who can request session:** Only authenticated consultants for their own profile
- **Rate limiting:** Max 10 requests per hour per consultant (prevent abuse)

**Edge Cases:**
- **Stripe Account ID missing**: Return error "Payment account not initialized"
- **Stripe API timeout**: Retry once, if fails return error
- **Account Session expired**: Frontend should request fresh session
- **Consultant completes onboarding mid-session**: Session remains valid for updates

---

## 🎨 Design & UX

**User Flow:**
1. System has payment account identifier (from Story 2)
2. System generates secure access token for onboarding
3. System provides token to consultant interface
4. Consultant interface uses token to display onboarding (Story 4)
5. Token expires after 1 hour (Stripe security requirement)
6. If expired, system generates fresh token automatically

**What Consultant Experiences:**
- No visible "session generation" step
- Seamless transition from guidance to onboarding
- If session expires during use: Automatic refresh without interruption
- If error: "Unable to access onboarding. Please try again."

**Business Flow:**
```
Consultant ready to start onboarding
↓
System generates secure access (valid 1 hour)
↓
Onboarding interface opens with access token
↓
Consultant completes onboarding steps
↓
If consultant returns later: Fresh access generated
```

---

## 🧪 Test Scenarios

**Happy Path:**
1. Consultant with Stripe Account ID initiates onboarding
2. Frontend requests Account Session
3. Backend retrieves Stripe Account ID from consultant profile
4. Backend calls Stripe API to generate session
5. Stripe returns client_secret (valid 1 hour)
6. Backend returns client_secret to frontend
7. Frontend initializes embedded component with client_secret

**Negative Tests:**
1. **No Stripe Account ID:**
   - Given: Consultant profile has no stripe_account_id
   - When: Session generation requested
   - Then: Returns error "Payment account not initialized"

2. **Stripe API Failure:**
   - Given: Stripe API returns 500 error
   - When: Backend retries once
   - Then: If retry fails, return error "Unable to generate session"

3. **Unauthorized Access:**
   - Given: Family Member attempts to generate session
   - When: Backend validates role
   - Then: Returns 403 Forbidden error

4. **Rate Limit Exceeded:**
   - Given: Consultant requests 11th session within 1 hour
   - When: Backend checks rate limit
   - Then: Returns 429 Too Many Requests error

**Edge Cases:**
1. **Session Expiration:**
   - Given: Frontend holds expired client_secret (>1 hour old)
   - When: Attempts to initialize component
   - Then: Stripe component shows error, frontend requests fresh session

2. **Concurrent Session Requests:**
   - Given: Frontend sends duplicate requests simultaneously
   - When: Backend processes both
   - Then: Returns different client_secrets (each valid, Stripe allows multiple active sessions)

3. **Account Already Verified:**
   - Given: Consultant stripe_account_status = 'active'
   - When: Session requested
   - Then: Generate session allowing data updates (account_management feature)

---

## 📗 Dependencies

**Story Dependencies:**
- **Blocked by:**
  - FG-002 (Stripe Account Creation) - Account ID must exist
- **Blocks:**
  - FG-004 (Embedded Onboarding Component) - needs client_secret

**Technical Dependencies:**
- Payment processor integration
- Secure access token generation capability
- Rate limiting mechanism to prevent abuse

**External Dependencies:**
- Payment processor (Stripe) service availability
- Network connectivity

---

## ⚠️ Non-Functional Requirements

**Security:**
- Authorization required: Yes (consultant role only, own profile)
- Data encryption: Access tokens transmitted securely
- PII handling: No PII in generated tokens
- Token security: Access tokens never logged or stored permanently
- Rate limiting: Prevent abuse (max 10 requests per hour per consultant)

**Performance:**
- Token generation time: < 2 seconds
- Retry on failure: 1 automatic retry
- Timeout: 20 seconds maximum
- Rate limit: 10 requests per hour per consultant

**Reliability:**
- Error logging: Track all failures with consultant reference
- Success rate monitoring: Alert if failure rate >5%
- Token expiration: Automatic refresh when needed

**Browser Support:**
- N/A (backend process)

---

## 📝 Notes

**Security Considerations:**
- Access tokens are sensitive - treated like passwords
- Never include tokens in logs
- Never store tokens in database
- Always use secure connections for transmission
- Validate account ownership before generating token

**Open Questions:**
- [ ] Should system cache tokens if generated within 5 minutes?
  - **Recommendation:** No, generate fresh each time (security best practice)
- [ ] What if consultant needs multiple browser tabs open?
  - **Recommendation:** Each tab gets its own token (payment processor allows multiple active tokens)
- [ ] Should rate limit be per-consultant or per-IP?
  - **Recommendation:** Per-consultant (prevents shared IP issues)

---

**Story Version:** 1.0.0
**Last Updated:** 2025-10-23
**Status:** Ready for Development
