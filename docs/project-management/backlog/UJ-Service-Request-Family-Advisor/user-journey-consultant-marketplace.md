---
doc_id: "DOC-JRN-ADV-001"
title: "Independent Advisor Marketplace Onboarding Journey"
type: "user-journey"
category: "planning"
audience: "product-manager|business-analyst|stakeholder"
complexity: "high"
created: "2025-10-16"
updated: "2025-10-16"
version: "2.0.0"
status: "draft"
tags: ["user-journey", "advisor-portal", "marketplace", "registration", "onboarding", "independent-advisor"]
related: ["DOC-JRN-ADV-002", "FG-EPIC-ADV-REG-001", "FG-EPIC-ADV-SERV-001", "FG-EPIC-ADV-KYC-001"]
owner: "Anastasia Bronina"
maintainer: ""
reviewer: ""
priority: "critical"
business_value: "Enable independent advisors to establish marketplace presence, acquire new family clients, and generate platform revenue through subscriptions and transaction fees"
user_impact: "Independent advisors gain access to new client acquisition channel with professional credibility through comprehensive verification and marketplace visibility"
review_cycle: "quarterly"
next_review: "2026-01-16"
---

# JRN-ADV-001 Independent Advisor Marketplace Onboarding Journey

> **Journey Purpose**: Transform independent advisors who discover the platform on their own into active marketplace participants with verified profiles and bookable services. This is the FULL onboarding journey requiring comprehensive profile building, verification, service setup, and marketplace publication.
>
> **Note**: If you were invited by a family with pre-paid access, see [JRN-ADV-002 Family-Invited Advisor Quick Onboarding](user-journey-invited-advisor-quick-onboarding.md) for a simplified registration flow.

---

## 🚨 CRITICAL: Business Requirements Only

**This document describes WHAT the system should do, NOT HOW to implement it.**

**Avoid technical implementation details:**
- ❌ API endpoints, database tables, service names, port numbers
- ❌ Technology specifics (PostgreSQL, Stripe Connect, JWT tokens)
- ❌ Code-level details (classes, functions, middleware)

**Focus on business requirements:**
- ✅ User needs, pain points, and value propositions
- ✅ Business rules and logic (WHAT happens, not HOW)
- ✅ Data visibility and access rules (WHO can see WHAT)
- ✅ Integration needs (WHAT capabilities, not HOW implemented)

---

## 📋 Context

### Goal
Enable external advisors to register, build comprehensive professional profiles, verify credentials, configure services, and publish their offerings to the Family Governance marketplace where families can discover and engage them for various advisory services.

**Business Objectives:**
- Build a qualified, diverse advisor marketplace with 100+ active advisors in Year 1
- Generate marketplace revenue through subscription fees and transaction commissions (15% platform fee target)
- Increase platform stickiness by providing families access to vetted professionals
- Create network effects where advisor presence attracts families and vice versa
- Enable new business model: Advisors can be platform subscribers independent of families

**User Value:**
- **For Advisors**: Access to new client acquisition channel, professional credibility through verification, flexible monetization options, streamlined client management
- **For Families**: Access to vetted professionals across all governance modules, transparent pricing, service quality assurance, integrated booking and communication
- **For Platform**: Ecosystem growth, diversified revenue, competitive differentiation

### Primary Personas

- **External Advisor (Independent Professional)** - Primary journey participant
  - Independent consultants, mediators, family governance specialists
  - Goal: Establish marketplace presence and acquire new family clients
  - Pain points: Client acquisition costs, credibility establishment, fragmented tools
  - Technical comfort: Moderate to high; expects professional UX

- **Family Member (Service Consumer)** - Secondary persona (not in this journey)
  - Searches and books advisor services
  - Needs trust signals: verification badges, ratings, expertise mapping

- **Platform Administrator (Quality Guardian)** - Secondary persona
  - Reviews and approves advisor profiles
  - Monitors marketplace quality and handles disputes
  - Enforces community standards

### Trigger(s)

**Primary Triggers (2 Entry Points):**

**1. New Independent Advisor (Fresh Registration)**
- Advisor learns about platform through marketing, referrals, organic search, or professional networks
- Wants to establish marketplace presence to acquire new family clients
- Seeks to manage existing family clients through centralized platform
- Initiates registration independently without family invitation
- Must complete full onboarding: registration → profile → verification → services → marketplace

**2. Invited Advisor Expanding to Marketplace (Conversion)**
- Advisor already working with one family through invited path
- After 30+ days of engagement, decides to expand services to marketplace
- Wants to acquire additional family clients beyond existing one
- Seeks to monetize expertise through broader visibility
- Skips Stages 1-2 (account already exists), must complete Stages 3-6 (professional profile building), then enters **Stage 7: KYC Verification**

**Discovery Channels:**
- Organic web search for family governance advisory tools
- LinkedIn/professional network outreach and content marketing
- Conference/event presentations and speaking engagements
- Peer referrals from existing marketplace advisors
- Industry publications and thought leadership content
- Professional association partnerships
- **In-platform conversion prompts** (for invited advisors considering marketplace)

**Advisor Motivations:**

**For New Independent Advisors:**
- **Client Acquisition**: Access to families actively seeking advisory services
- **Professional Credibility**: Verification badges and marketplace presence enhance trust
- **Business Growth**: Expand beyond current client base with minimal marketing costs
- **Tool Consolidation**: Centralized platform for client management, scheduling, and billing

