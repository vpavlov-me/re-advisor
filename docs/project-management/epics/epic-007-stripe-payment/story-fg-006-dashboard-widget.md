---
story_id: "FG-006"
epic: "EPIC-007"
title: "Dashboard Payment Status Widget"
priority: "high"
sprint: "Week 3"
story_points: "5"
---

# User Story: Dashboard Payment Status Widget

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Consultant, I want to see real-time payment account verification status on my dashboard, so that I know when I can accept paid bookings
**Epic Link:** EPIC-007 - Stripe Connect Payment Setup for Consultants
**Priority:** High
**Story Points:** 5
**Sprint:** Week 3

---

## 📖 User Story

**As a** Consultant,
**I want to** see real-time verification status of my payment account prominently displayed on dashboard,
**so that** I understand current setup progress and know when I can start accepting paid bookings.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point being solved:**
- Consultants unsure of verification status ("Am I ready to accept payments?")
- Lack of transparency causes support inquiries
- Unclear next steps when verification pending or failed

**Business outcome expected:**
- Reduce support tickets about payment status
- Increase consultant confidence in platform
- Clear call-to-action for incomplete setups
- Transparent verification process builds trust

**Strategic alignment:**
- Core marketplace enablement feature
- Improves consultant experience and satisfaction
- Reduces time-to-first-booking by clarifying readiness

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** consultant has not started payment setup,
   **When** consultant views dashboard,
   **Then** prominent "Setup Payment Account" CTA button displays.

2. **Given** consultant initiated setup but not completed,
   **When** consultant views dashboard,
   **Then** status shows "Setup In Progress" with "Resume Setup" button.

3. **Given** consultant completed onboarding and verification pending,
   **When** consultant views dashboard,
   **Then** status widget displays:
   - Timeline showing: Setup → Submitted → Verification Pending → Ready
   - Current status: "Verification Pending"
   - Estimated completion: "1-3 business days"
   - Submitted date and time

4. **Given** consultant's account is verified (status='active'),
   **When** consultant views dashboard,
   **Then** status shows "Payment Ready ✓" with green checkmark and "View Stripe Dashboard" link.

5. **Given** consultant's verification failed,
   **When** consultant views dashboard,
   **Then** status shows:
   - "Verification Failed" with red indicator
   - Error message from Stripe (e.g., "Bank account verification failed")
   - "Update Payment Info" button to retry

**Additional Criteria:**
- [ ] Widget updates automatically when status changes (polling or websocket)
- [ ] Mobile-responsive design
- [ ] Loading state while fetching status
- [ ] Error state if status fetch fails
- [ ] Link to help documentation for verification issues
- [ ] Analytics tracking: Widget views, CTA clicks

---

## 🔐 Business Rules

**Validation Rules:**
1. **Widget Display Logic**:
   - Show only to consultants (not family members or other roles)
   - Fetch real-time status from consultant profile
   - Update when status changes (webhook processing completes)

2. **Status Display Rules**:
   ```
   not_started:
     - Display: "Setup Payment Account" button
     - Description: "Connect your bank account to receive earnings"

   initiated:
     - Display: "Setup In Progress"
     - Description: "You started setup. Resume to complete."
     - Button: "Resume Setup"

   pending:
     - Display: "Verification Pending"
     - Timeline: Setup → Submitted → [Verification Pending] → Ready
     - Description: "Stripe is verifying your account (1-3 business days)"
     - Submitted: "Submitted on [date]"

   active:
     - Display: "Payment Ready ✓" (green checkmark)
     - Description: "You're ready to accept paid bookings"
     - Button: "View Stripe Dashboard" (link to Stripe Express Dashboard)

   failed:
     - Display: "Verification Failed" (red indicator)
     - Description: Stripe error message (e.g., "Bank account verification failed")
     - Button: "Update Payment Info"
     - Help Link: "Why did this happen?"
   ```

3. **Marketplace Readiness**:
   - If status ≠ 'active': Block marketplace publication
   - Display: "Complete payment setup to publish marketplace profile"

**Authorization:**
- **Who can view:** Authenticated consultants only (own profile)

**Edge Cases:**
- **Status unknown**: Display loading state or error message
- **Network error fetching status**: Show cached status with "Last updated" timestamp
- **Stripe account deleted externally**: Display error "Payment account no longer active. Contact support."

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Figma: [Link to Dashboard Status Widget design]
- Desktop and mobile views
- All 5 status states visualized

**Widget Placement:**
```
Consultant Dashboard
┌────────────────────────────────────┐
│ Welcome back, [Name]!              │
├────────────────────────────────────┤
│                                    │
│  [Payment Status Widget Here]      │
│  (Prominent, top section)          │
│                                    │
├────────────────────────────────────┤
│ Recent Activity                    │
│ ...                                │
└────────────────────────────────────┘
```

**Status Widget - Not Started:**
```
┌──────────────────────────────────────┐
│ 💳 Payment Account                   │
├──────────────────────────────────────┤
│ Connect your bank account to receive │
│ earnings from family bookings.       │
│                                      │
│ [Setup Payment Account] →            │
└──────────────────────────────────────┘
```

**Status Widget - Verification Pending:**
```
┌──────────────────────────────────────┐
│ 💳 Payment Account Status            │
├──────────────────────────────────────┤
│ Timeline:                            │
│ ● Setup → ● Submitted → 🔵 Pending → ○ Ready │
│                                      │
│ 🔵 Verification Pending              │
│ Stripe is verifying your account.    │
│ This typically takes 1-3 business    │
│ days.                                │
│                                      │
│ Submitted: October 23, 2025 at 2:30pm│
│                                      │
│ We'll notify you once complete.      │
└──────────────────────────────────────┘
```

