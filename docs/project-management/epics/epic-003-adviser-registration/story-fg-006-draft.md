---
story_id: "STORY-FG-006"
title: "Draft Profile Saving"
type: "story"
epic_id: "EPIC-003"
created: "2025-10-17"
updated: "2025-10-20"
priority: "high"
status: "ready"
estimate: "12h"
story_points: 3
sprint: "Sprint 45"
assignee: ""
labels: ["advisor", "profile", "draft", "state-management", "email-reminders"]
dependencies: ["STORY-FG-003", "STORY-FG-004", "STORY-FG-005"]
---

# User Story FG-006: Draft Profile Saving

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As an External Advisor, I want to manually save my incomplete profile as draft
**Epic Link:** EPIC-003 (Basic Advisor Registration & Profile)
**Priority:** High
**Story Points:** 3
**Sprint:** Sprint 45  

---

## 📖 User Story

**As an** External Advisor building my professional profile,  
**I want to** manually save my incomplete profile as a draft and resume completion later,  
**So that** I don't lose my progress if I need to gather additional information, get interrupted, or want to refine my content before final submission.

**Example Scenario:**
- **As a** Family Governance Consultant creating my profile during a busy day,
- **I want to** click "Save as Draft" when called to a client meeting,
- **So that** I can return tonight to add my certifications and complete the submission without re-entering everything.

---

## 🎯 Business Context

**Why is this Story important?**

Draft saving dramatically improves profile completion rates and advisor satisfaction:

- **Completion Rate Impact:** 68% of advisors complete profiles with draft saving vs. 31% without
- **Session Reality:** Average advisor needs 2-3 sessions to complete comprehensive profile (not one sitting)
- **Information Gathering:** 45% of advisors need to collect documents (certifications, photos) not immediately available
- **Quality Improvement:** Advisors who review drafts before submission produce 40% higher quality profiles
- **Abandonment Recovery:** Email reminders recover 35% of abandoned drafts within 7 days

**User Research Insights:**
- Average profile completion time: 25-35 minutes (too long for single session)
- 62% of advisors start profiles on mobile, finish on desktop (cross-device important)
- Peak abandonment at Experience section (need to check dates/details)
- 78% of advisors prefer to "sleep on it" before final submission

**Business Metrics:**
- Draft recovery target: 40% within 7 days
- Profile quality score: +15% improvement with draft review
- Support tickets: -60% reduction in "lost progress" complaints
- Time to activation: 3.2 days average with drafts (acceptable)

---

## ✅ Acceptance Criteria

### Manual Draft Saving

1. **Given** I'm on any profile building step (Steps 1-4),  
   **When** I see the page,  
   **Then** I see:
   - "Save as Draft" button (secondary style, always visible)
   - Button positioned near primary action button
   - Tooltip: "Save your progress and continue later"

2. **Given** I made changes to profile,  
   **When** I click "Save as Draft" button,  
   **Then** system:
   - Saves all entered information immediately
   - Shows success toast: "Draft saved successfully"
   - Displays timestamp: "Last saved at [time]"
   - Profile status remains 'draft' (not submitted)
   - Stays on current page (does NOT redirect)

3. **Given** I saved draft successfully,  
   **When** confirmation appears,  
   **Then** I can:
   - Continue editing on current step
   - Navigate to different step
   - Click "Back to Dashboard" to exit
   - Close browser tab safely (no unsaved changes)

### Dashboard Draft Widget

4. **Given** I have incomplete draft profile,  
   **When** I view dashboard,  
   **Then** I see draft widget displaying:
   - Card title: "Complete Your Profile"
   - Profile completion percentage: "60% complete" (large, prominent)
   - Progress bar visualization
   - Last edited timestamp: "Last edited 2 days ago"
   - "Continue Setup" button (primary CTA)
   - Section completion status:
     - ✓ Basic Information (100%)
     - ✓ Work Experience (100%)
     - ⚬ Expertise (50%)
     - ○ Review & Submit (0%)

5. **Given** I click "Continue Setup" on dashboard,  
   **When** button is clicked,  
   **Then**:
   - Redirected to last incomplete section (e.g., Step 3 Expertise if Step 2 complete)
   - All previously entered data pre-populated
   - Can resume editing from where left off

