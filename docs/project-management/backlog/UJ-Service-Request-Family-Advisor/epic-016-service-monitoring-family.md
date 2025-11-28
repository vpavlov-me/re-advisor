# EPIC-016F: Service Monitoring & Deliverable Review (Family Side)

## 📋 Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** Service Progress Monitoring and Deliverable Review for Families  
**Summary:** Enable families to monitor consultant activity, review deliverables, track service progress, and provide feedback during active engagements  
**Parent User Journey:** JRN-FAM-002 - Family Marketplace Service Booking (Stage 6)  
**Priority:** Critical  
**Epic Link:** FG-EPIC-016F  
**Related Epic:** FG-EPIC-016A (Consultant deliverable sharing and progress tracking)

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Enable Admin and Family Council to monitor ongoing service delivery, view consultant activity in family modules, access shared deliverables, track progress against milestones, and provide feedback to consultants. This Epic delivers the family's service oversight dashboard.

**User-facing value:**
- Families can monitor consultant activity and work progress in real-time
- Families can access deliverables shared by consultants conveniently
- Families can track service progress against milestones and deadlines
- Families can provide feedback on deliverables and work output
- Families maintain visibility into consultant actions for accountability

**Business value:**
- Real-time monitoring reduces family inquiries by 60%
- Easy deliverable access increases family engagement with service output
- Progress tracking reduces delays and keeps services on schedule
- Feedback loop improves deliverable quality and satisfaction

**Scope boundaries:**
- **Included:** Activity monitoring, deliverable viewing/access, progress tracking, feedback provision
- **NOT included:** Detailed audit log viewing (EPIC-020), access configuration (EPIC-015F), service completion (EPIC-018F)

---

## 👥 Target Users

**Primary Personas:**
- Admin (DOC-USR-003) - Primary monitor of consultant activity and reviewer of deliverables
- Family Council Member (DOC-USR-002) - Reviews deliverables and tracks progress

**Secondary Personas:**
- Family Member (DOC-USR-001) - May view deliverables if consultant granted access

---

## 📖 User Stories (High-Level)

1. **As an** Admin, **I want to** see consultant's recent activity in our family portal, **so that** I can monitor their work and ensure they're making progress

2. **As a** Family Council member, **I want to** access deliverables shared by consultants, **so that** I can review work output and provide feedback

3. **As an** Admin, **I want to** track service progress against milestones and deadlines, **so that** I can ensure consultant is on schedule

4. **As a** Family Council member, **I want to** see what content consultants created in our modules, **so that** I can review their contributions

5. **As an** Admin, **I want to** provide feedback on deliverables, **so that** consultants can make revisions if needed before service completion

---

## 🔗 Dependencies

**Upstream Dependencies:**
- EPIC-016A: Consultant Deliverable Sharing (deliverables must be shared)
- EPIC-015F: Access Configuration (consultant must have access)
- EPIC-013F: Service Request Tracking (active service required)

**Downstream Impact:**
- EPIC-018F: Service Completion (deliverables reviewed during completion)
- EPIC-017F: Amendment Review (progress tracking may trigger amendments)
- Feedback influences consultant's final deliverables

**Technical Dependencies:**
- Activity tracking system
- Deliverable storage (metadata and links)
- Progress tracking system
- Module content tracking
- Notification system

---

## 📐 Design & UX

**Figma Links:**
- [To be created] Service Monitoring Dashboard
- [To be created] Deliverable Viewer
- [To be created] Progress Tracking Interface

**UX Notes:**

**User Flow - Monitoring Consultant Activity:**
1. Admin navigates to active service request
2. "Activity" tab shows consultant's recent actions:
   - **Activity Summary (Top):**
     - Last active: timestamp
     - Total actions this week
     - Modules accessed
     - Deliverables shared
   - **Recent Activity Feed:**
     - Chronological list (most recent first)
     - For each activity:
       - Timestamp
       - Action type (Viewed, Created, Updated)
       - Module and item
       - Brief description
     - Limit: Last 50 actions shown
     - "View Full Audit Log" button (links to EPIC-020)
3. Can filter by: Date range, Action type, Module
4. Activity updates in real-time

