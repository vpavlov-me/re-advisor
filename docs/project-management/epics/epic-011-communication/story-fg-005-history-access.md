# User Story: Advisor Read-Only Access to Past Family Conversations

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As an advisor, I want to access conversation history with families I no longer actively serve (read-only)  
**Epic Link:** FG-EPIC-XXX [Advisor-Family Messaging System]  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As an** advisor (Personal Family Advisor, External Consul, Consultant, or Premium Consultant),  
**I want to** access conversation history with families I no longer actively serve with read-only permissions,  
**so that** I can reference past engagements if families return or maintain records for my own professional documentation.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point being solved:**
- Advisors lose access to valuable conversation history when engagements end, making it impossible to reference past advice if families return
- Without historical context, advisors must rely on memory or external notes when families re-engage after months/years
- Professional advisors need access to their work history for documentation, compliance, and portfolio management

**Business outcome expected:**
- Advisors maintain continuity when families return after time gaps
- Reduced friction in re-engagement process (advisor has context immediately)
- Improved advisor satisfaction and platform stickiness (history preserved)
- Compliance benefit: advisors can demonstrate work history and recommendations

**Strategic alignment:**
- Supports long-term advisor-family relationships across multiple engagement cycles
- Differentiates platform from email/WhatsApp (structured history preservation)
- Enables advisor portfolio management and professional development (learn from past work)

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** advisor has lost active access to family (invitation revoked, booking ended, portal management removed),  
   **When** advisor opens Messages section in Advisor Portal,  
   **Then** advisor sees conversations with that family in conversation list with visual indicator (e.g., "Read-only" badge, lock icon, or muted styling).

2. **Given** advisor opens read-only conversation from past engagement,  
   **When** conversation thread loads,  
   **Then** advisor sees complete message history BUT message input field is hidden/disabled with explanation "You no longer have active access to this family. Read-only mode."

3. **Given** advisor attempts to send message to read-only conversation via API,  
   **When** API request is made,  
   **Then** system returns 403 Forbidden error with message "Cannot send messages to families you no longer actively serve."

4. **Given** family re-engages advisor (new invitation sent, new booking created, portal access restored),  
   **When** advisor opens previously read-only conversation,  
   **Then** read-only restriction is automatically lifted, message input field appears, and advisor can send new messages immediately.

5. **Given** advisor uses search/filter in conversation list,  
   **When** read-only conversations match search criteria,  
   **Then** they appear in results with visual read-only indicator maintained.

6. **Given** advisor has read-only access to conversation,  
   **When** advisor tries to add new participants to conversation,  
   **Then** "Add Participants" button is hidden/disabled.

**Additional Criteria:**
- [ ] Read-only conversations remain visible in conversation list indefinitely (no automatic archiving)
- [ ] Read-only conversations sortable/filterable alongside active conversations
- [ ] Visual distinction clear but not obtrusive (advisor can still access easily)
- [ ] Tooltip/help text explains why conversation is read-only

---

## 🔑 Business Rules

**Access Control:**
1. **Read-only trigger conditions:**
   - Personal Family Advisor: Family revokes invitation
   - External Consul: Family revokes invitation
   - Consultant: Booking ends and no new booking active
   - Premium Consultant: Family removed from managed portal list

2. **Multi-role handling:**
   - If advisor serves family in multiple capacities (e.g., Personal FA + Consultant), advisor retains full write access as long as ANY active role exists
   - Read-only applies ONLY when ALL roles/access methods are terminated

3. **Automatic restoration:**
   - When family re-engages advisor (any method: new invitation, new booking, portal access restored), read-only restriction lifts automatically
   - No manual action required from advisor or family
   - Write access restores within seconds of new association created

**Data Preservation:**
4. **Conversation persistence:**
   - Conversation history preserved indefinitely (no automatic deletion when access changes)
   - All messages remain visible to advisor in original order with timestamps
   - Participant list remains visible (who was in conversation)

**Authorization:**
- **Who can access read-only conversations:** Advisors who previously had active access to family
- **Who CANNOT access:** Advisors who never had access to family (no retroactive access)

**Edge Cases:**
- **Advisor never messaged family:** If engagement ends before any messages sent, conversation list shows no conversations for that family (empty state OK)
- **Family deletes conversation:** If family deletes conversation, it's removed for everyone including advisor (separate user story)
- **Advisor serves 10+ families:** Read-only conversations don't clutter UI but remain searchable

---

## 🧪 Test Scenarios

**Happy Path:**

