---
story_id: "STORY-FG-004-009"
title: "Dual Independent Accounts for Family Member and Advisor"
type: "story"
epic_id: "EPIC-004"
created: "2025-10-16"
updated: "2025-10-20"
priority: "medium"
status: "ready"
estimate: "16h"
story_points: 8
sprint: "Sprint 47"
assignee: ""
labels: ["advisor", "permissions", "multi-portal", "dual-accounts", "authentication"]
dependencies: ["STORY-FG-004-003"]
---

# FG-XXX-9: Dual Independent Accounts for Family Member and Advisor

> **Note:** This is User Story #9 from Epic "Advisor Portal User Roles and Access"

---

## 📋 Basic Information

**Issue Type:** Story  
**Project:** FG  
**Summary:** As an Advisor, I want to maintain separate accounts on Family Portal and Advisor Portal with different emails, so that I can serve one family internally while providing services to others externally  
**Epic Link:** FG-XXX [Advisor Portal User Roles and Access]  
**Priority:** Medium  
**Story Points:** [To be estimated during grooming]  
**Sprint:** [To be assigned during sprint planning]  

---

## 📖 User Story

**As a** professional advisor who is also a family member of my own family,  
**I want to** create and maintain two completely independent accounts (one on Family Portal, one on Advisor Portal) with different email addresses,  
**so that** I can participate in my own family's governance while providing professional advisory services to other families, with complete separation of roles and data.

**Real-world Example:**
- **John Smith** (john.smith@smithfamily.com) - Family Portal account, member of Smith Family
- **John Smith, CFA** (john.smith@advisors-firm.com) - Advisor Portal account, provides consulting to Johnson, Williams, and Brown families

---

## 🎯 Business Context

**Why is this Story important?**

**User Pain Point:**  
Many professional family governance advisors come from wealthy families themselves. Currently, they face a dilemma:
- If they only have a Family Portal account, they cannot provide professional services to other families
- If they only have an Advisor Portal account, they cannot participate in their own family's governance
- There is no clear way to maintain both roles simultaneously with proper separation

**Business Value:**
1. **Market expansion**: Enables family members with expertise to become advisors for other families
2. **Professional boundaries**: Ensures complete separation between personal family participation and professional consulting
3. **Privacy & security**: Maintains data isolation between family member role and advisor role
4. **Flexibility**: Allows natural professional evolution of family members into advisory roles

**Strategic Alignment:**
- Supports dual-role scenarios common in wealth management industry
- Maintains strict data isolation required for multi-tenancy architecture
- Enables professional services marketplace within family office ecosystem

---

## ✅ Acceptance Criteria

**This Story is complete when:**

1. **Given** I am a member of Smith Family with account on Family Portal,  
   **When** I navigate to Advisor Portal registration page,  
   **Then** I can create a completely new advisor account with a different email address without any system restrictions or warnings.

2. **Given** I have two independent accounts (Family Portal and Advisor Portal),  
   **When** I log into Family Portal with my family email,  
   **Then** I see only my family's data (Smith Family) and system treats me as a family member with no indication of my advisor account existence.

3. **Given** I have two independent accounts (Family Portal and Advisor Portal),  
   **When** I log into Advisor Portal with my advisor email,  
   **Then** I see only families I'm associated with as advisor (e.g., Johnson, Williams, Brown families) and system treats me as external advisor with no indication of my family member account existence.

4. **Given** I am logged into Family Portal as John Smith (family member),  
   **When** I try to access any Advisor Portal features or data,  
   **Then** system denies access because I'm in family member context (family_id isolation).

5. **Given** I am logged into Advisor Portal as John Smith, CFA (advisor),  
   **When** I try to access my own family's data (Smith Family),  
   **Then** system denies access because advisors can only access families they're explicitly associated with via family_advisor_associations table, and I'm not associated with my own family as advisor.

6. **Given** I have both accounts created with different emails,  
   **When** I want to switch between roles,  
   **Then** I must log out from one portal and log into the other portal with the corresponding email/password - no account switching mechanism exists.

