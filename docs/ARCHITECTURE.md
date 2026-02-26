# Architecture

## Overview

This framework follows a layered architecture that separates test logic from page interactions and shared utilities.

```
┌─────────────────────────────────────┐
│          Test Specs (tests/)        │  ← Test cases organized by feature
├─────────────────────────────────────┤
│     Custom Fixtures (fixtures/)     │  ← Dependency injection for page objects
├─────────────────────────────────────┤
│      Page Objects (pages/)          │  ← Encapsulated page interactions
├─────────────────────────────────────┤
│       Utilities (utils/)            │  ← Logger, TestData, Environment
├─────────────────────────────────────┤
│     Playwright Test Runner          │  ← Browser management, assertions
└─────────────────────────────────────┘
```

## Design Decisions

### Page Object Model (POM)

Every page in the application is represented by a class extending `BasePage`. This provides:

- **Encapsulation** — Locators are private; tests interact via descriptive methods
- **Reusability** — Common actions (click, fill, getText) live in BasePage
- **Maintainability** — If a locator changes, only one file needs updating

### Custom Fixtures

Playwright fixtures allow dependency injection into tests. This framework extends them to:

- Auto-create page objects (`loginPage`, `dashboardPage`, `pimPage`)
- Provide an `authenticatedPage` that performs login before the test starts
- Keep test files clean and focused on assertions

### Logging Strategy

Winston is used with two transports:

- **Console** — Colorized output at `info` level for real-time visibility
- **File** — Full `debug` level logs written to `logs/test-run.log` for post-mortem analysis

Every page interaction is logged, making it easy to trace what happened during a failed test.

### Error Handling

- **Screenshots** — Automatically captured on test failure (Playwright built-in)
- **Video** — Recorded and retained on failure for visual debugging
- **Trace** — Captured on first retry for deep debugging via Playwright Trace Viewer
- **Graceful waits** — `isVisible()` returns boolean instead of throwing on timeout

### CI/CD Pipeline

The GitHub Actions workflow:

1. Triggers on push to `main`/`develop` and on pull requests to `main`
2. Uses headless Chromium only (for speed and reliability)
3. Uploads HTML report + screenshots/videos as artifacts
4. Publishes report to GitHub Pages on the `main` branch

## Adding New Tests

1. Create a new page object in `framework/pages/` extending `BasePage`
2. Add it as a fixture in `framework/fixtures/test-fixtures.ts`
3. Create a new spec file under `tests/<feature>/`
4. Import `{ test, expect }` from the custom fixtures
5. Use the page object fixtures in your test

## Adding New Pages

```typescript
// framework/pages/NewPage.ts
import { Page, Locator } from '@playwright/test';
import BasePage from './BasePage';

export default class NewPage extends BasePage {
  private readonly someElement: Locator;

  constructor(page: Page) {
    super(page);
    this.someElement = page.locator('#some-id');
  }

  async doSomething(): Promise<void> {
    await this.click(this.someElement);
  }

  async isPageLoaded(): Promise<boolean> {
    return this.isVisible(this.someElement);
  }
}
```
