# Block 15: Cross-Functional Integration & Analytics

**Purpose:** Connect investment, philanthropy, and governance workflows with shared taxonomies and constraint testing.

**Why:** Club-deal prevalence trend page 11; Impact sectors diagram page 13; Family constraints list page 8.

---

## User Story 15.1: Club-Deal Rights & Cap Alerts

**As** IC (Investment Committee)
**I want** to log a co-investor's rights and notify council before crossing a cap
**So that** we maintain compliance and transparency with partners

**Acceptance Criteria:**
- Rights matrix
- Threshold alerts
- Compliance record

**Grounding:** Club-deal prevalence trend page 11

---

### 🚨 **КРИТИЧЕСКИЕ ПРОБЛЕМЫ**

#### 1. **Отсутствие rights matrix модели** (Analysis Section 2.3, lines 531-535)
**Проблема:** **ПОЛНОСТЬЮ ОТСУТСТВУЕТ** co-investor rights tracking:
- Нет таблицы для хранения прав co-investors
- Нет связи между инвестором и их правами (voting, veto, information, etc.)
- Нет модели для club-deal структуры

**Что существует:**
```python
# asset_service/models/asset.py
# Минимальная Asset модель (2 tables only):
# - Asset
# - Property
# НО: Нет co-investor relationships, нет rights tracking
```

**Что нужно создать:**
```python
# ОТСУТСТВУЮЩАЯ МОДЕЛЬ:
class CoInvestor(Base):
    __tablename__ = "co_investors"
    id = Column(UUID, primary_key=True, default=uuid.uuid4)
    family_id = Column(UUID, ForeignKey("families.id"))
    name = Column(String, nullable=False)
    entity_type = Column(String)  # "individual", "family_office", "institution"
    contact_email = Column(String)
    contact_phone = Column(String)
    relationship_start = Column(DateTime)
    is_active = Column(Boolean, default=True)

class CoInvestorRights(Base):
    __tablename__ = "co_investor_rights"
    id = Column(UUID, primary_key=True)
    co_investor_id = Column(UUID, ForeignKey("co_investors.id"))
    deal_id = Column(UUID)  # Reference to investment/deal
    right_type = Column(Enum(
        "voting", "veto", "information", "pro_rata",
        "tag_along", "drag_along", "preemption"
    ))
    right_details = Column(JSON)  # Specific terms
    effective_date = Column(DateTime)
    expiry_date = Column(DateTime, nullable=True)
    priority_order = Column(Integer)  # In case of multiple rights
    created_at = Column(DateTime, server_default=func.now())
    created_by = Column(UUID, ForeignKey("users.id"))

class CoInvestorRightsMatrix(Base):
    """Summary view of all rights per investor"""
    __tablename__ = "co_investor_rights_matrix"
    id = Column(UUID, primary_key=True)
    co_investor_id = Column(UUID, ForeignKey("co_investors.id"))
    deal_id = Column(UUID)
    voting_rights = Column(Boolean)
    veto_rights = Column(Boolean)
    information_rights = Column(Boolean)
    pro_rata_rights = Column(Boolean)
    tag_along_rights = Column(Boolean)
    drag_along_rights = Column(Boolean)
    preemption_rights = Column(Boolean)
    updated_at = Column(DateTime, onupdate=func.now())
```

**Влияние на AC:**
- ❌ **"Rights matrix"** - полностью отсутствует (0%)
- ❌ Невозможно отобразить права co-investors
- ❌ Нет structured data для прав

---

#### 2. **Отсутствие threshold alerts для cap** (Analysis Section 3.2, lines 666-695)
**Проблема:** **НЕТ системы threshold rules**:
- Нет таблицы для хранения cap limits
- Нет автоматических alert rules
- Нет notification при приближении к cap
- Нет pre-investment validation

**Что нужно:**
```python
class InvestmentCap(Base):
    __tablename__ = "investment_caps"
    id = Column(UUID, primary_key=True)
    family_id = Column(UUID, ForeignKey("families.id"))
    cap_type = Column(Enum(
        "per_deal", "per_co_investor", "total_exposure",
        "sector_concentration", "geographic_limit"
    ))
    cap_value = Column(Numeric(15, 2))  # Dollar amount or percentage
    currency = Column(String, default="USD")
    warning_threshold_pct = Column(Integer, default=80)  # Alert at 80%
    is_active = Column(Boolean, default=True)
    applies_to = Column(JSON)  # Which deals/sectors/co-investors
    created_at = Column(DateTime, server_default=func.now())

class CapAlert(Base):
    __tablename__ = "cap_alerts"
    id = Column(UUID, primary_key=True)
    cap_id = Column(UUID, ForeignKey("investment_caps.id"))
    co_investor_id = Column(UUID, ForeignKey("co_investors.id"), nullable=True)
    deal_id = Column(UUID, nullable=True)
    alert_type = Column(Enum("warning", "critical", "breach"))
    current_value = Column(Numeric(15, 2))
    cap_value = Column(Numeric(15, 2))
    utilization_pct = Column(Integer)  # e.g., 85%
    message = Column(Text)
    notified_to = Column(ARRAY(UUID))  # User IDs of council members
    notified_at = Column(DateTime)
    acknowledged = Column(Boolean, default=False)
    acknowledged_by = Column(UUID)
    acknowledged_at = Column(DateTime)
    created_at = Column(DateTime, server_default=func.now())
```

