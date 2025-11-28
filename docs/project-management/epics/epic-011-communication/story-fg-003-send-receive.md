# User Story: Send and Receive Direct Messages with File Attachments

---

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As an advisor or family member, I want to send and receive messages instantly with automatic notifications, so that I can have timely, responsive communications
**Epic Link:** FG-EPIC-XXX [Real-Time Messaging System]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Family Member, Family Council Member, or Advisor (Personal FA, External Consul, Consultant),
**I want to** send and receive direct messages instantly with automatic notifications and file attachments,
**so that** I can communicate effectively with other family members and advisors, share important documents, and respond to urgent matters in a timely manner.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point being solved:**
- Currently, family members and advisors lack a direct, instant communication channel within the platform
- Important discussions and document sharing happen outside the platform (email, WhatsApp), reducing engagement and governance transparency
- Delayed responses to urgent matters due to lack of real-time notifications
- Difficulty tracking communication history related to family governance

**Business outcome expected:**
- Increased platform engagement and user retention (users spend more time in platform)
- Improved communication transparency and auditability (all communications in one place)
- Faster decision-making through instant communication
- Reduced reliance on external communication tools
- Enhanced advisor-family collaboration through seamless file sharing

**Strategic alignment:**
- Core feature for family governance platform (communication is fundamental)
- Enables real-time collaboration required for effective governance
- Foundation for future features (group chats, task discussions, meeting coordination)
- Competitive differentiation (integrated communication vs. fragmented tools)

---

## ✅ Acceptance Criteria

**This Story is complete when:**

### 1. Message Sending
1. **Given** I am logged in as any user type (Family Member, Council Member, or Advisor),
   **When** I navigate to the messaging interface and select a recipient from my available contacts,
   **Then** I can compose and send a text message up to 5,000 characters.

2. **Given** I am composing a message,
   **When** I click "Attach File" button,
   **Then** I can select and attach one or multiple files (photos: JPEG, PNG, GIF, HEIC; documents: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX; other: ZIP, TXT) with total size not exceeding 50 MB per message.

3. **Given** I have composed a message with or without file attachments,
   **When** I click "Send",
   **Then** the message is sent instantly and appears in the conversation thread with timestamp and "Sent" status.

### 2. Message Receiving
4. **Given** another user has sent me a message,
   **When** the message is delivered,
   **Then** I receive the message in real-time (or within 5 seconds) and can view it in the conversation thread.

5. **Given** I received a message with file attachment(s),
   **When** I view the message,
   **Then** I can see file name(s), file size(s), and file type icon(s), and I can download the file(s) by clicking on them.

### 3. Notifications
6. **Given** I received a new message,
   **When** the message arrives,
   **Then** I receive an in-app notification (badge count + notification popup) indicating new message with sender name and preview.

7. **Given** I received a new message and I have email notifications enabled,
   **When** the message arrives,
   **Then** I receive an email notification with sender name, message preview (first 100 characters), and link to conversation.

8. **Given** I received a new message and I have push notifications enabled (mobile),
   **When** the message arrives,
   **Then** I receive a push notification with sender name and message preview.

9. **Given** I received a message with file attachment,
   **When** notification is sent,
   **Then** the notification includes indication that message contains attachment (e.g., "📎 Sent a file").

### 4. Conversation Management
10. **Given** I am in the messaging interface,
    **When** I view my conversations list,
    **Then** I see all my active conversations sorted by most recent message first, with unread message count badge.

11. **Given** I have unread messages in a conversation,
    **When** I open that conversation,
    **Then** unread messages are marked as read automatically and badge count updates.

### 5. Multi-Tenancy & Access Control
12. **Given** I am a Family Member or Family Council Member,
    **When** I view my available contacts for messaging,
    **Then** I can only see and message other members from my family (family_id isolation).

13. **Given** I am an Advisor (any type),
    **When** I view my available contacts for messaging,
    **Then** I can only see and message family members from families I have active association with.

**Additional Criteria:**
- [ ] Message delivery status indicator (Sent / Delivered / Read - basic implementation)
- [ ] Conversation search functionality (search by sender name)
- [ ] File upload progress indicator during upload
- [ ] Clear error messages for failed uploads (file too large, unsupported format, network error)
- [ ] Mobile-responsive UI for messaging interface

---

## 🔑 Business Rules

### Validation Rules:
1. **Message Length**: Text messages must be between 1 and 5,000 characters
2. **File Size Limit**: Total file size per message cannot exceed 50 MB
3. **Supported File Types**: 
   - Images: JPEG, JPG, PNG, GIF, HEIC, WEBP
   - Documents: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX
   - Archives: ZIP, RAR
   - Text: TXT, CSV
   - Other formats should display clear rejection message
4. **Recipient Validation**: User can only send messages to contacts within their accessible scope (family members or associated families for advisors)
5. **Empty Message**: Cannot send empty message (no text and no files)

### Authorization:
- **Who can send messages:** Any authenticated user (Family Member, Family Council Member, Personal FA, External Consul, Consultant)
- **Who can receive messages:** Any authenticated user within sender's accessible scope
- **Who can view messages:** Only sender and recipient of the message
- **Who can download files:** Only sender and recipient of the message
- **Family isolation:** Users can only message within their family_id context (except advisors with multi-family access)

### Multi-Tenancy Rules:
- **Family Members/Council:** Can only message other members from their family (WHERE family_id = current_user.family_id)
- **Advisors:** Can message family members from families they have active associations with (JOIN family_advisor_associations)
- **Consultant (Premium with managed families):** Can message members from families they manage as Portal Administrator

