---
epic_id: "EPIC-003"
title: "Stakeholder Questions - Advisor Registration"
type: "decision-log"
status: "awaiting-decisions"
created: "2025-10-20"
owner: "Eduard Izgorodin"
stakeholder: "Product Team"
---

# 🔴 CRITICAL QUESTIONS - Require Immediate Decision

## Q1: Multi-tenancy Architecture for Advisors

**Question:** How should advisor data be structured given Family Governance's strict multi-tenancy architecture?

**Context:**
- Current FG architecture requires `family_id` isolation for all data
- Advisors need to work with multiple families (marketplace model)
- Existing `advisor_portal_service` uses global registry with encrypted PII

**Options:**

### Option A: Global Advisor Registry (Recommended ✅)
- **Description:** Advisors exist globally (not tied to single family)
- **Pros:**
  - ✅ Marketplace scalability - one advisor profile serves multiple families
  - ✅ Multiple family support - advisor can work with many families simultaneously
  - ✅ Aligns with existing advisor_portal_service architecture
  - ✅ Advisor PII encrypted using pgcrypto (already implemented)
- **Cons:**
  - ⚠️ Requires new isolation patterns (association-based instead of family_id)
  - ⚠️ More complex permission model

### Option B: Family-Scoped Advisors
- **Description:** Each advisor duplicated per family
- **Pros:**
  - ✅ Consistent with existing FG multi-tenancy patterns
  - ✅ Standard family_id isolation applies
- **Cons:**
  - ❌ Complex marketplace aggregation
  - ❌ Data duplication across families
  - ❌ Advisor maintains multiple separate profiles

**Lana's Recommendation:** **Option A** - Global registry with association-based access
- Already implemented in advisor_portal_service
- Proven encryption with pgcrypto
- Enables marketplace scalability

**Decision Required By:** Sprint 45 Planning (Week 1)

**Decision Maker:** Technical Lead + Product Owner

**Decision:**
- [ ] Option A - Global Registry (Recommended)
- [ ] Option B - Family-Scoped
- [ ] Other: ___________________

**Date Decided:** ___________
**Decided By:** ___________
**Notes:** ___________

---

## Q2: Authentication Service Integration

**Question:** Should advisors authenticate through turbo_auth (port 8001) or separate advisor auth?

**Context:**
- turbo_auth already supports OAuth (Google, Apple, LinkedIn)
- Auth service is port 8001 (Better Auth integration)
- Need to distinguish advisor role from family member role

**Options:**

### Option A: Extend turbo_auth with advisor role (Recommended ✅)
- **Description:** Add advisor role to existing auth service
- **Pros:**
  - ✅ Single auth source of truth
  - ✅ OAuth already configured (Google, Apple, LinkedIn)
  - ✅ Unified JWT token issuance
  - ✅ Consistent authentication flow
- **Cons:**
  - ⚠️ Requires role-based modifications to JWT
  - ⚠️ Increases auth service complexity

### Option B: Separate advisor authentication
- **Description:** Independent advisor auth service
- **Pros:**
  - ✅ Complete isolation from family auth
  - ✅ Independent scaling
- **Cons:**
  - ❌ Duplicate OAuth setup
  - ❌ Multiple JWT issuers (complexity)
  - ❌ Separate maintenance burden

**Lana's Recommendation:** **Option A** - Extend turbo_auth
- OAuth providers already configured
- Estimated effort: 8-16 hours to add role field

**Decision Required By:** Sprint 45 Planning (Week 1)

**Decision Maker:** Technical Lead

**Decision:**
- [ ] Option A - Extend turbo_auth (Recommended)
- [ ] Option B - Separate Auth
- [ ] Other: ___________________

**Date Decided:** ___________
**Decided By:** ___________
**Notes:** ___________

---

# 🟡 IMPORTANT QUESTIONS - Affects Scope

## Q3: Subscription Billing Integration

**Question:** Which subscription billing approach for advisor payments?

**Context:**
- Advisors PAY platform for marketplace access (not earnings)
- Payment happens during registration
- Need PCI compliance

**Options:**

### Option A: Stripe Billing with integrated checkout (Recommended ✅)
- **Description:** Use Stripe's subscription management
- **Pros:**
  - ✅ Industry standard solution
  - ✅ PCI compliance handled by Stripe
  - ✅ Built-in subscription management
  - ✅ Payment Element for easy integration
- **Cons:**
  - ⚠️ Stripe fees (~2.9% + $0.30)
  - ⚠️ Vendor lock-in

### Option B: Custom billing system
- **Description:** Build internal subscription management
- **Pros:**
  - ✅ Full control over billing logic
  - ✅ No transaction fees