**Влияние на AC:**
- ❌ **"Threshold alerts"** - полностью отсутствует (0%)
- ❌ Нет pre-notification council
- ❌ Нет автоматической проверки перед инвестицией

---

#### 3. **Отсутствие compliance record** (Analysis Section 2.1, lines 373-428)
**Проблема:** **НЕТ audit trail** для investment compliance:
- Нет immutable log для cap-related decisions
- Нет истории cap breaches/approvals
- Нет compliance reporting

**Что нужно:**
```python
class InvestmentComplianceLog(Base):
    __tablename__ = "investment_compliance_log"
    id = Column(UUID, primary_key=True)
    family_id = Column(UUID, ForeignKey("families.id"))
    event_type = Column(Enum(
        "cap_check_passed", "cap_warning_triggered",
        "cap_breach_prevented", "cap_override_approved",
        "rights_verified", "rights_conflict_detected"
    ))
    deal_id = Column(UUID)
    co_investor_id = Column(UUID, ForeignKey("co_investors.id"), nullable=True)
    cap_id = Column(UUID, ForeignKey("investment_caps.id"), nullable=True)
    details = Column(JSON)  # Full context of the event
    performed_by = Column(UUID, ForeignKey("users.id"))
    approved_by = Column(UUID, ForeignKey("users.id"), nullable=True)
    decision_id = Column(UUID, nullable=True)  # Link to council decision
    created_at = Column(DateTime, server_default=func.now())
    # Immutable: No update or delete allowed
```

**Влияние на AC:**
- ❌ **"Compliance record"** - полностью отсутствует (0%)
- ❌ Нет audit trail для cap compliance
- ❌ Нет immutable log для regulatory reporting

---

### ⚠️ **СВЯЗАННЫЕ ПРОБЛЕМЫ**

#### 4. **Отсутствие council notification workflow**
**Проблема:** Даже если alert создан, нет workflow для:
- Автоматической отправки уведомления council members
- Escalation если не acknowledged
- Integration с decision-making для approval

**Что нужно:**
```python
# Integration с notification_service
def notify_council_cap_alert(cap_alert_id):
    alert = get_cap_alert(cap_alert_id)
    council_members = get_council_members(alert.family_id)

    for member in council_members:
        create_notification(
            user_id=member.id,
            type="CAP_ALERT",
            priority="URGENT",
            title=f"Investment Cap Alert: {alert.utilization_pct}% utilized",
            body=alert.message,
            action_required=True,
            action_url=f"/investment/cap-alerts/{cap_alert_id}"
        )
```

---

#### 5. **Отсутствие pre-investment validation**
**Проблема:** Нет middleware для проверки cap перед созданием deal:
- Не блокируется создание deal при breach
- Нет warning UI при приближении к cap

**Что нужно:**
```python
# Pre-investment validation
@router.post("/api/investments/create")
async def create_investment(investment: InvestmentCreate):
    # ОТСУТСТВУЕТ: Pre-check cap compliance
    cap_check = check_cap_compliance(
        family_id=investment.family_id,
        amount=investment.amount,
        co_investor_id=investment.co_investor_id
    )

    if cap_check.status == "breach":
        # Require council approval
        raise HTTPException(
            status_code=403,
            detail={
                "error": "Cap breach detected",
                "current_utilization": cap_check.utilization_pct,
                "cap_limit": cap_check.cap_value,
                "requires_council_approval": True
            }
        )
    elif cap_check.status == "warning":
        # Create alert but allow with warning
        create_cap_alert(cap_check)
        notify_council_cap_alert(cap_check.alert_id)
```

---

### 📊 **ОЦЕНКА ГОТОВНОСТИ**

| Acceptance Criteria | Реализация | Статус | Препятствия |
|---------------------|------------|--------|-------------|
| **Rights matrix** | 0% | ❌ Не реализовано | Нужны модели CoInvestor, CoInvestorRights, RightsMatrix |
| **Threshold alerts** | 0% | ❌ Не реализовано | Нужны модели InvestmentCap, CapAlert, alert engine |
| **Compliance record** | 0% | ❌ Не реализовано | Нужна модель InvestmentComplianceLog (immutable) |

**Общая готовность User Story 15.1: 0%**

---

### 🛠️ **ЧТО НУЖНО СДЕЛАТЬ**

