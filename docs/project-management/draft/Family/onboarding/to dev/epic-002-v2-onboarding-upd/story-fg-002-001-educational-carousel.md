## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a new visitor, I want to see family governance education on the login screen
**Epic Link:** FG-EPIC-002-V2-onboarding-upd [Onboarding Flow v2.0 - Registration Restructure & Enhanced Setup Wizard]
**Priority:** Critical
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** new visitor to the Family Governance Platform,
**I want to** see educational carousel content on the login/sign-up screen,
**so that** I can understand the value and benefits of family governance before committing to registration.

**Example:**
- **As a** new visitor,
- **I want to** view 5 educational cards about family governance concepts while on the login screen,
- **so that** I can make an informed decision about whether to register for the platform.

---

## 🎯 Business Context

**Why is this Story important?**

Moving the educational carousel from post-registration to the login screen addresses a critical conversion issue:
- **User pain point:** Users were registering without understanding the platform's value proposition, leading to early abandonment
- **Business outcome:** Higher conversion rates by educating users BEFORE registration commitment
- **Strategic alignment:** Supports product-led growth strategy by showcasing value upfront

This change is expected to increase registration completion rates from current baseline to target 85%.

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** I am a visitor on the login screen,
   **When** I view the page,
   **Then** I see a split-screen layout with login form on left and educational carousel on right.

2. **Given** the educational carousel is displayed,
   **When** I wait 5 seconds,
   **Then** the carousel automatically advances to the next card.

3. **Given** the carousel is displaying,
   **When** I click the navigation dots or arrow controls,
   **Then** I can manually navigate between the 5 educational cards.

4. **Given** I am viewing the carousel,
   **When** I click the pause button,
   **Then** auto-play stops and I can review content at my own pace.

5. **Given** I am on the sign-up screen,
   **When** I view the page,
   **Then** I see the same educational carousel as on the login screen.

**Additional Criteria:**
- [ ] Carousel contains all 5 educational cards from v1 with same content
- [ ] Mobile responsive: stacked layout (carousel above form) on screens < 768px
- [ ] Carousel state (current card position) persists between login/sign-up navigation
- [ ] All carousel controls are accessible (keyboard navigation, ARIA labels)
- [ ] Carousel loads without impacting form interaction performance

---

## 🔒 Business Rules

**Validation Rules:**
1. **Carousel Content:** Must display exactly 5 cards with same content as EPIC-001 v1
2. **Auto-play Timing:** 5 seconds per card, loops continuously
3. **Mobile Behavior:** Carousel appears above form on mobile, maintains all functionality

**Authorization:**
- **Who can perform this action:** All visitors (no authentication required)
- **Who can view results:** All visitors

**Edge Cases:**
- **Slow network:** Show placeholder skeleton while carousel images load
- **JavaScript disabled:** Display static first card with text fallback
- **Screen readers:** Provide descriptive text alternatives for all carousel images
- **Very small screens (<375px):** Collapse carousel to condensed view with text only

---

## 📐 Design & UX

**Mockups/Wireframes:**
- Figma: https://www.figma.com/design/NWeSLJWw6iPinNILwPbsfv/-ReFamily--Web-Platofrm?node-id=3690-114247&t=UgPYb2pfH4R5d3VR-1

**User Flow:**
1. User navigates to login page (domain.com/login)
2. User sees split-screen: login form (left) + carousel (right)
3. Carousel auto-plays through 5 educational cards
4. User can interact with carousel controls (dots, arrows, pause)
5. User clicks "Sign Up" link → navigates to sign-up screen with carousel
6. Carousel persists on sign-up screen with same functionality

**Design Specifications:**
- **Desktop Layout:** 60% form / 40% carousel split
- **Tablet Layout:** 50% / 50% split
- **Mobile Layout:** Stacked (carousel 100% width above form)
- **Carousel Controls:** Navigation dots, left/right arrows, pause/play button
- **Animation:** Smooth transitions (300ms fade), no jarring movements

---

## 🧪 Test Scenarios

**Happy Path:**
1. Navigate to login page → verify split-screen layout displays
2. Wait 5 seconds → verify carousel advances automatically
3. Click navigation dots → verify manual navigation works
4. Click pause button → verify auto-play stops
5. Click "Sign Up" link → verify carousel persists on sign-up screen
6. Navigate back to login → verify carousel position state maintained

**Negative Tests:**
1. **Slow network simulation:** Verify skeleton loader displays while carousel loads
2. **JavaScript disabled:** Verify static fallback card displays
3. **Invalid image URLs:** Verify placeholder image displays with error handling
4. **Rapid clicking navigation:** Verify no animation glitches or state errors

**Edge Cases:**
1. **Mobile portrait (375px width):** Verify stacked layout renders correctly
2. **Mobile landscape:** Verify carousel adapts to landscape orientation
3. **Screen reader navigation:** Verify ARIA labels announce carousel changes
4. **Keyboard-only navigation:** Verify all carousel controls accessible via Tab/Enter/Arrow keys
5. **Browser back button:** Verify carousel state resets to first card

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** None (can be developed independently)
- **Blocks:** FG-002-002 (3-step sign-up wizard - shares same screen layout)

**Technical Dependencies:**
- Carousel component library or custom React component
- Image optimization service for carousel assets
- Responsive design framework

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Page load time: < 2 seconds on 3G network
- Carousel image optimization: WebP format, < 200KB per image
- Smooth animations: 60fps on modern browsers

**Security:**
- No authentication required (public page)
- No PII handling
- Images served from CDN with proper CORS headers

**Browser Support:**
- Chrome: 90+
- Safari: 14+
- Firefox: 88+
- Edge: 90+
- Mobile Safari (iOS 14+)
- Mobile Chrome (Android 10+)

**Accessibility:**
- WCAG 2.1 Level AA compliance
- Screen reader compatible
- Keyboard navigation support
- High contrast mode support

**Other:**
- Mobile-first responsive design
- Progressive enhancement (works without JavaScript)
- Analytics tracking: carousel engagement (card views, pause events)

---

## 📝 Notes

**Migration from EPIC-001:**
- Reuse existing carousel content and assets from v1
- Remove carousel from post-registration onboarding flow
- Update analytics tracking to new placement (login screen vs. onboarding)

**Open Questions:**
- Should carousel position reset on each login screen visit, or remember user's last viewed card?
- Do we need different carousel content for returning users vs. first-time visitors?

**Assumptions:**
- Educational content from v1 carousel is still current and effective
- Split-screen layout will not negatively impact login conversion rates
- Users will engage with carousel content before/during registration process

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-30
