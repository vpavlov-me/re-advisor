# EPIC-016-MVP1: Request Review (Consultant)

> **Note:** This Epic is part of MVP1 Service Request Journey

---

## 📋 Basic Information

**Issue Type:** Epic
**Project:** FG
**Epic Name:** Service Request Review for Consultants (MVP1)
**Summary:** Enable consultants to review incoming service requests, add additional services if needed, and accept or decline requests
**Parent User Journey:** MVP1 Service Request Journey
**Priority:** Critical
**Epic Link:** FG-EPIC-016-MVP1

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Enable consultants to receive, review, and respond to service requests from families. Consultants can accept requests as-is, propose additional services from their catalog, or decline unsuitable requests.

**User-facing value:**
- Consultants receive timely notifications of new service requests
- Consultants can contact families via email before accepting
- Consultants can expand scope by adding relevant services
- Consultants can decline projects that don't fit their expertise/availability
- Clear 48-hour response window prevents indefinite waiting

**Business value:**
- Consultant confirmation ensures commitment before access provisioning
- Ability to add services increases average transaction value
- Decline option protects consultant quality and satisfaction
- Email-based coordination reduces need for platform chat
- Auto-decline after 48h prevents family frustration

**Scope boundaries:**
- **Included:**
  - Email notification to consultant with request details and family contacts
  - Consultant portal view of Service Request details
  - Accept request as-is (no changes)
  - Accept request with additional services from catalog
  - Add comment explaining why additional services recommended
  - Decline request with reason
  - Auto-decline after 48 hours if no response
  - Status updates to family after consultant action

- **NOT included:**
  - Custom pricing (can only use catalog prices)
  - Editing original service (only addition)
  - Negotiation through platform chat
  - Calendar scheduling integration
  - Multi-round proposal iterations
  - Partial acceptance (all or nothing)

---

## 👥 Target Users

**Who will use this feature?**

- **Primary Personas:**
  - Consultant (Marketplace) - Independent advisor offering services through platform

---

## 📖 User Stories (High-Level)

**Main scenarios this Epic will enable:**

**US-MVP1-005: Review Incoming Service Request**
- **As a** Consultant
- **I want to** receive notification of new service requests with family contact information and request details
- **So that** I can review whether the project is suitable for me and contact the family if needed

**US-MVP1-006: Accept Request As-Is**
- **As a** Consultant
- **I want to** accept a service request without modifications
- **So that** the family can proceed to final approval and we can begin work

**US-MVP1-007: Add Additional Services to Request**
- **As a** Consultant
- **I want to** add additional services from my catalog with an explanation when accepting a request
- **So that** I can propose a more comprehensive scope based on the family's needs

**US-MVP1-008: Decline Unsuitable Request**
- **As a** Consultant
- **I want to** decline a service request with a reason
- **So that** I can avoid projects that don't fit my expertise or availability

---

## 🔗 Dependencies

**Upstream Dependencies:**
- EPIC-012-MVP1 (Service Booking) - Service Request must be created by family
- Consultant portal authentication and authorization
- Consultant service catalog with active services

**Downstream Impact:**
- EPIC-015-MVP1 (Final Approval) - Family reviews consultant's confirmation
- Email notification system for status updates
- Service Request status transitions

**Technical Dependencies:**
- Service Request data model with items support
- Email notification service
- Consultant portal UI for request management

---

## 📐 Design & UX

**Figma Links:**
- [To be created] Service Request List (Consultant Portal)
- [To be created] Service Request Detail View (Consultant)
- [To be created] Accept Request Form
- [To be created] Decline Request Form

**UX Notes:**

**User Flow - Review Service Request:**

**Step 1: Notification & Initial Review**
1. Consultant receives email + in-app notification: "New service request from Family [Name]"
2. Email/notification includes:
   - Service requested
   - Link to review request in portal
   - Notes from family (if provided)
   - 48-hour response deadline
   - "Open Chat" button to discuss details (see EPIC-011-V2)
3. Consultant can use in-platform chat for clarification
4. Consultant clicks link → Opens Service Request detail page in Consultant Portal

