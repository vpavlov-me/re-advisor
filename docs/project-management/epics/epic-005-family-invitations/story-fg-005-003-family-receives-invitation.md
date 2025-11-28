---
story_id: "STORY-FG-005-003"
title: "Family Member Receives Advisor Invitation Email"
type: "story"
epic_id: "EPIC-005"
created: "2025-10-15"
updated: "2025-10-20"
priority: "high"
status: "ready"
estimate: "12h"
story_points: 5
sprint: "Sprint 45"
assignee: ""
labels: ["family", "email", "invitation", "verification", "onboarding", "registration"]
dependencies: ["STORY-FG-005-001"]
architecture_refs: ["CLAUDE.md", ".claude/contexts/turbo.md", ".claude/contexts/frontend.md"]
---

# User Story: US-INV-3 - Family Member Receives Advisor Invitation Email

---

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Family Member, I want to receive an email invitation from a Consultant advisor with clear next steps, so that I can verify my email and complete registration on Family Portal
**Epic Link:** FG-99 - Advisor-Family Mutual Connection via Email Invitations (Bidirectional)
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Family Member (not yet registered in the system),
**I want to** receive a clear email invitation from an advisor (Consultant or External Consul) with step-by-step instructions,
**so that** I can verify my email, understand who invited me, complete my registration on Family Portal, and establish connection with the advisor.

---

## 🎯 Business Context

**Why is this Story important?**

This story enables the critical first touchpoint in the advisor-family relationship establishment flow. When an advisor (Consultant or External Consul) wants to work with a new family, they send an invitation to a family representative. This story ensures that:

**User Pain Point Solved:**
- Family members receive professional, trustworthy communication from advisors
- Clear guidance on "what to do next" reduces confusion and abandonment
- Email verification builds trust and security
- Transparent explanation of roles (who will be admin) sets clear expectations

**Business Outcome Expected:**
- Smooth onboarding experience increases invitation acceptance rate
- Verified emails reduce fraud and improve communication reliability
- New families can quickly start using Family Governance platform with advisor support
- Different admin assignment logic supports two advisor business models:
  - **Consultant model**: Family owns portal, advisor provides services
  - **External Consul model**: Advisor prepares portal, then transfers control to family

**Strategic Alignment:**
- Supports core business model of connecting advisors with families
- Enables scalable family acquisition through advisor network
- Creates foundation for ongoing advisor-family collaboration
- Accommodates different advisor service models (Consultant vs. External Consul)

**Success Metrics (from Epic):**
- Email delivery rate > 95%
- Invitation acceptance rate > 60% within 7 days
- Registration completion after email click > 70%

---

## ✅ Acceptance Criteria

### Main Flow - Successful Invitation Reception and Registration

1. **Given** a Consultant advisor has sent an email invitation to a family member's email address,
   **When** the family member checks their email inbox,
   **Then** they receive an email with:
   - Clear subject line identifying it as an invitation from [Advisor Name]
   - Professional email template with Family Governance branding
   - Advisor's name, specialization, and brief message
   - Explanation of what Family Governance platform offers
   - Clear Call-to-Action button "Accept Invitation & Register"
   - Alternative text link if button doesn't work
   - Invitation expiration notice (valid for 7 days)
   - Contact information for support if needed

2. **Given** family member received the invitation email,
   **When** they click on "Accept Invitation & Register" button/link,
   **Then**:
   - Email verification occurs automatically via invitation token
   - Family member is redirected to Family Portal registration page
   - Email field is pre-filled with their verified email address (read-only)
   - Registration form displays advisor's name and type (Consultant or External Consul) who invited them
   - If invited by **Consultant**: Clear instructions explain "You will be the first member and administrator of your family"
   - If invited by **External Consul**: Clear instructions explain "[Advisor Name] will be the administrator to help set up your family portal"

3. **Given** family member is on registration page with verified email,
   **When** they complete registration form with required information:
   - Full name
   - Password (with strength requirements)
   - Family name
   - Phone number (optional)
   - Accept Terms & Conditions
   **Then**:
   - New family is created in the system
   - Family member account is created with role depending on advisor type:
     - **If invited by Consultant**: Family member gets `is_admin = True` role
     - **If invited by External Consul**: Family member gets standard role (`is_admin = False`), and External Consul becomes family admin
   - Advisor is automatically associated with this new family
   - Family member receives confirmation email "Welcome to Family Governance"
   - Family member is redirected to Family Portal dashboard

4. **Given** family member successfully registered,
   **When** they log into Family Portal,
   **Then**:
   - Dashboard displays welcome message with next steps
   - Advisor appears in "Family - External Advisors" section with status "Connected"
   - **If invited by Consultant**: Family member can access all admin features (invite family members, configure family settings, manage advisors)
   - **If invited by External Consul**: Family member has standard member access; External Consul has admin privileges to prepare portal

