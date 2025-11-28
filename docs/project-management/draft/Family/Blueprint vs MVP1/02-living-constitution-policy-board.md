# Block 2: Living Constitution & Policy Board

**Purpose:** Turn charters, constitutions, and policies into executable, versioned artifacts.

**Why:** Avoid "stored, not lived" failure noted on page 8.

---

## User Story 2.1: Convert PDF Constitution to Living Policy

**As a** council secretary
**I want** to convert our PDF constitution into a living policy with clauses, owners, and review cadence
**So that** the constitution becomes an active governance tool, not a static document

**Acceptance Criteria:**
- Clause IDs
- Owner fields
- Next review date
- Change-log diff

---

### 🚨 **КРИТИЧЕСКИЕ ПРОБЛЕМЫ**

#### 1. **Отсутствие версионирования** (Analysis Section 2.1, lines 408-419)
**Проблема:** ConstitutionSection table **НЕ ИМЕЕТ** версионирования:

```python
# constitution_service/models/constitution.py
# ConstitutionSection имеет:
# - id, title, content, created_at, updated_at ✓
# НО ОТСУТСТВУЮТ:
# - version_number = Column(Integer)
# - previous_version_id = Column(UUID, ForeignKey("constitution_sections.id"))
# - amendment_id = Column(UUID, ForeignKey("amendments.id"))
# - approved_at = Column(DateTime)
# - approved_by = Column(UUID)
```

**Влияние на AC:**
- ❌ **"Change-log diff"** - НЕВОЗМОЖНО без версионирования
- ❌ Нет способа сравнить версии
- ❌ Нет истории изменений clause

---

#### 2. **Отсутствие owner fields** (Analysis Section 2.2, lines 444-448)
**Проблема:** ConstitutionSection **НЕ ИМЕЕТ** поля owner:
- Нет `owner_id` или `responsible_person`
- Нет связи clause → ответственный
- Implicit ownership через `section_type` недостаточно

**Что нужно добавить:**
```python
class ConstitutionSection(Base):
    # Existing fields...
    owner_id = Column(UUID, ForeignKey("users.id"))  # ОТСУТСТВУЕТ
    backup_owner_id = Column(UUID, ForeignKey("users.id"))  # ОТСУТСТВУЕТ
    committee_id = Column(UUID, ForeignKey("committees.id"))  # ОТСУТСТВУЕТ
```

**Влияние на AC:**
- ❌ **"Owner fields"** - полностью отсутствует (0%)
- ❌ Невозможно назначить ответственного за clause

---

#### 3. **Отсутствие review cadence** (Analysis Section 2.2, lines 461-464)
**Проблема:** **НЕТ** полей для review schedule:
- Нет `next_review_date`
- Нет `review_frequency` (annually, bi-annually)
- Нет автоматических напоминаний

**Что нужно:**
```python
class ConstitutionSection(Base):
    # Existing...
    next_review_date = Column(DateTime)  # ОТСУТСТВУЕТ
    review_frequency_months = Column(Integer)  # ОТСУТСТВУЕТ
    last_reviewed_at = Column(DateTime)  # ОТСУТСТВУЕТ
    last_reviewed_by = Column(UUID)  # ОТСУТСТВУЕТ
```

**Влияние на AC:**
- ❌ **"Next review date"** - полностью отсутствует (0%)
- ❌ Нет автоматического review cycle

---

#### 4. **Отсутствие clause IDs pattern** (Analysis Section 2.2, lines 432-438)
**Проблема:** Clause IDs существуют (UUID), но:
- Нет human-readable clause numbering (e.g., "CONST-5.2.1")
- Нет иерархии clause → sub-clause
- Нет parent-child relationships

**Что нужно:**
```python
class ConstitutionSection(Base):
    # Existing UUID id...
    clause_number = Column(String)  # "5.2.1" ОТСУТСТВУЕТ
    parent_section_id = Column(UUID, ForeignKey("constitution_sections.id"))  # ОТСУТСТВУЕТ
    display_order = Column(Integer)  # ОТСУТСТВУЕТ
```

**Влияние на AC:**
- ⚠️ **"Clause IDs"** - UUID есть, но не user-friendly (50%)

---

### ⚠️ **СВЯЗАННЫЕ ПРОБЛЕМЫ**

