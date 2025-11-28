# [Story ID]: Learning Path Assignment & Progress Tracking

---

## 📋 Basic Information

**Issue Type:** User Story  
**Project:** FG  
**Parent Epic:** FG-EPIC-023 (Template Exchange System - Technical Architecture)  
**Story Name:** Learning Path Assignment & Progress Tracking  
**Summary:** As a Family Council member or authorized Advisor, I want to assign shared Learning Paths to Family Members and track their progress independently, so that family education can be managed effectively without status synchronization to Advisor Portal  

**Labels:** learning-path, assignment, progress-tracking, education, family-portal  
**Components:** Learning Path Service, Assignment Service, Progress Tracking Service, Education Service  
**Priority:** Medium  
**Story Points:** 8  
**Sprint:** TBD  
**Assignee:** [TBD]

---

## 👤 User Story

**As a:** Family Council member or authorized Advisor  
**I want to:** Assign Learning Paths to Family Members and track their independent progress  
**So that:** Family education is managed effectively with each member having their own learning journey, without status updates syncing back to Advisor Portal

---

## 🎯 Acceptance Criteria

### AC1: Assignment Permission - Family Council
**Given** I am a Family Council member  
**When** I view shared Learning Paths in Education section  
**Then** I should see "Assign to Members" button on all Learning Paths  
**And** I should be able to assign any Learning Path regardless of who created it  
**And** assignment capability should work for both Advisor-shared and Family-created Learning Paths

---

### AC2: Assignment Permission - Advisor (Edit Linked)
**Given** I am an Advisor with "Edit (linked)" permission  
**And** I am logged into Family Portal  
**When** I view Learning Paths in Education section  
**Then** I should see "Assign to Members" button ONLY on Learning Paths I created  
**And** Learning Paths are filtered by: `created_by` = my Advisor ID  
**And** I should NOT see assignment option on Learning Paths created by others  
**And** system uses creator marker to determine assignment rights

---

### AC3: Assignment Permission - Advisor (Full Access)
**Given** I am an Advisor with "Full access" permission  
**And** I am logged into Family Portal  
**When** I view Learning Paths in Education section  
**Then** I should see "Assign to Members" button on all Learning Paths  
**And** I can assign any Learning Path in the family (similar to Family Council)  
**And** no creator marker filtering applied

---

### AC4: Assignment Permission - View Only
**Given** I am an Advisor with "View only" permission  
**Or** I am a Family Member (non-Council)  
**When** I view Learning Paths in Education section  
**Then** I should NOT see "Assign to Members" button  
**And** I can only view Learning Paths  
**And** if assigned to me, I can start and complete my own Learning Paths

---