**User Flow - Viewing Deliverables:**
1. From service request detail, navigate to "Deliverables" tab
2. Deliverable library shows:
   - **Summary:**
     - Total deliverables shared
     - Categories represented
     - Completion status
   - **Deliverable List:**
     - For each deliverable:
       - Name and description
       - Category badge
       - Date shared
       - External link
       - Status: New, Reviewed, Feedback Provided
       - "Open" button
       - "Provide Feedback" button
3. Click "Open" → Opens external link in new tab
4. Family responsible for verifying link safety
5. Can mark as "Reviewed" after viewing
6. Can filter by: Category, Date, Status
7. Can sort by: Date (newest/oldest), Name

**User Flow - Providing Deliverable Feedback:**
1. From deliverable list, click "Provide Feedback"
2. Feedback modal opens:
   - Deliverable name and description
   - **Feedback Options:**
     - Quick reactions: Approve, Request Changes, Need Discussion
     - Written feedback (textarea)
   - **Specific Comments:**
     - What works well
     - What needs improvement
     - Questions or clarifications
3. Click "Send Feedback"
4. Feedback sent to consultant via service request
5. Consultant notified and can respond
6. Feedback history preserved with deliverable

**User Flow - Tracking Progress:**
1. From service request detail, navigate to "Progress" tab
2. Progress dashboard shows:
   - **Overall Progress:**
     - Progress bar (% complete)
     - Days remaining until deadline
     - Visual timeline with milestones
   - **Milestone List:**
     - For each milestone:
       - Name and target date
       - Status (Not Started, In Progress, Completed)
       - Completion date (if completed)
       - Associated deliverables
   - **Timeline Visualization:**
     - Gantt-style view (optional)
     - Current position vs. deadline
     - Completed vs. remaining milestones
3. Milestones update in real-time as consultant marks progress
4. Can see which deliverables linked to which milestones

**User Flow - Reviewing Consultant-Created Content:**
1. Admin navigates to module where consultant has View+Modify access (e.g., Succession)
2. Sees consultant-created content marked with badge: "Created by [Consultant Name]"
3. Can view content like any other family content
4. Content has audit trail showing consultant as creator
5. Can provide feedback via chat or in-app comments (if available)
6. Content remains in module after service completion

**Key UI Elements:**
- **Activity Summary Cards:** Quick stats on consultant activity
- **Activity Feed:** Chronological list with icons for action types
- **Deliverable Cards:** Visual cards with category icons, status badges
- **Progress Bar:** Visual representation of completion percentage
- **Milestone Timeline:** Visual timeline showing past/current/future milestones
- **Feedback Modal:** Clean interface for providing structured feedback
- **"New" Badges:** Highlight deliverables not yet reviewed
- **External Link Icons:** Clear indication when clicking opens external site

---

## 📢 Notifications (if applicable)

**Does this Epic involve user notifications?** Yes

| Trigger | Recipient | Format | Description |
|---------|-----------|--------|-------------|
| Consultant accessed family portal | Family Admin | In-App | Daily digest: "[Consultant] accessed portal [X] times today" |
| New deliverable shared | Family Admin/Council | Email + In-App | "[Consultant] shared new deliverable: [Name] - [View Now]" |
| Consultant created content in module | Family Admin/Council | In-App | "[Consultant] created [Item] in [Module] - [Review]" |
| Progress milestone completed | Family Admin | In-App | "[Consultant] completed milestone: [Name] - [View Progress]" |
| Service deadline approaching (3 days) | Family Admin/Council | Email + In-App | "Service from [Consultant] due in 3 days - [Current Progress: X%]" |
| Consultant behind schedule | Family Admin | Email + In-App | "[Consultant] is behind schedule - [View Status]" |

**Notification Configuration Notes:**
- Default: All notifications enabled for Admin, opt-in for Council
- Activity digest sent once daily (not per access)
- Deliverable sharing: Real-time notifications
- Progress updates: In-app only
- Behind schedule alert: Triggered if <50% complete at 50% timeline
- Localization: English only initially

---

## 🧮 Business Rules

**Activity Monitoring:**
1. Family sees consultant's activity in permitted modules only
2. Activity tracking shows: Viewed, Created, Updated actions
3. Last 50 activities visible in service request (full audit log in EPIC-020)
4. Activity timestamps in family's local timezone
5. System actions (permission changes) also shown
6. Real-time updates (no refresh needed)

