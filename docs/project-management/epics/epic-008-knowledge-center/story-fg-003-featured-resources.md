# User Story - Mark Resources as Featured

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As an External Advisor, I want to mark important resources as Featured, so that I can quickly access my most-used materials
**Epic Link:** FG-ADV-001 [Knowledge Center Library for Advisors]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As an** External Advisor,
**I want to** mark important resources as Featured and access them in a dedicated section,
**so that** I can quickly find my most-used materials without searching through the entire library.

---

## 🎯 Business Context

**Why is this Story important?**

External Advisors serve 5-15 families simultaneously and frequently reuse the same methodologies, templates, guides, case studies, and other materials across different client engagements. Currently, they must search or scroll through the entire Knowledge Center library (which contains 10 different resource types) to find their most-used resources before each consultation.

**User pain point being solved:**
- Time wasted searching for frequently-used materials across multiple resource types before consultations
- Difficulty remembering exact names and locations of important resources
- Cognitive overhead of navigating large resource library with diverse content types repeatedly

**Business outcome expected:**
- Reduce time spent finding resources by 70% (from ~2-3 minutes to <30 seconds)
- Improve advisor preparation efficiency before family consultations
- Enable faster response time when families ask for specific materials during meetings
- Create personalized workspace for each advisor's preferred resources

**Strategic alignment:**
- Supports advisor productivity and multi-family portfolio management efficiency
- Improves advisor satisfaction with platform UX
- Reduces friction in consultation preparation workflow

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** I am viewing the Knowledge Center library,
   **When** I click the "star" icon next to any resource (of any type),
   **Then** the resource is marked as Featured with a visual indicator (⭐ filled star).

2. **Given** I have marked one or more resources as Featured,
   **When** I navigate to the Knowledge Center,
   **Then** I see a dedicated "Featured Resources" section that displays all my Featured resources.

3. **Given** I have Featured resources from different types (e.g., Articles, Templates, Case Studies),
   **When** I view the "Featured Resources" section,
   **Then** all Featured resources are displayed together regardless of their type.

4. **Given** I have marked a resource as Featured,
   **When** I refresh the page or navigate away and return,
   **Then** the Featured status persists and the resource remains in the "Featured Resources" section.

5. **Given** I have Featured resources,
   **When** I click the "star" icon again on a Featured resource,
   **Then** the Featured status is removed and the resource disappears from the "Featured Resources" section.

6. **Given** I am using the filter to show only specific resource types (e.g., "Templates"),
   **When** the filter is applied,
   **Then** the "Featured Resources" section is hidden, and I see only filtered resources from the main library (Featured status does not override filters).

7. **Given** multiple advisors use the platform,
   **When** I mark resources as Featured,
   **Then** my Featured selections are private and not visible to other advisors (advisor-specific isolation).

**Additional Criteria:**
- [ ] "Featured Resources" section appears as a separate, clearly labeled section in the Knowledge Center
- [ ] Featured resources within the section are sorted by the date they were marked Featured (most recent first)
- [ ] Visual distinction: Featured resources show a filled star (⭐), non-Featured show an empty star (☆)
- [ ] Star icon is clickable and provides hover feedback (cursor change, tooltip: "Add to Featured" / "Remove from Featured")
- [ ] No limit on the number of resources that can be Featured
- [ ] "Featured Resources" section displays resource type label for each item (e.g., "Template", "Article", "Case Study")
- [ ] Empty state: If no resources are Featured, "Featured Resources" section shows helpful message: "No featured resources yet. Click the star icon on any resource to add it here."
- [ ] Featured resources display only resource title and type label (no description/preview)

---

## 🔒 Business Rules

**Validation Rules:**
1. **No Limit**: Advisors can Feature unlimited number of resources
2. **Uniqueness**: A resource can only be Featured once per advisor (no duplicates)
3. **Persistence**: Featured status must persist across sessions and page refreshes
4. **Authorization**: Only the advisor who marked a resource as Featured can unfeature it
5. **Type Agnostic**: All 10 resource types can be Featured using the same mechanism

**Authorization:**
- **Who can perform this action:** Any logged-in External Advisor for their own Featured list
- **Who can view results:** Only the advisor who created the Featured list (private to each advisor)

