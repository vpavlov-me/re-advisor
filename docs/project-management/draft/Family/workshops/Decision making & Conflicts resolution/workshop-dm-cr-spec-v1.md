---
doc_id: "DOC-WRK-DMCR-001"
title: "Decision Making & Conflict Resolution Workshop - Digital Interface Specification"
type: "workshop-specification"
category: "product"
audience: "product-manager|designer|developer"
complexity: "advanced"
version: "2.0.0"
status: "draft"
tags: ["workshop", "decision-making", "conflict-resolution", "governance", "zero-defaults"]
---

# Decision Making & Conflict Resolution Workshop
## Digital Interface Specification

> **Критический принцип**: Zero Defaults - участники принимают каждое решение самостоятельно. Никаких pre-selected опций, никаких "рекомендованных" значений по умолчанию.

---

## 📋 Обзор воркшопа

### Цель
Создать Governance Blueprint с четкими ролями и правами через collaborative digital workshop, где семья принимает все решения самостоятельно.

### Параметры
- **Длительность**: 3-3.5 часа
- **Формат**: Real-time digital collaboration
- **Участники**: Family Council, Board Directors, CEO, Consultant
- **Язык**: Русский (с возможностью переключения)

### Технический стек
```
Frontend:
├── Advisor Portal (3002) - Facilitator
└── Family Portal (3001) - Participants

Backend:
├── Education Service (8006) - Workshop engine
├── Decision Making (8009) - RACI matrix
├── Conflict Resolution (8015) - Escalation
├── Constitution (8002) - Documents
├── Meeting Service (8003) - Calendar
└── Auth Service (8001) - Roles

Real-time:
├── WebSocket - Collaborative editing
└── Redis pub/sub - Live updates
```

---

## 🎯 10 Этапов воркшопа

### Навигация
- Linear progression (1→2→3...→10)
- Facilitator контролирует переходы
- Можно вернуться назад
- Auto-save на каждом этапе
- Progress indicator: "Stage 3 of 10"

---

## Stage 1: Kick-off и Ground Rules (10 мин)

### Цель
Установить правила работы и роли участников

### UI Layout
```
┌──────────────────────────────────────────────────┐
│ Stage 1 of 10: Kick-off | ⏱️ 10:00 | 👥 8 online │
├──────────────────────────────────────────────────┤
│                                                  │
│ Ground Rules (выберите применимые):              │
│ [ ] Конфиденциальность                          │
│ [ ] Одна повестка                               │
│ [ ] Все голоса важны                            │
│ [ ] Документация решений                         │
│ [ ] Parking lot для off-topic                   │
│ [ ] Уважение ко времени                         │
│ [+ Добавить свое правило]                       │
│                                                  │
│ Формат принятия решений на сегодня:              │
│ ( ) Simple majority (50%+)                       │
│ ( ) Supermajority (66%+)                         │
│ ( ) Consensus (все согласны)                     │
│ ( ) Facilitator guides, FC decides               │
│                                                  │
│ Кто принимает финальные решения:                 │
│ [ ] Только Family Council members                │
│ [ ] Все участники (включая Board)               │
│ [ ] По типу решения (выбрать далее)             │
│                                                  │
│ Конфиденциальность:                              │
│ ( ) Всё обсуждение конфиденциально               │
│ ( ) Только решения публичны                      │
│ ( ) Полная прозрачность для семьи                │
│                                                  │
│ [Сохранить Ground Rules] [Начать Workshop →]     │
└──────────────────────────────────────────────────┘
```

### Данные для сохранения
```json
{
  "stage_1": {
    "ground_rules": ["confidentiality", "one_agenda", ...],
    "custom_rules": ["текст кастомного правила"],
    "decision_format": "simple_majority",
    "final_decision_makers": ["family_council"],
    "confidentiality_level": "discussions_confidential",
    "participants_accepted": [
      {"user_id": "uuid", "accepted_at": "timestamp"}
    ]
  }
}
```

### Валидация перехода на Stage 2
- ✅ Минимум 1 ground rule выбрано
- ✅ Decision format выбран
- ✅ Decision makers определены
- ✅ Все участники приняли правила (checkbox)

---

## Stage 2: Three Circles Model (10 мин)

### Цель
Визуализировать пересечения Family/Ownership/Business для каждого участника

### UI Layout
```
┌──────────────────────────────────────────────────┐
│ Stage 2 of 10: Three Circles | ⏱️ 10:00          │
├──────────────────────────────────────────────────┤
│                                                  │
│  Перетащите участников в соответствующие круги: │
│                                                  │
│       ┌─────────────┐                            │
│      /   FAMILY     \                            │
│     /                \                           │
│    │                  │                          │
│     \      ┌────┐    /                           │
│      \─────│BOTH├───/                            │
│            │ALL │                                │
│        ┌───│ 3  │───┐                            │
│       /    └────┘    \                           │
│      /                 \                         │
│     │   OWNERSHIP      │                         │
│      \                 /                         │
│       \───────────────/                          │
│          \         /                             │
│           \       /                              │
│            \     /   BUSINESS                    │
│             \   /                                │
│              \ /                                 │
│           ┌─────┐                                │
│           │     │                                │
│           └─────┘                                │
│                                                  │
│  Participant Cards (drag to circles):            │
│  👤 Maria (FC)    👤 John (FC)                   │
│  👤 Sarah (Board) 👤 David (CEO)                 │
│  👤 Alex (Advisor) 👤 Emma (Family)              │
│                                                  │
│  [Reset] [← Previous] [Save & Continue →]        │
└──────────────────────────────────────────────────┘
```

### Интерактивность
- Drag & drop участников
- Может быть в нескольких кругах одновременно
- Пересечения автоматически определяются
- Real-time sync для всех участников
- Facilitator может двигать любые карточки
- Participants могут двигать только свои (опционально)

### Данные для сохранения
```json
{
  "stage_2": {
    "three_circles_placement": {
      "family_only": ["user_id_1", "user_id_2"],
      "ownership_only": ["user_id_3"],
      "business_only": ["user_id_4"],
      "family_ownership": ["user_id_5"],
      "family_business": [],
      "ownership_business": ["user_id_6"],
      "all_three": ["user_id_7", "user_id_8"]
    },
    "complexity_score": 7,
    "diagram_snapshot": "base64_image"
  }
}
```

### Валидация перехода на Stage 3
- ✅ Все участники размещены хотя бы в одном круге
- ⚠️ Warning если >50% в "all three" (high complexity)

---

## Stage 3: Governance Bodies (25 мин)

### Цель
Определить 4 ключевых органа управления: Assembly, Council, Board, Management

### UI Layout (повторяется 4 раза для каждого body)
```
┌──────────────────────────────────────────────────┐
│ Stage 3 of 10: Governance Bodies | ⏱️ 25:00      │
│ Body 1 of 4: Family Assembly                     │
├──────────────────────────────────────────────────┤
│                                                  │
│ Mandate (опишите роль и ответственность):        │
│ ┌────────────────────────────────────────────┐  │
│ │                                            │  │
│ │  [Пустое текстовое поле, 500 символов]    │  │
│ │                                            │  │
│ └────────────────────────────────────────────┘  │
│                                                  │
│ Composition & Voting:                            │
│ Кто может быть членом?                          │
│ [ ] Все взрослые члены семьи                    │
│ [ ] Возраст 18+                                 │
│ [ ] Возраст 21+                                 │
│ [ ] Только shareholders                         │
│ [ ] Включая супругов                            │
│ [ ] Кастомный критерий: _________________       │
│                                                  │
│ Voting Rights:                                   │
│ ( ) One person = one vote                        │
│ ( ) Weighted by ownership %                      │
│ ( ) Hybrid model (опишите): ______________      │
│                                                  │
│ Quorum & Thresholds:                             │
│ Quorum required: [____]% присутствуют            │
│ Simple decisions: [____]% одобряют               │
│ Major decisions: [____]% одобряют                │
│                                                  │
│ Meeting Frequency:                               │
│ ( ) Annually (1x/year)                           │
│ ( ) Semi-annually (2x/year)                      │
│ ( ) Quarterly (4x/year)                          │
│ ( ) Custom: [________________]                   │
│                                                  │
│ Exclusive Powers (выберите):                     │
│ [ ] Amend Family Constitution                    │
│ [ ] Elect/remove FC members                      │
│ [ ] Approve dividend policy                      │
│ [ ] Major asset transactions (>$[___])           │
│ [ ] Другое: ___________________                 │
│                                                  │
│ [← Previous Body] [Save Body] [Next Body →]      │
└──────────────────────────────────────────────────┘
```

### 4 Bodies для заполнения

**1. Family Assembly**
- Mandate: пустое поле
- Composition: все чекбоксы unchecked
- Voting: все radio buttons unselected
- Quorum: пустое поле
- Frequency: все options unselected
- Powers: все чекбоксы unchecked

**2. Family Council**
Дополнительные поля:
```
Council Size:
Minimum: [___] members
Maximum: [___] members
Target: [___] members

Representation Requirements:
Generation quotas:
[ ] Min [__] from Gen 1
[ ] Min [__] from Gen 2
[ ] Min [__] from Gen 3

Branch quotas:
( ) Each branch min 1 seat
( ) Proportional to ownership
( ) No requirements

Reserved Seats:
[ ] [__] seats for NextGen (under [__] age)
[ ] [__] seats for founders
[ ] No reserved seats
```

**3. Board of Directors**
Дополнительные поля:
```
Board Composition:
Family directors: [___] seats
Independent directors: [___] seats

FC Liaison:
( ) FC has observer seat (no vote)
( ) FC has voting seat
( ) No FC representation

Nomination Process:
( ) Assembly nominates
( ) FC nominates
( ) Nominations committee
( ) Other: ________________
```

**4. Management Team**
Дополнительные поля:
```
CEO Appointment:
( ) Board appoints
( ) Assembly approves
( ) FC recommends, Board decides
( ) Other: ________________

Family Employment Policy:
( ) Family members can work in business
( ) Restricted (требования): ___________
( ) Not allowed
( ) Decided case-by-case

Reporting:
CEO reports to:
[ ] Board
[ ] FC (informal)
[ ] Both
```

