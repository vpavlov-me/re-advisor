---
story_id: "FG-004"
epic: "EPIC-007"
title: "Stripe Embedded Onboarding Component (Frontend)"
priority: "critical"
sprint: "Week 2"
story_points: "8"
---

# User Story: Stripe Embedded Onboarding Component (Frontend)

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Consultant, I want to complete Stripe onboarding within platform interface, so that I don't need to leave platform to setup payment account
**Epic Link:** EPIC-007 - Stripe Connect Payment Setup for Consultants
**Priority:** Critical
**Story Points:** 8
**Sprint:** Week 2

---

## 📖 User Story

**As a** Consultant,
**I want to** complete Stripe's onboarding process within the platform's modal interface,
**so that** I can provide bank account and tax information without being redirected to external site.

---

## 🎯 Business Context

**Why is this Story important?**

**User pain point being solved:**
- External redirects break user flow and increase abandonment
- Consultants lose context when redirected to Stripe-hosted pages
- Trust issues when leaving platform for sensitive data entry

**Business outcome expected:**
- Reduce onboarding abandonment from 40% to <25%
- Increase completed setups (better conversion)
- Maintain platform branding throughout onboarding
- Consultant stays within platform ecosystem

**Strategic alignment:**
- Core marketplace enablement feature
- Improves consultant acquisition and activation
- Foundation for embedded payment features

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** consultant has client_secret from backend,
   **When** embedded onboarding modal opens,
   **Then** Stripe's onboarding component loads and displays within modal.

2. **Given** Stripe component is loading,
   **When** component initializes,
   **Then** consultant sees loading spinner, then Stripe's onboarding form.

3. **Given** consultant completes Stripe onboarding,
   **When** consultant submits all required information,
   **Then** modal closes and consultant sees "Verification Pending" status on dashboard.

4. **Given** consultant exits onboarding before completion,
   **When** consultant clicks "Save & Exit" or closes modal,
   **Then** progress is saved by Stripe and consultant can resume later.

5. **Given** Stripe component fails to load,
   **When** loading error occurs,
   **Then** consultant sees error message with "Try Again" and "Use Stripe-hosted page" fallback options.

