# User Story: View Learning Paths Library

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As an advisor, I want to view list of all my learning path templates with search and filter
**Epic Link:** FG-EPIC-ALP-002-CRUD
**Priority:** High
**Story Points:** 5
**Sprint:** [To be assigned]

---

## 📖 User Story

**As a** Personal Family Advisor / External Consul / Consultant,
**I want to** see a list of all my created learning paths with ability to search and filter by category and status,
**so that** I can easily find and manage my templates.

---

## 🎯 Business Context

**Why is this Story important?**

Advisors need centralized view of their learning path library to manage content efficiently. As library grows (10+ paths), search and filter capabilities become essential for productivity.

**User pain point being solved:**
- Cannot see overview of all learning paths
- Difficult to find specific path when many exist
- No way to organize or categorize content
- Cannot distinguish between drafts and published paths

**Business outcome expected:**
- Advisors can navigate library efficiently
- Quick access to relevant learning paths
- Better content organization and management
- Foundation for future assignment workflow

---

## ✅ Acceptance Criteria

1. **Given** advisor navigates to "Learning Paths" section in Advisor Portal,
   **When** library view loads,
   **Then** system displays:
     - Page title: "Learning Paths"
     - "Create New Learning Path" button (prominent, top right)
     - Search bar (top, full width)
     - Filter dropdowns: Category (6 options: All, GOVERNANCE, BUSINESS, FINANCE, LEADERSHIP, CUSTOM) and Status (3 options: All, Draft, Published)
     - Grid or list of learning path cards
     - Total count: "X learning paths" (below filters)

2. **Given** advisor has created learning paths,
   **When** library view displays,
   **Then** each learning path card shows:
     - Title (bold, large)
     - Description preview (first 120 chars with "..." if truncated)
     - Category badge (colored: GOVERNANCE=blue, BUSINESS=green, FINANCE=purple, LEADERSHIP=orange, CUSTOM=gray)
     - Status badge (Draft=gray, Published=green)
     - Module count: "X modules"
     - Created date: "Created [relative time]" (e.g., "2 days ago", "3 weeks ago")
     - Last updated: "Updated [relative time]"
     - Three-dot menu (⋮) for actions: Edit, Duplicate, Delete
     - Hover state: Slight elevation and highlight

3. **Given** advisor has 0 learning paths,
   **When** library view loads,
   **Then** system displays empty state:
     - Illustration/icon
     - Message: "No learning paths yet"
     - Sub-message: "Create your first learning path to start building educational content for families"
     - "Create New Learning Path" button (centered, prominent)

4. **Given** advisor types in search bar,
   **When** advisor enters text (e.g., "governance"),
   **Then** system filters paths in real-time to show only those with matching:
     - Title contains search term (case-insensitive)
     - Description contains search term (case-insensitive)
     - Displays count: "Showing X of Y learning paths"

5. **Given** advisor selects category filter,
   **When** advisor chooses "GOVERNANCE" from dropdown,
   **Then** system filters to show only paths with category = GOVERNANCE and updates count.

6. **Given** advisor selects status filter,
   **When** advisor chooses "Draft" from dropdown,
   **Then** system filters to show only paths with status = draft and updates count.

7. **Given** advisor applies multiple filters,
   **When** advisor searches "family" AND selects "GOVERNANCE" category AND "Published" status,
   **Then** system shows paths matching ALL criteria (AND logic) and updates count.

8. **Given** advisor clicks "Clear filters" button (if filters applied),
   **When** action is triggered,
   **Then** system resets all filters (search empty, category="All", status="All") and shows all paths.

9. **Given** advisor has many learning paths (20+),
   **When** library view displays,
   **Then** system implements pagination:
     - Shows 12 paths per page (grid: 3 columns x 4 rows)
     - Displays pagination controls: "< Previous | Page X of Y | Next >"
     - Preserves filters when navigating pages

10. **Given** learning paths are displayed,
    **When** advisor views list,
    **Then** system sorts paths by "Last Updated" descending by default (most recently updated first).

