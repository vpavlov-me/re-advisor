# Epic: Constitution Templates for External Advisors

---

## 📋 Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** Constitution Templates for External Advisors  
**Summary:** Enable External Advisors (External Consul and Consultant) to create, edit, and manage reusable Constitution templates from 12 predefined sections  
**Parent User Journey:** [To be determined - likely "Advisor Knowledge Center" or "Family Constitution Management"]  
**Priority:** High  
**Epic Link:** FG-EPIC-XXX

---

## 🎯 Epic Goal

**What will this Epic deliver?**

This Epic enables External Advisors (both External Consul and Consultant personas) to create and manage reusable Constitution templates based on 12 predefined governance sections. Advisors can:
- Create templates for full constitution or specific sections
- Save multiple template versions for different family types
- Edit templates before they are used
- Archive or delete templates to maintain clean library

**User-facing value:**
- External Advisors can standardize their governance frameworks and reuse proven structures
- Reduces time to create constitution content from scratch
- Enables advisors to build personal library of governance best practices

**Business value:**
- Positions platform as professional advisory tool with reusable knowledge assets
- Increases advisor efficiency and value delivery
- Improves constitution quality through proven templates
- Enables advisors to scale their practice with standardized frameworks

**Scope boundaries:**
- ✅ **Included:** Template creation, editing (before use), multiple versions, archiving, deletion
- ❌ **NOT included:** Template assignment to families (separate epic), template sharing between advisors, usage analytics, template marketplace

---

## 👥 Target Users

**Primary Personas:**
- **External Consul** (DOC-USR-005) - Strategic governance partner with full access to family
- **Consultant** (DOC-USR-006) - Marketplace advisor serving multiple families

---

## 📖 User Stories (High-Level)

1. **As an External Advisor**, **I want to create Constitution Templates from 12 predefined sections (full or partial)**, **so that I can standardize governance frameworks for my clients**

2. **As an External Advisor**, **I want to edit my templates before using them**, **so that I can refine and improve my governance frameworks**

3. **As an External Advisor**, **I want to archive or delete unused templates**, **so that I can maintain a clean library of current frameworks**

---

## 📗 Constitution Template Structure

### 12 Predefined Sections

| Section # | Section Name | Description | Example Content |
|-----------|--------------|-------------|-----------------|
| 1 | **Family Vision & Mission** | Purpose and long-term aspirations | "Our family exists to..." |
| 2 | **Family Values** | Core principles and beliefs | "Integrity, stewardship, education..." |
| 3 | **Governance Structure** | Leadership roles and organization | "Family Council composition and roles" |
| 4 | **Decision-Making Process** | How decisions are made and approved | "Voting thresholds, consensus building" |
| 5 | **Conflict Resolution** | Process for handling disagreements | "Mediation process, escalation steps" |
| 6 | **Succession Planning** | Leadership transition guidelines | "Next-generation readiness criteria" |
| 7 | **Education & Development** | Family member growth and learning | "Mandatory education programs" |
| 8 | **Philanthropy Guidelines** | Charitable giving framework | "Annual giving targets, cause selection" |
| 9 | **Asset Management Principles** | Wealth stewardship guidelines | "Investment philosophy, risk tolerance" |
| 10 | **Communication Standards** | How family communicates | "Meeting frequency, communication channels" |
| 11 | **Meeting Protocols** | Meeting structure and processes | "Agenda creation, quorum requirements" |
| 12 | **Amendment Process** | How constitution can be changed | "Amendment proposal and approval process" |

**Template Creation Rules:**
- Advisor selects 1-12 sections (full or partial template)
- Each section has rich text editor for content
- Advisor cannot create custom sections (only from 12 predefined)
- Advisor can save multiple template versions

---

## 🔗 Dependencies

**Service Dependencies:**
- **Constitution Service** (port 8002) - May need extension for template management
- **Advisor Portal Service** (port 8011) - Advisor interface backend
- **Database:** New `constitution_templates` table (or extend constitution_db)

**Data Dependencies:**
- Existing Constitution Document structure as basis for template format

**External Dependencies:**
- None

---

## 🎨 Design & UX

**Figma Links:**
- [To be created - Constitution Template Creator]
- [To be created - Template Library for Advisors]

**UX Notes:**
- **Template Creator:** Multi-step form with section selection and rich text editors
- **Template Library:** List view with template name, sections included, last modified date
- **Template Management:** Edit, archive, delete actions per template

**Key User Flows:**

**Flow 1: Advisor Creates Template**
1. Navigate to "Constitution Templates" in Advisor Portal
2. Click "Create New Template"
3. Enter template name and description (e.g., "Large Family Governance Framework")
4. Select sections to include (checkboxes for 1-12)
5. Fill in content for each selected section (rich text)
6. Save template

**Flow 2: Advisor Edits Template**
1. Open template in Template Library
2. Click "Edit Template"
3. Modify content or section selection
4. Save changes
5. Template updated in library

**Flow 3: Advisor Archives/Deletes Template**
1. Select template from library
2. Click "Archive" (if previously used) or "Delete" (if never used)
3. Confirm action
4. Template removed from active library

---

## 🔔 Notifications

**Does this Epic involve user notifications?** No

---

## 🧮 Business Rules

**Template Creation:**
1. Advisor must select at least 1 section (max 12)
2. Template name must be unique within advisor's library
3. Each section supports rich text formatting
4. Advisor can save multiple template versions with different names

**Template Editing:**
1. Advisor can edit template at any time (no restrictions in this epic)
2. Template name must remain unique within advisor's library
3. "Last Modified" timestamp updates after each save

**Template Archiving:**
1. Archived templates hidden from active library view
2. Archived templates can be restored
3. Archived templates remain in database (soft delete)

**Template Deletion:**
1. Permanent removal from database
2. Cannot be recovered after deletion
3. Confirmation dialog required

**Template Lifecycle:**
1. Created → Active (editable)
2. Active → Archived (restorable)
3. Active → Deleted (permanent)
4. Archived → Active (restored)
5. Archived → Deleted (permanent)

---

## 📝 Notes

**Future Enhancements (NOT in this Epic):**
- Template assignment to families (separate epic)
- Template sharing between advisors (marketplace)
- Usage analytics (how many families use each template)
- Template versioning (track changes over time)
- Template ratings and reviews

**Assumptions:**
- 12 predefined sections are final and won't change
- Templates stored in advisor's context (multi-tenant by advisor_id)
- No limit on number of templates per advisor

**Open Questions:**
- Should we allow advisor to reorder sections in template?
- Should we have default content suggestions for each section?
- Maximum number of templates per advisor (quota)?

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-27  
**Created By:** Product Team
