---
story_id: "STORY-FG-004-008"
title: "Download Audit Log Reports"
type: "story"
epic_id: "EPIC-004"
created: "2025-10-16"
updated: "2025-10-20"
priority: "medium"
status: "ready"
estimate: "16h"
story_points: 8
sprint: "Sprint 47"
assignee: ""
labels: ["advisor", "permissions", "audit-log", "compliance", "export", "csv", "pdf"]
dependencies: ["STORY-FG-004-001"]
---

# User Story: FG-EPIC-XXX-8 - Download Audit Log Reports

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As an Admin, I want to download audit log reports from settings in CSV or PDF format, so that I can review permission history for compliance  
**Epic Link:** FG-EPIC-XXX [Advisor Portal User Roles and Access Management]  
**Story ID:** FG-EPIC-XXX-8  
**Priority:** Medium  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As an** Admin (Family Portal),  
**I want to** download audit log reports of all permission changes in CSV or PDF format from Settings,  
**so that** I can review permission change history for compliance purposes, conduct periodic audits, and maintain transparent governance records without cluttering the main interface.

---

## 🎯 Business Context

**Why is this Story important?**

**User Pain Point:**
- Admins need to verify permission changes for compliance and governance auditing
- Manual tracking of "who changed what permissions and when" is time-consuming and error-prone
- No centralized way to export permission history for formal compliance reviews or external auditors
- Need to provide evidence of proper access control management to stakeholders

**Business Value:**
- **Compliance & Governance**: Enables formal audit trail documentation required for family governance compliance
- **Transparency**: Provides clear record of all permission changes for stakeholder review
- **Risk Management**: Allows retrospective analysis of permission changes to identify potential security issues
- **Operational Efficiency**: Reduces time spent manually tracking permission changes from 2-3 hours per month to 5 minutes

**Strategic Alignment:**
- Supports Family Governance platform's core principle of transparency and accountability
- Addresses compliance requirements for family offices managing sensitive advisor access
- Enables proactive governance through historical permission analysis

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** I am logged in as Admin and navigate to Settings → Audit Logs section,  
   **When** I view the Audit Logs page,  
   **Then** I see an "Export Audit Log" button and filtering options (date range, change type, target advisor).

2. **Given** I am on the Audit Logs export page,  
   **When** I select date range filter (e.g., "Last 30 days", "Last 3 months", or custom date range),  
   **Then** the system prepares audit log data for the selected time period only.

3. **Given** I have selected filtering criteria (optional: date range, change type, target advisor),  
   **When** I click "Download CSV" button,  
   **Then** the system downloads a CSV file containing audit log entries matching my filters with columns: Timestamp, Actor (who made change), Target Advisor, Permission Changed, Old Value, New Value, Change Type (granted/revoked).

4. **Given** I have selected filtering criteria (optional: date range, change type, target advisor),  
   **When** I click "Download PDF" button,  
   **Then** the system downloads a formatted PDF report with header (family name, report generation date), filtered audit log entries in table format, and footer with total entries count.

5. **Given** I am viewing the Audit Logs section,  
   **When** no audit log entries exist for selected filters,  
   **Then** I see a message "No permission changes found for selected criteria" and download buttons are disabled.

6. **Given** I am logged in as Consul, Personal Family Advisor, or Service Advisor,  
   **When** I navigate to Settings,  
   **Then** I do NOT see "Audit Logs" section (feature is Admin-only).

**Additional Criteria:**
- [ ] CSV export includes UTF-8 encoding with BOM for Excel compatibility
- [ ] PDF export is properly formatted with readable font size (minimum 10pt) and page breaks
- [ ] File naming convention: `audit-log-{family-name}-{YYYY-MM-DD}.{csv|pdf}`
- [ ] Maximum export limit: 10,000 entries per download (if exceeded, show warning and suggest narrowing date range)
- [ ] Audit log retention: 12 months of history available for export
- [ ] Export operation completes within 10 seconds for up to 1,000 entries
- [ ] Timestamp format in CSV: ISO 8601 (YYYY-MM-DD HH:MM:SS) for international compatibility
- [ ] Timestamp format in PDF: Human-readable format (e.g., "January 15, 2025, 10:30 AM")

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Figma: [Link to Figma design for Settings → Audit Logs section]
- Screenshot: [Attach screenshot of export interface mockup]

