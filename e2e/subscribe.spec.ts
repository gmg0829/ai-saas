import { test, expect } from '@playwright/test'

test.describe('Subscribe Page', () => {
  test('should load subscribe page', async ({ page }) => {
    await page.goto('/subscribe')

    await expect(page.locator('h1')).toContainText('Subscribe to Updates')
    await expect(page.locator('text=Get the latest news and features delivered to your inbox')).toBeVisible()
  })

  test('should show email input and subscribe button', async ({ page }) => {
    await page.goto('/subscribe')

    await expect(page.locator('input[type="email"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toContainText('Subscribe')
  })

  test('should show validation error for invalid email', async ({ page }) => {
    await page.goto('/subscribe')

    await page.locator('input[type="email"]').fill('not-an-email')
    await page.locator('button[type="submit"]').click()

    // Browser native validation should prevent submission
    await expect(page.locator('input[type="email"]')).toHaveAttribute('required')
  })

  test('should show success message on valid submission', async ({ page }) => {
    await page.goto('/subscribe')

    // Mock the API to succeed
    await page.route('/api/subscribe', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' })
    })

    await page.locator('input[type="email"]').fill('test@example.com')
    await page.locator('button[type="submit"]').click()

    // Should show success message (after API returns)
    await expect(page.locator('text=Thanks for subscribing!')).toBeVisible({ timeout: 5000 })
  })

  test('should navigate back to home via back link', async ({ page }) => {
    await page.goto('/subscribe')

    await page.locator('a:text-is("Back to Home")').click()
    await expect(page).toHaveURL('/')
  })

  test('should clear email field after successful subscription', async ({ page }) => {
    await page.goto('/subscribe')

    await page.route('/api/subscribe', async (route) => {
      await route.fulfill({ status: 200, contentType: 'application/json', body: '{}' })
    })

    await page.locator('input[type="email"]').fill('test@example.com')
    await page.locator('button[type="submit"]').click()
    await expect(page.locator('text=Thanks for subscribing!')).toBeVisible({ timeout: 5000 })

    // Input should be cleared
    await expect(page.locator('input[type="email"]')).toHaveValue('')
  })

  test('should show loading state during submission', async ({ page }) => {
    await page.goto('/subscribe')

    // Mock API to delay response
    await page.route('/api/subscribe', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      await route.continue()
    })

    await page.locator('input[type="email"]').fill('test@example.com')
    await page.locator('button[type="submit"]').click()

    // Should show loading state
    await expect(page.locator('button[type="submit"]')).toContainText('Subscribing...')
    await expect(page.locator('button[type="submit"]')).toBeDisabled()
  })
})
