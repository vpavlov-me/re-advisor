# EPIC-013F: Service Request Tracking & Management (Family Side)

## 📋 Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** Service Request Tracking for Families  
**Summary:** Enable families to initiate, track, and manage consultant service requests from booking through completion  
**Parent User Journey:** JRN-FAM-002 - Family Marketplace Service Booking (Stages 2, 6, 7, 8)  
**Priority:** Critical  
**Epic Link:** FG-EPIC-013F  
**Related Epic:** FG-EPIC-013A (Consultant service request management)

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Enable Admin and Family Council members to initiate direct service bookings, track ongoing service delivery, monitor consultant progress, receive deliverables, and confirm completion. This Epic delivers the family's service engagement tracking interface, complementing the proposal-based workflow with direct booking capability.

**User-facing value:**
- Families can directly book services from consultant catalogs without proposal negotiation
- Families have centralized dashboard tracking all active and past consultant engagements
- Families can monitor service progress, deadlines, and payment status in real-time
- Families receive deliverables and can provide feedback on service quality
- Families maintain historical records of all consultant engagements

**Business value:**
- Direct booking reduces time-to-engagement by 70% compared to proposal workflow
- Real-time progress tracking reduces family inquiries to consultants by 50%
- Clear completion workflow reduces payment disputes by 80%
- Service history enables repeat engagements and consultant loyalty

**Scope boundaries:**
- **Included:** Direct booking flow, service request dashboard, progress monitoring, deliverable viewing, completion confirmation
- **NOT included:** Proposal review (EPIC-012F), access configuration (EPIC-015F), payment processing (separate epic), detailed collaboration features (EPIC-016F)

---

## 👥 Target Users

**Primary Personas:**
- Admin (DOC-USR-003) - Initiates bookings and monitors engagements
- Family Council Member (DOC-USR-002) - Tracks service delivery and collaborates with consultants

**Secondary Personas:**
- Family Member (DOC-USR-001) - Can view service status (read-only)

---

## 📖 User Stories (High-Level)

1. **As an** Admin, **I want to** directly book a service from a consultant's catalog without waiting for a proposal, **so that** I can engage consultants quickly for urgent needs

2. **As a** Family Council member, **I want to** view all active and past service requests in one dashboard, **so that** I can track consultant engagements across the family

3. **As an** Admin, **I want to** monitor service request progress and deadlines, **so that** I can ensure consultants deliver on time and follow up if needed

4. **As a** Family Council member, **I want to** access consultant deliverables and shared resources, **so that** I can review work output and share with family members

5. **As an** Admin, **I want to** confirm service completion and provide feedback, **so that** I can close out engagements professionally and help improve consultant quality

6. **As a** Family Council member, **I want to** view historical service records, **so that** I can reference past consultant work and make informed re-engagement decisions

---

## 🔗 Dependencies

**Upstream Dependencies:**
- EPIC-011F: Marketplace Discovery (discovery leads to booking)
- EPIC-012F: Proposal Review (accepted proposals create service requests)
- EPIC-008: Consultant Calendar (availability data for direct booking)

**Downstream Impact:**
- EPIC-015F: Access Configuration (service requests trigger access setup)
- EPIC-016F: Service Monitoring (detailed progress tracking)
- EPIC-018F: Service Completion (formal completion workflow)
- Payment processing (booking triggers invoicing)

**Technical Dependencies:**
- Service request data model and storage
- Booking flow integration with consultant calendar
- Payment integration (Stripe invoicing)
- Access control automation
- Notification system

---

## 📐 Design & UX

**Figma Links:**
- [To be created] Direct Booking Flow
- [To be created] Family Service Dashboard
- [To be created] Service Request Detail View
- [To be created] Completion Confirmation Flow

**UX Notes:**

**User Flow - Direct Service Booking:**
1. Admin browses consultant profile (from EPIC-011F)
2. Views consultant's service catalog
3. Selects specific service → Service detail page
4. Reviews:
   - Service description and deliverables
   - Pricing (fixed or hourly)
   - Estimated duration
   - Cancellation policy
   - Required access to family modules
