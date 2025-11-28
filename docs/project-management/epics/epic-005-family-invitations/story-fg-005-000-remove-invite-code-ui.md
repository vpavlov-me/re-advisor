---
story_id: "STORY-FG-005-000"
title: "Remove Invite Code UI Components"
type: "story"
epic_id: "EPIC-005"
created: "2025-10-15"
updated: "2025-10-20"
priority: "high"
status: "ready"
estimate: "8h"
story_points: 3
sprint: "Sprint 45"
assignee: ""
labels: ["technical-debt", "ui-cleanup", "preparation", "frontend-only"]
dependencies: []
architecture_refs: ["CLAUDE.md", ".claude/contexts/frontend.md"]
---

# User Story: US-INV-0 (FG-97) - Remove Invite Code UI Components

> **Note:** Technical preparation story for Epic FG-96 (Advisor-Family Mutual Connection via Email Invitations)

---

## 📋 Basic Information

**Issue Type:** Story (Technical Debt / Preparation)  
**Project:** FG  
**Summary:** As a developer, I want to remove all invite code UI components from both portals, so that the codebase is clean and users don't see deprecated code-based functionality  
**Epic Link:** FG-96 [Advisor-Family Mutual Connection via Email Invitations]  
**Priority:** High  
**Story Points:** [To be estimated during grooming - estimated 3-5 points]  
**Sprint:** [To be assigned during sprint planning]  
**Labels:** technical-debt, ui-cleanup, preparation, frontend-only

---

## 📖 User Story

**As a** developer,  
**I want to** remove all invite code UI components from Family Portal and Advisor Portal,  
**so that** the codebase is clean, users don't see deprecated functionality, and we're ready to implement the new email-based invitation system.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point being solved:**
- Users currently see confusing invite code UI that will be deprecated
- Invite codes create security risks (shareable codes vs. personal email invitations)
- Outdated UI components clutter the interface and create maintenance overhead

**Business outcome expected:**
- Clean user experience without deprecated invite code functionality
- Prepared codebase for new email-based invitation system (US-INV-1, US-INV-2, US-INV-3)
- Reduced confusion for users attempting to invite advisors or join families
- Improved security by removing shareable code-based invitations

**Strategic alignment:**
- Aligns with Epic FG-96 goal of implementing secure, email-based bidirectional connections
- Prerequisite for modern invitation workflow (Family → Advisor, Advisor → Family)
- Supports platform security and user experience improvements

---

## ✅ Acceptance Criteria

**This Story is complete when:**

### Family Portal (frontend/react-app/)

1. **Given** I am a Family Council member logged into Family Portal,  
   **When** I navigate through all pages and settings,  
   **Then** I do not see any UI elements related to:
   - Generating invite codes
   - Displaying active invite codes
   - Managing invite codes (deactivate, delete, copy)
   - Inviting family members via invite codes

2. **Given** I am a Family Council member,  
   **When** I look for ways to invite new family members,  
   **Then** I see a clear message: "Email-based invitations coming soon" (temporary placeholder).

3. **Given** I am a Family Council member,  
   **When** I look for ways to invite advisors,  
   **Then** I see a clear message: "Advisor invitations coming soon" (temporary placeholder).

### Advisor Portal (frontend/advisor-portal/)

4. **Given** I am a new advisor attempting to register,  
   **When** I open the registration flow,  
   **Then** I do not see any invite code input field or validation.

5. **Given** I am a registered advisor,  
   **When** I navigate through profile settings and connections,  
   **Then** I do not see any references to invite codes or code-based family associations.

### Code Quality

6. **Given** the invite code UI is removed,  
   **When** I review the codebase,  
   **Then**:
   - All invite code React components are deleted
   - All invite code routing rules are removed
   - Navigation links to invite code pages are removed
   - No console errors or broken links exist

7. **Given** the changes are deployed,  
   **When** I test both portals in production-like environment,  
   **Then**:
   - No 404 errors from old invite code routes
   - No broken navigation links
   - No JavaScript console errors related to removed components

### Backend Compatibility (CRITICAL)

