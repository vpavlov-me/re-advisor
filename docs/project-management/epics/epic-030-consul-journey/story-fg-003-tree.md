# User Story - View Family Tree Structure

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As an External Consul, I want to view the complete family tree structure showing all members with their roles and relationships, so that I understand family dynamics, hierarchy, and can identify key stakeholders for governance discussions  
**Epic Link:** FG-XXX [External Consul Multi-Family Portal - Module Access & Navigation]  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As an** External Consul,  
**I want to** view the complete family tree structure showing all members with their roles, relationships, and assigned advisors,  
**so that** I can understand family dynamics, identify key stakeholders (especially Family Council members), coordinate with other advisors, and prepare effectively for governance consultations.

---

## 🎯 Business Context

**Why is this Story important?**

External Consuls work with 5-8 families simultaneously in deep, long-term relationships. Before any governance discussion, consultation, or family meeting, the Consul needs to quickly understand:

- **Family hierarchy and structure** - who leads, generations, family branches
- **Key decision-makers** - Family Council members who drive governance
- **Advisor landscape** - which advisors are already working with which family members to avoid duplication and coordinate efforts
- **Contact points** - how to reach specific members for follow-up

**User pain point being solved:**  
Currently, Consuls must manually ask family about structure, roles, and advisor assignments, or rely on memory from previous engagements. This creates:
- Wasted time in meetings clarifying "who is who"
- Risk of missing key stakeholders in governance discussions
- Potential conflicts with other advisors due to lack of visibility
- Inefficient context switching between families

**Business outcome expected:**  
- 30% reduction in pre-meeting preparation time
- Zero governance discussions without proper stakeholder identification
- Improved coordination between multiple advisors serving same family
- Faster onboarding when new Consul takes over family engagement

**Strategic alignment:**  
Enables Advisor Portal to provide comprehensive family context, making multi-family management efficient and professional consultations more effective.

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** I am logged in as External Consul with access to a family,  
   **When** I navigate to the Family module and select "Family Tree" tab,  
   **Then** I see hierarchical tree visualization with all family members starting from Family Head at the top.

2. **Given** I am viewing the family tree,  
   **When** I look at each member card,  
   **Then** I see: member name, role (Regular User/Family Council/Admin), contact information (email/phone), and list of assigned advisors.

3. **Given** I am viewing the family tree with Family Council members,  
   **When** I scan through members,  
   **Then** Family Council members are clearly distinguished with visual badge/indicator.

4. **Given** I am viewing a family tree with 30+ members,  
   **When** I interact with family branches,  
   **Then** I can expand/collapse branches to focus on relevant parts of the tree.

5. **Given** I am viewing the family tree,  
   **When** I need to find a specific member,  
   **Then** I can use search box to filter members by name, and see filtered results highlighted in tree.

6. **Given** I am viewing a member's assigned advisors,  
   **When** I see advisor names,  
   **Then** I see advisor role (Consul/Advisor/Mediator/Staff) and can identify who else is working with this member.

7. **Given** I am viewing a large family tree,  
   **When** I need to see more or less detail,  
   **Then** I can use zoom controls to zoom in/out and adjust tree scale.

8. **Given** I am viewing the family tree,  
   **When** the tree loads for first time,  
   **Then** complete tree renders in less than 1 second for families up to 50 members.

**Additional Criteria:**
- [ ] Tree structure correctly reflects generational hierarchy (parents above children)
- [ ] All relationship types are visually clear (spouse, child, sibling connections)
- [ ] Search highlights work for partial name matches
- [ ] Contact information is clickable (email opens mail client, phone initiates call on mobile)
- [ ] Advisor list shows all advisors, not limited to current user
- [ ] Empty state message appears if family has no members yet (edge case)
- [ ] Loading state appears during data fetch
- [ ] Error state with retry option appears if data fetch fails
- [ ] Zoom controls include: zoom in (+), zoom out (-), fit to screen, reset to 100%
- [ ] Inactive/archived family members continue to be displayed in tree structure

---

## 🎨 Design & UX

**User Flow:**

1. User (External Consul) logs into Advisor Portal
2. User selects specific family from Families list
3. User navigates to Family module in sidebar
4. User clicks "Family Tree" tab (default tab when opening Family module)
5. System loads and displays hierarchical family tree:
   - Family Head at top
   - Generations arranged top-to-bottom
   - Branches show family relationships
6. User sees member cards with:
   - Name and photo (if available)
   - Role badge (Regular/Council/Admin)
   - Contact icons (email, phone)
   - Assigned advisors list
