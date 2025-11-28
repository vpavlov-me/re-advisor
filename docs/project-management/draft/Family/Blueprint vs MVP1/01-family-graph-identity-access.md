# Block 1: Family Graph, Identity, and Access

**Purpose:** Model people, branches, roles, committees; apply least-privilege by body.

**Why:** Reduces info disparity and security risk highlighted on page 4.

---

## User Story 1.1: Role Assignment with Term Dates

**As a** Family council chair
**I want** to assign committee roles with start/end terms
**So that** access changes automatically when terms change

**Acceptance Criteria:**
- Role effective dates
- Automatic permission update
- Audit log entry

---

### 🚨 **КРИТИЧЕСКИЕ ПРОБЛЕМЫ** (Блокируют реализацию)

#### 1. **Отсутствие временных полей для ролей** (Analysis Section 1.1, lines 43-68)
**Проблема:** В текущей таблице `user_roles` **НЕТ** полей для effective dates:

```python
# ТЕКУЩАЯ структура auth_service/models/user.py (lines 151-156):
user_roles = Table(
    "user_roles",
    Base.metadata,
    Column("user_id", String, ForeignKey("users.id"), primary_key=True),
    Column("role_id", String, ForeignKey("roles.id"), primary_key=True),
)

# ОТСУТСТВУЮТ ОБЯЗАТЕЛЬНЫЕ ПОЛЯ:
# effective_date = Column(DateTime)  # Когда роль становится активной
# expires_date = Column(DateTime)    # Когда роль истекает
# is_active = Column(Boolean)        # Текущий статус активности
# assigned_by = Column(UUID)         # КТО назначил
```

**Влияние на AC:**
- ❌ **"Role effective dates"** - НЕВОЗМОЖНО реализовать без изменения схемы БД
- ❌ Нет места для хранения start/end терминов
- ❌ Нет способа отслеживать, какая роль активна в данный момент

---

#### 2. **Отсутствие автоматического обновления прав** (Analysis Section 1.1, lines 59-62)
**Проблема:** **НЕТ фонового процесса** для:
- Активации ролей по расписанию (когда наступает effective_date)
- Деактивации ролей по истечении срока (когда наступает expires_date)
- Инвалидации кэша прав доступа
- Отправки уведомлений об истечении ролей

**Влияние на AC:**
- ❌ **"Automatic permission update"** - ПОЛНОСТЬЮ ОТСУТСТВУЕТ
- ❌ Права не изменяются автоматически при смене терминов
- ❌ Пользователи могут сохранить права после истечения роли

**Что нужно:**
```python
# ОТСУТСТВУЕТ:
# - Background job (Celery/APScheduler) для проверки expires_date
# - Permission cache invalidation при смене роли
# - Notification service integration для уведомлений
```

---

#### 3. **Отсутствие аудита изменений ролей** (Analysis Section 1.1, lines 64-66)
**Проблема:** **НЕТ истории изменений ролей**:
- Не отслеживается, когда роль была назначена/отозвана
- Нет audit trail для изменений прав
- Нет информации о том, КТО назначил роль

**Влияние на AC:**
- ❌ **"Audit log entry"** - НЕВОЗМОЖНО реализовать без новой таблицы
- ❌ Нет прослеживаемости изменений
- ❌ Нет compliance/отчетности

**Что нужно создать:**
```python
# ОТСУТСТВУЮЩАЯ МОДЕЛЬ:
class RoleAssignmentHistory(Base):
    __tablename__ = "role_assignment_history"
    id = Column(UUID, primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID, ForeignKey("users.id"))
    role_id = Column(UUID, ForeignKey("roles.id"))
    action = Column(Enum("assigned", "expired", "revoked", "updated"))
    effective_date = Column(DateTime)
    expires_date = Column(DateTime)
    assigned_by = Column(UUID, ForeignKey("users.id"))  # КТО назначил
    reason = Column(Text)  # ПОЧЕМУ назначили
    created_at = Column(DateTime, server_default=func.now())
```

---