#### 5. **Отсутствие amendment workflow** (Analysis Section 2.1, lines 415-417)
**Проблема:** SectionType.AMENDMENT существует, но:
- Нет Amendment модели
- Нет approval workflow
- Нет связи amendment → original clause

**Что нужно создать:**
```python
class Amendment(Base):
    __tablename__ = "amendments"
    id = Column(UUID, primary_key=True)
    section_id = Column(UUID, ForeignKey("constitution_sections.id"))
    proposed_by = Column(UUID, ForeignKey("users.id"))
    proposed_at = Column(DateTime)
    status = Column(Enum("proposed", "under_review", "approved", "rejected"))
    old_content = Column(Text)
    new_content = Column(Text)
    rationale = Column(Text)
    approved_by = Column(UUID)
    approved_at = Column(DateTime)
```

---

### 📊 **ОЦЕНКА ГОТОВНОСТИ**

| Acceptance Criteria | Реализация | Статус | Препятствия |
|---------------------|------------|--------|-------------|
| **Clause IDs** | 50% | ⚠️ Частично | UUID есть, нужна user-friendly нумерация |
| **Owner fields** | 0% | ❌ Не реализовано | Нужны поля owner_id, committee_id |
| **Next review date** | 0% | ❌ Не реализовано | Нужны review cadence поля |
| **Change-log diff** | 0% | ❌ Не реализовано | Нужна система версионирования |

**Общая готовность User Story 2.1: 12%**

---

### 🛠️ **ЧТО НУЖНО СДЕЛАТЬ**

#### Минимальный объем работ:
1. **Добавить версионирование**:
   ```sql
   ALTER TABLE constitution_sections ADD COLUMN version_number INTEGER DEFAULT 1;
   ALTER TABLE constitution_sections ADD COLUMN previous_version_id UUID;
   ALTER TABLE constitution_sections ADD COLUMN approved_at TIMESTAMP;
   ALTER TABLE constitution_sections ADD COLUMN approved_by UUID;
   ```

2. **Добавить ownership**:
   ```sql
   ALTER TABLE constitution_sections ADD COLUMN owner_id UUID;
   ALTER TABLE constitution_sections ADD COLUMN committee_id UUID;
   ```

3. **Добавить review cadence**:
   ```sql
   ALTER TABLE constitution_sections ADD COLUMN next_review_date TIMESTAMP;
   ALTER TABLE constitution_sections ADD COLUMN review_frequency_months INTEGER;
   ALTER TABLE constitution_sections ADD COLUMN last_reviewed_at TIMESTAMP;
   ```

4. **Создать Amendment модель**

5. **Реализовать diff calculation**:
   ```python
   def calculate_diff(old_version_id, new_version_id):
       old = get_section(old_version_id)
       new = get_section(new_version_id)
       return difflib.unified_diff(old.content, new.content)
   ```

6. **API endpoints**:
   ```python
   POST /api/constitution/sections/{id}/new-version  # Создать новую версию
   GET  /api/constitution/sections/{id}/versions     # История версий
   GET  /api/constitution/sections/{id}/diff/{old_version}/{new_version}
   POST /api/constitution/sections/{id}/assign-owner
   PUT  /api/constitution/sections/{id}/schedule-review
   ```

---

### 💡 **РЕКОМЕНДАЦИИ**

1. **Разбить на подзадачи:**
   - Sub-story 2.1a: Versioning system (5 SP)
   - Sub-story 2.1b: Ownership & review fields (3 SP)
   - Sub-story 2.1c: Diff calculation (3 SP)
   - Sub-story 2.1d: Amendment workflow (5 SP)

2. **Начать с versioning** - это фундамент для diff

**Story Points: 16 SP**

---

## User Story 2.2: Show How Clause is Lived

**As a** shareholder
**I want** to see "how this clause is lived" with linked practices and tasks
**So that** I understand if our policies are actually followed

**Acceptance Criteria:**
- Clause → practice links
- Task rollups
- Status badges

---

### 🚨 **КРИТИЧЕСКИЕ ПРОБЛЕМЫ**

#### 1. **Отсутствие clause → practice links** (Analysis Section 2.3, lines 514-516)
**Проблема:** **НЕТ ЯВНЫХ СВЯЗЕЙ** между clauses и practices:
- Constitution clauses существуют
- Tasks существуют
- НО: Нет таблицы связи clause → practice/task

