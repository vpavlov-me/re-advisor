# User Story: Learning Path Assignment (Dual Mechanism)

## 📋 Basic Information

**Story ID:** [Story ID]  
**Story Title:** Learning Path Assignment (Dual Mechanism)  
**Epic:** EPIC-022: Template Exchange System (Advisor → Family)  
**Module:** Learning Path  
**User Story:** As an External Advisor or Family Council Member, I want to assign a shared Learning Path to a Family Member so they can begin their professional development journey  

**Priority:** High  
**Story Points:** 5  
**Sprint:** [To be determined]  
**Assignee:** [To be assigned]

---

## 👤 User Personas

### Primary Actor A: External Advisor

**Role Context:**
- Professional advisor who shared Learning Path with family
- Provides guidance on family member development
- Recommends appropriate learning programs for specific family members
- Monitors family member engagement with learning content
- Has cross-portal access to Family Portal for assignment purposes

**Goals:**
- Assign Learning Paths directly to specific Family Members
- Initiate professional development programs for family members
- Ensure appropriate family members engage with relevant content
- Track which family members have been assigned which Learning Paths
- Support family governance capability building

**Pain Points:**
- Need to coordinate with Family Council for every assignment (inefficient)
- Uncertainty about who should assign (Advisor vs. Family Council)
- Lack of visibility into assignment status

### Primary Actor B: Family Council Member

**Role Context:**
- Family governance decision-maker
- Oversees family member development programs
- Makes decisions about who should complete which Learning Paths
- Manages internal family learning initiatives
- May assign Learning Paths recommended by Advisor or independently

**Goals:**
- Assign Learning Paths to appropriate Family Members
- Implement family development strategies
- Ensure family members engage with professional development
- Coordinate learning assignments across family
- Track who is assigned what

**Pain Points:**
- Need clear authority to assign Learning Paths
- Potential confusion if both Advisor and Family Council can assign
- Uncertainty about assignment mechanics

### Secondary Actor: Family Member

**Role Context:**
- Receives Learning Path assignments
- Expected to complete assigned learning content
- Progresses through learning modules
- Part of family professional development program

**Goals:**
- Understand what Learning Paths assigned to them
- Know who assigned Learning Path (Advisor or Family Council)
- Access assigned content easily
- Complete learning requirements

**Pain Points:**
- Confusion about assignment source
- Uncertainty about expectations
- Lack of clarity on assignment rationale

---

## 📖 User Story Description

### Story Statement

As an External Advisor OR Family Council Member, I want to assign a shared Learning Path to one or multiple Family Members, creating an initial "pending" status for each assignment, so that family members can begin their professional development journey with clear ownership and tracking.

### Context

After Advisor shares Learning Path with family (Story 4), it becomes available for assignment. The critical innovation in this story is the **dual assignment mechanism**: BOTH External Advisor AND Family Council can independently assign Learning Paths to Family Members.

This dual mechanism provides flexibility:
- **Advisor-driven**: Advisor assigns as part of their advisory engagement
- **Family-driven**: Family Council assigns based on internal development needs

Both assignment methods create identical "pending" status, initiating the status progression system (Story 6). Assignment is permanent - once assigned, it cannot be unassigned. Each Family Member has separate status tracking, so the same Learning Path can be assigned to multiple members with independent progress tracking.

Critically, Advisor does NOT see status updates on Advisor Portal - all status information remains on Family Portal only, maintaining family privacy.

### Business Value

**For External Advisors:**
- Direct assignment capability without family coordination
- Efficient implementation of advisory recommendations
- Clear assignment tracking for engagement management
- Professional service delivery through structured assignment

**For Families:**
- Flexibility to assign Learning Paths internally
- Family Council maintains control over internal assignments
- Clear tracking of who assigned what to whom
- Support for both advisor-led and family-led development

**For Family Members:**
- Clear assignment with source attribution
- Structured development pathway
- Visibility into expectations

**For ReFamily Platform:**
- Flexible assignment system supporting multiple workflows
- Enhanced advisor-family collaboration
- Foundation for comprehensive learning analytics
- Competitive differentiation in learning management

---

## ✅ Acceptance Criteria

### AC-001: Advisor Assignment Access

**Given** I am External Advisor who shared Learning Path with family  
**When** I access Family Portal and navigate to this Learning Path  
**Then** I see "Assign to Family Member" button  
**And** button is enabled and clickable  
**And** I can initiate assignment process from Family Portal

