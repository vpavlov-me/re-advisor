# User Story: Advisor Conversations Dashboard

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As an advisor, I want to view all my conversations organized by family with real-time message updates  
**Epic Link:** FG-EPIC-XXX [Advisor-Family Messaging System]  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As an** advisor (Personal Family Advisor, External Consul, or Consultant),  
**I want to** view all my conversations organized by family with real-time message updates,  
**so that** I can manage communications across my entire family portfolio from one centralized interface without missing important messages.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point being solved:**
- Advisors working with multiple families struggle to track conversations across different families
- Missing important client messages leads to delayed responses and poor service quality
- Using external tools (email, WhatsApp) fragments communication and makes it hard to find past discussions
- No central view of "what needs my attention" across all families

**Business outcome expected:**
- Improved advisor responsiveness to family communications
- Reduced time spent searching for past conversations
- Increased client satisfaction through timely responses
- Platform becomes primary communication channel (reduces external tool dependency)

**Strategic alignment:**
- Core platform value: centralized family governance and advisor collaboration
- Competitive advantage: integrated communication reduces need for external tools
- Retention: advisors stay on platform if communication is seamless

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** I am an advisor logged into Advisor Portal,  
   **When** I navigate to Messages section,  
   **Then** I see a two-panel interface:
   - Left panel: list of all my conversations
   - Right panel: placeholder "Select a conversation to view messages"

2. **Given** I have conversations with multiple families,  
   **When** I view the conversation list,  
   **Then** each conversation displays:
   - Conversation title (custom or default: "Conversation with [Family Name]")
   - Family name
   - Last message preview (truncated to ~50 characters)
   - Timestamp of last message
   - Unread message indicator (if applicable)

3. **Given** I am viewing the conversation list,  
   **When** conversations are grouped by family,  
   **Then** I see:
   - Family name as section header
   - All conversations with that family grouped under header
   - Families sorted by most recent activity (newest first)

4. **Given** I select a conversation from the list,  
   **When** the conversation loads,  
   **Then** I see:
   - Complete message thread in chronological order
   - Participant names and avatars for each message
   - Timestamps for each message
   - Input field to send new message at bottom

5. **Given** I am viewing a conversation,  
   **When** a new message is received in real-time,  
   **Then**:
   - Message appears instantly in the thread without page refresh
   - Conversation moves to top of list
   - Unread indicator appears if I'm viewing different conversation
   - In-app notification appears

6. **Given** I have no conversations yet,  
   **When** I open Messages section,  
   **Then** I see empty state message:
   - "No conversations yet"
   - "Start a conversation with a family" button
   - Helpful illustration or icon

7. **Given** I have conversations with families I no longer actively serve,  
   **When** I view conversation list,  
   **Then**:
   - These conversations still appear in the list
   - They are marked as "Read-only" or "Inactive engagement"
   - I can view message history but cannot send new messages

**Additional Criteria:**
- [ ] Conversation list is scrollable and supports pagination (load more conversations on scroll)
- [ ] Real-time updates work within 2 seconds of message being sent
- [ ] Interface is responsive and works on desktop and tablet views
- [ ] Loading states show skeleton loaders while conversations load
- [ ] Error state shows "Failed to load conversations" with retry option if backend fails

---

## 🔒 Business Rules

**Conversation Visibility:**
1. **Multi-family access**: Advisor sees conversations from ALL families they have/had access to:
   - Personal Family Advisor: invited family + marketplace bookings
   - External Consul: invited family + marketplace bookings
   - Consultant: all managed families + marketplace bookings

2. **Conversation isolation**: Each conversation is tied to specific family_id
   - Advisors cannot see conversations from families they never had access to
   - Multi-tenancy enforced: queries automatically filter by advisor's associated families

3. **Historical access**: Conversations remain visible even after engagement ends:
   - Personal FA/External Consul: still see conversations after family invitation expires
   - Consultant: still see conversations after service booking completes
   - **Restriction**: Read-only access (can view but not send new messages)

**Real-time Updates:**
4. **Message delivery**: New messages appear in real-time via WebSocket or short polling (fallback)
   - Update frequency: check every 3-5 seconds if WebSocket unavailable
   - No page refresh required

