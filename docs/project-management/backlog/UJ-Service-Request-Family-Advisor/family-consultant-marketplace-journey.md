---
doc_id: "DOC-JRN-FAM-002"
title: "Family Marketplace Service Booking & Engagement Journey"
type: "user-journey"
category: "planning"
audience: "product-manager|business-analyst|stakeholder"
complexity: "high"
created: "2025-10-24"
updated: "2025-10-24"
version: "1.0.0"
status: "draft"
tags: ["user-journey", "marketplace", "service-booking", "consultant", "family", "payment"]
related: ["DOC-JRN-ADV-001", "EPIC-007", "EPIC-004"]
owner: "Anastasia Bronina"
maintainer: ""
reviewer: ""
priority: "critical"
business_value: "Enable families to discover, engage, and work with qualified consultants through structured service engagements with integrated payments and access management"
user_impact: "Families gain streamlined access to vetted consultants with transparent pricing, secure payments, and controlled data access throughout service lifecycle"
review_cycle: "quarterly"
next_review: "2026-01-24"
---

# JRN-FAM-002 Family Marketplace Service Booking & Engagement Journey

> **Journey Purpose**: Enable families to discover consultants in the marketplace, engage their services through structured proposals or direct bookings, manage service delivery with appropriate access controls, and complete payment transactions seamlessly.

---

## 🚨 CRITICAL: Business Requirements Only

**This document describes WHAT the system should do, NOT HOW to implement it.**

**DO NOT include technical implementation details:**
- ❌ API endpoints, HTTP methods, request/response formats
- ❌ Database table names, column names, SQL queries
- ❌ Technology stack specifics (PostgreSQL, Redis, S3, etc.)
- ❌ Port numbers, service names, infrastructure details
- ❌ Authentication tokens (JWT), claims, middleware
- ❌ Code-level details (classes, functions, algorithms)

**DO include business requirements:**
- ✅ User needs and pain points
- ✅ Business rules and logic (WHAT rules, not HOW enforced)
- ✅ Data visibility and access rules (WHO can see WHAT)
- ✅ Integration needs (WHAT systems, not HOW they connect)
- ✅ User experience flow and decisions
- ✅ Success metrics and KPIs

---

## 📋 Context

### Goal
Enable families to efficiently discover, evaluate, engage, and work with marketplace consultants through a structured service engagement process with integrated communication, access management, and payment processing.

**Business Objectives:**
- Create trusted marketplace for family-consultant engagements with 80% successful service completions
- Reduce friction in consultant discovery and booking process to under 10 minutes
- Ensure secure, controlled access to family data during service engagements
- Enable transparent pricing and payment processing with near-zero disputes
- Build repeat engagement patterns with 40% of families rehiring consultants

**User Value:**
- **For Families**: Access to vetted consultants, transparent pricing, secure payments, controlled data access, quality assurance through reviews
- **For Consultants**: Structured engagement process, automated payment collection, clear scope definition, professional communication channel
- **For Platform**: Transaction revenue, ecosystem growth, trust building, reduced support burden through automation

### Primary Personas

- **Admin/Family Council Member** - Primary decision maker for engaging consultants
  - Responsible for family governance and external advisor management
  - Needs to evaluate consultants and control access to family data
  - Budget authority for consultant services
  - Reference: `family-council-member-persona.md`

- **Consultant** - Service provider from marketplace
  - Offers specialized services through catalog
  - Needs clear engagement terms and payment assurance
  - Reference: `consultant-persona.md`

### Trigger(s)

**Primary Triggers:**
1. **Specific Need Identified**: Family identifies governance challenge requiring external expertise
2. **Proactive Improvement**: Family seeks to enhance governance practices
3. **Crisis/Urgent Situation**: Immediate need for mediation or conflict resolution
4. **Periodic Review**: Scheduled governance review requiring external perspective

**Discovery Channels:**
- Browse marketplace from Family Portal
- Search for specific expertise/modules
- View recommended consultants based on family needs
- Referral from another family (future feature)

### Success Criteria / KPIs

**User Experience Metrics:**
- Time to first booking: < 10 minutes from search to confirmation
- Proposal acceptance rate: > 60%
- Service completion rate: > 80%
- Payment dispute rate: < 2%
- Repeat engagement rate: > 40%

