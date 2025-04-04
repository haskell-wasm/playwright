// spec: specs/basic-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures';

test.describe('Deleting Todos', () => {
  test('should-delete-specific-todo-from-multiple', async ({ page }) => {
    // 1. Add three todos: 'Task 1', 'Task 2', 'Task 3'
    await page.locator('.new-todo').fill('Task 1');
    await page.locator('.new-todo').press('Enter');
    await page.locator('.new-todo').fill('Task 2');
    await page.locator('.new-todo').press('Enter');
    await page.locator('.new-todo').fill('Task 3');
    await page.locator('.new-todo').press('Enter');

    // Expect: All three todos appear in the list,Counter shows '3 items left'
    await expect(page.getByText('Task 1')).toBeVisible();
    await expect(page.getByText('Task 2')).toBeVisible();
    await expect(page.getByText('Task 3')).toBeVisible();
    await expect(page.getByText('3 items left')).toBeVisible();

    // 2. Hover over 'Task 2' and click its delete button
    await page.locator('.todo-list li').filter({ hasText: 'Task 2' }).hover();
    await page.locator('.todo-list li').filter({ hasText: 'Task 2' }).locator('.destroy').click();

    // Expect: 'Task 2' is removed from the list,'Task 1' and 'Task 3' remain visible,Counter shows '2 items left'
    await expect(page.getByText('Task 1')).toBeVisible();
    await expect(page.getByText('Task 3')).toBeVisible();
    await expect(page.getByText('Task 2')).not.toBeVisible();
    await expect(page.getByText('2 items left')).toBeVisible();
  });
});
