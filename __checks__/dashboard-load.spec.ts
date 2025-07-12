import { test, expect } from '@playwright/test';

test('Dashboard loads correctly with all components', async ({ page }) => {
  // Navigate to the dashboard
  await page.goto('/');

  // Check that the main title is visible
  await expect(page.getByRole('heading', { name: 'Crypto Dashboard' })).toBeVisible();
  
  // Check that the welcome message is visible
  await expect(page.getByText('Welcome back to your portfolio')).toBeVisible();

  // Check that all three market stats cards are present
  await expect(page.getByText('Market Cap')).toBeVisible();
  await expect(page.getByText('24h Volume')).toBeVisible();
  await expect(page.getByText('BTC Dominance')).toBeVisible();

  // Check that the chart section is present
  await expect(page.getByText('Bitcoin Price')).toBeVisible();

  // Check that the TradingView iframe is loaded
  const tradingViewFrame = page.frameLocator('iframe[id="tradingview_chart"]');
  await expect(tradingViewFrame.locator('body')).toBeVisible({ timeout: 10000 });

  // Check page responsiveness
  await page.setViewportSize({ width: 768, height: 1024 });
  await expect(page.getByRole('heading', { name: 'Crypto Dashboard' })).toBeVisible();
  
  await page.setViewportSize({ width: 375, height: 667 });
  await expect(page.getByRole('heading', { name: 'Crypto Dashboard' })).toBeVisible();
});