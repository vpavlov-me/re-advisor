# Epic: epic-009-consul-journey

---

## 📋 Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** epic-009-consul-journey 
**Summary:** Enable External Consuls to manage multiple family clients with full View+Modify access to all governance modules (except billing), family structure viewing, and advisor permission management through a dedicated multi-family dashboard  
**Parent Initiative:** FG-XXX [Link to Family Governance Platform Initiative]  
**Priority:** High  
**Epic Link:** FG-EPIC-XXX

---

## 🎯 Epic Goal

**What will this Epic deliver?**

This Epic delivers a comprehensive multi-family client management interface for External Consuls, enabling them to:

- **View and manage unlimited family clients** through a centralized families list with search, filtering, and status tracking
- **Access full governance dashboards** for each family with View+Modify access to all modules (Constitution, Family Council, Decision Making, Conflict Resolution, Education, Communication, Tasks, etc.) - excluding billing and extensions
- **View complete family tree structure** with all family members, their roles, and relationships
- **Manage advisor access and permissions** by viewing all advisors associated with the family and editing permission levels for Personal and Service Advisors
- **Create and manage governance content** including decisions, conflicts, constitution sections, educational resources, and communications
- **Switch seamlessly between families** using association-based access model while maintaining context and data isolation
- **Track engagement activities** and family progress through comprehensive module access

**User-facing value:**
- External Consuls can efficiently manage unlimited family clients from a single portal
- Quick context switching between families without losing engagement history
- Full ability to create and manage governance content (decisions, conflicts, communications)
- Understanding of family structure and other advisors working with the same family
- Direct control over Personal and Service Advisor permissions to coordinate advisory teams

**Business value:**
- Enables professional advisory services at scale through efficient multi-family management
- Maintains strict data isolation between families while providing unified advisor experience
- Supports the unique association-based access pattern required for external advisors
- Facilitates high-quality consulting through comprehensive family context visibility and content creation capabilities
- Enables transparent multi-advisor collaboration through permission management
- Reduces admin overhead by allowing Consuls to manage Personal and Service Advisor teams

**Scope boundaries:**

**Included in this Epic:**
- ✅ Families list page with search, filtering, and family overview
- ✅ Multi-family dashboard with sidebar navigation
- ✅ View+Modify access to all governance modules (Constitution, Family Council, Decision Making, Conflict Resolution, Education, Communication, Tasks, Succession, Philanthropy, Assets)
- ✅ **Decision Making**: View, create new decisions, edit non-completed decisions, change status
- ✅ **Conflict Resolution**: View, create new conflicts, edit non-completed conflicts, change status
- ✅ **Communication**: NEW module in dashboard - send messages, create announcements, manage conversations
- ✅ Family tree visualization showing all family members with roles and relationships
- ✅ Advisor management view showing all advisors associated with the family
- ✅ Advisor permission editing for Personal Family Advisors and Service Advisors (NOT other Consuls or Admins)
- ✅ Resource creation and management (education materials, constitution sections)
- ✅ Multi-family context switching with preserved state

**NOT included in this Epic:**
- ❌ Billing and Extensions modules (no access for External Consul)
- ❌ Managing permissions for other External Consuls or Admins (equality rule)
- ❌ Family Council meetings viewing (separate epic)
- ❌ Personal workspace for advisor tasks (separate epic)
- ❌ Other advisor roles interfaces (Advisor, Staff, Mediator) - separate epics
- ❌ Advisor invitation/association creation (family-initiated, covered in separate epic)
- ❌ Workshop facilitation tools
- ❌ Advisor marketplace/directory
- ❌ Calendar integration with external systems
- ❌ Real-time collaboration features
- ❌ Mobile-specific optimizations (desktop-first approach)
- ❌ Notification system
- ❌ Audit logging
- ❌ Version control/history for documents
- ❌ Template library for resources

---

## 👥 Target Users

**Primary Personas:**
- **External Consul (DOC-USR-005)** - Strategic governance consultant with View+Modify All access to all governance modules (except billing/extensions) across multiple families and ability to manage Personal and Service Advisor permissions

