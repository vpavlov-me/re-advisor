# Phase 3: Real-time Synthesis - Logic & Algorithms

---

**Phase:** 3 of 5
**Duration:** Automatic (background processing)
**Purpose:** Transform raw answers into actionable insights through scoring, consensus analysis, and pattern detection

---

## Overview

Phase 3 runs **automatically in the background** as users complete the assessment. It consists of several interconnected algorithms that:

1. Calculate scores for each dimension
2. Analyze consensus across family members
3. Detect cross-dimensional patterns
4. Generate AI-powered insights
5. Create personalized recommendations

**User-facing:** No screens. Processing happens server-side.
**Developer-facing:** Complex algorithms, ML models, data pipelines.

---

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                      Raw Answers                              │
│                   (from Phase 2)                              │
└──────────────────────────────────────────────────────────────┘
                          │
                          ↓
┌──────────────────────────────────────────────────────────────┐
│                  STEP 1: Answer Normalization                 │
│  • Convert all answer types to normalized 0-1 scale           │
│  • Apply question-specific transformations                    │
│  • Handle skipped questions                                   │
└──────────────────────────────────────────────────────────────┘
                          │
                          ↓
┌──────────────────────────────────────────────────────────────┐
│                  STEP 2: Dimension Scoring                    │
│  • Calculate raw scores per dimension                         │
│  • Apply weighting factors                                    │
│  • Compute confidence scores                                  │
│  • Generate 0-100 normalized scores                           │
└──────────────────────────────────────────────────────────────┘
                          │
                          ↓
┌──────────────────────────────────────────────────────────────┐
│                  STEP 3: Consensus Analysis                   │
│  • Compare answers across family members                      │
│  • Calculate standard deviation                               │
│  • Identify outliers                                          │
│  • Detect polarization patterns                               │
└──────────────────────────────────────────────────────────────┘
                          │
                          ↓
┌──────────────────────────────────────────────────────────────┐
│                  STEP 4: Pattern Detection                    │
│  • Cross-dimensional analysis                                 │
│  • Generational gap detection                                 │
│  • Identify strengths and concerns                            │
│  • Benchmark against similar families                         │
└──────────────────────────────────────────────────────────────┘
                          │
                          ↓
┌──────────────────────────────────────────────────────────────┐
│                  STEP 5: Insight Generation                   │
│  • AI-powered insight creation                                │
│  • Priority ranking                                           │
│  • Workshop recommendations                                   │
│  • Action plan suggestions                                    │
└──────────────────────────────────────────────────────────────┘
                          │
                          ↓
┌──────────────────────────────────────────────────────────────┐
│                    Results Package                            │
│                   (to Phase 4)                                │
└──────────────────────────────────────────────────────────────┘
```

---

## STEP 1: Answer Normalization

### Purpose
Convert diverse answer types into comparable numerical values.

### Algorithm

```typescript
/**
 * Normalize any answer to 0-1 scale
 */
function normalizeAnswer(
  answer: Answer,
  question: Question
): number {

  switch (question.type) {

    case 'likert_7':
      // 1-7 scale → 0-1 scale
      return (answer.value - 1) / 6;

    case 'likert_5':
      // 1-5 scale → 0-1 scale
      return (answer.value - 1) / 4;

    case 'binary':
      // Yes/No → 1/0
      return answer.value === 'yes' ? 1.0 : 0.0;

    case 'multiple_choice':
      // Map to question-specific scale
      const optionScore = question.scoring.option_values[answer.value];
      return optionScore; // Pre-defined 0-1 value

    case 'multi_select':
      // Count selected "positive" options
      const positiveSelections = answer.selected_options.filter(
        opt => question.scoring.positive_options.includes(opt)
      ).length;
      const totalPositive = question.scoring.positive_options.length;
      return positiveSelections / totalPositive;

    case 'text_short':
      // Requires manual scoring or NLP
      return question.scoring.manual_score || null;

    case 'ranking':
      // Weight by rank position
      const weights = [1.0, 0.8, 0.6, 0.4, 0.2];
      return calculateRankingScore(answer.ranked_items, weights);

    default:
      throw new Error(`Unknown question type: ${question.type}`);
  }
}

/**
 * Handle skipped questions
 */
