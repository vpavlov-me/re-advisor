---
doc_id: "EPIC-006"
title: "Advisor Permission Management - Frontend UI/UX"
type: "epic"
category: "planning"
audience: "product-manager|business-analyst|developer|qa|stakeholder"
complexity: "advanced"
created: "2025-10-27"
updated: "2025-10-27"
version: "1.0.0"
status: "ready-for-planning"
priority: "high"
business_value: "Enables secure, granular advisor access control with intuitive UI for permission management"
user_impact: "Streamlines advisor onboarding and permission management for Family Council and Admins"
review_cycle: "quarterly"
next_review: "2026-01-27"
---

# EPIC-006: Advisor Permission Management - Frontend UI/UX

---

## 📋 Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** Advisor Permission Management - Frontend UI/UX  
**Summary:** User interface components and flows for managing advisor permissions using three-tier access control system and invitation-based permission configuration  
**Parent Initiative:** FG-INIT-002 (Advisor Management & RBAC)  
**Priority:** High  
**Epic Link:** FG-EPIC-006  
**Status:** ready-for-planning

---

## 🎯 Epic Goal

**What will this Epic deliver?**

This Epic delivers comprehensive user interface components and user flows for managing advisor permissions in the Family Governance Platform. It enables two primary user journeys:

1. **Post-Connection Permission Management**: Consul and Admin users can manage permissions for already-connected advisors through an intuitive permission editor with three-tier access control (None, View, View+Modify related, View+Modify All) across 10+ governance sections
2. **Invitation-Time Permission Configuration**: Family Council members can configure specific module access and permission levels when inviting new advisors (Personal Family Advisor with granular module selection, or External Consul with automatic full access)

**User-Facing Value:**
- Family Council members can invite advisors with pre-configured appropriate access levels
- Consuls can quickly adjust advisor permissions using visual editors and templates
- Admins gain comprehensive control over all advisor access configurations
- Visual feedback system (colors, icons, badges) makes permission levels immediately understandable
- Permission templates enable consistent, quick setup for common advisor roles

**Business Value:**
- Reduces onboarding friction by setting correct permissions at invitation time
- Improves security through granular access control
- Saves administrative time with permission templates
- Provides clear audit trail through visual permission indicators
- Enables scalable advisor management for growing families

**Scope Boundaries:**

**✅ Included:**
- Permission editor interface for managing existing advisor access
- Three-tier permission selection per governance section
- Permission template selector and application
- Invitation form with role selection (Personal FA vs External Consul)
- Module configuration interface for Personal Family Advisor invitations
- Advisor list management interface with filtering
- Role-based UI visibility (Consul vs Admin views)
- Visual indicators (colors, icons, badges) for permission levels
- Validation and error handling for permission configurations
- Responsive design for desktop, tablet, mobile

**❌ NOT Included:**
- Backend API implementation for permission enforcement
- Database schema for permission storage
- Email service integration for invitations
- Backend permission validation logic
- Audit log backend implementation
- Token generation for invitation links
- Advisor registration/onboarding flow (separate epic)
- Payment integration for subscriptions
- Notification service backend

---

## 👥 Target Users

**Primary Personas:**
- **Consul** ([DOC-USR-002](../../knowledge-base/02-user-personas/family-council-member-persona.md)) - Managing Personal Family Advisors and Consultants
- **Admin** (Platform Administrator) - Managing all advisor types including other Consuls
- **Family Council Member** ([DOC-USR-002](../../knowledge-base/02-user-personas/family-council-member-persona.md)) - Inviting advisors with appropriate permissions

**Secondary Personas:**
- **Personal Family Advisor** ([DOC-USR-004](../../knowledge-base/02-user-personas/personal-family-advisor-persona.md)) - Receives permissions, views own access levels
- **External Consul** ([DOC-USR-005](../../knowledge-base/02-user-personas/external-consul-persona.md)) - Receives full access, understands scope
- **Consultant** ([DOC-USR-006](../../knowledge-base/02-user-personas/consultant-persona.md)) - May be invited as Personal Advisor

---

## 📖 User Stories (High-Level)

### US-FRONT-001: Manage Existing Advisor Permissions

**As a** Consul or Admin,  
**I want to** view a list of connected advisors, open a permission editor for any advisor, and configure three-tier access levels (None, View, View+Modify related, View+Modify All) for each governance section using visual selectors and optional templates,  
**so that** I can precisely control what data advisors can access and modify after they've already joined the family governance platform.

