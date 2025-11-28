# User Story: Constitution Template Sharing

## 📋 Basic Information

**Story ID:** [Story ID]  
**Story Title:** Constitution Template Sharing  
**Epic:** EPIC-022: Template Exchange System (Advisor → Family)  
**Module:** Constitution  
**User Story:** As an External Advisor, I want to share a Constitution template with a family so they have a professional starting point for their governance work  

**Priority:** Critical  
**Story Points:** 5  
**Sprint:** [To be determined]  
**Assignee:** [To be assigned]

---

## 👤 User Personas

### Primary Actor: External Advisor

**Role Context:**
- Professional advisor hired through ReFamily marketplace
- Provides governance consulting services to UHNW families
- Has access to library of Constitution templates (12-section structure)
- Manages multiple family engagements simultaneously

**Goals:**
- Share professional Constitution templates with families efficiently
- Track which families received specific templates
- Initiate structured governance work with families
- Maintain portfolio of shared content across engagements

**Pain Points:**
- Manual template distribution through email/file sharing
- No visibility into which families have which templates
- Difficulty tracking template versions across multiple families
- No structured handoff mechanism from advisor to family

### Secondary Actor: Family Council Member

**Role Context:**
- Family governance decision-maker
- Responsible for reviewing advisor-provided materials
- Makes decisions about family constitution adoption
- Primary contact with External Advisor

**Goals:**
- Receive professional Constitution templates from hired advisor
- Access templates immediately upon sharing
- Review template structure before activation
- Maintain clear separation between template and active Constitution

---

## 📖 User Story Description

### Story Statement

As an External Advisor, I want to share a Constitution template with a family from my Advisor Portal, so that the template appears automatically on the Family Portal as an inactive template, enabling the family to start their governance work with professional guidance.

### Context

External Advisors work with multiple families simultaneously and need an efficient mechanism to distribute Constitution templates. Currently, template sharing happens outside the platform (email, file sharing), creating tracking challenges and inconsistent handoff experiences. This story establishes the foundation for advisor-family content collaboration by creating a one-way sharing mechanism from Advisor Portal to Family Portal.

The shared template must appear as "inactive" to prevent confusion with the family's active Constitution (if they have one). This story focuses exclusively on the sharing mechanism itself - template editing (Story 2) and activation (Story 3) are separate workflows.

### Business Value

**For External Advisors:**
- Streamlined template distribution through platform
- Visibility into template distribution across families
- Professional service delivery mechanism
- Reduced administrative overhead

**For Families:**
- Immediate access to professional Constitution templates
- Clear distinction between shared templates and active Constitution
- Structured starting point for governance work
- Professional guidance embedded in platform experience

**For ReFamily Platform:**
- Enhanced marketplace value through advisor-family collaboration tools
- Increased platform engagement with advisor-provided content
- Foundation for comprehensive template exchange ecosystem
- Competitive differentiation in family governance market

---

## ✅ Acceptance Criteria

### AC-001: Template Selection (Advisor Portal)

**Given** I am an External Advisor logged into Advisor Portal  
**And** I have at least one Constitution template in my library  
**When** I navigate to Constitution Templates section  
**Then** I see list of all my Constitution templates  
**And** each template shows:
- Template name
- Date created
- Number of families shared with (count)
- "Share" action button

### AC-002: Family Selection for Sharing

**Given** I selected a Constitution template to share  
**When** I click "Share" button  
**Then** system displays family selection modal  
**And** modal shows list of families I'm currently engaged with  
**And** each family entry shows:
- Family name
- Engagement status (active/inactive)
- Already shared indicator (if this template already shared with this family)
**And** I can select one or multiple families  
**And** families with "Already shared" indicator are disabled (cannot select again)

### AC-003: Sharing Confirmation

**Given** I selected one or more families to share template with  
**When** I click "Confirm Share" button  
**Then** system displays confirmation message: "Constitution template [Template Name] successfully shared with [N] families"  
**And** sharing modal closes automatically  
**And** template list updates to show increased share count  
**And** I can see which specific families received this template (detail view)

### AC-004: Template Appearance on Family Portal

**Given** Advisor shared Constitution template with my family  
**When** I (Family Council Member) log into Family Portal  
**And** I navigate to Constitution section  
**Then** I see the shared template in "Templates" subsection  
**And** template displays:
- Template name
- "Shared by [Advisor Name]" attribution
- Date shared
- "Inactive Template" status badge
- Preview/Open action button
**And** template is clearly separated from "Active Constitution" section (if exists)