**For Converting Invited Advisors:**
- **Expand Client Base**: Move beyond single family to acquire multiple clients
- **Increase Revenue**: Generate additional income from marketplace bookings
- **Proven Platform**: Already experienced platform value with existing family
- **Maintain Current Client**: Keep working with invited family while adding marketplace presence

### Preconditions / Assumptions

**For New Independent Advisors (Entry Point 1):**

**Advisor Qualifications:**
- Advisor has professional experience in family governance, mediation, legal, financial, or related fields
- Advisor has necessary credentials/certifications for their specialty (will be verified during onboarding)
- Advisor is willing to invest time in comprehensive profile building (45-60 minutes)
- Advisor can provide payment method for marketplace subscription fees
- Starting from zero: no existing account, no family associations

**For Converting Invited Advisors (Entry Point 2):**

**Advisor State:**
- Advisor already has active account through invited path
- Minimum 30 days of engagement with inviting family
- Basic profile already exists (name, email, photo, bio)
- Demonstrated activity: tasks completed, meetings attended
- Willing to complete additional profile requirements for marketplace
- Can provide payment method for marketplace subscription upgrade

**System Capabilities (Both Entry Points):**
- Platform supports social login (LinkedIn, Google, Apple) and email registration
- System has secure storage for advisor personal information with encryption
- Advisor portal is accessible for registration and profile management
- Identity verification service is operational for KYC process
- Payment processor is integrated and operational for subscription billing
- Advisor subscription plans are defined with clear pricing tiers
- Profile data can be transferred from invited to marketplace status
- Conversion workflow supports mid-journey entry at Stage 7

**Marketplace Infrastructure:**
- Profile review and approval workflow is operational
- Administrator interface is available for reviewing advisor profiles
- Marketplace search and discovery interface is available for families to find advisors
- Service booking and transaction processing capabilities are functional

## 🗺️ Stage Map

> **Note on Entry Points:**
> - **New Independent Advisors**: Follow all stages 1-11 sequentially
> - **Converting Invited Advisors**: Skip Stages 1-2 (account already exists from the invitation), must complete Stages 3-6 (professional profile building with pre-filled basic data), then proceed to **Stage 7: KYC Verification**

---

### Stage 1: Discovery & Registration Decision
**Goal**: Advisor learns about platform opportunity and decides to register

> **Applies to**: New Independent Advisors only (Converting Invited Advisors skip to Stage 7)

**User Actions:**
- Reviews platform marketing materials, landing pages, or professional network referrals
- Evaluates value proposition: client acquisition, professional credibility, tool consolidation
- Assesses subscription pricing and marketplace opportunity
- Decides to proceed with independent registration

**System Responses:**
- Landing page displays value propositions tailored to independent advisor persona
- Highlights marketplace benefits: client acquisition, verification badges, professional brand
- Registration page offers multiple authentication methods (LinkedIn, Google, Apple, Email)
- Displays subscription plan comparison table with features and pricing

**Validation Rules:**
- N/A - No validation required at this stage

**Responsible Roles:**
- **Advisor**: Reviews information and makes registration decision

---

### Stage 2: Account Creation & Authentication
**Goal**: Create secure account using preferred authentication method

**User Actions:**
- **OAuth Path (LinkedIn/Google/Apple):**
  - Clicks "Sign up with [Provider]" button
  - Authorizes platform to access basic profile information
  - Reviews pre-populated data (name, email, photo, headline)
  - Confirms import or edits fields

- **Email Path:**
  - Enters email address and creates password (minimum security requirements)
  - Submits registration form
  - Checks email for verification link
  - Clicks verification link to activate account

**System Responses:**
- **OAuth Flow:**
  - Redirects to OAuth provider authorization page
  - Receives authorization from provider
  - Retrieves basic profile information
  - Creates advisor account with encrypted personal information
  - Establishes secure session for advisor
  - Proceeds to subscription selection

- **Email Flow:**
  - Validates email uniqueness (prevents duplicate accounts)
  - Creates advisor account in "unverified" status
  - Sends verification email with time-limited token
  - Upon verification: Updates status to "verified" and redirects to subscription selection

- **Subscription Selection:**
  - Presents subscription plan options (tiers, features, pricing)
  - Advisor selects plan and provides payment method
  - Processes payment and activates subscription
  - Redirects to profile builder upon successful payment

**Validation Rules:**
- Email must be unique across all advisors and family users
- Password must meet security requirements
- OAuth tokens must be valid and not expired
- Valid payment method required for subscription activation

**Draft Management:**
- N/A - Account must be completed before saving draft

**Responsible Roles:**
- **Advisor**: Provides authentication credentials

---

### Stage 3: Profile Building - Basic Information
**Goal**: Create foundational professional profile with key information

**User Actions:**
- Uploads professional headshot photo
- Enters/confirms full name and professional title
- Writes professional bio (100-500 characters)
- Adds contact information: phone, location/timezone
- Specifies years of professional experience
- Adds language proficiencies

