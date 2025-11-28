---
title: "Bug Report: FA Sees 'Unknown Family' Instead of Family Name After Accepting Invitation"
category: "bug"
audience: "developer|qa|frontend|backend"
created: "2025-11-21"
updated: "2025-11-21"
version: "1.0.0"
status: "active"
tags: ["bug", "frontend", "backend", "advisor-portal", "family-list", "invitation", "display"]
owner: "product-team"
assignee: "a.strizhnev@reluna.com"
priority: "High"
severity: "Minor"
---

# Bug Report: FA Sees 'Unknown Family' Instead of Family Name After Accepting Invitation

> **Status:** Active
> **Priority:** High
> **Severity:** Minor
> **Assignee:** a.strizhnev@reluna.com

---

## 📋 Basic Information

**Issue Type:** Bug
**Project:** FG
**Summary:** Financial Advisor sees "Unknown Family" in family list instead of actual family name after accepting invitation
**Original Epic:** EPIC-003 (Advisor Registration & Profile Management) or EPIC-004 (Advisor Portal RBAC)
**Assignee:** a.strizhnev@reluna.com
**Priority:** High
**Severity:** Minor
**Tags:** `bug`, `frontend`, `backend`, `advisor-portal`, `family-list`, `invitation`, `display`, `data-loading`
**Story Points:** TBD
**Sprint:** TBD

---

## 🐛 Bug Description

**What is broken?**

When a Financial Advisor (FA) accepts a family invitation by clicking the link in the invitation email, the family successfully appears in the FA's family list. However, instead of displaying the correct family name, the system shows "Unknown Family" as a placeholder.

**Workflow:**
1. Family sends invitation to FA via email
2. FA receives invitation email with link
3. FA clicks link and accepts invitation
4. Family appears in FA's family list
5. **BUG:** Family displays as "Unknown Family" instead of actual family name (e.g., "Smith Family", "Johnson Family Trust")

**Affected Area:**
- **Component:** FA Dashboard - Family List
- **Location:** Families section in advisor portal
- **Navigation Path:** FA Dashboard → Families List

**Impact:**
- **HIGH:** FA cannot identify which family they're working with
- Unprofessional appearance in advisor portal
- Confusion when FA has multiple families
- Data is present (family relationship exists) but display name is wrong
- Affects advisor workflow and client management

---

## 👥 Affected Users

**Who is impacted by this bug?**

