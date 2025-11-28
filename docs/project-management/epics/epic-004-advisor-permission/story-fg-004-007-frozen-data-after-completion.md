---
story_id: "STORY-FG-004-007"
title: "Service Advisor Frozen Data Access After Engagement Completion"
type: "story"
epic_id: "EPIC-004"
created: "2025-10-16"
updated: "2025-10-20"
priority: "critical"
status: "ready"
estimate: "24h"
story_points: 13
sprint: "Sprint 46"
assignee: ""
labels: ["advisor", "permissions", "service-advisor", "frozen-snapshot", "lifecycle", "view-only"]
dependencies: ["STORY-FG-004-005", "STORY-FG-004-010"]
---

# User Story - SAAS-EPIC-XXX-7: Service Advisor Frozen Data Access After Engagement Completion

> **Note:** User Story for Service Advisor view-only access to frozen data snapshots after engagement completion

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** SAAS  
**Summary:** As a Service Advisor, I want to retain view-only access to my work materials after service completion with frozen data snapshots, so that I can reference past engagements without seeing new family data  
**Epic Link:** SAAS-EPIC-XXX [Advisor Portal User Roles and Access Control]  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Service Advisor (External Advisor with Service Tier access),  
**I want to** retain view-only access to frozen snapshots of my work materials after engagement completion,  
**so that** I can reference past projects for professional purposes without accessing current family data.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point being solved:**
- Service Advisors need to reference their past work (project deliverables, consultation notes, workshop materials) for portfolio development, case studies, and similar future engagements
- Currently, when Service Tier access expires, advisors lose ALL access to their work materials, creating professional continuity issues
- Advisors cannot demonstrate their work quality to prospective clients or reflect on past engagements

**Business outcome expected:**
- Service Advisors maintain professional reference library of completed work
- Families maintain data privacy — advisors cannot see new/updated family information after engagement ends
- Platform provides clear audit trail of advisor access history and data retention
- Reduced support requests from advisors asking for "one more look" at completed projects

**Strategic alignment:**
- Supports professional development and quality assurance for advisor network
- Balances advisor needs with family data privacy requirements
- Creates trust through transparent, predictable access management

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** a Service Advisor's engagement has been marked as "completed" and access deactivated,  
   **When** the Service Advisor logs into Advisor Portal and navigates to their family list,  
   **Then** the completed family appears with "View Archive" status (not "Active Access").

2. **Given** a Service Advisor clicks on a completed engagement with "View Archive" status,  
   **When** they enter the archived family view,  
   **Then** they see a frozen snapshot of data as it existed at engagement completion date, with clear visual indicator (e.g., "Archived as of [date]" banner).

3. **Given** a Service Advisor is viewing archived family data,  
   **When** they attempt to interact with any editable elements (forms, buttons, inputs),  
   **Then** all interactive elements are disabled/hidden, and only read-only views are available.

4. **Given** a Service Advisor views archived engagement data,  
   **When** the family has added new meetings, decisions, or tasks after engagement completion,  
   **Then** the Service Advisor does NOT see any of these new items — only data that existed at completion timestamp.

5. **Given** a Service Advisor navigates archived project materials,  
   **When** they view consultation notes, workshop attendance, or project deliverables,  
   **Then** all materials they created or accessed during active engagement are visible in read-only format.

6. **Given** a Service Advisor has view-only archived access,  
   **When** they attempt to download documents or export data,  
   **Then** system allows download/export ONLY of materials the advisor originally created or was explicitly shared with (not full family data).

7. **Given** a completed engagement has passed the retention period (e.g., 2 years),  
   **When** retention deadline is reached,  
   **Then** system automatically archives the frozen snapshot to cold storage and Service Advisor sees "Archived - Contact Support" message instead of data access.

**Additional Criteria:**
- [ ] Visual distinction between "Active Access" families and "View Archive" families in Advisor Portal dashboard
- [ ] Timestamp of engagement completion prominently displayed in archived view
- [ ] System tracks and logs all view-only access to archived data for audit purposes
- [ ] Performance: Archived data loads within 3 seconds (acceptable since not real-time critical)
- [ ] Clear "Read-Only Archive" watermark or banner on all archived pages

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Figma: [Link to Advisor Portal - Archived Family View designs]
- Screenshot: [Attach mockup showing read-only state indicators]

