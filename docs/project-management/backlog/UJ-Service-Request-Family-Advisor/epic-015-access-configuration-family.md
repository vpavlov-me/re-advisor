# EPIC-015F: Access Configuration & Provisioning (Family Side)

## 📋 Basic Information

**Issue Type:** Epic  
**Project:** FG  
**Epic Name:** Consultant Access Configuration & Provisioning  
**Summary:** Enable families to configure, grant, and manage consultant access to family modules and data  
**Parent User Journey:** JRN-FAM-002 - Family Marketplace Service Booking (Stage 4)  
**Priority:** Critical  
**Epic Link:** FG-EPIC-015F  
**Related Epic:** EPIC-019F (Post-service access management)

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Enable Admin to configure granular access permissions for consultants based on service requirements, grant access automatically upon service acceptance, monitor consultant activity through audit logs, and adjust permissions during service delivery. This Epic delivers the family's control center for consultant data access and security.

**User-facing value:**
- Families maintain full control over what consultants can see and do
- Families see clear warnings before granting access to sensitive modules
- Families can adjust permissions anytime during service engagement
- Families have audit trail of all consultant actions in their portal
- Families can quickly revoke access if needed

**Business value:**
- Granular permissions increase family trust and booking confidence
- Automated access provisioning reduces manual setup by 100%
- Audit logs reduce disputes and provide accountability
- Flexible permissions enable complex multi-service engagements

**Scope boundaries:**
- **Included:** Permission configuration UI, access provisioning automation, permission adjustment, audit logging, access revocation
- **NOT included:** Post-service access management (EPIC-019F), consultant view of permissions (consultant side feature), multi-advisor permission conflicts

---

## 👥 Target Users

**Primary Personas:**
- Admin (DOC-USR-003) - Configures and manages consultant access
- Family Council Member (DOC-USR-002) - May review access configurations

**Secondary Personas:**
- Consultant (DOC-USR-006) - Receives access (passive user, see separate epic for consultant view)

---

## 📖 User Stories (High-Level)

1. **As an** Admin, **I want to** review consultant's requested module access before accepting a proposal or booking, **so that** I can ensure they only access data relevant to their service

2. **As an** Admin, **I want to** adjust consultant's access levels (View, View+Modify) per module, **so that** I can grant appropriate permissions based on service type

3. **As an** Admin, **I want to** see clear warnings before granting access to sensitive modules, **so that** I understand data exposure risks

4. **As an** Admin, **I want to** adjust consultant permissions during active service, **so that** I can respond to changing needs or security concerns

5. **As an** Admin, **I want to** quickly revoke all consultant access in case of emergency or concern, **so that** I can protect family data immediately

---

## 🔗 Dependencies

**Upstream Dependencies:**
- EPIC-012F: Proposal Review (access requirements defined in proposals)
- EPIC-013F: Service Request Tracking (access tied to service requests)
- Auth service (permission management system)

**Downstream Impact:**
- Consultant's actual access to Family Portal modules
- EPIC-016F: Service Monitoring (consultants use granted access to deliver)
- EPIC-019F: Post-Service Access Management (permissions downgrade after completion)
- Audit system (tracks consultant actions)

**Technical Dependencies:**
- Permission model and RBAC system
- FamilyAdvisorAssociation table (stores permissions)
- Audit logging system
- Real-time permission enforcement
- Access revocation mechanism

---

## 📐 Design & UX

**Figma Links:**
- [To be created] Access Configuration Modal
- [To be created] Module Permission Matrix
- [To be created] Access Warning Dialogs

**UX Notes:**

**User Flow - Configuring Access (During Proposal Acceptance):**
1. Admin accepting proposal (from EPIC-012F)
2. Before final confirmation, "Configure Access" step appears
3. Access configuration screen shows:
   - **Header:**
     - Consultant name and photo
     - Service name
     - Warning: "You're about to grant access to your family data"
   - **Module Selection:**
     - List of all 10 governance modules
     - For each module:
       - Module name and icon
       - Checkbox (grant access or not)
       - Recommended by consultant indicator (if in proposal)
       - Permission level dropdown (View, View+Modify)
       - Sensitive data warning (if applicable)
   - **Access Summary:**
     - "Consultant will access [X] modules"
     - List of granted modules with permission levels
     - Expiration date (tied to service completion)
   - **Advanced Options (Collapsible):**
     - Specific permission overrides (future)
     - Custom access expiration date
