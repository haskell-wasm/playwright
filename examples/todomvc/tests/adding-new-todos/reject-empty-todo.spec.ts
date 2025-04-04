// spec: Adding New Todos
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures';

test.describe('Adding New Todos', () => {
  test('should reject empty todo', async ({ page }) => {
    // Click in the "What needs to be done?" input field
    await page.locator('.new-todo').click();

    // Press Enter without typing any text
    await page.locator('.new-todo').press('Enter');

    // Verify no todo is added to the list and counter is not displayed
    await expect(page.locator('.todo-list')).not.toBeVisible();
    await expect(page.locator('.todo-count')).not.toBeVisible();
    
    // Verify input field remains focused
    await expect(page.locator('.new-todo')).toBeFocused();
  });
});
