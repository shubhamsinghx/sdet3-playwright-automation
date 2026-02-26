import { Page, Locator } from '@playwright/test';
import BasePage from './BasePage';
import Logger from '../utils/Logger';

/**
 * Page Object for the Dashboard sidebar search functionality.
 * Searches the sidebar menu and verifies filtered results.
 */
export default class SidebarSearchComponent extends BasePage {
  // ==================== Locators ====================

  private readonly searchInput: Locator;
  private readonly menuItems: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('.oxd-main-menu-search input');
    this.menuItems = page.locator('a.oxd-main-menu-item:visible');
  }

  // ==================== Actions ====================

  /** Type a search term into the sidebar search box. */
  async search(term: string): Promise<void> {
    Logger.info(`Sidebar search: "${term}"`);
    await this.fill(this.searchInput, term);
    // Wait for the filter animation to complete
    await this.page.waitForTimeout(500);
  }

  /** Clear the sidebar search box. */
  async clearSearch(): Promise<void> {
    Logger.info('Clearing sidebar search');
    await this.fill(this.searchInput, '');
    await this.page.waitForTimeout(500);
  }

  // ==================== Assertions / Getters ====================

  /** Get the visible menu item names after filtering. */
  async getVisibleMenuItems(): Promise<string[]> {
    return this.menuItems.allInnerTexts();
  }

  /** Get the count of visible menu items. */
  async getVisibleMenuItemCount(): Promise<number> {
    return this.menuItems.count();
  }

  /** Check if any menu items are visible after search. */
  async hasResults(): Promise<boolean> {
    return (await this.getVisibleMenuItemCount()) > 0;
  }

  // ==================== Page State ====================

  async isPageLoaded(): Promise<boolean> {
    return this.isVisible(this.searchInput, 10_000);
  }
}
