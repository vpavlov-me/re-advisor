---
doc_id: "DOC-MVP1-SCOPE"
title: "MVP 1 Scope Reduction - Service Request Journey"
type: "planning"
category: "mvp-planning"
created: "2025-10-27"
updated: "2025-10-27"
version: "1.0.0"
status: "draft"
tags: ["mvp", "scope-reduction", "service-request", "marketplace"]
related: ["JRN-FAM-002", "EPIC-011", "EPIC-012", "EPIC-013"]
priority: "critical"
---

# MVP 1 Scope Reduction - Service Request Journey

> **Purpose**: Определить минимально необходимый функционал для запуска первой версии Marketplace с запросами услуг консультантов.

---

## 🎯 MVP 1 Philosophy

**Цель MVP 1**: Проверить базовую гипотезу "Семьи готовы находить и заказывать услуги консультантов через платформу с простым процессом бронирования и оплаты"

**Что НЕ проверяем в MVP 1**:
- Сложные многоэтапные проекты с промежуточными платежами
- Активное сотрудничество консультанта с семьёй через платформу (глубокая интеграция)
- Управление доступами в процессе работы
- Изменения в процессе выполнения услуги

---

## ✅ ВКЛЮЧИТЬ в MVP 1

### Stage 1: Discovery & Search (EPIC-011F) - УПРОЩЁННАЯ

**Оставляем:**
- Базовый список всех консультантов (карточки с фото, имя, специализация, цена от...)
- Простой поиск по имени
- Один базовый фильтр: по специализации (Governance, Succession, Philanthropy, etc.)
- Просмотр полного профиля консультанта (био, услуги, цены)

**Убираем из MVP 1:**
- ❌ Фильтры по цене
- ❌ Фильтры по availability
- ❌ Рейтинги и отзывы
- ❌ Верификационные бейджи
- ❌ Сравнение консультантов
- ❌ Избранные консультанты
- ❌ Рекомендации "похожие консультанты"
- ❌ Сортировка результатов

**Обоснование**: В MVP будет 3-5 консультантов, базового списка достаточно.

---

### Stage 2: Initial Engagement - ТОЛЬКО ПРЯМОЕ БРОНИРОВАНИЕ

**Оставляем:**
- Только **Direct Booking** (прямое бронирование фиксированных услуг)
- Выбор услуги из каталога консультанта
- Просмотр описания услуги, цены, deliverables
- Кнопка "Book This Service"
- Базовая форма бронирования:
  - Поле "Additional Notes" (опционально)
  - Подтверждение доступа (просто галочка "I understand consultant will access [modules]")
  - Кнопка "Confirm Booking"

**Убираем из MVP 1:**
- ❌ Чат с консультантом перед бронированием
- ❌ "Message Consultant" кнопка из профиля
- ❌ Весь Proposal workflow (Stage 3)
- ❌ Выбор дат из календаря консультанта (пусть пишут в Notes желаемые даты)
- ❌ Проверка availability в реальном времени
- ❌ Автоматическая генерация чата с деталями бронирования

**Обоснование**: Path B (Chat Inquiry First) + Stage 3 (Proposal & Negotiation) - это сложный workflow. В MVP только быстрое бронирование стандартных услуг.

---

### Stage 4: Access Configuration - УПРОЩЁННАЯ

**Оставляем:**
- Консультант при создании услуги указывает, какие модули ему нужны
- При бронировании семья видит: "Consultant will get VIEW access to: [Constitution, Meetings]"
- Семья просто принимает это (галочка "I agree")
- Автоматическое создание доступа после оплаты

**Убираем из MVP 1:**
- ❌ Возможность семьи менять уровни доступа (View vs. Modify)
- ❌ Возможность семьи выбирать модули (только те, что запросил консультант)
- ❌ Предоставление доступа ДО принятия proposal
- ❌ Детальный экран конфигурации доступа
- ❌ Warnings о последствиях доступа

**Обоснование**: В MVP все услуги = View only access к минимальным модулям. Упрощаем до "согласны/не согласны".

---

### Stage 5: Payment Processing - УПРОЩЁННАЯ

**Оставляем:**
- Только **100% postpayment** (полная оплата ПОСЛЕ завершения работы)
- Stripe Checkout для оплаты
- Бронирование → консультант сразу начинает работу (без предоплаты)
- Завершение работы → генерация инвойса → семья оплачивает