**Additional Criteria:**
- [ ] System does NOT detect or indicate that two accounts belong to the same physical person
- [ ] System does NOT link or associate the two accounts in any way
- [ ] Each account has independent profile data, preferences, and settings
- [ ] JWT tokens for each account contain different contexts (family_id vs advisor_id)
- [ ] Database queries respect isolation: family_id filtering for Family Portal, association-based access for Advisor Portal
- [ ] No shared session or authentication between portals
- [ ] Each account can have completely independent roles and permissions

---

## 🎨 Design & UX

**User Flow:**

**Scenario A: Creating Advisor Account (already have Family Portal account)**
1. User (as family member) realizes they want to provide advisory services to other families
2. User navigates to Advisor Portal (separate URL/portal)
3. User clicks "Register as Advisor"
4. User enters professional email (different from family email), creates password, fills advisor profile
5. System creates new independent advisor account
6. User receives email confirmation to professional email
7. User can now log into Advisor Portal with professional credentials

**Scenario B: Daily Work - Switching Contexts**
1. Morning: User logs into Family Portal (john.smith@smithfamily.com) to participate in family meeting
2. User reviews family agenda, votes on family decision, sees only Smith Family data
3. User logs out from Family Portal
4. Afternoon: User logs into Advisor Portal (john.smith@advisors-firm.com) for client consultation
5. User reviews client families' data (Johnson, Williams, Brown), prepares consultation materials
6. User does NOT see Smith Family data in Advisor Portal
7. Evening: User logs back into Family Portal for family communication

**Visual Indicators:**
- Family Portal header: "Smith Family" + user name "John Smith"
- Advisor Portal header: "Advisor Portal" + advisor name "John Smith, CFA"
- Clear portal branding differentiation
- No visual indication of dual account existence

---

## 🔒 Business Rules

**Account Creation Rules:**
1. **Email uniqueness**: Each email can be used only once across entire system (both portals)
2. **No duplicate detection**: System does NOT check if name/phone/other identifiers match existing accounts
3. **Independent registration**: Each portal has separate registration flow
4. **No account linking**: System does NOT create any relationship between accounts

**Authorization Rules:**
1. **Family Portal account**:
   - Can be: Family Member, Family Council, or Admin
   - Access scope: ONLY own family data (WHERE family_id = user.family_id)
   - CANNOT access Advisor Portal features
   - CANNOT see other families' data

2. **Advisor Portal account**:
   - Can be: External Consul, Personal Family Advisor, or Service Advisor
   - Access scope: ONLY families associated via family_advisor_associations table
   - CANNOT access Family Portal features
   - CANNOT see own family data (even if they are family member on Family Portal)

**Data Isolation Rules:**
1. **Family Portal**: All queries filtered by family_id from JWT token
2. **Advisor Portal**: All queries use family_advisor_associations JOIN
3. **No cross-portal data access**: Family member cannot see advisor data, advisor cannot see family member data
4. **Independent permissions**: Roles and permissions managed separately per account

**Edge Cases:**
1. **Same name, different emails**: Allowed - system treats as two different people
2. **Advisor wants to serve own family**: Must be added as advisor through proper family_advisor_associations process (separate from family membership)
3. **Password reset**: Each account has independent password reset (email-based)
4. **Account deletion**: Deleting one account does NOT affect the other account

---

## 🧪 Test Scenarios

**Happy Path:**

**Test 1: Create Both Accounts**
1. Register on Family Portal with john.smith@smithfamily.com
2. Complete family member profile
3. Navigate to Advisor Portal
4. Register on Advisor Portal with john.smith@advisors-firm.com
5. Complete advisor profile
6. **Expected**: Both accounts created successfully, no errors or warnings about duplicate person

**Test 2: Family Portal Access**
1. Log into Family Portal with john.smith@smithfamily.com
2. Navigate to Dashboard, Meetings, Decisions
3. **Expected**: See only Smith Family data, no indication of advisor account, no access to advisor features

**Test 3: Advisor Portal Access**
1. Log into Advisor Portal with john.smith@advisors-firm.com
2. Navigate to Advisor Dashboard, Client Families
3. **Expected**: See only associated client families (not Smith Family), no indication of family member account

**Test 4: Context Switching**
1. Log into Family Portal, verify Smith Family context
2. Log out from Family Portal
3. Log into Advisor Portal, verify Advisor context with client families
4. **Expected**: Complete context switch, no data leakage between portals