**Business Impact Metrics:**
- Average transaction value: Track growth over time
- Consultant utilization rate: Active consultants with bookings
- Family satisfaction score: > 4.5/5
- Time to payment: < 3 days after service completion

### Preconditions / Assumptions

**Family State:**
- Active family subscription with Admin or Family Council member logged in
- Payment method configured for family account
- At least basic family profile completed

**Consultant State:**
- Approved marketplace profile with published services
- Stripe Connect account verified and active
- At least one active service in catalog
- Available calendar slots configured

**System Capabilities:**
- Marketplace search and discovery operational
- Real-time chat system functional
- Payment processing through Stripe operational
- Access control system configured
- Notification system active

## 🗺️ Stage Map

### Stage 1: Discovery & Search
**Goal**: Family finds relevant consultants for their needs

**User Actions:**
- Admin/Council member navigates to "Find Consultant" page
- Browses consultant listings or uses search filters:
  - By expertise/module (Succession, Governance, etc.)
  - By service type (Workshop, Consultation, Mediation)
  - By price range
  - By availability
  - By ratings (when available)
- Views consultant profiles including:
  - Professional background and credentials
  - Service catalog with descriptions and pricing
  - Verification badges
  - Reviews/ratings (when available)
  - Available time slots

**System Responses:**
- Displays searchable/filterable consultant marketplace
- Shows only consultants with approved, active profiles
- Highlights verified consultants with badges
- Provides real-time availability indicators
- Displays clear pricing for each service

**Responsible Roles:**
- Admin/Family Council: Searches and evaluates consultants
- System: Provides search and filtering capabilities

---

### Stage 2: Initial Engagement
**Goal**: Family initiates contact with consultant

**User Actions:**

**Path A: Direct Service Booking**
- Selects specific service from consultant's catalog
- Reviews service details, deliverables, and terms
- Checks consultant's availability calendar
- Selects preferred time slot(s)
- Reviews pricing and cancellation policy
- Confirms booking request

**Path B: Chat Inquiry First**
- Clicks "Message Consultant" from profile
- Sends initial inquiry describing needs
- Engages in discussion about requirements
- Waits for consultant's response/proposal

**System Responses:**
- For direct booking: Creates service request with "Pending Consultant Confirmation" status
- For chat: Creates new conversation thread if none exists
- Sends notification to consultant about new inquiry/booking
- For direct booking: Automatically generates chat with booking details message

**Responsible Roles:**
- Admin/Family Council: Initiates engagement
- System: Routes communication and creates records

---

### Stage 3: Proposal & Negotiation (Chat-Initiated Path)
**Goal**: Consultant creates and family reviews service proposal

**User Actions (Consultant):**
- Reviews family inquiry in chat
- Creates service proposal including:
  - Selected services from catalog (can be multiple)
  - Custom parameters/scope if needed
  - Total pricing with any discounts
  - Payment terms (prepayment percentage, milestones)
  - Estimated timeline
  - Deliverables
  - Required access levels to family modules
  - Proposal expiration date
- Sends proposal to family via chat

**User Actions (Family):**
- Receives proposal notification
- Reviews proposal details in chat or dedicated proposal view
- Can request modifications via chat
- Makes decision to accept or decline

**System Responses:**
- Displays proposal with clear terms and pricing
- Shows proposal status (Draft, Sent, Under Review, Accepted, Declined, Expired)
- Tracks proposal expiration
- Maintains proposal history in chat

**Responsible Roles:**
- Consultant: Creates and adjusts proposal
- Admin/Family Council: Reviews and decides on proposal

---

### Stage 4: Access Configuration & Acceptance
**Goal**: Family configures consultant access and confirms engagement

**User Actions (Family):**
- Reviews proposed access requirements from consultant
- System displays warning about data access implications
- Configures consultant permissions:
  - Selects modules to grant access
  - Sets permission levels (View, View+Modify related to service)
  - Can adjust from consultant's requested levels
  - Sets access expiration (tied to service duration)
- Optionally grants access before accepting (for preparation)
- Accepts proposal/booking

**System Responses:**
- Creates FamilyAdvisorAssociation with "Active" status
- Assigns consultant role with configured permissions
- Generates initial invoice if prepayment required
- Updates service request to "Awaiting Payment" or "Ready to Start"
- Sends confirmation to both parties
- Creates audit log entry for access grant

