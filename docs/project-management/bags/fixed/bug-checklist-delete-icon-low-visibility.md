---
title: "Checklist Delete Icon Has Poor Visibility"
category: "bug"
audience: "developer|qa|product-manager"
created: "2025-11-21"
updated: "2025-11-21"
version: "1.0.0"
status: "fixed"
tags: ["bug", "frontend", "ui", "ux", "checklist", "knowledge-base"]
owner: "product-team"
maintainer: "product-team"
reviewer: ""
assignee_frontend: "a.manchenkova@reluna.com"
---

# Bug Report - Checklist Delete Icon Not Clearly Visible

> **Issue:** Delete icon (trash/bin) for checklist items has poor visibility, making it difficult for users to find and use

---

## 📋 Basic Information

**Issue Type:** Bug
**Project:** FG
**Summary:** Delete icon for checklist items in resource creation form is not clearly visible to users
**Original Epic:** EPIC-008 Knowledge Center
**Assignee Frontend:** a.manchenkova@reluna.com
**Priority:** Medium
**Severity:** Minor
**Tags:** `bug`, `frontend`, `ui`, `ux`, `checklist`, `knowledge-base`, `accessibility`
**Story Points:** [To be estimated]
**Sprint:** [To be assigned during sprint planning]

---

## 🐛 Bug Description

**What is broken?**

In the "Create New Resource" form, when creating a Checklist type resource:
- Each checklist item has a delete icon (trash/bin icon) on the right side
- The delete icon is present but **not clearly visible** to users
- Icon has poor contrast or styling that makes it blend into the background
- Users may not realize they can delete checklist items because the icon is hard to see
- Impacts usability and user experience when editing checklists

**Business Impact:**
- Reduced usability - users struggle to find delete functionality
- Poor user experience - users may think they cannot delete items
- May lead to workarounds (recreating entire checklists instead of editing)
- Accessibility concern - low contrast affects visibility

---

## 👥 Affected Users

**Who is impacted by this bug?**

- **Primary Personas:** Family Members, Advisors, Administrators - anyone creating checklist resources
- **User Impact Level:** All users creating or editing checklists in Knowledge Base
- **Frequency:** Every time a user creates/edits a checklist (100% of checklist interactions)

---

## ✅ Expected Behavior

**What SHOULD happen:**

