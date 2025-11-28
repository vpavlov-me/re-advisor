---
story_id: "FG-005"
epic: "EPIC-007"
title: "Stripe Webhook Processing & Status Updates"
priority: "critical"
sprint: "Week 3"
story_points: "8"
---

# User Story: Stripe Webhook Processing & Status Updates

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a system, I need to receive and process Stripe webhooks for account verification events, so that consultant's payment status updates automatically
**Epic Link:** EPIC-007 - Stripe Connect Payment Setup for Consultants
**Priority:** Critical
**Story Points:** 8
**Sprint:** Week 3

---

## 📖 User Story

**As a** Backend System,
**I want to** receive and process Stripe webhook events for account verification status changes,
**so that** consultant's payment account status updates automatically in real-time without manual intervention.

---

## 🎯 Business Context

**Why is this Story important?**

**Technical foundation:**
- Webhooks are Stripe's primary notification mechanism for async events
- Account verification happens asynchronously (1-3 business days)
- Real-time status updates keep consultants informed without polling

**Business outcome expected:**
- Consultant sees accurate payment account status automatically
- Reduce support burden ("when will I be verified?")
- Enable automated marketplace publication when verification completes
- Build trust through transparent verification process

**Strategic alignment:**
- Core infrastructure for payment processing reliability
- Enables automated consultant lifecycle management
- Foundation for future webhook integrations (payouts, disputes, etc.)

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** Stripe webhook endpoint is configured,
   **When** Stripe sends `account.updated` event,
   **Then** system receives webhook, validates signature, and processes payload.

2. **Given** webhook contains account verification status change,
   **When** status changes from 'pending' to 'active',
   **Then** system updates consultant profile status and triggers notification.

3. **Given** webhook contains account verification failure,
   **When** status changes to 'failed',
   **Then** system updates consultant profile with failure reason and notifies consultant.

4. **Given** webhook signature is invalid,
   **When** system validates signature,
   **Then** webhook is rejected with 401 Unauthorized error (security protection).

5. **Given** webhook processing succeeds,
   **When** system updates database,
   **Then** system returns 200 OK to Stripe within 5 seconds (Stripe requires fast response).

**Additional Criteria:**
- [ ] Webhook endpoint publicly accessible (not behind authentication)
- [ ] Webhook signature validation using Stripe webhook secret
- [ ] Idempotency: Duplicate webhooks don't cause duplicate processing
- [ ] Error logging: All webhook errors logged with event ID for debugging
- [ ] Retry handling: If webhook fails, logged for manual retry
- [ ] Fallback polling: If webhook not received within 24 hours, poll Stripe API
- [ ] Status transitions tracked with timestamps

---

## 🔐 Business Rules

**Validation Rules:**
1. **Webhook Authentication**:
   - Validate Stripe signature header (`Stripe-Signature`)
   - Use webhook signing secret from Stripe Dashboard
   - Reject webhooks with invalid or missing signatures

