# EPIC-020: Comprehensive Audit Log Viewing & Export

## 📋 Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** Audit Log Viewing, Filtering, and Export  
**Summary:** Enable families to view comprehensive audit logs of consultant actions, filter/search activity, and export for compliance and documentation  
**Parent User Journey:** JRN-FAM-002 - Family Marketplace Service Booking (Stage 6)  
**Priority:** High  
**Epic Link:** FG-EPIC-020  
**Related Epic:** EPIC-015F (Access configuration includes basic activity summary)

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Provide Admin with comprehensive, searchable audit log interface showing all consultant actions in family portal, advanced filtering capabilities, detailed activity views, and export functionality for compliance and documentation. This Epic delivers enterprise-grade audit trail visibility.

**User-facing value:**
- Families can view complete history of consultant actions
- Families can filter/search logs by consultant, date, module, action type
- Families can drill into specific actions for detailed context
- Families can export logs for compliance and record-keeping
- Families gain full transparency and accountability

**Business value:**
- Comprehensive audit trail reduces disputes and provides accountability
- Export capability supports compliance and legal requirements
- Advanced filtering enables quick issue investigation
- Transparency builds trust and reduces security concerns

**Scope boundaries:**
- **Included:** Audit log viewer, advanced filtering, search, detail views, export (PDF/CSV)
- **NOT included:** Real-time activity monitoring dashboard (future), automated anomaly detection (future), consultant-side audit log viewing

---

## 👥 Target Users

**Primary Personas:**
- Admin (DOC-USR-003) - Reviews audit logs for oversight and compliance
- Family Council Member (DOC-USR-002) - May review logs for governance oversight

**Secondary Personas:**
- Platform Administrator (internal) - May access logs for support/investigation

---

## 📖 User Stories (High-Level)

1. **As an** Admin, **I want to** view comprehensive audit log of all consultant actions in our family portal, **so that** I can ensure accountability and transparency

2. **As an** Admin, **I want to** filter audit logs by consultant, date range, module, and action type, **so that** I can quickly find relevant activities

3. **As an** Admin, **I want to** search audit logs by keyword or item name, **so that** I can locate specific actions efficiently

4. **As an** Admin, **I want to** view detailed information for each logged action, **so that** I can understand context and impact

5. **As an** Admin, **I want to** export audit logs as PDF or CSV, **so that** I can maintain records for compliance and documentation

---

## 🔗 Dependencies

**Upstream Dependencies:**
- EPIC-015F: Access Configuration (permissions create audit events)
- EPIC-016A: Service Delivery (consultant actions generate logs)
- Audit logging system (backend)

**Downstream Impact:**
- Compliance and legal requirements
- Dispute resolution evidence
- Security incident investigation

**Technical Dependencies:**
- Audit log storage and retrieval system
- Advanced filtering and search engine
- Export generation (PDF/CSV)
- Real-time log updates

---

## 📐 Design & UX

**Figma Links:**
- [To be created] Audit Log Main Interface
- [To be created] Advanced Filter Panel
- [To be created] Log Detail View
- [To be created] Export Options

**UX Notes:**

**User Flow - Accessing Audit Log:**
1. Admin navigates to "Audit Log" from Family Portal main menu
2. OR from specific consultant's profile → "View Full Audit Log"
3. OR from service request → "View Audit Log"
4. Audit log page opens showing comprehensive activity

**User Flow - Main Audit Log Interface:**
1. Audit log viewer shows:
   - **Header:**
     - Title: "Family Activity Audit Log"
     - Quick stats: Total entries, Date range, Consultants tracked
     - "Export" button (top right)
   - **Filter Panel (Left Sidebar):**
     - **Consultant:** (dropdown, multi-select)
       - All Consultants
       - [List of all consultants]
     - **Date Range:** (date pickers)
       - Last 7 days (quick select)
       - Last 30 days (quick select)
       - Last 90 days (quick select)
       - Custom range
     - **Module:** (checkboxes)
       - All Modules
       - [List of 10 modules]
     - **Action Type:** (checkboxes)
       - All Actions
       - Viewed
       - Created
       - Updated
       - Deleted
       - Permission Changed
       - Deliverable Shared
     - **Apply Filters** button
     - **Reset Filters** button
   - **Search Bar (Top):**
     - "Search by item name, description, or keyword..."
     - Real-time search as user types
   - **Activity List (Main Area):**
     - Table format with columns:
       - Timestamp (sortable)
       - Consultant (with photo thumbnail)
       - Action (icon + text)
       - Module
       - Item/Object
       - Details (brief)
       - "View" button
     - Pagination: 50 entries per page
     - Sort options: Timestamp (newest/oldest), Consultant, Module
