# User Story: Learning Path Sharing

## 📋 Basic Information

**Story ID:** [Story ID]  
**Story Title:** Learning Path Sharing  
**Epic:** EPIC-022: Template Exchange System (Advisor → Family)  
**Module:** Learning Path  
**User Story:** As an External Advisor, I want to share a Learning Path with a family so they can access structured professional development content  

**Priority:** Critical  
**Story Points:** 3  
**Sprint:** [To be determined]  
**Assignee:** [To be assigned]

---

## 👤 User Personas

### Primary Actor: External Advisor

**Role Context:**
- Professional advisor providing governance consulting to UHNW families
- Has access to library of Learning Paths for family development
- Curates educational content for family member growth
- Manages professional development programs across multiple families
- Shares best practices and structured learning resources

**Goals:**
- Share curated Learning Paths with families efficiently
- Provide structured professional development resources
- Enable family member skill development
- Track which families have access to specific Learning Paths
- Support family governance capability building

**Pain Points:**
- Manual distribution of learning materials
- No visibility into Learning Path distribution
- Difficulty tracking which families have which resources
- Lack of structured delivery mechanism for educational content

### Secondary Actor: Family Council Member

**Role Context:**
- Reviews advisor-shared Learning Paths
- Makes decisions about family member development
- Oversees professional development initiatives
- Primary contact with External Advisor for learning programs

**Goals:**
- Receive professional Learning Paths from hired advisor
- Access learning content immediately upon sharing
- Review Learning Path structure and content
- Prepare for Learning Path assignment to family members
- Track available development resources

### Tertiary Actor: Family Member

**Role Context:**
- Participates in family governance learning and development
- Will be assigned Learning Paths by Advisor or Family Council
- Engages with learning content as part of family development program

**Goals:**
- Access assigned Learning Paths
- Understand learning expectations
- Complete professional development activities

---

## 📖 User Story Description

### Story Statement

As an External Advisor, I want to share a Learning Path from my Advisor Portal with a family, so that the Learning Path appears automatically in the family's Learning Paths section on Family Portal, enabling the family to access structured professional development content and prepare for assignment to family members.

### Context

External Advisors curate Learning Paths for family member professional development. These Learning Paths contain structured modules, resources, and learning activities designed to build governance capabilities, leadership skills, and family business competencies.

This story establishes the foundation for the Learning Path ecosystem by creating a one-way sharing mechanism from Advisor Portal to Family Portal. After sharing, the Learning Path becomes available for assignment (Story 5) and status tracking (Story 6).

Unlike Constitution templates, Learning Paths do not require activation or editing workflows. Once shared, they are immediately available for assignment to family members. The sharing is permanent - advisors cannot un-share Learning Paths after sharing.

### Business Value

**For External Advisors:**
- Streamlined Learning Path distribution
- Visibility into which families have access to specific Learning Paths
- Professional service delivery through structured learning programs
- Foundation for family member development tracking

**For Families:**
- Immediate access to professional learning content
- Structured development programs from hired experts
- Centralized learning resource management
- Clear pathway for family member skill development

**For ReFamily Platform:**
- Enhanced advisor-family collaboration on development programs
- Increased platform engagement with learning content
- Competitive differentiation in family governance education
- Foundation for comprehensive learning analytics

---

## ✅ Acceptance Criteria

### AC-001: Learning Path Selection (Advisor Portal)

**Given** I am an External Advisor logged into Advisor Portal  
**And** I have at least one Learning Path in my library  
**When** I navigate to Learning Paths section  
**Then** I see list of all my Learning Paths  
**And** each Learning Path shows:
- Learning Path name
- Brief description
- Number of modules included
- Estimated completion time
- Number of families shared with (count)
- "Share" action button

### AC-002: Family Selection for Sharing

**Given** I selected a Learning Path to share  
**When** I click "Share" button  
**Then** system displays family selection modal  
**And** modal shows list of families I'm currently engaged with  
**And** each family entry shows:
- Family name
- Engagement status (active/inactive)
- Already shared indicator (if this Learning Path already shared with this family)
**And** I can select one or multiple families  
**And** families with "Already shared" indicator are disabled (cannot select again)

