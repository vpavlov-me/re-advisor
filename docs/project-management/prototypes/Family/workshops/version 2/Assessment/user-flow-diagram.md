# User Flow Diagram & Journey Map

---

This document provides visual representations of the complete user journey through the Assessment Workshop.

---

## Complete User Journey (High-Level)

```
┌─────────────────────────────────────────────────────────────────┐
│                        PRE-ASSESSMENT                            │
│                                                                  │
│  User Story:                                                     │
│  Family decides they need assessment → Receives invite link     │
│                                                                  │
│  Email: "You're invited to Family Governance Assessment"        │
│  [Click to start] → Authentication → Landing                    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    PHASE 1: SETUP (5-10 min)                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Screen 1.1: Welcome                                             │
│  ├─ User sees: Value prop, time estimate, # participants        │
│  ├─ Action: [Начать оценку]                                     │
│  └─ Data captured: Entry timestamp                              │
│           ↓                                                      │
│  Screen 1.2: Role Confirmation                                   │
│  ├─ User selects: G1 Founder / G2 Heir / Advisor / etc.        │
│  ├─ Why: Contextualizes questions                               │
│  └─ Data captured: Role, generation                             │
│           ↓                                                      │
│  Screen 1.3: Privacy Settings                                    │
│  ├─ User chooses: Anonymous / Anonymous-revealable / Named      │
│  ├─ Why: Builds trust, enables honest answers                   │
│  └─ Data captured: Privacy preferences                          │
│           ↓                                                      │
│  Screen 1.4: Mode Selection                                      │
│  ├─ User chooses: Self-paced now / Schedule / Facilitator       │
│  ├─ If scheduled: Date/time picker                              │
│  └─ Data captured: Mode, schedule                               │
│           ↓                                                      │
│  [1.5: Confirmation] ← Only if scheduled                         │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  PHASE 2: ASSESSMENT (60-90 min)                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Screen 2.1: Dashboard (Navigation Hub)                          │
│  ├─ User sees: 8 dimensions, progress bars, current status      │
│  ├─ Actions: Start dimension / Continue / Review completed      │
│  └─ User can jump to any dimension                              │
│           ↓                                                      │
│  FOR EACH DIMENSION (×8):                                        │
│    │                                                             │
│    Screen 2.2: Dimension Introduction                            │
│    ├─ User sees: What this measures, topics, time estimate      │
│    ├─ Action: [Начать этот раздел]                             │
│    └─ Sets context                                              │
│         ↓                                                        │
│    Screen 2.3-2.5: Questions (10-16 per dimension)              │
│    ├─ User answers: Likert scale / Multiple choice / etc.       │
│    ├─ Optional: Add text comment                                │
│    ├─ Can skip (max 3 per dimension)                            │
│    ├─ Auto-save every 30 seconds                                │
│    └─ Navigation: Previous / Next / Save & Exit                 │
│         ↓                                                        │
│    [2.5: Break Reminder] ← Triggered every 25 questions          │
│    ├─ User sees: Progress, time worked, suggestion to break     │
│    ├─ Actions: Continue / 5-min break / Exit                    │
│    └─ Purpose: Maintain answer quality                          │
│         ↓                                                        │
│    Screen 2.6: Dimension Completion                              │
│    ├─ User sees: "Раздел завершён!", preliminary score          │
│    ├─ Celebration moment                                        │
│    └─ Actions: Next dimension / Dashboard / Break               │
│         ↓                                                        │
│    Return to Dashboard → Select next dimension → Repeat         │
│                                                                  │
│  After all 8 dimensions complete:                                │
│  → Automatic trigger: Phase 3 synthesis                          │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              PHASE 3: SYNTHESIS (Automatic, 2-5 sec)             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Backend Processing (User sees loading screen):                  │
│                                                                  │
│  Step 1: Answer Normalization                                    │
│  ├─ Convert all answer types to 0-1 scale                       │
│  └─ Handle skipped questions                                    │
│       ↓                                                          │
│  Step 2: Dimension Scoring                                       │
│  ├─ Calculate weighted scores                                   │
│  ├─ Compute confidence levels                                   │
│  └─ Normalize to 0-100 scale                                    │
│       ↓                                                          │
│  Step 3: Consensus Analysis                                      │
│  ├─ Compare answers across family members                       │
│  ├─ Calculate standard deviation                                │
│  ├─ Identify outliers and divergences                           │
│  └─ Analyze generational gaps                                   │
│       ↓                                                          │
│  Step 4: Pattern Detection                                       │
│  ├─ Cross-dimensional analysis                                  │
│  ├─ Detect common patterns (succession gap, values-execution)   │
│  └─ Benchmark against similar families                          │
│       ↓                                                          │
│  Step 5: AI Insight Generation                                   │
│  ├─ Generate prioritized insights                               │
│  ├─ Create recommendations                                      │
│  └─ Suggest workshops                                           │
│                                                                  │
│  Output: Complete results package ready for Phase 4              │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                 PHASE 4: RESULTS (20-30 min)                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Screen 4.1: Results Dashboard                                   │
│  ├─ User sees: Radar chart, maturity index, dimension scores    │
│  ├─ Interactive: Click dimensions for details                   │
│  ├─ Consensus indicators: High/Medium/Low for each dimension    │
│  └─ Actions: Explore consensus / View insights / Export         │
│       │                                                          │
│       ├─→ Screen 4.2: Consensus Map                              │
│       │   ├─ User sees: Where family agrees/disagrees           │
│       │   ├─ Generational gaps highlighted                      │
│       │   ├─ Specific divergent questions explained             │
│       │   └─ Actions: Add to discussion priorities              │
│       │                                                          │
│       ├─→ Screen 4.3: AI Insights                                │
│       │   ├─ User sees: 5-8 prioritized insights                │
│       │   ├─ Each insight: Type, priority, evidence, actions    │
│       │   ├─ Workshop recommendations                           │
│       │   └─ Actions: Add to action plan / Book workshop        │
│       │                                                          │
│       └─→ Screen 4.4: Dimension Deep Dive (per dimension)        │
│           ├─ User sees: Question-by-question breakdown           │
│           ├─ Individual vs family average                       │
│           └─ Can review own answers                             │
│                                                                  │
│  User outcome: Full understanding of family's current state      │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│               PHASE 5: ACTION PLAN (10-15 min)                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Screen 5.1: Priority Selection                                  │
│  ├─ User sees: 5-8 recommended priorities from insights         │
│  ├─ Action: Select top 3 (checkbox)                             │
│  ├─ Can add custom priority                                     │
│  └─ Validation: Must select 1-3                                 │
│       ↓                                                          │
│  Screen 5.2: Timeline & Accountability                           │
│  ├─ For each priority:                                          │
│  │   ├─ Assign owner (dropdown of family members)              │
│  │   ├─ Set target start date                                  │
│  │   ├─ Set target completion date                             │
│  │   └─ Define first concrete step (textarea)                  │
│  ├─ Auto-generated timeline shown                               │
│  └─ Action: [Save Action Plan]                                  │
│       ↓                                                          │
│  Screen 5.3: Export & Sharing                                    │
│  ├─ User sees: Action plan summary                              │
│  ├─ Export options:                                             │
│  │   ├─ Format: PDF / PPT / Excel                              │
│  │   ├─ Include: Scores / Insights / Action plan / etc.        │
│  │   └─ Action: [Generate & Download]                          │
│  ├─ Share options:                                              │
│  │   ├─ Select family members (checkboxes)                     │
│  │   ├─ Add message                                            │
│  │   └─ Action: [Send via email]                               │
│  └─ Next steps:                                                 │
│      ├─ Schedule family meeting                                 │
│      ├─ Book workshops                                          │
│      ├─ Set up reminders                                        │
│      └─ Plan re-assessment (6-12 months)                        │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      POST-ASSESSMENT                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Week 1: Family meeting to discuss results                       │
│  Week 2-4: Begin first priority                                 │
│  Month 2: Progress check-in (automated email reminder)          │
│  Month 3: Launch second priority                                │
│  Month 6: Mid-year review, adjust plan                          │
│  Month 12: Re-assessment → Measure improvement                  │
│                                                                  │
│  Platform tracks:                                               │
│  - Priority completion status                                   │
│  - Workshop bookings                                            │
│  - Progress updates                                             │
│  - Score improvement over time                                  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## User Persona Journeys

### Persona 1: Vladislav (G2 Heir, 45 years old)

**Context:** Preparing to take over family business, wants clarity on succession plan.

```
Motivation: "I need to understand where we stand and what needs to happen for smooth transition"

