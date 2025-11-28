# User Story 8: Edit Active Services with Booking Protection

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Consultant, I want to edit active services while preserving existing bookings
**Epic Link:** EPIC-006 - Advisor Service Catalog & Package Builder
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant,
**I want to** edit active services with booking conflict detection and warnings,
**so that** I update offerings based on market feedback, correct errors, or improve descriptions without disrupting current clients or breaking existing booking agreements.

---

## 🎯 Business Context

**Why is this Story important?**

Service offerings evolve based on client feedback, market conditions, and advisor expertise development. Advisors must be able to refine services while protecting existing client commitments. Blocking edits entirely frustrates advisors; allowing unrestricted edits breaks contracts and degrades trust.

**User pain point being solved:**
- Advisors spot errors in active service descriptions (typos, outdated info) but cannot fix them
- Market feedback suggests pricing adjustment needed, but advisors fear impacting existing clients
- Service evolution (adding deliverables, improving clarity) blocked by existing bookings
- Advisors unclear what happens to booked clients when they edit pricing

**Business outcome expected:**
- Higher quality marketplace listings (advisors can iteratively improve descriptions)
- Maintain contract integrity (existing bookings honored at original terms)
- Reduce disputes between advisors and families (clear rules prevent confusion)
- Enable dynamic pricing experimentation (change pricing without breaking past agreements)
- Increase advisor confidence in platform (editing doesn't break things)

**Strategic alignment:**
- Supports iterative service optimization (test, learn, improve)
- Protects platform reputation (contracts honored, no bait-and-switch)
- Reduces support burden (clear editing rules prevent "what happened to my booking?" questions)
- Enables marketplace maturity (services evolve with market feedback)

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** advisor has active service with zero bookings,
   **When** advisor clicks "Edit" on service card,
   **Then** system opens service edit form pre-populated with current data and allows editing all fields without restrictions or warnings.

2. **Given** advisor has active service with 3 existing bookings (completed or scheduled),
   **When** advisor clicks "Edit" on service card,
   **Then** system opens edit form AND displays prominent warning banner: "⚠️ This service has 3 active bookings. Changes apply to new bookings only. Existing bookings will keep original terms (pricing, duration, description)." with "I Understand" acknowledgment checkbox required before saving.

3. **Given** advisor edits service with existing bookings and changes pricing from $5,000 to $6,000,
   **When** advisor saves changes,
   **Then** system displays confirmation modal: "Update service pricing? New price ($6,000) applies to future bookings. Your 3 existing bookings remain at $5,000. Families will see updated pricing in marketplace immediately." with [Cancel] [Confirm Update] buttons.

4. **Given** advisor confirms pricing update for service with existing bookings,
   **When** update processes,
   **Then** system saves new pricing, displays confirmation "Service updated. New bookings will use $6,000 pricing. Existing bookings unaffected.", and returns to services dashboard showing updated service.

5. **Given** advisor edits service description (short or detailed description),
   **When** advisor saves changes,
   **Then** system allows editing without restrictions (description changes do NOT affect existing bookings) and updates marketplace listing immediately without confirmation dialog.

6. **Given** advisor attempts to edit service type or pricing model on active service,
   **When** advisor tries to change these fields,
   **Then** system displays field as disabled/read-only with tooltip: "Service type and pricing model cannot be changed after activation. Create new service if different type or model needed."

7. **Given** advisor edits session duration from 2 hours to 4 hours on service with bookings,
   **When** advisor saves,
   **Then** system displays confirmation: "Update session duration? New bookings will be 4 hours. Your 3 existing bookings remain 2 hours." with confirm/cancel options.

8. **Given** advisor saves edits to active service successfully,
   **When** changes are saved,
   **Then** system logs all changes in audit trail (timestamp, advisor ID, fields changed with old → new values), updates marketplace listing immediately for new bookings, and preserves original service configuration for existing bookings.

**Additional Criteria:**
- [ ] Edit form visually highlights fields that affect existing bookings (pricing, duration) vs. marketing-only fields (descriptions)
- [ ] System maintains service version history showing when edits were made and what changed
- [ ] Families with existing bookings optionally notified of service updates (e.g., "Advisor updated service description. Your booking terms unchanged.")
- [ ] Editing inactive or draft services has no restrictions (no bookings to protect)
- [ ] After saving edits, dashboard reflects changes immediately without full page refresh

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Figma: [Link to service edit flow with warnings - to be added]
- Screenshot: [To be attached]

**User Flow - Edit Service with No Bookings:**
1. Advisor views dashboard, sees active service "Governance Consulting" with "0 bookings"
2. Clicks "Edit" button on service card
3. Edit form opens with current data pre-populated:
   - Service type: Consultation (read-only, grayed out)
   - Name: "Governance Consulting"
   - Short desc: "Strategic governance advisory..." (80 chars)
   - Pricing model: Fixed Package (read-only, grayed out)
   - Pricing amount: $5,000
   - Session duration: 4 hours
4. No warning banners (zero bookings)
5. Advisor changes short description, updates pricing to $5,500
6. Clicks "Save Changes" button
7. Brief loading indicator
8. Confirmation: "✓ Service updated. Changes live in marketplace."
9. Returns to dashboard, service card shows updated pricing

**User Flow - Edit Service with Existing Bookings:**
1. Advisor views dashboard, sees service "Family Mediation" with "8 bookings"
2. Clicks "Edit" button
3. Edit form opens with data pre-populated
4. **Warning banner displays prominently at top:**
   - Icon: ⚠️ (orange warning triangle)
   - Text: "This service has 8 active bookings (3 scheduled, 5 completed). Changes apply to new bookings only. Existing bookings keep original terms."
   - Link: "View booking details" (opens modal showing booking list)
   - Checkbox: "☐ I understand changes won't affect existing bookings"
5. Advisor updates pricing: $500 → $600 per session
6. Updates short description with clearer value proposition
7. Checkbox still unchecked → "Save Changes" button disabled
8. Advisor checks box → "Save Changes" button enables
9. Clicks "Save Changes"
10. **Confirmation modal displays:**
    - Title: "Confirm Service Updates"
    - Content: "You're updating pricing from $500 to $600 per session. Your 8 existing bookings remain at $500. New bookings will use $600 pricing. Marketplace updates immediately."
    - Buttons: [Cancel] [Confirm Update] (primary)
11. Advisor clicks "Confirm Update"
12. System saves changes, logs audit trail
13. Confirmation toast: "✓ Service updated. New bookings use $600 pricing."
14. Returns to dashboard

**Warning Banner Design:**
```
┌────────────────────────────────────────────────────────────────┐
│ ⚠️ This service has 8 active bookings (3 scheduled, 5 completed) │
│ Changes apply to new bookings only. Existing bookings keep      │
│ original terms. [View booking details]                          │
│ ☐ I understand changes won't affect existing bookings          │
└────────────────────────────────────────────────────────────────┘
```

**Field Highlighting:**
- **Pricing fields**: Yellow/orange background highlight with icon "⚠️ Changes affect new bookings only"
- **Duration field**: Yellow/orange background highlight with icon "⚠️ Changes affect new bookings only"
- **Description fields**: No highlight (marketing-only changes)
- **Read-only fields** (type, pricing model): Gray background, disabled cursor

---

## 🔐 Business Rules

**Validation Rules:**
1. **Fields that CAN be edited on active services**:
   - Service name (affects all: marketplace listing updates immediately)
   - Short description (marketing-only: updates marketplace, doesn't affect bookings)
   - Detailed description (marketing-only: updates marketplace, doesn't affect bookings)
   - Pricing amount (NEW bookings only: existing bookings keep original price)
   - Session duration (NEW bookings only: existing bookings keep original duration)
   
2. **Fields that CANNOT be edited on active services**:
   - Service type: Locked after activation (changing type would break service categorization)
   - Pricing model: Locked after activation (changing model would break booking contracts)
   
3. **Booking protection logic**:
   - **Service with zero bookings**: No warnings, no restrictions, all editable fields can be changed freely
   - **Service with past bookings only (all completed)**: Edit freely, no active commitments to protect
   - **Service with future bookings (scheduled sessions)**: Requires warning acknowledgment, pricing/duration changes apply to NEW bookings only
   
4. **Change propagation**:
   - Marketplace listing updates immediately upon save (real-time)
   - Existing bookings locked to original service configuration (pricing, duration, description at time of booking)
   - Booking records store snapshot of service config at booking time (immutable)
   
5. **Audit trail requirements**:
   - Log all edits with timestamp, advisor ID, IP address
   - Record old value → new value for each changed field
   - Pricing changes logged separately for compliance/financial audit
   
6. **Confirmation thresholds**:
   - Editing descriptions: No confirmation required (low risk)
   - Editing pricing or duration: Confirmation required IF service has bookings
   - Editing with 10+ future bookings: Extra warning "This service has 10 scheduled bookings..."

**Authorization:**
- **Who can perform this action:** Advisor who owns the service (no cross-advisor editing)
- **Who can view results:** Advisor sees changes in dashboard and marketplace; families see updated marketplace listing for new bookings

**Edge Cases:**
- **Advisor reduces pricing significantly (e.g., $5,000 → $500)**: System allows but displays extra confirmation: "New price is 90% lower. This change is large. Confirm?"
- **Advisor increases pricing by 10x**: Similar warning for large increases
- **Advisor edits service while family is mid-booking**: Family sees original pricing if they started booking before edit, OR sees new pricing if booking initiated after edit (timestamp determines)
- **Advisor edits service then immediately edits again**: System allows unlimited edits, logs each change separately in audit trail
- **Service has 100 bookings**: Edit allowed, warning shows "100 active bookings", system performance unaffected (booking snapshots already stored)
- **Advisor cancels edit mid-way**: No changes saved, returns to dashboard without updates

---

## 🧪 Test Scenarios

**Happy Path - Edit Service with No Bookings:**
1. Advisor "John Doe" has active service "Succession Planning" with 0 bookings
2. Identifies typo in short description, needs to correct
3. Clicks "Edit" on service card
4. Edit form opens, no warning banners (zero bookings)
5. Fixes typo in description: "adviosry" → "advisory"
6. Updates pricing: $3,000 → $3,500 (market research shows underpriced)
7. Clicks "Save Changes"
8. No confirmation modal needed (zero bookings)
9. Confirmation toast: "✓ Service updated. Changes live in marketplace."
10. Dashboard updates, service shows $3,500 pricing
11. Expected result: Seamless edit, marketplace updated immediately

**Happy Path - Edit Service with Existing Bookings:**
1. Advisor "Jane Smith" has service "Family Mediation" with 8 bookings (3 scheduled, 5 completed)
2. Client feedback suggests pricing is too low, wants to increase to test demand
3. Clicks "Edit" on service card
4. Edit form opens with warning banner: "⚠️ This service has 8 active bookings..."
5. Advisor reads warning, clicks "View booking details" → modal shows list of 8 bookings with dates/statuses
6. Closes modal, checks acknowledgment box: "☐ I understand..." → "Save Changes" button enables
7. Changes pricing: $500 → $650 per session
8. Improves short description with clearer value proposition (no booking impact)
9. Clicks "Save Changes"
10. Confirmation modal displays: "Confirm Service Updates? Pricing change from $500 to $650. Your 8 existing bookings remain at $500. New bookings use $650."
11. Advisor confirms
12. System saves: Audit trail logged, marketplace updated to $650, existing bookings locked at $500
13. Confirmation: "✓ Service updated. New bookings use $650 pricing."
14. Family with scheduled booking sees confirmation email: "Your booking for Family Mediation confirmed at $500 (original price). Advisor updated service but your booking terms unchanged."
15. Expected result: Pricing updated for new clients, existing clients protected

**Negative Tests:**
1. **Attempt to change service type**: 
   - Advisor clicks "Edit", tries to change type from "Mediation" to "Consultation"
   - Field is disabled/read-only
   - Tooltip displays: "Service type cannot be changed after activation"
   - Save button processes other changes but ignores type change attempt

2. **Attempt to change pricing model**:
   - Advisor tries to change from "Per Session" to "Hourly Rate"
   - Field disabled/read-only
   - Tooltip: "Pricing model cannot be changed after activation. Create new service if different model needed."

3. **Network error during save**:
   - Advisor edits service, clicks "Save Changes"
   - Network error mid-save
   - System displays error: "Unable to save changes. Check connection and try again."
   - Edit form remains open, data not lost, advisor can retry

4. **Advisor cancels confirmation modal**:
   - Advisor edits pricing with existing bookings
   - Confirmation modal displays
   - Advisor reconsiders, clicks "Cancel"
   - Modal closes, returns to edit form, changes not saved
   - Advisor can continue editing or close form

**Edge Cases:**
1. **Large pricing change (90% reduction)**:
   - Service pricing: $5,000 → $500 (90% decrease)
   - System detects large change
   - Extra confirmation: "⚠️ New price is 90% lower than current. This is a large change. Confirm this is intentional?" with [Cancel] [Yes, Update Pricing]
   - Advisor confirms intentional → proceeds with save

2. **Edit service with many bookings (50 future bookings)**:
   - Advisor edits service with 50 scheduled bookings
   - Warning banner: "⚠️ This service has 50 active bookings (50 scheduled). Changes apply to new bookings only..."
   - Confirmation modal emphasizes: "You have 50 scheduled bookings. All keep original terms ($500). New bookings will use $600."
   - System handles large booking count without performance degradation

3. **Concurrent edit by two sessions (edge case - same advisor, two tabs)**:
   - Advisor opens service edit in Tab A, changes pricing to $600
   - Opens same service edit in Tab B (before saving Tab A), changes pricing to $650
   - Tab A saves first → pricing updates to $600, marketplace reflects $600
   - Tab B saves second → overwrites Tab A, pricing updates to $650
   - Result: Last save wins (acceptable for single advisor managing own services)

4. **Edit inactive service**:
   - Advisor edits service with status = "Inactive"
   - No warnings or restrictions (inactive services not bookable)
   - Edits pricing, description, duration freely
   - Saves changes → updates stored config
   - When reactivated later, uses updated config

5. **Family mid-booking when edit occurs**:
   - Family starts booking flow at 10:00 AM, sees pricing $500
   - Advisor edits service at 10:05 AM, changes to $600
   - Family completes booking at 10:10 AM
   - System uses timestamp: Booking initiated before edit → family pays $500 (original price when started)
   - Booking record locked at $500, future bookings after 10:05 AM see $600

**Test Cases Location:** `Knowledge-Base/product-management/test-cases/EPIC-ADV-SERV-001-test-cases.md`

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** 
  - FG-STORY-ADV-SERV-001 (Create Service Offering) - needs service data model
  - FG-STORY-ADV-SERV-006 (Activate Services) - editing applies to active/inactive services
  - Booking system foundation - needs booking records to detect conflicts
- **Blocks:** 
  - Service versioning feature (future) - editing creates implicit versions
  - Analytics on service changes (future) - uses audit trail data

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Edit form load time: < 1 second to pre-populate data
- Save changes: < 2 seconds (includes marketplace update)
- Booking count query: < 500ms (to display warning)
- Audit trail logging: Non-blocking, < 200ms
- Marketplace update propagation: < 5 seconds (families see updated listing)

**Security:**
- Authorization required: Yes (valid advisor JWT token, owns service)
- Audit trail: All edits logged with IP address, timestamp, user agent
- Booking protection: Server-side enforcement (not just UI) - existing bookings truly immutable
- Change history: Retained for 7 years for compliance (financial records retention)

**Accessibility:**
- WCAG level: AA compliance
- Keyboard navigation: Tab through form fields, Space to check acknowledgment box
- Screen reader: Announces warning banner immediately on form load, reads checkbox label clearly
- Focus management: Focus moves to warning banner on form open if bookings exist
- Confirmation modals: Focus trapped in modal until action taken

**Browser Support:**
- Same as Story 1 (Chrome, Safari, Firefox, Edge latest 2 versions)
- Form supports standard HTML5 validation (email, URL fields)
- Modal overlays use modern CSS (backdrop blur), graceful degradation for older browsers

---

## 📝 Notes

**Questions:**
- [ ] Should families with existing bookings receive notification when advisor edits service? **Recommendation:** Yes if material changes (pricing, duration), optional for description updates
- [ ] Do we need approval workflow for large pricing changes (e.g., >50% increase)? **Decision:** No for Phase 1, trust advisors to set appropriate pricing
- [ ] Should we allow advisors to apply edits to existing bookings with client consent? **Recommendation:** Future enhancement, complex workflow
- [ ] How long to retain audit trail history? **Decision:** 7 years minimum for compliance, then optional archival

---

**Template Version:** 1.0.0
**Story Created:** 2025-10-17