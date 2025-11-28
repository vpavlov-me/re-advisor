---
doc_id: "FG-XXX"
title: "User Story: External Consul Content Creation & Management"
type: "user-story"
category: "development"
audience: "developer|qa|product-manager"
complexity: "intermediate"
created: "2025-10-23"
updated: "2025-10-23"
version: "1.0.0"
status: "draft"
tags: ["user-story", "external-consul", "content-creation", "constitution", "education"]
related: ["FG-24", "DOC-USR-005"]
epic_link: "FG-24"
priority: "high"
---

# User Story: External Consul Content Creation & Management

---

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As an External Consul, I want to create and manage constitution sections and educational resources with full edit capabilities
**Epic Link:** FG-24 [External Consul Content Creation & Management]
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As an** External Consul (serving as strategic governance partner for a family),
**I want to** create, edit, and manage constitution sections and educational resources within the family's governance platform,
**so that** I can develop comprehensive governance frameworks and learning materials that guide the family toward governance maturity.

---

## 🎯 Business Context

**Why is this Story important?**

External Consuls are strategic governance partners with full access to family governance. Their primary value proposition includes:

- **Constitution Development**: Creating and structuring family governance documents, values, mission statements, and governance frameworks
- **Educational Program Design**: Developing learning paths, courses, and educational materials tailored to family's specific governance needs
- **Knowledge Transfer**: Building family capability through structured educational content

Currently, External Consuls can only view existing content but cannot create or edit governance materials. This limits their ability to deliver core advisory services and forces them to work outside the platform (documents, emails), reducing transparency and collaboration efficiency.

**Business Value:**
- Enables External Consuls to deliver core advisory services directly in platform
- Increases platform stickiness for high-value advisor relationships
- Improves family-advisor collaboration transparency
- Reduces reliance on external tools (Google Docs, email)
- Positions platform as comprehensive governance workspace

**User Pain Point Being Solved:**
External Consuls currently must create governance frameworks and educational materials outside the platform, then manually upload or share with families, creating workflow fragmentation and version control issues.

---

## ✅ Acceptance Criteria

### Constitution Section Management

1. **Given** I am logged in as External Consul associated with Family A,
   **When** I navigate to Constitution module for Family A,
   **Then** I see "Create New Section" button and can create constitution sections (title, content, section_type).

2. **Given** I have created a constitution section for Family A,
   **When** I view the constitution,
   **Then** I see my created section with "Edit" and "Delete" options available only to me and Family Council members.

3. **Given** I am viewing a constitution section I created,
   **When** I click "Edit" and modify content,
   **Then** changes are saved with version history tracking (who edited, when).

4. **Given** I created a constitution section that is not yet published,
   **When** I click "Delete",
   **Then** section is permanently removed (with confirmation prompt).

5. **Given** I am External Consul for Family A but not Family B,
   **When** I try to access Family B's constitution,
   **Then** I receive authorization error (family_id isolation enforced).

### Educational Resource Management

6. **Given** I am logged in as External Consul for Family A,
   **When** I navigate to Education module,
   **Then** I see "Create Resource" button and can create educational resources (title, description, content_type, resource_url, module_tags).

7. **Given** I have created an educational resource,
   **When** Family Council or family members view education catalog,
   **Then** my resource appears with metadata showing I am the creator.

8. **Given** I am viewing an educational resource I created,
   **When** I click "Edit",
   **Then** I can modify all fields (title, description, content, tags, visibility).

9. **Given** I have created an educational resource,
   **When** I click "Delete" (with confirmation),
   **Then** resource is removed from family's education catalog.

10. **Given** I create educational resource for Family A,
    **When** I switch context to Family B (where I am also External Consul),
    **Then** Family A's resources are not visible in Family B context.

### Content Visibility & Permissions

11. **Given** I create constitution section or educational resource,
    **When** content is saved,
    **Then** it is immediately visible to all Family Council members and family members (no approval workflow in this story).

12. **Given** Family Council member views content I created,
    **When** they see creator metadata,
    **Then** my name and "External Consul" role are displayed clearly.

13. **Given** I am External Consul with content creation permissions,
    **When** I view constitution sections or educational resources created by Family Council,
    **Then** I can edit those items (full edit rights across family content).

### Multi-Family Context

14. **Given** I am External Consul for multiple families (Family A, Family B),
    **When** I create content in Family A context,
    **Then** content is tagged with Family A's family_id and not accessible from Family B context.

15. **Given** I switch between family contexts in Advisor Portal,
    **When** I navigate to Constitution or Education modules,
    **Then** I see only content relevant to currently selected family.

---

## 🔐 Business Rules

### Validation Rules

**Constitution Sections:**
1. **Title**: Required, 3-200 characters, unique within family
2. **Content**: Required, rich text format supported, max 50,000 characters
3. **Section Type**: Required, one of: [Values, Mission, Governance Structure, Amendment Process, Custom]
4. **Status**: Draft or Published (default: Draft)

**Educational Resources:**
1. **Title**: Required, 3-200 characters
2. **Description**: Required, 10-1000 characters
3. **Content Type**: Required, one of: [Article, Video, Course, Workshop, Guide, Template]
4. **Resource URL**: Optional, valid URL format if provided
5. **Module Tags**: Optional, multi-select from: [Constitution, Succession, Philanthropy, Education, Conflicts, Decision-Making, Assets, Mentorship, Family-Management, Family-Council]
6. **Visibility**: Public (all family members) or Council-Only (default: Public)

### Authorization

**Who can create content:**
- External Consul (for families they are associated with)
- Family Council Members (for their family)
- Admin (for any family - system override)

