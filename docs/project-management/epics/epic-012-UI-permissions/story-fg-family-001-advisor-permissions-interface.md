# User Story: Advisor Permission Management Interface

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As a Consul or Admin, I want to view connected advisors and configure three-tier access levels per governance section  
**Epic Link:** FG-EPIC-006 (Advisor Permission Management - Frontend UI/UX)  
**Priority:** High  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]

---

## 📖 User Story

**As a** Consul or Admin (family member with governance coordination role),  
**I want to** view a list of connected advisors, open a permission editor for any advisor, and configure three-tier access levels (None, View, View+Modify related, View+Modify All) for each governance section using visual selectors and optional templates,  
**so that** I can precisely control what data advisors can access and modify after they've already joined the family governance platform.

---

## 🎯 Business Context

**Why is this Story important?**

**User Pain Points:**
- After advisors accept invitations, families need to adjust their access as relationships evolve
- Current system lacks visual interface for understanding advisor permissions
- Manual permission configuration is time-consuming and error-prone
- Families struggle to apply consistent permission patterns across multiple advisors

**Business Outcomes:**
- Improved security through granular post-connection access control
- Reduced administrative overhead with visual permission management
- Faster permission adjustments using templates
- Better governance compliance through clear permission visibility
- Enhanced audit trail for permission changes

**Strategic Alignment:**
- Supports scalable advisor management for growing families
- Enables flexible advisor relationships (temporary consultants, long-term partners)
- Provides foundation for compliance and security reporting

---

## ✅ Acceptance Criteria

### **AC1: Advisor List View**

1. **Given** I am logged in as Consul or Admin,  
   **When** I navigate to "Advisor Management" section,  
   **Then** I see a list of all connected advisors with:
   - Advisor name, email, role (Personal FA, External Consul, Consultant)
   - Visual badge indicating current access level
   - "Manage Permissions" action button for each advisor
   - Filter options: "All Advisors", "Personal FA", "External Consul", "Consultants"

2. **Given** I am viewing the advisor list,  
   **When** I apply filter "Personal FA",  
   **Then** only Personal Family Advisors are displayed in the list.

### **AC2: Permission Editor Access Control**

3. **Given** I am a **Consul** (not Admin),  
   **When** I click "Manage Permissions" for External Consul or another Consul,  
   **Then** I see read-only view with message: "Only Admins can modify Consul permissions. Contact your family Admin."

4. **Given** I am a **Consul** (not Admin),  
   **When** I click "Manage Permissions" for Personal FA or Consultant,  
   **Then** Permission Editor opens with full edit capabilities.

5. **Given** I am an **Admin**,  
   **When** I click "Manage Permissions" for any advisor (including Consuls),  
   **Then** Permission Editor opens with full edit capabilities.

### **AC3: Permission Editor - Visual Interface**

6. **Given** Permission Editor is open for an advisor,  
   **When** I view the interface,  
   **Then** I see:
   - Advisor name, role, and email at the top
   - Banner: "Initial access granted via invitation on [date]"
   - List of all 10+ governance sections (Constitution, Meetings, Communication, Decisions, Education, Mentorship, Assets, Succession, Philanthropy, Family Management)
   - For Admin viewing: additional sections (Billing, Extensions)
   - Three-tier access selector for each section:
     - **None** (no access)
     - **View** (read-only)
     - **View+Modify related** (edit own items)
     - **View+Modify All** (full edit access)
   - Permission template dropdown (top of editor)
   - "Save Changes" and "Cancel" buttons

7. **Given** I am viewing permission levels for each section,  
   **When** I see the access level indicator,  
   **Then** each level has:
   - Distinct visual indicator
   - Icon (lock, eye, pencil, check) corresponding to access type
   - Tooltip explaining what this level allows

### **AC4: Permission Template Application**

