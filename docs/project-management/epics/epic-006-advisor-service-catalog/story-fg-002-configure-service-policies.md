# User Story 2: Configure Advisor-Level Service Policies

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Consultant, I want to configure service policies for notice period and capacity
**Epic Link:** EPIC-006 - Advisor Service Catalog & Package Builder
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant,
**I want to** configure advisor-level service policies including minimum notice period for bookings and maximum concurrent clients,
**so that** these operational rules apply consistently across all my services and families understand my booking requirements and availability constraints.

---

## 🎯 Business Context

**Why is this Story important?**

Service policies define HOW advisors operate (operational rules) vs. WHAT services they offer (product characteristics). Separating these ensures advisors configure once and apply everywhere, reducing configuration burden and preventing policy inconsistencies across services.

**User pain point being solved:**
- Advisors managing multiple services need consistent booking rules (don't want different notice periods per service)
- Advisors need to control capacity to prevent over-commitment
- Families need to know booking requirements before attempting to schedule

**Business outcome expected:**
- Reduce advisor configuration time (set once, applies to all services)
- Prevent double-booking and over-commitment issues
- Clear expectations reduce booking cancellations and disputes

**Strategic alignment:**
- Enables scalable advisor operations without micromanagement
- Reduces platform support burden (fewer booking conflicts to resolve)
- Creates foundation for automated capacity management in future

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** advisor is logged into Advisor Portal and navigates to "My Services" section,
   **When** advisor views services dashboard,
   **Then** system displays "Service Policies" subsection showing current policy settings (notice period and maximum concurrent clients) or prompts to configure if not set.

2. **Given** advisor has not configured service policies,
   **When** advisor attempts to activate first service,
   **Then** system blocks activation and displays message: "Configure your service policies before activating services" with button to navigate to policies configuration.

3. **Given** advisor clicks "Edit Service Policies" button or navigates from activation blocker,
   **When** policies configuration modal/page displays,
   **Then** form shows two fields: Minimum notice period (dropdown) and Maximum concurrent clients (optional number input).

4. **Given** advisor is configuring minimum notice period,
   **When** advisor opens notice period dropdown,
   **Then** system displays options: "Same day", "24 hours", "48 hours", "3 days", "1 week", "2 weeks" with current selection highlighted if already set.

5. **Given** advisor selects notice period and enters maximum concurrent clients (optional),
   **When** advisor clicks "Save Policies",
   **Then** system saves settings, displays confirmation message "Service policies updated. These apply to all your services.", and closes modal returning to services dashboard.

6. **Given** advisor has existing active services and changes service policies,
   **When** advisor saves policy changes,
   **Then** system displays warning: "Policy changes apply to future bookings only. Existing bookings retain original policy terms." with confirmation required to proceed.

7. **Given** advisor has configured service policies,
   **When** advisor creates new service,
   **Then** system automatically applies saved policies to new service and displays inherited settings in service creation flow (e.g., "Minimum notice period: 48 hours (from your service policies)").

8. **Given** advisor views service policies section on dashboard,
   **When** policies are configured,
   **Then** system displays current settings prominently: "Notice Period: 48 hours | Max Clients: 5" with "Edit Policies" button available.

**Additional Criteria:**
- [ ] Policies configuration accessible from multiple locations: services dashboard, service creation flow, account settings
- [ ] Maximum concurrent clients field is optional (0 or blank = unlimited capacity)
- [ ] Maximum concurrent clients field validates input is positive integer if provided
- [ ] Policy changes logged for audit trail with timestamp and previous/new values
- [ ] System displays explanatory text for each policy explaining what it controls

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Figma: [Link to service policies modal/page - to be added]
- Screenshot: [To be attached]

**User Flow:**
1. Advisor navigates to "My Services" dashboard
2. Sees "Service Policies" card/section showing current settings or "Not configured" status
3. Clicks "Edit Service Policies" button
4. Modal appears with policies form:
   - Header: "Service Policies - Apply to all your services"
   - Field 1: "Minimum notice period" dropdown with 6 options
   - Help text: "How much advance notice do you need for bookings? This applies to all services."
   - Field 2: "Maximum concurrent clients" number input (optional)
   - Help text: "Limit total active clients across all services. Leave blank for unlimited."
5. Advisor selects "48 hours" notice period, enters "5" for max clients
6. Clicks "Save Policies"
7. If advisor has active services with bookings: Warning modal displays explaining changes apply to future bookings only, requires confirmation
8. Policies save, confirmation message displays, modal closes
9. Dashboard updates showing new policy settings: "Notice Period: 48 hours | Max Clients: 5 active"

---

## 🔐 Business Rules

**Validation Rules:**
1. **Minimum notice period**: Required field before first service activation, selection from 6 predefined options only
2. **Maximum concurrent clients**: Optional field, if provided must be positive integer (1 or greater)
3. **Policy application**: Changes apply immediately to all future bookings across all services
4. **Existing bookings protection**: Policy changes do NOT affect existing scheduled bookings (they retain original policy terms)
5. **Capacity enforcement**: System counts all active client relationships across all services when checking capacity limit
6. **Notice period validation**: When family attempts booking, system checks advisor's current notice period setting and blocks if insufficient notice

**Authorization:**
- **Who can perform this action:** Any logged-in advisor (no profile approval required for policy configuration)
- **Who can view results:** Advisor who owns policies, Platform Administrators for support

**Edge Cases:**
- **Advisor sets very short notice period (same day)**: System allows but displays warning: "Same-day bookings may be challenging to manage. Consider longer notice period."
- **Advisor sets max clients then exceeds capacity**: System blocks new bookings and displays to advisor: "You have reached maximum concurrent clients (5/5). Deactivate services or complete existing engagements to accept new clients."
- **Advisor changes notice period from 1 week to 24 hours**: System allows immediately for new bookings, existing bookings keep 1-week notice requirement
- **Advisor leaves max clients blank after having a number**: System treats as unlimited capacity
- **Advisor has 5 active clients, reduces max clients to 3**: System displays warning: "You currently have 5 active clients. Reducing to 3 will block new bookings until you complete 2 engagements. Proceed?"

---

## 🧪 Test Scenarios

**Happy Path:**
1. New advisor navigates to "My Services" dashboard
2. Sees "Service Policies: Not configured" with red indicator
3. Clicks "Configure Service Policies" button
4. Policies form displays with empty fields
5. Selects "48 hours" from notice period dropdown
6. Enters "5" in max concurrent clients field
7. Clicks "Save Policies"
8. System saves, displays "Service policies updated. These apply to all your services."
9. Dashboard updates showing "Notice Period: 48 hours | Max Clients: 5"
10. Expected result: Policies saved, advisor can now activate services

**Negative Tests:**
1. **Invalid max clients input**: Advisor enters "-2" → System displays error: "Maximum clients must be positive number"
2. **Decimal in max clients**: Advisor enters "3.5" → System displays error: "Maximum clients must be whole number"
3. **Attempt to activate service without policies**: Advisor clicks "Activate" on service → System blocks with message: "Configure your service policies before activating services" with button to configure
4. **Cancel during edit**: Advisor opens policies, changes notice period, clicks Cancel → System discards changes, displays previous settings

**Edge Cases:**
1. **Advisor at capacity tries to change max clients downward**: 
   - Advisor has 5 active clients, max clients = 5
   - Changes max clients to 3
   - System displays warning: "You currently have 5 active clients. Reducing to 3 will block new bookings until you complete 2 engagements."
   - Advisor confirms
   - System saves, new bookings blocked until capacity drops below 3
   
2. **Advisor changes notice period with existing bookings**:
   - Advisor has 3 services with 10 future bookings (notice period was "1 week")
   - Changes notice period to "24 hours"
   - System displays: "Policy changes apply to future bookings only. Your 10 existing bookings retain 1 week notice requirement."
   - Advisor confirms
   - New bookings require only 24 hours notice

3. **Same day notice period selection**:
   - Advisor selects "Same day"
   - System displays advisory notice: "Same-day bookings may be challenging to manage and could lead to conflicts. Are you sure?"
   - Advisor confirms
   - Policy saves

**Test Cases Location:** `Knowledge-Base/product-management/test-cases/EPIC-ADV-SERV-001-test-cases.md`

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** 
  - FG-STORY-ADV-SERV-001 (Create Service Offering) - needs service creation flow to integrate policies display
- **Blocks:** 
  - FG-STORY-ADV-SERV-006 (Activate/Deactivate Services) - activation requires policies configured
  - Future booking system epic - needs policies for booking validation

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Policies form load time: < 500ms
- Save operation: < 1 second
- Capacity calculation (active clients count): < 200ms

**Security:**
- Authorization required: Yes (valid advisor JWT token)
- Data encryption: Standard HTTPS
- Policy changes logged for audit trail

**Accessibility:**
- WCAG level: AA compliance
- Keyboard navigation: Required
- Screen reader support: Required - policies explained clearly
- Focus indicators: Clear visual indicators

**Browser Support:**
- Same as Story 1 (Chrome, Safari, Firefox, Edge latest 2 versions)

---

## 📝 Notes

**Questions:**
- [ ] Should we display capacity utilization percentage (e.g., "3 of 5 clients - 60% utilized")? **Recommendation:** Yes, helpful visibility
- [ ] Do we need different notice periods for different service types? **Decision:** No for Phase 1, advisor-level only (could be future feature)
- [ ] Should we allow advisor to temporarily override notice period (e.g., for emergency bookings)? **Recommendation:** No for Phase 1
- [ ] How do we count "active clients" - by active bookings or ongoing relationships? **Decision:** Count unique families with future scheduled bookings across all services

---

**Template Version:** 1.0.0
**Story Created:** 2025-10-17