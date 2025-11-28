# User Story: Advisor Personal Tasks Management

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As an advisor, I want to create and manage personal tasks for my work with each family  
**Epic Link:** FG-XXX [Family Client Management Workspace]  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As an** External Consul or Consultant,  
**I want to** create and manage personal tasks for my work with each family,  
**so that** I can organize my deliverables, track deadlines, and stay on top of commitments.

---

## 🎯 Business Context

**Why is this Story important?**

Advisors work with multiple families simultaneously and need a way to organize their own work, deliverables, and commitments for each family separately. This is a **personal workspace tool** for advisor productivity, not a task assignment tool for families.

**User pain point being solved:**
- Advisors lose track of deliverables across multiple family clients
- No central place to organize work by family context
- Difficulty prioritizing urgent vs. non-urgent work
- Manual tracking in external tools (spreadsheets, paper notes) is inefficient

**Business outcome expected:**
- Improved advisor productivity and organization
- Better delivery quality and deadline adherence
- Enhanced professional accountability
- Reduced risk of missed commitments

**Strategic alignment:**
- Supports advisor success and retention on platform
- Demonstrates platform value beyond family-facing features
- Enables advisors to scale their practice across multiple families

---

## ✅ Acceptance Criteria

1. **Given** I am logged in as an advisor and viewing a Family Workspace,  
   **When** I navigate to the "Tasks" section in sidebar,  
   **Then** I see a list of my personal tasks for this family in card-based layout.

2. **Given** I am in the Tasks section,  
   **When** I click "Create Task" button,  
   **Then** a task creation form opens with fields: Title (required), Description (optional), Due Date (optional), Priority dropdown (High/Medium/Low, default: Medium), Status dropdown (To Do/In Progress/Done, default: To Do).

3. **Given** I fill in task creation form,  
   **When** I save the task,  
   **Then** new task card appears in the list with all attributes displayed.

4. **Given** I have created tasks,  
   **When** I view task cards,  
   **Then** each card displays: Title, Description (if provided), Due Date (if set), Priority badge (color-coded), Status badge.

5. **Given** I click on a task card,  
   **When** task details open,  
   **Then** I can edit any attribute, change status, or delete the task.

6. **Given** I have multiple tasks,  
   **When** I use the filter dropdown,  
   **Then** I can filter tasks by: All Tasks / To Do / In Progress / Done.

7. **Given** I create a task for Family A,  
   **When** I switch to Family B's workspace,  
   **Then** I see only tasks I created for Family B (tasks are scoped per family).

8. **Given** I am an advisor,  
   **When** I create a task,  
   **Then** this task is **private** and not visible to the family members.

**Additional Criteria:**
- [ ] Due date highlights tasks that are overdue (past due date) with visual indicator
- [ ] Priority is visually distinguished (e.g., High = red badge, Medium = yellow, Low = green)
- [ ] Status changes update card appearance (e.g., Done tasks have strikethrough or different styling)
- [ ] Empty state message when no tasks exist yet: "No tasks yet. Create your first task to get organized."
- [ ] Tasks are sorted by: overdue first, then by due date ascending, then by priority

---

## 📐 Design & UX

**User Flow:**
1. Advisor opens Family Workspace for Family X
2. Clicks "Tasks" in left sidebar
3. Sees list of personal tasks (card-based layout)
4. Clicks "Create Task" button
5. Fills in form: Title, Description, Due Date, Priority, Status
6. Saves task
7. New task card appears in list
8. Can click card to edit/delete or change status via dropdown on card
9. Uses filter dropdown to view specific status tasks

---

## 🔒 Business Rules

**Validation Rules:**
1. **Title**: Required field, max 200 characters
2. **Description**: Optional, max 2000 characters
3. **Due Date**: Must be valid date format, can be past or future (advisor may track overdue items)
4. **Priority**: Must be one of: High, Medium, Low (default: Medium)
5. **Status**: Must be one of: To Do, In Progress, Done (default: To Do)

**Authorization:**
- **Who can create tasks:** External Consul, Consultant, Personal Family Advisor (any advisor role)
- **Who can view tasks:** Only the advisor who created them (private workspace)
- **Who can edit/delete:** Only the advisor who created them

**Edge Cases:**
- **No tasks yet**: Show empty state with "Create Task" CTA
- **Task overdue**: Display visual indicator (e.g., red due date)
- **Task completed (Done)**: Keep in list but apply different styling (e.g., strikethrough title)
- **Switching families**: Tasks list updates to show only tasks for current family
- **Deleting task**: Prompt confirmation before deletion

---

## 🧪 Test Scenarios

**Happy Path:**
1. Advisor logs in → opens Family A workspace → clicks Tasks section
2. Clicks "Create Task" → fills Title "Prepare succession report", Due Date "March 15", Priority "High", Status "To Do"
3. Saves task → task card appears with all attributes displayed
4. Clicks task card → edits Description → saves → description updates
5. Changes Status to "In Progress" via dropdown → badge updates
6. Uses filter "In Progress" → sees only in-progress tasks
7. Marks task as "Done" → task styling changes (strikethrough)

**Negative Tests:**
1. **Empty Title**: Attempt to save task without Title → validation error "Title is required"
2. **Invalid characters**: Enter special characters exceeding limits → validation prevents
3. **No tasks**: Navigate to Tasks section for family with no tasks → sees empty state message

**Edge Cases:**
1. **Overdue task**: Create task with past due date → task displays with red/overdue indicator
2. **Cross-family isolation**: Create task for Family A, switch to Family B → Family A task not visible in Family B tasks
3. **Delete task**: Click delete → confirmation prompt → confirm → task removed from list
4. **Filter edge case**: No tasks match filter (e.g., filter "Done" when all tasks are "To Do") → empty state "No done tasks yet"

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Task list loads in < 1 second
- Task creation/update response time < 500ms

**Security:**
- Tasks are strictly isolated per advisor (no cross-advisor visibility)
- Tasks scoped to family (advisor sees only tasks for current family workspace)

**Accessibility:**
- Keyboard navigation for task creation form
- Screen reader support for task status and priority badges
- WCAG AA compliance

**Browser Support:**
- Chrome: Latest version
- Safari: Latest version
- Firefox: Latest version

---

## 📝 Notes

**Open Questions:**
- [x] **Kanban vs List view** - Решено: Card-based layout (как на скрине)
- [x] **Notifications** - Решено: No notifications at this stage, advisor manually manages
- [x] **Integration with Task Service** - Решено: NOT integrated with Task Service (port 8016), separate entity
- [x] **Recurring tasks** - Решено: Not in scope for this story
- [x] **Task attachments** - Решено: Not in scope for this story
- [x] **Task search** - Решено: Future enhancement (not in this story)
- [x] **Export tasks to CSV** - Решено: Not needed

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-23  
**Status:** Ready for Grooming