### AC-003: Sharing Confirmation

**Given** I selected one or more families to share Learning Path with  
**When** I click "Confirm Share" button  
**Then** system displays confirmation message: "Learning Path '[Name]' successfully shared with [N] families"  
**And** sharing modal closes automatically  
**And** Learning Path list updates to show increased share count  
**And** I can see which specific families received this Learning Path (detail view)

### AC-004: Learning Path Appearance on Family Portal

**Given** Advisor shared Learning Path with my family  
**When** I (Family Council Member) log into Family Portal  
**And** I navigate to Learning Paths section  
**Then** I see the shared Learning Path in the list  
**And** Learning Path displays:
- Learning Path name
- "Shared by [Advisor Name]" attribution
- Date shared
- Brief description
- Number of modules
- Estimated completion time
- Status: "Available for Assignment"
- "View Details" action button

### AC-005: Learning Path Structure Preservation

**Given** Advisor shared Learning Path with all modules and resources  
**When** I (Family Council Member) open the shared Learning Path  
**Then** I see complete Learning Path structure:
- Learning Path overview/description
- All learning modules in original order
- Module descriptions and objectives
- Resources per module (articles, videos, documents, links)
- Estimated time per module
- Prerequisites (if any)
- Learning outcomes
**And** all content, formatting, and structure integrity maintained

### AC-006: Backend Tracking (Advisor View)

**Given** I shared Learning Path with multiple families  
**When** I view Learning Path details in Advisor Portal  
**Then** I see complete list of families who received this Learning Path  
**And** each family entry shows:
- Family name
- Date shared
- Current status: "Shared" (available on Family Portal)
- Assignment status: "Not yet assigned" (initially)
**And** list sorted by date shared (newest first)

### AC-007: Backend Tracking (Family View)

**Given** I received Learning Path from Advisor  
**When** I view Learning Path details on Family Portal  
**Then** I see metadata:
- Shared by: [Advisor Name]
- Date shared: [timestamp]
- Status: Available for Assignment
- Modules: [count]
- Estimated time: [duration]
- Assignments: None yet (initially)
**And** I can access full Learning Path content for review

### AC-008: Multiple Learning Paths Support

**Given** Advisor shared multiple different Learning Paths with my family  
**When** I view Learning Paths section on Family Portal  
**Then** I see all shared Learning Paths listed  
**And** each Learning Path maintains independent identity  
**And** I can distinguish between different Learning Paths clearly  
**And** all Learning Paths show "Available for Assignment" status

### AC-009: Sharing Permanence

**Given** Advisor shared Learning Path with family  
**When** any amount of time passes  
**Then** Learning Path remains accessible on Family Portal indefinitely  
**And** Advisor cannot un-share or remove Learning Path  
**And** Family cannot delete or hide Learning Path  
**And** Learning Path persists until assigned and completed by family members

### AC-010: Share Notification (Family Council)

**Given** Advisor shares Learning Path with my family  
**When** sharing occurs  
**Then** I (Family Council Member) receive in-platform notification  
**And** notification states: "[Advisor Name] shared Learning Path '[Name]' with your family"  
**And** notification includes brief description and estimated time  
**And** notification includes direct link to view Learning Path  
**And** notification marked as unread until I interact with it

### AC-011: No Editing Required

**Given** Advisor shared Learning Path with family  
**When** Learning Path appears on Family Portal  
**Then** Learning Path is immediately ready for assignment  
**And** no editing or customization step required  
**And** no activation workflow needed  
**And** Family Council can assign to family members immediately (Story 5)

### AC-012: Multiple Advisors Support

**Given** family works with multiple External Advisors  
**When** different advisors share Learning Paths  
**Then** all Learning Paths appear in Family Portal list  
**And** each Learning Path shows correct advisor attribution  
**And** family can distinguish between advisors clearly  
**And** no conflicts between Learning Paths from different advisors

---

## 🔄 User Flow

### Main Success Flow

1. **Advisor initiates sharing**
   - Advisor logs into Advisor Portal
   - Navigates to Learning Paths section
   - Views library of Learning Paths
   - Selects specific Learning Path to share
   - Clicks "Share" button

