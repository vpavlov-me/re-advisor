---
epic_id: "EPIC-004"
title: "Advisor Portal - Role-Based Access Control & Permission Management"
type: "epic"
category: "advisor-platform"
status: "ready-for-planning"
priority: "high"
created: "2025-10-17"
updated: "2025-10-20"
owner: "Eduard Izgorodin"
stakeholder: "Product Team"
related_epics: ["EPIC-003"]
tags: ["advisor", "permissions", "rbac", "access-control", "lifecycle", "audit"]
---

# Epic: Advisor Portal - Role-Based Access Control & Permission Management

> **Note:** This Epic describes the comprehensive role-based permission management system for advisors with three-tier access control, lifecycle management, and audit logging.

---

## ðŸŽ¯ Epic Goal

**What will this Epic deliver?**

This Epic will deliver a comprehensive role-based permission management system for advisors, enabling families to control advisor access with granular permissions, lifecycle management, and complete audit trails.

**User-facing value:**
- Admins and Consuls can manage advisor permissions with granular section-level control (View, View+Modify, View+Modify All)
- Consultants automatically transition to view-only mode after service completion with frozen data snapshots
- Time-bound access control with optional expiration dates and automated enforcement
- Complete audit trail of all permission changes via downloadable reports for security and compliance
- Advisors can work on multiple portals simultaneously (one account per portal) for different families

**Business value:**
- Enhanced security through three-tier permission model (View, View+Modify related, View+Modify All)
- Flexible engagement models for different advisor relationships with lifecycle management
- Historical data preservation when service engagements end (frozen snapshots)
- Compliance-ready audit logging with export capabilities
- Multi-portal advisor support enables serving families through different engagement models simultaneously

**Scope boundaries:**

✅ **Included:**
- Four distinct advisor roles: External Consul, Consul (Family Portal), Personal Family Advisor, Consultant
- **Three-tier permission model:** View, View+Modify (related only), View+Modify All
- Role-based permission system with granular access control to Family Portal sections
- Permission management interface for Admins/Consuls
- **Service engagement lifecycle management (active → completed → view-only with frozen snapshots)**
- **Permission expiration dates (optional, time-bound access)**
- **Audit log export (CSV/PDF) accessible from settings - no separate UI tab**
- **Multi-portal advisor support (separate accounts per portal)**
- **Support for Standard Consultant and Premium Consultant (with Family Portal creation capability)**
- Permission templates including Consul and Admin presets
- Single-email-per-portal restriction (one email cannot be registered twice on same portal)

âŒ **NOT Included:**
- Consultant profile and service catalog management (separate Epic: Service Marketplace)
- Service request workflow from Family Portal to Advisor Portal (separate Epic: Service Marketplace)
- External Consul invitation flow (separate Epic: Invite Code System - mentioned here for context only)
- Premium Consultant Family Portal creation and management (separate Epic: B2B2C Model)
- Permission copying from another advisor
- Bulk permission tier upgrades
- Tier upgrade confirmation dialogs
- "Modify All" usage highlighting in UI
- Consultant mid-engagement access extension requests
- Automatic service completion notifications
- Emergency access revocation / force logout functionality
- Permission change versioning with rollback capability
- Dedicated Audit Log UI tab/page (only export from settings)
- Advisors viewing their own permission audit logs

---

## ðŸ'¥ Target Users

**Who will use this feature?**

**Primary Personas:**
- **Consul (Family Portal)** - managing all advisor relationships and permissions
- **Admin (System Administrator)** - family configuration and advisor management
- **External Advisor (External Consul variant)** - working through Advisor Portal with elevated permissions
- **External Advisor (Personal Family Advisor variant)** - working through either portal with custom permissions
- **External Advisor (Consultant variant - Standard)** - independent service providers with lifecycle-managed access via marketplace
- **External Advisor (Consultant variant - Premium)** - creates and manages Family Portals for client families (B2B2C model)

**Secondary Personas:**
- Family Member - indirect benefit from controlled advisor access

---

## ðŸ"– User Stories (High-Level)

> **⚠️ IMPORTANT TERMINOLOGY NOTE:**  
> In user stories and related documentation, you may encounter the term **"Service Advisor"**. This is a legacy term that has been replaced with **"Consultant"** for consistency with industry standards and existing platform documentation.  
> 
> **When you see "Service Advisor" in any story, requirement, or specification, treat it as equivalent to "Consultant".**
> 
> **Examples:**
> - "Service Advisor permissions" = "Consultant permissions"
> - "Service Advisor lifecycle" = "Consultant lifecycle"
> - "Service Advisor frozen snapshot" = "Consultant frozen snapshot"

