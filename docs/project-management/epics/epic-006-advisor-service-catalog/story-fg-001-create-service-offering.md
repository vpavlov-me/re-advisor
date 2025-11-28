# User Story 1: Create Service Offering with Complete Configuration

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As a Consultant, I want to create complete service offering with type, pricing, and duration
**Epic Link:** EPIC-006 - Advisor Service Catalog & Package Builder
**Priority:** High
**Story Points:** [To be estimated during grooming]
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consultant,
**I want to** create complete service offering by selecting service type from predefined options, configuring pricing model with amount, and defining session duration,
**so that** families can understand exactly what service I provide, see transparent pricing, and know the time commitment required for engagement.

---

## 🎯 Business Context

**Why is this Story important?**

This is the core service creation capability enabling advisors to build their marketplace presence. Without ability to create well-structured service offerings, advisors cannot participate in marketplace and families cannot discover/book services.

**User pain point being solved:**
- Advisors struggle to communicate service value clearly to potential clients
- Families cannot compare services without standardized structure
- Unclear pricing creates friction in booking decisions

**Business outcome expected:**
- Build marketplace inventory with structured, comparable service offerings
- Enable advisor self-service onboarding reducing manual support
- Create foundation for transaction-based revenue model

**Strategic alignment:**
- Core MVP capability for advisor marketplace launch
- Enables both independent advisors and Family Council invited advisors to define services
- Creates data structure for future AI-powered matching algorithms

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** advisor is logged into Advisor Portal and navigates to "My Services" section,
   **When** advisor clicks "Add Service" button,
   **Then** service creation form displays with service type selection as first step.

2. **Given** advisor is on service creation form,
   **When** advisor selects service type from predefined options (Governance Support, Consultation, One-Time Engagement, Education, Mentorship, Mediation, Other),
   **Then** system displays selected type with description and proceeds to service details.

3. **Given** advisor has selected service type,
   **When** advisor enters service name (5-100 characters), short description (50-200 characters), and optional detailed description (200-1,000 characters),
   **Then** system validates character counts and shows remaining characters as advisor types.

4. **Given** advisor is configuring pricing,
   **When** advisor selects pricing model from dropdown (Hourly Rate, Fixed Package, Monthly Retainer, Per Session),
   **Then** system displays model-specific fields (e.g., minimum hours for Hourly Rate, contract term for Retainer).

5. **Given** advisor has selected pricing model,
   **When** advisor enters pricing amount in USD,
   **Then** system validates amount is positive integer or zero (free consultation allowed) and shows clear error if invalid.

6. **Given** advisor is configuring session duration,
   **When** advisor enters number of hours for session duration,
   **Then** system validates input is positive number and displays duration in readable format (e.g., "2 hours").

7. **Given** advisor has completed all required fields (type, name, short description, pricing model, pricing amount, session duration),
   **When** advisor clicks "Continue" or "Next",
   **Then** system validates all fields and either proceeds to next step or displays validation errors with clear instructions.

8. **Given** advisor has validation errors,
   **When** system displays error messages,
   **Then** errors are shown inline next to relevant fields with specific guidance (e.g., "Short description must be at least 50 characters. Currently 32 characters.").

**Additional Criteria:**
- [ ] Service type dropdown includes all 7 predefined types with descriptions visible on hover or click
- [ ] Pricing model selection updates form dynamically showing only relevant fields
- [ ] Character count indicators update in real-time as advisor types
- [ ] Form supports "Save Progress" functionality (covered in Story 5)
- [ ] Form validation prevents proceeding with incomplete required fields
- [ ] All fields support standard accessibility requirements (keyboard navigation, screen reader compatibility)

---

## 🎨 Design & UX

**Mockups/Wireframes:**
- Figma: [Link to service creation form mockup - to be added]
- Screenshot: [To be attached]

**User Flow:**
1. Advisor clicks "Add Service" button on services dashboard
2. Step 1: Service type selection screen displays with visual cards showing type icons, names, and descriptions
3. Advisor clicks service type card - card highlights to show selection
4. Step 2: Service details form displays with fields for name, short description, detailed description
5. Character counters update in real-time below each text field
6. Step 3: Pricing configuration displays pricing model dropdown
7. Upon selecting model, conditional fields appear (e.g., "Minimum hours" for Hourly Rate)
8. Step 4: Session duration configuration with number input and unit selector (hours)
9. Form progress indicator shows completion status (e.g., "Step 2 of 5")
10. "Back" button allows returning to previous steps, "Continue" validates and proceeds
11. Validation errors display inline with red text and icons next to problematic fields

---

## 🔐 Business Rules

**Validation Rules:**
1. **Service name**: Required, 5-100 characters, alphanumeric with spaces and common punctuation allowed
2. **Short description**: Required, 50-200 characters, used for search results and service cards
3. **Detailed description**: Optional, 200-1,000 characters if provided, supports basic formatting (line breaks, bullets)
4. **Service type**: Required, selection from 7 predefined types only (no custom types in Phase 1)
5. **Pricing model**: Required, selection from 4 models (Hourly Rate, Fixed Package, Monthly Retainer, Per Session)
6. **Pricing amount**: Required, must be positive integer or zero (0 for free consultation), USD only, no decimals in Phase 1
7. **Hourly Rate specific**: Requires "Minimum hours" field (default: 1 hour, must be positive integer)
8. **Monthly Retainer specific**: Requires "Contract term" field (e.g., "3 months minimum", text field)
9. **Session duration**: Required, positive number of hours (decimals allowed for 0.5, 1.5 hours, etc.)

