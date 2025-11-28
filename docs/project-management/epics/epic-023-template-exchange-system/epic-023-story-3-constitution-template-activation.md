# [Story ID]: Constitution Template Activation

---

## 📋 Basic Information

**Issue Type:** User Story  
**Project:** FG  
**Parent Epic:** FG-EPIC-023 (Template Exchange System - Technical Architecture)  
**Story Name:** Constitution Template Activation  
**Summary:** As a Family Council member, I want to activate a shared or edited Constitution template as the family's official Constitution, so that it becomes the governing document while automatically deactivating the previous Constitution and revoking Advisor edit permissions  

**Labels:** constitution, activation, family-council, governance  
**Components:** Constitution Service, Access Control Service, Notification Service  
**Priority:** High  
**Story Points:** 5  
**Sprint:** TBD  
**Assignee:** [TBD]

---

## 👤 User Story

**As a:** Family Council member  
**I want to:** Activate a Constitution template as the official family Constitution  
**So that:** It becomes our governing document, while the previous Constitution is archived and Advisor editing permissions are automatically revoked to protect the active Constitution

---

## 🎯 Acceptance Criteria

### AC1: Activation Permission
**Given** I am logged into Family Portal  
**When** I attempt to activate a Constitution template  
**Then** the system should verify I am a Family Council member  
**And** only Family Council members should see "Activate as Constitution" button  
**And** other family members should NOT have activation capability  
**And** Advisors should NOT have activation capability (regardless of permission level)

---

### AC2: Template Eligibility for Activation
**Given** I am viewing Constitution templates  
**When** I review templates for activation  
**Then** I should be able to activate templates with status: "shared" or "inactive"  
**And** templates currently being edited (locked) should display warning: "Template is being edited. Wait for editing to complete."  
**And** I should NOT be able to activate a template that is already "active"  
**And** each eligible template should show "Activate as Constitution" button

---

### AC3: Pre-Activation Review
**Given** I click "Activate as Constitution" on a template  
**When** the activation dialog opens  
**Then** I should see template preview with:
- Template title
- Creator information ("Shared by [Advisor Name]" or "Created by Family Council")
- Last modified date
- Section count
- Full content preview (all sections)
**And** I should see warning message: "This will become your active Constitution. The current active Constitution will become inactive."  
**And** I should see "Confirm Activation" and "Cancel" buttons

---

### AC4: Current Active Constitution Check
**Given** there is a currently active Constitution  
**And** I confirm activation of a new template  
**When** the system processes activation  
**Then** the system should:
1. Change current active Constitution status from "active" to "inactive"
2. Record deactivation timestamp
3. Create audit log entry for deactivation
**And** the previous Constitution should remain accessible as inactive template  
**And** the previous Constitution should NOT be deleted

---

### AC5: New Constitution Activation
**Given** the previous Constitution has been deactivated  
**When** the system continues activation process  
**Then** the system should:
1. Change selected template status from "shared"/"inactive" to "active"
2. Record activation timestamp
3. Set `activated_by` field to my user ID
4. Create audit log entry for activation
**And** the newly active Constitution should be immediately effective  
**And** only one Constitution should have "active" status

---

### AC6: Advisor Permission Revocation
**Given** the template being activated was created by an Advisor  
**And** the Advisor has "Edit (linked)" or "Full access" permission  
**When** activation completes  
**Then** the system should revoke Advisor's edit permission for this specific template  
**And** Advisor should retain their general permission level for other templates  
**And** Advisor should receive notification: "Constitution has been activated by [Family Name]. You can no longer edit this template."  
**And** if Advisor attempts to edit activated Constitution, they should see: "Active Constitution cannot be edited"

---

### AC7: Edit Lock Handling During Activation
**Given** a template is currently being edited (has active edit lock)  
**When** I attempt to activate it  
**Then** the system should block activation  
**And** display message: "Cannot activate while template is being edited by [User Name]. Please wait for editing to complete or ask them to save and close."  
**And** I should have option to "Notify Editor" to request they finish  
**And** I should be able to retry activation after lock is released

---

### AC8: Success Confirmation
**Given** activation completed successfully  
**When** I return to Constitution section  
**Then** I should see success message: "Constitution activated successfully"  
**And** the newly active Constitution should be prominently displayed with "Active" badge  
**And** the previously active Constitution should appear in "Inactive Templates" section  
**And** Family members should see the updated active Constitution immediately

---