**Что нужно создать:**
```python
class ClausePractice(Base):
    __tablename__ = "clause_practices"
    id = Column(UUID, primary_key=True)
    section_id = Column(UUID, ForeignKey("constitution_sections.id"))
    practice_type = Column(Enum("decision", "task", "meeting", "policy_application"))
    related_entity_id = Column(UUID)  # Decision ID, Task ID, etc.
    relationship_type = Column(String)  # "implements", "violates", "modifies"
    created_at = Column(DateTime)
    created_by = Column(UUID)
```

**Влияние на AC:**
- ❌ **"Clause → practice links"** - полностью отсутствует (0%)
- ❌ Невозможно показать, как clause применяется

---

#### 2. **Отсутствие task rollups** (Analysis Section 2.3, lines 505-508)
**Проблема:** Tasks существуют, но:
- Нет aggregation по clause
- Нет "completion rate for this clause"
- Нет dashboard для clause compliance

**Что существует:**
```python
# task_service/routes/aggregation.py (lines 12-24)
# aggregate_tasks() группирует по service ✓
# НО: Нет группировки по constitution clause
```

**Что нужно:**
```python
GET /api/constitution/sections/{id}/tasks/rollup
# Response:
{
  "clause_id": "...",
  "total_tasks": 15,
  "completed": 12,
  "in_progress": 2,
  "overdue": 1,
  "completion_rate": 0.8
}
```

**Влияние на AC:**
- ⚠️ **"Task rollups"** - инфраструктура есть, нужна интеграция (40%)

---

#### 3. **Отсутствие status badges для compliance** (Analysis Section 2.2, lines 450-453)
**Проблема:** Status badges существуют, но:
- Только для section status (NOT_STARTED, IN_PROGRESS, COMPLETE)
- НЕТ compliance status ("Lived", "Not Followed", "Partially Implemented")

**Что существует:**
```python
# constitution_service/models/constitution.py (lines 93-96)
class SectionStatus(str, enum.Enum):
    NOT_STARTED = "Not Started"
    IN_PROGRESS = "In Progress"
    COMPLETE = "Complete"
# НО: Нет статуса compliance
```

**Что нужно добавить:**
```python
class ClauseComplianceStatus(str, enum.Enum):
    FULLY_LIVED = "Fully Lived"
    PARTIALLY_LIVED = "Partially Lived"
    NOT_FOLLOWED = "Not Followed"
    UNDER_REVIEW = "Under Review"

class ConstitutionSection(Base):
    # ...
    compliance_status = Column(Enum(ClauseComplianceStatus))  # ОТСУТСТВУЕТ
    compliance_last_checked = Column(DateTime)  # ОТСУТСТВУЕТ
```

**Влияние на AC:**
- ⚠️ **"Status badges"** - basic badges есть, compliance badges нет (50%)

---

### ⚠️ **СВЯЗАННЫЕ ПРОБЛЕМЫ**

#### 4. **Отсутствие decision → policy linkage** (Analysis Section 2.3, lines 501-503)
**Проблема:** Decision model имеет `constitution_section_id`, НО:
- Нет reverse query "show all decisions for this clause"
- Нет статистики "how many decisions reference this clause"
- Нет visualization

**Что существует:**
```python
# decision_making_service/models/decision.py (lines 79-80)
constitution_id = Column(UUID)  # ✓
constitution_section_id = Column(UUID)  # ✓
# Связь есть, но нет API для reverse query
```

---

### 📊 **ОЦЕНКА ГОТОВНОСТИ**

| Acceptance Criteria | Реализация | Статус | Препятствия |
|---------------------|------------|--------|-------------|
| **Clause → practice links** | 0% | ❌ Не реализовано | Нужна таблица ClausePractice |
| **Task rollups** | 40% | ⚠️ Частично | Агрегация есть, нужна интеграция с clauses |
| **Status badges** | 50% | ⚠️ Частично | Basic badges есть, нужны compliance badges |

**Общая готовность User Story 2.2: 30%**

---

### 🛠️ **ЧТО НУЖНО СДЕЛАТЬ**

#### Минимальный объем работ:
1. **Создать ClausePractice таблицу**

2. **API для linking**:
   ```python
   POST /api/constitution/sections/{id}/link-practice
   # Body: { practice_type, entity_id, relationship_type }

   GET /api/constitution/sections/{id}/practices
   # Response: { decisions: [...], tasks: [...], meetings: [...] }
   ```

3. **Task rollup API**:
   ```python
   GET /api/constitution/sections/{id}/tasks/rollup
   GET /api/constitution/sections/{id}/compliance-score
   ```

