# EPIC-016A: Service Delivery & Deliverable Management (Consultant Side)

## 📋 Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** Service Delivery and Deliverable Sharing for Consultants  
**Summary:** Enable consultants to deliver services, share deliverables, track progress, and manage work output during active engagements  
**Parent User Journey:** JRN-FAM-002 - Family Marketplace Service Booking (Stage 6)  
**Priority:** Critical  
**Epic Link:** FG-EPIC-016A  
**Related Epic:** FG-EPIC-016F (Family deliverable viewing and feedback)

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Enable consultants to actively deliver services by accessing family data within permitted modules, creating/editing content, sharing deliverables through external links, tracking progress against milestones, and managing work output professionally. This Epic delivers the consultant's core service delivery workspace.

**User-facing value:**
- Consultants can access family modules with granted permissions
- Consultants can create and edit content within scope of service
- Consultants can share deliverables via external links (Google Drive, SharePoint, etc.)
- Consultants can track progress against service milestones
- Consultants maintain organized work output for family review

**Business value:**
- Structured delivery process increases service completion rate to >85%
- Deliverable management reduces miscommunication and disputes
- Progress tracking keeps families informed and reduces inquiries
- Clear work output documentation supports quality assurance

**Scope boundaries:**
- **Included:** Module access with permissions, content creation/editing within granted modules, deliverable sharing via external links, progress tracking
- **NOT included:** File uploads to platform (only external links), chat functionality (EPIC-014A), access configuration (EPIC-015), service completion (EPIC-018A)

---

## 👥 Target Users

**Primary Personas:**
- Consultant (DOC-USR-006) - Delivers services and manages work output

**Secondary Personas:**
- Family Admin/Council (DOC-USR-002) - Receives deliverables and monitors progress (see EPIC-016F)

---

## 📖 User Stories (High-Level)

1. **As a** Consultant, **I want to** access family modules with my granted permissions, **so that** I can review existing data and understand family context for my service

2. **As a** Consultant, **I want to** create and edit content in permitted modules, **so that** I can deliver my service by producing work output directly in family's governance system

3. **As a** Consultant, **I want to** share deliverables via external links (Google Drive, SharePoint, Dropbox), **so that** I can provide work output to families professionally

4. **As a** Consultant, **I want to** track progress against service milestones, **so that** I can stay on schedule and communicate status to families

5. **As a** Consultant, **I want to** organize deliverables by service and category, **so that** families can easily find and review my work output

---

## 🔗 Dependencies

**Upstream Dependencies:**
- EPIC-015F: Access Configuration (permissions must be granted)
- EPIC-013A: Service Request Lifecycle (active service required)
- Module access control system

**Downstream Impact:**
- EPIC-016F: Family Deliverable Viewing (families access shared deliverables)
- EPIC-018A: Service Completion (deliverables reviewed during completion)
- Service request progress tracking

**Technical Dependencies:**
- Permission enforcement system
- Module access with RBAC
- Deliverable storage (metadata only, links to external)
- Progress tracking system
- Audit logging

---

## 📐 Design & UX

**Figma Links:**
- [To be created] Module Access Interface
- [To be created] Deliverable Sharing Modal
- [To be created] Progress Tracking Dashboard

**UX Notes:**

**User Flow - Accessing Family Portal:**
1. Consultant has active service with granted permissions
2. From service request detail, clicks "Access Family Portal"
3. Opens family's portal with consultant view:
   - Only permitted modules visible in navigation
   - Banner at top: "You're viewing [Family Name]'s portal as consultant"
   - Permission level indicator per module (View, View+Modify)
   - Module navigation filtered to granted modules only
4. Consultant can navigate between permitted modules
5. Within each module, sees family's existing data
6. If View+Modify permission: Can create/edit content related to service
7. All actions logged in audit trail

