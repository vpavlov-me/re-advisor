---
story_id: "STORY-FG-004-005"
title: "Service Advisor Automatic Permissions Assignment"
type: "story"
epic_id: "EPIC-004"
created: "2025-10-16"
updated: "2025-10-20"
priority: "critical"
status: "ready"
estimate: "20h"
story_points: 8
sprint: "Sprint 46"
assignee: ""
labels: ["advisor", "permissions", "service-advisor", "automation", "marketplace"]
dependencies: ["STORY-FG-004-001"]
---

# User Story - Service Advisor Automatic Permissions Assignment

> **Note:** User Story for Jira RLN1 project. Copy to Jira issue description.

---

## 📋 Basic Information

**Issue Type:** Story
**Project:** RLN1
**Summary:** As a Service Advisor, I want to receive automatic View+Modify (related) permissions to sections based on service request source, so that I can immediately start work with appropriate access scope
**Epic Link:** SAAS-055 - Advisor Portal: Role-Based Access & Permission Management
**Story ID:** SAAS-EPIC-055-5
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Service Advisor,
**I want to** receive automatic View+Modify (related) permissions to relevant platform sections based on the source of the accepted service request,
**so that** I can immediately start working with the family without waiting for manual permission configuration and have appropriate access scope for my specialized service.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point being solved:**
- Service Advisors currently have no automatic way to receive appropriate permissions when families accept their services through the platform
- Families experience delays between accepting service and advisor being able to start work
- Manual permission setup creates administrative burden and risk of incorrect access assignment
- Service Advisors waste time requesting access or waiting for manual configuration
- No clear mapping between service type and required platform sections

**Business outcome expected:**
- Zero-touch permission assignment when family accepts service through platform marketplace
- Immediate service delivery capability after family acceptance (no admin intervention needed)
- Appropriate security boundaries: Service Advisors only see sections relevant to their service
- Faster time-to-value for families purchasing services through platform
- Scalable service marketplace where advisors are automatically onboarded with correct access
- Reduced support requests for permission management

**Strategic alignment:**
- Enables service marketplace business model with automatic advisor onboarding
- Supports multi-advisor family governance model with clear role boundaries
- Maintains data security through least-privilege access principle and source-based permissions
- Aligns with association-based access architecture for External Advisors
- Creates foundation for future service catalog expansion

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** Family Member has created and accepted a service request from a platform Service Advisor,
   **When** system processes the accepted service request,
   **Then** system automatically creates advisor association with Permission Tier = "View+Modify (related)" and sections based on service request source.

2. **Given** Service request originated from Constitution section,
   **When** Service Advisor is created for this request,
   **Then** advisor automatically receives View+Modify (related) permissions for: Constitution, Education sections.

3. **Given** Service request originated from Assets section,
   **When** Service Advisor is created for this request,
   **Then** system displays message: "Assets section permissions not yet configured. Please contact support or wait for future release."

4. **Given** Service request originated from Conflict Resolution section,
   **When** Service Advisor is created for this request,
   **Then** advisor automatically receives View+Modify (related) permissions for: Conflict Resolution, Education sections.

5. **Given** Service Advisor association has been automatically created with permissions,
   **When** advisor logs into Advisor Portal,
   **Then** they immediately see only assigned sections with View+Modify (related) access, without requiring additional permission setup.

6. **Given** Family attempts to accept service request before onboarding meeting completed,
   **When** they attempt to accept,
   **Then** system requires confirmation that onboarding meeting occurred before allowing acceptance.

**Additional Criteria:**
- [ ] Service request acceptance screen shows permission preview before confirmation
- [ ] Assigned permissions are displayed to Family Council in confirmation screen after acceptance
- [ ] Audit log records automatic permission assignment with service request context
- [ ] Service Advisor receives notification email about service request acceptance (not separate access notification)
- [ ] System prevents accepting service request without completing onboarding meeting confirmation

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Figma: [Link to Figma - Service request acceptance flow and automatic permission assignment]
- See Epic SAAS-055 for overall permission management UX patterns