**User Flow:**
1. Admin navigates to Settings from main navigation
2. Admin clicks "Audit Logs" tab in Settings sidebar
3. Admin sees audit log table preview with recent entries (last 50) and filtering options above:
   - Date Range picker (presets: Last 7 days, Last 30 days, Last 3 months, Custom)
   - Change Type dropdown (All, Permission Granted, Permission Revoked)
   - Target Advisor search/autocomplete field
4. Admin applies filters (optional) → table preview updates dynamically
5. Admin clicks "Download CSV" or "Download PDF" button
6. System generates file with filtered data and triggers browser download
7. Admin receives file in Downloads folder with descriptive filename
8. Admin can review exported data in Excel (CSV) or Adobe Reader (PDF)

**UI Components:**
- **Date Range Picker**: Calendar component with preset options and custom range selection
- **Filter Panel**: Collapsible panel above audit log table with filtering controls
- **Audit Log Table Preview**: Read-only table showing recent entries (paginated, 50 per page)
- **Export Buttons**: Two prominent buttons ("Download CSV", "Download PDF") with download icons
- **Empty State**: Friendly message when no data matches filters
- **Loading State**: Spinner with "Generating report..." message during export generation

---

## 🔒 Business Rules

**Access Control:**
- **Who can perform this action:** Admin role ONLY
- **Who can view audit logs:** Admin role ONLY
- **Who appears in audit logs:** All users who made permission changes (Admin, Consul roles)

**Validation Rules:**
1. **Date Range Validation**: 
   - Start date cannot be after end date
   - Date range cannot exceed 12 months (audit log retention period)
   - Custom date range cannot include future dates
   
2. **Export Size Validation**:
   - Maximum 10,000 entries per export
   - If filter criteria exceeds limit, show warning: "Too many results (X entries). Please narrow your date range or apply additional filters. Maximum: 10,000 entries."

3. **Data Filtering**:
   - Filters are applied cumulatively (AND logic): date range AND change type AND target advisor
   - Empty/no filters = export all available audit log data (up to 10,000 entry limit)

4. **File Generation**:
   - CSV: UTF-8 encoding with BOM for Excel compatibility
   - PDF: Standard A4 page size, portrait orientation, professional formatting
   - Filename must not contain special characters that break downloads

**Audit Log Content Rules:**
- **Timestamp**: Exact moment permission change was committed (not when action was initiated)
- **Actor**: Display name and role of user who made the change (e.g., "John Smith (Admin)")
- **Target Advisor**: Full name and advisor type of advisor whose permissions changed
- **Permission Changed**: Clear permission name (e.g., "Manage Service Advisors", "View Family Assets")
- **Old Value → New Value**: Show permission state change (e.g., "Not Granted → Granted", "Tier 2 → Tier 3")
- **Change Type**: Categorized as "Permission Granted" or "Permission Revoked"

**Edge Cases:**
1. **No data scenario**: If no audit log entries exist for selected filters → show empty state message, disable download buttons
2. **Single entry scenario**: Export works normally even with just 1 entry
3. **Large export (near limit)**: Show progress indicator during generation (entries 5,000+)
4. **Concurrent exports**: User can only generate one export at a time (disable buttons during generation)
5. **Browser compatibility**: Download mechanism works in Chrome, Safari, Firefox, Edge (modern versions)

**Data Retention:**
- Audit logs older than 12 months are automatically archived (not available for export)
- Archived logs can be requested through support channel if needed for legal/compliance purposes
- No manual deletion of audit logs allowed (immutable audit trail)

---

## 🧪 Test Scenarios

