# EPIC-012A: Service Proposal Management (Consultant Side)

## 📋 Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** Service Proposal Creation & Management for Consultants  
**Summary:** Enable consultants to create, send, and manage service proposals for families who inquire via chat  
**Parent User Journey:** JRN-FAM-002 - Family Marketplace Service Booking & Engagement (Stage 3)  
**Priority:** High  
**Epic Link:** FG-EPIC-012A  
**Related Epic:** FG-EPIC-012F (Family proposal review and response)

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Enable consultants to create professional service proposals in response to family inquiries, bundling multiple services with custom terms, pricing, and scope. This Epic delivers the proposal workflow for chat-initiated engagements, bridging discovery (EPIC-011) to formal booking (EPIC-013).

**User-facing value:**
- Consultants can create proposals directly from chat conversations
- Consultants can bundle multiple services from catalog with custom scope
- Consultants can offer discounts and adjust pricing for specific families
- Consultants can set proposal expiration dates and track status
- Consultants receive notifications when families respond to proposals

**Business value:**
- Structured proposals reduce negotiation time by 60%
- Clear terms and pricing reduce disputes and refund requests
- Proposal templates enable faster response to inquiries
- Proposal analytics help consultants optimize pricing and offerings

**Scope boundaries:**
- **Included:** Proposal creation, editing, sending, status tracking, expiration management
- **NOT included:** Chat system itself (EPIC-014A), payment processing (separate epic), service delivery (EPIC-016A)

---

## 👥 Target Users

**Primary Personas:**
- Consultant (DOC-USR-006) - Creates and manages proposals in response to family inquiries

**Secondary Personas:**
- Family Admin/Council (DOC-USR-002) - Receives and reviews proposals (see EPIC-012F)

---

## 📖 User Stories (High-Level)

1. **As a** Consultant, **I want to** create a service proposal directly from a chat conversation with a family, **so that** I can formalize our discussion into a bookable engagement

2. **As a** Consultant, **I want to** bundle multiple services from my catalog into a single proposal, **so that** I can offer comprehensive solutions to complex family needs

3. **As a** Consultant, **I want to** customize pricing, scope, and terms for specific families, **so that** I can accommodate unique requirements while maintaining my standard catalog

4. **As a** Consultant, **I want to** set proposal expiration dates, **so that** I can manage my availability and encourage timely family decisions

5. **As a** Consultant, **I want to** track proposal status (Sent, Under Review, Accepted, Declined, Expired), **so that** I can follow up appropriately and manage my sales pipeline

6. **As a** Consultant, **I want to** edit draft proposals before sending, **so that** I can refine terms after initial discussion with family

---

## 🔗 Dependencies

**Upstream Dependencies:**
- EPIC-011A: Marketplace Profile Management (service catalog must exist)
- EPIC-014A: Consultant Chat Interface (proposals created within chat context)
- EPIC-008: Consultant Calendar (availability data for proposal timeline)

**Downstream Impact:**
- EPIC-012F: Family Proposal Review (families receive and respond to proposals)
- EPIC-013A: Service Request Lifecycle (accepted proposals become service requests)
- Payment processing (accepted proposals trigger invoicing)

**Technical Dependencies:**
- Chat system with proposal message type support
- Proposal data model and storage
- Notification system for proposal status changes
- Stripe integration for pricing and invoicing

---

## 📐 Design & UX

**Figma Links:**
- [To be created] Proposal Builder Interface
- [To be created] Proposal Preview & Send
- [To be created] Proposal Status Dashboard
- [To be created] Proposal Templates

**UX Notes:**

**User Flow - Creating Proposal from Chat:**
1. Consultant is in active chat conversation with family
2. Clicks "Create Proposal" button in chat interface
3. Proposal Builder opens (modal or side panel):
   - **Section 1: Services Selection**
     - Browse own service catalog
     - Select one or multiple services (checkboxes)
     - For each service: Adjust quantity, duration, or scope
   - **Section 2: Pricing & Terms**
     - Review auto-calculated subtotal
     - Apply discount (percentage or fixed amount)
     - Set prepayment percentage (default from service or custom)
     - Define payment milestones (if multi-phase)
   - **Section 3: Scope & Deliverables**
     - Edit deliverables list (auto-populated from services)
     - Add custom deliverables or notes
     - Define timeline and key dates
   - **Section 4: Access Requirements**
     - Specify which family modules needed (auto-suggested from services)
     - Describe why access needed
   - **Section 5: Terms & Conditions**
     - Set proposal expiration date (default: 30 days)
     - Define cancellation policy
     - Add custom terms if needed
4. Preview proposal (family-facing view)
5. Save as Draft or Send immediately
6. If sent, proposal appears as special message in chat

**User Flow - Managing Proposals:**
1. Navigate to "My Proposals" dashboard in Consultant Portal
2. View list of all proposals with filters:
   - By status (Draft, Sent, Under Review, Accepted, Declined, Expired)
   - By family
   - By date range
3. For each proposal, see:
   - Family name, proposal total, status, expiration date
   - Last activity timestamp
4. Actions available:
   - View details
   - Edit (if Draft or Sent and not yet reviewed)
   - Duplicate (create similar proposal for another family)
   - Withdraw (if Sent, before family responds)
   - Archive (remove from active list)

