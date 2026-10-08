import { baseConfig } from './wdio.base.conf';
import path from 'node:path';

export const config = {
  ...baseConfig,
  specs: [path.join(process.cwd(), 'src/tests/mobile/android/**/*.android.test.ts')],
  services: ['appium'],
  appium: {
    command: 'appium',
  },
  capabilities: [{
    platformName: 'Android',
    'appium:deviceName': process.env.ANDROID_DEVICE_NAME,
    'appium:platformVersion': process.env.ANDROID_VERSION,
    'appium:app': process.env.APP_PATH,
    'appium:automationName': 'UiAutomator2',
    'appium:avd': process.env.ANDROID_DEVICE_NAME,
  }],
};