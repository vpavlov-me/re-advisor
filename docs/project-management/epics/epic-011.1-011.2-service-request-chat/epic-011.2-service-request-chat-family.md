# EPIC-011.2: Service Request Chat (Family Side)

---

## 📋 Basic Information

**Issue Type:** Epic
**Project:** FG
**Epic Name:** Service Request Chat for Family
**Summary:** Enable families to communicate with consultants through dedicated chat for each Service Request from Marketplace
**Parent Epic:** EPIC-011 (Advisor-Family Messaging System)
**Related EPICs:**
- EPIC-011 (Base messaging system - prerequisite)
- EPIC-011.1 (Advisor side of Service Request chat)
- EPIC-012-MVP1 (Service Booking - Family)
- EPIC-015-MVP1 (Final Approval - Family)
- EPIC-016B-MVP1 (Service Monitoring - Family)
- EPIC-018-MVP1 (Completion & Payment - Family)

**Priority:** High
**Epic Link:** FG-EPIC-011.2

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Enable families (Admin and Council members) to communicate with consultants through automatic, contextual chat for each Service Request. When a family user books a service, a dedicated chat is created where they can discuss service details, ask questions, coordinate delivery, and manage who from the family participates in discussions.

**User-facing value:**
- Family has dedicated chat for each booked service
- Chat accessible from Service Booking, Final Approval, and Service Monitoring pages
- Service context visible (service name, price, status, deliverables) within chat
- Booking user can add/remove other family members to/from chat
- Chat remains active during service, becomes read-only after completion
- All service-related discussions in one place

**Business value:**
- Replaces email-based communication, eliminating need to exchange contact info
- Creates audit trail of service decisions and discussions
- Enables collaborative decision-making (multiple family members can participate)
- Improves service delivery through clear communication
- Reduces miscommunication through contextual conversations

**Scope boundaries:**

**✅ IN SCOPE (Family Side):**
- Automatic chat creation when family books service
- Booking user (Admin or Council) added as initial participant
- Booking user can add other Admins or Council members to chat
- Booking user can remove other family participants (except Consultant)
- Chat access from Service Booking, Final Approval, Service Monitoring pages
- View service context panel (service details, status, deliverables)
- Send and receive messages with Consultant and family participants
- Filter Messages inbox to show only Service Request chats
- Notifications for new messages and status changes
- Read-only access after service completion for reference

**❌ OUT OF SCOPE:**
- General conversations (handled by base EPIC-011)
- Pre-booking inquiries (use general chat from EPIC-011)
- File attachments (use external links)
- Video/voice calls
- Removing the Consultant from chat

---

## 👥 Target Users

**Primary Personas:**
- **Family Admin** - Books services, manages chat participants, communicates with consultant (equal permissions with Council)
- **Family Council** - Books services, manages chat participants, communicates with consultant (equal permissions with Admin)

**Secondary Personas:**
- **Other Family Admins** - Can be added to chat by booking user to participate in discussions
- **Other Family Council Members** - Can be added to chat by booking user to participate in discussions
- **Regular Family Members** (non-Admin, non-Council) - Can only view Service Request chats in read-only mode via Service Request detail page, cannot be added as active participants
- **Consultant** - Service provider and chat participant (covered in EPIC-011-V2A)

---

## 📖 User Stories (High-Level)

### Automatic Chat Creation

1. **As a** Family Admin or Family Council member, **when I** book a service from the Marketplace, **the system should** automatically create a dedicated chat with the consultant, **so that** I can communicate about the service without exchanging email addresses

### Contextual Communication

2. **As a** Family Admin or Council member, **I want to** see service context (service name, price, current status, deliverables) within the chat interface, **so that** I can reference service details while discussing with the consultant

3. **As a** Family Admin or Council member, **I want to** access the Service Request chat directly from Service Monitoring and Final Approval pages, **so that** I can easily ask questions at any stage of service delivery

### Participant Management

4. **As a** Family Admin or Council member who booked the service, **I want to** add other Family Admins or Council members to the Service Request chat, **so that** they can participate in discussions and decision-making

5. **As a** Family Admin or Council member who booked the service, **I want to** remove other Family Admins or Council members from the Service Request chat, **so that** I can control who participates as the service progresses

6. **As a** Family Admin or Council member, **I want to** see all current participants in the chat, **so that** I know who can see the conversations

### Lifecycle Communication

7. **As a** Family Admin or Council member, **I want to** use the chat throughout the service lifecycle (booking → approval → delivery → completion), **so that** all discussions are in one thread

8. **As a** Family Admin or Council member, **when the** service is completed and paid, **I want** the chat to become read-only but remain accessible, **so that** I can reference past discussions

### Discovery & Navigation

