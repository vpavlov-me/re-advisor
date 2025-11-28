# Epic Template - Jira FG Project

> **Note:** This is an Epic for Android Registration & Google Play Billing Integration in Family Governance platform.

---

## 📋 Basic Information

**Issue Type:** Epic
**Project:** FG
**Epic Name:** Android Registration & Google Play Billing Integration
**Summary:** Enable Family Administrators to register via Android app with Sign in with Google and subscribe through Google Play Billing with 30-day free trial
**Parent Initiative:** FG-INIT-001 [Multi-Platform Subscription Onboarding Initiative]
**Priority:** Medium
**Epic Link:** FG-EPIC-002

---

## 🎯 Epic Goal

**What will this Epic deliver?**

This Epic delivers complete registration and subscription onboarding flow for Android mobile application, enabling Family Administrators to sign up using Sign in with Google, subscribe through Google Play Billing system, and access the platform with 30-day free trial period.

**User-facing value:**
- One-tap registration with Sign in with Google (no password creation)
- Native Android subscription experience through Google Play Billing
- 30-day free trial with automatic conversion to paid subscription
- Secure biometric authentication (Fingerprint / Face Unlock) for app access
- Seamless deep linking from email verification to Android app
- Monthly or Annual subscription options
- Native Material Design UI following Android design guidelines

**Business value:**
- Access to Android user base (broader market reach beyond iOS)
- Leverage Google's trusted payment infrastructure for higher conversion
- Simplified subscription management through Google Play ecosystem
- Reduced payment processing complexity (Google handles billing)
- Higher user trust through Sign in with Google
- Improved conversion rates with biometric authentication
- Foundation for Android-first features (push notifications, widgets)

**Scope boundaries:**
- ✅ **Included:** Sign in with Google OAuth integration, Google Play Billing subscription setup, 30-day free trial configuration, biometric authentication (Fingerprint/Face Unlock), deep linking implementation (Android App Links), backend Google Play purchase token validation, unified subscription management across platforms, monthly/annual subscription tiers
- ✅ **Included:** Android app UI for registration flow, subscription management screen, trial status indicators
- ❌ **NOT Included:** iOS application development (separate Epic FG-EPIC-001 - already exists), push notifications implementation, Android widgets, offline mode, family member invitations via Android
- ❌ **NOT Included:** Google Play Store submission process (separate task), Play Store listing optimization, Android app marketing materials
- ❌ **NOT Included:** Android app development from scratch (CRITICAL BLOCKER - see Dependencies)

---

## 👥 Target Users

**Who will use this feature?**

- **Primary Personas:** Family Administrator (DOC-USR-002) - First user registering family account via Android device
- **Secondary Personas:** None (other family members will be invited by Administrator after registration)

---

## 📖 User Stories (High-Level)

**Main scenarios this Epic will enable:**

1. **As a** Family Administrator, **I want to** sign in with Google using my Google account, **so that** I can quickly register without creating a new password and leverage my existing Google identity

2. **As a** Family Administrator, **I want to** subscribe through Google Play Billing with 30-day free trial, **so that** I can try the platform risk-free and manage my subscription through familiar Google Play ecosystem

3. **As a** Family Administrator, **I want to** choose between monthly or annual subscription, **so that** I can select the billing cycle that fits my budget and commitment level

4. **As a** Family Administrator, **I want to** use Fingerprint or Face Unlock to authenticate, **so that** I can securely access the app without typing password every time

5. **As a** Family Administrator, **I want to** open email verification links directly in the Android app, **so that** I have a seamless registration experience without switching between browser and app

6. **As a** Family Administrator, **I want to** see my trial status and days remaining in the app, **so that** I'm aware of when my paid subscription will begin

7. **As a** Family Administrator, **I want to** manage my subscription (upgrade, cancel, view billing) through Google Play Subscriptions, **so that** I can control my subscription using familiar Android interface

[Detailed User Stories will be created in FG during Grooming]

---

## 🔗 Dependencies & Risks

### Dependencies (Blockers)

**Upstream:**
- **CRITICAL BLOCKER:** Android application development (separate initiative FG-INIT-XXX)
  - This Epic CANNOT start until Android app exists
  - Estimated 12-16 weeks for initial Android app development
  - Requires separate budget allocation and team assignment
- **REQUIRED:** Unified Subscription Service backend (developed in FG-EPIC-001) ✅
  - Reuses Apple IAP validation architecture
  - Extends to support Google Play purchase tokens
  - Manages trial period logic (30 days)
- **REQUIRED:** Auth Service update to support Google OAuth tokens
- **REQUIRED:** Deep linking configuration (Android App Links setup)

