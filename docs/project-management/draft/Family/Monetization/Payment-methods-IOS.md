# Epic Template - Jira FG Project

> **Note:** This is an Epic for iOS Registration & Apple In-App Purchase Integration in Family Governance platform.

---

## 📋 Basic Information

**Issue Type:** Epic
**Project:** FG
**Epic Name:** iOS Registration & Apple In-App Purchase Integration
**Summary:** Enable Family Administrators to register via iOS app with Sign in with Apple and subscribe through Apple In-App Purchase with 30-day free trial
**Parent Initiative:** FG-INIT-001 [Multi-Platform Subscription Onboarding Initiative]
**Priority:** High
**Epic Link:** FG-EPIC-001

---

## 🎯 Epic Goal

**What will this Epic deliver?**

This Epic delivers complete registration and subscription onboarding flow for iOS mobile application, enabling Family Administrators to sign up using Sign in with Apple, subscribe through Apple In-App Purchase system, and access the platform with 30-day free trial period.

**User-facing value:**
- One-tap registration with Sign in with Apple (no password creation)
- Native iOS subscription experience through Apple In-App Purchase
- 30-day free trial with automatic conversion to paid subscription
- Secure biometric authentication (Face ID / Touch ID) for app access
- Seamless deep linking from email verification to iOS app
- Monthly or Annual subscription options
- Native iOS design following Apple Human Interface Guidelines

**Business value:**
- Access to iOS user base (primary target audience for wealth management)
- Leverage Apple's trusted payment infrastructure for higher conversion
- Simplified subscription management through Apple's ecosystem
- Reduced payment processing complexity (Apple handles billing)
- Higher user trust through Sign in with Apple
- Improved conversion rates with biometric authentication
- Foundation for iOS-first features (push notifications, widgets)

**Scope boundaries:**
- ✅ **Included:** Sign in with Apple OAuth integration, Apple In-App Purchase subscription setup, 30-day free trial configuration, biometric authentication (Face ID/Touch ID), deep linking implementation, backend Apple receipt validation, unified subscription management across platforms, monthly/annual subscription tiers
- ✅ **Included:** Update iOS app UI for registration flow, subscription management screen, trial status indicators
- ❌ **NOT Included:** Android application development (separate Epic FG-EPIC-002), push notifications implementation, iOS widgets, offline mode, family member invitations via iOS
- ❌ **NOT Included:** Apple App Store submission process (separate task), App Store listing optimization, iOS app marketing materials

---

## 👥 Target Users

**Who will use this feature?**

- **Primary Personas:** Family Administrator (DOC-USR-002) - First user registering family account via iOS device
- **Secondary Personas:** None (other family members will be invited by Administrator after registration)

---

## 📖 User Stories (High-Level)

**Main scenarios this Epic will enable:**

1. **As a** Family Administrator, **I want to** sign in with Apple using my Apple ID, **so that** I can quickly register without creating a new password and leverage my existing Apple identity

2. **As a** Family Administrator, **I want to** subscribe through Apple In-App Purchase with 30-day free trial, **so that** I can try the platform risk-free and manage my subscription through familiar Apple ecosystem

3. **As a** Family Administrator, **I want to** choose between monthly or annual subscription, **so that** I can select the billing cycle that fits my budget and commitment level

4. **As a** Family Administrator, **I want to** use Face ID or Touch ID to authenticate, **so that** I can securely access the app without typing password every time

5. **As a** Family Administrator, **I want to** open email verification links directly in the iOS app, **so that** I have a seamless registration experience without switching between Safari and app

6. **As a** Family Administrator, **I want to** see my trial status and days remaining in the app, **so that** I'm aware of when my paid subscription will begin

7. **As a** Family Administrator, **I want to** manage my subscription (upgrade, cancel, view billing) through Apple Settings, **so that** I can control my subscription using familiar iOS interface

[Detailed User Stories will be created in FG during Grooming]

---

## 🔗 Dependencies & Risks

### Dependencies (Blockers)

