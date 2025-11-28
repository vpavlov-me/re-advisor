# User Story: Metrics Overview Dashboard

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As a Consultant, I want to see key metrics at a glance, so that I can monitor business performance without detailed analysis  
**Epic Link:** FG-EPIC-017 (Consultations Dashboard)  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant,  
**I want to** see key metrics at a glance (Total consultations, Upcoming sessions, Completion rate, Total revenue earned),  
**so that** I can monitor business performance without detailed analysis.

---

## 🎯 Business Context

**Why is this Story important?**

**User Pain Point:**
Consultants managing multiple family engagements need to quickly assess their business health when opening the platform. Without immediate visibility into key performance indicators, they must navigate through multiple screens, manually calculate metrics, or rely on external spreadsheets to understand:
- Current workload capacity (how many consultations are active)
- Short-term schedule pressure (upcoming sessions requiring preparation)
- Service delivery quality (completion rate as performance indicator)
- Financial performance (monthly earnings trend)

**Business Outcome:**
- **Increased consultant engagement:** Consultants log in more frequently when dashboard provides immediate value
- **Faster decision-making:** Consultants can quickly decide whether to accept new bookings based on current capacity
- **Performance awareness:** Completion rate visibility encourages quality service delivery
- **Revenue transparency:** Clear earnings tracking builds trust in platform payment system

**Strategic Alignment:**
This aligns with platform goal of making Family Governance Platform the primary workspace for independent consultants, reducing dependency on external tools (calendars, spreadsheets, CRMs) by providing essential business intelligence in one place.

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** Consultant opens Consultations Dashboard,  
   **When** page loads,  
   **Then** four metric cards are displayed prominently at the top of the page showing:
   - Total consultations (number)
   - Upcoming sessions (number)
   - Completion rate (percentage with % symbol)
   - Total revenue earned (currency amount)

2. **Given** Consultant has 0 consultations in system,  
   **When** dashboard loads,  
   **Then** metrics show:
   - Total consultations: 0
   - Upcoming sessions: 0
   - Completion rate: "N/A" or "0%" with explanatory tooltip
   - Total revenue: $0 or equivalent in consultant's currency

3. **Given** Consultant has active consultations,  
   **When** metrics load,  
   **Then** data reflects real-time calculation based on current consultation statuses without requiring page refresh

4. **Given** Consultant views metrics,  
   **When** observing metric cards,  
   **Then** each metric card has clear label, large readable number, and appropriate icon for quick visual scanning

5. **Given** Consultant has consultations across multiple months,  
   **When** viewing "Total revenue earned" metric,  
   **Then** amount shows revenue for current calendar month only (not lifetime or custom range)

6. **Given** Consultant has completed 8 out of 10 consultations in last 12 months,  
   **When** viewing "Completion rate" metric,  
   **Then** metric displays "80%" as calculated value

7. **Given** dashboard is loading metrics data,  
   **When** API call is in progress,  
   **Then** metric cards show skeleton loaders or loading indicators (not blank/broken state)

8. **Given** metrics API returns error,  
   **When** data cannot be loaded,  
   **Then** metric cards display friendly error message with retry action (e.g., "Unable to load. Retry?")

**Additional Criteria:**
- [ ] Metric cards are responsive and adapt to mobile/tablet/desktop screen sizes
- [ ] Metrics load within 2 seconds even with 50+ consultations in database
- [ ] Currency formatting respects consultant's locale settings (e.g., $1,234.56 vs 1.234,56 €)
- [ ] Completion rate rounds to whole number (e.g., 87% not 87.3%)
- [ ] Keyboard navigation works for all metric cards (tab order logical)
- [ ] Screen readers announce metric labels and values correctly

---

## 🔑 Business Rules

**Metrics Calculation Rules:**

1. **Total Consultations:**
   - Count: ALL consultations across all statuses (Upcoming, Completed, Cancelled)
   - Scope: Entire lifetime of consultant on platform
   - Inclusion: Both one-time and recurring consultations

