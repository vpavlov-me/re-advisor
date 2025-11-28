# [Story ID]: Constitution Template Sharing

---

## 📋 Basic Information

**Issue Type:** User Story  
**Project:** FG  
**Parent Epic:** FG-EPIC-023 (Template Exchange System - Technical Architecture)  
**Story Name:** Constitution Template Sharing  
**Summary:** As an External Advisor, I want to share Constitution templates with my client families through one-way content copying, so that families can use my templates while maintaining independence from my originals  

**Labels:** constitution, template-exchange, advisor-portal, family-portal  
**Components:** Constitution Service, Template Service, Portal Integration  
**Priority:** Critical  
**Story Points:** 8  
**Sprint:** TBD  
**Assignee:** [TBD]

---

## 👤 User Story

**As a:** External Advisor  
**I want to:** Share Constitution templates with client families  
**So that:** Families can use my professionally-crafted templates while maintaining complete independence from my original templates

---

## 🎯 Acceptance Criteria

### AC1: Share Button Availability
**Given** I am an External Advisor on Advisor Portal  
**And** I have created a Constitution template  
**When** I view the template details  
**Then** I should see a "Share with Family" button  
**And** the button should be enabled regardless of template completion status

---

### AC2: Family Selection Interface
**Given** I click "Share with Family" button  
**When** the sharing dialog opens  
**Then** I should see a list of my client families  
**And** each family should display: family name, primary contact  
**And** I should be able to select one family at a time  
**And** I should see a "Confirm Share" button

---

### AC3: Copy Creation Process
**Given** I have selected a target family  
**And** I click "Confirm Share"  
**When** the system processes the sharing request  
**Then** the system should create a complete independent copy of the template content  
**And** the copy should include all template sections with exact content  
**And** the copy should preserve all formatting and structure  
**And** the copy should NOT include: version history, edit timestamps from original  
**And** the operation should complete within 5 seconds for templates up to 50 sections

---

### AC4: Creator Marker Linkage
**Given** the template copy is created successfully  
**When** the system saves the shared template  
**Then** the system should set `created_by` field to my Advisor ID  
**And** the system should set `is_shared_template` flag to `true`  
**And** the system should set `shared_from_advisor_id` to my Advisor ID  
**And** the system should NOT store `original_template_id` reference  
**And** the system should NOT create any live link to my original template

---

### AC5: Connection Severance
**Given** the shared template is saved to Family Portal  
**When** the sharing process completes  
**Then** the family's copy should be completely independent  
**And** changes to my original template should NOT affect the family's copy  
**And** deletion of my original template should NOT affect the family's copy  
**And** there should be NO bidirectional reference between copies

---

### AC6: Template Appears on Family Portal
**Given** the sharing process completed successfully  
**When** Family Council members view the Constitution section  
**Then** they should see the shared template in their template list  
**And** the template should be marked as "Inactive Template"  
**And** the template should display metadata: "Shared by [Advisor Name]"  
**And** the template should have status: `shared`  
**And** the template should be fully viewable but not yet active

---

### AC7: Advisor Portal Status Update
**Given** the sharing process completed successfully  
**When** I view my original template on Advisor Portal  
**Then** my original template should remain unchanged  
**And** my original template should show "Shared with: [Family Name]" badge  
**And** the sharing history should log: family name, timestamp  
**And** I should be able to share the same template with multiple families (unlimited)  
**And** I should still be able to edit or delete my original template

---

### AC8: Multiple Sharing Support
**Given** I have shared a template with Family A  
**When** I share the same template with Family B  
**Then** the system should create a separate independent copy for Family B  
**And** Family A's copy should remain unchanged  
**And** Family B's copy should be independent from both my original and Family A's copy  
**And** each family should have their own creator marker linking to my Advisor ID

---

### AC9: Error Handling - Copy Failure
**Given** I initiate template sharing  
**When** the copy creation process fails (e.g., database error, network timeout)  
**Then** the system should rollback any partial changes  
**And** no incomplete template should appear on Family Portal  
**And** I should see error message: "Failed to share template. Please try again."  
**And** my original template should remain unchanged  
**And** I should be able to retry the sharing operation

---

### AC10: Error Handling - Permission Validation
**Given** I attempt to share a template  
**When** I no longer have access to the target family (e.g., service ended)  
**Then** the system should prevent the sharing operation  
**And** I should see error message: "You do not have permission to share with this family"  
**And** the family selection list should not display families where `has_family_access()` returns false  
**And** I should be able to manually retry sharing after resolving access issues

---

