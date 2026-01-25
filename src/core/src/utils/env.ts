import { webCaps, type Browser } from '../config/webCaps.js';
import type { WebCap } from '../types/webCaps.js';

const DEFAULT_BROWSER: Browser = 'chromium';

export function getWebCaps(): WebCap {
  const browserName = (process.env.TEST_BROWSER || DEFAULT_BROWSER) as Browser;

  if (!(browserName in webCaps)) {
    const validBrowsers = Object.keys(webCaps).join(', ');
    throw new Error(`❌ Unsupported browser "${browserName}". Valid: ${validBrowsers}`);
  }

  return {
    ...webCaps[browserName],
    headless: process.env.HEADLESS !== 'false',
  };
}