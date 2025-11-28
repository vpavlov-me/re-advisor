# User Story: Start New Conversation with Participant Selection

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As an advisor or family member, I want to start a new conversation by selecting participants, so that I can communicate efficiently with the right people  
**Epic Link:** FG-EPIC-XXX [Messages section epic]  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Family Member, Family Council Member, Personal Family Advisor, External Consul, or Consultant,  
**I want to** start a new conversation by selecting participants (specific family members, entire family, or multiple advisors),  
**so that** I can communicate efficiently with the right people about specific topics instead of broadcasting to everyone.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point being solved:**
- Currently, users must use external communication tools (email, WhatsApp) to have targeted conversations with specific people
- Announcements are too broad for specific discussions
- No structured way to initiate conversations with relevant participants only

**Business outcome expected:**
- Reduce dependency on external communication channels
- Enable targeted, context-specific conversations within platform
- Improve communication efficiency by involving only relevant participants
- Create conversation history tied to family governance context

**Strategic alignment:**
- Core feature for Advisor Portal messaging system
- Foundation for real-time family-advisor communication
- Enables personalized advisory engagement

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** I am logged in as advisor or family member,  
   **When** I click "New Conversation" button,  
   **Then** a modal opens with participant selection interface.

2. **Given** I am creating a new conversation (advisor perspective),  
   **When** I view the participant selector,  
   **Then** I see options to:
   - Select specific family members individually (checkboxes or multi-select)
   - Add "Entire Family" with one click (selects all family members)
   - Select multiple advisors who serve this family (if applicable)

3. **Given** I am creating a new conversation (family member perspective),  
   **When** I view the participant selector,  
   **Then** I see options to:
   - Select specific family members individually
   - Add "Entire Family" with one click
   - Select advisors currently serving my family

4. **Given** I have selected at least 1 participant (excluding myself),  
   **When** I attempt to create the conversation,  
   **Then** the system validates and allows creation.

5. **Given** I have selected 0 participants,  
   **When** I attempt to create the conversation,  
   **Then** system shows validation error: "Please select at least one participant."

6. **Given** I am creating a new conversation,  
   **When** I optionally enter a "Conversation Title",  
   **Then** the title is saved with the conversation.

7. **Given** I did not enter a conversation title,  
   **When** the conversation is created,  
   **Then** system generates default title: "Conversation with [Family Name]" (advisor) or "[Initiator Name] - [Date]" (family member).

8. **Given** I have selected participants and optionally entered title,  
   **When** I type a first message (required, minimum 1 character),  
   **And** I click "Start Conversation",  
   **Then** system:
   - Creates the conversation with selected participants
   - Sends the first message
   - Notifies all participants (in-app + push)
   - Displays the conversation in my conversation list
   - Opens the conversation thread for continued messaging

9. **Given** I attempt to start a conversation without typing a first message,  
   **When** I click "Start Conversation",  
   **Then** system shows validation error: "Please enter a message to start the conversation."

**Additional Criteria:**
- [ ] "Add Entire Family" button clearly indicates how many members will be added (e.g., "Add Entire Family (12 members)")
- [ ] Participant selector shows user avatars/names clearly
- [ ] Selected participants are visually distinct (highlighted, checked)
- [ ] Advisor selector filters to show only advisors currently serving the family
- [ ] Conversation appears immediately in conversation list after creation
- [ ] All participants receive notification within seconds

---

## 🔒 Business Rules

**Validation Rules:**
1. **Minimum participants**: At least 1 participant required (excluding initiator)
2. **Maximum participants**: No hard limit, but UI should warn if selecting >20 participants
3. **First message required**: Cannot create empty conversation (minimum 1 character)
4. **Conversation title**: Optional, max 200 characters
5. **Duplicate prevention**: If conversation exists with exact same participants, optionally suggest using existing conversation (future enhancement)

**Authorization:**

**Who can perform this action:**
- **Family Members** (DOC-USR-001): Can start conversations with family members and advisors serving their family
- **Family Council Members** (DOC-USR-002): Same as family members (no additional privileges)
- **Personal Family Advisor** (DOC-USR-004): Can start conversations with family members from invited family
- **External Consul** (DOC-USR-005): Can start conversations with any family members from invited family
- **Consultant** (DOC-USR-006): Can start conversations with family members from families with active bookings OR managed portals (Premium)

**Who can view results:**
- All conversation participants can view the conversation
- Non-participants cannot see the conversation

**Participant Selection Rules:**
1. **Advisors selecting participants:**
   - Can select family members from associated families only
   - Can select other advisors serving the same family
   - Cannot select family members from unassociated families

2. **Family members selecting participants:**
   - Can select any family member from their own family
   - Can select advisors currently serving their family (Personal FA, External Consul, Consultants with active bookings/managed portals)
   - Cannot select advisors not associated with their family

3. **"Add Entire Family" behavior:**
   - Selects all family members except initiator
   - Includes both regular members and Family Council members
   - Does NOT include advisors (must be selected separately)

