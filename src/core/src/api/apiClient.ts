import { getPath } from './endpoints.js';

export interface ApiResponse<T = unknown> {
  status: number;
  statusText: string;
  data: T;
  headers: Headers;
}

export interface RequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number>; // URL template params
  query?: Record<string, string | number>; // Query string params
  timeout?: number;
}

export class ApiClient {
  private baseUrl: string = '';
  private defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  private authToken: string | null = null;

  /**
   * Create a new ApiClient instance
   * @param baseUrl - The base URL for all API requests
   */
  constructor(baseUrl?: string) {
    if (baseUrl) {
      this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
    }
  }

  /**
   * Set the base URL for all requests
   */
  setBaseUrl(url: string): void {
    this.baseUrl = url.replace(/\/$/, ''); // Remove trailing slash
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

  private buildUrl(endpointName: string, options?: RequestOptions): string {
    if (!this.baseUrl) {
      throw new Error('Base URL not set. Call setBaseUrl() or pass it to constructor.');
    }

    const path = getPath(endpointName, options?.params || {});
    let url = `${this.baseUrl}${path}`;

    // Append query string if provided
    if (options?.query) {
      const queryString = new URLSearchParams(
        Object.entries(options.query).map(([k, v]) => [k, String(v)])
      ).toString();
      url += (url.includes('?') ? '&' : '?') + queryString;
    }

    return url;
  }

  private async request<T>(
    method: string,
    endpointName: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    const url = this.buildUrl(endpointName, options);
    const headers = this.buildHeaders(options?.headers);

    console.log(`${method} ${url}`);

    const response = await fetch(url, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: options?.timeout ? AbortSignal.timeout(options.timeout) : undefined,
    });

    let data: T;
    const contentType = response.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      data = await response.json();
    } else {
      data = (await response.text()) as unknown as T;
    }

    console.log(`Response :: ${response.status} ${response.statusText}`);

    return {
      status: response.status,
      statusText: response.statusText,
      data,
      headers: response.headers,
    };
  }

  /**
   * GET request
   * @example
   * api.get('get_user', { params: { userId: '123' } })
   */
  async get<T = unknown>(endpointName: string, options?: RequestOptions): Promise<ApiResponse<T>> {
    return this.request<T>('GET', endpointName, undefined, options);
  }

  /**
   * POST request
   * @example
   * api.post('create_user', { name: 'John', email: 'john@example.com' })
   */
  async post<T = unknown>(
    endpointName: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>('POST', endpointName, body, options);
  }

  /**
   * PUT request
   * @example
   * api.put('update_user', { name: 'Jane' }, { params: { userId: '123' } })
   */
  async put<T = unknown>(
    endpointName: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PUT', endpointName, body, options);
  }

  /**
   * PATCH request
   * @example
   * api.patch('update_user', { name: 'Jane' }, { params: { userId: '123' } })
   */
  async patch<T = unknown>(
    endpointName: string,
    body?: unknown,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>('PATCH', endpointName, body, options);
  }

  /**
   * DELETE request
   * @example
   * api.delete('delete_user', { params: { userId: '123' } })
   */
  async delete<T = unknown>(
    endpointName: string,
    options?: RequestOptions
  ): Promise<ApiResponse<T>> {
    return this.request<T>('DELETE', endpointName, undefined, options);
  }
}

/**
 * Create a new ApiClient instance with the given base URL
 */
export function createApiClient(baseUrl: string): ApiClient {
  return new ApiClient(baseUrl);
}
