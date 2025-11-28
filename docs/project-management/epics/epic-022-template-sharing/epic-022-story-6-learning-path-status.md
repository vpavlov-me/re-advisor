# User Story: Learning Path Status Tracking System

## 📋 Basic Information

**Story ID:** [Story ID]  
**Story Title:** Learning Path Status Tracking System  
**Epic:** EPIC-022: Template Exchange System (Advisor → Family)  
**Module:** Learning Path  
**User Story:** As a Family Council Member, I want to see Learning Path status progression (pending → in progress → finished) for each assigned Family Member so I can monitor engagement and completion  

**Priority:** Medium  
**Story Points:** 8  
**Sprint:** [To be determined]  
**Assignee:** [To be assigned]

---

## 👤 User Personas

### Primary Actor: Family Council Member

**Role Context:**
- Family governance decision-maker
- Oversees family member professional development
- Monitors Learning Path engagement and completion
- Makes strategic decisions about family capability building
- Reviews development program effectiveness

**Goals:**
- Track which Family Members started assigned Learning Paths
- Monitor Learning Path completion progress
- Identify Family Members who haven't engaged with assignments
- Understand development program effectiveness
- Support Family Members through learning journey

**Pain Points:**
- Lack of visibility into whether assignments are being completed
- Uncertainty about Family Member engagement levels
- Difficulty identifying stuck or incomplete learning activities
- No data to inform future development decisions

### Secondary Actor: Family Member

**Role Context:**
- Assigned Learning Path to complete
- Progresses through learning modules
- Completes learning activities and content
- Part of family professional development program

**Goals:**
- Understand own progress through Learning Path
- Know what remains to complete
- See completion status clearly
- Receive recognition for completion

**Pain Points:**
- Uncertainty about progress tracking
- Unclear completion criteria
- No visibility into own status

### Tertiary Actor: External Advisor

**Role Context:**
- Assigned Learning Paths to Family Members (Story 5)
- Interested in engagement outcomes (from distance)
- Does NOT see detailed status information (privacy)

**Goals:**
- Understand if assignments are being completed (general level)
- Receive milestone notifications (optional)

---

## 📖 User Story Description

### Story Statement

As a Family Council Member, I want to see real-time status progression (pending → in progress → finished) for each Family Member's Learning Path assignment, with automatic status transitions based on Family Member engagement, visible exclusively on Family Portal, so I can monitor professional development progress and support Family Members through their learning journey.

### Context

After Learning Path assignment (Story 5), each Family Member has initial status "Pending". This story implements the complete 3-status tracking system that monitors Family Member engagement and automatically updates status based on their actions.

**Status Flow:**
1. **Pending**: Assigned but not yet started
2. **In Progress**: Family Member opened/started Learning Path
3. **Finished**: Family Member completed all Learning Path requirements

Status transitions are automatic based on Family Member actions. Status cannot move backwards (e.g., Finished cannot return to In Progress). Each Family Member has independent status tracking - if same Learning Path assigned to 5 members, each has their own status progression.

**Critical Privacy Rule:** All status information visible ONLY on Family Portal. Advisor Portal does NOT display status updates, maintaining family privacy around internal development activities.

### Business Value

**For Family Council:**
- Real-time visibility into Family Member development engagement
- Data-driven decisions about development programs
- Early identification of disengaged Family Members
- Progress monitoring for governance capability building
- Evidence of development program effectiveness

**For Family Members:**
- Clear progress tracking through learning journey
- Completion recognition
- Transparency about expectations
- Motivation through visible progress

**For ReFamily Platform:**
- Comprehensive learning analytics foundation
- Engagement metrics for product development
- Evidence of platform value in family development
- Competitive differentiation in learning management

---

## ✅ Acceptance Criteria

### AC-001: Initial Status Display (Pending)

**Given** Learning Path assigned to Family Member (Story 5)  
**When** I (Family Council) view assignment details  
**Then** I see assignment with status: **Pending**  
**And** status badge color: Yellow/Amber  
**And** status description: "Assigned but not yet started"  
**And** assigned date visible  
**And** no progress percentage shown (0%)

### AC-002: Status Transition (Pending → In Progress)

**Given** Family Member has Learning Path assignment with status: Pending  
**When** Family Member clicks "Start Learning Path" button OR opens Learning Path content for first time  
**Then** system automatically updates status to: **In Progress**  
**And** transition recorded with timestamp  
**And** progress percentage initializes to 0% or based on first module access

