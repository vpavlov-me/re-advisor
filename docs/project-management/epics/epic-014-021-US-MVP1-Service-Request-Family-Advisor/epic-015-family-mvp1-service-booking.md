# EPIC-015-MVP1: Service Booking (Family)

> **Note:** This Epic is part of MVP1 Service Request Journey

---

## 📋 Basic Information

**Issue Type:** Epic
**Project:** FG
**Epic Name:** Direct Service Booking for Families (MVP1)
**Summary:** Enable families to book consultant services directly from catalog with simple request form
**Parent User Journey:** MVP1 Service Request Journey
**Priority:** Critical
**Epic Link:** FG-EPIC-015-MVP1

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Enable Family Admin and Family Council members to initiate service bookings by selecting services from consultant catalogs and submitting booking requests with optional notes and access acknowledgment.

**User-facing value:**
- Families can book fixed-price services directly without proposal negotiation
- Families understand which modules consultant will access before booking
- Families can provide context through optional notes
- Simple, fast booking flow (under 5 minutes)

**Business value:**
- Enables direct service engagement without complex proposal workflow
- Reduces time-to-engagement from days to hours
- Creates Service Request record for tracking
- Validates "buy now" model for standardized services

**Scope boundaries:**
- **Included:**
  - Service selection from consultant's catalog
  - Booking form with optional notes field
  - Module access requirements display and acknowledgment
  - "Confirm Booking" button
  - Service Request creation with status "Pending Consultant Confirmation"
  - Email notifications to consultant and family
  - Exchange of contact information (email/phone)

- **NOT included:**
  - Chat with consultant before booking
  - Proposal workflow (EPIC-012 - out of MVP1)
  - Calendar date selection (consultant availability)
  - Custom service requests (only catalog services)
  - Payment at booking time (postpayment model)
  - Multiple service selection at once

---

## 👥 Target Users

**Who will use this feature?**

- **Primary Personas:**
  - Family Admin - Has authority to initiate and approve consultant engagements
  - Family Council Member - Can initiate bookings but Admin typically has final approval

- **Secondary Personas:**
  - Family Member - Cannot book services (read-only access to marketplace)

---

## 📖 User Stories (High-Level)

**Main scenarios this Epic will enable:**

**US-MVP1-003: Book Service from Catalog**
- **As a** Family Admin or Council Member
- **I want to** select a specific service from a consultant's catalog and submit a booking request with optional notes
- **So that** I can initiate an engagement with clear service expectations

**US-MVP1-004: Understand Module Access Requirements**
- **As a** Family Admin
- **I want to** see which family modules the consultant will access before confirming my booking
- **So that** I can make an informed decision about data access

---

## 🔗 Dependencies

**Upstream Dependencies:**
- EPIC-011-MVP1 (Marketplace Discovery) - Must be able to view consultant profiles and services
- Consultant service catalog populated with active services
- Module access requirements defined per service

**Downstream Impact:**
- EPIC-013-MVP1 (Request Review) - Consultant receives booking for review
- Service Request record created for tracking throughout lifecycle
- Triggers notification workflow

**Technical Dependencies:**
- Service Request data model and storage
- Email notification system
- Contact information exchange mechanism

---

## 📐 Design & UX

**Figma Links:**
- [To be created] Service Detail Page
- [To be created] Booking Form
- [To be created] Booking Confirmation Screen

**UX Notes:**

**User Flow - Direct Service Booking:**
1. Family Admin/Council on consultant profile page
2. Views consultant's service catalog (list of services)
3. Clicks on specific service → Service detail page opens
4. Service detail page shows:
   - Service name and description
   - Fixed price
   - Estimated duration/timeline
   - Deliverables list
   - Required module access (e.g., "This consultant will VIEW: Constitution, Meetings")
5. Clicks "Book This Service" button
6. Booking form modal/page appears:
   - Service summary (name, price, consultant)
   - **Additional Notes** field (optional):
     - Placeholder: "Share any specific requirements or preferred timeline..."
     - Multi-line text area (max 500 characters)
   - **Module Access Acknowledgment:**
     - Checkbox: "I understand this consultant will have VIEW access to: [Constitution, Meetings]"
     - Warning icon with text: "Consultant will be able to view data in these modules"
7. Fills optional notes (or leaves blank)
8. Checks acknowledgment checkbox (required)
9. Clicks "Confirm Booking"
10. Confirmation screen:
    - "Booking sent to [Consultant Name]!"
    - "They will review and respond within 48 hours"
    - "You will receive email when consultant confirms"
    - "Open Chat with Consultant" button (chat automatically created - see EPIC-011-V2)
11. Redirects to Service Request detail page (status: "Pending Consultant Confirmation")