**Who can edit content:**
- Content creator (External Consul or Family Council member who created it)
- Other Family Council members (collaborative editing)
- Admin (system override)

**Who can delete content:**
- Content creator only (unless published and in active use)
- Admin (system override)

**Who can view content:**
- All family members (if visibility = Public)
- Family Council members only (if visibility = Council-Only)
- External Consul (all content in associated families)

### Edge Cases

**Edge Case 1: External Consul association removed**
- Expected behavior: Content created by External Consul remains in family's system with creator attribution, but External Consul loses edit access

**Edge Case 2: Duplicate titles**
- Expected behavior: System allows duplicate titles across different families, but warns if title exists within same family's constitution

**Edge Case 3: Incomplete content**
- Expected behavior: Allow saving as "Draft" status with incomplete fields, require all mandatory fields for "Published" status

**Edge Case 4: Large content size**
- Expected behavior: Show character count, warn at 80% of limit, prevent save at 100% limit

**Edge Case 5: Concurrent editing**
- Expected behavior: Last-write-wins with warning if another user edited since page load

---

## 🧪 Test Scenarios

### Happy Path: Constitution Section Creation

**Scenario 1: Create and publish constitution section**
1. External Consul logs into Advisor Portal
2. Selects Family A from family context switcher
3. Navigates to Constitution module
4. Clicks "Create New Section"
5. Fills in: Title = "Family Values", Content = "Our core values...", Section Type = "Values"
6. Clicks "Save as Draft"
7. Reviews content, clicks "Publish"
8. **Expected Result**: Section appears in Family A's constitution, visible to all family members, shows External Consul as creator

**Scenario 2: Edit existing constitution section**
1. External Consul navigates to constitution section they created
2. Clicks "Edit"
3. Modifies content and title
4. Clicks "Save"
5. **Expected Result**: Changes saved, version history updated with timestamp and editor name

### Happy Path: Educational Resource Creation

**Scenario 3: Create educational resource with URL**
1. External Consul selects Family A context
2. Navigates to Education module
3. Clicks "Create Resource"
4. Fills in: Title = "Governance 101", Description = "Introduction to family governance", Content Type = "Course", Resource URL = "https://example.com/course", Module Tags = [Constitution, Family-Council]
5. Sets Visibility = "Public"
6. Clicks "Save"
7. **Expected Result**: Resource appears in Family A's education catalog, accessible to all family members

**Scenario 4: Create educational resource without URL**
1. External Consul creates resource with embedded content (no external URL)
2. Uses rich text editor to write article directly in platform
3. Saves with Content Type = "Article"
4. **Expected Result**: Resource saved with embedded content, accessible via platform

### Negative Tests

**Scenario 5: Unauthorized family access**
1. External Consul associated with Family A only
2. Attempts to access Family B's constitution API endpoint directly
3. **Expected Result**: 403 Forbidden error, "Not authorized for this family"

**Scenario 6: Invalid content validation**
1. External Consul attempts to create constitution section with title = "Ab" (too short)
2. Attempts to save
3. **Expected Result**: Validation error displayed: "Title must be at least 3 characters"

**Scenario 7: Missing required fields**
1. External Consul fills title but leaves content empty
2. Attempts to publish (change status from Draft to Published)
3. **Expected Result**: Validation error: "Content is required for published sections"

### Edge Cases

**Scenario 8: Multi-family context switching**
1. External Consul creates constitution section in Family A context
2. Switches to Family B context (where also External Consul)
3. Navigates to Constitution module
4. **Expected Result**: Family A's section not visible, clean slate for Family B

**Scenario 9: Concurrent editing conflict**
1. External Consul opens constitution section for editing
2. Family Council member edits same section and saves
3. External Consul attempts to save changes
4. **Expected Result**: Warning displayed: "This section was modified by [Family Council Member] at [timestamp]. Your changes may overwrite theirs."

**Scenario 10: Content size limit**
1. External Consul pastes 60,000 characters into constitution content field
2. Attempts to save
3. **Expected Result**: Error: "Content exceeds maximum length of 50,000 characters. Current: 60,000"

---

## 📋 Notes

### Open Questions

**Q1: Should there be approval workflow before content becomes visible to family members?**
**A:** No, not in this story. External Consul has full trust as strategic partner. Approval workflows will be separate story if needed (FG-25).

**Q2: What happens to content if External Consul's association with family is removed?**
**A:** Content remains in family's system with creator attribution intact. External Consul loses edit access. This enables family to retain valuable work even if relationship ends.

**Q3: Can Family Council members edit content created by External Consul?**
**A:** Yes. Family Council has full edit rights on all family content regardless of creator. This enables collaborative governance document development.

**Q4: Should we track version history for all edits?**
**A:** Yes, basic version history (who, when, what changed) should be tracked for governance transparency and audit trail.

**Q5: What about content templates or starter kits?**
**A:** Out of scope for this story. Templates and starter content will be separate story (potentially FG-27 - Content Templates).

**Q6: Should Educational Resources support file uploads (PDFs, videos)?**
**A:** Initial implementation: URL links to external resources only. File upload capability is separate story (FG-28 - Resource File Management).

**Q7: How do we handle rich text formatting in content fields?**
**A:** Use standard rich text editor (TinyMCE or similar) supporting: bold, italic, lists, headings, links. Advanced formatting (tables, images) can be Phase 2.

**Q8: What about content duplication across families?**
**A:** External Consul may want to reuse constitution frameworks across families. Content duplication/templating is out of scope for this story but valuable future enhancement.

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-23
**Story Created:** Based on Epic FG-24 and External Consul persona (DOC-USR-005)