**Main scenarios this Epic will enable:**

### Phase 1: Core Permission Model & Templates (Foundation)

**SAAS-EPIC-XXX-1:** **As a Consul**, **I want to** assign three-tier permissions (View, View+Modify, View+Modify All) to advisors per section, **so that** I can control whether they work only with their own materials or access all family data.

**SAAS-EPIC-XXX-11:** **As an Admin/Consul**, **I want to** use permission templates (External Consul, Consul, Admin, specialized roles), **so that** I can quickly assign appropriate access levels.

**SAAS-EPIC-XXX-3:** **As an External Consul**, **I want to** have View+Modify All access to all governance sections except billing and extensions, **so that** I can coordinate family operations across all materials.

### Phase 2: Advisor Role-Specific Permissions

**SAAS-EPIC-XXX-4:** **As a Personal Family Advisor**, **I want to** have View+Modify (related) permissions by default, **so that** I can work with my own materials without accessing other advisors' work.

**SAAS-EPIC-XXX-5:** **As a Consultant** *(formerly "Service Advisor")*, **I want to** receive automatic View+Modify (related) permissions to sections based on service type, **so that** I can immediately start work with appropriate access scope.

**SAAS-EPIC-XXX-6:** **As a Consul**, **I want to** upgrade Consultant *(formerly "Service Advisor")* from "related only" to "All" access on specific sections, **so that** I can expand their scope when needed.

### Phase 3: Service Lifecycle & Frozen Snapshots

**SAAS-EPIC-XXX-10:** **As a System**, **I want to** automatically downgrade Consultant *(formerly "Service Advisor")* permissions to view-only when service completes, **so that** they maintain historical access without creating new content.

**SAAS-EPIC-XXX-7:** **As a Consultant** *(formerly "Service Advisor")*, **I want to** retain view-only access to my work materials after service completion with frozen data snapshots, **so that** I can reference past engagements without seeing new family data.

### Phase 4: Time-Bound Access & Expiration

**SAAS-EPIC-XXX-2:** **As a Consul**, **I want to** set optional expiration dates on advisor permissions, **so that** I can grant time-bound access for temporary engagements.

### Phase 5: Audit Logging & Compliance

**SAAS-EPIC-XXX-8:** **As an Admin/Consul**, **I want to** download audit log reports from settings in CSV or PDF format, **so that** I can review permission history for compliance without cluttering the main interface.

### Phase 6: Multi-Portal Support

**SAAS-EPIC-XXX-9:** **As an Advisor**, **I want to** maintain separate accounts on Family Portal and Advisor Portal with different emails, **so that** I can serve one family internally while providing services to others externally.

---

**Detailed User Stories will be created in RLN1/RLN2 during Grooming**

---

## ðŸ"— Dependencies & Risks

### Dependencies (Blockers)

**Upstream:**
- Epic: SAAS-XXX - Advisor Portal Multi-Family Association Architecture (completed - see `external-advisor-persona.md`)
- Feature: Authentication Service enhancement for per-portal email validation
- Feature: Permission framework foundation in auth-service (port 8001)
- Feature: Audit logging infrastructure

**Downstream:**
- Epic: SAAS-YYY - Service Marketplace (Consultant profile, catalog, service requests)
- Epic: SAAS-ZZZ - Invite Code System (External Consul and advisor invitations)
- Epic: SAAS-AAA - B2B2C Model (Premium Consultant Family Portal creation and management)
- Feature: Service contract management and SLA tracking

**Cross-Epic Dependencies:**
- **Service Marketplace Epic** will use permission model defined here
- **Invite Code Epic** will trigger permission provisioning defined here
- Service completion status comes from **Service Marketplace Epic** → triggers view-only transition in this Epic
- **B2B2C Model Epic** will use External Consul role provisioning defined here for Premium Consultants

### Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Three-tier permission model (View/Modify/Modify All) may confuse Admins/Consuls | High | Clear UI labels, tooltips, permission templates with pre-configured tiers, comprehensive documentation |
| "Related only" vs "All" logic complexity may have edge cases | High | Define clear ownership rules (creator = owner), extensive testing, backend validation on every query |
| Frozen snapshot implementation complexity may impact performance | High | Optimize queries with indexed date ranges and ownership fields, consider caching |
| Permission expiration logic may fail silently causing security issues | Critical | Implement monitored scheduled jobs, alerting on failures, comprehensive testing, pre-expiration notifications |
| Multi-portal advisor support may cause confusion about which account to use | Medium | Clear onboarding documentation, email notifications specify portal context, separate branding/UI per portal |
| Audit log export from settings may be hard to discover | Low | Prominent placement in settings, tooltip/help text, mention in onboarding materials |
| View-only mode enforcement may have edge cases allowing data modification | High | Backend validation on ALL modify operations, extensive security testing, regular permission audits |
| Terminology inconsistency between legacy stories and new implementation | Medium | Clear documentation of terminology mapping, training for team members, consistent use in new stories |

