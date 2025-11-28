---
story_id: "STORY-FG-005"
title: "Expertise Module Selection"
type: "story"
epic_id: "EPIC-003"
created: "2025-10-17"
updated: "2025-10-20"
priority: "critical"
status: "ready"
estimate: "16h"
story_points: 5
sprint: "Sprint 45"
assignee: ""
labels: ["advisor", "profile", "expertise", "modules", "marketplace"]
dependencies: ["STORY-FG-003"]
---

# User Story FG-005: Expertise Module Selection

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As an External Advisor, I want to select my expertise areas from platform modules
**Epic Link:** EPIC-003 (Basic Advisor Registration & Profile)
**Priority:** Critical
**Story Points:** 5
**Sprint:** Sprint 45  

---

## 📖 User Story

**As an** External Advisor specializing in family governance,  
**I want to** select which of the platform's 10 governance modules I have expertise in,  
**So that** families can find me when searching for advisors who match their specific governance needs.

**Example Scenario:**
- **As a** Conflict Resolution Specialist with mediation certification,
- **I want to** mark "Conflicts" and "Communication" as my primary expertise areas, and "Constitution" as secondary,
- **So that** families experiencing disputes can easily discover my specialized services through module-based search.

---

## 🎯 Business Context

**Why is this Story important?**

Module-based expertise mapping is the core of marketplace matching algorithm:

- **Discovery Precision:** 82% of families search by specific governance need (module), not advisor name
- **Match Quality:** Module-aligned advisors have 3.5x higher engagement and booking rates
- **Platform Differentiation:** Unlike generic consultancy platforms, module mapping is unique to family governance
- **Conversion Impact:** Families are 60% more likely to book advisors with relevant module expertise
- **Pricing Power:** Specialists in high-demand modules (Conflicts, Succession) command 40% premium rates

**Market Intelligence:**
- Conflicts and Succession modules: Highest demand (35% of searches)
- Constitution and Family Council: Emerging needs (growing 20% QoQ)
- Multi-module expertise: Increases booking rate by 25%
- 70% of families need help in 3+ modules simultaneously

**Strategic Value:**
- Enables "module-as-a-service" marketplace model
- Supports future AI-powered advisor recommendations
- Creates data for module demand forecasting
- Facilitates module-specific certification programs

---

## ✅ Acceptance Criteria

### Page Entry & Module Display

1. **Given** I completed Step 2 (Work Experience & Education),  
   **When** I'm redirected to Step 3,  
   **Then** I see:
   - Header: "Step 3 of 4: Expertise Selection"
   - Progress bar: 75% (Step 3 of 4)
   - Instructions: "Select 1-7 modules where you have expertise. Choose up to 3 as primary areas."
   - Grid of 10 governance module cards
   - Counter: "0 of 7 modules selected"
   - "Learn More" link to detailed module descriptions
   - "Save & Continue" button (disabled until 1 module selected)

2. **Given** I view the module grid,  
   **When** page loads,  
   **Then** I see 10 module cards:
   - **Conflicts** (Mediation, Dispute Resolution)
   - **Constitution** (Governance Framework, Family Values)
   - **Family Council** (Meeting Structure, Facilitation)
   - **Decision Making** (Voting, Consensus Building)
   - **Education** (Learning Programs, Development)
   - **Mentorship** (Next-Gen Preparation, Coaching)
   - **Assets** (Wealth Management, Strategy)
   - **Succession** (Leadership Transition, Planning)
   - **Philanthropy** (Charitable Giving, Legacy)
   - **Family Management** (Operations, Communication)

3. **Given** I see a module card,  
   **When** viewing card details,  
   **Then** each card displays:
   - Module icon (distinct visual)
   - Module name (bold)
   - Short description (50 words)
   - "Learn More" icon button
   - Selection checkbox/toggle
   - Star icon for primary designation (initially hidden)

### Module Selection

4. **Given** I want to select a module,  
   **When** I click on module card,  
   **Then**:
   - Card becomes selected (highlighted border, checkmark visible)
   - Counter updates: "1 of 7 modules selected"
   - Star icon appears (for primary designation)
   - If 1st selection: "Save & Continue" button becomes enabled

