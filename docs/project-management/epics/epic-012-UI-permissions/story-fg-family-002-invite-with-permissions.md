# User Story: Invite Advisor with Role and Permission Configuration

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As a Family Council member, I want to invite advisor with role selection and module permission configuration  
**Epic Link:** FG-EPIC-XXX [Advisor Permission Management Interface]  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Family Council member,  
**I want to** invite a new advisor by entering their contact information, selecting their role (Personal Family Advisor or External Consul), and configuring module-specific permissions with access levels,  
**so that** the advisor receives appropriate access immediately upon accepting the invitation without requiring post-invitation permission adjustments.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point being solved:**
- Families need to invite external advisors with precise access control
- Manual post-invitation configuration creates delays and friction
- Risk of giving advisors incorrect permissions during onboarding
- No clear differentiation between specialist advisors (Personal FA) and strategic partners (External Consul)
- Family Council needs to control exactly which modules and access levels each advisor receives

**Business outcome expected:**
- Streamlined advisor onboarding with single-step invitation + complete permission configuration
- Clear role distinction: Personal FA (specialist, limited modules) vs. External Consul (strategic partner, Family Council member, default all modules)
- Granular permission control per module (View / View+Modify related / Full Access)
- Reduced time-to-productivity for advisors (immediate correct access upon acceptance)
- Decreased risk of permission misconfiguration

**Strategic alignment:**
- Enables families to confidently engage advisors with precise access boundaries
- Supports "least privilege" security model for Personal FAs
- Enables strategic partnership model for External Consuls with Family Council membership
- Foundation for comprehensive permission management system

---

## ✅ Acceptance Criteria

**This Story is complete when:**

### Form Layout & Basic Fields

1. **Given** I am a Family Council member on the Advisor Management page,  
   **When** I click "Add Family Advisor" button,  
   **Then** I see an invitation form with sections:
   - **General Information**: First Name (optional), Last Name (optional), Email (required)
   - **Roles**: Radio buttons for role selection
   - **Permissions**: Module and access level configuration with "Add New +" button

2. **Given** I am viewing the "Roles" section,  
   **When** I look at available options,  
   **Then** I see two radio button options:
   - "Personal Family Advisor" (with description: "Specialist with access to selected modules")
   - "External Consul" (with description: "Strategic partner, Family Council member with default access to all modules")

### Personal Family Advisor Flow

3. **Given** I select "Personal Family Advisor" role,  
   **When** the form updates,  
   **Then** the Permissions section displays:
   - Empty state (no pre-filled modules)
   - "Add New +" button to add module permissions
   - Placeholder row: "Modul: Select Member" + "Access: Select Type"

4. **Given** I have selected "Personal Family Advisor" and click "Add New +" in Permissions,  
   **When** a new permission row appears,  
   **Then** I see:
   - **Modul dropdown** with all 10 modules: Constitution, Conflicts, Family Council, Decision Making, Education, Mentorship, Assets, Succession, Philanthropy, Family Management
   - **Access dropdown** with options: View, View+Modify related, Full Access
   - **Delete icon (trash)** to remove this permission row

5. **Given** I have added multiple permission rows for Personal Family Advisor,  
   **When** I attempt to add 8th permission row,  
   **Then** I see validation error: "Personal Family Advisor can have access to maximum 7 modules. For broader access, select External Consul role."

6. **Given** I have selected Personal Family Advisor with 0 permission rows,  
   **When** I click "Add Advisor" button,  
   **Then** I see validation error: "Please add at least 1 module permission for Personal Family Advisor."

7. **Given** I have added permission rows but some have incomplete selections (module selected but no access level, or access level selected but no module),  
   **When** I click "Add Advisor" button,  
   **Then** I see validation error: "Please complete all permission rows: select both module and access level, or remove incomplete rows."

### External Consul Flow

8. **Given** I select "External Consul" role,  
   **When** the form updates,  
   **Then** the Permissions section displays:
   - **10 pre-filled permission rows** (one for each module)
   - All modules: Constitution, Conflicts, Family Council, Decision Making, Education, Mentorship, Assets, Succession, Philanthropy, Family Management
   - All access levels: "Full Access"
   - Each row has delete icon (editable)
   - "Add New +" button remains available

