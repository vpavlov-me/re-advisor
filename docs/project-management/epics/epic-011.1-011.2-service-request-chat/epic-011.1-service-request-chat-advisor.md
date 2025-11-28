# EPIC-011.1: Service Request Chat (Advisor Side)

---

## 📋 Basic Information

**Issue Type:** Epic
**Project:** FG
**Epic Name:** Service Request Chat for Advisors
**Summary:** Enable advisors to communicate with families through dedicated chat for each Service Request from Marketplace
**Parent Epic:** EPIC-011 (Advisor-Family Messaging System)
**Related EPICs:**
- EPIC-011 (Base messaging system - prerequisite)
- EPIC-011.2 (Family side of Service Request chat)
- EPIC-012-MVP1 (Service Booking)
- EPIC-013-MVP1 (Request Review - Advisor)
- EPIC-016-MVP1 (Service Delivery - Advisor)
- EPIC-018B-MVP1 (Post-Completion - Advisor)

**Priority:** High
**Epic Link:** FG-EPIC-011.1

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Enable Consultants to communicate with families through automatic, contextual chat for each Service Request. When a family books a service, a dedicated chat is created where the Consultant can discuss service details, clarify scope, share updates, and coordinate delivery throughout the service lifecycle.

**User-facing value:**
- Consultants have dedicated chat for each Service Request
- Chat accessible from Service Request detail pages in Consultant Portal
- Service context visible (service name, price, status, deliverables) within chat
- Chat remains active during service delivery, becomes read-only after completion
- All service-related discussions in one place for easy reference

**Business value:**
- Replaces email-based communication, reducing response time
- Creates audit trail of all service discussions
- Improves service delivery through integrated communication
- Consultant can manage multiple Service Request chats from one inbox
- Reduces miscommunication through contextual conversations

**Scope boundaries:**

**✅ IN SCOPE (Advisor Side):**
- Automatic addition to Service Request chat when Service Request created
- Chat access from Request Review, Service Delivery, and Post-Completion pages
- View service context panel (service details, status, deliverables)
- Send and receive messages with family participants
- View all participants in the chat
- Cannot add or remove participants (family controls collaboration)
- Filter Messages inbox to show only Service Request chats
- Notifications for new messages and status changes
- Read-only access after service completion for audit

**❌ OUT OF SCOPE:**
- Participant management (only Family can add/remove)
- General conversations (handled by base EPIC-011)
- File attachments (use external links)
- Video/voice calls

---

## 👥 Target Users

**Primary Persona:**
- **Consultant** - Marketplace advisor who delivers services to families and needs to communicate about service scope, deliverables, and completion

**Secondary Personas:**
- **Family Admin** - Service booking user and chat participant (covered in EPIC-011-V2F)
- **Family Council** - Service booking user and chat participant (covered in EPIC-011-V2F)
- **Other Family Admins/Council** - Can be added to chat by booking user (covered in EPIC-011-V2F)

---

## 📖 User Stories (High-Level)

### Automatic Chat Access

1. **As a** Consultant, **when I** receive a new Service Request, **the system should** automatically add me to a dedicated chat with the family, **so that** I can communicate about the service without exchanging email addresses

### Contextual Communication

2. **As a** Consultant, **I want to** see service context (service name, price, current status, deliverables count) within the chat interface, **so that** I can reference service details while discussing with the family

3. **As a** Consultant, **I want to** access the Service Request chat directly from Request Review and Service Delivery pages, **so that** I can easily respond to family questions during service execution

### Lifecycle Communication

4. **As a** Consultant, **I want to** use the chat throughout the service lifecycle (pending → in progress → delivered → completed), **so that** all discussions are in one thread

5. **As a** Consultant, **when the** service is completed and paid, **I want** the chat to become read-only but remain accessible, **so that** I can reference past discussions if the family returns for future services

### Discovery & Navigation

6. **As a** Consultant, **I want to** filter my Messages inbox to show only Service Request chats, **so that** I can prioritize service-related communications over general conversations

7. **As a** Consultant, **I want to** see Service Request chats labeled with service name and current status, **so that** I can quickly identify urgent services or pending deliveries

---

## 🔗 Dependencies

**Upstream Dependencies:**
- **EPIC-011 (CRITICAL):** Base messaging system must be implemented
- **EPIC-012-MVP1 (CRITICAL):** Service booking creates Service Requests that trigger chat creation
- **EPIC-011.2:** Family side of Service Request chat (parallel development)

**Downstream Impact:**
- EPIC-013-MVP1 (Request Review) needs "Chat with Family" button
- EPIC-016-MVP1 (Service Delivery) needs "Chat with Family" button
- EPIC-018B-MVP1 (Post-Completion) shows read-only chat access

