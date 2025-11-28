## ðŸ"‹ STORY 9: Backend - Workshop Selection Authorization & Storage

**Issue Type:** Story
**Project:** RLN2
**Summary:** As a backend system, I want to enforce role-based workshop selection authorization, so that only Family Administrators/Council can choose formats
**Epic Link:** SAAS-EPIC-001
**Priority:** Critical
**Story Points:** 5
**Sprint:** TBD

### ðŸ"– User Story

**As a** backend authorization system,
**I want to** enforce that only Family Administrators or Family Council members can select workshop formats in Steps 4-7,
**so that** Family Members cannot change workshop selections and must accept Administrator/Council's choice.

### ðŸŽ¯ Business Context

**CRITICAL SECURITY REQUIREMENT:** Workshop selection determines budget and advisor engagement (advisor-led is expensive, AI-assisted is mid-tier, manual is free). Family Members should NOT be able to change workshop method selected by leadership. This prevents unauthorized cost commitments.

### âœ… Acceptance Criteria

1. **Given** a Family Administrator or Council member,
   **When** they POST `/constitution/workshop-selection` with `{"step": 4, "format": "advisor"}`,
   **Then** system validates role, saves selection, returns 200 OK.

2. **Given** a regular Family Member (no admin/council permissions),
   **When** they POST `/constitution/workshop-selection` with any format,
   **Then** system returns 403 Forbidden "Only Family Administrators or Council can select workshop formats."

3. **Given** a Family Member views Steps 4-7 (workshop selection steps),
   **When** they GET `/constitution/workshop-selection/{step}`,
   **Then** system returns current selection with `is_editable = FALSE` (read-only for them).

4. **Given** workshop selection is already made by Administrator,
   **When** Family Council member views Steps 4-7,
   **Then** system returns current selection with `is_editable = TRUE` (they can change it).

**Additional Criteria:**
- [ ] JWT token validation: Check `is_admin` OR `is_family_council` flags
- [ ] Database table: `workshop_selections` with columns: family_id, step, format (enum: advisor/ai/manual), selected_by_user_id, selected_at
- [ ] Unique constraint: (family_id, step) - one selection per step per family
- [ ] Frontend: Workshop selection UI hidden for Family Members, shows read-only view with acceptance message

### ðŸ" Design & UX

N/A (Backend authorization story)

### ðŸ"' Business Rules

**Validation Rules:**
1. **Authorization:** Only users with `is_admin = TRUE` OR `is_family_council = TRUE` can POST workshop selection
2. **Workshop formats:** Enum: "advisor", "ai", "manual"
3. **Steps with workshop selection:** Steps 4, 5, 6, 7 (Assessment, Values/Mission/Vision, Decision Making/Conflict Resolution, Succession)
4. **Family-level selection:** Workshop selection is per family (family_id), not per user

**Authorization:**
- **Who can POST:** Family Administrator OR Family Council
- **Who can GET:** All family members (to view current selection)

**Edge Cases:**
- **Family Member tries to POST:** Return 403 Forbidden
- **Administrator changes format after Family Member accepted:** Family Member sees updated format, must re-accept
- **Multiple Council members change selection concurrently:** Last write wins (no conflict resolution)

### ðŸ§ª Test Scenarios

**Happy Path:**
1. Administrator POST `/constitution/workshop-selection` with Step 4, format "advisor" → 200 OK, selection saved
2. Family Member GET `/constitution/workshop-selection/4` → 200 OK, returns `{"format": "advisor", "is_editable": false}`

**Negative Tests:**
1. **Unauthorized POST:** Family Member (no admin/council flag) POST workshop selection → 403 Forbidden "Only Family Administrators or Council can select workshop formats"
2. **Invalid format:** POST with `format = "invalid"` → 400 Bad Request "Invalid workshop format"
3. **Invalid step:** POST with `step = 2` (not a workshop step) → 400 Bad Request "Workshop selection not available for this step"

**Edge Cases:**
1. **Council member changes Administrator's selection:** POST by Council → 200 OK, selection overwritten, `selected_by_user_id` updated
2. **Family Member attempts unauthorized POST via API manipulation:** JWT token validated, 403 Forbidden returned

### ðŸ"— Dependencies

**Story Dependencies:**
- **Blocked by:** RLN2-006 (User registration API with JWT token generation)
- **Blocks:** RLN1-013 (Frontend workshop selection UI depends on this authorization)

### âš ï¸ Non-Functional Requirements

**Performance:**
- POST `/constitution/workshop-selection`: < 100ms
- GET `/constitution/workshop-selection/{step}`: < 50ms

**Security:**
- âœ… CRITICAL: Validate JWT token on every POST request
- âœ… CRITICAL: Check `is_admin` OR `is_family_council` flags before allowing POST
- âœ… CRITICAL: Frontend UI hiding is NOT sufficient; backend must enforce authorization

**Database:**
- Table: `workshop_selections`
- Columns: `family_id`, `step`, `format`, `selected_by_user_id`, `selected_at`
- Unique constraint: (family_id, step)

### ðŸ" Notes

**Questions:**
- [ ] Should we notify all family members when workshop format is changed by Administrator/Council?
- [ ] Should we log workshop selection changes for audit trail?
- [ ] What happens if Administrator deletes their account after selecting workshop format?

---