**Happy Path:**
1. Admin logs in → navigates to Settings → Audit Logs
2. Admin sees audit log table preview with recent permission changes
3. Admin applies date range filter "Last 30 days"
4. Admin clicks "Download CSV"
5. System generates CSV file with 30 days of audit data
6. Browser downloads file: `audit-log-smith-family-2025-01-17.csv`
7. Admin opens file in Excel → sees properly formatted audit log with all expected columns
8. Admin repeats with "Download PDF" → receives formatted PDF report

**Negative Tests:**
1. **Unauthorized access**: Consul user navigates to Settings → does NOT see "Audit Logs" section
2. **Invalid date range**: Admin selects start date after end date → system shows validation error "Start date must be before end date"
3. **Future date selection**: Admin tries to select date range including tomorrow → system prevents future date selection in date picker
4. **Exceeds retention period**: Admin tries to export data from 18 months ago → system shows error "Audit logs only available for last 12 months"
5. **Exceeds export limit**: Admin selects filters that return 15,000 entries → system shows warning and disables download buttons until filters narrowed

**Edge Cases:**
1. **Empty audit log**: New family with no permission changes yet → Admin sees empty state "No permission changes recorded yet" with disabled download buttons
2. **Single entry export**: Family with only 1 permission change → CSV and PDF export work correctly with single row/entry
3. **Special characters in names**: Target advisor name contains apostrophe or comma → CSV properly escapes values, PDF renders correctly
4. **Concurrent export attempt**: Admin clicks "Download CSV" while previous PDF generation still in progress → system shows message "Please wait for current export to complete"
5. **Exact 10,000 entries**: Filter returns exactly 10,000 entries → export succeeds with all entries included
6. **Network interruption during download**: Browser download fails → Admin can retry export without data loss

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** 
  - FG-EPIC-XXX-01 - Database audit logging infrastructure must exist (audit log table capturing permission changes)
  - FG-EPIC-XXX-02 - Permission management functionality must be implemented (to generate audit log entries)
  - FG-EPIC-XXX-07 - Admin Settings page must exist with navigation structure

**Blocks:** 
  - None (this is a reporting feature, no downstream dependencies)

**Related Stories:**
- FG-EPIC-XXX-07 - Settings interface for audit log access (Admin-only section)
- FG-EPIC-XXX-03 - Permission tier assignment (generates audit log entries)

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Export generation time: < 5 seconds for up to 500 entries, < 10 seconds for up to 1,000 entries
- Page load time for Audit Logs section: < 2 seconds
- CSV file size: ~50KB per 1,000 entries (estimated)
- PDF file size: ~200KB per 1,000 entries (estimated with formatting)

**Security:**
- Authorization required: Admin role only (enforce at backend)
- Audit log data contains sensitive permission information → no caching of export files
- File download via secure HTTPS only
- Audit log entries are immutable (read-only, cannot be edited or deleted via UI)

**Accessibility:**
- WCAG level: AA
- Keyboard navigation: Full keyboard support for date picker, filters, and download buttons (Tab, Enter, Space)
- Screen reader support: Proper ARIA labels for export buttons, filter controls, and table headers
- Focus indicators: Clear visual focus states for all interactive elements

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Edge: Latest 2 versions

**Usability:**
- Date range picker uses intuitive calendar interface (not manual date entry)
- Filter panel clearly indicates active filters with visual badges
- Export buttons have clear icons (CSV: spreadsheet icon, PDF: document icon)
- Success feedback: Brief toast notification "Audit log downloaded successfully" after file download

---

## 📝 Notes

**Open Questions:**
- [x] Confirmed: Only Admin role has access to audit log export (not Consuls)
- [x] Confirmed: No family_id filtering needed (Admin belongs to single family)
- [x] Confirmed: Retention period is 12 months
- [x] Should system send email notification when export is ready? → **Decided: No for MVP**
- [ ] Should exported files include family logo/branding in PDF header? → **For future consideration**
- [ ] What happens if user closes browser tab during export generation? → **Assume export fails, user must retry**
- [ ] Should there be a download history tracking (list of previously generated exports)? → **Not in MVP scope**
- [ ] Do we need to audit the audit log exports themselves (meta-auditing)? → **For future consideration, not MVP**

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-01-17  
**Story ID:** FG-EPIC-XXX-8