### Данные для сохранения
```json
{
  "stage_3": {
    "governance_bodies": {
      "family_assembly": {
        "mandate": "user_entered_text",
        "eligibility": {
          "adult_family": true,
          "age_minimum": 18,
          "shareholders_only": false,
          "include_spouses": true,
          "custom_criteria": []
        },
        "voting_model": "one_person_one_vote",
        "quorum": 50,
        "thresholds": {
          "simple": 50,
          "major": 66
        },
        "meeting_frequency": "semi_annual",
        "exclusive_powers": ["amend_constitution", "elect_fc"]
      },
      "family_council": {...},
      "board_of_directors": {...},
      "management": {...}
    }
  }
}
```

### Валидация перехода на Stage 4
- ✅ Все 4 bodies имеют mandate (не пустой)
- ✅ Все numeric fields заполнены
- ✅ Минимум 1 exclusive power выбрано для каждого body
- ⚠️ Warning если overlap в powers между bodies

---

## Stage 4: RACI Matrix (40 мин) ⭐

### Цель
Определить для 25-30 ключевых решений: кто Responsible, Accountable, Consulted, Informed

### UI Layout
```
┌──────────────────────────────────────────────────┐
│ Stage 4 of 10: RACI Matrix | ⏱️ 40:00            │
│ Decision 3 of 27: Amend Family Constitution      │
├──────────────────────────────────────────────────┤
│                                                  │
│ Category: Family Governance                      │
│ Frequency: Rare (as needed)                      │
│ Impact: Very High                                │
│                                                  │
│ ┌────────────────────────────────────────────┐  │
│ │ Assign RACI Roles:                         │  │
│ │                                            │  │
│ │                  R    A    C    I          │  │
│ │ Family Assembly  [ ]  [ ]  [ ]  [ ]        │  │
│ │ Family Council   [ ]  [ ]  [ ]  [ ]        │  │
│ │ Board Directors  [ ]  [ ]  [ ]  [ ]        │  │
│ │ Management       [ ]  [ ]  [ ]  [ ]        │  │
│ │ Legal Advisor    [ ]  [ ]  [ ]  [ ]        │  │
│ │                                            │  │
│ │ Validation:                                │  │
│ │ ⚠️  Нужно выбрать ровно 1 "A"              │  │
│ │ ⚠️  Нужно минимум 1 "R"                    │  │
│ └────────────────────────────────────────────┘  │
│                                                  │
│ Discussion Notes (опционально):                  │
│ ┌────────────────────────────────────────────┐  │
│ │                                            │  │
│ └────────────────────────────────────────────┘  │
│                                                  │
│ [← Previous Decision] [Save] [Next Decision →]   │
│                                                  │
│ Progress: █████░░░░░░░░░░░░░ 3/27 (11%)         │
└──────────────────────────────────────────────────┘
```

### 5 Категорий решений (27 total)

**1. Family Governance (6 decisions)**
1. Amend Family Constitution
2. Elect/remove Family Council members
3. Change FA meeting frequency
4. Approve FC committee structure
5. Adopt family policies
6. Change FA voting rules

**2. Business Strategy (6 decisions)**
7. Approve annual business strategy
8. Approve M&A transactions (>$X)
9. Approve annual budget
10. Appoint/remove CEO
11. Approve executive compensation
12. Change dividend distribution policy

**3. Financial & Assets (5 decisions)**
13. Approve capital expenditures (>$X)
14. Approve investment strategies
15. Sell/acquire major assets
16. Approve borrowing/debt
17. Change asset allocation

**4. Family Employment (4 decisions)**
18. Approve family employment policy
19. Hire family member into business
20. Approve NextGen programs
21. Fund family education

**5. Brand & Reputation (6 decisions)**
22. Approve use of family name/brand
23. Approve philanthropy strategy
24. Approve charitable commitments
25. Manage reputation crisis
26. Public statements on family matters
27. Social media policy for family

### Интерактивность

**RACI Rules (enforced by system):**
- Only ONE "A" checkbox can be selected per decision
- If user tries to select 2nd "A", show error modal:
  ```
  ⚠️ Только одна роль может быть Accountable
  
  Сейчас: Family Assembly = A
  Вы пытаетесь: Family Council = A
  
  [Remove Assembly's A first] [Cancel]
  ```
- Must have at least one "R" selected
- C and I are optional
- Real-time validation показывает статус

**Voting on disputes:**
```
Если участники не согласны с RACI assignment:

┌────────────────────────────────────────┐
│ 🗳️ Vote: Who should be Accountable?   │
│                                        │
│ ( ) Family Assembly                    │
│ ( ) Family Council                     │
│ ( ) Board of Directors                 │
│ ( ) Other: ___________                 │
│                                        │
│ Timer: ⏱️ 2:00 remaining                │
│                                        │
│ Current votes:                         │
│ Family Assembly: ⬤⬤⬤⬤ (4)              │
│ Family Council: ⬤⬤ (2)                 │
│                                        │
│ [Submit Vote]                          │
└────────────────────────────────────────┘
```

**Bulk actions:**
```
[✓] Decision 9: Annual strategy
[✓] Decision 10: M&A transactions  
[✓] Decision 11: Annual budget

[Apply RACI Pattern ▼]
├─ Board decides, Management executes
├─ FC decides, Board recommends
└─ Custom pattern...
```

**Add custom decision:**
```
[+ Add Custom Decision]

Category: [Выберите ▼]
Title: _______________________
Description: __________________
Frequency: [Выберите ▼]
Impact: [Выберите ▼]

[Add Decision]
```

### Данные для сохранения
```json
{
  "stage_4": {
    "raci_matrix": {
      "decisions": [
        {
          "decision_id": "uuid",
          "category": "family_governance",
          "title": "Amend Family Constitution",
          "raci_assignments": {
            "family_assembly": "A",
            "family_council": "R",
            "board_of_directors": "C",
            "management": "I",
            "legal_counsel": "C"
          },
          "discussion_notes": "Assembly must approve per charter",
          "vote_history": []
        }
      ]
    }
  }
}
```

### Валидация перехода на Stage 5
- ✅ Все 27 decisions имеют ровно 1 "A"
- ✅ Все 27 decisions имеют минимум 1 "R"
- ⚠️ Warning если conflicts detected (AI analysis)
- 🚫 BLOCK если хотя бы 1 decision не имеет "A"

---

## Stage 5: Meeting Calendar (20 мин)

### Цель
Создать годовой календарь встреч для всех governance bodies

### UI Layout - Step 1: Set Frequencies
```
┌──────────────────────────────────────────────────┐
│ Stage 5 of 10: Meeting Calendar | ⏱️ 20:00       │
│ Step 1 of 2: Set Meeting Frequencies             │
├──────────────────────────────────────────────────┤
│                                                  │
│ Body: Family Assembly                            │
│ ────────────────────────────────────────         │
│                                                  │
│ Meeting Frequency:                               │
│ ( ) Annually (1x/year)                           │
│ ( ) Semi-annually (2x/year)                      │
│ ( ) Quarterly (4x/year)                          │
│ ( ) Custom: [_________]                          │
│                                                  │
│ Preferred Months (multi-select):                 │
│ [ ] January    [ ] July                          │
│ [ ] February   [ ] August                        │
│ [ ] March      [ ] September                     │
│ [ ] April      [ ] October                       │
│ [ ] May        [ ] November                      │
│ [ ] June       [ ] December                      │
│                                                  │
│ Duration per meeting:                            │
│ [___] hours                                      │
│                                                  │
│ Location preference:                             │
│ ( ) In-person only                               │
│ ( ) Remote only                                  │
│ ( ) Hybrid                                       │
│                                                  │
│ Coordination:                                    │
│ [ ] Schedule before: [Select body ▼]            │
│ [ ] Schedule after: [Select body ▼]             │
│ [ ] Buffer days: [___] between meetings          │
│                                                  │
│ Bodies: [Assembly ✓] [Council  ] [Board  ]      │
│         [Committees  ] [Joint Sessions  ]        │
│                                                  │
│ [← Previous Body] [Next Body →] [Build Calendar] │
└──────────────────────────────────────────────────┘
```

### UI Layout - Step 2: Build Calendar
```
┌──────────────────────────────────────────────────┐
│ Step 2 of 2: Annual Governance Calendar (2025)   │
├──────────────────────────────────────────────────┤
│                                                  │
│  Q1: January - March 2025                        │
│  ┌───────┬───────┬───────┬───────┬───────┐      │
│  │  Jan  │  Feb  │  Mar  │  Apr  │  May  │      │
│  ├───────┼───────┼───────┼───────┼───────┤      │
│  │ [+]   │       │       │ [+]   │       │      │
│  │       │       │ [+]   │       │       │      │
│  │       │       │       │       │       │      │
│  └───────┴───────┴───────┴───────┴───────┘      │
│                                                  │
│  Drag meeting cards to calendar dates:           │
│  📋 FC Meeting Q1  📋 FC Meeting Q2              │
│  🟢 FA Meeting 1   🟢 FA Meeting 2               │
│  🟦 Board Q1       🟦 Board Q2                   │
│  🟡 Joint Session 1                              │
│                                                  │
│  [Auto-Schedule] [Clear All] [Export iCal]       │
│  [← Set Frequencies] [Save Calendar →]           │
└──────────────────────────────────────────────────┘
```

### Интерактивность

**Drag & Drop:**
- Meeting cards можно перетаскивать на даты
- Snap to weeks
- Показывает conflicts (2 meetings на одну дату)
- Color-coded по типу body

**Auto-Schedule:**
```
Click [Auto-Schedule] →

┌────────────────────────────────────────┐
│ Auto-Schedule Settings                 │
│                                        │
│ Algorithm will:                        │
│ ✓ Apply frequencies from Step 1       │
│ ✓ Follow coordination rules            │
│ ✓ Avoid major holidays                 │
│ ✓ Distribute evenly across year        │
│                                        │
│ This is a SUGGESTION only.             │
│ You can move any meeting after.        │
│                                        │
│ [Cancel] [Generate Suggestion]         │
└────────────────────────────────────────┘
```

**Conflict Detection:**
```
⚠️ Date Conflict

FC Meeting Q2: June 12, 2025
Board Meeting: June 12, 2025

[Keep Both (different times)]
[Move FC to June 5]
[Move Board to June 19]
[Choose Date Manually]
```

