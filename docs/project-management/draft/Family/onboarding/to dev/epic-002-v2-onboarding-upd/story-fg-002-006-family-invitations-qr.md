## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Family Administrator, I want to invite family members via email or QR code
**Epic Link:** FG-EPIC-002-V2-onboarding-upd [Onboarding Flow v2.0 - Registration Restructure & Enhanced Setup Wizard]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Family Administrator completing Step 2 of onboarding,
**I want to** invite family members via email or QR code with visual family invitation system,
**so that** they can easily join the platform and participate in family governance.

**Example:**
- **As a** Family Administrator,
- **I want to** generate a shareable QR code and send email invitations to 5 family members,
- **so that** they can scan the QR code or click email link to join our family governance platform.

---

## 🎯 Business Context

**Why is this Story important?**

The new family invitation system with QR codes addresses critical onboarding friction:
- **User pain point:** v1 required copying/pasting invite links, causing friction and abandoned invitations
- **Business outcome:** Increased family invitation success rates (target 80% completion) and faster family onboarding
- **Strategic alignment:** Multiple invitation methods (email + QR) reduce barriers to family participation

Data shows: QR code invitations increase mobile acceptance rates by 45% compared to link-only invitations.

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** I complete Step 1 (User Profile),
   **When** I click "Continue",
   **Then** I advance to Step 2: "Invite Family Members" with progress indicator still showing 13% (as Step 2 is part of profile setup phase).

2. **Given** I'm on Step 2 (Invite Family Members),
   **When** the screen loads,
   **Then** I see an invite link with accompanying QR code, email invitation input field, "Add user" button, Family Consul designation checkbox, and members list area.

3. **Given** I want to invite via email,
   **When** I enter a valid email address and click "Add user",
   **Then** the email is added to members list below with "Member" role badge and I can continue adding more emails.

4. **Given** I want to designate a Family Consul,
   **When** I check the "Family Consul" checkbox for a member and add them,
   **Then** the member is added to list with "Consul" role badge instead of "Member" badge.

5. **Given** I have added at least one member,
   **When** I click "Send invites" button,
   **Then** invitation emails are sent to all listed email addresses and I see confirmation "Invitations sent successfully!".

6. **Given** I want to share via QR code,
   **When** I display the QR code to a family member and they scan it,
   **Then** they are redirected to registration page with family pre-filled (auto-join upon registration).

7. **Given** I want to share via invite link,
   **When** I share invite link to a family member and they click it,
   **Then** they are redirected to registration page with family pre-filled (auto-join upon registration).   

8. **Given** I complete invitations (or choose to skip),
   **When** I click "Continue" button,
   **Then** I advance to Step 3 (Constitution Setup) with progress updated.

