---
title: "Guide Resource Type Missing Content Field"
category: "bug"
audience: "developer|qa|product-manager"
created: "2025-11-21"
updated: "2025-11-21"
version: "1.0.0"
status: "fixed"
tags: ["bug", "frontend", "ui", "knowledge-base", "blocker"]
owner: "product-team"
maintainer: "product-team"
reviewer: ""
assignee_frontend: "a.manchenkova@reluna.com"
assignee_backend: "i.tkachev@reluna.com"
---

# Bug: Guide Resource Type Missing Content Field

> **Issue:** When creating a Guide resource, the form lacks a content input field, making it impossible to add guide content

---

## 📋 Basic Information

**Issue Type:** Bug
**Project:** FG
**Summary:** Guide resource creation form does not have a content input field - users cannot add guide content
**Original Epic:** EPIC-008 Knowledge Center
**Assignee Frontend:** a.manchenkova@reluna.com
**Assignee Backend:** i.tkachev@reluna.com
**Priority:** High
**Severity:** Major
**Tags:** `bug`, `frontend`, `ui`, `knowledge-base`, `blocker`, `guide`
**Story Points:** [To be estimated]
**Sprint:** [To be assigned during sprint planning]

---

## 🐛 Bug Description

**What is broken?**

When a user attempts to create a new resource of type "Guide" in Knowledge Base:
- The "Create New Resource" form displays Basic Information section (Type, Folder, Title, Description) ✅
- **However, there is NO content input field for entering the actual guide content**
- The form shows no "Guide Content" section or rich text editor
- Without a content field, users cannot add the guide instructions/steps/content
- This makes the Guide resource type completely unusable
- Users can only fill in Title and Description, but not the actual guide content

**Business Impact:**
- **BLOCKER:** Users cannot create Guide resources with any meaningful content
- Guide resource type is essentially non-functional
- Limits Knowledge Base content types available to users
- Guides are typically important instructional content - blocks documentation workflows
- Similar to the Article content field bug (bug-article-content-field-non-functional.md)

---

## 👥 Affected Users

**Who is impacted by this bug?**

- **Primary Personas:** Family Members, Advisors, Administrators - anyone creating Guide resources
- **User Impact Level:** All users attempting to create Guide type resources
- **Frequency:** Every time (100% reproduction rate)
- **Severity:** Complete blocker for Guide content creation

---

## ✅ Expected Behavior

**What SHOULD happen:**

1. User navigates to Knowledge Base
2. User clicks "+ Create Resource"
3. User selects "Guide" from Type dropdown
4. Form displays:
   - **Basic Information section** (Type, Folder, Title, Description) ✅
   - **Guide Content section** with content input field/editor ❌ MISSING
5. Guide Content section should include:
   - Rich text editor (formatting options: bold, italic, headings, lists, etc.)
   - OR Markdown editor with preview
   - OR Structured step-by-step input fields (for step-by-step guides)
   - Clear input area where user can type/paste guide content
6. User enters guide content (instructions, steps, procedures, etc.)
7. User clicks "Save" button
8. Guide resource is created successfully with full content

**Expected Guide content structure:**
- Could be free-form text with rich formatting
- Could be structured steps (Step 1, Step 2, etc.)
- Should support images, links, formatting
- Should be appropriate for instructional/procedural content

---

## ❌ Actual Behavior

**What ACTUALLY happens:**

1. User navigates to Knowledge Base
2. User clicks "+ Create Resource"
3. User selects "Guide" from Type dropdown
4. Form displays:
   - **Basic Information section** (Type, Folder, Title, Description) ✅
   - **No Guide Content section** ❌
5. **BUG: No content input field visible or available**
   - No text editor component
   - No content input area
   - No structured step fields
   - Only Title and Description can be filled
6. User can only save a Guide with Title/Description but no actual guide content
7. **Guide resources are created without meaningful content** (if save is even possible)

---

## 📸 Evidence

**Screenshots/Videos:**
- [Screenshot/video to be provided showing Guide creation form]

**Expected to show:**
- "Create New Resource" modal with "Guide" type selected
- Basic Information section filled (Type: Guide, Title, Description)
- No "Guide Content" section visible below Basic Information
- Only "Save" button at bottom, no content input area

**Comparison needed:**
- Article type: Shows "Article Content" section with content field (though non-functional - see bug-article-content-field-non-functional.md)
- Checklist type: Shows "Checklist" section with checklist items
- Guide type: Shows NOTHING for guide content (this bug)

---

## 🔄 Steps to Reproduce

