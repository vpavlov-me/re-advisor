# EPIC-014F: Real-time Chat for Service Engagement (Family Side)

## 📋 Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** Family Chat Interface for Consultant Communication  
**Summary:** Enable families to initiate and manage conversations with consultants through real-time chat  
**Parent User Journey:** JRN-FAM-002 - Family Marketplace Service Booking (Stages 2-8)  
**Priority:** Critical  
**Epic Link:** FG-EPIC-014F  
**Related Epic:** FG-EPIC-014A (Consultant chat interface)

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Enable Admin and Family Council members to communicate with consultants through contextual real-time chat, initiate inquiries from marketplace, receive proposals, review deliverables, and manage ongoing service communication. This Epic delivers the family's communication hub for consultant relationships.

**User-facing value:**
- Families can message consultants directly from marketplace profiles
- Families receive and review proposals within chat conversations
- Families can ask questions and clarify service terms before booking
- Families access deliverables shared by consultants in chat
- Families maintain organized conversation history with all consultants

**Business value:**
- Chat increases inquiry-to-booking conversion by 35% vs. email
- Integrated proposals reduce booking time by 50%
- Real-time communication reduces service delays and miscommunication
- Chat history provides documentation and accountability

**Scope boundaries:**
- **Included:** Chat interface for service-related communication, consultant conversation management, proposal viewing in chat, conversation initiation from marketplace
- **NOT included:** General chat functionality (covered in separate chat epic), deliverable access (handled in service request, EPIC-016F), video/voice calls, file uploads (external links for communication only), group chats

---

## 👥 Target Users

**Primary Personas:**
- Admin (DOC-USR-003) - Primary communicator with consultants
- Family Council Member (DOC-USR-002) - May also communicate with consultants

**Secondary Personas:**
- Family Member (DOC-USR-001) - Can view conversations (read-only)

---

## 📖 User Stories (High-Level)

1. **As an** Admin, **I want to** initiate conversations with consultants from their marketplace profiles, **so that** I can ask questions before deciding to engage

2. **As a** Family Council member, **I want to** view all active conversations with consultants in one inbox, **so that** I can manage communications efficiently

3. **As an** Admin, **I want to** receive and review consultant proposals directly in chat, **so that** I can evaluate offers without switching interfaces

4. **As a** Family Council member, **I want to** request clarifications or changes to proposals via chat, **so that** I can negotiate terms informally before formal acceptance

5. **As an** Admin, **I want to** receive real-time notifications when consultants message me or send proposals, **so that** I can respond promptly and keep services on track

---

## 🔗 Dependencies

**Upstream Dependencies:**
- EPIC-011F: Marketplace Discovery (initiate conversations from profiles)
- Real-time communication infrastructure (WebSocket)
- Notification system

**Downstream Impact:**
- EPIC-012F: Proposal Review (proposals appear in chat)
- EPIC-013F: Service Request Tracking (service context in chat)
- EPIC-016F: Service Monitoring (deliverables accessed from chat)

**Technical Dependencies:**
- WebSocket server for real-time messaging
- Chat message storage and retrieval
- Notification system integration
- Service context data retrieval
- Proposal rendering in chat

---

## 📐 Design & UX

**Figma Links:**
- [To be created] Family Chat Inbox
- [To be created] Chat Conversation View
- [To be created] Proposal View in Chat
- [To be created] Conversation Initiation Flow

**UX Notes:**

**User Flow - Initiating Conversation:**
1. Admin browsing consultant profile (from EPIC-011F)
2. Sees "Message Consultant" button prominently
3. Clicks button → Chat window opens:
   - If no existing conversation: Blank chat with intro template
   - If existing conversation: Opens existing thread
4. Template message auto-filled (optional):
   - "Hi [Consultant Name], I'm interested in your [Service Name] service. Can you tell me more about..."
5. Admin can edit or write custom message
6. Clicks "Send" → Message sent, consultant notified
7. Chat remains open for real-time response

**User Flow - Chat Inbox:**
1. Admin navigates to "Messages" in Family Portal
2. Inbox shows list of conversations with consultants:
   - **Sidebar (Left):**
     - Search bar at top
     - Filter tabs: All, Unread, Proposals, Archived
     - Conversation list:
       - Consultant name and photo
       - Last message preview (1 line)
       - Timestamp
       - Unread badge count
       - Proposal indicator (if pending)
       - Service status indicator (if active)
   - **Main Area (Right):**
     - Selected conversation details
