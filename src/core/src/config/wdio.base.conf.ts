export const baseConfig = {
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: { timeout: 60000 },
  // shared hooks, beforeSuite, afterSuite etc.
};