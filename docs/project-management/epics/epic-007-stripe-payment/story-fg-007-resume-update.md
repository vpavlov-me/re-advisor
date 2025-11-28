---
story_id: "FG-007"
epic: "EPIC-007"
title: "Resume & Update Payment Info Flows"
priority: "high"
sprint: "Week 3-4"
story_points: "5"
---

# User Story: Resume & Update Payment Info Flows

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Consultant, I want to resume incomplete payment setup or update my payment information, so that I can complete setup without starting over or change bank details
**Epic Link:** EPIC-007 - Stripe Connect Payment Setup for Consultants
**Priority:** High
**Story Points:** 5
**Sprint:** Week 3-4

---

## 📖 User Story

**As a** Consultant,
**I want to** resume incomplete Stripe onboarding from where I left off OR update my payment information after initial setup,
**so that** I don't lose progress if interrupted and can change banks or correct errors without creating new account.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point being solved:**
- Consultants interrupted during onboarding lose progress (40% abandon rate)
- Bank details change (new account, errors) but no way to update
- Re-starting from scratch is frustrating and time-consuming

**Business outcome expected:**
- Reduce onboarding abandonment by 15% (25% → 10%)
- Enable consultants to maintain up-to-date payment information
- Reduce support burden ("I need to change my bank account")
- Improve consultant satisfaction with flexible setup process

**Strategic alignment:**
- Core marketplace enablement feature
- Improves consultant lifecycle management
- Reduces friction in payment setup and maintenance

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** consultant exited Stripe onboarding before completion (status='initiated'),
   **When** consultant clicks "Resume Setup" on dashboard,
   **Then** system generates fresh Account Session and opens embedded onboarding with previous data preserved.

2. **Given** consultant completed onboarding but verification pending (status='pending'),
   **When** consultant clicks "Update Payment Info",
   **Then** system allows consultant to modify bank account or tax information through Stripe component.

3. **Given** consultant's account is verified (status='active'),
   **When** consultant clicks "Update Payment Info",
   **Then** system allows consultant to change bank account, which triggers re-verification.

4. **Given** consultant's verification failed (status='failed'),
   **When** consultant clicks "Update Payment Info",
   **Then** system opens Stripe onboarding with error guidance from Stripe.

5. **Given** consultant resumes setup,
   **When** Stripe component loads,
   **Then** consultant sees previously entered information and can edit or continue.

**Additional Criteria:**
- [ ] Resume preserves all data entered in previous session (Stripe handles)
- [ ] Update flow clearly communicates re-verification may be required
- [ ] Update while pending doesn't duplicate verification requests
- [ ] Analytics tracking: Resume attempts, update attempts, completion rates
- [ ] Consultant can exit resume/update flow without losing progress

---

## 🔐 Business Rules

**Validation Rules:**
1. **Resume Requirements**:
   - Consultant must have Stripe Account ID (status='initiated')
   - Fresh Account Session must be generated (previous expired)
   - Stripe preserves data from previous session automatically

2. **Update Requirements**:
   - Consultant must have Stripe Account ID (any status except 'not_started')
   - Updates may trigger re-verification (Stripe determines)
   - Active payouts must complete before bank account changes take effect

3. **Status-Based Behavior**:
   ```
   initiated:
     - Action: "Resume Setup"
     - Behavior: Continue onboarding from last step
     - Data: Stripe preserves previous inputs

   pending:
     - Action: "Update Payment Info"
     - Behavior: Allow modifications, may reset verification
     - Warning: "Updating may delay verification"

   active:
     - Action: "Update Payment Info"
     - Behavior: Allow modifications, triggers re-verification
     - Warning: "Changes require re-verification (1-2 days)"

   failed:
     - Action: "Update Payment Info"
     - Behavior: Open onboarding with Stripe's error guidance
     - Display: Specific error message from Stripe
   ```

**Authorization:**
- **Who can resume/update:** Authenticated consultants only (own profile)

