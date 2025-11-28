---
story_id: "STORY-FG-005-002"
title: "Advisor Subscription Validation Before Invitation"
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
labels: ["advisor", "subscription", "validation", "monetization", "stripe", "limits"]
dependencies: ["STORY-FG-005-001"]
architecture_refs: ["CLAUDE.md", ".claude/contexts/turbo.md", ".claude/contexts/backend.md"]
---

# User Story: US-INV-2 - Advisor Subscription Validation Before Invitation

> **Jira Issue:** FG-99
> **Epic:** FG-98 - Advisor-Family Mutual Connection via Email Invitations

---

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Consultant advisor, I want to see subscription validation before sending invitation, so that I know if I need to upgrade my plan to add another family
**Epic Link:** FG-98 [Advisor-Family Mutual Connection]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant advisor (External Advisor persona),
**I want to** see my subscription status and family seat availability before sending an invitation,
**so that** I know if I need to upgrade my plan or purchase additional family seats to add another family.

---

## 🎯 Business Context

**Why is this Story important?**

**User Pain Point:**
- Advisors waste time filling out invitation forms only to discover they've reached their plan limit
- Uncertainty about subscription status creates friction in the invitation workflow
- Standard Tier advisors may attempt to send invitations without realizing they need Premium Tier

**Business Value:**
- **Monetization driver:** Clear upgrade prompts drive Premium Tier conversions and +Family Seat purchases
- **User experience:** Proactive validation prevents frustration and abandoned workflows
- **Transparency:** Advisors understand their subscription limits and usage in real-time
- **Conversion optimization:** Timely upgrade prompts at point of need increase conversion rates

**Strategic Alignment:**
- Supports B2B2C revenue model through subscription upgrades and seat expansion
- Enables scalable advisor portfolio growth with clear monetization path
- Reduces support tickets related to "why can't I send invitations"

---

## ✅ Acceptance Criteria

### AC1: Premium Tier with Available Seats
1. **Given** I am a Consultant advisor with active Premium Tier subscription,
   **And** my current active family associations are below my max_families limit (e.g., 0 families, limit is 1 base + any purchased seats),
   **When** I navigate to "Send Invitation" page,
   **Then** I see a subscription status card showing:
   - "Family Portfolio: [current]/[max] families" (e.g., "0/1 families" or "2/4 families" if 3 seats purchased)
   - Green checkmark indicator
   - "Send Invitation" button is enabled

### AC2: Premium Tier at Family Limit
2. **Given** I am a Consultant advisor with active Premium Tier subscription,
   **And** my current active family associations equals my max_families limit (e.g., 1/1 with base access only, or 4/4 if 3 additional seats purchased),
   **When** I navigate to "Send Invitation" page,
   **Then** I see a subscription status card showing:
   - "Family Portfolio: [max]/[max] families - Limit Reached" (e.g., "1/1" or "4/4")
   - Warning/alert indicator (yellow/orange)
   - Message: "You've reached your plan limit. Purchase additional family seats to add more families."
   - CTA button: "Add Family Seats" (links to subscription management)
   - "Send Invitation" button is disabled

### AC3: Standard Tier (Cannot Send Invitations)
3. **Given** I am a Consultant advisor with Standard Tier subscription,
   **When** I navigate to "Send Invitation" page,
   **Then** I see a subscription status card showing:
   - "Upgrade Required"
   - Information icon
   - Message: "Premium Tier required to send family invitations. Upgrade to create portals and manage families."
   - CTA button: "Upgrade to Premium" (links to subscription management/pricing page)
   - "Send Invitation" button is disabled or hidden

### AC4: Trial Period Active
4. **Given** I am a Consultant advisor with Premium Tier trial subscription,
   **And** my trial period has not expired (trial_ends_at is in the future),
   **And** my current families are below trial limit (default: 1 family included in trial),
   **When** I navigate to "Send Invitation" page,
   **Then** I see a subscription status card showing:
   - "Family Portfolio: [current]/[trial_limit] families (Trial)" (e.g., "0/1 families (Trial)")
   - Trial indicator with expiration date: "Trial ends on [date]"
   - "Send Invitation" button is enabled