- **Cons:**
  - ❌ Complex implementation (80+ hours)
  - ❌ PCI compliance burden
  - ❌ Payment gateway integration

**Lana's Recommendation:** **Option A** - Stripe Billing
- Aligns with epic requirements
- Reduces implementation time by 60+ hours

**Decision Required By:** Sprint 45 Planning (Week 1)

**Decision Maker:** Product Owner + Finance

**Decision:**
- [ ] Option A - Stripe Billing (Recommended)
- [ ] Option B - Custom System
- [ ] Other: ___________________

**Date Decided:** ___________
**Decided By:** ___________
**Notes:** ___________

---

## Q4: Profile Storage Architecture

**Question:** Where should advisor profiles and documents be stored?

**Context:**
- advisor_portal_service (Python/FastAPI, port 8011) already exists
- FG strategy: "Turbo First" (TypeScript/Hono/Next.js for new features)
- Profile includes PII requiring encryption

**Options:**

### Option A: Extend existing advisor_portal_service (Recommended ✅)
- **Description:** Build on current PostgreSQL structure
- **Pros:**
  - ✅ Leverages existing encrypted PII infrastructure
  - ✅ S3/MinIO for documents via turbo_avatars pattern
  - ✅ Faster implementation (40-60 hours)
- **Cons:**
  - ⚠️ Legacy Python service (not Turbo stack)
  - ⚠️ Technical debt accumulation

### Option B: New Turbo microservice
- **Description:** TypeScript/Hono service for advisors
- **Pros:**
  - ✅ Modern stack (follows "Turbo First" policy)
  - ✅ Better performance
  - ✅ Easier to maintain long-term
- **Cons:**
  - ❌ Longer implementation (60-80 hours)
  - ❌ Duplicate advisor data structures

**Lana's Recommendation:** **Option A** initially, migrate to Turbo in Phase 2
- Faster time to market
- Encryption already implemented
- Plan migration after MVP validation

**Decision Required By:** Sprint 45 Planning (Week 2)

**Decision Maker:** Technical Lead

**Decision:**
- [ ] Option A - Extend advisor_portal_service (Recommended)
- [ ] Option B - New Turbo Service
- [ ] Option C - Hybrid (minimal legacy extension + new Turbo for business logic)
- [ ] Other: ___________________

**Date Decided:** ___________
**Decided By:** ___________
**Notes:** ___________

---

# 🟢 NICE-TO-HAVE CLARIFICATIONS

## Q5: Email Communication Strategy

**Question:** How should advisor-specific emails be handled?

**Options:**
- **A) Extend turbo_mail service** - Add advisor templates (Recommended ✅)
- **B) Advisor-specific email service** - Separate service

**Lana's Recommendation:** Option A - Extend turbo_mail
- Centralized email management
- Already configured with SMTP

**Decision Required By:** Sprint 45 Week 2

**Decision:**
- [ ] Option A - Extend turbo_mail (Recommended)
- [ ] Option B - Separate Service
- [ ] Defer to Phase 2

**Date Decided:** ___________
**Notes:** ___________

---

## Q6: Subscription Pricing Model

**Question:** Should subscriptions offer monthly payment or annual only?

**Context:** Epic states pricing managed via Stripe dashboard

**Recommendation:** Configure in Stripe (flexible approach)
- Allow both monthly and annual
- Annual discount (e.g., 20%) for better cash flow

**Decision:**
- [ ] Monthly + Annual with discount
- [ ] Annual only
- [ ] Configure later in Stripe

**Date Decided:** ___________
**Notes:** ___________

---

## Q7: Free Trial Period

**Question:** Should new advisors get free trial period?

**Recommendation:** 30-day free trial to reduce friction
- Increases registration conversion
- Standard marketplace practice

**Decision:**
- [ ] Yes - 30 days (Recommended)
- [ ] Yes - Different duration: _____ days
- [ ] No trial

**Date Decided:** ___________
**Notes:** ___________

---

# 📊 Decision Summary

**Total Critical Decisions:** 4
**Total Important Decisions:** 2
**Total Nice-to-Have:** 3

**Blocking Development:**
- Q1: Multi-tenancy Architecture
- Q2: Authentication Integration

**Affecting Scope:**
- Q3: Subscription Billing
- Q4: Profile Storage

**Can Defer:**
- Q5, Q6, Q7

---

**Next Steps:**
1. Schedule decision meeting with stakeholders
2. Technical spike for Q4 (storage architecture) - 4 hours
3. Review Lana's full analysis document
4. Update this document with decisions
5. Proceed to Sprint Planning after all Critical + Important questions answered