**Edge Cases:**
- **Multiple resume attempts**: Each generates fresh session, no data loss
- **Update during active payout**: Stripe queues change until payout completes
- **Update triggers additional verification**: Consultant may need to upload documents
- **Network disconnection during update**: Stripe component handles reconnection

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Figma: [Link to Resume/Update Flow design]
- Dashboard integration with "Resume" and "Update" CTAs

**Resume Flow:**
```
Dashboard (status='initiated')
┌────────────────────────────────────┐
│ 💳 Payment Account Status         │
│                                    │
│ 🔵 Setup In Progress               │
│ You started setup on Oct 22, 2025  │
│                                    │
│ [Resume Setup] →                   │
└────────────────────────────────────┘

↓ Click "Resume Setup"

Generate fresh Account Session
↓
Open Stripe embedded component in modal
↓
Consultant sees previous data pre-filled
↓
Consultant completes remaining steps
↓
Submit → Verification Pending
```

**Update Flow (Active Account):**
```
Dashboard (status='active')
┌────────────────────────────────────┐
│ 💳 Payment Account Status         │
│                                    │
│ ✅ Payment Ready                    │
│                                    │
│ [Update Payment Info]              │
│ [View Stripe Dashboard] →          │
└────────────────────────────────────┘

↓ Click "Update Payment Info"

Confirmation Dialog:
┌────────────────────────────────────┐
│ Update Payment Information?        │
│                                    │
│ Updating your bank account will    │
│ require re-verification (1-2 days).│
│                                    │
│ Any pending payouts will complete  │
│ before changes take effect.        │
│                                    │
│ [Cancel] [Continue to Update]      │
└────────────────────────────────────┘

↓ Click "Continue to Update"

Generate fresh Account Session
↓
Open Stripe embedded component in modal
↓
Consultant updates bank account or tax info
↓
Submit → Verification Pending (re-verification)
```

**Update Flow (Failed Verification):**
```
Dashboard (status='failed')
┌────────────────────────────────────┐
│ 💳 Payment Account Status         │
│                                    │
│ ❌ Verification Failed              │
│ Bank account verification failed.  │
│ Please check your details.         │
│                                    │
│ [Update Payment Info] [Why?]       │
└────────────────────────────────────┘

↓ Click "Update Payment Info"

Open Stripe embedded component
↓
Stripe displays error guidance
↓
Consultant corrects information
↓
Submit → Verification Pending (retry)
```

**Key UX Principles:**
- **Progress Preservation**: Consultant never loses entered data
- **Clear Warnings**: Communicate re-verification delays upfront
- **Flexible Exit**: Consultant can close and return anytime
- **Error Guidance**: Stripe provides specific instructions for failures

---

## 🧪 Test Scenarios

**Happy Path - Resume:**
1. Consultant starts onboarding, enters bank account
2. Consultant closes modal (exit without completion)
3. Dashboard shows "Setup In Progress" with "Resume Setup" button
4. Consultant clicks "Resume Setup"
5. Backend generates fresh Account Session
6. Stripe component opens with bank account pre-filled
7. Consultant completes tax ID and business info
8. Consultant submits
9. Dashboard updates to "Verification Pending"

**Happy Path - Update (Active Account):**
1. Consultant with verified account clicks "Update Payment Info"
2. Confirmation dialog explains re-verification required
3. Consultant confirms
4. Backend generates fresh Account Session
5. Stripe component opens with current data
6. Consultant updates bank account number
7. Consultant submits
8. Dashboard updates to "Verification Pending"
9. Webhook updates status to 'active' after re-verification

**Negative Tests:**
1. **Resume with Expired Session:**
   - Given: Previous Account Session expired (>1 hour)
   - When: Consultant clicks "Resume Setup"
   - Then: Backend generates fresh session, resume succeeds

2. **Update While Payout Pending:**
   - Given: Consultant has pending payout
   - When: Updates bank account
   - Then: Stripe queues change, displays "Change will take effect after payout completes"