**User Flow:**

1. **Service Advisor logs into Advisor Portal**
   - Dashboard shows family list with status indicators:
     - "Active Access" (green) — current engagements
     - "View Archive" (gray/blue) — completed engagements with frozen data
     - "Archived - Contact Support" (gray) — retention period expired

2. **Service Advisor clicks on "View Archive" family**
   - System loads frozen snapshot interface
   - Banner at top: "Read-Only Archive — Data frozen as of [completion date] — [days since completion]"
   - Navigation shows only sections advisor had access to during engagement (e.g., if no philanthropy access during engagement, no philanthropy in archive)

3. **Service Advisor navigates archived sections**
   - All pages display in read-only mode:
     - Forms disabled, buttons hidden/grayed out
     - "Edit" buttons replaced with "View Details"
     - No "Create New" or "Delete" actions available
   - Advisor can view:
     - Project materials they created
     - Meeting agendas/minutes from meetings they attended
     - Workshop materials they facilitated
     - Consultation notes they authored
     - Family constitution as it existed at completion

4. **Service Advisor attempts to download materials**
   - System allows download ONLY of:
     - Documents advisor uploaded during engagement
     - Reports advisor generated
     - Consultation notes advisor authored
   - System blocks download of:
     - Full family reports
     - Family member contact information
     - Financial data (unless explicitly part of deliverable)

5. **Service Advisor sees retention expiration warning**
   - If within 60 days of retention deadline: "This archive will expire on [date]. Contact support to request extension if needed."
   - After expiration: "This archive has been moved to cold storage. Contact support with engagement ID [XXX] to request access."

**UI Elements:**
- **Archive Banner:** Persistent top banner with archive status and date
- **Read-Only Indicators:** Grayed-out buttons, disabled inputs, lock icons
- **Timestamp Labels:** "As of [date]" on all data sections
- **Limited Navigation:** Only sections from active engagement period visible

---

## 🔒 Business Rules

**Validation Rules:**

1. **Frozen Snapshot Creation:**
   - Snapshot must be created at EXACT timestamp when Service Tier access is deactivated
   - Snapshot includes ONLY data advisor had permissions to view during active engagement
   - Snapshot excludes any data created/modified after deactivation timestamp

2. **Access Scope in Archive:**
   - Service Advisor can view ONLY sections they accessed during active engagement (based on permission history)
   - If advisor had Workshop Service access but not Philanthropy access during engagement, archived view shows workshops but not philanthropy

3. **Download Restrictions:**
   - Downloadable content limited to advisor-created materials and explicitly shared documents
   - No bulk export of family data
   - Downloaded files watermarked with "Service Advisor Archive - [Date] - [Advisor Name]"

4. **Retention Period:**
   - Default retention: 2 years from engagement completion
   - Admin can extend retention on case-by-case basis
   - After retention expiration: Data moved to cold storage, advisor loses direct access (must request via support)

**Authorization:**

- **Who can perform this action:**
  - Service Advisor can view their own archived engagements (frozen snapshots)
  - Admin can view all engagement materials in their normal system sections (NOT archived — materials remain in original locations like Conflicts, Education)
  - Consul/Family Council Member can revoke Service Advisor's archived access before retention period expires (escalation scenarios)

- **Who can view results:**
  - Service Advisor (their own frozen archives)
  - Admin/Consul (materials remain in original system sections: Conflicts with "Completed" status, Education materials as saved content — all read-only)
  - Family Council Member CANNOT see what Service Advisor views in frozen archive (privacy)

**Important Distinction:**
- **Service Advisor:** Gets frozen snapshot archive when deactivated (separate view)
- **Admin/Consul:** Materials stay in original system sections (Conflict Resolution, Education Service, etc.) with read-only status — NO archive needed

**Edge Cases:**

