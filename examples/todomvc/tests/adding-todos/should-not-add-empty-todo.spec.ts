// spec: Adding Todos - should not add empty todo
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures';

test.describe('Adding Todos', () => {
  test('should not add empty todo', async ({ page }) => {
    // 1. Click on the input field without typing anything
    await page.getByRole('textbox', { name: 'What needs to be done?' }).click();
    
    // Expect: The input field is focused
    await expect(page.getByRole('textbox', { name: 'What needs to be done?' })).toBeFocused();
    
    // 2. Press Enter
    await page.keyboard.press('Enter');

    // Expect: No todo is added to the list, The todo list remains empty.
    // Scope to the app's own list: the page also renders a TodoMVC "learn"
    // sidebar (injected by todomvc-common's base.js) whose link groups are
    // <ul> elements, so a bare getByRole('list') is ambiguous here.
    await expect(page.locator('.todo-list li')).toHaveCount(0);
    await expect(page.locator('.todo-list')).not.toBeVisible();
  });
});
