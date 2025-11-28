# User Story 4: Preview Service as Marketplace Listing

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Consultant, I want to preview service as families will see it before activation
**Epic Link:** EPIC-006 - Advisor Service Catalog & Package Builder
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant,
**I want to** preview my service exactly as families will see it in marketplace before activating,
**so that** I ensure presentation quality, accuracy, professional appearance, and compelling messaging before going live to potential clients.

---

## 🎯 Business Context

**Why is this Story important?**

Service preview is critical quality gate before publication. Advisors need confidence their services will appear professional and compelling in marketplace. Poor-quality listings hurt both individual advisor success and overall marketplace credibility.

**User pain point being solved:**
- Advisors unsure how their service descriptions will appear to families
- Fear of making mistakes visible in live marketplace (pricing errors, typos, formatting issues)
- Difficulty visualizing how all configured elements (type, pricing, duration, policies) combine into final listing

**Business outcome expected:**
- Higher quality marketplace listings (fewer errors, more professional)
- Increased advisor confidence in service publication
- Reduced post-activation edits and support requests
- Better first impression for families browsing marketplace

**Strategic alignment:**
- Quality control mechanism for marketplace inventory
- Reduces platform moderation burden (advisors self-correct before publication)
- Improves conversion rates (better listings → more bookings)
- Sets professional standard for marketplace quality

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** advisor has completed service configuration (type, details, pricing, duration, policies inherited),
   **When** advisor reaches final step in service creation flow,
   **Then** system displays "Preview" section showing service card exactly as it will appear in marketplace with label "This is how families will see your service".

2. **Given** advisor views service preview,
   **When** preview renders,
   **Then** preview includes all configured elements: Service type badge, Service name, Short description, Pricing display (with model and amount formatted), Session duration, Notice period (inherited from policies), and visual design matching actual marketplace cards.

3. **Given** advisor views preview with Hourly Rate pricing model,
   **When** pricing displays,
   **Then** system shows: "$200 per hour (2 hour minimum)" clearly formatted.

4. **Given** advisor views preview with Fixed Package pricing,
   **When** pricing displays,
   **Then** system shows: "$5,000 Fixed Package" clearly formatted.

5. **Given** advisor views preview with Monthly Retainer pricing,
   **When** pricing displays,
   **Then** system shows: "$3,000 per month (3 month minimum commitment)" clearly formatted.

6. **Given** advisor views preview with Per Session pricing,
   **When** pricing displays,
   **Then** system shows: "$500 per session (2 hours)" clearly formatted.

7. **Given** advisor identifies error or improvement needed while viewing preview,
   **When** advisor clicks "Edit" button in preview section,
   **Then** system allows returning to previous configuration steps without losing data, make changes, and return to updated preview.

8. **Given** advisor is satisfied with preview,
   **When** preview section displays,
   **Then** system provides clear next action buttons: "Save as Draft" and "Activate Service" (if profile approved) with "Activate" as primary action.

**Additional Criteria:**
- [ ] Preview updates in real-time as advisor edits service details (if technically feasible) OR refreshes when advisor clicks "Update Preview" button
- [ ] Preview shows placeholder professional photo if advisor hasn't uploaded one yet
- [ ] Preview includes tooltip explaining: "This preview matches marketplace appearance. Actual display may vary slightly based on device and browser."
- [ ] Mobile preview option: Toggle to show "Desktop View" vs "Mobile View" of listing
- [ ] Preview section is scrollable if content exceeds viewport (long detailed descriptions)

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Figma: [Link to service preview component - to be added]
- Screenshot: [To be attached]

**User Flow:**
1. Advisor completes service configuration (all required fields filled)
2. Service creation form transitions to "Preview & Publish" step
3. Page displays two columns (desktop) or stacked sections (mobile):
   - Left: Service configuration summary (editable fields)
   - Right: Preview panel with header "Marketplace Preview - How families see your service"