**Убираем из MVP 1:**
- ❌ Частичная предоплата (0-100%)
- ❌ Prepayment (оплата до начала работы)
- ❌ Milestone payments (промежуточные платежи)
- ❌ Grace period (3 дня на оплату)
- ❌ Напоминания об оплате
- ❌ Блокировка начала работы до оплаты

**Обоснование**:
- Доверительная модель = "работа выполнена → оплата". Проще для семей (меньше upfront commitment).
- Консультанты мотивированы качественно завершить работу для получения оплаты.
- Риск неоплаты минимален т.к. работаем только с платформенными семьями (known entities).
- Stripe защищает консультантов через dispute process при необходимости.

---

### Stage 6: Service Delivery - МИНИМАЛЬНАЯ

**Оставляем:**
- Консультант получает VIEW доступ к указанным модулям
- Семья может видеть, что консультант залогинен (последний визит)
- Консультант может загрузить deliverables (внешние ссылки на файлы)

**Убираем из MVP 1:**
- ❌ Чат во время работы (коммуникация через email)
- ❌ Edit access для консультанта (только View)
- ❌ Загрузка файлов в платформу (только внешние ссылки SharePoint/Drive)
- ❌ Audit log для семьи (детальный лог действий консультанта)
- ❌ Tracking времени и прогресса консультантом
- ❌ Service amendments (изменения scope в процессе)
- ❌ Возможность семьи менять доступ в процессе работы
- ❌ Sharing external resources via links в чате

**Обоснование**: Консультант работает "вне платформы", просматривает данные семьи, готовит deliverables. В MVP нет глубокой интеграции работы в платформу.

---

### Stage 7: Service Completion - УПРОЩЁННАЯ

**Оставляем:**
- Консультант нажимает "Mark as Complete"
- Консультант добавляет ссылки на финальные deliverables
- Семья получает уведомление
- Семья просматривает deliverables
- Семья нажимает "Confirm Completion"
- Доступ консультанта **полностью удаляется** (не view-only, а полное удаление)

**Оставляем также:**
- **Генерация инвойса** после "Confirm Completion"
- **Оплата через Stripe** (редирект на Stripe Checkout)
- **Финализация Service Request** только после успешной оплаты

**Убираем из MVP 1:**
- ❌ Completion summary от консультанта
- ❌ Feedback форма от семьи (рейтинг, комментарии)
- ❌ Downgrade to view-only (просто удаляем доступ)
- ❌ Frozen snapshot работы консультанта
- ❌ Auto-completion после 30 дней
- ❌ Grace period для оплаты (оплата должна быть immediate)
- ❌ Возможность закрыть Service Request без оплаты

**Обоснование**: Простой flow: "работа закончена → deliverables отправлены → семья подтвердила → оплатила → доступ удалён". Нет review/rating системы в MVP.

---

### Stage 8: Post-Engagement - УБРАТЬ ПОЛНОСТЬЮ

**Убираем из MVP 1:**
- ❌ Продление доступа после завершения
- ❌ View-only access к прошлым работам
- ❌ Быстрое переоформление с тем же консультантом
- ❌ Предложение новых услуг через чат
- ❌ Сохранение чата для будущих коммуникаций

**Обоснование**: В MVP после завершения = полный разрыв связи. Если нужен тот же консультант = новое бронирование с нуля.

---

## ❌ ПОЛНОСТЬЮ УБРАТЬ из MVP 1

### EPIC-012: Service Proposal Review (вся Stage 3)
- Proposals от консультантов
- Negotiation через chat
- Custom pricing
- Acceptance/decline workflow
- Proposal expiration

**Замена в MVP 1**: Только прямое бронирование фиксированных услуг из каталога.

---

### EPIC-014: Chat Interface (для обоих сторон)
- ~~Весь чат-функционал~~ ✅ **ДОБАВЛЕНО в MVP1** через EPIC-011-V2
- ~~Messaging между семьёй и консультантом~~ ✅ **ДОБАВЛЕНО в MVP1**
- File sharing в чате ❌ (будет в MVP2)
- Proposal cards в чате ❌ (будет в MVP2)