5. **Given** I want to deselect a module,  
   **When** I click on already-selected module card,  
   **Then**:
   - Card becomes deselected (normal appearance)
   - If was primary: Primary designation removed
   - Counter decrements: "0 of 7 modules selected"
   - If last module: "Save & Continue" disabled again

6. **Given** I selected 7 modules (maximum),  
   **When** I try to select 8th module,  
   **Then**:
   - Warning toast appears: "Maximum 7 modules. Please deselect one to add another."
   - Click does not select the module
   - Previously selected 7 remain highlighted

### Primary Expertise Designation

7. **Given** I selected at least 1 module,  
   **When** I want to mark it as primary expertise,  
   **Then**:
   - I see star icon on selected module card
   - Click star icon to designate as primary
   - Card gets additional visual indicator (gold border or badge)
   - Counter shows: "Primary: 1 | Secondary: X"

8. **Given** I designated 3 modules as primary (maximum),  
   **When** I try to mark 4th as primary,  
   **Then**:
   - Warning toast: "Maximum 3 primary expertise areas"
   - Star icon click does nothing
   - Must deselect one primary before adding another

9. **Given** I want to remove primary designation,  
   **When** I click star on primary module,  
   **Then**:
   - Primary designation removed
   - Module remains selected but as secondary
   - Can now designate different module as primary

### Module Information Modal

10. **Given** I want detailed module information,  
    **When** I click "Learn More" on module card,  
    **Then** modal opens with:
    - Module name (header)
    - Full description (200-300 words)
    - **Typical advisor activities** in this module
    - **Required skills/experience**
    - **Average engagement duration** for this module
    - **Sample client scenarios**
    - "Select This Module" button (if not already selected)
    - "Close" button

11. **Given** modal is open and I click "Select This Module",  
    **When** selection is made,  
    **Then**:
    - Module is selected (if within 7 limit)
    - Modal closes automatically
    - Main page updates with selection

### Guided Selection Wizard (Optional Helper)

12. **Given** I'm unsure which modules to select,  
    **When** I click "Help Me Choose" link,  
    **Then** wizard modal opens with:
    - "What's your professional background?" (dropdown: Legal, Financial, Psychology, Business, etc.)
    - "Years of experience?" (slider: 0-20+)
    - "What types of clients have you served?" (checkboxes: Single families, Multi-family offices, Enterprises)
    - "Generate Recommendations" button

13. **Given** I completed wizard questions,  
    **When** I click "Generate Recommendations",  
    **Then**:
    - System suggests 3-5 relevant modules based on inputs
    - Suggested modules highlighted in main grid
    - Can accept all, select individual, or ignore
    - Wizard closes after selections made

### Form Validation & Navigation

14. **Given** I selected 1-7 modules,  
    **When** I click "Save & Continue",  
    **Then**:
    - System validates: 1-7 modules, max 3 primary
    - Data saved to database
    - Profile completion updated: ~75% (Step 3 complete)
    - Redirected to Step 4: Review & Submit (FG-006)
    - Success toast: "Expertise areas saved"

15. **Given** I have 0 modules selected,  
    **When** I try to click "Save & Continue",  
    **Then**:
    - Button remains disabled
    - Error message: "Select at least 1 area of expertise to continue"

16. **Given** I click "Back" button,  
    **When** navigating to Step 2,  
    **Then**:
    - If unsaved changes: Warning modal
    - If saved: Navigate immediately

**Additional Criteria:**
- [ ] Module selections auto-saved when clicking "Save & Continue" (no manual save needed here)
- [ ] Tooltip on star icon explains: "Mark as primary expertise (max 3)"
- [ ] Mobile-responsive card grid (3 columns desktop, 2 tablet, 1 mobile)
- [ ] Keyboard accessible: Tab navigation, Space to select, Enter to confirm
- [ ] Analytics track: Most/least selected modules, primary vs secondary distribution
- [ ] Profile completion contribution: 15% (at least 1 module selected)

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Module Grid Layout *(Figma link to be added)*
- Module Detail Modal *(Figma link to be added)*
- Primary Expertise Designation *(Figma link to be added)*
- Guided Selection Wizard *(Figma link to be added)*