function handleSkipped(answer: Answer): number | null {
  if (answer.skipped) {
    return null; // Exclude from calculations
  }
  return normalizeAnswer(answer, getQuestion(answer.question_id));
}
```

### Example Transformations

| Question Type | Raw Answer | Normalized Value |
|--------------|-----------|------------------|
| Likert 7 | 5 | 0.667 |
| Likert 5 | 3 | 0.500 |
| Binary | Yes | 1.000 |
| Multiple Choice | "Quarterly" | 0.600 (predefined) |
| Multi-select | [A, B, D] from [A,B,C,D,E] | 0.600 (3/5) |

---

## STEP 2: Dimension Scoring

### Purpose
Calculate meaningful scores for each of the 8 dimensions.

### Algorithm

```typescript
interface DimensionScore {
  dimension_id: string;
  raw_score: number;           // 0-1 scale
  normalized_score: number;    // 0-100 scale
  confidence: number;          // 0-1 scale
  weight: 'critical' | 'high' | 'medium';
  benchmark_percentile?: number; // vs. similar families
}

/**
 * Calculate dimension score for a single user
 */
function calculateDimensionScore(
  userAnswers: Answer[],
  dimension: Dimension
): DimensionScore {

  // 1. Filter answers for this dimension
  const dimensionAnswers = userAnswers.filter(
    a => a.dimension_id === dimension.id
  );

  // 2. Normalize and weight each answer
  const scoredAnswers = dimensionAnswers
    .filter(a => !a.skipped)
    .map(answer => {
      const question = getQuestion(answer.question_id);
      const normalized = normalizeAnswer(answer, question);
      const weight = question.scoring.weight || 1.0;

      return {
        normalized_value: normalized,
        weight: weight,
        question_id: question.id
      };
    });

  // 3. Calculate weighted average
  const totalWeightedScore = scoredAnswers.reduce(
    (sum, item) => sum + (item.normalized_value * item.weight),
    0
  );

  const totalWeight = scoredAnswers.reduce(
    (sum, item) => sum + item.weight,
    0
  );

  const raw_score = totalWeightedScore / totalWeight;

  // 4. Calculate confidence
  const completeness = scoredAnswers.length / dimension.questions.length;
  const consistency = calculateConsistency(scoredAnswers);
  const confidence = (completeness * 0.7) + (consistency * 0.3);

  // 5. Normalize to 0-100 scale
  const normalized_score = raw_score * 100;

  // 6. Benchmark (if data available)
  const benchmark_percentile = calculatePercentile(
    normalized_score,
    dimension.benchmark_data
  );

  return {
    dimension_id: dimension.id,
    raw_score,
    normalized_score,
    confidence,
    weight: dimension.weight,
    benchmark_percentile
  };
}

/**
 * Calculate answer consistency (detect random/contradictory answers)
 */
function calculateConsistency(
  scoredAnswers: Array<{normalized_value: number}>
): number {
  // Check for related question pairs
  const relatedPairs = getRelatedQuestionPairs();

  let totalDifference = 0;
  let pairCount = 0;

  for (const pair of relatedPairs) {
    const answer1 = scoredAnswers.find(a => a.question_id === pair.q1);
    const answer2 = scoredAnswers.find(a => a.question_id === pair.q2);

    if (answer1 && answer2) {
      // Expect similar answers for related questions
      const difference = Math.abs(
        answer1.normalized_value - answer2.normalized_value
      );
      totalDifference += difference;
      pairCount++;
    }
  }

  if (pairCount === 0) return 1.0; // No related pairs to check

  const avgDifference = totalDifference / pairCount;

  // High consistency = low difference
  // 0 difference = 1.0 consistency
  // 0.5 difference = 0.5 consistency
  return Math.max(0, 1.0 - (avgDifference * 2));
}
```

### Question Weighting

Different questions have different importance:

```typescript
interface QuestionScoring {
  weight: number;          // 0.5 - 2.0 (default 1.0)
  invert_score?: boolean;  // Reverse scoring for negative questions
  option_values?: {        // For multiple choice
    [option_id: string]: number
  };
}

// Example: High-weight question
{
  question_id: 'Q1.3',
  text: 'Do family members trust each other?',
  scoring: {
    weight: 2.0  // 2× more important than standard questions
  }
}