7. User can:
   - Click expand/collapse controls on branches
   - Type in search box to filter members
   - Click contact information to initiate communication
   - Use zoom controls to adjust tree scale
   - Hover over elements to see tooltips with additional info
8. User gains understanding of family structure and identifies key stakeholders
9. User proceeds with consultation preparation or governance discussion planning

**Visual Design Notes:**
- Use hierarchical tree layout (vertical orientation)
- Generation-based visual grouping with connecting lines
- Member cards should be compact but readable
- Family Council badge should be prominent (color + icon)
- Advisor list should be secondary but visible
- Expandable branches indicated with clear +/- controls
- Search highlight in yellow/gold color
- Empty states with helpful illustrations
- Zoom controls positioned in top-right corner of tree view
- Inactive/archived members displayed with same styling as active members

---

## 🔒 Business Rules

**Visualization Rules:**
1. **Tree hierarchy**: Family Head always at top, generations flow downward
2. **Role visibility**: All members show their role badge (Regular User, Family Council, Admin)
3. **Advisor display**: Show ALL advisors assigned to each member, including current user
4. **Visual distinction**: Family Council members get distinctive badge/color
5. **Relationship lines**: Visual connectors between family members showing relationships
6. **Inactive members**: Inactive/archived family members continue to be displayed in tree structure

**Access & Permissions:**
- **Who can view**: External Consuls with association to this family (via family_advisor_associations)
- **Data scope**: Only view members from current family, no cross-family data
- **Family structure read-only**: Consul cannot edit members, roles, or relationships
- **Advisor management**: Consul CAN manage permissions for assigned advisors (this functionality is in separate story)
- **Advisor visibility**: Consul can see all advisors (including other Consuls, Mediators, Advisors, Staff) assigned to family members

**Data Display Rules:**
- If member has no assigned advisors: show "No advisors assigned"
- If member has no contact information: show placeholder or "Not provided"
- If member photo not available: show default avatar with initials
- Tree always shows complete structure, no partial views
- Inactive/archived members remain visible in tree

**Edge Cases:**
- **Single member family**: Show single card, inform that no tree structure exists yet
- **Very large families (50+ members)**: Implement pagination or lazy loading of branches, show member count
- **No relationships defined**: Show flat list with message "Family structure not yet configured"
- **Orphaned members**: Show separately in "Unassigned Members" section

---

## 🧪 Test Scenarios

**Happy Path:**

1. **View complete family tree**
   - External Consul logs in and selects Family A
   - Navigates to Family > Family Tree tab
   - Sees hierarchical tree with Family Head "John Smith" at top
   - Sees 3 children cards below with connecting lines
   - Each member card shows name, role, email, phone
   - Family Council member "Sarah Smith" has distinctive badge
   - Each member card lists assigned advisors (e.g., "Jane Advisor - Wealth Advisor", "Mike Mediator - Conflict Mediator")
   - Tree loads in < 1 second
   - ✅ Consul understands family structure and identifies key stakeholders

2. **Search for specific member**
   - Consul views family tree with 20 members
   - Types "Robert" in search box
   - Tree filters/highlights 2 members: "Robert Smith Sr." and "Robert Smith Jr."
   - Consul can see both Roberts' positions in tree hierarchy
   - ✅ Consul quickly finds target member

3. **Expand/collapse large family branches**
   - Consul views family with 40 members across 4 generations
   - All branches initially collapsed except Generation 1
   - Consul clicks expand on "Smith Branch" 
   - Branch expands showing 15 members
   - Consul clicks collapse, branch collapses
   - ✅ Consul can focus on relevant family portions

4. **Use zoom controls for large tree**
   - Consul views family tree with 60 members
   - Initial view at 100% requires scrolling
   - Consul clicks "Fit to Screen" button
   - Tree zooms out to show entire structure
   - Consul clicks "+" to zoom in on specific branch
   - Tree zooms to 150%, shows detail
   - Consul clicks "Reset" to return to 100%
   - ✅ Consul can adjust view for optimal readability

**Negative Tests:**

1. **Unauthorized access attempt**
   - Consul tries to access family tree for Family B (not associated)
   - System prevents access and shows "No permission" message
   - Consul cannot see any Family B data
   - ✅ Data isolation enforced

2. **Attempt to edit member information**
   - Consul views member card for "Jane Doe"
   - Looks for edit button/pencil icon on member information - none present
   - Clicks on member name - no edit mode opens
   - Tries keyboard shortcuts - no edit functionality for family structure
   - ✅ Read-only mode for family structure enforced

3. **Invalid search query**
   - Consul searches for "ZZZZZZ" (non-existent name)
   - System shows "No members found" message
   - Original tree remains visible
   - Search box can be cleared to return to full view
   - ✅ Graceful handling of no results

