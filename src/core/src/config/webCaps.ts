import type { WebCap } from '../types/webCaps.js';

export const webCaps = {
  chromium: {
    browserName: 'chromium',
    viewport: { width: 1280, height: 720 },
    headless: true,
  },
  firefox: {
    browserName: 'firefox',
    viewport: { width: 1440, height: 900 },
    headless: true,
  },
  webkit: {
    browserName: 'webkit',
    viewport: { width: 1280, height: 800 },
    headless: true,
  },
} as const satisfies Record<string, WebCap>;

export type Browser = keyof typeof webCaps;