# EPIC-012F: Service Proposal Review & Response (Family Side)

## 📋 Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** Service Proposal Review & Response for Families  
**Summary:** Enable families to receive, review, and respond to consultant service proposals  
**Parent User Journey:** JRN-FAM-002 - Family Marketplace Service Booking & Engagement (Stage 3)  
**Priority:** High  
**Epic Link:** FG-EPIC-012F  
**Related Epic:** FG-EPIC-012A (Consultant proposal creation)

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Enable Admin and Family Council members to receive professional service proposals from consultants, review detailed terms and pricing, ask clarifying questions, and make informed decisions to accept or decline. This Epic delivers the family's decision-making interface for chat-initiated consultant engagements.

**User-facing value:**
- Families receive clear, structured proposals with all terms in one place
- Families can review proposals at their own pace with expiration visibility
- Families can request changes or clarifications directly in chat
- Families can accept proposals with one click, triggering automatic setup
- Families can provide decline reasons to help consultants improve

**Business value:**
- Structured proposals increase acceptance rate by 25% vs. informal agreements
- Clear terms reduce payment disputes and refund requests by 80%
- Proposal tracking enables family to compare multiple consultants
- Acceptance automation reduces time-to-engagement from days to hours

**Scope boundaries:**
- **Included:** Proposal notification, review interface, acceptance/decline workflow, clarification requests
- **NOT included:** Chat system itself (EPIC-014F), access configuration (EPIC-015F), payment processing (separate epic)

---

## 👥 Target Users

**Primary Personas:**
- Admin (DOC-USR-003) - Primary decision maker with budget authority and proposal approval
- Family Council Member (DOC-USR-002) - May review and recommend proposals, but Admin typically approves

**Secondary Personas:**
- Family Member (DOC-USR-001) - Can view proposals but cannot accept/decline

---

## 📖 User Stories (High-Level)

1. **As an** Admin, **I want to** receive immediate notification when a consultant sends me a proposal, **so that** I can review it promptly and avoid delays

2. **As a** Family Council member, **I want to** review detailed proposal information including services, pricing, deliverables, and access requirements, **so that** I can evaluate if it meets our family's needs

3. **As an** Admin, **I want to** request clarifications or modifications directly in chat before accepting, **so that** I can ensure proposal aligns with our requirements

4. **As an** Admin, **I want to** accept a proposal with one click, **so that** the engagement can begin immediately without additional administrative work

5. **As a** Family Council member, **I want to** decline a proposal with optional feedback, **so that** I can communicate our decision professionally while helping the consultant improve

6. **As an** Admin, **I want to** see proposal expiration dates clearly, **so that** I can prioritize time-sensitive decisions

---

## 🔗 Dependencies

**Upstream Dependencies:**
- EPIC-012A: Consultant Proposal Creation (proposals must exist to review)
- EPIC-014F: Family Chat Interface (proposals received within chat context)

**Downstream Impact:**
- EPIC-015F: Access Configuration & Provisioning (accepted proposals trigger access setup)
- EPIC-013F: Service Request Lifecycle (accepted proposals create service requests)
- Payment processing (accepted proposals trigger invoice generation)

**Technical Dependencies:**
- Chat system with proposal message rendering
- Notification system for proposal alerts
- Proposal acceptance workflow
- Service request creation automation

---

## 📐 Design & UX

**Figma Links:**
- [To be created] Proposal Notification Design
- [To be created] Proposal Review Interface
- [To be created] Acceptance Confirmation Flow

**UX Notes:**

**User Flow - Receiving & Viewing Proposal:**
1. Admin/Council receives notification: "Consultant [Name] sent you a proposal - [View Now]"
2. Clicks notification, opens chat with consultant
3. Sees proposal message (special card in chat):
   - Consultant name and photo
   - Proposal title/summary
   - Total price prominently displayed
   - "View Full Proposal" button
   - Expiration countdown (e.g., "Expires in 27 days")
4. Clicks "View Full Proposal" → Proposal detail page opens (overlay or new page)