2. **Event Processing Rules**:
   - Process only `account.updated` events
   - Ignore other event types (log but don't process)
   - Extract account ID and verification status from payload
   - Match account ID to consultant profile

3. **Status Transition Rules**:
   ```
   Valid transitions:
   - not_started → initiated (account created)
   - initiated → pending (onboarding submitted)
   - pending → active (verification approved)
   - pending → failed (verification rejected)
   - active → pending (re-verification required)
   ```

4. **Idempotency Rules**:
   - Store webhook event ID in database
   - If event ID already processed, skip processing (return 200 OK)
   - Prevents duplicate updates from Stripe retries

**Authorization:**
- **No authentication required** (webhooks use signature validation)
- **Rate limiting:** None (Stripe controls sending rate)

**Edge Cases:**
- **Webhook arrives before account creation completes**: Log warning, skip processing
- **Unknown account ID**: Log error with event details, return 200 OK (don't block Stripe)
- **Database update fails**: Log error, return 500 (Stripe will retry)
- **Network timeout during processing**: Stripe retries after 72 hours
- **Webhook arrives out of order**: Process based on status, not order

---

## 🎨 Design & UX

**Business Flow:**
```
Consultant completes onboarding
↓
Payment processor begins verification (1-3 days)
↓
Payment processor sends status update to platform
↓
Platform updates consultant status automatically
↓
Dashboard displays new status
↓
Notification sent to consultant (email/push)
```

**Status Determination:**
- **Active (Verified)**: Bank account verified, tax ID confirmed, ready to receive payments
- **Failed**: Verification issues detected (invalid bank account, tax ID mismatch, etc.)
- **Pending**: Verification in progress
- **Initiated**: Onboarding started but not submitted

**What System Does:**
1. Receives verification status update from payment processor
2. Validates update is authentic (security check)
3. Updates consultant payment account status
4. Records status change with timestamp
5. Triggers notification to consultant
6. Logs event for audit trail
7. Confirms receipt to payment processor (within 5 seconds)

---

## 🧪 Test Scenarios

**Happy Path:**
1. Consultant completes Stripe onboarding (submits bank account, tax ID)
2. Stripe verifies information (1-3 business days)
3. Stripe sends `account.updated` webhook with status 'active'
4. Webhook endpoint receives event
5. Backend validates Stripe signature
6. Backend updates consultant profile: status = 'active'
7. Backend triggers email notification to consultant
8. Backend returns 200 OK to Stripe
9. Consultant sees "Payment Ready ✓" on dashboard

**Negative Tests:**
1. **Invalid Signature:**
   - Given: Webhook has invalid Stripe-Signature header
   - When: Backend validates signature
   - Then: Returns 401 Unauthorized, logs security warning

2. **Unknown Account ID:**
   - Given: Webhook contains account ID not in database
   - When: Backend searches for consultant profile
   - Then: Logs error with event details, returns 200 OK (don't block Stripe)

3. **Database Update Fails:**
   - Given: Database connection lost during update
   - When: Backend attempts to update profile
   - Then: Returns 500 Internal Server Error, Stripe will retry

4. **Duplicate Webhook:**
   - Given: Stripe resends same event ID (retry scenario)
   - When: Backend checks if event ID already processed
   - Then: Skips processing, returns 200 OK (idempotent)

**Edge Cases:**
1. **Webhook Arrives Out of Order:**
   - Given: 'active' webhook arrives before 'pending' webhook
   - When: Backend processes 'active' first
   - Then: Updates to 'active', ignores later 'pending' (use status priority)

2. **Verification Failed:**
   - Given: Stripe verification fails (invalid bank account)
   - When: Webhook contains status 'failed' and error details
   - Then: Update profile with failure reason, send notification with guidance

3. **Re-verification Required:**
   - Given: Active account requires re-verification (Stripe policy change)
   - When: Status changes from 'active' to 'pending'
   - Then: Update status, notify consultant to update information

4. **Webhook Timeout:**
   - Given: Processing takes >30 seconds
   - When: Stripe times out waiting for response
   - Then: Stripe will retry webhook after delay

---

## 📗 Dependencies

**Story Dependencies:**
- **Blocked by:**
  - FG-002 (Stripe Account Creation) - account must exist
  - FG-004 (Embedded Onboarding) - triggers webhook
- **Blocks:**
  - FG-006 (Dashboard Status Widget) - status updates display
  - FG-008 (Email Notifications) - triggered by status changes

**Technical Dependencies:**
- Payment processor webhook signing secret
- Webhook event tracking database
- Public endpoint accessible from payment processor servers
- Notification service for email/push notifications

**External Dependencies:**
- Payment processor (Stripe) webhook delivery
- Payment processor retries failed webhooks (up to 72 hours)

---

## ⚠️ Non-Functional Requirements

**Security:**
- **Signature validation REQUIRED:** All status updates must have valid signature from payment processor
- **No authentication:** Status updates don't use platform tokens
- **Rate limiting:** None (payment processor controls)
- **Logging:** Log all status update events (success and failure)
- **Secret management:** Webhook signing secret in secure environment variables

**Performance:**
- **Response time:** < 5 seconds (payment processor timeout)
- **Status processing:** Asynchronous (don't block response)
- **Database updates:** < 1 second
- **Duplicate check:** < 100ms

**Reliability:**
- **Success rate target:** >99%
- **Retry handling:** If processing fails, payment processor retries
- **Fallback polling:** Poll payment processor if status update not received within 24 hours
- **Monitoring:** Alert if processing failure rate >5%

**Browser Support:**
- N/A (backend webhook endpoint)

---

## 📝 Notes

**Fallback Polling Strategy:**
- Background job runs every hour
- Checks consultants with status='pending' for >24 hours
- Polls payment processor for current status
- Updates status if changed (webhook was missed)
- Logs as "recovered via polling" for monitoring

**Monitoring:**
- Track status update processing success rate (target: >99%)
- Alert if processing failures >5% over 5-minute window
- Alert if status update not received within 48 hours of onboarding submission
- Track average processing time (target: <2 seconds)
- Monitor polling job for missed status updates

**Payment Processor Retry Behavior:**
- Payment processor retries failed status updates automatically
- Exponential backoff: 1 hour, 6 hours, 24 hours, 72 hours
- After 72 hours, payment processor stops retrying
- Platform should poll as fallback after 24 hours

**Error Scenarios:**
1. Invalid signature → Reject update (security)
2. Unknown account ID → Log error, acknowledge receipt
3. Database timeout → Return error (payment processor will retry)
4. Duplicate event → Acknowledge receipt (idempotent)
5. Processing timeout (>30s) → Payment processor retries

**Open Questions:**
- [ ] Should system process status updates synchronously or queue for async processing?
  - **Recommendation:** Synchronous for simplicity, async if processing >3 seconds
- [ ] What if consultant's payment account is deleted externally?
  - **Recommendation:** Handle account deletion event, mark consultant as inactive
- [ ] Should system store full status update payload for debugging?
  - **Recommendation:** Yes, store for audit trail

---

**Story Version:** 1.0.0
**Last Updated:** 2025-10-23
**Status:** Ready for Development
