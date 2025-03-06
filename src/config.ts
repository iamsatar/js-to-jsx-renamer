import { readFile } from 'fs/promises';
import { join } from 'path';

export interface Config {
  include: string[];
  exclude: string[];
  dryRun?: boolean;
  verbose?: boolean;
}

export interface RenameResult {
  success: boolean;
  renamedFiles: Array<{
    from: string;
    to: string;
  }>;
}

const DEFAULT_CONFIG: Config = {
  include: ['src/**/*.js'],
  exclude: ['**/*.test.js', '**/*.spec.js', 'mocks/**', 'node_modules/**'],
  dryRun: false,
  verbose: false
};

export async function loadConfig(configPath?: string): Promise<Config> {
  try {
    const path = configPath || join(process.cwd(), 'js-to-jsx-config.json');
    const configFile = await readFile(path, 'utf-8');
    const userConfig = JSON.parse(configFile);
    
    return {
      ...DEFAULT_CONFIG,
      ...userConfig
    };
  } catch (error) {
    if (configPath) {
      throw new Error(`Failed to load config from ${configPath}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    // If no config path was specified and the file doesn't exist, return default config
    return DEFAULT_CONFIG;
  }
}
