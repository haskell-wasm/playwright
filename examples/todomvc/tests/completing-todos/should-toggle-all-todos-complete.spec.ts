// spec: specs/basic-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures';

test.describe('Completing Todos', () => {
  test('should-toggle-all-todos-complete', async ({ page }) => {
    // 1. Add three todos: 'Task 1', 'Task 2', 'Task 3'
    await page.locator('.new-todo').fill('Task 1');
    await page.locator('.new-todo').press('Enter');
    await page.locator('.new-todo').fill('Task 2');
    await page.locator('.new-todo').press('Enter');
    await page.locator('.new-todo').fill('Task 3');
    await page.locator('.new-todo').press('Enter');

    // Expect: All three todos are visible and active, Counter shows '3 items left'
    await expect(page.getByText('Task 1')).toBeVisible();
    await expect(page.getByText('Task 2')).toBeVisible();
    await expect(page.getByText('Task 3')).toBeVisible();
    await expect(page.getByText('3 items left')).toBeVisible();

    // 2. Click the 'Mark all as complete' checkbox
    // Use the TodoMVC canonical selector instead of an accessibility name derived
    // from CSS-generated content (which can vary across browsers).
    await page.locator('.toggle-all').check();

    // Expect: All three todos are marked as complete, All checkboxes are checked, Counter shows '0 items left', The 'Clear completed' button appears
    await expect(page.getByText('0 items left')).toBeVisible();
    await expect(page.locator('.clear-completed')).toBeVisible();
  });
});
