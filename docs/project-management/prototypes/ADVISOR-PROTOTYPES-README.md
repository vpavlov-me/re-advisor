# 🎨 Advisor Portal Prototypes - Service Request Management

> **Interactive HTML prototypes** of Advisor Portal interface for managing Service Requests with families.

---

## 📋 Overview

This folder contains **interactive prototypes** demonstrating the Advisor Portal side of the Service Request lifecycle, complementing the Family Portal prototypes created earlier.

**Design Philosophy:** These prototypes follow the established Reluna Advisor Portal design system from [`advisor-portal-families-first-contact.html`](./advisor-portal-families-first-contact.html), ensuring consistency across the platform.

---

## 📁 Prototype Files

### 1. My Services Dashboard
**File:** [`advisor-portal-my-services-dashboard.html`](./advisor-portal-my-services-dashboard.html)

#### What it shows:
- ✅ Dashboard with all service requests (Active, Upcoming, Completed tabs)
- ✅ Service cards with status indicators
- ✅ Pending booking confirmation flow
- ✅ Progress tracking for active services
- ✅ Payment information (received/due)
- ✅ Quick actions for each service
- ✅ Filtering and sorting options

#### Key Features:
- **3 Service Cards** demonstrating different states:
  1. **In Progress** - Active service with 60% completion
  2. **Pending** - New booking awaiting confirmation (48h window)
  3. **Delivered** - Completed service awaiting family confirmation

#### Interactive Elements:
- Tab switching (Active/Upcoming/Completed/All)
- Filter dropdowns (Family, Service Type, Sort)
- Action buttons (View Details, Update Status, Upload Deliverable, Chat)
- Confirmation modal for accepting bookings
- Notifications badge

---

### 2. Service Request Detail View
**File:** [`advisor-portal-service-detail-view.html`](./advisor-portal-service-detail-view.html)

#### What it shows:
- ✅ Comprehensive service information
- ✅ Progress timeline with visualization
- ✅ Deliverables checklist
- ✅ Shared deliverables list
- ✅ Activity history timeline
- ✅ Sidebar with quick actions
- ✅ Payment tracking
- ✅ Module access information

#### Key Sections:

**Main Content:**
1. **Service Details**
   - Description
   - Deliverables checklist (5 items, 2 completed)
   - Custom notes from family

2. **Shared Deliverables**
   - List of documents shared with family
   - Upload new deliverable button

3. **Activity History**
   - Chronological timeline of all events
   - Icons for different event types

**Sidebar:**
1. **Quick Actions**
   - Mark as Delivered
   - Update Progress
   - Share Deliverable
   - Send Message

2. **Payment Info**
   - Total, Received (prepay), Balance due
   - Info box about final payment

3. **Your Access**
   - List of modules with permission levels
   - Access period dates
   - Link to family portal

4. **Timeline**
   - Key dates (Booked, Started, Due, Duration, Remaining)

#### Interactive Elements:
- Back navigation link
- Animated progress bar
- Clickable deliverable items
- Mark as Delivered modal
- All action buttons functional (alerts for demo)

---

## 🎨 Design System

### Matching Existing Portal Design

These prototypes follow the design language established in `advisor-portal-families-first-contact.html`:

#### Colors:
```css
Primary Blue:      #0066cc (gradient to #0052a3)
Success Green:     #34c759 (gradient to #30d158)
Warning Yellow:    #ff9500
Background:        #f5f5f7
Card Background:   white
Text Primary:      #1d1d1f
Text Secondary:    #86868b
Border:            #d2d2d7
```

#### Typography:
- **Font Family:** -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto
- **Page Title:** 40px, weight 700
- **Card Title:** 18px, weight 600
- **Body Text:** 14px
- **Meta Text:** 13px

#### Components:
- **Status Badges:** Pills with dot indicator, uppercase
- **Buttons:** 8px border-radius, gradient backgrounds
- **Cards:** 12px border-radius, subtle shadow
- **Progress Bars:** 6-8px height, gradient fill

---

## 🔄 User Flow Coverage

### Covered Scenarios:

#### ✅ Service Discovery & Acceptance
- [x] View new booking requests
- [x] Review service details and requirements
- [x] Confirm or decline bookings
- [x] 48-hour confirmation window tracking

#### ✅ Service Delivery
- [x] Track active services
- [x] Monitor progress and deadlines
- [x] Update service status
- [x] Upload/share deliverables
- [x] Communicate with families via chat

#### ✅ Service Completion
- [x] Mark service as delivered
- [x] Wait for family confirmation
- [x] Track payment status
- [x] View completion timeline

#### ✅ Service Management
- [x] Filter and sort services
- [x] View payment information
- [x] Monitor module access
- [x] Review activity history

---

## 📊 Service Request Statuses (Advisor View)

| Status | Badge Color | Description | Available Actions |
|--------|-------------|-------------|-------------------|
| **Pending** | 🟡 Yellow | Awaiting advisor confirmation (48h window) | Confirm / Decline / Contact |
| **Accepted** | 🔵 Blue | Confirmed, awaiting payment | View / Contact |
| **In Progress** | 🟢 Green | Active service delivery | Update Status / Upload / Chat |
| **Delivered** | 🔵 Blue | Completed, awaiting family confirmation | View / Follow Up |
| **Completed** | ⚫ Gray | Family confirmed, service closed | View History |

---

## 💡 Key Differences from Family Portal

### Advisor Portal Specific Features:

1. **Booking Confirmation Flow**
   - Advisors must explicitly accept/decline within 48h
   - Auto-cancel after timeout
   - Can provide decline reason

