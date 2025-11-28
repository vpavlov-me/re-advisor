---
doc_id: "DOC-BIZ-001"
title: "Subscription Models & Pricing Structure"
type: "reference"
category: "business"
audience: "product-manager|business-analyst|stakeholder|sales"
complexity: "intermediate"
created: "2025-10-18"
updated: "2025-11-24"
version: "2.0.2"
status: "published"
tags: ["subscriptions", "pricing", "monetization", "business-model", "revenue", "commission"]
owner: "product-team"
maintainer: "product-team"
reviewer: ""
priority: "critical"
business_value: "Defines complete revenue model and pricing structure for platform"
user_impact: "Clear understanding of costs for families and advisors"
review_cycle: "quarterly"
next_review: "2026-02-21"
last_review: "2025-11-24"
review_notes: "v2.0.2 - Removed technical details, business focus only"
---

# Subscription Models & Pricing Structure v2.0

## 📋 Overview

This document defines the complete subscription and pricing structure for the Family Governance Platform, covering both **Family Subscriptions** (B2C) and **Consultant Subscriptions** (B2B), plus hybrid B2B2C models.

**Document Version:** 2.0.2
**Last Updated:** 2025-11-24
**Status:** Published - Updated Model with Commission Architecture

**Key Features:**
- ✅ Simplified Family Advisor pricing (single $X tier)
- ✅ Standard vs Premium Consultant tiers
- ✅ B2B2C model (Premium creates new family portals)
- 🆕 **Commission Architecture**: Platform launch promotional period with 0% commission
- 🆕 **Future Revenue Stream**: Marketplace transaction commission (N%)

---

## 🧭 Subscription Categories

```
Family Governance Platform
         │
         ├────────────────────────────────────────────
         │                                              │
   FAMILY SUBSCRIPTIONS                    CONSULTANT SUBSCRIPTIONS
   (B2C Model)                             (B2B Model)
         │                                              │
         │                                              │
    ├────┴────┐                                      ├────┴────┐
    │         │                                      │         │
  Base    Family                               Standard  Premium
  Portal   Advisor                               Tier     Tier
    │      (Flexible)                               │         │
    │    (1-10 modules)                             │    ├───┴───┐
    │                                               │    │       │
    │                                               │  Base  +Create
    │                                               │  Access New Portals
                                                    │         (B2B2C)
```

---

## 👤 Quick Use Cases

### As a Family

**Base Access:**
> "As a **Family**, I can purchase a Family Portal subscription that gives all family members access to 10 governance modules (Constitution, Meetings, Decisions, Assets, Succession, Education, Philanthropy, Conflicts, Mentorship, Family Management)."

**Adding Advisors:**
> "As a **Family**, I can add **Family Advisor** seats and configure flexible access rights for each advisor. I control which modules (1-10) they can access, what permissions they have (read/write/admin), and whether they participate in Family Council."

**Cost Control:**
> "As a **Family**, I pay $FAMILY_BASE for the base portal + $X for each Family Advisor. I control who to invite, what access they get, and how much to spend."

---

### As a Consultant

**Marketplace Access (Standard Tier):**
> "As a **Consultant**, I can purchase a Standard tier subscription ($Z/month) that gives me a public marketplace profile and ability to work with unlimited existing families. During the platform launch promotional period, I receive 100% of service payments. After the promotional period ends, platform will charge N% commission with advance notice."

**Important Limitation:**
> "As a **Standard Consultant**, I CANNOT create new Family Portals. I can only work with families that already have their own subscriptions."

**Building Client Portfolio:**
> "As a **Standard Consultant**, I can work with N families simultaneously through marketplace bookings or by connecting to existing family portals."

**Managing Family Portals (Premium Tier):**
> "As a **Premium Consultant**, I can CREATE NEW Family Portals for clients who don't have subscriptions yet. I pay for these portals, families use them for free, and I automatically become External Consul AND Administrator in each NEW family I create."

**Important Distinction:**
> "As a **Premium Consultant**, if I was already invited as FA by families BEFORE upgrading to Premium, I remain FA in those OLD families. External Consul AND Administrator role applies ONLY to NEW families I create through Premium."

**Migrating OLD Family to Premium Coverage:**
> "As a **Premium Consultant**, if I want to migrate an OLD family (where I'm currently FA and they pay for me) to my Premium coverage (so they don't pay anymore and I become External Consul & Administrator), I MUST create a NEW Family Portal for them. This involves: (1) creating a new family account (new Family ID), (2) setting up the portal, and (3) inviting all family members to the new portal. The old family portal remains unchanged until they decide to cancel it."

---

### Combined Scenarios

**Family + Invited FA Who Upgrades:**
> "As a **Family**, I invited a Family Advisor 2 years ago and pay $X/month for their seat. They decided to buy a Consultant subscription. I continue paying $X/month for their work with me—nothing changes for me. They now additionally work with other families through marketplace."

**FA Upgrades to Premium (Old + New Families):**
> "As a **Family Advisor**, I work with 2 families (A and B) who pay $X/month each for my seat. I upgrade to Premium Consultant and create 3 NEW family portals (C, D, E). In families A and B, I remain FA with existing rights (families continue paying). In families C, D, E, I'm automatically External Consul AND Administrator with full access (I pay, families use for free)."

---

## 📜 Critical Business Rules

### Rule 1: Family Continues Paying for FA Seat Regardless of Advisor's Subscription

**Scenario:** Family pays $X for FA seat. FA later purchases Consultant subscription (Standard or Premium).

**What Happens:**
```
Family pays: $FAMILY_BASE + $X/month (NO change)
FA pays: $Z or $Z_premium/month (NEW subscription)
Platform receives: From family ($FAMILY_BASE + $X) + From FA ($Z or $Z_premium)
```

**Rationale:**
- Family pays for dedicated FA seat (their subscription)
- FA pays for marketplace access/portal creation (their subscription)
- These are separate services with separate value propositions
- Platform receives revenue from both (not double-charging for same service)

