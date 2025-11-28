---
story_id: "STORY-FG-005-004"
title: "Family Council Invites Advisor"
type: "story"
epic_id: "EPIC-005"
created: "2025-10-15"
updated: "2025-10-20"
priority: "high"
status: "ready"
estimate: "16h"
story_points: 8
sprint: "Sprint 46"
assignee: ""
labels: ["family", "advisor", "invitation", "role-selection", "external-consul", "personal-advisor"]
dependencies: ["STORY-FG-005-000"]
architecture_refs: ["CLAUDE.md", ".claude/contexts/turbo.md", ".claude/contexts/frontend.md", ".claude/contexts/backend.md"]
---

# User Story: Family Council Invites Advisor

> **Note:** This user story is for Jira project FG. Copy relevant sections to Jira issue description.

---

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Family Council member or Admin, I want to click "Invite Advisor", enter their email/name, and select role (Personal Family Advisor or External Consul), so that I can bring my trusted advisor onto the platform with appropriate access level
**Epic Link:** FG-100 [Advisor-Family Mutual Connection via Email Invitations (Bidirectional)]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Family Council member or Admin,
**I want to** invite an external advisor by email with a predefined role selection,
**so that** I can bring my trusted advisor onto the platform with the appropriate access level to our family's data and governance processes.

---

## 🎯 Business Context

**Why is this Story important?**

Families need to onboard professional advisors (consultants, mediators, subject-matter experts) who provide strategic guidance, facilitation, and consulting services. This story enables families to:

- **Proactively invite trusted advisors** rather than waiting for advisors to discover the family
- **Control access levels from the start** by selecting advisor role during invitation (Personal Family Advisor with full access vs. External Consul with limited access)
- **Streamline onboarding** by automating the invitation, acceptance, and permission assignment flow
- **Maintain family data security** by requiring explicit invitation before advisor access

**User pain point solved:** Currently, families have no way to invite their existing advisors to the platform. This creates a cold-start problem where families cannot leverage professional guidance until advisors independently discover and join the platform.

**Business outcome:** Enable family-advisor collaboration by allowing families to initiate connections, increasing platform value through professional advisory network effects.

**Strategic alignment:** Supports the bidirectional invitation model (Epic FG-100) where both advisors and families can initiate connections, creating a flexible marketplace for advisory services.

---

## ✅ Acceptance Criteria

1. **Given** I am logged in as a Family Council member or Admin,
   **When** I navigate to Family Affairs → Family → External Advisors,
   **Then** I see an "Invite Advisor" button clearly displayed.

2. **Given** I click "Invite Advisor",
   **When** the invitation form opens,
   **Then** I see the following fields:
   - Email address (required, with validation)
   - Advisor name (optional, for email personalization)
   - Role selection (required, radio buttons or dropdown):
     - Personal Family Advisor
     - External Consul

3. **Given** I fill in the email and select a role,
   **When** I submit the invitation form,
   **Then** the system validates:
   - Email format is correct
   - This advisor is not already associated with my family
   **And** if validation passes, creates a pending invitation record.

4. **Given** validation passes,
   **When** invitation is created,
   **Then** the system sends an email to the advisor containing:
   - Personalized greeting (using provided name if available)
   - Invitation message from the family
   - Role they are being invited as
   - Link to accept/decline the invitation
   **And** I see a success confirmation message.

5. **Given** the advisor is already registered on the platform,
   **When** they receive the invitation email and click the link,
   **Then** they see the pending invitation in their Advisor Portal
   **And** can accept or decline (US-INV-5)
   **And** the invitation email includes:
   - Family name ([FamilyName])
   - List of modules/areas they will have access to ([ModulesList] based on selected role).

6. **Given** the advisor is NOT registered on the platform,
   **When** they click the invitation link,
   **Then** they are directed to the standard advisor registration flow (separate epic)
   **And** after completing registration, they see the pending invitation
   **And** the invitation email includes:
   - Family name ([FamilyName])
   - List of modules/areas they will have access to ([ModulesList] based on selected role).