**Meeting Details:**
Click любой meeting card на календаре:
```
┌────────────────────────────────────────┐
│ FC Meeting Q2 - Details                │
│                                        │
│ Date: June 12, 2025                    │
│ Time: [14:00] - [18:00]                │
│ Duration: 4 hours                      │
│                                        │
│ Location:                              │
│ ( ) In-person: [____________]          │
│ ( ) Remote: [Zoom/Teams]               │
│ (•) Hybrid                             │
│                                        │
│ Standard Agenda:                       │
│ [✓] Review Q1 actions                  │
│ [✓] Prepare FA materials               │
│ [✓] Committee updates                  │
│ [✓] Decision proposals                 │
│ [ ] Custom: ___________                │
│                                        │
│ Invitees: (from Stage 3)               │
│ ✓ All 5 FC members                     │
│ ✓ Secretary                            │
│ [ ] External consultant                │
│                                        │
│ [Save Changes] [Delete Meeting]        │
└────────────────────────────────────────┘
```

### Данные для сохранения
```json
{
  "stage_5": {
    "meeting_frequencies": {
      "family_assembly": {
        "frequency": "semi_annual",
        "count_per_year": 2,
        "preferred_months": ["March", "September"],
        "duration_hours": 8,
        "location": "hybrid",
        "coordination_rules": []
      }
    },
    "annual_calendar": [
      {
        "meeting_id": "uuid",
        "meeting_type": "family_council",
        "date": "2025-01-15",
        "time_start": "14:00",
        "time_end": "18:00",
        "location": "hybrid",
        "location_details": "Family Office + Zoom",
        "invitees": ["user_id_1", "user_id_2"],
        "agenda_items": ["review_actions", "prepare_fa"]
      }
    ]
  }
}
```

### Валидация перехода на Stage 6
- ✅ Минимальные частоты соблюдены (Assembly ≥1x/year, FC ≥2x/year)
- ⚠️ Warning если gaps >90 дней между FC meetings
- ⚠️ Warning если conflicts остались

---

## Stage 6: Family Council Elections (30 мин)

### Цель
Создать устав Family Council с правилами выборов

### UI Layout - 7 Sections

**Section Navigation:**
```
[1.Eligibility ✓] [2.Composition ✓] [3.Term Length  ]
[4.Elections  ] [5.Committees  ] [6.Removal  ] [7.Conflicts  ]

Progress: ████████░░░░░░░ 2/7 (29%)
```

---

**Section 1: Eligibility**
```
┌──────────────────────────────────────────────────┐
│ FC Charter - Section 1 of 7: Eligibility         │
├──────────────────────────────────────────────────┤
│                                                  │
│ Кто может быть избран в Family Council?          │
│                                                  │
│ Basic Requirements:                              │
│ [ ] Adult family members                         │
│ [ ] Age 18+                                      │
│ [ ] Age 21+                                      │
│ [ ] Age 25+                                      │
│ [ ] Custom age: [___]                            │
│                                                  │
│ [ ] Shareholders only                            │
│ [ ] Include spouses                              │
│ [ ] NextGen members (under 30)                   │
│                                                  │
│ Professional Experience:                         │
│ ( ) Not required                                 │
│ ( ) Minimum [___] years (any field)              │
│ ( ) Specific field: _________________            │
│                                                  │
│ Residency:                                       │
│ ( ) No requirement                               │
│ ( ) Must live in [Country/Region]                │
│ ( ) Custom: ___________________                  │
│                                                  │
│ Work Status:                                     │
│ ( ) Can work in family business                  │
│ ( ) Cannot work in family business               │
│ ( ) No restriction                               │
│                                                  │
│ Disqualifying Factors:                           │
│ [ ] Bankruptcy                                   │
│ [ ] Criminal conviction                          │
│ [ ] Active family conflict                       │
│ [ ] Divorce from family member                   │
│ [ ] Other: ___________________                   │
│                                                  │
│ 💡 Based on Stage 2: ~12 people eligible         │
│                                                  │
│ [Save Section] [Next Section →]                  │
└──────────────────────────────────────────────────┘
```

---

**Section 2: Composition**
```
┌──────────────────────────────────────────────────┐
│ FC Charter - Section 2 of 7: Composition         │
├──────────────────────────────────────────────────┤
│                                                  │
│ Council Size:                                    │
│ Minimum: [___] members                           │
│ Maximum: [___] members                           │
│ Target: [___] members                            │
│                                                  │
│ Representation Requirements:                     │
│                                                  │
│ By Generation:                                   │
│ [ ] Min [__] from Gen 1 (founders)               │
│ [ ] Min [__] from Gen 2                          │
│ [ ] Min [__] from Gen 3                          │
│ [ ] Min [__] from Gen 4                          │
│ [ ] No generation requirements                   │
│                                                  │
│ By Family Branch:                                │
│ ( ) Each branch min 1 seat                       │
│ ( ) Proportional to ownership                    │
│ ( ) No branch requirements                       │
│                                                  │
│ By Role/Expertise:                               │
│ [ ] Min [__] with business background            │
│ [ ] Min [__] with nonprofit experience           │
│ [ ] Min [__] NextGen representatives             │
│ [ ] No role requirements                         │
│                                                  │
│ Gender/Diversity:                                │
│ [ ] Strive for gender balance                    │
│ [ ] No specific requirements                     │
│                                                  │
│ Reserved Seats:                                  │
│ [ ] [__] seats for NextGen (under [__] age)      │
│ [ ] [__] seats for founder generation            │
│ [ ] No reserved seats                            │
│                                                  │
│ [← Previous Section] [Save] [Next Section →]     │
└──────────────────────────────────────────────────┘
```

---

**Section 3: Term Length & Rotation**
```
┌──────────────────────────────────────────────────┐
│ FC Charter - Section 3 of 7: Term Length         │
├──────────────────────────────────────────────────┤
│                                                  │
│ Term Duration:                                   │
│ ( ) 1 year                                       │
│ ( ) 2 years                                      │
│ ( ) 3 years                                      │
│ ( ) Custom: [___] years                          │
│                                                  │
│ Term Limits:                                     │
│ Consecutive terms max: [___] (0 = no limit)      │
│ Total lifetime terms max: [___] (0 = no limit)   │
│ Cool-off period: [___] years (0 = none)          │
│                                                  │
│ Rotation Schedule:                               │
│ ( ) Staggered (half council rotates each cycle)  │
│ ( ) All at once (full election every term)       │
│ ( ) Custom rotation pattern: ___________         │
│                                                  │
│ If Staggered:                                    │
│ Year 1: [___] seats up for election              │
│ Year 2: [___] seats up for election              │
│                                                  │
│ Re-election:                                     │
│ [ ] Members can run for re-election              │
│ [ ] Requires new nomination (not automatic)      │
│ [ ] Requires family re-confirmation              │
│                                                  │
│ [← Previous] [Save] [Next →]                     │
└──────────────────────────────────────────────────┘
```

---

**Section 4: Election Process**
```
┌──────────────────────────────────────────────────┐
│ FC Charter - Section 4 of 7: Elections           │
├──────────────────────────────────────────────────┤
│                                                  │
│ Nomination Process:                              │
│ Who can nominate candidates?                     │
│ [ ] Self-nomination allowed                      │
│ [ ] Any family member can nominate               │
│ [ ] Only current FC can nominate                 │
│ [ ] Nominations committee                        │
│                                                  │
│ Nomination Requirements:                         │
│ [ ] Statement of interest (max [___] words)      │
│ [ ] Endorsements from [__] family members        │
│ [ ] Acceptance of fiduciary duty                 │
│ [ ] Interview with committee                     │
│ [ ] Other: ___________________                   │
│                                                  │
│ Voting Method:                                   │
│ ( ) Simple plurality (most votes wins)           │
│ ( ) Majority required (50%+)                     │
│ ( ) Supermajority ([___]%+)                      │
│ ( ) Single Transferable Vote (STV)               │
│ ( ) Approval voting (vote for multiple)          │
│ ( ) Cumulative voting (distribute points)        │
│                                                  │
│ Voting Rights:                                   │
│ Who can vote in FC elections?                    │
│ ( ) All Family Assembly members                  │
│ ( ) Shareholders only                            │
│ ( ) Weighted by ownership %                      │
│ ( ) One vote per branch                          │
│ ( ) Custom: ___________________                  │
│                                                  │
│ Voting Format:                                   │
│ ( ) Secret ballot (anonymous)                    │
│ ( ) Open ballot (public)                         │
│ ( ) Mixed (open nomination, secret final)        │
│                                                  │
│ Quorum for Election:                             │
│ [___]% of eligible voters must participate       │
│                                                  │
│ Election Timeline:                               │
│ Nominations open: [___] days before term end     │
│ Nominations close: [___] days before term end    │
│ Voting period: [___] days                        │
│ Results announced: [___] days before term start  │
│                                                  │
│ [← Previous] [Save] [Next →]                     │
└──────────────────────────────────────────────────┘
```

---

**Section 5: Committees**
```
┌──────────────────────────────────────────────────┐
│ FC Charter - Section 5 of 7: Committees          │
├──────────────────────────────────────────────────┤
│                                                  │
│ Standing Committees (постоянные):                │
│                                                  │
│ [ ] NextGen Development Committee                │
│     Members: [__] FC + [__] NextGen              │
│     Chair: ( ) Rotating ( ) Appointed            │
│     Meets: [Quarterly ▼]                         │
│                                                  │
│ [ ] Philanthropy Committee                       │
│     Members: [__] FC + [__] External             │
│     Chair: ( ) Rotating ( ) Appointed            │
│     Meets: [Quarterly ▼]                         │
│                                                  │
│ [ ] Education & Development                      │
│     Members: [__] FC members                     │
│     Chair: ( ) Rotating ( ) Appointed            │
│     Meets: [Bi-annually ▼]                       │
│                                                  │
│ [ ] Asset Management                             │
│     Members: [__] FC + [__] Experts              │
│     Chair: ( ) Rotating ( ) Appointed            │
│     Meets: [Monthly ▼]                           │
│                                                  │
│ [+ Add Custom Committee]                         │
│                                                  │
│ Ad-Hoc Committees:                               │
│ [ ] FC can create temporary committees           │
│     Max duration: [___] months                   │
│     Requires: [Simple majority ▼] FC vote        │
│                                                  │
│ Committee Governance:                            │
│ [ ] All committees report to full FC             │
│ [ ] Minutes required for all meetings            │
│ [ ] Budget approval needed from FC               │
│ [ ] Committee decisions binding (vs advisory)    │
│                                                  │
│ Non-FC Participation:                            │
│ [ ] Non-FC family can serve on committees        │
│ [ ] Non-FC can attend as observers               │
│ [ ] Non-FC can vote on recommendations           │
│                                                  │
│ [← Previous] [Save] [Next →]                     │
└──────────────────────────────────────────────────┘
```

