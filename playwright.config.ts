import { defineConfig } from '@playwright/test';
import { loadTestData } from './src/configs/testDataLoader.js';

const testData = loadTestData();
const workerCount = testData.base_urls?.length || 1;

export default defineConfig({
  workers: workerCount,
  testDir: './src/tests',
  testMatch: ['**/*.web.test.ts'],
  projects: [
    {
      name: 'web',
      use: {
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        trace: 'on-first-retry',
      },
      options: {
        testData,
      } as any,
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