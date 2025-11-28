---
title: "Bug Report: Learning Path Duplicate Button Creates Empty Copy Without Modules"
category: "bug"
audience: "developer|qa|frontend|backend"
created: "2025-11-27"
updated: "2025-11-27"
version: "1.0.0"
status: "active"
tags: ["bug", "frontend", "backend", "knowledge-base", "learning-path", "duplicate", "modules", "data-integrity"]
owner: "product-team"
assignee_frontend: "itkachev-reluna"
assignee_backend: ""
priority: "Medium"
severity: "Major"
---

# Bug Report: Learning Path Duplicate Button Creates Empty Copy Without Modules

> **Status:** Active
> **Priority:** Medium
> **Severity:** Major
> **Assignee (Frontend):** itkachev-reluna

---

## 📋 Basic Information

**Issue Type:** Bug
**Project:** FG
**Summary:** When duplicating a Learning Path using the "Duplicate" button, the system creates a full copy of the Learning Path but without any of the modules that were created in the original
**Original Epic:** EPIC-009 Learning path
**Assignee Frontend:** itkachev-reluna
**Priority:** Medium
**Severity:** Major
**Tags:** `bug`, `frontend`, `backend`, `knowledge-base`, `learning-path`, `duplicate`, `modules`, `data-integrity`, `data-loss`
**Story Points:** TBD
**Sprint:** TBD

---

## 🐛 Bug Description

**What is broken?**

The "Duplicate" functionality for Learning Paths is incomplete and results in data loss. When a user taps/clicks the "Duplicate" button on a Learning Path that contains modules:

1. A new Learning Path is created (✓ Works)
2. The Learning Path metadata is copied (title, description, etc.) (✓ Works)
3. **BUT: All modules from the original Learning Path are missing** (✗ Broken)
4. The duplicated Learning Path shows "No modules found" (✗ Broken)

This defeats the primary purpose of duplication, which is to create a copy of an existing Learning Path **with all its content** to modify or customize.

**Affected Area:**
- **Component:** Knowledge Base → Learning Path
- **Action:** Duplicate action from Quick Actions menu
- **Location:** Learning Path detail page → Quick Actions → Duplicate
- **Navigation Path:** Home → Knowledge Base → Learning Path → [Duplicate button]

**Impact:**
- Users lose all module content when duplicating
- Duplicate feature is essentially non-functional for Learning Paths with content
- Forces users to manually recreate all modules in the duplicate
- Wastes significant user time
- Potential confusion: users may not realize modules weren't copied

---

## 👥 Affected Users

**Who is impacted by this bug?**

- **Primary Personas:**
  - Knowledge Base Administrators creating variations of Learning Paths
  - Educators/Content Creators duplicating paths to customize for different audiences
  - Family Administrators creating family-specific versions of standard paths

- **User Impact Level:** All users who need to duplicate Learning Paths with existing modules
- **Frequency:** Every time "Duplicate" is used on a Learning Path with modules (100% reproducible)

**Use Cases Affected:**
1. Creating customized versions of standard Learning Paths for different families
2. Creating language variations (e.g., duplicate "Financial Planning" path to create Russian version)
3. Creating seasonal/updated versions while preserving the original
4. Testing modifications without affecting the original path

---

## ✅ Expected Behavior

**What SHOULD happen:**

When clicking "Duplicate" on a Learning Path:

1. System creates new Learning Path with copied metadata:
   - Title: "[Original Title] (Copy 1)" or similar naming convention
   - Description: Copied from original
   - Status: Draft (or same as original - depends on requirement)
   - All other Learning Path properties copied

2. **System copies ALL modules from original Learning Path:**
   - All modules from "Modules" tab are duplicated
   - Module order is preserved
   - Module content is preserved:
     - Module title
     - Module description
     - Module resources
     - Module settings/properties
   - Resources within modules are either:
     - **Option A:** Linked (same resources, not duplicated) ← Recommended
     - **Option B:** Also duplicated (deep copy)

3. User is redirected to the duplicated Learning Path
4. User sees confirmation message: "Learning Path duplicated successfully"
5. Duplicated path shows all copied modules in "Modules" tab

**Expected state after duplication:**

