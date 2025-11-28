# EPIC-022: Template Exchange System (Advisor → Family)

> **Note:** This Epic enables External Advisors to share Constitution templates, Learning Paths, and Resources with families through one-way sharing mechanism

---

## 📋 Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** Template Exchange System (Advisor → Family)  
**Summary:** Enable External Advisors to share Constitution templates, Learning Paths, and Resource links with families, with specialized workflows for each content type  
**Parent User Journey:** [To be determined]  
**Parent Initiative:** N/A  
**Related Epics:** EPIC-017, EPIC-018, EPIC-019, EPIC-020, EPIC-021  
**Priority:** Critical  
**Target Release:** 30.11.2025  
**Epic Link:** FG-EPIC-022

---

## 🎯 Epic Goal

### What Will This Epic Deliver?

Enable External Advisors to share three types of content with families through the Family Portal:

1. **Constitution Templates** - Advisor shares template, edits it on Family Portal, Family Council activates as active Constitution
2. **Learning Paths** - Advisor shares Learning Path; assignment to Family Members can be done by either Advisor or Family Council; progress tracking (pending → in progress → finished) visible only on Family Portal
3. **Resource Links** - Simple one-way link sharing to Family Portal

### Business Value

**For Families:**
- Receive professional Constitution templates from hired advisors with direct advisor editing support
- Access advisor-curated Learning Paths with clear progress visibility
- Centralized access to advisor-shared resource links and professional materials

**For External Advisors:**
- Efficient knowledge transfer through template and resource sharing
- Direct Constitution template editing capability on Family Portal
- Professional service delivery through structured content sharing

**For ReFamily Platform:**
- Enhanced marketplace value through improved advisor-family collaboration tools
- Increased engagement with advisor-provided content
- Platform differentiation via sophisticated content sharing mechanism

### Scope Boundaries

**In Scope:**
- Constitution template sharing and activation workflow
- Advisor access to Family Portal for Constitution editing
- Learning Path sharing by Advisor
- Learning Path assignment by both Advisor and Family Council to Family Members
- Learning Path 3-status tracking system (pending → in progress → finished)
- Resource link one-way sharing
- Concurrent editing lock mechanism for Constitution templates
- Backend tracking of shared content to family relationships

**Out of Scope:**
- Bidirectional sharing (Family → Advisor)
- File uploads for Resources (links only)
- Learning Path editing or customization
- Constitution template versioning
- Advanced analytics beyond basic tracking

---

## 👥 Target Users

### Primary Users

**External Advisor**
- Professional advisor hired through ReFamily marketplace
- Shares Constitution templates, Learning Paths, and Resource links with families
- Accesses Family Portal to edit shared Constitution templates
- Provides structured guidance and professional materials

**Family Council Member**
- Family governance decision-maker
- Receives and reviews advisor-shared content
- Activates Constitution templates as active Constitution
- Assigns Learning Paths to Family Members
- Tracks Learning Path progress for family members
- Reviews advisor edits to Constitution templates

### Secondary Users

**Family Member**
- Participates in assigned Learning Paths
- Works through learning content
- Progress tracked automatically through status system
- Accesses shared Resource links

---

## 📖 User Stories

### Story 1: Constitution Template Sharing
**Module:** Constitution | **Priority:** Critical | **SP:** 5

**As an** External Advisor  
**I want to** share a Constitution template with a family from my Advisor Portal  
**So that** the template appears automatically on Family Portal as an inactive template, enabling the family to start their governance work with professional guidance

**Key Acceptance Criteria:**
- Advisor selects Constitution template from library
- Advisor selects one or multiple families to share with
- Template appears on Family Portal with "Inactive Template" status
- All 12 Constitution sections preserved during sharing
- Backend tracks which families received template
- Family Council receives notification of shared template

---

### Story 2: Constitution Template Editing (Cross-Portal)
**Module:** Constitution | **Priority:** High | **SP:** 13

