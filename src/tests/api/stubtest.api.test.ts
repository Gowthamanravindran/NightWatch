import { test, expect } from '@fixtures/base.fixture.js';
import { api } from '@core/api/index.js';

test.describe('API Tests', () => {
  test('create and fetch user', async () => {
    const createRes = await api.get<any>('test_get', {
      params: {
        testparam1: "night",
        testparam2: "watch"
      }
    });
    expect(createRes.status).toBe(200);
    expect(createRes.data.args.q).toBe('night');
  });
});