**Additional Criteria:**
- [ ] Modal displays responsively on desktop, tablet, and mobile
- [ ] Loading state shows spinner during component initialization
- [ ] Error state shows user-friendly message with retry option
- [ ] Exit button allows consultant to close without completing
- [ ] Progress indicator shows completion percentage (provided by Stripe)
- [ ] Stripe component handles all data validation and collection
- [ ] Component styling matches platform theme (within Stripe's customization limits)
- [ ] Analytics tracking: onboarding started, completed, abandoned

---

## 🔐 Business Rules

**Validation Rules:**
1. **Component Initialization Requirements**:
   - Valid client_secret from backend (not expired)
   - `@stripe/connect-js` library loaded
   - Stripe public key configured

2. **Modal Behavior**:
   - Modal opens immediately after session generation
   - Modal size: Full-screen on mobile, centered 800px wide on desktop
   - Modal backdrop prevents clicking outside to close (must use exit button)
   - Exit confirmation: "Are you sure? Your progress will be saved."

3. **Data Flow Rules**:
   - Platform NEVER sees data consultant enters in Stripe component
   - All data validation handled by Stripe component
   - Stripe stores all sensitive information
   - Platform only receives completion/exit events

**Authorization:**
- **Who can access:** Authenticated consultants only
- **Session validation:** client_secret must be valid and not expired

**Edge Cases:**
- **client_secret expired**: Request fresh session from backend automatically
- **Network disconnection**: Stripe component shows "Connection lost, reconnecting..."
- **Component fails to load**: Display fallback link to Stripe-hosted page
- **Browser doesn't support component**: Detect and redirect to Stripe-hosted page
- **Consultant refreshes page mid-onboarding**: Session lost, request fresh session

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Figma: [Link to Embedded Onboarding Modal design]
- Loading State: Spinner with "Initializing Stripe..." message
- Error State: Friendly error message with retry and fallback options

**User Flow:**
1. Consultant completes pre-setup guidance (Story 1)
2. System creates payment account (Story 2)
3. System generates secure access (Story 3)
4. **Onboarding interface displays** (this story)
5. Consultant enters information in payment processor's form
6. Consultant submits or exits
7. Interface closes, dashboard updates with status

**Modal Structure:**
```
┌────────────────────────────────────────────────┐
│ [X] Complete Payment Setup                     │
├────────────────────────────────────────────────┤
│                                                │
│  [Payment Processor Interface Displays Here]  │
│  (Stripe owns this UI)                        │
│                                                │
│  Consultant sees:                             │
│  - Bank account entry form                    │
│  - Tax ID entry form                          │
│  - Business information form                  │
│  - Progress indicator                         │
│  - Validation messages                        │
│  - "Save & Continue" / "Submit" buttons       │
│                                                │
│  Platform sees: NOTHING (encrypted by Stripe) │
│                                                │
└────────────────────────────────────────────────┘
```

**Loading State:**
```
┌────────────────────────────────────────────────┐
│ Complete Payment Setup                         │
├────────────────────────────────────────────────┤
│                                                │
│          [Spinner Animation]                   │
│                                                │
│     Initializing secure onboarding...          │
│                                                │
└────────────────────────────────────────────────┘
```

**Error State:**
```
┌────────────────────────────────────────────────┐
│ Complete Payment Setup                         │
├────────────────────────────────────────────────┤
│                                                │
│  ❌ Unable to load onboarding form             │
│                                                │
│  This can happen due to network issues or      │
│  browser compatibility.                        │
│                                                │
│  [Try Again] [Use payment processor page]      │
│                                                │
└────────────────────────────────────────────────┘
```

**Key UX Principles:**
- **Seamless integration**: Consultant never feels they left platform
- **Progress visibility**: Progress indicator shows completion
- **Error resilience**: Graceful handling of loading failures
- **Exit flexibility**: Consultant can save and resume later
- **Mobile-first**: Responsive design for all screen sizes

---

## 🧪 Test Scenarios

**Happy Path:**
1. Consultant clicks "Start Stripe Setup" on guidance screen
2. Backend creates account and generates session
3. Frontend receives client_secret
4. Modal opens with loading spinner
5. Stripe component initializes and displays form
6. Consultant completes all required fields (bank account, tax ID)
7. Stripe validates inputs in real-time
8. Consultant clicks "Submit"
9. Stripe processes submission
10. Modal closes, dashboard shows "Verification Pending"

**Negative Tests:**
1. **Expired client_secret:**
   - Given: client_secret is >1 hour old
   - When: Frontend attempts to initialize component
   - Then: Component fails, frontend requests fresh session automatically

2. **Network Disconnection:**
   - Given: Consultant loses internet mid-onboarding
   - When: Network disconnects
   - Then: Stripe component shows "Connection lost" message, reconnects when available

3. **Component Load Failure:**
   - Given: Stripe CDN unavailable or blocked
   - When: Component fails to load after 10 seconds
   - Then: Display error state with "Use Stripe-hosted page" fallback

**Edge Cases:**
1. **Browser Refresh Mid-Onboarding:**
   - Given: Consultant refreshes page during onboarding
   - When: Page reloads
   - Then: Session lost, consultant must request fresh session to resume

2. **Modal Close Before Completion:**
   - Given: Consultant clicks exit button mid-onboarding
   - When: Exit confirmation shown
   - Then: If confirmed, modal closes, progress saved by Stripe

3. **Mobile Screen Size:**
   - Given: Consultant on mobile device (320px width)
   - When: Modal opens
   - Then: Full-screen modal with scrollable Stripe form

4. **Browser Compatibility:**
   - Given: Consultant uses unsupported browser (IE11)
   - When: Component initialization attempted
   - Then: Detect incompatibility, redirect to Stripe-hosted page

---

## 📗 Dependencies

**Story Dependencies:**
- **Blocked by:**
  - FG-002 (Stripe Account Creation) - need Account ID
  - FG-003 (Session Generation) - need client_secret
- **Blocks:**
  - FG-005 (Webhook Processing) - completion triggers webhook
  - FG-006 (Dashboard Status Widget) - status updates after completion

**Technical Dependencies:**
- Payment processor embedded component integration
- Secure access token from previous step
- Modal overlay component capability
- Platform branding configuration

**External Dependencies:**
- Payment processor (Stripe) interface availability
- Payment processor content delivery network

---

## ⚠️ Non-Functional Requirements

**Security:**
- Authorization required: Yes (consultant role only)
- Data encryption: All data encrypted by payment processor (platform never sees)
- PII handling: Platform NEVER receives PII entered in payment processor component
- Secure connection required: Component only loads over secure connections

**Performance:**
- Component load time: < 3 seconds
- Modal open animation: < 300ms
- Access token expiration detection: Immediate with auto-refresh
- Analytics events: Non-blocking, < 100ms

**Reliability:**
- Fallback to payment processor hosted page if component fails
- Auto-retry access token generation if expired
- Error recovery without consultant losing context
- Progress preservation if consultant exits

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Edge: Latest 2 versions
- Mobile Safari (iOS): iOS 14+
- Chrome Mobile (Android): Android 10+
- **Not supported:** IE11 (redirect to payment processor hosted page)

**Accessibility:**
- WCAG 2.1 Level AA compliance (payment processor component handles)
- Keyboard navigation support
- Screen reader compatible
- Focus management in modal

---

## 📝 Notes

**Design Decisions:**
- Modal overlay vs full-page view: Modal for less disruptive flow
- Exit confirmation: "Your progress will be saved. Resume anytime."
- Error handling: Graceful fallback to payment processor hosted page
- Mobile behavior: Full-screen modal on mobile devices

**Analytics Events to Track:**
```
- Onboarding interface opened
- Onboarding completed
- Onboarding abandoned (stage and reason)
- Component load failures
```

**Modal Behavior:**
- Prevent closing modal by clicking backdrop (must use exit button)
- Exit confirmation: "Your progress will be saved. Resume anytime."
- On exit: Close modal, return to dashboard, show "Setup In Progress" status

**Responsive Design:**
- Desktop (>1024px): Modal 800px wide, centered
- Tablet (768px-1024px): Modal 90% width, centered
- Mobile (<768px): Full-screen modal, scrollable

**Monitoring:**
- Track component initialization success rate (target: >95%)
- Alert if load failures >5% over 5-minute window
- Track onboarding completion rate (target: >75%)
- Monitor access token expiration rate

**Fallback Flow:**
- If component fails to load, offer payment processor hosted page link
- Redirect consultant to payment processor's hosted onboarding
- Return URL brings consultant back to platform after completion

**Open Questions:**
- [ ] Should consultant be able to minimize modal and continue browsing platform?
  - **Recommendation:** No, modal should be focus-locked (best practice)
- [ ] What if consultant's bank requires additional verification steps?
  - **Recommendation:** Payment processor component handles, consultant may need to upload documents
- [ ] Should system show estimated time remaining during onboarding?
  - **Recommendation:** Payment processor component shows progress

---

**Story Version:** 1.0.0
**Last Updated:** 2025-10-23
**Status:** Ready for Development
