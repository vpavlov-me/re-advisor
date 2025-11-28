# ðŸ"‹ User Story: Statistics Cards on Consultant Dashboard

## ðŸ"‹ Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As a Consultant, I want to view key business metrics in statistics cards  
**Epic Link:** FG-EPIC-XXX [Consultant Dashboard - Homepage]  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## ðŸ"– User Story

**As a** Consultant,  
**I want to** view key business metrics (family clients, services, active consultations, monthly revenue) in statistics cards,  
**so that** I can monitor my practice health at a glance.

---

## ðŸŽ¯ Business Context

**Why is this Story important?**

Consultants need immediate visibility into their practice performance to make informed business decisions. Currently, advisors must navigate through multiple sections to gather basic metrics about their client portfolio and revenue.

**User pain points being solved:**
- No centralized view of practice health
- Time wasted navigating multiple pages to find basic metrics
- Difficult to assess if practice is growing or declining
- Cannot quickly answer questions like "How many clients do I have?" or "What's my monthly revenue?"

**Business outcome expected:**
- Increased consultant engagement with platform
- Better-informed business decisions
- Faster identification of practice issues (declining clients, low revenue)
- Improved consultant satisfaction with Advisor Portal

**Strategic alignment:**
- Supports Consultant persona growth and practice management
- Enables data-driven consulting practice
- Differentiates our platform from competitors

---

## âœ… Acceptance Criteria

**This Story is complete when:**

1. **Given** I am a logged-in Consultant on Homepage Dashboard,  
   **When** the page loads,  
   **Then** I see 4 statistics cards displayed horizontally: "Family Clients", "Services", "Active Consultations", "Monthly Revenue".

2. **Given** I have 6 active family clients,  
   **When** I view the "Family Clients" card,  
   **Then** I see the number "6" displayed prominently with label "Family Clients".

3. **Given** I have added 5 services to my Service Catalog,  
   **When** I view the "Services" card,  
   **Then** I see the number "5" displayed with label "Services".

4. **Given** I have 2 consultations in SCHEDULED or IN_PROGRESS status,  
   **When** I view the "Active Consultations" card,  
   **Then** I see the number "2" displayed with label "Active Consultations".

5. **Given** my total revenue this month is $12,450.75,  
   **When** I view the "Monthly Revenue" card,  
   **Then** I see "$12,450.75" displayed with proper currency formatting and label "Monthly Revenue".

6. **Given** I have 0 family clients (new consultant),  
   **When** I view the "Family Clients" card,  
   **Then** I see "0" and helper text "Get started by connecting with families in the Marketplace".

7. **Given** I have 0 services in my catalog,  
   **When** I view the "Services" card,  
   **Then** I see "0" and helper text "Add services to your catalog to start accepting bookings".

8. **Given** I have 150 family clients,  
   **When** I view the "Family Clients" card,  
   **Then** I see "99+" displayed (not exact count).

9. **Given** my monthly revenue is $1,234,567.89,  
   **When** I view the "Monthly Revenue" card,  
   **Then** I see "$1,234,567.89" with proper thousands separator formatting.

10. **Given** dashboard is loaded with initial data,  
    **When** real-time updates occur (new client added, consultation completed),  
    **Then** statistics cards update automatically without requiring page refresh.

**Additional Criteria:**
- [ ] All 4 cards have consistent styling (same height, padding, font sizes)
- [ ] Cards are responsive (stack vertically on mobile)
- [ ] Loading state shown while data fetches (skeleton or spinner)
- [ ] Error state handled gracefully if data fails to load
- [ ] Cards display in correct order: Family Clients → Services → Active Consultations → Monthly Revenue
- [ ] Real-time updates occur within 5 seconds of data change
- [ ] Zero states display appropriate call-to-action messages

---

## ðŸ"' Business Rules

**Data Calculation Rules:**

1. **Family Clients Count**:
   - Count of unique families with ACTIVE advisor-family associations
   - Exclude families where association is INACTIVE, TERMINATED, or EXPIRED

2. **Services Count**:
   - Count of services in consultant's Service Catalog with status = ACTIVE
   - Exclude DRAFT and ARCHIVED services

3. **Active Consultations Count**:
   - Count of consultations where status IN (SCHEDULED, IN_PROGRESS)
   - Exclude COMPLETED, CANCELLED, NO_SHOW statuses

4. **Monthly Revenue**:
   - Sum of all consultation payments with status = COMPLETED
   - Filter by payment_date within current calendar month
   - Currency: USD (hardcoded for MVP, multi-currency future enhancement)

**Display Rules:**

5. **Large Number Formatting**:
   - If count > 99: Display "99+"
   - If revenue > $999,999: Use thousands separator (e.g., "$1,234,567.89")

6. **Zero State Messages**:
   - Family Clients = 0: "Get started by connecting with families in the Marketplace"
   - Services = 0: "Add services to your catalog to start accepting bookings"
   - Active Consultations = 0: "0" (no special message)
   - Monthly Revenue = $0: "$0.00" (no special message)