### ⚠️ **СВЯЗАННЫЕ ПРОБЛЕМЫ**

#### 4. **Отсутствие уведомлений об истечении** (Analysis Section 3.1, lines 622-626)
**Проблема:** Notification service существует, но **НЕТ** автоматических напоминаний:
- Нет эскалирующих напоминаний за N дней до истечения роли
- Нет уведомления chair'у о необходимости переназначить роль
- Нет автоматического nudge system

**Влияние:**
- ⚠️ Роли истекают без предупреждения
- ⚠️ Chair не получает предупреждений для переназначения

---

#### 5. **Отсутствие UI для управления терминами** (Analysis Section 1.3, lines 129-142)
**Проблема:** **НЕТ интерфейса** для:
- Визуализации текущих терминов ролей
- Редактирования effective/expires dates
- Badge'й "Active until DD.MM.YYYY"
- Фильтрации по "скоро истекающим" ролям

**Влияние:**
- ⚠️ Chair не может увидеть, когда истекают текущие роли
- ⚠️ Нет визуальных индикаторов статуса роли

---

### 📊 **ОЦЕНКА ГОТОВНОСТИ**

| Acceptance Criteria | Реализация | Статус | Препятствия |
|---------------------|------------|--------|-------------|
| **Role effective dates** | 0% | ❌ Не реализовано | Нужно изменить схему БД (user_roles) |
| **Automatic permission update** | 0% | ❌ Не реализовано | Нужен background job + permission cache |
| **Audit log entry** | 0% | ❌ Не реализовано | Нужна новая таблица RoleAssignmentHistory |

**Общая готовность User Story 1.1: 0%**

---

### 🛠️ **ЧТО НУЖНО СДЕЛАТЬ**

#### Минимальный объем работ (Must Have):
1. **Изменить схему БД** - добавить поля в `user_roles` или создать новую таблицу `role_assignments`:
   ```sql
   ALTER TABLE user_roles ADD COLUMN effective_date TIMESTAMP;
   ALTER TABLE user_roles ADD COLUMN expires_date TIMESTAMP;
   ALTER TABLE user_roles ADD COLUMN is_active BOOLEAN DEFAULT TRUE;
   ALTER TABLE user_roles ADD COLUMN assigned_by UUID;
   ```

2. **Создать таблицу аудита** - `role_assignment_history`

3. **Реализовать background job** (Celery/APScheduler):
   - Проверка expires_date каждую ночь
   - Деактивация истекших ролей
   - Активация будущих ролей

4. **Обновить auth service** - проверять `is_active` и даты при авторизации

5. **Создать API endpoints**:
   ```python
   POST /api/roles/assign        # С effective_date, expires_date
   GET  /api/roles/expiring      # Скоро истекающие роли
   GET  /api/roles/history/{user_id}  # История назначений
   ```

#### Дополнительно (Should Have):
6. **Notification system integration** - уведомления за 7/3/1 день до истечения
7. **UI компонент** - календарь для выбора терминов
8. **Permission cache invalidation** - сброс кэша при смене роли

---

### 💡 **РЕКОМЕНДАЦИИ**

1. **Разбить story на 2-3 части:**
   - Sub-story 1.1a: Role effective dates (схема БД + основной CRUD) - 5 SP
   - Sub-story 1.1b: Automatic permission update (background job) - 5 SP
   - Sub-story 1.1c: Audit log entry (история + reporting) - 3 SP

2. **Начать с миграции БД** - это блокирует всё остальное

3. **Приоритизировать автоматику** - это ключевое отличие от ручного управления

**Story Points: 13 SP**

---

## User Story 1.2: Guest Access for External Advisors

**As an** external advisor
**I want** guest access to only the Investment space I'm invited to
**So that** I can collaborate without seeing unrelated family information

**Acceptance Criteria:**
- Invite-only SSO/OIDC
- Scope-limited roles
- View/download controls

---

### 🚨 **КРИТИЧЕСКИЕ ПРОБЛЕМЫ**