### AC-002: Family Council Assignment Access

**Given** I am Family Council Member  
**And** Learning Path was shared by Advisor with our family  
**When** I navigate to this Learning Path on Family Portal  
**Then** I see "Assign to Family Member" button  
**And** button is enabled and clickable  
**And** I can initiate assignment process

### AC-003: Family Member Selection (Advisor Assignment)

**Given** I (Advisor) clicked "Assign to Family Member" button  
**When** assignment modal opens  
**Then** I see list of all Family Members in this family  
**And** each member shows:
- Name
- Role (if applicable)
- Already assigned indicator (if this Learning Path already assigned to them)
**And** I can select one or multiple Family Members  
**And** members with "Already assigned" indicator are disabled (cannot assign twice)  
**And** modal title shows: "Assign Learning Path: [Name]"

### AC-004: Family Member Selection (Family Council Assignment)

**Given** I (Family Council Member) clicked "Assign to Family Member" button  
**When** assignment modal opens  
**Then** I see list of all Family Members in this family  
**And** each member shows:
- Name
- Role (if applicable)
- Already assigned indicator (if this Learning Path already assigned to them)
**And** I can select one or multiple Family Members  
**And** members with "Already assigned" indicator are disabled (cannot assign twice)  
**And** modal title shows: "Assign Learning Path: [Name]"

### AC-005: Assignment Confirmation

**Given** I selected one or more Family Members for assignment  
**When** I click "Confirm Assignment" button  
**Then** system displays confirmation message: "Learning Path '[Name]' assigned to [N] family members"  
**And** assignment modal closes automatically  
**And** I see updated assignment list showing new assignments  
**And** each assignment shows initial status: "Pending"

### AC-006: Initial Status Creation (Pending)

**Given** I assigned Learning Path to Family Member  
**When** assignment completes  
**Then** system creates assignment record with:
- Learning Path: [ID]
- Family Member: [ID]
- Assigned by: [Advisor Name] OR [Family Council Member Name]
- Assignment date: [timestamp]
- Status: **Pending**
- Progress: 0%
**And** status visible on Family Portal only

### AC-007: Multiple Assignments to Same Learning Path

**Given** Learning Path not yet assigned to certain Family Members  
**When** Advisor assigns to Member A  
**And** later Family Council assigns same Learning Path to Member B  
**Then** both assignments exist independently:
- Member A: assigned by Advisor, status: Pending
- Member B: assigned by Family Council, status: Pending
**And** each member has separate status tracking  
**And** no conflict between assignments

### AC-008: Dual Assignment Prevention (Same Member)

**Given** Learning Path already assigned to Family Member A by Advisor  
**When** Family Council attempts to assign same Learning Path to Member A  
**Then** Member A appears in selection list with "Already assigned" indicator  
**And** Member A is disabled (cannot select)  
**And** system prevents duplicate assignment to same member  
**And** error message if somehow attempted: "This Learning Path is already assigned to this member"

### AC-009: Assignment Visibility (Family Portal)

**Given** Learning Path assigned to one or more Family Members  
**When** Family Council views Learning Path details  
**Then** I see "Assignments" section showing:
- List of all assigned Family Members
- Assignment date per member
- Assigned by (Advisor or Family Council member name)
- Current status per member (initially: Pending)
**And** list sorted by assignment date (newest first)

### AC-010: Assignment Visibility (Family Member View)

**Given** Learning Path assigned to me  
**When** I (Family Member) log into Family Portal  
**And** I navigate to My Learning Paths section  
**Then** I see assigned Learning Path in my list  
**And** Learning Path shows:
- Name and description
- Assigned by: [Advisor Name] OR [Family Council Member Name]
- Assignment date
- Status: Pending
- "Start Learning Path" action button
**And** I can access full Learning Path content

### AC-011: Assignment Notification (Family Member)

**Given** Learning Path assigned to me  
**When** assignment occurs  
**Then** I (Family Member) receive in-platform notification  
**And** notification states: "[Assigner Name] assigned Learning Path '[Name]' to you (Est. [duration])"  
**And** notification includes direct link to start Learning Path  
**And** notification marked as unread until I interact with it

### AC-012: Assignment Notification (Family Council - Advisor Assignment)

**Given** Advisor assigned Learning Path to Family Member  
**When** assignment occurs  
**Then** all Family Council Members receive notification  
**And** notification states: "[Advisor Name] assigned Learning Path '[Name]' to [Member Name]"  
**And** notification includes link to view assignment details  
**And** notification enables Family Council oversight of advisor assignments

