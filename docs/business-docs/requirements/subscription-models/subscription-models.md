---
doc_id: "DOC-BIZ-001"
title: "Subscription Models & Pricing Structure"
type: "reference"
category: "business"
audience: "product-manager|business-analyst|stakeholder|sales"
complexity: "intermediate"
created: "2025-10-18"
updated: "2025-10-18"
version: "1.0.0"
status: "published"
tags: ["subscriptions", "pricing", "monetization", "business-model", "revenue"]
related: ["DOC-USR-000", "DOC-USR-004", "DOC-USR-005", "DOC-USR-006"]
owner: "product-team"
maintainer: "product-team"
reviewer: ""
priority: "critical"
business_value: "Defines complete revenue model and pricing structure for platform"
user_impact: "Clear understanding of costs for families and advisors"
review_cycle: "quarterly"
next_review: "2026-01-18"
last_review: ""
review_notes: "Initial creation - complete subscription model documentation"
---

# Subscription Models & Pricing Structure

## 📋 Overview

This document defines the complete subscription and pricing structure for the Family Governance Platform, covering both **Family Subscriptions** (B2C) and **Consultant Subscriptions** (B2B), plus hybrid B2B2C models.

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
  Base    Advisor                              Standard  Premium
  Portal   Seats                                 Tier     Tier
    │         │                                      │         │
    │     ├───┴───┐                                  │         │
    │     │       │                                  │    ├───┴───┐
    │  Personal External                           │    │       │
    │  Family   Consul                             │  Base  +Family
    │  Advisor  (Full)                             │  Access Seats
    │  (1-7m)   (10m)                              │         (B2B2C)
```

---

## 👤 Quick Use Cases

### As a Family

**Base Access:**
> "As a **Family**, I can purchase a Family Portal subscription that gives all family members access to 10 governance modules (Constitution, Meetings, Decisions, Assets, Succession, Education, Philanthropy, Conflicts, Mentorship, Family Management)."

**Adding Specialists:**
> "As a **Family**, I can add a **Personal Family Advisor** seat to help us in specific areas (e.g., Succession Planning only or Philanthropy only), and they will only see the modules I grant them access to."

**Adding Strategic Partner:**
> "As a **Family**, I can add an **External Consul** seat so they can be a full Family Council member with access to all 10 modules and participate in strategic governance of our family."

**Cost Control:**
> "As a **Family**, I pay $FAMILY_BASE for the base portal + $X for each Personal Family Advisor + $Y for each External Consul. I control who to invite and how much to spend."

---

### As a Consultant

**Marketplace Access (Standard Tier):**
> "As a **Consultant**, I can purchase a Standard tier subscription ($Z/month) that gives me a public marketplace profile, ability to create services, and receive bookings from different families. I receive 100% of payments from families via Stripe Connect—the platform takes no transaction fees."

**Building Client Portfolio:**
> "As a **Consultant**, I can offer my services (workshops, consultations, mediations) in the marketplace and work simultaneously with 1-N families. Each family pays me directly for specific services, and I get access only to the modules needed for the work."

**Managing Family Portals (Premium Tier):**
> "As a **Consultant**, I can purchase a Premium tier subscription ($Z_premium/month) that includes N Family Portal seats. This allows me to create portals for my existing clients who will use the platform for free, while I serve as their Portal Administrator and External Consul in all these families."

**Scaling Practice (Premium + Extra Seats):**
> "As a **Consultant** with Premium tier, I can add additional Family Portal seats ($X_seat/month each) as my client base grows. For example, if Premium tier includes 5 families but I have 8 clients, I pay for 3 additional seats."

**Hybrid Model:**
> "As a **Consultant**, I can simultaneously be an invited advisor in one family (they pay for my seat) AND have a marketplace subscription (I pay for marketplace access). This allows me to maintain my relationship with the first family while expanding my client base through the marketplace."

---

### Combined Scenarios

**Family + Invited Advisor Who Grows:**
> "As a **Family**, I invited a Personal Family Advisor 2 years ago and pay $X/month for their seat. They decided to expand their practice and bought a Consultant subscription. I continue paying $X/month for their work with me, while they work with other families through the marketplace in parallel. Nothing changes for me."

**Family Hires Existing Consultant as External Consul:**
> "As a **Family**, I work with a Consultant through marketplace bookings. We're satisfied with their work and want to make them an External Consul (strategic partner with full access). Since they already pay for a Consultant subscription, **the platform doesn't charge us** for an External Consul seat. We simply change the relationship type from 'marketplace booking' to 'External Consul', and they get access to all modules as part of their existing subscription."

**Consultant Becomes External Consul Without Extra Cost:**
> "As a **Consultant**, I already pay a subscription of $Z/month (Standard) or $Z_premium/month (Premium). A family I work with through the marketplace offers to make me their External Consul. I **don't need to pay extra**, and the family **doesn't need to pay for my seat**—it's already included in my Consultant subscription. I simply get upgraded access to this family (all 10 modules + Family Council status) as a benefit of my subscription."

**Family Office Firm:**
> "As a **Family Office Firm** (Consultant Premium tier), I manage 12 families offline. I create a Family Portal for each, pay for all 12 seats, and provide the platform as part of my service offering. Families don't know it's a separate platform—for them, it's just part of my service. I get sticky relationships and differentiation from competitors."

---

---

## 📜 Critical Business Rules

### Rule 1: No Double Payment for Consultant-as-External-Consul

**Scenario:** Family wants to hire existing Consultant as External Consul

**Traditional Model (if Consultant was NOT subscribed):**
```
Family pays: $FAMILY_BASE + $Y/month (External Consul seat)
Consultant pays: $0
```

**Actual Model (Consultant already subscribed):**
```
Family pays: $FAMILY_BASE (NO additional $Y charge)
Consultant pays: $Z or $Z_premium/month (existing subscription)
Platform: No additional revenue, but strengthens relationship
```

**Rationale:**
- Consultant already paying for platform access
- Would be unfair to charge family when advisor already subscribed
- Incentivizes Consultants to build deeper relationships with families
- Encourages families to upgrade marketplace relationships to External Consul

**Implementation:**
```
IF advisor.has_consultant_subscription = TRUE
  AND family.wants_external_consul = TRUE
  THEN
    family.additional_charge = $0
    advisor.additional_charge = $0
    advisor.access_level = 'external_consul' (upgraded from service-based)
    relationship_type = 'consultant_as_external_consul'
