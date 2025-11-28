# MVP1 Service Request Journey - EPICs

> **Location:** `project-management/draft/Advisor/US-MVP1-Service-Request-Family-Advisor/`

---

## 📁 Directory Purpose

This directory contains the complete MVP1 scope definition and 8 EPICs that break down the minimal viable product for the Service Request Journey between Families and Consultants in the Marketplace.

---

## 📋 Contents

### Planning Document
- **[MVP1-SCOPE-REDUCTION.md](./MVP1-SCOPE-REDUCTION.md)** - Master planning document defining MVP1 scope, user journey, business rules, and technical notes

### EPICs (8 Total)

#### Phase 1: Discovery & Booking (Family Side)
1. **[EPIC-014-MVP1](./epic-014-family-mvp1-marketplace-discovery.md)** - Marketplace Discovery (Family)
   - Enable families to browse and discover consultants
   - Basic filtering by expertise
   - View consultant profiles and service catalogs
   - **Related to:** EPIC-011 (full scope in backlog)
   - **5 SP** | User Stories: US-MVP1-001, US-MVP1-002

2. **[EPIC-015-MVP1](./epic-015-family-mvp1-service-booking.md)** - Service Booking (Family)
   - Direct service booking from catalog
   - Optional notes field
   - Module access acknowledgment
   - **Related to:** EPIC-013 (full scope in backlog)
   - **5 SP** | User Stories: US-MVP1-003, US-MVP1-004

#### Phase 2: Review & Approval (Consultant → Family)
3. **[EPIC-016-MVP1](./epic-016-advisor-mvp1-request-review.md)** - Request Review (Consultant)
   - Consultant reviews incoming requests
   - Accept as-is or add additional services
   - Decline with reason
   - Auto-decline after 48h
   - **Related to:** EPIC-013 (full scope in backlog)
   - **8 SP** | User Stories: US-MVP1-005, US-MVP1-006, US-MVP1-007, US-MVP1-008

4. **[EPIC-017-MVP1](./epic-017-family-mvp1-final-approval.md)** - Final Approval (Family)
   - Family reviews final proposal (with any additions)
   - Approve all or decline all
   - Access provisioned upon approval
   - Auto-cancel after 7 days
   - **Related to:** EPIC-015 (full scope in backlog)
   - **5 SP** | User Stories: US-MVP1-009, US-MVP1-010, US-MVP1-011

#### Phase 3: Service Execution (Consultant Side)
5. **[EPIC-018-MVP1](./epic-018-advisor-mvp1-service-delivery.md)** - Service Delivery (Consultant)
   - VIEW-only access to family modules
   - Upload deliverable links (external)
   - Mark service complete
   - **Related to:** EPIC-016 (full scope in backlog)
   - **5 SP** | User Stories: US-MVP1-012, US-MVP1-013, US-MVP1-014

#### Phase 4: Monitoring & Completion (Family Side)
6. **[EPIC-019-MVP1](./epic-019-family-mvp1-service-monitoring.md)** - Service Monitoring (Family)
   - Service request dashboard
   - Track active services
   - View service history
   - **Related to:** EPIC-016 (full scope in backlog)
   - **3 SP** | User Stories: US-MVP1-015, US-MVP1-016

7. **[EPIC-020-MVP1](./epic-020-family-mvp1-completion-payment.md)** - Completion & Payment (Family)
   - Review deliverables
   - Confirm completion
   - 100% postpayment via Stripe
   - Access revocation upon payment
   - **Related to:** EPIC-018 (full scope in backlog)
   - **5 SP** | User Stories: US-MVP1-017, US-MVP1-018

#### Phase 5: Closure (Consultant Side)
8. **[EPIC-021-MVP1](./epic-021-advisor-mvp1-post-completion.md)** - Post-Completion (Consultant)
   - Payment confirmation
   - Service history view
   - **Related to:** EPIC-018 (full scope in backlog)
   - **2 SP** | User Stories: US-MVP1-019, US-MVP1-020

---

## 📊 Total Effort Estimate

**Total Story Points:** 38 SP (reduced from ~100 SP in original scope)

**Implementation Sprints:** 4 sprints (2 weeks each)
- Sprint 1: EPICs 014, 015 (Discovery & Booking)
- Sprint 2: EPICs 016, 017 (Review & Approval)
- Sprint 3: EPICs 018, 019, 020 (Delivery & Completion)
- Sprint 4: EPIC 021 + Testing

