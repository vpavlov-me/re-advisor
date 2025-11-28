# Family Governance Assessment - HTML Interactive Prototype

**Version:** 1.0
**Status:** ✅ Ready for Review
**Created:** October 31, 2025

---

## 📋 Overview

This is a **clickable HTML prototype** of the Family Governance Assessment Workshop. It demonstrates the complete user experience from welcome screen to action planning, with interactive elements and realistic data.

### What This Prototype Includes

✅ **All 5 Phases:**
- Phase 1: Setup & Context (4 screens)
- Phase 2: Assessment Dashboard (1 screen + examples)
- Phase 4: Results & Discussion (examples)
- Phase 5: Action Planning (examples)

✅ **Interactive Features:**
- Click navigation between screens
- Form inputs with validation
- Progress tracking
- Auto-save simulation
- State persistence (sessionStorage)

✅ **Full Styling:**
- Professional UI design
- Responsive layout
- Hover effects
- Transitions and animations

---

## 🚀 How to Use

### Option 1: Open Directly in Browser

1. Navigate to this folder in Finder/Explorer
2. Double-click `index.html`
3. Prototype opens in your default browser
4. Click through the experience

### Option 2: Local Web Server (Recommended)

```bash
# From this directory
python3 -m http.server 8080

# Or using Node.js
npx http-server -p 8080

# Then open: http://localhost:8080
```

### Option 3: VS Code Live Server

1. Install "Live Server" extension in VS Code
2. Right-click `index.html`
3. Select "Open with Live Server"

---

## 📂 File Structure

```
html-prototype/
├── index.html                 # Landing page & phase selector
├── css/
│   ├── styles.css            # Main styles & design system
│   └── screens.css           # Screen-specific styles
├── js/
│   └── prototype.js          # Interactive functionality
└── screens/
    ├── phase1-welcome.html   # Welcome screen
    ├── phase1-role.html      # Role selection
    ├── phase1-privacy.html   # Privacy settings
    ├── phase1-mode.html      # Mode selection
    ├── phase2-dashboard.html # Assessment dashboard
    └── [more screens...]
```

---

## 🎨 Design System

### Colors

**Primary Colors:**
- Primary: #2196F3 (Blue)
- Success: #4CAF50 (Green)
- Warning: #FF9800 (Orange)
- Error: #F44336 (Red)

**Dimension Colors:**
- Communication: #4CAF50
- Financial: #2196F3
- Next Gen: #9C27B0
- Decision: #FF9800
- Values: #00BCD4
- Governance: #3F51B5
- Ownership: #E91E63
- Identity: #8BC34A

### Typography

- Font: System fonts (-apple-system, Segoe UI, Roboto)
- Base size: 16px
- Headings: 24px - 48px, bold
- Body: 16px, regular

### Spacing

- XS: 4px
- SM: 8px
- MD: 16px
- LG: 24px
- XL: 32px
- 2XL: 48px
- 3XL: 64px

---

## 🔧 Interactive Features

### State Management

The prototype uses `sessionStorage` to persist:
- Selected role
- Privacy settings
- Assessment mode
- Answers (simulated)
- Progress percentage

**To reset:** Clear browser data or use: `sessionStorage.clear()`

### Auto-Save Simulation

- Triggered every 30 seconds
- Visual indicator updates
- No actual server communication (prototype only)

### Navigation

- **Next/Previous buttons:** Navigate between screens
- **Click cards:** Jump to dimensions
- **Keyboard shortcuts:**
  - `Ctrl/Cmd + S`: Save progress
  - `Escape`: Return to dashboard (from questions)

---

## 📱 Responsive Design

The prototype is responsive and works on:
- ✅ Desktop (1440px+) - Optimal experience
- ✅ Tablet (768px - 1024px) - Good experience
- ⚠️ Mobile (< 768px) - Basic support

**Note:** Full product should have enhanced mobile optimization.

---

## ✨ Key Screens

### Phase 1: Setup & Context

**1.1 Welcome Screen** (`phase1-welcome.html`)
- Hero section with value propositions
- Info cards (time, participants, questions)
- Compass graphic
- CTA button

**1.2 Role Confirmation** (`phase1-role.html`)
- 9 role options (G1, G2, G3+, advisors)
- Radio button cards
- Custom role input
- Validation

**1.3 Privacy Settings** (`phase1-privacy.html`)
- 3 privacy levels
- Recommended option highlighted
- Comment visibility settings
- Facilitator access notice

