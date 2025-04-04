// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures';

test.describe('Completing Todos', () => {
  test('should mark all as complete', async ({ page }) => {
    // Add three todos: "Buy groceries", "Walk the dog", "Read a book"
    await page.locator('.new-todo').fill('Buy groceries');
    await page.locator('.new-todo').press('Enter');
    await page.locator('.new-todo').fill('Walk the dog');
    await page.locator('.new-todo').press('Enter');
    await page.locator('.new-todo').fill('Read a book');
    await page.locator('.new-todo').press('Enter');

    // Click the "Mark all as complete" checkbox (chevron icon)
    await page.locator('.toggle-all').check();

    // Verify "Mark all as complete" checkbox is checked
    await expect(page.locator('.toggle-all')).toBeChecked();

    // Verify counter shows "0 items left"
    await expect(page.locator('.todo-count')).toHaveText('0 items left');

    // Verify "Clear completed" button appears
    await expect(page.locator('.clear-completed')).toBeVisible();
  });
});
