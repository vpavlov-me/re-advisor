# User Story: Constitution Template Activation & Archiving

## 📋 Basic Information

**Story ID:** [Story ID]  
**Story Title:** Constitution Template Activation & Archiving  
**Epic:** EPIC-022: Template Exchange System (Advisor → Family)  
**Module:** Constitution  
**User Story:** As a Family Council Member, I want to activate the advisor's Constitution template as our active Constitution so we can officially adopt it for family governance, while preserving our previous constitution as a template  

**Priority:** Medium  
**Story Points:** 8  
**Sprint:** [To be determined]  
**Assignee:** [To be assigned]

---

## 👤 User Personas

### Primary Actor: Family Council Member

**Role Context:**
- Family governance decision-maker with constitution activation authority
- Reviews advisor-edited Constitution template
- Makes strategic decisions about family governance framework
- Responsible for official adoption of constitution
- Manages transition from old to new constitution

**Goals:**
- Activate professionally-prepared Constitution template as official family Constitution
- Ensure previous Constitution work is preserved (not lost)
- Implement new governance framework smoothly
- Maintain clear distinction between active and archived constitutions
- End advisor editing access after activation

**Pain Points:**
- Risk of losing previous Constitution work during activation
- Uncertainty about what happens to old Constitution
- Need clear confirmation before irreversible action
- Confusion about when advisor access ends

### Secondary Actor: External Advisor

**Role Context:**
- Professional who edited Constitution template for family
- Completed customization work on template
- Awaits family's activation decision
- Expects notification when template activated
- Understands editing access expires upon activation

**Goals:**
- Receive confirmation that family activated template
- Know when editing access ends
- See successful completion of advisory engagement milestone
- Maintain professional relationship post-activation

---

## 📖 User Story Description

### Story Statement

As a Family Council Member, I want to activate an advisor-shared Constitution template as our active Constitution, with automatic archiving of the previous active Constitution as a template, immediate revocation of advisor editing access, and clear notifications to all stakeholders, so we can officially adopt the new governance framework while preserving our historical work.

### Context

After the Advisor completes editing the Constitution template (Story 2), the Family Council must make the formal decision to activate it as the family's active Constitution. This is a critical governance decision that changes the official governance framework the family operates under.

The activation process must handle two critical requirements:
1. **Preservation**: Previous active Constitution (if exists) must be archived as a template, not deleted
2. **Access Control**: Advisor's editing access expires immediately upon activation

Only Family Council members have authority to activate templates. This ensures governance decisions remain under family control, even when working with external advisors.

### Business Value

**For Families:**
- Official adoption of professionally-prepared Constitution
- Preservation of all historical Constitution work
- Clear governance framework implementation
- Control over timing of activation
- Protection of previous governance decisions

**For External Advisors:**
- Clear milestone completion for advisory engagement
- Professional confirmation of work acceptance
- Natural conclusion to editing phase
- Foundation for ongoing advisory relationship

**For ReFamily Platform:**
- Governance lifecycle management
- Historical data preservation
- Clear state transitions for Constitution
- Audit trail for governance decisions

---

## ✅ Acceptance Criteria

### AC-001: Activation Permission

**Given** I am logged into Family Portal  
**When** I view Constitution section  
**Then** I see "Activate" button ONLY if:
- I have Family Council Member role
- At least one inactive Constitution template exists (advisor-shared)
**And** other family members (non-Council) do NOT see "Activate" button

### AC-002: Pre-Activation Review

**Given** I am Family Council Member viewing inactive Constitution template  
**When** I click "Activate" button  
**Then** system displays activation confirmation modal with:
- Template name and advisor attribution
- Warning: "This template will become your active Constitution"
- Information: "Your current active Constitution will be preserved as a template" (if active Constitution exists)
- Checkbox: "I confirm this action" (required)
- "Cancel" button (secondary)
- "Activate Constitution" button (primary, enabled only if checkbox checked)

### AC-003: Activation Without Previous Constitution

**Given** family has NO active Constitution currently  
**And** I am activating advisor-shared template  
**When** I confirm activation  
**Then** template becomes active Constitution  
**And** template status changes from "Inactive Template" to "Active Constitution"  
**And** template moves from "Templates" section to "Active Constitution" section  
**And** all 12 sections remain intact with advisor-edited content  
**And** I see success message: "Constitution activated successfully"

### AC-004: Activation With Previous Constitution (Archiving)

**Given** family has existing active Constitution  
**And** I am activating advisor-shared template  
**When** I confirm activation  
**Then** system performs atomic operation:
1. Current active Constitution → archived as template
2. Archived Constitution appears in "Templates" section
3. Archived Constitution labeled: "Constitution (Archived [Date])"
4. New template → becomes active Constitution
5. New Constitution appears in "Active Constitution" section
**And** both constitutions preserved (no data loss)  
**And** I see success message: "Constitution activated. Previous constitution archived as template"

