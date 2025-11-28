# EPIC-011A: Marketplace Profile Management (Consultant Side)

## 📋 Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** Marketplace Profile & Service Catalog Management for Consultants  
**Summary:** Enable consultants to create, publish, and manage their marketplace profiles and service catalogs  
**Parent User Journey:** JRN-ADV-001 - Consultant Registration & Onboarding (related), JRN-FAM-002 - Family Marketplace Service Booking  
**Priority:** Critical  
**Epic Link:** FG-EPIC-011A  
**Related Epic:** FG-EPIC-011F (Family marketplace discovery)

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Enable consultants to create comprehensive marketplace profiles, define their service offerings with pricing, and manage their public presence to attract family clients. This Epic delivers the consultant's storefront in the marketplace, ensuring they can effectively showcase their expertise and services.

**User-facing value:**
- Consultants can create detailed professional profiles with credentials and verification
- Consultants can define service catalog with flexible pricing and descriptions
- Consultants can control profile visibility (Draft/Published) and availability status
- Consultants can update profile and services anytime without re-approval (unless major changes)

**Business value:**
- Quality marketplace content increases family confidence and booking rates
- Clear service definitions reduce proposal negotiation time by 40%
- Comprehensive profiles reduce support inquiries about consultant qualifications
- Foundation for consultant reputation and rating system

**Scope boundaries:**
- **Included:** Profile creation, service catalog management, visibility controls, profile editing
- **NOT included:** Initial consultant registration/verification (separate epic), calendar management (EPIC-008), service booking management (EPIC-013A)

---

## 👥 Target Users

**Primary Personas:**
- Consultant (DOC-USR-006) - Marketplace professional creating and managing their storefront

**Secondary Personas:**
- Platform Administrator (review and approval of profiles)

---

## 📖 User Stories (High-Level)

1. **As a** Consultant, **I want to** create a comprehensive marketplace profile with my professional background, credentials, and expertise areas, **so that** families can evaluate if I'm suitable for their needs

2. **As a** Consultant, **I want to** define a catalog of services with descriptions, pricing, deliverables, and terms, **so that** families understand exactly what I offer and at what cost

3. **As a** Consultant, **I want to** control my profile visibility (Draft/Published) and availability status, **so that** I can prepare my profile privately before going live and manage my workload

4. **As a** Consultant, **I want to** edit my profile and services at any time, **so that** I can keep my marketplace presence current with my evolving practice

5. **As a** Consultant, **I want to** add verification badges (credentials, certifications) to my profile, **so that** families can trust my qualifications

6. **As a** Consultant, **I want to** preview how my profile appears to families, **so that** I can ensure it presents me professionally before publishing

---

## 🔗 Dependencies

**Upstream Dependencies:**
- Consultant Registration & Verification (basic account created and verified)
- Stripe Connect Onboarding (EPIC-007) - Required before publishing profile
- Document upload system - For credentials and certifications

**Downstream Impact:**
- EPIC-011F: Family Marketplace Discovery (families discover published profiles)
- EPIC-013A: Service Request Lifecycle (service catalog defines bookable services)
- EPIC-008: Consultant Calendar (availability status impacts profile visibility)

**Technical Dependencies:**
- Profile data storage system
- Image upload and optimization (profile photos, credentials)
- Rich text editor for service descriptions
- Profile approval workflow system

---

## 📐 Design & UX

**Figma Links:**
- [To be created] Profile Creation Wizard
- [To be created] Service Catalog Management
- [To be created] Profile Preview Mode
- [To be created] Visibility & Status Controls

**UX Notes:**

**User Flow - Profile Creation:**
1. Consultant completes registration and verification (prerequisite)
2. System prompts to "Complete Your Marketplace Profile"
3. Profile Creation Wizard (multi-step):
   - **Step 1: Basic Info** - Professional headline, bio, photo
   - **Step 2: Expertise** - Select modules/areas of expertise (checkboxes)
   - **Step 3: Credentials** - Add certifications, education, professional memberships
   - **Step 4: Service Catalog** - Add services (can skip and add later)
   - **Step 5: Review & Publish** - Preview and set visibility
4. Save as Draft or Publish immediately
5. If published, profile appears in marketplace within 5 minutes

**User Flow - Service Catalog Management:**
1. Navigate to "My Services" from Consultant Portal
2. View list of existing services (status: Active, Inactive, Draft)
3. Click "Add New Service" to create:
   - Service name and description (rich text)
   - Module/expertise tags
   - Service type (Workshop, Consultation, Mediation, etc.)
   - Pricing model: Fixed price, Hourly rate, or Custom quote
   - Deliverables (bullet points)
   - Estimated duration
   - Cancellation policy
   - Required family data access (which modules)
   - Prepayment percentage (0-100%)