**Key Scenarios:**
- View filterable list of advisors with current roles and specializations
- Open permission editor (modal/panel) showing all 10+ governance sections
- Select permission level per section using color-coded indicators (⚪ None, 🔵 View, 🟡 Modify related, 🟢 Modify All)
- Apply permission templates (Governance Consultant, Succession Specialist, Financial Observer, etc.) for quick setup
- See permission summary showing access distribution
- Save changes with confirmation and validation
- See visual indicators of recent permission changes (audit timestamp)

**Role-Based Visibility:**
- Consul: Manages Personal Family Advisors and Consultants only
- Admin: Manages all advisor types including other Consuls and Billing access

---

### US-FRONT-002: Configure Permissions During Advisor Invitation

**As a** Family Council member,  
**I want to** invite a new advisor by selecting their role (Personal Family Advisor or External Consul) and configuring module-specific permissions during the invitation process,  
**so that** the advisor receives appropriate access levels immediately upon accepting the invitation without requiring post-invitation permission adjustments.

**Key Scenarios:**

**Personal Family Advisor Invitation:**
- Enter advisor email, name, and personal message
- Select "Personal Family Advisor" role via visual card selection
- Choose 1-7 modules from 10 available (grouped by: Governance, Wealth Management, Family Development)
- Set access level for each selected module (View Only, Edit, Full Access)
- Optionally use template quick-setup buttons (Financial Advisor, Governance Consultant, Family Therapist)
- Review summary showing email, role, modules with access levels
- Send invitation with pre-configured permissions

**External Consul Invitation:**
- Enter advisor email, name, and personal message
- Select "External Consul" role via visual card selection
- Skip module configuration (automatic full access to all 10 modules)
- Review summary showing full governance access
- Send invitation with automatic View+Modify All permissions

**Validation & Error Handling:**
- Email format validation (RFC 5322)
- Check advisor not already associated with family
- Minimum 1 module selected for Personal FA
- Access level required for each selected module
- Clear error messages with recovery options

---

## 🎨 Design & UX

### User Flow 1: Managing Existing Advisor Permissions
```
[Family Portal - External Advisors Page]
          │
          ├─> Advisor Management List Table
          │   ├─ Columns: Name, Role, Specialization, Active Projects, Actions
          │   ├─ Filters: Role (Personal FA, Consultant), Specialization
          │   ├─ Search: Name/Email
          │   └─ "Manage Permissions" button per row
          │
          ├─> [User clicks "Manage Permissions"]
          │
          ├─> Permission Editor Modal Opens
          │   │
          │   ├─ Header: Advisor name, role badge
          │   ├─ Permission Template Selector (dropdown at top)
          │   │   ├─ Options: External Consul, Governance Consultant, 
          │   │   │          Succession Specialist, Financial Observer, Custom
          │   │   └─ Tooltip: "Quick setup for common advisor roles"
          │   │
          │   ├─ Sections List (10+ sections)
          │   │   ├─ Constitution
          │   │   │   └─ Three-Tier Selector:
          │   │   │       ⚪ None | 🔵 View | 🟡 View+Modify (related) | 🟢 View+Modify All
          │   │   ├─ Meetings
          │   │   │   └─ [Same selector]
          │   │   ├─ Communication
          │   │   │   └─ [Same selector]
          │   │   ├─ Assets, Education, Philanthropy, Succession,
          │   │   │   Decision-Making, Conflict Resolution, Tasks
          │   │   │   └─ [Same selector for each]
          │   │   └─ Billing (⚠️ Admin only)
          │   │
          │   ├─ Permission Summary Panel (bottom)
          │   │   └─ "View: 3 sections | Modify (related): 2 | Modify All: 1"
          │   │
          │   └─ Actions: [Cancel] [Save Changes]
          │       └─ Unsaved changes warning if closing
          │
          └─> [User saves] → Success toast → Return to Advisor List
```

---

