# Implementation Plan: Advisor Portal to 100%

Based on the analysis of the current codebase against the project Epics, here is the status and the plan to reach 100% implementation.

## 1. Gap Analysis

| Epic | Feature | Status | Gaps / Missing Items |
|------|---------|--------|----------------------|
| **Epic-025** | **Home Dashboard** | 🟢 90% | • "Recent Messages" is hardcoded.<br>• "Quick Actions" links need to be verified against existing routes.<br>• "Onboarding Banner" logic is static. |
| **Epic-006** | **Service Catalog** | 🟢 85% | • Validation logic for service creation.<br>• "Duration" field might need more complex options (e.g. custom duration). |
| **Epic-013** | **Family Workspace** | 🟡 80% | • The "Workspace Modal" shell exists, but the content for **Tasks**, **Services**, and **Consultations** tabs needs to be fully implemented with mock data and interactions.<br>• "Overview" tab needs to be fully fleshed out. |
| **Epic-008** | **Knowledge Center** | 🟡 70% | • **CRITICAL:** The "Constitution Template" type is listed but lacks the specific 12-section editor required by Epic-010.<br>• "Share" functionality is a mock dialog. |
| **Epic-010** | **Constitution Template** | 🔴 0% | • **MISSING:** A dedicated editor/builder for Constitution Templates with the 12 predefined sections (Vision, Values, Governance, etc.). |
| **Epic-027** | **Advisor Onboarding** | 🟢 90% | • UI is present on Home. Needs to ensure clicking steps navigates to the correct pages (e.g. `/profile`, `/services`). |

## 2. Action Plan

### Phase 1: Critical Features (The "Missing" Pieces)

#### 1.1 Implement Constitution Template Editor (Epic-010)
**Goal:** Allow advisors to create/edit constitution templates with 12 specific sections.
- **Create Page:** `src/app/knowledge/constitution/create/page.tsx` (and `[id]/page.tsx` for edit).
- **UI Components:**
    - Accordion/Wizard for the 12 sections (Vision, Values, Governance Structure, etc.).
    - Rich Text Editor (or simple Textarea for MVP) for each section.
    - "Save as Draft" and "Save Template" actions.
- **Integration:** Update `src/app/knowledge/page.tsx` "Create Resource" dialog to redirect to this new page when "Constitution Template" is selected.

#### 1.2 Complete Family Workspace (Epic-013)
**Goal:** Make the Family Workspace modal fully functional (mocked).
- **File:** `src/app/families/page.tsx`
- **Tasks Tab:** Implement list of advisor tasks for this family (Add/Edit/Complete).
- **Services Tab:** Show active services, proposals, and history for this family.
- **Consultations Tab:** Show past and upcoming meetings with this family.

### Phase 2: Navigation & Polish

#### 2.1 Connect Onboarding Flow (Epic-027)
- **File:** `src/app/page.tsx`
- **Action:** Ensure the `OnboardingCard` components link to:
    - "Basic Profile" -> `/profile` (or `/settings/profile`)
    - "Services & Pricing" -> `/services`
    - "Payments" -> `/payments` (or `/settings/payments`)

#### 2.2 Home Dashboard Polish (Epic-025)
- **File:** `src/app/page.tsx`
- **Action:** Ensure "Quick Actions" buttons link to valid routes.
- **Action:** Verify "Recent Messages" "View All" links to `/messages`.

## 3. Execution Steps

1.  **Create Constitution Editor Page:**
    - Create `src/app/knowledge/constitution/create/page.tsx`.
    - Implement the 12-section editor.
2.  **Update Knowledge Center:**
    - Modify `src/app/knowledge/page.tsx` to link to the editor.
3.  **Enhance Family Workspace:**
    - Update `src/app/families/page.tsx` to fill in the missing tabs.
4.  **Verify Navigation:**
    - Click through the app to ensure all links work.