**Implementation:**
```
IF family.has_fa_seat(advisor) = TRUE
  AND advisor.purchases_consultant_subscription = TRUE
  THEN
    family.continues_paying = $X/month (unchanged)
    advisor.starts_paying = $Z or $Z_premium/month (new)
    relationship_type = 'invited_fa_with_consultant_subscription'
```

---

### Rule 2: Standard Consultant CANNOT Create New Family Portals

**Scenario:** Consultant wants to onboard new family client

**Standard Consultant (NOT allowed):**
```
Action: Wants to create Family Portal for new client
Result: ❌ BLOCKED - feature not available
Solution: Must upgrade to Premium Consultant first
```

**Standard Consultant CAN:**
- ✅ Work with unlimited existing families
- ✅ Free connection to existing family portals
- ✅ Offer services through marketplace
- ✅ Receive service payments via Stripe Connect

**Rationale:**
- Creating portals = B2B2C model = Premium feature
- Standard = marketplace only, families self-subscribe
- Clear tier differentiation

---

### Rule 3: External Consul & Administrator Role ONLY for NEW Families in Premium

**Scenario:** FA works with 2 families (A, B), then upgrades to Premium and creates 3 NEW families (C, D, E)

**Family A (OLD relationship):**
```
Before Premium: FA with custom access rights (e.g., 3 modules)
After Premium:  FA with same access rights (NO change)
Family A pays:  $FAMILY_BASE + $X (continues)
```

**Family B (OLD relationship):**
```
Before Premium: FA with custom access rights (e.g., all 10 modules + FC)
After Premium:  FA with same access rights (NO change)
Family B pays:  $FAMILY_BASE + $X (continues)
```

**Family C (NEW, created via Premium):**
```
After creation:  Automatically External Consul + Administrator
Access:          All 10 modules + Portal Admin + Family Council
Family C pays:   $0 (Premium Consultant covers)
```

**Families D, E (NEW, created via Premium):**
```
Same as Family C: External Consul + Administrator, full access, $0 payment
```

**Rationale:**
- OLD relationships preserve existing agreements
- NEW families get comprehensive management (External Consul + Administrator)
- Premium enables B2B2C for NEW clients only
- Prevents forced role changes in existing relationships

**Migrating OLD Family to Premium:**
- If Premium Consultant wants to move OLD family under their coverage
- Must create NEW Family Portal (new Family ID)
- Setup new portal and invite family members
- OLD family remains unchanged until they cancel
- In NEW portal: Consultant becomes External Consul + Administrator
- Family stops paying, Consultant pays instead

**Implementation:**
```
IF advisor.has_premium_subscription = TRUE
  AND advisor.creates_new_family_portal(family) = TRUE
  THEN
    advisor.role_in_family = 'external_consul'
    advisor.is_portal_administrator = TRUE
    advisor.permissions = ALL_MODULES + PORTAL_ADMIN + FAMILY_COUNCIL
    family.subscription_cost = $0

ELSE IF advisor.was_invited_before_premium(family) = TRUE
  THEN
    advisor.role_in_family = UNCHANGED (remains FA)
    advisor.is_portal_administrator = FALSE
    advisor.permissions = UNCHANGED (family configured)
    family.subscription_cost = $FAMILY_BASE + $X (continues)
```

---

### Rule 4: Platform Commission Model

**Current State (Platform Launch Promotional Period):**

**Implementation:**
- Family books service (e.g., $1,000 workshop)
- Family pays via Stripe Connect: **$1,000**
- Consultant receives: **$1,000 (100%)**
- Platform commission: **$0 (0% during promotional period)**

**Future State (Post-Promotional Period):**
- Platform commission: **N%** (to be determined)
- Consultant receives: **$1,000 × (1 - N%)**
- Platform revenue: Subscriptions + commission from transactions

**Promotional Period Terms:**
- Timing: Begins at **platform launch date**, not individual subscription date
- Initial duration: To be determined (minimum period to be announced)
- May be extended at company's discretion
- Consultants notified minimum 30 days before promotional period ends
- Commission rate announced minimum 60 days before activation

**Critical Distinction:**
- ❌ NOT: "3 months from when consultant subscribes"
- ✅ CORRECT: "3 months from platform launch date for all consultants"
- All consultants on platform benefit equally regardless of join date during promo

**Example Timeline:**
```
Platform Launch:         January 1, 2026
Promotional Period:      January 1 - March 31, 2026 (example: 3 months)
Commission Notice:       January 31, 2026 (60 days before end, if not extended)
Promotional End:         March 31, 2026
Commission Active:       April 1, 2026 (30 days after end notice)

Consultant A (joined Jan 1):  Gets 0% commission Jan 1 - Mar 31
Consultant B (joined Feb 15): Gets 0% commission Feb 15 - Mar 31
Both face N% commission starting April 1 simultaneously
```

**Rationale:**
- Launch incentive for entire ecosystem, not individual rewards
- Fair to all consultants (no advantage to early vs late adopters during promo)
- Sustainable revenue model transition
- Market-competitive commission structure

---

### Rule 5: Simplified FA Pricing

**Single Advisor Type with Flexible Configuration:**
- All Family Advisors cost $X per month (same price regardless of access level)
- Family configures for each advisor:
  - Module access (1-10 modules)
  - Permissions (read/write/admin)
  - Family Council participation (yes/no)
- No pricing tiers ($X vs $Y) - simplified model
- More predictable costs for families

**Rationale:**
- Simpler than old 2-tier model (Personal FA / External Consul)
- Gives families full control over advisor roles
- Reduces confusion about pricing
- Same value proposition regardless of configuration

---

# PART 1: FAMILY SUBSCRIPTIONS (B2C)

## 👨‍👩‍👧‍👦 1. Family Subscription Model

### Core Principle
**Families pay for their Family Portal access + any invited advisors they want to add.**

---