7. **Given** the advisor accepts the invitation (US-INV-5),
   **When** acceptance is confirmed,
   **Then** the system automatically:
   - Creates a family-advisor association record
   - Applies permissions corresponding to the selected role
   - Grants the advisor access to family data according to their role
   **And** the family sees the advisor in their "External Advisors" list with status "Active".

8. **Given** I try to invite an advisor who is already associated with my family,
   **When** I submit the invitation,
   **Then** I see an error message: "This advisor is already associated with your family"
   **And** the invitation is not created.

9. **Given** I have previously sent an invitation to an advisor,
   **When** the advisor has not yet accepted and no association exists,
   **Then** I can send another invitation to the same email address (resend capability).

**Additional Criteria:**
- [ ] Email invitation includes clear call-to-action button "Accept Invitation"
- [ ] Email template includes family name ([FamilyName]) and accessible modules list ([ModulesList]) based on role
- [ ] Email template is professional and matches platform branding
- [ ] Invitation link expires after 30 days (auto-expiration)
- [ ] Invitation record includes timestamp, inviter information, and selected role
- [ ] Success confirmation shows advisor email and selected role
- [ ] Form includes helpful tooltips explaining the difference between Personal Family Advisor and External Consul roles

---

## 🎨 Design & UX

**User Flow:**
1. User navigates to Family Affairs → Family → External Advisors page
2. User sees list of current advisors (if any) and "Invite Advisor" button
3. User clicks "Invite Advisor" button
4. Modal or dedicated page opens with invitation form:
   - Email field with validation indicator
   - Name field (optional) with helper text "Used to personalize invitation email"
   - Role selection with descriptions:
     - **Personal Family Advisor**: "Full access to selected family modules. You will configure specific modules and access levels."
     - **External Consul**: "Limited access to specific projects and consultations. Access configured per project after acceptance."
5. **If Personal Family Advisor selected:**
   - Module selection interface appears with checkboxes for each module:
     - Constitution, Meetings, Communication, Assets, Education, Philanthropy, Succession, Decision-Making, Conflict Resolution, Tasks
   - For each selected module, dropdown for access level:
     - View Only (can read data)
     - Edit (can modify data)
     - Full Access (can create, edit, delete)
   - "Select All" / "Deselect All" shortcuts
   - Optional: Template buttons like "Financial Advisor Setup", "Governance Consultant Setup"
6. **If External Consul selected:**
   - Module configuration hidden
   - Helper text: "Project-based access will be configured after advisor accepts invitation"
7. User fills form and clicks "Send Invitation"
8. System validates:
   - Email format
   - Not already associated
   - For Personal Family Advisor: at least one module selected
9. System shows loading state
10. Success: User sees confirmation with:
    - Advisor email
    - Selected role
    - For Personal Family Advisor: list of modules with access levels
11. Error: User sees specific error message with actionable guidance
12. User returns to External Advisors page where they can view pending invitations (US-INV-6)

**UX Considerations:**
- Clear visual hierarchy emphasizing the role selection importance
- Dynamic form that shows/hides module configuration based on role selection
- Inline validation for email field (format check)
- Visual feedback when modules are selected (e.g., counter showing "5 of 10 modules selected")
- Access level dropdowns only appear for selected modules
- Disabled submit button until required fields are completed and validation passes
- Helpful error messages with actionable guidance
- Option to "Send Another Invitation" from success confirmation
- Consider grouping modules by category (e.g., "Governance", "Wealth Management", "Family Development")

---

## 🔒 Business Rules