**System Responses:**
- Displays multi-step profile builder with progress indicator (Step 1 of 4: Basic Information)
- For OAuth users: Pre-populates available fields (name, photo, headline)
- Photo upload: Validates format (JPG/PNG), size (max 5MB), provides crop/resize tool
- Bio editor: Shows character count, provides rich text formatting
- Calculates and displays profile completion percentage
- Validates required fields before allowing progression to next step

**Validation Rules:**
- Profile photo: Required, JPG/PNG format, max 5MB, minimum 200x200px resolution
- Full name: Required, 2-100 characters
- Professional title: Required, 5-100 characters
- Bio: Required, 100-500 characters
- Phone: Optional but recommended, E.164 format validation
- Location: Required, valid city/country
- Years of experience: Required, numeric 0-60

**Draft Management:**
- User can explicitly save draft and return later via "Save & Continue Later" button
- Abandoned drafts trigger follow-up email after 24 hours with resume link

**Responsible Roles:**
- **Advisor**: Provides professional information

---

---

### Stage 4: Profile Building - Experience & Credentials
**Goal**: Establish professional credibility through work history and qualifications

**User Actions:**
- Adds work experience entries (minimum 1 required):
  - Company/organization name
  - Role/title
  - Start and end dates (or "Present")
  - Description of responsibilities and achievements
- Adds education entries (optional):
  - Institution name
  - Degree/certification
  - Field of study
  - Graduation year
- Uploads credential documents (optional):
  - Professional licenses
  - Certifications
  - Awards/recognitions

**System Responses:**
- Displays multi-step profile builder (Step 2 of 4: Experience & Credentials)
- Provides repeatable form sections for multiple experience/education entries
- For LinkedIn OAuth: Attempts to pre-populate work history and education
- Validates date ranges (end date must be after start date)
- Document upload: Validates format (PDF, JPG, PNG), size (max 10MB per file)
- Stores documents with encryption for sensitive credentials
- Updates profile completion percentage

**Validation Rules:**
- At least 1 work experience entry required for profile submission
- Company name: Required, 2-100 characters
- Role: Required, 2-100 characters
- Dates: Valid date format, end date >= start date
- Description: Optional, max 500 characters
- Document uploads: PDF/JPG/PNG only, max 10MB each, max 5 files total

**Draft Management:**
- User can save draft at any point and resume later
- Abandoned drafts trigger follow-up email after 24 hours

**Responsible Roles:**
- **Advisor**: Provides professional background

---

### Stage 5: Expertise Selection & Module Mapping
**Goal**: Define areas of specialization aligned with platform modules

**User Actions:**
- Reviews list of platform modules with descriptions:
  - Family Council Management
  - Constitution & Governance
  - Conflict Resolution & Mediation
  - Decision Making & Voting
  - Education & Development
  - Mentorship Programs
  - Asset & Wealth Management
  - Succession Planning
  - Philanthropy & Legacy
  - Family Management & Communication
- Selects expertise areas (minimum 1, maximum 7)
- Designates up to 3 as "primary expertise"
- For each selected module, rates proficiency level:
  - Beginner (1-3 years experience)
  - Intermediate (3-7 years experience)
  - Expert (7+ years experience)

**System Responses:**
- Displays module selection interface with visual icons and descriptions
- Highlights selected modules and shows remaining selections available
- For primary expertise designation, displays top 3 prominently in profile preview
- Validates selection constraints (1-7 modules, max 3 primary)
- Updates profile completion percentage to 60%+ (minimum for submission)
- Shows profile preview with expertise prominently displayed

**Validation Rules:**
- Minimum 1 module selected (required for submission)
- Maximum 7 modules selected (prevents over-claiming)
- Maximum 3 modules marked as primary expertise
- Proficiency level required for each selected module

**Business Logic:**
- Expertise mapping enables intelligent family-advisor matching
- Primary expertise determines search ranking in marketplace
- Module alignment ensures families find advisors for their specific needs

**Draft Management:**
- User can save draft at any point and resume later
- Progress is automatically saved

**Responsible Roles:**
- **Advisor**: Defines areas of specialization

---

### Stage 6: Profile Review & Draft Management
**Goal**: Review completed profile, decide whether to save draft or proceed to submission

**User Actions:**
- Reviews comprehensive profile preview showing all entered information
- Checks profile completion percentage
- Decides on next action:
  - **Option A**: Save as draft and return later (if completion < 60%)
  - **Option B**: Submit profile for review (if completion >= 60%)
  - **Option C**: Edit specific sections to improve completeness
- For draft saving: Receives confirmation with email reminder setup

**System Responses:**
- Displays full profile preview in read-only format (as families will see it)
- Shows profile completion percentage with breakdown:
  - Profile photo (10%)
  - Full name (10%)
  - Bio (10%)
  - Email verified (10%)
  - At least 1 expertise (10%)
  - At least 1 work experience (10%)
  - Phone number (10%)
  - Location (10%)
  - Professional title (10%)
  - Years of experience (10%)
- If completion < 60%, disables "Submit for Review" button and shows missing requirements
- If completion >= 60%, enables submission with prominent CTA
- For draft saving:
  - Stores draft state with timestamp
  - Sends email reminder after 24 hours if not resumed
  - Sends final reminder at 7 days with expiration warning

**Validation Rules:**
- Submission requires minimum 60% profile completion
- All required fields must be completed
- At least 1 expertise module selected
- At least 1 work experience entry added