## 💰 1.1 Base Family Portal Subscription

### What's Included
- ✅ Access for ALL family members (unlimited users within family)
- ✅ All 10 governance modules:
  1. Conflicts Resolution
  2. Constitution Management
  3. Family Council
  4. Decision Making
  5. Education & Development
  6. Mentorship
  7. Assets Management
  8. Succession Planning
  9. Philanthropy
  10. Family Management
- ✅ Communication tools (announcements, conversations)
- ✅ Task management
- ✅ Meeting coordination
- ✅ Document storage
- ✅ Activity tracking

### Pricing
```
Base Family Portal: $FAMILY_BASE per month
```

**Pricing Variables** (TBD):
- May vary by family size tiers (e.g., <10, 10-30, 30+ members)
- May vary by module selection (all 10 vs. subset)
- Annual discount option (e.g., 10 months for price of 12)

---

## 💼 1.2 Family Advisor Seats (Add-ons)

Families can invite external advisors to access their Family Portal. These are **paid add-ons** to the base subscription.

### Single Advisor Type: Family Advisor (Flexible Access)

**Access Scope:** 1-10 modules (family configures for each advisor)

**Pricing:**
```
Family Advisor Seat: +$X per month per advisor
```

**Key Feature: Flexible Rights Configuration**

Family controls for EACH advisor:
- **Module Access**: Select which modules (1-10) advisor can access
- **Permissions**: Configure read/write/admin rights per module
- **Family Council**: Choose whether advisor participates in Family Council
- **Custom Roles**: Specialist (1-3 modules) to Strategic Partner (all 10 + FC)

**Use Cases:**

#### Specialist Configuration (Narrow Focus)
```
Family Advisor: Succession Planning Specialist
├─ Modules: Succession ONLY
├─ Permissions: Read + Write
├─ Family Council: No
└─ Use: Focused succession planning support
```

#### Multi-Module Specialist
```
Family Advisor: Philanthropy + Education Coordinator
├─ Modules: Philanthropy, Education, Mentorship
├─ Permissions: Read + Write + Limited Admin
├─ Family Council: No
└─ Use: Charitable giving and next-gen education
```

#### Strategic Partner Configuration (Full Access)
```
Family Advisor: Governance Partner
├─ Modules: All 10 modules
├─ Permissions: Full Read + Write + Admin
├─ Family Council: Yes (voting member)
└─ Use: Comprehensive governance consulting (equivalent to old External Consul)
```

**Key Features:**
- ✅ Family has FULL control over advisor access
- ✅ Granular permission management per module
- ✅ Family Council membership is optional (not automatic)
- ✅ Can configure multiple advisors with different access levels
- ✅ Change permissions anytime
- ✅ Clear, predictable pricing ($X per advisor regardless of access level)

**Billing:**
- Added to family's monthly invoice
- Billed per advisor (can have multiple with different configurations)
- Same price $X whether advisor gets 1 module or all 10
- Family can cancel advisor seat anytime
- Optional: Fixed-term contracts (30-365 days)

**Important Note:**
> Unlike the old model with 2 advisor types (Personal FA at $X and External Consul at $Y), we now have 1 advisor type at $X with flexible configuration. Family decides whether advisor is specialist or strategic partner through permissions, not through pricing tier.

---

### 1.3 Family Subscription Calculation Examples

#### Example 1: Small Family with Specialist
```
Family Size: 8 members
Advisor Needs: Succession planning expert

Monthly Cost Breakdown:
├─ Base Family Portal:           $FAMILY_BASE
└─ Family Advisor:               +$X
   ├─ Modules: Succession only
   ├─ Permissions: Read + Write
   └─ Family Council: No
────────────────────────────────────────────
TOTAL:                           $FAMILY_BASE + $X per month

Example with placeholder values ($FAMILY_BASE = $499, $X = $199):
= $499 + $199 = $698/month
```

---

#### Example 2: Medium Family with Strategic Partner
```
Family Size: 22 members
Advisor Needs: Comprehensive governance support

Monthly Cost Breakdown:
├─ Base Family Portal:           $FAMILY_BASE
└─ Family Advisor:               +$X
   ├─ Modules: All 10 modules
   ├─ Permissions: Full admin
   └─ Family Council: Yes
────────────────────────────────────────────
TOTAL:                           $FAMILY_BASE + $X per month

Example with placeholder values ($FAMILY_BASE = $499, $X = $199):
= $499 + $199 = $698/month

Note: Same price as Example 1, but full access instead of 1 module.
This is simpler pricing than old model ($FAMILY_BASE + $Y).
```

---

#### Example 3: Large Family with Multiple Advisors
```
Family Size: 45 members
Advisor Needs: Strategic partner + 2 specialists

Monthly Cost Breakdown:
├─ Base Family Portal:           $FAMILY_BASE
├─ Family Advisor #1:            +$X
│  ├─ Modules: All 10
│  ├─ Permissions: Full admin
│  └─ Family Council: Yes (strategic partner)
├─ Family Advisor #2:            +$X
│  ├─ Modules: Philanthropy
│  ├─ Permissions: Read + Write
│  └─ Family Council: No (specialist)
└─ Family Advisor #3:            +$X
   ├─ Modules: Education + Mentorship
   ├─ Permissions: Read + Write
   └─ Family Council: No (specialist)
────────────────────────────────────────────
TOTAL:                           $FAMILY_BASE + 3×$X per month

Example with placeholder values ($FAMILY_BASE = $499, $X = $199):
= $499 + $597 = $1,096/month

Old model would have been:
$499 (base) + $399 (External Consul) + $199×2 (Personal FAs) = $1,296/month
New model saves: $200/month
```

---

## 🔄 1.4 Family Subscription Lifecycle

### Onboarding
1. Family signs up for Base Portal
2. Invites family members (no additional cost)
3. Optionally invites advisors (adds $X per advisor)
4. **Configures advisor access:**
   - Selects modules (1-10)
   - Sets permissions (read/write/admin)
   - Assigns Family Council status (yes/no)
