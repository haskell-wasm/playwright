// spec: Completing Todos - should uncomplete todo
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures';

test.describe('Completing Todos', () => {
  test('should uncomplete todo', async ({ page }) => {
    // Add a todo: "Buy groceries"
    await page.locator('.new-todo').fill('Buy groceries');
    await page.locator('.new-todo').press('Enter');

    // Click the checkbox to complete it
    await page.locator('.todo-list li').first().locator('.toggle').check();

    // Click the checkbox again to uncomplete it
    await page.locator('.todo-list li').first().locator('.toggle').uncheck();

    // Verify checkbox becomes unchecked
    await expect(page.locator('.todo-list li').first().locator('.toggle')).not.toBeChecked();

    // Verify counter shows "1 item left"
    await expect(page.getByText('1 item left')).toBeVisible();
  });
});
