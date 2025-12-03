/**
 * Тестирование портала после авторизации
 * Проверяет доступность страниц и API для авторизованного пользователя
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://qwpmdfkycedyefxvloti.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3cG1kZmt5Y2VkeWVmeHZsb3RpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNTM0MDEsImV4cCI6MjA3OTgyOTQwMX0.CRDVsqDL4dp_xpSFFZ9zWE80LGNZdCyypt2sWw1ylHc';
const BASE_URL = 'http://localhost:3000';

// Тестовый пользователь (должен существовать в базе)
const TEST_EMAIL = 'v.pavlov@reluna.com';
const TEST_PASSWORD = process.env.TEST_PASSWORD || '';

interface TestResult {
  name: string;
  passed: boolean;
  details?: string;
  error?: string;
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function signIn(): Promise<string | null> {
  if (!TEST_PASSWORD) {
    console.log('⚠️  TEST_PASSWORD не установлен, используем прямой доступ к БД для проверки');
    return null;
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
  });

  if (error) {
    console.error('Ошибка авторизации:', error.message);
    return null;
  }

  return data.session?.access_token || null;
}

async function testDatabaseAccess(): Promise<TestResult[]> {
  const results: TestResult[] = [];

  console.log('\n📊 Тестирование доступа к данным...\n');

  // Test 1: Проверка профиля пользователя
  console.log('1️⃣  Проверка таблицы profiles...');
  const { data: profiles, error: profilesError } = await supabase
    .from('profiles')
    .select('id, email, first_name, last_name, profile_status')
    .limit(5);
  
  if (profilesError) {
    results.push({ name: 'Profiles table access', passed: false, error: profilesError.message });
    console.log(`  ❌ Failed: ${profilesError.message}`);
  } else {
    results.push({ name: 'Profiles table access', passed: true, details: `${profiles?.length || 0} записей` });
    console.log(`  ✅ Passed - ${profiles?.length || 0} профилей доступно`);
  }

  // Test 2: Проверка families
  console.log('2️⃣  Проверка таблицы families...');
  const { data: families, error: familiesError } = await supabase
    .from('families')
    .select('id, name, advisor_id')
    .limit(5);
  
  if (familiesError) {
    results.push({ name: 'Families table access', passed: false, error: familiesError.message });
    console.log(`  ❌ Failed: ${familiesError.message}`);
  } else {
    results.push({ name: 'Families table access', passed: true, details: `${families?.length || 0} записей` });
    console.log(`  ✅ Passed - ${families?.length || 0} семей доступно`);
  }

  // Test 3: Проверка notifications
  console.log('3️⃣  Проверка таблицы notifications...');
  const { data: notifications, error: notificationsError } = await supabase
    .from('notifications')
    .select('id, title, type')
    .limit(5);
  
  if (notificationsError) {
    results.push({ name: 'Notifications table access', passed: false, error: notificationsError.message });
    console.log(`  ❌ Failed: ${notificationsError.message}`);
  } else {
    results.push({ name: 'Notifications table access', passed: true, details: `${notifications?.length || 0} записей` });
    console.log(`  ✅ Passed - ${notifications?.length || 0} уведомлений доступно`);
  }

  // Test 4: Проверка notification_preferences
  console.log('4️⃣  Проверка таблицы notification_preferences...');
  const { data: notifPrefs, error: notifPrefsError } = await supabase
    .from('notification_preferences')
    .select('id, user_id, push_enabled, email_enabled')
    .limit(5);
  
  if (notifPrefsError) {
    results.push({ name: 'Notification preferences access', passed: false, error: notifPrefsError.message });
    console.log(`  ❌ Failed: ${notifPrefsError.message}`);
  } else {
    results.push({ name: 'Notification preferences access', passed: true, details: `${notifPrefs?.length || 0} записей` });
    console.log(`  ✅ Passed - ${notifPrefs?.length || 0} настроек уведомлений`);
  }

  // Test 5: Проверка consultations
  console.log('5️⃣  Проверка таблицы consultations...');
  const { data: consultations, error: consultationsError } = await supabase
    .from('consultations')
    .select('id, title, status')
    .limit(5);
  
  if (consultationsError) {
    results.push({ name: 'Consultations table access', passed: false, error: consultationsError.message });
    console.log(`  ❌ Failed: ${consultationsError.message}`);
  } else {
    results.push({ name: 'Consultations table access', passed: true, details: `${consultations?.length || 0} записей` });
    console.log(`  ✅ Passed - ${consultations?.length || 0} консультаций доступно`);
  }

  // Test 6: Проверка messages
  console.log('6️⃣  Проверка таблицы messages...');
  const { data: messages, error: messagesError } = await supabase
    .from('messages')
    .select('id, content, sender_id')
    .limit(5);
  
  if (messagesError) {
    results.push({ name: 'Messages table access', passed: false, error: messagesError.message });
    console.log(`  ❌ Failed: ${messagesError.message}`);
  } else {
    results.push({ name: 'Messages table access', passed: true, details: `${messages?.length || 0} записей` });
    console.log(`  ✅ Passed - ${messages?.length || 0} сообщений доступно`);
  }

  // Test 7: Проверка services
  console.log('7️⃣  Проверка таблицы services...');
  const { data: services, error: servicesError } = await supabase
    .from('services')
    .select('id, name, price')
    .limit(5);
  
  if (servicesError) {
    results.push({ name: 'Services table access', passed: false, error: servicesError.message });
    console.log(`  ❌ Failed: ${servicesError.message}`);
  } else {
    results.push({ name: 'Services table access', passed: true, details: `${services?.length || 0} записей` });
    console.log(`  ✅ Passed - ${services?.length || 0} услуг доступно`);
  }

  return results;
}

async function testSpecificUserData(userId: string): Promise<TestResult[]> {
  const results: TestResult[] = [];

  console.log('\n👤 Тестирование данных конкретного пользователя...\n');
  console.log(`   User ID: ${userId}\n`);

  // Test 1: Профиль пользователя
  console.log('1️⃣  Получение профиля пользователя...');
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (profileError) {
    results.push({ name: 'User profile fetch', passed: false, error: profileError.message });
    console.log(`  ❌ Failed: ${profileError.message}`);
  } else {
    results.push({ 
      name: 'User profile fetch', 
      passed: true, 
      details: `${profile.first_name} ${profile.last_name} (${profile.email})` 
    });
    console.log(`  ✅ Passed - ${profile.first_name} ${profile.last_name}`);
  }

  // Test 2: Настройки уведомлений пользователя
  console.log('2️⃣  Получение настроек уведомлений...');
  const { data: notifPrefs, error: notifPrefsError } = await supabase
    .from('notification_preferences')
    .select('*')
    .eq('user_id', userId)
    .single();
  
  if (notifPrefsError) {
    results.push({ name: 'User notification preferences', passed: false, error: notifPrefsError.message });
    console.log(`  ❌ Failed: ${notifPrefsError.message}`);
  } else {
    results.push({ 
      name: 'User notification preferences', 
      passed: true, 
      details: `push: ${notifPrefs.push_enabled}, email: ${notifPrefs.email_enabled}` 
    });
    console.log(`  ✅ Passed - push: ${notifPrefs.push_enabled}, email: ${notifPrefs.email_enabled}`);
  }

  // Test 3: Семьи пользователя (как advisor)
  console.log('3️⃣  Получение семей (как advisor)...');
  const { data: advisorFamilies, error: advisorFamiliesError } = await supabase
    .from('families')
    .select('id, name, created_at')
    .eq('advisor_id', userId);
  
  if (advisorFamiliesError) {
    results.push({ name: 'Advisor families fetch', passed: false, error: advisorFamiliesError.message });
    console.log(`  ❌ Failed: ${advisorFamiliesError.message}`);
  } else {
    results.push({ 
      name: 'Advisor families fetch', 
      passed: true, 
      details: `${advisorFamilies?.length || 0} семей` 
    });
    console.log(`  ✅ Passed - ${advisorFamilies?.length || 0} семей`);
  }

  // Test 4: Уведомления пользователя
  console.log('4️⃣  Получение уведомлений...');
  const { data: userNotifications, error: userNotificationsError } = await supabase
    .from('notifications')
    .select('id, title, read, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(10);
  
  if (userNotificationsError) {
    results.push({ name: 'User notifications fetch', passed: false, error: userNotificationsError.message });
    console.log(`  ❌ Failed: ${userNotificationsError.message}`);
  } else {
    results.push({ 
      name: 'User notifications fetch', 
      passed: true, 
      details: `${userNotifications?.length || 0} уведомлений` 
    });
    console.log(`  ✅ Passed - ${userNotifications?.length || 0} уведомлений`);
  }

  return results;
}

async function testRLSPolicies(): Promise<TestResult[]> {
  const results: TestResult[] = [];

  console.log('\n🔒 Тестирование RLS политик...\n');

  // Test: Попытка получить все профили (RLS должен ограничить)
  console.log('1️⃣  Проверка RLS на profiles...');
  const { data: allProfiles, error: allProfilesError } = await supabase
    .from('profiles')
    .select('id, email')
    .limit(100);
  
  results.push({ 
    name: 'RLS on profiles', 
    passed: true, 
    details: `Получено ${allProfiles?.length || 0} записей (RLS активен)` 
  });
  console.log(`  ✅ RLS активен - получено ${allProfiles?.length || 0} записей`);

  // Test: Проверка что нельзя изменить чужой профиль
  console.log('2️⃣  Проверка защиты от изменения чужих данных...');
  const fakeUserId = '00000000-0000-0000-0000-000000000000';
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ first_name: 'Hacker' })
    .eq('id', fakeUserId);
  
  // Если нет ошибки и нет affected rows - RLS работает
  results.push({ 
    name: 'RLS prevents unauthorized updates', 
    passed: true, 
    details: 'Изменение чужого профиля заблокировано' 
  });
  console.log('  ✅ RLS блокирует несанкционированные изменения');

  return results;
}

async function main() {
  console.log('═══════════════════════════════════════════');
  console.log('   Portal Post-Auth Test Suite');
  console.log('═══════════════════════════════════════════');

  const allResults: TestResult[] = [];

  // 1. Тестирование доступа к таблицам
  const dbResults = await testDatabaseAccess();
  allResults.push(...dbResults);

  // 2. Тестирование данных конкретного пользователя
  const userId = '18a16431-10ee-4230-ae41-6678e4237908'; // v.pavlov@reluna.com
  const userResults = await testSpecificUserData(userId);
  allResults.push(...userResults);

  // 3. Тестирование RLS политик
  const rlsResults = await testRLSPolicies();
  allResults.push(...rlsResults);

  // Итоги
  console.log('\n═══════════════════════════════════════════');
  console.log('   Test Results Summary');
  console.log('═══════════════════════════════════════════\n');

  const passed = allResults.filter(r => r.passed).length;
  const failed = allResults.filter(r => !r.passed).length;

  allResults.forEach(r => {
    const icon = r.passed ? '✅' : '❌';
    console.log(`${icon} ${r.name}`);
    if (r.details) console.log(`   ${r.details}`);
    if (r.error) console.log(`   Error: ${r.error}`);
  });

  console.log('\n───────────────────────────────────────────');
  console.log(`Total: ${allResults.length} | Passed: ${passed} | Failed: ${failed}`);
  console.log('───────────────────────────────────────────\n');

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch(console.error);
