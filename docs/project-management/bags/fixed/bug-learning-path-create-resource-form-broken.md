---
title: "Create Resource Form Broken - Type Selector Non-Functional, Wrong Fields Displayed"
category: "bug"
audience: "developer|qa"
created: "2025-11-27"
updated: "2025-11-27"
version: "1.0.0"
status: "fixed"
tags: ["bug", "frontend", "learning-path", "knowledge-center", "form", "blocker"]
owner: "product-team"
assignee: "alexremoon"
---

# Bug Report - Create Resource Form Broken in Learning Path

> **Issue:** The "Create New Resource" form in Learning Path has multiple critical issues: Type dropdown does not open/work, incorrect "File Upload" section appears, and Article content editor displays by default regardless of resource type selection.

---

## 📋 Basic Information

**Issue Type:** Bug
**Project:** FG
**Summary:** Create Resource form has non-functional type selector, wrong fields displayed, and incorrect default behavior
**Original Epic:** FG-EPIC-009 (Learning Paths CRUD) / FG-EPIC-008 (Knowledge Center)
**Assignee:** alexremoon
**Priority:** High
**Severity:** Critical
**Tags:** `bug`, `frontend`, `learning-path`, `knowledge-center`, `form`, `blocker`, `ui`, `dropdown`
**Story Points:** TBD
**Sprint:** To be assigned during sprint planning (URGENT)

---

## 🐛 Bug Description

**What is broken?**

The "Create New Resource" form accessed from Learning Path → Resources tab has multiple critical defects that prevent users from creating resources:

1. **Type dropdown non-functional:**
   - "Select type" dropdown does not open when clicked
   - Cannot select resource type (Article, Guide, Video, Link, etc.)
   - Dropdown appears but is completely unresponsive

2. **Incorrect "File Upload" section:**
   - "File Upload" section appears in the form
   - This section should NOT be present in the resource creation form
   - Shows "Choose File" button and URL input fields inappropriately

3. **Article Content editor shown by default:**
   - "Article Content" text editor (with Edit/Preview tabs) displays automatically
   - Editor appears even though no resource type has been selected
   - Editor should only appear when type = "Article" is selected

4. **Type-dependent fields not working:**
   - Form should dynamically change fields based on selected resource type
   - Currently shows Article editor regardless of (non-functional) type selection
   - No conditional rendering of type-specific fields

**Functionality affected:** Resource creation in Learning Paths
**What's not working:** Type selector dropdown, form field conditional display, inappropriate fields showing
**Impact:** Complete blocker - advisors cannot create any resources for Learning Paths

---

## 👥 Affected Users

**Who is impacted by this bug?**

- **Primary Personas:** Advisors/Consultants creating learning content
- **User Impact Level:** 100% of users attempting to create resources in Learning Paths
- **Frequency:** Every time - form consistently broken
- **Severity:** BLOCKER - No workaround available, cannot create resources at all

---

## ✅ Expected Behavior

**What SHOULD happen:**

### Step-by-Step Expected Flow

1. **User navigates to Learning Path:**
   - Dashboard → Knowledge Center → Learning Path → Select a learning path
   - Navigate to "Resources" tab
   - Click "Create New Resource" button

2. **Form opens with Basic Information:**
   - Title field (required)
   - Description field
   - **Type dropdown (SHOULD BE FUNCTIONAL):**
     - Clickable dropdown showing resource types
     - Options: Article, Guide, Video, External Link, PDF, etc.
   - Category field (auto-populated to "Governance" or similar)
   - Author field (pre-filled with current user)
   - Duration field (optional)
   - Points Value field
   - Public Resource toggle

3. **Type-dependent sections SHOULD appear based on selection:**

   **If type = "Article":**
   - Article Content editor appears (Edit/Preview tabs)
   - Rich text editor for writing article content
   - NO File Upload section

   **If type = "External Link":**
   - External URL field appears
   - NO Article Content editor
   - NO File Upload section

   **If type = "PDF" or "File":**
   - File Upload section appears
   - "Choose File" button to upload document
   - NO Article Content editor

   **If type = "Video":**
   - Video URL field or upload option
   - NO Article Content editor

