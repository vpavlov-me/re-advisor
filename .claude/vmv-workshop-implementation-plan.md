# VMV Workshop Implementation Plan

## Обзор проекта

Создание интерактивного воркшопа Values-Mission-Vision для семей, который позволит пройти через структурированный процесс определения ценностей, миссии и видения семьи.

**Целевая роль:** Family Council / External Adviser (Фасилитатор)

**Формат:** 13 экранов с различными режимами проведения (онлайн/офлайн/гибрид, синхронно/асинхронно)

**Технологический стек:** Next.js 15, React 19, TypeScript, Supabase, shadcn/ui

---

## Анализ существующей кодовой базы

### Существующие паттерны для переиспользования:

1. **Constitution Template System** (`src/app/knowledge/constitution/`)
   - Многостраничный wizard с навигацией по секциям
   - Progress tracking
   - Rich text editor для контента
   - Sidebar navigation с индикаторами завершения

2. **Family Onboarding** (`src/app/family-onboarding/`)
   - Carousel + Wizard pattern
   - URL-synced state (nuqs)
   - Step-by-step progression
   - Auto-save draft functionality

3. **Consultation System** (`src/lib/consultations.ts`)
   - Meeting scheduling
   - Participant management
   - Meeting link generation (Jitsi)
   - Real-time status tracking

4. **Messaging System** (`src/lib/messages.ts`)
   - Real-time chat
   - Supabase realtime subscriptions
   - Message threading

---

## Архитектура воркшопа

### 1. Database Schema

Необходимо создать следующие таблицы:

```sql
-- VMV Workshop Sessions
CREATE TABLE vmv_workshop_sessions (
  id BIGSERIAL PRIMARY KEY,
  family_id BIGINT REFERENCES families(id) ON DELETE CASCADE,
  facilitator_id UUID REFERENCES profiles(id),
  title TEXT NOT NULL,
  description TEXT,

  -- Workshop Configuration
  format TEXT NOT NULL CHECK (format IN ('online', 'offline', 'hybrid')),
  mode TEXT NOT NULL CHECK (mode IN ('synchronous', 'asynchronous')),
  facilitation_type TEXT NOT NULL CHECK (facilitation_type IN ('ai', 'human')),
  expected_duration INTEGER, -- minutes

  -- Schedule (optional for async)
  scheduled_date TIMESTAMPTZ,
  scheduled_time TIME,
  meeting_link TEXT,

  -- Status & Progress
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'scheduled', 'in_progress', 'completed', 'cancelled')),
  current_stage INTEGER DEFAULT 1,

  -- Results
  selected_values JSONB, -- Array of selected values
  final_values JSONB, -- Top 5 values with definitions
  mission_statement TEXT,
  mission_short TEXT,
  vision JSONB, -- Vision by dimensions

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ
);

-- Workshop Participants
CREATE TABLE vmv_workshop_participants (
  id BIGSERIAL PRIMARY KEY,
  workshop_id BIGINT REFERENCES vmv_workshop_sessions(id) ON DELETE CASCADE,

  -- Participant Info
  family_member_id BIGINT REFERENCES family_members(id),
  guest_email TEXT,
  guest_name TEXT,
  guest_phone TEXT,

  -- Status
  status TEXT NOT NULL DEFAULT 'invited' CHECK (status IN ('invited', 'confirmed', 'declined', 'attended')),
  joined_at TIMESTAMPTZ,

  -- Progress (for async mode)
  current_stage INTEGER DEFAULT 1,
  progress_data JSONB,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Individual Value Selections
CREATE TABLE vmv_value_selections (
  id BIGSERIAL PRIMARY KEY,
  workshop_id BIGINT REFERENCES vmv_workshop_sessions(id) ON DELETE CASCADE,
  participant_id BIGINT REFERENCES vmv_workshop_participants(id) ON DELETE CASCADE,

  value_name TEXT NOT NULL,
  selected_at TIMESTAMPTZ DEFAULT NOW()
);

-- Value Definitions (collaborative)
CREATE TABLE vmv_value_definitions (
  id BIGSERIAL PRIMARY KEY,
  workshop_id BIGINT REFERENCES vmv_workshop_sessions(id) ON DELETE CASCADE,
  value_name TEXT NOT NULL,

  -- Value Matrix Components
  definition TEXT,
  we_always JSONB, -- Array of behaviors
  we_never JSONB, -- Array of anti-behaviors
  metrics JSONB, -- How we measure

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Workshop Messages (Chat)
CREATE TABLE vmv_workshop_messages (
  id BIGSERIAL PRIMARY KEY,
  workshop_id BIGINT REFERENCES vmv_workshop_sessions(id) ON DELETE CASCADE,
  participant_id BIGINT REFERENCES vmv_workshop_participants(id),

  message TEXT NOT NULL,
  message_type TEXT DEFAULT 'chat' CHECK (message_type IN ('chat', 'system', 'ai')),

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Facilitator Tips (for human facilitators)
CREATE TABLE vmv_facilitator_tips (
  id BIGSERIAL PRIMARY KEY,
  workshop_id BIGINT REFERENCES vmv_workshop_sessions(id) ON DELETE CASCADE,
  stage INTEGER NOT NULL,

  tip_type TEXT NOT NULL CHECK (tip_type IN ('script', 'timing', 'engagement', 'intervention')),
  content TEXT NOT NULL,
  shown BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Stage Progress Tracking
CREATE TABLE vmv_stage_progress (
  id BIGSERIAL PRIMARY KEY,
  workshop_id BIGINT REFERENCES vmv_workshop_sessions(id) ON DELETE CASCADE,
  stage INTEGER NOT NULL,

  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  time_spent INTEGER, -- seconds

  -- Stage-specific data
  stage_data JSONB
);

-- Indexes
CREATE INDEX idx_vmv_sessions_family ON vmv_workshop_sessions(family_id);
CREATE INDEX idx_vmv_sessions_facilitator ON vmv_workshop_sessions(facilitator_id);
CREATE INDEX idx_vmv_participants_workshop ON vmv_workshop_participants(workshop_id);
CREATE INDEX idx_vmv_messages_workshop ON vmv_workshop_messages(workshop_id);
CREATE INDEX idx_vmv_value_selections_workshop ON vmv_value_selections(workshop_id);
```