**Downstream:**
- Epic: FG-EPIC-003 - Desktop Registration Update (will reuse unified subscription service)

**External Dependencies:**
- Google Play Console account active with Billing capabilities
- Google Play Console configuration for subscription products
- Google Play Billing Library integration
- Sign in with Google OAuth 2.0 configuration

### Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Android app does NOT exist - CRITICAL BLOCKER** | **CRITICAL** - Epic cannot proceed | Prioritize Android app development as separate initiative, estimate 12-16 weeks |
| Google Play Store review rejection due to Billing implementation issues | **High** - Delays release by 1-3 weeks | Follow Google Play Billing guidelines strictly, test thoroughly, prepare fallback plan for resubmission |
| Google takes 15-30% commission on Play Billing subscriptions | **High** - Reduced revenue | Factor commission into pricing strategy, offset with higher Android user LTV |
| Google Play purchase token validation failures causing subscription sync issues | **Medium** - User access problems | Implement robust retry logic, fallback to manual sync, comprehensive error logging |
| Sign in with Google user abandonment if Google account not configured | **Medium** - Registration dropout | Provide clear onboarding instructions, support alternative OAuth providers for Desktop fallback |
| Deep linking not working on older Android versions (<6.0) | **Low** - Some users can't use email links | Graceful fallback to manual URL copy, support Android 8+ only (95% coverage) |
| Biometric authentication not available on older devices | **Low** - Manual password entry | Fallback to traditional login, display clear instructions |
| Trial period tracking discrepancies between Google Play and backend | **Medium** - Billing confusion | Server-side source of truth, regular reconciliation, clear trial end notifications |
| Device fragmentation - testing across multiple Android versions/manufacturers | **Medium** - UX inconsistencies | Test on top 10 devices (Samsung, Pixel, OnePlus), prioritize Android 10+ |

---

## 🎨 Design & UX

**Figma Links:**
- [Android Registration Flow - TBD]
- [Android Subscription Management Screen - TBD]
- [Android Trial Status Indicators - TBD]

**UX Notes:**
- **Platform compliance:** Strict adherence to Material Design 3 guidelines
- **User flows:** 
  - Registration: Play Store Download → Launch App → Sign in with Google → Play Billing Subscription → Trial Activated → Onboarding
  - Authentication: App Launch → Fingerprint/Face Unlock → Dashboard
  - Email Verification: Receive Email → Tap Link → Deep Link to App → Verification Complete
  - Subscription Management: Settings → Manage Subscription → Google Play Subscriptions (external)

**Design Principles:**
- Material Design 3 components (Jetpack Compose recommended)
- Material Icons
- Roboto font family
- Google Play Billing UI flows
- Bottom navigation (Android standard)

**See also:** Material Design Guidelines for In-App Purchases: https://material.io/design/platform-guidance/android-in-app-purchases.html

---

## 🧮 Business Rules

**Key Business Rules:**

1. **Registration WITHOUT payment method is PROHIBITED** - Users must complete Google Play Billing subscription to finish registration
2. **Trial period: 30 days for all users** - Automatically starts upon subscription confirmation
3. **Auto-charge after trial** - No confirmation required, Google charges automatically at trial end
4. **Unified pricing across platforms** - Same price point for iOS, Android, and Desktop (after Apple/Google commission)
5. **Single subscription per family** - One subscription shared across all family members and devices
6. **OAuth provider: Sign in with Google REQUIRED for Android** - Primary authentication method
7. **Subscription tiers: Monthly OR Annual** - Two billing options, annual offers ~15-20% discount
8. **Google Play Billing REQUIRED for Android subscriptions** - Cannot redirect to external payment (Play Store policy)
9. **Subscription managed through Google Play Subscriptions** - Users cannot cancel/modify directly in app (Google requirement)
10. **Trial cannot be restarted** - Once trial ends or subscription cancels, cannot get new trial on same Google account
11. **Biometric authentication optional** - Users can enable/disable Fingerprint/Face Unlock in app settings
12. **Deep linking required for email verification** - Email links must open Android app directly if installed
13. **Server-side subscription validation** - Backend validates Google Play purchase tokens on every app launch
14. **Subscription status sync: Real-time** - Changes in Google Play subscription status sync via Real-time Developer Notifications (RTDN)
15. **Family Administrator role automatic** - First registered user automatically becomes Family Administrator

**See also:** Google Play Billing Documentation: https://developer.android.com/google/play/billing

---

## 📅 Estimated Timeline

