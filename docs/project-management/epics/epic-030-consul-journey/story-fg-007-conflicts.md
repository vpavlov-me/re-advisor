# User Story: External Consul Conflict Case Management

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As an External Consul, I want to create and manage conflict cases with full lifecycle tracking  
**Epic Link:** FG-XXX [External Consul Conflict Management System]  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As an** External Consul,  
**I want to** create new conflict cases, document parties involved and resolution paths, edit conflicts based on their status, view all conflicts (active and completed), and track resolution progress,  
**so that** I can proactively manage family dynamics, maintain structured mediation records, and provide effective conflict resolution services to my client families.

---

## 🎯 Business Context

**Why is this Story important?**

External Consuls serve as strategic governance partners with full access to family context, including sensitive conflict situations. They need a comprehensive system to:

- **Document conflicts early**: Capture conflict situations as they emerge, before escalation
- **Structure mediation process**: Maintain organized records of parties, issues, and resolution strategies
- **Track progress systematically**: Monitor conflicts from initial documentation through final resolution
- **Maintain confidentiality**: Ensure conflict data remains private within appropriate governance boundaries
- **Support proactive intervention**: Identify patterns and intervene before conflicts escalate

**Business Value:**
- Improves conflict resolution success rates through structured documentation
- Enables proactive family dynamics management
- Provides audit trail for governance compliance
- Reduces time spent on conflict administration
- Supports External Consul's strategic advisory role

**Strategic Alignment:**
- Core capability for External Consul persona (see DOC-USR-005)
- Essential for Family Governance conflict resolution module
- Supports family cohesion and governance maturity goals

---

## ✅ Acceptance Criteria

### Create New Conflict Case

1. **Given** I am logged in as External Consul,  
   **When** I navigate to Conflicts section and click "Create New Conflict",  
   **Then** I see conflict creation form with required fields: title, description, involved parties (minimum 2), conflict type, severity level, and status (defaults to "Draft").

2. **Given** I am creating a conflict case,  
   **When** I select involved parties,  
   **Then** I can only select family members from families I am associated with, and system requires minimum 2 parties from the same family.

3. **Given** I am creating a conflict case,  
   **When** I save as "Draft",  
   **Then** conflict is saved with Draft status and only visible to me (External Consul) until I change status to "Open".

4. **Given** I am creating a conflict case,  
   **When** I save with status "Open",  
   **Then** conflict becomes visible to Family Council members of that family, and all parties are notified.

### Document Resolution Paths

5. **Given** I have created a conflict case,  
   **When** I add resolution path details,  
   **Then** I can document: proposed resolution steps, assigned actions with owners, target dates, notes, and current progress.

6. **Given** I am documenting resolution paths,  
   **When** I assign actions to family members,  
   **Then** I can only assign to members of the conflict's family, and assignees receive task notifications.

### Edit Conflicts Based on Status

7. **Given** I have a conflict in "Draft" status,  
   **When** I open the conflict,  
   **Then** I can edit all fields including title, description, parties, resolution paths, and status.

8. **Given** I have a conflict in "Open" status,  
   **When** I open the conflict,  
   **Then** I can edit all fields and change status to "In Progress" or "Draft".

9. **Given** I have a conflict in "In Progress" status,  
   **When** I open the conflict,  
   **Then** I can edit resolution paths, add notes, update progress, and change status to "Resolved" or back to "Open".

10. **Given** I have a conflict in "Resolved" status,  
    **When** I open the conflict,  
    **Then** I can add final notes, update resolution summary, and change status to "Closed" or back to "In Progress".

11. **Given** I have a conflict in "Closed" status,  
    **When** I open the conflict,  
    **Then** I can only view the conflict details without any editing capabilities.

### View All Conflicts

12. **Given** I am logged in as External Consul,  
    **When** I navigate to Conflicts section,  
    **Then** I see list of all conflicts across my associated families with filters: family, status, severity, conflict type, date range.

13. **Given** I am viewing conflicts list,  
    **When** I filter by status,  
    **Then** I can select: All, Draft, Open, In Progress, Resolved, Closed, and see conflicts matching selected status.

14. **Given** I am viewing conflicts list,  
    **When** I filter by family,  
    **Then** I see only conflicts from selected family (multi-tenant data isolation enforced).

### Track Resolution Progress

15. **Given** I am viewing a conflict case,  
    **When** I review resolution progress section,  
    **Then** I see: status history with timestamps, completed vs. pending actions, progress percentage, key milestones reached.

16. **Given** I am tracking resolution progress,  
    **When** resolution actions are completed by assigned family members,  
    **Then** progress indicators update automatically and I receive notifications of completions.

**Additional Criteria:**
- [ ] All conflict data is isolated by family_id (multi-tenant architecture)
- [ ] Only External Consul and Family Council members of relevant family can view conflict
- [ ] System validates involved parties are from same family
- [ ] Status transitions follow business rules (cannot skip statuses inappropriately)
- [ ] Audit trail captures all changes with user and timestamp
- [ ] Conflicts marked as "Closed" are read-only permanently

