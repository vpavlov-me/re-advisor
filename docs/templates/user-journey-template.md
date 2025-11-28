---
doc_id: "DOC-JRN-XXX"
title: "<Journey Name>"
type: "user-journey-template"
category: "planning"
audience: "product-manager|business-analyst|stakeholder"
complexity: "intermediate"
created: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
version: "2.0.0"
status: "draft"
tags: ["user-journey", "planning", "family-governance", "<journey-specific-tag>"]
related: []
owner: ""
maintainer: ""
reviewer: ""
priority: "medium"
business_value: "<Brief statement of business value>"
user_impact: "<Brief statement of user impact>"
review_cycle: "quarterly"
next_review: "YYYY-MM-DD"
---

# <JRN-XXX> <Journey Name>

> **Template Purpose**: This template is for planning user journeys BEFORE implementation. It focuses on business logic, user experience, and conceptual requirements without technical implementation details.

---

## 🚨 CRITICAL: Business Requirements Only

**This document describes WHAT the system should do, NOT HOW to implement it.**

**DO NOT include technical implementation details:**
- ❌ API endpoints, HTTP methods, request/response formats
- ❌ Database table names, column names, SQL queries
- ❌ Technology stack specifics (PostgreSQL, Redis, S3, etc.)
- ❌ Port numbers, service names, infrastructure details
- ❌ Authentication tokens (JWT), claims, middleware
- ❌ Code-level details (classes, functions, algorithms)

**DO include business requirements:**
- ✅ User needs and pain points
- ✅ Business rules and logic (WHAT rules, not HOW enforced)
- ✅ Data visibility and access rules (WHO can see WHAT)
- ✅ Integration needs (WHAT systems, not HOW they connect)
- ✅ User experience flow and decisions
- ✅ Success metrics and KPIs

**Example transformation:**
- ❌ Technical: "System validates JWT token and checks 'advisor' role in claims"
- ✅ Business: "User must be logged in with advisor account"

---

## 📋 Context

### Goal
Brief description of what this journey aims to achieve for the user and the family.

**Business Objectives:**
- Primary business goal
- Secondary business goal
- Expected outcome

**User Value:**
- What problem does this solve for users?
- How does this improve their experience?
- What pain point does this address?

### Primary Personas
- **[Persona Name 1]** - Description of role in this journey
- **[Persona Name 2]** - Description of role in this journey
- **[Persona Name 3]** - Description of role in this journey

*Note: Link to actual personas when available, or describe key characteristics here*

### Trigger(s)
What initiates this journey:
- User action (e.g., "Family Council member decides to...")
- Scheduled event (e.g., "Quarterly review period begins")
- System trigger (e.g., "Document approval deadline approaching")
- External event (e.g., "New family member onboarded")

### Preconditions / Assumptions
**What must be true before this journey begins? (Business perspective, NOT technical implementation)**

**User State:**
- User authentication status (e.g., "User must be logged in", NOT "JWT token must be valid")
- Required user permissions/roles (e.g., "User must have Family Council role", NOT "User must have 'council' claim in token")

**Data State:**
- Data that must exist (e.g., "Family profile must be created", NOT "family_id must exist in families table")
- Business entities required (e.g., "At least one family member exists", NOT "users table has rows with family_id")

**System Capabilities:**
- General capabilities needed (e.g., "System must support file uploads", NOT "S3 bucket must be configured")
- External services available (e.g., "Email service operational", NOT "SendGrid API key configured")

**Examples of GOOD preconditions (business-focused):**
- ✅ "User must be logged in with advisor account"
- ✅ "Family subscription must be active"
- ✅ "Email verification service must be available"

**Examples of BAD preconditions (too technical):**
- ❌ "PostgreSQL database with advisor tables operational"
- ❌ "Advisor Portal Service (port 8011) deployed and accessible"
- ❌ "JWT token with advisor role in claims"

## 🗺️ Stage Map

### Stage 1: <Stage Name>
**Goal**: What the user is trying to accomplish in this stage

**User Actions:**
- Step 1.1: User performs specific action
- Step 1.2: User inputs data or makes selection
- Step 1.3: User reviews information

**System Responses:**
> **IMPORTANT**: Describe WHAT the system does (business logic), NOT HOW it does it (technical implementation)

- System validates input (e.g., "System checks email format is valid", NOT "System runs regex pattern validation")
- System enforces business rules (e.g., "System ensures user has sufficient permissions", NOT "System checks JWT claims")
- System provides feedback to user (e.g., "System displays success message", NOT "System returns HTTP 200 with JSON response")
- System updates data (e.g., "System saves profile information", NOT "System executes INSERT query to profiles table")

**Examples of GOOD system responses (business-focused):**
- ✅ "System verifies email address is unique"
- ✅ "System sends verification email to user"
- ✅ "System displays profile completion percentage"