5. Clicks "Book This Service" button
6. Booking form appears:
   - **When:** Select date(s) from consultant's available calendar
   - **Additional Notes:** Custom scope or special requests (optional)
   - **Confirm Access:** Review and approve module access requirements
7. Reviews booking summary:
   - Service name and consultant
   - Dates and timeline
   - Total price and prepayment amount
   - Access permissions
   - Terms and cancellation policy
8. Clicks "Confirm Booking"
9. System creates service request with status "Pending" (awaits consultant confirmation)
10. If consultant confirms within 48h → status changes to "Accepted"
11. If prepayment required → invoice generated, status "Payment Pending"
12. After payment → status "In Progress", access provisioned

**User Flow - Service Dashboard:**
1. Admin navigates to "Services" section in Family Portal
2. Dashboard shows service request cards grouped by status:
   - **Active** (In Progress, Delivered)
   - **Pending** (Awaiting Confirmation, Payment Pending)
   - **Completed** (Confirmed complete, paid)
   - **Past** (Cancelled, Declined)
3. Each card displays:
   - Consultant name and photo
   - Service name
   - Status badge
   - Timeline (start, deadline, progress)
   - Payment status
   - Quick actions (View, Contact Consultant, Review Deliverables)
4. Can filter by: Consultant, Date Range, Service Type, Status
5. Can sort by: Start Date, Deadline, Consultant Name, Amount

**User Flow - Service Request Detail View:**
1. Click service request card from dashboard
2. Detail page opens with sections:
   - **Header:**
     - Consultant name, photo, verification badges
     - Service request ID
     - Status timeline (visual progress indicator)
     - Days remaining or overdue notice
   - **Service Details:**
     - Service name and description
     - Included deliverables checklist
     - Custom scope/notes from booking
   - **Timeline:**
     - Booked date
     - Start date
     - Key milestones (if defined)
     - Expected completion date
     - Actual completion date (when done)
   - **Payment:**
     - Total amount
     - Prepayment amount and status
     - Payment due dates
     - Invoice links
     - Payment history
   - **Consultant Access:**
     - Which modules consultant can access
     - Permission level (View, View+Modify)
     - Access granted date
     - Access expiration date
     - Button to "Adjust Access" (see EPIC-015F)
   - **Communication:**
     - Embedded chat or link to chat thread
     - Recent messages preview
     - "Send Message" button
   - **Deliverables:**
     - List of shared deliverables
     - For each: Name, description, link, date shared
     - Download/open deliverable
     - Mark as reviewed (optional)
   - **Activity History:**
     - Chronological log of all events
     - Status changes, payments, deliverables, messages

**User Flow - Receiving Deliverables:**
1. Consultant shares deliverable (from EPIC-013A)
2. Family receives notification: "New deliverable from [Consultant]"
3. Admin clicks notification → Opens service request detail
4. Sees new deliverable in list with "New" badge
5. Clicks deliverable → Opens external link in new tab
6. Can mark as "Reviewed" (optional, for tracking)
7. Can provide feedback via chat if revisions needed

**User Flow - Confirming Completion:**
1. Consultant marks service as "Delivered" (from EPIC-013A)
2. Family receives notification: "Service from [Consultant] is ready for review"
3. Admin navigates to service request detail
4. Status shows "Awaiting Your Confirmation"
5. Reviews all deliverables and work completed
6. Clicks "Confirm Completion" button
7. Completion modal appears:
   - "Are you satisfied with this service?"
   - Optional feedback form:
     - Quality rating (1-5 stars) [future feature]
     - What went well (text)
     - What could improve (text)
     - Would you work with this consultant again? (Yes/No)
8. Clicks "Confirm & Complete"
9. System processes:
   - Status → "Completed"
   - Consultant access → view-only (see EPIC-019F)
   - Final invoice generated if balance due
   - Confirmation sent to consultant
