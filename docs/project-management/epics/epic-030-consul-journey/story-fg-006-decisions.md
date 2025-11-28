---
doc_id: "FG-XXX"
title: "User Story: External Consul Decision Management"
type: "user-story"
category: "planning"
audience: "product-manager|business-analyst|developer|qa"
complexity: "intermediate"
created: "2025-10-23"
updated: "2025-10-23"
version: "1.0.0"
status: "draft"
tags: ["user-story", "external-consul", "decision-making", "advisor-portal"]
related: ["FG-EPIC-XXX"]
owner: ""
maintainer: ""
priority: "high"
---

# User Story: External Consul Decision Management

---

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As an External Consul, I want to create, edit, and manage family decisions through Advisor Portal
**Epic Link:** FG-XXX [External Consul Decision-Making Management]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As an** External Consul,
**I want to** create new family decisions, edit non-completed decisions, and change decision status through Advisor Portal,
**so that** I can actively facilitate decision-making processes for my client families rather than just observing them in Family Portal.

---

## 🎯 Business Context

**Why is this Story important?**

External Consuls are strategic governance partners serving as Family Council members with full access to all governance modules. Currently, they can only view decisions by logging into Family Portal, which:
- Creates friction (switching between portals)
- Limits their ability to proactively facilitate decision-making
- Reduces their value as strategic partners
- Forces families to create all decisions themselves

This story enables External Consuls to:
- Actively initiate decision-making processes on behalf of families
- Facilitate governance discussions by drafting decisions from strategic planning sessions
- Manage decision lifecycle efficiently within their workflow
- Provide comprehensive strategic support across all governance areas

**Strategic alignment:**
- Enhances External Consul value proposition (full governance partnership, not just advisory)
- Increases platform stickiness for high-value advisor segment
- Aligns with "active facilitator" positioning for External Consul persona
- Supports multi-family advisor workflow efficiency

---

## ✅ Acceptance Criteria

### 1. Decision Creation

**Given** External Consul is logged into Advisor Portal and viewing decisions for an associated family,
**When** they click "Create New Decision" button,
**Then** they can create a decision with:
- Decision title (required, max 200 characters)
- Description (required, rich text)
- Decision type selection (Simple Majority, Supermajority, Consensus, Advisory)
- Voting deadline (required, must be future date)
- Attachments (optional, multiple files)
- Initial status: Draft

**And** the created decision:
- Is associated with the selected family (family_id)
- Records External Consul as creator (created_by = consul user_id)
- Appears in family's decision list with "Draft" status
- Is visible to all family members in Family Portal

---

### 2. Decision Editing

**Given** External Consul views a decision they created or have access to,
**When** the decision status is "Draft" or "Active",
**Then** they can edit:
- Title
- Description
- Decision type
- Voting deadline (only future dates)
- Attachments (add/remove)

**And** when editing:
- Changes are saved with audit trail (updated_by, updated_at)
- Family members see updated version immediately
- System prevents editing if status is "Completed" or "Cancelled"
- Validation errors display clearly if required fields are empty

---

### 3. Status Management

**Given** External Consul views a decision,
**When** they change the status,
**Then** status transitions follow these rules:

**Draft → Active:**
- Allowed if all required fields are complete
- Voting deadline must be in future
- Notifications sent to all family members
- Decision becomes visible for voting

**Active → Completed:**
- Allowed only if voting deadline passed OR all members voted
- Final results are calculated and locked
- No further voting or editing allowed

**Draft/Active → Cancelled:**
- Allowed only from Draft or Active status
- Requires cancellation reason (optional text field)
- Notifications sent to family members
- Decision archived but visible in history

**Blocked transitions:**
- Cannot move Completed back to Draft, Active, or Cancelled (final state)
- Cannot move Cancelled back to Draft or Active
- Cannot skip Draft → Active transition (must go through Active)
- Completed decisions cannot be modified in any way

---

### 4. Multi-Family Context