4. Save as Draft or Activate
5. Can edit or deactivate services anytime

**Key UI Elements:**
- **Profile Builder:** Step-by-step wizard with progress indicator
- **Rich Text Editor:** For bio and service descriptions (formatting, bullet points, links)
- **Image Upload:** Drag-and-drop for profile photo and credential documents
- **Service Cards:** Visual representation of each service in catalog
- **Preview Mode:** Shows exactly how profile appears to families
- **Status Indicators:** Clear badges for Draft/Published/On Leave
- **Quick Actions:** Edit, Duplicate, Deactivate for services

---

## 📢 Notifications (if applicable)

**Does this Epic involve user notifications?** Yes

| Trigger | Recipient | Format | Description |
|---------|-----------|--------|-------------|
| Profile submitted for review | Consultant | Email + In-App | "Your marketplace profile has been submitted and is under review" |
| Profile approved | Consultant | Email + In-App | "Your profile is now live in the marketplace! [View Profile]" |
| Profile rejected | Consultant | Email + In-App | "Your profile requires changes before approval. [View Feedback]" |
| Service activated | Consultant | In-App | "Service '[Service Name]' is now live and bookable" |
| Profile incomplete reminder | Consultant | Email | Sent 3 days after registration if profile not completed |
| First booking received | Consultant | Email + In-App | "Congratulations! You received your first booking from [Family Name]" |

**Notification Configuration Notes:**
- Default: All notifications enabled
- Critical notifications (approval/rejection) cannot be disabled
- Reminders can be snoozed or disabled
- Localization: English only initially

---

## 🧮 Business Rules

**Profile Creation & Publishing:**
1. Consultant must complete Stripe Connect onboarding before publishing profile
2. Profile must be 60% complete minimum to publish (required fields: photo, headline, bio, at least 1 service)
3. Published profiles appear in marketplace within 5 minutes
4. Profile changes require re-approval only if: Major credential changes, service type changes, or pricing increases >50%
5. Minor edits (bio updates, service description tweaks) go live immediately

**Service Catalog:**
1. Each consultant can have up to 20 active services
2. Services can be in states: Draft, Active, Inactive, Archived
3. Only Active services appear in marketplace and can be booked
4. Inactivating service doesn't cancel existing bookings
5. Service pricing must be in USD (single currency for MVP)
6. Minimum service price: $50 (prevents low-quality listings)
7. Maximum service price: $50,000 (requires custom quote for higher)
8. Prepayment percentage: 0-100%, set per service
9. Cancellation policy options: 24h, 48h, 7 days, 14 days, or "No refunds"

**Verification & Badges:**
1. Basic verification (email + phone) required for all consultants
2. Identity verification (passport/ID) grants "Identity Verified" badge
3. Professional credentials (uploaded documents) grant "Credentialed" badge
4. Platform admin manually reviews and approves credential documents
5. False credentials result in immediate profile suspension

**Visibility Controls:**
1. Profile status options: Draft, Published, On Leave, Suspended
2. "On Leave" maintains profile visibility but prevents new bookings
3. "Suspended" (admin action) makes profile invisible and stops all activity
4. Consultants can toggle between Published and On Leave anytime
5. Families with active bookings can still access consultant's profile even if On Leave

**Profile Quality Standards:**
1. Profile photo must be professional headshot (minimum 400x400px)
2. Bio minimum 100 characters, maximum 2000 characters
3. Service descriptions minimum 50 characters per service
4. At least 3 expertise areas selected
5. Platform reserves right to request profile improvements before approval

---

## 📝 Notes

**Future Enhancements (not in scope):**
- Video introduction on profile (30-second pitch)
- Portfolio section with case studies (anonymized)
- Testimonials from families (rating/review system)
- Integration with LinkedIn for credential import
- Multi-language profiles for international consultants
- Team/firm profiles (multiple consultants under one entity)

**Open Questions:**
- Should consultants be able to offer package deals (bundle multiple services)?
- Should there be featured/promoted profile slots (paid advertising)?
- Should consultants see analytics on profile views and click-through rates?
- Should we limit how often consultants can edit pricing?

**Assumptions:**
- Consultants are comfortable creating profiles without live support
- Rich text editor sufficient for service descriptions (no HTML/CSS needed)
- Single consultant per profile (no team/firm profiles in MVP)
- USD pricing acceptable for all markets (no multi-currency in MVP)

**Profile Approval SLA:**
- Initial profile review: Within 48 business hours
- Credential verification: Within 5 business days
- Profile edits (minor): No review required
- Profile edits (major): Within 24 business hours

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-24  
**Epic Status:** Draft  
**Story Points Estimate:** TBD (during grooming)
