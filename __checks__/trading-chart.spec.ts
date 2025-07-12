import { test, expect } from '@playwright/test';

test('TradingView chart loads and functions correctly', async ({ page }) => {
  await page.goto('/');

  // Wait for the chart container to be visible
  await expect(page.getByText('Bitcoin Price')).toBeVisible();

  // Check that the chart container has the correct height
  const chartContainer = page.locator('div').filter({ hasText: 'Bitcoin Price' }).locator('..').locator('div').nth(1);
  await expect(chartContainer).toHaveCSS('height', '400px');

  // Wait for TradingView iframe to load
  const tradingViewFrame = page.frameLocator('iframe[id="tradingview_chart"]');
  
  // Check that the iframe loads within a reasonable time
  await expect(tradingViewFrame.locator('body')).toBeVisible({ timeout: 15000 });

  // Test chart responsiveness
  await page.setViewportSize({ width: 1024, height: 768 });
  await expect(page.getByText('Bitcoin Price')).toBeVisible();
  
  await page.setViewportSize({ width: 768, height: 1024 });
  await expect(page.getByText('Bitcoin Price')).toBeVisible();

  // Check that the chart card has the correct styling
  const chartCard = page.locator('.glass-card').filter({ hasText: 'Bitcoin Price' });
  await expect(chartCard).toBeVisible();
  await expect(chartCard).toHaveClass(/animate-fade-in/);

  // Verify chart section is part of the grid layout
  const chartSection = page.locator('div.lg\\:col-span-2');
  await expect(chartSection).toBeVisible();
  await expect(chartSection).toContainText('Bitcoin Price');

  // Test that the page doesn't have console errors related to the chart
  page.on('console', msg => {
    if (msg.type() === 'error' && msg.text().includes('TradingView')) {
      throw new Error(`TradingView console error: ${msg.text()}`);
    }
  });

  // Wait a bit more to ensure chart is fully loaded
  await page.waitForTimeout(3000);
});