**Реализация в MVP 1**:
- ✅ Service Request contextual chat (EPIC-011-V2)
- ✅ Автоматическое создание чата при бронировании
- ✅ In-platform коммуникация между Family Admin и Consultant
- ✅ Чат доступен на всех этапах Service Request
- ❌ File attachments (используются external links)

---

### EPIC-015: Access Configuration (детальная)
- Granular permission settings
- Module selection
- View vs. Modify permissions
- Access expiration dates
- Pre-booking access grants
- Warnings и confirmation flows

**Замена в MVP 1**: Фиксированный View access к модулям, указанным в описании услуги. Автоматически.

---

### EPIC-016: Service Monitoring (детальная)
- Progress tracking
- Milestone management
- Time tracking
- Detailed activity feed
- Collaborative features

**Замена в MVP 1**: Простой статус "In Progress" → "Delivered" → "Completed". Без детализации.

---

### EPIC-017: Service Amendments
- Scope changes
- Pricing adjustments
- Timeline modifications
- Amendment proposals

**Замена в MVP 1**: НЕТ. Scope зафиксирован при бронировании. Если нужны изменения = email переписка.

---

### EPIC-018: Advanced Completion Features
- Quality ratings
- Review system
- Feedback collection
- Performance metrics

**Замена в MVP 1**: Просто "Confirm Completion" без фидбека.

---

### EPIC-019: Post-Service Access Management
- View-only access после completion
- Access extension
- Selective module access

**Замена в MVP 1**: Полное удаление доступа после completion.

---

### EPIC-020: Audit Log Viewing & Export
- Detailed audit logs
- Export функционал
- Compliance reports

**Замена в MVP 1**: НЕТ. Возможно, простой лог для админов (не для семей).

---

## 🚀 MVP 1 Final Scope Summary

### User Journey (Simplified)

```
1. DISCOVERY
   - Admin открывает Marketplace
   - Видит список 3-5 консультантов
   - Фильтр по специализации
   - Клик на консультанта → профиль

2. DIRECT BOOKING (Family Side)
   - Выбор услуги из каталога
   - Клик "Book This Service"
   - Форма: дополнительные заметки (optional)
   - Подтверждение доступа: "I agree consultant will view [modules]"
   - Клик "Confirm Booking"
   - **Статус: "Pending Consultant Confirmation"**

3. CONSULTANT REVIEW & CONFIRMATION
   - Email консультанту: "New service request from Family [Name] - Please review and confirm"
   - Email содержит контакты семьи для связи
   - Консультант может связаться с семьёй по email для уточнений
   - Консультант логинится в свой портал
   - Видит Service Request с деталями:
     - Услуга, которую заказали
     - Семья (контакты видны)
     - Заметки от семьи (если есть)
     - Модули для доступа
     - Цена исходной услуги
   - Консультант может:
     - **Accept as is** → подтверждает изначальную услугу без изменений
     - **Accept with additional services** → добавляет дополнительные услуги из своего каталога:
       - Выбирает дополнительные услуги (multiple select)
       - Видит обновлённую общую цену
       - Может добавить комментарий, объясняющий зачем нужны доп. услуги
       - Может уточнить сроки выполнения
     - **Decline Request** → с причиной отказа
   - Если Accept (с или без доп. услуг): **Статус: "Awaiting Family Final Approval"**

4. FAMILY FINAL APPROVAL
   - Email семье: "Consultant [Name] confirmed your request - Please review final details"
   - Семья видит финальные детали от консультанта:
     - **Исходная услуга** (та, что заказали)
     - **Дополнительные услуги** (если консультант добавил):
       - Список доп. услуг с описаниями
       - Комментарий консультанта (зачем нужны)
       - Цена каждой доп. услуги
     - **Общая цена** (исходная + доп. услуги)
     - Подтверждённые сроки
     - Финальный scope (все услуги вместе)
     - Модули для доступа (могут быть расширены если доп. услуги требуют больше модулей)
   - Семья может:
     - **Approve as is** → "Start Service" со всеми услугами
     - **Decline entirely** → отказаться от всего запроса
     - **Contact consultant** → написать email для обсуждения (потом вернуться к approval)
   - После "Start Service": **Статус: "In Progress"**

5. AUTOMATIC ACCESS PROVISIONING
   - ACCESS предоставляется только после финального approval семьёй
   - Консультант получает VIEW access к указанным модулям
   - Email консультанту: "Service started - You now have access to Family [Name] portal"
   - Email семье: "Service in progress - Consultant [Name] now has access"

6. SERVICE DELIVERY (вне платформы)
   - Консультант логинится в Family Portal
   - Просматривает нужные данные (VIEW only)
   - Готовит deliverables вне платформы (Google Docs, etc.)
   - Коммуникация с семьёй через email (не через платформу)

7. COMPLETION & PAYMENT
   - Консультант: "Mark as Complete" + добавляет ссылки на deliverables
   - Email семье: "Service completed, please review and pay"
   - Семья: открывает Service Request → просматривает ссылки
   - Семья: "Confirm Completion" → Редирект на Stripe Checkout
   - Семья: оплачивает 100% стоимости услуги
   - После успешной оплаты: доступ консультанта полностью удаляется
   - Email консультанту: "Payment received, service closed"

8. END
   - Service Request закрыт (статус: "Completed & Paid")
   - Появляется в истории с деталями
   - Если нужен снова тот же консультант = новое бронирование
```

