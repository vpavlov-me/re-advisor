# Block 5: Engagement Analytics and "Signals"

**Purpose:** Identify champions and disengagement early; heatmaps for logins, reads, attendance.

**Why:** Directly from identify champions & catch detractors on page 12.

---

## User Story 5.1: Contributors & Quiet Cohort

**As a** facilitator
**I want** to view "Top contributors" list and "Quiet cohort" radar
**So that** I can engage champions and support disengaged members

**AC:** Ranked lists; trend sparkline; threshold alerts

### 📊 **ОЦЕНКА ГОТОВНОСТИ**

| AC | Реализация | Статус | Блокеры |
|----|------------|--------|---------|
| Ranked lists | 0% | ❌ Отсутствует | Нет leaderboard/ranking logic |
| Trend sparkline | 0% | ❌ Отсутствует | Нет time-series визуализации |
| Threshold alerts | 35% | ❌ Минимально | Notification есть, но нет threshold rules |

**Готовность: 12% | Story Points: 13 SP**

### 🚨 **КРИТИЧЕСКИЕ ПРОБЛЕМЫ**

1. **Analytics endpoints отсутствуют** (Analysis 5.2, lines 1110-1113)
   - Нет dedicated analytics routes
   - Нет metrics calculation APIs

2. **Ranking logic отсутствует** (Analysis 5.2, lines 1093-1096)
   - Нет top performers/movers rankings

**Что нужно:** Analytics service, ranking algorithms, time-series DB queries

---

## User Story 5.2: Branch Engagement Alerts

**As** council chair
**I want** alert if branch's engagement drops >30% QoQ
**So that** I can address issues proactively

**AC:** Branch segmentation; baseline; alert rules; explanation drill-down

### 📊 **ОЦЕНКА ГОТОВНОСТИ**

| AC | Реализация | Статус | Блокеры |
|----|------------|--------|---------|
| Branch segmentation | 0% | ❌ Отсутствует | Нет branch model/concept |
| Baseline | 0% | ❌ Отсутствует | Нет baseline tracking |
| Alert rules | 0% | ❌ Отсутствует | Нет threshold rules engine |
| Explanation drill-down | 0% | ❌ Отсутствует | Нет alert explanation system |

**Готовность: 0% | Story Points: 13 SP**

### 🚨 **КРИТИЧЕСКИЕ ПРОБЛЕМЫ**

1. **Alert rules engine полностью отсутствует** (Analysis 3.2, lines 666-695)
   - Нет threshold rules table
   - Нет rule evaluation logic
   - Нет alert routing

2. **Branch segmentation отсутствует** (Analysis 5.2, lines 1102-1105)
   - Нет family branch concept в БД

**Что нужно:** Branch model, alert rules engine, baseline calculation

---

## User Story 5.3: Participation-Outcome Correlation

**As an** advisor
**I want** to correlate participation with project outcomes
**So that** I can demonstrate ROI of engagement

**AC:** Join analytics to project KPIs; correlation view

### 📊 **ОЦЕНКА ГОТОВНОСТИ**

| AC | Реализация | Статус | Блокеры |
|----|------------|--------|---------|
| Join analytics to KPIs | 0% | ❌ Отсутствует | Нет integration activity ↔ outcomes |
| Correlation view | 0% | ❌ Отсутствует | Нет correlation analysis |

**Готовность: 0% | Story Points: 13 SP**

### 🚨 **КРИТИЧЕСКИЕ ПРОБЛЕМЫ**

1. **Impact measurement system отсутствует** (Analysis 5.3, lines 1118-1155)
   - Нет linkage между activity и outcomes
   - Нет causal relationship tracking
   - Нет impact dashboard

**Что нужно:** Impact measurement framework, correlation analytics

---

## БЛОК 5: ОБЩАЯ ОЦЕНКА

| User Story | Готовность | SP | Приоритет | Блокеры |
|------------|------------|----|-----------|---------|
| 5.1 Contributors dashboard | 12% | 13 | CRITICAL | Analytics service, ranking logic |
| 5.2 Branch alerts | 0% | 13 | HIGH | Alert engine, branch model |
| 5.3 Correlation analysis | 0% | 13 | MEDIUM | Impact measurement system |

**Готовность блока: 4% | Сложность: 39 SP (~3-4 спринта)**

**КРИТИЧНО:** Этот блок почти полностью отсутствует. Нужен dedicated analytics service.
