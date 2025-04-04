// spec: Editing Todos - should edit todo successfully
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures';

test.describe('Editing Todos', () => {
  test('should edit todo successfully', async ({ page }) => {
    // Add a todo: "Buy groceries"
    await page.locator('.new-todo').fill('Buy groceries');
    await page.locator('.new-todo').press('Enter');

    // Double-click on the todo text "Buy groceries"
    await page.locator('.todo-list li').first().locator('label').dblclick();

    // Clear the existing text and type "Buy groceries and milk"
    await page.locator('.todo-list li').first().locator('.edit').fill('Buy groceries and milk');

    // Press Enter to save the edited todo
    await page.locator('.todo-list li').first().locator('.edit').press('Enter');

    // Verify that todo text updates to "Buy groceries and milk"
    await expect(page.locator('.todo-list li').first().locator('label')).toHaveText('Buy groceries and milk');
  });
});
