# Epic Template - Jira FG Project

> **Note:** This is an Epic for Desktop Registration & Stripe Integration Update in Family Governance platform.

---

## 📋 Basic Information

**Issue Type:** Epic
**Project:** FG
**Epic Name:** Desktop Registration & Stripe Integration Update (Multi-Persona Support)
**Summary:** Update desktop registration to support External Advisors, extend trial period to 30 days, and integrate with unified subscription management
**Parent Initiative:** FG-INIT-001 [Multi-Platform Subscription Onboarding Initiative]
**Priority:** High
**Epic Link:** FG-EPIC-003

---

## 🎯 Epic Goal

**What will this Epic deliver?**

This Epic updates the existing desktop web registration flow to support two personas (Family Administrator and External Advisor), extends the trial period from 14 to 30 days, and integrates with the unified subscription management system for cross-platform consistency.

**User-facing value:**
- **Family Administrators:** Extended 30-day trial period (up from 14 days)
- **External Advisors:** NEW - Can now register via desktop and manage multiple family clients
- Unified subscription experience across iOS, Android, and Desktop
- Consistent trial period across all platforms
- Multiple OAuth providers (Google, Apple, LinkedIn)
- Trusted Stripe payment experience (already implemented)
- Persona-specific onboarding flows

**Business value:**
- Enable advisor revenue stream through desktop registration
- Increased trial conversion with longer evaluation period (30 vs 14 days)
- Unified subscription management reduces technical debt
- Cross-platform subscription sync for seamless user experience
- Support for two-sided marketplace (families + advisors)
- Reduced support burden with consistent subscription rules
- Foundation for advisor marketplace features

**Scope boundaries:**
- ✅ **Included:** Extend trial period 14 → 30 days, External Advisor registration flow, persona selection during registration, advisor-specific onboarding (skip constitution setup), unified subscription service integration, Stripe webhook updates for 30-day trial, persona-based dashboard routing
- ✅ **Included:** Update existing Stripe Customer Portal integration, sync subscription status with iOS/Android
- ❌ **NOT Included:** Stripe payment integration from scratch (already exists), mobile app development, advisor marketplace features (separate Epic), advisor-family association management (separate Epic)
- ❌ **NOT Included:** Email verification system (already exists), OAuth providers setup (already exists), frontend redesign (only update registration flow)

---

## 👥 Target Users

**Who will use this feature?**

- **Primary Personas:** 
  - Family Administrator (DOC-USR-002) - Existing persona, now with 30-day trial
  - External Advisor (DOC-USR-003) - NEW - Professional advisors registering to serve multiple families
- **Secondary Personas:** None

---

## 📖 User Stories (High-Level)

**Main scenarios this Epic will enable:**

1. **As a** Family Administrator, **I want to** register via desktop with 30-day trial (instead of 14 days), **so that** I have more time to evaluate the platform with my family before committing

2. **As a** External Advisor, **I want to** register via desktop using my professional email, **so that** I can create an advisor account and later connect with family clients

3. **As a** Family Administrator, **I want to** choose "Family Account" during registration, **so that** I'm routed to family-specific onboarding (constitution setup)

4. **As a** External Advisor, **I want to** choose "Advisor Account" during registration, **so that** I'm routed to advisor-specific onboarding (skip constitution, go to marketplace)

5. **As a** Family Administrator, **I want to** see consistent subscription status across desktop and mobile apps, **so that** my subscription works seamlessly regardless of device

6. **As a** External Advisor, **I want to** manage my subscription through Stripe Customer Portal, **so that** I can update billing, upgrade, or cancel using familiar interface

7. **As a** External Advisor, **I want to** subscribe with monthly or annual options, **so that** I can select the billing cycle that fits my advisory business model

[Detailed User Stories will be created in FG during Grooming]

---

## 🔗 Dependencies & Risks

### Dependencies (Blockers)

**Upstream:**
- **REQUIRED:** Unified Subscription Service backend (developed in FG-EPIC-001) ✅
  - Reuses existing architecture
  - Adds Stripe subscription sync
  - Manages cross-platform subscription status
- **EXISTING:** Desktop web application (already available) ✅
- **EXISTING:** Stripe Customer Portal integration (already implemented) ✅
- **EXISTING:** OAuth providers (Google, Apple, LinkedIn) ✅
- **EXISTING:** Auth Service (already supports multi-persona authentication) ✅