8. **Given** Permission Editor is open,  
   **When** I select template "External Consul" from dropdown,  
   **Then** all 10 governance sections automatically set to "View+Modify All" (except Billing/Extensions if not Admin).

9. **Given** Permission Editor is open,  
   **When** I select template "Succession Specialist",  
   **Then**:
   - Succession section → "View+Modify related"
   - Education section → "View+Modify related"
   - All other sections → "None"

10. **Given** Permission Editor is open,  
    **When** I select template "Financial Observer",  
    **Then**:
    - Assets section → "View"
    - All other sections → "None"

11. **Given** I have selected a template,  
    **When** I manually change any section's access level,  
    **Then** template selector changes to "Custom" automatically.

### **AC5: Manual Permission Configuration**

12. **Given** Permission Editor is open with template "Custom",  
    **When** I click on access selector for "Constitution" section,  
    **Then** I see 4 options:
    - None
    - View
    - View+Modify related
    - View+Modify All

13. **Given** I select "View+Modify related" for Constitution section,  
    **When** I save changes,  
    **Then**:
    - Advisor can view all Constitution documents
    - Advisor can edit only Constitution documents they created
    - Advisor CANNOT edit Constitution documents created by others

### **AC6: Save and Apply Changes**

14. **Given** I have modified permissions in editor,  
    **When** I click "Save Changes",  
    **Then**:
    - System validates all changes
    - System applies changes immediately
    - Success message displays: "Permissions updated for [Advisor Name]"
    - System logs change in audit trail (who, when, what changed)
    - Advisor receives in-app notification: "Your access permissions have been updated"
    - Permission Editor closes, returning to Advisor List

15. **Given** I have modified permissions,  
    **When** I click "Cancel",  
    **Then**:
    - Confirmation modal appears: "Discard unsaved changes?"
    - If confirmed: editor closes without saving
    - If cancelled: remain in editor

### **AC7: Permission Summary Display**

16. **Given** I am viewing Advisor List,  
    **When** I look at an advisor's permission badge,  
    **Then** I see summary like:
    - "Full Access (10/10 sections)" for External Consul
    - "Limited Access (3/10 sections)" for Personal FA
    - "View Only (5/10 sections)" for Financial Observer
    - "No Active Access" if all sections are "None"

---

## 🔑 Business Rules

### **Authorization Rules:**

**BR1: Role-Based Editor Access**
- **Admins** can modify permissions for ALL advisors (Personal FA, Consultants, External Consuls, other Consuls)
- **Consuls** can modify permissions ONLY for Personal FA and Consultants
- **Consuls** CANNOT modify permissions for:
  - Other Consuls
  - External Consuls
  - Admins
- **Personal FA, Consultants, External Consuls** CANNOT access Permission Editor (no self-service permission modification)

**BR2: Billing & Extensions Section Access**
- Billing and Extensions sections are visible ONLY to Admins in Permission Editor
- Consuls do not see these sections when managing advisor permissions
- Only Admins can grant Billing/Extensions access to advisors

**BR3: Three-Tier Access Level Definitions**

| Access Level | Read | Create New | Edit Own Items | Edit All Items | Delete Own | Delete All |
|--------------|------|------------|----------------|----------------|------------|------------|
| **None** | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **View** | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| **View+Modify related** | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| **View+Modify All** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |

**BR4: External Consul Default Permissions**
- External Consuls receive "View+Modify All" on all 10 governance sections by default (set during invitation)
- Admins can downgrade External Consul permissions post-connection if needed
- Consuls CANNOT modify External Consul permissions (Admin-only)

**BR5: Permission Change Audit Trail**
- ALL permission changes must be logged with:
  - Who made the change (Admin or Consul user_id)
  - When (timestamp)
  - What changed (section + old_level → new_level)
  - For which advisor (advisor_id)
- Audit log accessible only to Admins