### Status Flow (MVP 1):
```
Pending Consultant Confirmation
    ↓ (Consultant accepts - может добавить доп. услуги)
Awaiting Family Final Approval
    ↓ (Family approves всё as is OR declines всё)
In Progress (ACCESS предоставлен)
    ↓ (Consultant marks complete)
Delivered
    ↓ (Family confirms & pays)
Completed & Paid (ACCESS удалён)
```

**Alternative flows:**
- Consultant declines → Status: "Declined by Consultant" (семья видит причину)
- Family doesn't approve after consultant confirmation → Status: "Cancelled by Family"
- Consultant accepts with additional services → Family must approve all or decline all (can contact consultant to negotiate via email)

---

## 📊 EPICs Complexity Reduction

| EPIC | Original Complexity | MVP 1 Complexity | Reduction |
|------|---------------------|------------------|-----------|
| EPIC-011F (Discovery) | 13 SP | 5 SP | 62% |
| EPIC-012F (Proposals) | ❌ OUT OF SCOPE | 0 SP | 100% |
| EPIC-013F (Service Tracking) | 21 SP | 8 SP | 62% |
| EPIC-014F (Chat) | ❌ OUT OF SCOPE | 0 SP | 100% |
| EPIC-015F (Access Config) | 13 SP | 3 SP | 77% |
| EPIC-016F (Monitoring) | ❌ OUT OF SCOPE | 0 SP | 100% |
| EPIC-017F (Amendments) | ❌ OUT OF SCOPE | 0 SP | 100% |
| EPIC-018F (Completion) | 8 SP | 3 SP | 63% |
| EPIC-019F (Post-Service) | ❌ OUT OF SCOPE | 0 SP | 100% |
| EPIC-020F (Audit) | ❌ OUT OF SCOPE | 0 SP | 100% |
| **TOTAL** | **~100 SP** | **19 SP** | **81%** |

---

## 🎯 What We Learn from MVP 1

**Success Metrics для MVP 1:**

1. **Conversion Rate**: % семей, которые завершили бронирование после просмотра консультантов
2. **Payment Success Rate**: % успешных оплат через Stripe
3. **Service Completion Rate**: % услуг, доведённых до Completion
4. **Time to Booking**: Среднее время от входа в Marketplace до Confirm Booking
5. **Re-booking Rate**: % семей, заказавших услугу повторно (у того же или другого консультанта)

**Hypotheses to Validate:**
- ✅ Консультанты готовы работать на постоплате с платформенными семьями (доверие к платформе)
- ✅ Семьи предпочитают постоплату (платят только за выполненную работу)
- ✅ Простое описание услуги в каталоге достаточно для принятия решения (без чата)
- ✅ VIEW access к модулям семьи достаточен для консультантов (без Edit)
- ✅ Deliverables через внешние ссылки приемлемы (без интеграции в платформу)
- ✅ Email-коммуникация достаточна (без встроенного чата)

