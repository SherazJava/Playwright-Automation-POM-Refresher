import { test, expect } from '@playwright/test';
import { LogInPage } from '../Pages/LoginPage.js';
import { credentials } from '../test-data/users.js';

test.beforeEach(async ({ page }) => {
    const login = new LogInPage(page);

    await login.goto();
});

test('Incorrect log in credentials', async ({ page }) => {
    const login = new LogInPage(page);

  await login.login(
    credentials.login.invalid.username,
    credentials.login.invalid.password
  );

  const incorrectLogin = await login.getErrorMessage();
  expect(incorrectLogin).toContain('Username and password do not match');
});

test('Locked Out account', async ({ page }) => {
    const login = new LogInPage(page);

  await login.login(
    credentials.login.locked.username,
    credentials.login.locked.password
  );

  const locked = await login.getErrorMessage();
  expect(locked).toContain('Sorry, this user has been locked out');
});