# User Story: Consultant Consultations Dashboard with Status Tabs

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As a Consultant, I want to view all my consultations across multiple families in one dashboard with status tabs (All/Upcoming/Completed/Cancelled)  
**Epic Link:** FG-EPIC-017 (Consultations Dashboard)  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant ([DOC-USR-006](consultant-persona.md)),  
**I want to** view all my consultations across multiple families in one dashboard with status tabs (All/Upcoming/Completed/Cancelled),  
**so that** I can prioritize work, track my consultation portfolio efficiently, and quickly access information about any consultation without switching between different family workspaces.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point being solved:**
- Consultants serve multiple families simultaneously and currently lack a unified view of their entire consultation portfolio
- Without centralized dashboard, consultants must switch between different family workspaces to check consultation status, leading to inefficiency and risk of missing important deadlines
- No quick way to see "what's coming up this week" or "what's overdue" across all families
- Difficult to prioritize which consultations need immediate attention

**Business outcome expected:**
- Improved consultant efficiency → faster response times to families
- Better consultation delivery → fewer missed deadlines and cancellations
- Increased consultant satisfaction → better retention on platform
- Enhanced portfolio management → consultants can scale to serve more families
- Professional service delivery → organized, proactive consultant behavior

**Strategic alignment:**
- Supports Marketplace & Consultant Platform initiative
- Enables consultants to scale their practice (serve more families efficiently)
- Differentiates platform from competitors through superior consultant tools
- Drives consultant retention and platform stickiness

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** I am logged in as a Consultant with active consultations across multiple families,  
   **When** I navigate to Consultations section in Advisor Portal,  
   **Then** I see a dashboard with 4 metric cards (Active Services, Upcoming Deadlines, This Month Revenue, Completion Rate) and consultation list below.

2. **Given** I am viewing the consultations dashboard,  
   **When** the page loads,  
   **Then** the "All" tab is selected by default and shows all consultations across all families I serve, sorted chronologically (newest first).

3. **Given** I am viewing the consultations dashboard,  
   **When** I click on "Upcoming" tab,  
   **Then** I see only consultations with future scheduled dates (status: Scheduled, Confirmed), sorted by date (soonest first).

4. **Given** I am viewing the consultations dashboard,  
   **When** I click on "Completed" tab,  
   **Then** I see only consultations marked as complete, sorted chronologically (newest first).

5. **Given** I am viewing the consultations dashboard,  
   **When** I click on "Cancelled" tab,  
   **Then** I see only consultations cancelled by either party, sorted chronologically (newest first).

6. **Given** I am viewing consultations in any tab,  
   **When** I look at each consultation card,  
   **Then** I can clearly see: family name, consultation title, service type, scheduled date/time, current status, and visual status indicator.

7. **Given** I have consultations across multiple families,  
   **When** I view the dashboard,  
   **Then** each consultation card displays the family name prominently to provide context.

8. **Given** I am viewing the dashboard with many consultations,  
   **When** the page loads,  
   **Then** I see paginated results with options to display 3, 5, or 10 consultations per page (default: 10).

9. **Given** I am viewing any tab,  
   **When** consultation status changes (e.g., family books new consultation, cancels existing one),  
   **Then** tab badge counts update in real-time without requiring page refresh.

**Additional Criteria:**
- [ ] Empty state for each tab shows helpful message and "Schedule Consultation" CTA when no consultations match filter
- [ ] "Schedule Consultation" CTA opens blank consultation creation form (no pre-filling)
- [ ] Tab badges show real-time count of consultations in each category (e.g., "Upcoming (5)")
- [ ] Metric cards update dynamically when tab selection changes to show tab-specific metrics
- [ ] Dashboard loads in < 2 seconds even with 100+ consultations
- [ ] Mobile-responsive layout with collapsed sidebar on smaller screens
- [ ] Keyboard navigation support for accessibility (Tab key navigation, Enter to select)
- [ ] Pagination controls (Previous/Next, page selector) visible when results exceed page size

---

## 🔒 Business Rules

**Display Rules:**

1. **Multi-Family Aggregation:**
   - Dashboard aggregates ALL consultations from ALL families the Consultant serves
   - No family-specific filtering by default (this is cross-family view)
   - Family name displayed on each consultation card for context