```

**Billing Display (Family Invoice):**
```
Family Alpha - Monthly Invoice

Base Subscription:
└─ Family Portal                    $499.00

Advisor Seats:
└─ External Consul (John Smith)     $0.00
   • Consultant subscription (no additional charge)
   • All modules access

──────────────────────────────────────────
TOTAL DUE:                          $499.00
```

---

### Rule 2: Family-Invited Advisor Can Maintain Role After Becoming Consultant

**Scenario:** Personal Family Advisor or External Consul converts to Consultant

**What Happens:**
- Original invited relationship maintained
- Family continues paying for advisor seat ($X or $Y)
- Advisor starts paying Consultant subscription ($Z or $Z_premium)
- Both charges remain (NOT replaced)

**Rationale:**
- Original family relationship is separate from marketplace presence
- Family still receives dedicated advisory services (part of their subscription)
- Consultant gains additional marketplace access (their own subscription)
- Clear separation between invited work vs. marketplace work

**Exception:** If family and advisor mutually agree to change relationship to "Consultant-as-External-Consul" model, then Rule 1 applies and family stops paying seat charge.

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

**Pricing Variables** (TBD - to be defined by business strategy):
- May vary by family size tiers (e.g., <10, 10-30, 30+ members)
- May vary by module selection (all 10 vs. subset)
- Annual discount option (e.g., 10 months for price of 12)

---

## 💼 1.2 Invited Advisor Seats (Add-ons)

Families can invite external advisors to access their Family Portal. These are **paid add-ons** to the base subscription.

### Two Types of Invited Advisors

#### Type 1: Personal Family Advisor (Specialist)

**Access Scope:** 1-7 modules (family selects which)

**Pricing:**
```
Personal Family Advisor Seat: +$X per month
```

**Use Cases:**
- Succession planning specialist (Succession module only)
- Philanthropic advisor (Philanthropy module only)
- Education coordinator (Education + Mentorship modules)
- Asset manager (Assets module only)

**Key Features:**
- ✅ Family controls which modules advisor can access
- ✅ Advisor sees ONLY permitted module data
- ✅ Cannot participate in Family Council
- ✅ Focused, specialized support
- ❌ No cross-module visibility
- ❌ Not discoverable in marketplace

**Billing:**
- Added to family's monthly invoice
- Billed per advisor (can have multiple)
- Family can cancel advisor seat anytime
- Optional: Fixed-term contracts (30-365 days)

---

#### Type 2: External Consul (Strategic Partner)

**Access Scope:** ALL 10 modules (unrestricted)

**Pricing:**
```
External Consul Seat: +$Y per month
(Typically $Y = 1.5× to 2× the cost of $X)
```

**Use Cases:**
- Comprehensive governance consultant
- Family mediator (needs full context)
- Family office manager/COO
- Strategic advisor (board-level)
- Crisis manager (temporary, full access)

**Key Features:**
- ✅ Full access to all 10 governance modules
- ✅ Family Council member status (voting, meetings)
- ✅ Sees ALL family data (unrestricted)
- ✅ Strategic partnership role
- ✅ Can create/edit across all modules
- ❌ Not discoverable in marketplace

**Billing:**
- Added to family's monthly invoice
- Billed per advisor (typically only 1-2 per family)
- Family can cancel advisor seat anytime
- Usually ongoing (not fixed-term)

---

### 1.3 Family Subscription Calculation Examples

#### Example 1: Small Family with Specialist
```
Family Size: 8 members
Advisor Needs: Succession planning expert

Monthly Cost Breakdown:
├─ Base Family Portal:           $FAMILY_BASE
└─ Personal Family Advisor:      +$X
   (Succession module only)
────────────────────────────────────────────
TOTAL:                           $FAMILY_BASE + $X per month
```

---

#### Example 2: Medium Family with Strategic Partner
```
Family Size: 22 members
Advisor Needs: Comprehensive governance support

Monthly Cost Breakdown:
├─ Base Family Portal:           $FAMILY_BASE
└─ External Consul:              +$Y
   (All 10 modules + FC member)