2. **Upcoming Sessions:**
   - Count: Consultations with status = "Upcoming" OR "Scheduled" (check status definitions in EPIC-013)
   - Time filter: Sessions scheduled for future dates only (today's date + future)
   - Exclusion: Past sessions, Completed sessions, Cancelled sessions

3. **Completion Rate:**
   - Formula: (Completed Consultations / Total Consultations) × 100
   - Time range: Last 12 months from current date
   - Rounding: Round to nearest whole number (e.g., 87.4% → 87%)
   - Edge case: If Total Consultations = 0, display "N/A" or "0%" with tooltip explaining "Complete your first consultation to see this metric"

4. **Total Revenue Earned:**
   - Formula: Sum of (Prepaid Payments + Final Payments) for current calendar month
   - Time range: Current month only (1st day to last day of current month)
   - Payment status: Include only payments with status = "Paid" or "Completed" (exclude Pending, Failed)
   - Currency: Display in consultant's configured currency with proper formatting
   - Zero state: If no revenue this month, show "$0" (not "N/A" or blank)

**Data Refresh Rules:**
- Metrics refresh automatically when:
  - Page loads/reloads
  - Consultant completes an action affecting metrics (e.g., marks consultation as complete)
  - Consultant navigates back to dashboard from another page
- No auto-refresh while user is actively viewing dashboard (avoid disruptive updates)

**Authorization:**
- **Who can view metrics:** Only the logged-in Consultant (viewing their own metrics)
- **Data isolation:** Metrics calculated ONLY from consultations where consultant_id = current user
- **Family privacy:** Metrics are aggregated numbers only (no family-identifying information visible)

**Edge Cases:**
1. **New consultant (0 consultations):**
   - Display: All metrics show 0 or N/A with encouraging empty state message
   - Behavior: "Schedule your first consultation" CTA prominently displayed

2. **Consultant with cancelled consultations:**
   - Total Consultations: Include cancelled in count
   - Upcoming Sessions: Exclude cancelled
   - Completion Rate: Exclude cancelled from both numerator and denominator
   - Revenue: Refunded payments deducted from month's revenue (if cancellation occurred in current month)

3. **Partial month data (e.g., it's 5th of month):**
   - Revenue: Show earnings for 1st-5th only (not projected full month)
   - Label clarity: "This month" clearly indicates current partial month

4. **Multi-currency consultations:**
   - Convert all payments to consultant's base currency using platform exchange rates
   - If conversion fails: Show revenue in primary currency only with note "Includes [X] consultations in other currencies"

---

## 📐 Design & UX

**User Flow:**
1. Consultant logs into Advisor Portal
2. Navigates to Consultations Dashboard (or lands there by default)
3. Page loads with metrics section at top
4. Consultant scans four metric cards from left to right
5. Consultant gains immediate understanding of business status
6. Consultant proceeds to detailed consultations list below metrics

**Visual Hierarchy:**
- Metrics section: Full-width container above consultations list
- Metric cards: Equal-width responsive grid (4 columns desktop, 2 columns tablet, 1 column mobile)
- Card styling: Subtle borders/shadows, ample white space, consistent padding
- Typography: Large bold numbers (24-32px), smaller descriptive labels (14-16px)
- Icons: Each metric has relevant icon (e.g., calendar for upcoming, dollar for revenue)

**Empty State (0 consultations):**
- Tone: Encouraging, not punitive
- Message: "Ready to start? Schedule your first consultation with a family."
- Visual: Friendly illustration or icon (not error/warning style)
- Action: Clear CTA button to create/schedule consultation

**Loading State:**
- Skeleton loaders matching final card layout
- No jarring content shift when data loads
- Load metrics before consultations list (metrics are priority)

**Error State:**
- Friendly error message: "We couldn't load your metrics right now."
- Action: "Retry" button or "Refresh page" instruction
- Visual: Soft error icon (not harsh red X)

**Accessibility:**
- ARIA labels: Each metric card has descriptive aria-label
- Screen reader announcements: "Total consultations: 23", "Completion rate: 87 percent"
- Keyboard focus: Tab order follows left-to-right reading order
- Color contrast: Text meets WCAG 2.1 AA standards (4.5:1 minimum)
- Focus indicators: Visible focus rings on interactive elements

---

## 🧪 Test Scenarios

**Happy Path:**
1. Consultant with 25 total consultations (5 upcoming, 18 completed, 2 cancelled) logs in
2. Dashboard loads within 2 seconds
3. Metrics display:
   - Total consultations: 25
   - Upcoming sessions: 5
   - Completion rate: 78% (18/23 excluding 2 cancelled)
   - Total revenue: $3,450 (sum of current month payments)
4. All numbers are properly formatted and readable
5. Consultant successfully scans metrics and understands business status

**Negative Tests:**
1. **API timeout scenario:**
   - Given: Metrics API takes > 5 seconds to respond
   - When: Dashboard loads
   - Then: Skeleton loaders display for 5 seconds, then friendly error with Retry button

2. **Invalid data scenario:**
   - Given: API returns negative revenue value (data corruption)
   - When: Dashboard processes response
   - Then: Metric shows "$0" with error indicator, logs error for admin investigation

3. **Unauthorized access scenario:**
   - Given: Consultant A tries to access Consultant B's metrics (URL manipulation)
   - When: Request is made
   - Then: 403 Forbidden error, redirect to own dashboard

4. **Network interruption scenario:**
   - Given: Consultant loses internet connection during metric load
   - When: API call fails
   - Then: Previously cached metrics display with "Last updated: [timestamp]" note OR error message if no cache

**Edge Cases:**
1. **Brand new consultant (today's registration):**
   - Given: Consultant registered 1 hour ago, 0 consultations
   - When: Opens dashboard
   - Then: All metrics show 0 or N/A, encouraging empty state with CTA to schedule first consultation

2. **Consultant with only cancelled consultations:**
   - Given: 5 total consultations, all cancelled
   - When: Dashboard loads
   - Then: 
     - Total consultations: 5
     - Upcoming: 0
     - Completion rate: N/A (no completed consultations to calculate)
     - Revenue: $0 (assuming all refunded)

3. **Month transition edge case:**
   - Given: It's 11:59 PM on last day of month, revenue = $5,000
   - When: Consultant refreshes at 12:01 AM (new month)
   - Then: Revenue resets to $0 for new month (previous month's $5,000 not visible)

4. **High-volume consultant (200+ consultations):**
   - Given: Consultant has 200 consultations in database
   - When: Dashboard loads metrics
   - Then: Metrics still load within 2-second performance target (database query optimization critical)

5. **Decimal completion rate:**
   - Given: Consultant completed 8 out of 11 consultations
   - When: Completion rate calculated (8/11 = 72.727%)
   - Then: Displays "73%" (rounds to nearest whole number)

---

## ⚠️ Non-Functional Requirements

**Performance:**
- Metrics API response time: < 500ms (p95)
- Dashboard full load time: < 2 seconds including metrics and initial consultation list
- Query optimization: Use indexed queries on consultant_id, status, date fields

**Security:**
- Multi-tenant isolation: Metrics query MUST filter by consultant_id = current user
- No raw SQL injection vulnerabilities in metrics calculation
- Rate limiting: Max 100 requests/minute per consultant to prevent abuse

**Browser Support:**
- Chrome (last 2 versions)
- Safari (last 2 versions)  
- Firefox (last 2 versions)
- Edge (last 2 versions)
- Mobile browsers: iOS Safari, Chrome Android

**Accessibility:**
- WCAG 2.1 Level AA compliance
- Keyboard navigation: All metrics accessible via Tab key
- Screen reader compatibility: Tested with NVDA, JAWS, VoiceOver
- Color contrast: 4.5:1 minimum for text, 3:1 for large text

**Internationalization:**
- Currency formatting: Respect consultant's locale (e.g., $1,234.56 vs 1.234,56€)
- Date formatting: Use locale-appropriate formats (MM/DD vs DD/MM)
- Number formatting: Proper thousand separators and decimal points
- RTL language support: Metrics cards adapt to right-to-left reading (Arabic, Hebrew) - Future

---

## 📝 Notes

**Assumptions:**
- Payment processing system (EPIC-015) provides reliable payment status and amounts via API
- Consultation statuses from EPIC-013 are stable and well-defined
- Consultant profile includes currency preference setting
- Database has proper indexes on consultant_id, status, created_at, updated_at columns for fast queries

**Open Questions Addressed (from Epic discussion):**

1. **Q: Should consultants see "potential earnings" metric for services in Payment Pending status?**
   - **A:** NO - This story focuses on EARNED revenue only (Paid/Completed payments). "Potential earnings" is more complex (requires future sprint, separate story) and could mislead consultants if payments fail.

2. **Q: What is exact definition of "Total revenue" metric (18 days in design - placeholder?)?**
   - **A:** Total revenue = Current calendar month only (1st to last day of month). NOT lifetime, NOT custom date range. This aligns with consultant's typical need to track monthly income for taxes/accounting.

3. **Q: How many consultations should load initially before pagination/infinite scroll?**
   - **A:** Not relevant for this story - metrics always show aggregated numbers regardless of how many consultations exist. Pagination affects consultation list below metrics (separate story).

4. **Q: Should dashboard support exporting consultation data to CSV/PDF?**
   - **A:** Not in this story - export is Future Enhancement. This story delivers read-only metric visibility only.

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-27  
**Story Status:** Draft - Ready for Grooming