5. Receives single monthly invoice for all

### Modification
- **Add advisors**: Prorated charge for current month
- **Remove advisors**: Prorated credit or effective next billing cycle
- **Change advisor access**: 
  - Add/remove modules (instant, no cost change)
  - Change permissions (instant, no cost change)
  - Toggle Family Council status (instant, no cost change)
- **Cost changes only when adding/removing advisor seats**

### Cancellation
- Family can cancel anytime (subject to terms)
- Invited advisor seats automatically removed
- Advisor loses access immediately
- Historical data retained (anonymized advisor contributions)

---

# PART 2: CONSULTANT SUBSCRIPTIONS (B2B)

## 💼 2. Consultant Subscription Model

### Core Principle
**Independent advisors pay for marketplace access and/or portal creation capabilities to work with family clients.**

---

## 💰 2.1 Standard Consultant Tier

### What's Included
- ✅ Public marketplace profile (discoverable)
- ✅ Service catalog creation (unlimited services)
- ✅ Booking management system
- ✅ Stripe Connect integration (receive payments)
- ✅ **Promotional period pricing**: 0% commission during platform launch promo
- ✅ Work with unlimited existing families
- ✅ Free connection to existing family portals
- ✅ Client communication tools
- ✅ Revenue analytics dashboard
- ✅ Review & rating system

### What's NOT Included
- ❌ **CANNOT create new Family Portals**
- ❌ **CANNOT invite non-existing families**
- ❌ **CANNOT be Portal Administrator**
- ❌ No B2B2C capabilities

### Pricing
```
Standard Consultant: $Z per month (monthly)
                     $Z×10 per year (annual - 2 months free)
```

### Payment Structure

**During Platform Launch Promotional Period:**
- Family books service (e.g., $1,000 workshop)
- Family pays Consultant via Stripe Connect: **$1,000**
- Consultant receives: **$1,000 (100%)**
- Platform commission: **$0 (0%)**
- Platform revenue: **Only from Consultant subscription ($Z/month)**

**After Promotional Period Ends:**
- Family books service (e.g., $1,000 workshop)
- Family pays via Stripe Connect: **$1,000**
- Platform commission: **$1,000 × N%**
- Consultant receives: **$1,000 × (1 - N%)**
- Platform revenue: Subscriptions + transaction commissions

**Promotional Period Details:**
- Timing: Based on **platform launch date**, not individual subscription date
- All consultants benefit equally during promotional period
- Minimum 30 days notice before promotional period ends
- Commission rate announced minimum 60 days before activation
- May be extended at company's discretion

**Why This Model:**
- **Launch phase**: Attract consultants, build marketplace, 0% commission
- **Growth phase**: Sustainable revenue, competitive commission (lower than market)
- **Transparency**: Clear advance notice of any changes

### Access Model
**Service-Based, Multi-Family:**
- Consultant can serve unlimited existing families
- Can connect to families for free (if family has subscription)
- Access limited to:
  - Families with active bookings
  - Modules covered by service contract OR
  - Modules granted by family (if connected as FA)

**Example 1: Marketplace Booking**
```
Consultant offers "Succession Planning Workshop"
├─ Service includes: Succession module access
├─ Duration: 90 days
├─ Pricing: $2,500
└─ Family books service
   ├─> Consultant gets 90-day access to Succession module
   ├─> Family pays $2,500 via Stripe Connect
   ├─> During promo: Consultant receives $2,500 (100%)
   └─> After promo: Consultant receives $2,500 × (1 - N%)
```

**Example 2: Free Connection to Existing Family**
```
Family Alpha has subscription: $FAMILY_BASE + $X (FA seat)
Consultant wants to work with Family Alpha
├─ Family Alpha invites Consultant as FA (already paying $X)
├─ Consultant connects for free (no additional charge to family)
├─ Family configures Consultant's access (e.g., 3 modules)
└─ Consultant serves Family Alpha through invited FA relationship
```

**Important Limitation:**
```
Consultant meets potential Family Beta (no subscription yet)
├─ Family Beta: "We want to use the platform"
├─ Standard Consultant: ❌ CANNOT create portal for Family Beta
├─ Options:
│  ├─ 1. Family Beta subscribes themselves → Consultant connects
│  └─ 2. Consultant upgrades to Premium → Creates portal for Family Beta
```

### Who Should Choose Standard Tier
- ✅ Solo practitioners building client portfolio through marketplace
- ✅ Workshop facilitators serving multiple existing families
- ✅ Specialists offering project-based services
- ✅ Advisors wanting marketplace visibility
- ✅ Advisors working with families who have own subscriptions
- ❌ Not for: Advisors wanting to onboard NEW families without subscriptions

---

## 💎 2.2 Premium Consultant Tier (B2B2C Model)

### What's Included
**Everything in Standard Tier PLUS:**
- ✅ **CREATE NEW Family Portals** (up to N families included)
- ✅ **Automatic External Consul + Administrator role (ONLY in NEW families)**
- ✅ Portal Administrator capabilities (in NEW families)
- ✅ Centralized multi-family admin dashboard
- ✅ Family members access portal for FREE
- ✅ White-label-like service offering
- ✅ Additional family seats available ($X_seat/month each)

### Pricing
```
Premium Consultant: $Z_premium per month (includes N family seats)
                    $Z_premium×10 per year (annual - 2 months free)

Additional Family Seats: +$X_seat per month per family beyond N
```

### Access Model
**Portal-Based, Multi-Family:**
- Consultant creates Family Portals for NEW clients (no existing subscription)
- Automatic External Consul + Administrator role in each NEW family (all 10 modules + Portal Admin + FC)
- Families use portal for free (Consultant pays)
- Consultant = Portal Administrator + Strategic Advisor (in NEW families)

### Critical Distinction: OLD vs NEW Families

