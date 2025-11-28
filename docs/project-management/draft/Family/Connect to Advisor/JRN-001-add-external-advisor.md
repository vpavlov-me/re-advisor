---
doc_id: "DOC-JRN-001"
title: "Adding External Advisor to Family"
type: "user-journey"
category: "business"
audience: "product-manager|business-analyst|developer|qa|stakeholder"
complexity: "intermediate"
created: "2025-10-13"
updated: "2025-10-13"
version: "2.1.0"
status: "draft"
tags: ["user-journey", "family-governance", "advisor-invitation", "mentorship", "association-based-access"]
related: ["DOC-SYS-001", "DOC-USR-002", "DOC-USR-003"]
owner: "savelova"
maintainer: "savelova"
reviewer: ""
priority: "high"
business_value: "Enables families to connect with professional advisors for governance support, mentorship, and consultations with granular control over data access"
user_impact: "Streamlines the process of engaging external advisors while maintaining data security and privacy through configurable, section-level access permissions"
review_cycle: "quarterly"
next_review: "2026-01-13"
---

# <JRN-001> Adding External Advisor to Family

> **Journey Status**: DRAFT - This documents the advisor invitation workflow with NEW granular permission management feature (Stage 2.5 and GAP-7).

## 📋 Context

### Goal

Enable Family Council Members to invite and connect external professional advisors (consultants, mediators, or subject matter experts) to their family for governance support, mentorship programs, and advisory services **with full control over what data the advisor can access**.

**Business Objectives:**
- Facilitate professional advisory services for families
- Enable cross-family advisor consulting model (one advisor, multiple families)
- Maintain strict data isolation through association-based access
- Support mentorship programs for next-generation family members
- **NEW**: Provide granular, section-level control over advisor data access
- **NEW**: Enable families to engage specialists without exposing all family data

**User Value:**
- Families gain access to professional governance expertise
- Advisors can serve multiple families efficiently
- Transparent engagement process with clear acceptance workflow
- Secure data access without compromising family privacy
- **NEW**: Family Council retains full control over sensitive information (financial, succession, conflicts)
- **NEW**: Flexible permission model allows specialized advisor engagements (e.g., financial advisor sees only financial data)
- **NEW**: Audit trail of advisor access for compliance and oversight

### Primary Personas

- **[Family Council Member](../02-user-personas/family-council-member-persona.md)** - **Initiator**: Identifies need for external advisor, searches available advisors, sends invitation via invite code
- **[External Advisor](../02-user-personas/external-advisor-persona.md)** - **Recipient**: Receives invitation, accepts association, gains access to family context for consultations
- **[Family Member](../02-user-personas/family-member-persona.md)** - **Beneficiary**: Receives advisor services, participates in mentorship programs and consultations

### Trigger(s)

What initiates this journey:
- Family Council identifies need for professional advisory support (governance, succession, conflict resolution, education)
- Family decides to establish mentorship programs for next-generation members
- Family requires specialized expertise not available within family membership
- Scheduled governance review recommends external advisor engagement
- Family experiences conflict requiring professional mediation

### Success Criteria / KPIs

How we measure success:
- Advisor invitation sent and accepted within 48 hours (target: >80% acceptance rate)
- Association established with correct permissions and data access scope within 5 minutes of acceptance
- Zero cross-family data leakage (advisor only sees associated family data)
- Family members can view advisor in available advisors list immediately after acceptance
- Advisor can access family context through Advisor Portal immediately after acceptance

### Preconditions / Assumptions

What must be true before this journey begins:
- User is authenticated as Family Council member or Admin
- User has active family membership
- Advisor has registered account in Advisor Portal with active status
- Advisor has created invite code in Advisor Portal
- Family has active Family Portal subscription
- System supports association-based access model for advisors

## 🗺️ Stage Map

### Stage 1: Advisor Discovery & Selection
**Goal**: Find suitable advisor for family's needs

**User Actions:**
- Step 1.1: Family Council Member navigates to Mentorship page
- Step 1.2: Views "Available Advisors" tab with list of registered advisors
- Step 1.3: Reviews advisor profiles (expertise, organization, ratings, bio)
- Step 1.4: Opens detailed advisor profile modal
- Step 1.5: Identifies suitable advisor based on specialization and family needs

**System Responses:**
- Display global advisor registry (all active, verified advisors)
- Show advisor profiles with expertise areas, years of experience, ratings
- Present advisor information in easily scannable format
- Filter only active and verified advisors
- Provide search and filtering capabilities

**User Expectations:**
- See comprehensive list of qualified advisors
- Understand advisor expertise and background clearly
- Find relevant advisor for specific family needs
- Feel confident in advisor credentials and qualifications

**Responsible Roles:**
- Family Council Member: Searches and evaluates advisors
- External Advisor: Profile visible in global registry (passive)

**Pain Points:**
- Limited search/filter functionality for advisors by expertise area
- No direct comparison tool between multiple advisors
- Limited information about advisor's previous family engagements
- Cannot preview advisor's consultation style or approach

---

### Stage 2: Invitation Initiation (Invite Code Method)
**Goal**: Send invitation to selected advisor using their invite code

**User Actions:**
- Step 2.1: User clicks "Request" button on advisor card
- Step 2.2: System opens "Request Mentorship" side panel
- Step 2.3: User sees advisor pre-selected in mentor dropdown
- Step 2.4: User obtains advisor's invite code (via email, phone, or direct communication)
- Step 2.5: User enters invite code in invitation form
- Step 2.6: User adds optional invitation message explaining family needs
- Step 2.7: User clicks "Send Invitation" to submit request

