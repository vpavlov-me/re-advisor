# User Story 7: Manage Multiple Services from Centralized Dashboard

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Consultant, I want to manage service portfolio from centralized dashboard
**Epic Link:** EPIC-006 - Advisor Service Catalog & Package Builder
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant,
**I want to** manage multiple services from centralized dashboard with status indicators, filtering, and quick actions,
**so that** I easily track my service portfolio, see which services are generating bookings, and quickly perform common management tasks without navigating through multiple screens.

---

## 🎯 Business Context

**Why is this Story important?**

Advisors offering multiple services (typical: 3-7 services) need efficient portfolio management. Scattered navigation and lack of overview leads to poor service management, missed opportunities, and advisor frustration. Dashboard is primary workspace for service operations.

**User pain point being solved:**
- Advisors lose track of which services are active vs. inactive
- Cannot quickly see which services are generating bookings
- Time-consuming to find and edit specific service
- No visibility into overall service portfolio health
- Difficult to compare performance across services

**Business outcome expected:**
- Faster service management (reduce time from 5 minutes to 30 seconds per action)
- Increase active service count (easier management → more services published)
- Improve service quality (quick identification of underperforming services → faster iteration)
- Reduce support requests (self-service dashboard eliminates "how do I find my service?" questions)

**Strategic alignment:**
- Core UX pattern for advisor portal (dashboard = primary workspace)
- Enables data-driven service optimization (show performance metrics)
- Scales to support advisors with 10+ services (future growth)
- Foundation for advanced analytics (service portfolio insights)

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** advisor navigates to "My Services" section in Advisor Portal,
   **When** page loads,
   **Then** system displays services dashboard with three sections: "Active Services (X)", "Drafts (X)", "Inactive Services (X)" where X = count of services in each status, and sections are visually distinct with color-coded headers.

2. **Given** advisor views services dashboard,
   **When** dashboard displays,
   **Then** each section shows service cards in grid layout (desktop: 2-3 columns, mobile: 1 column) with consistent card design including: Service type badge, Service name, Pricing summary, Session duration, Quick stats (bookings count, revenue if available), Status badge, and Action buttons (Edit, Activate/Deactivate, Delete).

3. **Given** advisor has 15 active services,
   **When** Active Services section displays,
   **Then** system shows first 9 services with "Load More" button at bottom OR implements pagination showing "Showing 1-9 of 15" with page navigation.

4. **Given** advisor clicks "Filter" button on dashboard,
   **When** filter menu opens,
   **Then** system displays filter options: Service type dropdown (All, Governance Support, Consultation, One-Time Engagement, Education, Mentorship, Mediation), Sort by dropdown (Last Updated, Service Name A-Z, Bookings High-Low, Revenue High-Low), and "Apply Filters" button.

5. **Given** advisor applies filter "Service Type: Mediation" and sort "Bookings: High to Low",
   **When** filters are applied,
   **Then** system updates dashboard showing only Mediation services sorted by booking count descending, and displays active filter indicators "Filtered by: Mediation | Sorted by: Bookings (High to Low)" with "Clear Filters" link.

6. **Given** advisor views service card,
   **When** card displays quick stats,
   **Then** system shows: "X bookings" (count of completed + scheduled bookings), "Last booked: [date]" (most recent booking date), and optional revenue "$X,XXX total" if revenue tracking enabled.

7. **Given** advisor clicks "Edit" action on service card,
   **When** button is clicked,
   **Then** system navigates to service edit form pre-populated with current service data (same flow as Story 8).

8. **Given** advisor views empty section (e.g., no Draft services),
   **When** section displays,
   **Then** system shows empty state message: "No draft services. [Create New Service]" button with helpful illustration/icon.

**Additional Criteria:**
- [ ] Dashboard loads within 2 seconds even with 50+ total services
- [ ] Service cards display placeholder loading skeletons while data fetches
- [ ] Dashboard responsive: Adapts to desktop (multi-column grid), tablet (2 columns), mobile (single column stack)
- [ ] "Create New Service" button prominent and accessible from top of dashboard (sticky header or always visible)
- [ ] Dashboard updates in real-time after service actions (activation, editing, deletion) without full page refresh
- [ ] Tooltips explain quick stats (hover over "X bookings" shows "Total completed and scheduled bookings")

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Figma: [Link to services dashboard - to be added]
- Screenshot: [To be attached]