1. User creates a new resource of type "Checklist"
2. User adds multiple checklist items
3. **Delete icon (trash/bin) for each item should be clearly visible**
4. Icon should have:
   - Sufficient contrast against background
   - Clear visual affordance (obvious it's clickable)
   - Visible on both hover and static states
   - Consistent with other delete actions in the app
5. User can easily identify and click delete icon to remove items

**UX Best Practices:**
- Delete icons should be immediately recognizable
- Hover state should provide additional visual feedback
- Icon should meet WCAG contrast requirements (at least 3:1 for UI components)

---

## ❌ Actual Behavior

**What ACTUALLY happens:**

1. User creates a new resource of type "Checklist"
2. User adds multiple checklist items
3. **Delete icon exists but is not clearly visible**
4. Icon issues (based on screenshot):
   - Trash/bin icon drawn but lacks sufficient contrast
   - Blends into background or appears too faint
   - May only be visible on hover (or vice versa)
   - Not immediately obvious as an interactive element
5. Users may not notice the delete functionality exists
6. Users struggle to find how to remove checklist items

---

## 📸 Evidence

**Screenshots/Videos:**
- [Screenshot provided showing]:
  - "Create New Resource" modal with Checklist type selected
  - Two checklist items visible:
    - "ЛДТОМУОЛТМТОЛМТОЛ"
    - "букпвдлмвмдълмлвд"
  - Red rectangle highlighting the area where delete icons should be visible
  - Icons appear to be present but with poor visibility

**UI Context:**
- Form: "Create New Resource"
- Section: "Checklist" (below Basic Information)
- Checklist items with checkboxes on the left
- Delete icons on the right side (highlighted in red box)
- "Add +" button at the bottom to add more items

**Visual Issues:**
- Delete icons exist but are not prominent
- Low contrast or faint appearance
- Hard to distinguish from background

---

## 🔄 Steps to Reproduce

**Environment:**
- Application: RE:Advisor (Family Governance Platform)
- Module: Knowledge Center / Knowledge Base
- Feature: Create New Resource (Checklist type)
- User Role: [Any role with Knowledge Base access]

**Steps:**
1. Navigate to Knowledge Center → Knowledge Base
2. Click "+ Create Resource" button
3. In "Create New Resource" form:
   - Select "Checklist" from Type dropdown
   - Choose or skip folder selection
   - Enter Title (e.g., "Test Checklist")
   - Enter Description (optional)
4. Add 2-3 checklist items using the text input and "Add +" button
5. **BUG:** Observe the right side of each checklist item
6. Look for delete icon (trash/bin) - it should be clearly visible
7. Note that icon is present but hard to see
8. Try to identify the delete functionality without prior knowledge

**Expected:** Delete icon clearly visible and easily identifiable
**Actual:** Delete icon present but lacks sufficient visibility

**Reproduction Rate:** 100% (consistent across all checklist items)

---

## 🔍 Root Cause Analysis (Initial Hypothesis)

**Potential causes:**

1. **CSS styling issue**
   - Icon color has insufficient contrast with background
   - Opacity set too low (e.g., opacity: 0.3 instead of 0.7+)
   - Icon only visible on hover, not in default state

2. **Icon sizing issue**
   - Icon too small to be easily visible
   - Icon size doesn't meet accessibility standards

3. **Color/theme issue**
   - Icon color matches or is too similar to background
   - Lack of border or background for icon area
   - No visual separation between icon and surroundings

4. **Design system inconsistency**
   - Delete icons in other parts of app may be more visible
   - This component not following established patterns

**Investigation needed:**
- Check CSS for delete icon component (color, opacity, size)
- Compare with delete icons in other parts of the application
- Test contrast ratio using accessibility tools
- Verify hover states and visual feedback

---

## 🛠 Technical Context

**Related Components:**
- **Frontend:** Checklist component in resource creation form (React)
- **Frontend:** Delete/trash icon component
- **Frontend:** CSS styling for checklist item actions

**Repository References:**
- **Technical Implementation:** See `../FG/frontend/` (Knowledge Center module)
- **Component:** Resource creation form → Checklist items
- **Related:** Icon library (likely FontAwesome, Material UI, or custom icons)

---

## ✅ Acceptance Criteria for Fix

**Definition of Done:**

**Visual Requirements:**
- [ ] Delete icon (trash/bin) is clearly visible on all checklist items
- [ ] Icon has sufficient contrast against background (meets WCAG 3:1 minimum for UI components)
- [ ] Icon is appropriately sized (minimum 16x16px, recommended 20x20px or larger)
- [ ] Icon color clearly distinguishes it from background

**Interaction Requirements:**
- [ ] Hover state provides additional visual feedback (e.g., color change, scale)
- [ ] Active/pressed state shows user interaction is registered
- [ ] Focus state visible for keyboard navigation accessibility
- [ ] Cursor changes to pointer on hover

**Consistency Requirements:**
- [ ] Delete icon styling matches other delete actions in the app
- [ ] Visual treatment consistent with design system
- [ ] Works across light/dark themes (if applicable)

**Testing Requirements:**
- [ ] Verified on different screen sizes (desktop, tablet, mobile)
- [ ] Passes accessibility audit (contrast ratio, focus states)
- [ ] User testing confirms improved discoverability
- [ ] No visual regression in other parts of the form

---

## 💡 Recommended Solution

**Design improvements to consider:**

1. **Increase icon visibility:**
   - Use higher opacity (0.6-0.8 default, 1.0 on hover)
   - Add subtle background or border to icon area
   - Use red or warning color for delete icon (common pattern)

2. **Visual hierarchy:**
   - Show icon on hover only (cleaner UI when not needed)
   - OR keep icon always visible but dim until hover
   - Ensure hover state has clear visual change

3. **Accessibility:**
   - Ensure minimum contrast ratio of 3:1 (WCAG Level AA)
   - Add aria-label for screen readers: "Delete checklist item"
   - Support keyboard navigation (Tab to focus, Enter/Space to delete)

4. **Example patterns from other apps:**
   - Notion: Gray icon, turns red on hover
   - Trello: Gray icon with background on hover
   - Asana: Icon appears on row hover with background circle

---

## 🧪 Test Scenarios

### Happy Path
- [ ] User creates checklist with 3 items, can easily see and identify delete icons
- [ ] User hovers over delete icon, sees clear visual feedback
- [ ] User clicks delete icon, item is removed successfully
- [ ] User can delete all items except the last one (if minimum of 1 item required)

### Edge Cases
- [ ] Checklist with 10+ items - delete icons remain visible and functional
- [ ] Long checklist item text - delete icon doesn't overlap with text
- [ ] Short checklist item text - delete icon positioned consistently
- [ ] Checklist viewed on mobile device - icon remains usable (touch target size)

### Accessibility
- [ ] User navigates with keyboard Tab key - can focus on delete icons
- [ ] User presses Enter/Space on focused delete icon - item deleted
- [ ] Screen reader announces delete functionality properly
- [ ] High contrast mode - icon remains visible

### Cross-browser
- [ ] Chrome - icon displays correctly
- [ ] Firefox - icon displays correctly
- [ ] Safari - icon displays correctly
- [ ] Edge - icon displays correctly

---

## 🚨 Workaround

**Current user workaround:**

**If delete icon is hard to find:**
1. Hover slowly over the right side of each checklist item
2. The delete icon may become more visible on hover
3. Look for a faint trash/bin icon outline
4. Click when cursor changes to pointer
5. Alternatively, recreate the entire checklist if unable to delete specific items

**Note:** This is a UX issue, not a functional failure - the delete functionality works, it's just hard to discover.

---

## 📊 Priority Justification

**Why is this Medium Priority / Minor Severity?**

**Priority: Medium**
- Affects user experience and usability
- Impacts all checklist creation workflows
- Relatively simple fix (CSS/styling adjustment)
- Should be addressed in near-term sprint

**Severity: Minor**
- Functionality exists and works when found
- Does not break core features
- Workaround available (hover to find icon)
- Does not cause data loss or errors
- UX improvement rather than critical bug

**However:**
- 100% of checklist users affected
- First-time users may not discover delete functionality
- Impacts perceived product quality
- Quick fix with high impact on user satisfaction

**Recommended action:** Include in next sprint as a quick win UX improvement

---

## 📝 Notes

- Screenshot timestamp: 2025-11-21
- Platform: Web application (RE:Advisor)
- This is a UX/polish issue rather than a critical functional bug
- Fix should include review of all icon visibility across the app
- Consider conducting design system audit for consistency
- May want to implement consistent icon visibility pattern across all list items

---

## 🔗 Related Issues

- [Link to Knowledge Base Epic: EPIC-008]
- [Check if similar visibility issues exist with other icons in the app]
- [May be related to overall design system implementation]

---

**Reporter:** Product Team (via screenshot analysis)
**Date Reported:** 2025-11-21
**Status:** Open - Awaiting assignment and sprint planning
