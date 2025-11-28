# User Story - View Family Advisors and Access Levels

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As an External Consul, I want to view all advisors associated with the family and their current access levels to different modules  
**Epic Link:** FG-XXX [External Consul Portal - Family Governance Management]  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As an** External Consul,  
**I want to** view all advisors associated with the family and their current access levels to different modules,  
**so that** I understand who else is supporting the family, what capabilities they have, and can coordinate my work without duplicating efforts.

---

## 🎯 Business Context

**Why is this Story important?**

**User Pain Point:**
- External Consuls working with multiple families often don't know who else is supporting the family they're consulting
- Risk of duplicating work or contradicting recommendations from other advisors
- Lack of visibility into which advisor is responsible for which governance areas
- Difficulty coordinating complex engagements when multiple consultants are involved
- Uncertainty about who has access to create/edit content in different modules

**Business Outcome:**
- Improved multi-advisor coordination and collaboration
- Reduced work duplication and conflicting guidance
- Clear understanding of advisory team structure and capabilities
- Better strategic planning: Consul knows coverage gaps and can suggest additional expertise
- Transparency builds trust with family - Consul demonstrates awareness of full advisory ecosystem

**Strategic Alignment:**
- Supports multi-advisor collaboration model in family governance
- Enables efficient External Consul workflow across portfolio of families
- Facilitates professional courtesy and coordination among advisory peers
- Transparency principle: all advisors should know who else serves the family

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** External Consul is viewing a Family Dashboard,
   **When** Consul navigates to "Family" module and opens "Advisors" tab,
   **Then** system displays complete list of all advisors associated with this family.

2. **Given** Advisors list is displayed,
   **When** Consul views the list,
   **Then** system shows for each advisor:
   - Full name
   - Role badge (External Consul, Admin, Personal Family Advisor, Service Advisor)
   - Contact information (if available)
   - Association status (Active)
   - Permission matrix showing access levels to all modules

3. **Given** Permission matrix is displayed for each advisor,
   **When** Consul reviews the matrix,
   **Then** system shows:
   - All 10+ family governance modules (Constitution, Family Council, Tasks, Communication, Assets, Education, Succession, Philanthropy, Decision Making, Conflict Resolution, Activity, Notifications)
   - Access level for each module: View, View+Modify (related), View+Modify All, or No Access
   - Clear visual formatting (icons, colors) distinguishing access levels

4. **Given** List includes other External Consuls or Admins,
   **When** Consul views these advisors,
   **Then** system displays read-only badge (e.g., "Cannot Edit - Peer Level" for Consuls, "Cannot Edit - Higher Level" for Admins) to indicate permission hierarchy.

5. **Given** List includes Personal Family Advisors or Service Advisors,
   **When** Consul views these advisors,
   **Then** system shows edit capability indicator (editable by Consul) without read-only badge.

6. **Given** Multiple advisors exist with different permission patterns,
   **When** Consul compares permissions across advisors,
   **Then** system displays matrix in scannable table format allowing quick comparison.

7. **Given** No other advisors are associated with family (only current Consul),
   **When** Consul opens Advisors tab,
   **Then** system displays empty state message: "You are currently the only advisor associated with this family."

**Additional Criteria:**
- [ ] Advisors tab loads within 1 second after click
- [ ] Permission matrix handles display of 10 advisors × 12 modules without performance issues or layout breaking
- [ ] Visual hierarchy clearly distinguishes advisor roles (Consul, Admin, Personal, Service)
- [ ] Read-only badges are prominent and immediately visible for non-editable advisors
- [ ] Permission matrix uses consistent icons/colors across all advisors for same access levels
- [ ] Current Consul (self) is clearly indicated in the list (e.g., "You" badge or highlighted row)
- [ ] List is sorted logically: External Consuls first, then Admins, then Personal Family Advisors, then Service Advisors
- [ ] Zero cross-family data leakage: only advisors associated with current family are shown

---

## 🎨 Design & UX

**User Flow:**
1. External Consul navigates to Family Dashboard (after selecting family from Families List)
2. Consul opens "Family" module
3. Family module opens showing tabs: Members, Advisors, [other tabs]
4. Consul clicks "Advisors" tab
5. System loads and displays advisors list with permission matrix
6. Consul scans list to understand advisory team structure
7. Consul reviews permission matrix to see who has what access
8. Consul identifies advisors with read-only badges (cannot edit) vs. editable advisors
9. Consul uses this information for coordination and planning