### AC9: Family Notification
**Given** a Constitution has been activated  
**When** activation completes  
**Then** all Family members should receive notification: "New Constitution has been activated by [Family Council Member Name]"  
**And** notification should include link to view the active Constitution  
**And** notification should be sent via email and in-app notification  
**And** Advisors associated with the family should also receive notification

---

### AC10: Activation History Tracking
**Given** a Constitution is activated  
**When** the activation completes  
**Then** the system should create activation history entry with:
- Template ID
- Previous active Constitution ID (if any)
- Activated by (Family Council member ID)
- Activation timestamp
- Reason/notes (optional)
**And** activation history should be visible to Family Council  
**And** history should show: "[Member Name] activated Constitution on [Date/Time]"

---

### AC11: First-Time Activation
**Given** the family has NO currently active Constitution (first-time setup)  
**When** I activate a template  
**Then** the system should skip deactivation step (AC4)  
**And** proceed directly to activation (AC5)  
**And** success message should say: "Your first Constitution has been activated"  
**And** the template should become the family's inaugural active Constitution

---

### AC12: Rollback on Activation Failure
**Given** activation process encounters an error  
**When** any step fails (deactivation, activation, permission revocation)  
**Then** the system should rollback all changes  
**And** the previous active Constitution should remain "active"  
**And** the template being activated should retain its original status  
**And** I should see error message: "Failed to activate Constitution. Please try again."  
**And** no audit log entries should be created for failed activation  
**And** I should be able to manually retry activation

---

### AC13: Version Number Assignment
**Given** a Constitution is being activated  
**When** activation completes  
**Then** the system should assign version number to the new active Constitution  
**And** version number should increment from previous active Constitution (e.g., v1.0 → v2.0)  
**And** if first activation, version should be v1.0  
**And** version number should be displayed with Constitution title  
**And** version history should be maintained for governance tracking

---

### AC14: Active Constitution Display
**Given** a Constitution has been activated  
**When** Family members view the Constitution section  
**Then** the active Constitution should be displayed prominently at the top  
**And** should show:
- "Active Constitution" badge
- Version number
- Activation date
- Activated by (Family Council member name)
- Full content with all sections
**And** should have "View" button (opens in read-only mode)  
**And** should NOT have "Edit" or "Delete" buttons

---

### AC15: Inactive Template Status After Activation
**Given** the previous Constitution has been deactivated  
**When** I view inactive templates  
**Then** the deactivated Constitution should appear in "Inactive Templates" list  
**And** should show:
- Template title with version number (e.g., "Constitution v1.0")
- Status: "Inactive"
- "Previously active until [Date]"
- Last active period
**And** should be viewable but not editable  
**And** should be restorable (can be re-activated if needed)

---

## 📊 Business Rules

### BR1: One Active Constitution Rule
- Only one Constitution can have "active" status per family at any time
- Activating new Constitution automatically deactivates previous one
- Deactivation is atomic with activation (both succeed or both fail)
- System enforces uniqueness constraint at database level

### BR2: Family Council Exclusive Right
- Only Family Council members can activate Constitutions
- Advisors CANNOT activate, even with "Full access" permission
- Family members (non-Council) CANNOT activate
- Permission check happens before displaying activation UI

### BR3: Advisor Permission Revocation on Activation
- All Advisor edit permissions revoked for activated Constitution
- Applies to both "Edit (linked)" and "Full access" Advisors
- Revocation is automatic and immediate
- Advisors can still VIEW activated Constitution (read-only)
- Advisors retain permissions for other inactive templates

### BR4: Edit Lock Blocking
- Cannot activate template that is currently being edited
- Must wait for edit lock to be released
- Family Council can use "Force Unlock" (from Story FG-XXX-02) if needed
- System prevents activation attempt if lock exists

### BR5: Version Numbering
- Version numbers start at v1.0 for first Constitution
- Each activation increments major version (v1.0 → v2.0 → v3.0)
- Version numbers are immutable once assigned
- Version history provides governance audit trail

### BR6: Previous Constitution Preservation
- Deactivated Constitution is preserved as inactive template
- NOT deleted or archived permanently
- Can be re-activated if needed (e.g., rollback scenario)
- Maintains full content and history

### BR7: Activation Atomicity
- All activation steps must succeed or all fail (database transaction)
- Steps: deactivate previous, activate new, revoke permissions, create audit logs
- No partial activation state allowed
- Rollback on any failure

