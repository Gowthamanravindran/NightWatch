import { defineConfig } from '@playwright/test';

export default defineConfig({
  workers: 1, // increase number for parallel tests
  testDir: './src/tests',
  testMatch: ['**/*.web.test.ts'],  
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
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry'
  },
  outputDir: 'test-results'
});