4. Preview panel shows:
   - Service type badge (colored, top-left)
   - Service name as headline (H2 style)
   - Advisor photo placeholder or actual photo (circular, 64px)
   - Short description text
   - Pricing prominent (large font, bolded amount)
   - Session duration icon + text (e.g., "🕒 2 hours")
   - Notice period icon + text (e.g., "⏰ 48 hours notice required")
   - Optional detailed description (expandable "Read more" if long)
5. Below preview: 
   - "Edit Service" button (secondary style)
   - "Save as Draft" button (secondary style)
   - "Activate Service" button (primary style, prominent)
6. Advisor clicks "Edit Service" → returns to configuration form, can change any field
7. After edit, preview updates automatically OR shows "Update Preview" button
8. Advisor satisfied → clicks "Activate Service" (if profile approved) or "Save as Draft"

**Key Design Principles:**
- **Exact marketplace match**: Preview uses IDENTICAL CSS/styling as actual marketplace cards
- **Mobile toggle**: Button to switch between desktop/mobile preview (important for responsive design)
- **Contextual help**: Tooltip explaining preview purpose and accuracy
- **Clear actions**: Primary action (Activate or Save Draft) visually dominant
- **Error prevention**: Preview catches formatting issues before publication
- **Professional appearance**: Clean, modern design matching marketplace aesthetic

---

## 🔐 Business Rules

**Validation Rules:**
1. **Preview availability**: Preview only available after all required fields completed
2. **Content accuracy**: Preview must exactly match marketplace rendering (no discrepancies)
3. **Pricing format**: Different pricing models display with specific formats:
   - Hourly: "$[rate] per hour ([min hours] hour minimum)"
   - Fixed: "$[amount] Fixed Package"
   - Retainer: "$[amount] per month ([term] minimum commitment)"
   - Per Session: "$[amount] per session ([duration] hours)"
4. **Notice period display**: Always shows inherited policy with format: "[X] hours/days notice required"
5. **Truncation rules**: If short description exceeds card space (e.g., >200 chars), truncate with "..." and "Read more" expansion
6. **Free consultation handling**: If price = $0, displays "Free Consultation" instead of "$0"

**Authorization:**
- **Who can perform this action:** Any advisor creating or editing service (same permissions as service creation)
- **Who can view results:** Only advisor creating/editing service sees preview (not visible to families until activated)

**Edge Cases:**
- **Very long service name (near 100 char limit)**: Preview shows truncation if needed, tooltip shows full name on hover
- **No advisor photo uploaded**: Preview shows professional placeholder avatar with advisor initials
- **Detailed description not provided (optional)**: Preview hides detailed description section entirely
- **Browser doesn't support preview fonts**: Graceful degradation to system fonts
- **Preview rendering error**: Display fallback message: "Preview unavailable. Service will appear in marketplace after activation." with option to proceed anyway

---

## 🧪 Test Scenarios

**Happy Path:**
1. Advisor creates "Strategic Governance Consultation" service
2. Completes all configuration:
   - Type: Consultation
   - Name: "Strategic Governance Review"
   - Short desc: "Comprehensive review of your family governance structure with actionable recommendations" (90 chars)
   - Detailed desc: 300 chars explaining process and deliverables
   - Pricing: Fixed Package, $5,000
   - Duration: 4 hours
   - Notice period: 48 hours (inherited)
3. Reaches Preview step
4. Sees marketplace card preview displaying:
   - "Consultation" badge (blue)
   - "Strategic Governance Review" headline
   - Advisor photo (or placeholder)
   - Short description text
   - "$5,000 Fixed Package" in large font
   - "🕒 4 hours | ⏰ 48 hours notice"
   - "Read more" link expanding to show detailed description
5. Toggle to "Mobile View" → preview reformats for mobile card layout
6. Satisfied with appearance → clicks "Activate Service" button
7. Expected result: Service published to marketplace, preview matches actual listing exactly