#### 1. **Отсутствие scope-limited roles** (Analysis Section 1.2, lines 98-102)
**Проблема:** OAuth провайдеры аутентифицируют пользователей, но:
- Роли назначаются ПОСЛЕ аутентификации, не во время
- Нет связи между OAuth scope и системными ролями
- Нет ограничения ролей по "пространствам" (spaces/workspaces)

**Что существует:**
```python
# auth_service/services/apple_auth.py (lines 214-328)
# - OAuth 2.0 flow реализован ✓
# - JWT токены генерируются ✓
# - НО: Все пользователи получают одинаковые роли
```

**Влияние на AC:**
- ⚠️ **"Scope-limited roles"** - частично реализовано (50%)
- ❌ Нет концепции "Investment space" vs "Family space"
- ❌ Невозможно ограничить советника только одним workspace

---

#### 2. **Отсутствие view/download controls** (Analysis Section 1.2, lines 104-107)
**Проблема:** **НЕТ гранулярных прав** на документы:
- Нет разделения "просмотр" vs "скачивание"
- Все аутентифицированные пользователи имеют одинаковый доступ к контенту
- Нет document access control на уровне БД

**Влияние на AC:**
- ❌ **"View/download controls"** - полностью отсутствует (0%)
- ❌ Советники могут скачивать всё, что видят
- ❌ Нет audit trail для скачивания документов

---

#### 3. **Отсутствие invite-only системы** (Analysis Section 1.2, lines 109-112)
**Проблема:** User registration существует, но:
- Нет проверки invite token/code
- Нет таблицы для хранения инвайтов
- Нет expiration для инвайтов

**Что нужно:**
```python
# ОТСУТСТВУЮЩАЯ МОДЕЛЬ:
class Invitation(Base):
    __tablename__ = "invitations"
    id = Column(UUID, primary_key=True)
    email = Column(String, nullable=False)
    invited_by = Column(UUID, ForeignKey("users.id"))
    invited_to_space = Column(String)  # "investment", "family_council"
    role_id = Column(UUID, ForeignKey("roles.id"))
    token = Column(String, unique=True)
    expires_at = Column(DateTime)
    used_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, server_default=func.now())
```

**Влияние на AC:**
- ⚠️ **"Invite-only SSO/OIDC"** - OAuth работает, но invite не проверяется (70%)

---

### ⚠️ **СВЯЗАННЫЕ ПРОБЛЕМЫ**

#### 4. **Отсутствие workspace/space концепции**
**Проблема:** Нет модели для "spaces" (Investment space, Family Council space, etc.):
- Все данные фильтруются только по `family_id`
- Нет дополнительной изоляции внутри семьи
- Нет возможности пригласить в конкретное пространство

**Что нужно:**
```python
# ОТСУТСТВУЮЩАЯ МОДЕЛЬ:
class Workspace(Base):
    __tablename__ = "workspaces"
    id = Column(UUID, primary_key=True)
    family_id = Column(UUID, ForeignKey("families.id"))
    name = Column(String)  # "Investment Committee", "Board"
    workspace_type = Column(String)  # "investment", "governance"

class WorkspaceMember(Base):
    __tablename__ = "workspace_members"
    user_id = Column(UUID, ForeignKey("users.id"))
    workspace_id = Column(UUID, ForeignKey("workspaces.id"))
    role = Column(String)  # "viewer", "editor", "admin"
    can_download = Column(Boolean, default=False)
```

---

### 📊 **ОЦЕНКА ГОТОВНОСТИ**

| Acceptance Criteria | Реализация | Статус | Препятствия |
|---------------------|------------|--------|-------------|
| **Invite-only SSO/OIDC** | 70% | ⚠️ Частично | OAuth работает, invite-only не проверяется |
| **Scope-limited roles** | 30% | ❌ Минимально | Нет workspace/space модели |
| **View/download controls** | 0% | ❌ Не реализовано | Нет гранулярных прав на документы |

**Общая готовность User Story 1.2: 33%**

---

### 🛠️ **ЧТО НУЖНО СДЕЛАТЬ**

