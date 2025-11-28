# User Story: Conditional Welcome Message for First-Time Consultant Login

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As a Consultant logging in for the first time, I want to see "Welcome, [Name]" (not "Welcome back"), so that I feel properly greeted as a new user  
**Epic Link:** FG-EPIC-XXX - Consultant Onboarding Flow в Advisor Portal  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant (DOC-USR-006) logging in for the first time,  
**I want to** see "Welcome, [Name]" instead of "Welcome back, [Name]" in the dashboard banner,  
**so that** I feel properly greeted as a new user and experience a polished onboarding flow.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point:**
First-time consultants seeing "Welcome back" creates confusion and feels impersonal - they haven't been here before, so how can they be "welcomed back"? This small detail significantly impacts first impressions and perceived platform quality.

**Business outcome:**
- Improved first-time user experience for Consultant onboarding
- Demonstrates platform attention to detail and user-centric design
- Reduces confusion during critical first session
- Sets professional tone for advisor relationship with platform

**Strategic alignment:**
Part of comprehensive Consultant onboarding experience that ensures smooth marketplace advisor acquisition and retention.

---

## ✅ Acceptance Criteria

1. **Given** a Consultant has just created their account and is logging in for the first time,  
   **When** they land on the Advisor Portal dashboard,  
   **Then** the welcome banner displays "Welcome, [Consultant Name]..." (without "back").

2. **Given** a Consultant has logged in at least once before,  
   **When** they log in again,  
   **Then** the welcome banner displays "Welcome back, [Consultant Name]..." (with "back").

3. **Given** a Consultant completes their first login session,  
   **When** the system processes the login,  
   **Then** the `is_first_login` flag is automatically set to `false` for subsequent sessions.

4. **Given** a Consultant's profile includes their full name,  
   **When** the welcome message is displayed,  
   **Then** it uses the exact name from their profile (e.g., "Logan Johns").

5. **Given** a Consultant does not have a name in their profile yet,  
   **When** the welcome message is displayed,  
   **Then** it shows "Welcome" or "Welcome back" without a name.

**Additional Criteria:**
- [ ] Message personalizes with consultant's name from profile
- [ ] Banner appears immediately on dashboard load (no delay)
- [ ] First login detection works consistently across all login methods (email/password, Apple Sign-In)
- [ ] Flag change persists permanently after first login

---

## 🔑 Business Rules

**First Login Detection:**
1. **Rule**: System uses `is_first_login` boolean flag in `users` table to determine first vs. returning login
2. **Default**: When consultant account is created, `is_first_login` = `true`
3. **Update**: After successful first login, system automatically sets `is_first_login` = `false`
4. **Persistence**: Flag change is permanent and irreversible

**Message Formatting:**
1. **First login**: "Welcome, [First Name] [Last Name]..."
2. **Returning login**: "Welcome back, [First Name] [Last Name]..."
3. **No name available**: "Welcome" or "Welcome back" (without name)
4. **Name source**: Pulled from consultant's profile in `advisor_registry` or `users.name`

**Authorization:**
- **Who sees this**: Only authenticated Consultants in Advisor Portal
- **When it displays**: Every login, on dashboard homepage

**Edge Cases:**
- **Name change**: If consultant updates their name, welcome message uses new name immediately
- **Multiple sessions**: If consultant has multiple browser sessions, each shows correct message based on their `is_first_login` status
- **Logout and re-login**: After first login flag is set to false, all subsequent logins show "Welcome back"

---

## 🧪 Test Scenarios

**Happy Path - First Login:**
1. Create new Consultant account
2. Verify `is_first_login` = `true` in database
3. Log in with credentials
4. Verify banner shows "Welcome, [Name]" (no "back")
5. Verify `is_first_login` = `false` after login
6. Log out and log in again
7. Verify banner now shows "Welcome back, [Name]"

**Happy Path - Returning Login:**
1. Use existing Consultant account where `is_first_login` = `false`
2. Log in with credentials
3. Verify banner shows "Welcome back, [Name]"

**Negative Tests:**
1. **Account without name:**
   - Consultant profile missing name field
   - Expected: "Welcome" (without name)
2. **Flag persistence:**
   - Log in, log out immediately, log in again
   - Expected: Second login shows "Welcome back" (flag properly persisted)
3. **Apple Sign-In:**
   - First login via Apple Sign-In
   - Expected: "Welcome, [Name]" (not "Welcome back")

**Edge Cases:**
1. **Name change during session:**
   - Consultant updates name in profile
   - Refreshes dashboard
   - Expected: Welcome message shows updated name
2. **Multiple browser sessions:**
   - Open two browser sessions simultaneously
   - Log in from both
   - Expected: Both show "Welcome" initially, both show "Welcome back" after flag updates
3. **Partial name:**
   - Consultant has only first name (no last name)
   - Expected: "Welcome, [First Name]"

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Banner renders within 100ms of dashboard load
- Flag update happens asynchronously (doesn't block UI)

**Security:**
- Only authenticated users can trigger flag update
- Flag change validated against current user's session

**Browser Support:**
- Chrome (latest)
- Safari (latest)
- Firefox (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

**Accessibility:**
- Banner text readable with screen readers
- Proper semantic HTML for welcome message

---

## 📝 Notes

**Из эпика (Open Questions):**

**Q: Что если consultant refresh страницы во время first login session до того как flag обновится?**  
A: Flag обновляется сразу после successful authentication, не после dashboard load. Refresh страницы не влияет - flag уже изменен.

**Q: Нужно ли логировать event "first login completed"?**  
A: Да, полезно для analytics. Можем добавить event tracking: `consultant_first_login_completed` с timestamp.

**Q: Как быстро должен обновиться flag?**  
A: Немедленно после successful authentication, синхронно в рамках login transaction.

**Q: Что если consultant закрывает браузер сразу после первого входа?**  
A: Flag уже сохранен в БД после authentication, закрытие браузера не влияет.

**Implementation considerations:**
- Flag update должен быть частью auth service logic
- Frontend просто читает flag и показывает соответствующее сообщение
- Нет race conditions - flag меняется атомарно в transaction

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-11-25  
**Story Focus:** First-time vs. returning user greeting personalization