#### Минимальный объем работ (Must Have):
1. **Создать Co-Investor модели**:
   - CoInvestor (базовая информация)
   - CoInvestorRights (детальные права)
   - CoInvestorRightsMatrix (summary view)

2. **Создать Cap Management модели**:
   - InvestmentCap (определение limits)
   - CapAlert (уведомления)
   - InvestmentComplianceLog (immutable audit)

3. **Реализовать cap validation logic**:
   ```python
   def check_cap_compliance(family_id, amount, co_investor_id):
       caps = get_active_caps(family_id, co_investor_id)
       current_exposure = calculate_current_exposure(family_id, co_investor_id)

       for cap in caps:
           utilization = (current_exposure + amount) / cap.cap_value
           if utilization >= 1.0:
               return CapCheckResult(status="breach", ...)
           elif utilization >= cap.warning_threshold_pct / 100:
               return CapCheckResult(status="warning", ...)

       return CapCheckResult(status="ok")
   ```

4. **Реализовать alert notification system**:
   - Integration с notification_service
   - Council notification workflow
   - Acknowledgment tracking

5. **API endpoints**:
   ```python
   # Co-Investor Management
   POST   /api/co-investors/create
   GET    /api/co-investors/{id}
   POST   /api/co-investors/{id}/rights/add
   GET    /api/co-investors/{id}/rights-matrix

   # Cap Management
   POST   /api/investment-caps/create
   GET    /api/investment-caps/{family_id}/active
   PUT    /api/investment-caps/{id}/update

   # Alerts
   GET    /api/cap-alerts/active
   POST   /api/cap-alerts/{id}/acknowledge
   GET    /api/cap-alerts/history

   # Compliance
   GET    /api/investment-compliance/log
   POST   /api/investments/check-cap-compliance
   GET    /api/investment-compliance/report
   ```

6. **Frontend components**:
   ```jsx
   <RightsMatrixView
       coInvestorId={id}
       rights={rightsData}
       editable={isAdmin}
   />

   <CapAlertBanner
       alert={alert}
       utilizationPct={85}
       capLimit={1000000}
       onAcknowledge={handleAcknowledge}
   />

   <ComplianceLogTable
       logs={complianceLogs}
       filterable={true}
       exportable={true}
   />
   ```

---

### 💡 **РЕКОМЕНДАЦИИ**

1. **Разбить на подзадачи:**
   - Sub-story 15.1a: Co-investor & rights models + CRUD (8 SP)
   - Sub-story 15.1b: Cap management + validation logic (8 SP)
   - Sub-story 15.1c: Alert system + council notification (5 SP)
   - Sub-story 15.1d: Compliance log + reporting (5 SP)

2. **Начать с co-investor models** - это foundation для всего остального

3. **Integration points:**
   - Asset service (для связи с deals)
   - Notification service (для alerts)
   - Decision service (для council approvals)

4. **Regulatory considerations:**
   - ComplianceLog должен быть immutable (append-only)
   - Timestamp все события точно
   - Audit trail для SEC/regulatory reporting

**Story Points: 26 SP**

---

## User Story 15.2: Impact Taxonomy Mapping

**As** philanthropy chair
**I want** to map grants to impact sectors (renewable energy, education, agri) used in IC impact reporting
**So that** we have unified impact tracking across philanthropy and investment

**Acceptance Criteria:**
- Shared taxonomy
- Cross-workspace rollup

**Grounding:** Impact sectors diagram page 13 and pie charts page 15

---

### 🚨 **КРИТИЧЕСКИЕ ПРОБЛЕМЫ**

#### 1. **Отсутствие shared taxonomy** (Analysis Section 2.2, lines 474-478)
**Проблема:** Philanthropy и Investment используют **РАЗНЫЕ** таксономии:

**Что существует:**
```python
# philanthropy_service/models/philanthropy.py (lines 35-44)
class CauseCategory(str, enum.Enum):
    EDUCATION = "Education"
    HEALTHCARE = "Healthcare"
    ENVIRONMENT = "Environment"
    ARTS_CULTURE = "Arts & Culture"
    POVERTY_RELIEF = "Poverty Relief"
    ANIMAL_WELFARE = "Animal Welfare"
    HUMAN_RIGHTS = "Human Rights"
    COMMUNITY_DEV = "Community Development"
    RESEARCH = "Research"
    OTHER = "Other"

# НО: Asset service НЕ использует эту таксономию
# Нет unified impact sector model
```

