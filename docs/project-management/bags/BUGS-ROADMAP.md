---
title: "Bug Fixes Roadmap - Knowledge Center & Advisor Portal"
category: "planning"
audience: "developer|qa|product-manager|tech-lead"
created: "2025-11-21"
updated: "2025-11-27"
version: "1.4.0"
status: "active"
tags: ["roadmap", "bugs", "planning", "prioritization"]
owner: "product-team"
---

# Bug Fixes Roadmap - Prioritized Execution Plan

> **Last Updated:** 2025-11-27
> **Total Active Bugs:** 11
> **Total Fixed Bugs:** 8 (moved to `/fixed/` folder)
> **Critical:** 0 | **Major:** 3 | **Minor:** 8

---

## 📊 Executive Summary

This roadmap provides a prioritized execution plan for all active bugs across Knowledge Center (EPIC-008, EPIC-009), Advisor Portal (EPIC-003), and Family-Advisor Relationship (EPIC-013). Bugs are organized into phases based on:
- **Priority:** Critical → High → Medium → Low
- **Severity:** Blocker → Critical → Major → Minor → Trivial
- **Impact:** User-facing functionality, data integrity, UX quality
- **Effort:** Quick wins vs complex fixes
- **Dependencies:** Backend + Frontend coordination

**Recent Progress:** **8 bugs fixed** and moved to `/fixed/` folder:
- ✅ Learning Path error on first load (Critical)
- ✅ Article content field non-functional (High/Major)
- ✅ Guide content field missing (High/Major)
- ✅ Checklist creation 500 error (High/Major)
- ✅ Featured resource status resets (High/Major)
- ✅ Knowledge Base folder not visible (High/Major)
- ✅ Advisor profile icon not displayed (Low/Major)
- ✅ Checklist delete icon low visibility (Medium/Minor)

---

## 🎯 Prioritization Framework

### Priority Definitions

| Priority | Severity | Timeline | Criteria |
|----------|----------|----------|----------|
| **P0** | Critical/Major | Within 24-48 hours | Core functionality broken, affects all users |
| **P1** | Major/Minor | Within 1 week | Important feature broken, affects many users |
| **P2** | Minor | Within 2-3 weeks | UX issues, affects some users, has workaround |
| **P3** | Minor | Within 4-6 weeks | Polish, edge cases, low-impact cosmetic issues |

### Quick Wins Strategy

**Quick Wins** = High visibility + Low effort + Low risk
These should be prioritized within each phase to show rapid progress.

---

## 🔴 Phase 1: HIGH PRIORITY - Major Functionality (Week 1)

**Goal:** Fix features causing significant user friction

