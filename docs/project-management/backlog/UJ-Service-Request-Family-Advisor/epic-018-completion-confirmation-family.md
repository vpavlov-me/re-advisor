# EPIC-018F: Service Completion Confirmation (Family Side)

## 📋 Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** Service Completion Review & Confirmation for Families  
**Summary:** Enable families to review completed services, evaluate deliverables, provide feedback, and confirm satisfaction to close engagements  
**Parent User Journey:** JRN-FAM-002 - Family Marketplace Service Booking (Stage 7)  
**Priority:** Critical  
**Epic Link:** FG-EPIC-018F  
**Related Epic:** FG-EPIC-018A (Consultant service delivery)

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Enable Admin and Family Council to review consultant's completion summary, verify all deliverables received, evaluate service quality, provide feedback, and formally confirm completion to trigger final payment and service closure. This Epic delivers the family's service acceptance workflow.

**User-facing value:**
- Families receive clear notification when services ready for review
- Families can thoroughly evaluate all deliverables before confirming
- Families can request revisions if issues found during review
- Families provide feedback that helps consultants improve
- Families maintain control over final acceptance and payment

**Business value:**
- Structured review process reduces payment disputes by 85%
- Quality evaluation ensures family satisfaction before payment
- Feedback loop improves consultant quality over time
- Clear acceptance triggers smooth payment processing

**Scope boundaries:**
- **Included:** Completion notification, review interface, deliverable verification, feedback provision, confirmation workflow
- **NOT included:** Payment processing (separate), consultant access management (EPIC-019F), review/rating system (future)

---

## 👥 Target Users

**Primary Personas:**
- Admin (DOC-USR-003) - Reviews and confirms service completion
- Family Council Member (DOC-USR-002) - May review and recommend (Admin confirms)

**Secondary Personas:**
- Consultant (DOC-USR-006) - Awaits confirmation (see EPIC-018A)

---

## 📖 User Stories (High-Level)

1. **As an** Admin, **I want to** receive clear notification when consultant marks service complete, **so that** I can prioritize review and provide timely confirmation

2. **As a** Family Council member, **I want to** review consultant's completion summary and all deliverables, **so that** I can verify all work completed satisfactorily

3. **As an** Admin, **I want to** request revisions if issues found during review, **so that** consultant can address problems before final payment

4. **As an** Admin, **I want to** provide feedback on service quality, **so that** consultant knows what went well and what could improve

5. **As an** Admin, **I want to** confirm completion to trigger final payment and close service, **so that** engagement concludes professionally

---

## 🔗 Dependencies

**Upstream Dependencies:**
- EPIC-018A: Consultant Completion (service must be marked delivered)
- EPIC-016F: Deliverable Viewing (deliverables must be accessible)
- EPIC-013F: Service Request Tracking (active service required)

**Downstream Impact:**
- Payment processing (final invoice generated and paid)
- EPIC-019F: Access Management (consultant access downgraded)
- Service request closed permanently

**Technical Dependencies:**
- Completion review interface
- Feedback system
- Service request status update
- Final invoice generation
- Notification system

---

## 📐 Design & UX

**Figma Links:**
- [To be created] Completion Notification
- [To be created] Completion Review Interface
- [To be created] Confirmation Flow

**UX Notes:**

**User Flow - Receiving Completion Notification:**
1. Consultant marks service as delivered (from EPIC-018A)
2. Admin receives notification: "Service from [Consultant] is ready for your review"
3. Notification shows:
   - Service name
   - Consultant name
   - Completion date
   - Review deadline (30 days)
   - "Review Now" button
4. Click notification → Opens completion review page

**User Flow - Reviewing Completion:**
1. Completion review page opens with sections:
   - **Header:**
     - Service name and consultant
     - Status: "Awaiting Your Confirmation"
     - Review deadline countdown (e.g., "28 days remaining")
     - "You have 30 days to review and confirm"
   - **Completion Summary:** (from consultant)
     - Work Performed
     - Outcomes & Value Delivered
     - Recommendations for Next Steps
     - Final Notes
   - **Deliverables Review:**
     - List of all deliverables
     - For each: Name, category, date shared, link
     - Quick access buttons to open each
     - Checklist: "I have reviewed all deliverables"
   - **Service Performance:**
     - Original timeline vs. actual
     - Original budget vs. final
     - Amendments made (if any)
   - **Actions:**
     - "Confirm Completion" (primary button)
     - "Request Changes" (secondary button)
     - "Provide Feedback" (always available)

