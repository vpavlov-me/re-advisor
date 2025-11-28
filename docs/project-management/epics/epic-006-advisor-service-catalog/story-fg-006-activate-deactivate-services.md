# User Story 6: Activate and Deactivate Services Independently

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Consultant, I want to activate and deactivate services independently
**Epic Link:** EPIC-006 - Advisor Service Catalog & Package Builder
**Priority:** Critical
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant,
**I want to** activate and deactivate individual services independently without deleting them,
**so that** I control marketplace visibility dynamically while preserving service data, historical bookings, performance metrics, and client reviews for each service.

---

## 🎯 Business Context

**Why is this Story important?**

Activation/deactivation is core marketplace visibility control. Advisors need ability to take services on/off market based on capacity, seasonal demand, service evolution, or personal circumstances without losing historical data. This is fundamentally different from deletion.

**User pain point being solved:**
- Advisors at capacity cannot accept new bookings but lose service data if they delete
- Seasonal advisors (e.g., summer-only family camps) need to hide services off-season
- Advisors testing new services need ability to pull back if not working
- Service updates or rebranding require temporary removal without data loss

**Business outcome expected:**
- Dynamic marketplace inventory adjusting to advisor availability
- Preserve platform's historical data for analytics, reviews, and advisor reputation
- Enable advisors to manage services without platform support intervention
- Reduce accidental service deletions (deactivate first, delete if really needed)

**Strategic alignment:**
- Self-service marketplace management (advisor autonomy)
- Data preservation for future analytics and AI features (recommendation engines need history)
- Flexibility supports advisor lifecycle (seasonal, capacity-based, evolving services)
- Reduces support burden (advisors manage own visibility)

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** advisor has draft service with all required fields completed and profile status = "Approved",
   **When** advisor clicks "Activate Service" button from preview or draft editing,
   **Then** system validates all requirements (required fields, profile approval, policies configured), changes service status to "Active", and displays confirmation "Service activated and published to marketplace. Families can now discover and book this service."

2. **Given** advisor attempts to activate service but profile status ≠ "Approved",
   **When** advisor clicks "Activate Service",
   **Then** system blocks activation and displays error message: "Complete profile approval to activate services. Status: [Pending Review | Rejected]. [View Profile Status]" with link to profile page.

3. **Given** advisor attempts to activate service but service policies not configured,
   **When** advisor clicks "Activate Service",
   **Then** system blocks activation and displays error: "Configure your service policies before activating. [Configure Now]" with button opening policies modal.

4. **Given** advisor has active service visible in marketplace,
   **When** advisor navigates to service in dashboard and clicks "Deactivate" action,
   **Then** system displays confirmation dialog: "Deactivate '[Service Name]'? Service will be hidden from marketplace. Existing bookings remain active. You can reactivate later." with [Cancel] [Deactivate Service] buttons.

5. **Given** advisor confirms service deactivation,
   **When** deactivation processes,
   **Then** system changes service status to "Inactive", removes from marketplace search/browse immediately, displays confirmation "Service deactivated. Hidden from marketplace. Existing bookings unaffected.", and moves service card to "Inactive Services" section on dashboard.

6. **Given** advisor has inactive service,
   **When** advisor views service card in Inactive section,
   **Then** service displays: "Inactive" badge (gray), service details, last active date (e.g., "Deactivated on Jan 15, 2025"), performance summary (total bookings, revenue if available), and "Reactivate" action button.

7. **Given** advisor clicks "Reactivate" on inactive service,
   **When** service is reactivated,
   **Then** system changes status to "Active", publishes to marketplace immediately, displays confirmation "Service reactivated and published to marketplace.", and moves service card to "Active Services" section.

8. **Given** advisor has active service with 3 existing bookings and deactivates it,
   **When** deactivation processes,
   **Then** system preserves all existing bookings (families can still attend scheduled sessions), prevents NEW bookings from families, and displays to families attempting to book: "This service is currently unavailable. Advisor is not accepting new bookings."

