import 'dotenv/config';
import { defineConfig } from '@playwright/test';
import { loadTestData } from '../../../configs/testDataLoader';

const testData = loadTestData();
const workerCount = testData.base_urls?.length || 1;

export default defineConfig({
  workers: workerCount,
  testDir: './src/tests',
  projects: [
    {
      name: 'web',
      testMatch: '**/*.web.test.ts',
      use: {
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
      },
    },
    {
      name: 'api',
      testMatch: '**/*.api.test.ts',
      use: {
      },
    },
  ],
  reporter: [
    ['list'],
    [
      'allure-playwright',
      {
        outputFolder: 'allure-results',
        detail: true,
        suiteTitle: true,
        addConsoleLogs: true,
      },
    ],
  ],
  outputDir: 'test-results'
});