// Example: Inverted scoring
{
  question_id: 'Q4.8',
  text: 'How often do conflicts escalate to legal action?',
  scoring: {
    weight: 1.5,
    invert_score: true  // More conflicts = lower score
  }
}
```

### Overall Maturity Index

```typescript
/**
 * Calculate family's overall governance maturity
 */
function calculateMaturityIndex(
  dimensionScores: DimensionScore[]
): number {

  // Weight by dimension importance
  const weights = {
    'critical': 2.0,
    'high': 1.5,
    'medium': 1.0
  };

  const weightedSum = dimensionScores.reduce((sum, dim) => {
    const weight = weights[dim.weight];
    return sum + (dim.normalized_score * weight * dim.confidence);
  }, 0);

  const totalWeight = dimensionScores.reduce((sum, dim) => {
    const weight = weights[dim.weight];
    return sum + (weight * dim.confidence);
  }, 0);

  return weightedSum / totalWeight; // 0-100 scale
}
```

---

## STEP 3: Consensus Analysis

### Purpose
Identify where family members agree and where they diverge.

### Algorithm

```typescript
interface ConsensusAnalysis {
  dimension_id: string;

  // Aggregate statistics
  family_mean: number;         // Average score
  family_median: number;       // Median score
  std_deviation: number;       // Standard deviation
  range: { min: number; max: number };

  // Consensus classification
  consensus_level: 'high' | 'moderate' | 'low' | 'critical_divergence';

  // Outliers
  outliers: Array<{
    user_id: string;
    score: number;
    deviation_from_mean: number;
  }>;

  // Question-level consensus
  question_consensus: {
    [question_id: string]: QuestionConsensus;
  };

  // Generational gaps
  generational_analysis?: GenerationalGapAnalysis;
}

interface QuestionConsensus {
  question_id: string;
  std_dev: number;
  consensus: 'aligned' | 'divergent' | 'polarized';

  // For polarized questions
  divergent_pairs?: Array<{
    user1_id: string;
    user2_id: string;
    difference: number;
    user1_value: number;
    user2_value: number;
  }>;
}

/**
 * Analyze consensus across family
 */
function analyzeConsensus(
  dimension_id: string,
  allUserScores: Map<string, DimensionScore>
): ConsensusAnalysis {

  const scores = Array.from(allUserScores.values())
    .map(ds => ds.normalized_score);

  // Basic statistics
  const family_mean = mean(scores);
  const family_median = median(scores);
  const std_deviation = standardDeviation(scores);
  const range = { min: Math.min(...scores), max: Math.max(...scores) };

  // Classify consensus level
  let consensus_level: string;
  if (std_deviation < 10) {
    consensus_level = 'high';         // Very aligned
  } else if (std_deviation < 20) {
    consensus_level = 'moderate';     // Some differences
  } else if (std_deviation < 30) {
    consensus_level = 'low';          // Significant divergence
  } else {
    consensus_level = 'critical_divergence'; // Major disagreement
  }

  // Identify outliers (>1.5 std devs from mean)
  const outliers = Array.from(allUserScores.entries())
    .filter(([user_id, score]) => {
      const deviation = Math.abs(score.normalized_score - family_mean);
      return deviation > (std_deviation * 1.5);
    })
    .map(([user_id, score]) => ({
      user_id,
      score: score.normalized_score,
      deviation_from_mean: score.normalized_score - family_mean
    }));

  // Question-level analysis
  const question_consensus = analyzeQuestionConsensus(
    dimension_id,
    allUserScores
  );

  // Generational gap analysis
  const generational_analysis = analyzeGenerationalGaps(
    dimension_id,
    allUserScores
  );

  return {
    dimension_id,
    family_mean,
    family_median,
    std_deviation,
    range,
    consensus_level,
    outliers,
    question_consensus,
    generational_analysis
  };
}

/**
 * Analyze consensus for each question
 */