**Edge Cases:**

1. **Single member family (no tree structure)**
   - Consul accesses newly created family with only 1 member
   - System shows single member card
   - Message displays: "This family currently has one member. Tree structure will appear when more members are added."
   - ✅ Appropriate empty state

2. **Very large family (50+ members)**
   - Consul accesses family with 60 members
   - Initial view shows Generation 1 (10 members) expanded
   - Other generations collapsed with counts: "Generation 2 (25 members)", "Generation 3 (20 members)", etc.
   - Consul can expand/collapse any generation
   - Performance remains < 2 seconds for expansion
   - ✅ Large family handled gracefully

3. **Member with no assigned advisors**
   - Consul views member "Tommy Smith" (young child)
   - Advisor section shows: "No advisors assigned"
   - Rest of card displays normally
   - ✅ Graceful handling of empty advisor list

4. **Network error during tree load**
   - Consul navigates to Family Tree tab
   - Network fails during data fetch
   - System shows error message: "Unable to load family tree. Please retry."
   - Retry button appears
   - Consul clicks retry, tree loads successfully
   - ✅ Error recovery works

5. **Inactive/archived family members**
   - Consul views family tree with 2 inactive members
   - Inactive members "Michael Smith" and "Lisa Johnson" appear in tree structure
   - Tree displays complete family including inactive members
   - ✅ Inactive members remain visible in structure

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Tree rendering time: < 1 second for families up to 50 members
- Expand/collapse branch action: < 500ms response
- Search filtering: < 200ms to highlight results
- Initial page load (including data fetch): < 2 seconds
- Zoom actions: < 300ms response time

**Usability:**
- Tree should be intuitive without training for users familiar with org charts
- Touch targets (expand/collapse buttons) must be minimum 44x44px for mobile/tablet
- Color contrast for badges must meet WCAG AA standards
- Keyboard navigation: Tab through members, Enter to expand/collapse, Esc to clear search
- Zoom levels: Support fit-to-screen, 50%, 75%, 100%, 125%, 150%, 200%

**Security:**
- Association-based access control must be enforced (only families where consul is associated)
- No cross-family data leakage in any scenario
- Advisor PII (personal information) displayed must respect encryption/privacy rules

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Edge: Latest 2 versions
- Mobile browsers: iOS Safari, Chrome Android

**Accessibility:**
- Keyboard navigation support required
- Screen reader compatibility for tree structure
- ARIA labels for expand/collapse controls
- Focus indicators visible
- Zoom controls accessible via keyboard

---

## 📝 Notes

**Design Considerations:**
- Tree visualization library recommendation: React-based tree component with virtualization support for performance
- Consider org-chart style layout (vertical) vs genealogy style (horizontal) - **Decision: Vertical org-chart style preferred per UX research**
- Photo/avatar size should be optimized for performance (thumbnails, lazy loading)
- Consider mobile/tablet responsive layout - may need different visualization pattern for small screens
- Zoom controls should be intuitive and always visible

**Questions (Answered from Epic Discussion):**
- ✅ **Q: Should consul see advisors from other families assigned to same person?** A: No, only advisors associated with current family context
- ✅ **Q: What if family head is not defined?** A: System should handle gracefully - show all Generation 1 members at top level
- ✅ **Q: Should tree show historical members (deceased, former)?** A: Out of scope for v1, only show active family members
- ✅ **Q: Do we need to show relationship types (parent/child vs spouse)?** A: Yes, relationship lines should have visual distinction (solid line for parent-child, dashed for spouse)
- ✅ **Q: What detail level for assigned advisors?** A: Show advisor name, role type (Consul/Advisor/Mediator/Staff), no contact info in tree view (contact info accessed elsewhere)
- ✅ **Q: Search behavior - filter view or highlight?** A: Highlight matching members in existing tree structure, don't filter out non-matches
- ✅ **Q: Performance target for very large families (100+ members)?** A: Use virtualization and pagination, no hard limit on family size, performance should degrade gracefully
- ✅ **Q: Should we show inactive/archived family members with different visual styling, or completely hide them?** A: Continue to display inactive/archived members in tree structure with same styling
- ✅ **Q: What zoom levels should be available for very large trees?** A: Provide zoom controls (fit-to-screen, 50%, 75%, 100%, 125%, 150%, 200%)
- ✅ **Q: Should advisor role badges have tooltips explaining role definitions?** A: No tooltips needed

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-21  
**Story Created By:** Product Team  
**Related Epic:** FG-XXX External Consul Multi-Family Portal