2. Can interact with filters, search, and click entries

**User Flow - Filtering Logs:**
1. Admin opens filter panel
2. Selects criteria:
   - Example: Consultant = "John Doe", Module = "Succession", Action = "Created" or "Updated"
3. Clicks "Apply Filters"
4. Activity list updates immediately showing filtered results
5. Filter summary shown above list: "Showing 47 results for [filters]"
6. Can further refine or reset filters

**User Flow - Searching Logs:**
1. Admin types in search bar: "succession plan"
2. Results filter in real-time to show:
   - Actions involving "succession plan" item
   - Actions in Succession module
   - Actions with "succession plan" in description
3. Search highlights matching terms in results
4. Can combine search with filters

**User Flow - Viewing Log Detail:**
1. Admin clicks "View" on specific log entry
2. Detail modal/panel opens showing:
   - **Action Header:**
     - Timestamp (precise to second)
     - Consultant name, photo, verification badges
     - Action type (large, color-coded)
   - **Context:**
     - Module and submodule (if applicable)
     - Object/Item name and ID
     - Action description (detailed)
   - **Changes (if Update action):**
     - Before/After comparison
     - Specific fields changed
     - Old values → New values
   - **Related Activity:**
     - Previous action on same item
     - Next action on same item
     - "View in context" (timeline around this action)
   - **Metadata:**
     - IP address (if relevant for security)
     - Browser/device (if captured)
     - Service request associated (link)
   - **Actions:**
     - "Share this log" (copy link)
     - "Flag for review" (if concern)
     - "Export this entry" (PDF)
3. Can navigate to previous/next log entry

**User Flow - Exporting Audit Logs:**
1. Admin clicks "Export" button
2. Export modal opens:
   - **What to Export:**
     - Current filtered results (X entries)
     - All logs (entire history)
     - Date range selection
   - **Format:**
     - PDF (formatted report)
     - CSV (spreadsheet)
   - **Options:**
     - Include detailed descriptions
     - Include consultant information
     - Include change comparisons
   - **Purpose:** (dropdown, for internal tracking)
     - Compliance documentation
     - Legal/dispute resolution
     - Internal audit
     - Security investigation
     - General record-keeping
3. Clicks "Generate Export"
4. System processes (may take time for large exports)
5. Progress indicator shown
6. When ready: "Download" button appears
7. File downloads to device

**Key UI Elements:**
- **Filter Panel:** Collapsible sidebar with clear sections
- **Activity Table:** Clean, scannable rows with color-coded action types
- **Action Icons:** Visual icons for View/Create/Update/Delete
- **Search Bar:** Prominent, with autocomplete suggestions
- **Detail Panel:** Comprehensive information with clear sections
- **Before/After Comparison:** Side-by-side or diff view for changes
- **Export Modal:** Clear options with estimated file size
- **Loading States:** Progress indicators for searches/exports
- **Empty States:** Helpful messages when no results found

---

## 📢 Notifications (if applicable)

**Does this Epic involve user notifications?** No

Audit log viewing is on-demand, no proactive notifications. Future enhancements may add alerts for unusual activity.

---

## 🧮 Business Rules

**Log Retention:**
1. All audit logs preserved indefinitely (no auto-deletion)
2. Cannot be edited or deleted by anyone (immutable)
3. Consultant actions logged in real-time
4. System actions also logged (permission changes, service status changes)
5. Logs survive service completion and access revocation

**Log Entries Captured:**
1. **Viewed:** Consultant opened/viewed item
   - Module and specific item
   - Timestamp
   - Duration (time spent on page, if available)
2. **Created:** Consultant created new item
   - Module and item type
   - Item name/title
   - Initial content summary
3. **Updated:** Consultant edited existing item
   - Module and item
   - Before/after values for changed fields
   - Change description
