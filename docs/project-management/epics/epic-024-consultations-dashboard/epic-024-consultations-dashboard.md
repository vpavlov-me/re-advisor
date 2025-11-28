# EPIC: Consultations Dashboard

> **Epic для централизованного управления консультациями в Advisor Portal**

---

## 📋 Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** Consultations Dashboard - Unified View for Service Request Management  
**Summary:** Create centralized dashboard for Consultants to manage, monitor, and track all consultation services across multiple families with real-time status updates, progress tracking, and revenue visibility  
**Parent User Journey:** FG-UJ-XXX (Consultant Service Delivery Journey)  
**Parent Initiative:** Marketplace & Consultant Platform  
**Priority:** High  
**Epic Link:** FG-EPIC-017

---

## 🎯 Epic Goal

**What will this Epic deliver?**

This Epic will deliver a comprehensive Consultations Dashboard for Consultants that provides:

- Unified view of all service requests across multiple families (All, Upcoming, Completed, Cancelled tabs)
- Real-time consultation status tracking with key performance metrics
- Quick action capabilities (schedule consultations, update status, manage sessions)
- Search and filtering system by date and consultation type
- Overview metrics: Total consultations, Upcoming sessions, Completed sessions %, Total revenue
- Pagination controls with customizable page size (3, 5, or 10 consultations per page)

**Scope Boundaries:**
- **Included:** Dashboard UI, filtering/sorting, metrics cards, empty states, search functionality, quick actions, pagination controls
- **NOT Included:** Payment processing logic (handled by EPIC-015), detailed deliverable management (EPIC-016), booking creation flow (EPIC-013), family-side interface, data export functionality, metrics recalculation based on filters

---

## 👥 Target Users

**Primary Personas:**
- **Consultant** ([DOC-USR-006](consultant-persona.md)) - Managing multiple family engagements, tracking consultations, monitoring revenue
- **Personal Family Advisor** ([DOC-USR-004](personal-family-advisor-persona.md)) - Specialist managing consultations within permitted module scope

**Secondary Personas:**
- **External Consul** ([DOC-USR-005](external-consul-persona.md)) - May coordinate consultations as part of comprehensive family advisory

---

## 📖 User Stories (High-Level)

### Consultant Perspective

1. **As a** Consultant, **I want to** view all my consultations across multiple families in one dashboard with status tabs (All/Upcoming/Completed/Cancelled), **so that** I can prioritize work and track my consultation portfolio efficiently

2. **As a** Consultant, **I want to** see key metrics at a glance (Total consultations, Upcoming sessions, Completion rate, Total revenue earned), **so that** I can monitor business performance without detailed analysis

3. **As a** Consultant, **I want to** filter consultations by date range and consultation type, **so that** I can focus on relevant sessions for specific timeframes or service categories

4. **As a** Consultant, **I want to** quickly schedule new consultations via "Schedule Consultation" button, **so that** I can add bookings without navigating away from dashboard

5. **As a** Consultant, **I want to** search consultations by family name or meeting title, **so that** I can quickly locate specific sessions

6. **As a** Consultant, **I want to** control how many consultations display per page (3, 5, or 10), **so that** I can optimize viewing based on screen size and preference

---

## 🔗 Dependencies

**Upstream Dependencies (Must exist before this Epic):**
- EPIC-013 (Service Request Lifecycle) - Status management, booking data
- EPIC-010 (Calendar & Availability) - Consultation scheduling, session data
- EPIC-015 (Payment Processing) - Revenue calculation data
- EPIC-016 (Deliverable Management) - Completion tracking
- Service Catalog - Predefined consultation types/categories

**Downstream Impact (Features that will enhance this Epic later):**
- Reviews & Ratings system - Will add reputation metrics to dashboard
- Advanced Analytics - Will provide deeper revenue insights
- AI-powered scheduling - Will suggest optimal session planning

**Technical Dependencies:**
- Multi-family data aggregation (Consultant sees across all associated families)
- Real-time status updates (no page refresh required)
- Search indexing for fast consultation lookup
- Notification service integration (for upcoming session alerts)
- Pagination logic with configurable page size

---

## 🎨 Design & UX

