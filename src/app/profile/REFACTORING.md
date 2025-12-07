# Profile Page Refactoring

Файл `page.tsx` разбит на модульную структуру для упрощения работы.

## ✅ Созданная структура:

```
src/app/profile/
├── page.tsx (главный файл - ~2900 строк - готов к рефакторингу)
├── types.ts (все TypeScript интерфейсы) ✅
├── utils.ts (утилитарные функции) ✅
├── constants.ts (константы: settingsLinks) ✅
└── components/
    ├── profile-header.tsx (шапка с баннером, аватаром, Quick Actions) ✅
    ├── profile-about.tsx (секция "О себе") ✅
    ├── profile-video.tsx (секция видео) ✅
    ├── profile-services.tsx (секция услуг) ✅
    ├── profile-experience.tsx (секция опыта работы) ✅
    ├── profile-education.tsx (секция образования) ✅
    ├── profile-skills.tsx (секция навыков) ✅
    ├── profile-credentials.tsx (секция сертификатов) ✅
    ├── profile-recommendations.tsx (секция рекомендаций) ✅
    ├── profile-contact.tsx (секция контактов) ✅
    ├── profile-sidebar.tsx (правая боковая панель) ✅
    ├── service-preview-dialog.tsx (модальное окно услуги) ✅
    └── recommendation-dialog.tsx (модальное окно рекомендации) ✅
```

## Следующие шаги для полного рефакторинга:

### 1. Создать компоненты для секций:
- `profile-services.tsx` - Услуги
- `profile-specialization.tsx` - Специализация
- `profile-experience.tsx` - Опыт работы
- `profile-education.tsx` - Образование
- `profile-skills.tsx` - Навыки
- `profile-credentials.tsx` - Сертификаты
- `profile-recommendations.tsx` - Рекомендации
- `profile-contact.tsx` - Контакты

### 2. Создать компоненты для форм:
- `forms/profile-edit-form.tsx`
- `forms/credential-form.tsx`
- `forms/experience-form.tsx`
- `forms/education-form.tsx`
- `forms/recommendation-form.tsx`

### 3. Создать компоненты для диалогов:
- `dialogs/service-preview-dialog.tsx`
- `dialogs/recommendation-dialog.tsx`

### 4. Создать хуки:
- `hooks/use-profile-data.ts` - загрузка данных профиля
- `hooks/use-profile-forms.ts` - управление формами

### 5. Переместить константы:
- `constants.ts` - settingsLinks и другие константы

## Преимущества такой структуры:

1. **Модульность** - каждый компонент отвечает за свою часть
2. **Переиспользуемость** - компоненты можно использовать в других местах
3. **Тестируемость** - легче писать тесты для маленьких компонентов
4. **Читаемость** - проще найти нужный код
5. **Производительность** - можно добавить React.memo для оптимизации

## Пример использования в page.tsx:

```tsx
// Импорты
import { ProfileHeader } from "./components/profile-header";
import { ProfileVideo } from "./components/profile-video";
import { ProfileAbout } from "./components/profile-about";
import { ProfileServices } from "./components/profile-services";
import { ProfileExperience } from "./components/profile-experience";
import { ProfileEducation } from "./components/profile-education";
import { ProfileSkills } from "./components/profile-skills";
import { ProfileCredentials } from "./components/profile-credentials";
import { ProfileRecommendations } from "./components/profile-recommendations";
import { ProfileContact } from "./components/profile-contact";
import { ProfileSidebar } from "./components/profile-sidebar";
import { ServicePreviewDialog } from "./components/service-preview-dialog";
import { RecommendationDialog } from "./components/recommendation-dialog";
import { getFullName, getInitials } from "./utils";
import { settingsLinks } from "./constants";
import type { Profile, Service, Recommendation } from "./types";

export default function ProfilePage() {
  // ... состояния и логика
  
  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
        {/* Left Column - Main Content */}
        <div className="space-y-6">
          <ProfileHeader 
            profile={profile}
            onEditProfile={() => setIsProfileSheetOpen(true)}
            onEditBanner={() => setIsBannerSheetOpen(true)}
            getFullName={getFullName}
            getInitials={getInitials}
          />
          
          <ProfileVideo 
            videoUrl={profile.video_url}
            onEdit={() => setIsProfileSheetOpen(true)}
          />
          
          <ProfileAbout 
            bio={profile.bio}
            onEdit={() => setIsProfileSheetOpen(true)}
          />
          
          <ProfileServices 
            services={servicesList}
            onServiceClick={setSelectedService}
          />
          
          <ProfileExperience
            experience={experienceList}
            onAdd={handleAddExperienceClick}
            onEdit={handleEditExperience}
          />
          
          <ProfileEducation
            education={educationList}
            onAdd={handleAddEducationClick}
            onEdit={handleEditEducation}
          />
          
          <ProfileSkills
            skills={skillsList}
            newSkill={newSkill}
            onNewSkillChange={setNewSkill}
            onAddSkill={handleAddSkill}
            onRemoveSkill={handleRemoveSkill}
          />
          
          <ProfileCredentials
            credentials={credentialsList}
            onAdd={() => setIsCredentialSheetOpen(true)}
          />
          
          <ProfileRecommendations
            recommendations={recommendationsList}
            onAdd={handleAddRecommendationClick}
            onEdit={handleEditRecommendation}
            onClick={setSelectedRecommendation}
          />
          
          <ProfileContact
            contact={profile}
            onEdit={() => setIsProfileSheetOpen(true)}
          />
        </div>

        {/* Right Column - Sidebar */}
        <ProfileSidebar
          profile={profile}
          hideProfileCompletionCard={hideProfileCompletionCard}
          settingsLinks={settingsLinks}
          onEditProfile={() => setIsProfileSheetOpen(true)}
          onHideProfileCompletionCard={handleHideProfileCompletionCard}
        />
      </div>

      {/* Dialogs */}
      <ServicePreviewDialog 
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
      
      <RecommendationDialog
        recommendation={selectedRecommendation}
        onClose={() => setSelectedRecommendation(null)}
      />
      
      {/* Forms/Sheets остаются в page.tsx */}
    </div>
  );
}
```

## Когда применять полный рефакторинг:

- Когда потребуется значительно изменить логику
- Когда будет время на тестирование после изменений
- Постепенно, компонент за компонентом