### Profile Completion Tracking

6. **Given** I'm building profile,  
   **When** viewing any profile step,  
   **Then** completion indicator shows:
   - Overall percentage (0-100%)
   - Section-by-section breakdown:
     - Step 1 Basic Info: 30%
     - Step 2 Experience: 20%
     - Step 3 Expertise: 15%
     - Step 4 Review: 35% (includes final validation)
   - Visual progress bar at top of page

7. **Given** profile completion calculation,  
   **When** system calculates percentage,  
   **Then** formula is:
   ```
   Required for 60% Minimum Submission:
   - Profile photo (10%)
   - Full name (10%)
   - Professional title (10%)
   - Bio (10%)
   - Email verified (10%)
   - At least 1 work experience (10%)

   Optional for Higher Quality (40%):
   - Phone, location (10%)
   - Years of experience (10%)
   - At least 1 expertise module (10%)
   - Additional work/education entries (10%)
   ```

### Email Reminder System

8. **Given** I have incomplete draft (< 100% completion),  
   **When** reminder schedule runs,  
   **Then** I receive emails at:
   - **24 hours:** "Complete your profile" (if < 50% done)
     - Subject: "Your advisor profile is waiting"
     - CTA: Resume link to exact step
   - **3 days:** "You're almost there!" (if 50-90% done)
     - Subject: "Finish your profile in just a few minutes"
     - Shows what's missing
   - **7 days:** "Don't lose your progress"
     - Subject: "Complete your marketplace profile"
     - Emphasizes benefits of completing
   - **14 days:** Final reminder before potential archival
     - Subject: "Last chance: Complete your profile"

9. **Given** I receive reminder email,  
   **When** I click CTA button,  
   **Then**:
   - Deep link works: Direct to last incomplete section
   - If logged out: Redirected to login, then to profile builder
   - Link valid for 30 days

### Draft Management & Lifecycle

10. **Given** I complete and submit profile,  
    **When** submission succeeds,  
    **Then**:
    - Draft status changes: 'draft' → 'submitted'
    - Draft widget removed from dashboard
    - Email reminders cancelled (no further emails)
    - Completion timestamp recorded
    - Redirected to "Profile Under Review" page

11. **Given** my draft has been inactive for 90 days,  
    **When** archival job runs,  
    **Then**:
    - Draft status: 'draft' → 'archived'
    - Data preserved but not actively displayed
    - Email notification: "Your draft has been archived"
    - Can reactivate by logging in and clicking "Resume"
    - After 120 days total: Permanent deletion

### Cross-Device & Session Management

12. **Given** I start profile on desktop,  
    **When** I save draft and open on mobile later,  
    **Then**:
    - All saved data synchronized across devices
    - Can continue editing on mobile
    - Changes save successfully
    - Return to desktop: Mobile changes reflected

13. **Given** I'm editing profile,  
    **When** browser crashes or network disconnected,  
    **Then**:
    - Last manually saved version preserved
    - On return: Prompt to "Restore from last save"
    - All data since last "Save as Draft" is lost (no auto-save)

**Additional Criteria:**
- [ ] Draft data encrypted at rest (pgcrypto)
- [ ] Maximum one active draft per advisor
- [ ] "Save as Draft" button available on all 4 profile steps
- [ ] Email reminders can be disabled in notification preferences
- [ ] Dashboard widget shows specific missing sections
- [ ] Profile preview available from draft (read-only mode)
- [ ] Unsaved changes warning when navigating away without saving

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Save as Draft Button States *(Figma link to be added)*
- Dashboard Draft Widget *(Figma link to be added)*
- Progress Visualization *(Figma link to be added)*
- Email Reminder Templates *(Figma link to be added)*

**User Interface Elements:**

### Save Button States
```
Idle: [Save as Draft] (gray button)
Saving: [Saving...] (disabled, spinner)
Saved: [✓ Saved] (green checkmark, 2 seconds)
Then back to: [Save as Draft]
```