4. **Добавить compliance status в model**

5. **Frontend component**:
   ```jsx
   <ClauseLivedView
       sectionId={id}
       linkedDecisions={[...]}
       linkedTasks={[...]}
       complianceStatus="Fully Lived"
       complianceScore={0.85}
   />
   ```

---

### 💡 **РЕКОМЕНДАЦИИ**

1. **Разбить на подзадачи:**
   - Sub-story 2.2a: ClausePractice model + API (5 SP)
   - Sub-story 2.2b: Task rollup integration (3 SP)
   - Sub-story 2.2c: Compliance status badges (2 SP)

2. **Начать с ClausePractice** - это связующее звено

**Story Points: 10 SP**

---

## User Story 2.3: Lock Policy During Review

**As** general counsel
**I want** to lock a policy during legal review
**So that** no one can modify it while I'm reviewing

**Acceptance Criteria:**
- Lock state
- Reviewer field
- Reason
- Unlock workflow

---

### 🚨 **КРИТИЧЕСКИЕ ПРОБЛЕМЫ**

#### 1. **ПОЛНОЕ ОТСУТСТВИЕ lock mechanism** (Analysis Section 1.6, lines 230-260)
**Проблема:** **НЕТ НИКАКОГО lock system**:
- Нет `lock_state` поля
- Нет `locked_by`, `locked_at`
- Нет концепции document checkout

**Что существует:**
```python
# constitution_service/models/constitution.py
class SectionStatus(str, enum.Enum):
    NOT_STARTED = "Not Started"
    IN_PROGRESS = "In Progress"
    COMPLETE = "Complete"
# НО: Нет LOCKED или UNDER_REVIEW статуса
```

**Что нужно добавить:**
```python
class ConstitutionSection(Base):
    # Existing...
    lock_state = Column(Enum("unlocked", "locked"))  # ОТСУТСТВУЕТ
    locked_by = Column(UUID, ForeignKey("users.id"))  # ОТСУТСТВУЕТ
    locked_at = Column(DateTime)  # ОТСУТСТВУЕТ
    lock_reason = Column(Text)  # ОТСУТСТВУЕТ
    lock_expires_at = Column(DateTime)  # ОТСУТСТВУЕТ
```

**Влияние на AC:**
- ❌ **"Lock state"** - полностью отсутствует (0%)
- ❌ Одновременные редактирования возможны
- ❌ Нет version control

---

#### 2. **Отсутствие reviewer field** (Analysis Section 1.6, lines 238-240)
**Проблема:** Нет поля для назначения reviewer:
- Нет `reviewer_id`
- Нет `review_status`
- Нет review workflow

**Что нужно:**
```python
class ConstitutionSection(Base):
    # ...
    reviewer_id = Column(UUID, ForeignKey("users.id"))  # ОТСУТСТВУЕТ
    review_status = Column(Enum("not_started", "in_review", "approved", "rejected"))  # ОТСУТСТВУЕТ
    review_assigned_at = Column(DateTime)  # ОТСУТСТВУЕТ
    review_completed_at = Column(DateTime)  # ОТСУТСТВУЕТ
    review_notes = Column(Text)  # ОТСУТСТВУЕТ
```

**Влияние на AC:**
- ❌ **"Reviewer field"** - полностью отсутствует (0%)
- ❌ Нельзя назначить counsel для review

---

#### 3. **Отсутствие unlock workflow** (Analysis Section 1.6, lines 242-245)
**Проблема:** Нет процесса для unlock:
- Нет approval для unlock
- Нет истории lock/unlock
- Нет автоматического unlock по таймеру

**Что нужно создать:**
```python
class LockHistory(Base):
    __tablename__ = "lock_history"
    id = Column(UUID, primary_key=True)
    section_id = Column(UUID, ForeignKey("constitution_sections.id"))
    action = Column(Enum("locked", "unlocked"))
    performed_by = Column(UUID, ForeignKey("users.id"))
    reason = Column(Text)
    created_at = Column(DateTime)
```

**Влияние на AC:**
- ❌ **"Unlock workflow"** - полностью отсутствует (0%)
- ❌ Нет audit trail для lock/unlock

---

### ⚠️ **СВЯЗАННЫЕ ПРОБЛЕМЫ**

