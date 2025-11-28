## 📋 Basic Information

**Issue Type:** Epic  
**Project:** SAAS  
**Epic Name:** Onboarding Flow v2.0 - Registration Restructure & Enhanced Setup Wizard  
**Summary:** Restructure registration flow by moving educational carousel to login screen, adding 3-step sign-up wizard with payment setup, and rebuilding onboarding with new user profile and family invitation steps  
**Parent Initiative:** SAAS-XXX [Link to Family Governance Platform Proposal]  
**Parent Epic:** SAAS-EPIC-001 (Registration Flow with Educational Carousel & Constitution Setup)  
**Priority:** Critical  
**Epic Link:** SAAS-EPIC-002-V2

---

## 🎯 Epic Goal

**What will this Epic deliver?**

A completely restructured registration and onboarding experience that:
1. Moves educational carousel from onboarding to login/registration screen
2. Adds comprehensive 3-step sign-up wizard (Personal Info → Account Setup → Family Details)
3. Introduces payment method setup during registration
4. Rebuilds onboarding wizard with new Step 1 (User Profile) and Step 2 (Family Invitations)
5. Updates Constitution Setup flow with clearer workshop selection and AI timing
6. Adds expanded dashboard progress banner showing all 8 onboarding steps

**User-Facing Value:**
- Educational content visible BEFORE registration commitment
- Smoother sign-up flow with clear progress (3 steps)
- Immediate payment setup reduces friction later
- Complete user profile creation before family setup
- Visual family invitation system with QR codes
- Clear workshop selection interface showing all 4 workshops upfront
- Dashboard banner with expandable step-by-step progress tracking

**Business Value:**
- Higher conversion rates with pre-registration education
- Reduced payment setup abandonment
- Better user profile completion rates
- Increased family invitation success
- Clearer workshop value proposition
- Improved onboarding completion tracking

**Scope Boundaries:**
- ✅ **Included:** Registration carousel repositioning, 3-step sign-up wizard, payment setup (Stripe), user profile creation, family invitation system with QR codes, workshop selection redesign, dashboard progress banner expansion, AI timing update (30 min)
- ❌ **NOT Included:** Actual workshop functionality, AI workshop implementation, multi-language support, advanced profile customization, family tree visualization

---

## 💥 Target Users

**Who will use this feature?**

- **Primary Personas:** Family Administrator (DOC-USR-002), New Users (First-time registration)
- **Secondary Personas:** Family Council Member (DOC-USR-002), Family Member (DOC-USR-001)

---

## 📖 User Stories (High-Level)

**Main scenarios this Epic will enable:**

1. **As a** new visitor, **I want to** see family governance education on the login screen, **so that** I understand the value before committing to registration

2. **As a** new user, **I want to** complete registration in clear steps (Personal Info → Account → Family), **so that** I don't feel overwhelmed

3. **As a** new user, **I want to** set up payment during registration, **so that** I don't have friction later when accessing features

4. **As a** Family Administrator, **I want to** create my complete user profile first (Step 1), **so that** I can present myself properly to family members

5. **As a** Family Administrator, **I want to** invite family members via email or QR code (Step 2), **so that** they can easily join the platform

6. **As a** Family Administrator, **I want to** see all 4 workshop options upfront with timing and completion status, **so that** I can make informed decisions about our governance path

7. **As a** Family Member, **I want to** see expanded progress on dashboard banner, **so that** I know exactly where we are in the onboarding process

8. **As a** any user, **I want to** understand AI-generated constitution takes 30 minutes, **so that** I have realistic expectations

---

## 🎨 Design & UX