### P1-1: Family Does Not See Accepted FA in External Advisors
- **File:** `bug-family-does-not-see-accepted-fa-in-external-advisors.md`
- **Priority:** High | **Severity:** Major
- **Impact:** 🔴 Family cannot verify advisor has access, cannot manage permissions
- **Assignee:** a.strizhnev@reluna.com
- **Epic:** EPIC-013
- **Issues:**
  1. FA accepts invitation, but doesn't appear in Family's External Advisors list
  2. One-way relationship only (FA sees family, family doesn't see FA)
  3. Family cannot manage advisor permissions
  4. Breaks core advisor collaboration feature
- **Estimated Effort:** 8-13 hours (1-2 dev days)
- **Root Causes to Investigate:**
  - Backend not creating bidirectional relationship
  - API not returning advisors to family
  - Frontend field mapping issue
  - Database relationship schema issue
- **Action Items:**
  - [ ] Check database: Does relationship exist with correct status?
  - [ ] Check API: Does `/api/family/{id}/advisors` return accepted advisors?
  - [ ] Check invitation acceptance: Is relationship created correctly?
  - [ ] Check frontend: Does it display API data correctly?
- **Success Criteria:**
  - FA appears in Family's External Advisors list after accepting invitation
  - Advisor information displays correctly (name, email, firm, date)
  - Bidirectional relationship works (both sides see each other)
  - Family can manage advisor permissions

### P1-2: FA Sees "Unknown Family" Instead of Family Name ⚡ QUICK WIN
- **File:** `bug-fa-sees-unknown-family-instead-of-name.md`
- **Priority:** High | **Severity:** Minor
- **Impact:** FA cannot identify families, confusion with multiple families
- **Assignee:** a.strizhnev@reluna.com
- **Epic:** EPIC-003
- **Issue:** After FA accepts invitation, family displays as "Unknown Family" instead of actual name
- **Estimated Effort:** 5-9 hours (<1 dev day)
- **Root Causes to Investigate:**
  - Frontend using wrong field name (`family.familyName` vs `family.name`)
  - API not returning family name in response
  - Database family name not set
- **Quick Fix Potential:** ⚡⚡ HIGH - Likely one-line field mapping fix
- **Solution (if frontend):**
  ```typescript
  // Change from:
  <h3>{family.familyName || "Unknown Family"}</h3>
  // To:
  <h3>{family.name || family.display_name || `Family ${family.id.substring(0, 8)}`}</h3>
  ```
- **Success Criteria:**
  - Family displays with correct name (not "Unknown Family")
  - Name matches family's self-designated name
  - Works for multiple families with unique names

### P1-3: Verification Link Does Not Clear Session 🆕
- **File:** `bug-verification-link-does-not-clear-session.md`
- **Priority:** Medium | **Severity:** Major
- **Impact:** Users see verification error if already logged in, breaks email verification flow
- **Assignee:** TBD
- **Epic:** EPIC-003
- **Issue:** Clicking email verification link while already logged in results in error
- **Estimated Effort:** 4-6 hours
- **Root Cause:** Backend does not clear existing session before verifying email
- **Quick Fix Potential:** ⚡ Moderate - session management fix
- **Success Criteria:**
  - Verification link works regardless of current session state
  - Session cleared/refreshed before verification
  - User redirected to appropriate page after verification

### P1-4: Learning Path Create Resource Form Broken 🆕
- **File:** `bug-learning-path-create-resource-form-broken.md`
- **Priority:** High | **Severity:** Major
- **Impact:** Cannot create resources within Learning Path modules - content creation blocked
- **Assignee:** TBD
- **Epic:** EPIC-008
- **Issue:** "Create New Resource" form in Learning Path broken, cannot add resources to modules
- **Estimated Effort:** 6-10 hours
- **Root Cause:** Form component not rendering or API endpoint broken
- **Quick Fix Potential:** ⚡ Moderate - form initialization issue
- **Success Criteria:**
  - "Create New Resource" button opens working form
  - Form allows creating all resource types
  - Resources successfully added to Learning Path modules

**Phase 1 Summary:**
- **Total Bugs:** 4
- **Estimated Total Effort:** 23-37 hours (3-4.5 dev days)
- **Recommended Timeline:** Complete within Week 1-2
- **Quick Wins:** Unknown Family fix (5-9 hrs)

---

## 🟡 Phase 2: MEDIUM PRIORITY - UX Improvements (Week 2-3)

**Goal:** Fix user experience issues and polish

### P2-1: Learning Path Duplicate Creates Empty Copy 🆕
- **File:** `bug-learning-path-duplicate-creates-empty-copy.md`
- **Priority:** Medium | **Severity:** Major
- **Impact:** Duplicate feature non-functional - all modules lost when duplicating
- **Assignee:** itkachev-reluna
- **Epic:** EPIC-009 Learning path
- **Issue:** "Duplicate" button creates copy of Learning Path but without any modules
- **Estimated Effort:** 3-5 hours
- **Root Cause:** Backend duplication logic only copies parent entity, not child modules
- **Quick Fix Potential:** ⚡ Moderate - requires backend deep copy implementation
- **Solution:** Implement deep copy logic to duplicate modules and module-resource relationships
- **Success Criteria:**
  - Duplicated Learning Path includes all modules from original
  - Module order preserved
  - Module content preserved (title, description, resources)
  - Original Learning Path unchanged

### P2-2: Guide Description Text Overflow ⚡ QUICK WIN
- **File:** `bug-guide-description-text-overflow.md`
- **Priority:** Medium | **Severity:** Minor
- **Impact:** Text extends beyond container, looks unprofessional
- **Assignee:** Frontend: a.manchenkova@reluna.com
- **Estimated Effort:** 1-2 hours
- **Root Cause:** Missing CSS word-wrap properties
- **Quick Fix Potential:** ⚡⚡⚡ YES - pure CSS fix
- **Solution:**
  ```css
  .description-field {
    word-wrap: break-word;
    overflow-wrap: break-word;
    overflow-x: hidden;
  }
  ```

**Phase 2 Summary:**
- **Total Bugs:** 2 (1 new: Learning Path duplicate)
- **Estimated Total Effort:** 4-7 hours (0.5-1 dev days)
- **Recommended Timeline:** Complete within Week 2-3
- **Quick Wins:** Text overflow (1-2 hrs)

---

## 🟢 Phase 3: LOW PRIORITY - Polish & Consistency (Week 4-6)

**Goal:** Improve consistency, fix cosmetic issues

### P3-1: Learning Path Type Displays with Underscore ⚡ QUICK WIN
- **File:** `bug-learning-path-displays-with-underscore.md`
- **Priority:** Low | **Severity:** Minor
- **Impact:** "Learning_path" instead of "Learning Path" - technical format exposed
- **Assignees:**
  - Frontend: a.manchenkova@reluna.com
  - Backend: i.tkachev@reluna.com
- **Estimated Effort:** 1-2 hours
- **Root Cause:** Frontend not formatting snake_case to display format
- **Quick Fix Potential:** ⚡⚡⚡ YES - string formatting utility
- **Solution:**
  ```typescript
  const displayType = type.replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  ```

### P3-2: Constitution Template Displays as "Template" ⚡ QUICK WIN
- **File:** `bug-constitution-template-displays-as-template.md`
- **Priority:** Low | **Severity:** Minor
- **Impact:** "Constitution template" shows as generic "Template"
- **Assignees:**
  - Frontend: a.manchenkova@reluna.com
  - Backend: i.tkachev@reluna.com
- **Estimated Effort:** 1-3 hours
- **Root Cause:** Type label truncation or incorrect mapping
- **Quick Fix Potential:** ⚡⚡ Yes - type label mapping fix

### P3-3: Non-existent "Links" Resource Type in Filter ⚡ QUICK WIN
- **File:** `bug-links-resource-type-does-not-exist.md`
- **Priority:** Low | **Severity:** Minor
- **Impact:** Filter shows invalid "Links" type (separate from "External Links")
- **Assignees:**
  - Frontend: a.manchenkova@reluna.com
  - Backend: i.tkachev@reluna.com
- **Estimated Effort:** 1-2 hours
- **Root Cause:** Hardcoded filter list includes deprecated type
- **Quick Fix Potential:** ⚡⚡⚡ YES - remove from filter array

### P3-4: Missing "External Link" Resource Type
- **File:** `bug-missing-external-link-resource-type.md`
- **Priority:** Low | **Severity:** Minor
- **Impact:** Cannot select proper resource type for external links
- **Assignees:**
  - Frontend: a.manchenkova@reluna.com
  - Backend: i.tkachev@reluna.com
- **Estimated Effort:** 2-4 hours
- **Root Cause:** Type not in enum or not exposed to frontend

### P3-5: Constitution Template Section Has Status Field 🤔 REQUIRES DISCUSSION
- **File:** `bug-constitution-template-section-has-status-field.md`
- **Priority:** Low | **Severity:** Minor
- **Impact:** Confusing UX - workflow status on templates doesn't make sense
- **Assignees:**
  - Frontend: a.manchenkova@reluna.com
  - Backend: i.tkachev@reluna.com
- **Estimated Effort:** 2-4 hours (after product decision)
- **Root Cause:** Form reused from active documents, not adapted for templates
- **Action Required:**
  - [ ] 30-min product alignment meeting
  - [ ] Decide: Remove status field OR change to template-appropriate statuses
- **Blocker:** Requires product decision before implementation

### P3-6: Inactive Service Not Listed
- **File:** `bug-inactive-service-not-listed.md`
- **Priority:** Low | **Severity:** Minor
- **Impact:** Cannot see/manage inactive services
- **Assignee:** Backend: i.tkachev@reluna.com
- **Estimated Effort:** 3-5 hours
- **Root Cause:** API filters out inactive services, no UI toggle

**Phase 3 Summary:**
- **Total Bugs:** 5
- **Estimated Total Effort:** 7-16 hours (1-2 dev days)
- **Recommended Timeline:** Complete within Week 4-6
- **Quick Wins:** 3 bugs (underscore, Links filter, Constitution template type) = 3-7 hours total
- **Requires Discussion:** 1 bug (template status field)

---

## 📅 Recommended Execution Timeline

### Week 1: High Priority Bugs
```
Days 1-2 (Mon-Tue):
- 🔴 P1-2: FA sees "Unknown Family" (5-9 hrs) ⚡ QUICK WIN
- 🔴 P1-4: Learning Path create resource form (6-10 hrs)

Days 3-5 (Wed-Fri):
- 🔴 P1-1: Family doesn't see accepted FA (8-13 hrs)
  - Day 3: Investigation (DB, API, frontend)
  - Day 4: Fix implementation (backend + frontend)
  - Day 5: Testing bidirectional sync
- 🔴 P1-3: Verification link session issue (4-6 hrs)

Total Week 1: 23-38 hours (3-4.5 dev days across team)
```

### Week 2: Medium Priority + Quick Wins
```
Days 1-2 (Mon-Tue):
- 🟡 P2-2: Text overflow (1-2 hrs) ⚡⚡⚡ QUICK WIN
- 🟡 P2-1: Learning Path duplicate (3-5 hrs) 🆕

Total Week 2: 4-7 hours (0.5-1 dev days)
```

### Week 3-4: Low Priority Polish
```
Week 3:
- 🟢 P3-3: Links filter (1-2 hrs) ⚡⚡⚡ QUICK WIN
- 🟢 P3-1: Learning Path underscore (1-2 hrs) ⚡⚡⚡ QUICK WIN
- 🟢 P3-2: Constitution template type (1-3 hrs) ⚡⚡ QUICK WIN
- 🟢 P3-4: External Link type (2-4 hrs)

Week 4:
- 🤔 Product meeting: Template status field (30 min)
- 🟢 P3-5: Template status field (2-4 hrs)

Total Week 3-4: 7-15 hours (1-2 dev days)
```

---

## 👥 Team Allocation

### Frontend (a.manchenkova@reluna.com)
**Total Assigned:** 5 bugs
**Estimated Effort:** 8-20 hours (1-2.5 dev days)

**Active Priority Breakdown:**
- P2: 2 bugs (Text overflow, LP duplicate - shared)
- P3: 3 bugs (Underscore - shared, Template type - shared, Links filter - shared)

**Recommended Focus:**
- Week 2: Text overflow quick win + LP duplicate (with backend)
- Week 3-4: Polish & consistency fixes

### Backend/Full-Stack (itkachev-reluna)
**Total Assigned:** 5 bugs
**Estimated Effort:** 10-24 hours (1.5-3 dev days)

**Active Priority Breakdown:**
- P1: 1 bug (LP create resource form)
- P2: 1 bug (LP duplicate - shared)
- P3: 3 bugs (Type display issues - shared, External link type, Inactive service)

**Recommended Focus:**
- Week 1: LP create resource form
- Week 2: LP duplicate deep copy
- Week 3-4: Type handling + Inactive service filter

### Frontend (a.strizhnev@reluna.com)
**Total Assigned:** 3 bugs
**Estimated Effort:** 17-28 hours (2-3.5 dev days)

**Active Priority Breakdown:**
- P1: 3 bugs (Unknown Family name, Family doesn't see FA, Verification link)

**Tasks:**
- P1-2: FA sees "Unknown Family" (Week 1, 5-9 hrs) ⚡ QUICK WIN
- P1-1: Family doesn't see accepted FA (Week 1, 8-13 hrs)
- P1-3: Verification link session issue (Week 1, 4-6 hrs)

**Recommended Focus:**
- Week 1: Unknown Family quick win + Critical bidirectional relationship bug + Verification link

---

## 🎯 Success Metrics

### Phase 1 (Week 1)
- ✅ FA-Family bidirectional relationship works
- ✅ Learning Path resource creation functional
- ✅ FA sees correct family names
- ✅ Verification link handles sessions correctly
- ✅ 100% of high priority bugs resolved

### Phase 2 (Week 2)
- ✅ Learning Path duplication preserves all modules
- ✅ All UI overflow issues fixed
- ✅ 100% of medium priority bugs resolved

### Phase 3 (Week 3-4)
- ✅ All resource types display with correct formatting
- ✅ Filter dropdowns show only valid types
- ✅ Template forms appropriate for context
- ✅ 100% of reported bugs resolved

---

## ⚡ Quick Wins Summary

**Total Quick Wins:** 4 bugs
**Total Effort:** 8-16 hours (1-2 dev days)
**High ROI:** High visibility improvements with minimal effort

| Bug | Effort | Phase | Impact | Status |
|-----|--------|-------|--------|--------|
| Text overflow | 1-2 hrs | P2 | ⚡⚡⚡ Pure CSS fix | 🎯 Active |
| Links filter removal | 1-2 hrs | P3 | ⚡⚡⚡ Remove from array | 🎯 Active |
| Learning Path underscore | 1-2 hrs | P3 | ⚡⚡⚡ String formatting | 🎯 Active |
| Constitution template type | 1-3 hrs | P3 | ⚡⚡ Type mapping | 🎯 Active |
| FA sees "Unknown Family" | 5-9 hrs | P1 | ⚡ Field mapping fix | 🎯 Active |

**Recommendation:** Sprinkle quick wins throughout phases to maintain momentum and show rapid progress.

---

## 🚧 Risks & Dependencies

### Critical Risks

1. **Learning Path Create Resource Form Complexity**
   - Risk: Root cause may be deeper than expected (form architecture issue)
   - Mitigation: Allocate backend developer, timebox investigation to 4 hours
   - Contingency: Escalate to tech lead if not resolved in 24 hours

2. **FA-Family Relationship Complexity**
   - Risk: Bidirectional relationship fix may require database schema changes
   - Mitigation: Investigation first (DB + API + Frontend), then implementation
   - Contingency: Consider phased approach if full fix is complex

3. **Product Decision Blocker**
   - Risk: Template status field bug blocked on product decision
   - Mitigation: Schedule product meeting in Week 3
   - Contingency: Deprioritize to Week 5-6 if decision delayed

### Technical Dependencies

- **Learning Path Create Resource** → Backend form/API fix required
- **LP Duplicate** → Backend deep copy logic required
- **Type Formatting** → May need coordinated FE/BE enum alignment

---

## 📊 Effort Summary

| Phase | Bugs | Est. Hours | Dev Days | Timeline |
|-------|------|------------|----------|----------|
| **P1: High** | 4 | 23-37 | 3-4.5 | Week 1 |
| **P2: Medium** | 2 | 4-7 | 0.5-1 | Week 2 |
| **P3: Low** | 5 | 7-16 | 1-2 | Week 3-4 |
| **TOTAL** | **11** | **34-60** | **4.5-7.5** | **4 weeks** |

**Status Update (2025-11-27):**
- 🎯 11 active bugs tracked in this roadmap
- 🆕 3 new bugs added (Verification link, LP create resource form, LP duplicate)
- ✅ 8 bugs fixed and moved to `/fixed/` folder

**Parallel Development:**
- With 2-3 developers working in parallel
- Realistic completion: **3-4 weeks**
- Aggressive timeline: **2-3 weeks** (with focus on quick wins)

---

## 🎬 Next Actions

### Immediate (This Week)
- [ ] Share roadmap with team for review
- [ ] Create Jira tickets for all P1 bugs
- [ ] Assign P1-4 (LP create resource) to itkachev-reluna
- [ ] Assign P1-1, P1-2, P1-3 to a.strizhnev@reluna.com

### Week 1 Planning
- [ ] Sprint planning: Lock in P1 bugs for Week 1
- [ ] Daily sync for high-priority bugs (FA-Family relationship, LP create resource)
- [ ] QA testing plan for fixed bugs

### Ongoing
- [ ] Weekly review of roadmap progress
- [ ] Adjust priorities based on user feedback
- [ ] Celebrate quick wins with team
- [ ] Track time estimates vs actuals for future planning

---

## 📝 Notes

**Sprint Integration:**
- This roadmap can be split across 2 sprints (2-week sprints)
- Sprint 1: P1 (High priority - Week 1) + P2 (Medium - Week 2)
- Sprint 2: P3 (Low priority polish - Week 3-4)

**Resource Optimization:**
- Work is more evenly distributed after fixing 8 bugs
- a.strizhnev: 3 bugs (Week 1 focus on FA-Family relationship)
- a.manchenkova: 5 bugs (Week 2-4 focus on UX polish)
- itkachev: 5 bugs (Week 1-4 focus on backend functionality)

**Quality Assurance:**
- Allocate 20-30% of time estimates for QA testing
- Regression testing critical after each phase
- User acceptance testing for P0/P1 bugs before deployment

**Communication:**
- Update stakeholders weekly on progress
- Highlight quick wins for visibility
- Document learnings for future bug prevention

---

---

## ✅ Fixed Bugs Summary

**Total Fixed:** 8 bugs (located in `project-management/bags/fixed/`)

### 📊 Fixed Bugs Statistics

| Category | Count | Details |
|----------|-------|---------|
| **By Severity** | | 1 Critical, 6 Major, 1 Minor |
| **By Priority** | | 5 High, 1 Medium, 1 Low |
| **By Epic** | | EPIC-003: 1 bug, EPIC-008: 7 bugs |
| **By Type** | | Content Creation: 5, UI/UX: 2, Navigation: 1 |

### 🎯 Fixed Bugs List

#### 1. Learning Path Error on First Load ⚠️ CRITICAL
- **File:** `bug-learning-path-error-on-first-load.md`
- **Priority:** High | **Severity:** Critical
- **Epic:** EPIC-008 Knowledge Center
- **Issue:** "Error Loading Data" + "Create New Module/Resource" buttons non-functional
- **Impact:** Learning Path completely inaccessible on first load + content creation blocked
- **Assignees:** a.manchenkova (FE), i.tkachev (BE)
- **Status:** ✅ FIXED

#### 2. Article Content Field Non-Functional 🚫
- **File:** `bug-article-content-field-non-functional.md`
- **Priority:** High | **Severity:** Major
- **Epic:** EPIC-008 Knowledge Center
- **Issue:** Article content editor required but completely non-functional - users cannot type
- **Impact:** Cannot create Article resources at all - feature blocked
- **Assignees:** a.manchenkova (FE), i.tkachev (BE)
- **Status:** ✅ FIXED

#### 3. Guide Content Field Missing 📝
- **File:** `bug-guide-content-field-missing.md`
- **Priority:** High | **Severity:** Major
- **Epic:** EPIC-008 Knowledge Center
- **Issue:** Guide creation form lacks content input field entirely
- **Impact:** Cannot add guide content - Guide type unusable
- **Assignees:** a.manchenkova (FE), i.tkachev (BE)
- **Status:** ✅ FIXED

#### 4. Checklist Creation 500 Error ⚠️
- **File:** `bug-checklist-creation-500-error.md`
- **Priority:** High | **Severity:** Major
- **Epic:** EPIC-008 Knowledge Center
- **Issue:** System returns 500 Internal Server Error when saving Checklist resource
- **Impact:** Cannot create Checklists - feature blocked
- **Assignees:** a.manchenkova (FE), i.tkachev (BE)
- **Status:** ✅ FIXED

#### 5. Featured Resource Status Resets 🔄
- **File:** `bug-featured-resource-status-resets.md`
- **Priority:** High | **Severity:** Major
- **Epic:** EPIC-008 Knowledge Center
- **Issue:** Featured flag lost after viewing any resource
- **Impact:** Featured functionality unusable - status doesn't persist
- **Assignees:** a.manchenkova (FE), i.tkachev (BE)
- **Status:** ✅ FIXED

#### 6. Knowledge Base Folder Not Visible 📁
- **File:** `bug-knowledge-base-folder-not-visible.md`
- **Priority:** High | **Severity:** Major
- **Epic:** EPIC-008 Knowledge Center
- **Issue:** Folder created successfully on backend but not displayed in UI
- **Impact:** Cannot organize resources into folders - organizational feature broken
- **Assignees:** a.manchenkova (FE), i.tkachev (BE)
- **Status:** ✅ FIXED

#### 7. Advisor Profile Icon Not Displayed 👤
- **File:** `bug-advisor-profile-icon-not-displayed.md`
- **Priority:** Low | **Severity:** Major
- **Epic:** EPIC-003 Advisor Registration & Profile
- **Issue:** Advisor profile icon missing from navigation header
- **Impact:** Users cannot access profile dropdown menu - navigation incomplete
- **Assignee:** a.strizhnev (FE)
- **Status:** ✅ FIXED

#### 8. Checklist Delete Icon Low Visibility 👁️
- **File:** `bug-checklist-delete-icon-low-visibility.md`
- **Priority:** Medium | **Severity:** Minor
- **Epic:** EPIC-008 Knowledge Center
- **Issue:** Delete icon for checklist items has poor visibility
- **Impact:** UX issue - users struggle to find delete functionality
- **Assignee:** a.manchenkova (FE)
- **Status:** ✅ FIXED

### 💡 Key Achievements

**Critical Blockers Resolved:**
- ✅ Learning Path now loads successfully on first attempt
- ✅ Article and Guide content can be created
- ✅ Checklist creation works without 500 errors
- ✅ Featured resources persist correctly
- ✅ Folder organization functional
- ✅ Navigation elements complete
- ✅ UI polish improvements

**Impact Assessment:**
- **User-facing functionality:** 6 major blockers removed
- **Content creation:** All core resource types now functional
- **Data persistence:** Featured status and folder visibility fixed
- **Navigation:** Profile access restored
- **UX quality:** Improved icon visibility

**Team Effort:**
- **Frontend (a.manchenkova):** 7 bugs fixed (6 with backend coordination)
- **Backend (i.tkachev):** 6 bugs fixed (all with frontend coordination)
- **Frontend (a.strizhnev):** 1 bug fixed (profile icon)

---

**Roadmap Version:** 1.4.0
**Last Updated:** 2025-11-27
**Next Review:** Weekly during implementation
**Owner:** Product Team
**Contributors:** Engineering Team

**Changelog:**
- **v1.4.0 (2025-11-27):**
  - 🧹 **Cleaned up roadmap** - removed all fixed bugs from active sections
  - 📊 Updated statistics: 11 active bugs (down from 17)
  - ⏱️ Updated effort estimates: 34-60 hours total (down from 56-100 hours)
  - 📅 Revised timeline: 3-4 weeks (down from 5-6 weeks)
  - 👥 Updated team allocations to reflect only active work
  - 🎯 Renumbered priorities for clarity (P1-1 through P1-4, etc.)
  - ⚡ Updated Quick Wins: 4 active (down from 8)
  - 📈 Improved Success Metrics to match new timeline
- **v1.3.0 (2025-11-27):**
  - ✅ **Added Fixed Bugs Summary section** with 8 resolved bugs
  - 📊 Updated header statistics to show fixed bugs count
  - 📝 Documented all fixed bugs with detailed information
  - 🎯 Highlighted critical achievements and impact assessment
- **v1.2.0 (2025-11-27):**
  - 🆕 Added 3 new bugs (Verification link, LP create resource, LP duplicate)
  - ✅ Removed fixed bugs from active sections (moved to `/fixed/` folder)
  - 📊 Updated effort estimates: 56-100 hours total (17 active bugs)
  - 👥 Updated team allocations for active work
  - 📅 Revised timeline and removed Week 0 completed section
  - 🎯 Updated epic references (EPIC-009 for Learning Path)
- **v1.1.0 (2025-11-26):** Added FA-Family relationship bugs (P1-5, P1-6)
- **v1.0.0 (2025-11-21):** Initial roadmap with 14 bugs

**Note:** Fixed bugs are tracked separately in `project-management/bags/fixed/` folder and documented in the Fixed Bugs Summary section above.