### AC5: Expired/Cancelled Subscription
5. **Given** I am a Consultant advisor with expired or cancelled Premium subscription,
   **When** I navigate to "Send Invitation" page,
   **Then** I see a subscription status card showing:
   - "Subscription Expired"
   - Error/alert indicator (red)
   - Message: "Your subscription has expired. Renew to continue managing families and sending invitations."
   - CTA button: "Renew Subscription" (links to subscription management)
   - "Send Invitation" button is disabled

### AC6: Real-Time Subscription Check
6. **Given** I am on the "Send Invitation" page,
   **When** the page loads,
   **Then** the system performs a real-time check of:
   - My subscription tier (Standard vs. Premium)
   - My subscription status (active, trial, expired, cancelled)
   - My current active family associations count
   - My max_families limit (Base Access + purchased +Family Seats)
   **And** displays the appropriate subscription status card based on the results

### AC7: Subscription Status Persistence
7. **Given** I have been validated and see my subscription status,
   **When** I remain on the page without refreshing,
   **Then** the subscription status does not change unless I trigger a manual refresh
   **And** if I navigate away and return, subscription status is re-validated

---

## 🎨 Design & UX

**User Flow:**
1. Advisor navigates to Advisor Portal → "Families" section
2. Advisor clicks "Send Invitation" button
3. **NEW:** System checks advisor subscription in real-time
4. **NEW:** System displays subscription status card at top of invitation form
5. **Scenario A (Can send):** Subscription valid + seats available → form enabled, advisor proceeds to US-INV-1
6. **Scenario B (Cannot send - limit reached):** Card shows limit reached + "Add Family Seats" CTA
7. **Scenario C (Cannot send - wrong tier):** Card shows "Upgrade to Premium" CTA
8. **Scenario D (Cannot send - expired):** Card shows "Renew Subscription" CTA

**UI Components:**
- **Subscription Status Card** (new component):
  - Visual status indicator (icon/color-coded)
  - Current usage vs. limit (e.g., "3/7 families")
  - Clear message explaining status
  - Actionable CTA button when upgrade/purchase needed
  - Positioned prominently at top of invitation form

**Visual States:**
- ✅ **Success state (green):** Can send invitations
- ⚠️ **Warning state (yellow/orange):** Limit reached, needs seats
- ℹ️ **Info state (blue):** Trial active, standard tier
- ❌ **Error state (red):** Expired/cancelled subscription

---

## 🔒 Business Rules

### Validation Rules:

**BR1: Tier Requirement**
- Only Premium Tier advisors can send family invitations
- Standard Tier advisors see upgrade prompt
- Rule applies regardless of subscription status

**BR2: Family Seat Limits**
- Premium Tier includes 1 family by default (Base Access)
- Additional families require purchasing +Family Seats ($X per seat)
- `max_families` = 1 (base) + number of purchased +Family Seats
- `current_families` = count of active family associations (`is_active = true`)
- Can send invitation if: `current_families < max_families`
- Cannot send if: `current_families >= max_families`
- Example calculations:
  - Base Premium (no seats purchased): max_families = 1
  - Premium + 2 seats purchased: max_families = 3
  - Premium + 9 seats purchased: max_families = 10

**BR3: Subscription Status Check**
- Valid statuses for sending invitations: `active`, `trial` (within trial period)
- Invalid statuses: `expired`, `cancelled`, `suspended`
- Trial period checked against `trial_ends_at` timestamp

**BR4: Active Associations Count**
- Only count family associations where `is_active = true`
- Pending invitations (sent but not accepted) do NOT count toward limit
- Rejected/expired invitations do NOT count toward limit
- Cancelled associations do NOT count toward limit

**BR5: Real-Time Validation**
- Subscription check must occur on page load (not cached)
- If subscription changes mid-session (e.g., admin upgrades plan), validation reflects change on next page load
- No stale subscription data shown to advisor

### Authorization:

**Who can perform this action:**
- Authenticated advisors with Consultant subscription (both Standard and Premium)
- Validation displayed to all advisor types, but only Premium with available seats can proceed

