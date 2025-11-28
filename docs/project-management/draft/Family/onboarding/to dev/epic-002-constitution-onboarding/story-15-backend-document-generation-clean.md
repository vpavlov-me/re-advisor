STORY 15: Backend - Constitution Document Generation

**Issue Type:** Story
**Project:** RLN2
**Summary:** As a backend system, I want to generate a 12-section family constitution document from wizard data, so that families have a finalized governance framework
**Epic Link:** SAAS-EPIC-001
**Priority:** High
**Story Points:** 8
**Sprint:** TBD

### ðŸ"– User Story

**As a** backend constitution service,
**I want to** generate a comprehensive 12-section family constitution document from completed wizard data,
**so that** families receive a professional, actionable governance framework.

### ðŸŽ¯ Business Context

Constitution document is the ultimate deliverable of onboarding. Must be professional, comprehensive, and actionable. This is the "proof of value" moment that justifies time investment in 8-step wizard.

### âœ… Acceptance Criteria

1. **Given** all 8 wizard steps are completed,
   **When** POST `/constitution/generate` is called,
   **Then** system generates 12-section constitution document and returns document ID.

2. **Given** constitution document is generated,
   **When** GET `/constitution/document/{id}` is called,
   **Then** system returns full constitution with all 12 sections populated.

3. **Given** constitution generation request with incomplete data,
   **When** POST `/constitution/generate` is called,
   **Then** system returns 400 Bad Request "All wizard steps must be completed."

4. **Given** constitution document exists,
   **When** family views Constitution page,
   **Then** system displays formatted document with navigation to all 12 sections.

**Additional Criteria:**
- [ ] 12 sections: Preamble, Values & Mission, Governance Structure, Decision Making, Conflict Resolution, Voting Rules, Wealth Management, Philanthropy, Succession, Education, Family Business, Amendment Process
- [ ] Each section populated with user inputs from wizard steps
- [ ] Constitution includes metadata: family_id, created_at, created_by_user_id, version
- [ ] Document stored in `constitutions` table with JSONB content field
- [ ] Generation idempotent: Multiple POST requests return same document (don't create duplicates)

### ðŸ" Design & UX

N/A (Backend story)

### ðŸ"' Business Rules

**Validation Rules:**
1. **Prerequisites:** All 8 wizard steps must have data (validated before generation)
2. **Data mapping:** Step 1 → Preamble, Step 5 → Values & Mission, Step 6 → Decision Making, etc.
3. **Version control:** First constitution is version 1.0, amendments create new versions
4. **Family-level document:** One constitution per family (family_id), not per user

**Authorization:**
- **Who can generate:** Family Administrator OR Family Council
- **Who can view:** All family members

**Edge Cases:**
- **Multiple generation requests:** Return existing document if already generated (idempotent)
- **Incomplete data:** Return 400 error with list of missing steps
- **Concurrent generation:** Use database lock to prevent duplicate documents

### ðŸ§ª Test Scenarios

**Happy Path:**
1. Complete all 8 steps → POST `/constitution/generate` → 200 OK, returns document_id → GET `/constitution/document/{id}` → Returns full 12-section constitution

**Negative Tests:**
1. **Incomplete steps:** Step 4 missing → POST `/constitution/generate` → 400 "Step 4 (Assessment) data missing"
2. **Unauthorized:** Family Member (no admin/council) POST `/constitution/generate` → 403 Forbidden

**Edge Cases:**
1. **Duplicate generation:** POST `/constitution/generate` twice → First returns 201 Created, second returns 200 OK with existing document_id (no duplicate created)
2. **Partial data:** Step 6 has only 1 field filled → Generation succeeds, section includes placeholder text for missing fields

### ðŸ"— Dependencies

**Story Dependencies:**
- **Blocked by:** RLN2-007 (Constitution Progress data model), RLN2-008 (Constitution Progress API)
- **Blocks:** RLN1-014 (Frontend Step 8 depends on this generation API)

### âš ï¸ Non-Functional Requirements

**Performance:**
- Constitution generation: < 5 seconds (p95)
- Document retrieval: < 100ms

**Database:**
- Table: `constitutions`
- Columns: `id`, `family_id`, `version`, `content` (JSONB), `created_by_user_id`, `created_at`, `updated_at`
- Indexes: PRIMARY KEY (id), INDEX (family_id), UNIQUE (family_id, version)

**Security:**
- Authorization: Validate JWT token, check admin/council role
- Family isolation: Filter by `family_id` from JWT token

### ðŸ" Notes

---