function analyzeQuestionConsensus(
  dimension_id: string,
  allUserScores: Map<string, DimensionScore>
): { [question_id: string]: QuestionConsensus } {

  const dimension = getDimension(dimension_id);
  const result: { [key: string]: QuestionConsensus } = {};

  for (const question of dimension.questions) {
    // Get all answers to this question
    const answers = getAllAnswers(question.id);
    const normalizedValues = answers
      .filter(a => !a.skipped)
      .map(a => normalizeAnswer(a, question));

    const std_dev = standardDeviation(normalizedValues);

    // Classify consensus
    let consensus: string;
    if (std_dev < 0.15) {
      consensus = 'aligned';      // Very similar answers
    } else if (std_dev < 0.30) {
      consensus = 'divergent';    // Some difference
    } else {
      consensus = 'polarized';    // Major disagreement
    }

    // For polarized questions, identify specific divergent pairs
    let divergent_pairs = undefined;
    if (consensus === 'polarized') {
      divergent_pairs = findDivergentPairs(answers, normalizedValues);
    }

    result[question.id] = {
      question_id: question.id,
      std_dev,
      consensus,
      divergent_pairs
    };
  }

  return result;
}

/**
 * Detect generational gaps
 */
interface GenerationalGapAnalysis {
  g1_mean: number;
  g2_mean: number;
  g3_mean?: number;

  g1_g2_gap: number;      // Difference between G1 and G2
  gap_significance: 'none' | 'small' | 'moderate' | 'large';

  interpretation: string;
}

function analyzeGenerationalGaps(
  dimension_id: string,
  allUserScores: Map<string, DimensionScore>
): GenerationalGapAnalysis | undefined {

  // Group scores by generation
  const g1Scores: number[] = [];
  const g2Scores: number[] = [];
  const g3Scores: number[] = [];

  for (const [user_id, score] of allUserScores) {
    const user = getUser(user_id);

    if (user.generation === 'G1') {
      g1Scores.push(score.normalized_score);
    } else if (user.generation === 'G2') {
      g2Scores.push(score.normalized_score);
    } else if (user.generation === 'G3+') {
      g3Scores.push(score.normalized_score);
    }
  }

  // Need at least 2 generations to compare
  if (g1Scores.length === 0 || g2Scores.length === 0) {
    return undefined;
  }

  const g1_mean = mean(g1Scores);
  const g2_mean = mean(g2Scores);
  const g3_mean = g3Scores.length > 0 ? mean(g3Scores) : undefined;

  const g1_g2_gap = Math.abs(g1_mean - g2_mean);

  // Classify gap significance
  let gap_significance: string;
  if (g1_g2_gap < 10) {
    gap_significance = 'none';
  } else if (g1_g2_gap < 20) {
    gap_significance = 'small';
  } else if (g1_g2_gap < 30) {
    gap_significance = 'moderate';
  } else {
    gap_significance = 'large';
  }

  // Generate interpretation
  const dimension_name = getDimension(dimension_id).name;
  let interpretation = '';

  if (gap_significance === 'large') {
    if (g1_mean > g2_mean) {
      interpretation = `Старшее поколение (G1) оценивает "${dimension_name}" значительно выше (${g1_mean.toFixed(1)}), чем следующее поколение (G2: ${g2_mean.toFixed(1)}). Это может указывать на различия в восприятии или опыте.`;
    } else {
      interpretation = `Следующее поколение (G2) оценивает "${dimension_name}" выше (${g2_mean.toFixed(1)}), чем старшее поколение (G1: ${g1_mean.toFixed(1)}). Возможно, G1 более критичны или G2 более оптимистичны.`;
    }
  }

  return {
    g1_mean,
    g2_mean,
    g3_mean,
    g1_g2_gap,
    gap_significance,
    interpretation
  };
}
```

---

## STEP 4: Pattern Detection

### Purpose
Identify cross-dimensional patterns and family-specific characteristics.

### Common Patterns

```typescript
interface DetectedPattern {
  pattern_type: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  affected_dimensions: string[];
  description: string;
  evidence: string[];
  recommendation: string;
}

/**
 * Detect common family governance patterns
 */
