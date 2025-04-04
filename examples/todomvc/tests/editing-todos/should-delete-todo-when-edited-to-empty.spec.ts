// spec: Editing Todos - should delete todo when edited to empty
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures';

test.describe('Editing Todos', () => {
  test('should delete todo when edited to empty', async ({ page }) => {
    // 1. Add a todo 'Temporary task'
    await page.locator('.new-todo').fill('Temporary task');
    await page.locator('.new-todo').press('Enter');
    await expect(page.locator('.todo-count')).toHaveText('1 item left');
    await expect(page.locator('.todo-list li')).toHaveCount(1);

    // 2. Double-click on the todo to enter edit mode
    await expect(page.locator('.todo-list li').first().locator('label')).toHaveText('Temporary task');
    await page.locator('.todo-list li').first().locator('label').dblclick();
    await expect(page.locator('.todo-list li').first()).toHaveClass(/editing/);
    await expect(page.locator('.todo-list li').first().locator('.edit')).toBeVisible();

    // 3. Clear all the text and press Enter.
    // This TodoMVC implementation removes an entry that is saved with an
    // empty (whitespace-only) description, matching the classic TodoMVC spec.
    await page.locator('.todo-list li').first().locator('.edit').fill('');
    await page.locator('.todo-list li').first().locator('.edit').press('Enter');

    // Expect: the todo is removed and the list returns to its empty state.
    await expect(page.locator('.new-todo')).toBeVisible();
    await expect(page.locator('.todo-list li')).toHaveCount(0);
    await expect(page.locator('.todo-list')).not.toBeVisible();
  });
});