**Secondary Personas:**
- Personal Family Advisors (DOC-USR-004) - Their permissions managed by Consul
- Service Advisors - Their permissions managed by Consul
- Family Council Members (DOC-USR-002) - Indirect beneficiaries through improved consul engagement
- Platform Administrators - Managing advisor-family associations (background role)

---

## 📖 User Stories (High-Level)

### Multi-Family Portfolio Management (3 stories)

1. **As an** External Consul, **I want to** view all my family clients in a centralized list with search, filters, and key status information (access level, members, last contact), **so that** I can quickly assess my portfolio and prioritize my engagement efforts across all families

2. **As an** External Consul, **I want to** open any family's full governance dashboard and navigate between modules (Constitution, Family Council, Tasks, Communication, etc.) using a sidebar menu, **so that** I can access all governance information efficiently and switch contexts quickly

3. **As an** External Consul, **I want to** view the complete family tree structure showing all members with their roles and relationships, **so that** I understand family dynamics, hierarchy, and can identify key stakeholders for governance discussions

### Advisor Collaboration & Permission Management (2 stories)

4. **As an** External Consul, **I want to** view all advisors associated with the family and their current access levels to different modules, **so that** I understand who else is supporting the family and what capabilities they have

5. **As an** External Consul, **I want to** edit permissions for Personal Family Advisors and Service Advisors by granting or removing access to specific modules and setting their access level (View/Modify Related/Modify All), **so that** I can coordinate advisory teams while respecting the hierarchy (cannot manage other Consuls or Admins)

### Governance Content Creation & Management (3 stories)

6. **As an** External Consul, **I want to** create new family decisions, edit non-completed decisions, and change decision status, **so that** I can actively facilitate decision-making processes rather than just observing them

7. **As an** External Consul, **I want to** create new conflict cases, document parties involved and resolution paths, edit non-completed conflicts, and track resolution progress, **so that** I can proactively manage family dynamics and mediation needs

8. **As an** External Consul, **I want to** create and manage constitution sections, educational resources, and personal tasks with full edit capabilities, **so that** I can develop family governance frameworks and learning materials

### Governance Monitoring (1 story)

9. **As an** External Consul, **I want to** view family succession plans, philanthropy strategy, and asset overview, **so that** I can understand the complete family context when providing comprehensive governance recommendations

---

## 📗 Dependencies & Risks

### Dependencies (Blockers)

**Upstream:**
- **Epic: FG-XXX - Advisor Portal Infrastructure**
  - Advisor Portal Service (port 8011) with association-based access model
  - `family_advisor_associations` table for multi-family access
  - Encrypted advisor PII storage (pgcrypto)
  - JWT authentication with advisor_id context (not family_id)
  - Frontend: Advisor Portal application (port 3002)

- **Epic: FG-XXX - Core Family Governance Modules**
  - Constitution Service (port 8002) with 11 section types
  - Decision-Making Service (port 8009) with voting workflows + advisor create/edit capabilities
  - Conflict Resolution Service (port 8015) + advisor create/edit capabilities
  - Education Service (port 8006) with folder management
  - Task Service (port 8016)
  - Communication Service (port 8004) - **CRITICAL**: Full integration needed (announcements, conversations, messaging)
  - Succession Service (port 8014)
  - Philanthropy Service (port 8008)
  - Asset Service (port 8005)

- **Epic: FG-XXX - Family Structure & Member Management**
  - Family tree data model (members, roles, relationships)
  - Family member CRUD operations
  - Role definitions (Family Head, Council Member, Regular Member)

- **Epic: FG-XXX - Advisor Permission System**
  - Permission model for module access (View, Modify Related, Modify All)
  - Permission hierarchy enforcement (Consul cannot manage other Consuls/Admins)
  - Permission update API endpoints
  - Permission validation middleware

**Downstream:**
- Epic: FG-XXX - External Advisor Access (other roles: Personal Advisor, Service Advisor, Staff, Mediator)
- Epic: FG-XXX - Advisor Invitation Flow (family-initiated association)
- Epic: FG-XXX - Resource Template Library
- Epic: FG-XXX - Family Council Meetings for Advisors (viewing meetings, agendas, notes)
- Epic: FG-XXX - Advisor Personal Workspace (task management across families)

### Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Association-based access complexity**: Multiple families per advisor breaks standard family_id isolation pattern | High - Core architectural difference requiring specialized query patterns | Early prototype of association join logic, comprehensive unit tests for multi-family access, security audit of data isolation |
| **Permission hierarchy enforcement**: Must prevent Consul from managing other Consul/Admin permissions | High - Security vulnerability if not properly enforced | Implement strict role hierarchy checks at API level, automated security tests, clear error messages |
| **Decision/Conflict edit restrictions**: Completed items must be read-only even for Consul | Medium - Could lead to data integrity issues | Implement status-based edit guards at API level, clear UI indicators, validation on save |
| **Communication module integration**: New module needs full feature parity with family portal | High - Poor UX if communication features incomplete | Early integration testing, feature parity checklist, parallel development with family portal communication features |
| **Context switching performance**: Loading full family context repeatedly could cause slowness | Medium - Poor UX for advisors managing many families | Implement efficient caching strategy, lazy-load module data, optimize database queries with proper indexes on family_advisor_associations |
| **Module feature parity**: Different modules have different maturity levels (some may lack read-only views for advisors) | High - Incomplete advisor experience if modules don't support external viewing | Audit all modules for advisor access patterns, create standardized "advisor view" components, prioritize module completion |
| **Permission UI complexity**: Managing permissions for multiple advisors across 10+ modules could be overwhelming | Medium - Poor UX leading to permission errors | Design intuitive permission matrix UI, provide templates/presets for common advisor roles, clear visual feedback on changes |
| **Multi-advisor coordination**: Permission changes by Consul could conflict with family's intended advisor setup | Medium - Could cause confusion or access issues | Provide clear permission change indicators, respect hierarchy (cannot change Admin/Consul permissions) |

---

## 🎨 Design & UX

**UX Notes:**

**Information Architecture:**
```
Advisor Portal
├── Dashboard (out of scope - separate epic)
├── Families (THIS EPIC)
│   ├── Families List
│   │   ├── Search & Filters
│   │   ├── Family Cards (name, access level, members, status, last contact)
│   │   └── Actions: View Dashboard, Message
│   │
│   └── Family Dashboard [family_id]
│       ├── Header: Family Name, Access Level Badge ("View+Modify All")
│       ├── Sidebar Navigation (module list)
│       │   ├── Tasks (Workspace - separate epic)
│       │   ├── --- separator ---
│       │   ├── GOVERNANCE
│       │   │   ├── Constitution (View+Modify All)
│       │   │   ├── Family Council (View+Modify All)
│       │   │   ├── Decision Making (View+Modify All + Create)
│       │   │   └── Conflict Resolution (View+Modify All + Create)
│       │   ├── COMMUNICATION (NEW)
│       │   │   └── Communication (View+Modify All + Create)
│       │   ├── DEVELOPMENT
│       │   │   ├── Education (View+Modify All + Create)
│       │   │   └── Mentorship (future)
│       │   ├── FAMILY AFFAIRS
│       │   │   ├── Assets (View+Modify All)
│       │   │   ├── Succession (View+Modify All)
│       │   │   ├── Philanthropy (View+Modify All)
│       │   │   └── Family (View - tree + advisors with permission management)
│       │   └── TOOLS
│       │       ├── Activity (View)
│       │       └── Notifications (View)
│       │
│       └── Content Area (active module)
│           ├── Module Header (breadcrumb, title, actions)
│           └── Module Content (varies by module)
│               │
│               ├── Decision Making Module
│               │   ├── Tabs: Open | Reviewed | Completed
│               │   ├── "Create Decision" button (NEW)
│               │   ├── Decision list with edit capability (except Completed)
│               │   └── Status change dropdown (for non-Completed)
│               │
│               ├── Conflict Resolution Module
│               │   ├── Filter by status
│               │   ├── "Create Conflict" button (NEW)
│               │   ├── Conflict list with edit capability (except Closed)
│               │   └── Status change functionality (for non-Closed)
│               │
│               ├── Communication Module (NEW)
│               │   ├── Tabs: Announcements | Conversations | Messages
│               │   ├── Announcements Tab
│               │   │   ├── "Create Announcement" button
│               │   │   ├── List of all family announcements
│               │   │   └── View/Edit announcement details
│               │   ├── Conversations Tab
│               │   │   ├── "Start Conversation" button
│               │   │   ├── List of active conversations
│               │   │   └── Conversation detail with message thread
│               │   └── Messages Tab
│               │       ├── "Send Message" button
│               │       ├── Recipient selector (individual/all members)
│               │       └── Message history
│               │
│               └── Family Module
│                   ├── Tabs: Family Tree | Advisors
│                   └── Advisors Tab
│                       ├── Advisor list with role badges
│                       ├── Permission matrix for Personal/Service Advisors
│                       ├── Read-only view for Consuls/Admins
│                       └── "Edit Permissions" for applicable advisors
```

