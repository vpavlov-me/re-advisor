STORY 6: Backend - User Registration & OAuth Account Creation API

**Issue Type:** Story
**Project:** RLN2
**Summary:** As a backend system, I want to create user accounts via email/password or OAuth, so that users can register and authenticate
**Epic Link:** SAAS-EPIC-001
**Priority:** Critical
**Story Points:** 8
**Sprint:** TBD

### ðŸ"– User Story

**As a** backend authentication service,
**I want to** provide API endpoints for user registration (email/password and OAuth providers),
**so that** users can create accounts and receive JWT tokens for authenticated access.

### ðŸŽ¯ Business Context

Core backend service enabling all registration methods. Handles user creation, password hashing, OAuth account linking, JWT token generation. Critical for Epic success.

### âœ… Acceptance Criteria

1. **Given** a POST request to `/auth/register` with email and password,
   **When** email is unique and password meets requirements,
   **Then** create user, hash password with bcrypt, return JWT token.

2. **Given** a POST request to `/auth/oauth/google` with Google authorization code,
   **When** code is valid,
   **Then** exchange code for Google user data, create user (if new email) or link account (if existing), return JWT token.

3. **Given** a POST request to `/auth/oauth/apple` with Apple authorization code,
   **When** code is valid,
   **Then** exchange code for Apple user data (handle relay emails), create user or link account, return JWT token.

4. **Given** a POST request to `/auth/oauth/linkedin` with LinkedIn authorization code,
   **When** code is valid,
   **Then** exchange code for LinkedIn user data, create user or link account, return JWT token.

5. **Given** an existing user tries to register with same email,
   **When** any registration method is used,
   **Then** return 409 Conflict error: "Email already registered."

**Additional Criteria:**
- [ ] JWT tokens include: user_id, family_id, email, is_admin, is_family_council
- [ ] Passwords hashed with bcrypt (cost factor 12)
- [ ] OAuth accounts stored with oauth_provider and oauth_id
- [ ] Account linking: If OAuth email matches existing user, link accounts (don't create duplicate)
- [ ] Database transactions: Rollback on any error during user creation

### ðŸ" Design & UX

N/A (Backend API story)

### ðŸ"' Business Rules

**Validation Rules:**
1. **Email:** Unique, valid email format
2. **Password:** Min 8 characters, at least 1 uppercase, 1 lowercase, 1 number
3. **OAuth ID:** Unique per provider (google_oauth_id, apple_oauth_id, linkedin_oauth_id)
4. **Account Linking:** If email exists, add OAuth provider to existing user, don't create new user

**Authorization:**
- **Who can call:** Public endpoints (no authentication required for registration)

**Edge Cases:**
- **User registers with email/password, later adds Google OAuth:** Link accounts, user can log in with both methods
- **User registers with Google (real email), later tries Apple with same email:** Link accounts
- **User registers with Apple (relay email), later tries Google with different real email:** Create separate accounts (no way to detect they're the same person)

### ðŸ§ª Test Scenarios

**Happy Path:**
1. POST `/auth/register` with `{"email": "test@example.com", "password": "Test1234"}` → 201 Created, returns JWT token
2. POST `/auth/oauth/google` with valid authorization code → 200 OK, returns JWT token

**Negative Tests:**
1. **Duplicate email:** POST `/auth/register` with existing email → 409 Conflict
2. **Weak password:** POST with password "123456" → 400 Bad Request "Password must be at least 8 characters"
3. **Invalid OAuth code:** POST `/auth/oauth/google` with invalid code → 401 Unauthorized "Google authentication failed"

**Edge Cases:**
1. **Account linking:** User exists with email test@example.com → POST `/auth/oauth/google` with same email → Returns JWT, links accounts, no duplicate user created
2. **Apple relay email:** POST `/auth/oauth/apple` returns relay email `xyz@privaterelay.appleid.com` → User created with relay email

### ðŸ"— Dependencies

**Story Dependencies:**
- **Blocked by:** None (first backend story)
- **Blocks:** RLN1-001 through RLN1-005 (all frontend registration stories depend on this)
- **External:** Google OAuth API, Apple OAuth API, LinkedIn OAuth API

### âš ï¸ Non-Functional Requirements

**Performance:**
- Registration API response: < 500ms (p95)
- Password hashing (bcrypt): < 200ms
- OAuth code exchange: < 1 second (external API call)

**Security:**
- Passwords hashed with bcrypt (cost factor 12), never stored in plain text
- JWT tokens signed with RS256 (RSA public/private key pair)
- OAuth client secrets stored in environment variables, never in code
- Rate limiting: Max 5 registration attempts per IP per minute

**Database:**
- Users table: `id`, `family_id`, `email`, `password_hash`, `oauth_provider`, `oauth_id`, `is_admin`, `is_family_council`, `created_at`
- OAuth table: `user_id`, `provider`, `oauth_id`, `access_token`, `refresh_token`, `expires_at`

**Accessibility:**
N/A (Backend API)

**Browser Support:**
N/A (Backend API)

---
