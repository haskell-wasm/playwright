// spec: Adding New Todos - should add todo with special characters
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures';

test.describe('Adding New Todos', () => {
  test('should add todo with special characters', async ({ page }) => {
    // Type "Test with special chars: @#$%^&*()"
    await page.locator('.new-todo').fill('Test with special chars: @#$%^&*()');

    // Press Enter
    await page.locator('.new-todo').press('Enter');

    // Verify todo is successfully added and special characters are displayed correctly
    await expect(page.getByText('Test with special chars: @#$%^&*()')).toBeVisible();

    // Verify counter shows "1 item left"
    await expect(page.getByText('1 item left')).toBeVisible();
  });
});