**Key UX Patterns:**

1. **Access Level Indicators:**
   - Sidebar modules show "View+Modify All" access for Consul
   - Create buttons visible on modules where Consul can create content
   - Edit restrictions clearly indicated (e.g., "Completed - Read Only")
   - Billing and Extensions modules completely hidden from sidebar

2. **Content Creation Flows:**
   - **Decision Making**: "Create Decision" button → Modal with form (title, description, deadline, priority, category) → Save → Appears in Open tab
   - **Conflict Resolution**: "Create Conflict" button → Modal with form (title, parties, description, category, resolution path) → Save → Appears in list
   - **Communication**: Multiple creation options (Announcement, Conversation, Message) with appropriate forms

3. **Edit Restrictions:**
   - Completed Decisions: View-only, no edit button, status badge shows "Completed"
   - Closed Conflicts: View-only, no edit button, status badge shows "Closed"
   - Clear visual distinction between editable and read-only content

4. **Communication Module (NEW):**
   - Centralized hub for all communication activities
   - Three main tabs for different communication types
   - Announcements: Broadcast messages to all family members
   - Conversations: Group discussions with selected members
   - Messages: Direct one-on-one or one-to-many messaging
   - Integration with family member selector
   - Read/unread indicators
   - Search and filter capabilities

5. **Permission Management:**
   - Permission matrix visible only for Personal and Service Advisors
   - Other Consuls and Admins show as read-only with "Cannot Edit" indicator
   - Three access levels: None (gray), View (blue), Modify Related (yellow), Modify All (green)
   - Save/Cancel buttons for permission changes

6. **Module Navigation:**
   - New COMMUNICATION category in sidebar between GOVERNANCE and DEVELOPMENT
   - Communication module badge shows unread message count
   - Active module highlighted with accent color

**User Flows:**

**Flow 1: Create New Decision (NEW)**
```
Start → Families List → Click "View" on Anderson Family
→ Dashboard opens → Click "Decision Making" in sidebar
→ See tabs: Open | Reviewed | Completed
→ Click "Create Decision" button
→ Modal opens: Decision Creation Form
→ Fill in:
  - Title: "New investment in renewable energy"
  - Description: "Proposal to invest $500K in solar project"
  - Deadline: Select date (min: tomorrow)
  - Priority: High/Medium/Low
  - Category: Financial Decisions
→ Click "Create Decision"
→ Decision appears in Open tab
→ Can click to view details
→ Can edit any field while status is Open or Reviewed
→ Cannot edit once status changes to Completed
```

**Flow 2: Create and Manage Conflict (NEW)**
```
Start → Families List → Click "View" on Martinez Family
→ Dashboard opens → Click "Conflict Resolution" in sidebar
→ View existing conflicts filtered by status
→ Click "Create Conflict" button
→ Modal opens: Conflict Creation Form
→ Fill in:
  - Title: "Dispute over property distribution"
  - Parties Involved: Select from family members (multi-select)
  - Description: Text description of conflict
  - Category: Governance / Family Affairs / Financial
  - Resolution Path: Mediation / Family Council / External Mediator
→ Click "Create Conflict"
→ Conflict appears in list with status "Draft"
→ Click conflict to view details
→ Change status: Draft → Open → In Progress → Resolved → Closed
→ Can edit all fields while status is not "Closed"
→ Once Closed, view-only mode activated
```