### 2. Routing Structure

```
app/
└── workshops/
    └── vmv/
        ├── page.tsx                          # Workshop list/dashboard
        ├── create/
        │   └── page.tsx                      # Screen 1: Initial setup
        └── [id]/
            ├── page.tsx                      # Main workshop view (redirects to current stage)
            ├── setup/
            │   ├── format/page.tsx           # Screen 2: Format selection
            │   ├── participants/page.tsx     # Screen 3: Family members
            │   ├── guests/page.tsx           # Screen 4: External guests
            │   └── schedule/page.tsx         # Screen 5: Date & time
            ├── session/
            │   ├── page.tsx                  # Screen 6: Workshop start
            │   ├── values-select/page.tsx    # Screen 7: Individual value selection
            │   ├── values-collective/page.tsx # Screen 8: Collective value ranking
            │   ├── values-matrix/page.tsx    # Screen 9: Value matrix definition
            │   ├── mission-draft/page.tsx    # Screen 10: Individual mission drafts
            │   ├── mission-final/page.tsx    # Screen 11: Collective mission
            │   ├── vision/page.tsx           # Screen 12: Vision by dimensions
            │   └── summary/page.tsx          # Screen 13: Summary & next steps
            └── live/
                └── page.tsx                  # Real-time workshop conductor view
```

### 3. Component Architecture

#### Shared Workshop Components

```
src/components/workshops/
├── workshop-layout.tsx           # Main layout with sidebar, header, etc.
├── workshop-header.tsx           # Header with title, status, actions
├── workshop-sidebar.tsx          # Stage navigation & progress
├── workshop-progress.tsx         # Progress bar & stage indicators
├── participant-panel.tsx         # Participants list with status
├── workshop-chat.tsx             # Real-time chat component
├── facilitator-panel.tsx         # Facilitator tips & controls
├── ai-assistant.tsx              # AI assistant chat interface
├── workshop-timer.tsx            # Timer for timed stages
├── value-selector.tsx            # Value selection grid component
├── value-card.tsx                # Individual value display
├── value-matrix-form.tsx         # Value definition matrix
├── mission-builder.tsx           # Mission statement builder
├── vision-canvas.tsx             # Vision by dimensions canvas
└── workshop-summary.tsx          # Final summary component
```

#### Layout Structure

Основной layout для воркшопа (screens 7-12):

```tsx
<WorkshopLayout>
  {/* Left Sidebar - Facilitator Panel (if human facilitator) */}
  <FacilitatorPanel>
    <StageProgress />
    <ParticipantProgress />
    <FacilitatorTips />
    <TimerControl />
  </FacilitatorPanel>

  {/* Center - Main Content */}
  <MainContent>
    {/* Stage-specific content */}
  </MainContent>

  {/* Right Sidebar */}
  <RightPanel>
    <ParticipantPanel />
    <WorkshopChat />
    <Timeline />
  </RightPanel>

  {/* Bottom - AI Assistant */}
  <AIAssistant />
</WorkshopLayout>
```

