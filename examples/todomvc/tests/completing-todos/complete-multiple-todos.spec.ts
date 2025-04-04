import { test, expect } from '../fixtures';

test.describe('Completing Todos', () => {
  test('should complete multiple todos', async ({ page }) => {
    // Add first todo: "Buy groceries"
    await page.locator('.new-todo').fill('Buy groceries');
    await page.locator('.new-todo').press('Enter');

    // Add second todo: "Walk the dog"
    await page.locator('.new-todo').fill('Walk the dog');
    await page.locator('.new-todo').press('Enter');

    // Add third todo: "Read a book"
    await page.locator('.new-todo').fill('Read a book');
    await page.locator('.new-todo').press('Enter');

    // Click the checkbox next to "Buy groceries"
    await page.locator('.todo-list li').filter({ hasText: 'Buy groceries' }).locator('.toggle').check();

    // Click the checkbox next to "Read a book"
    await page.locator('.todo-list li').filter({ hasText: 'Read a book' }).locator('.toggle').check();

    // Verify "Buy groceries" is completed
    await expect(page.locator('.todo-list li').filter({ hasText: 'Buy groceries' }).locator('.toggle')).toBeChecked();

    // Verify "Read a book" is completed
    await expect(page.locator('.todo-list li').filter({ hasText: 'Read a book' }).locator('.toggle')).toBeChecked();

    // Verify counter shows "1 item left"
    await expect(page.getByText('1 item left')).toBeVisible();

    // Verify "Clear completed" button appears
    await expect(page.locator('.clear-completed')).toBeVisible();

    // Verify "Walk the dog" remains active (unchecked)
    await expect(page.locator('.todo-list li').filter({ hasText: 'Walk the dog' }).locator('.toggle')).not.toBeChecked();
  });
});
