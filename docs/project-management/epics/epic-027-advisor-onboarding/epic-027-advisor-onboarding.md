---
doc_id: "FG-EPIC-XXX"
title: "Epic: Consultant Onboarding Flow - Progress Tracking & Navigation"
type: "epic"
category: "product"
audience: "product-manager|business-analyst|developer|qa"
complexity: "intermediate"
created: "2025-11-25"
updated: "2025-11-25"
version: "1.0.0"
status: "draft"
tags: ["consultant", "onboarding", "progress-tracking", "advisor-portal", "marketplace"]
related: ["DOC-USR-006"]
owner: "product-team"
maintainer: "product-team"
priority: "high"
---

# Epic: Consultant Onboarding Flow - Progress Tracking & Navigation

## 📋 Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** Consultant Onboarding Flow - Progress Tracking & Orchestration  
**Summary:** Integrate existing registration steps into unified onboarding flow with progress tracking and smart navigation  
**Parent User Journey:** [To be created - Consultant Registration & Marketplace Publication Journey]  
**Priority:** High  
**Epic Link:** FG-EPIC-XXX

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Onboarding orchestration layer that connects 7 existing registration components into cohesive guided experience with progress tracking, dynamic welcome message, persistent banner, and automatic "Under Review" state upon completion.

**User-facing value:**
- Clear progress visibility (% completion) showing how far consultant has progressed
- Personalized welcome message (first-time vs returning user)
- Easy navigation between registration steps from central dashboard banner
- Visual feedback on completed vs incomplete steps
- Automatic progress calculation as consultant completes sections
- Progress decreases if consultant removes data (maintains accuracy)
- Automatic submission to moderation queue when 100% complete
- Clear messaging during review period (up to 3 days)

**Business value:**
- Reduced registration abandonment (users see progress and remaining work)
- Higher completion rates through guided experience
- Data on drop-off points (which steps users abandon)
- Accurate profile completeness tracking for quality control
- Automatic moderation queue management (no manual submission needed)
- Streamlined path from registration to marketplace publication

**Scope boundaries:**
- ✅ INCLUDED: Onboarding banner UI component with 8-step progress display
- ✅ INCLUDED: Progress calculation logic (% completion tracking, bidirectional)
- ✅ INCLUDED: Welcome message logic (first login vs returning user)
- ✅ INCLUDED: Navigation between banner and existing registration pages
- ✅ INCLUDED: Automatic submission when 100% complete (Step 8 = "Under Review")
- ✅ INCLUDED: "Under Review" status messaging modal
- ✅ INCLUDED: Event-driven progress recalculation
- ✅ INCLUDED: Progress recalculation when data deleted/modified
- ❌ NOT INCLUDED: Registration forms/pages themselves (already implemented)
- ❌ NOT INCLUDED: Admin moderation workflow (separate epic)
- ❌ NOT INCLUDED: Stripe KYC failure handling (separate epic)
- ❌ NOT INCLUDED: Marketplace publication (separate epic)
- ❌ NOT INCLUDED: Email notifications on submission (separate epic)

---

## 👥 Target Users

**Primary Personas:**
- **Consultant** ([DOC-USR-006](consultant-persona.md)) - Independent marketplace professional registering to acquire family clients

---

## 📖 User Stories (High-Level)

1. **As a** Consultant logging in for the first time, **I want to** see "Welcome, [Name]" (not "Welcome back"), **so that** I feel properly greeted as a new user

2. **As a** Consultant, **I want to** see persistent onboarding banner on my dashboard showing 8 steps and completion percentage, **so that** I always know my progress and what remains

3. **As a** Consultant, **I want to** click any step on the banner to navigate to that registration page, **so that** I can jump directly to where I need to work

4. **As a** Consultant, **I want to** see visual distinction between completed, current, and incomplete steps, **so that** I understand my progress at a glance

5. **As a** Consultant whose profile is under review, **I want to** click Step 8 to see review status details, **so that** I understand the timeline and next steps

---

## 🗺️ Onboarding Flow Architecture

### Components to Integrate (All Already Implemented)

**Step 1: Account & Security** ✅ 
- Page: Already exists
- Data: `User` table (email, password, MFA)

