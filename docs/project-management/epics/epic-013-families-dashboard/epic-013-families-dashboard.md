# Epic: epic-006-families-dashboard

---

## 📋 Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** Family Client Management Workspace  
**Summary:** Comprehensive family client management interface for advisors with enhanced table view, family workspace with tasks, services, payments, and consultations tracking  
**Parent Initiative:** FG-XXX [Link to Advisor Portal Initiative]  
**Priority:** High  
**Epic Link:** FG-EPIC-XXX

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Comprehensive family client management system for advisors (External Consul, Consultant, Personal Family Advisor) enabling them to:
- View and manage all family client relationships in enhanced table format
- Track meetings, payment status, and family health at a glance
- Organize personal work through advisor-specific task management
- Manage service offerings, proposals, and payment tracking per family
- Monitor all consultations and meetings across family portfolio

**User-facing value:**
- Advisors gain centralized workspace for managing multiple family clients
- Clear visibility of payment status, upcoming meetings, and service delivery
- Professional task management for organizing advisor's own work per family
- Streamlined service proposal and acceptance workflow

**Business value:**
- Increases advisor efficiency and client management capabilities
- Enables transparent service offering and payment tracking
- Supports advisor scaling to multiple family clients
- Improves advisor retention through better tooling

**Scope boundaries:**

**Included:**
- Enhanced Family Clients table with new columns (Role, Meetings, Payment)
- Family Workspace modal with 4 sections (Overview, Tasks, Services, Consultations)
- Advisor Personal Tasks (separate from family task service)
- Service offering and proposal workflow (advisor side)
- Payment status tracking and invoicing (advisor creates invoices)
- Consultations aggregation (meetings with specific family)

**NOT included:**
- Family side of service acceptance workflow (separate Epic)
- Actual payment processing with Stripe (separate Epic)
- Automated invoice generation after acceptance
- Notifications for advisor tasks
- Integration with external calendar systems
- Marketplace bookings overview (separate section)
- Export functionality for reports
- Bulk invoice creation
- File attachments for proposals

---

## 👥 Target Users

**Primary Personas:**
- **External Consul** - Full family access, strategic partner
- **Consultant** - Marketplace professional, multiple families
- **Personal Family Advisor** - Specialist, limited module access

**Secondary Personas:**
- **Family Council Member** - Will interact with service acceptance (different Epic)
- **Family Member** - May order services and accept proposals

---

## 📖 User Stories (High-Level)

### 1. Enhanced Family Clients Table
**As an advisor**, **I want to** see enhanced family table with Role, Meetings, and Payment columns, **so that** I can quickly assess status of all my family clients and prioritize my work.

**Acceptance Criteria:**
- Table displays: Family Name | Role | Members | Meetings | Payment | Status | Last Contact | Actions
- Role column shows: External Consul / Consultant / Personal Family Advisor
- Meetings column shows: count of upcoming meetings + next meeting date
- Payment column shows aggregated status: Paid / Pending / No Invoices
- Can filter by Status and sort by Recent Contact / Family Name / Next Meeting
- "View" button opens Family Workspace modal

---

### 2. Family Workspace Modal - Overview Section
**As an advisor**, **I want to** open a dedicated workspace modal for each family with overview of family details, **so that** I can quickly understand family context and my engagement scope.

**Acceptance Criteria:**
- Modal opens full-screen on "View" click
- Left sidebar navigation: Overview | Tasks | Services | Consultations
- Overview section displays:
  - Family name and description
  - Family characteristics/special notes
  - Family member roles and structure
  - Services this family needs from advisor
  - Total member count
  - My role with this family (badge)
- Close button (X) in header
- Modal closes only via close button

---

### 3. Advisor Personal Tasks Management
**As an advisor**, **I want to** create and manage personal tasks for my work with each family, **so that** I can organize my deliverables, track deadlines, and stay on top of commitments.

**Acceptance Criteria:**
- Tasks section shows list view (card-based layout)
- "Create Task" button opens task creation form
- Task attributes: Title, Description, Due Date, Priority (High/Medium/Low), Status (To Do/In Progress/Done)
- Each task card displays all attributes
- Can edit, delete, and change status of tasks
- Tasks are private to advisor (not visible to family)
- Tasks are scoped to specific family
- Filter dropdown: All Tasks / To Do / In Progress / Done

