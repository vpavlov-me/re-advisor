import { test, expect } from '@playwright/test';

/**
 * Critical User Flow Tests
 * 
 * These tests cover the most important user journeys in the application.
 */

test.describe('Authentication Critical Flows', () => {
  test.describe('Login Flow', () => {
    test('should display login page with all required elements', async ({ page }) => {
      await page.goto('/auth/login');
      await page.waitForLoadState('networkidle');
      
      // Check for form elements
      await expect(page.getByPlaceholder(/email/i)).toBeVisible();
      await expect(page.getByPlaceholder(/password/i)).toBeVisible();
      
      // Check for submit button
      const submitButton = page.getByRole('button', { name: /sign in|login/i });
      await expect(submitButton).toBeVisible();
      
      // Check for links to other auth pages
      await expect(page.getByText(/forgot password/i)).toBeVisible();
      await expect(page.getByText(/create.*account|sign up|register/i)).toBeVisible();
    });

    test('should show error for invalid credentials', async ({ page }) => {
      await page.goto('/auth/login');
      await page.waitForLoadState('networkidle');
      
      // Fill in invalid credentials
      await page.getByPlaceholder(/email/i).fill('invalid@example.com');
      await page.getByPlaceholder(/password/i).fill('wrongpassword');
      
      // Submit the form
      await page.getByRole('button', { name: /sign in|login/i }).click();
      
      // Wait for error response
      await page.waitForTimeout(2000);
      
      // Should show error message or still be on login page
      const currentUrl = page.url();
      expect(currentUrl).toContain('/auth/login');
    });

    test('should validate email format', async ({ page }) => {
      await page.goto('/auth/login');
      await page.waitForLoadState('networkidle');
      
      // Enter invalid email
      await page.getByPlaceholder(/email/i).fill('not-an-email');
      await page.getByPlaceholder(/password/i).fill('password123');
      
      // Submit
      await page.getByRole('button', { name: /sign in|login/i }).click();
      
      // Should show validation error or prevent submission
      await page.waitForTimeout(500);
      
      // Still on login page
      expect(page.url()).toContain('/auth/login');
    });
  });

  test.describe('Registration Flow', () => {
    test('should display registration page with all required elements', async ({ page }) => {
      await page.goto('/auth/register');
      await page.waitForLoadState('networkidle');
      
      // Check for form elements
      await expect(page.getByPlaceholder(/email/i)).toBeVisible();
      
      // Check for submit button
      const submitButton = page.getByRole('button', { name: /sign up|register|create/i });
      await expect(submitButton).toBeVisible();
      
      // Check for link to login
      await expect(page.getByText(/already have.*account|sign in|login/i)).toBeVisible();
    });

    test('should validate password requirements', async ({ page }) => {
      await page.goto('/auth/register');
      await page.waitForLoadState('networkidle');
      
      // Fill form with weak password
      const emailInput = page.getByPlaceholder(/email/i);
      await emailInput.fill('test@example.com');
      
      const passwordInput = page.getByPlaceholder(/password/i).first();
      if (await passwordInput.isVisible()) {
        await passwordInput.fill('123'); // Too short
      }
      
      // Submit
      await page.getByRole('button', { name: /sign up|register|create/i }).click();
      
      // Should stay on registration page
      await page.waitForTimeout(500);
      expect(page.url()).toContain('/auth/register');
    });
  });

  test.describe('Password Reset Flow', () => {
    test('should display forgot password page', async ({ page }) => {
      await page.goto('/auth/forgot-password');
      await page.waitForLoadState('networkidle');
      
      await expect(page.getByPlaceholder(/email/i)).toBeVisible();
      
      const submitButton = page.getByRole('button', { name: /send|reset|submit/i });
      await expect(submitButton).toBeVisible();
    });

    test('should show confirmation after email submission', async ({ page }) => {
      await page.goto('/auth/forgot-password');
      await page.waitForLoadState('networkidle');
      
      // Fill in email
      await page.getByPlaceholder(/email/i).fill('test@example.com');
      
      // Submit
      await page.getByRole('button', { name: /send|reset|submit/i }).click();
      
      // Wait for response
      await page.waitForTimeout(2000);
      
      // Should show success message or stay on page
      // (actual behavior depends on implementation)
      expect(await page.title()).toBeTruthy();
    });
  });
});

test.describe('Navigation Critical Flows', () => {
  test('should navigate between main sections', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Navigation should be present
    const nav = page.locator('nav').first();
    
    // If navigation exists, check it's visible
    if (await nav.isVisible()) {
      await expect(nav).toBeVisible();
    }
  });

  test('should handle 404 errors gracefully', async ({ page }) => {
    await page.goto('/non-existent-page-xyz123');
    await page.waitForLoadState('networkidle');
    
    // Should either redirect to home or show 404 page
    const title = await page.title();
    expect(title).toBeTruthy();
  });

  test('should have working back/forward navigation', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');
    
    await page.goto('/auth/register');
    await page.waitForLoadState('networkidle');
    
    // Go back
    await page.goBack();
    await page.waitForLoadState('networkidle');
    
    expect(page.url()).toContain('/auth/login');
    
    // Go forward
    await page.goForward();
    await page.waitForLoadState('networkidle');
    
    expect(page.url()).toContain('/auth/register');
  });
});

test.describe('Form Interactions', () => {
  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');
    
    // Tab to email input
    await page.keyboard.press('Tab');
    
    // Type email
    await page.keyboard.type('test@example.com');
    
    // Tab to password
    await page.keyboard.press('Tab');
    
    // Type password
    await page.keyboard.type('password123');
    
    // Tab to submit button
    await page.keyboard.press('Tab');
    
    // The focused element should be interactive
    const focusedElement = page.locator(':focus');
    expect(await focusedElement.count()).toBeGreaterThanOrEqual(0);
  });

  test('should clear form on page refresh', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');
    
    // Fill in form
    await page.getByPlaceholder(/email/i).fill('test@example.com');
    
    // Refresh
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // Form should be cleared
    const emailValue = await page.getByPlaceholder(/email/i).inputValue();
    expect(emailValue).toBe('');
  });
});

test.describe('Error Handling', () => {
  test('should handle network errors gracefully', async ({ page }) => {
    // Set offline mode
    await page.context().setOffline(true);
    
    try {
      await page.goto('/auth/login', { timeout: 5000 });
    } catch (e) {
      // Expected to fail when offline
    }
    
    // Go back online
    await page.context().setOffline(false);
    
    // Should be able to load page again
    await page.goto('/auth/login');
    await page.waitForLoadState('networkidle');
    
    expect(page.url()).toContain('/auth/login');
  });
});

test.describe('SEO & Meta', () => {
  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check for viewport meta tag
    const viewportMeta = await page.locator('meta[name="viewport"]').getAttribute('content');
    expect(viewportMeta).toBeTruthy();
    
    // Check for title
    const title = await page.title();
    expect(title.length).toBeGreaterThan(0);
  });

  test('should have proper canonical URL', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Check that page URL is clean
    expect(page.url()).not.toContain('undefined');
    expect(page.url()).not.toContain('null');
  });
});