### AC-003: Status Display (In Progress)

**Given** Family Member started Learning Path  
**When** I (Family Council) view assignment details  
**Then** I see status: **In Progress**  
**And** status badge color: Blue  
**And** status description: "Currently working through content"  
**And** start date visible (when status changed from Pending)  
**And** progress percentage visible (e.g., "3 of 8 modules completed - 37%")  
**And** last activity timestamp visible

### AC-004: Progress Tracking (Module Completion)

**Given** Family Member has Learning Path In Progress  
**When** Family Member completes a module (reads content, completes activities)  
**Then** system increments progress counter  
**And** progress percentage updates (e.g., 1/8 modules = 12.5%)  
**And** completed module marked with checkmark or completion indicator  
**And** progress visible to Family Council in real-time  
**And** last activity timestamp updates

### AC-005: Status Transition (In Progress → Finished)

**Given** Family Member completed all Learning Path modules  
**When** final module marked as complete  
**Then** system automatically updates status to: **Finished**  
**And** transition recorded with timestamp  
**And** completion date recorded  
**And** progress shows 100%

### AC-006: Status Display (Finished)

**Given** Family Member finished Learning Path  
**When** I (Family Council) view assignment details  
**Then** I see status: **Finished**  
**And** status badge color: Green  
**And** status description: "Completed all modules"  
**And** completion date visible  
**And** progress shows: "8 of 8 modules - 100%"  
**And** time to completion calculated and displayed (assignment date → completion date)

### AC-007: Status Non-Reversibility

**Given** Family Member has status: In Progress or Finished  
**When** any action occurs  
**Then** status can NEVER move backwards:
- In Progress cannot return to Pending
- Finished cannot return to In Progress
- Finished cannot return to Pending
**And** status progression is one-way only  
**And** system enforces this at database level

### AC-008: Multiple Member Independent Tracking

**Given** same Learning Path assigned to 5 Family Members  
**When** each member progresses at different rates  
**Then** each member has completely independent status:
- Member A: Pending (not started)
- Member B: In Progress (20% complete)
- Member C: In Progress (75% complete)
- Member D: Finished
- Member E: Pending (not started)
**And** statuses do not affect each other  
**And** Family Council sees all 5 statuses separately

### AC-009: Family Portal Status Visibility (Family Council)

**Given** I am Family Council Member  
**When** I view Learning Path section  
**Then** I see status information for ALL assigned Family Members:
- Status badges (Pending/In Progress/Finished)
- Progress percentages
- Completion dates
- Assignment details
**And** I can filter/sort by status  
**And** I can view detailed progress per member

### AC-010: Family Portal Status Visibility (Family Member)

**Given** I am Family Member with Learning Path assignment  
**When** I view My Learning Paths section  
**Then** I see my own status:
- Current status badge
- Progress percentage
- Modules completed / total modules
- Last activity date
- Next module to complete
**And** I do NOT see other Family Members' statuses

### AC-011: Advisor Portal Status Restriction

**Given** I am Advisor who assigned Learning Path to Family Members  
**When** I view Learning Path details in Advisor Portal  
**Then** I see:
- Assignment count: "[N] assignments across families"
- No specific status information
- No progress percentages
- No Family Member names or details
**And** I do NOT see:
- Pending/In Progress/Finished status
- Individual progress tracking
- Completion dates
- Any personally identifiable information
**And** status information completely hidden from Advisor Portal

### AC-012: Status Change Notification (Family Council)

**Given** Family Member status changes (Pending → In Progress OR In Progress → Finished)  
**When** status transition occurs  
**Then** Family Council Members receive notification:
- For In Progress: "[Member] started Learning Path '[Name]'"
- For Finished: "[Member] completed Learning Path '[Name]' (Time: [duration])"
**And** notification includes link to view details  
**And** notification delivered in real-time or near real-time

### AC-013: Completion Recognition (Family Member)

**Given** I (Family Member) completed all Learning Path modules  
**When** status changes to Finished  
**Then** I see completion confirmation screen:
- "Congratulations! You completed [Learning Path Name]"
- Completion date
- Time to completion
- Optional: completion certificate or badge
**And** I receive notification confirming completion  
**And** completed Learning Path moves to "Completed" section in my view

### AC-014: Status Analytics (Family Council Dashboard)