**Flow 3: Send Family Communication (NEW)**
```
Start → Families List → Click "View" on Chen Family
→ Dashboard opens → Click "Communication" in sidebar (NEW)
→ Communication module opens with 3 tabs: Announcements | Conversations | Messages
→ Default tab: Announcements

Option A - Create Announcement:
→ Click "Create Announcement" button
→ Form appears:
  - Title: "Quarterly Family Meeting Reminder"
  - Content: Rich text editor
  - Priority: Normal / Important / Urgent
  - Attachments: Optional file upload
→ Click "Publish Announcement"
→ Announcement appears in list, all family members notified

Option B - Start Conversation:
→ Click "Conversations" tab
→ Click "Start Conversation" button
→ Form appears:
  - Topic: "Philanthropy Strategy Discussion"
  - Participants: Multi-select from family members
  - Initial Message: Text field
→ Click "Start Conversation"
→ Conversation created, participants can join thread

Option C - Send Direct Message:
→ Click "Messages" tab
→ Click "Send Message" button
→ Form appears:
  - Recipients: Individual member OR "All Members" option
  - Subject: Text field
  - Message: Text area
→ Click "Send"
→ Message delivered to recipient(s)
```

**Flow 4: Manage Advisor Permissions (Respecting Hierarchy)**
```
Start → Families List → Click "View" on Thompson Family
→ Dashboard opens → Click "Family" in sidebar (FAMILY AFFAIRS)
→ Click "Advisors" tab
→ View all advisors:
  - John Smith (External Consul) - Read-only badge "Cannot Edit - Peer Level"
  - Jane Doe (Admin) - Read-only badge "Cannot Edit - Higher Level"
  - Mike Johnson (Personal Family Advisor) - Edit button visible
  - Sarah Lee (Service Advisor) - Edit button visible
→ Click "Edit Permissions" for Mike Johnson
→ Permission matrix opens (10+ modules × access levels)
→ Set permissions:
  - Constitution: Modify Related
  - Education: Modify All
  - Tasks: Modify Related
  - Communication: View
  - (Other modules as needed)
→ Click "Save Permissions"
→ Changes applied, Mike Johnson's access updated
→ Try to edit John Smith (Consul) → "Edit" button disabled
→ Hover shows tooltip: "Cannot manage permissions for other Consuls"
```

**See also:** Feature specifications in `05-feature-specifications/` (to be created during grooming)

---

## 🧮 Business Rules

### Access Control Rules

**BR-001: Association-Based Access**
- External Consuls can ONLY access families explicitly associated via `family_advisor_associations` table
- Association must have `is_active = true`
- JWT tokens contain `advisor_id`, NOT `family_id`
- All family data queries must join through associations table
- No limit on number of families an advisor can be associated with

**BR-002: External Consul Access Levels**
- External Consul has "View+Modify All" access to ALL modules EXCEPT billing and extensions
- View+Modify All means: read all content, create new content, edit all content (with status restrictions)
- Cannot access: Billing module, Extensions module
- Cannot delete: family members, completed decisions, closed conflicts
- CAN delete: own resources, draft content

**BR-003: Data Isolation**
- Each family's data is strictly isolated from other families
- Advisors see ONLY data for families they are associated with
- No cross-family data leakage in queries
- Family tree and advisor list are family-scoped only

**BR-004: Advisor Permission Management Hierarchy**
- External Consul can VIEW all advisors (Consuls, Admins, Personal, Service)
- External Consul can EDIT permissions ONLY for: Personal Family Advisors and Service Advisors
- External Consul CANNOT EDIT permissions for: Other External Consuls, Admins, Family Portal Consuls
- Permission hierarchy: Admin > Consul = Consul (peer level) > Personal/Service Advisors
- Attempting to edit peer-level or higher permissions results in error: "Cannot manage permissions for this advisor level"

**BR-005: Decision Management Rules**
- Consul can CREATE new decisions with required fields (title, description, deadline, priority, category)
- Consul can EDIT decisions with status: Open, Reviewed
- Consul can CHANGE STATUS of decisions: Open → Reviewed → Completed
- Consul CANNOT EDIT decisions with status: Completed (read-only)
- Consul CANNOT DELETE decisions (any status)
- Consul can VIEW voting progress but cannot cast votes (family member permission)

**BR-006: Conflict Management Rules**
- Consul can CREATE new conflicts with required fields (title, parties, description, category, resolution path)
- Consul can EDIT conflicts with status: Draft, Open, In Progress, Resolved
- Consul can CHANGE STATUS of conflicts: Draft → Open → In Progress → Resolved → Closed
- Consul CANNOT EDIT conflicts with status: Closed (read-only)
- Consul CANNOT DELETE conflicts (any status)
- Parties involved must be family members (validated against family tree)

