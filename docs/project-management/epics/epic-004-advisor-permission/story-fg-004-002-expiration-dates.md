---
story_id: "STORY-FG-004-002"
title: "Set Expiration Dates for Advisor Permissions"
type: "story"
epic_id: "EPIC-004"
created: "2025-10-16"
updated: "2025-10-20"
priority: "high"
status: "ready"
estimate: "12h"
story_points: 5
sprint: "Sprint 45"
assignee: ""
labels: ["advisor", "permissions", "expiration", "time-bound", "automation"]
dependencies: ["STORY-FG-004-001"]
---

# User Story: Set Expiration Dates for Advisor Permissions

---

## 📋 Basic Information

**Issue Type:** Story
**Project:** RLN1
**Story ID:** SAAS-EPIC-XXX-2
**Summary:** As a Consul, I want to set optional expiration dates on advisor permissions, so that I can grant time-bound access for temporary engagements
**Epic Link:** SAAS-EPIC-XXX [Advisor Portal User Roles and Access Management]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consul (Family Portal) or External Consul,
**I want to** set optional expiration dates when assigning or editing advisor permissions,
**so that** I can grant time-bound access for temporary project-based engagements without manually revoking access later.

---

## 🎯 Business Context

**Why is this Story important?**

**User Pain Point:**
Consuls managing multiple advisor engagements often struggle with remembering to revoke access after project completion. This leads to:
- Security risks from advisors retaining unnecessary access
- Manual overhead tracking engagement end dates
- Inconsistent access management across different advisors

**Business Outcome:**
- **Automated access control**: Permissions automatically expire without manual intervention
- **Enhanced security**: Reduces risk of lingering access after engagement ends
- **Improved governance**: Clear audit trail of access duration and intent
- **Operational efficiency**: Eliminates manual follow-up for access revocation

**Strategic Alignment:**
Supports Family Governance platform's core principle of transparent, structured governance by enabling flexible yet secure advisor engagement management.

---

## ✅ Acceptance Criteria

**This Story is complete when:**

### Core Functionality

1. **Given** I am a Consul (Family Portal or External) viewing the advisor permissions management interface,
   **When** I assign new permissions to a Personal Advisor or Service Advisor,
   **Then** I see an optional "Expiration Date" field where I can set a future date or leave it blank for indefinite access.

2. **Given** I am setting an expiration date for an advisor,
   **When** I select a date in the date picker,
   **Then** the system validates that the date is:
   - Not in the past (at least tomorrow or later)
   - Not more than 3 years in the future
   - After the current date

3. **Given** I have assigned permissions with an expiration date,
   **When** I view the advisor permissions list,
   **Then** I see:
   - The expiration date clearly displayed for each advisor
   - Visual indicator showing days remaining until expiration (e.g., "Expires in 14 days")
   - Warning badge if expiration is within 7 days (e.g., "Expiring soon")

4. **Given** I am editing existing advisor permissions,
   **When** I open the edit dialog,
   **Then** I can:
   - Add an expiration date if none was set previously
   - Modify an existing expiration date
   - Remove an expiration date to make access indefinite
   - See the current expiration status and days remaining

### Role-Based Restrictions

5. **Given** I am a Consul (Family Portal or External),
   **When** I attempt to set expiration dates,
   **Then** I can ONLY set expiration dates for:
   - Personal Family Advisors (all permission tiers)
   - Service Advisors (all permission tiers)
   - NOT for other Consuls or Admins (I cannot manage their permissions at all)

6. **Given** I am an Admin,
   **When** I set expiration dates,
   **Then** I can set expiration dates for ALL advisor roles, including Consuls.

### User Experience

7. **Given** I am setting an expiration date,
   **When** the date picker is open,
   **Then** I see:
   - Today's date disabled (cannot select today)
   - Past dates disabled
   - Dates beyond 3 years in the future disabled
   - Clear indication of selected date

8. **Given** an advisor's access is approaching expiration (within 7 days),
   **When** I view the permissions dashboard,
   **Then** I see a prominent warning notification listing advisors with soon-to-expire access.

9. **Given** I want to grant indefinite access,
   **When** I leave the expiration date field blank,
   **Then** the system shows "No expiration" or "Indefinite" status for that advisor.

### Validation & Error Handling

10. **Given** I try to set an invalid expiration date,
    **When** I submit the form,
    **Then** I see clear error messages:
    - "Expiration date cannot be in the past"
    - "Expiration date cannot exceed 3 years from now"
    - "Please select a valid date"

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Figma: [Link to Advisor Permissions Management - Expiration Date UI]

**User Flow:**

### Scenario 1: Assigning New Advisor with Expiration
1. Consul navigates to Advisor Permissions Management page (Family Portal)
2. Clicks "Assign Advisor" or "Invite Advisor" button
3. Fills in advisor details (name, email, role)
4. Selects permission tier (View Only, Standard, Full Access)
5. **NEW:** Sees optional "Set Expiration Date" field with date picker
6. Either:
   - Leaves blank for indefinite access, OR
   - Clicks date picker and selects future date
