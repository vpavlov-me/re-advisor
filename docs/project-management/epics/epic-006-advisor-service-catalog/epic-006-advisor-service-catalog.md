# Epic: Advisor Service Catalog & Package Builder

## 📋 Basic Information

**Issue Type:** Epic
**Project:** FG
**Epic Name:** Advisor Service Catalog & Package Builder
**Summary:** Enable advisors to create service offerings with pricing and duration, manage service policies (notice period and capacity), and control marketplace visibility
**Parent Initiative:** FG-XXX [Advisor Marketplace Platform]
**Priority:** High
**Epic Link:** FG-EPIC-ADV-SERV-001

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Complete service catalog and operational policies system enabling external advisors to define service offerings (product characteristics) and configure advisor-level policies (operational rules) for marketplace publication.

**User-facing value (what users can do after this Epic):**
- Create service offerings with predefined service types
- Configure service pricing using flexible models (Hourly Rate, Fixed Package, Monthly Retainer, Per Session) with USD-based pricing
- Define session duration per service as product characteristic (30 min, 1 hour, 4 hours, full day)
- Configure advisor-level operational policies: minimum notice period (applies to all services) and maximum concurrent clients (capacity management)
- Preview services as families will see them in marketplace before activation
- Save services as drafts and activate when ready (activation requires approved profile status)
- Manage service portfolio from centralized dashboard with status indicators (Active, Draft, Inactive)
- Edit active services while preserving existing booking agreements with clients
- Independently activate/deactivate services to control marketplace visibility without deleting historical data

**Business value (how business benefits):**
- Build diverse marketplace inventory with structured service taxonomy enabling intelligent family-advisor matching
- Enable self-service advisor onboarding reducing manual support burden
- Create data foundation for transaction revenue generation from future commission model
- Scale marketplace with minimal operational overhead through automated service management
- Improve marketplace quality through structured service types and validation rules
- Generate advisor subscription revenue through marketplace access requirements

**Scope boundaries:**

**✅ INCLUDED:**
- Service creation (Type, Details, Pricing, Duration)
- Service type selection from predefined types with descriptions and use cases
- Pricing model configuration
- Session duration configuration per service (product characteristic)
- Advisor-level service policies configuration: minimum notice period (applies to all services) and maximum concurrent clients
- Service preview component showing family-facing marketplace view
- Service activation/deactivation with profile approval status gating
- Service list component with filtering by status (Active, Draft, Inactive)
- Draft saving and resumption functionality
- Service editing workflow with booking conflict detection and warnings
- Validation rules for required fields and pricing constraints
- Integration with advisor profile approval status

**❌ NOT INCLUDED:**
- Booking calendar integration (separate epic)
- Client reviews and ratings system (post-MVP feature)
- Dynamic pricing or market-based pricing recommendations
- Package bundling functionality (e.g., "Buy 3 sessions, get 1 free")
- Promotional codes or time-limited discount system
- Multi-currency support (USD only in Phase 1)
- Multi-language service descriptions (English only in Phase 1)
- Service performance analytics dashboard (separate epic)
- Automated service suggestions based on advisor expertise
- Integration with external scheduling tools
- Per-service override of notice period (advisor-level policy applies to all services)

---

## 👥 Target Users

**Who will use this feature?**

- **Primary Personas:** Consultant (Independent Marketplace Professionals)
  - Independent consultants, mediators, family governance specialists seeking marketplace presence
  - Need to define service offerings with clear pricing and session duration
  - Need to configure operational policies (notice period, capacity) that apply across all services
  - Require flexibility to create custom packages aligned with expertise areas
  - Reference: `02-user-personas/Advisor/consultant-persona.md`

- **Secondary Personas:**
  - Family Members (Service Consumers) - browse and evaluate advisor services in marketplace
  - Platform Administrators - monitor service quality, marketplace inventory, and content moderation

---

## 📖 User Stories (High-Level)

**Main scenarios this Epic will enable:**

1. **As a** Consultant, **I want to** create complete service offering with type selection from predefined types, pricing configuration and session duration, so that families can understand what I provide, see transparent pricing, and know the time commitment required for the engagement

2. **As a** Consultant, **I want to** configure advisor-level service policies including minimum notice period and maximum concurrent clients, **so that** these operational rules apply consistently across all my services and families understand my booking requirements

