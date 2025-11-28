# User Story: Constitution Template Editing (Cross-Portal)

## 📋 Basic Information

**Story ID:** [Story ID]  
**Story Title:** Constitution Template Editing (Cross-Portal)  
**Epic:** EPIC-022: Template Exchange System (Advisor → Family)  
**Module:** Constitution  
**User Story:** As an External Advisor, I want to access the Family Portal to edit the Constitution template I shared so I can refine it based on specific family needs  

**Priority:** High  
**Story Points:** 13  
**Sprint:** [To be determined]  
**Assignee:** [To be assigned]

---

## 👤 User Personas

### Primary Actor: External Advisor

**Role Context:**
- Professional governance consultant engaged with family
- Shared Constitution template with family (prerequisite: Story 1)
- Needs to customize template for specific family context
- Works collaboratively with Family Council on constitution development
- Must access Family Portal to edit shared template

**Goals:**
- Edit Constitution template directly on Family Portal
- Refine template sections based on family-specific requirements
- Maintain control over template until family activates it
- Provide professional guidance through template customization

**Pain Points:**
- Cannot edit template from Advisor Portal (must access Family Portal)
- Risk of editing conflicts if multiple users edit simultaneously
- Need clear visibility of which templates are available for editing
- Uncertainty about when editing access expires

### Secondary Actor: Family Council Member

**Role Context:**
- Family governance decision-maker
- Reviews advisor edits to shared Constitution template
- May need to edit template alongside advisor
- Monitors progress of template customization
- Makes final decision on template activation

**Goals:**
- See advisor edits to template in real-time
- Understand when advisor is actively editing
- Maintain ability to review and edit template
- Prevent editing conflicts with advisor
- Know when template is ready for activation

---

## 📖 User Story Description

### Story Statement

As an External Advisor, I want to access the Family Portal to edit any of the 12 Constitution sections in the template I shared, with a concurrent editing lock mechanism to prevent conflicts, so that I can customize the template for the family's specific needs while maintaining content integrity until the Family Council activates it.

### Context

After sharing a Constitution template (Story 1), Advisors need to refine it for the specific family context. This requires cross-portal access - Advisor logs into Family Portal to edit the template. The critical challenge is preventing concurrent editing conflicts between Advisor and Family Council members while maintaining transparency and collaboration.

The lock mechanism ensures only one person can edit the template at any moment. If Advisor is editing, Family Council cannot edit simultaneously, and vice versa. Edits are saved explicitly and become visible to both parties after save, enabling review and collaboration without version control issues.

### Business Value

**For External Advisors:**
- Direct template customization capability on family's platform
- Professional service delivery through hands-on editing
- Collaboration with Family Council through saved edits
- Clear workflow boundaries (edit inactive templates)

**For Families:**
- Professional template customization from hired expert
- Visibility into advisor's work after saves
- Prevention of editing conflicts through lock mechanism
- Maintain control over final activation decision

**For ReFamily Platform:**
- Sophisticated collaboration infrastructure
- Competitive differentiation through cross-portal editing
- Enhanced advisor-family engagement
- Foundation for future collaborative features

---

## ✅ Acceptance Criteria

### AC-001: Advisor Access to Family Portal

**Given** I am an External Advisor who shared Constitution template with family  
**When** I need to edit the template  
**Then** I can access Family Portal through secure authentication mechanism  
**And** system verifies my advisor relationship with this family  
**And** I am directed to Constitution section upon login  
**And** I see only the template(s) I shared (no access to other family data)

### AC-002: Template Editing Interface

**Given** I successfully accessed Family Portal as External Advisor  
**When** I navigate to my shared Constitution template  
**Then** I see template in editable state with:
- All 12 Constitution sections accessible
- "Edit" button per section
- Current lock status indicator (available / locked by user)
- My advisor attribution visible
- Template status: "Inactive Template - Editing in Progress"

### AC-003: Section-Level Editing

**Given** I opened Constitution template for editing  
**When** I click "Edit" on any section  
**Then** section enters edit mode with:
- Rich text editor interface
- Section content loaded
- "Save" and "Cancel" action buttons
- Auto-save indicator
- Character/word count (if applicable)
**And** I can modify content freely within section structure

### AC-004: Lock Acquisition (Advisor Starts Editing)

**Given** no one is currently editing the Constitution template  
**When** I (Advisor) click "Edit" on any section  
**Then** system acquires lock on entire template for me  
**And** lock indicator shows: "Editing by [Advisor Name]"  
**And** all Family Council members see lock status update in real-time  
**And** Family Council "Edit" buttons become disabled with message: "Template currently being edited by [Advisor Name]"  
**And** lock persists until I save or cancel editing session

