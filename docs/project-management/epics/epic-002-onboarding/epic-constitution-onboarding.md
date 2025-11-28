
---
**Issue Type:** Epic  
**Project:** FG
**Epic Name:** Registration Flow with Educational Carousel & Constitution Setup  
**Summary:** Implement registration screen with 5-card educational carousel, OAuth integration (Google, Apple, LinkedIn), and 8-step role-based constitution setup wizard  
**Parent Initiative:** FG-XXX [Link to Family Governance Platform Proposal]  
**Priority:** Critical  
**Epic Link:** FG-EPIC-001
---
# Onbording / Registration Flow with Educational Carousel & Constitution Setup

## �� Epic Goal

**What will this Epic deliver?**

A complete onboarding experience that educates users about family governance value during registration (5-card carousel) and guides them step-by-step through constitution creation (8-step wizard), transforming our biggest dropout point into a successful activation flow.

**User-Facing Value:**
- Engaging registration experience with value proposition explained before signup
- Reduced signup friction via OAuth (Google, Apple, LinkedIn)
- Step-by-step guided constitution creation with role-appropriate experience
- Complete family constitution document as deliverable
- Ability to skip and revisit onboarding tour

**Business Value:**
- Higher conversion rates through engaging registration experience
- Increased completion rates via progress visualization
- Reduced support burden through educational content
- Critical foundation for all platform features

**Scope Boundaries:**
- ✅ **Included:** Registration screen with carousel, OAuth integration (Google/Apple/LinkedIn), constitution wizard UI with role-based permissions, educational content, workshop selection, progress tracking, constitution generation, skip/revisit tour functionality
- ❌ **NOT Included:** Email verification system (use existing), actual advisor workshop scheduling, AI workshop implementation, advanced constitution editing, multi-language support

---

## �� Target Users

**Who will use this feature?**

- **Primary Personas:** Family Administrator (DOC-USR-002), Family Council Member (DOC-USR-002)
- **Secondary Personas:** Family Member (DOC-USR-001)

---

## �� User Stories (High-Level)

**Main scenarios this Epic will enable:**

1. **As a** Family Administrator, **I want to** see a compelling introduction to Family Governance during registration, **so that** I understand the value before signing up

2. **As a** Family Council Member, **I want to** be guided through constitution creation step-by-step, **so that** I don't feel overwhelmed by the process

3. **As a** Family Council Member, **I want to** choose between advisor-led, AI-assisted, or manual workshop formats, **so that** I can match my budget and preferences

4. **As a** Family Council Member, **I want to** see our progress visually (progress bar), **so that** I stay motivated to complete the setup

5. **As a** Family Member, **I want to** understand why family governance matters, **so that** I'm motivated to participate

6. **As a** Family Member, **I want to** see what workshop method was selected by Administrator/Council, **so that** I can accept it and participate in the chosen format

7. **As a** Family Member, **I want to** skip onboarding tour and open it again later, **so that** I am free to explore the platform at my own pace

---

## �� Design & UX

**Figma Links:**
- Registration Screen with Carousel - [https://www.figma.com/design/NWeSLJWw6iPinNILwPbsfv/-ReFamily--Web-Platofrm?node-id=3690-114248&t=FCcm7L6S9Peht0e3-4]
- Constitution Wizard Flow - [https://www.figma.com/design/NWeSLJWw6iPinNILwPbsfv/-ReFamily--Web-Platofrm?node-id=3690-229557&t=FCcm7L6S9Peht0e3-4]
- Dashboard Integration - [https://www.figma.com/design/NWeSLJWw6iPinNILwPbsfv/-ReFamily--Web-Platofrm?node-id=3690-229880&t=FCcm7L6S9Peht0e3-4]

**UX Notes:**
- **User flows:** Registration → Carousel (5 cards, auto-play) → OAuth/Email signup → Dashboard → Constitution Setup (8 steps) → Completion
- **Key interactions:** Carousel controls (pause, dots, arrows), OAuth buttons, workshop selection (role-based), progress tracking, skip/resume tour
- **Responsive behavior:** Split-screen (desktop), stacked layout (mobile), full-screen wizard modal

**See also:** 
- Prototype Files: `prototypes/onboarding-flow/decision-workshop/swipe-cards-updated.html`, `prototypes/01-dashboard.html`

---

## �� Business Rules & Calculations

**Key Business Rules:**

1. **Family Member Prerequisites:**
   - Minimum 2 family members required to start constitution setup
   - At least 1 member must have Family Administrator role
   - Invitations count toward minimum if "registered" status

2. **Progress Calculation:**
   ```python
   progress_percentage = (completed_steps / total_steps) * 100
   # Where total_steps = 8
   ```

3. **Workshop Selection Rules:**
   - **Authorization:** Only Family Administrator OR Family Council can select workshop format
   - **Family members:** Cannot select format, must accept Administrator/Council's selection
   - Steps 4-7 allow workshop format selection (Assessment, Values/Mission/Vision, Decision Making/Conflict Resolution, Succession)
   - Selection is saved per family (family_id), not per user
   - Backend Authorization: POST endpoint checks JWT token for Administrator/Council role, returns 403 for unauthorized attempts

4. **OAuth Registration Rules:**
   - New users authenticated via OAuth automatically create accounts
   - Existing email + OAuth = link accounts
   - Multiple OAuth providers per user allowed

5. **Constitution Generation:**
   - Requires all 8 steps marked complete
   - Generates 12 constitution sections (Preamble, Values & Mission, Governance Structure, Decision Making, Conflict Resolution, Voting Rules, Wealth Management, Philanthropy, Succession, Education, Family Business, Amendment Process)

6. **Tour Skip/Resume Rules:**
   - Skip: Save current step progress, mark `tour_skipped = TRUE`
   - Resume: Open wizard at `last_viewed_step`
   - Restart: Reset `tour_skipped = FALSE`, set `last_viewed_step = 1`
   - Tour state persists per user (not per family)
   - Skipped tour doesn't block platform access

---

## �� Estimated Timeline

**Phases:**
1. **Investigation & Solution Design:** 1 week
2. **Development:** 10 weeks
   - Phase 1: Registration + Carousel (2.5 weeks)
   - Phase 2: Backend (2 weeks)
   - Phase 3: Wizard Frontend (3 weeks)
   - Phase 4: Dashboard Integration (1.5 weeks)
   - Phase 5: Testing & Polish (1.5 weeks)
3. **Testing:** 2 weeks (concurrent with development)
4. **Release & Knowledge Transfer:** 1 week

**Target Release:** Q1 2026 (End of Sprint 10)

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-16