**Step 2: Service Request Detail Page**
- Header:
  - Service Request ID
  - Family name
  - Status: "Pending Your Confirmation"
  - Countdown timer: "Respond within 48 hours" (with hours remaining)
  - **"Chat with Family" button** (opens Service Request chat - EPIC-011-V2)
- Original Service:
  - Service name and description
  - Price
  - Deliverables
  - Required modules for access
- Family Notes:
  - Display family's additional notes (if provided)

**Step 3A: Accept As-Is**
1. Clicks "Accept Request" button
2. Confirmation modal:
   - "Accept this service request?"
   - Service summary
   - Optional: Add estimated timeline field
   - "Confirm" button
3. System processes:
   - Status → "Awaiting Family Final Approval"
   - Email sent to family
4. Success message: "Request accepted! Family will review and approve."

**Step 3B: Accept with Additional Services**
1. Clicks "Accept & Add Services" button
2. Add Services form appears:
   - **Select Additional Services:**
     - Dropdown/checkbox list of consultant's active catalog services
     - Can select multiple
     - Shows price for each
     - Running total updates as services selected
   - **Explain Why Needed:**
     - Text field (required): "Based on your notes about [X], I recommend..."
     - Max 500 characters
   - **Estimated Timeline:**
     - Optional field: "2 weeks", "1 month", etc.
   - **Price Summary:**
     - Original service: $500
     - Additional services: $300 (2 services)
     - **Total: $800**
3. Clicks "Send to Family for Approval"
4. System processes:
   - Creates service_request_items for each service
   - Updates total_amount
   - Adds consultant_comment
   - Status → "Awaiting Family Final Approval"
   - Email sent to family with updated details
5. Success message: "Proposal sent to family with [N] additional services!"

**Step 3C: Decline Request**
1. Clicks "Decline Request" button
2. Decline form modal:
   - **Reason for declining:** (dropdown, required)
     - "Outside my expertise"
     - "Not available for this timeline"
     - "Scope doesn't match my services"
     - "Other" (opens text field)
   - Optional additional notes field
3. Clicks "Confirm Decline"
4. System processes:
   - Status → "Declined by Consultant"
   - Stores decline_reason
   - Email sent to family
5. Success message: "Request declined. Family has been notified."

**Step 4: Auto-Decline (No Response)**
- After 48 hours of no action:
  - System automatically updates status → "Declined by Consultant"
  - decline_reason = "No response within 48 hours"
  - Email sent to family: "Consultant didn't respond. You can book with another consultant."
  - Email sent to consultant: "Service request auto-declined due to no response"

**Key UI Elements:**
- **Countdown Timer:** Visual urgency for 48-hour deadline
- **Service Request Card:** Clean summary of key details
- **"Chat with Family" Button:** Prominent placement in header (EPIC-011-V2)
- **Action Buttons:** Clear primary actions (Accept / Decline)
- **Add Services Interface:** Multi-select with running price total
- **Explanation Field:** Required for additional services
- **Decline Reason Dropdown:** Structured options for analytics

---

## 🔔 Notifications (if applicable)

**Does this Epic involve user notifications?** Yes

| Trigger | Recipient | Format | Description |
|---------|-----------|--------|-------------|
| Family books service | Consultant | Email + In-App | "New service request from Family [Name] - Please review and confirm. Open chat to discuss details. Response required within 48 hours." |
| Consultant accepts (as-is) | Family Admin/Council | Email + In-App | "Consultant [Name] accepted your request - Please review final details and approve to start. Chat available for questions." |
| Consultant accepts (with additional services) | Family Admin/Council | Email + In-App | "Consultant [Name] accepted your request and added [N] additional services - Total price: $[amount]. Please review and approve. Open chat to discuss." |
| Consultant declines | Family Admin/Council | Email + In-App | "Consultant [Name] declined your request - Reason: [reason]. You can book with another consultant." |
| Auto-decline (48h no response) | Family Admin/Council | Email + In-App | "Consultant [Name] didn't respond within 48 hours. Your request was automatically declined. You can book with another consultant." |
| Auto-decline (48h no response) | Consultant | Email + In-App | "Your service request from Family [Name] was auto-declined due to no response." |

