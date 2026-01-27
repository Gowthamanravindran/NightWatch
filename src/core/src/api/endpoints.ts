import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

interface EndpointsConfig {
  base_urls: Record<string, string>;
  endpoints: Record<string, string>;
}

let config: EndpointsConfig | null = null;

function loadConfig(): EndpointsConfig {
  if (config) return config;

  const configPath = path.resolve(process.cwd(), 'src/configs/endpoints.yml');
  const fileContent = fs.readFileSync(configPath, 'utf8');
  config = yaml.load(fileContent) as EndpointsConfig;
  return config;
}


function substituteParams(template: string, params: Record<string, string | number>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!(key in params)) {
      throw new Error(`Missing parameter: {{${key}}} in endpoint template`);
    }
    return String(params[key]);
  });
}

export function getBaseUrl(env?: string): string {
  const cfg = loadConfig();
  const environment = env || process.env.API_ENV || 'dev';
  const baseUrl = cfg.base_urls[environment];

  if (!baseUrl) {
    throw new Error(`Unknown environment: ${environment}. Valid: ${Object.keys(cfg.base_urls).join(', ')}`);
  }

  return baseUrl;
}

// Get a full URL for an endpoint with parameter substitution
export function getEndpoint(
  name: string,
  params: Record<string, string | number> = {},
  env?: string
): string {
  const cfg = loadConfig();
  const template = cfg.endpoints[name];

  if (!template) {
    throw new Error(`Unknown endpoint: ${name}. Available: ${Object.keys(cfg.endpoints).join(', ')}`);
  }

  const endpointPath = substituteParams(template, params);
  const baseUrl = getBaseUrl(env);

  return `${baseUrl}${endpointPath}`;
}

export function getPath(
  name: string,
  params: Record<string, string | number> = {}
): string {
  const cfg = loadConfig();
  const template = cfg.endpoints[name];

  if (!template) {
    throw new Error(`Unknown endpoint: ${name}`);
  }

  return substituteParams(template, params);
}