---

## Детальная реализация по экранам

### Screen 1: Dashboard / Workshop Entry Point
**Route:** `/workshops/vmv/create` или `/families/[id]` (button to start workshop)

**Функционал:**
- Отображение 4 типов воркшопов (Assessment, Values/Mission/Vision, Decision-Making, Succession)
- Для каждого: время, прогресс completion, описание
- Кнопки: Continue, Restart, Start with Advisor, Start with AI

**Компоненты:**
```tsx
<WorkshopCard
  type="values-mission-vision"
  duration={120}
  progress={0}
  onContinue={handleContinue}
  onRestart={handleRestart}
  onStartWithAdvisor={handleAdvisor}
  onStartWithAI={handleAI}
/>
```

---

### Screen 2: Format Selection
**Route:** `/workshops/vmv/[id]/setup/format`

**Функционал:**
- Выбор формата: Online / Offline / Hybrid
- Выбор режима: Synchronous / Asynchronous (только для online)
- Выбор фасилитации: AI / Human Consultant/Advisor
- Meeting link (опционально)

**State:**
```tsx
interface FormatConfig {
  format: 'online' | 'offline' | 'hybrid';
  mode: 'synchronous' | 'asynchronous';
  facilitationType: 'ai' | 'human';
  meetingLink?: string;
  expectedDuration: number; // minutes
}
```

**Компоненты:**
```tsx
<FormatSelector
  value={format}
  onChange={setFormat}
  options={[
    { value: 'online', icon: Video, label: 'Online' },
    { value: 'offline', icon: Users, label: 'Offline' },
    { value: 'hybrid', icon: Combine, label: 'Hybrid' }
  ]}
/>

<ModeSelector
  disabled={format !== 'online'}
  value={mode}
  onChange={setMode}
/>

<FacilitationTypeSelector
  value={facilitationType}
  onChange={setFacilitationType}
/>
```

---

### Screen 3: Family Participants
**Route:** `/workshops/vmv/[id]/setup/participants`

**Функционал:**
- Поиск по имени/роли
- Список зарегистрированных членов семьи
- Чекбоксы для выбора
- Индикация статуса (зарегистрирован)
- Кнопки "Убрать" для удаления участника

**Компоненты:**
```tsx
<ParticipantSearch
  placeholder="Начните вводить имя..."
  familyId={familyId}
  onSelect={handleAddParticipant}
/>

<ParticipantList>
  {participants.map(p => (
    <ParticipantItem
      key={p.id}
      participant={p}
      onRemove={() => handleRemove(p.id)}
      showStatus
    />
  ))}
</ParticipantList>

<SelectedParticipantsCount count={selectedCount} />
```

---

### Screen 4: External Guests
**Route:** `/workshops/vmv/[id]/setup/guests`

**Функционал:**
- Добавление гостей по email
- Добавление гостей по телефону
- Список приглашенных гостей
- Предпросмотр приглашения
- Warning: гости получат индивидуальную ссылку-приглашение

**Компоненты:**
```tsx
<GuestInviteForm
  onAddEmail={handleAddEmail}
  onAddPhone={handleAddPhone}
/>

<InvitationPreview
  workshopName={workshopName}
  workshopDescription={description}
  date={scheduledDate}
  format={format}
/>

<InvitedGuestsList
  guests={guests}
  onRemove={handleRemoveGuest}
/>
```

---

### Screen 5: Schedule Selection
**Route:** `/workshops/vmv/[id]/setup/schedule`

**Функционал:**
- Пропуск если режим = asynchronous
- Выбор планирования: "Собрать доступность участников" или "Согласование времени"
- Календарь с выбором дат
- Выбор времени (10:00 Утро, 14:00 День, 18:00 Вечер, 20:00 Поздний вечер)
- Показ доступности участников (предварительная оценка)
- Рекомендуемое время (зеленый блок)

**Компоненты:**
```tsx
<PlanningModeSelector
  value={planningMode}
  onChange={setPlanningMode}
  options={[
    { value: 'collect', label: 'Собрать доступность участников' },
    { value: 'coordinate', label: 'Согласование времени' }
  ]}
/>

<Calendar
  month={selectedMonth}
  onDateSelect={handleDateSelect}
  highlightedDates={availableDates}
/>

<TimeSlotSelector
  slots={timeSlots}
  onSelect={handleTimeSelect}
  participantAvailability={availability}
/>

<RecommendedTime
  time={recommendedTime}
  availableParticipants={7}
  totalParticipants={8}
/>
```