#### 4. **Отсутствие optimistic locking**
**Проблема:** Нет защиты от race conditions:
- Два пользователя могут редактировать одновременно
- Последний save побеждает (lost update problem)

**Что нужно:**
```python
class ConstitutionSection(Base):
    # ...
    version = Column(Integer, default=1)  # Для optimistic locking

# При UPDATE:
UPDATE constitution_sections
SET content = ?, version = version + 1
WHERE id = ? AND version = ?
# Если version изменился - conflict
```

---

### 📊 **ОЦЕНКА ГОТОВНОСТИ**

| Acceptance Criteria | Реализация | Статус | Препятствия |
|---------------------|------------|--------|-------------|
| **Lock state** | 0% | ❌ Не реализовано | Нужны lock поля в БД |
| **Reviewer field** | 0% | ❌ Не реализовано | Нужна review workflow |
| **Reason** | 0% | ❌ Не реализовано | Нужно поле lock_reason |
| **Unlock workflow** | 0% | ❌ Не реализовано | Нужна таблица LockHistory |

**Общая готовность User Story 2.3: 0%**

---

### 🛠️ **ЧТО НУЖНО СДЕЛАТЬ**

#### Минимальный объем работ:
1. **Добавить lock поля в ConstitutionSection**

2. **Создать LockHistory таблицу**

3. **API endpoints**:
   ```python
   POST /api/constitution/sections/{id}/lock
   # Body: { reason, reviewer_id, expires_at }

   POST /api/constitution/sections/{id}/unlock
   # Body: { reason }

   GET /api/constitution/sections/{id}/lock-status
   # Response: { is_locked, locked_by, locked_at, reason }

   GET /api/constitution/sections/{id}/lock-history
   ```

4. **Middleware для проверки lock**:
   ```python
   def check_if_locked(section_id, user_id):
       section = get_section(section_id)
       if section.lock_state == "locked" and section.locked_by != user_id:
           raise HTTPException(403, "Section is locked by another user")
   ```

5. **Frontend lock indicator**:
   ```jsx
   <LockedBanner
       lockedBy="Jane Counsel"
       lockedAt="2025-01-15 10:30"
       reason="Legal review in progress"
       canUnlock={isAdmin}
   />
   ```

6. **Background job для auto-unlock**:
   ```python
   @scheduler.task
   def auto_unlock_expired():
       expired = db.query(ConstitutionSection).filter(
           ConstitutionSection.lock_state == "locked",
           ConstitutionSection.lock_expires_at < datetime.now()
       ).all()
       for section in expired:
           unlock(section.id, reason="Automatic unlock - timeout")
   ```

---

### 💡 **РЕКОМЕНДАЦИИ**

1. **Разбить на подзадачи:**
   - Sub-story 2.3a: Lock mechanism (5 SP)
   - Sub-story 2.3b: Unlock workflow + history (3 SP)
   - Sub-story 2.3c: Auto-unlock background job (2 SP)

2. **Это критичная feature** для multi-user editing

3. **Рассмотреть WebSocket** для real-time lock notifications

**Story Points: 10 SP**

---

## БЛОК 2: ОБЩАЯ ОЦЕНКА

| User Story | Готовность | Story Points | Приоритет | Блокеры |
|------------|------------|--------------|-----------|---------|
| 2.1 Convert PDF to living policy | 12% | 16 SP | CRITICAL | Versioning, ownership, review fields |
| 2.2 Show how clause is lived | 30% | 10 SP | HIGH | ClausePractice table, compliance status |
| 2.3 Lock policy during review | 0% | 10 SP | CRITICAL | Lock mechanism, review workflow |

**Общая готовность блока: 14%**

**Общая сложность: 36 Story Points (~3-4 спринта)**

---

### Критические зависимости:
1. **Versioning system** - Story 2.1 блокирует diff functionality
2. **Lock mechanism** - Story 2.3 критична для multi-user editing
3. **ClausePractice linkage** - Story 2.2 требует cross-service integration

### Рекомендации по приоритетам:
1. **Start with Story 2.3** (10 SP) - критична для предотвращения конфликтов
2. **Then Story 2.1** (16 SP) - фундамент для versioned constitution
3. **Finally Story 2.2** (10 SP) - добавляет compliance visibility

**Риски:**
- Story 2.1 требует серьёзных DB migrations
- Story 2.2 требует cross-service queries (constitution + task + decision services)
- Story 2.3 требует WebSocket для real-time updates (optional but recommended)
