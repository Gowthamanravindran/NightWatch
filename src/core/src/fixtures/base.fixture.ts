import { test as base, type TestInfo } from '@playwright/test';
import { loadTestData, getAccountForWorker } from '../../../configs/testDataLoader.js';

const testData = loadTestData();

export const test = base.extend<{
  testData: Record<string, any>;
  accountUrl: string;
  account: { username: string; password: string };
}>({
  // Inject testData as worker-scoped fixture
  testData: [async ({}, use) => {
    await use(testData);
  }, { scope: 'worker' }],

  // Worker fixture: pick accountUrl based on workerIndex
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

  // Worker fixture: pick account based on workerIndex
  account: [
    async ({}, use, workerInfo) => {
      const account = getAccountForWorker(testData, workerInfo.workerIndex);
      await use(account);
    },
    { scope: 'test' },
  ],
});

export { expect } from '@playwright/test';
