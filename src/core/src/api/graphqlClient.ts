import fs from 'fs';
import path from 'path';
import { type GraphQLResponse, type GraphQLError, type GraphQLRequestOptions, type GraphQLTestData } from '../types/graphqlTypes';



export class GraphQLClient {
  private baseUrl: string = '';
  private defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  private authToken: string | null = null;

  /**
   * Create a new GraphQLClient instance
   * @param baseUrl - The GraphQL endpoint URL
   */
  constructor(baseUrl?: string) {
    if (baseUrl) {
      this.baseUrl = baseUrl.replace(/\/$/, '');
    }
  }

  /**
   * Set the base URL for all requests
   */
  setBaseUrl(url: string): void {
    this.baseUrl = url.replace(/\/$/, '');
  }

  /**
   * Get the current base URL
   */
  getBaseUrl(): string {
    return this.baseUrl;
  }

  /**
   * Set authorization token for subsequent requests
   */
  setAuthToken(token: string): void {
    this.authToken = token;
  }

  /**
   * Clear authorization token
   */
  clearAuthToken(): void {
    this.authToken = null;
  }

  /**
   * Set default headers for all requests
   */
  setDefaultHeaders(headers: Record<string, string>): void {
    this.defaultHeaders = { ...this.defaultHeaders, ...headers };
  }

  private buildHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    const headers = { ...this.defaultHeaders, ...customHeaders };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    return headers;
  }

  /**
   * Load GraphQL query/mutation from JSON test data file
   * @param fileName - Name of the JSON file (without .json extension)
   * @returns The query string and variables
   */
  loadTestData(fileName: string): GraphQLTestData {
    const filePath = path.resolve(process.cwd(), 'src/api/test-data', `${fileName}.json`);

    if (!fs.existsSync(filePath)) {
      throw new Error(`GraphQL test data file not found: ${filePath}`);
    }

    const content = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(content) as GraphQLTestData;
  }

  /**
   * Execute a GraphQL query or mutation
   * @param query - GraphQL query string
   * @param variables - Query variables
   * @param options - Request options
   */
  async execute<T = unknown>(
    query: string,
    variables?: Record<string, unknown>,
    options?: GraphQLRequestOptions
  ): Promise<GraphQLResponse<T>> {
    if (!this.baseUrl) {
      throw new Error('Base URL not set. Call setBaseUrl() or pass it to constructor.');
    }

    const headers = this.buildHeaders(options?.headers);
    const body = JSON.stringify({ query, variables });

    console.log(`📊 GraphQL ${this.baseUrl}`);
    console.log(`   Query: ${query.slice(0, 50).replace(/\n/g, ' ')}...`);

    const response = await fetch(this.baseUrl, {
      method: 'POST',
      headers,
      body,
      signal: options?.timeout ? AbortSignal.timeout(options.timeout) : undefined,
    });

    const result = await response.json();

    console.log(`   ↳ ${response.status} ${response.statusText}`);
    if (result.errors) {
      console.log(`   ⚠️ Errors: ${result.errors.map((e: GraphQLError) => e.message).join(', ')}`);
    }

    return {
      status: response.status,
      statusText: response.statusText,
      data: result.data ?? null,
      errors: result.errors,
      headers: response.headers,
    };
  }

  /**
   * Execute a GraphQL query from a test data file
   * @param fileName - Name of the JSON file (without .json extension)
   * @param variableOverrides - Override variables from the file
   * @param options - Request options
   */
  async executeFromFile<T = unknown>(
    fileName: string,
    variableOverrides?: Record<string, unknown>,
    options?: GraphQLRequestOptions
  ): Promise<GraphQLResponse<T>> {
    const testData = this.loadTestData(fileName);
    const variables = { ...testData.variables, ...variableOverrides };
    return this.execute<T>(testData.query, variables, options);
  }

  /**
   * Execute a GraphQL query
   */
  async query<T = unknown>(
    query: string,
    variables?: Record<string, unknown>,
    options?: GraphQLRequestOptions
  ): Promise<GraphQLResponse<T>> {
    return this.execute<T>(query, variables, options);
  }

  /**
   * Execute a GraphQL mutation
   */
  async mutate<T = unknown>(
    mutation: string,
    variables?: Record<string, unknown>,
    options?: GraphQLRequestOptions
  ): Promise<GraphQLResponse<T>> {
    return this.execute<T>(mutation, variables, options);
  }
}

/**
 * Create a new GraphQLClient instance with the given base URL
 */
export function createGraphQLClient(baseUrl: string): GraphQLClient {
  return new GraphQLClient(baseUrl);
}