8. **Given** backend invite code API endpoints still exist,  
   **When** I review the changes,  
   **Then**:
   - NO backend endpoints are modified or removed
   - Backend tables (`invites`, `family_advisor_associations`) remain untouched
   - Only frontend UI layer is affected

---

## 📐 Design & UX

**Current State (To Be Removed):**

### Family Portal - Invite Code UI Elements
- **Settings > Invitations page** (if exists)
  - Button: "Generate Invite Code"
  - List: Active invite codes with copy/delete actions
  - Form: Invite code settings (expiration, usage limits)
  
- **Team/Members page**
  - Button: "Invite Member" → shows invite code modal
  - Invite code display with copy functionality

- **Advisor Management page** (if exists)
  - "Invite Advisor" → shows invite code generation

### Advisor Portal - Invite Code UI Elements
- **Registration Flow**
  - Input field: "Enter Invite Code"
  - Validation message: "Invalid invite code"
  - Help text: "Contact family for invite code"

- **Profile Setup**
  - Any references to invite code in onboarding

**New State (Temporary Placeholders):**

### Family Portal
- **Team/Members page**: 
  - Button: "Invite Member" → shows message: "Email invitations coming soon in next release"
  
- **Advisor Connections page**:
  - Button: "Invite Advisor" → shows message: "Advisor invitations coming soon in next release"

### Advisor Portal
- **Registration Flow**:
  - No invite code input
  - Clear messaging: "Registration open - connect with families after profile setup"

**User Flow After Changes:**

**Family Council attempting to invite:**
1. User navigates to Members or Advisors page
2. User clicks "Invite" button
3. System shows placeholder message: "Email-based invitations launching in [next sprint]. You'll be able to send secure email invitations directly."
4. User can dismiss message and continue using platform

**New Advisor attempting to register:**
1. User opens Advisor Portal registration
2. User provides email, name, professional details (no invite code step)
3. User completes registration successfully
4. User can create profile and later request connections with families (US-INV-2)

---

## 🔒 Business Rules

**Validation Rules:**
1. **Frontend Only**: NO changes to backend API endpoints, database schemas, or business logic
2. **Graceful Degradation**: Removing UI must not break existing functionality in other areas
3. **Backward Compatibility**: Backend API endpoints remain for potential legacy mobile apps or integrations

**Authorization:**
- **Who can perform this action:** Developers with repository write access
- **Who can view results:** All users (Family Council, Family Members, External Advisors)

**Edge Cases:**
1. **Deep links to old invite pages**: Should redirect to homepage or show 404 with helpful message
2. **Cached components**: Users may have old cached UI - ensure proper cache invalidation
3. **Documentation references**: Update any user documentation mentioning invite codes

**Deprecation Strategy:**
- Remove UI immediately (this story)
- Keep backend APIs for 2 sprints (monitor usage)
- Remove backend APIs in separate story after email system is stable

---

## 🧪 Test Scenarios

**Happy Path:**

**Scenario 1: Family Council - No Invite Code UI**
1. Login as Family Council member to Family Portal
2. Navigate to "Team Members" page
3. Verify NO "Generate Invite Code" button exists
4. Click any "Invite" buttons
5. Verify placeholder message appears: "Email invitations coming soon"
6. Navigate to all other pages (Settings, Advisors, etc.)
7. Verify no invite code references anywhere

**Scenario 2: Advisor Registration - No Invite Code Required**
1. Open Advisor Portal registration page (not logged in)
2. Verify NO "Invite Code" input field exists
3. Complete registration with: email, name, professional info
4. Submit registration successfully
5. Verify account created without invite code validation

**Scenario 3: Code Quality - No Console Errors**
1. Open both portals with browser DevTools console
2. Navigate through all pages
3. Verify NO console errors related to:
   - Missing components
   - Broken imports
   - Undefined routes
4. Verify NO 404 errors in network tab

---

**Negative Tests:**

**Scenario 4: Direct URL Access to Old Invite Routes**
1. Attempt to access old invite code URLs directly:
   - `/family/invitations`
   - `/family/invite-code`
   - `/advisor/register?invite=XXX`
2. Verify graceful handling:
   - Redirect to homepage OR
   - Show 404 with message: "This feature has been updated. Email invitations launching soon."

