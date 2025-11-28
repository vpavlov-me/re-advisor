STORY 5: OAuth Registration - LinkedIn Sign-In

**Issue Type:** Story
**Project:** RLN1
**Summary:** As a professional user, I want to register with LinkedIn, so that I can sign up quickly using my professional profile
**Epic Link:** SAAS-EPIC-001
**Priority:** Medium
**Story Points:** 3
**Sprint:** TBD

### ðŸ"– User Story

**As a** professional user (Family Advisor or business-focused family member),
**I want to** click "Sign in with LinkedIn" and use my LinkedIn account for registration,
**so that** I can leverage my professional profile for quick signup.

### ðŸŽ¯ Business Context

LinkedIn OAuth targets professional user segment (External Advisors, Family Council with business backgrounds). Lower priority than Google/Apple but valuable for advisor personas. Provides professional profile data (company, title) useful for advisor registry.

### âœ… Acceptance Criteria

1. **Given** I am on the registration page,
   **When** I view the form,
   **Then** I see a "Sign in with LinkedIn" button.

2. **Given** I click "Sign in with LinkedIn",
   **When** LinkedIn authentication popup opens,
   **Then** I can authenticate with LinkedIn credentials.

3. **Given** I successfully authenticate with LinkedIn,
   **When** I return to the platform,
   **Then** my account is created (if new email) or I'm logged in (if existing email), and I'm redirected to the dashboard.

4. **Given** I am registering as an External Advisor,
   **When** LinkedIn provides professional profile data (company, job title),
   **Then** system optionally pre-fills advisor profile fields.

**Additional Criteria:**
- [ ] OAuth uses LinkedIn authorization code flow
- [ ] Retrieve: email, name, profile picture, company, job title
- [ ] JWT token generated and stored
- [ ] User record includes `oauth_provider = 'linkedin'` and `oauth_id`
- [ ] Professional data stored in advisor registry if user is External Advisor

### ðŸ" Design & UX

**Mockups/Wireframes:**
- Figma: https://www.figma.com/design/NWeSLJWw6iPinNILwPbsfv/-ReFamily--Web-Platofrm?node-id=3690-114248

**User Flow:**
1. User clicks "Sign in with LinkedIn" button
2. LinkedIn OAuth popup opens
3. User authenticates with LinkedIn credentials
4. User grants permissions (email, profile, company)
5. Popup closes, user returned to platform
6. System creates account (new) or logs in (existing)
7. If External Advisor: Professional profile data pre-fills advisor registry fields
8. User redirected to dashboard

### ðŸ"' Business Rules

**Validation Rules:**
1. **LinkedIn OAuth Response:** Must include email, name, oauth_id; optionally company and job title
2. **Account Linking:** If email exists, link OAuth provider to existing account
3. **Advisor Profile Pre-fill:** If user role = External Advisor, use company and job title for advisor registry

**Authorization:**
- **Who can use:** Public (unauthenticated users)

**Edge Cases:**
- **User has no company/title on LinkedIn:** Professional fields remain NULL, no error
- **Existing user with password + LinkedIn OAuth:** Both methods valid for login

### ðŸ§ª Test Scenarios

**Happy Path:**
1. Click "Sign in with LinkedIn" → LinkedIn popup opens → Authenticate → Grant permissions → Return to platform → Account created → Redirected to dashboard

**Negative Tests:**
1. **User cancels LinkedIn authentication:** Cancel popup → Return to registration page gracefully
2. **LinkedIn API error:** LinkedIn returns 500 error → Show "LinkedIn authentication unavailable. Please try again later."

**Edge Cases:**
1. **Account linking:** Register with email test@example.com via password → Later click "Sign in with LinkedIn" with same email → Accounts linked
2. **Advisor pre-fill:** External Advisor registers with LinkedIn → Company = "ABC Family Office", Title = "Senior Advisor" → Advisor registry fields pre-filled

### ðŸ"— Dependencies

**Story Dependencies:**
- **Blocked by:** RLN1-003, RLN1-004 (Google and Apple OAuth provide pattern)
- **Blocks:** RLN1-009 (Backend must handle LinkedIn OAuth user creation)
- **External:** LinkedIn Developer account, LinkedIn API credentials required

### âš ï¸ Non-Functional Requirements

**Performance:**
- OAuth popup load time: < 2 seconds
- Authorization code exchange: < 1 second

**Security:**
- Use OAuth 2.0 authorization code flow
- Validate state parameter to prevent CSRF
- Store oauth_id encrypted

**Accessibility:**
- WCAG level: AA
- Button labeled "Sign in with LinkedIn"

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions

---