---

## ðŸ" Design & UX

**Figma Links:**
- [Three-Tier Permission Management Interface with Templates - Figma URL]
- [Audit Log Export in Settings - Figma URL]
- [Multi-Portal Advisor Registration Flow - Figma URL]
- [Consultant: View-Only Post-Service Mode - Figma URL]
- [Permission Matrix Dashboard with Three Tiers - Figma URL]

**UX Notes:**

### User flows

**1. Permission Management Flow (Admin/Consul) - Three-Tier Model:**
- Admin/Consul navigates to Advisor Management
- Selects advisor or creates new advisor invitation
- Chooses advisor role (External Consul, Personal, Consultant)
- Uses permission template OR configures granular permissions:
  - Select sections (Constitution, Meetings, Tasks, etc.)
  - **Set access level per section:**
    - **None:** No access to section
    - **View:** Read-only access to all data in section
    - **View + Modify (related):** View all, modify only own materials
    - **View + Modify All:** Full access to all data in section
- Optionally sets expiration date with date picker
- Reviews permission summary with tier indicators
- Confirms and saves
- System logs permission change in audit log
- Advisor receives notification

**2. Service Engagement Completion Flow (Consultant):**
- Consultant working with active permissions (auto-provisioned as View+Modify related)
- Service marked as completed (trigger from Service Marketplace Epic)
- System captures service_end_date (current timestamp)
- System automatically transitions permissions to "View (related only)" mode
- System creates frozen snapshot boundary (service_start_date to service_end_date)
- Consultant receives notification of status change
- Advisor can view only materials they created within service period
- Advisor CANNOT create new content or edit existing items
- System logs status transition in audit log

**3. Permission Expiration Flow:**
- Admin/Consul sets expiration date when granting permissions
- System schedules expiration job
- 7 days before expiration: Email to advisor
- 3 days before expiration: Email to Admin/Consul
- On expiration date (00:00 UTC):
  - System automatically revokes permissions
  - Advisor logged out (next API call fails with 403)
  - Advisor sees message: "Your access expired on [date]. Contact family for renewal."
  - System logs expiration in audit log
- Admin/Consul can renew by extending expiration or re-inviting

**4. Multi-Portal Advisor Registration Flow:**
- **Scenario:** Advisor wants to work with Family A internally (Family Portal) and provide services to Family B externally (Advisor Portal)
- **Family A** invites advisor to Family Portal with email1@example.com
- Advisor registers on Family Portal with email1@example.com
- **Family B** discovers advisor in marketplace or advisor creates Consultant profile
- Advisor uses **different email** (email2@example.com) to register on Advisor Portal as Consultant
- Result: Advisor maintains two separate accounts:
  - Family Portal (email1): Works with Family A as internal member
  - Advisor Portal (email2): Provides services to Family B (and others) as Consultant
- Each portal validates email uniqueness only within that portal
- No migration, no account linking - fully independent accounts

**5. Audit Log Export Flow (from Settings):**
- Admin/Consul navigates to **Settings → Security → Audit Log Export**
- Sees export configuration interface:
  - Date range selector (default: last 30 days)
  - Advisor filter (optional: select specific advisor or "All advisors")
  - Action type filter (optional: grant, revoke, modify, expire, etc.)
- Selects export format (CSV or PDF)
- Clicks "Generate Report" button
- System generates report asynchronously (if large dataset)
- Downloads file or sends email with download link
- Filename: `audit_log_[family_name]_[start_date]_[end_date].[csv|pdf]`

### Permission Management UX

**Three-Tier Permission Model:**
- Section-level radio buttons/toggles:
  - ⚪ **None** - No access
  - ðŸ"µ **View** - Read-only (all data)
  - ðŸŸ¡ **View + Modify (related)** - View all, modify own materials only
  - ðŸŸ¢ **View + Modify All** - Full access to all data

**UI Helper Text:**
- **View:** "Read-only access to all family data in this section"
- **View + Modify (related):** "Can view all data, but only create/edit their own materials"
- **View + Modify All:** "Full access - can create/edit any materials in this section"

