// spec: specs/basic-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures';

test.describe('Deleting Todos', () => {
  test('should-clear-all-completed-todos', async ({ page }) => {
    // 1. Add three todos: 'Task 1', 'Task 2', 'Task 3'
    await page.locator('.new-todo').fill('Task 1');
    await page.locator('.new-todo').press('Enter');
    await page.locator('.new-todo').fill('Task 2');
    await page.locator('.new-todo').press('Enter');
    await page.locator('.new-todo').fill('Task 3');
    await page.locator('.new-todo').press('Enter');
    await expect(page.locator('.todo-list li')).toHaveCount(3);

    // 2. Mark 'Task 1' and 'Task 3' as complete
    await page.locator('.todo-list li').filter({ hasText: 'Task 1' }).locator('.toggle').check();
    await page.locator('.todo-list li').filter({ hasText: 'Task 3' }).locator('.toggle').check();
    await expect(page.getByText('1 item left')).toBeVisible();
    await expect(page.locator('.clear-completed')).toBeVisible();

    // 3. Click the 'Clear completed' button
    await page.locator('.clear-completed').click();
    await expect(page.getByText('Task 2')).toBeVisible();
    await expect(page.getByText('Task 1')).not.toBeVisible();
    await expect(page.getByText('Task 3')).not.toBeVisible();
    await expect(page.getByText('1 item left')).toBeVisible();
  });
});