**Examples of BAD system responses (too technical):**
- ❌ "System calls POST /api/advisors/register endpoint"
- ❌ "System stores data in advisor_registry table"
- ❌ "System returns 201 Created with Location header"

**Responsible Roles:**
- Role 1: What they do in this stage
- Role 2: What they do in this stage


---

### Stage 2: <Stage Name>
**Goal**: What the user is trying to accomplish in this stage

**User Actions:**
- Step 2.1: Description
- Step 2.2: Description
- Step 2.3: Description

**System Responses:**
- Validation logic
- Business rule enforcement
- Feedback provided


**Responsible Roles:**
- Role: Action description


---

### Stage 3: <Stage Name>
*(Repeat structure as needed for additional stages)*

---

## 🎯 Conceptual System Requirements

> **IMPORTANT**: This section describes BUSINESS requirements only - what the system needs to do, NOT how it will be implemented technically. Avoid technical specifications like API endpoints, database schemas, or implementation details.

### Integration Needs
**What external systems or services are needed? (Business perspective only)**
- External systems to integrate with (e.g., "Calendar system for scheduling", "Payment processor for subscriptions")
- Third-party services needed (e.g., "Email notification service", "Identity verification service")
- General capabilities required (e.g., "Ability to send transactional emails", "Ability to verify user identity")

### Data Exchange Requirements
**What data needs to move between systems or be exported/imported? (Business perspective only)**
- Import capabilities (e.g., "Import professional profile from LinkedIn", "Import calendar availability")
- Export capabilities (e.g., "Export meeting minutes to PDF", "Export financial reports to Excel")
- Data synchronization needs (e.g., "Keep calendar availability in sync with external calendar")
- **DO NOT include**: API endpoint specifications, request/response formats, technical protocols

## 🔐 Multi-Tenancy & Data Isolation

> **IMPORTANT**: This section describes BUSINESS requirements for data isolation - WHO can see WHAT data. Do NOT include technical implementation details (table names, columns, database specifics).

### Family Data Isolation (CRITICAL)
All data in this journey MUST be isolated by family:

**Key Principles:**
- Users can only see data from their own family
- No cross-family data access at any point in the journey
- Family context maintained throughout all stages
- All operations respect family boundaries

**What This Means for the Journey:**
- When users view data, they see only their family's information
- When users create/edit data, it belongs to their family
- When users search/filter, results are limited to their family
- When users receive notifications, only about their family's activities

**Examples of GOOD data isolation requirements (business-focused):**
- ✅ "Advisors exist in global registry, visible to all families if published to marketplace"
- ✅ "Family members can only view meeting minutes from their own family"
- ✅ "System must track which families are associated with which advisors"

**Examples of BAD data isolation requirements (too technical):**
- ❌ "All queries must include WHERE family_id = ?"
- ❌ "Use family_advisor_associations table with family_id and advisor_id columns"
- ❌ "Enable PostgreSQL Row-Level Security policies on all tables"

## 🔑 Permissions & Access Control

> **IMPORTANT**: This section describes BUSINESS rules for WHO can do WHAT. Avoid technical implementation details (tokens, claims, middleware, database policies).

### Required Permissions by Stage
**What user roles or permissions are needed at each stage?**

**Stage 1:**
- Who can access this stage? (e.g., "Any logged-in user", "Family Council members only")
- What permissions required? (e.g., "User must have 'approve documents' permission")

**Examples of GOOD permission requirements (business-focused):**
- ✅ "User must be logged in with advisor account"
- ✅ "User must have Family Council role to approve decisions"
- ✅ "Advisors can only edit their own profiles"

**Examples of BAD permission requirements (too technical):**
- ❌ "JWT token must contain 'advisor' role in claims"
- ❌ "User ID from token must match advisor_id in database"
- ❌ "Middleware validates role before allowing access"


## 📋 Business Rules & Controls

### Compliance & Governance
- Privacy considerations (e.g., "Contains sensitive family information")
- Data retention requirements (e.g., "Keep for 7 years minimum")
- Audit trail needs (e.g., "Track all changes with timestamp and user")
- Legal requirements

## 🚨 Edge Cases & Risks

### Edge Cases
- Unusual scenarios that might occur
- Error conditions and how to handle
- Boundary conditions (e.g., "What if no data exists?")
- Timeout or unavailability situations

### Operational Risks
- **Data risks**: Data loss, corruption, exposure
- **Permission risks**: Unauthorized access, privilege escalation
- **Performance risks**: Slow response, system overload
- **User experience risks**: Confusion, abandonment, errors


---

**Template Version**: 2.0.0
**Last Updated**: 2025-10-16
**Template Purpose**: Planning user journeys before technical implementation (business requirements only)
**Next Step**: Move to epics once idea is approved
**Key Principle**: Describe WHAT the system should do, NOT HOW to implement it