**What to Build Next (based on MVP 1 feedback):**
- Если "Time to Booking" высокое → добавить чат для вопросов (EPIC-014)
- Если низкий "Service Completion Rate" → добавить progress tracking (EPIC-016)
- Если много отмен/рефандов → добавить Proposal workflow (EPIC-012)
- Если консультанты жалуются на ограничения VIEW → добавить Edit permissions (EPIC-015)
- Если семьи просят продлить доступ → добавить Post-Service Access (EPIC-019)

---

## 📖 High Level User Stories (MVP 1)

User stories организованы в порядке выполнения процесса (Family → Consultant → Family → ...):

### 1️⃣ Marketplace Discovery (Family)

**US-MVP1-001: Browse Consultant Marketplace**
- **As a** Family Admin or Council Member
- **I want to** browse a list of available consultants with basic filtering by expertise
- **So that** I can discover consultants who match my family's governance needs

**US-MVP1-002: View Consultant Profile & Services**
- **As a** Family Admin or Council Member
- **I want to** view a consultant's detailed profile including their service catalog, pricing, and credentials
- **So that** I can evaluate if they're suitable for our needs and understand what services they offer

---

### 2️⃣ Service Booking (Family)

**US-MVP1-003: Book Service from Catalog**
- **As a** Family Admin or Council Member
- **I want to** select a specific service from a consultant's catalog and submit a booking request with optional notes
- **So that** I can initiate an engagement with clear service expectations

**US-MVP1-004: Understand Module Access Requirements**
- **As a** Family Admin
- **I want to** see which family modules the consultant will access before confirming my booking
- **So that** I can make an informed decision about data access

---

### 3️⃣ Request Review (Consultant)

**US-MVP1-005: Review Incoming Service Request**
- **As a** Consultant
- **I want to** receive notification of new service requests with family contact information and request details
- **So that** I can review whether the project is suitable for me and contact the family if needed

**US-MVP1-006: Accept Request As-Is**
- **As a** Consultant
- **I want to** accept a service request without modifications
- **So that** the family can proceed to final approval and we can begin work

**US-MVP1-007: Add Additional Services to Request**
- **As a** Consultant
- **I want to** add additional services from my catalog with an explanation when accepting a request
- **So that** I can propose a more comprehensive scope based on the family's needs

**US-MVP1-008: Decline Unsuitable Request**
- **As a** Consultant
- **I want to** decline a service request with a reason
- **So that** I can avoid projects that don't fit my expertise or availability

---

### 4️⃣ Final Approval (Family)

**US-MVP1-009: Review Consultant's Confirmation**
- **As a** Family Admin
- **I want to** see the final service details after consultant confirmation, including any additional services they added
- **So that** I can review the complete scope and pricing before work begins

**US-MVP1-010: Approve Service to Start**
- **As a** Family Admin
- **I want to** give final approval to start the service (accepting all services as proposed)
- **So that** the consultant receives access and can begin work

**US-MVP1-011: Decline Service Proposal**
- **As a** Family Admin
- **I want to** decline the entire service proposal if the scope or price doesn't match my needs
- **So that** I can avoid commitments I'm not comfortable with

---

### 5️⃣ Service Delivery (Consultant)

**US-MVP1-012: Access Family Portal**
- **As a** Consultant
- **I want to** access approved family modules in view-only mode after family approval
- **So that** I can review the necessary information to deliver my service

**US-MVP1-013: Upload Deliverable Links**
- **As a** Consultant
- **I want to** add external links to deliverables as I complete work
- **So that** the family can access my work outputs

**US-MVP1-014: Mark Service Complete**
- **As a** Consultant
- **I want to** mark the service as complete with final deliverable links
- **So that** the family knows work is done and can review results

---

### 6️⃣ Service Monitoring (Family)

**US-MVP1-015: Track Service Progress**
- **As a** Family Admin or Council Member
- **I want to** view the status of active service requests
- **So that** I can monitor consultant progress and know when work is completed

**US-MVP1-016: View Service History**
- **As a** Family Admin
- **I want to** see a history of all past service requests with details
- **So that** I can reference previous consultant work and track spending

---

### 7️⃣ Completion & Payment (Family)

**US-MVP1-017: Review Completed Work**
- **As a** Family Admin
- **I want to** access all deliverables the consultant provided
- **So that** I can verify the work meets our expectations before payment

