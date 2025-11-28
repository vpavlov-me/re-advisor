# User Story: Payment Status Visibility and Alerts

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As an advisor, I want to see payment status across all services with visual alerts for pending payments
**Epic Link:** FG-XXX [Link to Family Section Epic]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant (Advisor),
**I want to** see clear payment status across all my family clients and services with visual alerts for pending payments,
**so that** I can quickly identify which families have unpaid invoices, follow up proactively, and track my revenue effectively.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point being solved:**
Advisors currently have no visibility into payment status from the main Family Clients list. They must open each family individually and check services to find pending payments. This creates:
- Missed follow-ups on unpaid invoices
- Poor cash flow management
- Time wasted checking each family manually
- Risk of forgotten pending payments

**Business outcome expected:**
- Improved cash flow for advisors through timely payment follow-ups
- Better financial visibility across entire client portfolio
- Reduced time spent tracking payments manually
- Increased advisor satisfaction with platform financial tools

**Strategic alignment:**
Supports advisor financial management and revenue tracking, which is critical for advisor retention and satisfaction. Aligns with goal of making Advisor Portal comprehensive practice management tool.

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** I am viewing the Family Clients table,
   **When** I look at a family row,
   **Then** I see a "Payment" column showing aggregated payment status across all services for that family.

2. **Given** a family has services with different payment statuses,
   **When** aggregation logic is applied,
   **Then** status is determined by priority: Pending > Paid > Not Invoiced
   - If ANY service has Pending payment → show "Pending"
   - If ALL services are Paid and none Pending → show "Paid"
   - If NO services have invoices → show "Not Invoiced"

3. **Given** I am viewing Family Details sidebar,
   **When** at least one service for this family has Pending payment status,
   **Then** I see a (!) indicator on the "Services" tab label.

4. **Given** I open the Services tab in Family Details sidebar,
   **When** I view the services table,
   **Then** each service row shows payment status badge with appropriate color:
   - **Paid**: Green badge
   - **Pending**: Yellow/Orange badge  
   - **Not Invoiced**: Gray badge

5. **Given** payment status changes for any service (e.g., pending → paid),
   **When** I view Family Clients table,
   **Then** aggregated payment status updates accordingly.

6. **Given** the (!) indicator is shown on Services tab,
   **When** all pending payments are resolved,
   **Then** the (!) indicator disappears.

**Additional Criteria:**
- [ ] Payment column is sortable (Pending first, then Paid, then Not Invoiced)
- [ ] Payment badges are visually consistent with platform design system
- [ ] (!) indicator is visually distinct and draws attention (red or orange)
- [ ] Tooltip on Payment column explains aggregation logic
- [ ] Empty state: if family has NO services, Payment column shows "-" or "No Services"

---

## 🔍 Design & UX

**User Flow:**

**Flow 1: Viewing Payment Status from Family List**
1. Advisor navigates to Family Section → Family Clients table
2. Advisor scans Payment column to identify families with pending payments
3. Advisor clicks on family with Pending status
4. Family Details sidebar opens with (!) indicator on Services tab
5. Advisor opens Services tab and sees which specific service(s) have pending payment

**Flow 2: Following Up on Pending Payment**
1. Advisor sees (!) indicator on Services tab
2. Advisor opens Services tab
3. Advisor identifies service with Pending payment (yellow badge)
4. Advisor takes action: contacts family, sends reminder, etc.
5. After payment received, status updates to Paid (green)
6. (!) indicator disappears from Services tab
7. Aggregated payment status in Family Clients table updates

**Flow 3: Reviewing Overall Payment Health**
1. Advisor opens Family Clients table
2. Advisor sorts by Payment column (Pending first)
3. Advisor sees all families with pending payments grouped at top
4. Advisor prioritizes follow-up actions based on this list

---

## 🔒 Business Rules

**Validation Rules:**
1. **Aggregation Logic**: Payment status aggregation follows strict priority:
   - Priority 1: Pending (if ANY service is Pending)
   - Priority 2: Paid (if ALL services are Paid)
   - Priority 3: Not Invoiced (if NO services have invoices)
   
2. **(!) Indicator Logic**: 
   - Show indicator ONLY when at least one service has Pending status
   - Hide indicator when all payments are Paid or Not Invoiced

3. **Color Coding**:
   - Paid: Green (#10B981 or similar)
   - Pending: Yellow/Orange (#F59E0B or similar)
   - Not Invoiced: Gray (#6B7280 or similar)

**Authorization:**
- **Who can view:** Any authenticated advisor can view payment status for their own family clients
- **Who can edit:** Payment status is system-generated based on service invoice status (not directly editable here)

**Edge Cases:**
- **Family with no services**: Show "-" or "No Services" in Payment column
- **Service with invoice but no payment recorded**: Consider as "Pending"
- **Multiple pending services**: Still show single "Pending" status (aggregated)
- **Service deleted after payment**: Payment history should remain visible

---

## 🧪 Test Scenarios

**Happy Path:**
1. Advisor views Family Clients table with 3 families:
   - Family A: 2 services (both Paid) → shows "Paid" status (green)
   - Family B: 2 services (1 Paid, 1 Pending) → shows "Pending" status (yellow)
   - Family C: 1 service (Not Invoiced) → shows "Not Invoiced" status (gray)
2. Advisor clicks Family B
3. Services tab shows (!) indicator
4. Services table shows: Service 1 (green badge), Service 2 (yellow badge)

**Negative Tests:**
1. **No services exist**: Family Clients table shows "-" in Payment column
2. **All services deleted**: Payment column updates to show "-"
3. **Invalid payment status data**: System shows "Unknown" with warning icon

**Edge Cases:**
1. **Service payment status changes while viewing**: 
   - Advisor viewing Family Details
   - Service payment marked as paid in another session/tab
   - Status updates in real-time or on refresh
   - (!) indicator disappears
   
2. **Multiple pending payments across many services**:
   - Family has 10 services, 3 are Pending
   - Still shows single "Pending" status in main table
   - All 3 services show yellow badge in Services table
   - (!) indicator appears on Services tab

3. **Sorting by Payment status**:
   - Click Payment column header
   - All Pending families appear first
   - Then Paid families
   - Then Not Invoiced families
   - Then families with no services (-)

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Payment status aggregation calculation: < 100ms per family
- (!) indicator update: Real-time or < 1 second after status change
- Sorting by payment status: < 200ms for 100+ families

**Accessibility:**
- Payment status badges have aria-labels for screen readers
- (!) indicator has descriptive aria-label: "Pending payments require attention"
- Color is not the only indicator (use icons + text)
- Keyboard navigation: tab through payment statuses

**Browser Support:**
- Chrome: Latest
- Safari: Latest
- Edge: Latest

---

## 📝 Notes

**Open Questions:**
- ✅ What happens if service is cancelled but payment was already made? → Show as "Paid" (service history preserved)
- ✅ Should payment status be clickable to open services tab directly? → Future enhancement, not in this story
- ✅ Do we need payment amount visible in aggregated status? → No, just status. Amount visible in Services table
- ✅ Should we show count of pending services (e.g., "Pending (2)")? → Future enhancement, start with simple status badge
- ✅ Real-time updates or manual refresh? → Manual refresh acceptable for MVP, real-time is future enhancement

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-23