4. **Dynamic form behavior:**
   - Form fields change dynamically when Type is selected
   - Only relevant fields for selected type are displayed
   - Irrelevant fields are hidden

5. **Save functionality:**
   - User fills in all required fields
   - Clicks "Save" button
   - Resource is created and added to Learning Path
   - User sees success message

---

## ❌ Actual Behavior

**What ACTUALLY happens:**

### Current Broken Flow

1. User navigates to Learning Path → Resources tab
2. Clicks "+ Create Resource" button
3. **"Create New Resource" modal/form opens with issues:**

   **Issue #1: Type dropdown broken**
   - Dropdown shows "Select type" placeholder
   - User clicks on dropdown
   - **Nothing happens** - dropdown does not open
   - Cannot select any resource type
   - Dropdown is completely non-functional

   **Issue #2: File Upload section incorrectly shown**
   - "File Upload" section is visible in the form
   - Shows:
     - "Choose File +" button
     - "Or provide a URL instead" text
     - "File URL" input field (placeholder: "Enter file URL")
     - "External URL" input field (placeholder: "Paste External URL")
   - This section should NOT be present by default
   - Should only appear when type = PDF/File is selected

   **Issue #3: Article Content editor shown by default**
   - "Article Content" section appears automatically
   - Shows text editor with Edit/Preview tabs
   - Rich text toolbar visible (Bold, Italic, Underline, H1, H2, lists)
   - Input area with "Enter Section Title" placeholder
   - This should ONLY appear when type = "Article" is selected
   - No type is selected yet, so this should be hidden

4. **User is stuck:**
   - Cannot select resource type
   - Cannot proceed with resource creation
   - Form is in incorrect state showing wrong fields
   - No way to create any type of resource

---

## 📸 Evidence

**Screenshots/Videos:**
- Screenshot provided showing "Create New Resource" form
- Visible issues marked with red arrows:
  1. Arrow pointing to "Type" dropdown with "Select type" - not opening
  2. Arrow pointing to "File Upload" section - should not be present
  3. Arrow pointing to "Article Content" section - should not display by default

**Visual Evidence Description:**

The screenshot clearly shows:

**Top Section - Basic Information:**
- Title field with "Placeholder" text
- Description field with "Description" placeholder
- **Type dropdown:** Shows "Select type" with dropdown icon - marked with red arrow (NOT WORKING)
- Category: "Governance" selected
- Author: "Logan Roy" (auto-filled)
- Duration: empty
- Points Value: "$" shown
- Public Resource: "No" selected

**Middle Section - File Upload (SHOULD NOT BE HERE):**
- Red arrow pointing to "File Upload" heading
- "Choose File +" button
- Text: "Or provide a URL instead"
- "File URL" input field
- "External URL" input field
- THIS ENTIRE SECTION IS INCORRECTLY DISPLAYED

**Bottom Section - Article Content (SHOULD BE CONDITIONAL):**
- Red arrow pointing to "Article Content" heading
- Edit/Preview tabs (Edit is active)
- Rich text editor toolbar: B I U H1 H2 list buttons
- Input area with "Enter Section Title"
- THIS SHOULD ONLY SHOW WHEN TYPE = "ARTICLE"

**Save button:** Red button at bottom right

---

## 🔍 Steps to Reproduce

### Prerequisites
- User logged in as advisor/consultant
- At least one Learning Path exists
- Knowledge Center accessible

### Reproduction Steps

1. Log in to the platform as advisor
2. Navigate to: **Dashboard → Knowledge Center**
3. Click on "Learning Path" in navigation
4. Select any existing learning path (or create new one)
5. Click on "Resources" tab (or "Modules" → "Resources")
6. Click the "+ Create Resource" button
7. **Observe the form that opens:**

   **Test #1: Type Dropdown**
   - Click on "Type" dropdown (shows "Select type")
   - **Observe:** Dropdown does not open, no options shown
   - Try clicking multiple times
   - **Result:** Dropdown is completely non-functional

   **Test #2: File Upload Section**
   - Scroll down in the form
   - **Observe:** "File Upload" section is visible
   - **Expected:** This section should NOT be present initially

   **Test #3: Article Content Section**
   - Scroll to bottom of form
   - **Observe:** "Article Content" editor is displayed with rich text toolbar
   - **Expected:** This should only appear when Type = "Article" is selected

