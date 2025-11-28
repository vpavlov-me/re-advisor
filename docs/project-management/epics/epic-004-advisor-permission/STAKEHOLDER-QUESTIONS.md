---
epic_id: "EPIC-004"
title: "Stakeholder Questions - Advisor Permissions"
type: "decision-log"
status: "awaiting-decisions"
created: "2025-10-20"
owner: "Eduard Izgorodin"
stakeholder: "Product Team"
---

# 🔴 CRITICAL QUESTIONS - Require Immediate Decision

## Q1: Permission Data Model Architecture

**Question:** Should we extend the existing auth_service permission model or create a new advisor-specific permission service?

**Context:**
- Current auth_service has basic role flags (is_admin, is_family_council)
- Need granular three-tier permissions (View, View+Modify related, View+Modify All)
- Need section-level permission grants
- Advisor permissions more complex than family member permissions

**Options:**

### Option A: Extend auth_service
- **Description:** Add advisor_permissions table to auth_service
- **Pros:**
  - ✅ Single source of truth for all permissions
  - ✅ Easier JWT integration (permissions in token)
  - ✅ Reuses existing auth infrastructure
  - ✅ Consistent permission checking
- **Cons:**
  - ⚠️ Increases auth_service complexity
  - ⚠️ Couples advisor logic with core auth

### Option B: New permission microservice
- **Description:** Create dedicated permission_service (port 8018)
- **Pros:**
  - ✅ Clean separation of concerns
  - ✅ Specialized for advisor needs
  - ✅ Independent scaling
- **Cons:**
  - ❌ Additional service complexity
  - ❌ Inter-service communication overhead
  - ❌ Two sources of truth for permissions

### Option C: Hybrid approach (Recommended ✅)
- **Description:** Core permissions in auth_service, advisor-specific in advisor_portal_service
- **Pros:**
  - ✅ Balanced complexity
  - ✅ Leverages existing services
  - ✅ Clear separation: auth = enforcement, advisor = configuration
- **Cons:**
  - ⚠️ Split logic between two services
  - ⚠️ Requires consistency guarantees

**Lana's Recommendation:** **Option C (Hybrid)**
- Store advisor role definitions and associations in advisor_portal_service
- Extend auth_service with permission_grants table for enforcement
- Single source of truth: auth_service for enforcement, advisor_service for configuration

**Estimated Effort:**
- Option A: 24-32 hours
- Option B: 40-48 hours
- Option C: 24-32 hours (Recommended)

**Decision Required By:** Sprint Planning Week 1

**Decision Maker:** Technical Lead + Architect

**Decision:**
- [ ] Option A - Extend auth_service
- [ ] Option B - New permission service
- [ ] Option C - Hybrid (Recommended)
- [ ] Other: ___________________

**Date Decided:** ___________
**Decided By:** ___________
**Notes:** ___________

---

## Q2: Granularity of "Related Only" Permissions

**Question:** How do we define "related" materials for View+Modify (related) permission level?

**Context:**
- Three-tier model: View, View+Modify (related), View+Modify All
- "Related" needs clear definition for implementation
- Affects constitution documents, meetings, tasks, etc.

**Options:**

### Option A: created_by field
- **Description:** Simple ownership model
- **Pros:**
  - ✅ Simple to implement
  - ✅ Clear ownership
- **Cons:**
  - ❌ Doesn't handle collaborative work
  - ❌ No support for assignment/delegation

### Option B: created_by + assigned_to (Recommended ✅)
- **Description:** Ownership plus assignment
- **Pros:**
  - ✅ Handles tasks/meetings assigned to advisor
  - ✅ Supports collaborative work
  - ✅ Covers most use cases
- **Cons:**
  - ⚠️ More complex queries
  - ⚠️ Need indexes for performance

### Option C: Flexible ownership rules
- **Description:** Service-specific definitions
- **Pros:**
  - ✅ Maximum flexibility per service
  - ✅ Can evolve per service needs
- **Cons:**
  - ❌ Inconsistent behavior across services
  - ❌ Harder to explain to users
  - ❌ Complex implementation

**Lana's Recommendation:** **Option B** - Use created_by OR assigned_to
- Covers ownership and assignment
- Consistent across all services
- Performance achievable with proper indexes

**Implementation:**
```sql
-- Example query for "related" documents
SELECT * FROM documents
WHERE family_id = :family_id
AND (created_by = :advisor_id OR assigned_to = :advisor_id)
```

**Decision Required By:** Sprint Planning Week 1

**Decision Maker:** Product Owner + Technical Lead

**Decision:**
- [ ] Option A - created_by only
- [ ] Option B - created_by + assigned_to (Recommended)
- [ ] Option C - Flexible rules per service
- [ ] Other: ___________________

**Date Decided:** ___________
**Decided By:** ___________
**Notes:** ___________

---

# 🟡 IMPORTANT QUESTIONS - Affects Scope

## Q3: Permission Template Management

