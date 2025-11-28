# EPIC-017A: Service Amendments (Consultant Side)

## 📋 Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** Service Amendment Requests for Consultants  
**Summary:** Enable consultants to propose scope, timeline, or pricing changes during active service delivery  
**Parent User Journey:** JRN-FAM-002 - Family Marketplace Service Booking (Stage 6)  
**Priority:** Medium  
**Epic Link:** FG-EPIC-017A  
**Related Epic:** FG-EPIC-017F (Family amendment review and approval)

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Enable consultants to request amendments to active service requests when scope changes, timelines need adjustment, or additional work is required. This Epic delivers the consultant's amendment workflow, maintaining flexibility while ensuring family approval for significant changes.

**User-facing value:**
- Consultants can propose scope expansions without starting new service
- Consultants can request timeline extensions for valid reasons
- Consultants can adjust pricing for additional work
- Consultants maintain professional documentation of changes
- Consultants avoid disputes by getting formal approval for changes

**Business value:**
- Amendment workflow prevents scope creep and reduces disputes by 70%
- Formal amendments maintain transparent pricing and expectations
- Flexibility enables complex multi-phase engagements
- Amendment history provides audit trail and accountability

**Scope boundaries:**
- **Included:** Amendment request creation, pricing/timeline adjustments, scope expansion, family approval workflow
- **NOT included:** Service cancellation (separate flow), major service restructuring (requires new proposal), post-completion amendments

---

## 👥 Target Users

**Primary Personas:**
- Consultant (DOC-USR-006) - Requests amendments during service delivery

**Secondary Personas:**
- Family Admin/Council (DOC-USR-002) - Approves/declines amendments (see EPIC-017F)

---

## 📖 User Stories (High-Level)

1. **As a** Consultant, **I want to** propose additional services or scope expansion during active engagement, **so that** I can address emerging family needs without starting a new service request

2. **As a** Consultant, **I want to** request timeline extensions with justification, **so that** I can deliver quality work when circumstances change

3. **As a** Consultant, **I want to** adjust pricing for additional work, **so that** I'm fairly compensated for scope changes

4. **As a** Consultant, **I want to** track amendment status (Pending, Approved, Declined), **so that** I know when I can proceed with amended scope

5. **As a** Consultant, **I want to** view amendment history for each service request, **so that** I can reference past agreements and avoid confusion

---

## 🔗 Dependencies

**Upstream Dependencies:**
- EPIC-013A: Service Request Lifecycle (amendments apply to active requests)
- EPIC-014A: Consultant Chat (amendments discussed in context)

**Downstream Impact:**
- EPIC-017F: Family Amendment Review (families approve/decline)
- Service request timeline and pricing updates
- Invoice generation for additional charges
- Service completion criteria adjustments

**Technical Dependencies:**
- Amendment data model and storage
- Approval workflow system
- Service request update mechanism
- Pricing recalculation system
- Notification system

---

## 📐 Design & UX

**Figma Links:**
- [To be created] Amendment Request Form
- [To be created] Amendment Status Tracking
- [To be created] Amendment History View

**UX Notes:**

**User Flow - Creating Amendment Request:**
1. Consultant viewing active service request detail (from EPIC-013A)
2. Clicks "Request Amendment" button
3. Amendment request form opens:
   - **Amendment Type:** (radio buttons)
     - Scope Expansion (add services/deliverables)
     - Timeline Extension (change deadline)
     - Pricing Adjustment (additional charges)
     - Multiple types (select all that apply)
   - **If Scope Expansion:**
     - Add services from catalog (multi-select)
     - Custom deliverables (text area)
   - **If Timeline Extension:**
     - Current deadline (displayed)
     - Requested new deadline (date picker)
     - Reason for extension (dropdown + text):
       - Family delays in providing information
       - Unforeseen complexity
       - Additional work requested
       - Other (specify)
   - **If Pricing Adjustment:**
     - Current total price
     - Additional amount requested
     - Breakdown of additional work (line items)
     - Justification (text area)
   - **General:**
     - Summary/rationale (text area, required)
     - Impact on deliverables (optional)
     - Proposed payment terms for additional charges
