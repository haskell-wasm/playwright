// spec: Adding New Todos - should add multiple todos
// seed: tests/seed.spec.ts

import { test, expect } from '../fixtures';

test.describe('Adding New Todos', () => {
  test('should add multiple todos', async ({ page }) => {
    // Add first todo: "Buy groceries" (type and press Enter)
    await page.locator('.new-todo').fill('Buy groceries');
    await page.locator('.new-todo').press('Enter');

    // Add second todo: "Walk the dog" (type and press Enter)
    await page.locator('.new-todo').fill('Walk the dog');
    await page.locator('.new-todo').press('Enter');

    // Add third todo: "Read a book" (type and press Enter)
    await page.locator('.new-todo').fill('Read a book');
    await page.locator('.new-todo').press('Enter');

    // Verify all three todos appear in the list in order of creation
    await expect(page.locator('body')).toMatchAriaSnapshot(`
- list:
  - listitem: "Buy groceries"
  - listitem: "Walk the dog"
  - listitem: "Read a book"
`);

    // Verify counter shows "3 items left" (plural)
    await expect(page.getByText('3 items left')).toBeVisible();

    // Verify input field is cleared after each addition
    await expect(page.locator('.new-todo')).toHaveValue('');
  });
});