**Who can view results:**
- Only the advisor themselves (subscription details are private)
- Admin portal users with advisor management permissions (for support purposes)

### Edge Cases:

**Edge Case 1: Subscription upgraded mid-flow**
- **Scenario:** Advisor sees "limit reached", opens new tab to purchase seats, returns to invitation page
- **Expected behavior:** Subscription status card updates on page refresh, now shows available seats, form enabled

**Edge Case 2: Trial expires during invitation flow**
- **Scenario:** Advisor starts invitation during trial, trial expires before submission
- **Expected behavior:** Validation re-checked on form submission, blocks submission if expired, shows renewal prompt

**Edge Case 3: Zero purchased seats (base Premium only)**
- **Scenario:** Advisor has Premium Tier but has not purchased any additional seats (max_families = 1)
- **Expected behavior:** After connecting first family (1/1), sees "limit reached" and prompt to "Add Family Seats"

**Edge Case 4: Unlimited families (Enterprise-equivalent)**
- **Scenario:** Advisor has custom plan with `max_families = NULL` or very high limit (999)
- **Expected behavior:** Show "Unlimited families" or omit limit display, always enable invitation form

**Edge Case 5: Concurrent invitation sends at limit**
- **Scenario:** Advisor at limit (1/1 base), sends invitation in Tab A, sends another in Tab B simultaneously
- **Expected behavior:** Backend validation prevents exceeding limit, second invitation fails with "limit reached" error

---

## 🧪 Test Scenarios

### Happy Path:

**Test 1: Premium advisor with available seats**
1. Login as advisor with Premium subscription (1 base family + 2 purchased seats = 3 max)
2. Verify current active associations = 1
3. Navigate to "Send Invitation" page
4. Verify subscription status card shows: "Family Portfolio: 1/3 families" with green checkmark
5. Verify "Send Invitation" button is enabled
6. Expected: Can proceed to fill out invitation form

### Negative Tests:

**Test 2: Standard Tier advisor attempts to send invitation**
1. Login as advisor with Standard Tier subscription
2. Navigate to "Send Invitation" page
3. Verify subscription status card shows: "Upgrade Required" message
4. Verify "Upgrade to Premium" CTA button is displayed
5. Verify "Send Invitation" button is disabled/hidden
6. Click "Upgrade to Premium" → verify redirects to subscription management/pricing page

**Test 3: Premium advisor at family limit**
1. Login as advisor with Premium subscription (base only, max_families = 1)
2. Verify current active associations = 1
3. Navigate to "Send Invitation" page
4. Verify subscription status card shows: "Family Portfolio: 1/1 families - Limit Reached"
5. Verify "Add Family Seats" CTA button is displayed
6. Verify "Send Invitation" button is disabled
7. Click "Add Family Seats" → verify redirects to subscription management

**Test 4: Expired subscription**
1. Login as advisor with expired Premium subscription
2. Navigate to "Send Invitation" page
3. Verify subscription status card shows: "Subscription Expired" message
4. Verify "Renew Subscription" CTA button is displayed
5. Verify "Send Invitation" button is disabled
6. Click "Renew Subscription" → verify redirects to subscription management

### Edge Cases:

**Test 5: Trial period active**
1. Login as advisor with Premium trial subscription
2. Verify trial_ends_at is in the future
3. Verify current families (0) < trial limit (1)
4. Navigate to "Send Invitation" page
5. Verify subscription status card shows trial indicator with expiration date
6. Verify "Send Invitation" button is enabled
7. Expected: Can send invitations during trial

**Test 6: Trial period expires mid-session**
1. Login as advisor with Premium trial (expires in 5 minutes)
2. Navigate to "Send Invitation" page
3. Verify status card shows trial active
4. Wait for trial to expire
5. Attempt to submit invitation form
6. Verify backend validation rejects submission
7. Verify error message: "Trial expired. Upgrade to continue."

**Test 7: Subscription upgraded in another tab**
1. Login as advisor with Standard Tier subscription
2. Open "Send Invitation" page (sees "Upgrade Required")
3. In new tab, navigate to subscription management and upgrade to Premium
4. Return to "Send Invitation" page and refresh
5. Verify subscription status card now shows Premium with available seats
6. Verify "Send Invitation" button is now enabled

