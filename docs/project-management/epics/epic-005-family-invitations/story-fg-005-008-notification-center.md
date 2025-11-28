---
story_id: "STORY-FG-005-008"
title: "Notification Center for Invitation Status Updates"
type: "story"
epic_id: "EPIC-005"
created: "2025-10-15"
updated: "2025-10-20"
priority: "high"
status: "ready"
estimate: "16h"
story_points: 8
sprint: "Sprint 47"
assignee: ""
labels: ["notification", "in-app", "invitation-status", "onboarding", "user-feedback"]
dependencies: ["STORY-FG-005-001", "STORY-FG-005-004"]
architecture_refs: ["CLAUDE.md", ".claude/contexts/turbo.md", ".claude/contexts/backend.md"]
---

# User Story: US-INV-8 (FG-106) - Notification Center
---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As a Consultant advisor or Family Council member or Admin, I want to receive an in-app notification when my invited user completes verification, so that I know they've joined and can follow up with onboarding  
**Epic Link:** FG-105 (Epic: Advisor-Family Mutual Connection via Email Invitations)  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant advisor OR Family Council member OR Admin (invitation sender),  
**I want to** receive an in-app notification in my portal's notification center when my invited user completes email verification,  
**so that** I know they've successfully joined the platform and can follow up with onboarding guidance or start collaboration.

---

## 🎯 Business Context

**Why is this Story important?**

**User Pain Point:**
- Currently, when a user sends an invitation, they have no way to know if/when the invited person has completed registration and verification
- This creates uncertainty and delays in starting collaboration or onboarding
- Users may repeatedly check or send follow-up emails unnecessarily

**Business Outcome:**
- Closes the information gap between invitation sent and new user active
- Enables timely onboarding and reduces friction in advisor-family connections
- Improves user satisfaction by providing transparency in the invitation process
- Reduces support burden (fewer "did they join yet?" questions)

**Strategic Alignment:**
- Core to Epic FG-105 goal of seamless mutual connection flow
- Essential for positive first impression of platform collaboration capabilities
- Supports both advisor acquisition (advisor inviting families) and family growth (family inviting advisors)

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** I am a Consultant advisor who sent an invitation to a family member,  
   **When** the invited family member completes email verification,  
   **Then** I receive an in-app notification in my Advisor Portal notification center stating "[Name] ([Role]) has completed verification and joined [Family Name]".

2. **Given** I am a Family Council member who sent an invitation to an advisor,  
   **When** the invited advisor completes email verification,  
   **Then** I receive an in-app notification in my Family Portal notification center stating "[Advisor Name] has completed verification and is now associated with your family".

3. **Given** I am an Admin who sent an invitation to any user type,  
   **When** the invited user completes email verification,  
   **Then** I receive an in-app notification in my respective portal (Family Portal if admin of family, Admin Portal if system admin) with appropriate messaging.

4. **Given** a notification about completed verification has been sent to me,  
   **When** I view my notification center,  
   **Then** the notification displays:
   - Invited user's full name
   - Invited user's role (e.g., "Family Council", "Consultant Advisor", "Family Member")
   - Timestamp of when verification was completed
   - Clear, actionable message text
   - Unread/read status indicator

5. **Given** I have received a verification completion notification,  
   **When** I click on the notification,  
   **Then** the notification is marked as read and I can optionally be navigated to the new user's profile or relevant context (e.g., family member list, advisor associations list).

6. **Given** an invited user registers but has NOT yet verified their email,  
   **When** I check my notification center,  
   **Then** I do NOT see a verification completion notification (notification only triggers after email verification, not after registration).

7. **Given** I sent multiple invitations to different users,  
   **When** multiple invited users complete verification at similar times,  
   **Then** I receive separate notifications for each user, each with correct user information and no duplicate notifications per user.

8. **Given** an invited user completes verification multiple times (e.g., re-verification after email change),  
   **When** the re-verification occurs,  
   **Then** I do NOT receive duplicate notifications (only the first verification triggers notification).

**Additional Criteria:**
- [ ] Notifications respect multi-tenancy: Family Council/Admin only see notifications for their family context, Advisors see notifications for all families they're associated with
- [ ] Notifications are delivered within 2 seconds of verification completion event
- [ ] Notifications persist in notification center until marked as read (do not disappear on page refresh)
- [ ] If notification delivery fails, system retries or logs error (no silent failure)
- [ ] Notifications comply with existing notification-service patterns and UI components

