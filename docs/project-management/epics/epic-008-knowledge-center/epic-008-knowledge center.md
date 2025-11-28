---
doc_id: "FG-EPIC-XXX"
title: "Knowledge Center для External Advisors"
type: "epic"
category: "feature"
audience: "product-manager|business-analyst|developer|qa|stakeholder"
complexity: "advanced"
created: "2025-10-21"
updated: "2025-10-21"
version: "1.0.0"
status: "draft"
tags: ["knowledge-center", "advisor-portal", "resource-management", "constitution-template", "sharing", "education"]
related: ["DOC-USR-003", "DOC-USR-002", "DOC-USR-001", "DOC-SYS-001"]
owner: ""
maintainer: ""
reviewer: ""
priority: "high"
business_value: "Стандартизация консультационных услуг через единую базу знаний advisors"
user_impact: "Позволяет advisors создавать личные библиотеки материалов и делиться с семьями"
review_cycle: "quarterly"
next_review: "2026-01-21"
---

# Epic: Knowledge Center для External Advisors

## 📋 Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** Knowledge Center - Библиотека ресурсов для External Advisors  
**Summary:** Централизованная система управления образовательными ресурсами с возможностью sharing контента с семьями-клиентами  
**Parent Initiative:** FG-XXX [Link to Proposal]  
**Priority:** High  
**Epic Link:** FG-EPIC-XXX

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Knowledge Center - это централизованная библиотека знаний для External Advisors, позволяющая создавать личные базы образовательных материалов и делиться ими с семьями-клиентами.

**User-facing value (что пользователи смогут делать после этого Epic):**
- Создавать, организовывать и управлять образовательными ресурсами 9 типов в своей личной библиотеке
- Делиться ресурсами с семьями-клиентами в один клик (association-based sharing)
- Использовать готовые шаблоны конституции с 12 разделами для быстрого старта работы с семьей
- Организовывать контент в папки и помечать важные ресурсы как Featured
- Отслеживать, какие ресурсы shared с какими семьями
- Дублировать существующие ресурсы для быстрого создания вариаций

**Business value (как бизнес выигрывает):**
- Стандартизация качества консультационных услуг через единую базу знаний
- Ускорение onboarding новых семей-клиентов через ready-to-use templates
- Повышение продуктивности advisors через переиспользование материалов
- Увеличение perceived value услуг через профессиональную библиотеку ресурсов
- Улучшение retention семей через доступ к качественным образовательным материалам

**Scope boundaries:**

**✅ Включено:**
- CRUD для 9 типов ресурсов (Documents, Articles, Videos, Podcasts, Templates, Guides, External Links, Checklists, Learning Paths)
- Специальный тип "Constitution Template" с 12 разделами (partial sharing allowed)
- Folder organization (1 уровень вложенности, без лимитов)
- Featured resources marking (advisor-level)
- Association-based sharing с семьями (read-only копии)
- Resource duplication для создания вариаций
- Поиск и фильтрация (по типу, shared/not shared, языку)
- Метрики (families shared with count)
- File upload для Documents/Templates (PDF, DOCX, XLSX до 50MB)
- Instant notifications в центр нотификаций при sharing
- Локализация контента (multi-language support)
- Soft delete с retention period 6 месяцев

**❌ НЕ включено:**
- Learning Paths функциональность (отдельный Epic - только тип ресурса добавлен)
- Вложенные папки (> 1 уровня)
- Collaborative editing ресурсов несколькими advisors
- Version control для ресурсов (updates = new resource copies)
- Comments/feedback от семей на ресурсы
- Автоматический перевод контента
- Integration с внешними образовательными платформами
- Детальная аналитика usage patterns

---

## 👥 Target Users

**Who will use this feature?**

**Primary Personas:**
- **External Advisor (DOC-USR-003)** - Создают и управляют личной библиотекой ресурсов в Advisor Portal, делятся материалами с семьями. Все типы advisors (Personal Family Advisor, External Consul, Marketplace Consultant) имеют доступ ко всем 9 типам ресурсов - каждый advisor создает свою собственную базу материалов.

**Secondary Personas:**
- **Family Council Member (DOC-USR-002)** - получает shared resources (read-only копии) в Family Portal Knowledge Center, использует в своей семье
- **Family Member (DOC-USR-001)** - читает educational контент (read-only копии) в Family Portal Knowledge Center, предоставленный advisor

---

## 📖 User Stories (High-Level)

**Main scenarios this Epic will enable:**

### Resource Management
1. **As an External Advisor**, **I want to create and organize educational resources of 9 different types**, **so that I can build a comprehensive knowledge library for my consulting practice**