---

### 4. Payment Status Visibility and Alerts
**As an advisor**, **I want to** see clear payment status across all services and visual alerts for pending payments, **so that** I can follow up on unpaid invoices and track revenue.

**Acceptance Criteria:**
- Payment column in Family Clients table shows aggregated status
- Aggregation logic: Pending > Paid > No Invoices
- Services sidebar tab shows (!) indicator when any service has Pending payment
- Services table clearly shows payment status per service
- Payment status badge: Paid (green) / Pending (yellow/orange) / Not Invoiced (gray)

---

### 5. Consultations - Upcoming Meetings View
**As an advisor**, **I want to** see all my upcoming meetings with each family in one place, **so that** I can prepare for consultations and maintain clear meeting schedule.

**Acceptance Criteria:**
- Consultations section shows list of upcoming meetings
- Only shows meetings where:
  - Advisor is participant
  - Meeting is with this specific family
  - Meeting date is in the future
- Meeting card displays: Date | Time | Topic/Title | Meeting Type | Join Link/Details
- Sorted by date (earliest first)
- Empty state if no upcoming meetings

---

### 6. Role-Based Family Workspace Access
**As an advisor**, **I want to** access only families I'm associated with and see workspace appropriate to my role, **so that** data remains secure and I focus on my client portfolio.

**Acceptance Criteria:**
- Family Clients table shows only families where advisor has established relationship
- Family Workspace only opens for families in advisor's portfolio
- Role badge in Overview reflects advisor's actual role with this family
- Cannot access families without association
- Multi-tenancy enforced: advisor_id + family_id filtering on all queries
- All data (tasks, services, consultations) scoped to current advisor + current family

---

## 🔗 Dependencies & Risks

### Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| No existing Service/Payment domain logic | High | Design database schema and business rules as part of this Epic |
| Advisor Personal Tasks may conflict with Task Service (port 8016) naming | Medium | Use clear entity naming: `advisor_personal_tasks` vs `family_tasks` |
| Payment status aggregation complexity (multiple services, multiple statuses) | Medium | Define clear priority rules (Pending > Paid > No Invoices) |
| Consultations from multiple sources (Meeting Service + future integrations) | Medium | Unified data model with extensible source handling |
| Performance with advisors serving 50+ families | Medium | Implement pagination, lazy loading, efficient queries with proper indexes |
| Family Workspace modal UX and performance | Low | Use React best practices, lazy load sections, optimize rendering |

---

## 📐 Design & UX

**Family Workspace Design:**
- **Type**: Full-screen modal overlay
- **Structure**: Left sidebar (navigation) + main content area
- **Sidebar width**: ~250px
- **Closing**: Only via close button (X) in header, not click-outside

**Family Clients Table:**
- **Columns**: Family Name | Role | Members | Meetings | Payment | Status | Last Contact | Actions
- **Role badges**: Color-coded (External Consul = gold, Consultant = blue, Personal FA = gray)
- **Meetings format**: "3 upcoming | Next: Jan 20, 2025" or "No meetings"
- **Payment badges**: Paid (green) | Pending (yellow/orange) | No Invoices (gray)

**Tasks Section:**
- **Layout**: List view with card-based display
- **Task card**: Title, Description, Status badge, Priority badge, Due date
- **Actions**: Edit, Delete, Change Status
- **Filter dropdown**: All Tasks | To Do | In Progress | Done

**Services Section:**
- **Table layout**: Service Name | Description | Price | Status | Payment | Actions
- **Status badges**: Proposed | Accepted | Rejected
- **Payment badges**: Not Invoiced | Pending | Paid
- **Indicator**: (!) icon in sidebar when pending payments exist

**Consultations Section:**
- **Only upcoming meetings** - no past meetings tab
- **Meeting card**: Date, Time, Topic, Meeting details/link
- **Empty state**: "No upcoming consultations scheduled"

**Overview Section:**
- **Family card** with basic info
- **Member structure** overview
- **Advisor's role** with this family
- **Services needed** from advisor
- **Quick stats**: member count, active services, upcoming meetings

---

## 🧮 Business Rules