function detectPatterns(
  dimensionScores: DimensionScore[],
  consensusData: ConsensusAnalysis[]
): DetectedPattern[] {

  const patterns: DetectedPattern[] = [];

  // Pattern 1: Strong values, weak execution
  patterns.push(...detectValuesExecutionGap(dimensionScores));

  // Pattern 2: Succession preparation gap
  patterns.push(...detectSuccessionGap(dimensionScores));

  // Pattern 3: Communication breakdown
  patterns.push(...detectCommunicationIssues(dimensionScores, consensusData));

  // Pattern 4: Founder dependency
  patterns.push(...detectFounderDependency(dimensionScores));

  // Pattern 5: Transparency asymmetry
  patterns.push(...detectTransparencyAsymmetry(dimensionScores, consensusData));

  // Pattern 6: Conflict avoidance
  patterns.push(...detectConflictAvoidance(dimensionScores));

  return patterns.sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
}

/**
 * Pattern: Strong values but weak governance structures
 */
function detectValuesExecutionGap(
  scores: DimensionScore[]
): DetectedPattern[] {

  const values = scores.find(s => s.dimension_id === '5_values_mission');
  const governance = scores.find(s => s.dimension_id === '6_governance_structures');

  if (!values || !governance) return [];

  // Strong values (>70) but weak governance (<40)
  if (values.normalized_score > 70 && governance.normalized_score < 40) {
    return [{
      pattern_type: 'values_execution_gap',
      priority: 'high',
      affected_dimensions: ['5_values_mission', '6_governance_structures'],
      description: 'Возможность: От ценностей к структурам',
      evidence: [
        `Сильная основа общих ценностей (${values.normalized_score.toFixed(1)}/100)`,
        `Слабые структуры управления (${governance.normalized_score.toFixed(1)}/100)`,
        'Разрыв более 30 пунктов'
      ],
      recommendation: 'У вашей семьи есть прочный фундамент общих ценностей, но отсутствуют формальные структуры для их воплощения. Это идеальное время для создания governance framework, основанного на ваших ценностях.'
    }];
  }

  return [];
}

/**
 * Pattern: Next gen development without clear succession plan
 */
function detectSuccessionGap(
  scores: DimensionScore[]
): DetectedPattern[] {

  const nextGen = scores.find(s => s.dimension_id === '3_next_generation');
  const ownership = scores.find(s => s.dimension_id === '7_ownership_control');
  const governance = scores.find(s => s.dimension_id === '6_governance_structures');

  if (!nextGen || !ownership || !governance) return [];

  // Good next gen prep (>60) but weak ownership plan (<45) and weak structures (<45)
  if (nextGen.normalized_score > 60 &&
      ownership.normalized_score < 45 &&
      governance.normalized_score < 45) {
    return [{
      pattern_type: 'succession_gap',
      priority: 'critical',
      affected_dimensions: [
        '3_next_generation',
        '7_ownership_control',
        '6_governance_structures'
      ],
      description: 'Разрыв в преемственности',
      evidence: [
        `Следующее поколение развивается хорошо (${nextGen.normalized_score.toFixed(1)}/100)`,
        `Отсутствует чёткий план владения (${ownership.normalized_score.toFixed(1)}/100)`,
        `Слабые структуры управления (${governance.normalized_score.toFixed(1)}/100)`,
        'Риск конфликтов через 3-5 лет'
      ],
      recommendation: 'КРИТИЧНО: Ваше следующее поколение готовится, но нет чёткого плана передачи владения и контроля. Необходимо срочно создать succession plan и ownership framework, чтобы избежать конфликтов.'
    }];
  }

  return [];
}

/**
 * Pattern: Low consensus on key dimensions
 */
