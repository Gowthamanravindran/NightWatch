import { test, expect } from '@fixtures/base.fixture.js';
import { GraphQLClient, createGraphQLClient } from '@core/api/index.js';

test.describe('GraphQL Tests', () => {
  // Using the pre-configured graphql fixture
  test('get all countries using fixture', async ({ graphql }) => {
    const res = await graphql.executeFromFile<any>('get-countries');
    
    expect(res.status).toBe(200);
    expect(res.errors).toBeUndefined();
    expect(res.data.countries).toBeDefined();
    expect(res.data.countries.length).toBeGreaterThan(0);
    
    // Check first country has expected fields
    const firstCountry = res.data.countries[0];
    expect(firstCountry).toHaveProperty('code');
    expect(firstCountry).toHaveProperty('name');
    expect(firstCountry).toHaveProperty('emoji');
  });

  // Using test data file with variable override
  test('get country by code with override', async ({ graphql }) => {
    // File has default code "US", but we override to "IN"
    const res = await graphql.executeFromFile<any>('get-country-by-code', { code: 'IN' });
    
    expect(res.status).toBe(200);
    expect(res.errors).toBeUndefined();
    expect(res.data.country.code).toBe('IN');
    expect(res.data.country.name).toBe('India');
  });

  // Using inline query
  test('inline query for continents', async ({ graphql }) => {
    const query = `
      query {
        continents {
          code
          name
        }
      }
    `;
    
    const res = await graphql.query<any>(query);
    
    expect(res.status).toBe(200);
    expect(res.data.continents).toBeDefined();
    expect(res.data.continents.length).toBe(7);
  });

  // Using query with variables inline
  test('query with inline variables', async ({ graphql }) => {
    const query = `
      query GetLanguage($code: ID!) {
        language(code: $code) {
          code
          name
          native
        }
      }
    `;
    
    const res = await graphql.query<any>(query, { code: 'en' });
    
    expect(res.status).toBe(200);
    expect(res.data.language.name).toBe('English');
  });

  // Creating a custom GraphQL client instance
  test('using custom graphql client', async () => {
    const customGraphql = createGraphQLClient('https://countries.trevorblades.com/graphql');
    
    const res = await customGraphql.query<any>(`
      query {
        country(code: "JP") {
          name
          capital
          currency
        }
      }
    `);
    
    expect(res.status).toBe(200);
    expect(res.data.country.name).toBe('Japan');
    expect(res.data.country.capital).toBe('Tokyo');
  });

  // Test with authentication (example structure)
  test('graphql with auth token', async ({ graphql }) => {
    // Set auth token for authenticated endpoints
    graphql.setAuthToken('test-token');
    
    // This public API doesn't require auth, but demonstrates the pattern
    const res = await graphql.executeFromFile<any>('get-continents');
    
    expect(res.status).toBe(200);
    
    // Clear token after test
    graphql.clearAuthToken();
  });
});

