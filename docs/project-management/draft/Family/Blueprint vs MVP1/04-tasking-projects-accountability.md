# Block 4: Tasking, Projects, and Accountability

**Purpose:** Track follow-through across committees and individuals.

**Why:** Mirrors accountability focus on page 11.

---

## User Story 4.1: Member Accountability Dashboard

**As a** chair
**I want** to see attendance, prep, and action completion by member
**So that** I can identify who's engaged and who needs support

**AC:** Attendance log; pre-read open rate; task completion rate

### 📊 **ОЦЕНКА ГОТОВНОСТИ**

| AC | Реализация | Статус | Блокеры |
|----|------------|--------|---------|
| Attendance log | 75% | ✅ Хорошо | MeetingAttendee table существует |
| Pre-read open rate | 0% | ❌ Отсутствует | Нет tracking открытия документов |
| Task completion rate | 40% | ⚠️ Частично | Completion tracking есть, но нет aggregation |

**Готовность: 38% | Story Points: 8 SP**

### 🚨 **КРИТИЧЕСКИЕ ПРОБЛЕМЫ**

1. **Pre-read tracking отсутствует** (Analysis 5.1, lines 1063-1066)
   - Нет логирования открытия документов
   - Нет document access logging
   - Нет "материал просмотрен" индикатора

2. **Task completion aggregation минимальна** (Analysis 5.1, lines 1068-1070)
   - Task completion tracking есть, но нет dashboard endpoint
   - Нет metrics по пользователю

**Что нужно:** DocumentAccess log table, aggregation API для metrics

---

## User Story 4.2: Pre-Read Compliance

**As a** member
**I want** auto-prompts to upload pre-reads and mark readiness
**So that** I'm prepared for meetings

**AC:** Pre-read checklist; due dates; nudge system; non-compliance flag

### 📊 **ОЦЕНКА ГОТОВНОСТИ**

| AC | Реализация | Статус | Блокеры |
|----|------------|--------|---------|
| Pre-read checklist | 40% | ⚠️ Частично | MeetingAgendaItem с `is_completed` есть |
| Due dates | 75% | ✅ Хорошо | Due dates tracking реализован |
| Nudge system | 0% | ❌ Отсутствует | Нет escalating reminders |
| Non-compliance flag | 0% | ❌ Отсутствует | Нет compliance tracking |

**Готовность: 29% | Story Points: 10 SP**

### 🚨 **КРИТИЧЕСКИЕ ПРОБЛЕМЫ**

1. **Nudge system отсутствует** (Analysis 3.1, lines 628-632)
   - Нет smart nudging based on engagement
   - Нет "re-notify after X hours"

2. **Compliance flag не реализован** (Analysis 3.1, lines 638-641)
   - Нет escalation при non-compliance
   - Нет "breach" notification

**Что нужно:** Nudge scheduler, compliance tracking model

---

## User Story 4.3: Export Overdue Tasks

**As a** COO
**I want** to export overdue tasks by body and owner
**So that** I can produce accountability reports

**AC:** Filter by committee/owner; CSV export; API

### 📊 **ОЦЕНКА ГОТОВНОСТИ**

| AC | Реализация | Статус | Блокеры |
|----|------------|--------|---------|
| Filter by committee/owner | 30% | ⚠️ Частично | Filtering partial, нет committee filter |
| CSV export | 0% | ❌ Отсутствует | Нет export endpoints |
| API | 60% | ⚠️ Частично | Task API есть, но incomplete filtering |

**Готовность: 30% | Story Points: 5 SP**

### 🚨 **КРИТИЧЕСКИЕ ПРОБЛЕМЫ**

1. **CSV export отсутствует** (Analysis 5.4, lines 1176-1179)
   - Нет export endpoints вообще
   - Нет CSV generation

2. **Committee filter отсутствует** (Analysis 5.4, lines 1172-1174)
   - Нет committee grouping/filtering

**Что нужно:** Export API, committee filter logic

---

## БЛОК 4: ОБЩАЯ ОЦЕНКА

| User Story | Готовность | SP | Приоритет | Блокеры |
|------------|------------|----|-----------|---------|
| 4.1 Accountability dashboard | 38% | 8 | HIGH | Document tracking, aggregation |
| 4.2 Pre-read compliance | 29% | 10 | MEDIUM | Nudge system, compliance flags |
| 4.3 Export overdue tasks | 30% | 5 | LOW | CSV export, committee filter |

**Готовность блока: 32% | Сложность: 23 SP (~2 спринта)**

**Приоритет:** Start with 4.3 (export simple), then 4.1 (dashboard), finally 4.2 (complex nudging)