9. **Given** I have selected "External Consul" with default 10 modules,  
   **When** I delete some permission rows,  
   **Then** the system allows deletion (no minimum module requirement for External Consul), and remaining permissions are preserved.

10. **Given** I have selected "External Consul" with default permissions,  
    **When** I change access levels for specific modules (e.g., Constitution from "Full Access" to "View"),  
    **Then** the system accepts the changes (External Consul permissions are fully editable).

### Form Validation & Submission

11. **Given** I have completed the form with:
    - Email: advisor@example.com
    - Role: Personal Family Advisor
    - Permissions: Succession (Full Access), Education (View), Mentorship (View+Modify related)  
    **When** I click "Add Advisor" button,  
    **Then** the system:
    - Validates all fields
    - Creates invitation record with configured permissions
    - Sends invitation email to advisor@example.com
    - Displays success message: "Invitation sent to advisor@example.com as Personal Family Advisor"
    - Closes the form and refreshes advisor list

12. **Given** I submit invitation for External Consul with modified permissions (removed 2 modules, changed 3 access levels),  
    **When** advisor accepts the invitation,  
    **Then** their account is created with:
    - Exact modules and access levels as configured (not default 10 modules)
    - `is_family_council: true` flag
    - Family Council member status

13. **Given** I have entered invalid email format (e.g., "notanemail"),  
    **When** I click "Add Advisor" button,  
    **Then** I see validation error: "Please enter a valid email address."

14. **Given** I try to invite advisor with email that has pending invitation in this family,  
    **When** I click "Add Advisor" button,  
    **Then** I see validation error: "Pending invitation already exists for this email. Please wait for acceptance or cancel the previous invitation."

### Duplicate Modules (Feature)

15. **Given** I am adding permission rows for Personal Family Advisor,  
    **When** I add Constitution (Full Access) and then add another row with Constitution (View),  
    **Then** the system allows duplicate module selection (this is intentional feature, no validation error).

### Optional Name Fields

16. **Given** I am filling the invitation form,  
    **When** I leave First Name and Last Name empty and only fill Email,  
    **Then** the system accepts the form (names are optional), and advisor will provide names during registration.

17. **Given** I fill First Name and Last Name in invitation,  
    **When** advisor accepts invitation,  
    **Then** their account is pre-filled with these names (advisor can edit during registration).

---

## 🔑 Business Rules

### Validation Rules

1. **Email Format**: Must be valid email format (contains @, domain)
2. **Email Uniqueness**: Cannot send invitation if pending invitation already exists for this email in this family
3. **Role Selection**: Required field, must select either "Personal Family Advisor" or "External Consul"
4. **Personal FA Module Limit**: Maximum 7 permission rows
5. **Personal FA Minimum**: At least 1 permission row required
6. **Permission Row Completeness**: Each permission row must have both module AND access level selected (or be removed)
7. **Duplicate Modules**: Allowed intentionally (no validation)
8. **Name Fields**: First Name and Last Name are optional

### Access Level Definitions

**View:**
- ✅ Read data
- ❌ Create new items
- ❌ Edit items
- ❌ Delete items

**View+Modify related:**
- ✅ Read data
- ✅ Create new items
- ✅ Edit own items
- ✅ Delete own items
- ❌ Edit all items
- ❌ Delete all items

**Full Access (View+Modify All):**
- ✅ Read data
- ✅ Create new items
- ✅ Edit own items
- ✅ Edit all items
- ✅ Delete own items
- ✅ Delete all items

### Role Characteristics

**Personal Family Advisor:**
- Specialist with limited module access
- `is_family_council: false`
- Cannot attend Family Council meetings
- Manually configure 1-7 modules
- Default: Empty permissions (Family Council adds manually)

**External Consul:**
- Strategic partner with Family Council membership
- `is_family_council: true`
- Can attend Family Council meetings
- Default: All 10 modules with Full Access (editable)
- Can be reduced to fewer modules if needed