**As an** External Advisor  
**I want to** access Family Portal to edit the Constitution template I shared  
**So that** I can refine it based on specific family needs while maintaining content integrity through concurrent editing lock mechanism

**Key Acceptance Criteria:**
- Advisor can access Family Portal through secure authentication
- Advisor can edit any of 12 Constitution sections
- Lock mechanism prevents concurrent editing (only one editor at a time)
- If Advisor editing, Family Council cannot edit simultaneously (and vice versa)
- Lock releases automatically after 15 minutes of inactivity

---

### Story 3: Constitution Template Activation & Archiving
**Module:** Constitution | **Priority:** Medium | **SP:** 8

**As a** Family Council Member  
**I want to** activate advisor's Constitution template as our active Constitution  
**So that** we can officially adopt it for family governance while preserving our previous constitution as a template

**Key Acceptance Criteria:**
- Only Family Council can activate Constitution templates
- Activation displays confirmation modal with warnings
- Previous active Constitution automatically archived as template
- Archived Constitution labeled "Constitution (Archived [Date])"
- Only one active Constitution exists per family at any time
- Advisor editing access expires immediately upon activation
- All stakeholders receive activation notifications

---

### Story 4: Learning Path Sharing
**Module:** Learning Path | **Priority:** Critical | **SP:** 3

**As an** External Advisor  
**I want to** share a Learning Path with a family from my Advisor Portal  
**So that** the Learning Path appears automatically on Family Portal and becomes available for assignment to family members

**Key Acceptance Criteria:**
- Advisor selects Learning Path from library
- Advisor selects one or multiple families to share with
- Learning Path appears immediately on Family Portal
- All modules and resources preserved during sharing
- Status shows "Available for Assignment"
- No editing or activation workflow required
- Family Council receives notification of shared Learning Path

---

### Story 5: Learning Path Assignment (Dual Mechanism)
**Module:** Learning Path | **Priority:** High | **SP:** 5

**As an** External Advisor OR Family Council Member  
**I want to** assign a shared Learning Path to one or multiple Family Members  
**So that** family members can begin their professional development journey with clear ownership and tracking

**Key Acceptance Criteria:**
- Both Advisor AND Family Council can assign Learning Paths independently
- Advisor assigns through Family Portal (cross-portal access)
- Family Council assigns through Family Portal
- Assignment creates initial status "Pending" for each Family Member
- Same Learning Path can be assigned to multiple members with independent tracking
- System prevents duplicate assignment (same Learning Path to same member twice)
- Assignment is permanent (cannot be unassigned)
- Assigned Family Members receive notifications
- Advisor Portal shows assignment count only (no status details for privacy)

---

### Story 6: Learning Path Status Tracking System
**Module:** Learning Path | **Priority:** Medium | **SP:** 8

**As a** Family Council Member  
**I want to** see Learning Path status progression (pending → in progress → finished) for each assigned Family Member  
**So that** I can monitor engagement and completion of professional development programs

**Key Acceptance Criteria:**
- Status flow: Pending → In Progress → Finished (one-way, cannot reverse)
- Pending → In Progress: automatic when Family Member starts Learning Path
- In Progress → Finished: automatic when all modules completed
- Each Family Member has independent status tracking
- Progress percentage tracked (completed modules / total modules)
- All status information visible ONLY on Family Portal (not Advisor Portal)
- Family Council sees all Family Members' statuses
- Family Members see only their own status
- Family Council receives notifications on status changes
- Completion recognition displayed to Family Member

---

### Story 7: Resource Link Sharing
**Module:** Resources | **Priority:** Low | **SP:** 2

**As an** External Advisor  
**I want to** share Resource links with a family  
**So that** they can access supplementary materials and professional references

**Key Acceptance Criteria:**
- Advisor enters resource metadata (name, URL, description, type, category)
- Only external links accepted (no file uploads)
- Advisor selects one or multiple families to share with
- Resource links appear immediately in Family Portal Resources section
- All family members can access shared resources (universal access)
- Resources organized by type and category
- No engagement tracking (who viewed, when)
- Sharing is permanent (cannot un-share)
- Family Council receives notification of shared resource