**Proposal Detail Page Structure:**
- **Header:**
  - Consultant name, photo, verification badges
  - Proposal total and discount (if applied)
  - Expiration date with visual countdown
  - Status badge
- **Services Included:**
  - List of services with individual descriptions
  - Deliverables for each service
  - Timeline for each service
- **Pricing Breakdown:**
  - Subtotal (sum of services)
  - Discount (if applied) - with percentage
  - Total price
  - Prepayment amount (if applicable)
  - Payment milestones (if multi-phase)
- **Access Requirements:**
  - Which modules consultant needs access to
  - Why access needed
  - Warning: "This consultant will see data in these areas"
- **Terms & Conditions:**
  - Cancellation policy
  - Custom terms (if any)
- **Actions:**
  - "Accept Proposal" (primary button)
  - "Decline" (secondary button)
  - "Ask Question" (opens chat)
  - "Request Changes" (opens chat with template message)

**User Flow - Accepting Proposal:**
1. Admin reviews proposal in detail page
2. Clicks "Accept Proposal"
3. Confirmation modal appears:
   - Summary of commitment (total cost, services, timeline)
   - Access requirements confirmation
   - "I understand this consultant will access [modules]"
   - Payment terms confirmation
   - Cancellation policy reminder
4. Clicks "Confirm Acceptance"
5. System processes:
   - Creates Service Request (EPIC-013F)
   - Triggers access configuration (EPIC-015F)
   - Generates invoice if prepayment required
   - Sends confirmations to both parties
6. Redirects to Service Request page or payment page

**User Flow - Declining Proposal:**
1. Admin clicks "Decline" from proposal detail page
2. Optional feedback modal appears:
   - "Help us understand" - Why declining? (checkboxes)
     - Budget too high
     - Timeline doesn't work
     - Services don't match needs
     - Found another consultant
     - Changed our mind
     - Other (text field)
3. Clicks "Confirm Decline"
4. Consultant notified with feedback (if provided)
5. Proposal archived, chat remains open for future discussion

**User Flow - Comparing Proposals:**
1. Navigate to "Proposals" section in Family Portal
2. View list of all proposals (active and past)
3. Select 2-3 proposals for comparison (checkboxes)
4. Click "Compare" button
5. Comparison table shows side-by-side:
   - Consultant info
   - Services included
   - Total price and discounts
   - Timeline
   - Access requirements
   - Ratings/reviews (when available)
6. Can accept directly from comparison view

**Key UI Elements:**
- **Proposal Card in Chat:** Compact, visually distinct, with key info and CTA
- **Expiration Countdown:** Visual indicator (color changes as deadline approaches)
- **Pricing Display:** Large, prominent, with breakdown accessible
- **Access Warning:** Yellow/orange badge with icon for transparency
- **Comparison Table:** Sortable columns, highlighting differences
- **Action Buttons:** Color-coded (green accept, gray decline)
- **Status Badges:** Color-coded for Draft/Sent/Accepted/Declined/Expired

---

## 📢 Notifications (if applicable)

**Does this Epic involve user notifications?** Yes

| Trigger | Recipient | Format | Description |
|---------|-----------|--------|-------------|
| New proposal received | Family Admin/Council | Email + In-App + Push | "Consultant [Name] sent you a proposal for [Service] - [View Now]" |
| Proposal expiring in 3 days | Family Admin/Council | Email + In-App | "Your proposal from [Consultant] expires in 3 days - [Review Now]" |
| Proposal expiring in 1 day | Family Admin/Council | Email + In-App | "Final reminder: Proposal expires tomorrow - [Decide Now]" |
| Proposal expired | Family Admin/Council | In-App | "Proposal from [Consultant] has expired - [Request New Proposal]" |
| Consultant answered question | Family Admin/Council | Email + In-App | "[Consultant] responded to your question about their proposal - [View Response]" |
| Proposal withdrawn by consultant | Family Admin/Council | Email + In-App | "[Consultant] withdrew their proposal - [See Chat]" |
| Proposal acceptance confirmed | Family Admin/Council | Email + In-App | "Proposal accepted! [Consultant] will begin work on [Date] - [View Service Request]" |

