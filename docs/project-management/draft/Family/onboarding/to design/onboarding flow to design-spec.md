# Dashboard Specification - Family Governance

## 📋 Overview
**File:** `prototypes/01-dashboard.html`
**Purpose:** Main dashboard for Family Governance platform with Constitution onboarding wizard
**Type:** Interactive prototype with modal workflow
**Framework:** Tailwind CSS + Vanilla JavaScript

---

## 🎯 Core Components

### 1. Header Navigation
**Location:** Top of page, fixed position
**Brand:** RE:Family

**Navigation Menu:**
- 🏠 Dashboard (active)
- Governance ▾ (dropdown)
- Development ▾ (dropdown)
- Family Affairs ▾ (dropdown)
- Tools ▾ (dropdown)

**Right Section:**
- 🔔 Notifications button
- User avatar (circular, gray placeholder)

---

### 2. Welcome Banner
**Style:** Orange gradient background (from-orange-400 to-orange-500)
**Content:**
- Welcome message with user name: "Anastasiia Bronina"
- Quick stats display:
  - 📅 0 Meetings
  - ✓ 2 Tasks
  - ⚡ 0 Pending Decisions

---

### 3. Constitution Setup System

#### 3.1 Prerequisites Alert (Conditional)
**Trigger:** Shows when family members < 2
**Style:** Purple background (purple-50) with border

**Content:**
- 👥 Icon with title: "Invite Your Family Members"
- "Required First" badge (red)
- Description: Minimum 2 members needed
- **Actions:**
  - "Invite Family Members →" button (redirects to `02-family-members.html`)
- **Right Card:** Current member count (1) with "Minimum 2 needed" warning

#### 3.2 Constitution Setup Banner (Main State)
**Style:** Blue background (blue-50) with border
**Status:** "Action Required" badge (yellow)

**Header:**
- 📜 Icon with title: "Set Up Your Family Constitution"
- Description of constitution purpose

**Progress Visualization (Duolingo-style):**
8 horizontal steps with circular indicators:
1. ✅ Profile (completed - green with checkmark)
2. ✅ Members (completed - green with checkmark)
3. 🔵 Why (current - blue with border, number 3)
4. ⚪ Assessment (pending - gray, number 4)
5. ⚪ Values (pending - gray, number 5)
6. ⚪ Decisions (pending - gray, number 6)
7. ⚪ Succession (pending - gray, number 7)
8. ⚪ Launch (pending - gray, number 8)

**Bottom Actions:**
- "Get Started →" button (opens onboarding modal)
- Registration status: "Registered: 5 of 8"
- "Resend Invites" button with confirmation dialog

**Right Card:** Setup progress percentage (0% initially)

#### 3.3 In-Progress State (Alternative)
**Style:** Amber background (amber-50)
**Status:** "Step X of 8" badge

**Content:**
- Current domain being worked on
- Progress bar (62.5% example)
- "Continue Setup →" button
- "Start Over" link

---

### 4. Onboarding Modal Wizard

#### Modal Structure
**Display:** Full-screen overlay with centered content
**Max-width:** 6xl (extra large)
**Close:** X button in top-right corner

**Progress Bar (Top):**
- Shows overall completion percentage
- "Step X of 8" indicator
- Smooth transition animation

**Horizontal Step Boxes:**
- 8 boxes displayed horizontally
- Each box shows:
  - Large emoji icon
  - Step title (Profile, Members, Why, etc.)
  - ✓ Checkmark if completed
- Current step has blue ring highlight
- Completed steps have green background
- Clickable to jump between steps

**Expanded Content Area:**
- Displays detailed content for selected step
- Scrollable if content overflows
- Styled with colored borders (green for completed, blue for current)

---

### 5. Onboarding Steps Content

#### Step 1: Create Family Profile ✅
**Status:** Always completed
**Content:**
- Confirmation message that family is created
- "Continue" button

#### Step 2: Invite Family Members 👥
**Content:**
- Invitation instructions
- "Invite" button (redirects to invitation flow)
- "Continue" button

**Completed State:**
- Shows registration progress: "5 of 8 members registered"

#### Step 3: Understanding Why It Matters 📖
**Sections:**
1. **What's Inside?** (4 cards)
   - 🎯 Values & Mission
   - ⚖️ Governance Rules
   - 📊 Business Succession
   - 🤝 Conflict Resolution

2. **Why It Matters?** (red gradient box)
   - 90% statistic (family businesses fail by 3rd generation)
   - 4 key benefits with green arrows

3. **Outcome** (green gradient box)
   - Clear explanation of expected result

