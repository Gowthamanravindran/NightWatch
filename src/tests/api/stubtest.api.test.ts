import { test, expect } from '@fixtures/base.fixture.js';
import { ApiClient, createApiClient } from '@core/api/index.js';

test.describe('Sample API Tests', () => {
  // Using the pre-configured api fixture (uses accountUrl as base)
  test('Validate api calls with stubs', async ({ api }) => {
    const createRes = await api.get<any>('test_get', {
      params: {
        testparam1: "night",
        testparam2: "watch"
      }
    });
    expect(createRes.status).toBe(200);
    expect(createRes.data.args.q).toBe('night');
  });

  // Creating a custom API instance with a different base URL
  test('Validate using custom api instance', async () => {
    const customApi = createApiClient('https://postman-echo.com');
    
    const res = await customApi.get<any>('test_get', {
      params: {
        testparam1: "custom",
        testparam2: "request"
      }
    });
    expect(res.status).toBe(200);
  });

  test('Validate api with auth', async () => {
    const authApi = new ApiClient('https://postman-echo.com');
    authApi.setAuthToken('my-jwt-token');
    authApi.setDefaultHeaders({ 'X-Custom-Header': 'value' });

    expect(authApi.getBaseUrl()).toBe('https://postman-echo.com');
  });

  test('Validate multiple api instances', async ({ api, accountUrl }) => {
    console.log(`Base URL API base: ${api.getBaseUrl()}`);
    const paymentApi = createApiClient('https://postman-echo.com');
    const analyticsApi = createApiClient('https://postman-echo.com');

    expect(api.getBaseUrl()).toBe(accountUrl);
    expect(paymentApi.getBaseUrl()).toBe('https://postman-echo.com');
    expect(analyticsApi.getBaseUrl()).toBe('https://postman-echo.com');
  });
});