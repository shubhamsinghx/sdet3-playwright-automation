import { test as base, Page } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import SidebarSearchComponent from '../pages/PIMPage';
import { TestData } from '../utils/TestData';
import Logger from '../utils/Logger';

/**
 * Custom fixture types for the automation framework.
 */
type AutomationFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  sidebarSearch: SidebarSearchComponent;
  /** A page that is already authenticated (logged in). */
  authenticatedPage: Page;
};

/**
 * Extended `test` with pre-built page object fixtures.
 *
 * Usage in spec files:
 *   import { test, expect } from '../../framework/fixtures/test-fixtures';
 */
export const test = base.extend<AutomationFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },

  sidebarSearch: async ({ page }, use) => {
    const sidebarSearch = new SidebarSearchComponent(page);
    await use(sidebarSearch);
  },

  authenticatedPage: async ({ page }, use) => {
    Logger.info('Fixture: performing automatic login');
    const loginPage = new LoginPage(page);
    await loginPage.open();
    await loginPage.login(
      TestData.validCredentials.username,
      TestData.validCredentials.password,
    );
    // Wait for the dashboard to fully load after login
    await page.waitForURL('**/dashboard/**', { timeout: 30_000 });
    await page.waitForLoadState('domcontentloaded');
    Logger.info('Fixture: login complete — dashboard loaded');
    await use(page);
  },
});

export { expect } from '@playwright/test';
