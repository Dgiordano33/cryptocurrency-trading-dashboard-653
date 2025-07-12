import { test, expect } from '@playwright/test';

test('Market stats display correctly', async ({ page }) => {
  await page.goto('/');

  // Wait for market stats to load
  await expect(page.getByText('Market Cap')).toBeVisible();

  // Check Market Cap card
  const marketCapCard = page.locator('div').filter({ hasText: /^Market Cap\$2\.1T2\.4%$/ });
  await expect(marketCapCard).toBeVisible();
  await expect(marketCapCard.getByText('$2.1T')).toBeVisible();
  await expect(marketCapCard.getByText('2.4%')).toBeVisible();

  // Check 24h Volume card
  const volumeCard = page.locator('div').filter({ hasText: /^24h Volume\$84\.2B5\.1%$/ });
  await expect(volumeCard).toBeVisible();
  await expect(volumeCard.getByText('$84.2B')).toBeVisible();
  await expect(volumeCard.getByText('5.1%')).toBeVisible();

  // Check BTC Dominance card
  const dominanceCard = page.locator('div').filter({ hasText: /^BTC Dominance42\.1%0\.8%$/ });
  await expect(dominanceCard).toBeVisible();
  await expect(dominanceCard.getByText('42.1%')).toBeVisible();
  await expect(dominanceCard.getByText('0.8%')).toBeVisible();

  // Check that all cards have the glass-card styling
  const allCards = page.locator('.glass-card');
  await expect(allCards).toHaveCount(4); // 3 stats + 1 chart card

  // Verify trend icons are present
  const trendingUpIcons = page.locator('svg').filter({ hasText: /trending-up/ });
  await expect(trendingUpIcons.first()).toBeVisible();

  // Check color coding for positive/negative changes
  const positiveChange = page.getByText('2.4%').first();
  await expect(positiveChange).toHaveClass(/text-success/);
  
  const negativeChange = page.getByText('0.8%');
  await expect(negativeChange).toHaveClass(/text-warning/);
});