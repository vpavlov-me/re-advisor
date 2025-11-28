---
title: "Bug Report: Verification Link Does Not Clear Active Session"
category: "bug"
audience: "developer|qa|frontend|backend|security"
created: "2025-11-21"
updated: "2025-11-21"
version: "1.0.0"
status: "active"
tags: ["bug", "frontend", "authentication", "session", "security", "user-verification"]
owner: "product-team"
assignee: "alexremoon"
priority: "Low"
severity: "Minor"
---

# Bug Report: Verification Link Does Not Clear Active Session

> **Status:** Active
> **Priority:** Low
> **Severity:** Minor
> **Assignee:** alexremoon

---

## 📋 Basic Information

**Issue Type:** Bug
**Project:** FG
**Summary:** Verification email link does not clear current user session, causing wrong profile/content to load
**Original Epic:** EPIC-003 (Advisor Registration & Profile Management) 
**Assignee:** alexremoon
**Priority:** Low
**Severity:** Minor
**Tags:** `bug`, `frontend`, `authentication`, `session`, `security`, `user-verification`, `advisor-portal`
**Story Points:** TBD
**Sprint:** TBD

---

## 🐛 Bug Description

**What is broken?**

When a user clicks on a verification link from an email (e.g., email verification, password reset, or account activation), the system does not clear the currently active user session. This causes the following issues:

1. **Wrong profile loaded:** If User A is logged in and clicks a verification link for User B's account, User A's profile may display instead of User B's
2. **Content from wrong account:** User may see content/data from their existing session rather than the new account being verified
3. **Session confusion:** Mixed state between old logged-in user and new user being verified

**Current Workaround:**
- User must manually log out to clear session
- Then click verification link again
- This extra step creates friction and confusion

**Affected Area:**
- **Component:** Email Verification Flow
- **Location:** Verification link handler, Authentication middleware
- **Navigation Path:** Email → Verification Link → Application

**Impact:**
- **Security Concern:** Users may access wrong account data
- Confusing user experience during onboarding/verification
- Potential data privacy issue if users see each other's content
- Requires manual logout workaround
- Affects advisor registration and email verification flows

---

## 👥 Affected Users

**Who is impacted by this bug?**

- **Primary Personas:**
  - New advisors clicking verification links during registration
  - Users verifying email addresses
  - Users clicking password reset links
  - Any user clicking authentication-related email links while already logged in

- **User Impact Level:** Users who click verification links while already logged in
- **Frequency:** Every time verification link clicked with active session
- **Workaround Available:** Yes - manual logout, but not intuitive

**Scenarios:**

1. **Multi-account users:**
   - User has personal account logged in
   - Receives verification for business account
   - Clicks link, sees wrong profile

2. **Shared device:**
   - User A logged in on shared computer
   - User B receives verification email on their phone
   - Opens link on shared computer
   - Sees User A's profile instead

3. **Testing/development:**
   - Developer testing with multiple accounts
   - Session confusion between test accounts

---

## ✅ Expected Behavior

**What SHOULD happen:**

1. User clicks verification link from email
2. **System automatically clears/logs out current session**
3. System processes verification token
4. User is either:
   - Logged in as the newly verified account (if auto-login after verification)
   - OR redirected to login page to sign in with verified account
5. User sees correct profile and content for verified account
6. No manual logout required

**Expected flow:**
```
User clicks verification link
    ↓
System detects verification link
    ↓
[AUTOMATIC] Clear current session/logout
    ↓
Process verification token
    ↓
Verify account/email
    ↓
[OPTION A] Auto-login with verified account
    OR
[OPTION B] Redirect to login page with success message
    ↓
User sees correct profile
```

**Key principle:** Verification links should be treated as fresh authentication events that require clean session state.

---

## ❌ Actual Behavior

**What ACTUALLY happens:**

1. User clicks verification link from email
2. System processes verification token
3. **Current session is NOT cleared**
4. User may see:
   - Wrong user profile (from active session)
   - Content from previously logged-in account
   - Mixed state between old and new user
5. User must manually log out
6. User must click verification link again
7. Only then does correct account load

**Actual broken flow:**
```
User clicks verification link
    ↓
System processes verification token
    ↓
[MISSING] No session clear
    ↓
Verification succeeds but...
    ↓
User still logged in as old account
    ↓
Wrong profile/content displays
    ↓
[MANUAL WORKAROUND] User logs out
    ↓
[RETRY] User clicks verification link again
    ↓
Correct account loads
```