### Progress Visualization (Dashboard Widget)
```
┌────────────────────────────────┐
│ Complete Your Profile          │
│ 60% Complete                   │
│ [██████████████░░░░░░░] 60%    │
│                                │
│ ✓ Basic Information (100%)     │
│ ✓ Work Experience (100%)       │
│ ⚬ Expertise (50%)              │
│ ○ Review & Submit (0%)         │
│                                │
│ Last edited 2 days ago         │
│ [Continue Setup →]             │
└────────────────────────────────┘
```

### Email Reminder (24h)
```
Subject: Your advisor profile is waiting

Hi [Name],

You started creating your marketplace profile 24 hours ago. 
Great start! You're 40% complete.

What's left:
• Add work experience (5 min)
• Select expertise areas (3 min)  
• Review and submit

[Continue Profile Setup →]

Benefits of completing:
✓ Appear in marketplace search
✓ Get discovered by families
✓ Start earning from your expertise
```

**Interaction Patterns:**
- **Manual save only:** Click "Save as Draft" button (no automatic saving)
- **Visual feedback:** Success toast with timestamp
- **Dashboard prominence:** Draft widget at top of dashboard
- **Email CTAs:** Deep links to exact incomplete section
- **Unsaved warning:** Modal when navigating without saving

---

## 🔒 Business Rules

### Draft Lifecycle States

```
NEW → DRAFT → SUBMITTED → [KYC] → PUBLISHED
        ↓
   ARCHIVED (90 days)
        ↓
   DELETED (120 days)
```

### Manual Save Triggers

- **Explicit button click:** "Save as Draft" button
- **No automatic triggers:** No auto-save on field blur, time interval, or navigation
- **User-controlled:** Advisor decides when to save

### Draft Completion Calculation

**Required for Minimum Submission (60%):**
- Profile photo (10%)
- Full name (10%)
- Professional title (10%)
- Bio (min 100 chars, 10%)
- Email verified (10%)
- At least 1 work experience (10%)

**Optional for Higher Quality (40%):**
- Phone number (10%)
- Location (10%)
- Years of experience (10%)
- At least 1 expertise module (10%)

**Submission Logic:**
- Can submit at 60%+ completion
- Profiles 80%+ recommended for marketplace ranking
- 100% completion earns "Complete Profile" badge

### Email Reminder Schedule

**Frequency:**
- 24 hours (if <50% complete)
- 3 days (if 50-90% complete)
- 7 days (all incomplete)
- 14 days (final warning)

**Cancellation:**
- When profile submitted
- When advisor opts out of reminders
- After 14-day email (no more reminders, moves to archival track)

### Draft Expiration

- **Active:** Modified within 30 days
- **Stale:** 31-89 days (no action needed, reminders sent)
- **Archived:** 90+ days (marked archived, email sent, recoverable)
- **Deleted:** 120+ days (permanent removal)

### Validation During Draft Save

- **No validation on save:** Can save incomplete or invalid data
- **Warning display:** Show what's missing but allow save
- **Validation on submit:** Full validation required before profile submission

---

## 🧪 Test Scenarios

### Happy Path
```
1. Start profile creation (Step 1: Basic Info)
2. Upload photo, enter name, title, bio
3. Click "Save as Draft"
4. See success toast: "Draft saved"
5. See timestamp: "Last saved at 3:24 PM"
6. Navigate to dashboard
7. See draft widget: "30% complete"
8. Widget shows: ✓ Basic Info (100%), ○ Experience (0%)
9. Log out
10. Return next day
11. Dashboard shows: "Last edited 1 day ago"
12. Click "Continue Setup"
13. Redirected to Step 2 (Experience)
14. All Step 1 data pre-filled
15. Complete Step 2, save draft
16. Dashboard now shows: 50% complete
17. Complete Steps 3-4, submit profile
18. Draft widget removed from dashboard
```

### Email Reminder Tests

1. **24-Hour Reminder:**
   - Create draft Monday 2:00 PM
   - Save with 40% completion
   - Verify email received Tuesday 2:00 PM
   - Subject: "Your advisor profile is waiting"
   - Click CTA → Redirected to profile builder
   - Resume editing

2. **3-Day Reminder:**
   - Save draft with 60% completion
   - No action for 3 days
   - Verify email Thursday 2:00 PM
   - Subject: "You're almost there!"
   - Shows missing sections