3. **Network Error During Update:**
   - Given: Network disconnects while submitting update
   - When: Connection restored
   - Then: Stripe component reconnects, consultant can retry submission

**Edge Cases:**
1. **Multiple Resume Attempts:**
   - Given: Consultant clicks "Resume" multiple times
   - When: Each click generates fresh session
   - Then: All sessions valid, latest one used by component

2. **Update Immediately After Initial Verification:**
   - Given: Consultant just verified (status='active')
   - When: Immediately clicks "Update Payment Info"
   - Then: Warning about re-verification, consultant can proceed

3. **Resume After Long Delay (Weeks):**
   - Given: Consultant started setup 3 weeks ago
   - When: Clicks "Resume Setup"
   - Then: Stripe may require additional verification (Stripe determines)

---

## 📗 Dependencies

**Story Dependencies:**
- **Blocked by:**
  - FG-002 (Stripe Account Creation) - Account ID must exist
  - FG-003 (Session Generation) - Need session endpoint
  - FG-004 (Embedded Component) - Reuse component
  - FG-006 (Dashboard Widget) - Resume/Update CTAs display
- **Blocks:** None (enhancement of existing flow)

**Technical Dependencies:**
- Account Session generation endpoint (reuse from FG-003)
- Embedded onboarding component (reuse from FG-004)
- Dashboard status widget (reuse from FG-006)

---

## ⚠️ Non-Functional Requirements

**Security:**
- Authorization required: Yes (consultant role only, own profile)
- Data encryption: All data encrypted by Stripe component
- PII handling: Platform never sees updated bank details

**Performance:**
- Resume/Update initiation: < 2 seconds (session generation)
- Component load time: < 3 seconds
- Modal open animation: < 300ms

**Reliability:**
- Resume preserves all previously entered data (Stripe handles)
- Update confirmation prevents accidental changes
- Error recovery if session expires during update

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Mobile Safari (iOS): iOS 14+
- Chrome Mobile (Android): Android 10+

---

## 📝 Notes

**Confirmation Dialog:**
When consultant wants to update payment info, show confirmation explaining:
- Updating will require re-verification (1-2 days)
- Active consultants can continue accepting bookings during re-verification
- Pending consultants may have current verification cancelled
- Failed consultants should correct the information

**Payment Processor Behavior:**
- Component automatically handles resume/update mode
- Based on account state, payment processor shows appropriate interface
- Initiated: Resume onboarding (continue from last step)
- Pending/Active/Failed: Update mode (edit existing data)

**Analytics Events:**
```
Track lifecycle:
- Payment Setup Resumed (with days since started)
- Payment Info Update Started (with current status and reason)
- Payment Info Update Completed (with re-verification status)
- Payment Update Cancelled (with stage)
```

**Re-Verification Triggers:**
What requires re-verification:
- Change bank account number or routing number
- Change tax ID (EIN or SSN)
- Change business name or structure
- Change country (if payment processor allows)

What doesn't require re-verification:
- Change email address
- Change phone number
- Update business address (minor changes)

**Active Payout Handling:**
- Payment processor automatically queues changes until payout completes
- Consultant sees: "Changes will take effect after pending payout completes (1-2 days)"

**Monitoring:**
- Track resume completion rate (target: >60%)
- Track update completion rate (target: >80%)
- Alert if resume abandonment >50% (indicates UX issue)
- Monitor re-verification failure rate after updates

**Open Questions:**
- [ ] Should system limit number of update attempts within short period?
  - **Recommendation:** No, trust payment processor's rate limiting
- [ ] Should system show "last updated" timestamp for payment info?
  - **Recommendation:** Yes, helpful for consultants tracking changes
- [ ] Should update flow work differently for Premium vs Standard consultants?
  - **Recommendation:** No, same flow for both tiers

---

**Story Version:** 1.0.0
**Last Updated:** 2025-10-23
**Status:** Ready for Development