**US-MVP1-018: Confirm Completion & Pay**
- **As a** Family Admin
- **I want to** confirm service completion and pay 100% via Stripe in one step
- **So that** I can close out the engagement and compensate the consultant

---

### 8️⃣ Post-Completion (Consultant)

**US-MVP1-019: Receive Payment Confirmation**
- **As a** Consultant
- **I want to** receive notification when payment is received and service is fully closed
- **So that** I know I've been compensated and the engagement is complete

**US-MVP1-020: View Service Request History**
- **As a** Consultant
- **I want to** see a history of all my completed service requests
- **So that** I can track my work with different families and reference past projects

---

### 🚫 Edge Case Stories (System Automation)

**US-MVP1-021: Auto-Decline Unresponsive Consultant**
- **As a** Family Admin
- **I want** the system to automatically decline my request if the consultant doesn't respond within 48 hours
- **So that** I'm not left waiting and can book another consultant

**US-MVP1-022: Auto-Cancel Unapproved Request**
- **As a** Consultant
- **I want** the system to automatically cancel the request if the family doesn't approve within 7 days of my confirmation
- **So that** I'm not holding availability for an uncertain engagement

---

## 🛠️ Technical Implementation Notes

### MVP 1 Database Schema (минимум)

**consultants** (из EPIC-011A - уже есть)
- id, name, bio, expertise, verification_status

**consultant_services** (каталог услуг)
- id, consultant_id, title, description, price, **required_modules** (JSON: ["constitution", "meetings"]), deliverables, status

**service_requests**
- id, family_id, consultant_id, **original_service_id**, status, **additional_notes**, **total_amount**, stripe_payment_intent_id,
- booked_at, **consultant_confirmed_at**, **family_approved_at**, started_at, completed_at, paid_at
- **decline_reason** (if declined by consultant)
- **consultant_comment** (explanation for additional services)

**service_request_items** (услуги в составе Service Request)
- id, service_request_id, service_id (from consultant_services), **is_original** (boolean), **added_by** ('family' | 'consultant'),
- price_at_booking

**service_deliverables**
- id, service_request_id, **title**, **external_link**, uploaded_at

**family_advisor_associations** (доступы)
- id, family_id, consultant_id, service_request_id, **permission_level** (всегда "view" в MVP1), **modules** (JSON), status, granted_at, revoked_at

### MVP 1 Notifications (минимум)

**Email только:**
- Консультанту: "New service request from Family [Name] - Please review and confirm. Family contacts: [email/phone]" (при бронировании)
- Семье: "Booking sent to Consultant [Name] - They will review and respond within 48 hours. Consultant contacts: [email/phone]" (при бронировании)
- Семье: "Consultant [Name] accepted your request - Please review final details and approve to start" (при Accept от консультанта)
  - Если добавлены услуги: "Consultant added [N] additional services - Total price: $[amount]. Contact consultant if changes needed."
- Консультанту: "Family [Name] approved - Service started, you now have portal access" (при Family Approval)
- Семье: "Service in progress - Consultant [Name] now has access to your portal" (при Family Approval)
- Семье: "Service completed by consultant - Please review and pay" (при Complete от консультанта)
- Консультанту: "Payment received from Family [Name] - Service closed, access revoked" (после оплаты)
- Семье: "Consultant declined your request - [Reason]" (если Decline)

**НЕТ в MVP 1:**
- In-app notifications
- Push notifications
- Email reminders (payment, deadlines)

---

## ✅ MVP 1 Definition of Done

### Family User Can:
- [x] Browse consultant marketplace (list + profile)
- [x] Filter consultants by expertise
- [x] View consultant's service catalog
- [x] Book a fixed-price service (work starts immediately, no prepayment)
- [x] View booked service status
- [x] Access deliverables (external links)
- [x] Confirm service completion and pay 100% via Stripe postpayment

### Consultant Can:
- [x] View service requests assigned to them
- [x] Access family portal (VIEW only) for modules specified in service
- [x] Add deliverable links to service request
- [x] Mark service as complete

### System Does:
- [x] Create Service Request on booking (status: "Pending Consultant Confirmation")
- [x] Send notification to consultant for review
- [x] Allow consultant to accept/decline request
- [x] Send notification to family when consultant accepts
- [x] Provision VIEW access automatically ONLY after family final approval
- [x] Generate Stripe payment link AFTER family confirms completion
- [x] Send email notifications at key events
- [x] Revoke access automatically after successful payment
- [x] Store service history