3. **As a** Consultant, **I want to** see my current notice period setting when creating a service with quick access to change it, **so that** I can adjust my operational policy if needed without leaving the service creation flow

4. **As a** Consultant, **I want to** preview my service as families will see it in marketplace before activation, **so that** I ensure presentation quality, accuracy, and professional appearance before going live

5. **As a** Consultant, **I want to** save service as draft without activating it, **so that** I can refine offerings, adjust pricing, and perfect descriptions before publishing to marketplace

6. **As a** Consultant, **I want to** activate and deactivate services independently without deletion, **so that** I control marketplace visibility while preserving service data, historical bookings, and performance metrics

7. **As a** Consultant, **I want to** manage multiple services from centralized dashboard with status indicators (Active, Draft, Inactive), **so that** I track my service portfolio easily and see which services are generating bookings

8.  **As a** Consultant, **I want to** edit active services while preserving existing bookings at original terms, **so that** I update offerings without disrupting current clients or breaking existing agreements

**Detailed User Stories will be created in FG during Grooming**

---

## 🔗 Dependencies & Risks

### Product Dependencies

**Dependencies (what needs to be ready before this work begins):**
- **Epic: FG-EPIC-ADV-REG-001** - Basic Advisor Registration & Profile
  - Advisor account creation and authentication required
  - Profile building and submission flow must exist
  - Profile completion tracking implemented
  - Service creation available after profile submission, BUT activation requires approved profile
- **Epic: FG-EPIC-ADV-KYC-001** - Identity Verification (for activation gating)
  - Identity verification process implementation
  - Profile approval workflow operational
  - Advisor verification status tracking
- **System Requirements:**
  - Advisor portal operational
  - Service catalog functionality exists with 6 service types configuration
  - Profile approval status available for validation
- **Business Configuration:**
  - service types taxonomy locked and documented
  - pricing models defined
  - Pricing constraints documented (minimum rates, allowed ranges)
  - Session duration options defined
  - Notice period options defined

**External Dependencies:**
- None (self-contained within platform)

---

## 🎨 Product Delivery Phases

### Phase 1: MVP Service Creation & Activation (6 weeks)
**Goal:** Enable advisors to create and activate basic service offerings with pricing and duration

**What users can do:**
- Create service offerings with predefined service types
- Configure pricing using 4 pricing models with USD-based validation
- Define session duration per service
- Configure advisor-level service policies (notice period, capacity)
- Preview services as families will see them
- Save services as drafts
- Activate services (requires approved profile status)
- View service dashboard with basic status indicators

**Business value:**
- Begin building marketplace inventory
- Enable first advisor-family transactions
- Validate service taxonomy and pricing models
- Collect feedback on service creation flow


### Phase 2: Enhanced Service Management & Editing (4 weeks)
**Goal:** Enable comprehensive service portfolio management and safe editing workflows

**What users can do (in addition to Phase 1):**
- Edit active services with booking conflict detection
- Independently activate/deactivate services
- Filter dashboard by service status (Active, Draft, Inactive)
- View quick stats (bookings, revenue) per service
- Delete services (soft delete with booking preservation)
- Change service policies with impact warnings

**Business value:**
- Reduce support burden through self-service management
- Improve service quality through iterative refinement
- Maintain booking integrity during service updates
- Enable dynamic marketplace inventory


---

## 🎨 Design & UX

**Figma Links:**
*(to be added)*

**UX Notes:**

**User flows:**

**Service Policies Configuration (One-Time Setup, Available Anytime):**
1. Advisor navigates to "My Services" section in Advisor Portal
2. Sees "Service Policies" subsection with current settings displayed
3. Clicks "Edit Service Policies" button
4. Configures minimum notice period
5. Clicks "Save Policies" - applies to all existing and future services
6. System confirms "Service policies updated. These apply to all your services."

**Service Creation Flow:**
1. Advisor clicks "Add Service" button on dashboard
2. Selects service type from visual cards with icons and descriptions
3. Enters service name (5-100 chars), short description (50-200 chars), detailed description (optional 200-1,000 chars)
4. Selects pricing model and enters amount with validation (conditional fields appear based on model selection)
5. Configures session duration
   - Sees current notice period: "Minimum notice period: 48 hours (from your service policies) [Change Settings]"
   - Previews service card as families will see it
