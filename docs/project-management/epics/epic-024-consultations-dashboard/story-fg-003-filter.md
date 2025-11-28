# User Story: Filter and Search Consultations

---

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Consultant, I want to search and filter my consultations by date and type, so that I can quickly find relevant sessions
**Epic Link:** FG-EPIC-XXX [Consultations Management for Consultants]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant,
**I want to** search and filter my consultations list by keyword, date sorting, and consultation type,
**so that** I can quickly find and focus on relevant sessions.

---

## 🎯 Business Context

**Why is this Story important?**

Consultants serve multiple families and provide various consultation types (workshops, mediation sessions, strategic planning, etc.). Without search and filtering capabilities, they must manually scan through all consultations to find relevant sessions, which:
- **Wastes time** searching for specific consultations in long lists
- **Reduces productivity** when preparing for upcoming sessions or reviewing past work
- **Makes planning difficult** for schedule management
- **Complicates reporting** when analyzing specific service types

**Business value:**
- Improves Consultant efficiency and satisfaction with platform
- Enables better time management and service planning
- Supports quick access to consultations by family name, topic, or service type
- Enhances professional service delivery through better organization

---

## ✅ Acceptance Criteria

1. **Given** I am on the Consultations list page,
   **When** I see the filter section,
   **Then** I should see:
   - "Search and Filters" header
   - Search input field with placeholder "Search Meetings"
   - "Date:" dropdown with default value "Newest First"
   - "Consultation Type" dropdown with default value (all types)

2. **Given** I type keywords in the search field (e.g., "Smith family" or "succession"),
   **When** I enter at least 3 characters,
   **Then** the consultations list updates in real-time to show only consultations matching the search term in:
   - Family name
   - Consultation title/description
   - Consultation notes

3. **Given** I open the "Date:" dropdown,
   **When** I see available options,
   **Then** I should see:
   - Newest First (default)
   - Oldest First
   - Upcoming Only
   - Completed Only
   - This Week
   - This Month

4. **Given** I select a date sorting option (e.g., "Upcoming Only"),
   **When** the selection is made,
   **Then** the consultations list updates to show consultations sorted/filtered according to that option.

5. **Given** I open the "Consultation Type" dropdown,
   **When** I see available options,
   **Then** I should see:
   - All Types (default)
   - Workshop
   - Mediation Session
   - Strategic Planning
   - Education Program
   - Succession Planning
   - Conflict Resolution
   - One-on-One Consultation
   - Other

6. **Given** I select a consultation type (e.g., "Workshop"),
   **When** the selection is made,
   **Then** the consultations list updates to show only consultations of that type.

7. **Given** I use multiple filters simultaneously (search + date + type),
   **When** all filters are active,
   **Then** the consultations list shows only results matching ALL criteria (AND logic).

8. **Given** no consultations match my filter criteria,
   **When** filters are applied,
   **Then** I see an empty state message: "No consultations found. Try adjusting your search or filters."

**Additional Criteria:**
- [ ] Search field has search icon on the right
- [ ] Search works in real-time (debounced after 300ms of typing)
- [ ] Dropdown indicators show current selection
- [ ] Clear search button (X) appears when search has text
- [ ] Filtered consultation count is displayed (e.g., "Showing 8 of 45 consultations")
- [ ] All filters can be reset by clearing search and selecting default dropdown values

---

## 🔐 Business Rules

**Search Rules:**
1. **Minimum characters**: Search activates after 3 characters entered
2. **Search scope**: Searches across family name, consultation title, consultation description/notes
3. **Case-insensitive**: Search is not case-sensitive
4. **Real-time**: Search debounced with 300ms delay for performance

**Date Dropdown Options Behavior:**
- **Newest First**: Sort by scheduled_date DESC (most recent at top)
- **Oldest First**: Sort by scheduled_date ASC (earliest at top)
- **Upcoming Only**: Filter consultations with scheduled_date >= today, sorted newest first
- **Completed Only**: Filter consultations with status = "completed", sorted newest first
- **This Week**: Filter consultations scheduled within current week (Mon-Sun)
- **This Month**: Filter consultations scheduled within current month

**Validation Rules:**
1. **Empty search**: If search field is empty, show all consultations (no filtering)
2. **Empty results**: If no consultations match, show empty state message
3. **Combined filters**: All filters work together with AND logic

**Authorization:**
- **Who can perform this action:** Consultant (logged in with consultant account)
- **Who can view results:** Only the Consultant - sees their own consultations filtered

**Data Scope:**
- Consultant sees only their own consultations (multi-tenancy respected)
- Filters apply across all families they serve

**Edge Cases:**
- **No consultations exist:** Show empty state with message "You don't have any consultations yet"
- **All consultations filtered out:** Show "No consultations found. Try adjusting your search or filters."
- **Search with special characters:** Handle gracefully, escape SQL injection attempts
- **Very long search term:** Limit search input to 100 characters

---

## 📐 Design & UX

**User Flow:**
1. Consultant navigates to Consultations page in Advisor Portal
2. Consultant sees "Search and Filters" section with 3 controls
3. **Scenario A - Search:**
   - Consultant types "Johnson" in search field
   - System shows only consultations with Johnson family in real-time