**Additional Criteria:**
- [ ] Card layout: Grid view (3 columns) as default
- [ ] Responsive: Mobile shows 1 column, tablet 2 columns
- [ ] Search debounced (300ms) to avoid excessive filtering
- [ ] Loading state while fetching paths
- [ ] Empty search result state: "No learning paths match your search"
- [ ] Keyboard navigation: Tab through cards, Enter to open, Shift+N to create new
- [ ] Hover state provides visual feedback
- [ ] Click anywhere on card (except three-dot menu) navigates to edit view

---

## 🔑 Business Rules

**Data Visibility:**
1. Advisor sees only learning paths they created (creator_advisor_id = current_advisor_id)
2. All queries filtered by creator_advisor_id server-side
3. No cross-advisor visibility in MVP

**Filtering Logic:**
1. **Search**:
   - Searches in: title, description
   - Case-insensitive
   - Partial match (contains)
   - Real-time filtering (debounced 300ms)

2. **Category filter**:
   - Options: All (default), GOVERNANCE, BUSINESS, FINANCE, LEADERSHIP, CUSTOM
   - "All" shows paths from all categories

3. **Status filter**:
   - Options: All (default), Draft, Published
   - "All" shows paths regardless of status

4. **Combined filters**:
   - Multiple filters use AND logic
   - Example: Search="family" + Category="GOVERNANCE" + Status="Draft" shows paths matching ALL three

**Sorting:**
1. Default: Sort by `updated_at` DESC (most recently updated first)
2. Future enhancement: Allow user to choose sort (by created date, title, etc.)

**Pagination:**
1. Show 12 paths per page (grid: 3x4)
2. If ≤12 paths: No pagination controls
3. If >12 paths: Show pagination with page numbers
4. Preserve filters and search when changing pages
5. Reset to page 1 when filters change

**Empty States:**
1. **No paths exist**: Show empty state with "Create" CTA
2. **No matches for filters**: Show "No learning paths match your search/filters" with "Clear filters" button
3. **Loading**: Show skeleton cards while fetching

**Card Interactions:**
1. Click anywhere on card → Navigate to edit view
2. Click three-dot menu → Open action menu (Edit, Duplicate, Delete)
3. Hover → Slight elevation effect

**Performance:**
1. Fetch paths with pagination (12 at a time)
2. Search/filter performed on already fetched data (client-side) OR fetch with query params (server-side) - decide based on scale
3. For MVP: Client-side filtering acceptable if ≤100 paths

---

## 🎨 Design & UX

**User Flow:**

1. **Landing on Library (Empty State):**
   - Advisor navigates to Learning Paths section (first time)
   - Page loads with empty state
   - Center illustration: Stack of books or education icon
   - Text: "No learning paths yet"
   - Subtext: "Create your first learning path to start building educational content for families"
   - Large blue button: "Create New Learning Path"

2. **Library with Content:**
   - Advisor returns to library (has 8 paths)
   - Page header:
     - Title: "Learning Paths" (left)
     - "Create New Learning Path" button (right, blue)
   - Search bar (full width, placeholder: "Search learning paths...")
   - Filters row:
     - "Category:" dropdown (default: "All")
     - "Status:" dropdown (default: "All")
     - Count: "8 learning paths"
   - Grid of 8 cards (3 columns):
     - Each card: Title, description preview, badges, module count, dates, menu

3. **Using Search:**
   - Advisor types "succession" in search bar
   - System filters in real-time (debounced)
   - Shows 2 matching paths
   - Count updates: "Showing 2 of 8 learning paths"
   - "Clear filters" button appears (right of count)

4. **Using Filters:**
   - Advisor selects "GOVERNANCE" category
   - Shows 5 paths with GOVERNANCE category
   - Count: "Showing 5 of 8 learning paths"
   - Advisor also selects "Published" status
   - Shows 3 paths (GOVERNANCE + Published)
   - Count: "Showing 3 of 8 learning paths"

5. **Interacting with Card:**
   - Advisor hovers over "Family Governance Basics" card
   - Card elevates slightly, subtle shadow
   - Three-dot menu appears (top right)
   - Advisor clicks card body → Navigates to edit view
   - OR Advisor clicks three-dot menu → Dropdown: Edit, Duplicate, Delete

6. **Pagination (many paths):**
   - Advisor has 30 learning paths
   - Library shows 12 paths (page 1 of 3)
   - Bottom: "< Previous | Page 1 of 3 | Next >"
   - Advisor clicks "Next" → Shows paths 13-24
   - Filters preserved across pages