────────────────────────────────────────────
TOTAL:                           $FAMILY_BASE + $Y per month
```

---

#### Example 3: Large Family with Multiple Advisors
```
Family Size: 45 members
Advisor Needs: Strategic partner + 2 specialists

Monthly Cost Breakdown:
├─ Base Family Portal:           $FAMILY_BASE
├─ External Consul:              +$Y
│  (Strategic governance partner)
├─ Personal Family Advisor #1:   +$X
│  (Philanthropy specialist)
└─ Personal Family Advisor #2:   +$X
   (Education coordinator)
────────────────────────────────────────────
TOTAL:                           $FAMILY_BASE + $Y + 2×$X per month

Example with placeholder values:
  Assuming $FAMILY_BASE = $500, $Y = $300, $X = $150
  = $500 + $300 + $300 = $1,100 per month
```

---

## 🔄 1.4 Family Subscription Lifecycle

### Onboarding
1. Family signs up for Base Portal
2. Invites family members (no additional cost)
3. Optionally invites advisors (adds to subscription)
4. Receives single monthly invoice for all

### Modification
- **Add advisors**: Prorated charge for current month
- **Remove advisors**: Prorated credit or effective next billing cycle
- **Change advisor type**: (Personal FA ↔ External Consul)
  - Subject to availability and advisor agreement
  - Price adjusts accordingly

### Cancellation
- Family can cancel anytime (subject to terms)
- Invited advisor seats automatically removed
- Advisor loses access immediately
- Historical data retained (anonymized advisor contributions)

---

# PART 2: CONSULTANT SUBSCRIPTIONS (B2B)

## 💼 2. Consultant Subscription Model

### Core Principle
**Independent advisors pay for marketplace access to acquire family clients.**

---

## 💰 2.1 Standard Consultant Tier

### What's Included
- ✅ Public marketplace profile (discoverable)
- ✅ Service catalog creation (unlimited services)
- ✅ Booking management system
- ✅ Stripe Connect integration (receive payments)
- ✅ Access to families via service bookings
- ✅ Client communication tools
- ✅ Revenue analytics dashboard
- ✅ Review & rating system

### Pricing
```
Standard Consultant: $Z per month (monthly)
                     $Z×10 per year (annual - 2 months free)
```

### Payment Structure
**Critical: 100% Payment Model**
- Family books service (e.g., $1,000 workshop)
- Family pays Consultant directly via Stripe Connect: **$1,000 (100%)**
- Platform transaction fee: **$0**
- Platform revenue: **Only from Consultant subscription ($Z/month)**

**Why This Matters:**
- Consultants keep 100% of their service revenue
- Platform earns from subscriptions, not transactions
- Competitive advantage vs. other marketplaces (typically 15-30% fees)

### Access Model
**Service-Based, Multi-Family:**
- Consultant can serve multiple families
- Access limited to:
  - Families with active bookings
  - Modules covered by service contract
  - Duration of service engagement

**Example:**
```
Consultant offers "Succession Planning Workshop"
├─ Service includes: Succession module access
├─ Duration: 90 days
├─ Pricing: $2,500
└─ Family books service
   ├─> Consultant gets 90-day access to Succession module
   ├─> Family pays $2,500 via Stripe Connect
   └─> Consultant receives $2,500 (100%)
```

### Who Should Choose Standard Tier
- ✅ Solo practitioners building client portfolio
- ✅ Workshop facilitators serving multiple families
- ✅ Specialists offering project-based services
- ✅ Advisors wanting marketplace visibility
- ❌ Not for: Advisors managing comprehensive family portals

---

## 💎 2.2 Premium Consultant Tier (B2B2C Model) 🆕

### What's Included
**Everything in Standard Tier PLUS:**
- ✅ Create and manage Family Portals (up to N families included)
- ✅ Portal Administrator capabilities
- ✅ External Consul role in ALL managed families
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
- Consultant creates Family Portals for existing clients
- Full External Consul access to each managed family
- Families use portal for free (Consultant pays)
- Consultant = Portal Admin + Strategic Advisor

**Critical Difference from Standard:**
| Aspect | Standard Consultant | Premium Consultant |
|--------|--------------------|--------------------|
| **Family Portal** | Family owns & pays | Consultant creates & pays |
| **Consultant Role** | Service provider | Portal Admin + External Consul |
| **Family Awareness** | Family knows platform | Family may not know platform |
| **Relationship** | Transactional | Managed service |

### Cost Calculation

#### Scenario 1: Within Included Seats
```
Premium Consultant with 5 families (N=5)

Monthly Cost:
└─ Premium subscription:         $Z_premium per month
   (includes 5 family portals)
────────────────────────────────────────────
TOTAL:                           $Z_premium per month

Per-Family Cost to Consultant:   $Z_premium ÷ 5
Families Pay:                    $0 each
```

---

#### Scenario 2: Beyond Included Seats
```
Premium Consultant with 8 families (N=5 + 3 extra)

Monthly Cost:
├─ Premium subscription:         $Z_premium per month
│  (includes 5 family portals)
└─ Extra 3 family seats:         +3 × $X_seat per month
────────────────────────────────────────────
TOTAL:                           $Z_premium + (3 × $X_seat) per month