### Role Display Rules
1. **Role is determined by advisor-family relationship**:
   - External Consul: Full access to all 10 modules in this family
   - Consultant: Access via marketplace booking or managed portal (B2B2C)
   - Personal Family Advisor: Access to 1-7 modules as configured by family

### Meetings Column Logic
1. **Show only upcoming meetings** for this family where advisor is participant
2. **Format**: "[N] upcoming | Next: [Date]"
3. **If no upcoming meetings**: "No meetings"
4. **Source**: Meeting Service (port 8003) filtered by family_id + advisor_id + future dates

### Payment Status Aggregation
1. **Priority order** (highest priority wins):
   - **Pending Payment**: At least one service has unpaid invoice
   - **Paid**: All services with invoices are paid
   - **No Invoices**: No invoices created yet (may have accepted services)
2. **If no services at all**: Show "No Invoices"

### Service Proposal Workflow
1. **Advisor creates service proposal** with: name, description, price, duration/scope
2. **Proposal sent to family** (integration point with Family Portal - different Epic)
3. **Family member (who ordered)** accepts or rejects proposal
4. **If accepted**: Advisor can create invoice
5. **Invoice created**: Family sees in their portal (different Epic), advisor tracks payment status
6. **Payment received**: Status updates to "Paid" (handled by Stripe Epic)

### Advisor Personal Tasks
1. **Private to advisor** - never visible to family
2. **Scoped to specific family** - each task belongs to one family context
3. **Not integrated with Task Service (port 8016)** - separate entity `advisor_personal_tasks`
4. **No notifications** - at this stage, advisor manually manages
5. **Attributes**: Title, Description, Due Date, Priority (High/Medium/Low), Status (To Do/In Progress/Done)

### Consultations Display
1. **Only upcoming meetings** for this specific family
2. **Source**: Meeting Service (port 8003)
3. **Filters**: 
   - family_id = current family
   - advisor_id in participants
   - meeting_date >= today
4. **Marketplace bookings** are in separate section (not in this Epic)

### Overview Section Content
1. **Family Information**:
   - Family name
   - Family description/characteristics
   - Special notes or considerations
2. **Family Structure**:
   - Member roles (Family Council, regular members)
   - Total member count
3. **Engagement Context**:
   - Advisor's role with this family
   - Services this family needs from advisor
   - Engagement scope

---

## 🔒 Permissions & Access Control

### Who Can Access
- **All advisor types**: External Consul, Consultant, Personal Family Advisor
- **Prerequisite**: Advisor must have established relationship with family (invited or booked)

### Data Visibility by Role
- **All roles see**:
  - Their assigned families in table
  - Family Workspace for families they're associated with
  - Own personal tasks
  - Services they proposed/manage
  - Consultations they're scheduled for

- **No cross-family data leakage**: Advisor only sees families they're associated with

### Action Permissions
- **All roles can**:
  - View Family Workspace
  - Create personal tasks
  - Create service proposals
  - Create invoices (for accepted services)
  - View consultations

- **Cannot**:
  - See other advisors' personal tasks
  - Modify services accepted/rejected by family
  - Access families they're not associated with

---

## 📝 Notes

**Design Decisions:**
- ✅ Family Workspace is full-screen modal
- ✅ No bulk invoice creation
- ✅ No export functionality for reports
- ✅ Stripe integration in separate Epic
- ✅ No advisor revenue/earnings in Overview
- ✅ Only upcoming consultations (no past meetings)
- ✅ No file attachments for proposals
- ✅ Tasks list view (card-based)
- ✅ Consultations only for this family (marketplace bookings elsewhere)

**Technical Considerations:**
- New database tables needed: `advisor_personal_tasks`, `service_proposals`, `invoices`
- Performance: Efficient queries for advisors with 50+ families (pagination, indexes)
- Multi-tenancy: All queries filter by advisor_id + family_id
- Integration points: Meeting Service (port 8003), Advisor Portal Service (port 8011)

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-23  
**Status:** Draft - Ready for Review

---

## 🚀 Next Steps

1. **Review & Refine Epic** with Product Owner and stakeholders
2. **Create UX Wireframes** for Family Workspace and table enhancements
3. **Solution Design Workshop** to define database schema and API contracts
4. **Break down into detailed User Stories** using user-story-template.md
5. **Grooming Sessions** to estimate and prioritize stories
