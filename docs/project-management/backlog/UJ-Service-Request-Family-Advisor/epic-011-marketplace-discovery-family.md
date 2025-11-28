# EPIC-011F: Marketplace Discovery & Search (Family Side)

## 📋 Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** Marketplace Discovery & Search for Families  
**Summary:** Enable families to discover, search, filter, and evaluate consultants in the marketplace  
**Parent User Journey:** JRN-FAM-002 - Family Marketplace Service Booking & Engagement  
**Priority:** Critical  
**Epic Link:** FG-EPIC-011F  
**Related Epic:** FG-EPIC-011A (Consultant marketplace profile management)

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Enable Admin and Family Council members to efficiently discover and evaluate marketplace consultants through intuitive search, filtering, and profile viewing capabilities. This Epic delivers the entry point to the entire service booking journey, ensuring families can find the right consultant for their specific governance needs.

**User-facing value:**
- Families can search consultants by expertise, service type, price range, and availability
- Families can view detailed consultant profiles including credentials, services, and ratings
- Families can compare multiple consultants side-by-side
- Families can identify verified consultants through badge system

**Business value:**
- Increased marketplace engagement through effective discovery
- Higher booking conversion rates through better matching
- Reduced time-to-engagement from 20+ minutes to <10 minutes
- Foundation for consultant recommendation algorithm

**Scope boundaries:**
- **Included:** Search, filtering, profile viewing, comparison, favoriting
- **NOT included:** Consultant profile creation (see EPIC-011A), service booking (see EPIC-013F), chat initiation (see EPIC-014F)

---

## 👥 Target Users

**Primary Personas:**
- Admin (DOC-USR-003) - Primary family decision maker with budget authority
- Family Council Member (DOC-USR-002) - Governance coordinator seeking external expertise

**Secondary Personas:**
- Family Member (DOC-USR-001) - May browse marketplace but cannot initiate bookings

---

## 📖 User Stories (High-Level)

1. **As an** Admin or Family Council member, **I want to** browse the consultant marketplace from my Family Portal, **so that** I can discover qualified consultants for my family's governance needs

2. **As an** Admin, **I want to** filter consultants by expertise/module, service type, price range, and availability, **so that** I can quickly find consultants matching my specific requirements

3. **As a** Family Council member, **I want to** view detailed consultant profiles including credentials, verification status, service catalog, and ratings, **so that** I can evaluate if they're suitable for our family

4. **As an** Admin, **I want to** see clear availability indicators for each consultant, **so that** I can identify who can start work immediately vs. requires scheduling

---

## 🔗 Dependencies

**Upstream Dependencies:**
- EPIC-011A: Consultant Marketplace Profile Management (must have published profiles to discover)
- EPIC-008: Consultant Calendar & Scheduling (availability data needed for filters)

**Downstream Impact:**
- EPIC-013F: Service Request Lifecycle (discovery leads to booking initiation)
- EPIC-014F: Family Chat Interface (discovery enables chat initiation)

**Technical Dependencies:**
- Search engine/indexing system operational
- Consultant profile data accessible
- Real-time availability data from calendar system

---

## 📐 Design & UX

**Figma Links:**
- [To be created] Marketplace Landing Page
- [To be created] Search & Filter Interface
- [To be created] Consultant Profile View
- [To be created] Comparison View

**UX Notes:**

**User Flow - Marketplace Discovery:**
1. Admin/Council navigates to "Find Consultant" from Family Portal main menu
2. Sees marketplace landing page with featured consultants and search bar
3. Uses filters to narrow down results:
   - Module/Expertise (dropdown: Succession, Governance, Philanthropy, etc.)
   - Service Type (checkboxes: Workshop, Consultation, Mediation, etc.)
   - Price Range (slider: $0 - $10,000+)
   - Availability (radio: Available Now, This Week, This Month, Custom Date Range)
   - Ratings (when available: 4+ stars, 4.5+ stars, etc.)
4. Views paginated results (20 per page) with summary cards
5. Clicks consultant card to view full profile
6. From profile, can initiate booking or chat

**Key UI Elements:**
- **Search Bar:** Prominent, with autocomplete for consultant names and expertise
- **Filter Panel:** Left sidebar with collapsible sections for each filter type
- **Consultant Cards:** Display photo, name, headline, expertise badges, starting price, availability indicator, rating (when available)
- **Profile Page:** Comprehensive view with tabs: Overview, Services, Reviews, Availability

---

## 📢 Notifications (if applicable)

**Does this Epic involve user notifications?** No

Notifications for service booking and consultant communication handled in other epics (EPIC-013F, EPIC-014F).

---

## 🧮 Business Rules

**Search & Filtering:**
1. Only consultants with "Approved" profile status appear in marketplace
2. Only consultants with at least one "Active" service in catalog are discoverable
3. Consultants marked as "On Leave" appear with availability indicator but are searchable
4. Availability filter uses real-time data from consultant's calendar (EPIC-008)
5. Price filter shows "Starting from" price based on lowest service cost
6. Unverified consultants can appear but must have disclaimer badge

**Profile Visibility:**
1. All authenticated family users can view marketplace and profiles
2. Only Admin and Family Council can initiate bookings or chat
3. Consultant contact information (email, phone) is hidden until engagement
4. Reviews and ratings visible when feature is available (future epic)

**Performance:**
1. Search results return within 2 seconds for any filter combination
2. Profile page loads within 1 second
3. Pagination supports up to 10,000 consultants without performance degradation

---

## 📝 Notes

**Future Enhancements (not in scope):**
- Consultant comparison feature (side-by-side view of up to 3 consultants with pricing, services, ratings)
- Favorite/shortlist consultants for quick access with notifications when they become available
- AI-powered consultant recommendations based on family needs analysis
- "Recently viewed" consultants section
- Share consultant profiles with other family members
- Request custom services not in catalog

**Open Questions:**
- Should we show "Popular" or "Trending" consultants based on booking volume?
- Should we display consultant response time metrics?

**Assumptions:**
- Families know what type of consultant they need (no assessment tool in this epic)
- Basic search and filtering sufficient for MVP (no advanced Boolean queries)
- Profile structure defined in EPIC-011A provides sufficient information for evaluation

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-24  
**Epic Status:** Draft  
**Story Points Estimate:** TBD (during grooming)
