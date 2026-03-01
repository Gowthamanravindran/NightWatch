import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';


function getTestDataFilename(): string {
  const stackEnv = process.env.STACK_ENV;

  if (stackEnv) {
    return `${stackEnv}-test-data.yml`;
  }

  return 'staging-test-data.yml';
}

export function loadTestData(): Record<string, any> {
  const filename = getTestDataFilename();
  const filePath = path.join(process.cwd(), 'src/configs', filename);
  console.log(`Loading test data from: ${filename}`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Test data file not found at ${filePath}`);
  }
  return yaml.load(fs.readFileSync(filePath, 'utf8')) as Record<string, any>;
}

export function getAccountForWorker(
  testData: Record<string, any>,
  workerIndex: number
): { username: string; password: string } {
  const accounts = testData.accounts;
  if (!Array.isArray(accounts) || accounts.length === 0) {
    throw new Error('accounts array is missing or empty in test-data.yml');
  }
  const account = accounts[workerIndex];
  if (!account) {
    throw new Error(
      `No account found for workerIndex ${workerIndex}. Available accounts: ${accounts.length}`
    );
  }
  return account;
}