**Dashboard Layout Structure:**
```
┌─────────────────────────────────────────────────────┐
│  Header: Overview Metrics Cards (4 stats)          │
│  [Total: 5] [Upcoming: 3] [Completed: 40%] [Rev]   │
├─────────────────────────────────────────────────────┤
│  Left: Main Content          │ Right: Sidebar      │
│  ┌─────────────────────────┐ │ ┌─────────────────┐ │
│  │ Tabs: All | Upcoming    │ │ │ Search & Filters│ │
│  │       Completed | Cancel │ │ │ [Search box]    │ │
│  ├─────────────────────────┤ │ │ [Date ▼]        │ │
│  │                         │ │ │ [Type ▼]        │ │
│  │ [Consultation Cards]    │ │ ├─────────────────┤ │
│  │ or                      │ │ │ Quick Actions   │ │
│  │ [Empty State]           │ │ │ [+ Schedule]    │ │
│  │ "No consultations found"│ │ └─────────────────┘ │
│  │ [Schedule Consultation] │ │                     │
│  ├─────────────────────────┤ │                     │
│  │ Pagination Controls:    │ │                     │
│  │ [Show: 3▼] [<] 1-3/25   │ │                     │
│  │            [>]          │ │                     │
│  └─────────────────────────┘ │                     │
└─────────────────────────────────────────────────────┘
```

**User Flows:**

**Consultant Flow - Viewing Dashboard:**
1. Consultant navigates to Consultations section in Advisor Portal
2. Sees Overview metrics and "All" tab selected by default
3. Dashboard loads first 20 consultations by default
4. Can switch tabs to filter by status (Upcoming, Completed, Cancelled)
5. Can search by family name or meeting title
6. Can apply date and type filters in right sidebar
7. Can adjust page size (3, 5, or 10 per page) via dropdown
8. Can navigate pages using Previous/Next buttons or page numbers
9. Empty state shows "Schedule Consultation" CTA if no results

**Consultant Flow - Scheduling Consultation:**
1. Clicks "+ Schedule Consultation" button (sidebar or empty state)
2. Opens scheduling modal/page (handled by EPIC-013)
3. Completes booking flow
4. Returns to dashboard → new consultation appears in "Upcoming" tab

**Pagination Flow:**
1. User sees "Showing 1-20 of 45" indicator
2. User clicks page size dropdown → selects "5 per page"
3. Display updates to show 1-5 consultations
4. Pagination controls update: "Showing 1-5 of 45" with 9 pages
5. User clicks "Next" → Shows consultations 6-10
6. User can jump to specific page number or use Prev/Next

**Design Principles (based on provided screenshot):**
- **Clean, minimal interface:** Light pink/gray metric cards with icons
- **Tab-based filtering:** Clear status categories without cluttering main view
- **Right sidebar pattern:** Search, filters, and actions separated from content
- **Empty state guidance:** Helpful message with clear CTA when no consultations exist
- **Responsive metrics:** Large numbers with contextual labels for quick scanning
- **Flexible pagination:** User controls display density for optimal viewing

---

## 🔔 Notifications

**Does this Epic involve user notifications?** Yes

| Trigger | Recipient | Format | Description |
|---------|-----------|--------|-------------|
| Upcoming session (24 hours) | Consultant | Email + In-App | "Reminder: Consultation with [Family Name] tomorrow at [Time]" |
| Consultation cancelled by family | Consultant | Email + In-App | "[Family Name] cancelled consultation scheduled for [Date]. [Reason if provided]" |
| Consultation rescheduled | Consultant | Email + In-App | "[Family Name] rescheduled consultation from [Old Date] to [New Date]" |
| New consultation booked | Consultant | In-App + Push | "New consultation booked: [Family Name] - [Service Type] on [Date]" |

**Notification Configuration Notes:**
- Default preferences: Email + In-App for cancellations/reschedules, In-App only for 24h reminders
- User opt-out: Consultants can disable non-critical notifications in settings
- Frequency limits: Max 1 reminder per consultation per day
- Digest option: Daily summary of all consultation activity (opt-in)

---

## 🧮 Business Rules

### Display & Filtering Rules

1. **Consultant Multi-Family Aggregation**
   - Dashboard shows ALL consultations across ALL families Consultant serves
   - Each consultation card displays family name for context
   - Default view: "All" tab with chronological order (newest first)

