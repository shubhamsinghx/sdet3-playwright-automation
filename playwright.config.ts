import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment-specific config: ENV_FILE=.env.qa npx playwright test
dotenv.config({ path: path.resolve(process.cwd(), process.env.ENV_FILE || '.env') });

const BASE_URL = process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com';
const IS_CI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: IS_CI,
  retries: IS_CI ? 1 : 0,
  workers: IS_CI ? 1 : undefined,
  timeout: 60_000,
  expect: { timeout: 10_000 },

  reporter: [
    ['list'],
    ['html', { open: IS_CI ? 'never' : 'on-failure', outputFolder: 'playwright-report' }],
    ...(IS_CI ? [['github'] as ['github']] : []),
  ],

  use: {
    baseURL: BASE_URL,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    headless: IS_CI ? true : (process.env.HEADLESS !== 'false'),
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