8. **Attempt to use form:**
   - Try to fill in Title and Description
   - Try to click "Save"
   - **Observe:** Cannot complete resource creation without valid type selection

**Reproducibility:** 100% - occurs every time "Create Resource" form is opened

---

## 🔍 Root Cause Analysis (Initial Assessment)

**Likely technical causes:**

### 1. **Dropdown Component Issue**
- React Select or custom dropdown component not properly initialized
- Event handler for dropdown click not attached
- JavaScript error preventing dropdown from opening
- CSS z-index issue preventing dropdown menu from appearing
- Missing options data for the dropdown

### 2. **Conditional Rendering Logic Broken**
- Form is not checking resource type before showing sections
- All sections rendering simultaneously instead of conditionally
- React state for `selectedType` not working properly
- Missing conditional logic like:
  ```jsx
  {selectedType === 'article' && <ArticleContentEditor />}
  {selectedType === 'file' && <FileUploadSection />}
  ```

### 3. **Default State Initialization Error**
- Form initializing with default state that includes all sections
- Should initialize with minimal fields and show more on type selection
- Default type might be set to "article" internally but not displayed

### 4. **Form Component Architecture Issue**
- Possible copy-paste error from another form
- "File Upload" section may be hardcoded instead of conditional
- Article editor may be hardcoded instead of dynamic

### 5. **Type Definition Missing**
- Dropdown options not loaded from API or config
- Resource types enum/array not defined or not imported
- Backend not returning available resource types

---

## 🔬 Debugging Steps

**Frontend Developer should check:**

### 1. Console Errors
```javascript
// Open browser DevTools → Console
// Look for errors when:
// - Page loads
// - Form opens
// - Dropdown is clicked
// Common errors to look for:
// - "Cannot read property 'map' of undefined"
// - "onClick is not a function"
// - "options is undefined"
```

### 2. Type Dropdown Investigation
```javascript
// In browser console, inspect dropdown element:
const dropdown = document.querySelector('[aria-label*="Type"]')
// or
const dropdown = document.querySelector('select[name="type"]')

// Check:
// - Is element present?
// - Does it have event listeners?
// - Are options populated?
console.log(dropdown)
console.log(dropdown.onclick) // Should not be null
```

### 3. React DevTools
- Open React DevTools
- Find CreateResourceForm component
- Check component state:
  - `selectedType` - should be null/undefined initially
  - `resourceTypes` - should have array of options
  - `showArticleEditor` - should be false initially
  - `showFileUpload` - should be false initially
- Check props passed to dropdown component

### 4. Network Tab
- Check if API call is made to fetch resource types
- Endpoint might be: `GET /api/resource-types` or similar
- Verify response contains type options

### 5. Component Structure
```jsx
// Expected structure:
<CreateResourceForm>
  <BasicInformation>
    <TypeDropdown
      options={resourceTypes}
      onChange={handleTypeChange}
      value={selectedType}
    />
  </BasicInformation>

  {/* Conditional sections */}
  {selectedType === 'article' && <ArticleContentEditor />}
  {selectedType === 'file' && <FileUploadSection />}
  {selectedType === 'link' && <ExternalLinkField />}

  <SaveButton />
</CreateResourceForm>
```

### 6. Test Dropdown Manually
```javascript
// Try to trigger dropdown programmatically:
document.querySelector('.type-dropdown')?.click()

// Check if options exist:
document.querySelectorAll('.type-dropdown option')
```

---

## 💡 Recommended Fix

**Technical approach:**

### Fix #1: Repair Type Dropdown

**Check dropdown options data:**
```typescript
// Ensure resource types are defined:
const RESOURCE_TYPES = [
  { value: 'article', label: 'Article' },
  { value: 'guide', label: 'Guide' },
  { value: 'video', label: 'Video' },
  { value: 'link', label: 'External Link' },
  { value: 'pdf', label: 'PDF Document' },
  { value: 'file', label: 'File' },
];
```