Per-Family Cost to Consultant:   Total ÷ 8 families
Families Pay:                    $0 each
```

---

### Who Should Choose Premium Tier
- ✅ Family office firms managing 5-15 families
- ✅ Wealth advisory firms bundling platform access
- ✅ Consultancies with existing client portfolios
- ✅ Advisors wanting to control entire platform experience
- ✅ Firms seeking competitive differentiation (value-add service)
- ❌ Not for: Solo practitioners without existing clients

---

## 📊 2.3 Consultant Tier Comparison

| Feature | Standard ($Z/month) | Premium ($Z_premium/month) |
|---------|---------------------|---------------------------|
| **Marketplace Profile** | ✅ Public | ✅ Public |
| **Service Catalog** | ✅ Unlimited | ✅ Unlimited |
| **Stripe Connect** | ✅ 100% revenue | ✅ 100% revenue |
| **Family Portals Included** | ❌ None | ✅ N families |
| **Create Family Portals** | ❌ No | ✅ Yes |
| **Portal Administrator** | ❌ No | ✅ Yes |
| **External Consul Role** | ❌ No | ✅ Yes (all managed) |
| **Families Pay** | Per booking | $0 (Consultant pays) |
| **Additional Families** | N/A | +$X_seat/month each |
| **Use Case** | Client acquisition | Client management |

---

## 🔄 2.4 Consultant Subscription Lifecycle

### Standard Consultant Onboarding
1. Register & pay subscription ($Z/month) - **BLOCKS rest of registration**
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
4. Create Family Portals for existing clients
5. Invite family members to portals
6. Automatically assigned as External Consul in each family

**Time to First Portal:**
- Upgrade: Instant (billing cycle adjustment)
- Portal creation: 15-30 minutes per family
- Family onboarding: 1-7 days per family

### Subscription Modification
- **Upgrade Standard → Premium**: Prorated charge, instant access
- **Add family seats**: Prorated charge for current month
- **Downgrade Premium → Standard**: Lose portal creation, must migrate managed families
- **Cancel**: Profile unpublished, complete active bookings, can re-subscribe anytime

---

# PART 3: COMBINED SCENARIOS

## 🔀 3. Hybrid Subscription Models

### Core Principle
**Advisors can maintain BOTH invited advisor relationships AND marketplace consultant status simultaneously.**

---

## 🔄 3.1 Conversion Path 1: Personal Family Advisor → Consultant

### Initial State (Family-Invited Only)
```
Personal Family Advisor Status:
├─ Invited by Family A
├─ Access: Succession module only
├─ Family A pays: +$X per month (advisor seat)
└─ Advisor pays: $0
```

### After Conversion to Consultant (Dual Status)
```
Personal Family Advisor Status (maintained):
├─ Still serves Family A
├─ Access: Succession module only
├─ Family A pays: +$X per month (advisor seat)
└─ Advisor pays: $0

PLUS

Standard Consultant Status (new):
├─ Public marketplace profile
├─ Service catalog: "Succession Planning Workshops"
├─ Serving Families B, C, D via bookings
├─ Advisor pays: $Z per month (subscription)
└─ Families B, C, D pay: Per service via Stripe Connect (100% to advisor)
────────────────────────────────────────────────────────────────
TOTAL ADVISOR COST: $Z per month (Consultant subscription only)
TOTAL ADVISOR REVENUE: Family A (via their subscription) + marketplace bookings
```

### Monthly Cost Summary
```
Family A:
├─ Base Portal:              $FAMILY_BASE
├─ Personal FA seat:         +$X
└─ TOTAL:                    $FAMILY_BASE + $X per month

Advisor:
├─ Consultant subscription:  $Z per month
└─ Revenue from Family A:    Included in their $X seat payment (relationship work)
└─ Revenue from marketplace: 100% of service bookings (B, C, D)
```

---

## 🔄 3.2 Conversion Path 2: External Consul → Consultant

### Initial State (Family-Invited Only)
```
External Consul Status:
├─ Invited by Family X
├─ Access: All 10 modules + Family Council member
├─ Family X pays: +$Y per month (advisor seat)
└─ Advisor pays: $0
```

### After Conversion to Consultant (Dual Status)
```
External Consul Status (maintained):
├─ Still serves Family X
├─ Access: All 10 modules + Family Council member
├─ Family X pays: +$Y per month (advisor seat)
└─ Advisor pays: $0

PLUS

Standard Consultant Status (new):
├─ Public marketplace profile
├─ Service catalog: "Comprehensive Governance Consulting"
├─ Serving Families Y, Z via bookings
├─ Advisor pays: $Z per month (subscription)
└─ Families Y, Z pay: Per service via Stripe Connect (100% to advisor)
────────────────────────────────────────────────────────────────
TOTAL ADVISOR COST: $Z per month (Consultant subscription only)
TOTAL ADVISOR REVENUE: Family X (via their subscription) + marketplace bookings
```

### Monthly Cost Summary
```
Family X:
├─ Base Portal:              $FAMILY_BASE
├─ External Consul seat:     +$Y
└─ TOTAL:                    $FAMILY_BASE + $Y per month

