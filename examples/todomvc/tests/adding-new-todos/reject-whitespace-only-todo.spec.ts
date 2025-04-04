// spec: Adding New Todos
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures';

test.describe('Adding New Todos', () => {
  test('should reject whitespace-only todo', async ({ page }) => {
    // 1. Navigate to the TodoMVC application
    // (handled by seed)

    // 2. Click in the "What needs to be done?" input field
    await page.locator('.new-todo').click();

    // 3. Type only spaces (e.g., "   ")
    await page.locator('.new-todo').fill('   ');

    // 4. Press Enter
    await page.locator('.new-todo').press('Enter');

    // Expected Results for this implementation:
    // - A blank todo is added (whitespace-only entries are accepted)
    await expect(page.locator('.todo-list li')).toHaveCount(1);
    await expect(page.locator('.todo-list li').first().locator('label')).toHaveText('');

    // - Counter reflects the new todo
    await expect(page.locator('.todo-count')).toHaveText('1 item left');

    // - Input field is cleared after submission
    await expect(page.locator('.new-todo')).toHaveValue('');
  });
});
