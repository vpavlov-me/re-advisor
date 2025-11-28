# User Story - Consultations Tab: Upcoming Meetings View

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As an advisor, I want to see upcoming meetings with specific family in Consultations tab  
**Epic Link:** FG-XXX [Family Section в Advisor Portal]  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As an** advisor (Personal Family Advisor, External Consul, or Consultant),  
**I want to** see all my upcoming meetings with a specific family in the Consultations tab,  
**so that** I can prepare for consultations, maintain clear meeting schedule, and understand my engagement timeline with this family.

---

## 🎯 Business Context

**Why is this Story important?**

Advisors working with multiple families need context-specific view of their meeting schedule. When viewing a family card, advisor should immediately see their upcoming consultations with THIS family without searching through global calendar or mixing meetings from different families.

**Business value:**
- **Improved preparation**: Advisor can prepare for family-specific consultations in context
- **Clear engagement visibility**: Understand consultation frequency and upcoming commitments per family
- **Reduced cognitive load**: No need to filter global meeting list by family
- **Better time management**: Plan preparation time for upcoming family consultations
- **Professional service**: Advisor never misses or forgets family consultation

**User pain point solved:**  
Currently advisors must navigate to separate meeting module and manually filter by family. This story brings family-specific meetings directly into family context, making consultation schedule instantly visible when viewing family card.

---

## ✅ Acceptance Criteria

1. **Given** advisor opens Family Card and navigates to "Consultations" tab,  
   **When** tab loads,  
   **Then** system displays list of upcoming meetings filtered by:
   - Advisor is participant (attendee or organizer)
   - Meeting belongs to this specific family
   - Meeting date is in the future (>= today)

2. **Given** upcoming meetings exist for this family,  
   **When** Consultations tab displays meeting list,  
   **Then** each meeting card shows:
   - Date (formatted: "Mon, Jan 15, 2025")
   - Time (formatted: "14:00 - 15:30" or "2:00 PM - 3:30 PM")
   - Meeting topic/title
   - Meeting type (e.g., "Family Council Meeting", "Consultation", "Workshop")
   - Action: "Join" button/link (if online) or "Details" link

3. **Given** multiple upcoming meetings exist,  
   **When** Consultations tab displays them,  
   **Then** meetings are sorted by date and time (earliest first).

4. **Given** no upcoming meetings exist with this family,  
   **When** Consultations tab loads,  
   **Then** system displays empty state:
   - Icon (calendar/meeting icon)
   - Message: "No upcoming meetings scheduled"
   - Optional: "Schedule consultation" CTA (if advisor has permissions)

5. **Given** meeting date/time approaches or passes,  
   **When** Consultations tab is refreshed or reopened,  
   **Then** past meetings are automatically removed from upcoming list.

6. **Given** advisor is added as participant to new future meeting,  
   **When** Consultations tab is refreshed,  
   **Then** new meeting appears in the list.

---

## 🔍 Design & UX

**User Flow:**
1. Advisor navigates to Family Section in Advisor Portal
2. Advisor clicks on specific Family Card
3. Family Card opens with 4 tabs: Overview | **Consultations** | Services | Tasks
4. Advisor clicks "Consultations" tab
5. System loads and displays upcoming meetings list (filtered and sorted)
6. Advisor reviews meeting schedule, clicks "Join" or "Details" to access meeting

**Empty State:**
- Centered content with calendar icon
- Clear message: "No upcoming meetings scheduled"
- Subtle call-to-action (if applicable)

---

## 🔑 Business Rules

**Filtering Rules:**
1. **Participant validation**: Advisor MUST be in meeting participants list (as attendee or organizer)
2. **Family context**: Meeting MUST belong to current family (family_id matches card context)
3. **Future dates only**: Meeting date >= today (exclude past and today's completed meetings)
4. **Active meetings only**: Exclude cancelled meetings

**Display Rules:**
1. **Date format**: User-friendly format (e.g., "Monday, Jan 15, 2025" or "Mon, 15 Jan")
2. **Time format**: Respect user's locale preference (12h vs 24h)
3. **Sort order**: Chronological ascending (earliest meeting first)
4. **Join link visibility**: Show "Join" button only if meeting has online link AND meeting is within join window (e.g., 15 min before start)

**Authorization:**
- **Who can view:** Any advisor associated with the family (Personal FA, External Consul, Consultant)
- **Who can see specific meeting:** Only if advisor is participant in that meeting

**Edge Cases:**
1. **Meeting without link**: Show "Details" instead of "Join" button
2. **All-day meetings**: Display as "All day" instead of time range
3. **Recurring meetings**: Each future instance appears separately
4. **Timezone handling**: Display in advisor's local timezone with indicator
5. **Very long meeting list**: Implement pagination or "Load more" (if > 10 meetings)

---

## 🧪 Test Scenarios

**Happy Path:**
1. Advisor with 3 upcoming meetings with Family A opens Consultations tab
2. System displays 3 meeting cards sorted by date
3. Each card shows date, time, topic, meeting type, and "Join"/"Details" button
4. Advisor clicks "Join" on nearest meeting → redirects to meeting interface

**Negative Tests:**
1. Advisor NOT participant in any family meetings → Empty state displayed
2. All meetings are in the past → Empty state displayed
3. Meeting cancelled after loading → Meeting disappears on refresh
4. Advisor removed from meeting participants → Meeting removed from list on refresh

**Edge Cases:**
1. Advisor in different timezone → Meetings display in advisor's local time
2. Meeting starts in 5 minutes → "Join" button becomes active
3. 15 upcoming meetings exist → Pagination or scroll works correctly
4. Meeting has no online link → "Details" button shown instead of "Join"

---

## 📝 Notes

**Open Questions:**
- [x] Should we show meetings for today that are already completed? → No, only future meetings
- [x] Should recurring meetings show as single item or multiple instances? → Multiple instances (each future occurrence)
- [x] What's the join window for meetings (when "Join" becomes active)? → 15 minutes before start time
- [x] Should we include meeting duration in the card? → Yes, as time range (14:00 - 15:30)
- [x] How many meetings to show before pagination? → 10 meetings per page or "Load more"

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-23
