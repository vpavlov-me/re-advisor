# User Story: Pagination Control - Rows Per Page Selector

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As a Consultant, I want to control how many consultations display per page (3, 5, or 10), so that I can optimize viewing based on screen size and preference  
**Epic Link:** FG-EPIC-017 (Consultations Dashboard)  
**Priority:** Medium  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant,  
**I want to** control how many consultation rows display per page (3, 5, or 10 options),  
**so that** I can optimize my dashboard view based on screen size and personal preference.

---

## 🎯 Business Context

**Why is this Story important?**

Consultants work across different devices and screen sizes throughout the day:
- **Small screens** (13-14" laptops, tablets): Prefer fewer items (3-5) to avoid excessive scrolling and maintain focus on active consultations
- **Large screens** (27"+ monitors, dual displays): Prefer more items (10) to see more context without frequent page switches

**User pain point being solved:**
Currently, the dashboard shows a fixed number of consultations per page (~20 based on epic recommendations), forcing users to scroll excessively on smaller screens or waste screen real estate on larger displays.

**Business outcome expected:**
- Improved consultant productivity through personalized dashboard experience
- Reduced page load times for consultants who prefer smaller page sizes
- Better mobile/tablet experience for on-the-go consultants
- Increased dashboard engagement and satisfaction

**Strategic alignment:**
Supports Consultant persona goals (DOC-USR-006) to "optimize pricing and service offerings based on market demand" by providing efficient portfolio management tools.

---

## ✅ Acceptance Criteria

1. **Given** Consultant is on Consultations Dashboard,  
   **When** they look at pagination area,  
   **Then** they see a dropdown control labeled "X rows per page" with current selection displayed (default: "5 rows per page").

2. **Given** Consultant clicks on rows per page dropdown,  
   **When** dropdown opens,  
   **Then** they see three options: "3 rows per page", "5 rows per page", "10 rows per page" with checkmark (✓) on currently selected option.

3. **Given** Consultant selects different rows per page option (e.g., changes from 5 to 10),  
   **When** selection is confirmed,  
   **Then** page reloads consultation list showing selected number of items AND pagination resets to page 1.

4. **Given** Consultant has selected preferred rows per page setting (e.g., 10 rows),  
   **When** they switch between tabs (All/Upcoming/Completed/Cancelled),  
   **Then** selected rows per page preference persists across all tabs.

5. **Given** Consultant has set rows per page preference,  
   **When** they log out and log back in,  
   **Then** their selected preference is remembered and applied automatically.

6. **Given** Consultant changes rows per page setting,  
   **When** consultation list has fewer items than selected page size,  
   **Then** all available items display without pagination controls appearing.

**Additional Criteria:**
- [ ] Dropdown is keyboard accessible (Tab to focus, Enter/Space to open, Arrow keys to select)
- [ ] Selected option is visually distinct with checkmark icon
- [ ] Control is positioned near pagination controls (bottom of consultation list)
- [ ] Change in page size does not cause page flicker or jarring transitions
- [ ] Empty state message adapts if no consultations match current page view

---

## 🔑 Business Rules

**Validation Rules:**
1. **Available Options**: Only three values allowed: 3, 5, or 10 rows per page (no custom values)
2. **Default Value**: If no preference saved, default to 5 rows per page
3. **Minimum Items**: If total consultations < selected page size, show all items without pagination

**Authorization:**
- **Who can use this control:** All Consultants with access to Consultations Dashboard
- **Who can view results:** Only the Consultant themselves (personal preference, not shared)

**Preference Persistence:**
- Preference applies to current Consultant's account only
- Preference persists across browser sessions
- Preference applies to all consultation tabs (All/Upcoming/Completed/Cancelled)
- If preference cannot be loaded, fall back to default (5 rows)

**Edge Cases:**
- **Zero consultations**: Dropdown still visible but disabled with message "No consultations to display"
- **Exactly N consultations**: If consultant has exactly 5 consultations and selects "5 rows per page", show all on page 1 without pagination
- **Switching tabs**: Changing tabs does not reset page size preference, but resets to page 1 of new tab's results
- **Multi-device usage**: Consultant using multiple devices may have different preferences per device (acceptable behavior)

---

## 📐 Design & UX

**User Flow:**

1. Consultant lands on Consultations Dashboard → sees consultation list with default 5 items per page
2. Consultant scrolls to bottom of list → sees pagination controls with "5 rows per page" dropdown nearby
3. Consultant clicks dropdown → sees 3 options (3, 5, 10) with checkmark on "5 rows per page"
4. Consultant selects "10 rows per page" → dropdown closes, list refreshes showing 10 items, page 1 active
5. Consultant switches to "Upcoming" tab → preference maintained, shows 10 items per page
6. Consultant logs out and returns tomorrow → still sees 10 rows per page preference

**Visual Design Notes (from screenshot):**
- Dropdown button displays current selection: "10 rows per page" with chevron-down icon
- Dropdown menu shows all options vertically stacked
- Selected option marked with checkmark (✓) on left side
- Selected option has light background highlight (light blue/gray)
- Clean, minimal design matching Radix UI / shadcn/ui patterns
- Dropdown positioned at bottom of consultation list, aligned with pagination controls

**Accessibility:**
- Dropdown must be keyboard navigable (Tab, Enter, Arrow keys)
- Screen reader announces: "Rows per page selector, currently 5 rows per page"
- Focus visible indicator on dropdown trigger and options
- ARIA labels: `aria-label="Select number of rows per page"`

---

## 📊 Non-Functional Requirements (Briefly)

**Performance:**
- Changing page size should update list in < 500ms
- No full page reload required (client-side pagination preferred where possible)

**Browser Support:**
- Chrome 90+, Safari 14+, Firefox 88+, Edge 90+

**Responsive Design:**
- Dropdown adapts to mobile/tablet screen sizes
- Touch-friendly on mobile (minimum 44x44px tap target)

**Other:**
- Component should reuse existing pagination infrastructure
- Preference storage method should be consistent with other user preferences on platform

---

## 📝 Notes

**Assumptions:**
- Pagination infrastructure already exists in Consultations Dashboard (from EPIC-017)
- Three page size options (3, 5, 10) are sufficient for all use cases
- Personal preference storage mechanism available on frontend

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-27  
**Story Status:** Draft - Ready for Grooming