9. **As a** Family Admin or Council member, **I want to** filter my Messages inbox to show only Service Request chats, **so that** I can prioritize service-related communications

10. **As a** Family Admin or Council member, **I want to** see Service Request chats labeled with service name and current status, **so that** I can quickly identify services that need attention

---

## 🔗 Dependencies

**Upstream Dependencies:**
- **EPIC-011 (CRITICAL):** Base messaging system must be implemented
- **EPIC-012-MVP1 (CRITICAL):** Service booking creates Service Requests that trigger chat creation
- **EPIC-011.1:** Advisor side of Service Request chat (parallel development)

**Downstream Impact:**
- EPIC-012-MVP1 (Service Booking) needs "Open Chat with Consultant" button on confirmation
- EPIC-015-MVP1 (Final Approval) needs "Open Chat to Discuss" button
- EPIC-016B-MVP1 (Service Monitoring) needs "Open Chat" button
- EPIC-018-MVP1 (Completion) shows read-only chat access

**Technical Dependencies:**
- Messaging infrastructure from EPIC-011
- Service Request data access
- Family member permissions and roles
- Notification system

---

## 📐 Design & UX

**UX Notes:**

**User Flow 1: Book Service & Auto-Create Chat**
1. Family Admin or Council member selects service from Marketplace (EPIC-011-MVP1)
2. Completes booking form, clicks "Confirm Booking"
3. System creates Service Request
4. System automatically creates chat and adds booking user + Consultant
5. Booking confirmation screen shows:
   - "Booking sent to [Consultant Name]!"
   - "Open Chat with Consultant" button (new)
6. Click button → Opens chat interface
7. Chat starts empty, ready for use

**User Flow 2: Access Chat from Service Monitoring Page**
1. Family user navigates to Service Monitoring (EPIC-016B-MVP1)
2. Clicks on Service Request card
3. Service Request detail page shows:
   - Service information
   - Consultant details
   - Deliverables section
   - **"Open Chat with Consultant" button** in header
4. Click button → Chat opens (sidebar, modal, or dedicated page):
   - **Header:**
     - Consultant name and avatar
     - Service name as subtitle
     - Current service status badge
     - **"Manage Participants" button** (only visible to booking user)
   - **Service Context Panel (Collapsible):**
     - Service name
     - Total price
     - Current status with icon
     - Deliverables count
     - "View Full Request Details" link
   - **Participants Section:**
     - Shows all participants (family members + Consultant)
     - Booking user sees "Add" / "Remove" options
     - Other participants see view-only list
   - **Message Thread:**
     - Chronological messages
     - System messages (status changes)
     - Empty state: "Start the conversation with [Consultant Name]"
   - **Message Composer:**
     - Text input with formatting
     - Send button
5. Family user can type and send messages

**User Flow 3: Access Chat from Final Approval Page**
1. Family Admin or Council navigates to Final Approval page (EPIC-015-MVP1)
2. Page shows consultant's proposal (services, price, access requirements)
3. **"Open Chat to Discuss" button** near proposal section
4. Click → Opens same chat interface as User Flow 2
5. Use cases:
   - Ask consultant about added services
   - Clarify price before approving
   - Discuss timeline or scope

**User Flow 4: Manage Chat Participants (Booking User Only)**
1. Booking user opens Service Request chat
2. Clicks "Manage Participants" button or "..." menu
3. Participants modal opens:
   - **Current Participants:**
     - Booking user (self) - "You (Creator)"
     - Consultant - marked "Cannot be removed"
     - Other family participants with "Remove" button
   - **Add Participants Section:**
     - "Add Family Member" button
4. To add participant:
   - Clicks "Add Family Member"
   - Dropdown shows available Family Admins and Council members (not already in chat)
   - Can select multiple
   - Clicks "Add to Chat"
   - System adds users, sends notification: "You were added to [Service Name] chat by [Booking User Name]"
   - Added users can immediately send messages
5. To remove participant:
   - Clicks "Remove" next to participant (except Consultant and self)
   - Confirmation modal: "Remove [Name] from this chat? They will still be able to view messages in read-only mode."
   - Clicks "Remove"
   - System removes user, sends notification: "You were removed from [Service Name] chat. You can still view messages in read-only mode."
   - Removed user loses send access, retains read-only view via Service Request page

**User Flow 5: Access Chat from Messages Inbox**
1. Family user opens "Messages" from navigation
2. Inbox shows all conversations (general + Service Request types)
3. Service Request chats have visual indicators:
   - Icon: Service/marketplace icon
   - Label: "[Service Name]"
   - Subtitle: Consultant name + status (e.g., "John Smith - In Progress")
   - Badge: Color-coded by status
