# User Story - Personal Family Advisor Module-Scoped Navigation & Data Access

---

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Personal Family Advisor, I want to see only permitted modules in navigation and access family data only within those modules
**Epic Link:** FG-XXX [Family Advisor Portal Access Management]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Personal Family Advisor,
**I want to** see only permitted modules in Advisor Portal navigation and access family data exclusively within those modules,
**so that** I can work efficiently within my authorized scope while respecting family privacy and data boundaries.

---

## 🎯 Business Context

**Why is this Story important?**

**User Pain Points Being Solved:**
- **Information overload:** Advisor sees irrelevant sections they cannot access, creating confusion
- **Unclear boundaries:** Advisor uncertain about scope of work and where they can contribute
- **Wasted time:** Attempting to access blocked areas, receiving errors, navigating disabled UI
- **Privacy concerns:** Risk of accidentally attempting to access sensitive family data outside scope
- **Professionalism:** Disabled/grayed-out modules create impression of restricted access rather than focused expertise

**Business Outcomes Expected:**
- **Improved advisor efficiency:** Faster navigation, immediate focus on relevant work areas
- **Enhanced user experience:** Clean interface showing only actionable modules
- **Data security:** Technical enforcement of module-level permissions at API layer
- **Trust building:** Family confidence that advisor respects data boundaries
- **Reduced support burden:** Fewer questions about "why can't I access X?"

**Strategic Alignment:**
- Supports Personal Family Advisor persona (DOC-USR-004) as specialist with focused scope
- Differentiates from External Consul (full access) and establishes clear permission tiers
- Enables families to control data visibility granularly by governance area
- Foundation for permission management features (admin UI to modify advisor access)

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** Personal Family Advisor with access to Succession, Education, and Philanthropy modules,
   **When** advisor logs into Advisor Portal,
   **Then** sidebar navigation shows ONLY those 3 modules (not all 10 governance modules).

2. **Given** Personal Family Advisor viewing permitted module (e.g., Succession),
   **When** advisor requests family data within that module (succession plans, assessments),
   **Then** system returns data successfully with family_id filtering applied.

3. **Given** Personal Family Advisor attempts direct API call to non-permitted module,
   **When** request is sent (e.g., GET /api/meetings for advisor without Meetings access),
   **Then** system returns 403 Forbidden with message "You do not have access to this module".

4. **Given** Personal Family Advisor with no access to Conflicts module,
   **When** advisor navigates Advisor Portal,
   **Then** Conflicts module does NOT appear in sidebar navigation at all (not disabled, not hidden with visual indication, simply absent).

5. **Given** Personal Family Advisor working in permitted module,
   **When** advisor creates/edits content (e.g., adds succession plan recommendation),
   **Then** system validates advisor has write permissions for that module before saving.

6. **Given** Personal Family Advisor attempts to access module via direct URL (e.g., manually typing /advisor/conflicts),
   **When** URL is loaded,
   **Then** system redirects to 403 error page or advisor dashboard with error message.

**Additional Criteria:**
- [ ] Sidebar renders only modules where `advisor_permissions.access_level IN ('view', 'modify', 'full')`
- [ ] Module order in sidebar matches standard governance module sequence
- [ ] Each API endpoint validates advisor's module permissions before processing request
- [ ] Permission checks execute on every request (no client-side caching of permissions)
- [ ] Advisor sees clear "Your Access" indicator showing which modules they can use
- [ ] System logs all permission-based access denials for audit purposes

---

## 🔒 Business Rules

**Authorization:**
- **Who can perform this action:** Personal Family Advisor with valid advisor_permissions record for family
- **Who can view results:** Only the logged-in Personal Family Advisor sees their own permitted modules

**Validation Rules:**
1. **Module visibility logic:**
   - Query `advisor_permissions` table for `user_id` + `family_id`
   - Include module if `access_level != 'none'` OR `access_level IS NOT NULL`
   - Module list: Constitution, Meetings, Communication, Assets, Education, Philanthropy, Decision-Making, Succession, Conflicts, Tasks

