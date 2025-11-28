# EPIC-013A: Service Request Lifecycle Management (Consultant Side)

## 📋 Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** Service Request Lifecycle for Consultants  
**Summary:** Enable consultants to view, manage, and track service requests throughout delivery lifecycle  
**Parent User Journey:** JRN-FAM-002 - Family Marketplace Service Booking (Stages 2, 6, 7)  
**Priority:** Critical  
**Epic Link:** FG-EPIC-013A  
**Related Epic:** FG-EPIC-013F (Family service request tracking)

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Enable consultants to manage service requests from acceptance through completion, including viewing request details, tracking progress, communicating with families, uploading deliverables, and marking services complete. This Epic delivers the consultant's service delivery management interface.

**User-facing value:**
- Consultants have centralized dashboard for all active service requests
- Consultants can track progress, deadlines, and payment status
- Consultants can communicate with families and share deliverables
- Consultants can update service status and mark completion
- Consultants maintain historical records of completed services

**Business value:**
- Structured service delivery increases completion rate to >85%
- Clear progress tracking reduces family inquiries by 40%
- Deliverable management reduces disputes and refund requests
- Service history enables consultant portfolio building and credibility

**Scope boundaries:**
- **Included:** Service request dashboard, status management, deliverable uploads, completion workflow
- **NOT included:** Proposal creation (EPIC-012A), payment processing (separate epic), access management (EPIC-015), detailed service delivery features (EPIC-016A)

---

## 👥 Target Users

**Primary Personas:**
- Consultant (DOC-USR-006) - Manages service delivery and tracks requests

**Secondary Personas:**
- Family Admin/Council (DOC-USR-002) - Monitors service progress (see EPIC-013F)

---

## 📖 User Stories (High-Level)

1. **As a** Consultant, **I want to** view all my service requests in a centralized dashboard, **so that** I can track active, upcoming, and completed engagements

2. **As a** Consultant, **I want to** see detailed information for each service request including family, services, timeline, and payment status, **so that** I can manage delivery effectively

3. **As a** Consultant, **I want to** update service request status as I progress, **so that** families know where things stand and I maintain organized workflow

4. **As a** Consultant, **I want to** upload deliverables and share resources with families, **so that** I can fulfill my service commitments professionally

5. **As a** Consultant, **I want to** mark services as complete when finished, **so that** I can trigger final payment and close out the engagement

6. **As a** Consultant, **I want to** view my service request history, **so that** I can reference past work and build my consultant portfolio

---

## 🔗 Dependencies

**Upstream Dependencies:**
- EPIC-012A: Consultant Proposal Creation (accepted proposals create service requests)
- EPIC-011F: Family Marketplace Discovery (direct bookings create service requests)
- EPIC-015F: Access Configuration (service requests trigger access provisioning)

**Downstream Impact:**
- EPIC-016A: Service Delivery & Progress Tracking (detailed delivery features)
- EPIC-018A: Service Completion Workflow (formal completion process)
- Payment processing (completion triggers final invoices)
- EPIC-019A: Post-Service Access Management (completion affects permissions)

**Technical Dependencies:**
- Service request data model and storage
- Status tracking system
- File/link management system
- Access control integration
- Payment status integration (Stripe webhooks)

---

## 📐 Design & UX

**Figma Links:**
- [To be created] Service Request Dashboard
- [To be created] Service Request Detail View
- [To be created] Status Update Interface
- [To be created] Deliverable Management

**UX Notes:**

**User Flow - Service Request Dashboard:**
1. Consultant navigates to "My Services" in Consultant Portal
2. Sees dashboard with tabs:
   - **Active** (In Progress, Awaiting Payment)
   - **Upcoming** (Accepted, Payment Pending, Scheduled Future)
   - **Completed** (Delivered, Completed, Paid)
   - **All** (entire history)
3. For each service request, card shows:
   - Family name and logo
   - Service name(s)
   - Status badge (color-coded)
   - Timeline (start date, deadline, days remaining)
   - Payment status (Unpaid/Prepaid/Partial/Paid)
   - Quick actions (View Details, Update Status, Upload Deliverable)
4. Can filter by: Family, Service Type, Date Range, Payment Status
5. Can sort by: Start Date, Deadline, Amount, Family Name

