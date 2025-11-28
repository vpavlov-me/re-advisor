# EPIC-019F: Post-Service Access Management (Family Side)

## 📋 Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** Post-Completion Consultant Access Management  
**Summary:** Automate consultant access downgrade to view-only after service completion and enable families to extend or revoke access  
**Parent User Journey:** JRN-FAM-002 - Family Marketplace Service Booking (Stage 8)  
**Priority:** High  
**Epic Link:** FG-EPIC-019F  
**Related Epic:** EPIC-015F (Initial access configuration)

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Automatically transition consultant permissions to view-only mode immediately upon service completion, create frozen snapshot of consultant's work, enable families to extend access for follow-up, and provide option to completely revoke access. This Epic delivers post-service access control automation and family oversight.

**User-facing value:**
- Families' data automatically protected after service ends (view-only)
- Families can extend consultant access for follow-up without new service
- Families can completely revoke access if no longer needed
- Families maintain control over historical consultant relationships
- Consultants retain ability to reference their past work

**Business value:**
- Automatic access downgrade prevents unauthorized post-service changes
- View-only access preserves consultant relationship for future engagements
- Flexible extension enables ongoing collaboration without formal contracts
- Clear access management reduces security risks

**Scope boundaries:**
- **Included:** Automatic access downgrade, frozen snapshot, access extension, complete revocation
- **NOT included:** Initial access configuration (EPIC-015F), access during active service (EPIC-015F), audit logging (EPIC-020)

---

## 👥 Target Users

**Primary Personas:**
- Admin (DOC-USR-003) - Manages post-service consultant access

**Secondary Personas:**
- Consultant (DOC-USR-006) - Retains view-only access to past work
- Family Council Member (DOC-USR-002) - May review access status

---

## 📖 User Stories (High-Level)

1. **As an** Admin, **I want** consultant access to automatically downgrade to view-only when service completes, **so that** I don't have to manually remove permissions and data stays protected

2. **As an** Admin, **I want to** see frozen snapshot of consultant's work preserved, **so that** I have permanent record of their contributions

3. **As an** Admin, **I want to** extend consultant's access for follow-up questions, **so that** we can maintain relationship without formal new service

4. **As an** Admin, **I want to** completely revoke consultant access if relationship ends, **so that** I maintain full control over family data

5. **As an** Admin, **I want to** view access history for all past consultants, **so that** I can manage dormant relationships

---

## 🔗 Dependencies

**Upstream Dependencies:**
- EPIC-018F: Service Completion (completion triggers access downgrade)
- EPIC-015F: Access Configuration (initial permissions must exist)

**Downstream Impact:**
- Consultant's view of family portal (read-only)
- Future service engagements (can re-enable full access)
- Security and compliance (data protection)

**Technical Dependencies:**
- Permission automation system
- Snapshot/archiving mechanism
- Access extension workflow
- Notification system

---

## 📐 Design & UX

**Figma Links:**
- [To be created] Access Downgrade Notification
- [To be created] Consultant Access Management Dashboard
- [To be created] Access Extension Flow

**UX Notes:**

**User Flow - Automatic Access Downgrade (System):**
1. Family confirms service completion (from EPIC-018F)
2. System immediately processes:
   - Consultant permissions → View-only (all modules)
   - Creates frozen snapshot of consultant's work
   - Logs access transition
   - Notifies both parties
3. Consultant can no longer:
   - Create new content
   - Edit existing content (including own work)
   - Share deliverables
   - Modify family data
4. Consultant can still:
   - View permitted modules
   - Reference their past work
   - Communicate via chat
   - Access service request details

**User Flow - Viewing Access Status:**
1. Admin navigates to "Consultants" section in Family Portal
2. Dashboard shows all consultants (current and past):
   - **Active Consultants:**
     - Ongoing services
     - Full access permissions
   - **Past Consultants:**
     - Completed services
     - Access status (View-Only, Extended, Revoked)
     - Last active date
3. For each consultant, see:
   - Name and photo
   - Services provided (count and names)
   - Current access status
   - Access granted/modified dates
   - Quick actions: Extend Access, Revoke Access, View History
4. Click consultant → Opens detailed access page

