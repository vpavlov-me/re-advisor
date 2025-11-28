---
epic_id: "EPIC-008"
title: "Consultant Availability Calendar & Scheduling System"
status: "draft"
priority: "high"
start_date: ""
target_date: ""
owner: "@anastasiabronina"
stakeholders: ["product-team", "consultants", "families"]
parent_initiative: "Marketplace Platform"
related_epics: ["EPIC-007", "DOC-JRN-FAM-002"]
---

# Epic: Consultant Availability Calendar & Scheduling System

> **Note:** This is an Epic for the FG project. This document defines the scope, user stories, and requirements for enabling consultants to manage their availability through a comprehensive calendar system.

---

## 📋 Basic Information

**Issue Type:** Epic
**Project:** FG
**Epic Name:** Consultant Availability Calendar & Scheduling System
**Summary:** Enable consultants to manage their availability through internal calendar with external sync capabilities, supporting recurring schedules and family-specific reservations
**Parent User Journey:** [Family Marketplace Service Booking Journey](../user-journey-family-marketplace-service-booking.md)
**Parent Initiative:** Marketplace Platform Enhancement
**Priority:** High
**Epic Link:** EPIC-008

---

## 🎯 Epic Goal

**What will this Epic deliver?**

Complete availability management system enabling consultants to define when they're available for bookings, sync with external calendars, and manage their time across multiple family engagements.

**User-facing value (what users can do after this Epic):**
- Set recurring weekly availability patterns (e.g., "Available Mon-Fri 9am-5pm")
- Block specific dates/times for vacations or other commitments
- Reserve time slots for specific families (for ongoing engagements)
- Sync availability with external calendars (Google, Outlook) bi-directionally
- View consolidated calendar showing all bookings and availability
- Configure buffer time between appointments
- Set minimum notice period for bookings (24h, 48h, 1 week)
- Define service-specific duration requirements

**Business value (how business benefits):**
- Reduce booking conflicts and double-bookings to near zero
- Increase consultant utilization through better visibility
- Minimize cancellations due to scheduling conflicts
- Enable consultants to serve multiple families efficiently
- Reduce support tickets related to scheduling issues

**Scope boundaries:**

✅ **INCLUDED:**
- Internal calendar system with visual month/week/day views
- Recurring availability rules (weekly patterns)
- One-time availability blocks (specific dates)
- External calendar sync (Google Calendar, Outlook)
- Conflict detection and prevention
- Time zone handling (consultant and family zones)
- Buffer time configuration between appointments
- Minimum notice period settings
- Service-specific duration mapping
- Family-specific time reservations
- Availability preview for families during booking

❌ **NOT INCLUDED:**
- Video conferencing integration (separate epic)
- Automated scheduling AI (future enhancement)
- Group scheduling for multiple consultants
- Resource booking (rooms, equipment)
- Calendar sharing between consultants
- Waitlist management for fully booked consultants
- SMS reminders (only email and in-app notifications)
- Calendar analytics and reporting

---

## 👥 Target Users

**Who will use this feature?**

- **Primary Personas:** 
  - **Consultant** - Needs to manage availability across multiple families efficiently
  - Reference: `consultant-persona.md` (DOC-USR-006)
  
- **Secondary Personas:**
  - **Family Admin/Council** - Needs to see consultant availability when booking
  - Reference: `family-council-member-persona.md` (DOC-USR-002)
  - **Platform Administrator** - May need to troubleshoot scheduling issues

---

## 📖 User Stories (High-Level)

**Main scenarios this Epic will enable:**

1. **As a** Consultant, **I want to** set my regular weekly availability pattern, **so that** families know when they can typically book my services

2. **As a** Consultant, **I want to** sync my external calendar, **so that** my availability automatically reflects my other commitments

3. **As a** Consultant, **I want to** block specific dates for vacation, **so that** families cannot book me when I'm unavailable

4. **As a** Consultant, **I want to** reserve recurring time slots for specific families, **so that** I can maintain regular engagement schedules

5. **As a** Consultant, **I want to** set buffer time between appointments, **so that** I have time to prepare and avoid back-to-back sessions

6. **As a** Family Admin, **I want to** see consultant's real-time availability, **so that** I can book services at convenient times

7. **As a** Consultant, **I want to** configure different durations for different service types, **so that** workshops book 4-hour slots while consultations book 1-hour slots

8. **As a** Consultant, **I want to** set my time zone, **so that** all bookings display correctly regardless of family location

---

## 🔗 Dependencies & Risks

### Dependencies (Blockers)

**Upstream (must be completed before this Epic can start):**
- **EPIC-003**: Basic Advisor Registration & Profile (consultant account must exist)
- **EPIC-007**: Stripe Connect Payment Setup (for booking confirmations)
- **Service Catalog Epic**: Services must have duration requirements defined

**Downstream (depends on this Epic):**
- Service booking flow requires calendar availability
- Automated reminders need calendar data
- Consultant analytics will use calendar utilization
- Invoice generation depends on confirmed bookings