**User Flow - Creating Content in Family Module:**
1. Consultant in permitted module (e.g., Succession Planning)
2. Sees existing family content
3. If View+Modify permission:
   - "Create New" button available
   - Can click to create new record (succession plan, strategy doc, etc.)
4. Creation form opens with family's template/structure
5. Fills out form with service-related content
6. Click "Save" → Content created in family's module
7. Content marked with "Created by Consultant [Name]" badge
8. Family sees new content immediately in their portal

**User Flow - Sharing Deliverable:**
1. Consultant has completed work output (document, spreadsheet, presentation)
2. Uploads to external storage (Google Drive, SharePoint, Dropbox)
3. From service request detail, clicks "Share Deliverable"
4. Deliverable sharing modal opens:
   - **Deliverable Name:** (text input, required)
   - **Description:** (textarea, optional but encouraged)
   - **Category:** (dropdown: Strategy Document, Analysis, Presentation, Workshop Materials, Report, Other)
   - **External Link:** (URL input, required)
     - Accepts: Google Drive, Dropbox, SharePoint, OneDrive, Box, other URLs
     - Validation: Must be valid URL
   - **Related to Service:** (auto-populated with current service)
   - **Visibility:** (radio buttons)
     - Share with Admin/Council only
     - Share with all family members
5. Preview deliverable info
6. Click "Share with Family"
7. Deliverable record created:
   - Link stored (not file itself)
   - Timestamp recorded
   - Family notified
8. Deliverable appears in service request "Deliverables" section

**User Flow - Tracking Progress:**
1. From service request detail, navigate to "Progress" tab
2. Sees milestones and deliverables checklist:
   - For each milestone:
     - Milestone name
     - Target date
     - Status (Not Started, In Progress, Completed)
     - Associated deliverables
   - Progress bar showing overall completion %
3. Can update milestone status:
   - Click milestone → Update status modal
   - Change status and add notes
   - Click "Update"
4. Can mark deliverables as completed
5. Progress updates visible to family in real-time

**Key UI Elements:**
- **Consultant View Banner:** Clear indication of consultant mode in family portal
- **Permission Badges:** Visual indicators per module (View-only, Can Edit)
- **Deliverable Cards:** Clean cards with category icons, links, metadata
- **Progress Dashboard:** Visual progress bar, milestone list, completion %
- **Creation Attribution:** "Created by [Consultant]" badges on consultant-created content
- **Quick Actions:** "Share Deliverable" button prominent in service request view

---

## 📢 Notifications (if applicable)

**Does this Epic involve user notifications?** Yes

| Trigger | Recipient | Format | Description |
|---------|-----------|--------|-------------|
| Consultant accessed family portal | Family Admin | In-App | "[Consultant] accessed your family portal - [View Activity]" (daily digest) |
| Consultant created content in module | Family Admin/Council | In-App | "[Consultant] created [Item] in [Module] - [View]" |
| Consultant shared deliverable | Family Admin/Council | Email + In-App | "[Consultant] shared deliverable: [Name] - [View Now]" |
| Consultant updated progress milestone | Family Admin | In-App | "[Consultant] marked [Milestone] as complete - [View Progress]" |

**Notification Configuration Notes:**
- Default: All notifications enabled for Admin
- Portal access shown as daily digest (not real-time per access)
- Content creation and deliverable sharing: Real-time notifications
- Progress updates: In-app only (not email)
- Localization: English only initially

---

## 🧮 Business Rules

**Module Access:**
1. Consultant can only access modules with granted permissions
2. Permission levels enforced:
   - **View:** Read-only, can see existing data
   - **View+Modify:** Can create and edit content related to service
3. Consultant cannot access modules outside granted permissions
4. Navigation filtered to show only permitted modules
5. All access logged in audit trail with timestamps

**Content Creation/Editing:**
1. Consultant can only create/edit if View+Modify permission granted
2. Content must be related to service being delivered
3. All created content marked with consultant attribution
4. Consultant cannot delete existing family content (only create/edit)
5. Consultant can edit own created content, not content created by family members
6. Edits tracked in version history with consultant as author