**User Flow - Consultant Access Detail Page:**
1. Shows comprehensive consultant access info:
   - **Header:**
     - Consultant name, photo, verification badges
     - Current access status badge
     - Last active timestamp
   - **Service History:**
     - List of all completed services
     - For each: Service name, dates, deliverables, status
   - **Current Access:**
     - Modules accessible (View-only)
     - Access granted date
     - Last accessed timestamps per module
   - **Consultant's Contributions:**
     - Content created in modules
     - Deliverables shared
     - "View Frozen Snapshot" button
   - **Actions:**
     - "Extend Access" button
     - "Revoke Access" button
     - "Invite for New Service" button

**User Flow - Extending Access:**
1. Admin clicks "Extend Access" from consultant detail page
2. Extension modal opens:
   - "Why extend access?" (dropdown, optional):
     - Follow-up questions expected
     - Ongoing informal consultation
     - Preparing for next service
     - Other (specify)
   - "Duration:" (radio buttons)
     - 30 days
     - 90 days
     - 180 days
     - Indefinite (until manually revoked)
   - "Permission level:" (radio buttons)
     - View-only (current, default)
     - View+Modify (restore full access)
   - "Modules:" (checkboxes, if restoring Modify access)
     - Select which modules
     - Default: Same as original service
   - Optional: Add note to consultant
3. Clicks "Extend Access"
4. System processes:
   - Access extended with new expiration
   - Consultant notified
   - If View+Modify: Permissions restored
5. Confirmation: "Access extended for [Duration]"

**User Flow - Revoking Access:**
1. Admin clicks "Revoke Access"
2. Revocation modal opens:
   - "Are you sure you want to revoke all access?"
   - "This will:"
     - Remove consultant's ability to view family portal
     - Disable chat communication
     - Preserve service history and deliverables
     - Can be reversed later if needed
   - "Reason:" (dropdown, optional but encouraged)
     - No longer need access
     - Security concern
     - Relationship ended
     - Other (specify)
   - Optional: Add note (not sent to consultant)
3. Clicks "Confirm Revocation"
4. System processes:
   - All access removed immediately
   - Consultant notified
   - Chat disabled
   - Service history preserved
5. Confirmation: "Access revoked. Consultant can no longer access your portal."

**User Flow - Viewing Frozen Snapshot:**
1. From consultant detail page, click "View Frozen Snapshot"
2. Opens snapshot viewer:
   - Shows consultant's work as it was at completion
   - Sections by module:
     - Content created by consultant
     - Deliverables shared
     - Changes made to family content
   - Each item timestamped and attributed
   - Read-only view (cannot edit snapshot)
3. Can export snapshot as PDF for records

**Key UI Elements:**
- **Status Badges:** Color-coded (Green: Active, Blue: View-Only, Yellow: Extended, Gray: Revoked)
- **Access Timeline:** Visual timeline showing access grants, extensions, revocations
- **Consultant Cards:** Summary cards with key info and quick actions
- **Extension Form:** Clear options for duration and permissions
- **Revocation Warning:** Prominent warning with consequences
- **Snapshot Viewer:** Organized view of consultant's contributions
- **Last Active Indicators:** Timestamps showing recent activity

---

## 📢 Notifications (if applicable)

**Does this Epic involve user notifications?** Yes

| Trigger | Recipient | Format | Description |
|---------|-----------|--------|-------------|
| Service completed, access downgraded | Family Admin + Consultant | In-App | "Service completed. [Consultant] access is now view-only - [Manage Access]" |
| Access extended | Family Admin + Consultant | Email + In-App | "Access extended for [Consultant] - [Duration] remaining" |
| Extended access expiring (7 days) | Family Admin | Email + In-App | "[Consultant] access expires in 7 days - [Extend or Revoke?]" |
| Extended access expired | Family Admin + Consultant | In-App | "[Consultant] access expired and has been revoked" |
| Access revoked | Family Admin + Consultant | Email + In-App | "Access revoked for [Consultant] - [View Details]" |
| Consultant accessed portal (if revoked then re-extended) | Family Admin | In-App | "[Consultant] accessed your portal after extension - [View Activity]" |

**Notification Configuration Notes:**
- Default: All notifications enabled for Admin
- Consultant notified of all access changes (cannot opt out - transparency)
- Expiration warnings sent at 7 days, 3 days, 1 day
- Localization: English only initially

---

## 🧮 Business Rules