**BR-007: Communication Rules**
- Consul can CREATE announcements, conversations, and messages
- Consul can VIEW all family communications (announcements, conversations, messages)
- Consul can EDIT own communications
- Message recipients must be family members
- "All Members" option sends to all family members in family tree
- Announcements are broadcast to all family members automatically

### Module-Specific Business Rules

**BR-008: Family Tree**
- Displays all family members with roles (Family Head, Family Council Member, Regular Member)
- Shows relationships and family hierarchy
- Members grouped by generation (optional view)
- Search and filter by name, role, generation
- Read-only for advisors (cannot add/remove members)

**BR-009: Advisor Management**
- Displays all advisors with roles: External Consul, Admin, Family Portal Consul, Personal Family Advisor, Service Advisor
- Shows module access for each advisor with visual badges
- External Consul can edit permissions ONLY for Personal and Service Advisors
- Permission editing interface shows three levels: None, View, Modify Related, Modify All
- Permission changes require explicit "Save" action
- Unsaved changes warning if navigating away

**BR-010: Constitution Management**
- 11 predefined section types (Preamble, Values & Mission, Governance Structure, Asset Management Principles, Education Development, Decision Making, Succession, Philanthropy, Conflict Resolution, Voting Rules, Amendment Process)
- Custom sections can be created but must map to predefined types
- Section status: Not Started → In Progress → Completed
- Consul can create and edit all sections

**BR-011: Education Resources**
- Resource types: Article, Video, Document, Quiz
- Categories: Governance, Financial, Leadership, Succession, Communication, Other
- Resources can be organized into folders (optional)
- Resources are family-scoped (not shared across families automatically)
- Consul can create and edit all resources

### Data Validation Rules

**BR-012: Required Fields**
- Resource: title (description, author, duration optional)
- Constitution section: title, type, content
- Decision: title, description, deadline, priority, category
- Conflict: title, parties (min 2), description, category, resolution path
- Communication: varies by type (announcement requires title+content, message requires recipient+message)

**BR-013: Status Validation**
- Decision status transitions: Open → Reviewed → Completed (no backwards)
- Conflict status transitions: Draft → Open → In Progress → Resolved → Closed (no backwards except Resolved → In Progress allowed)
- Cannot skip statuses
- Status change must include timestamp and actor

**BR-014: Search & Filtering**
- Families list: Search by name, filter by status (All/Active/Inactive), sort by Recent Contact/Name A-Z/Name Z-A/Oldest First
- Conflicts: Filter by status (All/Draft/Open/In Progress/Resolved/Closed)
- Decisions: Filter by category (All/Standard/Urgent/Financial), tabs by status (Open/Reviewed/Completed)
- Education: Tabs for ALL RESOURCES vs FOLDERS view
- Family Tree: Search by member name, filter by role
- Advisors: Sort by role, name, date added
- Communications: Filter by type (All/Announcements/Conversations/Messages), search by content

**See also:** Detailed business rules in `06-business-rules/` (to be created during implementation)

---

## 📅 Estimated Timeline

**Phases:**

**Phase 1: Investigation & Solution Design (2 weeks)**
- Architecture review: association-based access patterns
- Database schema validation for multi-family queries
- Permission hierarchy enforcement design
- Edit restriction implementation strategy
- Communication module integration planning
- Security audit of data isolation
- UX design for families list, dashboard, permission matrix
- Technical spike: decision/conflict creation flows

**Phase 2: Development (8-10 weeks)**

*Track 1 - Core Infrastructure (Weeks 1-3):*
- Families list with search/filter
- Multi-family dashboard shell with sidebar navigation
- Context switching mechanism
- Association-based data fetching
- Permission hierarchy middleware

*Track 2 - Module Integration (Weeks 2-6):*
- Constitution module view/edit
- Education module with resource creation
- Succession, Philanthropy, Assets modules (read-only)
- Task module integration
- Family tree visualization
- Advisor list with permission matrix