---

### Screen 6: Workshop Start
**Route:** `/workshops/vmv/[id]/session` (redirect to start page)

**Функционал:**
- Экран начала воркшопа
- Введение в воркшоп
- Цели и ожидаемые результаты
- Правила поведения
- Проверка оборудования (для online)
- Кнопка "Начать воркшоп"

**Компоненты:**
```tsx
<WorkshopIntro
  title="Values, Mission & Vision Workshop"
  description={description}
/>

<WorkshopGoals goals={goals} />

<WorkshopGuidelines guidelines={guidelines} />

{format === 'online' && (
  <EquipmentCheck
    onMicCheck={handleMicCheck}
    onCameraCheck={handleCameraCheck}
  />
)}

<Button onClick={handleStartWorkshop}>
  Начать воркшоп
</Button>
```

---

### Screen 7: Individual Value Selection
**Route:** `/workshops/vmv/[id]/session/values-select`

**Функционал:**
- Центральный блок: сетка ценностей для выбора (20+ значений)
- Каждый участник выбирает 5 ценностей
- Возможность добавить свою ценность
- Справа: список участников, чат, таймер
- Слева (для фасилитатора): прогресс участников, подсказки AI, текущая стадия
- Выбранные ценности с % участников, которые тоже их выбрали

**Компоненты:**
```tsx
<WorkshopLayout>
  <FacilitatorPanel>
    <StageProgress
      stage={1}
      totalStages={5}
      stageName="Core Values Discovery"
    />
    <ParticipantProgress participants={participants} />
    <FacilitatorTips
      tips={[
        "Encourage authentic values over aspirational ones",
        "Focus on what truly guides decisions"
      ]}
    />
  </FacilitatorPanel>

  <MainContent>
    <StageHeader
      title="Stage 1: Core Values Discovery"
      subtitle="Select 3-5 core values that truly define your family (20 minutes)"
    />

    <ValueSelector
      values={availableValues}
      selectedValues={mySelectedValues}
      onSelect={handleValueSelect}
      maxSelections={5}
      showPopularity
    />

    <AddCustomValueButton onClick={handleAddCustomValue} />

    <MySelectedValues
      values={mySelectedValues}
      onRemove={handleRemoveValue}
      showPopularityPercentage
    />
  </MainContent>

  <RightPanel>
    <ActiveParticipants participants={activeParticipants} />
    <WorkshopChat messages={messages} onSendMessage={handleSendMessage} />
    <Timeline stages={stages} currentStage={currentStage} />
  </RightPanel>

  <AIAssistant onAskQuestion={handleAIQuestion} />
</WorkshopLayout>
```

**Value Data:**
```tsx
const VALUES = [
  { name: "Integrity", icon: "🤝", description: "Honesty and strong moral principles" },
  { name: "Family Unity", icon: "👨‍👩‍👧‍👦", description: "..." },
  { name: "Innovation", icon: "💡", description: "..." },
  { name: "Education", icon: "🎓", description: "..." },
  { name: "Independence", icon: "🦅", description: "..." },
  { name: "Service", icon: "🌍", description: "..." },
  // ... more values
];
```

---

### Screen 8: Collective Value Ranking
**Route:** `/workshops/vmv/[id]/session/values-collective`

**Функционал:**
- Отображение всех выбранных ценностей с частотой выбора
- Голосование за финальный список (топ 5)
- Real-time voting results
- Индикатор времени: 2:00 remaining | Current: 10/12 approve (83%)

**Компоненты:**
```tsx
<CollectiveValuesDiscovery>
  <ValueRankingChart
    values={allSelectedValues}
    votes={votes}
    sortBy="frequency"
  />

  <VotingInterface>
    <FinalValueSelector
      values={topValues}
      maxSelections={5}
      onVote={handleVote}
    />
  </VotingInterface>

  <VotingProgress
    currentVotes={10}
    totalParticipants={12}
    threshold={0.83}
    timeRemaining={120}
  />

  <YourSelectedValues
    values={myFinalValues}
    editable
  />
</CollectiveValuesDiscovery>
```

---

### Screen 9: Value Matrix Definition
**Route:** `/workshops/vmv/[id]/session/values-matrix`

**Функционал:**
- Для каждой из 5 ценностей заполнить матрицу:
  - Value & Definition
  - We Always... (behaviors)
  - We Never... (anti-behaviors)
  - How We Measure (metrics)
- Collaborative editing
- Progress indicator для каждой ценности