### AC-005: Archive Template Metadata

**Given** previous active Constitution was archived during activation  
**When** I view archived Constitution in Templates section  
**Then** I see metadata:
- Name: "Constitution (Archived YYYY-MM-DD)"
- Status badge: "Archived"
- Archive date: [timestamp]
- Original creation date: [timestamp]
- Note: "This was your active constitution until [activation date]"
**And** archived Constitution remains fully accessible for reference

### AC-006: Advisor Access Revocation (Immediate)

**Given** Advisor had editing access to Constitution template  
**When** I (Family Council) activate this template  
**Then** Advisor's editing access revokes immediately  
**And** if Advisor currently editing (has lock), lock released forcibly  
**And** Advisor sees notification: "Template activated by family. Your editing access has ended"  
**And** Advisor can no longer access this Constitution on Family Portal

### AC-007: Advisor Portal Update

**Given** Family activated Constitution template I shared  
**When** I (Advisor) view my shared content in Advisor Portal  
**Then** this template's status updates to: "Activated by family on [date]"  
**And** I see timestamp of activation  
**And** I can no longer access "Edit on Family Portal" action  
**And** template marked as "Engagement completed"

### AC-008: Single Active Constitution Rule

**Given** family has one active Constitution  
**When** I activate a different template  
**Then** system ensures ONLY ONE active Constitution exists  
**And** previous active Constitution archived automatically  
**And** no scenario where multiple active Constitutions exist simultaneously  
**And** UI always shows exactly one "Active Constitution" section

### AC-009: Activation Notification (Family Council)

**Given** I (Family Council Member) activated Constitution template  
**When** activation completes  
**Then** all Family Council Members receive notification:
- Message: "[Member Name] activated Constitution '[Template Name]'"
- Timestamp: [when activated]
- Link: Direct link to active Constitution
**And** notification includes note about archived previous Constitution (if applicable)

### AC-010: Activation Notification (Advisor)

**Given** Family activated Constitution template I shared  
**When** activation completes  
**Then** I (Advisor) receive notification:
- Message: "[Family Name] activated your Constitution template"
- Timestamp: [when activated]
- Note: "Your editing access has ended. Congratulations on successful engagement!"
**And** notification marked as important/milestone

### AC-011: Activation Audit Trail

**Given** Constitution template was activated  
**When** anyone views Constitution history/audit log  
**Then** audit trail shows:
- Activation event: date, time, activating user
- Previous Constitution archiving event (if applicable)
- Advisor access revocation event
- Template state transition: Inactive → Active
**And** audit trail preserved permanently for governance records

### AC-012: Post-Activation Template List

**Given** I activated Constitution template  
**When** I view Templates section  
**Then** I see:
- Activated template NO LONGER in Templates section (moved to Active)
- Archived previous Constitution in Templates section (if existed)
- Other inactive templates still visible (if any)
**And** clear visual distinction between archived and inactive templates

### AC-013: Multiple Templates (Selective Activation)

**Given** multiple inactive Constitution templates from same or different advisors  
**When** I activate one specific template  
**Then** ONLY selected template becomes active  
**And** other inactive templates remain in Templates section unchanged  
**And** other templates still available for potential future activation  
**And** advisors of non-activated templates retain editing access

### AC-014: Activation Permanence

**Given** I activated Constitution template  
**When** any time passes  
**Then** activation cannot be reversed or undone  
**And** to change Constitution, family must activate different template  
**And** activated Constitution can only be edited by family (not advisor)  
**And** system prevents accidental de-activation

---

## 🔄 User Flow

### Main Success Flow: Activation With Existing Constitution

1. **Review Decision**
   - Family Council Member reviews advisor-edited Constitution template
   - Member verifies all sections customized appropriately
   - Member consults with other Family Council members (optional)
   - Member decides template ready for activation

2. **Initiate Activation**
   - Member navigates to Constitution section on Family Portal
   - Member locates specific template to activate
   - Member clicks "Activate" button
   - System displays confirmation modal

3. **Confirmation Modal**
   - Member reviews activation warning
   - Member reads information about archiving current Constitution
   - Member checks confirmation checkbox: "I confirm this action"
   - Member clicks "Activate Constitution" button

4. **System Processing (Atomic Operation)**
   - System creates archive copy of current active Constitution
   - Archive added to Templates section with "Archived [Date]" label
   - System changes selected template state: Inactive → Active
   - Template moved to "Active Constitution" section
   - Advisor editing access revoked immediately
   - If Advisor has active lock, lock forcibly released

