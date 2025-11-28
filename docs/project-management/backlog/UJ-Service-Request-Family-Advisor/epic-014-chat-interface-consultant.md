# EPIC-014A: Real-time Chat for Service Engagement (Consultant Side)

## 📋 Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** Consultant Chat Interface for Family Communication  
**Summary:** Enable consultants to communicate with families through real-time chat integrated with service context  
**Parent User Journey:** JRN-FAM-002 - Family Marketplace Service Booking (Stages 2-8)  
**Priority:** Critical  
**Epic Link:** FG-EPIC-014A  
**Related Epic:** FG-EPIC-014F (Family chat interface)

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Enable consultants to communicate with families through contextual, real-time chat that integrates with service proposals, bookings, and delivery. This Epic delivers the consultant's communication hub for managing conversations with multiple families, ensuring professional communication and service context.

**User-facing value:**
- Consultants can chat with families they're actively engaged with
- Consultants see service context (proposals, bookings) within chat
- Consultants can send proposals and deliverables directly in chat
- Consultants manage conversations with multiple families from one inbox
- Consultants receive real-time notifications for family messages

**Business value:**
- Integrated chat reduces response time by 60% vs. email
- Context-aware messaging reduces miscommunication and clarification requests
- Proposal and deliverable sharing in chat streamlines workflow
- Chat history provides audit trail and service documentation

**Scope boundaries:**
- **Included:** Chat interface for service-related communication, multi-family conversation management, service context integration (proposals, bookings), proposal sending in chat
- **NOT included:** General chat functionality (covered in separate chat epic), deliverable sharing (handled in service request, EPIC-016A), video/voice calls, group chats with multiple consultants, file uploads (external links for communication only)

---

## 👥 Target Users

**Primary Personas:**
- Consultant (DOC-USR-006) - Communicates with families during service engagement

**Secondary Personas:**
- Family Admin/Council (DOC-USR-002) - Receives and responds to consultant messages (see EPIC-014F)

---

## 📖 User Stories (High-Level)

1. **As a** Consultant, **I want to** view all my active conversations with families in one inbox, **so that** I can manage communications efficiently across my client portfolio

2. **As a** Consultant, **I want to** see service context (active proposals, bookings, requests) within each chat, **so that** I can reference relevant information while communicating

3. **As a** Consultant, **I want to** send proposals directly within chat, **so that** I can respond to inquiries without switching interfaces

4. **As a** Consultant, **I want to** receive real-time notifications when families message me, **so that** I can respond promptly and maintain professional service

5. **As a** Consultant, **I want to** search chat history across all conversations, **so that** I can find past discussions and commitments quickly

---

## 🔗 Dependencies

**Upstream Dependencies:**
- EPIC-011F: Marketplace Discovery (families initiate first contact)
- Real-time communication infrastructure (WebSocket)
- Notification system

**Downstream Impact:**
- EPIC-012A: Service Proposal Management (proposals sent via chat)
- EPIC-013A: Service Request Lifecycle (service context shown in chat)
- EPIC-016A: Service Delivery (deliverable sharing via chat)

**Technical Dependencies:**
- WebSocket server for real-time messaging
- Chat message storage and retrieval
- Notification system integration
- Service context data retrieval
- File/link attachment system

---

## 📐 Design & UX

**Figma Links:**
- [To be created] Consultant Chat Inbox
- [To be created] Chat Conversation View
- [To be created] Service Context Panel
- [To be created] Proposal Sending Flow

**UX Notes:**

**User Flow - Chat Inbox:**
1. Consultant navigates to "Messages" in Consultant Portal
2. Inbox shows list of conversations with families:
   - **Sidebar (Left):**
     - Search bar at top
     - Filter tabs: All, Unread, Archived
     - Conversation list:
       - Family name and logo
       - Last message preview (1 line)
       - Timestamp
       - Unread badge count
       - Active service indicator (if ongoing)
   - **Main Area (Right):**
     - Selected conversation details
3. Conversations sorted by: Most recent activity first
4. Can search conversations by: Family name, message content, date