### Edge Cases

5. **Given** family member clicks invitation link,
   **When** invitation token has expired (> 7 days old),
   **Then**:
   - System displays friendly error message: "This invitation has expired. Please contact [Advisor Name] to request a new invitation."
   - Advisor contact information is displayed
   - No registration form is shown

6. **Given** family member clicks invitation link,
   **When** this email address is already registered in the system,
   **Then**:
   - System detects existing account
   - Displays message: "You already have an account. Please log in to connect with [Advisor Name]."
   - Provides "Log In" button
   - After login, system prompts to confirm advisor connection

7. **Given** family member clicks invitation link,
   **When** invitation token is invalid or tampered with,
   **Then**:
   - System displays error message: "Invalid invitation link. Please check your email or contact support."
   - Support contact information is provided
   - No sensitive information is revealed

8. **Given** family member is completing registration,
   **When** network error occurs or page is accidentally closed,
   **Then**:
   - Family member can click invitation link again within 7 days
   - Registration process can be restarted
   - Email verification is still valid

### Additional Criteria

- [ ] Email is sent in both HTML and plain text formats for compatibility
- [ ] Email passes spam filter checks (SPF, DKIM, DMARC configured)
- [ ] Invitation link works on mobile devices (responsive registration page)
- [ ] Registration form has clear validation messages for all fields
- [ ] Password requirements are displayed before user starts typing
- [ ] Success/error messages are clear and actionable
- [ ] Process respects GDPR (clear consent for data processing)

---

## 🎨 Design & UX

**Registration Page User Flow:**
1. User clicks link in email
2. **Email Verification Screen** (quick, automatic):
   - Spinner: "Verifying your invitation..."
   - Success: ✓ "Email verified"
   - Auto-redirect to registration form (2 seconds)