### Edge Cases:
- **Recipient becomes inactive:** Message delivery succeeds, notification queued for when user returns
- **File upload interrupted:** User sees "Upload failed" message and can retry
- **Very large conversation history (1000+ messages):** Pagination or lazy loading implemented
- **Simultaneous messages:** Both messages delivered, timestamp determines order
- **Notification preference not set:** Default to in-app + email notifications
- **Mobile offline mode:** Message queued locally, sent when connection restored
- **Advisor loses family association:** Cannot send new messages, but can view historical conversation (read-only)
- **User blocks another user:** (Future feature - for now, no blocking capability)

---

## 🧪 Test Scenarios

### Happy Path:
1. **Basic text message:**
   - User A logs in as Family Member
   - User A navigates to Messages
   - User A selects User B (another family member) from contacts
   - User A types "Hello, can we schedule a meeting?" 
   - User A clicks Send
   - **Expected:** Message appears in conversation thread with timestamp, User B receives in-app notification and email

2. **Message with file attachment:**
   - User A composes message "Here's the financial report"
   - User A clicks "Attach File" and selects "Q4_Report.pdf" (5 MB)
   - User A clicks Send
   - **Expected:** Message sent with file icon and name, User B receives notification "📎 Sent a file", User B can download PDF

3. **Advisor sends message to family:**
   - Advisor (External Consul) logs in
   - Advisor sees contacts from associated family
   - Advisor sends message "I reviewed the succession plan" to Family Council Member
   - **Expected:** Message delivered, family member receives notification, conversation visible in both interfaces

### Negative Tests:
1. **File too large:**
   - User attempts to attach 60 MB video file
   - **Expected:** Error message "File size exceeds 50 MB limit. Please choose a smaller file."

2. **Unsupported file type:**
   - User attempts to attach .exe file
   - **Expected:** Error message "File type not supported. Supported formats: JPEG, PNG, PDF, DOC, DOCX, etc."

3. **Empty message:**
   - User clicks Send without typing text or attaching file
   - **Expected:** Send button disabled OR error message "Cannot send empty message"

4. **Unauthorized messaging:**
   - Family Member from Family A attempts to message Family Member from Family B (via URL manipulation)
   - **Expected:** Error 403 Forbidden "You don't have permission to message this user"

5. **Network failure during send:**
   - User sends message but network disconnects mid-send
   - **Expected:** Error message "Message failed to send. Check your connection and try again." with Retry button

### Edge Cases:
1. **Messaging inactive recipient:**
   - User A sends message to User B who hasn't logged in for 30 days
   - **Expected:** Message delivered successfully, email notification sent, message waiting when User B logs in

2. **Rapid message sending:**
   - User sends 10 messages in quick succession
   - **Expected:** All messages delivered in order, notifications batched appropriately (e.g., "10 new messages from User A")

3. **Large file upload:**
   - User uploads 45 MB file (near limit)
   - **Expected:** Progress bar shows upload progress, message sent successfully after upload completes

4. **Conversation with advisor who lost access:**
   - Advisor had conversation with Family A, then association expired
   - **Expected:** Advisor can view historical messages (read-only), cannot send new messages, clear message indicating access lost

---

## ⚠️ Non-Functional Requirements

### Security:
- **Authorization required:** Yes - JWT token with valid family_id or advisor association
- **Data encryption:** Yes - files encrypted at rest, messages encrypted in transit (HTTPS)
- **PII handling:** Yes - messages may contain sensitive family information, must comply with data isolation rules (family_id filtering)
- **File security:** Files stored with access control, only sender and recipient can download
- **XSS protection:** Message text sanitized to prevent script injection

### Performance:
- **Message delivery:** < 5 seconds from send to notification delivery
- **File upload:** Support resumable uploads for files > 10 MB
- **Conversation load time:** < 2 seconds for initial 50 messages
- **Notification latency:** < 10 seconds for email, < 5 seconds for in-app
- **Database queries:** All message queries must include family_id filter for performance and security

### Browser Support:
- **Chrome:** Latest 2 versions
- **Safari:** Latest 2 versions
- **Firefox:** Latest 2 versions
- **Mobile browsers:** iOS Safari, Android Chrome

### Scalability:
- **File storage:** Plan for AWS S3 or similar for file attachments
- **Notification queue:** Use notification-service queue for reliable delivery
- **Database:** Indexed on (family_id, recipient_id, created_at) for fast queries

---

## 📝 Notes

**Additional context:**
- This story delivers the **foundational messaging capability** - one-on-one direct messages
- Group messaging (many-to-many) will be separate story in same epic
- Message editing/deletion will be separate story (governance/audit trail considerations)
- Advanced notification preferences (quiet hours, digest mode) will be separate story
- Read receipts implementation is basic (read/unread status), detailed "seen at XX:XX" may be future enhancement
- File preview in chat (without downloading) is out of scope for this story, separate enhancement

**Assumptions:**
- Communication Service (port 8004) is operational and has database schema ready
- Notification Service (port 8010) is integrated and can send email/push notifications
- File storage solution (S3 or similar) is configured and accessible
- Frontend messaging UI components exist or will be created as part of this story

**Related documentation:**
- Epic: Real-Time Messaging System
- Service: Communication Service (port 8004, communication_db)
- Related Services: Notification Service (port 8010), Auth Service (port 8001)
- Personas: Family Member (DOC-USR-001), Family Council Member (DOC-USR-002), all Advisor types (DOC-USR-004, 005, 006)

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-24