**Additional Criteria:**
- [ ] Activation timestamp recorded for analytics (activated_at field)
- [ ] Deactivation timestamp recorded (deactivated_at field)
- [ ] Activation/deactivation actions logged in audit trail with advisor ID and reason (optional reason field in confirmation)
- [ ] Inactive services retain all data: service details, pricing, historical bookings, performance metrics, client reviews
- [ ] Reactivation uses current service configuration (any edits made while inactive take effect on reactivation)
- [ ] Services can be activated/deactivated unlimited times
- [ ] Dashboard sections dynamically update counts: "Active (3)" → "Active (2), Inactive (1)" after deactivation

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Figma: [Link to activation/deactivation flows - to be added]
- Screenshot: [To be attached]

**User Flow - Activation:**
1. Advisor has draft service "Strategic Planning Workshop" fully configured, profile approved
2. Views preview, satisfied with service appearance
3. Clicks prominent "Activate Service" button (primary style, green/blue)
4. System validates: Profile approved ✓, Policies configured ✓, Required fields complete ✓
5. Brief loading indicator (< 1 second)
6. Success confirmation toast: "✓ Service activated and published to marketplace"
7. Page refreshes/updates showing service in "Active Services" section
8. Service card displays: "Active" badge (green), service details, "0 bookings" (new service), Actions: [Edit] [Deactivate] buttons

**User Flow - Activation Blocked:**
1. Advisor with profile status = "Pending Review" attempts to activate service
2. Clicks "Activate Service" button
3. System checks profile status → Pending Review (not Approved)
4. Error modal displays:
   - Icon: Warning (⚠️)
   - Title: "Profile Approval Required"
   - Message: "Complete profile approval to activate services. Current status: Pending Review."
   - Button: [View Profile Status] (links to profile page)
   - Secondary button: [Close]
5. Advisor clicks [View Profile Status] → navigates to profile status page showing approval timeline

**User Flow - Deactivation:**
1. Advisor has active service "Family Mediation" with 3 completed bookings, 1 upcoming booking
2. Reaches capacity, wants to pause accepting new clients
3. Navigates to "Active Services" section, finds service card
4. Clicks "Deactivate" button (secondary style, gray/orange)
5. Confirmation modal displays:
   - Title: "Deactivate 'Family Mediation'?"
   - Message: "Service will be hidden from marketplace. Your 1 existing booking remains active. You can reactivate this service anytime."
   - Optional: Reason dropdown (optional): "At capacity", "Seasonal break", "Service update", "Other"
   - Buttons: [Cancel] [Deactivate Service] (destructive style, orange)
6. Advisor selects reason "At capacity", clicks "Deactivate Service"
7. System processes: status → Inactive, removes from marketplace
8. Confirmation toast: "✓ Service deactivated. Hidden from marketplace."
9. Dashboard updates: Service moves from "Active (3)" to "Inactive (1)" section
10. Service card in Inactive section shows: "Inactive" badge, last active date, total stats (4 bookings, $12,000 revenue), [Reactivate] button

**User Flow - Reactivation:**
1. Advisor returns from vacation, capacity available
2. Navigates to "Inactive Services" section
3. Finds "Family Mediation" service card
4. Clicks "Reactivate" button (primary style)
5. Optional confirmation: "Reactivate 'Family Mediation'? Service will be published to marketplace immediately."
6. Advisor confirms
7. System processes: status → Active, publishes to marketplace
8. Confirmation toast: "✓ Service reactivated and published to marketplace"
9. Dashboard updates: Service moves back to "Active (4)" section
10. Service card displays "Active" badge, updated "Last activated: Today" timestamp

---

## 🔐 Business Rules

**Validation Rules:**
1. **Activation requirements** (ALL must be true):
   - Service status = "Draft" (not already Active)
   - Advisor profile status = "Approved"
   - Service policies configured (notice period and capacity)
   - All required service fields completed (type, name, short description, pricing, duration)
2. **Activation effects**:
   - Service status changes from "Draft" to "Active"
   - Service immediately searchable and bookable in marketplace
   - Service appears in marketplace search results, browse listings, advisor profile