```
Original Learning Path: "Financial Planning 101"
├── Module 1: Introduction to Financial Planning
│   ├── Resource: Article - "Why Financial Planning Matters"
│   └── Resource: Video - "Getting Started"
├── Module 2: Budgeting Basics
│   ├── Resource: Guide - "Creating Your First Budget"
│   ├── Resource: Checklist - "Budget Review Checklist"
│   └── Resource: Template - "Monthly Budget Template"
└── Module 3: Investment Fundamentals
    └── Resource: Article - "Investment 101"

↓ [Duplicate button clicked]

Duplicated Learning Path: "Financial Planning 101 (Copy)"
├── Module 1: Introduction to Financial Planning  ← COPIED
│   ├── Resource: Article - "Why Financial Planning Matters"
│   └── Resource: Video - "Getting Started"
├── Module 2: Budgeting Basics  ← COPIED
│   ├── Resource: Guide - "Creating Your First Budget"
│   ├── Resource: Checklist - "Budget Review Checklist"
│   └── Resource: Template - "Monthly Budget Template"
└── Module 3: Investment Fundamentals  ← COPIED
    └── Resource: Article - "Investment 101"
```

**User Flow:**
```
1. User views Learning Path with modules
2. User clicks "Quick Actions" → "Duplicate"
3. System shows loading/processing indicator
4. System creates duplicate with ALL modules
5. User redirected to duplicate
6. Success message shown
7. User sees all modules in duplicated path
```

---

## ❌ Actual Behavior

**What ACTUALLY happens:**

When clicking "Duplicate" on a Learning Path:

1. System creates new Learning Path (✓)
2. Learning Path metadata is copied (✓)
3. **Modules are NOT copied** (✗)
4. User is redirected to duplicated Learning Path
5. "Modules" tab shows: **"No modules found"**
6. Message: "No modules have been created yet."
7. Button shown: "[+] Create First Module"

**Actual state after duplication:**

```
Original Learning Path: "oooo (copy 1)"
├── Module 1: [Some module]
├── Module 2: [Some module]
└── Module 3: [Some module]

↓ [Duplicate button clicked]

Duplicated Learning Path: "oooo (copy 1) (Copy)"
└── (empty - no modules)
    └── "No modules found"
```

**Result:**
- User must manually recreate ALL modules
- All module content is lost
- User time wasted
- Duplicate feature is essentially useless for populated Learning Paths

---

## 📸 Evidence

**Screenshot:**
[Screenshot provided by user showing "No modules found" state after duplication]

The screenshot shows:
1. Breadcrumb: Home → Knowledge Base → Learning Path
2. Learning Path title: "oooo (copy 1)" (indicating this is a duplicated path)
3. Two tabs: "Overview" (active) | "Resources"
4. **Empty state message: "No modules found"**
5. Subtitle: "No modules have been created yet."
6. Red "[+] Create First Module" button
7. Quick Actions panel on right with options:
   - Share
   - Edit Resource
   - Create New Module
   - Create New Resource
   - **Duplicate** ← The action that caused this bug
   - Delete

**Key observation:**
- Original path name "oooo (copy 1)" suggests it already had content
- After duplication, no modules are present
- System expects user to create modules from scratch

---

## 🔄 Steps to Reproduce

**Prerequisites:**
- Access to Knowledge Base
- Existing Learning Path with at least 1 module created

**Steps:**

1. **Create/Open a Learning Path with modules:**
   - Go to Home → Knowledge Base → Learning Path
   - Create a new Learning Path OR open existing one
   - Add at least 2-3 modules with content (or use existing populated path)
   - Verify modules are visible in "Modules" tab

2. **Duplicate the Learning Path:**
   - While viewing the Learning Path, open "Quick Actions" panel (right side)
   - Click "Duplicate" button
   - Wait for duplication to complete

3. **Check the duplicated Learning Path:**
   - System redirects to the newly duplicated Learning Path
   - Click on "Modules" tab (or "Overview" depending on default view)
   - **Observe: "No modules found" message**
   - **Expected: All modules from original should be present**

4. **Verify original Learning Path unchanged:**
   - Navigate back to original Learning Path
   - Confirm all modules are still present there (not moved, just not copied)

**Reproducibility:** 100% - affects all Learning Path duplications

**Environment:**
- **Browser:** All browsers (Chrome, Firefox, Safari, Edge)
- **OS:** All operating systems
- **User Role:** Any role with permission to duplicate Learning Paths
- **Component:** Knowledge Base Learning Path duplication

---

## 🎯 Acceptance Criteria for Fix

**Fix is complete when:**

- [ ] **Duplicate creates copy WITH all modules from original:**
  - [ ] All modules from original Learning Path are copied to duplicate
  - [ ] Module order is preserved
  - [ ] Module titles are preserved
  - [ ] Module descriptions are preserved
  - [ ] Module resources are preserved (linked or copied - see design decision)
  - [ ] Module settings/properties are preserved