**Key UI Elements:**
- **Service Selector:** Searchable list with checkboxes, shows service pricing
- **Pricing Calculator:** Real-time total calculation as services added/adjusted
- **Discount Widget:** Percentage or fixed amount with visual impact on total
- **Calendar Picker:** For expiration date and key dates
- **Rich Text Editor:** For custom notes and deliverables
- **Preview Mode:** Shows exact proposal layout family will see
- **Status Badges:** Color-coded indicators for proposal states
- **Timeline View:** Visual representation of proposal lifecycle

---

## 📢 Notifications (if applicable)

**Does this Epic involve user notifications?** Yes

| Trigger | Recipient | Format | Description |
|---------|-----------|--------|-------------|
| Family views proposal | Consultant | In-App | "Family [Name] opened your proposal - [View Details]" |
| Family requests clarification | Consultant | Email + In-App | "Family [Name] has questions about your proposal - [Reply in Chat]" |
| Proposal accepted | Consultant | Email + In-App + Push | "Great news! Family [Name] accepted your proposal for $[Amount] - [View Service Request]" |
| Proposal declined | Consultant | Email + In-App | "Family [Name] declined your proposal - [View Feedback]" |
| Proposal expiring in 3 days | Consultant | Email + In-App | "Your proposal to Family [Name] expires in 3 days - [Extend or Follow Up]" |
| Proposal expired | Consultant | In-App | "Proposal to Family [Name] has expired - [Create New Proposal]" |
| Draft proposal reminder | Consultant | Email | "You have unsent draft proposals - [Review and Send]" (sent after 7 days) |

**Notification Configuration Notes:**
- Default: All notifications enabled except draft reminders (opt-in)
- Critical notifications (accepted/declined) cannot be disabled
- Expiration reminders sent at 3 days, 1 day, and expiration time
- Frequency limit: Max 2 notifications per day per family proposal
- Localization: English only initially

---

## 🧮 Business Rules

**Proposal Creation:**
1. Proposals can only be created for families consultant is actively chatting with
2. Minimum 1 service required per proposal, maximum 10 services
3. Proposal must have total value >=$50 (minimum transaction)
4. Consultant can create maximum 3 active proposals per family (prevents spam)
5. Proposal automatically includes consultant's current service catalog details (snapshot)
6. Changes to service catalog after proposal sent don't affect existing proposals

**Pricing & Discounts:**
1. Discounts up to 100% allowed (enables pro bono work)
2. Final price after discount cannot be below $50 (except 100% discount = $0)
3. Prepayment percentage: 0-100%, defaults to service setting but can be customized
4. If multiple services bundled, single prepayment percentage applies to total
5. Currency: USD only (all proposals)

**Proposal Expiration:**
1. Default expiration: 30 days from sending
2. Consultant can set custom expiration: 7-90 days
3. Expired proposals automatically move to "Expired" status
4. Consultant can extend expiration before it expires
5. Once expired, proposal cannot be accepted (family must request new proposal)
6. System sends expiration warnings at 3 days and 1 day before

**Proposal Status Lifecycle:**
1. **Draft** → Consultant can edit freely, not visible to family
2. **Sent** → Visible to family, consultant can withdraw but not edit
3. **Under Review** → Family is actively reviewing (family viewed)
4. **Accepted** → Family accepted, automatically creates Service Request (EPIC-013)
5. **Declined** → Family declined, consultant can see reason if provided
6. **Expired** → Time limit passed, archived automatically
7. **Withdrawn** → Consultant cancelled before family responded

**Amendment Rules:**
1. Once proposal sent, consultant cannot edit pricing or terms
2. Consultant can withdraw and create new proposal if changes needed
3. If family requests changes in chat, consultant creates new proposal
4. Only 1 active (Sent/Under Review) proposal per family-consultant pair
5. Old proposals auto-archived when new proposal sent

**Access Requirements:**
1. Consultant must specify which modules they need access to
2. Access requirements auto-suggested based on service types
3. Family sees access requirements clearly in proposal
4. Family can adjust access when accepting (discussed in EPIC-012F)

---

## 📝 Notes

**Future Enhancements (not in scope):**
- Proposal templates (save commonly used proposals)
- Proposal analytics (conversion rates, average discount percentage)
- Multi-phase payments (milestones beyond prepayment)
- Custom proposal PDF export (branded documents)
- Proposal comparison for families (side-by-side view of multiple consultants)
- Automatic proposal reminders to families (follow-up suggestions)
- Proposal version history (track edits in draft phase)

**Open Questions:**
- Should consultants be able to counter-propose after family declines?
- Should there be a minimum time between withdrawing and resending proposals?
- Should expired proposals be automatically cleaned up after X days?
- Should consultants see which section of proposal family spent most time on?

**Assumptions:**
- Consultants comfortable creating proposals without live support
- Proposals detailed enough to avoid extensive back-and-forth negotiation
- 30-day expiration standard provides urgency without pressure
- Families understand proposal terms without legal review (standard agreements)
- Chat context sufficient for proposal creation (no additional forms needed)

**Proposal Template Examples:**
- **Succession Planning Package:** 3 services (assessment, plan creation, family workshop)
- **Conflict Mediation:** 2 services (initial session, follow-up sessions)
- **Governance Framework:** 4 services (constitution drafting, council setup, training, ongoing support)

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-24  
**Epic Status:** Draft  
**Story Points Estimate:** TBD (during grooming)
