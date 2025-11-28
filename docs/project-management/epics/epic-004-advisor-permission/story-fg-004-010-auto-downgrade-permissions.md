---
story_id: "STORY-FG-004-010"
title: "Automatically Downgrade Service Advisor Permissions"
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
labels: ["advisor", "permissions", "service-advisor", "automation", "lifecycle", "downgrade"]
dependencies: ["STORY-FG-004-005"]
---

# User Story FG-EPIC-XXX-10

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As a System, I want to automatically downgrade Service Advisor permissions to view-only when service completes  
**Epic Link:** FG-EPIC-XXX [Advisor Portal User Roles and Access]  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** System,  
**I want to** automatically downgrade Service Advisor permissions to view-only (tier 3) when their service engagement completes,  
**so that** they maintain historical access to project materials without ability to create or modify content after contract end.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point being solved:**
- Prevents unauthorized modifications by Service Advisors after their engagement ends
- Eliminates manual permission management burden from Family Council/Admins
- Protects data integrity while preserving audit trail and historical access

**Business outcome expected:**
- Automated permissions lifecycle management aligned with service engagement status
- Reduced security risks from inactive advisors retaining full access
- Clear permission boundaries tied to contract completion
- Maintains compliance with principle of least privilege

**Strategic alignment:**
- Supports secure multi-advisor collaboration model
- Enables families to work with temporary/project-based advisors safely
- Aligns with tier-based permission architecture (View Only tier 3)

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** a Service Advisor has Full Access (tier 1) or Limited (tier 2) permissions and their service engagement is marked as "completed",  
   **When** the system processes the service completion event,  
   **Then** the Service Advisor's tier_level is automatically changed to 3 (View Only) in family_advisor_associations.

2. **Given** a service engagement has multiple Service Advisors assigned,  
   **When** the service is marked as completed,  
   **Then** ALL associated Service Advisors are downgraded to tier 3 simultaneously.

3. **Given** a Service Advisor has been downgraded to View Only,  
   **When** the advisor attempts to create, edit, or delete any family content,  
   **Then** the system prevents the action and displays appropriate authorization error.

4. **Given** a Service Advisor has been downgraded to View Only,  
   **When** the advisor accesses historical project materials (documents, communications, decisions),  
   **Then** the advisor can view all content they previously had access to.

5. **Given** a Service Advisor's permissions have been downgraded,  
   **When** the downgrade occurs,  
   **Then** the system sends notifications to:
   - The affected Service Advisor (explaining permission change and reason)
   - Family Council members (notification of automatic downgrade with advisor name and service details)

6. **Given** a Service Advisor has been downgraded and the service is later reopened,  
   **When** Admin or Consul manually restores permissions,  
   **Then** the Service Advisor can have tier 1 or tier 2 access restored through normal permission management.