**Layout Structure:**
- **Advisors Tab Content:**
  - Header: "Family Advisors" with count (e.g., "5 Advisors")
  - Table/Card list format with columns:
    - Advisor Name & Role badge
    - Contact info (email/phone if available)
    - Status badge (Active)
    - Permission Matrix (expandable or inline)
    - Edit button (if editable) or Read-only badge
  - Current Consul's row visually distinguished (e.g., highlighted or "You" badge)

**Visual Indicators:**
- **Role Badges:**
  - External Consul: Blue badge
  - Admin: Red badge
  - Personal Family Advisor: Green badge
  - Service Advisor: Purple badge
- **Read-only Badges:**
  - "Cannot Edit - Peer Level" (for other Consuls)
  - "Cannot Edit - Higher Level" (for Admins)
- **Permission Icons:**
  - 👁️ View
  - ✏️ View+Modify (related)
  - ✏️✏️ View+Modify All
  - ❌ No Access

---

## 🔐 Business Rules

**Authorization:**
- **Who can view this list:** External Consul with active association to family
- **Who can view permissions:** Same - External Consul viewing their associated family
- **Data scope:** Only advisors associated with current family (via `family_advisor_associations`)

**Validation Rules:**
1. **BR-001: Association-Based Visibility**
   - Only advisors with `is_active = true` in `family_advisor_associations` table are displayed
   - Advisors must be explicitly associated with current family
   - Deactivated advisors (is_active = false) are not shown in list

2. **BR-002: Permission Hierarchy Visibility**
   - External Consul sees read-only badge for:
     - Other External Consuls (peer level - cannot manage)
     - Admins (higher level - cannot manage)
   - External Consul sees editable indicator for:
     - Personal Family Advisors (lower level - can manage)
     - Service Advisors (lower level - can manage)
   - This is display-only rule (actual editing is separate story)

3. **BR-003: Permission Matrix Display**
   - Matrix must show all governance modules: Constitution, Family Council, Tasks, Communication, Assets, Education, Succession, Philanthropy, Decision Making, Conflict Resolution, Activity, Notifications
   - Access levels clearly labeled: View, View+Modify (related), View+Modify All, No Access
   - "Related" means content created by that advisor (`created_by_user_id`)

4. **BR-004: Self-Identification**
   - Current External Consul must be clearly identified in list (cannot be hidden)
   - Shows own permissions for transparency and verification

**Edge Cases:**
- **Only one advisor (current Consul)**: Display empty state message with explanation
- **10+ advisors**: Implement pagination or scrolling, maintain performance
- **Advisor with no permissions (all No Access)**: Still display in list with visual indication
- **Advisors with identical permissions**: Display all, no deduplication
- **Advisor profile incomplete (missing contact info)**: Display available data, show "Not provided" for missing fields

---

## 🧪 Test Scenarios

**Happy Path:**
1. **Scenario: View Advisors List with Multiple Roles**
   - External Consul "John Smith" logs into Advisor Portal
   - Selects "Thompson Family" from Families List
   - Family Dashboard opens
   - Opens "Family" module → "Advisors" tab
   - **Expected Result:** 
     - List displays 5 advisors:
       - John Smith (External Consul) - "You" badge - All modules: View+Modify All
       - Jane Doe (Admin) - Read-only badge "Cannot Edit - Higher Level" - All modules: View+Modify All
       - Mike Johnson (Personal Family Advisor) - Edit button visible - Mixed permissions
       - Sarah Lee (Service Advisor) - Edit button visible - Education: View+Modify (related)
       - Tom Wilson (External Consul) - Read-only badge "Cannot Edit - Peer Level" - All modules: View+Modify All
     - Permission matrix clearly shows access levels with icons
     - Page loads in < 1 second

2. **Scenario: Compare Permissions Across Advisors**
   - Consul views Advisors list (as above)
   - Reviews permission matrix for Mike Johnson: Constitution (View+Modify All), Education (View+Modify Related), Communication (View)
   - Reviews permission matrix for Sarah Lee: Education (View+Modify Related), all others (No Access)
   - **Expected Result:**
     - Consul understands Mike has broad access, Sarah specialized in Education only
     - Visual comparison easy via table format
     - Icons consistent across both advisors for same permission level

