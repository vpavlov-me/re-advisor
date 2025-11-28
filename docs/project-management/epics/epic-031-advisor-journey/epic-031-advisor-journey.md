# Epic: Personal Family Advisor - Module-Based Access Management

---

## 📋 Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** Personal Family Advisor - Module-Based Access Management  
**Summary:** Enable Personal Family Advisors to access only permitted governance modules (1-7) as configured by inviting family, with clear scope visibility and focused workspace  
**Parent Initiative:** FG-XXX [Advisor Portal Multi-Role Access Control]  
**Priority:** High  
**Epic Link:** FG-EPIC-XXX

---

## 🎯 Epic Goal

**What will this Epic deliver?**

This Epic delivers module-based access control for Personal Family Advisors, enabling them to:

- **Access only permitted modules** (1-7 out of 10) as configured by the inviting family
- **View clear scope indicators** showing which modules are available vs. restricted
- **Work efficiently** within permitted areas without confusion about access boundaries
- **Receive scope updates** when family expands or restricts module access

**Business Value:**
- Families maintain control over advisor access scope
- Advisors focus on their specialization areas (succession, philanthropy, education, etc.)
- Cost-effective solution for families needing specialist expertise, not full governance partner
- Clear boundaries prevent accidental access to sensitive areas

**User-facing value:**
- Personal FA sees only modules they're authorized to use
- Navigation sidebar shows only permitted sections
- Dashboard widgets filtered by module access
- Clear visual indicators for scope boundaries

**Scope boundaries:**
- **Included:** Advisor Portal module filtering, scope visibility, permission enforcement
- **NOT included:** Family invitation flow, module selection UI (Family Portal side), onboarding steps, advisor registration

---

## 👥 Target Users

**Primary Personas:** 
- Personal Family Advisor ([DOC-USR-004](personal-family-advisor-persona.md)) - Specialist invited by family with limited module scope

**Secondary Personas:**
- External Consul ([DOC-USR-005](external-consul-persona.md)) - May reference similar patterns for permission display
- Family Council Member ([DOC-USR-002](family-council-member-persona.md)) - Context for who configures access

---

## 📖 User Stories (High-Level)

1. **As a Personal Family Advisor**, **I want to** see only permitted modules in navigation and access family data only within those modules, **so that** I can work efficiently within my authorized scope while respecting family privacy

---

## 🧮 Business Rules

### Module Access Rules

**BR-PFA-001: Module Permission Enforcement**
- Personal FA access controlled by `family_advisor_associations.permitted_modules` (array of module IDs)
- Permitted modules: Between 1-7 modules (out of 10 total governance modules)
- Module access enforced at both UI (navigation) and API (endpoint access) levels
- Attempting to access non-permitted module returns 403 Forbidden

**BR-PFA-002: 10 Governance Modules**
Module list (as defined in SYSTEM_COMPONENTS_CATALOG.md):
1. Constitution
2. Family Council (Meetings)
3. Decision Making
4. Conflict Resolution
5. Education
6. Succession
7. Philanthropy
8. Assets
9. Tasks
10. Communication

**BR-PFA-003: Module Permissions Structure**
Each module permission includes:
- **Module ID**: Identifier for governance module
- **Access Level**: View-only or View+Modify (Personal FA typically gets View+Modify for permitted modules)
- **Granted Date**: When access was granted
- **Last Modified**: When permissions last changed

**BR-PFA-004: Navigation Filtering**
- Sidebar navigation shows ONLY permitted modules
- Restricted modules do not appear in navigation (no "locked" icons or disabled states)
- Dashboard widgets filtered to show only data from permitted modules
- Breadcrumbs and context indicators reflect permitted scope

### Permission Updates

**BR-PFA-005: Scope Expansion**
- Family can add modules to advisor's permitted list at any time
- New modules immediately accessible after update
- Advisor receives in-app notification of expanded access
- Navigation refreshes to show new modules

**BR-PFA-006: Scope Restriction**
- Family can remove modules from advisor's permitted list
- Removed modules immediately inaccessible
- If advisor is currently viewing restricted module, redirect to Overview with notice
- Navigation refreshes to hide removed modules

**BR-PFA-007: Minimum Module Requirement**
- Personal FA must have access to at least 1 module
- If family attempts to remove all modules, system suggests converting to different advisor type or ending engagement

### Data Access Rules

**BR-PFA-008: Module-Level Data Isolation**
- Personal FA sees data ONLY from permitted modules
- Dashboard metrics aggregate only permitted module data
- Search results filtered by permitted modules
- Task lists show only tasks from permitted modules

