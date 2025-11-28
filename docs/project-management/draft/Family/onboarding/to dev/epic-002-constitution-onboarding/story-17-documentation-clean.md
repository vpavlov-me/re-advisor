## ðŸ"‹ STORY 17: Documentation - Constitution Setup User Guide

**Issue Type:** Story
**Project:** RLN1
**Summary:** As a product manager, I want to create user-facing documentation for constitution setup, so that users understand the process and troubleshoot issues
**Epic Link:** SAAS-EPIC-001
**Priority:** Low
**Story Points:** 3
**Sprint:** TBD

### ðŸ"– User Story

**As a** product manager,
**I want to** create comprehensive user-facing documentation explaining constitution setup process,
**so that** users can self-serve for questions and support team has resources to reference.

### ðŸŽ¯ Business Context

Reduces support burden by providing self-service resources. Increases user confidence in onboarding process. Essential for knowledge base and help center.

### âœ… Acceptance Criteria

1. **Given** user guide document is published,
   **When** users access Help Center,
   **Then** they see "Getting Started: Constitution Setup" guide with step-by-step instructions.

2. **Given** user guide includes FAQs,
   **When** users search common questions (e.g., "How to skip tour?", "What is workshop format?"),
   **Then** they find relevant answers.

3. **Given** user guide includes screenshots,
   **When** users follow instructions,
   **Then** screenshots match current UI (updated with each release).

4. **Given** user guide is linked in-app,
   **When** users click "Help" icon in wizard,
   **Then** user guide opens in new tab.

**Additional Criteria:**
- [ ] Guide sections: Registration, Carousel overview, Constitution wizard steps 1-8, Skip/Resume tour, Workshop format explanations, Troubleshooting
- [ ] Screenshots: Annotated screenshots for each step
- [ ] FAQs: 10+ common questions answered

### ðŸ" Design & UX

N/A (Documentation story)

### ðŸ"' Business Rules

**Documentation Requirements:**
1. **Clarity:** Written for non-technical users
2. **Completeness:** Covers all 8 steps in detail
3. **Visual:** Screenshots for every step
4. **Searchable:** Optimized for help center search
5. **Maintenance:** Updated with each UI change

**Authorization:**
N/A (public documentation)

**Edge Cases:**
N/A

### ðŸ§ª Test Scenarios

N/A (Documentation story)

### ðŸ"— Dependencies

**Story Dependencies:**
- **Blocked by:** RLN1-014 (All frontend stories must be complete to capture final UI screenshots)
- **Blocks:** None (documentation story, not blocking development)

### âš ï¸ Non-Functional Requirements

**Documentation Format:**
- Platform: Help Center (Intercom, Zendesk, or custom)
- Format: HTML with embedded images/videos
- Accessibility: WCAG AA compliant

**Maintenance:**
- Review cycle: After every UI change
- Screenshot updates: Automated via Playwright (capture latest UI)

---