4. **Deleted:** Consultant deleted item (rare, usually restricted)
   - Module and item
   - Content backup before deletion
5. **Permission Changed:** Admin adjusted consultant permissions
   - Module access changed
   - Permission level changed (View ↔ Modify)
   - Who made change (Admin name)
6. **Deliverable Shared:** Consultant shared external deliverable
   - Deliverable name and link
   - Category
   - Associated service request

**Filtering & Search:**
1. Filters applied client-side for fast response
2. Search indexes item names, descriptions, consultant names
3. Filters can be combined (AND logic)
4. Search results highlighted in list
5. Maximum 10,000 results displayed (pagination)
6. Very large result sets: Export recommended over viewing

**Access Control:**
1. Only Admin can access full audit log
2. Family Council members may have read-only access (optional)
3. Regular family members cannot access audit logs
4. Consultants cannot see audit logs of their own actions
5. Consultant names displayed if Admin has proper permissions

**Performance:**
1. Last 90 days loaded by default (optimized)
2. Older logs loaded on-demand when filtered
3. Search indexes updated real-time
4. Export capped at 50,000 entries per file
5. Large exports may take several minutes

**Export Features:**
1. **PDF Format:**
   - Formatted report with family branding
   - Table of contents
   - Sections by date or consultant
   - Details for each log entry
   - Maximum 1,000 entries per PDF
2. **CSV Format:**
   - Spreadsheet-compatible
   - Columns: Timestamp, Consultant, Action, Module, Item, Details, IP
   - Maximum 50,000 entries per CSV
   - Can be imported into Excel, Google Sheets, etc.
3. **Export includes:**
   - All filtered/searched results
   - Timestamp when export generated
   - Family name and ID
   - Export purpose (from dropdown)

**Log Detail Context:**
1. Before/after comparisons only for text changes <5000 characters
2. Large content changes: Link to view full diff
3. Related activity shows ±5 entries around selected action
4. IP addresses logged but only shown if security investigation mode
5. Service request links work even after service completed

---

## 📝 Notes

**Future Enhancements (not in scope):**
- Real-time activity dashboard (live consultant activity monitor)
- Automated anomaly detection (unusual access patterns alert)
- Scheduled exports (weekly/monthly automated reports)
- Custom report templates (configure specific export formats)
- Activity analytics (charts, trends, patterns)
- Consultant-side audit log (show consultants what family can see)
- Integration with external SIEM systems (security information and event management)
- Audit log retention policies (configurable retention periods)

**Open Questions:**
- Should there be role-based access (different Admin levels)?
- Should consultants be notified when Admin views their audit log?
- Should there be warnings if Admin reviews logs too frequently (privacy)?
- Should audit logs be accessible to external auditors (with permissions)?
- Should there be pre-defined report templates for compliance?

**Assumptions:**
- Families review audit logs primarily when concerns arise (not routinely)
- Export sufficient for compliance (no need for real-time compliance dashboard)
- 90-day default view covers most use cases
- Consultant actions accurately captured by backend system
- Families understand log entries without extensive training

**Common Use Cases:**
1. **Compliance Audit:** Export all logs for specific time period for regulatory review
2. **Dispute Investigation:** Search for specific actions around disputed item
3. **Security Concern:** Review all actions by specific consultant to identify unauthorized activity
4. **Quality Assurance:** Verify consultant performed agreed scope of work
5. **Legal Documentation:** Export logs as evidence for legal proceedings
6. **Periodic Review:** Quarterly review of consultant activity patterns

**Audit Log Best Practices (for families):**
- Review logs when onboarding new consultant (spot-check activity)
- Export logs quarterly for compliance documentation
- Investigate immediately if unusual activity suspected
- Use filters to focus on high-risk modules (Assets, Succession)
- Compare consultant activity against service scope agreement
- Preserve exports for legal/compliance retention requirements

**Performance Optimization:**
- Default view loads last 90 days only (faster initial load)
- Pagination prevents overwhelming browser
- Search indexes enable sub-second queries
- Export processes server-side (doesn't block UI)
- Large exports queued and user notified when ready

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-24  
**Epic Status:** Draft  
**Story Points Estimate:** TBD (during grooming)
