# User Story: Enhanced Family Clients Table with Role, Meetings, and Payment

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As an advisor, I want to see enhanced family table with Role, Meetings, and Payment columns, so that I can quickly assess status of all my family clients and prioritize my work  
**Epic Link:** FG-EPIC-XXX [Family Client Management Workspace]  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Advisor (Consultant / External Consul / Personal Family Advisor),  
**I want to** see an enhanced family clients table with Role, Meetings, and Payment information,  
**so that** I can quickly assess the status of all my family clients, identify urgent matters (unpaid invoices, upcoming meetings), and prioritize my daily work efficiently.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point being solved:**
- Advisors currently lack centralized view of their family portfolio status
- No quick way to see which families need immediate attention (unpaid invoices, upcoming meetings)
- Cannot quickly identify their role in each family (External Consul vs Personal FA)
- Must navigate to multiple places to understand work priorities

**Business outcome expected:**
- Advisors spend less time searching for critical information
- Faster response to families with pending meetings or payment issues
- Better prioritization of advisor workload across multiple families
- Improved client satisfaction through proactive engagement

**Strategic alignment:**
- Core Advisor Portal functionality enabling effective multi-family management
- Foundation for Family Workspace (subsequent stories depend on this table)
- Critical for Consultant marketplace success (efficient portfolio management)

---

## ✅ Acceptance Criteria

1. **Given** I am logged in as Advisor with associated families,  
   **When** I navigate to "Families" section,  
   **Then** I see a table displaying all my family clients with columns: Family Name | Role | Members | Meetings | Payment | Status | Last Contact | Actions.

2. **Given** I am viewing the family clients table,  
   **When** I look at the "Role" column,  
   **Then** I see my role for each family displayed as badge with text: "External Consul" | "Consultant" | "Personal Family Advisor".

3. **Given** I am viewing the family clients table,  
   **When** I look at the "Meetings" column,  
   **Then** I see one of the following:
   - "3 upcoming" (number of scheduled meetings with this family)
   - "No meetings" (if no upcoming meetings scheduled)

4. **Given** I am viewing the family clients table,  
   **When** I look at the "Payment" column,  
   **Then** I see aggregated payment status displayed as badge:
   - "Paid" (all invoices paid, green badge)
   - "Pending" (has unpaid invoices, yellow badge with alert icon)
   - "No Invoices" (no invoices issued yet, gray badge)

5. **Given** I am viewing the family clients table,  
   **When** I want to filter or sort the data,  
   **Then** I can:
   - Filter by Status (Active / Inactive)
   - Sort by: Recent Contact (default) / Family Name / Next Meeting Date

6. **Given** I am viewing the family clients table,  
   **When** I click "View" button in Actions column,  
   **Then** Family Workspace modal opens (covered in separate story).

7. **Given** I am advisor with no associated families yet,  
   **When** I navigate to "Families" section,  
   **Then** I see empty state with message "No family clients yet" and guidance on how to get started.

**Additional Criteria:**
- [ ] Table is responsive and works on desktop, tablet, and mobile
- [ ] Table shows loading state while fetching data
- [ ] Table handles error states gracefully (network errors, API failures)
- [ ] Pagination implemented if families count > 20
- [ ] Real-time updates when new family association created

---

## 🎨 Design & UX

**User Flow:**
1. Advisor logs into Advisor Portal
2. Navigates to "Families" section
3. System loads and displays family clients table
4. Advisor scans table to assess portfolio status:
   - Identifies families with "Pending" payment status (alert icon draws attention)
   - Checks upcoming meetings count to prepare for consultations
   - Reviews role distribution across families
5. Advisor filters by Active status to focus on current clients
6. Advisor sorts by "Next Meeting" to prioritize preparation
7. Advisor clicks "View" on specific family to open detailed workspace

**Layout Description:**

**Desktop (Primary):**
- Full-width table with 8 columns
- Fixed header that stays visible on scroll
- Row height: comfortable for scanning (48px)
- Hover state on rows for better visibility
- Actions column always visible (sticky right)

**Tablet:**
- Horizontal scroll enabled if needed
- Priority columns visible: Family Name, Role, Meetings, Payment, Actions
- Members, Status, Last Contact accessible via scroll

**Mobile:**
- Card layout instead of table (stacked information)
- Each card shows: Family Name (header), Role badge, Meetings, Payment status, View button
- Expandable details for Members, Status, Last Contact

**Visual Elements:**

**Role Badges:**
- External Consul: Purple badge with crown icon
- Consultant: Blue badge with briefcase icon
- Personal Family Advisor: Green badge with user icon

**Meetings Display:**
- "3 upcoming" - neutral gray text with calendar icon
- "No meetings" - light gray text

**Payment Status Badges:**
- Paid: Green badge with checkmark icon
- Pending: Yellow badge with alert icon (⚠️) - visually prominent
- No Invoices: Gray badge

**Status Column:**
- Active: Green dot + "Active" text
- Inactive: Gray dot + "Inactive" text

**Filters & Sorting:**
- Filter dropdown: "Status: All | Active | Inactive"
- Sort dropdown: "Sort by: Recent Contact ↓ | Family Name | Next Meeting"
- Clear visual indication of active filter/sort

---

## 🔑 Business Rules