**System Responses:**
- Validate invite code exists and is active
- Check code is not expired
- Verify code usage limits not exceeded
- Create association record with "pending" status
- Increment invite code usage counter
- Send notification to advisor
- Provide immediate confirmation to family member

**User Expectations:**
- Clear form for entering invite code
- Immediate validation feedback on code entry
- Confirmation that invitation was sent successfully
- Notification when advisor responds to invitation
- Understanding of what happens next in the process

**Responsible Roles:**
- Family Council Member: Initiates invitation with invite code
- System: Validates code, creates association record, sends notification
- External Advisor: Receives notification (passive)

**Business Rules:**
- Only Family Council or Admin can send advisor invitations
- Invite code must be active and not expired
- Same family cannot use same invite code twice
- Invitation creates "pending" association requiring advisor acceptance
- Family context automatically captured from user's session

**Pain Points:**
- Manual invite code entry (potential for typos)
- No in-platform code verification before submission
- Limited feedback on code validity during entry
- No mechanism to request invite code directly from advisor within platform

---

### Stage 2.5: Access Permissions Configuration (NEW)
**Goal**: Configure what data and sections the advisor will be able to access

**User Actions:**
- Step 2.5.1: After entering invite code, system shows "Configure Advisor Access" screen
- Step 2.5.2: User sees list of all available data sections/modules with toggle switches:
  - **Family Constitution**: View family governance documents (default: ON)
  - **Financial Information**: View assets, budgets, financial data (default: OFF)
  - **Meeting Notes**: Access family council meeting notes and minutes (default: ON)
  - **Decision History**: View past family decisions and voting results (default: ON)
  - **Tasks & Projects**: View and comment on family tasks (default: OFF)
  - **Member Profiles**: View detailed family member profiles (default: LIMITED - names and roles only)
  - **Communication History**: Access to announcements and conversations (default: LIMITED - recent only)
  - **Conflict Resolution Cases**: Access to conflict mediation history (default: OFF)
  - **Succession Plans**: View succession planning documents (default: OFF)
  - **Philanthropy Projects**: Access to charitable giving strategy (default: OFF)
  - **Education Programs**: View mentorship and learning programs (default: ON)
- Step 2.5.3: User can select granular permissions within each section (View Only / Comment / Edit)
- Step 2.5.4: User can set time-based access restrictions:
  - **Full-time access**: Advisor can access data anytime
  - **Session-based**: Access only during scheduled consultations
  - **Time-limited**: Set expiration date for access (e.g., 6 months)
- Step 2.5.5: User sees preview of what advisor will see based on selected permissions
- Step 2.5.6: User can save as "Access Template" for future advisor invitations
- Step 2.5.7: User reviews and confirms access configuration
- Step 2.5.8: User clicks "Send Invitation with Permissions" to finalize

**System Responses:**
- Display all available data modules organized by category
- Show default recommended permissions based on advisor expertise area
- Provide permission presets:
  - **Governance Advisor**: Constitution, Meetings, Decisions (read-only)
  - **Financial Advisor**: Financial info, Assets, Succession (read-only)
  - **Conflict Mediator**: Conflict cases, Communication, Member profiles (limited)
  - **Education Mentor**: Education programs, Tasks, Member profiles (limited)
  - **Full Consultant**: All sections with granular control
- Store permission configuration in association record as JSON structure
- Enforce permissions at data access layer (not just UI)
- Log all permission changes in audit trail
- Allow Family Council to modify permissions after association is active

**User Expectations:**
- Clear understanding of what data advisor will access
- Confidence that sensitive information remains private
- Flexibility to grant/restrict access based on specific needs
- Ability to change permissions later if needed
- Visual preview of advisor's view
- Quick setup with sensible defaults

**Responsible Roles:**
- Family Council Member: Configures and approves access permissions
- System: Stores permissions, enforces access rules, provides defaults

**Business Rules:**
- **Default Access**: Advisors get minimal read-only access by default (Constitution, Meeting notes)
- **Sensitive Data Protected**: Financial, conflict, succession data OFF by default
- **Granular Control**: Permissions per module, not all-or-nothing
- **Permission Hierarchy**: View < Comment < Edit (cannot have Edit without View)
- **Time-Based Access**: Optional expiration dates for temporary engagements
- **Template Reuse**: Families can save permission sets for similar advisors
- **Retroactive Changes**: Family Council can modify permissions anytime for active associations
- **Audit Trail**: All permission changes logged with timestamp and user who changed
- **Privacy Override**: Certain sensitive documents can be explicitly excluded even within allowed sections

**Pain Points:**
- Complex permission matrix may overwhelm users
- Difficult to preview exactly what advisor will see
- No guidance on recommended permissions for different advisor types
- Cannot test permissions before finalizing invitation
- No bulk permission management for multiple advisors

---

### Stage 3: Advisor Acceptance & Association Activation
**Goal**: Advisor reviews and accepts invitation, activating family association

**User Actions:**
- Step 3.1: Advisor logs into Advisor Portal
- Step 3.2: Advisor navigates to "Families" section
- Step 3.3: Advisor sees pending invitation notification with family name and message
- Step 3.4: Advisor reviews invitation details (family name, message, invited by)
- Step 3.5: Advisor clicks "Accept Invitation" to approve association
- Step 3.6: System confirms association is now "active"