### Validation Rules:
1. **Email Format**: Must be valid email format (RFC 5322 compliant)
2. **Email Required**: Email field cannot be empty
3. **Role Required**: User must select exactly one role (Personal Family Advisor or External Consul)
4. **Module Selection Required (Personal Family Advisor only)**: At least one module must be selected
5. **Access Level Required (Personal Family Advisor only)**: Each selected module must have an access level assigned
6. **Already Associated Check**: Cannot invite advisor who already has active association with this family
7. **Name Optional**: Advisor name is optional; if provided, used for email personalization only

### Available Modules for Personal Family Advisor:
- **Constitution** - Family values, mission, governance framework
- **Meetings** - Family council meetings, agendas, minutes
- **Communication** - Announcements, conversations, family messaging
- **Assets** - Wealth tracking, portfolio management, asset registry
- **Education** - Learning paths, courses, family development programs
- **Philanthropy** - Charitable giving, grants, impact tracking
- **Succession** - Next-generation planning, transition roadmaps
- **Decision-Making** - Family proposals, voting, consensus tracking
- **Conflict Resolution** - Mediation, dispute resolution
- **Tasks** - Task management, assignments, tracking

### Access Levels:
- **View Only**: Can read data, cannot modify or create
- **Edit**: Can read and modify existing data, cannot create new or delete
- **Full Access**: Can create, read, update, and delete data within the module

### Authorization:
- **Who can perform this action:** Family Council members (is_family_council = true) OR Admins (is_admin = true)
- **Who can view invitation form:** Same as above
- **Who receives the invitation:** Any email address (advisor may or may not be registered)

### Role Definitions:
- **Personal Family Advisor**:
  - Granular module-based access configured during invitation
  - Family Council/Admin selects specific modules (e.g., only Assets + Succession, or full access to all modules)
  - Each module can have different access level (View Only, Edit, Full Access)
  - Can participate in family governance processes for modules with Edit/Full Access
  - Suitable for: Long-term trusted advisors, family office consultants, wealth managers
  - Example configurations:
    - Financial Advisor: Assets (Full Access), Education (View Only), Succession (Edit)
    - Governance Consultant: Constitution (Full Access), Meetings (Full Access), Decision-Making (Full Access)
    - Family Therapist: Communication (Edit), Conflict Resolution (Full Access), Meetings (View Only)
  
- **External Consul**:
  - Project-based access model (not configured during invitation)
  - Cannot access full family data without explicit project assignment
  - Access configured separately after acceptance through project management
  - Suitable for: Subject-matter experts, temporary consultants, specialized advisors, mediators for specific conflicts
  - Access granted per consultation or project engagement

### Post-Acceptance Behavior (automatic):
- **Association Creation**: Upon advisor acceptance, system creates `family_advisor_associations` record
- **Permission Assignment**: 
  - For Personal Family Advisor: System applies module permissions with access levels exactly as configured during invitation
  - For External Consul: System creates association with no default module access (project-based configuration happens separately)
- **Access Activation**: Advisor immediately receives access to family data according to configured permissions
- **Notification**: Family receives notification that advisor has accepted invitation with summary of granted access

### Invitation Lifecycle:
- **Expiration Policy**: Invitation links expire after 30 days from creation
- **Expired Invitations**: After expiration, invitation cannot be accepted; family must send new invitation
- **Pending State Preservation**: If Family Council member who sent invitation loses permissions, invitation remains valid and pending
- **Ownership Transfer**: Expired or orphaned invitations can be transferred to Admin for management

### Edge Cases:
- **Duplicate Email - No Association**: If advisor email was invited before but declined or invitation expired, allow resending invitation
- **Duplicate Email - Active Association**: If advisor is already actively associated with family, show error and prevent invitation
- **Invalid Email Format**: Show inline validation error, prevent form submission
- **Advisor Already Registered**: System matches email to existing advisor account, sends invitation to their Advisor Portal
- **Advisor Not Registered**: Invitation email includes link to registration flow, invitation remains pending until registration complete
- **Inviter Loses Permissions**: Pending invitation continues to exist and can be accepted; ownership can be transferred to Admin if needed