### AC-005: Lock Prevention (Family Editing, Advisor Blocked)

**Given** Family Council Member is currently editing the template  
**When** I (Advisor) attempt to access template  
**Then** I see lock indicator: "Template currently being edited by [Family Council Member Name]"  
**And** all "Edit" buttons are disabled for me  
**And** I see message: "Template is locked for editing. Please wait until [Name] completes their work"  
**And** I can view template content in read-only mode  
**And** system polls for lock release every 30 seconds

### AC-006: Lock Prevention (Advisor Editing, Family Blocked)

**Given** I (Advisor) am currently editing the template  
**When** Family Council Member attempts to edit  
**Then** they see lock indicator: "Template currently being edited by [Advisor Name]"  
**And** all "Edit" buttons are disabled for them  
**And** they see message: "Template is locked for editing. Advisor is making updates"  
**And** they can view template content in read-only mode  
**And** system polls for lock release every 30 seconds

### AC-007: Lock Release on Save

**Given** I am editing a Constitution section  
**When** I click "Save" button  
**Then** my edits are saved to backend  
**And** lock is released immediately  
**And** all users see updated lock status: "Available for editing"  
**And** Family Council can now edit if they choose  
**And** I receive confirmation: "Changes saved successfully"

### AC-008: Lock Release on Cancel

**Given** I am editing a Constitution section  
**When** I click "Cancel" button  
**Then** my unsaved changes are discarded  
**And** lock is released immediately  
**And** section reverts to last saved state  
**And** all users see updated lock status: "Available for editing"

### AC-009: Auto-Lock Release (Session Timeout)

**Given** I acquired editing lock on template  
**When** I remain idle for 15 minutes without saving  
**Then** system automatically releases lock  
**And** my unsaved changes are preserved as draft (optional recovery)  
**And** I see timeout notification: "Your editing session expired. Lock released"  
**And** other users can now acquire lock

### AC-010: Edit Visibility After Save (Family View)

**Given** Advisor edited and saved changes to Constitution template  
**When** I (Family Council Member) refresh page or navigate to template  
**Then** I see updated content  
**And** edited sections show "Recently updated by [Advisor Name]" badge  
**And** timestamp shows when last edit occurred

### AC-011: All 12 Sections Editable

**Given** I am editing Constitution template as Advisor  
**When** I navigate through template  
**Then** I can edit all 12 sections:
1. Family Identity & Heritage
2. Mission, Vision & Values
3. Ownership & Control Structures
4. Governance Bodies & Roles
5. Decision-Making Processes
6. Conflict Resolution Mechanisms
7. Family Council Operations
8. Financial Governance
9. Risk Management & Compliance
10. Succession Planning
11. Education & Development
12. Communication & Information Sharing
**And** each section maintains independent edit capability  
**And** lock applies to entire template (not per-section)

### AC-012: Multiple Templates Support

