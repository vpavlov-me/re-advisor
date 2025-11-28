STORY 8: Backend - Constitution Progress API Endpoints

**Issue Type:** Story
**Project:** RLN2
**Summary:** As a frontend application, I want to save and load constitution progress via API, so that users can resume setup across sessions
**Epic Link:** SAAS-EPIC-001
**Priority:** High
**Story Points:** 5
**Sprint:** TBD

### ðŸ"– User Story

**As a** frontend application,
**I want to** call API endpoints to save/load constitution progress,
**so that** users can skip onboarding, resume later, and see progress preserved.

### ðŸŽ¯ Business Context

Enables "Skip Tour" and "Resume Setup" functionality. Critical for reducing abandonment by allowing users to pause onboarding and return later.

### âœ… Acceptance Criteria

1. **Given** authenticated user,
   **When** GET `/constitution/progress`,
   **Then** return current progress: current_step, step_1_data, ..., is_complete, tour_skipped.

2. **Given** authenticated user completes a step,
   **When** POST `/constitution/progress` with `{"step": 3, "data": {...}}`,
   **Then** update `step_3_data`, set `current_step = 3`, return updated progress.

3. **Given** authenticated user clicks "Skip Tour",
   **When** POST `/constitution/progress/skip` with `{"last_viewed_step": 5}`,
   **Then** set `tour_skipped = TRUE`, `last_viewed_step = 5`, return confirmation.

4. **Given** authenticated user completes all 8 steps,
   **When** POST `/constitution/progress/complete`,
   **Then** set `is_complete = TRUE`, `completed_at = NOW()`, trigger constitution generation.

**Additional Criteria:**
- [ ] Authorization: Verify JWT token, ensure user_id matches progress record
- [ ] Family isolation: Filter by `family_id` from JWT token
- [ ] Validation: Validate step number (1-8) and JSON schema per step
- [ ] Auto-save: Frontend calls API after each step completion (no manual save button)

### ðŸ" Design & UX

N/A (Backend API story)

### ðŸ"' Business Rules

**Validation Rules:**
1. **Step number:** Must be 1-8
2. **Step data:** Valid JSON, schema-validated per step
3. **Authorization:** User can only update their own progress

**Authorization:**
- **Who can call:** Authenticated users
- **Family Council:** Can also view progress of family members (GET only)

**Edge Cases:**
- **User skips to Step 8 without completing Steps 1-7:** Allow (system validates data completeness on "Complete" action)
- **User updates Step 3 after already completing Step 7:** Allow (user can go back and edit)

### ðŸ§ª Test Scenarios

**Happy Path:**
1. GET `/constitution/progress` (new user) → 200 OK, returns empty progress
2. POST `/constitution/progress` with Step 1 data → 200 OK, progress saved
3. GET `/constitution/progress` → Returns Step 1 data
4. POST `/constitution/progress/skip` → 200 OK, `tour_skipped = TRUE`
5. POST `/constitution/progress/complete` (all steps done) → 200 OK, `is_complete = TRUE`

**Negative Tests:**
1. **Unauthorized:** GET `/constitution/progress` without JWT → 401 Unauthorized
2. **Invalid step:** POST with `step = 10` → 400 Bad Request "Invalid step number"
3. **Invalid JSON:** POST with malformed JSON → 400 Bad Request "Invalid step data"

**Edge Cases:**
1. **Skip tour at Step 5:** POST `/constitution/progress/skip` with `last_viewed_step = 5` → Progress saved, user can resume at Step 5 later
2. **Complete without all steps:** POST `/constitution/progress/complete` but Step 4 missing → 400 Bad Request "All steps must be completed"

### ðŸ"— Dependencies

**Story Dependencies:**
- **Blocked by:** RLN2-007 (Constitution Progress data model must exist)
- **Blocks:** RLN1-012 (Frontend constitution wizard depends on this API)

### âš ï¸ Non-Functional Requirements

**Performance:**
- GET `/constitution/progress`: < 100ms (p95)
- POST `/constitution/progress`: < 200ms (includes database write)

**Security:**
- JWT authentication required for all endpoints
- Row-level security: Users can only access their own progress
- Family Council can view (read-only) progress of family members

**API Rate Limiting:**
- Max 60 requests per minute per user

---