**Что нужно создать:**
```python
# SHARED TAXONOMY MODEL (в отдельном shared_service или core_models):
class ImpactSector(Base):
    """Unified impact taxonomy for philanthropy + investment"""
    __tablename__ = "impact_sectors"
    id = Column(UUID, primary_key=True)
    name = Column(String, unique=True)  # "Renewable Energy"
    code = Column(String, unique=True)  # "RE"
    category = Column(String)  # "Environment"
    description = Column(Text)
    sdg_alignment = Column(ARRAY(Integer))  # UN SDG numbers: [7, 13]
    parent_sector_id = Column(UUID, ForeignKey("impact_sectors.id"), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, server_default=func.now())

class ImpactSectorMapping(Base):
    """Map philanthropy grants and investments to impact sectors"""
    __tablename__ = "impact_sector_mappings"
    id = Column(UUID, primary_key=True)
    sector_id = Column(UUID, ForeignKey("impact_sectors.id"))
    entity_type = Column(Enum("grant", "donation", "investment", "initiative"))
    entity_id = Column(UUID)  # Grant ID, Investment ID, etc.
    workspace_type = Column(Enum("philanthropy", "investment_committee", "both"))
    primary_sector = Column(Boolean, default=False)  # Primary vs secondary impact
    impact_weight = Column(Numeric(3, 2))  # 0.0 to 1.0 (for multi-sector entities)
    mapped_by = Column(UUID, ForeignKey("users.id"))
    mapped_at = Column(DateTime, server_default=func.now())

class ImpactMetric(Base):
    """Metrics associated with impact sectors"""
    __tablename__ = "impact_metrics"
    id = Column(UUID, primary_key=True)
    sector_id = Column(UUID, ForeignKey("impact_sectors.id"))
    metric_name = Column(String)  # "CO2 reduction (tons)", "Students educated"
    metric_type = Column(Enum("quantitative", "qualitative"))
    unit = Column(String)  # "tons", "people", "hectares"
    is_standard = Column(Boolean)  # Standard metric vs custom
```

**Влияние на AC:**
- ❌ **"Shared taxonomy"** - полностью отсутствует (0%)
- ❌ Philanthropy и IC используют разные categorizations
- ❌ Нет unified reporting по impact

---

#### 2. **Отсутствие cross-workspace rollup** (Analysis Section 5.3, lines 1118-1155)
**Проблема:** **НЕТ механизма** для aggregation across workspaces:
- Нет cross-service queries (philanthropy + investment)
- Нет consolidated impact dashboard
- Нет rollup по sectors

**Что существует:**
```python
# task_service/routes/aggregation.py (lines 12-24)
# aggregate_tasks() группирует по service
# НО: Нет impact aggregation
# НО: Нет cross-workspace rollup
```

**Что нужно:**
```python
class ImpactRollup(Base):
    """Pre-calculated rollups for performance"""
    __tablename__ = "impact_rollups"
    id = Column(UUID, primary_key=True)
    family_id = Column(UUID, ForeignKey("families.id"))
    sector_id = Column(UUID, ForeignKey("impact_sectors.id"))
    rollup_period = Column(String)  # "2024-Q1", "2024", "all-time"

    # Philanthropy metrics
    total_grants = Column(Integer)
    total_grant_amount = Column(Numeric(15, 2))
    beneficiaries_reached = Column(Integer)

    # Investment metrics
    total_investments = Column(Integer)
    total_investment_amount = Column(Numeric(15, 2))
    impact_multiple = Column(Numeric(5, 2))

    # Combined metrics
    combined_capital_deployed = Column(Numeric(15, 2))
    sdg_alignment_score = Column(Numeric(3, 2))

    calculated_at = Column(DateTime, server_default=func.now())

# API для cross-workspace rollup:
@router.get("/api/impact/rollup/{family_id}")
async def get_impact_rollup(
    family_id: UUID,
    sector_id: Optional[UUID] = None,
    period: str = "2024",
    workspace: Optional[str] = None  # "philanthropy", "investment", or "both"
):
    """
    Aggregate impact data across philanthropy and investment workspaces
    """
    query = """
    SELECT
        s.name as sector_name,
        s.code as sector_code,
        COUNT(DISTINCT CASE WHEN m.workspace_type IN ('philanthropy', 'both')
                            THEN m.entity_id END) as grants_count,
        COUNT(DISTINCT CASE WHEN m.workspace_type IN ('investment_committee', 'both')
                            THEN m.entity_id END) as investments_count,
        SUM(CASE WHEN m.workspace_type IN ('philanthropy', 'both')
                 THEN g.amount ELSE 0 END) as total_grant_amount,
        SUM(CASE WHEN m.workspace_type IN ('investment_committee', 'both')
                 THEN i.amount ELSE 0 END) as total_investment_amount
    FROM impact_sectors s
    LEFT JOIN impact_sector_mappings m ON s.id = m.sector_id
    LEFT JOIN grants g ON m.entity_id = g.id AND m.entity_type = 'grant'
    LEFT JOIN investments i ON m.entity_id = i.id AND m.entity_type = 'investment'
    WHERE s.family_id = :family_id
    GROUP BY s.id, s.name, s.code
    """
    return execute_query(query, family_id=family_id)
```

**Влияние на AC:**
- ❌ **"Cross-workspace rollup"** - полностью отсутствует (0%)
- ❌ Невозможно показать unified impact report
- ❌ Нет aggregation по sectors across philanthropy + IC