**OLD Families (existed before Premium upgrade):**
```
Status:          Invited FA relationship (family paying $X)
Role:            Family Advisor (unchanged)
Access:          As configured by family (unchanged)
Family Council:  As configured by family (unchanged)
Family Pays:     $FAMILY_BASE + $X (continues)
Consultant Pays: $Z_premium (Premium subscription)
```

**NEW Families (created via Premium):**
```
Status:          Created by Consultant
Role:            External Consul + Administrator (automatic)
Access:          All 10 modules + Portal Admin
Family Council:  Yes (automatic)
Family Pays:     $0 (Consultant covers)
Consultant Pays: Included in $Z_premium (up to N) or +$X_seat
```

### Cost Calculation

#### Scenario 1: Within Included Seats
```
Premium Consultant with 5 NEW families (N=5)

Monthly Cost:
└─ Premium subscription:         $Z_premium per month
   (includes 5 family portals)
────────────────────────────────────────────
TOTAL:                           $Z_premium per month

Per-Family Cost to Consultant:   $Z_premium ÷ 5
NEW Families Pay:                $0 each
```

---

#### Scenario 2: Beyond Included Seats
```
Premium Consultant with 8 NEW families (N=5 + 3 extra)

Monthly Cost:
├─ Premium subscription:         $Z_premium per month
│  (includes 5 family portals)
└─ Extra 3 family seats:         +3 × $X_seat per month
────────────────────────────────────────────
TOTAL:                           $Z_premium + (3 × $X_seat) per month

Per-Family Cost to Consultant:   Total ÷ 8 families
NEW Families Pay:                $0 each
```

---

#### Scenario 3: Mixed OLD + NEW Families
```
Consultant worked with 2 OLD families (A, B) as FA before Premium.
Then upgraded to Premium and created 3 NEW families (C, D, E).

OLD Families (A, B):
├─ Relationship:    Invited FA (before Premium)
├─ Role:            Family Advisor (unchanged)
├─ Access:          As configured by family
├─ Family A pays:   $FAMILY_BASE + $X
└─ Family B pays:   $FAMILY_BASE + $X

NEW Families (C, D, E):
├─ Relationship:    Created by Premium Consultant
├─ Role:            External Consul + Administrator (automatic)
├─ Access:          All 10 modules + Portal Admin
├─ Family C pays:   $0
├─ Family D pays:   $0
└─ Family E pays:   $0

Consultant Pays:
└─ Premium subscription:         $Z_premium per month
   (includes 5 families; C, D, E use 3 slots)

────────────────────────────────────────────
Platform Revenue:
├─ From Family A:    $FAMILY_BASE + $X
├─ From Family B:    $FAMILY_BASE + $X
└─ From Consultant:  $Z_premium

Total Families:      5 (2 OLD as FA, 3 NEW as External Consul + Administrator)
Consultant Status:   Dual role (FA in A&B, External Consul + Administrator in C,D,E)
```

---

### Who Should Choose Premium Tier
- ✅ Family office firms managing 5-15 families (NEW clients without subscriptions)
- ✅ Wealth advisory firms bundling platform access into service offering
- ✅ Consultancies wanting to onboard NEW client families
- ✅ Advisors wanting to control entire platform experience for NEW clients
- ✅ Firms seeking competitive differentiation (value-add service)
- ✅ Advisors with existing offline clients who need platform access
- ❌ Not for: Solo practitioners without clients to onboard

---

## 📊 2.3 Consultant Tier Comparison

| Feature | Standard ($Z/month) | Premium ($Z_premium/month) |
|---------|---------------------|---------------------------|
| **Marketplace Profile** | ✅ Public | ✅ Public |
| **Service Catalog** | ✅ Unlimited | ✅ Unlimited |
| **Transaction Commission** | 0% (promo) → N% (future) | 0% (promo) → N% (future) |
| **Work with Existing Families** | ✅ Unlimited | ✅ Unlimited |
| **Free Connection to Families** | ✅ Yes | ✅ Yes |
| **CREATE NEW Family Portals** | ❌ No | ✅ Yes (up to N) |
| **Automatic External Consul + Administrator** | ❌ No | ✅ Yes (NEW families only) |
| **Portal Administrator** | ❌ No | ✅ Yes (NEW families) |
| **OLD Families (before Premium)** | FA role | FA role (unchanged) |
| **NEW Families Pay** | N/A | $0 (Consultant pays) |
| **Additional NEW Families** | N/A | +$X_seat/month each |
| **Use Case** | Marketplace + existing | Client onboarding B2B2C |

---

## 🔄 2.4 Consultant Subscription Lifecycle

### Standard Consultant Onboarding
1. Register & pay subscription ($Z/month)
2. Build marketplace profile (60%+ completion required)
3. Complete KYC verification
4. Create service catalog
5. Connect Stripe account
6. Submit for moderation
7. Profile published to marketplace

**Time to First Revenue:**
- Registration: 45-60 minutes
- Moderation: 1-3 days
- First booking: Variable (target <30 days)

### Premium Consultant Onboarding
1. Complete Standard Consultant registration
2. Upgrade to Premium tier ($Z_premium/month)
3. Access portal creation features
4. Create Family Portals for NEW clients
5. Invite family members to portals
6. **Automatically assigned as External Consul + Administrator in each NEW family**

**Time to First Portal:**
- Upgrade: Instant (billing cycle adjustment)
- Portal creation: 15-30 minutes per family
- Family onboarding: 1-7 days per family

### Subscription Modification
- **Upgrade Standard → Premium**: Prorated charge, instant access to portal creation
- **Add family seats**: Prorated charge for current month (for NEW families only)
- **Downgrade Premium → Standard**: Lose portal creation, must migrate managed NEW families or they lose access
- **Cancel**: Profile unpublished, complete active bookings, can re-subscribe anytime

**Important Note on Downgrade:**
- OLD families (invited FA): Unaffected, relationship continues
- NEW families (created by Premium): Must subscribe themselves or lose access
- Consultant loses Portal Administrator and External Consul roles in NEW families

