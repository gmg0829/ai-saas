import { test, expect } from '@playwright/test'

test.describe('Dashboard Pages', () => {
  test.describe.configure({ mode: 'serial' })

  test.describe('unauthenticated access', () => {
    test('chat page shows login required state', async ({ page }) => {
      await page.goto('/chat')
      await expect(page.locator('text=Login Required')).toBeVisible({ timeout: 10000 })
      await expect(page.locator('text=Please sign in to access AI Chat, Write, and Summarize tools')).toBeVisible()
      await expect(page.locator('a:text-is("Sign In")')).toBeVisible()
    })

    test('write page shows login required state', async ({ page }) => {
      await page.goto('/write')
      await expect(page.locator('text=Login Required')).toBeVisible({ timeout: 10000 })
    })

    test('summarize page shows login required state', async ({ page }) => {
      await page.goto('/summarize')
      await expect(page.locator('text=Login Required')).toBeVisible({ timeout: 10000 })
    })

    test('profile page shows login required state', async ({ page }) => {
      await page.goto('/profile')
      await expect(page.locator('text=Login Required')).toBeVisible({ timeout: 10000 })
    })

    test('login required links navigate to sign-in', async ({ page }) => {
      await page.goto('/chat')
      await page.locator('a:text-is("Sign In")').click()
      await expect(page).toHaveURL(/\/sign-in/)
    })
  })

  test.describe('navigation', () => {
    test('header navigation links are visible on dashboard pages', async ({ page }) => {
      await page.goto('/chat')
      await page.waitForLoadState('domcontentloaded')

      // Even without login, header nav should be visible
      await expect(page.locator('a:text-is("Chat")').first()).toBeVisible()
      await expect(page.locator('a:text-is("Write")').first()).toBeVisible()
      await expect(page.locator('a:text-is("Summarize")').first()).toBeVisible()
      await expect(page.locator('a:text-is("Pricing")').first()).toBeVisible()
    })

    test('navigation between dashboard pages', async ({ page }) => {
      await page.goto('/chat')
      await page.waitForLoadState('domcontentloaded')

      // Navigate to Write via header
      await page.locator('a:text-is("Write")').first().click()
      await expect(page).toHaveURL(/\/write/)

      // Navigate to Summarize via header
      await page.locator('a:text-is("Summarize")').first().click()
      await expect(page).toHaveURL(/\/summarize/)

      // Navigate to Pricing via header
      await page.locator('a:text-is("Pricing")').first().click()
      await expect(page).toHaveURL(/\/pricing/)
    })
  })
})
