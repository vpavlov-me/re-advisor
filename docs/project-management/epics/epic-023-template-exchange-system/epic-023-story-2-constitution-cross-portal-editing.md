# [Story ID]: Constitution Cross-Portal Editing

---

## 📋 Basic Information

**Issue Type:** User Story  
**Project:** FG  
**Parent Epic:** FG-EPIC-023 (Template Exchange System - Technical Architecture)  
**Story Name:** Constitution Cross-Portal Editing  
**Summary:** As an External Advisor, I want to edit Constitution templates I shared with families through secure cross-portal access with permission-based filtering and edit locking, so that I can help families refine their governance documents  

**Labels:** constitution, cross-portal, advisor-portal, family-portal, edit-locking, permissions  
**Components:** Constitution Service, Access Control Service, Portal Integration, Edit Lock Manager  
**Priority:** High  
**Story Points:** 8  
**Sprint:** TBD  
**Assignee:** [TBD]

---

## 👤 User Story

**As an:** External Advisor  
**I want to:** Edit Constitution templates I shared with families on the Family Portal  
**So that:** I can help families refine their governance documents based on my expertise while respecting permission boundaries and preventing edit conflicts

---

## 🎯 Acceptance Criteria

### AC1: Permission Assignment by Family Council
**Given** I am an External Advisor who shared a Constitution template with a family  
**And** Family Council is reviewing permissions  
**When** Family Council assigns me permissions for Constitution editing  
**Then** they should be able to select one of:
- "Edit (linked)" - can edit only templates I created (filtered by creator marker)
- "Full access" - can edit any Constitution templates in the family
- "View only" - can view but not edit (default)
**And** permission changes should take effect immediately  
**And** I should receive notification when permissions are granted/changed

---

### AC2: Cross-Portal Authentication
**Given** I have "Edit (linked)" or "Full access" permission  
**When** I log into Family Portal  
**Then** the system should authenticate me via SSO/OIDC  
**And** the system should verify my Advisor role and family access  
**And** the system should load my permission level for this family  
**And** I should see Family Portal with Constitution section accessible

---

### AC3: Navigation to Constitution Management
**Given** I am logged into Family Portal with edit permissions  
**When** I navigate to Constitution section  
**Then** I should see "Manage Constitution" navigation option  
**And** clicking it should take me to Constitution management interface  
**And** the interface should display templates according to my permission level

---

### AC4: Template Filtering by Permission - Edit (Linked)
**Given** I have "Edit (linked)" permission  
**When** I view the Constitution management interface  
**Then** I should see only templates where `created_by` = my Advisor ID  
**And** I should NOT see templates created by other Advisors  
**And** I should NOT see templates created by Family Council  
**And** each template should display: title, status (shared/inactive), last modified date  
**And** I should see "Edit" button only on templates I can edit

---

### AC5: Template Filtering by Permission - Full Access
**Given** I have "Full access" permission  
**When** I view the Constitution management interface  
**Then** I should see all Constitution templates in the family  
**And** templates should be grouped by creator: "My Templates", "Other Advisors", "Family Created"  
**And** I should see "Edit" button on all templates  
**And** each template should display: title, creator name, status, last modified date

---

### AC6: Edit Lock Acquisition
**Given** I click "Edit" on a Constitution template  
**When** the system processes the edit request  
**Then** the system should check if template is already locked  
**And** if NOT locked:
- System acquires lock for me (locks template to my Advisor ID)
- Template opens in edit mode
- System displays "Editing..." indicator
- Lock timestamp is recorded
**And** if LOCKED by another user:
- System displays: "Template is being edited by [User Name]"
- System shows "View Read-Only" option
- I cannot edit until lock is released

---

### AC7: Edit Lock Timeout
**Given** I have acquired edit lock on a Constitution template  
**When** I am editing the template  
**Then** the system should maintain lock while I am active  
**And** the system should track last activity timestamp  
**And** if no activity for 15 minutes:
- System auto-releases the lock
- System auto-saves current changes
- System displays warning: "Session timed out. Lock released."
- I can re-acquire lock to continue editing

---

### AC8: Auto-Save During Editing
**Given** I am editing a Constitution template with active lock  
**When** I make changes to template sections  
**Then** the system should auto-save every 30 seconds  
**And** the system should display "Saving..." indicator during save  
**And** the system should display "All changes saved" after successful save  
**And** the system should update last modified timestamp  
**And** auto-save should NOT release the edit lock

---

### AC9: Manual Save and Lock Release
**Given** I am editing a Constitution template with active lock  
**When** I click "Save & Close" button  
**Then** the system should save all changes  
**And** the system should release the edit lock  
**And** the system should display success message: "Changes saved successfully"  
**And** the system should return me to Constitution management interface  
**And** the template should be available for others to edit