**Компоненты:**
```tsx
<ValueMatrixEditor>
  <ValueTabs
    values={finalValues}
    activeValue={activeValue}
    onSwitch={setActiveValue}
    progress={matrixProgress}
  />

  <MatrixForm
    value={activeValue}
    onSave={handleSaveMatrix}
  >
    <Section title="Value & Definition">
      <Input
        value={valueDefinition}
        onChange={handleDefinitionChange}
        placeholder="People-First Leadership"
      />
      <Textarea
        value={description}
        onChange={handleDescriptionChange}
        placeholder="We prioritize employee well-being..."
      />
    </Section>

    <Section title="We Always...">
      <BehaviorList
        items={alwaysBehaviors}
        onAdd={handleAddAlways}
        onRemove={handleRemoveAlways}
        placeholder="Invest in training and development programs"
      />
    </Section>

    <Section title="We Never...">
      <BehaviorList
        items={neverBehaviors}
        onAdd={handleAddNever}
        onRemove={handleRemoveNever}
        placeholder="Cut training budgets during downturns"
      />
    </Section>

    <Section title="How We Measure">
      <MetricList
        items={metrics}
        onAdd={handleAddMetric}
        onRemove={handleRemoveMetric}
        placeholder="Employee retention rate >85%"
      />
    </Section>
  </MatrixForm>

  <MatrixPreview value={activeValue} matrix={currentMatrix} />
</ValueMatrixEditor>
```

---

### Screen 10: Individual Mission Drafts
**Route:** `/workshops/vmv/[id]/session/mission-draft`

**Функционал:**
- Формула миссии с полями:
  - Purpose: What impact do you want to create?
  - Audience: Who benefits?
  - Approach: How will you achieve it?
  - Values: Which core values guide you?
- Каждый участник заполняет свою версию
- AI предлагает варианты формулировок
- Preview generated mission statement

**Компоненты:**
```tsx
<MissionBuilder>
  <MissionFormula>
    <FormField
      label="Purpose: What impact do you want to create?"
      value={purpose}
      onChange={handlePurposeChange}
      placeholder="Create long-term prosperity and unity across generations"
      aiSuggestions={purposeSuggestions}
    />

    <FormField
      label="Audience: Who benefits?"
      value={audience}
      onChange={handleAudienceChange}
      placeholder="For members of our family, our employees, and the communities we serve"
      aiSuggestions={audienceSuggestions}
    />

    <FormField
      label="Approach: How will you achieve it?"
      value={approach}
      onChange={handleApproachChange}
      placeholder="Through strategic leadership, collaborative governance, and responsible stewardship"
      aiSuggestions={approachSuggestions}
    />

    <ValuePills
      values={finalValues}
      selected={selectedValues}
      onToggle={handleToggleValue}
    />
  </MissionFormula>

  <GeneratedMissionPreview
    purpose={purpose}
    audience={audience}
    approach={approach}
    values={selectedValues}
  />

  <AIAssistantSuggestions
    context={{ purpose, audience, approach, values: finalValues }}
    onAcceptSuggestion={handleAcceptSuggestion}
  />
</MissionBuilder>
```

**Generated Mission Format:**
```
"We exist to [purpose] for [audience], through [approach], guided by our values of [value1], [value2], [value3], and [value4]."
```

---

### Screen 11: Collective Mission Statement
**Route:** `/workshops/vmv/[id]/session/mission-final`

**Функционал:**
- AI synthesizes все individual missions в один draft
- Участники голосуют и предлагают правки
- Real-time collaborative editing
- Финализация с approval voting
- Генерация короткой версии (≤20 слов)

**Компоненты:**
```tsx
<CollectiveMissionEditor>
  <AIGeneratedDraft
    missions={individualMissions}
    generatedMission={aiMission}
    confidence={0.85}
  />

  <CollaborativeEditor
    content={missionDraft}
    onChange={handleMissionChange}
    participants={activeParticipants}
    cursors={participantCursors}
  />

  <VotingPanel>
    <Vote
      question="Approve this mission statement?"
      onVote={handleVote}
      currentVotes={{ approve: 10, revise: 2 }}
      threshold={0.83}
    />

    <Comments
      comments={missionComments}
      onAddComment={handleAddComment}
    />
  </VotingPanel>

  <ShortVersionGenerator
    longVersion={missionDraft}
    shortVersion={missionShort}
    onEdit={handleShortVersionEdit}
    maxWords={20}
  />

  <FinalMissionDisplay
    longVersion={missionFinal}
    shortVersion={missionShort}
    values={finalValues}
  />
</CollectiveMissionEditor>
```