**Negative Tests:**

**Test 1: Same Email Registration**
1. Register on Family Portal with john.smith@test.com
2. Try to register on Advisor Portal with john.smith@test.com
3. **Expected**: System rejects registration with "Email already registered" error

**Test 2: Cross-Portal Data Access**
1. Log into Family Portal as family member
2. Try to access /api/advisor-portal/* endpoints directly
3. **Expected**: System returns 403 Forbidden (wrong portal context)

**Test 3: Own Family Access via Advisor Portal**
1. Log into Advisor Portal as advisor
2. Try to access Smith Family data (advisor's own family)
3. **Expected**: Smith Family NOT visible in client families list (not in family_advisor_associations)

**Edge Cases:**

**Test 1: Identical Personal Information**
1. Create Family Portal account: Name "John Smith", Phone "+1234567890"
2. Create Advisor Portal account: Name "John Smith", Phone "+1234567890", different email
3. **Expected**: System allows creation, treats as two separate people, no duplicate detection

**Test 2: Forgot Password Flow**
1. User has both accounts, forgets password for Family Portal account
2. User initiates password reset for john.smith@smithfamily.com
3. **Expected**: Reset email sent to family email only, advisor account unaffected

**Test 3: Advisor Association to Own Family**
1. User has Family Portal account (member of Smith Family)
2. User has Advisor Portal account (advisor to other families)
3. Smith Family Admin adds advisor john.smith@advisors-firm.com to family_advisor_associations for Smith Family
4. User logs into Advisor Portal
5. **Expected**: Smith Family now appears in advisor's client families list (two separate relationships: family member + advisor)

---

## 🔗 Dependencies

**Story Dependencies:**
- **Requires:** FG-XXX (Story #1) - Basic Advisor Portal registration and authentication must be functional
- **Requires:** FG-XXX (Story #3) - Association-based access control must be implemented
- **Related:** FG-XXX (Story #4) - Permission management system (separate permissions per account)

---

## ⚠️ Non-Functional Requirements

**Security:**
- Authorization required: Yes (separate JWT tokens per portal)
- Data encryption: Yes (advisor PII encrypted with pgcrypto)
- PII handling: Yes - each account has separate PII, no cross-linking
- Cross-portal access prevention: Critical - must enforce strict isolation

**Performance:**
- Login time: < 2 seconds per portal
- Context verification: < 100ms (JWT validation + permission check)
- Account creation: < 3 seconds

**Usability:**
- Clear portal differentiation: Users must understand which portal they're on
- No confusion: System should NOT suggest or indicate dual accounts exist
- Independent flows: Each portal should feel like separate application

**Browser Support:**
- Chrome: Latest 2 versions
- Safari: Latest 2 versions
- Firefox: Latest 2 versions
- Edge: Latest 2 versions

**Compliance:**
- Data isolation: GDPR/privacy compliant (separate data contexts)
- Audit trail: Track logins separately per account
- No data leakage: Ensure no cross-portal information exposure

---

## 📝 Notes

**Design Decisions (from Epic discussion):**
- ✅ **Two completely independent accounts** - no linking or association in system
- ✅ **Different emails required** - same email cannot be used for both portals
- ✅ **No automatic detection** - system does NOT identify same person
- ✅ **Manual context switching** - user must log out/in to switch portals
- ✅ **Strict data isolation** - family_id vs association-based access models
- ✅ **No shared authentication** - separate JWT tokens with different contexts

**Questions Resolved:**
- ✅ Do we link accounts? **No** - completely independent
- ✅ Do we detect same person? **No** - system doesn't care
- ✅ Can advisor see own family data? **No** - unless explicitly added via family_advisor_associations
- ✅ Do we provide account switching UI? **No** - user manages separately
- ✅ Can same email be used? **No** - emails must be unique across system

**Implementation Notes:**
- This story primarily validates that existing architecture ALLOWS dual accounts
- Main work is ensuring no technical barriers prevent dual account creation
- Testing focus: verify data isolation works correctly in dual account scenarios
- Documentation: Update user guides to explain dual account possibility

---

**Template Version:** 1.0.0  
**Story Created:** 2025-10-17  
**Epic:** Advisor Portal User Roles and Access  
**Story Number:** #9 of 10