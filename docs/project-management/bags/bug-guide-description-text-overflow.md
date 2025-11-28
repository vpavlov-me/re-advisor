---
title: "Bug Report: Guide Resource Description Text Overflows Field Boundaries"
category: "bug"
audience: "developer|qa|frontend"
created: "2025-11-21"
updated: "2025-11-21"
version: "1.0.0"
status: "active"
tags: ["bug", "frontend", "ui", "knowledge-base"]
owner: "product-team"
assignee_frontend: "a.manchenkova@reluna.com"
priority: "High"
severity: "Minor"
---

# Bug Report: Guide Resource Description Text Overflows Field Boundaries

> **Status:** Active
> **Priority:** Medium
> **Severity:** Minor
> **Assignee (Frontend):** a.manchenkova@reluna.com

---

## 📋 Basic Information

**Issue Type:** Bug
**Project:** FG
**Summary:** Long description text overflows the Description field boundaries when viewing GUIDE resources
**Original Epic:** EPIC-008 Knowledge Center
**Assignee:** a.manchenkova@reluna.com
**Priority:** Medium
**Severity:** Minor
**Tags:** `bug`, `frontend`, `ui`, `knowledge-base`, `css`, `overflow`
**Story Points:** TBD
**Sprint:** TBD

---

## 🐛 Bug Description

**What is broken?**

When viewing a GUIDE resource in the Knowledge Base, if the Description field contains a very long text (especially long words or continuous text without spaces), the text overflows beyond the Description field container boundaries instead of wrapping or being constrained within the field.

**Affected Area:**
- **Component:** Guide Resource Detail View
- **Location:** Description panel (right sidebar)
- **Navigation Path:** Home → Knowledge Base → [Guide Resource ID]

**Impact:**
- Visual layout breaks
- Text becomes unreadable as it extends beyond container
- Affects user experience and professional appearance
- Does not impact functionality, but creates poor UX

---

## 👥 Affected Users

**Who is impacted by this bug?**

- **Primary Personas:**
  - Family Members viewing guide resources
  - Advisors viewing guide resources
  - Administrators managing knowledge base content

- **User Impact Level:** All users viewing GUIDE resources with long descriptions
- **Frequency:** Every time a guide resource has a long description without line breaks

---

## ✅ Expected Behavior

**What SHOULD happen:**

1. Description text should be constrained within the Description field boundaries
2. Long text should wrap to multiple lines within the container
3. Long continuous strings (URLs, words without spaces) should either:
   - Break at appropriate points using `word-break: break-word` or `overflow-wrap: break-word`
   - Or be truncated with ellipsis and "Show more" option
4. The Description panel should maintain its fixed width and not expand
5. Vertical scrolling may appear if content exceeds max-height

**Expected CSS behavior:**
```css
.description-field {
  width: 100%;
  max-width: [fixed width];
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word; /* for very long words */
  overflow-x: hidden; /* prevent horizontal overflow */
}
```

---

## ❌ Actual Behavior

**What ACTUALLY happens:**

1. Description text overflows horizontally beyond the Description field container
2. Text extends outside the visible boundaries (as shown by red arrow in screenshot)
3. No text wrapping occurs for long continuous strings
4. The layout appears broken and unprofessional
5. Text becomes partially hidden and unreadable

**Example problematic text:**
```
кенкjnкjencj к fvкm
dvмnкfnwкdмedкcnwкcj eкv кejc
dкwcsmxкwcкiw cкief vкie fvкie ycкi
cкrpawrвшовшшщоувшщоувшщоувшщоцувшщовушщуо
```

---

## 📸 Evidence

**Screenshot:**
![Guide Resource Description Overflow](../attachments/guide-description-overflow.png)

The screenshot shows:
1. Guide resource view with "Overview" tab selected
2. Right sidebar "Description" panel
3. Long text overflowing beyond the Description field boundaries (indicated by red arrow)
4. Text continues horizontally outside visible container

**Browser Console:**
- No JavaScript errors
- Issue is purely CSS/layout related

---

## 🔄 Steps to Reproduce

**Prerequisites:**
- Access to Knowledge Base
- Existing GUIDE resource with long description

**Steps:**
1. Navigate to Knowledge Base
2. Open any GUIDE resource (e.g., resource with ID: kjfnckjwnc)
3. View the "Overview" tab (default view)
4. Observe the "Description" panel in the right sidebar
5. Note that long text strings overflow the container boundaries

