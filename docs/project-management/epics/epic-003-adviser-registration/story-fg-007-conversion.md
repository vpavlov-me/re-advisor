---
story_id: "STORY-FG-007"
title: "Invited Advisor Conversion to Marketplace"
type: "story"
epic_id: "EPIC-003"
created: "2025-10-17"
updated: "2025-10-20"
priority: "high"
status: "ready"
estimate: "16h"
story_points: 5
sprint: "Sprint 45"
assignee: ""
labels: ["advisor", "conversion", "upgrade", "subscription", "migration"]
dependencies: ["STORY-FG-001", "STORY-FG-002"]
---

# User Story FG-007: Invited Advisor Conversion to Marketplace

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As an Invited Advisor, I want to upgrade to marketplace presence
**Epic Link:** EPIC-003 (Basic Advisor Registration & Profile)
**Priority:** High
**Story Points:** 5
**Sprint:** Sprint 45  

---

## 📖 User Story

**As an** Invited Advisor currently serving one family through direct invitation,  
**I want to** upgrade my account to marketplace presence,  
**So that** I can acquire additional family clients beyond my current relationship and expand my advisory business through platform visibility.

**Example Scenario:**
- **As a** Family Constitution Consultant currently working with the Johnson Family,
- **I want to** click "Expand to Marketplace" on my dashboard and complete missing profile sections,
- **So that** I can appear in marketplace search results and get discovered by other families seeking governance expertise.

---

## 🎯 Business Context

**Why is this Story important?**

Invited advisor conversion creates a natural growth funnel for marketplace:

- **Proven Value:** Advisors already experienced platform benefits with one family (lower conversion risk)
- **Market Size:** Estimated 30% of marketplace advisors will come from invited path conversion
- **Higher Quality:** Converting advisors have demonstrated engagement and quality (meetings attended, tasks completed)
- **Revenue Growth:** Subscription upgrade from free (invited-only) to paid (marketplace access)
- **Network Effects:** More marketplace advisors → more family options → platform value increases

**Conversion Drivers:**
- **Client Acquisition:** Access to families actively seeking advisors (vs. manual prospecting)
- **Revenue Expansion:** Generate income from multiple families simultaneously
- **Platform Familiarity:** Already comfortable with tools and workflows
- **Lower Barrier:** Basic profile partially complete from invited onboarding

**Strategic Value:**
- Creates virtuous cycle: invited → marketplace → refer more families → refer more advisors
- Reduces marketplace acquisition costs (conversion cheaper than cold acquisition)
- Validates advisor quality (family-vetted before marketplace entry)

---

## ✅ Acceptance Criteria

### Eligibility & Discovery

1. **Given** I'm an invited advisor (advisor_type: 'invited'),  
   **When** I log into Advisor Portal dashboard,  
   **Then** I see:
   - Current status card: "Serving 1 Family" (shows invited family name)
   - "Expand to Marketplace" CTA card prominently displayed
   - Benefits preview: "Acquire new clients, increase revenue, grow your practice"
   - "Learn More" link to marketplace benefits page

2. **Given** I meet conversion eligibility,  
   **When** system checks eligibility,  
   **Then** requirements are:
   - Advisor type: 'invited' (not already marketplace)
   - Account status: 'active' (not suspended or archived)
   - Basic profile data exists (name, email, photo from invited onboarding - minimal)
   - No specific time requirement (removed: "30 days of engagement")

### Conversion Initiation

3. **Given** I click "Expand to Marketplace" CTA,  
   **When** upgrade modal opens,  
   **Then** I see:
   - Modal title: "Expand Your Practice to Marketplace"
   - **Benefits explained:**
     - Appear in marketplace search
     - Get discovered by families actively seeking advisors
     - Manage multiple clients in one platform
     - Set your own pricing and availability
   - **Current profile status:** "40% complete" (example)
   - **What's needed:**
     - Complete profile sections (highlighted in list)
     - Subscribe to marketplace plan (pricing shown)
   - **Existing relationship:** "You'll continue serving [Family Name]"
   - Buttons: "Get Started" (primary) | "Maybe Later" (secondary)

4. **Given** I click "Get Started" in modal,  
   **When** conversion flow begins,  
   **Then** system:
   - Checks current profile completion percentage
   - Identifies missing required sections
   - Shows checklist of what needs completion:
     - ✓ Basic Information (pre-filled from invited profile)
     - ○ Work Experience (need to add)
     - ○ Expertise Modules (need to select)
     - ○ Subscription Payment (required)

