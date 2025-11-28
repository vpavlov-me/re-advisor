# User Story: Resource Link Sharing

## 📋 Basic Information

**Story ID:** [Story ID]  
**Story Title:** Resource Link Sharing  
**Epic:** EPIC-022: Template Exchange System (Advisor → Family)  
**Module:** Resources  
**User Story:** As an External Advisor, I want to share Resource links with a family so they can access supplementary materials and professional references  

**Priority:** Low  
**Story Points:** 2  
**Sprint:** [To be determined]  
**Assignee:** [To be assigned]

---

## 👤 User Personas

### Primary Actor: External Advisor

**Role Context:**
- Professional governance consultant engaged with family
- Curates professional references and supplementary materials
- Shares external resources to support family governance work
- Manages knowledge base of valuable external content
- Provides families with access to industry best practices and tools

**Goals:**
- Share external Resource links with families efficiently
- Provide supplementary materials beyond platform content
- Direct families to valuable external content (articles, videos, tools, websites)
- Track which families have access to which resources
- Support family education and governance work

**Pain Points:**
- Manual sharing of links through email or messaging
- No centralized location for shared resources
- Difficulty tracking which families received which links
- Resources scattered across communication channels

### Secondary Actor: Family Council Member

**Role Context:**
- Reviews advisor-shared resources
- Accesses supplementary materials for governance work
- Shares resources with other family members
- Makes decisions about resource relevance

**Goals:**
- Access professional resources shared by advisor
- Reference materials during governance work
- Find shared resources easily when needed
- Share valuable resources with other family members

### Tertiary Actor: Family Member

**Role Context:**
- Accesses shared resources for learning and reference
- Uses supplementary materials for professional development
- References external content as needed

**Goals:**
- Access advisor-shared resources easily
- Reference materials during learning activities
- Open external links to valuable content

---

## 📖 User Story Description

### Story Statement

As an External Advisor, I want to share external Resource links from my Advisor Portal with a family, so that the Resource links appear automatically in the appropriate section on Family Portal, enabling family members to access supplementary materials and professional references.

### Context

External Advisors often need to share supplementary materials that exist outside the ReFamily platform: articles, videos, external tools, websites, industry reports, podcast episodes, and other valuable resources. This story establishes a simple one-way sharing mechanism for external links from Advisor Portal to Family Portal.

Unlike Constitution templates and Learning Paths, Resource sharing is intentionally simple:
- **Links only** - no file uploads, just URLs
- **Immediate availability** - no approval, editing, or activation workflow
- **No assignment mechanism** - resources available to all family members
- **No tracking beyond share count** - no engagement analytics or status tracking

Resources appear in the Knowledge Center or appropriate Resource section on Family Portal, organized by type or category. Sharing is permanent - advisors cannot un-share resources, and families cannot hide or delete them.

### Business Value

**For External Advisors:**
- Efficient mechanism to share external content
- Centralized resource distribution through platform
- Visibility into which families have which resources
- Professional knowledge sharing capability

**For Families:**
- Immediate access to advisor-curated external content
- Centralized repository of professional references
- Easy discovery of supplementary materials
- Organized resource library from trusted advisor

**For ReFamily Platform:**
- Enhanced advisor-family knowledge sharing
- Increased platform value through external content integration
- Simple feature completing template exchange ecosystem
- Foundation for future resource management features

---

## ✅ Acceptance Criteria

### AC-001: Resource Link Selection (Advisor Portal)

**Given** I am an External Advisor logged into Advisor Portal  
**When** I navigate to Resources section  
**Then** I see option to "Share Resource Link"  
**And** I can click "Share Resource Link" button to initiate sharing

### AC-002: Resource Link Information Entry

**Given** I clicked "Share Resource Link" button  
**When** sharing modal opens  
**Then** I see form with fields:
- **Resource Name:** text input (required, max 200 chars)
- **URL:** URL input (required, must be valid URL format)
- **Description:** textarea (optional, max 500 chars)
- **Resource Type:** dropdown (Article, Video, Podcast, Tool, Website, Report, Other)
- **Category:** dropdown (optional: Governance, Finance, Leadership, Succession, etc.)
**And** form validates URL format before allowing submission

### AC-003: Family Selection for Sharing

**Given** I filled in resource link information  
**When** I proceed to family selection step  
**Then** system displays family selection interface  
**And** shows list of families I'm currently engaged with  
**And** each family shows: name, engagement status  
**And** I can select one or multiple families  
**And** I can click "Share Resource" button to confirm

### AC-004: Sharing Confirmation