**BR6: Immediate Permission Application**
- Permission changes take effect **immediately** upon save
- Advisor's next API request reflects new permissions
- If advisor is actively using platform during permission change:
  - Current session continues until next page load
  - On next navigation, new permissions enforced
  - Advisor sees notification: "Your permissions have been updated"

### **Validation Rules:**

**VR1: Template Selection Validation**
- Cannot apply "External Consul" template to Personal FA (role mismatch)
- Cannot apply role-specific templates (Succession Specialist, Governance Consultant) to External Consul (they have full access by default)
- "Custom" template always available for manual configuration

**VR2: Zero-Access Prevention**
- System MUST warn if saving permissions where ALL sections are "None"
- Warning message: "This advisor will have no access to any sections. Are you sure you want to proceed?"
- Prevent accidental lockout

**VR3: Billing Section Protection**
- Only Admins can set Billing section permissions
- If Consul somehow attempts to modify Billing (edge case), system rejects with error: "Only Admins can manage Billing access"

### **Edge Cases:**

**EC1: Multiple Concurrent Editors**
- If two Admins edit same advisor's permissions simultaneously:
  - Last save wins (optimistic locking)
  - Second Admin sees warning: "Permissions were modified by [Admin Name] 2 minutes ago. Your changes may overwrite theirs."

**EC2: Advisor Active During Permission Removal**
- If advisor is actively using platform when permissions are revoked (section set to "None"):
  - Current page remains accessible until navigation
  - On next navigation attempt to restricted section:
    - Redirect to dashboard
    - Show message: "You no longer have access to this section. Contact your family for details."

**EC3: Permission Editor for Consultant with Active Service**
- If managing permissions for Consultant with active service engagement:
  - Banner in editor: "⚠️ This Consultant has an active service engagement ending on [date]. Permissions will automatically transition to 'View related only' after completion."
  - Admin can still modify permissions, but aware of future auto-transition

---

## 🧪 Test Scenarios

### **Happy Path: Admin Manages Personal FA Permissions**

**Scenario:** Admin applies "Succession Specialist" template to Personal FA

1. Admin logs into Family Portal
2. Navigates to "Advisor Management"
3. Sees list of 5 advisors (2 Personal FA, 1 External Consul, 2 Consultants)
4. Clicks "Manage Permissions" for Personal FA "John Smith"
5. Permission Editor opens showing:
   - John's current access: Constitution (View), Meetings (View+Modify related)
   - Banner: "Initial access granted via invitation on Oct 15, 2025"
6. Admin selects template "Succession Specialist" from dropdown
7. System automatically sets:
   - Succession → View+Modify related
   - Education → View+Modify related
   - All other sections → None
8. Admin clicks "Save Changes"
9. Success message: "Permissions updated for John Smith"
10. Audit log entry created
11. John receives notification: "Your access permissions have been updated"
12. Admin returns to Advisor List
13. John's badge now shows "Limited Access (2/10 sections)"

**Expected Result:** John can now access Succession and Education sections with edit-own-items permissions, all other sections are inaccessible.

---

### **Happy Path: Consul Manages Consultant Permissions with Custom Configuration**

**Scenario:** Consul manually configures Consultant permissions

1. Consul "Maria Garcia" logs into Family Portal
2. Navigates to "Advisor Management"
3. Clicks "Manage Permissions" for Consultant "Sarah Johnson"
4. Permission Editor opens with current access showing
5. Maria selects template "Custom"
6. Manually configures:
   - Communication → View+Modify related
   - Decisions → View
   - Constitution → View
   - Meetings → View+Modify related
   - All other sections → None
7. Maria clicks "Save Changes"
8. System applies permissions immediately
9. Success message displays
10. Sarah receives notification
11. Maria returns to Advisor List showing updated badge

**Expected Result:** Sarah has granular mixed permissions: can create/edit own items in Communication and Meetings, view-only in Decisions and Constitution, no access to other sections.

---

### **Negative Test: Consul Attempts to Modify External Consul Permissions**

