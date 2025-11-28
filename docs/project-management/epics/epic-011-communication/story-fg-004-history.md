# User Story: Search Message History and Filter Conversations by Family

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As an advisor, I want to search my message history and filter conversations by family, so that I can quickly find past discussions and reference previous advice  
**Epic Link:** FG-EPIC-XXX [Advisor-Family Messaging System]  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As an** advisor (Consultant, External Consul, or Personal Family Advisor),  
**I want to** search my message history and filter conversations by family,  
**so that** I can quickly find past discussions, reference previous advice, and manage communications across my family portfolio efficiently.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain points being solved:**
- Advisors working with multiple families lose track of past conversations and advice given
- Finding specific discussions requires manually scrolling through long conversation lists
- No way to focus on one family's communications when managing multiple engagements
- Difficult to reference past advice when families return after engagement pause
- Time wasted searching through external tools (email, notes) for conversation history

**Business outcomes expected:**
- Improved advisor productivity (faster information retrieval)
- Better client service (advisors can reference past context accurately)
- Increased platform stickiness (all communications in one searchable place)
- Higher advisor satisfaction with platform usability
- Reduced time-to-response for families (advisors find information faster)

**Strategic alignment:**
- Supports multi-family advisory practice growth (Consultant persona)
- Enables comprehensive governance consulting with full historical context
- Differentiates platform from basic messaging tools (Gmail, WhatsApp)

---

## ✅ Acceptance Criteria

**This Story is complete when:**

### Search Functionality

1. **Given** advisor is on Messages page,  
   **When** advisor enters search term in search bar (e.g., "succession plan"),  
   **Then** system displays all conversations and messages containing that term across all families advisor has access to.

2. **Given** search results are displayed,  
   **When** advisor clicks on a search result,  
   **Then** system opens that conversation and highlights/scrolls to the matching message.

3. **Given** advisor has access to multiple families (active and inactive),  
   **When** advisor performs search,  
   **Then** search results include conversations from ALL families (current and past engagements), clearly indicating which family each result belongs to.

4. **Given** advisor searches for common term (e.g., "meeting"),  
   **When** search returns multiple results,  
   **Then** results are ranked by relevance and date, showing: conversation title, message excerpt (with search term highlighted), family name, and timestamp.

### Filter Functionality

5. **Given** advisor is on Messages page,  
   **When** advisor opens "Filter by Family" dropdown,  
   **Then** dropdown shows all families advisor has/had access to, grouped into "Active Families" and "Past Engagements" (if applicable).

6. **Given** advisor selects specific family from filter dropdown,  
   **When** filter is applied,  
   **Then** conversation list shows ONLY conversations with that family, and search (if used) limits results to that family only.

7. **Given** advisor has selected family filter,  
   **When** advisor clicks "Clear Filter" or selects "All Families",  
   **Then** conversation list returns to showing all families.

### Combined Search + Filter

8. **Given** advisor has selected family filter (e.g., "Smith Family"),  
   **When** advisor enters search term (e.g., "philanthropy"),  
   **Then** search results show only messages from Smith Family conversations containing "philanthropy".

### Access to Inactive Family History

9. **Given** advisor's engagement with family has ended (Personal FA/External Consul invitation revoked, Consultant booking completed),  
   **When** advisor searches or filters for that family's conversations,  
   **Then** advisor can VIEW conversation history (read-only), but CANNOT send new messages.

10. **Given** advisor views conversation history with inactive family,  
    **When** advisor attempts to type new message,  
    **Then** message input is disabled with explanation: "This conversation is archived. You no longer have active access to this family."

**Additional Criteria:**
- [ ] Search is case-insensitive
- [ ] Search works for partial words (e.g., "successi" finds "succession")
- [ ] Empty search returns all conversations
- [ ] Search/filter state persists during session (if user navigates away and returns)
- [ ] Loading states shown during search (skeleton loaders, not blank screen)
- [ ] No search results state displays helpful message: "No conversations found matching '[search term]'"

---

## 🔑 Business Rules

**Search Rules:**
1. **Full-text search scope**: Search looks through conversation titles AND message content (text only, no file attachments in this release)
2. **Access validation**: Search only returns results from families advisor has/had legitimate access to (via invitation, booking, or managed portal)
3. **Multi-tenancy**: Search respects advisor-family associations, never shows conversations from families advisor never worked with
4. **Minimum search length**: Search activates after 2+ characters entered (prevents performance issues)

**Filter Rules:**
1. **Family list source**: Filter dropdown populated from advisor-family associations table
2. **Active vs Inactive distinction**: 
   - Active: Current Personal FA/External Consul invitations, active Consultant bookings, managed Premium families
   - Inactive: Revoked invitations, completed bookings, terminated associations
3. **Default state**: No filter applied (show all families)

**Read-Only Access Rules:**
1. **Inactive family conversations**: Viewable but message input disabled
2. **History preservation**: Conversation history NEVER deleted when engagement ends
3. **Re-engagement**: If family re-invites advisor or books new service, conversation becomes active again (can send new messages)

**Authorization:**
- **Who can perform search/filter:** All advisor types (Personal FA, External Consul, Consultant)
- **Who can view results:** Only the logged-in advisor (conversations are private)
- **Multi-family access validation:** Each search result validated against current advisor-family associations before display

