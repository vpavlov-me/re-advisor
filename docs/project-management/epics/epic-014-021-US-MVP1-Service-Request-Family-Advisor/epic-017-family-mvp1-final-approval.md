# EPIC-017-MVP1: Final Approval (Family)

> **Note:** This Epic is part of MVP1 Service Request Journey

---

## 📋 Basic Information

**Issue Type:** Epic
**Project:** FG
**Epic Name:** Final Service Approval for Families (MVP1)
**Summary:** Enable families to review consultant's confirmation (including any additional services) and give final approval to start work
**Parent User Journey:** MVP1 Service Request Journey
**Priority:** Critical
**Epic Link:** FG-EPIC-017-MVP1

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Enable families to review the consultant's accepted proposal (potentially with additional services added) and make a final decision to approve and start the service or decline entirely.

**User-facing value:**
- Families see complete final scope before work begins
- Families understand updated pricing if consultant added services
- Families can contact consultant to discuss before approving
- Families maintain control over final commitment
- Clear visibility into module access requirements

**Business value:**
- Double-confirmation prevents misaligned expectations
- Ensures both parties committed before access provisioning
- Reduces disputes by having explicit approval of final terms
- Auto-cancel after 7 days prevents stale requests
- Triggers access provisioning only after mutual agreement

**Scope boundaries:**
- **Included:**
  - Email notification when consultant confirms
  - Final approval page showing complete service details
  - Display of any additional services consultant added
  - Updated total price display
  - Approve button ("Start Service")
  - Decline button (entire request)
  - Consultant contact info for questions
  - Access provisioning triggered upon approval
  - Status update to "In Progress"
  - Auto-cancel after 7 days if no approval

- **NOT included:**
  - Ability to remove specific additional services (accept all or decline all)
  - Counter-proposal functionality
  - Negotiation through platform
  - Partial payment at approval
  - Editing service details
  - Multi-approver workflow (single Admin decision)

---

## 👥 Target Users

**Who will use this feature?**

- **Primary Personas:**
  - Family Admin - Has final authority to approve service engagements
  - Family Council Member - Can view and recommend, but Admin typically approves

---

## 📖 User Stories (High-Level)

**Main scenarios this Epic will enable:**

**US-MVP1-009: Review Consultant's Confirmation**
- **As a** Family Admin
- **I want to** see the final service details after consultant confirmation, including any additional services they added
- **So that** I can review the complete scope and pricing before work begins

**US-MVP1-010: Approve Service to Start**
- **As a** Family Admin
- **I want to** give final approval to start the service (accepting all services as proposed)
- **So that** the consultant receives access and can begin work

**US-MVP1-011: Decline Service Proposal**
- **As a** Family Admin
- **I want to** decline the entire service proposal if the scope or price doesn't match my needs
- **So that** I can avoid commitments I'm not comfortable with

---

## 🔗 Dependencies

**Upstream Dependencies:**
- EPIC-013-MVP1 (Request Review) - Consultant must have accepted request
- Service Request in "Awaiting Family Final Approval" status

**Downstream Impact:**
- EPIC-016-MVP1 (Service Delivery) - Access provisioned upon approval
- Access control system provisions VIEW permissions
- Payment processing NOT triggered (postpayment model)
- Email notifications to both parties

**Technical Dependencies:**
- Service Request data model with items and pricing
- Access provisioning automation
- Email notification system
- Auto-cancel scheduled job (7-day timeout)

---

## 📐 Design & UX

**Figma Links:**
- [To be created] Final Approval Page
- [To be created] Service Details Summary
- [To be created] Approval Confirmation Modal

**UX Notes:**

**User Flow - Final Approval:**

**Step 1: Notification**
1. Family Admin receives email + in-app notification: "Consultant [Name] accepted your request"
2. If no additional services:
   - "Please review and approve to start"
3. If consultant added services:
   - "Consultant added [N] additional services - Total price: $[amount]"
   - "Open chat if you have questions" (EPIC-011-V2)
4. Email contains link to Final Approval page with chat access

**Step 2: Final Approval Page**

**Page Header:**
- Service Request ID
- Status: "Awaiting Your Approval"
- Consultant name and photo
- Countdown: "Please respond within 7 days" (auto-cancel warning)
- **"Open Chat to Discuss" button** (EPIC-011-V2)

