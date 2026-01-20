import { WebDriver } from './webDriver.js';
import { getWebCaps } from '../utils/env.js';

export class DriverFactory {
  static async create() {
    const platform = process.env.PLATFORM;

    if (!platform) {
      throw new Error('❌ PLATFORM env variable is not set');
    }

    if (platform === 'web') {
      return WebDriver.create(getWebCaps());
    }

    throw new Error(`❌ Unsupported platform: ${platform}`);
  }
}