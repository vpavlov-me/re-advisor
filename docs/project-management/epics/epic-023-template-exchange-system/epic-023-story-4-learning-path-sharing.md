# [Story ID]: Learning Path Sharing

---

## 📋 Basic Information

**Issue Type:** User Story  
**Project:** FG  
**Parent Epic:** FG-EPIC-023 (Template Exchange System - Technical Architecture)  
**Story Name:** Learning Path Sharing  
**Summary:** As an External Advisor, I want to share Learning Paths with my client families through one-way content copying, so that families can use my educational content while maintaining independence from my originals  

**Labels:** learning-path, template-exchange, advisor-portal, family-portal, education  
**Components:** Learning Path Service, Education Service, Portal Integration  
**Priority:** Critical  
**Story Points:** 8  
**Sprint:** TBD  
**Assignee:** [TBD]

---

## 👤 User Story

**As an:** External Advisor  
**I want to:** Share Learning Paths with client families  
**So that:** Families can use my educational programs while maintaining complete independence from my original Learning Paths

---

## 🎯 Acceptance Criteria

### AC1: Share Button Availability
**Given** I am an External Advisor on Advisor Portal  
**And** I have created or selected a Learning Path  
**When** I view the Learning Path details  
**Then** I should see a "Share with Family" button  
**And** the button should be enabled regardless of Learning Path completion status  
**And** the button should be available for both draft and published Learning Paths

---

### AC2: Family Selection Interface
**Given** I click "Share with Family" button  
**When** the sharing dialog opens  
**Then** I should see a list of my client families  
**And** each family should display: family name, primary contact  
**And** I should be able to select one family at a time  
**And** I should see a "Confirm Share" button  
**And** I should see a preview of Learning Path content (modules count, estimated duration)

---

### AC3: Copy Creation Process
**Given** I have selected a target family  
**And** I click "Confirm Share"  
**When** the system processes the sharing request  
**Then** the system should create a complete independent copy of the Learning Path  
**And** the copy should include:
- Learning Path title, description, category
- All modules with their content and order
- All lessons within each module
- All resources and materials
- Estimated duration and difficulty level
**And** the copy should preserve all formatting and structure  
**And** the copy should NOT include: assignment history, progress data, completion records  
**And** the operation should complete within 5 seconds for Learning Paths up to 20 modules

---

### AC4: Creator Marker Linkage
**Given** the Learning Path copy is created successfully  
**When** the system saves the shared Learning Path  
**Then** the system should set `created_by` field to my Advisor ID  
**And** the system should set `is_shared_learning_path` flag to `true`  
**And** the system should set `shared_from_advisor_id` to my Advisor ID  
**And** the system should NOT store `original_learning_path_id` reference  
**And** the system should NOT create any live link to my original Learning Path

---

### AC5: Connection Severance
**Given** the shared Learning Path is saved to Family Portal  
**When** the sharing process completes  
**Then** the family's copy should be completely independent  
**And** changes to my original Learning Path should NOT affect the family's copy  
**And** deletion of my original Learning Path should NOT affect the family's copy  
**And** there should be NO bidirectional reference between copies  
**And** module/lesson updates on my side should NOT sync to family's copy

---

### AC6: Learning Path Appears on Family Portal
**Given** the sharing process completed successfully  
**When** Family Council members view the Education section  
**Then** they should see the shared Learning Path in "Learning Paths" subsection  
**And** the Learning Path should display metadata: "Shared by [Advisor Name]"  
**And** the Learning Path should have status: `shared`  
**And** the Learning Path should show: title, description, module count, estimated duration  
**And** the Learning Path should be fully viewable but not yet assigned  
**And** all modules and lessons should be accessible for preview

---

### AC7: Advisor Portal Status Update
**Given** the sharing process completed successfully  
**When** I view my original Learning Path on Advisor Portal  
**Then** my original Learning Path should remain unchanged  
**And** my original Learning Path should show "Shared with: [Family Name]" badge  
**And** the sharing history should log: family name, timestamp  
**And** I should be able to share the same Learning Path with multiple families (unlimited)  
**And** I should still be able to edit or delete my original Learning Path  
**And** my edits should NOT affect any previously shared copies

---