---

## 📊 Effort Estimate

**Total Story Points:** 44 SP  
**Estimated Sprints:** ~2 sprints (assuming 20-25 SP per sprint)

**Breakdown by Module:**
- Constitution Module: 26 SP (Stories 1, 2, 3)
- Learning Path Module: 16 SP (Stories 4, 5, 6)
- Resources Module: 2 SP (Story 7)

**Development Sequence Recommendation:**

**Sprint 1 (15 SP):**
- Story 1: Constitution Template Sharing (5 SP)
- Story 4: Learning Path Sharing (3 SP)
- Story 7: Resource Link Sharing (2 SP)
- Story 5: Learning Path Assignment (5 SP)

**Sprint 2 (13 SP):**
- Story 2: Constitution Template Editing (13 SP)

**Sprint 3 (16 SP):**
- Story 3: Constitution Template Activation (8 SP)
- Story 6: Learning Path Status Tracking (8 SP)

---

## 🔗 Dependencies

### Must Have Before This Epic

**Internal Dependencies:**
- EPIC-017: Family Constitution Core Structure (12 sections defined)
- EPIC-009: Learning Path Framework
- Knowledge Center section for displaying Resource links
- External Advisor Portal basic functionality
- Family Portal authentication & access control system

**Technical Dependencies:**
- Cross-portal authentication system (for Advisor access to Family Portal)
- Lock mechanism for concurrent editing prevention
- Backend relationship tracking system for shared content

### Related Systems

- Workshop ecosystem integration (for context)
- Family Council permissions system
- Family Member role management

---

## 🎨 Design & UX

### Figma Links
[To be added]

### Key User Flows

**Flow 1: Constitution Template Sharing & Activation**
1. Advisor shares Constitution template from Advisor Portal
2. Template appears on Family Portal (inactive state)
3. Advisor accesses Family Portal, edits template sections (lock mechanism prevents concurrent editing)
4. Family Council reviews edits in real-time
5. Family Council activates template → becomes active Constitution
6. Previous active Constitution → becomes template (archived)
7. Advisor loses editing access after activation

**Flow 2: Learning Path Assignment & Status Progression**
1. Advisor shares Learning Path from Advisor Portal
2. Assignment can happen via TWO methods:
   - **Method A:** Advisor assigns Learning Path to specific Family Member → status: pending
   - **Method B:** Family Council assigns Learning Path to Family Member → status: pending
3. Family Member starts Learning Path → status: in progress
4. Family Member completes Learning Path → status: finished
5. All status changes visible on Family Portal only

**Flow 3: Resource Link Sharing**
1. Advisor shares Resource link from Advisor Portal
2. Resource link appears in Family Portal appropriate section
3. Family members access external Resource via link

---

## 🧮 Business Rules

### Constitution Module Rules

**BR-001: Single Active Constitution**
- Only one Constitution can be active per family at any time
- Activating new Constitution automatically archives current active Constitution

**BR-002: Template Preservation**
- Previous active Constitution becomes template (not deleted)
- All historical Constitution versions preserved as templates

**BR-003: Advisor Editing Access**
- Advisor can only edit Constitution templates they shared
- Advisor access limited to shared template, cannot view other family data
- Edits visible to Family Council in real-time
- Advisor access expires when Family Council activates template
- After activation, Advisor loses editing access

**BR-003a: Concurrent Editing Prevention**
- Only one person can edit Constitution template at any moment
- If Advisor is editing, Family Council cannot edit simultaneously
- If Family Council is editing, Advisor cannot edit simultaneously
- Lock mechanism prevents concurrent modification conflicts
- Lock automatically releases after 15 minutes of inactivity

**BR-004: Template State**
- Shared templates appear as "inactive" until activated
- Inactive templates cannot be used for governance decisions
- Only Family Council can activate templates