*Track 3 - Content Creation Features (Weeks 4-8):*
- Decision Making: create/edit with status restrictions
- Conflict Resolution: create/edit with status restrictions
- Communication module: announcements, conversations, messages
- Edit restriction enforcement (UI + API)

*Track 4 - Permission Management (Weeks 7-10):*
- Advisor permission editing UI
- Permission hierarchy validation
- Bulk permission updates
- Permission change notifications

**Phase 3: Testing (3 weeks)**
- Unit tests: association-based access, permission hierarchy
- Integration tests: multi-family workflows, edit restrictions
- Security testing: cross-family data isolation, permission escalation
- User acceptance testing with beta consuls
- Performance testing: 10+ families, large permission matrices
- Communication module feature parity validation

**Phase 4: Release & Knowledge Transfer (1 week)**
- Deployment to production
- Documentation for External Consuls
- Training materials and videos
- Support team onboarding
- Monitoring setup for multi-family access patterns

**Target Release:** Q2 2026 (Sprint 15-18)

---

## 📝 Notes

**Open Questions:**
- [ ] Should Communication module support file attachments in messages? (Decision: Yes, max 10MB per file)
- [ ] Should External Consul be able to archive old decisions/conflicts? (Decision: View-only archive, no delete)
- [ ] Should permission changes trigger email notifications to affected advisors? (Decision: Yes, with opt-out)
- [ ] Should we track permission change history for audit purposes? (Decision: Phase 2 feature)
- [ ] Maximum number of families per External Consul? (Decision: No limit, but monitor performance after 20+)
- [ ] Should Family Tree support custom relationship types beyond parent/child/sibling? (Decision: Phase 2 feature)
- [ ] Should Communication module support @mentions and notifications? (Decision: Yes, include in initial scope)
- [ ] Can External Consul create custom Decision categories or limited to predefined ones? (Decision: Predefined initially, custom in Phase 2)

**Design Considerations:**
- **Communication Module**: Brand new module requiring full feature parity with Family Portal communication features
- **Permission Hierarchy**: UI must clearly show which advisors can/cannot be edited (visual distinction between editable and read-only)
- **Edit Restrictions**: Clear visual indicators for completed decisions and closed conflicts (read-only badges, disabled edit buttons)
- **Permission Matrix UI**: Design should handle 10 advisors × 12 modules with clear hierarchy indicators
- **Content Creation Forms**: Decision and conflict creation forms must be intuitive with validation feedback
- **Family Tree Visualization**: For large families (30+ members), implement collapsible branches, generation grouping, and zoom controls
- **Context Indicators**: Always show current family name prominently to avoid confusion during multi-family work
- **Module Priority**: All modules equally important - parallel development tracks recommended
- **Communication Badge**: Show unread message/announcement count in sidebar

**Success Criteria:**
- External Consul can manage unlimited families efficiently through single portal
- Context switching between families takes < 2 seconds
- All modules load within 1 second after selection
- Permission changes save successfully in < 1 second
- Permission matrix correctly enforces hierarchy (cannot edit Consul/Admin permissions)
- Decision creation succeeds and appears in Open tab
- Conflict creation succeeds with proper party validation
- Communication module supports all three types (announcements, conversations, messages)
- Completed decisions and closed conflicts are properly read-only
- Edit restrictions properly enforced at both UI and API levels
- Permission matrix handles 10 advisors × 12 modules without performance issues
- Zero cross-family data leakage in testing
- Zero unauthorized permission escalation in security testing
- Zero bypassing of edit restrictions for completed/closed items
- Family tree renders correctly for families up to 50 members
- Clear visual indication of unsaved permission changes
- Communication module renders with <500ms load time
- 90% test coverage on association-based access patterns, permission management, and edit restrictions
- Positive feedback from beta consul users on usability, content creation workflows, and communication features

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-20  
**Epic Created By:** Product Team  
**Next Steps:** 
1. Stakeholder review and approval
2. Technical architecture review with backend team (especially permission hierarchy, edit restrictions, communication integration)
3. UX design refinement (especially family tree, advisor list, permission matrix, decision/conflict creation forms, communication module)
4. Break down into detailed User Stories during Grooming
5. Estimate story points and assign to sprints
6. Identify parallel development tracks for faster delivery
7. Communication Service integration planning session