**Given** External Consul is associated with multiple families,
**When** they access Decision-Making module in Advisor Portal,
**Then** they can:
- See family selector dropdown showing all associated families
- View only decisions for currently selected family
- Switch between families without losing unsaved work (warning prompt)
- See family name clearly in all decision views

**And** data isolation is enforced:
- External Consul cannot see decisions from non-associated families
- Cannot create/edit decisions for families they're not associated with
- System validates family association on all operations

---

### 5. Audit Trail

**Given** External Consul creates, edits, or changes status of a decision,
**When** the operation completes,
**Then** system records:
- Action type (created, updated, status_changed)
- User who performed action (External Consul user_id)
- Timestamp of action
- Changes made (for edits: before/after values)
- Reason (for cancellations)

**And** audit log:
- Is visible to Family Council members and Admin
- Cannot be modified or deleted
- Shows External Consul name in audit history

---

### 6. Permissions & Authorization

**Given** user attempts to access decision management features,
**Then** system validates:

**External Consul can:**
- Create decisions for associated families
- Edit Draft/Active decisions for associated families
- Change status of decisions for associated families
- View all decisions for associated families

**Family Council can:**
- Same permissions as External Consul for their own family

**Regular Family Member cannot:**
- Create decisions (read-only access)
- Edit decisions
- Change decision status
- Only vote on Active decisions

---

### 7. User Experience & Validation

**Given** External Consul interacts with decision management,
**Then** system provides:

**Validation:**
- Real-time field validation (title length, required fields)
- Clear error messages for invalid data
- Cannot save incomplete decisions as Active
- Cannot set past dates as voting deadline

**Feedback:**
- Success message after create/edit/status change
- Loading indicators during save operations
- Confirmation dialog before status changes
- Warning before cancelling decisions

**Navigation:**
- Breadcrumbs showing current family and decision
- "Back to Decisions" navigation
- Unsaved changes warning when navigating away

---

### 8. Notifications

**Given** External Consul creates or manages a decision,
**When** family members interact with the decision,
**Then** External Consul receives notifications in Notification Center:

**Vote notifications:**
- "John Doe voted on 'Approve 2026 Family Budget'" (real-time)
- Notification includes: decision title, voter name, timestamp
- Grouped by decision if multiple votes

**Status change notifications:**
- "Decision 'Approve 2026 Family Budget' is now Active" (when they activate)
- "Voting completed for 'Approve 2026 Family Budget'" (when deadline passes or all voted)

**Comment notifications (if applicable):**
- "Sarah Smith commented on 'Approve 2026 Family Budget'"

---

## 🔐 Business Rules

### Validation Rules:
1. **Title**: Required, 1-200 characters, no special characters except dash, comma, period
2. **Description**: Required, minimum 10 characters, maximum 5000 characters, rich text allowed
3. **Decision Type**: Required, must be one of: Simple Majority, Supermajority (2/3), Consensus, Advisory
4. **Voting Deadline**: Required, must be future date/time, minimum 24 hours from creation
5. **Attachments**: Optional, max 10 files, max 10MB per file, allowed types: PDF, DOCX, XLSX, PNG, JPG

### Authorization:
- **Who can perform this action:** External Consul (for associated families), Family Council (for their family), Admin (for their family)
- **Who can view results:** All family members can view decisions; only creators and authorized roles can edit/manage

### Edge Cases:
1. **Voting deadline passes while in Draft**: Decision cannot be activated, must update deadline first
2. **External Consul loses family association**: Existing decisions remain, but no further edits allowed
3. **Multiple External Consuls for same family**: Both can create/edit decisions, audit trail shows who did what
4. **Decision edited while members are voting**: Votes are preserved, members see "Decision Updated" notification
5. **Family has no members to vote**: System allows decision creation but shows warning "No eligible voters"

---

## 🧪 Test Scenarios

