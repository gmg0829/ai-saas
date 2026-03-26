import { test, expect } from '@playwright/test'

test.describe('Pricing Page', () => {
  test('should load pricing page', async ({ page }) => {
    await page.goto('/pricing')

    await expect(page.locator('h2:text-is("Simple Pricing")')).toBeVisible()
    await expect(page.locator('text=Start free, upgrade when you need more')).toBeVisible()
  })

  test('should show Free and Pro plans', async ({ page }) => {
    await page.goto('/pricing')

    // Free plan
    await expect(page.locator('text=Free').first()).toBeVisible()
    await expect(page.locator('text=$0')).toBeVisible()
    await expect(page.locator('text=10 AI chats per day')).toBeVisible()
    await expect(page.locator('text=Current Plan')).toBeVisible()

    // Pro plan
    await expect(page.locator('text=Pro').first()).toBeVisible()
    await expect(page.locator('text=$9.9')).toBeVisible()
    await expect(page.locator('text=/month')).toBeVisible()
    await expect(page.locator('text=Unlimited AI chats')).toBeVisible()
    await expect(page.locator('text=Advanced models (GPT-4, Claude 3.5)')).toBeVisible()
    await expect(page.locator('text=Upgrade to Pro')).toBeVisible()
  })

  test('should disable Free plan CTA', async ({ page }) => {
    await page.goto('/pricing')

    const freePlanBtn = page.locator('button', { hasText: 'Current Plan' })
    await expect(freePlanBtn).toBeDisabled()
  })

  test('should enable Pro plan CTA', async ({ page }) => {
    await page.goto('/pricing')

    const proPlanBtn = page.locator('button', { hasText: 'Upgrade to Pro' })
    await expect(proPlanBtn).toBeEnabled()
  })

  test('should navigate back to home via browser back', async ({ page }) => {
    await page.goto('/')
    await page.locator('a:text-is("Pricing")').first().click()
    await expect(page).toHaveURL(/\/pricing/)

    await page.goBack()
    await expect(page).toHaveURL('/')
  })
})
