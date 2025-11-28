# Family Governance Assessment Workshop
## Product Specification Document v1.0

---

## 1. EXECUTIVE SUMMARY

### 1.1 Overview
Семейный Assessment — это комплексный диагностический воркшоп длительностью 2-3 часа, который создаёт полную картину текущего состояния семейного управления по 8 ключевым измерениям. Воркшоп работает как с human facilitator, так и с AI-assistance, поддерживает индивидуальные и коллективные режимы оценки.

### 1.2 Core Value Proposition
- **Для семей**: Объективная картина "где мы сейчас" + конкретные next steps
- **Для фасилитаторов**: Готовый инструмент с автоматическими insights и рекомендациями
- **Для платформы**: Точка входа в экосистему воркшопов + данные для персонализации

### 1.3 Key Metrics
- Completion rate: >85%
- Time to complete: 90-120 минут
- Consensus score: автоматический расчёт
- Action plan generation: 100% automated

---

## 2. WORKSHOP ARCHITECTURE

### 2.1 The 8 Core Dimensions

```yaml
dimensions:
  1_communication_trust:
    name: "Коммуникация и доверие"
    questions: 12
    weight: high
    icon: "message-circle-heart"
    color: "#4CAF50"
    
  2_financial_transparency:
    name: "Финансовая прозрачность"
    questions: 14
    weight: high
    icon: "eye-dollar"
    color: "#2196F3"
    
  3_next_generation:
    name: "Развитие следующего поколения"
    questions: 13
    weight: high
    icon: "users-graduation"
    color: "#9C27B0"
    
  4_decision_making:
    name: "Принятие решений и конфликты"
    questions: 15
    weight: critical
    icon: "scale-balanced"
    color: "#FF9800"
    
  5_values_mission:
    name: "Ценности и миссия"
    questions: 11
    weight: medium
    icon: "compass"
    color: "#00BCD4"
    
  6_governance_structures:
    name: "Структуры управления"
    questions: 16
    weight: critical
    icon: "building-columns"
    color: "#3F51B5"
    
  7_ownership_control:
    name: "Владение и контроль"
    questions: 14
    weight: high
    icon: "key"
    color: "#E91E63"
    
  8_family_identity:
    name: "Семейная идентичность"
    questions: 10
    weight: medium
    icon: "heart-handshake"
    color: "#8BC34A"

total_questions: 105
estimated_time: "90-120 minutes"
```

### 2.2 Question Types & Mechanics

```typescript
type QuestionType = 
  | 'likert_7'        // 1-7 scale with labels
  | 'likert_5'        // 1-5 scale
  | 'binary'          // Yes/No or True/False
  | 'multiple_choice' // Select one from options
  | 'multi_select'    // Select multiple
  | 'text_short'      // 1-2 sentences
  | 'ranking'         // Rank N items
  | 'matrix'          // Grid of sub-questions

interface Question {
  id: string;
  dimension_id: string;
  order: number;
  type: QuestionType;
  text: {
    en: string;
    ru: string;
  };
  subtext?: {
    en: string;
    ru: string;
  };
  options?: QuestionOption[];
  validation: ValidationRules;
  scoring: ScoringRules;
  visibility_conditions?: string[];
  consensus_sensitive: boolean;
  benchmark_data?: boolean;
}
```

### 2.3 Workshop Flow Phases

```
┌─────────────────────────────────────────────────┐
│  PHASE 1: Setup & Context (5-10 min)           │
├─────────────────────────────────────────────────┤
│  • Welcome & instructions                       │
│  • Participant role confirmation                │
│  • Confidentiality settings                     │
│  • Mode selection (individual/guided)           │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│  PHASE 2: Individual Assessment (60-90 min)     │
├─────────────────────────────────────────────────┤
│  • 8 dimensions × 10-16 questions each          │
│  • Progress tracking                            │
│  • Auto-save every 30 seconds                   │
│  • Break reminders every 25 questions           │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│  PHASE 3: Real-time Synthesis (auto)            │
├─────────────────────────────────────────────────┤
│  • Score calculation                            │
│  • Consensus analysis                           │
│  • Pattern detection                            │
│  • Insight generation                           │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│  PHASE 4: Results & Discussion (20-30 min)      │
├─────────────────────────────────────────────────┤
│  • Visual dashboard reveal                      │
│  • Consensus map exploration                    │
│  • Facilitated discussion points                │
│  • Priority identification                      │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│  PHASE 5: Action Planning (10-15 min)           │
├─────────────────────────────────────────────────┤
│  • Top 3 priorities selection                   │
│  • Recommended next workshops                   │
│  • Timeline & accountability setup              │
│  • Export & sharing                             │
└─────────────────────────────────────────────────┘
```

---

## 3. DETAILED SCREEN-BY-SCREEN BREAKDOWN

### 3.1 PHASE 1: Setup & Context

#### Screen 1.1: Welcome & Workshop Introduction