**User Flow - Requesting Changes:**
1. Admin clicks "Request Changes"
2. Change request modal opens:
   - "What needs to be addressed?" (required)
     - Incomplete deliverables
     - Quality issues
     - Clarification needed
     - Other (specify)
   - Detailed description (textarea, required)
   - Specific deliverables affected (multi-select)
   - "Consultant will be notified and can make revisions"
3. Clicks "Send to Consultant"
4. System processes:
   - Change request sent to consultant
   - Consultant notified
   - Service remains in "Delivered" status
   - Consultant can update deliverables
   - Family notified when consultant responds

**User Flow - Providing Feedback:**
1. Admin clicks "Provide Feedback"
2. Feedback form opens:
   - **Service Quality:** (1-5 stars, future feature - placeholder)
   - **What went well:** (textarea)
   - **What could improve:** (textarea)
   - **Would you work with this consultant again?** (Yes/No/Maybe)
   - **Optional: Testimonial** (for consultant's profile, future)
3. Clicks "Submit Feedback"
4. Feedback sent to consultant
5. Feedback preserved in service record
6. Can provide feedback before or after confirmation

**User Flow - Confirming Completion:**
1. Admin reviews everything thoroughly
2. Clicks "Confirm Completion"
3. Confirmation modal appears:
   - "Confirm service completion from [Consultant]?"
   - **Review Checklist:**
     - ☐ All deliverables received and reviewed
     - ☐ Work meets expectations and requirements
     - ☐ No outstanding issues or concerns
     - ☐ Ready to process final payment (if applicable)
   - Must check all boxes
   - **Final Payment Notice:** (if balance due)
     - "Final payment of $[Amount] will be processed"
     - "Invoice will be generated immediately"
     - Payment method on file: [Card ending in XXXX]
   - Optional: Add note to consultant
4. Clicks "Confirm & Process Payment"
5. System processes:
   - Status → "Payment Pending (Final)" if balance due, else "Completed"
   - Final invoice generated (if balance due)
   - Consultant access → view-only (EPIC-019F)
   - Consultant notified
   - Service request closed
6. Confirmation message: "Service confirmed! Final payment processing."
7. Redirects to service request (now "Completed")

**User Flow - Auto-Confirmation (30 days):**
1. If no confirmation after 30 days:
2. System auto-confirms:
   - Status → "Completed"
   - Admin notified: "Service auto-confirmed after 30 days"
   - Consultant notified
   - Final payment processed automatically
   - Consultant access → view-only
3. Admin can still provide feedback after auto-confirmation

**Key UI Elements:**
- **Countdown Timer:** Visual reminder of review deadline
- **Completion Summary Card:** Clean, readable format of consultant's summary
- **Deliverable Checklist:** Interactive checklist with quick access links
- **Performance Comparison:** Visual comparison (timeline, budget)
- **Action Buttons:** Color-coded, clear CTAs
- **Change Request Modal:** Structured form for clear communication
- **Feedback Form:** Optional but encouraged
- **Confirmation Checklist:** Safety check before final confirmation

---

## 📢 Notifications (if applicable)

**Does this Epic involve user notifications?** Yes

| Trigger | Recipient | Format | Description |
|---------|-----------|--------|-------------|
| Service ready for review | Family Admin/Council | Email + In-App + Push | "[Consultant] completed service - Review and confirm within 30 days - [Review Now]" |
| Review deadline approaching (7 days) | Family Admin | Email + In-App | "Service review deadline in 7 days - [Complete Review]" |
| Review deadline approaching (1 day) | Family Admin | Email + In-App | "Final reminder: Service review deadline tomorrow - [Confirm Now]" |
| Consultant responded to change request | Family Admin/Council | Email + In-App | "[Consultant] addressed your change request - [Review Updates]" |
| Auto-confirmation triggered | Family Admin/Council | Email + In-App | "Service auto-confirmed after 30 days - [View Details]" |
| Final payment processed | Family Admin | Email + In-App | "Final payment of $[Amount] processed - Service closed - [View Receipt]" |

**Notification Configuration Notes:**
- Default: All notifications enabled for Admin
- Critical notifications (ready for review, payment processed) cannot be disabled
- Deadline reminders sent at 7 days, 3 days, 1 day
- Auto-confirmation notification immediate
- Localization: English only initially

---

## 🧮 Business Rules

**Review Period:**
1. Family has 30 days from delivery to confirm completion
2. Reminders sent at 7 days, 3 days, 1 day remaining
3. After 30 days: Auto-confirms if no response
4. Consultant access remains active during review period
5. Family can confirm anytime within 30 days (no waiting required)

**Confirmation Requirements:**
1. Only Admin can confirm completion (Family Council cannot)
2. Must check all confirmation checklist items
3. Confirmation is permanent (cannot undo)
4. Triggers final payment immediately (if balance due)
5. Closes service request permanently

**Change Requests:**
1. Family can request changes unlimited times during review period
2. Change request doesn't reset 30-day countdown
3. Consultant has no deadline to respond (but incentivized for payment)
4. Family can confirm even if consultant doesn't address all changes (discretion)
5. Major unresolved issues: Family can refuse confirmation and escalate

**Deliverable Verification:**
1. Family responsible for verifying all deliverables accessible
2. If links broken: Must request working links from consultant
3. Platform doesn't validate deliverable quality (family's judgment)
4. Family can confirm even if some deliverables missing (discretion)
5. After confirmation, deliverables preserved as-is

