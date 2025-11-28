STORY 1: Educational Carousel on Registration Screen

**Issue Type:** Story
**Project:** RLN1
**Summary:** As a new visitor, I want to see an educational carousel explaining Family Governance value, so that I understand the platform before signing up
**Epic Link:** SAAS-EPIC-001
**Priority:** Critical
**Story Points:** 5
**Sprint:** TBD

### ðŸ"– User Story

**As a** new visitor (potential Family Administrator or Council Member),
**I want to** see a visually engaging 5-card educational carousel on the registration screen,
**so that** I understand the value of Family Governance before committing to registration.

### ðŸŽ¯ Business Context

**Why is this Story important?**

Registration page is the first touchpoint and currently a major dropout point. An engaging educational carousel:
- Educates users about platform value before signup friction
- Reduces "What is this?" confusion leading to abandonment
- Sets proper expectations for post-registration experience
- Establishes trust through professional, informative design

### âœ… Acceptance Criteria

1. **Given** I visit the registration page as a new user,
   **When** the page loads,
   **Then** I see a split-screen layout with carousel.

2. **Given** the carousel is displayed,
   **When** I view it without interaction,
   **Then** cards auto-advance every 5 seconds.

3. **Given** I am viewing the carousel,
   **When** I hover over a card,
   **Then** auto-advance pauses until I move my mouse away.

4. **Given** I want manual control,
   **When** I click navigation arrows (← →) or dot indicators,
   **Then** carousel advances/reverses to the selected card immediately.

5. **Given** I am on any card,
   **When** I view the carousel,
   **Then** I see: card title, description text, illustration/icon, dot indicators (1-5), navigation arrows.

**Additional Criteria:**
- [ ] Carousel contains exactly 5 cards with educational content
- [ ] Content aligns with Figma design: https://www.figma.com/design/NWeSLJWw6iPinNILwPbsfv/-ReFamily--Web-Platofrm?node-id=3690-114248
- [ ] Carousel uses Radix UI Carousel component with Tailwind styling
- [ ] Auto-advance respects `prefers-reduced-motion` accessibility setting
- [ ] Carousel is responsive: stacked layout on mobile (<768px), split-screen on desktop

### ðŸ" Design & UX

**Mockups/Wireframes:**
- Figma: https://www.figma.com/design/NWeSLJWw6iPinNILwPbsfv/-ReFamily--Web-Platofrm?node-id=3690-114248

**User Flow:**
1. User navigates to registration page (/)
2. Page loads with carousel starting on Card 1
3. User reads Card 1, carousel auto-advances after 5s to Card 2
4. User hovers over Card 2, auto-advance pauses
5. User clicks dot indicator for Card 4, jumps directly
6. User proceeds to registration form when ready

5 cards presented sequentially:
1. **Welcome** - Introduction to Reluna
2. **The Challenge** - Problem statement with statistics
3. **Why It Happens** - Root causes analysis
4. **How Reluna Helps** - Solution overview with architecture diagram
5. **Get Started** - Call-to-action

### ðŸ"' Business Rules

**Validation Rules:**
1. **Auto-advance timing:** 5 seconds per card
2. **Accessibility:** Must respect `prefers-reduced-motion` CSS media query

**Authorization:**
- **Who can view:** Public (unauthenticated users)

---