**Upstream:**
- **REQUIRED:** Unified Subscription Service backend (must be developed as part of this Epic)
  - Handles Apple IAP receipt validation
  - Syncs subscription status across platforms
  - Manages trial period logic (30 days)
- **REQUIRED:** iOS application exists (already available) ✅
- **REQUIRED:** Auth Service update to support Apple OAuth tokens
- **REQUIRED:** Deep linking configuration (iOS Universal Links setup)

**Downstream:**
- Epic: FG-EPIC-002 - Android Registration (will reuse unified subscription service)
- Epic: FG-EPIC-003 - Desktop Registration Update (will reuse unified subscription service)

**External Dependencies:**
- Apple Developer Account active with In-App Purchase capabilities
- App Store Connect configuration for subscription products
- Apple StoreKit framework integration
- Sign in with Apple service key configuration

### Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Apple App Store review rejection due to IAP implementation issues | **High** - Delays release by 2-4 weeks | Follow Apple IAP guidelines strictly, test thoroughly, prepare fallback plan for resubmission |
| Apple takes 15-30% commission on IAP subscriptions | **High** - Reduced revenue | Factor commission into pricing strategy, offset with higher iOS user LTV |
| Apple receipt validation failures causing subscription sync issues | **Medium** - User access problems | Implement robust retry logic, fallback to manual sync, comprehensive error logging |
| Sign in with Apple user abandonment if Apple ID not configured | **Medium** - Registration dropout | Provide clear onboarding instructions, support alternative OAuth providers for Desktop fallback |
| Deep linking not working on older iOS versions (<13.0) | **Low** - Some users can't use email links | Graceful fallback to manual URL copy, support iOS 14+ only (95% coverage) |
| Biometric authentication not available on older devices | **Low** - Manual password entry | Fallback to traditional login, display clear instructions |
| Trial period tracking discrepancies between Apple and backend | **Medium** - Billing confusion | Server-side source of truth, regular reconciliation, clear trial end notifications |

---

## 🎨 Design & UX

**Figma Links:**
- [iOS Registration Flow - TBD]
- [iOS Subscription Management Screen - TBD]
- [iOS Trial Status Indicators - TBD]

**UX Notes:**
- **Platform compliance:** Strict adherence to Apple Human Interface Guidelines
- **User flows:** 
  - Registration: App Store Download → Launch App → Sign in with Apple → IAP Subscription → Trial Activated → Onboarding
  - Authentication: App Launch → Face ID/Touch ID → Dashboard
  - Email Verification: Receive Email → Tap Link → Deep Link to App → Verification Complete
  - Subscription Management: Settings → Manage Subscription → Apple Settings (external)

**Design Principles:**
- Native iOS components (UIKit / SwiftUI)
- SF Symbols for icons
- iOS system fonts (San Francisco)
- Apple Pay-style subscription sheet
- Standard iOS navigation patterns

**See also:** iOS Human Interface Guidelines for In-App Purchase: https://developer.apple.com/design/human-interface-guidelines/in-app-purchase

---

## 🧮 Business Rules

**Key Business Rules:**

1. **Registration WITHOUT payment method is PROHIBITED** - Users must complete Apple IAP subscription to finish registration
2. **Trial period: 30 days for all users** - Automatically starts upon subscription confirmation
3. **Auto-charge after trial** - No confirmation required, Apple charges automatically at trial end
4. **Unified pricing across platforms** - Same price point for iOS, Android, and Desktop (after Apple/Google commission)
5. **Single subscription per family** - One subscription shared across all family members and devices
6. **OAuth provider: Sign in with Apple REQUIRED for iOS** - Mandatory per Apple App Store guidelines
7. **Subscription tiers: Monthly OR Annual** - Two billing options, annual offers ~15-20% discount
8. **Apple In-App Purchase REQUIRED for iOS subscriptions** - Cannot redirect to external payment (App Store policy)
9. **Subscription managed through Apple Settings** - Users cannot cancel/modify directly in app (Apple requirement)
10. **Trial cannot be restarted** - Once trial ends or subscription cancels, cannot get new trial on same Apple ID
11. **Biometric authentication optional** - Users can enable/disable Face ID/Touch ID in app settings
12. **Deep linking required for email verification** - Email links must open iOS app directly if installed
13. **Server-side subscription validation** - Backend validates Apple receipts on every app launch
14. **Subscription status sync: Real-time** - Changes in Apple subscription status sync immediately to backend
15. **Family Administrator role automatic** - First registered user automatically becomes Family Administrator