**User Flow - Service Request Detail View:**
1. Click service request card from dashboard
2. Detail page opens with sections:
   - **Header:**
     - Family name, photo, contact link
     - Service request ID
     - Status with last updated timestamp
     - Timeline progress bar
   - **Services & Scope:**
     - List of included services with descriptions
     - Deliverables checklist (mark as completed)
     - Custom scope notes from proposal
   - **Payment Information:**
     - Total amount
     - Prepayment amount (if applicable)
     - Payment status
     - Invoice links
   - **Timeline & Milestones:**
     - Start date
     - Key milestones with dates
     - Deadline
     - Days remaining or overdue indicator
   - **Access & Permissions:**
     - Which modules consultant has access to
     - Permission expiration date
     - Link to access family portal
   - **Communication:**
     - Embedded chat or link to chat with family
     - Recent messages preview
   - **Deliverables & Resources:**
     - Uploaded files/links
     - Upload new deliverable button
     - Deliverable status (Draft/Shared/Approved)
   - **Activity Log:**
     - Chronological history of all actions
     - Status changes, uploads, communications

**User Flow - Updating Status:**
1. From dashboard or detail view, click "Update Status"
2. Dropdown or modal shows available status transitions:
   - Current status highlighted
   - Allowed next statuses based on business rules
   - Description of what each status means
3. Select new status
4. Optional: Add note about update (visible to family)
5. Confirm update
6. System validates transition
7. Status updated, family notified

**User Flow - Uploading Deliverables:**
1. From detail view, click "Upload Deliverable"
2. Modal opens with options:
   - **External Link:** Paste URL (Google Drive, SharePoint, Dropbox, etc.)
     - Deliverable name
     - Description/notes
     - Link URL
   - **Note/Message:** Text-only update
     - Title
     - Rich text content
3. Click "Share with Family"
4. Deliverable appears in request timeline and family is notified
5. Family can access deliverable from their portal

**Key UI Elements:**
- **Dashboard Cards:** Compact, scannable, with key info and CTAs
- **Status Badges:** Color-coded (Blue: In Progress, Green: Completed, Yellow: Awaiting Payment, Red: Overdue)
- **Timeline Progress Bar:** Visual representation of service progress
- **Payment Indicators:** Icons for Unpaid/Prepaid/Paid with tooltips
- **Quick Actions:** Icon buttons for common actions (chat, upload, status)
- **Activity Feed:** Chronological timeline of all activities
- **Deliverable Manager:** List view with status, type, date shared

---

## 📢 Notifications (if applicable)

**Does this Epic involve user notifications?** Yes

| Trigger | Recipient | Format | Description |
|---------|-----------|--------|-------------|
| New service request created | Consultant | Email + In-App + Push | "New service request from Family [Name] - [View Details]" |
| Payment received (prepayment) | Consultant | Email + In-App | "Family [Name] paid prepayment of $[Amount] - Service can begin" |
| Service deadline approaching (3 days) | Consultant | Email + In-App | "Service request for Family [Name] is due in 3 days - [View Progress]" |
| Service overdue | Consultant | Email + In-App | "Service request for Family [Name] is overdue - [Update Status]" |
| Family requested amendment | Consultant | Email + In-App | "Family [Name] requested changes to service scope - [View Chat]" |
| Family confirmed completion | Consultant | Email + In-App | "Family [Name] confirmed service completion - [View Feedback]" |
| Final payment received | Consultant | Email + In-App | "Final payment of $[Amount] received from Family [Name] - Service closed" |

**Notification Configuration Notes:**
- Default: All notifications enabled
- Critical notifications (new request, payment received) cannot be disabled
- Deadline reminders sent at 3 days, 1 day, and on deadline day
- Overdue reminders sent daily until status updated
- Frequency limit: Max 3 notifications per day per service request
- Localization: English only initially

---

## 🧮 Business Rules

