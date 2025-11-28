---
story_id: "STORY-FG-005-001"
title: "Advisor Invites Family via Email"
type: "story"
epic_id: "EPIC-005"
created: "2025-10-15"
updated: "2025-10-20"
priority: "high"
status: "ready"
estimate: "16h"
story_points: 8
sprint: "Sprint 45"
assignee: ""
labels: ["advisor", "invitations", "email", "family", "connection", "instant-association"]
dependencies: ["STORY-FG-005-000"]
architecture_refs: ["CLAUDE.md", ".claude/contexts/turbo.md", ".claude/contexts/backend.md"]
---

# User Story: US-INV-1 (FG-98) - Advisor Invites Family via Email

> **Note:** This User Story is part of Epic FG-97 "Advisor-Family Mutual Connection via Email Invitations (Bidirectional)"

---

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Consultant advisor, I want to click "Invite Family" and enter their email/name, so that the system instantly creates a connection and sends them an automated invitation to join my services.
**Epic Link:** FG-97 [Advisor-Family Mutual Connection via Email Invitations]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** External Advisor (Consultant),
**I want to** click "Invite Family" button, enter family contact email and name, and have system automatically create connection and send invitation email,
**so that** I can quickly onboard new family clients without manual email writing and the family receives professional invitation to join the platform.

---

## 🎯 Business Context

**Why is this Story important?**

**User Pain Point Being Solved:**
- Advisors currently have no streamlined way to invite prospective family clients to the platform
- Manual email outreach is time-consuming, inconsistent in messaging, and lacks tracking
- No visibility into whether families received/opened invitation or registered
- Advisors lose potential clients due to friction in onboarding process

**Business Outcome Expected:**
- Reduce advisor time spent on client onboarding from ~30 minutes to ~2 minutes per family
- Increase family registration conversion rate through professional, branded invitations
- Enable organic platform growth through advisor networks (each advisor brings 5-10 families)
- Create audit trail of advisor-initiated connections for compliance and analytics

**Strategic Alignment:**
- Supports Platform Growth OKR: "Grow registered families by 50% through network effects"
- Aligns with Advisor Experience pillar: "Make advisor workflows efficient and professional"
- Enables two-sided marketplace growth: advisors bring families, families discover advisors

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** I am logged in as External Advisor in Advisor Portal,
   **When** I navigate to "My Families" section,
   **Then** I see prominent "Invite Family" button clearly visible.

2. **Given** I click "Invite Family" button,
   **When** invitation form opens,
   **Then** I see form with fields:
   - Family contact email (required)
   - Family name (required)
   - Personal message (optional, max 500 characters)
   - Form explains what will happen after I send invitation

3. **Given** I enter valid family email and name,
   **When** I click "Send Invitation",
   **Then** system validates email format is correct and family name is not empty.

4. **Given** I submit invitation form with valid data,
   **When** system processes invitation,
   **Then** system checks if family with this email already exists in platform.

5. **Given** family with this email does NOT exist yet,
   **When** system creates invitation,
   **Then** system:
   - Creates pending connection record linking me (advisor) to this family
   - Generates unique invitation token/link valid for 30 days
   - Sends automated invitation email to family contact
   - Shows me success confirmation message
   - Adds family to my "Pending Invitations" list

6. **Given** family with this email already exists and is registered,
   **When** I try to invite them,
   **Then** system shows error message: "This family is already registered. Please search for them in Family Directory and send connection request instead."

7. **Given** invitation email was sent successfully,
   **When** family contact receives email,
   **Then** email contains:
   - My name, firm name, and advisor specialization (Consul/Mediator/Advisor)
   - Explanation that I invited them to join Family Governance platform
   - Benefits of using platform with me as their advisor
   - Clear call-to-action button: "Accept Invitation & Register"
   - Unique registration link pre-filled with my advisor connection
   - Email is professionally branded (Family Governance logo, styling)

8. **Given** I sent invitation to family,
   **When** I view "My Families" section,
   **Then** I see invited family in "Pending Invitations" tab with:
   - Family name
   - Contact email
   - Invitation sent date
   - Status: "Invitation Sent - Awaiting Registration"
   - Option to "Resend Invitation" or "Cancel Invitation"

9. **Given** family registers via my invitation link,
   **When** family completes registration,
   **Then** system automatically:
   - Activates connection between me and this family
   - Moves family from "Pending Invitations" to "Active Families" in my portal
   - Sends me notification: "Family [Name] accepted your invitation and registered"

10. **Given** invitation token expires after 30 days,
    **When** family tries to use expired link,
    **Then** system shows message: "This invitation has expired. Please contact your advisor to resend invitation."