### System Does NOT (Future):
- [ ] Chat between family and consultant
- [ ] Proposal workflow
- [ ] Partial payments / milestones
- [ ] Edit permissions for consultants
- [ ] Progress tracking / milestones
- [ ] Service amendments
- [ ] Ratings & reviews
- [ ] Post-service access extension
- [ ] Detailed audit logs for families

---

## 🚨 Risks & Mitigations (MVP 1)

| Risk | Mitigation |
|------|------------|
| **Consultants won't work without chat** | Provide email contacts immediately after booking |
| **Consultants concerned about postpayment (non-payment risk)** | Start with vetted families only; Stripe dispute protection; consultant can decline requests; platform escrow in future |
| **Families delay payment after completion** | Immediate payment redirect after "Confirm Completion"; access not revoked until payment (consultant keeps view access as leverage) |
| **Consultant accepts but family never approves** | Auto-cancel after 7 days if no family approval; consultant notified |
| **Family books, consultant never responds** | Auto-decline after 48 hours if no consultant action; family notified, can book another consultant |
| **Consultant adds too many services, price too high** | Family must contact consultant via email to negotiate; can decline and rebook or accept as is |
| **Consultant adds services family doesn't need** | Family contacts consultant via email to discuss; consultant can revise and re-accept with adjusted services |
| **Price changes significantly with additional services** | Email clearly shows original price vs. new total; family must approve all or decline all; can contact consultant to negotiate |
| **VIEW-only access insufficient** | Select services that only require data review, not editing |
| **Deliverables via external links feel clunky** | Clear instructions + examples of proper link sharing |
| **No proposal = loss of custom projects** | MVP targets only standardized services, custom projects in Phase 2 |
| **Payment disputes without milestone tracking** | Clear service descriptions + completion confirmation required; postpayment protects family from non-delivery |

---

## 📅 Suggested MVP 1 Implementation Plan

### Sprint 1: Marketplace Discovery (2 weeks)
- Consultant list page
- Consultant profile page
- Service catalog view
- Basic filter by expertise

### Sprint 2: Direct Booking + Confirmation Flow (2 weeks)
- Family booking form
- Service Request creation (status: Pending)
- Consultant review & accept/decline interface
- Family final approval interface
- Email notifications for confirmation workflow

### Sprint 3: Access Provisioning + Service Delivery (2 weeks)
- Auto-provision VIEW access after family approval
- Consultant portal access to family data (VIEW only)
- Deliverable links management
- Completion workflow (Mark Complete → Confirm Completion → Payment)
- Stripe Checkout integration for postpayment
- Access revocation after payment

### Sprint 4: Testing & Launch (1 week)
- End-to-end testing with 1-2 pilot families
- Bug fixes
- Soft launch with limited consultants

**Total: 7 weeks** (vs. 20-30 weeks for full scope)

---

## 🎓 Key Takeaways

**What makes MVP 1 minimal:**
1. **One path only**: Direct Booking (no Proposals)
2. **Fixed pricing**: No negotiation, custom quotes, or discounts
3. **100% postpayment**: Trust-based model, pay after delivery
4. **VIEW-only access**: No editing, no collaboration
5. **Email communication**: No built-in chat
6. **External deliverables**: No file storage in platform
7. **Simple completion**: No ratings, feedback, or reviews
8. **Full access revocation**: No post-service access (after payment)

**Why this is enough for MVP:**
- Validates core value proposition: "Find consultant → Book service → Pay → Get result"
- Demonstrates marketplace concept works
- Tests payment integration end-to-end
- Tests access control system basics
- Low development cost (7 weeks vs. 30 weeks)
- Fast time-to-market for learning

**What we sacrifice (acceptable for MVP):**
- Complex projects requiring negotiation → Phase 2
- Deep consultant-family collaboration → Phase 2
- Ongoing relationships post-service → Phase 2
- Rich communication tools → Phase 2
- Advanced permission management → Phase 2

---

**Document Version:** 1.0.0
**Last Updated:** 2025-10-27
**Status:** Draft - Awaiting Stakeholder Review