**Figma Links:**
- Registration Flow v2 with Carousel - [https://www.figma.com/design/NWeSLJWw6iPinNILwPbsfv/-ReFamily--Web-Platofrm?node-id=4098-6568&t=52joNmqQcFNDQqAn-4]
- Onboarding Steps 01-02 (New) - [Same link, Step 01-02 screens]
- Constitution Setup v2 - [Same link, Step 03-04 Alternative screens]
- Dashboard Progress Banner - [Same link, Onboarding banner expanded]

**UX Notes:**

### Registration Flow Changes:
- **Split-screen layout:** Left = Login/Sign-up form, Right = Educational carousel (5 cards)
- **Carousel behavior:** Auto-play, navigation dots, arrow controls, same content as v1
- **Sign-up wizard:** 3 progressive steps with back/continue navigation
  - Step 1: Personal Info (First Name, Last Name, Birthdate)
  - Step 2: Account Setup (Email, Password with requirements validation)
  - Step 3: Family Details (Family Name, Role selection checkboxes)
- **Email verification:** Separate screen after sign-up
- **Payment setup:** Stripe integration screen before accessing platform
- **OAuth:** Still available (Google, Apple, LinkedIn)

### Onboarding Wizard Changes:
- **Step 01 (NEW):** Create User Profile
  - Avatar upload with placeholder initials
  - Bio text area (multiline)
  - Contact info (Email pre-filled, Phone number)
  - Progress: 13% (1/8 steps)
  
- **Step 02 (NEW):** Invite Family Members
  - Invite link with QR code
  - Email invitation input with "Add user" button
  - Family Consul designation (checkbox + note)
  - Members list showing invited emails with role badges
  - "Send invites" button
  - Progress: 13% (still 1/8, as Step 2 is part of profile setup phase)

- **Step 03 (UPDATED):** Constitution Setup
  - Renamed from "Constitution Wizard" to "Constitution Setup"
  - Educational content: "Why Constitution matters?" section
  - Three clear method cards:
    - **AI Generated:** 30 min (updated from 16 min), robot icon
    - **Workshops:** 60-180 min, advisor icon  
    - **Manual:** Pen icon, complete at own pace
  - Each method has "Continue", "Restart", "Start with Advisor", "Start with AI" buttons

- **Step 04 (UPDATED):** Workshop Selection
  - Shows ALL 4 workshops simultaneously in card grid:
    - **Assessment:** 72% progress badge, 60 min
    - **Values, Mission & Vision:** 55% progress badge, 120 min
    - **Decision-Making & Conflict Management:** 180 min
    - **Succession & Development:** 180 min
  - Each card has dual action buttons:
    - "Continue" / "Start with Advisor"
    - "Restart" / "Start with AI"
  - Alternative flow: Large survey screen "AI Generated"
  - Alternative flow: Redirect to Constitution for manual edit

- **Step 08 (UPDATED):** Constitution finalization & Launch
  - "Congratulations!" message with celebration icon
  - "What's Next?" section with 3 clear steps
  - List of available platform features
  - "Go to dashboard" CTA button

### Dashboard Integration:
- **Banner (collapsed):** Shows progress ring, CTA, step count "3/8 steps"
- **Banner (expanded - NEW):** 
  - Shows all 8 step cards in grid layout
  - Each card shows: Icon, Title, Status (checkmark/lock)
  - Steps: User profile → Invite Family Members → Why Constitution matters → Assessment → Values/Mission/Vision → Decision Making & Conflicts → Succession & Development → Constitution finalization
  - "Continue" button and collapse toggle

**Responsive behavior:** 
- Desktop: Split-screen for registration, modal wizard for onboarding
- Mobile: Stacked layout for registration, full-screen wizard

---

## 🧮 Business Rules & Calculations

**Key Business Rules:**

### Registration Flow Rules:

1. **Carousel Display Rules:**
   - Shows on both Login and Sign-up screens
   - 5 educational cards (same content as v1)
   - Auto-play enabled by default
   - Navigation: dots, left/right arrows, pause button

2. **Sign-up Validation Rules:**
   - Step 1: All fields required (First Name, Last Name, Birthdate)
   - Step 2: Email format validation, Password requirements (8+ chars, 1 uppercase, 1 letter, 1 number)
   - Step 3: Family Name required, At least 1 role checkbox must be selected
   - Can navigate back without losing data

3. **Email Verification Rules:**
   - Verification email sent after Step 3 completion
   - User cannot proceed without email confirmation
   - Resend option available

4. **Payment Setup Rules:**
   - Required before platform access
   - Stripe integration for secure payment
   - "Skip" option available (Admin only), adds payment requirement badge

### Onboarding Wizard Rules:

5. **Step 1 - User Profile Rules:**
   - Avatar: Optional, accepts JPG/PNG up to 5MB, generates initials placeholder
   - Bio: Optional, 500 characters max
   - Email: Pre-filled from registration, read-only
   - Phone: Optional, format validation

6. **Step 2 - Family Invitation Rules:**
   - Invite link: Generated per family (family_id), includes QR code
   - QR code: Dynamic, updates when link regenerates
   - Family Consul: Checkbox designation, note "The consul must be invited to the system"
   - Members: Email validation, duplicate check, role badge assignment (Consul/Member)
   - Minimum: No minimum to proceed (changed from v1 "minimum 2 members")
   - Send invites: Triggers email to all listed addresses

7. **Step 3 - Constitution Setup Rules:**
   - **AI Generated timing:** Updated to 30 minutes (was 16 min in v1)
   - Method selection stored per family (family_id)
   - Authorization: Only Admin/Council can select (same as v1)
   - Family Members: Read-only view of selected method

8. **Step 4 - Workshop Selection Rules:**
   - **NEW:** Shows all 4 workshops simultaneously (not step-by-step)
   - Progress badges: Show completion % if workshop started
   - Each workshop independently selectable
   - Can choose different methods per workshop (Advisor/AI)
   - "Restart" resets workshop progress to 0%
   - Authorization: Only Admin/Council can initiate workshops

9. **Progress Calculation (Updated):**
   ```python
   # Step weighting changed
   step_weights = {
       1: 13,  # User Profile (new)
       2: 13,  # Invite Family (new, but doesn't increment %)
       3: 13,  # Constitution Setup
       4: 13,  # Workshop selection
       5: 13,  # Assessment workshop
       6: 13,  # Values/Mission/Vision workshop
       7: 13,  # Decision Making workshop
       8: 22   # Succession & Finalization
   }
   
   progress_percentage = sum(step_weights[s] for s in completed_steps)
   ```

10. **Dashboard Banner Rules:**
    - Shows on all main platform pages
    - Collapsed state: Progress ring + step count
    - Expanded state: All 8 step cards visible
    - Persist expansion state per user session
    - Hide option available: Sets `banner_hidden = TRUE`

11. **Tour Skip/Resume Rules (Same as v1):**
    - Skip: Saves progress, sets `tour_skipped = TRUE`
    - Resume: Opens at `last_viewed_step`
    - Skipped tour doesn't block platform access

---

## 🔄 Changes from EPIC-001 (v1)

**What's being removed/changed:**

### Removed:
- ❌ Carousel from post-registration onboarding
- ❌ Constitution wizard as Step 1
- ❌ Step-by-step workshop flow (4-7 were separate)
- ❌ 2-member minimum enforcement for onboarding start

### Changed:
- 🔄 Carousel moved to Login/Sign-up screen (left-right split)
- 🔄 Sign-up now 3-step wizard (was single form)
- 🔄 Payment setup moved to registration flow
- 🔄 Onboarding starts with User Profile (new Step 1)
- 🔄 Family invitations now Step 2 (was part of prerequisites)
- 🔄 Constitution Setup now Step 3 (was Step 1)
- 🔄 Workshop selection shows all 4 workshops at once (Step 4)
- 🔄 AI Generated timing: 30 min (was 16 min)
- 🔄 Dashboard banner expandable with all step cards

### Added:
- ✅ Step 01: User Profile creation
- ✅ Step 02: Family invitation with QR codes
- ✅ Payment setup during registration
- ✅ Email verification screen
- ✅ Password reset flow (3 steps)
- ✅ Workshop progress badges (%)
- ✅ Expanded dashboard banner with step cards
- ✅ "Hide setup guide" option

---

## 📊 Technical Architecture Changes

**New Components:**

1. **Registration Service Updates:**
   - `POST /auth/signup/step-1` - Personal info
   - `POST /auth/signup/step-2` - Account setup
   - `POST /auth/signup/step-3` - Family details
   - `GET /auth/verify-email/:token` - Email verification
   - `POST /auth/reset-password/request` - Password reset

2. **Payment Service Integration:**
   - `POST /payment/setup` - Stripe payment method setup
   - `GET /payment/status/:user_id` - Payment verification

3. **Onboarding Service Updates:**
   - `POST /onboarding/profile` - User profile (Step 1)
   - `PUT /onboarding/profile/:user_id` - Update profile
   - `POST /onboarding/invitations` - Send family invitations (Step 2)
   - `GET /onboarding/invitation/qr/:family_id` - Generate QR code
   - `PUT /onboarding/constitution/method` - Update AI timing (30 min)
   - `GET /onboarding/workshops/status/:family_id` - Get all workshop progress

4. **Dashboard Service Updates:**
   - `GET /dashboard/onboarding-progress/:user_id` - Get expanded step data
   - `PUT /dashboard/banner-state/:user_id` - Save expanded/collapsed state

**Data Model Changes:**

```typescript
// User Profile (new)
interface UserProfile {
  user_id: string;
  avatar_url?: string;
  bio?: string;
  phone_number?: string;
  created_at: timestamp;
  updated_at: timestamp;
}

// Family Invitation (enhanced)
interface FamilyInvitation {
  invitation_id: string;
  family_id: string;
  email: string;
  role: 'consul' | 'member';
  invited_by: string;
  invite_link: string;
  qr_code_url: string;
  status: 'pending' | 'accepted' | 'expired';
  sent_at: timestamp;
  expires_at: timestamp;
}

// Onboarding Progress (updated)
interface OnboardingProgress {
  user_id: string;
  family_id: string;
  current_step: number; // 1-8
  steps_completed: number[];
  step_1_profile_complete: boolean; // NEW
  step_2_invitations_sent: boolean; // NEW
  step_3_method_selected: string; // 'ai' | 'workshops' | 'manual'
  step_4_workshops_selected: string[]; // ['assessment', 'values', ...]
  workshop_progress: {
    assessment: number; // 0-100%
    values_mission_vision: number;
    decision_making: number;
    succession: number;
  };
  banner_expanded: boolean; // NEW
  banner_hidden: boolean; // NEW
  tour_skipped: boolean;
  last_viewed_step: number;
  updated_at: timestamp;
}

// Payment Setup (new)
interface PaymentSetup {
  user_id: string;
  stripe_customer_id: string;
  payment_method_id?: string;
  setup_complete: boolean;
  setup_skipped: boolean;
  created_at: timestamp;
}
```

**API Endpoints Summary:**

```
# Registration Flow (NEW/UPDATED)
POST   /auth/signup/step-1
POST   /auth/signup/step-2
POST   /auth/signup/step-3
GET    /auth/verify-email/:token
POST   /auth/reset-password/request
POST   /auth/reset-password/confirm

# Payment Setup (NEW)
POST   /payment/setup
GET    /payment/status/:user_id

# Onboarding Step 1 (NEW)
POST   /onboarding/profile
PUT    /onboarding/profile/:user_id
GET    /onboarding/profile/:user_id

# Onboarding Step 2 (NEW)
POST   /onboarding/invitations
GET    /onboarding/invitation/qr/:family_id
GET    /onboarding/invitations/:family_id

# Onboarding Step 3 (UPDATED)
PUT    /onboarding/constitution/method
GET    /onboarding/constitution/ai-estimate  # Returns 30 min

# Onboarding Step 4 (UPDATED)
GET    /onboarding/workshops/all/:family_id
PUT    /onboarding/workshops/progress

# Dashboard (UPDATED)
GET    /dashboard/onboarding-progress/:user_id
PUT    /dashboard/banner-state/:user_id
```

---

## 🧪 Testing Strategy

**Testing Focus Areas:**

### Registration Flow Testing:
1. **Carousel Testing:**
   - Auto-play functionality
   - Navigation controls (dots, arrows, pause)
   - Responsive behavior on mobile
   - Card content rendering

2. **Sign-up Wizard Testing:**
   - Step navigation (forward/back)
   - Form validation at each step
   - Data persistence between steps
   - OAuth integration (Google, Apple, LinkedIn)
   - Email verification flow
   - Password reset flow (3 steps)

3. **Payment Setup Testing:**
   - Stripe integration
   - Payment method validation
   - Skip option (Admin only)
   - Error handling

### Onboarding Testing:
4. **Step 1 - User Profile:**
   - Avatar upload (size limits, formats)
   - Bio character counter
   - Phone number format validation
   - Save/edit functionality

5. **Step 2 - Family Invitations:**
   - QR code generation
   - Invite link functionality
   - Email validation and duplicate prevention
   - Consul designation
   - Bulk invite sending

6. **Step 3 - Constitution Setup:**
   - AI timing display (30 min)
   - Method selection authorization
   - Read-only view for Family Members

7. **Step 4 - Workshop Selection:**
   - All 4 workshops displayed
   - Progress badge accuracy
   - Multiple method selection (Advisor/AI per workshop)
   - Restart functionality

8. **Dashboard Banner:**
   - Expand/collapse state persistence
   - All 8 step cards rendering
   - Progress calculation accuracy
   - Hide option functionality

### Integration Testing:
- Registration → Email Verification → Payment → Onboarding flow
- Role-based access control across all steps
- Cross-browser compatibility
- Mobile responsiveness

---

## 📅 Estimated Timeline

**Phases:**

1. **Investigation & Solution Design:** 1.5 weeks
   - Design review and component mapping
   - API contract definition
   - Data model updates

2. **Development:** 12 weeks
   - **Phase 1:** Registration Restructure (3 weeks)
     - Carousel repositioning
     - 3-step sign-up wizard
     - Email verification
     - Password reset flow
   
   - **Phase 2:** Payment Integration (1.5 weeks)
     - Stripe setup screen
     - Payment validation
     - Skip functionality
   
   - **Phase 3:** Onboarding Steps 1-2 (2.5 weeks)
     - User profile creation UI/backend
     - Family invitation system
     - QR code generation
   
   - **Phase 4:** Constitution & Workshop Updates (2 weeks)
     - Constitution Setup redesign
     - Workshop selection grid view
     - Progress badges
     - AI timing update
   
   - **Phase 5:** Dashboard Integration (1.5 weeks)
     - Expandable banner
     - Step cards rendering
     - State persistence
   
   - **Phase 6:** Testing & Polish (1.5 weeks)
     - Integration testing
     - Bug fixes
     - Performance optimization

3. **Testing:** 2 weeks (concurrent with Phase 6)

4. **Release & Knowledge Transfer:** 1 week

**Total Duration:** 14.5 weeks

**Target Release:** Q2 2026 (End of Sprint 15)

---

## 🎯 Success Metrics

**Registration Metrics:**
- Registration completion rate: Target 85% (from carousel view to verified account)
- Payment setup completion: Target 90% (or valid skip)
- Time to complete registration: Target < 5 minutes

**Onboarding Metrics:**
- Step 1 (Profile) completion: Target 95%
- Step 2 (Invitations) completion: Target 80% (at least 1 invite sent)
- Workshop selection engagement: Target 70% (view all 4 workshops)
- Full onboarding completion: Target 65% (all 8 steps)

**User Engagement:**
- Dashboard banner expansion rate: Target 60% of users expand at least once
- QR code invitation usage: Target 30% of invitations via QR

---

## ⚠️ Risks & Mitigation

**Technical Risks:**

1. **Risk:** Stripe payment integration complexity
   - **Mitigation:** Use Stripe's pre-built UI components, implement skip option

2. **Risk:** QR code generation performance
   - **Mitigation:** Cache QR codes, regenerate only on invite link change

3. **Risk:** Carousel repositioning breaks existing flows
   - **Mitigation:** Feature flag for gradual rollout, A/B testing

**UX Risks:**

4. **Risk:** 3-step sign-up may increase abandonment
   - **Mitigation:** Allow back navigation, save progress at each step

5. **Risk:** Users confused by new onboarding structure
   - **Mitigation:** Clear progress indicators, "Hide guide" option, in-app help

---

## 📦 Dependencies

**Internal:**
- SAAS-EPIC-001 (v1) must be partially reverted
- Authentication Service update
- Payment Service (Stripe) integration
- Email Service for verification

**External:**
- Stripe SDK v3.x
- QR code generation library
- Email delivery service (SendGrid/AWS SES)

---

## 📝 Definition of Done

- [ ] All registration flow screens implemented with carousel
- [ ] 3-step sign-up wizard functional with validation
- [ ] Email verification working
- [ ] Password reset flow complete (3 steps)
- [ ] Stripe payment setup integrated
- [ ] Step 1 (User Profile) functional
- [ ] Step 2 (Family Invitations) with QR codes working
- [ ] Step 3 (Constitution Setup) shows 30 min for AI
- [ ] Step 4 (Workshop Selection) shows all 4 workshops
- [ ] Dashboard banner expandable with all 8 step cards
- [ ] All API endpoints documented and tested
- [ ] Mobile responsive on all screens
- [ ] Cross-browser testing passed
- [ ] Security audit completed
- [ ] Performance benchmarks met
- [ ] User acceptance testing completed
- [ ] Documentation updated

---

**Template Version:** 1.0.0  
**Epic Version:** 2.0.0  
**Last Updated:** 2025-10-30  
**Created:** 2025-10-30  
**Author:** Product Team  
**Reviewer:** Engineering Lead, UX Lead