---

## 🎨 Design & UX

**Notification Display Format:**

**For Advisor inviting Family:**
```
🎉 [Family Member Name] ([Role: Family Council/Family Member]) has completed verification and joined [Family Name].
[Timestamp: 2 minutes ago]
[Button: View Family] [Mark as Read]
```

**For Family inviting Advisor:**
```
🎉 [Advisor Name] has completed verification and is now associated with your family as a Consultant Advisor.
[Timestamp: 5 minutes ago]
[Button: View Advisor] [Mark as Read]
```

**User Flow:**
1. User sends invitation (via US-INV-1)
2. Invited user receives email, registers, and verifies email (via US-INV-2, US-INV-3)
3. System triggers "verification complete" event
4. Notification service creates in-app notification for invitation sender
5. Sender sees notification icon badge update (e.g., red dot with count)
6. Sender opens notification center
7. Sender sees new notification with invited user details
8. Sender clicks notification to mark as read (optional: navigate to user profile)
9. Sender can now follow up with onboarding or collaboration

---

## 🔒 Business Rules

**Notification Triggering Rules:**
1. **Trigger condition**: Notification is sent ONLY after invited user completes email verification (clicks verification link in email and email is confirmed)
2. **Timing**: Notification is NOT sent after registration, only after verification complete
3. **Recipient**: Notification is sent ONLY to the user who sent the invitation (the `invited_by_user_id` from invitation record)
4. **Deduplication**: If the same invitation results in multiple verification attempts, only the FIRST successful verification triggers notification

