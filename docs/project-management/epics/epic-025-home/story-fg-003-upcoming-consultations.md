# User Story: View Upcoming Consultation Cards on Homepage

---

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Consultant, I want to see detailed upcoming consultation cards with family name, members, date/time, and payment status
**Epic Link:** FG-EPIC-XXX [Homepage Dashboard for Consultant]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant,
**I want to** view upcoming consultation cards on my homepage dashboard showing family name, attending members, date/time, and payment status,
**so that** I can quickly prepare for scheduled consultations and track payment lifecycle before meetings.

---

## 🎯 Business Context

**Why is this Story important?**

Consultants serve multiple families through marketplace bookings and need efficient consultation management:

**User pain points being solved:**
- Consultants lose time searching for upcoming consultation details across multiple families
- Risk of starting consultations without payment confirmation
- Difficulty preparing for meetings without quick access to family context and attendees
- No visibility into consultation schedule at a glance

**Business outcome expected:**
- Improved Consultant preparation quality (knows who attends, can review family context)
- Reduced payment disputes (payment status visible before consultation starts)
- Better time management (Consultant sees schedule on homepage)
- Increased Consultant satisfaction with platform efficiency

**Strategic alignment:**
- Supports Consultant persona goal: "Maintain high client satisfaction and positive reviews"
- Enables efficient multi-family portfolio management
- Reduces friction in service delivery workflow

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** Consultant has upcoming consultations scheduled,
   **When** Consultant views homepage dashboard,
   **Then** "Upcoming Consultations" section displays up to 4 upcoming consultation cards sorted by date (nearest first).

2. **Given** Consultant views consultation card,
   **When** card is displayed,
   **Then** card shows:
   - Family name (e.g., "Anderson Family")
   - Family members attending (e.g., "John Anderson, Sarah Anderson")
   - Date and time (e.g., "Dec 15, 2025 at 2:00 PM")
   - Payment status badge (Paid/Pending/Overdue with color coding)

3. **Given** Consultant has more than 4 upcoming consultations,
   **When** viewing "Upcoming Consultations" section,
   **Then** "View All Consultations" link is displayed below 4 cards.

4. **Given** Consultant clicks on consultation card,
   **When** card is clicked,
   **Then** system navigates to consultation detail page.

5. **Given** Consultant has no upcoming consultations,
   **When** viewing homepage,
   **Then** "Upcoming Consultations" section shows empty state: "No upcoming consultations scheduled. Browse marketplace to acquire new clients."

6. **Given** consultation date/time is within 24 hours,
   **When** viewing consultation card,
   **Then** card displays visual indicator (e.g., "Tomorrow" or "Today" label).

**Additional Criteria:**
- [ ] Payment status badge uses color coding: Green (Paid), Yellow (Pending), Red (Overdue)
- [ ] Card displays timezone-adjusted date/time based on Consultant's profile settings
- [ ] Family members list truncates after 3 names with "+X more" if more attendees
- [ ] Section loads within 2 seconds on standard connection
- [ ] Mobile responsive design maintained

---

## 🔑 Business Rules

**Display Rules:**
1. **Upcoming consultations only**: Only consultations with date/time >= current time are shown
2. **Maximum 4 cards**: Homepage shows maximum 4 cards, sorted by date ascending (soonest first)
3. **Sorting priority**: Consultations within 24 hours appear first, then by date/time ascending

**Payment Status Rules:**
1. **Paid**: Payment received and confirmed by payment processor
2. **Pending**: Payment initiated but not yet confirmed (typical for bank transfers)
3. **Overdue**: Payment due date passed without successful payment

**Member Display Rules:**
1. **Member names**: Show first name + last name for each attending member
2. **Truncation**: If more than 3 members, show first 3 + count of remaining (e.g., "John Anderson, Sarah Anderson, Mike Anderson +2 more")
3. **Empty state**: If no members assigned yet, show "Members TBD"

**Authorization:**
- **Who can view:** Consultants only (authenticated with Consultant subscription)
- **Data scope:** Only consultations where Consultant is assigned service provider