Advisor:
├─ Consultant subscription:  $Z per month
└─ Revenue from Family X:    Included in their $Y seat payment (strategic advisory)
└─ Revenue from marketplace: 100% of service bookings (Y, Z)
```

**Key Advantage**: External Consul has higher conversion rate (25-30%) and faster time-to-market due to:
- Higher profile completion (40-60% vs. 20-40%)
- Broader expertise (all 10 modules)
- Higher credibility (Family Council member)
- Premium positioning in marketplace

---

## 🔄 3.3 Combined Model: Premium Consultant Managing Families + Original Invited Role

### Scenario: Consultant Who Started as External Consul

**Phase 1: External Consul (Family A)**
```
Relationship: Invited by Family A (2 years ago)
Family A pays: +$Y per month (External Consul seat)
Advisor pays: $0
```

**Phase 2: Convert to Standard Consultant (6 months ago)**
```
Family A (maintained): Family pays +$Y per month
Consultant subscription: Advisor pays $Z per month
Marketplace families: Serving 3 families via bookings
```

**Phase 3: Upgrade to Premium Consultant (current)**
```
Family A (maintained):
├─ Still External Consul relationship
├─ Family A pays: +$Y per month
└─ Advisor pays: $0 for this relationship

Premium Consultant:
├─ Advisor pays: $Z_premium per month
├─ Creates portals for 5 offline clients (Families B, C, D, E, F)
├─ All 5 families pay: $0 (Consultant covers)
├─ Consultant is External Consul in B, C, D, E, F
└─ Continues serving marketplace families via bookings

────────────────────────────────────────────────────────────────
TOTAL FAMILIES SERVED: 6+ (A via invitation + B-F managed + marketplace)
ADVISOR MONTHLY COST: $Z_premium per month (covers 5 managed families)
FAMILY A MONTHLY COST: $FAMILY_BASE + $Y per month (independent)
FAMILIES B-F MONTHLY COST: $0 each (Consultant pays)
```

### Visual Representation
```
                    CONSULTANT
                        │
            ┌───────────┼────────────┐
            │           │            │
      INVITED     MANAGED       MARKETPLACE
      (Family A)  (B-F)         (G, H, I...)
          │           │            │
    Family Pays  Consult Pays  Pay per Service
      $Y/mo     $Z_premium/mo    (100% direct)
          │           │            │
    External     External      Service-Based
     Consul      Consul         Access
```

---

## 🔄 3.4 Transition Scenario: Family-Paid → Consultant-Paid Portal

### Use Case
Family A originally paid for their portal, then hired Consultant. Consultant wants to take over portal management.

**Option 1: Family Maintains Independence (Recommended)**
```
Before:
Family A: Pays $FAMILY_BASE per month (own portal)

After hiring Consultant:
Family A: Pays $FAMILY_BASE + $Y per month (portal + External Consul)
Consultant: Receives compensation from Family A (outside platform)

Result: Family maintains control and ownership of portal
```

**Option 2: Transfer to Consultant Management (Complex)**
```
Before:
Family A: Pays $FAMILY_BASE per month (own portal)

After transfer:
Family A: Stops paying (portal transferred)
Consultant: Upgrades to Premium, portal now managed by Consultant
Consultant pays: $Z_premium per month (includes Family A + others)
Family A pays: $0

Result: Consultant controls portal, family is "guest"
Note: This changes relationship dynamic significantly
```

**Recommendation**: Keep Family A as independent subscriber, Consultant serves as External Consul. This preserves:
- Family's autonomy and ownership
- Clear relationship boundaries
- Family's ability to change advisors
- Consultant's role as strategic advisor (not vendor)

---

# PART 4: PRICING EXAMPLES & SCENARIOS

## 💰 4. Real-World Pricing Scenarios

### 4.1 Family-Only Scenarios (No Advisors)

#### Scenario A: Small Family, DIY Governance
```
Family Profile:
├─ Members: 6
├─ Modules: Constitution, Meetings, Communications
└─ Advisors: None

Monthly Cost:
└─ Base Family Portal: $FAMILY_BASE
────────────────────────────────────────────
TOTAL: $FAMILY_BASE per month

Example: $FAMILY_BASE = $299
Annual cost: $299 × 12 = $3,588/year
```

---

#### Scenario B: Large Family, Full Self-Management
```
Family Profile:
├─ Members: 42
├─ Modules: All 10 modules active
└─ Advisors: None (strong internal Family Council)

Monthly Cost:
└─ Base Family Portal: $FAMILY_BASE (may be higher tier for size)
────────────────────────────────────────────
TOTAL: $FAMILY_BASE per month

Example: $FAMILY_BASE = $599 (large family tier)
Annual cost: $599 × 12 = $7,188/year
```

---

### 4.2 Family + Invited Advisor Scenarios

#### Scenario C: Growing Family with Succession Focus
```
Family Profile:
├─ Members: 15
├─ Active Modules: Constitution, Succession, Assets
├─ Challenge: Founder succession planning
└─ Solution: Hire Personal Family Advisor (Succession specialist)

Monthly Cost:
├─ Base Family Portal:           $FAMILY_BASE
└─ Personal Family Advisor:      +$X
   (Succession module only)
────────────────────────────────────────────
TOTAL: $FAMILY_BASE + $X per month