**Feedback Provision:**
1. Feedback optional but encouraged
2. Can provide feedback before or after confirmation
3. Feedback sent to consultant immediately
4. Feedback becomes part of service record
5. Future: Feedback may influence consultant's marketplace rating
6. Feedback cannot be edited after submission

**Final Payment:**
1. If balance due: Invoice generated upon confirmation
2. Payment processed using family's payment method on file
3. Grace period: 3 days for invoice payment
4. Failed payment: Service remains in "Payment Pending (Final)"
5. After payment: Status → "Completed", service fully closed
6. If fully prepaid: Confirmation immediately closes service

**Auto-Confirmation:**
1. Triggered automatically after 30 days without response
2. Admin notified immediately
3. Final payment processed automatically (if balance due)
4. Consultant access downgraded immediately
5. Family can still provide feedback after auto-confirmation
6. No penalty for auto-confirmation (neutral outcome)

**Post-Confirmation:**
1. Service request status → "Completed" (permanent)
2. Cannot be reopened or modified
3. Family retains access to deliverables indefinitely
4. Consultant retains view-only access (EPIC-019F)
5. Service appears in completed services history
6. Can still chat with consultant for follow-up questions

---

## 📝 Notes

**Future Enhancements (not in scope):**
- Service quality rating system (1-5 stars)
- Public reviews and testimonials
- Partial confirmation (milestone-based)
- Escrow payment system (hold payment until confirmation)
- Third-party arbitration for disputes
- Automated completion reminders with checklist
- Completion certificate generation for consultant
- Portfolio showcase permission (family approves consultant showcasing work)

**Open Questions:**
- Should there be expedited review option (<30 days deadline)?
- Should Family Council vote be required for high-value services?
- Should family see completion statistics across all consultants (benchmarking)?
- Should change requests have SLA for consultant response?
- Should unresolved change requests prevent auto-confirmation?

**Assumptions:**
- 30 days sufficient for thorough review
- Admin has authority to confirm without Family Council vote
- Families understand auto-confirmation implies acceptance
- Most services completed satisfactorily (minimal change requests)
- Feedback provided honestly and constructively

**Review Best Practices (for families):**
- Review within 7 days to stay on schedule
- Test all deliverable links before confirming
- Provide specific feedback (not generic)
- Request changes early (don't wait until day 29)
- Confirm promptly if satisfied (don't delay consultant payment)
- Be fair with feedback (acknowledge good work)
- Save important deliverables to own storage (backup)

**Common Review Checklist:**
Before confirming, families should verify:
1. ☐ All agreed deliverables received
2. ☐ Deliverable links accessible and working
3. ☐ Work quality meets expectations
4. ☐ Consultant addressed any feedback provided during service
5. ☐ No outstanding questions or concerns
6. ☐ Comfortable with final billing amount
7. ☐ Ready to release final payment

**Change Request Examples:**
- "Deliverable 3 (Strategy Document) link is broken - please provide working link"
- "Section 2 of the governance framework needs more detail on voting procedures"
- "Can you provide an executive summary (1-page) of the full report?"
- "Timeline in Succession Plan should be adjusted based on our last discussion"

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-24  
**Epic Status:** Draft  
**Story Points Estimate:** TBD (during grooming)
