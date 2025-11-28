# User Story: FG-XXX - External Consul Portfolio: Families List with Search & Filters

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As an External Consul, I want to view all my family clients in a centralized list with search, filters, and key status information  
**Epic Link:** FG-EPIC-XXX [External Consul - Multi-Family Client Management & Governance Dashboard]  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As an** External Consul,  
**I want to** view all my family clients in a centralized list with search, filters, and key status information (role, members count, last contact, meetings status, payment status),  
**so that** I can quickly assess my portfolio and prioritize my engagement efforts across all families without switching between individual family dashboards.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point being solved:**
External Consuls manage multiple family clients simultaneously and need efficient portfolio management. Without a centralized families list, they must:
- Manually track family information in external tools (Excel, notes)
- Waste time switching between family dashboards to recall basic details
- Miss important engagement opportunities (upcoming meetings, pending payments)
- Struggle to prioritize which families need immediate attention

**Business outcome expected:**
- Consuls can efficiently manage their entire family portfolio from a single view
- Quick decision-making on which families require immediate follow-up
- Reduced context-switching overhead between families
- Improved client service through better engagement tracking
- Professional portfolio management without external tools

**Strategic alignment:**
- Supports advisor scalability - enables consuls to serve more families effectively
- Enhances advisor experience through efficient portfolio management tools
- Aligns with association-based access model for multi-family advisors
- Foundation for future advisor analytics and engagement metrics

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** I am logged in as an External Consul,  
   **When** I navigate to the Families page in Advisor Portal,  
   **Then** I see a list of all families associated with my advisor account.

2. **Given** I am viewing the Families list,  
   **When** I look at each family card,  
   **Then** I see the following information:
   - Family name
   - My role badge (e.g., "External Consul")
   - Number of family members (e.g., "12 members")
   - Last contact date (e.g., "Last contact: Oct 15, 2025")
   - Family status (Active/Inactive)
   - Meeting status (Meeting scheduled/No upcoming meeting)
   - Payment status (Payment pending/All paid/No outstanding payments)

3. **Given** I am viewing the Families list,  
   **When** I type text in the search bar,  
   **Then** the list filters in real-time to show only families matching the search query (by family name).

4. **Given** I am viewing the Families list,  
   **When** I apply filters (role, family status, member count range, meeting status, payment status),  
   **Then** the list updates to show only families matching all selected filter criteria.

5. **Given** I am viewing the Families list,  
   **When** I click "View Dashboard" on a family card,  
   **Then** I navigate to that family's governance dashboard with full module access.

6. **Given** there are no families associated with my advisor account,  
   **When** I view the Families page,  
   **Then** I see an empty state message: "No families associated with your account."

**Additional Criteria:**
- [ ] Search works for partial family name matches (case-insensitive)
- [ ] Filters can be combined (e.g., "Active families + Payment pending + Meeting scheduled")
- [ ] Clear visual hierarchy: family name most prominent, status information secondary
- [ ] Last contact date shows relative time if recent (e.g., "2 days ago") or absolute date if older
- [ ] Family cards are sorted by last contact date (most recent first) by default
- [ ] Filter selection persists during session (until page refresh or logout)
- [ ] Loading states shown while fetching families data
- [ ] Responsive layout: cards adapt to screen width (desktop primary, tablet support)

---

## 🎨 Design & UX

**User Flow:**
1. User logs in as External Consul → redirected to Dashboard (out of scope)
2. User clicks "Families" in main navigation sidebar
3. System loads all families associated with advisor account
4. User sees families list with search bar and filters at top
5. User can:
   - Browse list scrolling through family cards
   - Type in search to filter by name
   - Apply filters (role, status, members, meetings, payments)
   - Click "View Dashboard" to open family's governance dashboard
6. Selected filters update URL parameters for bookmarking
7. User navigates to family dashboard → maintains filter state in background

**Key UI Elements:**
- **Search bar**: Top of page, placeholder "Search families by name..."
- **Filter panel**: Dropdowns/chips for Role, Family Status, Member Count, Meeting Status, Payment Status
- **Family cards**: Grid layout, each card shows:
  - Family name (large, bold)
  - Role badge (colored chip)
  - Members count (icon + number)
  - Last contact (icon + date/relative time)
  - Status indicators (Active/Inactive badge)
  - Meeting status (icon + "Scheduled" or "Not scheduled")
  - Payment status (icon + "Pending" or "All paid" or "No outstanding")
  - "View Dashboard" button (primary action)
- **Empty state**: Centered message with icon when no families

---

## 🔑 Business Rules