2. **As an External Advisor**, **I want to organize resources into folders**, **so that I can structure my library by client type, service offering, or topic**

### Discovery & Organization
3. **As an External Advisor**, **I want to mark important resources as Featured**, **so that I can quickly access my most-used materials**

4. **As an External Advisor**, **I want to search and filter resources by type and sharing status**, **so that I can efficiently find the right content for each consultation**

---

## 🎨 Design & UX

**UX Notes:**

**User flows:**

### Flow 1: Create Simple Resource (Article/Link)
1. Advisor clicks "+ Create Resource" button in Advisor Portal
2. Modal opens with resource type selection (9 types)
3. Advisor selects type (e.g., "Article")
4. Form shows: Title, Description, Content/URL, Language selector
5. Advisor fills form and clicks "Create"
6. Resource appears in advisor's personal "All Resources" list

### Flow 2: Duplicate Existing Resource
1. Advisor finds resource to duplicate in their library
2. Clicks "⋮" menu → "Duplicate"
3. System creates copy with title "[Original Title] (Copy)"
4. Advisor can immediately edit duplicate
5. Duplicate appears in advisor's "All Resources" list

### Flow 3: Create Constitution Template (Partial)
1. Advisor clicks "+ Create Resource" → selects "Constitution Template"
2. Special form opens with 12 expandable sections:
   - Ways to Create Your Constitution
   - Preamble
   - Values and Mission
   - Governance Structure
   - Wealth Management
   - Education and Development
   - Decision Making Process
   - Succession Planning
   - Philanthropy
   - Conflict Resolution
   - Voting Rules and Procedures
   - Constitution Amendment Process
3. Each section has rich text editor for content input
4. Advisor fills some sections (e.g., only 5 out of 12)
5. Advisor clicks "Save Template" (no validation requiring all sections)
6. Template saved in advisor's library with filled sections, empty sections remain blank

### Flow 4: Share Resource with Family (Instant Notification)
1. Advisor finds resource in their library (search/filter)
2. Clicks "Share" button on resource card
3. Modal opens with dropdown of associated families
4. Advisor selects one or multiple families
5. System shows preview of what family will receive
6. Advisor confirms sharing
7. System creates read-only copy for each family
8. For Constitution Template: automatically populates filled sections in family's constitution-service (empty sections remain empty)
9. **INSTANT**: Family Council members receive notification in notification center
10. Notification message: "New resource shared by [Advisor Name]: [Resource Title]"
11. Resource appears in Family Portal Knowledge Center section
12. Resource card in Advisor Portal updates: "X families" count increments

### Flow 5: Share Updated Version
1. Advisor edits existing resource in their library
2. Clicks "Share" → selects families (including those who already have old version)
3. System creates NEW copy for families (does NOT update existing copy)
4. Families receive NEW notification: "Updated resource shared by [Advisor Name]: [Resource Title]"
5. Families now have BOTH versions in their Knowledge Center
6. Families decide whether to keep old version or use new one

