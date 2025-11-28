# EPIC-019-MVP1: Service Monitoring (Family)

> **Note:** This Epic is part of MVP1 Service Request Journey

---

## 📋 Basic Information

**Issue Type:** Epic
**Project:** FG
**Epic Name:** Service Monitoring for Families (MVP1)
**Summary:** Enable families to track active service requests and view service history
**Parent User Journey:** MVP1 Service Request Journey
**Priority:** High
**Epic Link:** FG-EPIC-019-MVP1

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Enable families to monitor active consultant engagements and access historical records of past services.

**User-facing value:**
- Families can see all active service requests in one place
- Families can track service progress and status
- Families can view service history and past work
- Families can access deliverables from consultants

**Business value:**
- Reduces support inquiries about service status
- Provides transparency into consultant activity
- Enables data-driven decisions for future bookings
- Creates accountability for both parties

**Scope boundaries:**
- **Included:**
  - Service Request dashboard with status filtering
  - Service Request detail view
  - Deliverables list and access
  - Service history view
  - Basic status indicators

- **NOT included:**
  - Real-time progress tracking
  - Detailed activity logs
  - Consultant performance metrics
  - Spending analytics
  - Comparison between services

---

## 👥 Target Users

**Primary Personas:**
- Family Admin - Monitors all engagements
- Family Council Member - Tracks relevant services

---

## 📖 User Stories (High-Level)

**US-MVP1-015: Track Service Progress**
- **As a** Family Admin or Council Member
- **I want to** view the status of active service requests
- **So that** I can monitor consultant progress and know when work is completed

**US-MVP1-016: View Service History**
- **As a** Family Admin
- **I want to** see a history of all past service requests with details
- **So that** I can reference previous consultant work and track spending

---

## 🔗 Dependencies

**Upstream:** All previous EPICs (tracking spans entire lifecycle)
**Downstream:** None (read-only view)
**Technical:** Service Request queries, filtering, display

---

## 📐 Design & UX

**User Flow:**
1. Family navigates to "Services" section
2. Sees dashboard with Service Request cards
3. Cards grouped by status:
   - Active (In Progress, Delivered)
   - Pending (Awaiting Confirmation, Awaiting Approval)
   - Completed (Paid)
   - Cancelled/Declined
4. Each card shows:
   - Consultant name and photo
   - Service name
   - Status badge
   - Timeline (start date, deadline if any)
   - Payment status
   - "View Details" button
5. Can filter by:
   - Status
   - Consultant
   - Date range
6. Click card → Service Request detail page:
   - All service details
   - Deliverables list (with links)
   - Payment information
   - Activity timeline
   - **"Open Chat with Consultant" button** (EPIC-011-V2)

---

## 🔔 Notifications

No specific notifications for this Epic (passive monitoring)

---

## 🧮 Business Rules

1. All family members can view (read-only)
2. Only Admin/Council can view payment details
3. Service history preserved indefinitely
4. Deliverables accessible after completion
5. Cancelled requests remain visible

---

## 📝 Notes

**MVP1 Simplifications:**
- No real-time activity tracking
- No detailed analytics
- No performance metrics
- Simple list view only

**Future Enhancements:**
- Progress milestones
- Spending analytics
- Consultant performance ratings
- Service comparison tools

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-27
**Epic Status:** Draft
**Story Points Estimate:** 3 SP