**Validation Rules:**
1. **Family visibility**: Only families with active `family_advisor_associations` record for current advisor are shown
2. **Role display**: Show the advisor's role from `family_advisor_associations.role` field
3. **Last contact calculation**: Use most recent of: meeting date, message sent, resource created, any activity timestamp in family context
4. **Meeting status**: "Scheduled" if any meeting exists with `scheduled_at` >= current date; otherwise "Not scheduled"
5. **Payment status**: 
   - "Payment pending" if any unpaid invoices exist
   - "All paid" if all invoices paid and at least one invoice exists
   - "No outstanding" if no invoices exist
6. **Member count**: Count all users with `family_id` matching the family (excluding advisors)

**Authorization:**
- **Who can access this page**: Only users with `advisor` account type (specifically External Consul role)
- **Who can view families**: Only families explicitly associated via `family_advisor_associations` table
- **Data isolation**: Strict association-based filtering - advisors see ONLY their assigned families

**Edge Cases:**
- **No families associated**: Show empty state with "No families associated with your account"
- **Family deactivated**: Show "Inactive" badge, still visible in list (with filter option to hide)
- **Last contact never recorded**: Show "No contact yet" instead of date
- **No meetings scheduled**: Show "No upcoming meetings" status
- **Search returns no results**: Show "No families match your search" with clear filters button
- **Filters exclude all families**: Show empty results with active filters displayed and option to clear

**See also:** 
- `external-advisor-persona.md` - External Consul role definition
- `SYSTEM_COMPONENTS_CATALOG.md` - Advisor Portal Service (8011) architecture
- Epic: FG-EPIC-XXX for full multi-family dashboard context

---

## 🧪 Test Scenarios

**Happy Path:**
1. External Consul logs in → navigates to Families page → sees list of 3 associated families with all status information visible → clicks "View Dashboard" on Family A → opens Family A dashboard

**Search Functionality:**
1. User types "Smith" in search → list filters to show only "Smith Family" → clears search → all families visible again
2. User types partial match "Joh" → shows "Johnson Family" and "John & Mary Family" → types "Johns" → shows only "Johnson Family"

**Filter Scenarios:**
1. User selects "Payment pending" filter → list shows only families with outstanding payments → clicks "All paid" filter → list shows only families with all invoices paid
2. User combines filters: "Active" + "Meeting scheduled" → list shows only active families with upcoming meetings → adds "10-20 members" → further narrows results

**Negative Tests:**
1. User with no family associations → sees empty state message "No families associated with your account"
2. User searches for non-existent family "ZZZZZ" → shows "No families match your search"
3. User applies filters that exclude all families → shows empty results with clear filters option

**Edge Cases:**
1. Family with no last contact recorded → card shows "No contact yet"
2. Family with 0 members (only advisors) → shows "0 members"
3. Inactive family → shows "Inactive" badge, still appears in list
4. Family with no meetings scheduled → shows "No upcoming meetings"

**Test Cases Location:** `Knowledge-Base/product-management/test-cases/FG-EPIC-XXX-test-cases.md`

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Page load time: < 2 seconds for up to 50 families
- Search filtering: real-time (< 100ms response)
- Filter application: < 200ms to update list

**Security:**
- Authorization required: Yes (advisor account only)
- Association-based filtering: CRITICAL - must use `family_advisor_associations` joins
- No cross-advisor data leakage: advisors see ONLY their assigned families

**Accessibility:**
- WCAG level: AA
- Keyboard navigation: Required (Tab through cards, Enter to open dashboard)
- Screen reader support: Required (all status information must be announced)

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions (nice-to-have)

---

## 📝 Notes

**Resolved Questions:**
- [x] **Q**: What information should "last contact" include? 
  - **A**: Most recent of: meeting date, message sent, resource created, any activity timestamp
  
- [x] **Q**: How should payment status be calculated?
  - **A**: Three states - "Payment pending" (unpaid invoices exist), "All paid" (all invoices paid), "No outstanding" (no invoices)
  
- [x] **Q**: Should inactive families be hidden by default?
  - **A**: No, show all families by default with filter option to hide inactive
  
- [x] **Q**: What is the default sort order?
  - **A**: Last contact date descending (most recent first) - helps prioritize engagement
  
- [x] **Q**: Should search be case-sensitive?
  - **A**: No, case-insensitive search for better UX

- [x] **Q**: Should we show advisor's permission level per module on the family card, or just the overall role?
  - **A**: Show only role (from `family_advisor_associations.role` field)

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-21  
**Story Status:** Ready for grooming