- **Primary Personas:**
  - Financial Advisors who accept family invitations
  - Families who invite advisors (see unprofessional "Unknown Family" if they view advisor's perspective)

- **User Impact Level:** All FAs who accept family invitations
- **Frequency:** Every time FA accepts invitation via email link (100% reproduction rate)
- **Workaround Available:** Unknown - may require manual data refresh or logout/login

**Business Impact:**
- Damages professional image of platform
- Confuses advisors managing multiple families
- May cause FA to contact wrong family
- Reduces trust in platform quality

---

## ✅ Expected Behavior

**What SHOULD happen:**

1. Family sends invitation to FA
2. FA clicks invitation link from email
3. FA accepts invitation
4. Family appears in FA's family list
5. **Family displays with correct name:**
   - "Smith Family"
   - "Johnson Family Trust"
   - "Garcia Family Office"
   - Or whatever the family named themselves

**Expected display in FA family list:**
```
Families
┌─────────────────────────────────────┐
│ Smith Family                    ⭐  │
│ Members: 4                          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Johnson Family Trust            ⭐  │
│ Members: 6                          │
└─────────────────────────────────────┘
```

**Key Requirements:**
- Display actual family name from database
- Name should be what family set during registration/profile setup
- Should match family's own view of their name
- Should load immediately when family appears in list

---

## ❌ Actual Behavior

**What ACTUALLY happens:**

1. Family sends invitation to FA
2. FA clicks invitation link from email
3. FA accepts invitation
4. Family appears in FA's family list
5. **Family displays as "Unknown Family"** (incorrect)

**Actual broken display:**
```
Families
┌─────────────────────────────────────┐
│ Unknown Family                  ⭐  │
│ Members: 4                          │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Unknown Family                  ⭐  │
│ Members: 6                          │
└─────────────────────────────────────┘
```

**Problems:**
- Generic "Unknown Family" placeholder shown
- Cannot distinguish between multiple families
- Family name exists in database but not displayed
- May persist even after page refresh (needs testing)

---

## 📸 Evidence

**Expected Evidence to Capture:**
- Screenshot of FA family list showing "Unknown Family"
- Browser console showing family data (does it include family name?)
- Network tab showing API response (is family name in the response?)
- Database query showing family name exists
- Comparison with family's own profile (does family have name set?)

**To Reproduce:**
1. Screenshot: Family list in FA dashboard showing "Unknown Family"
2. Console log: Family data object
3. Network request: GET /api/advisor/families response
4. Database: `SELECT id, name FROM families WHERE id = 'xxx'`

---

## 🔄 Steps to Reproduce

**Prerequisites:**
- Active family account with name set (e.g., "Smith Family")
- FA account or ability to register new FA
- Email delivery working for invitations

**Steps:**

1. **Setup - Create/Login as Family:**
   - Login as family account
   - Ensure family name is set in profile (e.g., "Smith Family")
   - Note the family name for verification

2. **Send Invitation to FA:**
   - Navigate to Advisor/Members section
   - Click "Invite Advisor" or similar
   - Enter FA email address
   - Send invitation
   - Invitation email sent to FA

3. **Accept Invitation as FA:**
   - Login as FA (or open invitation email)
   - Click invitation link from email
   - Accept the invitation
   - Verify invitation acceptance success

4. **Observe Bug:**
   - Navigate to FA's Families list page
   - Look for newly added family
   - **BUG:** Family displays as "Unknown Family" instead of "Smith Family"

5. **Additional Testing:**
   - Refresh page - does name appear? (Test if it's loading delay)
   - Logout and login again - does name appear? (Test if session issue)
   - Check browser console for errors
   - Check network tab for API response data

**Reproducibility:** 100% - occurs every time FA accepts family invitation

**Environment:**
- **Browser:** All browsers (Chrome, Firefox, Safari, Edge)
- **Device:** Desktop, mobile, tablet
- **User Role:** Financial Advisor
- **Timing:** After accepting invitation via email link

---

## 🎯 Acceptance Criteria for Fix

**Fix is complete when:**

### Core Functionality:
- [ ] FA accepts family invitation via email link
- [ ] Family appears in FA's family list
- [ ] **Family displays with correct name** (not "Unknown Family")
- [ ] Name matches family's self-designated name
- [ ] Name displays immediately on page load

### Data Integrity:
- [ ] Family name fetched from database correctly
- [ ] API returns family name in response
- [ ] Frontend displays API-provided name
- [ ] No placeholder "Unknown Family" shown

### Multiple Families:
- [ ] Each family shows unique, correct name
- [ ] No confusion between families
- [ ] FA can distinguish all their families

### Edge Cases:
- [ ] Works when family has not set name (show email or "Family [ID]" as fallback)
- [ ] Works when family name has special characters
- [ ] Works when family name is very long (truncate gracefully)
- [ ] Works immediately after invitation acceptance (no delay)

### Persistence:
- [ ] Family name persists after page refresh
- [ ] Family name persists after logout/login
- [ ] Family name correct on all pages (list, detail, etc.)

### Testing:
- [ ] Tested with multiple families
- [ ] Tested with various family name formats
- [ ] Tested across all browsers
- [ ] No regression in family list functionality

---

## 💡 Root Cause Analysis & Suggested Solutions

**Possible Root Causes:**

### 1. Frontend Not Displaying Family Name (Most Likely)
- **Missing field mapping:**
  - API returns `family.name` but frontend looks for `family.familyName`
  - Frontend uses wrong field name
  - Name exists in data but not rendered

- **Default/fallback value issue:**
  - Frontend has "Unknown Family" as default
  - Never overrides default with actual name
  - Conditional rendering logic broken

### 2. Backend Not Returning Family Name
- **API missing field:**
  - GET /api/advisor/families endpoint doesn't include family name
  - Join query incomplete (doesn't fetch family details)
  - Only returns family ID, not full family object

- **Permissions issue:**
  - FA doesn't have permission to view family name yet
  - Name redacted due to privacy settings
  - Relationship not fully activated

### 3. Database Issue
- **Family name not set:**
  - Family registration didn't require name
  - Family profile incomplete
  - Name field NULL in database

- **Wrong relationship:**
  - Invitation created relationship but didn't link to family details
  - Advisor-family relationship exists but family data not accessible

### 4. Timing/Loading Issue
- **Race condition:**
  - Family list loads before family names fetch
  - Async data loading incomplete
  - "Unknown Family" shows while loading, never updates

- **Cache issue:**
  - Old cached data shows "Unknown Family"
  - Real data fetched but not replacing cached placeholder

**Investigation Steps:**

1. **Check API Response:**
   ```bash
   # When FA views families list, what does API return?
   GET /api/advisor/families

   # Expected response should include:
   {
     "families": [
       {
         "id": "family-123",
         "name": "Smith Family",  // Is this field present?
         "joined_date": "2025-11-21",
         "member_count": 4
       }
     ]
   }
   ```

2. **Check Database:**
   ```sql
   -- Does family have a name set?
   SELECT id, name, email, created_at
   FROM families
   WHERE id = 'family-123';

   -- Does advisor-family relationship exist?
   SELECT *
   FROM advisor_family_relationships
   WHERE advisor_id = 'advisor-456'
   AND family_id = 'family-123';
   ```

3. **Check Frontend Code:**
   - Where does family list component get family data?
   - What field does it use for display name?
   - Is there a default/fallback "Unknown Family" value?

4. **Check Invitation Flow:**
   - After accepting invitation, what data is stored?
   - Is family name included in invitation acceptance process?

**Suggested Solutions:**

### Solution A: Fix Frontend Field Mapping (Most Likely)

Frontend is looking for wrong field name:

```typescript
// INCORRECT CODE (example of potential bug):
function FamilyListItem({ family }) {
  return (
    <div className="family-card">
      <h3>{family.familyName || "Unknown Family"}</h3>
      {/* Bug: field is family.name, not family.familyName */}
      <p>Joined: {family.joinedDate}</p>
    </div>
  );
}

// CORRECT CODE:
function FamilyListItem({ family }) {
  return (
    <div className="family-card">
      <h3>{family.name || family.display_name || `Family ${family.id.substring(0, 8)}`}</h3>
      {/* Correct: use family.name with proper fallback */}
      <p>Joined: {family.joinedDate}</p>
    </div>
  );
}
```

### Solution B: Backend Include Family Name in API

Backend not returning family name in families list:

```python
# INCORRECT CODE (example of bug):
@router.get("/advisor/families")
async def get_advisor_families(advisor_id: str):
    """Get families for advisor."""
    relationships = await db.get_advisor_family_relationships(advisor_id)

    # Bug: Only returning relationship data, not family details
    return {
        "families": [
            {
                "id": rel.family_id,
                "joined_date": rel.created_at,
                # Missing: family name and other details
            }
            for rel in relationships
        ]
    }

# CORRECT CODE:
@router.get("/advisor/families")
async def get_advisor_families(advisor_id: str):
    """Get families for advisor with full family details."""
    relationships = await db.get_advisor_family_relationships(advisor_id)

    families = []
    for rel in relationships:
        # Fetch full family details
        family = await db.get_family(rel.family_id)
        families.append({
            "id": family.id,
            "name": family.name,  # Include family name
            "email": family.email,
            "joined_date": rel.created_at,
            "member_count": await db.count_family_members(family.id),
            "status": rel.status
        })

    return {"families": families}
```

### Solution C: Fix Invitation Acceptance Flow

Ensure family details are properly linked during invitation acceptance:

```python
# When FA accepts invitation
@router.post("/invitations/accept")
async def accept_invitation(token: str, advisor_id: str):
    """Accept family invitation."""
    invitation = await db.verify_invitation_token(token)

    # Create advisor-family relationship
    relationship = await db.create_advisor_family_relationship(
        advisor_id=advisor_id,
        family_id=invitation.family_id,
        role=invitation.role,
        permissions=invitation.permissions
    )

    # IMPORTANT: Ensure family details are accessible
    # Fetch family to verify it exists and has name
    family = await db.get_family(invitation.family_id)

    if not family.name:
        # Log warning if family doesn't have name set
        logger.warning(f"Family {family.id} has no name set")

    return {
        "success": True,
        "relationship": relationship,
        "family": {
            "id": family.id,
            "name": family.name,  # Return name to frontend
            "email": family.email
        }
    }
```

### Solution D: Frontend Data Loading Fix

Fix race condition or loading state:

```typescript
// Family list component with proper loading
function AdvisorFamilyList() {
  const [families, setFamilies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFamilies() {
      setLoading(true);
      try {
        const response = await api.get('/advisor/families');
        setFamilies(response.data.families);
      } catch (error) {
        console.error('Failed to load families:', error);
      } finally {
        setLoading(false);
      }
    }

    loadFamilies();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="family-list">
      {families.map(family => (
        <FamilyCard
          key={family.id}
          family={family}
          // Don't show "Unknown Family" while loading
          displayName={family.name || family.email || `Family ${family.id.substring(0, 8)}`}
        />
      ))}
    </div>
  );
}
```

**Recommended Approach:**

**Check in this order:**
1. **First:** Inspect API response - does it include family name?
2. **Second:** Check frontend field mapping - is it using correct field?
3. **Third:** Check database - does family actually have name set?
4. **Fourth:** Fix whichever layer has the issue

---

## 🔍 Technical Details to Investigate

**Critical Questions:**

1. **API Response:**
   - Q: What does GET /api/advisor/families return?
   - Q: Is `name` field included in the response?
   - Q: What is the exact response structure?

2. **Database:**
   - Q: Does the family table have a `name` column?
   - Q: Is the family's name populated in database?
   - Q: What value is in `families.name` for affected family?

3. **Frontend:**
   - Q: What field does family list component use for display?
   - Q: Where does "Unknown Family" string come from?
   - Q: Is there a default/fallback value in the code?

4. **Invitation Flow:**
   - Q: After accepting invitation, is family data fetched immediately?
   - Q: Does invitation acceptance trigger family list refresh?

5. **Permissions:**
   - Q: Does FA need specific permission to view family name?
   - Q: Is name redacted for privacy reasons?

**Required Debug Information:**

Please capture:
1. API response from GET /api/advisor/families (full JSON)
2. Database query result for affected family
3. Frontend component code that renders family name
4. Browser console logs during page load
5. Network tab showing all requests when families list loads

---

## 🧪 Testing Requirements

**QA must verify:**

### 1. Invitation Acceptance Flow:
- [ ] Family sends invitation to FA
- [ ] FA receives email with invitation link
- [ ] FA clicks link and accepts invitation
- [ ] Family appears in FA's family list
- [ ] **Family name displays correctly** (not "Unknown Family")

### 2. Multiple Families:
- [ ] Accept invitations from 3+ different families
- [ ] Each family shows correct unique name
- [ ] No families show "Unknown Family"
- [ ] Can distinguish all families

### 3. Family Name Variations:
- [ ] Family with simple name (e.g., "Smith Family")
- [ ] Family with long name (test truncation)
- [ ] Family with special characters (e.g., "O'Brien Family")
- [ ] Family with unicode (e.g., "García Family")
- [ ] Family without name set (test fallback display)

### 4. Timing and Loading:
- [ ] Name appears immediately on page load
- [ ] Name correct after page refresh
- [ ] Name correct after logout/login
- [ ] No loading delay showing "Unknown Family" temporarily

### 5. Multiple Page Views:
- [ ] Family list page shows correct name
- [ ] Family detail page shows correct name
- [ ] Anywhere family name appears, it's correct

### 6. Cross-Browser:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers

### 7. Different User Roles:
- [ ] Test as newly registered FA
- [ ] Test as existing FA with other families
- [ ] Verify family sees correct name in their own view

### 8. Regression Testing:
- [ ] Existing families still show correct names
- [ ] No impact on other advisor portal features
- [ ] Family invitation flow still works

---

## 🔗 Related Issues

**Potentially Related:**
- Advisor registration flow (EPIC-003)
- Advisor-family relationship management (EPIC-004)
- Family profile setup
- Invitation system
- Data loading and caching issues

**May Be Related:**
- Other "Unknown" or placeholder display bugs
- Family name display in other parts of the application
- Advisor dashboard data loading issues

---

## 📊 Priority Justification

**Why High Priority + Minor Severity?**

- **High Priority:** Highly visible bug affecting core advisor workflow
- **Minor Severity:** Doesn't prevent functionality but creates confusion
- **Visibility:** Every FA who accepts invitation sees this
- **Business Impact:** HIGH - unprofessional, damages trust
- **User Impact:** High visibility, moderate frustration
- **Workaround:** Unclear if workaround exists
- **Frequency:** 100% reproduction rate

**Why High Priority?**
- Affects primary FA workflow (managing families)
- Highly visible to paying customers (FAs)
- Professional appearance critical for SaaS platform
- Easy confusion with multiple families
- High occurrence rate (every invitation acceptance)

**Why Minor Severity?**
- Doesn't prevent core functionality
- Family relationship still works
- Can likely identify family by other means (join date, member count)
- Data is present, just display issue

**However:**
- Could increase to **Major** if:
  - FAs are actively using system
  - Multiple families per FA is common
  - Confusion causes FA to contact wrong family

**Recommendation:**
- **Fix in Sprint 1-2** (soon, but not emergency)
- High visibility warrants quick fix
- Likely low effort fix (field mapping issue)
- Include in Phase 1 of bug fixes roadmap

---

## 📅 Timeline

**Reported:** 2025-11-21
**Target Fix Date:** Sprint 1-2 (within 1-2 weeks)
**Estimated Effort:**
- Investigation: 1-2 hours (check API, DB, frontend)
- Fix: 2-4 hours (likely simple field mapping fix)
- Testing: 2-3 hours (verify across scenarios)
- **Total: 5-9 hours** (< 1 dev day)

**Quick Fix Potential:** ⚡⚡ HIGH
- Likely simple field mapping or API issue
- One-line fix possible if just wrong field name
- Low risk, isolated to family display

---

## 📝 Notes

**User Experience Impact:**
This bug significantly impacts perceived quality of the platform. FAs are key customers and expect professional, polished interface. "Unknown Family" feels like placeholder dev text left in production.

**Investigation Priority:**
1. First, check API response - this will reveal if issue is backend or frontend
2. If API has name, it's frontend display bug (very quick fix)
3. If API missing name, check backend query and database

**Quick Diagnostic:**
```javascript
// In browser console on FA families page:
console.log('Families data:', familiesData);
// Look at each family object
// Does it have .name, .familyName, .display_name, or similar field?
```

**Communication:**
After fix, no user communication needed. This should just work correctly. However, if many FAs have already seen "Unknown Family", consider:
- Internal announcement to support team
- Note in release notes
- Monitor for related support tickets

**Related Enhancement:**
Consider adding:
- Family profile completeness indicator
- Notification if family hasn't set name
- Default naming convention (e.g., "[Contact Email]'s Family")

---

**Bug ID:** TBD (to be assigned in Jira)
**Reported by:** e.savelova
**Date:** 2025-11-21
**Related Epic:** EPIC-003 Advisor Registration & Profile Management
