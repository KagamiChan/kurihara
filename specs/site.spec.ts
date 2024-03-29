import { test, expect } from '@playwright/test'

test('has title', async ({ page }) => {
  await page.goto('http://127.0.0.1:5000/')

  // Expect a title "to contain" a substring.
  await expect(page.getByTestId('site-title')).toBeVisible()
})

test('displays posts', async ({ page }) => {
  await page.goto('http://127.0.0.1:5000/blog/2015-01-17-juzhen-fangsong/')
  await page.waitForTimeout(300) // i18n may take some time to load
  await expect(page.getByText('聚珍仿宋')).toBeVisible()
})