**Test 8: Pending invitations do not count toward limit**
1. Login as advisor with Premium subscription (base only, max_families = 1)
2. Verify current active associations = 0
3. Verify 2 pending invitations (sent but not accepted)
4. Navigate to "Send Invitation" page
5. Verify subscription status card shows: "Family Portfolio: 0/1 families"
6. Verify pending invitations are NOT included in count
7. Verify "Send Invitation" button is enabled

---

## 🔗 Dependencies

### Story Dependencies:

**Blocked by:**
- **Subscription Management System** - Must exist with advisor subscription tiers, family seat tracking, and status management
  - Required data: `subscription.tier`, `subscription.status`, `subscription.max_families`, `subscription.trial_ends_at`
- **Family Association Tracking** - System must accurately count active family associations per advisor
  - Required: `family_advisor_associations` table with `is_active` status

**Blocks:**
- **FG-100 (US-INV-1):** Send invitation from advisor to family - cannot send if subscription invalid or limit reached
- **FG-XXX:** Advisor family portfolio management - depends on accurate subscription validation

**Related:**
- **Subscription Management Epic** - Source of subscription data and upgrade/purchase flows
- **Advisor Portal Dashboard** - May also display subscription status summary
- **FG-101 (US-INV-3):** Family-initiated invitation - does NOT have subscription validation (families have no limits)

---

## ⚠️ Non-Functional Requirements (Briefly)

### Performance:
- Subscription validation API call: < 300ms response time
- Page load with subscription check: < 1 second total
- Real-time validation on every page load (no stale cached data > 5 minutes)

### Security:
- Authorization required: Yes - must be authenticated advisor
- Subscription data encryption: Sensitive pricing/payment data must be encrypted in transit and at rest
- PII handling: No - subscription limits and tier are not PII
- Prevent subscription tampering: Backend validation cannot be bypassed by frontend manipulation

### Accessibility:
- WCAG level: AA
- Keyboard navigation: Required for subscription status card and CTA buttons
- Screen reader support: Required - clear announcement of subscription status and available actions
- Color-coded indicators must have text/icon alternatives (not color-only)

### Browser Support:
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Mobile Safari (iOS): Latest 2 versions

---

## 📝 Notes

### Open Questions:
- [x] **Q1:** What is the default family limit for Premium Base Access?
  - **A:** 1 family included by default in Premium Tier (Base Access)
  
- [x] **Q2:** What is the pricing for +Family Seat add-ons ($X_seat each)?
  - **A:** To be defined by Product/Business - typical range $10-$50 per additional family seat
  
- [ ] **Q3:** Should we show a "soft warning" when advisor is close to limit (e.g., at base limit before purchasing seats)?
  - **A:** Nice-to-have for future iteration - could prompt proactive seat purchase
  
- [x] **Q4:** Where exactly does the "Add Family Seats" / "Upgrade to Premium" CTA link to?
  - **A:** Links to Subscription Management page (to be built) or external billing portal (Stripe, etc.)

- [x] **Q5:** Should subscription status be cached for performance, or always real-time?
  - **A:** Real-time on page load to ensure accuracy, but can cache within single page session (no cross-page cache)

### Assumptions:
- Subscription Management system provides API endpoint to fetch advisor subscription details
- Premium Tier includes 1 family by default (Base Access), additional families require +Family Seat purchases
- `family_advisor_associations` table accurately tracks active associations with `is_active` flag
- Advisor Portal has routing to subscription management or external billing portal
- Trial period advisors have same family limit (1 family) as base Premium subscribers during trial

### Future Enhancements (Out of Scope):
- Proactive "soft warning" when approaching limit (e.g., at 80% capacity)
- In-page subscription upgrade flow (without leaving invitation page)
- Subscription usage analytics dashboard for advisors
- Bulk seat purchase discounts for large portfolio expansion

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-20
**Story Created:** 2025-10-20
**Story Status:** Draft - Ready for Grooming