**Original Service Section:**
- Badge: "Original Request"
- Service name
- Description
- Price: $500
- Deliverables list

**Additional Services Section (if applicable):**
- Badge: "Added by Consultant"
- For each added service:
  - Service name
  - Description
  - Price: $300
  - Why needed (consultant's comment)
- Example: "Based on your notes about board disagreements, I recommend adding Conflict Resolution Session"

**Price Summary:**
- Original service: $500
- Additional services: $300 (2 services)
- **Total Price: $800** (large, bold)
- Payment terms: "100% payment after service completion"

**Timeline & Scope:**
- Estimated timeline: "2 weeks" (if consultant provided)
- Combined deliverables list (from all services)

**Module Access Requirements:**
- Warning badge: "Data Access"
- "Consultant will have VIEW access to:"
  - Constitution (from original)
  - Meetings (from original)
  - Succession (from added service)
- Checkbox (required): "I understand and approve this access"

**Consultant Communication:**
- "Have questions about the services?"
- **"Open Chat with Consultant" button** (primary action - EPIC-011-V2)

**Action Buttons:**
- **Primary CTA: "Approve & Start Service"** (green, large)
  - Disabled until access checkbox checked
- **Secondary: "Decline"** (gray, smaller)
- **Tertiary: "Email Consultant"** (link style)

**Step 3A: Approve Service**
1. Family checks "I understand and approve this access" checkbox
2. Clicks "Approve & Start Service"
3. Confirmation modal:
   - "Start this service?"
   - Service summary
   - Total price
   - Access summary
   - "Services will begin immediately after approval"
   - "You'll pay $[amount] after completion"
4. Clicks "Confirm"
5. System processes:
   - Status → "In Progress"
   - Provisions VIEW access to specified modules
   - Records family_approved_at timestamp
   - Sends emails to both parties
6. Success screen:
   - "Service Started!"
   - "Consultant [Name] now has access and will begin work"
   - "You can track progress in [Service Requests]"
   - Link to Service Request tracking page

**Step 3B: Decline Proposal**
1. Clicks "Decline" button
2. Confirmation modal:
   - "Decline this service proposal?"
   - "This will cancel the entire request"
   - Optional: Reason dropdown
     - "Price too high"
     - "Scope doesn't match needs"
     - "Found another consultant"
     - "Changed our mind"
     - "Other"
3. Clicks "Confirm Decline"
4. System processes:
   - Status → "Cancelled by Family"
   - Stores cancellation reason
   - Sends email to consultant
5. Success message: "Request cancelled. Consultant has been notified."

**Step 3C: Chat with Consultant (Before Deciding)**
1. Clicks "Open Chat with Consultant" button
2. Chat interface opens (EPIC-011-V2)
3. Family can discuss concerns via in-platform chat
4. Consultant can provide clarification
5. Family returns to Final Approval page to decide
6. Note: Consultant CANNOT revise proposal through platform (would need family to decline and rebook)

**Step 4: Auto-Cancel (7 Days No Approval)**
- After 7 days:
  - System auto-updates status → "Cancelled by Family"
  - Reason: "No approval within 7 days"
  - Email to consultant: "Family didn't approve within 7 days. Request cancelled."
  - Email to family: "Your service request expired. Please rebook if still interested."

**Key UI Elements:**
- **Price Comparison:** Original vs. Final (if changed)
- **Consultant Comment Badge:** Highlighted explanation for additions
- **Access Warning:** Clear, prominent display
- **Countdown Timer:** Visual reminder of 7-day deadline
- **"Open Chat" Button:** Easy path to discuss with consultant (EPIC-011-V2)

---

## 🔔 Notifications (if applicable)

**Does this Epic involve user notifications?** Yes

| Trigger | Recipient | Format | Description |
|---------|-----------|--------|-------------|
| Consultant accepts request | Family Admin/Council | Email + In-App | "Consultant [Name] accepted your request - Please review and approve to start." If services added: "Consultant added [N] additional services - Total price: $[amount]. Open chat if you have questions." |
| Family approves | Consultant | Email + In-App | "Family [Name] approved - Service started, you now have portal access" |
| Family approves | Family Admin/Council | Email + In-App | "Service in progress - Consultant [Name] now has access to your portal" |
| Family declines | Consultant | Email + In-App | "Family [Name] declined the proposal - Reason: [reason]" |
| Auto-cancel (7 days) | Consultant | Email + In-App | "Service request from Family [Name] expired due to no approval" |
| Auto-cancel (7 days) | Family Admin/Council | Email + In-App | "Your service request expired. Please rebook if still interested." |

**Notification Configuration Notes:**
- All emails sent immediately upon action
- No reminder emails before 7-day deadline in MVP1
- Consultant receives family decision within minutes
- Access provisioning happens before consultant email sent (so they can log in immediately)

---

## 🧮 Business Rules

**Approval Authorization:**
1. Only Family Admin can approve (final authority)
2. Family Council can view but cannot approve alone in MVP1
3. One Admin approval sufficient (no multi-sig required)

**Approval Requirements:**
1. Must check "I understand access" acknowledgment box
2. Cannot approve until checkbox checked (button disabled)
3. Approval is all-or-nothing (cannot partially approve)
4. Cannot edit any services or prices (accept as-is or decline all)

**Response Window:**
1. Family has 7 days from consultant acceptance to approve
2. Countdown starts at consultant_confirmed_at timestamp
3. After 7 days: Auto-cancel triggered
4. No reminders sent in MVP1 (single notification only)

**Decline Rules:**
1. Decline cancels entire Service Request
2. Decline reason optional but encouraged
3. Decline is final (consultant notified immediately)
4. Family can rebook with same or different consultant (new request)
5. Declined requests remain in history

**Access Provisioning Upon Approval:**
1. System creates FamilyAdvisorAssociation record
2. Consultant receives VIEW permissions only
3. Modules granted = union of all services' required_modules
4. Permission level = "view" (hardcoded in MVP1)
5. Access granted_at timestamp recorded
6. Consultant can immediately log into Family Portal
7. Access remains until service completion + payment

**Status Transitions:**
- Consultant accepts → "Awaiting Family Final Approval"
- Family approves → "In Progress"
- Family declines → "Cancelled by Family" (terminal)
- Auto-cancel → "Cancelled by Family" (terminal, with specific reason)

**Price Locking:**
1. Total price fixed at approval time
2. Cannot be changed during service delivery
3. Same amount charged at completion
4. Price breakdown preserved in service_request_items

---

## 📝 Notes

**MVP1 Simplifications:**
- No ability to remove individual additional services (all or nothing)
- No counter-proposal (family can use chat to discuss but not modify proposal)
- No multi-approver workflow (single Admin decision)
- No prepayment option (all services postpaid)
- No service editing after approval (consultant would need family to decline and rebook)

**Communication Options:**
- Family can chat with consultant before deciding (EPIC-011-V2)
- In-platform chat for questions and clarifications
- If family wants changes:
  - Option 1: Chat with consultant, consultant clarifies, family approves existing proposal
  - Option 2: Family declines, consultant adjusts their catalog, family rebooks
- No multi-round proposal iterations in MVP1

**Module Access Calculation:**
Example:
- Original service requires: ["constitution", "meetings"]
- Added service 1 requires: ["meetings", "succession"]
- Added service 2 requires: ["philanthropy"]
- **Final access granted:** ["constitution", "meetings", "succession", "philanthropy"] (union, no duplicates)

**Future Enhancements (Post-MVP1):**
- Remove specific additional services before approval
- Counter-proposal with modifications
- Multi-approver workflow (Family Council vote)
- Reminder emails at 3 days and 1 day before auto-cancel
- Schedule service start date (not immediate)
- Partial prepayment option

**Assumptions:**
- Family trusts consultant's judgment on additional services
- In-platform chat sufficient for questions (EPIC-011-V2)
- 7-day approval window reasonable
- Admin has authority to approve without Council vote
- Families comfortable with postpayment (no upfront cost barrier)

**Edge Cases:**
- Consultant adds many expensive services → Family can decline or discuss via chat
- Family wants different combination → Must decline and discuss with consultant via chat, then rebook
- Admin unavailable during approval window → Auto-cancel, can rebook
- Multiple Admins, one approves → First approval wins (no conflict in MVP1)

**Access Provisioning Technical Notes:**
- Access granted synchronously upon approval click (before success screen shown)
- If access provisioning fails → Rollback approval, show error, allow retry
- Consultant portal shows new family access immediately
- Family audit log records access grant event

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-27
**Epic Status:** Draft
**Story Points Estimate:** 5 SP
