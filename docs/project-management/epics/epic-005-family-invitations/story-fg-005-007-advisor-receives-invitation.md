---
story_id: "STORY-FG-005-007"
title: "Advisor Receives Email Invitation with Role Details"
type: "story"
epic_id: "EPIC-005"
created: "2025-10-15"
updated: "2025-10-20"
priority: "high"
status: "ready"
estimate: "12h"
story_points: 5
sprint: "Sprint 47"
assignee: ""
labels: ["advisor", "email", "invitation", "verification", "role-details", "onboarding"]
dependencies: ["STORY-FG-005-004"]
architecture_refs: ["CLAUDE.md", ".claude/contexts/turbo.md", ".claude/contexts/frontend.md"]
---

# User Story: US-INV-7 (FG-105) - Advisor Receives Email Invitation with Role Details

---

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As an invited advisor (Personal Family Advisor or External Consul), I want to receive an email invitation from a family with my assigned role details, so that I can verify my email and complete registration on Advisor Portal with correct access.
**Epic Link:** FG-98 - Epic: Advisor-Family Mutual Connection via Email Invitations (Bidirectional)
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [Sprint 4 - Phase 2]

---

## 📖 User Story

**As an** invited advisor (Personal Family Advisor or External Consul),
**I want to** receive an email invitation from a family with my assigned role details and verification link,
**so that** I can verify my email and complete registration on Advisor Portal with correct family access and permissions from day one.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point being solved:**
- Advisors need clear, professional invitation experience when families want to onboard them
- Confusion about access level and expectations must be eliminated before advisor even starts registration
- Manual email exchanges between family and advisor are time-consuming and error-prone
- Advisor needs to understand their role (Personal Family Advisor vs External Consul) before committing to registration

**Business outcome expected:**
- Seamless advisor onboarding process increases advisor adoption rate
- Clear role communication prevents access confusion and support tickets
- Professional email invitations improve platform credibility
- Automated verification links reduce time-to-activation from days to minutes
- Family-sponsored subscription model becomes operational

**Strategic alignment:**
- Enables bidirectional invitation system (Epic FG-98)
- Supports Family-Sponsored subscription monetization strategy
- Reduces manual onboarding overhead for Customer Success team
- Improves advisor satisfaction and retention

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** Family Council member completed advisor invitation with payment (US-INV-6 completed successfully) and advisor email doesn't exist in Advisor Portal,
   **When** system processes successful payment,
   **Then** advisor receives professional HTML email within 1 minute with:
   - Personalized greeting with advisor's first name
   - Family name that invited them
   - Assigned role clearly stated (Personal Family Advisor OR External Consul)
   - Access level description matching their role
   - Working verification link with unique secure token
   - Note that subscription is Family-Sponsored
   - Support contact information

2. **Given** advisor received invitation email,
   **When** advisor clicks verification link in email,
   **Then** advisor lands on Advisor Portal registration page with:
   - Email pre-filled (read-only, from token)
   - Family name displayed prominently ("You're joining [Family Name]")
   - Assigned role displayed ("Role: Personal Family Advisor" or "Role: External Consul")
   - Registration form with required fields: Password, First Name, Last Name, Professional Title, Specialization
   - Clear "Complete Registration" call-to-action button

3. **Given** advisor is on registration page with pre-filled context,
   **When** advisor fills remaining fields and submits registration form,
   **Then** system:
   - Creates advisor account on Advisor Portal
   - Changes association status from `pending_verification` to `active`
   - Shows success message: "Registration complete! You now have access to [Family Name]"
   - Redirects advisor to their multi-family dashboard
   - Family appears in advisor's family list with assigned role visible

4. **Given** advisor completed registration successfully,
   **When** advisor views their multi-family dashboard,
   **Then** advisor can see:
   - Family name in family list
   - Role badge (Personal Family Advisor or External Consul)
   - Subscription type: "Family-Sponsored"
   - Access level indicator (Limited or Full based on role)
   - Navigation to family's governance modules (filtered by role permissions)

5. **Given** email contains verification link with token,
   **When** advisor attempts to use same verification link twice,
   **Then** system:
   - Detects token already used
   - Shows message: "This invitation link has already been used. Please log in to access your account."
   - Provides "Go to Login" button