**User Flow:**
1. Advisor logs into Advisor Portal, clicks "My Services" in main navigation
2. Dashboard page loads with header: "My Services" + prominent "Create New Service" button (primary style, top-right)
3. Below header: Filter/Sort controls (dropdown buttons) aligned right
4. Main content: Three sections with collapsible headers:
   - **Active Services (3)** - Green header, expanded by default
   - **Drafts (1)** - Yellow/Orange header, collapsed by default
   - **Inactive Services (2)** - Gray header, collapsed by default
5. Each section contains service cards in grid (desktop: 3 columns, tablet: 2, mobile: 1)

**Service Card Design (Active Service Example):**
```
[Card border, white background, slight shadow]
┌──────────────────────────────────────┐
│ [Consultation] ✓ Active              │ <- Type badge + Status badge (top-right)
│                                       │
│ Strategic Governance Review          │ <- Service name (H3, bold)
│ $5,000 Fixed Package | 4 hours       │ <- Pricing + Duration (gray text)
│                                       │
│ 📊 8 bookings | Last: Jan 10, 2025   │ <- Quick stats with icons
│ 💰 $40,000 revenue                   │ <- Revenue (if available)
│                                       │
│ [Edit] [Deactivate] [More ▾]         │ <- Action buttons (bottom)
└──────────────────────────────────────┘
```

**Filter/Sort Controls:**
- Filter button: "Filter" with funnel icon, opens dropdown/modal
- Sort button: "Sort: Last Updated ▾" shows current sort, opens dropdown
- Active filters displayed as chips: "🔍 Mediation [×]" (clickable to remove)

**Empty State (No Drafts Example):**
```
┌────────────────────────────────────┐
│  📝                                │
│  No draft services yet             │
│  Save services as drafts to work  │
│  on them over time                 │
│                                    │
│  [Create New Service]              │
└────────────────────────────────────┘
```

**Responsive Behavior:**
- Desktop (>1200px): 3-column grid, side-by-side sections
- Tablet (768-1200px): 2-column grid, sections stack vertically
- Mobile (<768px): 1-column stack, sections collapsed by default, cards full-width

---

## 🔐 Business Rules

**Validation Rules:**
1. **Section counts**: Dynamically calculate and display accurate counts (Active, Drafts, Inactive) in section headers
2. **Card display order default**: Last updated (most recently modified) appears first unless custom sort applied
3. **Quick stats accuracy**: Booking count includes only confirmed bookings (excludes canceled/declined)
4. **Revenue display**: Only shown if advisor has completed bookings with payment records (optional feature)
5. **Pagination trigger**: If section has >9 services, implement pagination OR load more button
6. **Filter persistence**: Applied filters persist across page refreshes (stored in URL params or local storage)

