# Phase 5: Action Planning - Screen Specifications

---

**Phase:** 5 of 5
**Duration:** 10-15 minutes
**Screens:** 3 core screens
**Purpose:** Convert insights into concrete action plan with accountability

---

## Overview

Phase 5 transforms assessment results into a practical roadmap. Users select top priorities, assign owners, set timelines, and receive workshop recommendations. The output is a living action plan that can be tracked over time.

---

## Screen 5.1: Priority Selection

### Purpose
Choose top 3 priorities from AI-generated insights.

### Visual Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  Plan Your Next Steps                                             │
│  ═════════════════════                                            │
│                                                                   │
│  На основе результатов assessment мы рекомендуем следующие       │
│  приоритеты. Выберите top 3 для фокуса в ближайшие 3-6 месяцев. │
│                                                                   │
│  💡 Совет: Лучше сфокусироваться на 2-3 приоритетах и выполнить │
│     их хорошо, чем распыляться на 5-7 и не завершить ничего.    │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  [☐] Приоритет 1: Создать succession plan                  │ │
│  │                                                             │ │
│  │      🚨 Критический приоритет                               │ │
│  │      Effort: High (3-6 месяцев)                            │ │
│  │      Impact: Prevents future conflicts, ensures smooth     │ │
│  │              transition                                     │ │
│  │                                                             │ │
│  │      Затронутые измерения:                                 │ │
│  │      • Следующее поколение (68/100)                        │ │
│  │      • Владение и контроль (41/100) ⚠️                      │ │
│  │      • Структуры управления (38/100) 🚨                     │ │
│  │                                                             │ │
│  │      Recommended workshop:                                  │ │
│  │      → Succession Planning Workshop (2-3 сессии)           │ │
│  │                                                             │ │
│  ├────────────────────────────────────────────────────────────┤ │
│  │  [☐] Приоритет 2: Установить governance structures         │ │
│  │                                                             │ │
│  │      ⚠️  Высокий приоритет                                  │ │
│  │      Effort: Medium (2-4 месяца)                           │ │
│  │      Impact: Formalizes decision-making, reduces conflicts │ │
│  │                                                             │ │
│  │      Затронутые измерения:                                 │ │
│  │      • Структуры управления (38/100) 🚨                     │ │
│  │      • Принятие решений (52/100)                           │ │
│  │                                                             │ │
│  │      Recommended workshop:                                  │ │
│  │      → Governance Structures Workshop (2 сессии)           │ │
│  │                                                             │ │
│  ├────────────────────────────────────────────────────────────┤ │
│  │  [☐] Приоритет 3: Межпоколенческий диалог о финансах      │ │
│  │                                                             │ │
│  │      ⚠️  Высокий приоритет                                  │ │
│  │      Effort: Low (1-2 сессии)                              │ │
│  │      Impact: Improves transparency, builds trust           │ │
│  │                                                             │ │
│  │      Затронутые измерения:                                 │ │
│  │      • Финансовая прозрачность (45/100)                    │ │
│  │      • Коммуникация (78/100)                               │ │
│  │                                                             │ │
│  │      Recommended action:                                    │ │
│  │      → Facilitated family meeting on financial sharing     │ │
│  │                                                             │ │
│  ├────────────────────────────────────────────────────────────┤ │
│  │  [☐] Приоритет 4: Документировать decision-making process  │ │
│  │                                                             │ │
│  │      → Средний приоритет                                    │ │
│  │      Effort: Low (1 месяц)                                 │ │
│  │      Impact: Clarity on how decisions are made             │ │
│  │                                                             │ │
│  ├────────────────────────────────────────────────────────────┤ │
│  │  [☐] Приоритет 5: Создать education program для G3         │ │
│  │                                                             │ │
│  │      → Средний приоритет                                    │ │
│  │      Effort: Medium (ongoing)                              │ │
│  │      Impact: Prepares next generation                      │ │
│  │                                                             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  Выбрано: 0 / 3 (рекомендуем не более 3)                         │
│                                                                   │
│  [Добавить свой приоритет]                                       │
│                                                                   │
│                        [Продолжить →]                             │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### Component Specifications