**Scenario 1: Personal FA loses access, views read-only conversation**
1. Personal FA is invited by Family A, exchanges messages
2. Family A revokes invitation via Family Portal
3. Personal FA opens Advisor Portal → Messages
4. Personal FA sees conversation with Family A marked "Read-only"
5. Personal FA clicks conversation, sees message history
6. Message input field is hidden, explanation shown: "Read-only mode - no active access to family"
7. Personal FA can scroll, search within messages, but cannot reply

**Scenario 2: Consultant booking ends, then family re-books**
1. Consultant completes booking with Family B, has message history
2. Booking status changes to "Completed"
3. Consultant sees conversation with Family B as "Read-only"
4. Family B books same Consultant again (new booking created)
5. Consultant opens same conversation → read-only restriction removed
6. Consultant can send new messages immediately

---

**Negative Tests:**

**Scenario 3: Advisor attempts API call to read-only conversation**
1. Advisor loses access to Family C
2. Advisor (or malicious script) sends POST request to `/conversations/{id}/messages` with valid JWT
3. API validates: advisor in JWT does not have active access to family_id of conversation
4. API returns 403 Forbidden: "Cannot send messages to families you no longer actively serve"
5. Message not created in database, no notification sent

**Scenario 4: Advisor tries to add participant to read-only conversation**
1. Advisor opens read-only conversation
2. "Add Participants" button is disabled/hidden
3. If advisor manipulates UI and sends API request to add participant
4. API returns 403 Forbidden: "Cannot modify conversations with families you no longer actively serve"

---

**Edge Cases:**

**Scenario 5: Multi-role advisor loses one role, keeps other**
1. Advisor serves Family D as both Personal FA (succession module) AND has active Consultant booking (workshop)
2. Consultant booking ends
3. Advisor still has Personal FA access → conversation remains fully writable (no read-only)
4. Family D then revokes Personal FA invitation
5. NOW conversation becomes read-only (all access lost)

**Scenario 6: Premium Consultant loses one family from managed portfolio**
1. Premium Consultant manages 5 family portals
2. Family E terminates Premium Consultant relationship
3. Premium Consultant loses portal admin access to Family E
4. Conversations with Family E become read-only
5. Conversations with other 4 families remain fully writable

---

## ⚠️ Non-Functional Requirements (Briefly)

**Security:**
- Authorization required: Yes - JWT validation plus active family access check
- Data encryption: Conversations encrypted at rest (standard platform policy)
- PII handling: No additional PII beyond existing conversation data

**Performance:**
- Read-only status check must not delay conversation list load (< 50ms overhead)
- Filtering read-only vs active conversations should be indexed query (< 100ms)

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions

**Other:**
- Read-only indicator should be accessible (WCAG 2.1 AA compliant)
- Clear visual distinction but not alarming/negative (neutral UI tone)

---

## 📝 Notes

**Assumptions:**
- Communication Service (port 8004) supports access-level queries (active vs read-only)
- Advisor-family associations tracked in advisor-portal-service (port 8011) with status flags
- Frontend can conditionally render message input based on access level
- Notification Service does not send notifications for read-only conversations (advisor cannot reply anyway)

**Out of Scope for This Story:**
- Conversation archiving/deletion by advisor (separate feature)
- Export conversation history to PDF/email (future enhancement)
- Temporary re-access requests ("can I message this family again?") (future workflow)
- Read receipts for read-only conversations (not applicable)

**Open Questions (Resolved from Epic Discussion):**

**Q: What if advisor wants to delete/archive old read-only conversations?**  
**A:** Out of scope for initial release. Conversations preserved indefinitely. Future: add advisor-side archiving (hide from list but not delete).

**Q: Should read-only conversations appear in main list or separate "Archive" tab?**  
**A:** Main list with visual indicator. No separate tab initially (keeps UI simple). Advisor can filter by "Active" vs "Read-only" if needed.

**Q: What if family deletes their side of conversation?**  
**A:** If family deletes conversation, it's removed for everyone including advisor. This is separate story (conversation deletion logic).

**Q: Can advisor export read-only conversations?**  
**A:** Not in initial release. Future enhancement: export to PDF for records.

**Q: What happens to notifications for read-only conversations?**  
**A:** Advisor receives NO NEW notifications (cannot reply anyway). Existing notification history preserved.

**Q: Should system notify advisor when conversation becomes read-only?**  
**A:** Yes, optional: send one-time notification "Your access to [Family Name] has changed to read-only." (Separate notification story).

**Q: What if multiple advisors in same conversation, one loses access?**  
**A:** Advisor who loses access sees read-only. Other advisors with active access continue full write access. Each advisor's access controlled independently.

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-24  
**Story Status:** Ready for Grooming
