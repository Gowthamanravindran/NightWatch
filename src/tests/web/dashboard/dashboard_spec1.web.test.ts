import {test, expect} from '@playwright/test';

test('Booking.com search returns results', async ({ page }) => {
  await page.goto('https://www.booking.com');

  await page.fill('input[placeholder="Where are you going?"]', 'tokyo');
  await page.keyboard.press('Enter');

  await expect(page).toHaveURL(/search/);
});