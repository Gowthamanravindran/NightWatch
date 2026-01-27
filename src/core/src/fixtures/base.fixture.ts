import { test as base, type Page, type BrowserContext, type Browser } from '@playwright/test';
import { loadTestData, getAccountForWorker } from '../../../configs/testDataLoader.js';
import { WebDriver } from '../driver/webDriver.js';
import { getWebCaps } from '../utils/env.js';
import { ApiClient } from '../api/apiClient.js';

const testData = loadTestData();

export const test = base.extend<
  {
    testData: Record<string, any>;
    accountUrl: string;
    account: { username: string; password: string };
    api: ApiClient;
    page: Page;
    context: BrowserContext;
    createPage: () => Promise<Page>;
  },
  {
    browser: Browser;
  }
>({
  // Worker-scoped browser fixture
  browser: [async ({}, use) => {
    const caps = getWebCaps();
    console.log('\n Browser Configuration:');
    console.log(`   Browser: ${caps.browserName}`);
    console.log(`   Headless: ${caps.headless}`);
    console.log(`   Viewport: ${caps.viewport?.width}x${caps.viewport?.height}\n`);
    const { browser } = await WebDriver.create(caps);
    await use(browser);
    await browser.close();
  }, { scope: 'worker' }],

  // Test-scoped context fixture
  context: async ({ browser }, use) => {
    const caps = getWebCaps();
    const context = await browser.newContext({
      viewport: caps.viewport,
    });
    await use(context);
    await context.close();
  },

  // Test-scoped page fixture (overrides Playwright's default)
  page: async ({ context }, use) => {
    const page = await context.newPage();
    await use(page);
    await page.close();
  },

  // Factory fixture: creates new page instances on demand
  createPage: async ({ browser }, use) => {
    const contexts: BrowserContext[] = [];

    const factory = async (): Promise<Page> => {
      const caps = getWebCaps();
      const context = await browser.newContext({
        viewport: caps.viewport,
      });
      const page = await context.newPage();
      contexts.push(context);
      return page;
    };

    await use(factory);

    // Auto-cleanup all created contexts
    for (const context of contexts) {
      await context.close();
    }
  },

  // Inject testData as worker-scoped fixture
  testData: [async ({}, use) => {
    await use(testData);
  }, { scope: 'worker' }],

  // Test fixture: pick accountUrl based on workerIndex
  accountUrl: [
    async ({}, use, workerInfo) => {
      const urls = testData.base_urls;
      if (!Array.isArray(urls) || urls.length === 0) {
        throw new Error('No base_urls defined in test-data.yml');
      }
      const url = urls[workerInfo.workerIndex];
      if (!url) {
        throw new Error(
          `No base_url found for workerIndex ${workerInfo.workerIndex}. Available URLs: ${urls.length}`
        );
      }
      await use(url);
    },
    { scope: 'test' },
  ],

  // Test fixture: pick account based on workerIndex
  account: [
    async ({}, use, workerInfo) => {
      const account = getAccountForWorker(testData, workerInfo.workerIndex);
      await use(account);
    },
    { scope: 'test' },
  ],

  // API client fixture: pre-configured with accountUrl as base
  api: async ({ accountUrl }, use) => {
    const apiClient = new ApiClient(accountUrl);
    console.log(`API Base URL: ${accountUrl}`);
    await use(apiClient);
  },
});

export { expect } from '@playwright/test';