**Scenario:** Consul tries to manage External Consul, gets blocked

1. Consul logs into Family Portal
2. Navigates to "Advisor Management"
3. Sees External Consul "David Lee" in list with badge "Full Access (10/10 sections)"
4. Clicks "Manage Permissions" for David
5. Permission Editor opens in **read-only mode**
6. All access selectors are disabled (greyed out)
7. Banner at top: "⚠️ Only Admins can modify Consul permissions. Contact your family Admin."
8. No "Save Changes" button visible
9. Only "Close" button available

**Expected Result:** Consul cannot modify External Consul permissions, receives clear message to contact Admin.

---

### **Negative Test: Save with All Sections Set to None**

**Scenario:** Admin accidentally removes all access

1. Admin opens Permission Editor for Personal FA
2. Manually sets ALL sections to "None"
3. Clicks "Save Changes"
4. Warning modal appears:
   - ⚠️ "This advisor will have no access to any sections."
   - "Are you sure you want to proceed?"
   - Buttons: "Cancel" | "Yes, Remove All Access"
5a. If Admin clicks "Cancel":
   - Modal closes
   - Remains in editor with current configuration
   - Can adjust permissions
6a. If Admin clicks "Yes, Remove All Access":
   - Permissions saved
   - Advisor badge changes to "No Active Access"
   - Advisor receives notification

**Expected Result:** System warns before allowing complete access removal, prevents accidental lockout.

---

### **Edge Case: Template Applied, Then Manual Override**

**Scenario:** Admin applies template, then manually adjusts one section

1. Admin opens Permission Editor for Consultant
2. Selects template "Governance Consultant"
3. System sets:
   - Constitution → View+Modify related
   - Meetings → View+Modify related
   - Communication → View+Modify related
   - Decisions → View+Modify related
   - All other → None
4. Template dropdown shows "Governance Consultant"
5. Admin manually changes **Assets section** to "View"
6. Template dropdown **automatically changes to "Custom"**
7. Admin clicks "Save Changes"
8. All permissions saved as configured (mix of template + manual)

**Expected Result:** Manual changes override template selection, template selector updates to "Custom" to reflect mixed configuration.

---

### **Edge Case: Multiple Admins Edit Same Advisor Simultaneously**

**Scenario:** Concurrency conflict handling

1. Admin A opens Permission Editor for Personal FA "John"
2. Admin B opens Permission Editor for same "John" (2 seconds later)
3. Admin A changes Constitution → View+Modify All, saves (timestamp: 10:00:00)
4. Admin B changes Meetings → View, attempts to save (timestamp: 10:00:30)
5. System detects conflict
6. Warning modal for Admin B:
   - ⚠️ "Permissions were modified by Admin A 30 seconds ago."
   - "Your changes may overwrite theirs. Review recent changes?"
   - Shows diff: "Admin A changed Constitution from View to View+Modify All"
   - Buttons: "Cancel" | "Overwrite Anyway"
7. Admin B clicks "Overwrite Anyway"
8. System saves Admin B's changes (last write wins)
9. Audit log records both changes with timestamps

**Expected Result:** System warns about concurrent edits, allows Admin to decide whether to overwrite, maintains complete audit trail.

---

## 📝 Open Questions

### **Q1: Should Permission Editor show "last modified" information for each section?**

**Context from Epic Chat:**
- Initial access granted via invitation is already displayed in banner
- Audit log tracks all changes

**Answer from Epic:**  
✅ **Yes, show compact "last modified" per section**
- Format: "Last changed by [Admin Name] on [date]" (tooltip on hover)
- Helps Admins understand permission history without opening audit log
- Especially useful for sections with frequent changes

---

### **Q2: What happens if External Consul is downgraded from "View+Modify All" to lower access?**

**Context from Epic Chat:**
- External Consuls typically have full access by design
- Admins CAN downgrade if needed (e.g., consultant role changes)