**Given** multiple Learning Path assignments exist across Family Members  
**When** I (Family Council) view Learning Paths overview  
**Then** I see aggregate statistics:
- Total assignments: [count]
- Pending: [count and %]
- In Progress: [count and %]
- Finished: [count and %]
- Average completion time
- Engagement rate (started / assigned)
- Completion rate (finished / assigned)
**And** charts/visualizations showing status distribution

### AC-015: Audit Trail for Status Changes

**Given** Learning Path assignment progressed through statuses  
**When** anyone views detailed assignment history  
**Then** audit trail shows:
- Status: Pending → assigned on [date] by [assigner]
- Status: In Progress → started on [date]
- Progress: Module 1 completed on [date]
- Progress: Module 2 completed on [date]
- Status: Finished → completed on [date]
**And** complete timeline of all status changes preserved

---

## 🔄 User Flow

### Main Success Flow: Complete Status Progression

1. **Initial State (Pending)**
   - Advisor or Family Council assigns Learning Path to Family Member
   - Assignment created with status: Pending
   - Family Member receives notification about assignment
   - Family Council sees Pending status in dashboard

2. **Status Transition to In Progress**
   - Family Member logs into Family Portal
   - Navigates to My Learning Paths
   - Sees assigned Learning Path with "Start Learning Path" button
   - Clicks "Start Learning Path"
   - System transitions status: Pending → In Progress
   - Family Council receives notification: "[Member] started Learning Path"

3. **Progress Tracking Phase**
   - Family Member works through modules sequentially
   - After completing Module 1: progress updates to 12.5% (1/8)
   - After completing Module 2: progress updates to 25% (2/8)
   - After completing Module 3: progress updates to 37.5% (3/8)
   - Family Council sees real-time progress updates
   - Last activity timestamp updates with each interaction

4. **Module Completion Continues**
   - Family Member completes Modules 4, 5, 6, 7
   - Progress increments: 50%, 62.5%, 75%, 87.5%
   - Status remains In Progress throughout

5. **Status Transition to Finished**
   - Family Member completes final Module 8
   - Progress updates to 100%
   - System automatically transitions status: In Progress → Finished
   - Completion date recorded
   - Family Member sees completion confirmation screen
   - Family Council receives notification: "[Member] completed Learning Path"

6. **Post-Completion State**
   - Status permanently set to Finished
   - Completion data recorded in analytics
   - Learning Path moves to "Completed" section for Family Member
   - Family Council can reference completion for future decisions

### Alternative Flow 1: Partial Progress (Member Pauses)

1. **Member Starts but Doesn't Complete**
   - Family Member starts Learning Path (status: In Progress)
   - Completes 3 of 8 modules (37.5% progress)
   - Stops engaging for extended period

2. **Status Remains In Progress**
   - Status does NOT revert to Pending
   - Progress remains at 37.5%
   - Last activity timestamp shows when last engaged
   - Family Council can identify stalled progress

3. **Optional: Re-engagement**
   - Family Council may reach out to Family Member
   - Family Member can resume from Module 4
   - Progress continues from where they left off
   - Status eventually progresses to Finished when completed

### Alternative Flow 2: Multiple Members, Different Paces

1. **Same Learning Path, 4 Members**
   - Learning Path assigned to Members A, B, C, D
   - All start with status: Pending

2. **Divergent Progress**
   - Week 1:
     - Member A: Starts immediately → In Progress (10%)
     - Members B, C, D: Still Pending
   - Week 2:
     - Member A: In Progress (40%)
     - Member B: Starts → In Progress (5%)
     - Members C, D: Still Pending
   - Week 3:
     - Member A: Finishes → Finished
     - Member B: In Progress (35%)
     - Member C: Starts → In Progress (10%)
     - Member D: Still Pending
   - Week 4:
     - Member A: Finished (complete)
     - Member B: Finishes → Finished
     - Member C: In Progress (60%)
     - Member D: Starts → In Progress (5%)

3. **Family Council Monitoring**
   - Sees all 4 statuses independently
   - Can identify Member D as slow to engage
   - Can celebrate Member A's early completion
   - Can support Member C through middle phase

---

## 🎯 Business Rules

### BR-001: Three-Status System
- Only three valid statuses: Pending, In Progress, Finished
- No additional status values allowed
- Each status has specific meaning and transition criteria

### BR-002: Status Progression (One-Way)
- Status flow: Pending → In Progress → Finished
- Status cannot move backwards at any point
- No status skipping (must go through all three stages)
- System enforces progression at database constraint level

### BR-003: Automatic Transitions
- Pending → In Progress: triggered by Family Member first engagement
- In Progress → Finished: triggered by completion of all modules
- No manual status setting by Family Council or Advisor
- Transitions based solely on Family Member actions