**Notification Configuration Notes:**
- Default: All notifications enabled
- Critical notifications (new proposal, acceptance confirmation) cannot be disabled
- Expiration reminders can be customized (3 days, 1 day, 12 hours, etc.)
- Frequency limit: Max 3 notifications per day per proposal
- Localization: English only initially
- Family members (non-Admin/Council) receive read-only notifications if proposal involves their modules

---

## 🧮 Business Rules

**Proposal Viewing:**
1. Only Admin and Family Council members can accept/decline proposals
2. Other family members can view proposals in read-only mode
3. Proposal history preserved even after acceptance/decline (audit trail)
4. Once proposal accepted, original proposal remains viewable but locked
5. Declined proposals remain accessible for 90 days then archived

**Acceptance Rules:**
1. Only 1 Admin approval required to accept proposal (no multi-sig needed for MVP)
2. Acceptance creates Service Request immediately (EPIC-013F)
3. Acceptance triggers access provisioning workflow (EPIC-015F)
4. If prepayment required, invoice generated immediately upon acceptance
5. Accepted proposal cannot be un-accepted (must cancel Service Request)
6. Multiple proposals from same consultant: accepting one doesn't auto-decline others

**Decline Rules:**
1. Decline feedback is optional but encouraged
2. Feedback shared with consultant immediately
3. Declining doesn't close chat (can continue discussion)
4. Family can request consultant to create revised proposal
5. No penalty for declining proposals (unlimited declines)

**Expiration Handling:**
1. Family cannot accept expired proposals
2. "Request Extension" button appears 3 days before expiration
3. Extension request sends chat message to consultant
4. Consultant can extend expiration in their portal
5. Expired proposals auto-archive after 30 days

**Clarification & Modification Requests:**
1. Family can message consultant directly from proposal view
2. Requesting changes doesn't pause expiration countdown
3. Consultant must create new proposal for significant changes (pricing, scope)
4. Minor clarifications happen in chat without new proposal
5. Chat history linked to proposal for context

**Proposal Comparison:**
1. Can compare up to 3 proposals simultaneously
2. Comparison available for proposals in any status (Sent, Accepted, Declined)
3. Can compare proposals from different consultants or same consultant
4. Comparison highlights differences (price, services, timeline)
5. Can filter comparisons by module/expertise area

---

## 📝 Notes

**Future Enhancements (not in scope):**
- Proposal comparison feature (side-by-side view of multiple proposals from different consultants)
- Proposal negotiation counter-offers (family proposes modified terms)
- Multi-approver workflow (Family Council vote required)
- Proposal rating system (rate quality of proposals received)
- Automatic proposal comparison AI (recommends best option)
- Proposal templates request ("Send me proposal for X")
- Scheduled review reminders (remind specific family members to review)
- Proposal analytics (time to decision, acceptance rates)

**Open Questions:**
- Should proposals require multi-sig approval for high-value engagements (>$10k)?
- Should family be able to make counter-offers (adjust pricing or scope)?
- Should there be a "Save for Later" status between Sent and Accepted?
- Should other family members be able to comment on proposals (collaboration)?
- Should family see how many other families accepted proposals from this consultant?

**Assumptions:**
- Admin has authority to accept proposals without Family Council vote (for MVP)
- Proposal terms are clear enough to avoid extensive legal review
- Families comfortable with digital acceptance (no physical signatures needed)
- 30-day standard expiration provides sufficient time for decision-making
- Chat sufficient for clarification (no separate Q&A system needed)
- Families trust platform's payment processing (Stripe) for transactions

**Decision-Making Guidelines:**
When reviewing proposals, families should consider:
- **Budget:** Does price fit family's governance budget?
- **Timing:** Does timeline align with family needs and availability?
- **Scope:** Do services address actual pain points?
- **Access:** Is data access reasonable for services provided?
- **Trust:** Does consultant's profile and communication build confidence?
- **Terms:** Is cancellation policy acceptable?

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-24  
**Epic Status:** Draft  
**Story Points Estimate:** TBD (during grooming)