**System Responses:**
- Update association record status from "pending" to "active"
- Record acceptance timestamp
- Grant advisor association-based access to family data:
  - Read-only access to family constitution and governance documents
  - Ability to create consultations and workshops for this family
  - Access to family member list (names and roles only)
  - Ability to share knowledge resources with family
- Create notification for Family Council Member
- Cache family name in association record for performance
- Log association activation in audit trail

**User Expectations:**
- Clear notification about new invitation
- Easy-to-understand invitation details
- Simple one-click acceptance process
- Immediate confirmation that association is active
- Understanding of what family data they can now access

**Responsible Roles:**
- External Advisor: Reviews and accepts invitation
- System: Activates association, grants access, sends notifications

**Business Rules:**
- Only invited advisor can accept their own invitations
- Acceptance changes status from "pending" to "active"
- Advisor gains association-based access only (not direct family membership)
- Family data access limited to read-only for most documents
- Advisor can create consultations and share resources with family

**Pain Points:**
- No preview of family information before acceptance
- Cannot decline invitation with reason (only accept or ignore)
- No expiration mechanism for pending invitations
- Unclear what specific data advisor will have access to after acceptance

---

### Stage 4: Post-Association Verification & Access
**Goal**: Verify association is active and both parties can access expected functionality

**User Actions (Family Council Member):**
- Step 4.1: Family Council Member refreshes Mentorship page
- Step 4.2: User sees advisor now appears with "Associated" badge
- Step 4.3: User can now:
  - Request consultations with advisor
  - Schedule workshops facilitated by advisor
  - Access knowledge resources shared by advisor
  - View advisor in family's advisor list
  - **Manage advisor access permissions** (click "Manage Access" button)
- Step 4.4: User can modify advisor permissions at any time:
  - Click "Manage Access" on advisor card
  - System shows current permission configuration
  - User can enable/disable any section
  - User can change granular permissions (View/Comment/Edit)
  - User can extend or shorten access expiration date
  - User can temporarily suspend advisor access without removing association
  - Changes take effect immediately
- Step 4.5: User can view **Access Activity Log**:
  - See what sections advisor has accessed
  - See when advisor last accessed family data
  - Review permission change history
  - Monitor advisor engagement level

**User Actions (Advisor):**
- Step 4.6: Advisor navigates to family profile in Advisor Portal
- Step 4.7: Advisor sees clear indicators of what sections they can access:
  - Sections with access shown with green checkmark
  - Restricted sections shown with lock icon and explanation "Access restricted by Family Council"
  - Permission level displayed for each accessible section (View Only / Comment / Edit)
- Step 4.8: Advisor can now access permitted sections:
  - View family constitution and governance documents (if permitted)
  - Create consultation sessions with family members (always allowed)
  - Share knowledge resources with family (always allowed)
  - Participate in family governance discussions as advisor role (if permitted)
  - View only the data sections granted by Family Council
- Step 4.9: Advisor receives notification if permissions are changed:
  - "Your access permissions have been updated for [Family Name]"
  - Shows what changed (added or removed permissions)
  - Advisor can view current permission set at any time

**System Responses:**
- Display associated advisors to family members with proper badges
- Enable consultation scheduling between family and advisor
- Provide advisor with read access to family governance documents
- Enforce data isolation (advisor sees only associated families)
- Maintain audit trail of all advisor-family interactions

**User Expectations (Family):**
- Immediate visibility of associated advisor
- Ability to schedule consultations right away
- Confidence that advisor has appropriate access level
- Understanding of what data advisor can see

**User Expectations (Advisor):**
- Clear view of newly associated family
- Access to relevant family context for consultations
- Ability to provide services immediately
- Understanding of data access boundaries

**Responsible Roles:**
- Family Council Member: Verifies advisor access, engages advisor services
- External Advisor: Accesses family context, provides advisory services
- System: Enforces association-based data access, maintains isolation

**Business Rules:**
- Family members can only see advisors associated with their family
- Advisors can only access families where association exists and is active
- No cross-family data access possible
- Association can be deactivated without deleting historical records
- All advisor-family interactions are logged for audit purposes

**Pain Points:**
- No guided next steps after association is active
- Unclear for families how to best engage new advisor
- Limited visibility into advisor's availability for consultations
- No automated matching of family needs to advisor services

---

## 🎯 Conceptual System Requirements

### Functional Requirements

1. **Advisor Registry Management**: System must maintain global registry of advisors with profile information, expertise areas, and verification status
2. **Invite Code System**: System must support invite code generation, validation, and usage tracking with expiration and usage limits
3. **Association Management**: System must create, track, and manage family-advisor associations with status tracking (pending, active, inactive)
4. **Access Control**: System must enforce association-based access for advisors (different from standard family member access)
5. **Granular Permission Management** (NEW): System must support configurable, section-level access permissions for advisors with:
   - Per-module access control (Constitution, Financial, Meetings, etc.)
   - Permission levels per module (View Only, Comment, Edit)
   - Time-based access restrictions (expiration dates, session-based access)
   - Permission templates for quick configuration
   - Real-time permission enforcement at data access layer
   - Permission change history and audit trail