**Responsible Roles:**
- Admin/Family Council: Configures access and accepts
- System: Provisions access and creates associations

---

### Stage 5: Payment Processing
**Goal**: Process required payments to enable service delivery

**User Actions (Family):**
- Views invoice in family portal (if prepayment required)
- Reviews payment details and service summary
- Processes payment through Stripe checkout
- Receives payment confirmation

**User Actions (Consultant):**
- Monitors payment status in consultant portal
- Receives notification when payment processed

**System Responses:**
- Generates Stripe invoice with service details
- Processes payment securely through Stripe
- Updates service request status upon payment:
  - If prepaid: "In Progress"
  - If postpaid: "In Progress" immediately after acceptance
- Sends payment confirmations to both parties
- Records transaction in audit log

**Business Rules:**
- Prepayment percentage defined by consultant (0-100%)
- Payment processing handled entirely by Stripe
- 3-day grace period for invoice payment (best practice)
- Automatic reminders at 1 and 2 days if unpaid

**Responsible Roles:**
- Family: Processes payment
- Consultant: Monitors status
- Stripe: Handles payment processing

---

### Stage 6: Service Delivery
**Goal**: Consultant delivers service with appropriate system access

**User Actions (Consultant):**
- Accesses family portal with granted permissions
- Performs service activities:
  - If has edit access: Creates/modifies content in permitted modules
  - Reviews family information within scope
  - Communicates via chat for clarifications
  - Shares external resources via links (SharePoint, OneDrive, etc.)
  - Uploads deliverables to service request
- Tracks time and progress
- Can request service amendments if scope changes

**User Actions (Family):**
- Monitors consultant activity (audit log visible)
- Responds to consultant questions via chat
- Reviews work in progress
- Can adjust access permissions if needed

**System Responses:**
- Enforces permission boundaries on all consultant actions
- Logs all consultant activities in audit trail
- Prevents direct file uploads (only external links allowed)
- Maintains chat history with context
- Shows service progress status

**Amendment Process (if scope changes):**
- Consultant proposes amendment in chat
- Includes additional services, timeline changes, or pricing adjustments
- Family reviews and accepts/declines
- System updates service request without creating new proposal
- Adjusts invoicing accordingly

**Responsible Roles:**
- Consultant: Delivers service
- Family: Monitors and collaborates
- System: Enforces access controls

---

### Stage 7: Service Completion
**Goal**: Complete service engagement and finalize payments

**User Actions (Consultant):**
- Marks service as "Delivered"
- Provides completion summary
- Uploads final deliverables (as links)
- Confirms final billing amount

**User Actions (Family):**
- Reviews completed work
- Confirms service completion
- Processes final payment if postpaid

**System Responses:**
- Updates service request to "Delivered" then "Completed"
- Generates final invoice if payment due
- **Immediately transitions consultant access to view-only mode**
- Creates frozen snapshot of consultant's work
- Sends completion confirmations
- Prompts for review/rating (future feature)

**Access Transition Rules:**
- Upon completion: Consultant permissions automatically downgrade to view-only
- Consultant retains access to:
  - Service request details and history
  - Chat conversation with family
  - Materials they created during service period (view-only)
- Family can completely revoke access or extend permissions

**Responsible Roles:**
- Consultant: Completes delivery
- Family: Confirms completion
- System: Manages access transition

---

### Stage 8: Post-Engagement
**Goal**: Maintain relationship for potential future engagements

**User Actions (Family):**
- Can extend consultant access without new service
- Can completely revoke access
- Can initiate new service request with same consultant (simplified flow)
- Provides review/rating (when feature available)

**User Actions (Consultant):**
- Maintains view-only access to past work
- Can propose new services via chat
- Can request access extension for follow-up

**System Responses:**
- Preserves service history and documentation
- Maintains chat channel for future communication
- Enables quick re-engagement with pre-filled information
- Tracks relationship for recommendation algorithm

**Responsible Roles:**
- Both parties: Maintain professional relationship
- System: Preserves history and enables re-engagement

---

## 🎯 Conceptual System Requirements

### Integration Needs