### BR8: Notification Requirements
- All Family members notified of activation
- Advisors who worked on template notified
- Notification includes link to view new Constitution
- Sent via email and in-app notification

### BR9: Audit Trail
- Every activation logged with: timestamp, user, template IDs
- Every deactivation logged with: timestamp, reason
- Every permission revocation logged
- Audit logs immutable and accessible to Family Council

### BR10: Active Constitution Protection
- Active Constitution is read-only for everyone (including Family Council)
- To make changes: edit inactive template or create new one, then activate
- Prevents accidental modifications to governing document
- Maintains Constitution stability and integrity

---

## 🔗 Dependencies

**Depends On:**
- FG-XXX-01: Constitution Template Sharing (templates must exist)
- FG-XXX-02: Constitution Cross-Portal Editing (Advisors may have edited before activation)

**Blocks:**
- None

**Related Stories:**
- None

---

## 🎨 User Experience Flow

### Activation Flow (Standard):
1. Family Council member logs into Family Portal
2. Navigates to Constitution section
3. Views list of templates:
   - Current active Constitution (v1.0) - "Active" badge
   - Shared template from Advisor - "Activate" button
   - Other inactive templates
4. Clicks "Activate as Constitution" on shared template
5. Preview dialog opens showing:
   - Full template content
   - Creator info: "Shared by [Advisor Name]"
   - Warning: "This will deactivate your current Constitution"
6. Member reviews content carefully
7. Clicks "Confirm Activation"
8. System processes:
   - Deactivates Constitution v1.0 → status: "inactive"
   - Activates new template → status: "active", version: v2.0
   - Revokes Advisor edit permissions
   - Sends notifications to all Family members and Advisors
9. Success message: "Constitution v2.0 activated successfully"
10. Page refreshes showing:
    - Constitution v2.0 as active (top of page)
    - Constitution v1.0 in inactive templates section

### First-Time Activation Flow:
1. Family Council member in brand new family portal
2. No active Constitution exists yet
3. Advisor has shared Constitution template
4. Member clicks "Activate as Constitution"
5. Preview dialog opens (no deactivation warning since no previous Constitution)
6. Member confirms
7. System assigns version v1.0
8. Success message: "Your first Constitution has been activated"
9. Constitution v1.0 now displayed as active

### Blocked Activation Flow (Template Locked):
1. Family Council member attempts to activate template
2. Advisor is currently editing the template (has lock)
3. System blocks activation
4. Message displays: "Cannot activate while being edited by [Advisor Name]"
5. Options shown:
   - "Notify [Advisor Name]" - sends request to save and close
   - "Wait" - member can wait and retry later
   - "Force Unlock" - Family Council can force unlock (from Story FG-XXX-02)
6. If "Notify" selected:
   - Advisor receives notification: "[Member Name] wants to activate this template. Please save and close."
   - Advisor saves and closes
   - Lock released
7. Member retries activation - now succeeds

### Rollback Scenario:
1. Family activated Constitution v2.0 (too aggressive changes)
2. Family Council decides to revert
3. Member navigates to inactive templates
4. Finds Constitution v1.0 (previously active)
5. Clicks "Re-activate" (same flow as standard activation)
6. System deactivates v2.0, re-activates v1.0
7. Version numbering: v1.0 becomes v3.0 (continues incrementing)
8. Success: "Constitution v3.0 activated (restored from v1.0)"

---

## 💡 Additional Context

### Why Family Council Only?
- Constitution is the most critical governance document
- Requires consensus and authority of Family Council
- Prevents unauthorized activation by individual members or Advisors
- Maintains proper governance hierarchy

### Why Revoke Advisor Permissions?
- Active Constitution should be stable and protected
- Prevents Advisor from making changes to governing document
- Family maintains full control over official Constitution
- Advisor can still help with future versions (edit inactive templates)

### Why Preserve Previous Constitution?
- Governance history important for UHNW families
- May need to reference previous versions
- Enables rollback if new version has issues
- Required for audit and compliance

### Why Block Activation During Edit?
- Prevents activation of partially edited content
- Ensures content integrity
- Gives editor chance to complete work
- Protects against premature activation

### Technical Complexity:
- Atomic transaction required (multiple steps must succeed together)
- Permission revocation must be immediate and complete
- Notification fan-out to all Family members
- Version numbering logic with concurrency handling

---

## 📝 Notes for Implementers