6. **Notification System**: System must notify both parties at key stages (invitation sent, invitation accepted, association status changes, permission changes)
7. **Audit Trail**: System must log all invitation, association, and permission change events for compliance and dispute resolution
8. **Access Activity Monitoring** (NEW): System must track and log advisor data access patterns for family oversight

### Integration Needs

- **Authentication System**: Verify user roles and permissions (Family Council, Admin)
- **Notification Service**: Send invitations, acceptance confirmations, and status updates
- **Advisor Portal**: Separate interface for advisor acceptance and family management
- **Family Portal**: Interface for family members to discover and invite advisors
- **Consultation Scheduling**: Enable consultation booking between families and advisors
- **Document Access**: Provide read-only access to family governance documents for advisors

## 🔐 Multi-Tenancy & Data Isolation

### Family Data Isolation (CRITICAL)

**Key Principles:**
- Advisors use **association-based access**, NOT standard family_id filtering
- Users see only advisors associated with their family
- Advisors see only families where active association exists
- No cross-family data access at any point in the journey
- Family context maintained throughout all stages for family members

**What This Means for the Journey:**
- When family members view advisors, they see only associated advisors
- When advisors view families, they see only families they're associated with
- Invite code usage automatically captures family context
- Association record links family and advisor with explicit status
- All operations respect association boundaries

### Advisor-Specific Access Model

**Difference from Standard Multi-Tenancy:**
- **Family Members**: Direct family_id-based access to family data
- **Advisors**: Association table JOIN required for family data access
- **Advisors have NO family_id in their profile** - they use advisor_id
- **Advisors access multiple families** through association records

**Data Access Patterns:**
- Family viewing advisors: Filter by associations where family_id matches user's family
- Advisor viewing families: Filter by associations where advisor_id matches advisor's ID
- Advisor accessing family data: JOIN through associations table, filter by active status

## 🔑 Permissions & Access Control

### Required Permissions by Stage

- **Stage 1 (Discovery)**: Any authenticated family member can view advisor registry
- **Stage 2 (Invitation)**: Only Family Council or Admin can send invitations
- **Stage 3 (Acceptance)**: Only authenticated advisor with active account
- **Stage 4 (Access)**: Active association required for data access

### Role-Based Access

| Role | Can View Advisors | Can Invite Advisor | Can Accept Invitation | Can Access Family Data |
|------|-------------------|--------------------|-----------------------|------------------------|
| **Family Member** | Associated only | No | No | N/A |
| **Family Council** | All advisors | Yes (via invite code) | No | N/A |
| **Admin** | All advisors | Yes (via invite code) | No | N/A |
| **External Advisor** | N/A | N/A | Yes (own invitations only) | Associated families only |

### Permission Enforcement Points

- Invitation button protected by Family Council/Admin check
- Invite code usage validates family context automatically
- Advisor acceptance validates advisor ownership of invitation
- Family data access requires active association check
- All operations logged for audit trail

## 📋 Business Rules & Controls

### Key Validation Rules

1. **Invite Code Validation**:
   - Code must exist in system
   - Code must be active (not deactivated)
   - Code must not be expired (if expiration set)
   - Code usage must be within limits (current uses < max uses)

2. **Association Creation**:
   - Same family cannot use same invite code twice (unique constraint)
   - Association starts with status "pending"
   - Family context automatically captured from user session
   - User ID captured for audit trail (who invited)

3. **Association Activation**:
   - Only advisor who owns invitation can accept
   - Acceptance changes status from "pending" to "active"
   - Acceptance timestamp recorded
   - Family name cached for performance

4. **Data Access**:
   - Advisors access only families with "active" associations
   - Family members see only advisors with "active" associations to their family
   - No cross-family data access possible
   - Read-only access to most family documents for advisors (configurable)

5. **Permission Configuration** (NEW):
   - Family Council must configure permissions during invitation process
   - Default permission set applied based on advisor expertise area
   - Permissions stored as JSON structure in association record
   - Permission changes take effect immediately
   - Advisors notified of any permission changes
   - Certain sensitive modules OFF by default (Financial, Succession, Conflict Resolution)
   - Basic advisor functions always allowed (consultations, knowledge sharing)

6. **Permission Enforcement** (NEW):
   - Permissions checked at API level (not just UI)
   - Advisor requests to restricted data return 403 Forbidden
   - Permission hierarchy respected (Edit requires View)
   - Time-based permissions expire automatically
   - Suspended access blocks all data access except consultation scheduling
   - System prevents privilege escalation attempts

### Business Logic

- **Invite Code Generation**: Advisors create codes with usage limits and optional expiration
- **Association Workflow**: pending → active (or ignored/expired)
- **State Transitions**: Clear states (pending, active, inactive) with timestamp tracking
- **Usage Limits**: Prevent unlimited use of single invite code
- **Referential Integrity**: Association requires both valid family and valid advisor

### Compliance & Governance

- **Privacy**: Advisor PII encrypted in database
- **Data Access**: Explicit association required for any data access
- **Audit Trail**: All invitation and acceptance events logged
- **Data Retention**: Association records retained even when inactive (historical record)
- **Right to Disconnect**: Families can deactivate advisor association at any time

## 🚨 Assumptions & Risks

### Assumptions

1. **User Behavior**:
   - Family Council members understand advisor role differences
   - Advisors check Advisor Portal regularly for invitations
   - Users trust invite code mechanism (similar to referral codes)