**See also:** Apple In-App Purchase Programming Guide: https://developer.apple.com/documentation/storekit/in-app_purchase

---

## 📅 Estimated Timeline

**Phases:**

1. **Investigation & Solution Design:** 2 weeks
   - Apple IAP integration research
   - Sign in with Apple setup
   - Deep linking architecture design
   - Unified Subscription Service design
   - iOS app flow wireframes

2. **Backend Development:** 3 weeks
   - Unified Subscription Service implementation
   - Apple receipt validation endpoint
   - Subscription status management
   - Trial period logic
   - Cross-platform subscription sync
   - Auth Service Apple OAuth integration

3. **iOS App Development:** 4 weeks
   - Sign in with Apple integration
   - StoreKit IAP implementation
   - Biometric authentication
   - Deep linking (Universal Links)
   - Subscription management UI
   - Trial status indicators
   - Error handling & retry logic

4. **Testing & QA:** 2 weeks
   - Unit tests (backend & iOS)
   - Integration tests (IAP flow)
   - E2E tests (full registration)
   - Apple Sandbox testing
   - Deep linking validation
   - Biometric authentication testing
   - Trial period edge cases

5. **App Store Submission & Review:** 1-2 weeks
   - App Store Connect configuration
   - IAP products setup
   - App submission
   - Apple review process
   - Addressing review feedback (if any)

6. **Release & Knowledge Transfer:** 1 week
   - Production release
   - Monitoring setup
   - Documentation
   - Team training
   - Support handoff

**Total Estimated Duration:** 13-14 weeks

**Target Release:** Q1 2026

---

## 📝 Notes

**Open Questions:**
- [ ] What is the exact subscription pricing (monthly/annual) after Apple commission calculation?
- [ ] Should we support Family Sharing for Apple subscriptions (one subscription shared across Apple Family)?
- [ ] What happens if user cancels subscription during trial - immediate access revocation or continues until trial end?
- [ ] How to handle users who switch from iOS to Android - subscription transfer process?
- [ ] Should we offer introductory pricing (e.g., first month discounted) through Apple IAP?
- [ ] What App Store categories/keywords should we target for discoverability?
- [ ] Do we need App Tracking Transparency (ATT) for analytics?

**Technical Notes:**
- **StoreKit Version:** Use StoreKit 2 (async/await) for iOS 15+ (95% coverage)
- **Apple Receipt Validation:** Server-to-server validation using Apple App Store API
- **Deep Linking:** iOS Universal Links (requires apple-app-site-association file on web server)
- **Biometric Authentication:** LocalAuthentication framework with fallback to passcode
- **OAuth Integration:** Sign in with Apple using ASAuthorizationController
- **Subscription Products:** Configure in App Store Connect:
  - `com.familygovernance.subscription.monthly` - $49.99/month (example)
  - `com.familygovernance.subscription.annual` - $499.99/year (example)

**Apple App Store Checklist:**
- [ ] Developer account with In-App Purchase capability
- [ ] App Store Connect subscription products created
- [ ] Sign in with Apple service key configured
- [ ] Privacy policy URL added to App Store listing
- [ ] Terms of service URL added
- [ ] Subscription cancellation instructions in app description
- [ ] App screenshots with subscription flow
- [ ] App Store review notes explaining IAP implementation

**Monitoring & Analytics:**
- Track IAP conversion rate (Sign in → Subscription complete)
- Monitor trial-to-paid conversion rate
- Track subscription cancellation reasons (Apple analytics)
- Deep link success rate
- Biometric authentication adoption rate
- Apple receipt validation failures

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-23
**Created By:** Product Management Team
**Next Review:** After Sprint Planning