2. **Family selection**
   - System displays family selection modal
   - Advisor reviews list of engaged families
   - Advisor selects one or multiple target families
   - System validates selections (prevents duplicate sharing)
   - Advisor clicks "Confirm Share"

3. **System processing**
   - Backend creates sharing relationship records
   - System replicates Learning Path to Family Portal instances
   - System preserves all modules, resources, and structure
   - System marks Learning Path as "Available for Assignment"
   - System updates Advisor Portal share tracking

4. **Family receives Learning Path**
   - Family Council Member receives in-platform notification
   - Member logs into Family Portal
   - Member navigates to Learning Paths section
   - Member sees new Learning Path in the list
   - Member can view details and review content

5. **Tracking confirmation**
   - Advisor can view updated share count in Learning Path library
   - Advisor can access detailed list of families who received Learning Path
   - Family can see Learning Path metadata including sharing source

### Alternative Flows

**AF-001: Learning Path Already Shared with Family**
- At step 2: System shows "Already shared" indicator for family
- Family option disabled in selection modal
- Advisor cannot select this family again
- Advisor must select different families or cancel

**AF-002: No Active Families**
- At step 2: Modal displays "No active family engagements"
- Share action unavailable
- Advisor must establish family engagements first

**AF-003: Multiple Learning Paths from Same Advisor**
- Family receives multiple Learning Paths from same advisor over time
- Each Learning Path appears independently in list
- No confusion about which is which (clear naming and descriptions)
- Family Council can review all before assigning

---

## 🎯 Business Rules

### BR-001: One-Way Sharing Direction
- Sharing direction: Advisor → Family only
- No reverse sharing (Family → Advisor)
- No lateral sharing (Family → Family or Advisor → Advisor)

### BR-002: Immediate Availability
- Shared Learning Paths immediately available on Family Portal
- No activation or approval workflow required
- Ready for assignment immediately after sharing (Story 5)
- No editing phase (unlike Constitution templates)

### BR-003: Sharing Permanence
- Once shared, Learning Path cannot be un-shared by Advisor
- Learning Path remains on Family Portal indefinitely
- Family cannot delete or hide shared Learning Path
- No expiration date for shared content

### BR-004: Backend Relationship Tracking
- System maintains relationship: Learning Path ↔ Family ↔ Advisor
- Advisor Portal displays distribution list per Learning Path
- Family Portal displays source attribution per Learning Path
- Tracking enables future assignment and progress analytics

### BR-005: Learning Path Integrity
- All modules must be preserved during sharing
- All resources (articles, videos, documents, links) maintained
- Content formatting preserved exactly as in original
- Module order and structure remain unchanged
- No data loss or corruption during transfer

### BR-006: Multiple Learning Paths Support
- Single family can receive multiple Learning Paths from same advisor
- Single family can receive Learning Paths from multiple advisors
- Each Learning Path maintains independent identity
- No limit on number of Learning Paths per family

### BR-007: Share Prevention (Duplicates)
- System prevents sharing same Learning Path with same family twice
- Duplicate share attempt shows "Already shared" indicator
- Advisor must select different Learning Path or different family

### BR-008: Notification Requirements
- Family Council Member receives notification upon sharing
- Notification delivered immediately upon share completion
- Notification includes Learning Path name, description, advisor attribution
- Notification provides direct link to view Learning Path

---

## 🎨 UI/UX Requirements

### Advisor Portal: Learning Path Library View
- Grid or list view of all Learning Paths
- Learning Path cards show: name, description, module count, estimated time, share count
- "Share" button prominently displayed per Learning Path
- Visual indicator for heavily-shared Learning Paths
- Search and filter capabilities (by topic, duration, difficulty)

### Advisor Portal: Family Selection Modal
- Clear modal title: "Share Learning Path with Families"
- List of active family engagements
- Checkboxes for multi-family selection
- "Already shared" visual indicator (grayed out, disabled)
- "Select All" option for bulk sharing
- Cancel and Confirm buttons
- Preview: "This Learning Path will be immediately available for assignment"

### Family Portal: Learning Paths Section
- List or grid view of all shared Learning Paths
- Learning Path cards show: name, advisor, date, module count, estimated time, status
- "Available for Assignment" status badge (green/neutral color)
- "View Details" and "Assign to Member" buttons per Learning Path
- Filter/sort options (by advisor, date shared, completion time)

