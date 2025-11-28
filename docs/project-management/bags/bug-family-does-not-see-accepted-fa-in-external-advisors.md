---
title: "Bug Report: Family Does Not See Accepted FA in External Advisors List"
category: "bug"
audience: "developer|qa|frontend|backend"
created: "2025-11-26"
updated: "2025-11-26"
version: "1.0.0"
status: "active"
tags: ["bug", "frontend", "backend", "advisor-portal", "family-portal", "invitation", "external-advisors"]
owner: "product-team"
assignee: "a.strizhnev@reluna.com"
priority: "High"
severity: "Major"
---

# Bug Report: Family Does Not See Accepted FA in External Advisors List

> **Status:** Active
> **Priority:** High
> **Severity:** Major
> **Assignee:** a.strizhnev@reluna.com

---

## 📋 Basic Information

**Issue Type:** Bug
**Project:** FG
**Summary:** After FA accepts family invitation via email link, the FA does not appear in Family's External Advisors list
**Original Epic:** EPIC-013
**Assignee:** a.strizhnev@reluna.com
**Priority:** High
**Severity:** Major
**Tags:** `bug`, `frontend`, `backend`, `advisor-portal`, `family-portal`, `invitation`, `external-advisors`, `relationship`, `data-sync`
**Story Points:** TBD
**Sprint:** TBD

---

## 🐛 Bug Description

**What is broken?**

When a Family invites a Financial Advisor (FA) and the FA accepts the invitation by clicking the link in the email, the relationship should be established and visible on both sides. However, the FA does not appear in the Family's "External Advisors" list after accepting the invitation.

**Workflow:**
1. Family navigates to Family Members → External Advisors tab
2. Family sends invitation to FA via "Invite Family Advisor" or "Add Advisor" functionality
3. FA receives invitation email with acceptance link
4. FA clicks link and accepts invitation
5. FA sees family in their family list (this works - separate bug: shows "Unknown Family")
6. **BUG:** Family does NOT see the FA in their External Advisors list
7. External Advisors section shows: "No external advisors linked yet. Use an invite code from an advisor to establish a connection."

**Affected Area:**
- **Component:** Family Portal - External Advisors Section
- **Location:** Family Members → External Advisors tab
- **Navigation Path:** Dashboard → Family → Family Members → External Advisors