**Deliverable Access:**
1. Family can access all deliverables shared by consultant
2. Deliverables are external links (family opens in new tab)
3. Platform does NOT validate link security or scan content
4. Family responsible for verifying link safety before opening
5. If link inaccessible: Family contacts consultant via chat
6. Deliverables remain accessible after service completion
7. Consultant can update deliverable links before completion

**Deliverable Status:**
- **New:** Just shared, not yet viewed by family
- **Reviewed:** Family viewed/opened deliverable
- **Feedback Provided:** Family provided comments/feedback
- **Approved:** Family marked as satisfactory (optional)

**Progress Tracking:**
1. Milestones defined in original proposal/booking
2. Consultant updates milestone status (family views)
3. Progress percentage auto-calculated based on completed milestones
4. Timeline shows visual progress against deadline
5. "Behind schedule" alert if progress <50% at 50% timeline
6. Family can request progress update via chat
7. Progress visible to all family members (transparency)

**Consultant-Created Content:**
1. All content created by consultant marked with attribution badge
2. Badge shows consultant name and creation date
3. Family can view content like any other family data
4. Content becomes part of family's permanent records
5. After service completion, consultant retains view-only access to own created content
6. Family can edit or delete consultant-created content anytime

**Deliverable Feedback:**
1. Family can provide feedback on any deliverable
2. Feedback options: Approve, Request Changes, Need Discussion, Written comments
3. Feedback sent to consultant immediately
4. Consultant can respond via chat or updated deliverable
5. Feedback history preserved with deliverable record
6. Multiple feedback rounds allowed until family satisfied
7. No formal approval workflow (informal feedback)

**External Link Handling:**
1. Platform does NOT click or preview external links automatically
2. Warning shown before opening external link (user confirmation)
3. Links open in new browser tab
4. Platform tracks when family opens link (timestamp)
5. If link broken: Family can request new link via chat
6. Consultant responsible for link accessibility

---

## 📝 Notes

**Future Enhancements (not in scope):**
- In-platform deliverable preview (no external navigation)
- Deliverable approval workflow (formal approval required)
- Automated link accessibility checking
- Deliverable versioning (track multiple versions)
- Collaborative annotations on deliverables
- Real-time consultant presence indicator ("working now")
- Scheduled progress reports (weekly automated summaries)
- Deliverable download to family's storage

**Open Questions:**
- Should families be able to rate individual deliverables (1-5 stars)?
- Should platform warn if consultant inactive for X days?
- Should family see time consultant spent in each module?
- Should there be escalation if consultant significantly behind schedule?
- Should deliverable feedback require response from consultant?

**Assumptions:**
- Families review deliverables within reasonable timeframe (no SLA)
- External links remain accessible throughout service and after
- Families comfortable navigating to external storage platforms
- Activity monitoring sufficient for oversight (no need for real-time surveillance)
- Informal feedback sufficient (no formal approval required for MVP)

**Monitoring Best Practices (for families):**
- Check activity summary weekly to ensure consultant engaged
- Review deliverables within 3 days of sharing (keep momentum)
- Provide constructive feedback promptly (avoid delays)
- Track progress against milestones regularly
- Escalate concerns early via chat (don't wait until deadline)
- Review consultant-created content for accuracy and completeness
- Save important deliverables to own storage (backup)

**Common Feedback Patterns:**
1. **Positive Reinforcement:** "Great work on this analysis, very thorough"
2. **Specific Requests:** "Can you add more detail on section 3?"
3. **Clarifying Questions:** "What does this recommendation mean in practice?"
4. **Revision Requests:** "Please adjust the timeline based on our discussion"
5. **Format Preferences:** "Could you provide this as PDF instead of Google Doc?"

**Activity Indicators for Concern:**
- No activity for 7+ days during active service
- Progress <25% at 50% timeline
- Multiple failed attempts to access specific modules
- Consultant viewing but not creating/editing content
- Deliverables shared only near deadline (no interim updates)

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-24  
**Epic Status:** Draft  
**Story Points Estimate:** TBD (during grooming)
