import { Page, Locator } from '@playwright/test';
import BasePage from './BasePage';
import Logger from '../utils/Logger';
import { TestData } from '../utils/TestData';

/**
 * Page Object for the OrangeHRM Login page.
 */
export default class LoginPage extends BasePage {
  // ==================== Locators ====================

  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly errorAlert: Locator;
  private readonly validationErrors: Locator;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.errorAlert = page.locator('.oxd-alert-content-text');
    this.validationErrors = page.locator('.oxd-input-field-error-message');
  }

  // ==================== Actions ====================

  /** Navigate to the login page. */
  async open(): Promise<void> {
    Logger.info('Opening login page');
    await this.navigate(TestData.routes.login);
    await this.waitForPageLoad();
  }

  /** Enter username into the username field. */
  async enterUsername(username: string): Promise<this> {
    Logger.info(`Entering username: ${username}`);
    await this.fill(this.usernameInput, username);
    return this;
  }

  /** Enter password into the password field. */
  async enterPassword(password: string): Promise<this> {
    Logger.info('Entering password: ****');
    await this.fill(this.passwordInput, password);
    return this;
  }

  /** Click the Login button. */
  async clickLogin(): Promise<void> {
    Logger.info('Clicking Login button');
    await this.click(this.loginButton);
  }

  /** Perform a full login with the given credentials. */
  async login(username: string, password: string): Promise<void> {
    Logger.info(`Performing login for user: ${username}`);
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }

  // ==================== Assertions / Getters ====================

  /** Get the text of the credential error alert (e.g. "Invalid credentials"). */
  async getErrorMessage(): Promise<string> {
    return this.getText(this.errorAlert);
  }

  /** Check whether the credential error alert is displayed. */
  async isErrorDisplayed(): Promise<boolean> {
    return this.isVisible(this.errorAlert, 10_000);
  }

  /** Get all field-level validation error messages (e.g. "Required"). */
  async getValidationMessages(): Promise<string[]> {
    await this.validationErrors.first().waitFor({ state: 'visible', timeout: 5000 });
    return this.validationErrors.allInnerTexts();
  }

  /** Get the count of field validation errors shown. */
  async getValidationErrorCount(): Promise<number> {
    return this.getCount(this.validationErrors);
  }

  // ==================== Page State ====================

  async isPageLoaded(): Promise<boolean> {
    return (
      (await this.isVisible(this.usernameInput)) &&
      (await this.isVisible(this.loginButton))
    );
  }
}