### Multi-Tenancy & Data Isolation:
- **Family Context**: All invitations created in context of current user's family (family_id isolation)
- **Cross-Family Privacy**: Families cannot see invitations sent by other families
- **Advisor Visibility**: After acceptance, advisor can see only families they are explicitly associated with via `family_advisor_associations`

---

## 🧪 Test Scenarios

### Happy Path:
1. **Scenario: Family Council invites Personal Family Advisor with specific module access**
   - Login as Family Council member
   - Navigate to Family Affairs → Family → External Advisors
   - Click "Invite Advisor"
   - Enter: email "john.doe@advisors.com", name "John Doe"
   - Select role "Personal Family Advisor"
   - Module configuration appears
   - Select modules: Assets (Full Access), Succession (Edit), Education (View Only)
   - Submit form
   - **Expected**: Success message shown, email sent to john.doe@advisors.com with module list
   - Advisor receives email → clicks link → completes registration (separate epic)
   - Advisor sees pending invitation with specific modules and access levels → accepts (US-INV-5)
   - **Expected**: Association created, advisor gains access to only Assets (Full), Succession (Edit), Education (View) - no access to other modules

2. **Scenario: Family Council invites External Consul**
   - Login as Family Council member
   - Navigate to External Advisors → Invite Advisor
   - Enter: email "jane.smith@consultants.com" (already registered)
   - Select role "External Consul"
   - Module configuration is hidden
   - Submit form
   - **Expected**: Success message, email sent
   - Advisor (Jane Smith) logs into Advisor Portal
   - Sees pending invitation from family with note about project-based access
   - Accepts invitation
   - **Expected**: Association created with no default module access, project-based configuration required separately

### Negative Tests:
1. **Scenario: Attempt to invite already associated advisor**
   - Login as Family Council member
   - Attempt to invite email that is already actively associated with family
   - **Expected**: Error message "This advisor is already associated with your family", invitation not created

2. **Scenario: Invalid email format**
   - Enter invalid email: "notanemail", "test@", "@example.com"
   - **Expected**: Inline validation error, submit button disabled or shows error on submit

3. **Scenario: Missing required field - no modules selected for Personal Family Advisor**
   - Enter valid email and name
   - Select role "Personal Family Advisor"
   - Do not select any modules
   - Attempt to submit
   - **Expected**: Validation error "Please select at least one module for Personal Family Advisor", form not submitted

4. **Scenario: Module selected but no access level assigned**
   - Select role "Personal Family Advisor"
   - Check "Assets" module but don't select access level dropdown
   - Attempt to submit
   - **Expected**: Validation error "Please select access level for all selected modules", form not submitted

5. **Scenario: Regular family member (not Council/Admin) attempts to access invite form**
   - Login as regular family member (is_family_council = false, is_admin = false)
   - Navigate to External Advisors page
   - **Expected**: "Invite Advisor" button is hidden OR clicking shows permission error

### Edge Cases:
1. **Scenario: Resend invitation to advisor who previously declined**
   - Advisor "bob@advisor.com" was invited, declined invitation
   - Family Council invites bob@advisor.com again
   - **Expected**: New invitation created successfully, new email sent

2. **Scenario: Name field left empty (optional)**
   - Enter valid email, select role, leave name empty
   - Submit form
   - **Expected**: Invitation created successfully, email uses generic greeting without personalized name

5. **Scenario: Name field left empty (optional)**
   - Enter valid email, select role, leave name empty
   - Submit form
   - **Expected**: Invitation created successfully, email uses generic greeting without personalized name

6. **Scenario: Multiple pending invitations to same email**
   - Send invitation to "alice@consultant.com"
   - Before Alice accepts, send another invitation to same email
   - **Expected**: Second invitation created successfully (resend capability)

**Test Cases Location:** `Knowledge-Base/product-management/test-cases/FG-100-test-cases.md`

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** None (can be developed independently)
- **Blocks:** 
  - FG-105 (US-INV-5: Advisor accepts/declines family invitation) - acceptance flow requires invitation to exist
  - FG-106 (US-INV-6: View and manage pending invitations) - viewing logic requires invitations to be created