---

**Section 6: Removal & Vacancy**
```
┌──────────────────────────────────────────────────┐
│ FC Charter - Section 6 of 7: Removal             │
├──────────────────────────────────────────────────┤
│                                                  │
│ Voluntary Resignation:                           │
│ [ ] Member can resign anytime                    │
│     Notice period: [___] days minimum            │
│ [ ] Must complete current term                   │
│                                                  │
│ Involuntary Removal:                             │
│ Grounds for removal:                             │
│ [ ] Non-attendance (missed [__] meetings)        │
│ [ ] Conflict of interest violations              │
│ [ ] Breach of confidentiality                    │
│ [ ] Criminal conviction                          │
│ [ ] Conduct harmful to family                    │
│ [ ] Custom grounds: _______________              │
│                                                  │
│ Who Can Initiate Removal:                        │
│ [ ] Any [__] family members petition             │
│ [ ] Any [__] FC members vote                     │
│ [ ] Family Assembly vote only                    │
│ [ ] Other: ___________________                   │
│                                                  │
│ Removal Vote Required:                           │
│ ( ) Simple majority of FA                        │
│ ( ) Supermajority ([___]%) of FA                 │
│ ( ) Unanimous FC vote                            │
│ ( ) Other: ___________________                   │
│                                                  │
│ Due Process:                                     │
│ [ ] Member receives written notice of grounds    │
│ [ ] Member can present defense                   │
│ [ ] Independent review/mediator                  │
│ [ ] Final vote by Family Assembly                │
│                                                  │
│ Vacancy Filling:                                 │
│ ( ) Special election within [___] days           │
│ ( ) FC appoints interim member                   │
│ ( ) Seat empty until next election               │
│                                                  │
│ Interim Appointment:                             │
│ ( ) Serves remainder of term                     │
│ ( ) Serves until next regular election           │
│ Counts toward lifetime limit?                    │
│ ( ) Yes  ( ) No  ( ) Partial count               │
│                                                  │
│ [← Previous] [Save] [Next →]                     │
└──────────────────────────────────────────────────┘
```

---

**Section 7: Conflict of Interest**
```
┌──────────────────────────────────────────────────┐
│ FC Charter - Section 7 of 7: Conflicts           │
├──────────────────────────────────────────────────┤
│                                                  │
│ Fiduciary Duty:                                  │
│ All FC members agree to:                         │
│ [ ] Act in best interest of entire family        │
│ [ ] Duty of loyalty to family as whole           │
│ [ ] Duty of care (informed decisions)            │
│ [ ] Duty of confidentiality                      │
│ [ ] Duty of impartiality (no favoritism)         │
│                                                  │
│ Conflict of Interest Disclosure:                 │
│ FC members must disclose:                        │
│ [ ] Business transactions with family entities   │
│ [ ] Personal financial interests                 │
│ [ ] Outside board positions                      │
│ [ ] Relationships with vendors/advisors          │
│ [ ] Family disputes or litigation                │
│ [ ] Other: ___________________                   │
│                                                  │
│ Disclosure Frequency:                            │
│ [ ] Annual declaration (at year start)           │
│ [ ] Per-meeting declaration                      │
│ [ ] Ad-hoc when conflict arises                  │
│                                                  │
│ Conflict Management:                             │
│ When conflict identified:                        │
│ Step 1: [ ] Member discloses to full FC          │
│ Step 2: [ ] FC discusses and documents           │
│ Step 3: ( ) Member recuses from vote             │
│         ( ) Member can vote with disclosure      │
│         ( ) Member removed from discussion       │
│                                                  │
│ Serious/Material Conflicts:                      │
│ [ ] Requires Family Assembly approval            │
│ [ ] Member temporarily steps down                │
│ [ ] Member permanently removed                   │
│ [ ] Other: ___________________                   │
│                                                  │
│ Records & Transparency:                          │
│ [ ] All conflicts logged in register             │
│ [ ] Annual report to Family Assembly             │
│ [ ] Visible to all family members                │
│ [ ] Confidential (FC only)                       │
│                                                  │
│ Training:                                        │
│ New FC members receive:                          │
│ [ ] Fiduciary duty training ([__] hours)         │
│ [ ] Conflict policy review                       │
│ [ ] Governance orientation                       │
│ [ ] External certification                       │
│                                                  │
│ [← Previous] [Complete Charter →]                │
└──────────────────────────────────────────────────┘
```

### Данные для сохранения
```json
{
  "stage_6": {
    "fc_charter": {
      "eligibility": {
        "age_minimum": null,
        "shareholders_only": false,
        "include_spouses": false,
        "experience_years": null,
        "disqualifying_factors": []
      },
      "composition": {
        "size_min": null,
        "size_max": null,
        "size_target": null,
        "generation_quotas": {},
        "branch_rules": null,
        "reserved_seats": []
      },
      "term": {
        "duration_years": null,
        "consecutive_max": null,
        "lifetime_max": null,
        "cooloff_years": null,
        "rotation": null
      },
      "elections": {
        "nomination_by": [],
        "nomination_requirements": [],
        "voting_method": null,
        "voting_rights": null,
        "voting_format": null,
        "quorum": null,
        "timeline": {}
      },
      "committees": [],
      "removal": {
        "voluntary": {},
        "involuntary": {},
        "vacancy_filling": null
      },
      "conflicts": {
        "fiduciary_duties": [],
        "disclosure_items": [],
        "disclosure_frequency": [],
        "management_process": {},
        "transparency": null
      }
    }
  }
}
```

### Валидация перехода на Stage 7
- ✅ Все 7 sections completed (basic fields filled)
- ⚠️ Warning если размер Council < 3 or > 9
- ⚠️ Warning если term < 1 year or > 5 years
- ⚠️ Warning если quorum < 50%

---

## Stage 7: Board Interface (25 мин)

### Цель
Определить как Family Council и Board взаимодействуют

### UI Layout - 5 Topics

**Topic Navigation:**
```
[1.Liaison  ] [2.Joint Meetings  ] [3.Info Exchange  ]
[4.Expectations Letter  ] [5.Escalation  ]

Progress: ░░░░░░░░░░░░░░░ 0/5 (0%)
```

---

**Topic 1: FC Liaison to Board**
```
┌──────────────────────────────────────────────────┐
│ FC-Board Interface - Topic 1 of 5: Liaison       │
├──────────────────────────────────────────────────┤
│                                                  │
│ Family Council Liaison to Board of Directors     │
│                                                  │
│ Purpose: Bridge communication между FC и Board   │
│                                                  │
│ Selection Method:                                │
│ ( ) Rotating FC member (annual)                  │
│ ( ) Permanent FC chair                           │
│ ( ) Elected by FC for [__] year term             │
│ ( ) FC appoints & Board approves                 │
│ ( ) No liaison role                              │
│                                                  │
│ Attendance Rights:                               │
│ [ ] Attend all Board meetings                    │
│ [ ] Attend only general sessions (not exec)      │
│ [ ] Receive all Board materials in advance       │
│ [ ] Participate in Board discussions             │
│ [ ] Voting rights (usually NO)                   │
│ [ ] Can request agenda items                     │
│                                                  │
│ Reporting Obligations:                           │
│ [ ] Report to FC after each Board meeting        │
│     Timeline: within [___] hours                 │
│ [ ] Quarterly written report to FC               │
│ [ ] Annual comprehensive report                  │
│ [ ] Flag urgent issues immediately               │
│ [ ] Board performance evaluation                 │
│                                                  │
│ Confidentiality:                                 │
│ Liaison bound by:                                │
│ [ ] Board confidentiality rules                  │
│ [ ] FC disclosure obligations                    │
│ [ ] Legal/regulatory requirements                │
│                                                  │
│ How to resolve conflicts:                        │
│ ( ) Board rules take precedence                  │
│ ( ) FC disclosure takes precedence               │
│ ( ) Case-by-case basis                           │
│                                                  │
│ [Save Topic] [Next Topic →]                      │
└──────────────────────────────────────────────────┘
```

---

**Topic 2: Joint Strategic Sessions**
```
┌──────────────────────────────────────────────────┐
│ Topic 2 of 5: Joint FC + Board Sessions          │
├──────────────────────────────────────────────────┤
│                                                  │
│ Frequency:                                       │
│ ( ) Annually (1x/year)                           │
│ ( ) Semi-annually (2x/year)                      │
│ ( ) Quarterly (4x/year)                          │
│ ( ) Custom: [________________]                   │
│ ( ) No joint sessions                            │
│                                                  │
│ Timing:                                          │
│ [ ] After quarterly financial results            │
│ [ ] Before major strategic decisions             │
│ [ ] Aligned with Stage 5 calendar                │
│     Proposed months: [______] and [______]       │
│                                                  │
│ Duration:                                        │
│ ( ) Half-day (4 hours)                           │
│ ( ) Full-day (8 hours)                           │
│ ( ) Multi-day: [__] days                         │
│                                                  │
│ Standard Agenda Items:                           │
│ [ ] Strategic plan review & alignment            │
│ [ ] Annual budget discussion                     │
│ [ ] Dividend policy review                       │
│ [ ] Performance metrics review                   │
│ [ ] Risk assessment & tolerance                  │
│ [ ] CEO performance (if applicable)              │
│ [ ] Major capital decisions                      │
│ [ ] M&A pipeline review                          │
│ [ ] ESG priorities                               │
│ [ ] Custom: ___________________                  │
│                                                  │
│ Required Participants:                           │
│ [ ] All Family Council members                   │
│ [ ] All Board members (including independents)   │
│ [ ] CEO                                          │
│ [ ] CFO                                          │
│ [ ] Legal counsel                                │
│ [ ] External advisors: ___________               │
│                                                  │
│ Session Structure:                               │
│ [ ] FC-only pre-session ([__] min)               │
│ [ ] Board-only pre-session ([__] min)            │
│ [ ] Joint session (majority of time)             │
│ [ ] FC-only post-session ([__] min)              │
│ [ ] Board-only post-session ([__] min)           │
│                                                  │
│ Expected Outputs:                                │
│ [ ] Joint meeting minutes                        │
│ [ ] Agreed action items with owners              │
│ [ ] Updated strategic priorities document        │
│ [ ] Formal resolutions (if needed)               │
│ [ ] Other: ___________________                   │
│                                                  │
│ [← Previous Topic] [Save] [Next Topic →]         │
└──────────────────────────────────────────────────┘
```

