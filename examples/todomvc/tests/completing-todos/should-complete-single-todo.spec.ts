// spec: specs/basic-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures';

test.describe('Completing Todos', () => {
  test('should complete single todo', async ({ page }) => {
    // Add a todo: "Buy groceries"
    await page.locator('.new-todo').fill('Buy groceries');
    await page.locator('.new-todo').press('Enter');

    // Expect: The todo appears as active, Counter shows '1 item left'
    await expect(page.locator('.todo-list li').first().locator('label')).toHaveText('Buy groceries');
    await expect(page.locator('.todo-count')).toHaveText('1 item left');

    // Click the checkbox next to "Buy groceries"
    await page.locator('.todo-list li').first().locator('.toggle').check();

    // Verify checkbox becomes checked
    await expect(page.locator('.todo-list li').first().locator('.toggle')).toBeChecked();

    // Verify counter shows "0 items left"
    await expect(page.locator('.todo-count')).toHaveText('0 items left');

    // Verify "Clear completed" button appears
    await expect(page.locator('.clear-completed')).toBeVisible();

    // Verify delete button becomes visible
    await page.locator('.todo-list li').first().hover();
    await expect(page.locator('.todo-list li').first().locator('.destroy')).toBeVisible();
  });
});