**Key UI Elements:**
- **Service Detail Card:** Clean layout with price, description, deliverables, access requirements
- **"Book This Service" CTA:** Primary button, prominent placement
- **Booking Form:** Modal or dedicated page, clear structure
- **Additional Notes Field:** Optional, expandable text area
- **Access Warning:** Yellow/orange badge with clear wording
- **Acknowledgment Checkbox:** Required before booking enabled
- **Confirmation Screen:** Reassuring message with next steps

**Error Handling:**
- If consultant has no active services: "No services available" message
- If user not Admin/Council: "Only Admins and Council members can book services"
- If acknowledgment not checked: Disable "Confirm Booking" button
- If booking fails: Error message with retry option

---

## 🔔 Notifications (if applicable)

**Does this Epic involve user notifications?** Yes

| Trigger | Recipient | Format | Description |
|---------|-----------|--------|-------------|
| Family confirms booking | Consultant | Email + In-App | "New service request from Family [Name] - Please review and confirm. Open chat to discuss details." |
| Family confirms booking | Family Admin/Council | Email + In-App | "Booking sent to Consultant [Name] - They will review and respond within 48 hours. Chat is now available." |
| Service Request chat created | Family Admin + Consultant | In-App | "Chat created for [Service Name] - You can now discuss service details" (see EPIC-011-V2) |

**Notification Configuration Notes:**
- Default: All booking notifications enabled (cannot be disabled)
- Email sent immediately upon booking confirmation
- Email contains link to Service Request detail page with access to chat
- In-app notifications for chat availability (EPIC-011-V2)
- Push notifications for chat messages (handled by EPIC-011-V2)

---

## 🧮 Business Rules

**Booking Authorization:**
1. Only Family Admin and Family Council members can initiate bookings
2. Family Members (standard role) can view marketplace but cannot book
3. Booking requires active family subscription

**Service Selection:**
1. Only "Fixed Price" services can be booked directly in MVP1
2. "Hourly Rate" or "Custom Quote" services require proposal workflow (out of MVP1 scope)
3. Only "Active" services in consultant's catalog are bookable
4. One service per booking (no bundle selection in MVP1)

**Service Request Creation:**
1. Booking creates Service Request with:
   - Status: "Pending Consultant Confirmation"
   - Original service ID stored
   - Family's additional notes captured
   - Total amount = service price (can be updated if consultant adds services)
   - Timestamp: booked_at
2. Service Request ID format: `SR-[YYYYMMDD]-[FAMILY_ID]-[SEQUENCE]`
   - Example: `SR-20251027-F123-001`

**Module Access:**
1. Access requirements defined per service (stored in consultant_services.required_modules)
2. Default access level: VIEW only (no edit permissions in MVP1)
3. Family must acknowledge access before booking
4. Access NOT provisioned at booking time (only after Final Approval - EPIC-015-MVP1)
5. Access requirements displayed clearly in booking form

**Additional Notes:**
1. Optional field (can be blank)
2. Max 500 characters
3. Visible to consultant during review
4. Stored in Service Request for reference throughout lifecycle

**Chat Integration:**
1. Service Request chat automatically created upon booking (see EPIC-011-V2)
2. Chat accessible from Service Request detail page
3. Enables in-platform communication between Family Admin and Consultant

---

## 📝 Notes

**MVP1 Simplifications:**
- No calendar integration (family can mention preferred dates in notes)
- No availability checking (consultant can decline if unavailable)
- No payment at booking (100% postpayment model)
- No multi-service booking (one at a time)
- No custom service requests (only pre-defined catalog services)

**Communication Model:**
- In-platform chat automatically created upon booking (EPIC-011-V2)
- Chat accessible from Service Request detail page
- Real-time messaging between Family Admin and Consultant
- Parties can discuss scope and consultant can adjust proposal during Review (EPIC-013-MVP1)

**Future Enhancements (Post-MVP1):**
- General chat for pre-booking questions (base EPIC-011)
- Calendar integration for date/time selection
- Multi-service booking (bundle selection)
- Custom service request form
- Prepayment option for certain services
- Booking templates for repeat engagements

**Assumptions:**
- Fixed-price services have clear enough descriptions for families to book without extensive pre-discussion
- In-platform chat sufficient for coordination (EPIC-011-V2)
- Consultant review step (48h) acceptable delay for families
- Families comfortable booking without seeing consultant's real-time availability

**Edge Cases:**
- Consultant never responds → Auto-decline after 48 hours (handled in EPIC-013-MVP1)
- Family books multiple services from same consultant → Creates separate Service Requests
- Service price changes after booking → Price locked at booking time (stored in service_request_items)
- Consultant unavailable → Can decline with reason during Review

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-27
**Epic Status:** Draft
**Story Points Estimate:** 5 SP (reduced from original scope)
