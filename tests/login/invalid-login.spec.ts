import { test, expect } from '../../framework/fixtures/test-fixtures';
import { TestData } from '../../framework/utils/TestData';
import Logger from '../../framework/utils/Logger';

test.describe('Login — Invalid Credentials & Validation', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.open();
  });

  test('TC_LOGIN_006 — Empty username shows "Required" validation', async ({ loginPage }) => {
    Logger.step(1, 'Enter only password and click login');
    await loginPage.enterPassword(TestData.validCredentials.password);
    await loginPage.clickLogin();

    Logger.step(2, 'Verify "Required" validation message appears');
    const messages = await loginPage.getValidationMessages();
    expect(messages).toContain(TestData.messages.requiredField);
  });

  test('TC_LOGIN_008 — Empty both fields shows two "Required" messages', async ({
    loginPage,
  }) => {
    Logger.step(1, 'Click login without entering any credentials');
    await loginPage.clickLogin();

    Logger.step(2, 'Verify two "Required" validation messages appear');
    // getValidationMessages waits for elements, so call it first
    const messages = await loginPage.getValidationMessages();
    expect(messages).toHaveLength(2);
    messages.forEach((msg) => expect(msg).toBe(TestData.messages.requiredField));
  });
});
