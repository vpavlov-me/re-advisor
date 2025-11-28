# Service Request Chat - Overview

> **Epic Family:** EPIC-011.1-011.2 (Service Request Contextual Chat)
>
> **Split into:**
> - [EPIC-011.1: Advisor Side](./epic-011.1-service-request-chat-advisor.md)
> - [EPIC-011.2: Family Side](./epic-011.2-service-request-chat-family.md)

---

## 📖 What is Service Request Chat?

Service Request Chat is an **automatic, contextual messaging feature** that creates a dedicated conversation for each service booked from the Marketplace. When a family books a service, the system instantly creates a chat linking the family and the consultant, enabling seamless communication throughout the service lifecycle.

**Key Concept:** One Service Request = One Dedicated Chat

---

## 🎯 Business Problem & Solution

### Problem (MVP1 Baseline)
- Families and consultants exchange email/phone after booking
- Communication happens outside the platform (no tracking)
- No audit trail of service discussions
- Difficult to involve multiple family members in decisions
- Lost context when switching between services

### Solution (EPIC-011.1-011.2)
- Automatic chat creation upon service booking
- All service discussions tracked in platform
- Service context visible within chat (name, price, status, deliverables)
- Family can add Council members for collaborative decisions
- Chat lifecycle aligned with service stages (active → read-only)
- Complete audit trail for compliance and reference

---

## 🏗️ Architecture & Epic Split

### Why Two Epics?

Service Request Chat involves **two distinct user experiences**:

1. **EPIC-011.1 (Advisor Side)** - What consultants see and can do
2. **EPIC-011.2 (Family Side)** - What families see and can do

Each side has different:
- **Permissions** (Family manages participants, Advisor does not)
- **UI integration points** (different portal pages)
- **User stories** (different needs and workflows)
- **Story points** (Family side more complex due to participant management)

**Both Epics work together** to create a single, shared chat experience.

---

## 🔄 How It Works: End-to-End Flow

### 1. Chat Creation (Automatic)

```
Family books service (EPIC-012-MVP1)
         ↓
System creates Service Request
         ↓
System automatically creates Chat
         ↓
    Participants:
    • Family user who booked (Admin or Council)
    • Consultant assigned to service
         ↓
Both receive notification: "Chat created for [Service Name]"
```

### 2. Active Communication (During Service)

**Family can:**
- Send/receive messages with consultant
- Add other Admins/Council members to chat
- Remove family members from chat (except Consultant)
- View service context (price, status, deliverables)
- Access chat from Booking, Final Approval, Service Monitoring pages

**Consultant can:**
- Send/receive messages with all family participants
- View all participants (cannot manage)
- View service context
- Access chat from Request Review, Service Delivery pages
- Filter inbox to show only Service Request chats

### 3. Read-only Archive (After Completion)

```
Service completed & paid
         ↓
Chat becomes read-only (permanent)
         ↓
All participants retain view access
         ↓
Message history preserved for audit
         ↓
Option to start new general conversation
```

---

## 👥 User Personas & Permissions

| Persona | Create Chat | Manage Participants | Send Messages | View Context | Read After Completion |
|---------|-------------|---------------------|---------------|--------------|----------------------|
| **Family Admin** (booking user) | ✅ Auto-created | ✅ Add/remove Admins/Council | ✅ | ✅ | ✅ |
| **Family Council** (booking user) | ✅ Auto-created | ✅ Add/remove Admins/Council | ✅ | ✅ | ✅ |
| **Other Admin/Council** (added to chat) | - | ❌ | ✅ | ✅ | ✅ |
| **Consultant** | ✅ Auto-added | ❌ | ✅ | ✅ | ✅ |
| **Regular Family Members** (not in chat) | - | - | ❌ | ✅ View-only | ✅ View-only |

**Key Rules:**
- Only the original booking user (who created the Service Request) can manage participants. This prevents confusion and maintains clear ownership.
- Only **Admin and Council members** can be added as active participants (can send messages)
- **Regular Family Members** (non-Admin, non-Council) can only view chats in read-only mode via Service Request detail page

