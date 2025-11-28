# Epic: Advisor-Family Messaging System

---

## 📋 Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** Advisor-Family Messaging System  
**Summary:** Enable real-time messaging between advisors and family members with conversation management, search, and multi-family support  
**Parent User Journey:** FG-UJ-XXX [To be created: Advisor-Family Communication Journey]  
**Priority:** High  
**Epic Link:** FG-EPIC-XXX

---

## 🎯 Epic Goal

**What will this Epic deliver?**

A comprehensive messaging system for Advisor Portal that enables real-time communication between advisors and their associated families. Advisors can initiate conversations with individual family members or entire families, manage multiple conversations across their family portfolio, and maintain message history even after engagement ends.

**User-facing value:**
- Advisors can communicate with families directly through platform
- Family members receive instant notifications about advisor messages
- Advisors can manage conversations across multiple families from one interface
- Searchable message history for all past and present family engagements

**Business value:**
- Reduces reliance on external communication tools (email, WhatsApp, etc.)
- Creates audit trail of advisor-family communications
- Increases platform stickiness for both advisors and families
- Enables better service delivery through integrated communication

**Scope boundaries:**

**✅ IN SCOPE:**
- 1-to-1 conversations (advisor ↔ single family member)
- Group conversations (advisor ↔ multiple family members)
- Adding entire family to conversation with one click
- Adding multiple advisors to conversation
- Real-time message delivery with instant notifications
- Conversation search and filtering by family
- Message history preservation (even after engagement ends)
- Integration with Communication Service (port 8004)
- In-app and push notifications
- Family members can initiate conversations with advisors

**❌ OUT OF SCOPE:**
- File attachments (future enhancement)
- Voice/video calls
- Message editing/deletion
- Conversation archiving
- Read receipts (future enhancement)
- Typing indicators (future enhancement)
- Emoji reactions (future enhancement)
- Priority/urgent conversation marking (future enhancement)

---

## 👥 Target Users

**Primary Personas:**
- **Personal Family Advisor** - Communicates with invited family + marketplace booking families
- **External Consul** - Communicates with invited family + marketplace booking families
- **Consultant** - Communicates with families from active bookings + managed families (Premium)

**Secondary Personas:**
- **Family Member** - Initiates and responds to advisor messages
- **Family Council Member** - Initiates and responds to advisor messages

---

## 📖 User Stories (High-Level)

### Core Messaging

1. **As an** advisor or family member, **I want to** start a new conversation by selecting participants (specific family members, entire family, or multiple advisors), **so that** I can communicate efficiently with the right people about specific topics

2. **As an** advisor, **I want to** view all my conversations organized by family with real-time message updates, **so that** I can manage communications across my entire family portfolio from one interface

3. **As an** advisor or family member, **I want to** send and receive messages instantly with automatic notifications, **so that** I can have timely, responsive communications

### Discovery & History

4. **As an** advisor, **I want to** search my message history and filter conversations by family, **so that** I can quickly find past discussions and reference previous advice

5. **As an** advisor, **I want to** access conversation history with families I no longer actively serve (read-only), **so that** I can reference past engagements if families return or for my own records

---

## 🔗 Dependencies

**Technical Dependencies:**
- Communication Service (port 8004) - backend for conversations and messages
- Notification Service (port 8010) - real-time push and in-app notifications
- Auth Service (port 8001) - JWT validation, family_id context, advisor-family associations

**Data Dependencies:**
- Advisor-family associations (from advisor-portal-service, port 8011)
- Family member registry (from auth-service)
- Active booking data (for Consultant access validation)

**UI Dependencies:**
- Family dropdown component (select family to message)
- Real-time message list component
- Message input with send functionality
- Conversation list with search/filter

---

## 🎨 Design & UX

**UX Notes:**

**User flows:**

**Flow 1: Start New Conversation (Advisor or Family Member)**
1. User clicks "New Conversation" button
2. Modal opens with "Select Family" dropdown (advisors) or advisor selection (family members)
3. User selects participants (specific members or "Add Entire Family")
4. User optionally enters "Conversation Title"
5. User types "First Message" (required)
6. User clicks "Start Conversation"
7. System creates conversation, sends first message, notifies participants
8. Conversation appears in list, user can continue messaging

**Flow 2: View & Respond to Conversations**
1. User opens Messages from navigation
2. Left panel shows conversation list (searchable, filterable by family for advisors)
3. User selects conversation from list
4. Right panel shows message thread
5. User types and sends reply
6. Participants receive instant notifications