5. **Notification triggers**: System sends in-app notification when:
   - New message received in any conversation
   - User is not currently viewing that specific conversation
   - Notification shows: sender name, family name, message preview

**Conversation Ordering:**
6. **Sort by activity**: Conversations sorted by most recent message timestamp (descending)
   - Conversation with newest message appears at top
   - Unread conversations may be prioritized (future enhancement)

**Authorization:**
- **Who can view**: Only advisors with active OR past family associations
- **Who can send messages**: Only advisors with ACTIVE family associations
- **Who can view history**: Advisors with any past association (read-only)

**Edge Cases:**
- **Advisor loses family access mid-conversation**: Can view existing messages (read-only), cannot send new messages
- **Family deleted/archived**: Conversations remain visible but marked as "Family Archived"
- **No conversations exist**: Show empty state with clear call-to-action
- **Real-time update fails**: Show "Connection lost" indicator, retry automatically

---

## 🎨 Design & UX

**User Flow:**
1. Advisor navigates to Messages from main navigation
2. Left panel loads with conversation list (grouped by family)
3. Advisor clicks on a conversation
4. Right panel loads message thread
5. Advisor reads messages and can respond (if access is active)
6. New messages appear in real-time without refresh
7. Advisor can switch between conversations using left panel

---

## 🧪 Test Scenarios

**Happy Path:**
1. Advisor with 3 families logs in → Opens Messages → Sees conversations grouped by all 3 families → Selects conversation from Family A → Sees message thread → New message arrives from Family B → Conversation list updates → Unread indicator appears on Family B conversation

**Negative Tests:**
1. **No conversations**: Advisor with no message history → Opens Messages → Sees empty state with "Start conversation" prompt
2. **Backend failure**: API fails to load conversations → User sees error message "Failed to load conversations" with retry button
3. **Real-time connection lost**: WebSocket disconnects → System falls back to polling → User sees "Reconnecting..." indicator

**Edge Cases:**
1. **Read-only access**: Advisor with expired family engagement → Opens conversation with that family → Sees message history → Message input is disabled with tooltip "Engagement ended - view only"
2. **Family archived**: Conversation with deleted family → Shows in list marked "Family Archived" → Can still view messages
3. **Pagination**: Advisor with 100+ conversations → Scrolls to bottom of list → System loads next batch of 20 conversations

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Conversation list loads within 2 seconds
- Message thread loads within 1 second
- Real-time updates appear within 2 seconds of message being sent

**Security:**
- All conversations filtered by advisor's family associations
- JWT validation required for all requests
- Read-only enforcement for expired engagements

**Scalability:**
- Support advisors with 50+ active families
- Handle 1000+ conversations per advisor
- Efficient pagination for large conversation lists

**Browser Support:**
- Chrome (latest 2 versions)
- Safari (latest 2 versions)
- Firefox (latest 2 versions)

---

## 📝 Notes

**Key Assumptions:**
- Communication Service (port 8004) backend exists and supports multi-participant conversations
- Advisor-family associations are tracked in advisor-portal-service (port 8011)
- Notification Service (port 8010) can deliver real-time in-app notifications
- WebSocket infrastructure exists or polling fallback is acceptable

**Out of Scope for This Story:**
- Creating new conversations (separate story)
- Sending messages (separate story)
- Search and filter functionality (separate story)
- File attachments, read receipts, typing indicators
- Conversation archiving or deletion

**Open Questions (Answered from Epic):**
- ✅ **Q:** Can advisors mark conversations as "priority" or "urgent"?  
  **A:** No, not in initial release (future enhancement)

- ✅ **Q:** What happens when advisor loses family access?  
  **A:** Conversation history preserved, can view but not send new messages (read-only mode)

- ✅ **Q:** How are conversations grouped if advisor has 10+ families?  
  **A:** Grouped by family name, sorted by most recent activity, with scrollable list

- ✅ **Q:** Can family members initiate conversations with advisors?  
  **A:** Yes (separate story for family-side creation)

- ✅ **Q:** How often do real-time updates check for new messages?  
  **A:** WebSocket (instant), or polling every 3-5 seconds as fallback

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-24
