# User Story: View Recent Unread Messages

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As a Consultant, I want to view recent unread messages from families, so that I can respond quickly to important communications  
**Epic Link:** FG-XXX (Homepage Dashboard Epic)  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant,  
**I want to** view 3 most recent unread messages from my family clients on the homepage dashboard,  
**so that** I can quickly identify and respond to important communications without navigating to the full Messages page.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point:**
- Consultants managing multiple family clients need quick visibility into new communications
- Checking full Messages inbox is time-consuming when consultant just wants to see if there's anything urgent
- Missing important messages from families can delay response time and impact client satisfaction

**Business outcome:**
- **Faster response times** to family communications (consultant sees messages immediately on dashboard)
- **Improved client satisfaction** through prompt communication
- **Increased consultant productivity** by reducing time spent checking messages
- **Better engagement** with family clients through visible communication channel

**Strategic alignment:**
- Supports Consultant persona's goal to maintain high client satisfaction and positive reviews
- Aligns with platform's focus on seamless advisor-family communication
- Part of comprehensive Consultant Dashboard experience

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** I am a Consultant with unread messages from families,  
   **When** I load the homepage dashboard,  
   **Then** I see a "Recent Messages" section displaying **3 most recent unread messages** ordered by newest first (created_at DESC).

2. **Given** I am viewing an unread message in the Recent Messages section,  
   **When** I look at a message card,  
   **Then** I see:
   - Conversation title
   - Sender's name and avatar
   - Message preview (first 100 characters)
   - Timestamp (relative time: "5 min ago", "2 hours ago", "Yesterday")
   - "X new" badge indicating number of unread messages in conversation

3. **Given** I am viewing the Recent Messages section,  
   **When** I have more than 3 unread messages,  
   **Then** I see a "View All" link/button that navigates to the full Messages page.

4. **Given** I am a Consultant with no unread messages,  
   **When** I view the Recent Messages section,  
   **Then** I see an empty state message: "No new messages" with appropriate icon/illustration.

5. **Given** the dashboard has auto-refresh enabled,  
   **When** a new message arrives from a family client,  
   **Then** the Recent Messages section updates within 60 seconds to show the new message (without full page reload).

6. **Given** I am viewing a message card in Recent Messages,  
   **When** I click on the message card,  
   **Then** I am navigated to the full conversation in Messages page with that message thread opened.

7. **Given** I am viewing the Recent Messages section,  
   **When** I manually click the refresh icon,  
   **Then** the Recent Messages data refreshes immediately to show the latest unread messages.

**Additional Criteria:**
- [ ] Only messages from **my family clients** (filtered by consultant_id) are displayed
- [ ] Messages are truly **unread** (read_status = false or equivalent)
- [ ] Message preview is truncated at 100 characters with ellipsis (...) if longer
- [ ] Section is responsive and displays correctly on mobile devices
- [ ] Loading state is shown while fetching messages
- [ ] Error handling if Messages service is unavailable (show error state)

---

## 🔑 Business Rules

**Data Filtering:**
1. **Consultant Isolation**: Display ONLY messages sent to current consultant (`consultant_id = current_user.id`)
2. **Unread Only**: Show only messages with `read_status = false` or `is_read = false`
3. **Family Clients Only**: Messages must be from families that have an active association with this consultant

**Display Rules:**
1. **Limit**: Show maximum **3 messages** in dashboard preview
2. **Ordering**: Messages ordered by `created_at DESC` (newest first)
3. **Preview Truncation**: Message text truncated at 100 characters with "..." if longer
4. **Timestamp Format**: 
   - < 1 hour: "X min ago"
   - < 24 hours: "X hours ago"
   - < 7 days: "X days ago"
   - >= 7 days: Show date "MMM DD"

**Authorization:**
- **Who can perform this action:** Users with `role = CONSULTANT` or `role = PREMIUM_CONSULTANT`
- **Who can view results:** Only the consultant (messages are filtered by consultant_id)

**Edge Cases:**
- **Zero messages**: Show empty state "No new messages"
- **Exactly 3 messages**: Show all 3, no "View All" link needed
- **More than 3 messages**: Show 3 most recent + "View All" link
- **Message from deleted/inactive family**: Do not display (filter out)
- **Very long conversation titles**: Truncate title at 50 characters with ellipsis
- **Missing sender avatar**: Show default avatar/initials
- **Messages service unavailable**: Show error state: "Unable to load messages. Try refreshing."

