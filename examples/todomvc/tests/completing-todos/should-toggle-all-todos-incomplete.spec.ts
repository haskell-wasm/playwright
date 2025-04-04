// spec: specs/basic-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures';

test.describe('Completing Todos', () => {
  test('should toggle all todos incomplete', async ({ page }) => {
    // 1. Add three todos and mark all as complete using the toggle all checkbox
    await page.locator('.new-todo').fill('First todo');
    await page.locator('.new-todo').press('Enter');
    await page.locator('.new-todo').fill('Second todo');
    await page.locator('.new-todo').press('Enter');
    await page.locator('.new-todo').fill('Third todo');
    await page.locator('.new-todo').press('Enter');

    await expect(page.getByText('First todo')).toBeVisible();
    await expect(page.getByText('Second todo')).toBeVisible();
    await expect(page.getByText('Third todo')).toBeVisible();
    await expect(page.getByText('3 items left')).toBeVisible();

    await page.locator('.toggle-all').check();
    await expect(page.getByText('0 items left')).toBeVisible();

    // 2. Click the 'Mark all as complete' checkbox again
    await page.locator('.toggle-all').uncheck();
    await expect(page.getByText('3 items left')).toBeVisible();

    // For this TodoMVC implementation, the "Clear completed" control is still in the DOM
    // but becomes hidden when there are no completed entries.
    await expect(page.locator('.clear-completed')).not.toBeVisible();
  });
});