function detectCommunicationIssues(
  scores: DimensionScore[],
  consensus: ConsensusAnalysis[]
): DetectedPattern[] {

  const patterns: DetectedPattern[] = [];

  // Find dimensions with critical divergence
  const divergentDimensions = consensus.filter(
    c => c.consensus_level === 'critical_divergence' ||
         c.consensus_level === 'low'
  );

  if (divergentDimensions.length >= 3) {
    patterns.push({
      pattern_type: 'widespread_disagreement',
      priority: 'high',
      affected_dimensions: divergentDimensions.map(d => d.dimension_id),
      description: 'Широкое расхождение во взглядах',
      evidence: [
        `${divergentDimensions.length} из 8 измерений показывают низкий консенсус`,
        'Члены семьи по-разному воспринимают ситуацию',
        'Возможно недостаточное обсуждение этих тем'
      ],
      recommendation: 'Рекомендуется провести серию facilitated family meetings для выравнивания восприятия и открытого обсуждения расхождений.'
    });
  }

  return patterns;
}
```

---

## STEP 5: Insight Generation

### Purpose
Create actionable, personalized insights using AI.

### AI Prompt Template

```typescript
const insightGenerationPrompt = `
You are a family governance advisor analyzing assessment results for a family.

Family Context:
- Family size: {{family_size}} members across {{generation_count}} generations
- Business: {{has_business ? 'Family business' : 'Investment portfolio'}}
- Stage: {{family_stage}}

Assessment Results:
{{dimension_scores}}

Consensus Analysis:
{{consensus_summary}}

Detected Patterns:
{{patterns}}

Generate 3-5 insights with the following structure:
1. Type: strength | concern | divergence | opportunity
2. Priority: critical | high | medium | low
3. Title: Clear, actionable headline (max 60 chars)
4. Description: 2-3 sentences explaining the insight
5. Evidence: 2-4 bullet points of supporting data
6. Recommendation: Specific next step
7. Suggested workshop: Relevant workshop ID (if applicable)

Focus on:
- Actionable insights (not just observations)
- Specific to this family's situation
- Balanced (strengths + areas for growth)
- Prioritized by impact

Output format: JSON array of insights
`;

interface GeneratedInsight {
  insight_id: string;
  type: 'strength' | 'concern' | 'divergence' | 'opportunity';
  priority: 'critical' | 'high' | 'medium' | 'low';

  title: string;
  description: string;
  affected_dimensions: string[];
  evidence: string[];

  recommendation?: string;
  suggested_workshop?: string;
  suggested_actions?: string[];

  confidence_score: number; // 0-1, how confident is the AI
}
```

### Rule-Based Insights (Fallback)

If AI is unavailable, use rule-based insights:

```typescript
function generateRuleBasedInsights(
  scores: DimensionScore[],
  consensus: ConsensusAnalysis[],
  patterns: DetectedPattern[]
): GeneratedInsight[] {

  const insights: GeneratedInsight[] = [];

  // Rule 1: Identify top strength (highest score + high consensus)
  const strengths = scores
    .filter(s => s.normalized_score > 75)
    .filter(s => {
      const cons = consensus.find(c => c.dimension_id === s.dimension_id);
      return cons && cons.consensus_level === 'high';
    })
    .sort((a, b) => b.normalized_score - a.normalized_score);

  if (strengths.length > 0) {
    const top = strengths[0];
    const dim = getDimension(top.dimension_id);

    insights.push({
      insight_id: generateId(),
      type: 'strength',
      priority: 'medium',
      title: `Сильная сторона: ${dim.name}`,
      description: `Ваша семья демонстрирует высокий уровень в области "${dim.name}" с согласием между всеми участниками. Это прочная основа для дальнейшего развития.`,
      affected_dimensions: [top.dimension_id],
      evidence: [
        `Высокий балл: ${top.normalized_score.toFixed(1)}/100`,
        `Сильный консенсус (низкий разброс мнений)`,
        `Входит в топ-${top.benchmark_percentile}% семей`
      ],
      confidence_score: 0.9
    });
  }

  // Rule 2: Identify critical concerns (low score + critical importance)
  const concerns = scores
    .filter(s => s.normalized_score < 40 && s.weight === 'critical')
    .sort((a, b) => a.normalized_score - b.normalized_score);

  if (concerns.length > 0) {
    const critical = concerns[0];
    const dim = getDimension(critical.dimension_id);

    insights.push({
      insight_id: generateId(),
      type: 'concern',
      priority: 'critical',
      title: `Требует внимания: ${dim.name}`,
      description: `Критическая область "${dim.name}" показывает низкий балл. Это может создавать риски для семейной стабильности и требует приоритетного внимания.`,
      affected_dimensions: [critical.dimension_id],
      evidence: [
        `Низкий балл: ${critical.normalized_score.toFixed(1)}/100`,
        'Критическое измерение для семейного управления',
        'Ниже среднего уровня для семей на вашей стадии'
      ],
      recommendation: 'Рекомендуем приоритетно работать над этой областью',
      suggested_workshop: mapDimensionToWorkshop(critical.dimension_id),
      confidence_score: 0.95
    });
  }

  // Rule 3: Add pattern-based insights
  for (const pattern of patterns.slice(0, 3)) {
    insights.push({
      insight_id: generateId(),
      type: 'opportunity',
      priority: pattern.priority,
      title: pattern.description,
      description: pattern.recommendation,
      affected_dimensions: pattern.affected_dimensions,
      evidence: pattern.evidence,
      confidence_score: 0.85
    });
  }

  // Rule 4: Divergence insights
  const highDivergence = consensus.filter(
    c => c.consensus_level === 'critical_divergence'
  );

  for (const div of highDivergence.slice(0, 2)) {
    const dim = getDimension(div.dimension_id);

    insights.push({
      insight_id: generateId(),
      type: 'divergence',
      priority: 'high',
      title: `Расхождение во взглядах: ${dim.name}`,
      description: `Члены семьи значительно расходятся в оценке "${dim.name}". Это может указывать на различия в опыте, восприятии или недостаточную коммуникацию по этим вопросам.`,
      affected_dimensions: [div.dimension_id],
      evidence: [
        `Большой разброс мнений (σ = ${div.std_deviation.toFixed(1)})`,
        `Разница между min и max: ${(div.range.max - div.range.min).toFixed(1)} пунктов`,
        div.generational_analysis ? 'Особенно заметен межпоколенческий разрыв' : ''
      ].filter(e => e !== ''),
      recommendation: 'Рекомендуем facilitated discussion для понимания различных точек зрения',
      confidence_score: 0.90
    });
  }

  return insights
    .sort((a, b) => {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    })
    .slice(0, 8); // Max 8 insights
}
```

---

## Performance Considerations

### Caching Strategy

```typescript
// Cache dimension scores as they're completed
const cache = {
  user_dimension_scores: new Map(), // User + Dimension → Score
  consensus_analysis: new Map(),    // Dimension → Consensus
  patterns: null,                   // Re-compute only when all complete
  insights: null                    // Generate once at end
};