---

## 📐 Design & UX

**User Flow:**
1. Consultant logs in and lands on homepage dashboard
2. Consultant scrolls to "Recent Messages" section (below consultations)
3. Consultant sees list of 3 unread message cards
4. Consultant clicks on a message card → navigates to full Messages page with conversation opened
5. OR Consultant clicks "View All" → navigates to Messages page inbox view

**Component Structure:**
```
Recent Messages Section
├── Section Header ("Recent Messages")
├── Message Card 1
│   ├── Sender Avatar (left)
│   ├── Message Info (center)
│   │   ├── Conversation Title
│   │   ├── Sender Name
│   │   ├── Message Preview (100 chars)
│   │   └── Timestamp
│   └── "X new" Badge (right)
├── Message Card 2
├── Message Card 3
└── "View All" Link/Button
```

**Empty State:**
```
[Icon: Inbox/Envelope]
No new messages
Check back later for updates from your families
```

---

## 🧪 Test Scenarios

**Happy Path:**
1. Login as Consultant with 5 unread messages from 3 different families
2. Navigate to homepage dashboard
3. Scroll to "Recent Messages" section
4. **Expected:** See 3 most recent unread messages with sender avatars, previews, timestamps, and "X new" badges
5. **Expected:** See "View All" link at bottom
6. Click on second message card
7. **Expected:** Navigate to Messages page with that conversation opened

**Negative Tests:**
1. **Unauthorized Access:**
   - Login as Family Member
   - Attempt to access Consultant Dashboard
   - **Expected:** Redirect to Family Portal, Recent Messages not accessible

2. **No Unread Messages:**
   - Login as Consultant with 0 unread messages
   - View homepage dashboard
   - **Expected:** See "No new messages" empty state

3. **Messages Service Down:**
   - Login as Consultant
   - Messages service unavailable (simulate API error)
   - **Expected:** See error state: "Unable to load messages. Try refreshing."

4. **Invalid Consultant ID:**
   - Login with malformed consultant_id
   - View dashboard
   - **Expected:** No messages displayed, log error

**Edge Cases:**
1. **Exactly 3 Unread:**
   - Login as Consultant with exactly 3 unread messages
   - View Recent Messages
   - **Expected:** See all 3 messages, no "View All" link

2. **Very Long Message:**
   - Message text is 500 characters
   - View Recent Messages
   - **Expected:** Preview truncated at 100 chars with "..."

3. **Message from Inactive Family:**
   - Family client deactivated their account
   - Messages from that family should not appear
   - **Expected:** Only messages from active families displayed

4. **Real-time Update:**
   - View dashboard with 3 unread messages
   - New message arrives from family
   - Wait 60 seconds
   - **Expected:** Recent Messages updates to show new message (oldest of original 3 pushed out)

5. **Manual Refresh:**
   - View Recent Messages section
   - Click refresh icon
   - **Expected:** Messages reload immediately with loading indicator

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** Messages Epic (must define messages data model, API endpoints, read/unread status)
- **Blocked by:** Consultant Dashboard Layout (base dashboard structure must exist)
- **Blocked by:** Family-Consultant Association Model (must define how consultants are linked to families)

---

## ⚠️ Non-Functional Requirements

**Security:**
- Authorization required: **Yes** (Consultant role only)
- Data encryption: **Yes** (messages contain sensitive family communications)
- PII handling: **Yes** (sender names, avatars, message content)

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Mobile Safari (iOS) and Chrome Mobile (Android): Latest 2 versions

**Other:**
- Section should load within **1 second** on average connection
- Real-time updates should not cause UI flickering
- Manual refresh should complete within **500ms**
- Message cards must be keyboard navigable
- Screen reader support for unread count

---

## 📝 Notes

**Assumptions:**
- Messages data model includes `read_status`, `created_at`, `consultant_id`, `sender_id`, `conversation_id`
- Family-Consultant association table exists with active/inactive status
- Messages API provides unread filtering capability
- Sender avatar URLs are accessible and valid
- Dashboard auto-refreshes every 60 seconds as defined in Epic

**From Epic - Answered Questions:**
- **Q:** Should auto-refresh update messages? **A:** Yes, every 60 seconds
- **Q:** What if more than 3 unread messages? **A:** Show 3 most recent + "View All" link
- **Q:** Empty state message? **A:** "No new messages"
- **Q:** Message preview length? **A:** 100 characters with ellipsis

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-31