**User Flow:**
```
1. Complete Step 2 → Redirect to Step 3
2. See 10 module cards in grid
3. Read instructions: "Select 1-7 modules, up to 3 primary"
4. Click "Conflicts" card → Selected, counter: "1 of 7"
5. Click star on Conflicts → Marked as primary (gold badge)
6. Click "Constitution" card → Selected, counter: "2 of 7"
7. Click "Family Council" card → Selected, counter: "3 of 7"
8. Click star on Constitution → Primary #2
9. Click "Learn More" on Decision Making → Modal opens with details
10. Read description → Click "Close" (decide not to select)
11. Review selections: 3 selected, 2 primary
12. Click "Save & Continue"
13. Redirect to Step 4 (Review & Submit)
```

**UI Components:**
- Responsive grid (CSS Grid or Flexbox)
- Module cards with hover effects
- Selection state: Checkmark, border highlight
- Primary designation: Star icon, gold badge
- Module counter: "3 of 7 modules selected | Primary: 2"
- Modal overlay for detailed info
- Wizard modal for guided selection
- Drag handles for reordering (future enhancement)
- Progress bar: 75% on this step

**Interaction Patterns:**
- Click to select/deselect (toggle)
- Hover shows quick description tooltip
- Click star to designate primary
- Click "Learn More" for full modal
- Guided wizard for uncertain users

---

## 🔒 Business Rules

### Selection Constraints

- **Minimum:** 1 module (required for profile submission)
- **Maximum:** 7 modules (prevents over-claiming, maintains specialist focus)
- **Primary Designation:** 1-3 modules maximum
- **Validation:** Cannot save with 0 modules or >7 modules or >3 primary

### Module Hierarchy & Impact

- **Primary Expertise:**
  - Featured prominently in search results
  - Higher weight in advisor-family matching algorithm
  - Displayed first in advisor profile
  - Used for "Top [Module] Specialists" marketplace rankings

- **Secondary Expertise:**
  - Shown in profile but lower prominence
  - Considered in matching but lower weight
  - Helps with multi-module family needs

### Module Definitions (10 Governance Modules)

| Module | Icon | Primary Use Case | Typical Advisor Role |
|--------|------|------------------|---------------------|
| **Conflicts** | ⚖️ | Family dispute resolution | Mediator, Therapist |
| **Constitution** | 📜 | Governance framework | Governance Consultant |
| **Family Council** | 👥 | Meeting facilitation | Facilitator, Coach |
| **Decision Making** | 🗳️ | Voting processes | Process Consultant |
| **Education** | 📚 | Learning programs | Education Specialist |
| **Mentorship** | 🌱 | Next-gen development | Coach, Mentor |
| **Assets** | 💰 | Wealth strategy | Financial Advisor |
| **Succession** | 🔄 | Leadership transition | Succession Planner |
| **Philanthropy** | ❤️ | Giving strategy | Philanthropy Advisor |
| **Family Management** | 🏠 | Operations | Operations Manager |

### Module Combinations & Badges (Future)

- **Governance Mediator:** Conflicts + Constitution
- **Next-Gen Specialist:** Succession + Mentorship
- **Generalist:** All 10 modules selected (warning: not recommended, suggests lack of focus)

### Proficiency Levels (Future Enhancement)

- Beginner (1-3 years in module)
- Intermediate (3-7 years)
- Expert (7+ years)
- For MVP: No proficiency levels, just selection

### Profile Completion Contribution

- **Expertise Selection:** 15% of overall profile completion
- Minimum 1 module selected = 10%
- Each additional module = +1% (up to 15% total)

---

## 🧪 Test Scenarios

### Happy Path
```
1. Complete Steps 1-2
2. Land on Step 3: Expertise Selection
3. See 10 module cards in grid
4. Click "Conflicts" → Selected (1/7)
5. Click star on Conflicts → Primary #1
6. Click "Succession" → Selected (2/7)
7. Click star on Succession → Primary #2
8. Click "Mentorship" → Selected (3/7)
9. Click "Constitution" → Selected (4/7)
10. Click star on Constitution → Primary #3
11. Review: 4 selected, 3 primary
12. Click "Save & Continue"
13. Success toast shown
14. Redirect to Step 4
15. Verify profile completion: 75%
```

### Selection Limit Tests

1. **Maximum Modules (7):**
   - Select 7 modules successfully
   - Try to select 8th
   - Warning: "Maximum 7 modules. Deselect one to add another."
   - Deselect one
   - Can now select different module