---

**Topic 3: Information Exchange**
```
┌──────────────────────────────────────────────────┐
│ Topic 3 of 5: Information Exchange               │
├──────────────────────────────────────────────────┤
│                                                  │
│ FROM BOARD TO FAMILY COUNCIL:                    │
│                                                  │
│ Regular Reporting (Quarterly):                   │
│ [ ] Board meeting minutes                        │
│     ( ) Full minutes ( ) Redacted summary        │
│ [ ] Financial performance summary                │
│ [ ] Strategic initiative progress updates        │
│ [ ] Risk register and mitigation status          │
│ [ ] CEO dashboard/scorecard                      │
│ [ ] Detailed operational reports                 │
│ [ ] Other: ___________________                   │
│                                                  │
│ Annual Reporting:                                │
│ [ ] Complete financial statements                │
│ [ ] Audited financials & audit report            │
│ [ ] Strategic plan for coming year               │
│ [ ] Board self-evaluation results                │
│ [ ] Executive compensation report                │
│ [ ] Other: ___________________                   │
│                                                  │
│ Ad-Hoc Reporting (As Needed):                    │
│ [ ] Material events (M&A, litigation, crises)    │
│ [ ] Major capital decisions (>$[____])           │
│ [ ] Regulatory/compliance issues                 │
│ [ ] Senior executive changes                     │
│ [ ] Other: ___________________                   │
│                                                  │
│ Timing & Format:                                 │
│ Materials delivered: [__] days after Board       │
│ Format: ( ) PDF  ( ) Platform  ( ) Both          │
│                                                  │
│ ─────────────────────────────────────────────── │
│                                                  │
│ FROM FAMILY COUNCIL TO BOARD:                    │
│                                                  │
│ Annual "Expectations Letter":                    │
│ [ ] Family strategic priorities for year         │
│ [ ] Risk tolerance and appetite                  │
│ [ ] Dividend expectations                        │
│ [ ] Performance metrics family cares about       │
│ [ ] Major concerns or questions                  │
│ [ ] Family capability/resource availability      │
│ [ ] Other: ___________________                   │
│                                                  │
│ Timing: Month [________] each year               │
│ Delivered to: [Board Chair ▼]                    │
│                                                  │
│ Ongoing Communications:                          │
│ [ ] FC feedback on Board materials               │
│ [ ] Questions for Board clarification            │
│ [ ] Family governance updates                    │
│ [ ] Family member proposals/suggestions          │
│ [ ] Other: ___________________                   │
│                                                  │
│ Response Timeline:                               │
│ Board responds to FC inquiries:                  │
│ Urgent matters: within [__] business days        │
│ Standard matters: within [__] business days      │
│                                                  │
│ [← Previous] [Save] [Next →]                     │
└──────────────────────────────────────────────────┘
```

---

**Topic 4: Owner Expectations Letter**
```
┌──────────────────────────────────────────────────┐
│ Topic 4 of 5: Expectations Letter Template       │
├──────────────────────────────────────────────────┤
│                                                  │
│ Annual letter от FC к Board outlining priorities │
│                                                  │
│ Sections to Include:                             │
│                                                  │
│ [ ] Strategic Priorities                         │
│     Top [3-5] strategic goals for year           │
│     Example: "Expand into European markets"      │
│                                                  │
│ [ ] Financial Expectations                       │
│     Revenue growth: [__]% - [__]% annually       │
│     EBITDA margin: [__]% - [__]%                 │
│     Return on equity: [__]%+ minimum             │
│     Other metrics: _______________               │
│                                                  │
│ [ ] Dividend Policy                              │
│     Payout ratio: [__]% - [__]% of net income    │
│     Frequency: [Quarterly ▼]                     │
│     Special dividends: conditions ______         │
│                                                  │
│ [ ] Risk Tolerance                               │
│     ( ) Conservative (preserve capital)          │
│     ( ) Moderate (balanced growth)               │
│     ( ) Aggressive (maximize returns)            │
│     Specific limits: _______________             │
│                                                  │
│ [ ] Capital Allocation Priorities                │
│     Rank priorities (1 = highest):               │
│     [__] Organic growth investment               │
│     [__] Strategic M&A                           │
│     [__] Return to shareholders                  │
│     [__] Debt reduction                          │
│     [__] Other: _______________                  │
│                                                  │
│ [ ] Governance & ESG                             │
│     Sustainability commitments                   │
│     Board diversity expectations                 │
│     Community impact priorities                  │
│     Other: _______________                       │
│                                                  │
│ [ ] Family Involvement                           │
│     NextGen roles in business                    │
│     Family member employment policy              │
│     FC-Board joint initiatives                   │
│     Other: _______________                       │
│                                                  │
│ [ ] Key Concerns/Questions                       │
│     Free text area for specific topics           │
│                                                  │
│ [ ] Custom Section: [______________]             │
│                                                  │
│ Letter Approval Process:                         │
│ 1. FC drafts letter in month: [_______]          │
│ 2. FC votes to approve (Quorum: [___]%)          │
│ 3. Delivered to Board Chair in: [_______]        │
│ 4. Board responds within: [___] days             │
│                                                  │
│ [Generate Template] [← Previous] [Save] [Next →] │
└──────────────────────────────────────────────────┘
```

---

**Topic 5: FC-Board Escalation**
```
┌──────────────────────────────────────────────────┐
│ Topic 5 of 5: FC-Board Escalation Process        │
├──────────────────────────────────────────────────┤
│                                                  │
│ When disagreements arise between FC and Board:   │
│                                                  │
│ LEVEL 1: Direct Discussion                       │
│ Process:                                         │
│ [ ] FC Chair and Board Chair meet                │
│ [ ] Discuss issue and seek common ground         │
│ [ ] Document positions and rationale             │
│ [ ] Attempt to reach consensus                   │
│ Timeline: Must resolve within [___] days         │
│                                                  │
│ LEVEL 2: Joint Working Group                     │
│ If Level 1 fails:                                │
│ [ ] Form joint task force:                       │
│     [__] FC members + [__] Board members         │
│ [ ] Optional independent facilitator             │
│ [ ] Deep dive into issue                         │
│ [ ] Explore alternatives                         │
│ [ ] Present recommendations to both bodies       │
│ Timeline: [___] days from formation              │
│                                                  │
│ LEVEL 3: External Mediation                      │
│ If Level 2 fails:                                │
│ Mediator Selection:                              │
│ ( ) From pre-approved roster                     │
│ ( ) Jointly selected at time of need             │
│ ( ) Other: _______________                       │
│                                                  │
│ Mediator Qualifications:                         │
│ [ ] Governance expert                            │
│ [ ] Family business experience                   │
│ [ ] Mediation certification                      │
│ [ ] [___]+ years experience                      │
│ [ ] Other: _______________                       │
│                                                  │
│ Cost Allocation:                                 │
│ ( ) Family pays 100%                             │
│ ( ) Split 50/50 by FC and Board                  │
│ ( ) Losing party pays                            │
│ ( ) Other: _______________                       │
│                                                  │
│ Timeline: [___] days from engagement             │
│ Mediator decision: ( ) Binding  ( ) Advisory     │
│                                                  │
│ LEVEL 4: Arbitration                             │
│ If Level 3 fails (rare):                         │
│ [ ] Binding arbitration per corporate documents  │
│ [ ] Follow shareholder agreement procedures      │
│                                                  │
│ ─────────────────────────────────────────────── │
│                                                  │
│ Fast-Track for Specific Issues:                  │
│                                                  │
│ CEO Performance Dispute:                         │
│ ( ) Follow standard 4 levels                     │
│ ( ) Fast-track to Level [__]                     │
│                                                  │
│ Dividend Policy Dispute:                         │
│ ( ) Follow standard 4 levels                     │
│ ( ) Fast-track to Level [__]                     │
│                                                  │
│ Strategic Direction Dispute:                     │
│ ( ) Follow standard 4 levels                     │
│ ( ) Require Family Assembly vote (Level 2.5)     │
│ ( ) Fast-track to Level [__]                     │
│                                                  │
│ [← Previous] [Complete FC-Board Interface →]     │
└──────────────────────────────────────────────────┘
```

### Данные для сохранения
```json
{
  "stage_7": {
    "fc_board_interface": {
      "liaison": {
        "selection_method": null,
        "attendance_rights": [],
        "voting_rights": false,
        "reporting_obligations": {},
        "confidentiality": []
      },
      "joint_meetings": {
        "frequency": null,
        "timing": [],
        "duration_hours": null,
        "agenda_items": [],
        "participants": [],
        "session_structure": {},
        "outputs": []
      },
      "info_exchange": {
        "board_to_fc": {},
        "fc_to_board": {},
        "timelines": {}
      },
      "expectations_letter": {
        "sections": [],
        "targets": {},
        "approval_process": {}
      },
      "escalation": {
        "level_1": {},
        "level_2": {},
        "level_3": {},
        "level_4": {},
        "fast_tracks": {}
      }
    }
  }
}
```

### Валидация перехода на Stage 8
- ✅ Все 5 topics имеют минимум 1 выбор
- ⚠️ Warning если no liaison role
- ⚠️ Warning если no joint meetings

---

## Stage 8: Conflict Escalation (15 мин)

### Цель
Определить 4-уровневую процедуру эскалации для family governance conflicts