---

# PART 3: COMBINED SCENARIOS

## 🔀 3. Hybrid Subscription Models

### Core Principle
**Advisors can maintain BOTH invited FA relationships (families pay $X) AND Consultant subscription (advisor pays $Z or $Z_premium) simultaneously.**

---

## 🔄 3.1 Conversion Path: Family Advisor → Standard Consultant

### Initial State (Family-Invited Only)
```
Family Advisor Status:
├─ Invited by Family A
├─ Access: Succession + Assets modules (family configured)
├─ Permissions: Read + Write
├─ Family Council: No
├─ Family A pays: $FAMILY_BASE + $X per month
└─ Advisor pays: $0
```

### After Conversion to Standard Consultant (Dual Status)
```
OLD Relationship with Family A (UNCHANGED):
├─ Still serves Family A as invited FA
├─ Access: Succession + Assets (same as before)
├─ Permissions: Read + Write (same as before)
├─ Family Council: No (same as before)
├─ Family A pays: $FAMILY_BASE + $X per month (continues)
└─ Advisor pays: $0 for this relationship

PLUS

NEW Standard Consultant Status:
├─ Public marketplace profile
├─ Service catalog: "Succession Planning Workshops"
├─ Serving NEW Families B, C, D via marketplace bookings
├─ Can connect to existing families for free
├─ Advisor pays: $Z per month (Consultant subscription)
└─ Families B, C, D pay: Per service via Stripe Connect
   ├─ During promo: Consultant receives 100%
   └─ After promo: Consultant receives (100 - N)%

────────────────────────────────────────────────────────────────
TOTAL ADVISOR MONTHLY COST: $Z per month (Standard subscription only)

TOTAL ADVISOR MONTHLY REVENUE:
├─ From Family A: Compensation through their $X seat payment
└─ From marketplace: Service bookings from B, C, D (100% during promo)
```

### Monthly Cost Summary
```
Family A:
├─ Base Portal:              $FAMILY_BASE
├─ FA seat:                  +$X
└─ TOTAL:                    $FAMILY_BASE + $X per month (NO CHANGE)

Advisor:
├─ Consultant subscription:  $Z per month (NEW)
└─ Revenue from Family A:    Included in their $X seat payment
└─ Revenue from marketplace: Service bookings (100% during promo, then (100-N)%)
```

**Key Point:** Family A continues paying $X even though advisor now has Consultant subscription. Platform receives both payments (not double-charging for same service—these are different services).

---

## 🔄 3.2 Conversion Path: Family Advisor → Premium Consultant

### Initial State (2 OLD Families)
```
Family Advisor Status:
├─ Invited by Family X (2 years ago)
│  ├─ Access: All 10 modules
│  ├─ Family Council: Yes
│  └─ Family X pays: $FAMILY_BASE + $X
│
├─ Invited by Family Y (1 year ago)
│  ├─ Access: Philanthropy + Education
│  ├─ Family Council: No
│  └─ Family Y pays: $FAMILY_BASE + $X
│
└─ Advisor pays: $0
```

### After Conversion to Premium Consultant (Mixed Status)
```
OLD Relationships (PRESERVED):

Family X:
├─ Still serves as invited FA
├─ Access: All 10 modules (unchanged)
├─ Family Council: Yes (unchanged)
├─ Role: Family Advisor (NOT upgraded to External Consul)
├─ Family X pays: $FAMILY_BASE + $X (continues)
└─ Advisor pays: $0 for this relationship

Family Y:
├─ Still serves as invited FA
├─ Access: Philanthropy + Education (unchanged)
├─ Family Council: No (unchanged)
├─ Role: Family Advisor (NOT upgraded to External Consul)
├─ Family Y pays: $FAMILY_BASE + $X (continues)
└─ Advisor pays: $0 for this relationship

NEW Relationships (CREATED VIA PREMIUM):

Family Z (created 3 months ago):
├─ Created by Premium Consultant
├─ Access: All 10 modules + Portal Admin
├─ Family Council: Yes (automatic)
├─ Role: External Consul + Administrator (automatic)
├─ Family Z pays: $0 (Consultant covers)
└─ Included in Premium subscription

Families A, B (created recently):
├─ Created by Premium Consultant
├─ Access: All 10 modules + Portal Admin
├─ Family Council: Yes (automatic)
├─ Role: External Consul + Administrator (automatic)
├─ Families A, B pay: $0 each (Consultant covers)
└─ Included in Premium subscription (if N≥3)

────────────────────────────────────────────────────────────────
TOTAL FAMILIES: 5 relationships
├─ 2 OLD (X, Y): FA role, families pay $X each
└─ 3 NEW (Z, A, B): External Consul + Administrator role, Consultant pays

ADVISOR MONTHLY COST: $Z_premium (Premium subscription, covers 3 NEW families if N≥3)

PLATFORM MONTHLY REVENUE:
├─ From Family X: $FAMILY_BASE + $X
├─ From Family Y: $FAMILY_BASE + $X
└─ From Advisor:  $Z_premium
```

### Visual Representation
```
                    PREMIUM CONSULTANT
                           │
              ┌────────────┼────────────┐
              │            │            │
          OLD FA      OLD FA        NEW (Created)
         (Family X)  (Family Y)    (Z, A, B)
              │            │            │
        Family Pays  Family Pays   Consultant Pays
        $FAMILY_BASE $FAMILY_BASE  $Z_premium
           + $X         + $X
              │            │            │
        FA role      FA role      External Consul
        (configured) (configured) + Administrator
                                  (auto full access)
```

---

## 🔄 3.3 Scenario: Standard Consultant Wants to Onboard New Family

### Problem
```
Standard Consultant meets Family Gamma:
├─ Family Gamma: No subscription yet, wants to use platform
├─ Standard Consultant: Wants to work with Family Gamma
└─ Issue: Standard Consultant CANNOT create portals
```