### AC-013: Assignment Permanence

**Given** Learning Path assigned to Family Member  
**When** any amount of time passes  
**Then** assignment cannot be unassigned or removed  
**And** no "Unassign" button or action available  
**And** assignment persists throughout entire lifecycle (pending → in progress → finished)  
**And** assignment remains even after completion for historical record

### AC-014: Backend Tracking (Advisor Portal)

**Given** I (Advisor) assigned Learning Path to Family Members  
**When** I view Learning Path details in Advisor Portal  
**Then** I see:
- "Assigned to [N] family members" count
- List of families where assignments occurred
- Assignment date per family
**And** I do NOT see:
- Individual Family Member names (privacy)
- Status information (pending/in progress/finished)
- Progress percentages
**And** status information visible only on Family Portal

### AC-015: Multiple Assignments by Different Assigners

**Given** Learning Path available for assignment  
**When** Advisor assigns to Members A and B  
**And** later Family Council assigns same Learning Path to Members C and D  
**Then** all four assignments exist:
- Member A: Advisor assignment, Pending
- Member B: Advisor assignment, Pending
- Member C: Family Council assignment, Pending
- Member D: Family Council assignment, Pending
**And** Family Portal shows all assignments with correct attribution  
**And** no conflicts or confusion between assignment sources

---

## 🔄 User Flow

### Main Success Flow: Advisor Assignment

1. **Advisor initiates assignment**
   - Advisor accesses Family Portal (cross-portal authentication)
   - Navigates to Learning Path shared with family
   - Reviews Learning Path details
   - Decides which Family Members should complete it
   - Clicks "Assign to Family Member" button

2. **Family Member selection**
   - System displays assignment modal
   - Advisor reviews list of all Family Members
   - System shows "Already assigned" for members who already have this Learning Path
   - Advisor selects one or multiple Family Members
   - Advisor clicks "Confirm Assignment"

3. **System processing**
   - Backend creates assignment records for each selected member
   - System sets initial status: "Pending" for each assignment
   - System records assigner: Advisor name
   - System timestamps each assignment
   - System updates Family Portal displays

4. **Notifications dispatch**
   - Each assigned Family Member receives notification
   - All Family Council Members receive notification about advisor assignment
   - Notifications delivered immediately

5. **Post-assignment state**
   - Assignments visible on Family Portal
   - Each Family Member sees assignment in their personal view
   - Family Council sees assignments in oversight view
   - Advisor Portal updated with assignment count (but no status details)

### Alternative Flow 1: Family Council Assignment

1. **Family Council initiates assignment**
   - Family Council Member logs into Family Portal
   - Navigates to Learning Path (advisor-shared or existing)
   - Reviews Learning Path content
   - Decides assignment based on family development strategy
   - Clicks "Assign to Family Member" button

2. **Family Member selection**
   - System displays assignment modal
   - Family Council reviews list of all Family Members
   - System shows "Already assigned" for members who already have this Learning Path
   - Family Council selects one or multiple Family Members
   - Family Council clicks "Confirm Assignment"

3. **System processing**
   - Backend creates assignment records
   - System sets initial status: "Pending"
   - System records assigner: Family Council member name
   - System timestamps assignments
   - System updates displays

4. **Notifications dispatch**
   - Each assigned Family Member receives notification
   - Other Family Council Members receive notification (FYI)
   - Advisor does NOT receive notification (family internal action)

5. **Post-assignment state**
   - Assignments visible on Family Portal
   - No status information shared with Advisor Portal

### Alternative Flow 2: Mixed Assignments (Advisor + Family Council)

1. **Advisor assigns first batch**
   - Advisor assigns Learning Path to Members A, B
   - Both members status: Pending
   - Assignments attributed to Advisor

2. **Family Council assigns additional members**
   - Later, Family Council reviews same Learning Path
   - Decides additional members should complete it
   - Assigns to Members C, D, E
   - All three status: Pending
   - Assignments attributed to Family Council member

3. **Unified tracking**
   - Family Portal shows all 5 assignments (A, B, C, D, E)
   - Each assignment clearly shows who assigned it
   - All tracked independently with separate statuses
   - No conflicts or confusion

### Alternative Flow 3: Duplicate Prevention

1. **Advisor assigns to Member A**
   - Assignment successful
   - Member A status: Pending

