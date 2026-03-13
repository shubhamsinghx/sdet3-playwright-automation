import { test, expect } from '../../framework/fixtures/test-fixtures';
import { TestData } from '../../framework/utils/TestData';
import Logger from '../../framework/utils/Logger';

test.describe('Login — Valid Credentials', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('TC_LOGIN_001 — Login page is displayed', async ({ loginPage }) => {
    Logger.step(1, 'Verify login page loads successfully');
    const loaded = await loginPage.isPageLoaded();
    expect(loaded).toBe(true);
  });

  test('TC_LOGIN_FAIL — Intentional failure to demo screenshot capture', async ({ loginPage }) => {
    Logger.step(1, 'Verify login page has a non-existent element (will fail)');
    const title = await loginPage.getPageTitle();
    expect(title).toBe('This Will Fail On Purpose');
  });
});
