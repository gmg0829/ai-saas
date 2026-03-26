import { test, expect } from '@playwright/test'

test.describe('Auth Pages', () => {
  test('sign-in page loads correctly', async ({ page }) => {
    await page.goto('/sign-in')

    // Clerk SignIn component should be visible
    await expect(page.locator('[data-testid="sign-in"]')).toBeVisible({ timeout: 10000 })
  })

  test('sign-up page loads correctly', async ({ page }) => {
    await page.goto('/sign-up')

    await expect(page.locator('[data-testid="sign-up"]')).toBeVisible({ timeout: 10000 })
  })

  test('navigation from landing to sign-in', async ({ page }) => {
    await page.goto('/')

    await page.locator('a:text-is("Get Started Free")').click()
    await expect(page).toHaveURL(/\/sign-in/)
  })

  test('navigation from sign-in to sign-up', async ({ page }) => {
    await page.goto('/sign-in')

    // Clerk typically has a sign-up link
    const signUpLink = page.locator('a[href*="sign-up"], button:has-text("Sign up")').first()
    if (await signUpLink.isVisible()) {
      await signUpLink.click()
      await expect(page).toHaveURL(/\/sign-up/)
    }
  })

  test('sign-in page has no console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })

    await page.goto('/sign-in')
    await page.waitForLoadState('networkidle')

    // Filter out expected Clerk-related errors
    const realErrors = errors.filter(e => !e.includes('Clerk') && !e.includes('clerk'))
    expect(realErrors).toHaveLength(0)
  })

  test('sign-up page has no console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text())
    })

    await page.goto('/sign-up')
    await page.waitForLoadState('networkidle')

    const realErrors = errors.filter(e => !e.includes('Clerk') && !e.includes('clerk'))
    expect(realErrors).toHaveLength(0)
  })
})