3. **Registration Form**:
   - Header: "Complete Your Registration"
   - Subheader: "Invited by [Advisor Name] ([Advisor Type])"
   - Form fields (as per AC #3)
   - Info box depends on advisor type:
     - **If Consultant**: ℹ️ "You will be the administrator of your family"
     - **If External Consul**: ℹ️ "[Advisor Name] will be the administrator to help set up your family portal"
   - [Register] button
4. **Success Screen**:
   - Success icon
   - "Welcome to Family Governance!"
   - "Redirecting to your dashboard..." (3 seconds)
5. **Family Portal Dashboard**:
   - Welcome modal with quick start guide (different content for admin vs. member role)
   - Advisor visible in "Family - External Advisors" section

**Wireframe Notes:**
- Email should be mobile-responsive (50% of users check email on mobile)
- CTA button should be prominent and finger-friendly (min 44px height)
- Registration form should be single-column for better mobile UX
- Password field should have "show/hide" toggle
- Form should support autofill for name/email

---

## 🔒 Business Rules

### Validation Rules

1. **Invitation Token Validity:**
   - Token is valid for exactly 7 days from creation
   - Token can only be used once (single-use)
   - Token is tied to specific email address (cannot be transferred)

2. **Email Validation:**
   - Must be valid email format
   - Must match email address in invitation
   - Cannot be already registered in system (unless edge case #6 applies)

3. **Registration Data Validation:**
   - **Full Name**: Required, 2-100 characters, letters and spaces only
   - **Password**: Minimum 8 characters, must contain: uppercase, lowercase, number, special character
   - **Family Name**: Required, 2-100 characters
   - **Phone**: Optional, valid phone format if provided
   - **Terms & Conditions**: Must be accepted (checkbox required)

4. **Family Creation Rules:**
   - Each invitation ALWAYS creates a new family (never adds to existing family)
   - Admin role assignment depends on advisor type:
     - **Consultant invitation**: First registered family member automatically receives `is_admin = True`
     - **External Consul invitation**: External Consul receives `is_admin = True` to prepare portal; family member receives standard role
   - When External Consul stops being advisor, admin rights are transferred to family member
   - Family name must be unique within the system (add counter if duplicate: "Smith Family (2)")

### Authorization

- **Who can receive invitation:** Any person with valid email address (does not need existing account)
- **Who can register via invitation:** Only the email recipient specified in invitation token
- **Who becomes admin:** 
  - If **Consultant** invites: First family member registering becomes admin
  - If **External Consul** invites: External Consul becomes admin, family member gets standard role
- **Who can see advisor connection:** All family members can see advisor in "Family - External Advisors" section
- **Admin rights transfer:** When External Consul leaves, admin rights automatically transfer to family member(s)

### Edge Cases

- **Token Expired (> 7 days):** Show expiration message, provide advisor contact, do not allow registration
- **Email Already Registered:** Redirect to login, offer to connect advisor after authentication
- **Invalid Token:** Show generic error, provide support contact, log security event
- **Incomplete Registration:** Allow retry within token validity period, do not create partial family records
- **Duplicate Family Name:** System automatically appends counter to ensure uniqueness

### Data Privacy & Security

- **PII Handling:** Email address is verified before any account creation
- **Token Security:** Tokens are cryptographically secure, non-guessable, single-use
- **Audit Trail:** All invitation events logged (sent, clicked, completed, expired)
- **GDPR Compliance:** Clear consent for data processing in registration form, right to deletion available

---

## 🧪 Test Scenarios

### Happy Path - Successful Registration

**Scenario 1: Family member accepts invitation from Consultant (becomes admin)**

1. **Setup:** Consultant advisor has sent invitation to john.doe@example.com
2. John receives email in inbox within 5 minutes
3. John opens email, sees clear advisor information and CTA button
4. John clicks "Accept Invitation & Register"
5. System verifies token → shows "Email verified ✓"
6. John lands on registration form with email pre-filled
7. Registration form shows: "You will be the first member and administrator of your family"
8. John enters:
   - Full Name: "John Doe"
   - Password: "SecurePass123!"
   - Family Name: "Doe Family"
   - Phone: "+1234567890" (optional)
   - Accepts Terms & Conditions ✓
9. John clicks "Register"
10. System creates new family "Doe Family"
11. System creates John's account with `is_admin = True`
12. System links Consultant to "Doe Family"
13. John sees success message: "Welcome to Family Governance!"
14. John is redirected to Family Portal dashboard
15. Dashboard shows welcome modal with quick start
16. "Family - External Advisors" section shows connected Consultant
17. John has full admin access (can invite members, configure settings, manage advisors)

**Expected Result:** ✅ New family created, family member is admin, Consultant connected, user authenticated

---

**Scenario 2: Family member accepts invitation from External Consul (Consul becomes admin)**

1. **Setup:** External Consul has sent invitation to mary.smith@example.com
2. Mary receives email in inbox within 5 minutes
3. Mary opens email, sees advisor information with "External Consul" designation
4. Mary clicks "Accept Invitation & Register"
5. System verifies token → shows "Email verified ✓"
6. Mary lands on registration form with email pre-filled
7. Registration form shows: "[Advisor Name] will be the administrator to help set up your family portal"
8. Mary enters:
   - Full Name: "Mary Smith"
   - Password: "SecurePass456!"
   - Family Name: "Smith Family"
   - Phone: "+9876543210" (optional)
   - Accepts Terms & Conditions ✓
9. Mary clicks "Register"
10. System creates new family "Smith Family"
11. System creates Mary's account with standard role (`is_admin = False`)
12. System assigns External Consul as family admin (`is_admin = True`)
13. System links External Consul to "Smith Family"
14. Mary sees success message: "Welcome to Family Governance!"
15. Mary is redirected to Family Portal dashboard
16. Dashboard shows welcome modal explaining advisor will set up portal
17. "Family - External Advisors" section shows connected External Consul (admin badge)
18. Mary has standard member access (can view, participate, but not manage settings)
19. External Consul can now prepare portal for family use

**Expected Result:** ✅ New family created, External Consul is admin, family member has standard access, advisor connected

---

### Negative Tests

**Test 1: Expired Invitation Token**

1. **Setup:** Advisor sent invitation 8 days ago
2. Family member clicks invitation link
3. **Expected:** Error message displayed: "This invitation has expired. Please contact [Advisor Name] for a new invitation."
4. **Expected:** No registration form shown
5. **Expected:** Advisor contact information displayed

**Test 2: Email Already Registered**

1. **Setup:** john.doe@example.com already has account in system
2. Advisor sends invitation to john.doe@example.com
3. John clicks invitation link
4. **Expected:** System detects existing account
5. **Expected:** Message: "You already have an account. Please log in to connect with [Advisor Name]."
6. **Expected:** "Log In" button displayed
7. John logs in successfully
8. **Expected:** Prompt to confirm advisor connection appears

**Test 3: Invalid Password (weak)**

1. Family member clicks invitation link → registration form appears
2. Family member enters password: "12345"
3. **Expected:** Validation error displayed: "Password must be at least 8 characters and contain uppercase, lowercase, number, and special character"
4. **Expected:** Form not submitted
5. **Expected:** Password field highlighted in red

**Test 4: Invalid/Tampered Token**

1. Family member receives email with invitation link
2. Link is accidentally modified (e.g., character missing)
3. Family member clicks modified link
4. **Expected:** Error message: "Invalid invitation link. Please check your email or contact support."
5. **Expected:** No sensitive information revealed
6. **Expected:** Support contact provided

**Test 5: Network Interruption During Registration**

1. Family member starts filling registration form
2. Network disconnects before submission
3. Family member closes browser
4. Later, family member clicks invitation link again (within 7 days)
5. **Expected:** Registration form loads again
6. **Expected:** Email still verified and pre-filled
7. **Expected:** No partial account created from previous attempt

---

### Edge Cases

**Test 6: Mobile Device Registration**

1. Family member opens invitation email on mobile phone
2. Clicks CTA button
3. **Expected:** Registration form is mobile-responsive
4. **Expected:** All fields are easily tappable
5. **Expected:** Virtual keyboard doesn't obscure fields
6. **Expected:** Form validation works on mobile
7. **Expected:** Success redirect works on mobile browser

**Test 7: Duplicate Family Name**

1. Family "Smith Family" already exists in system
2. New advisor invites new person from different Smith family
3. New family member registers with family name "Smith Family"
4. **Expected:** System automatically renames to "Smith Family (2)"
5. **Expected:** Registration completes successfully
6. **Expected:** New family is completely separate from existing "Smith Family"

**Test 8: Email Spam Filter**

1. Advisor sends invitation
2. **Expected:** Email arrives in recipient's inbox (not spam folder)
3. **Expected:** Email delivery rate > 95% across major email providers (Gmail, Outlook, Yahoo)
4. **Expected:** Email authentication headers present (SPF, DKIM, DMARC)

---

## 📗 Dependencies

**Story Dependencies:**

- **Blocked by:** 
  - FG-100 (US-INV-1) - As an Advisor, I want to send email invitations to family members
    - Reason: Cannot receive invitation if sending mechanism doesn't exist
  
- **Blocks:**
  - FG-102 (US-INV-4) - As an Advisor, I want to see confirmation when family member accepts my invitation
    - Reason: Acceptance tracking depends on successful registration completion

**Technical Dependencies:**
- Email delivery service must be operational
- Family Portal registration endpoint must be available
- Email verification system must be configured

**Content Dependencies:**
- Email template design finalized
- Terms & Conditions and Privacy Policy published
- Support contact information available

---

## ⚠️ Non-Functional Requirements

### Performance

- **Email delivery time:** < 5 minutes from advisor sending invitation
- **Page load time (registration form):** < 2 seconds on 3G connection
- **Form submission response:** < 3 seconds
- **Email verification process:** < 1 second (token validation)

### Security

- **Authorization required:** Email verification via invitation token (automatically handled)
- **Data encryption:** All form data transmitted over HTTPS
- **PII handling:** Yes - email, name, phone stored securely
  - Email verified before storage
  - Password hashed before storage
  - Audit log for all registration events
- **Token security:** Single-use, cryptographically secure, 7-day expiration

### Accessibility

- **WCAG level:** AA compliance required
- **Keyboard navigation:** Full form navigation without mouse
- **Screen reader support:** All form fields properly labeled, error messages announced
- **Color contrast:** Text meets 4.5:1 contrast ratio minimum
- **Focus indicators:** Clear visual focus on form fields

### Browser Support

- **Desktop:**
  - Chrome: Latest 2 versions
  - Safari: Latest 2 versions
  - Firefox: Latest 2 versions
  - Edge: Latest 2 versions
- **Mobile:**
  - iOS Safari: Latest 2 versions
  - Android Chrome: Latest 2 versions

### Localization

- **Language support:** English (primary), expandable to other languages in future
- **Date/Time format:** Follows user's browser locale
- **Phone number format:** International format supported

---

## 📝 Notes

**Open Questions:**

- [x] What happens if family member's email is already registered? → **Answer:** Show login prompt, allow advisor connection after authentication
- [x] How long is invitation token valid? → **Answer:** 7 days
- [x] Can family member forward invitation to someone else? → **Answer:** No, token is tied to specific email address
- [x] What if family with same name already exists? → **Answer:** System automatically appends counter (e.g., "Smith Family (2)")
- [x] Does family member automatically get admin role? → **Answer:** Depends on advisor type:
  - **Consultant invitation**: Family member becomes admin
  - **External Consul invitation**: External Consul becomes admin, family member gets standard role
- [x] What happens when External Consul stops being advisor? → **Answer:** Admin rights automatically transfer to family member(s) - **Note:** This is out of scope for this story, will be handled separately
- [x] Can advisor send multiple invitations to same email? → **Answer:** To be clarified in US-INV-1 (likely: pending invitation must expire or be revoked first)

**Additional Notes:**
- Email template copy should be reviewed by marketing for tone/branding
- Consider A/B testing different email subject lines to improve open rates
- Monitor bounce rates and adjust email provider reputation accordingly
- Plan for future enhancement: multi-language email templates

---

**Template Version:** 1.0.0
**Story Created:** 2025-10-20
**Story Status:** Ready for Grooming