#### Минимальный объем работ:
1. **Создать Workspace модель** - пространства внутри семьи
2. **Создать Invitation модель** - инвайты с токенами
3. **Добавить invite validation** в OAuth flow
4. **Создать WorkspaceMember** - связь пользователь-workspace с ролью
5. **Добавить document access control**:
   ```python
   class DocumentPermission(Base):
       document_id = Column(UUID)
       user_id = Column(UUID)
       can_view = Column(Boolean)
       can_download = Column(Boolean)
       granted_by = Column(UUID)
       expires_at = Column(DateTime)
   ```

6. **API endpoints**:
   ```python
   POST /api/invitations/create    # Создать инвайт
   POST /api/auth/register-with-invite/{token}  # Регистрация по инвайту
   GET  /api/workspaces/{workspace_id}/members  # Участники workspace
   POST /api/documents/{doc_id}/grant-access   # Выдать доступ
   ```

---

### 💡 **РЕКОМЕНДАЦИИ**

1. **Разбить на подзадачи:**
   - Sub-story 1.2a: Workspace model + API (5 SP)
   - Sub-story 1.2b: Invitation system (3 SP)
   - Sub-story 1.2c: Document access controls (5 SP)

2. **Начать с Workspace модели** - фундамент для всего остального

**Story Points: 13 SP**

---

## User Story 1.3: Conflict of Interest Detection

**As a** director
**I want** conflicts of interest flagged before votes
**So that** I can ensure fair decision-making

**Acceptance Criteria:**
- Conflict declarations linked to members
- Blocking warning pre-vote

---

### 🚨 **КРИТИЧЕСКИЕ ПРОБЛЕМЫ**

#### 1. **Отсутствие модели для conflict declarations** (Analysis Section 1.7, lines 284-307)
**Проблема:** **ПОЛНОСТЬЮ ОТСУТСТВУЕТ** таблица для declaration:
- Нет места для хранения заявлений о конфликте интересов
- Нет связи между участником и его конфликтами
- Нет автоматического исключения на основе конфликтов

**Что существует:**
```python
# constitution_service/models/constitution.py (lines 149-165)
# VoterEligibilityRule - правила голосования по возрасту ✓
# НО: Нет правил для conflict of interest
```

**Что нужно создать:**
```python
# ОТСУТСТВУЮЩАЯ МОДЕЛЬ:
class ConflictOfInterestDeclaration(Base):
    __tablename__ = "conflict_declarations"
    id = Column(UUID, primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID, ForeignKey("users.id"), nullable=False)
    decision_id = Column(UUID, ForeignKey("decisions.id"), nullable=True)
    conflict_type = Column(String)  # "financial", "personal", "professional"
    description = Column(Text)
    declared_at = Column(DateTime, server_default=func.now())
    declared_by = Column(UUID)  # Может быть self-declared или от chair
    is_active = Column(Boolean, default=True)
    resolution_notes = Column(Text)  # Как разрешили конфликт
```

**Влияние на AC:**
- ❌ **"Conflict declarations linked to members"** - полностью отсутствует (0%)
- ❌ Невозможно задекларировать конфликт
- ❌ Нет истории конфликтов

---

#### 2. **Отсутствие pre-vote blocking** (Analysis Section 1.8, lines 310-341)
**Проблема:** **НЕТ проверки перед голосованием**:
- Нет валидации eligibility перед разрешением голоса
- Нет предупреждения для пользователей с конфликтами
- Нет объяснения, почему заблокирован

**Текущий код (недостаточный):**
```python
# decision_making_service/routes/participant.py (lines 28-33)
# Проверяется только creator:
if decision.created_by != user_id:
    raise HTTPException(status_code=403, detail="Only creator can add")
# НО: НЕТ проверки конфликтов, возраста, eligibility
```

**Влияние на AC:**
- ❌ **"Blocking warning pre-vote"** - полностью отсутствует (0%)
- ❌ Невалидные голоса могут быть поданы
- ❌ Нет warning UI

---