**Given** I selected families and confirmed sharing  
**When** sharing completes  
**Then** system displays confirmation message: "Resource link '[Name]' successfully shared with [N] families"  
**And** sharing modal closes automatically  
**And** resource added to my shared resources list in Advisor Portal

### AC-005: Resource Link Appearance on Family Portal

**Given** Advisor shared Resource link with my family  
**When** I (Family Council Member or Family Member) log into Family Portal  
**And** I navigate to Knowledge Center or Resources section  
**Then** I see the shared resource in appropriate category  
**And** resource displays:
- Resource name (clickable link)
- "Shared by [Advisor Name]" attribution
- Date shared
- Brief description (if provided)
- Resource type badge/icon
- Category tag (if applicable)
- External link icon indicator

### AC-006: Resource Link Access

**Given** I see advisor-shared Resource link on Family Portal  
**When** I click on resource name or "Open Link" button  
**Then** system opens URL in new browser tab/window  
**And** external content loads from target URL  
**And** I remain logged into ReFamily platform in original tab

### AC-007: Resource Link Metadata Preservation

**Given** Advisor shared Resource link with metadata  
**When** resource appears on Family Portal  
**Then** all metadata preserved:
- Resource name exactly as entered
- URL correct and functional
- Description displayed if provided
- Resource type badge/icon shown correctly
- Category tag applied if provided
- Advisor attribution shown
- Share date recorded

### AC-008: Multiple Resources Support

**Given** Advisor shared multiple different Resource links with family  
**When** I view Resources section on Family Portal  
**Then** I see all shared resources listed  
**And** resources organized by category or type  
**And** resources sorted by share date (newest first, default)  
**And** I can search/filter resources by name, type, or category

### AC-009: Sharing Permanence

**Given** Advisor shared Resource link with family  
**When** any amount of time passes  
**Then** resource remains accessible on Family Portal indefinitely  
**And** Advisor cannot un-share or remove resource  
**And** Family cannot delete or hide resource  
**And** resource link persists until family potentially manually archives (out of scope)

### AC-010: Backend Tracking (Advisor View)

**Given** I shared Resource links with multiple families  
**When** I view my shared resources in Advisor Portal  
**Then** I see list of all shared resources  
**And** each resource shows:
- Resource name and URL
- Resource type
- Number of families shared with (count)
- Date first shared
- "Share with more families" action
**And** I can view which specific families received each resource

### AC-011: Share Notification (Family)

**Given** Advisor shares Resource link with my family  
**When** sharing occurs  
**Then** Family Council Members receive in-platform notification  
**And** notification states: "[Advisor Name] shared resource '[Resource Name]'"  
**And** notification includes resource type and brief description  
**And** notification includes direct link to view resource  
**And** notification marked as unread until interacted with

### AC-012: Universal Access (All Family Members)

**Given** Resource link shared with family  
**When** any Family Member logs into Family Portal  
**Then** they can access the resource  
**And** no role-based restrictions (unlike Constitution activation or Learning Path assignment)  
**And** all family members see same resources  
**And** no per-member permission controls

### AC-013: No Engagement Tracking

**Given** Resource link available on Family Portal  
**When** Family Members access or don't access the resource  
**Then** system does NOT track:
- Who opened the link
- How many times opened
- When last accessed
- Time spent on external site
**And** no engagement analytics beyond initial share

### AC-014: External Link Safety