1. **Reactivation Scenario:**
   - **Edge case:** Service Advisor deactivated, then rehired by same family 6 months later
   - **Expected behavior:** Archived view remains frozen at original completion date. New engagement creates NEW association with current data access. Advisor sees TWO entries: "View Archive (2024-05-15)" and "Active Access (current)"

2. **Data Deletion by Family:**
   - **Edge case:** Family deletes meeting minutes after Service Advisor deactivated, but those minutes existed in frozen snapshot
   - **Expected behavior:** Frozen snapshot retains deleted data (immutable). Family Council Member can request Admin to purge specific items from advisor's archive if legally required.

3. **Partial Permission Changes:**
   - **Edge case:** Service Advisor had access to Constitution + Workshops during engagement, but family updated Constitution 10 times after deactivation
   - **Expected behavior:** Advisor sees Constitution version from deactivation timestamp, NOT latest version. Banner indicates: "Constitution v3 (archived) — Current version is v13"

4. **Multiple Engagements with Same Family:**
   - **Edge case:** Service Advisor completed two separate projects with same family (2023 and 2025)
   - **Expected behavior:** Two separate "View Archive" entries, each with distinct frozen timestamps and scoped data

**See also:** Business rules in Epic FG-EPIC-XXX Section "Technical Architecture Notes" for frozen snapshot implementation

---

## 🧪 Test Scenarios

**Happy Path:**

1. **View Archived Engagement:**
   - Service Advisor "Sarah" completed workshop engagement with "Johnson Family" on 2024-06-15
   - Sarah deactivated on 2024-06-15 at 14:30 UTC
   - Sarah logs in on 2024-08-20
   - Sarah clicks "Johnson Family - View Archive"
   - System loads interface with banner: "Read-Only Archive — Data frozen as of June 15, 2024 14:30 UTC — 66 days ago"
   - Sarah navigates to Workshop Service section, sees her 3 workshops from March-June 2024
   - Sarah sees Constitution version from June 15, 2024
   - Sarah does NOT see new workshop added by family on July 10, 2024

2. **Download Advisor-Created Materials:**
   - Sarah views archived workshop "Succession Planning Workshop - May 2024"
   - Sarah clicks "Download Presentation" on slides she uploaded
   - System allows download, file includes watermark: "Service Advisor Archive - June 15, 2024 - Sarah Mitchell"
   - Sarah attempts to click "Download All Family Documents"
   - System displays: "Download restricted to materials you created during engagement"

**Negative Tests:**

1. **Attempt to Edit Archived Data:**
   - Sarah views archived consultation notes
   - Sarah clicks on note title to edit
   - System does nothing (element disabled) or shows tooltip: "Read-only archive — editing not available"

2. **Attempt to Access Data Outside Engagement Scope:**
   - During active engagement, Sarah had NO access to Philanthropy service
   - In archived view, Sarah attempts to navigate to /philanthropy URL directly
   - System redirects to 403 error page: "This section was not part of your engagement access"