### AC-005: Template Structure Preservation

**Given** Advisor shared Constitution template with all 12 sections  
**When** I (Family Council Member) open the shared template  
**Then** I see all 12 Constitution sections preserved:
1. Family Identity & Heritage
2. Mission, Vision & Values
3. Ownership & Control Structures
4. Governance Bodies & Roles
5. Decision-Making Processes
6. Conflict Resolution Mechanisms
7. Family Council Operations
8. Financial Governance
9. Risk Management & Compliance
10. Succession Planning
11. Education & Development
12. Communication & Information Sharing
**And** each section displays advisor-provided content  
**And** all formatting, structure, and content integrity maintained

### AC-006: Backend Tracking (Advisor View)

**Given** I shared Constitution template with multiple families  
**When** I view template details in Advisor Portal  
**Then** I see complete list of families who received this template  
**And** each family entry shows:
- Family name
- Date shared
- Current status: "Shared" (template exists on Family Portal)
**And** list sorted by date shared (newest first)

### AC-007: Backend Tracking (Family View)

**Given** I received Constitution template from Advisor  
**When** I view template details on Family Portal  
**Then** I see template metadata:
- Shared by: [Advisor Name]
- Date shared: [timestamp]
- Status: Inactive Template
- Sections: 12/12 (all sections included)
**And** I can access full template content

### AC-008: Multiple Templates Support

**Given** Advisor shared multiple different Constitution templates with my family  
**When** I view Templates section on Family Portal  
**Then** I see all shared templates listed separately  
**And** each template maintains independent identity  
**And** I can distinguish between different templates clearly  
**And** all templates show "Inactive" status

### AC-009: Sharing Permanence

**Given** Advisor shared Constitution template with family  
**When** any amount of time passes  
**Then** template remains accessible on Family Portal indefinitely  
**And** Advisor cannot un-share or remove template  
**And** Family cannot delete or hide template  
**And** template persists until Family Council chooses to activate it

### AC-010: Share Notification (Family Council)

**Given** Advisor shares Constitution template with my family  
**When** sharing occurs  
**Then** I (Family Council Member) receive in-platform notification  
**And** notification states: "[Advisor Name] shared Constitution template '[Template Name]' with your family"  
**And** notification includes direct link to view template  
**And** notification marked as unread until I interact with it

---

## 🔄 User Flow

### Main Success Flow

1. **Advisor initiates sharing**
   - Advisor logs into Advisor Portal
   - Navigates to Constitution Templates section
   - Views library of Constitution templates
   - Selects specific template to share
   - Clicks "Share" button

2. **Family selection**
   - System displays family selection modal
   - Advisor reviews list of engaged families
   - Advisor selects one or multiple target families
   - System validates selections (prevents duplicate sharing)
   - Advisor clicks "Confirm Share"

3. **System processing**
   - Backend creates sharing relationship records
   - System copies template structure to Family Portal instances
   - System preserves all 12 sections with content
   - System marks template as "Inactive" on Family Portal
   - System updates Advisor Portal share tracking

4. **Family receives template**
   - Family Council Member receives in-platform notification
   - Member logs into Family Portal
   - Member navigates to Constitution section
   - Member sees new template in Templates subsection
   - Member can preview/open template to review content

5. **Tracking confirmation**
   - Advisor can view updated share count in template library
   - Advisor can access detailed list of families who received template
   - Family can see template metadata including sharing source

### Alternative Flows

**AF-001: Template Already Shared with Family**
- At step 2: System shows "Already shared" indicator for family
- Family option disabled in selection modal
- Advisor cannot select this family again
- Advisor must select different families or cancel

**AF-002: No Active Families**
- At step 2: Modal displays "No active family engagements"
- Share action unavailable
- Advisor must establish family engagements first

**AF-003: Family Has Active Constitution**
- At step 4: Family sees both Active Constitution and new Template
- Template clearly marked as "Inactive Template"
- No confusion between active and template states
- Both items visible in separate sections

---

## 🎯 Business Rules

### BR-001: One-Way Sharing Direction
- Sharing direction: Advisor → Family only
- No reverse sharing (Family → Advisor)
- No lateral sharing (Family → Family or Advisor → Advisor)

### BR-002: Template State on Sharing
- All shared templates appear as "Inactive" on Family Portal
- Template cannot be used for governance decisions until activated
- Only Family Council can activate templates (covered in Story 3)