**Additional Criteria:**
- [ ] Email template differs based on role (Personal Family Advisor vs External Consul)
- [ ] Email is mobile-responsive and renders correctly in major email clients (Gmail, Outlook, Apple Mail)
- [ ] Verification link has no expiration in MVP (links remain valid indefinitely)
- [ ] Registration page validates all required fields before allowing submission
- [ ] System handles email delivery failures gracefully (logs error, allows Family to resend)

---

## 🎨 Design & UX

**Email Templates:**
- **Existing templates:** Use pre-designed HTML email templates for advisor invitations
- **Two variants:** Personal Family Advisor template vs External Consul template
- **Key differences:** Access level description, module access explanation, role-specific messaging

**User Flow:**
1. Advisor receives email on mobile or desktop
2. Advisor reads role details and access level description
3. Advisor clicks "Complete Your Registration" button in email
4. Browser opens → Advisor Portal registration page
5. Advisor sees pre-filled email, family context, role assignment
6. Advisor fills password and professional details
7. Advisor clicks "Complete Registration"
8. System processes, shows success message
9. Auto-redirect to multi-family dashboard (5 seconds)
10. Advisor sees family in list, can start working

---

## 🔒 Business Rules

**Validation Rules:**
1. **Email uniqueness:** If advisor email already exists on Advisor Portal, this flow DOES NOT trigger (instant connection created instead - handled in US-INV-5)
2. **Token validity:** Verification token must be unique, secure, and tied to specific advisor-family association
3. **Token single-use:** Token can only be used once for registration (subsequent uses redirect to login)
4. **Role assignment:** Role (Personal Family Advisor or External Consul) is permanently assigned during invitation, cannot be changed during registration
5. **Required fields:** Password, First Name, Last Name must be provided (Professional Title and Specialization are optional in MVP)
6. **Password strength:** Minimum 8 characters, must include uppercase, lowercase, number
7. **Family context:** Advisor can only complete registration for the family that sent invitation (no cross-family registration)

**Authorization:**
- **Who can receive invitation:** Any email address provided by Family Council/Admin (no restrictions)
- **Who can complete registration:** Only person with access to invited email address (email verification via link click)
- **Who can view registration page:** Anyone with valid verification token (public endpoint)

**Edge Cases:**
1. **Email bounces (undeliverable):** 
   - System logs error
   - Family sees error message: "Email could not be delivered to [email]. Please verify email address and try again."
   - Family can re-invite with corrected email (US-INV-9)

2. **Advisor clicks link but doesn't complete registration:**
   - Association remains in `pending_verification` status
   - Family can resend invitation email (US-INV-9)
   - No timeout in MVP (invitation remains valid)

3. **Advisor loses verification email:**
   - Family can resend invitation from invitation management page (US-INV-9)
   - New email with same token sent

4. **Advisor accidentally creates duplicate registration attempt:**
   - System detects existing pending association
   - Shows message: "You already have a pending invitation from [Family Name]. Please check your email or contact the family."

5. **Family deletes invitation before advisor completes registration:**
   - Token becomes invalid
   - Registration page shows: "This invitation is no longer valid. Please contact [Family Name] for assistance."

---

## 🧪 Test Scenarios

**Happy Path:**
1. **Personal Family Advisor invitation:**
   - Family invites advisor with Personal Family Advisor role
   - Payment completes successfully
   - Advisor receives email within 1 minute
   - Email contains correct role description (Limited access)
   - Advisor clicks verification link
   - Registration page shows Personal Family Advisor role
   - Advisor completes registration
   - Advisor sees family in dashboard with Limited access indicator

2. **External Consul invitation:**
   - Family invites advisor with External Consul role
   - Payment completes successfully
   - Advisor receives email within 1 minute
   - Email contains correct role description (Full governance access)
   - Advisor clicks verification link
   - Registration page shows External Consul role
   - Advisor completes registration
   - Advisor sees family in dashboard with Full access indicator

**Negative Tests:**
1. **Invalid token:**
   - User manually modifies verification token in URL
   - System shows: "Invalid invitation link. Please contact the family for a new invitation."

2. **Token already used:**
   - Advisor completes registration successfully
   - Advisor clicks same verification link again
   - System shows: "This invitation link has already been used. Please log in."
   - Provides login button