**UX Notes:**
- Service request acceptance screen should show preview: "Upon acceptance, [Advisor Name] will receive View+Modify (related) access to: [Section List]"
- Service Advisor receives clear notification explaining their assigned access scope
- Family Council sees confirmation after acceptance: "Service accepted. [Advisor Name] now has access to [Sections]"

**User Flow:**

**Path 1: Family Member initiates and accepts service request**
1. Family Member browses Service Advisor marketplace/catalog on platform
2. Selects specific Service Advisor offering (e.g., "Constitution Development Service")
3. Fills service request form:
   - Service description/subject of request (e.g., "Need help developing family constitution")
   - Any additional details required by service
4. Submits service request
5. System creates service request with source = "Constitution" (based on service category)
6. Service Advisor receives notification of new request
7. Service Advisor and Family conduct onboarding meeting, agree on terms
8. Family Council/Admin **accepts service request** in platform
9. **System automatically**:
   - Creates `family_advisor_association` record
   - Sets `advisor_type = "Service"` automatically
   - Assigns Permission Tier = "View+Modify (related)"
   - Maps sections based on request source: Constitution → Constitution, Education
   - Sends notification to Service Advisor: "Your service request for [Family Name] has been accepted"
10. Service Advisor can immediately log in and access assigned sections

**Path 2: Service Advisor first login after automatic assignment**
1. Service Advisor receives notification email: "Your service request for [Family Name] has been accepted"
2. Logs into Advisor Portal
3. Dashboard shows only assigned sections (Constitution, Education)
4. Can immediately start reviewing and working in assigned sections

---

## 🔒 Business Rules

**Validation Rules:**
1. **Service Request Context Required**: Service Advisor association can only be created from context of accepted service request
2. **Service Request Status**: Service request must have status = "Accepted" (family accepted terms, completed onboarding meeting)
3. **Permission Tier Fixed**: Service Advisors always receive "View+Modify (related)" tier - not Full Access, not View Only
4. **Section Mapping Immutable**: Sections assigned based on pre-defined mapping of request source → sections (cannot be overridden during creation)
5. **Advisor Type Automatic**: `advisor_type = "Service"` is set automatically by system based on service request context (not selected by user)

**Authorization:**
- **Who can initiate service requests**: Regular Family Members, Family Council Members, Admin
- **Who can accept service requests**: Family Council Members, Admin (representing family decision)
- **Service Advisor assignment**: Automatic upon service request acceptance (system-driven, not manual user action)
- **Who can view assigned permissions**: Admin, Consul, External Consul, the Service Advisor themselves

**Request Source → Section Mapping:**
| Request Source | Automatic Sections Assigned |
|----------------|----------------------------|
| Constitution | Constitution, Education |
| Assets | *(Not yet defined - future iteration)* |
| Conflict Resolution | Conflict Resolution, Education |
| Succession | Succession, Education |
| Philanthropy | Philanthropy, Education |
| Education | Education, Learning Paths |
| Meetings | Education, Family Council |

**Edge Cases:**
- **Multi-section service request**: If service request spans multiple sections (e.g., "Succession + Philanthropy planning"), assign union of all relevant sections
- **Service request without clear source**: System requires Family Member to select primary service category when creating request
- **Advisor already associated**: If same advisor email already has association with family (as different role), system prevents duplicate association and shows error
- **Service request cancelled after association**: Advisor permissions remain active; separate workflow handles advisor offboarding (Story 7)
- **Assets section requests**: Special handling required since mapping not yet configured - create association without auto-permissions, notify Admin for manual setup

---

## 🧪 Test Scenarios

**Happy Path:**
1. **Scenario**: Family Member requests Constitution service, system automatically assigns permissions
   - Family Member browses Service Advisor marketplace
   - Selects "Constitution Development Service" from available offerings
   - Fills request: "Subject: Need help creating family values document"
   - Submits service request
   - Service Advisor and Family conduct onboarding meeting
   - Family Council accepts service request in platform
   - System automatically creates advisor association with `advisor_type = "Service"`
   - System assigns View+Modify (related) permissions: Constitution, Education
   - Service Advisor receives notification: "Your service request for [Family Name] has been accepted"
   - Service Advisor logs in, sees only Constitution and Education sections
   - **Expected**: Advisor can view and edit content in Constitution, Education; cannot see other sections; permissions granted without separate notification