4. Admin selects modules and permission levels
5. System highlights sensitive modules (Assets, Succession) with warnings
6. Admin acknowledges warnings (checkbox)
7. Clicks "Grant Access & Accept"
8. Access provisioned immediately
9. Consultant notified and can access Family Portal

**User Flow - Adjusting Access During Service:**
1. Navigate to active service request (from EPIC-013F)
2. Click "Manage Access" button
3. Current permissions modal opens:
   - **Current Access:**
     - List of modules consultant currently has access to
     - Permission levels
     - Last accessed timestamps
   - **Modify Access:**
     - Toggle module access on/off
     - Change permission levels
     - Add/remove modules
   - **Activity Log Preview:**
     - Recent consultant actions (last 10)
4. Make changes
5. Click "Save Changes"
6. Confirmation: "Consultant will be notified of permission changes"
7. Permissions updated in real-time
8. Consultant receives notification

**User Flow - Emergency Access Revocation:**
1. From service request or consultant profile, click "Revoke Access"
2. Confirmation modal:
   - "This will immediately revoke all access"
   - "Consultant will be notified"
   - "Service request will be suspended"
   - Reason required (dropdown + optional text)
3. Click "Confirm Revocation"
4. All permissions removed instantly
5. Consultant loses access immediately (kicked out if logged in)
6. Consultant notified with reason
7. Service request marked "Suspended"

**Key UI Elements:**
- **Module Checkboxes:** Clear module names with icons
- **Permission Dropdowns:** View, View+Modify (color-coded)
- **Warning Badges:** Yellow/orange for sensitive modules
- **Sensitivity Indicators:** Icons showing data risk level
- **Access Timeline:** Visual timeline of access grant/revoke history
- **Audit Log Table:** Clean, sortable, filterable
- **Quick Actions:** Buttons for common tasks (adjust, revoke)
- **Activity Indicators:** Real-time "Consultant is currently active" notice

---

## 📢 Notifications (if applicable)

**Does this Epic involve user notifications?** Yes

| Trigger | Recipient | Format | Description |
|---------|-----------|--------|-------------|
| Access granted to consultant | Family Admin/Council | Email + In-App | "Access granted to Consultant [Name] for [X] modules - [View Details]" |
| Consultant accessed family portal | Family Admin | In-App | "Consultant [Name] accessed your family portal at [Time]" (daily digest) |
| Consultant made changes in family data | Family Admin/Council | Email + In-App | "Consultant [Name] updated [Item] in [Module] - [View Changes]" |
| Access permissions changed | Family Admin/Council + Consultant | Email + In-App | "Access permissions updated for Consultant [Name] - [View Changes]" |
| Access revoked | Family Admin/Council + Consultant | Email + In-App | "Access revoked for Consultant [Name] - [View Reason]" |
| Unusual activity detected | Family Admin | Email + In-App | "Unusual activity by Consultant [Name] - [Review Activity]" |
| Access expiring soon (7 days) | Family Admin | Email + In-App | "Access for Consultant [Name] expires in 7 days - [Extend or Revoke?]" |

**Notification Configuration Notes:**
- Default: All notifications enabled for Admin
- Activity digest optional (can disable or change frequency)
- Unusual activity alerts cannot be disabled (security)
- Frequency: Daily digest for routine access, immediate for changes/revocations
- Localization: English only initially

---

## 🧮 Business Rules

**Module Access Permissions:**

**10 Core Modules with Permission Levels:**
1. **Conflicts** - Sensitive (View, View+Modify)
2. **Constitution** - Low sensitivity (View, View+Modify)
3. **Family Council** - Moderate (View, View+Modify)
4. **Decision Making** - Moderate (View, View+Modify)
5. **Education** - Low (View, View+Modify)
6. **Mentorship** - Low (View, View+Modify)
7. **Assets** - High sensitivity (View, View+Modify)
8. **Succession** - High sensitivity (View, View+Modify)
9. **Philanthropy** - Moderate (View, View+Modify)
10. **Family** - Moderate (View only for consultants)

**Permission Levels Defined:**
- **View:** Read-only access, can view existing data
- **View+Modify:** Can view AND edit data related to their service only
- **No Access:** Cannot see module exists

**Default Permission Recommendations (by Service Type):**
| Service Type | Typical Modules | Permission Level |
|--------------|-----------------|------------------|
| Succession Planning | Succession, Education, Assets | View+Modify |
| Governance Consulting | Constitution, Family Council, Decision Making | View+Modify |
| Conflict Mediation | Conflicts, Communication, Family | View+Modify |
| Philanthropy Advisor | Philanthropy, Assets (limited) | View+Modify |
| Asset Management | Assets, Succession | View+Modify |
| Education Coordination | Education, Mentorship | View+Modify |