**Answer from Epic:**  
✅ **Allow downgrade with confirmation modal**
- Warning modal: "⚠️ External Consuls typically have full access. Downgrading may limit their ability to serve your family effectively. Are you sure?"
- If confirmed, save new permissions
- Send notification to External Consul: "Your access has been adjusted by family Admin. Contact them for details."
- Log in audit trail as "role permission downgrade"

---

### **Q3: Should Consul see permission history/audit log for advisors they manage?**

**Context from Epic Chat:**
- Audit log is Admin-only feature
- Consuls manage Personal FA and Consultants but no audit access

**Answer from Epic:**  
✅ **No, audit log remains Admin-only**
- Consuls can see current permissions and "last modified" tooltip
- Cannot view full audit history
- If Consul needs audit info, must request from Admin
- Maintains clear separation: Consuls manage day-to-day, Admins have oversight

---

### **Q4: Can advisor request permission change from within their portal?**

**Context from Epic Chat:**
- Advisors cannot self-modify permissions
- Need mechanism for advisors to request changes

**Answer from Epic:**  
✅ **Out of scope for this story, future enhancement**
- Current story: Admin/Consul-initiated changes only
- Future story: "Advisor Permission Request Flow"
  - Advisor clicks "Request Additional Access"
  - Selects sections and desired levels
  - Request sent to Admin/Consul for approval
  - Tracked in notification system

---

### **Q5: What if Personal FA was granted 5 modules during invitation, but Admin wants to reduce to 2 post-connection?**

**Context from Epic Chat:**
- Initial invitation grants specific modules (1-7 for Personal FA)
- Post-connection, permissions can be adjusted

**Answer from Epic:**  
✅ **Allow reduction with confirmation**
- Warning modal: "⚠️ This will reduce [Advisor Name]'s access from 5 sections to 2 sections. They may not be able to complete their current work. Are you sure?"
- If confirmed, save reduced permissions
- Advisor receives notification with details
- Banner in Advisor's portal: "Your access has been adjusted. Contact family Admin if you need additional access."

---

### **Q7: How are permissions handled for sections that don't exist yet (future modules)?**

**Context from Epic Chat:**
- Platform may add new governance sections over time
- Need future-proof permission model

**Answer from Epic:**  
✅ **Default to "None" for new sections**
- When new section added to platform, ALL advisors default to "None" access
- Admins receive notification: "New section [Name] added. Review advisor permissions."
- Admins must explicitly grant access to new sections
- Templates updated to include new sections (Admin action required)

---

## 📝 Notes

### **Permission Template Definitions (Reference)**

**Admin Templates (Admin-only):**
- **"External Consul"**: All 10 sections → View+Modify All (except Billing if not Admin)
- **"Consul"**: All 10 sections → View+Modify All (except Billing, Extensions if not Admin)
- **"Admin"**: ALL sections including Billing, Extensions → View+Modify All

**Specialized Templates (Consul can use for Personal FA/Consultants):**
- **"Governance Consultant"**: Constitution, Meetings, Communication, Decisions → View+Modify related
- **"Succession Specialist"**: Succession, Education → View+Modify related
- **"Philanthropy Consultant"**: Philanthropy → View+Modify related
- **"Financial Observer"**: Assets → View only
- **"Limited Observer"**: Selected sections → View only
- **"Custom"**: Manual configuration (appears when user manually changes any setting)

---

### **Governance Section List (10+ sections)**

**Core 10 Governance Sections (all advisor types):**
1. Constitution
2. Meetings
3. Communication
4. Decisions
5. Education
6. Mentorship
7. Assets
8. Succession
9. Philanthropy
10. Family Management

**Admin-Only Sections (shown only to Admins in editor):**
11. Billing
12. Extensions

---

**Story Version:** 1.0.0  
**Last Updated:** 2025-10-30  
**Status:** Ready for Grooming
