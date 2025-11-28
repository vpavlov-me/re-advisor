# EPIC-[TBD]: Template Exchange System - Technical Architecture

> **Note:** This Technical Epic defines the system architecture and logic for template exchange functionality described in EPIC-022

---

## 📋 Basic Information

**Issue Type:** Technical Epic
**Project:** FG
**Epic Name:** Template Exchange System - Technical Architecture
**Summary:** Define high-level system architecture, data models, service interactions, and business logic for enabling External Advisors to share Constitution templates, Learning Paths, and Resource links with families
**Parent Epic:** FG-EPIC-022
**Parent User Journey:** [To be determined]
**Parent Initiative:** N/A
**Priority:** Critical
**Target Release:** Q1 2026
**Epic Link:** FG-EPIC-[TBD]
**Technical Owners:** [Backend Team Lead], [Frontend Team Lead]

---

## 🎯 Epic Goal

**What will this Epic deliver?**

A comprehensive technical architecture enabling bidirectional template exchange between External Advisors and Family Council members across three template types (Constitution, Learning Paths, Resources). The system will provide secure cross-portal access, real-time status tracking, and maintain data consistency across Family Portal and Advisor Portal.

**Technical Success Criteria:**
- All template types support sharing workflow with proper state management
- Cross-portal access implemented with proper authentication and authorization
- Real-time status synchronization between portals (< 2 second latency)
- Template versioning and conflict prevention mechanisms in place
- System maintains data consistency during concurrent operations
- API response time < 500ms for 95th percentile

---

## 👥 Target Users

**Primary:**
- Product Team (understanding system behavior)
- Development Team (implementing the flows)

**Secondary:**
- QA Team (testing cross-portal flows)
- Technical Product Manager (planning and coordination)

---

## 🔄 Template Exchange Process Flow

### Constitution Template Exchange

**On Advisor Portal:**
1. External Advisor creates Constitution template
2. Advisor clicks "Share with Family" button
3. Advisor selects target family from their client list
4. Template is shared (status: "shared")

**On Family Portal:**
5. Shared Constitution template appears in Constitution section (marked as inactive template)
6. Family Council receives notification about new shared template

**Cross-Portal Editing (Advisor on Family Portal):**
7. Advisor gets access link to edit template on Family Portal
8. Advisor opens template for editing on Family Portal
9. System locks template (only one editor at a time)
10. Advisor makes changes to template sections
11. Advisor saves changes
12. System unlocks template

**Back on Family Portal:**
13. Family Council reviews updated template
14. Family Council clicks "Activate as Constitution"
15. System makes this template active Constitution
16. Previously active Constitution becomes inactive template
17. Advisor's edit access to this template is revoked

**On Advisor Portal:**
18. Advisor sees template status changed to "activated"

---

### Learning Path Exchange

**On Advisor Portal:**
1. External Advisor creates or selects Learning Path
2. Advisor clicks "Share with Family"
3. Advisor selects target family
4. Learning Path is shared (status: "shared")

**On Family Portal:**
5. Shared Learning Path appears in Learning section
6. Family Council receives notification

**Assignment Flow:**

**Option A - Advisor assigns:**
7a. Advisor (on Advisor Portal) assigns Learning Path to specific Family Member(s)
8a. Status changes to "pending" for each assigned member

**Option B - Family Council assigns:**
7b. Family Council (on Family Portal) assigns Learning Path to Family Member(s)
8b. Status changes to "pending" for each assigned member

**Member Progress:**
9. Family Member sees assigned Learning Path on their portal
10. Member clicks "Start Learning Path" → status: "in_progress"
11. Member completes modules and lessons
12. Member marks Learning Path as complete → status: "finished"

**On Advisor Portal:**
13. Advisor sees real-time status updates for each assigned member:
    - Member A: in_progress
    - Member B: finished
    - Member C: pending

---

### Resource Link Exchange

**On Advisor Portal:**
1. External Advisor creates Resource link
2. Advisor enters: title, URL, description, category
3. Advisor clicks "Share with Family"
4. Advisor selects target family
5. Resource is shared (status: "shared" - permanent)

**On Family Portal:**
6. Shared Resource appears in Knowledge Center
7. Family members can access Resource link
8. No further status changes (simple display)

**On Advisor Portal:**
9. Advisor sees confirmation: "Shared with [Family Name]"

---

## 🔗 Dependencies

**Parent Epic:**
- FG-EPIC-022: Template Exchange System (defines product functionality, this epic describes system behavior)

**Blocking:**
- This technical epic must be completed before EPIC-022 user stories can be implemented

---

---



## ⚖️ Business Rules

**Constitution Templates:**
1. Only one advisor can edit Constitution template at a time (edit locking)
2. Only Family Council can activate shared Constitution template
3. When template is activated, it becomes active Constitution
4. Previously active Constitution automatically becomes inactive template
5. Only one active Constitution per family at any time
6. Advisor edit access automatically revoked when family activates template

**Learning Paths:**
1. Same Learning Path can be assigned to multiple Family Members
2. Each Family Member has independent status for the same Learning Path
3. Status progression: pending → in_progress → finished (no reversals)
4. Both Advisor AND Family Council can assign Learning Paths to members
5. Only assigned Family Member can update their own progress

**Resources:**
1. Resources are simple links (no file uploads)
2. Once shared, Resource status never changes (permanent "shared" state)
3. All family members can access shared Resources

**General:**
1. Advisor can only see/edit templates they shared
2. Family Council can see all templates shared with their family
3. Shared templates cannot be deleted by Advisor after sharing
4. Real-time status sync between portals (Advisor sees family activity)

---

## 📝 Notes

**Key Assumptions:**
- Advisor Portal and Family Portal are separate applications
- Cross-portal access is supported for Constitution editing
- Real-time status synchronization is required between portals
- Edit locking prevents concurrent Constitution editing

**Constraints:**
- Only links allowed for Resources (no file uploads)
- Constitution template activation is irreversible
- Learning Path status changes are sequential only
- Only one active Constitution per family

**Out of Scope:**
- UI/UX design details
- Specific technology choices
- Database schema details
- API endpoint specifications
- Deployment and infrastructure

---

**Epic Owner:** [Technical Product Manager]  
**Created:** [Date]  
**Last Updated:** 2025-11-25