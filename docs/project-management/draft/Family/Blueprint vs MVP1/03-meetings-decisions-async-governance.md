# Block 3: Meetings, Decisions, and Asynchronous Governance

**Purpose:** Agenda builder, consent calendars, structured minutes, votes (open/secret), and decision registry.

**Why:** Supports governance scaffolding diagram on page 9.

---

## User Story 3.1: Consent Agenda with Quorum

**As a** board chair
**I want** to run a consent agenda and record votes with quorum check
**So that** routine items pass efficiently while maintaining proper governance

**AC:** Quorum calc; member eligibility; vote types; immutable minute entry

### 📊 **ОЦЕНКА ГОТОВНОСТИ**

| AC | Реализация | Статус | Блокеры |
|----|------------|--------|---------|
| Quorum calc | 60% | ⚠️ Частично | `approval_threshold` есть, но нет enforcement |
| Member eligibility | 45% | ⚠️ Частично | VoterEligibilityRule есть, но не проверяется |
| Vote types | 75% | ✅ Хорошо | VoteOption enum реализован |
| Immutable minute entry | 30% | ❌ Минимально | Meeting minutes есть, но не immutable |

**Готовность: 52% | Story Points: 10 SP**

### 🚨 **КРИТИЧЕСКИЕ ПРОБЛЕМЫ**

1. **Quorum enforcement не реализован** (Analysis 3.3, lines 729-732)
   - `approval_threshold` поле существует, но нет функции проверки
   - Нет минимального кворума validation
   - Нет блокировки голосования при отсутствии кворума

2. **Eligibility не проверяется** (Analysis 1.7, lines 266-307)
   - VoterEligibilityRule модель есть, но не используется при голосовании
   - Нет pre-vote validation

3. **Minutes не immutable** (Analysis 2.1, lines 402-405)
   - Нет append-only pattern для minutes
   - Можно редактировать после создания

**Что нужно:** Quorum validation функция, immutable minutes table, eligibility checks

---

## User Story 3.2: E-Vote Between Meetings

**As a** family council
**I want** to request an e-vote between meetings with expiry
**So that** urgent decisions don't wait for next meeting

**AC:** Vote window; reminders; auto-close; outcome stored to registry

### 📊 **ОЦЕНКА ГОТОВНОСТИ**

| AC | Реализация | Статус | Блокеры |
|----|------------|--------|---------|
| Vote window | 75% | ✅ Хорошо | `voting_deadline` поле есть |
| Reminders | 50% | ⚠️ Частично | Notification service есть, но нет reminders |
| Auto-close | 0% | ❌ Отсутствует | Нет background job для закрытия |
| Outcome stored | 75% | ✅ Хорошо | `resolved_at`, status change работают |

**Готовность: 50% | Story Points: 8 SP**

### 🚨 **КРИТИЧЕСКИЕ ПРОБЛЕМЫ**

1. **Auto-close отсутствует** (Analysis 3.1, lines 623-626)
   - Нет background job для автоматического закрытия голосований
   - `voting_deadline` не enforced

2. **Reminder system не настроен** (Analysis 3.1, lines 628-632)
   - Нет эскалирующих напоминаний
   - Нет nudge перед deadline

**Что нужно:** Background job для auto-close, reminder scheduler

---

## User Story 3.3: Decision Lineage

**As a** member
**I want** to see "decision lineage" showing the policy and evidence used
**So that** I understand the rationale and governance trail

**AC:** Decision → policy → documents chain; timestamped trails

### 📊 **ОЦЕНКА ГОТОВНОСТИ**

| AC | Реализация | Статус | Блокеры |
|----|------------|--------|---------|
| Decision → policy chain | 60% | ⚠️ Частично | `constitution_section_id` есть, reverse query нет |
| Documents chain | 40% | ⚠️ Частично | Нет explicit decision → document links |
| Timestamped trails | 70% | ✅ Хорошо | Timestamps везде есть |

**Готовность: 57% | Story Points: 5 SP**

### 🚨 **КРИТИЧЕСКИЕ ПРОБЛЕМЫ**

1. **Reverse policy query отсутствует** (Analysis 2.3, lines 501-503)
   - Decision имеет `constitution_section_id`, но нет API для "show decisions for clause"

2. **Document linkage не explicit** (Analysis 2.3, lines 518-520)
   - Нет DecisionDocument association table

**Что нужно:** API для reverse queries, DecisionDocument table

---

## БЛОК 3: ОБЩАЯ ОЦЕНКА

| User Story | Готовность | SP | Приоритет | Блокеры |
|------------|------------|----|-----------|---------|
| 3.1 Consent agenda | 52% | 10 | HIGH | Quorum enforcement, immutable minutes |
| 3.2 E-vote with expiry | 50% | 8 | MEDIUM | Auto-close job, reminders |
| 3.3 Decision lineage | 57% | 5 | LOW | Reverse queries, document links |

**Готовность блока: 53% | Сложность: 23 SP (~2 спринта)**

**Приоритет:** Start with 3.1 (quorum critical for governance), then 3.2, finally 3.3
