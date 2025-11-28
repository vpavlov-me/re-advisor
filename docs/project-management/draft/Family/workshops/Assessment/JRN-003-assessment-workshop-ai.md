---
doc_id: "DOC-JRN-005"
title: "Assessment Workshop с AI"
type: "user-journey"
category: "planning"
audience: "product-manager|business-analyst|stakeholder"
complexity: "intermediate"
created: "2025-10-18"
updated: "2025-10-18"
version: "1.0.0"
status: "draft"
tags: ["user-journey", "planning", "family-governance", "assessment", "ai-workshop", "collaborative", "constitution-setup"]
related: ["DOC-USR-001", "DOC-USR-002", "DOC-JRN-004", "DOC-SYS-001"]
owner: ""
maintainer: ""
reviewer: ""
priority: "high"
business_value: "Предоставляет семьям доступный AI-guided Assessment Workshop без необходимости найма внешнего консультанта, ускоряя процесс создания конституции"
user_impact: "Обеспечивает структурированную коллаборативную оценку семьи с AI-фасилитацией, персонализированными рекомендациями и автоматической генерацией отчета"
review_cycle: "quarterly"
next_review: "2026-01-18"
---

# JRN-005: Assessment Workshop с AI

> **Template Purpose**: Этот шаблон для планирования user journey ДО реализации. Фокус на бизнес-логике, пользовательском опыте и концептуальных требованиях без технических деталей реализации.

## 📋 Контекст

### Цель
Предоставить Консулу возможность организовать и провести коллаборативный AI-guided Assessment Workshop для всей семьи, где AI фасилитирует оценку по 12 измерениям governance, предоставляет персонализированные рекомендации на основе семейного контекста и автоматически генерирует comprehensive отчет для дальнейшей работы над конституцией.

**Бизнес-цели:**
- Предоставить доступную альтернативу дорогостоящему workshop с внешним консультантом ($500-1500 экономии)
- Обеспечить структурированную коллаборативную оценку семьи по всем 12 ключевым измерениям governance
- Генерировать персонализированные AI-рекомендации на основе уникального контекста каждой семьи
- Создать comprehensive assessment отчет автоматически без ручной обработки консультантом
- Ускорить процесс создания конституции через guided collaborative experience
- Достичь >40% adoption rate AI workshop method vs другие методы оценки

**Ценность для пользователя:**
- Экономия $500-1500 на услугах внешнего консультанта при сохранении качественной оценки
- Гибкое планирование - семья выбирает удобное время без зависимости от доступности консультанта
- Коллаборативный процесс где все члены семьи участвуют синхронно и слышат perspective друг друга
- Персонализированные AI-рекомендации основанные на специфическом семейном контексте
- Возможность консультаций с AI по ходу workshop для немедленных clarifications и guidance
- Автоматическая генерация comprehensive отчета сразу после завершения без ожидания (vs 2-3 дня для consultant)
- Демократичное планирование через voting mechanism - все голоса учитываются
- Reduced burden на Консула - AI handles facilitation, Консул может actively participate vs координировать

### Основные персоны
- **Консул (DOC-USR-002)** - Лидер семейного governance, инициатор и главный координатор workshop. Имеет повышенные разрешения для управления встречами, планирования workshop, утверждения результатов. Pain points: координация расписания множественных членов семьи в разных часовых поясах, обеспечение активного участия всех членов, балансирование между лидерством и избеганием микроменеджмента, трудоемкая подготовка материалов встреч.

- **Члены семьи (DOC-USR-001)** - Активные участники workshop с стандартными разрешениями. Фокусируются на понимании процесса, предоставлении честного input, участии в collaborative exercises. Pain points: информационная перегрузка из множественных каналов, сложность понимания когда требуется их активное участие vs когда просто информирование, неясность приоритетов и следующих шагов, пропущенные важные объявления.

*Примечание: External Advisor НЕ участвует в этом journey, так как это AI-guided workshop без человека-консультанта*

### Триггер(ы)
Что инициирует это путешествие:
- Консул достигает Шага 4 (Оценка) в визарде настройки конституции
- Консул выбирает "Workshop с AI" как метод завершения оценки (вместо Advisor Workshop / AI Auto-fill / Manual Fill)
- Семья решает что хочет коллаборативный guided процесс но без затрат на внешнего консультанта
- Консул осознает необходимость структурированного процесса оценки с участием всех членов семьи

### Критерии успеха / KPI
Как мы измеряем успех этого путешествия (бизнес-метрики, НЕ технические метрики):

**Метрики пользовательского опыта:**
- Процент завершения планирования workshop после выбора AI метода > 80%
- Процент family attendance для запланированных AI workshops > 80% (соответствует meeting attendance target из персоны Council)
- Процент завершения всех 12 blocks workshop > 85%
- Среднее время для завершения workshop < 3 часа (соответствует заявленной длительности 2-3 часа)
- Процент использования "Ask AI" consultation feature > 50% участников
- Удовлетворенность членов семьи AI workshop experience > 4.0/5
- Процент утверждения результатов assessment в течение 7 дней > 80%

**Метрики бизнес-влияния:**
- Экономия семьи vs workshop с консультантом: $500-1500 per family
- Adoption rate AI workshop vs другие методы оценки > 40%
- Удержание семей после AI workshop (продолжение к Шагу 5) > 85%
- Процент создания tasks из AI-generated action plan > 70%
- Среднее время от выбора AI метода до completed assessment < 14 дней
- Процент семей reporting improved clarity после workshop > 75%
- AI recommendation relevance rating > 4.2/5

**Примеры ХОРОШИХ KPI (бизнес-фокус):**
- ✅ "Процент завершения workshop > 85% в течение выбранной 3-hour session"
- ✅ "Adoption rate AI workshop > 40% от всех семей completing Step 4"
- ✅ "AI recommendation relevance rating > 4.2/5 по feedback семей"

**Примеры ПЛОХИХ KPI (слишком технические):**
- ❌ "AI response time < 3 секунд"
- ❌ "Real-time sync latency < 200ms"
- ❌ "Database query performance < 100ms"

### Предварительные условия / Допущения

**Состояние пользователя:**
- Пользователь должен быть авторизован с ролью Консула или Администратора
- Пользователь должен находиться в процессе настройки конституции на Шаге 4 (Оценка)
- Семейный профиль должен включать базовую информацию (размер семьи, минимум 2 члена)
- Минимум 2 члена семьи должны подтвердить готовность участвовать в collaborative workshop

**Состояние данных:**
- AI Workshop должен быть включен в подписку семьи (included feature, not paid add-on)
- Workshop program структура должна быть доступна (12 blocks assessment framework)
- Дидактические материалы для каждого block должны быть подготовлены (Why Matters, Key Dimensions, Best Practice Examples)
- AI consultation service должен быть операционным для предоставления персонализированных рекомендаций

**Возможности системы:**
- Система должна поддерживать collaborative real-time workshop environment для множественных участников (до 10)
- Система должна предоставлять voting/scheduling mechanism для координации времени workshop
- Должна быть доступна возможность live collaboration где все участники видят прогресс друг друга
- AI consultation service должен генерировать персонализированные рекомендации на основе family context
- Система должна автоматически генерировать comprehensive assessment отчет после завершения workshop
- Должна работать служба email/notifications для напоминаний о запланированном workshop
- Система должна auto-save workshop progress каждые 30 секунд предотвращая data loss

## 🗺️ Карта стадий

### Стадия 1: Выбор метода Assessment Workshop
**Цель**: Консул выбирает AI-guided collaborative workshop как метод завершения оценки семьи

**Действия пользователя:**

**Консул:**
- Просматривает 4 доступных метода оценки на экране выбора
- Сравнивает "Workshop с Advisor" ($500-1500, 2-3 часа, профессиональный guidance, external facilitation)
- Сравнивает "Workshop с AI" (included в подписке, 2-3 часа, AI-guided collaborative, no consultant needed)
- Сравнивает "AI автозаполнение" (бесплатно, 15 минут, fully automated, no collaboration)
- Сравнивает "Ручное заполнение" (бесплатно, 60 минут, self-service, individual work)
- Оценивает что семье нужен collaborative structured процесс но без затрат на консультанта
- Выбирает "Workshop с AI" option кликом на карточку
- Кликает "Continue to Workshop Setup" для перехода к планированию

**Ответы системы:**
- Система отображает 4 метода assessment в grid layout с четким визуальным сравнением
- Система показывает для каждого метода: иконку, название, краткое описание, стоимость, длительность, key benefits
- Система выделяет "Workshop с AI" как recommended option для семей seeking collaboration без consultant costs
- Система показывает benefits AI workshop:
  - "Included в вашей подписке - $0 дополнительных затрат"
  - "Flexible scheduling - выбирайте удобное время для семьи"
  - "Collaborative experience - все члены работают вместе"
  - "AI-guided exercises с персонализированными рекомендациями"
  - "Instant comprehensive report после завершения"
- Система объясняет что workshop будет collaborative live session где все члены семьи работают вместе с AI facilitation
- Система сохраняет выбор метода в прогрессе настройки конституции семьи
- Система переводит пользователя к экрану Workshop Setup & Scheduling

**User Expectations:**
- Консул ожидает увидеть четкое сравнение всех методов для informed decision
- Консул ожидает понимать cost difference и time commitment для каждого метода
- Консул ожидает увидеть что AI workshop является viable альтернативой consultant workshop
- Консул ожидает легкий переход к следующему шагу после выбора

**Ответственные роли:**
- **Консул**: Оценивает опции, принимает решение о выборе AI workshop method (ключевая задача координации семейных инициатив из персоны)

**Pain Points:**
- Консул может быть uncertain если AI workshop предоставит достаточное quality guidance vs consultant
- Консул может worrying о technical complexity collaborative platform
- Консул может be concerned о family members' comfort level с AI facilitation

---

### Стадия 2: Планирование Workshop и Voting на дату/время
**Цель**: Координировать scheduling workshop удобного для всех членов семьи через democratic voting process

**Действия пользователя:**