**Authorization:**
- **Who receives notification:** Only the user who sent the invitation (`invited_by_user_id`)
- **Who can view notification:** Only the recipient (strict multi-tenancy applies)
- **Multi-tenancy rules:**
  - Family Council/Admin: Notifications filtered by `family_id` (can only see notifications for their family)
  - Consultant Advisor: Notifications use association-based access (can see notifications for any family they're associated with)

**Notification Content Rules:**
1. **Name display**: Use invited user's full name (first_name + last_name) from user profile
2. **Role display**: Display user's role clearly (e.g., "Family Council", "Consultant Advisor", "Family Member")
3. **Context display**: 
   - If advisor inviting family: show family name
   - If family inviting advisor: show "your family" (no need to repeat family name)
4. **Timestamp**: Display relative time (e.g., "2 minutes ago", "1 hour ago", "Yesterday")

**Edge Cases:**
- **Sender deleted before notification**: If invitation sender's account is deleted before invited user verifies, notification is NOT sent (no orphaned notifications)
- **Invited user registers but never verifies**: No notification sent (user is in "pending verification" state)
- **Multiple invitations from same sender**: Each verification triggers separate notification (assuming different invited users)
- **Invitation expires before verification**: If invitation token expires and user cannot verify, no notification sent

**Data Privacy:**
- Notification contains PII (invited user's name)
- Must comply with data isolation rules (family_id for families, association-based for advisors)
- Notification content should not expose sensitive information beyond name and role

---

## 🧪 Test Scenarios

**Happy Path:**

**Scenario 1: Advisor invites Family Council member**
1. Consultant advisor logs into Advisor Portal
2. Advisor sends invitation to new family council member via email (US-INV-1)
3. Family member receives email, clicks invitation link
4. Family member completes registration with invitation token (US-INV-2)
5. Family member receives verification email and clicks verification link (US-INV-3)
6. System marks email as verified
7. **Expected**: Advisor sees notification in Advisor Portal notification center: "[Name] (Family Council) has completed verification and joined [Family Name]"
8. Advisor clicks notification, it's marked as read
9. Advisor can navigate to view new family member

**Scenario 2: Family Council invites Consultant advisor**
1. Family Council member logs into Family Portal
2. Family Council sends invitation to new advisor via email (US-INV-1)
3. Advisor receives email, clicks invitation link
4. Advisor completes registration with invitation token (US-INV-2)
5. Advisor receives verification email and clicks verification link (US-INV-3)
6. System marks email as verified
7. **Expected**: Family Council member sees notification in Family Portal notification center: "[Advisor Name] has completed verification and is now associated with your family"
8. Family Council clicks notification, it's marked as read

**Negative Tests:**

**Scenario 3: Invited user registers but does NOT verify email**
1. User sends invitation
2. Invited user registers with invitation token
3. Invited user does NOT click verification link in email
4. **Expected**: Sender does NOT receive any notification (notification only triggers after verification)
5. Sender's notification center remains unchanged

**Scenario 4: Invitation expires before verification**
1. User sends invitation (valid for 7 days)
2. Invited user registers on day 6
3. Invited user attempts to verify email on day 8 (after expiration)
4. Verification fails (token expired)
5. **Expected**: Sender does NOT receive notification (verification was unsuccessful)

**Scenario 5: Sender account deleted before invited user verifies**
1. User sends invitation
2. Invited user registers
3. Sender's account is deleted (admin deletion or self-deletion)
4. Invited user verifies email
5. **Expected**: No notification is sent (recipient no longer exists), no error thrown

**Edge Cases:**

**Scenario 6: Multiple invitations sent by same sender**
1. Advisor sends invitation to Family Member A
2. Advisor sends invitation to Family Member B
3. Family Member A verifies email
4. Family Member B verifies email 1 minute later
5. **Expected**: Advisor receives TWO separate notifications, one for each family member, both visible in notification center

**Scenario 7: User attempts to verify email multiple times**
1. User sends invitation
2. Invited user registers and verifies email successfully
3. Invited user clicks verification link again (e.g., from same email)
4. **Expected**: Sender receives only ONE notification (from first verification), no duplicate notification on second click

**Scenario 8: Notification delivery during system maintenance**
1. User sends invitation
2. Invited user verifies email during system maintenance window
3. Notification service is temporarily unavailable
4. **Expected**: Notification is queued and delivered after service recovery, OR sender can manually check invitation status

**Test Cases Location:** `Knowledge-Base/product-management/test-cases/EPIC-105-advisor-family-invitations-test-cases.md`

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** FG-101 (US-INV-1) - Email invitation sending functionality must be implemented
- **Blocked by:** FG-102 (US-INV-2) - Registration via invitation link must be working
- **Blocked by:** FG-103 (US-INV-3) - Email verification flow must be completed
- **Depends on:** notification-service (port 8010) - Must support creating and delivering in-app notifications
- **Depends on:** Notification center UI components in Family Portal and Advisor Portal

**External Dependencies:**
- Notification service API endpoints for creating notifications
- User verification event system (event triggered when verification completes)
- Multi-tenancy data filtering in notification service

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Notification delivery time: < 2 seconds after verification complete event
- Notification center load time: < 500ms
- Max notifications displayed per page: 50 (pagination if more)
- Notification query performance: < 100ms

**Security:**
- Authorization required: Yes (only invitation sender can see notification)
- Data encryption: Not required for notification text (but PII should follow standard practices)
- PII handling: Yes (notification contains invited user's name and role - must respect data isolation)
- Multi-tenancy isolation: CRITICAL (Family Council/Admin: family_id filtering, Advisor: association-based filtering)

**Reliability:**
- Notification delivery success rate: > 99%
- If notification fails to deliver, log error and optionally retry
- Notifications must persist across user sessions (stored in database, not in-memory)

**Accessibility:**
- WCAG level: AA
- Keyboard navigation: Required (notification center accessible via Tab/Enter)
- Screen reader support: Required (notification content must be readable)
- Visual indicators: Unread notifications should have clear visual badge/indicator

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Mobile

---

## 📝 Notes

**Open Questions:**
- [x] Should notification include a "quick action" button to navigate to invited user's profile? **Answer:** Yes, optional "View Family" or "View Advisor" button
- [x] What happens if sender deletes their account before notification is sent? **Answer:** Notification is not sent, no error
- [x] Should there be a setting to disable these notifications (opt-out)? **Answer:** Not in this story, but could be future enhancement (general notification preferences)
- [x] How long should notifications persist in notification center? **Answer:** Until user marks as read or manually deletes (no auto-deletion)
- [x] Should email notification also be sent, or only in-app? **Answer:** Only in-app for this story (US-INV-8), email notification could be separate story if needed
- [x] What if invited user changes their name after verification but before sender sees notification? **Answer:** Notification uses name at time of verification (immutable after creation)

**Future Enhancements (Out of Scope):**
- Email notification option (in addition to in-app)
- Notification preferences/settings (opt-out, frequency control)
- Bulk actions on notifications (mark all as read, delete all)
- Notification history/archive view

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-20  
**Story ID:** FG-106 (US-INV-8)