**Implement functional dropdown:**
```tsx
import { useState } from 'react';
import Select from 'react-select'; // or custom component

const CreateResourceForm = () => {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <Select
      options={RESOURCE_TYPES}
      value={selectedType}
      onChange={(option) => setSelectedType(option)}
      placeholder="Select type"
      isSearchable={false}
    />
  );
};
```

### Fix #2: Implement Conditional Rendering

**Remove always-visible sections, add conditions:**
```tsx
const CreateResourceForm = () => {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <form>
      {/* Basic Information - always visible */}
      <BasicInformation>
        <TypeDropdown
          value={selectedType}
          onChange={setSelectedType}
        />
      </BasicInformation>

      {/* Conditional sections based on type */}
      {selectedType?.value === 'article' && (
        <ArticleContentEditor />
      )}

      {(selectedType?.value === 'pdf' || selectedType?.value === 'file') && (
        <FileUploadSection />
      )}

      {selectedType?.value === 'link' && (
        <ExternalLinkField />
      )}

      {selectedType?.value === 'video' && (
        <VideoUploadField />
      )}
    </form>
  );
};
```

### Fix #3: Remove Default Article Editor

**Don't show Article Content by default:**
```tsx
// WRONG (current behavior):
<ArticleContentEditor /> // Always visible

// CORRECT:
{selectedType?.value === 'article' && <ArticleContentEditor />}
```

### Fix #4: Remove Incorrect File Upload Section

**Only show when appropriate:**
```tsx
// WRONG (current behavior):
<FileUploadSection /> // Always visible

// CORRECT:
{['pdf', 'file', 'document'].includes(selectedType?.value) && (
  <FileUploadSection />
)}
```

### Fix #5: Add Loading State

```tsx
const [isLoading, setIsLoading] = useState(false);

// Show different content based on type
const renderTypeSpecificFields = () => {
  if (!selectedType) {
    return (
      <div className="info-message">
        Please select a resource type to continue
      </div>
    );
  }

  switch (selectedType.value) {
    case 'article':
      return <ArticleContentEditor />;
    case 'file':
    case 'pdf':
      return <FileUploadSection />;
    case 'link':
      return <ExternalLinkField />;
    case 'video':
      return <VideoUploadField />;
    default:
      return null;
  }
};
```

---

## 🧪 Test Scenarios

### Scenario 1: Type Dropdown Functionality
**Given:** User opens Create Resource form
**When:** User clicks on "Type" dropdown
**Then:**
- Dropdown menu opens and displays all resource type options
- User can see: Article, Guide, Video, External Link, PDF, File
- User can select any option
- Selected option displays in the dropdown field

### Scenario 2: Article Type Selection
**Given:** User has opened Create Resource form
**When:** User selects "Article" from Type dropdown
**Then:**
- Article Content editor section appears
- Rich text editor is visible with Edit/Preview tabs
- NO File Upload section is shown
- NO External Link field is shown

### Scenario 3: External Link Type Selection
**Given:** User has opened Create Resource form
**When:** User selects "External Link" from Type dropdown
**Then:**
- External URL input field appears
- NO Article Content editor is shown
- NO File Upload section is shown

### Scenario 4: PDF/File Type Selection
**Given:** User has opened Create Resource form
**When:** User selects "PDF" or "File" from Type dropdown
**Then:**
- File Upload section appears with "Choose File" button
- NO Article Content editor is shown
- NO External Link field is shown

### Scenario 5: Initial Form State
**Given:** User opens Create Resource form for the first time
**When:** Form loads
**Then:**
- Type dropdown shows "Select type" placeholder
- NO Article Content editor is visible
- NO File Upload section is visible
- NO External Link field is visible
- Only Basic Information fields are shown

### Scenario 6: Type Change Behavior
**Given:** User has selected "Article" type
**When:** User changes type to "External Link"
**Then:**
- Article Content editor disappears
- External Link field appears
- Form adjusts dynamically without page refresh

### Scenario 7: Form Validation
**Given:** User has filled in form with valid data
**When:** User clicks "Save" button
**Then:**
- Form validates all required fields
- Resource is created successfully
- User sees success message
- Modal closes and resource appears in list

