import { Page, Locator } from '@playwright/test';
import Logger from '../utils/Logger';

/**
 * Abstract base page providing reusable interaction helpers.
 * Every page object extends this class.
 */
export default abstract class BasePage {
  constructor(protected readonly page: Page) {}

  // ==================== Navigation ====================

  /** Navigate to a path relative to the baseURL configured in playwright.config. */
  async navigate(path: string): Promise<void> {
    Logger.info(`Navigating to: ${path}`);
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  /** Wait for the page to finish loading (DOM ready). */
  async waitForPageLoad(): Promise<void> {
    Logger.debug('Waiting for page to finish loading');
    await this.page.waitForLoadState('domcontentloaded');
  }

  // ==================== Element Interactions ====================

  /** Click an element identified by the given locator. */
  async click(locator: Locator): Promise<void> {
    Logger.debug(`Clicking: ${locator}`);
    await locator.waitFor({ state: 'visible' });
    await locator.click();
  }

  /** Clear and type text into an input field. */
  async fill(locator: Locator, text: string): Promise<void> {
    Logger.debug(`Filling field with: "${text}"`);
    await locator.waitFor({ state: 'visible' });
    await locator.clear();
    await locator.fill(text);
  }

  /** Get the inner text of an element. */
  async getText(locator: Locator): Promise<string> {
    await locator.waitFor({ state: 'visible' });
    const text = await locator.innerText();
    Logger.debug(`Got text: "${text}"`);
    return text;
  }

  /** Check if an element is visible within the given timeout. */
  async isVisible(locator: Locator, timeout = 5000): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout });
      return true;
    } catch {
      return false;
    }
  }

  /** Get count of elements matching the locator. */
  async getCount(locator: Locator): Promise<number> {
    return locator.count();
  }

  // ==================== Screenshots & Error Handling ====================

  /** Capture a screenshot with a descriptive name. */
  async takeScreenshot(name: string): Promise<void> {
    const screenshotPath = `test-results/screenshots/${name}.png`;
    Logger.info(`Capturing screenshot: ${screenshotPath}`);
    await this.page.screenshot({ path: screenshotPath, fullPage: true });
  }

  /** Get the current page URL. */
  getCurrentUrl(): string {
    return this.page.url();
  }

  /** Get the page title. */
  async getPageTitle(): Promise<string> {
    return this.page.title();
  }

  // ==================== Abstract ====================

  /** Each page must define its own "page loaded" check. */
  abstract isPageLoaded(): Promise<boolean>;
}
