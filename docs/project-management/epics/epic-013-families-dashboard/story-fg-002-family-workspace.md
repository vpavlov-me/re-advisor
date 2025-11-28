# User Story: Family Workspace - Overview Section

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As an advisor, I want to open a dedicated workspace modal for each family with overview of family details, so that I can quickly understand family context and my engagement scope  
**Epic Link:** FG-XXX [Family Client Management Workspace]  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As an** advisor (Personal Family Advisor, External Consul, or Consultant),  
**I want to** open a dedicated workspace modal for each family with overview of family details,  
**so that** I can quickly understand family context, structure, and my engagement scope before diving into specific work (tasks, services, consultations).

---

## 🎯 Business Context

**Why is this Story important?**

Advisors work with multiple families simultaneously and need a **centralized entry point** to understand each family's context before performing specific actions. Currently, there's no dedicated space to see:
- Who the family is (characteristics, structure)
- What my role is with them
- What services they need from me
- How many members they have and their roles

**Business value:**
- **Increased efficiency**: Quick context switching between families
- **Better service quality**: Full understanding before engaging with family
- **Reduced cognitive load**: All essential family information in one place
- **Professional presentation**: Organized workspace shows platform maturity

**Strategic alignment:**
This is the **foundation** for all advisor-family interactions. Before advisor can manage tasks, propose services, or track consultations, they need to understand who they're working with.

---

## ✅ Acceptance Criteria

1. **Given** I'm logged in as advisor with access to family list,  
   **When** I click "View" button in family table row,  
   **Then** full-screen modal opens with Family Workspace.

2. **Given** Family Workspace modal is open,  
   **When** modal renders,  
   **Then** I see:
   - Modal header with family name
   - Close button (X) in top-right corner of header
   - Left sidebar with navigation items: Overview | Tasks | Services | Consultations
   - Overview section is active by default (highlighted in sidebar)
   - Main content area displays overview information

3. **Given** Overview section is displayed,  
   **When** I look at main content area,  
   **Then** I see the following information organized clearly:
   - **Family Name** (as title)
   - **Family Description/Characteristics** (text paragraph showing what makes this family unique, special considerations) - **only if provided by family**
   - **Family Structure** section showing:
     - Total member count (minimum 1)
     - Member roles breakdown (e.g., "3 Family Council Members, 8 Regular Members")
   - **My Role** section showing:
     - Badge with my role type (e.g., "External Consul", "Personal Family Advisor", "Consultant")
   - **Services Needed** section showing:
     - List or description of services this family needs from me

4. **Given** Family Workspace modal is open,  
   **When** I click close button (X),  
   **Then** modal closes and I return to family list table.

5. **Given** Family Workspace modal is open,  
   **When** I click outside modal area (on backdrop),  
   **Then** modal does NOT close (prevents accidental closing).

6. **Given** Family Workspace modal is open,  
   **When** I press ESC key,  
   **Then** modal does NOT close (prevents accidental closing).

**Additional Criteria:**
- [ ] Modal occupies full screen (covers entire viewport)
- [ ] Overview section is clean, scannable, and well-organized
- [ ] All text is readable (proper font sizes, contrast)
- [ ] Loading state shown while fetching family data
- [ ] Error state shown if family data fails to load
- [ ] If family description is not provided, section is hidden (not shown as empty)
- [ ] Family description displays without character limit (full text)

---

## 📏 Design & UX

**User Flow:**
1. Advisor views family list table in Advisor Portal
2. Advisor identifies family they want to work with
3. Advisor clicks "View" button in that family's row
4. Full-screen modal opens with smooth animation
5. Overview section loads and displays family information
6. Advisor reviews information to understand context
7. Advisor can either:
   - Close modal (X button) to return to list
   - Navigate to other sections (Tasks, Services, Consultations) via sidebar

**UX Considerations:**
- **Full-screen modal** provides maximum focus on single family
- **Sidebar navigation** is always visible for quick section switching
- **Overview first** gives context before diving into operational details
- **Close protection** (no accidental closing) prevents workflow disruption
- **Clear information hierarchy** in overview for quick scanning
- **Conditional rendering**: Only show sections that have data (e.g., hide description if empty)

---

## 🔒 Business Rules

**Validation Rules:**
1. **Access Control**: Advisor must have established relationship with family (invited as Personal FA/External Consul OR booked as Consultant)
2. **Data Visibility**: Advisor only sees families they're associated with
3. **Role Display**: Advisor's role badge reflects their actual relationship type with family
4. **Family Description**: Optional field - show only if provided, hide section completely if empty
5. **Character Limits**: No character limit for family description (full text display)
6. **Member Count**: Minimum 1 family member always exists (business constraint)

**Authorization:**
- **Who can perform this action:** All advisor types (Personal FA, External Consul, Consultant)
- **Who can view results:** Only the advisor associated with that family

**Edge Cases:**
- **No family description**: Hide description section entirely
- **No services needed defined**: Show "No specific services defined yet" message
- **Family data loading fails**: Show error message with retry option
- **Single family member**: Display "1 member" (singular form)

---

## 🧪 Test Scenarios

**Happy Path:**
1. Advisor logs in with multiple families
2. Clicks "View" on Family A
3. Modal opens full-screen with Overview section
4. All family information displays correctly (with description)
5. Advisor reviews information
6. Clicks X button, modal closes

**Role-Specific Scenarios:**

**Personal Family Advisor:**
1. Opens workspace for family they advise
2. Sees "Personal Family Advisor" badge
3. Sees limited service scope (1-7 modules)
4. Can view overview information

**External Consul:**
1. Opens workspace for family they serve
2. Sees "External Consul" badge
3. Sees full governance scope mentioned
4. Can view overview information

**Consultant:**
1. Opens workspace for client family
2. Sees "Consultant" badge
3. Sees marketplace services or ongoing engagement
4. Can view overview information

**Edge Cases:**

1. **No family description provided**:
   - System hides description section completely
   - Other sections still display normally
   - No empty state or placeholder shown

2. **Empty services needed**:
   - Shows "No specific services defined yet" message
   - Section remains visible (not hidden)

3. **Single family member**:
   - Shows "1 member" (singular)
   - Shows role breakdown for that single member

4. **Loading timeout**:
   - Shows timeout error after 10 seconds
   - Provides "Retry" button

5. **Unauthorized access attempt**:
   - User not associated with family tries to open workspace
   - System blocks access (shouldn't happen with proper frontend routing)

6. **Very long family description** (no character limit):
   - Description displays in full
   - Proper text wrapping and spacing
   - No truncation

---

## 📝 Notes

**Open Questions:**
- ✅ **Modal size?** Full-screen confirmed
- ✅ **Close behavior?** Only via X button (no backdrop, no ESC)
- ✅ **What in Overview?** Family info, structure, my role, services needed
- ✅ **Default active section?** Overview
- ✅ **Loading states?** Yes, needed
- ✅ **Should family description be required?** No, optional - hide section if empty
- ✅ **Max character limit for family description?** No limit, full text display
- ✅ **What if family has no members yet?** Impossible - minimum 1 member always exists

**Design Notes:**
- Consider card-based layout for overview sections
- Use visual hierarchy (headings, spacing, grouping)
- Badge should be prominent and color-coded by role
- Family structure could use icons for visual appeal
- Long descriptions need proper text wrapping and readability
- Consider collapsible sections if content becomes too long

**Implementation Notes:**
- Conditional rendering for family description (only if data exists)
- Handle singular/plural for member count ("1 member" vs "N members")
- No truncation logic needed for description (full display)

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-23