2. **Tab Status Definitions:**
   - **All:** Shows all consultations regardless of status (default view)
   - **Upcoming:** Consultations with scheduled date in future AND status in {Scheduled, Confirmed}
   - **Completed:** Consultations with status = Completed
   - **Cancelled:** Consultations with status = Cancelled (by family or consultant)

3. **Default Sorting:**
   - **All tab:** Chronological order (newest created first)
   - **Upcoming tab:** By scheduled date (soonest first)
   - **Completed tab:** By completion date (most recent first)
   - **Cancelled tab:** By cancellation date (most recent first)

4. **Pagination:**
   - User can select page size: 3, 5, or 10 consultations per page
   - Default page size: 10 consultations
   - Traditional pagination with page numbers (not infinite scroll)
   - Pagination state persists when switching tabs

5. **Consultation Card Display:**
   - Must show: Family name, consultation title, service type, scheduled date/time, status badge
   - Optional: Duration, payment status indicator, last activity timestamp
   - Visual status indicator: color-coded badge or icon
   - Service type pulled from predefined service catalog

6. **Metric Cards Calculation:**
   - **Active Services:** Count of consultations with status in {Scheduled, Confirmed, In Progress}
   - **Upcoming Deadlines (Next 7 Days):** Count of consultations with scheduled date within next 7 days
   - **This Month Revenue:** Sum of ONLY paid consultations in current calendar month (excluding pending payments)
   - **Completion Rate:** (Completed Consultations / Total Consultations) × 100 for last 12 months

7. **Real-Time Updates:**
   - Tab badge counts update automatically when consultation status changes
   - Uses WebSocket connection or polling mechanism for real-time updates
   - No page refresh required to see updated counts

**Authorization:**
- **Who can access:** Only Consultants (DOC-USR-006) who have active marketplace profile
- **Data scope:** Consultant sees only their own consultations (multi-tenant isolation by consultant_id)
- **Family visibility:** Consultant can see consultation data only for families where they have active or past bookings

**Edge Cases:**

- **No consultations exist:** Show empty state with "Schedule Consultation" CTA that opens blank form
- **All consultations in one status:** Other tabs show empty state (e.g., no Upcoming → "No upcoming consultations")
- **Consultation spans multiple days:** Display as date range (e.g., "Oct 28 - Oct 30, 2025")
- **Timezone handling:** All dates/times displayed in Consultant's configured timezone
- **Deleted family:** Consultation remains visible with "(Family Deleted)" label
- **Consultation updated while viewing:** Real-time update for badge counts; consultation list updates on page refresh or tab switch
- **Page size change:** When user changes pagination size (3/5/10), current page resets to page 1

---

## 🔔 Notifications Integration

**Related to this Story:**
- When consultation status changes (e.g., family cancels), Consultant receives in-app notification with link to dashboard
- Dashboard may show notification badge when new consultations are booked
- 24-hour reminder before upcoming consultation triggers notification
- Real-time tab badge updates driven by same notification system

*Note: Notification triggering logic is handled by Notification Service (EPIC-XXX), this Story only displays results*

---

## 📝 Notes

**Assumptions:**
- Consultation data model exists with required fields (family_id, consultant_id, status, scheduled_date, service_type, etc.)
- Multi-tenant isolation enforced at API level (consultant sees only their consultations)
- Metric calculations performed efficiently with database indexes
- Frontend uses HashRouter navigation pattern (`/#/consultations`)
- WebSocket or polling mechanism available for real-time updates
- Predefined service catalog exists and is maintained separately

**Implementation Notes:**
- Revenue metric: Include ONLY fully paid consultations (payment_status = "Paid")
- Service type: Reference predefined catalog, not free-text
- Real-time updates: Consider WebSocket connection overhead vs. polling frequency

**Out of Scope for This Story:**
- Search functionality (separate story)
- Advanced filtering by date range or service type (separate story)
- Sorting options beyond default (separate story)
- Calendar integration view (separate epic)
- Export to CSV/PDF (future enhancement)
- Bulk actions (cancel multiple consultations)
- Potential earnings calculation (NOT included)

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-27  
**Story Status:** Ready for Development