Example: $FAMILY_BASE = $399, $X = $199
Total: $399 + $199 = $598/month
Annual: $598 × 12 = $7,176/year
```

---

#### Scenario D: Established Family Office with Full Support
```
Family Profile:
├─ Members: 38
├─ Active Modules: All 10
├─ Complexity: Multi-generational, significant assets
└─ Solution: External Consul (governance partner) + 2 specialists

Monthly Cost:
├─ Base Family Portal:           $FAMILY_BASE
├─ External Consul:              +$Y
│  (All modules, strategic partner)
├─ Personal FA #1:               +$X
│  (Philanthropy specialist)
└─ Personal FA #2:               +$X
   (Education coordinator)
────────────────────────────────────────────
TOTAL: $FAMILY_BASE + $Y + 2×$X per month

Example: $FAMILY_BASE = $599, $Y = $399, $X = $199
Total: $599 + $399 + $398 = $1,396/month
Annual: $1,396 × 12 = $16,752/year
```

---

### 4.3 Consultant-Only Scenarios

#### Scenario E: Solo Consultant Building Practice
```
Consultant Profile:
├─ Experience: 3 years governance consulting
├─ Specialization: Conflict mediation
├─ Goal: Build 8-10 family client portfolio
└─ Strategy: Marketplace acquisition

Monthly Cost:
└─ Standard Consultant: $Z per month
────────────────────────────────────────────
TOTAL: $Z per month

Revenue Model:
├─ Subscription cost: $Z/month
├─ Service: "Family Conflict Mediation" @ $2,500 per engagement
├─ Avg bookings: 3-4 per month
├─ Gross revenue: $7,500-$10,000/month
└─ Net revenue: Gross - $Z subscription

Example: $Z = $149/month
├─ Subscription: $149/month
├─ 4 bookings @ $2,500: $10,000/month
└─ Net: $10,000 - $149 = $9,851/month
ROI: 6,600% (subscription pays for itself in <1 booking)
```

---

#### Scenario F: Mid-Size Consultancy Firm
```
Consultant Profile:
├─ Firm size: 3 senior advisors
├─ Current clients: 12 families (offline relationships)
├─ Challenge: Need governance platform for clients
└─ Solution: Premium Consultant tier (B2B2C)

Monthly Cost:
├─ Premium Consultant:           $Z_premium per month
│  (includes N=5 families)
└─ Extra family seats:           +(12-5) × $X_seat per month
   (7 additional families)
────────────────────────────────────────────
TOTAL: $Z_premium + 7×$X_seat per month

Example: $Z_premium = $599, $X_seat = $99
Total: $599 + (7 × $99) = $599 + $693 = $1,292/month
Annual: $1,292 × 12 = $15,504/year

Per-Family Cost: $1,292 ÷ 12 = $107.67/month per family

Value Proposition:
├─ Families get full portal: $0 (Consultant covers)
├─ Consultant differentiates: Platform access included in service
├─ Sticky relationships: Families locked into consultant's platform
└─ Competitive advantage: Bundled technology offering
```

---

### 4.4 Combined Scenarios (Invited + Consultant)

#### Scenario G: Consultant with Original Family + Marketplace
```
Consultant Profile:
├─ Started: External Consul to Family Alpha (2 years ago)
├─ Converted: To Standard Consultant 6 months ago
├─ Current: Serves Family Alpha + 4 marketplace families
└─ Status: Dual role maintained

Monthly Cost Breakdown:

Family Alpha (independent):
├─ Family Alpha pays:            $FAMILY_BASE + $Y per month
│  (for their portal + External Consul seat)
└─ Consultant pays:              $0 for this relationship

Consultant (marketplace):
├─ Consultant pays:              $Z per month
│  (Standard subscription)
└─ Families B-E pay:             Per service booking
   (100% to Consultant via Stripe)

────────────────────────────────────────────
TOTAL CONSULTANT COST: $Z per month
FAMILY ALPHA COST: $FAMILY_BASE + $Y per month
MARKETPLACE FAMILIES: Pay per service (100% to Consultant)

Example Numbers:
├─ Family Alpha pays: $599 + $399 = $998/month
├─ Consultant pays: $149/month (subscription)
├─ Marketplace revenue: 4 families × $1,500 avg = $6,000/month
└─ Consultant net income: $6,000 + (work for Alpha) - $149
   = ~$5,851/month + compensation from Alpha
```

---

#### Scenario I: Premium Consultant with Mixed Relationships
```
Consultant Journey:
├─ Year 1: External Consul to Family Alpha (invited)
├─ Year 2: Converted to Standard Consultant
├─ Year 3: Upgraded to Premium Consultant
└─ Current: Complex multi-family portfolio

Monthly Cost Evolution:

Year 1 (External Consul only):
├─ Family Alpha pays:            $FAMILY_BASE + $Y per month
└─ Advisor pays:                 $0

Year 2 (External Consul + Standard Consultant):
Option A - Keep paid seat:
├─ Family Alpha pays:            $FAMILY_BASE + $Y per month
├─ Advisor pays:                 $Z per month (subscription)
└─ Marketplace families (3):     Pay per booking

Option B - Convert to Rule 1 (Consultant-as-External-Consul):
├─ Family Alpha pays:            $FAMILY_BASE (saves $Y)
├─ Advisor pays:                 $Z per month (subscription)
└─ Marketplace families (3):     Pay per booking