---

### ⚠️ **СВЯЗАННЫЕ ПРОБЛЕМЫ**

#### 3. **Отсутствие workspace concept** (см. Block 1, Story 1.2)
**Проблема:** Нет модели для "workspaces" (Philanthropy Council vs Investment Committee):
- Все данные фильтруются только по `family_id`
- Нет дополнительной сегментации
- Cross-workspace queries сложны

**Что нужно:**
- Workspace модель (уже предложена в Block 1)
- Linking entities → workspaces
- Permissions по workspace

---

#### 4. **Отсутствие SDG alignment**
**Проблема:** Нет связи с UN Sustainable Development Goals:
- Нет SDG mapping
- Нет reporting по SDG targets
- Упущена возможность для impact reporting

**Что нужно добавить:**
```python
class SDGAlignment(Base):
    __tablename__ = "sdg_alignments"
    id = Column(UUID, primary_key=True)
    entity_type = Column(Enum("sector", "grant", "investment"))
    entity_id = Column(UUID)
    sdg_number = Column(Integer)  # 1-17 (UN SDGs)
    sdg_target = Column(String)  # e.g., "7.2" (specific target)
    alignment_strength = Column(Enum("primary", "secondary", "indirect"))
    evidence = Column(Text)  # Why this alignment
```

---

### 📊 **ОЦЕНКА ГОТОВНОСТИ**

| Acceptance Criteria | Реализация | Статус | Препятствия |
|---------------------|------------|--------|-------------|
| **Shared taxonomy** | 20% | ❌ Минимально | Philanthropy has CauseCategory, но не unified model |
| **Cross-workspace rollup** | 0% | ❌ Не реализовано | Нет cross-service aggregation |

**Общая готовность User Story 15.2: 10%**

---

### 🛠️ **ЧТО НУЖНО СДЕЛАТЬ**

#### Минимальный объем работ:
1. **Создать shared taxonomy models**:
   - ImpactSector (unified taxonomy)
   - ImpactSectorMapping (link entities → sectors)
   - ImpactMetric (sector-specific metrics)

2. **Migrate existing data**:
   ```python
   # Migration script
   def migrate_cause_categories_to_impact_sectors():
       mappings = {
           "Education": "Education & Literacy",
           "Environment": "Environmental Sustainability",
           "Healthcare": "Health & Wellness",
           # ... etc
       }
       for old_category, new_sector in mappings.items():
           # Create ImpactSector
           # Map existing grants to new sectors
   ```

3. **Implement cross-workspace rollup**:
   - Create ImpactRollup table (pre-calculated aggregates)
   - Background job для periodic recalculation
   - API endpoints для querying

4. **API endpoints**:
   ```python
   # Taxonomy Management
   GET    /api/impact/sectors
   POST   /api/impact/sectors/create
   POST   /api/impact/sectors/{id}/map-entity

   # Cross-Workspace Rollup
   GET    /api/impact/rollup/{family_id}
   GET    /api/impact/rollup/{family_id}/by-sector
   GET    /api/impact/rollup/{family_id}/by-workspace
   GET    /api/impact/rollup/{family_id}/sdg-alignment

   # Reporting
   GET    /api/impact/report/unified
   GET    /api/impact/export/csv
   ```

5. **Frontend unified dashboard**:
   ```jsx
   <UnifiedImpactDashboard
       familyId={familyId}
       sectors={sectors}
       rollup={rollupData}
   >
       <SectorBreakdownChart />
       <PhilanthropyVsInvestmentChart />
       <SDGAlignmentWidget />
       <ImpactTimelineChart />
   </UnifiedImpactDashboard>
   ```

---

### 💡 **РЕКОМЕНДАЦИИ**

1. **Разбить на подзадачи:**
   - Sub-story 15.2a: Shared taxonomy model + migration (5 SP)
   - Sub-story 15.2b: Cross-workspace rollup logic (8 SP)
   - Sub-story 15.2c: Unified impact dashboard (5 SP)

2. **Начать с taxonomy model** - это enables everything else

3. **Координация:**
   - Требует changes в philanthropy_service
   - Требует changes в asset_service (когда появится investment model)
   - Создать shared_models или core_service для taxonomy

4. **Migration strategy:**
   - Dual-write period (write to both old + new)
   - Gradual migration
   - Deprecate old CauseCategory после 3 months

**Story Points: 18 SP**

---

## User Story 15.3: Constraint Policy & Cycle-Time Testing

**As** council
**I want** to encode "unanimous sign-off" as a constraint and test decision latency impact
**So that** we understand governance overhead and optimize processes

**Acceptance Criteria:**
- Constraint toggle
- Cycle-time analytics

**Grounding:** Family constraints list page 8

---

### 🚨 **КРИТИЧЕСКИЕ ПРОБЛЕМЫ**