**Notification Configuration Notes:**
- All notifications sent via email + in-app notifications
- Emails sent immediately upon action
- 48-hour countdown reminders NOT sent in MVP1 (consultant gets one notification)
- Chat availability highlighted in notifications (EPIC-011-V2)
- Links to Service Request detail page in both portals

---

## 🧮 Business Rules

**Response Window:**
1. Consultant has 48 hours from booking to respond
2. Countdown starts at booked_at timestamp
3. After 48 hours: Auto-decline triggered
4. Auto-decline sends notifications to both parties

**Accept Rules:**
1. Consultant can accept with zero additional services (as-is)
2. Consultant can add 1-10 additional services from own catalog only
3. Cannot modify original service (only add services)
4. Cannot change prices (must use catalog prices)
5. Acceptance requires optional timeline estimate
6. Additional services require explanation (consultant_comment field)

**Additional Services:**
1. Can only add services from consultant's own active catalog
2. Multiple services allowed (no limit in MVP1, but UX suggests max 5 practical)
3. Each added service creates entry in service_request_items table
4. Total price recalculated automatically (sum of all services)
5. Required modules combined from all services (union of module lists)
6. If additional services require more modules, family sees expanded access requirements

**Decline Rules:**
1. Decline requires reason (dropdown selection)
2. Decline is final (cannot be undone by consultant)
3. Family can rebook with same or different consultant
4. Declined requests remain in history for analytics

**Service Request Status Transitions:**
- Booking creates status: "Pending Consultant Confirmation"
- Accept → "Awaiting Family Final Approval"
- Decline → "Declined by Consultant" (terminal)
- Auto-decline → "Declined by Consultant" (terminal, with specific reason)

**Module Access Calculation:**
- Original service requires: ["constitution", "meetings"]
- Added service 1 requires: ["meetings", "succession"]
- Added service 2 requires: ["philanthropy"]
- **Combined access needed:** ["constitution", "meetings", "succession", "philanthropy"]
- Family sees this combined list at Final Approval stage

---

## 📝 Notes

**MVP1 Simplifications:**
- In-platform chat available for coordination (EPIC-011-V2)
- No calendar integration (timeline as text field)
- No custom pricing (only catalog prices)
- No multi-round negotiation (one Accept or Decline)
- No consultant can edit after acceptance (would need to decline and family rebooks)
- No partial acceptance (all or nothing)

**Chat Communication:**
- Service Request chat automatically created at booking (EPIC-011-V2)
- Consultant can use chat to discuss scope before accepting
- All discussions tracked in platform for audit trail
- Consultant can discuss scope via chat, then accept with adjusted services

**Additional Services Use Cases:**
- Family books "Governance Workshop" → Consultant adds "Follow-up Consultation" based on notes
- Family books "Succession Planning" → Consultant adds "Family Constitution Review" for comprehensive approach
- Family's notes indicate conflict → Consultant adds "Mediation Session"

**Future Enhancements (Post-MVP1):**
- Counter-proposal iterations (family rejects some additions, consultant revises)
- Custom service creation during acceptance (not just catalog)
- Smart recommendations (AI suggests services based on family notes)
- Calendar integration for timeline coordination
- Consultant availability checking before acceptance

**Assumptions:**
- 48-hour response window reasonable for consultants
- In-platform chat sufficient for initial coordination (EPIC-011-V2)
- Consultants willing to add services proactively (increases their revenue)
- Families comfortable with consultant expanding scope (can decline at Final Approval)
- Catalog services diverse enough to cover most scenarios

**Edge Cases:**
- Consultant adds services family can't afford → Family can decline or discuss via chat
- Consultant accepts but family never approves → Auto-cancel after 7 days (handled in EPIC-015-MVP1)
- Consultant offline/unavailable → Auto-decline protects family from indefinite wait
- Multiple consultants for similar service → Family can book multiple (creates separate requests)

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-27
**Epic Status:** Draft
**Story Points Estimate:** 8 SP