Year 3 (Premium Consultant - choosing Option B):
├─ Family Alpha pays:            $FAMILY_BASE per month
│  (Consultant-as-External-Consul, no seat charge)
├─ Advisor pays:                 $Z_premium + 2×$X_seat per month
│  (Premium tier + 2 extra managed families: Gamma, Delta)
├─ Managed families (Gamma, Delta): $0 (Consultant pays)
└─ Marketplace families (2):     Pay per booking

────────────────────────────────────────────
Current State (Year 3):
Total families: 5 relationships
├─ Alpha: Consultant-as-External-Consul (Rule 1, family pays $FAMILY_BASE)
├─ Gamma, Delta: Managed portals (Consultant pays)
└─ 2 marketplace: Per-service bookings

Consultant cost: $Z_premium + 2×$X_seat per month
Family Alpha cost: $FAMILY_BASE per month (saves $Y from Year 1)

Example:
├─ Family Alpha: $499/month (was $499 + $399 = $898 in Year 1)
├─ Consultant: $599 + $198 = $797/month
├─ Gamma & Delta: $0 each (Consultant covers)
└─ Annual savings for Alpha: ($399 × 12) = $4,788/year
```

---

## 📊 5. Pricing Comparison Matrix

### 5.1 Family Perspective Comparison

| Family Scenario | Monthly Cost | What's Included | Best For |
|----------------|--------------|-----------------|----------|
| **DIY (No Advisors)** | $FAMILY_BASE | Portal + all modules | Self-sufficient families |
| **+ Personal FA** | $FAMILY_BASE + $X | + Specialist (1-7 modules) | Focused needs |
| **+ External Consul (invited)** | $FAMILY_BASE + $Y | + Strategic partner (full) | Comprehensive support |
| **+ External Consul (Consultant)** 🆕 | $FAMILY_BASE + $0 | + Strategic partner (Rule 1) | Upgrading marketplace relationship |
| **+ Multiple Advisors** | $FAMILY_BASE + $Y + n×$X | + Mix of specialists | Complex governance |
| **Consultant-Managed** | $0 | Full portal (Consultant pays) | B2B2C model |

---

### 5.2 Consultant Perspective Comparison

| Consultant Tier | Monthly Cost | Families Served | Revenue Model | Best For |
|----------------|--------------|-----------------|---------------|----------|
| **Invited Only** | $0 | 1-3 (invited) | Via family subscription | Starting out |
| **Standard Consultant** | $Z | Multiple (bookings) | 100% per service | Portfolio building |
| **Premium Consultant** | $Z_premium + extra seats | Multiple (managed + market) | Service + management | Established practice |
| **Invited + Standard** | $Z | Original + marketplace | Mixed (seat + bookings) | Growth phase |
| **Invited + Premium** | $Z_premium + extra | Original + managed + market | Full spectrum | Mature practice |

---

## 📈 6. Revenue Model Summary

### 6.1 Platform Revenue Sources

```
FAMILY SUBSCRIPTIONS (B2C):
├─ Base Family Portal subscriptions
├─ Personal Family Advisor seats (+$X each)
├─ External Consul seats (+$Y each)
└─ Estimated LTV: High (multi-year relationships)

CONSULTANT SUBSCRIPTIONS (B2B):
├─ Standard Consultant tier ($Z/month)
├─ Premium Consultant tier ($Z_premium/month)
├─ Additional family seats (+$X_seat/month)
└─ Estimated LTV: Medium-High (platform dependency)

MARKETPLACE TRANSACTIONS:
└─ Platform fee: $0 (100% to Consultant)
   (Revenue only from subscriptions)
```

---

### 6.2 Pricing Philosophy

**Family Subscriptions:**
- Pay for what you use (portal + advisors you choose)
- Transparent seat pricing
- Control over advisor access and costs
- No hidden fees or transaction charges
- **Special Rule 1**: If advisor is subscribed Consultant, family doesn't pay for External Consul seat

**Consultant Subscriptions:**
- Pay for platform access, not transactions
- 100% of service revenue stays with Consultant
- Competitive advantage vs. 15-30% marketplace fees
- Scalable pricing (Standard → Premium → Extra seats)
- **Benefit**: External Consul relationships with families are FREE (no additional charge to family)

**B2B2C Model (Premium Consultant):**
- Consultant pays for family portals
- Families access platform for free
- Creates sticky client relationships
- Enables white-label-like offerings

**No Double Payment Principle:**
- Platform never charges both parties for same relationship
- If Consultant subscribed, family's External Consul seat = $0
- If family invited before Consultant subscription, they can choose to keep paying or convert to Rule 1

---

## 📋 7. Implementation Guidelines

### 7.1 Stripe Configuration

**Family Subscriptions:**
```
Product: "Family Portal - Base"
├─ Price: $FAMILY_BASE per month
├─ Billing: Monthly recurring
└─ Add-ons (Metered):
   ├─ "Personal Family Advisor Seat" @ $X
   └─ "External Consul Seat" @ $Y
```

**Consultant Subscriptions:**
```
Product: "Consultant - Standard Tier"
├─ Price: $Z per month (or $Z×10 annual)
├─ Billing: Monthly or Annual
└─ Features: Marketplace access, service catalog, bookings