#### 1. **Отсутствие constraint policy model** (Analysis Section 2.2, lines 470-473)
**Проблема:** **НЕТ формальной модели** для encoding constraints:
- Нет таблицы для хранения governance constraints
- Нет связи constraint → decision process
- Constraints hardcoded в коде, не configurable

**Что существует:**
```python
# decision_making_service/models/decision.py (lines 31-36, 62)
class VotingMethod(str, enum.Enum):
    SIMPLE_MAJORITY = "Simple Majority"
    SUPER_MAJORITY = "Super Majority"
    CONSENSUS = "Consensus"
    WEIGHTED = "Weighted"

approval_threshold = Column(Numeric(3, 2), default=0.5)  # 50%

# НО: Это не constraint system, это просто voting rules
# Нет constraint types (unanimous, time-bound, committee-only, etc.)
```

**Что нужно создать:**
```python
class GovernanceConstraint(Base):
    """Formal constraints on decision-making processes"""
    __tablename__ = "governance_constraints"
    id = Column(UUID, primary_key=True)
    family_id = Column(UUID, ForeignKey("families.id"))
    name = Column(String)  # "Unanimous sign-off for >$1M"
    description = Column(Text)

    constraint_type = Column(Enum(
        "unanimous_vote",           # All must approve
        "committee_approval",       # Specific committee must approve
        "sequential_approval",      # Multiple steps in order
        "time_bounded",            # Must decide within X days
        "quorum_required",         # Minimum participation
        "expert_review",           # Must have expert sign-off
        "conflict_check",          # No conflicts of interest
        "documentation_required"   # Specific docs must be attached
    ))

    constraint_config = Column(JSON)  # Type-specific configuration
    # Examples:
    # unanimous_vote: { "committee_id": "..." }
    # time_bounded: { "max_days": 14, "auto_reject": false }
    # committee_approval: { "committee_ids": ["...", "..."], "sequence": "parallel" }

    applies_to = Column(JSON)  # Conditions for when constraint applies
    # Examples:
    # { "decision_type": "investment", "amount_threshold": 1000000 }
    # { "decision_category": "constitutional_amendment" }
    # { "workspace": "investment_committee" }

    is_active = Column(Boolean, default=True)
    is_mandatory = Column(Boolean, default=True)  # Can be overridden?
    override_requires_approval = Column(Boolean, default=True)

    created_at = Column(DateTime, server_default=func.now())
    created_by = Column(UUID, ForeignKey("users.id"))
    effective_date = Column(DateTime)
    sunset_date = Column(DateTime, nullable=True)

class DecisionConstraintApplication(Base):
    """Track which constraints applied to which decisions"""
    __tablename__ = "decision_constraint_applications"
    id = Column(UUID, primary_key=True)
    decision_id = Column(UUID, ForeignKey("decisions.id"))
    constraint_id = Column(UUID, ForeignKey("governance_constraints.id"))

    status = Column(Enum("pending", "satisfied", "waived", "violated"))
    satisfied_at = Column(DateTime, nullable=True)
    satisfied_by = Column(UUID, ForeignKey("users.id"), nullable=True)

    waiver_reason = Column(Text, nullable=True)
    waived_by = Column(UUID, nullable=True)
    waived_at = Column(DateTime, nullable=True)

    created_at = Column(DateTime, server_default=func.now())
```

**Влияние на AC:**
- ❌ **"Constraint toggle"** - полностью отсутствует (0%)
- ❌ Constraints не являются first-class entities
- ❌ Нельзя enable/disable constraints динамически

---

#### 2. **Отсутствие cycle-time analytics** (Analysis Section 5.3, lines 1118-1155)
**Проблема:** **НЕТ tracking** decision latency:
- Нет measurement cycle time (создание → approval)
- Нет breakdown по этапам (draft → deliberation → voting → approved)
- Нет analytics для identifying bottlenecks

**Что существует:**
```python
# decision_making_service/models/decision.py (lines 67-72)
created_at = Column(DateTime, server_default=func.now())
updated_at = Column(DateTime, onupdate=func.now())
deliberation_deadline = Column(DateTime, nullable=True)
voting_deadline = Column(DateTime, nullable=True)
resolved_at = Column(DateTime, nullable=True)

# Timestamps есть, НО:
# - Нет tracking промежуточных этапов
# - Нет analytics/reporting
# - Нет metrics aggregation
```