4. Preview amendment request (family-facing view)
5. Click "Send to Family for Approval"
6. Amendment request sent via chat (special message card)
7. Status: "Pending Family Approval"
8. Consultant notified when family responds

**User Flow - Tracking Amendment Status:**
1. From service request detail, see "Amendments" section
2. Shows list of amendments:
   - Amendment ID
   - Type (Scope/Timeline/Pricing)
   - Status (Pending, Approved, Declined)
   - Submitted date
   - Response date (if decided)
3. Click amendment → View details:
   - Original request details
   - Family response (if any)
   - Reason for decline (if declined)
   - Approval conditions (if any notes from family)
4. If approved:
   - Service request automatically updated
   - New invoice generated (if pricing changed)
   - New deadline reflected in timeline
5. If declined:
   - Can discuss further in chat
   - Can submit revised amendment

**User Flow - Amendment History:**
1. From service request detail, click "Amendment History"
2. Chronological list of all amendments:
   - For each amendment:
     - Date submitted
     - Type and summary
     - Status and decision date
     - Pricing/timeline changes
     - Family feedback
3. Can filter by: Type, Status, Date Range
4. Can export as PDF for records

**Key UI Elements:**
- **Amendment Form:** Clear sections for each amendment type
- **Pricing Calculator:** Auto-calculates new total
- **Timeline Visualizer:** Shows current vs. proposed deadline
- **Status Badges:** Color-coded (Yellow: Pending, Green: Approved, Red: Declined)
- **Amendment Cards:** Compact summary cards in service request view
- **Preview Mode:** Shows how amendment appears to family
- **Quick Actions:** Buttons to discuss in chat or create new amendment

---

## 📢 Notifications (if applicable)

**Does this Epic involve user notifications?** Yes

| Trigger | Recipient | Format | Description |
|---------|-----------|--------|-------------|
| Amendment request sent | Consultant | In-App | "Your amendment request sent to Family [Name] - [View Status]" |
| Family viewed amendment | Consultant | In-App | "Family [Name] is reviewing your amendment request" |
| Amendment approved | Consultant | Email + In-App + Push | "Amendment approved! You can proceed with [Changes] - [View Updated Service]" |
| Amendment declined | Consultant | Email + In-App | "Amendment declined by Family [Name] - [View Feedback]" |
| Amendment approval reminder (to family) | Consultant (passive) | N/A | Family receives reminder (consultant sees "Reminder sent") |

**Notification Configuration Notes:**
- Default: All notifications enabled
- Critical notifications (approved/declined) cannot be disabled
- Consultant receives notification when family views amendment (transparency)
- Localization: English only initially

---

## 🧮 Business Rules

**Amendment Request Rules:**
1. Amendments only allowed for "In Progress" service requests
2. Cannot request amendments before service starts (must renegotiate proposal)
3. Maximum 5 amendments per service request (prevents excessive changes)
4. New amendment cannot be submitted while previous one pending (one at a time)
5. Approved amendments become part of service request (cannot be reversed)

**Scope Expansion:**
1. Can add services from consultant's catalog only
2. Can add custom deliverables not in catalog
3. Cannot remove services already agreed upon (only add)
4. Expanded scope must be logically related to original service
5. Family can accept partial expansion (not all additions)

**Timeline Extension:**
1. Can only extend deadline, not move earlier (no acceleration)
2. Maximum extension: 50% of original timeline (e.g., 30-day service → max 15-day extension)
3. Multiple extensions allowed if justified (up to 5 total per service)
4. Must provide reason from dropdown (accountability)
5. Extension doesn't automatically adjust payment milestones

