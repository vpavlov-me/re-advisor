# EPIC-014-MVP1: Marketplace Discovery (Family)

> **Note:** This Epic is part of MVP1 Service Request Journey

---

## 📋 Basic Information

**Issue Type:** Epic
**Project:** FG
**Epic Name:** Marketplace Discovery for Families (MVP1)
**Summary:** Enable families to browse and discover consultants in a simplified marketplace with basic filtering
**Parent User Journey:** MVP1 Service Request Journey
**Priority:** Critical
**Epic Link:** FG-EPIC-014-MVP1

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Enable Family Admin and Family Council members to discover consultants through a simplified marketplace interface with basic search and filtering capabilities.

**User-facing value:**
- Families can view a list of 3-5 approved consultants
- Families can filter consultants by expertise/specialization
- Families can view detailed consultant profiles including service catalogs and pricing
- Families can understand consultant credentials and offerings before booking

**Business value:**
- Entry point for entire service request journey
- Validates marketplace concept with minimal functionality
- Fast time-to-market with reduced complexity
- Foundation for future marketplace enhancements

**Scope boundaries:**
- **Included:**
  - Basic consultant list view with cards (photo, name, specialization, starting price)
  - Simple search by consultant name
  - Single filter: by expertise (Governance, Succession, Philanthropy, etc.)
  - Consultant profile page (bio, service catalog, pricing, credentials)

- **NOT included:**
  - Price range filters
  - Availability filters
  - Ratings and reviews
  - Verification badges
  - Consultant comparison feature
  - Favorite/shortlist consultants
  - "Similar consultants" recommendations
  - Results sorting options

---

## 👥 Target Users

**Who will use this feature?**

- **Primary Personas:**
  - Family Admin - Primary decision maker with budget authority
  - Family Council Member - Governance coordinator seeking external expertise

- **Secondary Personas:**
  - Family Member - Can browse marketplace but cannot initiate bookings (read-only)

---

## 📖 User Stories (High-Level)

**Main scenarios this Epic will enable:**

**US-MVP1-001: Browse Consultant Marketplace**
- **As a** Family Admin or Council Member
- **I want to** browse a list of available consultants with basic filtering by expertise
- **So that** I can discover consultants who match my family's governance needs

**US-MVP1-002: View Consultant Profile & Services**
- **As a** Family Admin or Council Member
- **I want to** view a consultant's detailed profile including their service catalog, pricing, and credentials
- **So that** I can evaluate if they're suitable for our needs and understand what services they offer

---

## 🔗 Dependencies

**Upstream Dependencies:**
- Consultant profiles must be created and approved (consultant onboarding flow)
- Consultant service catalog must be populated with at least one active service per consultant

**Downstream Impact:**
- This Epic enables EPIC-012-MVP1 (Service Booking)
- Marketplace discovery is the entry point for the entire service request journey

**Technical Dependencies:**
- Consultant profile data model and storage
- Basic search/filter functionality
- Responsive UI for marketplace pages

---

## 📐 Design & UX

**Figma Links:**
- [To be created] Marketplace Landing Page
- [To be created] Consultant Card Design
- [To be created] Consultant Profile View

**UX Notes:**

**User Flow - Marketplace Discovery:**
1. Family Admin/Council navigates to "Find Consultant" from Family Portal main menu
2. Sees marketplace landing page with list of 3-5 consultant cards
3. Each card displays:
   - Consultant photo
   - Name
   - Headline/tagline
   - Primary expertise/specialization
   - Starting price ("From $X")
4. Can use search bar to find consultant by name
5. Can filter by expertise dropdown (Governance, Succession, Philanthropy, Conflict Resolution, etc.)
6. Clicks on consultant card → Opens consultant profile page
7. Profile page shows:
   - Full bio and credentials
   - Service catalog (list of services with descriptions and prices)
   - Contact information (hidden until booking)
   - "Book Service" CTA button

**Key UI Elements:**
- **Marketplace List View:** Clean grid of consultant cards (2-3 columns)
- **Search Bar:** Prominent at top, simple text search by name
- **Filter Dropdown:** Single dropdown for expertise selection
- **Consultant Card:** Photo + key info + starting price + "View Profile" button
- **Profile Page:** Structured layout with bio, credentials, service catalog

**Simplifications for MVP1:**
- No pagination (only 3-5 consultants)
- No sorting options
- No advanced filters
- No comparison feature
- No ratings/reviews display

---

## 🔔 Notifications (if applicable)

**Does this Epic involve user notifications?** No

Discovery is a read-only browsing experience. Notifications handled in booking Epic (EPIC-012-MVP1).

---

## 🧮 Business Rules

**Marketplace Display Rules:**
1. Only consultants with "Approved" profile status appear in marketplace
2. Only consultants with at least one "Active" service in catalog are displayed
3. Starting price shown as lowest-priced service in consultant's catalog
4. All authenticated family users can browse marketplace (view-only)
5. Only Admin and Family Council can initiate bookings (enforced in EPIC-012-MVP1)

**Search & Filter Rules:**
1. Search by name is case-insensitive, partial match
2. Expertise filter shows only options that have active consultants
3. Empty filter = show all consultants
4. Empty search results = show "No consultants found" message with clear filter option

**Profile Visibility:**
1. Consultant contact info (email, phone) hidden until service request created
2. Service catalog shows all active services for consultant
3. Inactive/draft services not displayed to families

---

## 📝 Notes

**MVP1 Simplifications:**
- With only 3-5 consultants, advanced search/filter unnecessary
- Focus on clear, simple display of essential information
- Profile pages static (no dynamic content or personalization)
- No analytics tracking for this Epic (can add in future)

**Future Enhancements (Post-MVP1):**
- Multiple filters (price range, availability, service type)
- Sorting options (price, rating, availability)
- Verification badges for trusted consultants
- Ratings and reviews display
- "Recently viewed" and "Recommended" consultants
- Advanced search with Boolean operators
- Consultant comparison (side-by-side view)

**Assumptions:**
- Families know roughly what type of consultant they need
- Basic consultant information sufficient for initial evaluation
- Email communication acceptable for initial questions (no chat in MVP1)
- 3-5 consultants provides enough choice without overwhelming

**Technical Notes:**
- Consultant list should load within 2 seconds
- Profile page should load within 1 second
- Mobile-responsive design required
- Images optimized for web (max 500KB per consultant photo)

---

**Template Version:** 1.0.0
**Last Updated:** 2025-10-27
**Epic Status:** Draft
**Story Points Estimate:** 5 SP (reduced from 13 SP in original scope)
