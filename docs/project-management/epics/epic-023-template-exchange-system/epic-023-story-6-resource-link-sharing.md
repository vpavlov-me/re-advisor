# [Story ID]: Resource Link Sharing

---

## 📋 Basic Information

**Issue Type:** User Story  
**Project:** FG  
**Parent Epic:** FG-EPIC-023 (Template Exchange System - Technical Architecture)  
**Story Name:** Resource Link Sharing  
**Summary:** As an External Advisor, I want to share Resource links with my client families through one-way content copying, so that families can access my curated educational resources independently  

**Labels:** resources, template-exchange, advisor-portal, family-portal, education  
**Components:** Resource Service, Education Service, Portal Integration  
**Priority:** High  
**Story Points:** 3  
**Sprint:** TBD  
**Assignee:** [TBD]

---

## 👤 User Story

**As an:** External Advisor  
**I want to:** Share Resource links with client families  
**So that:** Families can access my curated educational resources while maintaining complete independence from my original Resource library

---

## 🎯 Acceptance Criteria

### AC1: Share Button Availability
**Given** I am an External Advisor on Advisor Portal  
**And** I have created a Resource link  
**When** I view the Resource details  
**Then** I should see a "Share with Family" button  
**And** the button should be enabled for all published Resources  
**And** Resources must include: title, URL, description, category

---

### AC2: Family Selection Interface
**Given** I click "Share with Family" button  
**When** the sharing dialog opens  
**Then** I should see a list of my client families  
**And** each family should display: family name, primary contact  
**And** I should be able to select one family at a time  
**And** I should see a "Confirm Share" button  
**And** I should see a preview of Resource: title, URL, category

---

### AC3: Copy Creation Process
**Given** I have selected a target family  
**And** I click "Confirm Share"  
**When** the system processes the sharing request  
**Then** the system should create a complete independent copy of the Resource  
**And** the copy should include:
- Title
- URL (validated as accessible link)
- Description
- Category
**And** the copy should preserve all formatting in description field  
**And** the copy should NOT include: view counts, access history, analytics data  
**And** the operation should complete within 2 seconds

---

### AC4: Creator Marker Linkage
**Given** the Resource copy is created successfully  
**When** the system saves the shared Resource  
**Then** the system should set `created_by` field to my Advisor ID  
**And** the system should set `is_shared_resource` flag to `true`  
**And** the system should set `shared_from_advisor_id` to my Advisor ID  
**And** the system should NOT store `original_resource_id` reference  
**And** the system should NOT create any live link to my original Resource

---

### AC5: Connection Severance
**Given** the shared Resource is saved to Family Portal  
**When** the sharing process completes  
**Then** the family's copy should be completely independent  
**And** changes to my original Resource should NOT affect the family's copy  
**And** deletion of my original Resource should NOT affect the family's copy  
**And** there should be NO bidirectional reference between copies  
**And** URL updates on my side should NOT sync to family's copy

---

### AC6: Resource Appears on Family Portal
**Given** the sharing process completed successfully  
**When** Family members view the Education section  
**Then** they should see the shared Resource in "Featured Resources" subsection  
**And** the Resource should display metadata: "Shared by [Advisor Name]"  
**And** the Resource should have status: `shared` (permanent)  
**And** the Resource should show: title, description, category  
**And** the Resource should have a clickable link that opens in new tab  
**And** all Family members should be able to access the Resource immediately

---

### AC7: Advisor Portal Status Update
**Given** the sharing process completed successfully  
**When** I view my original Resource on Advisor Portal  
**Then** my original Resource should remain unchanged  
**And** my original Resource should show "Shared with: [Family Name]" badge  
**And** the sharing history should log: family name, timestamp  
**And** I should be able to share the same Resource with multiple families (unlimited)  
**And** I should still be able to edit or delete my original Resource  
**And** my edits should NOT affect any previously shared copies

---

### AC8: Multiple Sharing Support
**Given** I have shared a Resource with Family A  
**When** I share the same Resource with Family B  
**Then** the system should create a separate independent copy for Family B  
**And** Family A's copy should remain unchanged  
**And** Family B's copy should be independent from both my original and Family A's copy  
**And** each family should have their own creator marker linking to my Advisor ID