### UI Layout
```
┌──────────────────────────────────────────────────┐
│ Stage 8 of 10: Conflict Escalation | ⏱️ 15:00    │
├──────────────────────────────────────────────────┤
│                                                  │
│ Visual Flow:                                     │
│                                                  │
│  Conflict Identified                             │
│         ↓                                        │
│  ┌──────────────────┐                            │
│  │ LEVEL 1          │                            │
│  │ FC Discussion    │                            │
│  │ [___] days max   │                            │
│  └────────┬─────────┘                            │
│           │ Unresolved?                          │
│           ↓                                      │
│  ┌──────────────────┐                            │
│  │ LEVEL 2          │                            │
│  │ Working Group    │                            │
│  │ [___] days max   │                            │
│  └────────┬─────────┘                            │
│           │ Unresolved?                          │
│           ↓                                      │
│  ┌──────────────────┐                            │
│  │ LEVEL 3          │                            │
│  │ Mediation        │                            │
│  │ [___] days max   │                            │
│  └────────┬─────────┘                            │
│           │ Unresolved?                          │
│           ↓                                      │
│  ┌──────────────────┐                            │
│  │ LEVEL 4          │                            │
│  │ Arbitration      │                            │
│  │ Per Corp Docs    │                            │
│  └──────────────────┘                            │
│                                                  │
│ [Configure Levels ▼]                             │
└──────────────────────────────────────────────────┘
```

### Level Configuration (4 separate forms)

---

**Level 1: FC Discussion**
```
┌──────────────────────────────────────────────────┐
│ Level 1: Family Council Discussion               │
├──────────────────────────────────────────────────┤
│                                                  │
│ Trigger - What conflicts go to Level 1:          │
│ [ ] Governance interpretation                    │
│ [ ] Decision rights disputes                     │
│ [ ] FC procedures                                │
│ [ ] Constitutional interpretation                │
│ [ ] Resource allocation                          │
│ [ ] Member conduct                               │
│ [ ] Other: ___________________                   │
│                                                  │
│ Who Can Raise Conflict:                          │
│ [ ] Any family member                            │
│ [ ] Any FC member                                │
│ [ ] Board member (for governance issues)         │
│ [ ] External advisor                             │
│ [ ] Other: ___________________                   │
│                                                  │
│ Process:                                         │
│ 1. Conflict raised to:                           │
│    ( ) FC Chair                                  │
│    ( ) Full FC                                   │
│    ( ) Governance Committee                      │
│    Method: [Email/Platform ▼]                    │
│    Timeline: within [__] days of issue           │
│                                                  │
│ 2. FC adds to agenda:                            │
│    ( ) Next scheduled meeting                    │
│    ( ) Special meeting if urgent                 │
│    ( ) Within [__] days                          │
│                                                  │
│ 3. FC discusses and seeks resolution:            │
│    [ ] All parties present their views           │
│    [ ] FC facilitates discussion                 │
│    [ ] Seek consensus solution                   │
│    [ ] Record in minutes                         │
│                                                  │
│ 4. Decision method:                              │
│    ( ) Consensus                                 │
│    ( ) Simple majority ([__]%)                   │
│    ( ) Supermajority ([__]%)                     │
│    ( ) Unanimous                                 │
│                                                  │
│ 5. Conflicted members:                           │
│    ( ) Must recuse from vote                     │
│    ( ) Can vote with disclosure                  │
│    ( ) Case-by-case decision                     │
│                                                  │
│ Maximum Duration: [___] days from issue raised   │
│                                                  │
│ Success Criteria:                                │
│ [ ] Parties accept FC decision                   │
│ [ ] Issue marked as resolved                     │
│ [ ] Implementation plan created                  │
│                                                  │
│ If Unresolved:                                   │
│ Escalate to Level 2 after [___] days             │
│                                                  │
│ [Save Level] [Next Level →]                      │
└──────────────────────────────────────────────────┘
```

---

**Level 2: Working Group**
```
┌──────────────────────────────────────────────────┐
│ Level 2: Joint Working Group                     │
├──────────────────────────────────────────────────┤
│                                                  │
│ Formation:                                       │
│ Working group consists of:                       │
│ [__] FC members                                  │
│ [__] Other stakeholders: ___________             │
│ [__] External experts (optional)                 │
│                                                  │
│ Selection:                                       │
│ ( ) FC Chair appoints                            │
│ ( ) FC votes on members                          │
│ ( ) Parties each nominate                        │
│ ( ) Other: ___________________                   │
│                                                  │
│ Chair/Facilitator:                               │
│ ( ) FC Chair leads                               │
│ ( ) Neutral FC member                            │
│ ( ) External facilitator                         │
│     Qualifications: _______________              │
│     Cost paid by: [Family/Split ▼]              │
│                                                  │
│ Process:                                         │
│ 1. [ ] Review Level 1 discussion & positions     │
│ 2. [ ] Gather additional information/data        │
│ 3. [ ] Interview stakeholders if needed          │
│ 4. [ ] Explore alternative solutions             │
│ 5. [ ] Develop recommendations                   │
│ 6. [ ] Present to FC (and others if relevant)    │
│                                                  │
│ Meeting Frequency:                               │
│ Minimum [__] meetings                            │
│ Maximum [__] meetings                            │
│ Duration: [__] hours per meeting                 │
│                                                  │
│ Decision Method:                                 │
│ ( ) Consensus recommendation                     │
│ ( ) Majority recommendation                      │
│ ( ) Multiple options presented                   │
│                                                  │
│ Maximum Duration: [___] days from formation      │
│                                                  │
│ Deliverables:                                    │
│ [ ] Written report with findings                 │
│ [ ] Recommendations with rationale               │
│ [ ] Implementation plan                          │
│ [ ] Cost-benefit analysis                        │
│ [ ] Other: ___________________                   │
│                                                  │
│ If Unresolved:                                   │
│ Escalate to Level 3 after [___] days             │
│                                                  │
│ [← Previous Level] [Save] [Next Level →]         │
└──────────────────────────────────────────────────┘
```

---

**Level 3: External Mediation**
```
┌──────────────────────────────────────────────────┐
│ Level 3: External Mediation                      │
├──────────────────────────────────────────────────┤
│                                                  │
│ Mediator Selection:                              │
│ ( ) From pre-approved roster                     │
│     Roster size: [3-5] mediators                 │
│     Updated: [Annually ▼]                        │
│ ( ) Jointly selected at time of conflict         │
│ ( ) FC selects unilaterally                      │
│ ( ) Other: ___________________                   │
│                                                  │
│ Mediator Qualifications:                         │
│ [ ] Family business governance experience        │
│ [ ] Professional mediation certification         │
│ [ ] No prior relationship with family            │
│ [ ] Minimum [___] years experience               │
│ [ ] Legal background                             │
│ [ ] Industry expertise: ___________              │
│ [ ] Cultural/language compatibility              │
│ [ ] Other: ___________________                   │
│                                                  │
│ Selection Process:                               │
│ If from roster:                                  │
│ 1. [__] parties each strike [__] names           │
│ 2. ( ) Highest ranked  ( ) Randomly select       │
│ 3. Mediator must be available within [__] days   │
│                                                  │
│ If selected at time:                             │
│ 1. Parties propose candidates                    │
│ 2. Requires: ( ) Mutual agreement                │
│             ( ) [__]% approval                   │
│ 3. Timeline: [__] days to select                 │
│                                                  │
│ Mediation Process:                               │
│ 1. Mediator reviews:                             │
│    [ ] Level 1 & 2 documentation                 │
│    [ ] Relevant governance documents             │
│    [ ] Stakeholder positions                     │
│    Timeline: [__] days                           │
│                                                  │
│ 2. Individual meetings:                          │
│    [ ] Mediator meets each party separately      │
│    Sessions: [__] per party                      │
│                                                  │
│ 3. Joint mediation sessions:                     │
│    Minimum [__] sessions                         │
│    Duration: [__] hours each                     │
│    Location: ( ) Neutral ( ) Family Office       │
│                                                  │
│ 4. Mediator's role:                              │
│    [ ] Facilitate discussion                     │
│    [ ] Propose solutions                         │
│    [ ] Make recommendation                       │
│    [ ] Write opinion                             │
│                                                  │
│ Cost Allocation:                                 │
│ ( ) Family pays 100%                             │
│ ( ) Split 50/50 among parties                    │
│ ( ) Proportional to fault (mediator determines)  │
│ ( ) Losing party pays                            │
│ ( ) Other: ___________________                   │
│                                                  │
│ Estimated cost: $[________] - $[________]        │
│                                                  │
│ Binding:                                         │
│ ( ) Non-binding recommendation                   │
│ ( ) Binding decision                             │
│ ( ) Binding if parties agree beforehand          │
│                                                  │
│ Maximum Duration: [___] days from engagement     │
│                                                  │
│ Success Criteria:                                │
│ [ ] Parties reach agreement                      │
│ [ ] Mediator issues recommendation               │
│ [ ] Implementation plan agreed                   │
│                                                  │
│ If Unresolved:                                   │
│ Escalate to Level 4 (Arbitration)               │
│                                                  │
│ [← Previous] [Save] [Next →]                     │
└──────────────────────────────────────────────────┘
```

---

**Level 4: Arbitration**
```
┌──────────────────────────────────────────────────┐
│ Level 4: Arbitration                             │
├──────────────────────────────────────────────────┤
│                                                  │
│ ⚠️ Final Resolution Level                        │
│                                                  │
│ This level is governed by existing legal         │
│ documents and cannot be customized here:         │
│                                                  │
│ [ ] Shareholder Agreement                        │
│ [ ] Corporate Charter/Bylaws                     │
│ [ ] Family Constitution (if binding)             │
│ [ ] Other governing documents                    │
│                                                  │
│ Typical Process:                                 │
│ • Binding arbitration                            │
│ • Arbitrator appointed per legal docs            │
│ • Formal proceedings                             │
│ • Arbitrator decision is final                   │
│ • Limited appeal rights                          │
│                                                  │
│ Legal counsel required at this stage.            │
│                                                  │
│ Note: Goal of Levels 1-3 is to avoid reaching    │
│ this stage.                                      │
│                                                  │
│ [← Previous Level] [Complete Escalation →]       │
└──────────────────────────────────────────────────┘
```

### Данные для сохранения
```json
{
  "stage_8": {
    "conflict_escalation": {
      "level_1": {
        "triggers": [],
        "who_can_raise": [],
        "process": {},
        "decision_method": null,
        "conflicted_members": null,
        "max_days": null
      },
      "level_2": {
        "composition": {},
        "selection": null,
        "chair": {},
        "process": [],
        "meeting_frequency": {},
        "max_days": null,
        "deliverables": []
      },
      "level_3": {
        "mediator_selection": null,
        "qualifications": [],
        "selection_process": {},
        "mediation_process": {},
        "cost_allocation": null,
        "binding": null,
        "max_days": null
      },
      "level_4": {
        "governed_by": "corporate_documents",
        "binding": true,
        "note": "Cannot be customized in workshop"
      }
    }
  }
}
```

