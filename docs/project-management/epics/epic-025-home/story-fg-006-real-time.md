# User Story: Real-Time Dashboard Updates

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As a Consultant, I want to see real-time updates on dashboard, so that I always have current information without manual refresh  
**Epic Link:** FG-EPIC-XXX [Consultant Dashboard - Homepage]  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant,  
**I want to** see real-time updates on dashboard without manual page refresh,  
**so that** I always have current information about my consultations, messages, revenue, and clients.

---

## 🎯 Business Context

**Why is this Story important?**

Consultants need to stay informed about their practice in real-time to provide responsive service to families. Manual page refreshes are disruptive and may cause consultants to miss important updates like:
- New consultation bookings requiring preparation
- Urgent messages from families needing immediate response
- Consultation status changes affecting schedule
- Revenue updates reflecting completed payments

Real-time updates enable consultants to be proactive rather than reactive, improving client satisfaction and operational efficiency.

**Business Value:**
- Improved consultant responsiveness (faster reaction to family needs)
- Better client satisfaction (no missed messages or bookings)
- Reduced manual effort (no need to refresh page constantly)
- More accurate decision-making (always current data)

---

## ✅ Acceptance Criteria

### Data Updates

1. **Given** I am viewing the dashboard with 3 upcoming consultations,  
   **When** a family books a new consultation with me,  
   **Then** the upcoming consultations count increments to 4 automatically AND the new consultation appears in the Upcoming Consultations list without page refresh.

2. **Given** I am viewing the dashboard with 2 active consultations,  
   **When** a scheduled consultation starts (reaches start time),  
   **Then** the active consultations count increments to 3 automatically AND the consultation status updates to "Active" in real-time.

3. **Given** I am viewing the dashboard with Monthly Revenue of $5,000,  
   **When** a family completes payment for a consultation,  
   **Then** the Monthly Revenue updates automatically to reflect the new amount in both Welcome Banner and Statistics Card.

4. **Given** I am viewing the dashboard with 0 unread messages,  
   **When** a family sends me a new message,  
   **Then** the message appears in Recent Messages section automatically AND unread count updates in real-time.

5. **Given** I am viewing the dashboard with 6 Family Clients,  
   **When** a new family associates with my profile,  
   **Then** the Family Clients count increments to 7 automatically in the Statistics Card.

### User Experience

6. **Given** dashboard is displaying data,  
   **When** real-time updates occur,  
   **Then** UI updates smoothly without visible flickering, jumping, or layout shifts.

7. **Given** I am scrolling through Upcoming Consultations list,  
   **When** a real-time update adds a new consultation,  
   **Then** my scroll position is maintained AND new item appears without disrupting my current view.

8. **Given** dashboard is open for more than 30 minutes,  
   **When** real-time updates continue to arrive,  
   **Then** all metrics and lists remain accurate and synchronized without requiring manual refresh.

### Edge Cases

9. **Given** I lose internet connection while viewing dashboard,  
   **When** connection is restored,  
   **Then** dashboard automatically fetches latest data and updates all components to current state.

10. **Given** multiple rapid changes occur (e.g., 3 messages arrive within 10 seconds),  
    **When** updates are processed,  
    **Then** all changes are reflected accurately without data loss or UI performance degradation.

**Additional Criteria:**
- [ ] All 6 dashboard components receive real-time updates: Welcome Banner, Statistics Cards, Upcoming Consultations, Recent Messages, Tasks due today badge, Completed consultations count
- [ ] Updates occur with maximum 5-second latency from actual event
- [ ] No full page reload occurs when data updates
- [ ] User can continue interacting with dashboard during updates (no blocking)
- [ ] Updates work consistently across all supported browsers (Chrome, Safari)

---

## 🔑 Business Rules

**Update Frequency:**
1. **Critical updates** (new messages, new bookings): Near-instant (< 5 seconds latency)
2. **Metric updates** (revenue, consultation counts): Every 30 seconds or on specific events
3. **List updates** (Upcoming Consultations, Recent Messages): On data change events

**Update Scope:**
4. **Welcome Banner** updates: Upcoming consultations count, Active consultations count, Monthly Revenue
5. **Statistics Cards** updates: All 4 cards (Family Clients, Active consultations, Completed consultations, Monthly Revenue)
6. **List Updates**: First 5 items in Upcoming Consultations, First 3 items in Recent Messages
7. **Badge Updates**: Tasks due today count, Unread messages count (in sidebar if exists)