2. **Progress Updates**
   - Advisors can update progress percentage
   - Mark milestones as complete
   - Share deliverables proactively

3. **Payment Tracking**
   - Shows received amounts (prepay)
   - Tracks balance due on completion
   - Final payment released upon family confirmation

4. **Module Access Management**
   - Displays granted access levels
   - Shows access expiration
   - Direct link to family portal

5. **Multi-Family Management**
   - Dashboard shows services across all families
   - Filters by family name
   - Service ID format includes family ID

---

## 🚀 How to Use Prototypes

### Local Testing:
```bash
cd project-management/prototypes/
open advisor-portal-my-services-dashboard.html
```

### Demo Flow:
1. **Start with Dashboard** - Show overview of all services
2. **Click "Pending" card** - Demonstrate booking confirmation
3. **Click "In Progress" card** - Show detailed service view
4. **Explore Quick Actions** - Upload deliverable, update progress
5. **Show "Delivered" state** - Waiting for family confirmation

### Interactive Elements:
- All buttons trigger alerts explaining functionality
- Tabs and filters work dynamically
- Modals demonstrate confirmation flows
- Progress bars animate on page load

---

## 📝 Implementation Notes

### Technical Details:

#### Responsive Layout:
- Main dashboard: Single column grid
- Detail view: 2-column layout (main content + sidebar)
- Sidebar: Sticky positioning (top: 88px)

#### Animations:
- Progress bar: 0.5s ease transition
- Buttons: Transform on hover (-1px translateY)
- Cards: Shadow increase on hover

#### State Management:
- Tabs: Active class toggling
- Modals: Overlay with active class
- Filters: Dropdown selections (placeholder functionality)

#### Accessibility:
- Semantic HTML structure
- Keyboard navigation (ESC closes modals)
- ARIA labels would be added in production
- Focus indicators on interactive elements

---

## 🔗 Related Files

**Family Portal Prototypes:**
- Located in: `project-management/draft/Advisor/UJ-Service-Request-Family-Advisor/`
- `prototype-family-services-dashboard.html`
- `prototype-direct-booking-flow.html`
- `prototype-service-request-detail.html`

**Documentation:**
- [`EPIC-013A`](../draft/Advisor/UJ-Service-Request-Family-Advisor/epic-013-service-request-lifecycle-consultant.md) - Consultant lifecycle
- [`EPIC-013F`](../draft/Advisor/UJ-Service-Request-Family-Advisor/epic-013-service-request-tracking-family.md) - Family tracking
- [`user-journey-consultant-marketplace.md`](../draft/Advisor/UJ-Service-Request-Family-Advisor/user-journey-consultant-marketplace.md)

---

## ✅ Testing Checklist

### Dashboard Testing:
- [ ] All tabs switch correctly (Active/Upcoming/Completed/All)
- [ ] Filters display dropdown options
- [ ] Service cards display correct status badges
- [ ] Progress bars animate on load
- [ ] Payment information displays correctly
- [ ] "Confirm Booking" button opens modal
- [ ] Modal can be closed with Cancel or ESC
- [ ] Success confirmation shows next steps

### Detail View Testing:
- [ ] Back link navigation
- [ ] Progress timeline animates
- [ ] Deliverables checklist shows completed/pending states
- [ ] Shared deliverables are clickable
- [ ] Activity history displays chronologically
- [ ] All Quick Action buttons work
- [ ] Payment breakdown is accurate
- [ ] Module access list displays
- [ ] Timeline dates are correct
- [ ] "Mark as Delivered" modal functions

---

## 🎯 Next Steps (Future Enhancements)

### Not in Current Prototypes:
1. **Real-time Updates** - WebSocket integration for live status
2. **Calendar Integration** - Sync with advisor's calendar
3. **Batch Actions** - Update multiple services at once
4. **Analytics Dashboard** - Performance metrics
5. **Template Messages** - Pre-written responses for families
6. **Document Collaboration** - Real-time editing
7. **Video Call Integration** - Embedded meeting links
8. **Automated Reminders** - Deadline notifications

---

## 📖 Comparison: Family vs Advisor Prototypes

| Feature | Family Portal | Advisor Portal |
|---------|---------------|----------------|
| **Service Cards** | Focus on timeline & deadlines | Focus on actions & next steps |
| **Payment View** | What they owe/paid | What they'll receive |
| **Progress** | Monitoring consultant work | Updating own progress |
| **Deliverables** | Receiving & reviewing | Sharing & uploading |
| **Status Control** | Confirm completion only | Update throughout lifecycle |
| **Access Info** | What consultant can see | What they can access |
| **Primary CTA** | "Confirm Completion" | "Mark as Delivered" |

---

## 🎨 Design Consistency

Both Advisor and Family prototypes maintain:
- ✅ Similar card structures
- ✅ Consistent color coding for statuses
- ✅ Matching typography scale
- ✅ Aligned spacing and padding
- ✅ Comparable button styles
- ✅ Unified modal patterns

**Key Difference:** Advisor Portal uses the established Reluna design system (blue gradients, specific fonts), while Family Portal could use a different theme if desired.

---

## 📞 Support & Questions

For questions about these prototypes:
- Check related EPICs (EPIC-013A, EPIC-013F)
- Review user journey documentation
- Compare with Family Portal prototypes
- Reference design system in existing portal

---

**Created:** 2025-10-24
**Version:** 1.0
**Status:** Ready for Review
**Design System:** Reluna Advisor Portal v2
**Compatibility:** Works with Family Portal prototypes

---

💡 **Tip:** Open both Advisor and Family portal prototypes side-by-side to see the complete Service Request flow from both perspectives!
