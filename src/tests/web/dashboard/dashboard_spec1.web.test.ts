import { test, expect } from '../../../core/src/fixtures/base.fixture.js';
import { DashboardPage } from '../../../web/pages/dashboard.js';

test.describe('Booking.com Dashboard', () => {
    test('Booking.com search returns results', async ({ page, accountUrl, account }) => {
        console.log('Using account:', accountUrl);
        const dashboard = new DashboardPage(page);
        await page.goto(accountUrl);
        await dashboard.searchFor('Tokyo');
        await expect(page).toHaveURL(/search/);
    });
});