---

## 🎨 User Experience: Key Screens

### Family Portal

**1. Service Booking Confirmation Screen**
```
┌──────────────────────────────────────┐
│ ✓ Booking sent to [Consultant Name]!│
│                                      │
│ They will review within 48 hours    │
│                                      │
│ [Open Chat with Consultant] ← NEW   │
└──────────────────────────────────────┘
```

**2. Service Request Detail (Monitoring)**
```
┌─────────────────────────────────────────────┐
│ Service: Family Governance Workshop         │
│ Status: In Progress                         │
│ Consultant: John Smith                      │
│                                             │
│ [View Deliverables] [Open Chat] ← NEW      │
└─────────────────────────────────────────────┘
```

**3. Chat Interface (Family View)**
```
┌─────────────────────────────────────────────┐
│ 💬 Family Governance Workshop               │
│ John Smith (Consultant) • In Progress       │
│ [Manage Participants] ← Only booking user   │
├─────────────────────────────────────────────┤
│ Service Context Panel:                      │
│ • Price: $5,000                            │
│ • Status: In Progress                      │
│ • Deliverables: 2 uploaded                 │
├─────────────────────────────────────────────┤
│ Participants:                               │
│ • Sarah Admin (You)                        │
│ • John Smith (Consultant)                  │
│ • Michael Council [Remove]                 │
│ [+ Add Participant]                        │
├─────────────────────────────────────────────┤
│ Messages:                                   │
│ [System] Service status: In Progress       │
│ Sarah: When will deliverables be ready?    │
│ John: By end of week...                    │
├─────────────────────────────────────────────┤
│ [Type message...] [Send]                   │
└─────────────────────────────────────────────┘
```

### Consultant Portal

**1. Request Review Page**
```
┌─────────────────────────────────────────────┐
│ Service Request from Smith Family           │
│ Status: Pending Your Confirmation           │
│ Respond within: 36 hours                    │
│                                             │
│ [Chat with Family] ← NEW                    │
│ [Accept Request] [Decline]                  │
└─────────────────────────────────────────────┘
```

**2. Chat Interface (Consultant View)**
```
┌─────────────────────────────────────────────┐
│ 💬 Family Governance Workshop               │
│ Smith Family • In Progress                  │
├─────────────────────────────────────────────┤
│ Service Context Panel:                      │
│ • Price: $5,000                            │
│ • Status: In Progress                      │
│ • Deliverables: 2 uploaded                 │
├─────────────────────────────────────────────┤
│ Participants:                               │
│ • Sarah Admin                              │
│ • Michael Council                          │
│ • You (Consultant)                         │
│ (Only family can manage participants)      │
├─────────────────────────────────────────────┤
│ Messages:                                   │
│ [System] Service status: In Progress       │
│ Sarah: When will deliverables be ready?    │
│ [Type response...] [Send]                  │
└─────────────────────────────────────────────┘
```

---

## 🔔 Notifications

### For Family
- **Chat created:** "Chat created for [Service Name] - You can now discuss service details"
- **New message from consultant:** "[Consultant Name] sent a message about [Service Name]"
- **Participant added:** "You were added to [Service Name] chat by [Booking User]"
- **Participant removed:** "You were removed from [Service Name] chat. You can still view messages."
- **Status changed:** "Service status changed to [New Status]"
- **Chat read-only:** "[Service Name] completed - Chat is now read-only"

### For Consultant
- **Chat created:** "New service request from Family [Name] - Chat created for [Service Name]"
- **New message from family:** "[Family Member] sent a message about [Service Name]"
- **Participant added by family:** "[Family Member] added [New Participant] to [Service Name] chat"
- **Status changed:** "Service status changed to [New Status]"
- **Chat read-only:** "[Service Name] completed - Chat is now read-only"

---

## 🎭 Chat Lifecycle