**External Dependencies:**
- Google Calendar API access and quotas
- Microsoft Graph API for Outlook integration
- Calendar service uptime and reliability
- OAuth 2.0 authentication for calendar services

### Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| External calendar sync failures | High | Fallback to manual availability, retry logic with exponential backoff, error notifications to consultant |
| Time zone confusion causing missed appointments | High | Clear TZ display on all screens, automatic detection with confirmation, all times stored in UTC |
| Double-booking race conditions | Critical | Pessimistic locking on booking creation, real-time availability updates, transaction isolation |
| Calendar API rate limits exceeded | Medium | Caching of availability data, batch sync operations, graceful degradation to manual mode |
| Complex recurring rules difficult to understand | Medium | Simplified UI with common patterns as templates, visual preview of rules, help documentation |
| External calendar changes not reflected quickly | High | Webhook subscriptions for real-time updates, periodic sync as fallback, conflict notifications |

---

## 🎨 Design & UX

**Figma Links:**
- Calendar configuration interface *(to be added)*
- Availability rules builder *(to be added)*
- Family booking calendar view *(to be added)*
- Time zone selector *(to be added)*
- Sync status dashboard *(to be added)*

**UX Notes:**

**Calendar Configuration Flow:**
1. Consultant navigates to "Availability Settings" in consultant portal
2. Sets base weekly schedule using visual grid:
   - Drag to select time blocks
   - Click to toggle available/busy
   - Different colors for different availability types
3. Optionally connects external calendar:
   - OAuth flow for Google/Outlook
   - Select which calendars to sync
   - Choose sync direction (one-way or bi-directional)
4. Configures service-specific rules:
   - Maps each service to required duration
   - Sets buffer time preferences
5. Reviews consolidated view showing all rules
6. Saves configuration

**Key UI Components:**
- **Weekly Grid View**: Visual time blocks for setting recurring availability
- **Monthly Calendar**: For one-time blocks and overview
- **Availability Toggle**: Quick switch between "Available", "Busy", "Tentative"
- **Sync Status Widget**: Shows last sync time, errors, next sync
- **Conflict Warning Banner**: Appears when conflicts detected
- **Time Zone Display**: Always visible, with option to change
- **Family Reservation Tags**: Visual indicators for reserved slots

**Mobile Considerations:**
- Responsive calendar that works on tablets
- Simplified mobile view for quick availability checks
- Touch-friendly time slot selection
- Mobile app notifications for booking changes

---

## 🧮 Business Rules

### Availability Rules

**Recurring Weekly Patterns:**
- Weekly patterns repeat indefinitely until modified
- Can set different patterns for different weeks of month
- Minimum slot duration: 30 minutes
- Maximum continuous availability: 8 hours per day
- Patterns can have exceptions (holidays, vacations)

**Time Block States:**
- **Available**: Open for any family to book
- **Busy**: No bookings allowed
- **Tentative**: Requires consultant confirmation before booking
- **Reserved**: Held for specific family (visible only to that family)

**External Calendar Sync:**
- Bi-directional sync every 5 minutes (configurable)
- External "Busy" events block availability in platform
- Platform bookings create "Busy" events in external calendar
- Sync conflicts resolution:
  - External calendar takes precedence (conservative approach)
  - Consultant notified of conflicts requiring manual resolution
- All-day events in external calendar block entire day
- Tentative events in external calendar create "Tentative" blocks

**Service-Specific Duration Rules:**
- Each service type defines required duration:
  - Consultation: 30 min, 60 min, 90 min options
  - Workshop: 4-hour minimum blocks
  - Mediation: 2-hour minimum blocks
  - Full-day engagement: 6-8 hour blocks
- System validates availability against service duration requirements
- Service can span multiple days if needed

**Buffer Time Configuration:**
- Options: 0, 15, 30, 45, 60 minutes
- Applies between all bookings
- Not required for first/last appointment of day
- Can be overridden for specific bookings

**Minimum Notice Period:**
- Platform minimum: 24 hours
- Consultant can set longer: 48h, 72h, 1 week, 2 weeks
- Applies to all services uniformly
- Measured from current time to appointment start
- Can be waived by consultant for specific bookings

**Family-Specific Reservations:**
- Can reserve recurring slots for specific families
- Reserved slots hidden from other families
- Requires active service engagement to maintain
- Automatically released when service ends
- Family can see their reserved slots highlighted
- Maximum 40% of total availability can be reserved

### Conflict Resolution

**Booking Conflict Prevention:**
- Real-time availability check during booking
- Optimistic UI with backend validation
- If conflict detected, show next 3 available slots
- No overbooking allowed (hard constraint)

**Sync Conflict Resolution:**
- External calendar takes precedence for busy times
- Platform bookings protected from external changes
- Consultant notified of conflicts via email and in-app
- Pending bookings may need rescheduling
- Grace period of 24 hours to resolve conflicts

