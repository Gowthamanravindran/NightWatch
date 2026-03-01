import type { Page } from '@playwright/test';
import { DashboardLocators } from '../locators/dashboard';


export class DashboardPage {
    constructor(private page: Page) {}

    async searchFor(destination: string) {
        await this.page.fill(DashboardLocators.searchInput, destination);
        await this.page.keyboard.press('Enter');
    }
}