---

## 📊 Business Impact

### User Experience Impact (CRITICAL)
- **Complete Blocker:** Advisors cannot create any resources for Learning Paths
- **No Workaround:** Cannot add content to learning paths at all
- **Knowledge Center Unusable:** Cannot populate learning paths with educational content
- **First Impression:** Broken form creates poor first impression for new advisors

### Business Impact (SEVERE)
- **Content Creation Blocked:** No resources can be added to Learning Paths
- **Feature Unusable:** EPIC-009 (Learning Paths) functionality is unusable
- **Knowledge Center Empty:** Cannot build out knowledge center content
- **Advisor Onboarding:** Advisors cannot create educational materials for families
- **Platform Value:** Platform cannot deliver on knowledge management promise
- **Launch Blocker:** Cannot launch Knowledge Center features with this bug

### Severity Justification (Critical)
- **Blocker:** Completely prevents resource creation in Learning Paths
- **Core Feature:** Knowledge Center is major platform differentiator
- **Workaround:** None available - form is completely broken
- **Scope:** Affects 100% of users attempting to create resources
- **Data Loss:** None, but prevents any content creation
- **User Facing:** Highly visible - users immediately encounter when trying to use feature

**Priority: HIGH / Severity: CRITICAL = MUST FIX IMMEDIATELY**

---

## 🔗 Related Issues

**Related Epics:**
- [EPIC-009: Learning Paths CRUD](../epics/epic-009-learning-paths-crud/) - Primary epic for Learning Path management
- [EPIC-008: Knowledge Center](../epics/epic-008-knowledge-center/) - Knowledge Center features

**Related Bugs:**
- May be related to other dropdown/form issues in the application
- Check for similar form issues in other modules

**Related User Stories:**
- Learning Path resource creation story
- Knowledge Center content management stories

**Technical Implementation:**
- Frontend component: `../FG/frontend/advisor_portal/components/LearningPath/CreateResourceForm/` (assumed)
- Form component library: React Hook Form, Formik, or custom
- Dropdown component: React Select or custom Select component
- API endpoint (expected):
  - GET `/api/resource-types` - Get available resource types
  - POST `/api/learning-paths/:id/resources` - Create resource

---

## 🏷️ Additional Context

### Priority & Severity Explanation

**Why Critical Severity?**
- Completely blocks a core feature (resource creation)
- No workaround exists
- Affects all users attempting to use Learning Paths
- Prevents Knowledge Center from being functional
- Must be fixed before Knowledge Center can launch

**Why High Priority?**
- Blocks EPIC-009 (Learning Paths) completion
- Prevents EPIC-008 (Knowledge Center) testing
- Affects all advisors creating educational content
- High visibility - immediately noticed by users
- Core platform feature is unusable

### Related Features Blocked

**Cannot be tested/used until fixed:**
- Resource creation in Learning Paths
- Learning Path content management
- Knowledge Center content population
- Resource categorization
- Resource assignment to modules
- Learning Path publishing

### Dependencies

**This bug affects:**
- All resource types (Article, Guide, Video, Link, PDF)
- Learning Path module functionality
- Knowledge Center content strategy
- Advisor content creation workflows
- Family learning experience

**Technical Dependencies:**
- Resource type enum/configuration
- Form component library
- Dropdown component
- Conditional rendering logic
- Resource creation API

---

## 🚨 URGENT - Assignee Notes

**For Frontend Developer (@alexremoon):**

### Immediate Actions Required