2. **API access validation:**
   - Every protected endpoint checks: `SELECT access_level FROM advisor_permissions WHERE user_id=? AND family_id=? AND module=?`
   - If `access_level = 'none'` OR record doesn't exist → 403 Forbidden
   - If `access_level = 'view'` and request is write operation → 403 Forbidden "View-only access"
   - If `access_level IN ('modify', 'full')` → allow read and write

3. **Family data isolation:**
   - All queries include `WHERE family_id = current_user.family_id` (from JWT)
   - Advisor can NEVER access data from families they're not associated with
   - Multi-family advisors (future) require separate permission records per family

**Edge Cases:**

1. **Advisor permission removed mid-session:**
   - Advisor working in Succession module
   - Family Admin removes Succession access
   - Next API request returns 403
   - Frontend detects 403, refreshes sidebar, removes Succession
   - Advisor sees notification: "Your access to Succession was removed"

2. **Advisor has permissions but module has no data:**
   - Advisor has access to Philanthropy
   - Family has not created any philanthropy records yet
   - Sidebar shows Philanthropy module
   - Module page displays "No philanthropy activities yet" empty state

3. **Advisor permission upgraded mid-session:**
   - Advisor has 'view' on Assets
   - Family Admin upgrades to 'modify'
   - Advisor must refresh page to see write capabilities
   - System notification: "Your permissions have been updated. Refresh to see changes."

4. **All permissions revoked:**
   - Family removes all module access
   - Advisor logged out on next API call (403 on any request)
   - Login attempt shows: "You no longer have access to this family. Contact family admin."

5. **Direct URL navigation to blocked module:**
   - Advisor types `/advisor/family/123/conflicts` in browser
   - System checks permissions, finds no access
   - Redirects to `/advisor/family/123/dashboard` with toast error message

6. **API endpoint with cross-module dependencies:**
   - Advisor has Succession access but not Tasks
   - Succession plan references tasks from Tasks module
   - Task IDs returned but task details show "No access" (graceful degradation)
   - Advisor cannot click through to task details

---

## 📐 Design & UX

**User Flow:**

1. **Advisor Login:**
   - Advisor enters credentials
   - System authenticates, generates JWT with family_id
   - Backend queries `advisor_permissions` for advisor's modules
   - Frontend receives module list in login response

2. **Sidebar Rendering:**
   - Frontend receives permitted modules: ['succession', 'education', 'philanthropy']
   - Sidebar renders:
     ```
     Advisor Portal
     ├─ Dashboard (always visible)
     ├─ Family Overview (if has any module access)
     ├─ Succession ✓
     ├─ Education ✓
     └─ Philanthropy ✓
     
     [Conflicts, Meetings, Tasks, etc. NOT shown]
     ```
   - Active module highlighted
   - Smooth transitions between permitted modules

3. **Module Navigation:**
   - Advisor clicks "Succession" in sidebar
   - URL changes to `/advisor/family/123/succession`
   - Frontend loads Succession component
   - Component fetches data: `GET /api/succession?family_id=123`
   - Backend validates: advisor has succession access for family 123
   - Data returned and rendered

4. **Blocked Access Attempt:**
   - Advisor somehow navigates to `/advisor/family/123/conflicts`
   - Frontend checks local permissions cache: conflicts not in list
   - Immediate redirect to dashboard
   - Toast notification: "You don't have access to Conflicts"

5. **Permission Change Notification:**
   - Family Admin modifies advisor permissions
   - System pushes notification to advisor session
   - Advisor sees modal: "Your access has changed. Refresh to continue."
   - On refresh, sidebar updates with new module list

**Key UI Elements:**
- **Sidebar:** Clean, showing only accessible modules
- **Module badges:** No "Full Access" badges for Personal FA (unlike External Consul)
- **Access indicator:** Small "Your Access" section showing count "3 of 10 modules"
- **Empty states:** When module has no data yet
- **Error states:** Clean 403 messages without technical jargon

---

## 🧪 Test Scenarios

**Happy Path:**

1. **Personal FA with 3-module access navigates successfully:**
   - Preconditions: Advisor has access to Succession, Education, Philanthropy
   - Steps:
     1. Advisor logs in
     2. Sees sidebar with 3 modules only
     3. Clicks Succession → data loads
     4. Clicks Education → data loads
     5. Clicks Philanthropy → data loads
   - Expected: All modules work, data displays correctly, no errors