**Layout:**
```
┌────────────────────────────────────────────────┐
│  [ReFamily Logo]              [User: Vladislav]│
│                                                 │
│         Family Governance Assessment            │
│         ═══════════════════════════             │
│                                                 │
│  [Graphic: Compass with 8 directions]           │
│                                                 │
│  Добро пожаловать на комплексную оценку         │
│  семейного управления!                          │
│                                                 │
│  Этот воркшоп поможет вашей семье:              │
│  ✓ Объективно оценить текущее состояние         │
│  ✓ Выявить сильные стороны и зоны роста        │
│  ✓ Получить персонализированные рекомендации   │
│                                                 │
│  ⏱️  Время: 90-120 минут                        │
│  👥 Участников: 5 приглашено, 3 онлайн         │
│  📊 Вопросов: 105 (8 измерений)                │
│                                                 │
│           [Начать оценку →]                     │
│                                                 │
└────────────────────────────────────────────────┘
```

**Interactions:**
- Hover на иконках → tooltip с описанием
- Click "Начать оценку" → Screen 1.2

**Data captured:** 
- Session start timestamp
- User role confirmation

---

#### Screen 1.2: Role & Context Confirmation

**Layout:**
```
┌────────────────────────────────────────────────┐
│  ← Назад                     Шаг 1 из 3         │
│                                                 │
│  Подтвердите вашу роль в семье                  │
│  ══════════════════════════════                 │
│                                                 │
│  Ваша роль влияет на то, какие вопросы вы      │
│  будете видеть и как мы интерпретируем ответы.  │
│                                                 │
│  [○] Основатель/патриарх (G1)                   │
│  [○] Супруг(а) основателя (G1)                  │
│  [○] Наследник/преемник (G2)                    │
│  [○] Супруг(а) наследника (G2)                  │
│  [○] Следующее поколение (G3+)                  │
│  [○] Внешний советник/консультант               │
│  [○] Профессиональный управляющий               │
│  [○] Член семейного совета                      │
│  [○] Другая роль: [____________]                │
│                                                 │
│  ℹ️  Выбранная роль не влияет на ваш доступ     │
│      к результатам — все видят полную картину.  │
│                                                 │
│           [Продолжить →]                        │
│                                                 │
└────────────────────────────────────────────────┘
```

**Validation:**
- Must select one role
- Zero defaults principle: no pre-selected option

**Data schema:**
```typescript
interface RoleConfirmation {
  user_id: string;
  session_id: string;
  role: FamilyRole;
  generation: 'G1' | 'G2' | 'G3+' | 'external';
  custom_role?: string;
  confirmed_at: timestamp;
}
```

---

#### Screen 1.3: Confidentiality & Privacy Settings

**Layout:**
```
┌────────────────────────────────────────────────┐
│  ← Назад                     Шаг 2 из 3         │
│                                                 │
│  Настройки конфиденциальности                   │
│  ═════════════════════════════                  │
│                                                 │
│  Как ваши ответы будут видны другим?            │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │  [○] Полностью анонимно                   │  │
│  │      Другие видят только агрегированные   │  │
│  │      результаты, без привязки к именам    │  │
│  │                                            │  │
│  │  [○] Анонимно с возможностью раскрытия    │  │
│  │      По умолчанию анонимно, но вы можете  │  │
│  │      раскрыть свои ответы позже           │  │
│  │                                            │  │
│  │  [○] С указанием имени                    │  │
│  │      Все видят, кто как ответил           │  │
│  │      (рекомендуется для малых семей)      │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ⚠️  Фасилитатор всегда видит все ответы       │
│      с указанием автора для лучшей работы.      │
│                                                 │
│  Доступ к вашим текстовым ответам:              │
│  [☑] Показывать мои комментарии всей семье     │
│  [☐] Показывать только фасилитатору            │
│                                                 │
│           [Продолжить →]                        │
│                                                 │
└────────────────────────────────────────────────┘
```

---

#### Screen 1.4: Assessment Mode Selection

**Layout:**
```
┌────────────────────────────────────────────────┐
│  ← Назад                     Шаг 3 из 3         │
│                                                 │
│  Выберите формат прохождения                    │
│  ════════════════════════════                   │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │  [○] Самостоятельно в своём темпе         │  │
│  │      ⏱️  90-120 минут                      │  │
│  │      Вы проходите assessment когда удобно, │  │
│  │      с автосохранением и возможностью     │  │
│  │      вернуться позже.                     │  │
│  │                                            │  │
│  │      [Начать сейчас] или [Запланировать]  │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │  [○] С фасилитатором (живая сессия)       │  │
│  │      ⏱️  2-3 часа                          │  │
│  │      Facilitator проводит всю семью через │  │
│  │      assessment с обсуждением в реальном  │  │
│  │      времени.                             │  │
│  │                                            │  │
│  │      Доступные слоты:                     │  │
│  │      • Завтра, 15:00 (Иванов А.)          │  │
│  │      • 3 ноября, 10:00 (Петрова М.)       │  │
│  │      • Предложить своё время              │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  💡 Рекомендация: Для первого assessment'а     │
│      советуем формат с фасилитатором.          │
│                                                 │
│           [Начать оценку →]                     │
│                                                 │
└────────────────────────────────────────────────┘
```

---

### 3.2 PHASE 2: Individual Assessment

#### Screen 2.1: Assessment Dashboard (Navigation Hub)