**Impact:**
- **MAJOR:** Family cannot see which advisors they've invited and who accepted
- Family-Advisor relationship appears broken from family's perspective
- Advisor relationship is one-directional (FA sees family, family doesn't see FA)
- Family cannot manage advisor access or permissions
- Family may re-invite the same advisor thinking invitation failed
- Breaks core advisor portal functionality
- Data inconsistency between FA portal and Family portal views

---

## 👥 Affected Users

**Who is impacted by this bug?**

- **Primary Personas:**
  - Families who invite financial advisors
  - Financial Advisors who accept invitations
  - Family administrators managing advisor relationships

- **User Impact Level:** All families who invite advisors
- **Frequency:** Every time FA accepts invitation (100% reproduction rate)
- **Workaround Available:** None - family has no way to see accepted advisors

**Business Impact:**
- Breaks core value proposition of advisor collaboration
- Family cannot verify advisor has access
- Cannot manage advisor permissions if advisor not visible
- Creates confusion and support tickets
- Damages trust in platform functionality
- May prevent families from using advisor features

---

## ✅ Expected Behavior

**What SHOULD happen:**

1. Family sends invitation to FA
2. FA receives invitation email with link
3. FA clicks link and accepts invitation
4. System creates bidirectional relationship:
   - FA sees family in their family list
   - **Family sees FA in External Advisors list**
5. Family can view FA details:
   - FA name
   - FA email
   - FA firm/organization
   - Date added/joined
   - Status (Active)
   - Permissions granted

**Expected display in Family's External Advisors list:**
```
External Advisors
Connect with external advisors who can provide specialized expertise for your family governance needs.

┌─────────────────────────────────────────────────────┐
│ John Smith                                          │
│ Email: john.smith@advisors.com                      │
│ Firm: Smith Financial Advisory                      │
│ Added: Nov 26, 2025                                 │
│ Status: Active                                      │
│ [Manage Permissions] [Remove Advisor]              │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ Sarah Johnson                                       │
│ Email: sarah.j@lawfirm.com                          │
│ Firm: Johnson & Partners Law                        │
│ Added: Nov 21, 2025                                 │
│ Status: Active                                      │
│ [Manage Permissions] [Remove Advisor]              │
└─────────────────────────────────────────────────────┘

[+ Add Advisor]  [Invite Family Advisor]
```

**Key Requirements:**
- Advisor appears in External Advisors list immediately after accepting invitation
- Family can see all advisors who have accepted invitations
- Advisor information displays correctly (name, email, firm)
- Family can manage advisor permissions
- Bidirectional relationship visible on both sides

---

## ❌ Actual Behavior

**What ACTUALLY happens:**

1. Family sends invitation to FA
2. FA receives invitation email with link
3. FA clicks link and accepts invitation
4. FA sees family in their family list (though with "Unknown Family" name bug)
5. **Family does NOT see FA in External Advisors list**
6. External Advisors section shows empty state:
   - "No external advisors linked yet."
   - "Use an invite code from an advisor to establish a connection."
7. Family has no indication that FA accepted invitation
8. Family cannot manage or view the advisor

**Actual broken display in Family's External Advisors:**
```
External Advisors
Connect with external advisors who can provide specialized expertise for your family governance needs.

┌─────────────────────────────────────────────────────┐
│                                                     │
│  No external advisors linked yet. Use an invite    │
│  code from an advisor to establish a connection.   │
│                                                     │
└─────────────────────────────────────────────────────┘

[+ Add Advisor]
```

**Problems:**
- Advisor relationship is one-way only (FA → Family visible, Family → FA NOT visible)
- Family cannot verify advisor has access
- Empty state shows even though advisor accepted invitation
- Family may think invitation failed and try to re-invite
- No way for family to manage advisor relationship
- Data inconsistency between two portals

---

## 📸 Evidence

**Screenshot:**
![Family External Advisors Empty State](../attachments/family-external-advisors-empty.png)

**Expected Evidence to Capture:**
1. Screenshot: Family's External Advisors page showing empty state
2. Screenshot: FA's family list showing the family (confirming FA accepted invitation)
3. Browser console: Check for errors when loading External Advisors page
4. Network tab: API response for GET /api/family/advisors (or similar endpoint)
5. Database: Query showing advisor-family relationship exists
6. Backend logs: Invitation acceptance and relationship creation logs

**API Investigation:**
```
# What does family portal call to get advisors list?
GET /api/family/{family_id}/advisors
GET /api/family/external-advisors
GET /api/advisors (for family context)

# Does this return the accepted advisor?
# Check response body
```

**Database Investigation:**
```sql
-- Check if relationship exists in database
SELECT * FROM advisor_family_relationships
WHERE family_id = '{family_id}'
AND advisor_id = '{advisor_id}';

-- Check relationship status
-- Is status = 'active' or 'accepted'?
-- Are both sides of relationship created?
```

---

## 🔄 Steps to Reproduce

**Prerequisites:**
- Active family account with name set
- FA account (existing or new registration)
- Email delivery working for invitations
- Access to both family and FA portals

**Steps:**

1. **Setup - Login as Family:**
   - Login to family account
   - Navigate to Family Members page
   - Click on "External Advisors" tab
   - Verify current state (should be empty or show existing advisors)

2. **Send Invitation to FA:**
   - Click "Invite Family Advisor" or "Add Advisor" button
   - Enter FA email address (e.g., fa@test.com)
   - Send invitation
   - Note: Invitation email sent to FA

3. **Accept Invitation as FA:**
   - Login as FA account (or open FA email)
   - Open invitation email from family
   - Click acceptance link in email
   - Follow acceptance flow
   - Verify invitation acceptance success message

4. **Verify FA Side (Working):**
   - Navigate to FA's Families list
   - Confirm family appears in list (note: may show as "Unknown Family" due to separate bug)
   - Verify relationship exists from FA perspective

5. **Observe Bug - Family Side:**
   - Return to family account
   - Navigate to Family Members → External Advisors tab
   - **BUG:** FA does NOT appear in External Advisors list
   - Empty state message shows: "No external advisors linked yet."
   - Refresh page - FA still doesn't appear
   - Logout and login again - FA still doesn't appear

6. **Additional Testing:**
   - Check browser console for errors
   - Check network tab for API calls
   - Verify database - does relationship exist?
   - Check if FA can actually access family data (permissions working?)

**Reproducibility:** 100% - occurs every time FA accepts family invitation

**Environment:**
- **Browser:** All browsers (Chrome, Firefox, Safari, Edge)
- **Device:** Desktop, mobile, tablet
- **User Roles:** All families who invite advisors, all FAs who accept
- **Timing:** After FA accepts invitation via email link

---

## 🎯 Acceptance Criteria for Fix

**Fix is complete when:**

### Core Functionality:
- [ ] Family sends invitation to FA
- [ ] FA accepts invitation via email link
- [ ] **FA appears in Family's External Advisors list immediately**
- [ ] Advisor information displays correctly:
  - [ ] Advisor name
  - [ ] Advisor email
  - [ ] Advisor firm/organization (if available)
  - [ ] Date joined/added
  - [ ] Status (Active)
- [ ] Bidirectional relationship visible on both sides:
  - [ ] FA sees family in their family list
  - [ ] Family sees FA in their External Advisors list

### Data Sync:
- [ ] Relationship created in database correctly
- [ ] Both sides of relationship active
- [ ] API returns advisor in family's advisor list
- [ ] Frontend displays advisor from API response
- [ ] No data inconsistency between portals

### UI/UX:
- [ ] Empty state message disappears when advisors exist
- [ ] Advisor card/row displays with correct information
- [ ] Family can click on advisor to view details
- [ ] Family can manage advisor permissions (if applicable)
- [ ] "Add Advisor" and "Invite Family Advisor" buttons still visible

### Real-time Updates:
- [ ] Advisor appears without requiring page refresh
- [ ] If refresh needed, advisor appears after refresh
- [ ] No delay in advisor appearing in list

### Multiple Advisors:
- [ ] Can invite and display multiple advisors
- [ ] Each advisor shows unique correct information
- [ ] List updates correctly as advisors are added

### Edge Cases:
- [ ] Works when FA accepts invitation immediately
- [ ] Works when FA accepts invitation after delay
- [ ] Works when family invites multiple advisors
- [ ] Works when advisor is re-invited after removal
- [ ] Handles advisors with incomplete profiles gracefully

### Testing:
- [ ] Tested with multiple families and advisors
- [ ] Tested across all browsers
- [ ] No console errors
- [ ] API returns 200 OK with correct data
- [ ] Database queries confirm relationship
- [ ] No regression in other family/advisor features

---

## 💡 Root Cause Analysis & Suggested Solutions

**Possible Root Causes:**

### 1. Backend Not Creating Bidirectional Relationship
- **One-way relationship:** System only creates FA→Family link, not Family→FA link
- **Missing reverse relationship:** Invitation acceptance creates advisor's view but not family's view
- **Database schema issue:** Only one direction stored in relationships table
- **Status field issue:** Relationship exists but status not set to "active" or "visible"

### 2. API Not Returning Advisors to Family
- **Wrong endpoint query:** Family portal queries advisors but query doesn't include accepted relationships
- **Missing join:** Backend doesn't join advisor details when fetching family's advisors
- **Permission filter:** Query filters out advisors due to incorrect permission check
- **Status filter:** API only returns advisors with specific status, but accepted advisors have different status

### 3. Frontend Not Displaying Advisors
- **Field mapping issue:** API returns advisors but frontend looks for wrong field
- **Conditional rendering:** Frontend only shows advisors under certain conditions (not met)
- **Empty state override:** Frontend hardcodes empty state instead of checking actual data
- **API not called:** Frontend doesn't call GET advisors endpoint after invitation acceptance

### 4. Invitation Acceptance Flow Incomplete
- **Missing step:** Invitation acceptance doesn't trigger relationship finalization
- **Async issue:** Relationship created but not committed before response
- **Event not fired:** Acceptance doesn't trigger "relationship created" event
- **Cache issue:** Family portal shows cached empty list

### 5. Database Relationship Schema Issue
- **Wrong table structure:** advisor_family_relationships table doesn't support bidirectional visibility
- **Missing columns:** No "visible_to_family" or "visible_to_advisor" flags
- **Status values:** Relationship status after acceptance is not correct value for display

**Investigation Steps:**

#### 1. Check Database - Does Relationship Exist?
```sql
-- Check if relationship exists after FA accepts invitation
SELECT * FROM advisor_family_relationships
WHERE advisor_id = '{accepted_advisor_id}'
AND family_id = '{family_id}';

-- Expected result:
-- Row exists with status = 'active' or 'accepted'

-- Check what fields are available
SELECT
  id,
  advisor_id,
  family_id,
  status,
  visible_to_family, -- Does this column exist?
  visible_to_advisor, -- Does this column exist?
  created_at,
  accepted_at,
  invited_by
FROM advisor_family_relationships
WHERE family_id = '{family_id}';
```

#### 2. Check Backend API - What Does Family Portal Call?
```bash
# When family opens External Advisors page, what API is called?

# Possible endpoints:
GET /api/family/{family_id}/advisors
GET /api/family/external-advisors
GET /api/advisors?family_id={family_id}

# Check response:
{
  "advisors": [
    {
      "id": "advisor-123",
      "name": "John Smith",
      "email": "john@advisors.com",
      "firm": "Smith Financial",
      "status": "active",
      "joined_date": "2025-11-26"
    }
  ]
}

# Is the accepted advisor in this response?
```

#### 3. Check Backend Code - Query Logic
```python
# Backend endpoint that returns advisors for family
@router.get("/family/{family_id}/advisors")
async def get_family_advisors(family_id: str):
    """Get external advisors for family."""

    # Question: What does this query return?
    relationships = await db.get_family_advisor_relationships(family_id)

    # Does it filter by status?
    # Does it only return specific relationship types?
    # Does it check visibility flags?

    advisors = []
    for rel in relationships:
        advisor = await db.get_advisor(rel.advisor_id)
        advisors.append({
            "id": advisor.id,
            "name": advisor.name,
            "email": advisor.email,
            "firm": advisor.firm,
            "joined_date": rel.created_at,
            "status": rel.status
        })

    return {"advisors": advisors}
```

#### 4. Check Invitation Acceptance Code
```python
# When FA accepts invitation, what happens?
@router.post("/invitations/accept")
async def accept_invitation(token: str, advisor_id: str):
    """Accept family invitation."""

    invitation = await db.verify_invitation_token(token)

    # Create relationship
    relationship = await db.create_advisor_family_relationship(
        advisor_id=advisor_id,
        family_id=invitation.family_id,
        role=invitation.role,
        permissions=invitation.permissions,
        status="active"  # Is this correct status?
    )

    # Question: Is relationship visible from both sides?
    # Question: Does this trigger family portal update?

    return {"success": True}
```

#### 5. Check Frontend Code - External Advisors Component
```typescript
// Family portal - External Advisors component
function ExternalAdvisorsPage() {
  const [advisors, setAdvisors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAdvisors();
  }, []);

  async function loadAdvisors() {
    try {
      const response = await api.get('/family/external-advisors');
      setAdvisors(response.data.advisors); // Is this field correct?
    } catch (error) {
      console.error('Failed to load advisors:', error);
    } finally {
      setLoading(false);
    }
  }

  // Question: Does this show empty state even when advisors exist?
  if (advisors.length === 0) {
    return <EmptyState message="No external advisors linked yet." />;
  }

  return (
    <div className="advisors-list">
      {advisors.map(advisor => (
        <AdvisorCard key={advisor.id} advisor={advisor} />
      ))}
    </div>
  );
}
```

**Suggested Solutions:**

### Solution A: Fix Backend Relationship Creation (Most Likely)

Ensure relationship is created with correct status and visibility:

```python
# Backend - Invitation acceptance endpoint
@router.post("/invitations/accept")
async def accept_invitation(token: str, advisor_id: str):
    """Accept family invitation."""

    invitation = await db.verify_invitation_token(token)

    # Create bidirectional relationship
    relationship = await db.create_advisor_family_relationship(
        advisor_id=advisor_id,
        family_id=invitation.family_id,
        role=invitation.role,
        permissions=invitation.permissions,
        status="accepted",  # Status must be "accepted" or "active"
        visible_to_family=True,  # IMPORTANT: Family can see this advisor
        visible_to_advisor=True,  # Advisor can see this family
        accepted_at=datetime.utcnow()
    )

    # Mark invitation as accepted
    await db.update_invitation_status(invitation.id, "accepted")

    # Optional: Trigger notification to family
    await notify_family_advisor_accepted(invitation.family_id, advisor_id)

    return {
        "success": True,
        "relationship": relationship,
        "family": await db.get_family(invitation.family_id),
        "advisor": await db.get_advisor(advisor_id)
    }
```

### Solution B: Fix Backend API Query

Ensure API returns all accepted advisors for family:

```python
# Backend - Get family advisors endpoint
@router.get("/family/{family_id}/advisors")
async def get_family_advisors(family_id: str, current_user: User = Depends(get_current_user)):
    """Get all external advisors for family."""

    # Verify user has permission to view family advisors
    if not await user_can_view_family(current_user, family_id):
        raise HTTPException(status_code=403, detail="Access denied")

    # Get ALL advisor relationships for this family
    # Include accepted, active invitations
    relationships = await db.query(AdvisorFamilyRelationship).filter(
        AdvisorFamilyRelationship.family_id == family_id,
        AdvisorFamilyRelationship.status.in_(["accepted", "active"]),  # Include both statuses
        AdvisorFamilyRelationship.visible_to_family == True  # Only visible relationships
    ).all()

    advisors = []
    for rel in relationships:
        # Fetch full advisor details
        advisor = await db.get_advisor(rel.advisor_id)

        advisors.append({
            "id": advisor.id,
            "name": advisor.name or advisor.email,  # Fallback to email if name not set
            "email": advisor.email,
            "firm": advisor.firm_name,
            "role": rel.role,
            "status": rel.status,
            "joined_date": rel.accepted_at or rel.created_at,
            "permissions": rel.permissions
        })

    return {"advisors": advisors, "count": len(advisors)}
```

### Solution C: Fix Database Schema (If Needed)

Add visibility flags if they don't exist:

```sql
-- Add visibility columns to relationship table (if not exist)
ALTER TABLE advisor_family_relationships
ADD COLUMN visible_to_family BOOLEAN DEFAULT TRUE,
ADD COLUMN visible_to_advisor BOOLEAN DEFAULT TRUE,
ADD COLUMN accepted_at TIMESTAMP;

-- Update existing relationships to be visible
UPDATE advisor_family_relationships
SET
  visible_to_family = TRUE,
  visible_to_advisor = TRUE,
  accepted_at = updated_at
WHERE status IN ('accepted', 'active');

-- Add index for performance
CREATE INDEX idx_family_advisors
ON advisor_family_relationships(family_id, visible_to_family, status);
```

### Solution D: Fix Frontend Display Logic

Ensure frontend correctly handles advisor data:

```typescript
// Frontend - External Advisors component
function ExternalAdvisorsPage() {
  const { familyId } = useAuth();
  const [advisors, setAdvisors] = useState<Advisor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAdvisors();
  }, [familyId]);

  async function loadAdvisors() {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get(`/family/${familyId}/advisors`);

      // Check response structure
      console.log('Advisors API response:', response.data);

      // Handle both response formats
      const advisorsList = response.data.advisors || response.data || [];
      setAdvisors(advisorsList);

    } catch (error) {
      console.error('Failed to load advisors:', error);
      setError('Failed to load external advisors');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={loadAdvisors} />;
  }

  return (
    <div className="external-advisors-page">
      <h2>External Advisors</h2>
      <p>Connect with external advisors who can provide specialized expertise for your family governance needs.</p>

      {advisors.length === 0 ? (
        <EmptyState
          title="No external advisors linked yet"
          message="Use an invite code from an advisor to establish a connection."
          actions={<>
            <Button onClick={() => setShowInviteModal(true)}>Invite Family Advisor</Button>
            <Button variant="secondary" onClick={() => setShowAddModal(true)}>Add Advisor</Button>
          </>}
        />
      ) : (
        <>
          <div className="advisors-grid">
            {advisors.map(advisor => (
              <AdvisorCard
                key={advisor.id}
                advisor={advisor}
                onManagePermissions={() => handleManagePermissions(advisor)}
                onRemove={() => handleRemoveAdvisor(advisor)}
              />
            ))}
          </div>

          <div className="actions">
            <Button onClick={() => setShowInviteModal(true)}>+ Invite Family Advisor</Button>
            <Button variant="secondary" onClick={() => setShowAddModal(true)}>+ Add Advisor</Button>
          </div>
        </>
      )}
    </div>
  );
}
```

### Solution E: Add Real-time Update (Enhancement)

Trigger immediate update when FA accepts invitation:

```python
# Backend - After invitation acceptance, notify family portal
@router.post("/invitations/accept")
async def accept_invitation(token: str, advisor_id: str):
    """Accept family invitation."""

    # ... create relationship ...

    # Emit WebSocket event to family portal
    await websocket_manager.send_to_family(
        family_id=invitation.family_id,
        event_type="advisor_accepted",
        data={
            "advisor_id": advisor_id,
            "advisor_name": advisor.name,
            "accepted_at": datetime.utcnow().isoformat()
        }
    )

    return {"success": True}
```

```typescript
// Frontend - Listen for real-time updates
useEffect(() => {
  const socket = websocketService.connect();

  socket.on('advisor_accepted', (data) => {
    // Reload advisors list when new advisor accepts
    loadAdvisors();

    // Show notification
    showNotification(`${data.advisor_name} has accepted your invitation!`);
  });

  return () => socket.disconnect();
}, []);
```

**Recommended Approach:**

**Check in this order:**
1. **First:** Check database - does relationship exist with correct status?
2. **Second:** Check API response - does family advisors endpoint return the advisor?
3. **Third:** Check invitation acceptance code - is relationship created correctly?
4. **Fourth:** Check frontend - does it display API data correctly?
5. **Fifth:** Fix whichever layer has the issue

**Most Likely Root Cause:** Backend relationship creation or API query logic

---

## 🔍 Technical Details to Investigate

**Critical Questions:**

1. **Database:**
   - Q: Does advisor_family_relationships table have row for this relationship?
   - Q: What is the status value? ("pending", "accepted", "active"?)
   - Q: Are there visibility flags? (visible_to_family, visible_to_advisor)
   - Q: Does table support bidirectional relationships?

2. **Backend API:**
   - Q: What endpoint does family portal call for advisors list?
   - Q: What does the response contain?
   - Q: Does query filter by status? What statuses are included?
   - Q: Does query check visibility flags?

3. **Invitation Acceptance:**
   - Q: What happens when FA clicks acceptance link?
   - Q: Is relationship created with correct status?
   - Q: Are both visibility directions set to true?
   - Q: Is accepted_at timestamp set?

4. **Frontend:**
   - Q: Does frontend call the correct API endpoint?
   - Q: Does frontend handle response data correctly?
   - Q: Is there conditional logic hiding advisors?
   - Q: Does frontend force empty state?

5. **Permissions:**
   - Q: Does family need specific permission to view advisors?
   - Q: Is permission check blocking display?
   - Q: Does advisor need to complete profile before being visible?

**Required Debug Information:**

Please capture:
1. Database query result: `SELECT * FROM advisor_family_relationships WHERE family_id = '{family_id}'`
2. API response: GET /family/{family_id}/advisors (full JSON)
3. Backend logs during invitation acceptance
4. Frontend console logs when loading External Advisors page
5. Network tab showing API call and response
6. Screenshot of family's External Advisors page (empty state)
7. Screenshot of FA's family list (showing family is visible to FA)

---

## 🧪 Testing Requirements

**QA must verify:**

### 1. Invitation and Acceptance Flow:
- [ ] Family sends invitation to FA
- [ ] FA receives invitation email
- [ ] FA clicks link and accepts invitation
- [ ] **FA appears in Family's External Advisors list**
- [ ] Advisor information is complete and accurate

### 2. Bidirectional Visibility:
- [ ] FA sees family in their family list
- [ ] Family sees FA in their External Advisors list
- [ ] Both sides show correct information
- [ ] Relationship is truly bidirectional

### 3. Multiple Advisors:
- [ ] Invite and accept 3+ advisors
- [ ] All advisors appear in Family's list
- [ ] Each advisor shows unique correct information
- [ ] List updates correctly as new advisors accept

### 4. Advisor Information Display:
- [ ] Advisor name displays correctly
- [ ] Advisor email displays correctly
- [ ] Advisor firm/organization (if available)
- [ ] Date joined/accepted shows correct date
- [ ] Status shows "Active"

### 5. Empty State vs Populated State:
- [ ] Before any advisors: empty state message shows
- [ ] After first advisor accepts: empty state disappears
- [ ] Advisors list displays with advisor cards
- [ ] Action buttons (Add/Invite) still visible

### 6. Real-time or Refresh:
- [ ] Advisor appears immediately (if real-time implemented)
- [ ] OR advisor appears after page refresh
- [ ] No excessive delay in display

### 7. UI Actions:
- [ ] Can click on advisor card to view details
- [ ] Can manage advisor permissions (if applicable)
- [ ] Can remove advisor (if applicable)
- [ ] All buttons and links functional

### 8. Database Verification:
- [ ] Relationship exists in database
- [ ] Status is "accepted" or "active"
- [ ] Visibility flags are true (if applicable)
- [ ] accepted_at timestamp is set

### 9. API Verification:
- [ ] Family advisors endpoint returns correct data
- [ ] Response includes all accepted advisors
- [ ] Response format matches frontend expectations
- [ ] No console errors when loading page

### 10. Edge Cases:
- [ ] FA accepts invitation immediately
- [ ] FA accepts invitation after delay (days)
- [ ] Multiple FAs accept invitations simultaneously
- [ ] FA with incomplete profile (fallback handling)
- [ ] Advisor with very long name or firm name
- [ ] Advisor removed and re-invited

### 11. Cross-Browser Testing:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

### 12. Different User Roles:
- [ ] Family admin can see advisors
- [ ] Family members can see advisors (if permitted)
- [ ] Verify advisor sees family correctly

### 13. Regression Testing:
- [ ] Existing advisor relationships still display
- [ ] No impact on other family features
- [ ] Invitation sending still works
- [ ] FA acceptance flow still works

---

## 🔗 Related Issues

**Directly Related:**
- Bug: FA sees "Unknown Family" instead of family name (inverse bug - FA side works but shows wrong name)
- Invitation system functionality
- Advisor-family relationship management (EPIC-004)

**Potentially Related:**
- Advisor portal RBAC permissions (EPIC-004)
- Family member management
- External advisor onboarding flow
- Bidirectional relationship sync issues

**Related User Stories:**
- Family can invite external advisors
- Advisor can accept family invitations
- Family can view and manage external advisors
- Bidirectional relationship visibility

---

## 📊 Priority Justification

**Why High Priority + Major Severity?**

- **High Priority:** Core functionality broken, affects key user workflow
- **Major Severity:** Feature doesn't work as designed, blocking important use case
- **Business Impact:** HIGH - breaks advisor collaboration feature
- **User Impact:** All families who invite advisors are affected
- **Visibility:** Family cannot verify advisor has access
- **Workaround:** None - no alternative way to see advisors
- **Frequency:** 100% reproduction rate
- **Data Integrity:** Relationship exists in DB but not visible (data inconsistency)

**Severity Assessment:**
- **Blocker:** No - families can still function, but advisor collaboration broken
- **Critical:** No - doesn't crash system or lose data
- **Major:** YES - core feature completely non-functional from family perspective
- **Minor:** No - this is not cosmetic, it's functional failure

**Priority Assessment:**
- **Critical (P0):** No - not emergency/production-down
- **High (P1):** YES - breaks core value proposition, should fix in 1 week
- **Medium (P2):** No - impact too significant
- **Low (P3):** No - this is a major functional issue

**Why High Priority?**
- Affects primary business value (family-advisor collaboration)
- Blocks families from managing advisor relationships
- High visibility to paying customers
- Creates confusion and support tickets
- Cannot manage permissions if advisor not visible
- Breaks trust in platform

**Why Major Severity?**
- Core feature completely broken
- Bidirectional relationship only works one way
- Affects 100% of families who use advisor invitations
- No workaround available
- Data exists but not accessible (architectural issue)

**Recommendation:**
- **Fix in Sprint 1 (within 1 week)**
- High business impact warrants quick fix
- Likely backend API or query issue
- Include in Phase 1 of bug fixes roadmap
- Test thoroughly to ensure bidirectional sync works

---

## 📅 Timeline

**Reported:** 2025-11-26
**Target Fix Date:** Sprint 1 (within 1 week)
**Estimated Effort:**
- Investigation: 2-3 hours (check DB, API, invitation flow)
- Fix: 3-6 hours (backend API query or relationship creation)
- Testing: 3-4 hours (verify bidirectional sync, multiple scenarios)
- **Total: 8-13 hours** (~1-2 dev days)

**Quick Fix Potential:** ⚡⚡ MEDIUM-HIGH
- Likely backend API query or status filter issue
- May require schema changes if visibility flags missing
- Moderate risk - affects relationship data
- Need thorough testing of bidirectional sync

---

## 📝 Notes

**User Experience Impact:**
This bug breaks a core value proposition of the platform - family-advisor collaboration. Families have no way to verify their advisors have access, cannot manage permissions, and may think the invitation system is broken. This creates confusion, support tickets, and damages trust.

**Investigation Priority:**
1. First, check database - does relationship exist?
2. If yes, check API - does endpoint return the advisor?
3. If no, check invitation acceptance - is relationship created correctly?
4. Check status values and visibility flags

**Quick Diagnostic:**
```bash
# In database, check relationship
SELECT id, family_id, advisor_id, status, created_at, accepted_at
FROM advisor_family_relationships
WHERE family_id = '{family_id}'
AND advisor_id = '{advisor_id}';

# Expected: Row exists with status = 'accepted' or 'active'
# If missing: Bug is in invitation acceptance
# If exists but wrong status: Bug is in API query filter
```

**Communication:**
After fix:
- Internal: Notify support team bug is fixed
- External: Consider notifying affected families (if any in production)
- Release notes: "Fixed: External advisors now appear correctly after accepting invitation"

**Related Enhancement:**
Consider adding:
- Real-time notification when advisor accepts invitation
- Email to family when advisor accepts
- Activity log showing invitation sent/accepted events
- Status indicator: Pending vs Accepted invitations

**Data Migration:**
If fix requires schema changes, may need migration to update existing relationships:
```sql
-- Backfill visibility flags for existing relationships
UPDATE advisor_family_relationships
SET visible_to_family = TRUE, visible_to_advisor = TRUE
WHERE status IN ('accepted', 'active')
AND visible_to_family IS NULL;
```

---

**Bug ID:** TBD (to be assigned in Jira)
**Reported by:** e.savelova
**Date:** 2025-11-26
**Related Epic:** EPIC-013
**Related Bug:** Bug - FA sees "Unknown Family" instead of family name