### Flow 6: Organize with Folders
1. Advisor clicks "Create Folder" button in Advisor Portal
2. Names folder (e.g., "Onboarding Materials")
3. Drag-drop resources into folder OR select resources → "Move to Folder"
4. Folders appear in left sidebar with resource count (advisor's personal organization)
5. Folders can be shared with families (shares all contained resources)

### Flow 7: Family Views Shared Resources (Multi-Advisor)
1. Family Council member receives notification: "New resource shared by [Advisor Name]"
2. Family member navigates to "Knowledge Center" section in Family Portal
3. Sees **combined list** of resources from ALL associated advisors
4. Each resource shows: title, description, type badge, shared date, **advisor name**
5. Can filter by advisor if needed
6. Clicks on resource to view full content
7. Can read/download but cannot edit (read-only mode)

### Flow 8: Soft Delete & Recovery
1. Advisor deletes resource from their library
2. System performs **soft delete** (marks as deleted, sets deleted_at timestamp)
3. Resource moves to "Deleted" section in Advisor Portal
4. Within 6 months: advisor can restore deleted resource
5. After 6 months: system permanently deletes (scheduled cleanup job)
6. Families' copies remain unaffected (independent copies)

**Key UX Principles:**
- **Personal library concept**: каждый advisor создает свою собственную базу материалов
- **One-click sharing**: минимизировать friction для sharing workflow
- **Instant feedback**: immediate notifications для families при sharing
- **Metrics visibility**: показывать "X families" на каждой карточке
- **Draft support**: возможность save incomplete Constitution Templates
- **Bulk actions**: select multiple resources для bulk sharing, moving, deleting
- **Family Portal integration**: seamless experience с combined multi-advisor view
- **Safety net**: soft delete с 6-month retention для recovery

**See also:** [Link to 05-feature-specifications/FEAT-XXX.md for detailed UX]

---

## 🧮 Business Rules

### Resource Creation & Management

**BR-KC-001: Resource Types**
- System MUST support exactly 9 resource types:
  - Documents (file upload: PDF, DOCX, XLSX)
  - Articles (rich text editor)
  - Videos (embedded URL: YouTube, Vimeo)
  - Podcasts (audio file or URL)
  - Templates (file upload: PDF, DOCX, XLSX)
  - Guides (rich text editor or PDF)
  - External Links (URL validation required)
  - Checklists (structured format with checkable items)
  - Learning Paths (тип добавлен, функциональность в отдельном Epic)
- Special type: Constitution Template (belongs to Templates but has special form UI)
- All resource types available to all advisor types (Personal Family Advisor, External Consul, Marketplace Consultant)
- Each advisor creates and manages their own personal library of resources

**BR-KC-002: File Upload Limits**
- Maximum file size: 50MB per file
- Allowed formats:
  - Documents: PDF, DOCX, XLSX, PPTX
  - Templates: PDF, DOCX, XLSX
  - Podcasts: MP3, M4A (max 100MB)
- Virus scanning required before storage
- Files stored with unique UUID names to prevent collisions

**BR-KC-003: Resource Ownership**
- Each resource MUST be owned by exactly one advisor (creator)
- Resources stored in advisor's personal library in Advisor Portal
- Owner CAN edit/delete their own resources
- Owner CANNOT transfer ownership to another advisor
- If resource is shared with families, soft delete (archive) instead of hard delete

**BR-KC-004: Resource Duplication**
- Advisor can duplicate any of their own resources
- Duplicate creates new resource with:
  - Title: "[Original Title] (Copy)"
  - Same content/sections as original
  - Same type and language
  - Empty sharing history (not shared yet)
  - New UUID
- Duplicate is independent (changes don't affect original)
- Advisor can edit duplicate immediately after creation

**BR-KC-005: Resource Localization**
- Each resource MUST have language specified (ISO 639-1 code)
- Supported languages: English (en), Russian (ru), Spanish (es), French (fr), German (de), Chinese (zh)
- Advisors can create multiple versions of same resource in different languages
- Families see resources in their preferred language when available, fallback to English

**BR-KC-006: Soft Delete & Data Retention**
- Deleted resources marked with `deleted_at` timestamp (soft delete)
- Deleted resources remain in database for 6 months
- Advisor can restore soft-deleted resources within 6-month period
- After 6 months: scheduled cleanup job permanently deletes (hard delete)
- Families' shared copies remain unaffected (independent data)
- Deleted resources do NOT appear in search/filters (only in "Deleted" section)

### Constitution Template Sections

**BR-KC-007: Constitution Template Structure**
- Constitution Template MUST have exactly 12 sections:
  1. Ways to Create Your Constitution
  2. Preamble
  3. Values and Mission
  4. Governance Structure
  5. Wealth Management
  6. Education and Development
  7. Decision Making Process
  8. Succession Planning
  9. Philanthropy
  10. Conflict Resolution
  11. Voting Rules and Procedures
  12. Constitution Amendment Process
- Each section stored as JSONB field with: `title`, `content` (rich text), `status` (Not Started/In Progress/Completed), `updated_at`
- Sections can be saved individually (draft mode)
- **PARTIAL SHARING ALLOWED**: Template can be shared even if only some sections filled

**BR-KC-008: Constitution Template Partial Sharing**
- Advisor can share Constitution Template with any number of sections filled (1-12)
- When shared:
  - System creates IMMUTABLE snapshot of ONLY filled sections
  - Empty sections remain empty in family's constitution
  - Family can fill remaining sections themselves
  - Snapshot sent to constitution-service for that family
- If advisor later fills more sections and shares again:
  - Creates NEW copy with all currently filled sections
  - Family receives as separate resource (not update of existing)

**BR-KC-009: Constitution Template Sharing**
- When Constitution Template shared with family:
  - System creates IMMUTABLE snapshot (copy) of all filled sections
  - Snapshot sent to constitution-service for that family
  - Filled sections appear in family's Constitution page
  - Empty sections remain "Not Started" for family to complete
  - Family can edit their copy independently
  - Changes to original template do NOT affect already-shared copies
- Advisor can share same template with multiple families (each gets independent copy)

### Folder Organization

**BR-KC-010: Folder Structure**
- Advisors can create personal folders (1 level depth only, no nesting)
- Folders are personal to each advisor (not shared between advisors)
- Folder name MUST be unique per advisor (case-insensitive)
- Resources can belong to max 1 folder (no multi-folder assignment)
- Empty folders allowed
- Folders can be deleted (moves resources to "Uncategorized")
- **NO LIMIT** on number of folders per advisor

**BR-KC-011: Folder Sharing**
- Folders can be shared with families (bulk sharing of all contained resources)
- When folder shared: each resource creates independent copy for family
- Folder structure NOT visible to families (they see individual resources)

### Resource Sharing

**BR-KC-012: Association-Based Sharing**
- Advisor can ONLY share resources with families where `family_advisor_associations.is_active = true`
- Each sharing creates read-only copy owned by family (not reference to original)
- Families CANNOT edit shared resources (read-only mode)
- Families CAN delete their copies (does not affect advisor's original)
- Sharing does NOT affect advisor's original resource in their library

**BR-KC-013: Sharing Updates (No Versioning)**
- Advisor CANNOT "update" already-shared resource
- To provide updated content: advisor shares NEW version
- System creates NEW copy for family (families receive duplicate)
- Families decide whether to keep old version or replace with new
- Both versions coexist in family's Knowledge Center

**BR-KC-014: Sharing Notifications (Instant)**
- When advisor shares resource with family:
  - **INSTANT** notification sent to family notification center
  - Notification message: "New resource shared by [Advisor Name]: [Resource Title]"
  - Notification links to resource in Family Portal Knowledge Center
  - Family Council members ALWAYS receive notification
  - Family Members can opt-in to receive these notifications in their preferences
- Notifications sent immediately (no batching/digest)

### Featured Resources

**BR-KC-015: Featured Marking**
- Advisor can mark resources as "Featured" for quick access
- Featured status is personal (not visible to families or other advisors)
- No limit on number of Featured resources
- Featured resources appear in dedicated "FEATURED" tab in Advisor Portal

### Search & Filtering

**BR-KC-016: Search Scope**
- Search ONLY within advisor's own created resources (ownership-based)
- Search fields: title, description, content (full-text)
- Search results ranked by relevance, then by updated_at
- Deleted resources (soft deleted) do NOT appear in search

**BR-KC-017: Filter Options**
- Filter by Type: All / Documents / Articles / Videos / Podcasts / Templates / Guides / External Links / Checklists / Learning Paths
- Filter by Sharing Status: All / Shared / Not Shared
- Filter by Folder: All / [Folder Name] / Uncategorized
- Filter by Language: All / English / Russian / Spanish / French / German / Chinese
- Multiple filters combine with AND logic

### Metrics & Analytics

**BR-KC-018: Resource Metrics**
- System MUST track for each resource:
  - **Families Count**: number of unique families this resource shared with
- Metrics update in real-time (no batch processing)
- Metrics display on resource cards in Advisor Portal

### Family Portal Integration

**BR-KC-019: Family Portal Display (Multi-Advisor)**
- Family Portal MUST have dedicated "Knowledge Center" section
- Section displays **COMBINED LIST** of resources from ALL associated advisors
- Resources from multiple advisors shown in single unified view
- Each resource displays:
  - Title, description, type badge
  - Shared date
  - **Advisor name** (who shared this resource)
- Resources organized by shared date (newest first) by default
- Families can filter by:
  - Resource type
  - Advisor name (if multiple advisors)
  - Shared date range
- Resources are read-only (no edit capabilities)

**BR-KC-020: Family Portal Resource Actions**
- Families can view/download resources
- Families can delete their copies (does not affect advisor's original or other families)
- Families CANNOT edit resource content
- For Constitution Templates: content automatically populates in family's constitution (read-only in Knowledge Center, editable in Constitution section)

**See also:** [Link to 06-business-rules/BR-KC-XXX.md for detailed business rules]

---

## 📝 Notes

### Resolved Questions:
- [x] Constitution Template validation → Partial sharing allowed
- [x] Folder limits → No limits
- [x] Resource duplication → Yes, with "(Copy)" suffix
- [x] Family Portal section name → "Knowledge Center"
- [x] Multi-advisor resources → Combined list with advisor name shown
- [x] Notification frequency → Instant notifications
- [x] Data retention → 6 months soft delete retention
- [x] Updated versions → New resource copies (no versioning)

### Additional Considerations:
- **Performance**: Large Constitution Templates (12 sections rich text) могут быть heavy. Consider pagination для section loading.
- **Search optimization**: Full-text search across large libraries может быть slow. Monitor query performance.
- **Storage costs**: File uploads (50MB limit) + 6-month retention могут accumulate. Monitor storage usage.

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-21  
**Epic Status:** Ready for Refinement  
**Next Step:** Backlog Grooming → Sprint Planning