**Access Granting Rules:**
1. Access can only be granted by Admin or Family Council
2. Consultant requests modules in proposal (recommendations)
3. Family can grant fewer modules than requested (not more)
4. Family can downgrade permission level (View instead of Modify)
5. Minimum: Must grant at least 1 module related to service
6. Family can grant access before accepting proposal (preparation)

**Access Modification Rules:**
1. Admin can adjust permissions anytime during service
2. Consultant notified immediately of any changes
3. Removing module access doesn't delete consultant's past work in that module
4. Adding modules requires consultant consent (notification)
5. Downgrading from Modify to View preserves consultant's contributions
6. Changes logged in audit trail

**Access Expiration:**
1. Default: Access expires upon service completion
2. Family can set custom expiration date
3. Service completion triggers automatic downgrade to View (see EPIC-019F)
4. Family can extend access after service completion
5. Expired access can be renewed (consultant doesn't need to re-onboard)

**Audit Logging:**
1. All consultant actions logged: Create, Read, Update, Delete
2. Logs include: Timestamp, user, action type, module, item, details
3. Logs preserved indefinitely (cannot be deleted)
4. Consultant cannot see audit logs of their own actions
5. System actions (auto-expiration) also logged

**Note:** Detailed audit log viewing, filtering, and export functionality covered in EPIC-020.

**Sensitive Data Warnings:**
1. Assets module requires extra confirmation (financial data)
2. Succession module requires extra confirmation (next-gen private info)
3. Conflicts module requires extra confirmation (family disputes)
4. Warnings cannot be bypassed (must acknowledge)
5. Warnings explain specific risks

**Access Revocation:**
1. Immediate effect (consultant kicked out if logged in)
2. Consultant notified with reason
3. Revoked access can be restored if issue resolved
4. Revocation doesn't delete consultant's contributions
5. Service request suspended (not cancelled) until resolution

**Multi-Advisor Scenarios:**
1. Multiple consultants can have access to same family simultaneously
2. Each consultant's permissions configured independently
3. Consultant A cannot see Consultant B's permissions or actions
4. Audit log shows which consultant performed each action
5. Permissions don't conflict (each consultant isolated)

---

## 📝 Notes

**Future Enhancements (not in scope):**
- **Audit Log Viewing & Analysis** - Dedicated Epic (EPIC-020) for comprehensive audit log interface with advanced filtering, export, and analysis
- Row-level permissions (consultant only sees specific records)
- Time-based access (access only during specific hours/days)
- Permission templates (save common configurations for quick reuse)
- Bulk access management (configure multiple consultants at once)
- Permission approval workflow (Family Council vote required for sensitive modules)
- AI-powered access recommendations based on service type
- Real-time permission monitoring dashboard (see who's accessing what now)
- Geolocation-based access restrictions (only access from specific countries)
- Two-factor authentication requirement for consultants accessing sensitive modules

**Open Questions:**
- Should consultants be able to request additional module access during service?
- Should family see consultant's access frequency (how often they log in)?
- Should there be auto-revocation if consultant inactive for X days?
- Should permissions require multi-sig approval for high-sensitivity modules?
- Should consultants see which family members adjusted their permissions?

**Assumptions:**
- Families understand module purposes and sensitivity levels
- Permission configuration takes <2 minutes (part of acceptance flow)
- Admin comfortable making permission decisions (no extensive training needed)
- Consultants respect access boundaries (technical enforcement sufficient)
- Audit logs reviewed if issues arise (not proactive monitoring)
- View-only sufficient for consultants in most cases (Modify optional)

**Sensitivity Classification Rationale:**
- **High:** Assets (financial data), Succession (next-gen development, sensitive)
- **Moderate:** Family Council, Decisions, Philanthropy, Family (governance, some personal)
- **Low:** Education, Mentorship, Constitution (less sensitive, educational)
- **Special:** Conflicts (highly sensitive, but sometimes necessary for mediators)

**Access Configuration Checklist (for families):**
Before granting access, families should ask:
1. Does consultant need this module to deliver their service?
2. Is View sufficient, or do they need Modify?
3. Are there sensitive records in this module they shouldn't see?
4. Have I acknowledged warnings for high-sensitivity modules?
5. Have I set appropriate expiration date?
6. Will I monitor consultant activity via audit log?

---

**Template Version:** 1.0.0  
**Last Updated:** 2025-10-24  
**Epic Status:** Draft  
**Story Points Estimate:** TBD (during grooming)
