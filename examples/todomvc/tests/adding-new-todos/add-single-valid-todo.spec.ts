// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures';

test.describe('Adding New Todos', () => {
  test('should add single valid todo', async ({ page }) => {
    // Click in the "What needs to be done?" input field
    await page.locator('.new-todo').click();

    // Type "Buy groceries"
    await page.locator('.new-todo').fill('Buy groceries');

    // Press Enter key
    await page.locator('.new-todo').press('Enter');

    // Todo appears in the list with an unchecked checkbox
    await expect(page.locator('.todo-list li')).toHaveCount(1);

    // Todo text displays as "Buy groceries"
    await expect(page.locator('.todo-list li').first().locator('label')).toHaveText('Buy groceries');

    // Counter shows "1 item left"
    await expect(page.getByText('1 item left')).toBeVisible();

    // Input field is cleared and ready for next entry
    await expect(page.locator('.new-todo')).toHaveValue('');

    // "Mark all as complete" checkbox becomes visible
    await expect(page.locator('.toggle-all')).toBeVisible();
  });
});
