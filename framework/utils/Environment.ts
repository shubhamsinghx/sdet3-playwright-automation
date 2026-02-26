import dotenv from 'dotenv';

dotenv.config();

/**
 * Typed environment configuration.
 * Falls back to sensible defaults when env vars are not set.
 */
export const Environment = {
  BASE_URL: process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com',
  HEADLESS: process.env.HEADLESS !== 'false',
  CI: !!process.env.CI,
} as const;