---

### AC9: Error Handling - Copy Failure
**Given** I initiate Resource sharing  
**When** the copy creation process fails (e.g., database error, network timeout)  
**Then** the system should rollback any partial changes  
**And** no incomplete Resource should appear on Family Portal  
**And** I should see error message: "Failed to share Resource. Please try again."  
**And** my original Resource should remain unchanged  
**And** I should be able to manually retry the sharing operation

---

### AC10: Error Handling - URL Validation
**Given** I initiate Resource sharing  
**When** the system validates the Resource URL  
**And** the URL is invalid or inaccessible  
**Then** the sharing should be blocked  
**And** I should see error message: "Resource URL is invalid or inaccessible. Please update and try again."  
**And** I should be able to edit the URL and retry sharing

---

### AC11: Error Handling - Permission Validation
**Given** I attempt to share a Resource  
**When** I no longer have access to the target family (e.g., service ended)  
**Then** the system should prevent the sharing operation  
**And** I should see error message: "You do not have permission to share with this family"  
**And** the family selection list should not display families where `has_family_access()` returns false  
**And** I should be able to manually retry sharing after resolving access issues

---

### AC12: Audit Trail
**Given** I successfully share a Resource  
**When** the sharing completes  
**Then** the system should log an audit entry with:
- Advisor ID
- Original Resource ID
- Target family ID
- Timestamp
- Operation: "resource_shared"
- Resource URL and title
**And** the audit entry should be immutable  
**And** the audit log should be accessible for compliance review

---

### AC13: No Status Changes After Sharing
**Given** a Resource has been shared with a family  
**When** Family members access the Resource  
**Then** the Resource status should remain `shared` permanently  
**And** there should be NO status progression (no pending, in_progress, finished)  
**And** the Resource should remain accessible indefinitely  
**And** no completion tracking should occur

---

## 📊 Business Rules

### BR1: One-Way Copy Architecture
- Sharing creates a complete independent copy, not a live link
- No synchronization between Advisor's original and family's copy
- Each copy can be modified or deleted independently
- URL updates do not propagate across copies

### BR2: Creator Marker Purpose
- `created_by` field stores Advisor ID for permission filtering
- Creator marker maintains attribution for curated content
- Creator marker does NOT imply automatic edit rights (permissions control access)
- Creator marker is informational only (no permission enforcement for Resources)

### BR3: Resource Independence
- After sharing, connection between original and copy is severed
- Advisor can modify/delete original without affecting family's copy
- Family can modify/delete shared copy without affecting Advisor's original
- No bidirectional reference stored in database

### BR4: Multiple Sharing
- Same Resource can be shared with multiple families
- Each sharing creates a separate independent copy
- Each copy maintains its own creator marker linking to same Advisor

### BR5: Sharing Permissions
- Only Advisors with active family relationship can share Resources
- Advisor must pass `has_family_access(family_id)` check for target family
- System validates permissions before allowing sharing operation
- Family selection list only shows families where advisor has access

### BR6: Resource Status
- Resources only have one status: `shared`
- Status never changes after sharing (permanent state)
- No progression tracking (unlike Learning Paths)
- No completion or engagement tracking

### BR7: Resource Content Requirements
- Resources must be links only (no file uploads)
- Title is required (max 200 characters)
- URL is required and must be valid
- Description is optional (max 1000 characters)
- Category is required (from predefined list)

### BR8: Copy Completeness
- Copy includes: title, URL, description, category
- Copy preserves formatting in description field
- Copy does NOT include: view counts, access history, analytics data

### BR9: Access Model
- All Family members can access shared Resources immediately
- No assignment or permission required
- Resources appear in public "Featured Resources" section
- Simple display with clickable link

### BR10: Error Recovery
- Failed sharing operations must rollback completely
- No partial Resources should persist on Family Portal
- Advisor can manually retry failed sharing operations
- System should log detailed error information for debugging

---

## 🔗 Dependencies

**Depends On:**
- [To be filled after discussion]

**Blocks:**
- None (independent story)

