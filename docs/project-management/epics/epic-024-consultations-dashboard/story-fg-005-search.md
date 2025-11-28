# User Story: Consultant Search Consultations by Family Name or Meeting Title

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As a Consultant, I want to search consultations by family name or meeting title, so that I can quickly locate specific sessions  
**Epic Link:** FG-EPIC-017 (Consultations Dashboard)  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant,  
**I want to** search consultations by family name or meeting title,  
**so that** I can quickly locate specific sessions without scrolling through long lists.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point being solved:**
Consultants managing 50-100+ consultations across multiple families waste 30-60 seconds per search manually scrolling and visually scanning lists. When preparing for calls, updating statuses, or checking details, this friction accumulates to significant productivity loss and increases risk of selecting wrong family/consultation.

**Business outcome expected:**
- Reduce time to locate specific consultation from 30-60 seconds → 3-5 seconds
- Decrease consultant errors from mixing up similar family names or meeting types
- Improve consultant responsiveness and professionalism (quick access before client calls)
- Increase consultant satisfaction with platform usability

**Strategic alignment:**
Supports marketplace competitiveness by providing professional-grade tools that make Consultants more efficient and effective, encouraging platform adoption and retention.

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** Consultant is on Consultations Dashboard with 50+ consultations loaded,  
   **When** Consultant types "Smith" in search bar,  
   **Then** consultation list filters in real-time to show only consultations where family name contains "Smith" OR meeting title contains "Smith", with matching text highlighted.

2. **Given** Consultant has entered search query "Succession Planning",  
   **When** results are displayed,  
   **Then** all consultations with "Succession Planning" in meeting title are shown across all statuses (Active, Upcoming, Completed), with "Succession Planning" highlighted in results.

3. **Given** Consultant has active status filter applied (showing only Active consultations),  
   **When** Consultant enters search query,  
   **Then** search operates within filtered subset (searches only Active consultations).

4. **Given** Consultant has typed partial family name "John",  
   **When** viewing results,  
   **Then** consultations with families like "Johnson Family", "John Smith Family", "St. John Estate" all appear.

5. **Given** Consultant enters search query with no matching results,  
   **When** search completes,  
   **Then** empty state message displays: "No consultations found matching '[query]'. Try adjusting your search or filters."

6. **Given** Consultant clears search query (deletes text or clicks X icon),  
   **When** search field is empty,  
   **Then** full consultation list returns (respecting any active filters).

**Additional Criteria:**
- [ ] Search bar prominently placed at top of Consultations Dashboard (above consultation list)
- [ ] Search operates with minimum 2 characters entered (prevent performance issues)
- [ ] Search debounced with 300ms delay (avoids excessive filtering on rapid typing)
- [ ] Search is case-insensitive ("smith" matches "Smith Family")
- [ ] Clear button (X icon) appears in search field when text is entered
- [ ] Search results count displayed: "Showing X of Y consultations"
- [ ] Search placeholder text: "Search by family name or meeting title..."
- [ ] Keyboard accessibility: Enter key in search field triggers focus on first result
- [ ] Screen reader announces result count after search completes

---

## 🔑 Business Rules

**Search Behavior:**
1. **Minimum query length:** 2 characters (prevents searching on single letters, improves performance)
2. **Search scope:** Searches across both family name AND meeting title fields simultaneously
3. **Match type:** Partial match (substring search) - "John" matches "Johnson", "St. John", etc.
4. **Case sensitivity:** Case-insensitive search
5. **Status filtering:** Search respects currently active status filters (if "Active" filter on, searches only Active consultations)

**Performance:**
1. **Search debounce:** 300ms delay after last keystroke before executing search (reduces server load)
2. **Response time:** Search results must display within 500ms after query execution
3. **Large datasets:** Search must perform efficiently with 100+ consultations loaded

**Authorization:**
- **Who can perform search:** Any logged-in Consultant viewing their Consultations Dashboard
- **Search scope limitation:** Consultant sees only their own consultations (multi-tenancy: consultant_id filtering)

**Edge Cases:**
- **Empty query:** Clearing search returns full list (respects active filters)
- **No results:** Display empty state with clear message and suggestions
- **Special characters:** Search handles special characters in family names (apostrophes, hyphens, accents)
- **Multiple word queries:** "Smith Family" matches consultations with both words present
- **Very long queries:** Truncate search input at 100 characters

---

## 🧪 Test Scenarios

**Happy Path:**
1. Consultant opens Consultations Dashboard with 75 consultations
2. Types "Johnson" in search bar
3. List filters in real-time showing 8 consultations
4. Consultant clicks on "Johnson Family - Estate Planning" consultation
5. Consultation details open correctly

**Negative Tests:**
1. **Invalid search:**
   - Consultant enters "XYZ123NotExist"
   - System displays: "No consultations found matching 'XYZ123NotExist'"
   - Empty state shows with suggestion to adjust filters
2. **Single character search:**
   - Consultant types "S" (1 character)
   - Search does not execute (minimum 2 characters)
   - Placeholder hint remains visible
3. **Search with no permissions:**
   - (Already handled by authorization - consultant only sees own consultations)

**Edge Cases:**
1. **Combined search + filter:**
   - Consultant applies "Active" status filter
   - Enters "Smith" in search
   - Only Active consultations with "Smith" are shown
   - Consultant clears search → all Active consultations return
   - Consultant clears filter → all consultations with "Smith" return
2. **Search with special characters:**
   - Family name: "O'Brien Family"
   - Search query: "O'Brien" or "obrien" (without apostrophe)
   - Consultation correctly appears in results
3. **Rapid typing:**
   - Consultant types quickly: "J-o-h-n-s-o-n"
   - Search waits for 300ms pause after last keystroke
   - Only executes once, showing results for "Johnson"

---

## ⚠️ Non-Functional Requirements

**Performance:**
- Search results must load within 500ms after query execution
- Dashboard must remain responsive during search (no UI freezing)
- Search must handle 100+ consultations without performance degradation

**Security:**
- Search queries logged for audit trail (consultant_id, query, timestamp)
- No SQL injection vulnerabilities (parameterized queries)
- Search respects multi-tenancy (consultant only searches their consultations)

**Accessibility:**
- WCAG 2.1 AA compliance
- Keyboard navigation: Tab to search field, Enter focuses first result, Escape clears search
- Screen reader announces: "Search results updated. Showing X consultations matching [query]"
- Clear button (X icon) keyboard accessible
- Focus indicators visible on search field and clear button

**Browser Support:**
- Chrome: Latest stable
- Safari: Latest stable
- Firefox: Latest stable
- Edge: Latest stable

**Localization:**
- Search placeholder and empty state messages support English initially
- Search algorithm supports Unicode characters (international family names)

**Other:**
- Search history NOT persisted (search resets on page refresh)
- Search state NOT synchronized across browser tabs

---

## 📝 Notes

**Design Considerations from Epic:**
- Search results should highlight matching terms for better UX (visual feedback)
- Empty state should be encouraging, not discouraging (positive messaging)
- Search bar placement should be intuitive and prominent (top of dashboard)

**Assumptions:**
- Consultation data structure includes accessible `family_name` and `meeting_title` fields
- Backend API supports filtering by text query with acceptable performance
- Consultant has stable internet connection (search requires API call)

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-27  
**Story Status:** Draft - Ready for Grooming
