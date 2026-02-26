import { Page, Locator } from '@playwright/test';
import BasePage from './BasePage';
import Logger from '../utils/Logger';

/**
 * Page Object for the OrangeHRM Dashboard page.
 */
export default class DashboardPage extends BasePage {
  // ==================== Locators ====================

  private readonly pageHeading: Locator;
  private readonly sidebarMenu: Locator;
  private readonly quickLaunchWidget: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.locator('.oxd-topbar-header-breadcrumb h6');
    this.sidebarMenu = page.locator('ul.oxd-main-menu');
    this.quickLaunchWidget = page.locator('.orangehrm-quick-launch');
  }

  // ==================== Actions ====================

  /** Navigate to a module by clicking its sidebar menu item. */
  async navigateToModule(moduleName: string): Promise<void> {
    Logger.info(`Navigating to module: ${moduleName}`);
    const menuItem = this.page.locator('.oxd-main-menu-item', { hasText: moduleName });
    await this.click(menuItem);
    await this.waitForPageLoad();
  }

  // ==================== Assertions / Getters ====================

  /** Get the dashboard page heading text (e.g. "Dashboard"). */
  async getHeadingText(): Promise<string> {
    return this.getText(this.pageHeading);
  }

  /** Check if the sidebar menu is visible. */
  async isSidebarVisible(): Promise<boolean> {
    return this.isVisible(this.sidebarMenu);
  }

  /** Check if the quick-launch widget section is visible. */
  async isQuickLaunchVisible(): Promise<boolean> {
    return this.isVisible(this.quickLaunchWidget);
  }

  // ==================== Page State ====================

  async isPageLoaded(): Promise<boolean> {
    Logger.debug('Checking if Dashboard page is loaded');
    return (
      (await this.isVisible(this.pageHeading, 15_000)) &&
      (await this.isVisible(this.sidebarMenu, 15_000))
    );
  }
}
