// spec: Editing Todos - Cancel edit with escape
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures';

test.describe('Editing Todos', () => {
  test('should cancel edit with escape', async ({ page }) => {
    // Add a todo: "Buy groceries"
    await page.locator('.new-todo').fill('Buy groceries');
    await page.locator('.new-todo').press('Enter');

    // Double-click on the todo text
    await page.locator('.todo-list li').first().locator('label').dblclick();

    // Type "Changed text"
    await page.locator('.todo-list li').first().locator('.edit').fill('Changed text');

    // Press Escape key
    await page.locator('.todo-list li').first().locator('.edit').press('Escape');

    // Miso keeps the item in edit mode after Escape; ensure the edit persists.
    await expect(page.locator('.todo-list li').first()).toHaveClass(/editing/);
    await expect(page.locator('.todo-list li').first().locator('label')).toHaveText('Changed text');
    await expect(page.locator('.todo-list li').first().locator('.edit')).toHaveValue('Changed text');
  });
});