4. **What's Next?** (blue gradient box)
   - 4 phases overview with numbered circles

#### Step 4: Start with Assessment 🤖
**Content:**
- "What You'll Discover" section (3 items)
- **Assessment Method Selection** (4 options):
  - 👨‍💼 Workshop with an Advisor
  - 🤖 Workshop with AI
  - ⚡ Let AI do this step
  - ✍️ I'll do it manually

**Action:** Redirects to workshop overview on selection

#### Step 5: Values, Mission & Vision 🎯
**What You'll Create:**
- 📖 Family & Business History
- 💎 Family Values
- 🎯 Family Mission
- 🔮 10-Year Vision
- ⚖️ Family Governance Structure

**Output:**
- Preamble
- Family Values & Mission
- Family Governance Structure

**Workshop Format Selection** (same 4 options as Step 4)

#### Step 6: Decision-Making & Conflict Management ⚖️
**Key Rules & Policies:**
- 👔 Working in Family Business
- 💼 Finance & Ownership

**Conflicts & Code of Conduct:**
- 🤝 Conflict Resolution Procedure
- 📜 Code of Conduct

**Output (6 constitution sections):**
- Decision Making Process
- Conflict Resolution
- Voting Rules & Procedures
- Family Wealth Management
- Family Philanthropy
- Constitution Amendment Process

#### Step 7: Succession & Development 🌱
**Succession:**
- 📅 Transfer Plan
- ✅ Successor Criteria

**Next Generation Engagement:**
- 🎓 Education & Experience
- 🗓️ Timeline & Stages

**Output:**
- Succession Planning
- Family Education & Development

#### Step 8: Finalization & Launch 🎉
**Completion Screen:**
- 🎉 Congratulations message
- "Your Family Constitution is Ready!"

**What's Next? (3 steps):**
1. Find Your Constitution (navigate to Governance → Constitution)
2. Share with Family
3. Start Using the Platform

**Full Platform Access:**
- 📅 Family Meetings
- ⚖️ Decision Making
- ✅ Task Management
- 🎓 Education Programs
- 💬 Family Communication
- 🤝 Conflict Resolution

---

### 6. Family Overview Section
**Layout:** 4-column grid
**Style:** Orange background cards

**Metrics:**
- 👥 Family Members: 2
- 📅 Upcoming Meetings: 0
- ⚖️ Pending Decisions: 0
- 🎓 Education Modules: 0

Each card has "See More ›" link

---

### 7. Quick Actions Section
**Layout:** 4-column grid
**Style:** Gray background cards with hover effects

**Actions:**
- 📄 Constitution
- 👨‍👩‍👧‍👦 Family Council
- ⚖️ Decisions
- 🎓 Education

All clickable with "See More ›" link

---

### 8. Two-Column Layout

#### 8.1 Upcoming Meetings
**Empty State:**
- 📅 Large icon
- "No upcoming meetings scheduled"
- "Schedule a Meeting" button

#### 8.2 Recent Activity
**Empty State:**
- 📝 Large icon
- "No recent activity"
- Explanation text

---

### 9. My Tasks Section
**Header:** "My Tasks (2)" with count
**Tasks List (2 items):**

1. **Conflict Task**
   - Checkbox
   - Title: "Address conflict: How to use the profits..."
   - Category: "Conflict"
   - Badge: "Action Required" (orange)
   - Arrow button

2. **Review Task**
   - Checkbox
   - Title: "Complete monthly family governance review"
   - Category: "Governance · Due Oct 15, 2025"
   - Badge: "Due Soon" (yellow)
   - Arrow button

---

## 🔧 Technical Implementation

### JavaScript Functions

#### Modal Management
```javascript
openOnboardingModal()     // Opens wizard
closeOnboardingModal()    // Closes wizard
renderAllSteps()          // Renders all UI elements
```

#### Step Management
```javascript
selectStep(idx)           // Jumps to specific step
completeStep(idx)         // Marks step as complete
renderExpandedContent()   // Shows step content
```

#### Progress Tracking
```javascript
completedSteps[]          // Array of completed step indices
selectedStepIndex         // Currently viewing step
updateDashboardProgressSteps()  // Updates progress UI
```

#### Workshop Selection
```javascript
selectAssessmentMethod(method)      // Step 4 assessment selection
selectWorkshopMethod(method, step)  // Steps 5-7 workshop format
```

#### Other Functions
```javascript
resendInvites(event)      // Sends invitation reminders
toggleFamilyMembersAlert() // Shows/hides prerequisite alert
toggleBannerState()       // Demo: switches banner states
goToInviteFlow()          // Redirects to invitation page
```