### Learning Path Module Rules

**BR-005: Status Progression**
- Status flow: pending → in progress → finished
- Status cannot move backwards
- Status transitions automatic (except initial assignment which creates pending status)

**BR-006: Status Visibility**
- All status information visible ONLY on Family Portal
- Advisor Portal does NOT display status updates
- Status applies per Family Member (multiple members can have different statuses for same Learning Path)

**BR-007: Assignment Mechanism**
- Learning Paths can be assigned by TWO roles:
  - External Advisor can assign directly to Family Members
  - Family Council can assign to Family Members
- Assignment creates initial status: pending
- Once assigned, Learning Path cannot be unassigned
- Assignment is permanent for tracking purposes

**BR-008: Learning Path Instance**
- Each shared Learning Path creates unique instance for family
- Multiple families receiving same Learning Path have separate instances
- If same Learning Path assigned to multiple Family Members within one family, each member has separate status tracking
- Example: Member A can be "in progress" while Member B is "finished" for same Learning Path
- Status tracking is per-member, not per-Learning-Path

### Resource Module Rules

**BR-009: Simple Sharing**
- Resources are external links only (no file uploads)
- Links immediately available after sharing
- No approval or acceptance workflow
- Resource links appear in appropriate section based on type

**BR-010: Access Control**
- All family members can access shared Resource links
- No per-member permission restrictions
- Families cannot hide or archive shared Resources after receiving them

### Cross-Module Rules

**BR-011: Sharing Direction**
- All sharing is one-way: Advisor → Family
- No reverse sharing mechanism (Family → Advisor)

**BR-012: Content Ownership**
- Advisor retains ownership of shared content
- Advisor cannot remove or un-share content after sharing (permanent share)
- Family cannot delete, hide, or archive shared content
- Shared content remains accessible indefinitely (no expiration policy)

**BR-013: Backend Tracking**
- System must maintain relationships between shared content and families
- Advisor Portal must display which families received each shared item
- Tracking required for: Constitution templates, Learning Paths, Resource links
- This enables Advisor to see distribution list of their shared content

---

## 📝 Notes

### Assumptions

**A-001:** Both Advisor and Family Council can assign Learning Paths to Family Members independently

**A-002:** Family Portal has adequate access control infrastructure to support external Advisor access for Constitution editing

**A-003:** Resources are external links only; no file storage capacity requirements

**A-004:** Shared content has no expiration date and remains accessible indefinitely

**A-005:** Concurrent editing conflicts prevented through lock mechanism (one editor at a time)

**A-006:** Backend system can efficiently track and display content-to-family relationships for Advisor Portal

### Success Metrics

**Adoption Metrics:**
- Number of templates/Learning Paths/resources shared per advisor per month
- Percentage of advisors using sharing features
- Template activation rate
- Learning Path assignment rate
- Learning Path completion rate

**Engagement Metrics:**
- Time from template sharing to activation
- Time from assignment to Learning Path start
- Average Learning Path completion time
- Resource access frequency

**Quality Metrics:**
- Number of concurrent editing conflicts (should be zero with lock mechanism)
- System uptime for cross-portal access
- Notification delivery success rate

### Risks & Mitigation

**Risk 1: Cross-Portal Authentication Complexity**
- Mitigation: Leverage existing authentication infrastructure from other features
- Mitigation: Comprehensive security testing before release

**Risk 2: Lock Mechanism Failures**
- Mitigation: Implement robust timeout and recovery logic
- Mitigation: Database-level constraints to prevent concurrent edits

**Risk 3: Status Tracking Performance**
- Mitigation: Optimize database queries for status retrieval
- Mitigation: Implement caching for frequently accessed status data

**Risk 4: User Confusion About Dual Assignment**
- Mitigation: Clear UI indicators showing who assigned what
- Mitigation: Comprehensive user documentation and help text

---

**Epic Owner:** [To be assigned]  
**Created:** 2025-11-20  
**Last Updated:** 2025-11-20