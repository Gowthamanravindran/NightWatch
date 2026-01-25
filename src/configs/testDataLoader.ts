import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export function loadTestData(): Record<string, any> {
  const filePath = path.join(process.cwd(), 'src/configs/test-data.yml');
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