### BR-004: Progress Definition
- Progress measured by module completion count
- Formula: (Completed Modules / Total Modules) × 100%
- Module considered complete when all content viewed and activities finished
- Progress tracked per module, not per resource within module

### BR-005: Completion Criteria
- Learning Path considered Finished when ALL modules marked complete
- Partial completion does NOT trigger Finished status
- 100% progress required for status: Finished
- No exceptions or manual overrides

### BR-006: Independent Per-Member Tracking
- Each Family Member has separate status record
- Same Learning Path assigned to multiple members = multiple status records
- No shared or collective status
- Each member's progress independent of others

### BR-007: Status Visibility (Family Portal Only)
- All status information (Pending/In Progress/Finished) visible ONLY on Family Portal
- Family Council sees all Family Members' statuses
- Family Members see only their own status
- No status information shared outside Family Portal

### BR-008: Advisor Portal Restriction
- Advisor Portal does NOT display any status information
- Advisors see only assignment counts (aggregate numbers)
- No progress percentages visible to Advisors
- No individual Family Member status visible to Advisors
- Privacy maintained for family internal development

### BR-009: Status Permanence
- Status records preserved permanently (no deletion)
- Finished status cannot be reset or reversed
- Historical status data maintained for analytics
- Audit trail of all status changes preserved

### BR-010: Notification Requirements
- Family Council notified when member status changes to In Progress
- Family Council notified when member status changes to Finished
- Family Member notified when status changes to Finished (completion)
- Advisor does NOT receive status change notifications

---

## 🎨 UI/UX Requirements

### Family Portal: Learning Path Detail View (Family Council)

**Assignments Section:**
- Table or card view of all assigned Family Members
- Per member shows:
  - Name
  - Status badge (color-coded: yellow=Pending, blue=In Progress, green=Finished)
  - Progress bar with percentage
  - Assignment date
  - Start date (if In Progress or Finished)
  - Completion date (if Finished)
  - Time to completion (if Finished)
- Sort options: by status, by progress, by name, by date
- Filter options: show only Pending / In Progress / Finished

**Status Badge Visual Design:**
- Pending: Yellow/Amber badge, "Pending" text
- In Progress: Blue badge, "In Progress" text, progress % shown
- Finished: Green badge, "Finished" text, completion date shown

### Family Portal: My Learning Paths (Family Member View)

**Assigned Learning Paths List:**
- Each Learning Path card shows:
  - Name and description
  - Current status badge
  - Progress bar with "X of Y modules completed"
  - "Continue" button (if In Progress)
  - "Start" button (if Pending)
  - "Review" button (if Finished)

**Learning Path Detail (In Progress):**
- Module list with completion checkmarks
- Current module highlighted
- "Next Module" primary action button
- Progress summary at top
- Estimated time remaining

**Completion Screen (Status: Finished):**
- Celebratory design (confetti animation optional)
- "Congratulations!" headline
- Learning Path name
- Completion date
- Time taken (X days/weeks)
- "View Certificate" button (optional)
- "Return to My Learning Paths" action

### Family Portal: Learning Paths Overview Dashboard (Family Council)

**Aggregate Statistics Panel:**
- Total Assignments: [count]
- Status Distribution:
  - Pending: [count] ([%])
  - In Progress: [count] ([%])
  - Finished: [count] ([%])
- Engagement Rate: [%] (started / assigned)
- Completion Rate: [%] (finished / assigned)
- Average Time to Completion: [X days]

**Visual Analytics:**
- Pie chart: status distribution
- Bar chart: progress distribution (0-25%, 26-50%, 51-75%, 76-100%)
- Timeline: completions over time
- Leaderboard: top completing members (optional)

### Advisor Portal: Assignment Count Only

**Learning Path Detail View:**
- "Assigned to [N] members across families" (count only)
- No status breakdown visible
- No progress information
- Simple aggregate number only

### Notifications

**To Family Council (Member Started):**
- "[Member Name] started Learning Path '[LP Name]'"
- Icon: blue play/start icon
- Link: "View progress"

**To Family Council (Member Completed):**
- "[Member Name] completed Learning Path '[LP Name]' in [X days]! 🎉"
- Icon: green checkmark/completion icon
- Link: "View completion details"

**To Family Member (Completion):**
- "Congratulations! You completed Learning Path '[LP Name]'"
- Icon: celebration/trophy icon
- Link: "View completion summary"