### BR-003: Sharing Permanence
- Once shared, template cannot be un-shared by Advisor
- Template remains on Family Portal indefinitely
- Family cannot delete or hide shared template
- No expiration date for shared content

### BR-004: Backend Relationship Tracking
- System maintains relationship: Template ↔ Family ↔ Advisor
- Advisor Portal displays distribution list per template
- Family Portal displays source attribution per template
- Tracking enables future audit and analytics capabilities

### BR-005: Template Structure Integrity
- All 12 Constitution sections must be preserved during sharing
- Content formatting maintained exactly as in original template
- No data loss or corruption during transfer
- Template remains editable after sharing (covered in Story 2)

### BR-006: Multiple Templates Support
- Single family can receive multiple templates from same advisor
- Single family can receive templates from multiple advisors
- Each template maintains independent identity
- No limit on number of templates per family

### BR-007: Share Prevention (Duplicates)
- System prevents sharing same template with same family twice
- Duplicate share attempt shows "Already shared" indicator
- Advisor must select different template or different family

### BR-008: Notification Requirements
- Family Council Member receives notification upon sharing
- Notification delivered immediately upon share completion
- Notification includes template name and advisor attribution
- Notification provides direct link to view template

---

## 🎨 UI/UX Requirements

### Advisor Portal: Template Library View
- Grid or list view of all Constitution templates
- Template cards show: name, creation date, share count
- "Share" button prominently displayed per template
- Visual indicator for heavily-shared templates
- Search and filter capabilities for large template libraries

### Advisor Portal: Family Selection Modal
- Clear modal title: "Share Template with Families"
- List of active family engagements
- Checkboxes for multi-family selection
- "Already shared" visual indicator (grayed out, disabled)
- "Select All" option for bulk sharing
- Cancel and Confirm buttons

### Family Portal: Constitution Section
- Clear separation: "Active Constitution" vs "Templates"
- Templates subsection displays all received templates
- Template cards show: name, advisor attribution, date, status badge
- "Inactive Template" badge uses distinct color (e.g., yellow/amber)
- Preview/Open button per template

### Family Portal: Template Detail View
- Full-screen or modal view of template content
- All 12 sections navigable via sidebar or tabs
- Metadata header: shared by, date, status
- Clear visual distinction from Active Constitution view
- "Close" or "Back to Templates" navigation

### Notifications
- In-platform notification bell/icon
- Notification card format: avatar, message, timestamp, action link
- Unread indicator (dot or badge)
- Click notification → navigate directly to template

---

## 🔌 Integration Points

### Advisor Portal
- Constitution Template library management system
- Family engagement tracking system
- Sharing action workflow
- Distribution analytics dashboard

### Family Portal
- Constitution section infrastructure
- Template storage and display system
- Notification delivery system
- Access control (Family Council permissions)

### Backend Services
- Template-Family relationship database
- Content replication service (template copying)
- Notification service
- Audit logging service

---

## 📊 Success Metrics

### Adoption Metrics
- Number of templates shared per advisor per month
- Percentage of advisors using sharing feature
- Average number of families per template share action
- Template sharing growth rate month-over-month

### Engagement Metrics
- Time from template sharing to family first view
- Percentage of shared templates viewed by families
- Average time family spends reviewing shared template
- Number of families requesting additional templates

### Efficiency Metrics
- Reduction in external template sharing (email, file transfer)
- Time saved in template distribution process
- Reduction in template version confusion incidents

---

## 🚫 Out of Scope

The following items are explicitly NOT included in this story:

- Template editing by Advisor after sharing (Story 2)
- Template activation by Family Council (Story 3)
- Template creation or library management features
- Template versioning or update propagation
- Family-to-Advisor feedback mechanism
- Template analytics beyond share count
- Template customization during sharing process
- Bulk template sharing workflows
- Template categorization or tagging system

---

## 📝 Notes

### Assumptions
- Advisors have pre-existing Constitution templates in their library
- Family Portal infrastructure supports Constitution section display
- Backend can handle template content replication efficiently
- Notification infrastructure already exists on platform
- Access control system can validate Family Council permissions

### Questions for Clarification
- [Dependencies section - to be filled later]

### Related Documentation
- EPIC-022: Template Exchange System (Advisor → Family)
- Constitution Module specification (12-section structure)
- Advisor-Family engagement policies
- Platform notification standards

---

**Story Owner:** [To be assigned]  
**Created:** 2025-11-20  
**Last Updated:** 2025-11-20