**Estimated Timeline:** 7-8 weeks (including testing and launch)

---

## 🎯 MVP1 Key Principles

### What's IN MVP1
✅ Direct booking of fixed-price services
✅ Double confirmation (consultant + family)
✅ 100% postpayment (trust-based)
✅ VIEW-only access for consultants
✅ External deliverables (links)
✅ **In-platform chat for Service Requests** (EPIC-011-V2)
✅ Simple status tracking

### What's OUT of MVP1
❌ General chat (pre-booking inquiries) - only Service Request chat in MVP1
❌ Proposal negotiation workflow
❌ Milestone payments
❌ Edit permissions
❌ Calendar integration
❌ Ratings/reviews
❌ Platform file storage
❌ Progress tracking
❌ Service amendments

---

## 🔄 User Journey Flow

```
1. Family discovers consultant (EPIC-014)
   ↓
2. Family books service (EPIC-015)
   ↓ Status: Pending Consultant Confirmation
3. Consultant reviews, may add services (EPIC-016)
   ↓ Status: Awaiting Family Final Approval
4. Family approves, access granted (EPIC-017)
   ↓ Status: In Progress
5. Consultant delivers work (EPIC-018)
   ↓ (Family monitors - EPIC-019)
   ↓ Status: Delivered
6. Family confirms & pays (EPIC-020)
   ↓ Status: Completed & Paid
7. Consultant receives payment (EPIC-021)
   ↓ Access revoked, service closed
```

---

## 👥 User Stories Mapping

Total: **22 User Stories** across 8 EPICs

| Phase | Epic | User Stories | Actor |
|-------|------|--------------|-------|
| Discovery | EPIC-014 | US-MVP1-001, US-MVP1-002 | Family |
| Booking | EPIC-015 | US-MVP1-003, US-MVP1-004 | Family |
| Review | EPIC-016 | US-MVP1-005, US-MVP1-006, US-MVP1-007, US-MVP1-008 | Consultant |
| Approval | EPIC-017 | US-MVP1-009, US-MVP1-010, US-MVP1-011 | Family |
| Delivery | EPIC-018 | US-MVP1-012, US-MVP1-013, US-MVP1-014 | Consultant |
| Monitoring | EPIC-019 | US-MVP1-015, US-MVP1-016 | Family |
| Payment | EPIC-020 | US-MVP1-017, US-MVP1-018 | Family |
| Closure | EPIC-021 | US-MVP1-019, US-MVP1-020 | Consultant |
| System | N/A | US-MVP1-021, US-MVP1-022 | System (auto-decline/cancel) |

---

## 🛠️ Technical Integration Points

### External Services
- **Stripe:** Payment processing, invoicing, webhooks
- **Email:** Transactional notifications (no in-app messaging)

### Data Models
- `consultants` - Marketplace profiles
- `consultant_services` - Service catalog
- `service_requests` - Main engagement record
- `service_request_items` - Multi-service support
- `service_deliverables` - Deliverable links
- `family_advisor_associations` - Access control

### Key Workflows
- **Access Provisioning:** Automatic on family approval
- **Access Revocation:** Automatic on payment confirmation
- **Auto-decline:** Consultant 48h timeout
- **Auto-cancel:** Family 7-day timeout

---

## 📈 Success Metrics

### User Experience
- Time to first booking: < 10 minutes
- Service completion rate: > 80%
- Payment dispute rate: < 2%
- Re-booking rate: > 40%

### Business Impact
- Validate marketplace concept
- Test postpayment model
- Measure consultant-family matching
- Identify most-needed features for MVP2

---

## 🔗 Related Documentation

- **Main User Journey:** `project-management/backlog/UJ-Service-Request-Family-Advisor/` (original full scope)
- **Templates:** `templates/epic-template.md`
- **Technical Specs:** `../FG/` repository (implementation)

---

## 📝 Change History

| Date | Version | Changes |
|------|---------|---------|
| 2025-10-27 | 1.0.0 | Initial MVP1 scope definition and 8 EPICs created |

---

**Next Steps:**
1. Review EPICs with stakeholders
2. Prioritize and assign to sprints
3. Create detailed user stories for Sprint 1
4. Begin technical design for EPIC-014 and EPIC-015