3. **Weak password:**
   - Advisor enters password "12345"
   - System shows inline validation error: "Password must be at least 8 characters with uppercase, lowercase, and number"
   - Registration button remains disabled until valid password entered

4. **Email delivery failure:**
   - Email service returns delivery error (invalid email domain)
   - System logs error
   - Family sees error message immediately after payment
   - Family can correct email and retry

**Edge Cases:**
1. **Mobile email client:**
   - Advisor opens email on iPhone Mail app
   - Email renders correctly (responsive design)
   - Verification button is tappable
   - Link opens Safari browser
   - Registration page is mobile-friendly

2. **Slow network:**
   - Advisor clicks verification link on slow 3G connection
   - Loading spinner shows while page loads
   - Context (family name, role) loads progressively
   - Form becomes interactive when fully loaded

3. **Browser back button after registration:**
   - Advisor completes registration
   - Advisor hits browser back button
   - System detects already registered
   - Auto-redirects to dashboard (doesn't show registration form again)

**Test Cases Location:** `Knowledge-Base/product-management/test-cases/FG-98-bidirectional-invitations-test-cases.md`

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** FG-104 (US-INV-5) - Automatic payment detection must determine if payment needed
- **Blocked by:** FG-108 (US-INV-6) - Payment must complete successfully before email can be sent
- **Blocked by:** FG-103 (US-INV-4) - Family invitation form must create pending association first
- **Blocks:** FG-106 (US-INV-8) - Verification completion triggers notifications to both parties
- **Related:** FG-107 (US-INV-9) - Invitation management allows resending this email

**External Dependencies:**
- Email service operational (SendGrid, AWS SES, or similar)
- Email templates designed and approved
- Registration page UI components implemented

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Email delivery time: < 1 minute after payment completion
- Registration page load time: < 2 seconds
- Form submission response time: < 1 second
- Email template rendering: Compatible with 95% of email clients

**Security:**
- Verification token must be cryptographically secure (minimum 128-bit entropy)
- Token transmitted only via HTTPS
- Password must be hashed before storage (never stored in plain text)
- Registration endpoint protected against brute force attacks (rate limiting)
- Email contains no sensitive data beyond family name and role

**Accessibility:**
- Email template: Alt text for images, semantic HTML
- Registration page: WCAG 2.1 Level AA compliant
- Keyboard navigation: All form fields accessible via Tab key
- Screen reader support: Proper ARIA labels and form field descriptions

**Browser Support:**
- Chrome: Last 2 versions
- Safari: Last 2 versions (iOS and macOS)
- Firefox: Last 2 versions
- Edge: Last 2 versions

**Email Client Support:**
- Gmail (Web, iOS, Android)
- Outlook (Web, Desktop, iOS, Android)
- Apple Mail (macOS, iOS)
- Yahoo Mail
- Proton Mail

---

## 📝 Notes

**Open Questions:**
- [x] **Should email template include advisor profile preview?** → No in MVP, keep email simple with role details only
- [x] **What happens if advisor changes email during registration?** → Email is read-only (pre-filled from token), cannot be changed
- [x] **Can advisor skip registration and accept invitation later?** → Yes, invitation remains pending, Family can resend email (US-INV-9)
- [x] **Should we track email open rates?** → Nice to have, not critical for MVP, can add email tracking pixels later
- [x] **What if advisor wants different role than assigned?** → Not possible in MVP, advisor must accept assigned role or decline (contact Family directly)
- [x] **Should registration page show subscription cost?** → Yes, show "Your subscription is sponsored by [Family Name]" with cost transparency
- [x] **Can advisor register without completing all optional fields?** → Yes, only Password, First Name, Last Name are required in MVP
- [x] **What if family cancels subscription before advisor registers?** → Out of scope for MVP, handled in subscription management stories
- [x] **Should email include direct support contact (phone/email)?** → Yes, include generic support email in footer
- [x] **What if advisor's email has typo (e.g., gamil.com instead of gmail.com)?** → Email bounces → Family sees error → Can re-invite with corrected email (US-INV-9)

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-20
**Story Author:** Product Team
**Related Epic:** FG-98 - Advisor-Family Mutual Connection via Email Invitations (Bidirectional)