**Technical Dependencies:**
- Messaging infrastructure from EPIC-011
- Service Request data access
- Notification system

---

## 📐 Design & UX

**UX Notes:**

**User Flow 1: Receive Service Request & Auto-Join Chat**
1. Family books service (EPIC-012-MVP1)
2. System creates Service Request
3. System automatically creates chat and adds Consultant + booking family user
4. Consultant receives notification: "New service request from Family [Name] - Chat created"
5. Notification includes link to Request Review page or direct chat link
6. Consultant clicks link → Opens Request Review page with "Chat with Family" button OR opens chat directly

**User Flow 2: Access Chat from Request Review Page**
1. Consultant navigates to Request Review page (EPIC-013-MVP1)
2. Page shows Service Request details (family, service, notes, status)
3. Header shows "Chat with Family" button
4. Click button → Chat opens (sidebar, modal, or dedicated page):
   - **Header:**
     - Family name
     - Service name as subtitle
     - Current service status badge
   - **Service Context Panel (Collapsible):**
     - Service name
     - Total price
     - Current status with icon
     - Deliverables count
     - "View Full Request Details" link
   - **Participants List:**
     - Shows all family participants (Admin/Council members)
     - Note: "Only family can manage participants"
   - **Message Thread:**
     - Chronological messages
     - Empty state: "Start the conversation with [Family Name]"
   - **Message Composer:**
     - Text input with formatting (bold, italic, lists)
     - Send button
5. Consultant can type and send messages

**User Flow 3: Access Chat from Service Delivery Page**
1. Consultant navigates to Service Delivery page (EPIC-016-MVP1) for active service
2. Page shows service details, deliverables upload section
3. "Chat with Family" button in action bar
4. Click → Opens same chat interface as User Flow 2
5. Use cases:
   - Ask clarification before delivering
   - Notify family of progress
   - Coordinate deliverable review

**User Flow 4: Access Chat from Messages Inbox**
1. Consultant opens "Messages" from navigation
2. Inbox shows all conversations (general + Service Request types)
3. Service Request chats have visual indicators:
   - Icon: Service/marketplace icon
   - Label: "[Service Name]"
   - Subtitle: Family name + status (e.g., "Smith Family - In Progress")
   - Badge: Color-coded by status (yellow=pending, blue=in progress, green=delivered)
4. Can filter: "All" / "General Conversations" / "Service Requests"
5. Can sort by: Recent activity, Service status, Family name
6. Click conversation → Opens full chat with Service Context panel

**User Flow 5: Chat Lifecycle**

**Phase 1: Pending Consultant Confirmation**
- Chat active immediately after Service Request created
- Consultant can message family to clarify scope before accepting

**Phase 2: In Progress**
- Chat active for coordination during service delivery
- Use cases: Progress updates, questions about deliverables, timeline adjustments

**Phase 3: Delivered**
- Chat active while family reviews deliverables
- Consultant can respond to family questions about deliverables

**Phase 4: Completed & Paid (Read-only)**
- Chat becomes read-only permanently
- Visual indicator: "Service completed - This conversation is now read-only"
- Message composer disabled with explanation
- Past messages remain visible for reference
- Consultant retains access for audit/future reference

**Phase 5: Declined/Cancelled (Read-only)**
- Chat immediately read-only
- History preserved

**Key UI Elements:**
- **Service Status Badge:** Color-coded chip showing current Service Request status
- **Service Context Panel:** Collapsible sidebar with service info
- **Participants List:** Shows family participants (view-only for Consultant)
- **Read-only Banner:** Shown when service completed
- **Unread Message Badge:** On Service Request cards in inbox and detail pages

---

## 🔔 Notifications

**Does this Epic involve user notifications?** Yes

| Trigger | Recipient | Format | Description |
|---------|-----------|--------|-------------|
| Service Request chat created | Consultant | Email + In-App | "New service request from Family [Name] - Chat created for [Service Name]" |
| New message from family | Consultant | Email + In-App + Push | "[Family Member Name] sent a message about [Service Name] - [Preview]" |
| Family added new participant | Consultant | In-App | "[Family Member] added [New Participant] to [Service Name] chat" |
| Service Request status changed | Consultant | In-App + System message in chat | "Service status changed to [New Status]" |
| Chat became read-only | Consultant | In-App | "[Service Name] completed - Chat is now read-only" |

**Notification Configuration Notes:**
- Inherits notification preferences from base EPIC-011
- Service updates (status changes) cannot be disabled
- Consultant can mute specific Service Request chats
- Push notifications for time-sensitive messages

---

## 🧮 Business Rules

**Chat Access:**
1. **Automatic participation:**
   - Consultant automatically added to chat when Service Request created
   - Cannot leave or remove themselves from the chat
   - Participation mandatory for service delivery

