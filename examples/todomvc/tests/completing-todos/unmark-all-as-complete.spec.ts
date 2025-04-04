// spec: Completing Todos - should unmark all as complete
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures';

test.describe('Completing Todos', () => {
  test('should unmark all as complete', async ({ page }) => {
    // Add first todo: "Buy groceries"
    await page.locator('.new-todo').fill('Buy groceries');
    await page.locator('.new-todo').press('Enter');

    // Add second todo: "Walk the dog"
    await page.locator('.new-todo').fill('Walk the dog');
    await page.locator('.new-todo').press('Enter');

    // Add third todo: "Read a book"
    await page.locator('.new-todo').fill('Read a book');
    await page.locator('.new-todo').press('Enter');

    // Click the "Mark all as complete" checkbox to complete all
    await page.locator('.toggle-all').check();

    // Click the "Mark all as complete" checkbox again
    await page.locator('.toggle-all').uncheck();

    // Verify "Mark all as complete" checkbox is unchecked
    await expect(page.locator('.toggle-all')).not.toBeChecked();

    // Verify all individual checkboxes are unchecked
    await expect(page.locator('.todo-list li').filter({ hasText: 'Buy groceries' }).locator('.toggle')).not.toBeChecked();
    await expect(page.locator('.todo-list li').filter({ hasText: 'Walk the dog' }).locator('.toggle')).not.toBeChecked();
    await expect(page.locator('.todo-list li').filter({ hasText: 'Read a book' }).locator('.toggle')).not.toBeChecked();

    // Verify counter shows "3 items left"
    await expect(page.getByText('3 items left')).toBeVisible();
  });
});
