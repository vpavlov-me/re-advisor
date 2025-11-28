---
doc_id: "FG-XXX"
title: "User Story: Email Notification for Profile Under Review"
type: "user-story"
category: "consultant-onboarding"
audience: "product-manager|business-analyst|developer|qa"
complexity: "intermediate"
created: "2025-11-26"
updated: "2025-11-26"
version: "1.0.0"
status: "draft"
tags: ["consultant", "onboarding", "email", "notification", "review"]
related: ["FG-EPIC-XXX"]
owner: ""
maintainer: ""
priority: "high"
epic_link: "FG-EPIC-XXX"
---

# User Story: Email Notification for Profile Under Review

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As a Consultant whose profile is under review, I want to receive email notification when my profile is taken for moderation, so that I understand the timeline and next steps  
**Epic Link:** FG-EPIC-XXX [Consultant Onboarding Flow - Progress Tracking & Orchestration]  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant whose profile reached 87.5% completion (Steps 1-7 completed),  
**I want to** receive email notification when my profile is automatically taken for review,  
**so that** I understand the review timeline (up to 3 business days) and what happens after approval (verified badge + marketplace visibility).

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point being solved:**
- Consultant completes all 7 registration steps but doesn't know what happens next
- Uncertainty about review timeline creates anxiety
- Unclear what "Under Review" status means and when profile will be live
- No confirmation that profile was successfully sent to moderators

**Business outcome expected:**
- Reduce support inquiries about "when will my profile be approved?"
- Set clear expectations about review process (3 business days)
- Increase consultant confidence in platform
- Reduce drop-off rate between profile completion and marketplace activation

**Strategic alignment:**
- Part of Consultant onboarding experience optimization
- Improves transparency and trust in platform processes
- Reduces friction in advisor acquisition funnel

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** Consultant completes Step 7 (progress reaches 87.5%),  
   **When** system automatically marks profile as `under_review` and progress becomes 100%,  
   **Then** email is sent to consultant's registered email address within 5 minutes.

2. **Given** Email is sent,  
   **When** Consultant opens email,  
   **Then** email contains:
   - Clear subject line indicating profile is under review
   - Message that profile has been taken for review by moderators
   - Timeline: "Review typically takes up to 3 business days"
   - Next steps: "Once approved, you will receive verified badge and appear in marketplace for families to discover"

3. **Given** Multiple consultants complete Step 7 simultaneously,  
   **When** System processes profile completions,  
   **Then** Each consultant receives individual email (no batch sending delays).

4. **Given** Consultant's email address is invalid or bounces,  
   **When** Email delivery fails,  
   **Then** System logs failure and shows in-app notification as backup.

**Additional Criteria:**
- [ ] Email is mobile-responsive and readable on all devices
- [ ] Email includes consultant's first name for personalization
- [ ] Email includes link to Advisor Portal dashboard
- [ ] Email follows platform's standard email template design
- [ ] Email is sent in consultant's preferred language (if multi-language support exists)
- [ ] Email delivery is tracked (sent, delivered, opened metrics)

---

## 🔑 Business Rules

**Email Trigger Rules:**
1. **Trigger condition:** `onboarding_progress` changes from 87.5% to 100% (Step 7 → Step 8 completion)
2. **Timing:** Email sent immediately (within 5 minutes of trigger)
3. **One-time only:** Email sent only once per profile (not on re-edits after review starts)
4. **No manual resend:** Consultant cannot request resend of this email

**Email Content Rules:**
1. **Subject line:** Must clearly indicate profile is under review
2. **Timeline:** Always state "up to 3 business days" (no specific dates)
3. **Next steps:** Explain verified badge and marketplace visibility
4. **CTA:** Include link back to Advisor Portal dashboard
5. **Professional tone:** Congratulatory but professional

**Authorization:**
- **System-generated:** No user permissions required (automated)
- **Privacy:** Email contains no sensitive profile data (name only)

**Edge Cases:**
- **Invalid email:** If email bounces, log error and show in-app notification
- **Email preferences opted out:** Still send (critical transactional email, not marketing)
- **Profile edited after review starts:** Do NOT resend email
- **Step 7 completed but Step 8 already completed:** Do NOT send email (edge case if progress manually adjusted)

---

## 🧪 Test Scenarios

**Happy Path:**
1. Consultant completes all required fields in Step 7 (Payments/KYC)
2. System detects `onboarding_progress = 87.5%`
3. System automatically:
   - Sets `profile_status = 'under_review'`
   - Marks Step 8 as completed (`onboarding_progress = 100%`)
   - Triggers email notification
4. Consultant receives email within 5 minutes
5. Email contains correct personalization (first name)
6. Email explains review timeline (up to 3 business days)
7. Email explains next steps (verified badge + marketplace)
8. Link to dashboard works correctly

**Negative Tests:**
1. **Invalid email address:**
   - Complete Step 7 with invalid/bounced email
   - Verify email delivery fails
   - Verify system logs error
   - Verify in-app notification shown as backup

2. **Network failure during email send:**
   - Simulate network interruption
   - Verify email queued for retry
   - Verify email eventually delivered

3. **Consultant already has `profile_status = 'under_review'`:**
   - Complete Step 7 again (re-edit scenario)
   - Verify NO duplicate email sent

**Edge Cases:**
1. **Rapid completion of multiple steps:**
   - Complete Steps 6 and 7 within seconds
   - Verify email sent only once (not duplicate)

2. **Manual progress adjustment by admin:**
   - Admin manually sets progress to 100%
   - Verify email logic checks if Steps 1-7 actually complete (not just progress number)

3. **Email preferences:**
   - Consultant opted out of marketing emails
   - Verify transactional email still sent (critical notification)

---

## ⚠️ Non-Functional Requirements

**Email Delivery:**
- Email delivery within 5 minutes of trigger
- 99% delivery success rate (exclude hard bounces)
- Email sending service uptime > 99.9%

**Security:**
- No sensitive profile data in email body (financial info, KYC details)
- Email links include secure tokens (no exposed IDs)
- HTTPS links only

**Performance:**
- Support sending to 1000+ consultants simultaneously without delays
- Email queue processing < 1 minute during peak times

**Localization:**
- Support multiple languages (if platform supports)
- Date/time formats respect consultant's locale

---

## 📝 Notes

**Assumptions:**
- Consultant has valid email address on file
- Email sending service (SendGrid/AWS SES) is configured and operational
- Advisor Portal has email templates infrastructure
- Consultant completed all required fields in Steps 1-7 (validation passed)

**Decisions Made:**
- ✅ Email is transactional (not marketing) - always send regardless of preferences
- ✅ Timeline stated as "up to 3 business days" (not exact date to avoid missed expectations)
- ✅ Email sent only once per profile completion (no resends on edits)
- ✅ In-app notification as backup if email fails

**Open Questions:**
- [ ] **Email subject line:** Exact wording to be confirmed with copywriting team
- [ ] **Email design:** Use existing platform email template or create new design?
- [ ] **Tracking:** Should we track email opens/clicks for analytics?
- [ ] **Follow-up:** If consultant doesn't open email in 24 hours, send reminder? **Decision from epic: No reminder, in-app notification sufficient**
- [ ] **Multi-language:** If consultant's profile language is not English, translate email? **Decision: Follow platform's i18n strategy if exists**

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-11-26  
**Story Focus:** Email notification for automatic profile review initiation