### User Flow 2: Inviting Personal Family Advisor
```
[Family Portal - External Advisors Page]
          │
          ├─> "Invite Advisor" Button (prominent, top-right)
          │
          ├─> Invitation Form Opens (Modal or dedicated page)
          │   │
          │   ├─ STEP 1: Basic Information
          │   │   ├─ Email (required, inline validation)
          │   │   ├─ Advisor Name (optional)
          │   │   └─ Personal Message (optional, 500 char limit)
          │   │
          │   ├─> [Next Step]
          │   │
          │   ├─ STEP 2: Role Selection
          │   │   │
          │   │   ├─ Card 1: Personal Family Advisor
          │   │   │   ├─ Icon + Title
          │   │   │   ├─ Description: "Full access to selected modules (1-7)"
          │   │   │   ├─ Suitable for: "Long-term advisors, specialists"
          │   │   │   └─ [Select This Role]
          │   │   │
          │   │   └─ Card 2: External Consul
          │   │       ├─ Icon + Title
          │   │       ├─ Description: "Full governance access (all 10 modules)"
          │   │       ├─ Suitable for: "Strategic consultants, coordinators"
          │   │       └─ [Select This Role]
          │   │
          │   ├─> [User selects "Personal Family Advisor"]
          │   │
          │   ├─ STEP 3: Module Configuration (conditional - only for Personal FA)
          │   │   │
          │   │   ├─ Module Selector (checkboxes, grouped by category)
          │   │   │   ├─ 📋 Governance
          │   │   │   │   ├─ ☐ Constitution
          │   │   │   │   ├─ ☐ Meetings
          │   │   │   │   ├─ ☐ Decision-Making
          │   │   │   │   └─ ☐ Conflict Resolution
          │   │   │   │
          │   │   │   ├─ 💰 Wealth Management
          │   │   │   │   ├─ ☐ Assets
          │   │   │   │   └─ ☐ Succession
          │   │   │   │
          │   │   │   └─ 🌱 Family Development
          │   │   │       ├─ ☐ Education
          │   │   │       ├─ ☐ Philanthropy
          │   │   │       ├─ ☐ Communication
          │   │   │       └─ ☐ Tasks
          │   │   │
          │   │   ├─ "Select All" / "Deselect All" buttons
          │   │   ├─ Counter: "5 of 10 modules selected"
          │   │   │
          │   │   ├─ Access Level per Module (dropdowns for checked modules)
          │   │   │   └─ Options per module:
          │   │   │       ├─ 🔵 View Only ("Can read data")
          │   │   │       ├─ 🟡 Edit ("Can modify existing data")
          │   │   │       └─ 🟢 Full Access ("Can create, edit, delete")
          │   │   │
          │   │   └─ Optional: Template Quick Setup Buttons
          │   │       ├─ "Financial Advisor Setup" → Assets (Full), Education (View)
          │   │       ├─ "Governance Consultant" → Constitution (Full), Meetings (Full)
          │   │       └─ "Family Therapist" → Communication (Edit), Conflict (Full)
          │   │
          │   └─ STEP 4: Review & Send
          │       ├─ Summary:
          │       │   ├─ Email: [email@example.com]
          │       │   ├─ Role: Personal Family Advisor
          │       │   ├─ Modules: Constitution (Full Access), Meetings (Edit), 
          │       │   │          Assets (View Only)
          │       │   └─ Message: [Personal message preview]
          │       │
          │       └─ [Cancel] [Send Invitation]
          │
          └─> Success Confirmation
              ├─ "✅ Invitation sent to [email]"
              ├─ Role: Personal Family Advisor
              ├─ Modules: [List with access levels]
              ├─ Next steps: "Advisor will receive email. You'll be notified when they accept."
              └─ [Send Another Invitation] [Back to Advisors]
```

---

### User Flow 3: Inviting External Consul (Simplified)
```
[Invitation Form - STEP 2: Role Selection]
          │
          ├─> [User selects "External Consul" card]
          │
          ├─ STEP 3: Auto-Skip Module Configuration
          │   └─ Helper text displayed:
          │       "✨ External Consul will have full access to all 10 governance 
          │        modules automatically. No module selection needed."
          │
          └─> STEP 4: Review & Send
              ├─ Summary:
              │   ├─ Email: [email@example.com]
              │   ├─ Role: External Consul
              │   ├─ Access: Full governance access (all modules)
              │   └─ Message: [Personal message preview]
              │
              └─ [Send Invitation]
```

---

## 🧮 Business Rules

### Validation Rules

**Email Validation (Invitation Form):**
- Format: RFC 5322 compliant email
- Uniqueness: Advisor not already associated with family
- Error: "This advisor is already connected to your family"