**IMPORTANT:** Timeline below assumes Android app already exists. Add 12-16 weeks for Android app development if starting from scratch.

**Phases:**

1. **Investigation & Solution Design:** 2 weeks
   - Google Play Billing integration research
   - Sign in with Google setup
   - Deep linking architecture design
   - Unified Subscription Service extension design
   - Android app flow wireframes

2. **Backend Development:** 2 weeks
   - Unified Subscription Service extension (reuse iOS architecture)
   - Google Play purchase token validation endpoint
   - Subscription status management (extend existing)
   - Real-time Developer Notifications webhook
   - Auth Service Google OAuth integration

3. **Android App Development:** 4 weeks
   - Sign in with Google integration
   - Google Play Billing Library implementation
   - Biometric authentication (BiometricPrompt)
   - Deep linking (Android App Links)
   - Subscription management UI
   - Trial status indicators
   - Error handling & retry logic

4. **Testing & QA:** 2 weeks
   - Unit tests (backend & Android)
   - Integration tests (Billing flow)
   - E2E tests (full registration)
   - Google Play Sandbox testing
   - Deep linking validation
   - Biometric authentication testing
   - Trial period edge cases
   - Device fragmentation testing (top 10 devices)

5. **Play Store Submission & Review:** 1-2 weeks
   - Google Play Console configuration
   - Billing products setup
   - App submission (Internal → Closed → Open testing)
   - Google review process
   - Addressing review feedback (if any)

6. **Release & Knowledge Transfer:** 1 week
   - Production release (staged rollout recommended)
   - Monitoring setup
   - Documentation
   - Team training
   - Support handoff

**Total Estimated Duration (assuming app exists):** 12-13 weeks

**Total Estimated Duration (from scratch):** 24-29 weeks (includes 12-16 weeks for Android app development)

**Target Release:** Q2 2026 (if Android app development starts in Q1 2026)

---

## 📝 Notes

**Open Questions:**
- [ ] What is the exact subscription pricing (monthly/annual) after Google commission calculation?
- [ ] Should we support Google Play Family Library for subscriptions (one subscription shared across Google Family)?
- [ ] What happens if user cancels subscription during trial - immediate access revocation or continues until trial end?
- [ ] How to handle users who switch from Android to iOS - subscription transfer process?
- [ ] Should we offer introductory pricing (e.g., first month discounted) through Google Play Billing?
- [ ] What Play Store categories/keywords should we target for discoverability?
- [ ] Do we need Android Privacy Sandbox for analytics tracking?
- [ ] Timeline for Android app development from scratch? (12-16 weeks estimate)

**Technical Notes:**
- **Google Play Billing Version:** Use Google Play Billing Library 5.0+ (Kotlin coroutines)
- **Purchase Token Validation:** Server-to-server validation using Google Play Developer API v3
- **Deep Linking:** Android App Links (requires assetlinks.json file on web server)
- **Biometric Authentication:** BiometricPrompt API with fallback to device PIN/pattern
- **OAuth Integration:** Sign in with Google using Google Sign-In for Android
- **Subscription Products:** Configure in Google Play Console:
  - `com.familygovernance.subscription.monthly` - $49.99/month (example)
  - `com.familygovernance.subscription.annual` - $499.99/year (example)
- **Real-time Developer Notifications:** Webhook endpoint for subscription status changes

**Google Play Console Checklist:**
- [ ] Developer account with Billing capabilities
- [ ] Google Play Console subscription products created
- [ ] Sign in with Google OAuth 2.0 credentials configured
- [ ] Privacy policy URL added to Play Store listing
- [ ] Terms of service URL added
- [ ] Subscription cancellation instructions in app description
- [ ] App screenshots with subscription flow
- [ ] Content rating questionnaire completed
- [ ] Data safety form submitted

**Monitoring & Analytics:**
- Track Play Billing conversion rate (Sign in → Subscription complete)
- Monitor trial-to-paid conversion rate
- Track subscription cancellation reasons (Play Console analytics)
- Deep link success rate
- Biometric authentication adoption rate
- Google Play purchase token validation failures
- Device-specific issues (fragmentation tracking)

**Android App Development Estimate (if from scratch):**
- **Architecture setup:** 2 weeks (MVVM, Jetpack Compose, Hilt DI)
- **Core features:** 6 weeks (Navigation, Authentication, API integration)
- **UI implementation:** 4 weeks (Material Design 3, responsive layouts)
- **Testing:** 2 weeks (Unit, Integration, UI tests)
- **Total:** 12-16 weeks

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-23
**Created By:** Product Management Team
**Next Review:** After Android app development initiative approval