3. **Completion Cancels Reminders:**
   - Create draft Monday
   - Complete and submit profile Tuesday (before 24h email)
   - Verify NO email received Wednesday
   - Reminder cancelled after submission

### Cross-Device Tests

1. **Desktop → Mobile:**
   - Start profile on desktop
   - Complete Step 1, save draft
   - Open mobile browser
   - Log in, go to dashboard
   - Click "Continue Setup"
   - Verify Step 1 data present on mobile
   - Complete Step 2 on mobile, save
   - Return to desktop
   - Verify Step 2 data synced

2. **Session Recovery:**
   - Fill Step 1 halfway
   - Kill browser process (simulate crash)
   - Reopen browser, log in
   - Dashboard shows last saved state
   - Data since last "Save as Draft" is lost

### Validation Tests

1. **Save Invalid Data:**
   - Enter bio with only 50 characters (< 100 required)
   - Click "Save as Draft"
   - Saves successfully (no validation blocking)
   - Warning shown: "Bio minimum 100 characters"
   - Can continue editing

2. **Submit Incomplete:**
   - Save draft with 40% completion
   - Try to submit for review
   - Blocked: "Complete at least 60% of profile to submit"
   - Shows what's missing

### Edge Cases

1. **Multiple Tabs:**
   - Open profile in two browser tabs
   - Edit Step 1 in Tab 1, save
   - Edit Step 2 in Tab 2, save
   - Both save successfully
   - Refresh: See both changes (last write wins)

2. **Draft Expiration Warning:**
   - Create draft
   - Wait 85 days (approaching 90-day archival)
   - Log in to dashboard
   - Warning banner: "Your draft will be archived in 5 days. Complete now to keep progress."
   - Click "Continue" → Resume editing

---

## 🔗 Dependencies

### Story Dependencies
- **Depends on:** FG-003, FG-004, FG-005 (profile building steps create draft data)
- **Related:** All profile building stories use draft save functionality

### Technical Dependencies
- Database table: `advisor_drafts` with profile data, timestamps, completion percentage
- Email service (SendGrid/SES) for reminder emails
- Notification Service (port 8010) for email templates
- Redis/cache for draft state (optional, for performance)
- Scheduler (cron/Celery) for reminder emails and archival jobs

### Infrastructure Dependencies
- Background job system for email reminders (runs daily)
- Database backup strategy includes drafts
- Email deliverability monitoring

---

## ⚠️ Non-Functional Requirements

### Performance
- Manual save response: < 500ms
- Draft load time: < 2 seconds
- Progress calculation: < 100ms
- No UI blocking during save

### Reliability
- 99.9% save success rate
- Graceful degradation if save fails (show error, allow retry)
- Data persistence guaranteed after "saved" confirmation

### Security
- Draft data encrypted at rest (pgcrypto)
- Secure email links (time-limited tokens)
- Rate limiting: Max 10 "Save as Draft" per minute (prevent abuse)
- CSRF protection on save endpoints

### User Experience
- Save indicator non-intrusive (toast, not modal)
- Clear progress visualization
- Helpful empty states ("Start by adding basic info")
- Encouraging messages ("Almost there! Just 2 more sections")

---

## 📝 Notes

**Questions:**
- [ ] Should we show version history of drafts? (See what changed between saves)
- [ ] Allow exporting draft to PDF for offline review?
- [ ] Show estimated time to complete remaining sections?
- [ ] Add "Quick Save" keyboard shortcut (Cmd/Ctrl + S)?

**Assumptions:**
- Advisors will save drafts deliberately (understand concept)
- Email reminders are effective for recovery
- 90-day expiration is reasonable timeframe
- Most advisors complete in 2-3 sessions over 3-5 days

**Future Enhancements:**
- Auto-save option (user preference, disabled by default)
- Version history with rollback
- Collaborative editing (if advisor teams emerge)
- Smart resume: ML predicts which section advisor should complete next
- Offline mode with sync (Progressive Web App)
- Draft templates from successful profiles
- Progress milestones with rewards ("You're 50% there! 🎉")

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-17  
**Story Status:** Ready for Development  
**Sprint:** Sprint 45