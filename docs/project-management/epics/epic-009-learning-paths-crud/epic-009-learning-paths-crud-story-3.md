# User Story: Reorder Modules via Drag-and-Drop

## 📋 Basic Information

**Issue Type:** Story
**Project:** FG
**Summary:** As an advisor, I want to reorder modules within my learning path by dragging and dropping
**Epic Link:** FG-EPIC-ALP-002-CRUD
**Priority:** Medium
**Story Points:** 5
**Sprint:** [To be assigned]

---

## 📖 User Story

**As a** Personal Family Advisor / External Consul / Consultant,
**I want to** reorder modules within my learning path by dragging and dropping module cards,
**so that** I can easily adjust the learning sequence without manual renumbering.

---

## 🎯 Business Context

**Why is this Story important?**

Learning sequence matters for educational effectiveness. Advisors need intuitive way to restructure learning paths as content evolves. Drag-and-drop provides best UX for reordering without complex forms or manual numbering.

**User pain point being solved:**
- Manual reordering via "move up/down" buttons is tedious
- Renumbering modules manually is error-prone
- Difficult to visualize new sequence before committing

**Business outcome expected:**
- Improved advisor productivity (faster reordering)
- Better learning path quality (easy experimentation with sequence)
- Professional UX matching modern SaaS standards

---

## ✅ Acceptance Criteria

1. **Given** advisor is viewing modules list in Step 2 or edit mode,
   **When** advisor hovers over a module card,
   **Then** system displays drag handle icon (⠿) and cursor changes to "grab" indicating draggable.

2. **Given** advisor clicks and holds drag handle on module card,
   **When** advisor drags module up or down,
   **Then** system shows visual feedback: dragged module follows cursor with slight transparency, other modules shift to show insertion point.

3. **Given** advisor drags module to new position,
   **When** advisor releases mouse button,
   **Then** system updates module order in database, re-numbers all affected modules sequentially (no gaps), and displays updated order numbers immediately.

4. **Given** modules are reordered,
   **When** system saves changes,
   **Then** system updates `order` field for all affected modules in single transaction, maintains sequential numbering (1, 2, 3...), and triggers auto-save.

5. **Given** advisor drags module from position 1 to position 5,
   **When** drop completes,
   **Then** system re-numbers: old position 2 → 1, old 3 → 2, old 4 → 3, old 5 → 4, dragged module → 5.

6. **Given** reorder operation is in progress,
   **When** network connection is lost,
   **Then** system shows error message "Connection lost. Changes not saved. Please try again.", reverts to previous order, and attempts to reconnect.

7. **Given** advisor drags module outside droppable area (e.g., outside modules list),
   **When** advisor releases,
   **Then** system cancels drag operation, returns module to original position, shows no changes.

**Additional Criteria:**
- [ ] Drag-and-drop works on desktop only (not mobile in MVP)
- [ ] Visual feedback: Smooth animation when modules shift positions
- [ ] Debounce save operation (wait 500ms after drop before saving to avoid multiple rapid updates)
- [ ] Keyboard accessibility: Support arrow keys for reordering (up/down moves module)
- [ ] Undo capability: "Ctrl+Z" reverts last reorder operation (within session)
- [ ] Auto-save after reorder with "Last saved: [timestamp]" indicator

---

## 🔑 Business Rules

**Reordering Logic:**
1. Module order must remain sequential with no gaps (1, 2, 3, 4...)
2. When module is moved:
   - Dragged module gets new order number
   - All modules between old and new positions are re-numbered
3. System ensures atomicity: All order updates in single database transaction (all succeed or all fail)
4. Order updates trigger `updated_at` timestamp refresh for learning path

**Authorization:**
- **Who can perform this action:** Only the advisor who created the learning path (creator_advisor_id = current_advisor_id)
- **Who can view results:** Only the creator advisor

**Data Integrity:**
- Order numbers must be unique within learning path
- Order must be positive integers starting from 1
- No gaps in sequence (if 4 modules, orders must be 1,2,3,4 not 1,3,5,6)

**Edge Cases:**
- **Single module**: Drag-and-drop disabled (no reordering needed)
- **Two modules**: Only one swap possible (1↔2)
- **Dragging to same position**: No changes, no save operation
- **Concurrent edits**: Last write wins (potential data loss if two advisors edit same path simultaneously - low priority edge case in MVP)