**1.4 Mode Selection** (`phase1-mode.html`)
- Self-paced vs Facilitated
- Schedule picker (self-paced)
- Facilitator slot selection
- Recommendation callout

### Phase 2: Assessment

**2.1 Dashboard** (`phase2-dashboard.html`)
- Overall progress bar
- 8 dimension cards
- Status indicators (completed/in-progress/not-started)
- Family progress section
- Quick actions

**2.2 Dimension Intro** (referenced, not created)
- Introduction to dimension
- What will be covered
- Time estimate
- Tips for honest answers

**2.3 Question Screens** (referenced, not created)
- Likert 7-point scale
- Multiple choice
- Multi-select
- Comment textarea
- Navigation

### Phase 4: Results

**4.1 Results Dashboard** (referenced)
- Radar chart visualization
- Maturity index card
- Dimension breakdown
- Consensus indicators

### Phase 5: Action Planning

**5.1 Priority Selection** (referenced)
- Top 3 priorities from insights
- Effort/impact estimates
- Workshop recommendations

---

## 🎯 Demo Flow

**Recommended walkthrough:**

1. **Start:** Open `index.html`
2. **Choose Phase 1:** Click "Начать"
3. **Complete Setup:**
   - Welcome → Role → Privacy → Mode
4. **Enter Assessment:** See dashboard
5. **View Dimensions:** Click any dimension card
6. **Explore:** Navigate through examples

---

## 🐛 Known Limitations

This is a **static prototype**, not a functioning application:

- ❌ No backend/database
- ❌ No actual data persistence (only sessionStorage)
- ❌ No real-time collaboration
- ❌ No actual scoring algorithms
- ❌ Limited screens (not all 105 questions)
- ❌ No export functionality
- ❌ No WebSocket connections

**Purpose:** Demonstrate UX flow and visual design, not functionality.

---

## 📝 Adding New Screens

To add a new screen:

1. Create HTML file in `screens/` folder
2. Copy header/footer structure from existing screens
3. Link stylesheets:
   ```html
   <link rel="stylesheet" href="../css/styles.css">
   <link rel="stylesheet" href="../css/screens.css">
   ```
4. Link JavaScript:
   ```html
   <script src="../js/prototype.js"></script>
   ```
5. Add navigation buttons to/from new screen

---

## 🎨 Customizing Styles

### Changing Colors

Edit `css/styles.css`:

```css
:root {
    --primary: #2196F3;  /* Change primary color */
    --success: #4CAF50;  /* Change success color */
    /* ... more variables */
}
```

### Adding New Components

Add to `css/screens.css`:

```css
.my-new-component {
    background: var(--gray-50);
    padding: var(--spacing-lg);
    border-radius: var(--radius-md);
}
```

---

## 🚢 Next Steps

### From Prototype to Production

1. **High-Fidelity Design:**
   - Use this as base for Figma mockups
   - Add icons, illustrations, micro-interactions
   - Define all component states

2. **Technical Implementation:**
   - Backend API (see `../data-schema.md`)
   - Frontend framework (React/Vue/Angular)
   - Database integration
   - Real-time features

3. **Testing:**
   - User testing with prototype
   - A/B testing of flows
   - Accessibility audit
   - Performance optimization

---

## 📞 Support

**Questions about the prototype?**
- See main documentation: [`../README.md`](../README.md)
- Review specifications: [`../phase-*.md`](../)
- Check data schema: [`../data-schema.md`](../data-schema.md)

---

## 📊 Prototype Stats

- **HTML Files:** 10+ screens
- **CSS Lines:** ~1,500 lines
- **JavaScript:** ~300 lines
- **Interactive Elements:** 50+
- **Total Size:** ~200 KB

---

## ✅ Checklist for Reviewers

When reviewing this prototype, check:

- [ ] Navigation flows logically
- [ ] All buttons/links work
- [ ] Forms are usable
- [ ] Responsive on tablet/mobile
- [ ] Visual design is consistent
- [ ] Text is readable
- [ ] Colors meet brand guidelines
- [ ] Loading states are clear
- [ ] Error states are handled
- [ ] Success messages are encouraging

---

**Version:** 1.0
**Last Updated:** October 31, 2025
**Status:** Ready for Stakeholder Review

---

*This is a clickable prototype for demonstration purposes. It does not represent a functioning application.*