### Profile Completion (Pre-filled Data)

5. **Given** I'm in conversion flow,  
   **When** I proceed to profile builder,  
   **Then**:
   - **Step 1 (Basic Info):** Pre-filled with:
     - Name (from invited advisor record)
     - Email (from invited advisor record)
     - Photo (if uploaded during invited onboarding)
     - Bio (if exists from invited profile)
   - Can edit any pre-filled field
   - Must complete missing required fields (title, location, phone, etc.)

6. **Given** I complete missing profile sections,  
   **When** I save each section,  
   **Then**:
   - Progress bar updates: "60% complete" (example)
   - Dashboard checklist shows ✓ for completed sections
   - Can save as draft and return later (same as regular profile building)

### Subscription Selection & Payment

7. **Given** I completed required profile sections (60%+ completion),  
   **When** I proceed to subscription,  
   **Then** I see:
   - Subscription plan selection page (same as registration flow)
   - Plans displayed: Growth Plan - Yearly, Basic - Monthly, Professional - Yearly
   - Pricing and features clearly shown
   - "Currently serving 1 family free. Marketplace access requires subscription."
   - Payment method input (Stripe Element)
   - "Complete Upgrade" button

8. **Given** I select plan and enter valid payment method,  
   **When** I click "Complete Upgrade",  
   **Then** system:
   - Processes subscription payment via Stripe
   - Updates advisor_type: 'invited' → 'marketplace'
   - Activates marketplace subscription
   - Maintains existing family_advisor_association (family relationship preserved)
   - Sends confirmation email with:
     - Subscription receipt
     - "You're now in the marketplace" message
     - Next steps: Profile review, KYC verification (future epic)

9. **Given** subscription payment fails,  
   **When** error occurs,  
   **Then**:
   - Clear error message displayed
   - Account remains 'invited' (no partial state)
   - Profile completion preserved (not lost)
   - Option to retry with different payment method
   - Can cancel and return to invited-only status

### Post-Conversion State

10. **Given** conversion succeeded,  
    **When** I return to dashboard,  
    **Then** I see:
    - Updated status: "Marketplace Active"
    - "Expand to Marketplace" CTA removed
    - Family client card still shows: "Serving [Family Name]"
    - New section: "Marketplace Profile" with link to public profile (pending KYC verification)
    - Success banner: "Welcome to the marketplace! Your profile is under review."

11. **Given** I want to view my profile status,  
    **When** I click "Marketplace Profile" link,  
    **Then** I see:
    - Profile preview (as families will see it)
    - Status: "Pending Verification" (KYC required before publication - future epic)
    - Completion percentage: "65%" (example)
    - Link to "Improve Profile" (add more sections)

### Existing Family Relationship Preservation

12. **Given** I converted to marketplace,  
    **When** I view family associations,  
    **Then**:
    - Original inviting family association PRESERVED
    - Can still access family dashboard
    - Can still view family meetings, tasks, communications
    - Family can still contact me directly
    - No change to existing engagement or pricing with inviting family

**Additional Criteria:**
- [ ] Conversion can be initiated anytime (no time restrictions)
- [ ] Email confirmation sent after successful conversion
- [ ] Analytics event: `advisor_conversion_completed` (source: 'invited')
- [ ] Subscription billing starts immediately (pro-rated if mid-month)
- [ ] Can convert even with incomplete profile (if meets 60% minimum)
- [ ] Existing family relationship unaffected by conversion

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Dashboard "Expand to Marketplace" CTA Card *(Figma link to be added)*
- Conversion Upgrade Modal *(Figma link to be added)*
- Profile Completion Checklist *(Figma link to be added)*
- Subscription Selection (Conversion Flow) *(Figma link to be added)*
- Post-Conversion Dashboard *(Figma link to be added)*

**User Flow:**
```
1. Invited advisor logs into dashboard
2. Sees "Expand to Marketplace" CTA card
3. Clicks CTA
4. Upgrade modal opens with benefits and requirements
5. Clicks "Get Started"
6. Modal closes, shows checklist:
   ✓ Basic Info (pre-filled)
   ○ Work Experience (need to add)
   ○ Expertise (need to select)
   ○ Subscription (need to pay)
7. Clicks "Complete Profile"
8. Redirected to profile builder (Step 1)
9. Step 1 pre-filled (name, email, photo), adds missing fields
10. Saves, proceeds to Step 2 (Work Experience)
11. Adds work history, saves
12. Proceeds to Step 3 (Expertise)
13. Selects modules, saves
14. Profile completion: 65%
15. Redirected to subscription page
16. Selects "Growth Plan - Yearly"
17. Enters payment method
18. Clicks "Complete Upgrade"
19. Payment processed successfully
20. Success message: "Welcome to the marketplace!"
21. Redirected to dashboard
22. Dashboard shows "Marketplace Active"
23. Family association still visible
24. Email confirmation received
```

