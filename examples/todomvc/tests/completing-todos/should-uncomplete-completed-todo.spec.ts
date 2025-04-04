// spec: specs/basic-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures';

test.describe('Completing Todos', () => {
  test('should-uncomplete-completed-todo', async ({ page }) => {
    // 1. Add a todo 'Buy groceries' and mark it as complete
    await page.locator('.new-todo').fill('Buy groceries');
    await page.locator('.new-todo').press('Enter');

    await page.locator('.todo-list li').filter({ hasText: 'Buy groceries' }).locator('.toggle').check();
    await expect(page.locator('.todo-count')).toHaveText('0 items left');

    // 2. Click the checkbox again to uncomplete it
    await page.locator('.todo-list li').filter({ hasText: 'Buy groceries' }).locator('.toggle').uncheck();

    await expect(page.locator('.todo-list li').filter({ hasText: 'Buy groceries' }).locator('.toggle')).not.toBeChecked();
    await expect(page.locator('.todo-count')).toHaveText('1 item left');
    await expect(page.locator('.clear-completed')).not.toBeVisible();
  });
});