**Status Widget - Active:**
```
┌──────────────────────────────────────┐
│ 💳 Payment Account Status            │
├──────────────────────────────────────┤
│ ✅ Payment Ready                      │
│                                      │
│ You're ready to accept paid bookings!│
│                                      │
│ [View Stripe Dashboard] →            │
└──────────────────────────────────────┘
```

**Status Widget - Failed:**
```
┌──────────────────────────────────────┐
│ 💳 Payment Account Status            │
├──────────────────────────────────────┤
│ ❌ Verification Failed                │
│                                      │
│ Reason: Bank account verification    │
│ failed. Please check your account    │
│ details and try again.               │
│                                      │
│ [Update Payment Info] [Why?]         │
└──────────────────────────────────────┘
```

**Key UX Principles:**
- **Visibility**: Payment status prominent on dashboard (top section)
- **Clarity**: Clear language about current status and next steps
- **Transparency**: Show timeline and estimated completion time
- **Action-oriented**: Always provide relevant CTA button
- **Trust-building**: Explain verification process to reduce anxiety

---

## 🧪 Test Scenarios

**Happy Path:**
1. New consultant logs in for first time
2. Dashboard displays "Setup Payment Account" button
3. Consultant clicks button, completes onboarding
4. Dashboard updates to "Verification Pending" with timeline
5. After 2 days, webhook updates status to 'active'
6. Dashboard shows "Payment Ready ✓" with Stripe Dashboard link

**Negative Tests:**
1. **Status Fetch Fails:**
   - Given: API error fetching consultant profile
   - When: Dashboard loads
   - Then: Shows error state "Unable to load payment status. Refresh to try again."

2. **Verification Failed:**
   - Given: Stripe verification fails (invalid bank account)
   - When: Webhook updates status to 'failed'
   - Then: Dashboard shows "Verification Failed" with error details and "Update Payment Info" button

**Edge Cases:**
1. **Status Changes While Viewing Dashboard:**
   - Given: Dashboard open showing "Verification Pending"
   - When: Webhook updates status to 'active'
   - Then: Dashboard updates automatically (polling or websocket) without refresh

2. **Mobile View:**
   - Given: Consultant on mobile device
   - When: Views dashboard
   - Then: Widget displays responsively with stacked layout

3. **Multiple Browser Tabs:**
   - Given: Consultant has dashboard open in 2 tabs
   - When: Completes setup in one tab
   - Then: Other tab updates status automatically

4. **Cached Status:**
   - Given: Network temporarily unavailable
   - When: Dashboard loads from cache
   - Then: Shows last known status with "Last updated" timestamp

---

## 📗 Dependencies

**Story Dependencies:**
- **Blocked by:**
  - FG-002 (Stripe Account Creation) - need status data
  - FG-005 (Webhook Processing) - status updates
- **Blocks:**
  - Marketplace publication features (payment setup prerequisite)

**Technical Dependencies:**
- Real-time status fetching API endpoint
- Consultant profile with Stripe status fields
- Optional: Websocket or polling mechanism for live updates
- Analytics library for event tracking

---

## ⚠️ Non-Functional Requirements

**Security:**
- Authorization required: Yes (consultant role only, own profile)
- Data encryption: N/A (status is not sensitive)
- PII handling: No PII displayed (only status)

**Performance:**
- Widget load time: < 500ms
- Status polling interval: Every 30 seconds (if polling used)
- Auto-update on status change: < 5 seconds delay
- Analytics events: Non-blocking, < 100ms

**Reliability:**
- Fallback to cached status if API unavailable
- Error state with retry option
- Last updated timestamp for transparency

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Mobile Safari (iOS): iOS 14+
- Chrome Mobile (Android): Android 10+

**Accessibility:**
- WCAG 2.1 Level AA compliance
- Status indicators have text labels (not color-only)
- Screen reader announces status changes
- Keyboard navigation for all buttons

---

## 📝 Notes

**Real-Time Updates Strategy:**

Two approaches for keeping status current:
1. **Polling**: Check for status changes every 30 seconds
2. **Real-time push**: Server sends updates when status changes

**Recommendation:** Start with polling (simpler), migrate to real-time push if needed.

**Timeline Visualization:**
```
Status Steps:
● Setup (Complete)
● Submitted (Complete)
🔵 Verification (Current - in progress)
○ Ready (Upcoming)
```

**Error Message Formatting:**
Map payment processor error codes to user-friendly messages:
- Bank account verification failed → "Bank account verification failed. Please check your account and routing numbers."
- Tax ID invalid → "Tax ID verification failed. Please verify your EIN or SSN."
- Identity verification failed → "Identity verification failed. Please upload a valid ID document."
- Unsupported country → "Your country is not currently supported for payouts."

**Analytics Events:**
```
Track widget interactions:
- Payment Status Widget Viewed (with status)
- Setup Payment Account Clicked
- Resume Setup Clicked
- Update Payment Info Clicked
- View Payment Processor Dashboard Clicked
```

**Caching Strategy:**
- Cache status locally for offline resilience
- Use cached status if <5 minutes old and service unavailable
- Display "Last updated" timestamp with cached status

**Open Questions:**
- [ ] Should widget show estimated verification completion date (not just "1-3 days")?
  - **Recommendation:** Yes, calculate based on submission time
- [ ] Should widget show payout account details (bank name, last 4 digits)?
  - **Recommendation:** No, keep widget simple, link to payment processor dashboard for details
- [ ] Should system notify consultant via push notification when verification completes?
  - **Recommendation:** Yes, covered in FG-008 (Email Notifications)

---

**Story Version:** 1.0.0
**Last Updated:** 2025-10-23
**Status:** Ready for Development