**Communication:**
- Real-time chat system with WebSocket support
- Notification system for all key events
- File attachment support in chat (with security scanning)

**Payment Processing:**
- Stripe Connect for consultant payments
- Stripe Invoicing for invoice generation
- Payment status webhooks from Stripe
- Support for refunds and disputes

**Calendar & Scheduling:**
- Internal calendar system for consultant availability
- External calendar sync (Google, Outlook)
- Time zone handling for global users
- Conflict prevention for double-booking

**Access Management:**
- Dynamic permission provisioning
- Audit logging for all access events
- Automatic permission downgrade on completion
- Time-bound access control

### Data Exchange Requirements

**Import Capabilities:**
- Calendar availability from external systems
- Consultant payment information from Stripe

**Export Capabilities:**
- Service history reports
- Invoice records for accounting
- Audit logs for compliance
- Chat transcripts for documentation

## 🔒 Multi-Tenancy & Data Isolation

### Family Data Isolation (CRITICAL)
- Service requests belong to specific family and are isolated by family_id
- Chat conversations are private between family and consultant
- Consultant can only access data from families they're associated with
- Permissions are family-specific (same consultant may have different access levels with different families)

### What This Means for the Journey:
- Marketplace shows all approved consultants (global)
- Once engaged, consultant only sees specific family's data
- Service history is family-specific
- Payment records are isolated per family

## 🔑 Permissions & Access Control

### Required Permissions by Stage

**Discovery & Search:**
- Admin or Family Council role required
- Read access to marketplace (all authenticated family members)
- Only Admin/Council can initiate bookings

**Service Engagement:**
- Admin/Council can accept proposals and configure access
- Consultant receives permissions based on service type:
  - Governance consulting: Constitution, Meetings, Decisions modules
  - Succession planning: Succession, Education modules
  - Mediation: Conflicts, Communication modules
- Default: View + Modify (related to service only)

**Post-Completion:**
- Automatic downgrade to View (related only)
- Admin/Council can extend or revoke entirely

## 📋 Business Rules & Controls

### Proposal & Pricing Rules
- Proposals expire after 30 days (configurable by consultant)
- Consultants can offer discounts up to 100% (free services)
- Multiple services can be bundled in single proposal
- Amendments don't create new proposals, update existing

### Cancellation & Refund Policy
- Consultant sets cancellation policy per service
- Standard options: 24h, 48h, 7 days, or "No refunds"
- Refunds processed through Stripe based on policy
- Partial refunds possible for partially completed services
- Platform doesn't intervene in disputes (Stripe handles)

### Payment Rules
- Prepayment: 0-100% as set by consultant
- Grace period: 3 days for invoice payment
- Late payment: Service suspended, consultant notified
- Failed payment after grace period: Service cancelled
- No partial payments or installments supported

### Access Control Rules
- Minimum access: Dashboard view (always granted)
- Maximum access: All modules except Billing/Extensions
- Access expires with service completion (immediate)
- Family can grant access before accepting proposal
- Audit log tracks all permission changes

### Communication Rules
- Chat history preserved indefinitely
- No direct file uploads (only external links)
- Links not validated for security (family responsibility)
- Consultants can message only associated families

## 🚨 Edge Cases & Risks

### Edge Cases
- **Consultant unavailable after booking**: Auto-cancel after 48h no response, full refund
- **Family doesn't confirm completion**: After 30 days, auto-complete with notification
- **Payment fails after service started**: Service suspended, access frozen
- **Proposal expires during negotiation**: Consultant must create new proposal
- **Multiple consultants for same service**: Supported, separate service requests
- **Access extension during service**: Family can modify permissions anytime

### Operational Risks

**Payment Risks:**
- Chargebacks: Handled by Stripe dispute process
- Currency mismatch: All transactions in USD only
- International payments: May have delays or fees

**Service Quality Risks:**
- Poor consultant performance: Review system (future) and ability to terminate
- Scope creep: Amendment process for changes
- Incomplete delivery: Completion requires family confirmation

**Security Risks:**
- Malicious links shared: Family responsibility to verify
- Over-permissioned access: Audit logs and immediate revocation available
- Data leakage: View-only mode after completion prevents ongoing access

---

**Document Version:** 1.0.0
**Last Updated:** 2025-10-24
**Journey Type:** Family Service Engagement