### Валидация перехода на Stage 9
- ✅ Levels 1-3 имеют max_days заполнены
- ✅ Level 1 имеет decision_method
- ✅ Level 3 имеет mediator selection method
- ⚠️ Warning если total timeline >180 days

---

## Stage 9: Secretariat & Documentation (10 мин)

### Цель
Определить роль секретариата и процессы документооборота

### UI Layout
```
┌──────────────────────────────────────────────────┐
│ Stage 9 of 10: Secretariat | ⏱️ 10:00            │
├──────────────────────────────────────────────────┤
│                                                  │
│ Secretariat Role:                                │
│ ( ) Dedicated person (hired)                     │
│ ( ) Rotating FC member                           │
│ ( ) FC Chair handles                             │
│ ( ) External service provider                    │
│ ( ) Family Office staff                          │
│ ( ) No formal secretariat                        │
│                                                  │
│ If dedicated/external:                           │
│ Reports to: [Select ▼]                           │
│ Qualifications: ___________________              │
│ Budget: $[________] annually                     │
│                                                  │
│ Meeting Preparation:                             │
│ Agenda:                                          │
│ [ ] Draft agenda creation                        │
│     By: [FC Chair / Secretariat / Both]          │
│     Circulated: [__] days before meeting         │
│ [ ] Members can add items until [__] days before │
│ [ ] Final agenda sent: [__] days before          │
│                                                  │
│ Materials:                                       │
│ [ ] Collect from presenters                      │
│     Deadline: [__] days before meeting           │
│ [ ] Compile and distribute package               │
│     Sent: [__] days before meeting               │
│ [ ] Follow-up if materials missing               │
│                                                  │
│ Format:                                          │
│ ( ) PDF documents                                │
│ ( ) Platform dashboard                           │
│ ( ) Both                                         │
│                                                  │
│ Meeting Execution:                               │
│ [ ] Take minutes/notes                           │
│ [ ] Track decisions in real-time                 │
│ [ ] Record action items and owners               │
│ [ ] Manage speaking queue                        │
│ [ ] Time management                              │
│ [ ] Technical support (if virtual)               │
│                                                  │
│ Post-Meeting:                                    │
│ Minutes/Protocol:                                │
│ Format: ( ) Detailed transcript                  │
│         ( ) Summary with decisions               │
│         ( ) Action items only                    │
│                                                  │
│ Timeline:                                        │
│ Draft minutes: within [__] hours/days            │
│ FC review: [__] days for comments                │
│ Final minutes: within [__] days of meeting       │
│                                                  │
│ Approval:                                        │
│ ( ) FC Chair approves                            │
│ ( ) Full FC votes at next meeting                │
│ ( ) Email approval (no meeting needed)           │
│                                                  │
│ Distribution:                                    │
│ [ ] All FC members                               │
│ [ ] Family Assembly members                      │
│ [ ] Board liaison                                │
│ [ ] Legal counsel                                │
│ [ ] Other: ___________________                   │
│                                                  │
│ Decision Tracking:                               │
│ [ ] Maintain decision register                   │
│     Update: ( ) Real-time  ( ) Weekly            │
│ [ ] Track action items and deadlines             │
│ [ ] Send reminders: [__] days before due         │
│ [ ] Status reports: ( ) Monthly ( ) Quarterly    │
│ [ ] Dashboard for FC members                     │
│                                                  │
│ Document Storage:                                │
│ Where stored:                                    │
│ [ ] Platform document library                    │
│ [ ] Shared drive (Google/OneDrive)               │
│ [ ] Physical files                               │
│ [ ] Document management system: ______           │
│                                                  │
│ Access Levels:                                   │
│ FC members: ( ) Read/Write  ( ) Read only        │
│ Family Assembly: ( ) All docs  ( ) Selected      │
│ Board: ( ) Relevant only  ( ) No access          │
│ Advisors: ( ) Relevant only  ( ) No access       │
│                                                  │
│ Retention:                                       │
│ Minutes: [Permanent / __ years]                  │
│ Working documents: [__ years]                    │
│ Correspondence: [__ years]                       │
│                                                  │
│ Governance Metrics:                              │
│ Track and report:                                │
│ [ ] Meeting attendance rates                     │
│ [ ] Decision turnaround time                     │
│ [ ] Action item completion rate                  │
│ [ ] Governance body utilization                  │
│ [ ] Budget vs actual governance costs            │
│ [ ] Member satisfaction (annual survey)          │
│ [ ] Other: ___________________                   │
│                                                  │
│ Reporting frequency: [Quarterly ▼]               │
│ Reported to: [FC / Assembly / Both]              │
│                                                  │
│ [← Previous Stage] [Complete Secretariat →]      │
└──────────────────────────────────────────────────┘
```

### Данные для сохранения
```json
{
  "stage_9": {
    "secretariat": {
      "role_type": null,
      "reports_to": null,
      "qualifications": null,
      "budget_annual": null,
      "meeting_prep": {
        "agenda_creator": null,
        "agenda_circulated_days": null,
        "materials_deadline_days": null,
        "materials_sent_days": null,
        "format": null
      },
      "meeting_execution": [],
      "post_meeting": {
        "minutes_format": null,
        "draft_timeline_hours": null,
        "review_days": null,
        "final_timeline_days": null,
        "approval_method": null,
        "distribution": []
      },
      "decision_tracking": {
        "maintain_register": false,
        "update_frequency": null,
        "track_action_items": false,
        "reminders_days_before": null,
        "status_reports": null,
        "dashboard": false
      },
      "document_storage": {
        "location": [],
        "access_levels": {},
        "retention_policies": {}
      },
      "governance_metrics": {
        "tracked_metrics": [],
        "reporting_frequency": null,
        "reported_to": []
      }
    }
  }
}
```

### Валидация перехода на Stage 10
- ✅ Secretariat role выбрана
- ✅ Minutes timeline заполнен
- ✅ Document storage определен
- ⚠️ Warning если draft minutes >7 дней

---

## Stage 10: Summary & Next Steps (10 мин)

### Цель
Review всех решений и создать план действий

### UI Layout
```
┌──────────────────────────────────────────────────┐
│ Stage 10 of 10: Summary & Next Steps | ⏱️ 10:00  │
├──────────────────────────────────────────────────┤
│                                                  │
│ 🎉 Governance Blueprint Complete                 │
│                                                  │
│ Review All Decisions:                            │
│                                                  │
│ ✅ Stage 1: Ground Rules                         │
│    • [3] rules adopted                           │
│    • Decision format: Simple majority            │
│    [View Details]                                │
│                                                  │
│ ✅ Stage 2: Three Circles                        │
│    • [8] participants placed                     │
│    • Complexity score: 7/10 (High)               │
│    [View Diagram]                                │
│                                                  │
│ ✅ Stage 3: Governance Bodies                    │
│    • [4] bodies defined                          │
│    • [47] total members across bodies            │
│    [View Org Chart]                              │
│                                                  │
│ ✅ Stage 4: RACI Matrix                          │
│    • [27] decisions assigned                     │
│    • [0] conflicts detected                      │
│    [View Matrix]                                 │
│                                                  │
│ ✅ Stage 5: Meeting Calendar                     │
│    • [18] meetings scheduled for 2025            │
│    • [0] date conflicts                          │
│    [View Calendar]                               │
│                                                  │
│ ✅ Stage 6: FC Charter                           │
│    • [7] sections completed                      │
│    • ~[12] eligible FC candidates                │
│    [View Charter]                                │
│                                                  │
│ ✅ Stage 7: Board Interface                      │
│    • [5] interface topics defined                │
│    • Joint meetings: 2x/year                     │
│    [View Protocols]                              │
│                                                  │
│ ✅ Stage 8: Conflict Escalation                  │
│    • [4] levels configured                       │
│    • Max timeline: [90] days                     │
│    [View Process]                                │
│                                                  │
│ ✅ Stage 9: Secretariat                          │
│    • Role: [Dedicated person]                    │
│    • Minutes: within [48] hours                  │
│    [View Procedures]                             │
│                                                  │
│ ─────────────────────────────────────────────── │
│                                                  │
│ Final Approval:                                  │
│                                                  │
│ This Governance Blueprint represents decisions   │
│ made during this workshop. It will be:           │
│                                                  │
│ 1. Integrated into platform services             │
│ 2. Sent to legal counsel for review              │
│ 3. Presented to Family Assembly for ratification│
│                                                  │
│ Do you approve this Blueprint?                   │
│                                                  │
│ Voting (FC members only):                        │
│ Maria: [Approve] [Reject] [Abstain]              │
│ John:  [Approve] [Reject] [Abstain]              │
│ Sarah: [Approve] [Reject] [Abstain]              │
│ ...                                              │
│                                                  │
│ Current tally: 0 / 5 voted                       │
│                                                  │
│ [Vote to Approve Blueprint]                      │
│                                                  │
│ ─────────────────────────────────────────────── │
│                                                  │
│ Next Steps (after approval):                     │
│                                                  │
│ ✅ Immediate (Platform):                         │
│ • RACI Matrix → Decision Making Service          │
│ • Calendar → Meeting Service                     │
│ • Escalation → Conflict Resolution Service       │
│ • Charter → Constitution Service                 │
│                                                  │
│ 📋 Action Items:                                 │
│                                                  │
│ [+] Add Action Item                              │
│                                                  │
│ 1. Legal Review                                  │
│    Owner: [Select person ▼]                      │
│    Due: [Select date]                            │
│    Description: Review Blueprint for legal       │
│                 compliance with corp docs        │
│                                                  │
│ 2. Family Assembly Ratification                  │
│    Owner: [Select person ▼]                      │
│    Due: [Select date]                            │
│    Description: Present Blueprint to FA for vote │
│                                                  │
│ 3. First FC Election                             │
│    Owner: [Select person ▼]                      │
│    Due: [Select date]                            │
│    Description: Conduct first FC election per    │
│                 new charter                      │
│                                                  │
│ 4. Secretariat Hiring                            │
│    Owner: [Select person ▼]                      │
│    Due: [Select date]                            │
│    Description: Hire dedicated secretariat       │
│                                                  │
│ 5. First Governance Calendar Meeting             │
│    Owner: [FC Chair]                             │
│    Due: [Auto from Stage 5]                      │
│    Description: First FC meeting Q1 2025         │
│                                                  │
│ [Save Action Items]                              │
│                                                  │
│ ─────────────────────────────────────────────── │
│                                                  │
│ Download Documents:                              │
│                                                  │
│ [📥 Complete Governance Blueprint.pdf]           │
│ [📥 RACI Matrix.xlsx]                            │
│ [📥 Family Council Charter.pdf]                  │
│ [📥 Meeting Calendar.ics]                        │
│ [📥 Conflict Escalation Procedure.pdf]           │
│ [📥 All Workshop Decisions.json]                 │
│                                                  │
│ [← Back to Review] [Complete Workshop 🎉]        │
└──────────────────────────────────────────────────┘
```

