# EPIC-018-MVP1: Service Delivery (Consultant)

> **Note:** This Epic is part of MVP1 Service Request Journey

---

## 📋 Basic Information

**Issue Type:** Epic
**Project:** FG
**Epic Name:** Service Delivery for Consultants (MVP1)
**Summary:** Enable consultants to access family data, upload deliverable links, and mark service as complete
**Parent User Journey:** MVP1 Service Request Journey
**Priority:** Critical
**Epic Link:** FG-EPIC-018-MVP1

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Enable consultants to access approved family modules in VIEW mode, perform their work externally, share deliverables via external links, and mark the service as complete when finished.

**User-facing value:**
- Consultants can view family data needed for service delivery
- Consultants can upload deliverable links as work progresses
- Consultants can communicate with family via email
- Clear completion workflow to notify family

**Business value:**
- Minimal platform integration reduces development complexity
- External deliverables avoid file storage/security concerns
- VIEW-only access reduces data security risks
- Email communication avoids building chat system
- Completion notification triggers payment workflow

**Scope boundaries:**
- **Included:**
  - VIEW-only access to approved family modules
  - Deliverable links upload interface
  - Mark service complete button
  - Email communication (outside platform)
  - Service Request status tracking

- **NOT included:**
  - EDIT permissions to family data
  - File upload to platform (only external links)
  - In-platform chat
  - Progress tracking/milestones
  - Time tracking
  - Service amendments during delivery

---

## 👥 Target Users

**Primary Personas:**
- Consultant - Delivers services and needs controlled access to family data

---

## 📖 User Stories (High-Level)

**US-MVP1-012: Access Family Portal**
- **As a** Consultant
- **I want to** access approved family modules in view-only mode after family approval
- **So that** I can review the necessary information to deliver my service

**US-MVP1-013: Upload Deliverable Links**
- **As a** Consultant
- **I want to** add external links to deliverables as I complete work
- **So that** the family can access my work outputs

**US-MVP1-014: Mark Service Complete**
- **As a** Consultant
- **I want to** mark the service as complete with final deliverable links
- **So that** the family knows work is done and can review results

---

## 🔗 Dependencies

**Upstream:** EPIC-015-MVP1 (Final Approval) - Access provisioned
**Downstream:** EPIC-018-MVP1 (Completion & Payment) - Triggers payment
**Technical:** Family Portal access control, deliverables storage

---

## 📐 Design & UX

**User Flow:**
1. Consultant logs into platform after family approval
2. Sees notification: "You have access to Family [Name]"
3. Can navigate to family modules (VIEW only)
4. Works externally (prepares documents in Google Docs, etc.)
5. Returns to Service Request page
6. Adds deliverable links:
   - Title: "Family Constitution Draft"
   - URL: "https://docs.google.com/..."
   - Click "Add Deliverable"
7. Can add multiple deliverables over time
8. When finished:
   - Clicks "Mark as Complete"
   - Confirmation: "Are you sure? Family will be notified to review and pay."
   - Confirms
9. Status → "Delivered"
10. Email sent to family

---

## 🔔 Notifications

| Trigger | Recipient | Format | Description |
|---------|-----------|--------|-------------|
| Service marked complete | Family Admin/Council | Email | "Service completed by consultant - Please review and pay" |

---

## 🧮 Business Rules

1. VIEW-only access to approved modules (no editing)
2. Deliverables must be external links (no file upload)
3. Platform doesn't validate links (family responsibility)
4. Can add deliverables anytime while "In Progress"
5. Marking complete moves status to "Delivered"
6. Cannot edit after marking complete

---

## 📝 Notes

**MVP1 Simplifications:**
- No EDIT access
- No file uploads
- No progress tracking
- No time logging
- No amendments

**Future Enhancements:**
- EDIT permissions for certain services
- Platform file storage
- Progress milestones
- Service amendments

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-27
**Epic Status:** Draft
**Story Points Estimate:** 5 SP