**BR-PFA-009: Cross-Module References**
- If data references restricted module (e.g., task mentions decision from Decision Making module), show limited info: "Related to Decision Making (restricted)"
- No drill-down to restricted module data

### Edge Cases

**BR-PFA-010: Mid-Session Permission Changes**
- If permissions change while advisor is logged in, show banner notification
- Force navigation refresh on next interaction
- Active API calls to now-restricted modules return 403 with clear message

**BR-PFA-011: Temporary Access Loss**
- If family_advisor_association becomes inactive, all module access revoked
- Advisor sees "Your engagement with [Family] has ended" message
- Historical data becomes read-only (separate story for access history)

---

## 🧪 Acceptance Criteria Summary

**Module Access Control:**
- âœ… Personal FA navigation shows only 1-7 permitted modules (never all 10)
- âœ… Attempting to access restricted module via URL returns 403 error
- âœ… Dashboard widgets display only data from permitted modules
- âœ… Family data queries filtered by module permissions at API level

**Scope Visibility:**
- âœ… Access scope indicator visible in advisor profile (e.g., "3 of 10 modules")
- âœ… Clear module list showing permitted vs. restricted in settings/profile
- âœ… No UI elements suggesting access to restricted modules

**Permission Updates:**
- âœ… Module additions reflect in UI within 5 seconds
- âœ… Module removals revoke access immediately
- âœ… Notifications sent for permission changes
- âœ… Graceful handling of mid-session permission changes

**Data Isolation:**
- âœ… Zero data leakage from restricted modules in search, dashboard, or API responses
- âœ… Cross-module references show limited info for restricted modules
- âœ… All queries include module permission validation

---

## 📗 Dependencies

**Upstream:**
- **Epic: FG-XXX - Advisor Invitation & Association Management**
  - `family_advisor_associations` table with `permitted_modules` column
  - Family Portal UI for module selection during invitation
  - Association activation/deactivation logic

- **Epic: FG-XXX - Advisor Portal Infrastructure**
  - Advisor Portal Service (port 8011) with association-based access
  - JWT authentication with advisor_id context
  - Frontend: Advisor Portal application (port 3002)

- **Epic: FG-XXX - Core Governance Modules** (All 10 services operational)
  - Constitution Service (8002)
  - Meeting Service (8003)
  - Decision-Making Service (8009)
  - Conflict Resolution Service (8015)
  - Education Service (8006)
  - Succession Service (8014)
  - Philanthropy Service (8008)
  - Asset Service (8005)
  - Task Service (8016)
  - Communication Service (8004)

**Downstream:**
- Epic: FG-XXX - Advisor Permission Analytics (track which modules most commonly granted)
- Epic: FG-XXX - Advisor Performance Metrics (per-module activity tracking)

---

## 📏 Design & UX

**Key UI Patterns:**

### Navigation Sidebar
```
Current: [All 10 modules always shown to External Consul]

New for Personal FA:
📊 Overview (always visible)
├─ 📜 Constitution ✓
├─ 🤝 Family Council ✓
├─ 🎓 Education ✓
└─ [Other 7 modules hidden if not permitted]

Scope Badge: "Access: 3 of 10 modules"
```

### Dashboard Overview
```
Widgets display only for permitted modules:
- âœ… "Recent Family Council Meetings" (if Meetings permitted)
- âœ… "Education Progress" (if Education permitted)
- ❌ "Pending Decisions" widget hidden (if Decision Making not permitted)
```

### Permission Profile Page
```
Your Access Scope
━━━━━━━━━━━━━━━━━━
Permitted Modules (3):
âœ… Constitution - View & Modify
âœ… Family Council - View & Modify
âœ… Education - View & Modify

Restricted Modules (7):
❌ Decision Making
❌ Conflict Resolution
❌ Succession
❌ Philanthropy
❌ Assets
❌ Tasks
❌ Communication

Last Updated: Oct 24, 2025
```

**Design Principles:**
- **Invisible Restrictions**: Don't show locked/disabled modules - only show what's accessible
- **Clear Scope Indicators**: Make it obvious what advisor can and cannot access
- **Graceful Degradation**: Handle permission changes without jarring UX
- **No False Affordances**: Never suggest actions advisor cannot perform

---

## 🔔 Notifications

