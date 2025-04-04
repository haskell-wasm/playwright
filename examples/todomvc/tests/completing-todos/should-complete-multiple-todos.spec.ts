// spec: specs/basic-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures';

test.describe('Completing Todos', () => {
  test('should complete multiple todos', async ({ page }) => {
    // 1. Add three todos: 'Buy milk', 'Walk dog', 'Finish report'
    await page.locator('.new-todo').fill('Buy milk');
    await page.locator('.new-todo').press('Enter');
    await page.locator('.new-todo').fill('Walk dog');
    await page.locator('.new-todo').press('Enter');
    await page.locator('.new-todo').fill('Finish report');
    await page.locator('.new-todo').press('Enter');

    // Expect: All three todos are visible, Counter shows '3 items left'
    await expect(page.getByText('Buy milk')).toBeVisible();
    await expect(page.getByText('Walk dog')).toBeVisible();
    await expect(page.getByText('Finish report')).toBeVisible();
    await expect(page.getByText('3 items left')).toBeVisible();

    // 2. Complete the first todo
    await page.locator('.todo-list li').filter({ hasText: 'Buy milk' }).locator('.toggle').check();

    // Expect: First todo is marked as complete, Counter shows '2 items left'
    await expect(page.locator('.todo-list li').filter({ hasText: 'Buy milk' }).locator('.toggle')).toBeChecked();
    await expect(page.getByText('2 items left')).toBeVisible();

    // 3. Complete the third todo
    await page.locator('.todo-list li').filter({ hasText: 'Finish report' }).locator('.toggle').check();

    // Expect: Third todo is marked as complete, Counter shows '1 item left', The 'Clear completed' button appears
    await expect(page.locator('.todo-list li').filter({ hasText: 'Finish report' }).locator('.toggle')).toBeChecked();
    await expect(page.getByText('1 item left')).toBeVisible();
    await expect(page.locator('.clear-completed')).toBeVisible();
  });
});
