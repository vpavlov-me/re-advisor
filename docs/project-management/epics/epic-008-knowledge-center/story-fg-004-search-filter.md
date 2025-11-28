# User Story: Search and Filter Knowledge Center Resources

---

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As an External Advisor, I want to search and filter resources by type and sharing status, so that I can efficiently find the right content for each consultation
**Epic Link:** FG-EPIC-XXX [Knowledge Center Library for Advisors]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As an** External Advisor,
**I want to** search and filter Knowledge Center resources by keyword, resource type, and sharing status,
**so that** I can quickly find relevant content for my consultations and reduce preparation time from 45-60 minutes to 20-30 minutes.

---

## 🎯 Business Context

**Why is this Story important?**

External Advisors manage 5-15 families simultaneously and need to prepare for consultations efficiently. Currently, advisors spend significant time manually searching through resources to find relevant content for specific consultation types (governance, succession planning, conflict resolution, etc.).

**User pain points being solved:**
- Time-consuming manual search through large resource library
- Difficulty finding resources relevant to specific consultation context
- Unclear which resources are available for reuse vs. private drafts
- Need to switch context between different resource types during preparation

**Business outcome expected:**
- Reduce consultation preparation time by 50% (from 45-60 min to 20-30 min)
- Increase advisor productivity and ability to serve more families
- Improve consultation quality through better-prepared advisors with relevant resources
- Encourage resource sharing and reuse across advisor community

**Strategic alignment:**
- Supports advisor efficiency and scalability (core value proposition)
- Enables knowledge sharing culture within advisor community
- Improves advisor satisfaction and platform stickiness

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** I am on the Knowledge Center Library page,
   **When** I enter a keyword in the search field,
   **Then** system searches resource titles and tags, displays matching results with title, type, creation date, and sharing status.

2. **Given** I am viewing search results,
   **When** I select one or multiple resource types from the filter dropdown (Articles, Case Studies, Best Practices, Constitution Templates, Learning Path Templates, Checklists, Video Tutorials, Webinar Recordings, Podcasts, Research Papers),
   **Then** results are filtered to show only selected resource types.

3. **Given** I am viewing search results,
   **When** I select sharing status filter (Private, Shared, or both),
   **Then** results are filtered to show only resources with selected sharing status.

4. **Given** I have applied multiple filters (keyword + resource type + sharing status),
   **When** I view the results,
   **Then** system shows only resources matching ALL selected criteria and displays the total count of matching results.

5. **Given** I have applied one or more filters,
   **When** I click "Clear All Filters" button,
   **Then** all filters are reset, search field is cleared, and all resources are displayed.

6. **Given** I apply filters that result in zero matches,
   **When** I view the results area,
   **Then** system displays "No resources found. Try adjusting your filters." message.

7. **Given** I am viewing filtered results,
   **When** I change any filter (keyword, type, or sharing status),
   **Then** results update in real-time without page reload.

**Additional Criteria:**
- [ ] Search is case-insensitive
- [ ] Search results show resource preview card with: title, type badge, creation date, sharing status icon, and tags
- [ ] Filter dropdowns show count of available resources per option
- [ ] Active filters are visually indicated (highlighted/badged)
- [ ] Search and filters work together (AND logic, not OR)
- [ ] Results are sorted by relevance (keyword match) first, then by creation date (newest first)

---

## 🔐 Business Rules

**Validation Rules:**
1. **Search keyword**: Minimum 2 characters to trigger search (prevent single-character searches)
2. **Resource type filter**: Multiple selection allowed (checkbox-style dropdown)
3. **Sharing status filter**: 
   - Private: Shows only resources created by current advisor
   - Shared: Shows only resources marked as shared by any advisor
   - Both selected or none selected: Shows all resources accessible to advisor

**Authorization:**
- **Who can perform this action:** Any logged-in External Advisor
- **Who can view results:** 
  - Private resources: Only the advisor who created them
  - Shared resources: All advisors in the platform
  - System enforces advisor-level isolation (advisors cannot see private resources of other advisors)

**Edge Cases:**
- **Empty search with no filters**: Display all accessible resources (private + shared)
- **Search with special characters**: System sanitizes input, searches as-is without breaking
- **Very long search keywords (>100 chars)**: System truncates to 100 characters
- **Multiple rapid filter changes**: System debounces search by 300ms to prevent excessive queries
- **No resources exist yet**: Display "No resources available. Create your first resource." message

---

## 🧪 Test Scenarios

**Happy Path:**
1. Navigate to Knowledge Center Library page
2. Enter keyword "succession" in search field
3. Select resource types: "Best Practices", "Case Studies"
4. Select sharing status: "Shared"
5. Verify results show only shared Best Practices and Case Studies containing "succession" in title or tags
6. Verify result count displays correctly (e.g., "5 resources found")
7. Click "Clear All Filters"
8. Verify all filters reset and full resource list displays

**Negative Tests:**
1. **Invalid search**: Enter single character, verify search does not trigger (or shows validation message)
2. **Zero results**: Search for non-existent keyword like "xyzabc123", verify "No resources found" message displays
3. **Filter combination with no matches**: Select resource type "Podcasts" + keyword that doesn't match any podcasts, verify appropriate empty state message

**Edge Cases:**
1. **Search with special characters**: Enter "conflict-resolution & mediation (family)", verify search works correctly
2. **Rapid filter changes**: Quickly change multiple filters in succession, verify final results reflect last filter state without errors
3. **Private vs Shared visibility**: 
   - Create private resource as Advisor A
   - Log in as Advisor B
   - Search for that resource, verify it does NOT appear in results
   - Mark resource as Shared (as Advisor A)
   - Verify Advisor B can now see it in search results

---

## 📝 Notes

**Open Questions:**
- [x] **Search scope**: Should search include resource descriptions/content or only titles and tags?
  - **Answer from Epic chat**: Search only titles and tags for performance. Content search can be Phase 2.

- [x] **Filter persistence**: Should selected filters persist when user navigates away and returns?
  - **Answer from Epic chat**: No persistence in MVP. User starts fresh each session. Can add in future iteration.

- [x] **Search results limit**: Should there be pagination or infinite scroll for large result sets?
  - **Answer from Epic chat**: Display all results on single page for MVP (expected <200 resources initially). Add pagination when library grows >100 resources.

- [x] **Sort options**: Besides relevance + date, should users be able to sort by other criteria?
  - **Answer from Epic chat**: MVP has fixed sorting (relevance first, then date). Custom sort options in future phase.

- [x] **Mobile behavior**: How should filter UI work on mobile devices?
  - **Answer**: Desktop primary for advisors. Mobile shows simplified filter drawer/modal. Detailed mobile UX in design phase.

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-23