**Authorization:**
- **Who can perform this action:** Any logged-in advisor viewing their own services
- **Who can view results:** Only advisor sees their own dashboard (strict isolation, cannot view other advisors' services)

**Edge Cases:**
- **New advisor with zero services**: Dashboard shows all three empty sections with "Create your first service" prominent call-to-action
- **Advisor with 100+ services**: Implement pagination (show 20 per page) to prevent performance issues
- **Service edited while dashboard open**: Dashboard updates in real-time using WebSocket OR shows "Refresh to see updates" notification
- **Network slow loading**: Show skeleton cards (loading placeholders) while data fetches
- **Filter applied resulting in zero results**: Display "No services match your filters. [Clear Filters]"
- **Mobile: Very long service names**: Truncate with ellipsis "Strategic Governance Review for Large..." with full name in tooltip
- **Section collapsed/expanded state**: Remember user preference in local storage (if user collapses "Inactive", stays collapsed on return)

---

## 🧪 Test Scenarios

**Happy Path:**
1. Advisor "Jane Smith" logs in, navigates to "My Services"
2. Dashboard loads within 2 seconds
3. Sees sections: "Active Services (3)", "Drafts (1)", "Inactive Services (2)"
4. Active section expanded showing 3 service cards in grid:
   - "Governance Consulting": $5,000 Fixed | 8 bookings | $40,000 revenue
   - "Family Mediation": $500/session | 12 bookings | Last: Jan 15
   - "Succession Planning": $200/hour (2hr min) | 3 bookings
5. Drafts section collapsed, clicks header to expand
6. Sees 1 draft: "Estate Planning Workshop" (60% complete) with "Continue Editing" button
7. Inactive section collapsed, clicks to expand
8. Sees 2 inactive services with "Reactivate" buttons and last active dates
9. Applies filter: "Service Type: Consultation" → Dashboard shows only 1 service (Governance Consulting)
10. Changes sort: "Bookings: High to Low" → Services reorder by booking count
11. Clicks "Clear Filters" → Dashboard returns to showing all services
12. Expected result: Efficient portfolio overview, easy filtering, quick actions accessible

**Negative Tests:**
1. **Network error loading dashboard**: System displays error message "Unable to load services. Check connection and try again." with retry button
2. **Advisor deletes all services**: Dashboard shows empty states for all sections with prominent "Create your first service" button
3. **Filter applied with zero results**: System displays "No services match your filters" with "Clear Filters" button to reset

**Edge Cases:**
1. **New advisor - zero services**:
   - Dashboard loads
   - All three sections display empty states
   - Central call-to-action: "Create your first service and start building your marketplace presence" with large "Create New Service" button
   - Optional: Onboarding tips "Tip: Start with your most popular service offering"

2. **Advisor with 50 services**:
   - Active (30), Drafts (15), Inactive (5)
   - Active section shows first 20 services in grid
   - "Load More (10 remaining)" button at bottom
   - Advisor clicks "Load More" → next 10 services append to grid seamlessly
   - Performance: Each load completes in < 1 second

3. **Mobile - Service card interaction**:
   - Advisor on iPhone, views dashboard
   - Services display single-column stack
   - Taps service card → Card expands showing full details inline (alternative: navigates to detail view)
   - Action buttons stacked vertically for touch targets
   - All interactions work with touch (no hover states)

4. **Real-time update scenario**:
   - Advisor has dashboard open in Tab A
   - Opens Tab B, edits service "Mediation" (changes pricing $500 → $600)
   - Returns to Tab A (dashboard)
   - WebSocket update triggers: Dashboard shows notification "Service 'Mediation' updated. Refresh to see changes." OR auto-refreshes service card showing new $600 price
   - Result: Data consistency across tabs/windows

5. **Filter + Sort combination**:
   - Advisor applies filter: "Service Type: Mediation" (narrows to 3 services)
   - Applies sort: "Revenue: High to Low"
   - Dashboard shows 3 Mediation services sorted by revenue descending
   - Active filter chip displays: "🔍 Mediation [×] | Sort: Revenue (High to Low)"
   - Advisor clicks [×] on filter chip → Filter removes, returns to all services still sorted by revenue

**Test Cases Location:** `Knowledge-Base/product-management/test-cases/EPIC-ADV-SERV-001-test-cases.md`

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** 
  - FG-STORY-ADV-SERV-001 (Create Service Offering) - needs services to display
  - FG-STORY-ADV-SERV-005 (Save as Draft) - needs draft status
  - FG-STORY-ADV-SERV-006 (Activate/Deactivate) - needs status management
- **Blocks:** 
  - Analytics/Reporting features - dashboard provides foundation for deeper analytics
  - Bulk actions feature (future) - select multiple services for batch operations

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Dashboard initial load: < 2 seconds for up to 50 services
- Filter application: < 500ms to update display
- Sort application: < 300ms to reorder services
- Service card render: < 100ms per card
- Pagination/Load More: < 1 second per additional page
- Real-time updates: < 1 second latency (if WebSocket implemented)

**Security:**
- Authorization required: Yes (valid advisor JWT token)
- Data isolation: Advisors see ONLY their own services (strict `advisor_id` filtering)
- Dashboard queries: Server-side filtering/pagination (not client-side for large datasets)

**Accessibility:**
- WCAG level: AA compliance
- Keyboard navigation: Tab through service cards, Enter to open service, Arrow keys to navigate grid
- Screen reader: Announces section headings, service counts, card contents in logical order
- Focus indicators: Clear visual indicators when cards/buttons focused
- Status badges: Use both color AND text/icon (not color-dependent)
- Action buttons: Grouped in logical order, clearly labeled

**Browser Support:**
- Same as Story 1 (Chrome, Safari, Firefox, Edge latest 2 versions)
- CSS Grid for layout (modern browsers), graceful degradation to flexbox for older browsers
- Loading skeletons use CSS animations (fallback: static placeholders)

---

## 📝 Notes

**Questions:**
- [ ] Should we display advisor's overall portfolio metrics at top of dashboard (e.g., "Total Services: 6 | Active Bookings: 23 | Monthly Revenue: $15,000")? **Recommendation:** Yes, helpful overview
- [ ] Do we need bulk actions (select multiple services, activate/deactivate all at once)? **Decision:** Future enhancement, not MVP
- [ ] Should dashboard support custom views/layouts (e.g., list view vs. grid view)? **Recommendation:** No for Phase 1, grid view only
- [ ] How to handle advisors with 100+ services (edge case)? **Decision:** Implement pagination (20 per page), add search bar for finding specific services

---

**Template Version:** 1.0.0
**Story Created:** 2025-10-17