STORY 7: Backend - Constitution Progress Tracking Data Model

**Issue Type:** Story
**Project:** RLN2
**Summary:** As a backend system, I want to store constitution setup progress per user, so that users can resume onboarding later
**Epic Link:** SAAS-EPIC-001
**Priority:** High
**Story Points:** 5
**Sprint:** TBD

### ðŸ"– User Story

**As a** backend system,
**I want to** create a database table to track constitution setup progress per user,
**so that** users can skip onboarding, resume later, and see progress across sessions.

### ðŸŽ¯ Business Context

Constitution setup is 8 steps and may take 30-60 minutes. Users need ability to save progress, skip tour, and resume later without losing work. Enables "Resume Setup" feature on dashboard.

### âœ… Acceptance Criteria

1. **Given** a user starts constitution setup,
   **When** they complete Step 1,
   **Then** system saves `current_step = 1`, `step_1_data = {...}` in `constitution_progress` table.

2. **Given** a user completes all 8 steps,
   **When** they finish the wizard,
   **Then** system marks `is_complete = TRUE`, `completed_at = NOW()`.

3. **Given** a user skips the tour,
   **When** they click "Skip Tour",
   **Then** system saves `tour_skipped = TRUE`, `last_viewed_step = X`, preserves step data.

4. **Given** a user returns after skipping,
   **When** they click "Resume Setup",
   **Then** system loads wizard at `last_viewed_step` with previously saved data.

**Additional Criteria:**
- [ ] Table: `constitution_progress` with columns: user_id, family_id, current_step, step_1_data (JSONB), step_2_data (JSONB), ..., step_8_data (JSONB), is_complete, tour_skipped, last_viewed_step, completed_at
- [ ] JSONB columns store step-specific form data
- [ ] Unique constraint: (user_id, family_id) - one progress record per user per family
- [ ] Auto-save: Update progress after each step completion
- [ ] Default: `tour_skipped = FALSE`, `is_complete = FALSE`

### ðŸ" Design & UX

N/A (Backend data model story)

### ðŸ"' Business Rules

**Validation Rules:**
1. **current_step:** Integer 1-8
2. **step_X_data:** Valid JSON objects, schema validated per step
3. **is_complete:** Set to TRUE only when all 8 steps have data
4. **tour_skipped:** Boolean, TRUE when user clicks "Skip Tour"
5. **last_viewed_step:** Updated on every step navigation

**Authorization:**
- **Who can write:** Authenticated users (update their own progress only)
- **Who can read:** Same user + Family Council (can view family progress)

**Edge Cases:**
- **User changes family:** Progress is family-specific, separate progress per family
- **User deletes progress mid-setup:** Allow reset, clear all step data
- **Multiple browser sessions:** Last write wins, no conflict resolution

### ðŸ§ª Test Scenarios

**Happy Path:**
1. User completes Step 1 → `current_step = 1`, `step_1_data = {...}`, `is_complete = FALSE`
2. User completes Steps 2-8 → `is_complete = TRUE`, `completed_at = NOW()`

**Negative Tests:**
1. **Invalid step number:** Try to set `current_step = 10` → Validation error
2. **Invalid JSON:** Try to save malformed JSON in step_1_data → Database error

**Edge Cases:**
1. **Skip tour at Step 3:** `tour_skipped = TRUE`, `last_viewed_step = 3`, step data preserved
2. **Resume after skip:** Load wizard at Step 3, pre-fill form with `step_3_data`

### ðŸ"— Dependencies

**Story Dependencies:**
- **Blocked by:** RLN2-006 (User registration API must exist to create users)
- **Blocks:** RLN2-008 (Constitution Progress API depends on this data model)

### âš ï¸ Non-Functional Requirements

**Performance:**
- Progress save (INSERT/UPDATE): < 100ms
- Progress load (SELECT): < 50ms

**Database:**
- Table: `constitution_progress`
- Indexes: PRIMARY KEY (user_id, family_id), INDEX (family_id)
- JSONB columns allow flexible step data storage

**Security:**
- Row-level security: Users can only access their own progress
- Family Council can view progress of all family members

---