### AC8: Multiple Sharing Support
**Given** I have shared a Learning Path with Family A  
**When** I share the same Learning Path with Family B  
**Then** the system should create a separate independent copy for Family B  
**And** Family A's copy should remain unchanged  
**And** Family B's copy should be independent from both my original and Family A's copy  
**And** each family should have their own creator marker linking to my Advisor ID  
**And** assignments to Family A should NOT appear in Family B's copy

---

### AC9: Error Handling - Copy Failure
**Given** I initiate Learning Path sharing  
**When** the copy creation process fails (e.g., database error, network timeout)  
**Then** the system should rollback any partial changes  
**And** no incomplete Learning Path should appear on Family Portal  
**And** I should see error message: "Failed to share Learning Path. Please try again."  
**And** my original Learning Path should remain unchanged  
**And** I should be able to manually retry the sharing operation

---

### AC10: Error Handling - Permission Validation
**Given** I attempt to share a Learning Path  
**When** I no longer have access to the target family (e.g., service ended)  
**Then** the system should prevent the sharing operation  
**And** I should see error message: "You do not have permission to share with this family"  
**And** the family selection list should not display families where `has_family_access()` returns false  
**And** I should be able to manually retry sharing after resolving access issues

---

### AC11: Audit Trail
**Given** I successfully share a Learning Path  
**When** the sharing completes  
**Then** the system should log an audit entry with:
- Advisor ID
- Original Learning Path ID
- Target family ID
- Timestamp
- Operation: "learning_path_shared"
- Module count and content snapshot
**And** the audit entry should be immutable  
**And** the audit log should be accessible for compliance review

---

### AC12: Content Validation
**Given** I initiate Learning Path sharing  
**When** the system validates the Learning Path content  
**Then** the system should verify:
- Learning Path has at least one module
- All modules have valid content
- All referenced resources are accessible
**And** if validation fails, I should see specific error message  
**And** sharing should be blocked until validation passes

---

## 📊 Business Rules

### BR1: One-Way Copy Architecture
- Sharing creates a complete independent copy, not a live link
- No synchronization between Advisor's original and family's copy
- Each copy can be modified or deleted independently
- Module and lesson updates do not propagate across copies

### BR2: Creator Marker Purpose
- `created_by` field stores Advisor ID for permission filtering
- Creator marker enables "edit (linked)" permission functionality
- Creator marker used for assignment permission checks (Advisor can assign only their Learning Paths)
- Creator marker does NOT imply automatic edit rights (permissions control access)

### BR3: Learning Path Independence
- After sharing, connection between original and copy is severed
- Advisor can modify/delete original without affecting family's copy
- Family can modify/delete shared copy without affecting Advisor's original
- No bidirectional reference stored in database
- Assignment data is family-specific and never shared back

### BR4: Multiple Sharing
- Same Learning Path can be shared with multiple families
- Each sharing creates a separate independent copy
- Each copy maintains its own creator marker linking to same Advisor
- Each family has independent assignment and progress tracking

### BR5: Sharing Permissions
- Only Advisors with active family relationship can share Learning Paths
- Advisor must pass `has_family_access(family_id)` check for target family
- System validates permissions before allowing sharing operation
- Family selection list only shows families where advisor has access

### BR6: Learning Path Status on Family Portal
- Shared Learning Paths always start with status: "shared"
- Status remains "shared" until assigned to Family Member
- Only Family Council or authorized Advisor can assign Learning Paths
- Once assigned, status changes to "pending" for each assigned member

### BR7: Copy Completeness
- Copy includes all modules, lessons, and resources
- Copy preserves formatting, structure, numbering, and order
- Copy includes metadata: title, description, category, duration, difficulty
- Copy does NOT include: assignment history, progress data, completion records, analytics

### BR8: Assignment Readiness
- Shared Learning Paths are immediately available for assignment
- Family Council can assign to any Family Member
- Advisor can assign only if they have appropriate permission (covered in Story FG-XXX-05)
- Multiple Family Members can be assigned the same Learning Path

### BR9: Error Recovery
- Failed sharing operations must rollback completely
- No partial Learning Paths should persist on Family Portal
- Advisor can manually retry failed sharing operations
- System should log detailed error information for debugging

---

## 🔗 Dependencies

**Depends On:**
- [To be filled after discussion]

**Blocks:**
- FG-XXX-05: Learning Path Assignment & Progress Tracking