**External Dependencies:**
- **Email Service**: Must be operational to send invitation emails
- **Advisor Registration Flow**: Separate epic for new advisor onboarding (for non-registered advisors)
- **Permission System**: Role-based permission mapping must be defined for Personal Family Advisor vs. External Consul

**Related Stories:**
- US-INV-1: Advisor invites family (reverse flow)
- US-INV-5: Advisor accepts/declines invitation (downstream)
- US-INV-6: Manage pending invitations (downstream)

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Form submission response time: < 2 seconds
- Email delivery: < 30 seconds after submission
- Validation checks: < 500ms (inline validation)

**Security:**
- Email validation to prevent injection attacks
- Authorization check enforced at API level (is_family_council OR is_admin)
- Invitation links must be unique and non-guessable (UUID or secure token)
- Family data isolation maintained (family_id filtering)

**Accessibility:**
- Form fields must have proper labels and ARIA attributes
- Keyboard navigation supported throughout form
- Error messages announced to screen readers
- Color contrast meets WCAG AA standards

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Mobile Safari (iOS): Latest 2 versions
- Mobile Chrome (Android): Latest 2 versions

**Email Deliverability:**
- Invitation emails must comply with anti-spam regulations
- Include unsubscribe mechanism if required by jurisdiction
- Professional sender name and reply-to address

---

## 📝 Notes

**Open Questions:**
- [x] Can we resend invitation to same email if advisor hasn't accepted? **Answer: Yes, no limit on pending invitations**
- [x] Is there a limit on number of pending invitations? **Answer: No limit**
- [x] Can role be changed after invitation sent but before acceptance? **Answer: No, must cancel and resend. Post-acceptance role changes handled in separate stories**
- [x] What is the invitation link expiration policy? **Answer: 30 days, then auto-expire**
- [x] Should we send reminder emails if invitation not accepted within X days? **Answer: Conceptually yes, but deferred to future enhancement**
- [x] What happens to pending invitations if Family Council member who sent invitation loses permissions? **Answer: Invitation remains valid and pending, ownership can be transferred to Admin**
- [x] Should invitation email include brief family description/context? **Answer: Yes, include [FamilyName] and [ModulesList] based on role**

**Design Decisions Needed:**
- [ ] Modal vs. dedicated page for invitation form (recommend dedicated page for complex module configuration)
- [ ] Email template design with [FamilyName] and [ModulesList] with access levels formatting
- [ ] Success confirmation: inline message vs. modal vs. toast notification
- [ ] Role selection: radio buttons vs. dropdown vs. cards with descriptions (recommend cards for richer descriptions)
- [ ] Module selection UI: checkboxes in list vs. toggle switches vs. card grid (consider grouping by category)
- [ ] Access level selection: dropdown per module vs. radio buttons vs. icon-based selector
- [ ] Template configurations: Should we provide pre-configured templates like "Financial Advisor", "Governance Consultant", "Family Therapist"?
- [ ] Module grouping: Should modules be grouped into categories (Governance, Wealth, Development) for better UX?

**Future Enhancements (Out of Scope for US-INV-4):**
- Reminder emails for pending invitations (e.g., 7 days before expiration)
- Bulk invitation capability (invite multiple advisors at once with different module configurations)
- Custom invitation message field
- Invitation templates with pre-filled messages and module configurations (e.g., "Financial Advisor Template", "Governance Consultant Template")
- Invitation analytics (open rates, acceptance rates, module access patterns)
- Auto-transfer orphaned invitations to Admin when inviter loses permissions
- Module access recommendation engine based on advisor specialization
- Preview of invitation email before sending
- Ability to modify module access while invitation is still pending (without canceling and resending)

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-20
**Story Status:** Ready for Grooming