**Data Visibility Rules:**
1. **Advisor sees only associated families**: Families where advisor has active association (advisor_id matches current user)
2. **Role determination**: Role is retrieved from `advisor_family_associations` table (`advisor_role` field)
3. **Meetings count**: Only upcoming meetings (meeting_date >= today) are counted
4. **Payment aggregation logic**:
   - "Paid" = all invoices have status 'paid'
   - "Pending" = at least one invoice has status 'pending' or 'overdue'
   - "No Invoices" = no invoices exist for this family-advisor relationship

**Authorization:**
- **Who can access:** All logged-in advisors (Consultant, External Consul, Personal Family Advisor)
- **Who can view:** Only families where current advisor has active association

**Edge Cases:**
- **No associated families**: Show empty state with onboarding message
- **Family deactivated**: Show in table with "Inactive" status, grayed out
- **Advisor association revoked**: Family immediately disappears from table
- **Meeting just completed**: Moves from "1 upcoming" to "No meetings" after meeting_date passes
- **Payment status changes**: Real-time update when invoice paid

**Validation Rules:**
- Family must have valid family_id in associations table
- Role must be one of: ['external_consul', 'consultant', 'personal_family_advisor']
- Meetings count must be non-negative integer
- Payment status must be one of predefined values

---

## 🧪 Test Scenarios

**Happy Path:**
1. Advisor with 5 family associations logs in
2. Navigates to "Families" section
3. Table loads and displays all 5 families with correct data:
   - Family A: External Consul | 10 members | 2 upcoming | Paid | Active
   - Family B: Consultant | 8 members | No meetings | Pending | Active
   - Family C: Personal Family Advisor | 5 members | 1 upcoming | No Invoices | Active
   - Family D: External Consul | 15 members | 3 upcoming | Paid | Inactive
   - Family E: Consultant | 6 members | No meetings | Paid | Active
4. Advisor filters by "Active" status → sees 4 families (Family D hidden)
5. Advisor sorts by "Next Meeting" → Family B moves to bottom (no meetings)
6. Advisor clicks "View" on Family B → Family Workspace modal opens

**Negative Tests:**
1. **Unauthorized access**: Non-advisor user tries to access /families → redirected to login
2. **Invalid advisor_id**: API returns 401 Unauthorized
3. **Network error**: Table shows error state with retry button
4. **Empty response**: Shows "No family clients yet" empty state

**Edge Cases:**
1. **New advisor (no families)**: 
   - Empty state displays with message and call-to-action
   - No table shown, friendly onboarding guidance provided

2. **All families inactive**:
   - Table displays with all rows grayed out
   - Filter shows "Status: Inactive" selected
   - Message: "All your family clients are inactive"

3. **Meeting date boundary**:
   - Meeting scheduled for today at 11:59 PM → counts as "upcoming"
   - Meeting scheduled for yesterday → does not count

4. **Large family count (50+ families)**:
   - Pagination controls appear
   - Shows 20 families per page
   - Performance remains acceptable (< 1s load time)

5. **Role not set in association**:
   - Displays "Unknown Role" badge in orange
   - Logs error to monitoring
   - Advisor can still view family workspace

6. **Payment data missing**:
   - Defaults to "No Invoices" status
   - No error shown to user
   - Logs warning to monitoring

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Table initial load time: < 1 second for up to 50 families
- Sorting/filtering: < 200ms response time
- Real-time updates: < 500ms after data change

**Security:**
- Authorization: JWT token validation required
- Data isolation: Advisor sees only their associated families (advisor_id filtering)
- No PII exposure: Family member details not shown in table (only count)

**Accessibility:**
- WCAG level: AA
- Keyboard navigation: Required (Tab through rows, Enter to open workspace)
- Screen reader support: Required (all badges and icons have aria-labels)

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Edge: Latest version

---

## 📝 Notes

**Open Questions:**

**Q: Should table show deactivated families by default?**  
**A:** No. Default filter should be "Active" families only. User can manually select "Inactive" or "All" from filter dropdown. This prevents clutter and focuses on current client portfolio.

**Q: What's the sorting order priority?**  
**A:** Default sort: "Recent Contact" (descending, most recent first). Secondary sort when ties: alphabetical by Family Name. When sorted by "Next Meeting": families with meetings first (by date ascending), then "No meetings" families.

**Q: How to handle concurrent data updates (e.g., invoice paid while viewing)?**  
**A:** Implement real-time updates via WebSocket or polling (30s interval). Show toast notification: "Payment status updated for Family X" with auto-refresh of that row. Full table refresh not required.

**Q: What happens if advisor has 100+ families?**  
**A:** Implement pagination with 20 families per page. Add search/filter by family name at top of table. Consider lazy loading for performance. This edge case should be rare (most advisors serve 5-20 families).

**Q: Role badge colors - final decision?**  
**A:** Confirmed from epic discussion:
- External Consul: Purple (premium, comprehensive access)
- Consultant: Blue (professional, marketplace)
- Personal Family Advisor: Green (specialist, focused access)

**Q: Payment status - should "Overdue" be separate from "Pending"?**  
**A:** No, for simplicity "Overdue" invoices are included in "Pending" status. Both use same yellow badge with alert icon. Detail level visible in Family Workspace → Services section.

**Q: Mobile card layout - which fields are hidden by default?**  
**A:** Mobile cards show: Family Name, Role badge, Meetings, Payment, View button. Hidden fields (accessible via "Show details" expansion): Members count, Status, Last Contact date. Focus on actionable information.

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-23
