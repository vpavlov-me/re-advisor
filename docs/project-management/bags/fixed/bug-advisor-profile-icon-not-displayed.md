---
title: "Advisor Profile Icon Not Displayed"
category: "bug"
audience: "developer|qa"
created: "2025-11-21"
updated: "2025-11-21"
version: "1.0.0"
status: "fixed"
tags: ["bug", "frontend", "ui", "profile"]
owner: "product-team"
assignee: "a.strizhnev@reluna.com"
---

# Bug Report - Advisor Profile Icon Not Displayed

> **Issue:** The advisor profile icon is not displaying in the navigation/header area of the advisor dashboard.

---

## 📋 Basic Information

**Issue Type:** Bug
**Project:** FG
**Summary:** Advisor profile icon not visible in navigation area
**Original Epic:** FG-EPIC-003 (Advisor Registration & Profile Management)
**Assignee:** a.strizhnev@reluna.com
**Priority:** Low
**Severity:** Major
**Tags:** `bug`, `frontend`, `ui`, `profile`, `advisor-portal`
**Story Points:** TBD
**Sprint:** To be assigned during sprint planning

---

## 🐛 Bug Description

**What is broken?**

The advisor profile icon is not displaying in the header navigation bar. This icon should be clickable and open a dropdown menu with options including "Profile" that allows users to navigate to the profile editing page.

- **Functionality affected:** Profile menu access in navigation header
- **What's not working:** Profile icon not rendering, preventing access to dropdown menu
- **Impact:** Advisors cannot access the profile dropdown menu to navigate to profile settings. Users have no clear way to access "Edit Profile" functionality from the header navigation.

---

## 👥 Affected Users

**Who is impacted by this bug?**

- **Primary Personas:** All advisors using the platform
- **User Impact Level:** All advisors
- **Frequency:** Every time - consistently not displaying

---

## ✅ Expected Behavior

**What SHOULD happen:**

1. When an advisor logs into the dashboard, a profile icon should be visible in the top-right corner of the header navigation bar (next to the notification bell icon)
2. The profile icon should be clearly visible and identifiable as a clickable element
3. When the user clicks on the profile icon, a dropdown menu should appear
4. The dropdown menu should contain navigation options including:
   - "Profile" - clicking this navigates to the Edit Profile page
   - Other relevant menu items (Settings, Logout, etc.)
5. This provides a clear and accessible way for advisors to navigate to their profile management area

According to standard UI patterns, there should be a notification bell icon and adjacent to it, a profile icon. Currently only the bell icon is visible with a red notification badge.

---

## ❌ Actual Behavior

**What ACTUALLY happens:**

1. The advisor dashboard loads
2. In the top-right navigation area, only a notification bell icon is visible
3. No profile icon is displayed next to the notification bell
4. Users have no visible way to access the profile dropdown menu
5. Without the profile icon, there is no entry point to navigate to "Edit Profile" or access other profile-related options
6. The navigation appears incomplete, showing only the notification bell but missing the profile menu access point

---

## 📸 Evidence

**Screenshots/Videos:**

See attached screenshot showing:
- Advisor dashboard with navigation bar
- Notification bell icon visible in top-right (with red badge)
- Profile icon area showing only letter "A" instead of proper avatar/icon
- URL shows: `fg-qa-advisory.lunadev.org/dashboard`

**Visual Context:**
- Location: Top-right corner of header navigation bar
- Adjacent to: Notification bell icon (which IS displaying correctly with red notification badge)
- Expected: Profile icon/button that opens dropdown menu with "Profile" option
- Actual: No profile icon visible - missing navigation element

---

## 🔍 Root Cause Analysis (To be investigated)

**Possible causes:**

1. **CSS/Styling issue:**
   - Avatar component styles not loading correctly
   - Z-index or visibility properties incorrect
   - Container sizing preventing icon display

2. **Component rendering issue:**
   - Profile menu trigger component not mounting
   - Conditional rendering logic preventing display
   - React component lifecycle issue
   - Component missing from navigation component tree

3. **Navigation structure issue:**
   - Profile icon component not added to header layout
   - Routing or component architecture issue
   - Missing import or component registration

---

## 🔧 Suggested Fix

**Areas to investigate:**

### Frontend (a.strizhnev@reluna.com):
- Check navigation header component for profile menu trigger element
- Verify profile icon/button component is properly imported and mounted in header
- Review component tree structure - ensure profile menu component is included
- Check CSS styles that might be hiding the profile icon (display, visibility, opacity)
- Verify dropdown menu component and its trigger are properly connected
- Test click handler and dropdown menu functionality
- Check browser console for any JavaScript errors or failed component mounting
- Verify responsive design doesn't hide icon at certain viewport sizes

### Testing scenarios:
- [ ] Profile icon visible in header navigation
- [ ] Clicking profile icon opens dropdown menu
- [ ] Dropdown menu contains "Profile" option
- [ ] Clicking "Profile" navigates to Edit Profile page
- [ ] Different screen sizes/responsive breakpoints
- [ ] Different browsers (Chrome, Firefox, Safari)

---

## ✅ Acceptance Criteria for Fix

- [ ] Profile icon/button displays correctly in header navigation bar
- [ ] Profile icon is positioned next to notification bell in top-right corner
- [ ] Icon is clearly identifiable as a clickable element
- [ ] Clicking the profile icon opens a dropdown menu
- [ ] Dropdown menu contains "Profile" option (and other relevant menu items)
- [ ] Clicking "Profile" in dropdown navigates to Edit Profile page
- [ ] Visual design matches mockups and design system
- [ ] Proper hover and active states for the icon
- [ ] Works across all supported browsers and devices
- [ ] No console errors related to profile menu rendering

---

## 📌 Related Information

**Related Epic:** [EPIC-003: Advisor Registration & Profile Management](../epics/epic-003-adviser-registration/)
**Module:** Advisor Portal - Navigation/Header
**Environment:** QA (fg-qa-advisory.lunadev.org)
**Browser/Platform:** Cross-browser issue (needs verification)
**Page:** Dashboard (`/dashboard`)

**Design System Reference:**
- Verify expected avatar component design
- Check navigation header specifications

---

## 🎯 Business Impact

**Why this matters:**

- **Navigation Accessibility:** Advisors have no clear way to access their profile management area
- **User Experience:** Missing navigation element creates confusion and frustration
- **Usability:** Users must find alternative routes to Edit Profile, reducing efficiency
- **Standard UI Pattern:** Users expect profile access in header navigation - missing this creates poor UX

While priority is Low (workarounds may exist), severity is Major because:
- Affects all users' ability to access profile functionality
- Breaks expected navigation patterns
- Creates significant usability issue
- May prevent users from discovering profile editing features

---

## 📅 Status Tracking

- [ ] Bug confirmed and reproduced
- [ ] Root cause identified
- [ ] Fix implemented
- [ ] Code review completed
- [ ] Testing completed (multiple browsers/scenarios)
- [ ] Documentation updated
- [ ] Ready for deployment