3. **Deactivation requirements**:
   - Service status = "Active" (can't deactivate Draft or already Inactive)
   - Confirmation required (prevent accidental deactivation)
4. **Deactivation effects**:
   - Service status changes from "Active" to "Inactive"
   - Service immediately removed from marketplace (search, browse, advisor profile public view)
   - Existing scheduled bookings preserved and remain active
   - NEW bookings blocked (families cannot book deactivated service)
   - Service data, historical bookings, performance metrics, reviews retained
5. **Reactivation requirements**:
   - Service status = "Inactive"
   - Advisor profile still "Approved" (if rejected, block reactivation)
   - Service policies still configured (if deleted, require reconfiguration)
6. **Reactivation effects**:
   - Service status changes from "Inactive" to "Active"
   - Service immediately published to marketplace
   - Uses current service configuration (any edits made while inactive take effect)

**Authorization:**
- **Who can perform this action:** 
  - Activation: Advisors with profile status = "Approved" only
  - Deactivation: Any advisor owning the active service
  - Reactivation: Advisors with profile still "Approved"
- **Who can view results:** Advisor sees status changes in dashboard, families see marketplace availability changes

**Edge Cases:**
- **Advisor activates service, profile gets rejected later**: Active services automatically deactivated by system, advisor notified: "Your profile approval was revoked. All services deactivated pending re-approval."
- **Advisor deactivates all services**: Marketplace shows "No services available from this advisor" with option to view inactive services (for admin only)
- **Advisor deactivates service with many bookings (e.g., 50 future bookings)**: System allows deactivation but displays extra confirmation: "This service has 50 scheduled bookings. Are you sure you want to prevent new bookings?"
- **Advisor reactivates service with outdated pricing**: Reactivation uses current saved pricing (advisor should review/edit before reactivating if needed)
- **Service deactivated for 2 years, advisor reactivates**: System allows, service republished with current configuration
- **Marketplace snapshot timing**: Deactivation removes from search immediately (real-time), families mid-booking see "Service unavailable" if they try to complete booking

---

## 🧪 Test Scenarios

**Happy Path - Activation:**
1. Advisor "Jane Smith" has draft service "Governance Consulting" fully configured
2. Profile status = "Approved", service policies configured (notice: 48 hours, capacity: 5)
3. Reviews preview, clicks "Activate Service"
4. System validates all requirements → Pass
5. Service status changes: Draft → Active
6. Confirmation displays: "✓ Service activated and published to marketplace"
7. Dashboard updates: "Active Services (1)", service card shows "Active" badge
8. Expected result: Service visible in marketplace, families can discover and book

**Happy Path - Deactivation:**
1. Advisor "John Doe" has active service "Family Mediation" with 1 future booking, 5 completed bookings
2. Reaches capacity, wants to pause new bookings
3. Clicks "Deactivate" on service card
4. Confirmation modal displays with message about existing booking
5. Selects reason "At capacity", confirms deactivation
6. Service status changes: Active → Inactive
7. Confirmation: "✓ Service deactivated. Hidden from marketplace."
8. Dashboard updates: "Active (0), Inactive (1)"
9. Family with existing booking can still attend scheduled session
10. New families cannot find/book service in marketplace
11. Expected result: Service hidden, existing booking preserved

**Happy Path - Reactivation:**
1. Advisor "Jane Smith" returns from break, has inactive service "Succession Planning"
2. Service was deactivated 30 days ago
3. Navigates to "Inactive Services" section
4. Clicks "Reactivate" on service card
5. Optional confirmation: "Reactivate? Service will be published immediately."
6. Confirms reactivation
7. Service status changes: Inactive → Active
8. Confirmation: "✓ Service reactivated and published to marketplace"
9. Dashboard updates: "Active (1), Inactive (0)"
10. Service reappears in marketplace search/browse
11. Expected result: Service visible and bookable again

**Negative Tests:**
1. **Activation blocked - Profile not approved**:
   - Advisor profile status = "Pending Review"
   - Attempts to activate service
   - System displays error modal: "Complete profile approval to activate services. Status: Pending Review. [View Profile Status]"
   - Activation blocked, service remains Draft

2. **Activation blocked - Policies not configured**:
   - Advisor has no service policies set
   - Attempts to activate service
   - System displays error: "Configure your service policies before activating. [Configure Now]"
   - Opens policies modal on click, activation blocked until policies saved

3. **Deactivation canceled**:
   - Advisor clicks "Deactivate"
   - Confirmation modal displays
   - Advisor reconsiders, clicks "Cancel"
   - Modal closes, service remains Active, no changes

4. **Network error during activation**:
   - Advisor clicks "Activate Service"
   - Network connection lost mid-request
   - System displays error: "Unable to activate service. Check connection and try again."
   - Service remains Draft, advisor can retry

**Edge Cases:**
1. **Deactivate service with many bookings**:
   - Service has 50 future scheduled bookings
   - Advisor clicks "Deactivate"
   - Extra confirmation: "This service has 50 scheduled bookings. Deactivating prevents only NEW bookings. Existing bookings remain active. Proceed?"
   - Advisor confirms
   - Service deactivated, all 50 bookings preserved, families notified "Service deactivated but your booking is confirmed"

2. **Reactivate service after profile rejection and re-approval**:
   - Service was active
   - Advisor profile rejected → service auto-deactivated
   - Advisor resubmits profile, gets re-approved
   - Attempts to reactivate service
   - System validates current profile status = "Approved"
   - Reactivation succeeds

3. **Rapid activate/deactivate cycling**:
   - Advisor activates service
   - Immediately deactivates (within seconds)
   - Marketplace removes service real-time
   - Advisor reactivates again immediately
   - System allows (no rate limiting in Phase 1), logs all actions in audit trail

4. **Advisor edits inactive service, then reactivates**:
   - Service "Mediation" deactivated, had pricing $500/session
   - While inactive, advisor edits pricing to $600/session
   - Advisor reactivates service
   - Marketplace shows updated pricing ($600), not old price ($500)
   - Result: Reactivation uses current saved configuration

**Test Cases Location:** `Knowledge-Base/product-management/test-cases/EPIC-ADV-SERV-001-test-cases.md`

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** 
  - FG-STORY-ADV-SERV-001 (Create Service Offering) - needs service creation
  - FG-STORY-ADV-SERV-002 (Configure Service Policies) - activation requires policies
  - FG-STORY-ADV-SERV-005 (Save as Draft) - drafts must exist to activate
  - Profile approval workflow - must be operational for activation gating
- **Blocks:** 
  - Marketplace search/browse features - depends on Active service status
  - Booking system epic - depends on deactivation blocking new bookings
  - FG-STORY-ADV-SERV-008 (Edit Active Services) - can edit while active or inactive

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Activation time: < 2 seconds (includes marketplace index update)
- Deactivation time: < 1 second (removes from marketplace)
- Reactivation time: < 2 seconds
- Marketplace search refresh: < 5 seconds to reflect activation/deactivation
- Dashboard status update: Real-time (< 500ms)

**Security:**
- Authorization required: Yes (valid advisor JWT token)
- Profile approval validation: Server-side enforcement (not just UI disable)
- Audit trail: All activation/deactivation actions logged with timestamp, advisor ID, IP address
- Existing bookings protection: System prevents accidental deletion/cancellation during deactivation

**Accessibility:**
- WCAG level: AA compliance
- Keyboard navigation: Tab to "Activate"/"Deactivate" buttons, Enter to confirm
- Screen reader: Announces status changes "Service activated" / "Service deactivated"
- Confirmation modals: Focus trapped in modal until action taken
- Status indicators: "Active"/"Inactive" badges use both color AND text/icon (not color-dependent)

**Browser Support:**
- Same as Story 1 (Chrome, Safari, Firefox, Edge latest 2 versions)
- Confirmation modals use native dialogs or polyfill for older browsers

---

## 📝 Notes

**Questions:**
- [ ] Should we add activation scheduling (e.g., "Activate on March 1st")? **Recommendation:** Future enhancement, not MVP
- [ ] Do we notify families when advisor deactivates service they were interested in? **Recommendation:** Yes if family favorited/saved service, send notification "Service XYZ is no longer available"
- [ ] Should advisors be able to set deactivation reason visible to families? **Decision:** No for Phase 1, internal reason tracking only
- [ ] Limit how many times advisor can activate/deactivate (prevent abuse)? **Decision:** No limit in Phase 1, monitor for abuse patterns

---

**Template Version:** 1.0.0
**Story Created:** 2025-10-17