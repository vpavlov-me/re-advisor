---
story_id: "STORY-FG-005-005"
title: "Automatic Payment Detection for Advisor Invitations"
type: "story"
epic_id: "EPIC-005"
created: "2025-10-15"
updated: "2025-10-20"
priority: "high"
status: "ready"
estimate: "12h"
story_points: 5
sprint: "Sprint 46"
assignee: ""
labels: ["family", "payment", "subscription", "advisor-seats", "monetization", "upsell"]
dependencies: ["STORY-FG-005-004"]
architecture_refs: ["CLAUDE.md", ".claude/contexts/turbo.md", ".claude/contexts/backend.md"]
---

# US-INV-5 (FG-104): Automatic Payment Detection for Advisor Invitations

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As a Family Council member or Admin, I want the system to automatically determine if payment is required and show payment prompt only when needed, so that I have a seamless invitation experience without manual checks  
**Epic Link:** FG-103 [Epic: Advisor-Family Mutual Connection via Email Invitations (Bidirectional)]  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Family Council Member or Admin,  
**I want to** have the system automatically check if I have available Advisor Seats when I open the "Invite Advisor" modal,  
**so that** I'm immediately informed if I need to purchase additional seats, and I can complete payment and invitation in one seamless flow without leaving the modal.

---

## 🎯 Business Context

### Why is this Story important?

**User Pain Point:**  
Currently, users must manually understand their subscription limits and whether they have available Advisor Seats before inviting external advisors. This creates friction in the invitation workflow and may lead to confusion, failed invitations, or accidental attempts to exceed purchased capacity.

**Business Outcome:**
- **Improved UX**: Immediate feedback on available capacity when modal opens, seamless payment-to-invitation flow
- **Increased conversion**: In-context upsell at the exact moment user needs additional capacity, without leaving invitation flow
- **Reduced support burden**: System handles subscription logic automatically, preventing user errors
- **Clear monetization path**: Natural upgrade prompts when families grow their advisor network
- **Reduced abandonment**: Users can purchase seat and continue invitation without modal interruption

**Strategic Alignment:**  
Supports the B2C subscription model by creating frictionless upsell opportunities while maintaining excellent user experience. Aligns with revenue growth through Advisor Seats add-ons.

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** Family Council member/Admin clicks "Invite Advisor" button to open modal,  
   **When** modal opens,  
   **Then** system immediately checks available Advisor Seats (purchased_seats vs active_advisors).

2. **Given** Family has available Advisor Seats (purchased_seats > active_advisors),  
   **When** modal opens,  
   **Then** invitation form is fully enabled with active "Send Invitation" button, and user can proceed normally.

3. **Given** Family has NO available Advisor Seats (purchased_seats = active_advisors),  
   **When** modal opens,  
   **Then** system displays warning message: "You've reached your limit of X Advisor Seats. Purchase an additional seat to continue."  
   **And** "Send Invitation" button is disabled (not clickable)  
   **And** "Purchase Advisor Seat" button is displayed next to disabled "Send Invitation" button.

4. **Given** "Purchase Advisor Seat" button is displayed,  
   **When** user clicks "Purchase Advisor Seat",  
   **Then** payment flow initiates within the modal (inline payment or payment overlay)  
   **And** invitation form remains visible with entered data preserved.

5. **Given** user completes payment successfully,  
   **When** payment confirmation received,  
   **Then** system updates purchased_seats count  
   **And** warning message disappears  
   **And** "Send Invitation" button becomes enabled  
   **And** user can immediately click "Send Invitation" to complete invitation without re-entering data.

6. **Given** user cancels/closes payment flow,  
   **When** payment cancelled,  
   **Then** modal returns to state with warning message, disabled "Send Invitation" button, and active "Purchase Advisor Seat" button  
   **And** invitation data remains preserved in form.