Product: "Consultant - Premium Tier"
├─ Price: $Z_premium per month (or $Z_premium×10 annual)
├─ Billing: Monthly or Annual
├─ Included: N family portal seats
└─ Add-on: "Additional Family Seat" @ $X_seat per month
```

---

### 7.2 Billing Logic

**Family Invoice Example:**
```
Family Alpha - Monthly Invoice
Date: 2025-11-01

Base Subscription:
└─ Family Portal                    $499.00

Advisor Seats:
├─ External Consul (John Smith)     $399.00
│  • All modules access
├─ Personal FA (Jane Doe)           $199.00
│  • Succession module
└─ Personal FA (Bob Wilson)         $199.00
   • Philanthropy module

──────────────────────────────────────────
Subtotal:                           $1,296.00
Tax (if applicable):                $0.00
──────────────────────────────────────────
TOTAL DUE:                          $1,296.00

Next billing date: 2025-12-01
```

**Family Invoice Example (with Rule 1 - Consultant as External Consul):**
```
Family Beta - Monthly Invoice
Date: 2025-11-01

Base Subscription:
└─ Family Portal                    $499.00

Advisor Seats:
└─ External Consul (Sarah Johnson)  $0.00
   • Consultant subscription (no additional charge)
   • All modules access + Family Council member

──────────────────────────────────────────
Subtotal:                           $499.00
Tax (if applicable):                $0.00
──────────────────────────────────────────
TOTAL DUE:                          $499.00

Next billing date: 2025-12-01

Note: Sarah Johnson is a subscribed Consultant. Per platform
policy, no additional External Consul seat charge applies.
```

**Consultant Invoice Example:**
```
Consultant - Jane Smith
Date: 2025-11-01

Premium Tier Subscription:
└─ Premium Consultant Access        $599.00
   (Includes 5 family portal seats)

Additional Family Seats:
├─ Family Portal - Alpha            $99.00
├─ Family Portal - Beta             $99.00
└─ Family Portal - Gamma            $99.00

──────────────────────────────────────────
Subtotal:                           $896.00
Tax (if applicable):                $0.00
──────────────────────────────────────────
TOTAL DUE:                          $896.00

Next billing date: 2025-12-01

Managed Families: 8 total
├─ Included in tier: 5 families
└─ Additional seats: 3 families @ $99 each
```

---

## 🔢 8. Pricing Variables (To Be Defined)

### Placeholder Values Used in This Document

**Family Subscriptions:**
```
$FAMILY_BASE = Base Family Portal subscription
  Examples used: $299, $399, $499, $599
  Actual pricing: TBD based on market research

$X = Personal Family Advisor seat
  Examples used: $149, $199
  Actual pricing: TBD

$Y = External Consul seat
  Examples used: $299, $399
  Actual pricing: TBD (typically 1.5-2× $X)
```

**Consultant Subscriptions:**
```
$Z = Standard Consultant subscription
  Examples used: $149/month
  Actual pricing: TBD

$Z_premium = Premium Consultant subscription
  Examples used: $599/month
  Actual pricing: TBD

$X_seat = Additional family seat (Premium tier)
  Examples used: $99/month
  Actual pricing: TBD

N = Family seats included in Premium tier
  Examples used: N=5
  Actual value: TBD
```

---

## 🔗 Related Documentation

- [DOC-USR-000: Advisor Types Overview](advisor-types-overview.md) - Classification and comparison
- [DOC-USR-004: Personal Family Advisor Persona](personal-family-advisor-persona.md)
- [DOC-USR-005: External Consul Persona](external-consul-persona.md)
- [DOC-USR-006: Consultant Persona](consultant-persona.md)
- [DOC-JRN-INV-ADV-001: Family-Invited Advisor Journey](../03-user-journeys/advisor/JRN-INV-ADV-001-family-invited-advisor.md)
- [DOC-JRN-CONS-001: Consultant Marketplace Journey](../03-user-journeys/advisor/JRN-CONS-001-consultant-marketplace.md)

---

## 🚨 Quick Reference: Critical Business Rules

**Rule 1: No Double Payment for Consultant-as-External-Consul**
- If Consultant (already paying subscription) becomes External Consul in a family
- Family pays: $0 for External Consul seat (would normally be $Y)
- Consultant pays: No additional charge (subscription already covers)
- Platform: No additional revenue, but deepens engagement

**Rule 2: Invited Advisor Can Maintain Seat After Becoming Consultant**
- Original invited relationship continues
- Family keeps paying seat charge ($X or $Y)
- Advisor starts paying Consultant subscription ($Z or $Z_premium)
- Exception: Can convert to Rule 1 if mutually agreed

**100% Payment Model:**
- Consultants receive 100% of service booking revenue
- Platform earns $0 transaction fees
- Revenue only from subscriptions (Family + Consultant)

**Premium Tier B2B2C:**
- Consultant creates and pays for Family Portals
- Families use portals for free ($0)
- Consultant is Portal Admin + External Consul in managed families

---

**Last Updated:** 2025-10-18
**Next Review:** 2026-01-18
**Maintainer:** Product Team
**Status:** Published - Placeholder pricing values, actual pricing TBD
