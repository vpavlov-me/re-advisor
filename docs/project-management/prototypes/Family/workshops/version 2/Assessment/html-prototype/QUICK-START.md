# Quick Start Guide - HTML Prototype

**Time to launch:** < 1 minute

---

## 🚀 Option 1: Double-Click (Easiest)

1. Navigate to this folder in Finder/Explorer
2. **Double-click `index.html`**
3. Prototype opens in your browser
4. ✅ Done!

---

## 🌐 Option 2: Local Web Server (Recommended)

### Using Python (Mac/Linux/Windows)

```bash
# Navigate to this folder in Terminal
cd "project-management/prototypes/Family/workshops/Assessment/html-prototype"

# Start server
python3 -m http.server 8080

# Open browser to:
# http://localhost:8080
```

### Using Node.js

```bash
# Install http-server globally (one time)
npm install -g http-server

# Start server
http-server -p 8080

# Open: http://localhost:8080
```

### Using PHP

```bash
php -S localhost:8080
```

---

## 🎯 What to Do Next

1. **Landing Page:** Click "Начать Assessment Prototype"
2. **Complete Setup:** Go through all Phase 1 screens
3. **View Dashboard:** See assessment navigation
4. **Explore:** Click around and experience the flow

---

## 🖱️ Interactive Elements

Try these interactions:

✅ **Click cards** - Navigate to different phases
✅ **Fill forms** - Select roles, privacy settings
✅ **See progress** - Watch progress bars update
✅ **Auto-save** - Notice save indicators
✅ **Family progress** - View other participants

---

## ⌨️ Keyboard Shortcuts

- `Ctrl/Cmd + S` - Save progress
- `Escape` - Return to dashboard (from questions)

---

## 🔄 Reset Prototype State

If you want to start fresh:

1. Open browser DevTools (F12)
2. Go to **Application** tab
3. Clear **Session Storage**
4. Refresh page

Or use console:
```javascript
sessionStorage.clear()
location.reload()
```

---

## 📁 File Structure

```
html-prototype/
├── index.html              ← START HERE
├── css/
│   ├── styles.css         (main styles)
│   └── screens.css        (screen-specific)
├── js/
│   └── prototype.js       (interactivity)
└── screens/
    ├── phase1-welcome.html
    ├── phase1-role.html
    ├── phase1-privacy.html
    ├── phase1-mode.html
    └── phase2-dashboard.html
```

---

## ✅ What Works

- ✅ Navigation between screens
- ✅ Form inputs and validation
- ✅ Progress tracking
- ✅ State persistence (sessionStorage)
- ✅ Responsive design
- ✅ Hover effects and animations

---

## ❌ What Doesn't Work (By Design)

This is a **static prototype**, so:

- ❌ No backend/database
- ❌ No real data persistence
- ❌ No actual email sending
- ❌ No real-time collaboration
- ❌ Only partial screens (not all 105 questions)

**Purpose:** Demonstrate UX flow and visual design.

---

## 🐛 Troubleshooting

**Problem:** Styles not loading
**Solution:** Use local web server (Option 2) instead of double-click

**Problem:** Links not working
**Solution:** Check that you're in the correct folder

**Problem:** State not persisting
**Solution:** Check browser allows sessionStorage

---

## 📞 Need Help?

See full documentation: [README.md](./README.md)

---

**Ready? Open `index.html` and start exploring!** 🚀