---

## 🔌 Integration Points

### Learning Path Content System
- Module completion tracking
- Content engagement detection (module viewed, activities completed)
- Progress calculation based on module structure
- Last activity timestamp recording

### Status Management Service
- Status transition logic
- Status validation (prevent backward movement)
- Status persistence database
- Audit trail logging

### Notification Service
- Status change event detection
- Multi-recipient notification dispatch
- Notification templates for different status transitions

### Analytics Service
- Aggregate status calculations
- Engagement rate computation
- Completion rate computation
- Time-to-completion analytics

### Family Portal UI
- Real-time status display updates
- Progress bar rendering
- Status badge components
- Dashboard analytics visualization

---

## 📊 Success Metrics

### Status Progression Metrics
- Pending → In Progress conversion rate (% of assignments started)
- Time from assignment to first engagement (avg days)
- In Progress → Finished conversion rate (% of started Learning Paths completed)
- Average time to completion (days from assignment to Finished)

### Engagement Metrics
- Overall engagement rate: (In Progress + Finished) / Total Assignments
- Completion rate: Finished / Total Assignments
- Stalled progress rate: In Progress for > 30 days without progress
- Active learning rate: assignments with progress in last 7 days

### Progress Tracking
- Average progress percentage across all In Progress assignments
- Distribution of progress (0-25%, 26-50%, 51-75%, 76-100%)
- Module completion velocity (modules per week)

### Family Council Usage
- Frequency of Family Council viewing status dashboards
- Most monitored Learning Paths
- Time spent reviewing member progress

### Technical Performance
- Status transition latency (< 500ms)
- Real-time update delivery (< 2 seconds)
- Notification delivery success rate (> 99%)

---

## 🚫 Out of Scope

The following items are explicitly NOT included in this story:

- Manual status setting by Family Council or Advisor
- Status reset or reversal functionality
- Pausing or suspending Learning Paths
- Assignment extensions or deadline management
- Learning Path difficulty ratings
- Member comparison or ranking beyond simple leaderboards
- Detailed learning analytics (time spent per module, resource engagement)
- Integration with external learning management systems
- Certification or credentialing system (beyond basic completion)
- Gamification elements (points, badges, levels) beyond completion recognition
- Social features (comments, discussions on Learning Paths)
- Peer reviews or assessments
- Learning recommendations based on status
- Predictive completion analytics

---

## 📝 Notes

### Technical Complexity Drivers (Why 8 SP)

1. **Status Transition Logic** (3 SP)
   - Automatic transition detection
   - State machine implementation (3 states, 2 transitions)
   - Non-reversibility enforcement
   - Database constraints for status integrity

2. **Progress Tracking System** (3 SP)
   - Module completion detection
   - Progress percentage calculation
   - Real-time progress updates
   - Last activity timestamp management

3. **Multi-View Status Display** (1 SP)
   - Family Council comprehensive view
   - Family Member personal view
   - Advisor Portal restriction enforcement
   - Dashboard analytics rendering

4. **Notifications & Audit** (1 SP)
   - Status change notifications
   - Completion notifications
   - Audit trail logging

### Assumptions
- Module completion criteria clearly defined in Learning Path structure (EPIC-009)
- Content engagement tracking infrastructure exists or can be built
- Real-time or near real-time updates feasible with current architecture
- Database can efficiently query aggregate status statistics
- Family Portal has charting/visualization library available

### Implementation Considerations

**Status Detection:**
- "Started" = Family Member clicks "Start" OR views first module content
- "Completed" = All modules marked complete (viewed all content, finished all activities)
- Module completion = viewed all resources + completed any quizzes/activities (if present)

**Progress Persistence:**
- Progress saved continuously (not just on completion)
- Family Member can close browser and resume later
- Progress survives session timeouts
- No data loss during transitions

### Edge Cases to Handle
- Family Member completes modules out of order (some Learning Paths allow this)
- Multiple devices (Family Member works on phone and laptop)
- Network interruptions during module completion
- Rapid status changes (member completes entire Learning Path in one session)

### Questions for Clarification
- [Dependencies section - to be filled later]

### Related Documentation
- Story 4: Learning Path Sharing (prerequisite)
- Story 5: Learning Path Assignment (prerequisite)
- EPIC-009: Learning Path Framework
- Module completion criteria specification
- Analytics database schema

---

**Story Owner:** [To be assigned]  
**Created:** 2025-11-20  
**Last Updated:** 2025-11-20