**Related Stories:**
- FG-XXX-01: Constitution Template Sharing (similar copy mechanism)
- FG-XXX-06: Resource Link Sharing (similar copy mechanism)

---

## 🎨 User Experience Flow

### Advisor Portal Flow:
1. Advisor opens Learning Path they created or selected
2. Advisor reviews modules and lessons
3. Advisor clicks "Share with Family" button
4. Dialog opens showing list of client families
5. Dialog shows Learning Path preview (modules count, duration)
6. Advisor selects target family from list
7. Advisor clicks "Confirm Share"
8. System shows loading indicator "Sharing Learning Path..."
9. Success message appears: "Learning Path shared successfully with [Family Name]"
10. Learning Path now shows "Shared with [Family Name]" badge
11. Advisor can continue editing their original Learning Path

### Family Portal Flow:
1. Family Council member logs into Family Portal
2. Member navigates to Education section
3. Member clicks on "Learning Paths" subsection
4. Shared Learning Path appears in list
5. Learning Path displays: "Shared by [Advisor Name]" on [Date]
6. Member can view full Learning Path content (modules, lessons)
7. Member can preview all materials and resources
8. Member can assign Learning Path to Family Members (separate story: FG-XXX-05)

---

## 💡 Additional Context

### Why One-Way Copy for Learning Paths?
- Families need to customize Learning Paths for their members
- Advisors need freedom to update their original content
- Assignment and progress tracking is family-specific
- Prevents conflicts from bidirectional synchronization
- Simpler architecture for educational content

### Why Creator Marker?
- Enables permission-based filtering (Advisor sees only their Learning Paths)
- Controls assignment permissions (Advisor can assign only their own)
- Maintains attribution for educational content
- Supports "edit (linked)" permission model
- Does NOT create ownership dependency

### Learning Path vs Constitution Template:
- Similar copy mechanism but different content types
- Learning Paths have modules/lessons structure
- No "activation" concept (assignment happens instead)
- Multiple members can be assigned same Learning Path
- Progress tracking is per-member, per-Learning Path

### Technical Implications:
- Copy operation must handle nested structure (modules → lessons)
- Creator marker indexed for fast permission filtering
- No foreign key constraint to original Learning Path
- Audit log captures content snapshot at sharing time
- Assignment table links to family's copy, not Advisor's original

---

## 📝 Notes for Implementers

### Copy Operation Requirements:
- Use database transaction for atomicity
- Validate all modules and lessons copied successfully before commit
- Generate new UUIDs for all copied entities (Learning Path, modules, lessons)
- Preserve content exactly (no transformations)
- Copy module order and lesson order
- Target completion time: < 5 seconds for Learning Paths up to 20 modules

### Creator Marker Implementation:
- Store as `created_by` field (UUID, indexed)
- Store as `shared_from_advisor_id` field (UUID, indexed)
- Set `is_shared_learning_path` boolean flag
- Do NOT store `original_learning_path_id` reference

### Error Handling:
- Catch and rollback on any copy failure
- Log detailed error for debugging (include module/lesson counts)
- Return user-friendly error message
- Ensure original Learning Path remains unchanged
- Support manual retry by user (no automatic retry)

### Performance Considerations:
- Optimize for Learning Paths up to 20 modules
- Target completion time: < 5 seconds
- Consider async processing for very large Learning Paths (>20 modules)
- Monitor copy operation duration
- Set timeout at 10 seconds to prevent hanging operations

### Content Validation:
- Verify at least one module exists
- Check all modules have valid content
- Validate all resource links are accessible
- Block sharing if validation fails
- Provide specific error messages for validation failures

### Data Structure:
```
LearningPath (copy)
├─ id: new UUID
├─ created_by: advisor_id
├─ shared_from_advisor_id: advisor_id
├─ is_shared_learning_path: true
├─ family_id: target_family_id
└─ modules: []
    ├─ Module 1 (new UUID)
    │   └─ lessons: []
    │       ├─ Lesson 1.1 (new UUID)
    │       └─ Lesson 1.2 (new UUID)
    └─ Module 2 (new UUID)
        └─ lessons: []
```

---

**Story Owner:** [Product Manager]  
**Created:** 2025-11-27  
**Last Updated:** 2025-11-27