### Финальное голосование

**Voting Modal:**
```
┌────────────────────────────────────────┐
│ Final Blueprint Approval               │
│                                        │
│ You are voting on the complete         │
│ Governance Blueprint created today.    │
│                                        │
│ This includes:                         │
│ • Ground rules & decision processes    │
│ • Three circles placement              │
│ • 4 governance bodies                  │
│ • 27 RACI decisions                    │
│ • 18 scheduled meetings                │
│ • FC charter (7 sections)              │
│ • Board interface protocols            │
│ • 4-level escalation process           │
│ • Secretariat procedures               │
│                                        │
│ Your vote:                             │
│ ( ) Approve - I support this Blueprint │
│ ( ) Reject - I have concerns           │
│ ( ) Abstain - I defer to others        │
│                                        │
│ Optional comment:                      │
│ ┌────────────────────────────────────┐ │
│ │                                    │ │
│ └────────────────────────────────────┘ │
│                                        │
│ [Cancel] [Submit Vote]                 │
└────────────────────────────────────────┘
```

**Vote Results:**
```
Blueprint Approval Results:

Approve: █████████ 7 votes (87.5%)
Reject:  ██ 1 vote (12.5%)
Abstain: (none)

Threshold: Simple majority (50%+) ✅ PASSED

Comments:
• John (Reject): "Need more time to review 
                  Stage 4 RACI assignments"
                  
Action: Blueprint approved pending John's
        review of Stage 4.
```

### Данные для сохранения
```json
{
  "stage_10": {
    "summary": {
      "stage_1": { "completed": true, "key_metrics": {...} },
      "stage_2": { "completed": true, "key_metrics": {...} },
      // ... all stages
    },
    "final_vote": {
      "threshold": "simple_majority",
      "votes": [
        {
          "user_id": "uuid",
          "vote": "approve",
          "comment": null,
          "timestamp": "timestamp"
        }
      ],
      "result": "passed",
      "approve_count": 7,
      "reject_count": 1,
      "abstain_count": 0
    },
    "action_items": [
      {
        "id": "uuid",
        "title": "Legal Review",
        "owner": "user_id",
        "due_date": "2025-11-15",
        "description": "Review Blueprint for legal compliance",
        "status": "pending"
      }
    ],
    "completed_at": "timestamp"
  }
}
```

### Валидация завершения
- ✅ Минимум 50% FC проголосовали (или другой threshold из Stage 1)
- ✅ Vote passed per threshold
- ✅ Минимум 2 action items созданы
- ⚠️ Если vote failed → возврат к проблемным stages

---

## 📦 Post-Workshop Integration

### Автоматическое развертывание

**После успешного завершения воркшопа:**

```
Integration Pipeline:

1. Decision Making Service (8009)
   ✅ Deploy RACI Matrix
   ✅ Create decision templates
   ✅ Set routing rules
   
2. Meeting Service (8003)
   ✅ Create calendar events (18 meetings)
   ✅ Set recurring patterns
   ✅ Send invitations
   ✅ Configure reminders
   
3. Constitution Service (8002)
   ✅ Store FC Charter
   ✅ Store governance bodies definitions
   ✅ Generate PDF documents
   
4. Conflict Resolution (8015)
   ✅ Activate 4-level escalation
   ✅ Configure mediator roster
   ✅ Set timelines and alerts
   
5. Auth Service (8001)
   ✅ Update role permissions
   ✅ Create FC liaison role
   ✅ Set body memberships
   
6. Notification Service (8010)
   ✅ Send completion notifications
   ✅ Distribute action items
   ✅ Schedule follow-up reminders

Status: All integrations complete ✅
Time: ~30 seconds
```

### Генерация документов

**PDF Documents created:**
- `Governance_Blueprint_v1.0.pdf` (complete)
- `RACI_Matrix.pdf` (formatted table)
- `Family_Council_Charter.pdf` (legal-ready)
- `Meeting_Calendar_2025.pdf` (year view)
- `Conflict_Escalation_Procedure.pdf`
- `Secretariat_Handbook.pdf`

**Downloadable Formats:**
- `.pdf` - For printing/sharing
- `.xlsx` - RACI matrix editable
- `.ics` - Calendar import
- `.json` - Raw data export
- `.docx` - Charter for editing

---

## 🔧 Technical Implementation Notes

### Real-time Collaboration

**WebSocket Events:**
```javascript
// User edits a field
emit('stage_update', {
  family_id: 'uuid',
  session_id: 'uuid',
  stage: 4,
  field: 'raci_matrix.decisions[2].family_assembly',
  value: 'A',
  user_id: 'uuid',
  timestamp: 'iso8601'
})

// Broadcast to all participants
broadcast('stage_sync', {
  stage: 4,
  updates: {...}
})

// Vote initiated
emit('vote_start', {
  question: 'Who should be Accountable?',
  options: [...],
  duration_seconds: 120
})

// Vote results
emit('vote_complete', {
  results: {...},
  winner: 'family_assembly'
})
```

### Data Persistence

**Auto-save Strategy:**
- Save on every field change (debounced 2 sec)
- Save on page transition
- Save on vote completion
- Periodic backup every 5 min
- Full session backup every stage

**Storage Schema:**
```javascript
{
  session_id: 'uuid',
  family_id: 'uuid',
  workshop_type: 'dm-cr',
  status: 'in_progress',
  current_stage: 4,
  started_at: 'timestamp',
  last_saved_at: 'timestamp',
  stages: {
    stage_1: {...},
    stage_2: {...},
    // ... all 10 stages
  },
  participants: [...],
  audit_log: [...]
}
```

### Validation Rules

**Per-stage validation:**
- Required fields: Cannot proceed without
- Warnings: Show but allow proceed
- Errors: Block transition

**Example:**
```javascript
const stage4Validation = {
  required: [
    {
      check: () => allDecisionsHaveExactlyOneA(),
      error: 'Each decision must have exactly 1 Accountable role'
    },
    {
      check: () => allDecisionsHaveAtLeastOneR(),
      error: 'Each decision must have at least 1 Responsible role'
    }
  ],
  warnings: [
    {
      check: () => detectConflicts(),
      message: '3 decisions have overlapping accountability'
    }
  ]
}
```

---

## 🎨 UI/UX Principles

### Zero Defaults Philosophy

**Implementation:**
- All checkboxes: `unchecked` by default
- All radio buttons: `unselected` by default
- All dropdowns: placeholder text, no pre-selection
- All text fields: empty
- All numeric fields: empty (not 0)

**Visual indicators:**
```
Empty field: [____________]
Filled field: [Some value_]

Unchecked: [ ] Option
Checked:   [✓] Option

Unselected: ( ) Choice
Selected:   (•) Choice

Empty dropdown: [Select... ▼]
Filled dropdown: [Quarterly ▼]
```

### Progressive Disclosure

**Show complexity when needed:**
- Start simple, add options progressively
- "Advanced options" collapsed by default
- Tooltips explain complex concepts
- Examples provided inline

### Collaborative Indicators

**Show who's doing what:**
```
Field: [Maria is typing...___________]
       ↑ Live typing indicator

Checkbox: [✓] Option
          ↑ Maria selected 2 min ago

Vote: [5/8 voted] ⏱️ 1:30 remaining
```

### Mobile Responsive

**Considerations:**
- Workshop primarily desktop/tablet
- Mobile: read-only view of progress
- Critical actions require desktop
- Calendar: touch-friendly drag-drop

---

## 📊 Analytics & Monitoring

### Workshop Metrics

**Track per session:**
- Total duration
- Time per stage (actual vs planned)
- Number of votes called
- Number of disputes/discussions
- Participant engagement (actions per person)
- Drop-off rate (if any participants leave)
- Completion rate

**Aggregate across families:**
- Most common decisions in RACI
- Average calendar complexity
- Most common FC charter choices
- Typical escalation timelines

### Quality Metrics

**Blueprint Health Score:**
```
Factors:
• RACI coverage: 27/27 decisions ✅
• Calendar spacing: No conflicts ✅
• FC charter completeness: 7/7 sections ✅
• Escalation reasonableness: <180 days ✅
• Participant consensus: 87.5% approval ⚠️

Overall Score: 92/100 (A-)
```

---

## 🚀 Next Steps After Workshop

### Immediate (Platform)
1. Deploy RACI Matrix → Decision Making
2. Activate calendar → Meeting Service
3. Store charter → Constitution Service
4. Enable escalation → Conflict Resolution

### Short-term (1-2 weeks)
1. Legal counsel review
2. Revisions if needed
3. Final document preparation

### Medium-term (1-3 months)
1. Family Assembly ratification
2. First FC election
3. Secretariat hiring/assignment
4. First governance meetings

### Long-term (3-12 months)
1. Review and refine
2. Update based on learnings
3. Annual charter review

---

## 📝 Appendix

### Glossary

**RACI:**
- R = Responsible (does the work)
- A = Accountable (final decision, only 1)
- C = Consulted (gives input)
- I = Informed (kept in loop)

**Governance Bodies:**
- Family Assembly: All eligible family members
- Family Council: Elected representatives
- Board of Directors: Business oversight
- Management: Day-to-day operations

**Escalation Levels:**
- Level 1: Internal FC discussion
- Level 2: Joint working group
- Level 3: External mediation
- Level 4: Binding arbitration

### Support Resources

**During Workshop:**
- Facilitator guide
- Best practice templates
- Sample decisions library
- Help tooltips

**After Workshop:**
- Implementation checklist
- Training materials for FC
- Secretariat handbook
- Legal review checklist

---

**End of Specification**

*Version: 2.0.0*  
*Last Updated: 2025-10-30*  
*Status: Ready for Development*