### Family Portal: Learning Path Detail View
- Full-screen or modal view of Learning Path content
- Overview section with description and objectives
- Module list with expandable details
- Resource preview per module
- Metadata sidebar: advisor, date, status, assignments
- "Assign to Family Member" primary action button
- "Close" or "Back to Learning Paths" navigation

### Notifications
- In-platform notification bell/icon
- Notification card format: avatar, message, timestamp, action link
- Message: "[Advisor Name] shared Learning Path '[Name]' (Est. [duration])"
- Brief description preview
- Unread indicator (dot or badge)
- Click notification → navigate directly to Learning Path

---

## 🔌 Integration Points

### Advisor Portal
- Learning Path library management system
- Family engagement tracking system
- Sharing action workflow
- Distribution analytics dashboard

### Family Portal
- Learning Paths section infrastructure
- Learning Path storage and display system
- Notification delivery system
- Access control (Family Council and Family Member permissions)

### Backend Services
- Learning Path-Family relationship database
- Content replication service (Learning Path copying)
- Notification service
- Audit logging service

### Learning Path Module (EPIC-009)
- Learning Path data structure and schema
- Module and resource definitions
- Progress tracking infrastructure (for Story 6)

---

## 📊 Success Metrics

### Adoption Metrics
- Number of Learning Paths shared per advisor per month
- Percentage of advisors using sharing feature
- Average number of families per Learning Path share action
- Learning Path sharing growth rate month-over-month

### Engagement Metrics
- Time from Learning Path sharing to family first view
- Percentage of shared Learning Paths viewed by families
- Average time family spends reviewing shared Learning Path
- Number of families requesting additional Learning Paths

### Content Metrics
- Most frequently shared Learning Paths (popularity)
- Average module count per shared Learning Path
- Average estimated completion time
- Learning Path diversity across families

### Efficiency Metrics
- Reduction in external learning material sharing (email, file transfer)
- Time saved in learning content distribution process
- Reduction in learning resource confusion incidents

---

## 🚫 Out of Scope

The following items are explicitly NOT included in this story:

- Learning Path assignment to family members (Story 5)
- Learning Path status tracking system (Story 6)
- Learning Path editing or customization by Advisor or Family
- Learning Path creation or library management features
- Learning Path versioning or update propagation
- Family-to-Advisor feedback on Learning Paths
- Learning Path completion analytics beyond basic tracking
- Bulk Learning Path sharing workflows
- Learning Path categorization or tagging beyond basic metadata
- Custom Learning Path creation by families
- Learning Path recommendations or suggestions

---

## 📝 Notes

### Technical Complexity Drivers (Why 3 SP)

1. **Sharing Mechanism** (1 SP)
   - Family selection modal
   - Duplicate prevention
   - Confirmation workflow

2. **Content Replication** (1 SP)
   - Learning Path structure copying
   - Module and resource preservation
   - Data integrity validation

3. **Backend Tracking & Notifications** (1 SP)
   - Relationship database updates
   - Notification dispatch
   - Share count tracking

### Assumptions
- Learning Path data structure already defined in EPIC-009
- Family Portal infrastructure supports Learning Paths section display
- Backend can handle Learning Path content replication efficiently
- Notification infrastructure already exists on platform
- Access control system can validate Family Council permissions
- Learning Paths are read-only after sharing (no editing required)

### Differences from Constitution Sharing
- **Simpler:** No editing workflow, no activation required
- **Immediate availability:** Ready for assignment upon sharing
- **No state transitions:** Just "Shared" → "Assigned" → "In Progress" → "Finished"
- **Read-only:** Learning Paths not editable by anyone after sharing

### Questions for Clarification
- [Dependencies section - to be filled later]

### Related Documentation
- EPIC-022: Template Exchange System (Advisor → Family)
- EPIC-009: Learning Path Framework
- Learning Path data structure specification
- Advisor-Family engagement policies
- Platform notification standards

---

**Story Owner:** [To be assigned]  
**Created:** 2025-11-20  
**Last Updated:** 2025-11-20