Journey:
1. Receives email invite from father (G1 Founder)
2. Clicks link, lands on Welcome screen
   - Reaction: "90 minutes is doable, let's see what this reveals"
3. Confirms role: "Наследник/преемник (G2)"
4. Chooses privacy: "Anonymous with reveal option"
   - Thinking: "I'll be honest, can reveal later if needed"
5. Mode: "Self-paced now" - it's evening, has time
6. Assessment (75 minutes actual):
   - Answers honestly about financial transparency (low score)
   - Notes in comments: "We don't get regular financial updates"
   - Takes 2 breaks (after 30 and 60 minutes)
7. Views results:
   - Relieved: High score on Next Generation (68/100)
   - Concerned: Low on Ownership & Control (41/100)
   - Key insight: "Succession gap" resonates strongly
8. Creates action plan:
   - Priority 1: Create succession plan (assigns self as owner)
   - Priority 2: Improve financial transparency
9. Exports PDF, shares with father
10. Outcome: Concrete conversation starter with data

Key moments:
✓ Break reminders helped maintain focus
✓ Consensus map validated his feelings ("I'm not crazy, G2 really does lack info")
✓ AI insight gave him words to express the problem
```

### Persona 2: Maria (G1 Founder's Spouse, 65 years old)

**Context:** Concerned about family harmony, wants everyone to get along.

```
Motivation: "I want to make sure the family stays united"

