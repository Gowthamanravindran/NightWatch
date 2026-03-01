import { chromium, firefox, webkit, type Browser } from '@playwright/test';
import type { WebCap } from '../types/webCaps';

export class WebDriver {
  static async create(caps: WebCap): Promise<{ browser: Browser }> {
    const browserType =
      caps.browserName === 'chromium'
        ? chromium
        : caps.browserName === 'firefox'
        ? firefox
        : webkit;

    const browser = await browserType.launch({
      headless: caps.headless,
    });

    return { browser };
  }
}