3. **Attempt to View Post-Deactivation Data:**
   - Family created new decision proposal on 2024-07-01 (after Sarah's deactivation on 2024-06-15)
   - Sarah navigates to Decision-Making service in archive
   - Sarah sees decisions from before 2024-06-15 ONLY
   - New decision from July does NOT appear anywhere in interface

**Edge Cases:**

1. **Reactivation After Archive:**
   - Sarah's engagement ended 2024-06-15, archived view available
   - Family rehires Sarah on 2025-01-10 with Active Service Tier access
   - Sarah logs in on 2025-01-11
   - Sarah sees TWO entries for Johnson Family:
     - "Johnson Family - Active Access" (new engagement, current data)
     - "Johnson Family - View Archive (June 15, 2024)" (frozen snapshot from first engagement)
   - Sarah can switch between current and archived views independently

2. **Retention Period Expiration:**
   - Sarah's archive retention expires on 2026-06-15 (2 years after completion)
   - System sends notification to Sarah 60 days before: "Your archive access for Johnson Family will expire on June 15, 2026"
   - On 2026-06-15, system moves frozen snapshot to cold storage
   - Sarah logs in on 2026-06-20, clicks on Johnson Family archive
   - System displays: "This archive has been moved to cold storage. Contact support with Engagement ID JF-2024-SE-001 to request access."

3. **Family Requests Data Purge from Archive:**
   - Johnson Family discovers sensitive financial document was accidentally shared with Sarah during engagement
   - Family Council Member requests Admin to remove document from Sarah's frozen archive
   - Admin logs into Advisor Archive Management, selects Sarah's Johnson Family archive
   - Admin clicks "Purge Specific Item" → selects document → confirms purge
   - System removes document from frozen snapshot, logs action: "Document purged by Admin [name] on [date] - Reason: Family data privacy request"
   - Sarah's next archive view no longer shows purged document

4. **Admin Views Completed Conflict Materials:**
   - Admin "Michael" was mediator on Johnson Family conflict that reached "Completed" status on 2024-06-15
   - Michael logs into Family Portal on 2024-08-20
   - Michael navigates to Conflict Resolution service
   - Michael sees conflict with status "Completed" (NOT archived — remains in normal location)
   - Michael can view all conflict details, mediation notes, resolution documents in read-only mode
   - Michael cannot edit completed conflict (all forms disabled)
   - Materials stay accessible indefinitely in Conflict Resolution service (no 2-year retention limit like Service Advisor archives)

5. **Consul Views Completed Education Materials:**
   - External Consul "David" facilitated workshop series for Johnson Family, engagement ended 2024-06-15
   - David logs into Family Portal on 2024-08-20
   - David navigates to Education Service
   - David sees his workshop materials with status "Saved Content" (NOT archived)
   - David can view workshop slides, attendance records, participant feedback in read-only mode
   - David cannot create new workshops or edit existing ones
   - Materials remain in Education Service as reference content for family (no frozen snapshot needed)

---

## 🔗 Dependencies

**Story Dependencies:**

- **Blocked by:**
  - FG-XXX-03 (Service Tier implementation with deactivation workflow) — Must have deactivation mechanism to trigger snapshot creation
  - FG-XXX-04 (Permission inheritance system) — Frozen snapshot must capture permission state at deactivation

- **Blocks:**
  - FG-XXX-10 (Advisor engagement analytics) — Archived access tracking feeds into engagement outcome metrics

---

## ⚠️ Non-Functional Requirements

**Performance:**
- Frozen snapshot creation: < 10 seconds at deactivation time (background job acceptable)
- Archived data page load time: < 3 seconds (since not real-time critical)
- Snapshot storage optimization: Compressed/deduplicated to minimize storage costs

**Security:**
- Frozen snapshots stored in separate database schema or tables (not queryable via standard family_id filters)
- Access logs: Every archived view logged with timestamp, advisor_id, engagement_id for audit trail
- Data integrity: Frozen snapshots immutable (cannot be modified by anyone, including Admin, except full deletion)
- Encryption: Archived data encrypted at rest (same standard as active data)

**Data Privacy:**
- Frozen snapshot includes ONLY data advisor had permission to view during active engagement
- PII minimization: Contact information of family members NOT included in snapshot unless explicitly part of project deliverables
- Right to be forgotten: If family member requests data deletion, system flags their data in advisor archives for review/potential purge

**Accessibility:**
- Read-only archive UI must be keyboard navigable
- Screen readers must announce "Read-only archive" status on page load
- Visual indicators (colors, icons) must not be sole method of conveying archive status (use text labels)

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Android (responsive design)

---

## 📝 Notes

**Open Questions:**
- [x] **Retention period default:** 2 years from engagement completion (confirmed in epic discussion)
- [x] **Snapshot scope:** Only data advisor accessed during engagement, based on permission history (confirmed)
- [x] **Download restrictions:** Advisor-created materials only, no bulk family data export (confirmed)
- [x] **Reactivation scenario:** Multiple archive entries if rehired (confirmed)
- [x] **Cold storage mechanism:** After retention expiration, archived data moved to cold storage, manual support request required for access (confirmed)
- [x] **Admin/Consul access:** Materials remain in original system sections (Conflicts, Education) with read-only status, NO frozen archive for them (confirmed)

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-17  
**Story Status:** Draft — Ready for Grooming