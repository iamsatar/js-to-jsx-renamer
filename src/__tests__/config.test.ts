import { rm, writeFile } from 'fs/promises';
import { join } from 'path';
import { loadConfig } from '../config.js';

describe('config', () => {
  const testConfigPath = join(process.cwd(), 'test-config.json');
  
  beforeEach(async () => {
    try {
      await rm(testConfigPath);
    } catch (e) {
      // Ignore if file doesn't exist
    }
  });

  afterEach(async () => {
    try {
      await rm(testConfigPath);
    } catch (e) {
      // Ignore if file doesn't exist
    }
  });

  it('should return default config when no config file exists', async () => {
    const config = await loadConfig();
    expect(config).toEqual({
      include: ['src/**/*.js'],
      exclude: ['**/*.test.js', '**/*.spec.js'],
      dryRun: false,
      verbose: false,
      backup: true
    });
  });

  it('should load and merge custom config', async () => {
    const customConfig = {
      include: ['app/**/*.js'],
      exclude: ['**/*.spec.js'],
      verbose: true
    };

    await writeFile(testConfigPath, JSON.stringify(customConfig));

    const config = await loadConfig(testConfigPath);
    expect(config).toEqual({
      include: ['app/**/*.js'],
      exclude: ['**/*.spec.js'],
      dryRun: false,
      verbose: true,
      backup: true
    });
  });
}); 