10. Redirects to payment if balance due, otherwise to dashboard

**Key UI Elements:**
- **Service Cards:** Compact cards with status, timeline, consultant info
- **Status Badges:** Color-coded badges (Blue: Active, Yellow: Pending, Green: Completed)
- **Timeline Visualization:** Progress bar or milestone timeline
- **Payment Indicators:** Clear icons for Paid/Pending/Overdue
- **Deliverable List:** Clean list with type icons and status badges
- **Activity Feed:** Chronological timeline with icons for event types
- **Quick Actions:** Floating buttons for common actions (chat, review, pay)

---

## 📢 Notifications (if applicable)

**Does this Epic involve user notifications?** Yes

| Trigger | Recipient | Format | Description |
|---------|-----------|--------|-------------|
| Direct booking confirmed by consultant | Family Admin/Council | Email + In-App | "Consultant [Name] confirmed your booking - Service begins [Date]" |
| Consultant declined booking | Family Admin/Council | Email + In-App | "Consultant [Name] declined your booking - [View Reason]" |
| Payment reminder (3 days before due) | Family Admin | Email | "Payment of $[Amount] due in 3 days for service from [Consultant]" |
| Service started | Family Admin/Council | In-App | "Service from [Consultant] has begun - [Track Progress]" |
| New deliverable received | Family Admin/Council | Email + In-App | "Consultant [Name] shared a deliverable - [View Now]" |
| Service deadline approaching (3 days) | Family Admin/Council | In-App | "Service from [Consultant] due in 3 days - [Check Progress]" |
| Service overdue | Family Admin | Email + In-App | "Service from [Consultant] is overdue - [Contact Consultant]" |
| Service marked complete by consultant | Family Admin/Council | Email + In-App + Push | "Service from [Consultant] is ready for review - [Confirm Completion]" |
| Auto-completion triggered (30 days) | Family Admin/Council | Email + In-App | "Service from [Consultant] auto-completed - [View Details]" |
| Access expiring soon (7 days) | Family Admin | Email + In-App | "Consultant [Name] access expires in 7 days - [Extend Access?]" |

**Notification Configuration Notes:**
- Default: All notifications enabled for Admin, opt-in for Council members
- Critical notifications (booking confirmed, completion ready) cannot be disabled
- Payment reminders sent at 3 days, 1 day, and on due date
- Deadline reminders sent at 3 days and 1 day before
- Frequency limit: Max 3 notifications per day per service request
- Family members (non-Admin/Council) receive only "Service Completed" notification if relevant to their modules
- Localization: English only initially

---

## 🧮 Business Rules

**Direct Booking Flow:**
1. Only Admin and Family Council can initiate bookings
2. Direct booking only available for services with "Fixed Price" pricing model
3. "Hourly Rate" and "Custom Quote" services require proposal workflow (EPIC-012)
4. Booking creates service request with status "Pending"
5. Consultant must confirm within 48 hours or booking auto-cancels with full refund
6. Calendar availability shown in real-time from EPIC-008
7. Family can book same consultant for multiple services simultaneously

**Service Request Status Lifecycle (Family Perspective):**
1. **Pending** - Awaiting consultant confirmation (direct bookings only)
2. **Payment Pending (Prepay)** - Awaiting prepayment from family before service starts
3. **In Progress** - Active service delivery
4. **Delivered** - Consultant finished, awaiting family confirmation
5. **Payment Pending (Final)** - Family confirmed completion, awaiting final payment (if balance due)
6. **Completed** - Fully paid and confirmed, service closed
7. **Cancelled** - Cancelled before completion
8. **Declined** - Consultant declined booking (direct bookings only)