2. **Tab Categories (Based on Provided Design)**
   - **All:** Shows all consultations regardless of status
   - **Upcoming:** Future consultations (scheduled, confirmed)
   - **Completed:** Past consultations marked complete
   - **Cancelled:** Consultations cancelled by either party

3. **Search Functionality**
   - Search by: Family name, meeting title, service type
   - Real-time search results (updates as user types)
   - Case-insensitive matching
   - Minimum 2 characters to trigger search

4. **Date Filter Options**
   - Newest First (default)
   - Oldest First
   - Custom date range picker
   - Predefined ranges: Today, This Week, This Month, Last 30 Days

5. **Consultation Type Filter**
   - Filter pulls from predefined Service Catalog (standardized categories)
   - Examples: Succession Planning, Philanthropy Strategy, Conflict Resolution, Education & Mentorship, Asset Management
   - Multi-select capability (show consultations matching any selected type)
   - "All Types" default option

### Pagination Rules

6. **Pagination Configuration**
   - **Initial Load:** Display 20 consultations by default (before user changes preference)
   - **Page Size Options:** User can select 3, 5, or 10 consultations per page via dropdown
   - **Pagination Controls:**
     - Display format: "Showing X-Y of Z" (e.g., "Showing 1-5 of 45")
     - Previous/Next buttons for sequential navigation
     - Page number display (e.g., "Page 2 of 9")
     - Optional: Direct page jump input field
   - **Preference Persistence:** User's selected page size saved to user preferences (persists across sessions)
   - **Performance:** Consultations load on-demand per page (not all at once)
   - **Empty Pages:** If filters reduce results below page size, show all remaining results without pagination controls

7. **Pagination Behavior with Filters/Search**
   - When filters/search applied: Reset to page 1
   - Pagination controls update to reflect filtered result count
   - Page size preference remains unchanged
   - If results < page size, hide pagination controls

### Metrics Calculation Rules

8. **Overview Metrics Definitions**
   - **Total consultations:** Count of all consultations (all statuses) in lifetime (not affected by date filters)
   - **Upcoming sessions:** Count of consultations with future dates and status ≠ Cancelled (not affected by filters)
   - **Completed sessions:** Percentage = (Completed count / Total non-cancelled) × 100 (lifetime calculation)
   - **Total revenue:** Sum of payments received from all completed consultations only (lifetime total, currency formatted, e.g., "$12,450")
   - **Important:** Metrics show lifetime totals regardless of active filters/search (filters only affect consultation list display)

9. **Revenue Calculation Details**
   - Only consultations with status = "Completed" included
   - Includes: Final payments + Prepayments for completed services
   - Excludes: Pending payments, refunded amounts, cancelled consultations
   - Time range: Lifetime total (all-time), not affected by date filters
   - Updates real-time when consultation marked complete and payment confirmed

10. **Empty State Rules**
    - Show "No consultations found" when:
      - Consultant has zero consultations in system, OR
      - Applied filters return zero results
    - Display helpful message: "Schedule consultations and sessions with your family clients"
    - Show "Schedule Consultation +" button as primary CTA

### Real-Time Update Rules

11. **Dashboard Refresh Logic**
    - Metrics update automatically when new consultation added
    - Tab badges update when consultation status changes
    - No manual page refresh required
    - Polling interval: 30 seconds for real-time data sync
    - Current page view maintained during updates (user not forced to page 1)

---

## 📝 Notes

**Assumptions:**
- Consultation lifecycle statuses defined in EPIC-013 are stable
- Revenue calculation logic (EPIC-015) provides reliable completed payment data via API
- Search indexing supports fast query performance (< 500ms)
- Multi-tenant data isolation enforced at database level (consultant sees only associated families)
- Service Catalog provides standardized consultation type categories
- Pagination uses standard page-based navigation (not infinite scroll/load more)

**Design Considerations:**
- Dashboard must load quickly even with 100+ consultations (target: < 2s initial load)
- Empty state should be encouraging, not discouraging (positive CTA)
- Metric cards should show trend indicators (↑↓) in future iterations
- Search results should highlight matching terms for better UX
- Pagination controls should be accessible (keyboard navigation, screen reader support)
- Mobile view should simplify pagination (fewer options, larger touch targets)
- Accessibility: WCAG 2.1 AA compliance (keyboard navigation, screen reader support)

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-27  
**Epic Status:** Draft - Awaiting Stakeholder Review