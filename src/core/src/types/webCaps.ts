import type { BrowserContextOptions } from '@playwright/test';

export type WebCap = {
  browserName: 'chromium' | 'firefox' | 'webkit';
  headless: boolean;
  viewport?: BrowserContextOptions['viewport'];
};