**Additional Criteria:**
- [ ] Warning message clearly shows: "Active Advisors: X / Purchased Seats: X"
- [ ] Payment button shows pricing: "Purchase Advisor Seat ($X/month)" based on selected advisor role
- [ ] After successful payment, no page reload required - UI updates dynamically
- [ ] System prevents race conditions if multiple admins open invitation modal simultaneously
- [ ] Available seats calculation includes only `is_active = true` advisors (pending invitations don't count until accepted)
- [ ] If user has multiple advisor role options (Personal Family Advisor vs External Consul), pricing updates dynamically based on selection

---

## 🎨 Design & UX

### User Flow:

#### Scenario 1: Available Seats Exist

1. User clicks "Invite Advisor" button
2. Modal opens immediately
3. System checks: purchased_seats (e.g., 3) > active_advisors (e.g., 2) → Available seats = 1
4. **Modal displays:**
   - Invitation form fully enabled
   - Advisor email input field (active)
   - Role selector: Personal Family Advisor / External Consul (active)
   - "Send Invitation" button (enabled, primary style)
   - Optional: Info text "Available Advisor Seats: 1 of 3"
5. User fills form and clicks "Send Invitation"
6. Invitation sent, success message, modal closes

#### Scenario 2: No Available Seats

1. User clicks "Invite Advisor" button
2. Modal opens immediately
3. System checks: purchased_seats (e.g., 2) = active_advisors (e.g., 2) → Available seats = 0
4. **Modal displays:**
   - **Warning banner at top:**
     - Icon: ⚠️
     - Message: "You've reached your limit of 2 Advisor Seats (2 active advisors). Purchase an additional seat to continue."
     - Style: Yellow/orange background, prominent but not blocking
   - Invitation form (visible but secondary):
     - Advisor email input field (active - user can pre-fill while deciding)
     - Role selector (active - affects pricing shown)
   - **Buttons at bottom:**
     - "Purchase Advisor Seat ($X/month)" - Primary button, enabled, positioned left or center
     - "Send Invitation" - Secondary button, **disabled** (grayed out, not clickable), positioned right
5. **If user clicks "Purchase Advisor Seat":**
   - Payment overlay/inline payment form appears within modal
   - Invitation form data preserved (email, role selection remain filled)
   - User completes payment
   - **On payment success:**
     - Warning banner disappears
     - "Purchase Advisor Seat" button disappears or changes to "Purchased ✓"
     - "Send Invitation" button becomes enabled (primary style)
     - User clicks "Send Invitation" → Invitation sent, success message, modal closes
   - **On payment cancel:**
     - Payment overlay closes
     - Modal returns to original state (warning banner, disabled "Send Invitation", enabled "Purchase" button)
     - Form data still preserved
6. **If user closes modal without purchasing:**
   - Modal closes, no invitation sent
   - User can reopen modal anytime (same state will appear)

#### Scenario 3: User Purchases Seat with Pre-filled Form

1. User opens modal (no available seats)
2. User fills email: "newadvisor@example.com"
3. User selects role: "External Consul"
4. Sees warning and disabled "Send Invitation"
5. Clicks "Purchase Advisor Seat ($Y/month for External Consul)"
6. Completes payment without leaving modal
7. Warning disappears, "Send Invitation" becomes enabled
8. Clicks "Send Invitation" immediately (email and role already filled)
9. Invitation sent successfully

---

## 🔒 Business Rules

### Subscription Logic:

1. **Available Advisor Seats** = Purchased Seats - Active Advisors
2. **Active Advisors** = COUNT of advisors in `family_advisor_associations` with `is_active = true`
3. **Pending invitations do NOT count** against available seats until accepted (invited advisor is not yet `is_active = true`)

### Modal Display Rules:

1. Seat availability check happens **immediately when modal opens** (not on "Send Invitation" click)
2. Check happens **every time modal opens** (in case another admin purchased seat or invited advisor in parallel)
3. If Available Seats = 0:
   - Show warning banner at top of modal
   - Disable "Send Invitation" button
   - Show "Purchase Advisor Seat" button with pricing
4. If Available Seats > 0:
   - No warning banner
   - "Send Invitation" button enabled
   - No "Purchase Advisor Seat" button visible

### Payment Button Pricing:

- Button text dynamically updates based on selected advisor role:
  - **Personal Family Advisor selected:** "Purchase Advisor Seat ($X/month)"
  - **External Consul selected:** "Purchase Advisor Seat ($Y/month)"
- If no role selected yet, show default pricing or prompt to select role first

### Authorization:

- **Who can perform this action:** Family Council Members (`is_family_council = true`) OR Admins (`is_admin = true`)
- **Who can view results:** Same user who initiated invitation

### Edge Cases:

- **Multiple admins open modal simultaneously:** Each sees current available seats at moment of opening. If Admin A purchases seat while Admin B has modal open, Admin B's "Send Invitation" doesn't auto-enable. Admin B must close and reopen modal to see updated state. (Alternative: implement real-time update via WebSocket - may be future enhancement)
- **Payment fails:** Payment overlay shows error message, modal returns to original state with warning, user can retry payment
- **User changes role selection after opening modal:** Pricing on "Purchase Advisor Seat" button updates dynamically
- **Subscription upgraded externally during modal open:** User must close and reopen modal to see updated available seats (or implement real-time sync)

---

## 🧪 Test Scenarios

### Happy Path 1: Available Seats Exist

1. Family has purchased_seats = 3, active_advisors = 1 (Available = 2)
2. Family Council member clicks "Invite Advisor" button
3. Modal opens
4. **Expected:** 
   - No warning banner displayed
   - Invitation form fully enabled
   - "Send Invitation" button enabled (primary style)
   - No "Purchase Advisor Seat" button visible
   - Optional info: "Available Advisor Seats: 2 of 3"
5. User enters email, selects role, clicks "Send Invitation"
6. **Verify:** Invitation sent successfully

### Happy Path 2: No Available Seats → Purchase Succeeds → Send Invitation

1. Family has purchased_seats = 2, active_advisors = 2 (Available = 0)
2. Family Council member clicks "Invite Advisor" button
3. Modal opens
4. **Expected:**
   - Warning banner: "You've reached your limit of 2 Advisor Seats (2 active advisors). Purchase an additional seat to continue."
   - "Send Invitation" button disabled (grayed out)
   - "Purchase Advisor Seat" button visible and enabled
5. User enters email: "newadvisor@example.com"
6. User selects role: "External Consul"
7. Button updates: "Purchase Advisor Seat ($Y/month)"
8. User clicks "Purchase Advisor Seat"
9. Payment flow initiates (inline or overlay)
10. User completes payment successfully
11. **Expected:**
    - Warning banner disappears
    - "Purchase Advisor Seat" button disappears or shows "Purchased ✓"
    - "Send Invitation" button becomes enabled
    - Email and role still filled in form
12. User clicks "Send Invitation"
13. **Verify:** 
    - Invitation sent successfully
    - purchased_seats updated to 3
    - Modal closes with success message

### Negative Test 1: No Available Seats → User Closes Modal Without Purchasing

1. Family has purchased_seats = 1, active_advisors = 1 (Available = 0)
2. User opens modal
3. Sees warning banner and disabled "Send Invitation" button
4. User enters email and role (form allows input)
5. User closes modal (X button or cancel)
6. **Expected:** Modal closes, no invitation sent
7. User reopens modal
8. **Verify:** Same warning state appears, form is empty (or optionally preserves last input if draft-save implemented)

### Negative Test 2: Payment Fails

1. Family has no available seats
2. User opens modal, sees warning
3. User enters email and role
4. User clicks "Purchase Advisor Seat"
5. Payment fails (e.g., card declined)
6. **Expected:** 
   - Payment error message displayed
   - Modal returns to warning state
   - "Send Invitation" remains disabled
   - Form data preserved (email and role still filled)
   - User can click "Purchase Advisor Seat" again to retry
7. **Verify:** 
   - Invitation NOT sent
   - purchased_seats unchanged

### Negative Test 3: User Cancels Payment

1. Family has no available seats
2. User opens modal, enters email, selects role
3. User clicks "Purchase Advisor Seat"
4. Payment overlay appears
5. User clicks "Cancel" in payment flow
6. **Expected:**
   - Payment overlay closes
   - Modal returns to warning state
   - Form data preserved
   - "Send Invitation" remains disabled
7. **Verify:** No payment processed, no invitation sent

### Edge Case 1: Pricing Updates Dynamically Based on Role Selection

1. Family has no available seats
2. User opens modal
3. User sees "Purchase Advisor Seat" button (no role selected yet)
4. Button shows default or prompts role selection
5. User selects "Personal Family Advisor"
6. **Expected:** Button updates to "Purchase Advisor Seat ($X/month)"
7. User changes selection to "External Consul"
8. **Expected:** Button updates to "Purchase Advisor Seat ($Y/month)"
9. **Verify:** Pricing dynamically reflects selected role

### Edge Case 2: Two Admins Open Modal Simultaneously

1. Family has purchased_seats = 2, active_advisors = 1 (Available = 1)
2. Admin A opens modal → sees enabled "Send Invitation" (Available = 1)
3. Admin B opens modal → sees enabled "Send Invitation" (Available = 1)
4. Admin A sends invitation → Available = 0
5. Admin B still sees enabled "Send Invitation" (stale state)
6. Admin B tries to send invitation → **Expected:** Backend validation fails, error message shown
7. **Verify:** 
   - Only one invitation succeeds
   - Admin B receives error: "No available seats. Please refresh."
   - Admin B must close and reopen modal to see updated state
8. **Alternative (future enhancement):** Real-time update via WebSocket auto-disables Admin B's button

### Edge Case 3: Pending Invitation Doesn't Block New Invitations

1. Family has purchased_seats = 2, active_advisors = 1, pending_invitations = 1
2. User opens modal
3. **Expected:** 
   - Available seats = 1 (pending invitations don't count)
   - "Send Invitation" button enabled
4. **Verify:** User can send another invitation

---

## 🔗 Dependencies

### Story Dependencies:

- **Blocked by:** 
  - FG-101 (US-INV-1) - Database schema must include subscription tracking (purchased_advisor_seats field)
  - FG-XXX - Payment gateway integration must be functional
  - FG-XXX - "Invite Advisor" modal UI must be implemented (modal shell exists)
- **Blocks:** 
  - FG-105 (US-INV-6) - Notification about successful seat purchase and invitation sent

### External Dependencies:

- Payment processing system (Stripe/similar) must be integrated
- Subscription management service must expose API to check/update purchased_advisor_seats

---

## ⚠️ Non-Functional Requirements

### Performance:

- Seat availability check when modal opens: < 200ms (simple COUNT query)
- UI state update after payment: < 500ms (button enable, warning removal)
- Modal should not freeze during payment processing

### Security:

- Authorization check: Only `is_family_council = true` OR `is_admin = true` can open invitation modal
- Payment session must be secure and comply with PCI DSS standards
- Seat count queries must be family_id-isolated (cannot see other families' data)

### Accessibility:

- Disabled "Send Invitation" button must have clear visual indication (grayed out) and proper ARIA attributes
- Screen reader announces warning message when modal opens with no available seats
- Keyboard navigation: Tab order flows naturally (email → role → Purchase/Send buttons)
- Focus management: After payment completes, focus returns to "Send Invitation" button

### Browser Support:

- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Android

---

## 📝 Notes

### Open Questions:

- [x] **Q:** Does purchased_advisor_seats field exist in families table?
  - **A:** Yes, assumed to be part of subscription schema (see FG-101)

- [x] **Q:** Do pending invitations (not yet accepted) count against available seats?
  - **A:** No, only `is_active = true` advisors count. Pending invitations don't consume seats until accepted.

- [x] **Q:** Should payment happen inline within modal or open new window/tab?
  - **A:** Inline payment within modal preferred for seamless UX. Payment overlay appears on top of invitation form without closing modal.

- [x] **Q:** What happens if payment completes but invitation send fails (e.g., email service down)?
  - **A:** Payment succeeds (seat purchased), but invitation stored as "pending send" and retried. User notified of partial success. (May need separate error handling story)

- [x] **Q:** Should form data (email, role) be preserved during payment flow?
  - **A:** Yes, CRITICAL for good UX. User should not need to re-enter data after payment. Form remains visible (or hidden but data preserved in state).

- [x] **Q:** If multiple role options have different pricing, when is pricing displayed?
  - **A:** Pricing updates dynamically on "Purchase Advisor Seat" button based on currently selected role. If no role selected, button shows default or prompts role selection first.

- [x] **Q:** Should modal auto-refresh available seats if another admin purchases seat while modal is open?
  - **A:** Not in this story scope. User must close and reopen modal to see updated state. Real-time sync via WebSocket can be future enhancement.

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-20