---

## 🎨 Design Tokens

### Colors
- **Primary:** `#3B82F6` (blue-600)
- **Secondary:** `#6B7280` (gray-500)
- **Orange Brand:** `#FB923C` to `#F97316` (gradient)
- **Success:** Green-500
- **Warning:** Amber-500
- **Alert:** Purple-500
- **Error:** Red-500

### Animations
```css
@keyframes fadeIn {
  from: opacity 0, translateY(10px)
  to: opacity 1, translateY(0)
}
```
Duration: 0.3s ease-out

---

## 📊 State Management

### Constitution Setup States
1. **Prerequisites Not Met:** Family members < 2
2. **Not Started:** Ready to begin, 0% progress
3. **In Progress:** Steps partially completed
4. **Completed:** All 8 steps done, constitution ready

### Progress Calculation
- **Formula:** `(completedSteps.length / totalSteps) * 100`
- **Total Steps:** 8
- **Initial State:** Step 1 (Profile) always marked complete

---

## 🔗 Navigation Flow

### External Links
- `02-family-members.html` - Family member invitation page
- `04-onboarding-wizard.html` - Constitution setup wizard (legacy?)
- `../onboarding-flow/values-workshop/01-workshop-overview.html` - Assessment workshop

### Internal Navigation
- Header menu (dropdowns not implemented)
- Quick action cards
- "See More" links throughout

---

## 🛠 Demo Features

### Toggle Buttons (Bottom of page)
1. **Toggle Family Members Alert** - Shows prerequisite warning
2. **Toggle Constitution State** - Switches between Not Started ↔ In Progress

**Purpose:** Testing different UI states without backend

---

## 💾 Data Storage

### LocalStorage Keys
```javascript
'selectedAssessmentMethod'           // Step 4 assessment choice
'workshop_step5_method'             // Step 5 workshop format
'workshop_step6_method'             // Step 6 workshop format
'workshop_step7_method'             // Step 7 workshop format
```

---

## 🚀 User Flows

### Primary Flow: Constitution Setup
1. User lands on dashboard
2. Sees "Set Up Your Family Constitution" banner
3. Clicks "Get Started →"
4. Modal opens with 8-step wizard
5. User progresses through steps:
   - Reads educational content
   - Selects workshop formats
   - Completes each step
6. Progress updates on dashboard
7. Final step shows completion message
8. Modal closes, constitution available in platform

### Secondary Flow: Invitation Resend
1. User sees "5 of 8" registered status
2. Clicks "Resend Invites"
3. Confirmation dialog shows pending invitations
4. User confirms
5. Loading state animation
6. Success message with details

---

## 🐛 Known Issues / Limitations

1. **Static Data:** All metrics hardcoded (meetings, tasks, etc.)
2. **No Backend:** LocalStorage used for state persistence
3. **Incomplete Navigation:** Dropdown menus not functional
4. **Single User:** No multi-user state management
5. **Demo Toggles:** Visible in production (should be hidden)

---

## 📱 Responsive Design

### Breakpoints
- **Mobile:** < 768px
- **Desktop:** >= 768px

### Mobile Adaptations
- Header navigation collapses (not implemented)
- Grid layouts adjust to single column (via Tailwind)
- Modal uses full-screen on mobile

---

## ✅ Validation Rules

### Family Members Prerequisite
- **Minimum:** 2 members required
- **Current:** 1 member (shows alert)
- **Blocks:** Constitution setup until met

### Registration Status
- **Total Invited:** 8 members
- **Registered:** 5 members
- **Pending:** 3 members (shown in resend dialog)

---

## 🎯 Success Metrics

### Completion Indicators
- Progress bar reaches 100%
- All 8 steps marked with green ✓
- Dashboard shows "Completed" status
- Constitution accessible in platform

---

## 🔮 Future Enhancements

### Suggested Improvements
1. Backend integration for real-time data
2. Role-based permissions (admin vs member)
3. Multi-family support
4. Real dropdown navigation menus
5. Actual constitution document generation
6. Email integration for invitations
7. Progress persistence across sessions
8. Analytics tracking
9. Mobile-optimized modal experience
10. Accessibility improvements (ARIA labels, keyboard navigation)

---

## 📝 Notes

- This is a high-fidelity interactive prototype
- Demonstrates complete onboarding flow
- Uses localStorage for state (non-persistent)
- Duolingo-style progress visualization
- Educational content embedded in wizard
- Multiple workshop format options (advisor, AI, manual)

---

**Last Updated:** 2025-10-13
**Version:** Prototype v1.0
**Status:** Interactive Demo