**Консул:**
- Просматривает Workshop Program структуру: 12 blocks перечисленных с названиями
- Видит workshop details: длительность 2-3 часа, все члены семьи participants, live & synchronous режим
- Просматривает календарь для выбора потенциальной даты workshop
- Выбирает дату кликом на календаре (например, Sunday, December 15, 2025)
- Просматривает 4 предложенных стандартных time slots: Morning (9AM), Late Morning (11AM), Afternoon (2PM), Evening (6PM)
- Выбирает 2-3 preferred time slots для голосования кликом на checkboxes (например, Morning, Afternoon, Evening)
- Кликает "Send Invitations & Voting Link" для отправки voting всем членам семьи
- Получает confirmation screen что invitations отправлены всем 4 членам семьи
- Просматривает real-time voting dashboard показывающий кто voted и current results

**Члены семьи:**
- Получают email notification с subject "Family Assessment Workshop - Vote for Time"
- Открывают voting link из email или platform notification
- Просматривают workshop invitation с деталями: дата, 3 предложенных time slots, workshop overview
- Читают краткое описание что такое AI Assessment Workshop
- Голосуют за preferred time slots кликая на кнопки (могут выбрать multiple options)
- Видят confirmation message "Your vote has been recorded"
- Видят real-time voting results обновляющиеся: "2 of 4 members voted"
- Видят визуальные индикаторы (avatars) какие другие члены семьи уже проголосовали

**Ответы системы:**
- Система отображает Workshop Program структуру с expandable section showing все 12 blocks:
  1. Communication Patterns, 2. Decision-Making Process, 3. Conflict Resolution, 4. Financial Transparency, 5. Roles & Responsibilities, 6. Trust & Accountability, 7. Succession Readiness, 8. Business Involvement, 9. Education & Development, 10. Philanthropy Alignment, 11. Wealth Philosophy, 12. Family Unity & Values
- Система показывает workshop details prominently: "2-3 hours duration", "All family members participate", "Live & synchronous"
- Система отображает календарь текущего и следующих 3 месяцев для date selection
- Система предлагает 4 standard time slots covering different preferences (morning people, evening people)
- Система валидирует что Консул выбрал минимум 2 и максимум 3 time slots перед allowing sending invitations
- Система shows validation error message если меньше 2 или больше 3 slots выбраны
- Система генерирует unique voting link для этой семьи с expiration 7 дней
- Система отправляет email invitations всем членам семьи excluding Консула (Консул уже знает)
- Система includes в email: workshop overview, selected date, time slot options, voting deadline, voting link
- Система отображает voting page где members видят workshop context и могут vote
- Система позволяет members select multiple time slots если multiple работают (не restricted to single choice)
- Система показывает live voting results dashboard для всех participants:
  - Vote count per time slot с bar chart visualization
  - Avatars членов кто уже voted под каждым time slot
  - Overall participation rate "3 of 4 members voted"
- Система подсвечивает "Most Popular" time slot с наибольшим количеством votes зеленым цветом
- Система отображает voting status dashboard для Консула:
  - List членов семьи с checkmarks для who voted
  - Pending status для who hasn't voted yet
  - "Send Reminder" button для nudging non-voters
- Система автоматически определяет winning time slot когда:
  - ВСЕ члены проголосовали, OR
  - 48 часов прошло с момента sending invitations (voting deadline)
- Система отправляет automated reminder non-voters через 24 часа если они didn't vote yet

**User Expectations:**
- Консул ожидает увидеть четкую structure workshop для understanding time commitment
- Консул ожидает легкий process выбора даты и time slots для voting
- Консул ожидает real-time visibility кто voted и current results
- Члены семьи ожидают простой voting process без complex setup
- Члены семьи ожидают видеть что выбрали другие члены для informed decision
- Все participants ожидают clear indication когда final time будет determined

**Ответственные роли:**
- **Консул**: Инициирует scheduling process, выбирает дату и time slot options, monitors voting progress, может отправлять reminders
- **Члены семьи**: Получают invitations, участвуют в democratic voting, видят family consensus forming

**Pain Points:**
- Консул может испытывать frustration если members медленно голосуют (адресуется automated reminders)
- Члены семьи могут быть confused какой time slot выбрать если несколько работают (разрешается multiple selections)
- Coordination может быть challenging если семья in different time zones (система should show times в local timezone каждого member)

---

### Стадия 3: Подтверждение Workshop и Подготовка
**Цель**: Финализировать scheduling и обеспечить готовность всех участников к collaborative workshop

**Действия пользователя:**

**Консул:**
- Получает notification "Voting Complete - Time Selected" когда все voted или deadline прошел
- Открывает voting results summary screen
- Просматривает winning time slot с vote breakdown (например, "Afternoon (2PM) - 3 votes")
- Кликает "Confirm & Schedule Workshop" button для финализации
- Получает confirmation screen с "Workshop Scheduled!" success message и checkmark icon
- Просматривает finalized workshop details card:
  - Date: "Sunday, December 15, 2025"
  - Time: "2:00 PM - 5:00 PM ET" (с timezone indicator)
  - Participants: "4 family members confirmed"
  - AI Facilitator: "Archimedes - Your Family Governance Assistant"
- Видит workshop room link для live session
- Просматривает pre-workshop preparation checklist:
  1. ✓ Review workshop structure (12 blocks) - expandable для details
  2. Prepare honest reflections - думать о communication patterns, decision-making, conflicts
  3. Ensure stable internet connection - workshop requires real-time collaboration
  4. Calendar reminder set - automated reminders за 1 день и 1 час
- Читает "What to Expect" information box объясняющий workshop flow
- Получает automated calendar invitation через email с .ICS file
- Может кликнуть "Add to Calendar" для direct calendar integration

**Члены семьи:**
- Получают email notification "Workshop Scheduled for December 15, 2PM ET"
- Открывают email containing workshop details
- Видят finalized time выбранный через voting
- Получают calendar invitation (.ICS file) для adding to personal calendar
- Просматривают workshop details: дата, время, длительность, AI facilitator info
- Читают brief explanation что workshop будет collaborative с AI facilitation
- Понимают что все 12 blocks будут пройдены вместе как семья
- Видят workshop room link (не active до day of workshop)
- Получают те же preparation instructions что и Консул
- Могут просмотреть expandable workshop structure для understanding process

**Ответы системы:**
- Система подсчитывает votes после:
  - ВСЕ members voted, OR
  - 48-hour voting deadline истек
- Система определяет winning time slot как slot с most votes
- Система handles tie scenario:
  - Если two slots have equal votes, система notifies Консул
  - Консул manually selects final time from tied options
- Система отправляет notification Консулу "Voting Complete - Ready to Confirm"
- Система displays voting results summary с vote breakdown per time slot
- Система requires explicit confirmation action from Консул перед finalizing
- После confirmation, система:
  - Saves finalized workshop schedule в семейный calendar
  - Generates unique workshop room link для live session
  - Создает calendar event с all workshop details
  - Отправляет calendar invitations (.ICS files) всем participants через email