---

## 📸 Evidence

**Expected Evidence:**
- Browser session/cookie inspection showing old session persisting
- Network requests showing user ID mismatch
- Profile page showing wrong user data after verification
- Console logs showing session not cleared

**To Capture:**
1. Login as User A
2. Open verification link for User B in same browser
3. Observe User A's session still active
4. Screenshot of wrong profile displayed
5. Console/network tab showing session cookies

---

## 🔄 Steps to Reproduce

**Prerequisites:**
- Two user accounts (or ability to register new account)
- Email verification system enabled
- Browser with session cookies

**Steps:**

1. **Login as User A:**
   - Navigate to application
   - Login with User A credentials
   - Verify session is active (see User A profile)

2. **Get verification link for User B:**
   - Register new account (User B) or request email verification
   - Receive verification email for User B
   - Copy verification link

3. **Click verification link while User A logged in:**
   - In same browser/tab where User A is logged in
   - Paste and navigate to User B's verification link
   - OR click link from email client

4. **Observe the issue:**
   - Verification may succeed
   - BUT User A's profile still displays
   - OR see mixed content from both accounts
   - System did not clear User A's session

5. **Verify workaround:**
   - Manually log out
   - Click verification link again
   - Now User B's account loads correctly

**Reproducibility:** 100% - session never clears automatically

**Environment:**
- **Browser:** All browsers (Chrome, Firefox, Safari, Edge)
- **Device:** Desktop, mobile, tablet
- **Scenario:** Any time user clicks verification link with active session

---

## 🎯 Acceptance Criteria for Fix

**Fix is complete when:**

### Core Functionality:
- [ ] Clicking verification link automatically clears current user session
- [ ] All session cookies/tokens are removed
- [ ] Local storage/session storage cleared (if used for auth)
- [ ] User is logged out before verification processing

### Verification Flow:
- [ ] Verification token still processed correctly after session clear
- [ ] After successful verification, user either:
  - [ ] Option A: Auto-logged in with verified account, OR
  - [ ] Option B: Redirected to login page with success message
- [ ] User sees correct profile for verified account
- [ ] No content from previous session visible

### Edge Cases:
- [ ] Works when user not logged in (no session to clear - should proceed normally)
- [ ] Works when verification link is expired (clear session, show error message)
- [ ] Works when verification link is invalid (clear session, show error message)
- [ ] Works across different verification types:
  - [ ] Email verification
  - [ ] Password reset links
  - [ ] Account activation links
  - [ ] Magic links (if used)

### User Experience:
- [ ] No manual logout required
- [ ] Clear messaging if auto-login doesn't occur
- [ ] Success message visible after verification
- [ ] No confusion about which account is active

### Security:
- [ ] Session tokens properly invalidated on backend
- [ ] Frontend cookies/storage cleared
- [ ] No session fixation vulnerabilities
- [ ] Audit log records session clear + verification event

### Testing:
- [ ] Tested with multiple accounts
- [ ] Tested on shared devices scenario
- [ ] Tested across all browsers
- [ ] No regression in normal verification flow (user not logged in)

---

## 💡 Root Cause Analysis & Suggested Solutions

**Possible Root Causes:**

1. **Missing Session Clear Logic:**
   - Verification link handler doesn't check for active session
   - No logout call before processing verification token

2. **Frontend Route Issue:**
   - Verification route doesn't trigger session cleanup
   - App state persists across route change to verification page

3. **Token Processing Before Logout:**
   - System processes verification token first
   - Then checks session (wrong order)

4. **Backend Not Enforcing Fresh Session:**
   - Backend accepts verification token without requiring clean session
   - No session validation in verification endpoint

**Investigation Steps:**

1. **Check Verification Link Handler:**
   - Where does verification link route to?
   - Does route handler check for active session?
   - Is there a logout call in the flow?

2. **Check Authentication State:**
   - How is auth state stored? (cookies, localStorage, Redux, Context)
   - Does verification flow clear all auth storage?

3. **Check Backend Verification Endpoint:**
   - Does endpoint validate session state?
   - Should endpoint force logout before verification?

4. **Check Frontend Route Guards:**
   - Do route guards interfere with verification flow?
   - Is there redirect logic that preserves old session?

**Suggested Solutions:**

### Solution A: Frontend Session Clear on Verification Route (Recommended)