1. **Investigate dropdown issue (PRIORITY #1):**
   - [ ] Check browser console for JavaScript errors
   - [ ] Verify dropdown component is properly imported
   - [ ] Ensure resource types data is available
   - [ ] Test dropdown onClick handler
   - [ ] Check if dropdown menu has correct CSS/z-index

2. **Fix conditional rendering (PRIORITY #2):**
   - [ ] Remove always-visible Article Content section
   - [ ] Remove always-visible File Upload section
   - [ ] Implement proper conditional rendering based on `selectedType`
   - [ ] Test type switching behavior

3. **Implement proper form state (PRIORITY #3):**
   - [ ] Initialize with no type selected
   - [ ] Show help text: "Select a type to continue"
   - [ ] Only show type-specific fields after selection
   - [ ] Implement smooth transitions between type selections

### Estimated Fix Timeline

- **Investigation:** 1-2 hours
- **Dropdown fix:** 2-3 hours
- **Conditional rendering:** 3-4 hours
- **Testing all resource types:** 2-3 hours
- **Total:** 8-12 hours (1-1.5 days)

### Testing Checklist Before Marking Fixed

- [ ] Dropdown opens and shows all resource types
- [ ] Can select each resource type successfully
- [ ] Article type: Shows only Article Content editor
- [ ] Link type: Shows only External URL field
- [ ] File/PDF type: Shows only File Upload section
- [ ] Video type: Shows only Video URL field
- [ ] No sections shown before type selection
- [ ] Switching types updates form dynamically
- [ ] Can successfully create resource of each type
- [ ] Form validation works correctly
- [ ] No console errors or warnings
- [ ] Tested in Chrome, Firefox, Safari

---

## ✅ Acceptance Criteria for Bug Fix

### Must Have (Required for Bug Closure)

- [ ] Type dropdown is functional - opens on click and shows options
- [ ] All resource types are selectable from dropdown
- [ ] NO Article Content editor shows before type selection
- [ ] NO File Upload section shows before type selection
- [ ] Article Content editor ONLY shows when type = "Article"
- [ ] File Upload section ONLY shows when type = "File" or "PDF"
- [ ] External Link field ONLY shows when type = "External Link"
- [ ] Form dynamically updates when type is changed
- [ ] Can successfully create resource of each type
- [ ] No console errors when form is opened or used
- [ ] Form saves correctly for all resource types

### Should Have (Important)

- [ ] Smooth transitions when switching between types
- [ ] Help text shown when no type is selected
- [ ] Loading state while resource is being created
- [ ] Error messages for validation failures
- [ ] Success message after resource created
- [ ] Form fields clear appropriately on type change

### Testing Requirements

- [ ] Manual testing: Dropdown works in Chrome, Firefox, Safari
- [ ] Manual testing: Each resource type tested end-to-end
- [ ] Manual testing: Type switching tested multiple times
- [ ] Manual testing: Form validation tested
- [ ] Code review: Conditional rendering logic reviewed
- [ ] Code review: Dropdown implementation reviewed
- [ ] Regression testing: Other forms not affected

---

## 📝 Notes

### Investigation Questions

1. Is this a new bug or has form always been broken?
2. Did recent code changes affect the form?
3. Does this affect other forms in the application?
4. Are resource types loading from API or hardcoded?

### Potential Quick Wins

If dropdown issue is simple (e.g., missing onClick handler), fix could be deployed same day. Conditional rendering will take longer but is critical for proper functionality.

### Risk Assessment

- **High Risk:** Form is completely unusable, blocking major feature
- **Medium Risk:** May require significant refactoring if form architecture is flawed
- **Low Risk:** If only dropdown is broken and conditional rendering exists, fix is straightforward

---

**Reporter:** Elena Savelova (@e.savelova)
**Date Reported:** 2025-11-27
**Environment:** Production/Staging
**Browser:** To be documented during reproduction
**Platform:** Web Application - Advisor Portal - Knowledge Center

---

## 🚨 BLOCKING MULTIPLE FEATURES

This bug blocks:
- ✋ All resource creation in Learning Paths
- ✋ Knowledge Center content management
- ✋ EPIC-009 completion and testing
- ✋ EPIC-008 Knowledge Center launch
- ✋ Advisor content creation workflows
- ✋ Learning Path functionality
- ✋ Family educational content delivery

**Recommend:**
1. **Immediate sprint assignment** - Do not wait for planning
2. **Daily progress updates** until resolved
3. **Block Knowledge Center release** until fixed
4. **Cross-team communication** if backend changes needed
5. **Priority #1** for frontend team this week

---

**Status:** 🔴 CRITICAL - BLOCKS KNOWLEDGE CENTER & LEARNING PATHS