### Activation Transaction:
```sql
BEGIN TRANSACTION;

-- Step 1: Deactivate current active Constitution
UPDATE constitution_templates
SET 
  status = 'inactive',
  deactivated_at = NOW(),
  deactivated_by = $family_council_member_id
WHERE family_id = $family_id 
  AND status = 'active';

-- Step 2: Activate new Constitution
UPDATE constitution_templates
SET 
  status = 'active',
  activated_at = NOW(),
  activated_by = $family_council_member_id,
  version = (
    SELECT COALESCE(MAX(version), 0) + 1.0 
    FROM constitution_templates 
    WHERE family_id = $family_id
  )
WHERE id = $template_id;

-- Step 3: Revoke Advisor edit permissions for this template
INSERT INTO template_permission_revocations (
  template_id,
  advisor_id,
  revoked_at,
  reason
)
SELECT 
  $template_id,
  created_by,
  NOW(),
  'activation'
FROM constitution_templates
WHERE id = $template_id 
  AND created_by IS NOT NULL;

-- Step 4: Create audit log entries
INSERT INTO audit_log (
  entity_type,
  entity_id,
  action,
  user_id,
  timestamp,
  details
) VALUES 
  ('constitution', $old_active_id, 'deactivated', $user_id, NOW(), '{"reason": "new_activation"}'),
  ('constitution', $template_id, 'activated', $user_id, NOW(), '{"version": $new_version}');

COMMIT;

-- On error: ROLLBACK
```

### Edit Lock Check Before Activation:
```sql
-- Check if template is locked
SELECT user_id, user_type, acquired_at
FROM constitution_edit_locks
WHERE template_id = $template_id;

-- If result exists, block activation
-- Return lock holder info to display in UI
```

### Version Number Logic:
```javascript
// Get next version number
const getNextVersion = async (familyId) => {
  const result = await db.query(
    `SELECT COALESCE(MAX(version), 0) + 1.0 as next_version
     FROM constitution_templates
     WHERE family_id = $1`,
    [familyId]
  );
  return result.rows[0].next_version; // Returns 1.0, 2.0, 3.0, etc.
};
```

### Permission Revocation:
```javascript
// Revoke edit permissions for activated template
const revokeAdvisorPermissions = async (templateId) => {
  const template = await db.query(
    'SELECT created_by FROM constitution_templates WHERE id = $1',
    [templateId]
  );
  
  if (template.rows[0].created_by) {
    // Log revocation
    await db.query(
      `INSERT INTO template_permission_revocations 
       (template_id, advisor_id, revoked_at, reason)
       VALUES ($1, $2, NOW(), 'activation')`,
      [templateId, template.rows[0].created_by]
    );
    
    // Send notification to Advisor
    await notificationService.send({
      userId: template.rows[0].created_by,
      type: 'permission_revoked',
      message: 'Constitution has been activated. Edit permissions revoked.',
      templateId: templateId
    });
  }
};
```

### Notification Fan-out:
```javascript
// Notify all Family members
const notifyFamilyOfActivation = async (familyId, templateId, activatedBy) => {
  // Get all Family members
  const members = await db.query(
    'SELECT id, email FROM family_members WHERE family_id = $1',
    [familyId]
  );
  
  // Get Advisors who worked on template
  const advisors = await db.query(
    'SELECT created_by FROM constitution_templates WHERE id = $1',
    [templateId]
  );
  
  // Send notifications (bulk)
  const recipients = [
    ...members.rows.map(m => m.id),
    ...advisors.rows.map(a => a.created_by).filter(Boolean)
  ];
  
  await notificationService.sendBulk({
    recipients,
    type: 'constitution_activated',
    templateId,
    activatedBy
  });
};
```

### Uniqueness Constraint:
```sql
-- Ensure only one active Constitution per family
CREATE UNIQUE INDEX idx_one_active_constitution_per_family
ON constitution_templates (family_id)
WHERE status = 'active';
```

### Error Handling:
- Wrap entire activation in database transaction
- Catch any error and rollback
- Log detailed error for debugging
- Return user-friendly error message
- Allow manual retry

### Performance Considerations:
- Index on `(family_id, status)` for fast active Constitution lookup
- Index on `family_id` for version number calculation
- Cache Family member list for notification fan-out
- Monitor activation transaction duration
- Set timeout at 10 seconds for activation operation

---

**Story Owner:** [Product Manager]  
**Created:** 2025-11-27  
**Last Updated:** 2025-11-27