4. Can filter: "All" / "General Conversations" / "Service Requests"
5. Can sort by: Recent activity, Service status, Consultant name
6. Click conversation → Opens full chat with Service Context panel

**User Flow 6: Chat Lifecycle**

**Phase 1: Pending Consultant Confirmation**
- Chat active immediately after booking
- Family can send initial questions about service

**Phase 2: Awaiting Family Approval**
- Chat active for discussing consultant's proposal
- Family can ask about added services or clarifications

**Phase 3: In Progress**
- Chat active for coordination during service delivery
- Family can ask for updates, discuss deliverables

**Phase 4: Delivered**
- Chat active while family reviews deliverables
- Family can ask consultant about results

**Phase 5: Completed & Paid (Read-only)**
- Chat becomes read-only permanently
- Visual indicator: "Service completed - This conversation is now read-only"
- Message composer disabled
- Explanation: "This service is complete. To discuss further, start a general conversation."
- Link to create general conversation (EPIC-011)
- Past messages remain visible for reference

**Phase 6: Declined/Cancelled (Read-only)**
- Chat immediately read-only
- History preserved for reference

**Key UI Elements:**
- **"Open Chat" Button:** Prominent placement on Service Request pages
- **Service Status Badge:** Color-coded showing current status
- **Service Context Panel:** Collapsible sidebar with key info
- **Manage Participants Button:** Only visible to booking user
- **Participants List:** Shows all family + consultant participants
- **Read-only Banner:** Shown when service completed
- **Unread Message Badge:** On Service Request cards

---

## 🔔 Notifications

**Does this Epic involve user notifications?** Yes

| Trigger | Recipient | Format | Description |
|---------|-----------|--------|-------------|
| Service Request chat created | Booking user + Consultant | In-App | "Chat created for [Service Name] - You can now discuss service details" |
| New message from consultant | All family participants | Email + In-App + Push | "[Consultant Name] sent a message about [Service Name] - [Preview]" |
| New message from family member | Other family participants + Consultant | Email + In-App + Push | "[Family Member] sent a message about [Service Name] - [Preview]" |
| Participant added to chat | Newly added participant | In-App + Push | "You were added to [Service Name] chat by [Booking User Name]" |
| Participant removed from chat | Removed participant | In-App | "You were removed from [Service Name] chat. You can still view messages in read-only mode." |
| Service Request status changed | All family participants | In-App + System message in chat | "Service status changed to [New Status]" |
| Chat became read-only | All family participants | In-App | "[Service Name] completed - Chat is now read-only" |

**Notification Configuration Notes:**
- Inherits notification preferences from base EPIC-011
- Service updates (status changes) cannot be disabled
- Family users can mute specific Service Request chats
- Push notifications for time-sensitive consultant messages

---

## 🧮 Business Rules

**Chat Creation:**
1. **Automatic creation:**
   - Chat automatically created when Service Request is created
   - Booking user (Admin or Council who clicked "Confirm Booking") added as initial family participant
   - Consultant automatically added
   - Chat starts empty (no first message required)
   - One chat per Service Request (no duplicates)

**Participant Management:**
2. **Initial participants:**
   - Family user who created the booking (Admin or Council - both can book services)
   - Consultant assigned to the Service Request

3. **Adding participants:**
   - **Only booking user can add participants**
   - Can add other Family Admins or Family Council members
   - Cannot add regular Family Members (non-Admin, non-Council)
   - Can add multiple at once
   - Added users receive notification
   - Added users can immediately send messages

4. **Removing participants:**
   - **Only booking user can remove participants**
   - Can remove other Family Admins or Council members
   - Cannot remove Consultant (permanent participant)
   - Cannot remove themselves
   - Removed users receive notification
   - Removed users retain read-only access via Service Request detail page

5. **Participant permissions:**
   - **Booking user (Admin or Council):** Full control (add/remove participants, send messages)
   - **Added participants (Admin/Council):** Can send messages, cannot manage participants
   - **Consultant:** Can send messages, cannot manage participants
   - **Removed participants (Admin/Council):** Read-only view via Service Request page
   - **Regular Family Members (non-Admin, non-Council):** Read-only view via Service Request page, cannot be added as participants

**Communication Rules:**
6. **Message permissions:**
   - All active participants can send and receive messages
   - Message length limit: 5,000 characters (same as EPIC-011)
   - Formatting: Bold, italic, lists
   - Links allowed, file uploads not supported

7. **Service context visibility:**
   - Service name, price, status always visible in context panel
   - Deliverables count shown (links to deliverables section)
   - Status updates automatically posted as system messages
   - Information refreshed when chat opened

**Lifecycle Rules:**
8. **Active chat phases:**
   - Pending Consultant Confirmation → Active
   - Awaiting Family Approval → Active
   - In Progress → Active
   - Delivered → Active