#### Priority Cards
- **Style:** Checkbox cards (full-width)
- **States:**
  - Unselected: Light border
  - Hover: Blue border
  - Selected: Blue border + light blue background + checkmark
  - Disabled (>3 selected): Grayed out
- **Content:**
  - Title (bold, 18px)
  - Priority badge (Critical/High/Medium/Low)
  - Effort estimate (Low/Medium/High + timeframe)
  - Impact description
  - Affected dimensions with scores
  - Recommended workshop/action

#### Selection Limit
- Max 3 selections enforced
- After 3 selected, remaining cards disabled
- Can deselect to change selection

#### Custom Priority
- "Добавить свой приоритет" button
- Opens modal for custom entry:
  - Title (required)
  - Description
  - Target completion date
  - Owner

### Data Model

```typescript
interface SelectedPriority {
  priority_id: string;
  rank: number; // 1, 2, or 3
  title: string;
  description: string;

  // Auto-filled from insight
  priority_level: 'critical' | 'high' | 'medium' | 'low';
  effort_estimate: 'low' | 'medium' | 'high';
  estimated_duration_months: number;
  affected_dimensions: string[];

  // To be filled in next screen
  owner_user_id?: string;
  target_start?: date;
  target_completion?: date;
  first_step?: string;

  suggested_workshop_id?: string;
}
```

### Validation
- Must select 1-3 priorities
- If 0 selected: "Продолжить" button disabled

---

## Screen 5.2: Timeline & Accountability

### Purpose
Assign owners and timelines to selected priorities.

### Visual Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  ← Назад                     Action Plan Timeline                 │
│  ═══════════════════════════════════════════                      │
│                                                                   │
│  Давайте определим, кто ответственный за каждый приоритет и      │
│  когда вы планируете начать.                                     │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  📋 Приоритет 1: Создать succession plan                   │ │
│  │                                                             │ │
│  │  Когда начать:                                             │ │
│  │  [●] В течение месяца (рекомендовано)                      │ │
│  │  [○] Через 1-3 месяца                                      │ │
│  │  [○] Через 3-6 месяцев                                     │ │
│  │  [○] Другое: [_____________]                               │ │
│  │                                                             │ │
│  │  Ответственный:                                            │ │
│  │  [Dropdown: Выберите члена семьи...    ▾]                  │ │
│  │  • Владислав (вы)                                          │ │
│  │  • Мария                                                   │ │
│  │  • Дмитрий                                                 │ │
│  │  • Анна                                                    │ │
│  │  • Сергей                                                  │ │
│  │  • Несколько человек (co-owners)                           │ │
│  │                                                             │ │
│  │  Первый конкретный шаг:                                    │ │
│  │  ┌─────────────────────────────────────────────────────┐  │ │
│  │  │ Запланировать kickoff meeting с фасилитатором для   │  │ │
│  │  │ succession workshop                                 │  │ │
│  │  │                                                     │  │ │
│  │  └─────────────────────────────────────────────────────┘  │ │
│  │  💡 Suggestion: "Запланировать kickoff meeting с           │ │
│  │     фасилитатором для succession workshop"                 │ │
│  │                                                             │ │
│  │  Целевая дата завершения:                                  │ │
│  │  [Date picker: Март 2026        📅]                        │ │
│  │                                                             │ │
│  │  ✓ Отправить календарное напоминание за 1 неделю           │ │
│  │                                                             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  📋 Приоритет 2: Установить governance structures          │ │
│  │                                                             │ │
│  │  [Similar form fields as above...]                         │ │
│  │                                                             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  📋 Приоритет 3: Межпоколенческий диалог о финансах       │ │
│  │                                                             │ │
│  │  [Similar form fields...]                                  │ │
│  │                                                             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  📅 Suggested Timeline                                      │ │
│  │                                                             │ │
│  │  Ноябрь 2025:   Launch Succession Workshop                │ │
│  │  Декабрь 2025:  Complete succession plan draft            │ │
│  │  Январь 2026:   Start Governance Workshop                 │ │
│  │  Февраль 2026:  Family meeting: financial transparency    │ │
│  │  Март 2026:     Review progress & adjust plan             │ │
│  │                                                             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  [← Back to priorities]     [Save Action Plan]     [Continue →]  │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### Component Specifications

#### Timeline Options
- Radio buttons with predefined options
- "Другое" option with date picker
- Default: "В течение месяца" for critical priorities