3. Conversations sorted by: Most recent activity first
4. Can filter by: Consultant name, service type, proposal status

**User Flow - Chat Conversation:**
1. Select conversation from inbox
2. Conversation view shows:
   - **Header:**
     - Consultant name, photo, verification badges
     - "View Profile" link (opens marketplace profile)
     - Active services dropdown (if any)
     - Options menu (Archive, Block, Report)
   - **Message Thread:**
     - Chronological messages (most recent at bottom)
     - For each message:
       - Sender name and avatar (Admin, Council member, or Consultant)
       - Message text with formatting
       - Links/attachments
       - Timestamp
       - Read receipts (seen by consultant)
     - System messages (proposal received, service started, deliverable shared)
   - **Service Context Panel (Collapsible Right):**
     - Pending proposals from this consultant
     - Active service requests
     - Past services (quick reference)
     - Quick actions: Accept Proposal, Book Service
   - **Message Composer (Bottom):**
     - Text input with basic formatting
     - Attach link button
     - Send button
3. Messages send in real-time
4. Typing indicators show when consultant is typing

**User Flow - Receiving Proposal in Chat:**
1. Consultant sends proposal (from EPIC-012A)
2. Proposal appears as special message card in chat:
   - "Consultant sent you a proposal"
   - Proposal summary:
     - Services included (brief list)
     - Total price (large, prominent)
     - Expiration date with countdown
   - Status badge (New, Under Review, etc.)
   - Two CTAs:
     - "View Full Proposal" (opens proposal detail page from EPIC-012F)
     - "Respond in Chat" (quick reply)
3. Admin receives notification
4. Can ask questions about proposal in chat
5. When ready, clicks "View Full Proposal" → Opens detailed review (EPIC-012F)

**Key UI Elements:**
- **Inbox Sidebar:** Clean list with consultant avatars, badges, status indicators
- **Message Bubbles:** Family messages left-aligned (blue), consultant right (gray)
- **System Messages:** Centered, distinct styling (proposal received, service started)
- **Proposal Cards:** Rich preview with pricing, expiration countdown, CTAs
- **Typing Indicator:** "Consultant is typing..." animation
- **Read Receipts:** Checkmarks (sent, delivered, read)
- **Context Panel:** Service info sidebar for quick reference
- **Quick Actions:** Floating buttons for common actions

---

## 📢 Notifications (if applicable)

**Does this Epic involve user notifications?** Yes

| Trigger | Recipient | Format | Description |
|---------|-----------|--------|-------------|
| New message from consultant | Family Admin/Council | Email + In-App + Push | "New message from Consultant [Name] - [Preview]" |
| Consultant sent proposal | Family Admin/Council | Email + In-App + Push | "Consultant [Name] sent you a proposal for $[Amount] - [View Now]" |
| Consultant responded to your question | Family Admin/Council | In-App + Push | "[Consultant Name] replied - [Preview]" |
| Unread messages reminder | Family Admin | Email | "You have [X] unread messages from consultants" (daily digest) |
| Proposal expiring soon (via chat) | Family Admin/Council | In-App | "Proposal in chat with [Consultant] expires in 3 days - [Review Now]" |
| Consultant updated proposal | Family Admin/Council | Email + In-App | "[Consultant] updated their proposal - [View Changes]" |

**Notification Configuration Notes:**
- Default: All notifications enabled for Admin, opt-in for Council
- Critical notifications (new proposal, deliverable) cannot be disabled
- Daily digest optional (can disable or change frequency)
- Other family members don't receive notifications unless tagged
- Frequency limit: Max 5 notifications per day per consultant (batched)
- Quiet hours configurable (no notifications during off-hours)
- Localization: English only initially

---

## 🧮 Business Rules

**Conversation Initiation:**
1. Only Admin and Family Council can initiate conversations with consultants
2. Conversations initiated from consultant marketplace profile
3. Cannot message consultants without visiting their profile first
4. One conversation thread per family-consultant pair (no multiple threads)
5. Conversation persists indefinitely (even after services complete)