**Step 2: Basic Profile** ✅
- Page: Already exists  
- Data: `AdvisorProfile` (name, photo, bio, DOB, location, phone)

**Step 3: Credentials** ✅
- Page: Already exists
- Data: `AdvisorProfile` (education, interests)

**Step 4: Expertise Mapping** ✅
- Page: Already exists
- Data: `AdvisorProfile.specializations`

**Step 5: Services & Pricing** ✅
- Page: Already exists
- Data: `Service` table

**Step 6: Payments** ✅
- Page: Payment Settings (already exists)
- Data: Stripe integration

**Step 7: KYC Verification** ✅
- Process: Automatic via Stripe
- Data: Stripe KYC status

**Step 8: Under Review** 🆕
- **NOT a separate page/form**
- **Status indicator only** - always visible but disabled until 87.5% complete
- On click (when enabled): Shows modal with review status message
- Message: "Your profile is under review by our moderators. Review typically takes up to 3 business days. Once approved, you'll receive verified status and appear in the marketplace (Experts page for families)."

---

### What This Epic Builds (NEW Components)

**1. Onboarding Progress Banner Component**
- Location: Advisor Portal Dashboard (top section)
- Displays: 8 steps horizontally with icons, progress bar, completion %
- States: 
  - Draft (0-87.5%) - "Status: Draft · Completion: X%"
  - Under Review (100% complete) - "Status: Under Review"
- Persistence: Shows until profile approved and published

**2. Progress Calculation Engine (Event-Driven)**
- Monitors completion status of all 8 steps (7 registration + 1 submission)
- Calculates percentage: (completed_steps / 8) × 12.5% each step
- **Step 8 (Under Review)** always visible but disabled until 87.5%
- **Step 8 adds final 12.5%** to reach 100% upon submission
- **Bidirectional updates:** Progress increases when data added, decreases when removed
- Updates via event listeners (not polling or page refresh)
- Stored in database: `AdvisorProfile.onboarding_progress` (integer 0-100)

**3. Welcome Message Logic**
- Detects first login vs returning user
- Database field: `User.is_first_login` (boolean, default: true)
- On login: Check flag, display appropriate message, set to false after first login

**4. Step Navigation Router**
- Maps banner step clicks to existing pages:
  - Step 1 → /account-settings
  - Step 2 → /profile/basic
  - Step 3 → /profile/credentials
  - Step 4 → /profile/expertise
  - Step 5 → /services
  - Step 6 → /payment-settings
  - Step 7 → /kyc-status (or auto-check display)
  - Step 8 → Shows modal (no navigation) with review status message (only when enabled)
- Steps 1-7 clickable regardless of completion (consultant can edit)
- Step 8 always visible but disabled until 87.5%, then becomes clickable

**5. Banner State Manager**
- Show banner: When profile incomplete OR under review
- Update to "Under Review": Automatically when progress reaches 100%
- Hide banner: When profile approved and published to marketplace
- Refresh trigger: Event-driven (profile update events from any registration page)

**6. Review Status Modal** 🆕
- Triggered: When consultant clicks Step 8 "Under Review" (after enabled at 87.5%)
- Content:
  - Title: "Profile Under Review"
  - Message: "Your profile is currently being reviewed by our moderators. This process typically takes up to 3 business days."
  - Details: "Once approved, you will receive verified status and your profile will appear in the marketplace on the Experts page for families to discover."
  - CTA: "Got it" (close modal)
- Design: Modal overlay with centered content

**7. Automatic Submission Trigger** 🆕
- When: Progress reaches 87.5% (all Steps 1-7 complete)
- Action:
  - Set `profile_status = 'submitted'`
  - Send profile to admin moderation queue
  - Enable Step 8 on banner, change to "Under Review" state
  - Add final 12.5% to reach 100%
  - Show in-app notification: "Profile complete! Submitted for review."
- No manual "Submit" button needed

---

## 🧮 Business Rules