2. **System Capabilities**:
   - Association-based access model properly enforced
   - Advisor Portal provides separate, secure interface
   - Notification system delivers invitations reliably

3. **Data Availability**:
   - Advisor profiles complete and accurate
   - Family context available in user session
   - Invite codes generated before invitation attempt

4. **External Dependencies**:
   - Communication channel for invite code distribution (email, phone)
   - Advisor Portal accessible and functional
   - Authentication system supports both family members and advisors

### Pain Points & Friction

**Stage 1: Discovery Issues**
- No advanced search or filter by expertise area
- Limited information about advisor's consultation style
- Cannot compare multiple advisors side-by-side

**Stage 2: Invitation Issues**
- Manual invite code distribution outside platform
- No in-platform invite code request mechanism
- Potential for code entry errors (typos)

**Stage 3: Acceptance Issues**
- No family information preview before acceptance
- Cannot decline with reason (only accept or ignore)
- No expiration for pending invitations (can sit forever)

**Stage 4: Post-Association Issues**
- Unclear next steps after association activated
- Limited guidance on how to engage advisor effectively
- No visibility into advisor availability

### Edge Cases

**Base Journey Edge Cases:**
- **Invite code expires while family is entering it**: Error message with no recovery option
- **Advisor account deactivated after invitation sent**: Pending invitation becomes orphaned
- **Multiple family council members invite same advisor with different codes**: Duplicate associations possible (though unlikely)
- **Advisor ignores invitation indefinitely**: No timeout mechanism, invitation stays pending (RESOLVED: 30-day expiration)
- **Invite code used up exactly as family tries to use it**: Race condition, error message

**Permission Management Edge Cases (NEW):**
- **Permission changed while advisor is actively viewing data**:
  - Advisor has page open, Family Council revokes access → Does advisor see error mid-session or data disappears?
  - Solution: Session-based caching with re-validation on next API call
- **Permission expiration date passes during consultation**:
  - Advisor in middle of scheduled consultation, time-limited access expires
  - Solution: Grace period during active consultation sessions
- **Family Council member sets conflicting permissions**:
  - One member grants Edit access, another revokes it simultaneously
  - Solution: Last write wins with audit trail, notification to both members
- **Advisor comments on data, then loses Comment permission**:
  - Historical comments remain visible but advisor cannot reply to discussions they started
  - Solution: Display read-only version of own historical contributions
- **Permission template applied overwrites custom settings**:
  - Family had carefully configured custom permissions, accidentally applies preset template
  - Solution: Confirmation dialog "This will overwrite your custom settings. Continue?"
- **Circular permission dependencies**:
  - Edit permission requires View, but View is disabled → System in inconsistent state
  - Solution: Validation prevents saving invalid permission combinations
- **Bulk permission change affects active consultations**:
  - Applying template to 5 advisors mid-consultation disrupts their work
  - Solution: Warning if any affected advisor has active consultation
- **Time zone confusion in expiration dates**:
  - Family sets expiration for "Dec 31, 2025" but unclear what timezone
  - Solution: Display and store in family's configured timezone with UTC conversion
- **Advisor accepts invitation with restricted permissions, doesn't understand limitations**:
  - Accepts association, tries to access expected data, gets 403 errors, frustrated
  - Solution: Show permission summary in acceptance confirmation
- **Suspended access with scheduled future consultations**:
  - Family suspends advisor access but has consultations booked next week
  - Solution: Warning "This advisor has 3 upcoming consultations. Suspend anyway?"

### Operational Risks

**Base Journey Risks:**
- **Multi-tenancy violation risk**: Improper association filtering could expose cross-family data
- **Permission bypass risk**: Frontend-only guards without backend validation could allow unauthorized invitations
- **Data leakage risk**: Association-based queries missing proper filters could leak family information
- **Orphaned associations**: Pending associations never accepted clutter database
- **Invite code abuse**: Advisors could share codes publicly, creating unwanted associations

**Permission Management Risks (NEW):**
- **Permission Escalation Attack**: Advisor attempts to access restricted data by exploiting permission check logic
  - Mitigation: API-level enforcement, not just UI hiding
- **Configuration Complexity**: Family Council members confused by permission matrix, accidentally grant too much or too little access
  - Mitigation: Clear defaults, permission presets, preview functionality
- **Permission Drift**: Permissions set 6 months ago may no longer align with current advisor engagement needs
  - Mitigation: Periodic permission review reminders, access analytics
- **Audit Trail Gaps**: Permission changes not properly logged, cannot determine who changed what when
  - Mitigation: Comprehensive audit logging with user, timestamp, old/new values
- **Performance Degradation**: Checking permissions on every data access could slow down API responses
  - Mitigation: Permission caching per request, optimized queries
- **Inconsistent Enforcement**: Some endpoints enforce permissions, others forgotten during development
  - Mitigation: Centralized permission middleware, automated testing
- **False Sense of Security**: Family relies on permissions but implementation has bugs, data still exposed
  - Mitigation: Thorough security testing, penetration testing, regular audits
- **Advisor Frustration**: Advisors unable to do their job due to overly restrictive default permissions
  - Mitigation: Sensible defaults, easy permission request workflow, clear communication
- **Data Retention Conflict**: Revoking permissions doesn't affect historical data (comments, shared resources) - advisor work remains visible
  - Mitigation: Clear policy on historical data retention, option to hide/delete advisor contributions

### Open Questions