6. Clicks "Save as Draft" OR "Activate Service" (if profile approved)
7. Returns to dashboard with new service visible in appropriate section (Draft or Active)

**Service Management Flow:**
1. Advisor views service dashboard showing Active (3), Draft (1), Inactive (2) sections
2. Each service card displays: Type badge, Name, Pricing, Duration, Quick stats (bookings, revenue), Actions (Edit, Activate/Deactivate, Delete)
3. Advisor clicks "Edit" on active service with existing bookings
4. System shows warning modal: "This service has 3 active bookings. Changes apply to new bookings only. Existing bookings will keep original terms."
5. Advisor confirms and edits service (pricing, description, duration)
6. Changes saved and reflected in marketplace immediately for new bookings

**Key Design Principles:**
- **Progressive disclosure:** Pricing fields adapt to selected model (Hourly shows min hours, Retainer shows contract term)
- **Service preview:** "See as families see it" card matches exact marketplace appearance
- **Status indicators:** Visual badges
- **Confirmation dialogs:** Critical actions (activate, deactivate, edit with bookings) require confirmation
- **Contextual help:** Tooltip icons explaining each field with examples
- **Clear separation:** Service characteristics (duration, pricing) separate from operational policies
- **Policy inheritance display:** Show inherited notice period with option to change in policies section
- **Mobile responsive:** Desktop primary for complex forms, tablet supported for viewing/simple edits

**See also:** User Journey `user-journey-independent-advisor-marketplace` (Stage 8: Service Catalog & Pricing Configuration)

---

## 🧮 Business Rules

**Key Business Rules:**

### 1. Service Type Taxonomy (Predefined Types - Locked, No Custom Types in Phase 1)

| Service Type | Description | Primary Use Case |
|--------------|-------------|-------------------|
| **Governance Support** | Full family governance support across all modules | Families needing end-to-end governance setup |
| **Consultation** | Focused expertise in specific governance areas | Families addressing specific challenges |
| **One-Time Engagement** | Discrete project with defined deliverables | Constitution drafting, document creation |
| **Education** | Group training or learning sessions | Family education, skill-building |
| **Mentorship** | Ongoing 1-on-1 guidance and development | Next-gen development, leadership coaching |
| **Mediation** | Conflict resolution facilitation |  Active family conflicts |
| **Other** | Other Service Type |  Custom Services |

### 2. Pricing Models & Validation Rules (4 Models - Aligned with Service Types)

| Pricing Model | Description |
|---------------|-------------|
| **Hourly Rate** | Per-hour consulting |
| **Fixed Package** | Pre-defined scope and price |
| **Monthly Retainer** | Ongoing monthly fee |
| **Per Session** | Workshops, mediation, training |

**Additional Pricing Rules:**
- All pricing in USD only (multi-currency not supported in Phase 1)
- Free consultations allowed (price = $0) for introductory offerings
- Pricing must be positive integer or zero (no decimals in Phase 1)
- Hourly Rate requires minimum hours field (default: 1 hour)
- Monthly Retainer requires contract term field (e.g., "3 months minimum")

### 3. Service-Level Configuration (Product Characteristics)

**These define the SERVICE ITSELF as a product:**

**Required Fields:**
- Service type: Required, selection from dropdown from the Service Type Taxonomy
- Short description: Required, 50-200 characters (used in search results and cards)
- Detailed description: Optional, 200-1,000 characters (full service page)
- Pricing model: Required, selection from 4 models
- Pricing amount: Required, positive number or 0 (free)
- Session duration: Required, number of hours field

**Validation at Submission:**
- All required fields completed
- Description meets character minimums (50 for short, 200 for detailed if provided)

### 4. Advisor-Level Service Policies (Operational Rules)

**These define HOW THE ADVISOR OPERATES across ALL services:**

**Configuration Location:** Advisor Portal → Professional Profile → My Services

**Required Settings:**
- Minimum notice period: Required, selection from dropdown ["Same day", "24 hours", "48 hours", "3 days", "1 week", "2 weeks"]
- Maximum concurrent clients: Optional field, 0 as default

**Policy Application Logic:**
- Minimum notice period applies to ALL services (no per-service override)
- Maximum concurrent clients applies across ALL services (advisor-wide capacity)
- Policies can be changed anytime and apply immediately to future bookings
- Existing bookings remain with original policy terms
- When creating new service, system displays current notice period with option to change in policies section

