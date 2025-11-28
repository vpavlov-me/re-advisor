# EPIC-017F: Service Amendment Review (Family Side)

## 📋 Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** Service Amendment Review & Approval for Families  
**Summary:** Enable families to review, discuss, and approve/decline consultant amendment requests during active services  
**Parent User Journey:** JRN-FAM-002 - Family Marketplace Service Booking (Stage 6)  
**Priority:** Medium  
**Epic Link:** FG-EPIC-017F  
**Related Epic:** FG-EPIC-017A (Consultant amendment requests)

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Enable Admin and Family Council to receive consultant amendment requests, review proposed changes to scope/timeline/pricing, discuss concerns in chat, and make informed decisions to approve or decline. This Epic delivers the family's amendment review workflow, maintaining control over service changes.

**User-facing value:**
- Families receive clear notifications when consultants request changes
- Families can review detailed amendment proposals with impact analysis
- Families can discuss amendments with consultants before deciding
- Families maintain full control over scope, timeline, and budget changes
- Families have transparent record of all approved/declined amendments

**Business value:**
- Amendment approval workflow prevents unauthorized scope/price changes
- Clear review process reduces disputes and misunderstandings
- Formal approval maintains budget control and predictability
- Amendment history provides audit trail and accountability

**Scope boundaries:**
- **Included:** Amendment notification, review interface, approval/decline workflow, discussion in chat
- **NOT included:** Amendment initiation (consultant side), automatic approvals, multi-sig approval workflow (future)

---

## 👥 Target Users

**Primary Personas:**
- Admin (DOC-USR-003) - Reviews and approves/declines amendments
- Family Council Member (DOC-USR-002) - May review and recommend (Admin approves)

**Secondary Personas:**
- Consultant (DOC-USR-006) - Submits amendments (see EPIC-017A)

---

## 📖 User Stories (High-Level)

1. **As an** Admin, **I want to** receive immediate notification when consultant requests amendment, **so that** I can review and respond promptly

2. **As an** Admin, **I want to** see detailed amendment proposal including scope, timeline, and pricing changes, **so that** I can understand impact on service and budget

3. **As a** Family Council member, **I want to** discuss amendment with consultant in chat before deciding, **so that** I can clarify concerns or negotiate terms

4. **As an** Admin, **I want to** approve or decline amendments with optional feedback, **so that** consultant knows my decision and reasoning

5. **As an** Admin, **I want to** view amendment history for each service, **so that** I can track changes and ensure amendments are reasonable

---

## 🔗 Dependencies

**Upstream Dependencies:**
- EPIC-017A: Consultant Amendment Requests (amendments must be submitted)
- EPIC-013F: Service Request Tracking (amendments apply to active requests)
- EPIC-014F: Family Chat (discussion happens in chat)

**Downstream Impact:**
- Service request automatically updated when amendment approved
- Invoice generation for additional charges
- Timeline adjustments reflected in calendar
- Consultant can proceed with amended scope

**Technical Dependencies:**
- Amendment approval workflow
- Service request update mechanism
- Invoice generation system
- Notification system

---

## 📐 Design & UX

**Figma Links:**
- [To be created] Amendment Notification
- [To be created] Amendment Review Interface
- [To be created] Approval/Decline Flow

**UX Notes:**

**User Flow - Receiving Amendment Notification:**
1. Consultant submits amendment request (from EPIC-017A)
2. Admin receives notification: "Consultant [Name] requested amendment to [Service]"
3. Amendment notification shows:
   - Amendment type (Scope/Timeline/Pricing)
   - Brief summary of changes
   - "Review Now" button
4. Click notification → Opens amendment review page

**User Flow - Reviewing Amendment:**
1. Amendment review page opens with sections:
   - **Header:**
     - Consultant name and photo
     - Service name
     - Amendment type badge
     - Submitted date
   - **Current Terms:**
     - Original scope/timeline/pricing
     - What was agreed initially
   - **Proposed Changes:**
     - New scope (added services/deliverables)
     - New timeline (extended deadline with dates)
     - Additional charges (breakdown)
   - **Impact Analysis:**
     - Budget impact: +$X (% increase)
     - Timeline impact: +Y days (new deadline date)
     - Scope impact: Z additional deliverables
   - **Consultant's Rationale:**
     - Reason for amendment
     - Justification for changes
   - **Discussion:**
     - Link to chat or embedded chat
     - "Ask Question" button
   - **Actions:**
     - "Approve Amendment" (primary button)
     - "Decline" (secondary button)
     - "Discuss in Chat" (tertiary button)

**User Flow - Approving Amendment:**
1. Admin clicks "Approve Amendment"
2. Confirmation modal appears:
   - "You're approving these changes:"
   - Summary of scope, timeline, pricing changes
   - Budget impact highlighted
   - "Consultant will be notified and can proceed"
   - Optional: Add note to consultant
3. Click "Confirm Approval"
4. System processes:
   - Service request updated automatically
   - New invoice generated (if pricing changed)
   - Timeline updated in calendar
   - Consultant notified
   - Amendment status → "Approved"
5. Redirects to updated service request page

**User Flow - Declining Amendment:**
1. Admin clicks "Decline"
2. Decline modal appears:
   - "Why are you declining?" (dropdown required):
     - Budget too high
     - Timeline not acceptable
     - Scope not justified
     - Negotiate better terms first
     - Other (specify)
   - Optional: Add detailed feedback for consultant
   - "Consultant will be notified of your decision"