When user navigates to verification URL, automatically clear session:

```typescript
// Verification route handler
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, verifyEmail } from '@/services/auth';

function EmailVerificationPage() {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(window.location.search);
  const token = searchParams.get('token');

  useEffect(() => {
    async function handleVerification() {
      // STEP 1: Clear current session FIRST
      await logout({ skipRedirect: true }); // Logout without navigating away

      // Clear all auth-related storage
      localStorage.removeItem('authToken');
      sessionStorage.clear();
      // Clear cookies if needed
      document.cookie.split(";").forEach((c) => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // STEP 2: Process verification token
      try {
        const result = await verifyEmail(token);

        if (result.success) {
          // OPTION A: Auto-login with verified account
          // await login(result.credentials);
          // navigate('/dashboard');

          // OPTION B: Redirect to login with success message
          navigate('/login', {
            state: {
              message: 'Email verified successfully! Please log in.',
              email: result.email
            }
          });
        }
      } catch (error) {
        navigate('/login', {
          state: {
            error: 'Verification failed. Please try again or contact support.'
          }
        });
      }
    }

    if (token) {
      handleVerification();
    }
  }, [token, navigate]);

  return <LoadingSpinner message="Verifying your email..." />;
}
```

### Solution B: Backend Session Invalidation

Backend automatically invalidates existing session when verification token is used:

```python
# Backend verification endpoint
from fastapi import APIRouter, Depends, Request, Response
from app.services.auth import get_current_user_optional, logout_user, verify_email_token

router = APIRouter()

@router.get("/verify-email")
async def verify_email(
    token: str,
    request: Request,
    response: Response,
    current_user = Depends(get_current_user_optional)  # Optional - may or may not be logged in
):
    """Verify email address from verification link."""

    # STEP 1: If user is currently logged in, log them out
    if current_user:
        await logout_user(request, response, current_user)
        # Clear session cookies
        response.delete_cookie("session_token")
        response.delete_cookie("refresh_token")

    # STEP 2: Verify the email token
    verification_result = await verify_email_token(token)

    if not verification_result.success:
        return {"success": False, "error": "Invalid or expired token"}

    # STEP 3: Either auto-login or return success
    # OPTION A: Auto-login
    # new_session = await create_session(verification_result.user)
    # response.set_cookie("session_token", new_session.token)
    # return {"success": True, "user": verification_result.user}

    # OPTION B: Require manual login
    return {
        "success": True,
        "message": "Email verified successfully",
        "redirect": "/login",
        "email": verification_result.user.email
    }
```

### Solution C: Middleware Approach

Add middleware that detects verification routes and clears session:

```typescript
// Middleware for verification routes
export async function verificationMiddleware(req: Request, res: Response, next: NextFunction) {
  const isVerificationRoute = req.path.includes('/verify') ||
                              req.path.includes('/reset-password') ||
                              req.path.includes('/activate');

  if (isVerificationRoute && req.session?.userId) {
    // Clear session for verification routes
    req.session.destroy((err) => {
      if (err) {
        console.error('Failed to destroy session:', err);
      }
      res.clearCookie('sessionId');
      next();
    });
  } else {
    next();
  }
}
```

**Recommended Approach:**

**Hybrid Solution (Frontend + Backend):**
1. Frontend clears session/cookies immediately when verification route loads
2. Backend also validates and clears any lingering session when token is processed
3. This ensures clean state even if frontend clear fails

---

## 🔍 Technical Details to Investigate

**Questions to Answer:**

1. **Current Implementation:**
   - Q: How are verification links structured? (e.g., `/verify?token=xxx`)
   - Q: What component/route handles verification links?
   - Q: Is there any session cleanup in current code?

2. **Authentication State:**
   - Q: Where is auth state stored? (cookies, localStorage, sessionStorage, memory)
   - Q: What tokens are used? (JWT, session ID, refresh token)
   - Q: How is logout currently implemented?

3. **Verification Flow:**
   - Q: After verification, should user be auto-logged in or redirected to login?
   - Q: Are there different verification types (email, password reset) with different flows?

4. **Security Considerations:**
   - Q: Is there risk of session fixation if session not cleared?
   - Q: Should verification tokens be single-use?
   - Q: How long are verification tokens valid?

**Required Information:**

- [ ] Current verification link format
- [ ] Authentication architecture (JWT, sessions, etc.)
- [ ] Existing logout implementation
- [ ] Product decision: Auto-login vs manual login after verification