#### Owner Dropdown
- All family members from session
- "Co-owners" option → multi-select modal
- Shows role next to name (G1, G2, etc.)

#### First Step Text Area
- Free-form text input
- AI suggestion based on priority
- Click suggestion to auto-fill
- Max 500 characters

#### Target Date Picker
- Calendar interface
- Default: Estimated duration from priority selection
- Validation: Must be future date

#### Suggested Timeline
- Auto-generated based on selections
- Shows sequential ordering
- Considers dependencies
- Adjusts as user changes dates

### Data Model

```typescript
interface ActionPlan {
  plan_id: string;
  session_id: string;
  family_id: string;

  priorities: Array<{
    priority_id: string;
    rank: number;
    title: string;

    owner_user_id: string;
    co_owners?: string[];

    target_start: date;
    target_completion: date;

    first_step: string;
    milestones?: Milestone[];

    suggested_workshop_id?: string;
    workshop_booked?: boolean;

    status: 'not_started' | 'in_progress' | 'completed';
  }>;

  created_at: timestamp;
  created_by: string;

  reminder_settings: {
    email_reminders: boolean;
    reminder_frequency: 'weekly' | 'biweekly' | 'monthly';
  };
}

interface Milestone {
  milestone_id: string;
  title: string;
  target_date: date;
  completed: boolean;
  completed_at?: timestamp;
}
```

### Validation Rules

```typescript
const validation = {
  owner_user_id: {
    required: true,
    errorMessage: "Выберите ответственного"
  },
  target_start: {
    required: true,
    futureDate: true,
    errorMessage: "Выберите дату начала в будущем"
  },
  target_completion: {
    required: true,
    afterStartDate: true,
    errorMessage: "Дата завершения должна быть после даты начала"
  },
  first_step: {
    required: true,
    minLength: 10,
    maxLength: 500,
    errorMessage: "Опишите первый шаг (10-500 символов)"
  }
};
```

---

## Screen 5.3: Export & Sharing

### Purpose
Export action plan and share with family members.

### Visual Layout

```
┌──────────────────────────────────────────────────────────────────┐
│  Action Plan Complete ✓                                           │
│  ═══════════════════════                                          │
│                                                                   │
│  Отличная работа! Ваш action plan создан и сохранён.              │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │  📋 Ваш Action Plan                                         │ │
│  │                                                             │ │
│  │  ✓ 3 приоритета определены                                 │ │
│  │  ✓ Ответственные назначены                                 │ │
│  │  ✓ Таймлайн установлен (ноябрь 2025 - март 2026)          │ │
│  │  ✓ Первые шаги описаны                                     │ │
│  │                                                             │ │
│  │  [Просмотреть полный план →]                               │ │
│  │                                                             │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  Экспортировать результаты:                                      │
│                                                                   │
│  Что включить в отчёт?                                            │
│  [☑] Общий dashboard с radar chart                               │
│  [☑] Детальные scores по измерениям                              │
│  [☑] AI-generated insights                                       │
│  [☑] Consensus analysis                                          │
│  [☐] Individual answers (требует разрешения участников)          │
│  [☑] Action plan с таймлайном                                    │
│  [☐] Facilitator notes (если была сессия с фасилитатором)        │
│                                                                   │
│  Формат экспорта:                                                │
│  [●] PDF Report (comprehensive, 20-30 страниц)                   │
│  [○] PowerPoint Slides (для презентации, 10-15 слайдов)          │
│  [○] Excel Spreadsheet (сырые данные для анализа)                │
│  [○] All formats (zip-архив)                                     │
│                                                                   │
│  [Generate & Download →]                                         │
│                                                                   │
│  ──────────────────────────────────────────────────────────      │
│                                                                   │
│  Поделиться с семьёй:                                            │
│                                                                   │
│  [☑] Мария (maria@example.com)                                   │
│  [☑] Дмитрий (dmitry@example.com)                                │
│  [☑] Анна (anna@example.com)                                     │
│  [☑] Сергей (sergey@example.com)                                 │
│  [☐] Внешний советник (advisor@example.com)                      │
│                                                                   │
│  Сообщение (опционально):                                        │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │ Мы завершили Family Governance Assessment. Прилагаю        │ │
│  │ результаты и action plan. Давайте обсудим на следующей     │ │
│  │ встрече.                                                   │ │
│  └────────────────────────────────────────────────────────────┘ │
│                                                                   │
│  [Отправить по email →]                                          │
│                                                                   │
│  ──────────────────────────────────────────────────────────      │
│                                                                   │
│  Следующие шаги:                                                 │
│                                                                   │
│  1. 📅 Запланировать встречу для обсуждения результатов         │
│     [Создать calendar event →]                                   │
│                                                                   │
│  2. 🎯 Забукировать recommended workshops                        │
│     • Succession Planning Workshop                               │
│       [View facilitators & book →]                               │
│     • Governance Structures Workshop                             │
│       [View facilitators & book →]                               │
│                                                                   │
│  3. 🔔 Настроить напоминания о progress                          │
│     [Weekly email updates] [Monthly check-ins]                   │
│                                                                   │
│  4. 📊 Запланировать re-assessment через 6-12 месяцев           │
│     [Schedule follow-up assessment →]                            │
│                                                                   │
│  [Вернуться на главную →]                                        │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### Export Options

#### PDF Report Contents
1. Executive Summary (1 page)
2. Methodology (1 page)
3. Radar Chart + Maturity Index (1 page)
4. Dimension Scores Breakdown (8 pages)
5. Consensus Analysis (2-3 pages)
6. AI Insights & Recommendations (3-5 pages)
7. Action Plan (2-3 pages)
8. Appendix: Individual Answers (optional, 5-10 pages)

#### PowerPoint Slides
- Slide 1: Title + Summary
- Slide 2: Overall Maturity
- Slide 3-10: Per-dimension results
- Slide 11: Consensus map
- Slide 12-13: Top insights
- Slide 14: Action plan timeline
- Slide 15: Next steps

#### Excel Spreadsheet
- Tab 1: Summary statistics
- Tab 2: Dimension scores (all users)
- Tab 3: Raw answers (anonymized or named)
- Tab 4: Consensus analysis
- Tab 5: Action plan

### Email Sharing

```
Subject: Family Governance Assessment Results - [Family Name]