2. **Family Council attempts duplicate assignment**
   - Family Council opens assignment modal
   - Member A shown with "Already assigned by [Advisor Name]" indicator
   - Member A checkbox disabled
   - Family Council cannot select Member A
   - Family Council must select different members or cancel

---

## 🎯 Business Rules

### BR-001: Dual Assignment Mechanism
- BOTH External Advisor AND Family Council can assign Learning Paths
- No priority system: both have equal assignment rights
- Assignments from both sources treated identically in system
- No approval workflow required for either assignment type

### BR-002: Assignment Authority Scope
- External Advisor can ONLY assign Learning Paths they personally shared
- External Advisor cannot assign Learning Paths shared by other advisors
- Family Council can assign ANY Learning Path on Family Portal (advisor-shared or otherwise)
- Family Members cannot assign Learning Paths to themselves or others

### BR-003: Initial Status (Pending)
- All new assignments create initial status: "Pending"
- "Pending" means: assigned but not yet started by Family Member
- Status progression: Pending → In Progress → Finished (Story 6)
- Status cannot be set to anything other than Pending at assignment time

### BR-004: Assignment Permanence
- Once assigned, Learning Path cannot be unassigned
- No "Remove Assignment" or "Unassign" functionality
- Assignment persists throughout entire lifecycle
- Assignment remains even after completion (historical record)

### BR-005: Duplicate Prevention (Same Member)
- System prevents assigning same Learning Path to same Family Member twice
- Prevents duplicate from same assigner or different assigner
- "Already assigned" indicator prevents selection in modal
- Database constraint enforces uniqueness: (Learning Path ID + Family Member ID)

### BR-006: Multiple Member Support
- Same Learning Path can be assigned to multiple Family Members
- Each Family Member has independent assignment record
- Each member has separate status tracking
- No limit on number of members per Learning Path

### BR-007: Status Visibility Restriction
- Status information (Pending/In Progress/Finished) visible ONLY on Family Portal
- Advisor Portal does NOT display status updates
- Advisor sees only assignment count, not individual statuses or progress
- Family privacy maintained through status visibility restriction

### BR-008: Assignment Attribution
- System records who made assignment (Advisor name or Family Council member name)
- Attribution visible to Family Council and assigned Family Member
- Attribution preserved throughout assignment lifecycle
- Enables accountability and audit trail

### BR-009: Cross-Portal Access for Advisor Assignment
- Advisor must access Family Portal to assign Learning Paths
- Advisor Portal does not have assignment interface
- Same cross-portal authentication as Constitution editing (Story 2)
- Advisor access limited to Learning Paths they shared

### BR-010: Notification Requirements
- Assigned Family Member receives notification immediately
- Family Council receives notification for ANY assignment (advisor or internal)
- Advisor does NOT receive notification when Family Council assigns
- All notifications include assignment details and direct links

---

## 🎨 UI/UX Requirements

### Family Portal: Learning Path Detail (Assignment Button)
- "Assign to Family Member" button prominently displayed
- Button visible to both Advisor (if they shared it) and Family Council
- Button enabled if at least one unassigned Family Member exists
- Button disabled with tooltip if all members already assigned
- Visual distinction between Advisor view and Family Council view (optional: different button color)

### Assignment Modal
- Clear modal title: "Assign Learning Path: [Name]"
- Learning Path summary at top (name, description, estimated time)
- List of all Family Members with checkboxes
- "Already assigned" indicator (grayed out, disabled)
  - Shows: "Already assigned by [Name] on [Date]"
- "Select All Available" option (selects only unassigned members)
- Cancel button (secondary)
- "Confirm Assignment" button (primary, enabled only if at least one member selected)

### Family Portal: Assignments Section
- "Assignments" panel in Learning Path detail view
- List of all assigned Family Members
- Per assignment shows:
  - Family Member name
  - Assigned by: [Name]
  - Assignment date
  - Current status badge (Pending/In Progress/Finished)
- Sort options: by date, by status, by member name
- Filter options: by assigner (Advisor vs. Family Council)

### Family Member: My Learning Paths View
- Dedicated section for assigned Learning Paths
- Each Learning Path card shows:
  - Name and brief description
  - Assigned by: [Name]
  - Assignment date: [timestamp]
  - Status: Pending (initially)
  - "Start Learning Path" button (primary action)
- Empty state if no assignments: "No Learning Paths assigned yet"

### Advisor Portal: Assignment Count Display
- Learning Path detail view shows "Assigned to [N] members across [M] families"
- No breakdown of individual assignments (privacy)
- No status information displayed
- Simple count only