**Additional Criteria:**
- [ ] Invite link is unique per family (includes family_id token)
- [ ] QR code dynamically generated from invite link
- [ ] Email validation prevents duplicate invitations
- [ ] Members list shows all invited emails with role badges (Consul/Member)
- [ ] "Send invites" button sends bulk emails to all listed addresses
- [ ] Family Consul designation includes note: "The consul must be invited to the system"
- [ ] No minimum member requirement (changed from v1's 2-member minimum)

---

## 🔒 Business Rules

**Validation Rules:**
1. **Email Invitation:**
   - Email format validation (RFC 5322 compliant)
   - Duplicate email check (cannot invite same email twice to same family)
   - Maximum 50 invitations per family per day (anti-spam protection)

2. **Invite Link:**
   - Format: `https://platform.com/invite?token=[family_token]`
   - Token: Cryptographically secure, includes family_id, expires after 30 days
   - Single-use per email address (email address required upon registration)

3. **QR Code:**
   - Generated from invite link URL
   - Dynamic: Updates when invite link regenerates
   - Size: 300x300 pixels, SVG format for scalability
   - Error correction: Level M (15% recovery)

4. **Family Consul Designation:**
   - Checkbox option when adding member
   - Only one Consul allowed per family initially (can be changed later in settings)
   - Consul note displayed: "The consul must be invited to the system"
   - Consul has elevated permissions (defined in EPIC-004 RBAC)

5. **Member List:**
   - Shows all invited emails (not yet registered users)
   - Role badges: "Consul" (blue) or "Member" (gray)
   - Remove option: Can remove invited email before sending
   - Sent status: Shows "Invited" badge after sending

**Authorization:**
- **Who can perform this action:** Family Administrator only (for initial onboarding)
- **Who can view results:** Administrator (in Step 2), invited members (receive email)

**Edge Cases:**
- **Email already registered in platform:** Show warning "This user already has an account. Send invite to add them to your family."
- **Invalid email format:** Show inline error "Invalid email address"
- **Duplicate email in list:** Show error "This email is already invited"
- **Invite link expired (>30 days):** Regenerate new link automatically, invalidate old QR code
- **User clicks "Continue" without inviting anyone:** Allowed, proceed to Step 3 (no minimum requirement)
- **Multiple admins inviting simultaneously:** Use database locking to prevent race conditions

---

## 📐 Design & UX

**Mockups/Wireframes:**
- Figma: https://www.figma.com/design/NWeSLJWw6iPinNILwPbsfv/-ReFamily--Web-Platofrm?node-id=4098-6568&t=52joNmqQcFNDQqAn-4
- Onboarding Step 02: Invite Family Members

**User Flow:**
1. User completes Step 1 (User Profile) → advances to Step 2
2. **Step 2 Screen:**
   - Wizard modal: "Step 2 of 8: Invite Family Members"
   - Progress bar: 13% (same as Step 1, part of profile setup phase)
   - **Invite Link Section:**
     - Text input with copy button: `https://platform.com/invite?token=abc123...`
     - QR code displayed below link (300x300px)
     - "Download QR code" button
   - **Email Invitation Section:**
     - Email input field with "Add user" button
     - "Family Consul" checkbox with note
   - **Members List:**
     - Shows invited emails with role badges
     - Remove icon (X) next to each email
   - **Action Buttons:**
     - "Send invites" primary button (enabled when list not empty)
     - "Continue" secondary button (always enabled, no minimum)
     - "Back" button (returns to Step 1)
3. User enters email → clicks "Add user" → email added to list
4. User designates Consul → checks checkbox → adds email with Consul badge
5. User clicks "Send invites" → bulk emails sent → confirmation message
6. User clicks "Continue" → advances to Step 3

**Design Specifications:**
- **Invite Link:** Read-only text input, copy icon button, "Copied!" tooltip on click
- **QR Code:** SVG format, centered below link, 300x300px, black/white high contrast
- **Email Input:** Autocomplete disabled, placeholder "Enter family member's email"
- **Family Consul Checkbox:** Blue checkbox, label "Designate as Family Consul", note text below in gray
- **Members List:** Card list, each card shows email, role badge, remove icon
- **Role Badges:** "Consul" (blue bg, white text), "Member" (gray bg, white text)
- **Send Invites Button:** Primary blue button, disabled if list empty, shows spinner during sending

---

## 🧪 Test Scenarios

**Happy Path:**
1. Complete Step 1 → advance to Step 2 (Invite Family Members)
2. Verify invite link and QR code displayed
3. Enter valid email (john@example.com) → click "Add user" → verify added to list with "Member" badge
4. Enter another email with "Family Consul" checked → click "Add user" → verify added with "Consul" badge
5. Click "Send invites" → verify emails sent and confirmation message displayed
6. Click "Continue" → verify advance to Step 3 (Constitution Setup)

**Negative Tests:**
1. **Invalid email format (john@):** Verify inline error "Invalid email address"
2. **Duplicate email:** Add john@example.com twice → verify error "This email is already invited"
3. **Empty email input:** Click "Add user" without entering email → verify error "Email required"
4. **Network error during "Send invites":** Verify error message "Failed to send invitations. Please try again."
5. **Exceeded daily limit (51 invitations):** Verify error "Daily invitation limit reached (50 max)"

**Edge Cases:**
1. **Click "Copy" button:** Verify invite link copied to clipboard and "Copied!" tooltip appears
2. **Click "Download QR code":** Verify QR code PNG file downloaded (filename: family-invite-qr.png)
3. **Scan QR code with mobile device:** Verify redirects to registration page with family token
4. **Remove member from list before sending:** Click X icon → verify member removed from list
5. **Click "Continue" without inviting anyone:** Verify can proceed to Step 3 (no minimum requirement)
6. **Two Consul designations:** Try adding second Consul → verify error "Only one Family Consul allowed"

**QR Code Scanning Test:**
- Scan QR code with iOS camera → verify opens Safari with invite link
- Scan QR code with Android camera → verify opens Chrome with invite link
- Scan QR code with WeChat (China) → verify link opens correctly

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** FG-002-005 (User profile creation - Step 1 must complete first)
- **Blocks:** FG-002-007 (Constitution Setup - Step 3 follows invitations)

**Technical Dependencies:**
- QR code generation library (qrcode.js, react-qr-code)
- Email delivery service (SendGrid, AWS SES)
- Invite token generation (crypto.randomBytes with family_id encoding)
- Backend API:
  - `POST /onboarding/invitations` (send bulk invites)
  - `GET /onboarding/invitation/qr/:family_id` (generate QR code)
  - `GET /onboarding/invitations/:family_id` (get invited members list)
  - `DELETE /onboarding/invitation/:invitation_id` (remove invited member)
- Database table: `family_invitations` (invitation_id, family_id, email, role, invited_by, invite_link, qr_code_url, status, sent_at, expires_at)

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- QR code generation: < 500ms
- Email sending (bulk): < 5 seconds for 10 emails
- Invite link copy: Instant (< 100ms)
- Page load time: < 2 seconds

**Security:**
- Invite tokens: 256-bit cryptographically secure
- Tokens expire after 30 days
- Rate limiting: Max 50 invitations per family per day
- Email verification required before accepting invitation
- Invite links use HTTPS only

**Browser Support:**
- Chrome: 90+ (Clipboard API for copy)
- Safari: 14+ (iOS 14+ for QR scanning)
- Firefox: 88+
- Edge: 90+

**Accessibility:**
- WCAG 2.1 Level AA compliance
- QR code has alt text for screen readers
- Invite link copyable via keyboard (Ctrl+C)
- Form labels associated with inputs
- Role badges have semantic HTML (not just color)

**Other:**
- Email deliverability: SPF, DKIM, DMARC configured
- QR code error correction: Level M (15% recovery for damaged codes)
- Analytics tracking: Invitation send rate, QR code download rate, invitation acceptance rate
- Logging: All invitation attempts logged for audit

---

## 📝 Notes

**Technical Implementation:**
- Generate invite token: `base64url(encrypt(family_id + timestamp))`
- QR code SVG generated server-side (cached for 24 hours)
- Bulk email sending via background job queue (don't block UI)
- Use optimistic UI: Show "Invitations sent!" immediately, retry failures in background

**QR Code Generation Example:**
```javascript
import QRCode from 'qrcode';

const inviteLink = `https://platform.com/invite?token=${familyToken}`;
const qrCodeDataURL = await QRCode.toDataURL(inviteLink, {
  width: 300,
  margin: 2,
  errorCorrectionLevel: 'M'
});
```

**Email Template:**
```
Subject: [User Name] invites you to Family Governance Platform

Hi [Recipient],

[User Name] ([user_email]) has invited you to join their family on the Family Governance Platform.

Click the link below to accept the invitation:
[Invite Link]

Or scan this QR code:
[QR Code Image]

This invitation expires in 30 days.

Best regards,
Family Governance Team
```

**Family Consul Business Logic:**
- Only one Consul per family initially (can be updated later in family settings)
- Consul permissions: Approve decisions, manage family settings, invite members (defined in EPIC-004)
- If admin designates Consul, admin retains separate Administrator role

**Migration Considerations:**
- Existing v1 families with pending invitations: Regenerate invite links with QR codes
- Feature flag: Gradually roll out QR code invitations (A/B test email-only vs. email+QR)
- Analytics comparison: Invitation acceptance rates (v1 link-only vs. v2 QR+link)

**Open Questions:**
- Should QR code include family logo/branding when scanned?
- Do we need invitation preview (what email looks like before sending)?
- Should we allow customizing invitation message text?
- Do we need invitation reminder system (auto-resend after 7 days)?

**Assumptions:**
- Family members have email addresses or mobile devices with QR scanners
- 30-day expiration sufficient for invitation acceptance (average acceptance: 48 hours)
- No minimum invitation requirement (families can start with 1 member)
- Users prefer multiple invitation methods (email + QR) over single method

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-30
