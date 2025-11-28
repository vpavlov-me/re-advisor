STORY 3: OAuth Registration - Google Sign-In

**Issue Type:** Story
**Project:** RLN1
**Summary:** As a new user, I want to register with Google account, so that I can sign up quickly without creating a new password
**Epic Link:** SAAS-EPIC-001
**Priority:** High
**Story Points:** 5
**Sprint:** TBD

### ðŸ"– User Story

**As a** new user,
**I want to** click "Sign in with Google" and use my Google account for registration,
**so that** I can create an account quickly without remembering another password.

### ðŸŽ¯ Business Context

OAuth reduces signup friction significantly (40-60% higher conversion than email/password). Google is the most popular OAuth provider globally. Implements OAuth 2.0 authorization code flow with PKCE for security.

### âœ… Acceptance Criteria

1. **Given** I am on the registration page,
   **When** I view the form,
   **Then** I see a "Sign in with Google" button above the email/password fields.

2. **Given** I click "Sign in with Google",
   **When** Google authentication popup opens,
   **Then** I can select my Google account and grant permissions.

3. **Given** I successfully authenticate with Google,
   **When** I return to the platform,
   **Then** my account is created (if new email) or I'm logged in (if existing email), and I'm redirected to the dashboard.

4. **Given** I authenticate with Google using an email that already exists (registered via email/password),
   **When** I complete OAuth flow,
   **Then** the accounts are linked, and I can use both login methods in the future.

**Additional Criteria:**
- [ ] OAuth uses authorization code flow with PKCE (not implicit flow)
- [ ] Google account email, name, and profile picture are retrieved
- [ ] JWT token generated and stored in localStorage
- [ ] User record includes `oauth_provider = 'google'` and `oauth_id`
- [ ] Error handling: Show clear error if Google authentication fails

### ðŸ" Design & UX

**Mockups/Wireframes:**
- Figma: https://www.figma.com/design/NWeSLJWw6iPinNILwPbsfv/-ReFamily--Web-Platofrm?node-id=3690-114248

**User Flow:**
1. User clicks "Sign in with Google" button
2. Google OAuth popup opens
3. User selects Google account
4. User grants permissions (email, profile, name)
5. Popup closes, user returned to platform
6. System creates account (new) or logs in (existing)
7. User redirected to dashboard

### ðŸ"' Business Rules

**Validation Rules:**
1. **Google OAuth Response:** Must include email, name, and oauth_id (Google user ID)
2. **Account Linking:** If email exists, link OAuth provider to existing account
3. **New Account:** If email doesn't exist, create new user with `oauth_provider = 'google'`

**Authorization:**
- **Who can use:** Public (unauthenticated users)

**Edge Cases:**
- **User cancels Google authentication:** Return to registration page, show no error
- **Google returns no email (rare):** Show error "Unable to retrieve email from Google. Please try another method."
- **Existing user with password + Google OAuth:** Both methods valid for login

### ðŸ§ª Test Scenarios

**Happy Path:**
1. Click "Sign in with Google" → Google popup opens → Select account → Grant permissions → Return to platform → Account created → Redirected to dashboard with JWT token

**Negative Tests:**
1. **User cancels OAuth:** Click "Sign in with Google" → Cancel popup → Should return to registration page gracefully
2. **Google API error:** Google returns 500 error → Show error "Google authentication unavailable. Please try again later."

**Edge Cases:**
1. **Account linking:** Register with email test@example.com via password → Later click "Sign in with Google" with same email → Accounts linked, both login methods work
2. **Multiple OAuth providers:** Register with Google → Later add Apple OAuth → User can log in with either

### ðŸ"— Dependencies

**Story Dependencies:**
- **Blocked by:** RLN1-002 (Email/password registration UI must exist)
- **Blocks:** RLN1-009 (Backend must handle OAuth user creation)
- **External:** Google OAuth API credentials (client_id, client_secret) required

### âš ï¸ Non-Functional Requirements

**Performance:**
- OAuth popup load time: < 2 seconds
- Authorization code exchange: < 1 second
- Total OAuth flow: < 10 seconds

**Security:**
- Use OAuth 2.0 authorization code flow with PKCE
- Never expose client_secret in frontend code
- Validate state parameter to prevent CSRF attacks
- Store oauth_id encrypted in database

**Accessibility:**
- WCAG level: AA
- Button clearly labeled "Sign in with Google"
- Screen reader announces button purpose

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Mobile Safari: Latest 2 versions (iOS)
- Chrome Mobile: Latest 2 versions (Android)

---