---

## 🧪 Testing Requirements

**QA must verify:**

### 1. Session Clearing:
- [ ] Active session cleared when verification link clicked
- [ ] All cookies removed
- [ ] localStorage/sessionStorage cleared (if used)
- [ ] User fully logged out before verification

### 2. Verification Success Flow:
- [ ] Email verification completes successfully
- [ ] User sees correct profile for verified account
- [ ] No content from previous session
- [ ] Success message displays

### 3. Multi-Account Testing:
- [ ] Login as User A
- [ ] Click verification for User B
- [ ] User A logged out automatically
- [ ] User B account loads correctly
- [ ] No User A data visible

### 4. Edge Cases:
- [ ] Verification when no user logged in (should work normally)
- [ ] Expired verification token (clear session + show error)
- [ ] Invalid verification token (clear session + show error)
- [ ] Multiple verification clicks (handle gracefully)

### 5. Different Verification Types:
- [ ] Email verification link
- [ ] Password reset link
- [ ] Account activation link
- [ ] Magic login link (if applicable)

### 6. Shared Device Scenario:
- [ ] User A logged in on device
- [ ] User B receives verification email
- [ ] User B clicks link on same device
- [ ] User A logged out automatically
- [ ] User B can complete verification

### 7. Cross-Browser:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browsers (iOS Safari, Chrome Android)

### 8. Security Testing:
- [ ] No session fixation possible
- [ ] Tokens are single-use (can't reuse verification link)
- [ ] Session properly invalidated on backend
- [ ] Audit logs record session clear + verification

---

## 🔗 Related Issues

**Potentially Related:**
- Advisor registration flow (EPIC-003)
- Password reset flow
- Email verification system
- Session management bugs
- Multi-account handling

**May Need Similar Fix:**
- Password reset links
- Account activation links
- Magic login links
- Any email-based authentication flow

---

## 📊 Priority Justification

**Why Low Priority + Minor Severity?**

- **Low Priority:** Workaround exists (manual logout), not blocking core functionality
- **Minor Severity:** Affects specific scenario (verification with active session), not all users
- **Security Concern:** Moderate - potential data privacy issue, but limited scope
- **User Impact:** Low-Medium - creates friction but doesn't prevent verification
- **Frequency:** Occurs only when users click verification links while logged in
- **Business Impact:** Low - doesn't block onboarding, just adds extra step

**However, consider increasing priority if:**
- Multiple users report confusion during onboarding
- Security team flags as concern
- Advisor registration is high priority
- Data privacy issues surface

**Why Not Higher Priority:**
- Manual workaround exists and is simple
- Doesn't prevent account creation or verification
- Limited to specific user scenario
- No data loss or critical functionality broken

**Recommendation:**
- Fix in Sprint 2-3 (not urgent)
- Can be bundled with authentication improvements
- Low effort (1-2 days implementation + testing)

---

## 📅 Timeline

**Reported:** 2025-11-21
**Target Fix Date:** TBD (Sprint 2-3, within 2-4 weeks)
**Estimated Effort:**
- Investigation: 2-4 hours
- Frontend implementation: 4-6 hours
- Backend implementation (if needed): 2-4 hours
- Testing: 4-6 hours
- **Total: 12-20 hours** (1.5-2.5 dev days)

---

## 📝 Notes

**Product Decision Needed:**

After session clear and successful verification, should user be:
- **Option A:** Auto-logged in with verified account (seamless UX)
- **Option B:** Redirected to login page with success message (more secure, explicit login)

**Recommendation:** Option B (redirect to login) is more secure and clearer for users.

**Implementation Priority:**

1. **Quick fix (Phase 1):** Frontend session clear on verification route
2. **Complete fix (Phase 2):** Backend session invalidation + frontend clear
3. **Polish (Phase 3):** Clear messaging, loading states, error handling

**Security Note:**

This is classified as minor security issue. While not critical, it's good practice to clear sessions during authentication events. Consider security review during implementation.

**User Communication:**

After fix, no user communication needed since this improves existing flow. Users will simply experience smoother verification without manual logout.

**Testing Note:**

This bug requires testing with multiple accounts. QA should have at least 2 test accounts available for reproducing scenario.

---

**Bug ID:** TBD (to be assigned in Jira)
**Reported by:** e.savelova
**Date:** 2025-11-21
**Related Epic:** EPIC-003 Advisor Registration & Profile Management
