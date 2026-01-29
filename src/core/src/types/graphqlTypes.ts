export interface GraphQLResponse<T = unknown> {
  status: number;
  statusText: string;
  data: T | null;
  errors?: GraphQLError[];
  headers: Headers;
}

export interface GraphQLError {
  message: string;
  locations?: { line: number; column: number }[];
  path?: (string | number)[];
  extensions?: Record<string, unknown>;
}

export interface GraphQLRequestOptions {
  headers?: Record<string, string>;
  timeout?: number;
}

export interface GraphQLTestData {
  query: string;
  variables?: Record<string, unknown>;
}