**Business Logic:**
- Advisor must configure service policies before activating first service
- If policies not configured, system prompts: "Configure your service policies before activating services"
- Notice period inherited by all services and displayed in marketplace listings
- Capacity tracked across all services combined (not per-service)

### 5. Service Activation & Visibility Rules

**Activation Requirements:**
- **CRITICAL GATING:** Services can be activated ONLY if advisor profile status = "Approved"
- Service policies (notice period, capacity) must be configured before activation
- At least 1 active service required for marketplace publication
- Service must pass validation rules before activation allowed

**Visibility Logic:**
- **Pending Review profile:** All services hidden from marketplace, visible only in advisor dashboard
- **Approved profile + Active service:** Service visible to all families in marketplace and searchable
- **Approved profile + Draft service:** Service hidden from marketplace, visible only in advisor dashboard
- **Approved profile + Inactive service:** Service hidden from marketplace but preserved with historical data
- **Rejected profile:** All services hidden with warning indicator

**Activation Business Logic:**
- Services can be individually activated/deactivated (independent control per service)
- Activating service makes it immediately searchable and bookable in marketplace
- Deactivating service hides from marketplace but preserves: service data, existing bookings, performance metrics, reviews
- Deleting service permanently removes it (only allowed if zero bookings exist)

### 6. Editing Active Services Rules

**Edit Scenarios:**

**Scenario A: Service has NO bookings**
- Editing allowed without restrictions or warnings
- Changes apply immediately to marketplace listing

**Scenario B: Service has ACTIVE bookings (scheduled future sessions)**
- Editing allowed with mandatory confirmation dialog
- Changes apply to NEW bookings immediately
- Existing bookings preserved with original terms (price, duration, description locked)
- Optional: Send notification to families with existing bookings about service updates

**Scenario C: Service has PAST bookings only (completed sessions)**
- Editing allowed without restrictions
- Changes apply immediately to marketplace listing
- Historical bookings retain original terms for financial records

**Fields That Can Always Be Edited:**
- Short description (marketing text)
- Detailed description
- Deliverables list
- Session duration (affects only new bookings, existing bookings use original duration)

**Fields Requiring Extra Caution (Preserved for Existing Bookings):**
- Pricing: New price affects new bookings only, existing bookings use booked price
- Service type: Cannot be changed (would break system integrity)
- Pricing model: Cannot be changed (would break existing booking contracts)

**Service Policies Changes:**
- Changing notice period or capacity affects all services immediately
- Applies to future bookings only
- Existing bookings retain original policy terms

### 7. Data Retention & Compliance

**Data Retention:**
- Active services: Retained indefinitely while active
- Inactive services: Retained indefinitely as historical record for bookings
- Deleted services: Soft delete only if no bookings exist; hard delete prohibited if bookings exist
- Service policies history: All changes logged for audit trail

**Audit Trail:**
- All service edits logged with timestamp, user, fields changed (old value → new value)
- Pricing changes logged separately for financial audit and compliance
- Activation/deactivation actions logged with reason (if provided)
- Service policy changes logged with timestamp and user
- Service preview viewed events tracked for future analytics

**Content Moderation:**
- Service descriptions reviewed as part of profile moderation workflow
- Advisors can flag inappropriate content for admin review
- Platform reserves right to deactivate services violating Terms of Service
- New services added after profile approval are auto-approved but monitored

**See also:** User Journey `user-journey-independent-advisor-marketplace` for additional business logic details

---

## 📝 Open Questions & Decisions

**Open Questions:**
- [ ] Should we support package bundling (e.g., "Buy 3 sessions, get 1 free") in Phase 1? **Impact:** +2 weeks development **Decision:** No
- [ ] Should we support multi-currency pricing (EUR, GBP) for international advisors? **Decision:** No for Phase 1, USD only per User Journey
- [ ] Do we need admin approval for service descriptions? **Decision:** No
- [ ] Should we support promotional codes or time-limited discounts? **Recommendation:** No
- [ ] What happens if advisor changes pricing while active bookings exist? **Decision:** Preserve old price for existing bookings, new price for future bookings
- [ ] Should we allow per-service override of notice period in future? **Decision:** No

---

## 🔄 Changelog

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-10-17 | Product Team | Initial epic creation based on User Journey v2.1.0 |

---

**Template Version:** 2.1.0
**Last Updated:** 2025-10-17
