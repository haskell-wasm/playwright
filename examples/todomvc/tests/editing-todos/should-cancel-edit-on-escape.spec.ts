// spec: specs/editing-todos.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures';

test.describe('Editing Todos', () => {
  test('should-cancel-edit-on-escape', async ({ page }) => {
    // 1. Add a todo 'Original text'
    await page.locator('.new-todo').fill('Original text');
    await page.locator('.new-todo').press('Enter');
    
    // Expect: The todo appears in the list
    await expect(page.locator('.todo-list li').first().locator('label')).toHaveText('Original text');
    
    // 2. Double-click on the todo to enter edit mode
    await page.locator('.todo-list li').first().locator('label').dblclick();
    
    // Expect: Edit textbox appears with 'Original text'
    await expect(page.locator('.todo-list li').first()).toHaveClass(/editing/);
    await expect(page.locator('.todo-list li').first().locator('.edit')).toHaveValue('Original text');
    
    // 3. Change the text to 'Modified text' but press Escape instead of Enter.
    // This TodoMVC implementation cancels the edit on Escape: it leaves edit
    // mode and restores the original description, discarding the change.
    await page.locator('.todo-list li').first().locator('.edit').fill('Modified text');
    await page.locator('.todo-list li').first().locator('.edit').press('Escape');

    // Expect: edit mode is exited and the original text is restored.
    await expect(page.locator('.todo-list li').first()).not.toHaveClass(/editing/);
    await expect(page.locator('.todo-list li').first().locator('label')).toHaveText('Original text');
  });
});