**Additional Criteria:**
- [ ] System logs all permission downgrades with timestamp, service_id, advisor_id, and reason
- [ ] Downgrade ONLY affects Service Advisors (role_type = 'service'), NOT Personal Advisors, Consuls, or Admins
- [ ] Service Advisor remains in family_advisor_associations (is_active = true) with updated tier_level
- [ ] Downgrade is idempotent (running multiple times doesn't cause errors)
- [ ] No downgrade occurs if service status changes to paused, on-hold, or draft (only "completed" status)

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- No UI changes required for this story (system automation)
- Notification templates needed:
  - Service Advisor notification: "Your access to [Family Name] has been changed to View Only following completion of [Service Name]"
  - Family Council notification: "[Advisor Name]'s access has been automatically changed to View Only following completion of [Service Name]"

**User Flow:**
1. Admin or Consul marks service engagement as "completed" in system
2. System triggers automatic permission downgrade process
3. System updates tier_level to 3 for all Service Advisors on that engagement
4. System sends notifications to affected advisors and Family Council
5. System logs the permission change
6. Service Advisor receives notification and sees updated access level in Advisor Portal
7. Service Advisor can view historical materials but cannot create/edit content

---

## 🔒 Business Rules

**Validation Rules:**
1. **Service Completion Trigger**: Downgrade ONLY when service engagement status = "completed" (not paused, draft, on-hold)
2. **Advisor Type Filter**: Apply downgrade ONLY to advisors with role_type = 'service' on the completed engagement
3. **Tier Level Change**: Always downgrade to tier_level = 3 (View Only), regardless of previous tier
4. **Association Persistence**: Advisor remains in family_advisor_associations (is_active = true), only tier_level changes
5. **Scope Limitation**: Downgrade affects ONLY the specific family associated with the completed service

**Authorization:**
- **Who triggers the downgrade:** System automatically (no manual user action required for downgrade itself)
- **Who can restore permissions:** Admin, Consul (Family Portal), External Consul (via tier reassignment in permission management)
- **Who receives notifications:** Affected Service Advisor, all Family Council members of the family

**Edge Cases:**
- **Service Advisor works on multiple services for same family**: Downgrade ONLY if ALL their active services are completed; if any service remains active, retain highest tier level
- **Service reopened after completion**: Permissions remain View Only until manually restored by authorized role
- **Service Advisor is also Personal Advisor**: Personal Advisor permissions unchanged; Service Advisor role-specific permissions downgraded
- **Multiple Service Advisors on same engagement**: All downgraded simultaneously, no partial downgrades
- **Service completion during active advisor session**: Permission change takes effect immediately; advisor sees authorization errors on next action requiring elevated permissions

**See also:** Business rules documented in Epic FG-EPIC-XXX sections on permission tiers and service engagement lifecycle

---

## 🧪 Test Scenarios

**Happy Path:**
1. Create Service Advisor with tier 1 (Full Access) associated with active service engagement
2. Mark service engagement as "completed"
3. Verify Service Advisor's tier_level changed to 3 in family_advisor_associations
4. Verify Service Advisor receives notification about permission change
5. Verify Family Council receives notification about automatic downgrade
6. Verify Service Advisor can view historical project documents
7. Verify Service Advisor CANNOT create new announcement or edit existing task
8. Verify permission change logged with timestamp and reason

**Negative Tests:**
1. **Service status = "paused"**: Verify NO downgrade occurs, advisor retains original permissions
2. **Service status = "on-hold"**: Verify NO downgrade occurs
3. **Advisor role_type = "personal"**: Verify NO downgrade occurs when service completes
4. **Advisor role_type = "consul"**: Verify NO downgrade occurs when service completes
5. **Unauthorized restoration attempt**: Service Advisor attempts to restore own permissions — verify system prevents action

**Edge Cases:**
1. **Multiple services scenario**: Service Advisor has 2 active services for same family; complete 1 service → verify advisor retains higher tier; complete 2nd service → verify downgrade to tier 3
2. **Service reopened**: Complete service (advisor downgraded), reopen service → verify advisor remains tier 3 until manual restoration
3. **Concurrent completion**: Two services with same Service Advisor completed simultaneously → verify single downgrade, no duplicate processing
4. **Already tier 3**: Service Advisor already has tier 3 → complete service → verify idempotent operation (no errors, remains tier 3)
5. **Mid-session downgrade**: Service Advisor logged in and active → service completed by Admin → verify advisor sees authorization error on next elevated action without requiring re-login

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** 
  - FG-EPIC-XXX-1 (Story 1: Permission tier system implementation)
  - FG-EPIC-XXX-2 (Story 2: Service Advisor role creation)
  - FG-EPIC-XXX-5 (Story 5: Service engagement tracking system)
- **Blocks:** 
  - FG-EPIC-XXX-11 (Story 11: Permission restoration workflow) - depends on automatic downgrade being functional

**External Dependencies:**
- Notification service operational for sending downgrade alerts
- Service engagement status management system in place
- Audit logging system available for permission changes

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Permission downgrade processing: < 2 seconds for single advisor
- Batch downgrade (multiple advisors): < 5 seconds for up to 10 advisors
- No impact on service completion workflow performance

**Security:**
- Permission changes logged in audit trail with full context (who, what, when, why)
- Downgrade operations cannot be bypassed or circumvented
- Permission enforcement immediate (no grace period after downgrade)

**Reliability:**
- Downgrade operation must be atomic (all or nothing for single advisor)
- System recovers gracefully from notification delivery failures (permission change still applied)
- Idempotent operation (safe to retry without side effects)

**Accessibility:**
- Notification messages clear and accessible (plain language, screen reader compatible)

**Browser Support:**
- Not applicable (backend automation)

---

## 📝 Notes

**Open Questions:**
- [x] **Q: Should downgrade occur immediately or with delay/grace period?**  
  **A:** Immediate downgrade upon service completion (from epic discussion)

- [x] **Q: What if Service Advisor has multiple roles (e.g., also Personal Advisor)?**  
  **A:** Only Service Advisor role permissions downgraded; Personal Advisor permissions unchanged (from epic discussion)

- [x] **Q: Can Service Advisor see notification history after downgrade?**  
  **A:** Yes, View Only (tier 3) includes access to notifications and historical communications (from epic discussion)

- [x] **Q: Who can restore permissions after automatic downgrade?**  
  **A:** Admin, Consul (Family Portal), or External Consul through standard permission management (from epic discussion)

- [x] **Q: What happens if service is accidentally marked complete?**  
  **A:** Admin/Consul can reopen service and manually restore permissions through permission management (from epic discussion)

- [x] **Q: Should system prevent service completion if it would leave family with no active advisors?**  
  **A:** No, system allows completion regardless; family can have zero active external advisors (from epic discussion)

**Implementation Notes:**
- Consider using event-driven architecture for permission downgrade trigger (service completion event → permission update)
- Ensure notification templates are translatable for international families
- Audit log should include service_id for traceability

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-17  
**Story ID:** FG-EPIC-XXX-10