import {test, expect} from '@playwright/test';
import { DashboardPage } from '../../../web/pages/dashboard.js';

test.describe('Booking.com Dashboard', () => {
    test('Booking.com search returns results', async ({ page }) => {
       const dashboard = new DashboardPage(page);
        await page.goto('https://www.booking.com');
        await dashboard.searchFor('Tokyo');
        await expect(page).toHaveURL(/search/);
    });
});