**Negative Tests:**
1. **Scenario: Attempt Cross-Family Data Access**
   - External Consul selects "Thompson Family"
   - System attempts to display advisors from "Johnson Family" (different family)
   - **Expected Result:**
     - Zero advisors from Johnson Family appear
     - Only Thompson Family advisors displayed
     - No cross-family data leakage

2. **Scenario: Inactive Advisor Association**
   - Advisor "Robert Brown" has `is_active = false` for Thompson Family
   - External Consul views Advisors tab
   - **Expected Result:**
     - Robert Brown does NOT appear in list
     - Only active advisors shown

**Edge Cases:**
1. **Scenario: Solo Consul (No Other Advisors)**
   - External Consul is only advisor associated with family
   - Opens Advisors tab
   - **Expected Result:**
     - Empty state displayed: "You are currently the only advisor associated with this family."
     - Current Consul still visible with "You" indicator
     - No errors or blank screen

2. **Scenario: Large Advisory Team (10+ Advisors)**
   - Family has 15 advisors associated
   - External Consul opens Advisors tab
   - **Expected Result:**
     - All 15 advisors displayed (with pagination/scroll if needed)
     - Permission matrix renders without performance issues
     - Page load time < 2 seconds
     - No UI breaking or layout issues

3. **Scenario: Advisor with No Permissions (All "No Access")**
   - Service Advisor "Emma Davis" has No Access to all modules (unusual but possible)
   - **Expected Result:**
     - Emma Davis still appears in list with role badge
     - Permission matrix shows all modules as "No Access"
     - Visual indication this is unusual state (e.g., warning icon)

4. **Scenario: Advisor Missing Contact Information**
   - Personal Family Advisor "Chris Martin" has no email/phone in profile
   - **Expected Result:**
     - Chris Martin appears in list with role badge
     - Contact fields show "Not provided" or blank gracefully
     - No errors or broken layout

---

## ⚠️ Non-Functional Requirements

**Performance:**
- Advisors tab load time: < 1 second for up to 10 advisors
- Advisors tab load time: < 2 seconds for 10-20 advisors
- Permission matrix rendering: < 500ms after tab load
- Max concurrent Consuls viewing same family: 50 (should not degrade performance)

**Security:**
- Association-based access strictly enforced: only advisors from current family visible
- Permission hierarchy respected in UI (read-only badges prevent edit attempts)
- No PII exposure beyond intentionally shared contact info
- Encrypted advisor data (PostgreSQL pgcrypto) maintained in transit and at rest

**Usability:**
- Visual hierarchy immediately clear (roles, editability)
- Permission matrix scannable and comparable across advisors
- Color-blind friendly design (icons + text labels, not color alone)
- Clear empty states when no other advisors exist

**Accessibility:**
- WCAG level: AA
- Keyboard navigation: Tab through advisor list, arrow keys within permission matrix
- Screen reader support: Required - announce role badges, permission levels, read-only status
- Focus indicators visible on all interactive elements

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Edge: Latest 2 versions

---

## 📝 Notes

**Answers from Epic (Open Questions):**

**Q: Should External Consul see their own entry in the advisors list?**
**A:** Yes - for transparency and verification. Clearly marked with "You" badge or highlighted row. Consul should verify their own permissions.

**Q: How to handle advisors with no permissions (all "No Access")?**
**A:** Display in list with visual warning indicator. Unusual state but valid (e.g., pending permission setup). Don't hide - transparency important.

**Q: What's the display format for permission matrix - inline or expandable?**
**A:** Based on epic design notes - inline table format for quick scanning. 10 advisors × 12 modules should fit without horizontal scrolling on desktop. Consider card format on mobile with expandable details.

**Q: Should list show deactivated advisors?**
**A:** No - only active advisors (is_active = true). Deactivated advisors are historical and should not appear in current advisory team view. Separate audit log for historical associations if needed.

**Q: What sorting order for advisors in list?**
**A:** Role hierarchy: External Consuls first, then Admins, then Personal Family Advisors, then Service Advisors. Within same role, alphabetical by name. Current Consul always at top regardless of role.

**Q: How to handle permission matrix for 12+ modules (future expansion)?**
**A:** Design should be scalable. Use horizontal scrolling or module grouping (Governance, Development, Family Affairs, Tools) with expandable sections. Priority: performance over fitting everything in single viewport.

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-21