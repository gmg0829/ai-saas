import { test, expect } from '@playwright/test'

test.describe('Landing Page', () => {
  test('should load the landing page', async ({ page }) => {
    await page.goto('/')

    // Check page title content is visible
    await expect(page.locator('h1')).toContainText('AI-Powered')
    await expect(page.locator('h1')).toContainText('Productivity Tools')
  })

  test('should show navigation header', async ({ page }) => {
    await page.goto('/')

    // Header with logo
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('text=AI Tools Hub')).toBeVisible()

    // Nav links
    await expect(page.locator('a:text-is("Chat")')).toBeVisible()
    await expect(page.locator('a:text-is("Write")')).toBeVisible()
    await expect(page.locator('a:text-is("Summarize")')).toBeVisible()
    await expect(page.locator('a:text-is("Pricing")')).toBeVisible()
    await expect(page.locator('a:text-is("Subscribe")')).toBeVisible()
  })

  test('should show CTA buttons', async ({ page }) => {
    await page.goto('/')

    // Primary CTA - Get Started Free
    const getStartedBtn = page.locator('a:text-is("Get Started Free")')
    await expect(getStartedBtn).toBeVisible()
    await expect(getStartedBtn).toHaveAttribute('href', '/sign-in')

    // Try Demo button
    const tryDemoBtn = page.locator('a:text-is("Try Demo")')
    await expect(tryDemoBtn).toBeVisible()
    await expect(tryDemoBtn).toHaveAttribute('href', '/chat')
  })

  test('should show features grid', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('h2:text-is("Everything you need, nothing you don\'t")')).toBeVisible()
    await expect(page.locator('text=AI Chat')).toBeVisible()
    await expect(page.locator('text=AI Writing')).toBeVisible()
    await expect(page.locator('text=AI Summarize')).toBeVisible()
  })

  test('should show stats section', async ({ page }) => {
    await page.goto('/')

    await expect(page.locator('text=Active Users')).toBeVisible()
    await expect(page.locator('text=AI Responses')).toBeVisible()
    await expect(page.locator('text=Uptime')).toBeVisible()
    await expect(page.locator('text=User Rating')).toBeVisible()
  })

  test('should navigate to sign-in from CTA', async ({ page }) => {
    await page.goto('/')

    await page.locator('a:text-is("Get Started Free")').click()
    await expect(page).toHaveURL(/\/sign-in/)
  })

  test('should navigate to chat demo from CTA', async ({ page }) => {
    await page.goto('/')

    await page.locator('a:text-is("Try Demo")').click()
    await expect(page).toHaveURL(/\/chat/)
  })

  test('should navigate to pricing page', async ({ page }) => {
    await page.goto('/')

    await page.locator('a:text-is("Pricing")').first().click()
    await expect(page).toHaveURL(/\/pricing/)
  })

  test('should navigate to subscribe page', async ({ page }) => {
    await page.goto('/')

    await page.locator('a:text-is("Subscribe")').first().click()
    await expect(page).toHaveURL(/\/subscribe/)
  })

  test('should have no console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })

    await page.goto('/')
    await page.waitForLoadState('networkidle')

    expect(errors).toHaveLength(0)
  })
})