### Notifications
- **To Family Member**: "[Assigner] assigned Learning Path '[Name]' to you (Est. [duration]). Start learning now!"
- **To Family Council (Advisor assignment)**: "[Advisor] assigned Learning Path '[Name]' to [Member]. Monitor progress in Learning Paths section"
- **To Family Council (Internal assignment)**: "[Family Council Member] assigned Learning Path '[Name]' to [Member]"
- All notifications include direct links to relevant views

---

## 🔌 Integration Points

### Family Portal
- Learning Path display and management
- Assignment modal interface
- Family Member selection list (from family member database)
- Status tracking system (Story 6 prerequisite)
- Notification delivery system

### Advisor Portal
- Assignment count display
- Learning Path detail view update
- Cross-portal authentication for assignment access

### Backend Services
- Assignment relationship database (Learning Path ↔ Family Member)
- Assignment attribution tracking (who assigned)
- Status management system (initial Pending creation)
- Duplicate prevention validation
- Notification service

### Authentication System
- Cross-portal access for Advisor assignment
- Permission validation (Advisor vs. Family Council)
- Access control enforcement

---

## 📊 Success Metrics

### Assignment Activity
- Number of assignments per Learning Path
- Assignment rate (assigned / shared Learning Paths)
- Average time from sharing to first assignment
- Assignment frequency (assignments per week/month)

### Dual Mechanism Usage
- Percentage of assignments by Advisor vs. Family Council
- Advisor assignment rate (advisors using feature)
- Family Council assignment rate (families taking initiative)
- Mixed assignment rate (both Advisor and Family Council assigning same Learning Path)

### Family Member Engagement
- Number of Family Members with at least one assignment
- Average assignments per Family Member
- Time from assignment to first engagement (Story 6)

### System Performance
- Duplicate prevention success rate (100% expected)
- Assignment confirmation latency (< 2 seconds)
- Notification delivery success rate (> 99%)

---

## 🚫 Out of Scope

The following items are explicitly NOT included in this story:

- Status progression (Pending → In Progress → Finished) - Story 6
- Learning Path completion tracking - Story 6
- Unassignment or assignment removal functionality
- Assignment deadline or due date setting
- Assignment priority or urgency levels
- Bulk assignment operations (assign multiple Learning Paths at once)
- Conditional assignment (if-then rules)
- Assignment approval workflows
- Assignment reminders or nudges
- Progress monitoring during assignment (Story 6)
- Learning Path recommendations based on assignments
- Assignment analytics dashboard
- Family Member self-assignment capability

---

## 📝 Notes

### Technical Complexity Drivers (Why 5 SP)

1. **Dual Assignment Mechanism** (2 SP)
   - Support both Advisor and Family Council assignment paths
   - Unified assignment modal for both user types
   - Permission validation for both contexts
   - Cross-portal access for Advisor

2. **Assignment Logic** (2 SP)
   - Duplicate prevention validation
   - Multiple member selection support
   - Assignment attribution tracking
   - Initial status creation (Pending)

3. **Notifications & UI** (1 SP)
   - Multi-recipient notification dispatch
   - Assignment visibility across different views
   - Backend tracking updates

### Assumptions
- Family Member database complete and accessible
- Status tracking infrastructure ready (for Pending status creation)
- Cross-portal authentication from Story 2 reusable
- Notification service supports multiple notification types
- Learning Path-Family Member relationship database schema defined

### Key Design Decision: Why Dual Mechanism?

**Rationale for both Advisor and Family Council assignment capability:**
1. **Flexibility**: Different families have different governance models
2. **Advisor autonomy**: Advisors can implement recommendations directly
3. **Family control**: Family Council maintains internal development authority
4. **Real-world alignment**: Matches how families and advisors actually work

**Alternative considered and rejected:**
- Advisor recommends, Family Council approves (too bureaucratic)
- Only Family Council assigns (limits advisor effectiveness)
- Only Advisor assigns (removes family autonomy)

### Questions for Clarification
- [Dependencies section - to be filled later]

### Related Documentation
- Story 4: Learning Path Sharing (prerequisite)
- Story 6: Learning Path Status Tracking (dependent)
- Story 2: Constitution Template Editing (cross-portal auth pattern)
- EPIC-009: Learning Path Framework
- Family Member roles and permissions matrix

---

**Story Owner:** [To be assigned]  
**Created:** 2025-11-20  
**Last Updated:** 2025-11-20