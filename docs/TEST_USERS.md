# Тестовые пользователи

Документ содержит учетные данные тестовых пользователей для разработки и тестирования.

## Учетные записи

### 👤 Senior Advisor — Victoria Sterling

| Параметр | Значение |
|----------|----------|
| **Email** | `victoria.sterling@readvisor.app` |
| **Пароль** | `TestAdvisor123!` |
| **Роль** | Senior Family Advisor |
| **Компания** | Sterling Advisory Group |
| **Локация** | New York, NY |
| **Профиль** | 95% заполнен |

**Данные:**
- 2 семьи-клиента (Harrington Family, Morrison Family)
- Задачи, услуги и консультации для каждой семьи
- 3 уведомления

---

### 👤 New Advisor — Marcus Chen

| Параметр | Значение |
|----------|----------|
| **Email** | `marcus.chen@readvisor.app` |
| **Пароль** | `TestAdvisor123!` |
| **Роль** | Family Advisor |
| **Компания** | Chen Consulting |
| **Локация** | San Francisco, CA |
| **Профиль** | 60% заполнен |

**Данные:**
- 1 семья-клиент (Chen Tech Family)
- Базовые задачи и услуги
- 2 уведомления

---

### 👤 Enterprise Advisor — Elizabeth Blackwell

| Параметр | Значение |
|----------|----------|
| **Email** | `elizabeth.blackwell@readvisor.app` |
| **Пароль** | `TestAdvisor123!` |
| **Роль** | Principal Family Advisor |
| **Компания** | Blackwell & Partners |
| **Локация** | Chicago, IL |
| **Профиль** | 100% заполнен |

**Данные:**
- 3 семьи-клиента (Blackwell Dynasty, Van Der Berg Family, Al-Rashid Family Office)
- Полный набор задач, услуг и консультаций
- 3 уведомления

---

## Быстрый доступ

```
# Senior Advisor
victoria.sterling@readvisor.app / TestAdvisor123!

# New Advisor  
marcus.chen@readvisor.app / TestAdvisor123!

# Enterprise Advisor
elizabeth.blackwell@readvisor.app / TestAdvisor123!
```

## Создание тестовых пользователей

### Через SQL (рекомендуется)

1. Откройте [Supabase Dashboard](https://supabase.com/dashboard/project/qwpmdfkycedyefxvloti)
2. Перейдите в **SQL Editor**
3. Выполните скрипт из файла `scripts/seed-test-users.sql`

### Через TypeScript

```bash
npx tsx scripts/seed-test-users-v2.ts
```

> ⚠️ **Важно:** TypeScript скрипт требует исправления триггера `on_auth_user_created` в базе данных.

## Семьи-клиенты

| Семья | Advisor | Индустрия | Статус |
|-------|---------|-----------|--------|
| Harrington Family | Victoria | Real Estate | Active |
| Morrison Family | Victoria | Healthcare | Active |
| Chen Tech Family | Marcus | Technology | Active |
| Blackwell Dynasty | Elizabeth | Finance | Active |
| Van Der Berg Family | Elizabeth | Manufacturing | Active |
| Al-Rashid Family Office | Elizabeth | Investment | Active |

## UUID пользователей

Для отладки и SQL-запросов:

| Пользователь | UUID |
|--------------|------|
| Victoria Sterling | `a1111111-1111-1111-1111-111111111111` |
| Marcus Chen | `a2222222-2222-2222-2222-222222222222` |
| Elizabeth Blackwell | `a3333333-3333-3333-3333-333333333333` |