**Negative Tests:**
1. **Preview attempted before all fields completed**: System disables preview section with message "Complete all required fields to see preview"
2. **Network error loading preview**: System displays "Unable to load preview. Check connection and try again." with retry button
3. **Browser blocks preview (old browser)**: System shows fallback text version of service details with note: "Graphical preview unavailable. Service will appear as shown in marketplace after activation."

**Edge Cases:**
1. **Free consultation (price = $0)**:
   - Advisor creates service with $0 pricing
   - Preview displays "Free Consultation" badge/text instead of "$0"
   - Clear messaging: "No charge for this service"

2. **Very long detailed description (950 chars)**:
   - Preview shows first 200 chars in collapsed state
   - "Read more" link expands to full description
   - "Read less" collapses back
   - Scrolling within preview card if needed

3. **Hourly Rate with high minimum hours**:
   - Pricing: $200/hour, 10 hour minimum
   - Preview displays: "$200 per hour (10 hour minimum)"
   - Below in smaller text: "Minimum engagement: $2,000"
   - Clear calculation helps families understand commitment

4. **Mobile view with long service name**:
   - Service name: "Comprehensive Multi-Generational Family Governance Strategy Development and Implementation" (90 chars)
   - Desktop preview: Shows full name, wraps to 2 lines
   - Mobile preview: Truncates to 1 line with "..." and full name on tap/hover

5. **No advisor photo uploaded**:
   - Preview shows circular placeholder with advisor initials (e.g., "JD" for John Doe)
   - Professional gradient background
   - Tooltip: "Upload profile photo to appear here"

**Test Cases Location:** `Knowledge-Base/product-management/test-cases/EPIC-ADV-SERV-001-test-cases.md`

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** 
  - FG-STORY-ADV-SERV-001 (Create Service Offering) - needs complete service data to preview
  - FG-STORY-ADV-SERV-002 (Configure Service Policies) - needs policies for notice period display
  - Marketplace UI component development - needs actual marketplace card component to reuse
- **Blocks:** 
  - FG-STORY-ADV-SERV-006 (Activate Services) - activation typically follows preview review

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Preview render time: < 1 second after all fields completed
- Preview update after edit: < 500ms (real-time) or instant on "Update Preview" click
- Mobile/Desktop toggle: < 200ms transition
- Image loading (advisor photo): < 2 seconds or show placeholder immediately

**Security:**
- Authorization required: Yes (valid advisor JWT token)
- Preview data: Not cached on client (refresh each time to ensure accuracy)
- No sensitive data exposed in preview (all already entered by advisor)

**Accessibility:**
- WCAG level: AA compliance
- Keyboard navigation: Tab through preview elements, Enter to expand "Read more"
- Screen reader: Announces "Marketplace preview of your service listing" and reads all elements in logical order
- Focus indicators: Clear visual indicators when preview elements focused
- Alternative text: Advisor photo placeholder includes alt text "Advisor profile photo"

**Browser Support:**
- Same as Story 1 (Chrome, Safari, Firefox, Edge latest 2 versions)
- Preview uses CSS Grid/Flexbox for layout (modern browsers)
- Graceful degradation: Falls back to text summary if browser doesn't support advanced CSS

---

## 📝 Notes

**Questions:**
- [ ] Should preview include interactive elements (e.g., clickable "Contact Advisor" button that doesn't actually function)? **Recommendation:** No, keep preview static to avoid confusion. Label clearly as "Preview Only"
- [ ] Do we need A/B test different preview layouts to optimize conversion? **Recommendation:** Future enhancement, launch with single layout first
- [ ] Should preview show advisor rating/reviews (when that feature exists)? **Decision:** Yes when reviews implemented, placeholder showing "New advisor - No reviews yet" for now
- [ ] How to handle very old browsers that don't render preview correctly? **Decision:** Show text fallback with disclaimer, allow proceeding to activation anyway

---

**Template Version:** 1.0.0
**Story Created:** 2025-10-17