5. **Notifications Dispatch**
   - All Family Council Members receive activation notification
   - Advisor receives notification with access revocation notice
   - System logs activation in audit trail

6. **Post-Activation State**
   - Family has new active Constitution
   - Previous Constitution preserved as archived template
   - Advisor can no longer edit this Constitution
   - Family can reference both current and archived versions

### Alternative Flow 1: Activation Without Previous Constitution

1. **First Constitution Activation**
   - Family has no active Constitution (new to platform or first adoption)
   - Family Council Member reviews advisor template
   - Member initiates activation process

2. **Simplified Confirmation**
   - Modal displays: "This will be your first active Constitution"
   - No archiving warning (nothing to archive)
   - Member confirms action

3. **System Processing**
   - Template becomes active Constitution
   - No archiving step required
   - Advisor access revoked
   - Notifications sent

4. **Result**
   - Family now has their first active Constitution
   - No archived templates created (none existed before)

### Alternative Flow 2: Advisor Editing During Activation

1. **Activation Attempt During Active Edit Session**
   - Advisor currently editing template (has lock)
   - Family Council Member attempts activation

2. **Lock Conflict Handling**
   - System detects active editing lock
   - Confirmation modal displays additional warning: "Advisor is currently editing this template. Activation will end their session immediately"
   - Member must acknowledge this warning

3. **Forced Lock Release**
   - Member confirms activation
   - System forcibly releases Advisor's lock
   - Advisor's unsaved changes lost
   - Advisor sees notification: "Family activated template. Your editing session ended. Unsaved changes lost"

4. **Activation Proceeds**
   - Template activated normally
   - Advisor access revoked
   - Standard notifications sent

### Alternative Flow 3: Multiple Templates Selection

1. **Multiple Inactive Templates**
   - Family has multiple inactive templates (from same advisor or different advisors)
   - Family Council reviews all templates
   - Member decides which template to activate

2. **Selective Activation**
   - Member clicks "Activate" on chosen template
   - Confirmation modal specifies which template being activated
   - Modal lists other templates that will remain inactive

3. **Post-Activation**
   - Selected template becomes active
   - Other templates remain in Templates section
   - Other advisors retain editing access to their templates

---

## 🎯 Business Rules

### BR-001: Single Active Constitution
- Only ONE Constitution can be active per family at any time
- Activating new Constitution automatically archives current active Constitution
- No manual archiving step required (automatic)
- System enforces this constraint at database level

### BR-002: Activation Authority
- Only Family Council Members can activate Constitution templates
- Family Members (non-Council) cannot activate templates
- Family Owners (if different role) may have activation rights (to be confirmed)
- No advisor can activate templates for family

### BR-003: Automatic Archiving
- Previous active Constitution MUST be preserved when activating new one
- Archived Constitution becomes template with "Archived [Date]" label
- All content, structure, and metadata preserved in archive
- No data loss during archiving process
- Archiving happens atomically with activation (single transaction)

### BR-004: Advisor Access Expiration
- Advisor editing access expires immediately upon template activation
- Access revocation happens regardless of whether advisor currently editing
- If advisor has active lock during activation, lock forcibly released
- Advisor receives notification of access expiration
- No re-access after expiration (even if family deactivates somehow)

### BR-005: Activation Permanence
- Activation cannot be undone or reversed
- Activated Constitution remains active until another template activated
- No "deactivate" or "revert" functionality
- To change Constitution, family must activate different template

### BR-006: Template State Transition
- Valid transition: Inactive Template → Active Constitution
- Invalid transition: Active Constitution → Inactive Template (use archiving instead)
- Archived templates can potentially be re-activated (edge case)

### BR-007: Multiple Templates Independence
- Activating one template does not affect other inactive templates
- Other advisors retain access to their non-activated templates
- Each template has independent lifecycle

### BR-008: Audit Trail Requirement
- All activations logged with timestamp, user, template
- Archiving events logged
- Access revocation events logged
- Audit trail immutable and permanent

### BR-009: Notification Requirements
- All Family Council Members notified of activation
- Advisor who shared template notified of activation
- Notifications sent immediately (real-time or near real-time)
- Notifications include relevant metadata and links

---

## 🎨 UI/UX Requirements

### Family Portal: Templates Section
- "Activate" button per inactive template (visible only to Family Council)
- Button disabled if user lacks permissions
- Tooltip on hover: "Make this your active Constitution"
- Visual distinction between inactive and archived templates
- Archived templates show "Archived [Date]" badge

