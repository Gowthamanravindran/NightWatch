import { chromium, firefox, webkit } from '@playwright/test';
import type { WebCap } from '../types/webCaps.js';

export class WebDriver {
  static async create(caps: WebCap) {
    const browserType =
      caps.browserName === 'firefox'
        ? firefox
        : caps.browserName === 'webkit'
        ? webkit
        : chromium;

    const browser = await browserType.launch({
      headless: caps.headless,
    });

    const context = await browser.newContext({
      viewport: caps.viewport,
    });

    const page = await context.newPage();

    return { browser, context, page };
  }
}