9. **Read-only phases:**
   - Completed & Paid → Read-only (permanent)
   - Cancelled by Family → Read-only (permanent)
   - Declined by Consultant → Read-only (permanent)
   - Auto-declined/Auto-cancelled → Read-only (permanent)

10. **Read-only behavior:**
    - Message composer disabled with explanation
    - "Manage Participants" button hidden
    - Past messages fully visible
    - Service context still displayed
    - Option to start new general conversation provided

**Discovery & Filtering:**
11. **Inbox organization:**
    - Service Request chats appear in main Messages inbox
    - Can filter by type: "Service Requests" vs "General Conversations"
    - Can search by service name or consultant name
    - Can sort by status, recent activity

12. **Multiple chats per consultant:**
    - If family books multiple services from same consultant → Multiple separate chats
    - Each Service Request = separate chat
    - No bundling or merging of chats

**History Preservation:**
13. **Long-term storage:**
    - All Service Request chats preserved indefinitely
    - All participants (including removed) retain read-only access
    - Cannot delete chat or messages
    - Audit trail for family records

**Access Control:**
14. **View-only access:**
    - **Regular Family Members** (non-Admin, non-Council) can view all family's Service Request chats via Service Request detail page
    - View-only users cannot send messages or manage participants
    - Cannot be added as active participants (only Admin/Council can be added)
    - **Admin and Council members** not in participant list can also view in read-only mode until added

---

## 📝 Notes

**Integration with Family Portal:**
- Chat buttons added to Service Booking confirmation, Final Approval, Service Monitoring pages
- Unread message indicators on Service Request cards
- Service Request list shows "N unread messages" badge

**Replaces Email Communication:**
- Previously: Contact info exchanged via email, external communication
- Now: All service discussions tracked in platform with family context
- Benefit: Collaborative decisions, audit trail, no lost emails

**Collaborative Decision-Making:**
- Booking user can involve Council members in service discussions
- Multiple family members can ask questions and provide input
- Consultant sees all family perspectives in one conversation
- Use case: Major service decisions (e.g., succession planning) benefit from Council participation

**Participant Management Use Cases:**
- **Add Council for input:** Booking Admin adds 2 Council members to discuss service scope
- **Remove after decision:** After approval, Admin removes participants to reduce noise
- **Different stages:** Add financial Council member when discussing price, remove later

**Future Enhancements (Out of Scope):**
- @mention specific family members in messages
- Quick reply templates ("When will deliverables be ready?", "Can you clarify scope?")
- Voice/video calls within chat
- Rich service update cards with interactive elements
- Chat export (download PDF of conversations)

**Open Questions:**
- Should removed participants be notified in the chat thread? **Decision: No, private notification only**
- Should there be limit on how many family members can be in chat? **Decision: No hard limit, recommended max 5-6 for manageable discussion**

**Assumptions:**
- Both Family Admin and Family Council have equal authority to book services
- Only booking user needs participant management control (prevents confusion)
- Family members comfortable with text-based communication
- Read-only access acceptable for removed participants (transparency)
- External links adequate for sharing documents

**Integration with EPIC-011 Base System:**
- Shares same Messages inbox with general conversations
- Same notification preferences
- Same search and filter infrastructure
- Different business rules: participant management, lifecycle-based read-only, service context

**Key Testing Scenarios:**
1. Family Admin books service → Verify chat created with Admin and Consultant
2. Family Council books service → Verify chat created with Council member and Consultant
3. Booking user adds another Council member → Verify added user receives notification and can send messages
4. Added Council member attempts to manage participants → Verify action not available
5. Booking user removes Council member → Verify removed user notified and has read-only access
6. Removed user views chat via Service Request page → Verify read-only access works
7. Send messages during active service → Verify all participants receive notifications
8. Service completed → Verify chat becomes read-only for all participants
9. Access chat from Final Approval page → Verify "Open Chat to Discuss" button works
10. Filter inbox by "Service Requests" → Verify only Service Request chats shown

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-27
**Epic Status:** Draft - Ready for Review
**Story Points Estimate:** 8 SP

**Dependencies:**
- ⏳ Requires EPIC-011 (Base Messaging System)
- ⏳ Requires EPIC-012-MVP1 (Service Booking)
- 🔄 Parallel with EPIC-011.1 (Advisor side)

**Implementation Sequence:**
1. EPIC-011 - Base messaging infrastructure
2. EPIC-012-MVP1 - Service Request creation flow
3. **EPIC-011.2 + EPIC-011.1** - Service Request chat (both sides in parallel)
4. Update related EPICs - EPIC-012, 015, 016B, 018 already updated with chat buttons
