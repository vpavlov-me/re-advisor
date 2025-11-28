# User Story - External Consul Family Context Access

---

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As an External Consul, I want to view family succession plans, philanthropy strategy, and asset overview, so that I can understand the complete family context when providing comprehensive governance recommendations
**Epic Link:** FG-12 [External Consul Access to Family Context]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As an** External Consul (invited strategic governance partner),
**I want to** view read-only information about family succession plans, philanthropy strategy, and asset overview within the Advisor Portal,
**so that** I can understand the complete family context and provide informed, comprehensive governance recommendations that consider all aspects of family wealth and values.

---

## 🎯 Business Context

**Why is this Story important?**

External Consuls serve as strategic governance partners who participate in Family Council meetings and provide holistic family advisory services. Unlike specialists who focus on narrow areas, External Consuls need to see the complete picture to:

- **Provide informed recommendations**: Understanding succession plans helps contextualize governance decisions
- **Identify cross-domain opportunities**: Seeing philanthropy strategy alongside assets reveals alignment opportunities
- **Avoid conflicting advice**: Access to full context prevents recommendations that conflict with existing plans
- **Facilitate strategic planning**: Comprehensive view enables better long-term family strategy

**User pain point being solved:**
Currently, External Consuls must request information from families piecemeal, leading to incomplete understanding, delayed responses, and potential gaps in advisory quality. This creates friction and reduces the value they can provide.

**Business outcome expected:**
- Higher quality governance recommendations from External Consuls
- Faster advisory response times (no need to request context)
- Increased External Consul satisfaction with platform capabilities
- Better family outcomes from informed strategic advice

**Strategic alignment:**
This story enables Phase 1 of External Consul comprehensive access, building toward full read-only access across all 10 governance modules. It focuses on the three highest-impact modules for strategic advisory work.

---

## ✅ Acceptance Criteria

1. **Given** I am logged in as External Consul with an active association to a family,
   **When** I navigate to the Advisor Portal and select the family from my dashboard,
   **Then** I see a "Family Context" section with tabs for Succession, Philanthropy, and Assets.

2. **Given** I am viewing the Family Context section,
   **When** I click on the "Succession" tab,
   **Then** I see all active succession plans for the family including:
   - Successor names and roles
   - Development program status
   - Readiness assessment summaries
   - Transition timelines
   - Plan status (draft, active, completed)

3. **Given** I am viewing the Family Context section,
   **When** I click on the "Philanthropy" tab,
   **Then** I see the family's philanthropy strategy including:
   - Giving mission and focus areas
   - Annual giving budget and allocation
   - Active grant programs
   - Impact metrics overview
   - Beneficiary organizations list

4. **Given** I am viewing the Family Context section,
   **When** I click on the "Assets" tab,
   **Then** I see the family's asset overview including:
   - Total wealth summary
   - Asset categories and breakdown
   - Portfolio allocations
   - Major asset holdings (anonymized if sensitive)
   - Asset valuation dates

5. **Given** I am viewing any of these tabs,
   **When** I attempt to edit or modify any information,
   **Then** I see read-only interface with no edit buttons or input fields enabled.

6. **Given** I am logged in as External Consul without an active family association,
   **When** I navigate to the Advisor Portal,
   **Then** I see a message indicating "No active family associations" and cannot access Family Context data.

7. **Given** I am viewing Family Context data,
   **When** the data was last updated more than 30 days ago,
   **Then** I see a timestamp indicator showing when data was last refreshed.

8. **Given** I am viewing any module tab with incomplete or partial data,
   **When** the system loads the page,
   **Then** I see available data as-is without blocking access, with clear indication of what data exists and what doesn't.

**Additional Criteria:**
- [ ] All data displayed respects family data isolation (External Consul only sees their associated family)
- [ ] Page load time for Family Context section < 3 seconds
- [ ] If no data exists in a module (e.g., no succession plans created), display "No data available" message
- [ ] All monetary values display in family's preferred currency
- [ ] Sensitive information (specific asset details, names) can be masked based on family privacy settings
- [ ] All page views are logged with timestamp and user_id for audit purposes
- [ ] System does NOT send notifications to family when External Consul views data (silent access)

---

## 📐 Design & UX

**User Flow:**
1. External Consul logs into platform (Advisor Portal)
2. From Advisor Portal dashboard, consultant selects associated family
3. System displays family overview page with navigation menu
4. Consultant clicks "Family Context" in navigation
5. System displays Family Context page with three tabs: Succession | Philanthropy | Assets
6. Consultant selects desired tab (default: Succession)
7. System loads and displays read-only data for selected module
8. Consultant reviews information to inform advisory recommendations
9. Consultant can switch between tabs without returning to dashboard
10. When finished, consultant returns to Advisor Portal dashboard or navigates to other advisor features

**Navigation Pattern:**
- Advisor Portal Dashboard → Family Overview → Family Context (Succession | Philanthropy | Assets)
- Breadcrumb: Advisor Portal > [Family Name] > Family Context > [Module]

**Information Architecture:**
- **Succession Tab**: Cards or timeline view showing succession plans chronologically
- **Philanthropy Tab**: Strategy summary at top, active grants below in grid/table
- **Assets Tab**: Visual breakdown (pie chart) with detailed table below