Dear [Name],

We have completed the Family Governance Assessment workshop.
Attached are the results and our action plan for the next 6 months.

Key Highlights:
- Overall Maturity Index: 64/100 (Developing Family)
- Strongest area: Communication & Trust (78/100)
- Priority focus: Succession planning & Governance structures

Next Steps:
- Review attached report
- Discuss at family meeting on [Date]
- Begin Succession Planning Workshop in November

Please review and share your thoughts.

Best regards,
[Sender Name]

---
Generated by ReFamily Assessment Platform
```

---

## Phase 5 Summary

### Total Screens
1. Priority Selection (5.1)
2. Timeline & Accountability (5.2)
3. Export & Sharing (5.3)

### Key Features
✓ Select top 3 priorities from insights
✓ Assign owners and timelines
✓ Define first concrete steps
✓ Auto-generated timeline
✓ Export to PDF/PPT/Excel
✓ Share with family via email
✓ Book workshops directly
✓ Set up progress reminders
✓ Schedule re-assessment

### User Outcomes
- Clear action plan with 3 priorities
- Accountability assigned
- Timelines established
- Next steps defined
- Family alignment on path forward
- Scheduled workshops (if applicable)
- Reminder system in place

### Post-Assessment Journey
1. **Week 1:** Family meeting to discuss results
2. **Week 2-4:** Begin first priority
3. **Month 2:** Progress check-in
4. **Month 3:** Launch second priority
5. **Month 6:** Review progress, adjust plan
6. **Month 12:** Re-assessment to measure improvement

---

## Completion

**🎉 Assessment Workshop Complete!**

User has now:
- ✅ Completed 105 questions across 8 dimensions
- ✅ Received personalized insights and recommendations
- ✅ Created actionable plan with clear priorities
- ✅ Assigned ownership and timelines
- ✅ Exported and shared results
- ✅ Booked next workshops (optional)

**Return to platform dashboard** → Track progress on action items

---

**Workshop Flow Complete:** Assessment → Insights → Action Plan → Execution

**Related Workshops:** Succession Planning, Governance Structures, Decision Making, Financial Transparency