7. System validates date (not past, not >3 years)
8. Submits form
9. System saves advisor with expiration date (if set)
10. Confirmation message: "Advisor added successfully. Access expires on [date]" or "Advisor added successfully. Access is indefinite."

### Scenario 2: Editing Existing Advisor Expiration
1. Consul navigates to Advisor Permissions list
2. Finds advisor in table, clicks "Edit" action
3. Edit dialog opens showing current permissions and expiration status
4. Sees "Expiration Date" field with current date (or "No expiration")
5. Modifies expiration date:
   - Changes date to new future date, OR
   - Clears date to remove expiration
6. Clicks "Save Changes"
7. System validates and updates
8. Confirmation: "Expiration date updated to [date]" or "Expiration removed - access is now indefinite"

### Scenario 3: Viewing Expiration Status
1. Consul views Advisor Permissions dashboard
2. Table shows columns:
   - Advisor Name
   - Role
   - Permission Tier
   - **Expiration Date** (sortable)
   - **Status** (Active, Expiring Soon, Expired - for future story)
3. For advisors with expiration:
   - Shows date in format: "Dec 31, 2025"
   - Shows days remaining: "45 days remaining"
   - If <7 days: Shows warning badge "Expiring in 5 days"
4. For advisors without expiration:
   - Shows "No expiration" or "—" in expiration column

**UI Components:**
- **Date Picker**: Native browser date input with min/max constraints
- **Expiration Badge**: Color-coded (Green: >30 days, Yellow: 8-30 days, Red: <7 days)
- **Optional Field Indicator**: "(Optional)" label next to "Expiration Date" field
- **Clear/Remove Button**: To remove expiration date when editing

---

## 🔒 Business Rules

### Validation Rules:

1. **Date Range Validation:**
   - Minimum date: Tomorrow (current date + 1 day)
   - Maximum date: Current date + 3 years (1095 days)
   - Cannot set date in the past
   - Cannot set date to today (must be future)

2. **Optional Field:**
   - Expiration date is NOT required
   - Empty/null expiration date = indefinite access
   - Must be explicitly set by user (no default date)

3. **Time Zone Handling:**
   - Expiration date stored in UTC midnight (00:00:00 UTC)
   - Display in family's configured time zone
   - Expiration check runs at UTC midnight daily (handled in separate story)

4. **Edit Permissions:**
   - Can modify expiration date multiple times before it expires
   - Can extend expiration date (move to later date)
   - Can shorten expiration date (move to earlier date)
   - Can remove expiration date (convert to indefinite)
   - Can add expiration date to previously indefinite access

### Authorization:

**Who can set expiration dates:**
- **Admin**: Can set expiration for ALL advisor roles (Personal, Service, Consul)
- **Consul (Family Portal)**: Can set expiration for Personal and Service Advisors only (NOT other Consuls or Admins)
- **External Consul**: Can set expiration for Personal and Service Advisors only (NOT other Consuls or Admins)
- **Personal Family Advisor**: Cannot manage any permissions (no access to this feature)
- **Service Advisor**: Cannot manage any permissions (no access to this feature)

**Who can view expiration dates:**
- All users who can view advisor permissions list (based on their role)
- Advisors can see their own expiration date in their profile

### Edge Cases:

1. **Extending Expiration:**
   - User can extend expiration date even on the day of expiration (before midnight UTC)
   - Extension must still comply with 3-year maximum from current date

2. **Removing Expiration:**
   - User can remove expiration date at any time, converting to indefinite access
   - Requires explicit action (not accidental)

3. **Multiple Permissions:**
   - If advisor has multiple permission tiers, expiration applies to ALL tiers simultaneously
   - Cannot set different expiration dates for different tiers for same advisor

4. **Expired Access (Future State):**
   - This story does NOT handle automatic deactivation (separate story)
   - This story provides UI/UX for setting expiration, not enforcement

---

## 🧪 Test Scenarios

### Happy Path:

**Test 1: Assign New Advisor with Expiration**
1. Login as Consul (Family Portal)
2. Navigate to Advisor Permissions Management
3. Click "Assign Advisor"
4. Fill in: Name="John Smith", Email="john@advisory.com", Role="Personal Family Advisor", Tier="Standard"
5. Click "Expiration Date" date picker
6. Select date 30 days in the future
7. Click "Assign"
8. **Expected:** Success message: "Advisor added. Access expires on [date]"
9. **Verify:** Advisor appears in list with expiration date and "30 days remaining" badge

**Test 2: Edit Existing Advisor to Add Expiration**
1. Login as External Consul
2. View advisor with no expiration (shows "No expiration")
3. Click "Edit" for that advisor
4. Click "Set Expiration Date" date picker
5. Select date 60 days in the future
6. Click "Save Changes"
7. **Expected:** Success message: "Expiration date set to [date]"
8. **Verify:** Advisor now shows expiration date and "60 days remaining"