**Module Selection (Personal Family Advisor Invitation):**
- Minimum: 1 module must be selected
- Maximum: 7 modules (enforced by design, but backend allows up to 10)
- Each selected module must have access level chosen
- Error: "Please select at least 1 module and configure access level for each"

**Permission Editor (Three-Tier System):**
- **None level**: Can be set on any section (advisor loses all access)
- **View level**: Read-only access, cannot create/edit
- **View+Modify (related)**: Can edit only items with `created_by = advisor_id`
- **View+Modify All**: Full CRUD access
- **Billing section**: Only visible to Admins (Consuls cannot see or modify)

**Template Application:**
- Templates auto-populate permission dropdowns
- User can modify after template application → changes template indicator to "Custom"
- Warning if setting all sections to "View": "⚠️ [Advisor Name] will have View-only access to all sections. Continue?"

**Role-Based UI Rules:**
- **Consul visibility**: Can only see Personal Family Advisors and Consultants in list
- **Consul permissions**: Cannot manage other Consuls or Admins
- **Admin visibility**: Can see all advisor types
- **Admin permissions**: Can manage all advisor permissions including Billing/Extensions

---

### Authorization Rules

**Who Can Manage Permissions:**
- ✅ Consul: Can manage Personal Family Advisors and Consultants
- ✅ Admin: Can manage all advisor types
- ❌ Regular Family Member: Cannot access permission management
- ❌ Personal Family Advisor: Cannot manage other advisors

**Who Can Invite Advisors:**
- ✅ Family Council Member: Can invite Personal FA or External Consul
- ✅ Admin: Can invite any advisor type
- ❌ Regular Family Member: Cannot send invitations
- ❌ External Advisors: Cannot invite other advisors

---

### Edge Cases

**Edge Case 1: All Sections Set to "None"**
- **Behavior**: Show warning modal
- **Warning**: "⚠️ [Advisor Name] will have no access to any sections. They will not be able to work with your family. Are you sure?"
- **Options**: [Go Back] [Confirm & Save]

**Edge Case 2: Invitation Email Already in System**
- **Behavior**: Show error before form submission
- **Error**: "This email is already associated with an advisor account. Please invite them via existing advisor search."
- **Action**: Clear email field, focus on email input

**Edge Case 3: User Closes Permission Editor with Unsaved Changes**
- **Behavior**: Show confirmation modal
- **Warning**: "You have unsaved permission changes. Do you want to save before closing?"
- **Options**: [Discard Changes] [Cancel] [Save & Close]

**Edge Case 4: Template Applied Then Manually Modified**
- **Behavior**: Update template indicator
- **Before**: Badge shows "Based on: Governance Consultant"
- **After**: Badge shows "Custom (modified from Governance Consultant)"
- **Tooltip**: "Original template modified. Click 'Use Template' to reapply."

**Edge Case 5: Invitation Form - Personal FA with 0 Modules Selected**
- **Behavior**: Disable "Send Invitation" button
- **Error message**: "Please select at least 1 module for Personal Family Advisor. For full access, choose External Consul role instead."

---

## 📝 Notes

### Additional Context

**Link Between Invitation and Permission Management:**
- After advisor accepts invitation, they appear in "Active Advisors" list
- Permission Editor shows initial access granted via invitation
- Family Council can modify permissions post-acceptance using same three-tier system
- Banner in Permission Editor: "Initial access granted via invitation on [date]"

**Permission Templates Available:**

**Admin Templates (Admin role only):**
- "External Consul" - All 10 sections → View+Modify All (except Billing)
- "Consul" - All sections → View+Modify All (if not Admin)
- "Admin" - All sections including Billing → View+Modify All

**Specialized Templates (for Consul managing Personal/Consultant):**
- "Governance Consultant" - Constitution, Meetings, Communication, Decisions → View+Modify (related)
- "Succession Specialist" - Succession, Education → View+Modify (related)
- "Philanthropy Consultant" - Philanthropy → View+Modify (related)
- "Financial Observer" - Assets → View only
- "Limited Observer" - Selected sections → View only
- "Custom" - Manual configuration

---

**Epic Version:** 1.0.0  
**Last Updated:** 2025-10-27  
**Status:** Ready for Planning  
**Next Steps:** Design review → Sprint planning → Implementation