**Layout:**
```
┌────────────────────────────────────────────────┐
│  [ReFamily] Assessment        [User] [Help] [⋮] │
│                                                 │
│  Общий прогресс: ████████░░░░ 62% (65/105)      │
│  Расчётное время до завершения: ~35 минут       │
│                                                 │
│  ┌─────────────────────────────────────────┐   │
│  │  Измерения                               │   │
│  ├─────────────────────────────────────────┤   │
│  │  ✓ 1. Коммуникация и доверие     12/12  │   │
│  │  ✓ 2. Финансовая прозрачность    14/14  │   │
│  │  → 3. Следующее поколение        7/13   │   │
│  │  ○ 4. Принятие решений           0/15   │   │
│  │  ○ 5. Ценности и миссия          0/11   │   │
│  │  ○ 6. Структуры управления       0/16   │   │
│  │  ○ 7. Владение и контроль        0/14   │   │
│  │  ○ 8. Семейная идентичность      0/10   │   │
│  └─────────────────────────────────────────┘   │
│                                                 │
│  [Продолжить текущее измерение →]               │
│  [Выбрать другое измерение]                     │
│  [Сделать перерыв - сохранить прогресс]         │
│                                                 │
│  ═════════════════════════════════════════      │
│  Сейчас отвечают: Мария (85%), Дмитрий (45%)   │
│  Завершили: Анна, Сергей                        │
│                                                 │
└────────────────────────────────────────────────┘
```

**Features:**
- Live progress indicators
- Click any dimension to jump
- Auto-save notification every 30 sec
- Break reminders after 25 questions
- See family progress (optional)

---

#### Screen 2.2: Dimension Introduction

**Layout:**
```
┌────────────────────────────────────────────────┐
│  ← К списку измерений              3 из 8       │
│                                                 │
│  [Icon: users-graduation]                       │
│                                                 │
│  Развитие следующего поколения                  │
│  ══════════════════════════════                 │
│                                                 │
│  В этом разделе мы оценим, как ваша семья      │
│  готовит следующее поколение к управлению       │
│  семейным богатством и бизнесом.                │
│                                                 │
│  Вы ответите на вопросы о:                      │
│  • Образовательных программах и менторстве      │
│  • Вовлечении молодого поколения в решения     │
│  • Передаче ценностей и семейной истории       │
│  • Подготовке к ответственности                │
│                                                 │
│  ⏱️  Примерное время: 12-15 минут               │
│  📊 Вопросов в этом разделе: 13                │
│                                                 │
│  ┌────────────────────────────────────────┐    │
│  │  💡 Совет                               │    │
│  │  Отвечайте исходя из текущей           │    │
│  │  реальности, а не того, как "должно    │    │
│  │  быть". Честность важнее идеала.       │    │
│  └────────────────────────────────────────┘    │
│                                                 │
│           [Начать этот раздел →]                │
│                                                 │
└────────────────────────────────────────────────┘
```

---

#### Screen 2.3: Question Interface (Likert 7-point scale)

**Layout:**
```
┌────────────────────────────────────────────────┐
│  ← Назад     Следующее поколение    Вопрос 8/13│
│                                                 │
│  ████████████░░░░░░░░ 62%                       │
│                                                 │
│  Насколько следующее поколение понимает        │
│  финансовую структуру семейного богатства?      │
│                                                 │
│  Оцените уровень понимания Gen2/G3 того, как   │
│  устроены семейные инвестиции, бизнесы и       │
│  трасты.                                        │
│                                                 │
│  ┌────────────────────────────────────────┐    │
│  │  1 ────────────────────────────────── 7 │    │
│  │  [○]  [○]  [○]  [○]  [○]  [○]  [○]     │    │
│  │   │    │    │    │    │    │    │       │    │
│  │  Полное  Слабое  Базовое Хорошее  Полное│    │
│  │  непони- пони-   пони-   пони-    пони- │    │
│  │  мание   мание   мание   мание    мание │    │
│  └────────────────────────────────────────┘    │
│                                                 │
│  [Textarea - опционально]                       │
│  Добавьте комментарий, если хотите уточнить    │
│  свою оценку...                                │
│                                                 │
│                                                 │
│  [← Предыдущий вопрос]    [Следующий вопрос →] │
│  [Пропустить]              [Сохранить и выйти] │
│                                                 │
└────────────────────────────────────────────────┘
```