---

### AC10: Discard Changes and Lock Release
**Given** I am editing a Constitution template with active lock  
**When** I click "Cancel" or close the editor without saving  
**Then** the system should display confirmation dialog: "Discard unsaved changes?"  
**And** if I confirm:
- System discards changes since last save
- System releases edit lock
- System returns me to management interface
**And** if I cancel:
- System keeps me in edit mode
- Edit lock remains active

---

### AC11: Lock Release on Browser Close
**Given** I am editing a Constitution template with active lock  
**When** I close the browser or lose connection  
**Then** the system should detect disconnection within 60 seconds  
**And** the system should auto-save changes from last activity  
**And** the system should release edit lock  
**And** when I return, I should see message: "Your previous session was saved. Continue from [last save time]?"

---

### AC12: Active Constitution Protection
**Given** there is an active Constitution in the family  
**When** I attempt to edit it  
**Then** the system should block editing  
**And** the system should display: "Active Constitution cannot be edited directly. Create a new template or edit an inactive template."  
**And** I should only be able to view the active Constitution in read-only mode

---

### AC13: Permission Revocation During Edit
**Given** I am editing a Constitution template with active lock  
**When** Family Council revokes my edit permission  
**Then** the system should immediately:
- Save current changes
- Release edit lock
- Close edit interface
- Display message: "Your editing permission has been revoked. Changes have been saved."
**And** I should only have view-only access going forward

---

### AC14: Edit History Tracking
**Given** I successfully save changes to a Constitution template  
**When** the save completes  
**Then** the system should create edit history entry with:
- Advisor ID
- Timestamp
- Sections modified
- Change summary (diff)
**And** Family Council should be able to view edit history  
**And** edit history should show: "Edited by [Advisor Name] on [Date/Time]"

---

### AC15: Concurrent Edit Prevention
**Given** Advisor A has acquired edit lock on a template  
**When** Advisor B attempts to edit the same template  
**Then** Advisor B should see: "Template is currently being edited by [Advisor A Name]"  
**And** Advisor B should have options:
- "View Read-Only" (opens in view mode)
- "Notify Me When Available" (gets notification when lock released)
- "Cancel" (return to list)
**And** system should prevent any concurrent editing

---

### AC16: Error Handling - Save Failure
**Given** I am editing a Constitution template  
**When** auto-save or manual save fails (e.g., network error, database issue)  
**Then** the system should display error: "Failed to save changes. Retrying..."  
**And** the system should retry save operation (up to 3 attempts)  
**And** if all retries fail:
- System keeps changes in browser memory
- System displays: "Unable to save. Your changes are preserved locally. Please try again."
- Edit lock remains active
- I can manually retry save

---

### AC18: Family Council Force Unlock
**Given** a template is locked by an Advisor  
**And** the Advisor is unresponsive or unavailable  
**When** Family Council member views the locked template  
**Then** they should see "Force Unlock" button (Family Council only)  
**And** clicking it should display confirmation: "This will release [Advisor Name]'s lock and save their changes. Continue?"  
**And** if confirmed:
- System auto-saves Advisor's current changes
- System releases the lock
- System notifies Advisor: "Your edit session was ended by Family Council"
- Template becomes available for editing
**And** Family Council should see audit log entry for force unlock action
**Given** I have "Edit (linked)" permission  
**And** I am editing a template I created  
**When** I view the template sections  
**Then** I should be able to edit all sections in the template  
**And** this includes sections I originally created  
**And** this includes sections added by Family Council after sharing  
**And** all sections should be fully editable (no read-only restrictions)  
**And** I should see full editing controls for all sections

---

## 📊 Business Rules

### BR1: Permission Hierarchy
- "View only" < "Edit (linked)" < "Full access"
- Permission upgrades take effect immediately
- Permission downgrades during active edit session trigger graceful save and logout
- Only Family Council can assign/modify Advisor permissions

### BR2: Edit Lock Mechanism
- Only one user can hold edit lock per template at a time
- Lock is acquired on edit action, released on save/close
- Lock timeout: 15 minutes of inactivity
- Lock auto-releases on browser close/disconnect (60 second detection)
- Force unlock available to Family Council only (admin override with audit trail)
- Force unlock auto-saves current changes before releasing lock

### BR3: Creator Marker Filtering (Edit Linked)
- "Edit (linked)" permission uses `created_by` field for filtering
- Advisor sees only templates where `created_by` = Advisor ID
- Filtering happens at query level (not UI level)
- Creator marker is immutable after template creation

