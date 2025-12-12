# 📧 ReFamily Email Template System

Complete email notification system with **65+ templates** for Family Portal and Advisor Portal, built with Handlebars and Hybrid HTML.

## 📋 Overview

- **Total Email Types:** 65+
- **Family Portal Emails:** 52
- **Advisor Portal Emails:** 13
- **Categories:** 14 (authentication, subscription, billing, meetings, decisions, tasks, etc.)
- **Priority Levels:** 4 (critical, high, normal, low)
- **Email Client Support:** ✅ Gmail, Outlook, Apple Mail, Thunderbird, Yahoo, etc.
- **Dark Mode:** ✅ Supported
- **Mobile Responsive:** ✅ Optimized for all screen sizes

## 🚀 Quick Start

### View Email Showcase

Visit `/emails` in your browser to see the complete showcase:

```bash
npm run dev
# Open http://localhost:3000/emails
```

The showcase includes:
- ✅ All email templates with live preview
- ✅ Desktop & mobile view modes
- ✅ Category filtering and search
- ✅ Priority and portal filters
- ✅ Email metadata and configuration
- ✅ Template variables reference

### Compile Templates

To compile Handlebars templates to HTML:

```bash
node src/emails/compile.js
```

This will:
1. Load all `.hbs` template files from `src/emails/templates/`
2. Register partials (header, footer)
3. Inject sample data
4. Compile to HTML in `src/emails/rendered/`

## 📁 Directory Structure

```
src/emails/
├── catalog.ts              # Email metadata catalog
├── compile.js              # Handlebars compiler script
├── partials/               # Reusable template partials
│   ├── header.hbs         # Email header with logo & styles
│   └── footer.hbs         # Email footer with links
├── templates/              # Handlebars templates
│   ├── F1.1-email-verification.hbs
│   ├── F1.2-email-verified.hbs
│   ├── F2.6-payment-failed.hbs
│   ├── F3.2-advisor-accepted.hbs
│   ├── F4.1-meeting-scheduled.hbs
│   ├── A2.1-family-invitation.hbs
│   └── ... (65+ templates)
└── rendered/               # Compiled HTML output
    ├── F1.1-email-verification.html
    └── ... (auto-generated)
```

## 🎨 Design System

The email templates follow the ReFamily portal design system:

### Colors

- **Primary Blue:** `#4A90E2` (buttons, links, brand)
- **Secondary Blue:** `#357ABD` (button hover, accents)
- **Success Green:** `#10B981` (confirmations, success states)
- **Warning Orange:** `#F59E0B` (warnings, attention)
- **Danger Red:** `#DC3545` (errors, critical alerts)
- **Text Dark:** `#252525` (headings, primary text)
- **Text Muted:** `#5C5C5C` (body text)
- **Background:** `#F5FAFF` (email background)

### Typography

- **Font Family:** 'PP Object Sans', system fonts
- **Base Size:** 14px
- **Line Height:** 1.5
- **Heading Sizes:** 24px (h1), 18px (h2)

### Components

- **Buttons:** Rounded 8px, 14px padding, bold text
- **Cards:** Gray background, 8px border radius
- **Info Boxes:** Left border accent, contextual colors
- **Badges:** Rounded 12px, uppercase, small text

## 📝 Creating New Templates

### 1. Create Template File

Create a new `.hbs` file in `src/emails/templates/`:

```handlebars
{{> header subject="Your Subject Line" is_advisor=false}}

<h1>Email Title</h1>

<p class="lead-text">
  Introduction paragraph with {{variable}}.
</p>

<div class="card">
  <div class="card-title">Card Title</div>
  <div class="card-content">
    Card content here.
  </div>
</div>

<div class="button-center">
  <a href="{{cta_url}}" class="button">Call to Action</a>
</div>

{{> footer user_email=user_email is_critical=false current_year=current_year portal_url=portal_url support_url=support_url}}
```

### 2. Add to Catalog

Update `src/emails/catalog.ts`:

```typescript
export const EMAIL_CATALOG: Record<string, EmailTemplate> = {
  // ... existing templates
  'F99.1': {
    id: 'F99.1',
    portal: 'family',
    category: 'your-category',
    trigger: 'Event that triggers this email',
    recipient: 'Who receives it',
    subject: 'Email subject line',
    keyContent: 'Brief description of content',
    cta: 'Button text',
    priority: 'normal',
    canOptOut: true,
    templateFile: 'F99.1-your-template.hbs'
  },
};
```

### 3. Add Sample Data

Update `src/emails/compile.js`:

```javascript
const SAMPLE_DATA = {
  // ... existing data
  'F99.1-your-template': {
    variable: 'Sample value',
    cta_url: 'https://my.refamily.com/action',
    // ... more sample data
  },
};
```

### 4. Compile & Test

```bash
node src/emails/compile.js
# View at http://localhost:3000/emails
```

## 🎯 Available Components

### Headers

```handlebars
<h1>Main Heading (24px)</h1>
<h2>Secondary Heading (18px)</h2>
<p class="lead-text">Large intro text (16px)</p>
```

### Buttons

```handlebars
<div class="button-center">
  <a href="{{url}}" class="button">Primary Button</a>
  <a href="{{url}}" class="button button-secondary">Secondary</a>
  <a href="{{url}}" class="button button-success">Success</a>
  <a href="{{url}}" class="button button-danger">Danger</a>
</div>
```

### Cards

```handlebars
<div class="card">
  <div class="card-title">Card Title</div>
  <div class="card-content">
    <p>Card content with information.</p>
  </div>
</div>
```

### Info Boxes