**Interaction rules:**
- Zero defaults: No radio button pre-selected
- Must click to select (can't proceed without answer or skip)
- Optional comment box expands on focus
- "Пропустить" available only if <3 skipped in dimension
- Auto-save 2 seconds after answer selection

---

#### Screen 2.4: Question Interface (Multiple Choice)

**Layout:**
```
┌────────────────────────────────────────────────┐
│  ← Назад     Структуры управления   Вопрос 5/16│
│                                                 │
│  ███░░░░░░░░░░░░░░ 31%                          │
│                                                 │
│  Какие формальные структуры управления         │
│  существуют в вашей семье?                     │
│                                                 │
│  Выберите все существующие структуры. Если     │
│  структура существует "на бумаге", но не       │
│  функционирует активно, всё равно отметьте её. │
│                                                 │
│  [☐] Семейный совет (Family Council)            │
│  [☐] Совет директоров семейного бизнеса        │
│  [☐] Инвестиционный комитет                    │
│  [☐] Комитет по распределению (для филантропии)│
│  [☐] Образовательный комитет (для G2/G3)       │
│  [☐] Конфликтный/медиационный комитет          │
│  [☐] Family Office (профессиональная команда)  │
│  [☐] Внешний консультативный совет             │
│  [☐] Другое: [_______________]                 │
│  [☐] У нас нет формальных структур             │
│                                                 │
│  💡 Не уверены? Формальная структура = есть    │
│     документ о создании, определённые роли     │
│     и регулярные встречи.                      │
│                                                 │
│  [← Предыдущий вопрос]    [Следующий вопрос →] │
│                                                 │
└────────────────────────────────────────────────┘
```

---

#### Screen 2.5: Break Reminder

**Layout:**
```
┌────────────────────────────────────────────────┐
│                                                 │
│                  [Icon: coffee]                 │
│                                                 │
│              Время сделать паузу?               │
│              ═══════════════════                │
│                                                 │
│  Вы ответили на 25 вопросов и работаете уже    │
│  32 минуты подряд. Исследования показывают, что │
│  качество ответов снижается при усталости.      │
│                                                 │
│  Ваш прогресс сохранён автоматически.           │
│                                                 │
│  ┌────────────────────────────────────────┐    │
│  │  Осталось:                              │    │
│  │  • 40 вопросов (~35 минут)              │    │
│  │  • 4 из 8 измерений завершены           │    │
│  └────────────────────────────────────────┘    │
│                                                 │
│         [Продолжить сейчас]                     │
│         [Сделать перерыв 5 минут]               │
│         [Вернуться позже]                       │
│                                                 │
└────────────────────────────────────────────────┘
```

---

#### Screen 2.6: Dimension Completion Celebration

**Layout:**
```
┌────────────────────────────────────────────────┐
│                                                 │
│                  [Icon: check-circle]           │
│                                                 │
│          Раздел завершён! 🎉                    │
│          ═════════════════                      │
│                                                 │
│  Вы завершили раздел "Следующее поколение"     │
│                                                 │
│  ┌────────────────────────────────────────┐    │
│  │  Ваш предварительный score: 5.2/7.0    │    │
│  │                                         │    │
│  │  ████████████░░░░ 74%                   │    │
│  │                                         │    │
│  │  Это выше среднего для семей на этой   │    │
│  │  стадии развития.                      │    │
│  └────────────────────────────────────────┘    │
│                                                 │
│  Общий прогресс: 52/105 вопросов (50%)         │
│  Осталось: ~45 минут                           │
│                                                 │
│  [Продолжить следующий раздел →]                │
│  [Вернуться к списку разделов]                 │
│  [Сделать перерыв]                             │
│                                                 │
└────────────────────────────────────────────────┘
```

---

### 3.3 PHASE 3: Real-time Synthesis (Backend)

#### 3.3.1 Scoring Algorithm

```typescript
// Core scoring engine
interface DimensionScore {
  dimension_id: string;
  raw_score: number; // 0-7 scale
  normalized_score: number; // 0-100 scale
  confidence: number; // Based on answer consistency
  weight: 'critical' | 'high' | 'medium';
}

function calculateDimensionScore(
  answers: Answer[],
  dimension: Dimension
): DimensionScore {
  
  // 1. Calculate raw score
  const scoredAnswers = answers.filter(a => !a.skipped);
  const sum = scoredAnswers.reduce((acc, answer) => {
    const question = getQuestion(answer.question_id);
    const normalizedValue = normalizeAnswer(
      answer.value, 
      question.type
    );
    const weight = question.scoring.weight || 1.0;
    return acc + (normalizedValue * weight);
  }, 0);
  
  const totalWeight = scoredAnswers.reduce((acc, answer) => {
    const question = getQuestion(answer.question_id);
    return acc + (question.scoring.weight || 1.0);
  }, 0);
  
  const raw_score = sum / totalWeight;
  
  // 2. Calculate confidence
  const completeness = scoredAnswers.length / dimension.questions.length;
  const consistency = calculateConsistency(scoredAnswers);
  const confidence = (completeness * 0.7) + (consistency * 0.3);
  
  // 3. Normalize to 0-100
  const normalized_score = (raw_score / 7.0) * 100;
  
  return {
    dimension_id: dimension.id,
    raw_score,
    normalized_score,
    confidence,
    weight: dimension.weight
  };
}
```

#### 3.3.2 Consensus Analysis

```typescript
interface ConsensusAnalysis {
  dimension_id: string;
  family_mean: number;
  family_median: number;
  std_deviation: number;
  range: { min: number; max: number };
  consensus_level: 'high' | 'moderate' | 'low' | 'critical_divergence';
  outliers: string[];
  
  question_consensus: {
    [question_id: string]: {
      std_dev: number;
      consensus: 'aligned' | 'divergent' | 'polarized';
      divergent_pairs?: Array<{ 
        user1: string; 
        user2: string; 
        diff: number 
      }>;
    }
  };
}

function analyzeConsensus(
  dimension_id: string,
  allAnswers: Map<string, Answer[]>
): ConsensusAnalysis {
  
  const scores = Array.from(userScores.values());
  const family_mean = scores.reduce((a, b) => a + b) / scores.length;
  
  const std_deviation = Math.sqrt(
    scores.reduce((acc, score) => 
      acc + Math.pow(score - family_mean, 2), 0) / scores.length
  );
  
  // Consensus classification
  let consensus_level: string;
  if (std_deviation < 10) consensus_level = 'high';
  else if (std_deviation < 20) consensus_level = 'moderate';
  else if (std_deviation < 30) consensus_level = 'low';
  else consensus_level = 'critical_divergence';
  
  return {
    dimension_id,
    family_mean,
    std_deviation,
    consensus_level,
    // ... more fields
  };
}
```

#### 3.3.3 Pattern Detection & Insight Generation

```typescript
interface GeneratedInsight {
  type: 'strength' | 'concern' | 'divergence' | 'opportunity';
  priority: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  affected_dimensions: string[];
  evidence: string[];
  recommendation?: string;
  suggested_workshop?: string;
}

function generateInsights(
  dimensionScores: DimensionScore[],
  consensusData: ConsensusAnalysis[],
  familyContext: FamilyProfile
): GeneratedInsight[] {
  
  const insights: GeneratedInsight[] = [];
  
  // 1. Identify strengths (high scores with high consensus)
  for (const dimension of dimensionScores) {
    const consensus = consensusData.find(c => 
      c.dimension_id === dimension.dimension_id
    );
    
    if (dimension.normalized_score > 75 && 
        consensus.consensus_level === 'high') {
      insights.push({
        type: 'strength',
        priority: 'medium',
        title: `Сильная сторона: ${getDimensionName(dimension.dimension_id)}`,
        description: `Ваша семья демонстрирует высокий уровень...`,
        affected_dimensions: [dimension.dimension_id],
        evidence: [
          `Средний балл: ${dimension.normalized_score.toFixed(1)}/100`,
          `Разброс мнений: ${consensus.std_deviation.toFixed(1)} (низкий)`
        ]
      });
    }
  }
  
  // 2. Cross-dimensional patterns
  // Pattern: Strong values but weak execution
  const valuesScore = scores.find(s => s.dimension_id === '5_values_mission');
  const governanceScore = scores.find(s => s.dimension_id === '6_governance_structures');
  
  if (valuesScore.normalized_score > 70 && 
      governanceScore.normalized_score < 40) {
    insights.push({
      type: 'opportunity',
      priority: 'high',
      title: 'Возможность: От ценностей к структурам',
      description: 'У вашей семьи есть сильная основа общих ценностей, но слабые структуры управления...',
      affected_dimensions: ['5_values_mission', '6_governance_structures'],
      suggested_workshop: 'governance_workshop'
    });
  }
  
  return insights.sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}
```

---

### 3.4 PHASE 4: Results & Discussion

#### Screen 4.1: Results Dashboard (Main View)

**Layout:**
```
┌────────────────────────────────────────────────────────────────┐
│  [ReFamily] Assessment Results              [Export] [Share]   │
│                                                                 │
│  Семейная оценка завершена ✓                                   │
│  Участников: 5  |  Завершено: 5  |  Дата: 31 окт 2025         │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │                RADAR CHART                                │  │
│  │                                                           │  │
│  │                   Коммуникация                            │  │
│  │                      ╱│╲                                  │  │
│  │                    ╱  │  ╲                                │  │
│  │    Идентичность  ╱    │    ╲  Финансы                    │  │
│  │           ╲    ╱      │      ╲    ╱                       │  │
│  │            ╲  ╱       │       ╲  ╱                        │  │
│  │    Владение─────────●─────────Следующее                   │  │
│  │            ╱  ╲       │       ╱  ╲       поколение        │  │
│  │           ╱    ╲      │      ╱    ╲                       │  │
│  │  Структуры      ╲    │    ╱  Решения                     │  │
│  │                   ╲  │  ╱                                 │  │
│  │                    ╲│╱                                    │  │
│  │                  Ценности                                 │  │
│  │                                                           │  │
│  │  ─── Ваша семья     ─ ─ Средний показатель              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  Общий индекс зрелости: 64/100                                 │
│  ████████████░░░░░░░░                                          │
│  Уровень: "Развивающаяся семья"                                │
│                                                                 │
│  📊 Детализация по измерениям:                                 │
│                                                                 │
│  1. Коммуникация и доверие          78/100 █████████░         │
│     Consensus: ●●●●○ High                                      │
│     → Сильная сторона                                          │
│                                                                 │
│  2. Финансовая прозрачность         45/100 ████░░░░░░         │
│     Consensus: ●●○○○ Low                                       │
│     ⚠️  Требует внимания + расхождение во взглядах             │
│                                                                 │
│  3. Следующее поколение             68/100 ██████░░░░         │
│     Consensus: ●●●●○ High                                      │
│     → Хороший прогресс                                         │
│                                                                 │
│  [Посмотреть детали →]  [Анализ консенсуса →]  [Insights →]   │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

#### Screen 4.2: Consensus Map

**Layout:**
```
┌────────────────────────────────────────────────────────────────┐
│  ← Back to Dashboard                                            │
│                                                                 │
│  Карта консенсуса                                               │
│  ═════════════                                                  │
│                                                                 │
│  Где семья единодушна, а где есть значительные расхождения?    │
│                                                                 │
│  🔍 Ключевые зоны расхождения:                                 │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  1. Вопрос: "Достаточна ли финансовая информация        │   │
│  │     для принятия решений?"                              │   │
│  │                                                          │   │
│  │     G1 (Основатели):     2.0 / 7.0 (Нет)               │   │
│  │     G2 (Наследники):     6.5 / 7.0 (Да)                │   │
│  │     Разрыв: 4.5 пункта 🚨                               │   │
│  │                                                          │   │
│  │     💡 Insight: Основатели считают, что делятся          │   │
│  │        достаточно, но G2 не согласны. Это может         │   │
│  │        указывать на проблему в коммуникации.            │   │
│  │                                                          │   │
│  │     [Добавить в приоритеты для обсуждения]              │   │
│  │                                                          │   │
│  ├────────────────────────────────────────────────────────┤   │
│  │  2. Вопрос: "Чёткость процесса принятия решений"        │   │
│  │                                                          │   │
│  │     Мария:    6.0 / 7.0                                 │   │
│  │     Дмитрий:  2.0 / 7.0                                 │   │
│  │     Анна:     3.0 / 7.0                                 │   │
│  │     Сергей:   5.0 / 7.0                                 │   │
│  │     Разброс: σ = 1.8                                    │   │
│  │                                                          │   │
│  │     💡 Insight: Нет единого понимания процесса.          │   │
│  │        Необходим workshop по decision-making.           │   │
│  │                                                          │   │
│  │     [Добавить в приоритеты]                             │   │
│  │                                                          │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                 │
│  [Показать все расхождения (15)] [Export consensus report]     │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

#### Screen 4.3: AI-Generated Insights & Recommendations

**Layout:**
```
┌────────────────────────────────────────────────────────────────┐
│  ← Back to Dashboard                                            │
│                                                                 │
│  Insights & Рекомендации                                        │
│  ════════════════════════                                       │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  🚨 КРИТИЧЕСКИЙ ПРИОРИТЕТ                                 │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │                                                           │  │
│  │  Разрыв в преемственности                                │  │
│  │                                                           │  │
│  │  Ваше следующее поколение развивается хорошо (68/100),   │  │
│  │  но отсутствует чёткий план передачи владения и          │  │
│  │  контроля (41/100). Это создаёт риск конфликтов          │  │
│  │  через 3-5 лет.                                          │  │
│  │                                                           │  │
│  │  📊 Затронутые измерения:                                │  │
│  │     • Следующее поколение: 68/100                        │  │
│  │     • Владение и контроль: 41/100                        │  │
│  │     • Структуры управления: 38/100                       │  │
│  │                                                           │  │
│  │  💡 Рекомендация:                                         │  │
│  │  1. Приоритетно создать succession plan                  │  │
│  │  2. Внедрить ownership framework                         │  │
│  │  3. Провести семейную встречу для обсуждения             │  │
│  │     ожиданий и таймлайнов                                │  │
│  │                                                           │  │
│  │  🎯 Следующий шаг:                                        │  │
│  │  [Начать Succession Workshop →]                          │  │
│  │                                                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  ⚠️  ВЫСОКИЙ ПРИОРИТЕТ                                    │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │                                                           │  │
│  │  Межпоколенческий разрыв в финансовой прозрачности       │  │
│  │                                                           │  │
│  │  Основатели (G1) и наследники (G2) имеют противоположные │  │
│  │  взгляды на уровень финансовой информации.               │  │
│  │                                                           │  │
│  │  🎯 Следующий шаг:                                        │  │
│  │  [Запланировать Family Meeting]                          │  │
│  │  [Начать Financial Transparency Workshop]                │  │
│  │                                                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  ✅ СИЛЬНАЯ СТОРОНА                                       │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │                                                           │  │
│  │  Прочный фундамент ценностей                             │  │
│  │                                                           │  │
│  │  Ваша семья демонстрирует высокий уровень (71/100) в     │  │
│  │  области ценностей и миссии с практически полным         │  │
│  │  согласием между всеми членами семьи.                    │  │
│  │                                                           │  │
│  │  💡 Возможность:                                          │  │
│  │  Используйте эту сильную основу для создания             │  │
│  │  governance structures.                                  │  │
│  │                                                           │  │
│  │  🎯 Следующий шаг:                                        │  │
│  │  [Начать Governance Workshop] ← Вы готовы!               │  │
│  │                                                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  [Показать все insights (8)] [Export full report]              │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

### 3.5 PHASE 5: Action Planning

#### Screen 5.1: Priority Selection

**Layout:**
```
┌────────────────────────────────────────────────────────────────┐
│  Plan Your Next Steps                                           │
│  ═════════════════════                                          │
│                                                                 │
│  На основе результатов assessment мы рекомендуем следующие     │
│  приоритеты. Выберите top 3 для фокуса в ближайшие 3-6 месяцев.│
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  [☐] 1. Создать succession plan и ownership framework  │   │
│  │      Priority: 🚨 Critical                             │   │
│  │      Effort: High (3-6 months)                         │   │
│  │      Impact: Prevents future conflicts                 │   │
│  │      Recommended workshop: Succession & Development    │   │
│  │                                                         │   │
│  ├────────────────────────────────────────────────────────┤   │
│  │  [☐] 2. Установить governance structures               │   │
│  │      Priority: ⚠️  High                                 │   │
│  │      Effort: Medium (2-4 months)                       │   │
│  │      Impact: Formalize decision-making                 │   │
│  │      Recommended workshop: Governance Workshop         │   │
│  │                                                         │   │
│  ├────────────────────────────────────────────────────────┤   │
│  │  [☐] 3. Провести межпоколенческий диалог о финансах   │   │
│  │      Priority: ⚠️  High                                 │   │
│  │      Effort: Low (1-2 sessions)                        │   │
│  │      Impact: Improves transparency & trust             │   │
│  │      Recommended: Facilitated family meeting           │   │
│  │                                                         │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                 │
│  Выбрано: 0 / 3 (рекомендуем не более 3)                       │
│                                                                 │
│  [Продолжить →]                                                 │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

#### Screen 5.2: Timeline & Accountability

**Layout:**
```
┌────────────────────────────────────────────────────────────────┐
│  Action Plan Timeline                                           │
│  ═════════════════════                                          │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  Priority 1: Succession plan                           │   │
│  │                                                         │   │
│  │  Когда начать:                                         │   │
│  │  [○] В течение месяца (рекомендовано)                  │   │
│  │  [○] Через 1-3 месяца                                  │   │
│  │  [○] Через 3-6 месяцев                                 │   │
│  │                                                         │   │
│  │  Ответственный:                                        │   │
│  │  [Dropdown: Выберите члена семьи...]                   │   │
│  │                                                         │   │
│  │  Первый шаг:                                           │   │
│  │  [Textarea: Что конкретно сделаем первым?]             │   │
│  │  Suggestion: "Запланировать kickoff meeting            │   │
│  │  с фасилитатором для succession workshop"              │   │
│  │                                                         │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌────────────────────────────────────────────────────────┐   │
│  │  📅 Suggested Timeline                                  │   │
│  │                                                         │   │
│  │  Nov 2025    Launch Succession Workshop                │   │
│  │  Dec 2025    Complete succession plan draft            │   │
│  │  Jan 2026    Start Governance Workshop                 │   │
│  │  Feb 2026    Family meeting on financial transparency  │   │
│  │  Mar 2026    Review progress & adjust                  │   │
│  └────────────────────────────────────────────────────────┘   │
│                                                                 │
│  [← Back]  [Save Action Plan]  [Schedule Workshops →]          │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

#### Screen 5.3: Export & Sharing

**Layout:**
```
┌────────────────────────────────────────────────────────────────┐
│  Export & Share Results                                         │
│  ═══════════════════════                                        │
│                                                                 │
│  Что включить в отчёт?                                          │
│                                                                 │
│  [☑] Общий dashboard с radar chart                             │
│  [☑] Детальные scores по измерениям                            │
│  [☑] AI-generated insights                                     │
│  [☑] Consensus analysis                                        │
│  [☐] Individual answers (requires permission)                  │
│  [☑] Action plan with timeline                                 │
│                                                                 │
│  Формат:                                                        │
│  [○] PDF Report (comprehensive)                                │
│  [○] PowerPoint Slides (for presentation)                      │
│  [○] Excel Spreadsheet (raw data)                              │
│  [○] All formats                                               │
│                                                                 │
│  [Generate & Download]  [Share via Email]  [Add to Projects]   │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

## 4. DATA SCHEMAS

### 4.1 Core Entities

```typescript
// Assessment Session
interface AssessmentSession {
  session_id: string;
  family_id: string;
  created_at: timestamp;
  status: 'draft' | 'in_progress' | 'completed' | 'archived';
  
  mode: 'self_paced' | 'facilitated' | 'ai_guided';
  facilitator_id?: string;
  language: 'en' | 'ru';
  
  invited_users: string[];
  completed_users: string[];
  overall_progress: number;
  
  results_generated: boolean;
  action_plan_created: boolean;
}

// User Assessment Data
interface UserAssessment {
  user_assessment_id: string;
  session_id: string;
  user_id: string;
  
  role: FamilyRole;
  generation: 'G1' | 'G2' | 'G3+' | 'external';
  privacy_settings: PrivacySettings;
  
  completion_percentage: number;
  total_time_seconds: number;
  answers: Answer[];
}

// Answer
interface Answer {
  answer_id: string;
  user_assessment_id: string;
  question_id: string;
  dimension_id: string;
  
  value: any;
  text_comment?: string;
  
  answered_at: timestamp;
  time_to_answer_seconds: number;
  skipped: boolean;
}

// Dimension Score
interface DimensionScore {
  score_id: string;
  session_id: string;
  dimension_id: string;
  
  raw_score: number; // 1-7
  normalized_score: number; // 0-100
  confidence: number; // 0-1
}

// Consensus Analysis
interface ConsensusAnalysis {
  analysis_id: string;
  session_id: string;
  dimension_id: string;
  
  family_mean: number;
  std_deviation: number;
  consensus_level: 'high' | 'moderate' | 'low' | 'critical_divergence';
  outliers: string[];
}

// Generated Insight
interface GeneratedInsight {
  insight_id: string;
  session_id: string;
  
  type: 'strength' | 'concern' | 'divergence' | 'opportunity';
  priority: 'critical' | 'high' | 'medium' | 'low';
  
  title: string;
  description: string;
  affected_dimensions: string[];
  evidence: string[];
  recommendation?: string;
  suggested_workshop?: string;
}

// Action Plan
interface ActionPlan {
  plan_id: string;
  session_id: string;
  priorities: Priority[];
  
  created_at: timestamp;
  status: 'draft' | 'active' | 'completed';
}

interface Priority {
  priority_id: string;
  rank: number; // 1, 2, 3
  title: string;
  
  target_start: date;
  target_completion: date;
  owner_user_id: string;
  
  first_step: string;
  milestones: Milestone[];
  suggested_workshop_id?: string;
}
```

---

## 5. API ENDPOINTS

```typescript
// Start Assessment
POST /api/v1/assessments
Request: {
  family_id: string;
  mode: 'self_paced' | 'facilitated';
  invited_users: string[];
}
Response: {
  session_id: string;
  invite_links: { [user_id: string]: string };
}

// Submit Answer
POST /api/v1/assessments/:session_id/answers
Request: {
  user_id: string;
  question_id: string;
  value: any;
  text_comment?: string;
}
Response: {
  answer_id: string;
  next_question_id?: string;
  overall_progress: number;
}

// Generate Results
POST /api/v1/assessments/:session_id/generate-results
Response: {
  results_id: string;
  status: 'generating' | 'complete';
}

// Get Results
GET /api/v1/assessments/:session_id/results
Response: {
  overall_maturity_score: number;
  dimension_scores: DimensionScore[];
  consensus_analysis: ConsensusAnalysis[];
  insights: GeneratedInsight[];
}

// Create Action Plan
POST /api/v1/assessments/:session_id/action-plan
Request: {
  priorities: Array<{
    insight_id: string;
    rank: number;
    target_start: date;
    owner_user_id: string;
  }>;
}
Response: {
  plan_id: string;
  action_plan: ActionPlan;
}

// Export Results
POST /api/v1/assessments/:session_id/export
Request: {
  format: 'pdf' | 'pptx' | 'xlsx';
  include: {...}
}
Response: {
  export_id: string;
  download_url: string;
}
```

---

## 6. COLLABORATIVE MECHANICS

### 6.1 Real-time Progress Visibility

- WebSocket updates для live progress
- Family members видят кто онлайн и на каком этапе
- Notifications когда все завершили assessment

### 6.2 Privacy Controls

- Три уровня анонимности
- Facilitator всегда видит полные данные
- Опция изменить privacy после завершения

### 6.3 Discussion Facilitation

- Автоматические discussion points based on divergence
- Suggested meeting agendas
- Live collaborative mode для facilitated sessions

---

## 7. SAMPLE QUESTIONS

### Dimension 1: Communication & Trust

**Q1.1** (Likert 7): Насколько свободно члены семьи обсуждают сложные темы (финансы, конфликты, переживания)?

**Q1.2** (Likert 7): Насколько вы доверяете, что семья будет действовать в ваших интересах при принятии решений?

**Q1.3** (Multiple Choice): Как часто семья собирается для обсуждения важных вопросов?
- Еженедельно
- Ежемесячно
- Раз в квартал
- Раз в год
- Реже раза в год
- Не собираемся регулярно

### Dimension 2: Financial Transparency

**Q2.1** (Likert 7): Насколько прозрачна финансовая информация о семейном богатстве?

**Q2.2** (Multi-select): Кто имеет доступ к полной финансовой картине?
- G1 (основатели)
- G2 (наследники)
- G3+ (следующие поколения)
- Супруги членов семьи
- Family office team
- Внешние советники

**Q2.3** (Binary): Существуют ли регулярные финансовые отчёты для семьи?

### Dimension 3: Next Generation Development

**Q3.1** (Likert 7): Насколько следующее поколение понимает финансовую структуру семейного богатства?

**Q3.2** (Multi-select): Какие образовательные программы существуют для G2/G3?
- Формальное обучение финансам
- Менторство старшего поколения
- Стажировки в семейном бизнесе
- Участие в family meetings
- Внешние курсы/программы
- Ничего формального

---

## 8. DEVELOPMENT ROADMAP

### Phase 1: MVP (8 weeks)
- Core assessment flow (все 105 вопросов)
- Basic scoring & results dashboard
- Manual insight generation
- PDF export

### Phase 2: Intelligence (6 weeks)
- Automated insight generation
- Consensus analysis
- Benchmarking data
- AI discussion facilitator

### Phase 3: Ecosystem (4 weeks)
- Integration with workshops
- Action plan tracking
- Progress monitoring over time
- Re-assessment triggers

### Phase 4: Advanced (ongoing)
- Multi-language support
- Mobile optimization
- Video/audio responses
- Industry-specific templates

---

## 9. SUCCESS METRICS

**Engagement:**
- Completion rate >85%
- Average time: 90-120 min
- Return rate for follow-up assessments

**Quality:**
- <10% skip rate per dimension
- High confidence scores (>0.7)
- Consistency in answers

**Impact:**
- 70%+ families create action plan
- 50%+ schedule recommended workshop
- Measurable score improvement in re-assessments

---

## 10. TECHNICAL REQUIREMENTS

**Frontend:**
- React/Next.js
- Responsive design (desktop primary, mobile secondary)
- Auto-save functionality
- Real-time collaboration via WebSockets

**Backend:**
- RESTful API + WebSockets
- Postgres database
- Redis for session management
- ML pipeline for insight generation

**Infrastructure:**
- HIPAA-compliant hosting
- End-to-end encryption
- Regular backups
- <2s response time for questions

---

**END OF SPECIFICATION**

*Version 1.0 | Last Updated: October 31, 2025*