### AC11: Audit Trail
**Given** I successfully share a template  
**When** the sharing completes  
**Then** the system should log an audit entry with:
- Advisor ID
- Original template ID
- Target family ID
- Timestamp
- Operation: "template_shared"
**And** the audit entry should be immutable  
**And** the audit log should be accessible for compliance review

---

## 📊 Business Rules

### BR1: One-Way Copy Architecture
- Sharing creates a complete independent copy, not a live link
- No synchronization between Advisor's original and family's copy
- Each copy can be modified or deleted independently

### BR2: Creator Marker Purpose
- `created_by` field stores Advisor ID for permission filtering
- Creator marker enables "edit (linked)" permission functionality
- Creator marker does NOT imply automatic edit rights (permissions control access)

### BR3: Template Independence
- After sharing, connection between original and copy is severed
- Advisor can modify/delete original without affecting family's copy
- Family can modify/delete shared copy without affecting Advisor's original
- No bidirectional reference stored in database

### BR4: Multiple Sharing
- Same template can be shared with multiple families
- Each sharing creates a separate independent copy
- Each copy maintains its own creator marker linking to same Advisor

### BR5: Sharing Permissions
- Only Advisors with active family relationship can share templates
- Advisor must pass `has_family_access(family_id)` check for target family
- System validates permissions before allowing sharing operation
- Family selection list only shows families where advisor has access

### BR6: Template Status on Family Portal
- Shared templates always start with status: "shared"
- Shared templates are marked as "inactive" until activated by Family Council
- Only Family Council can activate shared templates

### BR7: Copy Completeness
- Copy includes all template sections and content
- Copy preserves formatting, structure, numbering
- Copy does NOT include: version history, edit logs, comments from original

### BR8: Error Recovery
- Failed sharing operations must rollback completely
- No partial templates should persist on Family Portal
- Advisor can manually retry failed sharing operations
- System should log detailed error information for debugging

---

## 🔗 Dependencies

**Depends On:**
- [To be filled after discussion]

**Blocks:**
- FG-XXX-02: Constitution Cross-Portal Editing
- FG-XXX-03: Constitution Template Activation

**Related Stories:**
- FG-XXX-04: Learning Path Sharing (similar copy mechanism)
- FG-XXX-06: Resource Link Sharing (similar copy mechanism)

---

## 🎨 User Experience Flow

### Advisor Portal Flow:
1. Advisor opens Constitution template they created
2. Advisor clicks "Share with Family" button
3. Dialog opens showing list of client families
4. Advisor selects target family from list
5. Advisor clicks "Confirm Share"
6. System shows loading indicator "Sharing template..."
7. Success message appears: "Template shared successfully with [Family Name]"
8. Template now shows "Shared with [Family Name]" badge
9. Advisor can continue editing their original template

### Family Portal Flow:
1. Family Council member logs into Family Portal
2. Member navigates to Constitution section
3. Shared template appears in template list
4. Template displays: "Inactive Template" status
5. Template shows metadata: "Shared by [Advisor Name]" on [Date]
6. Member can view full template content
7. Member can activate template (separate story: FG-XXX-03)

---

## 💡 Additional Context

### Why One-Way Copy?
- Families need independence to modify templates for their specific needs
- Advisors need freedom to evolve their original templates
- Prevents conflicts from bidirectional synchronization
- Simpler architecture, fewer edge cases

### Why Creator Marker?
- Enables permission-based filtering (Advisor sees only their templates)
- Supports "edit (linked)" permission model
- Maintains attribution for audit and compliance
- Does NOT create ownership dependency

### Technical Implications:
- Copy operation must be atomic (all-or-nothing)
- Creator marker indexed for fast permission filtering
- No foreign key constraint to original template
- Audit log captures full sharing history

---

## 📝 Notes for Implementers

### Copy Operation Requirements:
- Use database transaction for atomicity
- Validate all sections copied successfully before commit
- Generate new UUIDs for all copied entities
- Preserve content exactly (no transformations)
- Target completion time: < 5 seconds for templates up to 50 sections

### Creator Marker Implementation:
- Store as `created_by` field (UUID, indexed)
- Store as `shared_from_advisor_id` field (UUID, indexed)
- Set `is_shared_template` boolean flag
- Do NOT store `original_template_id` reference

### Error Handling:
- Catch and rollback on any copy failure
- Log detailed error for debugging
- Return user-friendly error message
- Ensure original template remains unchanged
- Support manual retry by user (no automatic retry)

### Performance Considerations:
- Optimize for templates up to 50 sections
- Target completion time: < 5 seconds
- Consider async processing for very large templates (>50 sections)
- Monitor copy operation duration
- Set timeout at 10 seconds to prevent hanging operations

---

**Story Owner:** [Product Manager]  
**Created:** 2025-11-27  
**Last Updated:** 2025-11-27