**Edge Cases:**
- **Resource deleted from library**: If a Featured resource is deleted from the global library, it is automatically removed from the advisor's Featured list
- **Concurrent advisors**: If Advisor A features a resource while Advisor B is viewing the library, Advisor B's view does not change (client-side state not affected)
- **Filter interaction**: When type filters are active, "Featured Resources" section is hidden to avoid confusion; Featured status indicators (⭐) remain visible on filtered resources
- **Empty Featured section**: If advisor has no Featured resources, section displays with empty state message and onboarding hint

**Resource Types (All Supported):**
- Articles
- Case Studies
- Best Practices
- Constitution Templates
- Learning Path Templates
- Checklists
- Video Tutorials
- Webinar Recordings
- Podcasts
- Research Papers

---

## 🧪 Test Scenarios

**Happy Path:**
1. Login as External Advisor → Navigate to Knowledge Center → Click star icon on "Family Meeting Facilitation Guide" (Template) → Verify resource appears in "Featured Resources" section with ⭐ indicator → Verify resource type label shows "Template"
2. Feature multiple resources of different types (Article, Case Study, Checklist) → Verify all appear together in "Featured Resources" section → Verify each shows correct type label → Verify sorted by Featured date (most recent first)
3. Click filled star (⭐) on a Featured resource in "Featured Resources" section → Verify resource disappears from section → Verify star becomes empty (☆) in main library
4. Feature 15+ resources → Verify no error, all resources display in "Featured Resources" section

**Negative Tests:**
1. **Unauthorized access**: Attempt to unfeature a resource Featured by another advisor (via API manipulation) → Verify operation fails with authorization error
2. **Invalid resource ID**: Attempt to feature a non-existent resource → Verify graceful error handling
3. **Duplicate featuring**: Attempt to feature already-Featured resource → Verify system prevents duplicate (no error, just ignore action)

**Edge Cases:**
1. **Persistence test**: Feature 3 resources of different types → Logout → Login again → Verify "Featured Resources" section displays all 3 resources with correct types
2. **Resource deletion**: Feature resource "Succession Planning Template" → Have admin delete template from global library → Verify resource automatically removed from Featured section → Verify no broken state
3. **Filter interaction**: Feature 5 resources (2 Articles, 3 Templates) → Apply filter "Show only Articles" → Verify "Featured Resources" section is hidden → Verify 2 Featured Articles still show ⭐ in filtered view → Remove filter → Verify "Featured Resources" section reappears with all 5 resources
4. **Empty state**: Login as new advisor with no Featured resources → Navigate to Knowledge Center → Verify "Featured Resources" section shows empty state message with guidance
5. **Resource type display**: Feature resources from all 10 types → Verify each displays correct type label in "Featured Resources" section

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Star icon click response time: < 300ms (visual feedback + API call)
- "Featured Resources" section load time on page refresh: < 1 second
- Featuring/unfeaturing action: < 500ms update

**Security:**
- Authorization required: Yes - Must be logged-in External Advisor
- Data encryption: Not required (non-sensitive data)
- Advisor isolation: CRITICAL - Featured lists must be advisor-specific (not family-specific)

**Accessibility:**
- WCAG level: AA
- Keyboard navigation: Required (Tab to star icon, Enter/Space to toggle)
- Screen reader support: Required ("Add [resource name] to Featured" / "Remove [resource name] from Featured")
- Empty state message must be screen-reader accessible

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Edge: Latest 2 versions

---

## 📝 Notes

**Open Questions:**
- [x] **Q: Should Featured resources be sorted within the Featured section?**
  - A: Yes, sort by date Featured (most recently Featured first)
  
- [x] **Q: What happens if a Featured resource is updated in the global library?**
  - A: Featured status persists; updated content displays with Featured marker
  
- [x] **Q: Should there be a limit on Featured resources?**
  - A: No, unlimited Featured resources allowed
  
- [x] **Q: How should Featured section interact with type filters?**
  - A: "Featured Resources" section hidden when filters active; Featured indicators (⭐) remain visible on filtered items
  
- [x] **Q: Should Featured resources be grouped by type within the section?**
  - A: No, all Featured resources displayed together with type labels
  
- [x] **Q: Should we show empty state when no Featured resources?**
  - A: Yes, with helpful onboarding message

- [x] **Q: Should there be analytics on which resources are Featured most across all advisors?**
  - A: No, out of scope
  
- [x] **Q: Should Featured resources display resource description/preview in the Featured section?**
  - A: No, only title and type label

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-22