**Reproducibility:** 100% - occurs every time with long descriptions

**Environment:**
- **Browser:** [All browsers - Safari, Chrome, Firefox]
- **OS:** macOS, Windows, Linux
- **Viewport Size:** All sizes
- **Component:** Knowledge Base → Guide Resource Detail View

---

## 🎯 Acceptance Criteria for Fix

**Fix is complete when:**

- [ ] Description text is constrained within field boundaries at all times
- [ ] Long words/strings break appropriately within container
- [ ] No horizontal overflow occurs in Description panel
- [ ] Text remains fully readable within the container
- [ ] Layout maintains professional appearance
- [ ] Solution works across all modern browsers (Chrome, Firefox, Safari, Edge)
- [ ] Solution works at all viewport sizes (desktop, tablet, mobile)
- [ ] Existing short descriptions continue to display correctly

---

## 💡 Suggested Technical Solution

**Frontend Fix (CSS):**

Apply proper text overflow handling to the Description field component:

```css
/* Add to Description field container */
.resource-description {
  /* Constrain width */
  max-width: 100%;
  width: 100%;

  /* Handle text overflow */
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-word;

  /* Prevent horizontal overflow */
  overflow-x: hidden;

  /* Optional: Add vertical scroll if very long */
  max-height: 500px;
  overflow-y: auto;
}

/* For long URLs or technical strings, consider: */
.resource-description code,
.resource-description pre {
  white-space: pre-wrap;
  word-break: break-all;
}
```

**Alternative Solution:**
If description is expected to contain very long content, consider:
- Truncating text after N characters with "Show more" toggle
- Using `text-overflow: ellipsis` with max-height constraint
- Adding a "View full description" modal for extremely long content

---

## 🔍 Related Issues

**Similar bugs:**
- [Bug: Featured Resource Status Resets] - Same UI component family
- [Other overflow issues in Knowledge Base components]

**Related User Stories:**
- Knowledge Base resource display functionality
- Guide resource creation and editing

---

## 🧪 Testing Requirements

**QA must verify:**

1. **Layout Constraints:**
   - [ ] Text stays within Description field boundaries
   - [ ] No horizontal scrolling in Description panel
   - [ ] Container maintains fixed width

2. **Text Wrapping:**
   - [ ] Long words break appropriately
   - [ ] URLs wrap or break correctly
   - [ ] Mixed content (text + long strings) displays correctly

3. **Cross-Browser Testing:**
   - [ ] Chrome (latest)
   - [ ] Firefox (latest)
   - [ ] Safari (latest)
   - [ ] Edge (latest)

4. **Responsive Testing:**
   - [ ] Desktop (1920px, 1440px, 1280px)
   - [ ] Tablet (768px, 1024px)
   - [ ] Mobile (375px, 414px)

5. **Content Variations:**
   - [ ] Short descriptions (1-2 lines)
   - [ ] Medium descriptions (5-10 lines)
   - [ ] Long descriptions (20+ lines)
   - [ ] Descriptions with very long words (50+ characters)
   - [ ] Descriptions with URLs
   - [ ] Descriptions with mixed languages/unicode

---

## 📊 Priority Justification

**Why High Priority + Minor Severity?**

- **High Priority:** Affects all users viewing guide resources, creates poor first impression
- **Minor Severity:** Does not prevent functionality, is purely visual/cosmetic issue
- **Business Impact:** Medium - affects professional appearance and user trust
- **Technical Effort:** Low - simple CSS fix, no backend changes needed
- **Risk:** Very Low - isolated CSS change, minimal regression risk

**Recommendation:** Fix in next available sprint as quick win for UX improvement.

---

## 📅 Timeline

**Reported:** 2025-11-21
**Target Fix Date:** TBD (Next sprint)
**Estimated Effort:** 1-2 hours (investigation + fix + testing)

---

## 📝 Notes

- Issue is purely frontend/CSS related
- No backend or API changes required
- No database migration needed
- Fix can be deployed independently
- Consider applying similar fix to other resource types (if they share component)
- Test with actual production data to ensure fix handles all edge cases

---

**Bug ID:** TBD (to be assigned in Jira)
**Reported by:** e.savelova
**Date:** 2025-11-21
