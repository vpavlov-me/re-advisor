# User Story - Welcome Banner: Today's Priorities

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As a Consultant, I want to see today's priorities in welcome banner (meetings, tasks, monthly revenue)  
**Epic Link:** FG-EPIC-XXX (Consultant Dashboard - Homepage)  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant (DOC-USR-006),  
**I want to** see today's priorities in welcome banner displaying meetings today, tasks due, and monthly revenue,  
**so that** I can quickly understand what needs my immediate attention and plan my day effectively.

---

## 🎯 Business Context

**Why is this Story important?**

**User Pain Point Being Solved:**
- Consultants managing multiple families waste time navigating between sections to understand daily priorities
- Lack of quick overview leads to missed consultations and overdue tasks
- Revenue visibility is buried in payment settings, making business performance hard to track

**Business Outcome Expected:**
- Reduce time to understand daily priorities from ~3-5 minutes to 5 seconds
- Increase on-time consultation attendance by providing immediate visibility
- Improve task completion rates by surfacing due-today tasks prominently
- Enable consultants to make quick go/no-go decisions about availability based on daily load

**Strategic Alignment:**
- Core component of Consultant productivity optimization initiative
- First impression when consultant logs in - sets tone for efficient platform experience
- Foundation for future priority-based notifications and alerts

---

## ✅ Acceptance Criteria

1. **Given** Consultant has 3 consultations scheduled for today,  
   **When** Consultant lands on homepage,  
   **Then** Welcome banner displays "3 meetings today" with appropriate styling

2. **Given** Consultant has 2 tasks due today,  
   **When** Consultant views welcome banner,  
   **Then** Banner displays "2 tasks due" with visual indicator for urgency

3. **Given** Consultant has earned $12,500.00 this month from completed consultations,  
   **When** Consultant views welcome banner,  
   **Then** Banner displays "Monthly Revenue: $12,500.00" with proper currency formatting

4. **Given** Consultant has 0 consultations scheduled for today,  
   **When** Welcome banner loads,  
   **Then** Display "No consultations scheduled for today" (not "0 meetings today")

5. **Given** Consultant has 0 tasks due today,  
   **When** Welcome banner loads,  
   **Then** Display "All caught up! No tasks due today" with positive tone