**UI Layout:**

```
┌─────────────────────────────────────────────────────────┐
│  Learning Paths                [Create New Learning Path]│
├─────────────────────────────────────────────────────────┤
│  [Search learning paths...                            ] │
│  Category: [All ▼]  Status: [All ▼]    8 learning paths │
├─────────────────────────────────────────────────────────┤
│  ┌────────┐  ┌────────┐  ┌────────┐                    │
│  │ Card 1 │  │ Card 2 │  │ Card 3 │                    │
│  └────────┘  └────────┘  └────────┘                    │
│  ┌────────┐  ┌────────┐  ┌────────┐                    │
│  │ Card 4 │  │ Card 5 │  │ Card 6 │                    │
│  └────────┘  └────────┘  └────────┘                    │
│                                                         │
│           < Previous | Page 1 of 2 | Next >            │
└─────────────────────────────────────────────────────────┘
```

**Card Design:**

```
┌──────────────────────────────────────────────┐
│  Family Governance Basics             [⋮]  │
│  [GOVERNANCE] [Published]                   │
│                                             │
│  Introduction to core family governance     │
│  concepts, creating a family council,...    │
│                                             │
│  📚 8 modules                               │
│  Created 2 weeks ago • Updated 3 days ago   │
└──────────────────────────────────────────────┘
```

---

## 🧪 Test Scenarios

**Happy Path:**
1. Advisor navigates to Learning Paths section
2. Library loads showing 8 learning paths in grid
3. Advisor sees all metadata: titles, badges, counts, dates
4. Advisor types "governance" in search → Shows 3 matches
5. Advisor selects "GOVERNANCE" category → Shows 5 paths
6. Advisor clicks card → Navigates to edit view
7. Expected: Smooth, fast, responsive filtering

**Negative Tests:**
1. **Network failure**: Library fails to load → Shows error state: "Failed to load learning paths. [Retry]"
2. **No results**: Advisor searches "xyz123" → Shows "No learning paths match your search" with "Clear search" button
3. **Unauthorized access**: Non-advisor tries to access → 403 Forbidden redirect

**Edge Cases:**
1. **Empty library**: New advisor, 0 paths → Shows empty state with "Create" CTA
2. **Single path**: Advisor has 1 path → Shows 1 card, no pagination
3. **Exactly 12 paths**: Shows all 12, no pagination (boundary)
4. **13 paths**: Shows 12 on page 1, 1 on page 2
5. **Long title**: Title exceeds card width → Truncate with "..."
6. **No description**: Description empty → Card shows "(No description)"
7. **Very old path**: Created 2 years ago → Shows "Created 2 years ago"
8. **Just created**: Created 10 seconds ago → Shows "Created just now"

---

## 🔗 Dependencies

**Technical Dependencies:**
- Backend: GET /learning-paths endpoint with query params: search, category, status, page, limit
- Frontend: Card grid component, search/filter components, pagination
- Database: Indexed queries on creator_advisor_id, title, category, status

---

## ⚠️ Non-Functional Requirements

**Performance:**
- Page load: < 1 second (12 paths)
- Search debounce: 300ms
- Filter application: < 200ms (client-side)
- Pagination navigation: < 500ms
- Support up to 100 paths without performance degradation

**Usability:**
- Clear visual hierarchy
- Intuitive search and filters
- Responsive design (mobile, tablet, desktop)
- Keyboard navigation support
- Helpful empty states
- Loading skeletons during fetch

**Accessibility:**
- WCAG 2.1 Level AA compliance
- Semantic HTML (nav, main, article tags)
- ARIA labels for search, filters
- Screen reader friendly card content
- Keyboard focus indicators

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Responsive breakpoints: Mobile (<768px), Tablet (768-1024px), Desktop (>1024px)

---

## 📝 Notes

- Consider adding "Sort by" dropdown in future (Title A-Z, Date Created, Date Updated)
- Consider list view option (alternate to grid) for users who prefer linear layout
- Consider bulk actions in future (select multiple, bulk delete/publish)
- Relative time formatting: Use library like `date-fns` for "2 days ago" format
- Card design: Balance information density with readability
- Future: Add "Recently Viewed" section at top

---

**Story Version:** 1.0.0
**Created:** 2025-10-24
**Last Updated:** 2025-10-24