**Authorization:**
- **Who can view:** Only authenticated Consultants (role = "consultant")
- **Data visibility:** Consultant sees ONLY their own metrics (filtered by consultant_id)

**Edge Cases:**

7. **First-time Consultant** (all metrics = 0):
   - Show all zero states with appropriate helper text
   - Display call-to-action buttons (if applicable)

8. **Consultant with suspended subscription**:
   - Show metrics but display warning banner about subscription status

9. **Data fetch failure**:
   - Show error state: "Unable to load statistics. Please refresh the page."
   - Provide "Retry" button

10. **Slow network**:
    - Show loading skeleton for up to 5 seconds
    - If > 5 seconds, show "Loading is taking longer than usual..." message

---

## ðŸ§ª Test Scenarios

**Happy Path:**

1. **Established Consultant with all metrics populated**:
   - Login as consultant with 10 clients, 5 services, 3 active consultations, $5,000 revenue
   - Navigate to Homepage Dashboard
   - **Expected**: All 4 cards display correct numbers with proper formatting

2. **New Consultant (zero state)**:
   - Login as brand-new consultant (0 clients, 0 services, 0 consultations, $0 revenue)
   - Navigate to Homepage Dashboard
   - **Expected**: Cards show "0" with helper text for Family Clients and Services

3. **Real-time update scenario**:
   - Dashboard loaded with 5 family clients
   - (Background action: New family association created)
   - Wait up to 5 seconds
   - **Expected**: "Family Clients" card updates from 5 to 6 without page refresh

**Negative Tests:**

1. **Unauthorized access**:
   - Attempt to access dashboard without authentication
   - **Expected**: Redirect to login page

2. **API failure**:
   - Mock API returning 500 error
   - **Expected**: Error state displayed with "Retry" button

3. **Invalid data returned**:
   - API returns null or malformed data for Family Clients
   - **Expected**: Display "0" or "N/A" with error indicator

**Edge Cases:**

1. **Large numbers**:
   - Consultant with 250 family clients
   - **Expected**: Card displays "99+" not "250"

2. **Very high revenue**:
   - Monthly revenue = $2,500,000.50
   - **Expected**: Display "$2,500,000.50" with proper formatting

3. **Decimal precision**:
   - Monthly revenue = $1,234.5
   - **Expected**: Display "$1,234.50" (always 2 decimal places)

4. **Negative revenue** (refunds exceed payments):
   - Monthly revenue = -$500.00
   - **Expected**: Display "-$500.00" in red color (if design supports)

---

## âš ï¸ Non-Functional Requirements

**Performance:**
- Initial data load: < 2 seconds on average connection
- Real-time updates: within 5 seconds of data change
- No visible UI flickering during updates

**Security:**
- Authorization required: Yes (Consultant role)
- Data filtering: MUST filter by current consultant's consultant_id
- No cross-consultant data leakage

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Edge: Latest version

**Accessibility:**
- ARIA labels for screen readers
- Keyboard navigation support
- Sufficient color contrast (WCAG AA)

**Responsiveness:**
- Desktop: 4 cards horizontal (>1024px)
- Tablet: 2 cards per row (768px - 1024px)
- Mobile: 1 card per row (<768px)

---

## ðŸ" Open Questions & Answers

**Q1: What defines "Active consultation"?**  
**A:** SCHEDULED or IN_PROGRESS status (answered in Epic)

**Q2: Should we show trend indicators (up/down arrows)?**  
**A:** No, MVP focuses on current numbers only. Future enhancement.

**Q3: What if consultant has 500+ family clients?**  
**A:** Display "99+" per business rule (from Epic)

**Q4: Should Monthly Revenue include pending payments?**  
**A:** No, only COMPLETED payments (confirmed in Epic context)

**Q5: Do we need currency conversion for international consultants?**  
**A:** No, MVP uses USD only. Multi-currency is future enhancement.

**Q6: How often do real-time updates occur?**  
**A:** Real-time updates confirmed needed (from Epic), implementation method TBD by engineering (WebSocket vs polling)

**Q7: Should Services count include DRAFT services?**  
**A:** No, only ACTIVE services (clarified in Business Rules)

**Q8: What happens if consultant's subscription expires?**  
**A:** Out of scope for this story - handle in separate subscription management epic

---

## ðŸ" Notes

**Design Considerations:**
- Cards should have equal height for visual consistency
- Use icons for each metric type (e.g., users icon for Family Clients, dollar icon for Revenue)
- Consider card hover state for interactivity (future: click to drill down)

**Assumptions:**
- Family-Advisor Association table exists with status tracking
- Service Catalog Epic provides service count API
- Consultations Epic defines consultation statuses and provides count API
- Payment Settings provides revenue aggregation API
- Current month = server time UTC, no timezone adjustments needed for MVP

**Performance Notes:**
- Consider caching strategy for family clients count (changes infrequently)
- Revenue calculation may be expensive - ensure database indexes on payment_date
- Real-time updates should be throttled to prevent excessive API calls

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-31  
**Story Status:** Draft - Ready for Grooming