### AC5: Member Selection Interface
**Given** I have assignment permission  
**And** I click "Assign to Members" on a Learning Path  
**When** the assignment dialog opens  
**Then** I should see list of all Family Members (excluding myself if I'm a member)  
**And** each member should display: name, photo, role, current assignments count  
**And** I should be able to select multiple members (checkbox selection)  
**And** I should see indication if member is already assigned to this Learning Path  
**And** I should see "Assign" and "Cancel" buttons

---

### AC6: Multi-Member Assignment
**Given** I have selected multiple Family Members  
**And** I click "Assign"  
**When** the system processes the assignment  
**Then** the system should create separate assignment record for each member  
**And** each assignment should have independent status: "pending"  
**And** each assignment should have unique assignment ID  
**And** each member should have their own progress tracking  
**And** assignments should be created atomically (all succeed or all fail)

---

### AC7: Assignment Notification to Members
**Given** a Learning Path has been assigned to Family Members  
**When** assignment completes  
**Then** each assigned member should receive notification:
- "You have been assigned: [Learning Path Title] by [Assigner Name]"
- Notification includes: Learning Path description, module count, estimated duration
- Notification includes "Start Learning Path" link
**And** notifications sent via email and in-app  
**And** notification should NOT be sent to Advisor Portal

---

### AC8: Assignment Display on Member Portal
**Given** I am a Family Member with assigned Learning Path  
**When** I view my Education section  
**Then** I should see "My Learning Paths" subsection  
**And** assigned Learning Path should appear with:
- Title and description
- Status: "Pending" badge
- Module count and estimated duration
- Assigned by: [Name] on [Date]
- "Start Learning Path" button
**And** Learning Paths should be sorted by assignment date (newest first)

---

### AC9: Starting Learning Path
**Given** I have a Learning Path with status "pending"  
**When** I click "Start Learning Path"  
**Then** the system should change status to "in_progress"  
**And** the system should record start timestamp  
**And** the Learning Path should open with first module displayed  
**And** status badge should change from "Pending" to "In Progress"  
**And** progress indicator should appear (e.g., "0 of 10 modules completed")

---

### AC10: Module and Lesson Progress Tracking
**Given** I am working through a Learning Path  
**When** I complete lessons and modules  
**Then** the system should track:
- Lessons completed (per module)
- Modules completed (per Learning Path)
- Time spent (per lesson, per module)
- Last accessed timestamp
**And** progress should be saved automatically  
**And** I should be able to pause and resume anytime  
**And** progress should persist across sessions

---

### AC11: Marking Learning Path as Complete
**Given** I have completed all modules and lessons  
**And** Learning Path status is "in_progress"  
**When** I click "Mark as Complete" button  
**Then** the system should change status to "finished"  
**And** the system should record completion timestamp  
**And** status badge should change to "Completed"  
**And** I should see success message: "Congratulations! You completed [Learning Path Title]"  
**And** Learning Path should move to "Completed" section in my portal

---

### AC12: Status Progression Rules
**Given** a Learning Path assignment exists  
**When** status changes occur  
**Then** the system should enforce status progression:
- "pending" → "in_progress" (when member starts)
- "in_progress" → "finished" (when member completes)
- NO reversals allowed (cannot go from "finished" to "in_progress")
- NO skipping allowed (cannot go from "pending" to "finished")
**And** only the assigned member can update their own status  
**And** status changes are logged in audit trail

---

### AC13: Independent Status Tracking
**Given** the same Learning Path is assigned to multiple members  
**When** each member works on the Learning Path  
**Then** each member should have completely independent status:
- Member A: "pending", Member B: "in_progress", Member C: "finished"
- Progress tracking is per-member, per-assignment
- One member's progress does NOT affect others
**And** each member sees only their own progress  
**And** no cross-member status visibility (unless Council views analytics)

---

### AC14: No Status Sync to Advisor Portal
**Given** Family Members are working on assigned Learning Paths  
**When** status changes occur (pending → in_progress → finished)  
**Then** the system should NOT sync status updates to Advisor Portal  
**And** Advisor Portal should NOT show:
- Assignment status
- Progress tracking
- Completion status
**And** all progress data remains on Family Portal only  
**And** Advisor's original Learning Path status remains "shared" permanently

---

### AC15: Family Council Analytics View
**Given** I am a Family Council member  
**When** I view Learning Path analytics  
**Then** I should see aggregated data:
- Total assignments per Learning Path
- Completion rate (finished / total assigned)
- Average time to complete
- Current status breakdown (pending, in_progress, finished)
- Per-member progress (list view)
**And** I should be able to filter by: Learning Path, Member, Status, Date Range  
**And** analytics should update in real-time as members make progress

---

### AC16: Assignment Cancellation
**Given** I am Family Council member or the Advisor who created the Learning Path  
**And** a Learning Path is assigned to a member with status "pending"  
**When** I click "Cancel Assignment"  
**Then** the system should display confirmation: "Remove [Learning Path] from [Member Name]'s assignments?"  
**And** if confirmed:
- Assignment record deleted
- Member receives notification: "Learning Path assignment cancelled"
- Learning Path removed from member's portal
**And** cancellation only allowed for "pending" status  
**And** cannot cancel "in_progress" or "finished" assignments

---

### AC17: Re-Assignment Support
**Given** a member has "finished" a Learning Path  
**When** I attempt to assign the same Learning Path to the same member again  
**Then** the system should allow re-assignment  
**And** system creates new assignment record (separate from finished one)  
**And** new assignment starts with status "pending"  
**And** previous "finished" assignment remains in history  
**And** member sees both assignments (finished and new pending) in their portal

---

### AC18: Assignment History Tracking
**Given** assignments are created, updated, or cancelled  
**When** any assignment action occurs  
**Then** the system should create audit log entry with:
- Assignment ID
- Learning Path ID
- Member ID
- Action (assigned, started, completed, cancelled)
- Performed by (user ID)
- Timestamp
**And** assignment history visible to Family Council  
**And** history shows: "[Member] was assigned [Learning Path] by [Assigner] on [Date]"

---

### AC19: Error Handling - Assignment Failure
**Given** I attempt to assign Learning Path to members  
**When** assignment creation fails (e.g., database error)  
**Then** the system should rollback all assignment records  
**And** no partial assignments should be created  
**And** I should see error: "Failed to assign Learning Path. Please try again."  
**And** I should be able to manually retry assignment

---

### AC20: Progress Persistence and Recovery
**Given** a member is working on a Learning Path  
**When** they close browser or lose connection  
**Then** all progress should be auto-saved  
**And** when member returns:
- Learning Path status preserved
- Module/lesson progress preserved
- Last position bookmarked
- Member can resume from where they left off
**And** no progress should be lost due to technical issues

---

## 📊 Business Rules

### BR1: Assignment Permission Hierarchy
- **Family Council:** Can assign any Learning Path to any member
- **Advisor (Full access):** Can assign any Learning Path to any member
- **Advisor (Edit linked):** Can assign only Learning Paths they created (creator marker check)
- **Advisor (View only):** Cannot assign
- **Family Members (non-Council):** Cannot assign to others, can only work on their own assignments

### BR2: Creator Marker for Assignment Rights (Advisors)
- Advisor with "Edit (linked)" uses creator marker to filter assignable Learning Paths
- Query filter: `created_by` = Advisor ID
- Only Learning Paths matching creator marker are assignable by that Advisor
- Family Council bypasses creator marker filtering

### BR3: Multi-Member Assignment
- Same Learning Path can be assigned to multiple members simultaneously
- Each assignment is independent (separate assignment ID)
- Each member has their own status tracking
- Assignments created atomically (all succeed or all fail)

### BR4: Status Progression
- Status flow: pending → in_progress → finished (one-way, no reversals)
- Only assigned member can update their own status
- No skipping statuses (must progress sequentially)
- Status changes are immutable (logged in audit trail)

### BR5: Independent Progress Tracking
- Each assignment has its own progress data (modules, lessons, timestamps)
- One member's progress does NOT affect another member's progress
- Progress is private to the assigned member (unless Council views analytics)
- No cross-member visibility of progress

### BR6: No Status Synchronization
- Learning Path progress does NOT sync to Advisor Portal
- Advisor Portal shows original Learning Path with permanent "shared" status
- All assignment and progress data remains on Family Portal only
- Advisor cannot see which members are assigned or their progress

### BR7: Assignment Cancellation Rules
- Only "pending" assignments can be cancelled
- "in_progress" and "finished" assignments cannot be cancelled (preserved in history)
- Family Council can cancel any assignment
- Advisor can cancel only assignments for Learning Paths they created (if Edit linked)

### BR8: Re-Assignment Support
- Same Learning Path can be re-assigned to same member multiple times
- Each assignment is separate record with own history
- Previous "finished" assignments remain visible in history
- Enables refresher courses or periodic training

### BR9: Progress Auto-Save
- Progress auto-saved every 30 seconds during active session
- Progress saved on lesson completion, module completion
- Progress saved on browser close (beforeunload event)
- No progress lost due to technical issues

### BR10: Assignment Atomicity
- Multi-member assignment is atomic transaction
- All assignments created together or all fail together
- No partial assignment states
- Notifications sent only after successful assignment creation

---

## 🔗 Dependencies

**Depends On:**
- FG-XXX-04: Learning Path Sharing (Learning Paths must be shared before assignment)

**Blocks:**
- None

**Related Stories:**
- FG-XXX-02: Constitution Cross-Portal Editing (similar permission-based access model)

---

## 🎨 User Experience Flow

### Assignment Flow (Family Council):
1. Family Council member logs into Family Portal
2. Navigates to Education > Learning Paths
3. Sees list of shared Learning Paths:
   - "Financial Literacy for Next Gen" (shared by Advisor Smith)
   - "Board Leadership Fundamentals" (shared by Advisor Jones)
4. Clicks "Assign to Members" on Financial Literacy path
5. Assignment dialog opens with member selection:
   - ☐ Emma Johnson (2 active assignments)
   - ☐ Michael Johnson (1 active assignment)
   - ☐ Sofia Rodriguez (0 active assignments)
6. Selects Emma and Sofia (checkboxes)
7. Clicks "Assign"
8. System creates 2 independent assignments (both status: "pending")
9. Emma and Sofia receive notifications
10. Success message: "Learning Path assigned to 2 members"

### Learning Journey Flow (Member):
1. Emma receives notification: "You've been assigned Financial Literacy..."
2. Emma logs into Family Portal
3. Navigates to Education > My Learning Paths
4. Sees assigned Learning Path:
   - Title: "Financial Literacy for Next Gen"
   - Status: "Pending"
   - Modules: 8, Duration: ~6 hours
   - Assigned by: John Smith (Family Council) on Nov 27
5. Emma clicks "Start Learning Path"
6. Status changes to "In Progress"
7. First module opens: "Introduction to Investment Basics"
8. Emma completes lessons in module 1
9. Progress saved: "Module 1 of 8 completed"
10. Emma pauses (closes browser)
11. Next day: Emma returns, resumes from Module 2
12. Over next 2 weeks: Emma completes all 8 modules
13. Emma clicks "Mark as Complete"
14. Status changes to "Finished"
15. Success message: "Congratulations! You completed Financial Literacy"
16. Learning Path moves to "Completed" section

### Assignment Flow (Advisor with Edit Linked):
1. Advisor Smith logs into Family Portal (has "Edit linked" permission)
2. Navigates to Education > Learning Paths
3. Sees ONLY Learning Paths they created:
   - "Financial Literacy for Next Gen" (my creation) - "Assign" button ✓
   - NOT showing: "Board Leadership" (created by Advisor Jones)
4. Clicks "Assign to Members" on their Learning Path
5. Selects Michael Johnson
6. Clicks "Assign"
7. Michael receives notification
8. Advisor can see assignment was created (via Family Portal view)
9. Advisor CANNOT see Michael's progress updates
10. No status sync back to Advisor Portal

### Analytics Flow (Family Council):
1. Family Council member views Learning Path analytics dashboard
2. Sees overview:
   - "Financial Literacy": 2 assigned, 1 finished (50% completion rate)
   - "Board Leadership": 1 assigned, 0 finished (0% completion rate)
3. Clicks into "Financial Literacy" details:
   - Emma Johnson: Finished (completed Nov 30, took 12 days)
   - Sofia Rodriguez: In Progress (started Nov 28, 3 of 8 modules done)
4. Can drill into Sofia's progress to see which modules completed
5. Analytics update in real-time as Sofia makes progress

---

## 💡 Additional Context

### Why Permission-Based Assignment?
- Family Council needs full control (can assign anything)
- Trusted Advisors with "Full access" can help with education management
- Advisors with "Edit linked" limited to their own content (maintains creator authority)
- Prevents unauthorized assignment of Learning Paths

### Why Independent Status Tracking?
- Each member learns at their own pace
- No pressure from seeing others' progress
- Privacy for individual learning journeys
- Enables personalized education paths

### Why No Status Sync to Advisor Portal?
- Protects family privacy (Advisor doesn't see who's assigned)
- Assignment and progress is family's internal business
- Advisor's original Learning Path is independent (one-way copy architecture)
- Simpler system (no bidirectional synchronization)

### Why Allow Re-Assignment?
- Members may want refresher courses
- Periodic training requirements
- Different members may complete at different times
- Flexible education management

### Technical Complexity:
- Multi-member assignment requires atomic transaction
- Independent progress tracking needs separate data structures per assignment
- Permission filtering for Advisors requires indexed creator marker queries
- Auto-save requires reliable background tasks
- Analytics aggregation across multiple assignments

---

## 📝 Notes for Implementers

### Assignment Table Schema:
```sql
CREATE TABLE learning_path_assignments (
  id UUID PRIMARY KEY,
  learning_path_id UUID NOT NULL,
  family_id UUID NOT NULL,
  member_id UUID NOT NULL,
  assigned_by UUID NOT NULL,
  assigned_at TIMESTAMP NOT NULL,
  status VARCHAR(20) NOT NULL, -- pending, in_progress, finished
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  progress_data JSONB, -- modules/lessons completed
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  
  FOREIGN KEY (learning_path_id) REFERENCES learning_paths(id),
  FOREIGN KEY (member_id) REFERENCES family_members(id),
  FOREIGN KEY (assigned_by) REFERENCES users(id),
  
  INDEX idx_member_assignments (member_id, status),
  INDEX idx_learning_path_assignments (learning_path_id, family_id)
);
```

### Permission Check for Assignment (Advisor):
```python
def can_assign_learning_path(
    user_id: UUID,
    user_type: str,
    learning_path_id: UUID,
    db: Session
) -> bool:
    """
    Check if user can assign Learning Path
    """
    learning_path = db.query(LearningPath).get(learning_path_id)
    
    # Family Council can assign any
    if user_type == "family_council":
        return True
    
    # Advisors need permission check
    if user_type == "advisor":
        permissions = get_advisor_permissions(user_id, learning_path.family_id)
        
        # Full access can assign any
        if permissions.education_access == "full":
            return True
        
        # Edit linked can assign only their creations
        if permissions.education_access == "edit_linked":
            return learning_path.created_by == user_id
    
    return False
```

### Multi-Member Assignment (Atomic):
```sql
BEGIN TRANSACTION;

-- Create assignment for each selected member
INSERT INTO learning_path_assignments (
  id, learning_path_id, family_id, member_id, 
  assigned_by, assigned_at, status
)
VALUES
  (gen_random_uuid(), $lp_id, $family_id, $member1_id, $assigner_id, NOW(), 'pending'),
  (gen_random_uuid(), $lp_id, $family_id, $member2_id, $assigner_id, NOW(), 'pending'),
  (gen_random_uuid(), $lp_id, $family_id, $member3_id, $assigner_id, NOW(), 'pending');

-- Create audit log entries
INSERT INTO audit_log (entity_type, entity_id, action, user_id, timestamp)
SELECT 'learning_path_assignment', id, 'assigned', $assigner_id, NOW()
FROM learning_path_assignments
WHERE learning_path_id = $lp_id 
  AND assigned_by = $assigner_id
  AND assigned_at = NOW();

COMMIT;
-- On error: ROLLBACK
```

### Progress Tracking Data Structure:
```json
{
  "progress_data": {
    "modules": [
      {
        "module_id": "uuid-1",
        "module_order": 1,
        "status": "completed",
        "completed_at": "2025-11-28T14:30:00Z",
        "time_spent_seconds": 3600,
        "lessons": [
          {
            "lesson_id": "uuid-1-1",
            "lesson_order": 1,
            "status": "completed",
            "completed_at": "2025-11-28T13:45:00Z",
            "time_spent_seconds": 1200
          },
          {
            "lesson_id": "uuid-1-2",
            "lesson_order": 2,
            "status": "completed",
            "completed_at": "2025-11-28T14:30:00Z",
            "time_spent_seconds": 1800
          }
        ]
      },
      {
        "module_id": "uuid-2",
        "module_order": 2,
        "status": "in_progress",
        "lessons": [
          {
            "lesson_id": "uuid-2-1",
            "lesson_order": 1,
            "status": "completed",
            "completed_at": "2025-11-29T10:15:00Z"
          },
          {
            "lesson_id": "uuid-2-2",
            "lesson_order": 2,
            "status": "not_started"
          }
        ]
      }
    ],
    "last_accessed_at": "2025-11-29T10:15:00Z",
    "total_time_spent_seconds": 5400
  }
}
```

### Auto-Save Progress:
```javascript
// Frontend: Auto-save timer
let progressAutoSave;

const startProgressAutoSave = (assignmentId) => {
  progressAutoSave = setInterval(async () => {
    await saveProgress(assignmentId, getCurrentProgress());
  }, 30000); // 30 seconds
};

// Save on lesson/module completion
const onLessonComplete = async (assignmentId, lessonId) => {
  const progress = getCurrentProgress();
  progress.lessons[lessonId].status = 'completed';
  progress.lessons[lessonId].completed_at = new Date().toISOString();
  
  await saveProgress(assignmentId, progress);
};

// Save on browser close
window.addEventListener('beforeunload', async (e) => {
  await saveProgress(assignmentId, getCurrentProgress());
});
```

### Status Progression Validation:
```python
def update_assignment_status(
    assignment_id: UUID,
    new_status: str,
    db: Session
) -> bool:
    """
    Update assignment status with validation
    """
    assignment = db.query(Assignment).get(assignment_id)
    current_status = assignment.status
    
    # Validate status progression
    valid_transitions = {
        'pending': ['in_progress'],
        'in_progress': ['finished'],
        'finished': []  # Terminal state
    }
    
    if new_status not in valid_transitions.get(current_status, []):
        raise ValueError(f"Invalid status transition: {current_status} -> {new_status}")
    
    # Update status
    assignment.status = new_status
    
    if new_status == 'in_progress':
        assignment.started_at = datetime.utcnow()
    elif new_status == 'finished':
        assignment.completed_at = datetime.utcnow()
    
    db.commit()
    return True
```

### Analytics Query:
```sql
-- Get Learning Path completion statistics
SELECT 
  lp.id,
  lp.title,
  COUNT(lpa.id) as total_assigned,
  COUNT(CASE WHEN lpa.status = 'finished' THEN 1 END) as completed_count,
  ROUND(
    COUNT(CASE WHEN lpa.status = 'finished' THEN 1 END)::NUMERIC / 
    NULLIF(COUNT(lpa.id), 0) * 100, 
    2
  ) as completion_rate,
  AVG(
    CASE 
      WHEN lpa.status = 'finished' 
      THEN EXTRACT(EPOCH FROM (lpa.completed_at - lpa.started_at)) / 86400
    END
  ) as avg_days_to_complete
FROM learning_paths lp
LEFT JOIN learning_path_assignments lpa ON lp.id = lpa.learning_path_id
WHERE lp.family_id = $family_id
GROUP BY lp.id, lp.title;
```

### Performance Considerations:
- Index on `(member_id, status)` for fast member assignment queries
- Index on `(learning_path_id, family_id)` for analytics
- Index on `created_by` for Advisor filtering
- Cache permission levels to avoid repeated queries
- Monitor progress save duration
- Set timeout at 10 seconds for assignment operations

---

**Story Owner:** [Product Manager]  
**Created:** 2025-11-27  
**Last Updated:** 2025-11-27