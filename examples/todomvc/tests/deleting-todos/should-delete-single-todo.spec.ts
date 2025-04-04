// spec: specs/basic-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures';

test.describe('Deleting Todos', () => {
  test('should-delete-single-todo', async ({ page }) => {
    // 1. Add a todo 'Task to delete'
    await page.locator('.new-todo').fill('Task to delete');
    await page.locator('.new-todo').press('Enter');
    await expect(page.getByText('Task to delete')).toBeVisible();
    await expect(page.getByText('1 item left')).toBeVisible();

    // 3. Click the delete button
    await page.locator('.todo-list li').filter({ hasText: 'Task to delete' }).hover();
    await page.locator('.todo-list li').filter({ hasText: 'Task to delete' }).locator('.destroy').click();
    await expect(page.getByText('Task to delete')).not.toBeVisible();
    await expect(page.locator('.todo-list li').filter({ hasText: 'Task to delete' })).not.toBeVisible();
    await expect(page.locator('.todo-list li')).toHaveCount(0);
  });
});