**Empty State Handling:**
- If module has no data: Display helpful message "No [succession plans/philanthropy strategy/assets] created yet" with brief explanation
- If module has partial data: Show what exists, leave empty sections with subtle "Not yet defined" labels
- Never block access to page due to incomplete data

---

## 🔑 Business Rules

**Validation Rules:**
1. **Access Control**: External Consul can only view Family Context if they have an active `family_advisor_association` record with `advisor_type = 'external_consul'` and `status = 'active'`
2. **Data Isolation**: All queries must filter by `family_id` from the consultant's active association
3. **Read-Only Enforcement**: No create, update, or delete operations allowed on any displayed data
4. **Privacy Compliance**: If family has enabled privacy masking for specific fields, those fields must be obfuscated (e.g., "Asset ***" instead of "Asset ABC Corp")
5. **Audit Logging**: Every page view must be logged with user_id, family_id, module viewed, and timestamp
6. **Silent Access**: System must NOT send notifications to family when External Consul views their data

**Authorization:**
- **Who can perform this action:** External Consul with active family association only
- **Who can view results:** Only the External Consul associated with the specific family

**Edge Cases:**
1. **No succession plans exist**: Display "No succession plans created yet" with informational message, allow access to page
2. **No philanthropy strategy**: Display "Philanthropy strategy not yet defined" with placeholder, show page
3. **No assets tracked**: Display "No assets registered in system" with guidance message, maintain page access
4. **Partial data in module**: Display available data fields, show "Not yet defined" for missing fields, never block entire module
5. **Multiple families**: If consultant serves multiple families, they must explicitly select which family's context to view
6. **Association revoked**: If family removes consultant's association while viewing, display error and redirect to dashboard
7. **Data staleness**: If data hasn't been updated in 90+ days, show warning banner about potentially outdated information

---

## 🧪 Test Scenarios

**Happy Path:**
1. External Consul logs in successfully
2. Selects family "Smith Family" from Advisor Portal dashboard
3. Clicks "Family Context" in navigation
4. System loads Succession tab showing 2 active succession plans with successor names, readiness scores, and timelines
5. Consultant switches to Philanthropy tab
6. System displays philanthropy strategy with $2M annual budget and 5 active grant programs
7. Consultant switches to Assets tab
8. System displays total wealth $50M with breakdown: 40% equities, 30% real estate, 20% private equity, 10% cash
9. Consultant reviews all tabs successfully and returns to dashboard
10. System logs all page views without notifying family

**Negative Tests:**
1. **Unauthorized access**: User without External Consul role attempts to access Family Context → System denies access with error message
2. **No active association**: External Consul without active family association attempts to view Family Context → System displays "No active associations" message
3. **Wrong family access**: External Consul tries to manipulate URL to view different family's data → System returns 403 Forbidden error
4. **Session timeout**: External Consul's session expires while viewing data → System redirects to login page
5. **Revoked access**: Family removes consultant's association mid-session → System detects on next data fetch and redirects with notification

**Edge Cases:**
1. **Empty succession module**: Family has no succession plans → Display "No succession plans created yet" message, allow page access, don't block
2. **Partial philanthropy data**: Only giving mission defined, no grants → Display mission, show "No active grants" for grants section
3. **Incomplete asset data**: Only total wealth entered, no breakdown → Display total, show "Asset categories not yet defined" for breakdown
4. **All modules empty**: New family with no data anywhere → All three tabs accessible, each shows appropriate "No data yet" messages
5. **Very large dataset**: Family has 50+ succession plans → Implement pagination with 10 plans per page
6. **Multiple consultants**: Two External Consuls serve same family → Each sees same read-only data without conflicts
7. **Data refresh timing**: Consultant views data, family updates it, consultant refreshes page → System displays updated information

---

## 📝 Notes

**Open Questions:**
- [x] **Q: Should External Consul see draft succession plans or only active ones?**
  - A: Show all plans (draft, active, completed) with clear status indicators. Drafts provide important context for governance discussions.

- [x] **Q: What level of asset detail should be visible? Individual holdings or summary only?**
  - A: Show high-level summary (total wealth, category breakdown) plus major holdings list (top 10-15 assets by value). Family can configure additional privacy masking if needed.

- [x] **Q: Should we show historical philanthropy data or only current strategy?**
  - A: Show current strategy (mission, budget, focus areas) plus active grants. Historical grants (completed) can be added in Phase 2.

- [x] **Q: How do we handle currency conversion if External Consul and family use different currencies?**
  - A: Always display in family's preferred currency. External Consul should understand family's financial context in their terms. Currency conversion feature deferred to Phase 3.

- [x] **Q: Should we log External Consul's access to sensitive family data for audit purposes?**
  - A: Yes, all Family Context page views should be logged with timestamp and user_id for compliance and family transparency.

- [x] **Q: Should family be notified when External Consul views their data?**
  - A: No. External Consul has trusted access by invitation. Silent access prevents notification fatigue and maintains workflow efficiency.

- [x] **Q: What happens if family has incomplete data in these modules? Show partial view or require minimum data completeness?**
  - A: Show partial view as-is with clear indicators of what data exists and what doesn't. Never block access due to incomplete data. Incomplete data is still valuable context for advisors.

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-23