### Family Portal: Activation Modal
- Clear, prominent modal with warning styling
- Template preview (optional: show key sections)
- Confirmation checkbox with explicit text
- "Cancel" button (easy escape route)
- "Activate Constitution" button (primary action, red/important color)
- Loading state during processing
- Error handling display

### Family Portal: Active Constitution Section
- Single "Active Constitution" prominently displayed
- No "Activate" button (already active)
- "Edit" button (for family editing, not advisor)
- Metadata: activated date, activated by, original advisor
- Link to archived versions

### Family Portal: Post-Activation Confirmation
- Success message banner at top of page
- Message: "Constitution activated successfully"
- Optional: Confetti or celebration animation
- Link to view archived Constitution
- Dismissible after review

### Advisor Portal: Template Status Update
- Status badge change: "Shared" → "Activated"
- "Activated on [date]" timestamp
- "Edit on Family Portal" button removed
- "View engagement summary" link (optional)
- Visual indication of completed milestone

### Notifications
- **Family Council**: "[Member] activated Constitution '[Name]'. Previous constitution archived"
- **Advisor**: "[Family] activated your Constitution template. Editing access ended. Great work!"
- Notification styling: Important/milestone level
- Include direct links to relevant sections

---

## 🔌 Integration Points

### Constitution Storage Service
- Active Constitution storage and retrieval
- Template archiving mechanism
- State transition management (Inactive → Active, Active → Archived)
- Atomic transaction support for activation+archiving

### Access Control Service
- Permission validation (Family Council role check)
- Advisor access revocation
- Lock release (if advisor editing during activation)
- Role-based button visibility

### Notification Service
- Multi-recipient notification dispatch
- Notification templates for activation events
- Real-time delivery to online users
- Email/push notification fallback for offline users

### Audit Logging Service
- Activation event logging
- Archiving event logging
- Access revocation event logging
- Immutable audit trail storage

### Advisor Portal Integration
- Template status synchronization
- Engagement milestone tracking
- Advisor notification delivery

---

## 📊 Success Metrics

### Activation Rate
- Percentage of shared templates eventually activated
- Time from template sharing to activation
- Activation rate per advisor (quality indicator)
- Number of activations per family (governance maturity)

### Preservation Success
- Zero data loss incidents during archiving
- 100% archive integrity verification
- Number of archived Constitutions accessed (reference value)

### Process Efficiency
- Time to complete activation (should be < 5 seconds)
- User errors during activation process
- Support tickets related to activation confusion
- Activation confirmation rate (clicked confirm vs. canceled)

### Advisor Engagement
- Advisor satisfaction with activation notification
- Time from activation to next advisor engagement
- Re-engagement rate post-activation

---

## 🚫 Out of Scope

The following items are explicitly NOT included in this story:

- Constitution editing by family after activation (separate feature)
- Deactivation or reversion functionality
- Side-by-side comparison of templates before activation
- Approval workflow (multiple Family Council votes)
- Scheduled/delayed activation
- Partial activation (selecting specific sections)
- Template merging (combining multiple templates)
- Re-activation of archived Constitutions (edge case for future)
- Advisor notification customization
- Post-activation analytics dashboard
- Celebration animations (nice-to-have)

---

## 📝 Notes

### Technical Complexity Drivers (Why 8 SP)

1. **Activation Workflow** (2 SP)
   - Permission validation
   - Confirmation modal logic
   - State transition management

2. **Archiving Logic** (3 SP)
   - Atomic transaction for activation+archiving
   - Data duplication with metadata preservation
   - Archive labeling and organization
   - Edge case handling (no previous Constitution)

3. **Access Revocation** (2 SP)
   - Advisor access removal
   - Lock release mechanism
   - Cross-portal synchronization

4. **Notifications & Audit** (1 SP)
   - Multi-recipient notification dispatch
   - Audit trail logging
   - Status updates across portals

### Assumptions
- Family Portal has role-based access control infrastructure
- Database supports atomic transactions for activation+archiving
- Notification service can handle multiple simultaneous recipients
- Advisor Portal can receive real-time status updates
- Lock mechanism from Story 2 supports forced release

### Edge Cases to Handle
- Advisor editing during activation (forced lock release)
- Multiple Family Council members attempting simultaneous activation
- Network failure during activation (rollback mechanism)
- Archived Constitution re-activation (future consideration)

### Questions for Clarification
- [Dependencies section - to be filled later]

### Related Documentation
- Story 1: Constitution Template Sharing (prerequisite)
- Story 2: Constitution Template Editing (prerequisite)
- Constitution archiving technical specification
- Family Council permissions matrix
- Audit logging standards

---

**Story Owner:** [To be assigned]  
**Created:** 2025-11-20  
**Last Updated:** 2025-11-20