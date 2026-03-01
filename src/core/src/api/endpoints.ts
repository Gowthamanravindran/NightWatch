import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

interface EndpointsConfig {
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

/**
 * Substitutes {{placeholder}} with provided values
 */
function substituteParams(template: string, params: Record<string, string | number>): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (!(key in params)) {
      throw new Error(`Missing parameter: {{${key}}} in endpoint template`);
    }
    return String(params[key]);
  });
}

/**
 * Get the path for an endpoint with parameter substitution
 */
export function getPath(
  name: string,
  params: Record<string, string | number> = {}
): string {
  const cfg = loadConfig();
  const template = cfg.endpoints[name];

  if (!template) {
    throw new Error(`Unknown endpoint: ${name}. Available: ${Object.keys(cfg.endpoints).join(', ')}`);
  }

  return substituteParams(template, params);
}

/**
 * Get list of all available endpoint names
 */
export function getAvailableEndpoints(): string[] {
  const cfg = loadConfig();
  return Object.keys(cfg.endpoints);
}