**Edge Cases:**
- **No conversations exist**: Display empty state: "No conversations yet. Start your first conversation with a family."
- **No search results**: Display: "No conversations found matching '[search term]'. Try different keywords."
- **Family filter shows no conversations**: Display: "No conversations with [Family Name] yet. Start a conversation."
- **Search during typing**: Implement debounce (wait 300ms after last keystroke before executing search to reduce server load)
- **Very long search terms**: Truncate at 100 characters, display warning
- **Special characters in search**: Escape properly, don't break search functionality

---

## 🧪 Test Scenarios

**Happy Path: Search Across Multiple Families**
1. Advisor (Consultant) works with 3 families: Smith, Johnson, Williams
2. Advisor navigates to Messages page
3. Advisor types "estate planning" in search bar
4. System displays 5 results: 2 from Smith, 2 from Johnson, 1 from Williams
5. Results show conversation title, message excerpt with "estate planning" highlighted, family name, timestamp
6. Advisor clicks result from Smith family
7. Conversation opens, message with "estate planning" is highlighted and scrolled into view
8. **Expected:** Advisor successfully found and accessed relevant past discussion

**Happy Path: Filter by Single Family**
1. Advisor (External Consul) works with 2 families: Brown, Davis
2. Advisor opens Messages, sees 8 conversations total (5 Brown, 3 Davis)
3. Advisor opens "Filter by Family" dropdown
4. Advisor selects "Brown Family"
5. Conversation list updates to show only 5 Brown conversations
6. Advisor clicks "Clear Filter"
7. Conversation list returns to showing all 8 conversations
8. **Expected:** Filter correctly isolates one family's conversations

**Happy Path: Combined Search + Filter**
1. Advisor (Consultant) works with 4 families, has 20+ total conversations
2. Advisor selects "Filter by Family: Johnson"
3. Conversation list shows 6 Johnson conversations
4. Advisor types "succession" in search
5. Search results show 2 Johnson conversations containing "succession"
6. **Expected:** Search limited to filtered family only

**Negative Test: Search with No Results**
1. Advisor searches for "xyz123nonsense"
2. System returns empty result set
3. System displays: "No conversations found matching 'xyz123nonsense'. Try different keywords."
4. Advisor can clear search and try again
5. **Expected:** Graceful handling of no results

**Negative Test: Access Inactive Family History (Read-Only)**
1. Advisor (Personal FA) previously worked with Taylor family, invitation revoked 3 months ago
2. Advisor opens "Filter by Family" dropdown, sees Taylor under "Past Engagements"
3. Advisor selects Taylor family
4. Conversation list shows 4 Taylor conversations (grayed out or marked "Archived")
5. Advisor clicks archived conversation
6. Conversation opens, messages visible, but message input is disabled
7. Disabled input shows tooltip: "This conversation is archived. You no longer have active access to this family."
8. **Expected:** Advisor can VIEW history but CANNOT send new messages

**Edge Case: Search During Typing (Debounce)**
1. Advisor starts typing "suc..." in search bar
2. System waits 300ms after last keystroke before executing search
3. Advisor continues typing "...cession"
4. System only executes ONE search for "succession" (not multiple partial searches)
5. **Expected:** Performance optimized, no excessive server requests

**Edge Case: Very Long Search Term**
1. Advisor pastes 150-character text into search bar
2. System truncates to 100 characters, displays warning: "Search limited to 100 characters"
3. Search executes with truncated term
4. **Expected:** System handles gracefully, doesn't break

**Edge Case: Empty Search**
1. Advisor enters search term "planning"
2. Results displayed
3. Advisor clears search bar (backspaces all text)
4. System returns to showing all conversations (no filter applied)
5. **Expected:** Empty search = show everything

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Search response time: < 500ms for result display (p95)
- Filter application: Instant (< 100ms)
- Search debounce: 300ms after last keystroke
- Maximum conversations per page: 50 (pagination if more)

**Security:**
- Search MUST validate advisor-family associations before returning results
- No cross-family data leakage (strict multi-tenancy enforcement)
- Inactive family conversations remain accessible but read-only enforced server-side

**Usability:**
- Search bar always visible at top of Messages page
- Filter dropdown accessible without scrolling
- Search term highlighted in results for quick scanning
- Loading indicators during search (no blank screens)

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Mobile responsive (iOS Safari, Android Chrome)

---

## 📝 Notes

**Context from Epic Discussion:**

**Advisor Types & Access:**
- Personal Family Advisor: Searches own invited family + any marketplace bookings
- External Consul: Searches own invited family + any marketplace bookings
- Consultant: Searches all active bookings + managed families (Premium)

**Conversation History Preservation:**
- When advisor loses family access (invitation revoked, booking ended), conversation history preserved
- History becomes read-only (no new messages can be sent)
- If family re-engages advisor, conversation reactivates (can send messages again)

**Search Scope:**
- Searches conversation titles AND message content
- Does NOT search file attachments (out of scope for this release)
- Case-insensitive, supports partial word matching

**Filter Categories:**
- "Active Families": Current engagements, can send messages
- "Past Engagements": Terminated engagements, read-only access

**Future Enhancements (Out of Scope):**
- Advanced search (date range, participant filters, message type)
- Save search queries
- Search within file attachments
- Conversation tagging for better organization
- Export search results

**Assumptions:**
- Communication Service (port 8004) supports full-text search or can be enhanced
- Advisor-family associations table tracks active/inactive status with timestamps
- Frontend has search input component with debounce capability
- Backend API can efficiently query across multiple families per advisor

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-24
