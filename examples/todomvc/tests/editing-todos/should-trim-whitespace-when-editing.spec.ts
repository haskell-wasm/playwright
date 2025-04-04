// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures';

test.describe('Editing Todos', () => {
  test('should trim whitespace when editing', async ({ page }) => {
    // 1. Add a todo 'Original task'
    await page.locator('.new-todo').fill('Original task');
    await page.locator('.new-todo').press('Enter');
    
    // Expect: The todo appears in the list
    await expect(page.locator('.todo-list li').first().locator('label')).toHaveText('Original task');
    
    // 2. Double-click to edit and change text to '   Edited task   ' (with spaces)
    await page.locator('.todo-list li').first().locator('label').dblclick();
    await expect(page.locator('.todo-list li').first()).toHaveClass(/editing/);
    await page.locator('.todo-list li').first().locator('.edit').fill('   Edited task   ');
    
    // Expect: Edit textbox shows the text with spaces
    await expect(page.locator('.todo-list li').first().locator('.edit')).toHaveValue('   Edited task   ');
    
    // 3. Press Enter to save
    await page.locator('.todo-list li').first().locator('.edit').press('Enter');
    
    // Expect: The todo is saved as 'Edited task' without leading or trailing whitespace
    await expect(page.getByText('Edited task')).toBeVisible();
  });
});