**Что нужно:**
```python
class DecisionCycleTime(Base):
    """Track decision lifecycle timing"""
    __tablename__ = "decision_cycle_times"
    id = Column(UUID, primary_key=True)
    decision_id = Column(UUID, ForeignKey("decisions.id"))

    # Stage timestamps
    draft_created_at = Column(DateTime)
    deliberation_started_at = Column(DateTime, nullable=True)
    voting_started_at = Column(DateTime, nullable=True)
    resolved_at = Column(DateTime, nullable=True)
    implemented_at = Column(DateTime, nullable=True)

    # Durations (in hours)
    draft_to_deliberation = Column(Integer)
    deliberation_duration = Column(Integer)
    voting_duration = Column(Integer)
    total_cycle_time = Column(Integer)

    # Delays
    missed_deliberation_deadline = Column(Boolean, default=False)
    missed_voting_deadline = Column(Boolean, default=False)
    delay_reasons = Column(ARRAY(String))

    # Constraint impact
    constraints_applied = Column(Integer)
    constraint_overhead_hours = Column(Integer)  # Additional time due to constraints

class CycleTimeAnalytics(Base):
    """Pre-calculated analytics for performance"""
    __tablename__ = "cycle_time_analytics"
    id = Column(UUID, primary_key=True)
    family_id = Column(UUID, ForeignKey("families.id"))
    period = Column(String)  # "2024-Q1"

    # Aggregates
    total_decisions = Column(Integer)
    avg_cycle_time_hours = Column(Numeric(10, 2))
    median_cycle_time_hours = Column(Numeric(10, 2))
    p95_cycle_time_hours = Column(Numeric(10, 2))  # 95th percentile

    # By constraint type
    avg_cycle_time_with_unanimous = Column(Numeric(10, 2))
    avg_cycle_time_without_unanimous = Column(Numeric(10, 2))
    constraint_impact_pct = Column(Numeric(5, 2))  # % increase

    # Bottlenecks
    most_common_delay_reason = Column(String)
    decisions_missing_deadline_pct = Column(Numeric(5, 2))

    calculated_at = Column(DateTime, server_default=func.now())
```

**Влияние на AC:**
- ❌ **"Cycle-time analytics"** - полностью отсутствует (0%)
- ❌ Нет способа измерить constraint impact
- ❌ Нет data для optimization

---

### ⚠️ **СВЯЗАННЫЕ ПРОБЛЕМЫ**

#### 3. **Отсутствие constraint enforcement middleware**
**Проблема:** Даже если constraints созданы, нет enforcement:
- Нет проверки constraints при смене decision status
- Нет блокировки при violation
- Нет workflow для waiver approval

**Что нужно:**
```python
# Middleware для constraint enforcement
@router.put("/api/decisions/{id}/transition")
async def transition_decision_status(
    decision_id: UUID,
    new_status: DecisionStatus,
    user_id: UUID
):
    decision = get_decision(decision_id)

    # ОТСУТСТВУЕТ: Constraint checks
    applicable_constraints = get_applicable_constraints(
        decision=decision,
        transition=(decision.status, new_status)
    )

    for constraint in applicable_constraints:
        check_result = check_constraint_satisfied(
            constraint=constraint,
            decision=decision
        )

        if not check_result.satisfied:
            if constraint.is_mandatory and not constraint.override_requires_approval:
                raise HTTPException(
                    status_code=403,
                    detail={
                        "error": "Constraint not satisfied",
                        "constraint": constraint.name,
                        "reason": check_result.reason,
                        "can_waive": constraint.override_requires_approval
                    }
                )
            else:
                # Create waiver request workflow
                create_waiver_request(constraint, decision, user_id)
```

---

#### 4. **Отсутствие A/B testing framework**
**Проблема:** Нет способа safely test constraint impact:
- Нельзя включить constraint для subset of decisions
- Нет control group
- Нет statistical comparison

**Что нужно:**
```python
class ConstraintExperiment(Base):
    """A/B test constraints before full rollout"""
    __tablename__ = "constraint_experiments"
    id = Column(UUID, primary_key=True)
    constraint_id = Column(UUID, ForeignKey("governance_constraints.id"))
    experiment_name = Column(String)

    # Experiment setup
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    control_group_pct = Column(Integer)  # e.g., 50% no constraint
    treatment_group_pct = Column(Integer)  # 50% with constraint

    # Results
    control_avg_cycle_time = Column(Numeric(10, 2))
    treatment_avg_cycle_time = Column(Numeric(10, 2))
    statistical_significance = Column(Numeric(5, 4))  # p-value

    recommendation = Column(Enum("adopt", "reject", "modify", "continue_testing"))
    concluded_at = Column(DateTime)
```

---

### 📊 **ОЦЕНКА ГОТОВНОСТИ**

| Acceptance Criteria | Реализация | Статус | Препятствия |
|---------------------|------------|--------|-------------|
| **Constraint toggle** | 10% | ❌ Минимально | Voting methods есть, но не constraint system |
| **Cycle-time analytics** | 30% | ❌ Минимально | Timestamps есть, но нет analytics |

**Общая готовность User Story 15.3: 20%**

---

### 🛠️ **ЧТО НУЖНО СДЕЛАТЬ**

#### Минимальный объем работ:
1. **Создать constraint models**:
   - GovernanceConstraint
   - DecisionConstraintApplication
   - ConstraintExperiment (optional для A/B testing)