### Happy Path:
1. External Consul logs into Advisor Portal
2. Selects family from dropdown (Family A)
3. Navigates to Decision-Making module
4. Clicks "Create New Decision"
5. Fills in all required fields:
   - Title: "Approve 2026 Family Budget"
   - Description: "Vote to approve proposed budget allocation..."
   - Type: Simple Majority
   - Deadline: 2 weeks from today
6. Saves as Draft
7. Reviews decision details
8. Changes status from Draft → Active
9. System sends notifications to all Family A members
10. Family members can now vote on the decision
11. External Consul receives vote notifications in Notification Center
12. After voting closes, External Consul changes status to Completed
13. Decision results are locked and visible to family

### Negative Tests:
1. **Invalid input**: External Consul tries to create decision with empty title → Error: "Title is required"
2. **Unauthorized access**: External Consul tries to create decision for non-associated family → Error: "Access denied"
3. **Invalid status transition**: External Consul tries to edit Completed decision → Edit button disabled, message: "Cannot edit completed decisions"
4. **Past deadline**: External Consul tries to activate decision with past deadline → Error: "Voting deadline must be in future"
5. **Invalid file upload**: External Consul tries to attach 15MB file → Error: "File size exceeds 10MB limit"
6. **Invalid status change**: External Consul tries to change Completed decision to Cancelled → Action blocked, message: "Cannot change status of completed decisions"

### Edge Cases:
1. **Multi-family switch**: External Consul creates Draft decision for Family A, switches to Family B without saving → Warning: "You have unsaved changes. Save before switching families?"
2. **Concurrent edits**: Two External Consuls edit same decision simultaneously → Second save shows: "Decision was updated by another user. Please refresh and try again."
3. **Deadline extension**: External Consul extends voting deadline while decision is Active → Notifications sent: "Voting deadline extended to [new date]"
4. **Cancel with votes**: External Consul cancels Active decision that has votes → Confirmation: "This decision has 5 votes. Are you sure you want to cancel?" → Votes preserved in history
5. **No Draft limit**: External Consul creates 20 Draft decisions for same family → All saved successfully, no limit enforced

---

## ⚠️ Non-Functional Requirements (Briefly)

### Performance:
- Decision list load time: < 2 seconds for up to 100 decisions
- Decision create/edit save time: < 1 second
- Status change response time: < 500ms
- Family selector switch: < 1 second

### Security:
- Authorization required: Yes (External Consul role + family association validation)
- Data encryption: Yes (decisions contain sensitive family information)
- PII handling: Yes (decision descriptions may contain family member names, financial information)
- Audit logging: Required for all create/edit/status change operations

### Accessibility:
- WCAG level: AA
- Keyboard navigation: Required (tab through form fields, shortcuts for common actions)
- Screen reader support: Required (form labels, status announcements, error messages)

### Browser Support:
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Edge: Latest 2 versions

---

## 📝 Notes

### Open Questions:
- [x] **Can External Consul delete decisions?** - No, deletion not allowed for audit trail. Use "Cancelled" status instead. (Answered in epic discussion)
- [x] **Can External Consul see decisions created by other External Consuls for same family?** - Yes, all External Consuls associated with a family see all decisions for that family. (Answered in epic discussion)
- [x] **What happens if External Consul's association with family is removed while they have Draft decisions?** - Decisions remain with family, but External Consul loses access. Family Council can take over editing. (Answered in epic discussion)
- [x] **Can External Consul re-open Completed decisions?** - No, status transitions are one-way. Cannot reverse Completed → Active or Cancelled. (Answered in epic discussion)
- [x] **Should External Consul be able to vote on decisions they create?** - No, External Consul is facilitator, not voter. Only family members vote. (Answered in epic discussion)
- [x] **Should there be a limit on number of Draft decisions per family?** - No limit on Draft decisions. (Confirmed)
- [x] **Should External Consul receive notifications when family members vote?** - Yes, External Consul receives notifications in Notification Center when family members vote on decisions they created. (Confirmed)

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-23