2. **Maximum Primary (3):**
   - Select 5 modules
   - Mark 3 as primary successfully
   - Try to mark 4th as primary
   - Warning: "Maximum 3 primary expertise areas"
   - Unstar one primary
   - Can now mark different module as primary

3. **Minimum Requirement (1):**
   - Try to continue with 0 modules
   - "Save & Continue" disabled
   - Error: "Select at least 1 expertise area"
   - Select 1 module
   - Button enabled

### Interactive Tests

1. **Learn More Modal:**
   - Click "Learn More" on Succession module
   - Modal opens with full description
   - Read: "Leadership transition planning..."
   - Click "Select This Module" in modal
   - Modal closes
   - Succession now selected on main page

2. **Toggle Selection:**
   - Click Conflicts → Selected
   - Click Conflicts again → Deselected
   - Click Conflicts third time → Selected again

3. **Primary Designation Toggle:**
   - Select Conflicts
   - Click star → Primary
   - Click star again → Not primary (remains selected as secondary)

### Guided Wizard Test

1. **Use Help Me Choose:**
   - Click "Help Me Choose"
   - Wizard modal opens
   - Select: Background "Psychology", Experience "10+ years", Clients "Single families"
   - Click "Generate Recommendations"
   - System suggests: Conflicts, Mentorship, Family Management
   - Accept all recommendations
   - Wizard closes
   - Main page shows 3 modules selected

### Accessibility Tests

1. **Keyboard Navigation:**
   - Tab through module cards
   - Press Space to select/deselect
   - Press Enter on "Learn More"
   - Arrow keys to navigate modal

2. **Screen Reader:**
   - Announce: "Conflicts module, not selected"
   - After click: "Conflicts module, selected"
   - After star: "Conflicts module, selected as primary"

---

## 🔗 Dependencies

### Story Dependencies
- **Depends on:** FG-004 - Work Experience & Education (Step 2 complete)
- **Blocks:** FG-006 - Draft Profile Saving (Step 4, profile review)
- **Related:** Platform module definitions must exist in database

### Technical Dependencies
- Module definitions in database (10 modules with descriptions)
- Module icons/images stored in S3 or CDN
- Modal component library (React Modal or Radix UI)

### Data Dependencies
- Platform modules table with:
  - Module name, icon, short description, full description
  - Typical activities, required skills, average engagement duration
  - Display order (Conflicts #1, Constitution #2, etc.)

---

## ⚠️ Non-Functional Requirements

### Performance
- Page load with 10 modules: < 1 second
- Selection response: < 100ms
- Modal open: < 200ms
- Save operation: < 500ms

### Accessibility
- Keyboard navigation (Tab, Space, Enter)
- Screen reader announces selections and changes
- Focus indicators visible (blue outline)
- Color not sole indicator (use icons + text)
- Touch targets 44x44px minimum (mobile)

### Analytics Tracking
- Track module selection frequency (which modules most popular)
- Monitor primary vs. secondary distribution
- Measure wizard usage rate
- Track "Learn More" modal opens by module

### Mobile Support
- Responsive grid: 3 cols desktop, 2 tablet, 1 mobile
- Touch-friendly cards (no hover dependency)
- Scrollable grid on mobile
- Modal fits mobile viewport

---

## 📝 Notes

**Questions:**
- [ ] Should we add proficiency levels (Beginner/Intermediate/Expert)? (Defer to Phase 2)
- [ ] Do advisors rank modules by expertise level vs. alphabetical? (Currently: User selects, system doesn't rank beyond primary/secondary)
- [ ] Should module combinations suggest badges automatically? (Future: "Governance Mediator" badge)
- [ ] Can advisors update module selection after profile published? (Yes, anytime via profile edit)

**Assumptions:**
- Advisors understand platform modules from descriptions
- Most advisors will select 3-5 modules (middle range)
- Primary expertise designation is intuitive (star icon)
- Wizard recommendations are helpful for new advisors

**Future Enhancements:**
- AI-powered recommendations based on work history and bio
- Module expertise verification/testing (quiz or assessment)
- Client feedback per module for credibility scores
- Module-specific certification programs
- Dynamic module suggestions based on market demand
- Expertise level indicator (Beginner to Expert scale)
- Module combination packages for bundled services
- "Top 10 [Module] Specialists" leaderboard

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-17  
**Story Status:** Ready for Development  
**Sprint:** Sprint 45