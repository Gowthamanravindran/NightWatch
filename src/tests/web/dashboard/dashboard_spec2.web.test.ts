import { test, expect } from '@fixtures/base.fixture.js';

test.describe('Booking.com Dashboard', () => {
    test('Booking.com search returns results', async ({ page, accountUrl }) => {
        await page.goto(accountUrl);
        console.log('Using account:', accountUrl);
        await page.fill('input[placeholder="Where are you going?"]', 'tokyo');
        await page.keyboard.press('Enter');

        await expect(page).toHaveURL(/search/);
    });
});