**Service Request Lifecycle Statuses:**
1. **Draft** - Created but not yet sent to consultant (family side only)
2. **Pending** - Awaiting consultant confirmation (direct bookings)
3. **Accepted** - Consultant confirmed, awaiting payment
4. **Payment Pending (Prepay)** - Awaiting prepayment (if required)
5. **In Progress** - Active service delivery
6. **Delivered** - Consultant marked complete, awaiting family confirmation
7. **Payment Pending (Final)** - Family confirmed, awaiting final payment (if balance due)
8. **Completed** - Fully paid and confirmed, service closed
9. **Cancelled** - Either party cancelled before completion
10. **Disputed** - Issue raised, requires resolution

**Status Transition Rules:**
| From | To | Conditions |
|------|-----|-----------|
| Pending | Accepted | Consultant confirms within 48h |
| Pending | Declined | Consultant declines or no response after 48h |
| Accepted | Payment Pending (Prepay) | If prepayment required |
| Accepted | In Progress | If no prepayment required |
| Payment Pending (Prepay) | In Progress | Prepayment received |
| In Progress | Delivered | Consultant marks complete |
| Delivered | Payment Pending (Final) | Family confirms AND balance due |
| Delivered | Completed | Family confirms AND fully paid (or auto after 30 days) |
| Any (except Completed) | Cancelled | By mutual agreement or policy violation |

**Access Management Integration:**
1. Service request includes list of modules consultant needs access to
2. Access automatically provisioned when status → "In Progress"
3. Access maintained throughout "In Progress" and "Delivered" statuses
4. Access automatically downgraded to view-only when status → "Completed"
5. Family can manually adjust access at any time (see EPIC-015F)

**Deliverable Management:**
1. Consultants can only share external links, not upload files directly
2. No file size or type restrictions (links point to external storage)
3. Platform does not validate or scan links (family responsibility)
4. Deliverables timestamped and logged in activity history
5. Deliverables remain accessible after service completion
6. Consultant can update/delete deliverables before family marks completion

**Timeline & Deadlines:**
1. Deadlines set from proposal or direct booking
2. Consultant can request deadline extension via chat (family must approve)
3. Extensions don't automatically adjust payment milestones
4. Overdue services don't automatically cancel (manual action required)
5. Timeline visible to both consultant and family

**Payment Tracking:**
1. Service request shows payment status from Stripe
2. Payment status: Unpaid, Prepaid, Partially Paid, Paid in Full
3. Consultant cannot access family data if prepayment required but unpaid
4. Final payment triggered when family confirms completion
5. Payment disputes handled through Stripe (platform doesn't intervene)

**Cancellation Rules:**
1. Consultant can cancel before service starts (full refund to family)
2. Consultant cannot cancel after service starts without family agreement
3. Family can cancel per cancellation policy (set in proposal)
4. Cancellation requires reason (dropdown + optional text)
5. Cancelled services remain in history for audit trail

---

## 📝 Notes

**Future Enhancements (not in scope):**
- Time tracking for hourly services (billable hours)
- Multi-phase project management (Gantt charts, dependencies)
- Template service requests (repeat common engagements)
- Service request cloning (create similar request for another family)
- Integrated video calls for consultations
- Document collaboration tools (real-time editing)
- Consultant performance analytics (on-time delivery rate, family satisfaction)
- Bulk actions (update multiple service requests at once)

**Open Questions:**
- Should consultants be able to pause service requests (e.g., waiting on family input)?
- Should there be auto-reminders if consultant hasn't updated status in X days?
- Should consultants see family satisfaction ratings immediately after completion?
- Should service requests auto-archive after X months?
- Should consultants be able to share partial deliverables for family review?

**Assumptions:**
- Consultants manage up to 10 concurrent service requests comfortably
- External link sharing sufficient for deliverable management (no direct file uploads)
- Consultant responsible for tracking own time and milestones
- Families provide timely feedback when needed (no SLA for family responses)
- Payment disputes rare enough to handle manually through Stripe

**Service Request ID Format:**
- Format: `SR-[YYYYMMDD]-[FAMILY_ID]-[SEQUENCE]`
- Example: `SR-20251024-F123-001`
- Displayed to both consultant and family for reference

**Activity Log Contents:**
- All status changes with timestamp and actor
- Deliverable uploads/shares
- Payment events (prepayment, final payment, refunds)
- Access permission changes
- Chat message count (not content)
- Deadline changes
- Cancellation or amendments

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-24  
**Epic Status:** Draft  
**Story Points Estimate:** TBD (during grooming)