### BR4: Full Access Scope
- "Full access" bypasses creator marker filtering
- Advisor can edit any template in the family
- Includes templates created by Family Council and other Advisors
- Does NOT include active Constitution (protected separately)

### BR5: Active Constitution Protection
- Active Constitution cannot be edited (by anyone)
- Must edit inactive template or create new template
- Only Family Council can activate templates
- Activation is covered in separate story (FG-XXX-03)

### BR6: Auto-Save Strategy
- Auto-save every 30 seconds during active editing
- Auto-save does NOT release edit lock
- Auto-save creates checkpoint, not version
- Manual save creates version in edit history

### BR7: Lock Timeout Strategy
- Inactivity timeout: 15 minutes (no keyboard/mouse activity)
- On timeout: auto-save + release lock + show warning
- User can immediately re-acquire lock to continue
- Timeout prevents indefinite lock holding

### BR8: Cross-Portal Authentication
- Advisor must have `has_family_access(family_id)` permission
- SSO/OIDC required for cross-portal access
- Session maintained across portals (shared auth token)
- Logout from one portal logs out from both

### BR9: Concurrent Edit Prevention
- Database-level lock (not application-level)
- Lock stored in database with: template_id, user_id, acquired_at
- Lock checked on every edit attempt
- Lock visible to all users attempting edit

### BR10: Edit History and Audit
- All edits logged with: user, timestamp, sections changed
- Diff generated for each save (old vs new)
- Edit history immutable
- Visible to Family Council for transparency

### BR11: Section Editing Rights (Edit Linked)
- Advisor with "Edit (linked)" can edit all sections in templates they created
- No restrictions on sections added by Family after sharing
- Full editing rights for entire template if creator marker matches
- Section ownership tracking not required

### BR12: Permission Revocation Handling
- Immediate effect (no grace period)
- Active edits saved automatically
- Lock released immediately
- User notified and logged out of edit session

---

## 🔗 Dependencies

**Depends On:**
- FG-XXX-01: Constitution Template Sharing (templates must exist before editing)

**Blocks:**
- FG-XXX-03: Constitution Template Activation (editing must be complete before activation)

**Related Stories:**
- None

---

## 🎨 User Experience Flow

### Permission Assignment Flow (Family Council):
1. Family Council member logs into Family Portal
2. Navigates to Settings > Advisor Permissions
3. Selects Advisor from list
4. Clicks "Manage Constitution Permissions"
5. Selects permission level: "Edit (linked)" or "Full access"
6. Clicks "Save"
7. System sends notification to Advisor
8. Permission takes effect immediately

### Cross-Portal Editing Flow (Advisor with Edit Linked):
1. Advisor receives notification: "You can now edit Constitution templates for [Family Name]"
2. Advisor logs into Family Portal via SSO
3. Navigates to Constitution section
4. Clicks "Manage Constitution"
5. Sees list of templates they created (filtered by creator marker)
6. Clicks "Edit" on a template
7. System checks lock status
8. If unlocked:
   - Lock acquired for Advisor
   - Template opens in edit mode
   - "Editing..." indicator appears
9. Advisor makes changes to sections
10. System auto-saves every 30 seconds
11. Advisor clicks "Save & Close"
12. System saves changes, releases lock
13. Success message displayed
14. Returns to template list

### Lock Conflict Flow:
1. Advisor A is editing Template X
2. Advisor B attempts to edit Template X
3. System shows: "Template is being edited by [Advisor A]"
4. Advisor B sees options:
   - View Read-Only
   - Notify Me When Available
   - Cancel
5. Advisor B selects "Notify Me When Available"
6. Advisor A saves and closes (lock released)
7. System sends notification to Advisor B: "Template X is now available for editing"
8. Advisor B can now acquire lock and edit

### Timeout Flow:
1. Advisor is editing template
2. Advisor steps away (no activity for 15 minutes)
3. System detects inactivity
4. System auto-saves current changes
5. System releases lock
6. Warning displayed: "Session timed out. Lock released."
7. Advisor returns and sees warning
8. Advisor clicks "Continue Editing"
9. System re-acquires lock (if still available)
10. Advisor continues editing from last save point

---

## 💡 Additional Context

### Why Cross-Portal Editing?
- Advisors need to refine templates based on family feedback
- Families trust Advisors to help with governance language
- Keeping Advisors on Advisor Portal would require complex syncing
- Single source of truth on Family Portal simplifies architecture

### Why Edit Locking?
- Prevents concurrent edit conflicts
- Protects data integrity
- Provides clear user experience (no surprise overwrites)
- Standard pattern for collaborative editing

### Why Two Permission Levels?
- **Edit (linked):** Conservative approach, Advisor edits only their work
- **Full access:** Trusted advisor role, can refine all family content
- Family Council maintains control over permission levels