**Additional Criteria:**
- [ ] Form includes character counter for optional personal message (500 chars max)
- [ ] Success message includes next steps: "Family will receive invitation email. You'll be notified when they register."
- [ ] Validation prevents me from inviting same family email twice (even if pending)
- [ ] System logs all invitation attempts for audit trail
- [ ] Email invitation is mobile-responsive and displays correctly on phones
- [ ] I can cancel pending invitation before family registers (removes connection record)

---

## 🎨 Design & UX

**User Flow:**
1. Advisor logs into Advisor Portal
2. Advisor navigates to "My Families" section
3. Advisor clicks "Invite Family" button
4. Modal/form opens with invitation fields
5. Advisor fills in family contact email, family name, optional personal message
6. Advisor reviews form, clicks "Send Invitation"
7. System validates data (email format, required fields)
8. System checks if family already exists
9. If family is new:
   - System creates pending connection record
   - System generates invitation token and registration link
   - System sends email to family contact
   - System shows success confirmation to advisor
   - System adds family to advisor's "Pending Invitations" list
10. Advisor sees updated "My Families" page with new pending invitation

**Error Flow:**
- If email format invalid → inline validation error "Please enter valid email address"
- If family name empty → inline validation error "Family name is required"
- If family already registered → error message with suggestion to search directory
- If email sending fails → error message "Invitation could not be sent. Please try again or contact support."

---

## 🔒 Business Rules

**Validation Rules:**
1. **Email Format**: Must be valid email format (contains @, domain, etc.)
2. **Family Name**: Must be 2-100 characters, cannot be empty or only whitespace
3. **Personal Message**: Optional, max 500 characters if provided
4. **Duplicate Prevention**: Cannot send invitation to same email if pending invitation already exists for this advisor
5. **Registration Check**: If family with email already registered, cannot send invitation (must use connection request instead)

**Authorization:**
- **Who can perform this action:** External Advisors only (with `is_advisor = true` role)
- **Who can view results:** Only the advisor who sent invitation can see their pending invitations

**Connection Record Rules:**
1. **Pending Connection Created Immediately**: Connection record created when invitation sent, status = "pending_invitation"
2. **Connection Activation**: Connection automatically becomes "active" when family registers via invitation link
3. **Invitation Expiration**: Invitation token valid for 30 days from creation
4. **Single-Use Token**: Invitation link can only be used once for registration
5. **Cancellation**: Advisor can cancel pending invitation before family registers (deletes connection record)

**Email Rules:**
1. **Automated Sending**: Email sent automatically by system within 1 minute of invitation submission
2. **Email Content**: Includes advisor name, firm, specialization, personal message (if provided), registration link
3. **Email Branding**: Uses Family Governance platform branding, professional styling
4. **Reply-To**: Email reply-to address is platform support, not advisor's personal email (for privacy)

**Edge Cases:**
- **Family Already Registered**: Show error, suggest using Family Directory search + connection request
- **Duplicate Pending Invitation**: Show error "You already sent invitation to this family. Please wait for them to register or cancel previous invitation."
- **Expired Invitation Link Used**: Show message on registration page, offer to contact advisor for new invitation
- **Email Delivery Failure**: Log failure, show error to advisor, allow retry
- **Advisor Cancels Before Registration**: Connection record deleted, invitation link becomes invalid

---

## 🧪 Test Scenarios

**Happy Path:**
1. **Successful Invitation Flow:**
   - Login as External Advisor
   - Navigate to "My Families" section
   - Click "Invite Family" button
   - Enter: email = "johnson.family@example.com", name = "Johnson Family", personal message = "Looking forward to working with you"
   - Click "Send Invitation"
   - **Expected**: Success message displayed, family appears in "Pending Invitations" list
   - **Expected**: Email received by johnson.family@example.com with invitation link
   - Check email content: contains advisor name, firm, specialization, personal message, registration link
   - Click registration link from email
   - **Expected**: Registration page opens with advisor connection pre-filled
   - Complete family registration
   - **Expected**: Connection becomes "active" in advisor's portal, family moves to "Active Families"
   - **Expected**: Advisor receives notification about successful registration

**Negative Tests:**
1. **Invalid Email Format:**
   - Enter email = "invalid-email-format" (no @ symbol)
   - **Expected**: Inline validation error "Please enter valid email address"
   - Cannot submit form until fixed

2. **Empty Family Name:**
   - Enter email = "valid@example.com", leave family name empty
   - Click "Send Invitation"
   - **Expected**: Validation error "Family name is required"

3. **Family Already Registered:**
   - Enter email of family that already exists in platform
   - Click "Send Invitation"
   - **Expected**: Error message "This family is already registered. Please search for them in Family Directory and send connection request instead."