**Question:** Should permission templates be system-wide or family-specific?

**Context:**
- Templates allow quick permission assignment (External Consul, Personal Advisor, etc.)
- Need to balance standardization vs customization

**Options:**

### Option A: System-wide templates
- **Description:** Platform provides standard templates
- **Pros:**
  - ✅ Consistent experience across families
  - ✅ Easier maintenance
  - ✅ Less storage
- **Cons:**
  - ⚠️ May not fit all family needs
  - ⚠️ No customization

### Option B: Family-specific templates
- **Description:** Each family creates own templates
- **Pros:**
  - ✅ Customized to family needs
  - ✅ Maximum flexibility
- **Cons:**
  - ⚠️ More storage required
  - ⚠️ No shared learning across families

### Option C: Both - System defaults + family custom (Recommended ✅)
- **Description:** Provide system templates with ability to create custom
- **Pros:**
  - ✅ Best of both worlds
  - ✅ Quick start with defaults
  - ✅ Customization when needed
- **Cons:**
  - ⚠️ More complex UI/UX
  - ⚠️ Template management needed

**Lana's Recommendation:** **Option C** - Hybrid approach
- Start with 4-5 system templates (External Consul, Personal Advisor, Service Advisor, Read-Only)
- Allow families to create custom templates
- Storage impact minimal (JSON configuration)

**Decision Required By:** Sprint Planning Week 2

**Decision Maker:** Product Owner

**Decision:**
- [ ] Option A - System-wide only
- [ ] Option B - Family-specific only
- [ ] Option C - Both (Recommended)
- [ ] Other: ___________________

**Date Decided:** ___________
**Decided By:** ___________
**Notes:** ___________

---

## Q4: Service Completion Trigger

**Question:** How does the system know when a Service Advisor's engagement is complete?

**Context:**
- Service Advisors automatically transition to view-only on completion
- Need frozen snapshot of data from engagement period
- Epic states this comes from Service Marketplace Epic

**Current Understanding:**
- Service Marketplace Epic will provide service completion trigger
- Need interface/webhook for permission system to react

**Proposed Solution:**
- Create `service_engagement` table with status field
- Service Marketplace Epic updates status (active → completed)
- Permission system listens for status change events
- Automatic transition to view-only on completion

**Implementation Approach:**

```sql
-- service_engagement table
CREATE TABLE service_engagements (
  id UUID PRIMARY KEY,
  advisor_id UUID NOT NULL,
  family_id UUID NOT NULL,
  service_start_date TIMESTAMP NOT NULL,
  service_end_date TIMESTAMP,
  status VARCHAR(20), -- 'active', 'completed', 'cancelled'
  created_at TIMESTAMP DEFAULT NOW()
);

-- Query for frozen snapshot
SELECT * FROM documents
WHERE family_id = :family_id
  AND created_at BETWEEN :service_start_date AND :service_end_date
  AND (created_by = :advisor_id OR assigned_to = :advisor_id);
```

**Decision Required By:** Sprint Planning Week 1

**Decision Maker:** Technical Lead + Service Marketplace Epic Owner

**Decision:**
- [ ] Agree on interface design above
- [ ] Different approach: ___________________
- [ ] Defer to Service Marketplace Epic

**Date Decided:** ___________
**Decided By:** ___________
**Notes:** ___________

---

## Q5: Frozen Snapshot Implementation

**Question:** How to implement "frozen snapshot" for completed Service Advisors?

**Context:**
- Service Advisors should see ONLY data from their engagement period after completion
- Need performant queries for date-range filtering

**Proposed Solution:**
```sql
-- Add indexes for performance
CREATE INDEX idx_documents_advisor_dates
ON documents(created_by, created_at);

CREATE INDEX idx_documents_family_dates
ON documents(family_id, created_at);

-- Filter by engagement dates
WHERE created_at BETWEEN service_start_date AND service_end_date
```

**Performance Considerations:**
- Composite indexes required for good performance
- Estimated query time: <100ms with proper indexes
- Need migration for existing data

**Decision Required By:** Technical Spike (Week 1)

**Decision Maker:** Technical Lead

**Decision:**
- [ ] Agree with proposed approach
- [ ] Alternative approach: ___________________
- [ ] Needs technical spike first (4 hours)

**Date Decided:** ___________
**Decided By:** ___________
**Notes:** ___________

---

# 🟢 NICE-TO-HAVE CLARIFICATIONS

## Q6: Permission Change Notifications

**Question:** Should advisors receive real-time notifications when permissions change?

**Options:**
- **A) Email only** - Send email on permission changes (epic requirement)
- **B) Email + In-app toast** - Show toast notification on next login (Recommended)
- **C) Real-time push** - WebSocket notifications while logged in

**Lana's Recommendation:** Option B - Email + in-app toast
- Email covers offline scenario
- Toast provides immediate feedback on login
- Simpler than real-time push

**Decision:**
- [ ] Option A - Email only
- [ ] Option B - Email + Toast (Recommended)
- [ ] Option C - Real-time push
- [ ] Defer to Phase 2

