# E2E Testing Guide

## Overview

Playwright E2E tests live in the `/e2e` directory. Tests are written in TypeScript using `@playwright/test`.

## Quick Start

```bash
# 1. Install Playwright (already done)
npm install -D @playwright/test
npx playwright install chromium

# 2. Start dev server (separate terminal)
npm run dev

# 3. Run all E2E tests
npm run test:e2e

# 4. View HTML report
npm run test:e2e:report
```

## Commands

| Command | Description |
|---------|-------------|
| `npm run test:e2e` | Run all E2E tests in headless mode |
| `npm run test:e2e:ui` | Open Playwright UI mode (visual test runner) |
| `npm run test:e2e:headed` | Run in headed mode (see the browser) |
| `npm run test:e2e:report` | Open HTML test report |

## Running Specific Tests

```bash
# Run a single spec file
npx playwright test e2e/landing.spec.ts

# Run tests matching a pattern
npx playwright test e2e --grep "should show"

# Run with headed browser
npx playwright test e2e/landing.spec.ts --headed

# Run with UI mode
npx playwright test e2e/landing.spec.ts --ui
```

## Test Structure

```
e2e/
├── landing.spec.ts      # Landing page tests
├── pricing.spec.ts      # Pricing page tests
├── subscribe.spec.ts     # Subscribe form tests
├── auth.spec.ts         # Sign-in / sign-up tests
├── dashboard.spec.ts    # Dashboard / auth guard tests
└── global-setup.ts     # Runs before all tests
```

## Covered Pages

| Page | File | Auth Required |
|------|------|---------------|
| `/` | `landing.spec.ts` | No |
| `/pricing` | `pricing.spec.ts` | No |
| `/subscribe` | `subscribe.spec.ts` | No |
| `/sign-in` | `auth.spec.ts` | No |
| `/sign-up` | `auth.spec.ts` | No |
| `/chat` | `dashboard.spec.ts` | Yes (shows login gate) |
| `/write` | `dashboard.spec.ts` | Yes (shows login gate) |
| `/summarize` | `dashboard.spec.ts` | Yes (shows login gate) |
| `/profile` | `dashboard.spec.ts` | Yes (shows login gate) |

## Test Output

After running tests, results are saved in:

| Output | Location |
|--------|----------|
| HTML report | `playwright-report/index.html` |
| Screenshots (on failure) | `test-results/screenshots/` |
| Trace recordings | `test-results/*.zip` |

To open the HTML report:
```bash
npx playwright show-report
```

## Configuration

Main config: `playwright.config.ts`

Key settings:

```typescript
baseURL: 'http://localhost:3000'   // target server
reporter: 'html'                   // HTML report
projects: [{ name: 'chromium' }]   // browser
webServer: undefined              // dev server must be started manually
```

To auto-start the dev server via Playwright, set `webServer` in `playwright.config.ts`:

```typescript
webServer: {
  command: 'npm run dev',
  url: 'http://localhost:3000',
  reuseExistingServer: true,
  timeout: 120 * 1000,
},
```

## Writing New Tests

Add a new `.spec.ts` file in the `/e2e` directory:

```typescript
import { test, expect } from '@playwright/test'

test.describe('Page Name', () => {
  test('should do something', async ({ page }) => {
    await page.goto('/page')

    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('button')).toBeEnabled()
  })

  test('should navigate correctly', async ({ page }) => {
    await page.goto('/')
    await page.locator('a:text-is("Link")').click()
    await expect(page).toHaveURL(/\/target/)
  })
})
```

## Debugging

```bash
# Pause on first failure, open inspector
npx playwright test --debug

# Run with headed browser
npx playwright test --headed

# Update snapshots
npx playwright test --update-snapshots

# Show traces in UI
npx playwright show-trace trace.zip
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `BASE_URL` | `http://localhost:3000` | Target application URL |
| `CI` | `undefined` | Set to `1` to enable CI mode (more retries, parallel disabled) |

Example:
```bash
BASE_URL=http://staging.example.com npm run test:e2e
```