4. **Duplicate Invitation Attempt:**
   - Send invitation to "test@example.com"
   - Try to send another invitation to same email
   - **Expected**: Error message "You already sent invitation to this family. Please wait for them to register or cancel previous invitation."

5. **Expired Invitation Link:**
   - Create invitation, manually set expiration date to past
   - Try to use registration link
   - **Expected**: Error page "This invitation has expired. Please contact your advisor to resend invitation."

**Edge Cases:**
1. **Very Long Personal Message:**
   - Enter 600 characters in personal message field
   - **Expected**: Field stops accepting input at 500 characters, shows character counter "500/500"

2. **Email Sending Failure:**
   - Simulate email service unavailable
   - Submit invitation
   - **Expected**: Error message "Invitation could not be sent. Please try again or contact support."
   - Connection record NOT created if email fails

3. **Advisor Cancels Pending Invitation:**
   - Send invitation to family
   - Before family registers, click "Cancel Invitation"
   - **Expected**: Confirmation dialog "Are you sure? Family will not be able to register via this invitation."
   - Confirm cancellation
   - **Expected**: Family removed from "Pending Invitations" list, invitation link becomes invalid

4. **Family Tries Multiple Registration Attempts:**
   - Family receives invitation email
   - Clicks registration link, starts registration but doesn't complete
   - Clicks same link again later
   - **Expected**: Registration page loads again with same pre-filled advisor connection (token reusable until registration completes OR 30 days expire)

**Test Cases Location:** `Knowledge-Base/product-management/test-cases/EPIC-FG-97-test-cases.md`

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** None (independent story, can be developed first)
- **Blocks:** FG-99 (US-INV-2) - Family Invites Advisor (uses same invitation infrastructure)

**External Dependencies:**
- **Email Service**: System must have operational email sending capability (SendGrid, AWS SES, or similar)
- **Advisor Profile Data**: Advisor name, firm name, specialization must exist in advisor profile
- **Family Registration Flow**: Must have existing family registration process that can accept invitation tokens

**Data Dependencies:**
- **Advisor Registry**: Advisor must be registered in platform with complete profile
- **Connection Management System**: Must have infrastructure to store advisor-family associations

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Form submission processing: < 2 seconds
- Email sending: < 1 minute from invitation submission
- Invitation list loading: < 1 second
- Registration link page load: < 2 seconds

**Security:**
- Invitation tokens must be cryptographically secure (unpredictable)
- Tokens expire after 30 days
- Tokens invalidated after single successful registration
- Email addresses stored securely, not exposed in URLs
- Only inviting advisor can see/manage their pending invitations

**Accessibility:**
- Form follows WCAG 2.1 AA standards
- Keyboard navigation fully supported
- Screen reader compatible labels and error messages
- Form validation errors announced to screen readers

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Mobile browsers: iOS Safari, Android Chrome

**Email Compatibility:**
- Email renders correctly in Gmail, Outlook, Apple Mail, Proton Mail
- Mobile-responsive design for phone screens
- Plain text fallback for email clients that don't support HTML

---

## 📝 Notes

**Open Questions:**
- [x] **Q: What happens if advisor sends invitation but family never registers?**
  - **A:** Invitation remains in "Pending" state for 30 days, then token expires. Advisor can resend invitation or cancel it manually.

- [x] **Q: Can advisor edit personal message after sending invitation?**
  - **A:** No, invitation is immutable once sent. Advisor must cancel and resend new invitation if they want to change message.

- [x] **Q: What if family already has advisor but wants to add another advisor?**
  - **A:** Out of scope for this story. Future story will handle multiple advisor associations per family.

- [x] **Q: Should we track if family opened invitation email?**
  - **A:** Nice-to-have, but not required for MVP. Can add email open tracking in future iteration.

- [x] **Q: What if advisor's firm name or specialization changes after invitation sent but before family registers?**
  - **A:** Invitation email contains static snapshot of advisor info at time of sending. When family registers, they see current advisor profile.

- [x] **Q: Can advisor resend invitation if family claims they didn't receive email?**
  - **A:** Yes, advisor can click "Resend Invitation" button which sends new email with same invitation token (extends expiration by 30 days from resend date).

**Future Enhancements (Not in This Story):**
- Bulk invitation: Upload CSV of multiple families to invite at once
- Invitation templates: Save custom message templates for reuse
- Email open/click tracking analytics
- Automated reminder emails if family doesn't register within 7 days
- Multi-language invitation emails based on family location

---

**Story Version:** 1.0.0
**Last Updated:** 2025-10-20
**Author:** Product Team
**Reviewer:** [To be assigned during grooming]