**UI Components:**
- CTA card with marketplace benefits
- Upgrade modal with checklist
- Profile completion progress bar
- Pre-filled form indicators (show what's from invited profile)
- Subscription plan comparison (same as registration)
- Success confirmation page
- Dashboard status update (invited → marketplace badge)

---

## 🔒 Business Rules

### Eligibility Requirements

- **Current Status:** advisor_type = 'invited'
- **Account Status:** active (not suspended or archived)
- **Basic Data Exists:** Name, email (from invited onboarding)
- **No Time Restriction:** Can convert immediately after invited onboarding or years later
- **No Activity Requirement:** No minimum days of engagement, meetings, or tasks

### Conversion Requirements

- **Profile Completion:** Minimum 60% (same as new registration)
  - Basic info (can be pre-filled)
  - At least 1 work experience
  - At least 1 expertise module
  - Total: 60% threshold
- **Subscription:** Valid payment method and successful subscription activation
- **Terms Acceptance:** Marketplace terms of service (if different from invited terms)

### Data Migration & Pre-filling

**From Invited Profile → Marketplace Profile:**
- Name → Pre-filled
- Email → Pre-filled
- Photo URL → Pre-filled (if exists)
- Bio → Pre-filled (if exists)
- All other fields: Empty (advisor must complete)

**Preservation:**
- family_advisor_associations record MAINTAINED
- Existing family relationship unchanged
- Access permissions to family portal preserved
- Historical data (meetings, tasks) retained

### Subscription Rules

- Marketplace subscription required (invited service was free)
- Plans same as new registration (managed in Stripe dashboard)
- Billing starts immediately upon successful payment
- Subscription status managed by Stripe
- No refunds if advisor later decides to revert to invited-only

### Post-Conversion Status

- advisor_type: 'invited' → 'marketplace'
- Can serve original family + acquire marketplace clients
- Profile goes through KYC verification before marketplace publication (future epic)
- Until KYC complete: Status "Pending Verification", not searchable in marketplace

### Reversibility

- **Cannot revert to invited-only** after conversion and payment
- Once marketplace, always marketplace (subscription can be cancelled but account remains marketplace type)
- If subscription cancelled: Loses marketplace visibility, keeps family relationship

---

## 🧪 Test Scenarios

### Happy Path
```
1. Invited advisor "Jane Smith" logs in
2. Dashboard shows: "Serving Johnson Family"
3. Sees "Expand to Marketplace" CTA card
4. Clicks CTA → Upgrade modal opens
5. Modal shows: Benefits, current status (40% complete), what's needed
6. Clicks "Get Started"
7. Checklist appears: ✓ Basic (pre-filled), ○ Experience, ○ Expertise, ○ Subscription
8. Clicks "Complete Profile"
9. Redirected to Step 1: Name, email, photo pre-filled
10. Adds: Title "Family Governance Consultant", location "London, UK", phone
11. Saves, proceeds to Step 2
12. Adds work experience: "Smith Advisory LLC", "Senior Consultant", 2020-Present
13. Saves, proceeds to Step 3
14. Selects: Conflicts (primary), Constitution (primary), Family Council
15. Saves → Profile 65% complete
16. Redirected to subscription page
17. Selects "Growth Plan - Yearly $2490"
18. Enters credit card, clicks "Complete Upgrade"
19. Payment processed
20. Success page: "Welcome to the marketplace!"
21. Dashboard updated: "Marketplace Active"
22. Johnson Family association still visible
23. Email confirmation received
```

### Pre-filled Data Tests

1. **OAuth Invited Advisor:**
   - Invited via LinkedIn OAuth (has photo, headline)
   - Conversion: Photo and name pre-filled
   - Headline used as suggested professional title
   - Can edit all pre-filled fields

2. **Email Invited Advisor:**
   - Invited via email registration (no OAuth)
   - Conversion: Name and email pre-filled
   - Photo empty (must upload)
   - All other fields empty

3. **Partial Invited Profile:**
   - Invited advisor added bio during invited onboarding
   - Conversion: Bio pre-filled in Step 1
   - Advisor can edit or keep bio
   - Saves time vs. writing from scratch

### Payment Failure Tests

1. **Declined Payment:**
   - Complete profile to 65%
   - Proceed to subscription
   - Enter declined test card
   - Click "Complete Upgrade"
   - Error: "Payment declined"
   - Account remains 'invited' (no partial conversion)
   - Profile data preserved
   - Can retry with different card

2. **Network Timeout:**
   - Submit payment
   - Simulate network timeout
   - Show "Processing..." state
   - Timeout after 30 seconds
   - Error: "Payment timeout, please try again"
   - Account remains 'invited'

### Family Relationship Tests

1. **Preserve Family Association:**
   - Invited advisor serving Johnson Family
   - Complete conversion successfully
   - Verify family_advisor_associations record still exists
   - Can access Johnson Family dashboard
   - Can view meetings, tasks for Johnson Family
   - Johnson Family can still contact advisor directly

2. **Multiple Families After Conversion:**
   - Convert to marketplace
   - Marketplace family books advisor
   - Advisor now serves: Johnson (invited) + Smith (marketplace)
   - Both families visible on advisor dashboard
   - Both relationships active

### Edge Cases

1. **Partial Completion:**
   - Start conversion, complete Step 1
   - Exit without payment
   - Return later
   - Dashboard shows: Checklist with partial progress
   - Can resume where left off

2. **Multiple Conversion Attempts:**
   - Start conversion Monday
   - Exit without completing
   - Start again Tuesday
   - Previous data preserved
   - Can continue from any step

3. **Eligibility Check:**
   - Advisor already marketplace type
   - "Expand to Marketplace" CTA NOT shown
   - No conversion option available

---

## 🔗 Dependencies

### Story Dependencies
- **Depends on:** FG-003, FG-004, FG-005 (profile building steps)
- **Depends on:** FG-001 or FG-002 (subscription payment flow)
- **Depends on:** JRN-ADV-002 implementation (invited advisor onboarding exists)
- **Blocks:** KYC Verification (future epic, happens after conversion)

### Technical Dependencies
- Invited advisor onboarding (JRN-ADV-002) must be implemented
- family_advisor_associations table with invited advisor records
- Subscription payment integration (Stripe) from FG-001/FG-002
- Profile builder from FG-003/FG-004/FG-005

### Data Dependencies
- Invited advisor account exists with:
  - advisor_type: 'invited'
  - Basic profile data (name, email, optional photo/bio)
  - At least one family_advisor_association record

---

## ⚠️ Non-Functional Requirements

### Performance
- Eligibility check: < 200ms
- Profile data pre-fill: < 1 second
- Payment processing: < 5 seconds (Stripe standard)
- Conversion update: < 500ms

### Security
- Verify advisor owns account (JWT validation)
- Prevent concurrent conversions (idempotency)
- Secure payment handling (Stripe PCI compliance)
- Family association preservation (no data loss)

### Reliability
- Transaction atomicity: Conversion succeeds or fails completely (no partial state)
- Rollback on payment failure (account stays 'invited')
- Data integrity: Family relationships never broken

### User Experience
- Clear value proposition (why upgrade)
- Transparent pricing (no hidden fees)
- Reassurance: Existing family relationship preserved
- Progress tracking (checklist, completion %)
- Help available throughout conversion

---

## 📝 Notes

**Questions:**
- [ ] Should we offer discount for converting advisors? (E.g., first month 50% off)
- [ ] Do we need approval before allowing conversion? (Currently: No, self-service)
- [ ] Can advisor pause marketplace while keeping subscription? (Temporarily go "inactive")
- [ ] Should conversion trigger immediate KYC or allow profile building first? (Currently: Profile first, KYC future epic)

**Assumptions:**
- Invited advisors understand marketplace benefits (saw value with one family)
- Subscription pricing is acceptable (already engaged with platform)
- Profile pre-filling reduces friction significantly
- Family relationship preservation is critical (advisors won't convert if relationship at risk)

**Future Enhancements:**
- Referral program: Invited advisors get credit for marketplace referrals
- Bulk conversion: Advisory firms onboard multiple invited advisors, convert all at once
- Conversion analytics: Track conversion rates by advisor tenure, family engagement level
- Dynamic pricing: Offer discounts based on advisor performance with invited family
- Gradual conversion: Allow "trial" marketplace presence (limited time) before full commitment

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-17  
**Story Status:** Ready for Development  
**Sprint:** Sprint 45