Journey:
1. Husband showed her the invite, she's skeptical but willing
2. Welcome screen: "Do I really need 90 minutes for this?"
3. Role: "Супруг(а) основателя (G1)"
4. Privacy: "With name" - transparency is important to her
5. Mode: "Self-paced" but schedules for tomorrow morning
   - Receives calendar reminder
6. Next day, starts assessment:
   - Scores Communication & Trust very high (85/100)
   - Surprised by some questions: "I didn't know this was an issue"
   - Takes 100 minutes (reads carefully)
7. Views results with husband:
   - Shocked: She and husband scored Financial Transparency very differently
   - Husband: 72/100, Maria: 48/100
   - "We see this so differently!"
8. Consensus map is eye-opening:
   - Generational gap on transparency
   - Kids want more information
9. Action plan:
   - Advocates for Priority 3: Intergenerational dialogue
   - Volunteers to co-host family meeting
10. Outcome: Becomes champion of change

Key moments:
✓ Dimension intros helped her understand what was being measured
✓ Seeing divergence with husband was uncomfortable but valuable
✓ Realizes family needs structured conversations
```

---

## Decision Points & Branching

```
Entry Point
    ↓
Is user invited? ─NO→ [Create new assessment] → Invite family
    ↓ YES
Auth check
    ↓
Has started? ─YES→ [Resume from last question]
    ↓ NO
Setup Phase
    ↓
Mode = Facilitated? ─YES→ [Wait for facilitator to start session]
    ↓ NO
Mode = Scheduled? ─YES→ [Calendar confirmation] → [Reminder set]
    ↓ NO
Start immediately
    ↓
