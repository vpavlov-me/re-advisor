---
story_id: "FG-001"
epic: "EPIC-007"
title: "Pre-Setup Guidance Screen for Stripe Onboarding"
priority: "high"
sprint: "Week 1"
story_points: "5"
---

# User Story: Pre-Setup Guidance Screen for Stripe Onboarding

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Consultant, I want to see clear explanation of what Stripe will ask for before starting, so that I can gather necessary documents in advance
**Epic Link:** EPIC-007 - Stripe Connect Payment Setup for Consultants
**Priority:** High
**Story Points:** 5
**Sprint:** Week 1

---

## 📖 User Story

**As a** Consultant (independent marketplace professional),
**I want to** see clear explanation of what Stripe will ask for before starting payment setup,
**so that** I can gather necessary documents and information in advance, reducing abandonment and setup time.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point being solved:**
- Consultants start Stripe onboarding unprepared and abandon (40%+ abandonment rate industry standard)
- Uncertainty about time commitment causes anxiety
- Lack of transparency about why sensitive info is needed creates trust issues
- Consultants waste time searching for documents mid-process

**Business outcome expected:**
- Reduce Stripe onboarding abandonment from 40% to <25%
- Increase completed payment setups within 24 hours of initiation
- Reduce support tickets about "what does Stripe need?"
- Build trust through transparency about Stripe's role and security

**Strategic alignment:**
- Prerequisite for marketplace monetization
- Improves consultant onboarding completion rate
- Reduces friction in payment setup flow

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** consultant is on dashboard and payment account is not setup,
   **When** consultant clicks "Setup Payment Account" button,
   **Then** pre-setup guidance screen displays before Stripe onboarding begins.

2. **Given** consultant is viewing pre-setup guidance screen,
   **When** screen loads,
   **Then** consultant sees:
   - List of information Stripe will request (bank account, tax ID, business info)
   - Estimated time to complete (15-20 minutes)
   - Estimated verification time (1-3 business days)
   - Security explanation ("Your bank details stored by Stripe, not us")
   - Two action buttons: "Start Stripe Setup" and "Learn More"

3. **Given** consultant clicks "Learn More" link,
   **When** link is clicked,
   **Then** opens Stripe's official documentation about Connect onboarding in new tab.

4. **Given** consultant clicks "Start Stripe Setup" button,
   **When** button is clicked,
   **Then** system initiates Stripe account creation and transitions to embedded onboarding component.

5. **Given** consultant has already completed payment setup,
   **When** consultant views dashboard,
   **Then** "Setup Payment Account" button is replaced with "Payment Ready ✓" status indicator.

**Additional Criteria:**
- [ ] Pre-setup guidance screen displays only for consultants (not families or other roles)
- [ ] Screen is mobile-responsive (works on tablets and phones)
- [ ] "Learn More" link points to Stripe's official documentation
- [ ] Security message emphasizes Stripe's credentials (PCI-DSS, SOC 2)
- [ ] Consultant can close guidance screen and return later (not forced flow)
- [ ] Analytics tracking: Record views, "Start Setup" clicks, "Learn More" clicks

---

## 🔐 Business Rules

**Validation Rules:**
1. **Display Logic**: Show guidance screen only if:
   - User role = Consultant (Standard or Premium tier)
   - Stripe Account ID does NOT exist in consultant profile
   - User has active subscription
   - Profile verification (Stage 7) is complete

2. **Content Display Rules**:
   - Information list must match what Stripe actually requests
   - Time estimates must be realistic (15-20 min for onboarding, 1-3 days verification)
   - Security explanation must be accurate (we never store bank details)

**Authorization:**
- **Who can view this screen:** Consultants only (both Standard and Premium)
- **Who CANNOT view:** Family Members, Family Council, External Consul, Personal Family Advisor
- **Prerequisites:** Active consultant account, active subscription, completed profile verification

**Edge Cases:**
- **If consultant in unsupported country**: Display message "Stripe Connect not available in your country yet. Join waitlist."
- **If profile verification incomplete**: Display message "Complete profile verification before setting up payment account."
- **If subscription expired**: Display message "Renew subscription to access payment setup."
- **If consultant already has Stripe Account ID**: Skip guidance, show status instead

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Figma: [Link to Pre-Setup Guidance Screen design]
- Dashboard Entry Point: Payment setup CTA button

**User Flow:**
1. Consultant logs into Advisor Portal
2. Dashboard displays "Setup Payment Account" prominent CTA (if not setup)
3. Consultant clicks "Setup Payment Account"
4. **Pre-setup guidance screen appears** (modal or full-page view)
5. Consultant reviews what Stripe will ask for
6. Consultant clicks "Start Stripe Setup" OR "Learn More" OR closes modal
7. If "Start Stripe Setup": Transitions to Stripe account creation (Story 2)

---

## 🧪 Test Scenarios

**Happy Path:**
1. Consultant with verified profile and active subscription logs in
2. Dashboard shows "Setup Payment Account" button
3. Consultant clicks button
4. Pre-setup guidance screen displays with all required content
5. Consultant reviews information
6. Consultant clicks "Start Stripe Setup"
7. System initiates Stripe account creation (Story 2)

**Negative Tests:**
1. **Unauthorized Role Access:**
   - Given: Family Member tries to access payment setup
   - When: Attempts to navigate to payment setup URL
   - Then: Blocked with error "Payment setup available for consultants only"

2. **Profile Verification Incomplete:**
   - Given: Consultant profile verification status = "pending"
   - When: Clicks "Setup Payment Account"
   - Then: Shows message "Complete profile verification first" with link to verification page

**Edge Cases:**
1. **Consultant in Unsupported Country:**
   - Given: Consultant country = "Russia" (not Stripe-supported)
   - When: Views pre-setup guidance
   - Then: Shows "Stripe Connect not available in your country. Join waitlist."

2. **Mobile View:**
   - Given: Consultant on mobile device (iOS/Android)
   - When: Opens pre-setup guidance
   - Then: Screen displays responsively with readable text and accessible buttons

---

## 📗 Dependencies

**Story Dependencies:**
- **Blocked by:**
  - EPIC-003 (Consultant Registration) - consultant account must exist
  - Profile Verification (Stage 7) - must be complete before payment setup
- **Blocks:**
  - FG-002 (Stripe Account Creation Backend)
  - FG-004 (Embedded Onboarding Component)

---

## ⚠️ Non-Functional Requirements

**Security:**
- Authorization required: Yes (consultant role only)
- Data encryption: N/A (no sensitive data on this screen)
- PII handling: No PII displayed

**Performance:**
- Screen load time: < 500ms
- Analytics tracking: Log all interactions

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Mobile Safari (iOS): iOS 14+
- Chrome Mobile (Android): Android 10+

---

## 📝 Notes

**Analytics to Track:**
- Pre-setup guidance views
- "Start Stripe Setup" click-through rate
- "Learn More" click rate
- Screen abandonment rate
- Time spent on guidance screen

---

**Story Version:** 1.0.0
**Last Updated:** 2025-10-23
**Status:** Ready for Development
