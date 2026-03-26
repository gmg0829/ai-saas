import { chromium, FullConfig } from '@playwright/test'

/**
 * Global setup for Playwright E2E tests.
 * Runs once before all tests.
 */
async function globalSetup(config: FullConfig) {
  // Ensure dev server is reachable before running tests
  const { baseURL } = config.projects[0].use
  const url = baseURL || 'http://localhost:3000'

  const maxRetries = 30
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await fetch(url)
      if (response.ok) break
    } catch {
      // server not ready yet
    }
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
}

export default globalSetup
