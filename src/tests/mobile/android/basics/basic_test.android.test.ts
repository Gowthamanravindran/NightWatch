import { $ } from '@wdio/globals';

describe('Android demo', () => {
  it('opens the app', async () => {
    await $('~Accessibility').waitForDisplayed();
    // …
  });
});