**Update Priority:**
8. **High priority**: New messages (immediate notification), New consultation bookings (immediate)
9. **Medium priority**: Status changes (consultation started/ended), Revenue updates
10. **Low priority**: Metric recalculations (family clients, completed consultations)

**Authorization:**
- **Who can perform this action:** Only authenticated Consultant
- **Who can view results:** Only the consultant viewing their own dashboard (data isolated by consultant_id)

**Edge Cases:**
- **No data**: If zero consultations/messages, show empty states without errors
- **Large numbers**: If consultations > 99, display "99+" without breaking updates
- **Concurrent users**: If consultant has dashboard open in multiple tabs, all tabs sync automatically
- **Session expiry**: If JWT expires during updates, redirect to login without data corruption

---

## 📋 Design & UX

**User Flow:**
1. Consultant opens dashboard → Initial data loads
2. Dashboard establishes real-time connection
3. Background: System monitors for data changes
4. When change occurs → Dashboard receives update notification
5. Dashboard updates specific component smoothly (no flicker)
6. User sees updated data without interruption

**UX Principles:**
- **Non-disruptive**: Updates happen in background, don't interrupt user actions
- **Smooth transitions**: Use fade-in animations for new items (< 300ms)
- **Maintain context**: Preserve scroll position, don't reset user's view
- **Visual feedback**: Optional subtle highlight on updated items (e.g., brief color change)

---

## 🧪 Test Scenarios

**Happy Path:**
1. Open dashboard → Verify initial data loads
2. Trigger consultation booking (via separate session) → Verify consultation appears within 5 seconds
3. Trigger new message (via separate session) → Verify message appears in Recent Messages
4. Simulate consultation start time → Verify Active count increments
5. Simulate payment completion → Verify Monthly Revenue updates
6. Leave dashboard open for 30 minutes → Verify all data remains accurate

**Negative Tests:**
1. **Network interruption**: Disconnect internet → Reconnect → Verify dashboard recovers and shows current data
2. **Invalid data**: Backend sends malformed update → Verify dashboard handles gracefully (logs error, retries)
3. **Unauthorized update**: Attempt to inject update for different consultant → Verify rejected (security)
4. **Session expiry**: JWT expires during active updates → Verify graceful redirect to login

**Edge Cases:**
1. **Rapid updates**: Send 10 updates within 5 seconds → Verify all processed correctly without UI freeze
2. **Zero state**: Dashboard has no data → Send first update → Verify empty state replaced with data
3. **Large dataset**: 50 consultations exist → Update one → Verify only visible items re-render efficiently
4. **Multiple tabs**: Open dashboard in 2 tabs → Update in one → Verify other tab syncs
5. **Browser background**: Dashboard tab in background → Switch back → Verify updates accumulated and displayed

---

## ⚠️ Non-Functional Requirements

**Security:**
- Authorization required: Yes (JWT token validation)
- Data encryption: Yes (HTTPS for real-time connection)
- PII handling: Yes - ensure updates only sent to authorized consultant

**Performance:**
- Update latency: < 5 seconds from event to UI update
- UI render time: < 100ms per update (no visible lag)
- Memory management: No memory leaks during long sessions (test 2+ hours)

**Browser Support:**
- Chrome: Latest version
- Safari: Latest version

**Other:**
- Connection resilience: Automatic reconnection after network interruption
- Scalability: Support up to 100 concurrent consultant dashboards with real-time updates
- Accessibility: Screen readers announce critical updates (new messages, new bookings)

---

## 📝 Notes

**Implementation Assumptions:**
- Consultation data model will be defined in Consultations Epic (BLOCKING dependency)
- Messages Epic provides message events and unread count API
- Payment Settings provides revenue update events
- Real-time mechanism (WebSocket/SSE/polling) will be chosen during technical design

**Update Strategy:**
- Prefer WebSocket for true real-time bidirectional communication
- Fallback to Server-Sent Events (SSE) if WebSocket not supported
- Last resort: Polling with 30-second interval (graceful degradation)

**Monitoring:**
- Track update latency metrics (p50, p95, p99)
- Monitor WebSocket connection stability
- Alert if update delivery fails for > 10 seconds

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-31