- [ ] **Duplication logic covers all data:**
  - [ ] Learning Path metadata copied (title, description, etc.)
  - [ ] Modules structure copied
  - [ ] Resources within modules handled correctly (linked to same resources, not duplicated)
  - [ ] Module-resource relationships preserved
  - [ ] Module order/sequence preserved

- [ ] **User experience is correct:**
  - [ ] User redirected to duplicated Learning Path after duplication
  - [ ] Success message shown: "Learning Path duplicated successfully"
  - [ ] User immediately sees all copied modules in "Modules" tab
  - [ ] No "No modules found" message on duplicated path (if original had modules)
  - [ ] Duplicate is in correct state (Draft or same as original - depends on requirement)

- [ ] **Edge cases handled:**
  - [ ] Duplicate of Learning Path with 0 modules works (empty duplicate created)
  - [ ] Duplicate of Learning Path with many modules (10+) works
  - [ ] Duplicate preserves module order for paths with reordered modules
  - [ ] Duplicate handles modules with no resources correctly
  - [ ] Duplicate handles modules with many resources correctly

- [ ] **No data loss or corruption:**
  - [ ] Original Learning Path unchanged after duplication
  - [ ] Original modules unchanged
  - [ ] No orphaned data created in database
  - [ ] No broken relationships