**Downstream:**
- Epic: FG-EPIC-004 - Advisor Marketplace (will use advisor registrations from this Epic)
- Epic: FG-EPIC-005 - Advisor-Family Associations (will manage advisor-client relationships)

**External Dependencies:**
- Stripe account active with subscription billing capabilities ✅
- Stripe Customer Portal already configured ✅

### Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaking changes to existing Family Administrator registration flow | **High** - Disrupts current users | Thorough regression testing, feature flag rollout, rollback plan |
| Stripe webhook updates causing subscription sync issues during migration | **Medium** - Billing confusion | Deploy unified subscription service first, test webhook handling extensively |
| Advisor registration confusion - users selecting wrong persona | **Medium** - Support burden | Clear persona descriptions during registration, confirmation step, allow persona change in settings |
| Trial period extension not applying to existing users retroactively | **Low** - User dissatisfaction | Communicate as "new registrations only", consider goodwill extension for existing trial users |
| Cross-platform subscription sync delays causing access issues | **Medium** - User frustration | Implement real-time sync, fallback to polling every 5 minutes, clear "syncing" indicators |
| Advisor onboarding flow incomplete (skips constitution) → dead end | **Low** - Advisor confusion | Direct advisors to marketplace immediately after registration, clear next steps |

---

## 🎨 Design & UX

**Figma Links:**
- [Desktop Persona Selection Screen - TBD]
- [Advisor Registration Flow - TBD]
- [Updated Trial Status UI (30 days) - TBD]

**UX Notes:**
- **User flows:**
  
  **Family Administrator (Updated Flow):**
  ```
  Landing Page → Choose "Family Account" → OAuth Sign-In → 
  Stripe Customer Portal (30-day trial) → Email Verification → 
  Constitution Onboarding → Family Dashboard
  ```

  **External Advisor (NEW Flow):**
  ```
  Landing Page → Choose "Advisor Account" → OAuth Sign-In → 
  Stripe Customer Portal (30-day trial) → Email Verification → 
  Advisor Onboarding (Profile Setup) → Advisor Dashboard → Marketplace
  ```

**Design Principles:**
- Minimal changes to existing UI (reduce risk)
- Clear persona selection with icons and descriptions
- Consistent Stripe payment experience
- Responsive design (mobile-first web)
- Accessibility compliance (WCAG 2.1 AA)

**Key UI Changes:**
1. **Registration Screen:** Add persona selection step BEFORE OAuth
   - "I'm registering my family" (Family icon)
   - "I'm an advisor serving families" (Professional icon)
2. **Trial Status Banner:** Update "14 days remaining" → "30 days remaining"
3. **Advisor Dashboard:** NEW - Skip constitution onboarding, show advisor tools
4. **Subscription Management:** Update trial period display in settings

**See also:** Existing desktop registration flow documentation (past chats reference)

---

## 🧮 Business Rules

**Key Business Rules:**

1. **Registration WITHOUT payment method is PROHIBITED** - Users (both personas) must complete Stripe subscription to finish registration
2. **Trial period: 30 days for all users** - Applies to new registrations only (existing users keep 14-day trial if still active)
3. **Auto-charge after trial** - No confirmation required, Stripe charges automatically at trial end
4. **Unified pricing across platforms** - Same price point for iOS, Android, and Desktop
5. **Single subscription per family** - One Family Administrator subscription shared across family members
6. **Advisor subscription independent** - External Advisors have separate subscriptions (not shared with families)
7. **Persona selection required** - Users must choose "Family" or "Advisor" during registration
8. **Persona cannot change after registration** - Permanent decision (requires new account to switch)
9. **OAuth providers: Multiple options** - Google, Apple, LinkedIn supported for both personas
10. **Stripe Customer Portal managed** - Users manage subscriptions through Stripe (upgrade, cancel, billing)
11. **Trial cannot be restarted** - Once trial ends or subscription cancels, cannot get new trial on same email
12. **Subscription tiers: Monthly OR Annual** - Two billing options, annual offers ~15-20% discount
13. **Cross-platform subscription sync: Real-time** - Subscription changes sync immediately across devices
14. **Email verification required** - Both personas must verify email before accessing platform
15. **Advisor onboarding skips constitution** - Advisors go directly to marketplace/profile setup
16. **Family Administrator role automatic** - First family user automatically becomes administrator
17. **Advisor multi-family support** - Single advisor subscription allows serving unlimited families (association-based access)