**Deliverable Sharing:**
1. Deliverables must be external links (no direct file uploads)
2. Supported external storage: Google Drive, Dropbox, SharePoint, OneDrive, Box, any valid URL
3. Platform does NOT validate link security or scan content (family responsibility)
4. Maximum 50 deliverables per service request
5. Deliverable name required (max 200 characters)
6. Description optional but encouraged (max 1000 characters)
7. Category selection required for organization
8. Deliverables linked to specific service request
9. Consultant can update/delete deliverables before service completion
10. After service completion, deliverables become read-only (preserved)

**External Link Security:**
1. Platform does NOT scan or validate external links
2. Family responsible for verifying link safety before opening
3. Consultant responsible for setting appropriate sharing permissions on external storage
4. Recommended: Use view-only links when possible
5. Links should remain accessible for at least 90 days after service completion

**Progress Tracking:**
1. Milestones auto-generated from service proposal/booking
2. Consultant can add custom milestones if needed
3. Milestone statuses: Not Started, In Progress, Completed
4. Progress percentage calculated: (Completed milestones / Total milestones) × 100
5. Deliverables linked to milestones for better organization
6. Progress updates visible to family in real-time
7. Timeline visualization shows current status vs. deadline

**Work Output Organization:**
1. Deliverables organized by:
   - Service request
   - Category (Strategy, Analysis, Presentation, etc.)
   - Date shared
2. Family can filter/sort deliverables
3. Deliverables remain accessible after service completion
4. Consultant-created content in modules tagged separately

**Permission Boundaries:**
1. Consultant cannot access:
   - Billing/payment information
   - Family member PII (emails, phones) beyond what's visible in permitted modules
   - Other consultants' work or access details
   - System admin functions
2. Consultant cannot:
   - Invite other family members
   - Change family settings
   - Delete family content
   - Export bulk family data

---

## 📝 Notes

**Future Enhancements (not in scope):**
- Direct file upload to platform (secure storage)
- Collaborative document editing (real-time)
- Version control for deliverables
- Deliverable preview within platform (no external navigation)
- Video/audio deliverable embedding
- Deliverable approval workflow (family approval required)
- Time tracking for billable hours
- Gantt chart for complex multi-phase projects

**Open Questions:**
- Should consultants be able to set deliverable access expiration (links auto-expire)?
- Should platform warn if external link becomes inaccessible?
- Should there be deliverable size recommendations (for performance)?
- Should consultants be able to create private drafts before sharing with family?
- Should families be able to request specific deliverables (checklist)?

**Assumptions:**
- External link sharing sufficient (no need for platform storage in MVP)
- Families trust consultants to share safe, malware-free links
- Consultants use reputable external storage providers
- Families can access external storage (Google Drive, etc.) without issues
- View+Modify permission doesn't require row-level granularity

**Common Deliverable Types:**
1. **Strategy Documents:** Governance frameworks, succession plans, philanthropic strategies
2. **Analysis Reports:** Family dynamics assessment, financial analysis, risk assessment
3. **Presentations:** Workshop decks, training materials, board presentations
4. **Templates:** Governance document templates, process workflows
5. **Workshop Materials:** Exercises, handouts, reference guides
6. **Meeting Minutes:** Facilitated meeting documentation
7. **Action Plans:** Implementation roadmaps, project plans

**Best Practices for Consultants:**
- Set external links to view-only when possible (prevent accidental edits)
- Organize deliverables logically by milestone or category
- Include clear descriptions (don't rely on filename alone)
- Share work-in-progress for family feedback (avoid big surprises at end)
- Mark milestones as complete promptly (keeps family informed)
- Create content in family modules when appropriate (better than separate docs)
- Use family's existing structure/templates for consistency

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-24  
**Epic Status:** Draft  
**Story Points Estimate:** TBD (during grooming)
