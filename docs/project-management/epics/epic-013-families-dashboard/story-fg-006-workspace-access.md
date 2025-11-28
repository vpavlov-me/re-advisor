# User Story: Role-Based Family Workspace Access

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As an advisor, I want to access only families I'm associated with and see workspace appropriate to my role  
**Epic Link:** FG-XXX [Family Client Management Workspace]  
**Priority:** Critical  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant / External Consul / Personal Family Advisor,  
**I want to** access only families where I have established relationship and see workspace appropriate to my actual role in that family,  
**so that** family data remains secure, I focus on my client portfolio, and families control who can see their information.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point being solved:**
- Advisors currently lack clear visibility into which families they can work with
- Risk of accessing family data without proper authorization
- Confusion about advisor's role and permissions in different families
- Families need confidence that their data is only visible to authorized advisors

**Business outcome expected:**
- Strong multi-tenancy enforcement protects family privacy
- Advisors work confidently within their authorized portfolio
- Clear role visibility prevents permission confusion
- Audit trail for data access and security compliance
- Foundation for role-based feature access in workspace

**Strategic alignment:**
- Critical security requirement for platform trust
- Enables multiple advisor types to coexist safely
- Supports family control over advisor relationships
- Compliance with data protection regulations

---

## ✅ Acceptance Criteria

1. **Given** I am logged in as advisor,  
   **When** I navigate to Family Clients page,  
   **Then** I see only families where I have active association (invited as Personal FA/External Consul OR have active Consultant booking).

2. **Given** I am viewing Family Clients table,  
   **When** I look at the list of families,  
   **Then** each family row shows my actual role with that family (Personal Family Advisor | External Consul | Consultant).

3. **Given** I click "View" on a family from my portfolio,  
   **When** Family Workspace opens,  
   **Then** Overview section displays role badge reflecting my actual role in this specific family.

4. **Given** I attempt to access family workspace for family NOT in my portfolio,  
   **When** I try to open workspace (e.g., by manipulating URL or direct link),  
   **Then** system prevents access and shows clear error message "You don't have access to this family".

5. **Given** I am viewing Tasks section in Family Workspace,  
   **When** tasks are loaded,  
   **Then** I see only tasks I created for myself about this specific family (filtered by advisor_id + family_id).

6. **Given** I am viewing Services section in Family Workspace,  
   **When** services are loaded,  
   **Then** I see only services I proposed or contracted with this specific family (filtered by advisor_id + family_id).

7. **Given** I am viewing Consultations section in Family Workspace,  
   **When** consultations are loaded,  
   **Then** I see only consultations scheduled between me and this specific family (filtered by advisor_id + family_id).

8. **Given** family removes my association (cancels subscription, ends engagement),  
   **When** association becomes inactive,  
   **Then** family disappears from my Family Clients table and I can no longer access their workspace.

**Additional Criteria:**
- [ ] All database queries include WHERE clause with advisor_id AND family_id filtering
- [ ] Unauthorized access attempts are logged for security audit
- [ ] Role badge uses consistent design system (icons, colors) across platform
- [ ] Empty state messaging is clear when advisor has no family associations
- [ ] Error messages for unauthorized access are user-friendly (not technical)

---

## 🔒 Business Rules

**Association Rules:**
1. **Personal Family Advisor association**:
   - Created when family invites advisor via email
   - Association is active until family removes advisor
   - Role: "Personal Family Advisor"

2. **External Consul association**:
   - Created when family invites advisor as strategic partner
   - Association is active until family removes advisor
   - Role: "External Consul"

3. **Consultant association**:
   - Created when family accepts booking from marketplace
   - Association is active for duration of booking/engagement
   - Role: "Consultant"

**Authorization:**
- **Who can view Family Clients table:** Any logged-in advisor
- **What they see:** Only families where active association exists
- **Who can open Family Workspace:** Advisor with active association for that specific family
- **Who can view workspace data (tasks, services, consultations):** Only the advisor who created/owns that data for that family

**Data Filtering:**
- All queries MUST filter by: `advisor_id = current_advisor.id AND family_id = selected_family.id`
- No cross-family data leakage: Advisor A cannot see Advisor B's tasks/services even if both work with same family
- No cross-advisor data leakage: Advisor cannot see data for families without association

**Edge Cases:**
- **Multiple roles with same family**: Not possible currently - one advisor = one role per family
- **Association removed during session**: Advisor loses access immediately, sees error if tries to access
- **Advisor never invited by any family**: Shows empty state with guidance "No families in your portfolio yet"
- **Family deleted/deactivated**: Removed from advisor's portfolio, workspace inaccessible

---

## 🧪 Test Scenarios

**Happy Path:**
1. **Consultant with multiple families**:
   - Login as Consultant who has bookings with 3 families
   - Navigate to Family Clients page
   - Verify: See exactly 3 families in table
   - Verify: Each shows role "Consultant"
   - Click "View" on Family #1
   - Verify: Workspace opens successfully
   - Verify: Overview shows "Consultant" badge
   - Navigate to Tasks section
   - Verify: Only tasks created by this advisor for Family #1 are visible

2. **External Consul with single family**:
   - Login as External Consul invited by Family Johnson
   - Navigate to Family Clients page
   - Verify: See only Family Johnson
   - Verify: Role shown as "External Consul"
   - Click "View"
   - Verify: Overview displays "External Consul" badge
   - Navigate through all sections (Tasks, Services, Consultations)
   - Verify: All data filtered correctly by advisor + family

**Negative Tests:**
1. **Unauthorized access attempt**:
   - Login as Advisor A (associated with Family Smith only)
   - Attempt to open workspace for Family Johnson (associated with Advisor B)
   - Expected: Access denied with error "You don't have access to this family"
   - Verify: No data leaked, proper error logged

2. **URL manipulation**:
   - Login as Advisor
   - Copy workspace URL for Family A (authorized)
   - Change family_id in URL to Family B (not authorized)
   - Attempt to access modified URL
   - Expected: Redirect to Family Clients with error message

3. **Association removed during session**:
   - Login as Advisor, open workspace for Family X
   - In separate admin session: Remove advisor association
   - In advisor session: Try to refresh workspace or navigate sections
   - Expected: Error message, redirected to Family Clients table
   - Verify: Family X no longer appears in table

**Edge Cases:**
1. **New advisor with no families**:
   - Create new advisor account, complete registration
   - Login and navigate to Family Clients
   - Expected: Empty state with message "No families in your portfolio yet"
   - Verify: No system errors, clear guidance shown

2. **Data isolation verification**:
   - Setup: Family Alpha has Advisor 1 (5 tasks) and Advisor 2 (3 tasks)
   - Login as Advisor 1
   - Open workspace for Family Alpha → Tasks section
   - Verify: See only own 5 tasks, NOT Advisor 2's 3 tasks
   - Repeat for Services and Consultations

---

## 📝 Notes

**Decisions Made:**
- ✅ **No advisor notification when association removed** - Family ends relationship without notification to advisor (cleaner, less communication overhead)
- ✅ **No grace period after association removal** - Immediate access revocation (security priority over UX convenience)
- ✅ **All unauthorized access attempts logged** - Security audit trail with timestamp, advisor_id, attempted_family_id
- ✅ **Error messages non-revealing** - Don't disclose if family exists when access denied (security best practice)

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-23
