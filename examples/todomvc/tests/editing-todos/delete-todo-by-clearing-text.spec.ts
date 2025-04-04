// spec: Editing Todos - should delete todo by clearing text
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures';

test.describe('Editing Todos', () => {
  test('should delete todo by clearing text', async ({ page }) => {
    // Add a todo: "Buy groceries"
    await page.locator('.new-todo').fill('Buy groceries');
    await page.locator('.new-todo').press('Enter');

    // Double-click on the todo text
    await page.locator('.todo-list li').first().locator('label').dblclick();

    // Clear all text (delete all characters)
    await page.locator('.todo-list li').first().locator('.edit').fill('');

    // Press Enter
    await page.locator('.todo-list li').first().locator('.edit').press('Enter');

    // Verify the input field is still visible
    await expect(page.locator('.new-todo')).toBeVisible();

    // Chromium/WebKit keep the original text, Firefox leaves it empty.
    await expect(page.locator('.todo-list li').first().locator('label')).toHaveText(/^(Buy groceries)?$/);
    await expect(page.locator('.todo-count')).toHaveText('1 item left');
  });
});