| Trigger | Recipient | Format | Description |
|---------|-----------|--------|-------------|
| Family grants additional module access | Personal FA | In-App + Email | "Good news! [Family Name] has expanded your access. You can now access [Module Name]." |
| Family restricts module access | Personal FA | In-App + Email | "[Family Name] has updated your access scope. [Module Name] is no longer accessible." |
| Attempting to access restricted module | Personal FA | In-App Banner | "You don't have access to [Module Name]. Contact [Family Name] to request additional permissions." |

**Notification Frequency:**
- Permission changes: Immediate (real-time)
- Scope reminders: Never (advisor sees scope in profile, no nagging)

---

## 📊 Success Metrics

**Functionality Metrics:**
- 100% of Personal FA see only permitted modules in navigation
- 0 data leakage incidents from restricted modules
- < 1% user error rate accessing restricted modules (accidental URL manipulation)
- Permission updates reflect in UI within 5 seconds

**User Experience Metrics:**
- < 10% of Personal FA request permission clarification support tickets (indicates clear UX)
- 90%+ of Personal FA understand their scope after first login
- < 5 seconds for navigation to update after permission change

**Business Metrics:**
- Families confidently grant limited access to specialists (adoption rate of Personal FA vs. External Consul)
- Personal FA invitation acceptance rate > 80% (clear scope boundaries increase trust)

---

## 🎭 Segment Applicability

**High Value:**
- **Single Family Offices**: Frequently engage specialists for specific governance areas (succession, philanthropy, education)
- **Large Families (30+ members)**: Complex needs requiring multiple specialized advisors with controlled access

**Medium Value:**
- **Multi-Family Offices**: Some families prefer generalist External Consuls, others want specialists
- **Small Families (< 10 members)**: May prefer External Consul for comprehensive support, but budget-conscious families benefit from lower-cost specialist option

---

## ⚠️ Risks & Mitigation

### Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Permission Confusion**: Personal FA unclear about scope boundaries | Medium - Support burden, user frustration | Clear scope indicators in profile, onboarding tooltips, "Why can't I access this?" help text |
| **Data Leakage**: Restricted module data exposed via search, dashboard, or API | High - Privacy violation, trust loss | Comprehensive query filtering, security audit, automated tests for all endpoints |
| **Performance**: Module permission checks on every request slow down system | Medium - Poor UX | Cache permissions in JWT claims, minimize database lookups, optimize query patterns |
| **Mid-Session Permission Changes**: Advisor confused when navigation suddenly changes | Medium - User frustration | Banner notifications, graceful redirects, clear messaging about what changed |
| **Edge Case Handling**: Complex scenarios (e.g., advisor viewing restricted data when permission removed mid-view) | High - Data exposure | Real-time permission validation on all data requests, force logout on major permission changes |

---

## 📝 Notes

**Key Decisions:**
- **Invisible Restrictions**: Don't show "locked" modules - only show accessible modules (cleaner UX, less frustration)
- **No Self-Service Access Requests**: Personal FA cannot request additional modules via UI (must coordinate with family directly) - keeps permission control with family
- **Immediate Permission Updates**: No grace period when permissions restricted (security priority)
- **Minimum 1 Module**: Personal FA must have at least 1 module, otherwise engagement should end

**Out of Scope:**
- Family Portal UI for module selection (separate Epic)
- Advisor onboarding/registration (separate Epic)
- Historical access tracking (separate Epic for compliance/audit)
- Request additional modules workflow (may add in future iteration)

**Assumptions:**
- `family_advisor_associations.permitted_modules` column already exists (JSONB array of module IDs)
- Advisor Portal Frontend can dynamically render navigation based on permissions
- All module services support permission-based filtering at API level
- JWT tokens can include module permissions in claims for fast validation

**Open Questions (Resolved):**
- âœ… **Q: Show restricted modules as "locked" or hide completely?**  
  **A:** Hide completely - cleaner UX, less confusion
  
- âœ… **Q: Can Personal FA request additional module access via UI?**  
  **A:** Not in MVP - must coordinate with family directly
  
- âœ… **Q: Grace period when family restricts access?**  
  **A:** No grace period - immediate revocation for security
  
- âœ… **Q: What if family removes all modules?**  
  **A:** System prevents - must keep at least 1 module or end engagement

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-24  
**Epic Created By:** Product Team  
**Next Steps:**
1. Stakeholder review and approval
2. Backend team review: module permission filtering implementation
3. Frontend team review: dynamic navigation rendering
4. Security audit: data isolation verification
5. Break down into detailed User Stories during Grooming
6. Estimate story points and assign to sprints
