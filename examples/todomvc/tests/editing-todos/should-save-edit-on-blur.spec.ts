// spec: specs/basic-operations.plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures';

test.describe('Editing Todos', () => {
  test('should-save-edit-on-blur', async ({ page }) => {
    // 1. Add a todo 'Call dentist'
    await page.locator('.new-todo').fill('Call dentist');
    await page.locator('.new-todo').press('Enter');

    // 2. Double-click on the todo to enter edit mode
    await expect(page.locator('.todo-list li').first().locator('label')).toHaveText('Call dentist');
    await page.locator('.todo-list li').first().locator('label').dblclick();
    await expect(page.locator('.todo-list li').first()).toHaveClass(/editing/);

    // 3. Change the text to 'Schedule dentist appointment' and click elsewhere (blur the input)
    await page.locator('.todo-list li').first().locator('.edit').fill('Schedule dentist appointment');
    await page.locator('.new-todo').click();

    await expect(page.getByText('Schedule dentist appointment')).toBeVisible();
  });
});