**Time Zone Handling:**
- All times stored in UTC internally
- Display in consultant's local time zone
- Families see availability in their local time zone
- Booking confirmations show both time zones
- Daylight saving time changes handled automatically

### Data Validation

**Calendar Entry Validation:**
- Start time must be before end time
- Minimum duration: 30 minutes
- Maximum duration: 24 hours
- No overlapping time blocks
- Times must be on 15-minute boundaries

**Sync Validation:**
- OAuth tokens must be valid
- Calendar permissions must include read/write
- External calendar must be accessible
- Sync frequency minimum: 5 minutes

---

## 📅 Estimated Timeline

### Phase 1: Core Calendar System (3 weeks)
**Sprint 46 (Weeks 1-3)**
- Design and implement calendar data model
- Build calendar UI components (week/month/day views)
- Implement weekly recurring patterns logic
- Add one-time availability blocks
- Implement time zone handling throughout
- Create availability preview for families

**Deliverables:**
- Working internal calendar with basic availability management
- Time zone support across all interfaces
- Basic conflict detection

### Phase 2: External Calendar Integration (2 weeks)
**Sprint 47 (Weeks 4-5)**
- Implement Google Calendar OAuth flow
- Build Google Calendar sync service
- Implement Outlook/Microsoft Graph OAuth flow
- Build Outlook sync service
- Create conflict detection algorithm
- Implement sync status monitoring and error handling
- Add webhook subscriptions for real-time updates

**Deliverables:**
- Bi-directional calendar sync with Google and Outlook
- Real-time conflict notifications
- Sync status dashboard

### Phase 3: Advanced Configuration (2 weeks)
**Sprint 48 (Weeks 6-7)**
- Implement service-specific duration mapping
- Build buffer time configuration
- Add family-specific reservation system
- Implement minimum notice period settings
- Create availability templates for common patterns
- Add vacation/holiday management

**Deliverables:**
- Complete configuration options for consultants
- Family reservation system
- Service-duration validation

### Phase 4: Testing & Polish (1 week)
**Sprint 48 (Week 8)**
- End-to-end testing of booking flows
- Performance optimization for calendar queries
- UI refinements based on testing feedback
- Documentation for consultants and families
- Load testing for concurrent bookings
- Time zone edge case testing

**Deliverables:**
- Production-ready calendar system
- User documentation
- Performance benchmarks met

**Total Duration:** 8 weeks
**Target Release:** End of Sprint 48

---

## 📝 Notes

### Best Practices Applied

**Calendar Sync Best Practices:**
- Use webhook subscriptions where available for real-time updates
- Implement exponential backoff for failed sync attempts
- Cache availability data with 5-minute TTL
- Batch sync operations to respect API rate limits
- Store minimal data from external calendars (only free/busy)

**Booking Integrity:**
- Use database transactions for all booking operations
- Implement optimistic locking for availability updates
- Validate availability at multiple checkpoints
- Create audit log for all booking changes

**Performance Optimization:**
- Index availability queries by consultant, date range
- Pre-calculate availability slots for next 30 days
- Use Redis cache for frequently accessed availability
- Paginate calendar views (show 1 month at a time)

**Security Considerations:**
- OAuth tokens encrypted at rest
- Refresh tokens stored separately from access tokens
- No storage of external calendar event details
- Rate limiting on availability queries
- Audit logs for all configuration changes

### Data Retention

**Calendar Data:**
- Active availability rules: Retained while consultant active
- Historical bookings: 7 years (financial compliance)
- Sync logs: 90 days
- Availability snapshots: 1 year
- Deleted consultant calendars: Archived for 1 year

### Internationalization

**Time Zone Support:**
- Support all IANA time zones
- Display time zone abbreviations clearly
- Handle daylight saving time transitions
- Show warnings for bookings near DST changes
- Allow consultants to set display preferences

### Future Enhancements (Backlog)

- AI-powered optimal scheduling suggestions
- Group scheduling for workshops with multiple families
- Calendar analytics dashboard (utilization, patterns, trends)
- Automated rescheduling suggestions for conflicts
- Integration with Zoom/Teams for virtual meetings
- Smart availability based on consultant preferences
- Waitlist management for high-demand consultants
- Calendar sharing between team consultants
- Recurring booking series (e.g., weekly sessions)
- Calendar templates for different service types

### Success Criteria

- ✅ Consultant can set and modify recurring availability
- ✅ External calendar sync works bi-directionally
- ✅ No double-bookings occur (0% rate)
- ✅ Time zones display correctly for all users
- ✅ Families can see real-time availability
- ✅ Buffer time enforced between appointments
- ✅ Service durations validated against availability
- ✅ Family-specific reservations working
- ✅ Sync conflicts detected and reported
- ✅ Performance: Calendar loads in <2 seconds

---

**Epic Version:** 1.0.0
**Last Updated:** 2025-10-24
**Status:** Draft
**Next Steps:** Technical design review, story breakdown, sprint planning