**Negative Tests:**
1. **Scenario**: Attempt to manually trigger Service Advisor creation without service request
   - Admin attempts to add Service Advisor directly (not through accepted service request flow)
   - **Expected**: System prevents this action; Service Advisors can only be added through service request acceptance workflow

2. **Scenario**: Attempt to accept service request before onboarding meeting
   - Family Member creates service request
   - Family Council attempts to accept immediately (before meeting with advisor)
   - **Expected**: Acceptance requires confirmation that onboarding meeting occurred

3. **Scenario**: Unauthorized user attempts to accept service request
   - Personal Family Advisor or Regular Family Member (not Council) attempts to accept service request
   - **Expected**: 403 Forbidden error, only Family Council or Admin can accept

4. **Scenario**: Service request from Assets section (mapping not configured)
   - Family Member requests service from Assets category
   - Family Council accepts service request
   - **Expected**: System displays message: "Assets section permissions not yet configured. Manual permission setup required." Advisor association created but without automatic permissions (requires admin intervention)

**Edge Cases:**
1. **Scenario**: Multi-section service request (e.g., service spans Succession + Philanthropy)
   - Family Member requests service that covers multiple categories
   - System tags request with multiple sources: Succession, Philanthropy
   - Family Council accepts service request
   - System assigns union of sections: Succession, Education, Philanthropy (Education appears once)
   - **Expected**: Advisor has access to all 3 unique sections with View+Modify (related)

2. **Scenario**: Same advisor already associated with family in different role
   - Service Advisor email already exists as Personal Advisor for same family
   - Family accepts new service request from this advisor
   - **Expected**: System prevents duplicate; displays message: "Advisor already associated as Personal Advisor. Contact support to modify role or use different advisor."

3. **Scenario**: Service request cancelled after advisor association created
   - Service request accepted, advisor association created automatically
   - Service is later cancelled/terminated
   - **Expected**: Advisor permissions remain active (no automatic revocation); separate offboarding workflow required (Story 7)

4. **Scenario**: Service request from Assets section (not yet configured)
   - Family Member requests service from Assets category
   - Family Council accepts service request
   - System cannot auto-assign permissions (no mapping configured)
   - **Expected**: Advisor association created with `advisor_type = "Service"` but no sections assigned; notification sent to Admin: "Manual permission setup required for Assets service request"

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by**: 
  - RLN1-XXX (Story 1) - Core advisor role model and `family_advisor_associations` table structure
  - [Service Request Epic] - Service request creation, acceptance workflow, marketplace functionality
- **Blocks**: 
  - RLN1-XXX (Story 6) - Modifying Service Advisor permissions (requires base auto-assignment working)
  - RLN1-XXX (Story 7) - Service Advisor offboarding (requires understanding of auto-assigned permissions)

---

## ⚠️ Non-Functional Requirements

**Performance:**
- Permission assignment calculation: < 100ms
- Service request acceptance processing (including advisor association): < 1 second
- Advisor Portal first page load after automatic assignment: < 2 seconds

**Security:**
- Service request acceptance must validate onboarding meeting confirmation server-side (not just UI checkbox)
- Automatic advisor association creation must validate service request status = "Accepted" 
- JWT tokens must include advisor_id and associated family_ids for authorization
- Audit log must record: service request ID, acceptance timestamp, auto-assigned permissions

**Accessibility:**
- Service request source clearly labeled and announced by screen readers in acceptance flow
- Permission preview in acceptance screen provides clear summary before confirmation
- Keyboard navigation supported throughout service request acceptance flow

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions

---

## 📝 Notes

**Implementation Notes:**
- Permission mappings (request source → sections) should be configurable via backend constants/config file for easy updates
- System must handle service request acceptance as trigger for automatic advisor association creation
- Consider notification system for Admin when Assets section request accepted (manual permission setup required)
- Audit trail should link service request ID to advisor association for traceability

**Future Enhancements (out of scope):**
- Allow families to preview and customize permission scope before accepting service request
- Support temporary time-limited permissions for project-based Service Advisors
- Enable Service Advisor to request additional section access (approval workflow)
- Automatic permission expansion based on service progress/phases

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-16
**Story Created:** 2025-10-16