**Draft Management:**
- Drafts saved automatically throughout the process
- Email reminders sent after 24 hours and 7 days

**Responsible Roles:**
- **Advisor**: Reviews and decides on next action

---

### Stage 7: Identity & Credential Verification (KYC) - [TBD, Sumsub?]
**Goal**: Verify advisor identity and validate professional credentials to establish trust

> **Entry Point for Converting Invited Advisors:**
> This is where advisors from JRN-ADV-002 (invited path) join the marketplace journey after completing Stages 3-6 (professional profile building).
>
> **For Converting Advisors:**
> - Account already exists (Stages 1-2 skipped)
> - Must complete Stages 3-6: professional profile, experience, expertise, and review (with some pre-filled data from invited path)
> - Family association maintained
> - Additional marketplace subscription required
> - KYC verification is new requirement (not done in invited path)

**User Actions:**
- Receives notification that profile is under review
- Receives automated verification request via email
- Completes identity verification:
  - Uploads government-issued ID (passport, driver's license)
  - Takes selfie for face match verification
  - Provides additional business verification (optional):
    - Business registration documents
    - Professional license numbers
    - Tax identification information
- Submits verification package

**System Responses:**
- Upon profile submission, automatically triggers KYC workflow
- Sends verification request email with secure link to KYC portal
- Integrates with third-party KYC provider (e.g., Stripe Identity, Onfido, Jumio)
- Processes identity verification:
  - Document authenticity check (OCR + database validation)
  - Face match between selfie and ID photo (liveness detection)
  - Background check against sanctions lists (if required by jurisdiction)
- For credential verification:
  - Manual review by platform administrator
  - Cross-reference license numbers with issuing authority databases
  - Validate certifications against issuing organizations
- Updates profile with verification status:
  - **Pending**: Verification in progress (typically 1-3 business days)
  - **Verified**: All checks passed, badge awarded
  - **Failed**: Issues detected, advisor notified with explanation and re-submission option
- Sends notification email with verification result

**Validation Rules:**
- ID document must be unexpired and government-issued
- Face match confidence score must exceed 95%
- Name on ID must match profile name (allows for middle name variations)
- Professional licenses must be active and in good standing
- No matches against fraud or sanctions databases

**Business Logic:**
- Verification is required before marketplace publication
- Verified badge displayed prominently on advisor profiles
- Failed verifications require re-submission with corrected information
- No marketplace access until verification is complete and approved

**Draft Management:**
- N/A - Verification happens after profile submission

**Responsible Roles:**
- **Advisor**: Provides verification documents
- **Platform Administrator**: Reviews credential documents manually

---

### Stage 8: Service Catalog & Pricing Configuration
**Goal**: Define service offerings with clear descriptions, deliverables, and pricing

**User Actions:**
- Creates service offerings (minimum 1 required for marketplace):
  - Service name and short description
  - Detailed service description with deliverables
  - Service type selection:
    - **Comprehensive Management**: Full family governance (retainer-based)
    - **Module Consultation**: Focused on specific governance areas
    - **One-Time Engagement**: Project-based work (constitution drafting, conflict mediation)
    - **Educational Workshop**: Group sessions or training
    - **Mentorship**: Ongoing 1-on-1 guidance
    - **Mediation Session**: Conflict resolution facilitation
  - Pricing model selection:
    - **Hourly Rate**: Per-hour consulting
    - **Fixed Package**: Pre-defined scope and price
    - **Monthly Retainer**: Ongoing monthly fee
    - **Per Session**: For workshops or mediation
  - Sets pricing amount in USD
  - Defines availability and booking parameters:
    - Minimum notice period (e.g., "24 hours", "1 week")
    - Session duration options (e.g., 30 min, 60 min, 90 min)
    - Maximum concurrent clients (capacity management)
  - Adds service to catalog

**System Responses:**
- Provides service creation wizard with step-by-step guidance
- Displays service type selection with examples and use cases
- Shows service preview as it will appear in marketplace
- Allows creation of multiple service offerings
- Tracks service catalog completion (required for marketplace activation)

**Validation Rules:**
- Minimum 1 service required for marketplace publication
- Service name: Required, 5-100 characters
- Short description: Required, 50-200 characters
- Detailed description: Not Required, 200-1,000 characters
- Pricing: Required, 0 or positive number within allowed ranges
- Service type and pricing model: Required selections
- Availability parameters: Required

**Business Logic:**
- Service offerings are independently activatable (can publish some while others remain draft)
- Pricing affects marketplace search ranking (competitive pricing ranks higher)
- Services can be edited after publication

**Draft Management:**
- Services can be saved as drafts and published later
- Draft services are visible only to advisor

**Responsible Roles:**
- **Advisor**: Defines service offerings and pricing

---

### Stage 9: Payment Setup & Monetization Configuration
**Goal**: Configure payment processing to receive earnings from service bookings

**User Actions:**
- Initiates Stripe Connect onboarding
- Completes Stripe account creation or connects existing Stripe account
- Provides required financial information:
  - Bank account details for payouts
  - Tax identification (EIN or SSN for US; equivalent for other countries)
  - Business information (if operating as business entity)
- Configures payout preferences
- Reviews and accepts payment terms and conditions

**System Responses:**
- Redirects to Stripe Connect onboarding flow (embedded or redirect)
- Stripe performs additional verification
- Receives webhook notifications from Stripe on onboarding status
- Updates advisor account with payment capabilities
- Sends confirmation email with payout setup summary

**Validation Rules:**
- All Stripe-required information must be complete

**Business Logic:**
- Payment setup is required before receiving marketplace bookings

**Draft Management:**
- N/A - Payment setup must be completed in one session

**Responsible Roles:**
- **Advisor**: Provides financial information

---

### Stage 10: Moderation & Quality Review
**Goal**: Platform administrators review profile and services for quality and policy compliance

**User Actions (Advisor):**
- Waits for moderation review (receives "Under Review" status notification)
- If revision requested:
  - Reviews administrator feedback
  - Makes requested changes to profile or services
  - Re-submits for review
- If approved:
  - Receives approval notification
  - Profile moves to "Approved" status

**System Responses:**
- Administrator takes action:
  - **Approve**: Profile published to marketplace
  - **Request Revisions**: Sends feedback with specific change requests
  - **Reject**: Denies publication with explanation (rare, typically for policy violations)
- Sends notification email to advisor with review result

**Validation Rules:**
- No offensive, discriminatory, or inappropriate content
- No misleading claims about credentials or experience
- Service descriptions must clearly state deliverables
- Professional photo required (no selfies, casual photos, or stock images)

**Business Logic:**
- Approved profiles published immediately to marketplace
- Quality scores influence search ranking in marketplace

**Draft Management:**
- N/A - Review process has defined workflow

**Responsible Roles:**
- **Platform Administrator**: Performs manual review and decision

---

### Stage 11: Marketplace Publication & Profile Activation
**Goal**: Make advisor profile discoverable to families in the marketplace

**User Actions:**
- Receives approval notification with publication confirmation
- Reviews live marketplace profile
- Configures marketplace visibility settings (optional):
  - Featured modules to highlight in search results
  - Availability status (accepting new clients or at capacity)
  - Booking calendar integration
- Optionally enables promotional features:
  - Introductory discount for first-time clients
  - Featured placement (paid promotion)

**System Responses:**
- Upon approval, automatically publishes profile to marketplace
- Profile becomes searchable by families across the platform
- Generates unique advisor profile URL (e.g., `/marketplace/advisors/{advisor-id}`)
- Adds advisor to module-specific search results based on expertise mappings
- Enables booking functionality for published services
- Sends publication confirmation email with:
  - Profile URL for sharing
  - Next steps: "How to get your first client" guide
  - Links to advisor resources and support

**Search & Discovery:**
- Profile appears in marketplace search filtered by:
  - Expertise/module
  - Service type
  - Pricing range
  - Location/timezone
  - Language
  - Availability
- Search ranking influenced by:
  - Profile completeness (80%+ ranks higher)
  - Verification status (verified badge)
  - Quality score from moderation
  - User ratings (once reviews are collected)
  - Pricing competitiveness
  - Response rate and booking acceptance rate

**Validation Rules:**
- Profile must have "Approved" status from moderation
- At least 1 active service required
- Payment setup must be completed

**Draft Management:**
- N/A - Profile is live after publication

**Responsible Roles:**
- **Advisor**: Configures marketplace visibility settings

---

## 🎯 Conceptual System Requirements

> **IMPORTANT**: This section describes BUSINESS requirements only - what the system needs to do, NOT how it will be implemented technically.

### Integration Needs

**Authentication & Identity:**
- Ability to register using professional social accounts (LinkedIn, Google, Apple) to reduce onboarding friction
- Ability to verify email addresses to ensure valid contact information
- Secure session management
- Support for time-limited verification links expiring after reasonable period

**Payment Processing:**
- Payment processor integration for advisor subscription fees and transaction processing
- Support for multiple currencies for international advisors

**Identity Verification (KYC):**
- Third-party identity verification service to validate government-issued IDs
- Document upload capability for professional credentials and licenses
- Facial recognition to match advisor photo with ID document
- Optional background checks based on jurisdiction requirements

**Communication & Notifications:**
- Transactional email service for account verification, status updates, and reminders
- In-platform notification system for time-sensitive actions (booking requests, messages)
- Email reminder system for incomplete profiles and draft recovery
- Optional SMS notifications for urgent booking-related communications

**Media & File Management:**
- Photo upload with editing tools (crop, resize) for professional headshots
- Secure document storage for sensitive credentials
- Fast photo delivery for marketplace browsing experience
- File validation to ensure appropriate formats and security

**Search & Discovery:**
- Full-text search capability for families to find advisors by keywords, expertise, location
- Filtering by multiple criteria: expertise area, service type, pricing, availability, language
- Intelligent ranking to surface most relevant advisors based on family needs
- Analytics to track search performance and optimize discovery

**Calendar & Booking:**
- Integration with external calendars (Google, Outlook) to sync advisor availability
- Booking conflict prevention to avoid double-bookings
- Time zone support for global advisors and families
- Automated session reminders for both advisors and families

### Data Exchange Requirements

**Import Capabilities:**
- Import professional profile data from LinkedIn (name, headline, photo, work history, education) to accelerate profile creation
- Import basic profile from Google and Apple accounts (name, email, photo)
- Sync availability from external calendar systems to maintain up-to-date booking slots

**Export Capabilities:**
- Export advisor profile to PDF for advisor's own marketing use
- Export service catalog for external promotion and marketing
- Export transaction history to CSV/Excel for accounting and tax purposes
- Export client list (anonymized per privacy policy) for advisor's records

**Data Synchronization:**
- Keep calendar availability synchronized with external calendar services
- Update booking status in both platform and advisor's calendar
- Sync profile photo and basic information when advisor updates on OAuth provider (optional)

---

## 🔐 Multi-Tenancy & Data Isolation

### Advisor-Specific Data Isolation (CRITICAL)

Unlike family data that requires strict family-based isolation, advisor data operates in a **global namespace** with **association-based access control**:

**Key Principles:**
- Advisor profiles exist globally and are not tied to a single family
- Advisor PII (Personally Identifiable Information) must be encrypted for security
- Access to advisor services is managed through family-advisor associations
- Advisors can serve multiple families simultaneously
- Families can discover advisors through:
  1. Marketplace search (published advisor profiles with public visibility)
  2. Direct associations (advisors who accept family booking requests)

**Data Access Patterns:**

**Advisor Registry (Global):**
- Advisors exist in a global registry accessible platform-wide
- No family-based isolation applied to advisor profiles
- PII fields (email, phone, tax identification) must be encrypted
- Visibility rules:
  - Marketplace advisors: Visible to all families
  - Non-marketplace advisors: Only visible to families they're associated with

**Family-Advisor Associations:**
- System must track which families are associated with which advisors
- Association includes: Advisor role, module permissions, relationship status
- Purpose: Defines which families can access which advisors and with what permissions
- Booking rules: Families can book either marketplace advisors OR advisors they're associated with

**Service Catalog:**
- Services belong to individual advisors (not family-specific)
- No family-based isolation on service data
- Visibility rules:
  - If advisor has published marketplace profile: Services visible to all families
  - If advisor is private: Services only visible to associated families

**Bookings & Transactions:**
- Booking records link both family and advisor
- Two-way data isolation required:
  - Families can only see their own bookings
  - Advisors can only see bookings for their own services
- Booking data must track: Family, advisor, service, status, payment status

**Reviews & Ratings:**
- Reviews linked to specific advisor and booking
- Visibility: Reviews visible on advisor profile to all marketplace visitors
- Privacy: Family identity must be anonymized in public reviews (e.g., "Verified Client")

### What This Means for the Journey:

**Registration & Profile Building (Stages 1-6):**
- Advisor data stored in global registry (not family-specific)
- No family association during initial registration
- Profile visible only to advisor until marketplace publication

**Verification & Setup (Stages 7-9):**
- Identity verification documents stored securely with encryption
- Payment account setup is advisor-specific (global)

**Marketplace Publication (Stage 11):**
- Profile becomes visible to ALL families platform-wide
- Search results show advisors from global registry

**Client Acquisition (Stage 12):**
- When family books advisor, system creates family-advisor association
- Booking records must track both family and advisor for proper isolation
- Advisor dashboard shows aggregated data across all families they serve

---

## 🔑 Permissions & Access Control

### Required Permissions by Stage

**Stage 1-2 (Discovery & Registration):**
- **Public Access**: No authentication required for landing pages and registration initiation
- **Social Login**: Advisors can choose to register using professional social accounts (LinkedIn, Google, Apple)
- **Email Registration**: Alternative path for advisors who prefer not to use social login

**Stage 3-6 (Profile Building):**
- **Authenticated Advisor**: Must be logged in with advisor account
- **Profile Ownership**: Can only view and edit own profile, not other advisors' profiles
- **Draft Access**: Can save drafts and resume own profile building sessions

**Stage 7 (KYC Verification):**
- **Authenticated Advisor**: Must have submitted completed profile for review
- **Document Upload**: Can upload identity and credential documents to own verification package
- **Platform Administrator**: Can view verification documents and update verification status

**Stage 8-9 (Service Setup & Payments):**
- **Verified Advisor**: Profile must have passed identity verification
- **Service Management**: Can create, edit, activate/deactivate services in own catalog
- **Payment Setup**: Can connect payment account to receive earnings from bookings

**Stage 10 (Moderation):**
- **Platform Administrator**: Required role for accessing moderation queue
- **View Permissions**: Can view all submitted advisor profiles for review
- **Approve/Reject**: Can approve profiles, request revisions, or reject profiles

**Stage 11-12 (Marketplace & Selling):**
- **Published Advisor**: Profile must have "Approved" status from moderation
- **Dashboard Access**: Can view own performance analytics and booking requests
- **Booking Management**: Can accept or decline booking requests for own services
- **Communication**: Can message families who sent booking inquiries or are active clients

### Permission Enforcement Points

**Authentication Checks:**
- Validate user is logged in before accessing protected pages
- Verify user has advisor role (not family member or admin)
- Ensure session is active and not expired

**Data Access Controls:**
- **Profile Operations**: Advisors can only access and edit their own profiles
- **Service Management**: Advisors can only manage services they created
- **Booking Operations**: Advisors can only view and manage bookings for their own services
- **Document Access**: Advisors can only view/upload documents to their own verification packages

**User Interface Controls:**
- Hide navigation items and buttons for actions advisor doesn't have permission for
- Disable features that require higher permissions (e.g., moderation tools only for admins)
- Display contextual messages explaining why certain actions are unavailable

**Error Handling:**
- **Not Logged In**: Redirect to login page with explanation
- **Insufficient Permissions**: Display clear "Access Denied" message explaining required permissions
- **Resource Not Found**: Show appropriate error message without revealing whether resource exists but is inaccessible

---

## 📋 Business Rules & Controls

### Profile Completeness Rules

**Minimum Submission Requirements (60% completion):**
- Profile photo uploaded and meets quality standards
- Full name and professional title provided
- Professional bio (100-500 characters)
- Email verified
- At least 1 expertise module selected
- At least 1 work experience entry
- Phone number and location provided
- Years of experience specified

**Recommended for High Quality (80%+ completion):**
- Multiple work experience entries (2-3+)
- Education/certification entries
- 3+ expertise modules with proficiency levels
- Professional credentials uploaded

### Service Catalog Rules

**Service Creation Requirements:**
- Minimum 1 service required for marketplace publication
- Service description must be 200-1,000 characters (clear and detailed)
- Service type and pricing model must be selected
- Availability parameters required (minimum notice, session duration)

**Service Activation Rules:**
- Services can be individually activated or deactivated
- Active services appear in marketplace and are bookable
- Draft services visible only to advisor
- Deactivated services hidden from marketplace but retain historical bookings

### Verification & Trust Rules

**Identity Verification (KYC):**
- Required before marketplace publication
- Verification expires after 2 years, requiring re-verification

**Credential Verification:**
- Professional licenses must be active and in good standing
- Certifications must be from recognized issuing bodies
- Documents must be uploaded in clear, readable format
- Administrator performs manual validation

**Trust Badges:**
- **Identity Verified**: Passed KYC checks
- **Credentials Verified**: Professional licenses/certifications validated
- **Top Rated**: Average rating 4.8+ with minimum 10 reviews
- **Fast Responder**: Average response time < 6 hours
- **Experienced**: 10+ years in field

### Pricing & Commission Rules

**Platform Commission:**
- there is no platform commission, they connect own Stripe Account

**Pricing Guidelines:**
- Introductory discount for first-time clients (optional, advisor-funded)

**Payout Rules:**
- Depends on the Stripe Settings, not managed by the Platform

### Booking & Engagement Rules

**Booking Acceptance:**
- Advisors must respond to booking requests within 48 hours (excluding weekends)
- Failure to respond results in auto-decline and negative impact on search ranking
- Advisors can decline bookings with optional reason (not visible to family)

**Cancellation Policy:**
- Excessive advisor cancellations (>10%) result in marketplace suspension

**Review & Rating Rules:**
- Only families who completed bookings can leave reviews
- Reviews submitted within 30 days of service completion
- Advisors can respond to reviews (public response)
- Inappropriate reviews can be flagged for moderation
- Minimum 5 reviews required for average rating to display

### Compliance & Governance

**Data Privacy (GDPR/CCPA Compliance):**
- Advisor PII encrypted at rest using PostgreSQL pgcrypto
- Advisors can export their data (profile, bookings, payments) at any time
- Advisors can request account deletion (right to be forgotten)
- Deletion retains anonymized financial records for tax/audit purposes

**Data Retention:**
- Active profiles: Indefinite retention while account active
- Inactive profiles: Archived after 12 months of no login
- Booking records: Retained for 7 years (financial audit requirements)
- KYC documents: Retained for 5 years after account closure (regulatory requirement)
- Reviews: Retained indefinitely (public marketplace content)

**Audit Trail:**
- All profile edits logged with timestamp and user ID
- Service price changes logged for transparency
- Booking status changes tracked
- Payment transactions logged with full audit trail
- Administrator actions logged for accountability

**Legal & Regulatory:**
- Advisors must accept Terms of Service during registration
- Platform acts as facilitator, not employer (independent contractor relationship)
- Advisors responsible for own taxes and business compliance
- Anti-money laundering (AML) compliance through Stripe verification

---

## 🚨 Edge Cases & Risks

### Edge Cases

**Registration & Authentication:**
- **OAuth account already used**: Advisor tries to register with email already linked to OAuth account
  - **Solution**: Display message "Email already registered via [Provider]. Please use [Provider] sign-in."
- **Email verification link expired**: Advisor clicks verification link after 24-hour expiry
  - **Solution**: Display "Link expired" message with option to resend verification email
- **Duplicate email across family and advisor systems**: Same email used for family member account
  - **Solution**: Allow same email for different roles (family member vs advisor), but require unique `user_id` and role context in JWT

**Profile Building:**
- **Interrupted upload during photo submission**: Network failure during photo upload
  - **Solution**: Display upload progress bar; if failure, show error and allow retry without losing other form data
- **Browser crash with unsaved changes**: User loses draft data
  - **Solution**: Auto-save every 60 seconds ensures max 60 seconds of data loss; display last saved timestamp
- **OAuth data conflicts with manual entry**: Advisor edits name imported from LinkedIn
  - **Solution**: Manual edits override OAuth data; show indicator that field was manually edited

**Verification & KYC:**
- **Name mismatch between ID and profile**: Profile name is "Bob Smith", ID shows "Robert J. Smith"
  - **Solution**: Allow verification with explanation; administrator reviews and approves if reasonable variation
- **Expired license uploaded**: Professional license expired 6 months ago
  - **Solution**: Verification fails; advisor notified to upload current license or remove credential claim
- **KYC provider downtime**: Third-party verification service unavailable
  - **Solution**: Queue verification requests; process when service restored; notify advisor of delay

**Service Configuration:**
- **Pricing below minimum threshold**: Advisor enters $25/hour (below $50 minimum)
  - **Solution**: Form validation prevents submission; display error message with minimum pricing requirements
- **Conflicting availability settings**: Advisor sets contradictory calendar rules
  - **Solution**: Validate availability logic before saving; display conflict explanation and require resolution

**Payment Setup:**
- **Stripe verification fails**: Advisor's bank account cannot be verified
  - **Solution**: Display Stripe error message; provide support link; allow advisor to update information
- **International advisor in unsupported country**: Advisor from country where Stripe Connect unavailable
  - **Solution**: Display list of supported countries during registration; offer waitlist for unsupported regions

**Moderation & Approval:**
- **Advisor abandons profile after rejection**: Advisor doesn't respond to revision request
  - **Solution**: Send reminder emails at 7 and 14 days; archive profile after 30 days of inactivity
- **Borderline quality profile**: Profile meets minimum requirements but is low quality
  - **Solution**: Administrator requests optional improvements (not required); publish with lower quality score affecting search ranking

**Marketplace & Bookings:**
- **Advisor at capacity**: All booking slots filled
  - **Solution**: Display "Currently not accepting new clients" badge; allow families to join waitlist
- **Booking conflict due to race condition**: Two families book same time slot simultaneously
  - **Solution**: First successful payment locks slot; second family receives immediate notification of conflict and alternative times
- **Advisor becomes unresponsive after booking**: Family cannot reach advisor after payment
  - **Solution**: Automatic refund after 7 days of no response; negative impact on advisor's standing

### Operational Risks

**Data Risks:**
- **PII exposure**: Advisor profile data leaked due to security breach
  - **Mitigation**: Encryption at rest (pgcrypto), TLS for data in transit, access logging, regular security audits
- **Data loss due to draft expiration**: Advisor loses work after 90-day inactivity
  - **Mitigation**: Send reminder emails at 60 and 80 days; provide data export option before deletion

**Permission Risks:**
- **Unauthorized profile access**: Advisor gains access to another advisor's profile
  - **Mitigation**: Strict JWT validation, row-level security policies, all API calls verify `advisor_id` matches token
- **Privilege escalation**: Regular advisor gains administrator privileges
  - **Mitigation**: Role-based access control enforced at multiple layers; administrator actions logged and audited

**Performance Risks:**
- **Slow profile photo upload**: Large images cause timeout
  - **Mitigation**: Client-side image compression before upload; 5MB file size limit; display upload progress
- **Search query performance degradation**: Marketplace search slow with 1,000+ advisors
  - **Mitigation**: Database indexing on search fields; caching of search results; pagination with max 50 results per page

**User Experience Risks:**
- **High registration abandonment**: Advisors start registration but don't complete
  - **Mitigation**: Progress indicators, auto-save, email reminders, progressive disclosure (break into small steps)
- **Confusing verification process**: Advisors don't understand KYC requirements
  - **Mitigation**: Clear explanations with examples, FAQ section, support chat during verification
- **Low-quality profiles published**: Moderation doesn't catch poor profiles
  - **Mitigation**: Quality scoring algorithm flags low-quality profiles for extra review; clear submission guidelines

**Business Risks:**
- **Advisor-family disputes**: Disagreement over service quality or payment
  - **Mitigation**: Clear terms of service, mediation process, escrow payment system (hold payment 7 days), review system for accountability
- **Fraudulent advisor registration**: Bad actors create fake profiles
  - **Mitigation**: KYC verification required, manual moderation review, monitor for suspicious patterns, ability to ban advisors
- **Platform commission disputes**: Advisors dispute 15% commission
  - **Mitigation**: Transparent disclosure during payment setup, competitive market analysis shared, clear value proposition (client acquisition, tools, payment processing)

---

## 🔗 Related Journeys

### Alternative Entry Paths

**DOC-JRN-ADV-002: Family-Invited Advisor Quick Onboarding**
- **For**: Advisors invited by families with pre-paid subscriptions
- **Difference**: Simplified registration (10 minutes vs 45-60 minutes), no KYC/payment required initially
- **When to use**: If you received an invitation email from a family
- **Link**: [user-journey-invited-advisor-quick-onboarding.md](user-journey-invited-advisor-quick-onboarding.md)

### Conversion From Invited Path

**Invited Advisor → Marketplace Expansion:**
- Advisors who started with JRN-ADV-002 (family-invited) can later upgrade to marketplace presence
- Conversion process joins this journey at **Stage 7 (KYC Verification)**
- Pre-filled data from invited profile accelerates onboarding
- See JRN-ADV-002 Stage 6 for detailed conversion process

---

**Document Version:** 2.0.0
**Last Updated:** 2025-10-16
**Next Review:** 2026-01-16
**Owner:** Anastasia Bronina
**Journey Type:** Independent Advisor (Full Marketplace Onboarding)
