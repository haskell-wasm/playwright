// spec: specs/editing-todos.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures';

test.describe('Editing Todos', () => {
  test('should edit todo by double-clicking', async ({ page }) => {
    // 1. Add a todo 'Buy milk'
    await page.locator('.new-todo').fill('Buy milk');
    await page.locator('.new-todo').press('Enter');
    await expect(page.getByText('Buy milk')).toBeVisible();

    // 2. Double-click on the todo text
    await page.locator('.todo-list li').first().locator('label').dblclick();
    await expect(page.locator('.todo-list li').first()).toHaveClass(/editing/);
    await expect(page.locator('.todo-list li').first().locator('.edit')).toBeVisible();
    await expect(page.locator('.todo-list li').first().locator('.edit')).toHaveValue('Buy milk');

    // 3. Change the text to 'Buy organic milk' and press Enter
    await page.locator('.todo-list li').first().locator('.edit').fill('Buy organic milk');
    await page.locator('.todo-list li').first().locator('.edit').press('Enter');
    await expect(page.getByText('Buy organic milk')).toBeVisible();
  });
});