3. Click "Confirm Decline"
4. System processes:
   - Amendment status → "Declined"
   - Consultant notified with feedback
   - Original service terms remain unchanged
   - Chat remains open for further discussion
5. Redirects to service request page

**User Flow - Amendment History:**
1. From service request detail, navigate to "Amendments" tab
2. See chronological list of all amendments:
   - For each amendment:
     - Date submitted and decided
     - Type and summary
     - Status (Approved/Declined)
     - Changes made (if approved)
     - Admin feedback (if declined)
3. Can filter by: Type, Status, Date
4. Can export amendment history as PDF

**Key UI Elements:**
- **Amendment Card:** Summary card with type badge, key changes, CTA
- **Impact Summary:** Visual indicators (red for increases, yellow for neutral)
- **Comparison View:** Side-by-side original vs. proposed terms
- **Status Badges:** Color-coded (Yellow: Pending, Green: Approved, Red: Declined)
- **Action Buttons:** Clear CTAs with confirmation modals
- **Chat Integration:** Embedded or linked chat for discussion

---

## 📢 Notifications (if applicable)

**Does this Epic involve user notifications?** Yes

| Trigger | Recipient | Format | Description |
|---------|-----------|--------|-------------|
| Amendment request received | Family Admin/Council | Email + In-App + Push | "Consultant [Name] requested amendment to [Service] - [Review Now]" |
| Amendment reminder (3 days) | Family Admin | Email + In-App | "Amendment from [Consultant] awaiting your review - [Respond]" |
| Amendment discussion message | Family Admin/Council | In-App + Push | "[Consultant] replied to your amendment question - [View]" |
| Amendment auto-expired | Family Admin | In-App | "Amendment from [Consultant] expired without response - [Review Options]" |

**Notification Configuration Notes:**
- Default: All notifications enabled for Admin
- Critical notifications (new amendment) cannot be disabled
- Reminder sent at 3 days if no response
- Auto-expiration after 7 days (consultant can resubmit)
- Localization: English only initially

---

## 🧮 Business Rules

**Amendment Review:**
1. Only Admin can approve/decline amendments (Family Council can view/comment)
2. Family has 7 days to respond to amendment request
3. Reminder sent at 5 days if no decision
4. After 7 days: Amendment auto-expires, consultant can resubmit
5. Amendments can be discussed in chat without decision pressure

**Approval Rules:**
1. Approval is immediate and permanent (cannot undo)
2. Service request automatically updated upon approval
3. New invoice generated immediately if pricing changed
4. Timeline adjustment reflected across all calendars
5. Consultant notified and can proceed immediately
6. Amendment becomes part of service agreement (audit trail)

**Decline Rules:**
1. Decline requires reason selection (accountability)
2. Optional detailed feedback encouraged
3. Declined amendment doesn't close discussion
4. Family can suggest counter-terms in chat
5. Consultant can submit revised amendment
6. Original service terms remain in effect

**Partial Approval (Future):**
- Current MVP: Binary approval (all or nothing)
- Future: Family can approve timeline but decline pricing
- Future: Family can suggest modified terms

**Budget Control:**
1. System highlights if total amendments exceed 100% of original price
2. Warning shown if pricing increase >50% in single amendment
3. Admin can set auto-decline threshold (future)
4. Amendment approvals don't require additional payment setup

**Amendment Limits:**
1. Family sees amendment count (e.g., "3rd amendment request")
2. Warning if >5 amendments requested (excessive changes)
3. Family can discuss reducing amendments with consultant
4. Platform doesn't limit amendments (family discretion)

**Post-Approval:**
1. Amendment cannot be reversed after approval
2. If family changes mind: Must discuss cancellation with consultant
3. Approved amendments documented in service request
4. Amendment history preserved for audit and reference

---

## 📝 Notes

**Future Enhancements (not in scope):**
- Multi-sig approval (Family Council vote required for high-value amendments)
- Conditional approval (approve if condition met)
- Counter-offer mechanism (family proposes modified terms)
- Amendment templates (pre-approve certain types of changes)
- Automatic approval for small changes (<10% price increase)
- Amendment negotiation thread (structured back-and-forth)
- Amendment analytics (track approval rates, common reasons for decline)

**Open Questions:**
- Should there be spending limit requiring multi-sig for large amendments?
- Should family see consultant's amendment history across all families (acceptance rate)?
- Should amendments require documentation upload (justification proof)?
- Should platform suggest amendment when service running behind?
- Should there be penalty for declining too many amendments?

**Assumptions:**
- Admin has authority to approve amendments without Family Council vote
- 7-day response time sufficient for family decision-making
- Chat discussion sufficient for negotiation (no formal counter-offer system)
- Families trust consultant's justification (no third-party validation)
- Most amendments legitimate (not used to inflate prices)

**Common Amendment Scenarios:**
1. **Scope Creep:** Family requested additional work during service
2. **Complexity:** Work more complex than initially estimated
3. **Delays:** Family slow to provide information consultant needs
4. **Additional Deliverables:** Family wants extra outputs
5. **Timeline Extension:** Consultant needs more time for quality

**Amendment Review Checklist (for families):**
Before approving, families should ask:
1. Is this amendment necessary and justified?
2. Is the pricing reasonable for additional work?
3. Is the timeline extension acceptable?
4. Does this fit within our budget?
5. Have we discussed concerns with consultant?
6. Are the additional deliverables valuable to us?

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-24  
**Epic Status:** Draft  
**Story Points Estimate:** TBD (during grooming)