### ⚠️ **СВЯЗАННЫЕ ПРОБЛЕМЫ**

#### 3. **Отсутствие UI для declaration**
**Проблема:** Нет интерфейса для:
- Заполнения declaration формы
- Просмотра текущих конфликтов участника
- Warning banner'а перед голосованием

---

#### 4. **Отсутствие автоматического исключения**
**Проблема:** Даже если конфликт задекларирован, нет автоматики:
- Не исключается из списка voters
- Не помечается как "recused" в participant list
- Не обновляется quorum calculation

---

### 📊 **ОЦЕНКА ГОТОВНОСТИ**

| Acceptance Criteria | Реализация | Статус | Препятствия |
|---------------------|------------|--------|-------------|
| **Conflict declarations linked to members** | 0% | ❌ Не реализовано | Нужна новая таблица conflict_declarations |
| **Blocking warning pre-vote** | 0% | ❌ Не реализовано | Нет pre-vote validation logic |

**Общая готовность User Story 1.3: 0%**

---

### 🛠️ **ЧТО НУЖНО СДЕЛАТЬ**

#### Минимальный объем работ:
1. **Создать ConflictOfInterestDeclaration модель**

2. **Добавить pre-vote validation**:
   ```python
   def validate_voter_eligibility(user_id, decision_id):
       # 1. Проверить возраст (existing VoterEligibilityRule)
       # 2. Проверить конфликты (NEW)
       conflicts = db.query(ConflictDeclaration).filter(
           ConflictDeclaration.user_id == user_id,
           ConflictDeclaration.decision_id == decision_id,
           ConflictDeclaration.is_active == True
       ).all()

       if conflicts:
           raise BlockedFromVotingException(
               reason="Conflict of interest declared",
               details=conflicts[0].description
           )
   ```

3. **API endpoints**:
   ```python
   POST /api/conflicts/declare              # Задекларировать конфликт
   GET  /api/conflicts/user/{user_id}       # История конфликтов
   GET  /api/decisions/{id}/conflicts       # Все конфликты по решению
   POST /api/votes/check-eligibility        # Pre-vote check
   ```

4. **Frontend warning component**:
   ```jsx
   <VoteBlockedWarning
       reason="Conflict of Interest"
       description="You declared financial interest in this matter"
       declaredAt="2025-01-15"
   />
   ```

---

### 💡 **РЕКОМЕНДАЦИИ**

1. **Разбить на подзадачи:**
   - Sub-story 1.3a: Conflict declaration model + CRUD (3 SP)
   - Sub-story 1.3b: Pre-vote validation logic (3 SP)
   - Sub-story 1.3c: Warning UI component (2 SP)

2. **Интегрировать с existing voting flow** в decision_making_service

3. **Добавить в audit log** все declaration events

**Story Points: 8 SP**

---

## БЛОК 1: ОБЩАЯ ОЦЕНКА

| User Story | Готовность | Story Points | Приоритет | Блокеры |
|------------|------------|--------------|-----------|---------|
| 1.1 Role assignment with terms | 0% | 13 SP | CRITICAL | DB schema, background job, audit table |
| 1.2 Guest access for advisors | 33% | 13 SP | HIGH | Workspace model, invitation system |
| 1.3 Conflict detection | 0% | 8 SP | CRITICAL | Conflict table, pre-vote validation |

**Общая готовность блока: 11%**

**Общая сложность: 34 Story Points (~3-4 спринта)**

---

### Критические зависимости:
1. **DB migrations** - все stories требуют новых таблиц
2. **Background jobs** - Story 1.1 требует scheduler
3. **Workspace concept** - Story 1.2 требует новую архитектурную концепцию

### Рекомендации по приоритетам:
1. **Start with Story 1.3** (8 SP) - самая простая, критичная для governance
2. **Then Story 1.1** (13 SP) - фундамент для временного управления ролями
3. **Finally Story 1.2** (13 SP) - требует больше архитектурных решений

**Риски:** Все stories требуют существенных изменений в auth_service и decision_making_service. Нужна координация между командами.