**Scenario 5: Cached Components**
1. User has old cached version of portal
2. User logs in and navigates
3. Verify app detects version mismatch
4. Verify app forces reload or shows update message

---

**Edge Cases:**

**Scenario 6: Backend API Still Works**
1. Use API testing tool (Postman, curl)
2. Make direct API call to backend invite endpoint:
   - `POST /api/invites` (if exists)
   - `GET /api/invites/validate/{code}` (if exists)
3. Verify backend still responds correctly (proving we only removed UI)

**Scenario 7: Navigation Links Cleanup**
1. Check all navigation menus (sidebar, header, footer)
2. Verify NO broken links to removed invite pages
3. Check breadcrumbs on all pages
4. Verify NO orphaned navigation items

---

**Test Cases Location:** `Knowledge-Base/product-management/test-cases/EPIC-FG-96-test-cases.md` (to be created with Epic test plan)

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** None (this is the first story in Epic FG-96)
- **Blocks:** 
  - FG-98 (US-INV-1): Email-based advisor invitations (Family → Advisor)
  - FG-99 (US-INV-2): Connection requests (Advisor → Family)
  - FG-100 (US-INV-3): Mutual connection management dashboard

**External Dependencies:**
- None (purely frontend changes, no backend coordination needed)

**Parallel Work:**
- Can be developed in parallel with US-INV-1 backend API design (different developers)

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Page load time: Should improve slightly (less code to load)
- No performance regression from removals
- Verify bundle size decreases after removing unused components

**Security:**
- Removing invite code UI improves security (removes shareable code attack vector)
- No security regressions from changes
- Ensure no sensitive data exposed in placeholder messages

**Accessibility:**
- Placeholder messages must be screen-reader friendly
- Any new temporary UI follows WCAG AA standards
- Keyboard navigation remains functional

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Edge: Latest version

**Code Quality:**
- Remove unused imports after deleting components
- Run linter to catch dead code
- Update tests to remove references to deleted components
- No TypeScript/ESLint errors after changes

---

## 📝 Notes

**Components to Remove (Estimated List):**

**Family Portal (frontend/react-app/):**
- `/src/pages/Invitations.tsx` (if exists)
- `/src/components/InviteCodeGenerator.tsx` (if exists)
- `/src/components/InviteCodeList.tsx` (if exists)
- `/src/components/InviteCodeModal.tsx` (if exists)
- Routes in `/src/App.tsx` or router config
- Navigation links in Sidebar/Header components

**Advisor Portal (frontend/advisor-portal/):**
- `/src/pages/Register.tsx` - remove invite code section
- `/src/components/InviteCodeInput.tsx` (if exists)
- `/src/services/inviteCodeValidation.ts` (if exists)
- Any invite code state management (Redux/Context)

**Open Questions:**
- ✅ Do we need to add analytics tracking for "coming soon" placeholder clicks? 
  - **Answer:** Yes, track clicks to measure user demand and prioritize US-INV-1/2 development
  
- ✅ Should we show ETA in placeholder messages ("coming soon in Sprint X")?
  - **Answer:** Yes, show general timeframe: "Launching in next release (estimated 2-3 weeks)" to manage expectations
  
- ✅ What happens to existing invite codes in database?
  - **Answer:** Leave untouched. Backend endpoints remain. Existing codes still work via API (for backward compatibility), but UI removed.
  
- ✅ Should we create redirect rules for old URLs or just 404?
  - **Answer:** Create custom 404 page for old invite routes with message: "Invite system has been upgraded. Email invitations launching soon."

**Documentation Updates Needed:**
- Update user guides mentioning invite codes
- Add FAQ entry: "Why can't I generate invite codes anymore?"
- Prepare announcement for users: "New secure email invitation system launching soon"

**Risk Mitigation:**
- Deploy to staging first, test thoroughly
- Monitor error tracking (Sentry) for 48hrs post-deployment
- Prepare rollback plan (Git revert)
- Notify users via in-app announcement before deployment

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-20  
**Story Type:** Technical Debt / Preparation  
**Estimated Effort:** 3-5 story points (primarily removal + testing)  
**Target Sprint:** Sprint preceding US-INV-1 development