**Message Sending:**
1. Maximum message length: 5,000 characters
2. Supported formatting: Bold, italic, bullet lists, numbered lists
3. Links allowed: No limit on links per message
4. No direct file uploads (external links only)
5. No images/videos/audio attachments (links to external media allowed)

**Proposal Viewing in Chat:**
1. Proposals appear as special cards with summary and CTAs
2. Click "View Full Proposal" → Opens proposal detail page (EPIC-012F)
3. Proposal status updates in real-time in chat card
4. Accepted/declined proposals remain visible in chat history
5. Expired proposals show expiration notice

**Access Control:**
1. Admin and Family Council can send/receive messages
2. Other family members can view conversations (read-only)
3. Family members cannot send messages unless granted permission
4. Consultant can see which family member sent each message
5. Family can block consultant (disables chat, consultant notified)

**Read Receipts:**
1. Family members can see when consultant read messages
2. Shows "Read by [Consultant Name]" with timestamp
3. Read receipts cannot be disabled (transparency required)
4. Multiple family members reading shown to consultant

**Message History:**
1. All messages preserved indefinitely
2. Cannot delete sent messages (audit trail)
3. Can edit sent messages within 5 minutes (edit history tracked)
4. Archived conversations can be restored anytime

**Search & Filtering:**
1. Search across all conversations by keyword
2. Filter by: Consultant name, date range, message type
3. Search includes proposal content and deliverable names
4. Proposals filter shows only conversations with pending proposals

**Conversation States:**
1. **Active:** Recent messages (within 7 days) or active service
2. **Inactive:** No messages for 7+ days, no active services
3. **Archived:** Manually archived by family
4. **Blocked:** Family blocked consultant (cannot receive messages)

**Multi-User Access:**
1. Multiple family members (Admin/Council) can participate in same conversation
2. All participants see entire conversation history
3. Name shown with each message for clarity
4. Notifications sent to all participants (based on their preferences)

**Spam/Abuse Reporting:**
1. Family can report consultant messages as spam/inappropriate
2. Can block consultant immediately (suspends chat)
3. Reports reviewed by platform admin within 24 hours
4. Serious violations result in consultant suspension

---

## 📝 Notes

**Future Enhancements (not in scope):**
- Video/audio consultation calls directly in chat
- Screen sharing for service demonstrations
- Message scheduling (send at specific time)
- Smart replies (AI-suggested responses)
- Rich media embeds (YouTube, document previews)
- Group chats (family + multiple consultants working together)
- Voice messages (audio clips)
- Chat translation (multi-language support)
- Message reactions (thumbs up, etc.)
- @mentions to notify specific family members
- Chat analytics (response times, message volume)

**Open Questions:**
- Should family see consultant's online/offline status (presence indicator)?
- Should family be able to set "office hours" for when available to chat?
- Should consultants be able to see which specific family member is typing?
- Should chat support reactions/emojis for informal communication?
- Should family be able to invite other family members to join conversation?
- Should there be conversation templates for common inquiries?

**Assumptions:**
- Text chat sufficient for most family-consultant communication
- External links adequate for document/resource sharing
- Admin and Council comfortable managing multiple consultant conversations
- Families prefer chat over email for quick questions
- Real-time responses expected during business hours
- Families check chat at least once daily

**Chat Best Practices (for families):**
- Be specific about needs and questions
- Review consultant profile before initiating conversation
- Respond to proposal questions within proposal expiration period
- View deliverables in service request interface (not chat)
- Keep conversations professional and respectful
- Use formal acceptance (not just "yes in chat") for proposals
- Ask clarifying questions before booking services

**Integration with Other Features:**
- Conversations initiated from Marketplace Discovery (EPIC-011F)
- Proposals received in chat link to Proposal Review (EPIC-012F)
- Service context pulls data from Service Requests (EPIC-013F)
- Notifications trigger across all chat events

**Note:** Deliverable access happens through service request interface (EPIC-016F), not via chat. Chat is for discussion and proposal exchange only.

**Conversation Etiquette:**
- Families expected to respond within 24 hours during active service
- After hours messages acceptable (consultant responds next business day)
- Clear subject changes help (don't mix multiple topics)
- Confirm understanding of complex terms or commitments
- Use proposals for formal agreements (not just chat discussions)
- Thank consultants for deliverables and timely responses

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-24  
**Epic Status:** Draft  
**Story Points Estimate:** TBD (during grooming)