Assessment Phase
    ↓
Question type? ─→ Likert 7 → Screen 2.3
               ─→ Multi-select → Screen 2.5
               ─→ etc.
    ↓
Every 25 questions → [Break reminder]
    ↓
Every 30 seconds → [Auto-save]
    ↓
Dimension complete → [Celebration] → [Return to dashboard]
    ↓
All dimensions done?
    ↓ YES
Phase 3: Synthesis (automatic)
    ↓
Results ready?
    ↓ YES
Phase 4: Results
    ↓
User role = Facilitator? ─YES→ [Full family view with individual breakdowns]
    ↓ NO
Standard results view
    ↓
Phase 5: Action planning
    ↓
Export & Share
    ↓
Return to platform dashboard
```

---

## Emotional Journey

```
                    😊 Confident
                    │
Welcome             │
    ↓               │
Setup               │ 😐 Neutral
    ↓               │
First questions     │
    ↓               │
Getting tired...    │ 😓 Fatigued
    ↓               │
Break reminder      │ 😌 Relieved
    ↓               │
Resume              │ 😊 Re-energized
    ↓               │
More tough Qs       │ 🤔 Thoughtful
    ↓               │
Complete!           │ 🎉 Accomplished
    ↓               │
Waiting for results │ 😬 Anxious
    ↓               │
Results appear      │ 😲 Surprised
    ↓               │
See divergences     │ 😟 Concerned
    ↓               │
Read insights       │ 💡 Enlightened
    ↓               │
Create action plan  │ 😊 Hopeful
    ↓               │
Share with family   │ 😌 Relieved
    ↓               │
End                 │ ✅ Empowered
```

---

## Touch Points & Notifications

### Email Communications

1. **Initial Invite**
   - Trigger: Assessment created
   - Content: You're invited, why it matters, time estimate
   - CTA: [Start Assessment]

2. **Reminder (if scheduled)**
   - Trigger: 1 day before + 1 hour before
   - Content: Your scheduled assessment starts soon
   - CTA: [Join Now]

3. **Progress Nudge** (optional)
   - Trigger: Started but not completed after 3 days
   - Content: You're 60% done, only 30 minutes left
   - CTA: [Continue Assessment]

4. **Completion Notification**
   - Trigger: User completes assessment
   - Content: Thank you, results being processed
   - Next steps: Wait for others / View preliminary results

5. **Results Ready**
   - Trigger: All family members complete
   - Content: Full results available
   - CTA: [View Results]

6. **Action Plan Reminder**
   - Trigger: Weekly/Monthly (based on user preference)
   - Content: Priority deadline approaching, progress check
   - CTA: [Update Progress]

7. **Re-assessment Invitation**
   - Trigger: 6-12 months after initial
   - Content: Time to measure progress
   - CTA: [Start Re-assessment]

---

## Success Metrics Tracking

Throughout journey, track:
- Time on each screen
- Drop-off points
- Skip rate per question
- Comment frequency
- Break usage
- Export actions
- Share actions
- Workshop bookings
- Action plan creation rate
- Priority completion rate

---

## Alternative Flows

### Flow 1: Abandon & Resume
```
User starts → Answers 30 questions → Exits
   ↓ (3 days later)
Reminder email → Returns → Dashboard shows 30/105
   → Can continue from question 31 OR review previous answers
```

### Flow 2: Facilitator-Led
```
Facilitator creates session → Invites family → Schedules meeting
   → During meeting: Facilitator navigates, everyone answers together
   → Real-time consensus visible
   → Results discussed immediately
   → Action plan created collaboratively
```

### Flow 3: Partial Completion
```
Only 3 of 5 invited users complete
   → Results generated with caveat: "Based on 3/5 responses"
   → Consensus analysis limited
   → Platform sends reminders to pending users
```

---

**End of User Flow Documentation**

This journey map should guide UX design decisions and help identify optimization opportunities throughout the assessment experience.