**Automatic Access Downgrade:**
1. Triggered immediately upon service completion confirmation
2. ALL permissions downgrade to View-only (no exceptions)
3. Affects all modules consultant previously had access to
4. Consultant retains view access to:
   - Permitted modules (read-only)
   - Own created content
   - Deliverables shared
   - Service request details
5. Consultant loses ability to:
   - Create new content
   - Edit any content (including own)
   - Delete anything
   - Share new deliverables

**Frozen Snapshot:**
1. Created automatically at moment of completion
2. Captures:
   - All content created by consultant
   - All changes made by consultant
   - All deliverables shared
   - Timestamps and attributions
3. Snapshot immutable (cannot be edited)
4. Preserved permanently for audit and reference
5. Family can view/export anytime

**Access Extension:**
1. Only Admin can extend access
2. Extension durations: 30, 90, 180 days, or indefinite
3. Can extend multiple times (no limit)
4. Extension can restore View+Modify permissions
5. If restoring Modify: Family selects which modules
6. Extension doesn't create new service request
7. No additional payment for extended access

**Access Revocation:**
1. Revocation immediate (consultant kicked out if logged in)
2. Consultant notified with general reason
3. Revoked consultant cannot:
   - Access family portal
   - View any family data
   - Send messages via chat
   - See service history details
4. Revoked consultant retains:
   - Reference to completed services in their portfolio
   - Copy of their completion summary
5. Revocation reversible (can restore access later)

**Post-Revocation Re-Access:**
1. Family can restore access after revocation
2. Restoration follows extension workflow
3. Consultant notified of restoration
4. Previous access history preserved

**Access Expiration:**
1. Extended access expires automatically per set duration
2. System sends warnings at 7, 3, 1 days before expiration
3. Upon expiration:
   - Access automatically revoked
   - Both parties notified
   - Family can re-extend if desired
4. Indefinite extensions don't expire (manual revocation required)

**Re-Engagement:**
1. Family can initiate new service with same consultant
2. New service creates fresh service request
3. Access permissions configured from scratch (not inherited)
4. View-only access from old service continues separately
5. Family can have both: old service (view-only) + new service (full access)

---

## 📝 Notes

**Future Enhancements (not in scope):**
- Automatic access expiration after inactivity (e.g., 180 days no login)
- Graduated access downgrade (e.g., View+Modify → View → Revoked over time)
- Access analytics (track consultant activity patterns)
- Bulk access management (revoke multiple consultants at once)
- Access approval workflow (Family Council vote for extensions)
- Conditional access (consultant can view only if family approves each session)
- Self-service access request by consultant

**Open Questions:**
- Should there be maximum indefinite extensions (e.g., 2 years max)?
- Should extended access cost anything (subscription fee)?
- Should consultants see their access expiration date?
- Should there be warnings if consultant hasn't accessed in 90+ days?
- Should access automatically revoke if consultant account deactivated?

**Assumptions:**
- Families comfortable with view-only access for past consultants
- Consultants respect view-only limitations (technical enforcement sufficient)
- Most families don't revoke access immediately (maintain relationship)
- Extended access used rarely (primarily for follow-up)
- Frozen snapshots sufficient for audit needs

**Access Management Best Practices (for families):**
- Review consultant access quarterly (clean up dormant relationships)
- Extend access only when specific need (not indefinitely by default)
- Revoke access if relationship ended poorly or trust broken
- Use extensions for follow-up, not as substitute for new service
- Check "last active" timestamps to identify dormant access
- Export frozen snapshots for important services (backup documentation)

**Common Extension Scenarios:**
1. **Follow-up Questions:** Family needs clarification on deliverables (30-day extension)
2. **Informal Consultation:** Occasional questions without formal engagement (90-day extension)
3. **Preparing Next Phase:** Planning future service, consultant needs context (90-day extension)
4. **Ongoing Monitoring:** Consultant tracks implementation progress (180-day extension)
5. **Long-term Partner:** Trusted advisor with indefinite informal access (indefinite extension)

**Security Considerations:**
- View-only strictly enforced at database level (not just UI)
- Consultant cannot circumvent restrictions
- All access attempts logged (even if blocked)
- Unusual activity alerts Admin
- Revocation takes effect within 60 seconds globally

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-24  
**Epic Status:** Draft  
**Story Points Estimate:** TBD (during grooming)
