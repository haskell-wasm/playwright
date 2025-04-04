/* eslint-disable notice/notice */

import { test, expect } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test.beforeEach(async ({ page }) => {
  await page.goto('http://127.0.0.1:3000/todomvc.html');
});

const TODO_ITEMS = [
  'buy some cheese',
  'feed the cat',
  'book a doctors appointment'
];

test.describe('New Todo', () => {
  test('should allow me to add todo items', async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?');
    // Create 1st todo.
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');

    // Make sure the list only has one todo item.
    await expect(page.locator('.todo-list > li > div:first-child > label:nth-child(2)')).toHaveText([
      TODO_ITEMS[0]
    ]);

    // Create 2nd todo.
    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press('Enter');

    // Make sure the list now has two todo items.
    await expect(page.locator('.todo-list > li > div:first-child > label:nth-child(2)')).toHaveText([
      TODO_ITEMS[0],
      TODO_ITEMS[1],
    ]);
  });

  test('should clear text input field when an item is added', async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?');

    // Create one todo item.
    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');

    // Check that input is empty.
    await expect(newTodo).toBeEmpty();
  });

  test('should append new items to the bottom of the list', async ({ page }) => {
    // Create 3 items.
    await createDefaultTodos(page);

    // Check test using different methods.
    await expect(page.getByText('3 items left')).toBeVisible();
    await expect(page.locator('.todo-count')).toHaveText('3 items left');
    await expect(page.locator('.todo-count')).toContainText('3');
    await expect(page.locator('.todo-count')).toHaveText(/3/);

    // Check all items in one call.
    await expect(page.locator('.todo-list > li > div:first-child > label:nth-child(2)')).toHaveText(TODO_ITEMS);
  });

  test('should show #main and #footer when items added', async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?');

    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');

    await expect(page.locator('.main')).toBeVisible();
    await expect(page.locator('.footer')).toBeVisible();
  });
});

test.describe('Mark all as completed', () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTodos(page);
  });

  test('should allow me to mark all items as completed', async ({ page }) => {
    // Complete all todos.
    await page.getByLabel('Mark all as complete').check();

    // Ensure all todos have 'completed' class.
    await expect(page.locator('.todo-list > li')).toHaveClass(['completed', 'completed', 'completed']);
  });

  test('should allow me to clear the complete state of all items', async ({ page }) => {
    const toggleAll = page.getByLabel('Mark all as complete');
    // Check and then immediately uncheck.
    await toggleAll.check();
    await toggleAll.uncheck();

    // Should be no completed classes.
    await expect(page.locator('.todo-list > li')).toHaveClass(['', '', '']);
  });

  test('complete all checkbox should update state when items are completed / cleared', async ({ page }) => {
    const toggleAll = page.getByLabel('Mark all as complete');
    await toggleAll.check();
    await expect(toggleAll).toBeChecked();

    // Uncheck first todo.
    const firstTodo = page.locator('.todo-list > li').nth(0);
    await firstTodo.getByRole('checkbox').uncheck();

    // Reuse toggleAll locator and make sure its not checked.
    await expect(toggleAll).not.toBeChecked();

    await firstTodo.getByRole('checkbox').check();

    // Assert the toggle all is checked again.
    await expect(toggleAll).toBeChecked();
  });
});

test.describe('Item', () => {

  test('should allow me to mark items as complete', async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?');

    // Create two items.
    for (const item of TODO_ITEMS.slice(0, 2)) {
      await newTodo.fill(item);
      await newTodo.press('Enter');
    }

    // Check first item.
    const firstTodo = page.locator('.todo-list > li').nth(0);
    await firstTodo.getByRole('checkbox').check();
    await expect(firstTodo).toHaveClass('completed');

    // Check second item.
    const secondTodo = page.locator('.todo-list > li').nth(1);
    await expect(secondTodo).not.toHaveClass('completed');
    await secondTodo.getByRole('checkbox').check();

    // Assert completed class.
    await expect(firstTodo).toHaveClass('completed');
    await expect(secondTodo).toHaveClass('completed');
  });

  test('should allow me to un-mark items as complete', async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?');

    // Create two items.
    for (const item of TODO_ITEMS.slice(0, 2)) {
      await newTodo.fill(item);
      await newTodo.press('Enter');
    }

    const firstTodo = page.locator('.todo-list > li').nth(0);
    const secondTodo = page.locator('.todo-list > li').nth(1);
    await firstTodo.getByRole('checkbox').check();
    await expect(firstTodo).toHaveClass('completed');
    await expect(secondTodo).not.toHaveClass('completed');

    await firstTodo.getByRole('checkbox').uncheck();
    await expect(firstTodo).not.toHaveClass('completed');
    await expect(secondTodo).not.toHaveClass('completed');
  });

  test('should allow me to edit an item', async ({ page }) => {
    await createDefaultTodos(page);

    const todoItems = page.locator('.todo-list > li');
    const secondTodo = todoItems.nth(1);
    await secondTodo.dblclick();
    await expect(secondTodo.getByRole('textbox')).toHaveValue(TODO_ITEMS[1]);
    await secondTodo.getByRole('textbox').fill('buy some sausages');
    await secondTodo.getByRole('textbox').press('Enter');

    // Explicitly assert the new text value.
    await expect(todoItems).toHaveText([
      TODO_ITEMS[0],
      'buy some sausages',
      TODO_ITEMS[2]
    ]);
  });
});