**Given** I shared multiple Constitution templates with same family  
**When** I access Family Portal  
**Then** I see all templates I shared  
**And** I can edit any of them independently  
**And** lock mechanism applies per-template (editing one doesn't lock others)

**Given** I am External Advisor accessing Family Portal  
**When** I navigate platform  
**Then** I can ONLY access:
- Constitution templates I shared
- Edit functionality for those templates
**And** I CANNOT access:
- Family's active Constitution
- Other family sections (Learning Paths, Resources, etc.)
- Family member information
- Other family data or settings

### AC-014: Multiple Templates Support

**Given** I shared multiple Constitution templates with same family  
**When** I access Family Portal  
**Then** I see all templates I shared  
**And** I can edit any of them independently  
**And** lock mechanism applies per-template (editing one doesn't lock others)

### AC-015: Access Continuation Until Activation

**Given** I have been editing Constitution template on Family Portal  
**When** time passes without Family Council activation  
**Then** my editing access continues indefinitely  
**And** I can return to edit at any time  
**And** template remains in "Inactive" state

---

## 🔄 User Flow

### Main Success Flow: Advisor Editing

1. **Advisor initiates editing**
   - Advisor receives notification or remembers shared template
   - Advisor accesses Family Portal through secure link
   - System authenticates advisor identity
   - System verifies advisor-family relationship
   - Advisor navigates to Constitution section

2. **Template access**
   - Advisor sees template(s) they shared
   - System displays current lock status (available)
   - Advisor clicks "Edit" on specific section
   - System acquires lock for advisor
   - Rich text editor opens with section content

3. **Editing process**
   - Advisor modifies section content
   - System auto-saves drafts periodically
   - Advisor navigates to other sections if needed
   - Lock remains active throughout session

4. **Saving changes**
   - Advisor clicks "Save" button
   - System commits changes to backend
   - Lock releases automatically
   - Family Council can view updated content after refresh

5. **Session completion**
   - Advisor logs out or navigates away
   - Changes persist on Family Portal
   - Template remains in "Inactive" state

### Alternative Flow 1: Lock Conflict (Advisor Blocked)

1. **Advisor attempts access during Family editing**
   - Advisor accesses Family Portal
   - Navigates to shared template
   - Sees lock indicator: "Locked by [Family Council Member]"
   - All edit buttons disabled

2. **Waiting for lock release**
   - Advisor can view content in read-only mode
   - System polls for lock status every 30 seconds
   - Advisor receives notification when lock releases
   - Advisor can then acquire lock

3. **Alternative: Contact Family**
   - Advisor may contact Family Council directly
   - Request completion of their editing session
   - Coordinate editing schedules

### Alternative Flow 2: Lock Conflict (Family Blocked)

1. **Family attempts editing during Advisor session**
   - Family Council Member navigates to template
   - Sees lock indicator: "Locked by [Advisor Name]"
   - All edit buttons disabled

2. **View while waiting**
   - Family Council can watch template in read-only mode
   - System updates content as Advisor saves changes
   - Family Council sees which sections being modified after save

3. **Lock release confirmation**
   - Advisor completes editing and saves
   - Lock releases
   - Family Council can acquire lock if they refresh/check

### Alternative Flow 3: Session Timeout

1. **Advisor idle during editing**
   - Advisor acquires lock and starts editing
   - Advisor becomes distracted or leaves computer
   - 15 minutes pass without activity

2. **Auto-release mechanism**
   - System detects idle timeout
   - Lock releases automatically
   - Unsaved changes preserved as draft (optional)
   - Advisor sees timeout message on return

3. **Recovery options**
   - Advisor can recover draft changes (if feature enabled)
   - Advisor can re-acquire lock if still available
   - Family Council can now edit if needed

---

## 🎯 Business Rules

### BR-001: Cross-Portal Authentication
- Advisor must authenticate through secure mechanism to access Family Portal
- System verifies active advisor-family engagement relationship
- Authentication tied to specific family context (cannot access other families)
- Session expires after 4 hours of inactivity

### BR-002: Editing Scope Limitation
- Advisor can ONLY edit Constitution templates they personally shared
- Advisor cannot edit templates shared by other advisors
- Advisor cannot access family's active Constitution
- Advisor cannot access any other family data beyond shared templates

### BR-003: Concurrent Editing Lock (Template-Level)
- Lock applies to entire Constitution template (all 12 sections)
- Only ONE user can edit template at any moment (Advisor OR Family Council)
- Lock acquired when any user clicks "Edit" on any section
- Lock released when user clicks "Save" or "Cancel"
- Lock automatically released after 15 minutes of inactivity

### BR-004: Lock Priority (First-Come-First-Served)
- No priority system: first user to click "Edit" acquires lock
- Advisor does not have priority over Family Council (or vice versa)
- Users must wait for lock release to edit
- System does not queue edit requests

### BR-005: Edit Visibility
- Edits visible to Family Council after save
- Family Council can review updated content after refresh
- Edit history preserved for audit trail

### BR-006: Multiple Template Independence
- If Advisor shared multiple templates with same family, each has independent lock
- Editing one template does not lock other templates
- Advisor can work on multiple templates for same family (but only one at a time)

### BR-007: Save Requirements
- Changes must be explicitly saved (no implicit auto-save to backend)
- Unsaved changes lost if session times out (unless draft recovery implemented)
- Save action releases lock automatically
- Cancel action discards changes and releases lock

### BR-008: Section Structure Preservation
- Advisor cannot delete or add Constitution sections (12 sections fixed)
- Advisor can only edit content within existing sections
- Section order and structure remain unchanged
- Template maintains 12-section integrity throughout editing

---

## 🎨 UI/UX Requirements

### Advisor Portal: Access Point
- "Edit on Family Portal" button in template details
- Secure link generation for cross-portal authentication
- Clear messaging: "You'll be redirected to Family Portal to edit this template"
- Session persistence across portal transition

### Family Portal: Lock Status Indicator (Prominent)
- Visual lock icon with status text
- Color coding: 
  - Green = Available for editing
  - Red = Locked by [Name]
- Lock status updates after page refresh or periodic check
- Lock status visible at template level and section level

### Family Portal: Editor Interface (Advisor View)
- Rich text editor with formatting toolbar
- Section navigation sidebar
- Current section highlighted
- "Save" button (primary, blue)
- "Cancel" button (secondary, gray)
- Auto-save draft indicator (optional)
- Character/word count per section

### Family Portal: Read-Only Mode (When Locked)
- All edit buttons disabled with clear visual indication (grayed out)
- Lock message displayed prominently: "Template currently being edited by [Name]"
- Content viewable but not editable
- Refresh/poll indicator showing system checking for lock release
- Estimated wait time (if possible to calculate)

### Cross-Portal Transition
- Seamless authentication handoff
- Loading screen during transition
- Clear indication of portal context: "You are viewing [Family Name]'s portal"
- Breadcrumb: Advisor Portal → Family Portal → Constitution Template

---

## 🔌 Integration Points

### Authentication System
- Cross-portal SSO or secure token mechanism
- Advisor identity verification
- Session management across portals
- Access control validation

### Family Portal Infrastructure
- Constitution template storage and retrieval
- Data synchronization after save
- Lock management service
- Edit history tracking database

### Audit Logging
- All edit actions logged with timestamp, user, section
- Lock acquisition/release events
- Access attempts and denials
- Session timeout events

---

## 🔒 Security Considerations

### Access Control
- Advisor can only access templates they shared (no lateral access)
- No access to family's active Constitution or other data
- Family Council can revoke advisor access at any time (optional: emergency stop)
- All access logged for security audit

### Data Integrity
- Lock mechanism prevents concurrent modification race conditions
- Atomic save operations (all-or-nothing)
- Rollback capability in case of save failures
- Edit history preserved for dispute resolution

### Authentication Security
- Secure cross-portal authentication mechanism (OAuth, JWT tokens)
- Session timeout after inactivity
- Encrypted data transmission
- Multi-factor authentication support (optional)

---

## 📊 Success Metrics

### Feature Adoption
- Percentage of shared templates that Advisor edits
- Average number of editing sessions per template
- Time from template sharing to first edit
- Number of advisors using cross-portal editing feature

### Collaboration Efficiency
- Average time template locked per editing session
- Number of lock conflicts per template
- Time Family Council waits for lock release
- Reduction in version control issues

### Edit Activity
- Average number of sections edited per template
- Total number of edits before template activation
- Edit frequency (edits per week) during active collaboration
- Time from last edit to template activation

### Lock Mechanism Performance
- Lock acquisition latency (< 500ms)
- Lock release latency (< 200ms)
- Lock status update latency (< 2 seconds)
- Session timeout accuracy (±30 seconds)

---

## 🚫 Out of Scope

The following items are explicitly NOT included in this story:

- Template activation by Family Council (Story 3)
- Version control or rollback beyond edit history view
- Commenting or annotation features on template sections
- Real-time collaborative editing (Google Docs style)
- Template comparison or diff tools (beyond basic edit history)
- Advisor-Family chat or messaging within editor
- Section-level locking (lock is template-level only)
- Priority queue for lock acquisition
- Offline editing capability
- Mobile-optimized editing experience (desktop primary)
- Template duplication or branching
- Granular permission control (e.g., Advisor can edit only some sections)
- Edit History Panel with timeline view

---

## 📝 Notes

### Technical Complexity Drivers (Why 13 SP)

1. **Cross-Portal Authentication** (3 SP)
   - Secure token generation and validation
   - Session management across portal boundaries
   - Identity verification and access control

2. **Concurrent Editing Lock Mechanism** (5 SP)
   - Lock acquisition/release logic
   - Lock status broadcasting to users
   - Timeout and auto-release logic
   - Race condition prevention

3. **Data Synchronization After Save** (2 SP)
   - Content updates after explicit save
   - Edit visibility for Family Council
   - Lock status updates

4. **Editor Interface** (3 SP)
   - Rich text editor integration
   - Section navigation
   - Save/cancel workflow
   - Read-only mode toggling

### Assumptions
- Family Portal infrastructure supports external user access
- Data synchronization infrastructure available
- Rich text editor library already selected and integrated
- Authentication system supports cross-portal token generation
- Database can handle lock management queries efficiently

### Related Documentation
- Story 1: Constitution Template Sharing (prerequisite)
- Story 3: Constitution Template Activation (dependent)
- Cross-portal authentication specification
- Lock mechanism technical design
- Family Portal access control policies

---

**Story Owner:** [To be assigned]  
**Created:** 2025-11-20  
**Last Updated:** 2025-11-20