**Payment Rules:**
1. Invoice generated immediately upon booking (if prepayment required)
2. Grace period: 3 days for prepayment invoice payment
3. Service cannot start until prepayment received (status: "Payment Pending (Prepay)")
4. Late prepayment (after grace period): Consultant notified, can cancel
5. Final payment due upon completion confirmation (if balance remaining)
6. After family confirms completion: Status → "Payment Pending (Final)" if balance due, otherwise → "Completed"
7. Grace period for final payment: 3 days
8. Service fully closed only after final payment received (status: "Completed")
9. Refunds processed per cancellation policy (set by consultant)

**Access Monitoring:**
1. Family can view when consultant last accessed their portal
2. Audit log shows all consultant actions in family modules
3. Family can adjust access permissions anytime (see EPIC-015F)
4. Access automatically expires after service completion (see EPIC-019F)
5. Family notified if consultant requests additional module access

**Deliverable Management:**
1. All deliverables are external links (no direct file downloads from platform)
2. Platform does not validate or scan links (family responsibility to verify safety)
3. Deliverables remain accessible indefinitely (even after service completion)
4. Family cannot edit or delete consultant's deliverables
5. Family can download/save deliverables to own storage

**Completion Confirmation:**
1. Family has 30 days to confirm completion after consultant marks "Delivered"
2. If no confirmation after 30 days → auto-confirms with notification
3. Upon confirmation:
   - If balance due → Status: "Payment Pending (Final)", final invoice generated
   - If fully paid → Status: "Completed"
4. Once marked "Completed" (after final payment received), service cannot be reopened
5. Completion feedback is optional but encouraged
6. Completion triggers consultant access downgrade to view-only (EPIC-019F)

**Cancellation Rules:**
1. Family can cancel before service starts (refund per consultant's policy)
2. After service starts: Mutual agreement required for cancellation
3. Cancellation requires reason selection (dropdown + optional text)
4. Cancellations don't automatically revoke consultant access (manual action required)
5. Cancelled services remain in history for audit trail

**Re-engagement:**
1. Family can quickly rebook same consultant for same service (one-click)
2. Rebooking inherits previous service settings (access, scope)
3. Rebooking creates new service request (not continuation)
4. Historical service requests linked to new booking for context

---

## 📝 Notes

**Future Enhancements (not in scope):**
- Recurring service bookings (monthly governance check-ins)
- Service bundles (book multiple services at once with discount)
- Family member collaboration (assign family members to work with consultant)
- Custom service requests (request services not in consultant's catalog)
- Service quality scoring (aggregate ratings across all families)
- Smart recommendations (suggest consultants based on service history)
- Bulk actions (cancel multiple services, export service history)
- Integration with family calendar (auto-add service deadlines)

**Open Questions:**
- Should family be able to pause service requests (e.g., family emergency)?
- Should family see consultant's delivery performance metrics (on-time rate)?
- Should there be escalation process if service significantly overdue?
- Should family be able to partially reject deliverables (request revisions)?
- Should platform intervene if consultant and family dispute completion?

**Assumptions:**
- Families comfortable with direct booking for standard services
- 48-hour confirmation window sufficient for consultants to respond
- 30-day auto-completion window reasonable for family review
- Families understand difference between direct booking and proposal workflow
- External link deliverables sufficient (no need for platform storage)
- Families trust consultant to deliver even if payment postpaid

**Service Request ID Format:**
- Same as consultant side: `SR-[YYYYMMDD]-[FAMILY_ID]-[SEQUENCE]`
- Example: `SR-20251024-F123-001`
- Displayed prominently for reference in communications

**Activity Log Visibility (Family Side):**
- Booking initiated (who, when)
- Consultant confirmed/declined
- Payment events (invoices sent, payments received)
- Service started
- Deliverables shared by consultant
- Status changes (In Progress → Delivered → Completed)
- Access permission changes
- Messages sent (count, not content)
- Cancellations or amendments

**Key Metrics for Family Dashboard:**
- Total spent on consultant services (lifetime)
- Active service requests count
- Average service satisfaction rating (future)
- Consultants worked with (unique count)
- Most used service types

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-24  
**Epic Status:** Draft  
**Story Points Estimate:** TBD (during grooming)