test.describe('Editing', () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTodos(page);
  });

  test('should hide other controls when editing', async ({ page }) => {
    const todoItem = page.locator('.todo-list > li').nth(1);
    await todoItem.dblclick();
    await expect(todoItem.getByRole('checkbox')).not.toBeVisible();
    await expect(todoItem.locator('label', {
      hasText: TODO_ITEMS[1],
    })).not.toBeVisible();
  });

  test('should save edits on blur', async ({ page }) => {
    const todoItems = page.locator('.todo-list > li');
    await todoItems.nth(1).dblclick();
    await todoItems.nth(1).getByRole('textbox').fill('buy some sausages');
    await todoItems.nth(1).getByRole('textbox').dispatchEvent('blur');

    await expect(todoItems).toHaveText([
      TODO_ITEMS[0],
      'buy some sausages',
      TODO_ITEMS[2],
    ]);
  });

  test('should trim entered text', async ({ page }) => {
    const todoItems = page.locator('.todo-list > li');
    await todoItems.nth(1).dblclick();
    await todoItems.nth(1).getByRole('textbox').fill('    buy some sausages    ');
    await todoItems.nth(1).getByRole('textbox').press('Enter');

    await expect(todoItems).toHaveText([
      TODO_ITEMS[0],
      'buy some sausages',
      TODO_ITEMS[2],
    ]);
  });
});

test.describe('Counter', () => {
  test('should display the current number of todo items', async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?');

    await newTodo.fill(TODO_ITEMS[0]);
    await newTodo.press('Enter');
    await expect(page.locator('.todo-count')).toContainText('1');

    await newTodo.fill(TODO_ITEMS[1]);
    await newTodo.press('Enter');
    await expect(page.locator('.todo-count')).toContainText('2');
  });
});

test.describe('Clear completed button', () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTodos(page);
  });

  test('should display the correct text', async ({ page }) => {
    await page.locator('.todo-list li .toggle').first().check();
    await expect(page.getByRole('button', { name: 'Clear completed' })).toBeVisible();
  });

  test('should remove completed items when clicked', async ({ page }) => {
    const todoItems = page.locator('.todo-list > li');
    await todoItems.nth(1).getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Clear completed' }).click();
    await expect(todoItems).toHaveCount(2);
    await expect(todoItems).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test('should be hidden when there are no items that are completed', async ({ page }) => {
    await page.locator('.todo-list li .toggle').first().check();
    await page.getByRole('button', { name: 'Clear completed' }).click();
    await expect(page.getByRole('button', { name: 'Clear completed' })).toBeHidden();
  });
});

test.describe('Routing', () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTodos(page);
  });

  test('should allow me to display active items', async ({ page }) => {
    await page.locator('.todo-list li .toggle').nth(1).check();
    await page.getByRole('link', { name: 'Active' }).click();
    await expect(page.locator('.todo-list > li')).toHaveCount(2);
    await expect(page.locator('.todo-list > li')).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]]);
  });

  test('should allow me to display completed items', async ({ page }) => {
    await page.locator('.todo-list li .toggle').nth(1).check();
    await page.getByRole('link', { name: 'Completed' }).click();
    await expect(page.locator('.todo-list > li')).toHaveCount(1);
  });

  test('should allow me to display all items', async ({ page }) => {
    await page.locator('.todo-list li .toggle').nth(1).check();
    await page.getByRole('link', { name: 'Active' }).click();
    await page.getByRole('link', { name: 'Completed' }).click();
    await page.getByRole('link', { name: 'All' }).click();
    await expect(page.locator('.todo-list > li')).toHaveCount(3);
  });

  test('should highlight the currently applied filter', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'All' })).toHaveClass('selected');
    await page.getByRole('link', { name: 'Active' }).click();
    // Page change - active items.
    await expect(page.getByRole('link', { name: 'Active' })).toHaveClass('selected');
    await page.getByRole('link', { name: 'Completed' }).click();
    // Page change - completed items.
    await expect(page.getByRole('link', { name: 'Completed' })).toHaveClass('selected');
  });
});

async function createDefaultTodos(page) {
  // create a new todo locator
  const newTodo = page.getByPlaceholder('What needs to be done?');

  for (const item of TODO_ITEMS) {
    await newTodo.fill(item);
    await newTodo.press('Enter');
  }
}