**Flow 3: Add Participants to Conversation**
1. User opens existing conversation
2. Clicks "Add Participants" (family members or other advisors)
3. Selects from available participants
4. Participants added, receive notification about conversation

**Key UI States:**
- Empty state: "No conversations found" with prompt to start first conversation
- Loading state: Skeleton loaders for conversation list and messages
- Error state: Failed to send message, retry option
- Placeholder state: "Select a conversation" when no conversation selected

---

## 📧 Notifications

**Does this Epic involve user notifications?** Yes

| Trigger | Recipient | Format | Description |
|---------|-----------|--------|-------------|
| New message sent in conversation | All conversation participants (except sender) | In-App + Push | "[Sender Name]: [Message preview]" |
| New participant added to conversation | Newly added participant | In-App + Push | "You were added to conversation: [Conversation Title or default]" |

**Notification Configuration Notes:**
- **Default notification preferences:** All users receive in-app + push by default
- **User opt-out capability:** Yes, users can manage notification preferences in settings
- **Frequency limits:** Real-time delivery (no batching), but platform may implement rate limiting to prevent spam
- **Localization requirements:** English (default), future: support family's preferred language

---

## 🧮 Business Rules

**Key Business Rules:**

### Advisor Access Control
1. **Advisor can message families only if:**
   - Advisor is Personal Family Advisor invited by family, OR
   - Advisor is External Consul invited by family, OR
   - Advisor is Consultant with active booking from family, OR
   - Advisor is Premium Consultant managing family portal
   
2. **Multi-role advisors:**
   - If advisor serves family in multiple capacities (e.g., Personal FA + Consultant), one unified access applies
   - Advisor sees all conversations with that family regardless of role

3. **Post-engagement access:**
   - Advisor retains **read-only** access to conversation history after engagement ends
   - Advisor **cannot send new messages** to families they no longer actively serve
   - Exception: If family re-engages advisor, messaging access automatically restores
   - **Conversation history preserved** - no deletion when access removed

### Family Member Access
4. **Family members can initiate conversations:**
   - Family members can start new conversations with their advisors
   - Family members see only advisors currently serving their family
   - Family members can add other family members to conversations

### Conversation Participants
5. **Participant rules:**
   - All Family Members (including Family Council Members) can participate
   - Advisor or family member can select specific members or add entire family with one click
   - Multiple advisors can participate in same conversation
   - Any participant can add other participants (if they have access to those users)

### Data Isolation (CRITICAL)
6. **Family-based isolation:**
   - All conversations filtered by family_id
   - Advisor can only create/view conversations for families they have access to
   - No cross-family data leakage in search or conversation list

7. **Conversation history persistence:**
   - Conversations preserved indefinitely (no automatic deletion)
   - Visible to all original participants even after engagement ends
   - No archiving in initial release

### Message Validation
8. **First message requirement:**
   - New conversations must include initial message (cannot create empty conversation)
   - Message must be non-empty text (minimum 1 character)

9. **Conversation title:**
   - Optional custom title
   - If blank, system generates default: "Conversation with [Family Name]" or "[Initiator Name] - [Date]"

### Notifications
10. **Real-time delivery:**
    - Messages delivered instantly via WebSocket or polling
    - In-app notifications appear immediately
    - Push notifications sent within seconds

11. **Notification recipients:**
    - All conversation participants receive notifications (except sender)
    - Users can opt-out in preferences but conversations remain accessible

---

## 📝 Notes

**Technical Implementation Notes:**
- Use existing Communication Service (port 8004) for backend
- Leverage advisor-family associations from advisor-portal-service (port 8011)
- Ensure multi-tenancy: all queries filtered by family_id and advisor access
- Consider WebSocket for real-time messaging or short polling as fallback

**Future Enhancements (Out of Scope):**
- File attachments (documents, images)
- Read receipts and typing indicators
- Message editing and deletion
- Conversation archiving
- Voice/video calls integration
- Emoji reactions
- Message threading/replies
- Rich text formatting
- Priority/urgent conversation marking

**Resolved Questions:**
- ✅ Advisors cannot mark conversations as "priority" or "urgent" in initial release
- ✅ Family members CAN initiate conversations with advisors
- ✅ When advisor loses family access: conversation history preserved, new messages disabled

**Assumptions:**
- Communication Service already supports multi-participant conversations
- Notification Service can handle high-frequency push notifications
- Advisor Portal frontend supports real-time updates (WebSocket or polling)
- Family Portal has similar messaging interface (separate implementation)

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-24  
**Epic Status:** Draft - Ready for Review