**Date Decided:** ___________
**Notes:** ___________

---

## Q7: Audit Log Retention Policy

**Question:** Confirm audit log retention period and archival strategy?

**Epic Requirement:** Complete audit trail with export capability

**Proposed Policy:**
- **Active storage:** 2 years (fast access)
- **Cold storage (S3):** 5 additional years (compliance)
- **Total retention:** 7 years
- **Automatic archival:** S3 lifecycle policies

**Decision:**
- [ ] Agree with 7-year retention
- [ ] Different period: _____ years
- [ ] No archival (keep all active)

**Date Decided:** ___________
**Notes:** ___________

---

# 🏗️ ARCHITECTURAL DECISION NEEDED

## Q8: Legacy vs Turbo Stack for Implementation

**Question:** Should advisor permissions be built on Legacy (Python/FastAPI) or Turbo (TypeScript/Hono) stack?

**Context:**
- **Legacy Stack:** advisor_portal_service (Python, port 8011) and auth_service (port 8001) already exist
- **FG Policy:** "Turbo First" - all new features should use Turbo Stack
- **Hybrid Reality:** Base infrastructure is legacy, but new logic could be Turbo

**Options:**

### Option A: Hybrid Approach (Recommended ✅)
```
Legacy (minimal changes):
├── advisor_portal_service (8011) - Add advisor_type enum (4-8h)
└── auth_service (8001) - Add permission_grants table (8-12h)

Turbo Stack (new functionality):
└── turbo/apps/advisor-permissions (8018)
    ├── Permission management API
    ├── Audit logging & export
    ├── Template system
    └── Lifecycle management
```
- **Pros:**
  - ✅ Follows "Turbo First" for new business logic
  - ✅ Uses stable legacy for data storage
  - ✅ Prepares for future migration
  - ✅ Clear separation: legacy = storage, Turbo = logic
- **Cons:**
  - ⚠️ More integration work
  - ⚠️ Two stacks in one feature
- **Effort:** ~2.5 weeks

### Option B: Only Legacy
```
Everything in existing Python services:
├── advisor_portal_service - Full permission logic
└── auth_service - JWT validation
```
- **Pros:**
  - ✅ Faster development (~1.5 weeks)
  - ✅ Less integration complexity
  - ✅ Team knows Python
- **Cons:**
  - ❌ Contradicts "Turbo First" policy
  - ❌ Increases technical debt
  - ❌ Harder to migrate later

### Option C: Full Turbo
```
New Turbo microservice:
└── turbo/apps/advisor-permissions (8018)
    ├── Complete permission system
    ├── Integration with legacy via API
    └── Prisma for data management
```
- **Pros:**
  - ✅ Full "Turbo First" compliance
  - ✅ Modern stack
  - ✅ Easier long-term maintenance
- **Cons:**
  - ❌ Duplicates advisor data
  - ❌ Complex legacy integration
  - ❌ Longest implementation (~3.5 weeks)

**Lana's Recommendation:** **Option A (Hybrid)**
- Balances speed and quality
- Follows spirit of "Turbo First"
- Enables gradual migration

**Strategic Considerations:**
1. Is advisor_portal_service scheduled for Turbo migration in next 6 months?
2. What's the project timeline/deadline?
3. Who's available (Python vs TypeScript developers)?

**Decision Required By:** Sprint Planning Week 1

**Decision Maker:** Technical Lead + Architect + Product Owner

**Decision:**
- [ ] Option A - Hybrid (Recommended)
- [ ] Option B - Legacy only (Fast)
- [ ] Option C - Full Turbo (Long-term)
- [ ] Other: ___________________

**Date Decided:** ___________
**Decided By:** ___________

**Additional Context Needed:**
- [ ] Advisor portal migration timeline?
- [ ] Project deadline?
- [ ] Available resources (Python/TypeScript)?

**Notes:** ___________

---

# 📊 Decision Summary

**Total Critical Decisions:** 2 (Q1, Q2)
**Total Important Decisions:** 3 (Q3, Q4, Q5)
**Total Nice-to-Have:** 2 (Q6, Q7)
**Total Architectural:** 1 (Q8)

**Blocking Development:**
- Q1: Permission Data Model Architecture
- Q2: "Related Only" Definition
- Q8: Legacy vs Turbo Stack

**Affecting Scope:**
- Q3: Template Management
- Q4: Service Completion Trigger
- Q5: Frozen Snapshot Implementation

**Can Defer:**
- Q6: Notification Strategy
- Q7: Retention Policy

---

**Next Steps:**
1. Schedule architectural decision meeting (Q8 critical for all planning)
2. Technical spike for frozen snapshot queries (Q5) - 4 hours
3. Coordinate with Service Marketplace Epic owner (Q4)
4. Review Lana's full analysis document
5. Update this document with decisions
6. Proceed to Story breakdown after all Critical + Architectural questions answered
