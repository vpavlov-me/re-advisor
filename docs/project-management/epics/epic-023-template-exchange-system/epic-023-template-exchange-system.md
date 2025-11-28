# EPIC-[TBD]: Template Exchange System - Technical Architecture

> **Note:** This Technical Epic defines the system architecture and logic for template exchange functionality described in EPIC-022

---

## 📋 Basic Information

**Issue Type:** Technical Epic
**Project:** FG
**Epic Name:** Template Exchange System - Technical Architecture
**Summary:** Define high-level system architecture and business logic for enabling External Advisors to share Constitution templates, Learning Paths, and Resource links with families through one-way content copying with creator linkage and permission-based cross-portal access
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

A system architecture enabling External Advisors to share Constitution templates, Learning Paths, and Resource links with families through one-way content copying. The system will create independent copies of shared content, maintain creator linkage for permission filtering, and support secure cross-portal access for Advisor editing on Family Portal.

**Technical Success Criteria:**
- All template types support one-way sharing workflow (copy-based, not live sync)
- Shared content is independent from Advisor's originals (can be modified separately)
- Creator markers enable permission-based content filtering (edit linked)
- Cross-portal access implemented with proper authentication and authorization
- Edit locking prevents concurrent Constitution editing
- System maintains data integrity during copy operations
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
4. System creates copy of template content
5. System links copied content to Advisor (creator marker)
6. Template is shared (status: "shared")

**On Family Portal:**
7. Shared Constitution template appears in Constitution section (marked as inactive template)
8. System stores metadata: created_by = [Advisor ID], is_shared_template = true
9. Connection to Advisor's original template is severed (independent copy)

**Cross-Portal Editing (Advisor on Family Portal):**
10. Advisor receives permission: edit (linked) OR full access
11. Advisor logs into Family Portal
12. Advisor navigates to "Manage Constitution" section
13. Advisor sees only templates they created (filtered by creator marker)
14. System locks template when Advisor opens for editing (only one editor at a time)
15. Advisor makes changes to template sections
16. Advisor saves changes
17. System unlocks template

**Activation on Family Portal:**
18. Family Council reviews shared template
19. Family Council clicks "Activate as Constitution"
20. System makes this template active Constitution
21. Previously active Constitution becomes inactive template
22. Advisor's edit permission is revoked (no longer can edit)

**Important: No Impact on Advisor Portal**
- Advisor's original template on Advisor Portal remains unchanged
- Advisor can modify or delete their original template without affecting family's copy
- No status synchronization back to Advisor Portal
- The shared template is now completely owned by the family

---

### Learning Path Exchange

**On Advisor Portal:**
1. External Advisor creates or selects Learning Path
2. Advisor clicks "Share with Family"
3. Advisor selects target family
4. System creates copy of Learning Path content
5. System links copied content to Advisor (creator marker)
6. Learning Path is shared (status: "shared")

**On Family Portal:**
7. Shared Learning Path appears in Learning Paths subsection of Education section
8. System stores metadata: created_by = [Advisor ID], is_shared_learning_path = true
9. Connection to Advisor's original Learning Path is severed (independent copy)

**Assignment Flow (Permission-Based):**

**Scenario A - Advisor has assignment permission:**
10a. Advisor (on Advisor Portal or Family Portal depending on permission scope) assigns Learning Path to specific Family Member(s)
11a. Status changes to "pending" for each assigned member

**Scenario B - Only Family Council has assignment permission:**
10b. Family Council (on Family Portal) assigns Learning Path to Family Member(s)
11b. Status changes to "pending" for each assigned member

**Member Progress:**
12. Family Member sees assigned Learning Path on their portal
13. Member clicks "Start Learning Path" → status: "in_progress"
14. Member completes modules and lessons
15. Member marks Learning Path as complete → status: "finished"

**Important: No Status Synchronization**
- Advisor does NOT see real-time status updates
- Family's Learning Path progress is independent from Advisor's portal
- Each Family Member has their own status tracking

