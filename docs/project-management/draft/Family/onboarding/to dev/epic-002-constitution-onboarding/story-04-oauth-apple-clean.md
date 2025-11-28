## ðŸ"‹ STORY 4: OAuth Registration - Apple Sign-In

**Issue Type:** Story
**Project:** RLN1
**Summary:** As a new user, I want to register with Apple ID, so that I can sign up quickly with enhanced privacy
**Epic Link:** SAAS-EPIC-001
**Priority:** High
**Story Points:** 5
**Sprint:** TBD

### ðŸ"– User Story

**As a** new user (especially iOS users),
**I want to** click "Sign in with Apple" and use my Apple ID for registration,
**so that** I can create an account quickly with Apple's privacy protections.

### ðŸŽ¯ Business Context

Apple Sign-In is mandatory for iOS apps and preferred by privacy-conscious users. Offers "Hide My Email" feature (relay emails). Critical for mobile app future compatibility.

### âœ… Acceptance Criteria

1. **Given** I am on the registration page,
   **When** I view the form,
   **Then** I see a "Sign in with Apple" button.

2. **Given** I click "Sign in with Apple",
   **When** Apple authentication modal opens,
   **Then** I can authenticate with Face ID/Touch ID or Apple password.

3. **Given** I successfully authenticate with Apple,
   **When** I return to the platform,
   **Then** my account is created (if new email) or I'm logged in (if existing email), and I'm redirected to the dashboard.

4. **Given** I use "Hide My Email" feature,
   **When** Apple provides relay email,
   **Then** system accepts relay email and stores it as primary contact email.

**Additional Criteria:**
- [ ] OAuth uses Apple's authorization code flow
- [ ] Handle both real email and Apple relay email (privaterelay.appleid.com)
- [ ] JWT token generated and stored
- [ ] User record includes `oauth_provider = 'apple'` and `oauth_id`
- [ ] Error handling: Clear error if Apple authentication fails

### ðŸ" Design & UX

**Mockups/Wireframes:**
- Figma: https://www.figma.com/design/NWeSLJWw6iPinNILwPbsfv/-ReFamily--Web-Platofrm?node-id=3690-114248

**User Flow:**
1. User clicks "Sign in with Apple" button
2. Apple authentication modal opens
3. User authenticates with Face ID/Touch ID/Password
4. User chooses: Share My Email OR Hide My Email
5. Modal closes, user returned to platform
6. System creates account or logs in
7. User redirected to dashboard

### ðŸ"' Business Rules

**Validation Rules:**
1. **Apple OAuth Response:** Must include email (real or relay), name (may be blank if user declines), oauth_id
2. **Relay Email Handling:** Accept and store `privaterelay.appleid.com` emails as valid
3. **Account Linking:** If relay email OR real email matches existing user, link accounts

**Authorization:**
- **Who can use:** Public (unauthenticated users)

**Edge Cases:**
- **User declines sharing name:** Create account with email only, name = NULL
- **User switches from relay email to real email later:** Apple doesn't support this; relay email is permanent
- **Existing user with relay email:** Must always use Apple Sign-In (no password fallback)

### ðŸ§ª Test Scenarios

**Happy Path:**
1. Click "Sign in with Apple" → Apple modal opens → Authenticate with Face ID → Choose "Share My Email" → Return to platform → Account created → Redirected to dashboard

**Negative Tests:**
1. **User cancels Apple authentication:** Cancel modal → Return to registration page gracefully
2. **Apple API error:** Apple returns error → Show "Apple authentication unavailable. Please try again later."

**Edge Cases:**
1. **Hide My Email:** Choose "Hide My Email" → System receives relay email `xyz@privaterelay.appleid.com` → Account created with relay email
2. **Account linking with relay email:** User 1 registers with Apple (relay email) → User 2 tries to register with same Apple ID → System recognizes oauth_id, logs in User 1

### ðŸ"— Dependencies

**Story Dependencies:**
- **Blocked by:** RLN1-003 (Google OAuth implementation provides pattern)
- **Blocks:** RLN1-009 (Backend must handle Apple OAuth user creation)
- **External:** Apple Developer account, Apple Sign-In API credentials required

### âš ï¸ Non-Functional Requirements

**Performance:**
- Apple modal load time: < 2 seconds
- Authorization code exchange: < 1 second
- Total OAuth flow: < 10 seconds

**Security:**
- Use OAuth 2.0 authorization code flow
- Validate Apple JWT token signature with Apple public keys
- Verify `nonce` and `state` parameters to prevent replay attacks
- Store oauth_id encrypted in database

**Accessibility:**
- WCAG level: AA
- Button clearly labeled "Sign in with Apple"
- Screen reader announces button purpose

**Browser Support:**
- Safari: Latest 2 versions (priority)
- Chrome: Latest 2 versions
- Mobile Safari (iOS): Latest 2 versions (critical for iOS app)

### ðŸ" Notes

**Questions:**
- [ ] Should we handle "Hide My Email" differently for invitation system (relay email can't receive family invites)?
- [ ] What happens if Apple account is disabled after registration?
- [ ] Should we implement "Sign in with Apple" web button (for web) and native SDK (for mobile app separately)?

---