2. **Personal FA creates content in permitted module:**
   - Preconditions: Advisor has 'modify' access to Succession
   - Steps:
     1. Navigate to Succession module
     2. Click "Add Succession Plan"
     3. Fill form, submit
     4. API validates permissions
     5. Record saved with advisor attribution
   - Expected: Content created successfully, appears in family's succession list

**Negative Tests:**

1. **Direct API call to non-permitted module:**
   - Preconditions: Advisor has no access to Meetings
   - Steps:
     1. Advisor makes API request: `GET /api/meetings?family_id=123`
     2. Backend checks permissions
     3. No meetings permission found
   - Expected: 403 Forbidden, error message "You do not have access to Meetings module"

2. **URL manipulation to blocked module:**
   - Preconditions: Advisor logged in, no access to Conflicts
   - Steps:
     1. Advisor manually types `/advisor/family/123/conflicts`
     2. Frontend checks permissions
     3. Module not in permitted list
   - Expected: Redirect to dashboard, toast error "Access denied"

3. **Write operation with view-only permission:**
   - Preconditions: Advisor has 'view' access to Assets
   - Steps:
     1. Advisor views asset data (successful)
     2. Attempts to edit asset: `PUT /api/assets/456`
     3. Backend checks permission level
   - Expected: 403 Forbidden "You have view-only access to Assets"

**Edge Cases:**

1. **Permission removed mid-session:**
   - Preconditions: Advisor working in Succession
   - Steps:
     1. Advisor has page open
     2. Family Admin removes Succession access
     3. Advisor clicks "Save" on succession plan
   - Expected: 403 error, modal "Your access was removed. Redirecting to dashboard."

2. **No permissions at all:**
   - Preconditions: Advisor invited but all permissions removed
   - Steps:
     1. Advisor attempts login
     2. System authenticates user
     3. Queries permissions → empty result
   - Expected: Login blocked OR redirect to "No access" page

3. **Concurrent permission change during data load:**
   - Preconditions: Advisor loading Succession data
   - Steps:
     1. API request in flight
     2. Admin removes Succession access
     3. API response returns
   - Expected: Data displays (request succeeded before removal), next request fails

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Permission check overhead: < 50ms per API request
- Sidebar render with permission filtering: < 200ms
- Permission cache TTL: 5 minutes (refresh on explicit action)

**Security:**
- Authorization check on EVERY API endpoint (no trust in frontend)
- Permission data never cached client-side beyond session
- JWT token includes family_id for additional validation layer
- All 403 errors logged with user_id, family_id, attempted module

**Accessibility:**
- Sidebar navigation keyboard-accessible
- Screen reader announces current module
- Error messages clear and actionable ("Contact family admin to request access")

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Edge: Latest 2 versions

---

## 📝 Notes

**Context from Epic Discussion:**

**Q: How are permissions stored?**
A: `advisor_permissions` table with columns: `advisor_id`, `family_id`, `module`, `access_level` ('none', 'view', 'modify', 'full')

**Q: What if advisor has no modules?**
A: Treated as "no access" - cannot log into family's Advisor Portal, sees message to contact family

**Q: Can advisor request additional access?**
A: Not in this story - separate story for "Request Access" feature where advisor can submit request to Family Admin/Consul

**Q: How does this differ from External Consul?**
A: External Consul sees ALL 10 modules with "Full Access" badges. Personal FA sees ONLY permitted modules (1-7), no badges needed.

**Q: What about Service Advisors?**
A: Service Advisors follow same pattern but permissions are time-bound (service_start_date to service_end_date). Handled in Service Marketplace Epic.

**Q: Performance concern with permission checks?**
A: Permission checks indexed on (advisor_id, family_id, module). Query optimized to < 50ms. Consider caching for 5min in production if needed.

**Q: Should disabled modules show in sidebar?**
A: No - clean UI principle. If no access, module completely absent from navigation. Reduces UI clutter and advisor confusion.

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-24