**Edge Cases:**
- **Advisor loses family access after conversation started**: Advisor retains read-only access to conversation history but cannot send new messages (handled in separate story)
- **User deselects all participants**: Show validation error
- **Consultant with expired booking**: Cannot initiate new conversations (access validation handled in separate story)
- **Family member selects "Entire Family" + individual members**: System deduplicates, no double-selection
- **Selecting self as participant**: System should prevent or automatically exclude (user is always implicit participant)

---

## 🧪 Test Scenarios

**Happy Path:**

**Scenario 1: Advisor starts conversation with specific family members**
1. Advisor logs in, navigates to Messages
2. Clicks "New Conversation"
3. Selects Family A from dropdown
4. Selects 3 specific family members: Alice, Bob, Carol
5. Enters conversation title: "Q4 Succession Planning"
6. Types first message: "Let's discuss the succession timeline for next quarter"
7. Clicks "Start Conversation"
8. **Expected**: Conversation created, message sent, Alice/Bob/Carol notified, conversation appears in list

**Scenario 2: Family member starts conversation with entire family**
1. Family member logs in, navigates to Messages
2. Clicks "New Conversation"
3. Clicks "Add Entire Family" button
4. Leaves conversation title blank
5. Types first message: "Family reunion planning - please share your availability"
6. Clicks "Start Conversation"
7. **Expected**: Conversation created with all family members, default title generated, all members notified

**Scenario 3: Family member starts conversation with multiple advisors**
1. Family member logs in, navigates to Messages
2. Clicks "New Conversation"
3. Selects 2 advisors: Succession Advisor, Philanthropic Advisor
4. Enters title: "Coordination between advisors"
5. Types first message: "Can we coordinate on the foundation setup?"
6. Clicks "Start Conversation"
7. **Expected**: Conversation created with both advisors, both notified

**Negative Tests:**

**Test 1: Attempt to create conversation without participants**
1. User clicks "New Conversation"
2. Does NOT select any participants
3. Types first message
4. Clicks "Start Conversation"
5. **Expected**: Validation error "Please select at least one participant"

**Test 2: Attempt to create conversation without first message**
1. User clicks "New Conversation"
2. Selects participants
3. Leaves message field empty
4. Clicks "Start Conversation"
5. **Expected**: Validation error "Please enter a message to start the conversation"

**Test 3: Advisor attempts to select family members from unassociated family**
1. Advisor clicks "New Conversation"
2. Selects Family X (not associated with advisor)
3. **Expected**: Participant selector shows empty state or error "No access to this family"

**Test 4: Family member attempts to select unassociated advisor**
1. Family member clicks "New Conversation"
2. Attempts to select Advisor Y (not serving their family)
3. **Expected**: Advisor Y does not appear in selector (filtered out)

**Edge Cases:**

**Test 5: Select "Entire Family" with 50+ members**
1. User clicks "Add Entire Family" (family has 50 members)
2. **Expected**: System shows warning "This will add 50 members to the conversation. Continue?" and allows creation

**Test 6: Deselect all participants after selecting some**
1. User selects 3 participants
2. User deselects all 3 participants
3. Attempts to create conversation
4. **Expected**: Validation error "Please select at least one participant"

**Test 7: Create conversation with max title length**
1. User enters 200 character conversation title
2. System accepts
3. User enters 201 character title
4. **Expected**: System truncates or shows "Title too long (max 200 characters)"

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Participant selector loads within 1 second
- Conversation creation completes within 2 seconds
- Notifications sent within 5 seconds of conversation creation

**Security:**
- Authorization required: Yes (JWT authentication)
- Data encryption: Yes (conversation data encrypted at rest)
- PII handling: Yes - family member names/emails are PII, encrypt in database

**Usability:**
- Participant selector supports search/filter for families with >10 members
- Mobile-responsive modal for small screens
- Clear visual feedback for selected participants
- Accessible (keyboard navigation, screen reader support)

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Mobile Safari (iOS): Latest 2 versions
- Chrome Mobile (Android): Latest 2 versions

---

## 📝 Notes

**Open Questions from Epic (Resolved):**

**Q1: Can advisors mark conversations as "priority" or "urgent"?**
- ✅ **Resolved**: Not in initial release (future enhancement)

**Q2: Can family members initiate conversations with advisors?**
- ✅ **Resolved**: YES - family members can start conversations with their advisors

**Q3: What happens when advisor loses family access?**
- ✅ **Resolved**: Conversation history preserved (read-only), new messages disabled (separate story for access revocation handling)

**Q4: Should system prevent duplicate conversations with same participants?**
- ✅ **Resolved**: Not in initial release, users can create multiple conversations with same participants

**Additional Context:**
- This story is foundational - subsequent stories will cover:
  - Sending messages in existing conversations
  - Adding participants to existing conversations
  - Conversation search and filtering
  - Message notifications and real-time updates
  - Read-only access for expired advisor relationships

**Assumptions:**
- Communication Service (port 8004) backend API already supports conversation creation
- Frontend has access to user roles and family associations via JWT context
- Notification Service can handle push/in-app notification delivery
- Advisor-family association data is accessible from auth/advisor-portal services

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-24  
**Story Status:** Ready for Grooming