**Test 3: Remove Expiration Date**
1. Login as Admin
2. View advisor with expiration date set
3. Click "Edit" for that advisor
4. Click "Clear" button next to expiration date field
5. Click "Save Changes"
6. **Expected:** Confirmation: "Expiration removed - access is now indefinite"
7. **Verify:** Advisor shows "No expiration" in list

### Negative Tests:

**Test 4: Try to Set Past Date**
1. Login as Consul
2. Attempt to assign advisor with expiration date = yesterday
3. **Expected:** Error message: "Expiration date cannot be in the past"
4. Form does not submit

**Test 5: Try to Set Date > 3 Years**
1. Login as Consul
2. Attempt to set expiration date = 4 years from now
3. **Expected:** Error message: "Expiration date cannot exceed 3 years from now"
4. Form does not submit

**Test 6: Consul Tries to Set Expiration for Another Consul**
1. Login as Consul (Family Portal)
2. Attempt to edit permissions for another Consul
3. **Expected:** No edit option available OR error: "You do not have permission to manage this advisor"

**Test 7: Personal Advisor Tries to Access Permissions Management**
1. Login as Personal Family Advisor
2. Attempt to navigate to Advisor Permissions Management
3. **Expected:** 403 Forbidden or redirected to dashboard
4. No access to permissions management interface

### Edge Cases:

**Test 8: Set Expiration on Day of Expiration**
1. Setup: Advisor with expiration date = today
2. Login as Consul
3. Edit advisor and extend expiration to 30 days from now
4. **Expected:** Successfully updates expiration date
5. **Verify:** New expiration date saved, "30 days remaining" shown

**Test 9: Expiration Warning Badge**
1. Setup: Advisor with expiration in 5 days
2. Login as Consul
3. View advisor permissions dashboard
4. **Expected:** Advisor shows "Expiring soon" badge or "Expires in 5 days" warning
5. Badge color is red or yellow (warning color)

**Test 10: Multiple Role Permissions**
1. Admin assigns Service Advisor with View Only + Standard tiers
2. Admin sets expiration date for this advisor
3. **Expected:** Expiration applies to BOTH permission tiers
4. **Verify:** UI shows single expiration date for advisor (not per-tier)

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** 
  - SAAS-XXX-1 - Basic Advisor Permissions Management UI (must exist to add expiration field)
  - SAAS-XXX-2 - Advisor Registry and Association Tables (database schema must support expiration_date column)
  
- **Blocks:** 
  - SAAS-XXX-3 - Automated Expiration Enforcement (background job to deactivate expired advisors)
  - SAAS-XXX-4 - Expiration Notification System (emails to Consuls about upcoming expirations)

**External Dependencies:**
- None

---

## ⚠️ Non-Functional Requirements (Briefly)

### Performance:
- Date picker render time: < 100ms
- Expiration date update API response: < 200ms
- Permissions list load time (with expiration data): < 500ms for 50 advisors

### Security:
- Authorization required: Yes (Consul or Admin role)
- Expiration date stored in UTC, encrypted if PII-adjacent
- Audit log entry created on expiration date changes (who set, when, old value, new value)

### Accessibility:
- WCAG level: AA
- Keyboard navigation: Required (date picker must be keyboard-accessible)
- Screen reader support: Required
  - Clear labels: "Expiration Date (Optional)"
  - Announce validation errors
  - Announce remaining days on focus

### Browser Support:
- Chrome: Latest 2 versions (native date picker)
- Safari: Latest 2 versions (native date picker)
- Firefox: Latest 2 versions
- Edge: Latest 2 versions

### Data Integrity:
- Expiration date stored with timezone metadata (UTC)
- Audit trail: All changes to expiration dates logged with timestamp, user, old/new values
- No orphaned expiration dates (if advisor removed, expiration data also removed)

---

## 📝 Notes

**Answers from Epic Discussion:**

**Q: Should we support time (hours/minutes) or just dates?**
**A:** Dates only (midnight UTC). Time granularity adds unnecessary complexity for typical engagement durations (weeks/months).

**Q: What's the maximum expiration period?**
**A:** 3 years from current date. This covers typical long-term retainer arrangements while preventing indefinite future dates.

**Q: Can we set expiration in the past (for audit purposes)?**
**A:** No. Past dates not allowed. For historical records, use audit logs showing when access was granted/revoked.

**Q: Should expiration apply per permission tier or per advisor?**
**A:** Per advisor (applies to all their permission tiers simultaneously). Simplifies management and aligns with engagement-based access model.

**Q: What happens on expiration day?**
**A:** This story handles UI only. Automated deactivation is separate story (background job runs at UTC midnight).

**Scope Decisions:**
- ✅ **Expiration history in advisor detail view:** Not included in this story (audit logs provide sufficient trail)
- ✅ **Bulk operations for multiple advisors:** Not included (future enhancement if needed)
- ✅ **Advisor self-notifications about expiration:** Not included (separate notification story if needed)

**Open Questions:**
- None - all scope questions resolved

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-16