2. **Viewing participants:**
   - Consultant can see all family participants in the chat
   - Cannot see why specific family members were added
   - Participant list updates in real-time when family adds/removes members

**Communication Rules:**
3. **Message permissions:**
   - Can send and receive messages during active service phases
   - Cannot send messages after service completion (read-only)
   - Message length limit: 5,000 characters (same as EPIC-011)
   - Formatting: Bold, italic, lists
   - Links allowed, file uploads not supported

4. **Service context visibility:**
   - Service name, price, status always visible in context panel
   - Deliverables count shown (links to deliverables section)
   - Status updates automatically posted as system messages

**Participant Management:**
5. **No participant control:**
   - Cannot add family members to chat
   - Cannot remove family members from chat
   - Cannot leave chat voluntarily
   - Family controls all participant management (EPIC-011-V2F)

**Lifecycle Rules:**
6. **Active chat phases:**
   - Pending Consultant Confirmation → Active
   - Awaiting Family Approval → Active
   - In Progress → Active
   - Delivered → Active

7. **Read-only phases:**
   - Completed & Paid → Read-only (permanent)
   - Cancelled by Family → Read-only (permanent)
   - Declined by Consultant → Read-only (permanent)
   - Auto-declined/Auto-cancelled → Read-only (permanent)

8. **Read-only behavior:**
   - Message composer disabled
   - Past messages fully visible
   - Service context still displayed
   - Can reference history for future engagements

**Discovery & Filtering:**
9. **Inbox organization:**
   - Service Request chats appear in main Messages inbox
   - Can filter by type: "Service Requests" vs "General Conversations"
   - Can search by service name or family name
   - Can sort by status, recent activity

10. **Multiple chats per family:**
    - If Consultant delivers multiple services to same family → Multiple separate chats
    - Each Service Request = separate chat
    - No bundling or merging of chats

**History Preservation:**
11. **Long-term storage:**
    - All Service Request chats preserved indefinitely
    - Consultant retains read-only access after service ends
    - Cannot delete chat or messages
    - Audit trail for compliance and quality assurance

---

## 📝 Notes

**Integration with Advisor Portal:**
- Chat buttons added to Request Review, Service Delivery, Post-Completion pages
- Unread message indicators on Service Request cards
- Service Request list view shows "N unread messages" badge

**Replaces Email Communication:**
- Previously: Contact info exchanged via email, external communication
- Now: All service discussions tracked in platform
- Benefit: Audit trail, faster responses, no lost emails

**Multi-Service Handling:**
- Consultant serving same family for multiple services → Multiple separate chats
- Each chat isolated to specific Service Request
- Can reference past service chats when family rebooks

**Future Enhancements (Out of Scope):**
- Quick reply templates ("Deliverables ready for review", "Estimated completion: [date]")
- Voice/video calls within chat
- @mention family members for attention
- Rich service update cards (deliverable uploaded, milestone completed)

**Open Questions:**
- Should Consultant see which family member is online/viewing chat? **Decision: No presence indicators in initial release**
- Should there be automated reminders if family doesn't respond for X days? **Decision: No automated reminders in initial release**

**Assumptions:**
- Consultants comfortable managing multiple Service Request chats (up to 10-20 active)
- Text chat sufficient for most service coordination
- External links adequate for sharing resources
- Consultant checks Messages inbox at least once daily
- Read-only access after completion acceptable (new general conversation if needed)

**Integration with EPIC-011 Base System:**
- Shares same Messages inbox with general conversations
- Same notification preferences
- Same search and filter infrastructure
- Different business rules: no participant control, lifecycle-based read-only

**Key Testing Scenarios:**
1. Receive new Service Request → Verify chat auto-created and accessible
2. Send message to family → Verify family receives notification
3. Family adds Council member → Verify Consultant sees updated participant list
4. Service completed → Verify chat becomes read-only, composer disabled
5. Access chat from Request Review page → Verify context panel shows service info
6. Filter inbox by "Service Requests" → Verify only Service Request chats shown
7. Multiple services with same family → Verify separate chats for each service

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-27
**Epic Status:** Draft - Ready for Review
**Story Points Estimate:** 5 SP

**Dependencies:**
- ⏳ Requires EPIC-011 (Base Messaging System)
- ⏳ Requires EPIC-012-MVP1 (Service Booking)
- 🔄 Parallel with EPIC-011.2 (Family side)

**Implementation Sequence:**
1. EPIC-011 - Base messaging infrastructure
2. EPIC-012-MVP1 - Service Request creation flow
3. **EPIC-011.1 + EPIC-011.2** - Service Request chat (both sides in parallel)
4. Update related EPICs - EPIC-013, 016, 018B already updated with chat buttons