```
┌─────────────────────────────────────────────────────────────┐
│                    ACTIVE PHASES                             │
├─────────────────────────────────────────────────────────────┤
│ Pending Consultant Confirmation                              │
│  • Family asks initial questions about service               │
│  • Consultant clarifies scope before accepting              │
│                           ↓                                  │
│ Awaiting Family Approval                                     │
│  • Family discusses consultant's proposal                    │
│  • Consultant answers questions about added services         │
│                           ↓                                  │
│ In Progress                                                  │
│  • Family asks for updates                                   │
│  • Consultant shares progress, discusses deliverables        │
│                           ↓                                  │
│ Delivered                                                    │
│  • Family reviews deliverables, asks questions               │
│  • Consultant clarifies results                              │
│                           ↓                                  │
├─────────────────────────────────────────────────────────────┤
│                   READ-ONLY PHASES                           │
├─────────────────────────────────────────────────────────────┤
│ Completed & Paid                                             │
│  • Chat becomes read-only (permanent)                        │
│  • All participants retain view access                       │
│  • Message history preserved for audit                       │
│  • Link to start new general conversation                   │
│                                                              │
│ Declined / Cancelled                                         │
│  • Chat immediately read-only                                │
│  • History preserved for reference                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 📊 Business Rules Summary

### Chat Creation
- ✅ One chat per Service Request (automatic)
- ✅ Created when Service Request is created (on booking)
- ✅ Initial participants: Booking user (Admin/Council) + Consultant
- ✅ Chat starts empty (no first message required)

### Participant Management
- ✅ **Only booking user** can add/remove family members
- ✅ Can add: Other Admins or Council members
- ✅ Can remove: Other Admins or Council members (not Consultant, not self)
- ❌ Consultant **cannot** manage participants
- ❌ Added participants **cannot** manage participants
- ✅ Removed participants retain **read-only** view access

### Communication
- ✅ All active participants can send/receive messages
- ✅ Message limit: 5,000 characters
- ✅ Formatting: Bold, italic, lists
- ✅ Links allowed
- ❌ File uploads not supported (use external links)

### Lifecycle
- ✅ Active during: Pending, Awaiting Approval, In Progress, Delivered
- ✅ Read-only after: Completed, Cancelled, Declined
- ✅ Read-only is **permanent** (cannot reopen)
- ✅ All participants retain view access forever

### Discovery
- ✅ Service Request chats appear in main Messages inbox
- ✅ Can filter by type: "Service Requests" vs "General Conversations"
- ✅ Can search by service name, consultant name, family name
- ✅ Visual indicators: Service icon, status badge, color coding

---

## 🔗 Integration Points

### With MVP1 Service Request Journey

| Epic | Page | Chat Integration |
|------|------|------------------|
| **EPIC-012-MVP1** | Service Booking Confirmation | "Open Chat with Consultant" button |
| **EPIC-013-MVP1** | Request Review (Consultant) | "Chat with Family" button in header |
| **EPIC-015-MVP1** | Final Approval (Family) | "Open Chat to Discuss" button |
| **EPIC-016-MVP1** | Service Delivery (Consultant) | "Chat with Family" button |
| **EPIC-016B-MVP1** | Service Monitoring (Family) | "Open Chat" button |
| **EPIC-018-MVP1** | Completion (Family) | "View Chat History" button (read-only) |
| **EPIC-018B-MVP1** | Post-Completion (Consultant) | Read-only chat access |

### With Base Messaging System

| Feature | EPIC-011 (Base) | EPIC-011.1-011.2 (Service Request) |
|---------|----------------|-------------------------------|
| **Conversation Types** | General | Service Request (extends base) |
| **Participants** | Flexible (can add/remove anyone) | Fixed + managed by booking user |
| **Lifecycle** | Always active | Lifecycle-based (active → read-only) |
| **Context** | No special context | Service details panel |
| **Inbox** | Shared inbox | Same inbox with filtering |
| **Notifications** | Shared infrastructure | Same system |

---

## 📈 Impact & Benefits

### For Families
- **Faster decisions:** No need to exchange emails, instant communication
- **Collaborative:** Multiple Council members can participate in discussions
- **Transparent:** All family can view discussions (read-only)
- **Organized:** Each service has dedicated conversation thread
- **Permanent record:** Audit trail of all service decisions

### For Consultants
- **Efficient:** Manage all service communications from one inbox
- **Contextual:** Service details visible while chatting
- **Professional:** Clean in-platform communication (no personal emails)
- **Audit trail:** Reference past discussions for quality assurance
- **Multi-family:** Easy to manage chats across multiple families

### For Platform
- **Engagement:** Users stay within platform (increased stickiness)
- **Compliance:** Complete audit trail of service communications
- **Quality:** Better service delivery through clear communication
- **Data:** Insights into common questions and pain points
- **Trust:** Transparent, trackable communication builds confidence

---

## 🚀 Implementation Strategy

### Phase 1: Base Infrastructure (EPIC-011)
- General messaging system
- Conversation management
- Notifications
- Message inbox

### Phase 2: Service Request Chat (EPIC-011.1 + 011.2)
**Parallel Development:**
- **Team A:** Advisor side (EPIC-011.1) - 5 SP
- **Team B:** Family side (EPIC-011.2) - 8 SP

**Shared Components:**
- Chat UI components (reuse from EPIC-011)
- Service context panel (new)
- Participant management UI (new)
- Read-only mode (new)

### Phase 3: Integration
- Add chat buttons to Service Request pages (EPIC-012, 013, 015, 016, 016B, 018)
- Update notifications for Service Request events
- Testing both sides together

---

## 📝 User Story Count

### EPIC-011.1 (Advisor)
- 7 user stories
- 5 story points
- Focus: View and communicate

### EPIC-011.2 (Family)
- 10 user stories
- 8 story points
- Focus: Manage participants + communicate

**Total:** 17 user stories, 13 story points

---

## 🧪 Key Testing Scenarios

### Cross-Epic Testing (Both Sides Together)

1. **Chat Creation:**
   - Family books service → Verify chat created
   - Both Family and Consultant receive notification
   - Both can access and send messages

2. **Participant Management:**
   - Family booking user adds Council member
   - Consultant sees updated participant list
   - New participant receives messages

3. **Communication:**
   - Family sends message → Consultant receives notification
   - Consultant replies → All family participants notified
   - System posts status change → All participants see it

4. **Lifecycle Transition:**
   - Service completed
   - Chat becomes read-only for both sides
   - Both can still view history

5. **Multiple Services:**
   - Family books 3 services from same consultant
   - Verify 3 separate chats created
   - Consultant can distinguish chats by service name

---

## 📚 Related Documentation

- **[EPIC-011: Base Messaging System](./epic-011-messaging-system)** - Foundation
- **[EPIC-011.1: Advisor Side](./epic-011.1-service-request-chat-advisor.md)** - Consultant experience
- **[EPIC-011.2: Family Side](./epic-011.2-service-request-chat-family.md)** - Family experience
- **[MVP1 Service Request Journey](../epic-014-021-US-MVP1-Service-Request-Family-Advisor/)** - Service flow context

---

## ❓ FAQ

**Q: Why separate Advisor and Family epics?**
A: Different permissions, different UI integration points, different story complexity. Allows parallel development and clearer testing.

**Q: Can Consultant add family members to chat?**
A: No. Only the family booking user can manage participants. This keeps family in control of who sees service discussions.

**Q: What happens if booking user leaves the organization?**
A: Chat remains accessible to all participants. Another Admin can continue using chat but cannot manage participants (limitation accepted for MVP).

**Q: Can we merge multiple Service Request chats?**
A: No. Each Service Request = one chat. This maintains clear audit trails and service-specific context.

**Q: What if family wants to discuss before booking?**
A: Use general chat from EPIC-011. Service Request chat only created after booking.

**Q: Can removed participants rejoin?**
A: Yes, booking user can re-add them. They'll regain send access.

**Q: What happens to chat if Service Request is deleted?**
A: Chat preserved in read-only mode. Title updated to "[Service Name] - Service Deleted". No messages lost.

---

**Last Updated:** 2025-10-27
**Document Owner:** Product Team
**Status:** Final - Ready for Implementation
