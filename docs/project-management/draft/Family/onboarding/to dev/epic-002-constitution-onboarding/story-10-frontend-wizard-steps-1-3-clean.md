STORY 10: Frontend - Constitution Wizard UI (Steps 1-3)

**Issue Type:** Story
**Project:** RLN1
**Summary:** As a Family Council Member, I want to complete Steps 1-3 of constitution setup, so that I define family context, invite members, and understand governance basics
**Epic Link:** SAAS-EPIC-001
**Priority:** High
**Story Points:** 8
**Sprint:** TBD

### ðŸ"– User Story

**As a** Family Council Member,
**I want to** complete Steps 1-3 of the constitution wizard (Family Context, Member Invitations, Governance Primer),
**so that** I set up my family profile and invite at least 2 family members before proceeding.

### ðŸŽ¯ Business Context

First 3 steps establish family foundation: collect basic info, invite members (minimum 2 required for governance), and educate user on governance importance. Critical for engagement and ensuring sufficient family participation.

### âœ… Acceptance Criteria

1. **Given** I open constitution wizard for the first time,
   **When** the modal loads,
   **Then** I see Step 1 with progress bar (1/8), user profile information input fields, and "Next step" button.

2. **Given** I complete Step 1 (user profile information entered),
   **When** I click "Next",
   **Then** progress saved via API, wizard advances to Step 2.

3. **Given** I am on Step 2 (Member Invitations),
   **When** I enter emails and click "Invite members",
   **Then** system validates minimum 2 members, sends invitation emails, advances to Step 3.

4. **Given** I am on Step 3 (Governance Primer),
   **When** I read educational content and click "Next",
   **Then** wizard advances to Step 4.

**Additional Criteria:**
- [ ] Progress bar shows 1/8, 2/8, 3/8 as steps complete
- [ ] Each step has "Previous step" button (except Step 1) and "Next step" button
- [ ] Step data auto-saves on "Next step" click via API
- [ ] Step 2 validation: Minimum 2 family members required 
- [ ] Step 3: Educational content from Figma design

### ðŸ" Design & UX

**Mockups/Wireframes:**
- Figma: https://www.figma.com/design/NWeSLJWw6iPinNILwPbsfv/-ReFamily--Web-Platofrm?node-id=3690-229557

**User Flow:**
1. User opens wizard modal from dashboard
2. Step 1: Enter family name, click "Next step"
3. Step 2: Enter 2+ emails, click "Invite members"
4. System sends emails, advances to Step 3
5. Step 3: Read governance primer, click "Next step"
6. Wizard advances to Step 4 (workshop selection)

**Step 1 Fields:**
- Family Name (required, max 100 characters)

**Step 2 Fields:**
- Email addresses (repeatable field, min 2)
- Optional: First name, last name per email

**Step 3 Content:**
- Educational text explaining family governance
- Benefits of constitution
- Overview of next steps

### ðŸ"' Business Rules

**Validation Rules:**
1. **Step 1:** Family name required, max 100 characters
2. **Step 2:** Minimum 2 valid email addresses, no duplicates
3. **Step 2 prerequisite:** All invited members must accept invitations before constitution can be finalized (future: not blocking wizard progression)
4. **Navigation:** "Previous step" button returns to previous step without losing data

**Authorization:**
- **Who can access:** Family Administrator OR Family Council (regular members see only Step 1 and Step 3)

**Edge Cases:**
- **User clicks "Next" without entering family name:** Show inline validation error "Family name is required"
- **User enters only 1 email in Step 2:** Show error "Minimum 2 family members required"
- **User closes wizard mid-step:** Progress auto-saved, user can resume later

### ðŸ§ª Test Scenarios

**Happy Path:**
1. Open wizard → Step 1 loads → Enter "Smith Family" → Click "Next step" → Progress saved, Step 2 loads
2. Step 2 → Enter 2 emails → Click "Invite members" → Invitations sent, Step 3 loads
3. Step 3 → Read content → Click "Next step" → Step 4 loads

**Negative Tests:**
1. **Step 1 empty:** Click "Next step" without entering family name → Inline error "Family name is required"
2. **Step 2 insufficient members:** Enter only 1 email → Click "Invite members" → Error "Minimum 2 family members required"
3. **Step 2 invalid email:** Enter "notanemail" → Error "Invalid email format"

**Edge Cases:**
1. **User clicks "Back step" from Step 3 to Step 2:** Step 2 loads with previously entered emails (data preserved)
2. **User closes wizard at Step 2:** Progress saved, "Continue" on dashboard reopens at Step 2

### ðŸ"— Dependencies

**Story Dependencies:**
- **Blocked by:** RLN2-008 (Constitution Progress API), RLN2-006 (User Registration API)
- **Blocks:** RLN1-013 (Steps 4-7 workshop selection depends on Step 3 completion)

### âš ï¸ Non-Functional Requirements

**Performance:**
- Modal open/render: < 200ms
- Step transition animation: < 300ms
- API call (save progress): < 200ms

**Accessibility:**
- WCAG level: AA
- Keyboard navigation: Tab through fields, Enter to submit
- Screen reader: Announce step number and progress
- Focus management: Auto-focus first input field on step load

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Mobile Safari: Latest 2 versions (responsive modal)

---