**See also:** 
- Desktop registration business rules (existing documentation)
- Unified subscription management rules (FG-EPIC-001)

---

## 📅 Estimated Timeline

**Phases:**

1. **Investigation & Solution Design:** 1 week
   - Persona selection UX design
   - Advisor onboarding flow design
   - Stripe webhook updates analysis
   - Unified subscription service integration plan

2. **Backend Development:** 2 weeks
   - Unified Subscription Service integration (Stripe sync)
   - Auth Service persona-based routing
   - Stripe webhook updates (30-day trial configuration)
   - Cross-platform subscription status sync
   - Advisor-specific user management

3. **Frontend Development:** 2 weeks
   - Persona selection screen
   - Advisor registration flow
   - Advisor onboarding (profile setup)
   - Update trial status UI (30 days)
   - Persona-based dashboard routing
   - Subscription management updates

4. **Testing & QA:** 1.5 weeks
   - Unit tests (backend & frontend)
   - Integration tests (persona flows)
   - E2E tests (full registration for both personas)
   - Stripe webhook testing (30-day trial)
   - Cross-platform subscription sync testing
   - Regression testing (existing Family flow)

5. **Release & Knowledge Transfer:** 0.5 weeks
   - Feature flag deployment (gradual rollout)
   - Monitoring setup
   - Documentation updates
   - Team training
   - Support handoff

**Total Estimated Duration:** 7 weeks

**Target Release:** Q1 2026 (parallel with FG-EPIC-001 iOS release)

---

## 📝 Notes

**Open Questions:**
- [ ] Should existing 14-day trial users get extended to 30 days? (Goodwill gesture vs. "new registrations only")
- [ ] How to handle persona selection mistake - allow changing persona in settings? (Recommendation: No, requires new account)
- [ ] Should advisors have different subscription pricing than families? (Recommendation: Same pricing initially)
- [ ] What happens if advisor subscription expires - lose access to all families? (Recommendation: Yes, clear warning before expiration)
- [ ] Should we allow advisors to register without payment initially (freemium model)? (Recommendation: No, consistent with family rules)
- [ ] Display persona badge on user profile? (Recommendation: Yes, helps identify user type in support)

**Technical Notes:**
- **Stripe Configuration Updates:**
  - Update trial period in Stripe Product settings: 14 → 30 days
  - Test webhook handling for extended trial period
  - Update `STRIPE_PRICE_ID` environment variable if creating new product
- **Database Schema Updates:**
  - `users.persona` enum: ['family_administrator', 'external_advisor']
  - `users.onboarding_completed` boolean (track different flows)
  - `advisors` table may need updates (port 8011 advisor-portal-service)
- **Frontend Routes:**
  - `/register/family` - Family registration flow
  - `/register/advisor` - Advisor registration flow
  - `/onboarding/family` - Constitution setup
  - `/onboarding/advisor` - Profile setup + marketplace
- **Feature Flag:**
  - `enable_advisor_registration` - Gradual rollout control
  - `trial_period_30_days` - Switch between 14/30 days (testing)

**Migration Plan:**
- Deploy unified subscription service first (backend)
- Update Stripe webhook handlers (test in staging)
- Deploy persona selection UI (feature flag OFF)
- Test advisor registration flow internally
- Enable feature flag for 10% users (A/B test)
- Monitor trial conversion rates (14 vs 30 days)
- Full rollout after 1 week of monitoring

**Monitoring & Analytics:**
- Track persona selection distribution (Family vs. Advisor)
- Monitor trial-to-paid conversion rate (14-day baseline vs. 30-day new)
- Track advisor registration funnel (where dropoffs occur)
- Cross-platform subscription sync success rate
- Stripe webhook processing latency
- Persona selection mistakes (users contacting support to change)

**Support Documentation:**
- FAQ: "How do I know if I should register as Family or Advisor?"
- Guide: "Switching from 14-day to 30-day trial (for existing users)"
- Troubleshooting: "Subscription not syncing across devices"
- Tutorial: "Getting started as an External Advisor"

**Rollback Plan:**
- Feature flag allows instant rollback to 14-day trial
- Persona selection can be hidden (default to Family)
- Stripe configuration rollback prepared
- Database migration reversible (persona field nullable)

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-23
**Created By:** Product Management Team
**Next Review:** After Sprint Planning