### Progress Calculation (Event-Driven, Bidirectional)
```
All 8 steps each = 12.5% (8 steps total to reach 100%)

INCREASING progress:
Step 1 (Account): completed_at != null → +12.5%
Step 2 (Basic Profile): all_required_fields_filled → +12.5%
Step 3 (Credentials): education_count > 0 AND interests != null → +12.5%
Step 4 (Expertise): specializations_count > 0 → +12.5%
Step 5 (Services): services_count > 0 → +12.5%
Step 6 (Payments): stripe_account_id != null AND stripe_status = 'active' → +12.5%
Step 7 (KYC): stripe_kyc_status = 'verified' → +12.5%
Step 8 (Under Review): profile_status = 'submitted' → +12.5%

When progress reaches 87.5% (Steps 1-7 complete):
- Automatically set profile_status = 'submitted'
- Send to admin moderation queue
- Enable Step 8 on banner, change to "Under Review" state
- Add final 12.5% to reach 100%
- Trigger notification: "Profile submitted for review"

DECREASING progress (when data removed):
- Consultant deletes all services → Step 5 incomplete, -12.5%
- Consultant removes education entries → Step 3 incomplete, -12.5%
- Stripe account disconnected → Step 6 incomplete, -12.5%
- Any required field cleared → Respective step incomplete, -12.5%

If progress drops below 87.5% after submission:
- profile_status remains 'submitted' (cannot undo submission)
- Step 8 remains enabled and shows "Under Review" with 100% (admin still reviewing)
- Edits flagged for admin review

Progress recalculation triggered (Event-Driven):
- Profile update events from Steps 1-7 pages
- Event listeners: onProfileUpdate, onServiceUpdate, onStripeUpdate
- NO polling, NO page refresh dependency
```

### Step Completion Criteria

| Step | Completion Logic | What Makes It Incomplete |
|------|------------------|--------------------------|
| **Account & Security** | Email verified | Email unverified, account suspended |
| **Basic Profile** | All 6 fields filled (name, photo, bio, DOB, location, phone) | Any required field null/empty |
| **Credentials** | ≥1 education + interests | All education deleted OR interests cleared |
| **Expertise Mapping** | ≥1 specialization | All specializations removed |
| **Services & Pricing** | ≥1 service | All services deleted |
| **Payments** | Stripe connected + active | Stripe disconnected OR status != 'active' |
| **KYC Verification** | Stripe KYC verified | KYC status changes (separate epic handles) |
| **Under Review** | Profile submitted (auto at 87.5%) | N/A (cannot be undone) |

### Banner Display Rules
```
SHOW onboarding banner when:
- onboarding_progress < 100% (incomplete profile)
- OR profile_status = 'submitted' (under review - shows "Under Review" on step 8)
- OR profile_status = 'revision_required' (rejected, needs fixes)

Step 8 display logic:
- Progress 0-87.4%: Step 8 visible but DISABLED (greyed out, not clickable)
- Progress = 87.5%: Auto-submit, Step 8 becomes ENABLED, shows "Under Review", progress → 100%
- Progress = 100% AND profile_status = 'submitted': Step 8 shows "Under Review" with pending icon (clickable)
- profile_status = 'revision_required': Step 8 shows "Revisions Required" with alert icon (clickable)

HIDE onboarding banner when:
- profile_status = 'approved' AND published_to_marketplace = true
```

### Welcome Message Logic
```
Database: Add `is_first_login` boolean to User table (default: true)

On login:
  if User.is_first_login == true:
    display "Welcome, {first_name}"
    set User.is_first_login = false
  else:
    display "Welcome back, {first_name}"
```

### Navigation Rules

- Steps 1-7: Always visible and clickable (while banner shown)
- Step 8: Always visible, but:
  - DISABLED (greyed out, not clickable) when progress < 87.5%
  - ENABLED (clickable) when progress ≥ 87.5%
- Clicking Steps 1-7: Navigates to corresponding page (existing routes)
- Clicking Step 8 "Under Review" (when enabled): Opens modal with review status message (no page navigation)
- Clicking Step 8 (when disabled): No action or tooltip showing "Complete Steps 1-7 first"
- Completed steps (1-7): Show checkmark icon, still clickable (allows editing)
- Incomplete steps: Show empty circle icon, clickable
- Step 8 "Under Review" (enabled): Shows pending/clock icon, clickable to see modal
- No step "locking" for Steps 1-7 - consultant can complete in any order
- Progress updates via event system (real-time, no refresh needed)