**Pricing Adjustment:**
1. Can only increase price, not reduce (refunds handled separately)
2. Maximum increase: 100% of original price per amendment
3. Must provide itemized breakdown of additional charges
4. Additional charges invoiced separately when approved
5. Payment terms can differ from original (e.g., full prepayment for addition)
6. Total amendments cannot exceed 200% of original service price

**Approval Workflow:**
1. Family has 7 days to respond to amendment (auto-reminder at 5 days)
2. If no response after 7 days, consultant can cancel amendment or re-submit
3. Family can approve, decline, or request modifications
4. Approval is binary (cannot partially approve pricing but decline timeline)
5. Declined amendments can be revised and resubmitted

**Amendment Impact:**
1. **If Approved:**
   - Service request automatically updated (scope, timeline, price)
   - New invoice generated if pricing changed
   - Deadline updated in calendar and notifications
   - Consultant can proceed immediately
   - Family notified of changes
2. **If Declined:**
   - Service request remains unchanged
   - Consultant must deliver original scope
   - Can discuss alternatives in chat
   - Can submit revised amendment

**Post-Amendment Rules:**
1. Approved amendments cannot be undone (permanent)
2. Service completion criteria updated to reflect amended scope
3. Amendment history preserved in service request
4. Original proposal/booking details remain for reference
5. Final invoice reflects all approved amendments

**Amendment Documentation:**
1. Each amendment assigned unique ID (e.g., AMD-001)
2. Amendment includes:
   - Original terms
   - Proposed changes
   - Justification/rationale
   - Family approval/decline
   - Effective date
3. All amendments logged in service request activity history
4. Consultant can export amendment history for records

---

## 📝 Notes

**Future Enhancements (not in scope):**
- Pre-approved amendment types (family authorizes certain changes in advance)
- Conditional amendments (if X happens, then Y adjustment)
- Batch amendments (multiple changes in one request)
- Amendment templates (common adjustment patterns)
- Automatic pricing suggestions based on scope changes
- Amendment negotiation (counter-offers from family)
- Third-party arbitration for disputed amendments

**Open Questions:**
- Should there be a fee for amendments (e.g., $50 processing fee)?
- Should consultants see family's amendment approval history (acceptance rate)?
- Should amendments require multi-sig approval for high-value changes?
- Should platform suggest amendments when consultant running behind schedule?
- Should amendments be publicly visible to other families (transparency)?

**Assumptions:**
- Consultants use amendments responsibly (not to inflate prices arbitrarily)
- Families respond to amendment requests within 7 days
- Most amendments requested for legitimate reasons (scope creep from family side)
- Amendments don't significantly change service nature (major changes need new proposal)
- Price increases justified and reasonable (not exploitative)

**Common Amendment Scenarios:**
1. **Scope Creep:** Family requests additional work during service
2. **Complexity Increase:** Work turns out more complex than estimated
3. **Information Delays:** Family slow to provide needed information
4. **Additional Deliverables:** Family wants extra outputs not in original scope
5. **Extended Timeline:** More time needed to deliver quality work

**Amendment Best Practices (for consultants):**
- Discuss changes with family in chat before formal amendment request
- Provide clear justification for each change
- Be specific about additional work and pricing
- Submit amendments early (don't wait until deadline)
- Keep amendments reasonable (avoid excessive increases)
- Document reasons thoroughly (protects both parties)

**Amendment Request Template:**
```
Amendment Type: [Scope Expansion / Timeline Extension / Pricing Adjustment]

Current Terms:
- Scope: [Original deliverables]
- Deadline: [Original date]
- Price: [Original amount]

Proposed Changes:
- New Scope: [Added deliverables]
- New Deadline: [Extended date]
- Additional Price: [Amount and breakdown]

Rationale:
[Explain why changes needed, what triggered them, how they benefit family]

Impact on Service:
[How this affects overall delivery, quality, timeline]
```

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-24  
**Epic Status:** Draft  
**Story Points Estimate:** TBD (during grooming)