---

## 🔐 Business Rules

### Validation Rules:
1. **Minimum parties**: Conflict must have at least 2 involved parties
2. **Same family**: All involved parties must be from the same family
3. **Family association**: External Consul must be associated with the family to create/view conflicts
4. **Status progression**: Valid transitions:
   - Draft → Open, Draft (stays)
   - Open → In Progress, Draft
   - In Progress → Resolved, Open
   - Resolved → Closed, In Progress
   - Closed → (no transitions - terminal state)

### Authorization:
- **Who can create conflicts:** External Consul associated with the family
- **Who can view conflicts:** External Consul (creator) + Family Council members of that family
- **Who can edit conflicts:** External Consul (creator only), based on status rules
- **Who sees involved parties:** Only External Consul and Family Council members

### Edge Cases:
- **External Consul loses family association**: Cannot create new conflicts, existing conflicts become read-only but remain visible
- **Family Council member involvement**: If Family Council member is involved party, they still see the conflict (no self-hiding)
- **Concurrent editing**: Last save wins (optimistic locking not required for MVP)
- **Draft timeout**: Draft conflicts older than 90 days generate reminder notification
- **Closed conflicts**: Cannot be reopened, new conflict must be created if issue resurfaces

---

## 🧪 Test Scenarios

### Happy Path: Create and Resolve Conflict

1. External Consul logs in and navigates to Conflicts section
2. Clicks "Create New Conflict"
3. Fills in:
   - Title: "Asset allocation disagreement between siblings"
   - Description: "John and Jane disagree on investment strategy for family trust"
   - Involved parties: John Smith, Jane Smith (both from Smith Family)
   - Conflict type: "Asset Management"
   - Severity: "Medium"
   - Status: "Draft"
4. Saves conflict successfully
5. Reviews draft, adds resolution path:
   - Step 1: Schedule mediation meeting (assigned to External Consul, due in 7 days)
   - Step 2: Review trust documents together (assigned to John & Jane, due in 14 days)
6. Changes status to "Open"
7. System notifies John, Jane, and Smith Family Council
8. External Consul marks Step 1 complete, changes status to "In Progress"
9. John and Jane complete Step 2
10. External Consul adds final notes and changes status to "Resolved"
11. After 30-day cooling period, External Consul changes status to "Closed"
12. Conflict becomes permanently read-only

### Negative Tests:

**Invalid Party Selection:**
1. External Consul creates conflict
2. Attempts to add John Smith (Smith Family) and Bob Johnson (Johnson Family) as parties
3. System displays error: "All involved parties must be from the same family"
4. Conflict not saved

**Unauthorized Access:**
1. External Consul (associated with Smith Family only) attempts to view conflict from Johnson Family
2. System returns 403 Forbidden or filters out conflict from list
3. External Consul cannot access conflict details

**Invalid Status Transition:**
1. External Consul has conflict in "Resolved" status
2. Attempts to change status directly to "Draft"
3. System displays error: "Invalid status transition. Resolved can only move to Closed or In Progress"
4. Status remains "Resolved"

**Editing Closed Conflict:**
1. External Consul opens conflict with "Closed" status
2. All form fields are read-only
3. "Save" button is disabled or hidden
4. Status dropdown only shows "Closed" (no other options)

### Edge Cases:

**Single Party Attempt:**
1. External Consul creates conflict
2. Adds only 1 involved party
3. Attempts to save
4. System displays error: "Minimum 2 involved parties required"
5. Conflict not saved until 2nd party added

**Draft Abandonment:**
1. External Consul creates conflict in Draft status
2. Leaves it untouched for 90+ days
3. System sends reminder notification: "Draft conflict 'X' has been inactive for 90 days"
4. External Consul can choose to complete or delete

**External Consul Removed from Family:**
1. External Consul has active conflicts in Smith Family
2. Family Council removes External Consul association
3. External Consul can still VIEW existing conflicts (read-only)
4. External Consul cannot CREATE new conflicts or EDIT existing ones
5. Conflicts remain visible in External Consul's multi-family dashboard with indicator "Association Ended"

---

## 📝 Notes

**Open Questions:**
- [x] **Q:** Can External Consul delete conflicts? **A:** Yes, only Draft status conflicts can be deleted. All other statuses are permanent records.
- [x] **Q:** What happens to conflict if involved party leaves family? **A:** Conflict remains intact with historical record. System adds note "(Left Family)" next to party name.
- [x] **Q:** Can Family Council members edit conflicts? **A:** No, only view. External Consul retains edit control.
- [x] **Q:** How long should conflicts remain in "Resolved" before moving to "Closed"? **A:** Business decision by External Consul, recommended 30-day cooling period.
- [x] **Q:** Can conflicts be reopened after "Closed"? **A:** No, "Closed" is terminal state. New conflict must be created if issue resurfaces.
- [x] **Q:** What if External Consul wants to involve external mediator? **A:** Separate Epic for mediator assignment will cover this (not in current story scope).

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-23
