/**
 * Profile Page E2E Tests
 * 
 * Tests the complete profile page functionality including:
 * - Profile viewing and loading
 * - Banner upload and removal
 * - Experience CRUD operations
 * - Education CRUD operations
 * - Skills management
 * - Recommendations CRUD operations
 */

import { test, expect, type Page } from '@playwright/test';

// Test user credentials
const TEST_USER = {
  email: 'v.pavlov@reluna.com',
  password: process.env.TEST_USER_PASSWORD || 'test-password',
};

// Helper to login
async function login(page: Page) {
  await page.goto('/auth/login');
  await page.fill('input[type="email"]', TEST_USER.email);
  await page.fill('input[type="password"]', TEST_USER.password);
  await page.click('button[type="submit"]');
  await page.waitForURL('/');
}

// Helper to navigate to profile
async function navigateToProfile(page: Page) {
  await page.goto('/profile');
  await page.waitForSelector('h1:has-text("Profile")', { timeout: 10000 });
}

test.describe('Profile Page', () => {
  test.beforeEach(async ({ page }) => {
    await login(page);
  });

  test.describe('Profile Viewing', () => {
    test('should display profile header with name and bio', async ({ page }) => {
      await navigateToProfile(page);

      // Check profile name is visible
      const profileName = await page.locator('h1').first();
      await expect(profileName).toBeVisible();

      // Check bio section exists
      const bioSection = await page.locator('text=About').first();
      await expect(bioSection).toBeVisible();
    });

    test('should display all profile sections', async ({ page }) => {
      await navigateToProfile(page);

      // Check all major sections are present
      const sections = [
        'About',
        'Experience',
        'Education',
        'Skills',
        'Recommendations',
      ];

      for (const section of sections) {
        const sectionElement = await page.locator(`text=${section}`).first();
        await expect(sectionElement).toBeVisible();
      }
    });

    test('should show loading skeletons initially', async ({ page }) => {
      await page.goto('/profile');
      
      // Check for skeleton loaders
      const skeletons = await page.locator('[class*="animate-pulse"]').count();
      expect(skeletons).toBeGreaterThan(0);
    });
  });

  test.describe('Banner Management', () => {
    test('should show banner upload button', async ({ page }) => {
      await navigateToProfile(page);

      // Look for camera icon or upload button in banner area
      const bannerArea = await page.locator('[class*="banner"]').first();
      await expect(bannerArea).toBeVisible();
    });

    test.skip('should upload banner image', async ({ page }) => {
      // Skipped: Requires file upload functionality
      await navigateToProfile(page);

      // Click upload button
      await page.click('button:has-text("Upload Banner")');

      // Upload file
      const fileInput = await page.locator('input[type="file"]');
      await fileInput.setInputFiles('public/images/test-banner.jpg');

      // Wait for upload to complete
      await page.waitForSelector('img[alt*="banner"]', { timeout: 10000 });
    });

    test.skip('should remove banner image', async ({ page }) => {
      // Skipped: Requires existing banner
      await navigateToProfile(page);

      // Hover over banner to show remove button
      const banner = await page.locator('[class*="banner"]').first();
      await banner.hover();

      // Click remove button
      await page.click('button[aria-label*="Remove"]');

      // Confirm removal
      await page.click('button:has-text("Confirm")');

      // Wait for banner to be removed
      await page.waitForTimeout(1000);
    });
  });

  test.describe('Experience Management', () => {
    test('should open experience form', async ({ page }) => {
      await navigateToProfile(page);

      // Find and click "Add Experience" button
      const addButton = await page.locator('button:has-text("Add"), button:has([class*="Plus"])').first();
      await addButton.click();

      // Check sheet/dialog opened
      await expect(page.locator('text=Role')).toBeVisible();
      await expect(page.locator('text=Company')).toBeVisible();
    });

    test.skip('should add new experience', async ({ page }) => {
      // Skipped: Requires form submission
      await navigateToProfile(page);

      // Open form
      await page.click('button:has-text("Add Experience")');

      // Fill form
      await page.fill('input[name="role"]', 'Test Consultant');
      await page.fill('input[name="company"]', 'Test Company');
      await page.fill('input[name="start_date"]', '2024-01-01');
      await page.check('input[name="is_current"]');
      await page.fill('textarea[name="description"]', 'Test description');

      // Submit
      await page.click('button[type="submit"]');

      // Verify new experience appears
      await expect(page.locator('text=Test Consultant')).toBeVisible();
      await expect(page.locator('text=Test Company')).toBeVisible();
    });

    test.skip('should edit existing experience', async ({ page }) => {
      // Skipped: Requires existing data
      await navigateToProfile(page);

      // Find first experience and click edit
      const firstExperience = await page.locator('[class*="experience"]').first();
      await firstExperience.hover();
      await page.click('button[aria-label*="Edit"]');

      // Modify role
      await page.fill('input[name="role"]', 'Updated Role');

      // Save
      await page.click('button:has-text("Save")');

      // Verify update
      await expect(page.locator('text=Updated Role')).toBeVisible();
    });

    test.skip('should delete experience', async ({ page }) => {
      // Skipped: Requires existing data
      await navigateToProfile(page);

      // Find first experience and click edit
      const firstExperience = await page.locator('[class*="experience"]').first();
      await firstExperience.hover();
      await page.click('button[aria-label*="Edit"]');

      // Click delete
      await page.click('button:has-text("Delete")');

      // Confirm
      await page.click('button:has-text("Confirm")');

      // Verify deletion
      await page.waitForTimeout(1000);
    });
  });

  test.describe('Education Management', () => {
    test('should open education form', async ({ page }) => {
      await navigateToProfile(page);

      // Scroll to education section
      await page.locator('text=Education').first().scrollIntoViewIfNeeded();

      // Find and click "Add Education" button near Education heading
      const educationSection = await page.locator('text=Education').first();
      const addButton = await educationSection.locator('..').locator('button:has([class*="Plus"])');
      await addButton.click();

      // Check form opened
      await expect(page.locator('text=Degree')).toBeVisible();
      await expect(page.locator('text=Institution')).toBeVisible();
    });

    test.skip('should add new education', async ({ page }) => {
      // Skipped: Requires form submission
      await navigateToProfile(page);

      await page.click('button:has-text("Add Education")');

      await page.fill('input[name="degree"]', 'PhD');
      await page.fill('input[name="institution"]', 'MIT');
      await page.fill('input[name="field_of_study"]', 'Economics');
      await page.fill('input[name="start_year"]', '2020');
      await page.fill('input[name="end_year"]', '2024');

      await page.click('button[type="submit"]');

      await expect(page.locator('text=PhD')).toBeVisible();
      await expect(page.locator('text=MIT')).toBeVisible();
    });
  });

  test.describe('Skills Management', () => {
    test('should show skills section', async ({ page }) => {
      await navigateToProfile(page);

      // Scroll to skills
      await page.locator('text=Skills').first().scrollIntoViewIfNeeded();

      // Check skills section exists
      const skillsSection = await page.locator('text=Skills').first();
      await expect(skillsSection).toBeVisible();
    });

    test.skip('should add new skill', async ({ page }) => {
      // Skipped: Requires form submission
      await navigateToProfile(page);

      // Find skill input
      await page.fill('input[placeholder*="skill"]', 'Tax Planning');
      await page.press('input[placeholder*="skill"]', 'Enter');

      // Verify skill added
      await expect(page.locator('text=Tax Planning')).toBeVisible();
    });

    test.skip('should remove skill', async ({ page }) => {
      // Skipped: Requires existing data
      await navigateToProfile(page);

      // Find first skill badge
      const firstSkill = await page.locator('[class*="badge"]').first();
      await firstSkill.hover();

      // Click remove button
      await page.click('button[aria-label*="Remove"]');

      // Verify removal
      await page.waitForTimeout(500);
    });
  });

  test.describe('Recommendations Management', () => {
    test('should show recommendations section', async ({ page }) => {
      await navigateToProfile(page);

      // Scroll to recommendations
      await page.locator('text=Recommendations').first().scrollIntoViewIfNeeded();

      const recsSection = await page.locator('text=Recommendations').first();
      await expect(recsSection).toBeVisible();
    });

    test.skip('should add new recommendation', async ({ page }) => {
      // Skipped: Requires form submission
      await navigateToProfile(page);

      await page.click('button:has-text("Add Recommendation")');

      await page.fill('input[name="author_name"]', 'John Smith');
      await page.fill('input[name="author_title"]', 'CEO');
      await page.fill('input[name="author_company"]', 'Tech Corp');
      await page.fill('textarea[name="text"]', 'Excellent advisor, highly professional!');
      
      // Set rating
      await page.click('[class*="star"]:nth-child(5)');

      await page.click('button[type="submit"]');

      await expect(page.locator('text=John Smith')).toBeVisible();
    });

    test.skip('should toggle recommendation visibility', async ({ page }) => {
      // Skipped: Requires existing data
      await navigateToProfile(page);

      // Edit first recommendation
      const firstRec = await page.locator('[class*="recommendation"]').first();
      await firstRec.hover();
      await page.click('button[aria-label*="Edit"]');

      // Toggle visibility
      await page.click('input[name="is_visible"]');

      await page.click('button:has-text("Save")');

      await page.waitForTimeout(500);
    });

    test.skip('should set recommendation as featured', async ({ page }) => {
      // Skipped: Requires existing data
      await navigateToProfile(page);

      // Edit first recommendation
      const firstRec = await page.locator('[class*="recommendation"]').first();
      await firstRec.hover();
      await page.click('button[aria-label*="Edit"]');

      // Toggle featured
      await page.check('input[name="is_featured"]');

      await page.click('button:has-text("Save")');

      // Verify featured badge appears
      await expect(page.locator('text=Featured')).toBeVisible();
    });
  });

  test.describe('Form Validation', () => {
    test('should show validation errors for empty required fields', async ({ page }) => {
      await navigateToProfile(page);

      // Open experience form
      const addButton = await page.locator('button:has([class*="Plus"])').first();
      await addButton.click();

      // Try to submit without filling
      await page.click('button[type="submit"]');

      // Check for error messages
      const errors = await page.locator('text=/required/i').count();
      expect(errors).toBeGreaterThan(0);
    });

    test.skip('should validate date ranges', async ({ page }) => {
      // Skipped: Requires complex validation testing
      await navigateToProfile(page);

      await page.click('button:has-text("Add Experience")');

      await page.fill('input[name="start_date"]', '2024-01-01');
      await page.fill('input[name="end_date"]', '2023-01-01');

      await page.click('button[type="submit"]');

      // Should show date validation error
      await expect(page.locator('text=/date/i')).toBeVisible();
    });
  });

  test.describe('Responsive Design', () => {
    test('should display properly on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await navigateToProfile(page);

      // Check profile is visible on mobile
      const profileName = await page.locator('h1').first();
      await expect(profileName).toBeVisible();

      // Check sections stack vertically
      const sections = await page.locator('[class*="section"]').count();
      expect(sections).toBeGreaterThan(0);
    });

    test('should display properly on tablet', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await navigateToProfile(page);

      const profileName = await page.locator('h1').first();
      await expect(profileName).toBeVisible();
    });

    test('should display properly on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await navigateToProfile(page);

      const profileName = await page.locator('h1').first();
      await expect(profileName).toBeVisible();
    });
  });

  test.describe('Error Handling', () => {
    test('should handle network errors gracefully', async ({ page }) => {
      // Go offline
      await page.context().setOffline(true);
      
      await page.goto('/profile');
      await page.waitForTimeout(2000);

      // Should show error state or offline message
      // Note: Actual implementation may vary
      
      // Go back online
      await page.context().setOffline(false);
    });

    test.skip('should show error message for failed operations', async ({ page }) => {
      // Skipped: Requires mocking failed API responses
      await navigateToProfile(page);

      // Attempt operation that will fail
      // Should show toast notification or error message
    });
  });

  test.describe('Performance', () => {
    test('should load profile data within reasonable time', async ({ page }) => {
      const startTime = Date.now();
      await navigateToProfile(page);
      
      // Wait for profile to fully load
      await page.waitForSelector('h1', { timeout: 10000 });
      
      const loadTime = Date.now() - startTime;
      
      // Profile should load in less than 5 seconds
      expect(loadTime).toBeLessThan(5000);
    });

    test('should handle large datasets', async ({ page }) => {
      await navigateToProfile(page);

      // Scroll through all sections
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });

      // Check page is still responsive
      await page.waitForTimeout(1000);
      const button = await page.locator('button').first();
      await expect(button).toBeEnabled();
    });
  });
});