**Invitation & Association Management:**
- [x] **YES** - Should pending invitations have automatic expiration (e.g., 30 days)?
  - **Decision**: Implement 30-day auto-expiration with 7-day reminder to advisor
- [x] **YES** - Should advisors be able to decline invitations with a reason?
  - **Decision**: Add "Decline" button with optional reason field, notify family
- [x] **YES** - Should families be able to request invite codes directly within platform?
  - **Decision**: Add "Request Code" workflow with advisor approval step (GAP-1)
- [x] **NO** - Should there be a limit on number of advisors per family?
  - **Decision**: No hard limit, but provide analytics to Family Council on advisor count
- [x] **YES** - Should families be notified if advisor deactivates their account?
  - **Decision**: Send notification and mark association as "advisor inactive"
- [x] **NO** - Should there be a probationary period for new advisor associations?
  - **Decision**: Not needed - Family Council can suspend access anytime if concerns arise

**Permission Management (NEW):**
- [ ] Should default permissions be different based on family governance maturity level?
  - Example: More mature families might grant broader default access
- [ ] Should advisors see a preview of their access scope before accepting invitation?
  - Currently they only learn after acceptance
- [ ] How long should permission change history be retained?
  - Compliance requirement: 7 years? Indefinitely?
- [ ] Should there be mandatory permissions that cannot be disabled?
  - Example: Always allow consultation scheduling, knowledge sharing
- [ ] Should Family Council members have individual permission settings, or family-wide?
  - Can different council members configure different permissions for same advisor?
- [ ] Should permission templates be shareable across families (industry standards)?
  - Example: "Standard Financial Advisor Access" template available to all families
- [ ] What happens to advisor's work (comments, shared resources) if permissions are revoked?
  - Should historical data remain visible to family, or be hidden/deleted?
- [ ] Should advisors be able to request temporary permission escalation?
  - Example: "Need access to financial data for 1 week to complete succession plan"
- [ ] Should system warn advisors when their access is about to expire?
  - 30-day, 7-day, 1-day warnings before expiration date?
- [ ] Should there be bulk permission management for multiple advisors?
  - Example: "Apply these permissions to all governance advisors"

## 🔗 Gaps & Opportunities

### GAP-1: In-Platform Invite Code Request
**Description**: Families cannot request invite codes from advisors within platform; must obtain code through external communication
**Current State**: Manual invite code distribution via email, phone, or verbal communication
**Impact**: Friction in invitation process, potential for errors, no audit trail of code requests
**Proposed Solution**: Add "Request Invite Code" button that sends notification to advisor, who can approve and auto-generate code
**Priority**: Medium
**Dependencies**: Notification system enhancement, advisor consent workflow

### GAP-2: Advisor Search & Filter Enhancement
**Description**: No search/filter by expertise area, specialization, ratings, or availability
**Current State**: Manual scrolling through full advisor list
**Impact**: Difficult to find suitable advisor from large list, poor user experience
**Proposed Solution**: Add search bar, filter chips for expertise areas, ratings, years of experience, and availability calendar integration
**Priority**: High
**Dependencies**: Enhanced advisor profile data, search indexing

### GAP-3: Invitation Expiration & Reminder System
**Description**: Pending invitations persist indefinitely with no expiration or reminders
**Current State**: Orphaned pending invitations clutter database, families unsure of invitation status
**Impact**: Poor data hygiene, unclear user experience, wasted advisor invitations
**Proposed Solution**: Auto-expire pending invitations after 30 days, send reminder to advisor after 7 days, notify family of expiration
**Priority**: Medium
**Dependencies**: Scheduled job system, notification enhancement

### GAP-4: Explicit Invitation Decline Mechanism
**Description**: Advisors can only accept or ignore invitations; no decline action with optional reason
**Current State**: Families unaware if advisor declined or simply hasn't seen invitation
**Impact**: Uncertainty for families, no feedback loop for improvement
**Proposed Solution**: Add "Decline Invitation" button with optional reason field, notify family of decline with reason (if provided)
**Priority**: Low
**Dependencies**: Notification system, association status enhancement (add "declined" status)

### GAP-5: Advisor Recommendation Engine
**Description**: No intelligent advisor matching based on family needs and advisor expertise
**Current State**: Manual search through all advisors, suboptimal matches
**Impact**: Time-consuming discovery process, potential mismatch between family needs and advisor expertise
**Proposed Solution**: AI-powered advisor recommendations based on family profile, governance maturity, historical engagements, and advisor specializations
**Priority**: Low
**Dependencies**: AI/ML infrastructure, enhanced family and advisor profiling, historical engagement data

### GAP-6: Family Information Preview for Advisors
**Description**: Advisors cannot preview any family information before accepting invitation
**Current State**: Blind acceptance without context of family size, governance maturity, or needs
**Impact**: Potential mismatch, advisors accept invitations they may not be suited for
**Proposed Solution**: Provide limited family profile preview (size, governance maturity level, stated needs) to advisor before acceptance
**Privacy Considerations**: Must balance transparency with family privacy - only high-level, non-sensitive information
**Priority**: Low
**Dependencies**: Family profile data structure, privacy review