---

### Screen 12: Vision by Dimensions
**Route:** `/workshops/vmv/[id]/session/vision`

**Функционал:**
- Vision Canvas с 6 dimensions:
  1. Family Dimension
  2. Business Dimension
  3. Capital Dimension
  4. Social Dimension
  5. Reputation Dimension
  6. Risk Dimension
- Для каждого:
  - Goal Future State (10-30 years)
  - Non-Goals (What we won't do)
  - First Milestone (7-12 months)
  - Key Risk / Risk Response
- Коллективная работа сразу
- AI recommendations

**Компоненты:**
```tsx
<VisionCanvas>
  <DimensionTabs
    dimensions={dimensions}
    activeDimension={activeDimension}
    onSwitch={setActiveDimension}
    progress={dimensionProgress}
  />

  <DimensionEditor dimension={activeDimension}>
    <Field
      label="Goal Future State (10-30 years)"
      value={goalState}
      onChange={handleGoalStateChange}
      placeholder="All 4-5 LG members have clear career paths..."
      rows={3}
    />

    <Field
      label="Non-Goals (What we won't do)"
      value={nonGoals}
      onChange={handleNonGoalsChange}
      placeholder="Force family members into family business roles..."
      rows={3}
    />

    <Field
      label="First Milestone (7-12 months)"
      value={firstMilestone}
      onChange={handleFirstMilestoneChange}
      placeholder="Launch G3 leadership development program..."
      rows={2}
    />

    <RiskAssessment>
      <Field
        label="Key Risk"
        value={keyRisk}
        onChange={handleKeyRiskChange}
        placeholder="Geographic dispersion..."
      />
      <Field
        label="Risk Response"
        value={riskResponse}
        onChange={handleRiskResponseChange}
        placeholder="Virtual meetings + annual retreats"
      />
    </RiskAssessment>
  </DimensionEditor>

  <VisionSummary
    dimensions={allDimensions}
    completionPercentage={visionProgress}
  />

  <AIConsultation
    context={{ mission: missionFinal, values: finalValues }}
    dimension={activeDimension}
    onSuggestion={handleAISuggestion}
  />
</VisionCanvas>
```

**Dimensions:**
```tsx
const DIMENSIONS = [
  {
    id: 'family',
    title: '1. Family Dimension',
    icon: Users,
    description: 'Goal Future State (10-30 years)',
    example: 'All 4-5 LG members have clear career paths, family gatherings occur quarterly with 80%+ attendance...'
  },
  {
    id: 'business',
    title: '2. Business Dimension',
    icon: Briefcase,
    description: 'Goal Future State (10-30 years)',
    example: 'Operating companies have professional 4-D management, Board 2+ independent directors...'
  },
  // ... other dimensions
];
```

---

### Screen 13: Summary & Integration
**Route:** `/workshops/vmv/[id]/session/summary`

**Функционал:**
- Congratulations banner
- Summary блоков:
  - Your Mission (long + short)
  - Your 5 Core Values (with icons)
  - Vision Highlights (по dimensions)
- Next Steps:
  - Список integration actions
  - Кнопки: "Save as PDF", "Share with Family", "Schedule Review Meeting"

**Компоненты:**
```tsx
<WorkshopSummary>
  <CongratulationsHeader
    title="Congratulations!"
    subtitle="You've created a complete family identity and strategy framework"
  />

  <SummarySection title="Your Mission">
    <MissionDisplay
      longVersion={missionFinal}
      shortVersion={missionShort}
    />
  </SummarySection>

  <SummarySection title="Your 5 Core Values">
    <ValueGrid values={finalValues} showIcons />
  </SummarySection>

  <SummarySection title="Vision Highlights">
    <VisionHighlights dimensions={visionDimensions} />
  </SummarySection>

  <NextSteps>
    <IntegrationActions
      actions={[
        { id: 1, title: 'Update family constitution with new values', priority: 'high' },
        { id: 2, title: 'Share vision with all family members', priority: 'high' },
        { id: 3, title: 'Schedule quarterly review meetings', priority: 'medium' },
        { id: 4, title: 'Create family dashboard to track progress', priority: 'medium' },
        { id: 5, title: 'Align business strategy with family vision', priority: 'medium' }
      ]}
      onCheck={handleCheckAction}
    />

    <ActionButtons>
      <Button onClick={handleExportPDF}>
        <FileDown className="mr-2 h-4 w-4" />
        Save as PDF
      </Button>
      <Button onClick={handleShareFamily}>
        <Share2 className="mr-2 h-4 w-4" />
        Share with Family
      </Button>
      <Button onClick={handleScheduleReview}>
        <Calendar className="mr-2 h-4 w-4" />
        Schedule Review Meeting
      </Button>
    </ActionButtons>
  </NextSteps>
</WorkshopSummary>
```

---

## Real-time Features

### Supabase Realtime Subscriptions

```tsx
// Subscribe to workshop updates
const workshopChannel = supabase
  .channel(`workshop:${workshopId}`)
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'vmv_workshop_sessions',
    filter: `id=eq.${workshopId}`
  }, (payload) => {
    handleWorkshopUpdate(payload);
  })
  .on('postgres_changes', {
    event: 'INSERT',
    schema: 'public',
    table: 'vmv_workshop_messages',
    filter: `workshop_id=eq.${workshopId}`
  }, (payload) => {
    handleNewMessage(payload.new);
  })
  .on('presence', { event: 'sync' }, () => {
    const state = workshopChannel.presenceState();
    handlePresenceSync(state);
  })
  .subscribe();

// Track participant presence
workshopChannel.track({
  user_id: currentUserId,
  participant_id: participantId,
  online_at: new Date().toISOString()
});
```

---

## AI Integration

### AI Facilitator Functions

```tsx
// AI Facilitator Tips Generation
async function generateFacilitatorTips(
  workshopId: number,
  stage: number,
  context: {
    participants: Participant[];
    timeElapsed: number;
    stageProgress: number;
  }
) {
  // Call OpenAI/Claude API to generate contextual tips
  const tips = await aiService.generateTips({
    stage,
    participantCount: context.participants.length,
    timeElapsed: context.timeElapsed,
    progressPercentage: context.stageProgress
  });

  return tips;
}

// AI Mission Synthesis
async function synthesizeMissions(individualMissions: string[]) {
  const prompt = `
    Synthesize these individual family mission statements into one cohesive mission:
    ${individualMissions.map((m, i) => `${i+1}. ${m}`).join('\n')}

    Requirements:
    - Incorporate common themes
    - Keep it concise (max 50 words)
    - Use inclusive language
    - Maintain authenticity
  `;

  const result = await aiService.generateText(prompt);
  return result;
}

// AI Vision Recommendations
async function generateVisionSuggestions(
  dimension: string,
  context: {
    mission: string;
    values: string[];
    existingVision?: string;
  }
) {
  const prompt = `
    Given this family mission: "${context.mission}"
    And these core values: ${context.values.join(', ')}

    Suggest a ${dimension} vision (10-30 year goal) that aligns with the mission and values.

    ${context.existingVision ? `Current draft: "${context.existingVision}"` : ''}
  `;

  const suggestions = await aiService.generateSuggestions(prompt);
  return suggestions;
}
```

---

## Service Layer

### Workshop Service (`src/lib/workshops/vmv-workshop.service.ts`)

```typescript
export class VMVWorkshopService {
  // Create workshop
  async createWorkshop(data: CreateWorkshopInput): Promise<Workshop> {
    const workshop = await supabase
      .from('vmv_workshop_sessions')
      .insert(data)
      .select()
      .single();

    return workshop.data;
  }

  // Add participants
  async addParticipants(
    workshopId: number,
    participants: ParticipantInput[]
  ): Promise<Participant[]> {
    const result = await supabase
      .from('vmv_workshop_participants')
      .insert(participants.map(p => ({ ...p, workshop_id: workshopId })))
      .select();

    return result.data;
  }

  // Update workshop stage
  async updateStage(
    workshopId: number,
    stage: number,
    stageData?: any
  ): Promise<void> {
    await supabase
      .from('vmv_workshop_sessions')
      .update({ current_stage: stage, updated_at: new Date().toISOString() })
      .eq('id', workshopId);

    // Track stage progress
    await supabase
      .from('vmv_stage_progress')
      .insert({
        workshop_id: workshopId,
        stage,
        started_at: new Date().toISOString(),
        stage_data: stageData
      });
  }

  // Save value selections
  async saveValueSelections(
    workshopId: number,
    participantId: number,
    values: string[]
  ): Promise<void> {
    // Delete existing selections
    await supabase
      .from('vmv_value_selections')
      .delete()
      .eq('workshop_id', workshopId)
      .eq('participant_id', participantId);

    // Insert new selections
    await supabase
      .from('vmv_value_selections')
      .insert(
        values.map(value => ({
          workshop_id: workshopId,
          participant_id: participantId,
          value_name: value
        }))
      );
  }

  // Get value statistics
  async getValueStatistics(workshopId: number): Promise<ValueStats[]> {
    const { data } = await supabase
      .from('vmv_value_selections')
      .select('value_name')
      .eq('workshop_id', workshopId);

    // Count occurrences
    const stats = data.reduce((acc, { value_name }) => {
      acc[value_name] = (acc[value_name] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(stats).map(([name, count]) => ({
      name,
      count,
      percentage: (count / data.length) * 100
    }));
  }

  // Save value matrix
  async saveValueMatrix(
    workshopId: number,
    valueName: string,
    matrix: ValueMatrix
  ): Promise<void> {
    await supabase
      .from('vmv_value_definitions')
      .upsert({
        workshop_id: workshopId,
        value_name: valueName,
        definition: matrix.definition,
        we_always: matrix.weAlways,
        we_never: matrix.weNever,
        metrics: matrix.metrics,
        updated_at: new Date().toISOString()
      });
  }

  // Complete workshop
  async completeWorkshop(workshopId: number): Promise<void> {
    await supabase
      .from('vmv_workshop_sessions')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', workshopId);
  }
}
```

---

## Implementation Steps

### Phase 1: Database & Foundation (Days 1-2)
1. Create migration file with all tables
2. Set up RLS policies for workshop data
3. Create TypeScript types from database schema
4. Set up basic routing structure

### Phase 2: Setup Flow (Days 3-5)
1. Screen 1: Workshop dashboard/entry
2. Screen 2: Format selection
3. Screen 3: Family participants
4. Screen 4: External guests
5. Screen 5: Schedule selection

### Phase 3: Core Components (Days 6-8)
1. Build `WorkshopLayout` with sidebar/header
2. Build `ParticipantPanel` component
3. Build `WorkshopChat` with Supabase realtime
4. Build `FacilitatorPanel` with tips
5. Build `AIAssistant` component

### Phase 4: Value Stages (Days 9-12)
1. Screen 6: Workshop start/intro
2. Screen 7: Value selection interface
3. Screen 8: Collective value ranking
4. Screen 9: Value matrix editor

### Phase 5: Mission & Vision (Days 13-16)
1. Screen 10: Mission builder
2. Screen 11: Collaborative mission editor
3. Screen 12: Vision canvas
4. AI integration for suggestions

### Phase 6: Summary & Polish (Days 17-18)
1. Screen 13: Summary & next steps
2. PDF export functionality
3. Email notifications
4. Polish UI/UX

### Phase 7: Real-time Features (Days 19-20)
1. Implement Supabase presence tracking
2. Real-time cursor/typing indicators
3. Live voting/polling
4. Workshop state synchronization

### Phase 8: Testing & Refinement (Days 21-22)
1. Test full workshop flow
2. Test async mode
3. Test AI facilitator
4. Bug fixes and polish

---

## Technical Considerations

### State Management
- Use React Context for workshop state
- Sync with URL params for stage navigation
- Persist drafts to database on changes (debounced)
- Optimistic updates for better UX

### Performance
- Lazy load stage components
- Virtualize large participant lists
- Debounce real-time updates
- Cache value statistics

### Accessibility
- Keyboard navigation for all interactions
- ARIA labels for workshop stages
- Screen reader announcements for stage changes
- Color contrast compliance

### Mobile Responsiveness
- Collapsible sidebars on mobile
- Touch-friendly value selection
- Responsive timeline/progress
- Mobile-optimized chat

---

## API Endpoints

```typescript
// POST /api/workshops/vmv
// Create new VMV workshop

// GET /api/workshops/vmv/[id]
// Get workshop details

// PATCH /api/workshops/vmv/[id]
// Update workshop configuration

// POST /api/workshops/vmv/[id]/participants
// Add participants

// GET /api/workshops/vmv/[id]/values/stats
// Get value selection statistics

// POST /api/workshops/vmv/[id]/ai/tips
// Generate AI facilitator tips

// POST /api/workshops/vmv/[id]/ai/synthesize-mission
// Synthesize mission from individual drafts

// POST /api/workshops/vmv/[id]/export/pdf
// Export workshop summary as PDF
```

---

## Next Steps

После утверждения плана:

1. **Создать миграцию базы данных**
2. **Создать базовую структуру роутинга**
3. **Построить shared компоненты**
4. **Реализовать setup flow (screens 1-5)**
5. **Реализовать session flow (screens 6-13)**
6. **Интегрировать AI**
7. **Добавить real-time features**
8. **Тестирование и polish**

Общая оценка: **20-22 рабочих дня** для полной реализации.