**Environment:**
- Application: RE:Advisor (Family Governance Platform)
- Module: Knowledge Center / Knowledge Base
- Feature: Create New Resource (Guide type)
- User Role: [Any role with Knowledge Base resource creation access]

**Steps:**
1. Navigate to Knowledge Center → Knowledge Base
2. Click "+ Create Resource" button
3. "Create New Resource" modal opens
4. In "Basic Information" section:
   - Type: Select "Guide" from dropdown
   - Folder: Choose folder or leave as "Choose folder"
   - Title: Enter any title (e.g., "Test Guide")
   - Description: Enter any description (optional)
5. Scroll down to look for guide content input section
6. **BUG:** No "Guide Content" section or content input field exists
7. Verify form only contains Basic Information, no content area
8. Try to save (if allowed) - guide would be created without content

**Reproduction Rate:** 100% (consistently missing content field for Guide type)

**Comparison Test:**
- Repeat steps with "Article" type → Article Content section appears (but may be non-functional)
- Repeat steps with "Checklist" type → Checklist section appears with item inputs
- Repeat steps with "External Link" type → URL field appears
- **Guide type** → No content-specific section appears

---

## 🔍 Root Cause Analysis (Initial Hypothesis)

**Potential causes:**

1. **Component not implemented:**
   - Guide content component was never built
   - Type-specific form section missing for Guide type
   - Guide may have been added to type dropdown but form not updated

2. **Conditional rendering issue:**
   - Guide content component exists but conditional render logic is broken
   - Switch/case missing Guide type case
   - Component not registered in form component map

3. **Configuration missing:**
   - Guide type not properly configured in form builder
   - Resource type definitions incomplete for Guide
   - Form schema missing Guide content field definition

4. **Copy-paste oversight:**
   - Guide type added to dropdown menu but no corresponding form section created
   - Development incomplete - Guide type partially implemented

5. **Similar to Article bug:**
   - This may be the same root cause as bug-article-content-field-non-functional.md
   - Rich text editor component failing to load/render for both Article and Guide
   - If Article editor is fixed, Guide may be fixed as well (or vice versa)

**Investigation needed:**
- Check if Guide type is supposed to have content field (requirements)
- Review code for type-specific form sections (Article, Checklist, External Link, Guide)
- Check if Guide content component exists in codebase but not being rendered
- Determine if Guide and Article share same editor component
- Check backend API - does it expect content field for Guide type?

---

## 🛠 Technical Context

**Related Components:**
- **Frontend:** Guide resource creation form component (React)
- **Frontend:** Resource type form builder/renderer
- **Frontend:** Type-specific content sections (Article, Checklist, Guide, External Link)
- **Frontend:** Possibly shared rich text editor component with Article type
- **Backend API:** POST endpoint for creating Guide resources
- **Backend:** Resource type definitions and validation

**Expected component structure:**
```jsx
// Simplified pseudocode
<CreateResourceForm>
  <BasicInformationSection />

  {type === 'article' && <ArticleContentSection />}
  {type === 'checklist' && <ChecklistSection />}
  {type === 'external_link' && <ExternalLinkSection />}
  {type === 'guide' && <GuideContentSection />}  {/* ← MISSING? */}

  <SaveButton />
</CreateResourceForm>
```

**Repository References:**
- **Technical Implementation:** See `../FG/frontend/` (Knowledge Center module)
- **Component:** Resource creation form → Guide-specific section
- **Related Bug:** bug-article-content-field-non-functional.md (similar issue with Article type)

---

## ✅ Acceptance Criteria for Fix

**Definition of Done:**

**Functional Requirements:**
- [ ] Guide resource creation form displays a Guide Content section
- [ ] Guide Content section includes a functional content input field/editor
- [ ] User can enter text content for the guide
- [ ] Content input supports appropriate formatting for guides:
  - [ ] Headings (H1, H2, H3)
  - [ ] Bold, italic, underline
  - [ ] Numbered and bulleted lists
  - [ ] Links and images (if applicable)
  - [ ] Code blocks (if applicable for technical guides)
- [ ] User can save Guide resource with content
- [ ] Saved Guide displays content correctly when viewed

**Editor Requirements:**
- [ ] If using rich text editor:
  - [ ] Toolbar visible with formatting options
  - [ ] Editor responds to user input
  - [ ] Formatting buttons functional
- [ ] If using structured guide builder:
  - [ ] Step-by-step input fields available
  - [ ] Can add/remove steps
  - [ ] Steps save correctly
- [ ] Placeholder text shown in empty editor (e.g., "Enter guide content...")
- [ ] Content persists when switching between form fields

