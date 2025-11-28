# Block 8: Script Analyzer (CUE Engine)

**Purpose:** Detect limiting language and false binaries; suggest reframes.

**Why:** False binaries page 13; CUE method pages 15-21.

---

## User Story 8.1: Detect Limiting Language

**As a** moderator
**I want** to upload meeting notes; system flags "had to choose" and suggests reframes
**So that** I catch false binaries and limiting language

**AC:** Phrase detection; reframe suggestions; inline citations to method

### 📊 **ОЦЕНКА ГОТОВНОСТИ**

| AC | Реализация | Статус | Блокеры |
|----|------------|--------|---------|
| Phrase detection | 0% | ❌ Отсутствует | Нет NLP для sentiment/keyword detection |
| Reframe suggestions | 0% | ❌ Отсутствует | AI suggestions не реализованы |
| Inline citations | 0% | ❌ Отсутствует | Нет citation feature |

**Готовность: 0% | Story Points: 13 SP**

### 🚨 **ПРОБЛЕМЫ:**
- Bedrock integration существует, но нет actual AI features (Analysis 4.5, lines 959-988)
- NLP отсутствует полностью

---

## User Story 8.2: Coaching Prompts

**As a** chair
**I want** coaching prompts like "What would it look like if both were true?"
**So that** I can guide better conversations

**AC:** Prompt library; copy-into-agenda

### 📊 **ОЦЕНКА ГОТОВНОСТИ**

| AC | Реализация | Статус | Блокеры |
|----|------------|--------|---------|
| Prompt library | 0% | ❌ Отсутствует | Нет prompt storage |
| Copy-into-agenda | 0% | ❌ Отсутствует | Нет copy/reuse workflow |

**Готовность: 0% | Story Points: 5 SP**

---

## User Story 8.3: Export Flagged Language

**As** counsel
**I want** to export flagged language for training
**So that** we can improve communication

**AC:** CSV; per-meeting summary

### 📊 **ОЦЕНКА ГОТОВНОСТИ**

| AC | Реализация | Статус | Блокеры |
|----|------------|--------|---------|
| CSV export | 0% | ❌ Отсутствует | Нет export system |
| Per-meeting summary | 0% | ❌ Отсутствует | Нет summary generation |

**Готовность: 0% | Story Points: 5 SP**

---

## БЛОК 8: ОБЩАЯ ОЦЕНКА

| User Story | Готовность | SP | Приоритет | Блокеры |
|------------|------------|----|-----------|---------|
| 8.1 Language detection | 0% | 13 | MEDIUM | NLP, AI suggestions |
| 8.2 Coaching prompts | 0% | 5 | LOW | Prompt library |
| 8.3 Export flagged | 0% | 5 | LOW | Export system |

**Готовность блока: 0% | Сложность: 23 SP (~2 спринта)**

**КРИТИЧНО:** Требует полную реализацию AI/NLP функциональности. Bedrock есть, но не используется.