**Authorization:**
- **Who can perform this action:** Any logged-in advisor with active account (no profile approval required for creation, but approval required for activation)
- **Who can view results:** Advisor who created service (in dashboard), Platform Administrators (for moderation)

**Edge Cases:**
- **Advisor abandons form mid-creation**: Auto-save draft if "Save Progress" clicked, otherwise data lost (covered in Story 5)
- **Advisor tries to create service identical to existing one**: System allows (advisors may offer same service with different pricing or terms)
- **Pricing amount = 0**: System allows and labels as "Free Consultation" in marketplace
- **Very long service names or descriptions**: Character limits enforced with hard stop at maximum
- **Special characters in text fields**: Basic validation allows common punctuation, prevents SQL injection attempts

---

## 🧪 Test Scenarios

**Happy Path:**
1. Advisor logs in, navigates to "My Services", clicks "Add Service"
2. Selects "Consultation" service type, sees description, clicks Continue
3. Enters service name "Strategic Governance Review" (27 chars)
4. Enters short description "Comprehensive review of your family's governance structure with actionable recommendations" (90 chars)
5. Enters detailed description with 250 characters outlining deliverables
6. Selects pricing model "Fixed Package"
7. Enters pricing amount "5000" (USD)
8. Enters session duration "4" hours
9. Clicks Continue, form validates successfully
10. Expected result: Proceeds to next configuration step (service policies - covered in Story 2)

**Negative Tests:**
1. **Short description too short**: Advisor enters 30 characters, clicks Continue → System displays error: "Short description must be at least 50 characters. Currently 30 characters."
2. **Missing required field**: Advisor leaves pricing amount blank, clicks Continue → System displays error: "Pricing amount is required. Enter amount in USD or 0 for free consultation."
3. **Invalid pricing format**: Advisor enters "1500.50" → System displays error: "Pricing must be whole number (no decimals). Enter 1500 or 1501."
4. **Negative session duration**: Advisor enters "-2" hours → System displays error: "Session duration must be positive number."
5. **No service type selected**: Advisor tries to skip type selection → Continue button remains disabled with tooltip "Select service type to continue"

**Edge Cases:**
1. **Free consultation**: Advisor enters "0" for pricing → System accepts and displays "Free Consultation" label in preview
2. **Maximum character limits**: Advisor enters exactly 100 characters for name, 200 for short description → System accepts without error
3. **Hourly Rate with high minimum hours**: Advisor selects Hourly Rate, enters 10 minimum hours → System accepts and calculates total (e.g., "$200/hour × 10 hours minimum = $2,000 minimum engagement")
4. **Browser back button during creation**: Advisor clicks browser back → System warns "Unsaved changes will be lost. Continue?" with option to cancel

**Test Cases Location:** `Knowledge-Base/product-management/test-cases/EPIC-ADV-SERV-001-test-cases.md`

---

## 🔗 Dependencies

**Story Dependencies:**
- **Blocked by:** None (first story in epic, depends only on Epic-level dependencies: advisor portal operational, advisor authentication)
- **Blocks:** 
  - FG-STORY-ADV-SERV-002 (Configure Service Policies) - needs service creation capability
  - FG-STORY-ADV-SERV-004 (Preview Service) - needs service data to preview
  - FG-STORY-ADV-SERV-005 (Save as Draft) - saves data created in this story

---

## ⚠️ Non-Functional Requirements (Briefly)

**Performance:**
- Form render time: < 1 second on initial load
- Form validation response: < 100ms per field
- Character counter update: Real-time (< 50ms debounce)
- Max concurrent users: Support 100+ advisors creating services simultaneously

**Security:**
- Authorization required: Yes (valid advisor JWT token)
- Data encryption: Standard HTTPS, no PII in this form (PII in profile only)
- Input sanitization: All text fields sanitized to prevent XSS attacks
- CSRF protection: Form submissions include CSRF token

**Accessibility:**
- WCAG level: AA compliance
- Keyboard navigation: Required - full form navigable via Tab/Shift+Tab
- Screen reader support: Required - all fields labeled, validation errors announced
- Focus indicators: Clear visual indicators for focused fields
- Error announcements: Screen readers announce validation errors immediately

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Edge: Latest 2 versions
- Mobile: iOS Safari, Android Chrome (responsive design)

---

## 📝 Notes

**Questions:**
- [ ] Should we support rich text formatting (bold, italic, links) in detailed description? **Impact:** +3 days development **Recommendation:** No for Phase 1, plain text with line breaks only
- [ ] Do we need inline help/tooltips explaining each service type? **Recommendation:** Yes, show on hover or info icon click
- [ ] Should session duration support half-hour increments (0.5, 1.5 hours)? **Decision:** Yes, decimals allowed for duration
- [ ] What happens if advisor starts creating service but profile is pending review? **Decision:** Allow creation, block activation only (covered in Story 6)

---

**Template Version:** 1.0.0
**Story Created:** 2025-10-17