```handlebars
<div class="info-box"><!-- Default (blue) -->
<div class="info-box info-box-success"><!-- Green -->
<div class="info-box info-box-warning"><!-- Yellow -->
<div class="info-box info-box-danger"><!-- Red -->
  <p>Important information here.</p>
</div>
```

### Badges

```handlebars
<span class="badge badge-critical">Critical</span>
<span class="badge badge-high">High</span>
<span class="badge badge-normal">Normal</span>
<span class="badge badge-success">Success</span>
```

### Lists

```handlebars
<ul>
  <li>Unordered list item</li>
  <li>Another item</li>
</ul>

<ol>
  <li>Ordered list item</li>
  <li>Second item</li>
</ol>
```

### Dividers

```handlebars
<hr class="divider">
```

## 🔄 Handlebars Helpers

### Built-in Helpers

```handlebars
{{!-- Conditionals --}}
{{#if variable}}
  Content if true
{{else}}
  Content if false
{{/if}}

{{!-- Negation --}}
{{#unless variable}}
  Content if false
{{/unless}}

{{!-- Loops --}}
{{#each items}}
  <li>{{this}}</li>
{{/each}}

{{!-- Objects --}}
{{#each items}}
  <li>{{this.name}}: {{this.value}}</li>
{{/each}}
```

### Custom Helpers

```handlebars
{{!-- Concatenate strings --}}
{{concat "Hello " user_name "!"}}
```

## 📧 Email Categories

### Family Portal (F)

1. **Authentication (F1.x)** - Login, verification, password reset
2. **Subscription (F2.x)** - Billing, payments, invoices
3. **Advisors (F3.x)** - Advisor invitations and management
4. **Meetings (F4.x)** - Meeting scheduling and reminders
5. **Communication (F5.x)** - Messages and announcements
6. **Decisions (F6.x)** - Voting and proposals
7. **Tasks (F7.x)** - Task assignments and reminders
8. **Education (F8.x)** - Courses and certifications
9. **Succession (F9.x)** - Succession planning
10. **Conflict (F10.x)** - Conflict resolution
11. **Constitution (F11.x)** - Governance documents
12. **Assets (F12.x)** - Asset management
13. **Philanthropy (F13.x)** - Grant management
14. **System (F14.x)** - System updates and notifications

### Advisor Portal (A)

1. **Authentication (A1.x)** - Advisor login and verification
2. **Family Association (A2.x)** - Family invitations
3. **Multi-Family Dashboard (A3.x)** - Cross-family updates
4. **System (A4.x)** - System notifications

## 🎨 Email Client Testing

Templates are tested and optimized for:

- ✅ **Gmail** (Desktop, Mobile, Dark Mode)
- ✅ **Outlook** (Windows, Mac, Web, 365)
- ✅ **Apple Mail** (macOS, iOS)
- ✅ **Thunderbird**
- ✅ **Yahoo Mail**
- ✅ **Samsung Email**
- ✅ **Spark**

### Testing Checklist

- [ ] Desktop view (600px width)
- [ ] Mobile view (320px+ width)
- [ ] Dark mode support
- [ ] Links work correctly
- [ ] Images load (if any)
- [ ] Buttons render properly
- [ ] Text is readable
- [ ] Layout doesn't break

## 🚀 Deployment

### Production Build

```bash
# Compile all templates
node src/emails/compile.js

# Rendered HTML files are in src/emails/rendered/
```

### Integration with Email Service

```typescript
import { EMAIL_CATALOG, getEmailTemplate } from '@/emails/catalog';

// Get template metadata
const template = getEmailTemplate('F1.1');

// In your email service
async function sendEmail(templateId: string, data: Record<string, any>) {
  const template = getEmailTemplate(templateId);
  
  // Option 1: Use pre-compiled HTML
  const html = fs.readFileSync(
    `src/emails/rendered/${template.templateFile.replace('.hbs', '.html')}`,
    'utf8'
  );
  
  // Option 2: Compile dynamically with Handlebars
  const source = fs.readFileSync(
    `src/emails/templates/${template.templateFile}`,
    'utf8'
  );
  const compiledTemplate = Handlebars.compile(source);
  const html = compiledTemplate(data);
  
  // Send via your email provider
  await emailProvider.send({
    to: data.user_email,
    subject: template.subject,
    html: html,
  });
}
```

## 📊 Email Statistics

Current template count by category:

- **Authentication:** 9 templates
- **Subscription:** 13 templates
- **Advisors:** 8 templates
- **Meetings:** 10 templates
- **Communication:** 6 templates
- **Decisions:** 9 templates
- **Tasks:** 9 templates
- **Education:** 9 templates
- **Total:** 65+ templates

## 🔒 Security & Privacy

- ✅ No external images (prevents tracking pixels)
- ✅ No external scripts
- ✅ No external stylesheets
- ✅ Inline CSS only
- ✅ HTTPS links only
- ✅ Unsubscribe links where required
- ✅ Privacy-compliant headers

## 📚 Resources

- [Handlebars Documentation](https://handlebarsjs.com/)
- [Email on Acid - Email Testing](https://www.emailonacid.com/)
- [Can I email...](https://www.caniemail.com/) - CSS support reference
- [Really Good Emails](https://reallygoodemails.com/) - Inspiration

## 🆘 Support

For questions or issues:

- 📧 Email: support@refamily.com
- 📖 Documentation: [docs.refamily.com](https://docs.refamily.com)
- 🐛 Issues: GitHub Issues

---

**Last Updated:** December 11, 2025  
**Version:** 1.0.0  
**Maintained by:** ReFamily Engineering Team
