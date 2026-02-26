# SDET-3 — UI Test Automation Framework

Playwright + TypeScript automation framework for [OrangeHRM Demo](https://opensource-demo.orangehrmlive.com/).

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Playwright](https://playwright.dev/) | Browser automation & test runner |
| TypeScript | Type-safe test code |
| Winston | Structured logging (console + file) |
| GitHub Actions | CI/CD pipeline |

## Project Structure

```
├── framework/              # Reusable UI automation utilities
│   ├── pages/              # Page Object Model classes
│   │   ├── BasePage.ts     # Abstract base — common helpers
│   │   ├── LoginPage.ts    # Login page interactions
│   │   ├── DashboardPage.ts# Dashboard assertions
│   │   └── PIMPage.ts      # Employee search (PIM module)
│   ├── utils/
│   │   ├── Logger.ts       # Winston-based logger
│   │   ├── TestData.ts     # Centralized test data
│   │   └── Environment.ts  # Environment config loader
│   └── fixtures/
│       └── test-fixtures.ts# Custom Playwright fixtures
├── tests/                  # Test cases organized by feature
│   ├── login/
│   │   ├── valid-login.spec.ts
│   │   └── invalid-login.spec.ts
│   └── search/
│       └── employee-search.spec.ts
├── ci/                     # CI pipeline configurations
│   └── ui-tests.yml
├── docs/                   # Documentation
│   └── ARCHITECTURE.md
├── playwright.config.ts    # Playwright configuration
├── .github/workflows/      # GitHub Actions (active pipeline)
└── .env                    # Environment variables
```

## Prerequisites

- **Node.js** ≥ 18 (recommended: 20 LTS)
- **npm** ≥ 9

## Setup

```bash
# 1. Clone the repository
git clone <repo-url>
cd sdet3-playwright-automation

# 2. Install dependencies
npm install

# 3. Install Playwright browsers
npx playwright install --with-deps
```

## Running Tests

### Run all tests (all browsers)
```bash
npm test
```

### Run on a specific browser
```bash
npm run test:chromium
npm run test:firefox
npm run test:webkit
```

### Run by feature
```bash
npm run test:login      # Login tests only
npm run test:search     # Search tests only
```

### Run in headed mode (see browser)
```bash
npm run test:headed
```

### Run in debug mode (step through tests)
```bash
npm run test:debug
```

### Run with custom base URL
```bash
BASE_URL=https://your-orangehrm-instance.com npm test
```

## Test Reports

### View HTML report after test run
```bash
npm run report
```

This opens the Playwright HTML report in your browser with:
- Test results breakdown (pass/fail/skip)
- Screenshots captured on failure
- Video recordings (on failure)
- Trace viewer (on retry)

### CI/CD Reports
On every push/PR, the GitHub Actions pipeline:
1. Runs all tests on headless Chromium
2. Uploads the HTML report as a build artifact
3. Publishes the report to GitHub Pages (on `main` branch)

## Test Cases

### Login Tests (8 cases)

| ID | Description | Type |
|----|-------------|------|
| TC_LOGIN_001 | Valid login → Dashboard heading visible | Positive |
| TC_LOGIN_002 | Valid login → Sidebar menu visible | Positive |
| TC_LOGIN_003 | Valid login → URL changes to /dashboard | Positive |
| TC_LOGIN_004 | Invalid username → "Invalid credentials" error | Negative |
| TC_LOGIN_005 | Invalid password → "Invalid credentials" error | Negative |
| TC_LOGIN_006 | Empty username → "Required" validation | Negative |
| TC_LOGIN_007 | Empty password → "Required" validation | Negative |
| TC_LOGIN_008 | Both fields empty → Two "Required" messages | Negative |

### Search Tests (3 cases)

| ID | Description | Type |
|----|-------------|------|
| TC_SEARCH_001 | Search existing employee → Results appear | Positive |
| TC_SEARCH_002 | Search non-existent → "No Records Found" | Negative |
| TC_SEARCH_003 | Partial name search → Record count badge | Positive |

## Framework Features

- **Page Object Model** — All page interactions encapsulated in reusable classes
- **Custom Fixtures** — Auto-instantiated page objects; `authenticatedPage` fixture for pre-login
- **Logging** — Winston logger with console + file output (`logs/test-run.log`)
- **Error Handling** — Auto-screenshots on failure, video recording, trace on retry
- **Multi-Browser** — Chromium, Firefox, WebKit support
- **CI/CD** — GitHub Actions pipeline with test report publishing

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `BASE_URL` | `https://opensource-demo.orangehrmlive.com` | Application URL |
| `HEADLESS` | `true` | Run browsers in headless mode |
| `CI` | — | Auto-set by GitHub Actions |

## License

MIT