### Authorization

- **Who can perform this action:** Family Council members (`is_family_council: true`) and Family Admins (`is_admin: true`)
- **Who can view invitation list:** Family Council members and Family Admins (within their family context)
- **Who can receive invitation:** Any email address (advisor doesn't need pre-existing account)

### Edge Cases

- **Advisor already has account in different family**: Invitation creates new family-advisor association, advisor sees multi-family dashboard
- **Advisor already exists in this family**: System shows warning but allows (may be re-inviting with different role/permissions)
- **Self-invitation**: System should prevent (Family Council member cannot invite themselves as advisor)
- **Invitation expires**: After 7 days (future Story handles re-sending)
- **External Consul with reduced permissions**: Allowed - External Consul can have < 10 modules if Family Council removes some

---

## 🧪 Test Scenarios

### Happy Path - Personal Family Advisor

1. Family Council member clicks "Add Family Advisor"
2. Fills form:
   - First Name: John (optional, filled)
   - Last Name: Smith (optional, filled)
   - Email: john.smith@example.com
   - Role: "Personal Family Advisor" (selected)
3. Clicks "Add New +" in Permissions 3 times
4. Configures permissions:
   - Row 1: Succession → Full Access
   - Row 2: Education → View
   - Row 3: Mentorship → View+Modify related
5. Clicks "Add Advisor"
6. Success message: "Invitation sent to john.smith@example.com as Personal Family Advisor"
7. Advisor receives email with invitation link and permission details
8. Advisor accepts invitation
9. Advisor account created with:
   - Name: John Smith
   - Email: john.smith@example.com
   - Role: Personal Family Advisor
   - Permissions: Succession (Full Access), Education (View), Mentorship (View+Modify related)
   - `is_family_council: false`

### Happy Path - External Consul with Default Permissions

1. Family Council member clicks "Add Family Advisor"
2. Fills form:
   - First Name: (empty - optional)
   - Last Name: (empty - optional)
   - Email: consul@example.com
   - Role: "External Consul" (selected)
3. Permissions section auto-populates with 10 modules, all "Full Access"
4. Family Council does NOT modify permissions (keeps default)
5. Clicks "Add Advisor"
6. Success message: "Invitation sent to consul@example.com as External Consul"
7. Advisor accepts invitation
8. Advisor account created with:
   - Email: consul@example.com
   - Role: External Consul
   - All 10 modules with Full Access
   - `is_family_council: true`

### Happy Path - External Consul with Modified Permissions

1. Family Council member clicks "Add Family Advisor"
2. Fills form:
   - Email: strategic.advisor@example.com
   - Role: "External Consul" (selected)
3. Permissions section shows 10 modules with Full Access
4. Family Council modifies:
   - Deletes: Assets, Philanthropy (removes 2 modules)
   - Changes Constitution: Full Access → View
   - Changes Conflicts: Full Access → View+Modify related
   - Keeps 6 modules with Full Access unchanged
5. Final permissions: 8 modules total with mixed access levels
6. Clicks "Add Advisor"
7. Advisor accepts invitation
8. Advisor account created with exactly 8 modules and configured access levels (not default 10)

### Negative Tests

**1. Invalid Email:**
- User enters "notanemail"
- Clicks "Add Advisor"
- Error: "Please enter a valid email address"

**2. Personal FA with 0 Modules:**
- User selects Personal Family Advisor
- Does NOT add any permission rows (empty)
- Clicks "Add Advisor"
- Error: "Please add at least 1 module permission for Personal Family Advisor"

**3. Personal FA with 8+ Modules:**
- User selects Personal Family Advisor
- Adds 7 permission rows successfully
- Clicks "Add New +" for 8th row
- Error: "Personal Family Advisor can have access to maximum 7 modules. For broader access, select External Consul role."

**4. Incomplete Permission Row:**
- User selects Personal Family Advisor
- Adds permission row, selects Modul: "Succession"
- Does NOT select Access level (left as "Select Type")
- Clicks "Add Advisor"
- Error: "Please complete all permission rows: select both module and access level, or remove incomplete rows."

**5. Duplicate Pending Invitation:**
- User sends invitation to advisor@example.com
- Before advisor accepts, user tries to send another invitation to same email
- Error: "Pending invitation already exists for this email. Please wait for acceptance or cancel the previous invitation."

**6. Unauthorized User (Regular Family Member):**
- Regular family member (not Family Council) tries to access "Add Family Advisor"
- System denies access: "You don't have permission to invite advisors. Please contact your Family Council."

### Edge Cases

**1. Duplicate Modules (Allowed Feature):**
- User selects Personal Family Advisor
- Adds Succession (Full Access)
- Adds Succession (View) - same module, different access
- System allows without validation error
- Advisor receives both permission entries

**2. Switch from Personal FA to External Consul:**
- User selects Personal Family Advisor
- Manually adds 3 permission rows (Succession, Education, Mentorship)
- Switches role to External Consul
- Permissions section replaces with 10 default modules (Full Access)
- Previously configured 3 modules are lost
- User switches back to Personal FA
- Permissions return to empty state (manual entries not preserved across role switch)

**3. External Consul Deletes All Modules:**
- User selects External Consul (10 modules auto-added)
- User deletes all 10 permission rows
- System allows deletion (no minimum for External Consul)
- User clicks "Add Advisor"
- System creates invitation with 0 modules (External Consul with no permissions)
- Note: This is allowed but likely user error

**4. Optional Names Left Empty:**
- User fills only Email, leaves First/Last Name empty
- Selects role and permissions
- Clicks "Add Advisor"
- Invitation sent successfully
- Advisor must provide names during registration

**5. Advisor Already Exists in This Family:**
- User enters email of existing advisor
- System shows warning: "Advisor with this email already exists in your family (Personal Family Advisor). Sending new invitation will replace existing role and permissions."
- User can proceed if confirms

---

## ⚠️ Non-Functional Requirements

**Security:**
- Authorization required: Yes (Family Council and Admins only)
- Data encryption: Yes (email addresses encrypted at rest)
- PII handling: Yes - names and emails are PII, GDPR compliance required
- Invitation tokens: Cryptographically secure (UUID v4 minimum)
- One-time use tokens or expire after acceptance

**Performance:**
- Form loading: < 1 second
- Role switch (Personal FA ↔ External Consul): < 500ms
- Add permission row: < 200ms
- Invitation creation: < 2 seconds
- Email delivery: < 30 seconds

**Usability:**
- Mobile-responsive design
- Clear visual distinction between roles (descriptions)
- Real-time validation feedback
- Tooltips for access level descriptions
- "Add New +" easily accessible
- Delete icon intuitive (trash icon)

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions  
- Firefox: Latest 2 versions
- Mobile Safari (iOS): Latest 2 versions
- Chrome Mobile (Android): Latest 2 versions

**Other:**
- Invitation email includes permission table with modules and access levels
- Multi-language support for invitation email
- Audit trail: Log who invited whom, when, with what permissions

---

## 📝 Notes

**Design Decisions:**

1. **Why duplicate modules allowed?**
   - Intentional feature for future flexibility
   - Use case TBD (may be for different contexts or time periods)
   - No validation to prevent duplicates

2. **Why External Consul default all modules?**
   - Strategic partner role implies full governance context
   - Default provides recommended configuration
   - Editable if family wants to restrict specific areas

3. **Why names optional?**
   - Reduces friction during invitation process
   - Advisor provides names during registration
   - Pre-filling names if known improves UX

**Assumptions:**
- Email service operational and configured
- Notification service can deliver HTML emails reliably
- Frontend has 10-module list from system configuration
- Invitation email template supports permission tables

**Related Future Stories:**
- View pending invitation list with permission details
- Edit pending invitation (change role/permissions before acceptance)
- Cancel/resend expired invitations
- Bulk invite advisors with CSV upload
- Implement access level enforcement in each module (10 separate Stories)
- Audit trail dashboard for permission changes

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-30
