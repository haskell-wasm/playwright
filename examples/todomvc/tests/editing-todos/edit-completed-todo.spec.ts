// spec: Editing Todos - Edit Completed Todo
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures';

test.describe('Editing Todos', () => {
  test('should edit completed todo', async ({ page }) => {
    // Add a todo: "Buy groceries"
    await page.locator('.new-todo').fill('Buy groceries');
    await page.locator('.new-todo').press('Enter');

    // Click the checkbox to complete it
    await page.locator('.todo-list li').first().locator('.toggle').check();

    // Double-click on the todo text
    await page.locator('.todo-list li').first().locator('label').dblclick();

    // Type "Buy groceries and milk" and press Enter
    await page.locator('.todo-list li').first().locator('.edit').fill('Buy groceries and milk');
    await page.locator('.todo-list li').first().locator('.edit').press('Enter');

    // Verify todo text is successfully updated
    await expect(page.locator('.todo-list li').first().locator('label')).toHaveText('Buy groceries and milk');

    // Verify checkbox remains checked (todo remains in completed state)
    await expect(page.locator('.todo-list li').first().locator('.toggle')).toBeChecked();
  });
});
