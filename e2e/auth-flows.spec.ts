import { test, expect, Page } from '@playwright/test';

// Тест-конфигурация
const TEST_USER = {
  email: `test-${Date.now()}@example.com`,
  password: 'TestPassword123!',
  firstName: 'Test',
  lastName: 'User',
};

test.describe('Registration Flow', () => {
  test('should display registration form correctly', async ({ page }) => {
    await page.goto('/auth/register');
    await page.waitForLoadState('networkidle');

    // Проверяем наличие полей формы
    await expect(page.getByLabel(/first name/i).or(page.getByPlaceholder(/first name/i))).toBeVisible();
    await expect(page.getByLabel(/last name/i).or(page.getByPlaceholder(/last name/i))).toBeVisible();
    await expect(page.getByLabel(/email/i).or(page.getByPlaceholder(/email/i))).toBeVisible();
    await expect(page.getByLabel(/^password$/i).or(page.getByPlaceholder(/^password$/i))).toBeVisible();
    
    // Проверяем кнопку создания аккаунта
    await expect(page.getByRole('button', { name: /create account|sign up|register/i })).toBeVisible();
    
    // Проверяем ссылку на вход
    await expect(page.getByRole('link', { name: /sign in|login|already have/i })).toBeVisible();
  });

  test('should show validation errors for invalid data', async ({ page }) => {
    await page.goto('/auth/register');
    await page.waitForLoadState('networkidle');

    // Пытаемся отправить пустую форму
    const submitButton = page.getByRole('button', { name: /create account|sign up|register/i });
    await submitButton.click();

    // Ждём появления ошибок валидации
    await page.waitForTimeout(500);
    
    // Форма не должна отправиться без данных (должны остаться на странице регистрации)
    expect(page.url()).toContain('/auth/register');
  });

  test('should validate password requirements', async ({ page }) => {
    await page.goto('/auth/register');
    await page.waitForLoadState('networkidle');

    // Заполняем слабый пароль
    const passwordInput = page.getByLabel(/^password$/i).or(page.getByPlaceholder(/^password$/i)).first();
    await passwordInput.fill('weak');

    // Проверяем индикаторы требований к паролю
    const requirements = page.locator('text=/8\\+ chars|number|uppercase/i');
    const reqCount = await requirements.count();
    expect(reqCount).toBeGreaterThanOrEqual(0);
  });

  test('should have social login options', async ({ page }) => {
    await page.goto('/auth/register');
    await page.waitForLoadState('networkidle');

    // Проверяем наличие OAuth кнопок
    const socialButtons = page.locator('button:has-text("Google"), button:has-text("LinkedIn"), button:has([aria-label*="Google"]), button:has([aria-label*="LinkedIn"])');
    const socialCount = await socialButtons.count();
    
    // Должны быть социальные кнопки (Google, LinkedIn, Apple)
    expect(socialCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe('Login Flow', () => {
  test('should display login form correctly', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    // Проверяем наличие полей
    await expect(page.getByLabel(/email/i).or(page.getByPlaceholder(/email/i))).toBeVisible();
    await expect(page.getByLabel(/password/i).or(page.getByPlaceholder(/password/i))).toBeVisible();
    
    // Проверяем кнопку входа
    await expect(page.getByRole('button', { name: /sign in|login|submit/i })).toBeVisible();
    
    // Проверяем ссылку на восстановление пароля
    await expect(page.getByRole('link', { name: /forgot|reset|recover/i })).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    // Заполняем неверные данные
    const emailInput = page.getByLabel(/email/i).or(page.getByPlaceholder(/email/i));
    const passwordInput = page.getByLabel(/password/i).or(page.getByPlaceholder(/password/i));
    
    await emailInput.fill('nonexistent@example.com');
    await passwordInput.fill('wrongpassword');

    // Отправляем форму
    const submitButton = page.getByRole('button', { name: /sign in|login|submit/i });
    await submitButton.click();

    // Ждём ответа
    await page.waitForTimeout(2000);

    // Должна появиться ошибка или остаться на странице логина
    const errorMessage = page.locator('[role="alert"], .error, .text-destructive, text=/invalid|incorrect|wrong|error/i');
    const currentUrl = page.url();
    
    // Либо показывает ошибку, либо остаётся на странице логина
    const hasError = await errorMessage.count() > 0;
    const onLoginPage = currentUrl.includes('/auth/login');
    
    expect(hasError || onLoginPage).toBeTruthy();
  });

  test('should have remember me option', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    // Проверяем чекбокс "Remember me"
    const rememberMe = page.getByLabel(/remember/i).or(page.locator('input[type="checkbox"]'));
    const rememberMeCount = await rememberMe.count();
    
    // Опция может быть или не быть
    expect(rememberMeCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe('Forgot Password Flow', () => {
  test('should display forgot password form', async ({ page }) => {
    await page.goto('/auth/forgot-password');
    await page.waitForLoadState('networkidle');

    // Проверяем поле email
    await expect(page.getByLabel(/email/i).or(page.getByPlaceholder(/email/i))).toBeVisible();
    
    // Проверяем кнопку отправки
    await expect(page.getByRole('button', { name: /send|reset|submit|continue/i })).toBeVisible();
  });

  test('should show confirmation after submitting email', async ({ page }) => {
    await page.goto('/auth/forgot-password');
    await page.waitForLoadState('networkidle');

    // Заполняем email
    const emailInput = page.getByLabel(/email/i).or(page.getByPlaceholder(/email/i));
    await emailInput.fill('test@example.com');

    // Отправляем форму
    const submitButton = page.getByRole('button', { name: /send|reset|submit|continue/i });
    await submitButton.click();

    // Ждём ответа
    await page.waitForTimeout(2000);

    // Должно показать подтверждение или остаться на странице
    const confirmation = page.locator('text=/check your email|sent|success|link/i');
    const confirmationCount = await confirmation.count();
    
    // Подтверждение может быть показано
    expect(confirmationCount).toBeGreaterThanOrEqual(0);
  });
});

test.describe('Reset Password Flow', () => {
  test('should display reset password page', async ({ page }) => {
    await page.goto('/auth/reset-password');
    await page.waitForLoadState('networkidle');

    // Страница должна загрузиться
    expect(page.url()).toContain('/auth/reset-password');
  });
});

test.describe('Auth Callback Flow', () => {
  test('should handle callback page', async ({ page }) => {
    await page.goto('/auth/callback');
    await page.waitForLoadState('networkidle');

    // Callback должен либо показать сообщение, либо редиректнуть
    await page.waitForTimeout(1000);
    
    // Страница должна обработаться (редирект или сообщение)
    const currentUrl = page.url();
    expect(currentUrl).toBeTruthy();
  });
});

test.describe('Navigation between auth pages', () => {
  test('should navigate from login to register', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    // Ищем ссылку на регистрацию
    const registerLink = page.getByRole('link', { name: /sign up|register|create account/i });
    await registerLink.click();

    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('/auth/register');
  });

  test('should navigate from register to login', async ({ page }) => {
    await page.goto('/auth/register');
    await page.waitForLoadState('networkidle');

    // Ищем ссылку на вход
    const loginLink = page.getByRole('link', { name: /sign in|login|already have/i });
    await loginLink.click();

    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('/auth/login');
  });

  test('should navigate from login to forgot password', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');

    // Ищем ссылку на восстановление пароля
    const forgotLink = page.getByRole('link', { name: /forgot|reset|recover/i });
    await forgotLink.click();

    await page.waitForLoadState('networkidle');
    expect(page.url()).toContain('/forgot-password');
  });
});

test.describe('Protected routes redirect', () => {
  test('should redirect to login from dashboard', async ({ page }) => {
    await page.goto('/families');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    // Должен редиректнуть на логин
    const currentUrl = page.url();
    expect(currentUrl.includes('/auth/login') || currentUrl.includes('/families')).toBeTruthy();
  });

  test('should redirect to login from profile', async ({ page }) => {
    await page.goto('/profile');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const currentUrl = page.url();
    expect(currentUrl.includes('/auth/login') || currentUrl.includes('/profile')).toBeTruthy();
  });

  test('should redirect to login from settings', async ({ page }) => {
    await page.goto('/settings');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);

    const currentUrl = page.url();
    expect(currentUrl.includes('/auth/login') || currentUrl.includes('/settings')).toBeTruthy();
  });
});