**User Flow - Chat Conversation:**
1. Select conversation from inbox
2. Conversation view shows:
   - **Header:**
     - Family name and logo
     - "View Profile" link (opens family's public info)
     - Service context dropdown (see active proposals/requests)
     - Options menu (Archive, Mark Unread, Block)
   - **Message Thread:**
     - Chronological messages (most recent at bottom)
     - For each message:
       - Sender name and avatar
       - Message text (with formatting)
       - Links/attachments
       - Timestamp
       - Read receipts (seen by family)
     - System messages (proposal sent, service started, etc.)
   - **Service Context Panel (Collapsible Right):**
     - Active proposals (status, expiration)
     - Active service requests (status, timeline)
     - Past services (quick reference)
     - Quick action: Create Proposal
   - **Message Composer (Bottom):**
     - Text input with basic formatting (bold, italic, lists)
     - Attach link button (for external resources related to discussion)
     - Send proposal button
     - Send button
3. Messages send in real-time
4. Typing indicators show when family is typing

**User Flow - Sending Proposal via Chat:**
1. In conversation, click "Create Proposal" button
2. Proposal builder opens (from EPIC-012A)
3. Complete proposal details
4. Click "Send to Family"
5. Proposal appears as special message card in chat:
   - "You sent a proposal"
   - Proposal summary (services, price)
   - Status badge (Sent, Under Review, Accepted, Declined)
   - "View Full Proposal" link
6. Family receives notification and can view/respond

**Key UI Elements:**
- **Inbox Sidebar:** Compact list with avatars, badges, timestamps
- **Message Bubbles:** Consultant messages right-aligned (blue), family left (gray)
- **System Messages:** Centered, distinct styling (proposal sent, service started)
- **Proposal Cards:** Rich preview with status, pricing, CTA
- **Typing Indicator:** "Family is typing..." animation
- **Read Receipts:** Small checkmarks (sent, delivered, read)
- **Context Panel:** Collapsible sidebar with service info
- **Attachment Button:** Paperclip icon for links only

---

## 📢 Notifications (if applicable)

**Does this Epic involve user notifications?** Yes

| Trigger | Recipient | Format | Description |
|---------|-----------|--------|-------------|
| New message from family | Consultant | Email + In-App + Push | "New message from Family [Name] - [Preview]" |
| Family viewed proposal | Consultant | In-App | "Family [Name] opened your proposal in chat" |
| Family responded to proposal | Consultant | Email + In-App + Push | "Family [Name] accepted/declined your proposal - [View Chat]" |
| Family asked question about service | Consultant | Email + In-App | "Family [Name] has a question about your service - [Reply Now]" |
| Unread messages reminder | Consultant | Email | "You have [X] unread messages from [Y] families" (daily digest) |
| Family left conversation inactive for 7 days | Consultant | In-App | "Follow up with Family [Name]? Last message 7 days ago" |

**Notification Configuration Notes:**
- Default: All notifications enabled
- Critical notifications (new message, proposal response) cannot be disabled
- Daily digest optional (can disable or set frequency)
- Inactive conversation reminders can be disabled
- Frequency limit: Max 5 notifications per day per family (batched)
- Quiet hours configurable (e.g., no notifications 10 PM - 8 AM local time)
- Localization: English only initially

---

## 🧮 Business Rules

**Conversation Access:**
1. Consultants can only chat with families who:
   - Initiated contact from consultant's marketplace profile, OR
   - Accepted consultant's proposal, OR
   - Have active service request with consultant
2. Chat access persists after service completion (for future re-engagement)
3. Family can block consultant (chat disabled, consultant notified)
4. Consultant cannot initiate new conversations (families must initiate)

**Message Sending:**
1. Maximum message length: 5,000 characters
2. Supported formatting: Bold, italic, bullet lists, numbered lists
3. Links allowed: No limit on number of links per message
4. No direct file uploads (external links only)
5. No images/videos/audio attachments (external links to these allowed)

**Proposal Integration:**
1. Proposals sent via chat automatically create proposal record (EPIC-012A)
2. Proposal status updates reflected in chat in real-time
3. Only 1 active proposal per family-consultant pair at a time
4. Old proposals archived when new proposal sent

**Read Receipts:**
1. Consultant can see when family members read messages
2. Shows "Read by [Name]" with timestamp
3. Multiple family members may read same message (all shown)
4. Read receipts cannot be disabled (transparency required)

**Message History:**
1. All messages preserved indefinitely (no auto-deletion)
2. Consultant cannot delete sent messages (audit trail)
3. Can edit sent messages within 5 minutes (edit history tracked)
4. Deleted conversations can be restored by platform admin only

**Search & Filtering:**
1. Search across all conversations by keyword
2. Filter by: Family name, date range, message type (text/proposal/deliverable)
3. Search results show message context (surrounding messages)
4. Advanced search (future): By service type, proposal status, etc.

**Response Time Expectations:**
1. Platform displays consultant's average response time on profile
2. Response time calculated: Time between family message and consultant's first reply
3. Goal: <4 hour response time during business hours
4. Slow response (>24h) may impact marketplace ranking (future)

**Conversation States:**
1. **Active:** Recent messages (within 7 days)
2. **Inactive:** No messages for 7+ days
3. **Archived:** Manually archived by consultant
4. **Blocked:** Family blocked consultant (cannot send messages)

**Spam Prevention:**
1. Consultants cannot send >10 messages in 1 minute (rate limit)
2. Identical messages sent to multiple families flagged as spam
3. Excessive unsolicited messages may result in profile suspension
4. Families can report spam/abuse

---

## 📝 Notes

**Future Enhancements (not in scope):**
- Video/audio calls directly in chat
- Screen sharing for consultations
- Scheduled messages (send at specific time)
- Message templates (canned responses for common questions)
- Group chats (family + multiple consultants)
- Voice messages (audio clips)
- Rich media embeds (YouTube, Google Drive previews)
- Chat analytics (response time trends, message volume)
- AI-powered message suggestions (smart replies)
- Multi-language translation (real-time)

**Open Questions:**
- Should consultants be able to see if family is online (presence indicator)?
- Should there be auto-replies when consultant is unavailable?
- Should consultants be able to schedule "office hours" when available for chat?
- Should chat support reactions/emojis?
- Should consultants see who specifically from family is reading messages?

**Assumptions:**
- Text chat sufficient for most consultant-family communication
- External links adequate for sharing documents/resources
- Consultants comfortable managing up to 20 concurrent conversations
- Families prefer chat over email for quick questions
- Real-time communication expected (not async like tickets)
- Consultants check chat multiple times per day

**Chat Etiquette Guidelines (for consultants):**
- Respond within 4 hours during business hours
- Professional tone always (no slang, emojis sparingly)
- Clear subject changes (don't mix multiple topics in one message)
- Confirm understanding of complex requests
- Use proposals for formal agreements (not just chat promises)
- Share deliverables through service request interface (EPIC-016A), not chat

**Integration with Other Features:**
- Proposals sent via chat appear in Proposals dashboard (EPIC-012A)
- Service context panel pulls data from Service Requests (EPIC-013A)
- Notifications trigger based on chat events across all features

**Note:** Deliverable sharing happens through service request interface (EPIC-016A), not via chat. Chat is for discussion and proposal exchange only.

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-24  
**Epic Status:** Draft  
**Story Points Estimate:** TBD (during grooming)