### Automatic Submission Flow (Step 8)
```
When progress reaches 87.5% (all Steps 1-7 complete):

Automatic actions:
1. Set profile_status = 'submitted'
2. Add profile to admin moderation queue
3. Enable Step 8 on banner, change to "Under Review" state
4. Add final 12.5% to progress (87.5% → 100%)
5. Show in-app notification: "Your profile is complete and has been submitted for review!"

Step 8 "Under Review" behavior (after enabled):
- Icon: Pending/clock icon (not checkmark)
- Status: "Under Review" label
- Progress: 100% (12.5% from submission)
- State: Enabled (clickable)
- Click action: Opens modal with message:
  
  Modal content:
  Title: "Profile Under Review"
  Message: "Your profile is currently being reviewed by our moderators. This process typically takes up to 3 business days. Once approved, you will receive verified status and your profile will appear in the marketplace on the Experts page for families to discover."
  Button: "Got it" (closes modal)

After submission:
- Consultant can still edit Steps 1-7 (navigates to pages normally)
- Edits after submission flagged for admin review (admin sees "edited after submission")
- Step 8 remains "Under Review" with 100% regardless of edits
- No way to "un-submit" profile
```

---

## 📏 Acceptance Criteria (Epic-Level)

**This Epic is complete when:**

1. ✅ Consultant sees "Welcome, {name}" on first login (no "back")
2. ✅ Consultant sees "Welcome back, {name}" on all subsequent logins
3. ✅ Onboarding banner component renders on Advisor Portal dashboard
4. ✅ Banner displays all 8 steps with icons and labels (Step 8 always visible)
5. ✅ Step 8 is DISABLED (greyed out) when progress < 87.5%
6. ✅ Progress bar shows completion percentage (0-100%)
7. ✅ Progress % updates automatically via event-driven system (no page refresh)
8. ✅ Each of Steps 1-7 adds 12.5% to progress when completed
9. ✅ Progress % decreases when consultant removes data (e.g., deletes service, -12.5%)
10. ✅ Clicking Steps 1-7 navigates to correct existing pages
11. ✅ Completed steps show checkmark visual indicator
12. ✅ Incomplete steps show empty circle indicator
13. ✅ Progress calculation logic correctly evaluates all 8 steps (bidirectional)
14. ✅ Progress persists in database (`AdvisorProfile.onboarding_progress`)
15. ✅ Banner persists across sessions until profile approved
16. ✅ When progress reaches 87.5%, Step 8 becomes ENABLED automatically
17. ✅ Step 8 enablement adds final 12.5% to reach 100%
18. ✅ Profile automatically submitted to moderation queue at 87.5% (enables Step 8)
19. ✅ Clicking disabled Step 8 (< 87.5%) shows no action or tooltip
20. ✅ Clicking enabled Step 8 "Under Review" opens modal with review status message
21. ✅ Modal shows: review timeline (up to 3 days), verified status info, marketplace visibility
22. ✅ After submission, consultant can still edit Steps 1-7 without breaking "Under Review" state
23. ✅ Edits after submission flagged for admin review
24. ✅ Banner disappears only after profile approved and published
25. ✅ All navigation routes correctly mapped to existing pages
26. ✅ Progress calculation triggered via event system (not polling/refresh)
27. ✅ Welcome message logic uses `is_first_login` database field

---

## 🧪 Testing Strategy

**Key Test Scenarios:**

### 1. Welcome Message
- New consultant first login → "Welcome"
- Same consultant second login → "Welcome back"
- Edge case: Multiple rapid logins, verify flag updates correctly

### 2. Progress Calculation (Event-Driven, Bidirectional)
- Complete each step sequentially, verify progress increments by 12.5%
- Complete steps out of order, verify event system handles correctly
- Progress reaches 62.5% (5 steps), verify Step 8 still DISABLED
- Complete Steps 6-7 to reach 87.5%, verify Step 8 becomes ENABLED automatically
- Verify automatic submission at 87.5% adds final 12.5% → 100%
- Delete a service after 100%, verify progress decreases to 87.5% but Step 8 remains enabled at 100%
- Delete all education, verify Step 3 becomes incomplete, progress decreases by 12.5%
- Disconnect Stripe, verify Step 6 becomes incomplete, progress decreases by 12.5%
- Re-add deleted data, verify progress increases again by 12.5%