### Solution 1: Family Self-Subscribe
```
Path:
1. Family Gamma subscribes themselves ($FAMILY_BASE)
2. Family Gamma invites Consultant as FA (+$X)
3. Family Gamma configures Consultant's access
4. Consultant connects to Family Gamma for free

Result:
├─ Family Gamma pays: $FAMILY_BASE + $X
├─ Consultant pays:   $Z (Standard subscription)
├─ Consultant role:   FA (as configured by family)
└─ Relationship:      Invited FA (family controls)
```

### Solution 2: Consultant Upgrades to Premium
```
Path:
1. Consultant upgrades to Premium ($Z_premium)
2. Consultant creates Family Portal for Family Gamma
3. Consultant invites Family Gamma members
4. Consultant automatically becomes External Consul + Administrator

Result:
├─ Family Gamma pays: $0
├─ Consultant pays:   $Z_premium (covers Family Gamma)
├─ Consultant role:   External Consul + Portal Administrator
└─ Relationship:      Managed portal (consultant controls)
```

### Decision Factors
**Choose Solution 1 (Family Self-Subscribe) if:**
- Family wants independence and ownership
- Family may change advisors in future
- Family prefers to control advisor access
- Consultant has Standard subscription and doesn't want to upgrade

**Choose Solution 2 (Premium Upgrade) if:**
- Family wants turnkey solution (don't want to manage)
- Consultant wants full control of platform experience
- Consultant has multiple families to onboard
- Consultant willing to invest in Premium tier

---

# PART 4: COMMISSION MODEL

## 💳 4. Commission Structure

### 4.1 Current State (Platform Launch Promotional Period)

**Promotional Period:**
- Commission Rate: **0%**
- Consultant Receives: **100%** of transaction amount
- Platform Revenue: Subscriptions only (no transaction commission)
- Timing: Based on **platform launch date** (not individual consultant signup dates)
- All consultants benefit equally during promotional period

**Example:**
```
Family books $1,000 service
├─ Consultant receives: $1,000 (100%)
├─ Platform commission: $0 (0%)
└─ Platform revenue: Only subscription fees
```

### 4.2 Future State (Post-Promotional Period)

**After Promotional Period Ends:**
- Commission Rate: **N%** (to be determined and announced)
- Consultant Receives: **(100 - N)%** of transaction amount
- Platform Revenue: Subscriptions + transaction commissions
- Applies to all consultants simultaneously on same date

**Example:**
```
Family books $1,000 service
├─ Platform commission: $1,000 × N%
├─ Consultant receives: $1,000 × (1 - N%)
└─ Platform revenue: Subscriptions + commissions
```

### 4.3 Promotional Period Timeline

**Critical Rule: Based on Platform Launch, NOT Individual Subscriptions**

```
Platform Launch:         January 1, 2026 (example)
Promotional Period:      January 1 - March 31, 2026 (3 months example)
All Consultants:         0% commission during this period
Commission Activation:   April 1, 2026 (all consultants simultaneously)

Consultant A joined:     January 1, 2026
├─ Transactions Jan-Mar: 0% commission
└─ Transactions Apr+:    N% commission

Consultant B joined:     February 15, 2026
├─ Transactions Feb-Mar: 0% commission (same as Consultant A)
└─ Transactions Apr+:    N% commission (same as Consultant A)

Fair treatment: Both consultants face commission on same date
```

### 4.4 Transition Plan (Promotional → Commission)

**Timeline & Communication:**

1. **60 days before promotional period ends:** Announce commission rate (N%)
   - Email all consultants with details
   - Update Terms of Service
   - Publish FAQ about commission

2. **30 days before promotional period ends:** Final reminder
   - Remind consultants about upcoming change
   - Provide examples and calculations
   - Offer consultation calls

3. **Promotional period end date:** Commission activates
   - Commission applies to all new transactions
   - All consultants transition simultaneously
   - Old transactions (before activation) remain 0%

4. **30 days after activation:** Monitor and support
   - Track consultant feedback
   - Monitor transaction volumes
   - Adjust communication if needed

---

## 📈 5. Revenue Model Summary

### 5.1 Platform Revenue Sources

```
FAMILY SUBSCRIPTIONS (B2C):
├─ Base Family Portal subscriptions ($FAMILY_BASE)
├─ Family Advisor seats (+$X each, simplified pricing)
└─ Estimated LTV: High (multi-year relationships)

CONSULTANT SUBSCRIPTIONS (B2B):
├─ Standard Consultant tier ($Z/month)
├─ Premium Consultant tier ($Z_premium/month)
├─ Additional family seats (+$X_seat/month, for NEW families only)
└─ Estimated LTV: Medium-High (platform dependency)

MARKETPLACE TRANSACTIONS:
├─ Current (Promotional Period): 0% commission
├─ Future (Post-Promotional): N% commission
├─ Timeline: Based on platform launch date, not individual subscriptions
└─ Fair: All consultants transition simultaneously

COMBINED REVENUE:
├─ OLD Families pay for FA seats ($X each)
├─ Consultant pays for subscription ($Z or $Z_premium)
├─ Platform receives both (not double-charging—different services)
└─ Future: + marketplace commission (N%)
```

---

### 5.2 Pricing Philosophy

**Family Subscriptions:**
- Pay for what you use (portal + advisors you choose)
- Simplified FA pricing (one price $X for all access levels)
- Transparent seat pricing
- Control over advisor access and costs
- No hidden fees or transaction charges

**Consultant Subscriptions:**
- Pay for platform access (subscriptions)
- Promotional period: 0% commission (platform launch incentive)
- Future: N% commission (sustainable model)
- Clear timeline based on platform launch, not individual join dates
- All consultants treated fairly (same transition date)

**Combined Model:**
- OLD relationships preserved (families keep paying $X)
- NEW capabilities added (Consultant pays $Z or $Z_premium)
- Platform receives both payments (different value propositions)
- Future commission applies equally to all consultants

**No Forced Upgrades:**
- OLD families: FA role preserved (not auto-upgraded to External Consul)
- NEW families: External Consul automatic (Premium creates them)
- Respects existing agreements while enabling growth

**Commission Fairness:**
- Platform launch promotional period (not per-consultant)
- All consultants benefit equally during promo
- All consultants transition to commission on same date
- Transparent advance notice (60 days for rate, 30 days for end)

---

## 🔢 6. Pricing Variables (To Be Defined)

### Placeholder Values Used in This Document

**Family Subscriptions:**
```
$FAMILY_BASE = Base Family Portal subscription
  Examples used: $299, $399, $499, $599
  Actual pricing: TBD based on market research

$X = Family Advisor seat (simplified from old $X and $Y)
  Examples used: $199
  Actual pricing: TBD
  Note: Same price for 1 module or 10 modules (simpler than old model)
```

**Consultant Subscriptions:**
```
$Z = Standard Consultant subscription
  Examples used: $149/month
  Actual pricing: TBD

$Z_premium = Premium Consultant subscription
  Examples used: $599/month
  Actual pricing: TBD

$X_seat = Additional family seat (Premium tier, for NEW families only)
  Examples used: $99/month
  Actual pricing: TBD

N = Family seats included in Premium tier (for NEW families)
  Examples used: N=5
  Actual value: TBD
```

**Commission Model:**
```
N% = Platform commission on marketplace transactions
  Current: 0% (promotional period from platform launch)
  Future: TBD (to be determined and announced)
  
Promotional Period:
  Timing: Based on platform launch date
  Duration: TBD (to be announced at launch)
  Extension: At company's discretion
  Notice: 60 days before end (if not extended), 30 days before commission activation
  Fairness: All consultants benefit equally, regardless of join date
```

---

## 🚨 Quick Reference: Critical Business Rules v2.0

**Rule 1: Family Continues Paying for FA Regardless of Advisor Subscription**
- If FA purchases Consultant subscription (Standard or Premium)
- OLD family relationships: Family continues paying $X (unchanged)
- Consultant pays: $Z or $Z_premium (NEW subscription)
- Platform: Receives both (different services, not double-charging)

**Rule 2: Standard Consultant CANNOT Create NEW Family Portals**
- Standard tier: Marketplace + work with existing families only
- To create NEW portals: Must upgrade to Premium
- Can connect to existing families for free

**Rule 3: External Consul + Administrator Role ONLY for NEW Families in Premium**
- Premium creates NEW family → Automatic External Consul + Administrator (full access)
- OLD families (before Premium) → Remain FA (role unchanged)
- Respects existing agreements while enabling B2B2C for NEW clients
- Migrating OLD family: Must create NEW Family Portal (new Family ID) to move under Premium coverage

**Rule 4: Platform Commission Based on Launch Date, Not Individual Subscriptions**
- Promotional period: Starts at platform launch (e.g., Jan 1, 2026)
- Duration: TBD at launch (e.g., 3 months = ends Mar 31, 2026)
- All consultants: Benefit from 0% commission during promotional period
- All consultants: Face N% commission on same date (e.g., Apr 1, 2026)
- Fair treatment: No advantage to early vs late joiners during promo

**Rule 5: Simplified FA Pricing**
- All Family Advisors cost $X (regardless of access level)
- Family configures: modules (1-10), permissions, Family Council
- No more $X vs $Y pricing tiers
- Simpler, more predictable for families

---

## 📝 Version History

### v2.0.2 (2025-11-24)
**Documentation Cleanup:**
- ✅ Removed: All technical implementation details (database schemas, code examples, API structures)
- ✅ Removed: Technical sections (4.5 Communication Templates, 4.6 Technical Architecture)
- ✅ Simplified: PART 4 Commission Model - business focus only
- ✅ Retained: Business rules, pricing logic, timelines, and transition plan
- 📝 Purpose: Document is now purely business-focused, technical details moved to technical documentation

### v2.0.1 (2025-11-24)
**Clarifications & Improvements:**
- ✅ Clarified: Premium Consultant automatically becomes **External Consul + Administrator** in NEW families
- ✅ Simplified: Removed redundant phrase "or invite non-existing families" from Standard Consultant limitations
- ✅ Added: Migration path for OLD families to move under Premium coverage
  - Must create NEW Family Portal (new Family ID)
  - Setup portal and invite family members
  - Consultant becomes External Consul + Administrator in NEW portal
  - Family stops paying, Consultant pays instead
- ✅ Updated: All references throughout document to include Administrator role for Premium NEW families
- ✅ Updated: Rule 3 with migration instructions

### v2.0.0 (2025-11-21)
**Major Changes:**
- ✅ Simplified B2C: Single Family Advisor type ($X) with flexible configuration
- ✅ Standard Consultant: CANNOT create NEW portals (only existing families)
- ✅ Premium Consultant: Can create NEW portals, External Consul only in NEW families
- ✅ Rule 1: Family continues paying $X even if FA buys Consultant subscription
- ✅ Rule 3: OLD families preserve FA role, NEW families get External Consul
- ✅ Removed $Y pricing tier (simplified to single $X for all advisors)
- ✅ **Commission Model**: Platform launch promotional period architecture
  - Current: 0% commission during promotional period
  - Future: N% commission (to be announced)
  - Timing: Based on platform launch date (fair to all consultants)
  - Architecture: Database schema and logic prepared for future activation

### v1.0.0 (2025-10-18)
**Initial Version:**
- 2 advisor types: Personal Family Advisor ($X) and External Consul ($Y)
- Standard and Premium Consultant tiers
- 100% Payment Model
- B2B2C model with Premium tier

---

**Last Updated:** 2025-11-24
**Next Review:** 2026-02-21
**Maintainer:** Product Team
**Status:** Published - v2.0.2 business-focused documentation