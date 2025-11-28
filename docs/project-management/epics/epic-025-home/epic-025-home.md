# ðŸ"‹ Epic: Consultant Dashboard - Homepage

## ðŸ"‹ Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** Consultant Dashboard - Homepage  
**Summary:** Comprehensive dashboard for consultants to monitor client portfolio, consultations, revenue, and communications in one centralized view  
**Parent User Journey:** [To be linked after Journey creation]  
**Parent Initiative:** [To be linked if part of larger Advisor Portal initiative]  
**Priority:** High  
**Epic Link:** FG-EPIC-XXX

---

## ðŸŽ¯ Epic Goal

**What will this Epic deliver?**

A complete homepage dashboard for Consultants that provides:

**User-Facing Value:**
- **At-a-glance overview** of key business metrics (clients, services, revenue, consultations)
- **Today's priorities** in welcome banner (meetings today, tasks due, month's revenue)
- **Upcoming consultations management** with detailed consultation cards showing family, members, schedule, and payment status
- **Recent messages** from families for quick communication access
- **Quick action shortcuts** for common tasks (schedule, message, manage families, knowledge center)
- **Real-time data updates** to ensure consultants always see current information

**Business Value:**
- Increases consultant productivity by centralizing critical information
- Reduces time spent navigating between sections
- Improves consultation preparation with quick access to upcoming meetings
- Enhances revenue visibility and tracking
- Enables faster response to family communications

**Scope Boundaries:**