### Why Lock Timeout?
- Prevents indefinite lock holding (user forgets, browser crashes)
- 15 minutes balances user experience vs availability
- Auto-save protects work before timeout
- User can re-acquire lock immediately after timeout

### Technical Complexity:
- Cross-portal authentication requires SSO/OIDC
- Edit locking needs database-level coordination
- Auto-save requires reliable background tasks
- Permission filtering must be efficient (indexed queries)

---

## 📝 Notes for Implementers

### Edit Lock Implementation:
```sql
-- Lock table schema
CREATE TABLE constitution_edit_locks (
  template_id UUID PRIMARY KEY,
  user_id UUID NOT NULL,
  user_type ENUM('advisor', 'family_member'),
  acquired_at TIMESTAMP NOT NULL,
  last_activity_at TIMESTAMP NOT NULL,
  CONSTRAINT fk_template FOREIGN KEY (template_id) 
    REFERENCES constitution_templates(id) ON DELETE CASCADE
);

-- Acquire lock (atomic operation)
INSERT INTO constitution_edit_locks 
  (template_id, user_id, user_type, acquired_at, last_activity_at)
VALUES ($1, $2, $3, NOW(), NOW())
ON CONFLICT (template_id) DO NOTHING
RETURNING *;

-- Update activity timestamp (keep lock alive)
UPDATE constitution_edit_locks 
SET last_activity_at = NOW()
WHERE template_id = $1 AND user_id = $2;

-- Release lock
DELETE FROM constitution_edit_locks 
WHERE template_id = $1 AND user_id = $2;

-- Check for stale locks (timeout cleanup job)
DELETE FROM constitution_edit_locks 
WHERE last_activity_at < NOW() - INTERVAL '15 minutes';
```

### Permission Filtering Query (Edit Linked):
```sql
-- Fetch templates for Advisor with "Edit (linked)"
SELECT * FROM constitution_templates
WHERE family_id = $1 
  AND created_by = $2  -- Advisor ID
  AND status != 'active'
ORDER BY updated_at DESC;
```

### Permission Filtering Query (Full Access):
```sql
-- Fetch templates for Advisor with "Full access"
SELECT * FROM constitution_templates
WHERE family_id = $1 
  AND status != 'active'
ORDER BY 
  CASE 
    WHEN created_by = $2 THEN 1  -- Advisor's templates first
    ELSE 2
  END,
  updated_at DESC;
```

### Auto-Save Implementation:
```javascript
// Frontend: Auto-save timer
let autoSaveTimer;
let hasUnsavedChanges = false;

const startAutoSave = () => {
  autoSaveTimer = setInterval(async () => {
    if (hasUnsavedChanges) {
      await saveTemplate({ isAutoSave: true });
      hasUnsavedChanges = false;
    }
  }, 30000); // 30 seconds
};

const stopAutoSave = () => {
  if (autoSaveTimer) {
    clearInterval(autoSaveTimer);
  }
};

// Track changes
const onContentChange = () => {
  hasUnsavedChanges = true;
  updateActivityTimestamp(); // Keep lock alive
};
```

### Lock Heartbeat (Keep Alive):
```javascript
// Update last_activity_at every 60 seconds
const lockHeartbeat = setInterval(async () => {
  await api.updateLockActivity(templateId);
}, 60000);

// Clear on editor close
window.addEventListener('beforeunload', () => {
  clearInterval(lockHeartbeat);
  releaseLock(templateId);
});
```

### Permission Check Middleware:
```python
def check_constitution_edit_permission(
    advisor_id: UUID,
    template_id: UUID,
    db: Session
) -> bool:
    """
    Verify advisor has permission to edit template
    """
    template = db.query(ConstitutionTemplate).get(template_id)
    advisor_permissions = get_advisor_permissions(advisor_id, template.family_id)
    
    if advisor_permissions.constitution_access == "full":
        return True
    
    if advisor_permissions.constitution_access == "edit_linked":
        return template.created_by == advisor_id
    
    return False  # view_only or no permission
```

### Error Recovery:
- Store unsaved changes in localStorage as backup
- On reconnection, check if changes exist in localStorage
- Prompt user: "Restore unsaved changes from previous session?"
- Clear localStorage after successful save

### Performance Considerations:
- Index on `created_by` for fast filtering
- Index on `(template_id, user_id)` for lock queries
- Cache permission levels (Redis) to avoid repeated DB queries
- Monitor lock acquisition/release times
- Set timeout at 20 seconds for lock operations

---

**Story Owner:** [Product Manager]  
**Created:** 2025-11-27  
**Last Updated:** 2025-11-27