**Consistency Requirements:**
- [ ] Guide content input follows same UX patterns as other resource types
- [ ] Editor component consistent with Article editor (if shared)
- [ ] Validation works correctly (content required or optional based on requirements)

**Testing Requirements:**
- [ ] Verified on Chrome, Firefox, Safari, Edge
- [ ] Copy/paste works in content field
- [ ] Long content handled without performance issues
- [ ] Guide content saves to backend correctly
- [ ] Guide content displays correctly after saving

---

## 🧪 Test Scenarios

### Happy Path
- [ ] User selects Guide type, content editor appears and is functional
- [ ] User enters guide content with formatting, saves successfully
- [ ] Created guide displays content correctly in Knowledge Base view
- [ ] User can edit guide and modify content after creation

### Edge Cases
- [ ] User enters very long guide content (5000+ words) - editor remains responsive
- [ ] User pastes formatted content from external source - formatting handled appropriately
- [ ] User enters special characters, emojis, Unicode - content saved correctly
- [ ] User creates guide with minimal content (single sentence) - saves successfully

### Error Handling
- [ ] If content is required but empty - clear validation error shown
- [ ] Editor fails to load - fallback or clear error message displayed
- [ ] Network error during save - appropriate error handling

### Comparison with Other Types
- [ ] Article type has functional content editor
- [ ] Checklist type has functional checklist section
- [ ] External Link type has functional URL field
- [ ] **Guide type has functional content editor** ← this fix

---

## 🚨 Workaround

**Current user workaround:**

**No effective workaround for Guide type:**
- ❌ Cannot create Guide resources with content using Guide type
- ❌ No alternative input method available

**Temporary alternatives:**
1. **Use Article type instead:**
   - Create as "Article" resource type instead of "Guide"
   - Note: Article editor may also be non-functional (see bug-article-content-field-non-functional.md)

2. **Use Description field:**
   - Put guide content in Description field (not ideal - field not designed for long content)
   - Lacks formatting options
   - Poor UX

3. **Use External Link:**
   - Create guide in external tool (Google Docs, Notion, etc.)
   - Link to it as External Link resource
   - Loses in-platform benefits

**Impact:** Guide resource type is unusable for its intended purpose.

---

## 📊 Priority Justification

**Why is this High Priority / Major Severity?**

**Priority: High**
- **Feature blocker** - Guide resources cannot be created with content
- Affects core Knowledge Base functionality
- Guides are important content type (instructional/procedural content)
- Similar to Article content bug - may share root cause
- Needed for Knowledge Base to be fully functional

**Severity: Major**
- **Functionality completely missing** for Guide resource type
- Guide type is unusable for its intended purpose
- No viable workaround
- Blocks documentation and instructional content workflows
- Makes Guide resource type selection misleading (appears available but isn't functional)

**Business Justification:**
1. Guides are key content type for instructional material
2. Users expect to create guides for procedures, instructions, best practices
3. Missing functionality damages user trust and product quality perception
4. May be part of larger issue affecting multiple resource types
5. Should be fixed alongside Article content bug (if related)

**Recommended action:**
- **High priority in next sprint**
- Investigate alongside bug-article-content-field-non-functional.md
- May share same root cause and solution
- Quick fix if only missing component registration
- More complex if editor needs to be built from scratch

---

## 🔗 Related Issues

- **Epic:** EPIC-008 Knowledge Center
- **Related Bug:** bug-article-content-field-non-functional.md (Article editor non-functional)
- [Check if Guide and Article share same editor component]
- [Check if other resource types have similar missing content issues]
- [Verify if Guide type should have structured steps vs free-form content]

---

## 📝 Notes

- Date Reported: 2025-11-21
- Platform: Web application (RE:Advisor)
- This is a **feature completeness issue** - content input was never implemented
- Very similar to Article content bug - may have same root cause
- Should clarify Guide content requirements:
  - Free-form rich text like Article?
  - Structured step-by-step format?
  - Combination of both?
- Fix should align with product requirements for Guide format

**Questions for Product Team:**
1. What is the expected format for Guide content?
   - Free-form text with rich formatting?
   - Structured steps (Step 1, Step 2, etc.)?
   - Checklist-style with detailed descriptions?
2. Should Guide editor be the same as Article editor?
3. Are there any special features needed for guides (prerequisites, time estimates, difficulty level)?

**Immediate Actions:**
1. Review product requirements for Guide resource type
2. Check if Guide content component exists in codebase
3. Investigate relationship with Article content bug
4. Determine if missing component or configuration issue
5. Estimate fix complexity based on findings

---

**Reporter:** Product Team
**Date Reported:** 2025-11-21
**Status:** Open - **REQUIRES IMMEDIATE ATTENTION**