// Incremental calculation
function onDimensionCompleted(user_id: string, dimension_id: string) {
  // Calculate and cache this user's dimension score
  const score = calculateDimensionScore(user_id, dimension_id);
  cache.user_dimension_scores.set(`${user_id}:${dimension_id}`, score);

  // If all family members completed this dimension, calculate consensus
  if (allFamilyCompletedDimension(dimension_id)) {
    const consensus = analyzeConsensus(dimension_id);
    cache.consensus_analysis.set(dimension_id, consensus);
  }
}

// Final synthesis when all users complete
function onAssessmentComplete() {
  // All data already cached, just need patterns and insights
  const patterns = detectPatterns(
    Array.from(cache.user_dimension_scores.values()),
    Array.from(cache.consensus_analysis.values())
  );

  const insights = generateInsights(patterns);

  return {
    dimension_scores: cache.user_dimension_scores,
    consensus_analysis: cache.consensus_analysis,
    patterns,
    insights
  };
}
```

### Processing Time

- **Per question answered:** <100ms (normalization + save)
- **Per dimension completed:** <500ms (scoring + caching)
- **Full synthesis (all done):** 2-5 seconds (pattern detection + AI insights)

---

## Output Data Structure

```typescript
interface SynthesisResults {
  session_id: string;
  generated_at: timestamp;

  // Individual scores (per user, per dimension)
  user_dimension_scores: Map<string, Map<string, DimensionScore>>;

  // Family aggregate scores
  family_dimension_scores: {
    [dimension_id: string]: {
      family_mean: number;
      family_median: number;
      range: { min: number; max: number };
    }
  };

  // Overall maturity
  overall_maturity_index: number; // 0-100
  maturity_level: string;         // "Emerging" | "Developing" | "Advanced" | "Mature"

  // Consensus analysis
  consensus_analysis: ConsensusAnalysis[];

  // Patterns and insights
  detected_patterns: DetectedPattern[];
  generated_insights: GeneratedInsight[];

  // Recommendations
  recommended_workshops: WorkshopRecommendation[];
  suggested_priorities: Priority[];
}
```

---

**Next Phase:** [Phase 4: Results & Discussion](./phase-4-results.md) →