**Edge Cases:**
- **Consultation starts in < 1 hour**: Display "Starting soon" badge with countdown
- **Payment status unknown**: Show "Payment status unavailable" in neutral gray
- **Family name missing**: Show "Family ID: XXX" as fallback
- **Timezone edge case**: Use Consultant's profile timezone; if not set, default to UTC with indicator

---

## 🎨 Design & UX

**User Flow:**
1. Consultant logs into platform
2. Homepage dashboard loads
3. "Upcoming Consultations" section appears in upper portion of dashboard
4. Up to 4 consultation cards display with all required information
5. Consultant can:
   - Scan cards quickly for schedule overview
   - Click card to view full consultation details
   - Click "View All Consultations" to see complete list
   - Identify payment issues at a glance via status badges

**Key UX Principles:**
- **Scannable**: Card layout enables quick information extraction
- **Actionable**: Clear payment status enables decision-making (prepare vs. follow up on payment)
- **Contextual**: Family name + members provide sufficient context for preparation
- **Accessible**: Color-blind friendly payment status indicators (icons + text, not color alone)

---

## 🧪 Test Scenarios

**Happy Path:**
1. Consultant with 6 upcoming consultations logs in
2. Homepage displays "Upcoming Consultations" section
3. 4 cards shown, sorted by date (Dec 15, Dec 18, Dec 20, Dec 22)
4. Each card displays family name, members, date/time, payment status
5. "View All Consultations" link displayed
6. Consultant clicks on first card → navigates to consultation detail page

**Negative Tests:**
1. **No upcoming consultations**: 
   - Consultant has only past consultations
   - Expected: Empty state message displayed with CTA to browse marketplace

2. **Payment status API failure**:
   - Payment service unavailable
   - Expected: "Payment status unavailable" displayed in neutral state

3. **Timezone not set**:
   - Consultant profile has no timezone configured
   - Expected: Date/time shown in UTC with "(UTC)" indicator

**Edge Cases:**
1. **Consultation in 30 minutes**:
   - Current time: 1:30 PM, Consultation: 2:00 PM
   - Expected: Card shows "Starting soon" badge with countdown

2. **10 family members attending**:
   - Consultation has 10 confirmed attendees
   - Expected: Card shows "John Anderson, Sarah Anderson, Mike Anderson +7 more"

3. **Exactly 4 consultations**:
   - Consultant has exactly 4 upcoming consultations
   - Expected: 4 cards shown, no "View All" link

4. **Payment overdue by 7 days**:
   - Consultation in 2 days, payment due 7 days ago
   - Expected: Red "Overdue" badge displayed prominently

5. **Consultation crosses midnight**:
   - Consultation scheduled for 11:30 PM today
   - Current time: 11:00 PM
   - Expected: "Today at 11:30 PM" displayed, not "Tomorrow"

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Section loads within 2 seconds on standard broadband connection
- API call retrieves consultation data with pagination (limit 4 for homepage)

**Security:**
- Authorization required: Consultant role only
- Data filtering: Only consultations where current user is assigned Consultant
- PII handling: Family names and member names are PII, secured in transit (HTTPS)

**Accessibility:**
- Payment status badges use icons + text (not color alone) for color-blind users
- All cards keyboard navigable (Tab, Enter to open)
- Screen reader announces card content: "Consultation with [Family], [Date], Payment: [Status]"

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Mobile Safari/Chrome: Latest versions

**Responsive Design:**
- Desktop: Cards display in 2 rows of 2 (4 total)
- Tablet: Cards display 2 across, 2 rows
- Mobile: Cards stack vertically (1 per row)

---

## 📝 Notes

**Assumptions:**
- Consultation data already exists in system (created via booking flow)
- Payment processing system provides real-time payment status
- Consultant timezone is stored in profile settings

**Related Stories:**
- Will need "View All Consultations" page (separate story)
- Consultation detail page (separate story)
- Payment status sync with payment processor (may already exist)

**Future Considerations (not in this story):**
- Filter consultations by payment status
- Quick actions on card (reschedule, cancel)
- Calendar integration to add to external calendar

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-31