6. **Given** Consultant has earned $0 this month,  
   **When** Welcome banner loads,  
   **Then** Display "Monthly Revenue: $0.00" (show zero, don't hide)

7. **Given** Consultant has 150 consultations scheduled for today (edge case),  
   **When** Welcome banner loads,  
   **Then** Display "99+ meetings today" (cap at 99+)

8. **Given** Consultant has earned $1,234,567.89 this month,  
   **When** Welcome banner loads,  
   **Then** Display "Monthly Revenue: $1,234,567.89" with thousands separator

9. **Given** Consultant is viewing dashboard and new consultation is scheduled for today in another tab,  
   **When** Real-time update occurs (within 30 seconds),  
   **Then** Welcome banner updates meeting count automatically without page refresh

10. **Given** Consultant completes a task marked as due today,  
    **When** Real-time update occurs,  
    **Then** "Tasks due" count decrements automatically

**Additional Criteria:**
- [ ] Welcome banner is prominently positioned at top of homepage (above statistics cards)
- [ ] Banner uses brand color scheme (rose/pink background as per design reference)
- [ ] All three metrics are equally visible (no hierarchy in visual weight)
- [ ] Banner is responsive on mobile (stacks vertically or horizontal scroll on small screens)
- [ ] Clicking on each metric navigates to relevant section (meetings → Consultations, tasks → Tasks, revenue → Payment Settings)
- [ ] Loading state displays skeleton/shimmer while fetching data (< 2 seconds target)

---

## 🔑 Business Rules

**Meetings Today Calculation:**
1. **Definition**: Count of consultations where `scheduled_date = TODAY` AND `status IN (SCHEDULED, IN_PROGRESS)`
2. **Timezone**: Use consultant's profile timezone for "today" calculation
3. **Exclusions**: Do NOT count consultations with status `COMPLETED`, `CANCELLED`, or `RESCHEDULED`
4. **Display**: 
   - If count = 0: "No consultations scheduled for today"
   - If count = 1: "1 meeting today"
   - If count > 1 AND ≤ 99: "{count} meetings today"
   - If count > 99: "99+ meetings today"

**Tasks Due Today Calculation:**
1. **Definition**: Count of tasks where `due_date = TODAY` AND `status != COMPLETED` AND `assigned_to = consultant_id`
2. **Scope**: ONLY consultant's own tasks, NOT family-assigned tasks
3. **Timezone**: Use consultant's profile timezone for "today" calculation
4. **Display**:
   - If count = 0: "All caught up! No tasks due today"
   - If count = 1: "1 task due"
   - If count > 1 AND ≤ 99: "{count} tasks due"
   - If count > 99: "99+ tasks due"

**Monthly Revenue Calculation:**
1. **Definition**: SUM of consultation payments where `payment_status = COMPLETED` AND `consultation_date` within current calendar month
2. **Currency**: Always display in consultant's profile currency (default USD)
3. **Formatting**: 
   - Always show 2 decimal places
   - Always include currency symbol ($)
   - Use thousands separator for amounts ≥ $1,000
   - Examples: "$0.00", "$150.00", "$12,500.50", "$1,234,567.89"
4. **Month Definition**: Current calendar month from 1st to last day (midnight to midnight in consultant's timezone)

**Real-Time Updates:**
- Polling interval: 30 seconds
- Update only changed metrics (don't refresh entire banner)
- No visible loading indicators during background updates
- Maintain user's current view (don't force scroll or navigation)

**Authorization:**
- **Who can view**: Consultants only (requires `consultant_id` in session)
- **Data isolation**: Banner shows ONLY data associated with logged-in consultant (multi-tenant safety)

**Edge Cases:**
- **Consultant in multiple timezones**: Use profile timezone setting, not browser timezone
- **Month transitions**: At midnight on last day of month, reset revenue counter to $0.00 for new month
- **Deleted consultations**: If consultation deleted after being counted, real-time update decrements count
- **Network failure**: Show last known values with "Data may be outdated" indicator if refresh fails 3 consecutive times

---

## 🧪 Test Scenarios

**Happy Path:**
1. **Scenario**: Consultant with typical daily load
   - Given: Consultant has 3 consultations today, 5 tasks due, $8,200 earned this month
   - When: Homepage loads
   - Then: Banner shows "3 meetings today | 5 tasks due | Monthly Revenue: $8,200.00"
   - Verify: All metrics clickable, proper formatting, no errors in console

**Negative Tests:**
1. **Scenario**: Zero state across all metrics
   - Given: Consultant has 0 consultations today, 0 tasks due, $0 earned this month
   - When: Homepage loads
   - Then: Banner shows "No consultations scheduled for today | All caught up! No tasks due today | Monthly Revenue: $0.00"
   - Verify: Positive messaging, no awkward empty states

2. **Scenario**: API failure for one metric
   - Given: Meetings API returns 500 error
   - When: Homepage loads
   - Then: Banner shows error indicator for meetings ("Unable to load") while other metrics display normally
   - Verify: Error doesn't crash entire banner, retry mechanism triggers

3. **Scenario**: Unauthorized access attempt
   - Given: User without consultant role tries to access dashboard
   - When: Homepage attempts to load
   - Then: Redirect to appropriate portal or show "Access Denied" message
   - Verify: No data leakage, proper error handling

**Edge Cases:**
1. **Scenario**: Large numbers (99+ handling)
   - Given: Consultant has 150 meetings today (stress test scenario)
   - When: Homepage loads
   - Then: Banner shows "99+ meetings today"
   - Verify: UI doesn't break, tooltip shows exact count on hover (optional)

2. **Scenario**: Revenue with large amount
   - Given: Consultant earned $2,500,000.50 this month
   - When: Homepage loads
   - Then: Banner shows "Monthly Revenue: $2,500,000.50" with proper formatting
   - Verify: No number overflow, thousands separators correct

3. **Scenario**: Timezone edge case (near midnight)
   - Given: Current time is 11:59 PM in consultant's timezone
   - When: Homepage loads and clock strikes midnight
   - Then: "Today" calculations update to new date automatically
   - Verify: Month transition also resets revenue if applicable

4. **Scenario**: Real-time update during viewing
   - Given: Consultant viewing banner with "3 meetings today"
   - When: Admin cancels one of today's consultations in another session
   - Then: Within 30 seconds, banner updates to "2 meetings today" without page refresh
   - Verify: Update is smooth, no flickering, user not disrupted

5. **Scenario**: Multi-family consultant with tasks from different families
   - Given: Consultant has 10 tasks due today across 5 families
   - When: Homepage loads
   - Then: Banner shows "10 tasks due" (all consultant's tasks aggregated)
   - Verify: Family isolation maintained, only consultant's tasks counted

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Initial banner load: < 1 second (target: 500ms)
- Real-time update response: < 30 seconds
- API timeout: 5 seconds before showing error state

**Security:**
- Multi-tenant data isolation enforced (consultant sees only own data)
- No PII exposed in banner (only aggregated counts and revenue)
- API endpoints require valid consultant authentication token

**Accessibility:**
- Screen reader announces metrics in logical order: "3 meetings today, 5 tasks due, monthly revenue 8200 dollars"
- Keyboard navigation: Tab key cycles through clickable metrics
- Color contrast ratio ≥ 4.5:1 for text on background
- Focus indicators visible on all interactive elements

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Mobile Safari (iOS): Latest 2 versions
- Chrome Mobile (Android): Latest 2 versions

**Localization:**
- Currency formatting respects consultant's profile currency setting
- Date/time calculations use consultant's profile timezone
- Number formatting (thousands separator) follows locale conventions

---

## 📝 Notes

**From Epic Discussion:**
- Tasks due today = **consultant's own tasks only**, NOT family-assigned tasks (confirmed in Epic)
- Monthly revenue = sum of COMPLETED consultations in current calendar month
- Real-time updates every 30 seconds (polling interval from Epic)
- Zero state messaging should be **positive and encouraging**, not negative ("All caught up!" not "No tasks")

**Assumptions:**
- Consultation data model provides `scheduled_date` and `status` fields
- Task data model provides `due_date`, `status`, and `assigned_to` fields
- Payment/Revenue API provides `consultation_date` and `payment_status` for monthly aggregation
- Consultant timezone stored in profile settings
- API Gateway enforces consultant authentication and authorization

**Design Considerations:**
- Banner should be visually distinct (brand color: rose/pink background)
- Metrics should be scannable at a glance (large font, clear labels)
- Click targets should be large enough for mobile (minimum 44x44px touch target)
- Loading state should not show "0" placeholders (show skeleton instead)

**Questions Answered from Epic:**
- ✅ Should "Tasks due today" include family-assigned tasks? **NO - consultant's own tasks only**
- ✅ What's the definition of "Monthly revenue"? **Sum of COMPLETED consultations in current month**
- ✅ Real-time update frequency? **30 seconds polling**
- ✅ Zero state messaging tone? **Positive and encouraging**

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-31  
**Story Status:** Ready for Grooming