**Permission Templates Dropdown:**
- **External Consul (Advisor Portal):** All sections except Billing/Extensions → View+Modify All
- **Consul (Family Portal):** All sections except Billing/Extensions → View+Modify All (if not Admin)
- **Admin (Family Portal):** All sections including Billing/Extensions → View+Modify All
- **Governance Consultant:** Constitution, Meetings, Communication, Decisions → View+Modify (related)
- **Succession Specialist:** Succession, Education → View+Modify (related)
- **Philanthropy Consultant:** Philanthropy only → View+Modify (related)
- **Financial Observer:** Assets → View only
- **Limited Observer:** Selected sections → View only (Admin selects)
- **Custom:** Manual configuration

**Visual Indicators:**
- Color coding: View (blue), View+Modify related (yellow), View+Modify All (green)
- Icons: 👁️ (View), ✏️ (Modify related), ✅ (Modify All)
- Permission summary table showing all sections with tier badges

**Frozen Snapshot UX (Consultant View-Only Mode):**
- Banner at top: "Service completed on [date]. You have view-only access to materials from your engagement period ([start] - [end])."
- All "Create" buttons disabled with tooltip: "Service completed - view-only mode"
- Edit/Delete buttons disabled on all records
- Date filter locked to service period (service_start_date to service_end_date)
- Only materials created by this advisor during service period are visible
- Watermark on documents: "Service engagement: [start_date] - [end_date]"

**Audit Log Export in Settings:**
- Location: **Settings → Security → Audit Log Export** (no dedicated UI tab)
- Simple form interface:
  - Date range picker (calendar)
  - Advisor dropdown (all or specific)
  - Action type checkboxes (grant, revoke, modify, expire, etc.)
  - Format buttons: [CSV] [PDF]
  - [Generate Report] button
- Help text: "Download complete permission change history for compliance and audit purposes."

**See also:** [Link to 05-feature-specifications/FEAT-advisor-roles-permissions.md for detailed UX]

---

## ðŸ§® Business Rules

**Key Business Rules:**

### Three-Tier Permission Model

**Permission Levels (per section):**

1. **None:** No access to section
   - Cannot view any data
   - Cannot create or modify any content
   - Section hidden from advisor's navigation

2. **View:** Read-only access to ALL data in section
   - Can view all family data in section (not just own materials)
   - Cannot create new content
   - Cannot edit or delete any content
   - Use case: Observers, auditors, read-only advisors

3. **View + Modify (related):** View all, modify only own materials
   - Can view ALL family data in section
   - Can create new content (becomes owner)
   - Can edit/delete ONLY content they created
   - Ownership determined by `created_by_user_id` field
   - Use case: Personal Advisors, Consultants (default)