### GAP-7: Granular Advisor Access Permissions (NEW - HIGH PRIORITY)
**Description**: No way to configure what specific data sections advisor can access; current model is all-or-nothing
**Current State**: Advisors get blanket read access to most family data or no access at all
**Impact**:
- Families hesitant to invite advisors due to privacy concerns
- Cannot engage specialists for narrow scope (e.g., financial advisor shouldn't see conflict resolution cases)
- Risk of sensitive data exposure to external parties
- No audit trail of what advisor actually accessed
**Proposed Solution**: Implement granular, section-level access permissions:
- **Stage 2.5**: Permission configuration during invitation with module toggles
- **Permission Presets**: Templates based on advisor type (Governance, Financial, Mediator, Mentor)
- **Granular Levels**: View Only, Comment, Edit per section
- **Time-Based Access**: Expiration dates, session-based access
- **Post-Activation Management**: Family Council can modify permissions anytime
- **Access Activity Log**: Track what sections advisor accessed and when
- **Notification System**: Notify advisor when permissions change
**Priority**: HIGH (Critical for privacy and trust)
**Dependencies**:
- Permission storage system (JSON in association record)
- API-level permission enforcement (not just UI)
- Audit logging infrastructure
- Notification system enhancement
**Business Value**:
- Increased family confidence in advisor engagement
- Better compliance with privacy requirements
- Reduced risk of data leakage
- Clearer scope of advisor role
**User Impact**:
- Families can engage advisors for specific needs without exposing all data
- Advisors have clear understanding of their access scope
- Family Council retains full control over sensitive information

### Future Enhancement Ideas

- **Multi-advisor comparison tool**: Side-by-side comparison of advisor profiles, expertise, rates
- **Advisor availability calendar**: Real-time visibility into advisor availability for consultations
- **Automated consultation scheduling**: Directly book consultation from advisor profile
- **Advisor performance ratings**: Family feedback and ratings for advisor services
- **Advisor specialization badges**: Visual indicators for expertise areas (succession, conflict resolution, etc.)
- **Smart invite code sharing**: Secure in-platform code sharing with usage analytics
- **Association health monitoring**: Track engagement level between family and advisor, flag inactive associations
- **Permission Analytics Dashboard** (NEW): Visual analytics showing:
  - Which advisors have access to which sections
  - Access frequency heatmap (which sections advisors use most)
  - Permission change timeline
  - Comparison of permission sets across advisors
- **Role-Based Permission Templates** (NEW): Pre-built permission templates based on:
  - Industry standards for different advisor types
  - Family governance maturity level
  - Regulatory compliance requirements
- **Advisor Access Request System** (NEW): Allow advisors to request additional permissions:
  - Advisor explains why they need access to specific section
  - Family Council reviews and approves/denies request
  - Request tracked in audit log
- **Emergency Access Suspension** (NEW): One-click temporary suspension of all advisor access:
  - In case of breach concerns or advisor behavior issues
  - Can reactivate later without reconfiguring permissions
  - Logs reason for suspension
- **Document-Level Permissions** (NEW): Even finer control than section-level:
  - Exclude specific documents within allowed sections
  - "Advisor can see Constitution but not Article X about succession"
  - Useful for highly sensitive individual documents

## 🔗 Links & References

### Related Documentation

- **System Catalog**: [SYSTEM_COMPONENTS_CATALOG.md](../SYSTEM_COMPONENTS_CATALOG.md) - Microservices reference
- **Glossary**: [family-governance-glossary.md](../family-governance-glossary.md) - Domain terminology
- **Guidelines**: [KNOWLEDGE_BASE_GUIDELINES.md](../KNOWLEDGE_BASE_GUIDELINES.md) - Documentation standards
- **Target Audience**: [target-audience.md](../target-audience.md) - Advisors segment description

### Related Personas

- [Family Council Member](../02-user-personas/family-council-member-persona.md) - Invitation initiator
- [External Advisor](../02-user-personas/external-advisor-persona.md) - Invitation recipient and service provider
- [Family Member](../02-user-personas/family-member-persona.md) - Advisor services beneficiary

### Related Features

- [Feature Specifications](../05-feature-specifications/README.md)
- Mentorship Programs (Education Service)
- Consultation Scheduling (Advisor Portal Service)
- Knowledge Center (Advisor Portal Service)

### Related Modules

- [Business Modules](../03-business-modules/README.md)
- Advisor Portal Service
- Auth Service
- Education Service
- Notification Service

### Technical Documentation

**Note**: Technical implementation details (routes, APIs, database schemas) are documented separately in technical specifications within the Product Management folder (`Product/01-product-management/technical-specs/`). This journey document focuses on business logic and user experience.

- **Architecture**: `/CLAUDE.md` - Core principles, **⚠️ Special Section on Advisor Portal architecture**
- **Backend Patterns**: `/.claude/contexts/backend.md` - FastAPI microservices
- **Frontend Patterns**: `/.claude/contexts/frontend.md` - React patterns
- **Database Patterns**: `/.claude/contexts/database.md` - Multi-tenancy and **association-based access**

### Research & Discovery

- User interviews with Family Council members (Q2 2024)
- Advisor feedback sessions (Q3 2024)
- Competitive analysis of advisor platforms (Q1 2024)
- Technical feasibility study for association-based access model (Q4 2023)

---

## ✅ Planning Checklist

### Content Completeness
- [x] Context section fully populated with goals and personas
- [x] All 4 stages documented with user actions and system responses
- [x] Business value and user impact clearly stated
- [x] Success criteria defined and measurable
- [x] Triggers and preconditions identified

### Business Logic
- [x] Business rules documented and validated
- [x] Validation rules defined (invite code, association creation, activation)
- [x] Permission requirements specified (role-based access)
- [x] Compliance requirements identified (privacy, audit trail)
- [x] Edge cases considered (expired codes, inactive advisors)

### Multi-Tenancy Planning
- [x] Family data isolation requirements documented
- [x] Association-based access model explained
- [x] No cross-family access scenarios identified
- [x] Family context maintained throughout journey
- [x] Data isolation test scenarios defined

### User Experience
- [x] User pain points identified (all 4 stages)
- [x] UI/UX needs described conceptually
- [x] Navigation flow makes sense (discovery → invitation → acceptance → access)
- [x] Error scenarios considered (invalid codes, expired invitations)
- [x] Accessibility considerations noted (clear status indicators, notifications)

### Gap Analysis
- [x] Current gaps identified (7 gaps documented including HIGH priority GAP-7)
- [x] Workarounds documented (manual invite code distribution)
- [x] Future enhancements listed (recommendation engine, comparison tool, permission analytics)
- [x] Dependencies identified (notification system, AI/ML infrastructure, permission system)
- [x] Open questions captured (6 questions for stakeholder review)

### Stakeholder Review
- [x] Product manager reviewed (savelova)
- [ ] Business stakeholders approval pending for NEW permission management feature
- [x] User personas validated against journey
- [x] Technical feasibility confirmed (association-based access implemented)
- [ ] Prioritization decision pending for GAP-7 (granular permissions - HIGH priority)

### Ready for Technical Design
- [x] Functional requirements clear (including NEW permission management system)
- [x] Integration needs identified (permission storage, API enforcement, audit logging)
- [ ] User journey validated with stakeholders (pending approval for Stage 2.5)
- [x] Technical implementation for base flow complete (NEW permission feature requires implementation)

---

## 📝 Notes for Implementation Team

**Implementation Status**:
- ✅ **Base Journey**: COMPLETE - Advisor invitation with invite codes implemented in production
- 🟡 **NEW Feature**: DRAFT - Granular permission management (Stage 2.5, GAP-7) requires implementation

**Technical Documentation Location**:
- `Product/01-product-management/technical-specs/` - Technical specifications
- `Product/01-product-management/test-cases/` - Test cases and scenarios
- `.claude/contexts/` - Architecture patterns and multi-tenancy implementation

**Key Technical Considerations (Base Journey)**:
- Association-based access model requires JOIN queries (not standard family_id filtering)
- Advisors have advisor_id in JWT, NOT family_id
- Invite code validation must be atomic (prevent race conditions)
- Audit trail logging required for all association state changes
- Frontend permission guards for Family Council/Admin invitation privilege

**NEW Feature Technical Considerations (Permission Management)**:
- **Permission Storage**: JSON structure in `family_advisor_associations` table (new column: `permissions_config`)
- **Permission Schema**:
  ```json
  {
    "modules": {
      "constitution": { "access": "view", "level": "full" },
      "financial": { "access": "none" },
      "meetings": { "access": "view", "level": "full" },
      // ... other modules
    },
    "expiration_date": "2025-12-31T23:59:59Z",
    "access_mode": "full-time" | "session-based" | "time-limited",
    "suspended": false
  }
  ```
- **API-Level Enforcement**: Middleware checks permissions before allowing advisor access to any family data endpoint
- **Permission Check Pseudocode**:
  ```python
  def check_advisor_permission(advisor_id, family_id, module, action):
      association = get_association(advisor_id, family_id)
      if not association or association.status != 'active':
          return False
      if association.permissions_config.get('suspended'):
          return False
      module_perm = association.permissions_config['modules'].get(module)
      if not module_perm or module_perm['access'] == 'none':
          return False
      if action == 'edit' and module_perm['access'] != 'edit':
          return False
      if action == 'comment' and module_perm['access'] not in ['comment', 'edit']:
          return False
      # Check time-based restrictions
      if association.permissions_config.get('expiration_date'):
          if datetime.now() > parse_datetime(expiration_date):
              return False
      return True
  ```
- **Frontend Changes**:
  - New permission configuration UI in Stage 2.5
  - "Manage Access" button on advisor card in Stage 4
  - Access activity log view for Family Council
  - Visual indicators in Advisor Portal showing restricted sections
- **Database Migration**: Add `permissions_config` JSONB column to `family_advisor_associations`
- **Default Permissions**: System must generate sensible defaults based on advisor expertise area
- **Performance**: Permission checks should be cached for duration of request, not queried on every data access

---

**Document Version**: 2.1.0 (Added granular permission management feature - Stage 2.5 and GAP-7)
**Last Updated**: 2025-10-13
**Author**: savelova
**Reviewed By**: TBD
**Next Review**: 2026-01-13
**Template Alignment**: ✅ Aligned with [user-journey-template.md](../../01-product-management/05-templates/user-journey-template.md)
**Workflow Compliance**: ✅ Follows [01-workflow.md](../../01-product-management/01-workflow.md) - Stage 6 (Knowledge Transfer)

**Change Log**:
- **v2.1.0** (2025-10-13): Added Stage 2.5 (Access Permissions Configuration), GAP-7 (Granular Permissions), enhanced Stage 4 with permission management, added technical implementation notes for permission system
- **v2.0.0** (2025-10-13): Rewritten to focus on business logic and user experience, aligned with planning template
- **v1.0.0** (Initial): Original technical implementation documentation