4. **Scenario B - Date Filter:**
   - Consultant clicks "Date: Newest First" dropdown
   - Consultant selects "Upcoming Only"
   - System shows only future consultations
5. **Scenario C - Type Filter:**
   - Consultant clicks "Consultation Type" dropdown
   - Consultant selects "Workshop"
   - System shows only Workshop consultations
6. **Scenario D - Combined:**
   - Consultant searches "succession", selects "This Month", selects "Strategic Planning"
   - System shows only Strategic Planning consultations this month with "succession" in title/notes

**Filter Controls Layout (as per screenshot):**
```
┌─────────────────────────────────────┐
│ Search and Filters                  │
├─────────────────────────────────────┤
│ [Search Meetings            🔍]     │
│                                     │
│ Date: Newest First           ▼      │
│                                     │
│ Consultation Type            ▼      │
└─────────────────────────────────────┘
```

**Date Dropdown Options:**
- Newest First ✓ (default)
- Oldest First
- Upcoming Only
- Completed Only
- This Week
- This Month

**Consultation Type Dropdown Options:**
- All Types ✓ (default)
- Workshop
- Mediation Session
- Strategic Planning
- Education Program
- Succession Planning
- Conflict Resolution
- One-on-One Consultation
- Other

---

## 🧪 Test Scenarios

**Happy Path - Search:**
1. Consultant opens Consultations page → sees all consultations
2. Consultant types "Joh" (3 characters) in search → System starts filtering
3. Consultant types "Johnson" → System shows only Johnson family consultations
4. Consultant clears search (clicks X) → System shows all consultations again

**Happy Path - Date Filter:**
1. Consultant clicks "Date: Newest First" dropdown
2. Consultant selects "Upcoming Only"
3. System shows only future consultations sorted by date (nearest first)
4. Consultant resets to "Newest First" → System shows all consultations sorted newest first

**Happy Path - Type Filter:**
1. Consultant clicks "Consultation Type" dropdown
2. Consultant selects "Workshop"
3. System shows only Workshop consultations
4. Consultant resets to "All Types" → System shows all consultations

**Happy Path - Combined Filters:**
1. Consultant searches "succession"
2. Consultant selects "This Month" from Date dropdown
3. Consultant selects "Strategic Planning" from Type dropdown
4. System shows only Strategic Planning consultations this month with "succession" keyword
5. Result count updates: "Showing 2 of 45 consultations"

**Negative Tests:**
1. **No results:** Consultant searches "XYZ123NotExist" → System shows "No consultations found. Try adjusting your search or filters."
2. **Search too short:** Consultant types "Jo" (2 characters) → System doesn't filter yet (waits for 3rd character)
3. **Special characters:** Consultant searches "Smith's & Co." → System handles safely without errors

**Edge Cases:**
1. **Empty search while other filters active:** Consultant clears search but keeps Type filter → System shows all consultations of that type
2. **Rapid typing:** Consultant types quickly → System debounces and waits 300ms after last keystroke before filtering
3. **Page refresh:** Consultant applies filters then refreshes page → Filters reset to defaults
4. **No consultations in date range:** Consultant selects "This Week" with no consultations scheduled → System shows "No consultations found"

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Search debounce: 300ms after last keystroke
- Filter application: <500ms for up to 100 consultations
- Dropdown open: <100ms

**Usability:**
- Search placeholder: "Search Meetings" (as shown in screenshot)
- Visual feedback when filters active (dropdown shows selected value)
- Clear search button (X icon) visible when search has text
- Keyboard navigation support for dropdowns

**Security:**
- SQL injection prevention in search queries
- Filter parameters include consultant_id validation
- XSS protection for search input

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions

**Accessibility:**
- Search input has proper ARIA label
- Dropdown menus keyboard accessible
- Screen reader support for filter changes
- Focus management for filter controls

---

## 📝 Notes

**Design Notes:**
- UI follows screenshot format: stacked layout with search at top, then date dropdown, then type dropdown
- "Search and Filters" header clearly separates filter section from consultations list
- Minimalist design with clear hierarchy

**Q: Should search be case-sensitive?**
A: No. Case-insensitive search for better usability.

**Q: Should filters persist across page refreshes?**
A: No. Filters reset on page refresh for v1. Future enhancement may add persistence.

**Q: What happens if consultant types very fast?**
A: Search is debounced (300ms delay) to prevent excessive API calls.

**Q: Should "Upcoming Only" include today's consultations?**
A: Yes. scheduled_date >= today (includes consultations scheduled for today).

**Q: Date dropdown - are options mutually exclusive?**
A: Yes. Only one date option can be selected at a time (dropdown single select).

**Q: Should completed consultations appear in "Newest First" sort?**
A: Yes. "Newest First" shows ALL consultations regardless of status, sorted by date.

**Assumptions:**
- Consultations data includes: family_name, title, description, scheduled_date, status, type
- Search indexes exist on family_name, title, description fields for performance
- Consultant understands date filter options (Upcoming, This Week, etc.)

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-27