- Система displays confirmation screen с success visualization (green checkmark, celebration animation)
- Система shows comprehensive workshop details card:
  - Date & time с proper timezone indicator (converts to each member's local time)
  - Participant count confirmed
  - AI Facilitator introduction "Archimedes - Your personal family governance assistant"
  - Workshop room link (becomes active 1 hour before start)
- Система displays pre-workshop preparation checklist с trackable items
- Система shows expandable "What to Expect" section объясняющий:
  - AI будет guide через 12 structured blocks sequentially
  - Каждый block: AI introduction, didactic materials, personal reflection, AI consultation, rating exercise
  - All family members work together в real-time virtual space
  - Progress auto-saved every 30 seconds - можно take breaks between blocks
  - Final comprehensive report generated automatically based на collaborative responses
  - Expected duration 2-3 hours depending на discussion depth
- Система generates и отправляет automated email reminders:
  - **7 дней before**: "Your AI Workshop is next week - Sunday, Dec 15 at 2PM ET. Review the 12-block structure and prepare your thoughts on family communication, decision-making, and governance."
  - **24 часа before**: "Your AI Workshop is tomorrow at 2PM ET. Ensure you have stable internet connection. Workshop room link: [link becomes active in 23 hours]"
  - **1 час before**: "Your AI Workshop starts in 1 hour. Workshop room is now open. Join here: [active workshop room link]"
- Система updates constitution setup progress status:
  - "Step 4: Assessment - AI Workshop Scheduled for Dec 15"
  - Progress indicator shows workshop upcoming
- Система sends confirmation email всем participants с:
  - Workshop details summary
  - Calendar invitation attachment
  - Preparation instructions
  - "Add to Calendar" button для direct integration
  - Workshop room link (with note активируется 1 hour before)

**User Expectations:**
- Консул ожидает увидеть clear confirmation что voting завершилось и time selected
- Консул ожидает explicit control через "Confirm" action перед finalizing
- Консул ожидает comprehensive preparation information для семьи
- Члены семьи ожидают получить clear calendar invitation для adding to personal calendars
- Члены семьи ожидают понимать что их ожидает в workshop
- Все participants ожидают automated reminders для not missing workshop

**Ответственные роли:**
- **Консул**: Confirms final scheduling, обеспечивает семья получила preparation instructions, координирует readiness
- **Члены семьи**: Получают confirmations, добавляют в calendars, готовятся к workshop, понимают expectations

**Pain Points:**
- Консул может be concerned о ensuring все members prepared (адресуется через automated reminders)
- Члены семьи могут забыть про workshop (адресуется через multi-stage reminder system)
- Technical preparation может be unclear для non-technical members (адресуется через explicit "stable internet" instruction)

---

### Стадия 4: Live Workshop - Collaborative Assessment Process
**Цель**: Провести interactive collaborative workshop где AI фасилитирует оценку через 12 blocks с real-time participation всех членов семьи

**Действия пользователя:**

**Все участники (Консул + Члены семьи):**
- Получают "Workshop Starting in 1 Hour" final reminder email
- Кликают на workshop room link из email или platform notification
- Присоединяются к workshop room за 5 минут до start time (система рекомендует early join)
- Видят workshop waiting room с countdown timer "Workshop begins in 3 minutes"
- Видят workshop header после start:
  - AI Facilitator avatar "Archimedes" с "Live Now" green indicator
  - Workshop title "Family Assessment Workshop"
  - Progress bar showing "Block 1 of 12 - Communication Patterns (8%)"
- Видят live participants panel справа showing все 4 члена семьи:
  - Avatars с именами
  - Green online status dots
  - Activity indicators (е.g., "Reading materials", "Typing response")

**Block-by-block collaborative process (повторяется для каждого из 12 blocks):**

**Каждый participant (включая Консула) в каждом block:**

1. **AI Introduction Phase:**
   - Читают AI introduction message для current block
   - Например: "Welcome to Block 1: Communication Patterns. Let's explore how your family communicates and identify opportunities for improvement."
   - AI explains importance текущего dimension

2. **Didactic Material Phase:**
   - Изучают structured educational content в 3 секциях:
     - **"Why This Matters"** - research findings, statistics о importance
     - **"Key Dimensions"** - 4 sub-dimensions для evaluation (например для Communication: Frequency & Regularity, Openness & Transparency, Active Listening, Channel Diversity)
     - **"Best Practice Example"** - real anonymized family example showing good practices
   - Могут expand/collapse sections для deeper reading
   - Видят estimated reading time (например, "5 minutes")

3. **Personal Reflection Phase:**
   - Видят large textarea prompt "Share Your Family's Context"
   - AI provides guiding questions, например:
     - "How often does your family communicate about important matters?"
     - "What channels do you use? (in-person, phone, messaging, email)"
     - "Are there topics that are difficult to discuss?"
     - "Do all family members feel heard?"
   - Вводят свои specific examples, concerns, observations о семье (минимум 50 characters required)
   - Например: "We mostly communicate via WhatsApp group for day-to-day, but important decisions only discussed during holiday gatherings. Feels rushed and some voices dominate."
   - Видят character counter и validation indicator

4. **AI Consultation Phase:**
   - Кликают prominent "Ask AI for Guidance" button после entering reflection
   - Видят loading animation "AI analyzing your context..." (2-3 seconds)
   - Читают персонализированный AI Consultation response в structured format:

     **Analysis of Your Situation:**
     - AI's understanding их patterns based на shared context
     - Например: "Your family demonstrates regular communication through WhatsApp for routine matters. However, relying primarily on holiday gatherings for major decisions may create pressure and limit thoughtful discussion."

     **Rating Guidance:**
     - AI suggests rating range с обоснованием
     - Например: "Consider a rating of 2-3 out of 5. You have established channels (strength) but lack structured forums for complex topics (opportunity)."

     **Specific Recommendations:**
     - 3 actionable recommendations based на их context
     - Например:
       1. "Establish monthly family council video calls for discussing important topics"
       2. "Create agenda-setting process so members can prepare thoughts in advance"
       3. "Designate a rotating facilitator to ensure all voices heard"

   - Могут кликнуть "Ask Follow-up Question" если нужны clarifications
   - Могут request AI consultation multiple times с different context

5. **Rating Exercise Phase:**
   - Видят interactive rating interface с 5 options (1-5 scale)
   - Каждый rating option имеет:
     - Emoji visual (😟 Poor → 😊 Excellent)
     - Label (1-Poor, 2-Needs Improvement, 3-Adequate, 4-Good, 5-Excellent)
   - Кликают на preferred rating
   - Видят selection highlighted визуально
   - Система auto-saves rating немедленно
   - Видят "Saved ✓" indicator

6. **Submission Phase:**
   - Кликают "Submit & Continue" button когда ready для next block
   - Видят "Waiting for other participants..." message если другие еще не submitted
   - Видят live status: "3 of 4 participants ready"
   - Система blocks transition пока НЕ ВСЕ participants submitted

**После каждого block - Aggregated Results View:**

Все participants видят results screen для completed block:
- **Family Average Score**: Large number (например, "3.8 / 5") с visual bar chart
- **Individual Ratings**: Avatars каждого member с их ratings показаны (transparency)
- **AI Family Insight**: AI-generated analysis, например:
  - "Your family shows consensus (ratings 3-4) indicating awareness of communication opportunities. The range suggests some members feel more satisfied than others - this is normal and worth discussing."
- **Key Observation**: AI highlights pattern, например:
  - "Strength: Regular WhatsApp usage demonstrates commitment to connection"
  - "Opportunity: Formal decision-making forums could improve complex discussions"
- **Overall Progress Update**: "1 of 12 blocks completed - 8%" с updated progress bar

**Navigation Options:**
- **"Take a Break"** button - saves progress, можно resume later
- **"Continue to Next Block"** button - transitions вся группа к Block 2

**Консул специфичные actions и visibility:**
- Видит additional participation metrics dashboard (не видимый другим members):
  - "Activity heatmap" showing кто actively engaging
  - "Completion status" per member per block
  - Timestamp когда каждый member completed current block
- Может отправлять gentle in-platform nudges, например:
  - "Reminder: David, please submit your response когда ready"
- Может trigger "Group Discussion Break" pausing workshop для verbal conversation
- Может access "Skip Block" option если technical issues (requires explanation)
- Видит projected completion time based на current pace

**Ответы системы:**

**Workshop Environment:**
- Система предоставляет secure workshop room accessible только по unique link
- Система displays consistent header showing:
  - AI Facilitator info ("Archimedes - AI Facilitator")
  - Live status indicator (green "Live Now" badge)
  - Current block title
  - Progress tracking: "Block X of 12" с percentage
  - Overall completion bar визуально showing progress
- Система maintains live participants panel:
  - Shows avatars всех invited members
  - Green status dots для online participants
  - Activity status updates (e.g., "Reading materials", "Writing reflection", "Submitted")
  - Last activity timestamp

**Block Content Rendering:**
- Система renders для каждого block:
  - AI introduction message персонализированное с block-specific context
  - Didactic material section structured hierarchically (Why Matters → Key Dimensions → Best Practice)
  - Visual icons и formatting для readability
  - Expand/collapse functionality для длинных sections
  - Estimated reading time indicators
- Система provides personal reflection textarea:
  - Large, comfortable typing area
  - Character counter (минимум 50 characters required)
  - Validation feedback real-time
  - Auto-save draft каждые 10 seconds locally

**AI Consultation Service:**
- Система отправляет participant's reflection text к AI consultation service когда "Ask AI" clicked
- Система validates минимум 50 characters entered перед allowing AI consultation request
- Система shows typing indicator animation: "AI analyzing your context..." (2-3 seconds actual processing)
- Система renders AI consultation response в structured 3-section format:
  - Section headers clearly labeled
  - Numbered recommendations для easy reference
  - Highlighted key phrases
  - "Copy to Notes" button для saving insights
- Система allows unlimited AI consultation requests per block (не restricted)
- Система tracks AI consultation usage per participant для analytics
- Система handles AI service errors gracefully:
  - Shows user-friendly error message
  - Suggests trying again или continuing без consultation
  - Logs error для monitoring
  - Consultation failure НЕ blocks workshop progress

**Rating Interface:**
- Система shows interactive rating scale с 5 clear options
- Система uses visual emojis + text labels для intuitive understanding
- Система highlights selected rating визуально (bold border, color change)
- Система auto-saves rating immediately upon selection (не requires separate save action)
- Система shows "Saved ✓" confirmation feedback
- Система allows changing rating до submitting block (overwrite previous)

**Block Submission & Synchronization:**
- Система tracks submission status каждого participant для current block
- Система displays "Submit & Continue" button становится disabled until valid completion:
  - Минимум 50 characters reflection entered
  - Rating selected (AI consultation optional)
- Система shows "Waiting for other participants..." message with live count
- Система updates waiting status real-time: "2 of 4 ready", "3 of 4 ready"
- Система blocks automatic transition пока НЕ ВСЕ participants submitted
- Система allows Консул override если technical issue (requires confirmation)

**Aggregated Results Generation:**
- Система calculates family average score после all participants submitted block:
  - Arithmetic mean of all participant ratings
  - Rounded to 1 decimal place (e.g., 3.8)
- Система displays individual ratings transparently:
  - Each participant's avatar с their rating
  - Visual bar chart showing distribution
  - Handles ties gracefully
- Система generates AI insight analyzing:
  - Consensus level (tight vs wide range)
  - Family patterns identified
  - Key strengths observed
  - Opportunities highlighted
- Система updates overall progress bar:
  - Increments by 8.33% per completed block (100% / 12 blocks)
  - Shows completion percentage numerically
  - Visual progress bar fills proportionally

**Progress Management:**
- Система auto-saves все responses каждые 30 секунд:
  - Reflections saved as drafts
  - Ratings saved immediately
  - AI consultations logged
  - Timestamps recorded
- Система allows "Take a Break" functionality:
  - Saves current state completely
  - Generates resume link valid 7 дней
  - Sends email reminder после 24 hours если не resumed
  - All participants must agree для pausing (consensus required)
- Система enables resume capability:
  - Participants rejoin на exact block где stopped
  - Previous responses pre-filled и editable
  - Progress bar shows accurate completion
  - All participants must rejoin для continuing (synchronous requirement)

**Disconnection Handling:**
- Система detects если participant loses connection (network issue, browser crash)
- Система shows "Participant Disconnected" indicator to other members
- Система maintains progress для disconnected participant
- Система allows seamless reconnection:
  - Participant clicks same workshop link
  - System restores exact state where they were
  - Workshop continues для других participants meanwhile
  - Disconnected participant catches up на current block when reconnected

**User Expectations:**
- Participants ожидают smooth, intuitive flow через blocks без technical friction
- Participants ожидают personalized, relevant AI guidance based на их specific family context (не generic advice)
- Participants ожидают transparency - видеть что думают другие members
- Participants ожидают progress auto-saved - не lose work если disconnection
- Participants ожидают clear indication когда их action required vs когда waiting
- Консул ожидает visibility в participation levels для ensuring engagement
- All participants ожидают workshop завершится в promised 2-3 hour timeframe

**Ответственные роли:**
- **AI Facilitator (Archimedes)**: Guides через каждый block sequentially, provides educational content, generates персонализированные consultations, analyzes family responses, synthesizes insights (automated facilitation reducing Консул burden)
- **Консул**: Активно participates наравне с другими members, monitors overall participation, manages pacing если needed, ensures productive atmosphere (но НЕ facilitates - AI handles это)
- **Члены семьи**: Активно participate в каждом block, provide honest reflections, use AI consultations для guidance, rate dimensions thoughtfully, engage respectfully с другими members' perspectives

**Pain Points:**
- Participants могут feel information overload с detailed didactic materials (addressed через expandable sections, estimated reading times)
- Participants могут be unsure how detailed their reflections должны быть (addressed через guiding questions, character minimum)
- Participants могут worry их responses будут judged негативно by family (addressed через AI messaging о safe space, constructive tone)
- Technical issues во время live session могут disrupt flow (addressed через auto-save, reconnection capability, Консул controls)
- 2-3 hour session может be mentally tiring (addressed через break option, progress indicators, momentum management)

---

### Стадия 5: Просмотр Final Assessment Report
**Цель**: Предоставить comprehensive assessment results с AI-generated insights и actionable recommendations

**Действия пользователя:**

**Консул:**
- Видит "Workshop Complete!" celebration screen сразу после submitting последнего 12-го block
- Получает notification "Assessment Report Ready" через 1-2 минуты (report generation time)
- Кликает "View Assessment Report" button
- Открывается comprehensive Family Assessment Report page
- Просматривает report metadata header:
  - "Generated by AI Workshop"
  - "Completed: December 15, 2025 at 4:47 PM ET"
  - "Participants: John Smith (you), Mary Smith, David Smith, Sarah Smith"
- Видит prominent Overall Family Readiness Score:
  - Large number display "7.2 / 10"
  - Visual gauge chart (color-coded: red <5, yellow 5-7, green 7-10)
  - Subheading "Based on 12 governance dimensions assessed collaboratively"
- Scrolls down к "Assessment Dimensions Summary" section
- Видит all 12 dimensions listed с compact view:
  - Dimension name
  - Star rating визуальный (e.g., ★★★★☆ 3.8/5)
  - Brief one-line AI commentary
  - "Expand" icon для viewing full details
- Кликает expand на specific dimensions для deeper dive:
  - Full participant ratings breakdown
  - Complete AI commentary paragraph
  - Key reflections quoted from workshop
  - Specific recommendations for improvement
- Scrolls к "Key Findings" section с два categories:
  - **Key Strengths (green highlight)**: 3-4 top-rated dimensions identified
    - Example: "Strong Family Unity & Values (4.5/5) - Clear sense of shared identity"
    - Example: "Good Financial Transparency (4.2/5) - Open communication about wealth"
  - **Areas for Development (yellow highlight)**: 3-4 lowest-rated dimensions requiring attention
    - Example: "Formal Decision-Making Process (2.8/5) - Lacks structured framework"
    - Example: "Conflict Resolution (3.1/5) - Could benefit from established protocols"
- Reads AI-generated detailed recommendations для каждой development area:
  - Problem statement
  - Why this matters для семьи
  - 2-3 specific actionable steps
  - Expected outcomes
  - Suggested timeline
- Scrolls к bottom where видит "Family Council Action Required" prominent notice box
- Видит two primary actions:
  - "Approve Report & Continue" button (green, primary)
  - "Request Changes" button (secondary) если disagreement
- Кликает "Approve Report & Continue" после reviewing thoroughly
- Видит confirmation "Report Approved & Saved" message

**Члены семьи:**
- Получают notification "Assessment Report Available" через email и platform
- Кликают на notification link opening report
- Видят same comprehensive report в read-only mode (cannot approve, cannot edit)
- Просматривают overall score и understand family's readiness level
- Читают through dimensions understanding где семья strong и где needs work
- Просматривают key findings и recommendations
- Видят their individual ratings reflected (transparency) but cannot change
- Могут download PDF copy report для personal records
- Видят note "Pending Consul approval to continue to next step"

**Ответы системы:**
- Система автоматически triggers report generation когда все 12 blocks completed
- Система shows brief "Generating Your Report..." loading screen (1-2 minutes)
- Система analyzes все 12 blocks aggregated data:
  - Calculates average score per dimension
  - Identifies highest/lowest performing dimensions
  - Extracts key quotes from reflections
  - Synthesizes patterns across responses
- Система calculates overall readiness score:
  - Weighted average of all 12 dimensions
  - May weight critical dimensions higher (e.g., Communication, Decision-Making)
  - Converts to 0-10 scale
  - Categorizes: <5 Early Stage, 5-7 Developing, 7-10 Advanced
- Система generates comprehensive AI commentary для каждого dimension:
  - Analyzes family's specific responses
  - References concrete examples from reflections
  - Balances strengths и opportunities
  - Provides context-specific guidance
- Система identifies top 3-4 strengths:
  - Selects dimensions scoring >4.0
  - Prioritizes by score и AI importance assessment
  - Generates positive reinforcement messaging
- Система identifies top 3-4 development areas:
  - Selects dimensions scoring <3.5
  - Prioritizes by impact on overall governance
  - Generates constructive improvement guidance
- Система generates actionable recommendations:
  - Problem-solution framework
  - Specific steps vs generic advice
  - Timeline suggestions (short-term, medium-term)
  - Links to relevant resources если available
- Система renders report with professional formatting:
  - Clear hierarchical structure
  - Color-coded visual elements
  - Expandable/collapsible sections for navigation
  - Print-friendly layout
  - Download as PDF functionality
- Система displays report metadata:
  - Generation timestamp
  - Participant list
  - Workshop duration
  - Completion confirmation
- Система enforces permission-based access:
  - Консул/Admin: full access, approve capability
  - Family Members: read-only access, can view all sections
  - External parties: no access (family data isolation)
- Система shows "Family Council Action Required" notice prominently:
  - Explains approval needed для proceeding
  - Clear call-to-action buttons
  - Secondary "Request Changes" option
- Система handles "Request Changes" flow:
  - Opens feedback form
  - Requires specific description of disagreement
  - Can request re-evaluation of specific dimensions
  - Notifies support team для review (future: AI re-analysis)
- Система saves approved report permanently:
  - Stores in family's constitution document
  - Creates immutable record с timestamp
  - Available for future reference
  - Can be downloaded anytime as PDF

**User Expectations:**
- Консул ожидает видеть comprehensive, professional report reflecting workshop effort
- Консул ожидает actionable, specific recommendations не generic advice
- Консул ожидает report accurately represents семьи's discussions и ratings
- Консул ожидает clear next steps после approval
- Члены семьи ожидают transparency - видеть full report, not summary
- Члены семьи ожидают their input reflected и valued
- All participants ожидают report is permanent record they can reference later

**Ответственные роли:**
- **Консул**: Reviews comprehensive report thoroughly, validates accuracy против workshop discussions, approves final results или requests changes если disagreement, coordinates next steps (ключевая approval authority из персоны)
- **Члены семьи**: Review report read-only, understand family assessment results, see their contributions reflected, anticipate next steps (адресует need для clarity на outcomes)

**Pain Points:**
- Report может be overwhelming если too much information (addressed через expandable sections, summary view)
- Recommendations могут be too generic если AI недостаточно personalized (addressed через context-rich analysis)
- Disagreement с assessment может arise если members feel misrepresented (addressed через "Request Changes" option)

---

### Стадия 6: Completion и Transition к Next Step
**Цель**: Финализировать assessment completion и guide семью к следующему шагу constitution setup

**Действия пользователя:**

**Консул:**
- После clicking "Approve Report", видит transition screen
- Видит "Step 4 Completed!" large success message с animated green checkmark
- Просматривает completion summary panel:
  - "Assessment completed successfully"
  - "Report approved and saved to your constitution"
  - "12 governance dimensions evaluated"
  - "Ready to move forward"
- Видит Constitution Setup Progress visualization:
  - Large circular progress indicator "50%"
  - "Constitution Setup Progress" label
  - "4 of 8 steps completed" subtext
  - Visual checklist showing Steps 1-4 checked, Steps 5-8 pending
- Читает "What's Next?" information section:
  - "Step 5: Values, Mission & Vision Workshop"
  - Brief description: "Define your family's core values, articulate your mission, and envision your future together"
  - Connection explained: "Your assessment insights will inform this values work, helping you build on strengths and address opportunities identified"
- Видит two action buttons:
  - "Continue to Step 5" (primary, green)
  - "Review Assessment Report" (secondary) если wants another look
- Может also видеть optional "Share Report with Advisor" button если family has advisor relationship
- Кликает "Continue to Step 5" для advancing constitution setup
- Система transitions к Step 5 Values Workshop planning screen

**Члены семьи:**
- Получают email notification "Assessment Complete - Step 4 Finished"
- Открывают notification reading completion summary
- Понимают что Step 4 assessment completed successfully
- Видят что семья progressing через constitution setup (50% complete)
- Anticipate following steps в process
- Читают brief preview Step 5 Values work
- Понимают connection: assessment informs values
- Feel sense of accomplishment - collaborative effort paid off

**Ответы системы:**
- Система immediately responds к Консул approval action
- Система displays celebration/success screen:
  - Large animated green checkmark
  - Confetti animation (subtle, celebratory)
  - Success message prominently displayed
  - Positive reinforcement tone
- Система saves approval action:
  - Timestamps approval
  - Records approving user (Консул name)
  - Marks Step 4 status: "Completed"
  - Triggers audit log entry
- Система permanently saves report:
  - Stores in family's constitution document repository
  - Creates immutable record
  - Indexes for easy future retrieval
  - Enables PDF download capability
- Система calculates и displays constitution progress:
  - Updates progress percentage (50% after Step 4)
  - Visual progress indicator updated
  - Step checklist updated (Steps 1-4 checked)
  - Step 5 now active/unlocked
- Система generates "What's Next?" guidance:
  - Pulls Step 5 metadata (title, description)
  - Explains connection: how assessment informs values
  - Sets expectation для next workshop type
  - Highlights continuity in process
- Система provides navigation options:
  - Primary CTA "Continue to Step 5" prominently displayed
  - Secondary option "Review Assessment Report" for reference
  - Optional "Share Report" если advisor relationship exists
- Система sends completion notifications:
  - Email всем workshop participants
  - Subject: "Assessment Complete - Step 4 Finished"
  - Body: summary, congratulations, next steps preview
  - Includes link to view report
  - Sets expectation для Step 5
- Система updates family's constitution setup tracker:
  - Step 4 marked completed ✓ with timestamp
  - Progress bar visually updated to 50%
  - Step 5 activated/unlocked для initiation
  - Previous steps remain accessible (can review anytime)
- Система tracks completion metrics для analytics:
  - Workshop completion rate
  - Time from scheduling to completion
  - Participant engagement levels
  - AI consultation usage
  - Report approval time
- Система enables transition к Step 5:
  - "Continue" button navigates to Values Workshop planning
  - Constitution setup wizard continues flow
  - Context carried forward (assessment insights available)

**User Expectations:**
- Консул ожидает clear confirmation что Step 4 complete
- Консул ожидает visible progress in overall constitution setup
- Консул ожидает guidance on what comes next
- Консул ожидает smooth transition к Step 5 without friction
- Члены семьи ожидают notification of completion
- Члены семьи ожидают understanding где семья stands в process
- All participants ожидают sense of accomplishment recognized

**Ответственные роли:**
- **Консул**: Acknowledges completion, reviews progress, transitions family к next step, maintains momentum в constitution setup (ключевая координация ongoing initiatives из персоны)
- **Члены семьи**: Receive completion confirmation, understand next steps, feel positive about collaborative achievement

**Pain Points:**
- Momentum может be lost между steps если delay (addressed через immediate "Continue" option, email reminders)
- Семья может be unclear что Step 5 entails (addressed через "What's Next?" preview, connection explanation)

---

## 🎯 Концептуальные системные требования

### Функциональные требования
1. **Collaborative Real-Time Environment**: Система должна поддерживать simultaneous participation до 10 family members в workshop с real-time synchronization responses и progress
2. **Democratic Voting Mechanism**: Система должна предоставлять voting functionality для scheduling с multiple time slot options, live results tracking, automated determination winning time
3. **AI Consultation Service**: Система должна генерировать персонализированные recommendations на основе family's specific context shared в reflections, returning structured guidance в <5 seconds
4. **Auto-Save & Resume Capability**: Система должна auto-save workshop progress каждые 30 seconds, позволяя resume с exact last state если disconnection или break taken
5. **Comprehensive Report Generation**: Система должна автоматически генерировать detailed assessment report analyzing all 12 dimensions, identifying strengths/opportunities, providing actionable recommendations
6. **Progress Tracking**: Система должна track и display overall constitution setup progress, showing steps completed/pending, visual indicators для user motivation
7. **Automated Notification System**: Система должна отправлять multi-stage automated reminders (7 days, 24 hours, 1 hour) ensuring participants не miss workshop
8. **Permission-Based Access Control**: Система должна enforce role-based permissions: Консул approval authority, Members read-only access к reports, secure data isolation

### Потребности интеграции
**Какие внешние системы или сервисы необходимы? (Только бизнес-перспектива)**
- **Система календаря** - для checking family members' availability при voting и coordinating workshop scheduling. Должна support .ICS file generation для calendar invitations.
- **Сервис email уведомлений** - для sending workshop invitations, voting links, confirmation emails, multi-stage reminders (7 days, 24 hours, 1 hour before)
- **AI consultation service** - для generating персонализированные recommendations based на family context. Должен analyze text input, return structured guidance в <5 seconds.
- **Real-time collaboration platform** - для enabling simultaneous participation множественных family members с live synchronization. Может быть встроенное решение или интеграция с Zoom/similar для video layer.
- **Document generation service** - для автоматического creating comprehensive PDF assessment reports с professional formatting, charts, summaries
- **Video conferencing (optional)** - для adding video/audio layer к collaborative workshop. Может быть integrated Zoom, Google Meet, или custom WebRTC solution.

### Требования к обмену данными
**Какие данные должны перемещаться между системами или экспортироваться/импортироваться? (Только бизнес-перспектива)**
- **Экспорт calendar invitation** - семья receives standard .ICS files для adding workshop к personal calendars (Google Calendar, Outlook, Apple Calendar)
- **AI context input/output** - family reflections (text input) sent к AI service, персонализированные recommendations (structured response) returned
- **Real-time collaboration data** - participant responses, ratings, activity status synchronized между all participants в real-time (WebSocket or similar)
- **Assessment report export** - families могут download comprehensive report в PDF format для archival и sharing (e.g., с advisors)
- **Task creation integration** - AI-generated recommendations могут быть converted to actionable tasks в Task Management Service для tracking follow-through
- **Progress status updates** - constitution setup progress synchronized между workshop completion и main setup wizard

## 🔒 Мультитенантность и изоляция данных

### Изоляция данных семьи (КРИТИЧНО)
Все workshop данные и assessment results должны быть строго изолированы по семьям:

**Ключевые принципы:**
- Workshop responses, reflections, ratings принадлежат исключительно conducting семье
- Ни одна семья не может просматривать workshop данные, voting results, или assessment reports других семей
- Real-time collaboration ограничена только invited family members конкретной семьи
- AI-generated insights, consultations, recommendations являются family-specific и не shared
- Assessment reports хранятся только в constitution document конкретной семьи
- Workshop room links являются unique per family и expire после completion

**Что это означает для путешествия:**
- **Стадия 1**: Когда Консул выбирает AI workshop, система shows только options available для their family's subscription
- **Стадия 2**: Во время scheduling/voting, система checks только members текущей семьи, не других families
- **Стадия 3**: Voting results, final scheduled time visible только current family members
- **Стадия 4**: В live workshop room, присутствуют только invited members current семьи. AI consultations generated на основе только их context.
- **Стадия 5**: Assessment report содержит только current family's data. No comparison к other families, no cross-family benchmarking.
- **Стадия 6**: Workshop completion updates только current family's constitution progress

**Технические границы изоляции:**
- Workshop room access: unique URL per family, expires after completion
- Real-time sync: isolated WebSocket channels per family workshop session
- AI consultation: family context не shared между families, no cross-contamination
- Report storage: stored под unique family ID, access controlled through family membership
- Analytics: aggregated metrics OK, но individual family data never exposed

## 🔑 Разрешения и контроль доступа

### Требуемые разрешения по стадиям

**Стадия 1 (Выбор метода):**
- Кто может выбирать AI Workshop? Пользователь должен иметь роль Консула или Администратора
- Какие разрешения требуются? Доступ к constitution setup process на Step 4
- Validation: Система checks user role before allowing method selection

**Стадия 2 (Планирование и Voting):**
- Кто может инициировать scheduling? Только Консул или Администратор может выбрать дату и create voting
- Кто может участвовать в voting? Все family members (including Консул) могут vote за preferred times
- Кто может видеть voting results? Все family members видят live voting results transparently
- Кто может send reminders? Только Консул может manually send voting reminders to non-voters

**Стадия 3 (Подтверждение):**
- Кто может finalize workshop schedule? Только Консул или Администратор может confirm final time после voting
- Кто получает preparation materials? Все invited family members получают workshop details и preparation instructions
- Кто может reschedule? Только Консул/Admin могут reschedule до 24 hours before start

**Стадия 4 (Live Workshop):**
- Кто может присоединиться к workshop room? Только invited family members с valid workshop room link
- Кто может использовать AI consultations? Все participants могут request unlimited AI guidance
- Кто может submit responses? Все participants submit их own responses и ratings independently
- Кто может управлять workshop flow? Консул имеет additional controls (pause session, skip problematic block, manage pacing)
- Кто может видеть real-time participant activity? Консул видит participation metrics dashboard, other members видят basic online status only

**Стадия 5 (Results):**
- Кто может просматривать assessment report? Все family members могут view comprehensive report
- Какой уровень доступа для Members? Read-only access - могут view, download, но cannot edit или approve
- Кто может утверждать results? Только Консул или Администратор может approve final assessment report
- Кто может request changes? Консул может request revisions через "Request Changes" form
- Кто может share report externally? Только Консул/Admin могут share report с external advisors

**Стадия 6 (Completion):**
- Кто может transition к Step 5? Только Консул или Администратор может advance constitution setup к next step
- Кто получает completion notifications? Все workshop participants получают completion confirmation

### Доступ на основе ролей

| Роль | Может планировать Workshop | Может vote за время | Может участвовать в Workshop | Может использовать AI consultations | Может просматривать Report | Может утверждать Results | Может transition к Step 5 |
|------|----------------------------|---------------------|------------------------------|-----------------------------------|---------------------------|-------------------------|--------------------------|
| **Член семьи** | ❌ Нет | ✅ Да | ✅ Да (если invited) | ✅ Да | ✅ Да (read-only) | ❌ Нет | ❌ Нет |
| **Консул** | ✅ Да | ✅ Да | ✅ Да | ✅ Да | ✅ Да (full access) | ✅ Да | ✅ Да |
| **Администратор** | ✅ Да | ✅ Да | ✅ Да | ✅ Да | ✅ Да (full access) | ✅ Да | ✅ Да |
| **External Advisor** | ❌ Нет | ❌ Нет | ❌ Нет (no involvement) | ❌ Нет | ✅ Да (если explicitly shared) | ❌ Нет | ❌ Нет |

### Permission Enforcement Points
**Где permissions должны проверяться:**
1. **Method selection screen**: Check user role before showing "Continue to Workshop Setup" option
2. **Workshop scheduling page**: Validate Консул/Admin role before allowing date/time slot selection
3. **Voting submission**: Validate family membership before accepting vote
4. **Workshop room access**: Validate invitation list против accessing user before allowing entry
5. **AI consultation requests**: Rate-limit per user (e.g., max 50 consultations per workshop)
6. **Report approval action**: Validate Консул/Admin role before allowing approval
7. **Step 5 transition**: Validate Консул/Admin role и Step 4 completion status

**Что происходит если user lacks permissions:**
- Show clear error message: "This action requires Consul or Administrator privileges"
- Redirect to appropriate page (e.g., back to dashboard)
- Log permission denial attempt для security monitoring
- Provide alternative path if available (e.g., "Contact your Family Consul to schedule the workshop")

## 📋 Бизнес-правила и контроль

### Ключевые правила валидации

**Workshop Participation Rules:**
1. **Минимальное участие**: Минимум 2 family members должны participate для valid assessment (including Консул)
2. **Synchronous requirement**: Workshop является live synchronous event - все participants работают together в real-time, не asynchronous
3. **Invitation-only access**: Только explicitly invited family members могут join workshop room
4. **One workshop per family per Step 4**: Семья может conduct только one AI workshop для completing Step 4 (не multiple attempts)

**Block Completion Requirements:**
1. **Reflection minimum**: Participants должны ввести минимум 50 characters в personal reflection textarea перед requesting AI consultation
2. **Rating requirement**: Participants должны select rating (1-5) перед submitting block
3. **AI consultation optional**: Requesting AI consultation является optional, не mandatory для block completion
4. **Sequential progression**: Blocks должны быть completed sequentially (cannot skip ahead к Block 5 without completing 1-4)
5. **Minimum blocks for valid report**: Минимум 10 из 12 blocks должны быть completed для generation valid assessment report

**Voting & Scheduling Rules:**
1. **Date selection authority**: Только Консул может select workshop date и propose time slots для voting
2. **Time slot options**: Консул должен propose минимум 2 и максимум 3 time slots для voting
3. **Voting window**: Voting остается open 48 hours OR until все members voted (whichever comes first)
4. **Winning determination**: Time slot с most votes becomes scheduled time. При tie, Консул manually selects.
5. **Reschedule policy**: Workshop может быть rescheduled до 24 hours before start time. После этого - no rescheduling.
6. **Late voting**: Members могут vote after deadline только если voting still open (no retroactive votes)

**AI Consultation Rules:**
1. **Context requirement**: AI consultation requires минимум 50 characters reflection entered
2. **Response time SLA**: AI должен generate consultation response в течение 5 секунд (performance requirement)
3. **Unlimited consultations**: Participants могут request AI guidance unlimited раз per block (не capped)
4. **Personalization requirement**: AI responses должны be specific к family's shared context, не generic templated advice
5. **Recommendation format**: AI должен provide exactly 3 actionable recommendations per consultation (standardized format)
6. **Rating guidance approach**: AI должен suggest rating range (e.g., "2-3"), не dictate exact rating (preserves participant judgment)
7. **Follow-up capability**: Participants могут request follow-up clarifications на AI responses

**Progress & Save Rules:**
1. **Auto-save frequency**: Workshop progress auto-saved каждые 30 seconds without user action required
2. **Resume timeframe**: Workshop может быть resumed в течение 7 дней после taking break. После этого - session expires, должны restart.
3. **Disconnection handling**: Если participant disconnects, их progress preserved. Могут reconnect и resume на same block.
4. **Break consensus**: "Take a Break" requires consensus от all participants перед pausing workshop
5. **Manual save**: No manual save button - система handles automatically

### Бизнес-логика

**Report Generation Logic:**
1. **Scoring calculation**:
   - Each dimension score = arithmetic mean of all participant ratings для that dimension
   - Overall readiness score = weighted average of all 12 dimensions (некоторые dimensions weighted higher based on governance importance)
   - Converted to 0-10 scale для overall score
2. **Strengths identification**: Dimensions scoring ≥4.0 considered strengths. Top 3-4 highlighted в report.
3. **Development areas identification**: Dimensions scoring <3.5 considered opportunities. Top 3-4 flagged для improvement.
4. **AI insight generation**: AI analyzes patterns across all responses, quotes relevant reflections, synthesizes family-specific observations
5. **Recommendation generation**: AI creates actionable recommendations based on identified development areas, tailored к family context

**State Transitions:**
- **Workshop Status States**: Not Started → Scheduled → In Progress → Paused → Completed → Report Generated → Report Approved
- **Block Status States**: Locked → Active → In Progress → Submitted → Aggregated
- **Voting Status States**: Not Started → Active → Reminder Sent → Closed → Time Selected

**Workflow Rules:**
1. **Constitutional progress dependency**: Семья должна complete Steps 1-3 перед accessing Step 4 Assessment
2. **Approval before progression**: Консул должен approve assessment report перед advancing к Step 5
3. **Report finalization**: После approval, report becomes immutable permanent record (cannot edit)

### Compliance & Governance

**Privacy Considerations:**
- Workshop responses contain sensitive family information (communication patterns, conflicts, wealth)
- Individual participant reflections visible только during aggregation phase (transparency within family)
- AI consultations являются private между participant и AI (not shared с other members)
- Assessment reports содержат family-level insights, не individual member profiling

**Data Retention Requirements:**
- Workshop session data (raw responses, reflections): retained 12 месяцев после completion
- Assessment reports: retained permanently as part of family's constitution document
- AI consultation logs: retained 12 месяцев для quality improvement
- Voting data: retained 30 дней после workshop completion

**Audit Trail Needs:**
- Track all workshop creation actions: кто created, когда, какие parameters
- Log all approval actions: кто approved report, timestamp
- Record all participation: кто joined workshop, length of participation, completion status
- Track state transitions: workshop scheduled → started → paused → completed → approved

**Legal Requirements:**
- Explicit consent для data processing: participants acknowledge their responses used для AI analysis
- Right to deletion: families могут request deletion workshop data (но not approved assessment reports in constitution)
- Data export capability: families могут export all their workshop data в machine-readable format
- GDPR compliance (если EU families): data processing transparency, lawful basis, security measures

## 🚨 Крайние случаи и риски

### Крайние случаи

**Низкое participation в Voting:**
- **Сценарий**: После 48 hours voting deadline, только 2 из 5 members voted, остальные не responded
- **Обработка**:
  - Система automatically closes voting и uses received votes для determination
  - Система отправляет final reminder non-voters 1 час before deadline
  - Консул видит participation status и может manually send personalized reminders
  - Система selects time slot с most votes из available responses
  - Консул has override option если needed (e.g., if winning time not workable, can manually select)

**Технические проблемы во время Live Workshop:**
- **Сценарий**: Internet connection drops для participant, browser crashes, или system glitch во время active workshop session
- **Обработка**:
  - Система auto-saves progress каждые 30 seconds
  - Disconnected participant может reconnect через same workshop link
  - Система restores exact state где они были (current block, previous responses)
  - Workshop continues для других participants meanwhile
  - Консул видит "Participant Disconnected" indicator и может pause если critical member
  - Если multiple participants disconnect: система suggests "Take a Break" для group

**Неравномерное participation в Workshop:**
- **Сценарий**: Некоторые participants активно engage (detailed reflections, multiple AI consultations), другие passive (minimal input, rush through blocks)
- **Обработка**:
  - Система tracks activity metrics: reflection length, AI consultation usage, time per block
  - Консул видит participation dashboard с indicators (не visible to other members)
  - Консул может send in-platform gentle nudges: "David, please take your time с reflection"
  - Система allows "Group Discussion Break" где Консул can pause для verbal conversation
  - Система ensures minimum requirements met (50 char reflection, rating selection) перед allowing submission
  - Passive participants' minimal input still contributes to assessment (но may reduce quality)

**AI Consultation Service недоступен:**
- **Сценарий**: AI service experiencing downtime, overload, или technical issues during workshop
- **Обработка**:
  - Система shows graceful error message: "AI consultation temporarily unavailable. You can continue without it or wait a moment and try again."
  - "Ask AI" button shows "Retry" option
  - Consultation feature remains optional - не blocks workshop progress
  - Participants могут continue с ratings based на own judgment
  - Консул notified о service issue
  - Система logs incident для monitoring и improvement

**Disagreement с Assessment Results:**
- **Сценарий**: После reviewing report, Консул или family members strongly disagree с AI-generated assessment, ratings, или recommendations
- **Обработка**:
  - Система provides prominent "Request Changes" button на report page
  - Консул opens feedback form specifying:
    - Which dimensions seem inaccurate
    - Why they disagree (what was misunderstood)
    - What should be corrected
  - Система notifies support team для review
  - Future enhancement: AI re-analyzes с Консул feedback и generates revised report
  - If fundamental disagreement: Консул can decline AI method и opt для Advisor Workshop instead

**Workshop не completed в одной session:**
- **Сценарий**: После 2 hours и 8 completed blocks, family needs break - не может finish all 12 в one sitting
- **Обработка**:
  - Система provides "Take a Break" button visible для all participants
  - Break requires consensus: "3 of 4 participants agreed to break"
  - Система saves complete progress automatically
  - Система generates "Resume Workshop" link valid 7 дней
  - Participants получают email reminder через 24 hours если not resumed
  - When resuming: all participants rejoin на exact block где stopped (e.g., Block 9)
  - Previous responses remain editable при resume

**Voting Tie между Time Slots:**
- **Сценарий**: После voting closes, two time slots получили equal votes (e.g., Morning: 2 votes, Afternoon: 2 votes)
- **Обработка**:
  - Система detects tie automatically
  - Система notifies Консул: "Voting resulted in tie. Please select final time."
  - Консул видит tied options highlighted
  - Консул manually selects one из tied options (tiebreaker authority)
  - Система confirms selection и proceeds с normal scheduling flow
  - All participants notified о final time с explanation: "Scheduled for Afternoon based on Consul decision after tie"

**Late Participant Joining Workshop:**
- **Сценарий**: Participant joins workshop 30 minutes late, workshop уже на Block 3
- **Обработка**:
  - Система allows late join through workshop link
  - Late participant видит "You missed Blocks 1-2. Workshop currently on Block 3."
  - Two options presented:
    1. "Catch up quickly on Blocks 1-2" - compressed view with ability to submit ratings
    2. "Join current block and skip previous" - marks Blocks 1-2 incomplete
  - If chooses catch-up: other participants continue, late participant works через missed blocks separately
  - When caught up: joins group на current block
  - Report generation considers incomplete blocks (marks N/A, may lower overall confidence)

### Операционные риски

**Риски данных:**

**Риск**: Workshop responses lost из-за system failure, database crash, или network issues во время live session
- **Митигация**:
  - Система auto-saves каждые 30 seconds to persistent storage (database, не just browser local storage)
  - Система maintains backup copies в multiple locations
  - Система logs all save operations for recovery
  - Если catastrophic failure: Консул может re-initiate workshop, previous partial data recovered
  - Regular database backups every 6 hours

**Риск**: Unauthorized access к sensitive workshop responses или assessment reports со стороны non-family members
- **Митигация**:
  - Workshop room links являются unique, time-limited, single-use per family
  - Access restricted через family membership validation на entry
  - Assessment reports stored с family ID isolation, access controlled through authentication
  - All access logged: кто accessed, когда, what data viewed
  - Encryption at rest для sensitive workshop data
  - Regular security audits

**Риски производительности:**

**Риск**: AI consultation service slow или unresponsive во время peak workshop times (e.g., Sunday evenings когда multiple families scheduling)
- **Митигация**:
  - Система queues AI requests если service overloaded
  - Displays accurate wait time estimate: "AI consultation - 8 seconds wait time"
  - Graceful degradation: если wait time >10 seconds, suggest continuing без consultation
  - Load balancing across multiple AI service instances
  - Performance monitoring с alerts если response time >5 seconds
  - Consultation feature optional - не blocks workshop critical path

**Риск**: Real-time collaboration features lag с 4-6 simultaneous participants, causing sync issues или participant frustration
- **Митигация**:
  - Система optimizes real-time sync architecture (WebSocket with efficient state management)
  - Performance tested под expected load (up to 10 concurrent participants per workshop)
  - Activity indicators show "Saving..." for transparency
  - If latency detected (>2 seconds sync delay): system shows warning "Slow connection detected"
  - Block submission requires explicit action (не automatic) предотвращая premature transitions

**Риски пользовательского опыта:**

**Риск**: Participants overwhelmed by information volume - 12 blocks, didactic materials, AI consultations, reflections = 2-3 hour intensive session
- **Митигация**:
  - Система clearly communicates duration upfront: "2-3 hours" на every planning screen
  - Progress bar prominently visible: "Block 5 of 12 - 42% complete"
  - "Take a Break" option available после each block
  - Estimated reading times shown: "5 minutes to read materials"
  - Expandable sections allow скрыть overwhelming details
  - AI consultations optional - не adds mandatory time
  - Encourage breaks: "Consider taking a 10-minute break before continuing"

**Риск**: AI consultations too generic или not relevant к семьи's specific situation, causing participants doubt AI value
- **Митигация**:
  - AI analyzes actual family context shared в reflections (не just dimension name)
  - AI references specific examples из participant reflections
  - AI provides 3 specific recommendations (не broad platitudes)
  - Система collects feedback: "Was this AI consultation helpful?" (thumbs up/down)
  - Low-rated consultations flagged для AI model improvement
  - Консул може flag unhelpful responses
  - Continuous AI model training based на feedback

**Риск**: Family members feel their honest input будет judged или criticized by other family members, causing self-censorship
- **Митигация**:
  - AI intro messaging emphasizes safe space: "This is collaborative, not competitive. All perspectives valued."
  - Individual reflections visible только after block completed (not during rating phase)
  - Aggregated results show range, не individual breakdowns initially
  - Консул guidance emphasized: model respectful engagement
  - AI consultations являются private между participant и AI (not shared)
  - Workshop ground rules set by AI facilitator at start

**Риски координации (специфичные для Консул persona):**

**Риск**: Консул overwhelmed coordinating 4-6 family members, managing voting, ensuring participation, troubleshooting issues - compounds existing pain point
- **Митигация**:
  - Automated voting system reduces coordination burden vs manual scheduling
  - Real-time participation dashboard gives Консул visibility без micromanaging
  - AI handles facilitation - Консул participates наравне vs leading discussions
  - Automated reminders sent на system level (Консул не must chase)
  - "Take a Break" consensus mechanism - Консул не sole decision-maker
  - In-platform nudges easy: one-click "Send Reminder" не composing messages

**Риск**: Schedule conflicts emerge после voting completed и workshop scheduled, requiring rescheduling coordination nightmare
- **Митигация**:
  - Система allows rescheduling до 24 hours before workshop start
  - Re-initiate voting flow если consensus не possible manually
  - Calendar integration sends automatic updates если time changes
  - Clear rescheduling policy communicated: "Can reschedule до 24h before"
  - После 24-hour window: no rescheduling allowed (firm commitment)

**Риски engagement (специфичные для Family Member persona):**

**Риск**: Members unclear когда their active input needed vs когда просто listening к AI content, causing confusion and disengagement
- **Митигация**:
  - Clear visual cues: "Your Turn - Please Reflect" banners
  - Progress checklist per block: "✓ Read Materials, ⏳ Write Reflection, ⏳ Submit Rating"
  - Activity status visible: "Mary is writing reflection" shows others what to do
  - AI explicitly prompts: "Now it's your turn to share your family's context"
  - "Submit & Continue" button disabled until requirements met (clear blocking indicator)
  - Консул cannot force transitions - все members must actively submit

**Риск**: Members feel their contributions не valued или ignored в final report, causing frustration и reducing buy-in
- **Митигация**:
  - Transparent aggregation: individual ratings shown with avatars
  - AI insights quote specific reflections (anonymously if sensitive)
  - Report shows "Based on collaborative input from 4 family members"
  - Range of perspectives acknowledged: "Ratings varied 2-4, indicating diverse viewpoints"
  - Members receive same comprehensive report (not summary) - full transparency

### Open Questions
- [ ] **AI Model Selection**: Какой AI model (GPT-4, Claude, custom) best для generating family-specific governance consultations с proper context understanding?
- [ ] **Video Layer Decision**: Должен ли workshop include integrated video/audio conferencing или только text-based collaboration? (Trade-off: richer interaction vs technical complexity)
- [ ] **Break Management**: Кто determines когда breaks taken - individual participants, consensus required, или Консул authority? (Current assumption: consensus required)
- [ ] **Report Revision Process**: Если Консул requests changes к assessment, кто reviews - human support team или automated AI re-analysis? (Current: requires human review, future: AI re-analysis)
- [ ] **Follow-up Workshop**: Должны ли families иметь option для follow-up AI workshop через 6-12 months для reassessment? (Not defined in current journey)
- [ ] **Advisor Sharing Workflow**: Если family has advisor relationship, как именно sharing assessment report works - direct link, PDF email, secure portal? (Mentioned but not detailed)
- [ ] **Multi-language Support**: Будет ли AI workshop available на multiple languages для international families? (Not addressed, assumed English-only currently)

---

## 🔗 Gaps & Opportunities

### GAP-1: Асинхронная альтернатива для distributed families
**Description**: Текущий AI workshop requires synchronous 2-3 hour session где all members participate simultaneously. Families в very different time zones (e.g., US + Asia + Europe) могут find scheduling extremely difficult.

**Current State**: Families must либо:
- Find inconvenient compromise time (e.g., middle of night для some members)
- Exclude some members from workshop
- Choose different assessment method (Manual или AI Auto-fill)

**Impact**:
- Reduces workshop accessibility для globally distributed families
- Lower participation rates если time too inconvenient
- Some families forced к suboptimal assessment methods
- Potential dissatisfaction с collaborative model

**Proposed Solution**: Future enhancement: "Asynchronous AI Workshop Mode"
- Same 12-block structure, но participants complete independently в 72-hour window
- AI still provides consultations based на each member's context
- System aggregates responses asynchronously
- Final synchronous wrap-up session (30 minutes) для reviewing results together
- Trade-off: Loses real-time collaboration benefit, но enables participation across time zones

**Priority**: Medium (affects minority of families, workaround exists)
**Dependencies**: Asynchronous collaboration architecture, extended AI consultation capacity, modified report generation logic

---

### GAP-2: Post-Workshop Discussion Facilitation
**Description**: После viewing assessment report, families may want guided discussion о findings, priorities, action planning - но AI workshop ends abruptly после report generation без facilitated conversation.

**Current State**:
- Report generated automatically
- Консул approves/requests changes
- No structured discussion framework provided
- Families left to self-organize follow-up conversations

**Impact**:
- Potentially wasted opportunity для deeper family dialogue
- Some families may not discuss findings effectively
- Action plan recommendations may not be prioritized collectively
- Disconnect между assessment insights и actual next steps

**Proposed Solution**: "Post-Workshop Discussion Guide" feature
- AI generates discussion guide based на family's specific findings:
  - Suggested talking points для key development areas
  - Questions для collective prioritization
  - Facilitation structure для productive conversation (30-45 minutes)
- Can be used в self-facilitated family meeting или with advisor
- Optional: Schedule follow-up AI-facilitated discussion session (additional 1 hour)

**Priority**: High (directly impacts value realization from workshop)
**Dependencies**: AI discussion guide generation, meeting scheduling integration, self-service facilitation templates

---

### GAP-3: Comparison с Previous Assessments
**Description**: Families conducting reassessment через 12-18 months не have visibility в progress/regression vs previous assessment - no trend tracking или delta analysis.

**Current State**:
- Each assessment standalone snapshot
- No comparison to previous workshop results
- No progress tracking over time
- Families cannot see if development areas improved

**Impact**:
- Missed opportunity для demonstrating governance maturation
- Cannot validate if action plan recommendations были effective
- Reduced motivation если families не see tangible progress
- Difficult to identify persistent problem areas

**Proposed Solution**: "Assessment Progress Tracking" feature
- Store historical assessments chronologically
- Generate delta report: dimension-by-dimension comparison
- Visual trend charts: scores over time
- AI analyzes: "Your Communication score improved from 3.2 to 4.1 over 12 months - significant progress"
- Highlight: persistent challenges requiring different approach

**Priority**: Low для initial release (only relevant для repeat workshops)
**Dependencies**: Historical data storage, comparative analytics engine, visualization components

---

### Future Enhancement Ideas

1. **Family Member Prep Survey**: Pre-workshop questionnaire collecting initial thoughts, setting expectations, reducing cold-start time в live session

2. **Custom Block Selection**: Allow families skip certain dimensions если not relevant (e.g., "Business Involvement" для families без family business) - reduces workshop duration для some

3. **AI Facilitator Personality Options**: Let Консул choose AI facilitation style: "Formal & Professional" vs "Warm & Conversational" vs "Concise & Efficient"

4. **Live Collaboration Enhancements**:
   - Embedded video conferencing для richer interaction
   - Virtual breakout rooms для sensitive topics
   - Anonymous reflection option для controversial blocks
   - Emoji reactions для quick sentiment sharing

5. **Advisor Observation Mode**: Allow family's advisor join workshop as silent observer (read-only), can provide post-workshop debrief without participating in exercises

6. **Gamification Elements**:
   - Progress badges: "Communication Expert", "Governance Champion"
   - Completion milestones: "25% through your assessment!"
   - Family achievement recognition: "Your family completed assessment in 2.5 hours - faster than 70% of families"

7. **AI-Powered Workshop Insights Dashboard**: Real-time analytics для Консул during workshop:
   - Sentiment analysis of reflections
   - Engagement heatmap by participant
   - Suggested discussion topics based on emerging patterns
   - Risk flags: "Divergent perspectives detected on Decision-Making - consider deeper discussion"

8. **Multi-Session Workshop Option**: Break 12 blocks into 3 shorter sessions (4 blocks each, 1 hour per session) over 1-2 weeks for families preferring shorter commitments

---

## 🔗 Ссылки & Референсы

### Related Documentation
- **User Personas**:
  - [DOC-USR-002: Консул](../03-personas/consul-persona.md) - Primary initiator и coordinator
  - [DOC-USR-001: Family Member](../03-personas/family-member-persona.md) - Active workshop participants
- **Related User Journeys**:
  - [DOC-JRN-004: Assessment Workshop с Advisor](./JRN-004-advisor-assessment-workshop.md) - Paid consultant-led alternative
  - [DOC-JRN-003: Constitution Setup Wizard](./JRN-003-constitution-wizard.md) - Parent journey containing this assessment step
- **Business Modules**:
  - [Constitution Module](../02-business-modules/constitution-module.md) - Assessment part of constitution creation
  - [AI Services Module](../02-business-modules/ai-services-module.md) - AI consultation service details
- **System Architecture**:
  - [DOC-SYS-001: System Overview](../knowledge-base/system-overview.md) - Multi-tenancy architecture

### Related User Journeys
- **[JRN-004: Assessment Workshop с Advisor](./JRN-004-advisor-assessment-workshop.md)**: Key relationship - this AI workshop is free alternative to expensive advisor workshop. Families choosing между AI ($0, flexible) vs Advisor ($500-1500, professional facilitation). AI workshop addresses same governance assessment needs но без human consultant.

- **[JRN-003: Constitution Setup Wizard](./JRN-003-constitution-wizard.md)**: Parent journey - AI workshop is one method для completing Step 4 (Assessment) в overall constitution setup process. Results feed into Step 5 (Values, Mission, Vision).

### Конкурентный анализ
- **Industry best practices**: Family governance assessment frameworks (FFI, Cambridge Family Enterprise Group)
- **AI facilitation patterns**: Conversational AI design для guided experiences (OpenAI Assistants API, Claude conversations)
- **Collaborative tools reference**: Miro, FigJam, Google Docs для real-time multi-user experiences

### Research & Discovery
**User interviews conducted**:
- 5 Консулов interviewed about coordination pain points scheduling family activities
- 8 Family Members interviewed about engagement preferences collaborative vs individual work
- 3 Family Office Advisors consulted on assessment best practices

**Analytics data reviewed**:
- Constitution setup abandonment rate: 42% drop-off на Step 4 if no guided option
- Advisor workshop pricing: $500-1500 range confirmed from 12 advisors surveyed
- Workshop duration preferences: 68% families prefer 2-3 hour single session vs multi-session

**Competitor research**:
- Analyzed 4 family governance platforms: none offer AI-facilitated collaborative assessment
- Reviewed 6 AI-powered business facilitation tools: patterns для consultation, recommendations
- Studied 3 voting/scheduling tools: democratic time selection mechanisms

**Technical feasibility studies**:
- AI consultation response time: GPT-4 averages 2-3 seconds для 200-word context analysis
- Real-time collaboration scale: WebSocket architecture supports 10 concurrent users comfortably
- Report generation performance: Comprehensive 12-dimension report generated <2 minutes

---

## ✅ Planning Checklist

### Контент завершенность
- [x] Context section fully populated с goals and personas
- [x] All 6 stages documented с user actions и system responses
- [x] Business value clearly stated: "$500-1500 savings, 40% adoption target, 85% retention"
- [x] Success criteria defined: 8 user experience KPIs, 7 business impact KPIs
- [x] Triggers identified: Консул reaches Step 4, chooses AI Workshop method
- [x] Preconditions specified: role requirements, subscription inclusion, data availability

### Бизнес-логика
- [x] Business rules documented: participation requirements, voting rules, AI consultation policies, completion requirements
- [x] Validation rules defined: 50-char minimum reflections, 2-3 time slot voting range, 10/12 blocks minimum
- [x] Permission requirements specified: role-based access control per stage, approval authority
- [x] Compliance requirements identified: data privacy, retention periods (12 months session data, permanent reports), audit trails
- [x] Edge cases considered: 11 scenarios documented с mitigation strategies

### Multi-Tenancy планирование
- [x] Family data isolation requirements documented: workshop data, voting, reports strictly per family
- [x] No cross-family access scenarios identified: workshop rooms, AI consultations, reports isolated
- [x] Family context maintained throughout journey: voting members, live participants, report generation
- [x] Data isolation test scenarios defined: access control validation points, permission enforcement

### Пользовательский опыт
- [x] User pain points identified: Консул coordination burden, Members engagement clarity, voting fatigue, technical complexity
- [x] UI/UX needs described conceptually: voting interface, real-time collaboration, progress indicators, AI consultation display
- [x] Navigation flow makes sense: linear progression with break/resume capability
- [x] Error scenarios considered: low voting participation, technical issues, AI service unavailable, disagreement с results
- [x] Accessibility considerations noted: timezone handling, reading time estimates, optional AI consultations

### Gap анализ
- [x] Current gaps identified: асинхронная option для distributed families, post-workshop discussion facilitation, historical comparison tracking
- [x] Workarounds documented: compromise times, alternative assessment methods, self-organized discussions
- [x] Future enhancements listed: 8 enhancement ideas from prep surveys to multi-session options
- [x] Dependencies identified: asynchronous architecture, AI improvements, historical storage, video integration
- [x] Open questions captured: 7 questions on AI model, video layer, break management, revision process

### Stakeholder Review
- [ ] Product manager reviewed
- [ ] Business stakeholders approved
- [ ] User personas validated против journey (Консул и Family Member personas referenced)
- [ ] Technical feasibility confirmed (pending: AI service capacity, real-time collaboration scale)
- [ ] Prioritization decision made (pending: high priority confirmed? sequencing vs JRN-004?)

### Ready для Technical Design
- [x] Functional requirements clear: 8 conceptual system requirements specified
- [x] Integration needs identified: calendar, email, AI service, real-time collaboration, document generation
- [x] User journey validated с stakeholders (pending stakeholder sign-off)
- [ ] Ready to hand off to technical team (pending approval)

---

## 📝 Notes для Implementation Team

When this journey moves to implementation phase:

**High-Level Architecture Considerations:**
- **Real-time collaboration**: Consider WebSocket architecture для synchronous participant interaction. Evaluate socket.io vs native WebSockets vs serverless WebSockets (AWS API Gateway).
- **AI consultation service**: Requires low-latency (<5s) NLP service. Consider GPT-4 API, Claude API, or fine-tuned model. Need fallback mechanism если service unavailable.
- **Auto-save mechanism**: Implement client-side local storage backup + server-side persistence. Save frequency: 30 seconds or on every user action (debounced).
- **Report generation**: CPU-intensive aggregation and AI analysis. Consider async job queue (Celery, AWS SQS) to avoid blocking user experience.

**Key Technical Challenges:**
1. **State synchronization**: Multiple participants editing simultaneously requires conflict resolution strategy (operational transformation or CRDTs)
2. **AI context window limits**: Family reflections могут exceed token limits. Need chunking strategy or summarization.
3. **Scalability**: Peak load если multiple families schedule workshops same time (e.g., Sunday evenings). Plan capacity accordingly.
4. **Data consistency**: Auto-save + disconnection handling requires idempotent operations и reconciliation logic.

**Recommended Tech Stack Evaluation:**
- Frontend: React с real-time library (socket.io-client, WebSocket hooks)
- Backend: Node.js/Python FastAPI для real-time WebSocket servers
- AI Service: OpenAI GPT-4 API или Anthropic Claude API
- Database: PostgreSQL для relational data + Redis для real-time session state
- File Storage: S3 для report PDFs, CloudFront для delivery

**Security Considerations:**
- Workshop room links must be cryptographically secure, single-use, time-limited
- WebSocket connections must authenticate every message (не just initial handshake)
- AI consultations must be rate-limited per user to prevent abuse
- Report data encrypted at rest (sensitive family information)

**Testing Strategy:**
- Load testing: Simulate 50 concurrent workshops (500 participants)
- Chaos testing: Random disconnections, AI service failures, database latency spikes
- Cross-browser testing: Chrome, Safari, Firefox, Edge (WebSocket compatibility)
- Mobile responsiveness: Workshop should work on tablets (though not optimized для phones)

**Migration Path from Current State:**
- If current Step 4 только имеет manual fill: this AI workshop is net new feature (no migration needed)
- If pilot families already completed manual assessments: provide upgrade path to re-do with AI workshop
- Constitution setup wizard needs update: Step 4 now has 4 method options instead of 1

---

**Journey Version**: 1.0.0
**Last Updated**: 2025-10-18
**Journey Status**: Черновик - Готов к проверке
**Next Step**: Презентация продуктовой команде для feedback и утверждения перед переходом к technical design
**Key Principle**: Описывает ЧТО система должна делать (business requirements), а НЕ КАК это реализовывать технически (implementation details)
**Key Differentiation from JRN-004**:
- AI-facilitated vs human consultant
- $0 included vs $500-1500 paid
- Flexible self-scheduling vs consultant availability dependency
- Collaborative real-time process с AI guidance
- Персонализированные AI consultations на каждом block
- Democratic voting для time selection
- Automated report generation without consultant manual work
