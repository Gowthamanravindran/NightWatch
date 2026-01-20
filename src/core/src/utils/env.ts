import { webCaps } from '../config/webCaps.js';
import type { Browser } from '../config/webCaps.js';
import type { WebCap } from '../types/webCaps.js';

export function getWebCaps(): WebCap {
  const browser = process.env.BROWSER;

  if (!browser) {
    throw new Error('❌ BROWSER env variable is not set');
  }

  if (!(browser in webCaps)) {
    throw new Error(
      `❌ Unsupported browser "${browser}". Valid options: ${Object.keys(webCaps).join(', ')}`
    );
  }

  return webCaps[browser as Browser];
}