---

## 🎨 Design & UX

**User Flow:**

1. **Initiating Drag:**
   - User hovers over module card → Drag handle icon appears on left side
   - User clicks and holds drag handle → Cursor changes to "grabbing" → Module card elevates (shadow effect) and becomes semi-transparent

2. **Dragging:**
   - User moves mouse up or down → Dragged module follows cursor
   - Other modules animate smoothly to show where dragged module will be inserted
   - Insertion indicator (dashed line) shows drop zone

3. **Dropping:**
   - User releases mouse button → Module drops into new position
   - System animates all modules to final positions
   - Order numbers update immediately (visual only, before save)
   - System saves to database (debounced 500ms)
   - Success indicator: Green checkmark briefly appears on reordered module
   - "Last saved: Just now" indicator updates

4. **Canceling Drag:**
   - User presses ESC key during drag → Module returns to original position
   - User drags outside list area → Module snaps back to original position

**UI Elements:**
- Drag handle icon (⠿) on left side of module card
- Semi-transparent dragged module during drag
- Dashed line insertion indicator
- Smooth animations (200ms ease-in-out)
- Success checkmark on drop
- "Last saved" timestamp

**Animation Specifications:**
- Drag start: Module elevates with shadow, 100ms
- Module shift: Other modules move smoothly, 200ms ease-in-out
- Drop: Module settles into position, 150ms
- Success feedback: Checkmark fades in/out, 1 second total

---

## 🧪 Test Scenarios

**Happy Path:**
1. Learning path has modules: [1: "Intro", 2: "Basics", 3: "Advanced", 4: "Conclusion"]
2. Advisor drags "Advanced" (position 3) to position 1
3. System shows insertion line at top → Advisor drops
4. Expected result: [1: "Advanced", 2: "Intro", 3: "Basics", 4: "Conclusion"]
5. System saves with updated order numbers
6. Verify database: All 4 modules have correct order values

**Negative Tests:**
1. **Unauthorized user**: Non-creator attempts to reorder → System rejects with 403 Forbidden
2. **Network failure during drag**: Connection drops → Drop completes → Save fails → System shows error and reverts order
3. **Invalid drop position**: User drags module to invalid area → System cancels drag, returns to original position

**Edge Cases:**
1. **Single module**: Drag handle not shown (or disabled)
2. **Rapid reordering**: User drags multiple times quickly → System debounces saves → Only final state saved
3. **Drag to same position**: User drags module 2 and drops at position 2 → No changes, no save
4. **Long list (50+ modules)**: Drag performance remains smooth → Scroll while dragging works smoothly
5. **Keyboard reorder**: User selects module, presses arrow up → Module moves up 1 position → Auto-save triggered

---

## 🔗 Dependencies

**Technical Dependencies:**
- Frontend: Drag-and-drop library (e.g., react-beautiful-dnd, dnd-kit)
- Backend: PATCH /learning-paths/{id}/modules/reorder endpoint accepting array of {module_id, new_order}
- Database: Transaction support for atomic order updates

---

## ⚠️ Non-Functional Requirements

**Performance:**
- Drag initiation: < 50ms (instant response)
- Module shift animation: 200ms smooth
- Save operation: < 500ms
- Works smoothly with up to 50 modules
- Consider virtualization for 50+ modules

**Usability:**
- Drag handle visually distinct and easily clickable (min 24x24px)
- Clear visual feedback during drag (elevation, transparency, insertion line)
- Smooth animations (no jank)
- Works on desktop screens (1024px+ width)

**Accessibility:**
- Keyboard navigation: Arrow keys to reorder
- Screen reader announces: "Module [title] moved to position [number]"
- Focus management: Focus follows reordered module

**Browser Support:**
- Chrome: Latest 2 versions (primary)
- Safari: Latest 2 versions
- Firefox: Latest 2 versions (if specified)

---

## 📝 Notes

- Recommend using `dnd-kit` library for modern React drag-and-drop
- Mobile drag-and-drop: Consider in future iteration (touch support)
- Consider adding "Undo last reorder" button for 30 seconds after drop
- Backend should validate order sequence integrity on save

---

**Story Version:** 1.0.0
**Created:** 2025-10-24
**Last Updated:** 2025-10-24