**✅ INCLUDED:**
- Welcome banner with real-time metrics (meetings today, tasks due, monthly revenue)
- 4 statistics cards (Family Clients, Services, Active Consultations, Month's Revenue)
- Upcoming Consultations list with detailed consultation cards
- Recent Messages preview (3 most recent unread)
- Quick Actions sidebar (4 primary actions)
- Account Information section
- Real-time data updates
- Responsive layout for desktop and mobile

**❌ NOT INCLUDED:**
- Filters or search in consultation/message lists
- Pagination (showing fixed number of items with "View All" links)
- Dashboard layout customization
- Advanced analytics or reporting
- Calendar integration
- Notification preferences management
- Detailed consultation management (covered in separate Consultations Epic)

---

## ðŸ'¥ Target Users

**Primary Personas:**
- **Consultant** (DOC-USR-006) - Independent marketplace professional managing multiple family clients

**Secondary Personas:**
- **Premium Consultant** (DOC-USR-006) - With additional Family Portal management capabilities

---

## ðŸ"– User Stories (High-Level)

1. **As a** Consultant, **I want to** see today's priorities in welcome banner (meetings, tasks, monthly revenue), **so that** I can quickly understand what needs my immediate attention

2. **As a** Consultant, **I want to** view key business metrics (family clients, services, active consultations, monthly revenue) in statistics cards, **so that** I can monitor my practice health at a glance

3. **As a** Consultant, **I want to** see detailed upcoming consultation cards with family name, members, date/time, and payment status, **so that** I can prepare for meetings and track consultation lifecycle

4. **As a** Consultant, **I want to** view recent unread messages from families, **so that** I can respond quickly to important communications

5. **As a** Consultant, **I want to** access quick action shortcuts (schedule, message, manage families, knowledge center), **so that** I can perform common tasks without navigating away from dashboard

6. **As a** Consultant, **I want to** see real-time updates on dashboard, **so that** I always have current information without manual refresh

7. **As a** Consultant, **I want to** click "View All" links to navigate to full pages, **so that** I can access complete lists when needed

8. **As a** Consultant, **I want to** click on consultation cards to view full details, **so that** I can manage specific consultations

9. **As a** Consultant, **I want to** access consultation actions via three-dot menu, **so that** I can reschedule, cancel, or modify consultations quickly

---

## ðŸ"— Dependencies

**Upstream Dependencies (Data Sources):**
- **Family-Advisor Association Table** - provides Family Clients count and list
- **Service Catalog Epic** - provides Services count (consultant's service offerings)
- **Consultations Epic** (not yet implemented) - provides:
  - Active consultations count
  - Completed consultations count
  - Upcoming consultations list with details
  - Meetings today count
- **Payment Settings** - provides revenue data (total and monthly)
- **Messages Epic** (separate) - provides recent unread messages
- **Task Management** (possibly separate epic) - provides tasks due today count
- **Auth Service** - provides current user profile data

**Technical Dependencies:**
- Advisor Portal Service (port 8011) must be operational
- Real-time update mechanism (WebSocket or polling)
- API Gateway for routing dashboard data requests

**Blocking Dependencies:**
- ⚠️ **CRITICAL:** Consultations Epic must be planned/groomed to define consultation data model and API contracts
- ⚠️ Service Catalog data model must exist (or be defined as part of this Epic)

---

## ðŸ" Design & UX

**UX Notes:**

**Layout Structure:**
```
[Top Navigation Bar]
[Breadcrumb: Home > Dashboard]
[Last Updated | Auto-refresh | Shortcuts]

[Welcome Banner - Full Width]
├─ Greeting with user name
├─ 3 meetings today
├─ 2 tasks due date today
└─ Month's revenue: $7,012.00

[4 Statistics Cards - Grid]
├─ Family Clients: 6
├─ Services: 3
├─ Active consultations: 2
└─ Month's Revenue: $7,012.00

[Main Content - 2 Column Layout]
├─ LEFT COLUMN (wider):
│   ├─ Upcoming Consultations
│   │   ├─ Section header with "View All" link
│   │   └─ Consultation cards (detailed)
│   └─ Recent Messages
│       ├─ Section header with "View All" link
│       └─ Message preview cards (3 latest)
└─ RIGHT COLUMN (sidebar):
    ├─ Quick Actions (4 buttons)
    └─ Account Information
```

**Welcome Banner Component (Reusable):**

⚠️ **IMPORTANT:** The Welcome Banner is a **single reusable component** used across both:
- **Family Portal Dashboard** (for Family Members and Family Council)
- **Advisor Portal Dashboard** (for Consultants)

**Component Characteristics:**
- **Same component architecture** - one codebase, different configurations
- **Different visual design** - styling varies by portal (color scheme, layout)
- **Different content** - metrics and text adapt to user role:
  - **Family Portal:** Shows family-specific metrics (family meetings, family tasks, family activity)
  - **Advisor Portal:** Shows consultant-specific metrics (consultations, tasks, revenue)
- **Props-driven customization** - component accepts props for role, metrics, styling
- **Consistent structure** - greeting + 3 key metrics in both portals

**Example Usage:**
- Family Portal: `<WelcomeBanner role="family" metrics={familyMetrics} theme="blue" />`
- Advisor Portal: `<WelcomeBanner role="consultant" metrics={consultantMetrics} theme="pink" />`

**Consultation Card Components:**
- Left pink vertical bar indicator
- Title: "Constitution Workshop"
- Subtitle: "Roys Family" (family name)
- Members section with avatars + count
- Date and Time: "15 July - 06:00 — 07:00 PM"
- Badges: "Paid" (cyan), "Scheduled" (cyan)
- Actions: Three-dot menu + right arrow
- Card is clickable to open full consultation details

**Interactive Elements:**
- Statistics cards have "See More >" link (navigates to detail page)
- Consultation cards are clickable (opens consultation detail)
- Three-dot menu on consultation cards (opens action menu)
- Message cards are clickable (opens message thread)
- Quick Action buttons trigger respective actions
- "View All" links navigate to full lists

**Real-time Updates:**
- Dashboard auto-refreshes every 1 minute (configurable)
- "Auto-refresh ON" indicator in top bar
- "Last Updated: 1 Min Ago" timestamp
- Option to manually refresh with refresh icon

---

## ðŸ"" Notifications

**Does this Epic involve user notifications?** Yes

| Trigger | Recipient | Format | Description |
|---------|-----------|--------|-------------|
| New consultation scheduled | Consultant | In-App + Email | "New consultation 'Constitution Workshop' scheduled with Roys Family for 15 July 06:00 PM" |
| Consultation starting in 15 minutes | Consultant | In-App + Push | "Reminder: 'Constitution Workshop' with Roys Family starts in 15 minutes" |
| New unread message from family | Consultant | In-App + Push | "New message from Clara Harrington (Roys Family)" with message preview |
| Task due today | Consultant | In-App | "You have 2 tasks due today" - shown in welcome banner |
| Monthly revenue milestone reached | Consultant | In-App | "Congratulations! Your monthly revenue reached $10,000" |
| Payment received for consultation | Consultant | In-App + Email | "Payment received: $500 for 'Constitution Workshop' with Roys Family" |

**Notification Configuration Notes:**
- Default: All notifications enabled for consultants
- User can manage preferences in Profile Settings (not part of this Epic)
- In-app notifications appear as red badge on bell icon
- Max frequency: 1 reminder per consultation, no spam protection needed
- No localization in MVP (English only)

---

## ðŸ§® Business Rules

**Data Display Rules:**

1. **Welcome Banner Metrics:**
   - **Meetings today:** Count of consultations with `date = TODAY` and `status = SCHEDULED`
   - **Tasks due today:** Count of tasks with `due_date = TODAY` and `status != COMPLETED`
   - **Month's revenue:** Sum of payments with `payment_date` in current month and `status = COMPLETED`

2. **Statistics Cards:**
   - **Family Clients:** Count of unique families associated with consultant via family-advisor association table
   - **Services:** Count of active services in consultant's service catalog where `status = ACTIVE`
   - **Active consultations:** Count of consultations with `status IN (SCHEDULED, IN_PROGRESS)`
   - **Month's Revenue:** Same as welcome banner (ensures consistency)

3. **Upcoming Consultations Display:**
   - Show consultations with `date >= TODAY` AND `status = SCHEDULED`
   - Sort by `date` ASC, then `start_time` ASC (earliest first)
   - Display maximum **5 consultation cards** on dashboard
   - "View All" link navigates to full Consultations page
   - Each card shows:
     - Consultation title (from consultation record)
     - Family name (from associated family)
     - Members: First 2-3 avatar images + "and X more" text
     - Date and time in format "DD MMM - HH:MM — HH:MM"
     - Payment status badge: "Paid" (if payment completed), "Pending" (if awaiting payment)
     - Scheduling status badge: "Scheduled", "Confirmed", "Rescheduled"

4. **Recent Messages Display:**
   - Show **3 most recent unread messages** ordered by `created_at DESC`
   - Display: conversation title, sender name + avatar, message preview (first 100 chars), timestamp, "X new" badge
   - "View All" link navigates to full Messages page
   - If no unread messages, show empty state: "No new messages"

5. **Quick Actions:**
   - Always visible, always enabled (no permission checks in MVP)
   - Actions:
     1. **Schedule a consultation** → Opens consultation scheduling flow
     2. **Send message** → Opens message composer
     3. **Manage families** → Navigates to Families & Services page
     4. **Knowledge center** → Navigates to Knowledge Center

6. **Real-time Updates:**
   - Dashboard auto-refreshes data every **60 seconds** (configurable)
   - Show "Auto-refresh ON" indicator in top bar
   - Display "Last Updated: X Min Ago" timestamp
   - User can manually refresh with refresh icon
   - Updates occur **without full page reload** (partial data fetch)

**Data Consistency Rules:**

7. **Revenue Consistency:**
   - Month's Revenue in welcome banner MUST match Month's Revenue statistics card
   - If mismatch detected, log error and show most recent data from Payment Settings

8. **Count Consistency:**
   - Meetings today count in banner MUST match count of consultation cards with `date = TODAY`
   - If showing "3 meetings today" but only 2 cards visible, indicate "(showing 2 of 3)"

**Permission & Access Rules:**

9. **Consultant-Only Access:**
   - Dashboard accessible ONLY to users with `role = CONSULTANT` or `role = PREMIUM_CONSULTANT`
   - Family Members, Family Council, Personal Family Advisors, External Consuls **cannot** access this dashboard
   - Redirect unauthorized users to appropriate portal

10. **Data Isolation:**
    - All data shown MUST be filtered by `consultant_id = current_user.id`
    - Consultant can ONLY see:
      - Their own family clients (via association table)
      - Their own consultations
      - Messages sent to them
      - Their own revenue
    - **NEVER show data from other consultants**

**Edge Cases:**

11. **Zero State Handling:**
    - If Family Clients = 0: Show "Get started by connecting with families in the Marketplace"
    - If Upcoming Consultations = 0: Show "No upcoming consultations. Schedule your first consultation!"
    - If Recent Messages = 0: Show "No new messages"
    - If Services = 0: Show "Add services to your catalog to start accepting bookings"

12. **Large Numbers:**
    - If count > 99: Display "99+" (e.g., "99+ Family Clients")
    - If revenue > $999,999: Display with thousands separator (e.g., "$1,234,567.00")

---

## ðŸ" Notes

**Technical Considerations (for reference, not implementation details):**
- Dashboard should load within 2 seconds on average connection
- Real-time updates should not cause visible UI flickering
- Consider caching strategy for frequently accessed data (family clients, services)
- Ensure mobile responsiveness (single column layout on mobile)

**Assumptions:**
- Consultation data model will be defined in separate Consultations Epic
- Service Catalog exists or will be created as part of Consultant onboarding
- Payment Settings provides accurate revenue data via API
- Messages Epic provides unread message count and preview data

**Open Questions for Refinement:**
- Should "Tasks due today" include only consultant's own tasks or also family-assigned tasks? **Decision: Consultant's own tasks only**
- What happens if consultant has 50+ upcoming consultations? **Decision: Show only 5, rest accessible via "View All"**
- Should consultation cards show all family members or just key participants? **Decision: Show first 2-3 avatars + "and X more"**
- What's the definition of "Active consultation"? **Decision: SCHEDULED or IN_PROGRESS status**

**Future Enhancements (Not in Scope):**
- Dashboard customization (drag-and-drop widgets)
- Filters and search in consultation/message lists
- Inline consultation rescheduling from dashboard
- Revenue trend charts and analytics
- Integration with external calendar (Google, Outlook)
- Export dashboard data to PDF report

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-31  
**Epic Status:** Draft - Ready for Grooming

---

## ✅ Next Steps

1. **Review Epic** with Product Team and stakeholders
2. **Groom Consultations Epic** to define consultation data model and API contracts (BLOCKING)
3. **Define Service Catalog** data model if not exists
4. **Create Figma designs** for all dashboard components
5. **Break down into User Stories** (10-15 stories estimated)
6. **Estimate story points** during sprint planning
7. **Prioritize stories** into sprints (suggest 2-3 sprints for full dashboard)