---

### Resource Link Exchange

**On Advisor Portal:**
1. External Advisor creates Resource link
2. Advisor enters: title, URL, description, category
3. Advisor clicks "Share with Family"
4. Advisor selects target family
5. System creates copy of Resource content
6. System links copied content to Advisor (creator marker)
7. Resource is shared (status: "shared" - permanent)

**On Family Portal:**
8. Shared Resource appears in Featured Resources subsection of Education section
9. System stores metadata: created_by = [Advisor ID], is_shared_resource = true
10. Connection to Advisor's original Resource is severed (independent copy)
11. Family members can access Resource link
12. No further status changes (simple display)

**Important: No Impact on Advisor Portal**
- Advisor's original Resource on Advisor Portal remains unchanged
- Advisor can modify or delete their original Resource without affecting family's copy

---

## 🔗 Dependencies

**Parent Epic:**
- FG-EPIC-022: Template Exchange System (defines product functionality, this epic describes system behavior)

---

---



## ⚖️ Business Rules

**Constitution Templates:**
1. When Advisor shares template, system creates independent copy for the family
2. Shared copy is linked to Advisor via creator marker (for permission filtering)
3. Advisor's original template and family's copy are completely independent after sharing
4. Advisor can edit family's shared template only with edit (linked) or full access permission
5. Advisor sees only templates they created when filtering by edit (linked) permission
6. Only one advisor can edit Constitution template at a time (edit locking)
7. Only Family Council can activate shared Constitution template
8. When template is activated, it becomes active Constitution
9. Previously active Constitution automatically becomes inactive template
10. Only one active Constitution per family at any time
11. Advisor's edit permission is revoked when family activates template

**Learning Paths:**
1. When Advisor shares Learning Path, system creates independent copy for the family
2. Shared copy is linked to Advisor via creator marker
3. Advisor's original Learning Path and family's copy are completely independent after sharing
4. Same Learning Path can be assigned to multiple Family Members
5. Each Family Member has independent status for the same Learning Path
6. Status progression: pending → in_progress → finished (no reversals)
7. Assignment capability depends on Advisor's permission level
8. Only assigned Family Member can update their own progress
9. No status synchronization back to Advisor Portal

**Resources:**
1. When Advisor shares Resource, system creates independent copy for the family
2. Shared copy is linked to Advisor via creator marker
3. Advisor's original Resource and family's copy are completely independent after sharing
4. Resources are simple links (no file uploads)
5. Once shared, Resource status never changes (permanent "shared" state)
6. All family members can access shared Resources
7. Resources appear in Education section on Family Portal

**General Cross-Portal Rules:**
1. All shared content is copied, not linked (no live sync)
2. Advisor can modify/delete their originals without affecting family's copies
3. Family can modify/delete their copies without affecting Advisor's originals
4. Advisor can only see/edit templates they created (filtered by creator marker)
5. Family Council can see all templates shared with their family
6. Shared templates cannot be deleted by Advisor from family's portal
7. No real-time status synchronization between Family Portal and Advisor Portal

---

## 📝 Notes

**Key Assumptions:**
- Advisor Portal and Family Portal are separate applications
- Sharing creates independent copies, not live links
- Cross-portal access is supported for Constitution editing via permissions
- Edit locking prevents concurrent Constitution editing
- Creator markers enable filtering content by "who created it"

**Constraints:**
- Only links allowed for Resources (no file uploads)
- Constitution template activation is irreversible
- Learning Path status changes are sequential only
- Only one active Constitution per family
- No bidirectional synchronization between portals
- Shared content is fully independent after copy

**Out of Scope:**
- UI/UX design details
- Specific technology choices
- Database schema details
- API endpoint specifications
- Deployment and infrastructure
- Notifications system
- Real-time status synchronization

---

**Epic Owner:** [Technical Product Manager]  
**Created:** [Date]  
**Last Updated:** 2025-11-27