**Given** Advisor enters URL for Resource link  
**When** form validates URL  
**Then** system checks URL format validity (http:// or https://)  
**And** system allows all valid URLs (no whitelist/blacklist)  
**And** system displays security warning to family if URL is not HTTPS (optional)  
**And** family members warned that link opens external site

---

## 🔄 User Flow

### Main Success Flow

1. **Advisor initiates resource sharing**
   - Advisor logs into Advisor Portal
   - Navigates to Resources section
   - Clicks "Share Resource Link" button
   - Sharing modal opens

2. **Resource information entry**
   - Advisor enters resource name (e.g., "Family Governance Best Practices Article")
   - Advisor enters URL (e.g., "https://example.com/governance-article")
   - Advisor enters description (optional): "Comprehensive overview of governance frameworks for family businesses"
   - Advisor selects resource type: "Article"
   - Advisor selects category: "Governance"
   - Form validates inputs

3. **Family selection**
   - Advisor proceeds to family selection
   - Reviews list of engaged families
   - Selects one or multiple target families
   - Clicks "Share Resource" button

4. **System processing**
   - Backend creates resource sharing records
   - System stores resource metadata
   - Resource added to Family Portal for selected families
   - System updates Advisor Portal share tracking

5. **Family receives resource**
   - Family Council Members receive notification
   - Family members navigate to Resources/Knowledge Center section
   - Resource appears in appropriate category
   - Family members can click link to access external content

6. **Resource access**
   - Family member clicks resource name or "Open Link"
   - New browser tab/window opens
   - External content loads from URL
   - Family member views/reads external content

### Alternative Flows

**AF-001: Invalid URL Format**
- At step 2: Advisor enters invalid URL (e.g., "example.com" without protocol)
- Form displays error: "Please enter valid URL starting with http:// or https://"
- Advisor must correct URL before proceeding

**AF-002: Multiple Resources from Same Advisor**
- Advisor shares Resource A with Family X
- Later, advisor shares Resource B with same Family X
- Both resources appear in Family Portal independently
- No confusion or conflicts

**AF-003: Same Resource, Multiple Families**
- Advisor shares same resource link with 5 different families
- Resource appears independently on each Family Portal
- Each family has separate instance (no shared state)
- Tracking shows "shared with 5 families"

---

## 🎯 Business Rules

### BR-001: One-Way Sharing Direction
- Sharing direction: Advisor → Family only
- No reverse sharing (Family → Advisor)
- No lateral sharing (Family → Family or Advisor → Advisor)

### BR-002: Links Only (No File Uploads)
- Only external URLs accepted (http:// or https://)
- No file upload capability for Resources in this story
- No PDF, DOCX, or other file attachments
- Links to external file hosting services allowed (e.g., Dropbox, Google Drive)

### BR-003: Immediate Availability
- Shared resources immediately available on Family Portal
- No approval or review workflow required
- No editing phase after sharing
- No activation step needed

### BR-004: Sharing Permanence
- Once shared, resource cannot be un-shared by Advisor
- Resource remains on Family Portal indefinitely
- Family cannot delete or hide shared resource
- No expiration date for shared resources

### BR-005: Universal Family Access
- All family members can access shared resources (no role restrictions)
- No per-member permission controls
- Resources visible to Family Council, Family Members, Family Owners equally
- No assignment mechanism (unlike Learning Paths)

### BR-006: No Engagement Tracking
- System does NOT track who accessed resources
- No analytics on resource engagement
- No status tracking (unlike Learning Paths)
- Share count only metric tracked

### BR-007: Backend Relationship Tracking
- System maintains relationship: Resource ↔ Family ↔ Advisor
- Advisor Portal displays which families received each resource
- Family Portal displays source attribution per resource
- Tracking enables basic audit trail

### BR-008: Resource Organization
- Resources organized by type and/or category on Family Portal
- Resources filterable/searchable by metadata
- Default sort: newest first (by share date)
- Families can customize view (out of scope: custom categorization)

### BR-009: External Link Safety
- URL format validated before acceptance
- No URL content validation or scanning (external links assumed safe)
- Warning displayed to users that link opens external site
- Platform not responsible for external content

### BR-010: Notification Requirements
- Family Council Members notified upon resource sharing
- Notification delivered immediately upon share completion
- Notification includes resource name, type, and direct link
- Advisor does NOT receive notifications when family accesses resource

---

## 🎨 UI/UX Requirements

### Advisor Portal: Share Resource Link Modal

**Form Layout:**
- Clear modal title: "Share Resource Link"
- Form fields vertically stacked:
  - Resource Name: text input with character counter (200 max)
  - URL: text input with validation indicator (green checkmark when valid)
  - Description: textarea with character counter (500 max)
  - Resource Type: dropdown with icons per type
  - Category: dropdown (optional field indicator)
- "Next: Select Families" button (primary)
- "Cancel" button (secondary)

**Family Selection Screen:**
- Modal title: "Share with Families"
- List of engaged families with checkboxes
- "Select All" option
- "Share Resource" button (primary)
- "Back" button to return to form

### Advisor Portal: Shared Resources List

**List View:**
- Table or card layout showing all shared resources
- Per resource shows:
  - Resource name (clickable to edit metadata - out of scope for this story)
  - URL (truncated with ellipsis, full URL on hover)
  - Resource type badge/icon
  - Families shared with: [count]
  - Date first shared
- "Share Resource Link" primary action button at top
- Search and filter capabilities

### Family Portal: Resources/Knowledge Center Section

**Resource List View:**
- Grid or list layout organized by category or type
- Per resource card shows:
  - Resource name (bold, clickable)
  - "Shared by [Advisor Name]" subtitle
  - Resource type icon/badge
  - Brief description (truncated with "Read more")
  - Date shared
  - External link icon indicator
  - "Open Link" button (primary)

**Resource Categories/Filters:**
- Sidebar or top navigation with categories:
  - All Resources (default)
  - Articles
  - Videos
  - Podcasts
  - Tools
  - Websites
  - Reports
  - Other
- Filter by advisor (if multiple advisors)
- Sort options: newest first (default), alphabetical, by type

**Resource Detail View (Optional Modal):**
- Full resource name
- Complete description
- Advisor attribution with profile
- Share date
- Resource type and category
- "Open Link" primary button
- Warning text: "This link will open in new window"

### External Link Warning

**When Clicking Resource:**
- Optional: Brief modal/tooltip appears
- Text: "This will open external website [domain] in new tab"
- Checkbox: "Don't show this again" (per session or permanent)
- "Continue" button
- "Cancel" button

### Notifications

**To Family Council (Resource Shared):**
- "[Advisor Name] shared resource '[Resource Name]' ([Type])"
- Brief description preview
- Link: "View resource"
- Icon: appropriate for resource type (article, video, etc.)

---

## 🔌 Integration Points

### Advisor Portal
- Resource sharing form and workflow
- Shared resources list and tracking
- Family engagement tracking system

### Family Portal
- Knowledge Center / Resources section infrastructure
- Resource display and organization system
- Category and type filtering
- Search functionality

### Backend Services
- Resource-Family relationship database
- URL validation service
- Metadata storage
- Notification service
- Audit logging

---

## 📊 Success Metrics

### Adoption Metrics
- Number of resources shared per advisor per month
- Percentage of advisors using resource sharing feature
- Average number of families per resource share action
- Resource sharing growth rate month-over-month

### Content Metrics
- Total resources shared across platform
- Most common resource types (articles vs. videos vs. tools)
- Average resources shared per family
- Resource diversity per advisor

### Distribution Metrics
- Average number of families receiving same resource
- Resources shared with multiple families (reuse rate)
- Unique resources vs. duplicate distributions

### Efficiency Metrics
- Time to share resource (form completion time)
- Reduction in external resource sharing (email, messaging)
- Resource discoverability on Family Portal

---

## 🚫 Out of Scope

The following items are explicitly NOT included in this story:

- File upload capability (only external links)
- Resource engagement tracking (who viewed, when, how long)
- Resource commenting or annotation
- Resource rating or review system
- Resource recommendations or suggestions
- Automatic resource categorization (AI/ML)
- Resource versioning or updates
- Family ability to share resources back to Advisor
- Family ability to share resources among themselves
- Resource collections or playlists
- Resource tagging beyond type and category
- Integration with specific external platforms (YouTube API, etc.)
- Link preview generation (thumbnails, meta descriptions)
- Broken link detection or validation
- Resource analytics dashboard
- Resource expiration or archiving by families

---

## 📝 Notes

### Technical Complexity Drivers (Why 2 SP)

1. **Sharing Form & Workflow** (1 SP)
   - Form creation with validation
   - Family selection interface
   - Confirmation flow

2. **Backend Storage & Display** (1 SP)
   - Resource metadata storage
   - Family Portal display integration
   - Notification dispatch
   - Basic tracking

**Simplicity Factors:**
- No complex workflows (share → available immediately)
- No engagement tracking or analytics
- No editing after sharing
- No approval processes
- Simple data model (resource metadata + relationships)

### Assumptions
- URL validation library available
- Family Portal has Resources/Knowledge Center section infrastructure
- Category taxonomy already defined for platform
- External link opening functionality standard browser behavior
- No need for link preview generation (external services)

### Design Philosophy: Keep It Simple

This story intentionally keeps resource sharing simple:
- **Focus on links only** - files add complexity (storage, security, size limits)
- **No engagement tracking** - avoids privacy concerns and complexity
- **Universal access** - no permission logic needed
- **No editing** - metadata set at share time, permanent
- **Immediate availability** - no workflows or approvals

Future enhancements could add:
- File uploads
- Engagement analytics
- Resource management features
- Advanced categorization
- But these are explicitly out of scope for MVP

### URL Format Examples

**Valid URLs:**
- https://example.com/article
- http://blog.example.com/post/123
- https://www.youtube.com/watch?v=VIDEO_ID
- https://drive.google.com/file/d/FILE_ID
- https://podcasts.apple.com/podcast/id123

**Invalid URLs (will be rejected):**
- example.com (missing protocol)
- www.example.com (missing protocol)
- file:///local/path (local file, not external)

### Questions for Clarification
- [Dependencies section - to be filled later]

### Related Documentation
- EPIC-022: Template Exchange System (Advisor → Family)
- Knowledge Center section specification
- Resource categorization taxonomy
- Platform notification standards

---

**Story Owner:** [To be assigned]  
**Created:** 2025-11-20  
**Last Updated:** 2025-11-20