4. **View + Modify All:** Full access to all data in section
   - Can view all family data in section
   - Can create new content
   - Can edit/delete ANY content (including others' materials)
   - Use case: Consuls, Admins, highly-trusted advisors

**Ownership Rules for "Modify (related)":**
- Owner = user who created the record (`created_by_user_id`)
- Ownership is immutable (cannot be transferred)
- Examples:
  - Meeting created by Advisor A → only Advisor A can edit (if they have "related" permission)
  - Task assigned to Advisor B but created by Admin → only Admin can edit (if they have "related" permission)
  - Document uploaded by Consultant C → only Consultant C can delete (if they have "related" permission)

### Role Definitions & Permissions

**1. External Consul (Advisor Portal)**
- Access: All family governance sections EXCEPT billing, extensions
- Portal: Advisor Portal only
- **Default Permissions:** View + Modify All on all accessible sections
- Can: Manage Personal Family Advisors and Consultants (assign permissions, set expiration)
- Cannot: Access billing, extensions, change other Consuls' or Admins' permissions

**2. Consul (Family Portal)**
- Access: All family governance sections
- Portal: Family Portal only
- **Default Permissions:** 
  - If Admin: View + Modify All on ALL sections (including billing, extensions)
  - If not Admin: View + Modify All on all sections EXCEPT billing, extensions
- Can: Manage all advisors (Personal, Consultant, External Consul if Admin)
- Cannot (if not Admin): Access billing, extensions

**3. Personal Family Advisor**
- Access: Custom permissions set by Admin or Consul
- Portal: Either Family Portal OR Advisor Portal (Admin/Consul choice during invitation)
- **Default Permissions:** View + Modify (related) on granted sections
- **Can be upgraded to:** View + Modify All on specific sections by Admin/Consul
- Cannot: Manage other advisors or change own permissions

**4. Consultant (Standard & Premium)**

> **⚠️ TERMINOLOGY NOTE:** In legacy documentation and some user stories, this role may be referred to as "Service Advisor". These terms are equivalent - **Consultant = Service Advisor**.

**Standard Consultant:**
- Access: Auto-provisioned by Service Marketplace Epic based on service type
- Portal: Advisor Portal only
- **Default Permissions:** View + Modify (related) on sections determined by service source
  - Service requested from "Meetings" → View + Modify (related) on Meetings
  - Service requested from "Succession" → View + Modify (related) on Succession
  - Multi-section services → View + Modify (related) on all related sections
- **Can be upgraded to:** View + Modify All on specific sections by Admin/Consul after service acceptance
- **Lifecycle States:**
  - **Active:** View + Modify (related) or View + Modify All as provisioned
  - **Completed:** Automatically downgraded to View (related only) with frozen snapshot
- Cannot: Manage other advisors or change own permissions
- **Discovery:** Via marketplace search and service catalog

**Premium Consultant (B2B2C Model):**
- All Standard Consultant features, PLUS:
- Can create and manage Family Portals for client families
- Automatically receives External Consul role in all managed families
- Portal Administrator role in managed families
- **Note:** Premium Consultant features (Family Portal creation) are out of scope for this Epic - covered in separate B2B2C Model Epic

### Service Engagement Lifecycle & Frozen Snapshots

**Rule 1: Service Status Transitions**
- States: Active → Completed (triggered by Service Marketplace Epic)
- Active: Full permissions as provisioned (View+Modify related or View+Modify All)
- Completed: Automatic immediate downgrade to **View (related only)** with frozen snapshot
- Cannot transition from Completed back to Active (must create new service engagement via Service Marketplace Epic)

**Rule 2: Frozen Snapshot - Simple Explanation**

When a Consultant's engagement ends, the system "freezes" their view of the family's data to show only what existed during their work period. It's like taking a photograph of their workspace at the moment the service completed.

**What this means:**
- The advisor can still see the materials they created (documents, meeting notes, tasks, etc.) during the time they were actively working
- They can view this historical data for reference purposes
- The timeframe is locked: they only see data from the day their service started to the day it ended
- Any new family information created after their service ended is invisible to them
- They cannot create any new materials or edit anything, even their own past work

**Why we do this:**
- Advisors maintain access to their own work for professional records and continuity
- Families protect their ongoing activities from advisors whose engagement has ended
- Historical context is preserved without granting access to current family matters

**Example:** 
A succession planning consultant worked with a family from January to March 2025. After service completion:
- ✅ They can view the succession plan documents they created in February
- ✅ They can reference meeting notes from the January kickoff meeting
- âŒ They cannot see a new succession plan update created in April
- âŒ They cannot edit the February documents, even to fix a typo
- âŒ They cannot create new documents or meeting notes

**Rule 3: View-Only Access After Completion**
- Consultant can view (within frozen snapshot period + owned by them):
  - Documents/files they uploaded
  - Records they created (meetings, tasks, decisions, etc.)
  - Comments/notes they added
- Consultant CANNOT:
  - Create new meetings, tasks, decisions, documents, communications
  - Edit existing records (even ones they created)
  - Delete or archive any content
  - Modify permissions or invite other advisors
  - Upload new documents or files

**Rule 4: Backend Enforcement**
- ALL modify endpoints validate:
  1. User has permission to section
  2. Permission level includes "modify" capability
  3. If "Modify (related)": `created_by_user_id = current_user.id`
  4. If Consultant: service status is "active" (not "completed")
- 403 Forbidden response if validation fails with specific error:
  - "Service completed - view-only access"
  - "You can only modify your own materials"
  - "Insufficient permissions for this section"

### Permission Expiration

**Rule 1: Expiration Date Setting**
- Admin/Consul can set expiration date when creating or modifying permissions
- Expiration date is optional - if not set, access continues until manually revoked or service completes
- Minimum expiration: 24 hours from grant
- Maximum expiration: 5 years from grant (configurable)
- Expiration applies to all permissions for that advisor (cannot set different expiration per section)

**Rule 2: Expiration Notifications**
- System sends email notification to advisor 7 days before expiration:
  - Subject: "Your access to [Family Name] expires in 7 days"
  - Content: Sections affected, permission levels, expiration date, contact info for renewal
- System sends email notification to Admin/Consul 3 days before expiration:
  - Subject: "Advisor access expiring: [Advisor Name] - [Family Name]"
  - Content: Advisor name, expiration date, quick renewal link

**Rule 3: Expiration Enforcement**
- Scheduled job runs daily at 00:00 UTC (Kubernetes CronJob)
- For each expired permission:
  1. Update status to 'expired'
  2. Revoke JWT token (add to token blacklist)
  3. Send notification to advisor and Admin/Consul
  4. Log expiration in audit log
- Advisor's next API call returns 403 with message: "Access expired on [date]. Contact family admin for renewal."
- Admin/Consul can renew by:
  - Setting new expiration date (extends access)
  - Removing expiration date (indefinite access until manual revocation)
  - Re-inviting advisor with new permissions

### Multi-Portal Registration Rules

**Rule 1: Per-Portal Email Uniqueness**
- One email address can only be registered ONCE on each portal (Family OR Advisor)
- **Different emails allowed across portals:**
  - email1@example.com on Family Portal ✅
  - email2@example.com on Advisor Portal ✅
  - Same person, different emails, different contexts
- Validation occurs at registration within same portal:
  - API call checks email existence only in target portal
  - Error response: `{"error": "email_already_registered_on_this_portal"}`
- Error message: "This email is already registered on [Portal Name]. Please use a different email."

**Rule 2: Independent Multi-Portal Accounts**
- Advisors can maintain separate accounts on both portals simultaneously:
  - **Family Portal account:** Work with one family as internal participant (e.g., email1@example.com)
  - **Advisor Portal account:** Provide services to multiple families externally as Consultant (e.g., email2@example.com)
- Accounts are fully independent:
  - Separate authentication (different JWT tokens)
  - Separate permissions per family
  - No account linking or migration
  - No shared data between accounts
- Use cases:
  - Internal Consul for Family A (Family Portal) + Consultant for Families B, C, D (Advisor Portal)
  - Family Member in Family X (Family Portal) + Personal Advisor for Family Y (Advisor Portal)
  - Personal Advisor for Family Z (Family Portal) + Consultant in marketplace (Advisor Portal)

**Rule 3: No Account Migration or Linking**
- No "portal migration" feature (removed from scope)
- Each account persists independently
- If advisor wants to change email on same portal, must contact support (standard account management)

### Audit Logging

**Rule 1: What is Logged**
- **Permission events:**
  - Permission grant (who, to whom, which sections, access level, expiration)
  - Permission modification (what changed: sections, access levels [None→View→Modify→All], expiration)
  - Permission revocation (who revoked, reason if provided)
  - Permission expiration (automatic)
- **Role events:**
  - Role assignment (advisor type assigned)
  - Role change (e.g., Personal Advisor → External Consul, Personal Advisor → Consultant)
- **Lifecycle events:**
  - Service status change (active → completed)
  - Permission tier upgrades (Modify related → Modify All)
- **Access attempts:**
  - Failed permission checks (attempted action, reason for denial)

**Rule 2: Audit Log Access Control**
- **Admin:** Full audit log access for their family
- **Consul (Family Portal):** Full audit log access for their family
- **External Consul:** Full audit log access for their family
- **Personal Family Advisor:** No access to audit logs
- **Consultant:** No access to audit logs

**Rule 3: Audit Log Retention**
- Default retention: 7 years (configurable per family or system-wide)
- After retention period, logs archived to cold storage (S3 Glacier or equivalent)
- Logs never deleted, only archived
- Admin can request archive retrieval for compliance purposes

**Rule 4: Audit Log Export (from Settings)**
- **Location:** Settings → Security → Audit Log Export (no dedicated UI tab)
- Export formats: CSV, PDF
- Export configuration:
  - Date range (default: last 30 days)
  - Advisor filter (all or specific advisor)
  - Action type filter (grant, revoke, modify, expire, tier_upgrade, etc.)
- CSV format:
  - Headers: Timestamp, Actor, Action, Advisor, Role, Sections Changed, Permission Levels, Details
  - One row per audit log entry
- PDF format:
  - Header with family name, export date, filter criteria
  - Table with audit log entries
  - Footer with page numbers, generation timestamp
- Export filename: `audit_log_[family_name]_[start_date]_[end_date].[csv|pdf]`
- Large exports (>1000 records): Async job with email notification when ready

### Permission Management Rules

**Rule 1: Who Can Manage Permissions**
- **Admin:** Can manage ALL advisor permissions including Consuls, can assign all three tiers
- **Consul (Family Portal):** Can manage Personal and Consultant permissions (all tiers), NOT other Consuls or Admins
- **External Consul:** Can manage Personal and Consultant permissions (all tiers), NOT other Consuls or Admins
- **Personal Family Advisor:** Cannot manage any permissions
- **Consultant:** Cannot manage any permissions

**Rule 2: Permission Tier Upgrades**
- Default provisioning:
  - **External Consul, Consul (Family Portal):** View + Modify All on all accessible sections
  - **Personal Family Advisor:** View + Modify (related) on granted sections
  - **Consultant:** View + Modify (related) on sections from service source
- Admin/Consul can upgrade permissions:
  - None → View → View+Modify (related) → View+Modify All
  - Cannot downgrade below initial grant without explicit action
- Upgrades logged in audit log with tier change details
- Advisor receives email notification of tier upgrades

**Rule 3: Permission Expansion/Restriction**
- Permissions can be expanded (add sections, upgrade tiers) by Admin/Consul/External Consul
- Permissions can be restricted (remove sections, downgrade tiers) at any time by Admin/Consul/External Consul
- Permission changes take effect immediately (next API request re-validates permissions)
- Advisor receives email notification of permission changes:
  - Subject: "Your permissions changed for [Family Name]"
  - Content: Summary of changes with tier indicators (sections added/removed/modified)
- All changes logged in audit log with full diff

**Rule 4: Minimum Viable Permissions**
- Every advisor must have at least View access to Dashboard (automatic, cannot be removed)
- Cannot have Modify without View for same section (UI prevents, backend validates)
- Cannot have Modify All without Modify (related) intermediate (unless directly assigned)
- Cannot grant permissions to sections advisor role doesn't support:
  - External Consul/Consul: Cannot access Billing, Extensions (if not Admin)
  - Personal/Consultants: Can only access sections explicitly granted
- Cannot grant permissions that exceed grantor's own permissions:
  - Consul (non-Admin) cannot grant Billing access
  - Personal Advisor cannot grant any permissions (no management rights)

**Rule 5: Permission Templates**
- System provides pre-defined templates with three-tier configuration:
  - **External Consul (Advisor Portal):** All sections except Billing/Extensions → View+Modify All
  - **Consul (Family Portal):** All sections except Billing/Extensions → View+Modify All (if not Admin)
  - **Admin (Family Portal):** All sections including Billing/Extensions → View+Modify All
  - **Governance Consultant:** Constitution, Meetings, Communication, Decisions → View+Modify (related)
  - **Succession Specialist:** Succession, Education → View+Modify (related)
  - **Philanthropy Consultant:** Philanthropy only → View+Modify (related)
  - **Financial Observer:** Assets → View only
  - **Limited Observer:** Selected sections → View only (Admin selects)
  - **Custom:** Manual configuration
- Templates are starting points - Admin/Consul can modify after applying
- Templates stored in configuration table, editable by system admin

### Billing & Extensions Access - Simple Explanation

**Who can access Billing and Extensions sections:**
Only family members with the "Admin" role can access these two special sections. No advisors - regardless of their type or permission level - can ever access Billing or Extensions sections.

**Why this restriction exists:**
- **Billing** contains sensitive family payment information, subscription details, and financial system settings
- **Extensions** contains family configuration for third-party integrations and system customizations
- These sections require the highest level of trust and are considered family-internal only

**What this means for different roles:**
- **Admin (Family Portal):** ✅ Full access to Billing and Extensions
- **Consul (Family Portal, non-Admin):** âŒ No access to Billing or Extensions, even with "Modify All" on other sections
- **External Consul (Advisor Portal):** âŒ No access - these sections don't even appear in their navigation
- **Personal Family Advisor:** âŒ No access - cannot be granted through permission management
- **Consultant:** âŒ No access - automatic exclusion regardless of service type

**How it's enforced:**
- The system automatically hides Billing and Extensions menu items for non-Admin users
- If someone tries to access these sections directly (by typing URL), they see an error: "This section requires Admin privileges"
- Permission management interface doesn't allow Admins/Consuls to grant these permissions to advisors
- This is a hardcoded security rule that cannot be overridden

**See also:** 
- [Link to 06-business-rules/advisor-roles-three-tier-permissions.md]
- [Link to 06-business-rules/ownership-related-permissions.md]
- [Link to 06-business-rules/service-lifecycle-frozen-snapshots.md]
- [Link to 06-business-rules/permission-expiration.md]
- [Link to 06-business-rules/audit-logging.md]
- [Link to 06-business-rules/multi-portal-accounts.md]
- [Link to 06-business-rules/billing-extensions-access.md]

---

## ðŸ"… Estimated Timeline

**Phases:**

1. **Investigation & Solution Design:** 3 weeks
   - Detailed permission matrix design with three-tier model (View, Modify related, Modify All)
   - "Related" ownership logic design (created_by_user_id filtering)
   - Service lifecycle state machine and frozen snapshot query design
   - Database schema: advisor_roles, advisor_permissions (with tier column), permission_audit_log, permission_expiration
   - Multi-portal account independence architecture
   - Audit log schema, indexing strategy, retention policy
   - Permission expiration job design (Kubernetes CronJob)
   - Settings-based audit export UX design
   - Permission template definitions with three tiers
   - UX flows and wireframes
   - Terminology migration plan (Service Advisor → Consultant)

2. **Development:** 7-8 weeks
   - **Backend (4-5 weeks):**
     - auth-service: Three-tier permission system, ownership validation, per-portal email uniqueness
     - API Gateway: Permission enforcement middleware with tier validation (View/Modify related/Modify All)
     - All services: 
       - Role-based endpoint protection
       - "Modify (related)" enforcement
       - View-only mode enforcement for completed services
     - audit-log endpoints: CRUD, filtering, export (CSV/PDF generation from settings)
     - Scheduled job: Permission expiration checker with notifications
   - **Frontend (3-4 weeks):**
     - Family Portal: 
       - Permission management interface with three-tier selection (radio buttons/toggles)
       - Permission templates with Consul/Admin presets
       - Expiration date picker
       - Settings → Security → Audit Log Export interface
     - Advisor Portal: 
       - View-only mode UI with disabled buttons and tier-specific banners
       - Permission status display with tier indicators
       - Independent registration (no migration flow)
       - Consultant-specific UI labels and terminology
     - Notification UI: Expiration warnings, permission change alerts with tier details
   - **Database (1 week):**
     - New tables: advisor_roles, advisor_permissions (tier column: ENUM('none', 'view', 'modify_related', 'modify_all')), permission_audit_log, permission_templates
     - Indexes for performance optimization
     - Migration scripts for existing advisors (if any)
     - Data migration: Service Advisor → Consultant terminology

3. **Testing:** 3-4 weeks
   - Unit tests: Three-tier permission logic, ownership validation, expiration logic, audit logging
   - Integration tests: Per-portal email validation, service lifecycle transitions, export generation
   - E2E tests: Permission management flow, consultant restrictions, multi-portal registration, expiration enforcement
   - Security testing: Permission bypass attempts, tier enforcement, expired permissions, frozen snapshot violations
   - Multi-tenancy validation: family_id isolation in all queries
   - Performance testing: Audit log queries, frozen snapshot queries, ownership filtering
   - Scheduled job testing: Expiration checker execution, notification delivery
   - Terminology consistency testing: Verify all UI labels use "Consultant"

4. **Release & Knowledge Transfer:** 1-2 weeks
   - Documentation: Admin guide, advisor guide with updated terminology
   - Training materials: Videos on three-tier permissions, audit log export, service lifecycle
   - Release notes highlighting terminology change (Service Advisor → Consultant)
   - Documentation update: Update all references from "Service Advisor" to "Consultant"
   - Team training: Terminology mapping for existing stories and requirements
   - Live training session for pilot families (optional)

**Target Release:** Q1 2026 / Sprint 45-49

---

## ðŸ" Notes

**Terminology Migration:**
- **Old term:** Service Advisor
- **New term:** Consultant
- **Reason:** Alignment with existing documentation (`advisor-types-overview.md`) and industry standard terminology
- **Impact:** UI labels, documentation, code comments, database enums, user stories
- **Migration strategy:** 
  - Backend: Update role enum values, maintain backward compatibility during transition
  - Frontend: Update all UI labels and help text
  - Documentation: Global find/replace across all docs
  - Communication: Announce terminology change in release notes
  - **User Stories:** When reviewing or creating stories, treat "Service Advisor" as equivalent to "Consultant"

**⚠️ CRITICAL FOR DEVELOPMENT TEAM:**

When implementing user stories for this Epic, you will encounter references to **"Service Advisor"** in:
- Existing user stories
- Requirements documents
- Acceptance criteria
- Technical specifications
- Test cases

**Always interpret "Service Advisor" as "Consultant"** in the implementation. The terminology was unified after many stories were already written.

**Terminology Equivalence Table:**

| Legacy Term | Current Term | Context |
|-------------|--------------|---------|
| Service Advisor | Consultant | Role name in system |
| Service Advisor permissions | Consultant permissions | Permission management |
| Service Advisor lifecycle | Consultant lifecycle | Service engagement states |
| Service Advisor frozen snapshot | Consultant frozen snapshot | Post-completion access |
| Service Advisor profile | Consultant profile | Marketplace presence |
| Service Advisor registration | Consultant registration | Onboarding flow |

**Open Questions:**
- [ ] None - all decisions finalized

**Related Documentation Updates Required:**
- [ ] Update `consultant-persona.md` to include permission model details
- [ ] Update `advisor-types-overview.md` to reference this Epic
- [ ] Create `FEAT-consultant-permissions.md` with detailed permission specifications
- [ ] Update all user journey documents to use "Consultant" terminology
- [ ] Create terminology mapping guide for team members working on legacy stories

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-16  
**Terminology Updated:** 2025-10-16 (Service Advisor → Consultant)