### 3. Step Navigation
- Click each of Steps 1-7, verify navigation to correct page
- Complete step on page, verify banner updates via event (no manual refresh)
- Delete data on page, verify banner updates via event
- Incomplete step shows empty circle, complete shows checkmark

### 4. Banner Persistence
- Complete profile to 50%, logout, login, verify banner shows saved progress
- Delete data to reduce progress, verify banner updates
- Reach 87.5%, verify Step 8 becomes enabled with "Under Review" and progress → 100%
- After 100%, edit step 2, verify "Under Review" persists at 100%
- Verify edits after submission flagged
- Admin approves (separate flow), verify banner disappears

### 5. Step 8 Behavior (Disabled → Enabled)
- Progress at 0%, verify Step 8 visible but DISABLED (greyed out)
- Progress at 75% (6 steps), verify Step 8 still DISABLED
- Click disabled Step 8, verify no action or tooltip: "Complete Steps 1-7 first"
- Complete Step 7 to reach 87.5%, verify Step 8 becomes ENABLED automatically
- Verify Step 8 enablement adds 12.5% (87.5% → 100%)
- Click enabled Step 8, verify modal opens (not page navigation)
- Verify modal content: title, message about 3-day review, marketplace info
- Verify modal close button works
- Click Step 8 multiple times, verify modal opens each time
- Verify pending/clock icon on enabled Step 8

### 6. Automatic Submission
- Complete Steps 1-7 sequentially, verify automatic submission at 87.5%
- Verify in-app notification on submission
- Verify profile appears in admin moderation queue
- Verify profile_status = 'submitted' in database
- Verify progress jumps from 87.5% to 100% upon submission
- Verify Step 8 transitions from disabled to enabled state

### 7. Edge Cases
- Rapid completion of multiple steps, verify each adds exactly 12.5%
- Network interruption during automatic submission, verify retry logic
- Consultant closes browser immediately at 87.5%, verify submission persists
- Consultant deletes service while on dashboard, verify real-time update (-12.5%)
- Multiple browser tabs open, verify event system syncs across tabs
- Click disabled Step 8 repeatedly, verify no unintended behavior

---

## 📝 Notes

**Assumptions:**
- All 7 registration pages fully functional before Epic starts
- Database schema supports required new fields (`is_first_login`, `onboarding_progress`, `profile_status`)
- Advisor Portal has dashboard route and component structure
- Stripe integration returns reliable status for Payments + KYC steps
- Event system available for profile update notifications
- Admin moderation queue can receive automatic submissions

**Decisions Made:**
- ✅ Use `is_first_login` flag (simpler than `login_count`)
- ✅ Progress decreases if consultant deletes data (maintains accuracy)
- ✅ Stripe KYC failures handled in separate epic
- ✅ All 8 steps count as 12.5% each (100% / 8)
- ✅ Step 8 always visible but disabled until 87.5%, then enabled at 100%
- ✅ Step 8 adds final 12.5% when enabled (87.5% → 100%)
- ✅ Automatic submission at 87.5% (no manual submit button)
- ✅ Event-driven progress recalculation (not polling or page refresh)
- ✅ Modal for review status (not separate page)
- ✅ Email notifications on submission handled in separate epic

**Open Questions:**
- [ ] What if consultant edits profile after submission? **Decision: Allow edits, flag for admin**
- [ ] Event system reliability - what if event lost? **Decision: Add periodic sync as backup (once/hour)**

**Technical Coordination:**
- Backend team: Event system setup, automatic submission logic, progress calculation (12.5% per step)
- Frontend team: Banner component, modal component, event listeners, Step 8 disabled/enabled states
- Database team: Schema migrations (`is_first_login`, `onboarding_progress`, `profile_status`)
- Stripe team: Webhook notifications for KYC status changes
- Admin Portal team: Moderation queue integration for automatic submissions

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-11-25  
**Epic Focus:** Integration & orchestration with automatic submission and event-driven progress