- [ ] **QA verification:**
  - [ ] Manual testing: Duplicate Learning Path with 5 modules, verify all copied
  - [ ] Edge case: Duplicate empty Learning Path (no modules)
  - [ ] Edge case: Duplicate Learning Path with 10+ modules
  - [ ] Verify performance: Duplication completes in reasonable time (<5 seconds)
  - [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
  - [ ] Mobile testing (if applicable)

---

## 💡 Root Cause Analysis & Suggested Solutions

**Root Cause:**

The duplication logic only copies the Learning Path entity itself, but does not copy the related modules. This is a common oversight in duplication/cloning features where only the parent entity is cloned, but child entities are not.

**Technical Investigation Steps:**

1. **Check API endpoint for duplicate:**
   - What endpoint handles Learning Path duplication?
   - Example: `POST /api/learning-paths/{id}/duplicate`
   - What does the response include?

2. **Check backend duplication logic:**
   ```python
   # Current (broken) logic probably looks like:
   def duplicate_learning_path(original_id):
       original = get_learning_path(original_id)
       duplicate = LearningPath(
           title=f"{original.title} (Copy)",
           description=original.description,
           status=original.status,
           # ... other fields
       )
       duplicate.save()
       return duplicate  # ← Missing: Copy modules!
   ```

3. **Check database relationships:**
   - Is there a `learning_path_modules` table or relationship?
   - Are modules foreign-keyed to `learning_path_id`?
   - Are module-resource relationships also foreign-keyed?

**Database Schema (assumed):**

```
learning_paths
├── id (PK)
├── title
├── description
└── ...

modules
├── id (PK)
├── learning_path_id (FK) ← Points to parent Learning Path
├── title
├── description
├── order
└── ...

module_resources (many-to-many)
├── module_id (FK)
├── resource_id (FK)
└── order
```

**Problem:** When duplicating `learning_paths`, the code does not duplicate related `modules` and `module_resources`.

---

**Suggested Solutions:**

### Solution A: Backend Deep Copy (Recommended)

Implement proper deep copy logic in backend duplication endpoint:

**Backend (Python/FastAPI example):**

```python
# backend/services/learning_path_service.py

def duplicate_learning_path(original_id: str, user_id: str) -> LearningPath:
    """
    Duplicate a Learning Path with all its modules and module-resource relationships.
    Resources themselves are NOT duplicated, only linked.
    """
    # 1. Get original Learning Path
    original = db.query(LearningPath).filter(LearningPath.id == original_id).first()
    if not original:
        raise NotFoundError("Learning Path not found")

    # 2. Create duplicate Learning Path
    duplicate = LearningPath(
        title=f"{original.title} (Copy)",
        description=original.description,
        status="draft",  # or original.status - depends on requirement
        created_by=user_id,
        # Copy other relevant fields
    )
    db.add(duplicate)
    db.flush()  # Get duplicate.id

    # 3. Get all modules from original
    original_modules = (
        db.query(Module)
        .filter(Module.learning_path_id == original_id)
        .order_by(Module.order)
        .all()
    )

    # 4. Duplicate each module
    module_id_mapping = {}  # old_id -> new_id

    for original_module in original_modules:
        # Create duplicate module
        duplicate_module = Module(
            learning_path_id=duplicate.id,  # ← Link to duplicate Learning Path
            title=original_module.title,
            description=original_module.description,
            order=original_module.order,
            # Copy other relevant fields
        )
        db.add(duplicate_module)
        db.flush()  # Get duplicate_module.id

        module_id_mapping[original_module.id] = duplicate_module.id

        # 5. Copy module-resource relationships
        original_module_resources = (
            db.query(ModuleResource)
            .filter(ModuleResource.module_id == original_module.id)
            .order_by(ModuleResource.order)
            .all()
        )

        for original_mr in original_module_resources:
            duplicate_mr = ModuleResource(
                module_id=duplicate_module.id,  # ← Link to duplicate module
                resource_id=original_mr.resource_id,  # ← Same resource (not duplicated)
                order=original_mr.order,
            )
            db.add(duplicate_mr)

    # 6. Commit all changes
    db.commit()
    db.refresh(duplicate)

    return duplicate
```

**Key points:**
- Deep copy: Learning Path → Modules → Module-Resource relationships
- Resources themselves are NOT duplicated (linked to same resources)
- Module order preserved
- All relationships maintained

---

### Solution B: Frontend-Backend Collaboration

If backend cannot be changed immediately, implement temporary frontend workaround:

**Frontend (TypeScript/React):**

```typescript
async function duplicateLearningPath(learningPathId: string) {
  // 1. Get original Learning Path with all modules
  const original = await api.getLearningPath(learningPathId, { includeModules: true });

  // 2. Call backend duplicate endpoint (creates empty duplicate)
  const duplicate = await api.duplicateLearningPath(learningPathId);

  // 3. Manually create modules in duplicate
  for (const originalModule of original.modules) {
    await api.createModule({
      learningPathId: duplicate.id,
      title: originalModule.title,
      description: originalModule.description,
      order: originalModule.order,
    });

    // 4. Link resources to new module
    for (const resource of originalModule.resources) {
      await api.addResourceToModule(newModule.id, resource.id);
    }
  }

  // 5. Redirect to duplicate
  router.push(`/knowledge-base/learning-path/${duplicate.id}`);
}
```

**Note:** This is a workaround and not ideal (multiple API calls, slower, error-prone). Solution A (backend deep copy) is strongly recommended.

---

### Solution C: Design Decision - Resource Duplication Strategy

**Decision needed:** When duplicating modules, should resources be:

**Option A: Linked (Recommended)**
- Resources are NOT duplicated
- Duplicate modules link to the SAME resources as original
- **Pros:** No data duplication, resources stay in sync, simpler logic
- **Cons:** Editing resource affects both original and duplicate

**Option B: Deep Copy**
- Resources ARE also duplicated (full deep copy)
- Duplicate modules link to NEW copies of resources
- **Pros:** Complete independence, can edit duplicate resources without affecting original
- **Cons:** Data duplication, storage overhead, resources can diverge

**Recommendation:** Use Option A (Linked) unless there's a specific business requirement for Option B.

---

## 🔍 Related Issues

**Check if Similar Issues Exist:**

1. **Other Duplicate Functions:**
   - Does "Duplicate" work correctly for other resource types (Articles, Guides, etc.)?
   - Does "Duplicate" work for other entities with child relationships?

2. **Similar Data Loss Patterns:**
   - Are there other features where child entities are not copied/moved with parent?
   - Template creation from existing resources?

3. **Related Features:**
   - Does "Move to Archive" preserve modules?
   - Does "Copy to Another Family" (if exists) preserve modules?

**Recommendation:**
- Audit ALL duplication/copy features in the system
- Ensure all parent-child relationships are properly handled
- Create reusable "deep copy" utility for entities with children

---

## 🧪 Testing Requirements

**QA must verify:**

### 1. **Basic Duplication with Modules:**
   - [ ] Create Learning Path with 3 modules
   - [ ] Each module has 2-3 resources
   - [ ] Click "Duplicate"
   - [ ] Verify duplicate has all 3 modules
   - [ ] Verify each module has all resources
   - [ ] Verify module order is correct
   - [ ] Verify resource order within modules is correct

### 2. **Edge Cases:**
   - [ ] Duplicate Learning Path with 0 modules → Empty duplicate created
   - [ ] Duplicate Learning Path with 1 module → 1 module copied
   - [ ] Duplicate Learning Path with 10+ modules → All modules copied
   - [ ] Duplicate Learning Path with module with 0 resources → Empty module copied
   - [ ] Duplicate Learning Path with reordered modules → Order preserved

### 3. **Data Integrity:**
   - [ ] Original Learning Path unchanged after duplication
   - [ ] Original modules unchanged
   - [ ] Editing duplicate module does NOT affect original
   - [ ] Editing original module does NOT affect duplicate
   - [ ] Deleting duplicate does NOT delete original modules
   - [ ] Resources are shared (or copied, depending on design decision)

### 4. **User Experience:**
   - [ ] Duplication completes in reasonable time (<5 seconds for 10 modules)
   - [ ] Success message shown after duplication
   - [ ] User redirected to duplicate Learning Path
   - [ ] "Modules" tab shows all copied modules immediately
   - [ ] No loading/error states

### 5. **Multiple Duplications:**
   - [ ] Duplicate Learning Path twice → Both duplicates have all modules
   - [ ] Duplicate a duplicate → Works correctly
   - [ ] Title naming: "Path (Copy)", "Path (Copy 2)", "Path (Copy 3)", etc.

### 6. **Performance:**
   - [ ] Duplication of large Learning Path (20+ modules) completes successfully
   - [ ] No timeout errors
   - [ ] No memory issues

### 7. **Cross-Browser:**
   - [ ] Chrome (latest)
   - [ ] Firefox (latest)
   - [ ] Safari (latest)
   - [ ] Edge (latest)

### 8. **Permissions:**
   - [ ] Only users with "duplicate" permission can duplicate
   - [ ] Duplicate created with correct ownership/permissions

---

## 📊 Priority Justification

**Why Medium Priority + Major Severity?**

**Priority: Medium**
- Duplication is a valuable feature but not critical path
- Workaround exists (manually recreate modules, though time-consuming)
- Affects productivity but not core functionality
- Can be scheduled for next sprint

**Severity: Major**
- Feature is essentially non-functional (duplicate without modules defeats the purpose)
- Results in data loss (user expects modules to be copied)
- Affects all users who rely on duplication
- No easy workaround (must manually recreate all content)
- Significant time waste for users

**Business Impact:**
- **User Productivity:** High negative impact (manual recreation of modules)
- **User Trust:** Medium - may cause confusion/frustration
- **Workaround Feasibility:** Low - must manually recreate all modules
- **Technical Effort:** Medium (3-5 hours including testing)
- **Risk:** Low (isolated to duplication feature)

**Recommendation:**
- Schedule for next sprint (not emergency, but important)
- Good candidate for "data integrity sprint" or "feature completion sprint"
- Should be fixed before encouraging users to use duplicate feature

---

## 📅 Timeline

**Reported:** 2025-11-27
**Target Fix Date:** TBD (Next available sprint)
**Estimated Effort:** 3-5 hours (backend deep copy logic + comprehensive testing)

---

## 📝 Notes

**Design Decisions Needed:**

1. **Resource Duplication Strategy:**
   - **Option A:** Link to same resources (recommended)
   - **Option B:** Duplicate resources as well (deep copy)
   - **Decision:** TBD - Recommend Option A

2. **Duplicate Status:**
   - Should duplicate be created as "Draft"?
   - Or same status as original?
   - **Decision:** TBD - Recommend "Draft" for safety

3. **Duplicate Naming:**
   - Current pattern: "[Original Title] (Copy)"
   - Multiple duplicates: "[Original Title] (Copy 2)", "(Copy 3)", etc.
   - **Decision:** Confirm this pattern is acceptable

4. **Module Numbering/Ordering:**
   - Preserve exact order from original? (Yes - recommended)
   - Reset module numbers? (No - not recommended)

**Technical Considerations:**

- Ensure duplication is transactional (all or nothing)
- If module copy fails, roll back entire duplication
- Add logging for duplication operations (audit trail)
- Consider performance for large Learning Paths (100+ modules)
- Add unit tests for duplication logic
- Add integration tests for full duplication flow

**Future Enhancements:**

- Add "Duplicate with modifications" option:
  - Allow user to select which modules to copy
  - Allow user to choose duplicate or link resources
  - Allow user to set status/visibility of duplicate
- Add "Create Template from Learning Path" feature
- Add "Import from Template" feature
- Bulk duplication (duplicate multiple Learning Paths at once)

**Related Documentation to Update:**

- User guide: "How to Duplicate a Learning Path"
- Admin documentation: "Learning Path Management"
- API documentation: Update duplicate endpoint docs
- Release notes: Mention fix when deployed

---

**Bug ID:** TBD (to be assigned in Jira)
**Reported by:** e.savelova
**Date:** 2025-11-27