2. **Implement constraint enforcement**:
   ```python
   # На уровне decision_making_service
   def apply_constraints_to_decision(decision_id):
       decision = get_decision(decision_id)
       constraints = find_applicable_constraints(decision)

       for constraint in constraints:
           create_constraint_application(decision_id, constraint.id)

           # Auto-check некоторых constraints
           if constraint.constraint_type == "conflict_check":
               auto_check_conflicts(decision)
           elif constraint.constraint_type == "documentation_required":
               check_required_documents(decision)
   ```

3. **Create cycle-time tracking**:
   - DecisionCycleTime model
   - Background job для calculation
   - Triggers на status changes

4. **Implement analytics**:
   - CycleTimeAnalytics model
   - Aggregation queries
   - Comparison with/without constraints

5. **API endpoints**:
   ```python
   # Constraint Management
   POST   /api/governance-constraints/create
   GET    /api/governance-constraints/{family_id}
   PUT    /api/governance-constraints/{id}/toggle
   PUT    /api/governance-constraints/{id}/update

   # Constraint Application
   GET    /api/decisions/{id}/constraints
   POST   /api/decisions/{id}/waive-constraint

   # Cycle-Time Analytics
   GET    /api/analytics/cycle-time/{family_id}
   GET    /api/analytics/cycle-time/{family_id}/by-constraint
   GET    /api/analytics/cycle-time/{family_id}/bottlenecks
   GET    /api/analytics/cycle-time/compare

   # Experimentation
   POST   /api/constraint-experiments/create
   GET    /api/constraint-experiments/{id}/results
   ```

6. **Frontend components**:
   ```jsx
   <ConstraintToggle
       constraint={constraint}
       isActive={constraint.is_active}
       onToggle={handleToggle}
   />

   <CycleTimeChart
       data={cycleTimeData}
       compareWith={withConstraint}
       compareWithout={withoutConstraint}
       showImpact={true}
   />

   <ConstraintImpactDashboard
       constraints={constraints}
       metrics={metrics}
       recommendations={recommendations}
   />
   ```

---

### 💡 **РЕКОМЕНДАЦИИ**

1. **Разбить на подзадачи:**
   - Sub-story 15.3a: Constraint model + CRUD (5 SP)
   - Sub-story 15.3b: Constraint enforcement middleware (5 SP)
   - Sub-story 15.3c: Cycle-time tracking (3 SP)
   - Sub-story 15.3d: Analytics & comparison (5 SP)

2. **Начать с cycle-time tracking** - это дает baseline перед constraint experiments

3. **Phased rollout:**
   - Phase 1: Track cycle times (get baseline)
   - Phase 2: Implement constraints (start simple: unanimous only)
   - Phase 3: Measure impact
   - Phase 4: Add more constraint types

4. **Research opportunity:**
   - This could generate publishable insights
   - "Quantifying governance overhead in family offices"

**Story Points: 18 SP**

---

## БЛОК 15: ОБЩАЯ ОЦЕНКА

| User Story | Готовность | Story Points | Приоритет | Блокеры |
|------------|------------|--------------|-----------|---------|
| 15.1 Club-deal rights & alerts | 0% | 26 SP | MEDIUM | Co-investor model, cap management, alert engine |
| 15.2 Impact taxonomy | 10% | 18 SP | MEDIUM | Shared taxonomy, cross-workspace rollup |
| 15.3 Constraint testing | 20% | 18 SP | LOW | Constraint model, cycle-time tracking |

**Общая готовность блока: 10%**

**Общая сложность: 62 SP (~4-5 спринтов)**

---

### Критические зависимости:
1. **Workspace model** (Block 1) - блокирует Story 15.2
2. **Analytics infrastructure** (Block 5) - нужна для Story 15.3
3. **Alert engine** (Block 5) - нужна для Story 15.1
4. **Investment/Deal model** - блокирует Story 15.1

### Рекомендации по приоритетам:
1. **Start with Story 15.2** (18 SP) - impact taxonomy foundational для reporting
2. **Then Story 15.3** (18 SP) - constraint testing полезна для process optimization
3. **Finally Story 15.1** (26 SP) - club-deal complex, требует investment infrastructure

### Интеграционные точки:
- **Story 15.1** интегрируется с: asset_service, notification_service, decision_service
- **Story 15.2** интегрируется с: philanthropy_service, asset_service, reporting
- **Story 15.3** интегрируется с: decision_service, analytics_service

**Риски:**
- Story 15.1 (club-deal) требует robust investment model, которого пока нет
- Story 15.2 требует координации между philanthropy и investment teams
- Story 15.3 может быть deferred to Phase 3 (research/optimization feature)

**Рекомендация:** Prioritize 15.2 (shared taxonomy) for unified impact reporting. Defer 15.1 until investment infrastructure matures. Consider 15.3 as Phase 3 optimization.