**Related Stories:**
- FG-XXX-01: Constitution Template Sharing (similar copy mechanism)
- FG-XXX-04: Learning Path Sharing (similar copy mechanism)

---

## 🎨 User Experience Flow

### Advisor Portal Flow:
1. Advisor opens Resource they created
2. Advisor reviews: title, URL, description, category
3. Advisor clicks "Share with Family" button
4. Dialog opens showing list of client families
5. Dialog shows Resource preview (title, URL, category)
6. Advisor selects target family from list
7. Advisor clicks "Confirm Share"
8. System shows loading indicator "Sharing Resource..."
9. Success message appears: "Resource shared successfully with [Family Name]"
10. Resource now shows "Shared with [Family Name]" badge
11. Advisor can continue editing their original Resource

### Family Portal Flow:
1. Family member logs into Family Portal
2. Member navigates to Education section
3. Member clicks on "Featured Resources" subsection
4. Shared Resource appears in list
5. Resource displays:
   - Title
   - Description
   - Category badge
   - "Shared by [Advisor Name]" on [Date]
   - Clickable link icon
6. Member clicks on Resource link
7. Link opens in new browser tab
8. No tracking or completion required
9. Resource remains permanently accessible

---

## 💡 Additional Context

### Why Resources Are Simplest Template Type:
- No nested structure (just flat link objects)
- No activation or assignment flow
- No status progression
- No completion tracking
- Single permanent status: `shared`
- Simple display with clickable link

### Why One-Way Copy for Resources?
- Families may want to customize descriptions for their context
- Advisors need freedom to update their library
- Prevents broken links if Advisor removes original
- Simpler architecture for simple content type

### Why No Status Tracking?
- Resources are external links, not platform content
- Can't track engagement on external sites
- Privacy concerns with tracking clicks
- Simpler user experience (just click and go)

### Resource vs Learning Path vs Constitution:
- **Resources:** Simple links, no tracking, permanent access
- **Learning Paths:** Complex structure, assignment flow, progress tracking
- **Constitution:** Template that can be activated, edit permissions

### Technical Implications:
- Simplest copy operation (flat structure)
- No status state machine needed
- No assignment or permission enforcement
- Creator marker is informational only
- Fastest sharing operation (< 2 seconds)

---

## 📝 Notes for Implementers

### Copy Operation Requirements:
- Use database transaction for atomicity
- Validate URL accessibility before sharing
- Generate new UUID for copied Resource
- Preserve description formatting exactly
- Target completion time: < 2 seconds

### Creator Marker Implementation:
- Store as `created_by` field (UUID, indexed)
- Store as `shared_from_advisor_id` field (UUID, indexed)
- Set `is_shared_resource` boolean flag
- Do NOT store `original_resource_id` reference

### URL Validation:
- Check URL format (valid http/https)
- Verify URL is accessible (HTTP status check)
- Timeout URL check at 3 seconds
- Fail sharing if URL inaccessible
- Provide clear error message to Advisor

### Error Handling:
- Catch and rollback on any copy failure
- Log detailed error for debugging
- Return user-friendly error message
- Ensure original Resource remains unchanged
- Support manual retry by user (no automatic retry)

### Performance Considerations:
- Optimize for simple flat structure
- Target completion time: < 2 seconds
- URL validation adds slight overhead (3 second timeout)
- Monitor copy operation duration
- Set timeout at 5 seconds to prevent hanging operations

### Display Requirements:
- Resources appear in "Featured Resources" subsection
- Sort by share date (newest first)
- Show "Shared by [Advisor Name]" attribution
- Clickable link opens in new tab (target="_blank")
- Category badge for visual filtering
- No engagement metrics displayed

### Data Structure:
```
Resource (copy)
├─ id: new UUID
├─ created_by: advisor_id
├─ shared_from_advisor_id: advisor_id
├─ is_shared_resource: true
├─ family_id: target_family_id
├─ title: string (max 200 chars)
├─ url: string (validated)
├─ description: text (max 1000 chars, optional)
├─ category: enum
└─ status: "shared" (permanent)
```

---

**Story Owner:** [Product Manager]  
**Created:** 2025-11-27  
**Last Updated:** 2025-11-27